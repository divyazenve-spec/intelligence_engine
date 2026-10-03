"""Pipeline endpoints: upload dataset, download template, reset to sample data."""
import json
from pathlib import Path

from fastapi import APIRouter, Depends, File, Query, Request, UploadFile
from fastapi.responses import PlainTextResponse, StreamingResponse
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.core.config import settings
from app.services import pipeline_service, sales_service

router = APIRouter()


@router.post("/upload")
async def upload_dataset(
    request: Request,
    db: Session = Depends(get_db),
    mode: str = Query(default="replace"),
    file: UploadFile = File(default=None),
):
    """
    Ingest a CSV or JSON dataset into the Sales Dashboard database.

    Accepts:
      - Multipart file upload (field: `file`)
      - Raw CSV text in body
      - Raw JSON body: `{"rows": [...]}` or `{"content": "...csv..."}`

    Query param:
      `?mode=replace` (default — clean replace) or `?mode=append`
    """
    if mode not in ("replace", "append"):
        mode = "replace"

    content_str = ""
    filename = ""

    # 1. Multipart file takes priority
    if file and file.filename:
        filename = file.filename
        raw_bytes = await file.read()
        content_str = raw_bytes.decode("utf-8", errors="replace")
    else:
        # 2. Raw body (CSV text or JSON)
        body_bytes = await request.body()
        if body_bytes:
            raw = body_bytes.decode("utf-8", errors="replace").strip()
            if raw.startswith("{"):
                try:
                    body_json = json.loads(raw)
                    if "mode" in body_json:
                        mode = body_json["mode"]
                    content_str = body_json.get("content") or raw
                except Exception:
                    content_str = raw
            else:
                content_str = raw

    if not content_str:
        return {"success": False, "error": "No file or data payload received."}

    try:
        records = pipeline_service.parse_data_content(content_str, filename)
        if not records:
            return {"success": False, "error": "No records could be parsed from the provided dataset."}
        result = pipeline_service.ingest_records(records, db, mode=mode)
        result["data"] = sales_service.load_all(db)
        return result
    except Exception as exc:
        return {"success": False, "error": str(exc)}


@router.get("/template")
def download_template():
    """Return a sample CSV template for pipeline ingestion."""
    csv_content = pipeline_service.generate_template_csv()
    headers = {
        "Content-Disposition": 'attachment; filename="zenve_sales_pipeline_template.csv"'
    }
    return PlainTextResponse(csv_content, media_type="text/csv; charset=utf-8", headers=headers)


@router.post("/reset")
def reset_to_sample(db: Session = Depends(get_db)):
    """Reset the dataset to the initial 30-day sample baseline."""
    try:
        sample_path = Path(settings.frontend_dir).parent / "database" / "init" / "02_sample_data.sql"
        from app.models import DailyMetric, Sale
        db.query(Sale).delete()
        db.query(DailyMetric).delete()
        db.commit()
        if sample_path.is_file():
            sql = sample_path.read_text(encoding="utf-8")
            for stmt in sql.split(";"):
                stmt = stmt.strip()
                if stmt:
                    db.execute(text(stmt))
            db.commit()
        return {"success": True, "message": "Dataset reset to 30-day baseline.", "data": sales_service.load_all(db)}
    except Exception as exc:
        db.rollback()
        return {"success": False, "error": str(exc)}
