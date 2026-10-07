"""FastAPI application entry point.

Run locally:  uvicorn app.main:app --reload --port 8000
Production:   gunicorn app.main:app --bind 0.0.0.0:8000 --workers 3 --worker-class uvicorn.workers.UvicornWorker
"""
import logging
import time
from pathlib import Path

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse

from app.api.v1.router import router as v1_router
from app.core.config import settings
from app.core.database import Base, engine
import app.models  # noqa: F401 — registers all models with Base

# Auto-create tables (MySQL / SQLite fallback)
Base.metadata.create_all(bind=engine)

# ---------------------------------------------------------------------------
# Logging
# ---------------------------------------------------------------------------
logging.basicConfig(
    format="%(asctime)s %(levelname)s %(name)s: %(message)s",
    level=logging.INFO,
)
log = logging.getLogger("zenve")

# ---------------------------------------------------------------------------
# App
# ---------------------------------------------------------------------------
app = FastAPI(
    title="Zenve BI API",
    description="Business Intelligence API for Zenve Pets Healthcare",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json",
)

# ---------------------------------------------------------------------------
# CORS (same permissive policy as the original server)
# ---------------------------------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Content-Type", "x-tsr-serverFn", "accept", "authorization"],
)


# ---------------------------------------------------------------------------
# Request logging middleware
# ---------------------------------------------------------------------------
@app.middleware("http")
async def log_requests(request: Request, call_next):
    start = time.monotonic()
    response = await call_next(request)
    log.info(
        "%s %s -> %s (%.0fms)",
        request.method,
        request.url.path,
        response.status_code,
        (time.monotonic() - start) * 1000,
    )
    return response


# ---------------------------------------------------------------------------
# Versioned API routes  →  /api/v1/*
# ---------------------------------------------------------------------------
app.include_router(v1_router, prefix="/api/v1")
app.include_router(v1_router, prefix="/api")

# ---------------------------------------------------------------------------
# Legacy unversioned paths the compiled frontend calls
# ---------------------------------------------------------------------------
# These mirror the original Django legacy_patterns() so the compiled UI
# continues to work without changes.
from app.api.v1.endpoints import chat, dashboard, health, inventory, pipeline, sales
from app.api.deps import get_db

# _serverFn hashes  (same hashes as the original router.py)
_SERVER_FN: dict[str, object] = {
    "bcbf405abb63715daaf1487f2958492789217ff1449ff447570bc418404b6901": dashboard.load_data,
    "ff9ba9d093e37a2dd359e67563e0901dfbacbd2ef36af6c8c2fb2bab207f9351": sales.save_sale,
    "1e170028f6d5c2d668e6ce9ea50d05fd92944d2ff292aeecef0f7fe4a402c3a7": sales.import_sales,
    "d38e713a3790cd571b1ac9fbb887fa6a068300c68d674624825b2cb7d028febf": chat.ai_brief,
    "b12577a9f2c2e9e5f8dbe451a3d99d3815e1707ea5d584b55a2dd420dfd92a17": inventory.load_inventory,
    "ea22e0557247ded1945c9f1c2cc2c997949fdd3d1b6d59e8e4ab473c413e0e5e": inventory.save_inventory,
}

for _fid, _view in _SERVER_FN.items():
    app.add_api_route(f"/_serverFn/{_fid}", _view, methods=["GET", "POST"])

# Unversioned /api/* aliases
app.add_api_route("/api/data", dashboard.load_data, methods=["GET", "POST"])
app.add_api_route("/api/health", health.get_system_health, methods=["GET", "POST"])
app.add_api_route("/api/health/overview", health.get_system_health, methods=["GET", "POST"])
app.add_api_route("/api/health/apis", health.get_api_health, methods=["GET", "POST"])
app.add_api_route("/api/health/database", health.get_database_health, methods=["GET", "POST"])
app.add_api_route("/api/health/logs", health.get_integration_logs, methods=["GET", "POST"])
app.add_api_route("/api/sales/save", sales.save_sale, methods=["POST"])
app.add_api_route("/api/sales/import", sales.import_sales, methods=["POST"])
app.add_api_route("/api/ai/brief", chat.ai_brief, methods=["GET", "POST"])
app.add_api_route("/api/inventory", inventory.load_inventory, methods=["GET", "POST"])
app.add_api_route("/api/inventory/save", inventory.save_inventory, methods=["POST"])
app.add_api_route("/api/pipeline/upload", pipeline.upload_dataset, methods=["POST"])
app.add_api_route("/api/pipeline/template", pipeline.download_template, methods=["GET"])
app.add_api_route("/api/pipeline/reset", pipeline.reset_to_sample, methods=["POST"])

# Stub analytics / broadcast routes (kept for compiled UI compatibility)
@app.api_route("/analytics/{_:path}", methods=["GET", "POST", "OPTIONS"])
@app.api_route("/broadcast/{_:path}", methods=["GET", "POST", "OPTIONS"])
@app.api_route("/~api/{_:path}", methods=["GET", "POST", "OPTIONS"])
@app.api_route("/~api", methods=["GET", "POST", "OPTIONS"])
async def _ok():
    return {"ok": True}


# ---------------------------------------------------------------------------
# Static frontend (standalone mode; nginx handles this in Docker)
# ---------------------------------------------------------------------------
FRONTEND_DIR: Path = settings.frontend_dir


def _find_frontend_file(rel: str):
    for base in (FRONTEND_DIR / "dist", FRONTEND_DIR / "public", FRONTEND_DIR):
        try:
            candidate = (base / rel).resolve()
            if base.resolve() in candidate.parents and candidate.is_file():
                return candidate
        except Exception:
            pass
    return None


@app.get("/{full_path:path}", include_in_schema=False)
async def serve_frontend(full_path: str, request: Request):
    """Serve the compiled React/Vite frontend for all non-API paths."""
    if "zenve-logo.png" in full_path:
        f = _find_frontend_file("zenve-logo.png")
    elif full_path in ("", "index.html"):
        f = _find_frontend_file("index.html")
    else:
        f = _find_frontend_file(full_path)

    if f is None and "text/html" in request.headers.get("accept", ""):
        f = _find_frontend_file("index.html")

    if f is None:
        return JSONResponse({"error": "Not Found"}, status_code=404)

    response = FileResponse(str(f))
    if f.name in ("index.html",) or f.name.startswith("sales-dashboard."):
        response.headers["Cache-Control"] = "no-cache"
    return response
