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
