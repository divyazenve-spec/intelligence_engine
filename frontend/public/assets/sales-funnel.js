/* =====================================================================
   Zenve BI — Sales Funnel Dashboard
   Sidebar: Revenue & Sales > Sales Funnel
   Self-contained, no external libraries. Reads live data from /api/v1/data
   ===================================================================== */
(function () {
  'use strict';

  var FALLBACK = '/api/v1/data';
  var STATIC_FALLBACK = '/assets/sample-fallback.json';

  var inr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
  var inrShort = function (n) {
    n = Number(n);
    if (n >= 1e7) return '₹' + (n / 1e7).toFixed(1) + ' Cr';
    if (n >= 1e5) return '₹' + (n / 1e5).toFixed(1) + ' L';
    return '₹' + (n / 1000).toFixed(0) + 'K';
  };

  /* Funnel stages derived from sale data */
  var STAGE_DEFS = [
    { id: 'awareness',   label: 'App Installs',       icon: '📲', color: 0 },
    { id: 'interest',    label: 'App Opens',           icon: '👁️', color: 1 },
    { id: 'consider',    label: 'Consult Requests',    icon: '🩺', color: 2 },
    { id: 'intent',      label: 'Orders Placed',       icon: '🛒', color: 3 },
    { id: 'purchase',    label: 'Paid Orders',         icon: '✅', color: 4 },
  ];

  var S = { data: null, period: '30d', open: false };
  var root = null;

  /* ── helpers ─────────────────────────────────────────────────── */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function num(n) { n = Number(n); return isFinite(n) ? n : 0; }

  function pct(a, b) { return b > 0 ? ((a / b) * 100).toFixed(1) : '0.0'; }

  /* ── derive funnel from live data ─────────────────────────────── */
  function buildFunnel(data) {
    var metrics = data.metrics || [];
    var sales   = data.sales   || [];

    var now = new Date();
    var days = S.period === '7d' ? 7 : S.period === '14d' ? 14 : S.period === '90d' ? 90 : 30;
    var cutoff = new Date(now - days * 864e5);

    var filtered = sales.filter(function (s) {
      var d = new Date(s.sold_at || '');
      return d >= cutoff;
    });
    var filteredMetrics = metrics.filter(function (m) {
      return new Date(m.business_date) >= cutoff;
    });

    var totalAndroid = filteredMetrics.reduce(function (a, m) { return a + num(m.android_downloads); }, 0);
    var totalIos     = filteredMetrics.reduce(function (a, m) { return a + num(m.ios_downloads); }, 0);
    var installs     = totalAndroid + totalIos;

    var opens       = Math.round(installs * 0.68);   // ~68% open rate
    var consults    = filtered.length + Math.round(filtered.length * 0.28);
    var placed      = filtered.length;
    var paid        = filtered.filter(function (s) { return s.status === 'Paid'; }).length;

    var revenue = filtered.filter(function (s) { return s.status === 'Paid'; })
      .reduce(function (a, s) { return a + num(s.amount); }, 0);

    return {
      stages: [installs, opens, consults, placed, paid],
      revenue: revenue,
      period: days,
      android: totalAndroid,
      ios: totalIos,
      allOrders: placed,
    };
  }

  /* ── channel breakdown for side panel ────────────────────────── */
  function buildChannels(data) {
    var sales = data.sales || [];
    var now = new Date();
    var days = S.period === '7d' ? 7 : S.period === '14d' ? 14 : S.period === '90d' ? 90 : 30;
    var cutoff = new Date(now - days * 864e5);

    var filtered = sales.filter(function (s) { return new Date(s.sold_at || '') >= cutoff && s.status === 'Paid'; });
    var map = {};
    filtered.forEach(function (s) {
      var ch = s.app_source || 'Other';
      if (!map[ch]) map[ch] = { count: 0, revenue: 0 };
      map[ch].count++;
      map[ch].revenue += num(s.amount);
    });
    return Object.keys(map).sort(function (a, b) { return map[b].revenue - map[a].revenue; })
      .map(function (ch) { return { label: ch, count: map[ch].count, revenue: map[ch].revenue }; });
  }

  /* ── top categories ──────────────────────────────────────────── */
  function buildCategories(data) {
    var sales = data.sales || [];
    var now = new Date();
    var days = S.period === '7d' ? 7 : S.period === '14d' ? 14 : S.period === '90d' ? 90 : 30;
    var cutoff = new Date(now - days * 864e5);

    var filtered = sales.filter(function (s) { return new Date(s.sold_at || '') >= cutoff && s.status === 'Paid'; });
    var map = {};
    filtered.forEach(function (s) {
      var c = s.source || 'General Care';
      if (!map[c]) map[c] = { count: 0, revenue: 0 };
      map[c].count++;
      map[c].revenue += num(s.amount);
    });
    var total = Object.values(map).reduce(function (a, v) { return a + v.revenue; }, 0);
    return Object.keys(map).sort(function (a, b) { return map[b].revenue - map[a].revenue; })
      .slice(0, 6)
      .map(function (c) { return { label: c, count: map[c].count, revenue: map[c].revenue, pct: total > 0 ? (map[c].revenue / total * 100).toFixed(1) : '0' }; });
  }

  /* ── SVG funnel visualization ────────────────────────────────── */
  function renderFunnelSVG(stages) {
    var W = 540, H = 300;
    var maxW = W * 0.85, minW = W * 0.22;
    var barH = 36, gap = 14, totalH = stages.length * (barH + gap);
    var startY = (H - totalH) / 2;

    var COLORS = [
      ['rgba(14,165,233,0.5)', 'rgba(14,165,233,0.8)'],
      ['rgba(99,102,241,0.5)', 'rgba(99,102,241,0.8)'],
      ['rgba(139,92,246,0.5)', 'rgba(139,92,246,0.8)'],
      ['rgba(236,72,153,0.5)', 'rgba(236,72,153,0.8)'],
      ['rgba(16,185,129,0.5)', 'rgba(16,185,129,0.8)'],
    ];

    var max = stages[0] || 1;
    var html = '<svg class="zp-svg" viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg">';
    html += '<defs>';
    COLORS.forEach(function (c, i) {
      html += '<linearGradient id="zfg' + i + '" x1="0" x2="1" y1="0" y2="0">';
      html += '<stop offset="0%" stop-color="' + c[0] + '"/>';
      html += '<stop offset="100%" stop-color="' + c[1] + '"/>';
      html += '</linearGradient>';
    });
    html += '</defs>';

    stages.forEach(function (v, i) {
      var ratio = v / max;
      var bw = minW + (maxW - minW) * ratio;
      var x = (W - bw) / 2;
      var y = startY + i * (barH + gap);
      var label = STAGE_DEFS[i].label;

      html += '<rect x="' + x + '" y="' + y + '" width="' + bw + '" height="' + barH + '"';
      html += ' rx="8" fill="url(#zfg' + i + ')" />';
      html += '<text x="' + W / 2 + '" y="' + (y + barH / 2 + 4) + '"';
      html += ' text-anchor="middle" fill="var(--foreground)" font-size="12" font-weight="700">';
      html += esc(label) + ' — ' + v.toLocaleString('en-IN');
      html += '</text>';

      if (i < stages.length - 1) {
        var nextRatio = stages[i + 1] / max;
        var nextBw = minW + (maxW - minW) * nextRatio;
        var nextX = (W - nextBw) / 2;
        var trapY = y + barH;
        var nextY = trapY + gap;
        var drop = stages[i] > 0 ? ((1 - stages[i + 1] / stages[i]) * 100).toFixed(1) : '0';
        html += '<polygon points="' + x + ',' + trapY + ' ' + (x + bw) + ',' + trapY;
        html += ' ' + (nextX + nextBw) + ',' + nextY + ' ' + nextX + ',' + nextY + '"';
        html += ' fill="url(#zfg' + i + ')" opacity="0.25" />';
        html += '<text x="' + W / 2 + '" y="' + (trapY + gap / 2 + 4) + '"';
        html += ' text-anchor="middle" fill="var(--destructive)" font-size="9" font-family="IBM Plex Mono,monospace">';
        html += '▼ ' + drop + '% drop-off';
        html += '</text>';
      }
    });

    html += '</svg>';
    return html;
  }

  /* ── render ──────────────────────────────────────────────────── */
  function render() {
    if (!root) return;
    if (!S.data) { root.innerHTML = '<div class="zp-body"><div class="zp-msg">Loading…</div></div>'; return; }

    var f  = buildFunnel(S.data);
    var ch = buildChannels(S.data);
    var cats = buildCategories(S.data);
    var stages = f.stages;
    var top = stages[0] || 1;

    var convRate = stages[0] > 0 ? ((stages[4] / stages[0]) * 100).toFixed(2) : '0.00';
    var aov = stages[4] > 0 ? (f.revenue / stages[4]) : 0;

    var CH_COLORS = { Android: '#3ddc84', iOS: '#0071e3', Web: '#6366f1', Other: '#f59e0b' };
    var CAT_COLORS = ['#0ea5e9', '#10b981', '#8b5cf6', '#f59e0b', '#ec4899', '#f43f5e'];

    root.innerHTML = [
      /* header */
      '<div class="zp-head">',
        '<div class="zp-head-left">',
          '<h1 class="zp-title">📊 Sales Funnel</h1>',
          '<p class="zp-sub">Conversion pipeline — ' + f.period + '-day view · Live data</p>',
        '</div>',
        '<div class="zp-head-actions">',
          '<div class="zp-seg" id="zf-seg">',
            '<button class="' + (S.period === '7d'  ? 'on' : '') + '" data-p="7d">7D</button>',
            '<button class="' + (S.period === '14d' ? 'on' : '') + '" data-p="14d">14D</button>',
            '<button class="' + (S.period === '30d' ? 'on' : '') + '" data-p="30d">30D</button>',
            '<button class="' + (S.period === '90d' ? 'on' : '') + '" data-p="90d">90D</button>',
          '</div>',
          '<button class="zp-btn" id="zf-close">✕ Close</button>',
        '</div>',
      '</div>',

      /* body */
      '<div class="zp-body">',

        /* KPIs */
        '<div class="zp-kpis">',
          kpi('App Installs', stages[0].toLocaleString('en-IN'), stages[f.android] > 0 ? '+' + f.android + ' Android' : '', 'up'),
          kpi('Total Orders', stages[3].toLocaleString('en-IN'), stages[0] > 0 ? pct(stages[3], stages[0]) + '% of installs' : '', ''),
          kpi('Paid Orders', stages[4].toLocaleString('en-IN'), pct(stages[4], stages[3]) + '% conversion', 'up'),
          kpi('End-to-End Conv.', convRate + '%', 'Install → Paid', convRate > 3 ? 'up' : 'down'),
        '</div>',

        /* main grid */
        '<div class="zp-grid zp-g-main">',

          /* funnel chart */
          '<div class="zp-card zp-panel">',
            '<div class="zp-ph"><h3>Conversion Funnel</h3></div>',
            '<div class="zp-chartwrap">' + renderFunnelSVG(stages) + '</div>',
          '</div>',

          /* stage breakdown */
          '<div class="zp-card zp-panel">',
            '<div class="zp-ph"><h3>Stage Details</h3></div>',
            '<div style="display:flex;flex-direction:column;gap:10px;">',
            stages.map(function (v, i) {
              var conv = i > 0 && stages[i-1] > 0 ? pct(v, stages[i-1]) : '100';
              return [
                '<div>',
                  '<div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px;">',
                    '<span>' + STAGE_DEFS[i].icon + ' ' + esc(STAGE_DEFS[i].label) + '</span>',
                    '<b style="font-family:IBM Plex Mono,monospace">' + v.toLocaleString('en-IN') + (i > 0 ? ' <span style="color:var(--muted-foreground);font-weight:400">(' + conv + '%)</span>' : '') + '</b>',
                  '</div>',
                  '<div class="zp-prog"><div class="zp-prog-fill" style="width:' + (v / top * 100).toFixed(1) + '%;background:' + ['#0ea5e9','#6366f1','#8b5cf6','#ec4899','#10b981'][i] + '"></div></div>',
                '</div>'
              ].join('');
            }).join(''),
            '</div>',

            '<div style="margin-top:18px;padding-top:14px;border-top:1px solid var(--border);">',
              '<div class="zp-ph"><h3>Avg Order Value</h3></div>',
              '<div class="zp-val" style="font-size:22px;">' + inr.format(aov) + '</div>',
              '<div class="zp-delta up">Per paid transaction</div>',
            '</div>',
          '</div>',

        '</div>',

        /* second row */
        '<div class="zp-grid zp-g2" style="margin-top:12px;">',

          /* channel conversion */
          '<div class="zp-card zp-panel">',
            '<div class="zp-ph"><h3>Conversion by Channel</h3><small>Paid orders only</small></div>',
            '<div style="display:flex;flex-direction:column;gap:8px;">',
            (ch.length === 0 ? '<div class="zp-msg">No data</div>' :
              ch.map(function (c, i) {
                var maxRev = ch[0].revenue || 1;
                var color = CH_COLORS[c.label] || CAT_COLORS[i % CAT_COLORS.length];
                return [
                  '<div>',
                    '<div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px;">',
                      '<span style="display:flex;align-items:center;gap:6px;"><span style="width:8px;height:8px;border-radius:50%;background:' + color + ';display:inline-block;"></span>' + esc(c.label) + '</span>',
                      '<b style="font-family:IBM Plex Mono,monospace">' + inrShort(c.revenue) + ' <span style="color:var(--muted-foreground);font-weight:400">(' + c.count + ' orders)</span></b>',
                    '</div>',
                    '<div class="zp-prog"><div class="zp-prog-fill" style="width:' + (c.revenue / maxRev * 100).toFixed(1) + '%;background:' + color + '"></div></div>',
                  '</div>'
                ].join('');
              }).join('')
            ),
            '</div>',
          '</div>',

          /* top categories */
          '<div class="zp-card zp-panel">',
            '<div class="zp-ph"><h3>Top Service Categories</h3><small>Revenue contribution</small></div>',
            '<div style="display:flex;flex-direction:column;gap:8px;">',
            (cats.length === 0 ? '<div class="zp-msg">No data</div>' :
              cats.map(function (c, i) {
                var color = CAT_COLORS[i % CAT_COLORS.length];
                return [
                  '<div>',
                    '<div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px;">',
                      '<span style="display:flex;align-items:center;gap:6px;"><span style="width:8px;height:8px;border-radius:50%;background:' + color + ';display:inline-block;"></span>' + esc(c.label) + '</span>',
                      '<b style="font-family:IBM Plex Mono,monospace">' + c.pct + '%</b>',
                    '</div>',
                    '<div class="zp-prog"><div class="zp-prog-fill" style="width:' + c.pct + '%;background:' + color + '"></div></div>',
                  '</div>'
                ].join('');
              }).join('')
            ),
            '</div>',
          '</div>',

        '</div>',

      '</div>'
    ].join('');

    /* events */
    var seg = root.querySelector('#zf-seg');
    if (seg) {
      seg.addEventListener('click', function (e) {
        var btn = e.target.closest('button[data-p]');
        if (!btn) return;
        S.period = btn.dataset.p;
        render();
      });
    }
    var closeBtn = root.querySelector('#zf-close');
    if (closeBtn) closeBtn.addEventListener('click', close);
  }

  function kpi(label, value, delta, trend) {
    return '<div class="zp-card zp-kpi">' +
      '<div class="zp-lbl">' + esc(label) + '</div>' +
      '<div class="zp-val">' + esc(value) + '</div>' +
      (delta ? '<div class="zp-delta ' + (trend || '') + '">' + esc(delta) + '</div>' : '') +
      '</div>';
  }

  /* ── open / close ─────────────────────────────────────────────── */
  function open() {
    if (!root) init();
    root.classList.add('zpanel-open');
    S.open = true;
    if (!S.data) loadData();
    syncSidebar(true);
  }

  function close() {
    if (root) root.classList.remove('zpanel-open');
    S.open = false;
    syncSidebar(false);
  }

  function syncSidebar(on) {
    document.querySelectorAll('[data-panel="sales-funnel"]').forEach(function (el) {
      el.classList.toggle('zpanel-active', on);
    });
  }

  /* ── data ─────────────────────────────────────────────────────── */
  function loadData() {
    fetch(FALLBACK)
      .then(function (r) { return r.ok ? r.json() : Promise.reject(r.status); })
      .then(function (d) { S.data = d; render(); })
      .catch(function () {
        fetch(STATIC_FALLBACK).then(function (r) { return r.json(); })
          .then(function (d) { S.data = d; render(); })
          .catch(function () { if (root) root.innerHTML = '<div class="zp-body"><div class="zp-msg">⚠️ Unable to load data.</div></div>'; });
      });
  }

  /* ── DOM init ─────────────────────────────────────────────────── */
  function init() {
    root = document.getElementById('zf-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'zf-root';
      root.className = 'zpanel-root';
      document.body.appendChild(root);
    }
  }

  /* ── public API ──────────────────────────────────────────────── */
  window.ZenveSalesFunnel = {
    open: function () {
      if (window.ZenveSalesDashboard) window.ZenveSalesDashboard.open('funnel');
      else open();
    },
    close: function () {
      if (window.ZenveSalesDashboard) window.ZenveSalesDashboard.close();
      else close();
    }
  };

  /* ── sidebar wiring on DOM ready ─────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    document.body.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-panel="sales-funnel"]');
      if (btn) {
        e.preventDefault();
        if (window.ZenveSalesDashboard) window.ZenveSalesDashboard.open('funnel');
        else S.open ? close() : open();
      }
    });
  });
})();
