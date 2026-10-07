/* =====================================================================
   Zenve BI — Alerts & Notifications Executive Control Center
   Unified Multi-Domain Alert Intelligence Suite for All 11 Modules:
     1. Critical Alerts (Sev-1 Operational & Emergency Triggers)
     2. Revenue Alerts (GMV, Pacing, Returns & CAC Spikes)
     3. Inventory Alerts (Stockouts, Reorders, Expiry & Cold-Chain)
     4. Payment Alerts (UPI Failures, B2B Aging, Gateway Uptime)
     5. Order Alerts (Rx Verification Backlog, Packing SLAs, Cancellations)
     6. Delivery Alerts (60-Min Express SLAs, Rider Telemetry & Breakdown)
     7. Finance Alerts (EBITDA Margins, Unallocated Cash, GST Deadlines)
     8. HR Alerts (ICU Nurse Shortages, On-Call Vet Roster, Quotas)
     9. System Alerts (FastAPI Latency, SQLite Locks, Gemini AI Quota)
     10. Alert Rules (Interactive Rule Engine, Thresholds & Escalation)
     11. Notification Center (Omni-Channel Feed, Channels & Audit Logs)
   ===================================================================== */

(function () {
  'use strict';

  /* ── Modules Configuration ───────────────────────────────────────── */
  var MODULES = [
    { id: 'critical',   label: 'Critical Alerts',    icon: '🚨', hash: '#critical-alerts',    badge: '4 Sev-1', critical: true },
    { id: 'revenue',    label: 'Revenue Alerts',     icon: '💼', hash: '#revenue-alerts',     badge: '5 Active' },
    { id: 'inventory',  label: 'Inventory Alerts',   icon: '📦', hash: '#inventory-alerts',   badge: '5 Active' },
    { id: 'payment',    label: 'Payment Alerts',     icon: '💳', hash: '#payment-alerts',     badge: '5 Active' },
    { id: 'order',      label: 'Order Alerts',       icon: '🚚', hash: '#order-alerts',       badge: '5 Active' },
    { id: 'delivery',   label: 'Delivery Alerts',    icon: '⚡', hash: '#delivery-alerts',    badge: '96.2% SLA' },
    { id: 'finance',    label: 'Finance Alerts',     icon: '💰', hash: '#finance-alerts',     badge: '5 Active' },
    { id: 'hr',         label: 'HR Alerts',          icon: '🧑‍💼', hash: '#hr-alerts',          badge: '2 Critical' },
    { id: 'system',     label: 'System Alerts',      icon: '🖥️', hash: '#system-alerts',      badge: '5 Active' },
    { id: 'rules',      label: 'Alert Rules',        icon: '⚙️', hash: '#alert-rules',        badge: '8 Rules' },
    { id: 'notifs',     label: 'Notification Center',icon: '🔔', hash: '#notification-center', badge: '3 Unread' }
  ];

  /* ── In-Memory Alert Intelligence State ──────────────────────────── */
  var S = {
    open: false,
    activeTab: 'critical',
    severityFilter: 'all',
    hubFilter: 'all',
    chimesEnabled: true,
    searchQuery: '',

    // 1. Critical Alerts
    critical: [],


    // 2. Revenue Alerts
    revenue: [
      {
        id: 'REV-201',
        title: 'Delhi NCR Weekend GMV Drop Alert (-14.2%)',
        channel: 'Quick-Commerce Mobile Apps',
        trigger: 'Pacing ₹3.8L below daily target of ₹26.5L',
        cause: 'Severe waterlogging in Gurgaon Hub reducing order radius',
        impact: '₹3,80,000 potential revenue shortfall',
        severity: 'Warning',
        time: '45m ago',
        status: 'Active'
      },
      {
        id: 'REV-202',
        title: 'Bravecto Flea & Tick Return Rate Surge (5.8%)',
        channel: 'Direct E-Commerce & Telehealth',
        trigger: 'Return rate crossed safety threshold of 2.5%',
        cause: 'Pet parents selecting incorrect weight brackets on checkout',
        impact: '₹1,42,000 in reverse logistics and opened pack write-downs',
        severity: 'Critical',
        time: '2h ago',
        status: 'Active'
      },
      {
        id: 'REV-203',
        title: 'Veterinary Dental & Scaling Revenue Deficit (-28%)',
        channel: 'Clinical Outpatient Services',
        trigger: 'Weekly bookings fell to 42 procedures (Target: 60)',
        cause: 'Diagnostic ultrasound room maintenance in Koramangala',
        impact: '₹1,26,000 weekly high-margin clinical shortfall',
        severity: 'Warning',
        time: '4h ago',
        status: 'Active'
      },
      {
        id: 'REV-204',
        title: 'Meta Ads Customer Acquisition Cost (CAC) Spike (+64%)',
        channel: 'Performance Marketing (Puppy Care)',
        trigger: 'Blended CAC rose from ₹420 to ₹690',
        cause: 'Ad creative fatigue & high CPM bids during e-commerce festival',
        impact: 'ROAS compressed from 3.2x to 1.8x on new cohorts',
        severity: 'Info',
        time: '6h ago',
        status: 'Active'
      },
      {
        id: 'REV-205',
        title: 'B2B Corporate Account Renewal Overdue: Infosys Pet Club',
        channel: 'B2B Corporate Wellness',
        trigger: 'Contract expiration in 4 days · ₹8.4L Annual ARR',
        cause: 'Corporate HR procurement awaiting updated billing schedule',
        impact: '₹8,40,000 annual recurring contract at risk',
        severity: 'Critical',
        time: '8h ago',
        status: 'Active'
      }
    ],

    // 3. Inventory Alerts
    inventory: [
      {
        id: 'INV-301',
        title: 'Critical Stockout Hazard: Royal Canin Maxi Puppy 4kg',
        sku: 'ZV-RC-MAX-04',
        hub: 'Koramangala 60-Min Express Hub',
        stock: '6 units left (Safety: 35)',
        burn: '18 units/day · Out in 8 hours',
        severity: 'Critical',
        action: 'Inter-hub transfer from Bhiwandi Central',
        status: 'Active'
      },
      {
        id: 'INV-302',
        title: 'Near-Expiry Batch (< 30 Days): Zoetis Apoquel 16mg',
        sku: 'ZV-MED-APO-16',
        hub: 'Bhiwandi Central Pharma Hub',
        stock: '140 strips (Expires Oct 27 · 22 days)',
        burn: '₹1,68,000 capital at expiry risk',
        severity: 'Warning',
        action: 'Auto-apply 35% clearance discount to partner clinics',
        status: 'Active'
      },
      {
        id: 'INV-303',
        title: 'Negative Physical Cycle-Count Variance (-14 cans)',
        sku: 'ZV-PET-FAR-CAN',
        hub: 'Indiranagar Express Dark Store',
        stock: 'Farmina N&D Wet Food Lamb & Blueberry',
        burn: 'Discrepancy identified in morning audit',
        severity: 'Warning',
        action: 'Initiate physical audit review with store manager',
        status: 'Active'
      },
      {
        id: 'INV-304',
        title: 'Cold-Chain Transit Telemetry Battery Warning (14%)',
        sku: 'MULTI-VACCINES',
        hub: 'Transit Van #KA-01-MJ-8812 (Bengaluru -> Hyd)',
        stock: '320 vaccine vials (Temp: +4.2°C)',
        burn: 'Estimated 45m battery life remaining',
        severity: 'Critical',
        action: 'Reroute to Kurnool cold-storage swap node',
        status: 'Active'
      },
      {
        id: 'INV-305',
        title: 'Slow-Moving Stock Capital Trap: Zenve Dog Raincoats',
        sku: 'ZV-FASH-RAIN-L',
        hub: 'Delhi NCR Warehouse',
        stock: '210 units (DSI: 260 days)',
        burn: '₹2,73,000 working capital locked',
        severity: 'Info',
        action: 'Bundle with monsoon grooming consultation packages',
        status: 'Active'
      }
    ],

    // 4. Payment Alerts
    payment: [
      {
        id: 'PAY-401',
        title: 'Razorpay UPI Intent Failure Rate Surge (4.8%)',
        gateway: 'Razorpay Enterprise Production',
        impact: '₹2,64,000 dropped checkout transactions over 30m',
        cause: 'SBI & HDFC bank handle downtime on NPCI switch',
        severity: 'Critical',
        time: '15m ago',
        status: 'Active'
      },
      {
        id: 'PAY-402',
        title: 'B2B Overdue Receivable > 30 Days: PetCare Clinic Network',
        gateway: 'Corporate Net Banking / Invoicing',
        impact: '₹1,20,000 outstanding (Invoice #INV-2024-8841)',
        cause: 'Credit cycle passed 30 days without payment confirmation',
        severity: 'Warning',
        time: '2h ago',
        status: 'Active'
      },
      {
        id: 'PAY-403',
        title: 'Instant Refund Buffer Depletion: ₹14,200 Remaining',
        gateway: 'Cashfree Instant Payouts',
        impact: 'Risk of failed return refunds for 60-min express deliveries',
        cause: 'Daily merchant float auto-top-up delayed by bank clearance',
        severity: 'Warning',
        time: '3h ago',
        status: 'Active'
      },
      {
        id: 'PAY-404',
        title: 'Veterinary Doctor Weekly Commission Payout Hold',
        gateway: 'Direct Bank NEFT Batch #NEFT-2024-41',
        impact: '₹3,84,000 for 14 consulting veterinarians',
        cause: 'Requires CFO biometric approval prior to 5:00 PM cutoff',
        severity: 'Critical',
        time: '4h ago',
        status: 'Active'
      },
      {
        id: 'PAY-405',
        title: 'High Chargeback / Fraud Dispute Flag on International Card',
        gateway: 'Stripe Global (Expat Pet Relocation Orders)',
        impact: '₹34,500 across 2 orders with delivery to Bangalore airport',
        cause: 'Mismatch between billing address and Indian SIM card IP',
        severity: 'Info',
        time: '7h ago',
        status: 'Active'
      }
    ],

    // 5. Order Alerts
    order: [
      {
        id: 'ORD-501',
        title: 'Veterinary Prescription Verification Queue Backlog (>30m)',
        category: 'Pharmacy Compliance',
        metric: '28 Prescriptions pending clinical approval',
        impact: 'Risk of 60-min delivery breach for Schedule-H antibiotics',
        hub: 'Central Telehealth Pharmacy Station',
        severity: 'Critical',
        time: '14m ago',
        status: 'Active'
      },
      {
        id: 'ORD-502',
        title: 'Micro-Hub Packing Station Congestion: 19 Orders Exceeding 20m SLA',
        category: 'Fulfillment Operations',
        metric: 'Average packing time surged to 32 mins',
        impact: 'Riders waiting outside Koramangala Hub; idle dwell time high',
        hub: 'Koramangala 60-Min Hub',
        severity: 'Warning',
        time: '28m ago',
        status: 'Active'
      },
      {
        id: 'ORD-503',
        title: 'Abnormal Cancellation Surge in Indiranagar Node (12 orders/hr)',
        category: 'Customer Retention',
        metric: 'Cancellation rate reached 8.4% (Threshold: 3.0%)',
        impact: '₹18,400 GMV loss; customer complaints regarding rider delays',
        hub: 'Indiranagar Urban Node',
        severity: 'Warning',
        time: '45m ago',
        status: 'Active'
      },
      {
        id: 'ORD-504',
        title: 'Inefficient Split-Shipment Anomaly: Order #ZV-99481',
        category: 'Logistics Optimization',
        metric: 'Order split across 3 separate warehouses',
        impact: 'Excess delivery fee burn of ₹380 and customer receiving 3 distinct packages',
        hub: 'Multi-Warehouse Allocation Engine',
        severity: 'Info',
        time: '1h ago',
        status: 'Active'
      },
      {
        id: 'ORD-505',
        title: 'VIP Gold Pet Parent Post-Op Meds Order Delayed',
        category: 'VIP Customer Experience',
        metric: 'Order #ZV-98124 delayed by 38 mins (Puppy post-op analgesics)',
        impact: 'Customer Priya Nair (LTV: ₹1,42,000) reached out to concierge',
        hub: 'Bengaluru Flagship Hospital Dispatch',
        severity: 'Critical',
        time: '6m ago',
        status: 'Active'
      }
    ],

    // 6. Delivery Alerts
    delivery: [
      {
        id: 'DEL-601',
        title: '60-Minute SLA Breach Hazard: Order #ZV-98214 (Koramangala -> HSR)',
        rider: 'Rider #R-104 (Karthik M.)',
        zone: 'Bengaluru South (Koramangala / HSR)',
        elapsed: '52 mins elapsed · 8 mins to breach',
        cause: 'Heavy monsoon traffic on Silk Board flyover junction',
        severity: 'Critical',
        time: '4m ago',
        status: 'Active'
      },
      {
        id: 'DEL-602',
        title: 'Rider Vehicle Breakdown: Flat Tire on EV Scooter (Ola S1)',
        rider: 'Rider #R-208 (Suresh Patil)',
        zone: 'Mumbai West (Bandra Linking Rd)',
        elapsed: '2 active urgent antibiotic deliveries in parcel bag',
        cause: 'Nail puncture reported via Rider mobile app telemetry',
        severity: 'Critical',
        time: '12m ago',
        status: 'Active'
      },
      {
        id: 'DEL-603',
        title: 'Dark-Store Unassigned Orders Accumulation: 14 Orders Idle > 10m',
        rider: 'Fleet Allocation Engine',
        zone: 'Whitefield Micro-Hub Dark Store',
        elapsed: 'Longest idle: 16 mins (Dispatch SLA: 4 mins)',
        cause: 'Sudden spike in evening dinner pet food deliveries',
        severity: 'Warning',
        time: '20m ago',
        status: 'Active'
      },
      {
        id: 'DEL-604',
        title: 'Pharmaceutical Cold-Chain Corridor Geofence Deviation',
        rider: 'Van #KA-04-EV-9912 (Cold Carrier)',
        zone: 'Electronic City Express Highway',
        elapsed: '2.4 km outside designated route (Detour)',
        cause: 'Road maintenance detour taken without navigation sync',
        severity: 'Warning',
        time: '34m ago',
        status: 'Active'
      },
      {
        id: 'DEL-605',
        title: 'Spillover 3PL Fleet Surge Pricing Active: Shadowfax (+₹45/drop)',
        rider: 'Shadowfax 3PL Connector',
        zone: 'Mumbai Andheri West Zone',
        elapsed: '38 orders dispatched via spillover today (+₹1,710)',
        cause: 'Dedicated Zenve EV fleet fully booked on grooming pickups',
        severity: 'Info',
        time: '1h ago',
        status: 'Active'
      }
    ],

    // 7. Finance Alerts
    finance: [
      {
        id: 'FIN-701',
        title: 'EBITDA Margin Compression Alert: October MTD at 14.6%',
        category: 'Profitability & Margin',
        metric: '14.6% vs Target 18.0% (-3.4% deficit)',
        impact: 'Operating profit compressed by ₹1,76,000 MTD',
        cause: 'Surge in digital ad spend (+22%) and 3PL spillover delivery charges',
        severity: 'Critical',
        time: '1h ago',
        status: 'Active'
      },
      {
        id: 'FIN-702',
        title: 'Unallocated Bank Inflow: ₹4,85,000 in HDFC Main Corporate Account',
        category: 'Cash & Banking Reconciliation',
        metric: '₹4,85,000 without matching Customer/Partner Invoice ID',
        impact: 'Bank reconciliation suspended; cannot close weekly cash ledger',
        cause: 'B2B institutional client deposited RTGS without referencing PO number',
        severity: 'Warning',
        time: '3h ago',
        status: 'Active'
      },
      {
        id: 'FIN-703',
        title: 'Vendor Payables Aging > 45 Days: Royal Canin India Pvt Ltd',
        category: 'Accounts Payable',
        metric: '₹6,80,000 due in 24 hours (PO #PO-2024-0312)',
        impact: 'Risk of vendor credit hold on critical dog food deliveries',
        cause: 'Pending GRN quantity verification by Bhiwandi receiving manager',
        severity: 'Critical',
        time: '5h ago',
        status: 'Active'
      },
      {
        id: 'FIN-704',
        title: 'GST GSTR-3B Tax Filing Deadline: 3 Days Remaining',
        category: 'Statutory Compliance',
        metric: 'Input Tax Credit (ITC) reconciliation at 88%',
        impact: 'Late fee & penalty risk across Karnataka & Maharashtra GSTINs',
        cause: '14 pharmaceutical supplier invoices missing on GST portal 2B',
        severity: 'Warning',
        time: '6h ago',
        status: 'Active'
      },
      {
        id: 'FIN-705',
        title: 'Clinic Consumables OPEX Surge: Koramangala ICU (+18% Budget)',
        category: 'Departmental Budgeting',
        metric: 'Surgical suture & anesthesia consumption exceeded allocation',
        impact: '₹64,000 above approved October monthly OPEX cap',
        cause: 'Increased emergency orthopedic surgery volume over the weekend',
        severity: 'Info',
        time: '9h ago',
        status: 'Active'
      }
    ],

    // 8. HR Alerts
    hr: [
      {
        id: 'HR-801',
        title: 'ICU Night-Shift Veterinary Nurse Staffing Deficit (-2 Staff)',
        department: 'Clinical Inpatient & ICU',
        facility: 'Koramangala 24/7 Super-Specialty Hospital',
        metric: 'Only 3 nurses confirmed for 8 PM shift (Minimum Safe Ratio: 5)',
        impact: 'Critical patient-to-nurse ratio breached for post-op ICU ward',
        severity: 'Critical',
        time: '25m ago',
        status: 'Active'
      },
      {
        id: 'HR-802',
        title: 'Emergency On-Call Veterinary Surgeon Absence',
        department: 'Veterinary Surgery & Trauma',
        facility: 'Mumbai Surgical Center (Bandra West)',
        metric: 'Dr. Rahul Mehta reported acute illness; no locum doctor assigned',
        impact: 'Trauma intake compromised between 10:00 PM and 6:00 AM',
        severity: 'Critical',
        time: '42m ago',
        status: 'Active'
      },
      {
        id: 'HR-803',
        title: 'Sales Pacing Under-Performance: Diagnostics & Lab Team (74%)',
        department: 'B2B & Diagnostics Field Sales',
        facility: 'All India Field Force (5 Reps lagging)',
        metric: 'Pacing at 74% attainment with only 5 days remaining in month',
        impact: 'Risk of missing quarterly lab testing revenue target by ₹4.2L',
        severity: 'Warning',
        time: '2h ago',
        status: 'Active'
      },
      {
        id: 'HR-804',
        title: 'Veterinary Council of India (VCI) License Expiry Warning',
        department: 'Clinical Credentialing & Governance',
        facility: 'Delhi NCR Clinic (Dr. Aisha Khan)',
        metric: 'State veterinary practice license renewal due in 15 days',
        impact: 'Statutory compliance violation if practicing without renewed certificate',
        severity: 'Warning',
        time: '4h ago',
        status: 'Active'
      },
      {
        id: 'HR-805',
        title: 'Excessive Overtime Alert: Koramangala Dark Store Fulfillment Crew',
        department: 'Supply Chain & Warehousing',
        facility: 'Koramangala Fulfillment Hub',
        metric: '6 pack associates exceeded 24 hours cumulative weekly overtime',
        impact: 'Burnout risk, fatigue errors, and statutory labor cap breach',
        severity: 'Info',
        time: '6h ago',
        status: 'Active'
      }
    ],

    // 9. System Alerts
    system: [
      {
        id: 'SYS-901',
        title: 'FastAPI Gateway Latency Spike on /api/v1/orders/create',
        service: 'FastAPI Order Routing Gateway (Uvicorn Workers)',
        metric: 'P99 Latency: 640ms (Baseline: 45ms)',
        impact: 'Mobile app checkout spinner showing 1.2s delay for customers',
        severity: 'Critical',
        time: '18m ago',
        status: 'Active'
      },
      {
        id: 'SYS-902',
        title: 'SQLite Database Write-Lock Contention on zenvebi.db',
        service: 'Core Persistence Layer (SQLite WAL Mode)',
        metric: 'Write Lock Queue: 14 concurrent transactions waiting',
        impact: 'Telemetry ingestion from cold-chain sensors delayed by 8 seconds',
        severity: 'Critical',
        time: '29m ago',
        status: 'Active'
      },
      {
        id: 'SYS-903',
        title: 'Google Gemini AI Token Quota Consumption Warning (88%)',
        service: 'Zenve AI Revenue Intelligence & Executive Briefing Engine',
        metric: 'Per-minute token consumption at 88% of Tier-3 ceiling',
        impact: 'Automated revenue anomaly analysis may throttle if traffic surges',
        severity: 'Warning',
        time: '45m ago',
        status: 'Active'
      },
      {
        id: 'SYS-904',
        title: 'ERP Financial Sync Delay: Tally Prime Connector (2h 15m lag)',
        service: 'Tally Prime / Zoho Books Gateway',
        metric: 'Last sync: 2 hours 15 minutes ago (Expected interval: 30 mins)',
        impact: 'P&L and Accounts Receivable balances not real-time in Executive view',
        severity: 'Warning',
        time: '1h ago',
        status: 'Active'
      },
      {
        id: 'SYS-905',
        title: 'Session Memory Cache Utilization Above Warning Threshold (82%)',
        service: 'In-Memory Cache & WebSocket Feed Node',
        metric: 'Memory usage: 3.28 GB / 4.00 GB allocation',
        impact: 'Garbage collection cycles causing micro-jitters on live dispatch board',
        severity: 'Info',
        time: '2h ago',
        status: 'Active'
      }
    ],

    // 10. Alert Rules
    rules: [
      {
        id: 'AR-101',
        name: 'Cold-Chain Vaccine Temp Excursion',
        category: 'Inventory & Clinical',
        condition: 'Temperature > +8.0°C for > 3 minutes',
        severity: 'Critical (Sev-1)',
        channels: ['WhatsApp', 'SMS', 'Voice Call'],
        escalation: '5 mins to CMO & Logistics Head',
        cooldown: '15 mins',
        enabled: true
      },
      {
        id: 'AR-102',
        name: 'Low Inventory Reorder Threshold',
        category: 'Inventory',
        condition: 'Current Units <= Safety Stock Threshold',
        severity: 'Warning (Sev-2)',
        channels: ['Slack #inventory-ops', 'Email', 'In-App'],
        escalation: '24 hours to Procurement Lead',
        cooldown: '6 hours',
        enabled: true
      },
      {
        id: 'AR-103',
        name: 'B2B Invoice Overdue (> 30 Days)',
        category: 'Payment & Finance',
        condition: 'Unpaid aging > 30 days & Amount >= ₹50,000',
        severity: 'Warning (Sev-2)',
        channels: ['Automated WhatsApp Dunning', 'Email'],
        escalation: '48 hours to Credit Controller',
        cooldown: '3 days',
        enabled: true
      },
      {
        id: 'AR-104',
        name: '60-Minute Express Delivery SLA Hazard',
        category: 'Logistics',
        condition: 'Elapsed Time > 45 mins & Distance > 2 km',
        severity: 'Critical (Sev-1)',
        channels: ['Rider Terminal Audio', 'SMS', 'Slack #fleet-dispatch'],
        escalation: '10 mins to Hub Dispatch Lead',
        cooldown: '10 mins',
        enabled: true
      },
      {
        id: 'AR-105',
        name: 'Veterinary Telemedicine Response Delay',
        category: 'Clinical',
        condition: 'Patient Emergency Queue Wait > 4 minutes',
        severity: 'Critical (Sev-1)',
        channels: ['Push Broadcast to All Duty Vets', 'WhatsApp Alert'],
        escalation: '3 mins to Medical Director',
        cooldown: '5 mins',
        enabled: true
      },
      {
        id: 'AR-106',
        name: 'Payment Gateway Failure Rate Spike',
        category: 'Payment & Gateways',
        condition: 'Checkout UPI/Card Failure > 3% in rolling 10m',
        severity: 'Critical (Sev-1)',
        channels: ['Slack #devops-critical', 'SMS PagerDuty', 'Web Push'],
        escalation: 'Auto-reroutes traffic to Cashfree backup',
        cooldown: '30 mins',
        enabled: true
      },
      {
        id: 'AR-107',
        name: 'Prescription Verification Queue Overload',
        category: 'Pharmacy',
        condition: 'Pending Rx Verification Queue > 15 orders',
        severity: 'Warning (Sev-2)',
        channels: ['Pharmacist Workstation Bell', 'Slack #pharma-ops'],
        escalation: '15 mins to Chief Pharmacist',
        cooldown: '30 mins',
        enabled: true
      },
      {
        id: 'AR-108',
        name: 'Daily Revenue Pacing Deficit',
        category: 'Revenue & Sales',
        condition: 'GMV at 6 PM is < 85% of diurnal target',
        severity: 'Info (Sev-3)',
        channels: ['Email Executive Digest', 'Slack #revenue-pulse'],
        escalation: 'End-of-day briefing to Commercial Director',
        cooldown: '12 hours',
        enabled: false
      }
    ],

    // 11. Notification Center
    notifs: [
      {
        id: 'NOTIF-901',
        title: 'Emergency P1: Freezer #3 Vaccine Temperature (+8.6°C)',
        channel: 'WhatsApp & SMS',
        recipient: 'Sneha Patel (Cold-Chain Head)',
        time: '12m ago',
        read: false,
        severity: 'Critical',
        body: 'Temperature threshold exceeded in Koramangala Central Depot. 480 doses Zoetis Vanguard at immediate risk.',
        status: 'Delivered (Read by User)'
      },
      {
        id: 'NOTIF-902',
        title: '60-Min Express ETA Warning: Order #ZV-98214',
        channel: 'Rider Push & SMS',
        recipient: 'Rider Karthik M. & Customer Priya Nair',
        time: '18m ago',
        read: false,
        severity: 'Warning',
        body: 'Order elapsed time 52 mins. Silk Board flyover rain slowdown. Live GPS link sent to customer phone.',
        status: 'Delivered'
      },
      {
        id: 'NOTIF-903',
        title: 'Prescription Verification Required (28 orders queued)',
        channel: 'In-App & Slack #pharma-ops',
        recipient: 'Clinical Duty Pharmacists',
        time: '34m ago',
        read: true,
        severity: 'Warning',
        body: 'Peak order intake has created a 35-minute verification queue. Schedule-H antibiotic verification pending.',
        status: 'Acknowledged'
      },
      {
        id: 'NOTIF-904',
        title: 'Razorpay UPI Webhook Degradation (Error Rate 28.4%)',
        channel: 'Slack #devops-critical',
        recipient: 'Arjun Nair & DevOps On-Call',
        time: '48m ago',
        read: true,
        severity: 'Critical',
        body: '42 refund webhooks failed due to NPCI switch timeout. Automatic fallback to Cashfree queue engaged.',
        status: 'Resolved'
      },
      {
        id: 'NOTIF-905',
        title: 'B2B Invoice Overdue Notice: PetCare Clinic Network',
        channel: 'Email & WhatsApp Dunning',
        recipient: 'Dr. Ramesh Rao (Clinic Owner)',
        time: '2h ago',
        read: false,
        severity: 'Warning',
        body: 'Invoice #INV-2024-8841 for ₹1,20,000 has crossed 30 days. Auto-payment link generated.',
        status: 'Delivered'
      },
      {
        id: 'NOTIF-906',
        title: 'Low Stock Auto-Replenishment Triggered: Bravecto Chewables',
        channel: 'Email PO',
        recipient: 'Procurement & Boehringer Ingelheim Rep',
        time: '4h ago',
        read: true,
        severity: 'Info',
        body: 'Stock dropped below 40 units in Indiranagar dark store. Automated PO #PO-8812 sent for 100 units.',
        status: 'Delivered (PO Confirmed)'
      },
      {
        id: 'NOTIF-907',
        title: 'Executive Daily Revenue Pacing Briefing Ready',
        channel: 'In-App Feed',
        recipient: 'Executive Leadership',
        time: '6h ago',
        read: true,
        severity: 'Info',
        body: 'Today GMV pacing at ₹28.4L (94.2% of target). Top category: Pet Nutrition (34%).',
        status: 'Delivered'
      }
    ]
  };

  var root = null;

  /* ── Helpers ─────────────────────────────────────────────────────── */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function showToast(msg) {
    var old = document.querySelector('.zalt-toast');
    if (old) old.remove();
    var toast = document.createElement('div');
    toast.className = 'zalt-toast';
    toast.innerHTML = '<span>⚡</span> <span>' + esc(msg) + '</span>';
    document.body.appendChild(toast);
    setTimeout(function () {
      toast.style.transition = 'opacity 0.3s ease';
      toast.style.opacity = '0';
      setTimeout(function () { if (toast.parentNode) toast.remove(); }, 300);
    }, 2800);
  }

  /* ── Tab Matching from Text or Hash ──────────────────────────────── */
  function tabFromText(text) {
    if (!text) return null;
    var s = text.trim().toLowerCase();
    if (s.indexOf('pharmacy') >= 0 || s.indexOf('clinic') >= 0 || s.indexOf('hospital') >= 0) return null;
    if (s.indexOf('critical alert') >= 0 || s === 'critical') return 'critical';
    if (s.indexOf('revenue alert') >= 0 || s === 'revenue alerts') return 'revenue';
    if (s.indexOf('inventory alert') >= 0 || s === 'inventory alerts') return 'inventory';
    if (s.indexOf('payment alert') >= 0 || s === 'payment alerts') return 'payment';
    if (s.indexOf('order alert') >= 0 || s === 'order alerts') return 'order';
    if (s.indexOf('delivery alert') >= 0 || s === 'delivery alerts') return 'delivery';
    if (s.indexOf('finance alert') >= 0 || s === 'finance alerts') return 'finance';
    if (s.indexOf('hr alert') >= 0 || s === 'hr alerts') return 'hr';
    if (s.indexOf('system alert') >= 0 || s === 'system alerts') return 'system';
    if (s.indexOf('alert rule') >= 0 || s === 'rules' || s === 'alert rules') return 'rules';
    if (s.indexOf('notification center') >= 0 || s === 'notification' || s === 'notifications' || s === 'notification settings') return 'notifs';
    if (s === 'alerts & notifications' || s === 'alerts and notifications' || s === 'alerts' || s === 'alert center') return 'critical';
    return null;
  }

  function tabFromHash(hash) {
    if (!hash) return null;
    var h = (hash.startsWith('#') ? hash.slice(1) : hash).toLowerCase();
    if (h.indexOf('pharmacy') >= 0 || h.indexOf('clinic') >= 0 || h.indexOf('hospital') >= 0) return null;
    if (h === 'critical-alerts' || h === 'critical') return 'critical';
    if (h === 'revenue-alerts') return 'revenue';
    if (h === 'inventory-alerts') return 'inventory';
    if (h === 'payment-alerts') return 'payment';
    if (h === 'order-alerts') return 'order';
    if (h === 'delivery-alerts') return 'delivery';
    if (h === 'finance-alerts') return 'finance';
    if (h === 'hr-alerts') return 'hr';
    if (h === 'system-alerts') return 'system';
    if (h === 'alert-rules' || h === 'rules') return 'rules';
    if (h === 'notification-center' || h === 'notifications' || h === 'notifs') return 'notifs';
    if (h === 'alerts') return 'critical';
    return null;
  }

  function hashFromTab(tab) {
    var mod = MODULES.find(function (m) { return m.id === tab; });
    return mod ? mod.hash : '#critical-alerts';
  }

  /* ── Shell Renderer ──────────────────────────────────────────────── */
  function renderShell() {
    if (!root) {
      root = document.createElement('div');
      root.id = 'zalt-root';
      document.body.appendChild(root);
    }

    var curMod = MODULES.find(function (m) { return m.id === S.activeTab; }) || MODULES[0];

    // Compute live active badge counters
    var criticalCount = S.critical.filter(function (a) { return a.status === 'Active'; }).length;
    var unreadNotifs = S.notifs.filter(function (n) { return !n.read; }).length;

    var subnavHtml = MODULES.map(function (it) {
      var activeCls = (it.id === S.activeTab) ? ' active' : '';
      var badgeCls = it.critical ? ' critical' : '';
      var badgeText = it.badge;
      if (it.id === 'critical') badgeText = criticalCount + ' Sev-1';
      if (it.id === 'notifs') badgeText = unreadNotifs + ' Unread';

      return '<button type="button" class="zalt-tab-chip' + activeCls + '" data-alt-tab="' + it.id + '" id="zalt-chip-' + it.id + '">' +
        '<span>' + it.icon + '</span>' +
        '<span>' + esc(it.label) + '</span>' +
        '<span class="zalt-tab-chip-badge' + badgeCls + '">' + esc(badgeText) + '</span>' +
        '</button>';
    }).join('');

    root.innerHTML = [
      '<!-- Top Executive Header -->',
      '<header class="zalt-header">',
        '<div class="zalt-header-left">',
          '<div class="zalt-brand-badge pulse">🔔</div>',
          '<div class="zalt-title-group">',
            '<div class="zalt-title-row">',
              '<h2 class="zalt-main-title">Alerts & Notifications Command Center</h2>',
              '<div class="zalt-status-pill">',
                '<span class="zalt-status-pill-dot"></span>',
                '<span>' + criticalCount + ' Sev-1 Active · Live Paging</span>',
              '</div>',
            '</div>',
            '<div class="zalt-breadcrumbs">',
              '<span>Zenve Intelligence</span>',
              '<span>/</span>',
              '<span>Alerts & Notifications</span>',
              '<span>/</span>',
              '<span class="active">' + esc(curMod.label) + '</span>',
            '</div>',
          '</div>',
        '</div>',
        '<div class="zalt-header-actions">',
          '<button type="button" class="zalt-btn zalt-btn-danger" id="zalt-emergency-broadcast-btn">',
            '<span>📢</span> Emergency Broadcast',
          '</button>',
          '<button type="button" class="zalt-btn zalt-btn-outline" id="zalt-ack-all-btn">',
            '<span>✓</span> Acknowledge All',
          '</button>',
          '<button type="button" class="zalt-btn zalt-btn-outline" id="zalt-toggle-chime-btn" title="Toggle Audio Alert Chime">',
            '<span>' + (S.chimesEnabled ? '🔊 Chime On' : '🔇 Chime Muted') + '</span>',
          '</button>',
          '<button type="button" class="zalt-close-btn" id="zalt-close-btn" title="Close (Esc)">✕</button>',
        '</div>',
      '</header>',

      '<!-- Sticky Horizontal Subnav Bar (11 Chips) -->',
      '<nav class="zalt-subnav-bar" id="zalt-subnav">',
        subnavHtml,
      '</nav>',

      '<!-- Full-Width Content Canvas -->',
      '<div class="zalt-body" id="zalt-pane">',
        renderTabContent(S.activeTab),
      '</div>'
    ].join('');

    wireEvents();
  }

  /* ── Tab Content Dispatcher ──────────────────────────────────────── */
  function renderTabContent(tab) {
    switch (tab) {
      case 'critical':  return renderCritical();
      case 'revenue':   return renderRevenue();
      case 'inventory': return renderInventory();
      case 'payment':   return renderPayment();
      case 'order':     return renderOrder();
      case 'delivery':  return renderDelivery();
      case 'finance':   return renderFinance();
      case 'hr':        return renderHR();
      case 'system':    return renderSystem();
      case 'rules':     return renderRules();
      case 'notifs':    return renderNotifs();
      default:          return renderCritical();
    }
  }

  /* ── 1. Critical Alerts Tab ──────────────────────────────────────── */
  function renderCritical() {
    var items = S.critical.map(function (a) {
      var isResolved = a.status === 'Resolved';
      var itemClass = isResolved ? 'zalt-alert-item resolved' : 'zalt-alert-item sev-1';
      var badgeHtml = isResolved
        ? '<span class="zalt-badge-resolved">Resolved</span>'
        : '<span class="zalt-badge-sev1">Sev-1 Critical</span>';

      return '<div class="' + itemClass + '" id="crit-item-' + a.id + '">' +
        '<div class="zalt-alert-top">' +
          '<div>' +
            '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">' +
              '<span class="zalt-alert-id-tag">' + a.id + '</span>' +
              '<span class="zalt-alert-title">' + esc(a.title) + '</span>' +
              badgeHtml +
            '</div>' +
            '<div class="zalt-alert-meta">' +
              'Facility: <strong>' + esc(a.hub) + '</strong> · Lead: <strong>' + esc(a.lead) + '</strong>' +
            '</div>' +
          '</div>' +
          '<div style="text-align:right;">' +
            '<div style="font-size:12px;font-weight:700;color:#ef4444;">' + esc(a.slaCountdown) + '</div>' +
            '<div style="font-size:11px;color:#64748b;">Triggered ' + esc(a.time) + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="zalt-alert-details">' +
          '<div><span style="color:#64748b;">Sensor Telemetry:</span> <strong style="color:#b91c1c;">' + esc(a.metric) + '</strong></div>' +
          '<div><span style="color:#64748b;">Clinical Impact:</span> <strong>' + esc(a.impact) + '</strong></div>' +
          '<div style="grid-column:1/-1;"><span style="color:#64748b;">Current Action:</span> <span style="color:#0284c7;">' + esc(a.action) + '</span></div>' +
        '</div>' +
        (!isResolved ? (
          '<div class="zalt-alert-actions">' +
            '<button type="button" class="zalt-btn zalt-btn-danger" data-alt-action="page-lead" data-id="' + a.id + '">Page On-Call Specialist</button>' +
            '<button type="button" class="zalt-btn zalt-btn-primary" data-alt-action="resolve-critical" data-id="' + a.id + '">✓ Acknowledge & Mitigate</button>' +
          '</div>'
        ) : '') +
      '</div>';
    }).join('');

    return [
      '<div class="zalt-kpi-grid">',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">Active Sev-1 Incidents</span><span class="zalt-kpi-icon">🚨</span></div>',
          '<div class="zalt-kpi-value">' + S.critical.filter(function (a) { return a.status === 'Active'; }).length + ' Active</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill danger">Critical SLA: 15m</span><span class="zalt-kpi-subtext">Immediate paging</span></div>',
        '</div>',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">Financial Value at Risk</span><span class="zalt-kpi-icon">🛡️</span></div>',
          '<div class="zalt-kpi-value">₹10.48 Lakhs</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill warning">Cold-Chain + UPI</span><span class="zalt-kpi-subtext">Vaccines & refunds</span></div>',
        '</div>',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">Telemetry MTTD</span><span class="zalt-kpi-icon">⏱️</span></div>',
          '<div class="zalt-kpi-value">1.8 Mins</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill success">92% Automated</span><span class="zalt-kpi-subtext">IoT sensor feed</span></div>',
        '</div>',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">On-Call ICU Specialists</span><span class="zalt-kpi-icon">👨‍⚕️</span></div>',
          '<div class="zalt-kpi-value">8 Active</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill success">100% Coverage</span><span class="zalt-kpi-subtext">6 Metro Hospitals</span></div>',
        '</div>',
      '</div>',

      '<div class="zalt-card">',
        '<div class="zalt-card-header">',
          '<div>',
            '<h3 class="zalt-card-title"><span>🚨</span> Real-Time Sev-1 Emergency Escalation Stream</h3>',
            '<p class="zalt-card-desc">Sev-1 triggers invoke automated multi-channel escalation every 5 minutes until acknowledged by incident owner.</p>',
          '</div>',
          '<span class="zalt-badge-sev1" style="font-size:11px;">P1 ESCALATION WINDOW: 15 MINS</span>',
        '</div>',
        '<div class="zalt-stream-list">' + items + '</div>',
      '</div>'
    ].join('');
  }

  /* ── 2. Revenue Alerts Tab ───────────────────────────────────────── */
  function renderRevenue() {
    var items = S.revenue.map(function (a) {
      var isResolved = a.status === 'Resolved';
      var itemClass = isResolved ? 'zalt-alert-item resolved' : 'zalt-alert-item sev-2';
      var badgeHtml = isResolved ? '<span class="zalt-badge-resolved">Mitigated</span>' : '<span class="zalt-badge-sev2">' + esc(a.severity) + '</span>';

      return '<div class="' + itemClass + '">' +
        '<div class="zalt-alert-top">' +
          '<div>' +
            '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">' +
              '<span class="zalt-alert-id-tag">' + a.id + '</span>' +
              '<span class="zalt-alert-title">' + esc(a.title) + '</span>' +
              badgeHtml +
            '</div>' +
            '<div class="zalt-alert-meta">Channel: <strong>' + esc(a.channel) + '</strong> · Trigger: <span style="color:#b91c1c;">' + esc(a.trigger) + '</span></div>' +
          '</div>' +
          '<div style="text-align:right;">' +
            '<div style="font-size:12px;font-weight:700;color:#d97706;">' + esc(a.impact) + '</div>' +
            '<div style="font-size:11px;color:#64748b;">Triggered ' + esc(a.time) + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="zalt-alert-details">' +
          '<div style="grid-column:1/-1;"><span style="color:#64748b;">Root Cause Analysis:</span> <strong>' + esc(a.cause) + '</strong></div>' +
        '</div>' +
        (!isResolved ? (
          '<div class="zalt-alert-actions">' +
            '<button type="button" class="zalt-btn zalt-btn-primary" data-alt-action="resolve-revenue" data-id="' + a.id + '">Deploy Commercial Mitigation</button>' +
            '<button type="button" class="zalt-btn zalt-btn-outline" data-alt-action="ack-revenue" data-id="' + a.id + '">Acknowledge</button>' +
          '</div>'
        ) : '') +
      '</div>';
    }).join('');

    return [
      '<div class="zalt-kpi-grid">',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">Revenue at Risk</span><span class="zalt-kpi-icon">📉</span></div>',
          '<div class="zalt-kpi-value">₹14.88 Lakhs</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill danger">4 Active Warnings</span><span class="zalt-kpi-subtext">GMV + Returns</span></div>',
        '</div>',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">Pacing Gap vs Target</span><span class="zalt-kpi-icon">🎯</span></div>',
          '<div class="zalt-kpi-value">-4.8% MTD</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill warning">Delhi & Chennai</span><span class="zalt-kpi-subtext">Weather affected</span></div>',
        '</div>',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">Bravecto Return Rate</span><span class="zalt-kpi-icon">🔄</span></div>',
          '<div class="zalt-kpi-value">5.8%</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill danger">Threshold: 2.5%</span><span class="zalt-kpi-subtext">Weight mismatch</span></div>',
        '</div>',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">B2B High-Value Accounts</span><span class="zalt-kpi-icon">🏢</span></div>',
          '<div class="zalt-kpi-value">1 Account</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill info">Infosys (₹8.4L)</span><span class="zalt-kpi-subtext">Renewal in 4 days</span></div>',
        '</div>',
      '</div>',

      '<div class="zalt-card">',
        '<div class="zalt-card-header">',
          '<div>',
            '<h3 class="zalt-card-title"><span>💼</span> Commercial Revenue Anomalies & Pacing Exceptions</h3>',
            '<p class="zalt-card-desc">Monitors GMV pacing, refund/return velocity, CAC anomalies, and high-value corporate subscription contracts.</p>',
          '</div>',
          '<button type="button" class="zalt-btn zalt-btn-primary" id="zalt-tune-targets-btn">Auto-Tune Seasonality Targets</button>',
        '</div>',
        '<div class="zalt-stream-list">' + items + '</div>',
      '</div>'
    ].join('');
  }

  /* ── 3. Inventory Alerts Tab ─────────────────────────────────────── */
  function renderInventory() {
    var items = S.inventory.map(function (a) {
      var isResolved = a.status === 'Resolved';
      var itemClass = isResolved ? 'zalt-alert-item resolved' : (a.severity === 'Critical' ? 'zalt-alert-item sev-1' : 'zalt-alert-item sev-2');

      return '<div class="' + itemClass + '">' +
        '<div class="zalt-alert-top">' +
          '<div>' +
            '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">' +
              '<span class="zalt-alert-id-tag">' + a.sku + '</span>' +
              '<span class="zalt-alert-title">' + esc(a.title) + '</span>' +
              (a.severity === 'Critical' ? '<span class="zalt-badge-sev1">Stockout Hazard</span>' : '<span class="zalt-badge-sev2">Reorder Alert</span>') +
            '</div>' +
            '<div class="zalt-alert-meta">Location: <strong>' + esc(a.hub) + '</strong> · Current Status: <strong>' + esc(a.stock) + '</strong></div>' +
          '</div>' +
          '<div style="text-align:right;">' +
            '<div style="font-size:12px;font-weight:700;color:#ef4444;">' + esc(a.burn) + '</div>' +
            '<div style="font-size:11px;color:#64748b;">Status: ' + esc(a.status) + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="zalt-alert-details">' +
          '<div style="grid-column:1/-1;"><span style="color:#64748b;">Recommended Supply Chain Action:</span> <strong style="color:#0284c7;">' + esc(a.action) + '</strong></div>' +
        '</div>' +
        (!isResolved ? (
          '<div class="zalt-alert-actions">' +
            '<button type="button" class="zalt-btn zalt-btn-primary" data-alt-action="resolve-inventory" data-id="' + a.id + '">Execute Stock Action</button>' +
            '<button type="button" class="zalt-btn zalt-btn-outline" data-alt-action="snooze-inventory" data-id="' + a.id + '">Snooze (4h)</button>' +
          '</div>'
        ) : '') +
      '</div>';
    }).join('');

    return [
      '<div class="zalt-kpi-grid">',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">SKUs Below Safety Stock</span><span class="zalt-kpi-icon">📦</span></div>',
          '<div class="zalt-kpi-value">14 SKUs</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill danger">2 Critical Stockouts</span><span class="zalt-kpi-subtext">Immediate PO required</span></div>',
        '</div>',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">Near-Expiry Capital (<30d)</span><span class="zalt-kpi-icon">⏳</span></div>',
          '<div class="zalt-kpi-value">₹3,42,000</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill warning">4 Batches</span><span class="zalt-kpi-subtext">Auto-discount applied</span></div>',
        '</div>',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">Cold-Chain Compliance</span><span class="zalt-kpi-icon">❄️</span></div>',
          '<div class="zalt-kpi-value">99.4%</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill success">+2°C to +8°C compliant</span><span class="zalt-kpi-subtext">Transit telemetry</span></div>',
        '</div>',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">Capital in Slow-Moving</span><span class="zalt-kpi-icon">🧊</span></div>',
          '<div class="zalt-kpi-value">₹5,18,000</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill info">DSI > 120 Days</span><span class="zalt-kpi-subtext">Monsoon apparel</span></div>',
        '</div>',
      '</div>',

      '<div class="zalt-card">',
        '<div class="zalt-card-header">',
          '<div>',
            '<h3 class="zalt-card-title"><span>📦</span> Live SKU Stock Triggers & Expiry Exceptions</h3>',
            '<p class="zalt-card-desc">Early-warning alerts for depleted warehouse safety buffers, near-expiry pharmaceutical batches, and negative cycle count variances.</p>',
          '</div>',
          '<button type="button" class="zalt-btn zalt-btn-primary" id="zalt-generate-pos-btn">Auto-Generate Purchase Orders</button>',
        '</div>',
        '<div class="zalt-stream-list">' + items + '</div>',
      '</div>'
    ].join('');
  }

  /* ── 4. Payment Alerts Tab ───────────────────────────────────────── */
  function renderPayment() {
    var items = S.payment.map(function (a) {
      var isResolved = a.status === 'Resolved';
      var itemClass = isResolved ? 'zalt-alert-item resolved' : (a.severity === 'Critical' ? 'zalt-alert-item sev-1' : 'zalt-alert-item sev-2');

      return '<div class="' + itemClass + '">' +
        '<div class="zalt-alert-top">' +
          '<div>' +
            '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">' +
              '<span class="zalt-alert-id-tag">' + a.id + '</span>' +
              '<span class="zalt-alert-title">' + esc(a.title) + '</span>' +
              (a.severity === 'Critical' ? '<span class="zalt-badge-sev1">Gateway Critical</span>' : '<span class="zalt-badge-sev2">Payment Warning</span>') +
            '</div>' +
            '<div class="zalt-alert-meta">Gateway / Pipe: <strong>' + esc(a.gateway) + '</strong> · Impact: <strong style="color:#b91c1c;">' + esc(a.impact) + '</strong></div>' +
          '</div>' +
          '<div style="text-align:right;">' +
            '<div style="font-size:11px;color:#64748b;">Triggered ' + esc(a.time) + '</div>' +
            '<div style="font-size:11px;font-weight:600;color:#0284c7;">' + esc(a.status) + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="zalt-alert-details">' +
          '<div style="grid-column:1/-1;"><span style="color:#64748b;">Technical Root Cause:</span> ' + esc(a.cause) + '</div>' +
        '</div>' +
        (!isResolved ? (
          '<div class="zalt-alert-actions">' +
            (a.id === 'PAY-401' ? '<button type="button" class="zalt-btn zalt-btn-danger" data-alt-action="failover-gateway" data-id="' + a.id + '">Instant Gateway Failover</button>' : '') +
            (a.id === 'PAY-402' ? '<button type="button" class="zalt-btn zalt-btn-primary" data-alt-action="dunning-whatsapp" data-id="' + a.id + '">Trigger WhatsApp Dunning</button>' : '') +
            (a.id === 'PAY-404' ? '<button type="button" class="zalt-btn zalt-btn-primary" data-alt-action="approve-vet-payout" data-id="' + a.id + '">Approve Vet Batch Payout</button>' : '') +
            '<button type="button" class="zalt-btn zalt-btn-outline" data-alt-action="resolve-payment" data-id="' + a.id + '">Acknowledge</button>' +
          '</div>'
        ) : '') +
      '</div>';
    }).join('');

    return [
      '<div class="zalt-kpi-grid">',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">Razorpay Gateway Uptime</span><span class="zalt-kpi-icon">⚡</span></div>',
          '<div class="zalt-kpi-value">95.2%</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill danger">4.8% Failure Rate</span><span class="zalt-kpi-subtext">UPI intent degraded</span></div>',
        '</div>',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">Overdue B2B Receivables</span><span class="zalt-kpi-icon">📑</span></div>',
          '<div class="zalt-kpi-value">₹1,20,000</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill warning">PetCare Network</span><span class="zalt-kpi-subtext">> 30 days overdue</span></div>',
        '</div>',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">Instant Refund Float</span><span class="zalt-kpi-icon">🏦</span></div>',
          '<div class="zalt-kpi-value">₹14,200</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill danger">Critically Low Float</span><span class="zalt-kpi-subtext">Requires ₹2L top-up</span></div>',
        '</div>',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">Pending Vet Commissions</span><span class="zalt-kpi-icon">👨‍⚕️</span></div>',
          '<div class="zalt-kpi-value">₹3,84,000</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill info">14 Doctors Pending</span><span class="zalt-kpi-subtext">Batch #NEFT-41</span></div>',
        '</div>',
      '</div>',

      '<div class="zalt-card">',
        '<div class="zalt-card-header">',
          '<div>',
            '<h3 class="zalt-card-title"><span>💳</span> Payment Gateway Disruptions & Collection Aging Alerts</h3>',
            '<p class="zalt-card-desc">Tracks checkout payment conversion, bank UPI intent failures, B2B clinical receivables aging, and doctor commission approvals.</p>',
          '</div>',
          '<button type="button" class="zalt-btn zalt-btn-danger" id="zalt-gateway-failover-btn">Failover Traffic to Cashfree</button>',
        '</div>',
        '<div class="zalt-stream-list">' + items + '</div>',
      '</div>'
    ].join('');
  }

  /* ── 5. Order Alerts Tab ─────────────────────────────────────────── */
  function renderOrder() {
    var items = S.order.map(function (a) {
      var isResolved = a.status === 'Resolved';
      var itemClass = isResolved ? 'zalt-alert-item resolved' : (a.severity === 'Critical' ? 'zalt-alert-item sev-1' : 'zalt-alert-item sev-2');

      return '<div class="' + itemClass + '">' +
        '<div class="zalt-alert-top">' +
          '<div>' +
            '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">' +
              '<span class="zalt-alert-id-tag">' + a.id + '</span>' +
              '<span class="zalt-alert-title">' + esc(a.title) + '</span>' +
              (a.severity === 'Critical' ? '<span class="zalt-badge-sev1">Order Bottleneck</span>' : '<span class="zalt-badge-sev2">Fulfillment Alert</span>') +
            '</div>' +
            '<div class="zalt-alert-meta">Category: <strong>' + esc(a.category) + '</strong> · Hub: <strong>' + esc(a.hub) + '</strong></div>' +
          '</div>' +
          '<div style="text-align:right;">' +
            '<div style="font-size:12px;font-weight:700;color:#ef4444;">' + esc(a.metric) + '</div>' +
            '<div style="font-size:11px;color:#64748b;">Triggered ' + esc(a.time) + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="zalt-alert-details">' +
          '<div style="grid-column:1/-1;"><span style="color:#64748b;">Operational Impact:</span> <strong>' + esc(a.impact) + '</strong></div>' +
        '</div>' +
        (!isResolved ? (
          '<div class="zalt-alert-actions">' +
            (a.id === 'ORD-501' ? '<button type="button" class="zalt-btn zalt-btn-primary" data-alt-action="assign-pharmacist" data-id="' + a.id + '">Assign Standby Pharmacist</button>' : '') +
            (a.id === 'ORD-505' ? '<button type="button" class="zalt-btn zalt-btn-danger" data-alt-action="expedite-vip" data-id="' + a.id + '">Expedite VIP Priority Courier</button>' : '') +
            '<button type="button" class="zalt-btn zalt-btn-outline" data-alt-action="resolve-order" data-id="' + a.id + '">Acknowledge</button>' +
          '</div>'
        ) : '') +
      '</div>';
    }).join('');

    return [
      '<div class="zalt-kpi-grid">',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">Pending Rx Sign-Offs</span><span class="zalt-kpi-icon">💊</span></div>',
          '<div class="zalt-kpi-value">28 Orders</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill danger">Queue > 30m</span><span class="zalt-kpi-subtext">Pharmacy SLA alert</span></div>',
        '</div>',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">Packing Station SLA</span><span class="zalt-kpi-icon">📦</span></div>',
          '<div class="zalt-kpi-value">82.4%</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill warning">19 Backlogged</span><span class="zalt-kpi-subtext">Koramangala Hub</span></div>',
        '</div>',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">Order Cancellation Rate</span><span class="zalt-kpi-icon">🚫</span></div>',
          '<div class="zalt-kpi-value">4.2%</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill warning">Indiranagar Node</span><span class="zalt-kpi-subtext">Normal is < 2.5%</span></div>',
        '</div>',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">VIP Concierge Escalations</span><span class="zalt-kpi-icon">⭐</span></div>',
          '<div class="zalt-kpi-value">1 Gold Tier</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill danger">Post-Op Sedatives</span><span class="zalt-kpi-subtext">Priya Nair</span></div>',
        '</div>',
      '</div>',

      '<div class="zalt-card">',
        '<div class="zalt-card-header">',
          '<div>',
            '<h3 class="zalt-card-title"><span>🚚</span> Live Order Processing Bottlenecks & Anomaly Feed</h3>',
            '<p class="zalt-card-desc">Identifies pharmacy prescription backlogs, packing station delays, cancellation spikes, and VIP customer order escalations.</p>',
          '</div>',
          '<button type="button" class="zalt-btn zalt-btn-danger" id="zalt-page-pharmacist-btn">Page Emergency Duty Pharmacist</button>',
        '</div>',
        '<div class="zalt-stream-list">' + items + '</div>',
      '</div>'
    ].join('');
  }

  /* ── 6. Delivery Alerts Tab ──────────────────────────────────────── */
  function renderDelivery() {
    var items = S.delivery.map(function (a) {
      var isResolved = a.status === 'Resolved';
      var itemClass = isResolved ? 'zalt-alert-item resolved' : (a.severity === 'Critical' ? 'zalt-alert-item sev-1' : 'zalt-alert-item sev-2');

      return '<div class="' + itemClass + '">' +
        '<div class="zalt-alert-top">' +
          '<div>' +
            '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">' +
              '<span class="zalt-alert-id-tag">' + a.id + '</span>' +
              '<span class="zalt-alert-title">' + esc(a.title) + '</span>' +
              (a.severity === 'Critical' ? '<span class="zalt-badge-sev1">SLA Hazard</span>' : '<span class="zalt-badge-sev2">Fleet Alert</span>') +
            '</div>' +
            '<div class="zalt-alert-meta">Assigned: <strong>' + esc(a.rider) + '</strong> · Zone: <strong>' + esc(a.zone) + '</strong></div>' +
          '</div>' +
          '<div style="text-align:right;">' +
            '<div style="font-size:12px;font-weight:700;color:#ef4444;">' + esc(a.elapsed) + '</div>' +
            '<div style="font-size:11px;color:#64748b;">Triggered ' + esc(a.time) + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="zalt-alert-details">' +
          '<div style="grid-column:1/-1;"><span style="color:#64748b;">Root Cause:</span> ' + esc(a.cause) + '</div>' +
        '</div>' +
        (!isResolved ? (
          '<div class="zalt-alert-actions">' +
            (a.id === 'DEL-601' ? '<button type="button" class="zalt-btn zalt-btn-danger" data-alt-action="call-rider" data-id="' + a.id + '">Call Rider & SMS Customer GPS</button>' : '') +
            (a.id === 'DEL-602' ? '<button type="button" class="zalt-btn zalt-btn-primary" data-alt-action="dispatch-intercept" data-id="' + a.id + '">Dispatch Intercept Rider</button>' : '') +
            '<button type="button" class="zalt-btn zalt-btn-outline" data-alt-action="resolve-delivery" data-id="' + a.id + '">Acknowledge</button>' +
          '</div>'
        ) : '') +
      '</div>';
    }).join('');

    return [
      '<div class="zalt-kpi-grid">',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">60-Min On-Time SLA</span><span class="zalt-kpi-icon">⚡</span></div>',
          '<div class="zalt-kpi-value">96.2%</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill success">+1.1% vs last week</span><span class="zalt-kpi-subtext">Target: 95.0%</span></div>',
        '</div>',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">At-Risk Deliveries (<10m)</span><span class="zalt-kpi-icon">⏱️</span></div>',
          '<div class="zalt-kpi-value">1 Order</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill danger">Order #ZV-98214</span><span class="zalt-kpi-subtext">HSR Sector 2</span></div>',
        '</div>',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">Active Fleet on Field</span><span class="zalt-kpi-icon">🛵</span></div>',
          '<div class="zalt-kpi-value">68 Riders</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill warning">1 Breakdown reported</span><span class="zalt-kpi-subtext">Ola S1 in Bandra</span></div>',
        '</div>',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">Avg Dark-Store Dwell</span><span class="zalt-kpi-icon">🏬</span></div>',
          '<div class="zalt-kpi-value">3.8 Mins</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill success">SLA: 4.0 Mins</span><span class="zalt-kpi-subtext">Dark store packaging</span></div>',
        '</div>',
      '</div>',

      '<div class="zalt-card">',
        '<div class="zalt-card-header">',
          '<div>',
            '<h3 class="zalt-card-title"><span>⚡</span> Live Fleet Logistics & 60-Minute SLA Watchlist</h3>',
            '<p class="zalt-card-desc">Tracks real-time rider countdowns, breakdown rescue dispatches, dark-store staging congestion, and cold-chain geofencing.</p>',
          '</div>',
          '<button type="button" class="zalt-btn zalt-btn-primary" id="zalt-opt-routes-btn">🧭 Optimize All Rider Routes</button>',
        '</div>',
        '<div class="zalt-stream-list">' + items + '</div>',
      '</div>'
    ].join('');
  }

  /* ── 7. Finance Alerts Tab ───────────────────────────────────────── */
  function renderFinance() {
    var items = S.finance.map(function (a) {
      var isResolved = a.status === 'Resolved';
      var itemClass = isResolved ? 'zalt-alert-item resolved' : (a.severity === 'Critical' ? 'zalt-alert-item sev-1' : 'zalt-alert-item sev-2');

      return '<div class="' + itemClass + '">' +
        '<div class="zalt-alert-top">' +
          '<div>' +
            '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">' +
              '<span class="zalt-alert-id-tag">' + a.id + '</span>' +
              '<span class="zalt-alert-title">' + esc(a.title) + '</span>' +
              (a.severity === 'Critical' ? '<span class="zalt-badge-sev1">Finance Critical</span>' : '<span class="zalt-badge-sev2">Compliance Warning</span>') +
            '</div>' +
            '<div class="zalt-alert-meta">Category: <strong>' + esc(a.category) + '</strong> · Metric: <strong style="color:#b91c1c;">' + esc(a.metric) + '</strong></div>' +
          '</div>' +
          '<div style="text-align:right;">' +
            '<div style="font-size:11px;color:#64748b;">Triggered ' + esc(a.time) + '</div>' +
            '<div style="font-size:11px;font-weight:600;color:#0284c7;">' + esc(a.status) + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="zalt-alert-details">' +
          '<div><span style="color:#64748b;">Financial Exposure:</span> <strong>' + esc(a.impact) + '</strong></div>' +
          '<div><span style="color:#64748b;">Root Cause:</span> ' + esc(a.cause) + '</div>' +
        '</div>' +
        (!isResolved ? (
          '<div class="zalt-alert-actions">' +
            (a.id === 'FIN-702' ? '<button type="button" class="zalt-btn zalt-btn-primary" data-alt-action="match-bank" data-id="' + a.id + '">Map Deposit to Invoice</button>' : '') +
            (a.id === 'FIN-703' ? '<button type="button" class="zalt-btn zalt-btn-primary" data-alt-action="approve-vendor-neft" data-id="' + a.id + '">Approve GRN & Release NEFT</button>' : '') +
            '<button type="button" class="zalt-btn zalt-btn-outline" data-alt-action="resolve-finance" data-id="' + a.id + '">Acknowledge</button>' +
          '</div>'
        ) : '') +
      '</div>';
    }).join('');

    return [
      '<div class="zalt-kpi-grid">',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">October EBITDA Margin</span><span class="zalt-kpi-icon">📉</span></div>',
          '<div class="zalt-kpi-value">14.6%</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill danger">-3.4% vs Budget</span><span class="zalt-kpi-subtext">Target: 18.0%</span></div>',
        '</div>',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">Unallocated Bank Inflow</span><span class="zalt-kpi-icon">🏦</span></div>',
          '<div class="zalt-kpi-value">₹4,85,000</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill warning">1 RTGS Deposit</span><span class="zalt-kpi-subtext">HDFC Corporate AC</span></div>',
        '</div>',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">Vendor Payables (<24h)</span><span class="zalt-kpi-icon">🧾</span></div>',
          '<div class="zalt-kpi-value">₹6,80,000</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill danger">Royal Canin PO</span><span class="zalt-kpi-subtext">Pending GRN match</span></div>',
        '</div>',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">Days to GST GSTR-3B</span><span class="zalt-kpi-icon">📅</span></div>',
          '<div class="zalt-kpi-value">3 Days</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill info">88% ITC Matched</span><span class="zalt-kpi-subtext">Oct 20 Deadline</span></div>',
        '</div>',
      '</div>',

      '<div class="zalt-card">',
        '<div class="zalt-card-header">',
          '<div>',
            '<h3 class="zalt-card-title"><span>💰</span> Corporate Financial Alerts & Tax Compliance Deadlines</h3>',
            '<p class="zalt-card-desc">Tracks EBITDA margin compression, unallocated bank deposits, vendor payables aging, and statutory tax deadlines.</p>',
          '</div>',
          '<button type="button" class="zalt-btn zalt-btn-primary" id="zalt-ai-recon-btn">🔄 Run AI Bank Reconciliation</button>',
        '</div>',
        '<div class="zalt-stream-list">' + items + '</div>',
      '</div>'
    ].join('');
  }

  /* ── 8. HR Alerts Tab ────────────────────────────────────────────── */
  function renderHR() {
    var items = S.hr.map(function (a) {
      var isResolved = a.status === 'Resolved';
      var itemClass = isResolved ? 'zalt-alert-item resolved' : (a.severity === 'Critical' ? 'zalt-alert-item sev-1' : 'zalt-alert-item sev-2');

      return '<div class="' + itemClass + '">' +
        '<div class="zalt-alert-top">' +
          '<div>' +
            '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">' +
              '<span class="zalt-alert-id-tag">' + a.id + '</span>' +
              '<span class="zalt-alert-title">' + esc(a.title) + '</span>' +
              (a.severity === 'Critical' ? '<span class="zalt-badge-sev1">Staffing Deficit</span>' : '<span class="zalt-badge-sev2">HR Alert</span>') +
            '</div>' +
            '<div class="zalt-alert-meta">Department: <strong>' + esc(a.department) + '</strong> · Facility: <strong>' + esc(a.facility) + '</strong></div>' +
          '</div>' +
          '<div style="text-align:right;">' +
            '<div style="font-size:12px;font-weight:700;color:#ef4444;">' + esc(a.metric) + '</div>' +
            '<div style="font-size:11px;color:#64748b;">Triggered ' + esc(a.time) + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="zalt-alert-details">' +
          '<div style="grid-column:1/-1;"><span style="color:#64748b;">Clinical / Operational Risk:</span> <strong>' + esc(a.impact) + '</strong></div>' +
        '</div>' +
        (!isResolved ? (
          '<div class="zalt-alert-actions">' +
            (a.id === 'HR-801' ? '<button type="button" class="zalt-btn zalt-btn-danger" data-alt-action="call-nurse-pool" data-id="' + a.id + '">Broadcast Shift Call (+1.5x Pay)</button>' : '') +
            (a.id === 'HR-802' ? '<button type="button" class="zalt-btn zalt-btn-primary" data-alt-action="assign-standby-surgeon" data-id="' + a.id + '">Assign Standby Surgeon</button>' : '') +
            '<button type="button" class="zalt-btn zalt-btn-outline" data-alt-action="resolve-hr" data-id="' + a.id + '">Acknowledge</button>' +
          '</div>'
        ) : '') +
      '</div>';
    }).join('');

    return [
      '<div class="zalt-kpi-grid">',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">Shift Coverage Rate</span><span class="zalt-kpi-icon">🏥</span></div>',
          '<div class="zalt-kpi-value">93.8%</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill danger">2 Shifts Understaffed</span><span class="zalt-kpi-subtext">ICU night shift alert</span></div>',
        '</div>',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">On-Call Specialist Roster</span><span class="zalt-kpi-icon">👨‍⚕️</span></div>',
          '<div class="zalt-kpi-value">7/8 Active</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill danger">1 Absence</span><span class="zalt-kpi-subtext">Mumbai Surgical Trauma</span></div>',
        '</div>',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">Quota Lagging Personnel</span><span class="zalt-kpi-icon">🎯</span></div>',
          '<div class="zalt-kpi-value">5 Employees</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill warning">Pacing < 80%</span><span class="zalt-kpi-subtext">Diagnostics sales team</span></div>',
        '</div>',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">Credentialing Expirations</span><span class="zalt-kpi-icon">📜</span></div>',
          '<div class="zalt-kpi-value">1 License</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill info">Due in 15 days</span><span class="zalt-kpi-subtext">Dr. Aisha Khan (VCI)</span></div>',
        '</div>',
      '</div>',

      '<div class="zalt-card">',
        '<div class="zalt-card-header">',
          '<div>',
            '<h3 class="zalt-card-title"><span>🧑‍💼</span> Live Workforce Exceptions & Clinical Governance Alerts</h3>',
            '<p class="zalt-card-desc">Monitors hospital ICU nurse staffing ratios, emergency on-call vet absences, quota pacing, and veterinary license renewals.</p>',
          '</div>',
          '<button type="button" class="zalt-btn zalt-btn-danger" id="zalt-locum-surgeon-btn">🚨 Page Standby Locum Surgeon</button>',
        '</div>',
        '<div class="zalt-stream-list">' + items + '</div>',
      '</div>'
    ].join('');
  }

  /* ── 9. System Alerts Tab ────────────────────────────────────────── */
  function renderSystem() {
    var items = S.system.map(function (a) {
      var isResolved = a.status === 'Resolved';
      var itemClass = isResolved ? 'zalt-alert-item resolved' : (a.severity === 'Critical' ? 'zalt-alert-item sev-1' : 'zalt-alert-item sev-2');

      return '<div class="' + itemClass + '">' +
        '<div class="zalt-alert-top">' +
          '<div>' +
            '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">' +
              '<span class="zalt-alert-id-tag">' + a.id + '</span>' +
              '<span class="zalt-alert-title">' + esc(a.title) + '</span>' +
              (a.severity === 'Critical' ? '<span class="zalt-badge-sev1">DevOps Critical</span>' : '<span class="zalt-badge-sev2">System Warning</span>') +
            '</div>' +
            '<div class="zalt-alert-meta">Service: <strong>' + esc(a.service) + '</strong> · Metric: <strong style="color:#b91c1c;">' + esc(a.metric) + '</strong></div>' +
          '</div>' +
          '<div style="text-align:right;">' +
            '<div style="font-size:11px;color:#64748b;">Triggered ' + esc(a.time) + '</div>' +
            '<div style="font-size:11px;font-weight:600;color:#0284c7;">' + esc(a.status) + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="zalt-alert-details">' +
          '<div style="grid-column:1/-1;"><span style="color:#64748b;">User / Business Impact:</span> ' + esc(a.impact) + '</div>' +
        '</div>' +
        (!isResolved ? (
          '<div class="zalt-alert-actions">' +
            (a.id === 'SYS-901' ? '<button type="button" class="zalt-btn zalt-btn-primary" data-alt-action="scale-workers" data-id="' + a.id + '">Scale Uvicorn Workers</button>' : '') +
            (a.id === 'SYS-902' ? '<button type="button" class="zalt-btn zalt-btn-primary" data-alt-action="wal-checkpoint" data-id="' + a.id + '">Truncate SQLite WAL</button>' : '') +
            '<button type="button" class="zalt-btn zalt-btn-outline" data-alt-action="resolve-system" data-id="' + a.id + '">Acknowledge</button>' +
          '</div>'
        ) : '') +
      '</div>';
    }).join('');

    return [
      '<div class="zalt-kpi-grid">',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">API Gateway P99 Latency</span><span class="zalt-kpi-icon">⚡</span></div>',
          '<div class="zalt-kpi-value">640 ms</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill danger">Spike on /orders/create</span><span class="zalt-kpi-subtext">Baseline: 45ms</span></div>',
        '</div>',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">SQLite Write Contention</span><span class="zalt-kpi-icon">🗄️</span></div>',
          '<div class="zalt-kpi-value">14 Queued</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill warning">Peak in batch sync</span><span class="zalt-kpi-subtext">zenvebi.db</span></div>',
        '</div>',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">Gemini AI Token Quota</span><span class="zalt-kpi-icon">🤖</span></div>',
          '<div class="zalt-kpi-value">12% Free</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill warning">88% Consumed</span><span class="zalt-kpi-subtext">Tier-3 Enterprise</span></div>',
        '</div>',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">ERP Connector Status</span><span class="zalt-kpi-icon">🔌</span></div>',
          '<div class="zalt-kpi-value">2h 15m Lag</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill danger">Tally Prime VPN</span><span class="zalt-kpi-subtext">Sync reconnecting</span></div>',
        '</div>',
      '</div>',

      '<div class="zalt-card">',
        '<div class="zalt-card-header">',
          '<div>',
            '<h3 class="zalt-card-title"><span>🖥️</span> Infrastructure Telemetry, Database & API Exception Watch</h3>',
            '<p class="zalt-card-desc">Observability dashboard for FastAPI latency spikes, SQLite database locks, Gemini AI token ceilings, and ERP sync status.</p>',
          '</div>',
          '<button type="button" class="zalt-btn zalt-btn-primary" id="zalt-restart-workers-btn">⚡ Graceful Worker Pool Flush</button>',
        '</div>',
        '<div class="zalt-stream-list">' + items + '</div>',
      '</div>'
    ].join('');
  }

  /* ── 10. Alert Rules Tab ─────────────────────────────────────────── */
  function renderRules() {
    var items = S.rules.map(function (r) {
      var itemClass = r.enabled ? 'zalt-rule-item' : 'zalt-rule-item disabled';

      return '<div class="' + itemClass + '" id="rule-item-' + r.id + '">' +
        '<div class="zalt-rule-top">' +
          '<div>' +
            '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">' +
              '<span class="zalt-alert-id-tag">' + r.id + '</span>' +
              '<span class="zalt-alert-title">' + esc(r.name) + '</span>' +
              (r.severity.indexOf('Sev-1') >= 0 ? '<span class="zalt-badge-sev1">' + esc(r.severity) + '</span>' : '<span class="zalt-badge-sev2">' + esc(r.severity) + '</span>') +
              '<span style="font-size:11px;padding:2px 8px;border-radius:99px;background:#eff6ff;color:#2563eb;font-weight:600;">' + esc(r.category) + '</span>' +
            '</div>' +
            '<div class="zalt-rule-condition" style="margin-top:6px;">' +
              'Trigger Condition: <strong>' + esc(r.condition) + '</strong>' +
            '</div>' +
          '</div>' +
          '<div style="display:flex;align-items:center;gap:12px;">' +
            '<button type="button" class="zalt-btn zalt-btn-outline" data-alt-action="test-rule" data-id="' + r.id + '">⚡ Test Event</button>' +
            '<label class="zalt-switch" title="Toggle Alert Rule">' +
              '<input type="checkbox" ' + (r.enabled ? 'checked' : '') + ' data-rule-toggle="' + r.id + '">' +
              '<span class="zalt-slider"></span>' +
            '</label>' +
          '</div>' +
        '</div>' +
        '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:8px;padding:8px 12px;background:#f8fafc;border-radius:8px;font-size:11px;">' +
          '<div><span style="color:#64748b;">Channels:</span> <strong style="color:#0284c7;">' + esc(r.channels.join(' · ')) + '</strong></div>' +
          '<div><span style="color:#64748b;">Escalation SLA:</span> <strong>' + esc(r.escalation) + '</strong></div>' +
          '<div><span style="color:#64748b;">Cooldown Window:</span> <strong>' + esc(r.cooldown) + '</strong></div>' +
        '</div>' +
      '</div>';
    }).join('');

    return [
      '<div class="zalt-kpi-grid">',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">Configured Rules</span><span class="zalt-kpi-icon">🛡️</span></div>',
          '<div class="zalt-kpi-value">' + S.rules.length + ' Rules</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill success">' + S.rules.filter(function (r) { return r.enabled; }).length + ' Active</span><span class="zalt-kpi-subtext">Continuous eval</span></div>',
        '</div>',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">Critical (Sev-1) Rules</span><span class="zalt-kpi-icon">🚨</span></div>',
          '<div class="zalt-kpi-value">4 Rules</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill danger">Emergency Broadcast</span><span class="zalt-kpi-subtext">Cold-chain, Life, P1</span></div>',
        '</div>',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">Multi-Channel Routing</span><span class="zalt-kpi-icon">📱</span></div>',
          '<div class="zalt-kpi-value">5 Channels</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill info">WA, SMS, Slack, Voice, Push</span><span class="zalt-kpi-subtext">Zero drop SLA</span></div>',
        '</div>',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">Mean Resolution SLA</span><span class="zalt-kpi-icon">⏱️</span></div>',
          '<div class="zalt-kpi-value">14.2 Mins</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill success">Target < 20 Mins</span><span class="zalt-kpi-subtext">All metro hubs</span></div>',
        '</div>',
      '</div>',

      '<div class="zalt-card">',
        '<div class="zalt-card-header">',
          '<div>',
            '<h3 class="zalt-card-title"><span>⚙️</span> Alert Rules Engine & Escalation Matrices</h3>',
            '<p class="zalt-card-desc">Configure metric triggers, threshold conditions, multi-channel routing (WhatsApp, SMS, Slack, Voice), and cooldown policies.</p>',
          '</div>',
          '<button type="button" class="zalt-btn zalt-btn-primary" id="zalt-add-rule-btn">➕ Create New Alert Rule</button>',
        '</div>',
        '<div class="zalt-stream-list">' + items + '</div>',
      '</div>'
    ].join('');
  }

  /* ── 11. Notification Center Tab ─────────────────────────────────── */
  function renderNotifs() {
    var filtered = S.notifs.filter(function (n) {
      if (S.severityFilter === 'unread' && n.read) return false;
      if (S.severityFilter === 'critical' && n.severity !== 'Critical') return false;
      if (S.severityFilter === 'warning' && n.severity !== 'Warning') return false;
      if (S.searchQuery) {
        var q = S.searchQuery.toLowerCase();
        return n.title.toLowerCase().indexOf(q) >= 0 || n.body.toLowerCase().indexOf(q) >= 0 || n.recipient.toLowerCase().indexOf(q) >= 0;
      }
      return true;
    });

    var items = filtered.map(function (n) {
      var unreadCls = n.read ? '' : ' unread';
      var badgeHtml = n.severity === 'Critical' ? '<span class="zalt-badge-sev1">Critical</span>' : (n.severity === 'Warning' ? '<span class="zalt-badge-sev2">Warning</span>' : '<span class="zalt-badge-sev3">Info</span>');

      return '<div class="zalt-notif-card' + unreadCls + '" data-alt-action="toggle-notif-read" data-id="' + n.id + '">' +
        '<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;flex-wrap:wrap;">' +
          '<div>' +
            '<div style="display:flex;align-items:center;gap:8px;">' +
              (!n.read ? '<span style="width:8px;height:8px;border-radius:50%;background:#2563eb;display:inline-block;"></span>' : '') +
              '<span style="font-size:14px;font-weight:' + (n.read ? '600' : '700') + ';color:#0f172a;">' + esc(n.title) + '</span>' +
              badgeHtml +
            '</div>' +
            '<div style="font-size:12px;color:#64748b;margin-top:3px;">' +
              'Channel: <strong style="color:#0284c7;">' + esc(n.channel) + '</strong> · Recipient: <strong>' + esc(n.recipient) + '</strong>' +
            '</div>' +
          '</div>' +
          '<div style="text-align:right;">' +
            '<div style="font-size:11px;color:#64748b;">' + esc(n.time) + '</div>' +
            '<div style="font-size:10px;font-weight:700;color:#16a34a;margin-top:2px;">' + esc(n.status) + '</div>' +
          '</div>' +
        '</div>' +
        '<div style="font-size:13px;color:#334155;line-height:1.5;margin-top:4px;">' + esc(n.body) + '</div>' +
        '<div style="display:flex;justify-content:space-between;align-items:center;font-size:11px;color:#64748b;margin-top:4px;">' +
          '<span>ID: ' + n.id + '</span>' +
          '<span style="color:#2563eb;font-weight:600;">' + (n.read ? 'Mark as Unread' : 'Mark as Read') + '</span>' +
        '</div>' +
      '</div>';
    }).join('');

    return [
      '<div class="zalt-kpi-grid">',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">Unread Notifications</span><span class="zalt-kpi-icon">📬</span></div>',
          '<div class="zalt-kpi-value">' + S.notifs.filter(function (n) { return !n.read; }).length + ' Unread</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill danger">Action Required</span><span class="zalt-kpi-subtext">Immediate triage</span></div>',
        '</div>',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">Dispatched Today</span><span class="zalt-kpi-icon">🚀</span></div>',
          '<div class="zalt-kpi-value">1,420 Alerts</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill success">99.8% Delivered</span><span class="zalt-kpi-subtext">All 5 channels</span></div>',
        '</div>',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">WhatsApp Business</span><span class="zalt-kpi-icon">💬</span></div>',
          '<div class="zalt-kpi-value">99.9%</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill success">Meta Green Tier</span><span class="zalt-kpi-subtext">Gupshup Cloud API</span></div>',
        '</div>',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">SMS Gateway Latency</span><span class="zalt-kpi-icon">📱</span></div>',
          '<div class="zalt-kpi-value">1.2s</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill info">DLT Registered</span><span class="zalt-kpi-subtext">Transactional route</span></div>',
        '</div>',
      '</div>',

      '<div class="zalt-card">',
        '<div class="zalt-notif-filters">',
          '<div class="zalt-filter-chips">',
            '<button type="button" class="zalt-fchip' + (S.severityFilter === 'all' ? ' active' : '') + '" data-nfilter="all">All Notifications</button>',
            '<button type="button" class="zalt-fchip' + (S.severityFilter === 'unread' ? ' active' : '') + '" data-nfilter="unread">Unread Only</button>',
            '<button type="button" class="zalt-fchip' + (S.severityFilter === 'critical' ? ' active' : '') + '" data-nfilter="critical">Sev-1 Critical</button>',
            '<button type="button" class="zalt-fchip' + (S.severityFilter === 'warning' ? ' active' : '') + '" data-nfilter="warning">Warnings</button>',
          '</div>',
          '<input type="text" class="zalt-search-box" id="zalt-notif-search" placeholder="Search by title, recipient, body..." value="' + esc(S.searchQuery) + '">',
        '</div>',
        '<div class="zalt-stream-list">' + (items || '<div style="padding:32px;text-align:center;color:#64748b;">No notifications match your current filter.</div>') + '</div>',
      '</div>'
    ].join('');
  }

  /* ── Wire DOM Events ─────────────────────────────────────────────── */
  function wireEvents() {
    if (!root) return;

    // Subnav Tab Chips
    root.querySelectorAll('[data-alt-tab]').forEach(function (btn) {
      btn.onclick = function () {
        var tab = btn.getAttribute('data-alt-tab');
        if (tab) switchTab(tab);
      };
    });

    // Close Button
    var closeBtn = root.querySelector('#zalt-close-btn');
    if (closeBtn) {
      closeBtn.onclick = function () { close(); };
    }

    // Emergency Broadcast Action
    var emBtn = root.querySelector('#zalt-emergency-broadcast-btn');
    if (emBtn) {
      emBtn.onclick = function () {
        showToast('Emergency Incident Commander roster paged via WhatsApp, SMS & Voice call!');
      };
    }

    // Acknowledge All
    var ackAllBtn = root.querySelector('#zalt-ack-all-btn');
    if (ackAllBtn) {
      ackAllBtn.onclick = function () {
        S.critical.forEach(function (a) { a.status = 'Acknowledged'; });
        S.revenue.forEach(function (a) { a.status = 'Acknowledged'; });
        S.inventory.forEach(function (a) { a.status = 'Acknowledged'; });
        S.payment.forEach(function (a) { a.status = 'Acknowledged'; });
        S.order.forEach(function (a) { a.status = 'Acknowledged'; });
        S.delivery.forEach(function (a) { a.status = 'Acknowledged'; });
        S.finance.forEach(function (a) { a.status = 'Acknowledged'; });
        S.hr.forEach(function (a) { a.status = 'Acknowledged'; });
        S.system.forEach(function (a) { a.status = 'Acknowledged'; });
        showToast('All active alerts acknowledged and logged to governance ledger.');
        renderShell();
      };
    }

    // Toggle Chime Audio Button
    var chimeBtn = root.querySelector('#zalt-toggle-chime-btn');
    if (chimeBtn) {
      chimeBtn.onclick = function () {
        S.chimesEnabled = !S.chimesEnabled;
        showToast(S.chimesEnabled ? 'Audio alert ping chimes enabled.' : 'Audio alert chimes muted.');
        renderShell();
      };
    }

    // Action buttons inside tabs
    root.querySelectorAll('[data-alt-action]').forEach(function (btn) {
      btn.onclick = function (e) {
        e.stopPropagation();
        var act = btn.getAttribute('data-alt-action');
        var id = btn.getAttribute('data-id');

        if (act === 'resolve-critical') {
          var item = S.critical.find(function (a) { return a.id === id; });
          if (item) { item.status = 'Resolved'; showToast('Critical incident ' + id + ' resolved.'); }
        } else if (act === 'page-lead') {
          showToast('Paging incident commander for ' + id + ' on mobile emergency bridge!');
        } else if (act === 'resolve-revenue' || act === 'ack-revenue') {
          var rItem = S.revenue.find(function (a) { return a.id === id; });
          if (rItem) { rItem.status = 'Resolved'; showToast('Revenue exception ' + id + ' mitigated.'); }
        } else if (act === 'resolve-inventory' || act === 'snooze-inventory') {
          var iItem = S.inventory.find(function (a) { return a.id === id; });
          if (iItem) { iItem.status = 'Resolved'; showToast('Inventory trigger for SKU ' + iItem.sku + ' executed.'); }
        } else if (act === 'resolve-payment' || act === 'failover-gateway' || act === 'dunning-whatsapp' || act === 'approve-vet-payout') {
          var pItem = S.payment.find(function (a) { return a.id === id; });
          if (pItem) {
            pItem.status = 'Resolved';
            if (act === 'failover-gateway') showToast('Switched 60% checkout UPI traffic to Cashfree Gateway.');
            else if (act === 'dunning-whatsapp') showToast('Automated WhatsApp payment link sent to clinic lead.');
            else if (act === 'approve-vet-payout') showToast('Doctor weekly commission batch approved & signed off.');
            else showToast('Payment alert ' + id + ' acknowledged.');
          }
        } else if (act === 'resolve-order' || act === 'assign-pharmacist' || act === 'expedite-vip') {
          var oItem = S.order.find(function (a) { return a.id === id; });
          if (oItem) {
            oItem.status = 'Resolved';
            if (act === 'assign-pharmacist') showToast('Duty pharmacist paged to clear Rx queue.');
            else if (act === 'expedite-vip') showToast('Priority dedicated courier assigned to VIP customer.');
            else showToast('Order exception ' + id + ' cleared.');
          }
        } else if (act === 'resolve-delivery' || act === 'call-rider' || act === 'dispatch-intercept') {
          var dItem = S.delivery.find(function (a) { return a.id === id; });
          if (dItem) {
            dItem.status = 'Resolved';
            if (act === 'call-rider') showToast('Masked VoIP connected to rider; live GPS sent to customer.');
            else if (act === 'dispatch-intercept') showToast('Intercept rider dispatched with antibiotic replacements.');
            else showToast('Delivery alert ' + id + ' acknowledged.');
          }
        } else if (act === 'resolve-finance' || act === 'match-bank' || act === 'approve-vendor-neft') {
          var fItem = S.finance.find(function (a) { return a.id === id; });
          if (fItem) {
            fItem.status = 'Resolved';
            if (act === 'match-bank') showToast('AI matched ₹4.85L deposit to PetCare Network PO.');
            else if (act === 'approve-vendor-neft') showToast('GRN validated & vendor NEFT approved for Royal Canin.');
            else showToast('Financial alert ' + id + ' acknowledged.');
          }
        } else if (act === 'resolve-hr' || act === 'call-nurse-pool' || act === 'assign-standby-surgeon') {
          var hItem = S.hr.find(function (a) { return a.id === id; });
          if (hItem) {
            hItem.status = 'Resolved';
            if (act === 'call-nurse-pool') showToast('Off-duty nurse pool paged with 1.5x shift pay bonus.');
            else if (act === 'assign-standby-surgeon') showToast('Standby surgeon confirmed coverage for trauma call.');
            else showToast('Workforce alert ' + id + ' acknowledged.');
          }
        } else if (act === 'resolve-system' || act === 'scale-workers' || act === 'wal-checkpoint') {
          var sItem = S.system.find(function (a) { return a.id === id; });
          if (sItem) {
            sItem.status = 'Resolved';
            if (act === 'scale-workers') showToast('Uvicorn workers scaled from 4 to 8 instances.');
            else if (act === 'wal-checkpoint') showToast('SQLite PRAGMA wal_checkpoint executed.');
            else showToast('System telemetry alert ' + id + ' acknowledged.');
          }
        } else if (act === 'test-rule') {
          showToast('Dispatched test event across all configured channels for rule ' + id + '!');
        } else if (act === 'toggle-notif-read') {
          var nItem = S.notifs.find(function (n) { return n.id === id; });
          if (nItem) {
            nItem.read = !nItem.read;
          }
        }

        renderShell();
      };
    });

    // Rule toggle switches
    root.querySelectorAll('[data-rule-toggle]').forEach(function (inp) {
      inp.onchange = function () {
        var id = inp.getAttribute('data-rule-toggle');
        var rule = S.rules.find(function (r) { return r.id === id; });
        if (rule) {
          rule.enabled = inp.checked;
          showToast('Rule "' + rule.name + '" ' + (rule.enabled ? 'Enabled' : 'Paused') + '.');
          renderShell();
        }
      };
    });

    // Add Rule Modal Trigger
    var addRuleBtn = root.querySelector('#zalt-add-rule-btn');
    if (addRuleBtn) {
      addRuleBtn.onclick = function () { openAddRuleModal(); };
    }

    // Specific Action Buttons
    var optRoutesBtn = root.querySelector('#zalt-opt-routes-btn');
    if (optRoutesBtn) {
      optRoutesBtn.onclick = function () {
        showToast('Dynamic AI route clustering applied: transit time reduced by 18% for 68 riders.');
      };
    }

    var restartWorkersBtn = root.querySelector('#zalt-restart-workers-btn');
    if (restartWorkersBtn) {
      restartWorkersBtn.onclick = function () {
        showToast('FastAPI worker threads gracefully reloaded. Latency returned to 42ms.');
      };
    }

    var aiReconBtn = root.querySelector('#zalt-ai-recon-btn');
    if (aiReconBtn) {
      aiReconBtn.onclick = function () {
        showToast('AI Bank Reconciliation completed: matched 41 customer & vendor entries.');
      };
    }

    var genPosBtn = root.querySelector('#zalt-generate-pos-btn');
    if (genPosBtn) {
      genPosBtn.onclick = function () {
        showToast('Generated automated Purchase Orders for Royal Canin & Apoquel SKUs.');
      };
    }

    // Notification Filter Chips
    root.querySelectorAll('[data-nfilter]').forEach(function (btn) {
      btn.onclick = function () {
        S.severityFilter = btn.getAttribute('data-nfilter');
        renderShell();
      };
    });

    // Notification Search
    var sInput = root.querySelector('#zalt-notif-search');
    if (sInput) {
      sInput.oninput = function () {
        S.searchQuery = sInput.value;
        var pane = root.querySelector('#zalt-pane');
        if (pane && S.activeTab === 'notifs') {
          pane.innerHTML = renderNotifs();
          wireEvents();
          var updatedInput = root.querySelector('#zalt-notif-search');
          if (updatedInput) {
            updatedInput.focus();
            updatedInput.setSelectionRange(updatedInput.value.length, updatedInput.value.length);
          }
        }
      };
    }
  }

  /* ── Add Rule Modal ──────────────────────────────────────────────── */
  function openAddRuleModal() {
    var modal = document.createElement('div');
    modal.className = 'zalt-modal-backdrop';
    modal.id = 'zalt-rule-modal';
    modal.innerHTML = [
      '<div class="zalt-modal">',
        '<div class="zalt-modal-header">',
          '<h3 class="zalt-modal-title">Create New Alert Rule</h3>',
          '<button type="button" class="zalt-close-btn" id="zalt-modal-close">✕</button>',
        '</div>',
        '<form id="zalt-new-rule-form" style="display:flex;flex-direction:column;gap:12px;">',
          '<div>',
            '<label style="display:block;font-size:12px;font-weight:600;margin-bottom:4px;color:#334155;">Rule Name</label>',
            '<input type="text" id="zalt-rname" required placeholder="e.g. ICU Oxygen Pressure Alert" style="width:100%;padding:8px 12px;border-radius:6px;border:1px solid #cbd5e1;font-size:13px;">',
          '</div>',
          '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">',
            '<div>',
              '<label style="display:block;font-size:12px;font-weight:600;margin-bottom:4px;color:#334155;">Category</label>',
              '<select id="zalt-rcat" style="width:100%;padding:8px 10px;border-radius:6px;border:1px solid #cbd5e1;font-size:13px;background:#fff;">',
                '<option value="Critical Emergency">Critical Emergency</option>',
                '<option value="Inventory & Stock">Inventory & Stock</option>',
                '<option value="Revenue & Sales">Revenue & Sales</option>',
                '<option value="Payment Gateways">Payment Gateways</option>',
                '<option value="Logistics & Fleet">Logistics & Fleet</option>',
                '<option value="Clinical & HR">Clinical & HR</option>',
              '</select>',
            '</div>',
            '<div>',
              '<label style="display:block;font-size:12px;font-weight:600;margin-bottom:4px;color:#334155;">Severity</label>',
              '<select id="zalt-rsev" style="width:100%;padding:8px 10px;border-radius:6px;border:1px solid #cbd5e1;font-size:13px;background:#fff;">',
                '<option value="Critical (Sev-1)">Critical (Sev-1)</option>',
                '<option value="Warning (Sev-2)">Warning (Sev-2)</option>',
                '<option value="Info (Sev-3)">Info (Sev-3)</option>',
              '</select>',
            '</div>',
          '</div>',
          '<div>',
            '<label style="display:block;font-size:12px;font-weight:600;margin-bottom:4px;color:#334155;">Trigger Condition</label>',
            '<input type="text" id="zalt-rcond" required placeholder="e.g. Tank Pressure < 25 PSI for > 1 min" style="width:100%;padding:8px 12px;border-radius:6px;border:1px solid #cbd5e1;font-size:13px;">',
          '</div>',
          '<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:8px;">',
            '<button type="button" class="zalt-btn zalt-btn-outline" id="zalt-modal-cancel">Cancel</button>',
            '<button type="submit" class="zalt-btn zalt-btn-primary">Save & Deploy Rule</button>',
          '</div>',
        '</form>',
      '</div>'
    ].join('');

    document.body.appendChild(modal);

    var closeBtn = modal.querySelector('#zalt-modal-close');
    var cancelBtn = modal.querySelector('#zalt-modal-cancel');
    var form = modal.querySelector('#zalt-new-rule-form');

    function closeModal() {
      if (modal.parentNode) modal.remove();
    }

    if (closeBtn) closeBtn.onclick = closeModal;
    if (cancelBtn) cancelBtn.onclick = closeModal;

    if (form) {
      form.onsubmit = function (e) {
        e.preventDefault();
        var name = modal.querySelector('#zalt-rname').value;
        var cat = modal.querySelector('#zalt-rcat').value;
        var sev = modal.querySelector('#zalt-rsev').value;
        var cond = modal.querySelector('#zalt-rcond').value;

        if (!name || !cond) return;

        var rule = {
          id: 'AR-' + (100 + S.rules.length + 1),
          name: name,
          category: cat,
          condition: cond,
          severity: sev,
          channels: ['WhatsApp', 'Slack', 'Email'],
          escalation: '15 mins',
          cooldown: '15 mins',
          enabled: true
        };

        S.rules.unshift(rule);
        closeModal();
        showToast('New Alert Rule "' + name + '" deployed successfully!');
        renderShell();
      };
    }
  }

  function loadLiveAlerts() {
    fetch('/api/v1/alerts')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (Array.isArray(data) && data.length > 0) {
          S.critical = data.map(function (a) {
            return {
              id: a.alert_code || ('ALT-' + a.id),
              db_id: a.id,
              title: a.title,
              hub: a.category + ' Hub',
              metric: 'Severity: ' + a.severity,
              impact: a.message,
              time: 'Live',
              slaCountdown: 'Active Telemetry',
              lead: 'Zenve Operations Command',
              status: a.status === 'Resolved' ? 'Resolved' : (a.status === 'Acknowledged' ? 'Acknowledged' : 'Active'),
              action: 'Automated monitoring enabled'
            };
          });
          if (root && S.open) {
            renderShell();
          }
        }
      })
      .catch(function (err) {
        console.error('Failed to load alerts from MySQL:', err);
      });
  }

  /* ── Open, Switch, Close Lifecycle ───────────────────────────────── */
  function open(tab) {
    loadLiveAlerts();
    if (tab && MODULES.some(function (m) { return m.id === tab; })) {
      S.activeTab = tab;
    }
    renderShell();

    // Close any other open control centers
    if (window.ZenvePharmacyDashboard && typeof window.ZenvePharmacyDashboard.close === 'function') {
      try { window.ZenvePharmacyDashboard.close(); } catch (e) {}
    }
    if (window.ZenveClinicsDashboard && typeof window.ZenveClinicsDashboard.close === 'function') {
      try { window.ZenveClinicsDashboard.close(); } catch (e) {}
    }
    document.querySelectorAll('.zpanel-root, #zod-root, #zsd-root, #zset-root, #zph-root, #zch-root, #zrep-root').forEach(function (el) {
      if (el !== root) {
        el.classList.remove('zpanel-open');
        el.classList.remove('zod-open');
        el.classList.remove('zsd-open');
        el.classList.remove('zset-open');
        el.classList.remove('zph-open');
        el.classList.remove('zch-open');
        el.classList.remove('zrep-open');
      }
    });

    root.classList.add('zalt-open');
    S.open = true;

    try {
      document.documentElement.classList.add('zalt-locked');
      document.body.classList.add('zalt-locked');
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } catch (e) { }

    var targetHash = hashFromTab(S.activeTab);
    try {
      if (location.hash !== targetHash) {
        history.pushState(null, '', targetHash);
      }
    } catch (e) { }

    // Clean up any Radix placeholder dialog / lock attributes
    try {
      document.querySelectorAll('[role="dialog"]').forEach(function (d) {
        if (d.closest('#zalt-root')) return;
        var btn = d.querySelector('button[aria-label*="close" i], button:last-child');
        if (btn) {
          try { btn.click(); } catch (err) {}
        }
        try { d.remove(); } catch (err) {}
      });
      document.querySelectorAll('[data-radix-focus-guard], [data-radix-popper-content-wrapper], [data-radix-portal]').forEach(function (g) {
        try { g.remove(); } catch (err) {}
      });
    } catch (e) { }

    syncSidebar(true, S.activeTab);
  }

  function switchTab(tab) {
    if (!tab) return;
    S.activeTab = tab;
    var targetHash = hashFromTab(tab);
    try {
      if (location.hash !== targetHash) {
        history.pushState(null, '', targetHash);
      }
    } catch (e) { }
    renderShell();
    syncSidebar(true, tab);
  }

  function close() {
    if (!root || !S.open) return;
    S.open = false;
    root.classList.remove('zalt-open');
    try {
      document.documentElement.classList.remove('zalt-locked');
      document.body.classList.remove('zalt-locked');
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.pointerEvents = '';
      document.body.removeAttribute('data-scroll-locked');
    } catch (e) { }
    syncSidebar(false);
    try {
      if (location.hash.startsWith('#critical-') || location.hash.startsWith('#revenue-') || location.hash.startsWith('#inventory-') || location.hash.startsWith('#payment-') || location.hash.startsWith('#order-') || location.hash.startsWith('#delivery-') || location.hash.startsWith('#finance-') || location.hash.startsWith('#hr-') || location.hash.startsWith('#system-') || location.hash.startsWith('#alert-') || location.hash.startsWith('#notification-') || location.hash === '#alerts') {
        history.pushState(null, '', location.pathname + location.search);
      }
    } catch (e) { }
  }

  function syncSidebar(on, tab) {
    document.querySelectorAll('.sidebar-scope li button, .sidebar-scope button, .sidebar-scope a').forEach(function (b) {
      var text = (b.textContent || '').trim();
      var bTab = tabFromText(text);
      if (bTab) {
        b.classList.toggle('zalt-active', on && bTab === tab);
        b.classList.toggle('zset-active', on && bTab === tab);
      }
    });
  }

  /* ── Public API ─────────────────────────────────────────────────── */
  window.ZenveAlertsDashboard = {
    open: open,
    close: close,
    switchTab: switchTab,
    getState: function () { return S; },
    showToast: showToast
  };

  /* ── Keyboard & Hashchange Listeners ────────────────────────────── */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && S.open) {
      var modal = document.getElementById('zalt-rule-modal');
      if (modal) modal.remove();
      else close();
    }
  });

  window.addEventListener('hashchange', function () {
    var tab = tabFromHash(location.hash);
    if (tab) {
      open(tab);
    } else if (S.open && location.hash.indexOf('alert') < 0 && location.hash.indexOf('notif') < 0) {
      close();
    }
  });

  /* ── Capture-Phase Global Interceptor for All 11 Alerts Pages ───── */
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;

    // Never intercept accordion group headers or search input
    if (t.closest('[aria-expanded]') || t.closest('button[aria-expanded]') || t.closest('[aria-label="Search menu"]')) return;

    // Check clicked buttons, list items, and links
    var item = t.closest('button, [data-go], a, [role="button"], li');
    if (item && item.textContent) {
      var text = item.textContent.trim();
      var tab = tabFromText(text);

      if (tab) {
        if (!t.closest('#zalt-root')) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          open(tab);
          return;
        }
      }
    }
  }, true);

  // Auto-open on initial load if hash matches
  var initialTab = tabFromHash(location.hash);
  if (initialTab) {
    setTimeout(function () { open(initialTab); }, 350);
  }

})();
