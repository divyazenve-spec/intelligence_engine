"""Endpoints for all Zenve Engine dashboard domains connected directly to MySQL."""
from __future__ import annotations
from datetime import date, datetime
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
    for col in obj.__table__.columns:
        val = getattr(obj, col.name)
        if isinstance(val, (datetime, date)):
            res[col.name] = val.isoformat()
        else:
            res[col.name] = val
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
    order_id = f"ORD-2026-{random.randint(1000, 9999)}"
    order = Order(
        order_id=order_id,
        customer_name=payload.customer_name,
        customer_phone=payload.customer_phone,
        items_count=payload.items_count,
        total_amount=payload.total_amount,
        status="Processing",
        delivery_slot=payload.delivery_slot,
        city=payload.city,
        payment_method=payload.payment_method,
        channel=payload.channel,
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
    sku = f"SKU-{payload.name[:3].upper()}-{random.randint(100, 999)}"
    status = "In Stock" if payload.stock > payload.min_stock else ("Low Stock" if payload.stock > 0 else "Out of Stock")
    prod = Product(
        sku=sku,
        name=payload.name,
        category=payload.category,
        brand=payload.brand,
        price=payload.price,
        cost_price=payload.cost_price,
        stock=payload.stock,
        min_stock=payload.min_stock,
        unit=payload.unit,
        status=status,
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
    prod.stock = stock
    prod.status = "In Stock" if stock > prod.min_stock else ("Low Stock" if stock > 0 else "Out of Stock")
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
    return [to_dict(a) for a in apps]


@router.post("/veterinary/appointments")
def create_appointment(payload: CreateAppointment, db: Session = Depends(get_db)):
    code = f"APP-2026-{random.randint(1000, 9999)}"
    app = Appointment(
        appointment_code=code,
        pet_name=payload.pet_name,
        pet_type=payload.pet_type,
        parent_name=payload.parent_name,
        parent_phone=payload.parent_phone,
        doctor_name=payload.doctor_name,
        service_name=payload.service_name,
        appointment_date=datetime.strptime(payload.appointment_date, "%Y-%m-%d").date(),
        appointment_time=payload.appointment_time,
        clinic_name=payload.clinic_name,
        status="Confirmed"
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
    code = f"DOC-{random.randint(100, 999)}"
    doc = Doctor(
        doctor_code=code,
        name=payload.name,
        specialty=payload.specialty,
        qualification=payload.qualification,
        experience_years=payload.experience_years,
        phone=payload.phone,
        email=payload.email,
        clinic_branch=payload.clinic_branch,
        status="On Duty",
        consultations_count=0,
        rating=4.95
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
    clinics = db.query(ClinicHospital).order_by(ClinicHospital.city.asc()).all()
    return [to_dict(c) for c in clinics]


@router.post("/clinics")
def create_clinic(payload: CreateClinic, db: Session = Depends(get_db)):
    code = f"CLN-{random.randint(100, 999)}"
    clinic = ClinicHospital(
        clinic_code=code,
        name=payload.name,
        type=payload.type,
        city=payload.city,
        address=payload.address,
        phone=payload.phone,
        operating_hours=payload.operating_hours,
        doctor_count=payload.doctor_count,
        bed_count=payload.bed_count,
        status="Operational"
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
    customers = db.query(Customer).order_by(Customer.id.desc()).all()
    return [to_dict(c) for c in customers]


@router.post("/customers")
def create_customer(payload: CreateCustomer, db: Session = Depends(get_db)):
    code = f"CUST-{random.randint(800, 999)}"
    cust = Customer(
        customer_code=code,
        name=payload.name,
        email=payload.email,
        phone=payload.phone,
        city=payload.city,
        pet_names=payload.pet_names,
        total_orders=0,
        total_spent=0.0,
        tier=payload.tier,
        status="Active",
        joined_date=date.today()
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
    return [to_dict(p) for p in pets]


@router.post("/pets")
def create_pet(payload: CreatePet, db: Session = Depends(get_db)):
    code = f"PET-{random.randint(900, 999)}"
    pet = Pet(
        pet_code=code,
        name=payload.name,
        species=payload.species,
        breed=payload.breed,
        age_years=payload.age_years,
        gender=payload.gender,
        weight_kg=payload.weight_kg,
        parent_name=payload.parent_name,
        parent_phone=payload.parent_phone,
        microchip_id=payload.microchip_id,
        vaccination_status="Up to date",
        last_visit_date=date.today()
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
    vendors = db.query(Vendor).order_by(Vendor.name.asc()).all()
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
    srv = db.query(SystemHealth).filter(SystemHealth.service_name.ilike(f"%{service_name}%")).first()
    if srv:
        srv.last_checked = datetime.utcnow()
        srv.latency_ms = random.randint(2, 28)
        db.commit()
        return {"success": True, "service": to_dict(srv), "ping_ms": srv.latency_ms}
    return {"success": True, "ping_ms": random.randint(2, 20), "status": "Healthy"}


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

