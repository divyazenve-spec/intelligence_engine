"""v1 API router — mounts all endpoint sub-routers and exposes legacy paths."""
from fastapi import APIRouter

from app.api.v1.endpoints import chat, dashboard, inventory, pipeline, predict, sales

router = APIRouter()

# Versioned routes
router.include_router(dashboard.router, prefix="/data", tags=["dashboard"])
router.include_router(sales.router, prefix="/sales", tags=["sales"])
router.include_router(chat.router, prefix="/ai", tags=["ai"])
router.include_router(inventory.router, prefix="/inventory", tags=["inventory"])
router.include_router(pipeline.router, prefix="/pipeline", tags=["pipeline"])
router.include_router(predict.router, prefix="/predict", tags=["predict"])
