"""API v1 router — aggregates all endpoint routers."""
from fastapi import APIRouter

from app.api.v1.endpoints import chat, dashboard, health, inventory, pipeline, predict, sales

router = APIRouter()

# Dashboard / data
router.add_api_route("/data", dashboard.load_data, methods=["GET", "POST"], tags=["dashboard"])

# Health
router.include_router(health.router, prefix="/health", tags=["health"])

# Sales
router.add_api_route("/sales/save", sales.save_sale, methods=["POST"], tags=["sales"])
router.add_api_route("/sales/import", sales.import_sales, methods=["POST"], tags=["sales"])

# AI
router.add_api_route("/ai/brief", chat.ai_brief, methods=["GET", "POST"], tags=["ai"])

# Inventory
router.add_api_route("/inventory", inventory.load_inventory, methods=["GET", "POST"], tags=["inventory"])
router.add_api_route("/inventory/save", inventory.save_inventory, methods=["POST"], tags=["inventory"])

# Pipeline
router.add_api_route("/pipeline/upload", pipeline.upload_dataset, methods=["POST"], tags=["pipeline"])
router.add_api_route("/pipeline/template", pipeline.download_template, methods=["GET"], tags=["pipeline"])
router.add_api_route("/pipeline/reset", pipeline.reset_to_sample, methods=["POST"], tags=["pipeline"])

# Predict (future ML)
router.add_api_route("/predict", predict.predict, methods=["POST"], tags=["predict"])
