/* =====================================================================
   Zenve BI — Executive Dashboard & CEO Control Center Suite
   Subdomains (4):
     1. Executive Dashboard (#executive-dashboard / #executive)
     2. CEO Control Center   (#ceo-control-center)
     3. Business Overview    (#business-overview)
     4. KPI Dashboard        (#kpi-dashboard)
   ===================================================================== */

(function () {
  'use strict';

  function esc(s) {
    if (s == null) return '';
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  var TABS = [
    { id: 'dashboard',   label: 'Executive Dashboard', icon: '🏛️', hash: '#overview', badge: '', title: 'Zenve Executive Control Center', sub: 'Complete business intelligence for healthier, happier pets across all healthcare and commerce operations' },
    { id: 'ceo-control', label: 'CEO Control Center',  icon: '👔', hash: '#ceo-control-center',   badge: '', title: 'CEO Strategic Command & Governance', sub: 'Strategic enterprise OKRs, multi-entity performance pacing, capital allocation decisions, and risk governance sentinel' },
    { id: 'overview',    label: 'Business Overview',   icon: '📊', hash: '#business-overview',    badge: '', title: 'Business Overview & Segment Economics', sub: 'Multi-entity profit margins, geographic revenue distribution, and unit economics' },
    { id: 'kpi',         label: 'KPI Dashboard',       icon: '🎯', hash: '#kpi-dashboard',        badge: '', title: 'Master Enterprise KPI Scorecard', sub: 'Balanced scorecard covering financial, clinical quality, customer sentiment, and logistics' }
  ];

  var S = {
    open: false,
    tab: 'ceo-control'
  };

  var root = null;

  function redirectToHomeDashboard() {
    close();
    ['#zexec-root', '#zcust-root', '#zclinics-root', '#zpharma-root', '#zsales-root', '#zsettings-root'].forEach(function (sel) {
      var node = document.querySelector(sel);
      if (node) node.style.display = 'none';
    });
    document.documentElement.classList.remove('zexec-locked');
    document.body.classList.remove('zexec-locked');

    if (window.location.hash && window.location.hash !== '#' && window.location.hash !== '#overview') {
      try {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      } catch (err) {
        window.location.hash = '';
      }
    }

    var homeEl = document.getElementById('overview') || document.querySelector('main');
    if (homeEl) {
      homeEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function tabFromHash(hash) {
    if (!hash) return null;
    var h = (hash.startsWith('#') ? hash.slice(1) : hash).toLowerCase();
    if (h.indexOf('report') >= 0 || h.indexOf('alert') >= 0 || h.indexOf('vendor') >= 0 || h.indexOf('customer') >= 0 || h.indexOf('doctor') >= 0 || h.indexOf('ai') >= 0) {
      return null;
    }
    if (h === 'ceo-control-center' || h === 'ceo-control' || h === 'ceo' || h.indexOf('ceo') >= 0) return 'ceo-control';
    if (h === 'business-overview' || h === 'business') return 'overview';
    if (h === 'kpi-dashboard' || h === 'kpi' || h === 'kpis') return 'kpi';
    if (h === 'executive-dashboard' || h === 'executive' || h === 'exec-dashboard' || h === 'overview') {
      redirectToHomeDashboard();
      return null;
    }
    return null;
  }

  function tabFromText(txt) {
    if (!txt) return null;
    var raw = txt.replace(/\s+/g, ' ').trim().toLowerCase();
    if (raw.indexOf('report') >= 0 || raw.indexOf('alert') >= 0 || raw.indexOf('vendor') >= 0 || raw.indexOf('doctor') >= 0 || raw.indexOf('ai') >= 0) return null;

    if (raw.indexOf('ceo control center') >= 0 || raw.indexOf('ceo control') >= 0 || raw === 'ceo') return 'ceo-control';
    if (raw.indexOf('business overview') >= 0) return 'overview';
    if (raw.indexOf('kpi dashboard') >= 0 || raw === 'kpis') return 'kpi';
    if (raw === 'executive dashboard' || raw === 'executive') return 'dashboard';
    return null;
  }

  function kpiHtml(label, val, delta, trend, subtext, icon) {
    return [
      '<div class="zexec-kpi">',
        '<div class="zexec-kpi-top">',
          '<span class="zexec-kpi-label">' + esc(label) + '</span>',
          '<span class="zexec-kpi-icon">' + esc(icon || '🏛️') + '</span>',
        '</div>',
        '<div class="zexec-kpi-val">' + esc(val) + '</div>',
        '<div class="zexec-kpi-bottom">',
          '<span class="zexec-delta ' + (trend === 'up' ? 'up' : trend === 'down' ? 'down' : 'warn') + '">' + (trend === 'up' ? '↑ ' : trend === 'down' ? '↓ ' : '• ') + esc(delta) + '</span>',
          '<span class="zexec-subtext">' + esc(subtext) + '</span>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderExecutiveDashboard() {
    return [
      '<div class="zexec-kpi-grid">',
        kpiHtml('Consolidated Revenue (MTD)', '₹0', '0.0% YoY', 'neutral', 'No records recorded', '💰'),
        kpiHtml('Gross Profit Margin', '0.0%', '0.0% MoM', 'neutral', 'No records recorded', '📈'),
        kpiHtml('Active Healthcare Members', '0', '0 this month', 'neutral', 'No records recorded', '🐾'),
        kpiHtml('Operating EBITDA', '₹0', '0.0% margin', 'neutral', 'No records recorded', '⚡'),
        kpiHtml('Clinical Consultations', '0', '0.0% fulfillment', 'neutral', 'No records recorded', '👨‍⚕️'),
        kpiHtml('Blended Customer CAC', '₹0', '0.0% vs benchmark', 'neutral', 'No records recorded', '🎯'),
      '</div>',

      '<div class="zexec-card">',
        '<div class="zexec-card-head">',
          '<div>',
            '<h3 class="zexec-card-title">Business Unit Financial Contribution</h3>',
            '<p class="zexec-card-sub">MTD performance breakdown across clinical, pharmaceutical, commerce, and diagnostic segments</p>',
          '</div>',
          '<span class="zexec-badge success">Audit Certified</span>',
        '</div>',
        '<div class="zexec-table-wrap">',
          '<table class="zexec-table">',
            '<thead>',
              '<tr>',
                '<th>Business Segment</th>',
                '<th>MTD Revenue</th>',
                '<th>Target Pacing</th>',
                '<th>Gross Margin</th>',
                '<th>Active Volume</th>',
                '<th>Segment Health</th>',
              '</tr>',
            '</thead>',
            '<tbody><tr><td colspan="100%" style="text-align:center;padding:28px;color:#94a3b8;">No records found</td></tr></tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderCeoControlCenter() {
    var approved = S.approvedDecisions || {};

    return [
      '<div class="zexec-kpi-grid">',
        kpiHtml('Consolidated Run Rate (ARR)', '₹0', '0.0% YoY', 'neutral', 'No records recorded', '🚀'),
        kpiHtml('Operating EBITDA Run Rate', '0.0%', '0.0% QoQ', 'neutral', '₹0 EBITDA run-rate', '📈'),
        kpiHtml('Liquid Treasury & Runway', '--', '₹0 in treasuries', 'neutral', 'No records recorded', '🏦'),
        kpiHtml('Board OKR Execution', '0.0%', '0 of 0 On Track', 'neutral', 'No active cycle', '🎯'),
        kpiHtml('Enterprise Headcount', '0 Staff', '0 Specialists', 'neutral', 'No records recorded', '👥'),
        kpiHtml('Blended Gross Margin', '0.0%', '0.0% vs benchmark', 'neutral', 'No records recorded', '💎'),
      '</div>',

      /* Master OKRs Tracker */
      '<div class="zexec-card">',
        '<div class="zexec-card-head">',
          '<div>',
            '<h3 class="zexec-card-title">Master Board OKR Execution Matrix (FY25-26)</h3>',
            '<p class="zexec-card-sub">Key strategic objectives and quarterly milestones monitored directly by the Office of the CEO</p>',
          '</div>',
          '<div style="display:flex;gap:8px;">',
            '<button class="zexec-btn" onclick="alert(\'Downloading OKR Executive Packet (PDF)...\')">📑 Export OKR Brief</button>',
            '<button class="zexec-btn primary" onclick="alert(\'Syncing OKR milestones with Enterprise Project Management Suite...\')">🔄 Sync Status</button>',
          '</div>',
        '</div>',
        '<div class="zexec-table-wrap">',
          '<table class="zexec-table">',
            '<thead>',
              '<tr>',
                '<th>Strategic Objective</th>',
                '<th>Executive Lead</th>',
                '<th>Current Pacing</th>',
                '<th>Quarterly Target</th>',
                '<th>Confidence</th>',
                '<th>Status</th>',
              '</tr>',
            '</thead>',
            '<tbody><tr><td colspan="100%" style="text-align:center;padding:28px;color:#94a3b8;">No records found</td></tr></tbody>',
          '</table>',
        '</div>',
      '</div>',

      /* Multi-Entity Business Unit Pacing */
      '<div class="zexec-card">',
        '<div class="zexec-card-head">',
          '<div>',
            '<h3 class="zexec-card-title">Business Unit Contribution & Strategic Pacing</h3>',
            '<p class="zexec-card-sub">Consolidated operational pacing and gross margins across Zenve operating entities</p>',
          '</div>',
          '<span class="zexec-badge success">All 6 Divisions Operating</span>',
        '</div>',
        '<div class="zexec-table-wrap">',
          '<table class="zexec-table">',
            '<thead>',
              '<tr>',
                '<th>Business Segment</th>',
                '<th>Executive Lead</th>',
                '<th>MTD Revenue</th>',
                '<th>Target Pacing</th>',
                '<th>Gross Margin</th>',
                '<th>YoY Growth</th>',
                '<th>Strategic Status</th>',
              '</tr>',
            '</thead>',
            '<tbody><tr><td colspan="100%" style="text-align:center;padding:28px;color:#94a3b8;">No records found</td></tr></tbody>',
          '</table>',
        '</div>',
      '</div>',

      /* 2-Column: Governance Decision Log & Capital Runway Waterfall */
      '<div class="zexec-grid-2">',
        /* Decision Log */
        '<div class="zexec-card">',
          '<div class="zexec-card-head">',
            '<div>',
              '<h3 class="zexec-card-title">Executive Decision & Capital Governance Log</h3>',
              '<p class="zexec-card-sub">Action items requiring Chief Executive Officer or Board authorization</p>',
            '</div>',
            '<span class="zexec-badge info">0 Pending</span>',
          '</div>',
          '<div style="text-align:center;padding:36px;color:#94a3b8;font-size:13px;border:1px dashed #cbd5e1;border-radius:8px;">No pending executive decisions or authorizations</div>',
        '</div>',

        /* Capital Allocation & Treasury Waterfall */
        '<div class="zexec-card">',
          '<div class="zexec-card-head">',
            '<div>',
              '<h3 class="zexec-card-title">Capital Allocation & Treasury Waterfall</h3>',
              '<p class="zexec-card-sub">Liquid balance sheet strength and capital deployment efficiency</p>',
            '</div>',
            '<span class="zexec-badge success">Self-Sustaining</span>',
          '</div>',
          '<div style="display:flex;flex-direction:column;gap:16px;">',
            '<div style="padding:16px;background:#f8fafc;border-radius:10px;border:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;">',
              '<div>',
                '<span style="font-size:12px;color:#64748b;font-weight:600;">Liquid Treasury Reserves</span>',
                '<h2 style="margin:4px 0 0;font-size:24px;font-weight:800;color:#0f172a;">₹0</h2>',
                '<span style="font-size:11px;color:#059669;font-weight:700;">+₹0 Monthly Operational Surplus</span>',
              '</div>',
              '<div style="text-align:right;">',
                '<span class="zexec-badge success" style="font-size:13px;padding:6px 12px;">28 Months Runway</span>',
                '<p style="margin:6px 0 0;font-size:11px;color:#64748b;">Zero Long-Term Debt</p>',
              '</div>',
            '</div>',
            '<table class="zexec-table">',
              '<thead>',
                '<tr>',
                  '<th>Capital Pillar</th>',
                  '<th>Allocation</th>',
                  '<th>Deployed (MTD)</th>',
                  '<th>Solvency Ratio</th>',
                '</tr>',
              '</thead>',
              '<tbody><tr><td colspan="100%" style="text-align:center;padding:28px;color:#94a3b8;">No records found</td></tr></tbody>',
            '</table>',
            '<div style="padding:12px 14px;background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;font-size:12px;color:#1e40af;line-height:1.4;">',
              '<strong>💡 Executive Capital Note:</strong> No active capital allocation or debt records recorded.',
            '</div>',
          '</div>',
        '</div>',
      '</div>',

      /* Enterprise Risk Radar & Early Warning Sentinel */
      '<div class="zexec-card">',
        '<div class="zexec-card-head">',
          '<div>',
            '<h3 class="zexec-card-title">Enterprise Risk Radar & Governance Sentinel</h3>',
            '<p class="zexec-card-sub">Continuous monitoring across veterinary clinical safety, supply chain integrity, regulatory audits, and human capital</p>',
          '</div>',
          '<span class="zexec-badge success">All Vectors Nominal</span>',
        '</div>',
        '<div class="zexec-risk-grid">',
          '<div class="zexec-risk-card">',
            '<div class="zexec-risk-head">',
              '<span>Clinical Quality & Compliance</span>',
              '<span class="zexec-badge success">Nominal</span>',
            '</div>',
            '<div class="zexec-risk-val">0 Open Audits</div>',
            '<p class="zexec-risk-desc">All compliance audits up to date. No pending regulatory reviews.</p>',
          '</div>',
          '<div class="zexec-risk-card">',
            '<div class="zexec-risk-head">',
              '<span>Cold-Chain & Pharmacy</span>',
              '<span class="zexec-badge success">Nominal</span>',
            '</div>',
            '<div class="zexec-risk-val">--</div>',
            '<p class="zexec-risk-desc">No active telemetry alerts recorded.</p>',
          '</div>',
          '<div class="zexec-risk-card">',
            '<div class="zexec-risk-head">',
              '<span>Specialist Retention</span>',
              '<span class="zexec-badge success">Optimal</span>',
            '</div>',
            '<div class="zexec-risk-val">--</div>',
            '<p class="zexec-risk-desc">No staffing variance recorded.</p>',
          '</div>',
          '<div class="zexec-risk-card">',
            '<div class="zexec-risk-head">',
              '<span>Cybersecurity & Records</span>',
              '<span class="zexec-badge success">Secured</span>',
            '</div>',
            '<div class="zexec-risk-val">Secured</div>',
            '<p class="zexec-risk-desc">Electronic records active with standard encryption protocols.</p>',
          '</div>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderBusinessOverview() {
    return [
      '<div class="zexec-kpi-grid">',
        kpiHtml('Active Operating Hubs', '0 Locations', '--', 'neutral', 'No records recorded', '📍'),
        kpiHtml('Network Doctors & Staff', '0 Personnel', '--', 'neutral', 'No records recorded', '👥'),
        kpiHtml('Avg Basket Order Value', '₹0', '0.0% YoY', 'neutral', 'No records recorded', '🛒'),
        kpiHtml('Digital App Orders', '0.0%', '--', 'neutral', 'No records recorded', '📱'),
      '</div>',

      '<div class="zexec-card">',
        '<div class="zexec-card-head">',
          '<div>',
            '<h3 class="zexec-card-title">Geographic Market Share & Economics</h3>',
            '<p class="zexec-card-sub">Metropolitan territory performance and local clinic footprint</p>',
          '</div>',
        '</div>',
        '<div class="zexec-table-wrap">',
          '<table class="zexec-table">',
            '<thead>',
              '<tr>',
                '<th>Metropolitan Market</th>',
                '<th>Monthly Revenue</th>',
                '<th>Clinics / Hubs</th>',
                '<th>Active Pets</th>',
                '<th>MoM Growth</th>',
                '<th>Market Position</th>',
              '</tr>',
            '</thead>',
            '<tbody><tr><td colspan="100%" style="text-align:center;padding:28px;color:#94a3b8;">No records found</td></tr></tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderKpiDashboard() {
    return [
      '<div class="zexec-kpi-grid">',
        kpiHtml('Operating Efficiency Ratio', '0.0%', '--', 'neutral', 'No records recorded', '⚙️'),
        kpiHtml('Clinical NPS Rating', '-- / 100', '--', 'neutral', 'No records recorded', '⭐'),
        kpiHtml('Inventory Turnover', '0.0x / Year', '--', 'neutral', 'No records recorded', '📦'),
        kpiHtml('Pet Parent Retention (12M)', '0.0%', '--', 'neutral', 'No records recorded', '🔄'),
      '</div>',

      '<div class="zexec-card">',
        '<div class="zexec-card-head">',
          '<div>',
            '<h3 class="zexec-card-title">Enterprise Master Scorecard (Balanced KPIs)</h3>',
            '<p class="zexec-card-sub">Holistic performance indicators across Financial, Customer, Internal Process, and Growth</p>',
          '</div>',
          '<button class="zexec-btn" onclick="alert(\'Printing Executive Scorecard PDF...\')">🖨️ Print Scorecard</button>',
        '</div>',
        '<div class="zexec-table-wrap">',
          '<table class="zexec-table">',
            '<thead>',
              '<tr>',
                '<th>Category</th>',
                '<th>Indicator</th>',
                '<th>Actual (MTD)</th>',
                '<th>Target</th>',
                '<th>Variance</th>',
                '<th>Health</th>',
              '</tr>',
            '</thead>',
            '<tbody><tr><td colspan="100%" style="text-align:center;padding:28px;color:#94a3b8;">No records found</td></tr></tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function getActiveTabConfig() {
    for (var i = 0; i < TABS.length; i++) {
      if (TABS[i].id === S.tab) return TABS[i];
    }
    return TABS[1];
  }

  function renderTabsBar() {
    return TABS.map(function (t) {
      var isActive = t.id === S.tab;
      return [
        '<button type="button" class="zexec-tab ' + (isActive ? 'active' : '') + '" data-tab="' + t.id + '">',
          '<span>' + t.icon + '</span>',
          '<span>' + esc(t.label) + '</span>',
          (t.badge ? '<span class="zexec-tab-badge">' + esc(t.badge) + '</span>' : ''),
        '</button>'
      ].join('');
    }).join('');
  }

  function renderBody() {
    switch (S.tab) {
      case 'ceo-control': return renderCeoControlCenter();
      case 'overview':    return renderBusinessOverview();
      case 'kpi':         return renderKpiDashboard();
      case 'dashboard':
      default:            return renderExecutiveDashboard();
    }
  }

  function render() {
    if (!root) return;
    var current = getActiveTabConfig();

    root.innerHTML = [
      '<header class="zexec-head">',
        '<div class="zexec-head-left">',
          '<div class="zexec-title-row">',
            '<h1 class="zexec-title">' + esc(current.title) + '</h1>',
            '<span class="zexec-live-badge"><span class="zexec-pulse-dot"></span> Live Enterprise</span>',
          '</div>',
          '<p class="zexec-sub">' + esc(current.sub) + '</p>',
        '</div>',
        '<div class="zexec-head-actions">',
          '<button class="zexec-btn" onclick="alert(\'Syncing enterprise financials with ERP ledgers...\')">🔄 Sync Ledgers</button>',
          '<button class="zexec-btn primary" onclick="alert(\'Executive Board Brief downloaded (PDF).\')">📊 Download Board Brief</button>',
          '<button class="zexec-btn" id="zexec-close-btn" title="Close Executive Dashboard">✕</button>',
        '</div>',
      '</header>',
      '<nav class="zexec-tabs-bar">',
        renderTabsBar(),
      '</nav>',
      '<div class="zexec-body">',
        renderBody(),
      '</div>'
    ].join('');

    bindEvents();
  }

  function bindEvents() {
    if (!root) return;

    var tabs = root.querySelectorAll('.zexec-tab');
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].addEventListener('click', function () {
        var tid = this.getAttribute('data-tab');
        switchTab(tid);
      });
    }

    var approveBtns = root.querySelectorAll('[data-approve-dec]');
    for (var j = 0; j < approveBtns.length; j++) {
      approveBtns[j].addEventListener('click', function (ev) {
        ev.stopPropagation();
        var decId = this.getAttribute('data-approve-dec');
        S.approvedDecisions = S.approvedDecisions || {};
        S.approvedDecisions[decId] = true;
        render();
      });
    }

    var closeBtn = root.querySelector('#zexec-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        redirectToHomeDashboard();
      });
    }
  }

  function switchTab(tid) {
    if (tid === 'dashboard' || tid === 'home') {
      redirectToHomeDashboard();
      return;
    }
    S.tab = tid;
    var current = getActiveTabConfig();
    if (window.location.hash !== current.hash) {
      try {
        history.replaceState(null, '', current.hash);
      } catch (e) {
        window.location.hash = current.hash;
      }
    }
    render();
    root.scrollTop = 0;
  }

  function open(tabId) {
    if (tabId === 'dashboard' || tabId === 'home') {
      redirectToHomeDashboard();
      return;
    }
    if (!root) {
      root = document.createElement('div');
      root.id = 'zexec-root';
      document.body.appendChild(root);
    }
    if (tabId) S.tab = tabId;
    else if (!S.tab || S.tab === 'dashboard') S.tab = 'ceo-control';
    S.open = true;
    root.style.display = 'block';
    document.documentElement.classList.add('zexec-locked');
    document.body.classList.add('zexec-locked');
    render();
  }

  function close() {
    if (!root) return;
    root.style.display = 'none';
    S.open = false;
    document.documentElement.classList.remove('zexec-locked');
    document.body.classList.remove('zexec-locked');
  }

  function onHashChange() {
    var h = (window.location.hash || '').toLowerCase();
    if (h === '#overview' || h === '#home') {
      redirectToHomeDashboard();
      return;
    }
    var t = tabFromHash(window.location.hash);
    if (t) {
      open(t);
    } else if (S.open && window.location.hash && window.location.hash !== '#') {
      var otherDomains = ['sales', 'operations', 'inventory', 'pharmacy', 'clinics', 'reports', 'alerts', 'settings', 'finance', 'marketing', 'vendors', 'procurement', 'fashion', 'import', 'export', 'subscription', 'customer', 'doctor', 'ai', 'b2b'];
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

      var isSidebar = !!el.closest('aside, [class*="sidebar"]') && !el.closest('#zexec-root');
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
      if (e.key === 'Escape' && S.open) redirectToHomeDashboard();
    });

    window.addEventListener('hashchange', onHashChange);

    if (window.location.hash) {
      var initial = tabFromHash(window.location.hash);
      if (initial) {
        setTimeout(function () { open(initial); }, 150);
      }
    }
  }

  window.ZenveExecutiveDashboard = {
    open: open,
    close: close,
    switchTab: switchTab,
    redirectToHome: redirectToHomeDashboard
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initInterception);
  } else {
    initInterception();
  }
})();
