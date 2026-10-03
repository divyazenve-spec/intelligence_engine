"""Dashboard endpoint: returns all sales + daily metrics."""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.services import sales_service

router = APIRouter()


@router.get("")
@router.post("")
def load_data(db: Session = Depends(get_db)):
    """Load all sales and daily metrics from the database."""
    return sales_service.load_all(db)
