/* =====================================================================
   Zenve BI — Universal Dashboard Router & Navigation Controller
   Ensures every sidebar item, card, and view-all button opens its
   appropriate interactive dashboard seamlessly.
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

  var ROUTE_MAP = {
    // Executive Dashboard
    'executive dashboard': { controller: 'ZenveExecutiveDashboard', tab: 'dashboard', hash: '#executive-dashboard' },
    'ceo control center': { controller: 'ZenveExecutiveDashboard', tab: 'ceo-control', hash: '#ceo-control' },
    'business overview': { controller: 'ZenveExecutiveDashboard', tab: 'overview', hash: '#business-overview' },
    'kpi dashboard': { controller: 'ZenveExecutiveDashboard', tab: 'kpi', hash: '#kpi-dashboard' },

    // Revenue & Sales
    'sales dashboard': { controller: 'ZenveSalesDashboard', tab: 'sales', hash: '#sales-dashboard' },
    'revenue by channel': { controller: 'ZenveSalesDashboard', tab: 'channel', hash: '#revenue-by-channel' },
    'revenue by location': { controller: 'ZenveSalesDashboard', tab: 'location', hash: '#revenue-by-location' },
    'revenue by product': { controller: 'ZenveSalesDashboard', tab: 'product', hash: '#revenue-by-product' },
    'revenue by employee': { controller: 'ZenveSalesDashboard', tab: 'employee', hash: '#revenue-by-employee' },
    'revenue by doctor': { controller: 'ZenveSalesDashboard', tab: 'doctor', hash: '#revenue-by-doctor' },
    'revenue by customer': { controller: 'ZenveSalesDashboard', tab: 'customer', hash: '#revenue-by-customer' },
    'sales funnel': { controller: 'ZenveSalesDashboard', tab: 'funnel', hash: '#sales-funnel' },
    'targets & achievement': { controller: 'ZenveSalesDashboard', tab: 'targets', hash: '#targets-achievement' },
    'targets & achievements': { controller: 'ZenveSalesDashboard', tab: 'targets', hash: '#targets-achievement' },
    'sales forecast': { controller: 'ZenveSalesDashboard', tab: 'forecast', hash: '#sales-forecast' },

    // Orders & Operations
    'all orders': { controller: 'ZenveOperationsDashboard', tab: 'all', hash: '#all-orders' },
    'order management': { controller: 'ZenveOperationsDashboard', tab: 'management', hash: '#order-management' },
    'order status': { controller: 'ZenveOperationsDashboard', tab: 'status', hash: '#order-status' },
    'returns & refunds': { controller: 'ZenveOperationsDashboard', tab: 'returns', hash: '#returns-refunds' },
    'cancellations': { controller: 'ZenveOperationsDashboard', tab: 'cancellations', hash: '#cancellations' },
    'delivery performance': { controller: 'ZenveOperationsDashboard', tab: 'delivery', hash: '#delivery-performance' },
    '60-minute delivery': { controller: 'ZenveOperationsDashboard', tab: 'express', hash: '#60-minute-delivery' },
    'operations dashboard': { controller: 'ZenveOperationsDashboard', tab: 'overview', hash: '#operations-dashboard' },

    // Products & Inventory
    'product catalog': { controller: 'ZenveProductsInventory', tab: 'catalog', hash: '#product-catalog' },
    'sku management': { controller: 'ZenveProductsInventory', tab: 'sku', hash: '#sku-management' },
    'inventory dashboard': { controller: 'ZenveProductsInventory', tab: 'inventory', hash: '#inventory-dashboard' },
    'stock management': { controller: 'ZenveProductsInventory', tab: 'stock', hash: '#stock-management' },
    'low stock': { controller: 'ZenveProductsInventory', tab: 'lowstock', hash: '#low-stock' },
    'out of stock': { controller: 'ZenveProductsInventory', tab: 'outofstock', hash: '#out-of-stock' },
    'expiry management': { controller: 'ZenveProductsInventory', tab: 'expiry', hash: '#expiry-management' },
    'warehouse management': { controller: 'ZenveProductsInventory', tab: 'warehouse', hash: '#warehouse-management' },
    'stock transfers': { controller: 'ZenveProductsInventory', tab: 'transfers', hash: '#stock-transfers' },
    'inventory valuation': { controller: 'ZenveProductsInventory', tab: 'valuation', hash: '#inventory-valuation' },
    'inventory movement': { controller: 'ZenveProductsInventory', tab: 'movement', hash: '#inventory-movement' },

    // Pharmacy
    'pharmacy dashboard': { controller: 'ZenvePharmacyDashboard', tab: 'dashboard', hash: '#pharmacy-dashboard' },
    'pharmacy sales': { controller: 'ZenvePharmacyDashboard', tab: 'sales', hash: '#pharmacy-sales' },
    'medicines': { controller: 'ZenvePharmacyDashboard', tab: 'medicines', hash: '#medicines' },
    'prescriptions': { controller: 'ZenvePharmacyDashboard', tab: 'prescriptions', hash: '#prescriptions' },
    'pharmacy orders': { controller: 'ZenvePharmacyDashboard', tab: 'orders', hash: '#pharmacy-orders' },
    'batch management': { controller: 'ZenvePharmacyDashboard', tab: 'batches', hash: '#batch-management' },
    'expiry tracking': { controller: 'ZenvePharmacyDashboard', tab: 'expiry', hash: '#expiry-tracking' },
    'pharmacy inventory': { controller: 'ZenvePharmacyDashboard', tab: 'inventory', hash: '#pharmacy-inventory' },
    'pharmacy revenue': { controller: 'ZenvePharmacyDashboard', tab: 'revenue', hash: '#pharmacy-revenue' },
    'pharmacy profitability': { controller: 'ZenvePharmacyDashboard', tab: 'profitability', hash: '#pharmacy-profitability' },

    // Veterinary Services
    'services dashboard': { controller: 'ZenveVeterinaryDashboard', tab: 'overview', hash: '#services-dashboard' },
    'consultations': { controller: 'ZenveVeterinaryDashboard', tab: 'consultations', hash: '#consultations' },
    'appointments': { controller: 'ZenveVeterinaryDashboard', tab: 'appointments', hash: '#appointments' },
    'treatments': { controller: 'ZenveVeterinaryDashboard', tab: 'treatments', hash: '#treatments' },
    'vaccinations': { controller: 'ZenveVeterinaryDashboard', tab: 'vaccinations', hash: '#vaccinations' },
    'diagnostics': { controller: 'ZenveVeterinaryDashboard', tab: 'diagnostics', hash: '#diagnostics' },
    'procedures': { controller: 'ZenveVeterinaryDashboard', tab: 'procedures', hash: '#procedures' },
    'service revenue': { controller: 'ZenveVeterinaryDashboard', tab: 'revenue', hash: '#service-revenue' },
    'service profitability': { controller: 'ZenveVeterinaryDashboard', tab: 'profitability', hash: '#service-profitability' },

    // Doctors
    'doctors dashboard': { controller: 'ZenveDoctorsDashboard', tab: 'dashboard', hash: '#doctors-dashboard' },
    'all doctors': { controller: 'ZenveDoctorsDashboard', tab: 'all-doctors', hash: '#all-doctors' },
    'doctor performance': { controller: 'ZenveDoctorsDashboard', tab: 'performance', hash: '#doctor-performance' },
    'doctor revenue': { controller: 'ZenveDoctorsDashboard', tab: 'revenue', hash: '#doctor-revenue' },
    'doctor patients': { controller: 'ZenveDoctorsDashboard', tab: 'patients', hash: '#doctor-patients' },
    'doctor orders': { controller: 'ZenveDoctorsDashboard', tab: 'orders', hash: '#doctor-orders' },
    'doctor commissions': { controller: 'ZenveDoctorsDashboard', tab: 'commissions', hash: '#doctor-commissions' },
    'doctor activity': { controller: 'ZenveDoctorsDashboard', tab: 'activity', hash: '#doctor-activity' },
    'doctor network': { controller: 'ZenveDoctorsDashboard', tab: 'network', hash: '#doctor-network' },

    // Clinics & Hospitals
    'clinics dashboard': { controller: 'ZenveClinicsDashboard', tab: 'dashboard', hash: '#clinics-dashboard' },
    'all clinics': { controller: 'ZenveClinicsDashboard', tab: 'all-clinics', hash: '#all-clinics' },
    'hospitals': { controller: 'ZenveClinicsDashboard', tab: 'hospitals', hash: '#hospitals' },
    'clinic performance': { controller: 'ZenveClinicsDashboard', tab: 'performance', hash: '#clinic-performance' },
    'clinic revenue': { controller: 'ZenveClinicsDashboard', tab: 'revenue', hash: '#clinic-revenue' },
    'clinic orders': { controller: 'ZenveClinicsDashboard', tab: 'orders', hash: '#clinic-orders' },
    'clinic patients': { controller: 'ZenveClinicsDashboard', tab: 'patients', hash: '#clinic-patients' },
    'clinic doctors': { controller: 'ZenveClinicsDashboard', tab: 'doctors', hash: '#clinic-doctors' },
    'clinic commissions': { controller: 'ZenveClinicsDashboard', tab: 'commissions', hash: '#clinic-commissions' },
    'clinic network': { controller: 'ZenveClinicsDashboard', tab: 'network', hash: '#clinic-network' },

    // Customers 360°
    'customer dashboard': { controller: 'ZenveCustomersDashboard', tab: 'dashboard', hash: '#customer-dashboard' },
    'all customers': { controller: 'ZenveCustomersDashboard', tab: 'all-customers', hash: '#all-customers' },
    'new customers': { controller: 'ZenveCustomersDashboard', tab: 'new-customers', hash: '#new-customers' },
    'active customers': { controller: 'ZenveCustomersDashboard', tab: 'active-customers', hash: '#active-customers' },
    'repeat customers': { controller: 'ZenveCustomersDashboard', tab: 'repeat-customers', hash: '#repeat-customers' },
    'customer lifetime value': { controller: 'ZenveCustomersDashboard', tab: 'lifetime-value', hash: '#customer-lifetime-value' },
    'customer segmentation': { controller: 'ZenveCustomersDashboard', tab: 'segmentation', hash: '#customer-segmentation' },
    'customer orders': { controller: 'ZenveCustomersDashboard', tab: 'orders', hash: '#customer-orders' },
    'customer revenue': { controller: 'ZenveCustomersDashboard', tab: 'revenue', hash: '#customer-revenue' },
    'customer retention': { controller: 'ZenveCustomersDashboard', tab: 'retention', hash: '#customer-retention' },
    'customer complaints': { controller: 'ZenveCustomersDashboard', tab: 'complaints', hash: '#customer-complaints' },

    // Pets 360°
    'all pets': { controller: 'ZenvePetsDashboard', tab: 'all-pets', hash: '#all-pets' },
    'pet profiles': { controller: 'ZenvePetsDashboard', tab: 'pet-profiles', hash: '#pet-profiles' },
    'pet health records': { controller: 'ZenvePetsDashboard', tab: 'pet-health-records', hash: '#pet-health-records' },
    'vaccination records': { controller: 'ZenvePetsDashboard', tab: 'vaccination-records', hash: '#vaccination-records' },
    'treatment history': { controller: 'ZenvePetsDashboard', tab: 'treatment-history', hash: '#treatment-history' },
    'prescription history': { controller: 'ZenvePetsDashboard', tab: 'prescription-history', hash: '#prescription-history' },
    'purchase history': { controller: 'ZenvePetsDashboard', tab: 'purchase-history', hash: '#purchase-history' },
    'pet analytics': { controller: 'ZenvePetsDashboard', tab: 'pet-analytics', hash: '#pet-analytics' },
    'pet health insights': { controller: 'ZenvePetsDashboard', tab: 'pet-health-insights', hash: '#pet-health-insights' },

    // Employees & HR
    'hr dashboard': { controller: 'ZenveHRDashboard', tab: 'overview', hash: '#hr-dashboard' },
    'all employees': { controller: 'ZenveAllEmployees', fallbackController: 'ZenveHRDashboard', fallbackTab: 'directory', hash: '#all-employees' },
    'departments': { controller: 'ZenveDepartments', fallbackController: 'ZenveHRDashboard', fallbackTab: 'departments', hash: '#departments' },
    'employee performance': { controller: 'ZenveEmployeePerformance', fallbackController: 'ZenveHRDashboard', fallbackTab: 'performance', hash: '#employee-performance' },
    'employee targets': { controller: 'ZenveEmployeeTargets', fallbackController: 'ZenveHRDashboard', fallbackTab: 'targets', hash: '#employee-targets' },
    'employee productivity': { controller: 'ZenveEmployeeProductivity', fallbackController: 'ZenveHRDashboard', fallbackTab: 'productivity', hash: '#employee-productivity' },
    'attendance': { controller: 'ZenveAttendance', fallbackController: 'ZenveHRDashboard', fallbackTab: 'attendance', hash: '#attendance' },
    'leave management': { controller: 'ZenveLeaveManagement', fallbackController: 'ZenveHRDashboard', fallbackTab: 'leaves', hash: '#leave-management' },
    'payroll': { controller: 'ZenvePayroll', fallbackController: 'ZenveHRDashboard', fallbackTab: 'payroll', hash: '#payroll' },
    'salary cost': { controller: 'ZenveSalaryCost', fallbackController: 'ZenveHRDashboard', fallbackTab: 'salary-cost', hash: '#salary-cost' },
    'recruitment': { controller: 'ZenveRecruitment', fallbackController: 'ZenveHRDashboard', fallbackTab: 'recruitment', hash: '#recruitment' },
    'onboarding': { controller: 'ZenveOnboarding', fallbackController: 'ZenveHRDashboard', fallbackTab: 'onboarding', hash: '#onboarding' },
    'employee expenses': { controller: 'ZenveEmployeeExpenses', fallbackController: 'ZenveHRDashboard', fallbackTab: 'expenses', hash: '#employee-expenses' },

    // Finance & Accounting
    'finance dashboard': { controller: 'ZenveFinanceDashboard', tab: 'dashboard', hash: '#finance-dashboard' },
    'profit & loss': { controller: 'ZenveFinanceDashboard', tab: 'pnl', hash: '#profit-and-loss' },
    'balance sheet': { controller: 'ZenveFinanceDashboard', tab: 'balance-sheet', hash: '#balance-sheet' },
    'cash flow': { controller: 'ZenveFinanceDashboard', tab: 'cash-flow', hash: '#cash-flow' },
    'revenue': { controller: 'ZenveFinanceDashboard', tab: 'revenue', hash: '#finance-revenue' },
    'expenses': { controller: 'ZenveFinanceDashboard', tab: 'expenses', hash: '#finance-expenses' },
    'cogs': { controller: 'ZenveFinanceDashboard', tab: 'cogs', hash: '#cogs' },
    'gross profit': { controller: 'ZenveFinanceDashboard', tab: 'gross-profit', hash: '#gross-profit' },
    'ebitda': { controller: 'ZenveFinanceDashboard', tab: 'ebitda', hash: '#ebitda' },
    'net profit': { controller: 'ZenveFinanceDashboard', tab: 'net-profit', hash: '#net-profit' },
    'accounts receivable': { controller: 'ZenveFinanceDashboard', tab: 'receivables', hash: '#accounts-receivable' },
    'accounts payable': { controller: 'ZenveFinanceDashboard', tab: 'payables', hash: '#accounts-payable' },
    'invoices': { controller: 'ZenveFinanceDashboard', tab: 'invoices', hash: '#invoices' },
    'payments': { controller: 'ZenveFinanceDashboard', tab: 'payments', hash: '#payments' },
    'refunds': { controller: 'ZenveFinanceDashboard', tab: 'refunds', hash: '#refunds' },
    'taxes': { controller: 'ZenveFinanceDashboard', tab: 'taxes', hash: '#taxes' },
    'financial forecast': { controller: 'ZenveFinanceDashboard', tab: 'forecast', hash: '#financial-forecast' },
    'cost analysis': { controller: 'ZenveFinanceDashboard', tab: 'cost-analysis', hash: '#cost-analysis' },

    // Marketing
    'marketing dashboard': { controller: 'ZenveMarketingDashboard', tab: 'overview', hash: '#marketing-dashboard' },
    'campaigns': { controller: 'ZenveMarketingDashboard', tab: 'campaigns', hash: '#campaigns' },
    'leads': { controller: 'ZenveMarketingDashboard', tab: 'leads', hash: '#leads' },
    'lead sources': { controller: 'ZenveMarketingDashboard', tab: 'lead-sources', hash: '#lead-sources' },
    'website analytics': { controller: 'ZenveMarketingDashboard', tab: 'website-analytics', hash: '#website-analytics' },
    'app analytics': { controller: 'ZenveMarketingDashboard', tab: 'app-analytics', hash: '#app-analytics' },
    'social media': { controller: 'ZenveMarketingDashboard', tab: 'social-media', hash: '#social-media' },
    'advertising': { controller: 'ZenveMarketingDashboard', tab: 'advertising', hash: '#advertising' },
    'marketing spend': { controller: 'ZenveMarketingDashboard', tab: 'marketing-spend', hash: '#marketing-spend' },
    'customer acquisition': { controller: 'ZenveMarketingDashboard', tab: 'customer-acquisition', hash: '#customer-acquisition' },
    'cac': { controller: 'ZenveMarketingDashboard', tab: 'cac', hash: '#cac' },
    'roas': { controller: 'ZenveMarketingDashboard', tab: 'roas', hash: '#roas' },
    'marketing roi': { controller: 'ZenveMarketingDashboard', tab: 'marketing-roi', hash: '#marketing-roi' },
    'conversion funnel': { controller: 'ZenveMarketingDashboard', tab: 'conversion-funnel', hash: '#conversion-funnel' },

    // Vendors & Procurement
    'vendor dashboard': { controller: 'ZenveVendorsDashboard', tab: 'dashboard', hash: '#vendor-dashboard' },
    'all vendors': { controller: 'ZenveVendorsDashboard', tab: 'all-vendors', hash: '#all-vendors' },
    'vendor performance': { controller: 'ZenveVendorsDashboard', tab: 'vendor-perf', hash: '#vendor-performance' },
    'vendor payments': { controller: 'ZenveVendorsDashboard', tab: 'vendor-pay', hash: '#vendor-payments' },
    'purchase orders': { controller: 'ZenveVendorsDashboard', tab: 'purchase-orders', hash: '#purchase-orders' },
    'procurement': { controller: 'ZenveVendorsDashboard', tab: 'procurement', hash: '#procurement' },
    'purchase history': { controller: 'ZenveVendorsDashboard', tab: 'purchase-history', hash: '#purchase-history' },
    'supplier pricing': { controller: 'ZenveVendorsDashboard', tab: 'supplier-pricing', hash: '#supplier-pricing' },
    'supplier performance': { controller: 'ZenveVendorsDashboard', tab: 'supplier-perf', hash: '#supplier-performance' },
    'procurement savings': { controller: 'ZenveVendorsDashboard', tab: 'savings', hash: '#procurement-savings' },

    // Logistics & Delivery
    'logistics dashboard': { controller: 'ZenveLogisticsDashboard', tab: 'overview', hash: '#logistics-dashboard' },
    'delivery orders': { controller: 'ZenveLogisticsDashboard', tab: 'delivery-orders', hash: '#delivery-orders' },
    'delivery partners': { controller: 'ZenveLogisticsDashboard', tab: 'delivery-partners', hash: '#delivery-partners' },
    'delivery tracking': { controller: 'ZenveLogisticsDashboard', tab: 'delivery-tracking', hash: '#delivery-tracking' },
    '60-minute delivery': { controller: 'ZenveLogisticsDashboard', tab: 'sixty-minute-delivery', hash: '#60-minute-delivery' },
    'delivery sla': { controller: 'ZenveLogisticsDashboard', tab: 'delivery-sla', hash: '#delivery-sla' },
    'delivery cost': { controller: 'ZenveLogisticsDashboard', tab: 'delivery-cost', hash: '#delivery-cost' },
    'failed deliveries': { controller: 'ZenveLogisticsDashboard', tab: 'failed-deliveries', hash: '#failed-deliveries' },

    // Zenve Fashion
    'fashion dashboard': { controller: 'ZenveFashionDashboard', tab: 'dashboard', hash: '#fashion-dashboard' },
    'fashion products': { controller: 'ZenveFashionDashboard', tab: 'products', hash: '#fashion-products' },
    'fashion orders': { controller: 'ZenveFashionDashboard', tab: 'orders', hash: '#fashion-orders' },
    'fashion customers': { controller: 'ZenveFashionDashboard', tab: 'customers', hash: '#fashion-customers' },
    'fashion inventory': { controller: 'ZenveFashionDashboard', tab: 'inventory', hash: '#fashion-inventory' },
    'fashion showrooms': { controller: 'ZenveFashionDashboard', tab: 'showrooms', hash: '#fashion-showrooms' },
    'online fashion sales': { controller: 'ZenveFashionDashboard', tab: 'online-sales', hash: '#online-fashion-sales' },
    'fashion revenue': { controller: 'ZenveFashionDashboard', tab: 'revenue', hash: '#fashion-revenue' },
    'fashion profitability': { controller: 'ZenveFashionDashboard', tab: 'profitability', hash: '#fashion-profitability' },

    // B2B / Enterprise
    'b2b dashboard': { controller: 'ZenveB2BDashboard', tab: 'dashboard', hash: '#b2b-dashboard' },
    'enterprise customers': { controller: 'ZenveB2BDashboard', tab: 'customers', hash: '#enterprise-customers' },
    'corporate accounts': { controller: 'ZenveB2BDashboard', tab: 'accounts', hash: '#corporate-accounts' },
    'b2b orders': { controller: 'ZenveB2BDashboard', tab: 'orders', hash: '#b2b-orders' },
    'b2b sales': { controller: 'ZenveB2BDashboard', tab: 'sales', hash: '#b2b-sales' },
    'b2b revenue': { controller: 'ZenveB2BDashboard', tab: 'revenue', hash: '#b2b-revenue' },
    'contracts': { controller: 'ZenveB2BDashboard', tab: 'contracts', hash: '#contracts' },
    'enterprise pricing': { controller: 'ZenveB2BDashboard', tab: 'pricing', hash: '#enterprise-pricing' },
    'b2b receivables': { controller: 'ZenveB2BDashboard', tab: 'receivables', hash: '#b2b-receivables' },

    // Import & Export
    'import dashboard': { controller: 'ZenveImportExportDashboard', tab: 'import-dashboard', hash: '#import-dashboard' },
    'export dashboard': { controller: 'ZenveImportExportDashboard', tab: 'export-dashboard', hash: '#export-dashboard' },
    'import orders': { controller: 'ZenveImportExportDashboard', tab: 'import-orders', hash: '#import-orders' },
    'export orders': { controller: 'ZenveImportExportDashboard', tab: 'export-orders', hash: '#export-orders' },
    'suppliers': { controller: 'ZenveImportExportDashboard', tab: 'suppliers', hash: '#suppliers' },
    'buyers': { controller: 'ZenveImportExportDashboard', tab: 'buyers', hash: '#buyers' },
    'customs & documentation': { controller: 'ZenveImportExportDashboard', tab: 'customs', hash: '#customs-documentation' },
    'logistics': { controller: 'ZenveImportExportDashboard', tab: 'logistics', hash: '#import-logistics' },
    'import/export profitability': { controller: 'ZenveImportExportDashboard', tab: 'profitability', hash: '#import-export-profitability' },

    // Subscriptions
    'subscription dashboard': { controller: 'ZenveSubscriptionsDashboard', tab: 'dashboard', hash: '#subscription-dashboard' },
    'active subscriptions': { controller: 'ZenveSubscriptionsDashboard', tab: 'active', hash: '#active-subscriptions' },
    'new subscriptions': { controller: 'ZenveSubscriptionsDashboard', tab: 'new', hash: '#new-subscriptions' },
    'renewals': { controller: 'ZenveSubscriptionsDashboard', tab: 'renewals', hash: '#subscription-renewals' },
    'expiring subscriptions': { controller: 'ZenveSubscriptionsDashboard', tab: 'expiring', hash: '#expiring-subscriptions' },
    'churn': { controller: 'ZenveSubscriptionsDashboard', tab: 'churn', hash: '#subscription-churn' },
    'subscription revenue': { controller: 'ZenveSubscriptionsDashboard', tab: 'revenue', hash: '#subscription-revenue' },
    'subscription analytics': { controller: 'ZenveSubscriptionsDashboard', tab: 'analytics', hash: '#subscription-analytics' },

    // Reports & Analytics
    'sales reports': { controller: 'ZenveReportsDashboard', tab: 'sales', hash: '#sales-reports' },
    'revenue reports': { controller: 'ZenveReportsDashboard', tab: 'revenue', hash: '#revenue-reports' },
    'customer reports': { controller: 'ZenveReportsDashboard', tab: 'customer', hash: '#customer-reports' },
    'pet reports': { controller: 'ZenveReportsDashboard', tab: 'pet', hash: '#pet-reports' },
    'doctor reports': { controller: 'ZenveReportsDashboard', tab: 'doctor', hash: '#doctor-reports' },
    'clinic reports': { controller: 'ZenveReportsDashboard', tab: 'clinic', hash: '#clinic-reports' },
    'product reports': { controller: 'ZenveReportsDashboard', tab: 'product', hash: '#product-reports' },
    'inventory reports': { controller: 'ZenveReportsDashboard', tab: 'inventory', hash: '#inventory-reports' },
    'finance reports': { controller: 'ZenveReportsDashboard', tab: 'finance', hash: '#finance-reports' },
    'hr reports': { controller: 'ZenveReportsDashboard', tab: 'hr', hash: '#hr-reports' },
    'marketing reports': { controller: 'ZenveReportsDashboard', tab: 'marketing', hash: '#marketing-reports' },
    'operations reports': { controller: 'ZenveReportsDashboard', tab: 'operations', hash: '#operations-reports' },
    'vendor reports': { controller: 'ZenveReportsDashboard', tab: 'vendor', hash: '#vendor-reports' },
    'custom reports': { controller: 'ZenveReportsDashboard', tab: 'custom', hash: '#custom-reports' },
    'scheduled reports': { controller: 'ZenveReportsDashboard', tab: 'scheduled', hash: '#scheduled-reports' },
    'export center': { controller: 'ZenveReportsDashboard', tab: 'export', hash: '#export-center' },

    // AI Assistant
    'ask zenve ai': { controller: 'ZenveAIAssistant', tab: 'ask-ai', hash: '#ask-ai' },
    'business insights': { controller: 'ZenveAIAssistant', tab: 'insights', hash: '#business-insights' },
    'revenue intelligence': { controller: 'ZenveAIAssistant', tab: 'revenue', hash: '#revenue-intelligence' },
    'demand forecast': { controller: 'ZenveAIAssistant', tab: 'demand-fc', hash: '#demand-forecast' },
    'inventory prediction': { controller: 'ZenveAIAssistant', tab: 'inventory-pr', hash: '#inventory-prediction' },
    'customer prediction': { controller: 'ZenveAIAssistant', tab: 'customer-pr', hash: '#customer-prediction' },
    'churn prediction': { controller: 'ZenveAIAssistant', tab: 'churn-pr', hash: '#churn-prediction' },
    'profit prediction': { controller: 'ZenveAIAssistant', tab: 'profit-pr', hash: '#profit-prediction' },
    'anomaly detection': { controller: 'ZenveAIAssistant', tab: 'anomaly', hash: '#anomaly-detection' },
    'ai recommendations': { controller: 'ZenveAIAssistant', tab: 'recommend', hash: '#ai-recommendations' },

    // Alerts & Notifications
    'critical alerts': { controller: 'ZenveAlertsDashboard', tab: 'critical', hash: '#critical-alerts' },
    'revenue alerts': { controller: 'ZenveAlertsDashboard', tab: 'revenue', hash: '#revenue-alerts' },
    'inventory alerts': { controller: 'ZenveAlertsDashboard', tab: 'inventory', hash: '#inventory-alerts' },
    'payment alerts': { controller: 'ZenveAlertsDashboard', tab: 'payment', hash: '#payment-alerts' },
    'order alerts': { controller: 'ZenveAlertsDashboard', tab: 'order', hash: '#order-alerts' },
    'delivery alerts': { controller: 'ZenveAlertsDashboard', tab: 'delivery', hash: '#delivery-alerts' },
    'finance alerts': { controller: 'ZenveAlertsDashboard', tab: 'finance', hash: '#finance-alerts' },
    'hr alerts': { controller: 'ZenveAlertsDashboard', tab: 'hr', hash: '#hr-alerts' },
    'system alerts': { controller: 'ZenveAlertsDashboard', tab: 'system', hash: '#system-alerts' },
    'alert rules': { controller: 'ZenveAlertsDashboard', tab: 'rules', hash: '#alert-rules' },
    'notification center': { controller: 'ZenveAlertsDashboard', tab: 'notifs', hash: '#notification-center' },

    // Audit & Compliance
    'audit log': { controller: 'ZenveAudit', tab: 'audit-log', hash: '#audit-log' },
    'user activity': { controller: 'ZenveAudit', tab: 'user-activity', hash: '#user-activity' },
    'login history': { controller: 'ZenveAudit', tab: 'login-history', hash: '#login-history' },
    'data changes': { controller: 'ZenveAudit', tab: 'data-changes', hash: '#data-changes' },
    'financial audit trail': { controller: 'ZenveAudit', tab: 'financial-audit', hash: '#financial-audit' },
    'order audit trail': { controller: 'ZenveAudit', tab: 'order-audit', hash: '#order-audit' },
    'inventory audit trail': { controller: 'ZenveAudit', tab: 'inventory-audit', hash: '#inventory-audit' },
    'approval history': { controller: 'ZenveAudit', tab: 'approval-history', hash: '#approval-history' },
    'compliance dashboard': { controller: 'ZenveAudit', tab: 'compliance', hash: '#compliance-dashboard' },

    // System Health
    'application health': { controller: 'ZenveSystemHealth', tab: 'app', hash: '#app-health' },
    'api health': { controller: 'ZenveSystemHealth', tab: 'api', hash: '#api-health' },
    'database health': { controller: 'ZenveSystemHealth', tab: 'db', hash: '#db-health' },
    'payment gateway': { controller: 'ZenveSystemHealth', tab: 'payment', hash: '#payment-gateway' },
    'crm status': { controller: 'ZenveSystemHealth', tab: 'crm', hash: '#crm-status' },
    'inventory system': { controller: 'ZenveSystemHealth', tab: 'inventory', hash: '#inventory-system' },
    'accounting system': { controller: 'ZenveSystemHealth', tab: 'accounting', hash: '#accounting-system' },
    'marketing integrations': { controller: 'ZenveSystemHealth', tab: 'marketing', hash: '#marketing-integrations' },
    'notification services': { controller: 'ZenveSystemHealth', tab: 'notifications', hash: '#notification-services' },
    'integration logs': { controller: 'ZenveSystemHealth', tab: 'logs', hash: '#integration-logs' },

    // Settings
    'company settings': { controller: 'ZenveSettingsDashboard', tab: 'company', hash: '#company-settings' },
    'business units': { controller: 'ZenveSettingsDashboard', tab: 'units', hash: '#business-units' },
    'locations': { controller: 'ZenveSettingsDashboard', tab: 'locations', hash: '#locations' },
    'users': { controller: 'ZenveSettingsDashboard', tab: 'users', hash: '#users' },
    'roles & permissions': { controller: 'ZenveSettingsDashboard', tab: 'roles', hash: '#roles-permissions' },
    'approval workflows': { controller: 'ZenveSettingsDashboard', tab: 'workflows', hash: '#approval-workflows' },
    'notification settings': { controller: 'ZenveSettingsDashboard', tab: 'notifications', hash: '#notification-settings' },
    'dashboard settings': { controller: 'ZenveSettingsDashboard', tab: 'dashboard-settings', hash: '#dashboard-settings' },
    'tax settings': { controller: 'ZenveSettingsDashboard', tab: 'tax', hash: '#tax-settings' },
    'payment settings': { controller: 'ZenveSettingsDashboard', tab: 'payments', hash: '#payment-settings' },
    'delivery settings': { controller: 'ZenveSettingsDashboard', tab: 'delivery', hash: '#delivery-settings' },
    'api & integrations': { controller: 'ZenveSettingsDashboard', tab: 'integrations', hash: '#api-integrations' },
    'security': { controller: 'ZenveSettingsDashboard', tab: 'security', hash: '#security-settings' },
    'backup & recovery': { controller: 'ZenveSettingsDashboard', tab: 'backup', hash: '#backup-recovery' }
  };

  var MODULE_MAP = {
    'executive dashboard': { controller: 'ZenveExecutiveDashboard', tab: 'dashboard', hash: '#executive-dashboard' },
    'revenue & sales': { controller: 'ZenveSalesDashboard', tab: 'sales', hash: '#sales-dashboard' },
    'orders & operations': { controller: 'ZenveOperationsDashboard', tab: 'all', hash: '#operations-dashboard' },
    'products & inventory': { controller: 'ZenveProductsInventory', tab: 'catalog', hash: '#product-catalog' },
    'pharmacy': { controller: 'ZenvePharmacyDashboard', tab: 'dashboard', hash: '#pharmacy-dashboard' },
    'veterinary services': { controller: 'ZenveVeterinaryDashboard', tab: 'overview', hash: '#services-dashboard' },
    'doctors': { controller: 'ZenveDoctorsDashboard', tab: 'dashboard', hash: '#doctors-dashboard' },
    'clinics & hospitals': { controller: 'ZenveClinicsDashboard', tab: 'dashboard', hash: '#clinics-dashboard' },
    'customers 360°': { controller: 'ZenveCustomersDashboard', tab: 'dashboard', hash: '#customer-dashboard' },
    'customers 360': { controller: 'ZenveCustomersDashboard', tab: 'dashboard', hash: '#customer-dashboard' },
    'pets 360°': { controller: 'ZenvePetsDashboard', tab: 'all-pets', hash: '#all-pets' },
    'pets 360': { controller: 'ZenvePetsDashboard', tab: 'all-pets', hash: '#all-pets' },
    'employees & hr': { controller: 'ZenveHRDashboard', tab: 'overview', hash: '#hr-dashboard' },
    'finance & accounting': { controller: 'ZenveFinanceDashboard', tab: 'dashboard', hash: '#finance-dashboard' },
    'marketing': { controller: 'ZenveMarketingDashboard', tab: 'overview', hash: '#marketing-dashboard' },
    'vendors & procurement': { controller: 'ZenveVendorsDashboard', tab: 'dashboard', hash: '#vendor-dashboard' },
    'logistics & delivery': { controller: 'ZenveLogisticsDashboard', tab: 'overview', hash: '#logistics-dashboard' },
    'zenve fashion': { controller: 'ZenveFashionDashboard', tab: 'dashboard', hash: '#fashion-dashboard' },
    'b2b / enterprise': { controller: 'ZenveB2BDashboard', tab: 'dashboard', hash: '#b2b-dashboard' },
    'import & export': { controller: 'ZenveImportExportDashboard', tab: 'import-dashboard', hash: '#import-dashboard' },
    'subscriptions': { controller: 'ZenveSubscriptionsDashboard', tab: 'dashboard', hash: '#subscription-dashboard' },
    'reports & analytics': { controller: 'ZenveReportsDashboard', tab: 'sales', hash: '#sales-reports' },
    'ai assistant': { controller: 'ZenveAIAssistant', tab: 'ask-ai', hash: '#ask-ai' },
    'alerts & notifications': { controller: 'ZenveAlertsDashboard', tab: 'critical', hash: '#critical-alerts' },
    'audit & compliance': { controller: 'ZenveAudit', tab: 'audit-log', hash: '#audit-log' },
    'system health': { controller: 'ZenveSystemHealth', tab: 'app', hash: '#app-health' },
    'settings': { controller: 'ZenveSettingsDashboard', tab: 'company', hash: '#company-settings' }
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
      };
      document.body.appendChild(btn);
    }
    return btn;
  }

  function closeAllDashboards() {
    CONTROLLERS.forEach(function (name) {
      try {
        var c = window[name];
        if (c && typeof c.close === 'function') {
          c.close();
        }
      } catch (e) {}
    });

    ROOT_IDS.forEach(function (id) {
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
    if (btn) btn.style.display = 'none';

    try {
      if (window.location.hash && window.location.hash !== '#' && window.location.hash !== '#overview') {
        history.replaceState(null, document.title, window.location.pathname + window.location.search);
      }
    } catch (e) {}
  }

  function openDashboard(moduleLabel, itemName) {
    var rawItem = (itemName || '').trim();
    // Strip leading bullets/icons
    rawItem = rawItem.replace(/^[•·●\s]+/, '').trim();
    var itemKey = rawItem.toLowerCase();
    var modKey = (moduleLabel || '').trim().toLowerCase();

    // Check if item is in ROUTE_MAP
    var route = ROUTE_MAP[itemKey];

    // If not found directly, check by module header
    if (!route && modKey && MODULE_MAP[modKey]) {
      route = MODULE_MAP[modKey];
    }

    if (!route) {
      // Fuzzy match across ROUTE_MAP keys
      var keys = Object.keys(ROUTE_MAP);
      for (var i = 0; i < keys.length; i++) {
        if (keys[i].indexOf(itemKey) !== -1 || itemKey.indexOf(keys[i]) !== -1) {
          route = ROUTE_MAP[keys[i]];
          break;
        }
      }
    }

    if (!route) {
      return false;
    }

    closeAllDashboards();

    function invoke(attemptsLeft) {
      var ctrl = window[route.controller];
      if (ctrl && typeof ctrl.open === 'function') {
        try {
          if (route.tab) {
            ctrl.open(route.tab);
          } else {
            ctrl.open();
          }
          if (route.hash) {
            try { history.pushState(null, '', route.hash); } catch (e) { window.location.hash = route.hash; }
          }
          var retBtn = ensureReturnButton();
          if (retBtn) retBtn.style.display = 'flex';

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

      // Check fallback controller
      if (route.fallbackController && window[route.fallbackController]) {
        var fb = window[route.fallbackController];
        if (fb && typeof fb.open === 'function') {
          try {
            fb.open(route.fallbackTab || 'overview');
            if (route.hash) {
              try { history.pushState(null, '', route.hash); } catch (e) { window.location.hash = route.hash; }
            }
            var retBtn2 = ensureReturnButton();
            if (retBtn2) retBtn2.style.display = 'flex';
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
    if (!hash || hash === '#' || hash === '#overview' || hash === '#daily' || hash === '#ledger' || hash === '#inventory' || hash === '#ai' || hash === '#apps') {
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
        openDashboard(null, keys[i]);
        return;
      }
      if (r.tab && r.tab.toLowerCase() === cleanHash) {
        openDashboard(null, keys[i]);
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
        // If clicking a module domain, open its main dashboard
        setTimeout(function () {
          openDashboard(domain, domain + ' Dashboard');
        }, 50);
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
          openDashboard('Doctors', 'All Doctors');
          return;
        }
        if (tText.indexOf('employee') !== -1) {
          e.preventDefault();
          e.stopPropagation();
          openDashboard('Employees & HR', 'All Employees');
          return;
        }
      }
    }
  }, true);

  window.ZenveRouter = {
    openDashboard: openDashboard,
    closeAllDashboards: closeAllDashboards,
    ROUTE_MAP: ROUTE_MAP,
    MODULE_MAP: MODULE_MAP
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
