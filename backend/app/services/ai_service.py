"""Orchestration layer for the AI trend brief (rule-based summary of filtered data)."""
from sqlalchemy.orm import Session

from app.core.formatting import format_indian, format_int
from app.schemas.inference import brief_filters
from app.schemas.sales import to_float
from app.services import sales_service


def generate_brief(data: dict, db: Session) -> str:
    f = brief_filters(data)
    start, end, status, app_source = f["start"], f["end"], f["status"], f["app_source"]
    db_data = sales_service.load_all(db)

    metrics = [
        m for m in db_data["metrics"]
        if not (start and m["business_date"] < start)
        and not (end and m["business_date"] > end)
    ]
    sales = []
    for s in db_data["sales"]:
        day = s["sold_at"][:10]
        if start and day < start:
            continue
        if end and day > end:
            continue
        if status != "All" and s["status"] != status:
            continue
        if app_source != "All" and s["app_source"] != app_source:
            continue
        sales.append(s)

    paid = [s for s in sales if s["status"] == "Paid"]
    total_revenue = sum(to_float(s["amount"]) for s in paid)
    android = sum(m["android_downloads"] for m in metrics)
    ios = sum(m["ios_downloads"] for m in metrics)
    downloads = android + ios
    customers = len({s["person"] for s in sales})
    aov = int(total_revenue / len(paid) + 0.5) if paid else 0
    rpd = f"{total_revenue / downloads:.1f}" if downloads > 0 else "0"

    if not paid and not metrics:
        return (
            "Executive Intelligence Brief — Zenve Pets Healthcare\n"
            f"Period: {start or 'Last 14 Days'} to {end or 'Today'} (0 settled orders across 0 pet parents)\n\n"
            "• Revenue & Acquisition Velocity: Net settled sales: ₹0 across 0 new app installs.\n"
            "• Channel Performance: No transactions recorded in database.\n"
            "• Top Veterinary Growth Drivers: None recorded (0 orders).\n"
            "• Operational Recommendation: Awaiting live transactional data ingestion to generate AI trends."
        )

    by_cat: dict[str, float] = {}
    by_app: dict[str, float] = {}
    for s in paid:
        by_cat[s["source"]] = by_cat.get(s["source"], 0) + to_float(s["amount"])
        by_app[s["app_source"]] = by_app.get(s["app_source"], 0) + to_float(s["amount"])

    top = sorted(by_cat.items(), key=lambda kv: kv[1], reverse=True)[:3]
    top_categories = ", ".join(f"{c} (₹{format_indian(v)})" for c, v in top)
    inr = "₹" + format_indian(int(total_revenue + 0.5))

    return (
        "Executive Intelligence Brief — Zenve Pets Healthcare\n"
        f"Period: {start or 'Last 14 Days'} to {end or 'Today'} ({len(paid)} settled orders across {customers} pet parents)\n\n"
        f"• Revenue & Acquisition Velocity: Net settled sales reached {inr} across {format_int(downloads)} new app installs "
        f"(Android: {format_int(android)}, iOS: {format_int(ios)}), generating ₹{rpd} revenue-per-download with an Average Order Value (AOV) of ₹{format_indian(aov)}.\n"
        f"• Channel Performance: Android leads mobile volume with ₹{format_indian(by_app.get('Android', 0))}, while iOS demonstrates higher conversion per user with ₹{format_indian(by_app.get('iOS', 0))}. "
        f"Web & Direct orders contributed ₹{format_indian(by_app.get('Web', 0) + by_app.get('Other', 0))}.\n"
        f"• Top Veterinary Growth Drivers: Highest grossing service verticals include {top_categories or 'None'}. "
        "Preventive healthcare subscriptions continue to deliver repeat margins.\n"
        "• Operational Recommendation: Ingest live transactional or ERP telemetry via the Data Pipeline."
    )
