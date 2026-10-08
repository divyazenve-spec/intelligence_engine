/* =====================================================================
   Zenve BI — Customers 360° Intelligence Executive Control Center
   Suite (11 Subdomains):
     1. Customer Dashboard        (#customer-dashboard / #customers)
     2. All Customers             (#all-customers)
     3. New Customers             (#new-customers)
     4. Active Customers          (#active-customers)
     5. Repeat Customers          (#repeat-customers)
     6. Customer Lifetime Value   (#customer-lifetime-value / #clv)
     7. Customer Segmentation     (#customer-segmentation)
     8. Customer Orders           (#customer-orders)
     9. Customer Revenue          (#customer-revenue)
     10. Customer Retention       (#customer-retention)
     11. Customer Complaints      (#customer-complaints)
   ===================================================================== */

(function () {
  'use strict';

  function esc(s) {
    if (s == null) return '';
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ── 11 Subdomains Configuration ─────────────────────────────────── */
  var TABS = [
    { id: 'dashboard',      label: 'Customer Dashboard',     icon: '👥', hash: '#customer-dashboard',       badge: '',    title: 'Unified Customer 360° Command Center', sub: 'Holistic pet parent profiles, omnichannel engagement, and loyalty status' },
    { id: 'all-customers',  label: 'All Customers',          icon: '📋', hash: '#all-customers',           badge: '', title: 'All Registered Customers & Pet Parents', sub: 'Verified contact directory, multi-pet ownership mapping, and geographic distribution' },
    { id: 'new-customers',  label: 'New Customers',          icon: '✨', hash: '#new-customers',           badge: '',    title: 'New Customer Acquisition & First-Order Velocity', sub: 'Channel attribution, welcome bundle activations, and blended CAC dynamics' },
    { id: 'active-customers', label: 'Active Customers',     icon: '⚡', hash: '#active-customers',        badge: '',     title: 'Active Customers & Omni-Channel Frequency', sub: 'Rolling DAU / WAU / MAU stickiness, repeat clinic visits, and mobile app usage' },
    { id: 'repeat-customers', label: 'Repeat Customers',     icon: '🔄', hash: '#repeat-customers',        badge: '',    title: 'Repeat Customers & Order Frequency Progression', sub: 'Replenishment interval tracking, reorder retention, and multi-visit habit loops' },
    { id: 'lifetime-value', label: 'Customer Lifetime Value', icon: '💎', hash: '#customer-lifetime-value', badge: '',  title: 'Customer Lifetime Value (LTV) & CAC Multiples', sub: 'Predictive CLV tiers, cumulative cohort GMV, and customer margin realization' },
    { id: 'segmentation',   label: 'Customer Segmentation',  icon: '🧩', hash: '#customer-segmentation',   badge: '',    title: 'Customer Segmentation & Behavioral Clusters', sub: 'RFM analysis, pet life-stage clustering, and personalized CRM campaigns' },
    { id: 'orders',         label: 'Customer Orders',        icon: '🛒', hash: '#customer-orders',         badge: '',  title: 'Customer Orders & Transaction History', sub: 'Omnichannel commerce purchases, clinic treatment billing, and 60-min deliveries' },
    { id: 'revenue',        label: 'Customer Revenue',       icon: '💰', hash: '#customer-revenue',        badge: '',  title: 'Customer Revenue & Monetization Streams', sub: 'Gross merchandise value, monthly ARPU realization, and category gross margins' },
    { id: 'retention',      label: 'Customer Retention',     icon: '🛡️', hash: '#customer-retention',      badge: '',  title: 'Customer Retention & Cohort Decay Curves', sub: 'Longitudinal cohort retention curves, churn rate tracking, and win-back success' },
    { id: 'complaints',     label: 'Customer Complaints',    icon: '⚠️', hash: '#customer-complaints',     badge: '',     title: 'Customer Complaints & Grievance Resolution', sub: 'Support ticket resolution speed, First-Contact Resolution, and post-service CSAT' }
  ];

  /* ── Master Datasets ─────────────────────────────────────────────── */
  var CUSTOMERS = [];

  var GRIEVANCES = [];

  /* ── State ───────────────────────────────────────────────────────── */
  var S = {
    open: false,
    tab: 'dashboard',
    search: '',
    filter: 'ALL',
    complaintFilter: 'ALL',
    complaintSearch: ''
  };

  var root = null;

  /* ── Route Resolution ────────────────────────────────────────────── */
  function tabFromHash(hash) {
    if (!hash) return null;
    var h = (hash.startsWith('#') ? hash.slice(1) : hash).toLowerCase();
    if (h.indexOf('report') >= 0 || h.indexOf('alert') >= 0 || h.indexOf('vendor') >= 0 || h.indexOf('fashion') >= 0 || h.indexOf('import') >= 0 || h.indexOf('export') >= 0 || h.indexOf('subscription') >= 0 || h.indexOf('doctor') >= 0 || h.indexOf('prediction') >= 0 || h.indexOf('ai-assistant') >= 0 || h === 'ai') {
      return null;
    }
    if (h === 'customer-dashboard' || h === 'customers' || h === 'customers-360') return 'dashboard';
    if (h === 'all-customers' || h === 'customers-list') return 'all-customers';
    if (h === 'new-customers' || h === 'customer-acquisition') return 'new-customers';
    if (h === 'active-customers') return 'active-customers';
    if (h === 'repeat-customers') return 'repeat-customers';
    if (h === 'customer-lifetime-value' || h === 'clv' || h === 'ltv') return 'lifetime-value';
    if (h === 'customer-segmentation') return 'segmentation';
    if (h === 'customer-orders') return 'orders';
    if (h === 'customer-revenue') return 'revenue';
    if (h === 'customer-retention') return 'retention';
    if (h.indexOf('complain') >= 0 || h.indexOf('grievance') >= 0) return 'complaints';
    return null;
  }

  function tabFromText(txt) {
    if (!txt) return null;
    var raw = txt.replace(/\s+/g, ' ').trim().toLowerCase();
    if (raw.indexOf('report') >= 0 || raw.indexOf('alert') >= 0 || raw.indexOf('vendor') >= 0 || raw.indexOf('doctor') >= 0 || raw.indexOf('prediction') >= 0 || raw.indexOf('ai assistant') >= 0 || /\bai\b/.test(raw)) return null;

    if (raw === 'customer dashboard' || raw === 'customers 360°' || raw === 'customers') return 'dashboard';
    if (raw === 'all customers') return 'all-customers';
    if (raw === 'new customers') return 'new-customers';
    if (raw === 'active customers') return 'active-customers';
    if (raw === 'repeat customers') return 'repeat-customers';
    if (raw === 'customer lifetime value') return 'lifetime-value';
    if (raw === 'customer segmentation') return 'segmentation';
    if (raw === 'customer orders') return 'orders';
    if (raw === 'customer revenue') return 'revenue';
    if (raw === 'customer retention') return 'retention';
    if (raw.indexOf('complain') >= 0 || raw.indexOf('grievance') >= 0) return 'complaints';
    return null;
  }

  /* ── KPI Helper ──────────────────────────────────────────────────── */
  function kpiHtml(label, val, delta, trend, subtext, icon) {
    return [
      '<div class="zc360-kpi">',
        '<div class="zc360-kpi-top">',
          '<span class="zc360-kpi-label">' + esc(label) + '</span>',
          '<span class="zc360-kpi-icon">' + esc(icon || '👥') + '</span>',
        '</div>',
        '<div class="zc360-kpi-val">' + esc(val) + '</div>',
        '<div class="zc360-kpi-bottom">',
          '<span class="zc360-delta ' + (trend === 'up' ? 'up' : trend === 'down' ? 'down' : 'warn') + '">' + (trend === 'up' ? '↑ ' : trend === 'down' ? '↓ ' : '• ') + esc(delta) + '</span>',
          '<span class="zc360-subtext">' + esc(subtext) + '</span>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Render Subdomains ───────────────────────────────────────────── */
  function renderDashboard() {
    return [
      '<div class="zc360-kpi-grid">',
        kpiHtml('Total Customer Base', '0', '0.0%', 'neutral', 'neutral', 'No active records', '👥'),
        kpiHtml('Active 30-Day Transactors', '0', '0.0%', 'neutral', 'neutral', 'No active records', '⚡'),
        kpiHtml('Avg. Lifetime Value (LTV)', '₹0', '0.0%', 'neutral', 'neutral', 'No active records', '💎'),
        kpiHtml('Repeat Purchase Rate', '0.0%', '0.0%', 'neutral', 'neutral', 'No active records', '🔄'),
        kpiHtml('Customer CSAT Score', '0.0%', '0.0%', 'neutral', 'neutral', 'No active records', '⭐'),
        kpiHtml('Net Churn Rate', '0.0%', '0.0%', 'neutral', 'neutral', 'No active records', '📉'),
      '</div>',

      '<div class="zc360-card">',
        '<div class="zc360-card-head">',
          '<div>',
            '<h3 class="zc360-card-title">👥 Unified Pet Parent Relationship Matrix</h3>',
            '<p class="zc360-card-sub">Registered pets, historical transaction volume, loyalty tiers, and churn risk</p>',
          '</div>',
          '<button class="zc360-btn primary" onclick="ZenveCustomersDashboard.showOnboardModal()">+ Add Customer Profile</button>',
        '</div>',
        '<div class="zc360-table-wrap">',
          '<table class="zc360-table">',
            '<thead><tr><th>Customer ID</th><th>Pet Parent Name</th><th>Registered Pets</th><th>Loyalty Tier</th><th>Lifetime Value</th><th>Orders</th><th>MTD Spend</th><th>Last Touch</th><th>Risk</th><th>Status</th></tr></thead>',
            '<tbody>',
              (CUSTOMERS.length ? CUSTOMERS.map(function(c) {
                return '<tr>' +
                  '<td style="font-family:monospace;font-weight:600;">' + esc(c.id) + '</td>' +
                  '<td style="font-weight:600;">' + esc(c.name) + '</td>' +
                  '<td style="color:#475569;">' + esc(c.pets) + '</td>' +
                  '<td><span class="zc360-pill ' + (c.tier.indexOf('VIP') >= 0 ? 'active' : c.tier.indexOf('Gold') ? 'warning' : '') + '">' + esc(c.tier) + '</span></td>' +
                  '<td style="font-weight:700;color:#059669;">' + esc(c.ltv) + '</td>' +
                  '<td style="font-weight:600;">' + c.ordersCount + '</td>' +
                  '<td style="font-weight:600;">' + esc(c.mtdSpend) + '</td>' +
                  '<td style="color:#64748b;">' + esc(c.lastOrder) + '</td>' +
                  '<td><span class="zc360-pill ' + (c.churnRisk === 'Very Low' || c.churnRisk === 'Low' ? 'active' : 'warning') + '">' + esc(c.churnRisk) + '</span></td>' +
                  '<td><span class="zc360-pill ' + (c.status === 'Active' ? 'active' : 'critical') + '">' + esc(c.status) + '</span></td>' +
                '</tr>';
              }).join('') : '<tr><td colspan="10" style="text-align:center;padding:28px;color:#94a3b8;">No customer records found</td></tr>'),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderAllCustomers() {
    return [
      '<div class="zc360-kpi-grid">',
        kpiHtml('Master Customer Profiles', '0', '0.0%', 'neutral', 'neutral', 'No active records', '📋'),
        kpiHtml('Bengaluru Core Base', '0.0%', '0.0%', 'neutral', 'neutral', 'No active records', '📍'),
        kpiHtml('Multi-Pet Households', '0.0%', '0.0%', 'neutral', 'neutral', 'No active records', '🐾'),
        kpiHtml('Verified Email & WhatsApp', '0.0%', '0.0%', 'neutral', 'neutral', 'No active records', '🛡️'),
      '</div>',
      '<div class="zc360-card">',
        '<div class="zc360-card-head"><h3 class="zc360-card-title">📋 Comprehensive Customer Directory</h3></div>',
        '<div class="zc360-table-wrap">',
          '<table class="zc360-table">',
            '<thead><tr><th>Customer ID</th><th>Pet Parent</th><th>Phone</th><th>Email</th><th>Location</th><th>Pets</th><th>Tier</th><th>Total Spend</th><th>Status</th></tr></thead>',
            '<tbody>',
              '<tr><td colspan="9" style="text-align:center;padding:28px;color:#94a3b8;">No customer records found</td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderNewCustomers() {
    return [
      '<div class="zc360-kpi-grid">',
        kpiHtml('New Customers (MTD)', '0', '0.0%', 'neutral', 'neutral', 'No active records', '✨'),
        kpiHtml('Blended CAC', '₹0', '0.0%', 'neutral', 'neutral', 'No active records', '📉'),
        kpiHtml('Day-1 Activation Rate', '0.0%', '0.0%', 'neutral', 'neutral', 'No active records', '⚡'),
        kpiHtml('First Order Avg Basket', '₹0', '0.0%', 'neutral', 'neutral', 'No active records', '🛒'),
      '</div>',
      '<div class="zc360-card">',
        '<div class="zc360-card-head"><h3 class="zc360-card-title">✨ Recent New Customer Conversions</h3></div>',
        '<div class="zc360-table-wrap">',
          '<table class="zc360-table">',
            '<thead><tr><th>ID</th><th>Parent</th><th>Pet Details</th><th>Channel</th><th>Signup Date</th><th>First Order</th><th>CAC</th><th>Status</th></tr></thead>',
            '<tbody>',
              '<tr><td colspan="8" style="text-align:center;padding:28px;color:#94a3b8;">No new customer records found</td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderActiveCustomers() {
    return [
      '<div class="zc360-kpi-grid">',
        kpiHtml('Monthly Active Customers', '0', '0.0%', 'neutral', 'neutral', 'No active records', '⚡'),
        kpiHtml('DAU / MAU Stickiness', '0.0%', '0.0%', 'neutral', 'neutral', 'No active records', '📱'),
        kpiHtml('Avg Order Interval', '0', '0.0%', 'neutral', 'neutral', 'No active records', '⏱️'),
        kpiHtml('Omni-Channel Engaged', '0.0%', '0.0%', 'neutral', 'neutral', 'No active records', '🏬'),
      '</div>',
      '<div class="zc360-card">',
        '<div class="zc360-card-head"><h3 class="zc360-card-title">⚡ Active Cadence & Platform Cohorts</h3></div>',
        '<div class="zc360-table-wrap">',
          '<table class="zc360-table">',
            '<thead><tr><th>Engagement Cohort</th><th>Active Count</th><th>Share of Base</th><th>Behavior Profile</th><th>Dominant Service</th><th>Growth</th></tr></thead>',
            '<tbody>',
              '<tr><td colspan="6" style="text-align:center;padding:28px;color:#94a3b8;">No active customer cohort records found</td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderRepeatCustomers() {
    return [
      '<div class="zc360-kpi-grid">',
        kpiHtml('Overall Repeat Purchase Rate', '0.0%', '0.0%', 'neutral', 'neutral', 'No active records', '🔄'),
        kpiHtml('Repeat Customer Revenue', '₹0', '0.0%', 'neutral', 'neutral', 'No active records', '💰'),
        kpiHtml('Avg Order Count / User', '0', '0.0%', 'neutral', 'neutral', 'No active records', '🛒'),
        kpiHtml('Reorder Retention 90D', '0.0%', '0.0%', 'neutral', 'neutral', 'No active records', '🛡️'),
      '</div>',
      '<div class="zc360-card">',
        '<div class="zc360-card-head"><h3 class="zc360-card-title">🔄 Customer Order Frequency Ladder</h3></div>',
        '<div class="zc360-table-wrap">',
          '<table class="zc360-table">',
            '<thead><tr><th>Order Ladder</th><th>Customer Count</th><th>Base Share</th><th>Next Purchase Likelihood</th><th>Days to Reorder</th><th>CRM Trigger</th></tr></thead>',
            '<tbody>',
              '<tr><td colspan="6" style="text-align:center;padding:28px;color:#94a3b8;">No repeat customer records found</td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderLifetimeValue() {
    return [
      '<div class="zc360-kpi-grid">',
        kpiHtml('Average Blended LTV', '₹0', '0.0%', 'neutral', 'neutral', 'No active records', '💎'),
        kpiHtml('Blended LTV : CAC Multiple', '0', '0.0%', 'neutral', 'neutral', 'No active records', '📈'),
        kpiHtml('Avg Customer Lifespan', '0', '0.0%', 'neutral', 'neutral', 'No active records', '⏳'),
        kpiHtml('Cumulative Cohort GMV', '₹0', '0.0%', 'neutral', 'neutral', 'No active records', '💰'),
      '</div>',
      '<div class="zc360-card">',
        '<div class="zc360-card-head"><h3 class="zc360-card-title">💎 Lifetime Value (LTV) Tier Breakdown</h3></div>',
        '<div class="zc360-table-wrap">',
          '<table class="zc360-table">',
            '<thead><tr><th>Tier Segment</th><th>Customers</th><th>Avg Lifespan</th><th>Annual Spend</th><th>Estimated LTV</th><th>Margin %</th><th>LTV:CAC</th></tr></thead>',
            '<tbody>',
              '<tr><td colspan="7" style="text-align:center;padding:28px;color:#94a3b8;">No LTV tier records found</td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderSegmentation() {
    return [
      '<div class="zc360-kpi-grid">',
        kpiHtml('Persona Clusters', '0', '0.0%', 'neutral', 'neutral', 'No active records', '🧩'),
        kpiHtml('Multi-Pet Cluster Share', '0.0%', '0.0%', 'neutral', 'neutral', 'No active records', '🐾'),
        kpiHtml('Senior & Chronic Care', '0.0%', '0.0%', 'neutral', 'neutral', 'No active records', '🩺'),
        kpiHtml('Segment Campaign ROAS', '0', '0.0%', 'neutral', 'neutral', 'No active records', '🎯'),
      '</div>',
      '<div class="zc360-card">',
        '<div class="zc360-card-head"><h3 class="zc360-card-title">🧩 Behavioral Cohort Matrix</h3></div>',
        '<div class="zc360-table-wrap">',
          '<table class="zc360-table">',
            '<thead><tr><th>Segment Persona</th><th>Count</th><th>Share</th><th>Behavior</th><th>AOV</th><th>Annual ARPU</th><th>Active Campaign</th></tr></thead>',
            '<tbody>',
              '<tr><td colspan="7" style="text-align:center;padding:28px;color:#94a3b8;">No persona segment records found</td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderOrders() {
    return [
      '<div class="zc360-kpi-grid">',
        kpiHtml('Total Customer Orders', '0', '0.0%', 'neutral', 'neutral', 'No active records', '🛒'),
        kpiHtml('Average Order Value', '₹0', '0.0%', 'neutral', 'neutral', 'No active records', '💰'),
        kpiHtml('60-Min Fast Delivery', '0.0%', '0.0%', 'neutral', 'neutral', 'No active records', '⚡'),
        kpiHtml('Omni-Basket Attach', '0.0%', '0.0%', 'neutral', 'neutral', 'No active records', '📦'),
      '</div>',
      '<div class="zc360-card">',
        '<div class="zc360-card-head"><h3 class="zc360-card-title">🛒 Recent Customer Purchases & Services</h3></div>',
        '<div class="zc360-table-wrap">',
          '<table class="zc360-table">',
            '<thead><tr><th>Order ID</th><th>Pet Parent</th><th>Pet Patient</th><th>Items</th><th>Total</th><th>Channel</th><th>Fulfillment</th><th>Time</th></tr></thead>',
            '<tbody>',
              '<tr><td colspan="8" style="text-align:center;padding:28px;color:#94a3b8;">No customer purchase records found</td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderRevenue() {
    return [
      '<div class="zc360-kpi-grid">',
        kpiHtml('Customer Revenue (MTD)', '₹0', '0.0%', 'neutral', 'neutral', 'No active records', '💰'),
        kpiHtml('Monthly User ARPU', '₹0', '0.0%', 'neutral', 'neutral', 'No active records', '📈'),
        kpiHtml('Blended Gross Margin', '0.0%', '0.0%', 'neutral', 'neutral', 'No active records', '💎'),
        kpiHtml('Subscription Recurring', '0.0%', '0.0%', 'neutral', 'neutral', 'No active records', '🔄'),
      '</div>',
      '<div class="zc360-card">',
        '<div class="zc360-card-head"><h3 class="zc360-card-title">💰 Customer Revenue by Channel</h3></div>',
        '<div class="zc360-table-wrap">',
          '<table class="zc360-table">',
            '<thead><tr><th>Channel</th><th>MTD Revenue</th><th>Share</th><th>Avg Spend</th><th>Gross Margin</th><th>YoY Growth</th></tr></thead>',
            '<tbody>',
              '<tr><td colspan="6" style="text-align:center;padding:28px;color:#94a3b8;">No channel revenue records found</td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderRetention() {
    return [
      '<div class="zc360-kpi-grid">',
        kpiHtml('Month-1 Cohort Retention', '0.0%', '0.0%', 'neutral', 'neutral', 'No active records', '🛡️'),
        kpiHtml('Annual Churn Rate', '0.0%', '0.0%', 'neutral', 'neutral', 'No active records', '📉'),
        kpiHtml('Win-Back Success', '0.0%', '0.0%', 'neutral', 'neutral', 'No active records', '🔄'),
        kpiHtml('Net Revenue Retention', '0.0%', '0.0%', 'neutral', 'neutral', 'No active records', '💎'),
      '</div>',
      '<div class="zc360-card">',
        '<div class="zc360-card-head"><h3 class="zc360-card-title">🛡️ Longitudinal Cohort Retention Analysis</h3></div>',
        '<div class="zc360-table-wrap">',
          '<table class="zc360-table">',
            '<thead><tr><th>Cohort Inception</th><th>Initial Users</th><th>Month 1</th><th>Month 3</th><th>Month 6</th><th>Month 12</th><th>Status</th></tr></thead>',
            '<tbody>',
              '<tr><td colspan="7" style="text-align:center;padding:28px;color:#94a3b8;">No cohort retention records found</td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderComplaints() {
    var list = GRIEVANCES.slice();
    if (S.complaintFilter && S.complaintFilter !== 'ALL') {
      list = list.filter(function (g) {
        if (S.complaintFilter === 'OPEN') return g.status !== 'Closed';
        if (S.complaintFilter === 'CLOSED') return g.status === 'Closed';
        return g.category.toLowerCase().indexOf(S.complaintFilter.toLowerCase()) >= 0;
      });
    }
    if (S.complaintSearch) {
      var q = S.complaintSearch.toLowerCase();
      list = list.filter(function (g) {
        return g.id.toLowerCase().indexOf(q) >= 0 ||
               g.parent.toLowerCase().indexOf(q) >= 0 ||
               g.pet.toLowerCase().indexOf(q) >= 0 ||
               g.issue.toLowerCase().indexOf(q) >= 0 ||
               g.category.toLowerCase().indexOf(q) >= 0;
      });
    }

    var totalTickets = GRIEVANCES.length;
    var closedCount = GRIEVANCES.filter(function(g) { return g.status === 'Closed'; }).length;

    return [
      '<div class="zc360-kpi-grid">',
        kpiHtml('Total Grievance Tickets', '0', '0.0%', 'neutral', 'neutral', 'No active records', '⚠️'),
        kpiHtml('First Contact Resolution', '0.0%', '0.0%', 'neutral', 'neutral', 'No active records', '⚡'),
        kpiHtml('Avg. Resolution Time', '0', '0.0%', 'neutral', 'neutral', 'No active records', '⏱️'),
        kpiHtml('Post-Resolution CSAT', '0.0', '0.0%', 'neutral', 'neutral', 'No active records', '⭐'),
        kpiHtml('Cold-Chain / Rx SLA', '0.0%', '0.0%', 'neutral', 'neutral', 'No active records', '❄️'),
        kpiHtml('Sentiment Recovery', '0.0%', '0.0%', 'neutral', 'neutral', 'No active records', '❤️'),
      '</div>',

      '<div class="zc360-grid-2">',
        '<div class="zc360-card">',
          '<div class="zc360-card-head">',
            '<h3 class="zc360-card-title">📊 Grievance Category & Root-Cause Distribution</h3>',
            '<span class="zc360-pill active">Real-Time Telemetry</span>',
          '</div>',
          '<div class="zc360-bars">',
            '<div style="text-align:center;padding:28px;color:#94a3b8;font-size:13px;">No grievance categories recorded</div>',
          '</div>',
        '</div>',

        '<div class="zc360-card">',
          '<div class="zc360-card-head">',
            '<h3 class="zc360-card-title">📋 SOP Remedies & Resolution Matrix</h3>',
            '<span class="zc360-pill critical">Strict Tier-1 Protocol</span>',
          '</div>',
          '<div class="zc360-sop-grid">',
            '<div class="zc360-sop-card">',
              '<div class="zc360-sop-badge">🚚 Delivery Delay > 20 Mins</div>',
              '<div class="zc360-sop-rule">Full Delivery Waiver + ₹200 Credit</div>',
              '<div class="zc360-sop-desc">Auto-triggered if rider GPS exceeds 70 mins. Rider team lead calls customer with live status ETA.</div>',
            '</div>',
            '<div class="zc360-sop-card">',
              '<div class="zc360-sop-badge">❄️ Cold-Chain > 8°C Deviation</div>',
              '<div class="zc360-sop-rule">Instant Swap + Vet Sign-off</div>',
              '<div class="zc360-sop-desc">Vaccines and insulins replaced at 0 fee from nearest dark-store fridge hub within 25 mins.</div>',
            '</div>',
            '<div class="zc360-sop-card">',
              '<div class="zc360-sop-badge">📦 Torn Kibble / Damaged Seal</div>',
              '<div class="zc360-sop-rule">100% Free Swap + Treat Pouch</div>',
              '<div class="zc360-sop-desc">No return pickup required for unhygienic package. New sealed pack sent with complimentary treat.</div>',
            '</div>',
            '<div class="zc360-sop-card">',
              '<div class="zc360-sop-badge">🏥 Clinic Reschedule by Hospital</div>',
              '<div class="zc360-sop-rule">VIP Priority Slot + Free Checkup</div>',
              '<div class="zc360-sop-desc">If emergency surgery delays doctor, customer receives guaranteed next-slot bypass + free nails trim.</div>',
            '</div>',
          '</div>',
        '</div>',
      '</div>',

      '<div class="zc360-card">',
        '<div class="zc360-card-head">',
          '<div>',
            '<h3 class="zc360-card-title">⚠️ Live Customer Support & Grievance Register</h3>',
            '<p style="margin:2px 0 0;font-size:12px;color:#64748b;">Active customer complaints, priority triage, SLA countdowns, and resolution logging</p>',
          '</div>',
          '<div class="zc360-table-actions">',
            '<input type="text" class="zc360-search" placeholder="Search ticket, parent, pet, or issue..." value="' + esc(S.complaintSearch || '') + '" oninput="ZenveCustomersDashboard.searchGrievances(this.value)" />',
            '<div class="zc360-filter-group">',
              ['ALL', 'Delivery', 'Packaging', 'Billing', 'Clinic', 'Pharmacy', 'OPEN'].map(function(f) {
                var active = (S.complaintFilter === f) ? ' active' : '';
                return '<button class="zc360-filter-btn' + active + '" onclick="ZenveCustomersDashboard.filterGrievances(\'' + f + '\')">' + f + '</button>';
              }).join(''),
            '</div>',
            '<button class="zc360-btn primary" onclick="ZenveCustomersDashboard.showGrievanceModal()">+ Log New Grievance</button>',
          '</div>',
        '</div>',

        '<div class="zc360-table-wrap">',
          '<table class="zc360-table">',
            '<thead>',
              '<tr>',
                '<th>Ticket ID</th>',
                '<th>Pet Parent & Pet</th>',
                '<th>Category</th>',
                '<th>Priority</th>',
                '<th>Grievance Issue & Description</th>',
                '<th>Care Rep</th>',
                '<th>SLA Time</th>',
                '<th>Remedy / Outcome</th>',
                '<th>CSAT</th>',
                '<th>Status</th>',
                '<th>Actions</th>',
              '</tr>',
            '</thead>',
            '<tbody>',
              (list.length === 0 ? '<tr><td colspan="11" style="text-align:center;padding:28px;color:#94a3b8;">No customer grievance records found</td></tr>' :
              list.map(function (g) {
                var prioClass = g.priority === 'Critical' ? 'critical' : g.priority === 'High' ? 'warning' : 'active';
                var statusClass = g.status === 'Closed' ? 'active' : 'critical';
                return '<tr>' +
                  '<td style="font-family:monospace;font-weight:700;color:#2563eb;">' + esc(g.id) + '</td>' +
                  '<td><div style="font-weight:700;color:#0f172a;">' + esc(g.parent) + '</div><div style="font-size:11px;color:#64748b;">🐾 ' + esc(g.pet) + '</div></td>' +
                  '<td><span class="zc360-pill">' + esc(g.category) + '</span></td>' +
                  '<td><span class="zc360-pill ' + prioClass + '">' + esc(g.priority) + '</span></td>' +
                  '<td style="max-width:280px;line-height:1.4;"><div style="font-weight:600;color:#1e293b;">' + esc(g.issue) + '</div></td>' +
                  '<td style="font-size:12px;color:#475569;font-weight:600;">' + esc(g.rep) + '</td>' +
                  '<td style="font-weight:700;color:#0f172a;">' + esc(g.sla) + '</td>' +
                  '<td style="color:#059669;font-weight:600;font-size:12px;">' + esc(g.remedy) + '</td>' +
                  '<td style="font-weight:700;color:#eab308;">' + esc(g.csat) + '</td>' +
                  '<td><span class="zc360-pill ' + statusClass + '">' + esc(g.status) + '</span></td>' +
                  '<td>' +
                    (g.status === 'Closed'
                      ? '<button class="zc360-btn sm" onclick="alert(\'Ticket ' + g.id + ' is fully resolved.\\nOutcome: ' + g.remedy.replace(/'/g, "\\'") + '\')">View Details</button>'
                      : '<button class="zc360-btn sm primary" onclick="ZenveCustomersDashboard.resolveGrievance(\'' + g.id + '\')">Resolve Ticket</button>') +
                  '</td>' +
                '</tr>';
              }).join('')),
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
      '<header class="zc360-head">',
        '<div class="zc360-head-left">',
          '<div class="zc360-title-row">',
            '<h2 class="zc360-title">' + currentTab.icon + ' ' + esc(currentTab.title) + '</h2>',
            '<span class="zc360-live-badge"><span class="zc360-pulse-dot"></span> Customer 360° · Active</span>',
          '</div>',
          '<p class="zc360-sub">' + esc(currentTab.sub) + '</p>',
        '</div>',
        '<div class="zc360-head-actions">',
          '<button class="zc360-btn primary" onclick="ZenveCustomersDashboard.showOnboardModal()">+ Add Customer</button>',
          '<button class="zc360-btn" onclick="ZenveCustomersDashboard.close()">✕ Close</button>',
        '</div>',
      '</header>',

      '<nav class="zc360-tabs-bar">',
        TABS.map(function (t) {
          var active = t.id === S.tab ? ' active' : '';
          return '<button class="zc360-tab' + active + '" onclick="ZenveCustomersDashboard.switchTab(\'' + t.id + '\')">' +
            '<span>' + t.icon + '</span>' +
            '<span>' + esc(t.label) + '</span>' +
            '<span class="zc360-tab-badge">' + esc(t.badge) + '</span>' +
          '</button>';
        }).join(''),
      '</nav>',

      '<div class="zc360-body">'
    ];

    switch (S.tab) {
      case 'dashboard':      html.push(renderDashboard()); break;
      case 'all-customers':  html.push(renderAllCustomers()); break;
      case 'new-customers':  html.push(renderNewCustomers()); break;
      case 'active-customers': html.push(renderActiveCustomers()); break;
      case 'repeat-customers': html.push(renderRepeatCustomers()); break;
      case 'lifetime-value': html.push(renderLifetimeValue()); break;
      case 'segmentation':   html.push(renderSegmentation()); break;
      case 'orders':         html.push(renderOrders()); break;
      case 'revenue':        html.push(renderRevenue()); break;
      case 'retention':      html.push(renderRetention()); break;
      case 'complaints':     html.push(renderComplaints()); break;
      default:               html.push(renderDashboard());
    }

    html.push('</div>');
    root.innerHTML = html.join('');
  }

  /* ── Modal Mechanics ─────────────────────────────────────────────── */
  function showModal(contentHtml) {
    closeModal();
    var modal = document.createElement('div');
    modal.className = 'zc360-modal-overlay';
    modal.id = 'zc360-modal';
    modal.innerHTML = '<div class="zc360-modal-card">' + contentHtml + '</div>';
    document.body.appendChild(modal);
  }

  function closeModal() {
    var modal = document.getElementById('zc360-modal');
    if (modal) modal.remove();
  }

  function showOnboardModal() {
    var formHtml = [
      '<div class="zc360-modal-head">',
        '<h3 class="zc360-modal-title">👥 Create Pet Parent Profile</h3>',
        '<button class="zc360-btn" onclick="ZenveCustomersDashboard.closeModal()">✕</button>',
      '</div>',
      '<form onsubmit="event.preventDefault(); alert(\'Customer profile created! Welcome kit and referral reward dispatched!\'); ZenveCustomersDashboard.closeModal();">',
        '<div class="zc360-form-group"><label>Pet Parent Full Name</label><input type="text" class="zc360-input" placeholder="e.g. Tanvi Deshmukh" required /></div>',
        '<div class="zc360-form-row">',
          '<div class="zc360-form-group"><label>Mobile Number</label><input type="tel" class="zc360-input" placeholder="+91 98450 99999" required /></div>',
          '<div class="zc360-form-group"><label>City & Neighborhood</label><input type="text" class="zc360-input" placeholder="e.g. Indiranagar, BLR" required /></div>',
        '</div>',
        '<div class="zc360-form-row">',
          '<div class="zc360-form-group"><label>Registered Pet Name & Breed</label><input type="text" class="zc360-input" placeholder="e.g. Sparky (Beagle)" required /></div>',
          '<div class="zc360-form-group"><label>Initial Loyalty Tier</label><select class="zc360-select"><option>New Subscriber</option><option>Occasional Silver</option><option>Loyal Gold</option><option>VIP Elite</option></select></div>',
        '</div>',
        '<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:16px;">',
          '<button type="button" class="zc360-btn" onclick="ZenveCustomersDashboard.closeModal()">Cancel</button>',
          '<button type="submit" class="zc360-btn primary">Save & Activate Profile</button>',
        '</div>',
      '</form>'
    ].join('');
    showModal(formHtml);
  }

  function filterGrievances(f) {
    S.complaintFilter = f;
    render();
  }

  function searchGrievances(q) {
    S.complaintSearch = q;
    render();
  }

  function resolveGrievance(id) {
    var ticket = GRIEVANCES.find(function(g) { return g.id === id; });
    if (!ticket) return;
    var remedy = prompt('Enter resolution outcome & compensation for ticket ' + id + ' (' + ticket.parent + '):', 'Full fee refund + ₹200 wallet credit provided');
    if (remedy) {
      ticket.status = 'Closed';
      ticket.remedy = remedy;
      ticket.sla = 'Resolved just now';
      ticket.csat = '5.0 ⭐';
      render();
      alert('Ticket ' + id + ' marked as Resolved & Closed! Pet parent notified via SMS/WhatsApp.');
    }
  }

  function showGrievanceModal() {
    var formHtml = [
      '<div class="zc360-modal-head">',
        '<h3 class="zc360-modal-title">⚠️ Log Customer Grievance</h3>',
        '<button class="zc360-btn" onclick="ZenveCustomersDashboard.closeModal()">✕</button>',
      '</div>',
      '<form onsubmit="event.preventDefault(); ZenveCustomersDashboard.submitGrievance(this);">',
        '<div class="zc360-form-row">',
          '<div class="zc360-form-group"><label>Pet Parent Name</label><input type="text" name="parent" class="zc360-input" placeholder="e.g. Roshni Kapoor" required /></div>',
          '<div class="zc360-form-group"><label>Pet Name & Breed</label><input type="text" name="pet" class="zc360-input" placeholder="e.g. Bella (Beagle)" required /></div>',
        '</div>',
        '<div class="zc360-form-row">',
          '<div class="zc360-form-group"><label>Complaint Category</label>',
            '<select name="category" class="zc360-select">',
              '<option value="Delivery Delay">Delivery Delay (Dark Store)</option>',
              '<option value="Product Packaging">Product Packaging / Damaged Seal</option>',
              '<option value="Cold-Chain Pharmacy">Cold-Chain Pharmacy (Temperature)</option>',
              '<option value="Clinic Reschedule">Clinic OPD Reschedule</option>',
              '<option value="Billing Query">Billing & Loyalty Coins</option>',
              '<option value="Grooming Service">Grooming Service Issue</option>',
            '</select>',
          '</div>',
          '<div class="zc360-form-group"><label>Priority Level</label>',
            '<select name="priority" class="zc360-select">',
              '<option value="Critical">Critical (Immediate Triage)</option>',
              '<option value="High">High (Within 15 mins)</option>',
              '<option value="Medium" selected>Medium (Standard)</option>',
              '<option value="Low">Low (Informational)</option>',
            '</select>',
          '</div>',
        '</div>',
        '<div class="zc360-form-group"><label>Grievance Description</label><textarea name="issue" class="zc360-input" rows="3" placeholder="Describe customer issue, order ID, and pet parent feedback..." required style="resize:vertical;"></textarea></div>',
        '<div class="zc360-form-row">',
          '<div class="zc360-form-group"><label>Assigned Care Specialist</label><input type="text" name="rep" class="zc360-input" value="Kiran R. (Escalation Lead)" required /></div>',
          '<div class="zc360-form-group"><label>Initial Remedy Offer</label><input type="text" name="remedy" class="zc360-input" placeholder="e.g. Instant replacement + ₹200 wallet bonus" required /></div>',
        '</div>',
        '<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:16px;">',
          '<button type="button" class="zc360-btn" onclick="ZenveCustomersDashboard.closeModal()">Cancel</button>',
          '<button type="submit" class="zc360-btn primary">Log & Initiate SLA Timer</button>',
        '</div>',
      '</form>'
    ].join('');
    showModal(formHtml);
  }

  function submitGrievance(form) {
    var newId = 'TICK-' + (4400 + GRIEVANCES.length + 1);
    var newTicket = {
      id: newId,
      parent: form.parent.value,
      pet: form.pet.value,
      category: form.category.value,
      priority: form.priority.value,
      issue: form.issue.value,
      rep: form.rep.value,
      sla: 'Active (Now)',
      remedy: form.remedy.value,
      csat: 'Pending',
      status: 'Investigating'
    };
    GRIEVANCES.unshift(newTicket);
    closeModal();
    render();
    alert('Complaint ' + newId + ' registered! Priority alert dispatched to ' + newTicket.rep);
  }

  /* ── Open & Close Mechanics ──────────────────────────────────────── */
  function build() {
    root = document.getElementById('zc360-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'zc360-root';
      root.className = 'zpanel-root';
      document.body.appendChild(root);
    }
  }

  function open(tab) {
    // Close other domain overlays
    ['zb2b-root', 'zix-root', 'zsub-root', 'zdoc-root', 'zfa-root', 'zmkt-dashboard-root', 'zvp-root', 'zfsh-root', 'zod-root', 'zsd-root', 'zpid-root', 'zph-root', 'zch-root', 'zrep-root', 'zalt-root', 'zset-root', 'zhr-root', 'zsys-root'].forEach(function(id) {
      var el = document.getElementById(id);
      if (el) {
        el.style.display = 'none';
        el.classList.remove('zpanel-open');
      }
    });

    if (tab && TABS.some(function (t) { return t.id === tab; })) {
      S.tab = tab;
    } else if (!S.tab) {
      S.tab = 'dashboard';
    }

    build();
    S.open = true;
    root.style.display = 'block';
    root.classList.add('zc360-open', 'zpanel-open');

    try {
      document.documentElement.classList.remove('zb2b-locked', 'zix-locked', 'zsub-locked', 'zdoc-locked', 'zfsh-locked', 'zvp-locked');
      document.body.classList.remove('zb2b-locked', 'zix-locked', 'zsub-locked', 'zdoc-locked', 'zfsh-locked', 'zvp-locked');
      document.documentElement.classList.add('zc360-locked');
      document.body.classList.add('zc360-locked');
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
      root.classList.remove('zc360-open', 'zpanel-open');
      root.style.display = 'none';
    }
    try {
      document.documentElement.classList.remove('zc360-locked');
      document.body.classList.remove('zc360-locked');
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
      var otherDomains = ['sales', 'operations', 'inventory', 'pharmacy', 'clinics', 'reports', 'alerts', 'settings', 'finance', 'marketing', 'vendors', 'procurement', 'fashion', 'import', 'export', 'subscription', 'doctor', 'b2b'];
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

      var isSidebar = !!el.closest('aside, [class*="sidebar"]') && !el.closest('#zc360-root');
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
  window.ZenveCustomersDashboard = {
    open: open,
    close: close,
    switchTab: switchTab,
    closeModal: closeModal,
    showOnboardModal: showOnboardModal,
    filterGrievances: filterGrievances,
    searchGrievances: searchGrievances,
    resolveGrievance: resolveGrievance,
    showGrievanceModal: showGrievanceModal,
    submitGrievance: submitGrievance
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initInterception);
  } else {
    initInterception();
  }
})();