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
    { id: 'dashboard',   label: 'Executive Dashboard', icon: '🏛️', hash: '#executive-dashboard', badge: 'All Systems Live', title: 'Executive Overview & Enterprise Vitals', sub: 'High-level executive metrics across veterinary care, pharmacy, diagnostics, and commerce' },
    { id: 'ceo-control', label: 'CEO Control Center',  icon: '👔', hash: '#ceo-control-center',   badge: 'Strategic OKRs',   title: 'CEO Strategic Command & Governance', sub: 'Consolidated performance pacing, capital allocation, board metrics, and expansion roadmaps' },
    { id: 'overview',    label: 'Business Overview',   icon: '📊', hash: '#business-overview',    badge: 'Consolidated P&L', title: 'Business Overview & Segment Economics', sub: 'Multi-entity profit margins, geographic revenue distribution, and unit economics' },
    { id: 'kpi',         label: 'KPI Dashboard',       icon: '🎯', hash: '#kpi-dashboard',        badge: '36 Master KPIs',   title: 'Master Enterprise KPI Scorecard', sub: 'Balanced scorecard covering financial, clinical quality, customer sentiment, and logistics' }
  ];

  var S = {
    open: false,
    tab: 'dashboard'
  };

  var root = null;

  function tabFromHash(hash) {
    if (!hash) return null;
    var h = (hash.startsWith('#') ? hash.slice(1) : hash).toLowerCase();
    if (h.indexOf('report') >= 0 || h.indexOf('alert') >= 0 || h.indexOf('vendor') >= 0 || h.indexOf('customer') >= 0 || h.indexOf('doctor') >= 0 || h.indexOf('ai') >= 0) {
      return null;
    }
    if (h === 'executive-dashboard' || h === 'executive' || h === 'exec-dashboard') return 'dashboard';
    if (h === 'ceo-control-center' || h === 'ceo-control' || h === 'ceo') return 'ceo-control';
    if (h === 'business-overview' || h === 'business') return 'overview';
    if (h === 'kpi-dashboard' || h === 'kpi' || h === 'kpis') return 'kpi';
    return null;
  }

  function tabFromText(txt) {
    if (!txt) return null;
    var raw = txt.replace(/\s+/g, ' ').trim().toLowerCase();
    if (raw.indexOf('report') >= 0 || raw.indexOf('alert') >= 0 || raw.indexOf('vendor') >= 0 || raw.indexOf('doctor') >= 0 || raw.indexOf('ai') >= 0) return null;

    if (raw === 'executive dashboard' || raw === 'executive') return 'dashboard';
    if (raw === 'ceo control center' || raw === 'ceo control') return 'ceo-control';
    if (raw === 'business overview') return 'overview';
    if (raw === 'kpi dashboard' || raw === 'kpis') return 'kpi';
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
        kpiHtml('Consolidated Revenue (MTD)', '₹1.84 Crore', '+18.4% YoY', 'up', 'On track for ₹2.1 Cr target', '💰'),
        kpiHtml('Gross Profit Margin', '41.6%', '+2.1% MoM', 'up', 'Enhanced pharmacy formulary mix', '📈'),
        kpiHtml('Active Healthcare Members', '18,450 Pets', '+1,240 this month', 'up', 'Retained 94.2% cohort', '🐾'),
        kpiHtml('Operating EBITDA', '₹38.2 Lakh', '20.7% margin', 'up', '+₹4.2L ahead of budget', '⚡'),
        kpiHtml('Clinical Consultations', '4,820 Consults', '99.2% fulfillment', 'up', 'Across 14 veterinary centers', '👨‍⚕️'),
        kpiHtml('Blended Customer CAC', '₹412', '-14.6% vs Q2', 'up', 'High organic pet parent referrals', '🎯'),
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
            '<tbody>',
              '<tr>',
                '<td><strong>Veterinary Clinical Services</strong></td>',
                '<td>₹64,20,000</td>',
                '<td><span class="zexec-badge success">106.2%</span></td>',
                '<td>54.2%</td>',
                '<td>4,820 Consults</td>',
                '<td><span class="zexec-badge success">Optimal Pacing</span></td>',
              '</tr>',
              '<tr>',
                '<td><strong>Pet Pharmacy & Formularies</strong></td>',
                '<td>₹52,80,000</td>',
                '<td><span class="zexec-badge success">102.4%</span></td>',
                '<td>38.8%</td>',
                '<td>8,920 Rx Fulfilled</td>',
                '<td><span class="zexec-badge success">Expanding</span></td>',
              '</tr>',
              '<tr>',
                '<td><strong>Pet Products & Nutrition</strong></td>',
                '<td>₹39,50,000</td>',
                '<td><span class="zexec-badge info">98.5%</span></td>',
                '<td>32.4%</td>',
                '<td>6,410 Deliveries</td>',
                '<td><span class="zexec-badge info">Normal</span></td>',
              '</tr>',
              '<tr>',
                '<td><strong>Diagnostics & Advanced Lab</strong></td>',
                '<td>₹18,40,000</td>',
                '<td><span class="zexec-badge success">112.0%</span></td>',
                '<td>62.5%</td>',
                '<td>1,980 Tests</td>',
                '<td><span class="zexec-badge success">High Margin</span></td>',
              '</tr>',
              '<tr>',
                '<td><strong>Hospital Inpatient & Surgery</strong></td>',
                '<td>₹9,10,000</td>',
                '<td><span class="zexec-badge warning">94.0%</span></td>',
                '<td>48.0%</td>',
                '<td>142 Surgeries</td>',
                '<td><span class="zexec-badge warning">Capacity Constrained</span></td>',
              '</tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderCeoControlCenter() {
    return [
      '<div class="zexec-kpi-grid">',
        kpiHtml('Enterprise Run Rate (ARR)', '₹22.1 Crore', '+24.5% YoY', 'up', 'On course for Series A plan', '🚀'),
        kpiHtml('Cash Runway & Reserves', '26 Months', '₹8.4 Cr in liquid treasuries', 'up', 'Net cash flow positive', '🏦'),
        kpiHtml('Strategic OKR Completion', '88.4%', '22 of 25 Key Results on track', 'up', 'Q3 execution cycle', '🎯'),
        kpiHtml('Executive Decisions Pending', '2 Items', 'Requires board sign-off', 'warn', 'Warehouse lease & CT Scanner', '⚖️'),
      '</div>',

      '<div class="zexec-card">',
        '<div class="zexec-card-head">',
          '<div>',
            '<h3 class="zexec-card-title">FY25-26 Strategic OKR Tracker</h3>',
            '<p class="zexec-card-sub">Key quarterly milestones tracked directly by the Office of the CEO</p>',
          '</div>',
          '<button class="zexec-btn" onclick="alert(\'Downloading OKR Executive Packet...\')">Export OKR Brief</button>',
        '</div>',
        '<div class="zexec-table-wrap">',
          '<table class="zexec-table">',
            '<thead>',
              '<tr>',
                '<th>Strategic Objective</th>',
                '<th>Executive Owner</th>',
                '<th>Current Progress</th>',
                '<th>Quarterly Target</th>',
                '<th>Confidence Score</th>',
                '<th>Status</th>',
              '</tr>',
            '</thead>',
            '<tbody>',
              '<tr>',
                '<td><strong>Expand 60-Min Veterinary Delivery in NCR</strong></td>',
                '<td>VP Logistics</td>',
                '<td>8 Hubs Live (80%)</td>',
                '<td>10 Micro-hubs</td>',
                '<td>0.92</td>',
                '<td><span class="zexec-badge success">On Schedule</span></td>',
              '</tr>',
              '<tr>',
                '<td><strong>Launch Central Diagnostic Pathology Lab</strong></td>',
                '<td>Chief Medical Officer</td>',
                '<td>Equipment Installed (95%)</td>',
                '<td>NABL Accreditation</td>',
                '<td>0.95</td>',
                '<td><span class="zexec-badge success">Final Audit</span></td>',
              '</tr>',
              '<tr>',
                '<td><strong>Zenve Pet Care Mobile App v3.0 Release</strong></td>',
                '<td>Head of Product</td>',
                '<td>Beta Testing (70%)</td>',
                '<td>Zero-click Rx Reorders</td>',
                '<td>0.85</td>',
                '<td><span class="zexec-badge info">In Sprint 14</span></td>',
              '</tr>',
              '<tr>',
                '<td><strong>Enterprise B2B Kennel Supply Partnerships</strong></td>',
                '<td>Head of Growth</td>',
                '<td>₹42L Contracts Signed (60%)</td>',
                '<td>₹70L Quarterly Gross</td>',
                '<td>0.78</td>',
                '<td><span class="zexec-badge warning">Needs Acceleration</span></td>',
              '</tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderBusinessOverview() {
    return [
      '<div class="zexec-kpi-grid">',
        kpiHtml('Active Operating Hubs', '14 Locations', 'Bengaluru, Mumbai, Delhi', 'up', '100% operational uptime', '📍'),
        kpiHtml('Network Doctors & Staff', '186 Personnel', '34 Veterinarians, 42 Vet Nurses', 'up', 'Staff satisfaction 91%', '👥'),
        kpiHtml('Avg Basket Order Value', '₹1,940', '+8.2% YoY', 'up', 'Multimodal service bundling', '🛒'),
        kpiHtml('Digital App Orders', '74.2%', 'Mobile app first strategy', 'up', 'Android 48%, iOS 26%', '📱'),
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
            '<tbody>',
              '<tr>',
                '<td><strong>Bengaluru Urban</strong></td>',
                '<td>₹94,50,000</td>',
                '<td>6 Flagships + 2 Hubs</td>',
                '<td>10,240 Pets</td>',
                '<td>+21.4%</td>',
                '<td><span class="zexec-badge success">#1 Market Leader</span></td>',
              '</tr>',
              '<tr>',
                '<td><strong>Mumbai Metropolitan (MMR)</strong></td>',
                '<td>₹52,10,000</td>',
                '<td>3 Clinics + 1 Hub</td>',
                '<td>5,180 Pets</td>',
                '<td>+17.8%</td>',
                '<td><span class="zexec-badge success">Strong Growth</span></td>',
              '</tr>',
              '<tr>',
                '<td><strong>Delhi NCR & Gurgaon</strong></td>',
                '<td>₹28,40,000</td>',
                '<td>2 Clinics + 1 Hub</td>',
                '<td>2,450 Pets</td>',
                '<td>+29.2%</td>',
                '<td><span class="zexec-badge info">Fastest Expanding</span></td>',
              '</tr>',
              '<tr>',
                '<td><strong>Hyderabad (Emerging)</strong></td>',
                '<td>₹9,00,000</td>',
                '<td>1 Flagship Center</td>',
                '<td>580 Pets</td>',
                '<td>+44.0%</td>',
                '<td><span class="zexec-badge info">Pilot Phase</span></td>',
              '</tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderKpiDashboard() {
    return [
      '<div class="zexec-kpi-grid">',
        kpiHtml('Operating Efficiency Ratio', '68.4%', 'Target < 72%', 'up', 'Reduced logistics dispatch overhead', '⚙️'),
        kpiHtml('Clinical NPS Rating', '88 / 100', 'Top decile in healthcare', 'up', 'Post-treatment follow-up 98%', '⭐'),
        kpiHtml('Inventory Turnover', '8.4x / Year', 'Zero stockout incidents', 'up', 'Safety stock algorithm active', '📦'),
        kpiHtml('Pet Parent Retention (12M)', '82.6%', 'Cohort 2024 vintage', 'up', 'Subscription plan expansion', '🔄'),
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
            '<tbody>',
              '<tr>',
                '<td><strong>Financial</strong></td>',
                '<td>Net Profit Margin</td>',
                '<td>14.6%</td>',
                '<td>12.5%</td>',
                '<td>+2.1%</td>',
                '<td><span class="zexec-badge success">Exceeding</span></td>',
              '</tr>',
              '<tr>',
                '<td><strong>Financial</strong></td>',
                '<td>Accounts Receivable Days (DSO)</td>',
                '<td>18 Days</td>',
                '<td>21 Days</td>',
                '<td>-3 Days</td>',
                '<td><span class="zexec-badge success">Healthy</span></td>',
              '</tr>',
              '<tr>',
                '<td><strong>Clinical Quality</strong></td>',
                '<td>Post-Op Recovery Complication Rate</td>',
                '<td>0.28%</td>',
                '<td>< 0.50%</td>',
                '<td>-0.22%</td>',
                '<td><span class="zexec-badge success">Gold Standard</span></td>',
              '</tr>',
              '<tr>',
                '<td><strong>Clinical Quality</strong></td>',
                '<td>Consultation Wait-Time SLA (< 10 min)</td>',
                '<td>92.4%</td>',
                '<td>95.0%</td>',
                '<td>-2.6%</td>',
                '<td><span class="zexec-badge warning">In Progress</span></td>',
              '</tr>',
              '<tr>',
                '<td><strong>Customer</strong></td>',
                '<td>Customer Lifetime Value (LTV)</td>',
                '<td>₹18,400</td>',
                '<td>₹16,500</td>',
                '<td>+₹1,900</td>',
                '<td><span class="zexec-badge success">Growing</span></td>',
              '</tr>',
              '<tr>',
                '<td><strong>Operations</strong></td>',
                '<td>60-Min Delivery On-Time Rate</td>',
                '<td>96.8%</td>',
                '<td>96.0%</td>',
                '<td>+0.8%</td>',
                '<td><span class="zexec-badge success">Optimal</span></td>',
              '</tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function getActiveTabConfig() {
    for (var i = 0; i < TABS.length; i++) {
      if (TABS[i].id === S.tab) return TABS[i];
    }
    return TABS[0];
  }

  function renderTabsBar() {
    return TABS.map(function (t) {
      var isActive = t.id === S.tab;
      return [
        '<button type="button" class="zexec-tab ' + (isActive ? 'active' : '') + '" data-tab="' + t.id + '">',
          '<span>' + t.icon + '</span>',
          '<span>' + esc(t.label) + '</span>',
          '<span class="zexec-tab-badge">' + esc(t.badge) + '</span>',
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

    var closeBtn = root.querySelector('#zexec-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        close();
      });
    }
  }

  function switchTab(tid) {
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
    if (!root) {
      root = document.createElement('div');
      root.id = 'zexec-root';
      document.body.appendChild(root);
    }
    if (tabId) S.tab = tabId;
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

  window.ZenveExecutiveDashboard = {
    open: open,
    close: close,
    switchTab: switchTab
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initInterception);
  } else {
    initInterception();
  }
})();
