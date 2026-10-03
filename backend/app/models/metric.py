"""SQLAlchemy ORM model for the `daily_metrics` table."""
from datetime import date

from sqlalchemy import BigInteger, Date, Float, Integer
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class DailyMetric(Base):
    __tablename__ = "daily_metrics"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    business_date: Mapped[date] = mapped_column(Date, nullable=False, unique=True)
    sales_total: Mapped[float] = mapped_column(Float, nullable=False, default=0)
    android_downloads: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    ios_downloads: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
