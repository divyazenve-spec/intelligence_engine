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
    { id: 'dashboard',   label: '← Executive Dashboard (Home)', icon: '🏛️', hash: '#overview', badge: 'Original Home', title: 'Executive Control Center — Zenve BI', sub: 'Return to original home dashboard given at first' },
    { id: 'ceo-control', label: 'CEO Control Center',  icon: '👔', hash: '#ceo-control-center',   badge: 'Strategic OKRs',   title: 'CEO Strategic Command & Governance', sub: 'Consolidated performance pacing, capital allocation, board metrics, and expansion roadmaps' },
    { id: 'overview',    label: 'Business Overview',   icon: '📊', hash: '#business-overview',    badge: 'Consolidated P&L', title: 'Business Overview & Segment Economics', sub: 'Multi-entity profit margins, geographic revenue distribution, and unit economics' },
    { id: 'kpi',         label: 'KPI Dashboard',       icon: '🎯', hash: '#kpi-dashboard',        badge: '36 Master KPIs',   title: 'Master Enterprise KPI Scorecard', sub: 'Balanced scorecard covering financial, clinical quality, customer sentiment, and logistics' }
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
    if (raw === 'executive dashboard' || raw === 'executive' || raw === 'home dashboard' || raw === 'home') return 'home';
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
    var approved = S.approvedDecisions || {};

    return [
      '<div class="zexec-kpi-grid">',
        kpiHtml('Consolidated Run Rate (ARR)', '₹24.8 Crore', '+28.4% YoY', 'up', 'On track for Series A expansion', '🚀'),
        kpiHtml('Operating EBITDA Run Rate', '17.8%', '+2.9% QoQ margin', 'up', '₹4.41 Cr EBITDA run-rate', '📈'),
        kpiHtml('Liquid Treasury & Runway', '28 Months', '₹9.60 Cr in treasuries', 'up', 'Net cash flow +₹18.4L/mo', '🏦'),
        kpiHtml('Board OKR Execution', '94.2%', '19 of 20 Key Results on track', 'up', 'Q3 strategic performance cycle', '🎯'),
        kpiHtml('Enterprise Headcount', '186 Staff', '34 Vets · 42 Nurses', 'up', '98.4% clinician retention', '👥'),
        kpiHtml('Blended Gross Margin', '38.6%', '+2.4% vs LY', 'up', 'Target: 38.0% exceeded', '💎'),
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
            '<tbody>',
              '<tr>',
                '<td><strong>Enterprise Revenue Scale</strong><br><span style="font-size:11px;color:#64748b;">Consolidated group gross revenues</span></td>',
                '<td>CEO / VP Sales</td>',
                '<td>₹51.65L (93.9%)<div class="zexec-progress-bar"><div class="zexec-progress-fill success" style="width:94%;"></div></div></td>',
                '<td>₹55.0L MTD</td>',
                '<td>0.94</td>',
                '<td><span class="zexec-badge success">On Track</span></td>',
              '</tr>',
              '<tr>',
                '<td><strong>Clinical Accreditation & VCI Audit</strong><br><span style="font-size:11px;color:#64748b;">Tier-1 clinical quality protocols across all facilities</span></td>',
                '<td>Chief Medical Officer</td>',
                '<td>14 / 14 Clinics (100%)<div class="zexec-progress-bar"><div class="zexec-progress-fill info" style="width:100%;"></div></div></td>',
                '<td>100% Facilities</td>',
                '<td>1.00</td>',
                '<td><span class="zexec-badge info">Completed</span></td>',
              '</tr>',
              '<tr>',
                '<td><strong>60-Minute Urban Hyperlocal SLA</strong><br><span style="font-size:11px;color:#64748b;">Guaranteed emergency Rx & vet care delivery</span></td>',
                '<td>VP Logistics</td>',
                '<td>98.4% SLA Achieved<div class="zexec-progress-bar"><div class="zexec-progress-fill success" style="width:100%;"></div></div></td>',
                '<td>98.0% SLA</td>',
                '<td>0.96</td>',
                '<td><span class="zexec-badge success">Exceeded</span></td>',
              '</tr>',
              '<tr>',
                '<td><strong>Private-Label Veterinary Nutrition</strong><br><span style="font-size:11px;color:#64748b;">Therapeutic proprietary diet formulations</span></td>',
                '<td>Head of Product</td>',
                '<td>₹6.45L MTD (80.6%)<div class="zexec-progress-bar"><div class="zexec-progress-fill warning" style="width:81%;"></div></div></td>',
                '<td>₹8.0L MTD</td>',
                '<td>0.82</td>',
                '<td><span class="zexec-badge warning">Attention</span></td>',
              '</tr>',
              '<tr>',
                '<td><strong>Operating Margin Expansion (EBITDA)</strong><br><span style="font-size:11px;color:#64748b;">Centralized formulary purchasing and supply optimization</span></td>',
                '<td>CFO</td>',
                '<td>16.9% MTD (Run-rate 17.8%)<div class="zexec-progress-bar"><div class="zexec-progress-fill success" style="width:94%;"></div></div></td>',
                '<td>18.0% Target</td>',
                '<td>0.91</td>',
                '<td><span class="zexec-badge success">On Track</span></td>',
              '</tr>',
              '<tr>',
                '<td><strong>Central Diagnostic Pathology Lab Automation</strong><br><span style="font-size:11px;color:#64748b;">Automated analyzer calibration & NABL Level-1 accreditation</span></td>',
                '<td>CMO & Lab Director</td>',
                '<td>Equipment Live (95%)<div class="zexec-progress-bar"><div class="zexec-progress-fill purple" style="width:95%;"></div></div></td>',
                '<td>NABL Accreditation</td>',
                '<td>0.95</td>',
                '<td><span class="zexec-badge purple">Final Audit</span></td>',
              '</tr>',
            '</tbody>',
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
            '<tbody>',
              '<tr>',
                '<td><strong>🏥 Clinics & Hospitals Network</strong></td>',
                '<td>Dr. Ramesh (COO)</td>',
                '<td>₹76.80 Lakh</td>',
                '<td><span style="color:#059669;font-weight:700;">106.7%</span> (Target: ₹72.0L)</td>',
                '<td>44.2%</td>',
                '<td><span style="color:#059669;font-weight:700;">+18.2%</span></td>',
                '<td><span class="zexec-badge success">Ahead of Plan</span></td>',
              '</tr>',
              '<tr>',
                '<td><strong>💊 Pharmacy & Cold-Chain Formulary</strong></td>',
                '<td>Dr. Aisha (VP Rx)</td>',
                '<td>₹51.40 Lakh</td>',
                '<td><span style="color:#059669;font-weight:700;">107.1%</span> (Target: ₹48.0L)</td>',
                '<td>36.8%</td>',
                '<td><span style="color:#059669;font-weight:700;">+22.4%</span></td>',
                '<td><span class="zexec-badge success">Ahead of Plan</span></td>',
              '</tr>',
              '<tr>',
                '<td><strong>⚡ E-Commerce & 60-Min Hyperlocal</strong></td>',
                '<td>Rohan V. (VP Growth)</td>',
                '<td>₹33.20 Lakh</td>',
                '<td><span style="color:#d97706;font-weight:700;">92.2%</span> (Target: ₹36.0L)</td>',
                '<td>28.4%</td>',
                '<td><span style="color:#059669;font-weight:700;">+14.1%</span></td>',
                '<td><span class="zexec-badge warning">Needs Push</span></td>',
              '</tr>',
              '<tr>',
                '<td><strong>🔬 Diagnostic Pathology & Imaging</strong></td>',
                '<td>Dr. Neha (CMO)</td>',
                '<td>₹19.40 Lakh</td>',
                '<td><span style="color:#059669;font-weight:700;">107.8%</span> (Target: ₹18.0L)</td>',
                '<td>58.1%</td>',
                '<td><span style="color:#059669;font-weight:700;">+31.5%</span></td>',
                '<td><span class="zexec-badge success">Exceeding</span></td>',
              '</tr>',
              '<tr>',
                '<td><strong>🐕 Zenve Fashion & Lifestyle</strong></td>',
                '<td>Priya I. (VP Merch)</td>',
                '<td>₹11.20 Lakh</td>',
                '<td><span style="color:#059669;font-weight:700;">93.3%</span> (Target: ₹12.0L)</td>',
                '<td>46.5%</td>',
                '<td><span style="color:#059669;font-weight:700;">+11.8%</span></td>',
                '<td><span class="zexec-badge success">On Track</span></td>',
              '</tr>',
              '<tr>',
                '<td><strong>🏢 B2B & Institutional Veterinary</strong></td>',
                '<td>Sameer K. (VP B2B)</td>',
                '<td>₹11.80 Lakh</td>',
                '<td><span style="color:#059669;font-weight:700;">118.0%</span> (Target: ₹10.0L)</td>',
                '<td>26.2%</td>',
                '<td><span style="color:#059669;font-weight:700;">+42.0%</span></td>',
                '<td><span class="zexec-badge success">Exceeding</span></td>',
              '</tr>',
            '</tbody>',
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
            '<span class="zexec-badge info">' + (4 - Object.keys(approved).length) + ' Pending</span>',
          '</div>',
          '<div style="display:flex;flex-direction:column;gap:12px;">',
            /* DEC-108 */
            '<div class="zexec-decision-card">',
              '<div class="zexec-decision-top">',
                '<span class="zexec-decision-id">DEC-108</span>',
                '<span class="zexec-badge ' + (approved['DEC-108'] ? 'success' : 'danger') + '">' + (approved['DEC-108'] ? 'Approved ✓' : 'High Priority') + '</span>',
              '</div>',
              '<p class="zexec-decision-action">Approve Koramangala Tertiary Hospital Expansion (8 new ICU beds, orthopedic surgery theater & CT scanner suite)</p>',
              '<div class="zexec-decision-meta">',
                '<span>Owner: <strong>Dr. Ramesh / COO</strong></span>',
                '<span>Capital: <strong>₹85.0L Capex (28% IRR)</strong></span>',
                '<span>Date: <strong>Today</strong></span>',
              '</div>',
              '<div class="zexec-decision-footer">',
                '<span style="font-size:11px;color:#64748b;">Status: ' + (approved['DEC-108'] ? '<strong style="color:#059669;">Approved by CEO</strong>' : '<strong>Pending CEO Sign-Off</strong>') + '</span>',
                (approved['DEC-108'] ? '<span class="zexec-badge success">Ratified</span>' : '<button class="zexec-btn-sm" data-approve-dec="DEC-108">Approve Decision</button>'),
              '</div>',
            '</div>',
            /* DEC-107 */
            '<div class="zexec-decision-card">',
              '<div class="zexec-decision-top">',
                '<span class="zexec-decision-id">DEC-107</span>',
                '<span class="zexec-badge ' + (approved['DEC-107'] ? 'success' : 'danger') + '">' + (approved['DEC-107'] ? 'Approved ✓' : 'High Priority') + '</span>',
              '</div>',
              '<p class="zexec-decision-action">Sign Direct Supply Master Contract with Zoetis Pharmaceuticals (5.2% Margin Boost, eliminates distributor markups)</p>',
              '<div class="zexec-decision-meta">',
                '<span>Owner: <strong>CFO / Supply Chain</strong></span>',
                '<span>Capital: <strong>₹1.40 Cr Annual Contract</strong></span>',
                '<span>Date: <strong>Yesterday</strong></span>',
              '</div>',
              '<div class="zexec-decision-footer">',
                '<span style="font-size:11px;color:#64748b;">Status: ' + (approved['DEC-107'] ? '<strong style="color:#059669;">Approved by CEO</strong>' : '<strong>Ready for Signature</strong>') + '</span>',
                (approved['DEC-107'] ? '<span class="zexec-badge success">Ratified</span>' : '<button class="zexec-btn-sm" data-approve-dec="DEC-107">Sign Contract</button>'),
              '</div>',
            '</div>',
            /* DEC-106 */
            '<div class="zexec-decision-card">',
              '<div class="zexec-decision-top">',
                '<span class="zexec-decision-id">DEC-106</span>',
                '<span class="zexec-badge ' + (approved['DEC-106'] ? 'success' : 'warning') + '">' + (approved['DEC-106'] ? 'Approved ✓' : 'Medium Priority') + '</span>',
              '</div>',
              '<p class="zexec-decision-action">Authorize Hyderabad Cluster 60-Minute Hyperlocal Micro-Hub Leases (3 strategic sites: Gachibowli, Jubilee Hills, Hitec City)</p>',
              '<div class="zexec-decision-meta">',
                '<span>Owner: <strong>VP Logistics</strong></span>',
                '<span>Capital: <strong>₹28.5L Capex</strong></span>',
                '<span>Date: <strong>Oct 03</strong></span>',
              '</div>',
              '<div class="zexec-decision-footer">',
                '<span style="font-size:11px;color:#64748b;">Status: ' + (approved['DEC-106'] ? '<strong style="color:#059669;">Approved by CEO</strong>' : '<strong>Under Financial Review</strong>') + '</span>',
                (approved['DEC-106'] ? '<span class="zexec-badge success">Ratified</span>' : '<button class="zexec-btn-sm" data-approve-dec="DEC-106">Authorize Lease</button>'),
              '</div>',
            '</div>',
            /* DEC-105 */
            '<div class="zexec-decision-card">',
              '<div class="zexec-decision-top">',
                '<span class="zexec-decision-id">DEC-105</span>',
                '<span class="zexec-badge success">Completed ✓</span>',
              '</div>',
              '<p class="zexec-decision-action">Annual Board Review of Tiered Clinician Incentive & Equity Retention Scheme (15%-22% tiered structure)</p>',
              '<div class="zexec-decision-meta">',
                '<span>Owner: <strong>CEO / Board of Directors</strong></span>',
                '<span>Capital: <strong>₹18.0L Pool</strong></span>',
                '<span>Date: <strong>Oct 01</strong></span>',
              '</div>',
              '<div class="zexec-decision-footer">',
                '<span style="font-size:11px;color:#64748b;">Status: <strong style="color:#059669;">Board Ratified & Executed</strong></span>',
                '<span class="zexec-badge success">Ratified</span>',
              '</div>',
            '</div>',
          '</div>',
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
                '<h2 style="margin:4px 0 0;font-size:24px;font-weight:800;color:#0f172a;">₹9.60 Crore</h2>',
                '<span style="font-size:11px;color:#059669;font-weight:700;">+₹18.4L Monthly Operational Surplus</span>',
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
              '<tbody>',
                '<tr>',
                  '<td><strong>Hospital Capex & ICU Upgrades</strong></td>',
                  '<td>₹1.80 Cr</td>',
                  '<td>₹85.0L (47%)</td>',
                  '<td><span class="zexec-badge success">Healthy</span></td>',
                '</tr>',
                '<tr>',
                  '<td><strong>Cold-Chain & Micro-Hub Fleet</strong></td>',
                  '<td>₹75.0L</td>',
                  '<td>₹28.5L (38%)</td>',
                  '<td><span class="zexec-badge success">Healthy</span></td>',
                '</tr>',
                '<tr>',
                  '<td><strong>Diagnostic Lab Automation</strong></td>',
                  '<td>₹60.0L</td>',
                  '<td>₹54.0L (90%)</td>',
                  '<td><span class="zexec-badge info">Near Target</span></td>',
                '</tr>',
                '<tr>',
                  '<td><strong>Liquid Operating Buffer</strong></td>',
                  '<td>₹6.45 Cr</td>',
                  '<td>Unencumbered</td>',
                  '<td><span class="zexec-badge success">Pristine</span></td>',
                '</tr>',
              '</tbody>',
            '</table>',
            '<div style="padding:12px 14px;background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;font-size:12px;color:#1e40af;line-height:1.4;">',
              '<strong>💡 Executive Capital Note:</strong> Cash generation is fully self-sustaining with a Debt-to-Equity of 0.04. Series A runway extends past Q4 FY26 without dilutive capital requirements.',
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
          '<span class="zexec-badge success">All 4 Vectors Green</span>',
        '</div>',
        '<div class="zexec-risk-grid">',
          '<div class="zexec-risk-card">',
            '<div class="zexec-risk-head">',
              '<span>Clinical Quality & VCI Compliance</span>',
              '<span class="zexec-badge success">Nominal</span>',
            '</div>',
            '<div class="zexec-risk-val">0 Open Audits</div>',
            '<p class="zexec-risk-desc">100% of 14 hospitals hold active Veterinary Council licenses. Bio-waste and surgical protocols certified.</p>',
          '</div>',
          '<div class="zexec-risk-card">',
            '<div class="zexec-risk-head">',
              '<span>Cold-Chain & Pharmacy Expiry</span>',
              '<span class="zexec-badge success">Nominal</span>',
            '</div>',
            '<div class="zexec-risk-val">99.8% Integrity</div>',
            '<p class="zexec-risk-desc">Real-time IoT temperature telematics active across 14 central vaccine and insulin repositories.</p>',
          '</div>',
          '<div class="zexec-risk-card">',
            '<div class="zexec-risk-head">',
              '<span>Specialist Doctor Retention</span>',
              '<span class="zexec-badge success">Optimal</span>',
            '</div>',
            '<div class="zexec-risk-val">98.4% Retention</div>',
            '<p class="zexec-risk-desc">Veterinary surgical staff turnover stands at 1.6%, significantly beating the healthcare benchmark (18%).</p>',
          '</div>',
          '<div class="zexec-risk-card">',
            '<div class="zexec-risk-head">',
              '<span>Cybersecurity & Health Records</span>',
              '<span class="zexec-badge success">Secured</span>',
            '</div>',
            '<div class="zexec-risk-val">ISO 27001 Ready</div>',
            '<p class="zexec-risk-desc">End-to-end encrypted electronic health records with immutable audit logging and zero data incidents.</p>',
          '</div>',
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
    return TABS[1];
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
    else if (!S.tab || S.tab === 'dashboard' || S.tab === 'home') S.tab = 'ceo-control';
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
    if (h === '#executive-dashboard' || h === '#executive' || h === '#exec-dashboard' || h === '#overview' || h === '#home') {
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
        if (t2 === 'home') {
          // Executive Dashboard subdomain clicked: redirect directly to original home dashboard given at first!
          redirectToHomeDashboard();
          return;
        } else if (t2) {
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
