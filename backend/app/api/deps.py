"""FastAPI dependency: database session injection."""
from app.core.database import SessionLocal


def get_db():
    """Yield a SQLAlchemy session for each request and close it on teardown."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
