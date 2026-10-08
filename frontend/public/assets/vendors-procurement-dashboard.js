/* =====================================================================
   Zenve BI — Vendors & Procurement Domain Control Center & Subdomain Dashboards
   Suite (10 Subdomains):
     1. Vendor Dashboard     (#vendor-dashboard / #vendors-procurement)
     2. All Vendors          (#all-vendors)
     3. Vendor Performance   (#vendor-performance)
     4. Vendor Payments      (#vendor-payments)
     5. Purchase Orders      (#purchase-orders)
     6. Procurement          (#procurement)
     7. Purchase History     (#purchase-history)
     8. Supplier Pricing     (#supplier-pricing)
     9. Supplier Performance (#supplier-performance)
     10. Procurement Savings (#procurement-savings)
   ===================================================================== */

(function () {
  'use strict';

  function esc(s) {
    if (s == null) return '';
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ── 10 Subdomains Configuration ─────────────────────────────────── */
  var TABS = [
    { id: 'dashboard',         label: 'Vendor Dashboard',     icon: '🤝', hash: '#vendor-dashboard',     badge: '',   title: 'Vendors & Procurement Command Center', sub: 'Master supplier network, active purchase orders, fulfillment compliance, and network-wide procurement savings' },
    { id: 'all-vendors',       label: 'All Vendors',          icon: '🏭', hash: '#all-vendors',          badge: '', title: 'Complete Vendor Directory & Supplier Registry', sub: 'All 24 registered suppliers with contacts, spend totals, quality ratings, and GSTIN verification status' },
    { id: 'vendor-perf',       label: 'Vendor Performance',   icon: '📊', hash: '#vendor-performance',   badge: '',    title: 'Vendor Performance Scorecards & SLA Analytics', sub: 'On-time delivery SLA, fill rate, defect rate, lead times, and composite vendor performance scores' },
    { id: 'vendor-pay',        label: 'Vendor Payments',      icon: '💳', hash: '#vendor-payments',      badge: '',   title: 'Vendor Accounts Payable & Payment Scheduling', sub: 'Outstanding invoice aging, 2/10 Net 30 cash discounts, bank UTR disbursements, and payment terms' },
    { id: 'purchase-orders',   label: 'Purchase Orders',      icon: '📑', hash: '#purchase-orders',      badge: '',    title: 'Purchase Order Management & Tracking', sub: 'PO lifecycle tracking: draft creation, department approval, dispatch, transit, and GRN verification' },
    { id: 'procurement',       label: 'Procurement',          icon: '🔄', hash: '#procurement',          badge: '', title: 'Procurement Workflow & Requisition Pipeline', sub: 'End-to-end procurement lifecycle: requisition → approval → vendor negotiation → PO → GRN → 3-way match → payment' },
    { id: 'purchase-history',  label: 'Purchase History',     icon: '📜', hash: '#purchase-history',     badge: '', title: 'Purchase History & Fulfilled Order Archive', sub: 'Complete ledger of historical purchase orders, fulfillment timelines, invoice audit trail, and multi-hub spend' },
    { id: 'supplier-pricing',  label: 'Supplier Pricing',     icon: '🏷️', hash: '#supplier-pricing',     badge: '',   title: 'Contracted Supplier Pricing & Rate Benchmarking', sub: 'Master SKU pricing schedules, negotiated discounts against MSRP, volume tier rebates, and price lock validity' },
    { id: 'supplier-perf',     label: 'Supplier Performance', icon: '🎯', hash: '#supplier-performance', badge: '',   title: 'Supplier Quality Engineering & SLA Scorecards', sub: 'On-time in-full (OTIF), cold-chain compliance, defect rates (PPM), invoice accuracy, and GMP audit certifications' },
    { id: 'savings',           label: 'Procurement Savings',  icon: '💰', hash: '#procurement-savings',  badge: '', title: 'Procurement Cost Savings & Value Realization', sub: 'Negotiated price variances, bulk volume consolidation rebates, generic substitution arbitrage, and cash discounts' }
  ];

  /* ── Master Datasets ─────────────────────────────────────────────── */
  var VENDORS = [];

  var PURCHASE_ORDERS = [];

  var PAYMENTS = [];

  var REQUISITIONS = [];

  /* ── State ───────────────────────────────────────────────────────── */
  var S = {
    open: false,
    tab: 'dashboard',
    vendorFilter: 'ALL',
    vendorSearch: '',
    perfSort: 'score',
    poFilter: 'ALL',
    poSearch: '',
    historySearch: '',
    pricingCategory: 'ALL',
    pricingSearch: '',
    supplierQbrFilter: 'ALL',
    savingsLeverFilter: 'ALL'
  };

  var root = null;

  /* ── Routing Resolution ──────────────────────────────────────────── */
  function tabFromHash(hash) {
    if (!hash) return null;
    var h = (hash.startsWith('#') ? hash.slice(1) : hash).toLowerCase();
    if (h.indexOf('report') >= 0 || h.indexOf('alert') >= 0 || h.indexOf('clinic') >= 0 || h.indexOf('pharmacy') >= 0 || h.indexOf('finance') >= 0 || h.indexOf('marketing') >= 0) {
      return null;
    }
    if (h === 'vendor-dashboard' || h === 'vendors-procurement' || h === 'vendor' || h === 'vendors' || h === 'procurement-dashboard') return 'dashboard';
    if (h === 'all-vendors' || h === 'vendors-list' || h === 'vendor-list') return 'all-vendors';
    if (h === 'vendor-performance' || h === 'vendor-sla') return 'vendor-perf';
    if (h === 'vendor-payments' || h === 'vendor-payment') return 'vendor-pay';
    if (h === 'purchase-orders' || h === 'purchase-order' || h === 'po') return 'purchase-orders';
    if (h === 'procurement' || h === 'requisitions') return 'procurement';
    if (h === 'purchase-history' || h === 'po-history') return 'purchase-history';
    if (h === 'supplier-pricing' || h === 'pricing') return 'supplier-pricing';
    if (h === 'supplier-performance' || h === 'supplier-perf') return 'supplier-perf';
    if (h === 'procurement-savings' || h === 'savings') return 'savings';
    return null;
  }

  function tabFromText(txt) {
    if (!txt) return null;
    var raw = txt.replace(/\s+/g, ' ').trim().toLowerCase();
    if (raw.indexOf('report') >= 0 || raw.indexOf('alert') >= 0 || raw.indexOf('finance') >= 0 || raw.indexOf('marketing') >= 0) return null;

    if (raw === 'vendor dashboard' || raw === 'vendors & procurement' || raw === 'vendors and procurement' || raw === 'vendor relations & procurement') return 'dashboard';
    if (raw === 'all vendors' || raw === 'vendor directory') return 'all-vendors';
    if (raw === 'vendor performance') return 'vendor-perf';
    if (raw === 'vendor payments') return 'vendor-pay';
    if (raw === 'purchase orders' || raw === 'purchase order') return 'purchase-orders';
    if (raw === 'procurement') return 'procurement';
    if (raw === 'purchase history') return 'purchase-history';
    if (raw === 'supplier pricing') return 'supplier-pricing';
    if (raw === 'supplier performance') return 'supplier-perf';
    if (raw === 'procurement savings') return 'savings';
    return null;
  }

  /* ── KPI Helper ──────────────────────────────────────────────────── */
  function kpiHtml(label, val, delta, trend, subtext, icon) {
    return [
      '<div class="zvp-kpi">',
        '<div class="zvp-kpi-top">',
          '<span class="zvp-kpi-label">' + esc(label) + '</span>',
          '<span class="zvp-kpi-icon">' + esc(icon || '🤝') + '</span>',
        '</div>',
        '<div class="zvp-kpi-val">' + esc(val) + '</div>',
        '<div class="zvp-kpi-bottom">',
          '<span class="zvp-delta ' + (trend === 'up' ? 'up' : trend === 'down' ? 'down' : 'warn') + '">' + (trend === 'up' ? '↑ ' : trend === 'down' ? '↓ ' : '• ') + esc(delta) + '</span>',
          '<span class="zvp-subtext">' + esc(subtext) + '</span>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Tab Renderers ───────────────────────────────────────────────── */
  function renderDashboard() {
    return [
      '<div class="zvp-kpi-grid">',
        kpiHtml('Active Suppliers', '0', '0.0%', 'neutral', 'No active records', '🏭'),
        kpiHtml('Open Purchase Orders', '₹0', '0.0%', 'neutral', 'No active records', '📑'),
        kpiHtml('Procurement Savings', '₹0', '0.0%', 'neutral', 'No active records', '💰'),
        kpiHtml('Vendor On-Time SLA', '0', '0.0%', 'neutral', 'No active records', '⏱️'),
        kpiHtml('3-Way Match Rate', '0', '0.0%', 'neutral', 'No active records', '🎯'),
        kpiHtml('Upcoming AP Payouts', '₹0', '0.0%', 'neutral', 'No active records', '💳'),
      '</div>',

      '<div class="zvp-grid-2">',
        '<div class="zvp-card">',
          '<div class="zvp-card-head">',
            '<div>',
              '<h3 class="zvp-card-title">🏢 Primary Pharmaceutical & Surgical Partners</h3>',
              '<p class="zvp-card-sub">Top suppliers driving 78% of Zenve Pets clinical inventory spend</p>',
            '</div>',
            '<button class="zvp-btn primary" onclick="ZenveVendorsDashboard.showPOModal()">+ New PO</button>',
          '</div>',
          '<div class="zvp-table-wrap">',
            '<table class="zvp-table">',
              '<thead><tr><th>Supplier</th><th>Category</th><th>Spend (YTD)</th><th>Active POs</th><th>Rating</th><th>Status</th></tr></thead>',
              '<tbody>',
                VENDORS.slice(0, 5).map(function (v) {
                  return '<tr>' +
                    '<td style="font-weight:600;color:var(--foreground,#0f172a);">' + esc(v.name) + '</td>' +
                    '<td style="color:var(--muted-foreground,#64748b);">' + esc(v.category) + '</td>' +
                    '<td style="font-family:monospace;font-weight:700;color:#34d399;">' + esc(v.spend) + '</td>' +
                    '<td style="color:var(--foreground,#334155);">' + esc(v.pos) + ' POs</td>' +
                    '<td><span class="zvp-tag purple">' + esc(v.rating) + '</span></td>' +
                    '<td><span class="zvp-tag green">' + esc(v.status) + '</span></td>' +
                  '</tr>';
                }).join(''),
              '</tbody>',
            '</table>',
          '</div>',
        '</div>',

        '<div class="zvp-card">',
          '<div class="zvp-card-head">',
            '<div>',
              '<h3 class="zvp-card-title">🔄 Active Procurement Pipeline</h3>',
              '<p class="zvp-card-sub">Requisition velocity and fulfillment milestones across all clinic hubs</p>',
            '</div>',
            '<button class="zvp-btn" onclick="ZenveVendorsDashboard.switchTab(\'procurement\')">View Requisitions</button>',
          '</div>',
          '<div style="display:grid;gap:10px;">',
            '<div class="zvp-pipeline-stage" style="border-left-color:#a78bfa;">',
              '<div style="display:flex;justify-content:space-between;font-size:12px;"><strong>Stage 1: Requisitions</strong><span style="color:#a78bfa;font-weight:700;">12 Requests · ₹18.4 L</span></div>',
              '<div style="font-size:11px;color:var(--muted-foreground,#64748b);">Surgery OT, Koramangala 24x7, and Central Hub approvals pending</div>',
            '</div>',
            '<div class="zvp-pipeline-stage" style="border-left-color:#38bdf8;">',
              '<div style="display:flex;justify-content:space-between;font-size:12px;"><strong>Stage 2: POs Issued & Dispatched</strong><span style="color:#38bdf8;font-weight:700;">18 POs · ₹34.8 L</span></div>',
              '<div style="font-size:11px;color:var(--muted-foreground,#64748b);">Direct-to-hub shipments in transit from Mumbai, Bengaluru, and Hyderabad</div>',
            '</div>',
            '<div class="zvp-pipeline-stage" style="border-left-color:#34d399;">',
              '<div style="display:flex;justify-content:space-between;font-size:12px;"><strong>Stage 3: GRN Verification & 3-Way Match</strong><span style="color:#34d399;font-weight:700;">14 POs · ₹28.4 L</span></div>',
              '<div style="font-size:11px;color:var(--muted-foreground,#64748b);">Barcode scanned, cold chain integrity verified (2°C - 8°C), invoice matched</div>',
            '</div>',
          '</div>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderAllVendors() {
    var search = S.vendorSearch.toLowerCase();
    var filtered = VENDORS.filter(function (v) {
      if (S.vendorFilter !== 'ALL' && v.status !== S.vendorFilter) return false;
      if (search && (v.name.toLowerCase().indexOf(search) === -1 && v.category.toLowerCase().indexOf(search) === -1 && v.city.toLowerCase().indexOf(search) === -1 && v.gstin.toLowerCase().indexOf(search) === -1)) return false;
      return true;
    });

    return [
      '<div class="zvp-kpi-grid">',
        kpiHtml('Registered Vendors', '0', '0.0%', 'neutral', 'No active records', '🏭'),
        kpiHtml('Preferred AAA Vendors', '0', '0.0%', 'neutral', 'No active records', '⭐'),
        kpiHtml('Active Geographies', '0', '0.0%', 'neutral', 'No active records', '📍'),
        kpiHtml('Avg. Supplier Tenure', '0', '0.0%', 'neutral', 'No active records', '🤝'),
      '</div>',

      '<div class="zvp-card">',
        '<div class="zvp-card-head">',
          '<div>',
            '<h3 class="zvp-card-title">🏭 Verified Supplier Directory</h3>',
            '<p class="zvp-card-sub">Master vendor records with GSTIN verification, contact leads, spend and SLA rating</p>',
          '</div>',
          '<div class="zvp-filter-row">',
            '<input type="text" class="zvp-input" placeholder="Search supplier, GSTIN, city..." value="' + esc(S.vendorSearch) + '" oninput="ZenveVendorsDashboard.setVendorSearch(this.value)" />',
            '<select class="zvp-select" onchange="ZenveVendorsDashboard.setVendorFilter(this.value)">',
              '<option value="ALL"' + (S.vendorFilter === 'ALL' ? ' selected' : '') + '>All Statuses</option>',
              '<option value="Preferred"' + (S.vendorFilter === 'Preferred' ? ' selected' : '') + '>Preferred</option>',
              '<option value="Active"' + (S.vendorFilter === 'Active' ? ' selected' : '') + '>Active</option>',
            '</select>',
            '<button class="zvp-btn primary" onclick="ZenveVendorsDashboard.showRegisterVendorModal()">+ Register Vendor</button>',
          '</div>',
        '</div>',

        '<div class="zvp-table-wrap">',
          '<table class="zvp-table">',
            '<thead><tr><th>Vendor ID</th><th>Company Name</th><th>GSTIN</th><th>Category</th><th>Key Contact</th><th>Hub City</th><th>Spend (YTD)</th><th>Rating</th><th>Status</th></tr></thead>',
            '<tbody>',
              filtered.map(function (v) {
                return '<tr>' +
                  '<td style="font-family:monospace;color:#38bdf8;font-size:11px;">' + esc(v.id) + '</td>' +
                  '<td style="font-weight:600;color:var(--foreground,#0f172a);">' + esc(v.name) + '</td>' +
                  '<td style="font-family:monospace;color:var(--muted-foreground,#64748b);font-size:11px;">' + esc(v.gstin) + '</td>' +
                  '<td style="color:var(--foreground,#334155);">' + esc(v.category) + '</td>' +
                  '<td style="color:var(--muted-foreground,#64748b);">' + esc(v.contact) + '</td>' +
                  '<td style="color:var(--foreground,#334155);">' + esc(v.city) + '</td>' +
                  '<td style="font-family:monospace;font-weight:700;color:#34d399;">' + esc(v.spend) + '</td>' +
                  '<td><span class="zvp-tag purple">' + esc(v.rating) + '</span></td>' +
                  '<td><span class="zvp-tag ' + (v.status === 'Preferred' ? 'green' : 'blue') + '">' + esc(v.status) + '</span></td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderVendorPerformance() {
    var sorted = VENDORS.slice().sort(function (a, b) {
      return b[S.perfSort] - a[S.perfSort];
    });

    return [
      '<div class="zvp-kpi-grid">',
        kpiHtml('Avg. On-Time Delivery', '0', '0.0%', 'neutral', 'No active records', '⏱️'),
        kpiHtml('Avg. Fill Rate', '0', '0.0%', 'neutral', 'No active records', '📦'),
        kpiHtml('Avg. Quality Defect Rate', '0', '0.0%', 'neutral', 'No active records', '🎯'),
        kpiHtml('Avg. Order Lead Time', '0', '0.0%', 'neutral', 'No active records', '🚛'),
        kpiHtml('Top Tier SLA Score', '0', '0.0%', 'neutral', 'No active records', '⭐'),
        kpiHtml('Below Target Vendors', '0', '0.0%', 'neutral', 'No active records', '⚠️'),
      '</div>',

      '<div class="zvp-card">',
        '<div class="zvp-card-head">',
          '<div>',
            '<h3 class="zvp-card-title">📊 Vendor Composite Scoreboard</h3>',
            '<p class="zvp-card-sub">Composite Score = On-Time Delivery (35%) + Quality (30%) + Fill Rate (25%) + Regulatory Compliance (10%)</p>',
          '</div>',
          '<div class="zvp-filter-row">',
            '<span style="font-size:12px;color:var(--muted-foreground,#64748b);">Sort by:</span>',
            '<button class="zvp-btn ' + (S.perfSort === 'score' ? 'primary' : '') + '" onclick="ZenveVendorsDashboard.setPerfSort(\'score\')">Composite Score</button>',
            '<button class="zvp-btn ' + (S.perfSort === 'onTime' ? 'primary' : '') + '" onclick="ZenveVendorsDashboard.setPerfSort(\'onTime\')">On-Time %</button>',
            '<button class="zvp-btn ' + (S.perfSort === 'quality' ? 'primary' : '') + '" onclick="ZenveVendorsDashboard.setPerfSort(\'quality\')">Quality %</button>',
            '<button class="zvp-btn ' + (S.perfSort === 'fillRate' ? 'primary' : '') + '" onclick="ZenveVendorsDashboard.setPerfSort(\'fillRate\')">Fill Rate %</button>',
          '</div>',
        '</div>',

        '<div class="zvp-table-wrap">',
          '<table class="zvp-table">',
            '<thead><tr><th>Vendor Name</th><th>Category</th><th>On-Time %</th><th>Quality %</th><th>Fill Rate %</th><th>Composite Score</th><th>Rating</th><th>SLA Action</th></tr></thead>',
            '<tbody>',
              sorted.map(function (v) {
                var scoreColor = v.score >= 98 ? '#34d399' : v.score >= 95 ? '#38bdf8' : '#fbbf24';
                return '<tr>' +
                  '<td style="font-weight:600;color:var(--foreground,#0f172a);">' + esc(v.name) + '</td>' +
                  '<td style="color:var(--muted-foreground,#64748b);">' + esc(v.category) + '</td>' +
                  '<td style="font-weight:700;color:var(--foreground,#334155);">' + esc(v.onTime) + '%</td>' +
                  '<td style="font-weight:700;color:var(--foreground,#334155);">' + esc(v.quality) + '%</td>' +
                  '<td style="font-weight:700;color:var(--foreground,#334155);">' + esc(v.fillRate) + '%</td>' +
                  '<td style="font-family:monospace;font-size:13px;font-weight:800;color:' + scoreColor + ';">' + esc(v.score) + ' / 100</td>' +
                  '<td><span class="zvp-tag purple">' + esc(v.rating) + '</span></td>' +
                  '<td><button class="zvp-btn" style="height:26px;padding:2px 8px;font-size:11px;" onclick="alert(\'Detailed scorecard audit for ' + esc(v.name) + ' generated.\')">Audit Review</button></td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderVendorPayments() {
    return [
      '<div class="zvp-kpi-grid">',
        kpiHtml('Total Outstanding AP', '₹0', '0.0%', 'neutral', 'No active records', '💳'),
        kpiHtml('Due This Week (<7d)', '₹0', '0.0%', 'neutral', 'No active records', '⏳'),
        kpiHtml('Cash Discounts Captured', '₹0', '0.0%', 'neutral', 'No active records', '⚡'),
        kpiHtml('Avg. Payment Cycle (DPO)', '0', '0.0%', 'neutral', 'No active records', '⏱️'),
        kpiHtml('Electronic Payment SLA', '0', '0.0%', 'neutral', 'No active records', '🏦'),
        kpiHtml('Pending 3-Way Match', '₹0', '0.0%', 'neutral', 'No active records', '📑'),
      '</div>',

      '<div class="zvp-card">',
        '<div class="zvp-card-head">',
          '<div>',
            '<h3 class="zvp-card-title">💳 Accounts Payable & Disbursement Schedule</h3>',
            '<p class="zvp-card-sub">Verified vendor tax invoices, contractual credit terms, and cash discount realization</p>',
          '</div>',
          '<button class="zvp-btn success" onclick="alert(\'Initiating HDFC CMS batch payout for scheduled invoices (₹9,97,000)...\')">⚡ Authorize Batch Payout</button>',
        '</div>',

        '<div class="zvp-table-wrap">',
          '<table class="zvp-table">',
            '<thead><tr><th>Invoice No</th><th>Vendor Name</th><th>PO Ref</th><th>Invoice Amount</th><th>Due Date</th><th>Cash Discount</th><th>Credit Terms</th><th>Bank UTR / Rail</th><th>Status</th></tr></thead>',
            '<tbody>',
              PAYMENTS.map(function (p) {
                return '<tr>' +
                  '<td style="font-family:monospace;color:#38bdf8;font-size:11px;font-weight:600;">' + esc(p.invoiceNo) + '</td>' +
                  '<td style="font-weight:600;color:var(--foreground,#0f172a);">' + esc(p.vendor) + '</td>' +
                  '<td style="font-family:monospace;color:var(--muted-foreground,#64748b);font-size:11px;">' + esc(p.poRef) + '</td>' +
                  '<td style="font-family:monospace;font-weight:700;color:var(--foreground,#0f172a);">' + esc(p.amount) + '</td>' +
                  '<td style="color:var(--foreground,#334155);">' + esc(p.dueDate) + '</td>' +
                  '<td style="color:#34d399;font-weight:600;">' + esc(p.cashDiscount) + '</td>' +
                  '<td style="color:var(--muted-foreground,#64748b);">' + esc(p.terms) + '</td>' +
                  '<td style="font-family:monospace;color:#a78bfa;font-size:11px;">' + esc(p.bankRef) + '</td>' +
                  '<td><span class="zvp-tag ' + (p.status === 'Scheduled' ? 'blue' : p.status === 'Approved' ? 'green' : 'amber') + '">' + esc(p.status) + '</span></td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderPurchaseOrders() {
    var search = S.poSearch.toLowerCase();
    var filtered = PURCHASE_ORDERS.filter(function (po) {
      if (S.poFilter !== 'ALL' && po.status !== S.poFilter) return false;
      if (search && (po.poNumber.toLowerCase().indexOf(search) === -1 && po.vendor.toLowerCase().indexOf(search) === -1 && po.items.toLowerCase().indexOf(search) === -1 && po.clinicHub.toLowerCase().indexOf(search) === -1)) return false;
      return true;
    });

    return [
      '<div class="zvp-kpi-grid">',
        kpiHtml('Open Purchase Orders', '18 Active POs', '₹34.80 L total value', 'up', 'October procurement pipeline', '📑'),
        kpiHtml('POs in Transit', '0', '0.0%', 'neutral', 'No active records', '🚛'),
        kpiHtml('GRN Verified (MTD)', '0', '0.0%', 'neutral', 'No active records', '✅'),
        kpiHtml('Urgent OT Ortho Orders', '0', '0.0%', 'neutral', 'No active records', '🚨'),
        kpiHtml('Avg. Approval Duration', '0', '0.0%', 'neutral', 'No active records', '⏱️'),
        kpiHtml('Fulfillment Accuracy', '0', '0.0%', 'neutral', 'No active records', '🎯'),
      '</div>',

      '<div class="zvp-card">',
        '<div class="zvp-card-head">',
          '<div>',
            '<h3 class="zvp-card-title">📑 Purchase Order Ledger & Tracking</h3>',
            '<p class="zvp-card-sub">Live status of orders issued to pharmaceutical, dietary, and surgical implant vendors</p>',
          '</div>',
          '<div class="zvp-filter-row">',
            '<input type="text" class="zvp-input" placeholder="Search PO, vendor, item, hub..." value="' + esc(S.poSearch) + '" oninput="ZenveVendorsDashboard.setPoSearch(this.value)" />',
            '<select class="zvp-select" onchange="ZenveVendorsDashboard.setPoFilter(this.value)">',
              '<option value="ALL"' + (S.poFilter === 'ALL' ? ' selected' : '') + '>All Statuses</option>',
              '<option value="Dispatched"' + (S.poFilter === 'Dispatched' ? ' selected' : '') + '>Dispatched</option>',
              '<option value="Approved"' + (S.poFilter === 'Approved' ? ' selected' : '') + '>Approved</option>',
              '<option value="GRN Verified"' + (S.poFilter === 'GRN Verified' ? ' selected' : '') + '>GRN Verified</option>',
              '<option value="Fulfilled"' + (S.poFilter === 'Fulfilled' ? ' selected' : '') + '>Fulfilled</option>',
            '</select>',
            '<button class="zvp-btn primary" onclick="ZenveVendorsDashboard.showPOModal()">+ Create PO</button>',
          '</div>',
        '</div>',

        '<div class="zvp-table-wrap">',
          '<table class="zvp-table">',
            '<thead><tr><th>PO Number</th><th>Vendor Name</th><th>Line Items Description</th><th>Total Value</th><th>Created Date</th><th>Delivery ETA</th><th>Receiving Hub</th><th>Priority</th><th>Status</th></tr></thead>',
            '<tbody>',
              filtered.map(function (po) {
                var priColor = po.priority === 'Critical' ? 'red' : po.priority === 'High' ? 'amber' : 'gray';
                var statColor = po.status === 'Fulfilled' ? 'green' : po.status === 'Dispatched' ? 'blue' : po.status === 'GRN Verified' ? 'purple' : 'amber';
                return '<tr>' +
                  '<td style="font-family:monospace;color:#38bdf8;font-size:11px;font-weight:600;">' + esc(po.poNumber) + '</td>' +
                  '<td style="font-weight:600;color:var(--foreground,#0f172a);">' + esc(po.vendor) + '</td>' +
                  '<td style="color:var(--foreground,#334155);">' + esc(po.items) + '</td>' +
                  '<td style="font-family:monospace;font-weight:700;color:#34d399;">' + esc(po.amount) + '</td>' +
                  '<td style="color:var(--muted-foreground,#64748b);font-size:11px;">' + esc(po.createdDate) + '</td>' +
                  '<td style="color:var(--foreground,#334155);font-weight:500;">' + esc(po.deliveryEta) + '</td>' +
                  '<td style="color:var(--muted-foreground,#64748b);">' + esc(po.clinicHub) + '</td>' +
                  '<td><span class="zvp-tag ' + priColor + '">' + esc(po.priority) + '</span></td>' +
                  '<td><span class="zvp-tag ' + statColor + '">' + esc(po.status) + '</span></td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderProcurement() {
    return [
      '<div class="zvp-kpi-grid">',
        kpiHtml('Total Requisitions', '0', '0.0%', 'neutral', 'No active records', '📋'),
        kpiHtml('POs Issued (MTD)', '0', '0.0%', 'neutral', 'No active records', '📑'),
        kpiHtml('Requisition to PO Time', '0', '0.0%', 'neutral', 'No active records', '⏱️'),
        kpiHtml('3-Way Match Rate', '0', '0.0%', 'neutral', 'No active records', '🎯'),
        kpiHtml('Urgent Requisitions', '0', '0.0%', 'neutral', 'No active records', '🚨'),
        kpiHtml('Cycle Cost Savings', '₹0', '0.0%', 'neutral', 'No active records', '💰'),
      '</div>',

      '<div class="zvp-card">',
        '<div class="zvp-card-head">',
          '<div>',
            '<h3 class="zvp-card-title">📋 Active Department Requisitions</h3>',
            '<p class="zvp-card-sub">Clinical departments and pharmacy hub requests undergoing procurement review</p>',
          '</div>',
          '<button class="zvp-btn primary" onclick="ZenveVendorsDashboard.showRequisitionModal()">+ New Requisition</button>',
        '</div>',

        '<div class="zvp-table-wrap">',
          '<table class="zvp-table">',
            '<thead><tr><th>Req ID</th><th>Department</th><th>Requested Item</th><th>Qty</th><th>Urgency</th><th>Requested By</th><th>Created</th><th>Status</th><th>Action</th></tr></thead>',
            '<tbody>',
              REQUISITIONS.map(function (r) {
                var urgClass = r.urgency === 'Critical' ? 'red' : r.urgency === 'High' ? 'amber' : r.urgency === 'Medium' ? 'blue' : 'gray';
                return '<tr>' +
                  '<td style="font-family:monospace;color:#38bdf8;font-size:11px;font-weight:600;">' + esc(r.id) + '</td>' +
                  '<td style="font-weight:500;color:var(--foreground,#334155);">' + esc(r.department) + '</td>' +
                  '<td style="font-weight:600;color:var(--foreground,#0f172a);">' + esc(r.item) + '</td>' +
                  '<td style="color:var(--muted-foreground,#64748b);">' + esc(r.qty) + '</td>' +
                  '<td><span class="zvp-tag ' + urgClass + '">' + esc(r.urgency) + '</span></td>' +
                  '<td style="color:var(--foreground,#334155);">' + esc(r.requestedBy) + '</td>' +
                  '<td style="color:var(--muted-foreground,#64748b);font-size:11px;">' + esc(r.created) + '</td>' +
                  '<td><span class="zvp-tag ' + (r.status === 'Received' ? 'green' : r.status === 'PO Raised' ? 'blue' : 'purple') + '">' + esc(r.status) + '</span></td>' +
                  '<td><button class="zvp-btn" style="height:26px;padding:2px 8px;font-size:11px;" onclick="alert(\'Requisition ' + esc(r.id) + ' approved and routed to PO creation.\')">Approve</button></td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderPurchaseHistory() {
    return [
      '<div class="zvp-kpi-grid">',
        kpiHtml('Cumulative Spend (FYTD)', '₹0', '0.0%', 'neutral', 'No active records', '💰'),
        kpiHtml('Fulfilled Orders', '0', '0.0%', 'neutral', 'No active records', '📦'),
        kpiHtml('Avg. Order Ticket', '₹0', '0.0%', 'neutral', 'No active records', '📊'),
        kpiHtml('Historical Fulfillment SLA', '0', '0.0%', 'neutral', 'No active records', '⏱️'),
        kpiHtml('Invoice Match Accuracy', '0', '0.0%', 'neutral', 'No active records', '🛡️'),
        kpiHtml('Direct Manufacturer Mix', '0', '0.0%', 'neutral', 'No active records', '🏭'),
      '</div>',

      '<div class="zvp-card">',
        '<div class="zvp-card-head">',
          '<div>',
            '<h3 class="zvp-card-title">📜 Fulfilled Purchase Order Ledger & Audit Archive</h3>',
            '<p class="zvp-card-sub">Historical PO records with delivery locations, invoice audit numbers, and settlement dates</p>',
          '</div>',
          '<button class="zvp-btn" onclick="alert(\'Exporting full FYTD purchase history ledger (CSV)...\')">📥 Export Audit CSV</button>',
        '</div>',

        '<div class="zvp-table-wrap">',
          '<table class="zvp-table">',
            '<thead><tr><th>PO Number</th><th>Vendor Name</th><th>Category</th><th>Order Value</th><th>Delivered Date</th><th>Receiving Hub</th><th>Invoice Ref</th><th>Paid Date</th><th>Status</th></tr></thead>',
            '<tbody>',
              [
                { po: 'PO-2026-0914', v: 'MSD Animal Health India', cat: 'Vaccines & Biologics', val: '₹4,85,000', del: '2026-09-28', hub: 'Koramangala Hub', inv: 'INV-MSD-9481', paid: '2026-10-02' },
                { po: 'PO-2026-0882', v: 'Synthes Vet India', cat: 'Surgical Implants', val: '₹3,40,000', del: '2026-09-22', hub: 'Bandra OT Hub', inv: 'INV-SYN-3301', paid: '2026-09-29' },
                { po: 'PO-2026-0850', v: 'Boehringer Ingelheim Vet', cat: 'Rx Pharmaceuticals', val: '₹5,12,000', del: '2026-09-18', hub: 'Whitefield Hub', inv: 'INV-BI-8820', paid: '2026-09-25' },
                { po: 'PO-2026-0819', v: 'Zoetis India Ltd.', cat: 'Broad Spectrum Rx', val: '₹3,95,000', del: '2026-09-10', hub: 'Okhla Hub', inv: 'INV-ZOE-4112', paid: '2026-09-19' },
                { po: 'PO-2026-0790', v: "Hill's Pet Nutrition", cat: 'Rx Diet Foods', val: '₹2,60,000', del: '2026-08-30', hub: 'Koramangala Hub', inv: 'INV-HIL-7740', paid: '2026-09-08' },
                { po: 'PO-2026-0745', v: 'Royal Canin India', cat: 'Veterinary Nutrition', val: '₹4,10,000', del: '2026-08-22', hub: 'Andheri Hub', inv: 'INV-RC-5520', paid: '2026-08-31' },
                { po: 'PO-2026-0710', v: 'Virbac India Pvt. Ltd.', cat: 'Dental & Dermatology', val: '₹2,15,000', del: '2026-08-14', hub: 'Indiranagar Hub', inv: 'INV-VIR-3921', paid: '2026-08-24' }
              ].map(function (h) {
                return '<tr>' +
                  '<td style="font-family:monospace;color:#38bdf8;font-size:11px;font-weight:600;">' + esc(h.po) + '</td>' +
                  '<td style="font-weight:600;color:var(--foreground,#0f172a);">' + esc(h.v) + '</td>' +
                  '<td style="color:var(--muted-foreground,#64748b);">' + esc(h.cat) + '</td>' +
                  '<td style="font-family:monospace;font-weight:700;color:#34d399;">' + esc(h.val) + '</td>' +
                  '<td style="color:var(--foreground,#334155);">' + esc(h.del) + '</td>' +
                  '<td style="color:var(--muted-foreground,#64748b);">' + esc(h.hub) + '</td>' +
                  '<td style="font-family:monospace;color:#a78bfa;font-size:11px;">' + esc(h.inv) + '</td>' +
                  '<td style="color:#64748b;font-size:11px;">' + esc(h.paid) + '</td>' +
                  '<td><span class="zvp-tag green">Fulfilled</span></td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderSupplierPricing() {
    var skus = [];

    return [
      '<div class="zvp-kpi-grid">',
        kpiHtml('Contracted SKUs', '0', '0.0%', 'neutral', 'No active records', '📋'),
        kpiHtml('Avg. Discount vs MSRP', '0', '0.0%', 'neutral', 'No active records', '🏷️'),
        kpiHtml('Active Price Locks', '0', '0.0%', 'neutral', 'No active records', '🔒'),
        kpiHtml('Price Reviews Due (<60d)', '0', '0.0%', 'neutral', 'No active records', '⏳'),
        kpiHtml('Generic Arbitrage Margin', '0', '0.0%', 'neutral', 'No active records', '💊'),
        kpiHtml('Volume Rebates Earned', '₹0', '0.0%', 'neutral', 'No active records', '💵'),
      '</div>',

      '<div class="zvp-card">',
        '<div class="zvp-card-head">',
          '<div>',
            '<h3 class="zvp-card-title">🏷️ Master SKU Price Schedule & MSRP Benchmarking</h3>',
            '<p class="zvp-card-sub">Live contracted prices compared to market MSRP, MOQ thresholds, and price lock validity</p>',
          '</div>',
          '<button class="zvp-btn primary" onclick="alert(\'Benchmark pricing scan initiated across 5,000+ national veterinary SKUs.\')">⚖️ Benchmark Scan</button>',
        '</div>',

        '<div class="zvp-table-wrap">',
          '<table class="zvp-table">',
            '<thead><tr><th>SKU Code</th><th>Product Description</th><th>Vendor</th><th>Category</th><th>MSRP List</th><th>Contracted</th><th>Discount %</th><th>MOQ</th><th>Price Lock Until</th><th>Parity Status</th></tr></thead>',
            '<tbody>',
              (skus.length ? skus.map(function (s) {
                var pColor = s.parity === 'Best Price' ? 'green' : s.parity === 'Exclusive' ? 'purple' : s.parity === 'Review Due' ? 'amber' : 'blue';
                return '<tr>' +
                  '<td style="font-family:monospace;color:#38bdf8;font-size:11px;">' + esc(s.sku) + '</td>' +
                  '<td style="font-weight:600;color:var(--foreground,#0f172a);">' + esc(s.name) + '</td>' +
                  '<td style="color:var(--foreground,#334155);">' + esc(s.vendor) + '</td>' +
                  '<td style="color:var(--muted-foreground,#64748b);">' + esc(s.cat) + '</td>' +
                  '<td style="color:#64748b;text-decoration:line-through;">' + esc(s.msrp) + '</td>' +
                  '<td style="font-family:monospace;font-weight:700;color:#34d399;">' + esc(s.contracted) + '</td>' +
                  '<td style="font-weight:700;color:#a78bfa;">-' + esc(s.disc) + '</td>' +
                  '<td style="color:var(--foreground,#334155);">' + esc(s.moq) + '</td>' +
                  '<td style="color:#64748b;font-size:11px;">' + esc(s.lock) + '</td>' +
                  '<td><span class="zvp-tag ' + pColor + '">' + esc(s.parity) + '</span></td>' +
                '</tr>';
              }).join('') : '<tr><td colspan="10" style="text-align:center;padding:24px;color:#94a3b8;">No contracted SKU pricing records found</td></tr>'),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderSupplierPerformance() {
    var supList = [];

    return [
      '<div class="zvp-kpi-grid">',
        kpiHtml('Network OTIF Delivery Rate', '0', '0.0%', 'neutral', 'No active records', '⏱️'),
        kpiHtml('Cold-Chain Compliance', '0', '0.0%', 'neutral', 'No active records', '❄️'),
        kpiHtml('Avg. Defect PPM', '0', '0.0%', 'neutral', 'No active records', '🛡️'),
        kpiHtml('Invoice Match Accuracy', '0', '0.0%', 'neutral', 'No active records', '📑'),
        kpiHtml('Strategic Tier 1 Partners', '0', '0.0%', 'neutral', 'No active records', '⭐'),
        kpiHtml('Audit Certifications', '100% Passed', '8 of 8 certified', 'up', 'WHO-GMP & ISO 13485', '📜'),
      '</div>',

      '<div class="zvp-card">',
        '<div class="zvp-card-head">',
          '<div>',
            '<h3 class="zvp-card-title">🎯 Supplier Quality Engineering & Regulatory Scorecards</h3>',
            '<p class="zvp-card-sub">Fulfillment reliability, cold-chain temperature logger integrity, and defect PPM tracking</p>',
          '</div>',
          '<button class="zvp-btn" onclick="alert(\'Scheduling Q4 Supplier Quality Audit Review...\')">🩺 Schedule QBR Audit</button>',
        '</div>',

        '<div class="zvp-table-wrap">',
          '<table class="zvp-table">',
            '<thead><tr><th>ID</th><th>Supplier Name</th><th>QBR Tier</th><th>OTIF Rate</th><th>Cold Chain SLA</th><th>Defect PPM</th><th>Invoice Match</th><th>Lead Time</th><th>GMP & Certifications</th><th>Status</th></tr></thead>',
            '<tbody>',
              (supList.length ? supList.map(function (s) {
                return '<tr>' +
                  '<td style="font-family:monospace;color:#38bdf8;font-size:11px;">' + esc(s.id) + '</td>' +
                  '<td style="font-weight:600;color:var(--foreground,#0f172a);">' + esc(s.name) + '</td>' +
                  '<td style="color:#a78bfa;font-weight:600;">' + esc(s.tier) + '</td>' +
                  '<td style="font-weight:700;color:#34d399;">' + esc(s.otif) + '%</td>' +
                  '<td style="color:#38bdf8;">' + esc(s.coldChain) + '%</td>' +
                  '<td style="font-family:monospace;color:#34d399;">' + esc(s.ppm) + ' PPM</td>' +
                  '<td style="color:var(--foreground,#334155);">' + esc(s.invAcc) + '%</td>' +
                  '<td style="color:var(--foreground,#334155);">' + esc(s.lead) + ' days</td>' +
                  '<td style="color:var(--muted-foreground,#64748b);font-size:11px;">' + esc(s.cert) + '</td>' +
                  '<td><span class="zvp-tag ' + (s.status === 'Excellent' ? 'green' : s.status === 'Good' ? 'blue' : 'amber') + '">' + esc(s.status) + '</span></td>' +
                '</tr>';
              }).join('') : '<tr><td colspan="10" style="text-align:center;padding:24px;color:#94a3b8;">No supplier scorecards found</td></tr>'),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderSavings() {
    var levers = [];

    return [
      '<div class="zvp-kpi-grid">',
        kpiHtml('Realized Savings (FYTD)', '₹0', '0.0%', 'neutral', 'No active records', '💰'),
        kpiHtml('Savings % of Spend', '0', '0.0%', 'neutral', 'No active records', '📉'),
        kpiHtml('Cost Avoidance (Inflation)', '₹0', '0.0%', 'neutral', 'No active records', '🛡️'),
        kpiHtml('Generic Substitution Arbitrage', '₹0', '0.0%', 'neutral', 'No active records', '💊'),
        kpiHtml('Early Pay Discounts Captured', '₹0', '0.0%', 'neutral', 'No active records', '⚡'),
        kpiHtml('Savings in Pipeline (H2)', '₹0', '0.0%', 'neutral', 'No active records', '🎯'),
      '</div>',

      '<div class="zvp-card">',
        '<h3 class="zvp-card-title" style="margin-bottom:16px;">🎯 Procurement Savings by Strategic Lever</h3>',
        '<div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(240px, 1fr));gap:14px;">',
          (levers.length ? levers.map(function (l) {
            return '<div style="background:rgba(0,0,0,0.25);border:1px solid rgba(255,255,255,0.06);border-radius:10px;padding:16px;">' +
              '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">' +
                '<strong style="font-size:13px;color:var(--foreground,#0f172a);">' + esc(l.lever) + '</strong>' +
                '<span style="font-size:11px;font-weight:700;color:' + l.color + ';">' + esc(l.achievement) + '</span>' +
              '</div>' +
              '<div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:8px;">' +
                '<span style="font-size:20px;font-weight:800;color:' + l.color + ';">' + esc(l.realized) + '</span>' +
                '<span style="font-size:11px;color:#64748b;">Target: ' + esc(l.target) + '</span>' +
              '</div>' +
              '<p style="margin:0;font-size:11px;color:var(--muted-foreground,#64748b);line-height:1.4;">' + esc(l.desc) + '</p>' +
            '</div>';
          }).join('') : '<div style="text-align:center;padding:28px;color:#94a3b8;">No procurement savings levers found</div>'),
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Master Render Function ──────────────────────────────────────── */
  function render() {
    if (!root) return;
    var currentTab = TABS.find(function (t) { return t.id === S.tab; }) || TABS[0];

    var html = [
      '<header class="zvp-head">',
        '<div class="zvp-head-left">',
          '<div class="zvp-title-row">',
            '<h1 class="zvp-title">' + esc(currentTab.title) + '</h1>',
            '<span class="zvp-live-badge"><span class="zvp-pulse-dot"></span>' + esc(currentTab.badge) + '</span>',
          '</div>',
          '<p class="zvp-sub">' + esc(currentTab.sub) + '</p>',
        '</div>',
        '<div class="zvp-head-actions">',
          '<button class="zvp-btn" onclick="ZenveVendorsDashboard.showPOModal()">+ New PO</button>',
          '<button class="zvp-btn primary" onclick="ZenveVendorsDashboard.showRegisterVendorModal()">+ Register Vendor</button>',
          '<button class="zvp-btn" onclick="ZenveVendorsDashboard.close()">✕ Close</button>',
        '</div>',
      '</header>',

      '<nav class="zvp-tabs-bar">',
        TABS.map(function (t) {
          var active = t.id === S.tab ? ' active' : '';
          return '<button class="zvp-tab' + active + '" onclick="ZenveVendorsDashboard.switchTab(\'' + t.id + '\')">' +
            '<span>' + t.icon + '</span>' +
            '<span>' + esc(t.label) + '</span>' +
            '<span class="zvp-tab-badge">' + esc(t.badge) + '</span>' +
          '</button>';
        }).join(''),
      '</nav>',

      '<main class="zvp-body">'
    ];

    switch (S.tab) {
      case 'dashboard':        html.push(renderDashboard()); break;
      case 'all-vendors':      html.push(renderAllVendors()); break;
      case 'vendor-perf':      html.push(renderVendorPerformance()); break;
      case 'vendor-pay':       html.push(renderVendorPayments()); break;
      case 'purchase-orders':  html.push(renderPurchaseOrders()); break;
      case 'procurement':      html.push(renderProcurement()); break;
      case 'purchase-history': html.push(renderPurchaseHistory()); break;
      case 'supplier-pricing': html.push(renderSupplierPricing()); break;
      case 'supplier-perf':    html.push(renderSupplierPerformance()); break;
      case 'savings':          html.push(renderSavings()); break;
      default:                 html.push(renderDashboard());
    }

    html.push('</main>');
    root.innerHTML = html.join('');
  }

  /* ── Modals & Actions ────────────────────────────────────────────── */
  function showModal(contentHtml) {
    closeModal();
    var backdrop = document.createElement('div');
    backdrop.id = 'zvp-active-modal';
    backdrop.className = 'zvp-modal-backdrop';
    backdrop.innerHTML = '<div class="zvp-modal">' + contentHtml + '</div>';
    backdrop.onclick = function (e) {
      if (e.target === backdrop) closeModal();
    };
    document.body.appendChild(backdrop);
  }

  function closeModal() {
    var existing = document.getElementById('zvp-active-modal');
    if (existing) existing.remove();
  }

  function showPOModal() {
    var formHtml = [
      '<div class="zvp-modal-head">',
        '<h3 class="zvp-modal-title">📑 Issue New Purchase Order</h3>',
        '<button class="zvp-btn" onclick="ZenveVendorsDashboard.closeModal()">✕</button>',
      '</div>',
      '<form onsubmit="event.preventDefault(); alert(\'Purchase order successfully created, signed, and dispatched to supplier!\'); ZenveVendorsDashboard.closeModal();">',
        '<div class="zvp-form-group"><label>Supplier Name</label><select class="zvp-select">' +
          VENDORS.map(function(v){ return '<option>' + esc(v.name) + ' (' + esc(v.category) + ')</option>'; }).join('') +
        '</select></div>',
        '<div class="zvp-form-group"><label>Order Description / Line Items</label><input type="text" class="zvp-input" placeholder="e.g. 500 vials Nobivac DHPPi + 20 packs Bravecto" required /></div>',
        '<div class="zvp-form-row">',
          '<div class="zvp-form-group"><label>Total Order Value (INR)</label><input type="text" class="zvp-input" placeholder="₹1,85,000" required /></div>',
          '<div class="zvp-form-group"><label>Receiving Hub</label><select class="zvp-select"><option>Koramangala Central Hub</option><option>Bandra Specialty OT Hub</option><option>Whitefield Care Hub</option><option>Okhla Clinic Hub</option></select></div>',
        '</div>',
        '<div class="zvp-form-row">',
          '<div class="zvp-form-group"><label>Delivery ETA</label><input type="date" class="zvp-input" value="2026-10-12" required /></div>',
          '<div class="zvp-form-group"><label>Priority</label><select class="zvp-select"><option>High</option><option>Critical (Surgery OT)</option><option>Standard</option></select></div>',
        '</div>',
        '<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:16px;">',
          '<button type="button" class="zvp-btn" onclick="ZenveVendorsDashboard.closeModal()">Cancel</button>',
          '<button type="submit" class="zvp-btn primary">Issue & Sign PO</button>',
        '</div>',
      '</form>'
    ].join('');
    showModal(formHtml);
  }

  function showRegisterVendorModal() {
    var formHtml = [
      '<div class="zvp-modal-head">',
        '<h3 class="zvp-modal-title">🏭 Register New Supplier</h3>',
        '<button class="zvp-btn" onclick="ZenveVendorsDashboard.closeModal()">✕</button>',
      '</div>',
      '<form onsubmit="event.preventDefault(); alert(\'Vendor registration submitted. GSTIN verified and added to registry!\'); ZenveVendorsDashboard.closeModal();">',
        '<div class="zvp-form-group"><label>Company Legal Name</label><input type="text" class="zvp-input" placeholder="e.g. Abbott Animal Health India Pvt Ltd" required /></div>',
        '<div class="zvp-form-row">',
          '<div class="zvp-form-group"><label>GSTIN (15 Digits)</label><input type="text" class="zvp-input" placeholder="29AABCA1234F1Z5" required /></div>',
          '<div class="zvp-form-group"><label>Category</label><select class="zvp-select"><option>Vaccines & Biologics</option><option>Antiparasitic & Rx</option><option>Surgical Implants</option><option>Veterinary Nutrition</option><option>Diagnostics & Reagents</option></select></div>',
        '</div>',
        '<div class="zvp-form-row">',
          '<div class="zvp-form-group"><label>Key Contact Name</label><input type="text" class="zvp-input" placeholder="e.g. Ramesh Iyer" required /></div>',
          '<div class="zvp-form-group"><label>HQ City</label><input type="text" class="zvp-input" placeholder="e.g. Bengaluru" required /></div>',
        '</div>',
        '<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:16px;">',
          '<button type="button" class="zvp-btn" onclick="ZenveVendorsDashboard.closeModal()">Cancel</button>',
          '<button type="submit" class="zvp-btn primary">Complete Registration</button>',
        '</div>',
      '</form>'
    ].join('');
    showModal(formHtml);
  }

  function showRequisitionModal() {
    var formHtml = [
      '<div class="zvp-modal-head">',
        '<h3 class="zvp-modal-title">🔄 Submit Procurement Requisition</h3>',
        '<button class="zvp-btn" onclick="ZenveVendorsDashboard.closeModal()">✕</button>',
      '</div>',
      '<form onsubmit="event.preventDefault(); alert(\'Requisition submitted for medical director & finance review!\'); ZenveVendorsDashboard.closeModal();">',
        '<div class="zvp-form-group"><label>Department / Clinic</label><select class="zvp-select"><option>Surgery OT — Bandra Hub</option><option>Pharmacy — Koramangala 24x7</option><option>Clinical Pathology Lab — Andheri</option><option>Nutrition Counseling — Indiranagar</option></select></div>',
        '<div class="zvp-form-group"><label>Item Description</label><input type="text" class="zvp-input" placeholder="e.g. Orthopedic Titanium Bone Screws 2.4mm" required /></div>',
        '<div class="zvp-form-row">',
          '<div class="zvp-form-group"><label>Required Quantity</label><input type="text" class="zvp-input" placeholder="e.g. 50 units" required /></div>',
          '<div class="zvp-form-group"><label>Urgency Level</label><select class="zvp-select"><option>High</option><option>Critical (Surgery OT)</option><option>Medium</option><option>Low</option></select></div>',
        '</div>',
        '<div class="zvp-form-group"><label>Requested By</label><input type="text" class="zvp-input" placeholder="e.g. Dr. Vikram Singh" required /></div>',
        '<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:16px;">',
          '<button type="button" class="zvp-btn" onclick="ZenveVendorsDashboard.closeModal()">Cancel</button>',
          '<button type="submit" class="zvp-btn primary">Submit Requisition</button>',
        '</div>',
      '</form>'
    ].join('');
    showModal(formHtml);
  }

  /* ── Open & Close Mechanics ──────────────────────────────────────── */
  function build() {
    root = document.getElementById('zvp-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'zvp-root';
      root.className = 'zpanel-root';
      document.body.appendChild(root);
    }
  }

  function open(tab) {
    // Close any other active domain overlays
    ['zfa-root', 'zmkt-dashboard-root', 'zfsh-root', 'zod-root', 'zsd-root', 'zpid-root', 'zph-root', 'zch-root', 'zrep-root', 'zalt-root', 'zset-root', 'zhr-root', 'zsys-root'].forEach(function(id) {
      var el = document.getElementById(id);
      if (el) {
        el.classList.remove('zfa-open', 'zmkt-open', 'zfsh-open', 'zod-open', 'zsd-open', 'zpid-open', 'zph-open', 'zch-open', 'zrep-open', 'zalt-open', 'zset-open', 'zhr-open', 'zsys-open', 'zpanel-open');
        el.style.display = 'none';
      }
    });
    if (document.querySelectorAll) {
      document.querySelectorAll('.zpanel-root').forEach(function(el) {
        if (el.id !== 'zvp-root') {
          el.style.display = 'none';
          el.classList.remove('zfa-open', 'zmkt-open', 'zfsh-open', 'zod-open', 'zsd-open', 'zpid-open', 'zph-open', 'zch-open', 'zrep-open', 'zalt-open', 'zset-open', 'zhr-open', 'zsys-open', 'zpanel-open');
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
    root.classList.add('zvp-open', 'zpanel-open');
    try {
      document.documentElement.classList.remove('zfsh-locked', 'zalt-locked');
      document.body.classList.remove('zfsh-locked', 'zalt-locked');
      document.documentElement.classList.add('zvp-locked');
      document.body.classList.add('zvp-locked');
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
      root.classList.remove('zvp-open', 'zpanel-open');
      root.style.display = 'none';
    }
    try {
      document.documentElement.classList.remove('zvp-locked');
      document.body.classList.remove('zvp-locked');
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
      var otherDomains = ['sales', 'operations', 'inventory', 'pharmacy', 'clinics', 'doctors', 'reports', 'alerts', 'settings', 'finance', 'marketing', 'fashion'];
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

      var isSidebar = !!el.closest('aside, [class*="sidebar"]') && !el.closest('#zvp-root');
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
  window.ZenveVendorsDashboard = {
    open: open,
    close: close,
    switchTab: switchTab,
    closeModal: closeModal,
    showPOModal: showPOModal,
    showRegisterVendorModal: showRegisterVendorModal,
    showRequisitionModal: showRequisitionModal,
    setVendorSearch: function (q) { S.vendorSearch = q; render(); },
    setVendorFilter: function (f) { S.vendorFilter = f; render(); },
    setPerfSort: function (s) { S.perfSort = s; render(); },
    setPoSearch: function (q) { S.poSearch = q; render(); },
    setPoFilter: function (f) { S.poFilter = f; render(); }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initInterception);
  } else {
    initInterception();
  }
})();
