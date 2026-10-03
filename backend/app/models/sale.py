"""SQLAlchemy ORM model for the `sales` table.

The schema is managed externally (database/init/01_schema.sql).
SQLAlchemy reflects the table structure here without owning migrations.
"""
from sqlalchemy import BigInteger, Boolean, Column, Numeric, String

from app.core.database import Base
from app.core.formatting import num


class Sale(Base):
    __tablename__ = "sales"
    # Match schema in database/init/01_schema.sql exactly
    seq = Column(BigInteger, primary_key=True, autoincrement=True)
    sale_id = Column(String(64), unique=True, nullable=False)
    transaction_ref = Column(String(64), nullable=False, default="")
    sold_at = Column(String(40), index=True, nullable=False, default="")  # ISO string, kept verbatim
    source = Column(String(120), nullable=False, default="")
    person = Column(String(160), nullable=False, default="")
    city = Column(String(80), nullable=False, default="")
    amount = Column(Numeric(14, 2), nullable=False, default=0)
    status = Column(String(20), nullable=False, default="Paid")
    app_source = Column(String(20), nullable=False, default="Android")
    is_demo = Column(Boolean, nullable=False, default=False)

    def to_dict(self):
        return {
            "id": self.sale_id,
            "transaction_ref": self.transaction_ref,
            "sold_at": self.sold_at,
            "source": self.source,
            "person": self.person,
            "city": self.city,
            "amount": num(self.amount),
            "status": self.status,
            "app_source": self.app_source,
            "is_demo": self.is_demo,
        }
