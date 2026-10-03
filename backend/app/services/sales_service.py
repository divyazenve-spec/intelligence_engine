"""Sales data access service (SQLAlchemy)."""
import random
import time
from datetime import date

from sqlalchemy.orm import Session

from app.models import DailyMetric, Sale
from app.schemas.sales import sale_fields, to_float


def load_all(db: Session) -> dict:
    """Return all sales and daily metrics ordered for the dashboard."""
    metrics = db.query(DailyMetric).order_by(DailyMetric.business_date).all()
    sales = db.query(Sale).order_by(Sale.sold_at.desc(), Sale.seq.desc()).all()
    return {
        "metrics": [m.to_dict() for m in metrics],
        "sales": [s.to_dict() for s in sales],
        "mode": "live",
    }


def _apply_metric(db: Session, business_date: str, status: str, amount: float, android: int, ios: int):
    """Update or create a DailyMetric row for the given date."""
    bdate = date.fromisoformat(business_date)
    metric = db.query(DailyMetric).filter(DailyMetric.business_date == bdate).first()
    if metric is None:
        metric = DailyMetric(
            business_date=bdate,
            sales_total=amount if status == "Paid" else 0,
            android_downloads=android,
            ios_downloads=ios,
        )
        db.add(metric)
    else:
        if status == "Paid":
            metric.sales_total = float(metric.sales_total) + amount
        metric.android_downloads += android
        metric.ios_downloads += ios


def _create(db: Session, fields: dict, android: int, ios: int, spread: int) -> Sale:
    sale_id = f"sale-{int(time.time() * 1000)}-{random.randint(0, spread - 1)}"
    sale = Sale(sale_id=sale_id, is_demo=False, **fields)
    db.add(sale)
    db.flush()  # get seq assigned without committing
    business_date = (sale.sold_at or "")[:10]
    if business_date:
        _apply_metric(db, business_date, sale.status, float(sale.amount), android, ios)
    return sale


def save_sale(data: dict, db: Session) -> dict:
    """Persist a single new sale and update daily metrics."""
    fields = sale_fields(data, "General Pet Care", "Anonymous Customer")
    try:
        sale = _create(
            db, fields,
            int(to_float(data.get("androidDownloads"))),
            int(to_float(data.get("iosDownloads"))),
            1000,
        )
        db.commit()
        db.refresh(sale)
        return {"success": True, "sale": sale.to_dict()}
    except Exception:
        db.rollback()
        raise


def import_rows(rows: list, db: Session) -> dict:
    """Bulk-import sale rows and update daily metrics."""
    try:
        for r in rows:
            _create(
                db,
                sale_fields(r, "General Healthcare", "Customer"),
                int(to_float(r.get("androidDownloads"))),
                int(to_float(r.get("iosDownloads"))),
                10000,
            )
        db.commit()
        return {"success": True, "count": len(rows)}
    except Exception:
        db.rollback()
        raise
