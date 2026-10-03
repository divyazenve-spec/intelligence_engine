"""Pipeline endpoints — upload datasets, download templates, reset to sample data."""
from __future__ import annotations

from fastapi import Depends, File, Form, Request, UploadFile
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.services import pipeline_service


async def upload_dataset(
    request: Request,
    file: UploadFile | None = File(default=None),
    mode: str = Form(default="replace"),
    db: Session = Depends(get_db),
):
    """Upload a CSV or JSON dataset to replace or append to the current data."""
    content: str = ""
    filename: str = ""

    if file and file.filename:
        raw = await file.read()
        content = raw.decode("utf-8", errors="replace")
        filename = file.filename
    else:
        try:
            body = await request.json()
            content = body.get("data", "")
            mode = body.get("mode", mode)
            filename = body.get("filename", "")
        except Exception:
            pass

    if not content:
        return {"success": False, "error": "No file or data provided."}

    try:
        records = pipeline_service.parse_data_content(content, filename)
        return pipeline_service.ingest_records(records, db, mode=mode)
    except Exception as exc:
        return {"success": False, "error": str(exc)}


async def download_template(request: Request):
    """Return a CSV template with sample rows."""
    csv_content = pipeline_service.generate_template_csv()

    def _iter():
        yield csv_content.encode("utf-8")

    return StreamingResponse(
        _iter(),
        media_type="text/csv",
        headers={"Content-Disposition": 'attachment; filename="zenve_sales_template.csv"'},
    )


async def reset_to_sample(request: Request, db: Session = Depends(get_db)):
    """Reset the database to the bundled 12-month sample dataset."""
    import json
    import random
    import time
    from datetime import date
    from pathlib import Path

    from app.models import DailyMetric, Sale

    sample_path = (
        Path(__file__).resolve().parents[3].parent
        / "frontend" / "public" / "assets" / "sample-fallback.json"
    )
    try:
        with open(sample_path, encoding="utf-8") as fh:
            sample = json.load(fh)
    except Exception as exc:
        return {"success": False, "error": f"Could not load sample data: {exc}"}

    sales_rows = sample.get("sales", [])
    metric_rows = sample.get("metrics", [])
    if not sales_rows:
        return {"success": False, "error": "Sample data is empty."}

    try:
        db.query(Sale).delete()
        db.query(DailyMetric).delete()

        now_ts = int(time.time() * 1000)
        sale_objs = []
        for i, r in enumerate(sales_rows):
            sale_id = r.get("id") or r.get("sale_id") or f"sale-{now_ts}-{i}"
            sale_objs.append(Sale(
                sale_id=sale_id,
                transaction_ref=r.get("transaction_ref", f"ZV-{random.randint(10000, 99999)}"),
                sold_at=r.get("sold_at", ""),
                source=r.get("source", "General Care"),
                person=r.get("person", "Customer"),
                city=r.get("city", "Bengaluru"),
                amount=float(r.get("amount", 0)),
                status=r.get("status", "Paid"),
                app_source=r.get("app_source", "Android"),
                is_demo=1,
            ))
        db.bulk_save_objects(sale_objs)

        metric_objs = []
        for m in metric_rows:
            try:
                bdate = date.fromisoformat(m["business_date"])
            except Exception:
                continue
            metric_objs.append(DailyMetric(
                business_date=bdate,
                sales_total=float(m.get("sales_total", 0)),
                android_downloads=int(m.get("android_downloads", 0)),
                ios_downloads=int(m.get("ios_downloads", 0)),
            ))
        db.bulk_save_objects(metric_objs)

        db.commit()
        return {
            "success": True,
            "count": len(sale_objs),
            "metrics_count": len(metric_objs),
            "message": f"Reset to {len(sale_objs)} sample transactions across {len(metric_objs)} days.",
        }
    except Exception as exc:
        db.rollback()
        return {"success": False, "error": str(exc)}
