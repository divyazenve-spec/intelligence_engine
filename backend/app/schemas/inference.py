"""Pydantic schemas and filter helpers for AI/inference requests."""
from __future__ import annotations

from typing import Any


def brief_filters(data: dict) -> dict:
    """Extract and normalise filter parameters from an AI brief request payload."""
    start = (data.get("start") or data.get("date_start") or "").strip()
    end = (data.get("end") or data.get("date_end") or "").strip()
    status = (data.get("status") or "All").strip()
    app_source = (data.get("app_source") or data.get("channel") or "All").strip()
    return {
        "start": start or None,
        "end": end or None,
        "status": status,
        "app_source": app_source,
    }
