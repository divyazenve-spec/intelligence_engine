"""Predict endpoint — placeholder for future ML inference."""
from __future__ import annotations

from fastapi import Depends, Request
from sqlalchemy.orm import Session

from app.api.deps import get_db


async def predict(request: Request, db: Session = Depends(get_db)):
    """Stub ML prediction endpoint (not yet implemented)."""
    return {"status": "not_implemented", "message": "ML prediction coming soon."}
