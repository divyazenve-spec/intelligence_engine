/* =====================================================================
   Zenve BI — Marketing & Growth Executive Control Center
   Sidebar: Marketing Suite (14 Subcategories)
   Pure Light Executive Design System
   ===================================================================== */

(function () {
  'use strict';

  var root = null;
  var S = {
    open: false,
    tab: 'overview',
    searchQuery: '',
    statusFilter: 'ALL',
    toastTimeout: null
  };

  /* ── 14 Subcategories Matching Marketing Suite ────────────────────── */
  var MODULES = [
    { id: 'overview', label: 'Marketing Dashboard', icon: '📊', hash: '#marketing-dashboard' },
    { id: 'campaigns', label: 'Campaigns', icon: '🚀', hash: '#campaigns' },
    { id: 'leads', label: 'Leads', icon: '🎯', hash: '#leads' },
    { id: 'lead-sources', label: 'Lead Sources', icon: '🌐', hash: '#lead-sources' },
    { id: 'website-analytics', label: 'Website Analytics', icon: '💻', hash: '#website-analytics' },
    { id: 'app-analytics', label: 'App Analytics', icon: '📱', hash: '#app-analytics' },
    { id: 'social-media', label: 'Social Media', icon: '📸', hash: '#social-media' },
    { id: 'advertising', label: 'Advertising', icon: '📢', hash: '#advertising' },
    { id: 'marketing-spend', label: 'Marketing Spend', icon: '💰', hash: '#marketing-spend' },
    { id: 'customer-acquisition', label: 'Customer Acquisition', icon: '🐾', hash: '#customer-acquisition' },
    { id: 'cac', label: 'CAC', icon: '🎯', hash: '#cac' },
    { id: 'roas', label: 'ROAS', icon: '🚀', hash: '#roas' },
    { id: 'marketing-roi', label: 'Marketing ROI', icon: '💎', hash: '#marketing-roi' },
    { id: 'conversion-funnel', label: 'Conversion Funnel', icon: '⚡', hash: '#conversion-funnel' }
  ];

  /* ── Datasets ─────────────────────────────────────────────────────── */
  var CAMPAIGNS = [];

  var LEADS = [];

  var SOURCES = [];

  var WEB_PAGES = [];

  var SOCIAL_CHANNELS = [];

  var AD_SETS = [];

  var SPEND_ITEMS = [];

  var COHORTS = [];

  var CITY_CAC = [];

  var CATEGORY_ROAS = [];

  var FINANCIAL_ROI = [];

  var FUNNEL_STEPS = [];

  /* ── Helpers ──────────────────────────────────────────────────────── */
  function showToast(msg) {
    var existing = document.querySelector('.zmkt-toast');
    if (existing) existing.remove();
    var t = document.createElement('div');
    t.className = 'zmkt-toast';
    t.innerHTML = '<span>📣</span><span>' + msg + '</span>';
    document.body.appendChild(t);
    clearTimeout(S.toastTimeout);
    S.toastTimeout = setTimeout(function () { t.remove(); }, 3200);
  }

  function closeOthers() {
    document.querySelectorAll('.zpanel-root, #zset-root, #zod-root, #zsd-root, #zph-root, #zch-root, #zalt-root, #zrep-root, #zsh-root, #zhr-dashboard-root').forEach(function (p) {
      p.classList.remove('zpanel-open');
      p.classList.remove('zset-open');
      p.classList.remove('zod-open');
      p.classList.remove('zsd-open');
      p.classList.remove('zph-open');
      p.classList.remove('zch-open');
      p.classList.remove('zalt-open');
      p.classList.remove('zrep-open');
      p.classList.remove('zsh-open');
    });
    if (window.ZenveSettingsDashboard && window.ZenveSettingsDashboard.close) {
      try { window.ZenveSettingsDashboard.close(); } catch (err) {}
    }
  }

  function tabFromHash(hash) {
    if (!hash) return null;
    var clean = (hash.startsWith('#') ? hash : '#' + hash).toLowerCase().trim();
    for (var i = 0; i < MODULES.length; i++) {
      if (MODULES[i].hash === clean || clean === '#' + MODULES[i].id) {
        return MODULES[i].id;
      }
    }
    if (clean === '#marketing' || clean === '#marketing-dashboard' || clean === '#mkt') return 'overview';
    return null;
  }

  function tabFromText(text) {
    if (!text) return null;
    var t = text.trim().toLowerCase();
    if (t === 'marketing dashboard' || t === 'marketing' || t === 'mkt') return 'overview';
    if (t === 'campaigns' || t === 'marketing campaigns') return 'campaigns';
    if (t === 'leads' || t === 'pet leads' || t === 'all leads') return 'leads';
    if (t === 'lead sources' || t === 'sources') return 'lead-sources';
    if (t === 'website analytics' || t === 'web traffic') return 'website-analytics';
    if (t === 'app analytics' || t === 'mobile analytics') return 'app-analytics';
    if (t === 'social media' || t === 'social') return 'social-media';
    if (t === 'advertising' || t === 'ads') return 'advertising';
    if (t === 'marketing spend' || t === 'mkt spend') return 'marketing-spend';
    if (t === 'customer acquisition' || t === 'acquisition') return 'customer-acquisition';
    if (t === 'cac' || t === 'customer acquisition cost') return 'cac';
    if (t === 'roas' || t === 'return on ad spend') return 'roas';
    if (t === 'marketing roi' || t === 'roi') return 'marketing-roi';
    if (t === 'conversion funnel' || t === 'funnel') return 'conversion-funnel';
    return null;
  }

  /* ── Shell Renderer ───────────────────────────────────────────────── */
  function render() {
    if (!root) return;

    var curMod = MODULES.find(function (m) { return m.id === S.tab; }) || MODULES[0];

    // Build chip navigation
    var chipsHtml = MODULES.map(function (m) {
      var isActive = S.tab === m.id;
      var count = '';
      if (m.id === 'campaigns') count = '<span class="zmkt-chip-count">' + CAMPAIGNS.length + '</span>';
      else if (m.id === 'leads') count = '<span class="zmkt-chip-count">' + LEADS.length + '</span>';
      else if (m.id === 'roas') count = '<span class="zmkt-chip-count">4.45x</span>';

      return [
        '<button type="button" class="zmkt-chip ' + (isActive ? 'active' : '') + '" data-tab="' + m.id + '">',
        '  <span>' + m.icon + '</span>',
        '  <span>' + m.label + '</span>',
        count,
        '</button>'
      ].join('');
    }).join('');

    root.innerHTML = [
      '<!-- Top Executive Header -->',
      '<div class="zmkt-header">',
      '  <div class="zmkt-header-left">',
      '    <div class="zmkt-brand-badge">📣</div>',
      '    <div class="zmkt-title-group">',
      '      <div class="zmkt-title-row">',
      '        <h2 class="zmkt-main-title">' + curMod.label + '</h2>',
      '        <span class="zmkt-status-badge"><span class="zmkt-status-dot"></span> Live Attribution Synced</span>',
      '      </div>',
      '      <p class="zmkt-subtitle">Marketing & Growth Suite · Private Sales, Ad Spend, CAC & Multi-Channel ROAS</p>',
      '    </div>',
      '  </div>',
      '  <div class="zmkt-header-right">',
      '    <button type="button" class="zmkt-btn zmkt-btn-secondary" id="zmkt-calc-btn"><span>⚡</span> ROAS Calculator</button>',
      '    <button type="button" class="zmkt-btn zmkt-btn-secondary" id="zmkt-export-btn"><span>📥</span> Export CSV</button>',
      '    <button type="button" class="zmkt-btn zmkt-btn-primary" id="zmkt-add-campaign-btn"><span>🚀</span> Launch Campaign</button>',
      '    <button type="button" class="zmkt-btn-icon" id="zmkt-close-btn" title="Close Marketing Control Center">✕</button>',
      '  </div>',
      '</div>',

      '<!-- Sticky Chips Navigation -->',
      '<div class="zmkt-nav-bar">' + chipsHtml + '</div>',

      '<!-- Main Viewport -->',
      '<div class="zmkt-content" id="zmkt-view-container"></div>'
    ].join('');

    renderTabContent();
    wireEvents();
  }

  /* ── Tab Content Switcher ─────────────────────────────────────────── */
  function renderTabContent() {
    var container = root.querySelector('#zmkt-view-container');
    if (!container) return;

    var html = '';
    switch (S.tab) {
      case 'overview':
        html = renderOverview();
        break;
      case 'campaigns':
        html = renderCampaigns();
        break;
      case 'leads':
        html = renderLeads();
        break;
      case 'lead-sources':
        html = renderLeadSources();
        break;
      case 'website-analytics':
        html = renderWebsiteAnalytics();
        break;
      case 'app-analytics':
        html = renderAppAnalytics();
        break;
      case 'social-media':
        html = renderSocialMedia();
        break;
      case 'advertising':
        html = renderAdvertising();
        break;
      case 'marketing-spend':
        html = renderMarketingSpend();
        break;
      case 'customer-acquisition':
        html = renderCustomerAcquisition();
        break;
      case 'cac':
        html = renderCAC();
        break;
      case 'roas':
        html = renderROAS();
        break;
      case 'marketing-roi':
        html = renderMarketingROI();
        break;
      case 'conversion-funnel':
        html = renderConversionFunnel();
        break;
      default:
        html = renderOverview();
    }

    container.innerHTML = html;
    wireTabSpecificEvents();
  }

  /* ── Renderers for all 14 Tabs ────────────────────────────────────── */

  function renderOverview() {
    return [
      '<div class="zmkt-kpi-grid">',
      '  <div class="zmkt-kpi-card">',
      '    <div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Total Ad Spend</span><span class="zmkt-kpi-icon-wrap">💳</span></div>',
      '    <div class="zmkt-kpi-val">₹7,56,500</div>',
      '    <div class="zmkt-kpi-foot"><span class="zmkt-badge-up">✓ -5.4% Under Budget</span><span>Favorable OPEX burn</span></div>',
      '  </div>',
      '  <div class="zmkt-kpi-card">',
      '    <div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Acquired Leads</span><span class="zmkt-kpi-icon-wrap">🎯</span></div>',
      '    <div class="zmkt-kpi-val">18,400</div>',
      '    <div class="zmkt-kpi-foot"><span class="zmkt-badge-up">↑ +22.6% MTD</span><span>Qualified pet parents</span></div>',
      '  </div>',
      '  <div class="zmkt-kpi-card">',
      '    <div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Blended CAC</span><span class="zmkt-kpi-icon-wrap">👥</span></div>',
      '    <div class="zmkt-kpi-val">₹365</div>',
      '    <div class="zmkt-kpi-foot"><span class="zmkt-badge-up">↓ -8.4% Efficiency</span><span>Benchmark: ₹450</span></div>',
      '  </div>',
      '  <div class="zmkt-kpi-card">',
      '    <div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Blended ROAS</span><span class="zmkt-kpi-icon-wrap">🚀</span></div>',
      '    <div class="zmkt-kpi-val">4.45x</div>',
      '    <div class="zmkt-kpi-foot"><span class="zmkt-badge-up">↑ +18.4%</span><span>₹33.65L Attributed GMV</span></div>',
      '  </div>',
      '</div>',

      '<div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(460px, 1fr));gap:20px;">',
      '  <div class="zmkt-card">',
      '    <div class="zmkt-card-head">',
      '      <div><h3 class="zmkt-card-title">Top Acquisition Channels</h3><p class="zmkt-card-sub">Multi-touch attribution share and ROAS return</p></div>',
      '      <button type="button" class="zmkt-btn zmkt-btn-secondary" onclick="window.ZenveMarketingDashboard.switchTab(\'lead-sources\')">All Sources →</button>',
      '    </div>',
      '    <div class="zmkt-table-wrap">',
      '      <table class="zmkt-table">',
      '        <thead><tr><th>Channel</th><th>Leads</th><th>Share</th><th>ROAS</th></tr></thead>',
      '        <tbody>',
      '          <tr><td><b>Google Search Ads</b></td><td style="font-family:IBM Plex Mono,monospace;">6,420</td><td>34.8%</td><td><span class="zmkt-roas-pill">5.2x</span></td></tr>',
      '          <tr><td><b>Meta Instagram & Reels</b></td><td style="font-family:IBM Plex Mono,monospace;">4,180</td><td>22.7%</td><td><span class="zmkt-roas-pill">4.1x</span></td></tr>',
      '          <tr><td><b>Vet Clinic Referral Network</b></td><td style="font-family:IBM Plex Mono,monospace;">2,940</td><td>16.0%</td><td><span class="zmkt-roas-pill">5.8x</span></td></tr>',
      '          <tr><td><b>In-App Viral Invites</b></td><td style="font-family:IBM Plex Mono,monospace;">2,450</td><td>13.3%</td><td><span class="zmkt-roas-pill">6.4x</span></td></tr>',
      '          <tr><td><b>Organic SEO & Pet Guides</b></td><td style="font-family:IBM Plex Mono,monospace;">1,650</td><td>9.0%</td><td><span class="zmkt-tag zmkt-tag-completed">Organic</span></td></tr>',
      '        </tbody>',
      '      </table>',
      '    </div>',
      '  </div>',

      '  <div class="zmkt-card">',
      '    <div class="zmkt-card-head">',
      '      <div><h3 class="zmkt-card-title">Conversion Funnel Velocity</h3><p class="zmkt-card-sub">5-Stage micro-conversion drop-off rate</p></div>',
      '      <button type="button" class="zmkt-btn zmkt-btn-secondary" onclick="window.ZenveMarketingDashboard.switchTab(\'conversion-funnel\')">Deep Funnel →</button>',
      '    </div>',
      '    <div>' + renderFunnelBarsSummary() + '</div>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderFunnelBarsSummary() {
    return FUNNEL_STEPS.map(function(s, idx) {
      return [
        '<div style="margin-bottom:12px;">',
        '  <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px;">',
        '    <span style="font-weight:600;color:#334155;">' + s.stage + '</span>',
        '    <span style="font-weight:700;font-family:IBM Plex Mono,monospace;">' + s.volume + ' (' + s.convRate + ')</span>',
        '  </div>',
        '  <div style="height:6px;background:#e2e8f0;border-radius:9999px;overflow:hidden;">',
        '    <div style="width:' + s.width + ';height:100%;background:' + s.color + ';border-radius:9999px;"></div>',
        '  </div>',
        '</div>'
      ].join('');
    }).join('');
  }

  function renderCampaigns() {
    var q = (S.searchQuery || '').toLowerCase();
    var list = CAMPAIGNS.filter(function (c) {
      var matchQ = c.name.toLowerCase().indexOf(q) >= 0 || c.channel.toLowerCase().indexOf(q) >= 0 || c.id.toLowerCase().indexOf(q) >= 0;
      var matchS = S.statusFilter === 'ALL' || c.status === S.statusFilter;
      return matchQ && matchS;
    });

    var rows = list.map(function (c) {
      return [
        '<tr>',
        '  <td><b>' + c.name + '</b><div style="font-size:11px;color:#94a3b8;font-family:IBM Plex Mono,monospace;">' + c.id + '</div></td>',
        '  <td>' + c.channel + '</td>',
        '  <td><b style="font-family:IBM Plex Mono,monospace;">' + c.spend + '</b><div style="font-size:11px;color:#94a3b8;">Plan: ' + c.budget + '</div></td>',
        '  <td style="font-family:IBM Plex Mono,monospace;">' + c.impressions + '</td>',
        '  <td style="font-family:IBM Plex Mono,monospace;font-weight:600;color:#16a34a;">' + c.ctr + '</td>',
        '  <td style="font-family:IBM Plex Mono,monospace;font-weight:600;">' + c.conv.toLocaleString() + '</td>',
        '  <td style="font-family:IBM Plex Mono,monospace;color:#2563eb;">' + c.cac + '</td>',
        '  <td><span class="zmkt-roas-pill">' + c.roas + '</span></td>',
        '  <td><span class="zmkt-tag zmkt-tag-' + c.status.toLowerCase() + '">' + c.status + '</span></td>',
        '  <td style="text-align:right;">',
        '    <button type="button" class="zmkt-btn zmkt-btn-secondary" style="padding:4px 8px;font-size:11px;" onclick="window.ZenveMarketingDashboard.toggleCampaignStatus(\'' + c.id + '\')">' + (c.status === 'Active' ? 'Pause' : 'Activate') + '</button>',
        '  </td>',
        '</tr>'
      ].join('');
    }).join('');

    return [
      '<div class="zmkt-kpi-grid">',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Active Flights</span><span class="zmkt-kpi-icon-wrap">🚀</span></div><div class="zmkt-kpi-val">' + CAMPAIGNS.filter(function(c){return c.status === 'Active';}).length + '</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-up">6 Total Flights</span><span>Meta, Google & YouTube</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Campaign Spend</span><span class="zmkt-kpi-icon-wrap">💳</span></div><div class="zmkt-kpi-val">₹7,18,000</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-up">✓ Budget Adherence</span><span>Under ₹7.5L allocated</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Ad Impressions</span><span class="zmkt-kpi-icon-wrap">👁️</span></div><div class="zmkt-kpi-val">1.75M</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-up">↑ +22.4%</span><span>Avg CTR: 5.12%</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Conversions</span><span class="zmkt-kpi-icon-wrap">🎯</span></div><div class="zmkt-kpi-val">4,770</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-up">↑ +18.9%</span><span>Consults & Rx orders</span></div></div>',
      '</div>',

      '<div class="zmkt-card">',
      '  <div class="zmkt-filter-bar">',
      '    <div class="zmkt-search-wrap">',
      '      <span class="zmkt-search-icon">🔍</span>',
      '      <input type="text" class="zmkt-search-input" id="zmkt-camp-search" placeholder="Search campaign name, channel or ID…" value="' + S.searchQuery + '">',
      '    </div>',
      '    <div style="display:flex;gap:8px;">',
      '      <select class="zmkt-select" id="zmkt-camp-status">',
      '        <option value="ALL"' + (S.statusFilter === 'ALL' ? ' selected' : '') + '>All Statuses</option>',
      '        <option value="Active"' + (S.statusFilter === 'Active' ? ' selected' : '') + '>Active</option>',
      '        <option value="Scheduled"' + (S.statusFilter === 'Scheduled' ? ' selected' : '') + '>Scheduled</option>',
      '        <option value="Completed"' + (S.statusFilter === 'Completed' ? ' selected' : '') + '>Completed</option>',
      '      </select>',
      '    </div>',
      '  </div>',
      '  <div class="zmkt-table-wrap">',
      '    <table class="zmkt-table">',
      '      <thead><tr><th>Campaign Name</th><th>Channel</th><th>Spend / Plan</th><th>Impressions</th><th>CTR</th><th>Conversions</th><th>CAC</th><th>ROAS</th><th>Status</th><th style="text-align:right;">Action</th></tr></thead>',
      '      <tbody>' + rows + '</tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderLeads() {
    var q = (S.searchQuery || '').toLowerCase();
    var list = LEADS.filter(function (l) {
      return l.parent.toLowerCase().indexOf(q) >= 0 || l.pet.toLowerCase().indexOf(q) >= 0 || l.city.toLowerCase().indexOf(q) >= 0 || l.id.toLowerCase().indexOf(q) >= 0;
    });

    var rows = list.map(function (l) {
      return [
        '<tr>',
        '  <td><b>' + l.parent + '</b><div style="font-size:11px;color:#94a3b8;font-family:IBM Plex Mono,monospace;">' + l.id + '</div></td>',
        '  <td style="font-weight:600;color:#0f172a;">' + l.pet + '</td>',
        '  <td style="color:#64748b;font-size:12px;">' + l.city + '</td>',
        '  <td><span class="zmkt-tag zmkt-tag-completed">' + l.source + '</span></td>',
        '  <td><b style="font-family:IBM Plex Mono,monospace;color:' + (l.score.startsWith('A') ? '#16a34a' : '#2563eb') + ';">' + l.score + '</b></td>',
        '  <td><span class="zmkt-tag ' + (l.stage === 'Converted' ? 'zmkt-tag-active' : l.stage === 'Consult Booked' ? 'zmkt-tag-scheduled' : 'zmkt-tag-paused') + '">' + l.stage + '</span></td>',
        '  <td>' + l.rep + '</td>',
        '  <td style="font-family:IBM Plex Mono,monospace;font-weight:700;">' + l.value + '</td>',
        '  <td style="text-align:right;">',
        '    <button type="button" class="zmkt-btn zmkt-btn-secondary" style="padding:4px 8px;font-size:11px;" onclick="window.ZenveMarketingDashboard.viewLead(\'' + l.id + '\')">Details</button>',
        '  </td>',
        '</tr>'
      ].join('');
    }).join('');

    return [
      '<div class="zmkt-kpi-grid">',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Active Leads</span><span class="zmkt-kpi-icon-wrap">🎯</span></div><div class="zmkt-kpi-val">' + LEADS.length + '</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-up">↑ +18.4%</span><span>Inbound pet prospects</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Consults Booked</span><span class="zmkt-kpi-icon-wrap">🩺</span></div><div class="zmkt-kpi-val">684</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-up">37.2% Booking Rate</span><span>Doctor appointments</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Pipeline Value</span><span class="zmkt-kpi-icon-wrap">💎</span></div><div class="zmkt-kpi-val">₹42.50L</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-up">Avg ₹3,850/lead</span><span>Prescription + diet orders</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Lead Conv Rate</span><span class="zmkt-kpi-icon-wrap">🔄</span></div><div class="zmkt-kpi-val">28.4%</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-up">Top tier benchmark</span><span>Lead to paid sale</span></div></div>',
      '</div>',

      '<div class="zmkt-card">',
      '  <div class="zmkt-filter-bar">',
      '    <div class="zmkt-search-wrap">',
      '      <span class="zmkt-search-icon">🔍</span>',
      '      <input type="text" class="zmkt-search-input" id="zmkt-lead-search" placeholder="Search pet parent, pet breed or city…" value="' + S.searchQuery + '">',
      '    </div>',
      '    <button type="button" class="zmkt-btn zmkt-btn-primary" id="zmkt-add-lead-btn"><span>➕</span> Capture Pet Lead</button>',
      '  </div>',
      '  <div class="zmkt-table-wrap">',
      '    <table class="zmkt-table">',
      '      <thead><tr><th>Pet Parent</th><th>Pet Companion</th><th>City & Zone</th><th>Source</th><th>Score</th><th>Pipeline Stage</th><th>Assigned Rep</th><th>Est. Value</th><th style="text-align:right;">Action</th></tr></thead>',
      '      <tbody>' + rows + '</tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderLeadSources() {
    var rows = SOURCES.map(function (s) {
      return [
        '<tr>',
        '  <td><b>' + s.name + '</b></td>',
        '  <td style="font-family:IBM Plex Mono,monospace;">' + s.visitors + '</td>',
        '  <td style="font-family:IBM Plex Mono,monospace;font-weight:700;">' + s.leads + '</td>',
        '  <td style="font-family:IBM Plex Mono,monospace;color:#16a34a;font-weight:600;">' + s.convRate + '</td>',
        '  <td style="font-family:IBM Plex Mono,monospace;">' + s.spend + '</td>',
        '  <td style="font-family:IBM Plex Mono,monospace;color:#2563eb;font-weight:600;">' + s.cac + '</td>',
        '  <td><span class="zmkt-tag zmkt-tag-active">' + s.quality + '</span></td>',
        '  <td><b>' + s.share + '</b></td>',
        '</tr>'
      ].join('');
    }).join('');

    return [
      '<div class="zmkt-kpi-grid">',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Top Lead Volume</span><span class="zmkt-kpi-icon-wrap">🔍</span></div><div class="zmkt-kpi-val">Google Search</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-up">34.8% Share</span><span>6,420 pet leads</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Highest Quality</span><span class="zmkt-kpi-icon-wrap">🩺</span></div><div class="zmkt-kpi-val">Vet Network</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-up">9.9 / 10 Score</span><span>19.8% conversion</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Lowest CAC</span><span class="zmkt-kpi-icon-wrap">👥</span></div><div class="zmkt-kpi-val">₹32 / Lead</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-up">Viral Referrals</span><span>Pet parent sharing</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Blended Conv</span><span class="zmkt-kpi-icon-wrap">⚡</span></div><div class="zmkt-kpi-val">9.1%</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-up">↑ +1.4%</span><span>Across all 6 channels</span></div></div>',
      '</div>',

      '<div class="zmkt-card">',
      '  <div class="zmkt-card-head"><div><h3 class="zmkt-card-title">Channel Attribution & Conversion Economics</h3><p class="zmkt-card-sub">Multi-channel attribution share, quality score, and direct marketing CAC</p></div></div>',
      '  <div class="zmkt-table-wrap">',
      '    <table class="zmkt-table">',
      '      <thead><tr><th>Lead Source</th><th>Site Visitors</th><th>Leads Generated</th><th>Conv. Rate</th><th>Spend</th><th>CAC / Lead</th><th>Quality Index</th><th>Share</th></tr></thead>',
      '      <tbody>' + rows + '</tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderWebsiteAnalytics() {
    var rows = WEB_PAGES.map(function (p) {
      return [
        '<tr>',
        '  <td><b>' + p.title + '</b><div style="font-size:11px;color:#2563eb;font-family:IBM Plex Mono,monospace;">' + p.path + '</div></td>',
        '  <td style="font-family:IBM Plex Mono,monospace;font-weight:600;">' + p.views + '</td>',
        '  <td style="font-family:IBM Plex Mono,monospace;">' + p.unique + '</td>',
        '  <td style="font-family:IBM Plex Mono,monospace;">' + p.time + '</td>',
        '  <td style="font-family:IBM Plex Mono,monospace;color:#64748b;">' + p.bounce + '</td>',
        '  <td><span class="zmkt-tag zmkt-tag-active">' + p.conv + '</span></td>',
        '</tr>'
      ].join('');
    }).join('');

    return [
      '<div class="zmkt-kpi-grid">',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Monthly Visitors</span><span class="zmkt-kpi-icon-wrap">👥</span></div><div class="zmkt-kpi-val">260,800</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-up">↑ +24.2%</span><span>72% mobile browser</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Avg Session Time</span><span class="zmkt-kpi-icon-wrap">⏱️</span></div><div class="zmkt-kpi-val">3m 14s</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-up">+18s vs benchmark</span><span>Deep clinical dwell time</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Bounce Rate</span><span class="zmkt-kpi-icon-wrap">📉</span></div><div class="zmkt-kpi-val">31.2%</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-up">↓ -3.8% Lower</span><span>High intent landing pages</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Goal Conversion</span><span class="zmkt-kpi-icon-wrap">🎯</span></div><div class="zmkt-kpi-val">14.8%</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-up">↑ +2.6%</span><span>Cart & consult bookings</span></div></div>',
      '</div>',

      '<div class="zmkt-card">',
      '  <div class="zmkt-card-head"><div><h3 class="zmkt-card-title">Top Healthcare & Clinical Landing Pages</h3><p class="zmkt-card-sub">Page views, unique visitors, engagement time, and conversion actions</p></div></div>',
      '  <div class="zmkt-table-wrap">',
      '    <table class="zmkt-table">',
      '      <thead><tr><th>Landing Page URL & Content</th><th>Views</th><th>Unique Visitors</th><th>Avg Time</th><th>Bounce Rate</th><th>Goal Conv.</th></tr></thead>',
      '      <tbody>' + rows + '</tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderAppAnalytics() {
    return [
      '<div class="zmkt-kpi-grid">',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Total Downloads</span><span class="zmkt-kpi-icon-wrap">📲</span></div><div class="zmkt-kpi-val">280,600</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-up">↑ +26.8%</span><span>Android 66% · iOS 34%</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Daily Active Users</span><span class="zmkt-kpi-icon-wrap">⚡</span></div><div class="zmkt-kpi-val">48,200</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-up">DAU / MAU: 26.7%</span><span>High pet parent stickiness</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Monthly Active Users</span><span class="zmkt-kpi-icon-wrap">🐾</span></div><div class="zmkt-kpi-val">180,500</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-up">↑ +21.2%</span><span>Recurring consults & Rx</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Store Rating</span><span class="zmkt-kpi-icon-wrap">⭐</span></div><div class="zmkt-kpi-val">4.85 ★</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-up">50K+ reviews</span><span>Play Store & App Store</span></div></div>',
      '</div>',

      '<div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(460px, 1fr));gap:20px;">',
      '  <div class="zmkt-card">',
      '    <div class="zmkt-card-head"><div><h3 class="zmkt-card-title">OS Platform Economics</h3><p class="zmkt-card-sub">Android vs iOS store downloads and engagement</p></div></div>',
      '    <div class="zmkt-table-wrap">',
      '      <table class="zmkt-table">',
      '        <thead><tr><th>Platform</th><th>Installs</th><th>DAU</th><th>Rating</th></tr></thead>',
      '        <tbody>',
      '          <tr><td><b>Android (Google Play)</b></td><td style="font-family:IBM Plex Mono,monospace;">184,200</td><td style="font-family:IBM Plex Mono,monospace;">28,400</td><td><span class="zmkt-roas-pill">4.8★</span></td></tr>',
      '          <tr><td><b>iOS (Apple App Store)</b></td><td style="font-family:IBM Plex Mono,monospace;">96,400</td><td style="font-family:IBM Plex Mono,monospace;">19,800</td><td><span class="zmkt-roas-pill">4.9★</span></td></tr>',
      '        </tbody>',
      '      </table>',
      '    </div>',
      '  </div>',

      '  <div class="zmkt-card">',
      '    <div class="zmkt-card-head"><div><h3 class="zmkt-card-title">In-App Health Milestones</h3><p class="zmkt-card-sub">Completion velocity for pet parent core actions</p></div></div>',
      '    <div style="display:flex;flex-direction:column;gap:12px;">',
      '      <div style="display:flex;justify-content:space-between;padding:10px 12px;background:#f8fafc;border-radius:8px;"><div><b>Pet Health Profile Created</b><div style="font-size:11px;color:#64748b;">18,400 / mo</div></div><div style="text-align:right;"><b style="color:#2563eb;">82.4%</b><div style="font-size:11px;color:#16a34a;">+14.2%</div></div></div>',
      '      <div style="display:flex;justify-content:space-between;padding:10px 12px;background:#f8fafc;border-radius:8px;"><div><b>Instant Tele-Vet Call Initiated</b><div style="font-size:11px;color:#64748b;">9,200 / mo</div></div><div style="text-align:right;"><b style="color:#2563eb;">68.9%</b><div style="font-size:11px;color:#16a34a;">+22.5%</div></div></div>',
      '      <div style="display:flex;justify-content:space-between;padding:10px 12px;background:#f8fafc;border-radius:8px;"><div><b>Prescription Reorder in 60 Mins</b><div style="font-size:11px;color:#64748b;">14,800 / mo</div></div><div style="text-align:right;"><b style="color:#2563eb;">74.2%</b><div style="font-size:11px;color:#16a34a;">+19.1%</div></div></div>',
      '    </div>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderSocialMedia() {
    var rows = SOCIAL_CHANNELS.map(function (c) {
      return [
        '<tr>',
        '  <td><b>' + c.icon + ' ' + c.handle + '</b></td>',
        '  <td style="font-family:IBM Plex Mono,monospace;font-weight:700;">' + c.followers + '</td>',
        '  <td style="font-family:IBM Plex Mono,monospace;color:#16a34a;font-weight:600;">' + c.growth + '</td>',
        '  <td style="font-family:IBM Plex Mono,monospace;">' + c.engRate + '</td>',
        '  <td>' + c.topPost + '</td>',
        '  <td><span class="zmkt-tag zmkt-tag-scheduled">' + c.reach + '</span></td>',
        '</tr>'
      ].join('');
    }).join('');

    return [
      '<div class="zmkt-kpi-grid">',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Community Followers</span><span class="zmkt-kpi-icon-wrap">👥</span></div><div class="zmkt-kpi-val">600,900</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-up">+26.7K / mo</span><span>Across 4 social channels</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Engagement Rate</span><span class="zmkt-kpi-icon-wrap">💬</span></div><div class="zmkt-kpi-val">4.90%</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-up">Industry Avg: 1.8%</span><span>High pet parent love</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Content Reach</span><span class="zmkt-kpi-icon-wrap">🔥</span></div><div class="zmkt-kpi-val">2.45M</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-up">↑ +34.2%</span><span>Reels & video guides</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">UGC Submissions</span><span class="zmkt-kpi-icon-wrap">🐕</span></div><div class="zmkt-kpi-val">1,840</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-up">↑ +41.0%</span><span>Tagging #ZenvePets</span></div></div>',
      '</div>',

      '<div class="zmkt-card">',
      '  <div class="zmkt-card-head"><div><h3 class="zmkt-card-title">Official Brand Social Accounts & Organic Reach</h3><p class="zmkt-card-sub">Follower acquisition velocity, viral reach, and community engagement</p></div></div>',
      '  <div class="zmkt-table-wrap">',
      '    <table class="zmkt-table">',
      '      <thead><tr><th>Network & Handle</th><th>Followers</th><th>Monthly Growth</th><th>Engagement Rate</th><th>Top Performing Content</th><th>Reach Impact</th></tr></thead>',
      '      <tbody>' + rows + '</tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderAdvertising() {
    var rows = AD_SETS.map(function (a) {
      return [
        '<tr>',
        '  <td><b>' + a.name + '</b></td>',
        '  <td>' + a.platform + '</td>',
        '  <td style="font-family:IBM Plex Mono,monospace;font-weight:600;">' + a.spend + '</td>',
        '  <td style="font-family:IBM Plex Mono,monospace;">' + a.cpm + '</td>',
        '  <td style="font-family:IBM Plex Mono,monospace;">' + a.cpc + '</td>',
        '  <td style="font-family:IBM Plex Mono,monospace;color:#2563eb;font-weight:600;">' + a.cpa + '</td>',
        '  <td><span class="zmkt-roas-pill">' + a.roas + '</span></td>',
        '  <td><span class="zmkt-tag ' + (a.health === 'Optimal' ? 'zmkt-tag-active' : a.health === 'Scaling' ? 'zmkt-tag-scheduled' : 'zmkt-tag-paused') + '">' + a.health + '</span></td>',
        '</tr>'
      ].join('');
    }).join('');

    return [
      '<div class="zmkt-kpi-grid">',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Average CPM</span><span class="zmkt-kpi-icon-wrap">👁️</span></div><div class="zmkt-kpi-val">₹243</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-up">↓ -8.2%</span><span>Cost per 1K impressions</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Blended CPC</span><span class="zmkt-kpi-icon-wrap">🖱️</span></div><div class="zmkt-kpi-val">₹11.40</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-up">↓ -4.8%</span><span>Cost per ad click</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Target CPA</span><span class="zmkt-kpi-icon-wrap">🎯</span></div><div class="zmkt-kpi-val">₹162</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-up">Cap at ₹180</span><span>₹18 below max ceiling</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Auction Share</span><span class="zmkt-kpi-icon-wrap">⚡</span></div><div class="zmkt-kpi-val">94.2%</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-up">↑ +3.1%</span><span>Top ad placement rate</span></div></div>',
      '</div>',

      '<div class="zmkt-card">',
      '  <div class="zmkt-card-head"><div><h3 class="zmkt-card-title">Active Ad Sets & Creative Flighting</h3><p class="zmkt-card-sub">Ad network spend, cost per acquisition, and creative fatigue diagnostics</p></div></div>',
      '  <div class="zmkt-table-wrap">',
      '    <table class="zmkt-table">',
      '      <thead><tr><th>Ad Set / Campaign</th><th>Platform</th><th>Spend</th><th>CPM</th><th>CPC</th><th>CPA</th><th>ROAS</th><th>Creative Health</th></tr></thead>',
      '      <tbody>' + rows + '</tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderMarketingSpend() {
    var rows = SPEND_ITEMS.map(function (i) {
      return [
        '<tr>',
        '  <td><b>' + i.category + '</b></td>',
        '  <td style="font-family:IBM Plex Mono,monospace;">' + i.budget + '</td>',
        '  <td style="font-family:IBM Plex Mono,monospace;font-weight:700;">' + i.actual + '</td>',
        '  <td style="font-family:IBM Plex Mono,monospace;color:#16a34a;font-weight:600;">' + i.variance + '</td>',
        '  <td><span class="zmkt-tag zmkt-tag-active">' + i.status + '</span></td>',
        '  <td><b>' + i.share + '</b></td>',
        '</tr>'
      ].join('');
    }).join('');

    return [
      '<div class="zmkt-kpi-grid">',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Monthly Budget</span><span class="zmkt-kpi-icon-wrap">📋</span></div><div class="zmkt-kpi-val">₹8,00,000</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-neutral">Finance Approved</span><span>October 2026</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Actual Burn</span><span class="zmkt-kpi-icon-wrap">💳</span></div><div class="zmkt-kpi-val">₹7,56,500</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-up">✓ -5.4% Under Plan</span><span>₹43,500 surplus</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Media Spend Share</span><span class="zmkt-kpi-icon-wrap">📊</span></div><div class="zmkt-kpi-val">62.4%</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-neutral">Target: 60-65%</span><span>Paid ad networks</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Mkt % of GMV</span><span class="zmkt-kpi-icon-wrap">📈</span></div><div class="zmkt-kpi-val">4.8%</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-up">↓ -0.6% Lean</span><span>Highly efficient scale</span></div></div>',
      '</div>',

      '<div class="zmkt-card">',
      '  <div class="zmkt-card-head"><div><h3 class="zmkt-card-title">Marketing Expense Line Items & OPEX Adherence</h3><p class="zmkt-card-sub">Departmental cost centers, agency fees, and influencer disbursements</p></div></div>',
      '  <div class="zmkt-table-wrap">',
      '    <table class="zmkt-table">',
      '      <thead><tr><th>Spend Category</th><th>Monthly Budget</th><th>Actual Spend</th><th>Variance</th><th>Status</th><th>Share of Budget</th></tr></thead>',
      '      <tbody>' + rows + '</tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderCustomerAcquisition() {
    var rows = COHORTS.map(function (c) {
      return [
        '<tr>',
        '  <td><b>' + c.cohort + '</b></td>',
        '  <td style="font-family:IBM Plex Mono,monospace;font-weight:700;">' + c.acquired + '</td>',
        '  <td style="font-family:IBM Plex Mono,monospace;color:#16a34a;font-weight:600;">' + c.m1Repeat + '</td>',
        '  <td style="font-family:IBM Plex Mono,monospace;">' + c.m2Repeat + '</td>',
        '  <td style="font-family:IBM Plex Mono,monospace;">' + c.aov + '</td>',
        '  <td style="font-family:IBM Plex Mono,monospace;color:#2563eb;font-weight:700;">' + c.ltv60d + '</td>',
        '  <td><span class="zmkt-tag zmkt-tag-active">' + c.retention + '</span></td>',
        '</tr>'
      ].join('');
    }).join('');

    return [
      '<div class="zmkt-kpi-grid">',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">New Customers (MTD)</span><span class="zmkt-kpi-icon-wrap">👥</span></div><div class="zmkt-kpi-val">2,840</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-up">↑ +16.8%</span><span>First paid transaction</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">30D Repeat Rate</span><span class="zmkt-kpi-icon-wrap">🔄</span></div><div class="zmkt-kpi-val">44.8%</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-up">↑ +3.6%</span><span>Rx refills & nutrition</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">First Order AOV</span><span class="zmkt-kpi-icon-wrap">🛍️</span></div><div class="zmkt-kpi-val">₹1,940</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-up">+₹120 vs target</span><span>Premium basket size</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">60D Customer LTV</span><span class="zmkt-kpi-icon-wrap">💎</span></div><div class="zmkt-kpi-val">₹4,120</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-up">↑ +14.2%</span><span>High pet lifetime value</span></div></div>',
      '</div>',

      '<div class="zmkt-card">',
      '  <div class="zmkt-card-head"><div><h3 class="zmkt-card-title">Monthly Cohort Repeat Behavior & 60D LTV</h3><p class="zmkt-card-sub">Retention tracking across acquired pet parent cohorts</p></div></div>',
      '  <div class="zmkt-table-wrap">',
      '    <table class="zmkt-table">',
      '      <thead><tr><th>Cohort</th><th>Acquired Pet Parents</th><th>30-Day Repeat</th><th>60-Day Repeat</th><th>First AOV</th><th>60-Day LTV</th><th>Retention Health</th></tr></thead>',
      '      <tbody>' + rows + '</tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderCAC() {
    var rows = CITY_CAC.map(function (c) {
      return [
        '<tr>',
        '  <td><b>' + c.city + '</b></td>',
        '  <td style="font-family:IBM Plex Mono,monospace;font-weight:700;color:#2563eb;">' + c.blendedCAC + '</td>',
        '  <td style="font-family:IBM Plex Mono,monospace;">' + c.paidCAC + '</td>',
        '  <td style="font-family:IBM Plex Mono,monospace;color:#16a34a;font-weight:600;">' + c.organicCAC + '</td>',
        '  <td style="font-family:IBM Plex Mono,monospace;">' + c.newCustomers + '</td>',
        '  <td><span class="zmkt-roas-pill">' + c.ltvRatio + '</span></td>',
        '  <td><span class="zmkt-tag zmkt-tag-active">' + c.status + '</span></td>',
        '</tr>'
      ].join('');
    }).join('');

    return [
      '<div class="zmkt-kpi-grid">',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Blended CAC</span><span class="zmkt-kpi-icon-wrap">🎯</span></div><div class="zmkt-kpi-val">₹365</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-up">↓ -8.4%</span><span>All marketing channels</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Paid Only CAC</span><span class="zmkt-kpi-icon-wrap">💳</span></div><div class="zmkt-kpi-val">₹512</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-up">↓ -6.2%</span><span>Meta & Google ad spend</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Organic CAC</span><span class="zmkt-kpi-icon-wrap">🌱</span></div><div class="zmkt-kpi-val">₹92</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-up">↓ -12.1%</span><span>Viral invite & SEO</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">LTV to CAC Ratio</span><span class="zmkt-kpi-icon-wrap">⚖️</span></div><div class="zmkt-kpi-val">3.82x</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-up">Healthy > 3.0x</span><span>Unit economics validated</span></div></div>',
      '</div>',

      '<div class="zmkt-card">',
      '  <div class="zmkt-card-head"><div><h3 class="zmkt-card-title">Metropolitan Territory CAC & LTV Multiple</h3><p class="zmkt-card-sub">City-by-city acquisition efficiency, customer volume, and payback multiples</p></div></div>',
      '  <div class="zmkt-table-wrap">',
      '    <table class="zmkt-table">',
      '      <thead><tr><th>Metro Territory</th><th>Blended CAC</th><th>Paid CAC</th><th>Organic CAC</th><th>New Customers</th><th>LTV : CAC Multiple</th><th>Unit Health</th></tr></thead>',
      '      <tbody>' + rows + '</tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderROAS() {
    var rows = CATEGORY_ROAS.map(function (c) {
      return [
        '<tr>',
        '  <td><b>' + c.category + '</b></td>',
        '  <td style="font-family:IBM Plex Mono,monospace;">' + c.spend + '</td>',
        '  <td style="font-family:IBM Plex Mono,monospace;font-weight:700;">' + c.revenue + '</td>',
        '  <td><span class="zmkt-roas-pill">' + c.roas + '</span></td>',
        '  <td style="font-family:IBM Plex Mono,monospace;color:#64748b;">' + c.target + '</td>',
        '  <td><span class="zmkt-tag zmkt-tag-active">' + c.status + '</span></td>',
        '</tr>'
      ].join('');
    }).join('');

    return [
      '<div class="zmkt-kpi-grid">',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Blended ROAS</span><span class="zmkt-kpi-icon-wrap">🚀</span></div><div class="zmkt-kpi-val">4.45x</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-up">↑ +0.65x</span><span>₹33.65L Attributed GMV</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Search Ads ROAS</span><span class="zmkt-kpi-icon-wrap">🔍</span></div><div class="zmkt-kpi-val">5.20x</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-up">High intent vet care</span><span>Google campaign return</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Social Ads ROAS</span><span class="zmkt-kpi-icon-wrap">📸</span></div><div class="zmkt-kpi-val">4.12x</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-up">Instagram & Reels</span><span>Direct order checkout</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Incremental ROAS</span><span class="zmkt-kpi-icon-wrap">📈</span></div><div class="zmkt-kpi-val">3.68x</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-up">Lift over baseline</span><span>Causal incremental revenue</span></div></div>',
      '</div>',

      '<div class="zmkt-card">',
      '  <div class="zmkt-card-head"><div><h3 class="zmkt-card-title">Category Ad Return & Revenue Generated</h3><p class="zmkt-card-sub">Ad efficiency mapped directly to top pet healthcare and wellness categories</p></div></div>',
      '  <div class="zmkt-table-wrap">',
      '    <table class="zmkt-table">',
      '      <thead><tr><th>Product & Clinical Category</th><th>Ad Spend</th><th>Attributed GMV</th><th>ROAS Multiple</th><th>Target Benchmark</th><th>Performance Status</th></tr></thead>',
      '      <tbody>' + rows + '</tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderMarketingROI() {
    var rows = FINANCIAL_ROI.map(function (f) {
      return [
        '<tr>',
        '  <td><b>' + f.channel + '</b></td>',
        '  <td style="font-family:IBM Plex Mono,monospace;">' + f.spend + '</td>',
        '  <td style="font-family:IBM Plex Mono,monospace;font-weight:600;">' + f.grossProfitContrib + '</td>',
        '  <td style="font-family:IBM Plex Mono,monospace;font-weight:700;color:#16a34a;">' + f.netProfitLift + '</td>',
        '  <td><span class="zmkt-roas-pill">' + f.netROI + '</span></td>',
        '  <td style="font-family:IBM Plex Mono,monospace;color:#475569;">' + f.paybackDays + '</td>',
        '</tr>'
      ].join('');
    }).join('');

    return [
      '<div class="zmkt-kpi-grid">',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Net Marketing ROI</span><span class="zmkt-kpi-icon-wrap">📈</span></div><div class="zmkt-kpi-val">168%</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-up">↑ +24.5%</span><span>Net profit / Ad spend</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Gross Profit Lift</span><span class="zmkt-kpi-icon-wrap">💰</span></div><div class="zmkt-kpi-val">₹16,30,000</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-up">Margin-adjusted</span><span>After product COGS</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Payback Window</span><span class="zmkt-kpi-icon-wrap">⏱️</span></div><div class="zmkt-kpi-val">24.8 Days</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-up">↓ -4.2 days faster</span><span>Time to recoup CAC</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Efficiency Ratio</span><span class="zmkt-kpi-icon-wrap">⚡</span></div><div class="zmkt-kpi-val">5.24</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-up">Total Sales / Spend</span><span>High capital efficiency</span></div></div>',
      '</div>',

      '<div class="zmkt-card">',
      '  <div class="zmkt-card-head"><div><h3 class="zmkt-card-title">Margin-Adjusted Marketing Return on Investment (ROI)</h3><p class="zmkt-card-sub">Bottom-line profit generation after deducting product cost and agency spend</p></div></div>',
      '  <div class="zmkt-table-wrap">',
      '    <table class="zmkt-table">',
      '      <thead><tr><th>Marketing Channel</th><th>Spend</th><th>Gross Profit Generated</th><th>Net Profit Lift</th><th>Net ROI %</th><th>Payback Window</th></tr></thead>',
      '      <tbody>' + rows + '</tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderConversionFunnel() {
    var stepsHtml = FUNNEL_STEPS.map(function (s, idx) {
      return [
        '<div class="zmkt-funnel-step">',
        '  <div class="zmkt-funnel-head">',
        '    <div style="display:flex;align-items:center;">',
        '      <span class="zmkt-funnel-num" style="background:' + s.color + ';">' + (idx + 1) + '</span>',
        '      <span style="font-weight:700;font-size:14px;color:#0f172a;">' + s.stage + '</span>',
        '    </div>',
        '    <div style="text-align:right;">',
        '      <span style="font-weight:700;font-size:16px;color:#0f172a;font-family:IBM Plex Mono,monospace;">' + s.volume + '</span>',
        '      <span style="margin-left:8px;font-size:12px;color:#16a34a;font-weight:600;">(' + s.convRate + ')</span>',
        '    </div>',
        '  </div>',
        '  <div class="zmkt-bar-track">',
        '    <div class="zmkt-bar-fill" style="width:' + s.width + ';background:' + s.color + ';"></div>',
        '  </div>',
        '  <div style="display:flex;justify-content:space-between;font-size:12px;color:#64748b;">',
        '    <span>Key Driver: <b>' + s.channelLead + '</b></span>',
        '    ' + (s.dropPct !== '—' ? '<span style="color:#dc2626;font-weight:600;">Drop-off: ' + s.dropPct + '</span>' : '<span>Baseline</span>'),
        '  </div>',
        '</div>'
      ].join('');
    }).join('');

    return [
      '<div class="zmkt-kpi-grid">',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Top of Funnel</span><span class="zmkt-kpi-icon-wrap">👁️</span></div><div class="zmkt-kpi-val">1.84M</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-up">↑ +24.5%</span><span>Impressions across ads</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Click-to-Install</span><span class="zmkt-kpi-icon-wrap">📲</span></div><div class="zmkt-kpi-val">21.9%</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-up">High app intent</span><span>App Store / Play Store</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Cart-to-Paid</span><span class="zmkt-kpi-icon-wrap">🛒</span></div><div class="zmkt-kpi-val">36.9%</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-up">↑ +4.1%</span><span>60-min checkout flow</span></div></div>',
      '  <div class="zmkt-kpi-card"><div class="zmkt-kpi-top"><span class="zmkt-kpi-label">Converted Buyers</span><span class="zmkt-kpi-icon-wrap">🎉</span></div><div class="zmkt-kpi-val">4,720</div><div class="zmkt-kpi-foot"><span class="zmkt-badge-up">2.57% End-to-End</span><span>Paying pet parents</span></div></div>',
      '</div>',

      '<div class="zmkt-card">',
      '  <div class="zmkt-card-head"><div><h3 class="zmkt-card-title">Full Omni-Channel Conversion Funnel</h3><p class="zmkt-card-sub">Step-by-step visitor progression from initial ad view down to completed veterinary appointment</p></div></div>',
      '  <div>' + stepsHtml + '</div>',
      '</div>'
    ].join('');
  }

  /* ── Event Listeners ──────────────────────────────────────────────── */
  function wireEvents() {
    // Tab switching chips
    root.querySelectorAll('.zmkt-chip').forEach(function (btn) {
      btn.onclick = function () {
        var t = btn.getAttribute('data-tab');
        switchTab(t);
      };
    });

    // Close button
    var closeBtn = root.querySelector('#zmkt-close-btn');
    if (closeBtn) {
      closeBtn.onclick = function () {
        close();
      };
    }

    // Launch Campaign button
    var addCampBtn = root.querySelector('#zmkt-add-campaign-btn');
    if (addCampBtn) {
      addCampBtn.onclick = function () {
        showLaunchCampaignModal();
      };
    }

    // ROAS Calculator button
    var calcBtn = root.querySelector('#zmkt-calc-btn');
    if (calcBtn) {
      calcBtn.onclick = function () {
        showCalculatorModal();
      };
    }

    // Export CSV button
    var expBtn = root.querySelector('#zmkt-export-btn');
    if (expBtn) {
      expBtn.onclick = function () {
        exportTabCSV();
      };
    }
  }

  function wireTabSpecificEvents() {
    // Campaign search
    var campSearch = root.querySelector('#zmkt-camp-search');
    if (campSearch) {
      campSearch.oninput = function () {
        S.searchQuery = campSearch.value;
        renderTabContent();
        var newInp = root.querySelector('#zmkt-camp-search');
        if (newInp) {
          newInp.focus();
          newInp.setSelectionRange(newInp.value.length, newInp.value.length);
        }
      };
    }

    // Campaign status select
    var campStatus = root.querySelector('#zmkt-camp-status');
    if (campStatus) {
      campStatus.onchange = function () {
        S.statusFilter = campStatus.value;
        renderTabContent();
      };
    }

    // Lead search
    var leadSearch = root.querySelector('#zmkt-lead-search');
    if (leadSearch) {
      leadSearch.oninput = function () {
        S.searchQuery = leadSearch.value;
        renderTabContent();
        var newInp = root.querySelector('#zmkt-lead-search');
        if (newInp) {
          newInp.focus();
          newInp.setSelectionRange(newInp.value.length, newInp.value.length);
        }
      };
    }

    // Add lead button in Leads tab
    var addLeadBtn = root.querySelector('#zmkt-add-lead-btn');
    if (addLeadBtn) {
      addLeadBtn.onclick = function () {
        showAddLeadModal();
      };
    }
  }

  /* ── Modals & Actions ─────────────────────────────────────────────── */
  function showLaunchCampaignModal() {
    var modal = document.createElement('div');
    modal.className = 'zmkt-modal-backdrop';
    modal.innerHTML = [
      '<div class="zmkt-modal-box">',
      '  <div class="zmkt-modal-head">',
      '    <h3>🚀 Launch Marketing Campaign Flight</h3>',
      '    <button type="button" class="zmkt-btn-icon" id="m-close">✕</button>',
      '  </div>',
      '  <div class="zmkt-modal-body">',
      '    <div class="zmkt-form-group"><label class="zmkt-label">Campaign Name</label><input class="zmkt-input" id="m-name" placeholder="e.g. Winter Dog Coat & Vitamin D Promotion" required></div>',
      '    <div class="zmkt-form-group"><label class="zmkt-label">Channel</label><select class="zmkt-select" id="m-channel" style="width:100%;"><option value="Google Search Ads">Google Search Ads</option><option value="Meta (Insta & FB)">Meta (Insta & FB)</option><option value="Meta Instagram Reels">Meta Instagram Reels</option><option value="YouTube Video Ads">YouTube Video Ads</option><option value="Partner Vet Clinics">Partner Vet Clinics</option><option value="WhatsApp & SMS">WhatsApp & SMS</option></select></div>',
      '    <div class="zmkt-form-group"><label class="zmkt-label">Allocated Budget (₹)</label><input class="zmkt-input" id="m-budget" placeholder="e.g. 150000" type="number" required></div>',
      '    <div class="zmkt-form-group"><label class="zmkt-label">Target ROAS (e.g. 4.5x)</label><input class="zmkt-input" id="m-roas" placeholder="e.g. 4.5x" value="4.5x" required></div>',
      '  </div>',
      '  <div class="zmkt-modal-foot">',
      '    <button type="button" class="zmkt-btn zmkt-btn-secondary" id="m-cancel">Cancel</button>',
      '    <button type="button" class="zmkt-btn zmkt-btn-primary" id="m-save">Launch Flight</button>',
      '  </div>',
      '</div>'
    ].join('');
    document.body.appendChild(modal);

    function closeM() { modal.remove(); }
    modal.querySelector('#m-close').onclick = closeM;
    modal.querySelector('#m-cancel').onclick = closeM;
    modal.querySelector('#m-save').onclick = function () {
      var name = document.getElementById('m-name').value;
      var chan = document.getElementById('m-channel').value;
      var budget = document.getElementById('m-budget').value;
      var roas = document.getElementById('m-roas').value;
      if (!name || !budget) { alert('Please enter campaign name and budget.'); return; }

      CAMPAIGNS.unshift({
        id: 'CMP-' + (200 + CAMPAIGNS.length + 1),
        name: name,
        channel: chan,
        budget: '₹' + Number(budget).toLocaleString(),
        spend: '₹0',
        impressions: '0',
        clicks: '0',
        ctr: '0.00%',
        conv: 0,
        cac: '—',
        roas: roas || '4.0x',
        status: 'Active'
      });

      showToast('Campaign "' + name + '" launched successfully!');
      closeM();
      S.tab = 'campaigns';
      render();
    };
  }

  function showAddLeadModal() {
    var modal = document.createElement('div');
    modal.className = 'zmkt-modal-backdrop';
    modal.innerHTML = [
      '<div class="zmkt-modal-box">',
      '  <div class="zmkt-modal-head">',
      '    <h3>🎯 Capture New Pet Parent Lead</h3>',
      '    <button type="button" class="zmkt-btn-icon" id="m-close">✕</button>',
      '  </div>',
      '  <div class="zmkt-modal-body">',
      '    <div class="zmkt-form-group"><label class="zmkt-label">Pet Parent Name</label><input class="zmkt-input" id="m-pname" placeholder="e.g. Shalini Roy" required></div>',
      '    <div class="zmkt-form-group"><label class="zmkt-label">Pet Companion (Breed & Name)</label><input class="zmkt-input" id="m-pet" placeholder="e.g. Beagle (Simba)" required></div>',
      '    <div class="zmkt-form-group"><label class="zmkt-label">City & Zone</label><input class="zmkt-input" id="m-city" placeholder="e.g. Bengaluru (HSR Layout)" required></div>',
      '    <div class="zmkt-form-group"><label class="zmkt-label">Acquisition Channel</label><select class="zmkt-select" id="m-source" style="width:100%;"><option value="Google Search Ads">Google Search Ads</option><option value="Instagram Reels">Instagram Reels</option><option value="Vet Clinic Referral">Vet Clinic Referral</option><option value="In-App Telehealth">In-App Telehealth</option><option value="Direct Website">Direct Website</option></select></div>',
      '  </div>',
      '  <div class="zmkt-modal-foot">',
      '    <button type="button" class="zmkt-btn zmkt-btn-secondary" id="m-cancel">Cancel</button>',
      '    <button type="button" class="zmkt-btn zmkt-btn-primary" id="m-save">Save Lead</button>',
      '  </div>',
      '</div>'
    ].join('');
    document.body.appendChild(modal);

    function closeM() { modal.remove(); }
    modal.querySelector('#m-close').onclick = closeM;
    modal.querySelector('#m-cancel').onclick = closeM;
    modal.querySelector('#m-save').onclick = function () {
      var pname = document.getElementById('m-pname').value;
      var pet = document.getElementById('m-pet').value;
      var city = document.getElementById('m-city').value;
      var source = document.getElementById('m-source').value;
      if (!pname || !pet) { alert('Please enter pet parent name and pet companion details.'); return; }

      LEADS.unshift({
        id: 'LD-' + (4090 + LEADS.length + 1),
        parent: pname,
        pet: pet,
        city: city || 'Bengaluru',
        source: source,
        score: 'A',
        stage: 'New',
        rep: 'Dr. Priya Sharma',
        value: '₹3,500',
        status: 'Active'
      });

      showToast('Lead for pet parent ' + pname + ' registered!');
      closeM();
      renderTabContent();
    };
  }

  function showCalculatorModal() {
    var modal = document.createElement('div');
    modal.className = 'zmkt-modal-backdrop';
    modal.innerHTML = [
      '<div class="zmkt-modal-box">',
      '  <div class="zmkt-modal-head">',
      '    <h3>⚡ Instant Marketing ROAS & CAC Calculator</h3>',
      '    <button type="button" class="zmkt-btn-icon" id="m-close">✕</button>',
      '  </div>',
      '  <div class="zmkt-modal-body">',
      '    <div class="zmkt-form-group"><label class="zmkt-label">Total Campaign Ad Spend (₹)</label><input class="zmkt-input" id="c-spend" value="100000" type="number"></div>',
      '    <div class="zmkt-form-group"><label class="zmkt-label">Total Revenue Generated (₹)</label><input class="zmkt-input" id="c-rev" value="450000" type="number"></div>',
      '    <div class="zmkt-form-group"><label class="zmkt-label">Total Customers Acquired</label><input class="zmkt-input" id="c-cust" value="260" type="number"></div>',
      '    <div style="background:#f8fafc;padding:14px;border-radius:10px;margin-top:10px;display:grid;grid-template-columns:1fr 1fr;gap:12px;">',
      '      <div><span style="font-size:11px;color:#64748b;">CALCULATED ROAS</span><div id="res-roas" style="font-size:22px;font-weight:700;color:#16a34a;">4.50x</div></div>',
      '      <div><span style="font-size:11px;color:#64748b;">BLENDED CAC</span><div id="res-cac" style="font-size:22px;font-weight:700;color:#2563eb;">₹385</div></div>',
      '    </div>',
      '  </div>',
      '  <div class="zmkt-modal-foot">',
      '    <button type="button" class="zmkt-btn zmkt-btn-primary" id="m-calc-close">Done</button>',
      '  </div>',
      '</div>'
    ].join('');
    document.body.appendChild(modal);

    function updateCalc() {
      var sp = Number(document.getElementById('c-spend').value) || 1;
      var rv = Number(document.getElementById('c-rev').value) || 0;
      var cu = Number(document.getElementById('c-cust').value) || 1;
      var roas = (rv / sp).toFixed(2) + 'x';
      var cac = '₹' + Math.round(sp / cu).toLocaleString();
      document.getElementById('res-roas').textContent = roas;
      document.getElementById('res-cac').textContent = cac;
    }

    modal.querySelector('#c-spend').oninput = updateCalc;
    modal.querySelector('#c-rev').oninput = updateCalc;
    modal.querySelector('#c-cust').oninput = updateCalc;
    modal.querySelector('#m-close').onclick = function () { modal.remove(); };
    modal.querySelector('#m-calc-close').onclick = function () { modal.remove(); };
  }

  function exportTabCSV() {
    var curMod = MODULES.find(function (m) { return m.id === S.tab; }) || MODULES[0];
    var csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Zenve BI Marketing Intelligence Export - " + curMod.label + "\n";
    csvContent += "Export Date: " + new Date().toISOString() + "\n\n";

    if (S.tab === 'campaigns') {
      csvContent += "Campaign ID,Campaign Name,Channel,Spend,Budget,Impressions,CTR,Conversions,CAC,ROAS,Status\n";
      CAMPAIGNS.forEach(function (c) {
        csvContent += [c.id, '"' + c.name + '"', '"' + c.channel + '"', c.spend, c.budget, c.impressions, c.ctr, c.conv, c.cac, c.roas, c.status].join(',') + "\n";
      });
    } else if (S.tab === 'leads') {
      csvContent += "Lead ID,Pet Parent,Pet,City,Source,Score,Stage,Rep,Value,Status\n";
      LEADS.forEach(function (l) {
        csvContent += [l.id, '"' + l.parent + '"', '"' + l.pet + '"', '"' + l.city + '"', '"' + l.source + '"', l.score, l.stage, '"' + l.rep + '"', l.value, l.status].join(',') + "\n";
      });
    } else {
      csvContent += "Category,Metric,Value,Note\n";
      csvContent += "Marketing Performance,Blended ROAS,4.45x,Across all paid channels\n";
      csvContent += "Marketing Economics,Blended CAC,₹365,Acquisition cost per pet parent\n";
      csvContent += "Funnel Velocity,Top of Funnel,1.84M impressions,Meta & Google\n";
    }

    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "zenve_marketing_" + S.tab + "_report.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
    showToast('Downloaded ' + curMod.label + ' CSV report.');
  }

  function toggleCampaignStatus(id) {
    CAMPAIGNS.forEach(function (c) {
      if (c.id === id) {
        c.status = c.status === 'Active' ? 'Paused' : 'Active';
        showToast('Campaign ' + id + ' status updated to ' + c.status + '.');
      }
    });
    renderTabContent();
  }

  function viewLead(id) {
    var l = LEADS.find(function (x) { return x.id === id; });
    if (!l) return;
    alert('🐾 Pet Parent Lead 360° Profile:\n\n' +
      'Lead ID: ' + l.id + '\n' +
      'Pet Parent: ' + l.parent + '\n' +
      'Companion: ' + l.pet + '\n' +
      'Location: ' + l.city + '\n' +
      'Acquisition Source: ' + l.source + '\n' +
      'Score: ' + l.score + '\n' +
      'Pipeline Stage: ' + l.stage + '\n' +
      'Assigned Rep: ' + l.rep + '\n' +
      'Pipeline Est. Value: ' + l.value + '\n' +
      'Status: ' + l.status
    );
  }

  /* ── Navigation & Control ─────────────────────────────────────────── */
  function open(tab) {
    closeOthers();
    init();
    if (tab) S.tab = tab;
    S.open = true;
    render();
    root.classList.add('zpanel-open');
    var targetHash = (MODULES.find(function(m){ return m.id === S.tab; }) || {}).hash || '#marketing-dashboard';
    if (window.location.hash !== targetHash) {
      try { history.pushState(null, '', targetHash); } catch (e) { window.location.hash = targetHash; }
    }
  }

  function close() {
    if (root) root.classList.remove('zpanel-open');
    S.open = false;
    var h = window.location.hash;
    if (h.startsWith('#marketing') || h.startsWith('#campaign') || h.startsWith('#lead') || h.startsWith('#web') || h.startsWith('#app-') || h.startsWith('#social') || h.startsWith('#ad') || h.startsWith('#cac') || h.startsWith('#roas') || h.startsWith('#conversion')) {
      try { history.pushState(null, '', window.location.pathname + window.location.search); } catch (e) {}
    }
  }

  function switchTab(tab) {
    if (!tab) return;
    S.tab = tab;
    var targetHash = (MODULES.find(function(m){ return m.id === tab; }) || {}).hash || '#marketing-dashboard';
    if (window.location.hash !== targetHash) {
      try { history.pushState(null, '', targetHash); } catch (e) { window.location.hash = targetHash; }
    }
    render();
  }

  function init() {
    root = document.getElementById('zmkt-dashboard-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'zmkt-dashboard-root';
      root.className = 'zpanel-root zmkt-root';
      document.body.appendChild(root);
    }
  }

  /* ── Interceptor for Sidebar ──────────────────────────────────────── */
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;

    // Never intercept accordion group headers or search input
    if (t.closest('[aria-expanded]') || t.closest('button[aria-expanded]') || t.closest('[aria-label="Search menu"]')) return;

    var item = t.closest('button, [data-go], a, [role="button"], li');
    if (item && item.textContent) {
      var tab = tabFromText(item.textContent);
      if (tab) {
        if (!t.closest('#zmkt-dashboard-root')) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          open(tab);
        }
      }
    }
  }, true);

  // Keyboard Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && S.open) close();
  });

  // Hashchange Listener
  window.addEventListener('hashchange', function () {
    var tab = tabFromHash(window.location.hash);
    if (tab) {
      open(tab);
    } else if (S.open && !window.location.hash.startsWith('#marketing') && !window.location.hash.startsWith('#campaign') && !window.location.hash.startsWith('#lead') && !window.location.hash.startsWith('#roas') && !window.location.hash.startsWith('#cac') && !window.location.hash.startsWith('#conversion')) {
      close();
    }
  });

  /* ── Export Global API ────────────────────────────────────────────── */
  window.ZenveMarketingDashboard = {
    open: open,
    close: close,
    switchTab: switchTab,
    showLaunchCampaignModal: showLaunchCampaignModal,
    showAddLeadModal: showAddLeadModal,
    showCalculatorModal: showCalculatorModal,
    toggleCampaignStatus: toggleCampaignStatus,
    viewLead: viewLead,
    exportTabCSV: exportTabCSV
  };

  /* ── Boot ─────────────────────────────────────────────────────────── */
  function boot() {
    init();
    var initialTab = tabFromHash(window.location.hash);
    if (initialTab) {
      setTimeout(function () { open(initialTab); }, 200);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
