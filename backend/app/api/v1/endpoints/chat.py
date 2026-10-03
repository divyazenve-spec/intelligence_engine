"""AI trend brief endpoint."""
from typing import Any, Optional

from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.services import ai_service

router = APIRouter()


class BriefBody(BaseModel):
    data: Optional[dict[str, Any]] = None


@router.post("/brief")
@router.get("/brief")
def ai_brief(db: Session = Depends(get_db), body: Optional[BriefBody] = None):
    """Generate an executive intelligence brief from the current dataset."""
    data = (body.data if body and body.data else {}) or {}
    text = ai_service.generate_brief(data, db)
    return {"text": text}
