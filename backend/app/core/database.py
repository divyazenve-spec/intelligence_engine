"""SQLAlchemy engine, session factory, and FastAPI dependency (MySQL backend)."""
import logging

from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker

from app.core.config import settings

logger = logging.getLogger("zenve.database")


def _init_engine():
    try:
        mysql_engine = create_engine(
            settings.database_url,
            pool_size=10,
            max_overflow=20,
            pool_recycle=3600,
            pool_pre_ping=True,
        )
        # Quick validation ping
        with mysql_engine.connect() as conn:
            pass
        return mysql_engine
    except Exception as exc:
        print(f"[zenve-db] Warning: MySQL connection failed ({exc}). Falling back to SQLite: {settings.db_path}")
        return create_engine(
            f"sqlite:///{settings.db_path}",
            connect_args={"check_same_thread": False},
        )


engine = _init_engine()
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
