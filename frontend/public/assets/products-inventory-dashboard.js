/* =====================================================================
   Zenve BI — Products & Inventory Control Center
   Subcategory Dashboards:
     - Product Catalog        (#product-catalog)
     - SKU Management         (#sku-management)
     - Inventory Dashboard    (#inventory-dashboard)
     - Stock Management       (#stock-management)
     - Low Stock              (#low-stock)
     - Out of Stock           (#out-of-stock)
     - Expiry Management      (#expiry-management)
     - Warehouse Management   (#warehouse-management)
   Self-contained, offline-fallback, data-driven dashboard suite.
   ===================================================================== */
(function () {
  'use strict';

  var FALLBACK = '/api/v1/data';
  var STATIC_FALLBACK = '/assets/sample-fallback.json';

  /* ── Currency Helpers ─────────────────────────────────────────── */
  function inrShort(n) {
    n = Number(n) || 0;
    if (n >= 1e7) return '&#8377;' + (n / 1e7).toFixed(2) + ' Cr';
    if (n >= 1e5) return '&#8377;' + (n / 1e5).toFixed(1) + ' L';
    if (n >= 1000) return '&#8377;' + (n / 1000).toFixed(1) + 'K';
    return '&#8377;' + n.toLocaleString('en-IN');
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ── Tabs Definition ──────────────────────────────────────────── */
  /* ── Tabs Definition ──────────────────────────────────────────── */
  var TABS = [
    { id: 'catalog',    label: 'Product Catalog',    icon: '🛍️', hash: '#product-catalog',     badge: '0 SKUs' },
    { id: 'sku',        label: 'SKU Management',     icon: '🏷️', hash: '#sku-management',       badge: '0' },
    { id: 'inventory',  label: 'Inventory Dashboard',icon: '📦', hash: '#inventory-dashboard',   badge: '₹0' },
    { id: 'stock',      label: 'Stock Management',   icon: '🏗️', hash: '#stock-management',     badge: '0' },
    { id: 'lowstock',   label: 'Low Stock',          icon: '⚠️', hash: '#low-stock',            badge: '0', warnBadge: true },
    { id: 'outofstock', label: 'Out of Stock',       icon: '🚫', hash: '#out-of-stock',         badge: '0',  dangerBadge: true },
    { id: 'expiry',     label: 'Expiry Management',  icon: '⏳', hash: '#expiry-management',    badge: '0 Batches', warnBadge: true },
    { id: 'warehouse',  label: 'Warehouse Management',icon: '🏭', hash: '#warehouse-management', badge: '0 Hubs' },
    { id: 'transfers',  label: 'Stock Transfers',    icon: '🔁', hash: '#stock-transfers',      badge: '0 In Transit' },
    { id: 'valuation',  label: 'Inventory Valuation',icon: '💎', hash: '#inventory-valuation',  badge: '₹0' },
    { id: 'movement',   label: 'Inventory Movement', icon: '📈', hash: '#inventory-movement',   badge: '0 Logs' }
  ];

  /* ── Master Product Dataset ───────────────────────────────────── */
  /* ── Master Product Dataset (Live from MySQL zenve_engine) ─────── */
  var PRODUCTS = [];

  function loadLiveProducts(cb) {
    fetch('/api/v1/products')
      .then(function (res) { return res.json(); })
      .then(function (rows) {
        if (Array.isArray(rows) && rows.length > 0) {
          PRODUCTS = rows.map(function (r) {
            var pr = Number(r.price) || 0;
            var cp = Number(r.cost_price) || Math.round(pr * 0.6);
            var st = Number(r.stock) || 0;
            var minSt = Number(r.min_stock) || 15;
            return {
              id: r.id,
              sku: r.sku || ('ZV-SKU-' + r.id),
              name: r.name,
              cat: r.category || 'Pharmacy & Meds',
              subcat: r.category || 'General',
              brand: r.brand || 'Zenve Care',
              price: pr,
              cost: cp,
              mrp: Math.round(pr * 1.15),
              stock: st,
              reorder: minSt,
              moq: 12,
              weight: r.unit || 'Unit',
              vendor: (r.brand || 'Zenve Care') + ' India',
              warehouse: 'Bengaluru Hub',
              expiry: '2026-12-31',
              batches: 2,
              cold: (r.category || '').toLowerCase().indexOf('vaccine') >= 0,
              rx: (r.category || '').toLowerCase().indexOf('rx') >= 0 || (r.category || '').toLowerCase().indexOf('pharmacy') >= 0,
              active: st > 0
            };
          });
        }
        if (root && S.open) renderAll();
        if (cb) cb();
      })
      .catch(function (err) {
        console.error('[Zenve Products API Error]', err);
      });
  }
  loadLiveProducts();

  /* ── Warehouse Data ───────────────────────────────────────────── */
  var WAREHOUSES = [];

  /* ── ABC Management Dataset ───────────────────────────────────── */
  var ABC_DATA = [];

  /* ── Valuation Dataset ────────────────────────────────────────── */
  var VALUATION_CATS = [];

  /* ── Stock Transfers Dataset ──────────────────────────────────── */
  var TRANSFERS = [];

  /* ── Inventory Movements Dataset ──────────────────────────────── */
  var MOVEMENTS = [];

  /* ── Global State ─────────────────────────────────────────────── */
  var S = {
    open: false,
    tab: 'catalog',
    period: 'today',
    catFilter: 'All',
    warehouseFilter: 'All',
    abcFilter: 'ALL',
    movementFilter: 'ALL',
    valuationMethod: 'FIFO',
    transferStatusFilter: 'ALL',
    searchQuery: '',
    toastTimeout: null
  };

  var root = null;

  /* ── Utility: Tab from text/hash ──────────────────────────────── */
  function tabFromText(text) {
    if (!text) return null;
    var s = text.trim().toLowerCase();
    if (s.indexOf('product catalog') >= 0 || s === 'catalog' || s === 'products') return 'catalog';
    if (s.indexOf('sku management') >= 0 || s === 'sku') return 'sku';
    if (s.indexOf('inventory movement') >= 0 || s === 'movement') return 'movement';
    if (s.indexOf('inventory dashboard') >= 0 || s === 'inventory dashboard') return 'inventory';
    if (s.indexOf('stock management') >= 0 || s === 'stock management') return 'stock';
    if (s.indexOf('low stock') >= 0 || s === 'low stock') return 'lowstock';
    if (s.indexOf('out of stock') >= 0 || s === 'out of stock') return 'outofstock';
    if (s.indexOf('expiry management') >= 0 || s === 'expiry management' || s === 'expiry') return 'expiry';
    if (s.indexOf('warehouse management') >= 0 || s === 'warehouse management' || s === 'warehouse') return 'warehouse';
    if (s.indexOf('inventory valuation') >= 0 || s === 'valuation') return 'valuation';
    if (s.indexOf('stock transfer') >= 0 || s.indexOf('stock transfers') >= 0 || s === 'transfers') return 'transfers';
    return null;
  }

  function tabFromHash(hash) {
    if (!hash) return null;
    if (hash === '#product-catalog' || hash === '#catalog') return 'catalog';
    if (hash === '#sku-management' || hash === '#sku') return 'sku';
    if (hash === '#inventory-dashboard' || hash === '#inventory') return 'inventory';
    if (hash === '#inventory-movement' || hash === '#movement') return 'movement';
    if (hash === '#stock-management' || hash === '#stock') return 'stock';
    if (hash === '#low-stock' || hash === '#lowstock') return 'lowstock';
    if (hash === '#out-of-stock' || hash === '#outofstock') return 'outofstock';
    if (hash === '#expiry-management' || hash === '#expiry') return 'expiry';
    if (hash === '#warehouse-management' || hash === '#warehouse') return 'warehouse';
    if (hash === '#inventory-valuation' || hash === '#valuation') return 'valuation';
    if (hash === '#stock-transfers' || hash === '#stock-transfer' || hash === '#transfers') return 'transfers';
    return null;
  }

  function hashFromTab(tab) {
    var t = TABS.find(function (it) { return it.id === tab; });
    return t ? t.hash : '#inventory-dashboard';
  }

  /* ── Toast ────────────────────────────────────────────────────── */
  function showToast(msg) {
    var existing = document.getElementById('zpid-toast');
    if (existing) existing.remove();
    if (S.toastTimeout) clearTimeout(S.toastTimeout);
    var toast = document.createElement('div');
    toast.id = 'zpid-toast';
    toast.className = 'zpid-toast';
    toast.innerHTML = '<span style="font-size:16px;">✓</span> <span>' + esc(msg) + '</span>';
    document.body.appendChild(toast);
    S.toastTimeout = setTimeout(function () { if (toast && toast.parentNode) toast.remove(); }, 3200);
  }

  /* ── CSV Export ───────────────────────────────────────────────── */
  function exportCsv() {
    var data = getFilteredProducts();
    var headers = ['SKU', 'Product Name', 'Category', 'Brand', 'Price (INR)', 'Stock Qty', 'Reorder Level', 'Warehouse', 'Status'];
    var lines = [headers.join(',')];
    data.forEach(function (p) {
      lines.push([
        p.sku,
        '"' + p.name.replace(/"/g, '""') + '"',
        p.cat,
        p.brand,
        p.price,
        p.stock,
        p.reorder,
        p.warehouse,
        stockStatus(p)
      ].join(','));
    });
    var blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'zenve_inventory_' + S.tab + '_' + new Date().toISOString().slice(0, 10) + '.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Exported ' + data.length + ' products to CSV');
  }

  /* ── Data Helpers ─────────────────────────────────────────────── */
  function stockStatus(p) {
    if (p.stock === 0) return 'Out of Stock';
    if (p.stock <= p.reorder * 0.4) return 'Critical Low';
    if (p.stock <= p.reorder) return 'Low Stock';
    return 'Healthy';
  }

  function stockPct(p) {
    var max = Math.max(p.reorder * 3, p.stock + 10);
    return Math.min(100, Math.round((p.stock / max) * 100));
  }

  function stockColor(p) {
    var s = stockStatus(p);
    if (s === 'Out of Stock') return '#64748b';
    if (s === 'Critical Low') return '#ef4444';
    if (s === 'Low Stock') return '#f59e0b';
    return '#10b981';
  }

  function statusClass(p) {
    var s = stockStatus(p);
    if (s === 'Out of Stock') return 'out';
    if (s === 'Critical Low') return 'critical';
    if (s === 'Low Stock') return 'low';
    return 'healthy';
  }

  function daysUntilExpiry(dateStr) {
    if (!dateStr) return Infinity;
    var exp = new Date(dateStr);
    var now = new Date();
    return Math.round((exp - now) / 86400000);
  }

  function expiryColor(days) {
    if (days < 0) return '#ef4444';
    if (days <= 30) return '#ef4444';
    if (days <= 60) return '#f59e0b';
    return '#10b981';
  }

  function getFilteredProducts() {
    var q = (S.searchQuery || '').toLowerCase().trim();
    return PRODUCTS.filter(function (p) {
      if (S.catFilter !== 'All' && p.cat !== S.catFilter) return false;
      if (S.warehouseFilter !== 'All' && p.warehouse !== S.warehouseFilter + ' Hub') return false;
      if (q) {
        var str = (p.sku + ' ' + p.name + ' ' + p.cat + ' ' + p.brand + ' ' + p.warehouse).toLowerCase();
        if (str.indexOf(q) < 0) return false;
      }
      return true;
    });
  }

  /* ── KPI Helper ───────────────────────────────────────────────── */
  function kpi(label, value, delta, trend, icon) {
    return [
      '<div class="zpid-kpi">',
        '<div class="zpid-kpi-top">',
          '<span class="zpid-kpi-label">' + esc(label) + '</span>',
          icon ? '<span class="zpid-kpi-icon">' + icon + '</span>' : '',
        '</div>',
        '<div class="zpid-kpi-value">' + esc(String(value)) + '</div>',
        '<div class="zpid-kpi-delta ' + esc(trend) + '">' + esc(delta) + '</div>',
      '</div>'
    ].join('');
  }

  /* ── Stock Bar ────────────────────────────────────────────────── */
  function stockBar(p) {
    var pct = stockPct(p);
    var col = stockColor(p);
    return '<div class="zpid-stock-bar-wrap"><div class="zpid-stock-bar-bg"><div class="zpid-stock-bar-fill" style="width:' + pct + '%;background:' + col + '"></div></div><span style="font-size:11px;font-family:\'IBM Plex Mono\',monospace;color:' + col + '">' + p.stock + '</span></div>';
  }

  /* ── Switch / Open / Close ────────────────────────────────────── */
  function switchTab(newTab) {
    if (!newTab) return;
    S.tab = newTab;
    var targetHash = hashFromTab(newTab);
    try {
      if (location.hash !== targetHash) history.pushState(null, '', targetHash);
    } catch (e) {}
    markSidebar(true, newTab);
    renderAll();
  }

  function markSidebar(on, tab) {
    var targetTab = tab || S.tab || 'catalog';
    document.querySelectorAll('.sidebar-scope li button, .sidebar-scope button, .sidebar-scope a, [data-sidebar] button, [data-sidebar] a').forEach(function (b) {
      var bTab = tabFromText(b.textContent ? b.textContent.trim() : '');
      if (bTab) {
        b.classList.toggle('zpid-active', on && bTab === targetTab);
      }
    });
  }

  function open(tab) {
    /* Close any other open panels */
    if (window.ZenveSalesDashboard && typeof window.ZenveSalesDashboard.close === 'function') {
      try { window.ZenveSalesDashboard.close(); } catch (e) {}
    }
    if (window.ZenveOperationsDashboard && typeof window.ZenveOperationsDashboard.close === 'function') {
      try { window.ZenveOperationsDashboard.close(); } catch (e) {}
    }
    if (window.ZenvePharmacyDashboard && typeof window.ZenvePharmacyDashboard.close === 'function') {
      try { window.ZenvePharmacyDashboard.close(); } catch (e) {}
    }
    if (window.ZenveClinicsDashboard && typeof window.ZenveClinicsDashboard.close === 'function') {
      try { window.ZenveClinicsDashboard.close(); } catch (e) {}
    }
    document.querySelectorAll('.zpanel-root, [id$="-root"]').forEach(function (el) {
      if (el.id !== 'zpid-root') {
        el.classList.remove('zpanel-open', 'zod-open', 'zsd-open', 'zpid-open', 'zph-open', 'zch-open');
      }
    });

    try {
      document.querySelectorAll('[role="dialog"]').forEach(function (d) {
        if (d.closest('#zpid-root')) return;
        try { d.remove(); } catch (err) {}
      });
      document.body.style.pointerEvents = '';
      document.body.style.overflow = '';
      document.body.removeAttribute('data-scroll-locked');
    } catch (e) {}

    if (tab && TABS.some(function (t) { return t.id === tab; })) {
      S.tab = tab;
    } else if (!S.tab) {
      S.tab = tabFromHash(location.hash) || 'catalog';
    }

    if (!root) build();
    else if (!document.body.contains(root)) document.body.appendChild(root);

    S.open = true;
    root.classList.add('zpid-open');
    root.scrollTop = 0;

    var targetHash = hashFromTab(S.tab);
    try {
      if (location.hash !== targetHash) history.pushState(null, '', targetHash);
    } catch (e) {}

    setTimeout(function () { markSidebar(true, S.tab); }, 0);
    renderAll();
  }

  function close() {
    if (!root || !S.open) return;
    S.open = false;
    root.classList.remove('zpid-open');
    markSidebar(false);
    try {
      var h = location.hash;
      if (h.indexOf('product') >= 0 || h.indexOf('sku') >= 0 || h.indexOf('inventory') >= 0 || h.indexOf('stock') >= 0 || h.indexOf('expiry') >= 0 || h.indexOf('warehouse') >= 0) {
        history.pushState(null, '', location.pathname + location.search);
      }
    } catch (e) {}
  }

  /* ── Build DOM Shell ──────────────────────────────────────────── */
  function build() {
    if (root && document.body.contains(root)) return;
    root = document.createElement('div');
    root.id = 'zpid-root';
    root.setAttribute('role', 'region');
    root.setAttribute('aria-label', 'Products and Inventory Control Center');

    root.innerHTML = [
      '<div class="zpid-head">',
        '<div class="zpid-head-left">',
          '<div class="zpid-title-row">',
            '<h2 class="zpid-title" id="zpid-title">Products &amp; Inventory</h2>',
            '<span class="zpid-live-badge"><span class="zpid-pulse-dot"></span>Stock Live</span>',
          '</div>',
          '<div class="zpid-sub" id="zpid-sub">Full-suite catalog, SKU, stock, expiry &amp; warehouse management</div>',
        '</div>',
        '<div class="zpid-head-actions">',
          '<div class="zpid-seg" id="zpid-presets">',
            '<button data-p="today" class="on" type="button">Today</button>',
            '<button data-p="7d" type="button">7D</button>',
            '<button data-p="30d" type="button">30D</button>',
            '<button data-p="all" type="button">All</button>',
          '</div>',
          '<button class="zpid-btn" id="zpid-refresh" type="button">↻ Refresh</button>',
          '<button class="zpid-btn" id="zpid-export" type="button">⭳ Export CSV</button>',
          '<button class="zpid-btn primary" id="zpid-back" type="button">← Executive Dashboard</button>',
        '</div>',
      '</div>',
      '<div class="zpid-tabs-bar" id="zpid-tabs-bar"></div>',
      '<div class="zpid-body" id="zpid-content"></div>'
    ].join('');

    document.body.appendChild(root);

    root.querySelector('#zpid-back').onclick = close;
    root.querySelector('#zpid-refresh').onclick = function () { renderAll(); showToast('Stock levels and pricing refreshed'); };
    root.querySelector('#zpid-export').onclick = exportCsv;

    var presets = root.querySelector('#zpid-presets');
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

  /* ── Render Tabs Bar ──────────────────────────────────────────── */
  function renderTabs() {
    var bar = root.querySelector('#zpid-tabs-bar');
    if (!bar) return;
    bar.innerHTML = TABS.map(function (t) {
      var isOn = t.id === S.tab;
      var badgeCls = t.dangerBadge ? ' danger' : (t.warnBadge ? ' warn' : '');
      return [
        '<button type="button" class="zpid-tab' + (isOn ? ' on' : '') + '" data-tab="' + t.id + '">',
          '<span>' + t.icon + '</span>',
          '<span>' + t.label + '</span>',
          '<span class="zpid-tab-badge' + badgeCls + '">' + t.badge + '</span>',
        '</button>'
      ].join('');
    }).join('');
    bar.querySelectorAll('.zpid-tab').forEach(function (btn) {
      btn.onclick = function () {
        var tid = btn.getAttribute('data-tab');
        if (tid) switchTab(tid);
      };
    });
  }

  /* ── Render Dispatcher ────────────────────────────────────────── */
  function renderAll() {
    if (!root) return;
    renderTabs();
    var curTab = TABS.find(function (t) { return t.id === S.tab; });
    var titleEl = root.querySelector('#zpid-title');
    if (titleEl && curTab) titleEl.textContent = 'Products & Inventory — ' + curTab.label;

    var container = root.querySelector('#zpid-content');
    if (!container) return;

    if (S.tab === 'catalog')    container.innerHTML = renderCatalogView();
    else if (S.tab === 'sku')   container.innerHTML = renderSkuView();
    else if (S.tab === 'inventory') container.innerHTML = renderInventoryView();
    else if (S.tab === 'stock') container.innerHTML = renderStockView();
    else if (S.tab === 'lowstock') container.innerHTML = renderLowStockView();
    else if (S.tab === 'outofstock') container.innerHTML = renderOutOfStockView();
    else if (S.tab === 'expiry') container.innerHTML = renderExpiryView();
    else if (S.tab === 'warehouse') container.innerHTML = renderWarehouseView();
    else if (S.tab === 'valuation') container.innerHTML = renderValuationView();
    else if (S.tab === 'transfers') container.innerHTML = renderTransfersView();
    else if (S.tab === 'movement')  container.innerHTML = renderMovementView();

    wireEvents(container);
  }

  /* ── Wire interactive events ──────────────────────────────────── */
  function wireEvents(container) {
    var search = container.querySelector('#zpid-search-input');
    if (search) {
      search.oninput = function () {
        S.searchQuery = search.value;
        renderAll();
      };
    }
    var catFilter = container.querySelector('#zpid-cat-filter');
    if (catFilter) {
      catFilter.onchange = function () {
        S.catFilter = catFilter.value;
        renderAll();
      };
    }
    var wFilter = container.querySelector('#zpid-wh-filter');
    if (wFilter) {
      wFilter.onchange = function () {
        S.warehouseFilter = wFilter.value;
        renderAll();
      };
    }
    container.querySelectorAll('[data-tab-jump]').forEach(function (btn) {
      btn.onclick = function () { switchTab(btn.getAttribute('data-tab-jump')); };
    });
    container.querySelectorAll('.zpid-expiry-action').forEach(function (btn) {
      btn.onclick = function () { showToast('Quarantine request raised for ' + btn.getAttribute('data-sku')); };
    });
    container.querySelectorAll('.zpid-abc-chip').forEach(function (btn) {
      btn.onclick = function () {
        S.abcFilter = btn.getAttribute('data-abc') || 'ALL';
        renderAll();
      };
    });
    container.querySelectorAll('.zpid-mov-chip').forEach(function (btn) {
      btn.onclick = function () {
        S.movementFilter = btn.getAttribute('data-mov') || 'ALL';
        renderAll();
      };
    });
    container.querySelectorAll('.zpid-val-method-btn').forEach(function (btn) {
      btn.onclick = function () {
        S.valuationMethod = btn.getAttribute('data-method') || 'FIFO';
        renderAll();
      };
    });
    container.querySelectorAll('.zpid-trf-status-btn').forEach(function (btn) {
      btn.onclick = function () {
        S.transferStatusFilter = btn.getAttribute('data-status') || 'ALL';
        renderAll();
      };
    });
    var addProdBtn = container.querySelector('#zpid-btn-add-product');
    if (addProdBtn) {
      addProdBtn.onclick = function () {
        showNewProductModal();
      };
    }
    var newTrfBtn = container.querySelector('#zpid-new-transfer-btn');
    if (newTrfBtn) {
      newTrfBtn.onclick = function () {
        showNewTransferModal();
      };
    }
  }

  /* ── Add Product Modal (Live MySQL Persistence) ───────────────── */
  function showNewProductModal() {
    var modalHtml = [
      '<div class="zpid-modal-backdrop" id="zpid-add-modal" style="position:fixed;inset:0;background:rgba(0,0,0,0.65);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;z-index:9999999;">',
        '<div style="background:#0f172a;border:1px solid #334155;border-radius:12px;padding:24px;width:440px;color:#f8fafc;box-shadow:0 25px 50px rgba(0,0,0,0.6);">',
          '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">',
            '<h3 style="margin:0;font-size:16px;font-weight:700;">Add Product to MySQL Catalog</h3>',
            '<button type="button" style="background:none;border:none;color:#94a3b8;font-size:18px;cursor:pointer;" onclick="document.getElementById(\'zpid-add-modal\').remove()">✕</button>',
          '</div>',
          '<form id="zpid-add-product-form" style="display:flex;flex-direction:column;gap:12px;font-size:12px;">',
            '<div><label style="display:block;color:#94a3b8;margin-bottom:4px;">Product Name</label><input required class="zpid-input" id="zp-name" style="width:100%;padding:8px;background:#1e293b;border:1px solid #334155;border-radius:6px;color:#fff;" placeholder="e.g. Royal Canin Hypoallergenic 2kg"/></div>',
            '<div><label style="display:block;color:#94a3b8;margin-bottom:4px;">Category</label><input required class="zpid-input" id="zp-cat" style="width:100%;padding:8px;background:#1e293b;border:1px solid #334155;border-radius:6px;color:#fff;" placeholder="e.g. Clinical Nutrition"/></div>',
            '<div><label style="display:block;color:#94a3b8;margin-bottom:4px;">Brand</label><input required class="zpid-input" id="zp-brand" style="width:100%;padding:8px;background:#1e293b;border:1px solid #334155;border-radius:6px;color:#fff;" placeholder="e.g. Royal Canin"/></div>',
            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">',
              '<div><label style="display:block;color:#94a3b8;margin-bottom:4px;">Retail Price (₹)</label><input type="number" required class="zpid-input" id="zp-price" style="width:100%;padding:8px;background:#1e293b;border:1px solid #334155;border-radius:6px;color:#fff;" placeholder="2499"/></div>',
              '<div><label style="display:block;color:#94a3b8;margin-bottom:4px;">Initial Stock</label><input type="number" required class="zpid-input" id="zp-stock" style="width:100%;padding:8px;background:#1e293b;border:1px solid #334155;border-radius:6px;color:#fff;" placeholder="40"/></div>',
            '</div>',
            '<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:12px;">',
              '<button type="button" class="zpid-btn" style="padding:6px 14px;" onclick="document.getElementById(\'zpid-add-modal\').remove()">Cancel</button>',
              '<button type="submit" class="zpid-btn primary" style="padding:6px 14px;background:#0ea5e9;color:#fff;border:none;border-radius:6px;font-weight:600;cursor:pointer;">Save to MySQL</button>',
            '</div>',
          '</form>',
        '</div>',
      '</div>'
    ].join('');

    var div = document.createElement('div');
    div.innerHTML = modalHtml;
    document.body.appendChild(div.firstElementChild);

    var form = document.getElementById('zpid-add-product-form');
    if (form) {
      form.onsubmit = function (e) {
        e.preventDefault();
        var name = document.getElementById('zp-name').value;
        var cat = document.getElementById('zp-cat').value;
        var brand = document.getElementById('zp-brand').value;
        var price = Number(document.getElementById('zp-price').value) || 999;
        var stock = Number(document.getElementById('zp-stock').value) || 30;

        fetch('/api/v1/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: name, category: cat, brand: brand, price: price, stock: stock })
        })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          if (data && data.success) {
            var m = document.getElementById('zpid-add-modal');
            if (m) m.remove();
            showToast('✓ Product "' + name + '" saved to MySQL zenve_engine!');
            loadLiveProducts();
          }
        })
        .catch(function (err) {
          showToast('Error saving product: ' + err.message);
        });
      };
    }
  }

  /* ── CATEGORIES for filter ─────────────────────────────────────── */
  var CATS = ['All', 'Pharmacy & Meds', 'Clinical Nutrition', 'Vaccines', 'Accessories', 'Pet Nutrition', 'Dermatology', 'Supplements', 'Pet Tech', 'Fashion & Apparel'];
  var WHS  = ['All', 'Bengaluru', 'Mumbai', 'Delhi', 'Hyderabad', 'Pune'];

  function catOptions() {
    return CATS.map(function (c) { return '<option value="' + esc(c) + '"' + (S.catFilter === c ? ' selected' : '') + '>' + esc(c) + '</option>'; }).join('');
  }
  function whOptions() {
    return WHS.map(function (w) { return '<option value="' + esc(w) + '"' + (S.warehouseFilter === w ? ' selected' : '') + '>' + esc(w) + '</option>'; }).join('');
  }

  /* ── SVG: Stock Trend Sparkline ───────────────────────────────── */
  function renderStockTrendSvg() {
    return '<div style="text-align:center;padding:32px;color:#94a3b8;font-size:12px;">No historical SKU count trend data logged.</div>';
  }

  /* ── SVG: Category Donut ──────────────────────────────────────── */
  function renderDonutSvg() {
    return '<div style="text-align:center;padding:32px;color:#94a3b8;font-size:12px;">No active category product distribution data.</div>';
  }

  /* ── SVG: Warehouse Capacity Bar ──────────────────────────────── */
  function renderCapacitySvg() {
    if (!WAREHOUSES || WAREHOUSES.length === 0) {
      return '<div style="text-align:center;padding:32px;color:#94a3b8;font-size:12px;">No warehouse capacity utilization data available.</div>';
    }
    var W = 600, H = 140;
    var whs = WAREHOUSES;
    var barH = 18, gapY = 24;
    var labelW = 160, padL = 170, padR = 80, padT = 10;

    var bars = whs.map(function (w, i) {
      var y = padT + i * (barH + gapY);
      var barW = ((W - padL - padR) * w.capacity / 100);
      var col = w.capacity > 85 ? '#f59e0b' : w.capacity > 70 ? '#10b981' : '#0ea5e9';
      return [
        '<text x="' + (padL - 8) + '" y="' + (y + barH / 2 + 4) + '" text-anchor="end" font-size="11" fill="#94a3b8">' + esc(w.city.split(',')[1].trim()) + ' ' + w.id + '</text>',
        '<rect x="' + padL + '" y="' + y + '" width="' + (W - padL - padR) + '" height="' + barH + '" rx="4" fill="rgba(255,255,255,0.05)"/>',
        '<rect x="' + padL + '" y="' + y + '" width="' + barW + '" height="' + barH + '" rx="4" fill="' + col + '" opacity="0.8"/>',
        '<text x="' + (padL + barW + 6) + '" y="' + (y + barH / 2 + 4) + '" font-size="11" fill="' + col + '" font-family="\'IBM Plex Mono\',monospace">' + w.capacity + '%</text>'
      ].join('');
    }).join('');

    return [
      '<svg viewBox="0 0 ' + W + ' ' + (padT + whs.length * (barH + gapY)) + '" xmlns="http://www.w3.org/2000/svg">',
        bars,
      '</svg>'
    ].join('');
  }

  /* =====================================================================
     VIEW 1: Product Catalog
     ===================================================================== */
  function renderCatalogView() {
    var products = getFilteredProducts();
    var cats = {};
    products.forEach(function (p) { cats[p.cat] = (cats[p.cat] || 0) + 1; });

    return [
      '<div class="zpid-kpis">',
        kpi('Total Active SKUs', PRODUCTS.length, 'Live in MySQL', 'neutral', '🛍️'),
        kpi('Total SKU Value', inrShort(0), 'Warehouse valuation', 'neutral', '💰'),
        kpi('Categories', Object.keys(cats).length, 'Product groups', 'neutral', '📂'),
        kpi('Avg. Gross Margin', '0.0%', 'Historical margin', 'neutral', '📊'),
        kpi('New Listings (MTD)', '0', 'Added this month', 'neutral', '✨'),
        kpi('Discontinued', '0', 'Archived SKUs', 'neutral', '🗃️'),
      '</div>',

      '<div class="zpid-card">',
        '<div class="zpid-ph">',
          '<div><h3>📋 Product Catalog</h3><small>Full SKU registry — search, filter, and manage all active listings</small></div>',
          '<div style="display:flex;align-items:center;gap:8px;"><span class="zpid-badge purple">' + products.length + ' products in MySQL</span><button type="button" class="zpid-btn primary" id="zpid-btn-add-product" style="padding:6px 12px;background:#0ea5e9;color:#fff;border:none;border-radius:6px;font-weight:600;cursor:pointer;">+ Add Product</button></div>',
        '</div>',
        '<div class="zpid-search-wrap">',
          '<input type="text" id="zpid-search-input" class="zpid-search" placeholder="Search by SKU, name, brand, category…" value="' + esc(S.searchQuery) + '"/>',
          '<select id="zpid-cat-filter" class="zpid-filter-select">' + catOptions() + '</select>',
          '<select id="zpid-wh-filter" class="zpid-filter-select">' + whOptions() + '</select>',
        '</div>',
        '<div class="zpid-table-wrap" style="margin-top:8px">',
          '<table class="zpid-table">',
            '<thead><tr>',
              '<th>SKU</th><th>Product Name</th><th>Category</th><th>Brand</th>',
              '<th style="text-align:right">Price</th><th style="text-align:right">MRP</th>',
              '<th>Stock Level</th><th style="text-align:right">Margin</th>',
              '<th>Warehouse</th><th>Flags</th><th style="text-align:right">Status</th>',
            '</tr></thead>',
            '<tbody>',
              products.length === 0 ?
                '<tr><td colspan="11" style="text-align:center;padding:32px;color:#94a3b8;">No products found in catalog. Click "+ Add Product" to onboard.</td></tr>' :
                products.map(function (p) {
                  var margin = p.price > 0 ? Math.round(((p.price - p.cost) / p.price) * 100) : 0;
                  var flags = '';
                  if (p.cold) flags += '<span class="zpid-badge blue" style="margin-right:4px">❄ Cold</span>';
                  if (p.rx)   flags += '<span class="zpid-badge amber">Rx</span>';
                  return [
                    '<tr>',
                      '<td class="zpid-mono">' + esc(p.sku) + '</td>',
                      '<td class="zpid-bold" style="max-width:220px">' + esc(p.name) + '</td>',
                      '<td class="zpid-muted">' + esc(p.cat) + '</td>',
                      '<td class="zpid-muted">' + esc(p.brand) + '</td>',
                      '<td style="text-align:right;font-family:\'IBM Plex Mono\',monospace">₹' + p.price.toLocaleString('en-IN') + '</td>',
                      '<td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;color:#64748b">₹' + p.mrp.toLocaleString('en-IN') + '</td>',
                      '<td>' + stockBar(p) + '</td>',
                      '<td style="text-align:right"><span class="zpid-kpi-delta ' + (margin >= 40 ? 'up' : margin >= 25 ? 'warn' : 'down') + '">' + margin + '%</span></td>',
                      '<td class="zpid-muted">' + esc(p.warehouse.replace(' Hub', '')) + '</td>',
                      '<td>' + (flags || '—') + '</td>',
                      '<td style="text-align:right"><span class="zpid-pill ' + statusClass(p) + '">' + esc(stockStatus(p)) + '</span></td>',
                    '</tr>'
                  ].join('');
                }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>',

      '<div class="zpid-grid-2">',
        '<div class="zpid-card">',
          '<div class="zpid-ph"><div><h3>📊 SKUs by Category</h3><small>Distribution of active product listings</small></div></div>',
          renderDonutSvg(),
        '</div>',
        '<div class="zpid-card">',
          '<div class="zpid-ph"><div><h3>📈 Active SKU Count Trend</h3><small>Monthly catalog growth over past 7 months</small></div></div>',
          '<div class="zpid-chart-wrap">' + renderStockTrendSvg() + '</div>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* =====================================================================
     VIEW 2: SKU Management
     ===================================================================== */
  function renderSkuView() {
    var products = getFilteredProducts();
    var totalSkus = PRODUCTS.length;
    var activeSkus = PRODUCTS.filter(function (p) { return p.active; }).length;
    var coldSkus   = PRODUCTS.filter(function (p) { return p.cold; }).length;
    var rxSkus     = PRODUCTS.filter(function (p) { return p.rx; }).length;

    return [
      '<div class="zpid-kpis">',
        kpi('Total SKUs', totalSkus, activeSkus + ' active', 'neutral', '🏷️'),
        kpi('Cold Chain SKUs', coldSkus, 'Requires 2-8°C storage', 'neutral', '❄️'),
        kpi('Rx (Prescription) SKUs', rxSkus, 'Vet authorization needed', 'neutral', '📋'),
        kpi('Avg. Batches/SKU', '0', '0 vs last quarter', 'neutral', '📦'),
        kpi('Multi-Vendor SKUs', '0', 'Dual-source approved', 'neutral', '🤝'),
        kpi('Inactive SKUs', totalSkus - activeSkus, 'Pending review/reactivation', 'neutral', '🗃️'),
      '</div>',

      '<div class="zpid-card">',
        '<div class="zpid-ph">',
          '<div><h3>🏷️ SKU Master Registry</h3><small>Detailed specification sheet for every product unit in the catalog</small></div>',
          '<span class="zpid-badge purple">Live</span>',
        '</div>',
        '<div class="zpid-search-wrap">',
          '<input type="text" id="zpid-search-input" class="zpid-search" placeholder="Search SKU, product, vendor…" value="' + esc(S.searchQuery) + '"/>',
          '<select id="zpid-cat-filter" class="zpid-filter-select">' + catOptions() + '</select>',
        '</div>',
        '<div class="zpid-table-wrap" style="margin-top:8px">',
          '<table class="zpid-table">',
            '<thead><tr>',
              '<th>SKU Code</th><th>Product Name</th><th>Subcategory</th>',
              '<th style="text-align:right">Unit Cost</th><th style="text-align:right">Sell Price</th>',
              '<th>MOQ</th><th>Batches</th><th>Vendor</th><th>Weight</th><th>Flags</th><th>Status</th>',
            '</tr></thead>',
            '<tbody>',
              products.length === 0 ? '<tr><td colspan="11" style="text-align:center;padding:32px;color:#94a3b8">No SKU records found in catalog</td></tr>' : products.map(function (p) {
                var flags = [];
                if (p.cold) flags.push('❄ Cold Chain');
                if (p.rx)   flags.push('📋 Rx Required');
                return [
                  '<tr>',
                    '<td class="zpid-mono">' + esc(p.sku) + '</td>',
                    '<td class="zpid-bold">' + esc(p.name) + '</td>',
                    '<td class="zpid-muted">' + esc(p.subcat) + '</td>',
                    '<td style="text-align:right;font-family:\'IBM Plex Mono\',monospace">₹' + p.cost.toLocaleString('en-IN') + '</td>',
                    '<td style="text-align:right;font-family:\'IBM Plex Mono\',monospace">₹' + p.price.toLocaleString('en-IN') + '</td>',
                    '<td class="zpid-mono">' + p.moq + '</td>',
                    '<td class="zpid-mono">' + p.batches + '</td>',
                    '<td class="zpid-muted" style="max-width:160px;font-size:11px">' + esc(p.vendor) + '</td>',
                    '<td class="zpid-muted">' + esc(p.weight) + '</td>',
                    '<td>' + (flags.length ? flags.map(function (f) { return '<div style="font-size:10px;color:#94a3b8">' + esc(f) + '</div>'; }).join('') : '—') + '</td>',
                    '<td><span class="zpid-pill ' + (p.active ? 'healthy' : 'out') + '">' + (p.active ? 'Active' : 'Inactive') + '</span></td>',
                  '</tr>'
                ].join('');
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>',

      '<div class="zpid-card">',
        '<div class="zpid-ph"><div><h3>📦 Vendor-to-SKU Distribution</h3><small>Top vendors by number of active SKUs supplied</small></div></div>',
        '<div class="zpid-progress-row">',
          '<div style="text-align:center;padding:24px;color:#94a3b8;width:100%">No vendor distribution records available</div>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* =====================================================================
     VIEW 3: Inventory Dashboard
     ===================================================================== */
  function renderInventoryView() {
    var total = PRODUCTS.reduce(function (a, p) { return a + p.stock * p.cost; }, 0);
    var lowCount = PRODUCTS.filter(function (p) { return p.stock > 0 && p.stock <= p.reorder; }).length;
    var outCount = PRODUCTS.filter(function (p) { return p.stock === 0; }).length;
    var expiryCount = PRODUCTS.filter(function (p) { return p.expiry && daysUntilExpiry(p.expiry) <= 30 && daysUntilExpiry(p.expiry) >= 0; }).length;
    var activeCount = PRODUCTS.filter(function (p) { return p.active; }).length;

    return [
      '<div class="zpid-kpis">',
        kpi('Total Stock Value', inrShort(total), 'Consolidated valuation', 'neutral', '💰'),
        kpi('Active SKUs', activeCount, activeCount > 0 ? 'Live catalog' : 'No active items', 'neutral', '🏷️'),
        kpi('Low Stock Items', lowCount, 'Below reorder level', lowCount > 0 ? 'down' : 'neutral', '⚠️'),
        kpi('Out of Stock', outCount, 'Zero inventory SKUs', outCount > 0 ? 'down' : 'neutral', '🚫'),
        kpi('Expiring in 30 Days', expiryCount + ' batches', 'FEFO tracking active', expiryCount > 0 ? 'warn' : 'neutral', '⏳'),
        kpi('Inventory Turnover', '0.0x', '0 vs target', 'neutral', '🔄'),
      '</div>',

      '<div class="zpid-grid-2">',
        '<div class="zpid-card">',
          '<div class="zpid-ph"><div><h3>📈 SKU Count Trend</h3><small>Active SKUs by month — catalog growth trajectory</small></div></div>',
          '<div class="zpid-chart-wrap">' + renderStockTrendSvg() + '</div>',
        '</div>',
        '<div class="zpid-card">',
          '<div class="zpid-ph"><div><h3>🏢 Warehouse Capacity Utilisation</h3><small>Current fill rate across regional hubs</small></div></div>',
          '<div class="zpid-chart-wrap">' + renderCapacitySvg() + '</div>',
        '</div>',
      '</div>',

      '<div class="zpid-card">',
        '<div class="zpid-ph">',
          '<div><h3>⚡ Inventory Quick Actions</h3><small>Navigate to specific inventory management views</small></div>',
        '</div>',
        '<div style="display:flex;flex-wrap:wrap;gap:10px;padding:16px 18px">',
          actionCard('⚠️ Low Stock Alert', lowCount + ' SKUs need reorder', 'lowstock', 'amber'),
          actionCard('🚫 Out of Stock', outCount + ' SKUs — zero units', 'outofstock', 'red'),
          actionCard('⏳ Expiry Management', expiryCount + ' batches near expiry', 'expiry', 'orange'),
          actionCard('🏭 Warehouse View', WAREHOUSES.length + ' Hubs', 'warehouse', 'purple'),
          actionCard('🛍️ Product Catalog', PRODUCTS.length + ' SKUs registered', 'catalog', 'blue'),
          actionCard('🏷️ SKU Management', activeCount + ' Active SKUs', 'sku', 'green'),
        '</div>',
      '</div>',

      '<div class="zpid-card">',
        '<div class="zpid-ph">',
          '<div><h3>📦 Category-wise Stock Value</h3><small>Inventory value distribution by product category</small></div>',
          '<span class="zpid-badge purple">Total: ' + inrShort(total) + '</span>',
        '</div>',
        '<div class="zpid-progress-row">',
          '<div style="text-align:center;padding:24px;color:#94a3b8;width:100%">No category stock data available</div>',
        '</div>',
      '</div>'
    ].join('');
  }

  function actionCard(icon_label, sub, tab, color) {
    var colors = { amber: '#f59e0b', red: '#f87171', orange: '#fb923c', purple: '#a78bfa', blue: '#38bdf8', green: '#10b981' };
    var col = colors[color] || '#a78bfa';
    return [
      '<button data-tab-jump="' + tab + '" style="',
        'display:flex;flex-direction:column;gap:6px;padding:14px 16px;',
        'background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);',
        'border-radius:10px;cursor:pointer;text-align:left;min-width:150px;flex:1;',
        'transition:border-color 0.15s;color:inherit;',
        '" onmouseover="this.style.borderColor=\'' + col + '40\'" onmouseout="this.style.borderColor=\'rgba(255,255,255,0.08)\'">',
        '<span style="font-size:20px">' + icon_label.split(' ')[0] + '</span>',
        '<span style="font-size:13px;font-weight:700">' + esc(icon_label.split(' ').slice(1).join(' ')) + '</span>',
        '<span style="font-size:11px;color:#94a3b8">' + esc(sub) + '</span>',
      '</button>'
    ].join('');
  }

  /* =====================================================================
     VIEW 4: Stock Management
     ===================================================================== */
  function renderStockView() {
    var products = getFilteredProducts();
    var reorderCount = PRODUCTS.filter(function (p) { return p.stock <= p.reorder; }).length;
    var totalOnHand = PRODUCTS.reduce(function (a, p) { return a + p.stock; }, 0);
    return [
      '<div class="zpid-kpis">',
        kpi('Total Units On-Hand', totalOnHand, 'Across all warehouses', 'neutral', '🏗️'),
        kpi('Reorder Required', reorderCount, 'Below minimum threshold', reorderCount > 0 ? 'down' : 'neutral', '🔔'),
        kpi('Reorder Value (Est.)', inrShort(PRODUCTS.reduce(function(a,p){return p.stock<=p.reorder?(p.reorder*2-p.stock)*p.cost+a:a;},0)), 'To replenish to safety stock', 'neutral', '💸'),
        kpi('Avg. Days of Cover', '0 days', 'Before stockout', 'neutral', '📅'),
        kpi('Over-Stocked SKUs', '0', 'Above 90-day cover', 'neutral', '📦'),
        kpi('Pending POs', '0', 'Purchase orders in transit', 'neutral', '📋'),
      '</div>',

      '<div class="zpid-card">',
        '<div class="zpid-ph">',
          '<div><h3>🏗️ Stock Level Management</h3><small>Real-time stock against reorder and safety levels — sortable and searchable</small></div>',
          '<span class="zpid-badge amber">' + reorderCount + ' Action Items</span>',
        '</div>',
        '<div class="zpid-search-wrap">',
          '<input type="text" id="zpid-search-input" class="zpid-search" placeholder="Filter products…" value="' + esc(S.searchQuery) + '"/>',
          '<select id="zpid-cat-filter" class="zpid-filter-select">' + catOptions() + '</select>',
          '<select id="zpid-wh-filter" class="zpid-filter-select">' + whOptions() + '</select>',
        '</div>',
        '<div class="zpid-table-wrap" style="margin-top:8px">',
          '<table class="zpid-table">',
            '<thead><tr>',
              '<th>SKU</th><th>Product</th><th>Category</th>',
              '<th style="text-align:right">On-Hand</th><th style="text-align:right">Reorder At</th>',
              '<th>Stock Level</th><th style="text-align:right">Days Cover</th>',
              '<th style="text-align:right">Est. Reorder Value</th><th>Warehouse</th><th>Action</th>',
            '</tr></thead>',
            '<tbody>',
              products.length === 0 ? '<tr><td colspan="10" style="text-align:center;padding:32px;color:#94a3b8">No stock records found</td></tr>' : products.map(function (p) {
                var daysOfCover = p.stock > 0 ? Math.round(p.stock / Math.max(1, p.reorder / 14)) : 0;
                var reorderVal = Math.max(0, (p.reorder * 2 - p.stock)) * p.cost;
                var needsAction = p.stock <= p.reorder;
                return [
                  '<tr>',
                    '<td class="zpid-mono">' + esc(p.sku) + '</td>',
                    '<td class="zpid-bold">' + esc(p.name) + '</td>',
                    '<td class="zpid-muted">' + esc(p.cat) + '</td>',
                    '<td style="text-align:right;font-weight:700;font-family:\'IBM Plex Mono\',monospace;color:' + stockColor(p) + '">' + p.stock + '</td>',
                    '<td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;color:#64748b">' + p.reorder + '</td>',
                    '<td>' + stockBar(p) + '</td>',
                    '<td style="text-align:right"><span class="zpid-kpi-delta ' + (daysOfCover > 20 ? 'up' : daysOfCover > 7 ? 'warn' : 'down') + '">' + daysOfCover + 'd</span></td>',
                    '<td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;color:' + (reorderVal > 0 ? '#f59e0b' : '#10b981') + '">' + (reorderVal > 0 ? inrShort(reorderVal) : '—') + '</td>',
                    '<td class="zpid-muted">' + esc(p.warehouse.replace(' Hub', '')) + '</td>',
                    '<td>' + (needsAction ? '<button class="zpid-expiry-action" style="background:rgba(139,92,246,0.15);color:#a78bfa" onclick="window.ZenveProductsInventory && showToast(\'PO raised for ' + esc(p.sku) + '\')">Raise PO</button>' : '<span class="zpid-muted">OK</span>') + '</td>',
                  '</tr>'
                ].join('');
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* =====================================================================
     VIEW 5: Low Stock
     ===================================================================== */
  function renderLowStockView() {
    var lowItems = PRODUCTS.filter(function (p) { return p.stock > 0 && p.stock <= p.reorder; });
    var critItems = PRODUCTS.filter(function (p) { return p.stock > 0 && p.stock <= p.reorder * 0.4; });

    return [
      '<div class="zpid-kpis">',
        kpi('Low Stock SKUs', lowItems.length, critItems.length + ' critical', lowItems.length > 0 ? 'down' : 'neutral', '⚠️'),
        kpi('Critical (< 40% Reorder)', critItems.length, 'Immediate action needed', critItems.length > 0 ? 'down' : 'neutral', '🔴'),
        kpi('Est. Stockout in 7 Days', '0 SKUs', 'At current sales velocity', 'neutral', '📉'),
        kpi('Reorder Value Required', inrShort(lowItems.reduce(function(a,p){return (p.reorder*2-p.stock)*p.cost+a;},0)), 'To restore to safety stock', 'neutral', '💸'),
        kpi('POs Pending', '0', 'Already raised', 'neutral', '📋'),
        kpi('Suppliers Alerted', '0', 'Auto-notifications sent', 'neutral', '📡'),
      '</div>',

      '<div class="zpid-card">',
        '<div class="zpid-ph">',
          '<div><h3>⚠️ Low Stock Alert Centre</h3><small>Products below reorder threshold — sorted by criticality</small></div>',
          '<span class="zpid-badge amber">' + lowItems.length + ' SKUs Flagged</span>',
        '</div>',
        '<div class="zpid-table-wrap">',
          '<table class="zpid-table">',
            '<thead><tr>',
              '<th>SKU</th><th>Product Name</th><th>Category</th>',
              '<th style="text-align:right">On-Hand</th><th style="text-align:right">Reorder At</th>',
              '<th>Stock Level</th><th>Vendor</th><th style="text-align:right">Reorder Value</th><th>Priority</th>',
            '</tr></thead>',
            '<tbody>',
              lowItems.length === 0 ? '<tr><td colspan="8" style="text-align:center;padding:32px;color:#94a3b8">No low stock items currently</td></tr>' : lowItems.sort(function (a, b) { return a.stock - b.stock; }).map(function (p) {
                var reorderVal = (p.reorder * 2 - p.stock) * p.cost;
                var isCrit = p.stock <= p.reorder * 0.4;
                return [
                  '<tr>',
                    '<td class="zpid-mono">' + esc(p.sku) + '</td>',
                    '<td class="zpid-bold">' + esc(p.name) + '</td>',
                    '<td class="zpid-muted">' + esc(p.cat) + '</td>',
                    '<td style="text-align:right;font-weight:700;font-family:\'IBM Plex Mono\',monospace;color:' + stockColor(p) + '">' + p.stock + '</td>',
                    '<td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;color:#64748b">' + p.reorder + '</td>',
                    '<td>' + stockBar(p) + '</td>',
                    '<td class="zpid-muted" style="font-size:11px">' + esc(p.vendor) + '</td>',
                    '<td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;color:#f59e0b">' + inrShort(reorderVal) + '</td>',
                    '<td><span class="zpid-pill ' + (isCrit ? 'critical' : 'low') + '">' + (isCrit ? '🔴 Critical' : '🟡 Low') + '</span></td>',
                  '</tr>'
                ].join('');
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>',

      '<div class="zpid-card">',
        '<div class="zpid-ph"><div><h3>📋 Category-wise Low Stock Summary</h3><small>Aggregate low-stock impact by category</small></div></div>',
        '<div class="zpid-progress-row">',
          '<div style="text-align:center;padding:24px;color:#94a3b8;width:100%">No low stock categories</div>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* =====================================================================
     VIEW 6: Out of Stock
     ===================================================================== */
  function renderOutOfStockView() {
    var outItems = PRODUCTS.filter(function (p) { return p.stock === 0; });

    return [
      '<div class="zpid-kpis">',
        kpi('Out of Stock SKUs', outItems.length, 'Zero inventory', outItems.length > 0 ? 'down' : 'neutral', '🚫'),
        kpi('Est. Revenue Lost (MTD)', '₹0', 'Based on avg. daily demand', 'neutral', '📉'),
        kpi('Orders Impacted', '0', 'Unfulfillable this week', 'neutral', '📦'),
        kpi('Avg. Days Out-of-Stock', '0 days', 'This month average', 'neutral', '📅'),
        kpi('POs Placed', '0', 'Replenishment in progress', 'neutral', '📋'),
        kpi('Customer Backorders', '0', 'Waiting on stock', 'neutral', '🔔'),
      '</div>',

      '<div class="zpid-card">',
        '<div class="zpid-ph">',
          '<div><h3>🚫 Out of Stock Products</h3><small>Zero-inventory SKUs — replenishment urgency and lost revenue analysis</small></div>',
          '<span class="zpid-badge red">' + outItems.length + ' SKUs Unavailable</span>',
        '</div>',
        '<div class="zpid-table-wrap">',
          '<table class="zpid-table">',
            '<thead><tr>',
              '<th>SKU</th><th>Product Name</th><th>Category</th>',
              '<th>Warehouse</th><th style="text-align:right">Reorder Level</th>',
              '<th style="text-align:right">Est. Daily Demand</th>',
              '<th style="text-align:right">Lost Rev/Day</th>',
              '<th>Vendor</th><th>Urgency</th>',
            '</tr></thead>',
            '<tbody>',
              outItems.length === 0 ? '<tr><td colspan="8" style="text-align:center;padding:32px;color:#94a3b8">No out of stock items</td></tr>' : outItems.map(function (p, i) {
                var dailyDemand = Math.round(p.reorder / 14);
                var lostRev = dailyDemand * p.price;
                var urgency = p.rx ? 'critical' : p.cold ? 'critical' : (i < 2 ? 'critical' : 'low');
                return [
                  '<tr>',
                    '<td class="zpid-mono">' + esc(p.sku) + '</td>',
                    '<td class="zpid-bold">' + esc(p.name) + '</td>',
                    '<td class="zpid-muted">' + esc(p.cat) + '</td>',
                    '<td class="zpid-muted">' + esc(p.warehouse.replace(' Hub', '')) + '</td>',
                    '<td style="text-align:right;font-family:\'IBM Plex Mono\',monospace">' + p.reorder + '</td>',
                    '<td style="text-align:right;font-family:\'IBM Plex Mono\',monospace">' + dailyDemand + ' units/day</td>',
                    '<td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;color:#ef4444">' + inrShort(lostRev) + '/day</td>',
                    '<td class="zpid-muted" style="font-size:11px">' + esc(p.vendor) + '</td>',
                    '<td><span class="zpid-pill ' + urgency + '">' + (urgency === 'critical' ? '🔴 Critical' : '🟡 Standard') + '</span></td>',
                  '</tr>'
                ].join('');
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>',

      '<div class="zpid-card">',
        '<div class="zpid-ph"><div><h3>📊 Out-of-Stock Root Cause Analysis</h3><small>Why these products went to zero</small></div></div>',
        '<div class="zpid-progress-row">',
          '<div style="text-align:center;padding:24px;color:#94a3b8;width:100%">No out of stock items to analyze</div>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* =====================================================================
     VIEW 7: Expiry Management
     ===================================================================== */
  function renderExpiryView() {
    var expiryItems = PRODUCTS.filter(function (p) { return p.expiry; })
      .map(function (p) { return Object.assign({}, p, { days: daysUntilExpiry(p.expiry) }); })
      .sort(function (a, b) { return a.days - b.days; });

    var critical = expiryItems.filter(function (p) { return p.days <= 30; });
    var soon     = expiryItems.filter(function (p) { return p.days > 30 && p.days <= 60; });
    var ok       = expiryItems.filter(function (p) { return p.days > 60; });

    function expiryRow(p) {
      var col = expiryColor(p.days);
      return [
        '<div class="zpid-expiry-item">',
          '<div class="zpid-expiry-days" style="color:' + col + '">' + (p.days < 0 ? 'EXP' : p.days) + '</div>',
          '<div class="zpid-expiry-info">',
            '<div class="zpid-expiry-name">' + esc(p.name) + '</div>',
            '<div class="zpid-expiry-meta">' + esc(p.sku) + ' · ' + esc(p.cat) + ' · ' + esc(p.warehouse) + ' · Expires: ' + esc(p.expiry) + ' · ' + p.batches + ' batch(es) · Stock: ' + p.stock + ' units</div>',
          '</div>',
          '<span class="zpid-pill ' + (p.days < 0 ? 'critical' : p.days <= 30 ? 'critical' : 'expiring') + '">' + (p.days < 0 ? 'Expired' : p.days <= 30 ? '🔴 Critical' : '🟡 Expiring Soon') + '</span>',
          '<button class="zpid-expiry-action" data-sku="' + esc(p.sku) + '" style="margin-left:8px">Quarantine</button>',
        '</div>'
      ].join('');
    }

    return [
      '<div class="zpid-kpis">',
        kpi('Expiring ≤ 30 Days', critical.length + ' batches', 'Immediate action required', critical.length > 0 ? 'down' : 'neutral', '🔴'),
        kpi('Expiring ≤ 60 Days', soon.length + ' batches', 'Schedule discounts/returns', soon.length > 0 ? 'warn' : 'neutral', '🟡'),
        kpi('Healthy (> 60 Days)', ok.length + ' SKUs', 'Normal lifecycle', 'neutral', '✅'),
        kpi('Cold-Chain Batches', '0 batches', 'Vaccine & insulin monitoring', 'neutral', '❄️'),
        kpi('FEFO Compliance', '100%', 'First-Expiry-First-Out active', 'neutral', '📋'),
        kpi('Disposal Risk Value', '₹0', 'If unsold before expiry', 'neutral', '💸'),
      '</div>',

      '<div class="zpid-card">',
        '<div class="zpid-ph">',
          '<div><h3>🔴 Critical — Expiring within 30 Days</h3><small>Immediate markdown, return-to-vendor, or quarantine action required</small></div>',
          '<span class="zpid-badge red">' + critical.length + ' Batches</span>',
        '</div>',
        critical.map(expiryRow).join(''),
        critical.length === 0 ? '<div style="padding:20px 18px;color:#94a3b8;font-size:13px">✅ No critical expiry items in current filter view</div>' : '',
      '</div>',

      '<div class="zpid-card">',
        '<div class="zpid-ph">',
          '<div><h3>🟡 Expiring in 31–60 Days</h3><small>Plan promotional discounts or vendor return for these batches</small></div>',
          '<span class="zpid-badge amber">' + soon.length + ' Batches</span>',
        '</div>',
        soon.map(expiryRow).join(''),
        soon.length === 0 ? '<div style="padding:20px 18px;color:#94a3b8;font-size:13px">✅ No upcoming expiry items</div>' : '',
      '</div>',

      '<div class="zpid-card">',
        '<div class="zpid-ph">',
          '<div><h3>✅ Healthy Stock (> 60 Days Remaining)</h3><small>Normal lifecycle — no action required</small></div>',
          '<span class="zpid-badge green">' + ok.length + ' SKUs</span>',
        '</div>',
        ok.length === 0 ? '<div style="padding:20px 18px;color:#94a3b8;font-size:13px">No active batches with &gt;60 days remaining</div>' : ok.map(expiryRow).join(''),
      '</div>'
    ].join('');
  }

  /* =====================================================================
     VIEW 8: Warehouse Management
     ===================================================================== */
  function renderWarehouseView() {
    return [
      '<div class="zpid-kpis">',
        kpi('Active Warehouses', WAREHOUSES.length + ' Hubs', 'Pan-India network', 'neutral', '🏭'),
        kpi('Total Warehouse Value', inrShort(0), 'Consolidated stock value', 'neutral', '💰'),
        kpi('Avg. Hub Capacity Used', '0.0%', 'Headroom before overflow', 'neutral', '📊'),
        kpi('Cold Chain Zones', '0', 'Vaccine-grade storage', 'neutral', '❄️'),
        kpi('Total Warehouse Staff', '0 members', 'Pickers, packers, supervisors', 'neutral', '👷'),
        kpi('Dispatch SLA', '100%', 'Outbound processing', 'neutral', '⚡'),
      '</div>',

      '<div class="zpid-card">',
        '<div class="zpid-ph">',
          '<div><h3>🏭 Warehouse Capacity Utilisation</h3><small>Fill rate comparison across all regional fulfillment hubs</small></div>',
          '<span class="zpid-badge purple">' + WAREHOUSES.length + ' Hubs Online</span>',
        '</div>',
        '<div class="zpid-chart-wrap">' + renderCapacitySvg() + '</div>',
      '</div>',

      '<div class="zpid-grid-3">',
        WAREHOUSES.length === 0 ? '<div style="grid-column:1/-1;text-align:center;padding:40px;color:#94a3b8">No warehouse facilities configured</div>' : WAREHOUSES.map(function (w) {
          var capColor = w.capacity > 85 ? '#f59e0b' : w.capacity > 70 ? '#10b981' : '#0ea5e9';
          return [
            '<div class="zpid-hub-card">',
              '<div style="display:flex;align-items:flex-start;justify-content:space-between">',
                '<div>',
                  '<div class="zpid-hub-name">🏭 ' + esc(w.name) + '</div>',
                  '<div style="font-size:11px;color:#94a3b8;margin-top:3px">' + esc(w.city) + '</div>',
                '</div>',
                '<span class="zpid-badge ' + (w.health > 92 ? 'green' : w.health > 85 ? 'amber' : 'red') + '">' + w.health + '% Health</span>',
              '</div>',
              '<div style="display:flex;flex-direction:column;gap:4px">',
                '<div style="display:flex;justify-content:space-between;font-size:11px">',
                  '<span>Capacity Used</span>',
                  '<span style="font-family:\'IBM Plex Mono\',monospace;color:' + capColor + '">' + w.capacity + '%</span>',
                '</div>',
                '<div class="zpid-progress-track">',
                  '<div class="zpid-progress-fill" style="width:' + w.capacity + '%;background:' + capColor + '"></div>',
                '</div>',
              '</div>',
              '<div class="zpid-hub-meta">',
                '<span class="zpid-hub-chip">📦 ' + w.skus + ' SKUs</span>',
                '<span class="zpid-hub-chip">💰 ' + inrShort(w.value) + '</span>',
                '<span class="zpid-hub-chip">👷 ' + w.staff + ' Staff</span>',
              '</div>',
              '<div>',
                '<div style="font-size:10px;color:#64748b;font-family:\'IBM Plex Mono\',monospace;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:6px">Storage Zones</div>',
                w.zones.map(function (z) {
                  return '<div style="font-size:11px;padding:3px 0;display:flex;align-items:center;gap:6px;border-bottom:1px solid rgba(255,255,255,0.04)">' +
                    '<span style="width:6px;height:6px;border-radius:50%;background:' + capColor + ';flex-shrink:0;display:inline-block"></span>' +
                    esc(z) + '</div>';
                }).join(''),
              '</div>',
              '<div style="font-size:11px;color:#64748b">Hub Manager: <span style="color:#94a3b8;font-weight:600">' + esc(w.manager) + '</span></div>',
            '</div>'
          ].join('');
        }).join(''),
      '</div>'
    ].join('');
  }


  /* =====================================================================
     VIEW 10: Inventory Valuation
     ===================================================================== */
  function renderValuationView() {
    var multiplier = S.valuationMethod === 'Weighted Avg' ? 1.02 : S.valuationMethod === 'LIFO' ? 0.96 : 1.0;
    var totalCost = PRODUCTS.reduce(function (a, p) { return a + p.stock * p.cost; }, 0) * multiplier;
    var totalRetail = PRODUCTS.reduce(function (a, p) { return a + p.stock * p.price; }, 0);
    var marginPct = totalRetail > 0 ? (((totalRetail - totalCost) / totalRetail) * 100).toFixed(1) : '0.0';

    return [
      '<div class="zpid-kpis">',
        kpi('Total Asset Valuation', inrShort(totalCost), S.valuationMethod + ' GAAP method', 'neutral', '💰'),
        kpi('Projected Retail Value', inrShort(totalRetail), 'Current MRP realization', 'neutral', '🏷️'),
        kpi('Unrealized Gross Margin', marginPct + '%', inrShort(totalRetail - totalCost) + ' profit', 'neutral', '📈'),
        kpi('Holding Carrying Cost', '0.0% p.a.', '₹0 monthly run-rate', 'neutral', '🛡️'),
        kpi('FIFO Verified Batches', '0 Batches', '100% audit compliant', 'neutral', '✅'),
        kpi('At-Risk Aging Value', '₹0', '0% network value', 'neutral', '⏳'),
      '</div>',

      '<div class="zpid-grid-2">',
        '<div class="zpid-card">',
          '<div class="zpid-ph">',
            '<div><h3>💎 Category Asset Breakdown</h3><small>Balance sheet cost vs retail realization by category</small></div>',
            '<div style="display:flex;gap:4px">',
              ['FIFO', 'Weighted Avg', 'LIFO'].map(function (m) {
                return '<button type="button" class="zpid-cat-chip zpid-val-method-btn' + (S.valuationMethod === m ? ' on' : '') + '" data-method="' + m + '">' + m + '</button>';
              }).join(''),
            '</div>',
          '</div>',
          '<div class="zpid-progress-row">',
            VALUATION_CATS.length === 0 ? '<div style="text-align:center;padding:24px;color:#94a3b8;width:100%">No valuation breakdown available</div>' : VALUATION_CATS.map(function (cat) {
              return [
                '<div class="zpid-progress-item">',
                  '<div class="zpid-progress-label">',
                    '<span style="font-weight:600">' + esc(cat.name) + '</span>',
                    '<span>' + inrShort(cat.costVal * multiplier) + ' <span style="color:#10b981">(' + cat.margin + ')</span></span>',
                  '</div>',
                  '<div class="zpid-progress-track"><div class="zpid-progress-fill" style="width:' + (cat.share * 2.8) + '%;background:' + cat.color + '"></div></div>',
                '</div>'
              ].join('');
            }).join(''),
          '</div>',
        '</div>',

        '<div class="zpid-card">',
          '<div class="zpid-ph">',
            '<div><h3>⏳ Aging Breakdown &amp; Reserves</h3><small>Shelf-life valuation risk &amp; write-down reserves</small></div>',
            '<span class="zpid-badge green">Reserve Adequate</span>',
          '</div>',
          '<div style="padding:16px 18px;display:grid;grid-template-columns:1fr 1fr;gap:10px">',
            '<div style="padding:12px;border-radius:8px;background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.2)">',
              '<div style="font-size:11px;color:#10b981;font-weight:600">Fresh (0–30 Days)</div>',
              '<div style="font-size:16px;font-weight:700;color:#f8fafc;margin-top:2px">₹0 (0%)</div>',
              '<div style="font-size:10px;color:#94a3b8;margin-top:2px">Peak turnover velocity</div>',
            '</div>',
            '<div style="padding:12px;border-radius:8px;background:rgba(14,165,233,0.08);border:1px solid rgba(14,165,233,0.2)">',
              '<div style="font-size:11px;color:#0ea5e9;font-weight:600">Active (31–60 Days)</div>',
              '<div style="font-size:16px;font-weight:700;color:#f8fafc;margin-top:2px">₹0 (0%)</div>',
              '<div style="font-size:10px;color:#94a3b8;margin-top:2px">Normal consumption</div>',
            '</div>',
            '<div style="padding:12px;border-radius:8px;background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.2)">',
              '<div style="font-size:11px;color:#f59e0b;font-weight:600">Slow Moving (61–90d)</div>',
              '<div style="font-size:16px;font-weight:700;color:#f8fafc;margin-top:2px">₹0 (0%)</div>',
              '<div style="font-size:10px;color:#94a3b8;margin-top:2px">Review markdown plan</div>',
            '</div>',
            '<div style="padding:12px;border-radius:8px;background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.2)">',
              '<div style="font-size:11px;color:#ef4444;font-weight:600">At Risk (&gt;90 Days)</div>',
              '<div style="font-size:16px;font-weight:700;color:#f8fafc;margin-top:2px">₹0 (0%)</div>',
              '<div style="font-size:10px;color:#94a3b8;margin-top:2px">Full reserve: ₹0</div>',
            '</div>',
          '</div>',
        '</div>',
      '</div>',

      '<div class="zpid-card">',
        '<div class="zpid-ph">',
          '<div><h3>🏭 Warehouse Holding Asset Valuation</h3><small>Facility-level stock valuation and inventory accuracy audit status</small></div>',
          '<span class="zpid-badge purple">' + WAREHOUSES.length + ' Facilities Reconciled</span>',
        '</div>',
        '<div class="zpid-table-wrap">',
          '<table class="zpid-table">',
            '<thead><tr>',
              '<th>Warehouse Facility</th><th style="text-align:right">Stock Units</th>',
              '<th style="text-align:right">Asset Valuation (' + S.valuationMethod + ')</th>',
              '<th style="text-align:right">Network Share</th><th>Hub Manager</th>',
              '<th style="text-align:right">Audit Reconciliation</th>',
            '</tr></thead>',
            '<tbody>',
              WAREHOUSES.length === 0 ? '<tr><td colspan="6" style="text-align:center;padding:32px;color:#94a3b8">No warehouse facilities found</td></tr>' : WAREHOUSES.map(function (w) {
                var val = inrShort(w.value * multiplier);
                var share = ((w.value / 18650000) * 100).toFixed(1);
                return [
                  '<tr>',
                    '<td><strong>🏭 ' + esc(w.name) + '</strong></td>',
                    '<td style="text-align:right;font-family:\'IBM Plex Mono\',monospace">' + (w.skus * 12).toLocaleString() + '</td>',
                    '<td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;font-weight:700;color:#10b981">' + val + '</td>',
                    '<td style="text-align:right;font-family:\'IBM Plex Mono\',monospace">' + share + '%</td>',
                    '<td style="color:#94a3b8">' + esc(w.manager) + '</td>',
                    '<td style="text-align:right"><span class="zpid-badge green">✓ Audit Reconciled</span></td>',
                  '</tr>'
                ].join('');
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* =====================================================================
     VIEW 11: Stock Transfers
     ===================================================================== */
  function renderTransfersView() {
    var filtered = S.transferStatusFilter === 'ALL' ? TRANSFERS : TRANSFERS.filter(function (t) { return t.status === S.transferStatusFilter; });

    return [
      '<div class="zpid-kpis">',
        kpi('Active In-Transit', '0 Transfers', '₹0 in transit', 'neutral', '🚚'),
        kpi('Completed (MTD)', '0 Shipments', '100% on-time SLA', 'neutral', '✅'),
        kpi('Avg Transit Lead Time', '0 Hours', 'Linehaul speed', 'neutral', '⚡'),
        kpi('Cold Chain Integrity', '100.0%', 'Monitored continuously', 'neutral', '❄️'),
        kpi('Network Hubs', WAREHOUSES.length + ' Facilities', 'Connected daily', 'neutral', '🏭'),
        kpi('Transfer Accuracy', '100.0%', 'Zero reported discrepancy', 'neutral', '🎯'),
      '</div>',

      '<div class="zpid-card">',
        '<div class="zpid-ph">',
          '<div><h3>🔁 Inter-Warehouse Stock Transfer Manifests</h3><small>Multi-hub replenishment shipments, live route status &amp; cold-chain custody</small></div>',
          '<div style="display:flex;align-items:center;gap:8px">',
            '<div style="display:flex;gap:4px">',
              ['ALL', 'In Transit', 'Pending Dispatch', 'Received'].map(function (st) {
                return '<button type="button" class="zpid-cat-chip zpid-trf-status-btn' + (S.transferStatusFilter === st ? ' on' : '') + '" data-status="' + st + '">' + (st === 'ALL' ? 'All Status' : st) + '</button>';
              }).join(''),
            '</div>',
            '<button type="button" id="zpid-new-transfer-btn" class="zpid-btn primary" style="font-size:11px;padding:6px 12px">+ Initiate Transfer</button>',
          '</div>',
        '</div>',
        '<div class="zpid-table-wrap">',
          '<table class="zpid-table">',
            '<thead><tr>',
              '<th>Manifest ID</th><th>Route (Origin ➔ Destination)</th><th>Contents / SKUs</th>',
              '<th style="text-align:right">Transfer Value</th><th>Carrier / Fleet</th>',
              '<th>Telemetry / Temp</th><th>Status &amp; ETA</th><th style="text-align:right">Actions</th>',
            '</tr></thead>',
            '<tbody>',
              filtered.length === 0 ? '<tr><td colspan="8" style="text-align:center;padding:32px;color:#94a3b8">No inter-warehouse stock transfers found</td></tr>' : filtered.map(function (t) {
                var statusCls = t.status === 'In Transit' ? 'purple' : t.status === 'Received' ? 'green' : 'amber';
                return [
                  '<tr>',
                    '<td style="font-family:\'IBM Plex Mono\',monospace;color:#38bdf8;font-size:11px">' + esc(t.id) + '</td>',
                    '<td><span class="zpid-route-tag">' + esc(t.origin) + ' <span style="color:#3b82f6">➔</span> ' + esc(t.dest) + '</span></td>',
                    '<td style="color:#94a3b8;font-size:11px;max-width:260px">' + esc(t.skus) + '</td>',
                    '<td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;font-weight:700">' + inrShort(t.value) + '</td>',
                    '<td style="font-size:11px">' + esc(t.carrier) + '</td>',
                    '<td>',
                      t.cold ? '<span class="zpid-telemetry-pill cold">❄️ ' + esc(t.temp) + '</span>' : '<span class="zpid-telemetry-pill ambient">Ambient</span>',
                    '</td>',
                    '<td>',
                      '<span class="zpid-badge ' + statusCls + '">' + esc(t.status) + '</span>',
                      '<div style="font-size:10px;color:#94a3b8;margin-top:2px">' + esc(t.eta) + '</div>',
                    '</td>',
                    '<td style="text-align:right">',
                      '<button type="button" class="zpid-btn" style="font-size:10px;padding:3px 8px" onclick="window.ZenveProductsInventory.showManifest(\'' + esc(t.id) + '\')">Manifest</button>',
                    '</td>',
                  '</tr>'
                ].join('');
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Modal: New Stock Transfer ────────────────────────────────── */
  function showNewTransferModal() {
    var existing = document.getElementById('zpid-modal-root');
    if (existing) existing.remove();

    var div = document.createElement('div');
    div.id = 'zpid-modal-root';
    div.className = 'zpid-modal-overlay';
    div.innerHTML = [
      '<div class="zpid-modal-card">',
        '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">',
          '<h3 style="margin:0;font-size:16px;font-weight:700">🔁 Initiate Stock Transfer</h3>',
          '<button type="button" id="zpid-close-modal-btn" style="background:transparent;border:none;color:#94a3b8;font-size:18px;cursor:pointer">✕</button>',
        '</div>',
        '<p style="font-size:12px;color:#94a3b8;margin:0 0 16px">Create inter-warehouse dispatch manifest with tracking telemetry.</p>',
        '<form id="zpid-new-transfer-form" style="display:flex;flex-direction:column;gap:12px">',
          '<div>',
            '<label style="display:block;font-size:11px;color:#94a3b8;margin-bottom:4px">Origin Warehouse</label>',
            '<select id="zpid-trf-origin" class="zpid-filter-select" style="width:100%">' + WAREHOUSES.map(function(w){return '<option value="' + esc(w.name) + '">' + esc(w.name) + '</option>';}).join('') + '</select>',
          '</div>',
          '<div>',
            '<label style="display:block;font-size:11px;color:#94a3b8;margin-bottom:4px">Destination Warehouse</label>',
            '<select id="zpid-trf-dest" class="zpid-filter-select" style="width:100%">' + WAREHOUSES.slice(1).map(function(w){return '<option value="' + esc(w.name) + '">' + esc(w.name) + '</option>';}).join('') + '</select>',
          '</div>',
          '<div>',
            '<label style="display:block;font-size:11px;color:#94a3b8;margin-bottom:4px">Select SKU to Transfer</label>',
            '<select id="zpid-trf-sku" class="zpid-filter-select" style="width:100%">' + PRODUCTS.slice(0, 8).map(function(p){return '<option value="' + esc(p.sku) + '">' + esc(p.sku) + ' — ' + esc(p.name) + ' (' + p.stock + ' in stock)</option>';}).join('') + '</select>',
          '</div>',
          '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">',
            '<div>',
              '<label style="display:block;font-size:11px;color:#94a3b8;margin-bottom:4px">Transfer Quantity</label>',
              '<input type="number" id="zpid-trf-qty" min="1" value="20" class="zpid-search" style="width:100%" required/>',
            '</div>',
            '<div>',
              '<label style="display:block;font-size:11px;color:#94a3b8;margin-bottom:4px">Transport Fleet</label>',
              '<select id="zpid-trf-carrier" class="zpid-filter-select" style="width:100%"><option>Zenve Express Fleet (EV-04)</option><option>BlueDart Cold Chain</option><option>Delhivery Surface Express</option></select>',
            '</div>',
          '</div>',
          '<div style="display:flex;justify-content:flex-end;gap:10px;margin-top:10px">',
            '<button type="button" id="zpid-cancel-modal-btn" class="zpid-btn">Cancel</button>',
            '<button type="submit" class="zpid-btn primary">Dispatch Transfer</button>',
          '</div>',
        '</form>',
      '</div>'
    ].join('');
    document.body.appendChild(div);

    div.querySelector('#zpid-close-modal-btn').onclick = function () { div.remove(); };
    div.querySelector('#zpid-cancel-modal-btn').onclick = function () { div.remove(); };
    div.querySelector('#zpid-new-transfer-form').onsubmit = function (e) {
      e.preventDefault();
      var origin = div.querySelector('#zpid-trf-origin').value;
      var dest = div.querySelector('#zpid-trf-dest').value;
      var sku = div.querySelector('#zpid-trf-sku').value;
      var qty = div.querySelector('#zpid-trf-qty').value;
      var carrier = div.querySelector('#zpid-trf-carrier').value;
      var newId = 'TRF-2026-0' + (895 + TRANSFERS.length);
      TRANSFERS.unshift({
        id: newId,
        origin: origin,
        dest: dest,
        skus: sku + ' (' + qty + ' units)',
        value: 0,
        carrier: carrier,
        status: 'In Transit',
        temp: carrier.indexOf('Cold') >= 0 ? '4.0°C (Optimal)' : 'Ambient',
        eta: 'Today, 8:00 PM',
        cold: carrier.indexOf('Cold') >= 0
      });
      div.remove();
      showToast('Transfer manifest ' + newId + ' generated successfully!');
      renderAll();
    };
  }

  /* =====================================================================
     VIEW 11: Inventory Movement
     ===================================================================== */
  function renderMovementView() {
    var filtered = S.movementFilter === 'ALL'
      ? MOVEMENTS
      : MOVEMENTS.filter(function (m) {
          if (S.movementFilter === 'Inbound') return m.badge === 'inbound';
          if (S.movementFilter === 'Outbound') return m.badge === 'outbound';
          if (S.movementFilter === 'Transfer') return m.badge === 'transfer';
          if (S.movementFilter === 'Adjustment') return m.badge === 'adjustment' || m.badge === 'return';
          return true;
        });

    return [
      '<div class="zpid-kpis">',
        kpi('Inbound Stock Today', '+0 units', '0 GRNs received', 'neutral', '📥'),
        kpi('Outbound Dispatched', '-0 units', 'B2C & Clinic orders', 'neutral', '📤'),
        kpi('Net Stock Delta', '+0 units', 'Net velocity', 'neutral', '📈'),
        kpi('Adjustment Variance', '0 units', '₹0 spillage', 'neutral', '⚖️'),
        kpi('Today Transactions', '0 Events', '100% ERP synced', 'neutral', '⚡'),
        kpi('Transit Inflow SLA', '100.0%', 'On-schedule arrivals', 'neutral', '⏱️'),
      '</div>',

      '<div class="zpid-grid-2">',
        '<div class="zpid-card">',
          '<div class="zpid-ph">',
            '<div><h3>📈 24-Hour Stock Movement Velocity</h3><small>Breakdown of live inventory flows across all operational channels</small></div>',
            '<span class="zpid-badge green">Live Sync</span>',
          '</div>',
          '<div class="zpid-progress-row">',
            '<div style="text-align:center;padding:24px;color:#94a3b8;width:100%">No 24-hour stock movement recorded</div>',
          '</div>',
        '</div>',

        '<div class="zpid-card">',
          '<div class="zpid-ph">',
            '<div><h3>⚖️ Warehouse Flow Balancing</h3><small>Net stock accumulation and drain across regional distribution nodes</small></div>',
            '<span class="zpid-badge purple">Balanced Flow</span>',
          '</div>',
          '<div style="padding:16px 18px;text-align:center;color:#94a3b8">',
            'No warehouse flow activity recorded',
          '</div>',
        '</div>',
      '</div>',

      '<div class="zpid-card">',
        '<div class="zpid-ph">',
          '<div><h3>📋 Real-Time Movement Ledger</h3><small>Live audit trail of every stock increase, decrease, transfer, and adjustment</small></div>',
          '<div style="display:flex;gap:6px">',
            ['ALL', 'Inbound', 'Outbound', 'Transfer', 'Adjustment'].map(function (typ) {
              return '<button type="button" class="zpid-cat-chip zpid-mov-chip' + (S.movementFilter === typ ? ' on' : '') + '" data-mov="' + typ + '">' + typ + '</button>';
            }).join(''),
          '</div>',
        '</div>',
        '<div class="zpid-table-wrap">',
          '<table class="zpid-table">',
            '<thead><tr>',
              '<th>Movement ID</th><th>Timestamp</th><th>Type</th><th>SKU &amp; Product</th>',
              '<th style="text-align:right">Quantity</th><th>Source ➔ Destination</th>',
              '<th>Ref Doc #</th><th style="text-align:right">Transaction Value</th>',
            '</tr></thead>',
            '<tbody>',
              filtered.length === 0 ? '<tr><td colspan="8" style="text-align:center;padding:32px;color:#94a3b8">No movement ledger entries found</td></tr>' : filtered.map(function (item) {
                var isPos = item.qty > 0;
                var qtyColor = isPos ? '#10b981' : '#ef4444';
                var qtySign = isPos ? '+' : '';
                var bgBadge = item.badge === 'inbound' ? 'rgba(16,185,129,0.15)' :
                              item.badge === 'outbound' ? 'rgba(239,68,68,0.15)' :
                              item.badge === 'transfer' ? 'rgba(56,189,248,0.15)' :
                              item.badge === 'return' ? 'rgba(168,85,247,0.15)' : 'rgba(245,158,11,0.15)';
                var txtBadge = item.badge === 'inbound' ? '#10b981' :
                               item.badge === 'outbound' ? '#f87171' :
                               item.badge === 'transfer' ? '#38bdf8' :
                               item.badge === 'return' ? '#c084fc' : '#fbbf24';

                return [
                  '<tr>',
                    '<td style="font-family:\'IBM Plex Mono\',monospace;color:#38bdf8;font-size:11px;font-weight:600">' + esc(item.id) + '</td>',
                    '<td style="color:#94a3b8;font-size:12px">' + esc(item.time) + '</td>',
                    '<td><span style="padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700;background:' + bgBadge + ';color:' + txtBadge + '">' + esc(item.type) + '</span></td>',
                    '<td><div style="font-weight:600;color:#f8fafc">' + esc(item.name) + '</div><div style="font-family:\'IBM Plex Mono\',monospace;font-size:10px;color:#64748b">' + esc(item.sku) + '</div></td>',
                    '<td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;font-size:13px;font-weight:700;color:' + qtyColor + '">' + qtySign + item.qty + '</td>',
                    '<td style="font-size:12px"><span style="color:#cbd5e1">' + esc(item.source) + '</span> <span style="color:#64748b">➔</span> <span style="color:#38bdf8">' + esc(item.dest) + '</span></td>',
                    '<td style="font-family:\'IBM Plex Mono\',monospace;font-size:11px;color:#a855f7">' + esc(item.ref) + '</td>',
                    '<td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;font-weight:600;color:#f8fafc">' + inrShort(item.value) + '</td>',
                  '</tr>'
                ].join('');
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function showManifest(id) {
    var t = TRANSFERS.find(function (it) { return it.id === id; });
    if (!t) return;
    alert('Manifest ' + t.id + '\nRoute: ' + t.origin + ' ➔ ' + t.dest + '\nCarrier: ' + t.carrier + '\nTelemetry: ' + t.temp + '\nValue: ' + inrShort(t.value) + '\nStatus: ' + t.status);
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

  /* ── Check initial hash ───────────────────────────────────────── */
  var initialTab = tabFromHash(location.hash);
  if (initialTab) {
    var go = function () { setTimeout(function () { open(initialTab); }, 400); };
    if (document.readyState === 'complete') go();
    else window.addEventListener('load', go);
  }

  /* ── Wire sidebar click-through and global interception ───────── */
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;

    var item = t.closest('button, [data-go], a, [role="button"], li');
    if (item && item.textContent) {
      var tab = tabFromText(item.textContent.trim());
      if (tab) {
        if (!t.closest('#zpid-root')) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          open(tab);
          return;
        }
      }
    }

    if (S.open) {
      if (t.closest('#zpid-root')) return;
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
      if (btn._zpidWired) return;
      btn._zpidWired = true;
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
  window.ZenveProductsInventory = {
    open: open,
    close: close,
    switchTab: switchTab,
    showManifest: showManifest,
    showNewTransferModal: showNewTransferModal
  };

  /* ── Boot ─────────────────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { build(); wireSidebar(); });
  } else {
    build();
    wireSidebar();
  }

})();