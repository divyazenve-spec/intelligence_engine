/* =====================================================================
   Zenve BI — Pharmacy Domain Control Center & Subdomain Suite
   All 10 Subdomains:
     1. Pharmacy Dashboard      (#pharmacy-dashboard)
     2. Pharmacy Sales          (#pharmacy-sales)
     3. Medicines               (#medicines)
     4. Prescriptions           (#prescriptions)
     5. Pharmacy Orders         (#pharmacy-orders)
     6. Batch Management        (#batch-management)
     7. Expiry Tracking         (#expiry-tracking)
     8. Pharmacy Inventory      (#pharmacy-inventory)
     9. Pharmacy Revenue        (#pharmacy-revenue)
     10. Pharmacy Profitability (#pharmacy-profitability)
   ===================================================================== */
(function () {
  'use strict';

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function inr(n) {
    n = Number(n) || 0;
    if (n >= 1e7) return '₹' + (n / 1e7).toFixed(2) + ' Cr';
    if (n >= 1e5) return '₹' + (n / 1e5).toFixed(2) + ' L';
    if (n >= 1000) return '₹' + (n / 1000).toFixed(1) + 'K';
    return '₹' + n.toLocaleString('en-IN');
  }

  /* ── 10 Tabs Definition ────────────────────────────────────────── */
  var TABS = [
    { id: 'dashboard',     label: 'Pharmacy Dashboard',     icon: '💊', hash: '#pharmacy-dashboard',     badge: '' },
    { id: 'sales',         label: 'Pharmacy Sales',         icon: '💰', hash: '#pharmacy-sales',         badge: '' },
    { id: 'medicines',     label: 'Medicines',              icon: '📚', hash: '#medicines',              badge: '' },
    { id: 'prescriptions', label: 'Prescriptions',          icon: '📋', hash: '#prescriptions',          badge: '' },
    { id: 'orders',        label: 'Pharmacy Orders',        icon: '🚚', hash: '#pharmacy-orders',        badge: '' },
    { id: 'batches',       label: 'Batch Management',       icon: '🏷️', hash: '#batch-management',       badge: '' },
    { id: 'expiry',        label: 'Expiry Tracking',        icon: '⏳', hash: '#expiry-tracking',        badge: '' },
    { id: 'inventory',     label: 'Pharmacy Inventory',     icon: '📦', hash: '#pharmacy-inventory',     badge: '' },
    { id: 'revenue',       label: 'Pharmacy Revenue',       icon: '💎', hash: '#pharmacy-revenue',       badge: '' },
    { id: 'profitability', label: 'Pharmacy Profitability', icon: '📈', hash: '#pharmacy-profitability', badge: '' }
  ];

  /* ── Datasets ─────────────────────────────────────────────────── */
  var MEDICINES = [];

  var PRESCRIPTIONS = [];

  var ORDERS = [];

  var BATCHES = [];

  var EXPIRY_ITEMS = [];

  /* ── State ─────────────────────────────────────────────────────── */
  var S = {
    open: false,
    tab: 'dashboard',
    search: '',
    categoryFilter: 'ALL',
    scheduleFilter: 'ALL',
    qcFilter: 'ALL',
    zoneFilter: 'ALL',
    statusFilter: 'ALL'
  };

  var root = null;

  /* ── Tab Resolver from Text or Hash ───────────────────────────── */
  function tabFromText(text) {
    if (!text) return null;
    var s = text.trim().toLowerCase();
    // Exclude other domains: Clinics & Hospitals, Doctors, Products, Reports
    if (s.indexOf('clinic') >= 0 || s.indexOf('hospital') >= 0 || s.indexOf('doctor') >= 0 || s.indexOf('report') >= 0 || s.indexOf('alert') >= 0) return null;
    if (s === 'pharmacy' || s.indexOf('pharmacy dashboard') >= 0) return 'dashboard';
    if (s.indexOf('pharmacy sales') >= 0) return 'sales';
    if (s === 'medicines' || s.indexOf('medicines') >= 0) return 'medicines';
    if (s === 'prescriptions' || s.indexOf('prescriptions') >= 0) return 'prescriptions';
    if (s.indexOf('pharmacy orders') >= 0) return 'orders';
    if (s.indexOf('batch management') >= 0 || s === 'batches') return 'batches';
    if (s.indexOf('expiry tracking') >= 0 || s === 'expiry') return 'expiry';
    if (s.indexOf('pharmacy inventory') >= 0) return 'inventory';
    if (s.indexOf('pharmacy revenue') >= 0) return 'revenue';
    if (s.indexOf('pharmacy profitability') >= 0 || s.indexOf('pharmacy margins') >= 0) return 'profitability';
    return null;
  }

  function tabFromHash(hash) {
    if (!hash) return null;
    var h = (hash.startsWith('#') ? hash.slice(1) : hash).toLowerCase();
    if (h.indexOf('clinic') >= 0 || h.indexOf('hospital') >= 0 || h.indexOf('doctor') >= 0) return null;
    if (h === 'pharmacy-dashboard' || h === 'pharmacy') return 'dashboard';
    if (h === 'pharmacy-sales') return 'sales';
    if (h === 'medicines') return 'medicines';
    if (h === 'prescriptions') return 'prescriptions';
    if (h === 'pharmacy-orders') return 'orders';
    if (h === 'batch-management' || h === 'batches') return 'batches';
    if (h === 'expiry-tracking' || h === 'expiry') return 'expiry';
    if (h === 'pharmacy-inventory') return 'inventory';
    if (h === 'pharmacy-revenue') return 'revenue';
    if (h === 'pharmacy-profitability' || h === 'pharmacy-margins') return 'profitability';
    return null;
  }

  /* ── UI Builders ──────────────────────────────────────────────── */
  function build() {
    if (root) return;
    root = document.createElement('div');
    root.id = 'zph-root';
    document.body.appendChild(root);
  }

  function toast(msg) {
    var t = document.createElement('div');
    t.className = 'zph-toast';
    t.innerHTML = '<span>✓</span> ' + esc(msg);
    document.body.appendChild(t);
    setTimeout(function () {
      if (t.parentNode) t.parentNode.removeChild(t);
    }, 3500);
  }

  function render() {
    if (!root) build();
    var cur = TABS.find(function (t) { return t.id === S.tab; }) || TABS[0];

    var tabsHtml = TABS.map(function (t) {
      var active = t.id === S.tab ? 'active' : '';
      var bClass = t.dangerBadge ? 'danger' : (t.warnBadge ? 'warn' : '');
      return '<button type="button" class="zph-tab ' + active + '" data-tab="' + t.id + '">' +
        '<span>' + t.icon + '</span> ' + esc(t.label) +
        (t.badge ? ' <span class="zph-tab-badge ' + bClass + '">' + esc(t.badge) + '</span>' : '') +
        '</button>';
    }).join('');

    var bodyHtml = '';
    if (S.tab === 'dashboard') bodyHtml = renderDashboard();
    else if (S.tab === 'sales') bodyHtml = renderSales();
    else if (S.tab === 'medicines') bodyHtml = renderMedicines();
    else if (S.tab === 'prescriptions') bodyHtml = renderPrescriptions();
    else if (S.tab === 'orders') bodyHtml = renderOrders();
    else if (S.tab === 'batches') bodyHtml = renderBatches();
    else if (S.tab === 'expiry') bodyHtml = renderExpiry();
    else if (S.tab === 'inventory') bodyHtml = renderInventory();
    else if (S.tab === 'revenue') bodyHtml = renderRevenue();
    else if (S.tab === 'profitability') bodyHtml = renderProfitability();

    root.innerHTML = [
      '<div class="zph-head">',
        '<div class="zph-head-left">',
          '<div class="zph-title-row">',
            '<h1 class="zph-title">' + cur.icon + ' Pharmacy Domain: ' + esc(cur.label) + '</h1>',
            '<span class="zph-live-badge"><span class="zph-pulse-dot"></span> Schedule H Licensed</span>',
          '</div>',
          '<p class="zph-sub">Comprehensive Veterinary Pharmacy Management & Regulatory Intelligence</p>',
        '</div>',
        '<div class="zph-head-actions">',
          '<button type="button" class="zph-btn primary" id="zph-action-verify"><span>📋</span> Verify e-Rx</button>',
          '<button type="button" class="zph-btn" id="zph-action-export"><span>📥</span> Export Report</button>',
        '</div>',
      '</div>',
      '<div class="zph-tabs-bar">' + tabsHtml + '</div>',
      '<div class="zph-body">' + bodyHtml + '</div>'
    ].join('');

    attachListeners();
  }

  /* ── Tab Renderers ────────────────────────────────────────────── */

  function renderDashboard() {
    return [
      '<div class="zph-kpi-grid">',
        kpiHtml('Pharmacy Revenue', '₹0', '0.0%', 'neutral', '0% total revenue', '💊'),
        kpiHtml('Prescriptions Filled', '0 Rx', '0.0%', 'neutral', '0 digitally signed', '📋'),
        kpiHtml('Avg Dispensary Ticket', '₹0', '0.0%', 'neutral', '0 meds / ticket', '💰'),
        kpiHtml('Formulary Active SKUs', '0 SKUs', '0.0%', 'neutral', '0 dispensaries', '📦'),
        kpiHtml('Near-Expiry Alerts', '0 Batches', '--', 'neutral', '0 alerts', '⏳'),
        kpiHtml('Cold Chain Integrity', '0.0%', '--', 'neutral', '0 logs', '❄️'),
      '</div>',
      '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(400px,1fr));gap:18px;">',
        '<div class="zph-card">',
          '<div class="zph-card-head">',
            '<div><h3 class="zph-card-title">Therapeutic Categories & Margins</h3><p class="zph-card-sub">Top volume pharmaceutical classes</p></div>',
            '<span class="zph-pill success">Blended Margin 0.0%</span>',
          '</div>',
          '<div style="display:flex;flex-direction:column;gap:10px;">',
            catRow('Antiparasitics & Dewormers', '₹0', '0.0%', '0.0% share', '🪱'),
            catRow('Antibiotics & Anti-Infectives', '₹0', '0.0%', '0.0% share', '💊'),
            catRow('Chronic Wellness & Cardiac', '₹0', '0.0%', '0.0% share', '❤️'),
            catRow('Vaccines & Cold Chain', '₹0', '0.0%', '0.0% share', '❄️'),
            catRow('Dermatologicals & Shampoos', '₹0', '0.0%', '0.0% share', '🧴'),
            catRow('Nutraceuticals & Joint Care', '₹0', '0.0%', '0.0% share', '🦴'),
          '</div>',
        '</div>',
        '<div class="zph-card">',
          '<div class="zph-card-head">',
            '<div><h3 class="zph-card-title">Schedule H Regulatory Compliance</h3><p class="zph-card-sub">Statutory audit trail & narcotic registry</p></div>',
            '<span class="zph-pill success">100% Compliant</span>',
          '</div>',
          '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px;">',
            statBox('VCI Registered Vets', '0 / 0 Active', '0 licenses verified', '#38bdf8'),
            statBox('Digital Rx Archival', '0.0% Retained', '0 records', '#10b981'),
            statBox('Cold Chain IoT Probes', '0 Sensors', '0 sensors online', '#06b6d4'),
            statBox('Next Drug Inspection', 'Schedule Pending', '0 pending audits', '#f59e0b'),
          '</div>',
          '<div style="padding:12px;background:rgba(59,130,246,0.1);border:1px solid rgba(59,130,246,0.25);border-radius:8px;font-size:12px;color:#93c5fd;">',
            '<strong>Pharmacist Stewardship Note:</strong> Every veterinary antibiotic dispense requires mandatory weight-adjusted dosage checks to prevent antimicrobial resistance.',
          '</div>',
        '</div>',
      '</div>',
      '<div class="zph-card">',
        '<div class="zph-card-head">',
          '<div><h3 class="zph-card-title">Live Pharmacy Dispensary Stream</h3><p class="zph-card-sub">Real-time prescription clearance and counter dispensing</p></div>',
          '<span class="zph-pill info">Real-time Feed</span>',
        '</div>',
        '<div class="zph-table-wrap">',
          '<table class="zph-table">',
            '<thead><tr><th>Rx ID</th><th>Pet Patient</th><th>Prescribing Vet</th><th>Prescribed Medicine</th><th>Status</th><th>Timestamp</th></tr></thead>',
            '<tbody>',
              PRESCRIPTIONS.slice(0, 5).map(function (rx) {
                return '<tr>' +
                  '<td style="font-family:IBM Plex Mono,monospace;font-weight:600;color:#38bdf8;">' + esc(rx.id) + '</td>' +
                  '<td><b>' + esc(rx.pet) + '</b> <span style="font-size:10px;color:#64748b;">(' + esc(rx.species) + ')</span></td>' +
                  '<td>' + esc(rx.vet) + '</td>' +
                  '<td>' + esc(rx.meds) + '</td>' +
                  '<td><span class="zph-pill ' + (rx.status === 'Dispensed' ? 'success' : (rx.status.indexOf('Pending') >= 0 ? 'warning' : 'info')) + '">' + esc(rx.status) + '</span></td>' +
                  '<td style="color:#64748b;">' + esc(rx.time) + '</td>' +
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
      '<div class="zph-kpi-grid">',
        kpiHtml('Total Pharmacy Sales', '₹0', '0.0%', 'neutral', '0 billing volume', '💵'),
        kpiHtml('Rx Prescription Sales', '₹0', '0.0% Share', 'neutral', '0 Rx authorized', '📋'),
        kpiHtml('OTC Health Sales', '₹0', '0.0% Share', 'neutral', '0 OTC sales', '🛍️'),
        kpiHtml('Avg Dispensary Ticket', '₹0', '0.0%', 'neutral', '0 meds / order', '🧾'),
        kpiHtml('Total Units Dispensed', '0 Units', '0.0%', 'neutral', '0 orders', '📦'),
        kpiHtml('Chronic Refill Rate', '0.0%', '--', 'neutral', '0 refill records', '🔄'),
      '</div>',
      '<div class="zph-card">',
        '<div class="zph-card-head">',
          '<div><h3 class="zph-card-title">Pharmacy Sales & Billing Ledger</h3><p class="zph-card-sub">Itemized transaction register with attending doctor attribution</p></div>',
          '<button class="zph-btn primary" onclick="alert(\'Printing daily sales day-end Z-report...\')">Print Day-End Z-Report</button>',
        '</div>',
        '<div class="zph-table-wrap">',
          '<table class="zph-table">',
            '<thead><tr><th>Order ID</th><th>Customer & Pet</th><th>Attending Vet</th><th>Channel</th><th>Dispensed Medications</th><th>Payment Mode</th><th style="text-align:right;">Amount</th></tr></thead>',
            '<tbody>',
              ORDERS.map(function (o) {
                return '<tr>' +
                  '<td style="font-family:IBM Plex Mono,monospace;font-weight:600;color:#38bdf8;">' + esc(o.id) + '</td>' +
                  '<td><b>' + esc(o.customer) + '</b></td>' +
                  '<td style="color:#94a3b8;">Dr. Priya Sharma</td>' +
                  '<td><span class="zph-pill info">' + esc(o.channel) + '</span></td>' +
                  '<td>' + esc(o.items) + '</td>' +
                  '<td>UPI / Card</td>' +
                  '<td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#10b981;">₹' + o.value.toLocaleString('en-IN') + '</td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderMedicines() {
    return [
      '<div class="zph-kpi-grid">',
        kpiHtml('Formulated Medicines', '0 SKUs', '0.0%', 'neutral', '0 active catalog', '📚'),
        kpiHtml('Schedule H Drugs', '0 SKUs', '0.0%', 'neutral', '0 regulated items', '⚠️'),
        kpiHtml('Cold Chain Biologics', '0 SKUs', '0.0%', 'neutral', '0 biologics', '❄️'),
        kpiHtml('Average Gross Margin', '0.0%', '--', 'neutral', '0.0% margin spread', '📈'),
      '</div>',
      '<div class="zph-card">',
        '<div class="zph-card-head">',
          '<div><h3 class="zph-card-title">Veterinary Medicine Formulary</h3><p class="zph-card-sub">Active ingredient (API), Schedule classification, PTR cost, and retail MRP</p></div>',
          '<button class="zph-btn primary" id="zph-btn-add-drug"><span>+</span> Add Medicine</button>',
        '</div>',
        '<div class="zph-table-wrap">',
          '<table class="zph-table">',
            '<thead><tr><th>SKU & Name</th><th>Active Salt / Formulation</th><th>Brand / Mfr</th><th>Schedule</th><th>Storage</th><th style="text-align:right;">Cost (PTR)</th><th style="text-align:right;">MRP</th><th style="text-align:right;">Margin</th><th style="text-align:center;">Stock</th></tr></thead>',
            '<tbody>',
              MEDICINES.map(function (m) {
                var margin = (((m.mrp - m.ptr) / m.mrp) * 100).toFixed(1);
                var isLow = m.stock <= m.rop;
                return '<tr>' +
                  '<td><b>' + esc(m.name) + '</b><br><span style="font-family:IBM Plex Mono,monospace;font-size:10px;color:#38bdf8;">' + esc(m.sku) + '</span></td>' +
                  '<td>' + esc(m.generic) + '<br><span style="font-size:10px;color:#64748b;">' + esc(m.form) + '</span></td>' +
                  '<td style="color:#94a3b8;">' + esc(m.brand) + '</td>' +
                  '<td><span class="zph-pill ' + (m.schedule === 'Schedule H' ? 'danger' : 'success') + '">' + esc(m.schedule) + '</span></td>' +
                  '<td>' + (m.cold ? '<span style="color:#38bdf8;font-weight:600;">❄️ 2°C–8°C</span>' : '<span style="color:#94a3b8;">Ambient</span>') + '</td>' +
                  '<td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹' + m.ptr + '</td>' +
                  '<td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:600;">₹' + m.mrp + '</td>' +
                  '<td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#10b981;font-weight:600;">' + margin + '%</td>' +
                  '<td style="text-align:center;"><span class="zph-pill ' + (isLow ? 'danger' : 'success') + '">' + m.stock + (isLow ? ' ⚠️' : '') + '</span></td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderPrescriptions() {
    return [
      '<div class="zph-kpi-grid">',
        kpiHtml('Prescriptions MTD', '0 Rx', '0.0%', 'neutral', '0 verifiable e-Rx', '📋'),
        kpiHtml('Pending Pharmacist Review', '0 Rx', '0 pending', 'neutral', '0 in queue', '⏳'),
        kpiHtml('Dispensed Today', '0 Rx', '0.0%', 'neutral', '0 dispensed', '✅'),
        kpiHtml('Flagged Safety Alerts', '0 Rx', '0 alerts', 'neutral', '0 alerts', '⚠️'),
      '</div>',
      '<div class="zph-card">',
        '<div class="zph-card-head">',
          '<div><h3 class="zph-card-title">Digital e-Prescription Queue</h3><p class="zph-card-sub">Pharmacist review & Schedule H dispensing authorization</p></div>',
          '<span class="zph-pill success">VCI Licensure Live</span>',
        '</div>',
        '<div class="zph-table-wrap">',
          '<table class="zph-table">',
            '<thead><tr><th>Rx ID</th><th>Pet Patient</th><th>Prescribing Veterinarian</th><th>Prescribed Regimen</th><th>Clinical Diagnosis</th><th>Status</th><th style="text-align:center;">Action</th></tr></thead>',
            '<tbody>',
              PRESCRIPTIONS.map(function (rx) {
                return '<tr>' +
                  '<td style="font-family:IBM Plex Mono,monospace;font-weight:600;color:#38bdf8;">' + esc(rx.id) + '</td>' +
                  '<td><b>' + esc(rx.pet) + '</b><br><span style="font-size:10px;color:#64748b;">' + esc(rx.species) + '</span></td>' +
                  '<td><b>' + esc(rx.vet) + '</b></td>' +
                  '<td>' + esc(rx.meds) + '</td>' +
                  '<td style="color:#cbd5e1;font-size:11px;">' + esc(rx.notes) + '</td>' +
                  '<td><span class="zph-pill ' + (rx.status === 'Dispensed' ? 'success' : (rx.status.indexOf('Pending') >= 0 ? 'warning' : 'danger')) + '">' + esc(rx.status) + '</span></td>' +
                  '<td style="text-align:center;"><button class="zph-btn primary" onclick="window.ZenvePharmacyDashboard.verifyRx(\'' + esc(rx.id) + '\')">Verify & Approve</button></td>' +
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
      '<div class="zph-kpi-grid">',
        kpiHtml('Active Pharmacy Orders', '0 Orders', '0 active', 'neutral', '0 city hubs', '🚚'),
        kpiHtml('60-Min Rapid Express', '0 Orders', '--', 'neutral', '0 express orders', '⚡'),
        kpiHtml('In-Clinic Counter Pickup', '0 Orders', '--', 'neutral', '0 pickups', '🏥'),
        kpiHtml('Cold Chain Dispatched', '0 Orders', '--', 'neutral', '0 cold dispatches', '❄️'),
      '</div>',
      '<div class="zph-card">',
        '<div class="zph-card-head">',
          '<div><h3 class="zph-card-title">Pharmacy Orders & Rapid Fulfillment Board</h3><p class="zph-card-sub">Packaging checklist, tamper-evident seals, and delivery manifests</p></div>',
          '<button class="zph-btn primary" onclick="alert(\'Printing batch shipping thermal labels...\')">Print Dispatch Labels</button>',
        '</div>',
        '<div class="zph-table-wrap">',
          '<table class="zph-table">',
            '<thead><tr><th>Order ID</th><th>Customer & Destination</th><th>Prescribed Medications</th><th>Channel</th><th>Cold Chain</th><th>SLA Timer</th><th>Status</th><th style="text-align:right;">Amount</th></tr></thead>',
            '<tbody>',
              ORDERS.map(function (o) {
                return '<tr>' +
                  '<td style="font-family:IBM Plex Mono,monospace;font-weight:600;color:#38bdf8;">' + esc(o.id) + '</td>' +
                  '<td><b>' + esc(o.customer) + '</b><br><span style="font-size:10px;color:#64748b;">' + esc(o.address) + '</span></td>' +
                  '<td>' + esc(o.items) + '</td>' +
                  '<td><span class="zph-pill info">' + esc(o.channel) + '</span></td>' +
                  '<td>' + (o.cold ? '<span style="color:#38bdf8;font-weight:600;">❄️ Insulated</span>' : '<span style="color:#64748b;">Ambient</span>') + '</td>' +
                  '<td style="font-family:IBM Plex Mono,monospace;font-weight:600;color:#f59e0b;">' + esc(o.sla) + '</td>' +
                  '<td><span class="zph-pill ' + (o.status === 'Delivered' ? 'success' : 'info') + '">' + esc(o.status) + '</span></td>' +
                  '<td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#10b981;">₹' + o.value.toLocaleString('en-IN') + '</td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderBatches() {
    return [
      '<div class="zph-kpi-grid">',
        kpiHtml('Active Tracked Batches', '0 Batches', '0.0%', 'neutral', '0 tracked batches', '🏷️'),
        kpiHtml('QC Passed & Released', '0 Batches', '0.0%', 'neutral', '0 certificates', '✅'),
        kpiHtml('Quarantine Hold Bay', '0 Batches', '0 hold', 'neutral', '0 quarantine', '⏳'),
        kpiHtml('Recalled / Frozen', '0 Batches', '0 frozen', 'neutral', '0 recalled', '🚫'),
      '</div>',
      '<div class="zph-card">',
        '<div class="zph-card-head">',
          '<div><h3 class="zph-card-title">Pharmaceutical Batch Traceability</h3><p class="zph-card-sub">Inward GRN, manufacturer batch number, manufacturing date, and expiry timeline</p></div>',
          '<button class="zph-btn primary" onclick="window.ZenvePharmacyDashboard.showInwardModal()"><span>+</span> Inward New Batch (GRN)</button>',
        '</div>',
        '<div class="zph-table-wrap">',
          '<table class="zph-table">',
            '<thead><tr><th>Batch Code</th><th>Medicine Name</th><th>Supplier / Mfr</th><th>Mfg Date</th><th>Expiry Date</th><th>Hub & Zone</th><th style="text-align:right;">Inward</th><th style="text-align:right;">Balance</th><th>QC Status</th></tr></thead>',
            '<tbody>',
              BATCHES.map(function (b) {
                return '<tr>' +
                  '<td style="font-family:IBM Plex Mono,monospace;font-weight:600;color:#38bdf8;">' + esc(b.batchNo) + '</td>' +
                  '<td><b>' + esc(b.name) + '</b></td>' +
                  '<td style="color:#94a3b8;">' + esc(b.vendor) + '</td>' +
                  '<td style="font-family:IBM Plex Mono,monospace;color:#94a3b8;">' + esc(b.mfg) + '</td>' +
                  '<td style="font-family:IBM Plex Mono,monospace;font-weight:600;color:#cbd5e1;">' + esc(b.exp) + '</td>' +
                  '<td>' + esc(b.hub) + '<br><span style="font-size:10px;color:#38bdf8;">' + esc(b.zone) + '</span></td>' +
                  '<td style="text-align:right;font-family:IBM Plex Mono,monospace;">' + b.qty + '</td>' +
                  '<td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:' + (b.balance < 25 ? '#f87171' : '#10b981') + ';">' + b.balance + '</td>' +
                  '<td><span class="zph-pill ' + (b.qc === 'QC Passed' ? 'success' : (b.qc.indexOf('Quarantine') >= 0 ? 'warning' : 'danger')) + '">' + esc(b.qc) + '</span></td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderExpiry() {
    return [
      '<div class="zph-kpi-grid">',
        kpiHtml('Near-Expiry Exposure', '₹0', '0.0%', 'neutral', '₹0 at risk', '⏳'),
        kpiHtml('Critical (<30 Days)', '0 Batches', '0 action needed', 'neutral', '0 critical', '🚨'),
        kpiHtml('High Alert (30–60 Days)', '0 Batches', '0 high alert', 'neutral', '0 high alert', '⚠️'),
        kpiHtml('Salvage Recovery Rate', '0.0%', '--', 'neutral', '0 salvage records', '♻️'),
      '</div>',
      '<div class="zph-card">',
        '<div class="zph-card-head">',
          '<div><h3 class="zph-card-title">Early Warning Expiry Watchlist & FEFO Engine</h3><p class="zph-card-sub">First-Expiry-First-Out rotation, auto-liquidation, and supplier returns</p></div>',
          '<button class="zph-btn primary" onclick="alert(\'Exporting Supplier Return Authorization (SRA) documents to MSD and Zoetis...\')">Generate Bulk SRA Claims</button>',
        '</div>',
        '<div class="zph-table-wrap">',
          '<table class="zph-table">',
            '<thead><tr><th>Batch Code</th><th>Medicine Name</th><th>Expiry Date</th><th>Days Left</th><th>Risk Zone</th><th>Hub</th><th style="text-align:right;">Remaining</th><th style="text-align:right;">Cost Value</th><th style="text-align:center;">Salvage Action</th></tr></thead>',
            '<tbody>',
              EXPIRY_ITEMS.map(function (e) {
                return '<tr>' +
                  '<td style="font-family:IBM Plex Mono,monospace;font-weight:600;color:#38bdf8;">' + esc(e.batchNo) + '</td>' +
                  '<td><b>' + esc(e.name) + '</b></td>' +
                  '<td style="font-family:IBM Plex Mono,monospace;font-weight:600;">' + esc(e.exp) + '</td>' +
                  '<td style="font-family:IBM Plex Mono,monospace;font-weight:700;color:' + (e.daysLeft <= 30 ? '#f87171' : '#fbbf24') + ';">' + e.daysLeft + ' days</td>' +
                  '<td><span class="zph-pill ' + (e.daysLeft <= 30 ? 'danger' : 'warning') + '">' + esc(e.horizon) + '</span></td>' +
                  '<td style="color:#94a3b8;">' + esc(e.hub) + '</td>' +
                  '<td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:600;">' + e.balance + '</td>' +
                  '<td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹' + e.cost.toLocaleString('en-IN') + '</td>' +
                  '<td style="text-align:center;"><button class="zph-btn" onclick="alert(\'SRA Credit Note Claim initiated for ' + esc(e.batchNo) + '\')">' + esc(e.action) + '</button></td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderInventory() {
    return [
      '<div class="zph-kpi-grid">',
        kpiHtml('Inventory at Cost', '₹0', '0.0%', 'neutral', '₹0 asset valuation', '💰'),
        kpiHtml('Valuation at Retail (MRP)', '₹0', '0.0% unrealized margin', 'neutral', '₹0 retail realization', '💎'),
        kpiHtml('Cold Chain Stock', '0 SKUs', '0.0%', 'neutral', '0 probes', '❄️'),
        kpiHtml('Inventory Turnover', '0.0x / yr', '--', 'neutral', '0.0x speed', '⚡'),
      '</div>',
      '<div class="zph-card">',
        '<div class="zph-card-head">',
          '<div><h3 class="zph-card-title">Perpetual Stock & Buffer Levels</h3><p class="zph-card-sub">Real-time stock on hand, reorder points (ROP), and days of supply</p></div>',
          '<button class="zph-btn primary" onclick="alert(\'Starting physical cycle count audit...\')">Initiate Cycle Count</button>',
        '</div>',
        '<div class="zph-table-wrap">',
          '<table class="zph-table">',
            '<thead><tr><th>SKU & Name</th><th>Storage Zone</th><th style="text-align:right;">Stock on Hand</th><th style="text-align:right;">Reorder Point</th><th style="text-align:right;">Cost Value</th><th style="text-align:right;">MRP Value</th><th style="text-align:center;">Action</th></tr></thead>',
            '<tbody>',
              MEDICINES.map(function (m) {
                var isLow = m.stock <= m.rop;
                return '<tr>' +
                  '<td><b>' + esc(m.name) + '</b><br><span style="font-family:IBM Plex Mono,monospace;font-size:10px;color:#38bdf8;">' + esc(m.sku) + '</span></td>' +
                  '<td>' + esc(m.zone) + '</td>' +
                  '<td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:' + (isLow ? '#f87171' : '#fff') + ';">' + m.stock + '</td>' +
                  '<td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#94a3b8;">' + m.rop + '</td>' +
                  '<td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹' + (m.stock * m.ptr).toLocaleString('en-IN') + '</td>' +
                  '<td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:600;color:#10b981;">₹' + (m.stock * m.mrp).toLocaleString('en-IN') + '</td>' +
                  '<td style="text-align:center;">' + (isLow ? '<button class="zph-btn primary" onclick="alert(\'Expedited Reorder PO generated for ' + esc(m.sku) + '\')">+ Reorder PO</button>' : '<span style="color:#64748b;font-size:11px;">Healthy ✓</span>') + '</td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderRevenue() {
    return [
      '<div class="zph-kpi-grid">',
        kpiHtml('Gross Pharmacy Sales', '₹0', '0.0%', 'neutral', '0 billed transactions', '💵'),
        kpiHtml('Discounts & Schemes', '-₹0', '0.0% discount rate', 'neutral', '0 discounts', '🏷️'),
        kpiHtml('Net Realized Revenue', '₹0', '0.0%', 'neutral', '0.0% of target', '💎'),
        kpiHtml('Insurance Cashless', '₹0', '0.0% of revenue', 'neutral', '0 insurance claims', '🛡️'),
      '</div>',
      '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(400px,1fr));gap:18px;">',
        '<div class="zph-card">',
          '<div class="zph-card-head">',
            '<div><h3 class="zph-card-title">Gross-to-Net Revenue Waterfall</h3><p class="zph-card-sub">Realized cash collection and margin retainment</p></div>',
          '</div>',
          '<div style="display:flex;flex-direction:column;gap:10px;">',
            catRow('Gross Pharmacy Billing (MRP)', '₹0', '', '0% Baseline', '💰'),
            catRow('Chronic Patient Loyalty Discounts', '- ₹0', '', '0 discounts', '🏷️'),
            catRow('Returns & Breakage Adjustments', '- ₹0', '', '0.0% of COGS', '📦'),
            '<div style="padding:12px;background:rgba(16,185,129,0.15);border:1px solid rgba(16,185,129,0.3);border-radius:8px;display:flex;justify-content:space-between;color:#10b981;font-weight:700;">' +
              '<span>Net Recognized Revenue</span><span style="font-family:IBM Plex Mono,monospace;font-size:16px;">₹0</span>' +
            '</div>',
          '</div>',
        '</div>',
        '<div class="zph-card">',
          '<div class="zph-card-head">',
            '<div><h3 class="zph-card-title">Regional Revenue Distribution</h3><p class="zph-card-sub">City hubs contribution & growth velocity</p></div>',
          '</div>',
          '<div style="display:flex;flex-direction:column;gap:10px;">',
            catRow('Bengaluru Central (HQ)', '₹0', '0.0%', '--', '🏙️'),
            catRow('Mumbai MMR Hub', '₹0', '0.0%', '--', '🌊'),
            catRow('Delhi NCR Fulfillment', '₹0', '0.0%', '--', '🏛️'),
            catRow('Hyderabad Hub', '₹0', '0.0%', '--', '💎'),
            catRow('Pune Micro-Hub', '₹0', '0.0%', '--', '🌿'),
          '</div>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderProfitability() {
    return [
      '<div class="zph-kpi-grid">',
        kpiHtml('Gross Pharmaceutical Profit', '₹0', '0.0%', 'neutral', '0.0% gross margin', '💰'),
        kpiHtml('Net Contribution Margin', '₹0', '0.0% Net Margin', 'neutral', '0.0% net margin', '💎'),
        kpiHtml('Vendor Volume Rebates', '+₹0', '--', 'neutral', '0 vendor rebates', '🤝'),
        kpiHtml('Shrinkage & Breakage', '-₹0', '0.0% of COGS', 'neutral', '0 breakage', '📉'),
      '</div>',
      '<div class="zph-card">',
        '<div class="zph-card-head">',
          '<div><h3 class="zph-card-title">Category Margins & Procurement Cost Analysis</h3><p class="zph-card-sub">Sales realization, COGS, and vendor volume rebates</p></div>',
          '<span class="zph-pill success">Total COGS: ₹0</span>',
        '</div>',
        '<div class="zph-table-wrap">',
          '<table class="zph-table">',
            '<thead><tr><th>Therapeutic Category</th><th style="text-align:right;">Revenue</th><th style="text-align:right;">COGS</th><th style="text-align:right;">Gross Profit</th><th style="text-align:right;">Gross Margin</th><th style="text-align:right;">Vendor Rebates</th></tr></thead>',
            '<tbody>',
              '<tr><td colspan="6" style="text-align:center;padding:24px;color:#94a3b8;">No category margin records found</td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Helper Components ────────────────────────────────────────── */
  function kpiHtml(label, val, delta, trend, sub, icon) {
    return [
      '<div class="zph-kpi">',
        '<div class="zph-kpi-top">',
          '<span class="zph-kpi-label">' + esc(label) + '</span>',
          '<span class="zph-kpi-icon">' + icon + '</span>',
        '</div>',
        '<div class="zph-kpi-val">' + esc(val) + '</div>',
        '<div class="zph-kpi-bottom">',
          '<span class="zph-delta ' + trend + '">' + esc(delta) + '</span>',
          '<span class="zph-subtext">' + esc(sub) + '</span>',
        '</div>',
      '</div>'
    ].join('');
  }

  function catRow(name, rev, margin, share, icon) {
    return [
      '<div style="padding:10px 12px;background:rgba(255,255,255,0.02);border-radius:8px;display:flex;justify-content:space-between;align-items:center;">',
        '<span style="display:flex;align-items:center;gap:8px;font-size:13px;font-weight:600;"><span>' + icon + '</span> ' + esc(name) + '</span>',
        '<div style="text-align:right;">',
          '<div style="font-family:IBM Plex Mono,monospace;font-weight:700;">' + esc(rev) + '</div>',
          '<div style="font-size:11px;color:#94a3b8;">' + (margin ? 'Margin: <b style="color:#10b981;">' + esc(margin) + '</b> · ' : '') + esc(share) + '</div>',
        '</div>',
      '</div>'
    ].join('');
  }

  function statBox(title, val, sub, col) {
    return [
      '<div style="padding:12px;background:rgba(0,0,0,0.25);border-radius:8px;">',
        '<span style="font-size:11px;color:#94a3b8;">' + esc(title) + '</span>',
        '<div style="font-size:17px;font-weight:700;margin-top:4px;color:' + col + ';">' + esc(val) + '</div>',
        '<div style="font-size:10px;color:#64748b;margin-top:2px;">' + esc(sub) + '</div>',
      '</div>'
    ].join('');
  }

  /* ── Interactive Actions & Modal Handlers ─────────────────────── */
  function attachListeners() {
    var closeBtn = document.getElementById('zph-close-btn');
    if (closeBtn) closeBtn.onclick = close;

    var verifyBtn = document.getElementById('zph-action-verify');
    if (verifyBtn) verifyBtn.onclick = function () { switchTab('prescriptions'); };

    var exportBtn = document.getElementById('zph-action-export');
    if (exportBtn) exportBtn.onclick = function () {
      toast('Pharmacy Ledger & Schedule H Register exported to CSV');
    };

    var addDrugBtn = document.getElementById('zph-btn-add-drug');
    if (addDrugBtn) addDrugBtn.onclick = showAddDrugModal;

    var tabs = root.querySelectorAll('.zph-tab');
    tabs.forEach(function (btn) {
      btn.onclick = function () {
        var tId = btn.getAttribute('data-tab');
        if (tId) switchTab(tId);
      };
    });
  }

  function open(tab) {
    // Coordinate with other dashboards so they cleanly close
    if (window.ZenveSalesDashboard && typeof window.ZenveSalesDashboard.close === 'function') {
      try { window.ZenveSalesDashboard.close(); } catch (e) {}
    }
    if (window.ZenveOperationsDashboard && typeof window.ZenveOperationsDashboard.close === 'function') {
      try { window.ZenveOperationsDashboard.close(); } catch (e) {}
    }
    if (window.ZenveProductsInventory && typeof window.ZenveProductsInventory.close === 'function') {
      try { window.ZenveProductsInventory.close(); } catch (e) {}
    }
    if (window.ZenveClinicsDashboard && typeof window.ZenveClinicsDashboard.close === 'function') {
      try { window.ZenveClinicsDashboard.close(); } catch (e) {}
    }
    if (window.ZenveReportsDashboard && typeof window.ZenveReportsDashboard.close === 'function') {
      try { window.ZenveReportsDashboard.close(); } catch (e) {}
    }
    if (window.ZenveAlertsDashboard && typeof window.ZenveAlertsDashboard.close === 'function') {
      try { window.ZenveAlertsDashboard.close(); } catch (e) {}
    }
    if (window.ZenveFinanceDashboard && typeof window.ZenveFinanceDashboard.close === 'function') {
      try { window.ZenveFinanceDashboard.close(); } catch (e) {}
    }
    if (window.ZenveSettingsDashboard && typeof window.ZenveSettingsDashboard.close === 'function') {
      try { window.ZenveSettingsDashboard.close(); } catch (e) {}
    }
    document.querySelectorAll('.zpanel-root, [id$="-root"]').forEach(function (el) {
      if (el.id !== 'zph-root') el.classList.remove('zpanel-open', 'zod-open', 'zsd-open', 'zpid-open', 'zch-open', 'zrep-open', 'zalt-open', 'zset-open', 'zfa-open');
    });

    // Dismiss any Radix placeholder dialog
    try {
      document.querySelectorAll('[role="dialog"]').forEach(function (d) {
        if (d.closest('#zph-root')) return;
        var btn = d.querySelector('button[aria-label*="close" i], button:last-child');
        if (btn) btn.click();
      });
    } catch (e) {}

    if (tab && TABS.some(function (t) { return t.id === tab; })) {
      S.tab = tab;
    } else if (!S.tab) {
      S.tab = 'dashboard';
    }

    build();
    S.open = true;
    root.classList.add('zph-open');
    render();

    var targetHash = TABS.find(function (t) { return t.id === S.tab; })?.hash;
    if (targetHash && location.hash !== targetHash) {
      try { history.replaceState(null, '', targetHash); } catch (e) {}
    }
  }

  function close() {
    S.open = false;
    if (root) root.classList.remove('zph-open');
    if (TABS.some(function (t) { return t.hash === location.hash; })) {
      try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {}
    }
  }

  function switchTab(tabId) {
    if (!TABS.some(function (t) { return t.id === tabId; })) return;
    S.tab = tabId;
    render();
    var t = TABS.find(function (it) { return it.id === tabId; });
    if (t && t.hash) {
      try { history.replaceState(null, '', t.hash); } catch (e) {}
    }
  }

  function verifyRx(rxId) {
    var rx = PRESCRIPTIONS.find(function (p) { return p.id === rxId; });
    if (rx) {
      rx.status = 'Verified & Ready';
      render();
      toast('Prescription ' + rxId + ' verified by Registered Pharmacist. Dispensing authorized!');
    }
  }

  function showAddDrugModal() {
    var modalHtml = [
      '<div class="zph-modal-backdrop" id="zph-drug-modal">',
        '<div class="zph-modal">',
          '<div class="zph-modal-head">',
            '<h3 style="margin:0;font-size:18px;font-weight:700;">Add Drug to Veterinary Formulary</h3>',
            '<button type="button" class="zph-btn" onclick="document.getElementById(\'zph-drug-modal\').remove()">✕</button>',
          '</div>',
          '<form id="zph-add-drug-form" style="display:grid;grid-template-columns:1fr 1fr;gap:12px;font-size:12px;">',
            '<div style="grid-column:span 2;"><label style="display:block;color:#94a3b8;margin-bottom:4px;">Commercial Brand Name</label><input required class="zph-input" style="width:100%;" id="drug-name" placeholder="e.g. Apoquel 16mg Chewable" /></div>',
            '<div style="grid-column:span 2;"><label style="display:block;color:#94a3b8;margin-bottom:4px;">Generic Active Salt (API)</label><input required class="zph-input" style="width:100%;" id="drug-salt" placeholder="e.g. Oclacitinib Maleate 16mg" /></div>',
            '<div><label style="display:block;color:#94a3b8;margin-bottom:4px;">Manufacturer / Brand</label><input required class="zph-input" style="width:100%;" id="drug-brand" placeholder="e.g. Zoetis India" /></div>',
            '<div><label style="display:block;color:#94a3b8;margin-bottom:4px;">Therapeutic Category</label><select class="zph-select" style="width:100%;" id="drug-cat"><option>Antiparasitic</option><option>Antibiotics</option><option>Cardiac & Renal</option><option>Dermatology</option><option>Vaccines</option><option>Supplements</option></select></div>',
            '<div><label style="display:block;color:#94a3b8;margin-bottom:4px;">Schedule Classification</label><select class="zph-select" style="width:100%;" id="drug-sch"><option>Schedule H</option><option>OTC</option><option>Schedule X</option></select></div>',
            '<div><label style="display:block;color:#94a3b8;margin-bottom:4px;">Storage Mode</label><select class="zph-select" style="width:100%;" id="drug-cold"><option value="false">Ambient (Room Temp)</option><option value="true">Cold Chain (2°C–8°C)</option></select></div>',
            '<div><label style="display:block;color:#94a3b8;margin-bottom:4px;">Cost Price (₹ PTR)</label><input type="number" required class="zph-input" style="width:100%;" id="drug-ptr" placeholder="1200" /></div>',
            '<div><label style="display:block;color:#94a3b8;margin-bottom:4px;">Retail MRP (₹)</label><input type="number" required class="zph-input" style="width:100%;" id="drug-mrp" placeholder="1850" /></div>',
            '<div style="grid-column:span 2;display:flex;justify-content:flex-end;gap:8px;margin-top:14px;">',
              '<button type="button" class="zph-btn" onclick="document.getElementById(\'zph-drug-modal\').remove()">Cancel</button>',
              '<button type="submit" class="zph-btn primary">Save Medicine</button>',
            '</div>',
          '</form>',
        '</div>',
      '</div>'
    ].join('');

    var div = document.createElement('div');
    div.innerHTML = modalHtml;
    document.body.appendChild(div.firstElementChild);

    var form = document.getElementById('zph-add-drug-form');
    if (form) {
      form.onsubmit = function (e) {
        e.preventDefault();
        var name = document.getElementById('drug-name').value;
        var generic = document.getElementById('drug-salt').value;
        var brand = document.getElementById('drug-brand').value;
        var cat = document.getElementById('drug-cat').value;
        var sch = document.getElementById('drug-sch').value;
        var cold = document.getElementById('drug-cold').value === 'true';
        var ptr = Number(document.getElementById('drug-ptr').value) || 1000;
        var mrp = Number(document.getElementById('drug-mrp').value) || 1500;

        MEDICINES.unshift({
          sku: 'DRG-VET-0' + (MEDICINES.length + 1),
          name: name,
          generic: generic,
          brand: brand,
          form: 'Tablets',
          category: cat,
          schedule: sch,
          cold: cold,
          mrp: mrp,
          ptr: ptr,
          stock: 50,
          rop: 20,
          zone: cold ? 'Cold Chiller' : 'Ambient Rack'
        });

        document.getElementById('zph-drug-modal').remove();
        render();
        toast('New medicine ' + name + ' added to formulary!');
      };
    }
  }

  function showInwardModal() {
    var modalHtml = [
      '<div class="zph-modal-backdrop" id="zph-inward-modal">',
        '<div class="zph-modal">',
          '<div class="zph-modal-head">',
            '<h3 style="margin:0;font-size:18px;font-weight:700;">Inward Batch to Quarantine Bay (GRN)</h3>',
            '<button type="button" class="zph-btn" onclick="document.getElementById(\'zph-inward-modal\').remove()">✕</button>',
          '</div>',
          '<form id="zph-inward-form" style="display:grid;grid-template-columns:1fr 1fr;gap:12px;font-size:12px;">',
            '<div><label style="display:block;color:#94a3b8;margin-bottom:4px;">Manufacturer Batch No</label><input required class="zph-input" style="width:100%;" id="batch-code" placeholder="e.g. BT-2026-APQ01" /></div>',
            '<div><label style="display:block;color:#94a3b8;margin-bottom:4px;">Medicine SKU</label><select class="zph-select" style="width:100%;" id="batch-sku">' +
              MEDICINES.map(function (m) { return '<option value="' + esc(m.sku) + '">' + esc(m.name) + '</option>'; }).join('') +
            '</select></div>',
            '<div><label style="display:block;color:#94a3b8;margin-bottom:4px;">Manufacturing Date</label><input type="date" required class="zph-input" style="width:100%;" id="batch-mfg" value="2025-06-01" /></div>',
            '<div><label style="display:block;color:#94a3b8;margin-bottom:4px;">Expiry Date</label><input type="date" required class="zph-input" style="width:100%;" id="batch-exp" value="2027-05-31" /></div>',
            '<div><label style="display:block;color:#94a3b8;margin-bottom:4px;">Inward Quantity</label><input type="number" required class="zph-input" style="width:100%;" id="batch-qty" value="100" /></div>',
            '<div><label style="display:block;color:#94a3b8;margin-bottom:4px;">Receiving Hub</label><select class="zph-select" style="width:100%;" id="batch-hub"><option>Bengaluru Central</option><option>Mumbai West</option><option>Delhi NCR Hub</option></select></div>',
            '<div style="grid-column:span 2;display:flex;justify-content:flex-end;gap:8px;margin-top:14px;">',
              '<button type="button" class="zph-btn" onclick="document.getElementById(\'zph-inward-modal\').remove()">Cancel</button>',
              '<button type="submit" class="zph-btn primary">Record Batch GRN</button>',
            '</div>',
          '</form>',
        '</div>',
      '</div>'
    ].join('');

    var div = document.createElement('div');
    div.innerHTML = modalHtml;
    document.body.appendChild(div.firstElementChild);

    var form = document.getElementById('zph-inward-form');
    if (form) {
      form.onsubmit = function (e) {
        e.preventDefault();
        var code = document.getElementById('batch-code').value;
        var sku = document.getElementById('batch-sku').value;
        var med = MEDICINES.find(function (m) { return m.sku === sku; });
        var mfg = document.getElementById('batch-mfg').value;
        var exp = document.getElementById('batch-exp').value;
        var qty = Number(document.getElementById('batch-qty').value) || 100;
        var hub = document.getElementById('batch-hub').value;

        BATCHES.unshift({
          batchNo: code,
          sku: sku,
          name: med ? med.name : 'Veterinary Drug',
          vendor: med ? med.brand : 'Vendor',
          mfg: mfg,
          exp: exp,
          qty: qty,
          balance: qty,
          hub: hub,
          qc: 'QC Passed',
          zone: 'Inward Bay 1'
        });

        document.getElementById('zph-inward-modal').remove();
        render();
        toast('Batch ' + code + ' inwarded into ' + hub + ' inventory!');
      };
    }
  }

  /* ── Hash-change listener ─────────────────────────────────────── */
  window.addEventListener('hashchange', function () {
    var tab = tabFromHash(location.hash);
    if (tab) {
      if (!S.open) open(tab);
      else switchTab(tab);
    } else if (S.open) {
      close();
    }
  });

  /* ── Check initial hash on load ───────────────────────────────── */
  var initialTab = tabFromHash(location.hash);
  if (initialTab) {
    var go = function () { setTimeout(function () { open(initialTab); }, 400); };
    if (document.readyState === 'complete') go();
    else window.addEventListener('load', go);
  }

  /* ── Global Click Interception & Wire Sidebar ─────────────────── */
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;

    // Never intercept accordion group toggles or search bar
    if (t.closest('[aria-expanded]') || t.closest('button[aria-expanded]') || t.closest('[aria-label="Search menu"]')) return;

    var item = t.closest('button, [data-go], a, [role="button"], li');
    if (item && item.textContent) {
      var tab = tabFromText(item.textContent.trim());
      if (tab) {
        if (!t.closest('#zph-root')) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          open(tab);
          return;
        }
      }
    }

    if (S.open) {
      if (t.closest('#zph-root')) return;
      var b = t.closest('.sidebar-scope button, .sidebar-scope a, nav button, nav a, aside button, aside a');
      if (!b) return;
      if (b.getAttribute('aria-label') === 'Search menu') return;
      if (b.getAttribute('aria-expanded') !== null) return;
      if (b.textContent && tabFromText(b.textContent.trim())) return;

      close();
    }
  }, true);

  document.addEventListener('pointerdown', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;

    if (t.closest('[aria-expanded]') || t.closest('button[aria-expanded]') || t.closest('[aria-label="Search menu"]')) return;

    var item = t.closest('.sidebar-scope button, .sidebar-scope a, nav button, nav a, aside button, aside a');
    if (item && item.textContent) {
      var tab = tabFromText(item.textContent.trim());
      if (tab) {
        e.stopPropagation();
      }
    }
  }, true);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && S.open) {
      close();
    }
  });

  function wireSidebar() {
    document.querySelectorAll(
      '.sidebar-scope li button, .sidebar-scope button, .sidebar-scope a, ' +
      '[data-sidebar] button, [data-sidebar] a, nav button, nav a, aside button, aside a'
    ).forEach(function (btn) {
      if (btn._zphWired) return;
      btn._zphWired = true;
      btn.addEventListener('click', function (e) {
        var tab = tabFromText(btn.textContent ? btn.textContent.trim() : '');
        if (tab) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          open(tab);
        }
      }, true);
    });
    setTimeout(wireSidebar, 1500);
  }

  /* ── Public API ───────────────────────────────────────────────── */
  window.ZenvePharmacyDashboard = {
    open: open,
    close: close,
    switchTab: switchTab,
    verifyRx: verifyRx,
    showAddDrugModal: showAddDrugModal,
    showInwardModal: showInwardModal
  };

  /* ── Boot ─────────────────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { build(); wireSidebar(); });
  } else {
    build();
    wireSidebar();
  }

})();
