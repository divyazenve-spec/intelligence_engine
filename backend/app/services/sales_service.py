"""Sales data service: read / write sales & daily_metrics via SQLAlchemy."""
from __future__ import annotations

import json
import random
from datetime import datetime
from pathlib import Path

from sqlalchemy.orm import Session

from app.models import DailyMetric, Sale
from app.schemas.sales import metric_to_dict, sale_to_dict

# Path to the bundled sample fallback JSON (shipped with the frontend assets)
_SAMPLE_JSON = (
    Path(__file__).resolve().parents[3]
    / "frontend" / "public" / "assets" / "sample-fallback.json"
)


def _load_sample_fallback() -> dict:
    """Load the bundled sample data shipped with the frontend."""
    try:
        with open(_SAMPLE_JSON, encoding="utf-8") as fh:
            return json.load(fh)
    except Exception:
        return {"sales": [], "metrics": []}


def load_all(db: Session) -> dict:
    """Return all sales and daily_metrics as plain dicts."""
    sales = [sale_to_dict(s) for s in db.query(Sale).order_by(Sale.sold_at.desc()).all()]
    metrics = [metric_to_dict(m) for m in db.query(DailyMetric).order_by(DailyMetric.business_date).all()]

    # If no data yet, return the bundled sample
    if not sales:
        return _load_sample_fallback()

    return {"sales": sales, "metrics": metrics}


def save_sale(sale_data: dict, db: Session) -> dict:
    """Upsert a single sale record (insert or update by sale_id)."""
    sale_id = sale_data.get("sale_id") or f"sale-{int(datetime.now().timestamp()*1000)}-{random.randint(100,999)}"

    existing = db.query(Sale).filter(Sale.sale_id == sale_id).first()
    if existing:
        for field in ("transaction_ref", "sold_at", "source", "person", "city", "amount", "status", "app_source"):
            if field in sale_data:
                setattr(existing, field, sale_data[field])
        db.commit()
        return {"success": True, "sale_id": sale_id, "action": "updated"}

    sale = Sale(
        sale_id=sale_id,
        transaction_ref=sale_data.get("transaction_ref", f"ZV-{random.randint(10000,99999)}"),
        sold_at=sale_data.get("sold_at", datetime.now().strftime("%Y-%m-%dT%H:%M:%S")),
        source=sale_data.get("source", "General Care"),
        person=sale_data.get("person", "Customer"),
        city=sale_data.get("city", "Bengaluru"),
        amount=float(sale_data.get("amount", 0)),
        status=sale_data.get("status", "Paid"),
        app_source=sale_data.get("app_source", "Android"),
        is_demo=int(sale_data.get("is_demo", 0)),
    )
    db.add(sale)
    db.commit()
    return {"success": True, "sale_id": sale_id, "action": "created"}
