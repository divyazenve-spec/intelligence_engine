/* =====================================================================
   Zenve BI — B2B / Enterprise Executive Control Center & Dashboards
   Suite (9 Subdomains):
     1. B2B Dashboard        (#b2b-dashboard / #b2b / #b2b-enterprise)
     2. Enterprise Customers  (#enterprise-customers)
     3. Corporate Accounts    (#corporate-accounts)
     4. B2B Orders            (#b2b-orders)
     5. B2B Sales             (#b2b-sales)
     6. B2B Revenue           (#b2b-revenue)
     7. Contracts             (#contracts / #b2b-contracts)
     8. Enterprise Pricing    (#enterprise-pricing)
     9. B2B Receivables       (#b2b-receivables)
   ===================================================================== */

(function () {
  'use strict';

  function esc(s) {
    if (s == null) return '';
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ── 9 Subdomains Configuration ─────────────────────────────────── */
  var TABS = [
    { id: 'dashboard',    label: 'B2B Dashboard',        icon: '🏢', hash: '#b2b-dashboard',       badge: '₹34.8L MTD',    title: 'B2B Enterprise & Institutional Accounts', sub: 'Corporate kennels, breeder partnerships, institutional hospital contracts, and wholesale volume receivables' },
    { id: 'customers',    label: 'Enterprise Customers', icon: '👥', hash: '#enterprise-customers', badge: '48 Accounts',   title: 'Enterprise Key Decision Makers & Stakeholders', sub: 'Corporate buyer hierarchy, authorized procurement officers, and institutional account owners' },
    { id: 'accounts',     label: 'Corporate Accounts',   icon: '🏛️', hash: '#corporate-accounts',   badge: '₹1.12 Cr Limit', title: 'Corporate Account Master & Credit Sanctions', sub: 'Corporate KYC compliance, GSTIN master, revolving credit sanctions, and relationship manager assignments' },
    { id: 'orders',       label: 'B2B Orders',           icon: '📦', hash: '#b2b-orders',           badge: '148 Orders',    title: 'B2B Purchase Orders & Bulk Fulfillment', sub: 'Institutional purchase orders, batch fulfillment allocations, warehouse dispatch manifests, and invoice linking' },
    { id: 'sales',        label: 'B2B Sales',            icon: '💼', hash: '#b2b-sales',            badge: '106% Quota',    title: 'Enterprise Sales Pipeline & Performance', sub: 'Deal stage velocity, relationship manager quotas, RFP win-loss ratios, and qualified corporate pipeline' },
    { id: 'revenue',      label: 'B2B Revenue',          icon: '💰', hash: '#b2b-revenue',          badge: '+34.2% YoY',    title: 'B2B Revenue Trajectory & Unit Economics', sub: 'Institutional revenue breakdowns, channel contribution margins, contract run rates, and fiscal projections' },
    { id: 'contracts',    label: 'Contracts',            icon: '📜', hash: '#contracts',            badge: '38 Active MSAs', title: 'Master Services Agreements (MSA) & Deeds', sub: 'Corporate legal master deeds, SLA penalty terms, renewal milestones, and compliance tracking' },
    { id: 'pricing',      label: 'Enterprise Pricing',   icon: '🏷️', hash: '#enterprise-pricing',   badge: 'Tier 1-4 Rates', title: 'Enterprise Tiered Pricing & Rate Cards', sub: 'Volume discount tiers, institutional master rate cards, MOQs, and corporate price lock guarantees' },
    { id: 'receivables',  label: 'B2B Receivables',      icon: '💳', hash: '#b2b-receivables',      badge: '₹12.4L Dues',   title: 'B2B Accounts Receivable & Aging Ledger', sub: 'Corporate invoice aging buckets, DSO tracking, collections follow-up, and institutional credit risk' }
  ];

  /* ── Master Datasets ─────────────────────────────────────────────── */
  var ACCOUNTS = [
    { id: 'CORP-8801', name: 'K-9 National Police & Paramilitary Kennels', category: 'Security & Govt', contractVal: '₹18,50,000', mtdOrders: '₹2,40,000', terms: 'Net 60', creditLimit: '₹25,00,000', status: 'Active (Tier 1)', rm: 'Vikram Mehta' },
    { id: 'CORP-8802', name: 'Bangalore Canine Breeding & Genetics Club', category: 'Breeder Co-op', contractVal: '₹12,80,000', mtdOrders: '₹1,95,000', terms: 'Net 45', creditLimit: '₹15,00,000', status: 'Active (Tier 1)', rm: 'Aarav Sen' },
    { id: 'CORP-8803', name: 'Urban Mutts Luxury Daycare & Hospitality', category: 'Hospitality', contractVal: '₹8,40,000', mtdOrders: '₹1,12,000', terms: 'Net 30', creditLimit: '₹10,00,000', status: 'Active (Tier 2)', rm: 'Sneha Rao' },
    { id: 'CORP-8804', name: 'PetCare Hospital Network (12 Centers)', category: 'Hospital Chain', contractVal: '₹24,00,000', mtdOrders: '₹3,85,000', terms: 'Net 30', creditLimit: '₹30,00,000', status: 'Active (Key Client)', rm: 'Vikram Mehta' },
    { id: 'CORP-8805', name: 'Infosys Employee Pets Corporate Wellness', category: 'Corporate Benefits', contractVal: '₹9,60,000', mtdOrders: '₹1,40,000', terms: 'Net 30', creditLimit: '₹12,00,000', status: 'Active (Tier 2)', rm: 'Sneha Rao' },
    { id: 'CORP-8806', name: 'Wipro Campus Canine Security Force', category: 'Security & Govt', contractVal: '₹6,50,000', mtdOrders: '₹82,000', terms: 'Net 45', creditLimit: '₹8,00,000', status: 'Renewal Due', rm: 'Vikram Mehta' }
  ];

  var ORDERS = [
    { po: 'PO-B2B-4401', client: 'PetCare Hospital Network', items: 'Nobivac Vaccines (200v) + Bravecto (80p)', val: '₹3,45,000', orderDate: '2026-10-04', dispatchDate: '2026-10-05', status: 'Dispatched', terms: 'Net 30' },
    { po: 'PO-B2B-4402', client: 'K-9 Paramilitary Kennels', items: 'Tactical Working Dog Nutrition (1.2 Tons)', val: '₹2,80,000', orderDate: '2026-10-03', dispatchDate: '2026-10-04', status: 'Delivered', terms: 'Net 60' },
    { po: 'PO-B2B-4403', client: 'Bangalore Canine Breeding Co-op', items: 'Puppy Starter Formula + Calcium Kits (150u)', val: '₹1,95,000', orderDate: '2026-10-04', dispatchDate: '2026-10-06', status: 'Processing', terms: 'Net 45' },
    { po: 'PO-B2B-4404', client: 'Urban Mutts Luxury Daycare', items: 'Hypoallergenic Grooming Shampoos (400L)', val: '₹1,12,000', orderDate: '2026-10-02', dispatchDate: '2026-10-03', status: 'Delivered', terms: 'Net 30' },
    { po: 'PO-B2B-4405', client: 'Airports Authority Canine Unit', items: 'Joint Health Chews + Dewormers (300u)', val: '₹1,65,000', orderDate: '2026-10-01', dispatchDate: '2026-10-02', status: 'Delivered', terms: 'Net 60' }
  ];

  /* ── State ───────────────────────────────────────────────────────── */
  var S = {
    open: false,
    tab: 'dashboard',
    search: '',
    filter: 'ALL'
  };

  var root = null;

  /* ── Route Resolution ────────────────────────────────────────────── */
  function tabFromHash(hash) {
    if (!hash) return null;
    var h = (hash.startsWith('#') ? hash.slice(1) : hash).toLowerCase();
    if (h.indexOf('report') >= 0 || h.indexOf('alert') >= 0 || h.indexOf('vendor') >= 0 || h.indexOf('fashion') >= 0 || h.indexOf('import') >= 0 || h.indexOf('export') >= 0 || h.indexOf('subscription') >= 0) {
      return null;
    }
    if (h === 'b2b-dashboard' || h === 'b2b' || h === 'b2b-enterprise' || h === 'enterprise') return 'dashboard';
    if (h === 'enterprise-customers' || h === 'b2b-customers') return 'customers';
    if (h === 'corporate-accounts' || h === 'b2b-accounts') return 'accounts';
    if (h === 'b2b-orders' || h === 'enterprise-orders') return 'orders';
    if (h === 'b2b-sales' || h === 'enterprise-sales') return 'sales';
    if (h === 'b2b-revenue' || h === 'enterprise-revenue') return 'revenue';
    if (h === 'contracts' || h === 'b2b-contracts' || h === 'enterprise-contracts') return 'contracts';
    if (h === 'enterprise-pricing' || h === 'b2b-pricing') return 'pricing';
    if (h === 'b2b-receivables' || h === 'enterprise-receivables') return 'receivables';
    return null;
  }

  function tabFromText(txt) {
    if (!txt) return null;
    var raw = txt.replace(/\s+/g, ' ').trim().toLowerCase();
    if (raw.indexOf('report') >= 0 || raw.indexOf('alert') >= 0 || raw.indexOf('vendor') >= 0 || raw.indexOf('fashion') >= 0) return null;

    if (raw === 'b2b dashboard' || raw === 'b2b / enterprise') return 'dashboard';
    if (raw === 'enterprise customers') return 'customers';
    if (raw === 'corporate accounts') return 'accounts';
    if (raw === 'b2b orders') return 'orders';
    if (raw === 'b2b sales') return 'sales';
    if (raw === 'b2b revenue') return 'revenue';
    if (raw === 'contracts') return 'contracts';
    if (raw === 'enterprise pricing') return 'pricing';
    if (raw === 'b2b receivables') return 'receivables';
    return null;
  }

  /* ── KPI Helper ──────────────────────────────────────────────────── */
  function kpiHtml(label, val, delta, trend, subtext, icon) {
    return [
      '<div class="zb2b-kpi">',
        '<div class="zb2b-kpi-top">',
          '<span class="zb2b-kpi-label">' + esc(label) + '</span>',
          '<span class="zb2b-kpi-icon">' + esc(icon || '🏢') + '</span>',
        '</div>',
        '<div class="zb2b-kpi-val">' + esc(val) + '</div>',
        '<div class="zb2b-kpi-bottom">',
          '<span class="zb2b-delta ' + (trend === 'up' ? 'up' : trend === 'down' ? 'down' : 'warn') + '">' + (trend === 'up' ? '↑ ' : trend === 'down' ? '↓ ' : '• ') + esc(delta) + '</span>',
          '<span class="zb2b-subtext">' + esc(subtext) + '</span>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Render Subdomains ───────────────────────────────────────────── */
  function renderDashboard() {
    return [
      '<div class="zb2b-kpi-grid">',
        kpiHtml('B2B Gross Revenue (MTD)', '₹34.82 Lakh', '+18.4% MoM', 'up', '14.2% total company revenue', '🏢'),
        kpiHtml('Active Corporate Clients', '48 Accounts', '6 enterprise tiers', 'up', 'Key accounts: 14', '📑'),
        kpiHtml('Avg. Contract Value (ACV)', '₹14.50 Lakh', '+8.2% YoY', 'up', 'Multi-year agreements', '💼'),
        kpiHtml('Outstanding Receivables', '₹12.40 Lakh', '88% under 30 days', 'up', 'Low delinquency risk', '💰'),
        kpiHtml('Wholesale Gross Margin', '38.4%', '+1.8% vs FY25', 'up', 'Volume-tier protected', '📈'),
        kpiHtml('Contract Renewal Rate', '96.2%', 'High enterprise loyalty', 'up', 'Only 1 churn YTD', '🛡️'),
      '</div>',

      '<div class="zb2b-card">',
        '<div class="zb2b-card-head">',
          '<div>',
            '<h3 class="zb2b-card-title">🏢 Major Enterprise & Institutional Accounts</h3>',
            '<p class="zb2b-card-sub">Commercial standing, contracted commitments, and active credit utilization</p>',
          '</div>',
          '<button class="zb2b-btn primary" onclick="ZenveB2BDashboard.showOnboardModal()">+ Onboard Client</button>',
        '</div>',
        '<div class="zb2b-table-wrap">',
          '<table class="zb2b-table">',
            '<thead><tr><th>Account ID</th><th>Organization Name</th><th>Category</th><th>Annual Contract</th><th>MTD Run Rate</th><th>Credit Terms</th><th>Account RM</th><th>Status</th></tr></thead>',
            '<tbody>',
              ACCOUNTS.map(function(a) {
                return '<tr>' +
                  '<td style="font-family:monospace;font-weight:600;">' + esc(a.id) + '</td>' +
                  '<td style="font-weight:600;">' + esc(a.name) + '</td>' +
                  '<td>' + esc(a.category) + '</td>' +
                  '<td style="font-weight:600;">' + esc(a.contractVal) + '</td>' +
                  '<td style="color:#059669;font-weight:600;">' + esc(a.mtdOrders) + '</td>' +
                  '<td>' + esc(a.terms) + ' (' + esc(a.creditLimit) + ')</td>' +
                  '<td>' + esc(a.rm) + '</td>' +
                  '<td><span class="zb2b-pill ' + (a.status.indexOf('Active') >= 0 ? 'active' : 'warning') + '">' + esc(a.status) + '</span></td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderCustomers() {
    return [
      '<div class="zb2b-kpi-grid">',
        kpiHtml('Enterprise Stakeholders', '64 Contacts', '48 Accounts', 'up', 'Authorized procurement leads', '👥'),
        kpiHtml('Tier 1 Enterprise Clients', '18 Accounts', 'Annual > ₹15L', 'up', 'Priority concierge SLA', '⭐'),
        kpiHtml('Corporate Account NPS', '74 NPS', '+6 pts YoY', 'up', 'High satisfaction score', '🎯'),
        kpiHtml('Avg Client Tenure', '3.4 Years', '98% retention', 'up', 'Long-term partnership', '📅'),
      '</div>',
      '<div class="zb2b-card">',
        '<div class="zb2b-card-head">',
          '<div><h3 class="zb2b-card-title">👥 Enterprise Decision Makers Directory</h3><p class="zb2b-card-sub">Procurement heads, authorized signatories, and annual spend allocation</p></div>',
        '</div>',
        '<div class="zb2b-table-wrap">',
          '<table class="zb2b-table">',
            '<thead><tr><th>Contact ID</th><th>Procurement Head</th><th>Organization</th><th>Classification</th><th>Annual Spend</th><th>Status</th></tr></thead>',
            '<tbody>',
              '<tr><td style="font-family:monospace;">ENT-CUST-101</td><td style="font-weight:600;">Dr. Rameshwar Rao</td><td>PetCare Hospital Network (12 Centers)</td><td><span class="zb2b-pill corporate">Tier 1 Enterprise</span></td><td style="font-weight:600;color:#059669;">₹28,50,000</td><td><span class="zb2b-pill active">Active</span></td></tr>',
              '<tr><td style="font-family:monospace;">ENT-CUST-102</td><td style="font-weight:600;">Col. Arvind Rathore (Retd)</td><td>K-9 National Police & Paramilitary Kennels</td><td><span class="zb2b-pill corporate">Tier 1 Enterprise</span></td><td style="font-weight:600;color:#059669;">₹18,50,000</td><td><span class="zb2b-pill active">Active</span></td></tr>',
              '<tr><td style="font-family:monospace;">ENT-CUST-103</td><td style="font-weight:600;">Malini Chidambaram</td><td>Bangalore Canine Breeding Co-op</td><td><span class="zb2b-pill corporate">Tier 2 Wholesale</span></td><td style="font-weight:600;color:#059669;">₹12,80,000</td><td><span class="zb2b-pill active">Active</span></td></tr>',
              '<tr><td style="font-family:monospace;">ENT-CUST-104</td><td style="font-weight:600;">Deepa Varma (HR Benefits)</td><td>Infosys Employee Pets Program</td><td><span class="zb2b-pill corporate">Corporate Wellness</span></td><td style="font-weight:600;color:#059669;">₹9,60,000</td><td><span class="zb2b-pill active">Active</span></td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderAccounts() {
    return [
      '<div class="zb2b-kpi-grid">',
        kpiHtml('Total Sanctioned Credit', '₹1.12 Crore', '48 Corporate Accounts', 'up', 'Revolving commercial credit', '🏛️'),
        kpiHtml('Credit Utilization', '43.2%', '₹48.3L drawn', 'up', 'Healthy buffer headroom', '📊'),
        kpiHtml('Avg Payment Terms', '38.5 Days', 'Target < 45 days', 'up', 'Commercial credit governance', '⏱️'),
        kpiHtml('GST & E-Invoicing', '100% Compliant', 'All 48 GSTINs verified', 'up', 'Direct IRN generation', '✅'),
      '</div>',
      '<div class="zb2b-card">',
        '<div class="zb2b-card-head">',
          '<div><h3 class="zb2b-card-title">🏛️ Corporate Credit Sanctions & Risk Ledger</h3><p class="zb2b-card-sub">Assigned credit limits, drawn balances, GSTINs, and risk grades</p></div>',
        '</div>',
        '<div class="zb2b-table-wrap">',
          '<table class="zb2b-table">',
            '<thead><tr><th>Code</th><th>Corporate Entity</th><th>GSTIN</th><th>Sanctioned Limit</th><th>Used Credit</th><th>Terms</th><th>Risk Grade</th></tr></thead>',
            '<tbody>',
              ACCOUNTS.map(function(a) {
                return '<tr>' +
                  '<td style="font-family:monospace;font-weight:600;">' + esc(a.id) + '</td>' +
                  '<td style="font-weight:600;">' + esc(a.name) + '</td>' +
                  '<td style="font-family:monospace;">29AAACP8912K1Z8</td>' +
                  '<td style="font-weight:600;">' + esc(a.creditLimit) + '</td>' +
                  '<td style="color:#4338ca;font-weight:600;">' + esc(a.mtdOrders) + '</td>' +
                  '<td>' + esc(a.terms) + '</td>' +
                  '<td><span class="zb2b-pill active">Low Risk</span></td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderOrders() {
    return [
      '<div class="zb2b-kpi-grid">',
        kpiHtml('B2B Orders (MTD)', '148 Orders', '+22% vs last month', 'up', 'Average PO: ₹2.35L', '📦'),
        kpiHtml('Order Value Realized', '₹34.82 Lakh', '100% contracted rates', 'up', 'Institutional rate cards', '💵'),
        kpiHtml('On-Time Dispatch SLA', '98.6%', '48h fulfillment benchmark', 'up', 'Dedicated freight vans', '⚡'),
        kpiHtml('Open Warehouse POs', '5 Orders', 'Packaging in progress', 'warn', 'Dispatch scheduled today', '⏳'),
      '</div>',
      '<div class="zb2b-card">',
        '<div class="zb2b-card-head">',
          '<div><h3 class="zb2b-card-title">📦 Live Institutional Purchase Orders</h3><p class="zb2b-card-sub">Active corporate purchase orders, item allocation, and logistics status</p></div>',
          '<button class="zb2b-btn primary" onclick="ZenveB2BDashboard.showPOModal()">+ Create B2B Order</button>',
        '</div>',
        '<div class="zb2b-table-wrap">',
          '<table class="zb2b-table">',
            '<thead><tr><th>PO Number</th><th>Client Entity</th><th>Line Items Description</th><th>PO Value</th><th>Order Date</th><th>Dispatch ETA</th><th>Status</th></tr></thead>',
            '<tbody>',
              ORDERS.map(function(o) {
                return '<tr>' +
                  '<td style="font-family:monospace;font-weight:600;">' + esc(o.po) + '</td>' +
                  '<td style="font-weight:600;">' + esc(o.client) + '</td>' +
                  '<td>' + esc(o.items) + '</td>' +
                  '<td style="font-weight:600;color:#059669;">' + esc(o.val) + '</td>' +
                  '<td>' + esc(o.orderDate) + '</td>' +
                  '<td>' + esc(o.dispatchDate) + '</td>' +
                  '<td><span class="zb2b-pill ' + (o.status === 'Delivered' ? 'active' : o.status === 'Dispatched' ? 'corporate' : 'warning') + '">' + esc(o.status) + '</span></td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderSales() {
    return [
      '<div class="zb2b-kpi-grid">',
        kpiHtml('Quarterly Closed Bookings', '₹1.25 Crore', '+28.4% YoY', 'up', 'Quota: ₹1.18 Cr (106%)', '💼'),
        kpiHtml('Active Qualified Pipeline', '₹2.15 Crore', '14 deals in RFP', 'up', 'Weighted pipeline: ₹1.42 Cr', '📈'),
        kpiHtml('Deal Win Rate', '48.5%', '+6.2% vs industry', 'up', 'Institutional tenders', '🏆'),
        kpiHtml('Avg Enterprise Sales Cycle', '42 Days', '-8 days reduction', 'up', 'Standardized master deeds', '⚡'),
      '</div>',
      '<div class="zb2b-card">',
        '<div class="zb2b-card-head">',
          '<div><h3 class="zb2b-card-title">💼 Enterprise Account Executives Scorecard</h3><p class="zb2b-card-sub">Sales quotas, year-to-date closed bookings, and live pipeline coverage</p></div>',
        '</div>',
        '<div class="zb2b-table-wrap">',
          '<table class="zb2b-table">',
            '<thead><tr><th>Sales Lead</th><th>Assigned Accounts</th><th>Quota Target</th><th>Closed Bookings</th><th>Attainment</th><th>Active Pipeline</th></tr></thead>',
            '<tbody>',
              '<tr><td style="font-weight:600;">Vikram Mehta (VP Enterprise)</td><td>18 Accounts</td><td>₹40,00,000</td><td style="font-weight:600;color:#059669;">₹44,20,000</td><td><span class="zb2b-pill active">110.5%</span></td><td style="color:#4338ca;font-weight:600;">₹62,00,000</td></tr>',
              '<tr><td style="font-weight:600;">Sneha Rao (Senior RM)</td><td>14 Accounts</td><td>₹28,00,000</td><td style="font-weight:600;color:#059669;">₹29,80,000</td><td><span class="zb2b-pill active">106.4%</span></td><td style="color:#4338ca;font-weight:600;">₹45,00,000</td></tr>',
              '<tr><td style="font-weight:600;">Aarav Sen (Wholesale Lead)</td><td>12 Accounts</td><td>₹20,00,000</td><td style="font-weight:600;color:#059669;">₹19,10,000</td><td><span class="zb2b-pill active">95.5%</span></td><td style="color:#4338ca;font-weight:600;">₹28,00,000</td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderRevenue() {
    return [
      '<div class="zb2b-kpi-grid">',
        kpiHtml('Annualized B2B Run Rate', '₹3.75 Crore', '+34.2% YoY', 'up', 'On track for ₹4.0 Cr FY27', '💰'),
        kpiHtml('Blended B2B Gross Margin', '38.4%', '+2.1% YoY', 'up', 'Direct OEM economies', '📈'),
        kpiHtml('Monthly Revenue per Account', '₹72,500 / mo', '+14% YoY', 'up', 'High basket re-orders', '🏢'),
        kpiHtml('Repeat Contract Revenue', '92.4%', 'Committed volume', 'up', 'High financial predictability', '🔄'),
      '</div>',
      '<div class="zb2b-card">',
        '<div class="zb2b-card-head">',
          '<div><h3 class="zb2b-card-title">💰 B2B Revenue Streams & Margin Analysis</h3><p class="zb2b-card-sub">Channel realization, contribution margin, and year-over-year momentum</p></div>',
        '</div>',
        '<div class="zb2b-table-wrap">',
          '<table class="zb2b-table">',
            '<thead><tr><th>Revenue Stream</th><th>B2B Share</th><th>MTD Realized</th><th>Gross Margin</th><th>Trajectory</th></tr></thead>',
            '<tbody>',
              '<tr><td style="font-weight:600;">Hospital & Clinic Consumables Master Contract</td><td>38.5%</td><td style="font-weight:600;color:#059669;">₹13,40,000</td><td style="color:#4338ca;font-weight:600;">36.2%</td><td><span class="zb2b-pill active">Growing (+24%)</span></td></tr>',
              '<tr><td style="font-weight:600;">Government & Working Dog Procurement (K-9)</td><td>24.2%</td><td style="font-weight:600;color:#059669;">₹8,42,000</td><td style="color:#4338ca;font-weight:600;">42.0%</td><td><span class="zb2b-pill active">Stable (+8%)</span></td></tr>',
              '<tr><td style="font-weight:600;">Corporate Employee Pet Benefits Subsidies</td><td>18.1%</td><td style="font-weight:600;color:#059669;">₹6,30,000</td><td style="color:#4338ca;font-weight:600;">45.8%</td><td><span class="zb2b-pill active">Fast (+48%)</span></td></tr>',
              '<tr><td style="font-weight:600;">Breeder & Shelter Wholesale Feeds & Kits</td><td>14.2%</td><td style="font-weight:600;color:#059669;">₹4,95,000</td><td style="color:#4338ca;font-weight:600;">28.5%</td><td><span class="zb2b-pill warning">Seasonal</span></td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderContracts() {
    return [
      '<div class="zb2b-kpi-grid">',
        kpiHtml('Active Commercial MSAs', '38 Contracts', '₹3.14 Cr Total Value', 'up', 'Multi-year binding agreements', '📜'),
        kpiHtml('Contracts Expiring in 90D', '3 Contracts', 'Renewal talks in progress', 'warn', '₹34.5L total value', '⏳'),
        kpiHtml('Legal SLA Compliance', '99.4%', 'Zero penalty notices', 'up', 'Full fulfillment compliance', '🛡️'),
        kpiHtml('Avg Contract Tenure', '2.2 Years', 'Standard 1 to 3 yrs', 'up', 'High client retention', '📅'),
      '</div>',
      '<div class="zb2b-card">',
        '<div class="zb2b-card-head">',
          '<div><h3 class="zb2b-card-title">📜 Master Services Agreements (MSA) Ledger</h3><p class="zb2b-card-sub">Active corporate contracts, tenure validity, and committed volumes</p></div>',
        '</div>',
        '<div class="zb2b-table-wrap">',
          '<table class="zb2b-table">',
            '<thead><tr><th>Contract ID</th><th>Agreement Name</th><th>Client Entity</th><th>Validity Period</th><th>Committed Value</th><th>Status</th></tr></thead>',
            '<tbody>',
              '<tr><td style="font-family:monospace;font-weight:600;">CTR-ENT-2024-01</td><td style="font-weight:600;">National Veterinary Consumables Master Agreement</td><td>PetCare Hospital Network</td><td>2024-04 to 2027-03 (3-Yr)</td><td style="font-weight:600;color:#059669;">₹72,00,000</td><td><span class="zb2b-pill active">Active (Signed)</span></td></tr>',
              '<tr><td style="font-family:monospace;font-weight:600;">CTR-ENT-2024-08</td><td style="font-weight:600;">Paramilitary K-9 Nutrition & Medical Supply Contract</td><td>K-9 Paramilitary Kennels</td><td>2024-08 to 2025-07 (1-Yr)</td><td style="font-weight:600;color:#059669;">₹18,50,000</td><td><span class="zb2b-pill active">Active (Signed)</span></td></tr>',
              '<tr><td style="font-family:monospace;font-weight:600;">CTR-ENT-2025-02</td><td style="font-weight:600;">Bangalore Breeder Network Feed Supply Framework</td><td>Bangalore Canine Co-op</td><td>2025-01 to 2025-12 (1-Yr)</td><td style="font-weight:600;color:#059669;">₹12,80,000</td><td><span class="zb2b-pill active">Active (Signed)</span></td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderPricing() {
    return [
      '<div class="zb2b-kpi-grid">',
        kpiHtml('Avg Volume Discount', '26.4%', 'Protected floor: 22%', 'up', 'Guaranteed positive contribution', '🏷️'),
        kpiHtml('Price-Locked Master SKUs', '480 SKUs', '12-month lock', 'up', 'Inflation protected contracts', '🔒'),
        kpiHtml('Volume Rebates Issued', '₹3.18 Lakh', 'YTD Paid', 'up', 'Threshold achievement bonus', '💵'),
        kpiHtml('Minimum Order Value (MOQ)', '₹75,000', 'Tier 3 entry threshold', 'neutral', 'Wholesale governance', '📦'),
      '</div>',
      '<div class="zb2b-card">',
        '<div class="zb2b-card-head">',
          '<div><h3 class="zb2b-card-title">🏷️ Tiered Volume Pricing & Commercial Matrix</h3><p class="zb2b-card-sub">Discount brackets, minimum order commitments, and payment credit rules</p></div>',
        '</div>',
        '<div class="zb2b-table-wrap">',
          '<table class="zb2b-table">',
            '<thead><tr><th>Tier Classification</th><th>Min Order Value</th><th>Discount Off MRP</th><th>Credit Terms</th><th>Rebate Schedule</th></tr></thead>',
            '<tbody>',
              '<tr><td style="font-weight:600;">Tier 1 — Strategic Institutional</td><td style="font-weight:600;color:#4338ca;">₹5,00,000+</td><td style="font-weight:600;color:#059669;">Base MRP - 32%</td><td>Net 60 Days</td><td>3% Annual Volume Rebate</td></tr>',
              '<tr><td style="font-weight:600;">Tier 2 — Hospital & Clinic Chain</td><td style="font-weight:600;color:#4338ca;">₹2,00,000+</td><td style="font-weight:600;color:#059669;">Base MRP - 26%</td><td>Net 45 Days</td><td>2% Annual Volume Rebate</td></tr>',
              '<tr><td style="font-weight:600;">Tier 3 — Breeder & Kennel Club</td><td style="font-weight:600;color:#4338ca;">₹75,000+</td><td style="font-weight:600;color:#059669;">Base MRP - 20%</td><td>Net 30 Days</td><td>1% Semi-Annual Rebate</td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderReceivables() {
    return [
      '<div class="zb2b-kpi-grid">',
        kpiHtml('Total B2B Receivables', '₹12.40 Lakh', '6 Corporate Accounts', 'up', 'All within sanctioned limits', '💳'),
        kpiHtml('Days Sales Outstanding (DSO)', '34.2 Days', '-4.1 days improvement', 'up', 'Benchmark < 40 days', '⏱️'),
        kpiHtml('Current Dues (0-30 Days)', '₹9.02 Lakh', '72.7% of total', 'up', 'High collection velocity', '✅'),
        kpiHtml('Overdue Dues (> 60 Days)', '₹68,000', '5.5% of total', 'warn', 'Grace period follow-up', '⚠️'),
      '</div>',
      '<div class="zb2b-card">',
        '<div class="zb2b-card-head">',
          '<div><h3 class="zb2b-card-title">💳 Corporate Receivables Aging Ledger</h3><p class="zb2b-card-sub">Invoiced amounts, aging buckets, due dates, and collection status</p></div>',
        '</div>',
        '<div class="zb2b-table-wrap">',
          '<table class="zb2b-table">',
            '<thead><tr><th>Invoice #</th><th>Corporate Client</th><th>Amount</th><th>Due Date</th><th>Aging Bucket</th><th>Status</th></tr></thead>',
            '<tbody>',
              '<tr><td style="font-family:monospace;font-weight:600;">INV-B2B-9101</td><td style="font-weight:600;">PetCare Hospital Network</td><td style="font-weight:600;">₹3,45,000</td><td>2026-10-25</td><td><span class="zb2b-pill active">0-30 Days</span></td><td>Current (Unpaid)</td></tr>',
              '<tr><td style="font-family:monospace;font-weight:600;">INV-B2B-9088</td><td style="font-weight:600;">K-9 Paramilitary Kennels</td><td style="font-weight:600;">₹2,80,000</td><td>2026-11-15</td><td><span class="zb2b-pill active">0-30 Days</span></td><td>Current (Govt Audit)</td></tr>',
              '<tr><td style="font-family:monospace;font-weight:600;">INV-B2B-9042</td><td style="font-weight:600;">Bangalore Canine Breeding Co-op</td><td style="font-weight:600;">₹1,95,000</td><td>2026-09-28</td><td><span class="zb2b-pill warning">31-60 Days</span></td><td>Follow-up Sent</td></tr>',
              '<tr><td style="font-family:monospace;font-weight:600;">INV-B2B-8872</td><td style="font-weight:600;">Western India Shelter Network</td><td style="font-weight:600;">₹68,000</td><td>2026-08-15</td><td><span class="zb2b-pill critical">61-90 Days</span></td><td>Grace Period Notice</td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Master Render ───────────────────────────────────────────────── */
  function render() {
    if (!root) return;
    var currentTab = TABS.find(function (t) { return t.id === S.tab; }) || TABS[0];

    var html = [
      '<header class="zb2b-head">',
        '<div class="zb2b-head-left">',
          '<div class="zb2b-title-row">',
            '<h2 class="zb2b-title">' + currentTab.icon + ' ' + esc(currentTab.title) + '</h2>',
            '<span class="zb2b-live-badge"><span class="zb2b-pulse-dot"></span> B2B Enterprise · Active</span>',
          '</div>',
          '<p class="zb2b-sub">' + esc(currentTab.sub) + '</p>',
        '</div>',
        '<div class="zb2b-head-actions">',
          '<button class="zb2b-btn" onclick="ZenveB2BDashboard.showPOModal()">+ New PO</button>',
          '<button class="zb2b-btn primary" onclick="ZenveB2BDashboard.showOnboardModal()">+ Onboard Client</button>',
          '<button class="zb2b-btn" onclick="ZenveB2BDashboard.close()">✕ Close</button>',
        '</div>',
      '</header>',

      '<nav class="zb2b-tabs-bar">',
        TABS.map(function (t) {
          var active = t.id === S.tab ? ' active' : '';
          return '<button class="zb2b-tab' + active + '" onclick="ZenveB2BDashboard.switchTab(\'' + t.id + '\')">' +
            '<span>' + t.icon + '</span>' +
            '<span>' + esc(t.label) + '</span>' +
            '<span class="zb2b-tab-badge">' + esc(t.badge) + '</span>' +
          '</button>';
        }).join(''),
      '</nav>',

      '<main class="zb2b-body">'
    ];

    switch (S.tab) {
      case 'dashboard':   html.push(renderDashboard()); break;
      case 'customers':   html.push(renderCustomers()); break;
      case 'accounts':    html.push(renderAccounts()); break;
      case 'orders':      html.push(renderOrders()); break;
      case 'sales':       html.push(renderSales()); break;
      case 'revenue':     html.push(renderRevenue()); break;
      case 'contracts':   html.push(renderContracts()); break;
      case 'pricing':     html.push(renderPricing()); break;
      case 'receivables': html.push(renderReceivables()); break;
      default:            html.push(renderDashboard());
    }

    html.push('</main>');
    root.innerHTML = html.join('');
  }

  /* ── Modals & Actions ────────────────────────────────────────────── */
  function showModal(contentHtml) {
    closeModal();
    var backdrop = document.createElement('div');
    backdrop.id = 'zb2b-active-modal';
    backdrop.className = 'zb2b-modal-backdrop';
    backdrop.innerHTML = '<div class="zb2b-modal">' + contentHtml + '</div>';
    backdrop.onclick = function (e) {
      if (e.target === backdrop) closeModal();
    };
    document.body.appendChild(backdrop);
  }

  function closeModal() {
    var existing = document.getElementById('zb2b-active-modal');
    if (existing) existing.remove();
  }

  function showPOModal() {
    var formHtml = [
      '<div class="zb2b-modal-head">',
        '<h3 class="zb2b-modal-title">📦 Issue Institutional Purchase Order</h3>',
        '<button class="zb2b-btn" onclick="ZenveB2BDashboard.closeModal()">✕</button>',
      '</div>',
      '<form onsubmit="event.preventDefault(); alert(\'B2B Purchase order generated and linked to ERP!\'); ZenveB2BDashboard.closeModal();">',
        '<div class="zb2b-form-group"><label>Client Corporate Organization</label><select class="zb2b-select">' +
          ACCOUNTS.map(function(a){ return '<option>' + esc(a.name) + '</option>'; }).join('') +
        '</select></div>',
        '<div class="zb2b-form-group"><label>Order Description & Line Items</label><input type="text" class="zb2b-input" placeholder="e.g. 500 vials Nobivac DHPPi + 40 boxes Bravecto" required /></div>',
        '<div class="zb2b-form-row">',
          '<div class="zb2b-form-group"><label>PO Total Value (INR)</label><input type="text" class="zb2b-input" placeholder="₹3,45,000" required /></div>',
          '<div class="zb2b-form-group"><label>Credit Payment Terms</label><select class="zb2b-select"><option>Net 30 Days</option><option>Net 45 Days</option><option>Net 60 Days</option></select></div>',
        '</div>',
        '<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:16px;">',
          '<button type="button" class="zb2b-btn" onclick="ZenveB2BDashboard.closeModal()">Cancel</button>',
          '<button type="submit" class="zb2b-btn primary">Generate & Confirm Order</button>',
        '</div>',
      '</form>'
    ].join('');
    showModal(formHtml);
  }

  function showOnboardModal() {
    var formHtml = [
      '<div class="zb2b-modal-head">',
        '<h3 class="zb2b-modal-title">🏢 Onboard New Enterprise Account</h3>',
        '<button class="zb2b-btn" onclick="ZenveB2BDashboard.closeModal()">✕</button>',
      '</div>',
      '<form onsubmit="event.preventDefault(); alert(\'Enterprise client onboarded. Master Services Agreement generated!\'); ZenveB2BDashboard.closeModal();">',
        '<div class="zb2b-form-group"><label>Organization Legal Entity Name</label><input type="text" class="zb2b-input" placeholder="e.g. Apollo Veterinary Hospitals Pvt Ltd" required /></div>',
        '<div class="zb2b-form-row">',
          '<div class="zb2b-form-group"><label>Corporate GSTIN</label><input type="text" class="zb2b-input" placeholder="29AAACP8912K1Z8" required /></div>',
          '<div class="zb2b-form-group"><label>Enterprise Category</label><select class="zb2b-select"><option>Veterinary Hospital Chain</option><option>Security & Govt Kennels</option><option>Breeder Co-op</option><option>Corporate Benefits</option></select></div>',
        '</div>',
        '<div class="zb2b-form-row">',
          '<div class="zb2b-form-group"><label>Approved Credit Limit (INR)</label><input type="text" class="zb2b-input" placeholder="₹25,00,000" required /></div>',
          '<div class="zb2b-form-group"><label>Assigned Relationship Manager</label><select class="zb2b-select"><option>Vikram Mehta (VP)</option><option>Sneha Rao (Senior RM)</option><option>Aarav Sen</option></select></div>',
        '</div>',
        '<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:16px;">',
          '<button type="button" class="zb2b-btn" onclick="ZenveB2BDashboard.closeModal()">Cancel</button>',
          '<button type="submit" class="zb2b-btn primary">Complete Onboarding</button>',
        '</div>',
      '</form>'
    ].join('');
    showModal(formHtml);
  }

  /* ── Open & Close Mechanics ──────────────────────────────────────── */
  function build() {
    root = document.getElementById('zb2b-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'zb2b-root';
      root.className = 'zpanel-root';
      document.body.appendChild(root);
    }
  }

  function open(tab) {
    // Close other domain overlays
    ['zfa-root', 'zmkt-dashboard-root', 'zvp-root', 'zfsh-root', 'zix-root', 'zsub-root', 'zod-root', 'zsd-root', 'zpid-root', 'zph-root', 'zch-root', 'zrep-root', 'zalt-root', 'zset-root', 'zhr-root', 'zsys-root'].forEach(function(id) {
      var el = document.getElementById(id);
      if (el) {
        el.classList.remove('zfa-open', 'zmkt-open', 'zvp-open', 'zfsh-open', 'zix-open', 'zsub-open', 'zod-open', 'zsd-open', 'zpid-open', 'zph-open', 'zch-open', 'zrep-open', 'zalt-open', 'zset-open', 'zhr-open', 'zsys-open', 'zpanel-open');
        el.style.display = 'none';
      }
    });
    if (document.querySelectorAll) {
      document.querySelectorAll('.zpanel-root').forEach(function(el) {
        if (el.id !== 'zb2b-root') {
          el.style.display = 'none';
          el.classList.remove('zfa-open', 'zmkt-open', 'zvp-open', 'zfsh-open', 'zix-open', 'zsub-open', 'zod-open', 'zsd-open', 'zpid-open', 'zph-open', 'zch-open', 'zrep-open', 'zalt-open', 'zset-open', 'zhr-open', 'zsys-open', 'zpanel-open');
        }
      });
    }

    if (tab && TABS.some(function (t) { return t.id === tab; })) {
      S.tab = tab;
    } else if (!S.tab) {
      S.tab = 'dashboard';
    }

    build();
    S.open = true;
    root.style.display = 'block';
    root.classList.add('zb2b-open', 'zpanel-open');
    try {
      document.documentElement.classList.remove('zfsh-locked', 'zvp-locked', 'zalt-locked', 'zix-locked', 'zsub-locked');
      document.body.classList.remove('zfsh-locked', 'zvp-locked', 'zalt-locked', 'zix-locked', 'zsub-locked');
      document.documentElement.classList.add('zb2b-locked');
      document.body.classList.add('zb2b-locked');
    } catch (e) {}
    render();

    var targetTab = TABS.find(function (t) { return t.id === S.tab; });
    if (targetTab && targetTab.hash && window.location.hash !== targetTab.hash) {
      try { history.replaceState(null, '', targetTab.hash); } catch (e) {}
    }
    root.scrollTop = 0;
  }

  function close() {
    S.open = false;
    if (root) {
      root.classList.remove('zb2b-open', 'zpanel-open');
      root.style.display = 'none';
    }
    try {
      document.documentElement.classList.remove('zb2b-locked');
      document.body.classList.remove('zb2b-locked');
    } catch (e) {}
    if (window.location.hash && tabFromHash(window.location.hash)) {
      try { history.replaceState(null, '', window.location.pathname + window.location.search); } catch (e) {}
    }
  }

  function switchTab(tabId) {
    if (!tabId || !TABS.some(function (t) { return t.id === tabId; })) return;
    S.tab = tabId;
    render();
    var targetTab = TABS.find(function (t) { return t.id === tabId; });
    if (targetTab && targetTab.hash) {
      try { history.replaceState(null, '', targetTab.hash); } catch (e) {}
    }
    if (root) root.scrollTop = 0;
  }

  /* ── Interceptor for Hash & Sidebar Clicks ───────────────────────── */
  function onHashChange() {
    var t = tabFromHash(window.location.hash);
    if (t) {
      open(t);
    } else if (S.open && window.location.hash && window.location.hash !== '#') {
      var otherDomains = ['sales', 'operations', 'inventory', 'pharmacy', 'clinics', 'doctors', 'reports', 'alerts', 'settings', 'finance', 'marketing', 'vendors', 'procurement', 'fashion', 'import', 'export', 'subscription'];
      var isOther = otherDomains.some(function(d) { return window.location.hash.indexOf(d) >= 0; });
      if (isOther) close();
    }
  }

  function initInterception() {
    document.addEventListener('click', function (e) {
      var accordionBtn = e.target.closest('button[aria-expanded]');
      if (accordionBtn) return;

      var el = e.target.closest('button, a, [data-go], [role="button"], li');
      if (!el) return;

      var href = el.getAttribute('href');
      var t = tabFromHash(href);
      if (t) {
        e.preventDefault();
        open(t);
        return;
      }

      var isSidebar = !!el.closest('aside, [class*="sidebar"]') && !el.closest('#zb2b-root');
      if (isSidebar) {
        var txt = el.textContent || '';
        var t2 = tabFromText(txt);
        if (t2) {
          e.preventDefault();
          e.stopPropagation();
          open(t2);
        }
      }
    }, true);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && S.open) close();
    });

    window.addEventListener('hashchange', onHashChange);

    if (window.location.hash) {
      var initial = tabFromHash(window.location.hash);
      if (initial) {
        setTimeout(function () { open(initial); }, 150);
      }
    }
  }

  /* ── Public API ──────────────────────────────────────────────────── */
  window.ZenveB2BDashboard = {
    open: open,
    close: close,
    switchTab: switchTab,
    closeModal: closeModal,
    showPOModal: showPOModal,
    showOnboardModal: showOnboardModal
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initInterception);
  } else {
    initInterception();
  }
})();
