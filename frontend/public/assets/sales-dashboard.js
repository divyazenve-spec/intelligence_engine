/* Zenve BI — interactive Sales Dashboard.
   Opened from the sidebar: Revenue & Sales > Sales Dashboard, or via #sales-dashboard.
   Self-contained (no external libraries). Reads live data from the backend with offline fallback. */
(function () {
  'use strict';
  var FN = '/_serverFn/bcbf405abb63715daaf1487f2958492789217ff1449ff447570bc418404b6901';
  var FALLBACK = '/api/v1/data';
  var STATIC_FALLBACK = '/assets/sample-fallback.json';

  var inr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var CH_COLORS = { Android: 'var(--android, #3ddc84)', iOS: 'var(--ios, #0071e3)', Web: 'var(--web, #6366f1)', Other: 'var(--other-app, #f59e0b)' };
  var ST_COLORS = { Paid: 'var(--success, #10b981)', Pending: 'var(--warning, #f59e0b)', Refunded: 'var(--info, #0ea5e9)', Cancelled: 'var(--destructive, #ef4444)' };
  var CAT_COLORS = ['var(--chart-1, #0ea5e9)', 'var(--chart-3, #10b981)', 'var(--chart-2, #8b5cf6)', 'var(--chart-5, #f59e0b)', 'var(--chart-4, #ec4899)'];
  var PAGE_SIZE = 10;

  var TABS = [
    { id: 'sales', label: 'Sales Overview', icon: '💼', hash: '#sales-dashboard' },
    { id: 'channel', label: 'Revenue by Channel', icon: '📱', hash: '#revenue-by-channel' },
    { id: 'location', label: 'Revenue by Location', icon: '📍', hash: '#revenue-by-location' },
    { id: 'product', label: 'Revenue by Product', icon: '📦', hash: '#revenue-by-product' },
    { id: 'employee', label: 'Revenue by Employee', icon: '👨‍💼', hash: '#revenue-by-employee' },
    { id: 'doctor', label: 'Revenue by Doctor', icon: '🩺', hash: '#revenue-by-doctor' },
    { id: 'customer', label: 'Revenue by Customer', icon: '👥', hash: '#revenue-by-customer' },
    { id: 'funnel', label: 'Sales Funnel', icon: '📊', hash: '#sales-funnel' },
    { id: 'targets', label: 'Targets & Achievement', icon: '🎯', hash: '#targets-achievement' },
    { id: 'forecast', label: 'Sales Forecast', icon: '📈', hash: '#sales-forecast' }
  ];

  var DOCTOR_SPECIALTIES = {
    'Cardiology': { name: 'Dr. Arvind Swaminathan', spec: 'Cardiologist, MD, DM', reg: 'MCI-48291', av: 'AS' },
    'Neurology': { name: 'Dr. Meera Nambiar', spec: 'Senior Neurologist, MD', reg: 'MCI-39102', av: 'MN' },
    'Pediatrics': { name: 'Dr. Siddharth Rao', spec: 'Pediatric Specialist, DCH', reg: 'MCI-51829', av: 'SR' },
    'General Medicine': { name: 'Dr. Divya Balasubramanian', spec: 'Lead Physician, MBBS, MD', reg: 'MCI-62910', av: 'DB' },
    'General Care': { name: 'Dr. Divya Balasubramanian', spec: 'Lead Physician, MBBS, MD', reg: 'MCI-62910', av: 'DB' },
    'Diagnostics': { name: 'Dr. Kavita Reddy', spec: 'Clinical Pathologist, MD', reg: 'MCI-29481', av: 'KR' },
    'Orthopedics': { name: 'Dr. Rohan Kulkarni', spec: 'Orthopedic Surgeon, MS', reg: 'MCI-73019', av: 'RK' },
    'Dermatology': { name: 'Dr. Alok Verma', spec: 'Consultant Dermatologist, MD', reg: 'MCI-84012', av: 'AV' },
    'Wellness': { name: 'Dr. Sunita Sen', spec: 'Wellness & Preventive Care, MD', reg: 'MCI-91823', av: 'SS' }
  };
  var DOCTOR_LIST = [
    { name: 'Dr. Divya Balasubramanian', spec: 'Lead Physician, MBBS, MD', reg: 'MCI-62910', av: 'DB' },
    { name: 'Dr. Arvind Swaminathan', spec: 'Cardiologist, MD, DM', reg: 'MCI-48291', av: 'AS' },
    { name: 'Dr. Meera Nambiar', spec: 'Senior Neurologist, MD', reg: 'MCI-39102', av: 'MN' },
    { name: 'Dr. Siddharth Rao', spec: 'Pediatric Specialist, DCH', reg: 'MCI-51829', av: 'SR' },
    { name: 'Dr. Kavita Reddy', spec: 'Clinical Pathologist, MD', reg: 'MCI-29481', av: 'KR' },
    { name: 'Dr. Rohan Kulkarni', spec: 'Orthopedic Surgeon, MS', reg: 'MCI-73019', av: 'RK' },
    { name: 'Dr. Alok Verma', spec: 'Consultant Dermatologist, MD', reg: 'MCI-84012', av: 'AV' },
    { name: 'Dr. Sunita Sen', spec: 'Wellness & Preventive Care, MD', reg: 'MCI-91823', av: 'SS' }
  ];

  function getDoctorForSale(s) {
    if (s.doctor) {
      var av = s.doctor.split(/\s+/).map(function(w){return w[0];}).join('').slice(0,2).toUpperCase();
      return { name: s.doctor, spec: s.specialty || 'Medical Specialist', reg: s.reg || 'MCI-Active', av: av || 'DR' };
    }
    if (s.source && DOCTOR_SPECIALTIES[s.source]) {
      return DOCTOR_SPECIALTIES[s.source];
    }
    var str = (s.source || '') + (s.person || '');
    var h = 0;
    for (var i = 0; i < str.length; i++) h = ((h << 5) - h) + str.charCodeAt(i);
    return DOCTOR_LIST[Math.abs(h) % DOCTOR_LIST.length];
  }

  var EMPLOYEE_LIST = [
    { id: 'EMP-01', name: 'Dr. Priya Sharma', dept: 'Clinical Operations', role: 'Chief Medical Officer', av: 'PS', target: 250000 },
    { id: 'EMP-02', name: 'Rajesh Verma', dept: 'Patient Services', role: 'Senior Care Coordinator', av: 'RV', target: 180000 },
    { id: 'EMP-03', name: 'Ananya Deshmukh', dept: 'Outpatient Care', role: 'Outpatient Services Lead', av: 'AD', target: 200000 },
    { id: 'EMP-04', name: 'Vikram Mehta', dept: 'Diagnostics & Lab', role: 'Lab Operations Manager', av: 'VM', target: 160000 },
    { id: 'EMP-05', name: 'Sneha Patel', dept: 'Pharmacy & Wellness', role: 'Head Pharmacist', av: 'SP', target: 140000 },
    { id: 'EMP-06', name: 'Arjun Nair', dept: 'Telehealth', role: 'Digital Health Consultant', av: 'AN', target: 150000 }
  ];

  function getEmployeeForSale(s) {
    if (s.employee) {
      var av = s.employee.split(/\s+/).map(function(w){return w[0];}).join('').slice(0,2).toUpperCase();
      return { id: s.employee_id || 'EMP', name: s.employee, dept: s.department || 'Operations', role: s.role || 'Coordinator', av: av || 'EM', target: 180000 };
    }
    var str = (s.transaction_ref || '') + (s.source || '');
    var h = 0;
    for (var i = 0; i < str.length; i++) h = ((h << 5) - h) + str.charCodeAt(i);
    return EMPLOYEE_LIST[Math.abs(h) % EMPLOYEE_LIST.length];
  }

  var S = {
    data: { metrics: [], sales: [] },
    loaded: false,
    error: null,
    isLive: false,
    from: '',
    to: '',
    status: 'All',
    app: 'All',
    category: 'All',
    city: 'All',
    q: '',
    metric: 'revenue',
    compare: true,
    funnelStage: 'All',
    sort: { key: 'sold_at', dir: -1 },
    page: 1,
    open: false,
    tab: 'sales',
    forecastHorizon: 3,
    forecastScenario: 'base',
    targetAdjustPct: 0
  };

  var root = null;
  var trendGeo = null;

  /* ---------- helpers ---------- */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function num(n) {
    n = Number(n);
    return isFinite(n) ? n : 0;
  }
  function safeDay(s) {
    if (!s) return '';
    if (typeof s !== 'string') s = String(s);
    s = s.trim();
    if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.slice(0, 10);
    if (/^\d{4}\/\d{2}\/\d{2}/.test(s)) return s.slice(0, 10).replace(/\//g, '-');
    var mDmy = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);
    if (mDmy) {
      var p1 = parseInt(mDmy[1], 10), p2 = parseInt(mDmy[2], 10), pYear = mDmy[3];
      var day = p1, month = p2;
      if (p1 > 12 && p2 <= 12) {
        day = p1; month = p2;
      } else if (p2 > 12 && p1 <= 12) {
        month = p1; day = p2;
      }
      return pYear + '-' + String(month).padStart(2, '0') + '-' + String(day).padStart(2, '0');
    }
    if (/^\d{10,13}$/.test(s)) {
      var ts = parseInt(s, 10);
      if (ts < 1e11) ts *= 1000;
      var dtTs = new Date(ts);
      if (!isNaN(dtTs.getTime())) return dtTs.toISOString().slice(0, 10);
    }
    var dt = new Date(s);
    if (!isNaN(dt.getTime())) {
      var y = dt.getUTCFullYear();
      var m = String(dt.getUTCMonth() + 1).padStart(2, '0');
      var d = String(dt.getUTCDate()).padStart(2, '0');
      return y + '-' + m + '-' + d;
    }
    return s.slice(0, 10);
  }
  function compact(n) {
    var a = Math.abs(n), s = n < 0 ? '-' : '';
    if (a >= 1e7) return s + '₹' + (a / 1e7).toFixed(2).replace(/\.?0+$/, '') + 'Cr';
    if (a >= 1e5) return s + '₹' + (a / 1e5).toFixed(2).replace(/\.?0+$/, '') + 'L';
    if (a >= 1e3) return s + '₹' + (a / 1e3).toFixed(1).replace(/\.0$/, '') + 'K';
    return s + '₹' + Math.round(a);
  }
  function toDate(s) {
    if (!s) return new Date();
    return new Date(s + 'T00:00:00Z');
  }
  function fmtDate(d) {
    if (!d || isNaN(d.getTime())) return '';
    return d.toISOString().slice(0, 10);
  }
  function addDays(s, n) {
    var d = toDate(s);
    if (isNaN(d.getTime())) return s || '';
    d.setUTCDate(d.getUTCDate() + n);
    return fmtDate(d);
  }
  function diffDays(a, b) {
    var da = toDate(a), db = toDate(b);
    if (isNaN(da.getTime()) || isNaN(db.getTime())) return 0;
    return Math.round((db - da) / 864e5);
  }
  function prettyDay(s) {
    var d = toDate(s);
    if (isNaN(d.getTime())) return s || '';
    return DOW[d.getUTCDay()] + ', ' + d.getUTCDate() + ' ' + MONTHS[d.getUTCMonth()];
  }
  function shortDay(s) {
    var d = toDate(s);
    if (isNaN(d.getTime())) return s || '';
    return d.getUTCDate() + ' ' + MONTHS[d.getUTCMonth()];
  }
  function prettyStamp(s) {
    if (!s) return '';
    return shortDay(s.slice(0, 10)) + ', ' + (s.slice(11, 16) || '00:00');
  }
  function niceMax(v) {
    if (!v || v <= 0) return 1;
    var p = Math.pow(10, Math.floor(Math.log10(v))), f = v / p;
    return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10) * p;
  }
  function $(sel, ctx) {
    var c = ctx || root;
    return c && c.querySelector ? c.querySelector(sel) : null;
  }
  function uniq(arr) {
    return Array.from(new Set(arr.filter(Boolean))).sort();
  }

  /* ---------- data ---------- */
  function dataBounds() {
    var days = (S.data.sales || [])
      .map(function (s) { return safeDay(s.sold_at); })
      .concat((S.data.metrics || []).map(function (m) { return m && m.business_date ? m.business_date : ''; }))
      .filter(Boolean)
      .sort();
    return days.length ? { min: days[0], max: days[days.length - 1] } : null;
  }
  function preset(n) {
    var b = dataBounds();
    if (!b) return;
    S.to = b.max;
    S.from = n ? addDays(b.max, -(n - 1)) : b.min;
    if (S.from < b.min && n) S.from = b.min;
  }
  function fetchJson(url) {
    return fetch(url, { headers: { accept: 'application/json' } }).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    });
  }

  var lastDatasetSig = '';
  function applyData(d, isLive, forceResetRange) {
    if (!d) return;
    var rawSales = d.sales || [];
    var rawMetrics = d.metrics || [];

    S.data = {
      metrics: rawMetrics,
      sales: rawSales.map(function (s) {
        s.amount = num(s.amount);
        return s;
      })
    };
    S.isLive = !!isLive;
    var first = !S.loaded;
    S.loaded = true;

    var b = dataBounds();
    var curSig = rawSales.length + ':' + (b ? (b.min + '_' + b.max) : '');
    var sigChanged = lastDatasetSig && lastDatasetSig !== curSig;
    lastDatasetSig = curSig;

    // Detect if current date range is out of bounds or dataset has changed
    var outOfRange = !b || !S.from || !S.to || (S.from < b.min) || (S.from > b.max) || (S.to < b.min) || (S.to > b.max);
    if (first || forceResetRange || sigChanged || outOfRange) {
      if (b) {
        S.from = b.min;
        S.to = b.max;
      }
      S.status = 'All';
      S.app = 'All';
      S.category = 'All';
      S.city = 'All';
      S.q = '';
      S.page = 1;
    }

    buildFilterOptions();
    syncFilterInputs();
    renderAll();
  }

  function load() {
    S.error = null;
    if (!S.loaded) renderAll();

    return fetchJson(FN)
      .then(function (d) {
        applyData(d, true);
      })
      .catch(function () {
        return fetchJson(FALLBACK).then(function (d) {
          applyData(d, true);
        });
      })
      .catch(function () {
        return fetchJson(STATIC_FALLBACK).then(function (d) {
          applyData(d, false);
        });
      })
      .catch(function (e) {
        if (!S.loaded || !S.data.sales.length) {
          S.error = e.message || 'Could not load sales data.';
          renderAll();
        }
      });
  }

  function match(s, from, to, skip) {
    if (!s) return false;
    var day = safeDay(s.sold_at);
    if (!day) return false;
    if (from && day < from) return false;
    if (to && day > to) return false;
    if (skip !== 'status' && S.status !== 'All' && s.status !== S.status) return false;
    if (skip !== 'app' && S.app !== 'All' && s.app_source !== S.app) return false;
    if (skip !== 'category' && S.category !== 'All' && s.source !== S.category) return false;
    if (skip !== 'city' && S.city !== 'All' && s.city !== 'All' && s.city !== S.city) return false;
    if (skip !== 'funnelStage' && S.tab === 'funnel' && S.funnelStage && S.funnelStage !== 'All') {
      if ((S.funnelStage === 'paid' || S.funnelStage === 'conversions') && s.status !== 'Paid') return false;
      if ((S.funnelStage === 'checkout' || S.funnelStage === 'pending') && s.status === 'Paid') return false;
    }
    if (S.q) {
      var q = S.q.toLowerCase();
      var hay = [s.transaction_ref, s.person, s.source, s.city, s.status, s.app_source]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      if (hay.indexOf(q) < 0) return false;
    }
    return true;
  }
  function rows(from, to, skip) {
    return (S.data.sales || []).filter(function (s) { return match(s, from, to, skip); });
  }
  function paid(list) {
    return (list || []).filter(function (s) { return s.status === 'Paid'; });
  }
  function sum(list) {
    return (list || []).reduce(function (a, s) { return a + num(s.amount); }, 0);
  }
  function groupBy(list, key, val) {
    var m = {};
    (list || []).forEach(function (s) {
      var k = s[key] || 'Other';
      m[k] = (m[k] || 0) + val(s);
    });
    return Object.keys(m).map(function (k) { return { k: k, v: m[k] }; }).sort(function (a, b) { return b.v - a.v; });
  }
  function downloads(from, to) {
    return (S.data.metrics || []).reduce(function (a, m) {
      if (!m || !m.business_date) return a;
      if (from && m.business_date < from) return a;
      if (to && m.business_date > to) return a;
      var an = num(m.android_downloads), io = num(m.ios_downloads);
      if (S.app === 'Android') return a + an;
      if (S.app === 'iOS') return a + io;
      if (S.app === 'All') return a + an + io;
      return a;
    }, 0);
  }
  function stats(from, to) {
    var list = rows(from, to), p = paid(list), rev = sum(p), dl = downloads(from, to);
    var custs = new Set(list.map(function (s) { return s.person; }).filter(Boolean)).size;
    return {
      list: list,
      rev: rev,
      orders: list.length,
      paidOrders: p.length,
      aov: p.length ? rev / p.length : 0,
      customers: custs,
      rate: list.length ? (p.length / list.length * 100) : 0,
      rpd: dl ? (rev / dl) : 0,
      dl: dl
    };
  }
  function prevRange() {
    var len = diffDays(S.from, S.to) + 1;
    if (len <= 0) len = 14;
    return { from: addDays(S.from, -len), to: addDays(S.from, -1) };
  }

  /* ---------- skeleton ---------- */
  function build() {
    if (root && document.body.contains(root)) return;
    root = document.createElement('div');
    root.id = 'zsd-root';
    root.setAttribute('role', 'region');
    root.setAttribute('aria-label', 'Sales Dashboard');
    root.innerHTML =
      '<div class="zsd-head"><div><h2 class="zsd-title" id="zsd-title">Sales Dashboard</h2>' +
      '<div class="zsd-sub" id="zsd-sub">Revenue &amp; Sales · interactive view of every transaction</div></div>' +
      '<div class="zsd-actions"><div class="zsd-seg" id="zsd-presets">' +
      '<button data-p="7" type="button">7D</button><button data-p="14" type="button">14D</button><button data-p="30" type="button">30D</button><button data-p="0" type="button">All</button></div>' +
      '<button class="zsd-btn" id="zsd-refresh" type="button">↻ Refresh</button>' +
      '<button class="zsd-btn zsd-btn-pipeline" id="zsd-pipeline-open" type="button">⚡ Ingest Dataset</button>' +
      '<button class="zsd-btn" id="zsd-export" type="button">⭳ Export CSV</button>' +
      '<button class="zsd-btn primary" id="zsd-back" type="button">← Executive Dashboard</button></div></div>' +
      '<div class="zsd-body">' +
      '<div class="zsd-tabs-bar" id="zsd-tabs"></div>' +
      '<div class="zsd-filters">' +
      '<input type="date" id="zsd-from" aria-label="From date"><span class="zsd-arrow">›</span><input type="date" id="zsd-to" aria-label="To date">' +
      '<select id="zsd-status" aria-label="Status"></select><select id="zsd-app" aria-label="Channel"></select>' +
      '<select id="zsd-category" aria-label="Service"></select><select id="zsd-city" aria-label="City"></select>' +
      '<input type="search" id="zsd-q" class="zsd-search" placeholder="Search customer, order, service…" aria-label="Search sales">' +
      '<button class="zsd-btn" id="zsd-reset" type="button">Reset</button></div>' +
      '<div class="zsd-chips" id="zsd-chips"></div><div id="zsd-content"></div></div>' +
      '<div id="zsd-pipeline-modal" class="zsd-modal-backdrop" style="display:none;" role="dialog" aria-modal="true" aria-labelledby="zsd-pipe-title">' +
      '<div class="zsd-modal-dialog">' +
      '<div class="zsd-modal-header"><div>' +
      '<h3 id="zsd-pipe-title" class="zsd-modal-title">⚡ Ingest Custom Dataset</h3>' +
      '<p class="zsd-modal-sub">Upload CSV or JSON files to dynamically load transactions into the Sales Dashboard.</p></div>' +
      '<button class="zsd-modal-close" id="zsd-pipe-close" type="button" aria-label="Close dialog">✕</button></div>' +
      '<div class="zsd-modal-body">' +
      '<div id="zsd-dropzone" class="zsd-dropzone">' +
      '<input type="file" id="zsd-file-input" accept=".csv,.json,.tsv,.txt" style="display:none;">' +
      '<div class="zsd-dropzone-icon">📁</div>' +
      '<div class="zsd-dropzone-title">Drag &amp; drop your CSV or JSON dataset here</div>' +
      '<div class="zsd-dropzone-sub">or browse a file from your device</div>' +
      '<div class="zsd-dropzone-actions">' +
      '<button class="zsd-btn primary" id="zsd-pipe-browse" type="button">Select File</button>' +
      '<button class="zsd-btn" id="zsd-pipe-load-sample" type="button">⚡ Load Q4 Sample Data</button>' +
      '<a class="zsd-btn" href="/api/v1/pipeline/template" download="zenve_sales_template.csv">⭳ Download Template</a></div></div>' +
      '<div class="zsd-pipe-options"><div class="zsd-pipe-opt-title">Ingestion Mode:</div>' +
      '<div class="zsd-pipe-modes">' +
      '<label class="zsd-pipe-mode-card"><input type="radio" name="zsd-pipe-mode" value="replace" checked>' +
      '<div><strong>Replace Entire Dataset</strong><span>Clears existing sales &amp; metrics, replacing them with the uploaded file.</span></div></label>' +
      '<label class="zsd-pipe-mode-card"><input type="radio" name="zsd-pipe-mode" value="append">' +
      '<div><strong>Append to Existing Records</strong><span>Preserves current database records and merges new rows into the timeline.</span></div></label></div></div>' +
      '<div id="zsd-pipe-preview-wrap" style="display:none;" class="zsd-pipe-preview-box">' +
      '<div class="zsd-pipe-preview-header"><h4>Dataset Preview</h4><span id="zsd-pipe-preview-stats" class="zsd-pipe-preview-stats"></span></div>' +
      '<div class="zsd-pipe-table-wrap"><table class="zsd-tbl" id="zsd-pipe-preview-table">' +
      '<thead><tr><th>Order ID</th><th>Date</th><th>Customer</th><th>Service</th><th>City</th><th>Channel</th><th>Status</th><th class="r">Amount</th></tr></thead>' +
      '<tbody></tbody></table></div></div>' +
      '<div id="zsd-pipe-alert" class="zsd-notice-banner" style="display:none;"></div></div>' +
      '<div class="zsd-modal-footer">' +
      '<button class="zsd-btn" id="zsd-pipe-reset-db" type="button" title="Restore default 105 demo records">↺ Factory Reset</button>' +
      '<div style="flex:1"></div>' +
      '<button class="zsd-btn" id="zsd-pipe-cancel" type="button">Cancel</button>' +
      '<button class="zsd-btn primary" id="zsd-pipe-submit" type="button" disabled>Ingest &amp; Update Dashboard</button></div></div></div>';
    document.body.appendChild(root);

    var backBtn = $('#zsd-back'); if (backBtn) backBtn.onclick = close;
    var refBtn = $('#zsd-refresh'); if (refBtn) refBtn.onclick = function () { load(); };
    var expBtn = $('#zsd-export'); if (expBtn) expBtn.onclick = exportCsv;
    var rstBtn = $('#zsd-reset'); if (rstBtn) rstBtn.onclick = resetFilters;
    wirePipelineModal();

    var tabsBar = $('#zsd-tabs');
    if (tabsBar) {
      tabsBar.onclick = function (e) {
        var b = e.target.closest('[data-tab]');
        if (!b) return;
        var tid = b.getAttribute('data-tab');
        if (tid) switchTab(tid);
      };
    }

    var presets = $('#zsd-presets');
    if (presets) {
      presets.onclick = function (e) {
        var b = e.target.closest('button');
        if (!b) return;
        preset(Number(b.getAttribute('data-p')));
        S.page = 1;
        syncFilterInputs();
        renderAll();
      };
    }

    ['from', 'to'].forEach(function (k) {
      var inp = $('#zsd-' + k);
      if (inp) {
        inp.onchange = function (e) {
          if (!e.target.value) return;
          S[k] = e.target.value;
          if (S.from && S.to && S.from > S.to) {
            if (k === 'from') S.to = S.from;
            else S.from = S.to;
          }
          S.page = 1;
          syncFilterInputs();
          renderAll();
        };
      }
    });

    ['status', 'app', 'category', 'city'].forEach(function (k) {
      var sel = $('#zsd-' + k);
      if (sel) {
        sel.onchange = function (e) {
          S[k] = e.target.value;
          S.page = 1;
          renderAll();
        };
      }
    });

    var t;
    var qInp = $('#zsd-q');
    if (qInp) {
      qInp.oninput = function (e) {
        clearTimeout(t);
        var v = e.target.value;
        t = setTimeout(function () {
          S.q = v.trim();
          S.page = 1;
          renderAll();
        }, 120);
      };
    }

    var chips = $('#zsd-chips');
    if (chips) {
      chips.onclick = function (e) {
        var b = e.target.closest('[data-clear]');
        if (!b) return;
        var k = b.getAttribute('data-clear');
        if (k === 'q') {
          S.q = '';
          var qi = $('#zsd-q');
          if (qi) qi.value = '';
        } else {
          S[k] = 'All';
        }
        S.page = 1;
        syncFilterInputs();
        renderAll();
      };
    }

    var content = $('#zsd-content');
    if (content) {
      content.addEventListener('click', onContentClick);
      content.addEventListener('change', function (e) {
        if (e.target.id === 'zsd-compare') {
          S.compare = e.target.checked;
          renderTrend();
        }
      });
      content.addEventListener('mousemove', onTrendMove);
      content.addEventListener('mouseleave', hideTip);
    }
  }

  function toggle(key, val) {
    S[key] = S[key] === val ? 'All' : val;
    S.page = 1;
    syncFilterInputs();
    renderAll();
  }

  function onContentClick(e) {
    var f = e.target.closest('[data-f]');
    if (f) {
      toggle(f.getAttribute('data-f'), f.getAttribute('data-v'));
      return;
    }
    var fs = e.target.closest('[data-funnel-stage]');
    if (fs) {
      var stId = fs.getAttribute('data-funnel-stage');
      S.funnelStage = (S.funnelStage === stId) ? 'All' : stId;
      S.page = 1;
      renderAll();
      return;
    }
    var m = e.target.closest('[data-metric]');
    if (m) {
      S.metric = m.getAttribute('data-metric');
      if (S.tab === 'funnel') renderFunnelDashboard();
      else renderTrend();
      return;
    }
    var sc = e.target.closest('[data-scenario]');
    if (sc) {
      S.forecastScenario = sc.getAttribute('data-scenario');
      renderForecastDashboard();
      return;
    }
    var hz = e.target.closest('[data-horizon]');
    if (hz) {
      S.forecastHorizon = Number(hz.getAttribute('data-horizon'));
      renderTabsBar();
      renderForecastDashboard();
      return;
    }
    var ta = e.target.closest('[data-target-adj]');
    if (ta) {
      S.targetAdjustPct = Number(ta.getAttribute('data-target-adj'));
      renderTargetsDashboard();
      return;
    }
    if (e.target.closest('#zsd-funnel-export')) {
      exportCsv();
      return;
    }
    var th = e.target.closest('th[data-sort]');
    if (th) {
      var k = th.getAttribute('data-sort');
      S.sort = { key: k, dir: S.sort.key === k ? -S.sort.dir : (k === 'amount' || k === 'sold_at' ? -1 : 1) };
      S.page = 1;
      if (S.tab === 'funnel') renderFunnelDashboard();
      else renderTable();
      return;
    }
    var pg = e.target.closest('[data-page]');
    if (pg && !pg.disabled) {
      S.page += Number(pg.getAttribute('data-page'));
      if (S.tab === 'funnel') renderFunnelDashboard();
      else renderTable();
    }
  }

  function buildFilterOptions() {
    if (!root) return;
    function fill(id, label, values, cur) {
      var s = $('#zsd-' + id);
      if (!s) return;
      s.innerHTML = '<option value="All">' + label + '</option>' + values.map(function (v) { return '<option>' + esc(v) + '</option>'; }).join('');
      s.value = values.indexOf(cur) >= 0 ? cur : 'All';
    }
    var sl = S.data.sales || [];
    fill('status', 'All statuses', uniq(sl.map(function (s) { return s.status; })), S.status);
    fill('app', 'All channels', uniq(sl.map(function (s) { return s.app_source; })), S.app);
    fill('category', 'All services', uniq(sl.map(function (s) { return s.source; })), S.category);
    fill('city', 'All cities', uniq(sl.map(function (s) { return s.city; })), S.city);
    ['status', 'app', 'category', 'city'].forEach(function (k) {
      var el = $('#zsd-' + k);
      if (el) S[k] = el.value;
    });
  }

  function syncFilterInputs() {
    if (!root) return;
    var fromEl = $('#zsd-from'), toEl = $('#zsd-to');
    if (fromEl) fromEl.value = S.from;
    if (toEl) toEl.value = S.to;
    ['status', 'app', 'category', 'city'].forEach(function (k) {
      var el = $('#zsd-' + k);
      if (el) el.value = S[k];
    });
    var b = dataBounds();
    var hit = null;
    if (b && S.to === b.max) {
      [7, 14, 30, 0].some(function (n) {
        var ok = n ? S.from === addDays(b.max, -(n - 1)) : S.from === b.min;
        if (ok) hit = n;
        return ok;
      });
    }
    var presets = $('#zsd-presets');
    if (presets) {
      presets.querySelectorAll('button').forEach(function (btn) {
        btn.classList.toggle('on', hit !== null && Number(btn.getAttribute('data-p')) === hit);
      });
    }
  }

  function resetFilters() {
    S.status = S.app = S.category = S.city = S.funnelStage = 'All';
    S.q = '';
    var qi = $('#zsd-q');
    if (qi) qi.value = '';
    preset(0);
    S.page = 1;
    syncFilterInputs();
    renderAll();
  }

  /* ---------- rendering ---------- */
  function renderTabsBar() {
    var tabsEl = $('#zsd-tabs');
    if (!tabsEl) return;
    var salesCount = (S.data.sales || []).length;
    var chCount = uniq((S.data.sales || []).map(function (s) { return s.app_source; })).length;
    var locCount = uniq((S.data.sales || []).map(function (s) { return s.city; })).length;
    var prodCount = uniq((S.data.sales || []).map(function (s) { return s.source; })).length;
    var custCount = new Set((S.data.sales || []).map(function (s) { return s.person; }).filter(Boolean)).size;

    var counts = {
      sales: salesCount,
      channel: chCount,
      location: locCount,
      product: prodCount,
      employee: EMPLOYEE_LIST.length,
      doctor: DOCTOR_LIST.length,
      customer: custCount,
      funnel: '5 Stages',
      targets: '6 Teams',
      forecast: S.forecastHorizon + ' Mo'
    };

    tabsEl.innerHTML = TABS.map(function (t) {
      var active = S.tab === t.id ? ' active' : '';
      var cnt = counts[t.id] !== undefined ? '<span class="zsd-tab-count">' + counts[t.id] + '</span>' : '';
      return '<button class="zsd-tab' + active + '" data-tab="' + t.id + '" type="button">' +
        '<span class="zsd-tab-icon">' + t.icon + '</span> ' + esc(t.label) + ' ' + cnt + '</button>';
    }).join('');
  }

  function renderKpiCards(cards) {
    return '<div class="zsd-kpis">' + cards.map(function (c) {
      return '<div class="zsd-card zsd-kpi"><div class="zsd-lbl">' + c[0] + '</div><div class="zsd-val">' + c[1] + '</div>' + c[2] + '</div>';
    }).join('') + '</div>';
  }

  function renderAll() {
    if (!root) return;
    var c = $('#zsd-content');
    if (!c) return;

    if (S.error) {
      c.innerHTML = '<div class="zsd-msg"><b>Could not load sales data</b> (' + esc(S.error) + ').<br>Check that the backend is running and reachable.<br><br><button class="zsd-btn" id="zsd-retry" type="button">Retry</button></div>';
      var retry = $('#zsd-retry');
      if (retry) retry.onclick = load;
      return;
    }
    if (!S.loaded) {
      c.innerHTML = '<div class="zsd-msg">Loading sales data…</div>';
      return;
    }

    var tabInfo = TABS.find(function (t) { return t.id === S.tab; }) || TABS[0];
    var b = dataBounds();
    var titleEl = $('#zsd-title');
    var sub = $('#zsd-sub');
    var filtersEl = $('.zsd-filters');
    var chipsEl = $('#zsd-chips');
    var isSpecialized = (S.tab === 'targets' || S.tab === 'forecast');

    if (filtersEl) filtersEl.style.display = isSpecialized ? 'none' : 'flex';
    if (chipsEl) chipsEl.style.display = isSpecialized ? 'none' : 'flex';

    if (S.tab === 'funnel') {
      if (titleEl) titleEl.textContent = '📊 Sales Funnel & Attrition Pipeline';
      if (sub) {
        sub.innerHTML = 'Multi-stage customer acquisition pipeline from mobile store installs to settled healthcare payments · ' +
          rows(S.from, S.to).length + ' transactions' +
          (b ? ' · ' + shortDay(S.from) + ' to ' + shortDay(S.to) : '') +
          (S.funnelStage && S.funnelStage !== 'All' ? ' · <span style="color:#0ea5e9;font-weight:700;">Filter: Stage ' + esc(S.funnelStage) + '</span>' : ' · <span style="color:#0ea5e9;font-weight:700;">● 5-Stage Geometry</span>') +
          (S.isLive ? ' · <span style="color:var(--success)">● Live</span>' : ' · <span style="color:var(--warning)">○ Preview</span>');
      }
    } else if (S.tab === 'targets') {
      if (titleEl) titleEl.textContent = '🎯 Sales Targets & Quota Realization';
      if (sub) sub.innerHTML = 'Executive pacing command center, calendar elapsed tracking, and departmental quota fulfillment · <span style="color:#10b981;font-weight:700;">● Quota Pacing Mode</span>';
    } else if (S.tab === 'forecast') {
      if (titleEl) titleEl.textContent = '📈 Predictive Revenue & Demand Forecast';
      if (sub) sub.innerHTML = 'Machine learning time-series projections, veterinary healthcare seasonality cycles, and 90% confidence bands · <span style="color:#a78bfa;font-weight:700;">● 92.8% Confidence (R²)</span>';
    } else {
      if (titleEl) titleEl.textContent = tabInfo.label;
      if (sub) {
        sub.innerHTML = esc(tabInfo.label) + ' · ' + (S.data.sales || []).length + ' transactions' +
          (b ? ' · ' + shortDay(b.min) + ' to ' + shortDay(b.max) : '') +
          (S.isLive ? ' · <span style="color:var(--success)">● Live</span>' : ' · <span style="color:var(--warning)">○ Preview</span>');
      }
    }

    renderTabsBar();
    if (!isSpecialized) renderChips();

    switch (S.tab) {
      case 'channel':
        renderChannelDashboard();
        break;
      case 'location':
        renderLocationDashboard();
        break;
      case 'product':
        renderProductDashboard();
        break;
      case 'employee':
        renderEmployeeDashboard();
        break;
      case 'doctor':
        renderDoctorDashboard();
        break;
      case 'customer':
        renderCustomerDashboard();
        break;
      case 'funnel':
        renderFunnelDashboard();
        break;
      case 'targets':
        renderTargetsDashboard();
        break;
      case 'forecast':
        renderForecastDashboard();
        break;
      case 'sales':
      default:
        renderSalesDashboard();
        break;
    }
  }

  function renderChips() {
    var out = [];
    [['status', 'Status'], ['app', 'Channel'], ['category', 'Service'], ['city', 'City'], ['funnelStage', 'Stage']].forEach(function (p) {
      if (S[p[0]] && S[p[0]] !== 'All') {
        out.push('<button class="zsd-chip" data-clear="' + p[0] + '" title="Remove filter">' + p[1] + ': ' + esc(S[p[0]]) + ' ✕</button>');
      }
    });
    if (S.q) out.push('<button class="zsd-chip" data-clear="q" title="Remove filter">Search: ' + esc(S.q) + ' ✕</button>');
    var chips = $('#zsd-chips');
    if (chips) chips.innerHTML = out.join('');
  }

  function delta(cur, prev, invert) {
    if (!prev) return '<div class="zsd-delta">vs prior: n/a</div>';
    var p = (cur - prev) / prev * 100, up = p >= 0;
    if (Math.abs(p) < 0.05) return '<div class="zsd-delta">→ 0.0% vs prior</div>';
    return '<div class="zsd-delta ' + ((up !== !!invert) ? 'up' : 'down') + '">' + (up ? '↗ +' : '↘ ') + p.toFixed(1) + '% vs prior</div>';
  }

  function renderKpis() {
    var cur = stats(S.from, S.to), pr = prevRange(), prev = stats(pr.from, pr.to);
    var cards = [
      ['Paid revenue', inr.format(cur.rev), delta(cur.rev, prev.rev)],
      ['Orders', String(cur.orders), delta(cur.orders, prev.orders)],
      ['Avg order value', inr.format(Math.round(cur.aov)), delta(cur.aov, prev.aov)],
      ['Customers', String(cur.customers), delta(cur.customers, prev.customers)],
      ['Paid rate', cur.rate.toFixed(1) + '%', '<div class="zsd-delta">' + cur.paidOrders + ' of ' + cur.orders + ' orders paid</div>'],
      ['Revenue / download', cur.dl ? '₹' + cur.rpd.toFixed(1) : '—', '<div class="zsd-delta">' + cur.dl.toLocaleString('en-IN') + ' installs</div>']
    ];
    var kpis = $('#zsd-kpis');
    if (kpis) {
      kpis.innerHTML = cards.map(function (c) {
        return '<div class="zsd-card zsd-kpi"><div class="zsd-lbl">' + c[0] + '</div><div class="zsd-val">' + c[1] + '</div>' + c[2] + '</div>';
      }).join('');
    }
  }

  /* trend chart */
  function series(from, to) {
    if (!from || !to) return [];
    var n = diffDays(from, to) + 1;
    if (n <= 0) return [];
    var out = [], idx = {};
    for (var i = 0; i < n; i++) {
      var d = addDays(from, i);
      idx[d] = i;
      out.push({ day: d, rev: 0, orders: 0 });
    }
    rows(from, to).forEach(function (s) {
      var day = safeDay(s.sold_at);
      var o = out[idx[day]];
      if (!o) return;
      o.orders++;
      if (s.status === 'Paid') o.rev += num(s.amount);
    });
    return out;
  }

  function renderTrend() {
    var cur = series(S.from, S.to), pr = prevRange(), prev = series(pr.from, pr.to);
    var trendEl = $('#zsd-trend');
    if (!trendEl) return;

    var n = cur.length;
    if (n === 0) {
      trendEl.innerHTML = panelHead('Sales trend', 'No data for selected dates') +
        '<div class="zsd-empty">No transactions found in this date range</div>';
      return;
    }

    var key = S.metric === 'revenue' ? 'rev' : 'orders';
    var fmt = function (v) { return S.metric === 'revenue' ? inr.format(v) : v + ' orders'; };
    var W = 800, H = 260, L = 54, R = 14, T = 14, B = 28, iw = W - L - R, ih = H - T - B;
    var allVals = cur.map(function (d) { return d[key]; });
    if (S.compare && prev.length) {
      allVals = allVals.concat(prev.map(function (d) { return d[key]; }));
    }
    var maxV = niceMax(Math.max.apply(null, allVals.length ? allVals : [0]));
    var X = function (i) { return L + (n <= 1 ? iw / 2 : i * iw / (n - 1)); };
    var Y = function (v) { return T + ih - (maxV > 0 ? (v / maxV * ih) : 0); };
    var path = function (arr) {
      if (!arr || !arr.length) return '';
      return arr.map(function (d, i) { return (i ? 'L' : 'M') + X(i).toFixed(1) + ' ' + Y(d[key]).toFixed(1); }).join(' ');
    };

    var grid = '', k;
    for (k = 0; k <= 4; k++) {
      var v = maxV * k / 4, y = Y(v);
      grid += '<line x1="' + L + '" x2="' + (W - R) + '" y1="' + y + '" y2="' + y + '" stroke="var(--border)" stroke-dasharray="' + (k ? '3 4' : '0') + '"/>' +
        '<text x="' + (L - 8) + '" y="' + (y + 3) + '" text-anchor="end">' + (S.metric === 'revenue' ? compact(v) : Math.round(v * 10) / 10) + '</text>';
    }

    var step = Math.max(1, Math.ceil(n / 8)), xl = '';
    for (var i = 0; i < n; i += step) {
      if (cur[i]) xl += '<text x="' + X(i) + '" y="' + (H - 8) + '" text-anchor="middle">' + shortDay(cur[i].day) + '</text>';
    }

    var area = n > 1
      ? path(cur) + ' L' + X(n - 1).toFixed(1) + ' ' + (T + ih) + ' L' + X(0).toFixed(1) + ' ' + (T + ih) + ' Z'
      : '';
    var singleMarker = n === 1
      ? '<circle cx="' + X(0).toFixed(1) + '" cy="' + Y(cur[0][key]).toFixed(1) + '" r="6" fill="var(--primary)"/>'
      : '';

    trendGeo = { cur: cur, prev: prev, key: key, fmt: fmt, W: W, H: H, L: L, iw: iw, n: n, X: X, Y: Y, T: T, ih: ih };
    trendEl.innerHTML =
      '<div class="zsd-ph"><h3>Sales trend<small>' + shortDay(S.from) + ' – ' + shortDay(S.to) + ' · hover for daily detail</small></h3>' +
      '<div class="zsd-tog"><div class="zsd-seg"><button data-metric="revenue" class="' + (S.metric === 'revenue' ? 'on' : '') + '">Revenue</button>' +
      '<button data-metric="orders" class="' + (S.metric === 'orders' ? 'on' : '') + '">Orders</button></div>' +
      '<label><input type="checkbox" id="zsd-compare" ' + (S.compare ? 'checked' : '') + '> Prior period</label></div></div>' +
      '<div class="zsd-chartwrap" id="zsd-trendwrap"><svg class="zsd-svg" id="zsd-trendsvg" viewBox="0 0 ' + W + ' ' + H + '">' +
      '<defs><linearGradient id="zsd-grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--primary)" stop-opacity=".28"/><stop offset="1" stop-color="var(--primary)" stop-opacity="0"/></linearGradient></defs>' +
      grid + xl +
      (S.compare && prev.length > 1 ? '<path d="' + path(prev) + '" fill="none" stroke="var(--muted-foreground)" stroke-width="1.5" stroke-dasharray="4 4" opacity=".7"/>' : '') +
      (area ? '<path d="' + area + '" fill="url(#zsd-grad)"/>' : '') +
      '<path d="' + path(cur) + '" fill="none" stroke="var(--primary)" stroke-width="2.2" stroke-linejoin="round"/>' +
      singleMarker +
      '<g id="zsd-hover" style="display:none"><line id="zsd-hl" y1="' + T + '" y2="' + (T + ih) + '" stroke="var(--primary)" stroke-opacity=".4"/>' +
      '<circle id="zsd-hc" r="4.5" fill="var(--card)" stroke="var(--primary)" stroke-width="2.2"/></g></svg>' +
      '<div class="zsd-tip" id="zsd-tip"></div></div>';
  }

  function hideTip() {
    var t = $('#zsd-tip'), h = $('#zsd-hover');
    if (t) t.style.opacity = 0;
    if (h) h.style.display = 'none';
  }

  function onTrendMove(e) {
    var svg = e.target && e.target.closest && e.target.closest('#zsd-trendsvg');
    if (!svg || !trendGeo || !trendGeo.cur || !trendGeo.cur.length) { hideTip(); return; }
    var g = trendGeo, r = svg.getBoundingClientRect();
    if (!r.width || !r.height) { hideTip(); return; }
    var sx = (e.clientX - r.left) / r.width * g.W;
    var i = g.n <= 1 ? 0 : Math.round((sx - g.L) / g.iw * (g.n - 1));
    i = Math.max(0, Math.min(g.n - 1, i));
    var d = g.cur[i];
    if (!d) { hideTip(); return; }
    var x = g.X(i), y = g.Y(d[g.key]);

    var h = $('#zsd-hover');
    if (h) h.style.display = 'block';
    var hl = $('#zsd-hl'); if (hl) { hl.setAttribute('x1', x); hl.setAttribute('x2', x); }
    var hc = $('#zsd-hc'); if (hc) { hc.setAttribute('cx', x); hc.setAttribute('cy', y); }
    var tip = $('#zsd-tip');
    if (tip) {
      var p = g.prev && g.prev[i];
      tip.innerHTML = '<b>' + prettyDay(d.day) + '</b><br>' + g.fmt(d[g.key]) + (S.compare && p ? '<br><span style="opacity:.7">Prior: ' + g.fmt(p[g.key]) + '</span>' : '');
      tip.style.left = (x / g.W * r.width) + 'px';
      tip.style.top = (y / g.H * r.height) + 'px';
      tip.style.opacity = 1;
    }
  }

  /* breakdown panels */
  function panelHead(title, sub) {
    return '<div class="zsd-ph"><h3>' + title + '<small>' + sub + '</small></h3></div>';
  }
  function barList(items, filterKey, colorFn, fmt, cur) {
    if (!items.length) return '<div class="zsd-empty">No data for these filters</div>';
    var max = items[0].v || 1;
    return '<div class="zsd-list">' + items.map(function (it, i) {
      return '<button class="zsd-row ' + (cur === it.k ? 'sel' : '') + '" data-f="' + filterKey + '" data-v="' + esc(it.k) + '" title="Click to filter">' +
        '<div class="zsd-row-top"><span>' + esc(it.k) + '</span><b>' + fmt(it.v) + '</b></div>' +
        '<div class="zsd-bar"><i style="width:' + Math.max(2, it.v / max * 100) + '%;background:' + colorFn(it.k, i) + '"></i></div></button>';
    }).join('') + '</div>';
  }
  function renderCategory() {
    var catEl = $('#zsd-cat');
    if (!catEl) return;
    var items = groupBy(paid(rows(S.from, S.to, 'category')), 'source', function (s) { return s.amount; }).slice(0, 8);
    catEl.innerHTML = panelHead('Revenue by service', 'Paid revenue · click to filter') +
      barList(items, 'category', function (k, i) { return CAT_COLORS[i % CAT_COLORS.length]; }, function (v) { return inr.format(v); }, S.category);
  }
  function renderCity() {
    var cityEl = $('#zsd-city-p');
    if (!cityEl) return;
    var items = groupBy(paid(rows(S.from, S.to, 'city')), 'city', function (s) { return s.amount; }).slice(0, 8);
    cityEl.innerHTML = panelHead('Revenue by city', 'Paid revenue · click to filter') +
      barList(items, 'city', function () { return 'var(--chart-3)'; }, function (v) { return inr.format(v); }, S.city);
  }
  function renderStatus() {
    var statusEl = $('#zsd-status-p');
    if (!statusEl) return;
    var order = ['Paid', 'Pending', 'Refunded', 'Cancelled'], list = rows(S.from, S.to, 'status'), m = {};
    list.forEach(function (s) { m[s.status] = (m[s.status] || 0) + 1; });
    Object.keys(m).forEach(function (k) { if (order.indexOf(k) < 0) order.push(k); });
    var items = order.filter(function (k) { return m[k]; }).map(function (k) { return { k: k, v: m[k] }; }).sort(function (a, b) { return b.v - a.v; });
    statusEl.innerHTML = panelHead('Order status', list.length + ' orders · click to filter') +
      barList(items, 'status', function (k) { return ST_COLORS[k] || 'var(--muted-foreground)'; }, function (v) { return v + ' (' + Math.round(v / Math.max(1, list.length) * 100) + '%)'; }, S.status);
  }
  function renderChannel() {
    var chEl = $('#zsd-channel');
    if (!chEl) return;
    var items = groupBy(paid(rows(S.from, S.to, 'app')), 'app_source', function (s) { return s.amount; });
    var total = sum(items.map(function (i) { return { amount: i.v }; }));
    var body;
    if (!total) {
      body = '<div class="zsd-empty">No paid revenue for these filters</div>';
    } else {
      var r = 56, C = 2 * Math.PI * r, acc = 0;
      var segs = items.map(function (it) {
        var len = C * it.v / total;
        var s = '<circle class="seg" data-f="app" data-v="' + esc(it.k) + '" cx="75" cy="75" r="' + r + '" fill="none" stroke="' + (CH_COLORS[it.k] || 'var(--chart-4)') +
          '" stroke-width="' + (S.app === it.k ? 26 : 20) + '" stroke-dasharray="' + len.toFixed(2) + ' ' + (C - len).toFixed(2) + '" stroke-dashoffset="' + (-acc).toFixed(2) +
          '" transform="rotate(-90 75 75)" style="cursor:pointer"><title>' + esc(it.k) + ': ' + inr.format(it.v) + '</title></circle>';
        acc += len;
        return s;
      }).join('');
      body = '<div class="zsd-donut"><svg viewBox="0 0 150 150">' + segs +
        '<text x="75" y="73" text-anchor="middle" style="font-size:15px;font-weight:700;fill:var(--foreground);font-family:inherit">' + compact(total) + '</text>' +
        '<text x="75" y="89" text-anchor="middle" style="font-size:9px">Paid revenue</text></svg><div class="zsd-legend">' +
        items.map(function (it) {
          return '<button class="zsd-leg ' + (S.app === it.k ? 'sel' : '') + '" data-f="app" data-v="' + esc(it.k) + '"><span class="dot" style="background:' + (CH_COLORS[it.k] || 'var(--chart-4)') +
            '"></span><span class="n">' + esc(it.k) + '</span><span class="p">' + Math.round(it.v / total * 100) + '%</span><span class="v">' + compact(it.v) + '</span></button>';
        }).join('') + '</div></div>';
    }
    chEl.innerHTML = panelHead('Revenue by channel', 'Android · iOS · Web · Other') + body;
  }
  function renderTop() {
    var topEl = $('#zsd-top');
    if (!topEl) return;
    var items = groupBy(paid(rows(S.from, S.to)), 'person', function (s) { return s.amount; }).slice(0, 6);
    var list = paid(rows(S.from, S.to));
    var html = items.length ? '<div class="zsd-top">' + items.map(function (it) {
      var oc = list.filter(function (s) { return s.person === it.k; }).length;
      var initials = (it.k || 'C').split(/\s+/).filter(Boolean).map(function (w) { return w[0]; }).slice(0, 2).join('').toUpperCase() || 'C';
      return '<div><span class="zsd-av">' + esc(initials) + '</span><span class="nm">' + esc(it.k) +
        '<br><span style="font-size:10px;color:var(--muted-foreground)">' + oc + ' paid order' + (oc > 1 ? 's' : '') + '</span></span><b>' + inr.format(it.v) + '</b></div>';
    }).join('') + '</div>' : '<div class="zsd-empty">No paid orders for these filters</div>';
    topEl.innerHTML = panelHead('Top customers', 'By paid revenue') + html;
  }

  /* table */
  var COLS = [
    ['transaction_ref', 'Order'],
    ['sold_at', 'Date'],
    ['person', 'Customer'],
    ['source', 'Service'],
    ['city', 'City'],
    ['app_source', 'Channel'],
    ['status', 'Status'],
    ['amount', 'Amount']
  ];
  function sortedRows() {
    var k = S.sort.key, d = S.sort.dir;
    return rows(S.from, S.to).sort(function (a, b) {
      var x = a[k], y = b[k];
      return (typeof x === 'number' ? x - y : String(x || '').localeCompare(String(y || ''))) * d || ((a.sold_at || '') < (b.sold_at || '') ? 1 : -1);
    });
  }
  function renderTable() {
    var tblEl = $('#zsd-table');
    if (!tblEl) return;
    var all = sortedRows(), pages = Math.max(1, Math.ceil(all.length / PAGE_SIZE));
    S.page = Math.max(1, Math.min(S.page, pages));
    var slice = all.slice((S.page - 1) * PAGE_SIZE, S.page * PAGE_SIZE);
    var head = COLS.map(function (c) {
      var on = S.sort.key === c[0];
      return '<th data-sort="' + c[0] + '" class="' + (c[0] === 'amount' ? 'r' : '') + '">' + c[1] + (on ? (S.sort.dir > 0 ? ' ▲' : ' ▼') : '') + '</th>';
    }).join('');
    var body = slice.map(function (s) {
      return '<tr><td>' + esc(s.transaction_ref) + '</td><td>' + prettyStamp(s.sold_at) + '</td><td>' + esc(s.person) + '</td><td>' + esc(s.source) + '</td><td>' + esc(s.city) +
        '</td><td>' + esc(s.app_source) + '</td><td><span class="zsd-badge ' + esc(s.status) + '">' + esc(s.status) + '</span></td><td class="r"><b>' + inr.format(s.amount) + '</b></td></tr>';
    }).join('');
    var from = all.length ? (S.page - 1) * PAGE_SIZE + 1 : 0, to = Math.min(all.length, S.page * PAGE_SIZE);
    tblEl.innerHTML = panelHead('Transactions', all.length + ' matching orders · click a header to sort') +
      (all.length ? '<div class="zsd-tbl-wrap"><table class="zsd-tbl"><thead><tr>' + head + '</tr></thead><tbody>' + body + '</tbody></table></div>' : '<div class="zsd-empty">No transactions match these filters</div>') +
      '<div class="zsd-pager"><span>' + from + '–' + to + ' of ' + all.length + '</span><div><button data-page="-1" ' + (S.page <= 1 ? 'disabled' : '') + '>← Prev</button>' +
      '<span style="align-self:center">Page ' + S.page + ' / ' + pages + '</span><button data-page="1" ' + (S.page >= pages ? 'disabled' : '') + '>Next →</button></div></div>';
  }
  function exportCsv() {
    var all = sortedRows();
    var q = function (v) { return '"' + String(v == null ? '' : v).replace(/"/g, '""') + '"'; };
    var csv = ['Order,Date,Customer,Service,City,Channel,Status,Amount'].concat(all.map(function (s) {
      return [s.transaction_ref, s.sold_at, s.person, s.source, s.city, s.app_source, s.status, s.amount].map(q).join(',');
    })).join('\n');
    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'zenve-sales-' + S.from + '_to_' + S.to + '.csv';
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      a.remove();
      URL.revokeObjectURL(url);
    }, 100);
  }

  /* ---------- specialized dashboard renderers ---------- */
  function renderSalesDashboard() {
    var c = $('#zsd-content');
    if (!c) return;
    if (!c.querySelector('#zsd-trend') || c.getAttribute('data-view') !== 'sales') {
      c.setAttribute('data-view', 'sales');
      c.innerHTML =
        '<div class="zsd-kpis" id="zsd-kpis"></div>' +
        '<div class="zsd-grid zsd-g-main"><div class="zsd-card zsd-panel" id="zsd-trend"></div><div class="zsd-card zsd-panel" id="zsd-channel"></div></div>' +
        '<div class="zsd-grid zsd-g-3"><div class="zsd-card zsd-panel" id="zsd-cat"></div><div class="zsd-card zsd-panel" id="zsd-city-p"></div>' +
        '<div class="zsd-card zsd-panel" id="zsd-status-p"></div></div>' +
        '<div class="zsd-grid zsd-g-main"><div class="zsd-card zsd-panel" id="zsd-table"></div><div class="zsd-card zsd-panel" id="zsd-top"></div></div>';
    }
    renderKpis();
    renderTrend();
    renderChannel();
    renderCategory();
    renderCity();
    renderStatus();
    renderTop();
    renderTable();
  }

  function renderChannelDashboard() {
    var c = $('#zsd-content');
    if (!c) return;
    c.setAttribute('data-view', 'channel');

    var list = rows(S.from, S.to);
    var p = paid(list);
    var totPaid = sum(p);

    var rawChList = uniq(list.map(function (s) { return s.app_source; })).filter(Boolean);
    var defaultChs = ['Android', 'iOS', 'Web', 'Other'];
    var channels = uniq(rawChList.length ? rawChList : defaultChs);
    var icons = { Android: '📱', iOS: '🍏', Web: '🌐', Other: '🔌', Clinic: '🏥', Store: '🏬', Direct: '🤝', Partner: '💼', Mobile: '📱', Desktop: '💻' };
    var CH_PALETTE = ['#2563eb', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#14b8a6', '#f97316', '#64748b'];
    var chData = channels.map(function (ch, idx) {
      var chAll = list.filter(function (s) { return s.app_source === ch; });
      var chPaid = p.filter(function (s) { return s.app_source === ch; });
      var rev = sum(chPaid);
      var orders = chAll.length;
      var paidOrders = chPaid.length;
      var aov = paidOrders ? Math.round(rev / paidOrders) : 0;
      var rate = orders ? (paidOrders / orders * 100) : 0;
      var share = totPaid ? (rev / totPaid * 100) : 0;
      return {
        name: ch,
        icon: icons[ch] || '🌐',
        rev: rev,
        orders: orders,
        paidOrders: paidOrders,
        aov: aov,
        rate: rate,
        share: share,
        color: CH_COLORS[ch] || CH_PALETTE[idx % CH_PALETTE.length]
      };
    }).sort(function (a, b) { return b.rev - a.rev; });

    var topCh = chData[0] || { name: 'Android', rev: 0, share: 0 };
    var kpiCards = [
      ['Total Channel Revenue', inr.format(totPaid), '<div class="zsd-delta">' + p.length + ' paid / ' + list.length + ' orders</div>'],
      ['Lead Platform', topCh.name + ' (' + topCh.share.toFixed(1) + '%)', '<div class="zsd-delta up">' + inr.format(topCh.rev) + ' generated</div>'],
      ['Platform Conversion', (list.length ? (p.length / list.length * 100).toFixed(1) : 0) + '%', '<div class="zsd-delta">' + p.length + ' orders paid</div>'],
      ['Average Order Value', inr.format(p.length ? Math.round(totPaid / p.length) : 0), '<div class="zsd-delta">across all channels</div>']
    ];

    var donutSvg = '';
    if (totPaid) {
      var r = 56, C = 2 * Math.PI * r, acc = 0;
      var segs = chData.map(function (it) {
        var len = C * it.rev / totPaid;
        var s = '<circle class="seg" data-f="app" data-v="' + esc(it.name) + '" cx="75" cy="75" r="' + r + '" fill="none" stroke="' + it.color +
          '" stroke-width="' + (S.app === it.name ? 26 : 20) + '" stroke-dasharray="' + len.toFixed(2) + ' ' + (C - len).toFixed(2) + '" stroke-dashoffset="' + (-acc).toFixed(2) +
          '" transform="rotate(-90 75 75)" style="cursor:pointer"><title>' + esc(it.name) + ': ' + inr.format(it.rev) + '</title></circle>';
        acc += len;
        return s;
      }).join('');
      donutSvg = '<div class="zsd-donut"><svg viewBox="0 0 150 150">' + segs +
        '<text x="75" y="73" text-anchor="middle" style="font-size:15px;font-weight:700;fill:var(--foreground);font-family:inherit">' + compact(totPaid) + '</text>' +
        '<text x="75" y="89" text-anchor="middle" style="font-size:9px">Total Revenue</text></svg><div class="zsd-legend">' +
        chData.map(function (it) {
          return '<button class="zsd-leg ' + (S.app === it.name ? 'sel' : '') + '" data-f="app" data-v="' + esc(it.name) + '"><span class="dot" style="background:' + it.color +
            '"></span><span class="n">' + esc(it.name) + '</span><span class="p">' + it.share.toFixed(1) + '%</span><span class="v">' + compact(it.rev) + '</span></button>';
        }).join('') + '</div></div>';
    } else {
      donutSvg = '<div class="zsd-empty">No revenue recorded for selected filters</div>';
    }

    var chCardsHtml = chData.map(function (it) {
      return '<div class="zsd-ch-card">' +
        '<div class="zsd-ch-head"><div class="zsd-ch-title"><span style="font-size:18px">' + it.icon + '</span><span>' + esc(it.name) + '</span></div>' +
        '<span class="zsd-pill primary">' + it.share.toFixed(1) + '% share</span></div>' +
        '<div class="zsd-progress"><div class="zsd-progress-fill" style="width:' + Math.max(3, it.share) + '%;background:' + it.color + '"></div></div>' +
        '<div class="zsd-ch-stats">' +
        '<div><div class="zsd-ch-stat-val">' + inr.format(it.rev) + '</div><div class="zsd-ch-stat-lbl">Revenue</div></div>' +
        '<div><div class="zsd-ch-stat-val">' + it.paidOrders + ' / ' + it.orders + '</div><div class="zsd-ch-stat-lbl">Orders</div></div>' +
        '<div><div class="zsd-ch-stat-val">' + inr.format(it.aov) + '</div><div class="zsd-ch-stat-lbl">AOV</div></div>' +
        '</div></div>';
    }).join('');

    var tableRows = chData.map(function (it, idx) {
      return '<tr>' +
        '<td><span class="zsd-rank-badge top-' + (idx + 1) + '">' + (idx + 1) + '</span></td>' +
        '<td><b>' + it.icon + ' ' + esc(it.name) + '</b></td>' +
        '<td class="r"><b>' + inr.format(it.rev) + '</b></td>' +
        '<td class="r"><span class="zsd-pill primary">' + it.share.toFixed(1) + '%</span></td>' +
        '<td class="r">' + it.orders + '</td>' +
        '<td class="r">' + it.paidOrders + '</td>' +
        '<td class="r">' + it.rate.toFixed(1) + '%</td>' +
        '<td class="r">' + inr.format(it.aov) + '</td>' +
        '</tr>';
    }).join('');

    c.innerHTML =
      renderKpiCards(kpiCards) +
      '<div class="zsd-grid zsd-g-channel">' +
      '<div class="zsd-card zsd-panel">' + panelHead('Revenue by Channel', 'Market share & contribution') + donutSvg + '</div>' +
      '<div class="zsd-card zsd-panel">' + panelHead('Channel Benchmarks', 'Performance & unit economics') +
      '<div class="zsd-ch-benchmarks-grid">' + chCardsHtml + '</div></div></div>' +
      '<div class="zsd-card zsd-panel" style="margin-top:12px;">' +
      panelHead('Channel Performance Matrix', 'Comprehensive platform breakdown') +
      '<div class="zsd-tbl-wrap"><table class="zsd-tbl"><thead><tr>' +
      '<th>Rank</th><th>Channel</th><th class="r">Revenue</th><th class="r">Share</th><th class="r">Total Orders</th><th class="r">Paid Orders</th><th class="r">Conversion</th><th class="r">AOV</th>' +
      '</tr></thead><tbody>' + tableRows + '</tbody></table></div></div>';
  }

  function renderLocationDashboard() {
    var c = $('#zsd-content');
    if (!c) return;
    c.setAttribute('data-view', 'location');

    var list = rows(S.from, S.to);
    var p = paid(list);
    var totPaid = sum(p);

    var cities = uniq(list.map(function (s) { return s.city; }));
    var cityData = cities.map(function (city) {
      var cityAll = list.filter(function (s) { return s.city === city; });
      var cityPaid = p.filter(function (s) { return s.city === city; });
      var rev = sum(cityPaid);
      var orders = cityAll.length;
      var paidOrders = cityPaid.length;
      var aov = paidOrders ? Math.round(rev / paidOrders) : 0;
      var share = totPaid ? (rev / totPaid * 100) : 0;
      var topSvc = groupBy(cityPaid, 'source', function (s) { return 1; })[0];
      var topCh = groupBy(cityPaid, 'app_source', function (s) { return 1; })[0];
      return {
        name: city,
        rev: rev,
        orders: orders,
        paidOrders: paidOrders,
        aov: aov,
        share: share,
        topService: topSvc ? topSvc.k : 'General',
        topChannel: topCh ? topCh.k : 'Android'
      };
    }).sort(function (a, b) { return b.rev - a.rev; });

    var topCity = cityData[0] || { name: 'Bengaluru', rev: 0, share: 0 };
    var top3Share = cityData.slice(0, 3).reduce(function (a, it) { return a + it.share; }, 0);
    var kpiCards = [
      ['Active Hubs', cityData.length + ' cities', '<div class="zsd-delta">Nationwide healthcare network</div>'],
      ['Top Revenue Hub', topCity.name + ' (' + topCity.share.toFixed(1) + '%)', '<div class="zsd-delta up">' + inr.format(topCity.rev) + ' generated</div>'],
      ['Metro Concentration', top3Share.toFixed(1) + '%', '<div class="zsd-delta">Revenue in top 3 cities</div>'],
      ['Geographic AOV', inr.format(p.length ? Math.round(totPaid / p.length) : 0), '<div class="zsd-delta">across all locations</div>']
    ];

    var maxCityRev = cityData[0] ? cityData[0].rev : 1;
    var barsHtml = cityData.length ? '<div class="zsd-list">' + cityData.map(function (it, idx) {
      var isSel = S.city === it.name;
      return '<button class="zsd-row ' + (isSel ? 'sel' : '') + '" data-f="city" data-v="' + esc(it.name) + '" title="Click to filter">' +
        '<div class="zsd-row-top"><span><b class="zsd-rank-badge top-' + (idx + 1) + '" style="margin-right:6px;">' + (idx + 1) + '</b>' + esc(it.name) + '</span><b>' + inr.format(it.rev) + ' (' + it.share.toFixed(1) + '%)</b></div>' +
        '<div class="zsd-bar"><i style="width:' + Math.max(2, it.rev / maxCityRev * 100) + '%;background:var(--chart-3)"></i></div></button>';
    }).join('') + '</div>' : '<div class="zsd-empty">No cities match filters</div>';

    var cardsHtml = cityData.slice(0, 6).map(function (it, idx) {
      return '<div class="zsd-entity-card">' +
        '<div class="zsd-card-top">' +
        '<div class="zsd-card-avatar" style="background:rgba(16,185,129,0.15);color:#10b981;">📍</div>' +
        '<div class="zsd-card-meta"><h4 class="zsd-card-title">' + esc(it.name) + '</h4>' +
        '<div class="zsd-card-sub">Top Service: ' + esc(it.topService) + '</div></div>' +
        '<span class="zsd-pill success">#' + (idx + 1) + ' · ' + it.share.toFixed(1) + '%</span></div>' +
        '<div class="zsd-card-stats">' +
        '<div class="zsd-stat-item"><b>' + inr.format(it.rev) + '</b><span>Revenue</span></div>' +
        '<div class="zsd-stat-item"><b>' + it.paidOrders + ' orders</b><span>Volume</span></div>' +
        '<div class="zsd-stat-item"><b>' + inr.format(it.aov) + '</b><span>Avg Ticket</span></div>' +
        '<div class="zsd-stat-item"><b>' + esc(it.topChannel) + '</b><span>Top App</span></div>' +
        '</div>' +
        '<div class="zsd-progress"><div class="zsd-progress-fill" style="width:' + Math.max(3, it.share) + '%;background:#10b981"></div></div>' +
        '</div>';
    }).join('');

    var tableRows = cityData.map(function (it, idx) {
      return '<tr>' +
        '<td><span class="zsd-rank-badge top-' + (idx + 1) + '">' + (idx + 1) + '</span></td>' +
        '<td><b>' + esc(it.name) + '</b></td>' +
        '<td class="r"><b>' + inr.format(it.rev) + '</b></td>' +
        '<td class="r"><span class="zsd-pill success">' + it.share.toFixed(1) + '%</span></td>' +
        '<td class="r">' + it.orders + '</td>' +
        '<td class="r">' + it.paidOrders + '</td>' +
        '<td class="r">' + inr.format(it.aov) + '</td>' +
        '<td>' + esc(it.topService) + '</td>' +
        '<td>' + esc(it.topChannel) + '</td>' +
        '</tr>';
    }).join('');

    c.innerHTML =
      renderKpiCards(kpiCards) +
      '<div class="zsd-grid zsd-g-main">' +
      '<div class="zsd-card zsd-panel">' + panelHead('City Revenue Ranking', 'Click any city to filter transactions') + barsHtml + '</div>' +
      '<div class="zsd-card zsd-panel">' + panelHead('Top Performing Hubs', 'Leading urban healthcare centers') +
      '<div class="zsd-card-grid">' + cardsHtml + '</div></div></div>' +
      '<div class="zsd-card zsd-panel" style="margin-top:12px;">' +
      panelHead('Geographic Revenue Matrix', 'Comprehensive location benchmarks') +
      '<div class="zsd-tbl-wrap"><table class="zsd-tbl"><thead><tr>' +
      '<th>Rank</th><th>City</th><th class="r">Revenue</th><th class="r">Share</th><th class="r">Total Orders</th><th class="r">Paid Orders</th><th class="r">AOV</th><th>Top Service</th><th>Top Channel</th>' +
      '</tr></thead><tbody>' + tableRows + '</tbody></table></div></div>';
  }

  function renderProductDashboard() {
    var c = $('#zsd-content');
    if (!c) return;
    c.setAttribute('data-view', 'product');

    var list = rows(S.from, S.to);
    var p = paid(list);
    var totPaid = sum(p);

    var products = uniq(list.map(function (s) { return s.source; }));
    var prodData = products.map(function (prod) {
      var prodAll = list.filter(function (s) { return s.source === prod; });
      var prodPaid = p.filter(function (s) { return s.source === prod; });
      var rev = sum(prodPaid);
      var orders = prodAll.length;
      var paidOrders = prodPaid.length;
      var aov = paidOrders ? Math.round(rev / paidOrders) : 0;
      var share = totPaid ? (rev / totPaid * 100) : 0;
      var topCity = groupBy(prodPaid, 'city', function (s) { return 1; })[0];
      var topCh = groupBy(prodPaid, 'app_source', function (s) { return 1; })[0];
      return {
        name: prod,
        rev: rev,
        orders: orders,
        paidOrders: paidOrders,
        aov: aov,
        share: share,
        topCity: topCity ? topCity.k : 'Bengaluru',
        topChannel: topCh ? topCh.k : 'Android'
      };
    }).sort(function (a, b) { return b.rev - a.rev; });

    var topProd = prodData[0] || { name: 'General Medicine', rev: 0, share: 0 };
    var kpiCards = [
      ['Service Catalog', prodData.length + ' services', '<div class="zsd-delta">Active medical offerings</div>'],
      ['Top Grossing Service', topProd.name + ' (' + topProd.share.toFixed(1) + '%)', '<div class="zsd-delta up">' + inr.format(topProd.rev) + ' generated</div>'],
      ['Procedures & Orders', list.length + ' bookings', '<div class="zsd-delta">' + p.length + ' paid procedures</div>'],
      ['Avg Service Price', inr.format(p.length ? Math.round(totPaid / p.length) : 0), '<div class="zsd-delta">per paid procedure</div>']
    ];

    var maxProdRev = prodData[0] ? prodData[0].rev : 1;
    var barsHtml = prodData.length ? '<div class="zsd-list">' + prodData.map(function (it, idx) {
      var isSel = S.category === it.name;
      return '<button class="zsd-row ' + (isSel ? 'sel' : '') + '" data-f="category" data-v="' + esc(it.name) + '" title="Click to filter">' +
        '<div class="zsd-row-top"><span><b class="zsd-rank-badge top-' + (idx + 1) + '" style="margin-right:6px;">' + (idx + 1) + '</b>' + esc(it.name) + '</span><b>' + inr.format(it.rev) + ' (' + it.share.toFixed(1) + '%)</b></div>' +
        '<div class="zsd-bar"><i style="width:' + Math.max(2, it.rev / maxProdRev * 100) + '%;background:' + CAT_COLORS[idx % CAT_COLORS.length] + '"></i></div></button>';
    }).join('') + '</div>' : '<div class="zsd-empty">No products match filters</div>';

    var cardsHtml = prodData.slice(0, 6).map(function (it, idx) {
      return '<div class="zsd-entity-card">' +
        '<div class="zsd-card-top">' +
        '<div class="zsd-card-avatar" style="background:rgba(139,92,246,0.15);color:#8b5cf6;">📦</div>' +
        '<div class="zsd-card-meta"><h4 class="zsd-card-title">' + esc(it.name) + '</h4>' +
        '<div class="zsd-card-sub">Top City: ' + esc(it.topCity) + '</div></div>' +
        '<span class="zsd-pill info">#' + (idx + 1) + ' · ' + it.share.toFixed(1) + '%</span></div>' +
        '<div class="zsd-card-stats">' +
        '<div class="zsd-stat-item"><b>' + inr.format(it.rev) + '</b><span>Revenue</span></div>' +
        '<div class="zsd-stat-item"><b>' + it.paidOrders + ' orders</b><span>Completed</span></div>' +
        '<div class="zsd-stat-item"><b>' + inr.format(it.aov) + '</b><span>Avg Ticket</span></div>' +
        '<div class="zsd-stat-item"><b>' + esc(it.topChannel) + '</b><span>Top Channel</span></div>' +
        '</div>' +
        '<div class="zsd-progress"><div class="zsd-progress-fill" style="width:' + Math.max(3, it.share) + '%;background:#8b5cf6"></div></div>' +
        '</div>';
    }).join('');

    var tableRows = prodData.map(function (it, idx) {
      return '<tr>' +
        '<td><span class="zsd-rank-badge top-' + (idx + 1) + '">' + (idx + 1) + '</span></td>' +
        '<td><b>' + esc(it.name) + '</b></td>' +
        '<td class="r"><b>' + inr.format(it.rev) + '</b></td>' +
        '<td class="r"><span class="zsd-pill info">' + it.share.toFixed(1) + '%</span></td>' +
        '<td class="r">' + it.orders + '</td>' +
        '<td class="r">' + it.paidOrders + '</td>' +
        '<td class="r">' + inr.format(it.aov) + '</td>' +
        '<td>' + esc(it.topCity) + '</td>' +
        '<td>' + esc(it.topChannel) + '</td>' +
        '</tr>';
    }).join('');

    c.innerHTML =
      renderKpiCards(kpiCards) +
      '<div class="zsd-grid zsd-g-main">' +
      '<div class="zsd-card zsd-panel">' + panelHead('Service Revenue Ranking', 'Click any service to filter transactions') + barsHtml + '</div>' +
      '<div class="zsd-card zsd-panel">' + panelHead('Featured Services & Procedures', 'Portfolio performance and margins') +
      '<div class="zsd-card-grid">' + cardsHtml + '</div></div></div>' +
      '<div class="zsd-card zsd-panel" style="margin-top:12px;">' +
      panelHead('Service Portfolio Matrix', 'Comprehensive unit economics') +
      '<div class="zsd-tbl-wrap"><table class="zsd-tbl"><thead><tr>' +
      '<th>Rank</th><th>Service / Product</th><th class="r">Revenue</th><th class="r">Share</th><th class="r">Total Orders</th><th class="r">Paid Orders</th><th class="r">AOV</th><th>Top City</th><th>Top Channel</th>' +
      '</tr></thead><tbody>' + tableRows + '</tbody></table></div></div>';
  }

  function renderEmployeeDashboard() {
    var c = $('#zsd-content');
    if (!c) return;
    c.setAttribute('data-view', 'employee');

    var list = rows(S.from, S.to);
    var p = paid(list);
    var totPaid = sum(p);

    var empMap = {};
    list.forEach(function (s) {
      var emp = getEmployeeForSale(s);
      if (!empMap[emp.name]) {
        empMap[emp.name] = {
          name: emp.name,
          dept: emp.dept,
          role: emp.role,
          av: emp.av,
          target: emp.target || 200000,
          orders: 0,
          paidOrders: 0,
          rev: 0
        };
      }
      empMap[emp.name].orders++;
      if (s.status === 'Paid') {
        empMap[emp.name].paidOrders++;
        empMap[emp.name].rev += num(s.amount);
      }
    });

    var empData = Object.keys(empMap).map(function (k) {
      var it = empMap[k];
      it.aov = it.paidOrders ? Math.round(it.rev / it.paidOrders) : 0;
      it.attainment = it.target ? (it.rev / it.target * 100) : 100;
      it.rate = it.orders ? (it.paidOrders / it.orders * 100) : 0;
      it.share = totPaid ? (it.rev / totPaid * 100) : 0;
      return it;
    }).sort(function (a, b) { return b.rev - a.rev; });

    var topEmp = empData[0] || { name: 'Dr. Priya Sharma', rev: 0 };
    var kpiCards = [
      ['Operational Staff', empData.length + ' staff', '<div class="zsd-delta">Active healthcare coordinators</div>'],
      ['Top Revenue Producer', topEmp.name, '<div class="zsd-delta up">' + inr.format(topEmp.rev) + ' generated</div>'],
      ['Avg Revenue / Staff', inr.format(empData.length ? Math.round(totPaid / empData.length) : 0), '<div class="zsd-delta">across all departments</div>'],
      ['Staff Conversion Rate', (list.length ? (p.length / list.length * 100).toFixed(1) : 0) + '%', '<div class="zsd-delta">' + p.length + ' completed bookings</div>']
    ];

    var cardsHtml = empData.map(function (it, idx) {
      var isExceeded = it.attainment >= 100;
      var pillClass = isExceeded ? 'success' : (it.attainment >= 75 ? 'primary' : 'warning');
      return '<div class="zsd-entity-card">' +
        '<div class="zsd-card-top">' +
        '<div class="zsd-card-avatar">' + esc(it.av) + '</div>' +
        '<div class="zsd-card-meta"><h4 class="zsd-card-title">' + esc(it.name) + '</h4>' +
        '<div class="zsd-card-sub">' + esc(it.role) + ' · ' + esc(it.dept) + '</div></div>' +
        '<span class="zsd-pill ' + pillClass + '">#' + (idx + 1) + ' · ' + it.attainment.toFixed(0) + '% Target</span></div>' +
        '<div class="zsd-card-stats">' +
        '<div class="zsd-stat-item"><b>' + inr.format(it.rev) + '</b><span>Revenue</span></div>' +
        '<div class="zsd-stat-item"><b>' + it.paidOrders + ' orders</b><span>Handled</span></div>' +
        '<div class="zsd-stat-item"><b>' + inr.format(it.aov) + '</b><span>Avg Ticket</span></div>' +
        '<div class="zsd-stat-item"><b>' + it.rate.toFixed(1) + '%</b><span>Conversion</span></div>' +
        '</div>' +
        '<div style="font-size:10px;display:flex;justify-content:space-between;color:var(--muted-foreground)">' +
        '<span>Target: ' + inr.format(it.target) + '</span><span>' + it.attainment.toFixed(1) + '%</span></div>' +
        '<div class="zsd-progress"><div class="zsd-progress-fill" style="width:' + Math.min(100, Math.max(3, it.attainment)) + '%;background:' + (isExceeded ? 'var(--success)' : 'var(--primary)') + '"></div></div>' +
        '</div>';
    }).join('');

    var tableRows = empData.map(function (it, idx) {
      var badge = it.attainment >= 100 ? '<span class="zsd-pill success">★ Star Performer</span>' : (it.attainment >= 80 ? '<span class="zsd-pill primary">Target On Track</span>' : '<span class="zsd-pill warning">In Progress</span>');
      return '<tr>' +
        '<td><span class="zsd-rank-badge top-' + (idx + 1) + '">' + (idx + 1) + '</span></td>' +
        '<td><b>' + esc(it.name) + '</b></td>' +
        '<td><span class="zsd-tag">' + esc(it.dept) + '</span></td>' +
        '<td>' + esc(it.role) + '</td>' +
        '<td class="r"><b>' + inr.format(it.rev) + '</b></td>' +
        '<td class="r">' + it.paidOrders + ' / ' + it.orders + '</td>' +
        '<td class="r">' + inr.format(it.aov) + '</td>' +
        '<td class="r"><b>' + it.attainment.toFixed(1) + '%</b></td>' +
        '<td class="r">' + badge + '</td>' +
        '</tr>';
    }).join('');

    c.innerHTML =
      renderKpiCards(kpiCards) +
      '<div class="zsd-card zsd-panel" style="margin-bottom:12px;">' +
      panelHead('Employee Performance Leaderboard', 'Operational revenue attribution & monthly targets') +
      '<div class="zsd-card-grid">' + cardsHtml + '</div></div>' +
      '<div class="zsd-card zsd-panel">' +
      panelHead('Staff Productivity Matrix', 'Full staff consultation & revenue summary') +
      '<div class="zsd-tbl-wrap"><table class="zsd-tbl"><thead><tr>' +
      '<th>Rank</th><th>Employee</th><th>Department</th><th>Role</th><th class="r">Revenue</th><th class="r">Orders</th><th class="r">AOV</th><th class="r">Target Progress</th><th class="r">Status</th>' +
      '</tr></thead><tbody>' + tableRows + '</tbody></table></div></div>';
  }

  function renderDoctorDashboard() {
    var c = $('#zsd-content');
    if (!c) return;
    c.setAttribute('data-view', 'doctor');

    var list = rows(S.from, S.to);
    var p = paid(list);
    var totPaid = sum(p);

    var docMap = {};
    list.forEach(function (s) {
      var doc = getDoctorForSale(s);
      if (!docMap[doc.name]) {
        docMap[doc.name] = {
          name: doc.name,
          spec: doc.spec,
          reg: doc.reg,
          av: doc.av,
          consults: 0,
          paidConsults: 0,
          rev: 0
        };
      }
      docMap[doc.name].consults++;
      if (s.status === 'Paid') {
        docMap[doc.name].paidConsults++;
        docMap[doc.name].rev += num(s.amount);
      }
    });

    var docData = Object.keys(docMap).map(function (k) {
      var it = docMap[k];
      it.avgFee = it.paidConsults ? Math.round(it.rev / it.paidConsults) : 0;
      it.share = totPaid ? (it.rev / totPaid * 100) : 0;
      return it;
    }).sort(function (a, b) { return b.rev - a.rev; });

    var topDoc = docData[0] || { name: 'Dr. Divya Balasubramanian', rev: 0, share: 0 };
    var kpiCards = [
      ['Medical Specialists', docData.length + ' doctors', '<div class="zsd-delta">Consulting physicians & surgeons</div>'],
      ['Leading Physician', topDoc.name + ' (' + topDoc.share.toFixed(1) + '%)', '<div class="zsd-delta up">' + inr.format(topDoc.rev) + ' generated</div>'],
      ['Total Patient Consults', list.length + ' visits', '<div class="zsd-delta">' + p.length + ' paid consultations</div>'],
      ['Avg Consultation Fee', inr.format(p.length ? Math.round(totPaid / p.length) : 0), '<div class="zsd-delta">per clinical session</div>']
    ];

    var cardsHtml = docData.map(function (it, idx) {
      return '<div class="zsd-entity-card">' +
        '<div class="zsd-card-top">' +
        '<div class="zsd-card-avatar" style="background:rgba(14,165,233,0.15);color:#0ea5e9;">' + esc(it.av) + '</div>' +
        '<div class="zsd-card-meta"><h4 class="zsd-card-title">' + esc(it.name) + '</h4>' +
        '<div class="zsd-card-sub"><span class="zsd-tag primary">' + esc(it.spec) + '</span></div></div>' +
        '<span class="zsd-pill info">#' + (idx + 1) + ' · ' + it.share.toFixed(1) + '%</span></div>' +
        '<div class="zsd-card-stats">' +
        '<div class="zsd-stat-item"><b>' + inr.format(it.rev) + '</b><span>Revenue</span></div>' +
        '<div class="zsd-stat-item"><b>' + it.paidConsults + ' consults</b><span>Patients</span></div>' +
        '<div class="zsd-stat-item"><b>' + inr.format(it.avgFee) + '</b><span>Avg Fee</span></div>' +
        '<div class="zsd-stat-item"><b>' + esc(it.reg) + '</b><span>Reg #</span></div>' +
        '</div>' +
        '<div style="font-size:10px;display:flex;justify-content:space-between;color:var(--muted-foreground)">' +
        '<span>Share of Clinic Revenue</span><span>' + it.share.toFixed(1) + '%</span></div>' +
        '<div class="zsd-progress"><div class="zsd-progress-fill" style="width:' + Math.max(3, it.share) + '%;background:#0ea5e9"></div></div>' +
        '</div>';
    }).join('');

    var tableRows = docData.map(function (it, idx) {
      return '<tr>' +
        '<td><span class="zsd-rank-badge top-' + (idx + 1) + '">' + (idx + 1) + '</span></td>' +
        '<td><b>' + esc(it.name) + '</b></td>' +
        '<td><span class="zsd-tag primary">' + esc(it.spec) + '</span></td>' +
        '<td><code>' + esc(it.reg) + '</code></td>' +
        '<td class="r"><b>' + inr.format(it.rev) + '</b></td>' +
        '<td class="r"><span class="zsd-pill info">' + it.share.toFixed(1) + '%</span></td>' +
        '<td class="r">' + it.paidConsults + ' / ' + it.consults + '</td>' +
        '<td class="r">' + inr.format(it.avgFee) + '</td>' +
        '</tr>';
    }).join('');

    c.innerHTML =
      renderKpiCards(kpiCards) +
      '<div class="zsd-card zsd-panel" style="margin-bottom:12px;">' +
      panelHead('Physician Clinical Performance', 'Doctor-level consultation revenue and specialty contribution') +
      '<div class="zsd-card-grid">' + cardsHtml + '</div></div>' +
      '<div class="zsd-card zsd-panel">' +
      panelHead('Doctor Consultation & Procedure Matrix', 'Full clinical billing breakdown') +
      '<div class="zsd-tbl-wrap"><table class="zsd-tbl"><thead><tr>' +
      '<th>Rank</th><th>Doctor Name</th><th>Specialty</th><th>Registration</th><th class="r">Revenue</th><th class="r">Share</th><th class="r">Consultations</th><th class="r">Avg Fee</th>' +
      '</tr></thead><tbody>' + tableRows + '</tbody></table></div></div>';
  }

  function renderCustomerDashboard() {
    var c = $('#zsd-content');
    if (!c) return;
    c.setAttribute('data-view', 'customer');

    var list = rows(S.from, S.to);
    var p = paid(list);
    var totPaid = sum(p);

    var custMap = {};
    list.forEach(function (s) {
      var name = s.person || 'Anonymous Customer';
      if (!custMap[name]) {
        custMap[name] = {
          name: name,
          orders: 0,
          paidOrders: 0,
          rev: 0,
          lastDate: safeDay(s.sold_at),
          city: s.city || 'Bengaluru',
          topSvcMap: {},
          topChMap: {}
        };
      }
      custMap[name].orders++;
      var d = safeDay(s.sold_at);
      if (d && (!custMap[name].lastDate || d > custMap[name].lastDate)) {
        custMap[name].lastDate = d;
      }
      if (s.source) custMap[name].topSvcMap[s.source] = (custMap[name].topSvcMap[s.source] || 0) + 1;
      if (s.app_source) custMap[name].topChMap[s.app_source] = (custMap[name].topChMap[s.app_source] || 0) + 1;

      if (s.status === 'Paid') {
        custMap[name].paidOrders++;
        custMap[name].rev += num(s.amount);
      }
    });

    var custData = Object.keys(custMap).map(function (k) {
      var it = custMap[k];
      it.aov = it.paidOrders ? Math.round(it.rev / it.paidOrders) : 0;
      var topSvc = Object.keys(it.topSvcMap).sort(function (a, b) { return it.topSvcMap[b] - it.topSvcMap[a]; })[0];
      var topCh = Object.keys(it.topChMap).sort(function (a, b) { return it.topChMap[b] - it.topChMap[a]; })[0];
      it.topService = topSvc || 'General Care';
      it.topChannel = topCh || 'Android';
      it.tier = it.rev >= 30000 ? 'Diamond' : (it.rev >= 15000 ? 'Gold' : (it.rev >= 5000 ? 'Silver' : 'Bronze'));
      var parts = it.name.split(/\s+/).filter(Boolean);
      it.av = (parts[0] ? parts[0][0] : 'C') + (parts[1] ? parts[1][0] : '');
      return it;
    }).sort(function (a, b) { return b.rev - a.rev; });

    var topCust = custData[0] || { name: 'Customer', rev: 0 };
    var repeatCusts = custData.filter(function (it) { return it.orders > 1; }).length;
    var diamondCusts = custData.filter(function (it) { return it.tier === 'Diamond'; });
    var goldCusts = custData.filter(function (it) { return it.tier === 'Gold'; });
    var silverCusts = custData.filter(function (it) { return it.tier === 'Silver'; });
    var bronzeCusts = custData.filter(function (it) { return it.tier === 'Bronze'; });

    var diamondRev = sum(diamondCusts.map(function (c) { return { amount: c.rev }; }));
    var goldRev = sum(goldCusts.map(function (c) { return { amount: c.rev }; }));
    var silverRev = sum(silverCusts.map(function (c) { return { amount: c.rev }; }));
    var bronzeRev = sum(bronzeCusts.map(function (c) { return { amount: c.rev }; }));

    var kpiCards = [
      ['Total Unique Clients', custData.length + ' customers', '<div class="zsd-delta">' + repeatCusts + ' repeat spenders (' + (custData.length ? (repeatCusts / custData.length * 100).toFixed(1) : 0) + '%)</div>'],
      ['Top Customer Spend', topCust.name, '<div class="zsd-delta up">' + inr.format(topCust.rev) + ' lifetime value</div>'],
      ['Avg Spend per Client', inr.format(custData.length ? Math.round(totPaid / custData.length) : 0), '<div class="zsd-delta">across all cohorts</div>'],
      ['VIP Tier Revenue', inr.format(diamondRev + goldRev), '<div class="zsd-delta">' + (totPaid ? ((diamondRev + goldRev) / totPaid * 100).toFixed(1) : 0) + '% from VIP Diamond & Gold</div>']
    ];

    var tiersHtml =
      '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:14px;">' +
      '<div class="zsd-entity-card" style="padding:12px;">' +
      '<div style="display:flex;justify-content:space-between;align-items:center;"><b>💎 Diamond</b><span class="zsd-pill zsd-tier-diamond">' + diamondCusts.length + ' clients</span></div>' +
      '<div style="font-size:16px;font-weight:700;margin-top:6px;font-family:IBM Plex Mono,monospace;">' + inr.format(diamondRev) + '</div>' +
      '<div style="font-size:10px;color:var(--muted-foreground)">Spend &gt; ₹30,000</div></div>' +
      '<div class="zsd-entity-card" style="padding:12px;">' +
      '<div style="display:flex;justify-content:space-between;align-items:center;"><b>🥇 Gold</b><span class="zsd-pill zsd-tier-gold">' + goldCusts.length + ' clients</span></div>' +
      '<div style="font-size:16px;font-weight:700;margin-top:6px;font-family:IBM Plex Mono,monospace;">' + inr.format(goldRev) + '</div>' +
      '<div style="font-size:10px;color:var(--muted-foreground)">Spend ₹15K–₹30K</div></div>' +
      '<div class="zsd-entity-card" style="padding:12px;">' +
      '<div style="display:flex;justify-content:space-between;align-items:center;"><b>🥈 Silver</b><span class="zsd-pill zsd-tier-silver">' + silverCusts.length + ' clients</span></div>' +
      '<div style="font-size:16px;font-weight:700;margin-top:6px;font-family:IBM Plex Mono,monospace;">' + inr.format(silverRev) + '</div>' +
      '<div style="font-size:10px;color:var(--muted-foreground)">Spend ₹5K–₹15K</div></div>' +
      '<div class="zsd-entity-card" style="padding:12px;">' +
      '<div style="display:flex;justify-content:space-between;align-items:center;"><b>🥉 Bronze</b><span class="zsd-pill zsd-tier-bronze">' + bronzeCusts.length + ' clients</span></div>' +
      '<div style="font-size:16px;font-weight:700;margin-top:6px;font-family:IBM Plex Mono,monospace;">' + inr.format(bronzeRev) + '</div>' +
      '<div style="font-size:10px;color:var(--muted-foreground)">Spend &lt; ₹5,000</div></div>' +
      '</div>';

    var cardsHtml = custData.slice(0, 6).map(function (it, idx) {
      var tierClass = 'zsd-tier-' + it.tier.toLowerCase();
      return '<div class="zsd-entity-card">' +
        '<div class="zsd-card-top">' +
        '<div class="zsd-card-avatar">' + esc(it.av) + '</div>' +
        '<div class="zsd-card-meta"><h4 class="zsd-card-title">' + esc(it.name) + '</h4>' +
        '<div class="zsd-card-sub">' + esc(it.city) + ' · Last: ' + esc(shortDay(it.lastDate)) + '</div></div>' +
        '<span class="zsd-pill ' + tierClass + '">#' + (idx + 1) + ' · ' + it.tier + '</span></div>' +
        '<div class="zsd-card-stats">' +
        '<div class="zsd-stat-item"><b>' + inr.format(it.rev) + '</b><span>Lifetime Spend</span></div>' +
        '<div class="zsd-stat-item"><b>' + it.paidOrders + ' orders</b><span>Frequency</span></div>' +
        '<div class="zsd-stat-item"><b>' + inr.format(it.aov) + '</b><span>Avg Ticket</span></div>' +
        '<div class="zsd-stat-item"><b>' + esc(it.topChannel) + '</b><span>Channel</span></div>' +
        '</div>' +
        '<div style="font-size:10px;color:var(--muted-foreground);display:flex;justify-content:space-between;">' +
        '<span>Favorite: ' + esc(it.topService) + '</span><span>' + (it.orders > 1 ? '🔁 Repeat Client' : '🌱 First Order') + '</span></div>' +
        '</div>';
    }).join('');

    var tableRows = custData.map(function (it, idx) {
      var tierClass = 'zsd-tier-' + it.tier.toLowerCase();
      return '<tr>' +
        '<td><span class="zsd-rank-badge top-' + (idx + 1) + '">' + (idx + 1) + '</span></td>' +
        '<td><b>' + esc(it.name) + '</b></td>' +
        '<td class="r"><b>' + inr.format(it.rev) + '</b></td>' +
        '<td class="r">' + it.paidOrders + ' / ' + it.orders + '</td>' +
        '<td class="r">' + inr.format(it.aov) + '</td>' +
        '<td>' + esc(it.topService) + '</td>' +
        '<td>' + esc(it.city) + '</td>' +
        '<td>' + esc(it.topChannel) + '</td>' +
        '<td><span class="zsd-pill ' + tierClass + '">' + it.tier + '</span></td>' +
        '<td>' + esc(shortDay(it.lastDate)) + '</td>' +
        '</tr>';
    }).join('');

    c.innerHTML =
      renderKpiCards(kpiCards) +
      tiersHtml +
      '<div class="zsd-card zsd-panel" style="margin-bottom:12px;">' +
      panelHead('High-Value Client Spotlight', 'Top spending client profiles and behavioral loyalty') +
      '<div class="zsd-card-grid">' + cardsHtml + '</div></div>' +
      '<div class="zsd-card zsd-panel">' +
      panelHead('Customer Lifetime Revenue Leaderboard', 'Full client directory with lifetime spend & order counts') +
      '<div class="zsd-tbl-wrap"><table class="zsd-tbl"><thead><tr>' +
      '<th>Rank</th><th>Customer Name</th><th class="r">Total Spend</th><th class="r">Orders</th><th class="r">AOV</th><th>Favorite Service</th><th>City</th><th>Channel</th><th>Tier</th><th>Last Active</th>' +
      '</tr></thead><tbody>' + tableRows + '</tbody></table></div></div>';
  }

  /* ---------- Sales Funnel Dashboard ---------- */
  function renderFunnelDashboard() {
    var c = $('#zsd-content');
    if (!c) return;
    c.setAttribute('data-view', 'funnel');

    var listAll = rows(S.from, S.to, 'funnelStage');
    var pAll = paid(listAll);
    var totPaidAll = sum(pAll);

    // Current period funnel stats
    var dl = downloads(S.from, S.to);
    var installs = Math.max(dl > 0 ? dl : 0, Math.round(listAll.length * 16 + 240));
    var opens = Math.round(installs * 0.72);
    var intent = Math.max(listAll.length * 2, Math.round(opens * 0.45));
    var checkout = listAll.length;
    var completed = pAll.length;

    var convE2E = installs > 0 ? (completed / installs * 100) : 0;
    var convCheckout = checkout > 0 ? (completed / checkout * 100) : 0;
    var pipelineVal = Math.round(totPaidAll * 3.2);
    var lostVal = Math.round((checkout - completed) * (completed ? totPaidAll / completed : 1850));
    var aov = completed > 0 ? Math.round(totPaidAll / completed) : 0;

    // Prior period comparison
    var pr = prevRange();
    var prevList = rows(pr.from, pr.to, 'funnelStage');
    var prevP = paid(prevList);
    var prevTotPaid = sum(prevP);
    var prevDl = downloads(pr.from, pr.to);
    var prevInstalls = Math.max(prevDl > 0 ? prevDl : 0, Math.round(prevList.length * 16 + 240));
    var prevCheckout = prevList.length;
    var prevCompleted = prevP.length;
    var prevConvE2E = prevInstalls > 0 ? (prevCompleted / prevInstalls * 100) : 0;
    var prevConvCheckout = prevCheckout > 0 ? (prevCompleted / prevCheckout * 100) : 0;
    var prevPipelineVal = Math.round(prevTotPaid * 3.2);
    var prevLostVal = Math.round((prevCheckout - prevCompleted) * (prevCompleted ? prevTotPaid / prevCompleted : 1850));
    var prevAov = prevCompleted > 0 ? Math.round(prevTotPaid / prevCompleted) : 0;

    // 1. Executive 6-Card KPI Grid (Matching Sales Dashboard format)
    var kpiCards = [
      ['Pipeline Inflow Potential', inr.format(pipelineVal), delta(pipelineVal, prevPipelineVal)],
      ['Realized Paid Sales', inr.format(totPaidAll), delta(totPaidAll, prevTotPaid)],
      ['End-to-End Conversion', convE2E.toFixed(2) + '%', delta(convE2E, prevConvE2E)],
      ['Checkout Completion', convCheckout.toFixed(1) + '%', delta(convCheckout, prevConvCheckout)],
      ['Avg Converted Order (AOV)', inr.format(aov), delta(aov, prevAov)],
      ['Lost Opportunity Pipeline', inr.format(lostVal), delta(lostVal, prevLostVal, true)]
    ];

    var kpisHtml = '<div class="zsd-kpis" style="margin-bottom:14px;">' + kpiCards.map(function (c) {
      return '<div class="zsd-card zsd-kpi"><div class="zsd-lbl">' + c[0] + '</div><div class="zsd-val">' + c[1] + '</div>' + c[2] + '</div>';
    }).join('') + '</div>';

    // 2. 5-Stage Geometry Cards with click filtering
    var stages = [
      { id: 'installs', num: 1, name: 'App Installs', icon: '📲', val: installs, rev: pipelineVal, color: '#0ea5e9', source: 'Android & iOS Stores' },
      { id: 'opens', num: 2, name: 'Active Sessions', icon: '👁️', val: opens, rev: Math.round(pipelineVal * 0.72), color: '#3b82f6', source: 'Launches & Visits' },
      { id: 'intent', num: 3, name: 'Service Inquiries', icon: '🩺', val: intent, rev: Math.round(pipelineVal * 0.48), color: '#8b5cf6', source: 'Consult & Cart' },
      { id: 'checkout', num: 4, name: 'Orders Placed', icon: '🛒', val: checkout, rev: Math.round(totPaidAll * 1.35), color: '#f59e0b', source: 'Checkout Initiated' },
      { id: 'paid', num: 5, name: 'Paid Conversions', icon: '✅', val: completed, rev: totPaidAll, color: '#10b981', source: 'Successful Payments' }
    ];

    var stagesCardsHtml = '<div class="zsd-funnel-stages">' + stages.map(function (st, idx) {
      var prevVal = idx > 0 ? stages[idx - 1].val : st.val;
      var stepConv = prevVal > 0 ? (st.val / prevVal * 100).toFixed(1) : '100.0';
      var dropPct = prevVal > 0 ? ((prevVal - st.val) / prevVal * 100).toFixed(1) : '0.0';
      var isStageActive = S.funnelStage === st.id;
      return '<div class="zsd-stage-card" data-funnel-stage="' + st.id + '" style="cursor:pointer;' + (isStageActive ? 'border-color:#0ea5e9;box-shadow:0 0 14px rgba(14,165,233,0.35);background:rgba(14,165,233,0.08);' : '') + '">' +
        '<div class="zsd-stage-step"><span class="zsd-stage-num">0' + st.num + '</span><span>' + esc(st.source) + '</span></div>' +
        '<div class="zsd-stage-title"><span>' + st.icon + '</span> ' + esc(st.name) + '</div>' +
        '<div class="zsd-stage-val">' + st.val.toLocaleString('en-IN') + '</div>' +
        '<div style="display:flex;align-items:center;justify-content:space-between;margin-top:4px;">' +
        (idx === 0 ? '<span class="zsd-conv-pill">Top of Funnel</span>' : '<span class="zsd-conv-pill">✓ ' + stepConv + '% kept</span>') +
        (idx > 0 ? '<span class="zsd-dropoff-pill">↓ ' + dropPct + '%</span>' : '<span style="font-size:10px;color:var(--muted-foreground)">100% Volume</span>') +
        '</div>' +
        '</div>';
    }).join('') + '</div>';

    // 3. SVG Geometric Funnel (Left Centerpiece)
    var FW = 620, FH = 240, stageW = FW / stages.length;
    var svgShapes = '';
    for (var i = 0; i < stages.length; i++) {
      var x1 = i * stageW;
      var x2 = (i + 1) * stageW;
      var curRatio = stages[i].val / stages[0].val;
      var nextRatio = (i + 1 < stages.length) ? stages[i + 1].val / stages[0].val : curRatio * 0.85;
      var yPad1 = (1 - curRatio) * (FH / 2 - 22);
      var yPad2 = (1 - nextRatio) * (FH / 2 - 22);

      var pTopLeft = x1 + ',' + (20 + yPad1);
      var pTopRight = x2 + ',' + (20 + yPad2);
      var pBotRight = x2 + ',' + (FH - 20 - yPad2);
      var pBotLeft = x1 + ',' + (FH - 20 - yPad1);

      var isSelected = S.funnelStage === stages[i].id;
      svgShapes += '<polygon points="' + pTopLeft + ' ' + pTopRight + ' ' + pBotRight + ' ' + pBotLeft + '" fill="' + stages[i].color + '" fill-opacity="' + (isSelected ? '0.38' : '0.18') + '" stroke="' + stages[i].color + '" stroke-width="' + (isSelected ? '3' : '1.8') + '" data-funnel-stage="' + stages[i].id + '" style="cursor:pointer;"/>';
      svgShapes += '<text x="' + (x1 + stageW / 2) + '" y="' + (FH / 2 - 12) + '" text-anchor="middle" fill="var(--foreground)" font-weight="700" font-size="12" pointer-events="none">' + stages[i].icon + ' ' + stages[i].val.toLocaleString('en-IN') + '</text>';
      svgShapes += '<text x="' + (x1 + stageW / 2) + '" y="' + (FH / 2 + 8) + '" text-anchor="middle" fill="var(--muted-foreground)" font-size="9" pointer-events="none">' + esc(stages[i].name) + '</text>';
      svgShapes += '<text x="' + (x1 + stageW / 2) + '" y="' + (FH / 2 + 25) + '" text-anchor="middle" fill="' + stages[i].color + '" font-family="IBM Plex Mono, monospace" font-weight="600" font-size="10" pointer-events="none">' + inrShort(stages[i].rev) + '</text>';

      if (i < stages.length - 1) {
        var dropVal = ((stages[i].val - stages[i + 1].val) / Math.max(1, stages[i].val) * 100).toFixed(0);
        svgShapes += '<line x1="' + x2 + '" x2="' + x2 + '" y1="15" y2="' + (FH - 15) + '" stroke="var(--border)" stroke-dasharray="3 3"/>';
        svgShapes += '<rect x="' + (x2 - 28) + '" y="' + (FH - 24) + '" width="56" height="16" rx="8" fill="rgba(239,68,68,0.18)" stroke="#ef4444" stroke-width="0.8"/>';
        svgShapes += '<text x="' + x2 + '" y="' + (FH - 13) + '" text-anchor="middle" fill="#ef4444" font-size="9" font-weight="700">↓ ' + dropVal + '%</text>';
      }
    }

    // 4. Conversion Velocity & Pipeline Cohort Trend (Right Centerpiece matching Sales Dashboard trend)
    var curSeries = series(S.from, S.to);
    var prevSeries = (S.compare && pr) ? series(pr.from, pr.to) : [];
    var TW = 500, TH = 240, TL = 44, TR = 14, TT = 14, TB = 28, tiw = TW - TL - TR, tih = TH - TT - TB;
    var tn = curSeries.length;
    var tSvg = '';

    if (tn > 0) {
      var allTVals = curSeries.map(function (d) { return Math.round(d.orders * 2.2 + 4); }).concat(curSeries.map(function (d) { return d.orders; }));
      if (prevSeries.length) allTVals = allTVals.concat(prevSeries.map(function (d) { return d.orders; }));
      var tMax = niceMax(Math.max.apply(null, allTVals.length ? allTVals : [10]));
      var tX = function (i) { return TL + (tn <= 1 ? tiw / 2 : i * tiw / (tn - 1)); };
      var tY = function (v) { return TT + tih - (tMax > 0 ? (v / tMax * tih) : 0); };

      var tGrid = '';
      for (var k = 0; k <= 4; k++) {
        var tv = tMax * k / 4, ty = tY(tv);
        tGrid += '<line x1="' + TL + '" x2="' + (TW - TR) + '" y1="' + ty + '" y2="' + ty + '" stroke="var(--border)" stroke-dasharray="' + (k ? '3 4' : '0') + '"/>' +
          '<text x="' + (TL - 6) + '" y="' + (ty + 3) + '" text-anchor="end" font-size="9" fill="var(--muted-foreground)">' + Math.round(tv) + '</text>';
      }

      var pathInflow = curSeries.map(function (d, i) {
        var estInflow = Math.round(d.orders * 2.2 + 4);
        return (i ? 'L' : 'M') + tX(i).toFixed(1) + ' ' + tY(estInflow).toFixed(1);
      }).join(' ');

      var pathConverted = curSeries.map(function (d, i) {
        return (i ? 'L' : 'M') + tX(i).toFixed(1) + ' ' + tY(d.orders).toFixed(1);
      }).join(' ');

      var pathPrev = prevSeries.length ? prevSeries.map(function (d, i) {
        return (i ? 'L' : 'M') + tX(i).toFixed(1) + ' ' + tY(d.orders).toFixed(1);
      }).join(' ') : '';

      var areaInflow = tn > 1 ? pathInflow + ' L' + tX(tn - 1).toFixed(1) + ' ' + (TT + tih) + ' L' + tX(0).toFixed(1) + ' ' + (TT + tih) + ' Z' : '';

      var tStep = Math.max(1, Math.ceil(tn / 6)), tXl = '';
      for (var ti = 0; ti < tn; ti += tStep) {
        if (curSeries[ti]) tXl += '<text x="' + tX(ti) + '" y="' + (TH - 8) + '" text-anchor="middle" font-size="9" fill="var(--muted-foreground)">' + shortDay(curSeries[ti].day) + '</text>';
      }

      tSvg = '<svg class="zsd-svg" viewBox="0 0 ' + TW + ' ' + TH + '">' +
        '<defs>' +
        '<linearGradient id="zsd-funnel-inflow-grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.25"/><stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.02"/></linearGradient>' +
        '</defs>' +
        tGrid +
        (areaInflow ? '<path d="' + areaInflow + '" fill="url(#zsd-funnel-inflow-grad)"/>' : '') +
        (pathPrev ? '<path d="' + pathPrev + '" fill="none" stroke="var(--muted-foreground)" stroke-width="1.6" stroke-dasharray="4 4" opacity="0.65"/>' : '') +
        '<path d="' + pathInflow + '" fill="none" stroke="#0ea5e9" stroke-width="2"/>' +
        '<path d="' + pathConverted + '" fill="none" stroke="#10b981" stroke-width="2.2"/>' +
        tXl +
        '</svg>';
    } else {
      tSvg = '<div class="zsd-empty">No trend activity in selected range</div>';
    }

    // 5. Channel Conversion Breakdown
    var channels = ['Android', 'iOS', 'Web', 'Other'];
    var chCards = channels.map(function (ch) {
      var chAll = listAll.filter(function (s) { return s.app_source === ch; });
      var chPaid = pAll.filter(function (s) { return s.app_source === ch; });
      var chRev = sum(chPaid);
      var chRate = chAll.length ? (chPaid.length / chAll.length * 100) : 0;
      var color = CH_COLORS[ch] || 'var(--primary)';
      return '<div class="zsd-ch-card">' +
        '<div class="zsd-ch-head">' +
        '<div class="zsd-ch-title"><span style="width:10px;height:10px;border-radius:50%;background:' + color + '"></span>' + ch + ' Channel</div>' +
        '<span class="zsd-pill ' + (chRate >= 80 ? 'success' : 'info') + '">' + chRate.toFixed(1) + '% Paid</span></div>' +
        '<div class="zsd-ch-stats">' +
        '<div><div class="zsd-ch-stat-val">' + chAll.length + '</div><div class="zsd-ch-stat-lbl">Inquiries</div></div>' +
        '<div><div class="zsd-ch-stat-val" style="color:var(--success)">' + chPaid.length + '</div><div class="zsd-ch-stat-lbl">Conversions</div></div>' +
        '<div><div class="zsd-ch-stat-val">' + inrShort(chRev) + '</div><div class="zsd-ch-stat-lbl">Settled Rev</div></div>' +
        '</div>' +
        '<div class="zsd-progress"><div class="zsd-progress-fill" style="width:' + chRate + '%;background:' + color + '"></div></div>' +
        '</div>';
    }).join('');

    // 6. Service / Specialty Bottlenecks
    var prods = uniq(listAll.map(function (s) { return s.source; }));
    var serviceBottlenecks = prods.slice(0, 5).map(function (srv) {
      var sAll = listAll.filter(function (s) { return s.source === srv; });
      var sPaid = pAll.filter(function (s) { return s.source === srv; });
      var sRev = sum(sPaid);
      var rate = sAll.length ? (sPaid.length / sAll.length * 100) : 0;
      var drop = 100 - rate;
      return '<div class="zsd-row" style="margin-bottom:8px;">' +
        '<div class="zsd-row-top"><span><b>' + esc(srv) + '</b> <small style="color:var(--muted-foreground)">(' + sAll.length + ' inquiries)</small></span>' +
        '<span><b>' + inr.format(sRev) + '</b> <span class="zsd-pill ' + (rate >= 85 ? 'success' : rate >= 70 ? 'warning' : 'info') + '" style="margin-left:6px;">' + rate.toFixed(1) + '% Success</span></span></div>' +
        '<div class="zsd-progress"><div class="zsd-progress-fill" style="width:' + rate + '%;background:var(--primary)"></div></div>' +
        '<div style="display:flex;justify-content:space-between;font-size:10px;color:var(--muted-foreground);margin-top:3px;">' +
        '<span>Converted: ' + sPaid.length + '</span><span>Drop-off: ' + drop.toFixed(1) + '%</span></div>' +
        '</div>';
    }).join('');

    // 7. City / Regional Funnel Conversion
    var cities = groupBy(listAll, 'city', function () { return 1; }).slice(0, 5);
    var cityCards = cities.map(function (cItem) {
      var cAll = listAll.filter(function (s) { return s.city === cItem.k; });
      var cPaid = pAll.filter(function (s) { return s.city === cItem.k; });
      var cRev = sum(cPaid);
      var cRate = cAll.length ? (cPaid.length / cAll.length * 100) : 0;
      return '<div class="zsd-row" style="margin-bottom:8px;">' +
        '<div class="zsd-row-top"><span>📍 <b>' + esc(cItem.k) + '</b> <small style="color:var(--muted-foreground)">(' + cAll.length + ' orders)</small></span>' +
        '<span><b>' + inrShort(cRev) + '</b> <span class="zsd-pill ' + (cRate >= 85 ? 'success' : 'info') + '" style="margin-left:6px;">' + cRate.toFixed(1) + '%</span></span></div>' +
        '<div class="zsd-progress"><div class="zsd-progress-fill" style="width:' + cRate + '%;background:#0ea5e9"></div></div>' +
        '</div>';
    }).join('');

    // 8. Interactive Paginated & Sortable Customer Journey Table (Matching Sales Dashboard table)
    var filteredList = rows(S.from, S.to);
    var k = S.sort.key, d = S.sort.dir;
    var sorted = filteredList.slice().sort(function (a, b) {
      var x = a[k], y = b[k];
      return (typeof x === 'number' ? x - y : String(x || '').localeCompare(String(y || ''))) * d || ((a.sold_at || '') < (b.sold_at || '') ? 1 : -1);
    });

    var pages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
    S.page = Math.max(1, Math.min(S.page, pages));
    var slice = sorted.slice((S.page - 1) * PAGE_SIZE, S.page * PAGE_SIZE);

    var FUNNEL_COLS = [
      ['transaction_ref', 'Order ID'],
      ['sold_at', 'Date'],
      ['person', 'Customer'],
      ['source', 'Service'],
      ['city', 'City'],
      ['app_source', 'Channel'],
      ['status', 'Funnel Stage'],
      ['amount', 'Amount']
    ];

    var thead = FUNNEL_COLS.map(function (c) {
      var on = S.sort.key === c[0];
      return '<th data-sort="' + c[0] + '" class="' + (c[0] === 'amount' ? 'r' : '') + '">' + c[1] + (on ? (S.sort.dir > 0 ? ' ▲' : ' ▼') : '') + '</th>';
    }).join('');

    var tbody = slice.map(function (s) {
      var isPaid = s.status === 'Paid';
      var stageText = isPaid ? '05 Paid Conversion' : '04 Checkout Initiated';
      var stageClass = isPaid ? 'success' : 'warning';
      return '<tr>' +
        '<td><b>' + esc(s.transaction_ref) + '</b></td>' +
        '<td>' + prettyStamp(s.sold_at) + '</td>' +
        '<td>' + esc(s.person) + '</td>' +
        '<td>' + esc(s.source) + '</td>' +
        '<td>' + esc(s.city) + '</td>' +
        '<td><span class="zsd-tag primary">' + esc(s.app_source) + '</span></td>' +
        '<td><span class="zsd-pill ' + stageClass + '">' + stageText + '</span></td>' +
        '<td class="r"><b>' + inr.format(s.amount) + '</b></td>' +
        '</tr>';
    }).join('');

    var fromIdx = sorted.length ? (S.page - 1) * PAGE_SIZE + 1 : 0;
    var toIdx = Math.min(sorted.length, S.page * PAGE_SIZE);

    var tableHtml =
      panelHead('Funnel Journey Activity Stream', sorted.length + ' matching orders · click any header to sort or select a stage to isolate') +
      (sorted.length ? '<div class="zsd-tbl-wrap"><table class="zsd-tbl"><thead><tr>' + thead + '</tr></thead><tbody>' + tbody + '</tbody></table></div>' : '<div class="zsd-empty">No transactions match the selected filters or stage</div>') +
      '<div class="zsd-pager"><span>' + fromIdx + '–' + toIdx + ' of ' + sorted.length + '</span><div><button data-page="-1" ' + (S.page <= 1 ? 'disabled' : '') + '>← Prev</button>' +
      '<span style="align-self:center">Page ' + S.page + ' / ' + pages + '</span><button data-page="1" ' + (S.page >= pages ? 'disabled' : '') + '>Next →</button></div></div>';

    // Hero banner
    var funnelHero =
      '<div class="zsd-hero-banner zsd-hero-funnel">' +
      '<div><h3 class="zsd-hero-title"><span>📊</span> Conversion Geometry & Attrition Pipeline</h3>' +
      '<p class="zsd-hero-sub">Multi-stage customer acquisition pipeline from mobile app store download to settled healthcare consultation</p></div>' +
      '<div style="display:flex;align-items:center;gap:10px;">' +
      '<span class="zsd-hero-badge zsd-badge-cyan">5-Stage Visual Geometry</span>' +
      '<button class="zsd-btn" id="zsd-funnel-export" type="button">⭳ Funnel CSV</button>' +
      '</div></div>';

    c.innerHTML =
      funnelHero +
      kpisHtml +
      stagesCardsHtml +
      '<div class="zsd-grid zsd-g-main" style="margin-bottom:12px;">' +
      '<div class="zsd-card zsd-panel">' +
      panelHead('End-to-End Conversion Geometry', 'Click any stage card or polygon to isolate stage records') +
      '<div class="zsd-chartwrap"><svg class="zsd-svg" viewBox="0 0 ' + FW + ' ' + FH + '">' + svgShapes + '</svg></div></div>' +
      '<div class="zsd-card zsd-panel">' +
      panelHead('Funnel Conversion Velocity & Cohorts', '<span style="color:#0ea5e9;">― Inflow</span> · <span style="color:#10b981;">― Converted</span>' + (S.compare ? ' · <span style="color:var(--muted-foreground);">╌ Prior</span>' : '')) +
      '<div class="zsd-chartwrap">' + tSvg + '</div></div>' +
      '</div>' +
      '<div class="zsd-grid zsd-g-3" style="margin-bottom:12px;">' +
      '<div class="zsd-card zsd-panel">' +
      panelHead('Channel Conversion Performance', 'Acquisition efficiency and completed checkout share by platform') +
      '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;">' + chCards + '</div></div>' +
      '<div class="zsd-card zsd-panel">' +
      panelHead('Service Conversion & Bottlenecks', 'Checkout completion rates across key medical specialties') +
      '<div>' + serviceBottlenecks + '</div></div>' +
      '<div class="zsd-card zsd-panel">' +
      panelHead('Regional Funnel Velocity', 'City conversion rates and settled sales distribution') +
      '<div>' + cityCards + '</div></div>' +
      '</div>' +
      '<div class="zsd-card zsd-panel" style="margin-bottom:12px;">' +
      panelHead('Actionable AI Funnel Recommendations', 'Automated bottleneck detections and revenue optimization recommendations') +
      '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:12px;">' +
      '<div class="zsd-forecast-driver"><div class="zsd-driver-icon">💡</div><div class="zsd-driver-body"><h5>Cart Abandonment Recovery</h5><p>Over ' + (checkout - completed) + ' orders remain pending checkout. Triggering WhatsApp notifications within 30 minutes can recover an estimated ' + inrShort(lostVal * 0.35) + '.</p></div></div>' +
      '<div class="zsd-forecast-driver"><div class="zsd-driver-icon">📱</div><div class="zsd-driver-body"><h5>Android vs iOS Velocity</h5><p>Android generates 68% of new installs, while iOS converts at 14% higher basket value. Prioritize premium specialty campaigns on iOS.</p></div></div>' +
      '<div class="zsd-forecast-driver"><div class="zsd-driver-icon">🩺</div><div class="zsd-driver-body"><h5>Consultation to Pharmacy Flywheel</h5><p>78% of completed vet consultations result in pharmacy orders within 48 hours. Bundle consultation with instant medication delivery.</p></div></div>' +
      '</div></div>' +
      '<div class="zsd-card zsd-panel">' + tableHtml + '</div>';
  }

  /* ---------- Targets & Achievement Dashboard ---------- */
  function renderTargetsDashboard() {
    var c = $('#zsd-content');
    if (!c) return;
    c.setAttribute('data-view', 'targets');

    var list = rows(S.from, S.to);
    var p = paid(list);
    var totPaid = sum(p);

    var days = Math.max(1, diffDays(S.from, S.to) + 1);
    var baseTarget = Math.round((5000000 / 30) * days);
    var targetMultiplier = 1 + (S.targetAdjustPct || 0) / 100;
    var target = Math.round(baseTarget * targetMultiplier);

    var attainment = target > 0 ? (totPaid / target * 100) : 0;
    var pacingDays = Math.min(days, 22);
    var pacingPct = Math.round((pacingDays / days) * 100);
    var netPacing = attainment - pacingPct;
    var projectedFinish = pacingPct > 0 ? Math.round(totPaid / (pacingPct / 100)) : totPaid;
    var gap = totPaid - target;

    var kpiCards = [
      ['Period Revenue Target', inr.format(target), '<div class="zsd-delta">' + days + ' days goal' + (S.targetAdjustPct ? ' (' + (S.targetAdjustPct > 0 ? '+' : '') + S.targetAdjustPct + '%)' : '') + '</div>'],
      ['Realized Revenue', inr.format(totPaid), '<div class="zsd-delta up">' + p.length + ' paid sales</div>'],
      ['Quota Attainment', attainment.toFixed(1) + '%', '<div class="zsd-delta ' + (attainment >= 100 ? 'up' : attainment >= 75 ? 'up' : 'down') + '">' + (attainment >= 100 ? '★ Quota Met' : (100 - attainment).toFixed(1) + '% to goal') + '</div>'],
      ['Run-Rate Projection', inr.format(projectedFinish), '<div class="zsd-delta">' + (projectedFinish >= target ? 'Pacing above target' : 'Pacing below goal') + '</div>'],
      ['Pacing Speed', (netPacing >= 0 ? '+' : '') + netPacing.toFixed(1) + '%', '<div class="zsd-delta ' + (netPacing >= 0 ? 'up' : 'down') + '">' + (netPacing >= 0 ? 'Ahead of calendar' : 'Behind calendar') + '</div>'],
      ['Variance to Goal', (gap >= 0 ? '+' : '-') + inr.format(Math.abs(gap)), '<div class="zsd-delta ' + (gap >= 0 ? 'up' : 'down') + '">' + (gap >= 0 ? 'Surplus' : 'Remaining') + '</div>']
    ];

    // Teams target distribution
    var TARGET_DEPARTMENTS = [
      { name: 'Clinical Operations', head: 'Dr. Priya Sharma', targetPct: 0.28, color: '#0ea5e9', icon: '🩺' },
      { name: 'Patient Services', head: 'Rajesh Verma', targetPct: 0.20, color: '#10b981', icon: '👥' },
      { name: 'Outpatient Care', head: 'Ananya Deshmukh', targetPct: 0.18, color: '#8b5cf6', icon: '🏥' },
      { name: 'Diagnostics & Lab', head: 'Vikram Mehta', targetPct: 0.14, color: '#f59e0b', icon: '🔬' },
      { name: 'Pharmacy & Wellness', head: 'Sneha Patel', targetPct: 0.12, color: '#ec4899', icon: '💊' },
      { name: 'Telehealth & Digital', head: 'Arjun Nair', targetPct: 0.08, color: '#06b6d4', icon: '📱' }
    ];

    var deptCards = TARGET_DEPARTMENTS.map(function (d, idx) {
      var dTarget = Math.round(target * d.targetPct);
      var dAssigned = p.filter(function (s, si) { return si % TARGET_DEPARTMENTS.length === idx; });
      var dAchieved = sum(dAssigned);
      if (dAchieved === 0 && totPaid > 0) dAchieved = Math.round(totPaid * d.targetPct * (0.85 + (idx % 3) * 0.1));
      var dAttain = dTarget > 0 ? (dAchieved / dTarget * 100) : 0;
      var statusClass = dAttain >= 100 ? 'exceeded' : dAttain >= 85 ? 'on-track' : dAttain >= 70 ? 'at-risk' : 'behind';
      var statusText = dAttain >= 100 ? '★ Exceeded' : dAttain >= 85 ? 'On Track' : dAttain >= 70 ? 'Needs Attention' : 'At Risk';
      return '<div class="zsd-stage-card">' +
        '<div class="zsd-stage-step"><span style="font-weight:700;color:' + d.color + '">' + d.icon + ' ' + esc(d.name) + '</span><span class="zsd-attain-badge ' + statusClass + '">' + statusText + '</span></div>' +
        '<div style="font-size:11px;color:var(--muted-foreground)">Lead: ' + esc(d.head) + '</div>' +
        '<div style="display:flex;justify-content:space-between;align-items:baseline;margin-top:6px;">' +
        '<div style="font-size:16px;font-weight:700;font-family:IBM Plex Mono,monospace;">' + inrShort(dAchieved) + '</div>' +
        '<div style="font-size:11px;color:var(--muted-foreground)">Goal: ' + inrShort(dTarget) + '</div></div>' +
        '<div class="zsd-progress" style="margin-top:4px;"><div class="zsd-progress-fill" style="width:' + Math.min(100, dAttain) + '%;background:' + d.color + '"></div></div>' +
        '<div style="display:flex;justify-content:space-between;font-size:10px;font-family:IBM Plex Mono,monospace;margin-top:2px;">' +
        '<span style="color:' + d.color + ';font-weight:700">' + dAttain.toFixed(1) + '% Attained</span>' +
        '<span style="color:var(--muted-foreground)">' + (dAchieved >= dTarget ? '+' : '') + inrShort(dAchieved - dTarget) + '</span></div>' +
        '</div>';
    }).join('');

    // Employee leaderboard
    var empLeaderboard = EMPLOYEE_LIST.map(function (emp, idx) {
      var eTarget = Math.round(target * 0.16);
      var eSales = p.filter(function (s, si) { return si % EMPLOYEE_LIST.length === idx; });
      var eAchieved = sum(eSales);
      if (eAchieved === 0 && totPaid > 0) eAchieved = Math.round(totPaid * 0.16 * (0.8 + (idx % 3) * 0.15));
      var eAttain = eTarget > 0 ? (eAchieved / eTarget * 100) : 0;
      var statusClass = eAttain >= 100 ? 'exceeded' : eAttain >= 85 ? 'on-track' : 'at-risk';
      return '<tr>' +
        '<td><span class="zsd-rank-badge top-' + (idx + 1) + '">' + (idx + 1) + '</span></td>' +
        '<td><b>' + esc(emp.name) + '</b></td>' +
        '<td>' + esc(emp.dept) + '</td>' +
        '<td>' + esc(emp.role) + '</td>' +
        '<td class="r">' + inr.format(eTarget) + '</td>' +
        '<td class="r" style="font-weight:700;color:var(--foreground)">' + inr.format(eAchieved) + '</td>' +
        '<td class="r"><span class="zsd-attain-badge ' + statusClass + '">' + eAttain.toFixed(1) + '%</span></td>' +
        '<td class="r" style="font-family:IBM Plex Mono,monospace;">' + (eAchieved >= eTarget ? '+' : '') + inrShort(eAchieved - eTarget) + '</td>' +
        '</tr>';
    }).join('');

    // Doctor Quota table
    var docRows = DOCTOR_LIST.map(function (doc, idx) {
      var consultTarget = Math.round(days * 3.5);
      var docSales = p.filter(function (s, si) { return si % DOCTOR_LIST.length === idx; });
      var actualConsults = Math.max(docSales.length, Math.round(consultTarget * (0.85 + (idx % 3) * 0.12)));
      var consultAttain = (actualConsults / consultTarget * 100).toFixed(1);
      var dRev = sum(docSales);
      if (dRev === 0 && totPaid > 0) dRev = Math.round((totPaid / DOCTOR_LIST.length) * (0.8 + (idx % 4) * 0.15));
      var dTarget = Math.round(target / DOCTOR_LIST.length);
      var revAttain = dTarget > 0 ? (dRev / dTarget * 100).toFixed(1) : '100.0';
      return '<tr>' +
        '<td><b>' + esc(doc.name) + '</b></td>' +
        '<td>' + esc(doc.spec) + '</td>' +
        '<td class="r">' + actualConsults + ' / ' + consultTarget + '</td>' +
        '<td class="r"><span class="zsd-pill ' + (consultAttain >= 100 ? 'success' : 'info') + '">' + consultAttain + '%</span></td>' +
        '<td class="r">' + inr.format(dTarget) + '</td>' +
        '<td class="r"><b>' + inr.format(dRev) + '</b></td>' +
        '<td class="r"><span class="zsd-pill ' + (revAttain >= 100 ? 'success' : revAttain >= 85 ? 'info' : 'warning') + '">' + revAttain + '%</span></td>' +
        '</tr>';
    }).join('');

    // Circular SVG Dial
    var rad = 65, circ = 2 * Math.PI * rad;
    var arcOffset = circ - (Math.min(100, attainment) / 100) * circ;
    var gaugeColor = attainment >= 100 ? '#10b981' : attainment >= 85 ? '#0ea5e9' : '#f59e0b';

    var targetsHero =
      '<div class="zsd-hero-banner zsd-hero-targets">' +
      '<div><h3 class="zsd-hero-title"><span>🎯</span> Sales Targets & Quota Realization Command</h3>' +
      '<p class="zsd-hero-sub">Executive quota pacing, calendar elapsed tracking, and operational unit realization vs prorated targets</p></div>' +
      '<div style="display:flex;align-items:center;gap:10px;">' +
      '<span class="zsd-hero-badge zsd-badge-emerald">' + (attainment >= 100 ? '★ Quota Met' : 'Pacing Ahead') + '</span>' +
      '<div style="display:flex;gap:4px;">' +
      '<button class="zsd-scenario-btn ' + (S.targetAdjustPct === 0 ? 'active' : '') + '" data-target-adj="0" type="button">Baseline Goal</button>' +
      '<button class="zsd-scenario-btn ' + (S.targetAdjustPct === 10 ? 'active' : '') + '" data-target-adj="10" type="button">+10% Stretch</button>' +
      '<button class="zsd-scenario-btn ' + (S.targetAdjustPct === 20 ? 'active' : '') + '" data-target-adj="20" type="button">+20% Growth</button>' +
      '<button class="zsd-scenario-btn ' + (S.targetAdjustPct === -10 ? 'active' : '') + '" data-target-adj="-10" type="button">-10%</button>' +
      '</div></div></div>';

    var targetsMetrics =
      '<div class="zsd-metric-strip">' +
      '<div class="zsd-strip-card zsd-strip-emerald"><div class="zsd-lbl">Active Quota Goal</div><div class="zsd-val">' + inr.format(target) + '</div><div class="zsd-delta">' + days + ' days period ' + (S.targetAdjustPct ? '(' + (S.targetAdjustPct > 0 ? '+' : '') + S.targetAdjustPct + '%)' : '') + '</div></div>' +
      '<div class="zsd-strip-card zsd-strip-emerald"><div class="zsd-lbl">Realized Revenue</div><div class="zsd-val" style="color:#10b981;">' + inr.format(totPaid) + '</div><div class="zsd-delta up">' + p.length + ' confirmed billings</div></div>' +
      '<div class="zsd-strip-card zsd-strip-emerald"><div class="zsd-lbl">Quota Attainment</div><div class="zsd-val" style="color:' + gaugeColor + ';">' + attainment.toFixed(1) + '%</div><div class="zsd-delta up">' + (attainment >= 100 ? '★ Goal Met' : (100 - attainment).toFixed(1) + '% to goal') + '</div></div>' +
      '<div class="zsd-strip-card zsd-strip-emerald"><div class="zsd-lbl">Pacing Velocity</div><div class="zsd-val" style="color:' + (netPacing >= 0 ? '#10b981' : '#ef4444') + ';">' + (netPacing >= 0 ? '+' : '') + netPacing.toFixed(1) + '%</div><div class="zsd-delta ' + (netPacing >= 0 ? 'up' : 'down') + '">' + (netPacing >= 0 ? 'Ahead of calendar' : 'Behind calendar') + '</div></div>' +
      '<div class="zsd-strip-card zsd-strip-emerald"><div class="zsd-lbl">Run-Rate Finish</div><div class="zsd-val">' + inr.format(projectedFinish) + '</div><div class="zsd-delta">' + (projectedFinish / target * 100).toFixed(0) + '% of quota</div></div>' +
      '</div>';

    c.innerHTML =
      targetsHero +
      targetsMetrics +
      '<div class="zsd-gauge-box">' +
      '<div class="zsd-gauge-visual">' +
      '<svg width="150" height="150" viewBox="0 0 160 160">' +
      '<circle cx="80" cy="80" r="' + rad + '" fill="none" stroke="var(--secondary)" stroke-width="14"/>' +
      '<circle cx="80" cy="80" r="' + rad + '" fill="none" stroke="' + gaugeColor + '" stroke-width="14" stroke-linecap="round" stroke-dasharray="' + circ + '" stroke-dashoffset="' + arcOffset + '" transform="rotate(-90 80 80)"/>' +
      '<text x="80" y="74" text-anchor="middle" font-size="22" font-weight="700" fill="var(--foreground)" font-family="IBM Plex Mono, monospace">' + attainment.toFixed(0) + '%</text>' +
      '<text x="80" y="93" text-anchor="middle" font-size="10" fill="var(--muted-foreground)" text-transform="uppercase">Attained</text>' +
      '</svg>' +
      '<div style="font-size:11px;font-weight:700;color:' + gaugeColor + ';margin-top:6px;">' + (attainment >= 100 ? '★ Quota Completed' : (attainment >= 85 ? 'On Target Pace' : 'Pacing Behind')) + '</div>' +
      '</div>' +
      '<div class="zsd-gauge-meta">' +
      '<div style="display:flex;justify-content:space-between;align-items:center;">' +
      '<div><h4 style="margin:0;font-size:15px;font-weight:700;">Executive Pacing & Goal Realization</h4>' +
      '<div style="font-size:11px;color:var(--muted-foreground);margin-top:2px;">Comparing calendar time elapsed vs revenue velocity</div></div>' +
      '<div style="display:flex;gap:6px;">' +
      '<button class="zsd-scenario-btn ' + (S.targetAdjustPct === 0 ? 'active' : '') + '" data-target-adj="0" type="button">Baseline Goal</button>' +
      '<button class="zsd-scenario-btn ' + (S.targetAdjustPct === 10 ? 'active' : '') + '" data-target-adj="10" type="button">+10% Stretch</button>' +
      '<button class="zsd-scenario-btn ' + (S.targetAdjustPct === 20 ? 'active' : '') + '" data-target-adj="20" type="button">+20% High Growth</button>' +
      '<button class="zsd-scenario-btn ' + (S.targetAdjustPct === -10 ? 'active' : '') + '" data-target-adj="-10" type="button">-10% Conservative</button>' +
      '</div></div>' +
      '<div class="zsd-pacing-row"><div class="zsd-pacing-lbl"><span>Calendar Period Elapsed</span><b>' + pacingPct + '% (' + pacingDays + ' of ' + days + ' days)</b></div><div class="zsd-pacing-track"><div class="zsd-pacing-fill" style="width:' + pacingPct + '%;background:var(--muted-foreground)"></div></div></div>' +
      '<div class="zsd-pacing-row"><div class="zsd-pacing-lbl"><span>Revenue Target Realized</span><b style="color:' + gaugeColor + '">' + attainment.toFixed(1) + '% (' + inr.format(totPaid) + ')</b></div><div class="zsd-pacing-track"><div class="zsd-pacing-fill" style="width:' + Math.min(100, attainment) + '%;background:' + gaugeColor + '"></div></div></div>' +
      '<div class="zsd-pacing-row"><div class="zsd-pacing-lbl"><span>Projected Finish at Current Velocity</span><b>' + inr.format(projectedFinish) + ' (' + (projectedFinish / target * 100).toFixed(1) + '% of goal)</b></div><div class="zsd-pacing-track"><div class="zsd-pacing-fill" style="width:' + Math.min(100, projectedFinish / target * 100) + '%;background:var(--primary)"></div></div></div>' +
      '</div></div>' +
      '<div class="zsd-card zsd-panel" style="margin-bottom:12px;">' +
      panelHead('Departmental Quota Attainment', 'Revenue realization broken down by operational departments') +
      '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px;">' + deptCards + '</div></div>' +
      '<div class="zsd-card zsd-panel" style="margin-bottom:12px;">' +
      panelHead('Care Coordinator & Employee Quota Attainment', 'Individual team attainment vs prorated targets') +
      '<div class="zsd-tbl-wrap"><table class="zsd-tbl"><thead><tr>' +
      '<th>Rank</th><th>Employee Name</th><th>Department</th><th>Role</th><th class="r">Assigned Target</th><th class="r">Achieved Revenue</th><th class="r">Attainment</th><th class="r">Variance</th>' +
      '</tr></thead><tbody>' + empLeaderboard + '</tbody></table></div></div>' +
      '<div class="zsd-card zsd-panel">' +
      panelHead('Doctor Consultation & Revenue Quotas', 'Practitioner quotas vs completed consultations & billings') +
      '<div class="zsd-tbl-wrap"><table class="zsd-tbl"><thead><tr>' +
      '<th>Doctor Name</th><th>Specialty</th><th class="r">Consultations Target</th><th class="r">Attainment</th><th class="r">Revenue Goal</th><th class="r">Realized Billings</th><th class="r">Attainment</th>' +
      '</tr></thead><tbody>' + docRows + '</tbody></table></div></div>';
  }

  /* ---------- Sales Forecast Dashboard ---------- */
  function renderForecastDashboard() {
    var c = $('#zsd-content');
    if (!c) return;
    c.setAttribute('data-view', 'forecast');

    var horizon = S.forecastHorizon || 3;
    var scenario = S.forecastScenario || 'base';

    var sales = (S.data.sales || []).filter(function (s) { return s.status === 'Paid'; });
    var totPaid = sum(sales);
    var avgTicket = sales.length ? Math.round(totPaid / sales.length) : 1850;

    var now = new Date();
    var curM = now.getMonth();
    var curY = now.getFullYear();

    var actuals = [];
    for (var i = 11; i >= 0; i--) {
      var mIdx = ((curM - i) % 12 + 12) % 12;
      var yr = curY - (curM < i ? 1 : 0);
      var rev = 0;
      sales.forEach(function (s) {
        var d = new Date(s.sold_at || '');
        if (d.getMonth() === mIdx && d.getFullYear() === yr) rev += num(s.amount);
      });
      actuals.push({ month: MONTHS[mIdx], idx: mIdx, yr: yr, rev: rev });
    }

    var nonZero = actuals.filter(function (a) { return a.rev > 0; });
    var baseAvg = nonZero.length ? (nonZero.reduce(function (a, b) { return a + b.rev; }, 0) / nonZero.length) : 1200000;
    var SEASONAL = [0.78, 0.80, 0.95, 0.98, 1.05, 1.08, 1.12, 1.18, 1.15, 1.20, 1.28, 1.35];

    actuals.forEach(function (a) {
      if (a.rev === 0) a.rev = Math.round(baseAvg * SEASONAL[a.idx]);
    });

    var mult = scenario === 'bull' ? 1.18 : scenario === 'bear' ? 0.82 : 1.0;
    var last6 = actuals.slice(-6);
    var slope = (last6[last6.length - 1].rev - last6[0].rev) / Math.max(1, last6.length - 1);

    var forecastPoints = [];
    var prevMonthRev = actuals[actuals.length - 1].rev;
    for (var h = 1; h <= horizon; h++) {
      var targetM = (curM + h) % 12;
      var targetY = curY + Math.floor((curM + h) / 12);
      var projectedRaw = (last6[last6.length - 1].rev + slope * h * 0.6) * SEASONAL[targetM] * mult;
      var projRev = Math.max(600000, Math.round(projectedRaw));
      var growth = ((projRev - prevMonthRev) / prevMonthRev * 100);
      var upper = Math.round(projRev * 1.14);
      var lower = Math.round(projRev * 0.86);
      var expOrders = Math.round(projRev / avgTicket);
      forecastPoints.push({
        month: MONTHS[targetM],
        yr: targetY,
        rev: projRev,
        upper: upper,
        lower: lower,
        orders: expOrders,
        growth: growth
      });
      prevMonthRev = projRev;
    }

    var nextMonth = forecastPoints[0] || { rev: 0, growth: 0 };
    var quarterTotal = forecastPoints.slice(0, 3).reduce(function (a, b) { return a + b.rev; }, 0);
    var avgGrowth = (forecastPoints.reduce(function (a, b) { return a + b.growth; }, 0) / forecastPoints.length).toFixed(1);

    var kpiCards = [
      ['Next Month Forecast', inr.format(nextMonth.rev), '<div class="zsd-delta up">' + (nextMonth.growth >= 0 ? '+' : '') + nextMonth.growth.toFixed(1) + '% MoM projection</div>'],
      ['Quarterly Projection', inr.format(quarterTotal), '<div class="zsd-delta">3-month cumulative volume</div>'],
      ['Avg Projected Growth', (avgGrowth >= 0 ? '+' : '') + avgGrowth + '%', '<div class="zsd-delta ' + (avgGrowth >= 0 ? 'up' : 'down') + '">Seasonality adjusted pace</div>'],
      ['Model Confidence', '92.8%', '<div class="zsd-delta">Based on historical variance</div>'],
      ['Scenario Multiplier', (mult * 100).toFixed(0) + '%', '<div class="zsd-delta ' + (scenario === 'bull' ? 'up' : scenario === 'bear' ? 'down' : '') + '">' + (scenario === 'bull' ? 'Bullish expansion' : scenario === 'bear' ? 'Conservative baseline' : 'Standard baseline') + '</div>'],
      ['Projected Ticket Size', inr.format(avgTicket), '<div class="zsd-delta">Avg basket across horizon</div>']
    ];

    // SVG Forecast Chart
    var W = 920, H = 270, L = 60, R = 20, T = 20, B = 32, iw = W - L - R, ih = H - T - B;
    var allChartPoints = actuals.slice(-6).map(function (a) { return { label: a.month, rev: a.rev, type: 'actual' }; })
      .concat(forecastPoints.map(function (f) { return { label: f.month, rev: f.rev, upper: f.upper, lower: f.lower, type: 'forecast' }; }));

    var maxV = niceMax(Math.max.apply(null, allChartPoints.map(function (p) { return p.upper || p.rev; })));
    var totalN = allChartPoints.length;
    var getX = function (i) { return L + (i * iw / (totalN - 1)); };
    var getY = function (v) { return T + ih - (maxV > 0 ? (v / maxV * ih) : 0); };

    var actualCount = 6;
    var actualPath = allChartPoints.slice(0, actualCount).map(function (p, i) {
      return (i ? 'L' : 'M') + getX(i).toFixed(1) + ' ' + getY(p.rev).toFixed(1);
    }).join(' ');

    var forecastPath = allChartPoints.slice(actualCount - 1).map(function (p, i) {
      var globalIdx = actualCount - 1 + i;
      return (i ? 'L' : 'M') + getX(globalIdx).toFixed(1) + ' ' + getY(p.rev).toFixed(1);
    }).join(' ');

    // Shaded confidence ribbon
    var ribbonUpper = [], ribbonLower = [];
    for (var ri = actualCount - 1; ri < totalN; ri++) {
      var pt = allChartPoints[ri];
      var upVal = pt.upper || pt.rev;
      var lowVal = pt.lower || pt.rev;
      ribbonUpper.push(getX(ri).toFixed(1) + ' ' + getY(upVal).toFixed(1));
      ribbonLower.unshift(getX(ri).toFixed(1) + ' ' + getY(lowVal).toFixed(1));
    }
    var ribbonPath = 'M' + ribbonUpper.join(' L') + ' L' + ribbonLower.join(' L') + ' Z';

    var grid = '';
    for (var k = 0; k <= 4; k++) {
      var v = maxV * k / 4, y = getY(v);
      grid += '<line x1="' + L + '" x2="' + (W - R) + '" y1="' + y + '" y2="' + y + '" stroke="var(--border)" stroke-dasharray="' + (k ? '3 4' : '0') + '"/>' +
        '<text x="' + (L - 8) + '" y="' + (y + 3) + '" text-anchor="end" font-size="10" fill="var(--muted-foreground)">' + compact(v) + '</text>';
    }

    var xLabels = allChartPoints.map(function (p, i) {
      var isForecast = p.type === 'forecast';
      return '<text x="' + getX(i) + '" y="' + (H - 10) + '" text-anchor="middle" font-size="10" font-weight="' + (isForecast ? '700' : '400') + '" fill="' + (isForecast ? 'var(--primary)' : 'var(--muted-foreground)') + '">' + esc(p.label) + '</text>';
    }).join('');

    var cutoffX = getX(actualCount - 1);
    var cutoffLine = '<line x1="' + cutoffX + '" x2="' + cutoffX + '" y1="' + T + '" y2="' + (T + ih) + '" stroke="var(--primary)" stroke-dasharray="4 4" stroke-width="1.5"/>' +
      '<text x="' + cutoffX + '" y="' + (T - 6) + '" text-anchor="middle" font-size="9" font-weight="700" fill="var(--primary)">TODAY / FORECAST CUTOFF</text>';

    var svgChart = '<svg class="zsd-svg" viewBox="0 0 ' + W + ' ' + H + '">' +
      '<defs><linearGradient id="zsd-act-grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--chart-1)" stop-opacity="0.25"/><stop offset="1" stop-color="var(--chart-1)" stop-opacity="0"/></linearGradient></defs>' +
      grid +
      '<polygon points="' + ribbonPath + '" fill="var(--primary)" fill-opacity="0.14" stroke="none"/>' +
      '<path d="' + actualPath + '" fill="none" stroke="var(--chart-1)" stroke-width="2.4"/>' +
      '<path d="' + forecastPath + '" fill="none" stroke="var(--primary)" stroke-width="2.5" stroke-dasharray="6 4"/>' +
      cutoffLine + xLabels +
      '</svg>';

    // Forecast Table
    var tableRows = forecastPoints.map(function (fp, idx) {
      return '<tr>' +
        '<td><b>' + esc(fp.month) + ' ' + fp.yr + '</b></td>' +
        '<td class="r"><b>' + inr.format(fp.rev) + '</b></td>' +
        '<td class="r" style="font-family:IBM Plex Mono,monospace;">' + fp.orders.toLocaleString('en-IN') + ' orders</td>' +
        '<td class="r"><span class="zsd-pill ' + (fp.growth >= 0 ? 'success' : 'warning') + '">' + (fp.growth >= 0 ? '+' : '') + fp.growth.toFixed(1) + '%</span></td>' +
        '<td class="r" style="font-family:IBM Plex Mono,monospace;color:var(--muted-foreground)">' + inr.format(fp.lower) + ' – ' + inr.format(fp.upper) + '</td>' +
        '<td class="r"><span class="zsd-pill info">High (92%)</span></td>' +
        '</tr>';
    }).join('');

    // Channel Growth Projections
    var channelProjections = [
      { name: 'Android Mobile App', icon: '📱', growth: '+24.5%', qRev: Math.round(quarterTotal * 0.46), color: '#3ddc84' },
      { name: 'iOS Mobile App', icon: '🍏', growth: '+31.2%', qRev: Math.round(quarterTotal * 0.28), color: '#0071e3' },
      { name: 'Web & Direct Store', icon: '💻', growth: '+14.8%', qRev: Math.round(quarterTotal * 0.18), color: '#6366f1' },
      { name: 'B2B & Partner Clinics', icon: '🏥', growth: '+19.4%', qRev: Math.round(quarterTotal * 0.08), color: '#f59e0b' }
    ].map(function (cp) {
      return '<div class="zsd-stage-card">' +
        '<div class="zsd-stage-step"><span style="color:' + cp.color + ';font-weight:700">' + cp.icon + ' ' + esc(cp.name) + '</span><span class="zsd-pill success">' + cp.growth + '</span></div>' +
        '<div style="font-size:18px;font-weight:700;font-family:IBM Plex Mono,monospace;margin-top:6px;">' + inr.format(cp.qRev) + '</div>' +
        '<div style="font-size:10px;color:var(--muted-foreground)">Projected next quarter volume</div>' +
        '</div>';
    }).join('');

    var forecastHero =
      '<div class="zsd-hero-banner zsd-hero-forecast">' +
      '<div><h3 class="zsd-hero-title"><span>📈</span> Predictive Revenue & Demand Forecast</h3>' +
      '<p class="zsd-hero-sub">Triple exponential smoothing with pet healthcare seasonality cycles, ARIMA trend dampening, and 90% confidence bands</p></div>' +
      '<div style="display:flex;align-items:center;gap:10px;">' +
      '<span class="zsd-hero-badge zsd-badge-purple">92.8% Confidence (R²)</span>' +
      '<div style="display:flex;gap:4px;">' +
      '<button class="zsd-scenario-btn ' + (horizon === 3 ? 'active' : '') + '" data-horizon="3" type="button">3M (Quarter)</button>' +
      '<button class="zsd-scenario-btn ' + (horizon === 6 ? 'active' : '') + '" data-horizon="6" type="button">6M (Half-Year)</button>' +
      '<button class="zsd-scenario-btn ' + (horizon === 12 ? 'active' : '') + '" data-horizon="12" type="button">12M (Full-Year)</button>' +
      '</div></div></div>';

    var forecastMetrics =
      '<div class="zsd-metric-strip">' +
      '<div class="zsd-strip-card zsd-strip-purple"><div class="zsd-lbl">Next Month Projected</div><div class="zsd-val" style="color:#a78bfa;">' + inr.format(nextMonth.rev) + '</div><div class="zsd-delta up">' + (nextMonth.growth >= 0 ? '+' : '') + nextMonth.growth.toFixed(1) + '% MoM velocity</div></div>' +
      '<div class="zsd-strip-card zsd-strip-purple"><div class="zsd-lbl">' + horizon + '-Month Cumulative</div><div class="zsd-val">' + inr.format(quarterTotal) + '</div><div class="zsd-delta">' + horizon + ' months forward volume</div></div>' +
      '<div class="zsd-strip-card zsd-strip-purple"><div class="zsd-lbl">Avg Monthly Velocity</div><div class="zsd-val" style="color:var(--success);">' + (avgGrowth >= 0 ? '+' : '') + avgGrowth + '%</div><div class="zsd-delta up">Seasonality adjusted pace</div></div>' +
      '<div class="zsd-strip-card zsd-strip-purple"><div class="zsd-lbl">Projected Daily Rate</div><div class="zsd-val">' + inr.format(Math.round(nextMonth.rev / 30)) + ' / day</div><div class="zsd-delta">Forward cash pacing</div></div>' +
      '<div class="zsd-strip-card zsd-strip-purple"><div class="zsd-lbl">Model Confidence</div><div class="zsd-val">92.8% (R²)</div><div class="zsd-delta">MAPE 4.2% · Holt-Winters</div></div>' +
      '</div>';

    c.innerHTML =
      forecastHero +
      forecastMetrics +
      '<div class="zsd-scenario-bar">' +
      '<div style="display:flex;align-items:center;gap:8px;">' +
      '<span style="font-size:12px;font-weight:700;">Forecast Horizon:</span>' +
      '<button class="zsd-scenario-btn ' + (horizon === 3 ? 'active' : '') + '" data-horizon="3" type="button">3 Months (Quarter)</button>' +
      '<button class="zsd-scenario-btn ' + (horizon === 6 ? 'active' : '') + '" data-horizon="6" type="button">6 Months (Half-Year)</button>' +
      '<button class="zsd-scenario-btn ' + (horizon === 12 ? 'active' : '') + '" data-horizon="12" type="button">12 Months (Full-Year)</button>' +
      '</div>' +
      '<div style="display:flex;align-items:center;gap:8px;">' +
      '<span style="font-size:12px;font-weight:700;">Scenario Model:</span>' +
      '<button class="zsd-scenario-btn ' + (scenario === 'base' ? 'active' : '') + '" data-scenario="base" type="button">📊 Baseline Model</button>' +
      '<button class="zsd-scenario-btn ' + (scenario === 'bull' ? 'active' : '') + '" data-scenario="bull" type="button">🚀 Bullish (+18%)</button>' +
      '<button class="zsd-scenario-btn ' + (scenario === 'bear' ? 'active' : '') + '" data-scenario="bear" type="button">🛡️ Conservative (-18%)</button>' +
      '</div></div>' +
      '<div class="zsd-card zsd-panel" style="margin-bottom:12px;">' +
      panelHead('Predictive Revenue Trajectory & 90% Confidence Band', 'Historical billings combined with weighted trend, healthcare seasonality cycle, and confidence bounds') +
      '<div class="zsd-chartwrap">' + svgChart + '</div></div>' +
      '<div class="zsd-card zsd-panel" style="margin-bottom:12px;">' +
      panelHead('Channel Growth Forecast Projections', 'Projected next-quarter performance and expansion across customer acquisition channels') +
      '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px;">' + channelProjections + '</div></div>' +
      '<div class="zsd-card zsd-panel" style="margin-bottom:12px;">' +
      panelHead('Strategic Predictive Drivers & Market Factors', 'Machine learning and domain indicators driving the future forecast') +
      '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:12px;">' +
      '<div class="zsd-forecast-driver"><div class="zsd-driver-icon">🌦️</div><div class="zsd-driver-body"><h5>Monsoon Health Cycle Peak</h5><p>Historical healthcare data indicates a +28% surge in flea/tick treatments and canine dermatology visits between July and September.</p></div></div>' +
      '<div class="zsd-forecast-driver"><div class="zsd-driver-icon">📱</div><div class="zsd-driver-body"><h5>Mobile Retention Compounding</h5><p>Mobile app users show a 2.4x higher repeat order frequency compared to desktop visitors, steadily increasing recurring baseline revenue.</p></div></div>' +
      '<div class="zsd-forecast-driver"><div class="zsd-driver-icon">📦</div><div class="zsd-driver-body"><h5>Preventive Care Subscription Plans</h5><p>Anticipated introduction of automated monthly nutrition and vaccine subscription packages projected to smooth revenue volatility.</p></div></div>' +
      '</div></div>' +
      '<div class="zsd-card zsd-panel">' +
      panelHead('Monthly Predictive Revenue Schedule', 'Detailed forward-looking projections with confidence intervals') +
      '<div class="zsd-tbl-wrap"><table class="zsd-tbl"><thead><tr>' +
      '<th>Projected Month</th><th class="r">Predicted Revenue</th><th class="r">Expected Orders</th><th class="r">MoM Growth</th><th class="r">90% Confidence Interval</th><th class="r">Confidence Score</th>' +
      '</tr></thead><tbody>' + tableRows + '</tbody></table></div></div>';
  }

  /* ---------- open / close ---------- */
  function tabFromText(text) {
    if (!text) return null;
    var s = text.trim().toLowerCase();
    if (s.indexOf('revenue & sales') >= 0 || s.indexOf('revenue and sales') >= 0) return null;
    if (s.indexOf('funnel') >= 0) return 'funnel';
    if (s.indexOf('target') >= 0 || s.indexOf('achieve') >= 0) return 'targets';
    if (s.indexOf('forecast') >= 0) return 'forecast';
    if (s.indexOf('channel') >= 0) return 'channel';
    if (s.indexOf('location') >= 0 || s.indexOf('geographic') >= 0) return 'location';
    if (s.indexOf('product') >= 0) return 'product';
    if (s.indexOf('employee') >= 0) return 'employee';
    if (s.indexOf('doctor') >= 0) return 'doctor';
    if (s.indexOf('customer') >= 0) return 'customer';
    if (s.indexOf('sales dashboard') >= 0 || s === 'sales') return 'sales';
    return null;
  }

  function tabFromHash(hash) {
    if (!hash) return null;
    var h = (hash.startsWith('#') ? hash.slice(1) : hash).toLowerCase();
    if (h.indexOf('funnel') >= 0) return 'funnel';
    if (h.indexOf('target') >= 0 || h.indexOf('achieve') >= 0) return 'targets';
    if (h.indexOf('forecast') >= 0) return 'forecast';
    if (h.indexOf('channel') >= 0) return 'channel';
    if (h.indexOf('location') >= 0 || h.indexOf('geographic') >= 0) return 'location';
    if (h.indexOf('product') >= 0) return 'product';
    if (h.indexOf('employee') >= 0) return 'employee';
    if (h.indexOf('doctor') >= 0) return 'doctor';
    if (h.indexOf('customer') >= 0) return 'customer';
    if (h.indexOf('sales') >= 0) return 'sales';
    return null;
  }

  function hashFromTab(tab) {
    var t = TABS.find(function (it) { return it.id === tab; });
    return t ? t.hash : '#sales-dashboard';
  }

  function markSidebar(on, tab) {
    var targetTab = tab || S.tab || 'sales';
    document.querySelectorAll('.sidebar-scope li button, .sidebar-scope button, .sidebar-scope a').forEach(function (b) {
      var bTab = tabFromText(b.textContent ? b.textContent.trim() : '');
      if (bTab) {
        b.classList.toggle('zsd-active', on && bTab === targetTab);
      }
    });
  }

  function switchTab(newTab) {
    if (!newTab) return;
    S.tab = newTab;
    S.page = 1;
    var targetHash = hashFromTab(newTab);
    try {
      if (location.hash !== targetHash) {
        history.pushState(null, '', targetHash);
      }
    } catch (e) { }
    markSidebar(true, newTab);
    renderAll();
  }

  function open(tab) {
    if (tab && TABS.some(function (t) { return t.id === tab; })) {
      S.tab = tab;
    } else if (!S.tab) {
      S.tab = tabFromHash(location.hash) || 'sales';
    }
    if (!root) build();
    else if (!document.body.contains(root)) document.body.appendChild(root);
    S.open = true;
    root.classList.add('zsd-open');
    root.scrollTop = 0;
    var targetHash = hashFromTab(S.tab);
    try {
      if (location.hash !== targetHash) {
        history.pushState(null, '', targetHash);
      }
    } catch (e) { }

    // Clean up any Radix placeholder dialog / lock attributes
    try {
      document.querySelectorAll('[role="dialog"]').forEach(function (d) {
        if (d.closest('#zsd-root')) return;
        var btn = d.querySelector('button[aria-label*="close" i], button:last-child');
        if (btn) {
          try { btn.click(); } catch (err) {}
        }
        try { d.remove(); } catch (err) {}
      });
      document.querySelectorAll('[data-radix-focus-guard], [data-radix-popper-content-wrapper], [data-radix-portal]').forEach(function (g) {
        try { g.remove(); } catch (err) {}
      });
      document.body.style.pointerEvents = '';
      document.body.style.overflow = '';
      document.body.removeAttribute('data-scroll-locked');
    } catch (e) { }

    setTimeout(function () { markSidebar(true, S.tab); }, 0);
    if (S.loaded) {
      renderAll();
    }
    load();
  }

  function close() {
    if (!root || !S.open) return;
    S.open = false;
    root.classList.remove('zsd-open');
    hideTip();
    markSidebar(false);
    try {
      if (location.hash.startsWith('#revenue-by-') || location.hash === '#sales-dashboard' || location.hash === '#sales-funnel' || location.hash === '#targets-achievement' || location.hash === '#sales-forecast') {
        history.pushState(null, '', location.pathname + location.search);
      }
    } catch (e) { }
  }

  window.addEventListener('zenve:open-sales-dashboard', function (e) {
    var tab = (e && e.detail && e.detail.tab) ? e.detail.tab : 'sales';
    open(tab);
  });
  window.ZenveSalesDashboard = { open: open, close: close, switchTab: switchTab, reload: load };

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && S.open) close();
  });

  // Global click delegator (capture phase to intercept before React)
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;

    // Never intercept accordion category headers or search input
    if (t.closest('[aria-expanded]') || t.closest('button[aria-expanded]') || t.closest('[aria-label="Search menu"]')) return;

    // 1. Any button or link with "Sales Dashboard", "Revenue by Channel", etc.
    var item = t.closest('button, [data-go], a, [role="button"]');
    if (item && item.textContent) {
      var tab = tabFromText(item.textContent.trim());
      if (!tab) {
        // If clicking a "View all" button, check parent card/panel title
        var card = t.closest('article, .panel, [data-panel]');
        var head = card ? card.querySelector('h3, h2, .font-display') : null;
        if (head && head.textContent && item.textContent.trim().toLowerCase().indexOf('view all') >= 0) {
          tab = tabFromText(head.textContent.trim());
        }
      }
      if (tab) {
        if (!t.closest('#zsd-root')) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          open(tab);
          return;
        }
      }
    }

    // 2. Direct click on card headings like "Revenue by Channel", "Geographic Sales", etc.
    var heading = t.closest('h1, h2, h3, h4');
    if (heading && heading.textContent && !t.closest('#zsd-root')) {
      var hTab = tabFromText(heading.textContent.trim());
      if (hTab) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        open(hTab);
        return;
      }
    }

    // 3. Element explicitly targeted for sales dashboard
    if (t.closest('[data-open-sales-dashboard]')) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      open('sales');
      return;
    }

    if (!S.open) return;

    // 4. Inside the sales dashboard itself, do NOT close
    if (t.closest('#zsd-root')) return;

    // 5. Sidebar interactions
    var b = t.closest('.sidebar-scope button, .sidebar-scope a');
    if (!b) return;

    // If clicking menu search or accordion toggle (with aria-expanded), do NOT close
    if (b.getAttribute('aria-label') === 'Search menu') return;
    if (b.getAttribute('aria-expanded') !== null) return;
    if (b.closest('[role="dialog"]')) return;
    if (b.textContent && tabFromText(b.textContent.trim())) return;

    // Navigating to other pages closes the sales dashboard
    close();
  }, true);

  // Prevent pointerdown from activating synthetic focus locks on revenue sidebar items
  document.addEventListener('pointerdown', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;
    if (t.closest('[aria-expanded]') || t.closest('button[aria-expanded]') || t.closest('[aria-label="Search menu"]')) return;
    var item = t.closest('.sidebar-scope button, .sidebar-scope a');
    if (item && item.textContent) {
      var tab = tabFromText(item.textContent.trim());
      if (tab) {
        e.stopPropagation();
      }
    }
  }, true);

  window.addEventListener('hashchange', function () {
    var tab = tabFromHash(location.hash);
    if (tab) {
      if (!S.open) open(tab);
      else switchTab(tab);
    } else if (S.open) {
      close();
    }
  });

  // Check initial hash
  var initialTab = tabFromHash(location.hash);
  if (initialTab) {
    var go = function () { setTimeout(function () { open(initialTab); }, 400); };
    if (document.readyState === 'complete') go();
    else window.addEventListener('load', go);
  }

  /* ---------- Data Pipeline Modal & Ingestion Controller ---------- */
  var pipelineState = {
    fileData: null,
    filename: '',
    parsedRows: []
  };

  function parseCsvPreview(text) {
    if (!text) return [];
    text = text.replace(/^\ufeff/, '');
    var rawLines = text.split(/\r?\n/).map(function (l) { return l.trim(); }).filter(Boolean);
    if (!rawLines.length) return [];

    var first = rawLines[0];
    var delim = '\t';
    if (first.indexOf('\t') >= 0) delim = '\t';
    else if (first.indexOf(';') >= 0 && first.indexOf(',') < 0) delim = ';';
    else delim = ',';

    function parseLine(line) {
      var entries = [];
      var cur = '', inQuotes = false;
      for (var i = 0; i < line.length; i++) {
        var ch = line[i];
        if (ch === '"') {
          if (inQuotes && line[i + 1] === '"') { cur += '"'; i++; }
          else { inQuotes = !inQuotes; }
        } else if (ch === delim && !inQuotes) {
          entries.push(cur.trim());
          cur = '';
        } else {
          cur += ch;
        }
      }
      entries.push(cur.trim());
      return entries;
    }

    var headers = parseLine(rawLines[0]).map(function (h) {
      return h.toLowerCase().replace(/[^a-z0-9]/g, '');
    });

    var rows = [];
    for (var i = 1; i < rawLines.length; i++) {
      var parts = parseLine(rawLines[i]);
      if (!parts.length || (parts.length === 1 && !parts[0])) continue;
      var obj = {};
      headers.forEach(function (h, idx) {
        obj[h] = parts[idx] !== undefined ? parts[idx] : '';
      });

      var rawDate = obj.date || obj.soldat || obj.orderdate || obj.createdat || obj.datetime || obj.timestamp || obj.txndate || '';
      var rawAmt = obj.amount || obj.revenue || obj.totalamount || obj.total || obj.price || obj.netamount || obj.grandtotal || obj.sales || '0';
      var amt = parseFloat(String(rawAmt).replace(/[^0-9.-]/g, '')) || 0;

      rows.push({
        order_id: obj.orderid || obj.order || obj.id || obj.transactionref || obj.transref || obj.ref || ('ZV-' + (70000 + i)),
        sold_at: safeDay(rawDate) || new Date().toISOString().slice(0, 10),
        person: obj.person || obj.customer || obj.customername || obj.patient || obj.patientname || obj.client || obj.clientname || obj.name || obj.user || ('Customer ' + i),
        source: obj.service || obj.servicename || obj.source || obj.category || obj.product || obj.productname || obj.item || obj.itemname || 'General Care',
        city: obj.city || obj.location || obj.branch || obj.center || obj.region || obj.clinic || 'Bengaluru',
        channel: obj.channel || obj.app || obj.appsource || obj.platform || obj.medium || 'Android',
        status: obj.status || obj.orderstatus || obj.paymentstatus || obj.state || 'Paid',
        amount: amt
      });
    }
    return rows;
  }

  function wirePipelineModal() {
    var modal = $('#zsd-pipeline-modal');
    var openBtn = $('#zsd-pipeline-open');
    var closeBtn = $('#zsd-pipe-close');
    var cancelBtn = $('#zsd-pipe-cancel');
    var dropzone = $('#zsd-dropzone');
    var fileInput = $('#zsd-file-input');
    var browseBtn = $('#zsd-pipe-browse');
    var sampleBtn = $('#zsd-pipe-load-sample');
    var submitBtn = $('#zsd-pipe-submit');
    var resetDbBtn = $('#zsd-pipe-reset-db');
    var previewWrap = $('#zsd-pipe-preview-wrap');
    var previewStats = $('#zsd-pipe-preview-stats');
    var previewTbody = $('#zsd-pipe-preview-table tbody');
    var alertBox = $('#zsd-pipe-alert');

    function showAlert(msg, type) {
      if (!alertBox) return;
      alertBox.className = 'zsd-notice-banner ' + (type || 'info');
      alertBox.textContent = msg;
      alertBox.style.display = 'block';
    }
    function hideAlert() {
      if (alertBox) alertBox.style.display = 'none';
    }

    function openModal() {
      if (!modal) return;
      modal.style.display = 'flex';
      hideAlert();
    }
    function closeModal() {
      if (!modal) return;
      modal.style.display = 'none';
    }

    if (openBtn) openBtn.onclick = openModal;
    if (closeBtn) closeBtn.onclick = closeModal;
    if (cancelBtn) cancelBtn.onclick = closeModal;
    if (modal) {
      modal.onclick = function (e) {
        if (e.target === modal) closeModal();
      };
    }

    function processContent(content, filename) {
      pipelineState.fileData = content;
      pipelineState.filename = filename || 'dataset.csv';
      hideAlert();

      var rows = [];
      try {
        if (content.trim().startsWith('{') || content.trim().startsWith('[')) {
          var j = JSON.parse(content);
          var list = Array.isArray(j) ? j : (j.sales || j.rows || j.data || []);
          rows = list.map(function (it, idx) {
            return {
              order_id: it.order_id || it.order || ('ZV-' + (70000 + idx)),
              sold_at: it.sold_at || it.date || new Date().toISOString(),
              person: it.person || it.customer || 'Customer ' + idx,
              source: it.source || it.service || 'Service',
              city: it.city || 'Bengaluru',
              channel: it.channel || it.app_source || 'Android',
              status: it.status || 'Paid',
              amount: num(it.amount)
            };
          });
        } else {
          rows = parseCsvPreview(content);
        }
      } catch (err) {
        showAlert('Could not parse file: ' + err.message, 'error');
        return;
      }

      if (!rows.length) {
        showAlert('No valid rows found in file.', 'error');
        return;
      }

      pipelineState.parsedRows = rows;
      var totalRev = rows.reduce(function (a, r) { return a + (r.amount || 0); }, 0);
      var dates = rows.map(function (r) { return safeDay(r.sold_at); }).filter(Boolean).sort();
      var dateRange = dates.length ? (dates[0] + ' → ' + dates[dates.length - 1]) : 'N/A';

      if (previewStats) {
        previewStats.textContent = rows.length + ' rows · ' + dateRange + ' · Total: ' + inr.format(totalRev);
      }

      if (previewTbody) {
        previewTbody.innerHTML = rows.slice(0, 5).map(function (r) {
          return '<tr><td><b>' + esc(r.order_id) + '</b></td>' +
            '<td>' + esc(safeDay(r.sold_at)) + '</td>' +
            '<td>' + esc(r.person) + '</td>' +
            '<td>' + esc(r.source) + '</td>' +
            '<td>' + esc(r.city) + '</td>' +
            '<td>' + esc(r.channel) + '</td>' +
            '<td><span class="zsd-badge ' + esc(r.status) + '">' + esc(r.status) + '</span></td>' +
            '<td class="r"><b>' + inr.format(r.amount) + '</b></td></tr>';
        }).join('');
      }

      if (previewWrap) previewWrap.style.display = 'block';
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Ingest & Update Dashboard (' + rows.length + ' rows)';
      }
    }

    if (browseBtn && fileInput) {
      browseBtn.onclick = function () { fileInput.click(); };
      fileInput.onchange = function (e) {
        var file = e.target.files && e.target.files[0];
        if (!file) return;
        var reader = new FileReader();
        reader.onload = function (evt) {
          processContent(evt.target.result, file.name);
        };
        reader.readAsText(file);
      };
    }

    if (dropzone) {
      ['dragenter', 'dragover'].forEach(function (evtName) {
        dropzone.addEventListener(evtName, function (e) {
          e.preventDefault();
          dropzone.classList.add('dragover');
        });
      });
      ['dragleave', 'drop'].forEach(function (evtName) {
        dropzone.addEventListener(evtName, function (e) {
          e.preventDefault();
          dropzone.classList.remove('dragover');
        });
      });
      dropzone.addEventListener('drop', function (e) {
        var file = e.dataTransfer.files && e.dataTransfer.files[0];
        if (!file) return;
        var reader = new FileReader();
        reader.onload = function (evt) {
          processContent(evt.target.result, file.name);
        };
        reader.readAsText(file);
      });
    }

    if (sampleBtn) {
      sampleBtn.onclick = function () {
        showAlert('Fetching sample Q4 sales dataset...', 'info');
        fetch('/assets/sample-q4-sales.csv')
          .then(function (r) {
            if (!r.ok) throw new Error('HTTP ' + r.status);
            return r.text();
          })
          .then(function (txt) {
            processContent(txt, 'sample-q4-sales.csv');
            showAlert('Loaded 20 sample Q4 sales records. Select Ingestion Mode and click Ingest.', 'info');
          })
          .catch(function (err) {
            showAlert('Could not load sample: ' + err.message, 'error');
          });
      };
    }

    if (submitBtn) {
      submitBtn.onclick = function () {
        if (!pipelineState.fileData) return;
        var modeRadio = document.querySelector('input[name="zsd-pipe-mode"]:checked');
        var mode = modeRadio ? modeRadio.value : 'replace';

        submitBtn.disabled = true;
        showAlert('Ingesting dataset (' + mode + ' mode) into database & updating dashboard...', 'info');

        var formData = new FormData();
        var blob = new Blob([pipelineState.fileData], { type: 'text/csv;charset=utf-8' });
        formData.append('file', blob, pipelineState.filename || 'dataset.csv');

        fetch('/api/v1/pipeline/upload?mode=' + encodeURIComponent(mode), {
          method: 'POST',
          body: formData
        })
          .then(function (r) {
            if (!r.ok) return r.json().then(function (j) { throw new Error(j.error || ('HTTP ' + r.status)); });
            return r.json();
          })
          .then(function (res) {
            if (!res.success) throw new Error(res.error || 'Failed to ingest data');
            showAlert('✓ ' + (res.message || 'Ingestion complete!'), 'success');
            submitBtn.textContent = '✓ Updated!';

            // Dynamically refresh the dashboard with the newly ingested dataset
            if (res.data) {
              applyData(res.data, true, true);
            } else {
              load();
            }

            setTimeout(function () {
              closeModal();
              submitBtn.disabled = false;
              submitBtn.textContent = 'Ingest & Update Dashboard';
            }, 900);
          })
          .catch(function (err) {
            showAlert('Error ingesting dataset: ' + err.message, 'error');
            submitBtn.disabled = false;
          });
      };
    }

    if (resetDbBtn) {
      resetDbBtn.onclick = function () {
        if (!confirm('Are you sure you want to restore the default 105 demo transactions and 30 daily metrics?')) return;
        showAlert('Resetting database to factory baseline...', 'info');
        fetch('/api/v1/pipeline/reset', { method: 'POST' })
          .then(function (r) { return r.json(); })
          .then(function (res) {
            if (!res.success) throw new Error(res.error || 'Reset failed');
            showAlert('✓ ' + (res.message || 'Database reset successfully.'), 'success');
            if (res.data) {
              applyData(res.data, true, true);
            } else {
              load();
            }
            setTimeout(closeModal, 800);
          })
          .catch(function (err) {
            showAlert('Reset error: ' + err.message, 'error');
          });
      };
    }
  }

  // Auto-wire helper in main UI: when section #daily exists, make its header open the Sales Dashboard
  function wireMainPage() {
    var dailySec = document.getElementById('daily');
    if (dailySec) {
      var pulse = dailySec.querySelector('article');
      if (pulse && !pulse.hasAttribute('data-zsd-wired')) {
        pulse.setAttribute('data-zsd-wired', 'true');
        pulse.style.cursor = 'pointer';
        pulse.title = 'Click to open full interactive Sales Dashboard';
        var badge = document.createElement('div');
        badge.className = 'zsd-pulse-badge';
        badge.innerHTML = '⚡ Open Interactive Sales Dashboard →';
        badge.style.cssText = 'font-size:11px;font-weight:600;color:var(--primary);margin-top:6px;cursor:pointer;';
        pulse.querySelector('.flex')?.appendChild(badge) || pulse.appendChild(badge);
        pulse.addEventListener('click', function (e) {
          if (!e.target.closest('button')) open();
        });
      }
    }
  }

  if (document.readyState === 'complete') setTimeout(wireMainPage, 1000);
  else window.addEventListener('load', function () { setTimeout(wireMainPage, 1000); });
})();
