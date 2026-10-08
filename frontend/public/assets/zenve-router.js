/* =====================================================================
   Zenve BI — Universal Dashboard Router & Navigation Controller
   Ensures every sidebar item, card, subcategory chip, and view-all button
   opens its appropriate interactive dashboard and subcategory view dynamically.
   ===================================================================== */
(function () {
  'use strict';

  var ROOT_IDS = [
    'zsd-root', 'zod-root', 'zpid-root', 'zph-root', 'zch-root',
    'zdoc-root', 'zvs-root', 'zc360-root', 'zpet-root', 'zhr-dashboard-root',
    'zfa-root', 'zmkt-dashboard-root', 'zvp-root', 'zlog-dashboard-root',
    'zfsh-root', 'zb2b-root', 'zix-root', 'zsub-root', 'zrep-root',
    'zai-root', 'zalt-root', 'zaud-root', 'zsys-root', 'zset-root',
    'zexec-root', 'zfc-root', 'zf-root', 'zt-root', 'zsda-root',
    'zhr-all-employees-root', 'zhr-attendance-root', 'zhr-departments-root',
    'zhr-expenses-root', 'zhr-performance-root', 'zhr-productivity-root',
    'zhr-targets-root', 'zhr-leave-root', 'zhr-onboarding-root',
    'zhr-payroll-root', 'zhr-recruitment-root', 'zhr-salary-cost-root'
  ];

  var OPEN_CLASSES = [
    'zsd-open', 'zod-open', 'zpid-open', 'zph-open', 'zch-open',
    'zdoc-open', 'zvs-open', 'zc360-open', 'zpet-open', 'zhr-open',
    'zfa-open', 'zmkt-open', 'zvp-open', 'zlog-open', 'zfsh-open',
    'zb2b-open', 'zix-open', 'zsub-open', 'zrep-open', 'zai-open',
    'zalt-open', 'zaud-open', 'zsys-open', 'zset-open', 'zexec-open',
    'zpanel-open'
  ];

  var CONTROLLER_ROOT_MAP = {
    'ZenveExecutiveDashboard': 'zexec-root',
    'ZenveSalesDashboard': 'zsd-root',
    'ZenveSalesFunnel': 'zf-root',
    'ZenveTargets': 'zt-root',
    'ZenveForecast': 'zfc-root',
    'ZenveOperationsDashboard': 'zod-root',
    'ZenveProductsInventory': 'zpid-root',
    'ZenvePharmacyDashboard': 'zph-root',
    'ZenveVeterinaryDashboard': 'zvs-root',
    'ZenveDoctorsDashboard': 'zdoc-root',
    'ZenveClinicsDashboard': 'zch-root',
    'ZenveCustomersDashboard': 'zc360-root',
    'ZenvePetsDashboard': 'zpet-root',
    'ZenveHRDashboard': 'zhr-dashboard-root',
    'ZenveAllEmployees': 'zhr-all-employees-root',
    'ZenveAttendance': 'zhr-attendance-root',
    'ZenveDepartments': 'zhr-departments-root',
    'ZenveEmployeeExpenses': 'zhr-expenses-root',
    'ZenveEmployeePerformance': 'zhr-performance-root',
    'ZenveEmployeeProductivity': 'zhr-productivity-root',
    'ZenveEmployeeTargets': 'zhr-targets-root',
    'ZenveLeaveManagement': 'zhr-leave-root',
    'ZenveOnboarding': 'zhr-onboarding-root',
    'ZenvePayroll': 'zhr-payroll-root',
    'ZenveRecruitment': 'zhr-recruitment-root',
    'ZenveSalaryCost': 'zhr-salary-cost-root',
    'ZenveFinanceDashboard': 'zfa-root',
    'ZenveMarketingDashboard': 'zmkt-dashboard-root',
    'ZenveVendorsDashboard': 'zvp-root',
    'ZenveLogisticsDashboard': 'zlog-dashboard-root',
    'ZenveFashionDashboard': 'zfsh-root',
    'ZenveB2BDashboard': 'zb2b-root',
    'ZenveImportExportDashboard': 'zix-root',
    'ZenveSubscriptionsDashboard': 'zsub-root',
    'ZenveReportsDashboard': 'zrep-root',
    'ZenveAIAssistant': 'zai-root',
    'ZenveAlertsDashboard': 'zalt-root',
    'ZenveAudit': 'zaud-root',
    'ZenveSystemHealth': 'zsys-root',
    'ZenveSettingsDashboard': 'zset-root'
  };

  var CONTROLLER_OPEN_CLASS_MAP = {
    'ZenveExecutiveDashboard': 'zexec-open',
    'ZenveSalesDashboard': 'zsd-open',
    'ZenveOperationsDashboard': 'zod-open',
    'ZenveProductsInventory': 'zpid-open',
    'ZenvePharmacyDashboard': 'zph-open',
    'ZenveVeterinaryDashboard': 'zvs-open',
    'ZenveDoctorsDashboard': 'zdoc-open',
    'ZenveClinicsDashboard': 'zch-open',
    'ZenveCustomersDashboard': 'zc360-open',
    'ZenvePetsDashboard': 'zpet-open',
    'ZenveHRDashboard': 'zhr-open',
    'ZenveFinanceDashboard': 'zfa-open',
    'ZenveMarketingDashboard': 'zmkt-open',
    'ZenveVendorsDashboard': 'zvp-open',
    'ZenveLogisticsDashboard': 'zlog-open',
    'ZenveFashionDashboard': 'zfsh-open',
    'ZenveB2BDashboard': 'zb2b-open',
    'ZenveImportExportDashboard': 'zix-open',
    'ZenveSubscriptionsDashboard': 'zsub-open',
    'ZenveReportsDashboard': 'zrep-open',
    'ZenveAIAssistant': 'zai-open',
    'ZenveAlertsDashboard': 'zalt-open',
    'ZenveAudit': 'zaud-open',
    'ZenveSystemHealth': 'zsys-open',
    'ZenveSettingsDashboard': 'zset-open'
  };

  var ROUTE_MAP = {
    // Executive Dashboard
    'executive dashboard': { controller: 'ZenveExecutiveDashboard', tab: 'dashboard', hash: '#executive-dashboard', rootId: 'zexec-root', module: 'Executive Dashboard' },
    'ceo control center': { controller: 'ZenveExecutiveDashboard', tab: 'ceo-control', hash: '#ceo-control', rootId: 'zexec-root', module: 'Executive Dashboard' },
    'business overview': { controller: 'ZenveExecutiveDashboard', tab: 'overview', hash: '#business-overview', rootId: 'zexec-root', module: 'Executive Dashboard' },
    'kpi dashboard': { controller: 'ZenveExecutiveDashboard', tab: 'kpi', hash: '#kpi-dashboard', rootId: 'zexec-root', module: 'Executive Dashboard' },

    // Revenue & Sales
    'revenue & sales': { controller: 'ZenveSalesDashboard', tab: 'sales', hash: '#sales-dashboard', rootId: 'zsd-root', module: 'Revenue & Sales' },
    'revenue and sales': { controller: 'ZenveSalesDashboard', tab: 'sales', hash: '#sales-dashboard', rootId: 'zsd-root', module: 'Revenue & Sales' },
    'revenue & sales dashboard': { controller: 'ZenveSalesDashboard', tab: 'sales', hash: '#sales-dashboard', rootId: 'zsd-root', module: 'Revenue & Sales' },
    'sales dashboard': { controller: 'ZenveSalesDashboard', tab: 'sales', hash: '#sales-dashboard', rootId: 'zsd-root', module: 'Revenue & Sales' },
    'revenue by channel': { controller: 'ZenveSalesDashboard', tab: 'channel', hash: '#revenue-by-channel', rootId: 'zsd-root', module: 'Revenue & Sales' },
    'revenue by location': { controller: 'ZenveSalesDashboard', tab: 'location', hash: '#revenue-by-location', rootId: 'zsd-root', module: 'Revenue & Sales' },
    'revenue by product': { controller: 'ZenveSalesDashboard', tab: 'product', hash: '#revenue-by-product', rootId: 'zsd-root', module: 'Revenue & Sales' },
    'revenue by employee': { controller: 'ZenveSalesDashboard', tab: 'employee', hash: '#revenue-by-employee', rootId: 'zsd-root', module: 'Revenue & Sales' },
    'revenue by doctor': { controller: 'ZenveSalesDashboard', tab: 'doctor', hash: '#revenue-by-doctor', rootId: 'zsd-root', module: 'Revenue & Sales' },
    'revenue by customer': { controller: 'ZenveSalesDashboard', tab: 'customer', hash: '#revenue-by-customer', rootId: 'zsd-root', module: 'Revenue & Sales' },
    'sales funnel': { controller: 'ZenveSalesDashboard', tab: 'funnel', hash: '#sales-funnel', rootId: 'zsd-root', module: 'Revenue & Sales' },
    'targets & achievement': { controller: 'ZenveSalesDashboard', tab: 'targets', hash: '#targets-achievement', rootId: 'zsd-root', module: 'Revenue & Sales' },
    'targets & achievements': { controller: 'ZenveSalesDashboard', tab: 'targets', hash: '#targets-achievement', rootId: 'zsd-root', module: 'Revenue & Sales' },
    'sales forecast': { controller: 'ZenveSalesDashboard', tab: 'forecast', hash: '#sales-forecast', rootId: 'zsd-root', module: 'Revenue & Sales' },

    // Orders & Operations
    'orders & operations': { controller: 'ZenveOperationsDashboard', tab: 'overview', hash: '#operations-dashboard', rootId: 'zod-root', module: 'Orders & Operations' },
    'orders and operations': { controller: 'ZenveOperationsDashboard', tab: 'overview', hash: '#operations-dashboard', rootId: 'zod-root', module: 'Orders & Operations' },
    'orders & operations dashboard': { controller: 'ZenveOperationsDashboard', tab: 'overview', hash: '#operations-dashboard', rootId: 'zod-root', module: 'Orders & Operations' },
    'operations dashboard': { controller: 'ZenveOperationsDashboard', tab: 'overview', hash: '#operations-dashboard', rootId: 'zod-root', module: 'Orders & Operations' },
    'all orders': { controller: 'ZenveOperationsDashboard', tab: 'all-orders', hash: '#all-orders', rootId: 'zod-root', module: 'Orders & Operations' },
    'order management': { controller: 'ZenveOperationsDashboard', tab: 'management', hash: '#order-management', rootId: 'zod-root', module: 'Orders & Operations' },
    'order status': { controller: 'ZenveOperationsDashboard', tab: 'status', hash: '#order-status', rootId: 'zod-root', module: 'Orders & Operations' },
    'returns & refunds': { controller: 'ZenveOperationsDashboard', tab: 'returns', hash: '#returns-refunds', rootId: 'zod-root', module: 'Orders & Operations' },
    'cancellations': { controller: 'ZenveOperationsDashboard', tab: 'cancellations', hash: '#cancellations', rootId: 'zod-root', module: 'Orders & Operations' },
    'delivery performance': { controller: 'ZenveOperationsDashboard', tab: 'delivery', hash: '#delivery-performance', rootId: 'zod-root', module: 'Orders & Operations' },
    '60-minute delivery': { controller: 'ZenveOperationsDashboard', tab: 'express', hash: '#60-minute-delivery', rootId: 'zod-root', module: 'Orders & Operations' },

    // Products & Inventory
    'products & inventory': { controller: 'ZenveProductsInventory', tab: 'catalog', hash: '#product-catalog', rootId: 'zpid-root', module: 'Products & Inventory' },
    'products and inventory': { controller: 'ZenveProductsInventory', tab: 'catalog', hash: '#product-catalog', rootId: 'zpid-root', module: 'Products & Inventory' },
    'products & inventory dashboard': { controller: 'ZenveProductsInventory', tab: 'catalog', hash: '#product-catalog', rootId: 'zpid-root', module: 'Products & Inventory' },
    'product catalog': { controller: 'ZenveProductsInventory', tab: 'catalog', hash: '#product-catalog', rootId: 'zpid-root', module: 'Products & Inventory' },
    'products catalog': { controller: 'ZenveProductsInventory', tab: 'catalog', hash: '#product-catalog', rootId: 'zpid-root', module: 'Products & Inventory' },
    'all products': { controller: 'ZenveProductsInventory', tab: 'catalog', hash: '#product-catalog', rootId: 'zpid-root', module: 'Products & Inventory' },
    'sku management': { controller: 'ZenveProductsInventory', tab: 'sku', hash: '#sku-management', rootId: 'zpid-root', module: 'Products & Inventory' },
    'inventory dashboard': { controller: 'ZenveProductsInventory', tab: 'inventory', hash: '#inventory-dashboard', rootId: 'zpid-root', module: 'Products & Inventory' },
    'inventory': { controller: 'ZenveProductsInventory', tab: 'inventory', hash: '#inventory-dashboard', rootId: 'zpid-root', module: 'Products & Inventory' },
    'stock management': { controller: 'ZenveProductsInventory', tab: 'stock', hash: '#stock-management', rootId: 'zpid-root', module: 'Products & Inventory' },
    'low stock': { controller: 'ZenveProductsInventory', tab: 'lowstock', hash: '#low-stock', rootId: 'zpid-root', module: 'Products & Inventory' },
    'out of stock': { controller: 'ZenveProductsInventory', tab: 'outofstock', hash: '#out-of-stock', rootId: 'zpid-root', module: 'Products & Inventory' },
    'expiry management': { controller: 'ZenveProductsInventory', tab: 'expiry', hash: '#expiry-management', rootId: 'zpid-root', module: 'Products & Inventory' },
    'warehouse management': { controller: 'ZenveProductsInventory', tab: 'warehouse', hash: '#warehouse-management', rootId: 'zpid-root', module: 'Products & Inventory' },
    'stock transfers': { controller: 'ZenveProductsInventory', tab: 'transfers', hash: '#stock-transfers', rootId: 'zpid-root', module: 'Products & Inventory' },
    'inventory valuation': { controller: 'ZenveProductsInventory', tab: 'valuation', hash: '#inventory-valuation', rootId: 'zpid-root', module: 'Products & Inventory' },
    'inventory movement': { controller: 'ZenveProductsInventory', tab: 'movement', hash: '#inventory-movement', rootId: 'zpid-root', module: 'Products & Inventory' },

    // Pharmacy
    'pharmacy': { controller: 'ZenvePharmacyDashboard', tab: 'dashboard', hash: '#pharmacy-dashboard', rootId: 'zph-root', module: 'Pharmacy' },
    'pharmacy dashboard': { controller: 'ZenvePharmacyDashboard', tab: 'dashboard', hash: '#pharmacy-dashboard', rootId: 'zph-root', module: 'Pharmacy' },
    'pharmacy sales': { controller: 'ZenvePharmacyDashboard', tab: 'sales', hash: '#pharmacy-sales', rootId: 'zph-root', module: 'Pharmacy' },
    'medicines': { controller: 'ZenvePharmacyDashboard', tab: 'medicines', hash: '#medicines', rootId: 'zph-root', module: 'Pharmacy' },
    'prescriptions': { controller: 'ZenvePharmacyDashboard', tab: 'prescriptions', hash: '#prescriptions', rootId: 'zph-root', module: 'Pharmacy' },
    'pharmacy orders': { controller: 'ZenvePharmacyDashboard', tab: 'orders', hash: '#pharmacy-orders', rootId: 'zph-root', module: 'Pharmacy' },
    'batch management': { controller: 'ZenvePharmacyDashboard', tab: 'batches', hash: '#batch-management', rootId: 'zph-root', module: 'Pharmacy' },
    'expiry tracking': { controller: 'ZenvePharmacyDashboard', tab: 'expiry', hash: '#expiry-tracking', rootId: 'zph-root', module: 'Pharmacy' },
    'pharmacy inventory': { controller: 'ZenvePharmacyDashboard', tab: 'inventory', hash: '#pharmacy-inventory', rootId: 'zph-root', module: 'Pharmacy' },
    'pharmacy revenue': { controller: 'ZenvePharmacyDashboard', tab: 'revenue', hash: '#pharmacy-revenue', rootId: 'zph-root', module: 'Pharmacy' },
    'pharmacy profitability': { controller: 'ZenvePharmacyDashboard', tab: 'profitability', hash: '#pharmacy-profitability', rootId: 'zph-root', module: 'Pharmacy' },

    // Veterinary Services
    'veterinary services': { controller: 'ZenveVeterinaryDashboard', tab: 'overview', hash: '#services-dashboard', rootId: 'zvs-root', module: 'Veterinary Services' },
    'veterinary services dashboard': { controller: 'ZenveVeterinaryDashboard', tab: 'overview', hash: '#services-dashboard', rootId: 'zvs-root', module: 'Veterinary Services' },
    'services dashboard': { controller: 'ZenveVeterinaryDashboard', tab: 'overview', hash: '#services-dashboard', rootId: 'zvs-root', module: 'Veterinary Services' },
    'consultations': { controller: 'ZenveVeterinaryDashboard', tab: 'consultations', hash: '#consultations', rootId: 'zvs-root', module: 'Veterinary Services' },
    'appointments': { controller: 'ZenveVeterinaryDashboard', tab: 'appointments', hash: '#appointments', rootId: 'zvs-root', module: 'Veterinary Services' },
    'treatments': { controller: 'ZenveVeterinaryDashboard', tab: 'treatments', hash: '#treatments', rootId: 'zvs-root', module: 'Veterinary Services' },
    'vaccinations': { controller: 'ZenveVeterinaryDashboard', tab: 'vaccinations', hash: '#vaccinations', rootId: 'zvs-root', module: 'Veterinary Services' },
    'diagnostics': { controller: 'ZenveVeterinaryDashboard', tab: 'diagnostics', hash: '#diagnostics', rootId: 'zvs-root', module: 'Veterinary Services' },
    'procedures': { controller: 'ZenveVeterinaryDashboard', tab: 'procedures', hash: '#procedures', rootId: 'zvs-root', module: 'Veterinary Services' },
    'service revenue': { controller: 'ZenveVeterinaryDashboard', tab: 'revenue', hash: '#service-revenue', rootId: 'zvs-root', module: 'Veterinary Services' },
    'service profitability': { controller: 'ZenveVeterinaryDashboard', tab: 'profitability', hash: '#service-profitability', rootId: 'zvs-root', module: 'Veterinary Services' },

    // Doctors
    'doctors': { controller: 'ZenveDoctorsDashboard', tab: 'dashboard', hash: '#doctors-dashboard', rootId: 'zdoc-root', module: 'Doctors' },
    'doctors dashboard': { controller: 'ZenveDoctorsDashboard', tab: 'dashboard', hash: '#doctors-dashboard', rootId: 'zdoc-root', module: 'Doctors' },
    'all doctors': { controller: 'ZenveDoctorsDashboard', tab: 'all-doctors', hash: '#all-doctors', rootId: 'zdoc-root', module: 'Doctors' },
    'doctor performance': { controller: 'ZenveDoctorsDashboard', tab: 'performance', hash: '#doctor-performance', rootId: 'zdoc-root', module: 'Doctors' },
    'doctor revenue': { controller: 'ZenveDoctorsDashboard', tab: 'revenue', hash: '#doctor-revenue', rootId: 'zdoc-root', module: 'Doctors' },
    'doctor patients': { controller: 'ZenveDoctorsDashboard', tab: 'patients', hash: '#doctor-patients', rootId: 'zdoc-root', module: 'Doctors' },
    'doctor orders': { controller: 'ZenveDoctorsDashboard', tab: 'orders', hash: '#doctor-orders', rootId: 'zdoc-root', module: 'Doctors' },
    'doctor commissions': { controller: 'ZenveDoctorsDashboard', tab: 'commissions', hash: '#doctor-commissions', rootId: 'zdoc-root', module: 'Doctors' },
    'doctor activity': { controller: 'ZenveDoctorsDashboard', tab: 'activity', hash: '#doctor-activity', rootId: 'zdoc-root', module: 'Doctors' },
    'doctor network': { controller: 'ZenveDoctorsDashboard', tab: 'network', hash: '#doctor-network', rootId: 'zdoc-root', module: 'Doctors' },

    // Clinics & Hospitals
    'clinics & hospitals': { controller: 'ZenveClinicsDashboard', tab: 'dashboard', hash: '#clinics-dashboard', rootId: 'zch-root', module: 'Clinics & Hospitals' },
    'clinics and hospitals': { controller: 'ZenveClinicsDashboard', tab: 'dashboard', hash: '#clinics-dashboard', rootId: 'zch-root', module: 'Clinics & Hospitals' },
    'clinics & hospitals dashboard': { controller: 'ZenveClinicsDashboard', tab: 'dashboard', hash: '#clinics-dashboard', rootId: 'zch-root', module: 'Clinics & Hospitals' },
    'clinics dashboard': { controller: 'ZenveClinicsDashboard', tab: 'dashboard', hash: '#clinics-dashboard', rootId: 'zch-root', module: 'Clinics & Hospitals' },
    'all clinics': { controller: 'ZenveClinicsDashboard', tab: 'all-clinics', hash: '#all-clinics', rootId: 'zch-root', module: 'Clinics & Hospitals' },
    'hospitals': { controller: 'ZenveClinicsDashboard', tab: 'hospitals', hash: '#hospitals', rootId: 'zch-root', module: 'Clinics & Hospitals' },
    'clinic performance': { controller: 'ZenveClinicsDashboard', tab: 'performance', hash: '#clinic-performance', rootId: 'zch-root', module: 'Clinics & Hospitals' },
    'clinic revenue': { controller: 'ZenveClinicsDashboard', tab: 'revenue', hash: '#clinic-revenue', rootId: 'zch-root', module: 'Clinics & Hospitals' },
    'clinic orders': { controller: 'ZenveClinicsDashboard', tab: 'orders', hash: '#clinic-orders', rootId: 'zch-root', module: 'Clinics & Hospitals' },
    'clinic patients': { controller: 'ZenveClinicsDashboard', tab: 'patients', hash: '#clinic-patients', rootId: 'zch-root', module: 'Clinics & Hospitals' },
    'clinic doctors': { controller: 'ZenveClinicsDashboard', tab: 'doctors', hash: '#clinic-doctors', rootId: 'zch-root', module: 'Clinics & Hospitals' },
    'clinic commissions': { controller: 'ZenveClinicsDashboard', tab: 'commissions', hash: '#clinic-commissions', rootId: 'zch-root', module: 'Clinics & Hospitals' },
    'clinic network': { controller: 'ZenveClinicsDashboard', tab: 'network', hash: '#clinic-network', rootId: 'zch-root', module: 'Clinics & Hospitals' },

    // Customers 360°
    'customers 360°': { controller: 'ZenveCustomersDashboard', tab: 'dashboard', hash: '#customer-dashboard', rootId: 'zc360-root', module: 'Customers 360°' },
    'customers 360': { controller: 'ZenveCustomersDashboard', tab: 'dashboard', hash: '#customer-dashboard', rootId: 'zc360-root', module: 'Customers 360°' },
    'customers 360° dashboard': { controller: 'ZenveCustomersDashboard', tab: 'dashboard', hash: '#customer-dashboard', rootId: 'zc360-root', module: 'Customers 360°' },
    'customer dashboard': { controller: 'ZenveCustomersDashboard', tab: 'dashboard', hash: '#customer-dashboard', rootId: 'zc360-root', module: 'Customers 360°' },
    'all customers': { controller: 'ZenveCustomersDashboard', tab: 'all-customers', hash: '#all-customers', rootId: 'zc360-root', module: 'Customers 360°' },
    'new customers': { controller: 'ZenveCustomersDashboard', tab: 'new-customers', hash: '#new-customers', rootId: 'zc360-root', module: 'Customers 360°' },
    'active customers': { controller: 'ZenveCustomersDashboard', tab: 'active-customers', hash: '#active-customers', rootId: 'zc360-root', module: 'Customers 360°' },
    'repeat customers': { controller: 'ZenveCustomersDashboard', tab: 'repeat-customers', hash: '#repeat-customers', rootId: 'zc360-root', module: 'Customers 360°' },
    'customer lifetime value': { controller: 'ZenveCustomersDashboard', tab: 'lifetime-value', hash: '#customer-lifetime-value', rootId: 'zc360-root', module: 'Customers 360°' },
    'customer segmentation': { controller: 'ZenveCustomersDashboard', tab: 'segmentation', hash: '#customer-segmentation', rootId: 'zc360-root', module: 'Customers 360°' },
    'customer orders': { controller: 'ZenveCustomersDashboard', tab: 'orders', hash: '#customer-orders', rootId: 'zc360-root', module: 'Customers 360°' },
    'customer revenue': { controller: 'ZenveCustomersDashboard', tab: 'revenue', hash: '#customer-revenue', rootId: 'zc360-root', module: 'Customers 360°' },
    'customer retention': { controller: 'ZenveCustomersDashboard', tab: 'retention', hash: '#customer-retention', rootId: 'zc360-root', module: 'Customers 360°' },
    'customer complaints': { controller: 'ZenveCustomersDashboard', tab: 'complaints', hash: '#customer-complaints', rootId: 'zc360-root', module: 'Customers 360°' },

    // Pets 360°
    'pets 360°': { controller: 'ZenvePetsDashboard', tab: 'all-pets', hash: '#all-pets', rootId: 'zpet-root', module: 'Pets 360°' },
    'pets 360': { controller: 'ZenvePetsDashboard', tab: 'all-pets', hash: '#all-pets', rootId: 'zpet-root', module: 'Pets 360°' },
    'pets 360° dashboard': { controller: 'ZenvePetsDashboard', tab: 'all-pets', hash: '#all-pets', rootId: 'zpet-root', module: 'Pets 360°' },
    'pets dashboard': { controller: 'ZenvePetsDashboard', tab: 'all-pets', hash: '#all-pets', rootId: 'zpet-root', module: 'Pets 360°' },
    'all pets': { controller: 'ZenvePetsDashboard', tab: 'all-pets', hash: '#all-pets', rootId: 'zpet-root', module: 'Pets 360°' },
    'pet profiles': { controller: 'ZenvePetsDashboard', tab: 'pet-profiles', hash: '#pet-profiles', rootId: 'zpet-root', module: 'Pets 360°' },
    'pet health records': { controller: 'ZenvePetsDashboard', tab: 'pet-health-records', hash: '#pet-health-records', rootId: 'zpet-root', module: 'Pets 360°' },
    'vaccination records': { controller: 'ZenvePetsDashboard', tab: 'vaccination-records', hash: '#vaccination-records', rootId: 'zpet-root', module: 'Pets 360°' },
    'treatment history': { controller: 'ZenvePetsDashboard', tab: 'treatment-history', hash: '#treatment-history', rootId: 'zpet-root', module: 'Pets 360°' },
    'prescription history': { controller: 'ZenvePetsDashboard', tab: 'prescription-history', hash: '#prescription-history', rootId: 'zpet-root', module: 'Pets 360°' },
    'purchase history': { controller: 'ZenvePetsDashboard', tab: 'purchase-history', hash: '#purchase-history', rootId: 'zpet-root', module: 'Pets 360°' },
    'pet analytics': { controller: 'ZenvePetsDashboard', tab: 'pet-analytics', hash: '#pet-analytics', rootId: 'zpet-root', module: 'Pets 360°' },
    'pet health insights': { controller: 'ZenvePetsDashboard', tab: 'pet-health-insights', hash: '#pet-health-insights', rootId: 'zpet-root', module: 'Pets 360°' },

    // Employees & HR
    'employees & hr': { controller: 'ZenveHRDashboard', tab: 'overview', hash: '#hr-dashboard', rootId: 'zhr-dashboard-root', module: 'Employees & HR' },
    'employees and hr': { controller: 'ZenveHRDashboard', tab: 'overview', hash: '#hr-dashboard', rootId: 'zhr-dashboard-root', module: 'Employees & HR' },
    'employees & hr dashboard': { controller: 'ZenveHRDashboard', tab: 'overview', hash: '#hr-dashboard', rootId: 'zhr-dashboard-root', module: 'Employees & HR' },
    'hr dashboard': { controller: 'ZenveHRDashboard', tab: 'overview', hash: '#hr-dashboard', rootId: 'zhr-dashboard-root', module: 'Employees & HR' },
    'all employees': { controller: 'ZenveHRDashboard', tab: 'directory', fallbackController: 'ZenveAllEmployees', hash: '#all-employees', rootId: 'zhr-dashboard-root', module: 'Employees & HR' },
    'departments': { controller: 'ZenveHRDashboard', tab: 'departments', fallbackController: 'ZenveDepartments', hash: '#departments', rootId: 'zhr-dashboard-root', module: 'Employees & HR' },
    'employee performance': { controller: 'ZenveHRDashboard', tab: 'performance', fallbackController: 'ZenveEmployeePerformance', hash: '#employee-performance', rootId: 'zhr-dashboard-root', module: 'Employees & HR' },
    'employee targets': { controller: 'ZenveHRDashboard', tab: 'targets', fallbackController: 'ZenveEmployeeTargets', hash: '#employee-targets', rootId: 'zhr-dashboard-root', module: 'Employees & HR' },
    'employee productivity': { controller: 'ZenveHRDashboard', tab: 'productivity', fallbackController: 'ZenveEmployeeProductivity', hash: '#employee-productivity', rootId: 'zhr-dashboard-root', module: 'Employees & HR' },
    'attendance': { controller: 'ZenveHRDashboard', tab: 'attendance', fallbackController: 'ZenveAttendance', hash: '#attendance', rootId: 'zhr-dashboard-root', module: 'Employees & HR' },
    'leave management': { controller: 'ZenveHRDashboard', tab: 'leaves', fallbackController: 'ZenveLeaveManagement', hash: '#leave-management', rootId: 'zhr-dashboard-root', module: 'Employees & HR' },
    'payroll': { controller: 'ZenveHRDashboard', tab: 'payroll', fallbackController: 'ZenvePayroll', hash: '#payroll', rootId: 'zhr-dashboard-root', module: 'Employees & HR' },
    'salary cost': { controller: 'ZenveHRDashboard', tab: 'salary-cost', fallbackController: 'ZenveSalaryCost', hash: '#salary-cost', rootId: 'zhr-dashboard-root', module: 'Employees & HR' },
    'recruitment': { controller: 'ZenveHRDashboard', tab: 'recruitment', fallbackController: 'ZenveRecruitment', hash: '#recruitment', rootId: 'zhr-dashboard-root', module: 'Employees & HR' },
    'onboarding': { controller: 'ZenveHRDashboard', tab: 'onboarding', fallbackController: 'ZenveOnboarding', hash: '#onboarding', rootId: 'zhr-dashboard-root', module: 'Employees & HR' },
    'employee expenses': { controller: 'ZenveHRDashboard', tab: 'expenses', fallbackController: 'ZenveEmployeeExpenses', hash: '#employee-expenses', rootId: 'zhr-dashboard-root', module: 'Employees & HR' },

    // Finance & Accounting
    'finance & accounting': { controller: 'ZenveFinanceDashboard', tab: 'dashboard', hash: '#finance-dashboard', rootId: 'zfa-root', module: 'Finance & Accounting' },
    'finance and accounting': { controller: 'ZenveFinanceDashboard', tab: 'dashboard', hash: '#finance-dashboard', rootId: 'zfa-root', module: 'Finance & Accounting' },
    'finance & accounting dashboard': { controller: 'ZenveFinanceDashboard', tab: 'dashboard', hash: '#finance-dashboard', rootId: 'zfa-root', module: 'Finance & Accounting' },
    'finance dashboard': { controller: 'ZenveFinanceDashboard', tab: 'dashboard', hash: '#finance-dashboard', rootId: 'zfa-root', module: 'Finance & Accounting' },
    'profit & loss': { controller: 'ZenveFinanceDashboard', tab: 'pnl', hash: '#profit-and-loss', rootId: 'zfa-root', module: 'Finance & Accounting' },
    'profit and loss': { controller: 'ZenveFinanceDashboard', tab: 'pnl', hash: '#profit-and-loss', rootId: 'zfa-root', module: 'Finance & Accounting' },
    'balance sheet': { controller: 'ZenveFinanceDashboard', tab: 'balance-sheet', hash: '#balance-sheet', rootId: 'zfa-root', module: 'Finance & Accounting' },
    'cash flow': { controller: 'ZenveFinanceDashboard', tab: 'cash-flow', hash: '#cash-flow', rootId: 'zfa-root', module: 'Finance & Accounting' },
    'revenue': { controller: 'ZenveFinanceDashboard', tab: 'revenue', hash: '#finance-revenue', rootId: 'zfa-root', module: 'Finance & Accounting' },
    'expenses': { controller: 'ZenveFinanceDashboard', tab: 'expenses', hash: '#finance-expenses', rootId: 'zfa-root', module: 'Finance & Accounting' },
    'cogs': { controller: 'ZenveFinanceDashboard', tab: 'cogs', hash: '#cogs', rootId: 'zfa-root', module: 'Finance & Accounting' },
    'gross profit': { controller: 'ZenveFinanceDashboard', tab: 'gross-profit', hash: '#gross-profit', rootId: 'zfa-root', module: 'Finance & Accounting' },
    'ebitda': { controller: 'ZenveFinanceDashboard', tab: 'ebitda', hash: '#ebitda', rootId: 'zfa-root', module: 'Finance & Accounting' },
    'net profit': { controller: 'ZenveFinanceDashboard', tab: 'net-profit', hash: '#net-profit', rootId: 'zfa-root', module: 'Finance & Accounting' },
    'accounts receivable': { controller: 'ZenveFinanceDashboard', tab: 'receivables', hash: '#accounts-receivable', rootId: 'zfa-root', module: 'Finance & Accounting' },
    'accounts payable': { controller: 'ZenveFinanceDashboard', tab: 'payables', hash: '#accounts-payable', rootId: 'zfa-root', module: 'Finance & Accounting' },
    'invoices': { controller: 'ZenveFinanceDashboard', tab: 'invoices', hash: '#invoices', rootId: 'zfa-root', module: 'Finance & Accounting' },
    'payments': { controller: 'ZenveFinanceDashboard', tab: 'payments', hash: '#payments', rootId: 'zfa-root', module: 'Finance & Accounting' },
    'refunds': { controller: 'ZenveFinanceDashboard', tab: 'refunds', hash: '#refunds', rootId: 'zfa-root', module: 'Finance & Accounting' },
    'taxes': { controller: 'ZenveFinanceDashboard', tab: 'taxes', hash: '#taxes', rootId: 'zfa-root', module: 'Finance & Accounting' },
    'financial forecast': { controller: 'ZenveFinanceDashboard', tab: 'forecast', hash: '#financial-forecast', rootId: 'zfa-root', module: 'Finance & Accounting' },
    'cost analysis': { controller: 'ZenveFinanceDashboard', tab: 'cost-analysis', hash: '#cost-analysis', rootId: 'zfa-root', module: 'Finance & Accounting' },

    // Marketing
    'marketing': { controller: 'ZenveMarketingDashboard', tab: 'overview', hash: '#marketing-dashboard', rootId: 'zmkt-dashboard-root', module: 'Marketing' },
    'marketing dashboard': { controller: 'ZenveMarketingDashboard', tab: 'overview', hash: '#marketing-dashboard', rootId: 'zmkt-dashboard-root', module: 'Marketing' },
    'campaigns': { controller: 'ZenveMarketingDashboard', tab: 'campaigns', hash: '#campaigns', rootId: 'zmkt-dashboard-root', module: 'Marketing' },
    'leads': { controller: 'ZenveMarketingDashboard', tab: 'leads', hash: '#leads', rootId: 'zmkt-dashboard-root', module: 'Marketing' },
    'lead sources': { controller: 'ZenveMarketingDashboard', tab: 'lead-sources', hash: '#lead-sources', rootId: 'zmkt-dashboard-root', module: 'Marketing' },
    'website analytics': { controller: 'ZenveMarketingDashboard', tab: 'website-analytics', hash: '#website-analytics', rootId: 'zmkt-dashboard-root', module: 'Marketing' },
    'app analytics': { controller: 'ZenveMarketingDashboard', tab: 'app-analytics', hash: '#app-analytics', rootId: 'zmkt-dashboard-root', module: 'Marketing' },
    'social media': { controller: 'ZenveMarketingDashboard', tab: 'social-media', hash: '#social-media', rootId: 'zmkt-dashboard-root', module: 'Marketing' },
    'advertising': { controller: 'ZenveMarketingDashboard', tab: 'advertising', hash: '#advertising', rootId: 'zmkt-dashboard-root', module: 'Marketing' },
    'marketing spend': { controller: 'ZenveMarketingDashboard', tab: 'marketing-spend', hash: '#marketing-spend', rootId: 'zmkt-dashboard-root', module: 'Marketing' },
    'customer acquisition': { controller: 'ZenveMarketingDashboard', tab: 'customer-acquisition', hash: '#customer-acquisition', rootId: 'zmkt-dashboard-root', module: 'Marketing' },
    'cac': { controller: 'ZenveMarketingDashboard', tab: 'cac', hash: '#cac', rootId: 'zmkt-dashboard-root', module: 'Marketing' },
    'roas': { controller: 'ZenveMarketingDashboard', tab: 'roas', hash: '#roas', rootId: 'zmkt-dashboard-root', module: 'Marketing' },
    'marketing roi': { controller: 'ZenveMarketingDashboard', tab: 'marketing-roi', hash: '#marketing-roi', rootId: 'zmkt-dashboard-root', module: 'Marketing' },
    'conversion funnel': { controller: 'ZenveMarketingDashboard', tab: 'conversion-funnel', hash: '#conversion-funnel', rootId: 'zmkt-dashboard-root', module: 'Marketing' },

    // Vendors & Procurement
    'vendors & procurement': { controller: 'ZenveVendorsDashboard', tab: 'dashboard', hash: '#vendor-dashboard', rootId: 'zvp-root', module: 'Vendors & Procurement' },
    'vendors and procurement': { controller: 'ZenveVendorsDashboard', tab: 'dashboard', hash: '#vendor-dashboard', rootId: 'zvp-root', module: 'Vendors & Procurement' },
    'vendors & procurement dashboard': { controller: 'ZenveVendorsDashboard', tab: 'dashboard', hash: '#vendor-dashboard', rootId: 'zvp-root', module: 'Vendors & Procurement' },
    'vendor dashboard': { controller: 'ZenveVendorsDashboard', tab: 'dashboard', hash: '#vendor-dashboard', rootId: 'zvp-root', module: 'Vendors & Procurement' },
    'all vendors': { controller: 'ZenveVendorsDashboard', tab: 'all-vendors', hash: '#all-vendors', rootId: 'zvp-root', module: 'Vendors & Procurement' },
    'vendor performance': { controller: 'ZenveVendorsDashboard', tab: 'vendor-perf', hash: '#vendor-performance', rootId: 'zvp-root', module: 'Vendors & Procurement' },
    'vendor payments': { controller: 'ZenveVendorsDashboard', tab: 'vendor-pay', hash: '#vendor-payments', rootId: 'zvp-root', module: 'Vendors & Procurement' },
    'purchase orders': { controller: 'ZenveVendorsDashboard', tab: 'purchase-orders', hash: '#purchase-orders', rootId: 'zvp-root', module: 'Vendors & Procurement' },
    'procurement': { controller: 'ZenveVendorsDashboard', tab: 'procurement', hash: '#procurement', rootId: 'zvp-root', module: 'Vendors & Procurement' },
    'purchase history': { controller: 'ZenveVendorsDashboard', tab: 'purchase-history', hash: '#purchase-history', rootId: 'zvp-root', module: 'Vendors & Procurement' },
    'supplier pricing': { controller: 'ZenveVendorsDashboard', tab: 'supplier-pricing', hash: '#supplier-pricing', rootId: 'zvp-root', module: 'Vendors & Procurement' },
    'supplier performance': { controller: 'ZenveVendorsDashboard', tab: 'supplier-perf', hash: '#supplier-performance', rootId: 'zvp-root', module: 'Vendors & Procurement' },
    'procurement savings': { controller: 'ZenveVendorsDashboard', tab: 'savings', hash: '#procurement-savings', rootId: 'zvp-root', module: 'Vendors & Procurement' },

    // Logistics & Delivery
    'logistics & delivery': { controller: 'ZenveLogisticsDashboard', tab: 'overview', hash: '#logistics-dashboard', rootId: 'zlog-dashboard-root', module: 'Logistics & Delivery' },
    'logistics and delivery': { controller: 'ZenveLogisticsDashboard', tab: 'overview', hash: '#logistics-dashboard', rootId: 'zlog-dashboard-root', module: 'Logistics & Delivery' },
    'logistics & delivery dashboard': { controller: 'ZenveLogisticsDashboard', tab: 'overview', hash: '#logistics-dashboard', rootId: 'zlog-dashboard-root', module: 'Logistics & Delivery' },
    'logistics dashboard': { controller: 'ZenveLogisticsDashboard', tab: 'overview', hash: '#logistics-dashboard', rootId: 'zlog-dashboard-root', module: 'Logistics & Delivery' },
    'delivery orders': { controller: 'ZenveLogisticsDashboard', tab: 'delivery-orders', hash: '#delivery-orders', rootId: 'zlog-dashboard-root', module: 'Logistics & Delivery' },
    'delivery partners': { controller: 'ZenveLogisticsDashboard', tab: 'delivery-partners', hash: '#delivery-partners', rootId: 'zlog-dashboard-root', module: 'Logistics & Delivery' },
    'delivery tracking': { controller: 'ZenveLogisticsDashboard', tab: 'delivery-tracking', hash: '#delivery-tracking', rootId: 'zlog-dashboard-root', module: 'Logistics & Delivery' },
    'delivery sla': { controller: 'ZenveLogisticsDashboard', tab: 'delivery-sla', hash: '#delivery-sla', rootId: 'zlog-dashboard-root', module: 'Logistics & Delivery' },
    'delivery cost': { controller: 'ZenveLogisticsDashboard', tab: 'delivery-cost', hash: '#delivery-cost', rootId: 'zlog-dashboard-root', module: 'Logistics & Delivery' },
    'failed deliveries': { controller: 'ZenveLogisticsDashboard', tab: 'failed-deliveries', hash: '#failed-deliveries', rootId: 'zlog-dashboard-root', module: 'Logistics & Delivery' },

    // Zenve Fashion
    'zenve fashion': { controller: 'ZenveFashionDashboard', tab: 'dashboard', hash: '#fashion-dashboard', rootId: 'zfsh-root', module: 'Zenve Fashion' },
    'fashion dashboard': { controller: 'ZenveFashionDashboard', tab: 'dashboard', hash: '#fashion-dashboard', rootId: 'zfsh-root', module: 'Zenve Fashion' },
    'fashion products': { controller: 'ZenveFashionDashboard', tab: 'products', hash: '#fashion-products', rootId: 'zfsh-root', module: 'Zenve Fashion' },
    'fashion orders': { controller: 'ZenveFashionDashboard', tab: 'orders', hash: '#fashion-orders', rootId: 'zfsh-root', module: 'Zenve Fashion' },
    'fashion customers': { controller: 'ZenveFashionDashboard', tab: 'customers', hash: '#fashion-customers', rootId: 'zfsh-root', module: 'Zenve Fashion' },
    'fashion inventory': { controller: 'ZenveFashionDashboard', tab: 'inventory', hash: '#fashion-inventory', rootId: 'zfsh-root', module: 'Zenve Fashion' },
    'fashion showrooms': { controller: 'ZenveFashionDashboard', tab: 'showrooms', hash: '#fashion-showrooms', rootId: 'zfsh-root', module: 'Zenve Fashion' },
    'online fashion sales': { controller: 'ZenveFashionDashboard', tab: 'online-sales', hash: '#online-fashion-sales', rootId: 'zfsh-root', module: 'Zenve Fashion' },
    'fashion revenue': { controller: 'ZenveFashionDashboard', tab: 'revenue', hash: '#fashion-revenue', rootId: 'zfsh-root', module: 'Zenve Fashion' },
    'fashion profitability': { controller: 'ZenveFashionDashboard', tab: 'profitability', hash: '#fashion-profitability', rootId: 'zfsh-root', module: 'Zenve Fashion' },

    // B2B / Enterprise
    'b2b / enterprise': { controller: 'ZenveB2BDashboard', tab: 'dashboard', hash: '#b2b-dashboard', rootId: 'zb2b-root', module: 'B2B / Enterprise' },
    'b2b enterprise': { controller: 'ZenveB2BDashboard', tab: 'dashboard', hash: '#b2b-dashboard', rootId: 'zb2b-root', module: 'B2B / Enterprise' },
    'b2b dashboard': { controller: 'ZenveB2BDashboard', tab: 'dashboard', hash: '#b2b-dashboard', rootId: 'zb2b-root', module: 'B2B / Enterprise' },
    'enterprise customers': { controller: 'ZenveB2BDashboard', tab: 'customers', hash: '#enterprise-customers', rootId: 'zb2b-root', module: 'B2B / Enterprise' },
    'corporate accounts': { controller: 'ZenveB2BDashboard', tab: 'accounts', hash: '#corporate-accounts', rootId: 'zb2b-root', module: 'B2B / Enterprise' },
    'b2b orders': { controller: 'ZenveB2BDashboard', tab: 'orders', hash: '#b2b-orders', rootId: 'zb2b-root', module: 'B2B / Enterprise' },
    'b2b sales': { controller: 'ZenveB2BDashboard', tab: 'sales', hash: '#b2b-sales', rootId: 'zb2b-root', module: 'B2B / Enterprise' },
    'b2b revenue': { controller: 'ZenveB2BDashboard', tab: 'revenue', hash: '#b2b-revenue', rootId: 'zb2b-root', module: 'B2B / Enterprise' },
    'contracts': { controller: 'ZenveB2BDashboard', tab: 'contracts', hash: '#contracts', rootId: 'zb2b-root', module: 'B2B / Enterprise' },
    'enterprise pricing': { controller: 'ZenveB2BDashboard', tab: 'pricing', hash: '#enterprise-pricing', rootId: 'zb2b-root', module: 'B2B / Enterprise' },
    'b2b receivables': { controller: 'ZenveB2BDashboard', tab: 'receivables', hash: '#b2b-receivables', rootId: 'zb2b-root', module: 'B2B / Enterprise' },

    // Import & Export
    'import & export': { controller: 'ZenveImportExportDashboard', tab: 'import-dashboard', hash: '#import-dashboard', rootId: 'zix-root', module: 'Import & Export' },
    'import and export': { controller: 'ZenveImportExportDashboard', tab: 'import-dashboard', hash: '#import-dashboard', rootId: 'zix-root', module: 'Import & Export' },
    'import dashboard': { controller: 'ZenveImportExportDashboard', tab: 'import-dashboard', hash: '#import-dashboard', rootId: 'zix-root', module: 'Import & Export' },
    'export dashboard': { controller: 'ZenveImportExportDashboard', tab: 'export-dashboard', hash: '#export-dashboard', rootId: 'zix-root', module: 'Import & Export' },
    'import orders': { controller: 'ZenveImportExportDashboard', tab: 'import-orders', hash: '#import-orders', rootId: 'zix-root', module: 'Import & Export' },
    'export orders': { controller: 'ZenveImportExportDashboard', tab: 'export-orders', hash: '#export-orders', rootId: 'zix-root', module: 'Import & Export' },
    'suppliers': { controller: 'ZenveImportExportDashboard', tab: 'suppliers', hash: '#suppliers', rootId: 'zix-root', module: 'Import & Export' },
    'buyers': { controller: 'ZenveImportExportDashboard', tab: 'buyers', hash: '#buyers', rootId: 'zix-root', module: 'Import & Export' },
    'customs & documentation': { controller: 'ZenveImportExportDashboard', tab: 'customs', hash: '#customs', rootId: 'zix-root', module: 'Import & Export' },
    'logistics': { controller: 'ZenveImportExportDashboard', tab: 'logistics', hash: '#import-logistics', rootId: 'zix-root', module: 'Import & Export' },
    'import/export profitability': { controller: 'ZenveImportExportDashboard', tab: 'profitability', hash: '#trade-profitability', rootId: 'zix-root', module: 'Import & Export' },

    // Subscriptions
    'subscriptions': { controller: 'ZenveSubscriptionsDashboard', tab: 'dashboard', hash: '#subscription-dashboard', rootId: 'zsub-root', module: 'Subscriptions' },
    'subscription dashboard': { controller: 'ZenveSubscriptionsDashboard', tab: 'dashboard', hash: '#subscription-dashboard', rootId: 'zsub-root', module: 'Subscriptions' },
    'subscriptions dashboard': { controller: 'ZenveSubscriptionsDashboard', tab: 'dashboard', hash: '#subscription-dashboard', rootId: 'zsub-root', module: 'Subscriptions' },
    'active subscriptions': { controller: 'ZenveSubscriptionsDashboard', tab: 'active', hash: '#active-subscriptions', rootId: 'zsub-root', module: 'Subscriptions' },
    'new subscriptions': { controller: 'ZenveSubscriptionsDashboard', tab: 'new', hash: '#new-subscriptions', rootId: 'zsub-root', module: 'Subscriptions' },
    'renewals': { controller: 'ZenveSubscriptionsDashboard', tab: 'renewals', hash: '#renewals', rootId: 'zsub-root', module: 'Subscriptions' },
    'expiring subscriptions': { controller: 'ZenveSubscriptionsDashboard', tab: 'expiring', hash: '#expiring-subscriptions', rootId: 'zsub-root', module: 'Subscriptions' },
    'churn': { controller: 'ZenveSubscriptionsDashboard', tab: 'churn', hash: '#churn', rootId: 'zsub-root', module: 'Subscriptions' },
    'subscription revenue': { controller: 'ZenveSubscriptionsDashboard', tab: 'revenue', hash: '#subscription-revenue', rootId: 'zsub-root', module: 'Subscriptions' },
    'subscription analytics': { controller: 'ZenveSubscriptionsDashboard', tab: 'analytics', hash: '#subscription-analytics', rootId: 'zsub-root', module: 'Subscriptions' },

    // Reports & Analytics
    'reports & analytics': { controller: 'ZenveReportsDashboard', tab: 'sales', hash: '#sales-reports', rootId: 'zrep-root', module: 'Reports & Analytics' },
    'reports and analytics': { controller: 'ZenveReportsDashboard', tab: 'sales', hash: '#sales-reports', rootId: 'zrep-root', module: 'Reports & Analytics' },
    'sales reports': { controller: 'ZenveReportsDashboard', tab: 'sales', hash: '#sales-reports', rootId: 'zrep-root', module: 'Reports & Analytics' },
    'revenue reports': { controller: 'ZenveReportsDashboard', tab: 'revenue', hash: '#revenue-reports', rootId: 'zrep-root', module: 'Reports & Analytics' },
    'customer reports': { controller: 'ZenveReportsDashboard', tab: 'customer', hash: '#customer-reports', rootId: 'zrep-root', module: 'Reports & Analytics' },
    'pet reports': { controller: 'ZenveReportsDashboard', tab: 'pet', hash: '#pet-reports', rootId: 'zrep-root', module: 'Reports & Analytics' },
    'doctor reports': { controller: 'ZenveReportsDashboard', tab: 'doctor', hash: '#doctor-reports', rootId: 'zrep-root', module: 'Reports & Analytics' },
    'clinic reports': { controller: 'ZenveReportsDashboard', tab: 'clinic', hash: '#clinic-reports', rootId: 'zrep-root', module: 'Reports & Analytics' },
    'product reports': { controller: 'ZenveReportsDashboard', tab: 'product', hash: '#product-reports', rootId: 'zrep-root', module: 'Reports & Analytics' },
    'inventory reports': { controller: 'ZenveReportsDashboard', tab: 'inventory', hash: '#inventory-reports', rootId: 'zrep-root', module: 'Reports & Analytics' },
    'finance reports': { controller: 'ZenveReportsDashboard', tab: 'finance', hash: '#finance-reports', rootId: 'zrep-root', module: 'Reports & Analytics' },
    'hr reports': { controller: 'ZenveReportsDashboard', tab: 'hr', hash: '#hr-reports', rootId: 'zrep-root', module: 'Reports & Analytics' },
    'marketing reports': { controller: 'ZenveReportsDashboard', tab: 'marketing', hash: '#marketing-reports', rootId: 'zrep-root', module: 'Reports & Analytics' },
    'operations reports': { controller: 'ZenveReportsDashboard', tab: 'operations', hash: '#operations-reports', rootId: 'zrep-root', module: 'Reports & Analytics' },
    'vendor reports': { controller: 'ZenveReportsDashboard', tab: 'vendor', hash: '#vendor-reports', rootId: 'zrep-root', module: 'Reports & Analytics' },
    'custom reports': { controller: 'ZenveReportsDashboard', tab: 'custom', hash: '#custom-reports', rootId: 'zrep-root', module: 'Reports & Analytics' },
    'scheduled reports': { controller: 'ZenveReportsDashboard', tab: 'scheduled', hash: '#scheduled-reports', rootId: 'zrep-root', module: 'Reports & Analytics' },

    // AI Assistant
    'ai assistant': { controller: 'ZenveAIAssistant', tab: 'ask-ai', hash: '#ask-ai', rootId: 'zai-root', module: 'AI Assistant' },
    'ask zenve ai': { controller: 'ZenveAIAssistant', tab: 'ask-ai', hash: '#ask-ai', rootId: 'zai-root', module: 'AI Assistant' },
    'business insights': { controller: 'ZenveAIAssistant', tab: 'insights', hash: '#business-insights', rootId: 'zai-root', module: 'AI Assistant' },
    'revenue intelligence': { controller: 'ZenveAIAssistant', tab: 'revenue', hash: '#revenue-intelligence', rootId: 'zai-root', module: 'AI Assistant' },
    'demand forecast': { controller: 'ZenveAIAssistant', tab: 'demand', hash: '#demand-forecast', rootId: 'zai-root', module: 'AI Assistant' },
    'inventory prediction': { controller: 'ZenveAIAssistant', tab: 'inventory', hash: '#inventory-prediction', rootId: 'zai-root', module: 'AI Assistant' },
    'customer prediction': { controller: 'ZenveAIAssistant', tab: 'customer', hash: '#customer-prediction', rootId: 'zai-root', module: 'AI Assistant' },
    'churn prediction': { controller: 'ZenveAIAssistant', tab: 'churn', hash: '#churn-prediction', rootId: 'zai-root', module: 'AI Assistant' },
    'profit prediction': { controller: 'ZenveAIAssistant', tab: 'profit', hash: '#profit-prediction', rootId: 'zai-root', module: 'AI Assistant' },
    'anomaly detection': { controller: 'ZenveAIAssistant', tab: 'anomaly', hash: '#anomaly-detection', rootId: 'zai-root', module: 'AI Assistant' },
    'ai recommendations': { controller: 'ZenveAIAssistant', tab: 'recommendations', hash: '#ai-recommendations', rootId: 'zai-root', module: 'AI Assistant' },

    // Alerts & Notifications
    'alerts & notifications': { controller: 'ZenveAlertsDashboard', tab: 'critical', hash: '#critical-alerts', rootId: 'zalt-root', module: 'Alerts & Notifications' },
    'alerts and notifications': { controller: 'ZenveAlertsDashboard', tab: 'critical', hash: '#critical-alerts', rootId: 'zalt-root', module: 'Alerts & Notifications' },
    'critical alerts': { controller: 'ZenveAlertsDashboard', tab: 'critical', hash: '#critical-alerts', rootId: 'zalt-root', module: 'Alerts & Notifications' },
    'revenue alerts': { controller: 'ZenveAlertsDashboard', tab: 'revenue', hash: '#revenue-alerts', rootId: 'zalt-root', module: 'Alerts & Notifications' },
    'inventory alerts': { controller: 'ZenveAlertsDashboard', tab: 'inventory', hash: '#inventory-alerts', rootId: 'zalt-root', module: 'Alerts & Notifications' },
    'payment alerts': { controller: 'ZenveAlertsDashboard', tab: 'payment', hash: '#payment-alerts', rootId: 'zalt-root', module: 'Alerts & Notifications' },
    'order alerts': { controller: 'ZenveAlertsDashboard', tab: 'order', hash: '#order-alerts', rootId: 'zalt-root', module: 'Alerts & Notifications' },
    'delivery alerts': { controller: 'ZenveAlertsDashboard', tab: 'delivery', hash: '#delivery-alerts', rootId: 'zalt-root', module: 'Alerts & Notifications' },
    'finance alerts': { controller: 'ZenveAlertsDashboard', tab: 'finance', hash: '#finance-alerts', rootId: 'zalt-root', module: 'Alerts & Notifications' },
    'hr alerts': { controller: 'ZenveAlertsDashboard', tab: 'hr', hash: '#hr-alerts', rootId: 'zalt-root', module: 'Alerts & Notifications' },
    'system alerts': { controller: 'ZenveAlertsDashboard', tab: 'system', hash: '#system-alerts', rootId: 'zalt-root', module: 'Alerts & Notifications' },
    'alert rules': { controller: 'ZenveAlertsDashboard', tab: 'rules', hash: '#alert-rules', rootId: 'zalt-root', module: 'Alerts & Notifications' },
    'notification center': { controller: 'ZenveAlertsDashboard', tab: 'notifs', hash: '#notification-center', rootId: 'zalt-root', module: 'Alerts & Notifications' },

    // Audit & Compliance
    'audit & compliance': { controller: 'ZenveAudit', tab: 'audit-log', hash: '#audit-log', rootId: 'zaud-root', module: 'Audit & Compliance' },
    'audit and compliance': { controller: 'ZenveAudit', tab: 'audit-log', hash: '#audit-log', rootId: 'zaud-root', module: 'Audit & Compliance' },
    'audit log': { controller: 'ZenveAudit', tab: 'audit-log', hash: '#audit-log', rootId: 'zaud-root', module: 'Audit & Compliance' },
    'user activity': { controller: 'ZenveAudit', tab: 'user-activity', hash: '#user-activity', rootId: 'zaud-root', module: 'Audit & Compliance' },
    'login history': { controller: 'ZenveAudit', tab: 'login-history', hash: '#login-history', rootId: 'zaud-root', module: 'Audit & Compliance' },
    'data changes': { controller: 'ZenveAudit', tab: 'data-changes', hash: '#data-changes', rootId: 'zaud-root', module: 'Audit & Compliance' },
    'financial audit trail': { controller: 'ZenveAudit', tab: 'financial-audit', hash: '#financial-audit', rootId: 'zaud-root', module: 'Audit & Compliance' },
    'order audit trail': { controller: 'ZenveAudit', tab: 'order-audit', hash: '#order-audit', rootId: 'zaud-root', module: 'Audit & Compliance' },
    'inventory audit trail': { controller: 'ZenveAudit', tab: 'inventory-audit', hash: '#inventory-audit', rootId: 'zaud-root', module: 'Audit & Compliance' },
    'approval history': { controller: 'ZenveAudit', tab: 'approval-history', hash: '#approval-history', rootId: 'zaud-root', module: 'Audit & Compliance' },
    'compliance dashboard': { controller: 'ZenveAudit', tab: 'compliance', hash: '#compliance-dashboard', rootId: 'zaud-root', module: 'Audit & Compliance' },

    // System Health
    'system health': { controller: 'ZenveSystemHealth', tab: 'app', hash: '#app-health', rootId: 'zsys-root', module: 'System Health' },
    'system health dashboard': { controller: 'ZenveSystemHealth', tab: 'app', hash: '#app-health', rootId: 'zsys-root', module: 'System Health' },
    'application health': { controller: 'ZenveSystemHealth', tab: 'app', hash: '#app-health', rootId: 'zsys-root', module: 'System Health' },
    'api health': { controller: 'ZenveSystemHealth', tab: 'api', hash: '#api-health', rootId: 'zsys-root', module: 'System Health' },
    'database health': { controller: 'ZenveSystemHealth', tab: 'db', hash: '#db-health', rootId: 'zsys-root', module: 'System Health' },
    'payment gateway': { controller: 'ZenveSystemHealth', tab: 'payment', hash: '#payment-gateway', rootId: 'zsys-root', module: 'System Health' },
    'crm status': { controller: 'ZenveSystemHealth', tab: 'crm', hash: '#crm-status', rootId: 'zsys-root', module: 'System Health' },
    'inventory system': { controller: 'ZenveSystemHealth', tab: 'inventory', hash: '#inventory-system', rootId: 'zsys-root', module: 'System Health' },
    'accounting system': { controller: 'ZenveSystemHealth', tab: 'accounting', hash: '#accounting-system', rootId: 'zsys-root', module: 'System Health' },
    'marketing integrations': { controller: 'ZenveSystemHealth', tab: 'marketing', hash: '#marketing-integrations', rootId: 'zsys-root', module: 'System Health' },
    'notification services': { controller: 'ZenveSystemHealth', tab: 'notifications', hash: '#notification-services', rootId: 'zsys-root', module: 'System Health' },
    'integration logs': { controller: 'ZenveSystemHealth', tab: 'logs', hash: '#integration-logs', rootId: 'zsys-root', module: 'System Health' },

    // Settings
    'settings': { controller: 'ZenveSettingsDashboard', tab: 'company', hash: '#company-settings', rootId: 'zset-root', module: 'Settings' },
    'settings dashboard': { controller: 'ZenveSettingsDashboard', tab: 'company', hash: '#company-settings', rootId: 'zset-root', module: 'Settings' },
    'company settings': { controller: 'ZenveSettingsDashboard', tab: 'company', hash: '#company-settings', rootId: 'zset-root', module: 'Settings' },
    'business units': { controller: 'ZenveSettingsDashboard', tab: 'units', hash: '#business-units', rootId: 'zset-root', module: 'Settings' },
    'locations': { controller: 'ZenveSettingsDashboard', tab: 'locations', hash: '#locations', rootId: 'zset-root', module: 'Settings' },
    'users': { controller: 'ZenveSettingsDashboard', tab: 'users', hash: '#users', rootId: 'zset-root', module: 'Settings' },
    'roles & permissions': { controller: 'ZenveSettingsDashboard', tab: 'roles', hash: '#roles-permissions', rootId: 'zset-root', module: 'Settings' },
    'approval workflows': { controller: 'ZenveSettingsDashboard', tab: 'workflows', hash: '#approval-workflows', rootId: 'zset-root', module: 'Settings' },
    'notification settings': { controller: 'ZenveSettingsDashboard', tab: 'notifications', hash: '#notification-settings', rootId: 'zset-root', module: 'Settings' },
    'dashboard settings': { controller: 'ZenveSettingsDashboard', tab: 'dashboard-settings', hash: '#dashboard-settings', rootId: 'zset-root', module: 'Settings' },
    'tax settings': { controller: 'ZenveSettingsDashboard', tab: 'tax', hash: '#tax-settings', rootId: 'zset-root', module: 'Settings' },
    'payment settings': { controller: 'ZenveSettingsDashboard', tab: 'payments', hash: '#payment-settings', rootId: 'zset-root', module: 'Settings' },
    'delivery settings': { controller: 'ZenveSettingsDashboard', tab: 'delivery', hash: '#delivery-settings', rootId: 'zset-root', module: 'Settings' },
    'api & integrations': { controller: 'ZenveSettingsDashboard', tab: 'integrations', hash: '#api-integrations', rootId: 'zset-root', module: 'Settings' },
    'security': { controller: 'ZenveSettingsDashboard', tab: 'security', hash: '#security-settings', rootId: 'zset-root', module: 'Settings' },
    'backup & recovery': { controller: 'ZenveSettingsDashboard', tab: 'backup', hash: '#backup-recovery', rootId: 'zset-root', module: 'Settings' }
  };

  var MODULE_MAP = {
    'executive dashboard': { controller: 'ZenveExecutiveDashboard', tab: 'dashboard', hash: '#executive-dashboard', rootId: 'zexec-root', label: 'Executive Dashboard' },
    'revenue & sales': { controller: 'ZenveSalesDashboard', tab: 'sales', hash: '#sales-dashboard', rootId: 'zsd-root', label: 'Revenue & Sales' },
    'revenue and sales': { controller: 'ZenveSalesDashboard', tab: 'sales', hash: '#sales-dashboard', rootId: 'zsd-root', label: 'Revenue & Sales' },
    'orders & operations': { controller: 'ZenveOperationsDashboard', tab: 'overview', hash: '#operations-dashboard', rootId: 'zod-root', label: 'Orders & Operations' },
    'orders and operations': { controller: 'ZenveOperationsDashboard', tab: 'overview', hash: '#operations-dashboard', rootId: 'zod-root', label: 'Orders & Operations' },
    'products & inventory': { controller: 'ZenveProductsInventory', tab: 'catalog', hash: '#product-catalog', rootId: 'zpid-root', label: 'Products & Inventory' },
    'products and inventory': { controller: 'ZenveProductsInventory', tab: 'catalog', hash: '#product-catalog', rootId: 'zpid-root', label: 'Products & Inventory' },
    'pharmacy': { controller: 'ZenvePharmacyDashboard', tab: 'dashboard', hash: '#pharmacy-dashboard', rootId: 'zph-root', label: 'Pharmacy' },
    'veterinary services': { controller: 'ZenveVeterinaryDashboard', tab: 'overview', hash: '#services-dashboard', rootId: 'zvs-root', label: 'Veterinary Services' },
    'doctors': { controller: 'ZenveDoctorsDashboard', tab: 'dashboard', hash: '#doctors-dashboard', rootId: 'zdoc-root', label: 'Doctors' },
    'clinics & hospitals': { controller: 'ZenveClinicsDashboard', tab: 'dashboard', hash: '#clinics-dashboard', rootId: 'zch-root', label: 'Clinics & Hospitals' },
    'clinics and hospitals': { controller: 'ZenveClinicsDashboard', tab: 'dashboard', hash: '#clinics-dashboard', rootId: 'zch-root', label: 'Clinics & Hospitals' },
    'customers 360°': { controller: 'ZenveCustomersDashboard', tab: 'dashboard', hash: '#customer-dashboard', rootId: 'zc360-root', label: 'Customers 360°' },
    'customers 360': { controller: 'ZenveCustomersDashboard', tab: 'dashboard', hash: '#customer-dashboard', rootId: 'zc360-root', label: 'Customers 360°' },
    'pets 360°': { controller: 'ZenvePetsDashboard', tab: 'all-pets', hash: '#all-pets', rootId: 'zpet-root', label: 'Pets 360°' },
    'pets 360': { controller: 'ZenvePetsDashboard', tab: 'all-pets', hash: '#all-pets', rootId: 'zpet-root', label: 'Pets 360°' },
    'employees & hr': { controller: 'ZenveHRDashboard', tab: 'overview', hash: '#hr-dashboard', rootId: 'zhr-dashboard-root', label: 'Employees & HR' },
    'employees and hr': { controller: 'ZenveHRDashboard', tab: 'overview', hash: '#hr-dashboard', rootId: 'zhr-dashboard-root', label: 'Employees & HR' },
    'finance & accounting': { controller: 'ZenveFinanceDashboard', tab: 'dashboard', hash: '#finance-dashboard', rootId: 'zfa-root', label: 'Finance & Accounting' },
    'finance and accounting': { controller: 'ZenveFinanceDashboard', tab: 'dashboard', hash: '#finance-dashboard', rootId: 'zfa-root', label: 'Finance & Accounting' },
    'marketing': { controller: 'ZenveMarketingDashboard', tab: 'overview', hash: '#marketing-dashboard', rootId: 'zmkt-dashboard-root', label: 'Marketing' },
    'vendors & procurement': { controller: 'ZenveVendorsDashboard', tab: 'dashboard', hash: '#vendor-dashboard', rootId: 'zvp-root', label: 'Vendors & Procurement' },
    'vendors and procurement': { controller: 'ZenveVendorsDashboard', tab: 'dashboard', hash: '#vendor-dashboard', rootId: 'zvp-root', label: 'Vendors & Procurement' },
    'logistics & delivery': { controller: 'ZenveLogisticsDashboard', tab: 'overview', hash: '#logistics-dashboard', rootId: 'zlog-dashboard-root', label: 'Logistics & Delivery' },
    'logistics and delivery': { controller: 'ZenveLogisticsDashboard', tab: 'overview', hash: '#logistics-dashboard', rootId: 'zlog-dashboard-root', label: 'Logistics & Delivery' },
    'zenve fashion': { controller: 'ZenveFashionDashboard', tab: 'dashboard', hash: '#fashion-dashboard', rootId: 'zfsh-root', label: 'Zenve Fashion' },
    'b2b / enterprise': { controller: 'ZenveB2BDashboard', tab: 'dashboard', hash: '#b2b-dashboard', rootId: 'zb2b-root', label: 'B2B / Enterprise' },
    'b2b enterprise': { controller: 'ZenveB2BDashboard', tab: 'dashboard', hash: '#b2b-dashboard', rootId: 'zb2b-root', label: 'B2B / Enterprise' },
    'import & export': { controller: 'ZenveImportExportDashboard', tab: 'import-dashboard', hash: '#import-dashboard', rootId: 'zix-root', label: 'Import & Export' },
    'import and export': { controller: 'ZenveImportExportDashboard', tab: 'import-dashboard', hash: '#import-dashboard', rootId: 'zix-root', label: 'Import & Export' },
    'subscriptions': { controller: 'ZenveSubscriptionsDashboard', tab: 'dashboard', hash: '#subscription-dashboard', rootId: 'zsub-root', label: 'Subscriptions' },
    'reports & analytics': { controller: 'ZenveReportsDashboard', tab: 'sales', hash: '#sales-reports', rootId: 'zrep-root', label: 'Reports & Analytics' },
    'reports and analytics': { controller: 'ZenveReportsDashboard', tab: 'sales', hash: '#sales-reports', rootId: 'zrep-root', label: 'Reports & Analytics' },
    'ai assistant': { controller: 'ZenveAIAssistant', tab: 'ask-ai', hash: '#ask-ai', rootId: 'zai-root', label: 'AI Assistant' },
    'alerts & notifications': { controller: 'ZenveAlertsDashboard', tab: 'critical', hash: '#critical-alerts', rootId: 'zalt-root', label: 'Alerts & Notifications' },
    'alerts and notifications': { controller: 'ZenveAlertsDashboard', tab: 'critical', hash: '#critical-alerts', rootId: 'zalt-root', label: 'Alerts & Notifications' },
    'audit & compliance': { controller: 'ZenveAudit', tab: 'audit-log', hash: '#audit-log', rootId: 'zaud-root', label: 'Audit & Compliance' },
    'audit and compliance': { controller: 'ZenveAudit', tab: 'audit-log', hash: '#audit-log', rootId: 'zaud-root', label: 'Audit & Compliance' },
    'system health': { controller: 'ZenveSystemHealth', tab: 'app', hash: '#app-health', rootId: 'zsys-root', label: 'System Health' },
    'settings': { controller: 'ZenveSettingsDashboard', tab: 'company', hash: '#company-settings', rootId: 'zset-root', label: 'Settings' }
  };

  var CONTROLLERS = [
    'ZenveSalesDashboard', 'ZenveSalesFunnel', 'ZenveTargets', 'ZenveForecast',
    'ZenveOperationsDashboard', 'ZenveProductsInventory', 'ZenvePharmacyDashboard',
    'ZenveDoctorsDashboard', 'ZenveClinicsDashboard', 'ZenveVeterinaryDashboard',
    'ZenveCustomersDashboard', 'ZenvePetsDashboard', 'ZenveHRDashboard',
    'ZenveFinanceDashboard', 'ZenveMarketingDashboard', 'ZenveVendorsDashboard',
    'ZenveLogisticsDashboard', 'ZenveFashionDashboard', 'ZenveB2BDashboard',
    'ZenveImportExportDashboard', 'ZenveSubscriptionsDashboard', 'ZenveReportsDashboard',
    'ZenveAIAssistant', 'ZenveAlertsDashboard', 'ZenveAudit', 'ZenveSystemHealth',
    'ZenveSettingsDashboard', 'ZenveExecutiveDashboard', 'ZenveAllEmployees',
    'ZenveAttendance', 'ZenveDepartments', 'ZenveEmployeeExpenses',
    'ZenveEmployeePerformance', 'ZenveEmployeeProductivity', 'ZenveEmployeeTargets',
    'ZenveLeaveManagement', 'ZenveOnboarding', 'ZenvePayroll', 'ZenveRecruitment',
    'ZenveSalaryCost'
  ];

  function ensureReturnButton() {
    var btn = document.getElementById('zenve-global-return-btn');
    if (!btn) {
      btn = document.createElement('button');
      btn.id = 'zenve-global-return-btn';
      btn.type = 'button';
      btn.innerHTML = '<svg style="width:14px;height:14px;display:inline-block;vertical-align:-2px;margin-right:6px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg> Executive Center';
      btn.style.cssText = 'position:fixed;bottom:24px;left:240px;z-index:9999;display:none;align-items:center;padding:8px 16px;background:rgba(15,23,42,0.88);color:#38bdf8;border:1px solid rgba(56,189,248,0.3);border-radius:9999px;font-size:12px;font-weight:600;font-family:inherit;cursor:pointer;backdrop-filter:blur(12px);box-shadow:0 10px 25px -5px rgba(0,0,0,0.5),0 0 15px rgba(56,189,248,0.15);transition:all 0.2s;';
      btn.onmouseenter = function () {
        btn.style.background = 'rgba(56,189,248,0.2)';
        btn.style.borderColor = 'rgba(56,189,248,0.6)';
        btn.style.transform = 'translateY(-2px)';
      };
      btn.onmouseleave = function () {
        btn.style.background = 'rgba(15,23,42,0.88)';
        btn.style.borderColor = 'rgba(56,189,248,0.3)';
        btn.style.transform = 'translateY(0)';
      };
      btn.onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();
        closeAllDashboards();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };
      document.body.appendChild(btn);
    }
    return btn;
  }

  function closeAllDashboards(exceptRootId) {
    CONTROLLERS.forEach(function (name) {
      try {
        var c = window[name];
        if (c && typeof c.close === 'function') {
          var rId = CONTROLLER_ROOT_MAP[name];
          if (!exceptRootId || rId !== exceptRootId) {
            c.close();
          }
        }
      } catch (e) {}
    });

    ROOT_IDS.forEach(function (id) {
      if (exceptRootId && id === exceptRootId) return;
      try {
        var el = document.getElementById(id);
        if (el) {
          OPEN_CLASSES.forEach(function (cls) { el.classList.remove(cls); });
          el.style.display = 'none';
        }
      } catch (e) {}
    });

    try {
      document.querySelectorAll('[role="dialog"]').forEach(function (d) {
        try { d.remove(); } catch (e) {}
      });
      document.querySelectorAll('[data-radix-focus-guard], [data-radix-popper-content-wrapper], [data-radix-portal]').forEach(function (g) {
        try { g.remove(); } catch (e) {}
      });
      document.body.style.pointerEvents = '';
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.removeAttribute('data-scroll-locked');
    } catch (e) {}

    var btn = ensureReturnButton();
    if (btn && !exceptRootId) btn.style.display = 'none';

    try {
      if (!exceptRootId && window.location.hash && window.location.hash !== '#' && window.location.hash !== '#overview') {
        history.replaceState(null, document.title, window.location.pathname + window.location.search);
      }
    } catch (e) {}
  }

  // Synchronize sidebar accordion expansion & sub-item active highlights
  function syncSidebar(targetModule, targetSubText) {
    if (!targetModule && !targetSubText) return;
    var normMod = (targetModule || '').trim().toLowerCase();
    var normSub = (targetSubText || '').trim().toLowerCase();

    // 1. Expand matching section accordion if not expanded
    var navItems = document.querySelectorAll('.sidebar-nav-item');
    navItems.forEach(function (btn) {
      var d = (btn.getAttribute('data-domain') || '').trim().toLowerCase();
      var isTarget = (d === normMod || (normMod && (d.indexOf(normMod) >= 0 || normMod.indexOf(d) >= 0)));
      if (isTarget) {
        btn.classList.add('sidebar-nav-active');
        btn.setAttribute('aria-expanded', 'true');
        var chevron = btn.querySelector('.sidebar-chevron');
        if (chevron) chevron.classList.add('rotate-90');

        // Make sure its submenu container is shown
        var parentDiv = btn.parentElement;
        var submenu = parentDiv ? parentDiv.querySelector('.sidebar-submenu-box') : null;
        if (submenu) submenu.style.display = 'block';
      } else {
        btn.classList.remove('sidebar-nav-active');
      }
    });

    // 2. Mark active sub-item in sidebar
    if (normSub) {
      var subItems = document.querySelectorAll('.sidebar-sub-item');
      subItems.forEach(function (sub) {
        var sTxt = (sub.textContent || '').replace(/^[•·●\s]+/, '').trim().toLowerCase();
        var matches = (sTxt === normSub || sTxt.indexOf(normSub) >= 0 || normSub.indexOf(sTxt) >= 0);
        if (matches) {
          sub.classList.add('sidebar-sub-item-active');
          sub.style.color = '#38bdf8';
          sub.style.fontWeight = '600';
          var dot = sub.querySelector('.sidebar-dot');
          if (dot) dot.style.background = '#38bdf8';
        } else {
          sub.classList.remove('sidebar-sub-item-active');
          sub.style.removeProperty('color');
          sub.style.removeProperty('font-weight');
          var dot2 = sub.querySelector('.sidebar-dot');
          if (dot2) dot2.style.removeProperty('background');
        }
      });
    }
  }

  function openDashboard(moduleLabel, itemName) {
    var rawItem = (itemName || '').trim();
    rawItem = rawItem.replace(/^[•·●\s]+/, '').trim();
    var itemKey = rawItem.toLowerCase();
    var modKey = (moduleLabel || '').trim().toLowerCase();

    // Disambiguation for shared names (e.g. 60-Minute Delivery & Delivery Performance)
    if (modKey && (modKey.indexOf('logistics') >= 0 || modKey.indexOf('delivery') >= 0)) {
      if (itemKey === '60-minute delivery') itemKey = '60-minute delivery (logistics)';
      if (itemKey === 'delivery performance') itemKey = 'delivery performance (logistics)';
    }

    // Direct lookup in ROUTE_MAP
    var route = ROUTE_MAP[itemKey];

    // Check with module prefix (e.g. "Products & Inventory > Product Catalog")
    if (!route && modKey) {
      route = ROUTE_MAP[modKey + ' > ' + itemKey];
    }

    // Check by module header in MODULE_MAP
    if (!route && modKey && MODULE_MAP[modKey]) {
      route = MODULE_MAP[modKey];
    }

    // Check itemKey in MODULE_MAP
    if (!route && MODULE_MAP[itemKey]) {
      route = MODULE_MAP[itemKey];
    }

    // Strip "dashboard" suffix if needed
    if (!route && itemKey.endsWith(' dashboard')) {
      var baseKey = itemKey.replace(/\s+dashboard$/, '').trim();
      if (MODULE_MAP[baseKey]) route = MODULE_MAP[baseKey];
      else if (ROUTE_MAP[baseKey]) route = ROUTE_MAP[baseKey];
    }

    if (!route) {
      // Fuzzy search keys
      var keys = Object.keys(ROUTE_MAP);
      for (var i = 0; i < keys.length; i++) {
        if (itemKey.indexOf(keys[i]) !== -1 || keys[i].indexOf(itemKey) !== -1) {
          route = ROUTE_MAP[keys[i]];
          break;
        }
      }
    }

    if (!route) {
      return false;
    }

    var rootId = route.rootId || CONTROLLER_ROOT_MAP[route.controller];
    var ctrlName = route.controller;

    // Check if the target dashboard is ALREADY OPEN
    var existingRoot = rootId ? document.getElementById(rootId) : null;
    var isOpen = existingRoot && (existingRoot.style.display !== 'none') &&
                 (existingRoot.classList.contains('zpanel-open') || (CONTROLLER_OPEN_CLASS_MAP[ctrlName] && existingRoot.classList.contains(CONTROLLER_OPEN_CLASS_MAP[ctrlName])));

    var ctrl = window[ctrlName];

    // If ALREADY OPEN, switch the subcategory tab dynamically without flickering
    if (isOpen && ctrl && typeof ctrl.switchTab === 'function' && route.tab) {
      try {
        ctrl.switchTab(route.tab);
        if (route.hash) {
          try { history.pushState(null, '', route.hash); } catch (e) { window.location.hash = route.hash; }
        }
        syncSidebar(route.module || moduleLabel, rawItem);
        return true;
      } catch (err) {}
    }

    // Otherwise close other dashboards cleanly
    closeAllDashboards(rootId);

    // Ensure the target element is unhidden
    if (existingRoot) {
      existingRoot.style.removeProperty('display');
      existingRoot.style.display = 'block';
    }

    function invoke(attemptsLeft) {
      var activeCtrl = window[ctrlName];
      if (activeCtrl && typeof activeCtrl.open === 'function') {
        try {
          // Open the controller with the designated subcategory tab
          if (route.tab) {
            activeCtrl.open(route.tab);
          } else {
            activeCtrl.open();
          }

          // Ensure root display visibility and classes post-open
          var targetEl = rootId ? document.getElementById(rootId) : null;
          if (targetEl) {
            targetEl.style.removeProperty('display');
            targetEl.style.display = 'block';
            targetEl.classList.add('zpanel-open');
            if (CONTROLLER_OPEN_CLASS_MAP[ctrlName]) {
              targetEl.classList.add(CONTROLLER_OPEN_CLASS_MAP[ctrlName]);
            }
          }

          // If switchTab is available and tab was specified, also ensure switchTab ran
          if (typeof activeCtrl.switchTab === 'function' && route.tab) {
            try { activeCtrl.switchTab(route.tab); } catch (e) {}
          }

          // Update URL hash
          if (route.hash) {
            try { history.pushState(null, '', route.hash); } catch (e) { window.location.hash = route.hash; }
          }

          // Show floating return button
          var retBtn = ensureReturnButton();
          if (retBtn) retBtn.style.display = 'flex';

          // Sync sidebar highlights
          syncSidebar(route.module || moduleLabel, rawItem);

          // Close mobile sidebar if open
          var mobileClose = document.querySelector('button[aria-label="Close menu"]');
          if (mobileClose && window.innerWidth < 1024) {
            try { mobileClose.click(); } catch (e) {}
          }
          return true;
        } catch (err) {
          console.error('[ZenveRouter] Error opening dashboard:', err);
        }
      }

      // Check fallback controller (used by individual HR sub-scripts)
      if (route.fallbackController && window[route.fallbackController]) {
        var fb = window[route.fallbackController];
        if (fb && typeof fb.open === 'function') {
          try {
            fb.open(route.fallbackTab || 'overview');
            var targetEl2 = rootId ? document.getElementById(rootId) : null;
            if (targetEl2) {
              targetEl2.style.removeProperty('display');
              targetEl2.style.display = 'block';
              targetEl2.classList.add('zpanel-open');
            }
            if (route.hash) {
              try { history.pushState(null, '', route.hash); } catch (e) { window.location.hash = route.hash; }
            }
            var retBtn2 = ensureReturnButton();
            if (retBtn2) retBtn2.style.display = 'flex';
            syncSidebar(route.module || moduleLabel, rawItem);
            return true;
          } catch (err) {}
        }
      }

      if (attemptsLeft > 0) {
        setTimeout(function () { invoke(attemptsLeft - 1); }, 100);
      } else {
        console.warn('[ZenveRouter] Controller not ready for route:', route);
      }
      return false;
    }

    return invoke(4);
  }

  function handleHash() {
    var hash = window.location.hash;
    if (!hash || hash === '#' || hash === '#overview' || hash === '#daily' || hash === '#ledger' || hash === '#ai' || hash === '#apps') {
      if (hash === '#' || hash === '#overview' || !hash) {
        closeAllDashboards();
      }
      return;
    }

    var cleanHash = hash.replace(/^#/, '').toLowerCase();
    var keys = Object.keys(ROUTE_MAP);
    for (var i = 0; i < keys.length; i++) {
      var r = ROUTE_MAP[keys[i]];
      if (r.hash && r.hash.replace(/^#/, '').toLowerCase() === cleanHash) {
        openDashboard(r.module, keys[i]);
        return;
      }
      if (r.tab && r.tab.toLowerCase() === cleanHash) {
        openDashboard(r.module, keys[i]);
        return;
      }
    }
  }

  // Intercept global clicks on sidebar and overview cards to guarantee immediate opening
  document.addEventListener('click', function (e) {
    var target = e.target;
    if (!target) return;

    // Check for overview return buttons or logo
    var logo = target.closest('header a, aside h1, aside svg, .sidebar-scope > div:first-child');
    if (logo && !target.closest('.sidebar-submenu-box')) {
      if (target.textContent && target.textContent.indexOf('Zenve') !== -1) {
        closeAllDashboards();
        return;
      }
    }

    // Check for parent domain accordion button in sidebar
    var navItem = target.closest('.sidebar-nav-item');
    if (navItem && !target.closest('.sidebar-submenu-box')) {
      var domain = navItem.getAttribute('data-domain');
      if (domain) {
        var dLower = domain.toLowerCase();
        if (dLower === 'executive dashboard') {
          e.preventDefault();
          closeAllDashboards();
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
        // If clicking a module domain, open its main dashboard immediately
        setTimeout(function () {
          openDashboard(domain, domain);
        }, 30);
      }
      return;
    }

    // Check for sidebar sub-item buttons
    var subItem = target.closest('.sidebar-sub-item, .sidebar-submenu-box button, .sidebar-submenu-box a, .sidebar-submenu-box li');
    if (subItem) {
      var text = (subItem.textContent || '').trim();
      text = text.replace(/^[•·●\s]+/, '').trim();
      if (text) {
        var parentNav = subItem.closest('div');
        var parentHeader = parentNav ? parentNav.querySelector('.sidebar-nav-item .sidebar-label') : null;
        var moduleLabel = parentHeader ? parentHeader.textContent.trim() : null;

        if (text.toLowerCase() === 'export center') {
          return;
        }

        var handled = openDashboard(moduleLabel, text);
        if (handled) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          return;
        }
      }
    }

    // Check for "View all" buttons on overview cards
    var viewAllBtn = target.closest('button');
    if (viewAllBtn && viewAllBtn.textContent && viewAllBtn.textContent.trim().toLowerCase() === 'view all') {
      var card = viewAllBtn.closest('article, section, div');
      var cardTitle = card ? card.querySelector('h3, h2, .font-semibold') : null;
      if (cardTitle) {
        var tText = cardTitle.textContent.toLowerCase();
        if (tText.indexOf('inventory') !== -1 || tText.indexOf('stock') !== -1) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          openDashboard('Products & Inventory', 'Inventory Dashboard');
          return;
        }
        if (tText.indexOf('product') !== -1) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          openDashboard('Products & Inventory', 'Product Catalog');
          return;
        }
        if (tText.indexOf('doctor') !== -1) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          openDashboard('Doctors', 'All Doctors');
          return;
        }
        if (tText.indexOf('employee') !== -1) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          openDashboard('Employees & HR', 'All Employees');
          return;
        }
      }
    }
  }, true);

  window.ZenveRouter = {
    openDashboard: openDashboard,
    closeAllDashboards: closeAllDashboards,
    syncSidebar: syncSidebar,
    ROUTE_MAP: ROUTE_MAP,
    MODULE_MAP: MODULE_MAP,
    CONTROLLER_ROOT_MAP: CONTROLLER_ROOT_MAP
  };

  window.addEventListener('hashchange', handleHash);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      ensureReturnButton();
      setTimeout(handleHash, 250);
    });
  } else {
    ensureReturnButton();
    setTimeout(handleHash, 250);
  }
})();
