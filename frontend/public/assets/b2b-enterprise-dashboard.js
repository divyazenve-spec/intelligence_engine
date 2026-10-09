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
    { id: 'dashboard',    label: 'B2B Dashboard',        icon: '🏢', hash: '#b2b-dashboard',       badge: '',    title: 'B2B Enterprise & Institutional Accounts', sub: 'Corporate kennels, breeder partnerships, institutional hospital contracts, and wholesale volume receivables' },
    { id: 'customers',    label: 'Enterprise Customers', icon: '👥', hash: '#enterprise-customers', badge: '',   title: 'Enterprise Key Decision Makers & Stakeholders', sub: 'Corporate buyer hierarchy, authorized procurement officers, and institutional account owners' },
    { id: 'accounts',     label: 'Corporate Accounts',   icon: '🏛️', hash: '#corporate-accounts',   badge: '', title: 'Corporate Account Master & Credit Sanctions', sub: 'Corporate KYC compliance, GSTIN master, revolving credit sanctions, and relationship manager assignments' },
    { id: 'orders',       label: 'B2B Orders',           icon: '📦', hash: '#b2b-orders',           badge: '',    title: 'B2B Purchase Orders & Bulk Fulfillment', sub: 'Institutional purchase orders, batch fulfillment allocations, warehouse dispatch manifests, and invoice linking' },
    { id: 'sales',        label: 'B2B Sales',            icon: '💼', hash: '#b2b-sales',            badge: '',    title: 'Enterprise Sales Pipeline & Performance', sub: 'Deal stage velocity, relationship manager quotas, RFP win-loss ratios, and qualified corporate pipeline' },
    { id: 'revenue',      label: 'B2B Revenue',          icon: '💰', hash: '#b2b-revenue',          badge: '',    title: 'B2B Revenue Trajectory & Unit Economics', sub: 'Institutional revenue breakdowns, channel contribution margins, contract run rates, and fiscal projections' },
    { id: 'contracts',    label: 'Contracts',            icon: '📜', hash: '#contracts',            badge: '', title: 'Master Services Agreements (MSA) & Deeds', sub: 'Corporate legal master deeds, SLA penalty terms, renewal milestones, and compliance tracking' },
    { id: 'pricing',      label: 'Enterprise Pricing',   icon: '🏷️', hash: '#enterprise-pricing',   badge: '', title: 'Enterprise Tiered Pricing & Rate Cards', sub: 'Volume discount tiers, institutional master rate cards, MOQs, and corporate price lock guarantees' },
    { id: 'receivables',  label: 'B2B Receivables',      icon: '💳', hash: '#b2b-receivables',      badge: '',   title: 'B2B Accounts Receivable & Aging Ledger', sub: 'Corporate invoice aging buckets, DSO tracking, collections follow-up, and institutional credit risk' }
  ];

  /* ── Master Datasets ─────────────────────────────────────────────── */
  var ACCOUNTS = [];

  var ORDERS = [];

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
          '<span class="zb2b-delta ' + (trend === 'up' ? 'up' : trend === 'down' ? 'down' : trend === 'neutral' ? 'neutral' : 'warn') + '">' + (trend === 'up' ? '↑ ' : trend === 'down' ? '↓ ' : '• ') + esc(delta) + '</span>',
          '<span class="zb2b-subtext">' + esc(subtext) + '</span>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Render Subdomains ───────────────────────────────────────────── */
  function renderDashboard() {
    return [
      '<div class="zb2b-kpi-grid">',
        kpiHtml('B2B Gross Revenue (MTD)', '₹0', '0.0%', 'neutral', 'No active records', '🏢'),
        kpiHtml('Active Corporate Clients', '0 Accounts', '0.0%', 'neutral', 'No active records', '📑'),
        kpiHtml('Avg. Contract Value (ACV)', '₹0', '0.0%', 'neutral', 'No active records', '💼'),
        kpiHtml('Outstanding Receivables', '₹0', '0.0%', 'neutral', 'No active records', '💰'),
        kpiHtml('Wholesale Gross Margin', '0.0%', '0.0%', 'neutral', 'No active records', '📈'),
        kpiHtml('Contract Renewal Rate', '0.0%', '0.0%', 'neutral', 'No active records', '🛡️'),
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
              (ACCOUNTS.length ? ACCOUNTS.map(function(a) {
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
              }).join('') : '<tr><td colspan="8" style="text-align:center;padding:24px;color:#94a3b8;">No enterprise account records found</td></tr>'),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderCustomers() {
    return [
      '<div class="zb2b-kpi-grid">',
        kpiHtml('Enterprise Stakeholders', '0 Contacts', '0 Accounts', 'neutral', 'No active records', '👥'),
        kpiHtml('Tier 1 Enterprise Clients', '0 Accounts', '0.0%', 'neutral', 'No active records', '⭐'),
        kpiHtml('Corporate Account NPS', '0 NPS', '0.0%', 'neutral', 'No active records', '🎯'),
        kpiHtml('Avg Client Tenure', '0.0 Years', '0.0%', 'neutral', 'No active records', '📅'),
      '</div>',
      '<div class="zb2b-card">',
        '<div class="zb2b-card-head">',
          '<div><h3 class="zb2b-card-title">👥 Enterprise Decision Makers Directory</h3><p class="zb2b-card-sub">Procurement heads, authorized signatories, and annual spend allocation</p></div>',
        '</div>',
        '<div class="zb2b-table-wrap">',
          '<table class="zb2b-table">',
            '<thead><tr><th>Contact ID</th><th>Procurement Head</th><th>Organization</th><th>Classification</th><th>Annual Spend</th><th>Status</th></tr></thead>',
            '<tbody>',
              '<tr><td colspan="6" style="text-align:center;padding:24px;color:#94a3b8;">No enterprise decision maker records found</td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderAccounts() {
    return [
      '<div class="zb2b-kpi-grid">',
        kpiHtml('Total Sanctioned Credit', '₹0', '0 Accounts', 'neutral', 'No active records', '🏛️'),
        kpiHtml('Credit Utilization', '0.0%', '₹0 drawn', 'neutral', 'No active records', '📊'),
        kpiHtml('Avg Payment Terms', '0.0 Days', '0.0%', 'neutral', 'No active records', '⏱️'),
        kpiHtml('GST & E-Invoicing', '0.0%', '0.0%', 'neutral', 'No active records', '✅'),
      '</div>',
      '<div class="zb2b-card">',
        '<div class="zb2b-card-head">',
          '<div><h3 class="zb2b-card-title">🏛️ Corporate Credit Sanctions & Risk Ledger</h3><p class="zb2b-card-sub">Assigned credit limits, drawn balances, GSTINs, and risk grades</p></div>',
        '</div>',
        '<div class="zb2b-table-wrap">',
          '<table class="zb2b-table">',
            '<thead><tr><th>Code</th><th>Corporate Entity</th><th>GSTIN</th><th>Sanctioned Limit</th><th>Used Credit</th><th>Terms</th><th>Risk Grade</th></tr></thead>',
            '<tbody>',
              (ACCOUNTS.length ? ACCOUNTS.map(function(a) {
                return '<tr>' +
                  '<td style="font-family:monospace;font-weight:600;">' + esc(a.id) + '</td>' +
                  '<td style="font-weight:600;">' + esc(a.name) + '</td>' +
                  '<td style="font-family:monospace;">29AAACP8912K1Z8</td>' +
                  '<td style="font-weight:600;">' + esc(a.creditLimit) + '</td>' +
                  '<td style="color:#4338ca;font-weight:600;">' + esc(a.mtdOrders) + '</td>' +
                  '<td>' + esc(a.terms) + '</td>' +
                  '<td><span class="zb2b-pill active">Low Risk</span></td>' +
                '</tr>';
              }).join('') : '<tr><td colspan="7" style="text-align:center;padding:24px;color:#94a3b8;">No corporate account credit records found</td></tr>'),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderOrders() {
    return [
      '<div class="zb2b-kpi-grid">',
        kpiHtml('B2B Orders (MTD)', '0 Orders', '0.0%', 'neutral', 'No active records', '📦'),
        kpiHtml('Order Value Realized', '₹0', '0.0%', 'neutral', 'No active records', '💵'),
        kpiHtml('On-Time Dispatch SLA', '0.0%', '0.0%', 'neutral', 'No active records', '⚡'),
        kpiHtml('Open Warehouse POs', '0 Orders', '0.0%', 'neutral', 'No active records', '⏳'),
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
              (ORDERS.length ? ORDERS.map(function(o) {
                return '<tr>' +
                  '<td style="font-family:monospace;font-weight:600;">' + esc(o.po) + '</td>' +
                  '<td style="font-weight:600;">' + esc(o.client) + '</td>' +
                  '<td>' + esc(o.items) + '</td>' +
                  '<td style="font-weight:600;color:#059669;">' + esc(o.val) + '</td>' +
                  '<td>' + esc(o.orderDate) + '</td>' +
                  '<td>' + esc(o.dispatchDate) + '</td>' +
                  '<td><span class="zb2b-pill ' + (o.status === 'Delivered' ? 'active' : o.status === 'Dispatched' ? 'corporate' : 'warning') + '">' + esc(o.status) + '</span></td>' +
                '</tr>';
              }).join('') : '<tr><td colspan="7" style="text-align:center;padding:24px;color:#94a3b8;">No institutional purchase order records found</td></tr>'),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderSales() {
    return [
      '<div class="zb2b-kpi-grid">',
        kpiHtml('Quarterly Closed Bookings', '₹0', '0.0%', 'neutral', 'No active records', '💼'),
        kpiHtml('Active Qualified Pipeline', '₹0', '0.0%', 'neutral', 'No active records', '📈'),
        kpiHtml('Deal Win Rate', '0.0%', '0.0%', 'neutral', 'No active records', '🏆'),
        kpiHtml('Avg Enterprise Sales Cycle', '0 Days', '0.0%', 'neutral', 'No active records', '⚡'),
      '</div>',
      '<div class="zb2b-card">',
        '<div class="zb2b-card-head">',
          '<div><h3 class="zb2b-card-title">💼 Enterprise Account Executives Scorecard</h3><p class="zb2b-card-sub">Sales quotas, year-to-date closed bookings, and live pipeline coverage</p></div>',
        '</div>',
        '<div class="zb2b-table-wrap">',
          '<table class="zb2b-table">',
            '<thead><tr><th>Sales Lead</th><th>Assigned Accounts</th><th>Quota Target</th><th>Closed Bookings</th><th>Attainment</th><th>Active Pipeline</th></tr></thead>',
            '<tbody>',
              '<tr><td colspan="6" style="text-align:center;padding:24px;color:#94a3b8;">No sales executive scorecard records found</td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderRevenue() {
    return [
      '<div class="zb2b-kpi-grid">',
        kpiHtml('Annualized B2B Run Rate', '₹0', '0.0%', 'neutral', 'No active records', '💰'),
        kpiHtml('Blended B2B Gross Margin', '0.0%', '0.0%', 'neutral', 'No active records', '📈'),
        kpiHtml('Monthly Revenue per Account', '₹0', '0.0%', 'neutral', 'No active records', '🏢'),
        kpiHtml('Repeat Contract Revenue', '0.0%', '0.0%', 'neutral', 'No active records', '🔄'),
      '</div>',
      '<div class="zb2b-card">',
        '<div class="zb2b-card-head">',
          '<div><h3 class="zb2b-card-title">💰 B2B Revenue Streams & Margin Analysis</h3><p class="zb2b-card-sub">Channel realization, contribution margin, and year-over-year momentum</p></div>',
        '</div>',
        '<div class="zb2b-table-wrap">',
          '<table class="zb2b-table">',
            '<thead><tr><th>Revenue Stream</th><th>B2B Share</th><th>MTD Realized</th><th>Gross Margin</th><th>Trajectory</th></tr></thead>',
            '<tbody>',
              '<tr><td colspan="5" style="text-align:center;padding:24px;color:#94a3b8;">No B2B revenue stream records found</td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderContracts() {
    return [
      '<div class="zb2b-kpi-grid">',
        kpiHtml('Active Commercial MSAs', '0 Contracts', '₹0 Total Value', 'neutral', 'No active records', '📜'),
        kpiHtml('Contracts Expiring in 90D', '0 Contracts', '0.0%', 'neutral', 'No active records', '⏳'),
        kpiHtml('Legal SLA Compliance', '0.0%', '0.0%', 'neutral', 'No active records', '🛡️'),
        kpiHtml('Avg Contract Tenure', '0.0 Years', '0.0%', 'neutral', 'No active records', '📅'),
      '</div>',
      '<div class="zb2b-card">',
        '<div class="zb2b-card-head">',
          '<div><h3 class="zb2b-card-title">📜 Master Services Agreements (MSA) Ledger</h3><p class="zb2b-card-sub">Active corporate contracts, tenure validity, and committed volumes</p></div>',
        '</div>',
        '<div class="zb2b-table-wrap">',
          '<table class="zb2b-table">',
            '<thead><tr><th>Contract ID</th><th>Agreement Name</th><th>Client Entity</th><th>Validity Period</th><th>Committed Value</th><th>Status</th></tr></thead>',
            '<tbody>',
              '<tr><td colspan="6" style="text-align:center;padding:24px;color:#94a3b8;">No active contract records found</td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderPricing() {
    return [
      '<div class="zb2b-kpi-grid">',
        kpiHtml('Avg Volume Discount', '0.0%', '0.0%', 'neutral', 'No active records', '🏷️'),
        kpiHtml('Price-Locked Master SKUs', '0 SKUs', '0.0%', 'neutral', 'No active records', '🔒'),
        kpiHtml('Volume Rebates Issued', '₹0', '0.0%', 'neutral', 'No active records', '💵'),
        kpiHtml('Minimum Order Value (MOQ)', '₹0', '0.0%', 'neutral', 'No active records', '📦'),
      '</div>',
      '<div class="zb2b-card">',
        '<div class="zb2b-card-head">',
          '<div><h3 class="zb2b-card-title">🏷️ Tiered Volume Pricing & Commercial Matrix</h3><p class="zb2b-card-sub">Discount brackets, minimum order commitments, and payment credit rules</p></div>',
        '</div>',
        '<div class="zb2b-table-wrap">',
          '<table class="zb2b-table">',
            '<thead><tr><th>Tier Classification</th><th>Min Order Value</th><th>Discount Off MRP</th><th>Credit Terms</th><th>Rebate Schedule</th></tr></thead>',
            '<tbody>',
              '<tr><td colspan="5" style="text-align:center;padding:24px;color:#94a3b8;">No volume pricing tiers found</td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderReceivables() {
    return [
      '<div class="zb2b-kpi-grid">',
        kpiHtml('Total B2B Receivables', '₹0', '0 Accounts', 'neutral', 'No active records', '💳'),
        kpiHtml('Days Sales Outstanding (DSO)', '0.0 Days', '0.0%', 'neutral', 'No active records', '⏱️'),
        kpiHtml('Current Dues (0-30 Days)', '₹0', '0.0%', 'neutral', 'No active records', '✅'),
        kpiHtml('Overdue Dues (> 60 Days)', '₹0', '0.0%', 'neutral', 'No active records', '⚠️'),
      '</div>',
      '<div class="zb2b-card">',
        '<div class="zb2b-card-head">',
          '<div><h3 class="zb2b-card-title">💳 Corporate Receivables Aging Ledger</h3><p class="zb2b-card-sub">Invoiced amounts, aging buckets, due dates, and collection status</p></div>',
        '</div>',
        '<div class="zb2b-table-wrap">',
          '<table class="zb2b-table">',
            '<thead><tr><th>Invoice #</th><th>Corporate Client</th><th>Amount</th><th>Due Date</th><th>Aging Bucket</th><th>Status</th></tr></thead>',
            '<tbody>',
              '<tr><td colspan="6" style="text-align:center;padding:24px;color:#94a3b8;">No corporate receivables records found</td></tr>',
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
          (ACCOUNTS.length ? ACCOUNTS.map(function(a){ return '<option>' + esc(a.name) + '</option>'; }).join('') : '<option value="">No registered accounts</option>') +
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
