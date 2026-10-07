-- =====================================================================
-- Zenve Intelligence Engine — Full Relational MySQL Database Schema
-- Database: zenve_engine
-- Supports all 23 domains & dashboards with real database-driven storage
-- =====================================================================

USE zenve_engine;

-- 1. Daily Metrics (Overview / Daily trends)
CREATE TABLE IF NOT EXISTS daily_metrics (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  business_date DATE NOT NULL UNIQUE,
  sales_total DECIMAL(14,2) NOT NULL DEFAULT 0,
  android_downloads INT NOT NULL DEFAULT 0,
  ios_downloads INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Sales Ledger & Transactions
CREATE TABLE IF NOT EXISTS sales (
  seq BIGINT AUTO_INCREMENT PRIMARY KEY,
  sale_id VARCHAR(64) NOT NULL UNIQUE,
  transaction_ref VARCHAR(64) NOT NULL,
  sold_at VARCHAR(40) NOT NULL,
  source VARCHAR(120) NOT NULL,
  person VARCHAR(160) NOT NULL,
  city VARCHAR(80) NOT NULL,
  amount DECIMAL(14,2) NOT NULL DEFAULT 0,
  status VARCHAR(20) NOT NULL DEFAULT 'Paid',
  app_source VARCHAR(20) NOT NULL DEFAULT 'Android',
  is_demo TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_sales_sold_at (sold_at),
  INDEX idx_sales_city (city),
  INDEX idx_sales_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Orders & Operations
CREATE TABLE IF NOT EXISTS orders (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  order_id VARCHAR(64) NOT NULL UNIQUE,
  customer_name VARCHAR(160) NOT NULL,
  customer_phone VARCHAR(32) NOT NULL,
  items_count INT NOT NULL DEFAULT 1,
  total_amount DECIMAL(14,2) NOT NULL DEFAULT 0,
  status VARCHAR(32) NOT NULL DEFAULT 'Processing', -- Processing, Packed, Shipped, Delivered, Cancelled, Returned
  payment_method VARCHAR(32) NOT NULL DEFAULT 'UPI',
  channel VARCHAR(32) NOT NULL DEFAULT 'Android App',
  delivery_slot VARCHAR(64) NOT NULL DEFAULT 'Standard Delivery',
  city VARCHAR(80) NOT NULL DEFAULT 'Bengaluru',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_orders_status (status),
  INDEX idx_orders_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Products & Inventory
CREATE TABLE IF NOT EXISTS products (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  sku VARCHAR(64) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(80) NOT NULL,
  brand VARCHAR(80) NOT NULL DEFAULT 'Zenve Care',
  price DECIMAL(14,2) NOT NULL DEFAULT 0,
  cost_price DECIMAL(14,2) NOT NULL DEFAULT 0,
  stock INT NOT NULL DEFAULT 0,
  min_stock INT NOT NULL DEFAULT 15,
  unit VARCHAR(32) NOT NULL DEFAULT 'Unit',
  status VARCHAR(32) NOT NULL DEFAULT 'In Stock', -- In Stock, Low Stock, Out of Stock
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_products_category (category),
  INDEX idx_products_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Pharmacy Medicines & Prescriptions
CREATE TABLE IF NOT EXISTS pharmacy_medicines (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  med_code VARCHAR(64) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  brand VARCHAR(120) NOT NULL,
  salt_name VARCHAR(255) NOT NULL,
  category VARCHAR(80) NOT NULL,
  price DECIMAL(14,2) NOT NULL DEFAULT 0,
  stock INT NOT NULL DEFAULT 0,
  batch_no VARCHAR(64) NOT NULL,
  expiry_date DATE NOT NULL,
  requires_prescription TINYINT(1) NOT NULL DEFAULT 1,
  status VARCHAR(32) NOT NULL DEFAULT 'Available',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_pharmacy_expiry (expiry_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. Veterinary Services Catalog
CREATE TABLE IF NOT EXISTS veterinary_services (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  service_code VARCHAR(64) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(80) NOT NULL, -- Consultation, Surgery, Diagnostics, Vaccination, Dental, Wellness
  duration_mins INT NOT NULL DEFAULT 30,
  price DECIMAL(14,2) NOT NULL DEFAULT 0,
  doctor_in_charge VARCHAR(160) NOT NULL DEFAULT 'Dr. Priya Sharma',
  status VARCHAR(32) NOT NULL DEFAULT 'Active',
  active_bookings INT NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 7. Veterinary Appointments & Consultations
CREATE TABLE IF NOT EXISTS appointments (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  appointment_code VARCHAR(64) NOT NULL UNIQUE,
  pet_name VARCHAR(120) NOT NULL,
  pet_type VARCHAR(64) NOT NULL DEFAULT 'Dog',
  parent_name VARCHAR(160) NOT NULL,
  parent_phone VARCHAR(32) NOT NULL,
  doctor_name VARCHAR(160) NOT NULL,
  service_name VARCHAR(255) NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_time VARCHAR(20) NOT NULL,
  status VARCHAR(32) NOT NULL DEFAULT 'Confirmed', -- Confirmed, In Progress, Completed, Cancelled
  clinic_name VARCHAR(160) NOT NULL DEFAULT 'Zenve Central Animal Hospital, Koramangala',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_app_date (appointment_date),
  INDEX idx_app_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 8. Doctors Directory & Schedules
CREATE TABLE IF NOT EXISTS doctors (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  doctor_code VARCHAR(64) NOT NULL UNIQUE,
  name VARCHAR(160) NOT NULL,
  specialty VARCHAR(120) NOT NULL,
  qualification VARCHAR(120) NOT NULL,
  experience_years INT NOT NULL DEFAULT 5,
  phone VARCHAR(32) NOT NULL,
  email VARCHAR(120) NOT NULL,
  clinic_branch VARCHAR(160) NOT NULL,
  status VARCHAR(32) NOT NULL DEFAULT 'On Duty', -- On Duty, In Consultation, On Leave
  consultations_count INT NOT NULL DEFAULT 0,
  rating DECIMAL(3,2) NOT NULL DEFAULT 4.9,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 9. Clinics & Hospital Facilities
CREATE TABLE IF NOT EXISTS clinics_hospitals (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  clinic_code VARCHAR(64) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  city VARCHAR(80) NOT NULL,
  state VARCHAR(80) NOT NULL DEFAULT 'Karnataka',
  phone VARCHAR(32) NOT NULL,
  doctors_count INT NOT NULL DEFAULT 1,
  beds_capacity INT NOT NULL DEFAULT 10,
  daily_footfall INT NOT NULL DEFAULT 0,
  operational_status VARCHAR(32) NOT NULL DEFAULT 'Open 24x7',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 10. Customers 360 Database
CREATE TABLE IF NOT EXISTS customers (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  customer_code VARCHAR(64) NOT NULL UNIQUE,
  name VARCHAR(160) NOT NULL,
  email VARCHAR(160) NOT NULL,
  phone VARCHAR(32) NOT NULL,
  city VARCHAR(80) NOT NULL,
  pet_names VARCHAR(255) NOT NULL,
  total_orders INT NOT NULL DEFAULT 0,
  total_spent DECIMAL(14,2) NOT NULL DEFAULT 0,
  tier VARCHAR(32) NOT NULL DEFAULT 'Silver', -- Silver, Gold, Platinum, VIP
  status VARCHAR(32) NOT NULL DEFAULT 'Active',
  joined_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_customers_phone (phone)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 11. Pets 360 Database & Health Records
CREATE TABLE IF NOT EXISTS pets (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  pet_code VARCHAR(64) NOT NULL UNIQUE,
  name VARCHAR(120) NOT NULL,
  species VARCHAR(64) NOT NULL DEFAULT 'Dog', -- Dog, Cat, Bird, Exotic
  breed VARCHAR(120) NOT NULL,
  age_years DECIMAL(4,1) NOT NULL DEFAULT 1.0,
  gender VARCHAR(16) NOT NULL DEFAULT 'Male',
  weight_kg DECIMAL(5,2) NOT NULL DEFAULT 10.0,
  parent_name VARCHAR(160) NOT NULL,
  parent_phone VARCHAR(32) NOT NULL,
  microchip_id VARCHAR(64) NULL,
  vaccination_status VARCHAR(32) NOT NULL DEFAULT 'Up to date',
  last_visit_date DATE NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 12. Employees & HR Management
CREATE TABLE IF NOT EXISTS employees (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  employee_code VARCHAR(64) NOT NULL UNIQUE,
  name VARCHAR(160) NOT NULL,
  email VARCHAR(160) NOT NULL,
  phone VARCHAR(32) NOT NULL,
  department VARCHAR(80) NOT NULL,
  designation VARCHAR(120) NOT NULL,
  joining_date DATE NOT NULL,
  salary DECIMAL(14,2) NOT NULL DEFAULT 0,
  status VARCHAR(32) NOT NULL DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 13. Marketing Campaigns & Lead Acquisition
CREATE TABLE IF NOT EXISTS marketing_campaigns (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  campaign_code VARCHAR(64) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  channel VARCHAR(80) NOT NULL, -- Instagram, Google Ads, Pet Expo, Influencer, WhatsApp
  budget DECIMAL(14,2) NOT NULL DEFAULT 0,
  spent DECIMAL(14,2) NOT NULL DEFAULT 0,
  revenue_generated DECIMAL(14,2) NOT NULL DEFAULT 0,
  leads_count INT NOT NULL DEFAULT 0,
  roas DECIMAL(6,2) NOT NULL DEFAULT 0,
  status VARCHAR(32) NOT NULL DEFAULT 'Active',
  start_date DATE NOT NULL,
  end_date DATE NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 14. Vendors & Procurement
CREATE TABLE IF NOT EXISTS vendors (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  vendor_code VARCHAR(64) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(80) NOT NULL,
  contact_person VARCHAR(160) NOT NULL,
  phone VARCHAR(32) NOT NULL,
  email VARCHAR(160) NOT NULL,
  city VARCHAR(80) NOT NULL,
  rating DECIMAL(3,2) NOT NULL DEFAULT 4.8,
  payment_terms VARCHAR(64) NOT NULL DEFAULT 'Net 30',
  status VARCHAR(32) NOT NULL DEFAULT 'Approved'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 15. Logistics & Dispatch Deliveries
CREATE TABLE IF NOT EXISTS logistics_deliveries (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  delivery_id VARCHAR(64) NOT NULL UNIQUE,
  order_ref VARCHAR(64) NOT NULL,
  partner_name VARCHAR(80) NOT NULL DEFAULT 'Zenve Express 60-Min',
  rider_name VARCHAR(160) NOT NULL,
  rider_phone VARCHAR(32) NOT NULL,
  pickup_location VARCHAR(255) NOT NULL,
  drop_location VARCHAR(255) NOT NULL,
  status VARCHAR(32) NOT NULL DEFAULT 'In Transit', -- Dispatched, In Transit, Delivered, Delayed
  eta_mins INT NOT NULL DEFAULT 25,
  delivery_type VARCHAR(64) NOT NULL DEFAULT 'Express 60-Min',
  dispatched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 16. Zenve Fashion & Lifestyle
CREATE TABLE IF NOT EXISTS fashion_products (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  item_code VARCHAR(64) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(80) NOT NULL, -- Harnesses, Winter Coats, Raincoats, Festive Wear, Bandanas
  size_range VARCHAR(64) NOT NULL DEFAULT 'S, M, L, XL',
  material VARCHAR(80) NOT NULL DEFAULT 'Organic Cotton',
  price DECIMAL(14,2) NOT NULL DEFAULT 0,
  stock INT NOT NULL DEFAULT 50,
  collection VARCHAR(80) NOT NULL DEFAULT 'Royal Heritage 2026',
  status VARCHAR(32) NOT NULL DEFAULT 'In Stock'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 17. B2B / Enterprise Accounts
CREATE TABLE IF NOT EXISTS b2b_accounts (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  account_code VARCHAR(64) NOT NULL UNIQUE,
  company_name VARCHAR(255) NOT NULL,
  contact_name VARCHAR(160) NOT NULL,
  email VARCHAR(160) NOT NULL,
  phone VARCHAR(32) NOT NULL,
  city VARCHAR(80) NOT NULL,
  credit_limit DECIMAL(14,2) NOT NULL DEFAULT 500000,
  outstanding_balance DECIMAL(14,2) NOT NULL DEFAULT 0,
  contract_status VARCHAR(32) NOT NULL DEFAULT 'Active',
  annual_deal_value DECIMAL(14,2) NOT NULL DEFAULT 1200000
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 18. Import & Export Shipments
CREATE TABLE IF NOT EXISTS import_export_shipments (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  shipment_code VARCHAR(64) NOT NULL UNIQUE,
  origin_country VARCHAR(80) NOT NULL,
  destination_country VARCHAR(80) NOT NULL DEFAULT 'India',
  carrier VARCHAR(120) NOT NULL,
  tracking_no VARCHAR(120) NOT NULL,
  goods_description VARCHAR(255) NOT NULL,
  shipment_value DECIMAL(14,2) NOT NULL DEFAULT 0,
  customs_status VARCHAR(64) NOT NULL DEFAULT 'Cleared Customs', -- Under Inspection, Cleared Customs, En Route
  eta_date DATE NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 19. Subscription Plans
CREATE TABLE IF NOT EXISTS subscription_plans (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  plan_code VARCHAR(64) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(14,2) NOT NULL DEFAULT 0,
  billing_cycle VARCHAR(32) NOT NULL DEFAULT 'Monthly',
  active_subscribers INT NOT NULL DEFAULT 0,
  mrr DECIMAL(14,2) NOT NULL DEFAULT 0,
  renewal_rate VARCHAR(20) NOT NULL DEFAULT '96.2%',
  churn_rate VARCHAR(20) NOT NULL DEFAULT '0.8%',
  benefits TEXT NOT NULL,
  status VARCHAR(32) NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 20. Active Subscriptions & Member Roster
CREATE TABLE IF NOT EXISTS subscriptions (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  subscription_code VARCHAR(64) NOT NULL UNIQUE,
  plan_id BIGINT NULL,
  plan_name VARCHAR(255) NOT NULL,
  pet_name VARCHAR(120) NOT NULL,
  parent_name VARCHAR(160) NOT NULL,
  parent_phone VARCHAR(32) NOT NULL,
  monthly_fee DECIMAL(14,2) NOT NULL DEFAULT 0,
  payment_method VARCHAR(64) NOT NULL DEFAULT 'UPI AutoPay (HDFC)',
  next_billing_date DATE NOT NULL,
  status VARCHAR(32) NOT NULL DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 21. Reports & Generated Exports
CREATE TABLE IF NOT EXISTS reports (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  report_code VARCHAR(64) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(80) NOT NULL,
  format VARCHAR(20) NOT NULL DEFAULT 'CSV',
  generated_by VARCHAR(120) NOT NULL DEFAULT 'Executive Automated Cron',
  file_size VARCHAR(32) NOT NULL DEFAULT '1.4 MB',
  download_url VARCHAR(255) NOT NULL DEFAULT '#',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 22. Real-Time System Alerts & Notifications
CREATE TABLE IF NOT EXISTS alerts (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  alert_code VARCHAR(64) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  category VARCHAR(80) NOT NULL, -- Revenue, Inventory, Healthcare, Operations
  severity VARCHAR(32) NOT NULL DEFAULT 'Medium', -- Critical, High, Medium, Low
  status VARCHAR(32) NOT NULL DEFAULT 'Unread', -- Unread, Acknowledged, Resolved
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 23. System Health & Infrastructure Services
CREATE TABLE IF NOT EXISTS system_health (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  service_name VARCHAR(120) NOT NULL UNIQUE,
  service_type VARCHAR(64) NOT NULL DEFAULT 'API Microservice',
  status VARCHAR(32) NOT NULL DEFAULT 'Healthy', -- Healthy, Degraded, Down
  uptime_pct DECIMAL(5,2) NOT NULL DEFAULT 99.98,
  latency_ms INT NOT NULL DEFAULT 18,
  last_checked TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 24. Company & System Settings
CREATE TABLE IF NOT EXISTS company_settings (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  setting_key VARCHAR(120) NOT NULL UNIQUE,
  setting_value TEXT NOT NULL,
  category VARCHAR(80) NOT NULL DEFAULT 'General',
  description VARCHAR(255) NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
