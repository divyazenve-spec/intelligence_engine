"""SQLAlchemy ORM model for the `sales` table."""
from sqlalchemy import BigInteger, Column, Float, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class Sale(Base):
    __tablename__ = "sales"

    seq: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    sale_id: Mapped[str] = mapped_column(String(64), nullable=False, unique=True)
    transaction_ref: Mapped[str] = mapped_column(String(64), nullable=False)
    sold_at: Mapped[str] = mapped_column(String(40), nullable=False)
    source: Mapped[str] = mapped_column(String(120), nullable=False)
    person: Mapped[str] = mapped_column(String(160), nullable=False)
    city: Mapped[str] = mapped_column(String(80), nullable=False)
    amount: Mapped[float] = mapped_column(Float, nullable=False, default=0)
    status: Mapped[str] = mapped_column(String(20), nullable=False, default="Paid")
    app_source: Mapped[str] = mapped_column(String(20), nullable=False, default="Android")
    is_demo: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
