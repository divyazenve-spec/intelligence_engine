/* =====================================================================
   Zenve BI — Sales Forecast Dashboard
   Sidebar: Revenue & Sales > Sales Forecast
   Self-contained. Projects 3-month revenue using weighted moving average
   with trend, seasonality, and confidence bands. No external libraries.
   ===================================================================== */
(function () {
  'use strict';

  var FALLBACK = '/api/v1/data';
  var STATIC_FALLBACK = '/assets/sample-fallback.json';

  var inr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
  var inrShort = function (n) {
    n = Number(n);
    if (n >= 1e7) return '₹' + (n / 1e7).toFixed(2) + ' Cr';
    if (n >= 1e5) return '₹' + (n / 1e5).toFixed(1) + ' L';
    return '₹' + (n / 1000).toFixed(1) + 'K';
  };

  var MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  /* Seasonal index (pet healthcare demand cycles) */
  var SEASONAL = [0.78, 0.80, 0.95, 0.98, 1.05, 1.08, 1.12, 1.18, 1.15, 1.20, 1.28, 1.35];

  var S = { data: null, horizon: 3, scenario: 'base', open: false };
  var root = null;

  /* ── helpers ─────────────────────────────────────────────────── */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function num(n) { n = Number(n); return isFinite(n) ? n : 0; }

  /* ── build monthly series from sales ────────────────────────── */
  function buildSeries(data) {
    var sales = (data.sales || []).filter(function (s) { return s.status === 'Paid'; });
    var metrics = data.metrics || [];

    var now = new Date();
    var curM = now.getMonth();
    var curY = now.getFullYear();

    /* Build last 12 months of actual revenue */
    var actuals = [];
    for (var i = 11; i >= 0; i--) {
      var mIdx = ((curM - i) % 12 + 12) % 12;
      var yr   = curY - (curM < i ? 1 : 0);
      var mn   = MONTHS[mIdx];
      var rev  = 0;
      sales.forEach(function (s) {
        var d = new Date(s.sold_at || '');
        if (d.getMonth() === mIdx && d.getFullYear() === yr) rev += num(s.amount);
      });
      /* For months with no data, use seasonal baseline */
      actuals.push({ month: mn, idx: mIdx, yr: yr, rev: rev });
    }

    /* Fill zero months with seasonal estimate based on non-zero avg */
    var nonZero = actuals.filter(function (a) { return a.rev > 0; });
    var avgRev  = nonZero.length > 0
      ? nonZero.reduce(function (s, a) { return s + a.rev; }, 0) / nonZero.length
      : 800000;

    actuals.forEach(function (a) {
      if (a.rev === 0) a.rev = Math.round(avgRev * SEASONAL[a.idx]);
    });

    return { actuals: actuals, avgRev: avgRev, curM: curM, curY: curY };
  }

  /* ── weighted moving average forecast ───────────────────────── */
  function forecast(series, horizon, scenario) {
    var actuals = series.actuals;
    var n = actuals.length;

    /* Weights — recent months matter more */
    var weights = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];
    var wTotal  = weights.reduce(function (a, w) { return a + w; }, 0);
    var base    = actuals.reduce(function (s, a, i) { return s + a.rev * weights[i]; }, 0) / wTotal;

    /* Trend: slope of last 6 months */
    var last6 = actuals.slice(-6);
    var slope = 0;
    if (last6.length >= 2) {
      var sx = 0, sy = 0, sxy = 0, sxx = 0, sn = last6.length;
      last6.forEach(function (a, i) { sx += i; sy += a.rev; sxy += i * a.rev; sxx += i * i; });
      slope = (sn * sxy - sx * sy) / (sn * sxx - sx * sx);
    }

    /* Scenario multiplier */
    var mult = scenario === 'bull' ? 1.18 : scenario === 'bear' ? 0.82 : 1.0;

    /* Build forecast points */
    var curM = series.curM;
    var curY = series.curY;
    var points = [];
    for (var i = 1; i <= horizon; i++) {
      var mIdx = (curM + i) % 12;
      var yr   = curY + Math.floor((curM + i) / 12);
      var proj = (base + slope * (n + i - 1)) * SEASONAL[mIdx] * mult;
      proj = Math.max(proj, 0);
      /* Confidence interval widens with horizon */
      var ci = proj * (0.08 + i * 0.04);
      points.push({
        month: MONTHS[mIdx], idx: mIdx, yr: yr,
        proj: Math.round(proj),
        lo:   Math.round(proj - ci),
        hi:   Math.round(proj + ci),
      });
    }
    return points;
  }

  /* ── SVG forecast chart ──────────────────────────────────────── */
  function forecastChart(actuals, projections) {
    var W = 700, H = 220;
    var pad = { l: 62, r: 24, t: 20, b: 36 };
    var iW = W - pad.l - pad.r;
    var iH = H - pad.t - pad.b;

    /* All values to set Y scale */
    var allVals = actuals.map(function (a) { return a.rev; })
      .concat(projections.map(function (p) { return p.hi; }));
    var maxV = Math.max.apply(null, allVals) * 1.1 || 1;
    var minV = 0;

    var totalPts  = actuals.length + projections.length;
    var stepX     = iW / (totalPts - 1);

    function yPos(v) { return pad.t + iH - ((v - minV) / (maxV - minV)) * iH; }
    function xPos(i) { return pad.l + i * stepX; }

    /* Build SVG */
    var html = '<svg class="zp-svg" viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg">';

    /* Grid */
    [0, 0.25, 0.5, 0.75, 1].forEach(function (f) {
      var y = pad.t + iH * (1 - f);
      html += '<line x1="' + pad.l + '" y1="' + y + '" x2="' + (W - pad.r) + '" y2="' + y + '"';
      html += ' stroke="var(--border)" stroke-width="1" stroke-dasharray="3,3"/>';
      html += '<text x="' + (pad.l - 6) + '" y="' + (y + 4) + '" text-anchor="end">' + inrShort(maxV * f) + '</text>';
    });

    /* Forecast band (CI) */
    var bandPts = projections.map(function (p, i) {
      return xPos(actuals.length - 1 + i) + ',' + yPos(p.hi);
    }).concat(projections.map(function (p, i) {
      return xPos(actuals.length - 1 + projections.length - 1 - i) + ',' + yPos(p.lo);
    }));
    /* Include last actual to close the band */
    var lastActX = xPos(actuals.length - 1);
    var lastActY = yPos(actuals[actuals.length - 1].rev);
    html += '<polygon points="' + lastActX + ',' + lastActY + ' ' + bandPts.join(' ') + ' ' + lastActX + ',' + lastActY + '"';
    html += ' fill="rgba(99,102,241,0.12)" />';

    /* Actual area fill */
    var actualArea = actuals.map(function (a, i) { return xPos(i) + ',' + yPos(a.rev); }).join(' ');
    html += '<polygon points="' + pad.l + ',' + (pad.t + iH) + ' ' + actualArea + ' ' + xPos(actuals.length - 1) + ',' + (pad.t + iH) + '"';
    html += ' fill="rgba(14,165,233,0.08)"/>';

    /* Actual line */
    var actualPath = actuals.map(function (a, i) { return (i === 0 ? 'M' : 'L') + xPos(i) + ' ' + yPos(a.rev); }).join(' ');
    html += '<path d="' + actualPath + '" fill="none" stroke="#0ea5e9" stroke-width="2.5" stroke-linejoin="round"/>';

    /* Connector dashed line */
    var lastX = xPos(actuals.length - 1);
    var lastY = yPos(actuals[actuals.length - 1].rev);
    var firstProjX = xPos(actuals.length);
    var firstProjY = yPos(projections[0].proj);
    html += '<line x1="' + lastX + '" y1="' + lastY + '" x2="' + firstProjX + '" y2="' + firstProjY + '"';
    html += ' stroke="#6366f1" stroke-width="2" stroke-dasharray="5,3"/>';

    /* Forecast line */
    var projPath = projections.map(function (p, i) {
      return (i === 0 ? 'M' : 'L') + xPos(actuals.length - 1 + i) + ' ' + yPos(p.proj);
    }).join(' ');
    html += '<path d="' + projPath + '" fill="none" stroke="#6366f1" stroke-width="2.5" stroke-linejoin="round"/>';

    /* Hi/Lo lines */
    var hiPath = projections.map(function (p, i) {
      return (i === 0 ? 'M' : 'L') + xPos(actuals.length - 1 + i) + ' ' + yPos(p.hi);
    }).join(' ');
    var loPath = projections.map(function (p, i) {
      return (i === 0 ? 'M' : 'L') + xPos(actuals.length - 1 + i) + ' ' + yPos(p.lo);
    }).join(' ');
    html += '<path d="' + hiPath + '" fill="none" stroke="rgba(99,102,241,0.4)" stroke-width="1" stroke-dasharray="2,2"/>';
    html += '<path d="' + loPath + '" fill="none" stroke="rgba(99,102,241,0.4)" stroke-width="1" stroke-dasharray="2,2"/>';

    /* Forecast divider */
    html += '<line x1="' + lastX + '" y1="' + pad.t + '" x2="' + lastX + '" y2="' + (pad.t + iH) + '"';
    html += ' stroke="var(--border)" stroke-width="1" stroke-dasharray="4,3"/>';
    html += '<text x="' + (lastX + 4) + '" y="' + (pad.t + 10) + '"';
    html += ' font-size="9" fill="var(--primary)">FORECAST →</text>';

    /* Actual dots */
    actuals.forEach(function (a, i) {
      html += '<circle cx="' + xPos(i) + '" cy="' + yPos(a.rev) + '" r="3" fill="#0ea5e9"/>';
    });

    /* Forecast dots */
    projections.forEach(function (p, i) {
      html += '<circle cx="' + xPos(actuals.length - 1 + i) + '" cy="' + yPos(p.proj) + '" r="4"';
      html += ' fill="#6366f1" stroke="var(--card)" stroke-width="2"/>';
    });

    /* X labels — show every other actual + all forecast */
    actuals.forEach(function (a, i) {
      if (i % 3 === 0 || i === actuals.length - 1) {
        html += '<text x="' + xPos(i) + '" y="' + (H - 6) + '" text-anchor="middle">' + a.month + '</text>';
      }
    });
    projections.forEach(function (p, i) {
      html += '<text x="' + xPos(actuals.length - 1 + i) + '" y="' + (H - 6) + '"';
      html += ' text-anchor="middle" fill="var(--primary)" font-weight="700">' + p.month + '</text>';
    });

    html += '</svg>';
    return html;
  }

  /* ── render ──────────────────────────────────────────────────── */
  function render() {
    if (!root) return;
    if (!S.data) { root.innerHTML = '<div class="zp-body"><div class="zp-msg">Loading…</div></div>'; return; }

    var series = buildSeries(S.data);
    var proj   = forecast(series, S.horizon, S.scenario);

    var totalForecast = proj.reduce(function (a, p) { return a + p.proj; }, 0);
    var last3actual   = series.actuals.slice(-3).reduce(function (a, m) { return a + m.rev; }, 0);
    var growthPct     = last3actual > 0 ? ((totalForecast - last3actual) / last3actual * 100).toFixed(1) : '0.0';
    var isGrowth      = num(growthPct) >= 0;

    var SCEN_LABELS = { base: 'Base Case', bull: 'Optimistic', bear: 'Conservative' };
    var SCEN_ICONS  = { base: '📊', bull: '🚀', bear: '🛡️' };

    root.innerHTML = [
      '<div class="zp-head">',
        '<div class="zp-head-left">',
          '<h1 class="zp-title">🔮 Sales Forecast</h1>',
          '<p class="zp-sub">Weighted moving-average with seasonal index · ' + SCEN_LABELS[S.scenario] + '</p>',
        '</div>',
        '<div class="zp-head-actions">',

          /* horizon */
          '<div class="zp-seg" id="zfc-horizon">',
            '<button class="' + (S.horizon === 1 ? 'on' : '') + '" data-h="1">1M</button>',
            '<button class="' + (S.horizon === 3 ? 'on' : '') + '" data-h="3">3M</button>',
            '<button class="' + (S.horizon === 6 ? 'on' : '') + '" data-h="6">6M</button>',
          '</div>',

          /* scenario */
          '<div class="zp-seg" id="zfc-scen">',
            '<button class="' + (S.scenario === 'bear' ? 'on' : '') + '" data-s="bear">🛡 Bear</button>',
            '<button class="' + (S.scenario === 'base' ? 'on' : '') + '" data-s="base">📊 Base</button>',
            '<button class="' + (S.scenario === 'bull' ? 'on' : '') + '" data-s="bull">🚀 Bull</button>',
          '</div>',

          '<button class="zp-btn" id="zfc-close">✕ Close</button>',
        '</div>',
      '</div>',

      '<div class="zp-body">',

        /* KPIs */
        '<div class="zp-kpis">',
          kpi('Forecast (' + S.horizon + 'M Total)', inrShort(totalForecast), (isGrowth ? '↑' : '↓') + ' ' + Math.abs(growthPct) + '% vs prior period', isGrowth ? 'up' : 'down'),
          kpi('Month 1 Projection', inrShort(proj[0] ? proj[0].proj : 0),
            proj[0] ? inrShort(proj[0].lo) + ' – ' + inrShort(proj[0].hi) + ' confidence' : '', ''),
          kpi('Scenario', SCEN_ICONS[S.scenario] + ' ' + SCEN_LABELS[S.scenario],
            S.scenario === 'bull' ? '+18% growth assumption' : S.scenario === 'bear' ? '-18% conservative' : 'Trend-based neutral', ''),
          kpi('Seasonal Factor', (SEASONAL[(series.curM + 1) % 12] * 100).toFixed(0) + '%', 'Next month index', ''),
        '</div>',

        /* chart */
        '<div class="zp-card zp-panel" style="margin-top:12px;">',
          '<div class="zp-ph">',
            '<div>',
              '<h3>Revenue Forecast Chart</h3>',
              '<small>12 months actual + ' + S.horizon + ' months projected (with confidence band)</small>',
            '</div>',
            '<div class="zfc-legend">',
              '<span><span class="zfc-dot" style="background:#0ea5e9"></span>Actual</span>',
              '<span><span class="zfc-dot" style="background:#6366f1"></span>Forecast</span>',
              '<span><span class="zfc-dot" style="background:rgba(99,102,241,0.2)"></span>CI Band</span>',
            '</div>',
          '</div>',
          '<div class="zp-chartwrap">' + forecastChart(series.actuals, proj) + '</div>',
        '</div>',

        /* detail table + insights */
        '<div class="zp-grid zp-g2" style="margin-top:12px;">',

          '<div class="zp-card zp-panel">',
            '<div class="zp-ph"><h3>Forecast Detail</h3></div>',
            '<div class="zp-tbl-wrap"><table class="zp-tbl"><thead><tr>',
              '<th>Month</th><th class="r">Low</th><th class="r">Forecast</th><th class="r">High</th><th class="r">Growth</th>',
            '</tr></thead><tbody>',
            proj.map(function (p, i) {
              var prev = i === 0 ? series.actuals[series.actuals.length - 1].rev : proj[i - 1].proj;
              var g = prev > 0 ? ((p.proj - prev) / prev * 100).toFixed(1) : '0.0';
              var gColor = num(g) >= 0 ? 'var(--success)' : 'var(--destructive)';
              return '<tr>' +
                '<td style="font-weight:600">' + esc(p.month) + ' ' + p.yr + '</td>' +
                '<td class="r" style="color:var(--muted-foreground);font-family:IBM Plex Mono,monospace">' + inrShort(p.lo) + '</td>' +
                '<td class="r" style="font-weight:700;font-family:IBM Plex Mono,monospace">' + inrShort(p.proj) + '</td>' +
                '<td class="r" style="color:var(--muted-foreground);font-family:IBM Plex Mono,monospace">' + inrShort(p.hi) + '</td>' +
                '<td class="r" style="font-family:IBM Plex Mono,monospace;color:' + gColor + ';font-weight:700">' + (num(g) >= 0 ? '+' : '') + g + '%</td>' +
                '</tr>';
            }).join('') +
            '</tbody></table></div>',
          '</div>',

          '<div class="zp-card zp-panel">',
            '<div class="zp-ph"><h3>Forecast Insights</h3></div>',
            insightsPanel(series, proj, S.scenario),
          '</div>',

        '</div>',
      '</div>',
    ].join('');

    /* events */
    var h = root.querySelector('#zfc-horizon');
    if (h) h.addEventListener('click', function (e) {
      var btn = e.target.closest('button[data-h]');
      if (btn) { S.horizon = parseInt(btn.dataset.h); render(); }
    });
    var sc = root.querySelector('#zfc-scen');
    if (sc) sc.addEventListener('click', function (e) {
      var btn = e.target.closest('button[data-s]');
      if (btn) { S.scenario = btn.dataset.s; render(); }
    });
    var closeBtn = root.querySelector('#zfc-close');
    if (closeBtn) closeBtn.addEventListener('click', close);
  }

  function kpi(label, value, delta, trend) {
    return '<div class="zp-card zp-kpi">' +
      '<div class="zp-lbl">' + esc(label) + '</div>' +
      '<div class="zp-val">' + esc(value) + '</div>' +
      (delta ? '<div class="zp-delta ' + (trend || '') + '">' + esc(delta) + '</div>' : '') +
      '</div>';
  }

  function insightsPanel(series, proj, scenario) {
    var trend = series.actuals.slice(-3).reduce(function (a, m) { return a + m.rev; }, 0) /
                series.actuals.slice(-6, -3).reduce(function (a, m) { return a + m.rev; }, 0);
    var trendDir = trend >= 1.05 ? 'bullish' : trend >= 0.95 ? 'stable' : 'declining';
    var nextSeasonal = SEASONAL[(series.curM + 1) % 12];

    var insights = [
      {
        icon: trend >= 1.05 ? '📈' : trend >= 0.95 ? '➡️' : '📉',
        title: 'Revenue Trend',
        text: 'Last 3 months vs prior 3: ' + (trend >= 1 ? '+' : '') + ((trend - 1) * 100).toFixed(1) + '%. Trend is ' + trendDir + '.',
        color: trend >= 1.05 ? 'var(--success)' : trend >= 0.95 ? 'var(--warning)' : 'var(--destructive)',
      },
      {
        icon: '🌊',
        title: 'Seasonality',
        text: 'Next month seasonal index: ' + (nextSeasonal * 100).toFixed(0) + '%. Pet healthcare demand peaks in Nov–Dec.',
        color: 'var(--primary)',
      },
      {
        icon: scenario === 'bull' ? '🚀' : scenario === 'bear' ? '🛡️' : '⚖️',
        title: 'Scenario: ' + (scenario === 'bull' ? 'Optimistic' : scenario === 'bear' ? 'Conservative' : 'Base Case'),
        text: scenario === 'bull' ? '+18% uplift applied — assumes strong marketing push, new city expansion.'
            : scenario === 'bear' ? '-18% reduction — accounts for market headwinds, competition.'
            : 'Neutral projection using weighted average of historical data with seasonal adjustment.',
        color: scenario === 'bull' ? 'var(--success)' : scenario === 'bear' ? 'var(--destructive)' : 'var(--muted-foreground)',
      },
      {
        icon: '💡',
        title: 'Recommendation',
        text: proj[0] && proj[0].proj > series.actuals[series.actuals.length - 1].rev
          ? 'Revenue trajectory is positive. Focus on retaining paid users and upselling preventive care plans.'
          : 'Consider promotions and referral programs to counter projected softness in the next period.',
        color: 'var(--foreground)',
      },
    ];

    return insights.map(function (ins) {
      return '<div style="display:flex;gap:12px;padding:10px 0;border-bottom:1px solid var(--border);">' +
        '<div style="font-size:20px;flex-shrink:0;margin-top:2px;">' + ins.icon + '</div>' +
        '<div>' +
          '<div style="font-size:12px;font-weight:700;color:' + ins.color + ';margin-bottom:3px;">' + esc(ins.title) + '</div>' +
          '<div style="font-size:11px;color:var(--muted-foreground);line-height:1.5;">' + esc(ins.text) + '</div>' +
        '</div>' +
      '</div>';
    }).join('');
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
    document.querySelectorAll('[data-panel="forecast"]').forEach(function (el) {
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
    root = document.getElementById('zfc-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'zfc-root';
      root.className = 'zpanel-root';
      document.body.appendChild(root);
    }
  }

  window.ZenveForecast = {
    open: function () {
      if (window.ZenveSalesDashboard) window.ZenveSalesDashboard.open('forecast');
      else open();
    },
    close: function () {
      if (window.ZenveSalesDashboard) window.ZenveSalesDashboard.close();
      else close();
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    document.body.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-panel="forecast"]');
      if (btn) {
        e.preventDefault();
        if (window.ZenveSalesDashboard) window.ZenveSalesDashboard.open('forecast');
        else S.open ? close() : open();
      }
    });
  });
})();
