"""Sales endpoints — save a single sale, bulk-import from CSV/JSON."""
from __future__ import annotations

import json

from fastapi import Depends, File, Form, Request, UploadFile
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.services import pipeline_service, sales_service


async def save_sale(request: Request, db: Session = Depends(get_db)):
    """Save / upsert a single sale record from a JSON body."""
    try:
        body = await request.json()
    except Exception:
        body = {}
    return sales_service.save_sale(body, db)


async def import_sales(
    request: Request,
    file: UploadFile | None = File(default=None),
    data: str | None = Form(default=None),
    mode: str = Form(default="replace"),
    db: Session = Depends(get_db),
):
    """
    Bulk-import sales from a CSV or JSON upload.

    Accepts either:
    - multipart/form-data  with a `file` field (CSV or JSON)
    - application/json body  with `{ data: "...", mode: "replace"|"append" }`
    """
    content: str = ""
    filename: str = ""

    if file and file.filename:
        raw = await file.read()
        content = raw.decode("utf-8", errors="replace")
        filename = file.filename
    elif data:
        content = data
    else:
        # Try reading JSON body
        try:
            body = await request.json()
            content = body.get("data", "")
            mode = body.get("mode", mode)
            filename = body.get("filename", "")
        except Exception:
            pass

    if not content:
        return {"success": False, "error": "No data provided."}

    try:
        records = pipeline_service.parse_data_content(content, filename)
        return pipeline_service.ingest_records(records, db, mode=mode)
    except Exception as exc:
        return {"success": False, "error": str(exc)}
