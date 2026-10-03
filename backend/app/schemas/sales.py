"""Sale payload normalisation helpers.

Request body (save):   {"data": {transactionRef, soldAt, source, person, city, amount, status,
                                 appSource, androidDownloads, iosDownloads}}
Request body (import): {"data": {"rows": [ ...same fields... ]}}
"""
import datetime as dt
import time
from typing import Any, Optional

from pydantic import BaseModel


# ---------------------------------------------------------------------------
# Pydantic schemas
# ---------------------------------------------------------------------------

class SaleIn(BaseModel):
    transactionRef: Optional[str] = None
    soldAt: Optional[str] = None
    source: Optional[str] = None
    person: Optional[str] = None
    city: Optional[str] = None
    amount: Optional[float] = 0.0
    status: Optional[str] = "Paid"
    appSource: Optional[str] = "Android"
    androidDownloads: Optional[float] = 0
    iosDownloads: Optional[float] = 0


class SaleDataWrapper(BaseModel):
    data: Optional[SaleIn] = None


class ImportDataPayload(BaseModel):
    rows: Optional[list[dict[str, Any]]] = None


class ImportDataWrapper(BaseModel):
    data: Optional[ImportDataPayload] = None


# ---------------------------------------------------------------------------
# Normalisation helpers (used by services)
# ---------------------------------------------------------------------------

def _now_iso() -> str:
    n = dt.datetime.now(dt.timezone.utc)
    return n.strftime("%Y-%m-%dT%H:%M:%S.") + f"{n.microsecond // 1000:03d}Z"


def to_float(v) -> float:
    try:
        return float(v or 0)
    except (TypeError, ValueError):
        return 0.0


def sale_fields(d: dict, default_source: str, default_person: str) -> dict:
    return {
        "transaction_ref": d.get("transactionRef") or f"ZV-{str(int(time.time() * 1000))[-5:]}",
        "sold_at": d.get("soldAt") or _now_iso(),
        "source": d.get("source") or default_source,
        "person": d.get("person") or default_person,
        "city": d.get("city") or "Bengaluru",
        "amount": to_float(d.get("amount")),
        "status": d.get("status") or "Paid",
        "app_source": d.get("appSource") or "Android",
    }
