"""Endpoints for all Zenve Engine dashboard domains connected directly to MySQL."""
from __future__ import annotations
from datetime import date, datetime, time, timedelta
from typing import Any, Dict, List, Optional
import random

from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel
from sqlalchemy.orm import Session
from sqlalchemy import desc

from app.api.deps import get_db
from app.models.all_models import (
    DailyMetric,
    Sale,
    Order,
    Product,
    PharmacyMedicine,
    VeterinaryService,
    Appointment,
    Doctor,
    ClinicHospital,
    Customer,
    PetParent,
    Pet,
    Employee,
    MarketingCampaign,
    Vendor,
    LogisticsDelivery,
    FashionProduct,
    B2BAccount,
    ImportExportShipment,
    SubscriptionPlan,
    Subscription,
    Report,
    Alert,
    SystemHealth,
    CompanySetting,
)

router = APIRouter()


# Helper serializer
def to_dict(obj: Any) -> Dict[str, Any]:
    if obj is None:
        return {}
    res = {}
    table = getattr(obj, "__table__", getattr(type(obj), "__table__", None))
    if table is not None:
        for col in table.columns:
            val = getattr(obj, col.name, None)
            if isinstance(val, (datetime, date, time)):
                res[col.name] = val.isoformat()
            elif isinstance(val, timedelta):
                res[col.name] = f"{val.seconds//3600:02d}:{(val.seconds%3600)//60:02d}"
            else:
                res[col.name] = val
    for prop in dir(type(obj)):
        if isinstance(getattr(type(obj), prop, None), property):
            try:
                val = getattr(obj, prop)
                if isinstance(val, (datetime, date, time)):
                    res[prop] = val.isoformat()
                elif isinstance(val, timedelta):
                    res[prop] = f"{val.seconds//3600:02d}:{(val.seconds%3600)//60:02d}"
                else:
                    res[prop] = val
            except Exception:
                pass
    return res


# =============================================================================
# 1. SUBSCRIPTIONS
# =============================================================================
class CreateSubscriptionPlan(BaseModel):
    name: str
    price: float
    billing_cycle: str = "Monthly"
    benefits: str = "Standard Subscription Benefits"
    active_subscribers: int = 0
    mrr: float = 0.0


class CreateSubscriber(BaseModel):
    plan_name: str
    pet_name: str
    parent_name: str
    parent_phone: str
    monthly_fee: float
    payment_method: str = "UPI AutoPay (HDFC)"


@router.get("/subscriptions/plans")
def list_subscription_plans(db: Session = Depends(get_db)):
    plans = db.query(SubscriptionPlan).order_by(SubscriptionPlan.id.asc()).all()
    return [to_dict(p) for p in plans]


@router.post("/subscriptions/plans")
def create_subscription_plan(payload: CreateSubscriptionPlan, db: Session = Depends(get_db)):
    plan_code = f"SUB-PLN-{random.randint(100, 999)}"
    mrr = payload.mrr if payload.mrr > 0 else payload.price * payload.active_subscribers
    plan = SubscriptionPlan(
        plan_code=plan_code,
        name=payload.name,
        price=payload.price,
        billing_cycle=payload.billing_cycle,
        active_subscribers=payload.active_subscribers,
        mrr=mrr,
        benefits=payload.benefits,
        status="Active"
    )
    db.add(plan)
    db.commit()
    db.refresh(plan)
    return {"success": True, "plan": to_dict(plan)}


@router.get("/subscriptions/subscribers")
def list_subscribers(db: Session = Depends(get_db)):
    subscribers = db.query(Subscription).order_by(Subscription.id.desc()).all()
    return [to_dict(s) for s in subscribers]


@router.post("/subscriptions/subscribers")
def create_subscriber(payload: CreateSubscriber, db: Session = Depends(get_db)):
    code = f"SUB-ACT-{random.randint(8000, 9999)}"
    next_bill = date.today().replace(day=min(date.today().day, 28))
    sub = Subscription(
        subscription_code=code,
        plan_name=payload.plan_name,
        pet_name=payload.pet_name,
        parent_name=payload.parent_name,
        parent_phone=payload.parent_phone,
        monthly_fee=payload.monthly_fee,
        payment_method=payload.payment_method,
        next_billing_date=next_bill,
        status="Active"
    )
    db.add(sub)
    # Increment active count on plan
    plan = db.query(SubscriptionPlan).filter(SubscriptionPlan.name.like(f"%{payload.plan_name[:10]}%")).first()
    if plan:
        plan.active_subscribers += 1
        plan.mrr += payload.monthly_fee
    db.commit()
    db.refresh(sub)
    return {"success": True, "subscriber": to_dict(sub)}


@router.post("/subscriptions/subscribers/{sub_id}/cancel")
def cancel_subscriber(sub_id: int, db: Session = Depends(get_db)):
    sub = db.query(Subscription).filter(Subscription.id == sub_id).first()
    if not sub:
        raise HTTPException(status_code=404, detail="Subscriber not found")
    sub.status = "Cancelled"
    db.commit()
    return {"success": True, "message": "Subscription cancelled", "subscriber": to_dict(sub)}


@router.post("/subscriptions/subscribers/{sub_id}/renew")
def renew_subscriber(sub_id: int, db: Session = Depends(get_db)):
    sub = db.query(Subscription).filter(Subscription.id == sub_id).first()
    if not sub:
        raise HTTPException(status_code=404, detail="Subscriber not found")
    sub.status = "Active"
    db.commit()
    return {"success": True, "message": "Subscription renewed", "subscriber": to_dict(sub)}


@router.delete("/subscriptions/subscribers/{sub_id}")
def delete_subscriber(sub_id: int, db: Session = Depends(get_db)):
    sub = db.query(Subscription).filter(Subscription.id == sub_id).first()
    if not sub:
        raise HTTPException(status_code=404, detail="Subscriber not found")
    db.delete(sub)
    db.commit()
    return {"success": True, "message": "Subscriber deleted"}


# =============================================================================
# 2. ORDERS & OPERATIONS
# =============================================================================
class CreateOrder(BaseModel):
    customer_name: str
    customer_phone: str
    items_count: int = 1
    total_amount: float
    delivery_slot: str = "Express 60-Min"
    city: str = "Bengaluru"
    payment_method: str = "UPI"
    channel: str = "Android App"


@router.get("/orders")
def list_orders(status: Optional[str] = None, db: Session = Depends(get_db)):
    q = db.query(Order)
    if status and status != "ALL":
        q = q.filter(Order.status == status)
    orders = q.order_by(Order.id.desc()).all()
    return [to_dict(o) for o in orders]


@router.post("/orders")
def create_order(payload: CreateOrder, db: Session = Depends(get_db)):
    order_number = f"ORD-2026-{random.randint(1000, 9999)}"
    order = Order(
        order_number=order_number,
        total_amount=payload.total_amount,
        status="Placed",
        payment_status="Confirmed",
        placed_at=datetime.utcnow()
    )
    db.add(order)
    db.commit()
    db.refresh(order)
    return {"success": True, "order": to_dict(order)}


@router.put("/orders/{order_id}/status")
def update_order_status(order_id: int, status: str = Query(...), db: Session = Depends(get_db)):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    order.status = status
    db.commit()
    return {"success": True, "order": to_dict(order)}


@router.delete("/orders/{order_id}")
def delete_order(order_id: int, db: Session = Depends(get_db)):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    db.delete(order)
    db.commit()
    return {"success": True, "message": "Order deleted"}


# =============================================================================
# 3. PRODUCTS & INVENTORY
# =============================================================================
class CreateProduct(BaseModel):
    name: str
    category: str
    brand: str = "Zenve Care"
    price: float
    cost_price: float = 0.0
    stock: int
    min_stock: int = 15
    unit: str = "Unit"


@router.get("/products")
def list_products(category: Optional[str] = None, db: Session = Depends(get_db)):
    q = db.query(Product)
    if category and category != "ALL":
        q = q.filter(Product.category == category)
    products = q.order_by(Product.name.asc()).all()
    return [to_dict(p) for p in products]


@router.post("/products")
def create_product(payload: CreateProduct, db: Session = Depends(get_db)):
    prod = Product(
        name=payload.name,
        price=payload.price,
        mrp=round(payload.price * 1.25, 2),
        discount_percent=20.0,
        pincode="560001",
        stock_quantity=payload.stock,
        is_prescription_required=0,
        rating=4.8,
        is_active=1
    )
    db.add(prod)
    db.commit()
    db.refresh(prod)
    return {"success": True, "product": to_dict(prod)}


@router.put("/products/{product_id}/stock")
def update_product_stock(product_id: int, stock: int = Query(...), db: Session = Depends(get_db)):
    prod = db.query(Product).filter(Product.id == product_id).first()
    if not prod:
        raise HTTPException(status_code=404, detail="Product not found")
    prod.stock_quantity = stock
    db.commit()
    return {"success": True, "product": to_dict(prod)}


@router.delete("/products/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    prod = db.query(Product).filter(Product.id == product_id).first()
    if not prod:
        raise HTTPException(status_code=404, detail="Product not found")
    db.delete(prod)
    db.commit()
    return {"success": True, "message": "Product removed"}


# =============================================================================
# 4. PHARMACY MEDICINES
# =============================================================================
class CreateMedicine(BaseModel):
    name: str
    brand: str
    salt_name: str
    category: str
    price: float
    stock: int
    batch_no: str
    expiry_date: str
    requires_prescription: int = 1


@router.get("/pharmacy/medicines")
def list_pharmacy_medicines(db: Session = Depends(get_db)):
    meds = db.query(PharmacyMedicine).order_by(PharmacyMedicine.name.asc()).all()
    if not meds:
        prods = db.query(Product).order_by(Product.name.asc()).all()
        return [
            {
                "id": p.id,
                "med_code": f"MED-{p.id:04d}",
                "name": p.name,
                "brand": "Zenve Pharmacy",
                "salt_name": "Amoxicillin Trihydrate IP" if "amox" in p.name.lower() else "Veterinary Formulation",
                "category": "Therapeutics & Antibiotics" if "amox" in p.name.lower() else "Veterinary Equipment",
                "price": p.price or 120.0,
                "stock": p.stock_quantity or 45,
                "batch_no": f"BAT-2026-{p.id:04d}",
                "expiry_date": "2027-12-31",
                "requires_prescription": p.is_prescription_required or 0,
                "status": "In Stock" if (p.stock_quantity or 0) > 10 else "Low Stock",
            }
            for p in prods
        ]
    return [to_dict(m) for m in meds]


@router.post("/pharmacy/medicines")
def create_pharmacy_medicine(payload: CreateMedicine, db: Session = Depends(get_db)):
    med_code = f"MED-{payload.name[:3].upper()}-{random.randint(10, 99)}"
    med = PharmacyMedicine(
        med_code=med_code,
        name=payload.name,
        brand=payload.brand,
        salt_name=payload.salt_name,
        category=payload.category,
        price=payload.price,
        stock=payload.stock,
        batch_no=payload.batch_no,
        expiry_date=datetime.strptime(payload.expiry_date, "%Y-%m-%d").date(),
        requires_prescription=payload.requires_prescription,
        status="Available" if payload.stock > 0 else "Out of Stock"
    )
    db.add(med)
    db.commit()
    db.refresh(med)
    return {"success": True, "medicine": to_dict(med)}


@router.delete("/pharmacy/medicines/{med_id}")
def delete_pharmacy_medicine(med_id: int, db: Session = Depends(get_db)):
    med = db.query(PharmacyMedicine).filter(PharmacyMedicine.id == med_id).first()
    if not med:
        raise HTTPException(status_code=404, detail="Medicine not found")
    db.delete(med)
    db.commit()
    return {"success": True, "message": "Medicine removed"}


# =============================================================================
# 5. VETERINARY SERVICES & APPOINTMENTS
# =============================================================================
class CreateAppointment(BaseModel):
    pet_name: str
    pet_type: str = "Dog"
    parent_name: str
    parent_phone: str
    doctor_name: str
    service_name: str
    appointment_date: str
    appointment_time: str
    clinic_name: str = "Zenve Central Animal Hospital, Koramangala"


@router.get("/veterinary/services")
def list_veterinary_services(db: Session = Depends(get_db)):
    services = db.query(VeterinaryService).order_by(VeterinaryService.id.asc()).all()
    return [to_dict(s) for s in services]


@router.get("/veterinary/appointments")
def list_appointments(db: Session = Depends(get_db)):
    apps = db.query(Appointment).order_by(Appointment.id.desc()).all()
    pets_map = {p.id: p for p in db.query(Pet).all()}
    parents_map = {p.id: p for p in db.query(PetParent).all()}
    doctors_map = {d.id: d for d in db.query(Doctor).all()}
    res = []
    for a in apps:
        pet = pets_map.get(a.pet_id)
        parent = parents_map.get(pet.parent_id) if pet else None
        doc = doctors_map.get(a.doctor_id)
        ad = to_dict(a)
        ad["appointment_code"] = f"APT-{a.id:04d}"
        ad["pet_name"] = pet.name if pet else f"Pet #{a.pet_id}"
        ad["pet_type"] = pet.species if pet and pet.species else "Dog"
        ad["parent_name"] = parent.full_name if parent else "Pet Parent"
        ad["parent_phone"] = parent.phone if parent and parent.phone else "+91 9597295344"
        ad["doctor_name"] = doc.name if doc else f"Dr. #{a.doctor_id}"
        ad["clinic_name"] = doc.clinic_name or doc.clinic_hospital or "Zenve Main Hospital" if doc else "Zenve Main Hospital"
        ad["service_name"] = a.appointment_type or "Veterinary Consultation"
        res.append(ad)
    return res


@router.post("/veterinary/appointments")
def create_appointment(payload: CreateAppointment, db: Session = Depends(get_db)):
    pet = db.query(Pet).filter(Pet.name == payload.pet_name).first()
    pet_id = pet.id if pet else 1
    doc = db.query(Doctor).first()
    doc_id = doc.id if doc else 1
    appt_time = time(10, 0)
    try:
        if ":" in payload.appointment_time:
            parts = payload.appointment_time.split(":")
            appt_time = time(int(parts[0]), int(parts[1][:2]))
    except Exception:
        pass
    app = Appointment(
        pet_id=pet_id,
        doctor_id=doc_id,
        appointment_date=datetime.strptime(payload.appointment_date, "%Y-%m-%d").date(),
        appointment_time=appt_time,
        appointment_type=payload.service_name or "In Clinic",
        status="Confirmed",
        payment_status="Paid",
        consultation_fee=200.0,
    )
    db.add(app)
    db.commit()
    db.refresh(app)
    return {"success": True, "appointment": to_dict(app)}


@router.put("/veterinary/appointments/{app_id}/status")
def update_appointment_status(app_id: int, status: str = Query(...), db: Session = Depends(get_db)):
    app = db.query(Appointment).filter(Appointment.id == app_id).first()
    if not app:
        raise HTTPException(status_code=404, detail="Appointment not found")
    app.status = status
    db.commit()
    return {"success": True, "appointment": to_dict(app)}


@router.delete("/veterinary/appointments/{app_id}")
def delete_appointment(app_id: int, db: Session = Depends(get_db)):
    app = db.query(Appointment).filter(Appointment.id == app_id).first()
    if not app:
        raise HTTPException(status_code=404, detail="Appointment not found")
    db.delete(app)
    db.commit()
    return {"success": True, "message": "Appointment deleted"}


# =============================================================================
# 6. DOCTORS DIRECTORY
# =============================================================================
class CreateDoctor(BaseModel):
    name: str
    specialty: str
    qualification: str
    experience_years: int
    phone: str
    email: str
    clinic_branch: str


@router.get("/doctors")
def list_doctors(db: Session = Depends(get_db)):
    docs = db.query(Doctor).order_by(Doctor.name.asc()).all()
    return [to_dict(d) for d in docs]


@router.post("/doctors")
def create_doctor(payload: CreateDoctor, db: Session = Depends(get_db)):
    doc = Doctor(
        name=payload.name,
        specializations=payload.specialty,
        qualification=payload.qualification,
        experience_years=payload.experience_years,
        phone=payload.phone,
        email=payload.email,
        clinic_name=payload.clinic_branch,
        clinic_hospital=payload.clinic_branch,
        facility_type="Clinic",
        city="Bengaluru",
        pincode="560001",
        consultation_fee=500.0,
        verification_status="verified",
        is_active=1
    )
    db.add(doc)
    db.commit()
    db.refresh(doc)
    return {"success": True, "doctor": to_dict(doc)}


@router.put("/doctors/{doc_id}/status")
def update_doctor_status(doc_id: int, status: str = Query(...), db: Session = Depends(get_db)):
    doc = db.query(Doctor).filter(Doctor.id == doc_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Doctor not found")
    doc.status = status
    db.commit()
    return {"success": True, "doctor": to_dict(doc)}


# =============================================================================
# 7. CLINICS & HOSPITALS
# =============================================================================
class CreateClinic(BaseModel):
    name: str
    type: str = "Tertiary Care Center"
    city: str = "Bengaluru"
    address: str = "Koramangala 4th Block"
    phone: str = "+91 80 4912 3456"
    operating_hours: str = "24x7 Emergency & Critical Care"
    doctor_count: int = 12
    bed_count: int = 24


@router.get("/clinics")
def list_clinics(db: Session = Depends(get_db)):
    clinics = db.query(ClinicHospital).order_by(ClinicHospital.name.asc()).all()
    return [to_dict(c) for c in clinics]


@router.post("/clinics")
def create_clinic(payload: CreateClinic, db: Session = Depends(get_db)):
    clinic = ClinicHospital(
        name=payload.name,
        facility_type=payload.type or "Clinic",
        phone=payload.phone,
        emergency_available=1,
        open_24x7=1,
        verification_status="verified",
        rating=4.8
    )
    db.add(clinic)
    db.commit()
    db.refresh(clinic)
    return {"success": True, "clinic": to_dict(clinic)}


@router.delete("/clinics/{clinic_id}")
def delete_clinic(clinic_id: int, db: Session = Depends(get_db)):
    clinic = db.query(ClinicHospital).filter(ClinicHospital.id == clinic_id).first()
    if not clinic:
        raise HTTPException(status_code=404, detail="Clinic not found")
    db.delete(clinic)
    db.commit()
    return {"success": True, "message": "Clinic removed"}


# =============================================================================
# 8. CUSTOMERS 360
# =============================================================================
class CreateCustomer(BaseModel):
    name: str
    email: str
    phone: str
    city: str
    pet_names: str
    tier: str = "Silver"


@router.get("/customers")
def list_customers(db: Session = Depends(get_db)):
    customers = db.query(PetParent).order_by(PetParent.id.desc()).all()
    pets_map = {p.id: p for p in db.query(Pet).all()}
    res = []
    for c in customers:
        cust_pets = [p.name for p in pets_map.values() if p.parent_id == c.id]
        cd = to_dict(c)
        cd["pet_names"] = ", ".join(cust_pets) if cust_pets else "Jimmy (Dog)"
        res.append(cd)
    return res


@router.post("/customers")
def create_customer(payload: CreateCustomer, db: Session = Depends(get_db)):
    cust = PetParent(
        full_name=payload.name,
        email=payload.email,
        phone=payload.phone,
        city=payload.city,
        created_at=datetime.utcnow()
    )
    db.add(cust)
    db.commit()
    db.refresh(cust)
    return {"success": True, "customer": to_dict(cust)}


# =============================================================================
# 9. PETS 360
# =============================================================================
class CreatePet(BaseModel):
    name: str
    species: str = "Dog"
    breed: str
    age_years: float
    gender: str = "Male"
    weight_kg: float
    parent_name: str
    parent_phone: str
    microchip_id: Optional[str] = None


@router.get("/pets")
def list_pets(db: Session = Depends(get_db)):
    pets = db.query(Pet).order_by(Pet.id.desc()).all()
    parents_map = {p.id: p for p in db.query(PetParent).all()}
    res = []
    for p in pets:
        parent = parents_map.get(p.parent_id)
        pd = to_dict(p)
        pd["parent_name"] = parent.full_name if parent else "Pet Parent"
        pd["parent_phone"] = parent.phone if parent and parent.phone else "+91 9597295344"
        res.append(pd)
    return res


@router.post("/pets")
def create_pet(payload: CreatePet, db: Session = Depends(get_db)):
    parent = db.query(PetParent).filter(PetParent.full_name.ilike(f"%{payload.parent_name}%")).first()
    parent_id = parent.id if parent else 1
    pet = Pet(
        parent_id=parent_id,
        name=payload.name,
        species=payload.species,
        breed=payload.breed,
        gender=payload.gender,
        weight_kg=payload.weight_kg,
        is_active=1
    )
    db.add(pet)
    db.commit()
    db.refresh(pet)
    return {"success": True, "pet": to_dict(pet)}


# =============================================================================
# 10. EMPLOYEES & HR
# =============================================================================
class CreateEmployee(BaseModel):
    name: str
    email: str
    phone: str
    department: str
    designation: str
    salary: float


@router.get("/employees")
def list_employees(db: Session = Depends(get_db)):
    emps = db.query(Employee).order_by(Employee.department.asc()).all()
    return [to_dict(e) for e in emps]


@router.post("/employees")
def create_employee(payload: CreateEmployee, db: Session = Depends(get_db)):
    code = f"EMP-{random.randint(1000, 9999)}"
    emp = Employee(
        employee_code=code,
        name=payload.name,
        email=payload.email,
        phone=payload.phone,
        department=payload.department,
        designation=payload.designation,
        salary=payload.salary,
        joining_date=date.today(),
        status="Active"
    )
    db.add(emp)
    db.commit()
    db.refresh(emp)
    return {"success": True, "employee": to_dict(emp)}


# =============================================================================
# 11. MARKETING CAMPAIGNS
# =============================================================================
class CreateCampaign(BaseModel):
    name: str
    channel: str
    budget: float
    start_date: str


@router.get("/marketing/campaigns")
def list_campaigns(db: Session = Depends(get_db)):
    camps = db.query(MarketingCampaign).order_by(MarketingCampaign.id.desc()).all()
    return [to_dict(c) for c in camps]


@router.post("/marketing/campaigns")
def create_campaign(payload: CreateCampaign, db: Session = Depends(get_db)):
    code = f"CMP-2026-{random.randint(10, 99)}"
    camp = MarketingCampaign(
        campaign_code=code,
        name=payload.name,
        channel=payload.channel,
        budget=payload.budget,
        spent=0.0,
        revenue_generated=0.0,
        leads_count=0,
        roas=0.0,
        status="Active",
        start_date=datetime.strptime(payload.start_date, "%Y-%m-%d").date()
    )
    db.add(camp)
    db.commit()
    db.refresh(camp)
    return {"success": True, "campaign": to_dict(camp)}


# =============================================================================
# 12. VENDORS & PROCUREMENT
# =============================================================================
class CreateVendor(BaseModel):
    name: str
    category: str = "Pharmaceuticals & Vaccines"
    contact_person: str = "Key Account Manager"
    phone: str = "+91 80 4112 8899"
    email: str = "orders@vendor.com"
    city: str = "Bengaluru"


@router.get("/vendors")
def list_vendors(db: Session = Depends(get_db)):
    vendors = db.query(Vendor).order_by(Vendor.id.asc()).all()
    return [to_dict(v) for v in vendors]


@router.post("/vendors")
def create_vendor(payload: CreateVendor, db: Session = Depends(get_db)):
    code = f"VND-{random.randint(100, 999)}"
    vendor = Vendor(
        vendor_code=code,
        name=payload.name,
        category=payload.category,
        contact_person=payload.contact_person,
        phone=payload.phone,
        email=payload.email,
        city=payload.city,
        rating=4.90,
        payment_terms="Net 30",
        status="Active"
    )
    db.add(vendor)
    db.commit()
    db.refresh(vendor)
    return {"success": True, "vendor": to_dict(vendor)}


# =============================================================================
# 13. LOGISTICS & DELIVERIES
# =============================================================================
class CreateDelivery(BaseModel):
    order_ref: str
    rider_name: str
    rider_phone: str
    pickup_location: str
    drop_location: str
    delivery_type: str = "Express 60-Min"
    eta_mins: int = 25


@router.get("/logistics/deliveries")
def list_deliveries(db: Session = Depends(get_db)):
    deliveries = db.query(LogisticsDelivery).order_by(LogisticsDelivery.id.desc()).all()
    return [to_dict(d) for d in deliveries]


@router.post("/logistics/deliveries")
def create_delivery(payload: CreateDelivery, db: Session = Depends(get_db)):
    del_id = f"DEL-60-{random.randint(100, 999)}"
    delivery = LogisticsDelivery(
        delivery_id=del_id,
        order_ref=payload.order_ref,
        partner_name="Zenve Rapid 60",
        rider_name=payload.rider_name,
        rider_phone=payload.rider_phone,
        pickup_location=payload.pickup_location,
        drop_location=payload.drop_location,
        status="In Transit",
        eta_mins=payload.eta_mins,
        delivery_type=payload.delivery_type
    )
    db.add(delivery)
    db.commit()
    db.refresh(delivery)
    return {"success": True, "delivery": to_dict(delivery)}


# =============================================================================
# 14. FASHION & LIFESTYLE
# =============================================================================
class CreateFashionProduct(BaseModel):
    name: str
    category: str = "Apparel"
    size: str = "M"
    color: str = "Teal / Navy"
    price: float = 1299.0
    stock: int = 40
    brand: str = "Zenve Pawshion"


@router.get("/fashion/products")
def list_fashion_products(db: Session = Depends(get_db)):
    prods = db.query(FashionProduct).order_by(FashionProduct.id.asc()).all()
    return [to_dict(p) for p in prods]


@router.post("/fashion/products")
def create_fashion_product(payload: CreateFashionProduct, db: Session = Depends(get_db)):
    sku = f"FSH-{payload.name[:3].upper()}-{random.randint(10, 99)}"
    prod = FashionProduct(
        sku=sku,
        name=payload.name,
        category=payload.category,
        size=payload.size,
        color=payload.color,
        price=payload.price,
        stock=payload.stock,
        brand=payload.brand,
        status="Active" if payload.stock > 0 else "Out of Stock"
    )
    db.add(prod)
    db.commit()
    db.refresh(prod)
    return {"success": True, "product": to_dict(prod)}


# =============================================================================
# 15. B2B / ENTERPRISE
# =============================================================================
class CreateB2BAccount(BaseModel):
    company_name: str
    business_type: str = "Veterinary Hospital Network"
    contact_name: str = "Procurement Director"
    contact_phone: str = "+91 80 4455 6677"
    annual_deal_value: float = 2400000.0
    credit_limit: float = 500000.0


@router.get("/b2b/accounts")
def list_b2b_accounts(db: Session = Depends(get_db)):
    accounts = db.query(B2BAccount).order_by(B2BAccount.annual_deal_value.desc()).all()
    return [to_dict(a) for a in accounts]


@router.post("/b2b/accounts")
def create_b2b_account(payload: CreateB2BAccount, db: Session = Depends(get_db)):
    code = f"B2B-{random.randint(100, 999)}"
    acc = B2BAccount(
        account_code=code,
        company_name=payload.company_name,
        business_type=payload.business_type,
        contact_name=payload.contact_name,
        contact_phone=payload.contact_phone,
        annual_deal_value=payload.annual_deal_value,
        credit_limit=payload.credit_limit,
        status="Active"
    )
    db.add(acc)
    db.commit()
    db.refresh(acc)
    return {"success": True, "account": to_dict(acc)}


# =============================================================================
# 16. IMPORT & EXPORT SHIPMENTS
# =============================================================================
class CreateShipment(BaseModel):
    direction: str = "Import"
    origin_country: str = "Germany"
    destination_city: str = "Bengaluru Hub"
    carrier: str = "Lufthansa Cargo"
    container_id: str = "CONTAINER-ZV-99"
    cargo_value: float = 3500000.0


@router.get("/import-export/shipments")
def list_shipments(db: Session = Depends(get_db)):
    shipments = db.query(ImportExportShipment).order_by(ImportExportShipment.id.desc()).all()
    return [to_dict(s) for s in shipments]


@router.post("/import-export/shipments")
def create_shipment(payload: CreateShipment, db: Session = Depends(get_db)):
    code = f"SHP-{random.randint(1000, 9999)}"
    shp = ImportExportShipment(
        shipment_code=code,
        direction=payload.direction,
        origin_country=payload.origin_country,
        destination_city=payload.destination_city,
        carrier=payload.carrier,
        container_id=payload.container_id,
        customs_status="Cleared",
        eta_date=date.today(),
        cargo_value=payload.cargo_value,
        status="In Transit"
    )
    db.add(shp)
    db.commit()
    db.refresh(shp)
    return {"success": True, "shipment": to_dict(shp)}


# =============================================================================
# 17. REPORTS & EXPORTS
# =============================================================================
class GenerateReport(BaseModel):
    title: str
    category: str
    format: str = "CSV"


@router.get("/reports")
def list_reports(db: Session = Depends(get_db)):
    reports = db.query(Report).order_by(Report.id.desc()).all()
    return [to_dict(r) for r in reports]


@router.post("/reports/generate")
def generate_report(payload: GenerateReport, db: Session = Depends(get_db)):
    code = f"RPT-2026-{random.randint(100, 999)}"
    rep = Report(
        report_code=code,
        title=payload.title,
        category=payload.category,
        format=payload.format,
        generated_by="Executive Console Request",
        file_size="1.8 MB",
        download_url="#"
    )
    db.add(rep)
    db.commit()
    db.refresh(rep)
    return {"success": True, "report": to_dict(rep)}


# =============================================================================
# 18. ALERTS & NOTIFICATIONS
# =============================================================================
class CreateAlert(BaseModel):
    title: str
    message: str
    category: str
    severity: str = "Medium"


@router.get("/alerts")
def list_alerts(db: Session = Depends(get_db)):
    alerts = db.query(Alert).order_by(Alert.id.desc()).all()
    return [to_dict(a) for a in alerts]


@router.post("/alerts")
def create_alert(payload: CreateAlert, db: Session = Depends(get_db)):
    code = f"ALT-{random.randint(100, 999)}"
    alert = Alert(
        alert_code=code,
        title=payload.title,
        message=payload.message,
        category=payload.category,
        severity=payload.severity,
        status="Unread"
    )
    db.add(alert)
    db.commit()
    db.refresh(alert)
    return {"success": True, "alert": to_dict(alert)}


@router.post("/alerts/{alert_id}/acknowledge")
def acknowledge_alert(alert_id: int, db: Session = Depends(get_db)):
    alert = db.query(Alert).filter(Alert.id == alert_id).first()
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")
    alert.status = "Acknowledged"
    db.commit()
    return {"success": True, "alert": to_dict(alert)}


@router.post("/alerts/{alert_id}/resolve")
def resolve_alert(alert_id: int, db: Session = Depends(get_db)):
    alert = db.query(Alert).filter(Alert.id == alert_id).first()
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")
    alert.status = "Resolved"
    db.commit()
    return {"success": True, "alert": to_dict(alert)}


# =============================================================================
# 19. SYSTEM HEALTH
# =============================================================================
@router.get("/system-health")
def get_system_health(db: Session = Depends(get_db)):
    services = db.query(SystemHealth).order_by(SystemHealth.id.asc()).all()
    return [to_dict(s) for s in services]


@router.post("/system-health/ping")
def ping_system_service(service_name: str = Query(...), db: Session = Depends(get_db)):
    import time as _time
    t0 = _time.monotonic()
    srv = db.query(SystemHealth).filter(SystemHealth.service_name.ilike(f"%{service_name}%")).first()
    elapsed_ms = round((_time.monotonic() - t0) * 1000)
    if srv:
        srv.last_checked = datetime.utcnow()
        srv.latency_ms = elapsed_ms
        db.commit()
        return {"success": True, "service": to_dict(srv), "ping_ms": srv.latency_ms}
    return {"success": True, "ping_ms": elapsed_ms, "status": "Healthy"}


@router.get("/system-health/db-stats")
def get_system_health_db_stats(db: Session = Depends(get_db)):
    from sqlalchemy import text
    try:
        rows = db.execute(text(
            "SELECT TABLE_NAME, TABLE_ROWS, DATA_LENGTH, INDEX_LENGTH, UPDATE_TIME "
            "FROM information_schema.TABLES "
            "WHERE TABLE_SCHEMA = 'zenve_engine' "
            "ORDER BY TABLE_NAME"
        )).fetchall()
        tables = []
        for r in rows:
            name, count, d_len, idx_len, upd = r[0], r[1] or 0, r[2] or 0, r[3] or 0, r[4]
            tables.append({
                "name": name,
                "rows": count,
                "size": f"{round((d_len + idx_len) / 1024, 1)} KB",
                "indexCount": 2,
                "lastUpdated": str(upd) if upd else "Active",
                "status": "Optimal"
            })
        return {
            "database": "zenve_engine",
            "engine": "MySQL 8.0 (InnoDB)",
            "tables": tables,
            "total_tables": len(tables),
            "status": "Optimal"
        }
    except Exception as e:
        return {"database": "zenve_engine", "error": str(e), "tables": []}


# =============================================================================
# 20. SETTINGS
# =============================================================================
class UpdateSetting(BaseModel):
    setting_key: str
    setting_value: str


@router.get("/settings")
def list_settings(db: Session = Depends(get_db)):
    settings = db.query(CompanySetting).order_by(CompanySetting.id.asc()).all()
    return [to_dict(s) for s in settings]


@router.post("/settings")
def update_setting(payload: UpdateSetting, db: Session = Depends(get_db)):
    setting = db.query(CompanySetting).filter(CompanySetting.setting_key == payload.setting_key).first()
    if setting:
        setting.setting_value = payload.setting_value
    else:
        setting = CompanySetting(
            setting_key=payload.setting_key,
            setting_value=payload.setting_value,
            category="Custom"
        )
        db.add(setting)
    db.commit()
    return {"success": True, "setting": to_dict(setting)}


# =============================================================================
# 21. ORDERS & OPERATIONS
# =============================================================================
class CreateOrder(BaseModel):
    customer_name: str
    customer_phone: str = "+91 98450 12345"
    items_count: int = 1
    total_amount: float
    status: str = "Processing"
    payment_method: str = "UPI"
    channel: str = "Android App"
    delivery_slot: str = "60-Min Express"
    city: str = "Bengaluru"


class UpdateOrderStatus(BaseModel):
    status: str


@router.get("/orders")
def list_orders(
    status: Optional[str] = None,
    city: Optional[str] = None,
    db: Session = Depends(get_db),
):
    query = db.query(Order)
    if status and status.lower() != "all":
        query = query.filter(Order.status == status)
    if city and city.lower() != "all":
        query = query.filter(Order.city == city)
    orders = query.order_by(Order.id.desc()).all()
    return [to_dict(o) for o in orders]


@router.post("/orders")
def create_order(payload: CreateOrder, db: Session = Depends(get_db)):
    order_id = f"ORD-{datetime.utcnow().year}-{random.randint(1000, 9999)}"
    order = Order(
        order_id=order_id,
        customer_name=payload.customer_name,
        customer_phone=payload.customer_phone,
        items_count=payload.items_count,
        total_amount=payload.total_amount,
        status=payload.status,
        payment_method=payload.payment_method,
        channel=payload.channel,
        delivery_slot=payload.delivery_slot,
        city=payload.city,
    )
    db.add(order)
    db.commit()
    db.refresh(order)
    return {"success": True, "order": to_dict(order)}


@router.post("/orders/{order_id}/status")
def update_order_status(order_id: str, payload: UpdateOrderStatus, db: Session = Depends(get_db)):
    order = db.query(Order).filter((Order.order_id == order_id) | (Order.id == int(order_id) if order_id.isdigit() else False)).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    order.status = payload.status
    db.commit()
    return {"success": True, "order": to_dict(order)}


@router.post("/orders/{order_id}/refund")
def refund_order(order_id: str, db: Session = Depends(get_db)):
    order = db.query(Order).filter((Order.order_id == order_id) | (Order.id == int(order_id) if order_id.isdigit() else False)).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    order.status = "Refunded"
    db.commit()
    return {"success": True, "order": to_dict(order)}


@router.post("/orders/dispatch")
def dispatch_orders(db: Session = Depends(get_db)):
    pending = db.query(Order).filter(Order.status.in_(["Processing", "Packed"])).all()
    for o in pending:
        o.status = "Dispatched"
    db.commit()
    return {"success": True, "dispatched_count": len(pending)}

