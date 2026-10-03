"""SQLAlchemy ORM model for the `daily_metrics` table.

Schema is managed externally (database/init/01_schema.sql).
"""
from sqlalchemy import Column, Date, Integer, Numeric

from app.core.database import Base
from app.core.formatting import num


class DailyMetric(Base):
    __tablename__ = "daily_metrics"

    business_date = Column(Date, primary_key=True, unique=True, nullable=False)
    sales_total = Column(Numeric(14, 2), nullable=False, default=0)
    android_downloads = Column(Integer, nullable=False, default=0)
    ios_downloads = Column(Integer, nullable=False, default=0)

    def to_dict(self):
        return {
            "business_date": self.business_date.isoformat(),
            "sales_total": num(self.sales_total),
            "android_downloads": self.android_downloads,
            "ios_downloads": self.ios_downloads,
        }
