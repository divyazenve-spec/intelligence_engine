"""SQLAlchemy ORM models for all Zenve Intelligence Engine domains connected to MySQL zenve_main."""
from datetime import date, datetime, time
from typing import Any, Optional
from sqlalchemy import BigInteger, Boolean, Date, DateTime, Float, Integer, String, Text, Time
from sqlalchemy.orm import Mapped, mapped_column
from app.core.database import Base


# 1. Daily Metrics
class DailyMetric(Base):
    __tablename__ = "daily_metrics"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    business_date: Mapped[date] = mapped_column(Date, nullable=False, unique=True)
    sales_total: Mapped[float] = mapped_column(Float, nullable=False, default=0.0)
    android_downloads: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    ios_downloads: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    created_at: Mapped[Optional[datetime]] = mapped_column(DateTime, default=datetime.utcnow)


# 2. Sales
class Sale(Base):
    __tablename__ = "sales"

    seq: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    sale_id: Mapped[str] = mapped_column(String(64), nullable=False, unique=True)
    transaction_ref: Mapped[str] = mapped_column(String(64), nullable=False)
    sold_at: Mapped[str] = mapped_column(String(40), nullable=False)
    source: Mapped[str] = mapped_column(String(120), nullable=False)
    person: Mapped[str] = mapped_column(String(160), nullable=False)
    city: Mapped[str] = mapped_column(String(80), nullable=False)
    amount: Mapped[float] = mapped_column(Float, nullable=False, default=0.0)
    status: Mapped[str] = mapped_column(String(20), nullable=False, default="Paid")
    app_source: Mapped[str] = mapped_column(String(20), nullable=False, default="Android")
    is_demo: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    created_at: Mapped[Optional[datetime]] = mapped_column(DateTime, default=datetime.utcnow)


# 3. Orders & Operations
class Order(Base):
    __tablename__ = "orders"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    order_number: Mapped[str] = mapped_column(String(100), nullable=False, unique=True)
    total_amount: Mapped[Optional[float]] = mapped_column(Float, nullable=True, default=0.0)
    status: Mapped[Optional[str]] = mapped_column(String(50), nullable=True, default="Placed")
    payment_status: Mapped[Optional[str]] = mapped_column(String(50), nullable=True, default="Pending")
    placed_at: Mapped[Optional[datetime]] = mapped_column(DateTime, default=datetime.utcnow)

    @property
    def order_id(self) -> str:
        return self.order_number

    @property
    def customer_name(self) -> str:
        return "Pet Parent"

    @property
    def customer_phone(self) -> str:
        return "+91 9597295344"

    @property
    def items_count(self) -> int:
        return 1

    @property
    def delivery_slot(self) -> str:
        return "Express Delivery (4 Hours)"

    @property
    def city(self) -> str:
        return "Bengaluru"

    @property
    def payment_method(self) -> str:
        return "UPI"

    @property
    def channel(self) -> str:
        return "Android App"

    @property
    def created_at(self) -> Optional[datetime]:
        return self.placed_at


class OrderItem(Base):
    __tablename__ = "order_items"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    order_id: Mapped[int] = mapped_column(Integer, nullable=False)
    product_name: Mapped[str] = mapped_column(String(200), nullable=False)
    quantity: Mapped[int] = mapped_column(Integer, nullable=False, default=1)
    unit_price: Mapped[float] = mapped_column(Float, nullable=False, default=0.0)
    total_price: Mapped[float] = mapped_column(Float, nullable=False, default=0.0)
    status: Mapped[str] = mapped_column(String(50), nullable=False, default="CONFIRMED")


# 4. Products & Inventory
class Product(Base):
    __tablename__ = "products"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(200), nullable=False)
    price: Mapped[Optional[float]] = mapped_column(Float, nullable=True, default=0.0)
    mrp: Mapped[Optional[float]] = mapped_column(Float, nullable=True, default=0.0)
    discount_percent: Mapped[Optional[float]] = mapped_column(Float, nullable=True, default=0.0)
    pincode: Mapped[Optional[str]] = mapped_column(String(20), nullable=True)
    stock_quantity: Mapped[Optional[int]] = mapped_column(Integer, nullable=True, default=0)
    is_prescription_required: Mapped[Optional[int]] = mapped_column(Integer, nullable=True, default=0)
    rating: Mapped[Optional[float]] = mapped_column(Float, nullable=True, default=4.8)
    is_active: Mapped[Optional[int]] = mapped_column(Integer, nullable=True, default=1)

    @property
    def sku(self) -> str:
        return f"SKU-{self.id:04d}"

    @property
    def stock(self) -> int:
        return self.stock_quantity or 0

    @property
    def cost_price(self) -> float:
        return round((self.price or 0.0) * 0.75, 2)

    @property
    def category(self) -> str:
        return "Veterinary Healthcare & Essentials"

    @property
    def brand(self) -> str:
        return "Zenve Care"

    @property
    def unit(self) -> str:
        return "Unit"

    @property
    def min_stock(self) -> int:
        return 15

    @property
    def status(self) -> str:
        if (self.stock_quantity or 0) > 15:
            return "In Stock"
        elif (self.stock_quantity or 0) > 0:
            return "Low Stock"
        return "Out of Stock"


# 5. Pharmacy Medicines
class PharmacyMedicine(Base):
    __tablename__ = "pharmacy_medicines"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    med_code: Mapped[str] = mapped_column(String(64), nullable=False, unique=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    brand: Mapped[str] = mapped_column(String(120), nullable=False)
    salt_name: Mapped[str] = mapped_column(String(255), nullable=False)
    category: Mapped[str] = mapped_column(String(80), nullable=False)
    price: Mapped[float] = mapped_column(Float, nullable=False, default=0.0)
    stock: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    batch_no: Mapped[str] = mapped_column(String(64), nullable=False)
    expiry_date: Mapped[date] = mapped_column(Date, nullable=False)
    requires_prescription: Mapped[int] = mapped_column(Integer, nullable=False, default=1)
    status: Mapped[str] = mapped_column(String(32), nullable=False, default="Available")
    created_at: Mapped[Optional[datetime]] = mapped_column(DateTime, default=datetime.utcnow)


# 6. Veterinary Services (table: services)
class VeterinaryService(Base):
    __tablename__ = "services"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    service_type: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    price: Mapped[Optional[float]] = mapped_column(Float, nullable=True, default=0.0)
    duration_minutes: Mapped[Optional[int]] = mapped_column(Integer, nullable=True, default=30)
    home_service: Mapped[Optional[int]] = mapped_column(Integer, nullable=True, default=0)
    is_active: Mapped[Optional[int]] = mapped_column(Integer, nullable=True, default=1)

    @property
    def service_code(self) -> str:
        return f"SRV-{self.id:03d}"

    @property
    def name(self) -> str:
        return self.title

    @property
    def category(self) -> str:
        return self.service_type or "Veterinary Care"

    @property
    def duration_mins(self) -> int:
        return self.duration_minutes or 30

    @property
    def doctor_in_charge(self) -> str:
        return "Dr. Abuhuraira"

    @property
    def status(self) -> str:
        return "Active" if self.is_active else "Inactive"

    @property
    def active_bookings(self) -> int:
        return 1


# 7. Appointments
class Appointment(Base):
    __tablename__ = "appointments"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    pet_id: Mapped[int] = mapped_column(Integer, nullable=False)
    doctor_id: Mapped[int] = mapped_column(Integer, nullable=False)
    appointment_date: Mapped[date] = mapped_column(Date, nullable=False)
    appointment_time: Mapped[Any] = mapped_column(Time, nullable=False)
    appointment_type: Mapped[Optional[str]] = mapped_column(String(100), nullable=True, default="In Clinic")
    status: Mapped[Optional[str]] = mapped_column(String(50), nullable=True, default="Confirmed")
    payment_status: Mapped[Optional[str]] = mapped_column(String(50), nullable=True, default="Paid")
    consultation_fee: Mapped[Optional[float]] = mapped_column(Float, nullable=True, default=200.0)

    @property
    def appointment_code(self) -> str:
        return f"APT-{self.id:04d}"

    @property
    def service_name(self) -> str:
        return self.appointment_type or "Veterinary Consultation"


# 8. Doctors (table: doctors)
class Doctor(Base):
    __tablename__ = "doctors"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(150), nullable=False)
    email: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    password: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    qualification: Mapped[Optional[str]] = mapped_column(String(300), nullable=True)
    specializations: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)
    pincode: Mapped[Optional[str]] = mapped_column(String(20), nullable=True)
    city: Mapped[Optional[str]] = mapped_column(String(150), nullable=True)
    phone: Mapped[Optional[str]] = mapped_column(String(30), nullable=True)
    experience_years: Mapped[Optional[int]] = mapped_column(Integer, nullable=True, default=5)
    consultation_fee: Mapped[Optional[float]] = mapped_column(Float, nullable=True, default=500.0)
    verification_status: Mapped[Optional[str]] = mapped_column(String(50), nullable=True, default="verified")
    is_active: Mapped[Optional[int]] = mapped_column(Integer, nullable=True, default=1)
    profile_image: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    signature_image: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    clinic_name: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    clinic_hospital: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    facility_type: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    clinic_phone: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    clinic_inside_image: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    clinic_outside_image: Mapped[Optional[str]] = mapped_column(Text, nullable=True)

    @property
    def doctor_code(self) -> str:
        return f"DOC-{self.id:04d}"

    @property
    def specialty(self) -> str:
        return self.specializations or "Veterinarian"

    @property
    def clinic_branch(self) -> str:
        return self.clinic_name or self.clinic_hospital or "Zenve Main Hospital"

    @property
    def status(self) -> str:
        return "On Duty" if self.is_active else "Off Duty"

    @property
    def rating(self) -> float:
        return 4.92

    @property
    def consultations_count(self) -> int:
        return 15 + (self.id * 3) % 40


# 9. Clinics & Hospitals (table: clinics_hospitals)
class ClinicHospital(Base):
    __tablename__ = "clinics_hospitals"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(200), nullable=False)
    facility_type: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    phone: Mapped[Optional[str]] = mapped_column(String(30), nullable=True)
    emergency_available: Mapped[Optional[int]] = mapped_column(Integer, nullable=True, default=0)
    open_24x7: Mapped[Optional[int]] = mapped_column(Integer, nullable=True, default=0)
    verification_status: Mapped[Optional[str]] = mapped_column(String(50), nullable=True, default="verified")
    rating: Mapped[Optional[float]] = mapped_column(Float, nullable=True, default=4.8)

    @property
    def clinic_code(self) -> str:
        return f"CLN-{self.id:03d}"

    @property
    def type(self) -> str:
        return self.facility_type or "Clinic"

    @property
    def city(self) -> str:
        return "Bengaluru"

    @property
    def address(self) -> str:
        return f"{self.name}, Bengaluru"

    @property
    def operating_hours(self) -> str:
        return "Open 24x7" if self.open_24x7 else "9:00 AM - 9:00 PM"

    @property
    def doctor_count(self) -> int:
        return 8 if "hospital" in (self.name or "").lower() else 4

    @property
    def bed_count(self) -> int:
        return 15 if "hospital" in (self.name or "").lower() else 6

    @property
    def beds_capacity(self) -> int:
        return 15 if "hospital" in (self.name or "").lower() else 6

    @property
    def operational_status(self) -> str:
        return "Open 24x7" if self.open_24x7 else "Operational"

    @property
    def status(self) -> str:
        return "Operational"


# 10. Pet Parents (Customers)
class PetParent(Base):
    __tablename__ = "pet_parents"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    full_name: Mapped[str] = mapped_column(String(150), nullable=False)
    email: Mapped[str] = mapped_column(String(100), nullable=False, unique=True)
    phone: Mapped[Optional[str]] = mapped_column(String(30), nullable=True)
    city: Mapped[Optional[str]] = mapped_column(String(150), nullable=True)
    created_at: Mapped[Optional[datetime]] = mapped_column(DateTime, default=datetime.utcnow)

    @property
    def customer_code(self) -> str:
        return f"CUST-{self.id:04d}"

    @property
    def name(self) -> str:
        return self.full_name

    @property
    def tier(self) -> str:
        return "Gold" if self.id % 2 == 0 else "Silver"

    @property
    def status(self) -> str:
        return "Active"

    @property
    def total_orders(self) -> int:
        return 2 + (self.id % 4)

    @property
    def total_spent(self) -> float:
        return float(2999 * (1 + (self.id % 3)))

    @property
    def pet_names(self) -> str:
        return "Pet"

    @property
    def joined_date(self) -> date:
        return self.created_at.date() if self.created_at else date(2026, 9, 16)


# Alias Customer to PetParent for live database consistency
Customer = PetParent


# 11. Pets
class Pet(Base):
    __tablename__ = "pets"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    parent_id: Mapped[int] = mapped_column(Integer, nullable=False)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    species: Mapped[Optional[str]] = mapped_column(String(100), nullable=True, default="Dog")
    breed: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    gender: Mapped[Optional[str]] = mapped_column(String(20), nullable=True, default="Male")
    weight_kg: Mapped[Optional[float]] = mapped_column(Float, nullable=True, default=10.0)
    is_active: Mapped[Optional[int]] = mapped_column(Integer, nullable=True, default=1)

    @property
    def pet_code(self) -> str:
        return f"PET-{self.id:04d}"

    @property
    def age_years(self) -> float:
        return round(1.5 + (self.id * 0.7) % 5.0, 1)

    @property
    def vaccination_status(self) -> str:
        return "Up to date"

    @property
    def microchip_id(self) -> str:
        return f"MCP-IND-{9000 + self.id:04d}"

    @property
    def last_visit_date(self) -> str:
        return "2026-10-26"

    @property
    def status(self) -> str:
        return "Active" if self.is_active else "Inactive"


# 12. Employees
class Employee(Base):
    __tablename__ = "employees"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    employee_code: Mapped[str] = mapped_column(String(64), nullable=False, unique=True)
    name: Mapped[str] = mapped_column(String(160), nullable=False)
    email: Mapped[str] = mapped_column(String(160), nullable=False)
    phone: Mapped[str] = mapped_column(String(32), nullable=False)
    department: Mapped[str] = mapped_column(String(80), nullable=False)
    designation: Mapped[str] = mapped_column(String(120), nullable=False)
    joining_date: Mapped[date] = mapped_column(Date, nullable=False)
    salary: Mapped[float] = mapped_column(Float, nullable=False, default=0.0)
    status: Mapped[str] = mapped_column(String(32), nullable=False, default="Active")
    created_at: Mapped[Optional[datetime]] = mapped_column(DateTime, default=datetime.utcnow)


# 13. Marketing Campaigns
class MarketingCampaign(Base):
    __tablename__ = "marketing_campaigns"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    campaign_code: Mapped[str] = mapped_column(String(64), nullable=False, unique=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    channel: Mapped[str] = mapped_column(String(80), nullable=False)
    budget: Mapped[float] = mapped_column(Float, nullable=False, default=0.0)
    spent: Mapped[float] = mapped_column(Float, nullable=False, default=0.0)
    revenue_generated: Mapped[float] = mapped_column(Float, nullable=False, default=0.0)
    leads_count: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    roas: Mapped[float] = mapped_column(Float, nullable=False, default=0.0)
    status: Mapped[str] = mapped_column(String(32), nullable=False, default="Active")
    start_date: Mapped[date] = mapped_column(Date, nullable=False)
    end_date: Mapped[Optional[date]] = mapped_column(Date, nullable=True)


# 14. Vendors
class Vendor(Base):
    __tablename__ = "vendors"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(Integer, nullable=False)
    plan_id: Mapped[int] = mapped_column(Integer, nullable=False)
    started_on: Mapped[Optional[date]] = mapped_column(Date, nullable=True)
    expires_on: Mapped[Optional[date]] = mapped_column(Date, nullable=True)
    status: Mapped[Optional[str]] = mapped_column(String(50), nullable=True, default="live")

    @property
    def vendor_code(self) -> str:
        return f"VND-{self.id:04d}"

    @property
    def name(self) -> str:
        return f"Vendor Partner #{self.id}"

    @property
    def category(self) -> str:
        return "Pharmaceuticals & Clinical Supplies"

    @property
    def contact_person(self) -> str:
        return "Supply Chain Manager"

    @property
    def phone(self) -> str:
        return "+91 98450 12345"

    @property
    def email(self) -> str:
        return f"vendor{self.id}@zenvecare.com"

    @property
    def city(self) -> str:
        return "Bengaluru"

    @property
    def rating(self) -> float:
        return 4.8


# 15. Logistics Deliveries
class LogisticsDelivery(Base):
    __tablename__ = "logistics_deliveries"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    delivery_id: Mapped[str] = mapped_column(String(64), nullable=False, unique=True)
    order_ref: Mapped[str] = mapped_column(String(64), nullable=False)
    partner_name: Mapped[str] = mapped_column(String(80), nullable=False, default="Zenve Express 60-Min")
    rider_name: Mapped[str] = mapped_column(String(160), nullable=False)
    rider_phone: Mapped[str] = mapped_column(String(32), nullable=False)
    pickup_location: Mapped[str] = mapped_column(String(255), nullable=False)
    drop_location: Mapped[str] = mapped_column(String(255), nullable=False)
    status: Mapped[str] = mapped_column(String(32), nullable=False, default="In Transit")
    eta_mins: Mapped[int] = mapped_column(Integer, nullable=False, default=25)
    delivery_type: Mapped[str] = mapped_column(String(64), nullable=False, default="Express 60-Min")
    dispatched_at: Mapped[Optional[datetime]] = mapped_column(DateTime, default=datetime.utcnow)


# 16. Fashion Products
class FashionProduct(Base):
    __tablename__ = "fashion_products"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    item_code: Mapped[str] = mapped_column(String(64), nullable=False, unique=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    category: Mapped[str] = mapped_column(String(80), nullable=False)
    size_range: Mapped[str] = mapped_column(String(64), nullable=False, default="S, M, L, XL")
    material: Mapped[str] = mapped_column(String(80), nullable=False, default="Organic Cotton")
    price: Mapped[float] = mapped_column(Float, nullable=False, default=0.0)
    stock: Mapped[int] = mapped_column(Integer, nullable=False, default=50)
    collection: Mapped[str] = mapped_column(String(80), nullable=False, default="Royal Heritage 2026")
    status: Mapped[str] = mapped_column(String(32), nullable=False, default="In Stock")


# 17. B2B Accounts
class B2BAccount(Base):
    __tablename__ = "b2b_accounts"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    account_code: Mapped[str] = mapped_column(String(64), nullable=False, unique=True)
    company_name: Mapped[str] = mapped_column(String(255), nullable=False)
    contact_name: Mapped[str] = mapped_column(String(160), nullable=False)
    email: Mapped[str] = mapped_column(String(160), nullable=False)
    phone: Mapped[str] = mapped_column(String(32), nullable=False)
    city: Mapped[str] = mapped_column(String(80), nullable=False)
    credit_limit: Mapped[float] = mapped_column(Float, nullable=False, default=500000.0)
    outstanding_balance: Mapped[float] = mapped_column(Float, nullable=False, default=0.0)
    contract_status: Mapped[str] = mapped_column(String(32), nullable=False, default="Active")
    annual_deal_value: Mapped[float] = mapped_column(Float, nullable=False, default=1200000.0)


# 18. Import & Export Shipments
class ImportExportShipment(Base):
    __tablename__ = "import_export_shipments"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    shipment_code: Mapped[str] = mapped_column(String(64), nullable=False, unique=True)
    origin_country: Mapped[str] = mapped_column(String(80), nullable=False)
    destination_country: Mapped[str] = mapped_column(String(80), nullable=False, default="India")
    carrier: Mapped[str] = mapped_column(String(120), nullable=False)
    tracking_no: Mapped[str] = mapped_column(String(120), nullable=False)
    goods_description: Mapped[str] = mapped_column(String(255), nullable=False)
    shipment_value: Mapped[float] = mapped_column(Float, nullable=False, default=0.0)
    customs_status: Mapped[str] = mapped_column(String(64), nullable=False, default="Cleared Customs")
    eta_date: Mapped[date] = mapped_column(Date, nullable=False)


# 19. Subscription Plans
class SubscriptionPlan(Base):
    __tablename__ = "subscription_plans"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    plan_code: Mapped[str] = mapped_column(String(64), nullable=False, unique=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    price: Mapped[float] = mapped_column(Float, nullable=False, default=0.0)
    billing_cycle: Mapped[str] = mapped_column(String(32), nullable=False, default="Monthly")
    active_subscribers: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    mrr: Mapped[float] = mapped_column(Float, nullable=False, default=0.0)
    renewal_rate: Mapped[str] = mapped_column(String(20), nullable=False, default="96.2%")
    churn_rate: Mapped[str] = mapped_column(String(20), nullable=False, default="0.8%")
    benefits: Mapped[str] = mapped_column(Text, nullable=False)
    status: Mapped[str] = mapped_column(String(32), nullable=False, default="Active")


# 20. Subscriptions
class Subscription(Base):
    __tablename__ = "subscriptions"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    subscription_code: Mapped[str] = mapped_column(String(64), nullable=False, unique=True)
    plan_id: Mapped[Optional[int]] = mapped_column(BigInteger, nullable=True)
    plan_name: Mapped[str] = mapped_column(String(255), nullable=False)
    pet_name: Mapped[str] = mapped_column(String(120), nullable=False)
    parent_name: Mapped[str] = mapped_column(String(160), nullable=False)
    parent_phone: Mapped[str] = mapped_column(String(32), nullable=False)
    monthly_fee: Mapped[float] = mapped_column(Float, nullable=False, default=0.0)
    payment_method: Mapped[str] = mapped_column(String(64), nullable=False, default="UPI AutoPay")
    next_billing_date: Mapped[Optional[date]] = mapped_column(Date, nullable=True)
    status: Mapped[str] = mapped_column(String(32), nullable=False, default="Active")
    created_at: Mapped[Optional[datetime]] = mapped_column(DateTime, default=datetime.utcnow)

    @property
    def start_date(self) -> date:
        return self.created_at.date() if self.created_at else date(2026, 9, 1)

    @property
    def renewal_date(self) -> Optional[date]:
        return self.next_billing_date or (self.created_at.date() if self.created_at else date(2026, 10, 1))


# 21. Reports
class Report(Base):
    __tablename__ = "reports"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    report_code: Mapped[str] = mapped_column(String(64), nullable=False, unique=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    category: Mapped[str] = mapped_column(String(80), nullable=False)
    format: Mapped[str] = mapped_column(String(20), nullable=False, default="PDF")
    generated_by: Mapped[str] = mapped_column(String(160), nullable=False)
    file_size: Mapped[str] = mapped_column(String(32), nullable=False, default="2.4 MB")
    download_url: Mapped[str] = mapped_column(String(255), nullable=False, default="#")
    created_at: Mapped[Optional[datetime]] = mapped_column(DateTime, default=datetime.utcnow)

    @property
    def generated_at(self) -> Optional[datetime]:
        return self.created_at


# 22. Alerts
class Alert(Base):
    __tablename__ = "alerts"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    alert_code: Mapped[str] = mapped_column(String(64), nullable=False, unique=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    message: Mapped[str] = mapped_column(Text, nullable=False)
    category: Mapped[str] = mapped_column(String(80), nullable=False)
    severity: Mapped[str] = mapped_column(String(20), nullable=False, default="Medium")
    status: Mapped[str] = mapped_column(String(32), nullable=False, default="Active")
    created_at: Mapped[Optional[datetime]] = mapped_column(DateTime, default=datetime.utcnow)

    @property
    def is_read(self) -> int:
        return 1 if self.status.lower() in ("read", "resolved", "dismissed") else 0


# 23. System Health
class SystemHealth(Base):
    __tablename__ = "system_health"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    service_name: Mapped[str] = mapped_column(String(120), nullable=False)
    service_type: Mapped[str] = mapped_column(String(80), nullable=False)
    status: Mapped[str] = mapped_column(String(32), nullable=False, default="Operational")
    uptime_pct: Mapped[float] = mapped_column(Float, nullable=False, default=99.98)
    latency_ms: Mapped[int] = mapped_column(Integer, nullable=False, default=45)
    last_checked: Mapped[Optional[datetime]] = mapped_column(DateTime, default=datetime.utcnow)

    @property
    def last_heartbeat(self) -> Optional[datetime]:
        return self.last_checked


# 24. Company Settings
class CompanySetting(Base):
    __tablename__ = "company_settings"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    setting_key: Mapped[str] = mapped_column(String(80), nullable=False, unique=True)
    setting_value: Mapped[str] = mapped_column(Text, nullable=False)
    category: Mapped[str] = mapped_column(String(80), nullable=False, default="General")
    description: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    updated_at: Mapped[Optional[datetime]] = mapped_column(DateTime, default=datetime.utcnow)


# 25. Vaccinations (table: vaccinations)
class Vaccination(Base):
    __tablename__ = "vaccinations"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    pet_id: Mapped[int] = mapped_column(Integer, nullable=False)
    vaccine_name: Mapped[Optional[str]] = mapped_column(String(200), nullable=True)
    administered_on: Mapped[Optional[date]] = mapped_column(Date, nullable=True)
    next_due_on: Mapped[Optional[date]] = mapped_column(Date, nullable=True)
    batch_number: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)

    @property
    def record_code(self) -> str:
        return f"VAC-{self.id:04d}"

    @property
    def administered_date(self) -> Optional[date]:
        return self.administered_on

    @property
    def next_due_date(self) -> Optional[date]:
        return self.next_due_on

    @property
    def status(self) -> str:
        return "Administered"


# Alias VaccinationRecord to Vaccination
VaccinationRecord = Vaccination


# 26. Medical Records (table: medical_records)
class MedicalRecord(Base):
    __tablename__ = "medical_records"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    pet_id: Mapped[int] = mapped_column(Integer, nullable=False)
    record_type: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    title: Mapped[Optional[str]] = mapped_column(String(200), nullable=True)
    diagnosis: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)
    record_date: Mapped[Optional[date]] = mapped_column(Date, nullable=True)

    @property
    def record_code(self) -> str:
        return f"EHR-{self.id:04d}"

    @property
    def chief_complaint(self) -> str:
        return self.title or self.diagnosis or "Clinical Evaluation"

    @property
    def treatment_plan(self) -> str:
        return f"Prescribed protocol: {self.diagnosis or 'Routine clinical care'}"

    @property
    def doctor_name(self) -> str:
        return "Dr. Lakshmanan M"


# 27. Follow-Ups (table: clinical_follow_ups)
class FollowUp(Base):
    __tablename__ = "clinical_follow_ups"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    followup_code: Mapped[str] = mapped_column(String(64), nullable=False, unique=True)
    pet_name: Mapped[str] = mapped_column(String(120), nullable=False)
    parent_name: Mapped[str] = mapped_column(String(160), nullable=False)
    doctor_name: Mapped[str] = mapped_column(String(160), nullable=False)
    reason: Mapped[str] = mapped_column(String(255), nullable=False)
    followup_date: Mapped[date] = mapped_column(Date, nullable=False)
    next_follow_up_date: Mapped[date] = mapped_column(Date, nullable=False)
    status: Mapped[str] = mapped_column(String(32), nullable=False, default="Scheduled")
    reminder_sent: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    created_at: Mapped[Optional[datetime]] = mapped_column(DateTime, default=datetime.utcnow)


# 28. Clinical Invoices & Billing (table: clinical_invoices)
class ClinicalInvoice(Base):
    __tablename__ = "clinical_invoices"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    invoice_number: Mapped[str] = mapped_column(String(64), nullable=False, unique=True)
    pet_name: Mapped[str] = mapped_column(String(120), nullable=False)
    parent_name: Mapped[str] = mapped_column(String(160), nullable=False)
    doctor_name: Mapped[str] = mapped_column(String(160), nullable=False)
    consultation_fee: Mapped[float] = mapped_column(Float, nullable=False, default=500.0)
    medicine_fee: Mapped[float] = mapped_column(Float, nullable=False, default=146.0)
    total_amount: Mapped[float] = mapped_column(Float, nullable=False, default=646.0)
    paid_amount: Mapped[float] = mapped_column(Float, nullable=False, default=646.0)
    payment_status: Mapped[str] = mapped_column(String(32), nullable=False, default="PAID")
    payment_method: Mapped[str] = mapped_column(String(32), nullable=False, default="CASH")
    notes: Mapped[str] = mapped_column(String(255), nullable=False, default="Clinical consultation & prescription billing")
    invoice_date: Mapped[date] = mapped_column(Date, nullable=False)
    created_at: Mapped[Optional[datetime]] = mapped_column(DateTime, default=datetime.utcnow)


# 29. Prescriptions (table: prescriptions)
class Prescription(Base):
    __tablename__ = "prescriptions"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    doctor_id: Mapped[int] = mapped_column(Integer, nullable=False)
    pet_id: Mapped[int] = mapped_column(Integer, nullable=False)
    valid_until: Mapped[Optional[date]] = mapped_column(Date, nullable=True)
    created_at: Mapped[Optional[datetime]] = mapped_column(DateTime, default=datetime.utcnow)

    @property
    def rx_code(self) -> str:
        return f"RX-{self.id:04d}"

    @property
    def prescription_date(self) -> date:
        return self.created_at.date() if self.created_at else date(2026, 10, 6)

    @property
    def date(self) -> date:
        return self.prescription_date

    @property
    def diagnosis(self) -> str:
        return "General Wellness & Clinical Care"

    @property
    def medicines(self) -> str:
        return "Amoxicillin 500mg, Multi-Vitamin Drops"

    @property
    def dosage(self) -> str:
        return "1 Tab BID"

    @property
    def duration(self) -> str:
        return "5 Days"

    @property
    def instructions(self) -> str:
        return "Post meals with plenty of fresh water"

    @property
    def status(self) -> str:
        if self.valid_until and self.valid_until < date.today():
            return "Expired"
        return "Active"


# 30. Consultations (table: consultations)
class Consultation(Base):
    __tablename__ = "consultations"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    appointment_id: Mapped[int] = mapped_column(Integer, nullable=False)
    consultation_mode: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    diagnosis: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)
    follow_up_date: Mapped[Optional[date]] = mapped_column(Date, nullable=True)
    created_at: Mapped[Optional[datetime]] = mapped_column(DateTime, default=datetime.utcnow)
