"""Data pipeline service: parse CSV/JSON, normalise, and ingest into the database (SQLAlchemy)."""
import csv
import io
import json
import random
import re
import time
from collections import defaultdict
from datetime import date, datetime

from sqlalchemy.orm import Session

from app.models import DailyMetric, Sale


# ---------------------------------------------------------------------------
# Field cleaners
# ---------------------------------------------------------------------------

def _clean_str(val, default="") -> str:
    if val is None:
        return default
    s = str(val).strip()
    return s if s else default


def _clean_amount(val) -> float:
    if val is None or val == "":
        return 0.0
    if isinstance(val, (int, float)):
        return float(val)
    s = str(val).strip()
    is_neg = s.startswith("(") and s.endswith(")")
    if is_neg:
        s = s[1:-1]
    cleaned = re.sub(r"[^\d.-]", "", s)
    try:
        amt = float(cleaned) if cleaned else 0.0
        return -amt if is_neg else amt
    except ValueError:
        return 0.0


def _parse_date_str(val) -> str:
    if not val:
        return datetime.now().strftime("%Y-%m-%dT%H:%M:%S")

    s = str(val).strip().strip('"').strip("'")
    if not s:
        return datetime.now().strftime("%Y-%m-%dT%H:%M:%S")

    # Numeric epoch (seconds or milliseconds)
    if s.isdigit():
        try:
            ts = int(s)
            if len(s) == 13:
                ts = ts / 1000.0
            return datetime.fromtimestamp(ts).strftime("%Y-%m-%dT%H:%M:%S")
        except Exception:
            pass

    # dateutil fuzzy parse
    try:
        from dateutil import parser as dt_parser
        has_sep = "/" in s or "-" in s
        dayfirst = has_sep and not bool(re.match(r"^\d{4}", s))
        return dt_parser.parse(s, fuzzy=True, dayfirst=dayfirst).strftime("%Y-%m-%dT%H:%M:%S")
    except Exception:
        pass

    # Common format fallbacks
    for fmt in [
        "%Y-%m-%d %H:%M:%S", "%Y-%m-%dT%H:%M:%S", "%Y-%m-%d",
        "%d-%m-%Y %H:%M:%S", "%d-%m-%Y",
        "%d/%m/%Y %H:%M:%S", "%d/%m/%Y",
        "%m/%d/%Y %H:%M:%S", "%m/%d/%Y",
        "%Y/%m/%d %H:%M:%S", "%Y/%m/%d",
    ]:
        try:
            return datetime.strptime(s.split(".")[0].strip(), fmt).strftime("%Y-%m-%dT%H:%M:%S")
        except Exception:
            continue

    return datetime.now().strftime("%Y-%m-%dT%H:%M:%S")


def _normalize_channel(val) -> str:
    if not val:
        return "Android"
    raw = str(val).strip()
    v = raw.lower()
    if any(x in v for x in ("android", "play", "google")):
        return "Android"
    if any(x in v for x in ("ios", "apple", "iphone", "ipad")):
        return "iOS"
    if any(x in v for x in ("web", "browser", "portal", "site")):
        return "Web"
    clean = re.sub(r"[^\w\s-]", "", raw).strip().title()
    return clean[:20] if clean else "Other"


def _normalize_status(val) -> str:
    if not val:
        return "Paid"
    v = str(val).strip().lower()
    if any(x in v for x in ("paid", "success", "completed", "settled", "done")):
        return "Paid"
    if any(x in v for x in ("pend", "process", "await", "open", "due")):
        return "Pending"
    if any(x in v for x in ("refund", "return", "chargeback")):
        return "Refunded"
    if any(x in v for x in ("cancel", "fail", "reject", "void", "declined")):
        return "Cancelled"
    return "Paid"


# ---------------------------------------------------------------------------
# Record normalisation
# ---------------------------------------------------------------------------

def normalize_record(raw_dict: dict) -> dict:
    """Map any common CSV/JSON column aliases into canonical Sale fields."""
    if not isinstance(raw_dict, dict):
        return {}

    d_clean: dict[str, str] = {}
    for k, v in raw_dict.items():
        if k is None:
            continue
        clean_key = re.sub(r"[^a-z0-9]", "", str(k).lower())
        d_clean[clean_key] = v

    def get_val(*aliases, default=None):
        for a in aliases:
            ck = re.sub(r"[^a-z0-9]", "", str(a).lower())
            if ck in d_clean:
                v = d_clean[ck]
                if v is not None and str(v).strip():
                    return str(v).strip()
        return default

    tx_ref = get_val(
        "transaction_ref", "transactionref", "trans_id", "transid", "tx_ref", "txref", "tx_id", "txid",
        "order_id", "orderid", "order_no", "orderno", "order_number", "ordernumber", "order",
        "invoice", "invoice_no", "invoiceno", "invoice_id", "invoiceid", "invoice_number",
        "bill_no", "billno", "bill_id", "billid", "receipt_no", "receipt", "id", "ref", "reference",
        default=f"ZV-{random.randint(10000, 99999)}",
    )

    sold_at_raw = get_val(
        "sold_at", "soldat", "date", "order_date", "orderdate", "transaction_date", "transactiondate",
        "sale_date", "saledate", "invoice_date", "invoicedate", "booking_date", "bookingdate",
        "timestamp", "time", "datetime", "created_at", "createdat",
    )
    sold_at = _parse_date_str(sold_at_raw)

    person = get_val(
        "person", "person_name", "personname",
        "customer", "customer_name", "customername", "cust_name", "custname",
        "client", "client_name", "clientname", "patient", "patient_name", "patientname",
        "buyer", "buyer_name", "buyername", "name", "full_name", "fullname",
        "user", "username", "user_name", "pet_owner", "petowner",
        default="Customer",
    )

    source = get_val(
        "source", "service", "service_name", "servicename", "service_title",
        "product", "product_name", "productname", "item", "item_name", "itemname",
        "category", "category_name", "categoryname", "procedure", "procedure_name",
        "treatment", "treatment_name", "description", "package", "type",
        default="General Care",
    )

    city = get_val(
        "city", "city_name", "cityname", "location", "location_name", "locationname",
        "branch", "branch_name", "branchname", "clinic_location", "clinic",
        "center", "centre", "hub", "region", "state", "area", "address",
        default="Bengaluru",
    )

    channel_raw = get_val(
        "app_source", "appsource", "channel", "sales_channel", "saleschannel",
        "platform", "app", "source_app", "sourceapp", "booking_channel", "bookingchannel",
        "medium", "mode",
        default="Android",
    )
    app_source = _normalize_channel(channel_raw)

    status_raw = get_val(
        "status", "order_status", "orderstatus", "payment_status", "paymentstatus",
        "state", "condition", "booking_status",
        default="Paid",
    )
    status = _normalize_status(status_raw)

    amount_raw = get_val(
        "amount", "total_amount", "totalamount", "net_amount", "netamount",
        "revenue", "price", "total", "total_price", "totalprice", "total_sales", "totalsales",
        "sales", "grand_total", "grandtotal", "bill_amount", "billamount",
        "paid_amount", "paidamount", "order_value", "ordervalue", "value", "cost", "fee", "charge",
        default="0",
    )
    amount = _clean_amount(amount_raw)

    android_dl = int(_clean_amount(get_val("android_downloads", "androiddownloads", "android", default="0")))
    ios_dl = int(_clean_amount(get_val("ios_downloads", "iosdownloads", "ios", default="0")))

    return {
        "transaction_ref": _clean_str(tx_ref),
        "sold_at": sold_at,
        "person": _clean_str(person),
        "source": _clean_str(source),
        "city": _clean_str(city),
        "app_source": app_source,
        "status": status,
        "amount": amount,
        "android_downloads": android_dl,
        "ios_downloads": ios_dl,
    }


# ---------------------------------------------------------------------------
# Parse
# ---------------------------------------------------------------------------

def parse_data_content(content_str: str, filename: str = "") -> list[dict]:
    """Parse text from a CSV or JSON string into a list of normalised sale dicts."""
    if not content_str:
        return []

    content_str = content_str.lstrip("\ufeff").strip()
    if not content_str:
        return []

    # JSON
    if content_str.startswith("{") or content_str.startswith("["):
        try:
            parsed = json.loads(content_str)
            if isinstance(parsed, list):
                return [normalize_record(r) for r in parsed if isinstance(r, dict)]
            if isinstance(parsed, dict):
                rows = parsed.get("sales") or parsed.get("rows") or parsed.get("data") or []
                if isinstance(rows, list):
                    return [normalize_record(r) for r in rows if isinstance(r, dict)]
        except Exception:
            pass

    # CSV / TSV
    try:
        first_line = content_str.split("\n")[0]
        delimiter = "\t" if "\t" in first_line else (";" if ";" in first_line and "," not in first_line else ",")
        reader = csv.DictReader(io.StringIO(content_str), delimiter=delimiter)
        return [normalize_record(row) for row in reader if any(row.values())]
    except Exception as exc:
        raise ValueError(f"Failed to parse CSV/JSON dataset: {exc}") from exc


# ---------------------------------------------------------------------------
# Ingest
# ---------------------------------------------------------------------------

def ingest_records(records: list[dict], db: Session, mode: str = "replace") -> dict:
    """
    Main data pipeline:
    - Optionally wipes existing data (replace mode)
    - Bulk-inserts Sale rows
    - Creates/updates DailyMetric aggregates
    """
    if not records:
        return {"success": False, "error": "No valid records found to ingest."}

    now_ts = int(time.time() * 1000)

    try:
        if mode == "replace":
            db.query(Sale).delete()
            db.query(DailyMetric).delete()

        daily_sales: dict[str, float] = defaultdict(float)
        daily_android: dict[str, int] = defaultdict(int)
        daily_ios: dict[str, int] = defaultdict(int)

        sale_objs: list[Sale] = []
        for i, r in enumerate(records):
            sale_id = f"sale-{now_ts}-{i}-{random.randint(100, 999)}"
            day = r["sold_at"][:10]

            if r["status"] == "Paid":
                daily_sales[day] += r["amount"]

            if r["android_downloads"] > 0:
                daily_android[day] += r["android_downloads"]
            elif r["app_source"] == "Android":
                daily_android[day] += random.randint(1, 3)

            if r["ios_downloads"] > 0:
                daily_ios[day] += r["ios_downloads"]
            elif r["app_source"] == "iOS":
                daily_ios[day] += random.randint(1, 3)

            sale_objs.append(Sale(
                sale_id=sale_id,
                transaction_ref=r["transaction_ref"],
                sold_at=r["sold_at"],
                source=r["source"],
                person=r["person"],
                city=r["city"],
                amount=r["amount"],
                status=r["status"],
                app_source=r["app_source"],
                is_demo=False,
            ))

        db.bulk_save_objects(sale_objs)

        all_days = {r["sold_at"][:10] for r in records if r["sold_at"][:10]}
        for day_str in sorted(all_days):
            try:
                bdate = date.fromisoformat(day_str)
            except ValueError:
                continue

            paid_total = daily_sales.get(day_str, 0.0)
            metric = db.query(DailyMetric).filter(DailyMetric.business_date == bdate).first()
            if metric is None:
                db.add(DailyMetric(
                    business_date=bdate,
                    sales_total=paid_total,
                    android_downloads=max(15, daily_android[day_str]),
                    ios_downloads=max(12, daily_ios[day_str]),
                ))
            elif mode != "replace":
                metric.sales_total = float(metric.sales_total) + paid_total
                metric.android_downloads += daily_android[day_str]
                metric.ios_downloads += daily_ios[day_str]

        db.commit()

    except Exception:
        db.rollback()
        raise

    all_dates = sorted(all_days)
    total_rev = sum(daily_sales.values())
    return {
        "success": True,
        "mode": mode,
        "count": len(sale_objs),
        "total_revenue": total_rev,
        "date_min": all_dates[0] if all_dates else "",
        "date_max": all_dates[-1] if all_dates else "",
        "metrics_count": len(daily_sales),
        "message": (
            f"Successfully ingested {len(sale_objs)} transactions "
            f"across {len(daily_sales)} days ({mode} mode)."
        ),
    }


# ---------------------------------------------------------------------------
# Template
# ---------------------------------------------------------------------------

def generate_template_csv() -> str:
    """Generate a standard CSV template with sample rows."""
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(["Order", "Date", "Customer", "Service", "City", "Channel", "Status", "Amount"])
    writer.writerow(["ZV-90001", "2026-10-01T09:30:00", "Rohan Mehta", "Preventive Healthcare Plan", "Bengaluru", "Android", "Paid", "6500"])
    writer.writerow(["ZV-90002", "2026-10-01T11:15:00", "Priya Sen", "Veterinary Tele-Consult", "Mumbai", "iOS", "Paid", "2800"])
    writer.writerow(["ZV-90003", "2026-10-01T14:40:00", "Aditya Roy", "Pet Pharmacy & Meds", "Delhi NCR", "Web", "Paid", "4200"])
    writer.writerow(["ZV-90004", "2026-10-01T16:20:00", "Sneha Kulkarni", "Pet Grooming & Spa", "Hyderabad", "Android", "Pending", "1900"])
    return output.getvalue()
