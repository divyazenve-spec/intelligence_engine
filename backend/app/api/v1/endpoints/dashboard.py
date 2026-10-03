"""Dashboard endpoint — serves all KPIs, sales, and metrics data."""
from __future__ import annotations

from fastapi import Depends, Request
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.services import sales_service


async def load_data(request: Request, db: Session = Depends(get_db)):
    """Return all dashboard data (sales + daily metrics)."""
    data = sales_service.load_all(db)
    return data
