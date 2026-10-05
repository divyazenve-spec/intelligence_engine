/**
 * Zenve BI — Central Pages Registry
 * Exports all category and subcategory dashboard components.
 */

// 1. Executive
export { default as ExecutiveDashboard } from './Executive/ExecutiveDashboard';

// 2. Revenue & Sales
export {
  SalesDashboard,
  RevenueByChannel,
  RevenueByLocation,
  RevenueByProduct,
  RevenueByEmployee,
  RevenueByDoctor,
  RevenueByCustomer,
  SalesFunnel,
  TargetsAndAchievement,
  SalesForecast
} from './RevenueAndSales';

// 3. Orders & Operations
export { default as OrdersDashboard } from './OrdersAndOperations/OrdersDashboard';

// 4. Products & Inventory
export {
  InventoryDashboard,
  InventoryMovement,
  InventoryValuation,
  StockTransfers
} from './ProductsAndInventory';

// 5. Pharmacy
export {
  PharmacyDashboard,
  PharmacySales,
  Medicines,
  Prescriptions,
  PharmacyOrders,
  BatchManagement,
  ExpiryTracking,
  PharmacyInventory,
  PharmacyRevenue,
  PharmacyProfitability
} from './Pharmacy';

// 6. Veterinary Services
export {
  ServicesDashboard,
  Consultations,
  Appointments,
  Treatments,
  Vaccinations,
  Diagnostics,
  Procedures,
  ServiceRevenue,
  ServiceProfitability
} from './VeterinaryServices';

// 7. Doctors
export {
  DoctorsDashboard,
  AllDoctors,
  DoctorPerformance,
  DoctorRevenue,
  DoctorPatients,
  DoctorOrders,
  DoctorCommissions,
  DoctorActivity,
  DoctorNetwork
} from './Doctors';

// 8. Clinics & Hospitals
export {
  ClinicsDashboard,
  AllClinics,
  Hospitals,
  ClinicPerformance,
  ClinicRevenue,
  ClinicOrders,
  ClinicPatients,
  ClinicDoctors,
  ClinicCommissions,
  ClinicNetwork
} from './ClinicsAndHospitals';

// 9. Customers 360°
export {
  CustomerDashboard,
  AllCustomers,
  NewCustomers,
  ActiveCustomers,
  RepeatCustomers,
  CustomerLifetimeValue,
  CustomerSegmentation,
  CustomerOrders,
  CustomerRevenue,
  CustomerRetention,
  CustomerComplaints
} from './Customers360';

// 10. Pets 360°
export { default as PetsDashboard } from './Pets360/PetsDashboard';

// 11. Employees & HR
export { default as HRDashboard } from './EmployeesAndHR/HRDashboard';
export { default as AllEmployees } from './EmployeesAndHR/AllEmployees';
export { default as Departments } from './EmployeesAndHR/Departments';
export { default as EmployeePerformance } from './EmployeesAndHR/EmployeePerformance';
export { default as EmployeeTargets } from './EmployeesAndHR/EmployeeTargets';
export { default as EmployeeProductivity } from './EmployeesAndHR/EmployeeProductivity';
export { default as Attendance } from './EmployeesAndHR/Attendance';
export { default as LeaveManagement } from './EmployeesAndHR/LeaveManagement';
export { default as Payroll } from './EmployeesAndHR/Payroll';
export { default as SalaryCost } from './EmployeesAndHR/SalaryCost';
export { default as Recruitment } from './EmployeesAndHR/Recruitment';
export { default as Onboarding } from './EmployeesAndHR/Onboarding';
export { default as EmployeeExpenses } from './EmployeesAndHR/EmployeeExpenses';

// 12. Finance & Accounting
export {
  FinanceDashboard,
  ProfitAndLoss,
  BalanceSheet,
  CashFlow,
  Revenue as FinanceRevenue,
  Expenses as FinanceExpenses,
  COGS,
  GrossProfit,
  EBITDA,
  NetProfit,
  AccountsReceivable,
  AccountsPayable,
  Invoices,
  Payments as FinancePayments,
  Refunds as FinanceRefunds,
  Taxes,
  FinancialForecast,
  CostAnalysis
} from './FinanceAndAccounting';

// 13. Marketing
export {
  MarketingDashboard,
  Campaigns,
  Leads,
  LeadSources,
  WebsiteAnalytics,
  AppAnalytics,
  SocialMedia,
  Advertising,
  MarketingSpend,
  CustomerAcquisition,
  CAC,
  ROAS,
  MarketingROI,
  ConversionFunnel
} from './Marketing';

// 14. Vendors & Procurement
export {
  VendorDashboard,
  AllVendors,
  VendorPerformance,
  VendorPayments,
  PurchaseOrders,
  Procurement,
  PurchaseHistory,
  SupplierPricing,
  SupplierPerformance,
  ProcurementSavings,
  VendorsDashboard
} from './VendorsAndProcurement';

// 15. Logistics & Delivery
export {
  LogisticsDashboard,
  DeliveryOrders,
  DeliveryPartners,
  DeliveryTracking,
  SixtyMinuteDelivery,
  DeliverySLA,
  DeliveryCost,
  FailedDeliveries,
  DeliveryPerformance
} from './LogisticsAndDelivery';

// 16. Zenve Fashion
export {
  FashionDashboard,
  FashionProducts,
  FashionOrders,
  FashionCustomers,
  FashionInventory,
  FashionShowrooms,
  OnlineFashionSales,
  FashionRevenue,
  FashionProfitability,
  FashionCollections
} from './ZenveFashion';

// 17. B2B / Enterprise
export {
  B2BDashboard,
  EnterpriseCustomers,
  CorporateAccounts,
  B2BOrders,
  B2BSales,
  B2BRevenue,
  Contracts,
  EnterprisePricing,
  B2BReceivables
} from './B2BEnterprise';

// 18. Import & Export
export {
  ImportDashboard,
  ExportDashboard,
  ImportOrders,
  ExportOrders,
  Suppliers,
  Buyers,
  CustomsDocumentation,
  TradeLogistics,
  ImportExportProfitability
} from './ImportAndExport';

// 19. Subscriptions
export {
  SubscriptionsDashboard,
  ActiveSubscriptions,
  NewSubscriptions,
  Renewals,
  ExpiringSubscriptions,
  Churn,
  SubscriptionRevenue,
  SubscriptionAnalytics
} from './Subscriptions';

// 19. Reports & Analytics
export {
  ReportsDashboard,
  SalesReport,
  RevenueReport,
  CustomerReport,
  PetReport,
  DoctorReport,
  ClinicReport,
  ProductReport,
  InventoryReport,
  FinanceReport,
  HRReport,
  MarketingReport,
  OperationsReport,
  VendorReport,
  CustomReports,
  ScheduledReports,
  ExportCenter
} from './ReportsAndAnalytics';

// 20. AI Assistant
export { default as AIAssistantDashboard } from './AIAssistant/AIAssistantDashboard';

// 21. Alerts & Notifications
export {
  AlertsDashboard,
  CriticalAlerts,
  RevenueAlerts,
  InventoryAlerts,
  PaymentAlerts,
  OrderAlerts,
  DeliveryAlerts,
  FinanceAlerts,
  HRAlerts,
  SystemAlerts,
  AlertRules,
  NotificationCenter
} from './AlertsAndNotifications';

// 22. Audit & Compliance
export { default as AuditDashboard } from './AuditAndCompliance/AuditDashboard';

// 23. System Health
export {
  SystemHealthDashboard,
  ApplicationHealth,
  ApiHealth,
  DatabaseHealth,
  PaymentGatewayHealth,
  CrmStatus,
  InventorySystemHealth,
  AccountingSystemHealth,
  MarketingIntegrations,
  NotificationServicesHealth,
  IntegrationLogs
} from './SystemHealth';

// 24. Settings
export { default as SettingsDashboard } from './Settings/SettingsDashboard';

// Category Registry Metadata
export const CATEGORIES_NAVIGATOR = [
  {
    category: 'Executive Dashboard',
    icon: '🏛️',
    items: ['Executive Dashboard', 'CEO Control Center', 'Business Overview', 'KPI Dashboard'],
    defaultPath: '/executive'
  },
  {
    category: 'Revenue & Sales',
    icon: '💼',
    items: [
      'Sales Dashboard',
      'Revenue by Channel',
      'Revenue by Location',
      'Revenue by Product',
      'Revenue by Employee',
      'Revenue by Doctor',
      'Revenue by Customer',
      'Sales Funnel',
      'Targets & Achievement',
      'Sales Forecast'
    ],
    defaultPath: '/sales'
  },
  {
    category: 'Orders & Operations',
    icon: '🚚',
    items: ['All Orders', 'Order Management', 'Order Status', 'Returns & Refunds', 'Cancellations', 'Delivery Performance', '60-Minute Delivery', 'Operations Dashboard'],
    defaultPath: '/orders'
  },
  {
    category: 'Products & Inventory',
    icon: '📦',
    items: [
      'Product Catalog',
      'SKU Management',
      'Inventory Dashboard',
      'Stock Management',
      'Low Stock',
      'Out of Stock',
      'Expiry Management',
      'Warehouse Management',
      'Stock Transfers',
      'Inventory Valuation',
      'Inventory Movement'
    ],
    defaultPath: '/inventory'
  },
  {
    category: 'Pharmacy',
    icon: '💊',
    items: [
      'Pharmacy Dashboard',
      'Pharmacy Sales',
      'Medicines',
      'Prescriptions',
      'Pharmacy Orders',
      'Batch Management',
      'Expiry Tracking',
      'Pharmacy Inventory',
      'Pharmacy Revenue',
      'Pharmacy Profitability'
    ],
    defaultPath: '/pharmacy'
  },
  {
    category: 'Veterinary Services',
    icon: '🩺',
    items: [
      'Services Dashboard',
      'Consultations',
      'Appointments',
      'Treatments',
      'Vaccinations',
      'Diagnostics',
      'Procedures',
      'Service Revenue',
      'Service Profitability'
    ],
    defaultPath: '/services'
  },
  {
    category: 'Doctors',
    icon: '👨‍⚕️',
    items: [
      'Doctors Dashboard',
      'All Doctors',
      'Doctor Performance',
      'Doctor Revenue',
      'Doctor Patients',
      'Doctor Orders',
      'Doctor Commissions',
      'Doctor Activity',
      'Doctor Network'
    ],
    defaultPath: '/doctors'
  },
  {
    category: 'Clinics & Hospitals',
    icon: '🏥',
    items: [
      'Clinics Dashboard',
      'All Clinics',
      'Hospitals',
      'Clinic Performance',
      'Clinic Revenue',
      'Clinic Orders',
      'Clinic Patients',
      'Clinic Doctors',
      'Clinic Commissions',
      'Clinic Network'
    ],
    defaultPath: '/clinics'
  },
  {
    category: 'Customers 360°',
    icon: '👥',
    items: [
      'Customer Dashboard',
      'All Customers',
      'New Customers',
      'Active Customers',
      'Repeat Customers',
      'Customer Lifetime Value',
      'Customer Segmentation',
      'Customer Orders',
      'Customer Revenue',
      'Customer Retention',
      'Customer Complaints'
    ],
    defaultPath: '/customers'
  },
  {
    category: 'Pets 360°',
    icon: '🐾',
    items: ['All Pets', 'Pet Profiles', 'Pet Health Records', 'Vaccination Records', 'Treatment History', 'Pet Analytics'],
    defaultPath: '/pets'
  },
  {
    category: 'Employees & HR',
    icon: '🧑‍💼',
    items: [
      'HR Dashboard',
      'All Employees',
      'Departments',
      'Employee Performance',
      'Employee Targets',
      'Employee Productivity',
      'Attendance',
      'Leave Management',
      'Payroll',
      'Salary Cost',
      'Recruitment',
      'Onboarding',
      'Employee Expenses'
    ],
    defaultPath: '/hr'
  },
  {
    category: 'Finance & Accounting',
    icon: '💰',
    items: [
      'Finance Dashboard',
      'Profit & Loss',
      'Balance Sheet',
      'Cash Flow',
      'Revenue',
      'Expenses',
      'COGS',
      'Gross Profit',
      'EBITDA',
      'Net Profit',
      'Accounts Receivable',
      'Accounts Payable',
      'Invoices',
      'Payments',
      'Refunds',
      'Taxes',
      'Financial Forecast',
      'Cost Analysis'
    ],
    defaultPath: '/finance'
  },
  {
    category: 'Marketing',
    icon: '📣',
    items: [
      'Marketing Dashboard',
      'Campaigns',
      'Leads',
      'Lead Sources',
      'Website Analytics',
      'App Analytics',
      'Social Media',
      'Advertising',
      'Marketing Spend',
      'Customer Acquisition',
      'CAC',
      'ROAS',
      'Marketing ROI',
      'Conversion Funnel'
    ],
    defaultPath: '/marketing'
  },
  {
    category: 'Vendors & Procurement',
    icon: '🤝',
    items: ['Vendor Dashboard', 'All Vendors', 'Vendor Performance', 'Vendor Payments', 'Purchase Orders', 'Procurement Savings'],
    defaultPath: '/vendors'
  },
  {
    category: 'Logistics & Delivery',
    icon: '⚡',
    items: [
      'Logistics Dashboard',
      'Delivery Orders',
      'Delivery Partners',
      'Delivery Tracking',
      '60-Minute Delivery',
      'Delivery SLA',
      'Delivery Cost',
      'Failed Deliveries',
      'Delivery Performance'
    ],
    defaultPath: '/logistics'
  },
  {
    category: 'Zenve Fashion',
    icon: '🎀',
    items: ['Fashion Dashboard', 'Fashion Products', 'Fashion Orders', 'Fashion Customers', 'Showrooms', 'Online Fashion Sales'],
    defaultPath: '/fashion'
  },
  {
    category: 'B2B / Enterprise',
    icon: '🏢',
    items: [
      'B2B Dashboard',
      'Enterprise Customers',
      'Corporate Accounts',
      'B2B Orders',
      'B2B Sales',
      'B2B Revenue',
      'Contracts',
      'Enterprise Pricing',
      'B2B Receivables'
    ],
    defaultPath: '/b2b'
  },
  {
    category: 'Import & Export',
    icon: '🌐',
    items: [
      'Import Dashboard',
      'Export Dashboard',
      'Import Orders',
      'Export Orders',
      'Suppliers',
      'Buyers',
      'Customs & Documentation',
      'Logistics',
      'Import/Export Profitability'
    ],
    defaultPath: '/import-export'
  },
  {
    category: 'Subscriptions',
    icon: '🔄',
    items: [
      'Subscription Dashboard',
      'Active Subscriptions',
      'New Subscriptions',
      'Renewals',
      'Expiring Subscriptions',
      'Churn',
      'Subscription Revenue',
      'Subscription Analytics'
    ],
    defaultPath: '/subscriptions'
  },
  {
    category: 'Reports & Analytics',
    icon: '📑',
    items: [
      'Sales Reports',
      'Revenue Reports',
      'Customer Reports',
      'Pet Reports',
      'Doctor Reports',
      'Clinic Reports',
      'Product Reports',
      'Inventory Reports',
      'Finance Reports',
      'HR Reports',
      'Marketing Reports',
      'Operations Reports',
      'Vendor Reports',
      'Custom Reports',
      'Scheduled Reports',
      'Export Center'
    ],
    defaultPath: '/reports'
  },
  {
    category: 'AI Assistant',
    icon: '🤖',
    items: ['Ask Zenve AI', 'Business Insights', 'Revenue Intelligence', 'Sales Forecast', 'Anomaly Detection'],
    defaultPath: '/ai'
  },
  {
    category: 'Alerts & Notifications',
    icon: '🔔',
    items: [
      'Critical Alerts',
      'Revenue Alerts',
      'Inventory Alerts',
      'Payment Alerts',
      'Order Alerts',
      'Delivery Alerts',
      'Finance Alerts',
      'HR Alerts',
      'System Alerts',
      'Alert Rules',
      'Notification Center'
    ],
    defaultPath: '/alerts'
  },
  {
    category: 'Audit & Compliance',
    icon: '🛡️',
    items: ['Audit Log', 'User Activity', 'Login History', 'Data Changes', 'Financial Audit Trail', 'Compliance Dashboard'],
    defaultPath: '/audit'
  },
  {
    category: 'System Health',
    icon: '🖥️',
    items: [
      'Application Health',
      'API Health',
      'Database Health',
      'Payment Gateway',
      'CRM Status',
      'Inventory System',
      'Accounting System',
      'Marketing Integrations',
      'Notification Services',
      'Integration Logs'
    ],
    defaultPath: '/health'
  },
  {
    category: 'Settings',
    icon: '⚙️',
    items: ['Company Settings', 'Business Units', 'Locations', 'Users', 'Roles & Permissions', 'API & Integrations', 'Security'],
    defaultPath: '/settings'
  }
];
