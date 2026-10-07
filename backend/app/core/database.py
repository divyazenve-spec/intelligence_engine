"""SQLAlchemy engine, session factory, and FastAPI dependency (MySQL backend)."""
from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker

from app.core.config import settings

# Create engine with connection pooling and pre-ping for MySQL
engine = create_engine(
    settings.database_url,
    pool_size=10,
    max_overflow=20,
    pool_recycle=3600,
    pool_pre_ping=True,
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class Base(DeclarativeBase):
    """Shared declarative base for all ORM models."""


def get_db():
    """FastAPI dependency that yields a SQLAlchemy session and closes it on teardown."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
