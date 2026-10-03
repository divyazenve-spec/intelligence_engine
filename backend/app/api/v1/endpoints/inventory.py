"""Inventory endpoints — load and save inventory data (JSON blob in DB or file)."""
from __future__ import annotations

import json
from pathlib import Path

from fastapi import Depends, Request
from sqlalchemy.orm import Session

from app.api.deps import get_db

# Simple file-based inventory persistence (no dedicated table needed)
_INVENTORY_FILE = Path(__file__).resolve().parents[5] / "frontend" / "public" / "assets" / "inventory.json"


def _load_inventory_data() -> dict:
    try:
        if _INVENTORY_FILE.exists():
            with open(_INVENTORY_FILE, encoding="utf-8") as fh:
                return json.load(fh)
    except Exception:
        pass
    return {"items": [], "lastUpdated": None}


def _save_inventory_data(data: dict) -> None:
    try:
        _INVENTORY_FILE.parent.mkdir(parents=True, exist_ok=True)
        with open(_INVENTORY_FILE, "w", encoding="utf-8") as fh:
            json.dump(data, fh, ensure_ascii=False, indent=2)
    except Exception as exc:
        raise RuntimeError(f"Failed to save inventory: {exc}") from exc


async def load_inventory(request: Request, db: Session = Depends(get_db)):
    """Return current inventory data."""
    return _load_inventory_data()


async def save_inventory(request: Request, db: Session = Depends(get_db)):
    """Persist inventory data sent as JSON body."""
    try:
        body = await request.json()
    except Exception:
        return {"success": False, "error": "Invalid JSON body."}
    _save_inventory_data(body)
    return {"success": True}
