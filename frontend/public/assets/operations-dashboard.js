/* =====================================================================
   Zenve BI — Orders & Operations Control Center
   Unified Suite for:
     - Operations Dashboard (overview)
     - Order Management (management)
     - Order Status & Live Tracking (status)
     - Returns & Refunds (returns)
     - Cancellations (cancellations)
     - Delivery Performance (delivery)
     - 60-Minute Express Delivery (express)
   Self-contained, high-performance executive dashboard with offline fallback.
   ===================================================================== */
(function () {
  'use strict';

  var FALLBACK = '/api/v1/data';
  var STATIC_FALLBACK = '/assets/sample-fallback.json';

  var inr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
  var inrShort = function (n) {
    n = Number(n) || 0;
    if (n >= 1e7) return '₹' + (n / 1e7).toFixed(2) + ' Cr';
    if (n >= 1e5) return '₹' + (n / 1e5).toFixed(1) + ' L';
    if (n >= 1000) return '₹' + (n / 1000).toFixed(1) + 'K';
    return '₹' + n.toLocaleString('en-IN');
  };

  var TABS = [
    { id: 'all-orders',    label: 'All Orders',           icon: '📋', hash: '#all-orders', badge: '' },
    { id: 'overview',      label: 'Operations Dashboard', icon: '🎛️', hash: '#operations-dashboard', badge: '' },
    { id: 'management',    label: 'Order Management',     icon: '📦', hash: '#order-management', badge: '' },
    { id: 'status',        label: 'Order Status',         icon: '📍', hash: '#order-status', badge: '' },
    { id: 'returns',       label: 'Returns & Refunds',    icon: '🔄', hash: '#returns-refunds', badge: '' },
    { id: 'cancellations',  label: 'Cancellations',        icon: '🚫', hash: '#cancellations', badge: '' },
    { id: 'delivery',      label: 'Delivery Performance', icon: '🚚', hash: '#delivery-performance', badge: '' },
    { id: 'express',       label: '60-Minute Delivery',   icon: '⚡', hash: '#60-minute-delivery', badge: '', pulse: true }
  ];

  var HUBS = [
    { id: 'all', label: 'All Operations Hubs' },
    { id: 'bengaluru', label: 'Bengaluru Express Hub (Koramangala)' },
    { id: 'mumbai', label: 'Mumbai West Fulfillment (Bandra)' },
    { id: 'delhi', label: 'Delhi NCR Fulfillment (Okhla)' },
    { id: 'hyderabad', label: 'Hyderabad Central (Jubilee Hills)' },
    { id: 'pune', label: 'Pune Express Center (Koregaon)' }
  ];

  var RIDERS = [];

  var PET_PRODUCTS = [];

  /* Global Dashboard State */
  var S = {
    open: false,
    tab: 'overview',
    period: 'today',
    hub: 'all',
    statusFilter: 'all',
    speedFilter: 'all',
    searchQuery: '',
    rawSales: [],
    orders: [],
    selectedOrder: null,
    trackingOrderId: null,
    toastTimeout: null
  };

  var root = null;

  /* Helper functions */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function num(n) {
    n = Number(n);
    return isFinite(n) ? n : 0;
  }

  function showToast(msg) {
    var existing = document.getElementById('zod-toast');
    if (existing) existing.remove();
    if (S.toastTimeout) clearTimeout(S.toastTimeout);

    var toast = document.createElement('div');
    toast.id = 'zod-toast';
    toast.className = 'zod-toast';
    toast.innerHTML = '<span style="font-size:16px;">✓</span> <span>' + esc(msg) + '</span>';
    document.body.appendChild(toast);

    S.toastTimeout = setTimeout(function () {
      if (toast && toast.parentNode) toast.remove();
    }, 3200);
  }

  /* Synthetic generation to enrich raw sales with high-grade operational data */
  function enrichOrders(sales) {
    var list = sales || [];
    var hubsPool = ['bengaluru', 'mumbai', 'delhi', 'hyderabad', 'pune'];
    var speeds = ['60-Min Express', '60-Min Express', 'Same Day', 'Standard (2-Day)'];
    var statuses = ['Delivered', 'Delivered', 'Out for Delivery', 'Processing', 'Packed', 'Dispatched'];
    var returnReasons = [
      'Pet rejected flavor / formulation',
      'Incorrect size harness/accessory',
      'Veterinarian altered prescription',
      'Outer safety seal broken in transit',
      'Customer ordered duplicate by accident'
    ];
    var cancelReasons = [
      'Customer changed mind',
      'Found emergency clinic medication locally',
      'Estimated delivery time exceeded expectation',
      'Payment duplicate verification issue',
      'Wrong delivery address specified'
    ];

    var addresses = {
      bengaluru: ['100ft Road, Indiranagar', '5th Block, Koramangala', 'Sector 2, HSR Layout', 'Whitefield Main Rd', 'Lavelle Road'],
      mumbai: ['Linking Road, Bandra West', 'Juhu Tara Road', 'Powai Hiranandani', 'Colaba Causeway', 'Lokhandwala, Andheri W'],
      delhi: ['Hauz Khas Enclave', 'DLF Phase 5, Gurgaon', 'Greater Kailash II', 'Defence Colony', 'Vasant Vihar'],
      hyderabad: ['Road No. 36, Jubilee Hills', 'Banjara Hills Rd 12', 'Gachibowli Tech Zone', 'Madhapur', 'Kondapur'],
      pune: ['Koregaon Park North Main Rd', 'Kalyani Nagar', 'Aundh IT Corridor', 'Viman Nagar', 'Baner Road']
    };

    var petNames = ['Bruno (Golden Retriever)', 'Bella (Shih Tzu)', 'Milo (Beagle)', 'Leo (Persian Cat)', 'Simba (Labrador)', 'Coco (Indie Pup)', 'Rocky (German Shepherd)'];

    return list.map(function (s, idx) {
      var hIdx = idx % hubsPool.length;
      var hubKey = hubsPool[hIdx];
      var speed = (s.source && s.source.toLowerCase().indexOf('emergency') >= 0) ? '60-Min Express' : speeds[idx % speeds.length];
      var rider = RIDERS.length ? RIDERS[idx % RIDERS.length] : { name: '--', vehicle: '--' };
      var status = s.status === 'Cancelled' ? 'Cancelled' : (idx % 14 === 0 ? 'Returned' : statuses[idx % statuses.length]);
      var pet = petNames[idx % petNames.length];
      var addrList = addresses[hubKey] || addresses.bengaluru;
      var address = addrList[idx % addrList.length] + ', ' + (s.city || 'Bengaluru');
      var prod = PET_PRODUCTS.length ? PET_PRODUCTS[idx % PET_PRODUCTS.length] : { name: '--', cat: '--', price: 0 };
      var minRemaining = (speed === '60-Min Express' && (status === 'Out for Delivery' || status === 'Processing')) ? (12 + ((idx * 7) % 45)) : null;

      return {
        id: s.transaction_ref || ('ZV-' + (11500 + idx)),
        dbId: s.id,
        date: s.sold_at || new Date().toISOString(),
        customer: s.person || 'Customer',
        pet: pet,
        phone: '+91 98' + String(10000000 + ((idx * 9481) % 89999999)),
        address: address,
        city: s.city || 'Bengaluru',
        hub: hubKey,
        amount: num(s.amount) || prod.price,
        item: prod.name,
        category: s.source || prod.cat,
        status: status,
        speed: speed,
        rider: rider,
        minRemaining: minRemaining,
        slaStatus: minRemaining && minRemaining < 15 ? 'Critical (<15m)' : 'On Time',
        returnReason: status === 'Returned' ? returnReasons[idx % returnReasons.length] : null,
        cancelReason: status === 'Cancelled' ? cancelReasons[idx % cancelReasons.length] : null,
        refundMode: (status === 'Returned' || status === 'Cancelled') ? (idx % 2 === 0 ? 'Instant UPI' : 'Zenve Pet Wallet (+5% Cash)') : null,
        refundStatus: (status === 'Returned' || status === 'Cancelled') ? (idx % 3 === 0 ? 'Pending Approval' : 'Refund Completed') : null,
        trackingSteps: [
          { label: 'Order Received & Verified', time: '10:14 AM', done: true, desc: 'Digital order and prescription confirmed' },
          { label: 'Pharmacy QA & Cold Packing', time: '10:22 AM', done: true, desc: 'Insulin/Vaccine temperature locked at 4°C' },
          { label: 'Dispatched to Fleet Partner', time: '10:31 AM', done: status !== 'Processing', desc: 'Handed to ' + rider.name + ' (' + rider.vehicle + ')' },
          { label: 'Out for Delivery / In Transit', time: '10:38 AM', done: status === 'Out for Delivery' || status === 'Delivered', desc: 'Rider en-route (Speed: 28 km/h, 2.4 km away)' },
          { label: 'Delivered to Pet Parent', time: status === 'Delivered' ? '10:52 AM' : 'Expected 11:05 AM', done: status === 'Delivered', desc: status === 'Delivered' ? 'OTP verified at doorstep' : 'Pending OTP verification' }
        ]
      };
    });
  }

  /* ── Tab From Text / Hash ───────────────────────────────────────── */
  function tabFromText(text) {
    if (!text) return null;
    var s = text.trim().toLowerCase();
    // Exclude Logistics & Delivery subcategories completely
    if (s.indexOf('logistics') >= 0 ||
        s.indexOf('delivery order') >= 0 ||
        s.indexOf('delivery partner') >= 0 ||
        s.indexOf('delivery tracking') >= 0 ||
        s.indexOf('delivery sla') >= 0 ||
        s.indexOf('delivery cost') >= 0 ||
        s.indexOf('failed deliver') >= 0) return null;

    if (s === 'all orders' || s === 'all-orders' || s === 'all orders dashboard' || s === 'orders') return 'all-orders';
    if (s.indexOf('operations dashboard') >= 0 || s === 'operations') return 'overview';
    if (s.indexOf('order management') >= 0 || s === 'orders management' || s === 'manage orders') return 'management';
    if (s.indexOf('order status') >= 0 || s.indexOf('track order') >= 0 || s === 'tracking') return 'status';
    if (s.indexOf('returns & refunds') >= 0 || s.indexOf('returns') >= 0 || s.indexOf('refunds') >= 0) return 'returns';
    if (s.indexOf('cancellations') >= 0 || s.indexOf('cancellation') >= 0) return 'cancellations';
    // Match only if specifically under Orders context
    if (s === 'delivery performance' || s === 'ops delivery performance') return 'delivery';
    if (s === '60-minute delivery' || s === '60 min delivery' || s === 'express delivery') return 'express';
    return null;
  }

  function tabFromHash(hash) {
    if (!hash) return null;
    if (hash.indexOf('logistics') >= 0 ||
        hash.indexOf('delivery-orders') >= 0 ||
        hash.indexOf('delivery-partners') >= 0 ||
        hash.indexOf('delivery-tracking') >= 0 ||
        hash.indexOf('delivery-sla') >= 0 ||
        hash.indexOf('delivery-cost') >= 0 ||
        hash.indexOf('failed-deliveries') >= 0) return null;

    if (hash === '#all-orders' || hash === '#allorders' || hash === '#orders') return 'all-orders';
    if (hash === '#operations-dashboard' || hash === '#operations' || hash === '#ops') return 'overview';
    if (hash === '#order-management') return 'management';
    if (hash === '#order-status' || hash === '#tracking') return 'status';
    if (hash === '#returns-refunds' || hash === '#returns' || hash === '#refunds') return 'returns';
    if (hash === '#cancellations' || hash === '#cancelled') return 'cancellations';
    if (hash === '#delivery-performance' || hash === '#delivery') return 'delivery';
    if (hash === '#60-minute-delivery' || hash === '#express' || hash === '#60min') return 'express';
    return null;
  }

  function hashFromTab(tab) {
    var t = TABS.find(function (it) { return it.id === tab; });
    return t ? t.hash : '#operations-dashboard';
  }

  /* ── Data Filtering ─────────────────────────────────────────────── */
  function getFilteredOrders() {
    var q = (S.searchQuery || '').toLowerCase().trim();
    return S.orders.filter(function (o) {
      if (S.hub !== 'all' && o.hub !== S.hub) return false;
      if (S.statusFilter !== 'all' && o.status !== S.statusFilter) return false;
      if (S.speedFilter !== 'all' && o.speed !== S.speedFilter) return false;
      if (q) {
        var str = (o.id + ' ' + o.customer + ' ' + o.pet + ' ' + o.item + ' ' + o.city + ' ' + o.address + ' ' + o.rider.name).toLowerCase();
        if (str.indexOf(q) < 0) return false;
      }
      return true;
    });
  }

  /* ── Switch Tab / Open / Close ──────────────────────────────────── */
  function switchTab(newTab) {
    if (!newTab) return;
    S.tab = newTab;
    var targetHash = hashFromTab(newTab);
    try {
      if (location.hash !== targetHash) {
        history.pushState(null, '', targetHash);
      }
    } catch (e) { }
    markSidebar(true, newTab);
    renderAll();
  }

  function markSidebar(on, tab) {
    var targetTab = tab || S.tab || 'overview';
    document.querySelectorAll('.sidebar-scope li button, .sidebar-scope button, .sidebar-scope a').forEach(function (b) {
      var bTab = tabFromText(b.textContent ? b.textContent.trim() : '');
      if (bTab) {
        b.classList.toggle('zpanel-active', on && bTab === targetTab);
        b.classList.toggle('zsd-active', on && bTab === targetTab);
      }
    });
  }

  function open(tab) {
    if (window.ZenveSalesDashboard && typeof window.ZenveSalesDashboard.close === 'function') {
      try { window.ZenveSalesDashboard.close(); } catch (e) {}
    }
    if (window.ZenveProductsInventory && typeof window.ZenveProductsInventory.close === 'function') {
      try { window.ZenveProductsInventory.close(); } catch (e) {}
    }
    if (window.ZenvePharmacyDashboard && typeof window.ZenvePharmacyDashboard.close === 'function') {
      try { window.ZenvePharmacyDashboard.close(); } catch (e) {}
    }
    if (window.ZenveClinicsDashboard && typeof window.ZenveClinicsDashboard.close === 'function') {
      try { window.ZenveClinicsDashboard.close(); } catch (e) {}
    }
    document.querySelectorAll('.zpanel-root, [id$="-root"]').forEach(function (el) {
      if (el.id !== 'zod-root') el.classList.remove('zpanel-open', 'zsd-open', 'zpid-open', 'zph-open', 'zch-open');
    });

    // Close any stray Radix dialogs or locks
    try {
      document.querySelectorAll('[role="dialog"]').forEach(function (d) {
        if (d.closest('#zod-root')) return;
        var btn = d.querySelector('button[aria-label*="close" i], button:last-child');
        if (btn) { try { btn.click(); } catch (err) {} }
        try { d.remove(); } catch (err) {}
      });
      document.querySelectorAll('[data-radix-focus-guard], [data-radix-popper-content-wrapper]').forEach(function (g) {
        try { g.remove(); } catch (err) {}
      });
      document.body.style.pointerEvents = '';
      document.body.style.overflow = '';
      document.body.removeAttribute('data-scroll-locked');
    } catch (e) {}

    if (tab && TABS.some(function (t) { return t.id === tab; })) {
      S.tab = tab;
    } else if (!S.tab) {
      S.tab = tabFromHash(location.hash) || 'overview';
    }

    if (!root) build();
    else if (!document.body.contains(root)) document.body.appendChild(root);

    S.open = true;
    root.classList.add('zod-open');
    root.scrollTop = 0;

    var targetHash = hashFromTab(S.tab);
    try {
      if (location.hash !== targetHash) {
        history.pushState(null, '', targetHash);
      }
    } catch (e) {}

    setTimeout(function () { markSidebar(true, S.tab); }, 0);

    if (!S.orders.length) {
      loadData();
    } else {
      renderAll();
    }
  }

  function close() {
    if (!root || !S.open) return;
    S.open = false;
    root.classList.remove('zod-open');
    markSidebar(false);
    try {
      var h = location.hash;
      if (h.indexOf('operations') >= 0 || h.indexOf('order') >= 0 || h.indexOf('returns') >= 0 || h.indexOf('cancellations') >= 0 || h.indexOf('delivery') >= 0 || h.indexOf('60-minute') >= 0) {
        history.pushState(null, '', location.pathname + location.search);
      }
    } catch (e) {}
  }

  /* ── Data Ingestion & Fetching ─────────────────────────────────── */
  function loadData() {
    fetch(FALLBACK)
      .then(function (r) { return r.ok ? r.json() : Promise.reject(r.status); })
      .then(function (d) {
        S.rawSales = d.sales || [];
        S.orders = enrichOrders(S.rawSales);
        if (!S.trackingOrderId && S.orders.length) S.trackingOrderId = S.orders[0].id;
        renderAll();
      })
      .catch(function () {
        fetch(STATIC_FALLBACK)
          .then(function (r) { return r.json(); })
          .then(function (d) {
            S.rawSales = d.sales || [];
            S.orders = enrichOrders(S.rawSales);
            if (!S.trackingOrderId && S.orders.length) S.trackingOrderId = S.orders[0].id;
            renderAll();
          })
          .catch(function () {
            // Generate synthetic dataset if both endpoints fail
            var dummy = [];
            S.orders = enrichOrders(dummy);
            if (!S.trackingOrderId && S.orders.length) S.trackingOrderId = S.orders[0].id;
            renderAll();
          });
      });
  }

  /* ── Export Operational Data to CSV ────────────────────────────── */
  function exportCsv() {
    var data = getFilteredOrders();
    var headers = ['Order ID', 'Date', 'Customer', 'Pet', 'Phone', 'Item/Service', 'Amount', 'Status', 'Speed', 'Hub', 'Rider', 'Address'];
    var lines = [headers.join(',')];
    data.forEach(function (o) {
      lines.push([
        o.id,
        o.date.slice(0, 10),
        '"' + (o.customer || '').replace(/"/g, '""') + '"',
        '"' + (o.pet || '').replace(/"/g, '""') + '"',
        o.phone,
        '"' + (o.item || '').replace(/"/g, '""') + '"',
        o.amount,
        o.status,
        o.speed,
        o.hub,
        '"' + (o.rider.name || '').replace(/"/g, '""') + '"',
        '"' + (o.address || '').replace(/"/g, '""') + '"'
      ].join(','));
    });
    var blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'zenve_operations_export_' + S.tab + '_' + new Date().toISOString().slice(0, 10) + '.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Exported ' + data.length + ' operations records to CSV.');
  }

  /* ── Build Shell DOM ────────────────────────────────────────────── */
  function build() {
    if (root && document.body.contains(root)) return;
    root = document.createElement('div');
    root.id = 'zod-root';
    root.setAttribute('role', 'region');
    root.setAttribute('aria-label', 'Orders and Operations Control Center');

    root.innerHTML = [
      '<div class="zod-head">',
        '<div class="zod-head-left">',
          '<div class="zod-title-row">',
            '<h2 class="zod-title" id="zod-title">Orders &amp; Operations</h2>',
            '<span class="zod-live-indicator"><span class="zod-pulse-dot"></span> 5 Hubs Active</span>',
          '</div>',
          '<div class="zod-sub" id="zod-sub">End-to-End Fulfillment, Real-Time Fleet SLA &amp; Reverse Logistics Control</div>',
        '</div>',
        '<div class="zod-head-actions">',
          '<div class="zod-seg" id="zod-presets">',
            '<button data-p="today" class="on" type="button">Today</button>',
            '<button data-p="7d" type="button">7D</button>',
            '<button data-p="30d" type="button">30D</button>',
            '<button data-p="all" type="button">All</button>',
          '</div>',
          '<button class="zod-btn" id="zod-refresh" type="button">↻ Live Sync</button>',
          '<button class="zod-btn" id="zod-export" type="button">⭳ Export CSV</button>',
          '<button class="zod-btn primary" id="zod-back" type="button">← Executive Dashboard</button>',
        '</div>',
      '</div>',
      '<div class="zod-tabs-bar" id="zod-tabs-bar"></div>',
      '<div class="zod-body" id="zod-content"></div>',
      '<div id="zod-modal-slot"></div>'
    ].join('');

    document.body.appendChild(root);

    // Header buttons wireup
    var backBtn = root.querySelector('#zod-back');
    if (backBtn) backBtn.onclick = close;
    var refBtn = root.querySelector('#zod-refresh');
    if (refBtn) refBtn.onclick = function () {
      loadData();
      showToast('Synced live operational telemetry across all 5 hubs.');
    };
    var expBtn = root.querySelector('#zod-export');
    if (expBtn) expBtn.onclick = exportCsv;

    // Presets wireup
    var presets = root.querySelector('#zod-presets');
    if (presets) {
      presets.onclick = function (e) {
        var b = e.target.closest('button[data-p]');
        if (!b) return;
        presets.querySelectorAll('button').forEach(function (btn) { btn.classList.remove('on'); });
        b.classList.add('on');
        S.period = b.getAttribute('data-p');
        renderAll();
      };
    }
  }

  /* ── Render Navigation Tabs ─────────────────────────────────────── */
  function renderTabs() {
    var bar = root.querySelector('#zod-tabs-bar');
    if (!bar) return;
    bar.innerHTML = TABS.map(function (t) {
      var isOn = t.id === S.tab;
      var pulseCls = t.pulse ? ' pulse' : '';
      return [
        '<button type="button" class="zod-tab' + (isOn ? ' on' : '') + '" data-tab="' + t.id + '">',
          '<span>' + t.icon + '</span>',
          '<span>' + t.label + '</span>',
          '<span class="zod-tab-badge' + pulseCls + '">' + t.badge + '</span>',
        '</button>'
      ].join('');
    }).join('');

    bar.querySelectorAll('.zod-tab').forEach(function (btn) {
      btn.onclick = function () {
        var tid = btn.getAttribute('data-tab');
        if (tid) switchTab(tid);
      };
    });
  }

  /* ── Render Main Content Dispatcher ─────────────────────────────── */
  function renderAll() {
    if (!root) return;
    renderTabs();

    // Update Title & Subtitle based on tab
    var titleEl = root.querySelector('#zod-title');
    var subEl = root.querySelector('#zod-sub');
    var curTab = TABS.find(function (t) { return t.id === S.tab; });
    if (titleEl && curTab) titleEl.textContent = 'Orders & Operations — ' + curTab.label;

    var container = root.querySelector('#zod-content');
    if (!container) return;

    if (S.tab === 'all-orders') {
      container.innerHTML = renderAllOrdersView();
    } else if (S.tab === 'overview') {
      container.innerHTML = renderOverviewView();
    } else if (S.tab === 'management') {
      container.innerHTML = renderManagementView();
    } else if (S.tab === 'status') {
      container.innerHTML = renderStatusView();
    } else if (S.tab === 'returns') {
      container.innerHTML = renderReturnsView();
    } else if (S.tab === 'cancellations') {
      container.innerHTML = renderCancellationsView();
    } else if (S.tab === 'delivery') {
      container.innerHTML = renderDeliveryView();
    } else if (S.tab === 'express') {
      container.innerHTML = renderExpressView();
    }

    wireTabEvents();
  }

  /* =====================================================================
     VIEW 0: All Orders Dashboard (Master Ledger)
     ===================================================================== */
  function renderAllOrdersView() {
    return [
      '<div class="zod-kpi-grid">',
        kpi('Total Master Orders', '0', '0.0% MoM', 'neutral', '📋'),
        kpi('Fulfilled & Delivered', '0', '0.0% Rate', 'neutral', '✅'),
        kpi('Processing & Active', '0', '0 Active', 'neutral', '⚡'),
        kpi('Cancelled / Returned', '0', '0.0% Rate', 'neutral', '🚫'),
        kpi('Gross Order Value', '₹0', '0.0% YoY', 'neutral', '💰'),
      '</div>',

      '<div class="zod-card">',
        '<div class="zod-card-head">',
          '<div>',
            '<h3 class="zod-card-title">All Orders Master Repository</h3>',
            '<p class="zod-card-sub">Real-time audit log of all customer, B2B, pharmacy, clinical, and marketplace orders</p>',
          '</div>',
          '<span class="zod-badge">0 Records</span>',
        '</div>',

        '<div class="zod-filter-bar">',
          '<input type="text" class="zod-input" placeholder="Search Order ID, Customer, Phone, SKU, Tracking No..." value="' + esc(S.searchQuery || '') + '" oninput="ZOD.setSearch(this.value)">',
          '<select class="zod-select" onchange="ZOD.setHub(this.value)">',
            '<option value="all">All Operations Hubs</option>',
          '</select>',
          '<select class="zod-select">',
            '<option value="all">All Order Statuses</option>',
            '<option value="paid">Paid & Confirmed</option>',
            '<option value="processing">Processing</option>',
            '<option value="packed">Packed</option>',
            '<option value="shipped">Shipped</option>',
            '<option value="delivered">Delivered</option>',
            '<option value="cancelled">Cancelled</option>',
          '</select>',
          '<button class="zod-btn" onclick="alert(\'Exporting All Orders Master Ledger (CSV)...\')">📥 Export CSV</button>',
        '</div>',

        '<div class="zod-table-wrap">',
          '<table class="zod-table">',
            '<thead>',
              '<tr>',
                '<th>Order ID</th>',
                '<th>Date & Time</th>',
                '<th>Customer / Entity</th>',
                '<th>Channel / Source</th>',
                '<th>Items & Fulfillment</th>',
                '<th style="text-align:right;">Order Amount</th>',
                '<th style="text-align:center;">Payment Status</th>',
                '<th style="text-align:center;">Fulfillment SLA</th>',
                '<th style="text-align:center;">Action</th>',
              '</tr>',
            '</thead>',
            '<tbody><tr><td colspan="100%" style="text-align:center;padding:36px;color:#94a3b8;">No records found</td></tr></tbody>',
          '</table>',
        '</div>',

        '<div style="padding:14px 16px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;font-size:12px;color:#64748b;margin-top:16px;line-height:1.4;">',
          '<strong>💡 Master Ledger Note:</strong> No order records exist in the database. New orders placed via web, app, pharmacy, or clinic counters will stream here in real time.',
        '</div>',
      '</div>'
    ].join('');
  }

  /* =====================================================================
     VIEW 1: Operations Dashboard (Overview)
     ===================================================================== */
  function renderOverviewView() {
    var all = S.orders;
    var delivered = all.filter(function (o) { return o.status === 'Delivered'; });
    var inTransit = all.filter(function (o) { return o.status === 'Out for Delivery' || o.status === 'Dispatched'; });
    var processing = all.filter(function (o) { return o.status === 'Processing' || o.status === 'Packed'; });
    var express = all.filter(function (o) { return o.speed === '60-Min Express'; });
    var returned = all.filter(function (o) { return o.status === 'Returned'; });
    var cancelled = all.filter(function (o) { return o.status === 'Cancelled'; });

    var totalRevenue = all.reduce(function (a, o) { return a + o.amount; }, 0);
    var expressSlaPct = 0.0;
    var onTimePct = 0.0;

    return [
      '<div class="zod-kpis">',
        kpi('Total Orders (MTD)', all.length.toLocaleString('en-IN'), '--', 'neutral', '📦'),
        kpi('Active In-Fulfillment', (inTransit.length + processing.length), processing.length + ' packing, ' + inTransit.length + ' on-road', 'neutral', '🚚'),
        kpi('On-Time Delivery Rate', '0.0%', '--', 'neutral', '🎯'),
        kpi('60-Min Express SLA', '0.0%', '--', 'neutral', '⚡'),
        kpi('Return Rate', '0.0%', '--', 'neutral', '🔄'),
        kpi('Cancellation Rate', '0.0%', '--', 'neutral', '🚫'),
      '</div>',

      /* Fulfillment Pipeline */
      '<div class="zod-card zod-panel zod-pipeline-wrap">',
        '<div class="zod-ph">',
          '<div><h3>🔄 Live Order Fulfillment Stream</h3><small>Real-time lifecycle distribution across operational micro-centers</small></div>',
          '<span class="zod-badge">Pipeline Idle</span>',
        '</div>',
        '<div class="zod-pipeline-grid">',
          pipelineStage('📥 Placed / Paid', all.length, '0 verified', 'overview'),
          pipelineStage('🩺 Pharmacy QA', processing.length, '0 pending QA', 'management'),
          pipelineStage('📦 Packed at Hub', processing.length, '0 packed', 'management'),
          pipelineStage('🚚 Out for Delivery', inTransit.length, '0 on road', 'status'),
          pipelineStage('⚡ 60-Min Express', express.length, '0 dispatch', 'express'),
          pipelineStage('✅ Delivered', delivered.length, '0 delivered', 'management'),
          pipelineStage('⚠️ Returns / Claims', returned.length, '0 claims', 'returns'),
        '</div>',
      '</div>',

      /* Main Analytics Row */
      '<div class="zod-grid-main">',
        /* SVG Delivery Speed & SLA Velocity */
        '<div class="zod-card zod-panel">',
          '<div class="zod-ph">',
            '<div><h3>📈 Dispatch Velocity vs Delivery SLA</h3><small>Hourly delivery fulfillment throughput vs 60-minute benchmark target</small></div>',
          '</div>',
          renderThroughputSvg(),
        '</div>',

        /* Operational Alerts Feed */
        '<div class="zod-card zod-panel">',
          '<div class="zod-ph">',
            '<div><h3>🔔 Operations Alert Center</h3><small>Real-time telemetry exceptions &amp; automated resolutions</small></div>',
            '<span class="zod-badge">0 Alerts</span>',
          '</div>',
          '<div style="padding:24px;text-align:center;color:#94a3b8;font-size:12px;">No active operational alerts</div>',
        '</div>',
      '</div>',

      /* Hub Health Matrix */
      '<div class="zod-card zod-panel" style="margin-top:16px;">',
        '<div class="zod-ph">',
          '<div><h3>🏢 Regional Micro-Fulfillment Centers (Dark Stores)</h3><small>Stock levels, fleet utilization, and on-time dispatch SLA per regional node</small></div>',
        '</div>',
        '<div style="padding:24px;text-align:center;color:#94a3b8;font-size:12px;">No micro-fulfillment dark store data recorded</div>',
      '</div>'
    ].join('');
  }

  function renderThroughputSvg() {
    return '<div style="padding:60px 20px;text-align:center;color:#94a3b8;font-size:13px;">No hourly dispatch throughput records available</div>';
  }

  function renderAlertItem(title, desc, tone, time) {
    var borderColors = { amber: '#f59e0b', green: '#10b981', blue: '#0ea5e9', purple: '#a855f7' };
    return [
      '<div style="padding:10px 12px;border-radius:8px;background:rgba(255,255,255,0.02);border-left:3px solid ' + (borderColors[tone] || '#0ea5e9') + '">',
        '<div style="display:flex;justify-content:space-between;align-items:center;">',
          '<span style="font-size:12px;font-weight:700;">' + esc(title) + '</span>',
          '<span style="font-family:IBM Plex Mono,monospace;font-size:10px;color:#94a3b8;">' + esc(time) + '</span>',
        '</div>',
        '<p style="font-size:11px;color:#94a3b8;margin:4px 0 0 0;line-height:1.4;">' + esc(desc) + '</p>',
      '</div>'
    ].join('');
  }

  function renderHubCard(name, sla, riders, stock, speed, color) {
    return [
      '<div style="padding:14px;border-radius:10px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.08);">',
        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">',
          '<strong style="font-size:12px;color:#fff;">' + esc(name) + '</strong>',
          '<span class="zod-badge green">' + esc(sla) + ' SLA</span>',
        '</div>',
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;font-size:11px;color:#94a3b8;">',
          '<div>Fleet: <b style="color:#fff;">' + esc(riders) + '</b></div>',
          '<div>Stock: <b style="color:#fff;">' + esc(stock) + '</b></div>',
          '<div>Avg Speed: <b style="color:#fff;">' + esc(speed) + '</b></div>',
          '<div>Status: <span style="color:' + color + '">● Active</span></div>',
        '</div>',
        '<div class="zod-bar-wrap"><div class="zod-bar-fill" style="width:' + sla + ';background:' + color + '"></div></div>',
      '</div>'
    ].join('');
  }

  /* =====================================================================
     VIEW 2: Order Management (Full Tabular & Kanban Pipeline)
     ===================================================================== */
  function renderManagementView() {
    var filtered = getFilteredOrders();
    return [
      '<div class="zod-filters-wrap">',
        '<div class="zod-filters-left">',
          '<input type="search" id="zod-search-orders" class="zod-search-input" placeholder="Search order ID, pet, medicine, parent, address..." value="' + esc(S.searchQuery) + '">',
          '<select id="zod-filter-status" class="zod-select">',
            '<option value="all"' + (S.statusFilter === 'all' ? ' selected' : '') + '>All Statuses</option>',
            '<option value="Processing"' + (S.statusFilter === 'Processing' ? ' selected' : '') + '>Processing &amp; QA</option>',
            '<option value="Packed"' + (S.statusFilter === 'Packed' ? ' selected' : '') + '>Packed at Hub</option>',
            '<option value="Out for Delivery"' + (S.statusFilter === 'Out for Delivery' ? ' selected' : '') + '>Out for Delivery</option>',
            '<option value="Delivered"' + (S.statusFilter === 'Delivered' ? ' selected' : '') + '>Delivered</option>',
            '<option value="Returned"' + (S.statusFilter === 'Returned' ? ' selected' : '') + '>Returned</option>',
            '<option value="Cancelled"' + (S.statusFilter === 'Cancelled' ? ' selected' : '') + '>Cancelled</option>',
          '</select>',
          '<select id="zod-filter-speed" class="zod-select">',
            '<option value="all"' + (S.speedFilter === 'all' ? ' selected' : '') + '>All Delivery Speeds</option>',
            '<option value="60-Min Express"' + (S.speedFilter === '60-Min Express' ? ' selected' : '') + '>⚡ 60-Min Express</option>',
            '<option value="Same Day"' + (S.speedFilter === 'Same Day' ? ' selected' : '') + '>Same Day Fulfillment</option>',
            '<option value="Standard (2-Day)"' + (S.speedFilter === 'Standard (2-Day)' ? ' selected' : '') + '>Standard Shipping</option>',
          '</select>',
          '<select id="zod-filter-hub" class="zod-select">',
            HUBS.map(function (h) {
              return '<option value="' + h.id + '"' + (S.hub === h.id ? ' selected' : '') + '>' + h.label + '</option>';
            }).join(''),
          '</select>',
          '<button class="zod-btn" id="zod-reset-filters" type="button">Reset</button>',
        '</div>',
        '<div style="display:flex;align-items:center;gap:8px;">',
          '<span style="font-size:11px;color:#94a3b8;font-family:IBM Plex Mono,monospace;">Showing ' + filtered.length + ' orders</span>',
          '<button class="zod-btn success" id="zod-bulk-dispatch" type="button">⚡ Dispatch Active Orders</button>',
        '</div>',
      '</div>',

      '<div class="zod-card">',
        '<div class="zod-tbl-wrap">',
          '<table class="zod-tbl" id="zod-orders-table">',
            '<thead>',
              '<tr>',
                '<th>Order Ref</th>',
                '<th>Pet &amp; Parent</th>',
                '<th>Prescription / Item</th>',
                '<th>Destination</th>',
                '<th>Fulfillment</th>',
                '<th>Fleet Rider</th>',
                '<th>Status</th>',
                '<th class="r">Amount</th>',
                '<th class="r">Actions</th>',
              '</tr>',
            '</thead>',
            '<tbody>',
              filtered.length ? filtered.slice(0, 30).map(function (o) {
                var speedBadge = o.speed === '60-Min Express' 
                  ? '<span class="zod-badge express">⚡ 60-Min</span>'
                  : '<span class="zod-badge blue">' + o.speed + '</span>';

                var stBadge = o.status === 'Delivered' ? 'green' 
                  : (o.status === 'Out for Delivery' ? 'blue' 
                  : (o.status === 'Processing' || o.status === 'Packed' ? 'amber' 
                  : (o.status === 'Returned' ? 'purple' : 'red')));

                return [
                  '<tr data-order-id="' + o.id + '">',
                    '<td><strong style="color:#38bdf8;font-family:IBM Plex Mono,monospace;">' + o.id + '</strong><br><small style="color:#64748b">' + o.date.slice(0, 10) + '</small></td>',
                    '<td><b>' + esc(o.pet) + '</b><br><small style="color:#94a3b8">' + esc(o.customer) + ' (' + o.phone.slice(-4) + ')</small></td>',
                    '<td>' + esc(o.item) + '<br><small style="color:#64748b">' + esc(o.category) + '</small></td>',
                    '<td>' + esc(o.address) + '</td>',
                    '<td>' + speedBadge + '</td>',
                    '<td>' + esc(o.rider.name) + '<br><small style="color:#64748b">' + esc(o.rider.vehicle) + '</small></td>',
                    '<td><span class="zod-badge ' + stBadge + '">' + o.status + '</span></td>',
                    '<td class="r" style="font-family:IBM Plex Mono,monospace;font-weight:700;">' + inr.format(o.amount) + '</td>',
                    '<td class="r">',
                      '<div style="display:inline-flex;gap:4px;">',
                        '<button type="button" class="zod-btn" style="height:26px;padding:0 8px;font-size:11px;" data-action="view" data-id="' + o.id + '">Details</button>',
                        '<button type="button" class="zod-btn primary" style="height:26px;padding:0 8px;font-size:11px;" data-action="track" data-id="' + o.id + '">Track</button>',
                      '</div>',
                    '</td>',
                  '</tr>'
                ].join('');
              }).join('') : '<tr><td colspan="9" style="text-align:center;padding:40px;color:#94a3b8;">No orders match the selected filters.</td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* =====================================================================
     VIEW 3: Order Status & Live GPS Tracking Explorer
     ===================================================================== */
  function renderStatusView() {
    var curId = S.trackingOrderId || (S.orders[0] ? S.orders[0].id : 'ZV-11526');
    var order = S.orders.find(function (o) { return o.id === curId; }) || S.orders[0];

    if (!order) {
      return '<div class="zod-card zod-panel"><p>No orders loaded for tracking.</p></div>';
    }

    var speedBadge = order.speed === '60-Min Express' ? '<span class="zod-badge express">⚡ 60-Minute Express</span>' : '<span class="zod-badge blue">' + order.speed + '</span>';

    return [
      '<div class="zod-filters-wrap">',
        '<div class="zod-filters-left">',
          '<input type="search" id="zod-status-search" class="zod-search-input" placeholder="Search order ID to track (e.g. ZV-11526)..." value="' + esc(curId) + '">',
          '<button class="zod-btn primary" id="zod-status-search-btn" type="button">Track Order</button>',
        '</div>',
        '<div style="display:flex;gap:6px;flex-wrap:wrap;">',
          S.orders.slice(0, 5).map(function (o) {
            return '<button type="button" class="zod-btn" style="height:28px;padding:0 8px;font-size:10px;" data-pick-track="' + o.id + '">' + o.id + ' (' + o.pet.split(' ')[0] + ')</button>';
          }).join(''),
        '</div>',
      '</div>',

      '<div class="zod-grid-main">',
        /* Left: Live Route Map Simulation & Telemetry */
        '<div class="zod-card zod-panel">',
          '<div class="zod-ph">',
            '<div>',
              '<h3>🗺️ Live Telemetry &amp; Route Simulation — #' + order.id + '</h3>',
              '<small>Real-time vehicle GPS ping from ' + order.rider.name + ' (' + order.rider.vehicle + ')</small>',
            '</div>',
            speedBadge,
          '</div>',

          /* Interactive Stylized Route Map */
          '<div class="zod-map-box">',
            '<div class="zod-map-grid"></div>',
            '<div class="zod-map-overlay">',
              '<span class="zod-map-chip">📍 <b>Origin:</b> Zenve ' + order.hub.toUpperCase() + ' Dark Store</span>',
              '<span class="zod-map-chip">🏠 <b>Destination:</b> ' + esc(order.address) + '</span>',
              '<span class="zod-map-chip" style="color:#10b981;">● Speed: 28 km/h | Signal: 4G Strong | Battery: 86%</span>',
            '</div>',
            /* Stylized SVG Map Graphics */
            '<svg viewBox="0 0 600 240" style="width:100%;height:100%;position:relative;z-index:1;">',
              /* Route path */
              '<path d="M 80 170 Q 220 80 340 140 T 520 70" fill="none" stroke="rgba(56,189,248,0.3)" stroke-width="8" stroke-linecap="round"/>',
              '<path d="M 80 170 Q 220 80 340 140 T 520 70" fill="none" stroke="#38bdf8" stroke-width="3" stroke-dasharray="6 6"/>',
              /* Hub Origin Node */
              '<circle cx="80" cy="170" r="14" fill="#0ea5e9" opacity="0.3"/>',
              '<circle cx="80" cy="170" r="8" fill="#0ea5e9"/>',
              '<text x="80" y="200" text-anchor="middle" font-size="10" fill="#38bdf8" font-weight="bold">Zenve Hub</text>',
              /* Moving Rider Pin */
              '<circle cx="340" cy="140" r="18" fill="#f59e0b" opacity="0.25">',
                '<animate attributeName="r" values="14;22;14" dur="2s" repeatCount="indefinite"/>',
              '</circle>',
              '<circle cx="340" cy="140" r="10" fill="#f59e0b"/>',
              '<text x="340" y="120" text-anchor="middle" font-size="11" fill="#f59e0b" font-weight="bold">🛵 ' + order.rider.name.split(' ')[0] + ' (2.1 km)</text>',
              /* Customer Destination Pin */
              '<circle cx="520" cy="70" r="14" fill="#10b981" opacity="0.3"/>',
              '<circle cx="520" cy="70" r="8" fill="#10b981"/>',
              '<text x="520" y="50" text-anchor="middle" font-size="10" fill="#10b981" font-weight="bold">📍 Pet Parent Home</text>',
            '</svg>',
          '</div>',

          /* Rider Card & Quick Control */
          '<div style="margin-top:16px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">',
            '<div class="zod-rider-card" style="flex:1;min-width:260px;">',
              '<div class="zod-rider-av">' + order.rider.name.split(' ').map(function(w){return w[0];}).join('') + '</div>',
              '<div class="zod-rider-info">',
                '<div class="zod-rider-name">' + esc(order.rider.name) + ' <span class="zod-badge green">★ ' + order.rider.rating + '</span></div>',
                '<div class="zod-rider-meta">' + esc(order.rider.vehicle) + ' • ' + order.rider.completed + ' Deliveries Completed</div>',
              '</div>',
              '<button type="button" class="zod-btn" id="zod-call-rider" style="height:30px;padding:0 10px;">📞 Contact</button>',
            '</div>',
            '<div style="display:flex;gap:8px;">',
              '<button class="zod-btn success" id="zod-advance-status" type="button">⏩ Simulate Next Step</button>',
              '<button class="zod-btn" id="zod-sms-alert" type="button">📱 Send WhatsApp Alert</button>',
            '</div>',
          '</div>',
        '</div>',

        /* Right: Order Status Timeline */
        '<div class="zod-card zod-panel">',
          '<div class="zod-ph">',
            '<div><h3>📋 Order Fulfillment Milestones</h3><small>Step-by-step audit log with medical certification</small></div>',
            '<span class="zod-badge ' + (order.status === 'Delivered' ? 'green' : 'amber') + '">' + order.status + '</span>',
          '</div>',

          '<div style="padding:10px 14px;border-radius:8px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);margin-bottom:14px;">',
            '<div style="font-size:12px;color:#fff;"><b>Patient:</b> ' + esc(order.pet) + '</div>',
            '<div style="font-size:11px;color:#94a3b8;margin-top:2px;"><b>Items:</b> ' + esc(order.item) + ' (' + inr.format(order.amount) + ')</div>',
            '<div style="font-size:11px;color:#94a3b8;margin-top:2px;"><b>Address:</b> ' + esc(order.address) + '</div>',
          '</div>',

          '<div class="zod-timeline">',
            order.trackingSteps.map(function (step, i) {
              var cls = step.done ? 'done' : (i === 3 && order.status === 'Out for Delivery' ? 'active' : '');
              var icon = step.done ? '✓' : (cls === 'active' ? '●' : '○');
              return [
                '<div class="zod-timeline-step ' + cls + '">',
                  '<div class="zod-timeline-node">' + icon + '</div>',
                  '<div class="zod-timeline-header">',
                    '<span class="zod-timeline-title">' + esc(step.label) + '</span>',
                    '<span class="zod-timeline-time">' + esc(step.time) + '</span>',
                  '</div>',
                  '<div class="zod-timeline-desc">' + esc(step.desc) + '</div>',
                '</div>'
              ].join('');
            }).join(''),
          '</div>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* =====================================================================
     VIEW 4: Returns & Refunds (Reverse Logistics Management)
     ===================================================================== */
  function renderReturnsView() {
    var returnsList = S.orders.filter(function (o) { return o.status === 'Returned' || o.returnReason; });
    var totalRefundVal = returnsList.reduce(function (a, o) { return a + o.amount; }, 0);

    return [
      '<div class="zod-kpis">',
        kpi('Total Returns (MTD)', returnsList.length, '--', 'neutral', '🔄'),
        kpi('Return Rate', '0.0%', '--', 'neutral', '📊'),
        kpi('Total Refunds Value', inrShort(totalRefundVal), '--', 'neutral', '💳'),
        kpi('Avg Refund Turnaround', '--', '--', 'neutral', '⚡'),
        kpi('Pending QA Inspection', '0 Items', '--', 'neutral', '🔍'),
      '</div>',

      '<div class="zod-grid-main">',
        /* Returns Table */
        '<div class="zod-card zod-panel">',
          '<div class="zod-ph">',
            '<div><h3>🔄 Reverse Logistics &amp; Refund Approval Queue</h3><small>Approve quality inspection and release instant UPI or Wallet refunds</small></div>',
            '<span class="zod-badge">' + returnsList.filter(function(o){ return o.refundStatus === 'Pending Approval'; }).length + ' Action Required</span>',
          '</div>',
          '<div class="zod-tbl-wrap">',
            '<table class="zod-tbl">',
              '<thead>',
                '<tr>',
                  '<th>Order ID</th>',
                  '<th>Pet Parent</th>',
                  '<th>Product Returned</th>',
                  '<th>Reported Reason</th>',
                  '<th>Refund Mode</th>',
                  '<th>QA Status</th>',
                  '<th class="r">Refund Amount</th>',
                  '<th class="r">Action</th>',
                '</tr>',
              '</thead>',
              '<tbody>',
                (returnsList.length === 0 ? '<tr><td colspan="8" style="text-align:center;padding:24px;color:#94a3b8;">No return or refund records found</td></tr>' : returnsList.map(function (o) {
                  var isPending = o.refundStatus === 'Pending Approval';
                  return [
                    '<tr>',
                      '<td><strong style="color:#38bdf8;font-family:IBM Plex Mono,monospace;">' + o.id + '</strong></td>',
                      '<td><b>' + esc(o.customer) + '</b><br><small style="color:#94a3b8">' + esc(o.pet) + '</small></td>',
                      '<td>' + esc(o.item) + '</td>',
                      '<td><span style="color:#f59e0b;">' + esc(o.returnReason || 'Defective package seal') + '</span></td>',
                      '<td><span class="zod-badge blue">' + esc(o.refundMode || 'Instant UPI') + '</span></td>',
                      '<td><span class="zod-badge ' + (isPending ? 'amber' : 'green') + '">' + esc(o.refundStatus) + '</span></td>',
                      '<td class="r" style="font-family:IBM Plex Mono,monospace;font-weight:700;">' + inr.format(o.amount) + '</td>',
                      '<td class="r">',
                        isPending 
                          ? '<button type="button" class="zod-btn success" style="height:26px;padding:0 8px;font-size:11px;" data-approve-refund="' + o.id + '">Approve UPI</button>'
                          : '<span style="color:#10b981;font-size:11px;font-weight:700;">✓ Settled</span>',
                      '</td>',
                    '</tr>'
                  ].join('');
                }).join('')),
              '</tbody>',
            '</table>',
          '</div>',
        '</div>',

        /* Return Reasons Breakdown */
        '<div class="zod-card zod-panel">',
          '<div class="zod-ph">',
            '<div><h3>📊 Root Cause Categorization</h3><small>Return drivers across pet clinical products</small></div>',
          '</div>',
          '<div style="padding:24px;text-align:center;color:#94a3b8;font-size:12px;">No return root cause records found</div>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderBarBreakdown(label, pct, color) {
    return [
      '<div>',
        '<div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:4px;">',
          '<span>' + esc(label) + '</span>',
          '<strong style="font-family:IBM Plex Mono,monospace;color:' + color + ';">' + esc(pct) + '</strong>',
        '</div>',
        '<div class="zod-bar-wrap"><div class="zod-bar-fill" style="width:' + pct + ';background:' + color + ';"></div></div>',
      '</div>'
    ].join('');
  }

  /* =====================================================================
     VIEW 5: Cancellations & Retention Desk
     ===================================================================== */
  function renderCancellationsView() {
    var cancelledList = S.orders.filter(function (o) { return o.status === 'Cancelled' || o.cancelReason; });
    var lostRev = cancelledList.reduce(function (a, o) { return a + o.amount; }, 0);

    return [
      '<div class="zod-kpis">',
        kpi('Total Cancellations (MTD)', cancelledList.length, '--', 'neutral', '🚫'),
        kpi('Cancellation Rate', '0.0%', '--', 'neutral', '📉'),
        kpi('Lost Gross Revenue', inrShort(lostRev), '--', 'neutral', '💸'),
        kpi('Recovered Revenue', inrShort(0), '--', 'neutral', '🛡️'),
        kpi('Pre-Dispatch Cancel %', '0.0%', '--', 'neutral', '⏱️'),
      '</div>',

      '<div class="zod-grid-main">',
        /* Cancellation Table */
        '<div class="zod-card zod-panel">',
          '<div class="zod-ph">',
            '<div><h3>🚫 Order Cancellation Log &amp; Retention Desk</h3><small>Investigate root causes and trigger automated retention credits</small></div>',
            '<button class="zod-btn" id="zod-export-cancellations">⭳ Export Cancellation Report</button>',
          '</div>',
          '<div class="zod-tbl-wrap">',
            '<table class="zod-tbl">',
              '<thead>',
                '<tr>',
                  '<th>Order Ref</th>',
                  '<th>Customer</th>',
                  '<th>Item Cancelled</th>',
                  '<th>Cancellation Reason</th>',
                  '<th>Stage</th>',
                  '<th class="r">Lost Amount</th>',
                  '<th class="r">Retention Action</th>',
                '</tr>',
              '</thead>',
              '<tbody>',
                (cancelledList.length === 0 ? '<tr><td colspan="7" style="text-align:center;padding:24px;color:#94a3b8;">No cancellation records found</td></tr>' : cancelledList.map(function (o, idx) {
                  return [
                    '<tr>',
                      '<td><strong style="color:#f87171;font-family:IBM Plex Mono,monospace;">' + o.id + '</strong></td>',
                      '<td><b>' + esc(o.customer) + '</b><br><small style="color:#94a3b8">' + esc(o.pet) + '</small></td>',
                      '<td>' + esc(o.item) + '</td>',
                      '<td><span style="color:#f87171;">' + esc(o.cancelReason || 'Customer changed mind') + '</span></td>',
                      '<td><span class="zod-badge red">' + (idx % 2 === 0 ? 'Within 5m' : 'Pre-Dispatch') + '</span></td>',
                      '<td class="r" style="font-family:IBM Plex Mono,monospace;font-weight:700;">' + inr.format(o.amount) + '</td>',
                      '<td class="r">',
                        '<button type="button" class="zod-btn" style="height:26px;padding:0 8px;font-size:11px;" data-retention-credit="' + o.id + '">🎁 Offer Store Credit</button>',
                      '</td>',
                    '</tr>'
                  ].join('');
                }).join('')),
              '</tbody>',
            '</table>',
          '</div>',
        '</div>',

        /* Right: Root Causes & Retention Analytics */
        '<div class="zod-card zod-panel">',
          '<div class="zod-ph">',
            '<div><h3>🔍 Primary Cancellation Drivers</h3><small>Where drop-offs occur and how to prevent them</small></div>',
          '</div>',
          '<div style="padding:24px;text-align:center;color:#94a3b8;font-size:12px;">No cancellation drivers recorded</div>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* =====================================================================
     VIEW 6: Delivery Performance & Logistics Partner Scorecard
     ===================================================================== */
  function renderDeliveryView() {
    var partners = [];

    return [
      '<div class="zod-kpis">',
        kpi('Overall On-Time SLA', '0.0%', '--', 'neutral', '🚚'),
        kpi('Avg Delivery Time (Express)', '--', '--', 'neutral', '⚡'),
        kpi('First Attempt Success (FADR)', '0.0%', '--', 'neutral', '🎯'),
        kpi('Active Delivery Riders', '0 Riders', '--', 'neutral', '🛵'),
        kpi('Carbon Saved (MTD)', '0 kg CO₂', '--', 'neutral', '🌱'),
      '</div>',

      '<div class="zod-card zod-panel" style="margin-bottom:16px;">',
        '<div class="zod-ph">',
          '<div><h3>🤝 Logistics &amp; Courier Partner Performance Scorecard</h3><small>Evaluation across SLA compliance, delivery speed, and cost efficiency</small></div>',
          '<button class="zod-btn primary" id="zod-optimize-routes">⚡ Optimize Fleet Routes</button>',
        '</div>',
        '<div class="zod-tbl-wrap">',
          '<table class="zod-tbl">',
            '<thead>',
              '<tr>',
                '<th>Carrier / Partner</th>',
                '<th>Service Tier</th>',
                '<th>On-Time SLA %</th>',
                '<th>Average Speed</th>',
                '<th>First Attempt Success</th>',
                '<th>Fulfillment Cost</th>',
                '<th>Parent Rating</th>',
                '<th class="r">Partner Status</th>',
              '</tr>',
            '</thead>',
            '<tbody>',
              (partners.length === 0 ? '<tr><td colspan="8" style="text-align:center;padding:24px;color:#94a3b8;">No carrier performance records found</td></tr>' : partners.map(function (p) {
                return [
                  '<tr>',
                    '<td><b style="color:#000000;">' + esc(p.name) + '</b></td>',
                    '<td><span class="zod-badge ' + (p.type.indexOf('60-Min') >= 0 ? 'express' : 'blue') + '">' + esc(p.type) + '</span></td>',
                    '<td><strong style="color:#10b981;font-family:IBM Plex Mono,monospace;">' + esc(p.onTime) + '</strong></td>',
                    '<td>' + esc(p.avgTime) + '</td>',
                    '<td>' + esc(p.fadr) + '</td>',
                    '<td style="font-family:IBM Plex Mono,monospace;">' + esc(p.cost) + '</td>',
                    '<td><span style="color:#f59e0b;">★ ' + p.rating + '</span></td>',
                    '<td class="r"><span class="zod-badge green">● Operational</span></td>',
                  '</tr>'
                ].join('');
              }).join('')),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>',

      /* Regional Delivery Heatmap & Rider Leaderboard */
      '<div class="zod-grid-2">',
        /* City Performance */
        '<div class="zod-card zod-panel">',
          '<div class="zod-ph"><div><h3>📍 Metro City Delivery Performance</h3><small>On-time completion rates across Indian urban clusters</small></div></div>',
          '<div style="padding:28px 20px;text-align:center;color:#94a3b8;font-size:12px;">No metro city delivery performance records found</div>',
        '</div>',

        /* Top Riders Leaderboard */
        '<div class="zod-card zod-panel">',
          '<div class="zod-ph"><div><h3>🏆 Top Fleet Champions Leaderboard</h3><small>Recognized for highest customer ratings and zero SLA breaches</small></div></div>',
          '<div style="padding:28px 20px;text-align:center;color:#94a3b8;font-size:12px;">No fleet rider records found</div>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* =====================================================================
     VIEW 7: 60-Minute Express Delivery Command
     ===================================================================== */
  function renderExpressView() {
    var expressOrders = S.orders.filter(function (o) { return o.speed === '60-Min Express'; });

    return [
      '<div class="zod-kpis">',
        kpi('Active 60-Min Deliveries', expressOrders.length, '--', 'neutral', '⚡'),
        kpi('Average Delivery Speed', '--', '--', 'neutral', '⏱️'),
        kpi('Express SLA Compliance', '0.0%', '--', 'neutral', '🎯'),
        kpi('Cold-Chain Assurance', '0.0%', '--', 'neutral', '❄️'),
        kpi('Active Express EV Fleet', '0 Electric Bikes', '--', 'neutral', '🛵'),
      '</div>',

      /* Live Active 60-Minute Delivery Board */
      '<div class="zod-card zod-panel" style="margin-bottom:16px;">',
        '<div class="zod-ph">',
          '<div>',
            '<h3>⚡ Active 60-Minute Delivery Live Board</h3>',
            '<small>Live countdown timers, rider assignments, and delivery coordinates</small>',
          '</div>',
          '<span class="zod-live-indicator">Radar Standby</span>',
        '</div>',

        (expressOrders.length === 0 ? '<div style="padding:48px 20px;text-align:center;color:#94a3b8;font-size:13px;">No active 60-minute express deliveries in progress</div>' : '<div class="zod-grid-3">' +
          expressOrders.slice(0, 6).map(function (o, idx) {
            var remaining = o.minRemaining || (25 - idx * 4);
            var isUrgent = remaining < 15;
            return [
              '<div style="padding:14px;border-radius:12px;background:rgba(255,255,255,0.03);border:1px solid ' + (isUrgent ? 'rgba(239,68,68,0.4)' : 'rgba(255,255,255,0.08)') + ';position:relative;overflow:hidden;">',
                '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px;">',
                  '<div>',
                    '<strong style="color:#38bdf8;font-family:IBM Plex Mono,monospace;font-size:13px;">' + o.id + '</strong>',
                    '<div style="font-size:11px;color:#fff;margin-top:2px;"><b>' + esc(o.pet) + '</b></div>',
                  '</div>',
                  '<span class="zod-countdown-wrap' + (isUrgent ? ' zod-countdown-urgent' : '') + '">⏱️ ' + remaining + 'm left</span>',
                '</div>',
                '<div style="font-size:11px;color:#94a3b8;line-height:1.4;">',
                  '<div><b>Medicine:</b> ' + esc(o.item) + '</div>',
                  '<div><b>Destination:</b> ' + esc(o.address) + '</div>',
                  '<div><b>Rider:</b> ' + esc(o.rider.name) + ' (' + o.rider.vehicle + ')</div>',
                '</div>',
                '<div class="zod-bar-wrap" style="margin-top:10px;">',
                  '<div class="zod-bar-fill" style="width:' + Math.min(100, Math.max(10, (1 - (remaining / 60)) * 100)) + '%;background:' + (isUrgent ? '#ef4444' : '#38bdf8') + '"></div>',
                '</div>',
                '<div style="display:flex;justify-content:space-between;align-items:center;margin-top:12px;">',
                  '<span class="zod-badge ' + (isUrgent ? 'red' : 'green') + '">' + (isUrgent ? '⚠️ High Priority SLA' : '● On Schedule') + '</span>',
                  '<button type="button" class="zod-btn primary" style="height:26px;padding:0 8px;font-size:11px;" data-action="track" data-id="' + o.id + '">Track Live</button>',
                '</div>',
              '</div>'
            ].join('');
          }).join('') + '</div>'),
      '</div>',

      /* Dark Stores / Micro Fulfillment Centers Radar */
      '<div class="zod-card zod-panel">',
        '<div class="zod-ph">',
          '<div><h3>📡 Micro-Fulfillment Dark Stores &amp; Coverage Radius</h3><small>15-minute dispatch radius from high-density pet population centers</small></div>',
        '</div>',
        '<div style="padding:24px;text-align:center;color:#94a3b8;font-size:12px;">No micro-fulfillment dark stores recorded</div>',
      '</div>'
    ].join('');
  }

  function renderDarkStoreCard(name, city, radius, fleet, sla, color) {
    return [
      '<div style="padding:14px;border-radius:10px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.08);">',
        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">',
          '<strong style="font-size:12px;color:#fff;">' + esc(name) + '</strong>',
          '<span class="zod-badge blue">' + esc(city) + '</span>',
        '</div>',
        '<div style="font-size:11px;color:#94a3b8;line-height:1.5;">',
          '<div>Coverage: <b style="color:#fff;">' + esc(radius) + '</b></div>',
          '<div>Fleet: <b style="color:#fff;">' + esc(fleet) + '</b></div>',
          '<div>SLA: <strong style="color:' + color + ';">' + esc(sla) + '</strong></div>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── KPI Card Template ──────────────────────────────────────────── */
  function kpi(label, value, delta, trend, icon) {
    return [
      '<div class="zod-card zod-kpi">',
        '<div class="zod-kpi-top">',
          '<span class="zod-lbl">' + esc(label) + '</span>',
          '<span class="zod-kpi-icon">' + (icon || '📊') + '</span>',
        '</div>',
        '<div class="zod-val">' + esc(value) + '</div>',
        (delta ? '<div class="zod-delta ' + (trend || '') + '">' + (trend === 'up' ? '▲ ' : trend === 'down' ? '▼ ' : '● ') + esc(delta) + '</div>' : ''),
      '</div>'
    ].join('');
  }

  function pipelineStage(label, count, sub, targetTab) {
    return [
      '<div class="zod-pipe-stage" data-goto-tab="' + targetTab + '">',
        '<div class="zod-pipe-icon-row">',
          '<span class="zod-pipe-title">' + esc(label) + '</span>',
        '</div>',
        '<div class="zod-pipe-count">' + count + '</div>',
        '<div class="zod-pipe-sub">' + esc(sub) + '</div>',
      '</div>'
    ].join('');
  }

  /* ── Modal: Order Inspection Dialog ─────────────────────────────── */
  function showOrderModal(orderId) {
    var order = S.orders.find(function (o) { return o.id === orderId; });
    if (!order) return;

    var slot = root.querySelector('#zod-modal-slot');
    if (!slot) return;

    slot.innerHTML = [
      '<div class="zod-modal-backdrop" id="zod-order-modal">',
        '<div class="zod-modal-dialog">',
          '<div class="zod-modal-head">',
            '<div>',
              '<h3 class="zod-modal-title">📦 Order Inspection &amp; Manifest #' + order.id + '</h3>',
              '<small style="color:#94a3b8;">Created ' + order.date + ' • Destination: ' + order.city + '</small>',
            '</div>',
            '<button type="button" class="zod-modal-close" id="zod-modal-close-btn">✕</button>',
          '</div>',
          '<div class="zod-modal-body">',
            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:12px;border-radius:10px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);">',
              '<div>',
                '<div style="font-size:11px;color:#94a3b8;">PET &amp; CUSTOMER</div>',
                '<div style="font-size:13px;font-weight:700;color:#fff;margin-top:2px;">' + esc(order.pet) + '</div>',
                '<div style="font-size:12px;color:#94a3b8;">Parent: ' + esc(order.customer) + ' (' + order.phone + ')</div>',
                '<div style="font-size:11px;color:#64748b;margin-top:4px;">Address: ' + esc(order.address) + '</div>',
              '</div>',
              '<div>',
                '<div style="font-size:11px;color:#94a3b8;">FULFILLMENT DETAILS</div>',
                '<div style="font-size:13px;font-weight:700;color:#38bdf8;margin-top:2px;">' + esc(order.speed) + '</div>',
                '<div style="font-size:12px;color:#94a3b8;">Hub: Zenve ' + order.hub.toUpperCase() + ' Center</div>',
                '<div style="font-size:11px;color:#64748b;margin-top:4px;">Rider: ' + esc(order.rider.name) + ' (' + order.rider.vehicle + ')</div>',
              '</div>',
            '</div>',

            '<div>',
              '<h4 style="font-size:12px;margin:0 0 8px 0;">Itemized Medical / Product Receipt</h4>',
              '<div style="padding:10px 14px;border-radius:8px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);">',
                '<div style="display:flex;justify-content:space-between;font-size:12px;color:#fff;margin-bottom:4px;">',
                  '<span>1x ' + esc(order.item) + '</span>',
                  '<strong style="font-family:IBM Plex Mono,monospace;">' + inr.format(order.amount) + '</strong>',
                '</div>',
                '<div style="display:flex;justify-content:space-between;font-size:11px;color:#94a3b8;">',
                  '<span>Cold-Chain Packaging &amp; Express Courier</span>',
                  '<span style="color:#10b981;">FREE</span>',
                '</div>',
                '<div style="display:flex;justify-content:space-between;font-size:11px;color:#94a3b8;margin-top:2px;">',
                  '<span>GST (Applicable Taxes)</span>',
                  '<span>Included</span>',
                '</div>',
                '<div style="border-top:1px solid rgba(255,255,255,0.1);margin-top:8px;padding-top:8px;display:flex;justify-content:space-between;font-size:13px;font-weight:700;">',
                  '<span>Grand Total Paid:</span>',
                  '<span style="color:#38bdf8;font-family:IBM Plex Mono,monospace;">' + inr.format(order.amount) + '</span>',
                '</div>',
              '</div>',
            '</div>',

            '<div>',
              '<h4 style="font-size:12px;margin:0 0 8px 0;">Update Operational Status</h4>',
              '<div style="display:flex;gap:8px;flex-wrap:wrap;">',
                '<button type="button" class="zod-btn" data-set-status="Packed" data-id="' + order.id + '">Mark Packed</button>',
                '<button type="button" class="zod-btn" data-set-status="Out for Delivery" data-id="' + order.id + '">Dispatch (Out for Delivery)</button>',
                '<button type="button" class="zod-btn success" data-set-status="Delivered" data-id="' + order.id + '">Mark Delivered (OTP)</button>',
              '</div>',
            '</div>',
          '</div>',
          '<div class="zod-modal-foot">',
            '<button class="zod-btn" id="zod-print-slip" type="button">🖨️ Print Packing Slip</button>',
            '<button class="zod-btn primary" id="zod-track-from-modal" type="button">Track on Live Map →</button>',
          '</div>',
        '</div>',
      '</div>'
    ].join('');

    // Modal listeners
    var closeM = slot.querySelector('#zod-modal-close-btn');
    if (closeM) closeM.onclick = function () { slot.innerHTML = ''; };

    var trackM = slot.querySelector('#zod-track-from-modal');
    if (trackM) {
      trackM.onclick = function () {
        slot.innerHTML = '';
        S.trackingOrderId = order.id;
        switchTab('status');
      };
    }

    var printM = slot.querySelector('#zod-print-slip');
    if (printM) {
      printM.onclick = function () {
        showToast('Generated & printed packing slip for Order #' + order.id);
      };
    }

    slot.querySelectorAll('[data-set-status]').forEach(function (btn) {
      btn.onclick = function () {
        var newStatus = btn.getAttribute('data-set-status');
        order.status = newStatus;
        if (newStatus === 'Delivered') {
          order.trackingSteps.forEach(function (s) { s.done = true; });
        }
        showToast('Updated Order #' + order.id + ' status to: ' + newStatus);
        slot.innerHTML = '';
        renderAll();
      };
    });
  }

  /* ── Event Delegations for Tab-Specific Elements ───────────────── */
  function wireTabEvents() {
    var content = root.querySelector('#zod-content');
    if (!content) return;

    // Search inside Management
    var searchInput = content.querySelector('#zod-search-orders');
    if (searchInput) {
      searchInput.oninput = function (e) {
        S.searchQuery = e.target.value;
        var tableWrap = content.querySelector('#zod-orders-table tbody');
        if (tableWrap) {
          content.innerHTML = renderManagementView();
          wireTabEvents();
        }
      };
    }

    // Filter dropdowns inside Management
    var filterStatus = content.querySelector('#zod-filter-status');
    if (filterStatus) {
      filterStatus.onchange = function (e) {
        S.statusFilter = e.target.value;
        content.innerHTML = renderManagementView();
        wireTabEvents();
      };
    }

    var filterSpeed = content.querySelector('#zod-filter-speed');
    if (filterSpeed) {
      filterSpeed.onchange = function (e) {
        S.speedFilter = e.target.value;
        content.innerHTML = renderManagementView();
        wireTabEvents();
      };
    }

    var filterHub = content.querySelector('#zod-filter-hub');
    if (filterHub) {
      filterHub.onchange = function (e) {
        S.hub = e.target.value;
        content.innerHTML = renderManagementView();
        wireTabEvents();
      };
    }

    var resetBtn = content.querySelector('#zod-reset-filters');
    if (resetBtn) {
      resetBtn.onclick = function () {
        S.searchQuery = '';
        S.statusFilter = 'all';
        S.speedFilter = 'all';
        S.hub = 'all';
        content.innerHTML = renderManagementView();
        wireTabEvents();
      };
    }

    // Bulk dispatch
    var bulkBtn = content.querySelector('#zod-bulk-dispatch');
    if (bulkBtn) {
      bulkBtn.onclick = function () {
        var count = 0;
        S.orders.forEach(function (o) {
          if (o.status === 'Processing' || o.status === 'Packed') {
            o.status = 'Out for Delivery';
            count++;
          }
        });
        showToast('Bulk dispatched ' + count + ' orders to active electric fleet riders!');
        renderAll();
      };
    }

    // Table action buttons (View / Track)
    content.querySelectorAll('[data-action="view"]').forEach(function (b) {
      b.onclick = function (e) {
        e.stopPropagation();
        var id = b.getAttribute('data-id');
        if (id) showOrderModal(id);
      };
    });

    content.querySelectorAll('[data-action="track"]').forEach(function (b) {
      b.onclick = function (e) {
        e.stopPropagation();
        var id = b.getAttribute('data-id');
        if (id) {
          S.trackingOrderId = id;
          switchTab('status');
        }
      };
    });

    // Row click in table
    content.querySelectorAll('#zod-orders-table tbody tr').forEach(function (row) {
      row.onclick = function () {
        var id = row.getAttribute('data-order-id');
        if (id) showOrderModal(id);
      };
    });

    // Tracking view search
    var trackSearchBtn = content.querySelector('#zod-status-search-btn');
    var trackInput = content.querySelector('#zod-status-search');
    if (trackSearchBtn && trackInput) {
      trackSearchBtn.onclick = function () {
        var val = trackInput.value.trim().toUpperCase();
        var matched = S.orders.find(function (o) { return o.id === val || o.id.indexOf(val) >= 0; });
        if (matched) {
          S.trackingOrderId = matched.id;
          renderAll();
        } else {
          showToast('No order found matching: ' + val);
        }
      };
    }

    content.querySelectorAll('[data-pick-track]').forEach(function (b) {
      b.onclick = function () {
        var id = b.getAttribute('data-pick-track');
        if (id) {
          S.trackingOrderId = id;
          renderAll();
        }
      };
    });

    // Advance status simulator
    var advanceBtn = content.querySelector('#zod-advance-status');
    if (advanceBtn) {
      advanceBtn.onclick = function () {
        var order = S.orders.find(function (o) { return o.id === S.trackingOrderId; });
        if (!order) return;
        if (order.status === 'Processing') order.status = 'Packed';
        else if (order.status === 'Packed') order.status = 'Out for Delivery';
        else if (order.status === 'Out for Delivery') {
          order.status = 'Delivered';
          order.trackingSteps.forEach(function (s) { s.done = true; });
        }
        showToast('Advanced Order #' + order.id + ' status to: ' + order.status);
        renderAll();
      };
    }

    // Call rider / SMS simulator
    var callRiderBtn = content.querySelector('#zod-call-rider');
    if (callRiderBtn) {
      callRiderBtn.onclick = function () {
        showToast('Connecting masked VoIP call to Rider mobile terminal...');
      };
    }

    var smsBtn = content.querySelector('#zod-sms-alert');
    if (smsBtn) {
      smsBtn.onclick = function () {
        showToast('Sent real-time GPS tracking link via WhatsApp to customer phone!');
      };
    }

    // Returns approve refund
    content.querySelectorAll('[data-approve-refund]').forEach(function (b) {
      b.onclick = function () {
        var id = b.getAttribute('data-approve-refund');
        var order = S.orders.find(function (o) { return o.id === id; });
        if (order) {
          order.refundStatus = 'Refund Completed';
          showToast('Instant UPI Refund of ' + inr.format(order.amount) + ' transferred to customer account!');
          renderAll();
        }
      };
    });

    // Cancellations retention credit
    content.querySelectorAll('[data-retention-credit]').forEach(function (b) {
      b.onclick = function () {
        var id = b.getAttribute('data-retention-credit');
        showToast('Dispatched store credit coupon code to customer!');
      };
    });

    // Pipeline stage click navigation
    content.querySelectorAll('[data-goto-tab]').forEach(function (b) {
      b.onclick = function () {
        var target = b.getAttribute('data-goto-tab');
        if (target) switchTab(target);
      };
    });

    var jumpExpressBtn = content.querySelector('#zod-jump-express');
    if (jumpExpressBtn) {
      jumpExpressBtn.onclick = function () { switchTab('express'); };
    }

    var optRoutesBtn = content.querySelector('#zod-optimize-routes');
    if (optRoutesBtn) {
      optRoutesBtn.onclick = function () {
        showToast('Dynamic AI route clustering applied: saved 18% transit time for 76 active riders.');
      };
    }
  }

  /* =====================================================================
     GLOBAL CLICK & EVENT INTERCEPTION
     Intercepts in capture phase BEFORE React or other handlers!
     ===================================================================== */
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;

    // 1. Any button, link, or menu item with matching text
    var item = t.closest('button, [data-go], a, [role="button"], li');
    if (item && item.textContent) {
      var tab = tabFromText(item.textContent.trim());
      if (tab) {
        if (!t.closest('#zod-root')) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          open(tab);
          return;
        }
      }
    }

    // 2. Direct click on section headings like "Orders & Delivery", "Operations Dashboard"
    var heading = t.closest('h1, h2, h3, h4, [data-panel]');
    if (heading && heading.textContent && !t.closest('#zod-root')) {
      var hText = heading.textContent.trim().toLowerCase();
      if (hText.indexOf('orders & operations') >= 0 || hText.indexOf('orders & delivery') >= 0 || hText.indexOf('operations dashboard') >= 0) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        open('overview');
        return;
      }
    }

    // 3. Navigation to other dashboards closes operations
    if (S.open) {
      if (t.closest('#zod-root')) return;
      var b = t.closest('.sidebar-scope button, .sidebar-scope a');
      if (!b) return;
      if (b.getAttribute('aria-label') === 'Search menu') return;
      if (b.getAttribute('aria-expanded') !== null) return;
      if (b.textContent && tabFromText(b.textContent.trim())) return;

      // Navigating outside closes operations dashboard
      close();
    }
  }, true);

  // Pointerdown prevention
  document.addEventListener('pointerdown', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;
    var item = t.closest('.sidebar-scope button, .sidebar-scope a');
    if (item && item.textContent) {
      var tab = tabFromText(item.textContent.trim());
      if (tab) {
        e.stopPropagation();
      }
    }
  }, true);

  // Keyboard shortcut (Escape to close)
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && S.open) {
      var modal = document.getElementById('zod-order-modal');
      if (modal) modal.remove();
      else close();
    }
  });

  // URL Hash change listener
  window.addEventListener('hashchange', function () {
    var tab = tabFromHash(location.hash);
    if (tab) {
      if (!S.open) open(tab);
      else switchTab(tab);
    } else if (S.open) {
      close();
    }
  });

  // Check initial hash on page load
  var initialTab = tabFromHash(location.hash);
  if (initialTab) {
    var go = function () { setTimeout(function () { open(initialTab); }, 400); };
    if (document.readyState === 'complete') go();
    else window.addEventListener('load', go);
  }

  // Public window API
  window.ZenveOperationsDashboard = {
    open: open,
    close: close,
    switchTab: switchTab,
    reload: loadData,
    showOrder: showOrderModal
  };

  // Wire ready event
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      build();
    });
  } else {
    build();
  }

})();
