"""Inventory endpoints: list and upsert inventory items.

Note: inventory is currently held in-process memory (no DB table yet).
"""
import json
from typing import Any, Optional

from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel

router = APIRouter()

# In-process store (same as the original Django version)
INVENTORY_ITEMS: list[dict] = [
    {"id": 1, "sku": "ZV-CAN-01", "name": "Royal Canin Puppy Food", "category": "Pet Products", "quantity": 24, "reorder_level": 30, "unit_price": 2850.0},
    {"id": 2, "sku": "ZV-BRA-02", "name": "Bravecto Flea & Tick 20-40kg", "category": "Pharmacy", "quantity": 48, "reorder_level": 20, "unit_price": 1950.0},
    {"id": 3, "sku": "ZV-PED-03", "name": "Pedigree Adult Dry Food 10kg", "category": "Pet Products", "quantity": 85, "reorder_level": 25, "unit_price": 1400.0},
    {"id": 4, "sku": "ZV-VAC-04", "name": "Zoetis Vanguard 7 Vaccine", "category": "Medicines", "quantity": 62, "reorder_level": 15, "unit_price": 850.0},
    {"id": 5, "sku": "ZV-CON-05", "name": "Veterinary Clinical Tele-Kit", "category": "Veterinary Services", "quantity": 110, "reorder_level": 30, "unit_price": 650.0},
    {"id": 6, "sku": "ZV-MED-06", "name": "Pet Pharmacy Multi-Vitamins", "category": "Pharmacy", "quantity": 9, "reorder_level": 20, "unit_price": 420.0},
]


class InventoryItemIn(BaseModel):
    sku: Optional[str] = ""
    name: Optional[str] = "New Product"
    category: Optional[str] = "General"
    quantity: Optional[int] = 0
    reorderLevel: Optional[int] = 10
    unitPrice: Optional[float] = 0.0


class InventoryBody(BaseModel):
    data: Optional[InventoryItemIn] = None


@router.get("")
@router.post("")
def load_inventory():
    """Return the full inventory list."""
    return {"items": INVENTORY_ITEMS, "mode": "live"}


@router.post("/save")
def save_inventory(body: InventoryBody):
    """Upsert an inventory item by SKU."""
    data = body.data
    if not data:
        return JSONResponse({"error": "No data provided"}, status_code=400)
    sku = (data.sku or "").strip()
    existing = next((item for item in INVENTORY_ITEMS if item["sku"].lower() == sku.lower()), None)
    if existing:
        existing["name"] = data.name or existing["name"]
        existing["category"] = data.category or existing["category"]
        existing["quantity"] = data.quantity if data.quantity is not None else existing["quantity"]
        existing["reorder_level"] = data.reorderLevel if data.reorderLevel is not None else existing["reorder_level"]
        existing["unit_price"] = data.unitPrice if data.unitPrice is not None else existing["unit_price"]
        return {"success": True, "item": existing}

    new_item = {
        "id": len(INVENTORY_ITEMS) + 1,
        "sku": sku or f"ZV-{len(INVENTORY_ITEMS) + 1:03d}",
        "name": data.name,
        "category": data.category,
        "quantity": data.quantity,
        "reorder_level": data.reorderLevel,
        "unit_price": data.unitPrice,
    }
    INVENTORY_ITEMS.append(new_item)
    return {"success": True, "item": new_item}
