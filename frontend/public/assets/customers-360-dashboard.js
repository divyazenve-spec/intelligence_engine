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
    { id: 'dashboard',      label: 'Customer Dashboard',     icon: '👥', hash: '#customer-dashboard',       badge: '12.4k Base',    title: 'Unified Customer 360° Command Center', sub: 'Holistic pet parent profiles, omnichannel engagement, and loyalty status' },
    { id: 'all-customers',  label: 'All Customers',          icon: '📋', hash: '#all-customers',           badge: '12,480 Records', title: 'All Registered Customers & Pet Parents', sub: 'Verified contact directory, multi-pet ownership mapping, and geographic distribution' },
    { id: 'new-customers',  label: 'New Customers',          icon: '✨', hash: '#new-customers',           badge: '+1,120 MTD',    title: 'New Customer Acquisition & First-Order Velocity', sub: 'Channel attribution, welcome bundle activations, and blended CAC dynamics' },
    { id: 'active-customers', label: 'Active Customers',     icon: '⚡', hash: '#active-customers',        badge: '8,420 MAU',     title: 'Active Customers & Omni-Channel Frequency', sub: 'Rolling DAU / WAU / MAU stickiness, repeat clinic visits, and mobile app usage' },
    { id: 'repeat-customers', label: 'Repeat Customers',     icon: '🔄', hash: '#repeat-customers',        badge: '78.4% Rate',    title: 'Repeat Customers & Order Frequency Progression', sub: 'Replenishment interval tracking, reorder retention, and multi-visit habit loops' },
    { id: 'lifetime-value', label: 'Customer Lifetime Value', icon: '💎', hash: '#customer-lifetime-value', badge: '5.8x LTV/CAC',  title: 'Customer Lifetime Value (LTV) & CAC Multiples', sub: 'Predictive CLV tiers, cumulative cohort GMV, and customer margin realization' },
    { id: 'segmentation',   label: 'Customer Segmentation',  icon: '🧩', hash: '#customer-segmentation',   badge: '5 Clusters',    title: 'Customer Segmentation & Behavioral Clusters', sub: 'RFM analysis, pet life-stage clustering, and personalized CRM campaigns' },
    { id: 'orders',         label: 'Customer Orders',        icon: '🛒', hash: '#customer-orders',         badge: '28.4k Orders',  title: 'Customer Orders & Transaction History', sub: 'Omnichannel commerce purchases, clinic treatment billing, and 60-min deliveries' },
    { id: 'revenue',        label: 'Customer Revenue',       icon: '💰', hash: '#customer-revenue',        badge: '₹1.71 Cr MTD',  title: 'Customer Revenue & Monetization Streams', sub: 'Gross merchandise value, monthly ARPU realization, and category gross margins' },
    { id: 'retention',      label: 'Customer Retention',     icon: '🛡️', hash: '#customer-retention',      badge: '91.2% M1 Ret',  title: 'Customer Retention & Cohort Decay Curves', sub: 'Longitudinal cohort retention curves, churn rate tracking, and win-back success' },
    { id: 'complaints',     label: 'Customer Complaints',    icon: '⚠️', hash: '#customer-complaints',     badge: '98.2% SLA',     title: 'Customer Complaints & Grievance Resolution', sub: 'Support ticket resolution speed, First-Contact Resolution, and post-service CSAT' }
  ];

  /* ── Master Datasets ─────────────────────────────────────────────── */
  var CUSTOMERS = [
    { id: 'CUST-8401', name: 'Aarav & Tanya Sharma', pets: 'Bruno (Golden Retriever) + Milo (Cat)', tier: 'VIP Elite', ltv: '₹1,48,000', ordersCount: 42, lastOrder: '2026-10-04', mtdSpend: '₹14,200', churnRisk: 'Very Low', status: 'Active' },
    { id: 'CUST-8402', name: 'Vikram & Ananya Malhotra', pets: 'Leo (German Shepherd)', tier: 'VIP Elite', ltv: '₹1,24,000', ordersCount: 36, lastOrder: '2026-10-05', mtdSpend: '₹18,500', churnRisk: 'Very Low', status: 'Active' },
    { id: 'CUST-8403', name: 'Priya Sundaram', pets: 'Bella & Coco (Persian Cats)', tier: 'Loyal Gold', ltv: '₹84,000', ordersCount: 24, lastOrder: '2026-10-01', mtdSpend: '₹7,800', churnRisk: 'Low', status: 'Active' },
    { id: 'CUST-8404', name: 'Rahul & Meera Nambiar', pets: 'Simba (Beagle Pup)', tier: 'New Subscriber', ltv: '₹32,000', ordersCount: 8, lastOrder: '2026-10-03', mtdSpend: '₹6,400', churnRisk: 'Low', status: 'Active' },
    { id: 'CUST-8405', name: 'Sneha Kulkarni', pets: 'Whiskey (Shih Tzu)', tier: 'Occasional Silver', ltv: '₹48,000', ordersCount: 14, lastOrder: '2026-09-18', mtdSpend: '₹0', churnRisk: 'Medium', status: 'At Risk' },
    { id: 'CUST-8406', name: 'Karthik & Pooja Sen', pets: 'Rocky (Siberian Husky)', tier: 'Loyal Gold', ltv: '₹92,000', ordersCount: 28, lastOrder: '2026-10-02', mtdSpend: '₹9,200', churnRisk: 'Very Low', status: 'Active' }
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
    if (h.indexOf('report') >= 0 || h.indexOf('alert') >= 0 || h.indexOf('vendor') >= 0 || h.indexOf('fashion') >= 0 || h.indexOf('import') >= 0 || h.indexOf('export') >= 0 || h.indexOf('subscription') >= 0 || h.indexOf('doctor') >= 0) {
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
    if (raw.indexOf('report') >= 0 || raw.indexOf('alert') >= 0 || raw.indexOf('vendor') >= 0 || raw.indexOf('doctor') >= 0) return null;

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
        kpiHtml('Total Customer Base', '12,480 Families', '+1,120 MTD', 'up', '18,650 registered pets', '👥'),
        kpiHtml('Active 30-Day Transactors', '8,420 Users', '67.5% engagement', 'up', 'Purchased or visited clinic', '⚡'),
        kpiHtml('Avg. Lifetime Value (LTV)', '₹68,400', '+14.2% YoY', 'up', 'Calculated across cohorts', '💎'),
        kpiHtml('Repeat Purchase Rate', '78.4%', '+2.6% vs Q2', 'up', 'High loyalty stickiness', '🔄'),
        kpiHtml('Customer CSAT Score', '96.2%', 'CSAT 4.9/5', 'up', '4,800 survey responses', '⭐'),
        kpiHtml('Net Churn Rate', '1.18%', '-0.32% MoM', 'up', 'Industry leading retention', '📉'),
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
              CUSTOMERS.map(function(c) {
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
        kpiHtml('Master Customer Profiles', '12,480 Records', '+9.8% YoY', 'up', '100% verified mobile KYC', '📋'),
        kpiHtml('Bengaluru Core Base', '84.2%', '10,500 accounts', 'up', 'Expanding to Hyd & Pune', '📍'),
        kpiHtml('Multi-Pet Households', '38.5%', '4,800 families', 'up', 'High ARPU multiple', '🐾'),
        kpiHtml('Verified Email & WhatsApp', '97.4%', 'Opt-in compliance', 'up', 'DPDP Act 2023 aligned', '🛡️'),
      '</div>',
      '<div class="zc360-card">',
        '<div class="zc360-card-head"><h3 class="zc360-card-title">📋 Comprehensive Customer Directory</h3></div>',
        '<div class="zc360-table-wrap">',
          '<table class="zc360-table">',
            '<thead><tr><th>Customer ID</th><th>Pet Parent</th><th>Phone</th><th>Email</th><th>Location</th><th>Pets</th><th>Tier</th><th>Total Spend</th><th>Status</th></tr></thead>',
            '<tbody>',
              '<tr><td style="font-family:monospace;font-weight:600;">CUST-8401</td><td style="font-weight:600;">Aarav Sharma</td><td>+91 98450 11201</td><td>aarav.sharma@gmail.com</td><td>Indiranagar</td><td>Canine & Feline</td><td><span class="zc360-pill active">VIP Elite</span></td><td style="font-weight:700;color:#059669;">₹1,48,000</td><td><span class="zc360-pill active">Active</span></td></tr>',
              '<tr><td style="font-family:monospace;font-weight:600;">CUST-8402</td><td style="font-weight:600;">Vikram Malhotra</td><td>+91 98450 22302</td><td>v.malhotra@zenve.in</td><td>Koramangala</td><td>Canine</td><td><span class="zc360-pill active">VIP Elite</span></td><td style="font-weight:700;color:#059669;">₹1,24,000</td><td><span class="zc360-pill active">Active</span></td></tr>',
              '<tr><td style="font-family:monospace;font-weight:600;">CUST-8403</td><td style="font-weight:600;">Priya Sundaram</td><td>+91 98450 33403</td><td>priya.sundaram@yahoo.co.in</td><td>Whitefield</td><td>Feline</td><td><span class="zc360-pill warning">Loyal Gold</span></td><td style="font-weight:700;color:#059669;">₹84,000</td><td><span class="zc360-pill active">Active</span></td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderNewCustomers() {
    return [
      '<div class="zc360-kpi-grid">',
        kpiHtml('New Customers (MTD)', '1,120 Pet Parents', '+22.4% MoM', 'up', 'Target: 950 accounts', '✨'),
        kpiHtml('Blended CAC', '₹284 / Acq', '-14.2% YoY', 'up', 'High organic referral mix', '📉'),
        kpiHtml('Day-1 Activation Rate', '84.2%', 'First purchase within 24h', 'up', 'Instant onboarding attach', '⚡'),
        kpiHtml('First Order Avg Basket', '₹3,480', '+8.6% vs FY25', 'up', 'Welcome bundle attach', '🛒'),
      '</div>',
      '<div class="zc360-card">',
        '<div class="zc360-card-head"><h3 class="zc360-card-title">✨ Recent New Customer Conversions</h3></div>',
        '<div class="zc360-table-wrap">',
          '<table class="zc360-table">',
            '<thead><tr><th>ID</th><th>Parent</th><th>Pet Details</th><th>Channel</th><th>Signup Date</th><th>First Order</th><th>CAC</th><th>Status</th></tr></thead>',
            '<tbody>',
              '<tr><td style="font-family:monospace;font-weight:600;">CUST-8441</td><td style="font-weight:600;">Varun Grover</td><td>Koko (Pug Pup)</td><td><span class="zc360-pill active">Instagram Ads</span></td><td>2026-10-05</td><td style="font-weight:600;color:#059669;">₹3,400 (Puppy Kit)</td><td>₹420</td><td><span class="zc360-pill active">Converted</span></td></tr>',
              '<tr><td style="font-family:monospace;font-weight:600;">CUST-8442</td><td style="font-weight:600;">Dr. Shalini Mehta</td><td>Oliver (British Shorthair)</td><td><span class="zc360-pill active">Vet Referral</span></td><td>2026-10-04</td><td style="font-weight:600;color:#059669;">₹5,800 (Rx Renal)</td><td>₹180</td><td><span class="zc360-pill active">Converted</span></td></tr>',
              '<tr><td style="font-family:monospace;font-weight:600;">CUST-8443</td><td style="font-weight:600;">Rohan Sethi</td><td>Cooper (Labrador)</td><td><span class="zc360-pill active">Google Organic</span></td><td>2026-10-04</td><td style="font-weight:600;color:#059669;">₹2,600 (Dewormer)</td><td>₹0</td><td><span class="zc360-pill active">Converted</span></td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderActiveCustomers() {
    return [
      '<div class="zc360-kpi-grid">',
        kpiHtml('Monthly Active Customers', '8,420 MAU', '67.5% total base', 'up', 'Transacting or visiting', '⚡'),
        kpiHtml('DAU / MAU Stickiness', '33.7%', 'Top decile app', 'up', 'Daily app utility', '📱'),
        kpiHtml('Avg Order Interval', '18.2 Days', '-3.4 days vs FY25', 'up', 'Faster replenishment', '⏱️'),
        kpiHtml('Omni-Channel Engaged', '58.4%', 'App + Physical Clinic', 'up', 'Highest LTV bracket', '🏬'),
      '</div>',
      '<div class="zc360-card">',
        '<div class="zc360-card-head"><h3 class="zc360-card-title">⚡ Active Cadence & Platform Cohorts</h3></div>',
        '<div class="zc360-table-wrap">',
          '<table class="zc360-table">',
            '<thead><tr><th>Engagement Cohort</th><th>Active Count</th><th>Share of Base</th><th>Behavior Profile</th><th>Dominant Service</th><th>Growth</th></tr></thead>',
            '<tbody>',
              '<tr><td style="font-weight:600;">Daily Active (DAU)</td><td style="font-weight:700;color:#2563eb;">2,840</td><td>22.8%</td><td>App tracking, diary, reminders</td><td>Vet chat & telemetry</td><td style="color:#059669;font-weight:600;">+14% MoM</td></tr>',
              '<tr><td style="font-weight:600;">Weekly Active (WAU)</td><td style="font-weight:700;color:#2563eb;">6,150</td><td>49.3%</td><td>Weekly treats & pharmacy reorders</td><td>Cart checkout</td><td style="color:#059669;font-weight:600;">+18% MoM</td></tr>',
              '<tr><td style="font-weight:600;">Monthly Active (MAU)</td><td style="font-weight:700;color:#2563eb;">8,420</td><td>67.5%</td><td>Monthly wellness + OPD visits</td><td>Clinic visits & food</td><td style="color:#059669;font-weight:600;">+22% MoM</td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderRepeatCustomers() {
    return [
      '<div class="zc360-kpi-grid">',
        kpiHtml('Overall Repeat Purchase Rate', '78.4%', '+3.1% YoY', 'up', '78/100 reorder within 60D', '🔄'),
        kpiHtml('Repeat Customer Revenue', '₹1.42 Cr MTD', '82.4% total GMV', 'up', 'Predictable recurring baseline', '💰'),
        kpiHtml('Avg Order Count / User', '6.4 Orders', '+1.2 orders vs FY25', 'up', 'Annualized frequency', '🛒'),
        kpiHtml('Reorder Retention 90D', '84.6%', 'High brand fidelity', 'up', 'Zero churn in 6+ club', '🛡️'),
      '</div>',
      '<div class="zc360-card">',
        '<div class="zc360-card-head"><h3 class="zc360-card-title">🔄 Customer Order Frequency Ladder</h3></div>',
        '<div class="zc360-table-wrap">',
          '<table class="zc360-table">',
            '<thead><tr><th>Order Ladder</th><th>Customer Count</th><th>Base Share</th><th>Next Purchase Likelihood</th><th>Days to Reorder</th><th>CRM Trigger</th></tr></thead>',
            '<tbody>',
              '<tr><td style="font-weight:600;">1 Order (First-Timer)</td><td style="font-weight:700;color:#2563eb;">2,680</td><td>21.5%</td><td style="color:#059669;font-weight:700;">64%</td><td>16 Days</td><td>Day 7 bundle nurture</td></tr>',
              '<tr><td style="font-weight:600;">2 - 5 Orders (Returning)</td><td style="font-weight:700;color:#2563eb;">4,850</td><td>38.8%</td><td style="color:#059669;font-weight:700;">82%</td><td>14 Days</td><td>Wellness plan prompt</td></tr>',
              '<tr><td style="font-weight:600;">6 - 15 Orders (Frequent)</td><td style="font-weight:700;color:#2563eb;">3,240</td><td>26.0%</td><td style="color:#059669;font-weight:700;">91%</td><td>11 Days</td><td>Loyalty Gold upgrade</td></tr>',
              '<tr><td style="font-weight:600;">16+ Orders (Superfans / VIP)</td><td style="font-weight:700;color:#2563eb;">1,710</td><td>13.7%</td><td style="color:#059669;font-weight:700;">98%</td><td>8 Days</td><td>VIP concierge vet access</td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderLifetimeValue() {
    return [
      '<div class="zc360-kpi-grid">',
        kpiHtml('Average Blended LTV', '₹68,400', '+14.2% YoY', 'up', 'Across 12,480 accounts', '💎'),
        kpiHtml('Blended LTV : CAC Multiple', '5.8x', '+0.8x vs FY25', 'up', 'Payback: 2.1 months', '📈'),
        kpiHtml('Avg Customer Lifespan', '26.4 Months', '+4.2 months YoY', 'up', 'Increasing retention', '⏳'),
        kpiHtml('Cumulative Cohort GMV', '₹85.3 Cr', 'Realized value', 'up', 'Since platform inception', '💰'),
      '</div>',
      '<div class="zc360-card">',
        '<div class="zc360-card-head"><h3 class="zc360-card-title">💎 Lifetime Value (LTV) Tier Breakdown</h3></div>',
        '<div class="zc360-table-wrap">',
          '<table class="zc360-table">',
            '<thead><tr><th>Tier Segment</th><th>Customers</th><th>Avg Lifespan</th><th>Annual Spend</th><th>Estimated LTV</th><th>Margin %</th><th>LTV:CAC</th></tr></thead>',
            '<tbody>',
              '<tr><td style="font-weight:600;">Top Tier VIP (>₹1L LTV)</td><td style="font-weight:600;">1,240</td><td>32 Months</td><td>₹48,500</td><td style="font-weight:700;color:#059669;">₹1,29,300</td><td>48.2%</td><td style="font-weight:700;color:#2563eb;">9.4x</td></tr>',
              '<tr><td style="font-weight:600;">Loyal Gold (₹50k - ₹1L)</td><td style="font-weight:600;">3,480</td><td>24 Months</td><td>₹34,000</td><td style="font-weight:700;color:#059669;">₹68,000</td><td>42.0%</td><td style="font-weight:700;color:#2563eb;">6.2x</td></tr>',
              '<tr><td style="font-weight:600;">Mid Silver (₹20k - ₹50k)</td><td style="font-weight:600;">4,920</td><td>18 Months</td><td>₹22,000</td><td style="font-weight:700;color:#059669;">₹33,000</td><td>38.5%</td><td style="font-weight:700;color:#2563eb;">4.1x</td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderSegmentation() {
    return [
      '<div class="zc360-kpi-grid">',
        kpiHtml('Persona Clusters', '5 Segments', 'RFM Analyzed', 'up', 'Dynamic daily refresh', '🧩'),
        kpiHtml('Multi-Pet Cluster Share', '30.8%', '3,840 households', 'up', 'Highest value cohort', '🐾'),
        kpiHtml('Senior & Chronic Care', '17.5%', 'High Rx attach', 'up', '94% recurring monthly spend', '🩺'),
        kpiHtml('Segment Campaign ROAS', '5.8x', '+1.2x vs unsegmented', 'up', 'Personalized playbook', '🎯'),
      '</div>',
      '<div class="zc360-card">',
        '<div class="zc360-card-head"><h3 class="zc360-card-title">🧩 Behavioral Cohort Matrix</h3></div>',
        '<div class="zc360-table-wrap">',
          '<table class="zc360-table">',
            '<thead><tr><th>Segment Persona</th><th>Count</th><th>Share</th><th>Behavior</th><th>AOV</th><th>Annual ARPU</th><th>Active Campaign</th></tr></thead>',
            '<tbody>',
              '<tr><td style="font-weight:600;">Puppy & Kitten Parents</td><td style="font-weight:600;color:#2563eb;">2,450</td><td>19.6%</td><td>Vaccines & starter nutrition</td><td>₹3,200</td><td style="font-weight:700;color:#059669;">₹14,500</td><td>Milestone training</td></tr>',
              '<tr><td style="font-weight:600;">Multi-Pet Champions</td><td style="font-weight:600;color:#2563eb;">3,840</td><td>30.8%</td><td>Bulk orders & family care</td><td>₹5,800</td><td style="font-weight:700;color:#059669;">₹38,200</td><td>Sibling discount pass</td></tr>',
              '<tr><td style="font-weight:600;">Senior & Chronic Pets</td><td style="font-weight:600;color:#2563eb;">2,180</td><td>17.5%</td><td>Mobility & renal maintenance</td><td>₹4,600</td><td style="font-weight:700;color:#059669;">₹28,400</td><td>Cardiac & joint reminders</td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderOrders() {
    return [
      '<div class="zc360-kpi-grid">',
        kpiHtml('Total Customer Orders', '28,420 Orders', '+24.2% YoY', 'up', 'App, clinic & web', '🛒'),
        kpiHtml('Average Order Value', '₹3,840', '+11.5% vs FY25', 'up', 'Retail & medical mix', '💰'),
        kpiHtml('60-Min Fast Delivery', '64.2%', '98.2% on-time', 'up', 'Hyperlocal delivery', '⚡'),
        kpiHtml('Omni-Basket Attach', '44.8%', 'Food + Meds + Spa', 'up', 'Multi-category basket', '📦'),
      '</div>',
      '<div class="zc360-card">',
        '<div class="zc360-card-head"><h3 class="zc360-card-title">🛒 Recent Customer Purchases & Services</h3></div>',
        '<div class="zc360-table-wrap">',
          '<table class="zc360-table">',
            '<thead><tr><th>Order ID</th><th>Pet Parent</th><th>Pet Patient</th><th>Items</th><th>Total</th><th>Channel</th><th>Fulfillment</th><th>Time</th></tr></thead>',
            '<tbody>',
              '<tr><td style="font-family:monospace;font-weight:600;">ORD-9801</td><td style="font-weight:600;">Aarav Sharma</td><td>Bruno (Golden)</td><td>Royal Canin Maxi Adult (15kg) + Chew</td><td style="font-weight:700;color:#059669;">₹8,450</td><td>App 60-Min</td><td><span class="zc360-pill active">Delivered</span></td><td>17:22</td></tr>',
              '<tr><td style="font-family:monospace;font-weight:600;">ORD-9802</td><td style="font-weight:600;">Vikram Malhotra</td><td>Leo (Shepherd)</td><td>Memory Foam Bed XL + Joint Chews</td><td style="font-weight:700;color:#059669;">₹12,200</td><td>Indiranagar</td><td><span class="zc360-pill active">In-Store</span></td><td>16:45</td></tr>',
              '<tr><td style="font-family:monospace;font-weight:600;">ORD-9803</td><td style="font-weight:600;">Priya Sundaram</td><td>Bella & Coco</td><td>Feline Renal Care + Litter 20L</td><td style="font-weight:700;color:#059669;">₹5,800</td><td>App Scheduled</td><td><span class="zc360-pill active">Dispatched</span></td><td>15:10</td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderRevenue() {
    return [
      '<div class="zc360-kpi-grid">',
        kpiHtml('Customer Revenue (MTD)', '₹1.71 Cr', '+24.8% YoY', 'up', 'All retail & clinic streams', '💰'),
        kpiHtml('Monthly User ARPU', '₹4,620', '+11.2% MoM', 'up', 'Across active transactors', '📈'),
        kpiHtml('Blended Gross Margin', '44.2%', '+2.1% vs FY25', 'up', 'High clinical margin', '💎'),
        kpiHtml('Subscription Recurring', '10.7%', 'Predictable baseline', 'up', 'Targeting 18% FY27', '🔄'),
      '</div>',
      '<div class="zc360-card">',
        '<div class="zc360-card-head"><h3 class="zc360-card-title">💰 Customer Revenue by Channel</h3></div>',
        '<div class="zc360-table-wrap">',
          '<table class="zc360-table">',
            '<thead><tr><th>Channel</th><th>MTD Revenue</th><th>Share</th><th>Avg Spend</th><th>Gross Margin</th><th>YoY Growth</th></tr></thead>',
            '<tbody>',
              '<tr><td style="font-weight:600;">Mobile App (Quick Commerce)</td><td style="font-weight:700;color:#059669;">₹78.50 Lakh</td><td style="font-weight:600;color:#2563eb;">45.8%</td><td>₹4,200</td><td>42.5%</td><td style="color:#059669;font-weight:600;">+28.4%</td></tr>',
              '<tr><td style="font-weight:600;">Physical Clinic Centers & OPD</td><td style="font-weight:700;color:#059669;">₹46.20 Lakh</td><td style="font-weight:600;color:#2563eb;">26.9%</td><td>₹5,800</td><td>48.0%</td><td style="color:#059669;font-weight:600;">+18.2%</td></tr>',
              '<tr><td style="font-weight:600;">Online Web Portal</td><td style="font-weight:700;color:#059669;">₹28.40 Lakh</td><td style="font-weight:600;color:#2563eb;">16.6%</td><td>₹3,400</td><td>38.0%</td><td style="color:#059669;font-weight:600;">+12.5%</td></tr>',
              '<tr><td style="font-weight:600;">Recurring Subscriptions</td><td style="font-weight:700;color:#059669;">₹18.42 Lakh</td><td style="font-weight:600;color:#2563eb;">10.7%</td><td>₹1,850</td><td>58.5%</td><td style="color:#059669;font-weight:600;">+42.0%</td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderRetention() {
    return [
      '<div class="zc360-kpi-grid">',
        kpiHtml('Month-1 Cohort Retention', '91.2%', '+3.4% YoY', 'up', 'Benchmark: 68%', '🛡️'),
        kpiHtml('Annual Churn Rate', '1.18%', '-0.24% vs FY25', 'up', 'Subscribers & repeat clients', '📉'),
        kpiHtml('Win-Back Success', '38.4%', 'Re-activated within 30D', 'up', 'Automated reminder triggers', '🔄'),
        kpiHtml('Net Revenue Retention', '124.6%', '+6.2% YoY', 'up', 'Expansion revenue attached', '💎'),
      '</div>',
      '<div class="zc360-card">',
        '<div class="zc360-card-head"><h3 class="zc360-card-title">🛡️ Longitudinal Cohort Retention Analysis</h3></div>',
        '<div class="zc360-table-wrap">',
          '<table class="zc360-table">',
            '<thead><tr><th>Cohort Inception</th><th>Initial Users</th><th>Month 1</th><th>Month 3</th><th>Month 6</th><th>Month 12</th><th>Status</th></tr></thead>',
            '<tbody>',
              '<tr><td style="font-weight:600;">Oct 2025</td><td style="font-weight:600;">1,050</td><td style="color:#059669;font-weight:700;">86%</td><td>79%</td><td>74%</td><td>71%</td><td><span class="zc360-pill active">Mature</span></td></tr>',
              '<tr><td style="font-weight:600;">Jan 2026</td><td style="font-weight:600;">1,180</td><td style="color:#059669;font-weight:700;">88%</td><td>82%</td><td>77%</td><td>—</td><td><span class="zc360-pill active">Above Benchmark</span></td></tr>',
              '<tr><td style="font-weight:600;">Apr 2026</td><td style="font-weight:600;">1,240</td><td style="color:#059669;font-weight:700;">89%</td><td>84%</td><td>—</td><td>—</td><td><span class="zc360-pill active">Strong Q1</span></td></tr>',
              '<tr><td style="font-weight:600;">Jul 2026</td><td style="font-weight:600;">1,390</td><td style="color:#059669;font-weight:700;">91%</td><td>—</td><td>—</td><td>—</td><td><span class="zc360-pill active">Record High</span></td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderComplaints() {
    return [
      '<div class="zc360-kpi-grid">',
        kpiHtml('Total Grievance Tickets', '18 Tickets', '-24% MoM', 'up', '0.06% of total orders', '⚠️'),
        kpiHtml('First Contact Resolution', '94.2%', '+3.1% MoM', 'up', 'Resolved in initial call', '⚡'),
        kpiHtml('Avg. Resolution Time', '14.8 mins', '-4.2 mins YoY', 'up', '24/7 dedicated support', '⏱️'),
        kpiHtml('Post-Resolution CSAT', '4.88 / 5.0', 'High delight', 'up', '98% satisfied with outcome', '⭐'),
      '</div>',
      '<div class="zc360-card">',
        '<div class="zc360-card-head"><h3 class="zc360-card-title">⚠️ Live Support & Grievance Register</h3></div>',
        '<div class="zc360-table-wrap">',
          '<table class="zc360-table">',
            '<thead><tr><th>Ticket ID</th><th>Pet Parent</th><th>Category</th><th>Issue</th><th>Agent</th><th>Turnaround</th><th>Outcome</th><th>Status</th></tr></thead>',
            '<tbody>',
              '<tr><td style="font-family:monospace;font-weight:600;">TICK-4401</td><td style="font-weight:600;">Sneha Kulkarni</td><td><span class="zc360-pill critical">Delivery Delay</span></td><td>Arrived in 78 mins (rain)</td><td>Kiran R.</td><td style="font-weight:600;">12 mins</td><td style="color:#059669;">Fee waiver + ₹200 credit</td><td><span class="zc360-pill active">Closed</span></td></tr>',
              '<tr><td style="font-family:monospace;font-weight:600;">TICK-4402</td><td style="font-weight:600;">Vikram Malhotra</td><td><span class="zc360-pill critical">Packaging</span></td><td>Tear in outer kibble bag</td><td>Aisha S.</td><td style="font-weight:600;">18 mins</td><td style="color:#059669;">Replacement dispatched</td><td><span class="zc360-pill active">Closed</span></td></tr>',
              '<tr><td style="font-family:monospace;font-weight:600;">TICK-4403</td><td style="font-weight:600;">Priya Sundaram</td><td><span class="zc360-pill warning">Billing</span></td><td>Loyalty points not credited</td><td>Kiran R.</td><td style="font-weight:600;">5 mins</td><td style="color:#059669;">840 pts credited + 100 bonus</td><td><span class="zc360-pill active">Closed</span></td></tr>',
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

      '<main class="zc360-body">'
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

    html.push('</main>');
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
