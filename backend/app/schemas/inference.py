"""Pydantic schemas for the AI brief endpoint.

Request body:  {"data": {startDate, endDate, status, appSource}}
Response:      {"text": "<brief>"}
"""
from pydantic import BaseModel
from typing import Optional


class BriefRequest(BaseModel):
    startDate: Optional[str] = None
    endDate: Optional[str] = None
    status: Optional[str] = "All"
    appSource: Optional[str] = "All"


class BriefDataWrapper(BaseModel):
    data: Optional[BriefRequest] = None


class BriefResponse(BaseModel):
    text: str


def brief_filters(data: dict) -> dict:
    """Extract filter keys from a raw dict (kept for service compatibility)."""
    return {
        "start": data.get("startDate"),
        "end": data.get("endDate"),
        "status": data.get("status") or "All",
        "app_source": data.get("appSource") or "All",
    }
