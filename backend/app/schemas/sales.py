"""Pydantic schemas and helper functions for the sales domain."""
from __future__ import annotations

from typing import Any


def to_float(val: Any) -> float:
    """Convert any value to float, returning 0.0 on failure."""
    if isinstance(val, (int, float)):
        return float(val)
    try:
        return float(str(val).replace(",", "").strip())
    except (TypeError, ValueError):
        return 0.0


def sale_to_dict(sale) -> dict:
    """Convert a Sale ORM instance to a plain dict for JSON serialisation."""
    return {
        "id": sale.sale_id,
        "transaction_ref": sale.transaction_ref,
        "sold_at": sale.sold_at,
        "source": sale.source,
        "person": sale.person,
        "city": sale.city,
        "amount": float(sale.amount),
        "status": sale.status,
        "app_source": sale.app_source,
        "is_demo": bool(sale.is_demo),
    }


def metric_to_dict(metric) -> dict:
    """Convert a DailyMetric ORM instance to a plain dict."""
    return {
        "business_date": str(metric.business_date),
        "sales_total": float(metric.sales_total),
        "android_downloads": metric.android_downloads,
        "ios_downloads": metric.ios_downloads,
    }
