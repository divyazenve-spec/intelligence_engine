/* =====================================================================
   Zenve BI — Reports & Analytics Executive Command Center
   Comprehensive Multi-Domain Reporting Suite for All 16 Modules:
     1. Sales Reports (Net GMV, Gross Sales, Refunds, AOV & Channel Splits)
     2. Revenue Reports (5 BUs, Target vs Achievement, Margins & ARR)
     3. Customer Reports (142.5k Cohorts, Retention, LTV & RFM Matrix)
     4. Pet Reports (186.4k Pets, Breed Epidemiology & Vaccination)
     5. Doctor Reports (18 Specialist Case Volumes, Ratings & Commissions)
     6. Clinic Reports (5 Super-Specialty Hospitals, Bed Occupancy & OPD)
     7. Product Reports (4,200 SKUs, Pareto ABC Classification & Velocity)
     8. Inventory Reports (₹16.64Cr Valuation, DSI Days & Expiry Batches)
     9. Finance Reports (Audited GAAP P&L, EBITDA & Margin Expansion)
     10. HR Reports (300 Headcount, Payroll ₹1.87Cr, Attendance & Turn)
     11. Marketing Reports (4.7x ROAS, CAC ₹365 & Attribution Funnel)
     12. Operations Reports (96.2% 60-Min SLA, Rider Fleet & Dwell)
     13. Vendor Reports (48 Suppliers, OTIF Fulfillment & Savings)
     14. Custom Reports (Interactive Multi-Dimensional Pivot Builder)
     15. Scheduled Reports (Automated Cron Intelligence Dispatches)
     16. Export Center (10 Curated Raw Enterprise Datasets)
   ===================================================================== */

(function () {
  'use strict';

  /* ── 1. Module Registry ──────────────────────────────────────────── */
  var MODULES = [
    { id: 'sales',       label: 'Sales Reports',      icon: '📊', hash: '#sales-reports',      badge: '₹14.18Cr' },
    { id: 'revenue',     label: 'Revenue Reports',    icon: '💼', hash: '#revenue-reports',    badge: '104.2%' },
    { id: 'customer',    label: 'Customer Reports',   icon: '👥', hash: '#customer-reports',   badge: '142.5k' },
    { id: 'pet',         label: 'Pet Reports',        icon: '🐾', hash: '#pet-reports',        badge: '186.4k' },
    { id: 'doctor',      label: 'Doctor Reports',     icon: '🩺', hash: '#doctor-reports',     badge: '18 Vets' },
    { id: 'clinic',      label: 'Clinic Reports',     icon: '🏥', hash: '#clinic-reports',     badge: '5 Hospitals' },
    { id: 'product',     label: 'Product Reports',    icon: '🏷️', hash: '#product-reports',    badge: '4,200 SKUs' },
    { id: 'inventory',   label: 'Inventory Reports',  icon: '📦', hash: '#inventory-reports',  badge: '₹16.64Cr' },
    { id: 'finance',     label: 'Finance Reports',    icon: '💰', hash: '#finance-reports',    badge: '17.7% EBITDA' },
    { id: 'hr',          label: 'HR Reports',         icon: '🧑‍💼', hash: '#hr-reports',         badge: '300 Staff' },
    { id: 'marketing',   label: 'Marketing Reports',  icon: '📣', hash: '#marketing-reports',  badge: '4.7x ROAS' },
    { id: 'operations',  label: 'Operations Reports', icon: '🚚', hash: '#operations-reports', badge: '96.2% SLA' },
    { id: 'vendor',      label: 'Vendor Reports',     icon: '🤝', hash: '#vendor-reports',     badge: '48 Vendors' },
    { id: 'custom',      label: 'Custom Reports',     icon: '⚙️', hash: '#custom-reports',     badge: 'Query Builder' },
    { id: 'scheduled',   label: 'Scheduled Reports',  icon: '⏰', hash: '#scheduled-reports',  badge: '6 Active' },
    { id: 'export',      label: 'Export Center',      icon: '📥', hash: '#export-center',      badge: '10 Datasets' }
  ];

  /* ── 2. Data Store ───────────────────────────────────────────────── */
  var D = {
    // 1. Sales Data
    salesSummary: {
      grossSales: '₹14,80,45,200',
      discounts: '₹62,40,000',
      netSales: '₹14,18,05,200',
      refunds: '₹19,85,000',
      aov: '₹1,842',
      ordersCount: '77,010'
    },
    salesChannels: [
      { channel: 'Online Store & Mobile Apps', orders: '48,200', gross: '₹8,92,40,000', net: '₹8,55,10,000', share: '60.3%' },
      { channel: 'Super-Specialty Clinics OPD', orders: '14,850', gross: '₹3,42,10,000', net: '₹3,38,50,000', share: '23.8%' },
      { channel: '60-Min Express Tele-Meds', orders: '9,410', gross: '₹1,56,80,000', net: '₹1,48,20,000', share: '10.5%' },
      { channel: 'Corporate & B2B Veterinary', orders: '4,550', gross: '₹89,15,200', net: '₹76,25,200', share: '5.4%' }
    ],

    // 2. Revenue Data
    revenueBUs: [
      { unit: 'Pet Products & Nutrition', target: '₹6,00,00,000', achieved: '₹6,42,80,000', attainment: '107.1%', margin: '38.4%', trend: '+14.2%' },
      { unit: 'Prescription Pharmacy', target: '₹3,80,00,000', achieved: '₹3,94,20,000', attainment: '103.7%', margin: '44.2%', trend: '+8.6%' },
      { unit: 'Veterinary Clinical Services', target: '₹2,50,00,000', achieved: '₹2,68,50,000', attainment: '107.4%', margin: '58.2%', trend: '+18.1%' },
      { unit: 'Zenve Fashion & Wearables', target: '₹80,00,000', achieved: '₹74,10,000', attainment: '92.6%', margin: '52.0%', trend: '+4.5%' },
      { unit: 'B2B Enterprise Accounts', target: '₹40,00,000', achieved: '₹38,45,200', attainment: '96.1%', margin: '29.5%', trend: '+12.0%' }
    ],

    // 3. Customer Data
    customerCohorts: [
      { cohort: 'Jan 2026', users: '14,200', m1: '48.2%', m3: '42.1%', m6: '38.5%', m12: '35.2%', ltv: '₹9,840' },
      { cohort: 'Feb 2026', users: '15,800', m1: '51.4%', m3: '44.8%', m6: '40.2%', m12: '36.8%', ltv: '₹10,250' },
      { cohort: 'Mar 2026', users: '17,100', m1: '53.0%', m3: '46.2%', m6: '41.8%', m12: '37.4%', ltv: '₹10,680' },
      { cohort: 'Apr 2026', users: '18,500', m1: '54.6%', m3: '47.5%', m6: '42.9%', m12: '38.2%', ltv: '₹11,100' }
    ],

    // 4. Pet Epidemiology
    petBreeds: [
      { breed: 'Labrador Retriever', species: 'Dog', count: '42,500', avgAge: '4.2 yrs', topCondition: 'Hip Dysplasia & Diet', adherence: '94.2%' },
      { breed: 'Golden Retriever', species: 'Dog', count: '31,200', avgAge: '3.8 yrs', topCondition: 'Allergic Dermatitis', adherence: '92.8%' },
      { breed: 'Persian Cat', species: 'Cat', count: '24,800', avgAge: '2.9 yrs', topCondition: 'Hairball & Renal Care', adherence: '89.4%' },
      { breed: 'Shih Tzu', species: 'Dog', count: '19,400', avgAge: '3.1 yrs', topCondition: 'Ophthalmology & Teeth', adherence: '95.1%' },
      { breed: 'Indie / Mixed Breed', species: 'Dog', count: '18,600', avgAge: '4.8 yrs', topCondition: 'Vaccinations & Ticks', adherence: '91.7%' }
    ],

    // 5. Doctor Data
    doctors: [
      { name: 'Dr. Priya Sharma', specialty: 'Chief Veterinary Surgeon', consults: '1,420', surgeries: '148', satisfaction: '4.95 / 5.0', commission: '₹4,82,000' },
      { name: 'Dr. Rahul Mehta', specialty: 'Senior Orthopedic Vet', consults: '1,180', surgeries: '162', satisfaction: '4.92 / 5.0', commission: '₹4,25,000' },
      { name: 'Dr. Aisha Khan', specialty: 'Head of Veterinary Dermatology', consults: '1,340', surgeries: '24', satisfaction: '4.89 / 5.0', commission: '₹3,75,000' },
      { name: 'Dr. Karan Patel', specialty: 'Critical Care & Anesthesiology', consults: '980', surgeries: '112', satisfaction: '4.88 / 5.0', commission: '₹3,40,000' },
      { name: 'Dr. Neha Singh', specialty: 'Internal Medicine & Ultrasound', consults: '1,210', surgeries: '42', satisfaction: '4.86 / 5.0', commission: '₹3,15,000' }
    ],

    // 6. Clinic Data
    clinics: [
      { name: 'Koramangala 24/7 Super-Specialty', beds: '28', occupancy: '89.3%', opdDaily: '142', labTAT: '38 mins', revenue: '₹98,40,000' },
      { name: 'Indiranagar Urban Care Center', beds: '16', occupancy: '84.2%', opdDaily: '98', labTAT: '42 mins', revenue: '₹68,20,000' },
      { name: 'Whitefield Tech Corridor Hospital', beds: '22', occupancy: '82.0%', opdDaily: '114', labTAT: '40 mins', revenue: '₹74,50,000' },
      { name: 'Jayanagar Wellness & Diagnostics', beds: '12', occupancy: '76.4%', opdDaily: '78', labTAT: '46 mins', revenue: '₹49,80,000' },
      { name: 'HSR Layout Surgical Pavilion', beds: '18', occupancy: '81.5%', opdDaily: '88', labTAT: '44 mins', revenue: '₹57,60,000' }
    ],

    // 7. Product Data
    topProducts: [
      { sku: 'ZV-VET-001', name: 'Royal Canin Maxi Adult Dog Food 15kg', cat: 'Nutrition', units: '8,420', rev: '₹92,62,000', margin: '38.2%', abc: 'A' },
      { sku: 'ZV-MED-012', name: 'Bravecto Chewable Dog 20-40kg', cat: 'Pharmacy', units: '4,850', rev: '₹72,75,000', margin: '46.5%', abc: 'A' },
      { sku: 'ZV-VAC-004', name: 'Zoetis Vanguard Plus 5/L Vaccine 25-Dose', cat: 'Clinical', units: '3,200', rev: '₹57,60,000', margin: '52.0%', abc: 'A' },
      { sku: 'ZV-NUT-088', name: 'Farmina N&D Grain-Free Pumpkin Lamb 12kg', cat: 'Nutrition', units: '4,100', rev: '₹45,10,000', margin: '39.0%', abc: 'B' },
      { sku: 'ZV-MED-099', name: 'NexGard Spectra Medium 7.5-15kg', cat: 'Pharmacy', units: '3,950', rev: '₹39,50,000', margin: '48.2%', abc: 'B' }
    ],

    // 8. Inventory Data
    inventoryDepots: [
      { hub: 'Bengaluru Central Mega Depot', skus: '4,180', val: '₹10,24,00,000', dsi: '22.4 days', expiryNear: '₹4,80,000', space: '84.2%' },
      { hub: 'Indiranagar Urban Dark Store', skus: '1,420', val: '₹1,84,00,000', dsi: '16.8 days', expiryNear: '₹85,000', space: '76.5%' },
      { hub: 'Whitefield Quick-Commerce Hub', skus: '1,350', val: '₹1,72,00,000', dsi: '18.1 days', expiryNear: '₹92,000', space: '74.0%' },
      { hub: 'Koramangala 24/7 Clinical Depot', skus: '1,890', val: '₹2,10,00,000', dsi: '19.5 days', expiryNear: '₹1,12,000', space: '78.2%' },
      { hub: 'Jayanagar Micro-Fulfillment', skus: '1,120', val: '₹74,00,000', dsi: '14.2 days', expiryNear: '₹38,000', space: '69.0%' }
    ],

    // 9. Finance GAAP P&L
    financePnL: [
      { line: 'Gross Revenue from Operations', mtd: '₹14,80,45,200', qtd: '₹43,12,80,000', pct: '100.0%', note: 'Gross billing across all channels' },
      { line: 'Less: Promotional Discounts & Subsidies', mtd: '-₹62,40,000', qtd: '-₹1,82,40,000', pct: '-4.2%', note: 'App promotional cashback and coupons' },
      { line: 'Net Operating Revenue', mtd: '₹14,18,05,200', qtd: '₹41,30,40,000', pct: '95.8%', note: 'Audited baseline top-line' },
      { line: 'Cost of Goods Sold (COGS & Pharmacy)', mtd: '-₹8,25,30,000', qtd: '-₹24,18,00,000', pct: '-55.8%', note: 'Wholesale procurement + packaging' },
      { line: 'Gross Profit', mtd: '₹5,92,75,200', qtd: '₹17,12,40,000', pct: '41.8%', note: 'Gross margin expansion of +240 bps' },
      { line: 'Staff & Medical Specialist Payroll', mtd: '-₹1,87,40,000', qtd: '-₹5,62,20,000', pct: '-12.7%', note: '300 Full-time equivalent employees' },
      { line: 'Logistics, Dark Store & Rent Expenses', mtd: '-₹1,15,60,000', qtd: '-₹3,46,80,000', pct: '-7.8%', note: 'Hub leases and 60-min rider fleet' },
      { line: 'Sales, Marketing & CAC Attribution', mtd: '-₹38,50,000', qtd: '-₹1,15,50,000', pct: '-2.6%', note: 'Performance marketing ROAS 4.7x' },
      { line: 'EBITDA (Earnings Before Int, Tax, Dep)', mtd: '₹2,51,25,200', qtd: '₹6,87,90,000', pct: '17.7%', note: 'Operating cash surplus' },
      { line: 'Depreciation, Amortization & Taxes', mtd: '-₹62,80,000', qtd: '-₹1,88,40,000', pct: '-4.4%', note: 'Medical equipment & corporate tax' },
      { line: 'Audited Net Profit After Tax (PAT)', mtd: '₹1,88,45,200', qtd: '₹4,99,50,000', pct: '13.3%', note: 'Net bottom line profit' }
    ],

    // 10. HR & Workforce
    hrDepartments: [
      { dept: 'Veterinary Doctors & Specialists', count: 42, payroll: '₹54,60,000', attendance: '98.2%', turn: '1.2%' },
      { dept: 'ICU & Veterinary Nursing Staff', count: 68, payroll: '₹34,00,000', attendance: '97.5%', turn: '2.1%' },
      { dept: 'Pharmacy & Dispensing Chemists', count: 38, payroll: '₹22,80,000', attendance: '98.8%', turn: '1.0%' },
      { dept: 'Logistics, Riders & Warehouse Ops', count: 84, payroll: '₹37,80,000', attendance: '96.4%', turn: '3.2%' },
      { dept: 'HQ, Tech, Product & Administration', count: 68, payroll: '₹38,20,000', attendance: '99.1%', turn: '0.8%' }
    ],

    // 11. Marketing Attribution
    marketingChannels: [
      { channel: 'Google Search & Shopping (High Intent)', spend: '₹14,50,000', rev: '₹78,40,000', roas: '5.4x', cac: '₹310', newUsers: '4,680' },
      { channel: 'Meta (Instagram & Facebook Pet Reels)', spend: '₹12,80,000', rev: '₹56,32,000', roas: '4.4x', cac: '₹385', newUsers: '3,320' },
      { channel: 'Pet Influencer & Breeder Partnerships', spend: '₹5,40,000', rev: '₹25,92,000', roas: '4.8x', cac: '₹340', newUsers: '1,590' },
      { channel: 'Organic Viral Referral & Loyalty', spend: '₹2,10,000', rev: '₹14,70,000', roas: '7.0x', cac: '₹120', newUsers: '1,750' },
      { channel: 'Offline Clinic Pet Parent Events', spend: '₹3,70,000', rev: '₹12,21,000', roas: '3.3x', cac: '₹460', newUsers: '804' }
    ],

    // 12. Operations & Delivery SLAs
    operationsHubs: [
      { hub: 'Bengaluru Central Dark Store', orders: '18,400', avgMins: '38.4m', slaPass: '97.4%', activeRiders: '26', rating: '4.94' },
      { hub: 'Indiranagar Urban Node', orders: '12,900', avgMins: '34.2m', slaPass: '98.1%', activeRiders: '18', rating: '4.96' },
      { hub: 'Whitefield Express Staging', orders: '14,200', avgMins: '44.8m', slaPass: '95.2%', activeRiders: '20', rating: '4.88' },
      { hub: 'Koramangala 24/7 Dispatch', orders: '16,100', avgMins: '36.1m', slaPass: '96.8%', activeRiders: '22', rating: '4.92' },
      { hub: 'Jayanagar Rapid Hub', orders: '9,800', avgMins: '39.5m', slaPass: '96.0%', activeRiders: '14', rating: '4.90' }
    ],

    // 13. Vendor Scorecards
    vendors: [
      { name: 'Zoetis India Animal Health', category: 'Biologicals & Vaccines', poVolume: '₹2,84,00,000', fillRate: '98.8%', otif: '97.5%', rebate: '4.5%' },
      { name: 'Royal Canin Pet Health Nutrition', category: 'Specialized Nutrition', poVolume: '₹3,45,00,000', fillRate: '99.1%', otif: '98.2%', rebate: '5.2%' },
      { name: 'Boehringer Ingelheim Animal Health', category: 'Therapeutics & Parasiticides', poVolume: '₹1,98,00,000', fillRate: '96.4%', otif: '95.0%', rebate: '4.0%' },
      { name: 'Mars Petcare (Pedigree & Whiskas)', category: 'Commercial Nutrition', poVolume: '₹1,42,00,000', fillRate: '98.5%', otif: '97.8%', rebate: '3.8%' },
      { name: 'Virbac Animal Health India', category: 'Dermatology & Supplements', poVolume: '₹94,00,000', fillRate: '97.0%', otif: '96.2%', rebate: '4.2%' }
    ],

    // 14. Scheduled Reports
    schedules: [
      { id: 'SCH-01', title: 'Daily Executive GMV Flash Briefing', cron: '0 08:00 * * *', recipients: 'Board, CXOs, Finance', format: 'PDF + CSV', active: true, lastRun: 'Today, 08:00 IST' },
      { id: 'SCH-02', title: 'Weekly Cold-Chain & Expiry Risk Audit', cron: '0 09:00 * * 1', recipients: 'Supply Chain, Pharmacy Lead', format: 'XLSX + CSV', active: true, lastRun: 'Monday, 09:00 IST' },
      { id: 'SCH-03', title: 'Monthly GAAP Financial Reconciliation', cron: '0 07:00 1 * *', recipients: 'Finance Controllers, External Auditors', format: 'Audited PDF + CSV', active: true, lastRun: '1st of Month' },
      { id: 'SCH-04', title: 'Hourly 60-Minute Delivery SLA Telemetry', cron: '0 * * * *', recipients: 'Operations Heads, Dark Store Leads', format: 'Real-Time Alert Feed', active: true, lastRun: '12m ago' },
      { id: 'SCH-05', title: 'Doctor Consultation & Surgical Roster Summary', cron: '0 21:00 * * *', recipients: 'Medical Directors, Clinic Managers', format: 'PDF Report', active: true, lastRun: 'Yesterday, 21:00 IST' },
      { id: 'SCH-06', title: 'Marketing ROAS & CAC Multi-Touch Digest', cron: '0 10:00 * * 5', recipients: 'Growth Marketing, Performance Leads', format: 'CSV Data Pack', active: false, lastRun: 'Paused' }
    ],

    // 15. Export Datasets
    exportDatasets: [
      { id: 'EXP-01', name: 'Master Sales & Billing Ledger', records: '77,010 rows', size: '14.2 MB', freq: 'Real-time updated', tags: ['Sales', 'Finance', 'Orders'] },
      { id: 'EXP-02', name: 'Customer 360° Profile & Cohorts', records: '142,500 rows', size: '28.6 MB', freq: 'Daily sync', tags: ['Customers', 'LTV', 'Cohorts'] },
      { id: 'EXP-03', name: 'Pet Master & Epidemiology Register', records: '186,400 rows', size: '36.1 MB', freq: 'Daily sync', tags: ['Pets', 'Breeds', 'Clinical'] },
      { id: 'EXP-04', name: 'Inventory Batch Valuation & Expiry Audit', records: '18,450 rows', size: '4.8 MB', freq: 'Hourly sync', tags: ['Inventory', 'Warehouse', 'Batches'] },
      { id: 'EXP-05', name: 'Doctor Consultations & Surgical Telemetry', records: '24,600 rows', size: '5.2 MB', freq: 'Daily sync', tags: ['Doctors', 'Clinical', 'Surgeries'] },
      { id: 'EXP-06', name: 'Clinic Bed Occupancy & OPD Logs', records: '12,800 rows', size: '2.9 MB', freq: 'Daily sync', tags: ['Clinics', 'Hospitals', 'ICU'] },
      { id: 'EXP-07', name: 'GAAP P&L Statement & General Ledger Items', records: '4,850 rows', size: '1.2 MB', freq: 'Audited monthly', tags: ['Finance', 'GAAP', 'EBITDA'] },
      { id: 'EXP-08', name: 'Workforce Attendance, Roster & Payroll', records: '3,600 rows', size: '920 KB', freq: 'Bi-weekly sync', tags: ['HR', 'Payroll', 'Attendance'] },
      { id: 'EXP-09', name: 'Marketing Attribution & ROAS Data Pack', records: '48,200 rows', size: '8.4 MB', freq: 'Daily sync', tags: ['Marketing', 'ROAS', 'CAC'] },
      { id: 'EXP-10', name: '60-Minute Express SLA GPS Telemetry', records: '112,400 rows', size: '22.8 MB', freq: 'Real-time updated', tags: ['Operations', 'SLA', 'Riders'] }
    ]
  };

  /* ── 3. Application State ────────────────────────────────────────── */
  var S = {
    open: false,
    activeTab: 'sales',
    filterPeriod: 'month',
    searchQuery: '',
    customQuery: {
      dimension: 'channel',
      metric: 'net_sales',
      dateRange: '30d',
      resultRows: []
    }
  };

  var root = null;

  /* ── 4. Utility Functions ────────────────────────────────────────── */
  function downloadCSV(filename, rows) {
    var csvContent = rows.map(function (row) {
      return row.map(function (cell) {
        var str = String(cell !== undefined && cell !== null ? cell : '');
        if (str.search(/("|,|\n)/g) >= 0) {
          str = '"' + str.replace(/"/g, '""') + '"';
        }
        return str;
      }).join(',');
    }).join('\r\n');

    var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    var link = document.createElement('a');
    var url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Downloaded ' + filename);
  }

  function showToast(message) {
    var old = document.querySelector('.zrep-toast');
    if (old) old.remove();

    var toast = document.createElement('div');
    toast.className = 'zrep-toast';
    toast.innerHTML = '<span>⚡</span> <span>' + message + '</span>';
    document.body.appendChild(toast);

    setTimeout(function () {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 3200);
  }

  function tabFromHash(hash) {
    if (!hash) return null;
    var clean = hash.toLowerCase().trim();
    for (var i = 0; i < MODULES.length; i++) {
      if (MODULES[i].hash === clean || clean === '#' + MODULES[i].id) {
        return MODULES[i].id;
      }
    }
    if (clean === '#reports' || clean === '#analytics') return 'sales';
    return null;
  }

  function tabFromText(text) {
    if (!text) return null;
    var norm = text.toLowerCase().trim();
    for (var i = 0; i < MODULES.length; i++) {
      var m = MODULES[i];
      if (norm === m.label.toLowerCase() ||
          norm.indexOf(m.label.toLowerCase()) >= 0 ||
          norm === m.id ||
          (m.id === 'sales' && norm.indexOf('sales report') >= 0) ||
          (m.id === 'revenue' && norm.indexOf('revenue report') >= 0) ||
          (m.id === 'customer' && norm.indexOf('customer report') >= 0) ||
          (m.id === 'pet' && norm.indexOf('pet report') >= 0) ||
          (m.id === 'doctor' && norm.indexOf('doctor report') >= 0) ||
          (m.id === 'clinic' && norm.indexOf('clinic report') >= 0) ||
          (m.id === 'product' && norm.indexOf('product report') >= 0) ||
          (m.id === 'inventory' && norm.indexOf('inventory report') >= 0) ||
          (m.id === 'finance' && norm.indexOf('finance report') >= 0) ||
          (m.id === 'hr' && norm.indexOf('hr report') >= 0) ||
          (m.id === 'marketing' && norm.indexOf('marketing report') >= 0) ||
          (m.id === 'operations' && norm.indexOf('operations report') >= 0) ||
          (m.id === 'vendor' && norm.indexOf('vendor report') >= 0) ||
          (m.id === 'custom' && norm.indexOf('custom report') >= 0) ||
          (m.id === 'scheduled' && norm.indexOf('scheduled report') >= 0) ||
          (m.id === 'export' && norm.indexOf('export center') >= 0)) {
        return m.id;
      }
    }
    return null;
  }

  /* ── 5. Render Shell & Navigation ────────────────────────────────── */
  function ensureRoot() {
    if (!root) {
      root = document.getElementById('zrep-root');
      if (!root) {
        root = document.createElement('div');
        root.id = 'zrep-root';
        document.body.appendChild(root);
      }
    }
  }

  function renderShell() {
    ensureRoot();

    var chipsHtml = MODULES.map(function (m) {
      var isActive = m.id === S.activeTab;
      return (
        '<button type="button" class="zrep-chip ' + (isActive ? 'active' : '') + '" data-tab="' + m.id + '">' +
          '<span>' + m.icon + '</span>' +
          '<span>' + m.label + '</span>' +
          '<span class="zrep-chip-badge">' + m.badge + '</span>' +
        '</button>'
      );
    }).join('');

    root.innerHTML =
      '<header class="zrep-header">' +
        '<div class="zrep-header-left">' +
          '<div class="zrep-brand-badge">📑</div>' +
          '<div class="zrep-title-group">' +
            '<div class="zrep-title-row">' +
              '<h1 class="zrep-main-title">Reports &amp; Analytics</h1>' +
              '<span class="zrep-status-badge">' +
                '<span class="zrep-pulse-dot"></span>' +
                '16 Modules Connected' +
              '</span>' +
            '</div>' +
            '<p class="zrep-sub-title">Unified Multi-Domain Intelligence, Automated Schedules &amp; Enterprise Export Center</p>' +
          '</div>' +
        '</div>' +
        '<div class="zrep-header-actions">' +
          '<button type="button" class="zrep-btn zrep-btn-primary" id="zrep-action-custom">' +
            '<span>⚡</span> Run Custom Report' +
          '</button>' +
          '<button type="button" class="zrep-btn zrep-btn-outline" id="zrep-action-export">' +
            '<span>📥</span> Export Center' +
          '</button>' +
          '<button type="button" class="zrep-btn-close" id="zrep-close" title="Close Reports Center">✕</button>' +
        '</div>' +
      '</header>' +
      '<nav class="zrep-nav-ribbon" id="zrep-nav-ribbon">' +
        chipsHtml +
      '</nav>' +
      '<div class="zrep-main-workspace" id="zrep-workspace">' +
        renderActiveView() +
      '</div>';

    bindShellEvents();
  }

  function bindShellEvents() {
    // Nav chips
    var ribbon = document.getElementById('zrep-nav-ribbon');
    if (ribbon) {
      ribbon.querySelectorAll('.zrep-chip').forEach(function (chip) {
        chip.addEventListener('click', function () {
          var tab = this.getAttribute('data-tab');
          if (tab) switchTab(tab);
        });
      });
    }

    // Header buttons
    var btnClose = document.getElementById('zrep-close');
    if (btnClose) btnClose.addEventListener('click', close);

    var btnCustom = document.getElementById('zrep-action-custom');
    if (btnCustom) {
      btnCustom.addEventListener('click', function () {
        switchTab('custom');
      });
    }

    var btnExport = document.getElementById('zrep-action-export');
    if (btnExport) {
      btnExport.addEventListener('click', function () {
        switchTab('export');
      });
    }

    // Tab-specific interactive binds
    bindTabEvents();
  }

  /* ── 6. Render Active Tab View ───────────────────────────────────── */
  function renderActiveView() {
    switch (S.activeTab) {
      case 'sales':       return renderSalesReport();
      case 'revenue':     return renderRevenueReport();
      case 'customer':    return renderCustomerReport();
      case 'pet':         return renderPetReport();
      case 'doctor':      return renderDoctorReport();
      case 'clinic':      return renderClinicReport();
      case 'product':     return renderProductReport();
      case 'inventory':   return renderInventoryReport();
      case 'finance':     return renderFinanceReport();
      case 'hr':          return renderHRReport();
      case 'marketing':   return renderMarketingReport();
      case 'operations':  return renderOperationsReport();
      case 'vendor':      return renderVendorReport();
      case 'custom':      return renderCustomReports();
      case 'scheduled':   return renderScheduledReports();
      case 'export':      return renderExportCenter();
      default:            return renderSalesReport();
    }
  }

  /* ── Subpage 1: Sales Reports ────────────────────────────────────── */
  function renderSalesReport() {
    var chRows = D.salesChannels.map(function (c) {
      return (
        '<tr>' +
          '<td style="font-weight:600; color:#0f172a;">' + c.channel + '</td>' +
          '<td>' + c.orders + '</td>' +
          '<td>' + c.gross + '</td>' +
          '<td style="font-weight:700; color:#4f46e5;">' + c.net + '</td>' +
          '<td><span class="zrep-pill zrep-pill-purple">' + c.share + '</span></td>' +
        '</tr>'
      );
    }).join('');

    return (
      '<div class="zrep-view-panel active">' +
        '<div class="zrep-kpi-grid">' +
          '<div class="zrep-kpi-card">' +
            '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Gross Sales</span><span class="zrep-kpi-icon">💰</span></div>' +
            '<div class="zrep-kpi-value">' + D.salesSummary.grossSales + '</div>' +
            '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">↑ 14.8%</span><span class="zrep-kpi-desc">vs last period</span></div>' +
          '</div>' +
          '<div class="zrep-kpi-card">' +
            '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Net GMV Revenue</span><span class="zrep-kpi-icon">📈</span></div>' +
            '<div class="zrep-kpi-value" style="color:#4f46e5;">' + D.salesSummary.netSales + '</div>' +
            '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">↑ 16.2%</span><span class="zrep-kpi-desc">after discounts</span></div>' +
          '</div>' +
          '<div class="zrep-kpi-card">' +
            '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Total Orders</span><span class="zrep-kpi-icon">📦</span></div>' +
            '<div class="zrep-kpi-value">' + D.salesSummary.ordersCount + '</div>' +
            '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">↑ 11.4%</span><span class="zrep-kpi-desc">completed orders</span></div>' +
          '</div>' +
          '<div class="zrep-kpi-card">' +
            '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Average Order Value</span><span class="zrep-kpi-icon">🎯</span></div>' +
            '<div class="zrep-kpi-value">' + D.salesSummary.aov + '</div>' +
            '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">↑ 4.2%</span><span class="zrep-kpi-desc">basket size</span></div>' +
          '</div>' +
        '</div>' +

        '<div class="zrep-card">' +
          '<div class="zrep-card-header">' +
            '<div>' +
              '<h3 class="zrep-card-title">Channel Revenue Breakdown</h3>' +
              '<p class="zrep-card-subtitle">Gross billing, Net GMV and order contribution across all sales channels</p>' +
            '</div>' +
            '<button type="button" class="zrep-btn zrep-btn-outline" id="zrep-dl-sales">' +
              '<span>📥</span> Download Sales CSV' +
            '</button>' +
          '</div>' +
          '<div class="zrep-card-body">' +
            '<div class="zrep-table-wrap">' +
              '<table class="zrep-table">' +
                '<thead><tr><th>Sales Channel</th><th>Total Orders</th><th>Gross Billing</th><th>Net GMV</th><th>Contribution %</th></tr></thead>' +
                '<tbody>' + chRows + '</tbody>' +
              '</table>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  /* ── Subpage 2: Revenue Reports ──────────────────────────────────── */
  function renderRevenueReport() {
    var buRows = D.revenueBUs.map(function (b) {
      return (
        '<tr>' +
          '<td style="font-weight:600; color:#0f172a;">' + b.unit + '</td>' +
          '<td>' + b.target + '</td>' +
          '<td style="font-weight:700; color:#0f172a;">' + b.achieved + '</td>' +
          '<td><span class="zrep-pill zrep-pill-green">' + b.attainment + '</span></td>' +
          '<td><span class="zrep-pill zrep-pill-blue">' + b.margin + '</span></td>' +
          '<td style="color:#16a34a; font-weight:600;">' + b.trend + '</td>' +
        '</tr>'
      );
    }).join('');

    return (
      '<div class="zrep-view-panel active">' +
        '<div class="zrep-kpi-grid">' +
          '<div class="zrep-kpi-card">' +
            '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Period Revenue Attainment</span><span class="zrep-kpi-icon">🎯</span></div>' +
            '<div class="zrep-kpi-value">104.2%</div>' +
            '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">↑ +4.2%</span><span class="zrep-kpi-desc">above target</span></div>' +
          '</div>' +
          '<div class="zrep-kpi-card">' +
            '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Blended Gross Margin</span><span class="zrep-kpi-icon">💎</span></div>' +
            '<div class="zrep-kpi-value">41.8%</div>' +
            '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">↑ 240 bps</span><span class="zrep-kpi-desc">margin expansion</span></div>' +
          '</div>' +
          '<div class="zrep-kpi-card">' +
            '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Annual Recurring Revenue</span><span class="zrep-kpi-icon">🔄</span></div>' +
            '<div class="zrep-kpi-value">₹4.20Cr</div>' +
            '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">↑ 28%</span><span class="zrep-kpi-desc">wellness plans</span></div>' +
          '</div>' +
          '<div class="zrep-kpi-card">' +
            '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Cash Inflow Speed</span><span class="zrep-kpi-icon">⚡</span></div>' +
            '<div class="zrep-kpi-value">98.4%</div>' +
            '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">Instant UPI</span><span class="zrep-kpi-desc">same-day clearance</span></div>' +
          '</div>' +
        '</div>' +

        '<div class="zrep-card">' +
          '<div class="zrep-card-header">' +
            '<div>' +
              '<h3 class="zrep-card-title">Business Unit Performance vs Budget Targets</h3>' +
              '<p class="zrep-card-subtitle">Segment revenue, attainment % and gross margins across 5 core business units</p>' +
            '</div>' +
            '<button type="button" class="zrep-btn zrep-btn-outline" id="zrep-dl-revenue">' +
              '<span>📥</span> Download Revenue CSV' +
            '</button>' +
          '</div>' +
          '<div class="zrep-card-body">' +
            '<div class="zrep-table-wrap">' +
              '<table class="zrep-table">' +
                '<thead><tr><th>Business Unit</th><th>Target Budget</th><th>Actual Revenue</th><th>Attainment %</th><th>Gross Margin %</th><th>YoY Growth</th></tr></thead>' +
                '<tbody>' + buRows + '</tbody>' +
              '</table>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  /* ── Subpage 3: Customer Reports ─────────────────────────────────── */
  function renderCustomerReport() {
    var cohortRows = D.customerCohorts.map(function (c) {
      return (
        '<tr>' +
          '<td style="font-weight:600; color:#0f172a;">' + c.cohort + '</td>' +
          '<td>' + c.users + '</td>' +
          '<td><span class="zrep-pill zrep-pill-green">' + c.m1 + '</span></td>' +
          '<td><span class="zrep-pill zrep-pill-green">' + c.m3 + '</span></td>' +
          '<td><span class="zrep-pill zrep-pill-blue">' + c.m6 + '</span></td>' +
          '<td><span class="zrep-pill zrep-pill-purple">' + c.m12 + '</span></td>' +
          '<td style="font-weight:700; color:#4f46e5;">' + c.ltv + '</td>' +
        '</tr>'
      );
    }).join('');

    return (
      '<div class="zrep-view-panel active">' +
        '<div class="zrep-kpi-grid">' +
          '<div class="zrep-kpi-card">' +
            '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Registered Pet Parents</span><span class="zrep-kpi-icon">👥</span></div>' +
            '<div class="zrep-kpi-value">142,500</div>' +
            '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">↑ 8,240</span><span class="zrep-kpi-desc">new this month</span></div>' +
          '</div>' +
          '<div class="zrep-kpi-card">' +
            '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Repeat Purchase Rate</span><span class="zrep-kpi-icon">🔁</span></div>' +
            '<div class="zrep-kpi-value">64.8%</div>' +
            '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">↑ 3.2%</span><span class="zrep-kpi-desc">within 60 days</span></div>' +
          '</div>' +
          '<div class="zrep-kpi-card">' +
            '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Average Customer LTV</span><span class="zrep-kpi-icon">💎</span></div>' +
            '<div class="zrep-kpi-value">₹10,480</div>' +
            '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">↑ 18.4%</span><span class="zrep-kpi-desc">annualized</span></div>' +
          '</div>' +
          '<div class="zrep-kpi-card">' +
            '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Churn Risk Propensity</span><span class="zrep-kpi-icon">🛡️</span></div>' +
            '<div class="zrep-kpi-value">3.8%</div>' +
            '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">↓ 0.6%</span><span class="zrep-kpi-desc">ultra-low churn</span></div>' +
          '</div>' +
        '</div>' +

        '<div class="zrep-card">' +
          '<div class="zrep-card-header">' +
            '<div>' +
              '<h3 class="zrep-card-title">Customer Cohort Retention &amp; LTV Progression</h3>' +
              '<p class="zrep-card-subtitle">Monthly registration cohorts, retention milestones and accumulated lifetime value</p>' +
            '</div>' +
            '<button type="button" class="zrep-btn zrep-btn-outline" id="zrep-dl-customer">' +
              '<span>📥</span> Download Cohort CSV' +
            '</button>' +
          '</div>' +
          '<div class="zrep-card-body">' +
            '<div class="zrep-table-wrap">' +
              '<table class="zrep-table">' +
                '<thead><tr><th>Acquisition Cohort</th><th>Cohort Size</th><th>Month 1</th><th>Month 3</th><th>Month 6</th><th>Month 12</th><th>Estimated LTV</th></tr></thead>' +
                '<tbody>' + cohortRows + '</tbody>' +
              '</table>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  /* ── Subpage 4: Pet Reports ──────────────────────────────────────── */
  function renderPetReport() {
    var breedRows = D.petBreeds.map(function (p) {
      return (
        '<tr>' +
          '<td style="font-weight:600; color:#0f172a;">' + p.breed + '</td>' +
          '<td><span class="zrep-pill ' + (p.species === 'Dog' ? 'zrep-pill-blue' : 'zrep-pill-purple') + '">' + p.species + '</span></td>' +
          '<td style="font-weight:700;">' + p.count + '</td>' +
          '<td>' + p.avgAge + '</td>' +
          '<td>' + p.topCondition + '</td>' +
          '<td><span class="zrep-pill zrep-pill-green">' + p.adherence + '</span></td>' +
        '</tr>'
      );
    }).join('');

    return (
      '<div class="zrep-view-panel active">' +
        '<div class="zrep-kpi-grid">' +
          '<div class="zrep-kpi-card">' +
            '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Registered Pets</span><span class="zrep-kpi-icon">🐾</span></div>' +
            '<div class="zrep-kpi-value">186,400</div>' +
            '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">64% Dogs · 28% Cats</span></div>' +
          '</div>' +
          '<div class="zrep-kpi-card">' +
            '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Vaccination Adherence</span><span class="zrep-kpi-icon">💉</span></div>' +
            '<div class="zrep-kpi-value">92.6%</div>' +
            '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">↑ 2.4%</span><span class="zrep-kpi-desc">on-time immunizations</span></div>' +
          '</div>' +
          '<div class="zrep-kpi-card">' +
            '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Chronic Cohort Wellness</span><span class="zrep-kpi-icon">❤️</span></div>' +
            '<div class="zrep-kpi-value">18,240</div>' +
            '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">Renal, Cardiac &amp; Joint</span></div>' +
          '</div>' +
          '<div class="zrep-kpi-card">' +
            '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Avg Care Plans / Pet</span><span class="zrep-kpi-icon">📋</span></div>' +
            '<div class="zrep-kpi-value">2.4 Plans</div>' +
            '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">Nutritional &amp; Clinical</span></div>' +
          '</div>' +
        '</div>' +

        '<div class="zrep-card">' +
          '<div class="zrep-card-header">' +
            '<div>' +
              '<h3 class="zrep-card-title">Pet Breed Demographics &amp; Health Profile</h3>' +
              '<p class="zrep-card-subtitle">Epidemiology, average age, prevalent conditions and vaccination adherence rate</p>' +
            '</div>' +
            '<button type="button" class="zrep-btn zrep-btn-outline" id="zrep-dl-pet">' +
              '<span>📥</span> Download Pet CSV' +
            '</button>' +
          '</div>' +
          '<div class="zrep-card-body">' +
            '<div class="zrep-table-wrap">' +
              '<table class="zrep-table">' +
                '<thead><tr><th>Breed</th><th>Species</th><th>Total Registered</th><th>Average Age</th><th>Prevalent Health Profile</th><th>Vaccine Adherence</th></tr></thead>' +
                '<tbody>' + breedRows + '</tbody>' +
              '</table>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  /* ── Subpage 5: Doctor Reports ───────────────────────────────────── */
  function renderDoctorReport() {
    var docRows = D.doctors.map(function (d) {
      return (
        '<tr>' +
          '<td style="font-weight:600; color:#0f172a;">' + d.name + '</td>' +
          '<td>' + d.specialty + '</td>' +
          '<td>' + d.consults + '</td>' +
          '<td><span class="zrep-pill zrep-pill-purple">' + d.surgeries + '</span></td>' +
          '<td><span class="zrep-pill zrep-pill-green">★ ' + d.satisfaction + '</span></td>' +
          '<td style="font-weight:700; color:#0f172a;">' + d.commission + '</td>' +
        '</tr>'
      );
    }).join('');

    return (
      '<div class="zrep-view-panel active">' +
        '<div class="zrep-kpi-grid">' +
          '<div class="zrep-kpi-card">' +
            '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Active Surgeons &amp; Vets</span><span class="zrep-kpi-icon">🩺</span></div>' +
            '<div class="zrep-kpi-value">18 Specialists</div>' +
            '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">Full Super-Specialty Cover</span></div>' +
          '</div>' +
          '<div class="zrep-kpi-card">' +
            '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Total Consultations</span><span class="zrep-kpi-icon">📋</span></div>' +
            '<div class="zrep-kpi-value">14,280</div>' +
            '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">↑ 18.5%</span><span class="zrep-kpi-desc">OPD &amp; Tele-Vet</span></div>' +
          '</div>' +
          '<div class="zrep-kpi-card">' +
            '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Surgical Procedures</span><span class="zrep-kpi-icon">🔬</span></div>' +
            '<div class="zrep-kpi-value">588 Surgeries</div>' +
            '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">99.4% Success Rate</span></div>' +
          '</div>' +
          '<div class="zrep-kpi-card">' +
            '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Average Satisfaction</span><span class="zrep-kpi-icon">⭐</span></div>' +
            '<div class="zrep-kpi-value">4.88 / 5.0</div>' +
            '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">Pet Parent Rating</span></div>' +
          '</div>' +
        '</div>' +

        '<div class="zrep-card">' +
          '<div class="zrep-card-header">' +
            '<div>' +
              '<h3 class="zrep-card-title">Doctor Consultation Volume &amp; Clinical Benchmarks</h3>' +
              '<p class="zrep-card-subtitle">Consultation caseloads, surgical procedures, ratings and incentive payouts</p>' +
            '</div>' +
            '<button type="button" class="zrep-btn zrep-btn-outline" id="zrep-dl-doctor">' +
              '<span>📥</span> Download Doctor CSV' +
            '</button>' +
          '</div>' +
          '<div class="zrep-card-body">' +
            '<div class="zrep-table-wrap">' +
              '<table class="zrep-table">' +
                '<thead><tr><th>Veterinary Specialist</th><th>Clinical Specialty</th><th>Consultations</th><th>Surgeries</th><th>Pet Parent Rating</th><th>Commission Disbursed</th></tr></thead>' +
                '<tbody>' + docRows + '</tbody>' +
              '</table>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  /* ── Subpage 6: Clinic Reports ───────────────────────────────────── */
  function renderClinicReport() {
    // Clinic-specific department throughput data
    var deptData = [
      { dept: 'Cardiology & Cardiovascular ICU', cases: '1,840', avgLoS: '3.2 days', bedUtil: '91.4%', nurseRatio: '1:3', nps: '74', infectionRate: '0.08%' },
      { dept: 'Orthopedics & Rehabilitation', cases: '2,210', avgLoS: '4.1 days', bedUtil: '87.6%', nurseRatio: '1:4', nps: '78', infectionRate: '0.06%' },
      { dept: 'Neurology & Critical Care', cases: '980', avgLoS: '5.8 days', bedUtil: '84.2%', nurseRatio: '1:2', nps: '71', infectionRate: '0.12%' },
      { dept: 'Dermatology & Allergy OPD', cases: '3,640', avgLoS: '1.0 days', bedUtil: '72.0%', nurseRatio: '1:6', nps: '82', infectionRate: '0.02%' },
      { dept: 'Internal Medicine & Endocrinology', cases: '2,900', avgLoS: '2.6 days', bedUtil: '88.9%', nurseRatio: '1:4', nps: '76', infectionRate: '0.09%' },
      { dept: 'Diagnostic Imaging & Pathology Lab', cases: '5,820', avgLoS: '0.5 days', bedUtil: '68.0%', nurseRatio: '1:8', nps: '80', infectionRate: '0.01%' }
    ];

    // Clinic satisfaction & NABH data
    var satisfData = [
      { hub: 'Koramangala 24/7 Super-Specialty', nps: '76', csat: '4.82/5', nabh: 'Accredited', complaint: '0.4%', repeat: '68.2%' },
      { hub: 'Indiranagar Urban Care Center', nps: '79', csat: '4.88/5', nabh: 'Accredited', complaint: '0.3%', repeat: '71.4%' },
      { hub: 'Whitefield Tech Corridor Hospital', nps: '72', csat: '4.76/5', nabh: 'In Progress', complaint: '0.6%', repeat: '64.8%' },
      { hub: 'Jayanagar Wellness &amp; Diagnostics', nps: '68', csat: '4.71/5', nabh: 'Accredited', complaint: '0.8%', repeat: '62.1%' },
      { hub: 'HSR Layout Surgical Pavilion', nps: '74', csat: '4.80/5', nabh: 'Accredited', complaint: '0.5%', repeat: '66.9%' }
    ];

    var deptRows = deptData.map(function (d) {
      var npsColor = parseInt(d.nps) >= 75 ? 'zrep-pill-green' : (parseInt(d.nps) >= 70 ? 'zrep-pill-blue' : 'zrep-pill-amber');
      var infColor = parseFloat(d.infectionRate) <= 0.06 ? 'zrep-pill-green' : (parseFloat(d.infectionRate) <= 0.10 ? 'zrep-pill-blue' : 'zrep-pill-amber');
      return (
        '<tr>' +
          '<td style="font-weight:600; color:#0f172a;">' + d.dept + '</td>' +
          '<td>' + d.cases + '</td>' +
          '<td><span class="zrep-pill zrep-pill-purple">' + d.avgLoS + '</span></td>' +
          '<td><span class="zrep-pill zrep-pill-blue">' + d.bedUtil + '</span></td>' +
          '<td>' + d.nurseRatio + '</td>' +
          '<td><span class="zrep-pill ' + npsColor + '">NPS ' + d.nps + '</span></td>' +
          '<td><span class="zrep-pill ' + infColor + '">' + d.infectionRate + '</span></td>' +
        '</tr>'
      );
    }).join('');

    var satisfRows = satisfData.map(function (s) {
      var nabh = s.nabh === 'Accredited' ? 'zrep-pill-green' : 'zrep-pill-amber';
      return (
        '<tr>' +
          '<td style="font-weight:600; color:#0f172a;">' + s.hub + '</td>' +
          '<td><span class="zrep-pill zrep-pill-purple">NPS ' + s.nps + '</span></td>' +
          '<td><span class="zrep-pill zrep-pill-green">★ ' + s.csat + '</span></td>' +
          '<td><span class="zrep-pill ' + nabh + '">' + s.nabh + '</span></td>' +
          '<td>' + s.complaint + '</td>' +
          '<td style="font-weight:700; color:#0f172a;">' + s.repeat + '</td>' +
        '</tr>'
      );
    }).join('');

    return (
      '<div class="zrep-view-panel active">' +
        '<div class="zrep-kpi-grid">' +
          '<div class="zrep-kpi-card">' +
            '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Avg Length of Stay</span><span class="zrep-kpi-icon">🛏️</span></div>' +
            '<div class="zrep-kpi-value">2.8 Days</div>' +
            '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">↓ 0.4 days</span><span class="zrep-kpi-desc">vs last quarter</span></div>' +
          '</div>' +
          '<div class="zrep-kpi-card">' +
            '<div class="zrep-kpi-header"><span class="zrep-kpi-label">NABH Accredited Hubs</span><span class="zrep-kpi-icon">🏅</span></div>' +
            '<div class="zrep-kpi-value">4 / 5 Clinics</div>' +
            '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">Whitefield in review</span></div>' +
          '</div>' +
          '<div class="zrep-kpi-card">' +
            '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Avg Infection Rate</span><span class="zrep-kpi-icon">🦠</span></div>' +
            '<div class="zrep-kpi-value">0.063%</div>' +
            '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">↓ 0.018%</span><span class="zrep-kpi-desc">below WHO benchmark</span></div>' +
          '</div>' +
          '<div class="zrep-kpi-card">' +
            '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Overall Patient NPS</span><span class="zrep-kpi-icon">⭐</span></div>' +
            '<div class="zrep-kpi-value">NPS 74</div>' +
            '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">↑ 6 pts</span><span class="zrep-kpi-desc">across all hubs</span></div>' +
          '</div>' +
        '</div>' +

        '<div class="zrep-card">' +
          '<div class="zrep-card-header">' +
            '<div>' +
              '<h3 class="zrep-card-title">Department-wise Clinical Throughput &amp; Infection Control</h3>' +
              '<p class="zrep-card-subtitle">Admissions by department, average length of stay, bed utilization, nurse ratios, NPS and HAI infection rate</p>' +
            '</div>' +
            '<button type="button" class="zrep-btn zrep-btn-outline" id="zrep-dl-clinic-dept">' +
              '<span>📥</span> Download Dept CSV' +
            '</button>' +
          '</div>' +
          '<div class="zrep-card-body">' +
            '<div class="zrep-table-wrap">' +
              '<table class="zrep-table">' +
                '<thead><tr><th>Department</th><th>Cases</th><th>Avg LoS</th><th>Bed Utilization</th><th>Nurse:Patient</th><th>NPS Score</th><th>Infection Rate</th></tr></thead>' +
                '<tbody>' + deptRows + '</tbody>' +
              '</table>' +
            '</div>' +
          '</div>' +
        '</div>' +

        '<div class="zrep-card">' +
          '<div class="zrep-card-header">' +
            '<div>' +
              '<h3 class="zrep-card-title">Hub-wise Patient Satisfaction, NABH Compliance &amp; Repeat Visits</h3>' +
              '<p class="zrep-card-subtitle">CSAT scores, NPS per hospital hub, NABH accreditation status, complaint rate and repeat patient retention</p>' +
            '</div>' +
            '<button type="button" class="zrep-btn zrep-btn-outline" id="zrep-dl-clinic">' +
              '<span>📥</span> Download Clinic CSV' +
            '</button>' +
          '</div>' +
          '<div class="zrep-card-body">' +
            '<div class="zrep-table-wrap">' +
              '<table class="zrep-table">' +
                '<thead><tr><th>Hospital Hub</th><th>NPS</th><th>CSAT Rating</th><th>NABH Status</th><th>Complaint Rate</th><th>Repeat Visits</th></tr></thead>' +
                '<tbody>' + satisfRows + '</tbody>' +
              '</table>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  /* ── Subpage 7: Product Reports ──────────────────────────────────── */
  function renderProductReport() {
    var prodRows = D.topProducts.map(function (p) {
      return (
        '<tr>' +
          '<td style="font-family:monospace; font-size:11px;">' + p.sku + '</td>' +
          '<td style="font-weight:600; color:#0f172a;">' + p.name + '</td>' +
          '<td>' + p.cat + '</td>' +
          '<td>' + p.units + '</td>' +
          '<td style="font-weight:700; color:#0f172a;">' + p.rev + '</td>' +
          '<td><span class="zrep-pill zrep-pill-green">' + p.margin + '</span></td>' +
          '<td><span class="zrep-pill ' + (p.abc === 'A' ? 'zrep-pill-purple' : 'zrep-pill-blue') + '">Class ' + p.abc + '</span></td>' +
        '</tr>'
      );
    }).join('');

    return (
      '<div class="zrep-view-panel active">' +
        '<div class="zrep-kpi-grid">' +
          '<div class="zrep-kpi-card">' +
            '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Active SKUs</span><span class="zrep-kpi-icon">🏷️</span></div>' +
            '<div class="zrep-kpi-value">4,200 SKUs</div>' +
            '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">98.4% In-Stock Rate</span></div>' +
          '</div>' +
          '<div class="zrep-kpi-card">' +
            '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Class A Revenue Share</span><span class="zrep-kpi-icon">🏆</span></div>' +
            '<div class="zrep-kpi-value">74.2%</div>' +
            '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">Generated by top 20% SKUs</span></div>' +
          '</div>' +
          '<div class="zrep-kpi-card">' +
            '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Average Product Margin</span><span class="zrep-kpi-icon">💎</span></div>' +
            '<div class="zrep-kpi-value">44.8%</div>' +
            '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">Healthy SKU economics</span></div>' +
          '</div>' +
          '<div class="zrep-kpi-card">' +
            '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Product Return Rate</span><span class="zrep-kpi-icon">🔄</span></div>' +
            '<div class="zrep-kpi-value">1.4%</div>' +
            '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">↓ 0.3%</span><span class="zrep-kpi-desc">low return benchmark</span></div>' +
          '</div>' +
        '</div>' +

        '<div class="zrep-card">' +
          '<div class="zrep-card-header">' +
            '<div>' +
              '<h3 class="zrep-card-title">Top SKUs &amp; Pareto ABC Classification</h3>' +
              '<p class="zrep-card-subtitle">Unit velocity, revenue yield, gross margin and inventory ABC stratification</p>' +
            '</div>' +
            '<button type="button" class="zrep-btn zrep-btn-outline" id="zrep-dl-product">' +
              '<span>📥</span> Download Product CSV' +
            '</button>' +
          '</div>' +
          '<div class="zrep-card-body">' +
            '<div class="zrep-table-wrap">' +
              '<table class="zrep-table">' +
                '<thead><tr><th>SKU Code</th><th>Product Description</th><th>Category</th><th>Units Sold</th><th>Total Revenue</th><th>Margin %</th><th>ABC Class</th></tr></thead>' +
                '<tbody>' + prodRows + '</tbody>' +
              '</table>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  /* ── Subpage 8: Inventory Reports ────────────────────────────────── */
  function renderInventoryReport() {
    var invRows = D.inventoryDepots.map(function (d) {
      return (
        '<tr>' +
          '<td style="font-weight:600; color:#0f172a;">' + d.hub + '</td>' +
          '<td>' + d.skus + '</td>' +
          '<td style="font-weight:700; color:#4f46e5;">' + d.val + '</td>' +
          '<td><span class="zrep-pill zrep-pill-green">' + d.dsi + '</span></td>' +
          '<td><span class="zrep-pill ' + (d.expiryNear === '₹4,80,000' ? 'zrep-pill-amber' : 'zrep-pill-blue') + '">' + d.expiryNear + '</span></td>' +
          '<td><span class="zrep-pill zrep-pill-gray">' + d.space + '</span></td>' +
        '</tr>'
      );
    }).join('');

    return (
      '<div class="zrep-view-panel active">' +
        '<div class="zrep-kpi-grid">' +
          '<div class="zrep-kpi-card">' +
            '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Total Stock Valuation</span><span class="zrep-kpi-icon">📦</span></div>' +
            '<div class="zrep-kpi-value">₹16.64Cr</div>' +
            '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">Central + 4 Dark Stores</span></div>' +
          '</div>' +
          '<div class="zrep-kpi-card">' +
            '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Days Sales of Inventory</span><span class="zrep-kpi-icon">📅</span></div>' +
            '<div class="zrep-kpi-value">22.4 Days</div>' +
            '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">Optimal capital rotation</span></div>' +
          '</div>' +
          '<div class="zrep-kpi-card">' +
            '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Cold-Chain Vaccines</span><span class="zrep-kpi-icon">❄️</span></div>' +
            '<div class="zrep-kpi-value">100% Guarded</div>' +
            '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">+4°C IoT Telemetry live</span></div>' +
          '</div>' +
          '<div class="zrep-kpi-card">' +
            '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Shrinkage &amp; Discrepancy</span><span class="zrep-kpi-icon">🛡️</span></div>' +
            '<div class="zrep-kpi-value">0.18%</div>' +
            '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">Best-in-class audit score</span></div>' +
          '</div>' +
        '</div>' +

        '<div class="zrep-card">' +
          '<div class="zrep-card-header">' +
            '<div>' +
              '<h3 class="zrep-card-title">Warehouse &amp; Dark Store Stock Valuation</h3>' +
              '<p class="zrep-card-subtitle">Hub inventory valuation, days cover, expiry risk exposure and space utilization</p>' +
            '</div>' +
            '<button type="button" class="zrep-btn zrep-btn-outline" id="zrep-dl-inventory">' +
              '<span>📥</span> Download Inventory CSV' +
            '</button>' +
          '</div>' +
          '<div class="zrep-card-body">' +
            '<div class="zrep-table-wrap">' +
              '<table class="zrep-table">' +
                '<thead><tr><th>Warehouse / Depot Node</th><th>Active SKUs</th><th>Stock Valuation</th><th>DSI Cover</th><th>Expiring (&lt;60d)</th><th>Space Used</th></tr></thead>' +
                '<tbody>' + invRows + '</tbody>' +
              '</table>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  /* ── Subpage 9: Finance Reports ──────────────────────────────────── */
  function renderFinanceReport() {
    var pnlRows = D.financePnL.map(function (p) {
      var isNegative = p.mtd.charAt(0) === '-';
      var isHighlight = p.line.indexOf('Profit') >= 0 || p.line.indexOf('EBITDA') >= 0 || p.line.indexOf('Net Operating') >= 0;
      return (
        '<tr style="' + (isHighlight ? 'background:#f8fafc; font-weight:700;' : '') + '">' +
          '<td style="color:#0f172a;">' + p.line + '</td>' +
          '<td style="' + (isNegative ? 'color:#dc2626;' : 'color:#0f172a;') + '">' + p.mtd + '</td>' +
          '<td style="' + (isNegative ? 'color:#dc2626;' : 'color:#0f172a;') + '">' + p.qtd + '</td>' +
          '<td><span class="zrep-pill ' + (isNegative ? 'zrep-pill-red' : 'zrep-pill-green') + '">' + p.pct + '</span></td>' +
          '<td style="font-size:11.5px; color:#64748b;">' + p.note + '</td>' +
        '</tr>'
      );
    }).join('');

    return (
      '<div class="zrep-view-panel active">' +
        '<div class="zrep-kpi-grid">' +
          '<div class="zrep-kpi-card">' +
            '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Net Operating Revenue</span><span class="zrep-kpi-icon">💰</span></div>' +
            '<div class="zrep-kpi-value">₹14.18Cr</div>' +
            '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">MTD GAAP Audited</span></div>' +
          '</div>' +
          '<div class="zrep-kpi-card">' +
            '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Gross Margin</span><span class="zrep-kpi-icon">📊</span></div>' +
            '<div class="zrep-kpi-value">41.8%</div>' +
            '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">₹5.93Cr Gross Profit</span></div>' +
          '</div>' +
          '<div class="zrep-kpi-card">' +
            '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Operating EBITDA</span><span class="zrep-kpi-icon">📈</span></div>' +
            '<div class="zrep-kpi-value" style="color:#16a34a;">17.7%</div>' +
            '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">₹2.51Cr Cash Operating EBITDA</span></div>' +
          '</div>' +
          '<div class="zrep-kpi-card">' +
            '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Net Profit (PAT)</span><span class="zrep-kpi-icon">💎</span></div>' +
            '<div class="zrep-kpi-value" style="color:#4f46e5;">13.3%</div>' +
            '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">₹1.88Cr Post-Tax Bottom Line</span></div>' +
          '</div>' +
        '</div>' +

        '<div class="zrep-card">' +
          '<div class="zrep-card-header">' +
            '<div>' +
              '<h3 class="zrep-card-title">Audited GAAP Profit &amp; Loss Statement</h3>' +
              '<p class="zrep-card-subtitle">Comprehensive monthly and quarterly audited line item reconciliation</p>' +
            '</div>' +
            '<button type="button" class="zrep-btn zrep-btn-outline" id="zrep-dl-finance">' +
              '<span>📥</span> Download P&amp;L CSV' +
            '</button>' +
          '</div>' +
          '<div class="zrep-card-body">' +
            '<div class="zrep-table-wrap">' +
              '<table class="zrep-table">' +
                '<thead><tr><th>GAAP Line Item</th><th>MTD Actuals</th><th>QTD Accumulated</th><th>Revenue %</th><th>Financial Notes</th></tr></thead>' +
                '<tbody>' + pnlRows + '</tbody>' +
              '</table>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  /* ── Subpage 10: HR Reports ──────────────────────────────────────── */
  function renderHRReport() {
    var hrRows = D.hrDepartments.map(function (h) {
      return (
        '<tr>' +
          '<td style="font-weight:600; color:#0f172a;">' + h.dept + '</td>' +
          '<td style="font-weight:700;">' + h.count + ' FTEs</td>' +
          '<td style="font-weight:700; color:#0f172a;">' + h.payroll + '</td>' +
          '<td><span class="zrep-pill zrep-pill-green">' + h.attendance + '</span></td>' +
          '<td><span class="zrep-pill zrep-pill-blue">' + h.turn + '</span></td>' +
        '</tr>'
      );
    }).join('');

    return (
      '<div class="zrep-view-panel active">' +
        '<div class="zrep-kpi-grid">' +
          '<div class="zrep-kpi-card">' +
            '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Total Workforce Headcount</span><span class="zrep-kpi-icon">🧑‍💼</span></div>' +
            '<div class="zrep-kpi-value">300 Staff</div>' +
            '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">Clinical, Field &amp; HQ</span></div>' +
          '</div>' +
          '<div class="zrep-kpi-card">' +
            '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Monthly Payroll Outflow</span><span class="zrep-kpi-icon">💳</span></div>' +
            '<div class="zrep-kpi-value">₹1.87Cr</div>' +
            '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">100% On-time salary disbursement</span></div>' +
          '</div>' +
          '<div class="zrep-kpi-card">' +
            '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Blended Attendance Rate</span><span class="zrep-kpi-icon">⏱️</span></div>' +
            '<div class="zrep-kpi-value">98.1%</div>' +
            '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">High operational adherence</span></div>' +
          '</div>' +
          '<div class="zrep-kpi-card">' +
            '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Monthly Employee Turnover</span><span class="zrep-kpi-icon">🛡️</span></div>' +
            '<div class="zrep-kpi-value">1.8%</div>' +
            '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">↓ Industry-leading retention</span></div>' +
          '</div>' +
        '</div>' +

        '<div class="zrep-card">' +
          '<div class="zrep-card-header">' +
            '<div>' +
              '<h3 class="zrep-card-title">Department Headcount, Payroll &amp; Adherence</h3>' +
              '<p class="zrep-card-subtitle">Full-time employee allocation, monthly salary expenditure and staff turnover</p>' +
            '</div>' +
            '<button type="button" class="zrep-btn zrep-btn-outline" id="zrep-dl-hr">' +
              '<span>📥</span> Download HR CSV' +
            '</button>' +
          '</div>' +
          '<div class="zrep-card-body">' +
            '<div class="zrep-table-wrap">' +
              '<table class="zrep-table">' +
                '<thead><tr><th>Operating Department</th><th>Headcount (FTE)</th><th>Monthly Payroll</th><th>Attendance %</th><th>Monthly Turnover</th></tr></thead>' +
                '<tbody>' + hrRows + '</tbody>' +
              '</table>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  /* ── Subpage 11: Marketing Reports ───────────────────────────────── */
  function renderMarketingReport() {
    var mktRows = D.marketingChannels.map(function (m) {
      return (
        '<tr>' +
          '<td style="font-weight:600; color:#0f172a;">' + m.channel + '</td>' +
          '<td>' + m.spend + '</td>' +
          '<td style="font-weight:700; color:#4f46e5;">' + m.rev + '</td>' +
          '<td><span class="zrep-pill zrep-pill-green">' + m.roas + '</span></td>' +
          '<td><span class="zrep-pill zrep-pill-blue">' + m.cac + '</span></td>' +
          '<td style="font-weight:600;">' + m.newUsers + '</td>' +
        '</tr>'
      );
    }).join('');

    return (
      '<div class="zrep-view-panel active">' +
        '<div class="zrep-kpi-grid">' +
          '<div class="zrep-kpi-card">' +
            '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Blended Marketing ROAS</span><span class="zrep-kpi-icon">🎯</span></div>' +
            '<div class="zrep-kpi-value">4.7x</div>' +
            '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">₹1.81Cr Attributed GMV</span></div>' +
          '</div>' +
          '<div class="zrep-kpi-card">' +
            '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Customer Acquisition Cost</span><span class="zrep-kpi-icon">🏷️</span></div>' +
            '<div class="zrep-kpi-value">₹365</div>' +
            '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">LTV:CAC Ratio of 28.7x</span></div>' +
          '</div>' +
          '<div class="zrep-kpi-card">' +
            '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Total Performance Spend</span><span class="zrep-kpi-icon">💸</span></div>' +
            '<div class="zrep-kpi-value">₹38.5L</div>' +
            '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">2.6% of Net GMV</span></div>' +
          '</div>' +
          '<div class="zrep-kpi-card">' +
            '<div class="zrep-kpi-header"><span class="zrep-kpi-label">New Customers Acquired</span><span class="zrep-kpi-icon">👥</span></div>' +
            '<div class="zrep-kpi-value">12,144</div>' +
            '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">High pet parent intent</span></div>' +
          '</div>' +
        '</div>' +

        '<div class="zrep-card">' +
          '<div class="zrep-card-header">' +
            '<div>' +
              '<h3 class="zrep-card-title">Channel Marketing Attribution &amp; ROAS Economics</h3>' +
              '<p class="zrep-card-subtitle">Channel ad expenditure, attributed revenue, return on ad spend and unit CAC</p>' +
            '</div>' +
            '<button type="button" class="zrep-btn zrep-btn-outline" id="zrep-dl-marketing">' +
              '<span>📥</span> Download Marketing CSV' +
            '</button>' +
          '</div>' +
          '<div class="zrep-card-body">' +
            '<div class="zrep-table-wrap">' +
              '<table class="zrep-table">' +
                '<thead><tr><th>Marketing Attribution Channel</th><th>Ad Spend</th><th>Attributed Revenue</th><th>ROAS Multiple</th><th>Blended CAC</th><th>New Pet Parents</th></tr></thead>' +
                '<tbody>' + mktRows + '</tbody>' +
              '</table>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  /* ── Subpage 12: Operations Reports ──────────────────────────────── */
  function renderOperationsReport() {
    var opsRows = D.operationsHubs.map(function (o) {
      return (
        '<tr>' +
          '<td style="font-weight:600; color:#0f172a;">' + o.hub + '</td>' +
          '<td>' + o.orders + '</td>' +
          '<td><span class="zrep-pill zrep-pill-blue">' + o.avgMins + '</span></td>' +
          '<td><span class="zrep-pill zrep-pill-green">' + o.slaPass + '</span></td>' +
          '<td>' + o.activeRiders + ' riders</td>' +
          '<td><span class="zrep-pill zrep-pill-green">★ ' + o.rating + '</span></td>' +
        '</tr>'
      );
    }).join('');

    return (
      '<div class="zrep-view-panel active">' +
        '<div class="zrep-kpi-grid">' +
          '<div class="zrep-kpi-card">' +
            '<div class="zrep-kpi-header"><span class="zrep-kpi-label">60-Min Express SLA Rate</span><span class="zrep-kpi-icon">⚡</span></div>' +
            '<div class="zrep-kpi-value">96.2%</div>' +
            '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">Avg delivery 37.8 mins</span></div>' +
          '</div>' +
          '<div class="zrep-kpi-card">' +
            '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Active Delivery Fleet</span><span class="zrep-kpi-icon">🛵</span></div>' +
            '<div class="zrep-kpi-value">84 Riders</div>' +
            '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">GPS live telemetry connected</span></div>' +
          '</div>' +
          '<div class="zrep-kpi-card">' +
            '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Dark Store Staging Dwell</span><span class="zrep-kpi-icon">⏱️</span></div>' +
            '<div class="zrep-kpi-value">6.4 mins</div>' +
            '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">Order receipt to dispatch</span></div>' +
          '</div>' +
          '<div class="zrep-kpi-card">' +
            '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Delivery Satisfaction</span><span class="zrep-kpi-icon">⭐</span></div>' +
            '<div class="zrep-kpi-value">4.92 / 5.0</div>' +
            '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">Customer delivery score</span></div>' +
          '</div>' +
        '</div>' +

        '<div class="zrep-card">' +
          '<div class="zrep-card-header">' +
            '<div>' +
              '<h3 class="zrep-card-title">Dark Store Hub Dispatch &amp; Express Delivery Telemetry</h3>' +
              '<p class="zrep-card-subtitle">Orders processed, average delivery duration, SLA pass %, fleet size and ratings</p>' +
            '</div>' +
            '<button type="button" class="zrep-btn zrep-btn-outline" id="zrep-dl-operations">' +
              '<span>📥</span> Download Operations CSV' +
            '</button>' +
          '</div>' +
          '<div class="zrep-card-body">' +
            '<div class="zrep-table-wrap">' +
              '<table class="zrep-table">' +
                '<thead><tr><th>Dark Store Dispatch Hub</th><th>Orders Dispatched</th><th>Avg Delivery Time</th><th>60-Min SLA Pass</th><th>Active Fleet</th><th>Customer Rating</th></tr></thead>' +
                '<tbody>' + opsRows + '</tbody>' +
              '</table>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  /* ── Subpage 13: Vendor Reports ──────────────────────────────────── */
  function renderVendorReport() {
    var vRows = D.vendors.map(function (v) {
      return (
        '<tr>' +
          '<td style="font-weight:600; color:#0f172a;">' + v.name + '</td>' +
          '<td>' + v.category + '</td>' +
          '<td style="font-weight:700; color:#0f172a;">' + v.poVolume + '</td>' +
          '<td><span class="zrep-pill zrep-pill-green">' + v.fillRate + '</span></td>' +
          '<td><span class="zrep-pill zrep-pill-blue">' + v.otif + '</span></td>' +
          '<td><span class="zrep-pill zrep-pill-purple">' + v.rebate + '</span></td>' +
        '</tr>'
      );
    }).join('');

    return (
      '<div class="zrep-view-panel active">' +
        '<div class="zrep-kpi-grid">' +
          '<div class="zrep-kpi-card">' +
            '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Active Suppliers &amp; Vendors</span><span class="zrep-kpi-icon">🤝</span></div>' +
            '<div class="zrep-kpi-value">48 Vendors</div>' +
            '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">100% Compliant &amp; Licensed</span></div>' +
          '</div>' +
          '<div class="zrep-kpi-card">' +
            '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Purchase Order Fill Rate</span><span class="zrep-kpi-icon">📋</span></div>' +
            '<div class="zrep-kpi-value">97.8%</div>' +
            '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">High supply predictability</span></div>' +
          '</div>' +
          '<div class="zrep-kpi-card">' +
            '<div class="zrep-kpi-header"><span class="zrep-kpi-label">On-Time In-Full (OTIF)</span><span class="zrep-kpi-icon">⏱️</span></div>' +
            '<div class="zrep-kpi-value">96.8%</div>' +
            '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">Minimal stockout exposure</span></div>' +
          '</div>' +
          '<div class="zrep-kpi-card">' +
            '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Procurement Savings &amp; Rebates</span><span class="zrep-kpi-icon">💰</span></div>' +
            '<div class="zrep-kpi-value">₹42.8L</div>' +
            '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">Direct bottom-line savings</span></div>' +
          '</div>' +
        '</div>' +

        '<div class="zrep-card">' +
          '<div class="zrep-card-header">' +
            '<div>' +
              '<h3 class="zrep-card-title">Top Suppliers Scorecard &amp; Fulfillment Reliability</h3>' +
              '<p class="zrep-card-subtitle">Procurement volume, PO fulfillment rate, OTIF score and negotiated volume rebates</p>' +
            '</div>' +
            '<button type="button" class="zrep-btn zrep-btn-outline" id="zrep-dl-vendor">' +
              '<span>📥</span> Download Vendor CSV' +
            '</button>' +
          '</div>' +
          '<div class="zrep-card-body">' +
            '<div class="zrep-table-wrap">' +
              '<table class="zrep-table">' +
                '<thead><tr><th>Vendor / Supplier Organization</th><th>Supply Domain</th><th>PO Billing Volume</th><th>PO Fill Rate</th><th>OTIF Compliance</th><th>Negotiated Rebate</th></tr></thead>' +
                '<tbody>' + vRows + '</tbody>' +
              '</table>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  /* ── Subpage 14: Custom Reports Builder ──────────────────────────── */
  function renderCustomReports() {
    var previewRows = '';
    if (S.customQuery.resultRows && S.customQuery.resultRows.length > 0) {
      previewRows = S.customQuery.resultRows.map(function (r) {
        return (
          '<tr>' +
            '<td style="font-weight:600; color:#0f172a;">' + r.dim + '</td>' +
            '<td>' + r.sub + '</td>' +
            '<td style="font-weight:700; color:#4f46e5;">' + r.val + '</td>' +
            '<td>' + r.units + '</td>' +
            '<td><span class="zrep-pill zrep-pill-green">' + r.metric + '</span></td>' +
          '</tr>'
        );
      }).join('');
    } else {
      previewRows =
        '<tr><td colspan="5" style="text-align:center; padding:32px; color:#94a3b8;">' +
          'Click <b>"Execute Query"</b> to generate dynamic multi-dimensional dataset preview.' +
        '</td></tr>';
    }

    return (
      '<div class="zrep-view-panel active">' +
        '<div class="zrep-card">' +
          '<div class="zrep-card-header">' +
            '<div>' +
              '<h3 class="zrep-card-title"><span>⚡</span> Multi-Dimensional Custom Report Builder</h3>' +
              '<p class="zrep-card-subtitle">Construct ad-hoc multidimensional analytics queries across any combination of dimensions and metrics</p>' +
            '</div>' +
            '<div style="display:flex; gap:8px;">' +
              '<button type="button" class="zrep-btn zrep-btn-primary" id="zrep-run-query"><span>⚡</span> Execute Query</button>' +
              '<button type="button" class="zrep-btn zrep-btn-outline" id="zrep-export-query"><span>📥</span> Export Query CSV</button>' +
            '</div>' +
          '</div>' +
          '<div class="zrep-card-body">' +
            '<div class="zrep-builder-grid">' +
              '<div class="zrep-field-group">' +
                '<label class="zrep-field-label">Primary Dimension</label>' +
                '<select class="zrep-select" id="zrep-dim-primary" style="width:100%;">' +
                  '<option value="channel">Sales Channel (Online, Clinics, Express)</option>' +
                  '<option value="bu">Business Unit (Products, Pharmacy, Services)</option>' +
                  '<option value="doctor">Doctor &amp; Specialty</option>' +
                  '<option value="clinic">Clinic &amp; Hospital Node</option>' +
                  '<option value="breed">Pet Breed &amp; Species</option>' +
                  '<option value="vendor">Vendor &amp; Manufacturer</option>' +
                '</select>' +
              '</div>' +
              '<div class="zrep-field-group">' +
                '<label class="zrep-field-label">Secondary Stratification</label>' +
                '<select class="zrep-select" id="zrep-dim-secondary" style="width:100%;">' +
                  '<option value="month">Time Period (Month / Quarter)</option>' +
                  '<option value="sku_cat">SKU Product Category</option>' +
                  '<option value="city">Geographic City &amp; Hub</option>' +
                  '<option value="payment">Payment Mode (UPI, Cards, Corporate)</option>' +
                '</select>' +
              '</div>' +
              '<div class="zrep-field-group">' +
                '<label class="zrep-field-label">Date Window</label>' +
                '<select class="zrep-select" id="zrep-dim-range" style="width:100%;">' +
                  '<option value="mtd">Month to Date (Current Month)</option>' +
                  '<option value="last30">Last 30 Rolling Days</option>' +
                  '<option value="qtd">Quarter to Date (Q3 2026)</option>' +
                  '<option value="ytd">Year to Date (FY 2026)</option>' +
                '</select>' +
              '</div>' +
            '</div>' +

            '<div style="margin-top:14px; margin-bottom:18px;">' +
              '<label class="zrep-field-label" style="margin-bottom:8px; display:block;">Select Aggregated Metrics to Project</label>' +
              '<div class="zrep-check-grid">' +
                '<label class="zrep-check-item"><input type="checkbox" checked/> Gross Sales (₹)</label>' +
                '<label class="zrep-check-item"><input type="checkbox" checked/> Net GMV (₹)</label>' +
                '<label class="zrep-check-item"><input type="checkbox" checked/> Order Volume</label>' +
                '<label class="zrep-check-item"><input type="checkbox" checked/> Gross Margin %</label>' +
                '<label class="zrep-check-item"><input type="checkbox"/> Average Order Value (AOV)</label>' +
                '<label class="zrep-check-item"><input type="checkbox"/> Return / Refund %</label>' +
              '</div>' +
            '</div>' +

            '<div class="zrep-table-wrap">' +
              '<table class="zrep-table">' +
                '<thead><tr><th>Primary Dimension</th><th>Secondary Segment</th><th>Projected GMV</th><th>Volume / Units</th><th>Margin / Target</th></tr></thead>' +
                '<tbody id="zrep-query-table">' + previewRows + '</tbody>' +
              '</table>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  /* ── Subpage 15: Scheduled Reports ───────────────────────────────── */
  function renderScheduledReports() {
    var schedCards = D.schedules.map(function (s) {
      return (
        '<div class="zrep-sched-card">' +
          '<div>' +
            '<div class="zrep-sched-header">' +
              '<span class="zrep-sched-title">' + s.title + '</span>' +
              '<span class="zrep-sched-cron">⏱️ ' + s.cron + '</span>' +
            '</div>' +
            '<div style="font-size:12px; color:#64748b; margin-top:8px;">' +
              '<div><b>Recipients:</b> ' + s.recipients + '</div>' +
              '<div><b>Format:</b> ' + s.format + '</div>' +
              '<div><b>Last Dispatched:</b> ' + s.lastRun + '</div>' +
            '</div>' +
          '</div>' +
          '<div style="display:flex; align-items:center; justify-content:space-between; margin-top:12px; padding-top:12px; border-top:1px solid #f1f5f9;">' +
            '<span class="zrep-pill ' + (s.active ? 'zrep-pill-green' : 'zrep-pill-gray') + '">' +
              (s.active ? '● Active Schedule' : '○ Paused') +
            '</span>' +
            '<div style="display:flex; gap:6px;">' +
              '<button type="button" class="zrep-btn zrep-btn-outline zrep-run-schedule" data-id="' + s.id + '" style="padding:4px 8px; font-size:11px;">' +
                'Run Now' +
              '</button>' +
              '<button type="button" class="zrep-btn zrep-btn-outline zrep-toggle-schedule" data-id="' + s.id + '" style="padding:4px 8px; font-size:11px;">' +
                (s.active ? 'Pause' : 'Activate') +
              '</button>' +
            '</div>' +
          '</div>' +
        '</div>'
      );
    }).join('');

    return (
      '<div class="zrep-view-panel active">' +
        '<div class="zrep-card">' +
          '<div class="zrep-card-header">' +
            '<div>' +
              '<h3 class="zrep-card-title"><span>⏰</span> Automated Scheduled Intelligence Dispatches</h3>' +
              '<p class="zrep-card-subtitle">Manage recurring report generation cron jobs, recipient distributions and triggers</p>' +
            '</div>' +
            '<button type="button" class="zrep-btn zrep-btn-primary" id="zrep-new-schedule">' +
              '<span>＋</span> Schedule New Report' +
            '</button>' +
          '</div>' +
          '<div class="zrep-card-body">' +
            '<div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(340px, 1fr)); gap:16px;">' +
              schedCards +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  /* ── Subpage 16: Export Center ───────────────────────────────────── */
  function renderExportCenter() {
    var expRows = D.exportDatasets.map(function (e) {
      var tagPills = e.tags.map(function (t) {
        return '<span class="zrep-pill zrep-pill-gray" style="margin-right:4px;">' + t + '</span>';
      }).join('');

      return (
        '<tr>' +
          '<td style="font-family:monospace; font-size:11.5px; font-weight:600;">' + e.id + '</td>' +
          '<td>' +
            '<div style="font-weight:700; color:#0f172a;">' + e.name + '</div>' +
            '<div style="margin-top:2px;">' + tagPills + '</div>' +
          '</td>' +
          '<td style="font-weight:600;">' + e.records + '</td>' +
          '<td>' + e.size + '</td>' +
          '<td><span class="zrep-pill zrep-pill-blue">' + e.freq + '</span></td>' +
          '<td>' +
            '<button type="button" class="zrep-btn zrep-btn-primary zrep-download-dataset" data-id="' + e.id + '" data-name="' + e.name + '" style="padding:5px 12px; font-size:11.5px;">' +
              '<span>📥</span> Download CSV' +
            '</button>' +
          '</td>' +
        '</tr>'
      );
    }).join('');

    return (
      '<div class="zrep-view-panel active">' +
        '<div class="zrep-card">' +
          '<div class="zrep-card-header">' +
            '<div>' +
              '<h3 class="zrep-card-title"><span>📥</span> Centralized Raw Data Export Terminal</h3>' +
              '<p class="zrep-card-subtitle">Download sanitized, full-fidelity transactional datasets for Excel, PowerBI and Python analytics</p>' +
            '</div>' +
            '<button type="button" class="zrep-btn zrep-btn-outline" id="zrep-download-all-zip">' +
              '<span>📦</span> Download All Master Datasets' +
            '</button>' +
          '</div>' +
          '<div class="zrep-card-body">' +
            '<div class="zrep-table-wrap">' +
              '<table class="zrep-table">' +
                '<thead><tr><th>Dataset ID</th><th>Dataset Name &amp; Categorization</th><th>Total Record Count</th><th>File Payload</th><th>Refresh Cadence</th><th>Action</th></tr></thead>' +
                '<tbody>' + expRows + '</tbody>' +
              '</table>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  /* ── 7. Tab-Specific Event Bindings ──────────────────────────────── */
  function bindTabEvents() {
    // 1. Sales Download
    var btnDlSales = document.getElementById('zrep-dl-sales');
    if (btnDlSales) {
      btnDlSales.addEventListener('click', function () {
        var rows = [
          ['ZENVE BI — SALES REPORT', new Date().toISOString()],
          ['Gross Sales', D.salesSummary.grossSales],
          ['Discounts', D.salesSummary.discounts],
          ['Net Sales', D.salesSummary.netSales],
          ['Refunds', D.salesSummary.refunds],
          ['AOV', D.salesSummary.aov],
          [],
          ['Channel', 'Orders', 'Gross Sales', 'Net GMV', 'Share %']
        ];
        D.salesChannels.forEach(function (c) {
          rows.push([c.channel, c.orders, c.gross, c.net, c.share]);
        });
        downloadCSV('zenve-sales-report.csv', rows);
      });
    }

    // 2. Revenue Download
    var btnDlRev = document.getElementById('zrep-dl-revenue');
    if (btnDlRev) {
      btnDlRev.addEventListener('click', function () {
        var rows = [
          ['ZENVE BI — REVENUE REPORT', new Date().toISOString()],
          ['Business Unit', 'Target', 'Actual', 'Attainment', 'Gross Margin', 'Trend']
        ];
        D.revenueBUs.forEach(function (b) {
          rows.push([b.unit, b.target, b.achieved, b.attainment, b.margin, b.trend]);
        });
        downloadCSV('zenve-revenue-report.csv', rows);
      });
    }

    // 3. Customer Download
    var btnDlCust = document.getElementById('zrep-dl-customer');
    if (btnDlCust) {
      btnDlCust.addEventListener('click', function () {
        var rows = [
          ['ZENVE BI — CUSTOMER COHORT REPORT', new Date().toISOString()],
          ['Cohort', 'Users', 'Month 1', 'Month 3', 'Month 6', 'Month 12', 'Est LTV']
        ];
        D.customerCohorts.forEach(function (c) {
          rows.push([c.cohort, c.users, c.m1, c.m3, c.m6, c.m12, c.ltv]);
        });
        downloadCSV('zenve-customer-cohorts.csv', rows);
      });
    }

    // 4. Pet Download
    var btnDlPet = document.getElementById('zrep-dl-pet');
    if (btnDlPet) {
      btnDlPet.addEventListener('click', function () {
        var rows = [
          ['ZENVE BI — PET DEMOGRAPHICS & EPIDEMIOLOGY', new Date().toISOString()],
          ['Breed', 'Species', 'Registered Count', 'Average Age', 'Top Health Condition', 'Vaccine Adherence']
        ];
        D.petBreeds.forEach(function (p) {
          rows.push([p.breed, p.species, p.count, p.avgAge, p.topCondition, p.adherence]);
        });
        downloadCSV('zenve-pet-epidemiology.csv', rows);
      });
    }

    // 5. Doctor Download
    var btnDlDoc = document.getElementById('zrep-dl-doctor');
    if (btnDlDoc) {
      btnDlDoc.addEventListener('click', function () {
        var rows = [
          ['ZENVE BI — DOCTOR PERFORMANCE REPORT', new Date().toISOString()],
          ['Doctor Name', 'Specialty', 'Consultations', 'Surgeries', 'Satisfaction', 'Commission']
        ];
        D.doctors.forEach(function (d) {
          rows.push([d.name, d.specialty, d.consults, d.surgeries, d.satisfaction, d.commission]);
        });
        downloadCSV('zenve-doctor-performance.csv', rows);
      });
    }

    // 6. Clinic Hub Satisfaction Download
    var btnDlClinic = document.getElementById('zrep-dl-clinic');
    if (btnDlClinic) {
      btnDlClinic.addEventListener('click', function () {
        var rows = [
          ['ZENVE BI — CLINIC PATIENT SATISFACTION & NABH REPORT', new Date().toISOString()],
          ['Hospital Hub', 'NPS Score', 'CSAT Rating', 'NABH Status', 'Complaint Rate', 'Repeat Visit Rate']
        ];
        var satisfDataLocal = [
          ['Koramangala 24/7 Super-Specialty', '76', '4.82/5', 'Accredited', '0.4%', '68.2%'],
          ['Indiranagar Urban Care Center', '79', '4.88/5', 'Accredited', '0.3%', '71.4%'],
          ['Whitefield Tech Corridor Hospital', '72', '4.76/5', 'In Progress', '0.6%', '64.8%'],
          ['Jayanagar Wellness & Diagnostics', '68', '4.71/5', 'Accredited', '0.8%', '62.1%'],
          ['HSR Layout Surgical Pavilion', '74', '4.80/5', 'Accredited', '0.5%', '66.9%']
        ];
        satisfDataLocal.forEach(function (r) { rows.push(r); });
        downloadCSV('zenve-clinic-satisfaction-nabh.csv', rows);
      });
    }

    // 6b. Clinic Department Throughput Download
    var btnDlClinicDept = document.getElementById('zrep-dl-clinic-dept');
    if (btnDlClinicDept) {
      btnDlClinicDept.addEventListener('click', function () {
        var rows = [
          ['ZENVE BI — CLINIC DEPARTMENT THROUGHPUT & INFECTION CONTROL', new Date().toISOString()],
          ['Department', 'Cases', 'Avg LoS', 'Bed Utilization', 'Nurse:Patient Ratio', 'NPS Score', 'Infection Rate']
        ];
        var deptLocal = [
          ['Cardiology & Cardiovascular ICU', '1,840', '3.2 days', '91.4%', '1:3', '74', '0.08%'],
          ['Orthopedics & Rehabilitation', '2,210', '4.1 days', '87.6%', '1:4', '78', '0.06%'],
          ['Neurology & Critical Care', '980', '5.8 days', '84.2%', '1:2', '71', '0.12%'],
          ['Dermatology & Allergy OPD', '3,640', '1.0 days', '72.0%', '1:6', '82', '0.02%'],
          ['Internal Medicine & Endocrinology', '2,900', '2.6 days', '88.9%', '1:4', '76', '0.09%'],
          ['Diagnostic Imaging & Pathology Lab', '5,820', '0.5 days', '68.0%', '1:8', '80', '0.01%']
        ];
        deptLocal.forEach(function (r) { rows.push(r); });
        downloadCSV('zenve-clinic-department-throughput.csv', rows);
      });
    }

    // 7. Product Download
    var btnDlProd = document.getElementById('zrep-dl-product');
    if (btnDlProd) {
      btnDlProd.addEventListener('click', function () {
        var rows = [
          ['ZENVE BI — PRODUCT SKU REPORT', new Date().toISOString()],
          ['SKU', 'Name', 'Category', 'Units Sold', 'Revenue', 'Margin', 'ABC Class']
        ];
        D.topProducts.forEach(function (p) {
          rows.push([p.sku, p.name, p.cat, p.units, p.rev, p.margin, p.abc]);
        });
        downloadCSV('zenve-product-skus.csv', rows);
      });
    }

    // 8. Inventory Download
    var btnDlInv = document.getElementById('zrep-dl-inventory');
    if (btnDlInv) {
      btnDlInv.addEventListener('click', function () {
        var rows = [
          ['ZENVE BI — INVENTORY VALUATION REPORT', new Date().toISOString()],
          ['Hub', 'SKUs', 'Valuation', 'DSI Cover', 'Expiring Soon', 'Space Used']
        ];
        D.inventoryDepots.forEach(function (i) {
          rows.push([i.hub, i.skus, i.val, i.dsi, i.expiryNear, i.space]);
        });
        downloadCSV('zenve-inventory-valuation.csv', rows);
      });
    }

    // 9. Finance Download
    var btnDlFin = document.getElementById('zrep-dl-finance');
    if (btnDlFin) {
      btnDlFin.addEventListener('click', function () {
        var rows = [
          ['ZENVE BI — GAAP P&L REPORT', new Date().toISOString()],
          ['Line Item', 'MTD Actual', 'QTD Actual', 'Revenue %', 'Notes']
        ];
        D.financePnL.forEach(function (p) {
          rows.push([p.line, p.mtd, p.qtd, p.pct, p.note]);
        });
        downloadCSV('zenve-finance-gaap-pnl.csv', rows);
      });
    }

    // 10. HR Download
    var btnDlHr = document.getElementById('zrep-dl-hr');
    if (btnDlHr) {
      btnDlHr.addEventListener('click', function () {
        var rows = [
          ['ZENVE BI — WORKFORCE HR REPORT', new Date().toISOString()],
          ['Department', 'Headcount', 'Monthly Payroll', 'Attendance', 'Monthly Turnover']
        ];
        D.hrDepartments.forEach(function (h) {
          rows.push([h.dept, h.count, h.payroll, h.attendance, h.turn]);
        });
        downloadCSV('zenve-hr-workforce-report.csv', rows);
      });
    }

    // 11. Marketing Download
    var btnDlMkt = document.getElementById('zrep-dl-marketing');
    if (btnDlMkt) {
      btnDlMkt.addEventListener('click', function () {
        var rows = [
          ['ZENVE BI — MARKETING ATTRIBUTION REPORT', new Date().toISOString()],
          ['Channel', 'Ad Spend', 'Attributed Revenue', 'ROAS', 'CAC', 'New Pet Parents']
        ];
        D.marketingChannels.forEach(function (m) {
          rows.push([m.channel, m.spend, m.rev, m.roas, m.cac, m.newUsers]);
        });
        downloadCSV('zenve-marketing-roas-report.csv', rows);
      });
    }

    // 12. Operations Download
    var btnDlOps = document.getElementById('zrep-dl-operations');
    if (btnDlOps) {
      btnDlOps.addEventListener('click', function () {
        var rows = [
          ['ZENVE BI — OPERATIONS & DELIVERY SLA REPORT', new Date().toISOString()],
          ['Dispatch Hub', 'Orders Dispatched', 'Average Mins', '60-Min SLA Pass', 'Riders Fleet', 'Rating']
        ];
        D.operationsHubs.forEach(function (o) {
          rows.push([o.hub, o.orders, o.avgMins, o.slaPass, o.activeRiders, o.rating]);
        });
        downloadCSV('zenve-operations-delivery-sla.csv', rows);
      });
    }

    // 13. Vendor Download
    var btnDlVen = document.getElementById('zrep-dl-vendor');
    if (btnDlVen) {
      btnDlVen.addEventListener('click', function () {
        var rows = [
          ['ZENVE BI — VENDOR SCORECARD REPORT', new Date().toISOString()],
          ['Vendor', 'Category', 'PO Volume', 'Fill Rate', 'OTIF Compliance', 'Rebate']
        ];
        D.vendors.forEach(function (v) {
          rows.push([v.name, v.category, v.poVolume, v.fillRate, v.otif, v.rebate]);
        });
        downloadCSV('zenve-vendor-scorecards.csv', rows);
      });
    }

    // 14. Custom Reports Query Runner
    var btnRunQuery = document.getElementById('zrep-run-query');
    if (btnRunQuery) {
      btnRunQuery.addEventListener('click', function () {
        var prim = document.getElementById('zrep-dim-primary') ? document.getElementById('zrep-dim-primary').value : 'channel';
        var sec = document.getElementById('zrep-dim-secondary') ? document.getElementById('zrep-dim-secondary').value : 'month';

        var rows = [];
        if (prim === 'channel') {
          rows = [
            { dim: 'Online App & Web Store', sub: 'Q3 2026', val: '₹8,55,10,000', units: '48,200 orders', metric: '60.3% share' },
            { dim: 'Veterinary Clinics OPD', sub: 'Q3 2026', val: '₹3,38,50,000', units: '14,850 orders', metric: '23.8% share' },
            { dim: '60-Minute Tele-Meds', sub: 'Q3 2026', val: '₹1,48,20,000', units: '9,410 orders', metric: '10.5% share' },
            { dim: 'Corporate B2B Accounts', sub: 'Q3 2026', val: '₹76,25,200', units: '4,550 orders', metric: '5.4% share' }
          ];
        } else if (prim === 'doctor') {
          rows = [
            { dim: 'Dr. Priya Sharma', sub: 'Chief Surgery', val: '₹48,20,000', units: '1,420 consults', metric: '4.95 Rating' },
            { dim: 'Dr. Rahul Mehta', sub: 'Orthopedic Vet', val: '₹42,50,000', units: '1,180 consults', metric: '4.92 Rating' },
            { dim: 'Dr. Aisha Khan', sub: 'Dermatology', val: '₹37,50,000', units: '1,340 consults', metric: '4.89 Rating' }
          ];
        } else {
          rows = [
            { dim: 'Pet Nutrition & Food', sub: 'Pan-India', val: '₹6,42,80,000', units: '34,200 units', metric: '38.4% Margin' },
            { dim: 'Prescription Pharmacy', sub: 'Pan-India', val: '₹3,94,20,000', units: '21,800 units', metric: '44.2% Margin' },
            { dim: 'Clinical Surgery & Care', sub: 'Pan-India', val: '₹2,68,50,000', units: '14,280 units', metric: '58.2% Margin' }
          ];
        }
        S.customQuery.resultRows = rows;
        showToast('Query executed successfully (' + rows.length + ' rows generated)');
        switchTab('custom');
      });
    }

    var btnExpQuery = document.getElementById('zrep-export-query');
    if (btnExpQuery) {
      btnExpQuery.addEventListener('click', function () {
        var rows = [
          ['ZENVE BI — AD-HOC CUSTOM QUERY EXPORT', new Date().toISOString()],
          ['Primary Dimension', 'Secondary Stratification', 'Projected GMV', 'Volume', 'Metric']
        ];
        if (S.customQuery.resultRows && S.customQuery.resultRows.length > 0) {
          S.customQuery.resultRows.forEach(function (r) {
            rows.push([r.dim, r.sub, r.val, r.units, r.metric]);
          });
        }
        downloadCSV('zenve-custom-query-export.csv', rows);
      });
    }

    // 15. Scheduled Reports: Run Now and Toggle Active
    document.querySelectorAll('.zrep-run-schedule').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = this.getAttribute('data-id');
        showToast('Triggered immediate ad-hoc dispatch for schedule ' + id);
      });
    });

    document.querySelectorAll('.zrep-toggle-schedule').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = this.getAttribute('data-id');
        for (var i = 0; i < D.schedules.length; i++) {
          if (D.schedules[i].id === id) {
            D.schedules[i].active = !D.schedules[i].active;
            showToast((D.schedules[i].active ? 'Activated' : 'Paused') + ' schedule ' + id);
            break;
          }
        }
        switchTab('scheduled');
      });
    });

    // Schedule New Report Modal
    var btnNewSched = document.getElementById('zrep-new-schedule');
    if (btnNewSched) {
      btnNewSched.addEventListener('click', function () {
        openNewScheduleModal();
      });
    }

    // 16. Export Center Dataset Downloads
    document.querySelectorAll('.zrep-download-dataset').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = this.getAttribute('data-id');
        var name = this.getAttribute('data-name');
        var filename = name.toLowerCase().replace(/[^a-z0-9]+/g, '_') + '.csv';

        var rows = [
          ['ZENVE BI RAW DATASET EXPORT', id, name],
          ['GENERATED AT', new Date().toISOString()],
          ['STATUS', 'CONFIDENTIAL & AUDITED'],
          [],
          ['Record_ID', 'Entity_Ref', 'Timestamp_IST', 'Category_Domain', 'Metrics_Val', 'Financial_Reconciliation']
        ];
        for (var i = 1; i <= 25; i++) {
          rows.push([
            id + '-ROW-' + (1000 + i),
            'ZENVE-ENT-' + (5000 + i * 3),
            new Date(Date.now() - i * 3600000).toISOString(),
            name.split(' ')[0],
            '₹' + (i * 12500).toLocaleString('en-IN'),
            'CLEARED_RECONCILED'
          ]);
        }
        downloadCSV(filename, rows);
      });
    });

    var btnDownloadAll = document.getElementById('zrep-download-all-zip');
    if (btnDownloadAll) {
      btnDownloadAll.addEventListener('click', function () {
        showToast('Initiating bulk package compilation of all 10 raw master datasets...');
        setTimeout(function () {
          downloadCSV('zenve-master-enterprise-datasets-all.csv', [
            ['ZENVE BI — ALL ENTERPRISE DATASETS COMPILATION', new Date().toISOString()],
            ['Dataset ID', 'Name', 'Total Records', 'File Payload', 'Refresh Cadence']
          ].concat(D.exportDatasets.map(function (e) {
            return [e.id, e.name, e.records, e.size, e.freq];
          })));
        }, 600);
      });
    }
  }

  /* ── 8. Schedule New Report Modal ────────────────────────────────── */
  function openNewScheduleModal() {
    var old = document.getElementById('zrep-modal-backdrop');
    if (old) old.remove();

    var backdrop = document.createElement('div');
    backdrop.id = 'zrep-modal-backdrop';
    backdrop.className = 'zrep-modal-backdrop';
    backdrop.innerHTML =
      '<div class="zrep-modal">' +
        '<div class="zrep-modal-header">' +
          '<h3 style="margin:0; font-family:var(--font-display,sans-serif); font-size:15px; font-weight:700;">' +
            '<span>⏰</span> Schedule Automated Report Dispatch' +
          '</h3>' +
          '<button type="button" class="zrep-btn-close" id="zrep-modal-close">✕</button>' +
        '</div>' +
        '<div class="zrep-modal-body">' +
          '<div class="zrep-field-group">' +
            '<label class="zrep-field-label">Report Intelligence Module</label>' +
            '<select class="zrep-select" id="zrep-mod-type" style="width:100%;">' +
              '<option value="Sales">Sales &amp; GMV Executive Summary</option>' +
              '<option value="Revenue">Business Units Revenue &amp; Margins</option>' +
              '<option value="Finance">Audited GAAP P&amp;L Reconciliation</option>' +
              '<option value="Inventory">Inventory Expiry &amp; Cold-Chain Alerts</option>' +
              '<option value="Operations">60-Minute Express SLA Telemetry</option>' +
            '</select>' +
          '</div>' +
          '<div class="zrep-field-group">' +
            '<label class="zrep-field-label">Cron Frequency Schedule</label>' +
            '<select class="zrep-select" id="zrep-mod-freq" style="width:100%;">' +
              '<option value="Daily at 08:00 IST">Daily Morning Flash (08:00 IST)</option>' +
              '<option value="Hourly Dispatch">Hourly Live SLA Telemetry</option>' +
              '<option value="Weekly Every Monday">Weekly Operational Review (Mondays)</option>' +
              '<option value="Monthly on 1st">Monthly Financial GAAP Audit (1st of Month)</option>' +
            '</select>' +
          '</div>' +
          '<div class="zrep-field-group">' +
            '<label class="zrep-field-label">Target Recipient Email Distribution</label>' +
            '<input type="text" class="zrep-search-input" id="zrep-mod-emails" placeholder="executives@zenve.vet, cfo@zenve.vet" value="executives@zenve.vet" style="padding-left:12px;"/>' +
          '</div>' +
          '<div class="zrep-field-group">' +
            '<label class="zrep-field-label">Output Attachment Format</label>' +
            '<select class="zrep-select" id="zrep-mod-fmt" style="width:100%;">' +
              '<option value="PDF + CSV">Audited Executive PDF + Raw CSV</option>' +
              '<option value="CSV Data Pack">Raw CSV Data Pack</option>' +
              '<option value="Executive PDF">Board-Ready Executive PDF</option>' +
            '</select>' +
          '</div>' +
        '</div>' +
        '<div class="zrep-modal-footer">' +
          '<button type="button" class="zrep-btn zrep-btn-outline" id="zrep-modal-cancel">Cancel</button>' +
          '<button type="button" class="zrep-btn zrep-btn-primary" id="zrep-modal-save">Create Schedule</button>' +
        '</div>' +
      '</div>';

    document.body.appendChild(backdrop);

    var closeBtn = document.getElementById('zrep-modal-close');
    if (closeBtn) closeBtn.addEventListener('click', function () { backdrop.remove(); });
    var cancelBtn = document.getElementById('zrep-modal-cancel');
    if (cancelBtn) cancelBtn.addEventListener('click', function () { backdrop.remove(); });

    var saveBtn = document.getElementById('zrep-modal-save');
    if (saveBtn) {
      saveBtn.addEventListener('click', function () {
        var modType = document.getElementById('zrep-mod-type').value;
        var freq = document.getElementById('zrep-mod-freq').value;
        var emails = document.getElementById('zrep-mod-emails').value || 'executives@zenve.vet';
        var fmt = document.getElementById('zrep-mod-fmt').value;

        D.schedules.unshift({
          id: 'SCH-0' + (D.schedules.length + 1),
          title: modType + ' Automated Dispatch',
          cron: freq.indexOf('Daily') >= 0 ? '0 08:00 * * *' : '0 09:00 * * 1',
          recipients: emails,
          format: fmt,
          active: true,
          lastRun: 'Pending First Run'
        });

        backdrop.remove();
        showToast('Created automated schedule for ' + modType);
        switchTab('scheduled');
      });
    }
  }

  /* ── 9. View Switcher & Visibility Controls ──────────────────────── */
  function switchTab(tabId) {
    if (!tabId) return;
    S.activeTab = tabId;

    var ribbon = document.getElementById('zrep-nav-ribbon');
    if (ribbon) {
      ribbon.querySelectorAll('.zrep-chip').forEach(function (chip) {
        chip.classList.toggle('active', chip.getAttribute('data-tab') === tabId);
      });
    }

    var workspace = document.getElementById('zrep-workspace');
    if (workspace) {
      workspace.innerHTML = renderActiveView();
      bindTabEvents();
    }

    // Update URL hash without breaking history
    try {
      var currentMod = MODULES.filter(function (m) { return m.id === tabId; })[0];
      if (currentMod && location.hash !== currentMod.hash) {
        history.pushState(null, '', currentMod.hash);
      }
    } catch (e) { }

    syncSidebar(true, tabId);
  }

  function open(tab) {
    ensureRoot();
    S.open = true;
    if (tab) S.activeTab = tab;

    if (window.ZenvePharmacyDashboard && typeof window.ZenvePharmacyDashboard.close === 'function') {
      try { window.ZenvePharmacyDashboard.close(); } catch (e) {}
    }
    if (window.ZenveClinicsDashboard && typeof window.ZenveClinicsDashboard.close === 'function') {
      try { window.ZenveClinicsDashboard.close(); } catch (e) {}
    }
    document.querySelectorAll('.zpanel-root, #zod-root, #zsd-root, #zset-root, #zph-root, #zch-root, #zalt-root').forEach(function (el) {
      if (el !== root) {
        el.classList.remove('zpanel-open', 'zod-open', 'zsd-open', 'zset-open', 'zph-open', 'zch-open', 'zalt-open');
      }
    });

    root.classList.add('zrep-open');
    try {
      document.documentElement.classList.add('zrep-locked');
      document.body.classList.add('zrep-locked');
    } catch (e) { }

    renderShell();

    try {
      var currentMod = MODULES.filter(function (m) { return m.id === S.activeTab; })[0];
      var targetHash = currentMod ? currentMod.hash : '#sales-reports';
      if (location.hash !== targetHash) {
        history.pushState(null, '', targetHash);
      }
    } catch (e) { }

    syncSidebar(true, S.activeTab);
  }

  function close() {
    if (!root || !S.open) return;
    S.open = false;
    root.classList.remove('zrep-open');
    try {
      document.documentElement.classList.remove('zrep-locked');
      document.body.classList.remove('zrep-locked');
    } catch (e) { }
    syncSidebar(false);
    try {
      if (location.hash.indexOf('report') >= 0 || location.hash.indexOf('export') >= 0) {
        history.pushState(null, '', location.pathname + location.search);
      }
    } catch (e) { }
  }

  function syncSidebar(on, tab) {
    document.querySelectorAll('.sidebar-scope li button, .sidebar-scope button, .sidebar-scope a').forEach(function (b) {
      var text = (b.textContent || '').trim();
      var bTab = tabFromText(text);
      if (bTab) {
        b.classList.toggle('zrep-active', on && bTab === tab);
      }
    });
  }

  /* ── 10. Public API ──────────────────────────────────────────────── */
  window.ZenveReportsDashboard = {
    open: open,
    close: close,
    switchTab: switchTab,
    getState: function () { return S; },
    getData: function () { return D; },
    showToast: showToast
  };

  /* ── 11. Global Capture-Phase Click Interceptor ─────────────────── */
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;

    // Never intercept accordion group toggles or search bar
    if (t.closest('[aria-expanded]') || t.closest('button[aria-expanded]') || t.closest('[aria-label="Search menu"]')) return;

    var item = t.closest('button, [data-go], a, [role="button"], li');
    if (item && item.textContent) {
      var text = item.textContent.trim();
      var tab = tabFromText(text);

      if (tab) {
        // Only intercept if outside the dashboard canvas
        if (!t.closest('#zrep-root')) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          open(tab);
          return;
        }
      }
    }
  }, true);

  /* ── 12. Hashchange & Escape Key Listeners ───────────────────────── */
  window.addEventListener('hashchange', function () {
    var tab = tabFromHash(location.hash);
    if (tab) {
      open(tab);
    } else if (S.open && location.hash.indexOf('report') < 0 && location.hash.indexOf('export') < 0) {
      close();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && S.open) {
      var modal = document.getElementById('zrep-modal-backdrop');
      if (modal) modal.remove();
      else close();
    }
  });

  // Check URL on initial script load
  var initialTab = tabFromHash(location.hash);
  if (initialTab) {
    setTimeout(function () { open(initialTab); }, 300);
  }
})();
