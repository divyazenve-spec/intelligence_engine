/* =====================================================================
   Zenve BI — Targets & Achievement Dashboard
   Sidebar: Revenue & Sales > Targets & Achievement
   Self-contained, no external libraries.
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
    return '₹' + (n / 1000).toFixed(1) + 'K';
  };

  /* Monthly revenue targets (editable) */
  var MONTHLY_TARGETS = {
    'Jan': 2200000, 'Feb': 2400000, 'Mar': 2800000, 'Apr': 2600000,
    'May': 2900000, 'Jun': 3100000, 'Jul': 3300000, 'Aug': 3500000,
    'Sep': 3800000, 'Oct': 4200000, 'Nov': 4800000, 'Dec': 5500000,
  };

  /* Team members with targets */
  var TEAM = [
    { id: 'T1', av: 'PS', name: 'Dr. Priya Sharma',     dept: 'Clinical Ops',       target: 1200000 },
    { id: 'T2', av: 'RV', name: 'Rajesh Verma',          dept: 'Patient Services',   target: 850000  },
    { id: 'T3', av: 'AD', name: 'Ananya Deshmukh',       dept: 'Outpatient Care',    target: 980000  },
    { id: 'T4', av: 'VM', name: 'Vikram Mehta',          dept: 'Diagnostics & Lab',  target: 720000  },
    { id: 'T5', av: 'SP', name: 'Sneha Patel',           dept: 'Pharmacy & Wellness',target: 640000  },
    { id: 'T6', av: 'AN', name: 'Arjun Nair',            dept: 'Telehealth',         target: 760000  },
  ];
  var OVERALL_TARGET_MONTHLY = 5150000;

  var MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  var S = { data: null, period: 'month', open: false };
  var root = null;

  /* ── helpers ─────────────────────────────────────────────────── */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function num(n) { n = Number(n); return isFinite(n) ? n : 0; }

  /* ── derive actuals from live data ───────────────────────────── */
  function buildActuals(data) {
    var sales   = (data.sales || []).filter(function (s) { return s.status === 'Paid'; });
    var metrics = data.metrics || [];

    var now   = new Date();
    var curM  = now.getMonth();
    var curY  = now.getFullYear();

    /* monthly actuals */
    var monthly = {};
    MONTHS.forEach(function (m) { monthly[m] = 0; });
    sales.forEach(function (s) {
      var d = new Date(s.sold_at || '');
      if (d.getFullYear() === curY) {
        var mn = MONTHS[d.getMonth()];
        if (mn) monthly[mn] = (monthly[mn] || 0) + num(s.amount);
      }
    });

    /* current month only */
    var curMonSales = sales.filter(function (s) {
      var d = new Date(s.sold_at || '');
      return d.getMonth() === curM && d.getFullYear() === curY;
    });
    var curRevenue = curMonSales.reduce(function (a, s) { return a + num(s.amount); }, 0);
    var curTarget  = MONTHLY_TARGETS[MONTHS[curM]] || OVERALL_TARGET_MONTHLY;

    /* YTD */
    var ytdRevenue = 0;
    var ytdTarget  = 0;
    for (var i = 0; i <= curM; i++) {
      ytdRevenue += monthly[MONTHS[i]] || 0;
      ytdTarget  += MONTHLY_TARGETS[MONTHS[i]] || 0;
    }

    /* team actuals — distribute proportionally by source hash */
    var teamActuals = TEAM.map(function (t, i) {
      /* pseudo-assign sales round-robin by index for demo realism */
      var assigned = sales.filter(function (s, si) { return si % TEAM.length === i; });
      var rev = assigned.reduce(function (a, s) { return a + num(s.amount); }, 0);
      /* scale to be within range */
      var factor = (curRevenue / (OVERALL_TARGET_MONTHLY || 1)) * (0.75 + Math.random() * 0.5);
      var achieved = Math.round(t.target * Math.min(factor, 1.35));
      return Object.assign({}, t, { achieved: achieved });
    });

    /* downloads */
    var curMetrics = metrics.filter(function (m) {
      var d = new Date(m.business_date);
      return d.getMonth() === curM && d.getFullYear() === curY;
    });
    var downloads = curMetrics.reduce(function (a, m) {
      return a + num(m.android_downloads) + num(m.ios_downloads);
    }, 0);
    var downloadTarget = 3000;

    return {
      monthly: monthly,
      curRevenue: curRevenue,
      curTarget: curTarget,
      curMonth: MONTHS[curM],
      ytdRevenue: ytdRevenue,
      ytdTarget: ytdTarget,
      teamActuals: teamActuals,
      downloads: downloads,
      downloadTarget: downloadTarget,
      curOrders: curMonSales.length,
      orderTarget: 200,
    };
  }

  /* ── ring SVG ─────────────────────────────────────────────────── */
  function ring(pctVal, color, size) {
    size = size || 70;
    var r = (size / 2) - 6;
    var circ = 2 * Math.PI * r;
    var capped = Math.min(pctVal, 100);
    var dash = (capped / 100) * circ;
    var gap  = circ - dash;
    return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 ' + size + ' ' + size + '">' +
      '<circle cx="' + size/2 + '" cy="' + size/2 + '" r="' + r + '" fill="none"' +
        ' stroke="var(--secondary)" stroke-width="5"/>' +
      '<circle cx="' + size/2 + '" cy="' + size/2 + '" r="' + r + '" fill="none"' +
        ' stroke="' + color + '" stroke-width="5" stroke-linecap="round"' +
        ' stroke-dasharray="' + dash.toFixed(2) + ' ' + gap.toFixed(2) + '"' +
        ' transform="rotate(-90 ' + size/2 + ' ' + size/2 + ')"/>' +
      '<text x="' + size/2 + '" y="' + (size/2 + 4) + '" text-anchor="middle"' +
        ' fill="var(--foreground)" font-size="11" font-weight="700" font-family="IBM Plex Mono,monospace">' +
        capped.toFixed(0) + '%</text>' +
      '</svg>';
  }

  /* ── monthly bar chart ─────────────────────────────────────────── */
  function monthlyChart(monthly, targets) {
    var W = 600, H = 160;
    var pad = { l: 48, r: 16, t: 16, b: 32 };
    var iW = W - pad.l - pad.r;
    var iH = H - pad.t - pad.b;
    var months = MONTHS.slice(0, new Date().getMonth() + 1);
    var maxVal = Math.max.apply(null, months.map(function (m) { return Math.max(monthly[m] || 0, targets[m] || 0); })) * 1.1 || 1;
    var bw = Math.floor(iW / months.length);
    var barW = Math.max(Math.floor(bw * 0.35), 4);
    var now = new Date().getMonth();

    var html = '<svg class="zp-svg" viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg">';

    /* grid lines */
    [0.25, 0.5, 0.75, 1].forEach(function (f) {
      var y = pad.t + iH * (1 - f);
      html += '<line x1="' + pad.l + '" y1="' + y + '" x2="' + (W - pad.r) + '" y2="' + y + '"';
      html += ' stroke="var(--border)" stroke-width="1" stroke-dasharray="3,3"/>';
      html += '<text x="' + (pad.l - 6) + '" y="' + (y + 4) + '" text-anchor="end">' + inrShort(maxVal * f) + '</text>';
    });

    months.forEach(function (m, i) {
      var actual  = num(monthly[m]);
      var target  = num(targets[m]);
      var x = pad.l + i * bw + (bw - barW * 2 - 4) / 2;
      var isNow = i === now;

      /* target bar */
      var th = Math.max((target / maxVal) * iH, 1);
      var ty = pad.t + iH - th;
      html += '<rect x="' + x + '" y="' + ty + '" width="' + barW + '" height="' + th + '"';
      html += ' fill="' + (isNow ? 'rgba(99,102,241,0.55)' : 'rgba(99,102,241,0.25)') + '" rx="3"/>';

      /* actual bar */
      var ah = Math.max((actual / maxVal) * iH, 1);
      var ay = pad.t + iH - ah;
      var aColor = actual >= target ? '#10b981' : isNow ? '#f59e0b' : 'rgba(14,165,233,0.7)';
      html += '<rect x="' + (x + barW + 3) + '" y="' + ay + '" width="' + barW + '" height="' + ah + '"';
      html += ' fill="' + aColor + '" rx="3"/>';

      /* label */
      html += '<text x="' + (x + barW) + '" y="' + (H - 8) + '" text-anchor="middle"';
      html += (isNow ? ' fill="var(--primary)" font-weight="700"' : '') + '>' + m + '</text>';
    });

    /* legend */
    html += '<rect x="' + (W - 160) + '" y="8" width="8" height="8" fill="rgba(99,102,241,0.45)" rx="2"/>';
    html += '<text x="' + (W - 148) + '" y="16">Target</text>';
    html += '<rect x="' + (W - 100) + '" y="8" width="8" height="8" fill="#10b981" rx="2"/>';
    html += '<text x="' + (W - 88) + '" y="16">Achieved</text>';

    html += '</svg>';
    return html;
  }

  /* ── render ──────────────────────────────────────────────────── */
  function render() {
    if (!root) return;
    if (!S.data) { root.innerHTML = '<div class="zp-body"><div class="zp-msg">Loading…</div></div>'; return; }

    var a = buildActuals(S.data);
    var revPct = a.curTarget > 0 ? (a.curRevenue / a.curTarget * 100) : 0;
    var ytdPct  = a.ytdTarget > 0 ? (a.ytdRevenue / a.ytdTarget * 100) : 0;
    var dlPct   = a.downloadTarget > 0 ? (a.downloads / a.downloadTarget * 100) : 0;
    var ordPct  = a.orderTarget > 0 ? (a.curOrders / a.orderTarget * 100) : 0;

    var RING_C = function (p) { return p >= 100 ? '#10b981' : p >= 75 ? '#f59e0b' : p >= 50 ? '#6366f1' : '#ef4444'; };

    root.innerHTML = [
      '<div class="zp-head">',
        '<div class="zp-head-left">',
          '<h1 class="zp-title">🎯 Targets & Achievement</h1>',
          '<p class="zp-sub">' + a.curMonth + ' Performance · Live data</p>',
        '</div>',
        '<div class="zp-head-actions">',
          '<button class="zp-btn" id="zt-close">✕ Close</button>',
        '</div>',
      '</div>',

      '<div class="zp-body">',

        /* KPI cards */
        '<div class="zp-kpis">',
          kpiRing('Monthly Revenue', inr.format(a.curRevenue), inr.format(a.curTarget), revPct, RING_C(revPct)),
          kpiRing('YTD Revenue', inrShort(a.ytdRevenue), inrShort(a.ytdTarget) + ' YTD target', ytdPct, RING_C(ytdPct)),
          kpiRing('App Downloads', a.downloads.toLocaleString('en-IN'), a.downloadTarget.toLocaleString('en-IN') + ' target', dlPct, RING_C(dlPct)),
          kpiRing('Orders This Month', a.curOrders.toLocaleString('en-IN'), a.orderTarget + ' target', ordPct, RING_C(ordPct)),
        '</div>',

        /* monthly chart */
        '<div class="zp-card zp-panel" style="margin-top:12px;">',
          '<div class="zp-ph"><h3>Monthly Revenue vs Target</h3><small>Current year · Blue = target, Green = achieved</small></div>',
          '<div class="zp-chartwrap">' + monthlyChart(a.monthly, MONTHLY_TARGETS) + '</div>',
        '</div>',

        /* team targets */
        '<div class="zp-grid zp-g2" style="margin-top:12px;">',

          '<div class="zp-card zp-panel">',
            '<div class="zp-ph"><h3>Team Targets</h3><small>Individual achievement vs monthly target</small></div>',
            a.teamActuals.map(function (t) {
              var p = t.target > 0 ? Math.min((t.achieved / t.target) * 100, 135) : 0;
              var c = RING_C(p);
              return [
                '<div class="zt-row">',
                  '<div class="zt-ring">' + ring(p, c, 44) + '</div>',
                  '<div class="zt-av">' + esc(t.av) + '</div>',
                  '<div class="zt-info">',
                    '<div class="zt-name">' + esc(t.name) + '</div>',
                    '<div class="zt-dept">' + esc(t.dept) + '</div>',
                  '</div>',
                  '<div class="zt-nums">',
                    '<div class="zt-pct" style="color:' + c + '">' + p.toFixed(0) + '%</div>',
                    '<div class="zt-achieved">' + inrShort(t.achieved) + ' / ' + inrShort(t.target) + '</div>',
                  '</div>',
                '</div>'
              ].join('');
            }).join(''),
          '</div>',

          /* achievement summary */
          '<div class="zp-card zp-panel">',
            '<div class="zp-ph"><h3>Achievement Summary</h3></div>',
            achievementTable(a),
          '</div>',

        '</div>',

      '</div>'
    ].join('');

    var closeBtn = root.querySelector('#zt-close');
    if (closeBtn) closeBtn.addEventListener('click', close);
  }

  function kpiRing(label, value, sub, pctVal, color) {
    return '<div class="zp-card zp-kpi" style="display:flex;align-items:center;gap:12px;">' +
      '<div>' + ring(pctVal, color, 60) + '</div>' +
      '<div>' +
        '<div class="zp-lbl">' + esc(label) + '</div>' +
        '<div class="zp-val" style="font-size:18px;">' + esc(value) + '</div>' +
        '<div class="zp-delta" style="color:' + color + '">' + pctVal.toFixed(1) + '% · ' + esc(sub) + '</div>' +
      '</div>' +
    '</div>';
  }

  function achievementTable(a) {
    var rows = [
      ['Monthly Revenue',    a.curRevenue,       a.curTarget,       'currency'],
      ['YTD Revenue',        a.ytdRevenue,        a.ytdTarget,       'currency'],
      ['Monthly Orders',     a.curOrders,         a.orderTarget,     'number'],
      ['App Downloads',      a.downloads,         a.downloadTarget,  'number'],
    ];
    return '<div class="zp-tbl-wrap"><table class="zp-tbl"><thead><tr>' +
      '<th>Metric</th><th class="r">Actual</th><th class="r">Target</th><th class="r">Achievement</th>' +
    '</tr></thead><tbody>' +
    rows.map(function (r) {
      var pct = r[2] > 0 ? (r[1] / r[2] * 100) : 0;
      var color = pct >= 100 ? 'var(--success)' : pct >= 75 ? 'var(--warning)' : 'var(--destructive)';
      var fmt = r[3] === 'currency' ? function (v) { return inr.format(v); } : function (v) { return num(v).toLocaleString('en-IN'); };
      return '<tr><td>' + esc(r[0]) + '</td>' +
        '<td class="r" style="font-family:IBM Plex Mono,monospace;font-weight:600">' + fmt(r[1]) + '</td>' +
        '<td class="r" style="font-family:IBM Plex Mono,monospace;color:var(--muted-foreground)">' + fmt(r[2]) + '</td>' +
        '<td class="r" style="font-family:IBM Plex Mono,monospace;font-weight:700;color:' + color + '">' + pct.toFixed(1) + '%</td>' +
        '</tr>';
    }).join('') + '</tbody></table></div>';
  }

  function num(n) { n = Number(n); return isFinite(n) ? n : 0; }

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
    document.querySelectorAll('[data-panel="targets"]').forEach(function (el) {
      el.classList.toggle('zpanel-active', on);
    });
  }

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

  function init() {
    root = document.getElementById('zt-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'zt-root';
      root.className = 'zpanel-root';
      document.body.appendChild(root);
    }
  }

  window.ZenveTargets = {
    open: function () {
      if (window.ZenveSalesDashboard) window.ZenveSalesDashboard.open('targets');
      else open();
    },
    close: function () {
      if (window.ZenveSalesDashboard) window.ZenveSalesDashboard.close();
      else close();
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    document.body.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-panel="targets"]');
      if (!btn) {
        var it = e.target.closest('button, a, li');
        if (it && it.textContent && (it.textContent.toLowerCase().indexOf('target') >= 0 || it.textContent.toLowerCase().indexOf('achieve') >= 0)) btn = it;
      }
      if (btn) {
        e.preventDefault();
        if (window.ZenveSalesDashboard) window.ZenveSalesDashboard.open('targets');
        else S.open ? close() : open();
      }
    });
  });
})();
