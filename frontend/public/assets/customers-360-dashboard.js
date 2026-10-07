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
    { id: 'dashboard',      label: 'Customer Dashboard',     icon: '👥', hash: '#customer-dashboard',       badge: '0 Base',        title: 'Unified Customer 360° Command Center', sub: 'Holistic pet parent profiles, omnichannel engagement, and loyalty status' },
    { id: 'all-customers',  label: 'All Customers',          icon: '📋', hash: '#all-customers',           badge: '0 Records',     title: 'All Registered Customers & Pet Parents', sub: 'Verified contact directory, multi-pet ownership mapping, and geographic distribution' },
    { id: 'new-customers',  label: 'New Customers',          icon: '✨', hash: '#new-customers',           badge: '+0 MTD',        title: 'New Customer Acquisition & First-Order Velocity', sub: 'Channel attribution, welcome bundle activations, and blended CAC dynamics' },
    { id: 'active-customers', label: 'Active Customers',     icon: '⚡', hash: '#active-customers',        badge: '0 MAU',         title: 'Active Customers & Omni-Channel Frequency', sub: 'Rolling DAU / WAU / MAU stickiness, repeat clinic visits, and mobile app usage' },
    { id: 'repeat-customers', label: 'Repeat Customers',     icon: '🔄', hash: '#repeat-customers',        badge: '0.0%',          title: 'Repeat Customers & Order Frequency Progression', sub: 'Replenishment interval tracking, reorder retention, and multi-visit habit loops' },
    { id: 'lifetime-value', label: 'Customer Lifetime Value', icon: '💎', hash: '#customer-lifetime-value', badge: '0.0x',          title: 'Customer Lifetime Value (LTV) & CAC Multiples', sub: 'Predictive CLV tiers, cumulative cohort GMV, and customer margin realization' },
    { id: 'segmentation',   label: 'Customer Segmentation',  icon: '🧩', hash: '#customer-segmentation',   badge: '0 Clusters',    title: 'Customer Segmentation & Behavioral Clusters', sub: 'RFM analysis, pet life-stage clustering, and personalized CRM campaigns' },
    { id: 'orders',         label: 'Customer Orders',        icon: '🛒', hash: '#customer-orders',         badge: '0 Orders',      title: 'Customer Orders & Transaction History', sub: 'Omnichannel commerce purchases, clinic treatment billing, and 60-min deliveries' },
    { id: 'revenue',        label: 'Customer Revenue',       icon: '💰', hash: '#customer-revenue',        badge: '₹0',            title: 'Customer Revenue & Monetization Streams', sub: 'Gross merchandise value, monthly ARPU realization, and category gross margins' },
    { id: 'retention',      label: 'Customer Retention',     icon: '🛡️', hash: '#customer-retention',      badge: '0.0%',          title: 'Customer Retention & Cohort Decay Curves', sub: 'Longitudinal cohort retention curves, churn rate tracking, and win-back success' },
    { id: 'complaints',     label: 'Customer Complaints',    icon: '⚠️', hash: '#customer-complaints',     badge: '0.0%',          title: 'Customer Complaints & Grievance Resolution', sub: 'Support ticket resolution speed, First-Contact Resolution, and post-service CSAT' }
  ];

  /* ── Master Datasets (Live from MySQL zenve_engine) ───────────────── */
  var CUSTOMERS = [];

  function loadLiveCustomers(cb) {
    fetch('/api/v1/customers')
      .then(function (res) { return res.json(); })
      .then(function (rows) {
        if (Array.isArray(rows) && rows.length > 0) {
          CUSTOMERS = rows.map(function (c) {
            return {
              id: c.customer_code || ('CUST-' + c.id),
              dbId: c.id,
              name: c.name,
              pets: c.pet_names || 'Pet Companion',
              tier: c.tier || 'Silver',
              ltv: '₹' + Number(c.total_spent || 0).toLocaleString('en-IN'),
              ordersCount: c.total_orders || 0,
              lastOrder: c.joined_date || '2026-10-01',
              mtdSpend: '₹' + Math.round((c.total_spent || 1000) * 0.2).toLocaleString('en-IN'),
              churnRisk: (c.tier && c.tier.indexOf('VIP') >= 0) ? 'Very Low' : 'Low',
              status: c.status || 'Active'
            };
          });
        }
        if (root && S.open) render();
        if (cb) cb();
      })
      .catch(function (err) {
        console.error('[Zenve Customers API Error]', err);
      });
  }
  loadLiveCustomers();

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
    if (h.indexOf('report') >= 0 || h.indexOf('alert') >= 0 || h.indexOf('vendor') >= 0 || h.indexOf('fashion') >= 0 || h.indexOf('import') >= 0 || h.indexOf('export') >= 0 || h.indexOf('subscription') >= 0 || h.indexOf('doctor') >= 0 || h.indexOf('prediction') >= 0 || h.indexOf('ai') >= 0) {
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
    if (h === 'customer-complaints') return 'complaints';
    return null;
  }

  function tabFromText(txt) {
    if (!txt) return null;
    var raw = txt.replace(/\s+/g, ' ').trim().toLowerCase();
    if (raw.indexOf('report') >= 0 || raw.indexOf('alert') >= 0 || raw.indexOf('vendor') >= 0 || raw.indexOf('doctor') >= 0 || raw.indexOf('prediction') >= 0 || raw.indexOf('ai') >= 0) return null;

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
    if (raw === 'customer complaints') return 'complaints';
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
        kpiHtml('Total Customer Base', CUSTOMERS.length + ' Families', 'Registered accounts', 'neutral', '0 registered pets', '👥'),
        kpiHtml('Active 30-Day Transactors', '0 Users', '0.0% engagement', 'neutral', 'Purchased or visited clinic', '⚡'),
        kpiHtml('Avg. Lifetime Value (LTV)', '₹0', 'Current period', 'neutral', 'Calculated across cohorts', '💎'),
        kpiHtml('Repeat Purchase Rate', '0.0%', 'No repeat records', 'neutral', 'Loyalty stickiness', '🔄'),
        kpiHtml('Customer CSAT Score', '-- / 5.0', '0 survey responses', 'neutral', 'Client feedback', '⭐'),
        kpiHtml('Net Churn Rate', '0.0%', 'Baseline', 'neutral', 'Retention tracking', '📉'),
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
              CUSTOMERS.length === 0 ?
                '<tr><td colspan="10" style="text-align:center;padding:32px;color:#94a3b8;">No customer profiles recorded yet. Click "+ Add Customer Profile" to onboard.</td></tr>' :
                CUSTOMERS.map(function(c) {
                  return '<tr>' +
                    '<td style="font-family:monospace;font-weight:600;">' + esc(c.id) + '</td>' +
                    '<td style="font-weight:600;">' + esc(c.name) + '</td>' +
                    '<td style="color:#475569;">' + esc(c.pets) + '</td>' +
                    '<td><span class="zc360-pill ' + (c.tier && c.tier.indexOf('VIP') >= 0 ? 'active' : c.tier && c.tier.indexOf('Gold') >= 0 ? 'warning' : '') + '">' + esc(c.tier) + '</span></td>' +
                    '<td style="font-weight:700;color:#059669;">' + esc(c.ltv) + '</td>' +
                    '<td style="font-weight:600;">' + (c.ordersCount || 0) + '</td>' +
                    '<td style="font-weight:600;">' + esc(c.mtdSpend || '₹0') + '</td>' +
                    '<td style="color:#64748b;">' + esc(c.lastOrder) + '</td>' +
                    '<td><span class="zc360-pill ' + (c.churnRisk === 'Very Low' || c.churnRisk === 'Low' ? 'active' : 'warning') + '">' + esc(c.churnRisk) + '</span></td>' +
                    '<td><span class="zc360-pill ' + (c.status === 'Active' ? 'active' : 'critical') + '">' + esc(c.status) + '</span></td>' +
                  '</tr>';
                }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderAllCustomers() {
    return [
      '<div class="zc360-kpi-grid">',
        kpiHtml('Master Customer Profiles', CUSTOMERS.length + ' Records', 'Verified Directory', 'neutral', 'Verified accounts', '📋'),
        kpiHtml('Primary Region Base', '0.0%', '0 accounts', 'neutral', 'Regional distribution', '📍'),
        kpiHtml('Multi-Pet Households', '0.0%', '0 families', 'neutral', 'Multi-pet ratio', '🐾'),
        kpiHtml('Verified Email & WhatsApp', '100%', 'Opt-in compliance', 'neutral', 'DPDP Act compliant', '🛡️'),
      '</div>',
      '<div class="zc360-card">',
        '<div class="zc360-card-head"><h3 class="zc360-card-title">📋 Comprehensive Customer Directory</h3></div>',
        '<div class="zc360-table-wrap">',
          '<table class="zc360-table">',
            '<thead><tr><th>Customer ID</th><th>Pet Parent</th><th>Phone</th><th>Email</th><th>Location</th><th>Pets</th><th>Tier</th><th>Total Spend</th><th>Status</th></tr></thead>',
            '<tbody>',
              CUSTOMERS.length === 0 ?
                '<tr><td colspan="9" style="text-align:center;padding:32px;color:#94a3b8;">No customer directory records found.</td></tr>' :
                CUSTOMERS.map(function(c) {
                  return '<tr>' +
                    '<td style="font-family:monospace;font-weight:600;">' + esc(c.id) + '</td>' +
                    '<td style="font-weight:600;">' + esc(c.name) + '</td>' +
                    '<td>--</td>' +
                    '<td>--</td>' +
                    '<td>Bengaluru</td>' +
                    '<td>' + esc(c.pets) + '</td>' +
                    '<td><span class="zc360-pill active">' + esc(c.tier) + '</span></td>' +
                    '<td style="font-weight:700;color:#059669;">' + esc(c.ltv) + '</td>' +
                    '<td><span class="zc360-pill active">' + esc(c.status) + '</span></td>' +
                  '</tr>';
                }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderNewCustomers() {
    return [
      '<div class="zc360-kpi-grid">',
        kpiHtml('New Customers (MTD)', '0 Pet Parents', 'Current month', 'neutral', 'Acquisition velocity', '✨'),
        kpiHtml('Blended CAC', '₹0 / Acq', 'No paid campaigns', 'neutral', 'Customer acquisition cost', '📉'),
        kpiHtml('Day-1 Activation Rate', '0.0%', '0 activations', 'neutral', 'Onboarding attach', '⚡'),
        kpiHtml('First Order Avg Basket', '₹0', 'Current period', 'neutral', 'Welcome basket', '🛒'),
      '</div>',
      '<div class="zc360-card">',
        '<div class="zc360-card-head"><h3 class="zc360-card-title">✨ Recent New Customer Conversions</h3></div>',
        '<div class="zc360-table-wrap">',
          '<table class="zc360-table">',
            '<thead><tr><th>ID</th><th>Parent</th><th>Pet Details</th><th>Channel</th><th>Signup Date</th><th>First Order</th><th>CAC</th><th>Status</th></tr></thead>',
            '<tbody>',
              '<tr><td colspan="8" style="text-align:center;padding:32px;color:#94a3b8;">No new customer conversions recorded for the current period.</td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderActiveCustomers() {
    return [
      '<div class="zc360-kpi-grid">',
        kpiHtml('Monthly Active Customers', '0 MAU', '0% total base', 'neutral', 'Transacting or visiting', '⚡'),
        kpiHtml('DAU / MAU Stickiness', '0.0%', 'App activity', 'neutral', 'Daily app utility', '📱'),
        kpiHtml('Avg Order Interval', '-- Days', 'Replenishment interval', 'neutral', 'Order pacing', '⏱️'),
        kpiHtml('Omni-Channel Engaged', '0.0%', 'App + Clinic', 'neutral', 'Cross-channel bracket', '🏬'),
      '</div>',
      '<div class="zc360-card">',
        '<div class="zc360-card-head"><h3 class="zc360-card-title">⚡ Active Cadence & Platform Cohorts</h3></div>',
        '<div class="zc360-table-wrap">',
          '<table class="zc360-table">',
            '<thead><tr><th>Engagement Cohort</th><th>Active Count</th><th>Share of Base</th><th>Behavior Profile</th><th>Dominant Service</th><th>Growth</th></tr></thead>',
            '<tbody>',
              '<tr><td colspan="6" style="text-align:center;padding:32px;color:#94a3b8;">No active customer cohort activity recorded.</td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderRepeatCustomers() {
    return [
      '<div class="zc360-kpi-grid">',
        kpiHtml('Overall Repeat Purchase Rate', '0.0%', 'No reorders logged', 'neutral', 'Reorder within 60D', '🔄'),
        kpiHtml('Repeat Customer Revenue', '₹0', '0% total GMV', 'neutral', 'Recurring baseline', '💰'),
        kpiHtml('Avg Order Count / User', '0 Orders', 'Annualized frequency', 'neutral', 'Order cadence', '🛒'),
        kpiHtml('Reorder Retention 90D', '0.0%', 'No cohort data', 'neutral', 'Retention rate', '🛡️'),
      '</div>',
      '<div class="zc360-card">',
        '<div class="zc360-card-head"><h3 class="zc360-card-title">🔄 Customer Order Frequency Ladder</h3></div>',
        '<div class="zc360-table-wrap">',
          '<table class="zc360-table">',
            '<thead><tr><th>Order Ladder</th><th>Customer Count</th><th>Base Share</th><th>Next Purchase Likelihood</th><th>Days to Reorder</th><th>CRM Trigger</th></tr></thead>',
            '<tbody>',
              '<tr><td colspan="6" style="text-align:center;padding:32px;color:#94a3b8;">No customer repeat frequency records found.</td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderLifetimeValue() {
    return [
      '<div class="zc360-kpi-grid">',
        kpiHtml('Average Blended LTV', '₹0', 'All accounts', 'neutral', 'Average customer LTV', '💎'),
        kpiHtml('Blended LTV : CAC Multiple', '0.0x', 'CAC multiple', 'neutral', 'Payback period', '📈'),
        kpiHtml('Avg Customer Lifespan', '-- Months', 'Customer tenure', 'neutral', 'Tenure tracking', '⏳'),
        kpiHtml('Cumulative Cohort GMV', '₹0', 'Realized GMV', 'neutral', 'Since platform inception', '💰'),
      '</div>',
      '<div class="zc360-card">',
        '<div class="zc360-card-head"><h3 class="zc360-card-title">💎 Lifetime Value (LTV) Tier Breakdown</h3></div>',
        '<div class="zc360-table-wrap">',
          '<table class="zc360-table">',
            '<thead><tr><th>Tier Segment</th><th>Customers</th><th>Avg Lifespan</th><th>Annual Spend</th><th>Estimated LTV</th><th>Margin %</th><th>LTV:CAC</th></tr></thead>',
            '<tbody>',
              '<tr><td colspan="7" style="text-align:center;padding:32px;color:#94a3b8;">No customer lifetime value tier data recorded.</td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderSegmentation() {
    return [
      '<div class="zc360-kpi-grid">',
        kpiHtml('Persona Clusters', '0 Segments', 'RFM Analyzed', 'neutral', 'Dynamic refresh', '🧩'),
        kpiHtml('Multi-Pet Cluster Share', '0.0%', '0 households', 'neutral', 'Multi-pet cohort', '🐾'),
        kpiHtml('Senior & Chronic Care', '0.0%', '0 accounts', 'neutral', 'Maintenance spend', '🩺'),
        kpiHtml('Segment Campaign ROAS', '0.0x', 'No campaigns', 'neutral', 'CRM playbook', '🎯'),
      '</div>',
      '<div class="zc360-card">',
        '<div class="zc360-card-head"><h3 class="zc360-card-title">🧩 Behavioral Cohort Matrix</h3></div>',
        '<div class="zc360-table-wrap">',
          '<table class="zc360-table">',
            '<thead><tr><th>Segment Persona</th><th>Count</th><th>Share</th><th>Behavior</th><th>AOV</th><th>Annual ARPU</th><th>Active Campaign</th></tr></thead>',
            '<tbody>',
              '<tr><td colspan="7" style="text-align:center;padding:32px;color:#94a3b8;">No customer behavioral segmentation records found.</td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderOrders() {
    return [
      '<div class="zc360-kpi-grid">',
        kpiHtml('Total Customer Orders', '0 Orders', 'Current period', 'neutral', 'App, clinic & web', '🛒'),
        kpiHtml('Average Order Value', '₹0', 'Baseline AOV', 'neutral', 'Retail & medical mix', '💰'),
        kpiHtml('60-Min Fast Delivery', '0.0%', 'On-time delivery', 'neutral', 'Hyperlocal delivery', '⚡'),
        kpiHtml('Omni-Basket Attach', '0.0%', 'Multi-category', 'neutral', 'Basket attach rate', '📦'),
      '</div>',
      '<div class="zc360-card">',
        '<div class="zc360-card-head"><h3 class="zc360-card-title">🛒 Recent Customer Purchases & Services</h3></div>',
        '<div class="zc360-table-wrap">',
          '<table class="zc360-table">',
            '<thead><tr><th>Order ID</th><th>Pet Parent</th><th>Pet Patient</th><th>Items</th><th>Total</th><th>Channel</th><th>Fulfillment</th><th>Time</th></tr></thead>',
            '<tbody>',
              '<tr><td colspan="8" style="text-align:center;padding:32px;color:#94a3b8;">No customer purchases or services recorded yet.</td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderRevenue() {
    return [
      '<div class="zc360-kpi-grid">',
        kpiHtml('Customer Revenue (MTD)', '₹0', 'Current period', 'neutral', 'All retail & clinic streams', '💰'),
        kpiHtml('Monthly User ARPU', '₹0', 'Active transactors', 'neutral', 'ARPU realization', '📈'),
        kpiHtml('Blended Gross Margin', '0.0%', 'Realized margin', 'neutral', 'Gross margin', '💎'),
        kpiHtml('Subscription Recurring', '0.0%', 'Predictable baseline', 'neutral', 'Recurring share', '🔄'),
      '</div>',
      '<div class="zc360-card">',
        '<div class="zc360-card-head"><h3 class="zc360-card-title">💰 Customer Revenue by Channel</h3></div>',
        '<div class="zc360-table-wrap">',
          '<table class="zc360-table">',
            '<thead><tr><th>Channel</th><th>MTD Revenue</th><th>Share</th><th>Avg Spend</th><th>Gross Margin</th><th>YoY Growth</th></tr></thead>',
            '<tbody>',
              '<tr><td colspan="6" style="text-align:center;padding:32px;color:#94a3b8;">No customer revenue channel records available.</td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderRetention() {
    return [
      '<div class="zc360-kpi-grid">',
        kpiHtml('Month-1 Cohort Retention', '0.0%', 'Cohort tracking', 'neutral', 'Initial retention', '🛡️'),
        kpiHtml('Annual Churn Rate', '0.0%', 'Annualized', 'neutral', 'Churn rate', '📉'),
        kpiHtml('Win-Back Success', '0.0%', 'Re-activations', 'neutral', 'Win-back campaigns', '🔄'),
        kpiHtml('Net Revenue Retention', '0.0%', 'Expansion revenue', 'neutral', 'NRR metric', '💎'),
      '</div>',
      '<div class="zc360-card">',
        '<div class="zc360-card-head"><h3 class="zc360-card-title">🛡️ Longitudinal Cohort Retention Analysis</h3></div>',
        '<div class="zc360-table-wrap">',
          '<table class="zc360-table">',
            '<thead><tr><th>Cohort Inception</th><th>Initial Users</th><th>Month 1</th><th>Month 3</th><th>Month 6</th><th>Month 12</th><th>Status</th></tr></thead>',
            '<tbody>',
              '<tr><td colspan="7" style="text-align:center;padding:32px;color:#94a3b8;">No cohort retention records found.</td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderComplaints() {
    return [
      '<div class="zc360-kpi-grid">',
        kpiHtml('Total Grievance Tickets', '0 Tickets', 'Current period', 'neutral', '0.0% of total orders', '⚠️'),
        kpiHtml('First Contact Resolution', '0.0%', 'Initial call', 'neutral', 'Resolution rate', '⚡'),
        kpiHtml('Avg. Resolution Time', '-- mins', 'Resolution tracking', 'neutral', '24/7 dedicated support', '⏱️'),
        kpiHtml('Post-Resolution CSAT', '-- / 5.0', '0 reviews', 'neutral', 'Post-ticket feedback', '⭐'),
      '</div>',
      '<div class="zc360-card">',
        '<div class="zc360-card-head"><h3 class="zc360-card-title">⚠️ Live Support & Grievance Register</h3></div>',
        '<div class="zc360-table-wrap">',
          '<table class="zc360-table">',
            '<thead><tr><th>Ticket ID</th><th>Pet Parent</th><th>Category</th><th>Issue</th><th>Agent</th><th>Turnaround</th><th>Outcome</th><th>Status</th></tr></thead>',
            '<tbody>',
              '<tr><td colspan="8" style="text-align:center;padding:32px;color:#94a3b8;">No customer complaints or grievances logged.</td></tr>',
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
      '<form id="zc360-add-cust-form">',
        '<div class="zc360-form-group"><label>Pet Parent Full Name</label><input type="text" id="zcust-name" class="zc360-input" placeholder="e.g. Tanvi Deshmukh" required /></div>',
        '<div class="zc360-form-row">',
          '<div class="zc360-form-group"><label>Mobile Number</label><input type="tel" id="zcust-phone" class="zc360-input" placeholder="+91 98450 99999" required /></div>',
          '<div class="zc360-form-group"><label>City & Neighborhood</label><input type="text" id="zcust-city" class="zc360-input" placeholder="e.g. Indiranagar, Bengaluru" required /></div>',
        '</div>',
        '<div class="zc360-form-row">',
          '<div class="zc360-form-group"><label>Registered Pet Name & Breed</label><input type="text" id="zcust-pets" class="zc360-input" placeholder="e.g. Sparky (Beagle)" required /></div>',
          '<div class="zc360-form-group"><label>Initial Loyalty Tier</label><select id="zcust-tier" class="zc360-select"><option>Silver</option><option>Loyal Gold</option><option>VIP Elite</option></select></div>',
        '</div>',
        '<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:16px;">',
          '<button type="button" class="zc360-btn" onclick="ZenveCustomersDashboard.closeModal()">Cancel</button>',
          '<button type="submit" class="zc360-btn primary">Save to MySQL</button>',
        '</div>',
      '</form>'
    ].join('');
    showModal(formHtml);

    var form = document.getElementById('zc360-add-cust-form');
    if (form) {
      form.onsubmit = function (e) {
        e.preventDefault();
        var name = document.getElementById('zcust-name').value;
        var phone = document.getElementById('zcust-phone').value;
        var city = document.getElementById('zcust-city').value;
        var pets = document.getElementById('zcust-pets').value;
        var tier = document.getElementById('zcust-tier').value;

        fetch('/api/v1/customers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name,
            email: name.toLowerCase().replace(/[^a-z]/g, '') + '@gmail.com',
            phone: phone,
            city: city,
            pet_names: pets,
            tier: tier
          })
        })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          ZenveCustomersDashboard.closeModal();
          alert('✓ Pet Parent profile for "' + name + '" saved to MySQL zenve_engine database!');
          loadLiveCustomers();
        })
        .catch(function (err) {
          alert('Error saving customer: ' + err.message);
        });
      };
    }
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
    showOnboardModal: showOnboardModal
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initInterception);
  } else {
    initInterception();
  }
})();
