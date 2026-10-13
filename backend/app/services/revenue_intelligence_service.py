"""Revenue Intelligence engine.

Pipeline: ingest transactions -> detect leakage vectors -> score/rank ->
expose safeguards. With no data, every metric is zero and lists are empty;
the engine activates automatically once sales/transactions are ingested.

Transactions come from the DB (sales table) and/or an optional
``transactions`` list in the request. Optional per-row fields:
``discount``, ``cogs``, ``logistics_cost``, ``voucher``, ``order_count``,
``sku``/``service``, ``price``, ``qty``, ``hub``.
"""
from __future__ import annotations

from collections import defaultdict
from datetime import datetime

from sqlalchemy.orm import Session

from app.schemas.sales import to_float
from app.services import sales_service

SEVERITY_ORDER = {"CRITICAL": 3, "HIGH": 2, "MEDIUM": 1, "LOW": 0}
GATEWAY_RATE = 0.02

# In-memory safeguard ledger (swap for a DB table when persistence is needed)
_SAFEGUARD_LOG: list[dict] = []
_APPLIED: dict[str, dict] = {}


def _empty() -> dict:
    return {
        "kpis": {
            "detectedLeakage": 0,
            "recoveryRealized": 0,
            "optimalElasticity": 0.0,
            "discountEfficiency": 0.0,
            "netRealizationRate": 0.0,
            "grossBookings": 0,
        },
        "leakagePoints": [],
        "elasticityMatrix": [],
        "waterfall": [],
        "auditLog": list(_SAFEGUARD_LOG),
    }


def _severity(drag: float, gross: float) -> str:
    share = drag / gross if gross else 0
    if share >= 0.05:
        return "CRITICAL"
    if share >= 0.02:
        return "HIGH"
    if share >= 0.01:
        return "MEDIUM"
    return "LOW"


def _collect(db: Session | None, extra: list | None) -> list[dict]:
    rows: list[dict] = []
    if db is not None:
        for s in sales_service.load_all(db)["sales"]:
            rows.append({
                "gross": to_float(s["amount"]),
                "status": s.get("status", "Paid"),
                "channel": s.get("app_source") or "Other",
                "hub": s.get("city") or "Unknown",
                "person": s.get("person"),
                "service": s.get("source") or "General",
            })
    for t in extra or []:
        rows.append({
            "gross": to_float(t.get("gross", t.get("amount", 0))),
            "discount": to_float(t.get("discount", 0)),
            "cogs": to_float(t.get("cogs", 0)),
            "logistics": to_float(t.get("logistics_cost", 0)),
            "voucher": t.get("voucher"),
            "order_count": int(t.get("order_count", 1) or 1),
            "status": t.get("status", "Paid"),
            "channel": t.get("channel") or t.get("app_source") or "Other",
            "hub": t.get("hub") or t.get("city") or "Unknown",
            "person": t.get("person"),
            "service": t.get("service") or t.get("sku") or t.get("source") or "General",
            "price": to_float(t.get("price", 0)),
            "qty": to_float(t.get("qty", 0)),
            "period": t.get("period"),
        })
    return rows


def _elasticity(rows: list[dict]) -> list[dict]:
    """Arc elasticity per service from price/qty observations in two periods."""
    obs: dict[str, dict[str, tuple[float, float]]] = defaultdict(dict)
    for r in rows:
        if r.get("price") and r.get("qty") and r.get("period"):
            obs[r["service"]][str(r["period"])] = (r["price"], r["qty"])
    out = []
    for svc, per in obs.items():
        if len(per) < 2:
            continue
        (p0, q0), (p1, q1) = [per[k] for k in sorted(per)[:2]]
        if p0 == p1 or q0 == 0 or p0 == 0:
            continue
        e = abs(((q1 - q0) / q0) / ((p1 - p0) / p0))
        inelastic = e < 0.7
        rec = round(p1 * 1.08) if inelastic else p1
        gain = round((rec - p1) * q1 * 12) if inelastic else 0
        out.append({
            "service": svc, "currentPrice": round(p1), "recommendedPrice": rec,
            "elasticity": round(e, 2), "projectedGain": gain,
        })
    return sorted(out, key=lambda x: x["projectedGain"], reverse=True)


def get_intelligence(payload: dict | None = None, db: Session | None = None) -> dict:
    payload = payload or {}
    rows = _collect(db, payload.get("transactions"))
    if not rows:
        return _empty()

    paid = [r for r in rows if r["status"] == "Paid"]
    returned = [r for r in rows if r["status"] in ("Refunded", "Failed", "Cancelled", "Returned")]
    gross = sum(r["gross"] for r in rows)
    if gross <= 0:
        return _empty()

    discounts = sum(r.get("discount", 0) for r in rows)
    refunds = sum(r["gross"] for r in returned)
    cogs = sum(r.get("cogs", 0) for r in paid)
    logistics = sum(r.get("logistics", 0) for r in paid)
    gateway = sum(r["gross"] for r in paid) * GATEWAY_RATE
    net = gross - discounts - refunds - cogs - logistics - gateway

    leaks: list[dict] = []

    # 1. Discount slippage: acquisition vouchers redeemed by repeat customers
    slip: dict[str, float] = defaultdict(float)
    slip_n: dict[str, int] = defaultdict(int)
    for r in rows:
        if r.get("voucher") and r.get("order_count", 1) >= 3 and r.get("discount", 0) > 0:
            slip[r["voucher"]] += r["discount"]
            slip_n[r["voucher"]] += 1
    for v, d in slip.items():
        leaks.append({
            "vector": "DISCOUNT_SLIPPAGE", "source": f"Checkout — '{v}' voucher",
            "monthlyDrag": round(d), "severity": _severity(d, gross),
            "rootCause": f"Acquisition voucher redeemed by {slip_n[v]} repeat customers",
            "recommendedAction": "Lock voucher to first-time device / mobile number",
            "safeguardType": "COUPON_RULE_UPDATE",
        })

    # 2. Return drag by channel
    ret_by_ch: dict[str, float] = defaultdict(float)
    for r in returned:
        ret_by_ch[r["channel"]] += r["gross"]
    for ch, d in ret_by_ch.items():
        leaks.append({
            "vector": "RETURN_DRAG", "source": f"{ch} channel refunds / failed orders",
            "monthlyDrag": round(d), "severity": _severity(d, gross),
            "rootCause": "Refunded or failed orders removing booked revenue",
            "recommendedAction": "Enable pre-dispatch verification for high-value orders",
            "safeguardType": "ORDER_VERIFICATION",
        })

    # 3. Logistics erosion: orders whose logistics cost exceeds 15% of value
    erosion = sum(r.get("logistics", 0) for r in paid
                  if r["gross"] and r.get("logistics", 0) / r["gross"] > 0.15)
    if erosion > 0:
        leaks.append({
            "vector": "LOGISTICS_EROSION", "source": "Low-basket delivery orders",
            "monthlyDrag": round(erosion), "severity": _severity(erosion, gross),
            "rootCause": "Delivery cost exceeds 15% of order value",
            "recommendedAction": "Raise free-delivery threshold / add surge surcharge",
            "safeguardType": "DELIVERY_FEE_RULE",
        })

    # 4. Pricing disparity: same service, hub averages diverging >15%
    by_svc: dict[str, dict[str, list[float]]] = defaultdict(lambda: defaultdict(list))
    for r in paid:
        by_svc[r["service"]][r["hub"]].append(r["gross"])
    for svc, hubs in by_svc.items():
        avgs = {h: sum(v) / len(v) for h, v in hubs.items() if len(v) >= 2}
        if len(avgs) >= 2:
            hi, lo = max(avgs.values()), min(avgs.values())
            if hi and (hi - lo) / hi > 0.15:
                low_hub = min(avgs, key=avgs.get)
                drag = (hi - lo) * len(hubs[low_hub])
                leaks.append({
                    "vector": "PRICING_DISPARITY", "source": f"{svc} — {low_hub}",
                    "monthlyDrag": round(drag), "severity": _severity(drag, gross),
                    "rootCause": f"Avg bill {round(lo)} vs {round(hi)} at best hub",
                    "recommendedAction": "Push unified price list via ERP",
                    "safeguardType": "ERP_PRICE_PUSH",
                })

    # 5. Unbilled procedures (explicit flag from EMR/billing integration)
    unbilled = sum(to_float(t.get("unbilled_amount", 0)) for t in payload.get("transactions") or [])
    if unbilled > 0:
        leaks.append({
            "vector": "UNBILLED_PROCEDURES", "source": "Clinical billing completeness",
            "monthlyDrag": round(unbilled), "severity": _severity(unbilled, gross),
            "rootCause": "Consumables / line items missing from final invoices",
            "recommendedAction": "Enforce mandatory consumables sign-off in EMR",
            "safeguardType": "EMR_BILLING_CHECKLIST",
        })

    leaks.sort(key=lambda x: (SEVERITY_ORDER[x["severity"]], x["monthlyDrag"]), reverse=True)
    for i, lk in enumerate(leaks, 1):
        lk["id"] = f"LEAK-{i:03d}"
        lk["status"] = "APPLIED" if lk["id"] in _APPLIED else "PENDING"

    elasticity = _elasticity(rows)
    total_leak = sum(l["monthlyDrag"] for l in leaks)
    recovered = sum(l["monthlyDrag"] for l in leaks if l["status"] == "APPLIED")
    discounted = [r for r in rows if r.get("discount", 0) > 0]
    eff = 0.0
    if discounted:
        good = sum(1 for r in discounted if r.get("order_count", 1) < 3)
        eff = round(good / len(discounted) * 100, 1)

    return {
        "kpis": {
            "detectedLeakage": total_leak,
            "recoveryRealized": recovered,
            "optimalElasticity": round(sum(e["elasticity"] for e in elasticity) / len(elasticity), 2) if elasticity else 0.0,
            "discountEfficiency": eff,
            "netRealizationRate": round(net / gross * 100, 1),
            "grossBookings": round(gross),
        },
        "leakagePoints": leaks,
        "elasticityMatrix": elasticity,
        "waterfall": [
            {"label": "Gross Bookings", "value": round(gross)},
            {"label": "Discounts", "value": -round(discounts)},
            {"label": "Refunds", "value": -round(refunds)},
            {"label": "Logistics", "value": -round(logistics)},
            {"label": "COGS", "value": -round(cogs)},
            {"label": "Gateway Fees", "value": -round(gateway)},
            {"label": "Net Realized", "value": round(net)},
        ],
        "auditLog": list(_SAFEGUARD_LOG),
    }


def simulate(payload: dict | None, db: Session | None = None) -> dict:
    """What-if: price uplift on inelastic services and repeat-discount cap."""
    payload = payload or {}
    price_pct = float(payload.get("priceIncreasePct", 0)) / 100
    cap_pct = float(payload.get("discountCapPct", 100))
    data = get_intelligence(payload, db)
    uplift = 0
    for e in data["elasticityMatrix"]:
        step = e["recommendedPrice"] - e["currentPrice"]
        if e["elasticity"] < 0.7 and step:
            annual_volume = e["projectedGain"] / step
            uplift += round(e["currentPrice"] * price_pct * annual_volume)
    slip = sum(l["monthlyDrag"] for l in data["leakagePoints"] if l["vector"] == "DISCOUNT_SLIPPAGE")
    saved = round(slip * (1 - min(cap_pct, 100) / 100))
    return {"projectedPriceGain": uplift, "projectedDiscountSavings": saved,
            "projectedTotalLift": uplift + saved}


def apply_safeguard(leak_id: str, payload: dict | None = None, db: Session | None = None) -> dict:
    data = get_intelligence(payload, db)
    leak = next((l for l in data["leakagePoints"] if l["id"] == leak_id), None)
    if not leak:
        return {"success": False, "error": f"Leak {leak_id} not found"}
    ts = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S UTC")
    _APPLIED[leak_id] = leak
    entry = {
        "id": leak_id, "vector": leak["vector"], "source": leak["source"],
        "recovered": leak["monthlyDrag"], "executedAt": ts,
        "detail": f"{leak['safeguardType']} applied: {leak['recommendedAction']}",
    }
    _SAFEGUARD_LOG.insert(0, entry)
    return {"success": True, "status": "APPLIED", "entry": entry}
