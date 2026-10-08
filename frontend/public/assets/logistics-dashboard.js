/* =====================================================================
   Zenve BI — Logistics & Delivery Executive Control Center
   Sidebar: Logistics & Delivery Suite (9 Subcategories)
   Pure Light Executive Design System
   ===================================================================== */

(function () {
  'use strict';

  var root = null;
  var S = {
    open: false,
    tab: 'overview',
    searchQuery: '',
    statusFilter: 'ALL',
    toastTimeout: null
  };

  /* ── 9 Subcategories Configuration ────────────────────────────────── */
  var MODULES = [
    { id: 'overview',               label: 'Logistics Dashboard',   icon: '⚡', hash: '#logistics-dashboard',   title: 'Rapid Logistics & Cold-Chain Dispatch Control Center', sub: 'Hyperlocal rapid dispatch, refrigerated vaccine cold-chain monitoring, and rider SLAs across 14 urban micro-hubs' },
    { id: 'delivery-orders',        label: 'Delivery Orders',        icon: '📦', hash: '#delivery-orders',        title: 'Live Delivery Orders & Manifest Stream', sub: 'Real-time parcel dispatch status, rider allocation, hyperlocal express tracking, and cold-chain temperature telemetry' },
    { id: 'delivery-partners',      label: 'Delivery Partners',      icon: '🛵', hash: '#delivery-partners',      title: 'Fleet & 3PL Logistics Delivery Partners', sub: 'Dedicated electric vehicle (EV) rider fleets, contracted hyperlocal 3PLs, bulk hub transfers, and SLA scorecards' },
    { id: 'delivery-tracking',      label: 'Delivery Tracking',      icon: '📍', hash: '#delivery-tracking',      title: 'Live GPS Fleet Telematics & Cold-Chain Tracking', sub: 'Real-time rider coordinates, IoT Bluetooth cold-box temperature telemetry, EV battery state, and route milestones' },
    { id: 'sixty-minute-delivery',  label: '60-Minute Delivery',     icon: '⏱️', hash: '#60-minute-delivery',     title: 'Hyperlocal 60-Minute Rapid Delivery SLA', sub: 'Guaranteed sub-60 minute order-to-doorstep dispatch for critical pet medications, diets, and emergency supplies' },
    { id: 'delivery-sla',           label: 'Delivery SLA',           icon: '🛡️', hash: '#delivery-sla',           title: 'Delivery Service Level Agreements (SLA) & Compliance', sub: 'Fulfillment SLA adherence, breach root causes, temperature cold-chain compliance, and first-attempt success' },
    { id: 'delivery-cost',          label: 'Delivery Cost',          icon: '💰', hash: '#delivery-cost',          title: 'Delivery Cost Economics & Per-Drop Efficiency', sub: 'Unit economics of last-mile delivery, EV vs ICE cost comparison, packaging expenses, and hub efficiency' },
    { id: 'failed-deliveries',       label: 'Failed Deliveries',      icon: '⚠️', hash: '#failed-deliveries',      title: 'Non-Delivery Reports (NDR) & Failed Delivery Analytics', sub: 'Failed first-attempt analysis, doorstep reachability, Return to Origin (RTO) prevention, and recovery velocity' },
    { id: 'delivery-performance',   label: 'Delivery Performance',   icon: '🏆', hash: '#delivery-performance',   title: 'Rider & Fleet Delivery Performance Scorecards', sub: 'Fulfillment efficiency rankings, doorstep customer satisfaction (CSAT), cold-chain compliance, and safety scorecards' }
  ];

  /* ── Master Datasets ──────────────────────────────────────────────── */
  var ORDERS = [];

  var PARTNERS = [];

  var TRACKING_STREAMS = [];

  var HUBS_60M = [];

  var SLA_DATA = [];

  var COST_DATA = [];

  var FAILED_CAUSES = [];

  var TOP_RIDERS = [];

  /* ── Helpers ──────────────────────────────────────────────────────── */
  function showToast(msg) {
    var old = document.querySelector('.zlog-toast');
    if (old) old.remove();
    var t = document.createElement('div');
    t.className = 'zlog-toast';
    t.innerHTML = '<span>⚡</span> <span>' + msg + '</span>';
    document.body.appendChild(t);
    clearTimeout(S.toastTimeout);
    S.toastTimeout = setTimeout(function () {
      if (t.parentNode) t.remove();
    }, 3200);
  }

  function closeOthers() {
    var otherRoots = ['#zmkt-dashboard-root', '#zvp-dashboard-root', '#zhr-dashboard-root', '#zod-root', '#zsd-root'];
    otherRoots.forEach(function (sel) {
      var el = document.querySelector(sel);
      if (el) {
        el.classList.remove('zpanel-open');
        el.style.display = 'none';
      }
    });
  }

  function tabFromHash(hash) {
    if (!hash) return null;
    var clean = hash.toLowerCase();
    for (var i = 0; i < MODULES.length; i++) {
      if (clean === MODULES[i].hash.toLowerCase()) {
        return MODULES[i].id;
      }
    }
    if (clean === '#logistics' || clean === '#logistics-dashboard' || clean === '#logistics-delivery' || clean === '#delivery') return 'overview';
    if (clean === '#delivery-orders' || clean === '#deliveryorders') return 'delivery-orders';
    if (clean === '#delivery-partners' || clean === '#deliverypartners') return 'delivery-partners';
    if (clean === '#delivery-tracking' || clean === '#deliverytracking') return 'delivery-tracking';
    if (clean === '#60-minute-delivery' || clean === '#60-minute' || clean === '#60min') return 'sixty-minute-delivery';
    if (clean === '#delivery-sla' || clean === '#deliverysla') return 'delivery-sla';
    if (clean === '#delivery-cost' || clean === '#deliverycost') return 'delivery-cost';
    if (clean === '#failed-deliveries' || clean === '#faileddeliveries') return 'failed-deliveries';
    if (clean === '#delivery-performance' || clean === '#deliveryperformance') return 'delivery-performance';
    return null;
  }

  function tabFromText(text) {
    if (!text) return null;
    var t = text.trim().toLowerCase();
    if (t === 'logistics dashboard' || t === 'logistics & delivery' || t === 'logistics & deliveries' || t === 'logistics' || t === 'rapid logistics & cold-chain dispatch') return 'overview';
    if (t === 'delivery orders' || t === 'orders dispatch') return 'delivery-orders';
    if (t === 'delivery partners' || t === 'fleet partners' || t === 'partners') return 'delivery-partners';
    if (t === 'delivery tracking' || t === 'telematics' || t === 'live tracking') return 'delivery-tracking';
    if (t === '60-minute delivery' || t === '60-minute rapid delivery' || t === '60 min delivery') return 'sixty-minute-delivery';
    if (t === 'delivery sla' || t === 'sla compliance' || t === 'sla') return 'delivery-sla';
    if (t === 'delivery cost' || t === 'delivery economics' || t === 'cost per drop') return 'delivery-cost';
    if (t === 'failed deliveries' || t === 'failed delivery' || t === 'ndr reports') return 'failed-deliveries';
    if (t === 'delivery performance' || t === 'rider performance' || t === 'fleet performance') return 'delivery-performance';
    return null;
  }

  /* ── Shell Renderer ───────────────────────────────────────────────── */
  function render() {
    if (!root) return;

    var curMod = MODULES.find(function (m) { return m.id === S.tab; }) || MODULES[0];

    // Build chip navigation
    var chipsHtml = MODULES.map(function (m) {
      var isActive = S.tab === m.id;
      var count = '';
      if (m.id === 'delivery-orders') count = '<span class="zlog-chip-count">' + ORDERS.length + '</span>';
      else if (m.id === 'delivery-partners') count = '<span class="zlog-chip-count">' + PARTNERS.length + '</span>';
      else if (m.id === 'sixty-minute-delivery') count = '';
      else if (m.id === 'delivery-sla') count = '';

      return [
        '<button type="button" class="zlog-chip ' + (isActive ? 'active' : '') + '" data-tab="' + m.id + '">',
        '  <span>' + m.icon + '</span>',
        '  <span>' + m.label + '</span>',
        count,
        '</button>'
      ].join('');
    }).join('');

    root.innerHTML = [
      '<header class="zlog-header">',
      '  <div class="zlog-header-left">',
      '    <div class="zlog-brand-badge">⚡</div>',
      '    <div class="zlog-title-group">',
      '      <div class="zlog-title-row">',
      '        <h1 class="zlog-main-title">' + curMod.title + '</h1>',
      '        <div class="zlog-status-badge"><span class="zlog-status-dot"></span> Cold Chain & Fleet Live</div>',
      '      </div>',
      '      <div class="zlog-subtitle">' + curMod.sub + '</div>',
      '    </div>',
      '  </div>',
      '  <div class="zlog-header-right">',
      '    <button type="button" class="zlog-btn zlog-btn-secondary" id="zlog-export-btn">📊 Export CSV</button>',
      '    <button type="button" class="zlog-btn zlog-btn-secondary" id="zlog-track-btn">📍 Live Telematics</button>',
      '    <button type="button" class="zlog-btn zlog-btn-primary" id="zlog-dispatch-btn">+ Fast Dispatch</button>',
      '  </div>',
      '</header>',
      '<nav class="zlog-nav-bar">' + chipsHtml + '</nav>',
      '<div class="zlog-content" id="zlog-body-content"></div>'
    ].join('');

    wireHeaderEvents();
    renderTabContent();
  }

  function wireHeaderEvents() {
    // Subcategory chip clicks
    var chips = root.querySelectorAll('.zlog-chip');
    chips.forEach(function (c) {
      c.onclick = function () {
        var t = c.getAttribute('data-tab');
        switchTab(t);
      };
    });

    // Close button
    var closeBtn = root.querySelector('#zlog-close-btn');
    if (closeBtn) {
      closeBtn.onclick = function () { close(); };
    }

    // Fast dispatch modal
    var dispatchBtn = root.querySelector('#zlog-dispatch-btn');
    if (dispatchBtn) {
      dispatchBtn.onclick = function () { showDispatchModal(); };
    }

    // Telematics modal
    var trackBtn = root.querySelector('#zlog-track-btn');
    if (trackBtn) {
      trackBtn.onclick = function () { showTelematicsModal(); };
    }

    // Export CSV
    var expBtn = root.querySelector('#zlog-export-btn');
    if (expBtn) {
      expBtn.onclick = function () { exportTabCSV(); };
    }
  }

  /* ── Tab Content Renderer ─────────────────────────────────────────── */
  function renderTabContent() {
    var c = root.querySelector('#zlog-body-content');
    if (!c) return;

    if (S.tab === 'overview') c.innerHTML = renderOverview();
    else if (S.tab === 'delivery-orders') c.innerHTML = renderDeliveryOrders();
    else if (S.tab === 'delivery-partners') c.innerHTML = renderDeliveryPartners();
    else if (S.tab === 'delivery-tracking') c.innerHTML = renderDeliveryTracking();
    else if (S.tab === 'sixty-minute-delivery') c.innerHTML = renderSixtyMinuteDelivery();
    else if (S.tab === 'delivery-sla') c.innerHTML = renderDeliverySLA();
    else if (S.tab === 'delivery-cost') c.innerHTML = renderDeliveryCost();
    else if (S.tab === 'failed-deliveries') c.innerHTML = renderFailedDeliveries();
    else if (S.tab === 'delivery-performance') c.innerHTML = renderDeliveryPerformance();

    wireTabSpecificEvents();
  }

  /* ── Individual Subcategory Views ─────────────────────────────────── */
  function renderOverview() {
    return [
      '<div class="zlog-kpi-grid">',
      '  <div class="zlog-kpi">',
      '    <div class="zlog-kpi-top"><span class="zlog-kpi-label">Active Hyperlocal Fleet</span><span class="zlog-kpi-icon">🛵</span></div>',
      '    <div class="zlog-kpi-val">0 EV Riders</div>',
      '    <div class="zlog-kpi-bottom"><span class="zlog-delta neutral">• 0% Active</span><span class="zlog-subtext">0 riders on road</span></div>',
      '  </div>',
      '  <div class="zlog-kpi">',
      '    <div class="zlog-kpi-top"><span class="zlog-kpi-label">Avg Fulfillment Speed</span><span class="zlog-kpi-icon">⚡</span></div>',
      '    <div class="zlog-kpi-val">-- mins</div>',
      '    <div class="zlog-kpi-bottom"><span class="zlog-delta neutral">• Target &lt; 60m</span><span class="zlog-subtext">No delivery records</span></div>',
      '  </div>',
      '  <div class="zlog-kpi">',
      '    <div class="zlog-kpi-top"><span class="zlog-kpi-label">Cold-Chain Integrity</span><span class="zlog-kpi-icon">❄️</span></div>',
      '    <div class="zlog-kpi-val">0.0%</div>',
      '    <div class="zlog-kpi-bottom"><span class="zlog-delta neutral">• Constant 2-8°C</span><span class="zlog-subtext">0 refrigerated drops</span></div>',
      '  </div>',
      '  <div class="zlog-kpi">',
      '    <div class="zlog-kpi-top"><span class="zlog-kpi-label">Delivery Failure Rate</span><span class="zlog-kpi-icon">🎯</span></div>',
      '    <div class="zlog-kpi-val">0.0%</div>',
      '    <div class="zlog-kpi-bottom"><span class="zlog-delta neutral">• Benchmark 0.0%</span><span class="zlog-subtext">0 failed attempts</span></div>',
      '  </div>',
      '</div>',

      '<div class="zlog-grid-2">',
      '  <div class="zlog-card">',
      '    <div class="zlog-card-head">',
      '      <div>',
      '        <h3 class="zlog-card-title">🗺️ Live Fleet Dispatch Streams</h3>',
      '        <p class="zlog-card-sub">Urban micro-hub delivery cluster velocity across metro areas</p>',
      '      </div>',
      '      <button class="zlog-btn zlog-btn-secondary" onclick="ZenveLogisticsDashboard.switchTab(\'delivery-tracking\')">Open Full Map</button>',
      '    </div>',
      '    <div style="height:210px;background:linear-gradient(135deg, #0f172a, #1e293b);border-radius:10px;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#38bdf8;text-align:center;padding:16px;">',
      '      <div style="font-size:36px;margin-bottom:8px;">🗺️</div>',
      '      <div style="font-size:13px;font-weight:700;color:#f8fafc;">Bengaluru Central (28m avg) • South Mumbai (34m avg) • Delhi-NCR (39m avg)</div>',
      '      <div style="font-size:11px;color:#94a3b8;margin-top:6px;">62 active EV riders communicating live telemetry via Bluetooth Cold-Box IoT sensors</div>',
      '    </div>',
      '  </div>',

      '  <div class="zlog-card">',
      '    <div class="zlog-card-head">',
      '      <div>',
      '        <h3 class="zlog-card-title">⚡ Quick Logistics Subcategories</h3>',
      '        <p class="zlog-card-sub">Access dedicated dashboards across the delivery lifecycle</p>',
      '      </div>',
      '    </div>',
      '    <div style="padding:16px 20px;display:grid;grid-template-columns:1fr 1fr;gap:10px;">',
      MODULES.slice(1).map(function (m) {
        return [
          '<button type="button" class="zlog-chip" style="justify-content:flex-start;padding:10px 12px;" onclick="ZenveLogisticsDashboard.switchTab(\'' + m.id + '\')">',
          '  <span style="font-size:16px;">' + m.icon + '</span>',
          '  <div style="text-align:left;">',
          '    <div style="font-weight:700;font-size:12px;color:#0f172a;">' + m.label + '</div>',
          '    <div style="font-size:10px;color:#64748b;">Direct Subcategory View</div>',
          '  </div>',
          '</button>'
        ].join('');
      }).join(''),
      '    </div>',
      '  </div>',
      '</div>',

      '<div class="zlog-card">',
      '  <div class="zlog-card-head">',
      '    <div>',
      '      <h3 class="zlog-card-title">📦 Recent High-Priority Dispatches</h3>',
      '      <p class="zlog-card-sub">Active medical prescriptions and express deliveries in-flight</p>',
      '    </div>',
      '    <button class="zlog-btn zlog-btn-secondary" onclick="ZenveLogisticsDashboard.switchTab(\'delivery-orders\')">View All Manifests</button>',
      '  </div>',
      '  <div class="zlog-table-wrap">',
      '    <table class="zlog-table">',
      '      <thead><tr><th>Order ID</th><th>Customer & Pet</th><th>Hub</th><th>Rider</th><th>Items</th><th>Cold Chain</th><th>Status</th></tr></thead>',
      '      <tbody>',
      ORDERS.slice(0, 5).map(function (o) {
        return [
          '<tr>',
          '  <td style="font-weight:700;font-family:monospace;color:#0f172a;">' + o.id + '</td>',
          '  <td><strong>' + o.customer + '</strong><br><span style="color:#64748b;font-size:11px;">' + o.pet + '</span></td>',
          '  <td>' + o.hub + '</td>',
          '  <td style="color:#0284c7;font-weight:600;">' + o.rider + '</td>',
          '  <td style="max-width:200px;color:#475569;">' + o.items + '</td>',
          '  <td>' + (o.temp !== 'Ambient' ? '<span class="zlog-tag cyan">❄️ ' + o.temp + '</span>' : '<span style="color:#94a3b8;">Ambient</span>') + '</td>',
          '  <td><span class="zlog-tag ' + (o.status === 'Delivered' ? 'green' : o.status === 'Failed Attempt' ? 'red' : 'yellow') + '">' + o.status + ' (' + o.eta + ')</span></td>',
          '</tr>'
        ].join('');
      }).join(''),
      '      </tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderDeliveryOrders() {
    var filtered = ORDERS.filter(function (o) {
      var matchF = S.statusFilter === 'ALL' || o.status === S.statusFilter;
      var matchQ = !S.searchQuery ||
        o.id.toLowerCase().indexOf(S.searchQuery.toLowerCase()) >= 0 ||
        o.customer.toLowerCase().indexOf(S.searchQuery.toLowerCase()) >= 0 ||
        o.hub.toLowerCase().indexOf(S.searchQuery.toLowerCase()) >= 0 ||
        o.rider.toLowerCase().indexOf(S.searchQuery.toLowerCase()) >= 0;
      return matchF && matchQ;
    });

    return [
      '<div class="zlog-kpi-grid">',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Dispatched Today</span><span class="zlog-kpi-icon">📦</span></div><div class="zlog-kpi-val">0 Orders</div><div class="zlog-kpi-bottom"><span class="zlog-delta neutral">• 0%</span><span class="zlog-subtext">Across 0 micro-hubs</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Active In-Transit</span><span class="zlog-kpi-icon">🛵</span></div><div class="zlog-kpi-val">0 Parcels</div><div class="zlog-kpi-bottom"><span class="zlog-delta neutral">• Live Now</span><span class="zlog-subtext">Avg speed 0.0 km/h</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">60-Min Express Tier</span><span class="zlog-kpi-icon">⚡</span></div><div class="zlog-kpi-val">0 Orders</div><div class="zlog-kpi-bottom"><span class="zlog-delta neutral">• 0% mix</span><span class="zlog-subtext">No express orders</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Doorstep OTP Rate</span><span class="zlog-kpi-icon">🎯</span></div><div class="zlog-kpi-val">0.0%</div><div class="zlog-kpi-bottom"><span class="zlog-delta neutral">• 0.0%</span><span class="zlog-subtext">No handoffs</span></div></div>',
      '</div>',

      '<div class="zlog-card">',
      '  <div class="zlog-card-head">',
      '    <div>',
      '      <h3 class="zlog-card-title">Delivery Orders Manifest & Dispatch Console</h3>',
      '      <p class="zlog-card-sub">Real-time status of orders handled by Zenve EV Fleet and partner delivery networks</p>',
      '    </div>',
      '    <div style="display:flex;gap:10px;align-items:center;">',
      '      <input type="text" class="zlog-input" id="zlog-order-search" placeholder="Search order, pet parent, rider, hub..." value="' + S.searchQuery + '" style="min-width:240px;"/>',
      '      <select class="zlog-select" id="zlog-order-status" style="min-width:140px;">',
      '        <option value="ALL"' + (S.statusFilter === 'ALL' ? ' selected' : '') + '>All Statuses</option>',
      '        <option value="In Transit"' + (S.statusFilter === 'In Transit' ? ' selected' : '') + '>In Transit</option>',
      '        <option value="Out for Delivery"' + (S.statusFilter === 'Out for Delivery' ? ' selected' : '') + '>Out for Delivery</option>',
      '        <option value="Dispatched"' + (S.statusFilter === 'Dispatched' ? ' selected' : '') + '>Dispatched</option>',
      '        <option value="Delivered"' + (S.statusFilter === 'Delivered' ? ' selected' : '') + '>Delivered</option>',
      '        <option value="Failed Attempt"' + (S.statusFilter === 'Failed Attempt' ? ' selected' : '') + '>Failed Attempt</option>',
      '      </select>',
      '    </div>',
      '  </div>',
      '  <div class="zlog-table-wrap">',
      '    <table class="zlog-table">',
      '      <thead><tr><th>Order ID</th><th>Customer & Companion</th><th>Origin Hub</th><th>Rider</th><th>Items</th><th>Tier</th><th>Cold Chain</th><th>Status / ETA</th></tr></thead>',
      '      <tbody>',
      filtered.map(function (o) {
        return [
          '<tr>',
          '  <td style="font-weight:700;font-family:monospace;color:#0f172a;">' + o.id + '</td>',
          '  <td><strong>' + o.customer + '</strong><div style="font-size:11px;color:#64748b;">' + o.pet + '</div></td>',
          '  <td>' + o.hub + '</td>',
          '  <td style="color:#0284c7;font-weight:600;">' + o.rider + '</td>',
          '  <td style="color:#475569;max-width:210px;">' + o.items + '</td>',
          '  <td><span class="zlog-tag ' + (o.type.indexOf('60-Min') >= 0 ? 'blue' : 'yellow') + '">' + o.type + '</span></td>',
          '  <td>' + (o.temp !== 'Ambient' ? '<span class="zlog-tag cyan">❄️ ' + o.temp + '</span>' : '<span style="color:#94a3b8;">Ambient</span>') + '</td>',
          '  <td><span class="zlog-tag ' + (o.status === 'Delivered' ? 'green' : o.status === 'Failed Attempt' ? 'red' : 'yellow') + '">' + o.status + ' (' + o.eta + ')</span></td>',
          '</tr>'
        ].join('');
      }).join(''),
      '      </tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderDeliveryPartners() {
    return [
      '<div class="zlog-kpi-grid">',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Dedicated Fleet</span><span class="zlog-kpi-icon">⚡</span></div><div class="zlog-kpi-val">0 EV Riders</div><div class="zlog-kpi-bottom"><span class="zlog-delta neutral">• 0%</span><span class="zlog-subtext">0 carbon emissions</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Active On Road</span><span class="zlog-kpi-icon">🛵</span></div><div class="zlog-kpi-val">0 Riders</div><div class="zlog-kpi-bottom"><span class="zlog-delta neutral">• 0 Capacity</span><span class="zlog-subtext">No active riders</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Blended On-Time SLA</span><span class="zlog-kpi-icon">⏱️</span></div><div class="zlog-kpi-val">0.0%</div><div class="zlog-kpi-bottom"><span class="zlog-delta neutral">• 0.0%</span><span class="zlog-subtext">No delivery data</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Avg Fleet Rating</span><span class="zlog-kpi-icon">⭐</span></div><div class="zlog-kpi-val">0.0 / 5</div><div class="zlog-kpi-bottom"><span class="zlog-delta neutral">• --</span><span class="zlog-subtext">No ratings recorded</span></div></div>',
      '</div>',

      '<div class="zlog-card">',
      '  <div class="zlog-card-head">',
      '    <div>',
      '      <h3 class="zlog-card-title">Delivery Partners & Fleet Roster</h3>',
      '      <p class="zlog-card-sub">Fleet model, rider volume, on-time SLA metrics, and cold-chain compliance</p>',
      '    </div>',
      '  </div>',
      '  <div class="zlog-table-wrap">',
      '    <table class="zlog-table">',
      '      <thead><tr><th>Partner Name</th><th>Fleet Model</th><th>Fleet Size</th><th>Active Now</th><th>On-Time SLA</th><th>Drop Cost</th><th>Cold-Chain Ready</th><th>CSAT Rating</th><th>Status</th></tr></thead>',
      '      <tbody>',
      PARTNERS.map(function (p) {
        return [
          '<tr>',
          '  <td style="font-weight:700;color:#0f172a;">' + p.name + '</td>',
          '  <td style="color:#64748b;">' + p.type + '</td>',
          '  <td style="font-weight:600;">' + p.fleetSize + '</td>',
          '  <td style="color:#16a34a;font-weight:700;font-family:monospace;">' + p.activeNow + ' on road</td>',
          '  <td style="color:#2563eb;font-weight:700;font-family:monospace;">' + p.onTimeSla + '</td>',
          '  <td style="font-family:monospace;color:#475569;">' + p.avgCost + '</td>',
          '  <td><span class="zlog-tag ' + (p.coldChainReady.indexOf('Yes') >= 0 ? 'cyan' : 'yellow') + '">' + p.coldChainReady + '</span></td>',
          '  <td style="color:#d97706;font-weight:700;">' + p.rating + '</td>',
          '  <td><span class="zlog-tag ' + (p.status === 'Primary' ? 'green' : 'blue') + '">' + p.status + '</span></td>',
          '</tr>'
        ].join('');
      }).join(''),
      '      </tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderDeliveryTracking() {
    return [
      '<div class="zlog-kpi-grid">',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Live Tracked Riders</span><span class="zlog-kpi-icon">📡</span></div><div class="zlog-kpi-val">0 Active</div><div class="zlog-kpi-bottom"><span class="zlog-delta neutral">• 0%</span><span class="zlog-subtext">No active telemetry</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Refrigerated Parcels</span><span class="zlog-kpi-icon">❄️</span></div><div class="zlog-kpi-val">0 Boxes</div><div class="zlog-kpi-bottom"><span class="zlog-delta neutral">• --</span><span class="zlog-subtext">No refrigerated drops</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Average Speed</span><span class="zlog-kpi-icon">⚡</span></div><div class="zlog-kpi-val">0.0 km/h</div><div class="zlog-kpi-bottom"><span class="zlog-delta neutral">• --</span><span class="zlog-subtext">No telemetry data</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Fleet Battery Health</span><span class="zlog-kpi-icon">🔋</span></div><div class="zlog-kpi-val">0% Avg</div><div class="zlog-kpi-bottom"><span class="zlog-delta neutral">• --</span><span class="zlog-subtext">No vehicles active</span></div></div>',
      '</div>',

      '<div class="zlog-grid-2">',
      '  <div class="zlog-card">',
      '    <div class="zlog-card-head">',
      '      <div>',
      '        <h3 class="zlog-card-title">🗺️ Real-Time Fleet GPS Geofence</h3>',
      '        <p class="zlog-card-sub">Active EV rider positions and delivery route telemetry</p>',
      '      </div>',
      '    </div>',
      '    <div style="height:240px;background:linear-gradient(135deg, #0f172a, #1e293b);border-radius:10px;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#38bdf8;position:relative;">',
      '      <div style="font-size:38px;margin-bottom:8px;">📍</div>',
      '      <div style="font-size:14px;font-weight:700;color:#f8fafc;">Live Urban Telematics Radar</div>',
      '      <div style="font-size:11px;color:#94a3b8;margin-top:4px;">0 active couriers pinging GPS</div>',
      '      <div style="position:absolute;bottom:12px;left:12px;background:rgba(15,23,42,0.85);padding:4px 10px;border-radius:6px;border:1px solid #334155;font-size:11px;color:#94a3b8;">● WebSocket Telemetry: Idle</div>',
      '    </div>',
      '  </div>',

      '  <div class="zlog-card">',
      '    <div class="zlog-card-head">',
      '      <div>',
      '        <h3 class="zlog-card-title">Live Rider Telematics Stream</h3>',
      '        <p class="zlog-card-sub">Current GPS waypoint, cold-box temp & destination ETA</p>',
      '      </div>',
      '    </div>',
      '    <div class="zlog-table-wrap">',
      '      <table class="zlog-table">',
      '        <thead><tr><th>Rider</th><th>Location</th><th>Cold Box</th><th>Battery</th><th>ETA</th></tr></thead>',
      '        <tbody>',
      TRACKING_STREAMS.map(function (s) {
        return [
          '<tr>',
          '  <td style="font-weight:700;color:#0f172a;">' + s.rider + '</td>',
          '  <td style="color:#475569;">' + s.location + '</td>',
          '  <td>' + (s.temp !== 'Ambient' ? '<span class="zlog-tag cyan">❄️ ' + s.temp + '</span>' : '<span style="color:#94a3b8;">Ambient</span>') + '</td>',
          '  <td style="color:#16a34a;font-weight:600;">' + s.battery + '</td>',
          '  <td style="color:#2563eb;font-weight:700;">' + s.eta + '</td>',
          '</tr>'
        ].join('');
      }).join(''),
      '        </tbody>',
      '      </table>',
      '    </div>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderSixtyMinuteDelivery() {
    return [
      '<div class="zlog-kpi-grid">',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Avg Doorstep Speed</span><span class="zlog-kpi-icon">⏱️</span></div><div class="zlog-kpi-val">--</div><div class="zlog-kpi-bottom"><span class="zlog-delta neutral">--</span><span class="zlog-subtext">No delivery records</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Rapid SLA Compliance</span><span class="zlog-kpi-icon">⚡</span></div><div class="zlog-kpi-val">0.0%</div><div class="zlog-kpi-bottom"><span class="zlog-delta neutral">--</span><span class="zlog-subtext">No records</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Pick & Pack Velocity</span><span class="zlog-kpi-icon">📦</span></div><div class="zlog-kpi-val">--</div><div class="zlog-kpi-bottom"><span class="zlog-delta neutral">--</span><span class="zlog-subtext">No packing data</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">60-Min Volume</span><span class="zlog-kpi-icon">🚀</span></div><div class="zlog-kpi-val">0 Orders</div><div class="zlog-kpi-bottom"><span class="zlog-delta neutral">--</span><span class="zlog-subtext">No express orders</span></div></div>',
      '</div>',

      '<div class="zlog-card">',
      '  <div class="zlog-card-head">',
      '    <div>',
      '      <h3 class="zlog-card-title">Micro-Hub 60-Minute Performance Benchmark</h3>',
      '      <p class="zlog-card-sub">Fulfillment speed, dispatch velocity, and breach prevention across urban dark stores</p>',
      '    </div>',
      '  </div>',
      '  <div class="zlog-table-wrap">',
      '    <table class="zlog-table">',
      '      <thead><tr><th>Hub Location</th><th>City</th><th>60M Orders</th><th>Avg Doorstep Time</th><th>Pack Time</th><th>Breaches</th><th>SLA Compliance</th><th>Active EV Pool</th></tr></thead>',
      '      <tbody>',
      '  <tr><td colspan=\"8\" style=\"text-align:center;padding:24px;color:#64748b;\">No micro-hub records found</td></tr>',
      '      </tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderDeliverySLA() {
    return [
      '<div class="zlog-kpi-grid">',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Overall SLA Rate</span><span class="zlog-kpi-icon">🛡️</span></div><div class="zlog-kpi-val">0.0%</div><div class="zlog-kpi-bottom"><span class="zlog-delta neutral">--</span><span class="zlog-subtext">No delivery records</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Cold-Chain SLA</span><span class="zlog-kpi-icon">❄️</span></div><div class="zlog-kpi-val">0.0%</div><div class="zlog-kpi-bottom"><span class="zlog-delta neutral">--</span><span class="zlog-subtext">No temperature records</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">First Attempt SLA</span><span class="zlog-kpi-icon">🎯</span></div><div class="zlog-kpi-val">0.0%</div><div class="zlog-kpi-bottom"><span class="zlog-delta neutral">--</span><span class="zlog-subtext">No attempt data</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Total Breaches (MTD)</span><span class="zlog-kpi-icon">📉</span></div><div class="zlog-kpi-val">0 Breaches</div><div class="zlog-kpi-bottom"><span class="zlog-delta neutral">--</span><span class="zlog-subtext">0 total orders</span></div></div>',
      '</div>',

      '<div class="zlog-card">',
      '  <div class="zlog-card-head">',
      '    <div>',
      '      <h3 class="zlog-card-title">Delivery Tier SLA Adherence Matrix</h3>',
      '      <p class="zlog-card-sub">Contractual targets, actual speed metrics, breach counts, and performance status</p>',
      '    </div>',
      '  </div>',
      '  <div class="zlog-table-wrap">',
      '    <table class="zlog-table">',
      '      <thead><tr><th>Delivery Tier</th><th>SLA Target</th><th>Actual Speed</th><th>Monthly Volume</th><th>Total Breaches</th><th>SLA Compliance</th><th>Status</th></tr></thead>',
      '      <tbody>',
      SLA_DATA.map(function (s) {
        return [
          '<tr>',
          '  <td style="font-weight:700;color:#0f172a;">' + s.tier + '</td>',
          '  <td style="color:#64748b;">' + s.target + '</td>',
          '  <td style="color:#2563eb;font-weight:700;font-family:monospace;">' + s.actual + '</td>',
          '  <td style="font-weight:600;font-family:monospace;">' + s.volume + '</td>',
          '  <td style="color:' + (s.breaches > 20 ? '#dc2626' : '#475569') + ';font-weight:600;">' + s.breaches + '</td>',
          '  <td style="color:#16a34a;font-weight:700;font-family:monospace;">' + s.compliance + '</td>',
          '  <td><span class="zlog-tag ' + (s.status === 'World Class' ? 'blue' : 'green') + '">' + s.status + '</span></td>',
          '</tr>'
        ].join('');
      }).join(''),
      '      </tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderDeliveryCost() {
    return [
      '<div class="zlog-kpi-grid">',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Blended Cost / Drop</span><span class="zlog-kpi-icon">💰</span></div><div class="zlog-kpi-val">₹0.00</div><div class="zlog-kpi-bottom"><span class="zlog-delta neutral">--</span><span class="zlog-subtext">No cost records</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Internal EV Fleet Cost</span><span class="zlog-kpi-icon">⚡</span></div><div class="zlog-kpi-val">₹0.00</div><div class="zlog-kpi-bottom"><span class="zlog-delta neutral">--</span><span class="zlog-subtext">No fleet records</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">3PL Partner Cost</span><span class="zlog-kpi-icon">🛵</span></div><div class="zlog-kpi-val">₹0.00</div><div class="zlog-kpi-bottom"><span class="zlog-delta neutral">--</span><span class="zlog-subtext">No 3PL records</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Monthly Fleet Spend</span><span class="zlog-kpi-icon">📉</span></div><div class="zlog-kpi-val">₹0.00</div><div class="zlog-kpi-bottom"><span class="zlog-delta neutral">--</span><span class="zlog-subtext">0 deliveries</span></div></div>',
      '</div>',

      '<div class="zlog-card">',
      '  <div class="zlog-card-head">',
      '    <div>',
      '      <h3 class="zlog-card-title">Delivery Cost Component Breakdown</h3>',
      '      <p class="zlog-card-sub">Per-drop line item analysis: Internal EV Fleet vs Partner 3PL comparison</p>',
      '    </div>',
      '  </div>',
      '  <div class="zlog-table-wrap">',
      '    <table class="zlog-table">',
      '      <thead><tr><th>Cost Component</th><th>Internal EV Fleet</th><th>Partner 3PL</th><th>Variance (EV Advantage)</th><th>Share of Cost</th></tr></thead>',
      '      <tbody>',
      '  <tr><td colspan=\"5\" style=\"text-align:center;padding:24px;color:#64748b;\">No delivery cost records found</td></tr>',
      '      </tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderFailedDeliveries() {
    return [
      '<div class="zlog-kpi-grid">',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Failed Attempt Rate</span><span class="zlog-kpi-icon">🎯</span></div><div class="zlog-kpi-val">0.0%</div><div class="zlog-kpi-bottom"><span class="zlog-delta neutral">--</span><span class="zlog-subtext">No attempt data</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">NDR Recovery Rate</span><span class="zlog-kpi-icon">🔄</span></div><div class="zlog-kpi-val">0.0%</div><div class="zlog-kpi-bottom"><span class="zlog-delta neutral">--</span><span class="zlog-subtext">No recovery records</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Return to Origin (RTO)</span><span class="zlog-kpi-icon">📦</span></div><div class="zlog-kpi-val">0.0%</div><div class="zlog-kpi-bottom"><span class="zlog-delta neutral">--</span><span class="zlog-subtext">0 orders</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Avg Re-attempt Speed</span><span class="zlog-kpi-icon">⚡</span></div><div class="zlog-kpi-val">--</div><div class="zlog-kpi-bottom"><span class="zlog-delta neutral">--</span><span class="zlog-subtext">No re-attempts</span></div></div>',
      '</div>',

      '<div class="zlog-card">',
      '  <div class="zlog-card-head">',
      '    <div>',
      '      <h3 class="zlog-card-title">Failed Delivery Root Cause Diagnostics</h3>',
      '      <p class="zlog-card-sub">Exception classification and automated SOP recovery workflows</p>',
      '    </div>',
      '  </div>',
      '  <div class="zlog-table-wrap">',
      '    <table class="zlog-table">',
      '      <thead><tr><th>Failure Root Cause</th><th>Incidents</th><th>% of Failures</th><th>Automated SOP & Resolution</th><th>RTO Impact</th></tr></thead>',
      '      <tbody>',
      '  <tr><td colspan=\"5\" style=\"text-align:center;padding:24px;color:#64748b;\">No failed delivery records found</td></tr>',
      '      </tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderDeliveryPerformance() {
    return [
      '<div class="zlog-kpi-grid">',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Network CSAT Score</span><span class="zlog-kpi-icon">⭐</span></div><div class="zlog-kpi-val">0.0 / 5</div><div class="zlog-kpi-bottom"><span class="zlog-delta neutral">--</span><span class="zlog-subtext">No ratings recorded</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">On-Time Delivery Rate</span><span class="zlog-kpi-icon">⏱️</span></div><div class="zlog-kpi-val">0.0%</div><div class="zlog-kpi-bottom"><span class="zlog-delta neutral">--</span><span class="zlog-subtext">Across 0 EV riders</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Avg Fleet Velocity</span><span class="zlog-kpi-icon">⚡</span></div><div class="zlog-kpi-val">0.0 km/h</div><div class="zlog-kpi-bottom"><span class="zlog-delta neutral">--</span><span class="zlog-subtext">No telemetry data</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Cold-Chain Audit Pass</span><span class="zlog-kpi-icon">❄️</span></div><div class="zlog-kpi-val">0.0%</div><div class="zlog-kpi-bottom"><span class="zlog-delta neutral">--</span><span class="zlog-subtext">0 vaccine drops</span></div></div>',
      '</div>',

      '<div class="zlog-card">',
      '  <div class="zlog-card-head">',
      '    <div>',
      '      <h3 class="zlog-card-title">Top Rider Leaderboard & Performance Scorecards</h3>',
      '      <p class="zlog-card-sub">Rankings based on on-time delivery rates, pet parent feedback, and cold-chain compliance</p>',
      '    </div>',
      '  </div>',
      '  <div class="zlog-table-wrap">',
      '    <table class="zlog-table">',
      '      <thead><tr><th>Rank</th><th>Rider Name</th><th>EV Unit</th><th>Base Hub</th><th>Deliveries (MTD)</th><th>On-Time %</th><th>Avg Speed</th><th>Doorstep CSAT</th><th>Achievement Badge</th></tr></thead>',
      '      <tbody>',
      '  <tr><td colspan=\"9\" style=\"text-align:center;padding:24px;color:#64748b;\">No rider performance records found</td></tr>',
      '      </tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function wireTabSpecificEvents() {
    // Delivery orders search
    var ordSearch = root.querySelector('#zlog-order-search');
    if (ordSearch) {
      ordSearch.oninput = function () {
        S.searchQuery = ordSearch.value;
        renderTabContent();
        var newInp = root.querySelector('#zlog-order-search');
        if (newInp) {
          newInp.focus();
          newInp.setSelectionRange(newInp.value.length, newInp.value.length);
        }
      };
    }

    // Delivery orders status filter
    var ordStatus = root.querySelector('#zlog-order-status');
    if (ordStatus) {
      ordStatus.onchange = function () {
        S.statusFilter = ordStatus.value;
        renderTabContent();
      };
    }
  }

  /* ── Modals & Actions ─────────────────────────────────────────────── */
  function showDispatchModal() {
    var modal = document.createElement('div');
    modal.className = 'zlog-modal-backdrop';
    modal.innerHTML = [
      '<div class="zlog-modal-box">',
      '  <div class="zlog-modal-head">',
      '    <h3>⚡ Fast Dispatch Emergency Delivery</h3>',
      '    <button type="button" class="zlog-btn-close" id="m-close">✕</button>',
      '  </div>',
      '  <div class="zlog-modal-body">',
      '    <div class="zlog-form-group"><label class="zlog-label">Pet Parent Name & Phone</label><input class="zlog-input" id="m-cname" placeholder="e.g. Shalini Roy (98765-43210)" required></div>',
      '    <div class="zlog-form-group"><label class="zlog-label">Pet Companion (Breed & Urgency)</label><input class="zlog-input" id="m-pet" placeholder="e.g. Beagle (Post-Op Urgent Pain Relief)" required></div>',
      '    <div class="zlog-form-group"><label class="zlog-label">Origin Micro-Hub</label><select class="zlog-select" id="m-hub"><option value="Koramangala Hub (BLR)">Koramangala Hub (BLR)</option><option value="Indiranagar Hub (BLR)">Indiranagar Hub (BLR)</option><option value="Whitefield Hub (BLR)">Whitefield Hub (BLR)</option><option value="Bandra West Hub (BOM)">Bandra West Hub (BOM)</option><option value="Gurugram Hub (DEL)">Gurugram Hub (DEL)</option></select></div>',
      '    <div class="zlog-form-group"><label class="zlog-label">Delivery SLA Tier</label><select class="zlog-select" id="m-tier"><option value="60-Min Express">60-Min Express Guaranteed</option><option value="Scheduled Slot">Scheduled Same-Day Slot</option><option value="Emergency Vet Telehealth">Emergency Vet Telehealth (30m)</option></select></div>',
      '    <div class="zlog-form-group"><label class="zlog-label">Cold-Chain Temperature Requirement</label><select class="zlog-select" id="m-cold"><option value="Ambient">Standard Ambient (Food/Care)</option><option value="3.5°C">Refrigerated Vaccine (2°C - 8°C IoT Box)</option></select></div>',
      '  </div>',
      '  <div class="zlog-modal-foot">',
      '    <button type="button" class="zlog-btn zlog-btn-secondary" id="m-cancel">Cancel</button>',
      '    <button type="button" class="zlog-btn zlog-btn-primary" id="m-save">Dispatch Rider</button>',
      '  </div>',
      '</div>'
    ].join('');
    document.body.appendChild(modal);

    function closeM() { modal.remove(); }
    modal.querySelector('#m-close').onclick = closeM;
    modal.querySelector('#m-cancel').onclick = closeM;
    modal.querySelector('#m-save').onclick = function () {
      var cname = document.getElementById('m-cname').value;
      var pet = document.getElementById('m-pet').value;
      var hub = document.getElementById('m-hub').value;
      var tier = document.getElementById('m-tier').value;
      var cold = document.getElementById('m-cold').value;
      if (!cname || !pet) { alert('Please enter pet parent and pet companion details.'); return; }

      ORDERS.unshift({
        id: 'ORD-DL-' + (9820 + ORDERS.length + 1),
        customer: cname,
        pet: pet,
        hub: hub,
        rider: 'Kiran Kumar (EV-44)',
        items: 'Emergency Rx Medicine Package',
        time: 'Just now',
        eta: '25 mins',
        type: tier,
        temp: cold,
        status: 'In Transit'
      });

      showToast('Fast Dispatch initiated for ' + cname + '! Rider assigned.');
      closeM();
      S.tab = 'delivery-orders';
      render();
    };
  }

  function showTelematicsModal() {
    var modal = document.createElement('div');
    modal.className = 'zlog-modal-backdrop';
    modal.innerHTML = [
      '<div class="zlog-modal-box" style="max-width:540px;">',
      '  <div class="zlog-modal-head">',
      '    <h3>📍 Fleet Telematics & Cold-Chain Radar</h3>',
      '    <button type="button" class="zlog-btn-close" id="m-close">✕</button>',
      '  </div>',
      '  <div class="zlog-modal-body">',
      '    <div style="background:#0f172a;color:#38bdf8;padding:16px;border-radius:10px;font-family:monospace;font-size:12px;margin-bottom:14px;">',
      '      <div>[SYSTEM] IoT Telematics Gateway: READY</div>',
      '      <div>[GPS] 0 Active EV 2-Wheelers transmitting coordinates</div>',
      '      <div>[SENSORS] 0 Bluetooth Cold Boxes reporting safe telemetry</div>',
      '      <div>[PING] WebSocket latency: --</div>',
      '    </div>',
      '    <p style="font-size:12px;color:#64748b;margin:0 0 10px;">Urban dispatch clusters currently idle with zero active deliveries in-flight.</p>',
      '  </div>',
      '  <div class="zlog-modal-foot">',
      '    <button type="button" class="zlog-btn zlog-btn-primary" id="m-close2">Dismiss Radar</button>',
      '  </div>',
      '</div>'
    ].join('');
    document.body.appendChild(modal);

    modal.querySelector('#m-close').onclick = function () { modal.remove(); };
    modal.querySelector('#m-close2').onclick = function () { modal.remove(); };
  }

  function exportTabCSV() {
    var curMod = MODULES.find(function (m) { return m.id === S.tab; }) || MODULES[0];
    var csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Zenve BI Logistics & Delivery Intelligence Export - " + curMod.label + "\n";
    csvContent += "Export Date: " + new Date().toISOString() + "\n\n";

    if (S.tab === 'delivery-orders') {
      csvContent += "Order ID,Customer,Pet,Hub,Rider,Items,Tier,Cold Chain,Status,ETA\n";
      ORDERS.forEach(function (o) {
        csvContent += [o.id, '"' + o.customer + '"', '"' + o.pet + '"', '"' + o.hub + '"', '"' + o.rider + '"', '"' + o.items + '"', o.type, o.temp, o.status, o.eta].join(',') + "\n";
      });
    } else if (S.tab === 'delivery-partners') {
      csvContent += "Partner Name,Fleet Model,Fleet Size,Active Now,On-Time SLA,Drop Cost,Cold-Chain,CSAT,Status\n";
      PARTNERS.forEach(function (p) {
        csvContent += ['"' + p.name + '"', '"' + p.type + '"', p.fleetSize, p.activeNow, p.onTimeSla, p.avgCost, p.coldChainReady, p.rating, p.status].join(',') + "\n";
      });
    } else {
      csvContent += "Category,Metric,Value,Note\n";
      csvContent += "Logistics Performance,Avg Doorstep Speed,--,No delivery records\n";
      csvContent += "Cold-Chain Integrity,Compliance Rate,0.0%,0 refrigerated boxes\n";
      csvContent += "Doorstep Success,First Attempt Delivery,0.0%,0 attempts\n";
    }

    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "zenve_logistics_" + S.tab + "_report.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
    showToast('Downloaded ' + curMod.label + ' CSV report.');
  }

  /* ── Navigation & Control ─────────────────────────────────────────── */
  function open(tab) {
    closeOthers();
    init();
    if (tab) S.tab = tab;
    S.open = true;
    render();
    root.classList.add('zpanel-open');
    markSidebar(true, S.tab);
    var targetHash = (MODULES.find(function(m){ return m.id === S.tab; }) || {}).hash || '#logistics-dashboard';
    if (window.location.hash !== targetHash) {
      try { history.pushState(null, '', targetHash); } catch (e) { window.location.hash = targetHash; }
    }
  }

  function markSidebar(on, tab) {
    var targetTab = tab || S.tab || 'overview';
    document.querySelectorAll('.sidebar-scope li button, .sidebar-scope button, .sidebar-scope a').forEach(function (b) {
      var txt = b.textContent ? b.textContent.trim() : '';
      var bTab = tabFromText(txt);
      if (bTab) {
        b.classList.toggle('zpanel-active', on && bTab === targetTab);
        b.classList.toggle('zsd-active', on && bTab === targetTab);
      }
    });
  }

  function close() {
    if (root) root.classList.remove('zpanel-open');
    S.open = false;
    markSidebar(false);
    var h = window.location.hash;
    if (h.startsWith('#logistics') || h.startsWith('#delivery') || h.startsWith('#60-minute') || h.startsWith('#failed')) {
      try { history.pushState(null, '', window.location.pathname + window.location.search); } catch (e) {}
    }
  }

  function switchTab(tab) {
    if (!tab) return;
    S.tab = tab;
    markSidebar(true, tab);
    var targetHash = (MODULES.find(function(m){ return m.id === tab; }) || {}).hash || '#logistics-dashboard';
    if (window.location.hash !== targetHash) {
      try { history.pushState(null, '', targetHash); } catch (e) { window.location.hash = targetHash; }
    }
    render();
  }

  function init() {
    root = document.getElementById('zlog-dashboard-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'zlog-dashboard-root';
      root.className = 'zpanel-root zlog-root';
      document.body.appendChild(root);
    }
  }

  /* ── Interceptor for Sidebar ──────────────────────────────────────── */
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;

    // Never intercept accordion group headers or search input
    if (t.closest('[aria-expanded]') || t.closest('button[aria-expanded]') || t.closest('[aria-label="Search menu"]')) return;

    var item = t.closest('button, [data-go], a, [role="button"], li');
    if (item && item.textContent) {
      var txt = item.textContent.trim();
      var tab = tabFromText(txt);

      // Disambiguation for "Delivery Performance" and "60-Minute Delivery"
      // Check if inside Logistics & Delivery section
      if (tab === 'sixty-minute-delivery' || tab === 'delivery-performance') {
        var parentUl = item.closest('ul');
        var groupBtn = parentUl ? parentUl.previousElementSibling : null;
        var groupText = groupBtn ? (groupBtn.textContent || '') : '';
        // If explicitly under Orders & Operations, do not intercept here
        if (groupText.indexOf('Orders & Operations') >= 0 || groupText.indexOf('Orders') >= 0) {
          return;
        }
      }

      if (tab) {
        if (!t.closest('#zlog-dashboard-root')) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          open(tab);
        }
      }
    }
  }, true);

  // Keyboard Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && S.open) close();
  });

  // Hashchange Listener
  window.addEventListener('hashchange', function () {
    var tab = tabFromHash(window.location.hash);
    if (tab) {
      open(tab);
    } else if (S.open && !window.location.hash.startsWith('#logistics') && !window.location.hash.startsWith('#delivery') && !window.location.hash.startsWith('#60-minute') && !window.location.hash.startsWith('#failed')) {
      close();
    }
  });

  /* ── Export Global API ────────────────────────────────────────────── */
  window.ZenveLogisticsDashboard = {
    open: open,
    close: close,
    switchTab: switchTab,
    showDispatchModal: showDispatchModal,
    showTelematicsModal: showTelematicsModal,
    exportTabCSV: exportTabCSV
  };

  /* ── Boot ─────────────────────────────────────────────────────────── */
  function boot() {
    init();
    var initialTab = tabFromHash(window.location.hash);
    if (initialTab) {
      setTimeout(function () { open(initialTab); }, 200);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
