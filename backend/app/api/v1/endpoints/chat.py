"""Chat / AI brief endpoint."""
from __future__ import annotations

from fastapi import Depends, Request
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.services import ai_service


async def ai_brief(request: Request, db: Session = Depends(get_db)):
    """Generate and return an executive AI trend brief."""
    try:
        body = await request.json()
    except Exception:
        body = {}
    brief = ai_service.generate_brief(body, db)
    return {"brief": brief}


async def ai_recommendations(request: Request, db: Session = Depends(get_db)):
    """Fetch prioritized, scored AI operational playbooks with KPI projections."""
    try:
        body = await request.json()
    except Exception:
        body = {}
    result = ai_service.get_recommendations(body, db)
    return result


async def execute_recommendation(request: Request, db: Session = Depends(get_db)):
    """Execute an autonomous playbook, trigger business actions, and log audit trail."""
    try:
        body = await request.json()
    except Exception:
        body = {}
    rec_id = body.get("id") or body.get("data", {}).get("id") or ""
    payload = body.get("payload") or body.get("data", {}).get("payload") or {}
    result = ai_service.execute_recommendation(rec_id, payload, db)
    return result
