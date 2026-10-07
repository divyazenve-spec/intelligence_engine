"""SQLAlchemy ORM models for all Zenve Intelligence Engine domains in MySQL zenve_engine."""
from datetime import date, datetime
from typing import Optional
from sqlalchemy import BigInteger, Date, DateTime, Float, Integer, Numeric, String, Text
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

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    order_id: Mapped[str] = mapped_column(String(64), nullable=False, unique=True)
    customer_name: Mapped[str] = mapped_column(String(160), nullable=False)
    customer_phone: Mapped[str] = mapped_column(String(32), nullable=False)
    items_count: Mapped[int] = mapped_column(Integer, nullable=False, default=1)
    total_amount: Mapped[float] = mapped_column(Float, nullable=False, default=0.0)
    status: Mapped[str] = mapped_column(String(32), nullable=False, default="Processing")
    payment_method: Mapped[str] = mapped_column(String(32), nullable=False, default="UPI")
    channel: Mapped[str] = mapped_column(String(32), nullable=False, default="Android App")
    delivery_slot: Mapped[str] = mapped_column(String(64), nullable=False, default="Standard Delivery")
    city: Mapped[str] = mapped_column(String(80), nullable=False, default="Bengaluru")
    created_at: Mapped[Optional[datetime]] = mapped_column(DateTime, default=datetime.utcnow)


# 4. Products & Inventory
class Product(Base):
    __tablename__ = "products"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    sku: Mapped[str] = mapped_column(String(64), nullable=False, unique=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    category: Mapped[str] = mapped_column(String(80), nullable=False)
    brand: Mapped[str] = mapped_column(String(80), nullable=False, default="Zenve Care")
    price: Mapped[float] = mapped_column(Float, nullable=False, default=0.0)
    cost_price: Mapped[float] = mapped_column(Float, nullable=False, default=0.0)
    stock: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    min_stock: Mapped[int] = mapped_column(Integer, nullable=False, default=15)
    unit: Mapped[str] = mapped_column(String(32), nullable=False, default="Unit")
    status: Mapped[str] = mapped_column(String(32), nullable=False, default="In Stock")


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


# 6. Veterinary Services
class VeterinaryService(Base):
    __tablename__ = "veterinary_services"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    service_code: Mapped[str] = mapped_column(String(64), nullable=False, unique=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    category: Mapped[str] = mapped_column(String(80), nullable=False)
    duration_mins: Mapped[int] = mapped_column(Integer, nullable=False, default=30)
    price: Mapped[float] = mapped_column(Float, nullable=False, default=0.0)
    doctor_in_charge: Mapped[str] = mapped_column(String(160), nullable=False, default="Dr. Priya Sharma")
    status: Mapped[str] = mapped_column(String(32), nullable=False, default="Active")
    active_bookings: Mapped[int] = mapped_column(Integer, nullable=False, default=0)


# 7. Appointments
class Appointment(Base):
    __tablename__ = "appointments"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    appointment_code: Mapped[str] = mapped_column(String(64), nullable=False, unique=True)
    pet_name: Mapped[str] = mapped_column(String(120), nullable=False)
    pet_type: Mapped[str] = mapped_column(String(64), nullable=False, default="Dog")
    parent_name: Mapped[str] = mapped_column(String(160), nullable=False)
    parent_phone: Mapped[str] = mapped_column(String(32), nullable=False)
    doctor_name: Mapped[str] = mapped_column(String(160), nullable=False)
    service_name: Mapped[str] = mapped_column(String(255), nullable=False)
    appointment_date: Mapped[date] = mapped_column(Date, nullable=False)
    appointment_time: Mapped[str] = mapped_column(String(20), nullable=False)
    status: Mapped[str] = mapped_column(String(32), nullable=False, default="Confirmed")
    clinic_name: Mapped[str] = mapped_column(String(160), nullable=False, default="Zenve Central Animal Hospital, Koramangala")
    created_at: Mapped[Optional[datetime]] = mapped_column(DateTime, default=datetime.utcnow)


# 8. Doctors
class Doctor(Base):
    __tablename__ = "doctors"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    doctor_code: Mapped[str] = mapped_column(String(64), nullable=False, unique=True)
    name: Mapped[str] = mapped_column(String(160), nullable=False)
    specialty: Mapped[str] = mapped_column(String(120), nullable=False)
    qualification: Mapped[str] = mapped_column(String(120), nullable=False)
    experience_years: Mapped[int] = mapped_column(Integer, nullable=False, default=5)
    phone: Mapped[str] = mapped_column(String(32), nullable=False)
    email: Mapped[str] = mapped_column(String(120), nullable=False)
    clinic_branch: Mapped[str] = mapped_column(String(160), nullable=False)
    status: Mapped[str] = mapped_column(String(32), nullable=False, default="On Duty")
    consultations_count: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    rating: Mapped[float] = mapped_column(Float, nullable=False, default=4.9)
    created_at: Mapped[Optional[datetime]] = mapped_column(DateTime, default=datetime.utcnow)


# 9. Clinics & Hospitals
class ClinicHospital(Base):
    __tablename__ = "clinics_hospitals"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    clinic_code: Mapped[str] = mapped_column(String(64), nullable=False, unique=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    address: Mapped[str] = mapped_column(String(255), nullable=False)
    city: Mapped[str] = mapped_column(String(80), nullable=False)
    state: Mapped[str] = mapped_column(String(80), nullable=False, default="Karnataka")
    phone: Mapped[str] = mapped_column(String(32), nullable=False)
    doctors_count: Mapped[int] = mapped_column(Integer, nullable=False, default=1)
    beds_capacity: Mapped[int] = mapped_column(Integer, nullable=False, default=10)
    daily_footfall: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    operational_status: Mapped[str] = mapped_column(String(32), nullable=False, default="Open 24x7")
    created_at: Mapped[Optional[datetime]] = mapped_column(DateTime, default=datetime.utcnow)


# 10. Customers
class Customer(Base):
    __tablename__ = "customers"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    customer_code: Mapped[str] = mapped_column(String(64), nullable=False, unique=True)
    name: Mapped[str] = mapped_column(String(160), nullable=False)
    email: Mapped[str] = mapped_column(String(160), nullable=False)
    phone: Mapped[str] = mapped_column(String(32), nullable=False)
    city: Mapped[str] = mapped_column(String(80), nullable=False)
    pet_names: Mapped[str] = mapped_column(String(255), nullable=False)
    total_orders: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    total_spent: Mapped[float] = mapped_column(Float, nullable=False, default=0.0)
    tier: Mapped[str] = mapped_column(String(32), nullable=False, default="Silver")
    status: Mapped[str] = mapped_column(String(32), nullable=False, default="Active")
    joined_date: Mapped[date] = mapped_column(Date, nullable=False)
    created_at: Mapped[Optional[datetime]] = mapped_column(DateTime, default=datetime.utcnow)


# 11. Pets
class Pet(Base):
    __tablename__ = "pets"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    pet_code: Mapped[str] = mapped_column(String(64), nullable=False, unique=True)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    species: Mapped[str] = mapped_column(String(64), nullable=False, default="Dog")
    breed: Mapped[str] = mapped_column(String(120), nullable=False)
    age_years: Mapped[float] = mapped_column(Float, nullable=False, default=1.0)
    gender: Mapped[str] = mapped_column(String(16), nullable=False, default="Male")
    weight_kg: Mapped[float] = mapped_column(Float, nullable=False, default=10.0)
    parent_name: Mapped[str] = mapped_column(String(160), nullable=False)
    parent_phone: Mapped[str] = mapped_column(String(32), nullable=False)
    microchip_id: Mapped[Optional[str]] = mapped_column(String(64), nullable=True)
    vaccination_status: Mapped[str] = mapped_column(String(32), nullable=False, default="Up to date")
    last_visit_date: Mapped[Optional[date]] = mapped_column(Date, nullable=True)
    created_at: Mapped[Optional[datetime]] = mapped_column(DateTime, default=datetime.utcnow)


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

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    vendor_code: Mapped[str] = mapped_column(String(64), nullable=False, unique=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    category: Mapped[str] = mapped_column(String(80), nullable=False)
    contact_person: Mapped[str] = mapped_column(String(160), nullable=False)
    phone: Mapped[str] = mapped_column(String(32), nullable=False)
    email: Mapped[str] = mapped_column(String(160), nullable=False)
    city: Mapped[str] = mapped_column(String(80), nullable=False)
    rating: Mapped[float] = mapped_column(Float, nullable=False, default=4.8)
    payment_terms: Mapped[str] = mapped_column(String(64), nullable=False, default="Net 30")
    status: Mapped[str] = mapped_column(String(32), nullable=False, default="Approved")


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
    payment_method: Mapped[str] = mapped_column(String(64), nullable=False, default="UPI AutoPay (HDFC)")
    next_billing_date: Mapped[date] = mapped_column(Date, nullable=False)
    status: Mapped[str] = mapped_column(String(32), nullable=False, default="Active")
    created_at: Mapped[Optional[datetime]] = mapped_column(DateTime, default=datetime.utcnow)


# 21. Reports
class Report(Base):
    __tablename__ = "reports"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    report_code: Mapped[str] = mapped_column(String(64), nullable=False, unique=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    category: Mapped[str] = mapped_column(String(80), nullable=False)
    format: Mapped[str] = mapped_column(String(20), nullable=False, default="CSV")
    generated_by: Mapped[str] = mapped_column(String(120), nullable=False, default="Executive Automated Cron")
    file_size: Mapped[str] = mapped_column(String(32), nullable=False, default="1.4 MB")
    download_url: Mapped[str] = mapped_column(String(255), nullable=False, default="#")
    created_at: Mapped[Optional[datetime]] = mapped_column(DateTime, default=datetime.utcnow)


# 22. Alerts
class Alert(Base):
    __tablename__ = "alerts"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    alert_code: Mapped[str] = mapped_column(String(64), nullable=False, unique=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    message: Mapped[str] = mapped_column(Text, nullable=False)
    category: Mapped[str] = mapped_column(String(80), nullable=False)
    severity: Mapped[str] = mapped_column(String(32), nullable=False, default="Medium")
    status: Mapped[str] = mapped_column(String(32), nullable=False, default="Unread")
    created_at: Mapped[Optional[datetime]] = mapped_column(DateTime, default=datetime.utcnow)


# 23. System Health
class SystemHealth(Base):
    __tablename__ = "system_health"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    service_name: Mapped[str] = mapped_column(String(120), nullable=False, unique=True)
    service_type: Mapped[str] = mapped_column(String(64), nullable=False, default="API Microservice")
    status: Mapped[str] = mapped_column(String(32), nullable=False, default="Healthy")
    uptime_pct: Mapped[float] = mapped_column(Float, nullable=False, default=99.98)
    latency_ms: Mapped[int] = mapped_column(Integer, nullable=False, default=18)
    last_checked: Mapped[Optional[datetime]] = mapped_column(DateTime, default=datetime.utcnow)


# 24. Company Settings
class CompanySetting(Base):
    __tablename__ = "company_settings"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    setting_key: Mapped[str] = mapped_column(String(120), nullable=False, unique=True)
    setting_value: Mapped[str] = mapped_column(Text, nullable=False)
    category: Mapped[str] = mapped_column(String(80), nullable=False, default="General")
    description: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    updated_at: Mapped[Optional[datetime]] = mapped_column(DateTime, default=datetime.utcnow)
