"""FastAPI Endpoints for Autonomous Multi-Agent Executive Co-Pilot (Text-to-Action)."""
from __future__ import annotations

from typing import Any, Dict, Optional
from fastapi import APIRouter, Depends, HTTPException, Request
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.services.copilot_service import ExecutiveCopilotEngine

router = APIRouter()


class CopilotQueryRequest(BaseModel):
    query: str = Field(..., description="Executive natural language question or action command")
    context: Optional[Dict[str, Any]] = Field(default=None, description="Session and intent state")


class ExecuteActionRequest(BaseModel):
    action_id: str = Field(..., description="Action ID from drafted proposal (e.g., ACT-PO-8821)")
    payload: Optional[Dict[str, Any]] = Field(default=None, description="Configured or edited parameters")
    user: Optional[str] = Field(default="Executive Admin", description="Approving officer")


@router.post("/query")
async def copilot_query(req: CopilotQueryRequest, db: Session = Depends(get_db)):
    """Orchestrate multi-agent reasoning, live MySQL query, dynamic visualization, and actionable proposals."""
    if not req.query or not req.query.strip():
        raise HTTPException(status_code=400, detail="Query cannot be empty")
    
    engine = ExecutiveCopilotEngine(db)
    response = engine.process_query(req.query, req.context)
    return response


@router.post("/execute-action")
async def execute_action(req: ExecuteActionRequest, db: Session = Depends(get_db)):
    """Human-in-the-loop Text-to-Action execution endpoint: commits changes to MySQL and returns audit receipt."""
    if not req.action_id:
        raise HTTPException(status_code=400, detail="action_id is required")

    engine = ExecutiveCopilotEngine(db)
    receipt = engine.execute_action(req.action_id, req.payload, req.user or "Executive Admin")
    return receipt


@router.get("/audit-trail")
async def get_audit_trail(db: Session = Depends(get_db)):
    """Retrieve running audit trail of all approved autonomous actions."""
    engine = ExecutiveCopilotEngine(db)
    return {"audit_trail": engine.get_audit_trail()}
