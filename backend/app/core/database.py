"""SQLAlchemy engine, session factory, and FastAPI dependency (SQLite backend)."""
from pathlib import Path

from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker

from app.core.config import settings

engine = create_engine(
    settings.database_url,
    connect_args={"check_same_thread": False},  # required for SQLite + FastAPI
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
