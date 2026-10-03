"""Sales endpoints: save a single sale or bulk-import rows."""
from typing import Any, Optional

from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.services import sales_service

router = APIRouter()


# ---------------------------------------------------------------------------
# Request schemas (TanStack server fns wrap payload in {"data": {...}})
# ---------------------------------------------------------------------------

class SaveSaleBody(BaseModel):
    data: Optional[dict[str, Any]] = None


class ImportSalesBody(BaseModel):
    data: Optional[dict[str, Any]] = None


def _unwrap(body: dict) -> dict:
    """TanStack server functions send {"data": {...}}; plain callers send the object itself."""
    if isinstance(body, dict):
        return body.get("data") or body
    return {}


def _get_rows(body: dict) -> list:
    return (body.get("data") or {}).get("rows") or body.get("rows") or []


# ---------------------------------------------------------------------------
# Endpoints
# ---------------------------------------------------------------------------

@router.post("/save")
def save_sale(body: SaveSaleBody, db: Session = Depends(get_db)):
    """Persist a single sale record."""
    data = _unwrap(body.model_dump())
    return sales_service.save_sale(data, db)


@router.post("/import")
def import_sales(body: ImportSalesBody, db: Session = Depends(get_db)):
    """Bulk-import an array of sale rows."""
    rows = _get_rows(body.model_dump())
    return sales_service.import_rows(rows, db)
