/* =====================================================================
   Zenve BI — Subscriptions Executive Control Center & Dashboards
   Suite (8 Subdomains):
     1. Subscription Dashboard    (#subscription-dashboard / #subscriptions)
     2. Active Subscriptions      (#active-subscriptions)
     3. New Subscriptions         (#new-subscriptions)
     4. Renewals                  (#renewals / #subscription-renewals)
     5. Expiring Subscriptions    (#expiring-subscriptions)
     6. Churn                     (#churn / #subscription-churn)
     7. Subscription Revenue      (#subscription-revenue)
     8. Subscription Analytics    (#subscription-analytics)
   ===================================================================== */

(function () {
  'use strict';

  function esc(s) {
    if (s == null) return '';
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ── 8 Subdomains Configuration ─────────────────────────────────── */
  var TABS = [
    { id: 'dashboard',   label: 'Subscription Dashboard', icon: '🔄', hash: '#subscription-dashboard', badge: '',  title: 'Recurring Subscriptions & Pet Wellness Memberships', sub: 'Monthly recurring revenue (MRR), automated doorstep auto-shipments, preventive wellness plans, and subscriber cohorts' },
    { id: 'active',      label: 'Active Subscriptions',   icon: '✅', hash: '#active-subscriptions',   badge: '',     title: 'Active Member Roster & Auto-Debit Mandates', sub: 'Live subscriber cohort, e-mandate banking authorizations, recurring fulfillment status, and pet health profiles' },
    { id: 'new',         label: 'New Subscriptions',      icon: '✨', hash: '#new-subscriptions',      badge: '',     title: 'New Subscriber Acquisition & Channel Velocity', sub: 'Monthly new subscriber signups, acquisition channel conversion, customer acquisition cost (CAC), and payback period' },
    { id: 'renewals',    label: 'Renewals',               icon: '🔄', hash: '#renewals',               badge: '',   title: 'Automated Billing Cycles & Renewal Rates', sub: 'Monthly automated debit execution, dunning management, card & UPI retry algorithms, and successful collection velocity' },
    { id: 'expiring',    label: 'Expiring Subscriptions', icon: '⏳', hash: '#expiring-subscriptions', badge: '',    title: 'Upcoming Expiries & Proactive Retention Alerts', sub: 'Annual membership renewals due in 30 days, token expiration mitigation, and concierge outreach pipeline' },
    { id: 'churn',       label: 'Churn',                  icon: '📉', hash: '#churn',                  badge: '',  title: 'Subscriber Churn Analytics & Root Cause Mitigation', sub: 'Voluntary and involuntary churn analysis, exit survey insights, revenue attrition, and win-back campaigns' },
    { id: 'revenue',     label: 'Subscription Revenue',   icon: '💵', hash: '#subscription-revenue',   badge: '', title: 'Recurring Revenue (MRR / ARR) Trajectory', sub: 'Monthly recurring revenue breakdown, annualized contract run rates, expansion revenue, and gross margins' },
    { id: 'analytics',   label: 'Subscription Analytics', icon: '📊', hash: '#subscription-analytics', badge: '', title: 'Cohort Retention & Lifetime Value (LTV) Deep-Dive', sub: 'Multi-month retention heatmaps, customer lifetime value expansion, payback velocity, and subscriber health scores' }
  ];

  /* ── Master Datasets ─────────────────────────────────────────────── */
  var PLANS = [];

  var SUBSCRIBERS = [];

  /* ── State ───────────────────────────────────────────────────────── */
  var S = {
    open: false,
    tab: 'dashboard',
    search: ''
  };

  var root = null;

  /* ── Route Resolution ────────────────────────────────────────────── */
  function tabFromHash(hash) {
    if (!hash) return null;
    var h = (hash.startsWith('#') ? hash.slice(1) : hash).toLowerCase();
    if (h.indexOf('report') >= 0 || h.indexOf('alert') >= 0 || h.indexOf('vendor') >= 0 || h.indexOf('fashion') >= 0 || h.indexOf('b2b') >= 0 || h.indexOf('enterprise') >= 0 || h.indexOf('import') >= 0 || h.indexOf('export') >= 0) {
      return null;
    }
    if (h === 'subscription-dashboard' || h === 'subscriptions' || h === 'subscription') return 'dashboard';
    if (h === 'active-subscriptions' || h === 'active-subs') return 'active';
    if (h === 'new-subscriptions' || h === 'new-subs') return 'new';
    if (h === 'renewals' || h === 'subscription-renewals') return 'renewals';
    if (h === 'expiring-subscriptions' || h === 'expiring') return 'expiring';
    if (h === 'churn' || h === 'subscription-churn') return 'churn';
    if (h === 'subscription-revenue' || h === 'mrr') return 'revenue';
    if (h === 'subscription-analytics') return 'analytics';
    return null;
  }

  function tabFromText(txt) {
    if (!txt) return null;
    var raw = txt.replace(/\s+/g, ' ').trim().toLowerCase();
    if (raw.indexOf('report') >= 0 || raw.indexOf('alert') >= 0 || raw.indexOf('vendor') >= 0 || raw.indexOf('fashion') >= 0 || raw.indexOf('b2b') >= 0) return null;

    if (raw === 'subscription dashboard' || raw === 'subscriptions') return 'dashboard';
    if (raw === 'active subscriptions') return 'active';
    if (raw === 'new subscriptions') return 'new';
    if (raw === 'renewals') return 'renewals';
    if (raw === 'expiring subscriptions') return 'expiring';
    if (raw === 'churn') return 'churn';
    if (raw === 'subscription revenue') return 'revenue';
    if (raw === 'subscription analytics') return 'analytics';
    return null;
  }

  /* ── KPI Helper ──────────────────────────────────────────────────── */
  function kpiHtml(label, val, delta, trend, subtext, icon) {
    return [
      '<div class="zsub-kpi">',
        '<div class="zsub-kpi-top">',
          '<span class="zsub-kpi-label">' + esc(label) + '</span>',
          '<span class="zsub-kpi-icon">' + esc(icon || '🔄') + '</span>',
        '</div>',
        '<div class="zsub-kpi-val">' + esc(val) + '</div>',
        '<div class="zsub-kpi-bottom">',
          '<span class="zsub-delta ' + (trend === 'up' ? 'up' : trend === 'down' ? 'down' : 'warn') + '">' + (trend === 'up' ? '↑ ' : trend === 'down' ? '↓ ' : '• ') + esc(delta) + '</span>',
          '<span class="zsub-subtext">' + esc(subtext) + '</span>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Render Subdomains ───────────────────────────────────────────── */
  function renderDashboard() {
    return [
      '<div class="zsub-kpi-grid">',
        kpiHtml('Monthly Recurring Rev (MRR)', '₹11.51 Lakh', '+24.8% MoM', 'up', 'Annualized ARR: ₹1.38 Cr', '🔄'),
        kpiHtml('Active Paying Subscribers', '824 Pets', '+68 net new this mo', 'up', 'Across 5 recurring plans', '👥'),
        kpiHtml('Subscriber Renewal Rate', '95.4%', '+1.2% improvement', 'up', 'Automated UPI / Card mandates', '🛡️'),
        kpiHtml('Gross Monthly Churn', '1.18%', '-0.3% reduction', 'up', 'Benchmark: 3.5%', '📉'),
        kpiHtml('Average Revenue / User (ARPU)', '₹1,397 / mo', '+8.5% YoY', 'up', 'Multi-tier add-ons', '💎'),
        kpiHtml('Customer Lifetime Value (LTV)', '₹24,800', '17.8 months avg tenure', 'up', 'LTV/CAC ratio: 5.4x', '⭐'),
      '</div>',

      '<div class="zsub-card">',
        '<div class="zsub-card-head">',
          '<div>',
            '<h3 class="zsub-card-title">🔄 Recurring Membership Plans & MRR Performance</h3>',
            '<p class="zsub-card-sub">Active subscriber counts, recurring revenue contribution, and plan benefits</p>',
          '</div>',
          '<button class="zsub-btn primary" onclick="ZenveSubscriptionsDashboard.showNewPlanModal()">+ New Plan</button>',
        '</div>',
        '<div class="zsub-table-wrap">',
          '<table class="zsub-table">',
            '<thead><tr><th>Plan Code</th><th>Plan Name</th><th>Monthly Price</th><th>Active Pets</th><th>MRR Contribution</th><th>Renewal Rate</th><th>Monthly Churn</th><th>Status</th></tr></thead>',
            '<tbody>',
              PLANS.map(function(p) {
                return '<tr>' +
                  '<td style="font-family:monospace;font-weight:600;">' + esc(p.id) + '</td>' +
                  '<td style="font-weight:600;">' + esc(p.name) + '</td>' +
                  '<td style="font-weight:600;color:#6d28d9;">' + esc(p.price) + '</td>' +
                  '<td style="font-weight:600;">' + esc(p.activeSubscribers) + ' Pets</td>' +
                  '<td style="font-weight:600;color:#059669;">' + esc(p.mrr) + '</td>' +
                  '<td>' + esc(p.renewalRate) + '</td>' +
                  '<td><span class="zsub-pill active">' + esc(p.churn) + '</span></td>' +
                  '<td><span class="zsub-pill sub">Live Plan</span></td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderActive() {
    return [
      '<div class="zsub-kpi-grid">',
        kpiHtml('Total Active Subscriptions', '824 Pets', '+68 net this month', 'up', 'Bangalore, Mumbai, Delhi', '✅'),
        kpiHtml('Auto-Debit Mandate Success', '98.2%', 'NPCI UPI & E-NACH', 'up', 'Automated tokenization', '💳'),
        kpiHtml('Subscriber Longevity', '14.2 Months', '+2.4 months YoY', 'up', 'High customer stickiness', '⏱️'),
        kpiHtml('Collected Active MRR', '₹11.51 Lakh', '100% collectable', 'up', 'Zero manual follow-up', '💰'),
      '</div>',
      '<div class="zsub-card">',
        '<div class="zsub-card-head"><div><h3 class="zsub-card-title">✅ Live Active Members Master Roster</h3><p class="zsub-card-sub">Subscribed pets, parent details, mandate rails, and renewal dates</p></div></div>',
        '<div class="zsub-table-wrap">',
          '<table class="zsub-table">',
            '<thead><tr><th>Sub ID</th><th>Pet Patient</th><th>Parent Name</th><th>Plan</th><th>Mandate Rail</th><th>Monthly Rate</th><th>Next Billing</th><th>Status</th></tr></thead>',
            '<tbody>',
              SUBSCRIBERS.map(function(s) {
                return '<tr>' +
                  '<td style="font-family:monospace;font-weight:600;">' + esc(s.subId) + '</td>' +
                  '<td style="font-weight:600;">' + esc(s.petName) + '</td>' +
                  '<td>' + esc(s.parent) + '</td>' +
                  '<td>' + esc(s.plan) + '</td>' +
                  '<td>' + esc(s.autoDebit) + '</td>' +
                  '<td style="font-weight:600;color:#059669;">' + esc(s.monthlyFee) + '</td>' +
                  '<td>' + esc(s.nextRenewal) + '</td>' +
                  '<td><span class="zsub-pill active">' + esc(s.status) + '</span></td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderNew() {
    return [
      '<div class="zsub-kpi-grid">',
        kpiHtml('New Subscriptions (MTD)', '108 Signups', '+34% vs last month', 'up', 'Target: 90 signups', '✨'),
        kpiHtml('Blended Acquisition CAC', '₹342', '-18% YoY reduction', 'up', 'Clinic referral efficiency', '🎯'),
        kpiHtml('New MRR Added', '₹1,82,684', '+28% MoM', 'up', 'Pure ARR expansion', '💰'),
        kpiHtml('Avg Payback Period', '16.4 Days', 'Instant unit profit', 'up', 'First month margin positive', '⏱️'),
      '</div>',
      '<div class="zsub-card">',
        '<div class="zsub-card-head"><div><h3 class="zsub-card-title">✨ New Subscriber Acquisition Channels</h3><p class="zsub-card-sub">Acquisition velocity, CAC, conversion rate, and payback days</p></div></div>',
        '<div class="zsub-table-wrap">',
          '<table class="zsub-table">',
            '<thead><tr><th>Channel</th><th>Signups</th><th>CAC</th><th>Conversion</th><th>New MRR</th><th>Payback</th></tr></thead>',
            '<tbody>',
              '<tr><td style="font-weight:600;">Zenve SuperApp Onboarding</td><td>38 Subs</td><td>₹420</td><td>14.2%</td><td style="color:#059669;font-weight:600;">₹56,400</td><td><span class="zsub-pill active">22 Days</span></td></tr>',
              '<tr><td style="font-weight:600;">Clinic Post-Consult Checkout</td><td>24 Subs</td><td>₹180</td><td>32.5%</td><td style="color:#059669;font-weight:600;">₹45,600</td><td><span class="zsub-pill active">8 Days</span></td></tr>',
              '<tr><td style="font-weight:600;">Welcome Puppy & Kitten Camp</td><td>16 Subs</td><td>₹310</td><td>28.0%</td><td style="color:#059669;font-weight:600;">₹23,984</td><td><span class="zsub-pill active">14 Days</span></td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderRenewals() {
    return [
      '<div class="zsub-kpi-grid">',
        kpiHtml('First-Pass Renewal Rate', '96.1%', '+1.8% vs Q2', 'up', 'Automated mandate execution', '🔄'),
        kpiHtml('Smart Dunning Recovery', '75.0%', '9 of 12 recovered', 'up', 'WhatsApp prompt + retry', '⚡'),
        kpiHtml('Processed Renewal Funds', '₹5.74 Lakh', 'MTD collected', 'up', 'Direct bank settlement', '💰'),
        kpiHtml('Involuntary Churn', '0.7%', 'Card expiry / low balance', 'up', 'Benchmark: 2.2%', '📉'),
      '</div>',
      '<div class="zsub-card">',
        '<div class="zsub-card-head"><div><h3 class="zsub-card-title">🔄 Monthly Renewal Batches & Auto-Debit Performance</h3><p class="zsub-card-sub">Scheduled debits, success rates, retry recovery, and collected funds</p></div></div>',
        '<div class="zsub-table-wrap">',
          '<table class="zsub-table">',
            '<thead><tr><th>Billing Cohort</th><th>Scheduled</th><th>Success</th><th>Retry Queue</th><th>Renewal Rate</th><th>Collected Value</th></tr></thead>',
            '<tbody>',
              '<tr><td style="font-weight:600;">Oct 2026 Scheduled Cycles</td><td>412 Debits</td><td style="color:#059669;font-weight:600;">396</td><td style="color:#d97706;">12</td><td><span class="zsub-pill active">96.1%</span></td><td style="font-weight:600;color:#6d28d9;">₹5,74,200</td></tr>',
              '<tr><td style="font-weight:600;">Sep 2026 Completed Cycles</td><td>388 Debits</td><td style="color:#059669;font-weight:600;">372</td><td>0</td><td><span class="zsub-pill active">95.9%</span></td><td style="font-weight:600;color:#6d28d9;">₹5,38,100</td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderExpiring() {
    return [
      '<div class="zsub-kpi-grid">',
        kpiHtml('Expiries in 30 Days', '14 Plans', '₹1.84L Annualized', 'warn', 'Annual membership plans', '⏳'),
        kpiHtml('Pre-Renewal Confirmation', '71.4%', '10 of 14 confirmed', 'up', 'Automated outreach response', '✅'),
        kpiHtml('Token Expirations', '2 Cards', 'Mandate update needed', 'warn', 'NPCI notification', '💳'),
        kpiHtml('Concierge Retention Rate', '88.0%', 'Direct vet nurse call', 'up', 'Zero passive drop-off', '🛡️'),
      '</div>',
      '<div class="zsub-card">',
        '<div class="zsub-card-head"><div><h3 class="zsub-card-title">⏳ Proactive Expiration Watchlist & Action Queue</h3><p class="zsub-card-sub">Subscriptions expiring within 30 days and automated retention actions</p></div></div>',
        '<div class="zsub-table-wrap">',
          '<table class="zsub-table">',
            '<thead><tr><th>Sub ID</th><th>Pet Patient</th><th>Parent</th><th>Plan</th><th>Expiry Timeline</th><th>Value</th><th>Action Taken</th></tr></thead>',
            '<tbody>',
              '<tr><td style="font-family:monospace;">SUB-EXP-1101</td><td style="font-weight:600;">Rocky (Beagle)</td><td>Rajesh Subramaniam</td><td>Puppy Preventive Care</td><td style="color:#d97706;font-weight:600;">In 7 Days</td><td style="font-weight:600;color:#059669;">₹14,990 / yr</td><td>WhatsApp Prompt Sent</td></tr>',
              '<tr><td style="font-family:monospace;">SUB-EXP-1102</td><td style="font-weight:600;">Snowy (Persian Cat)</td><td>Meera Chawla</td><td>Feline Wellness & Spa</td><td style="color:#d97706;font-weight:600;">In 10 Days</td><td style="font-weight:600;color:#059669;">₹12,500 / yr</td><td>Card Token Update Sent</td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderChurn() {
    return [
      '<div class="zsub-kpi-grid">',
        kpiHtml('Gross Monthly Churn', '1.18%', '-0.3% MoM reduction', 'up', 'Only 14 cancellations MTD', '📉'),
        kpiHtml('Net Revenue Retention (NRR)', '114.2%', '+4.2% YoY', 'up', 'Expansion > Churn', '📈'),
        kpiHtml('Preventable Churn Ratio', '33.5%', 'Mitigated via downgrades', 'up', 'Saved 42% of budget exits', '🛡️'),
        kpiHtml('Win-Back Campaign Rate', '24.8%', 'Re-subscribed in 90D', 'up', 'Targeted re-activation', '🔄'),
      '</div>',
      '<div class="zsub-card">',
        '<div class="zsub-card-head"><div><h3 class="zsub-card-title">📉 Root Cause Churn Analysis & Remediation</h3><p class="zsub-card-sub">Stated exit reasons, lost MRR, and automated retention workflows</p></div></div>',
        '<div class="zsub-table-wrap">',
          '<table class="zsub-table">',
            '<thead><tr><th>Stated Cancellation Reason</th><th>Share</th><th>Lost MRR</th><th>Preventable?</th><th>Remediation Action</th></tr></thead>',
            '<tbody>',
              '<tr><td style="font-weight:600;">Relocation to City without Zenve Clinic Hub</td><td>38.5%</td><td style="color:#dc2626;font-weight:600;">₹8,490</td><td>No (Geo)</td><td>Telehealth Fallback Offered</td></tr>',
              '<tr><td style="font-weight:600;">Financial Constraints / Budgeting</td><td>18.2%</td><td style="color:#dc2626;font-weight:600;">₹4,497</td><td>Yes</td><td>Downgrade to Telehealth Saved 2</td></tr>',
              '<tr><td style="font-weight:600;">Switch to Custom Raw Diet</td><td>15.3%</td><td style="color:#dc2626;font-weight:600;">₹5,700</td><td>Yes</td><td>Nutrition Counseling Booked</td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderRevenue() {
    return [
      '<div class="zsub-kpi-grid">',
        kpiHtml('Annual Recurring Revenue (ARR)', '₹1.38 Crore', '+36.2% YoY', 'up', 'Current MRR x 12', '💵'),
        kpiHtml('Monthly Recurring Rev (MRR)', '₹11.51 Lakh', '+24.8% MoM', 'up', '100% contracted debits', '🔄'),
        kpiHtml('Subscription Gross Margin', '58.2%', '+4.1% YoY', 'up', 'High digital & telehealth mix', '📈'),
        kpiHtml('Expansion / Upsell MRR', '₹1.14 Lakh', '+18% MoM', 'up', 'Nutrition tier upgrades', '🚀'),
      '</div>',
      '<div class="zsub-card">',
        '<div class="zsub-card-head"><div><h3 class="zsub-card-title">💵 Recurring Revenue Contribution by Tier</h3><p class="zsub-card-sub">Revenue realization, ARR velocity, ARPU, and plan margins</p></div></div>',
        '<div class="zsub-table-wrap">',
          '<table class="zsub-table">',
            '<thead><tr><th>Plan Tier</th><th>MRR Share</th><th>Monthly MRR</th><th>Annualized ARR</th><th>Gross Margin</th><th>YoY Growth</th></tr></thead>',
            '<tbody>',
              '<tr><td style="font-weight:600;">Monthly Nutrition Auto-Ship Program</td><td>35.1%</td><td style="color:#059669;font-weight:600;">₹4,04,700</td><td style="color:#6d28d9;font-weight:600;">₹48,56,400</td><td>42.0%</td><td><span class="zsub-pill active">+28.4%</span></td></tr>',
              '<tr><td style="font-weight:600;">Puppy & Kitten Preventive Care Suite</td><td>24.0%</td><td style="color:#059669;font-weight:600;">₹2,75,816</td><td style="color:#6d28d9;font-weight:600;">₹33,09,792</td><td>68.5%</td><td><span class="zsub-pill active">+44.0%</span></td></tr>',
              '<tr><td style="font-weight:600;">Senior Pet Geriatric Vitality Membership</td><td>15.7%</td><td style="color:#059669;font-weight:600;">₹1,81,300</td><td style="color:#6d28d9;font-weight:600;">₹21,75,600</td><td>58.0%</td><td><span class="zsub-pill active">+31.2%</span></td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderAnalytics() {
    return [
      '<div class="zsub-kpi-grid">',
        kpiHtml('Blended LTV / CAC', '5.4x', 'World-class > 3.0x', 'up', 'Healthy acquisition engine', '📊'),
        kpiHtml('Avg Customer Lifetime', '18.2 Months', '+2.6 mo vs FY25', 'up', 'Long-term pet relationship', '⏱️'),
        kpiHtml('Quick Ratio (Growth / Churn)', '7.7x', 'New MRR vs Lost MRR', 'up', 'Extremely healthy growth', '🚀'),
        kpiHtml('Net Revenue Retention (NRR)', '114.2%', '+14.2% expansion', 'up', 'Negative net revenue churn', '📈'),
      '</div>',
      '<div class="zsub-card">',
        '<div class="zsub-card-head"><div><h3 class="zsub-card-title">📊 Subscriber Cohort Retention Longevity</h3><p class="zsub-card-sub">Month-over-month cohort retention longevity and cumulative LTV</p></div></div>',
        '<div class="zsub-table-wrap">',
          '<table class="zsub-table">',
            '<thead><tr><th>Signup Cohort</th><th>Starting Pets</th><th>Month 3 Ret.</th><th>Month 6 Ret.</th><th>Cumulative LTV</th><th>LTV / CAC</th></tr></thead>',
            '<tbody>',
              '<tr><td style="font-weight:600;">Q1 2026 Cohort</td><td>140 Pets</td><td style="color:#059669;font-weight:600;">96.4%</td><td style="color:#059669;font-weight:600;">92.1%</td><td style="font-weight:600;">₹18,400</td><td><span class="zsub-pill active">5.2x</span></td></tr>',
              '<tr><td style="font-weight:600;">Q2 2026 Cohort</td><td>185 Pets</td><td style="color:#059669;font-weight:600;">97.2%</td><td style="color:#059669;font-weight:600;">93.5%</td><td style="font-weight:600;">₹14,200</td><td><span class="zsub-pill active">5.5x</span></td></tr>',
              '<tr><td style="font-weight:600;">Q3 2026 Cohort</td><td>240 Pets</td><td style="color:#059669;font-weight:600;">98.0%</td><td>—</td><td style="font-weight:600;">₹8,900</td><td><span class="zsub-pill active">5.8x</span></td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Master Render ───────────────────────────────────────────────── */
  function render() {
    if (!root) return;
    var currentTab = TABS.find(function (t) { return t.id === S.tab; }) || TABS[0];

    var html = [
      '<header class="zsub-head">',
        '<div class="zsub-head-left">',
          '<div class="zsub-title-row">',
            '<h2 class="zsub-title">' + currentTab.icon + ' ' + esc(currentTab.title) + '</h2>',
            '<span class="zsub-live-badge"><span class="zsub-pulse-dot"></span> Subscriptions · Active</span>',
          '</div>',
          '<p class="zsub-sub">' + esc(currentTab.sub) + '</p>',
        '</div>',
        '<div class="zsub-head-actions">',
          '<button class="zsub-btn primary" onclick="ZenveSubscriptionsDashboard.showNewPlanModal()">+ New Plan</button>',
        '</div>',
      '</header>',

      '<nav class="zsub-tabs-bar">',
        TABS.map(function (t) {
          var active = t.id === S.tab ? ' active' : '';
          return '<button class="zsub-tab' + active + '" onclick="ZenveSubscriptionsDashboard.switchTab(\'' + t.id + '\')">' +
            '<span>' + t.icon + '</span>' +
            '<span>' + esc(t.label) + '</span>' +
            '<span class="zsub-tab-badge">' + esc(t.badge) + '</span>' +
          '</button>';
        }).join(''),
      '</nav>',

      '<main class="zsub-body">'
    ];

    switch (S.tab) {
      case 'dashboard': html.push(renderDashboard()); break;
      case 'active':    html.push(renderActive()); break;
      case 'new':       html.push(renderNew()); break;
      case 'renewals':  html.push(renderRenewals()); break;
      case 'expiring':  html.push(renderExpiring()); break;
      case 'churn':     html.push(renderChurn()); break;
      case 'revenue':   html.push(renderRevenue()); break;
      case 'analytics': html.push(renderAnalytics()); break;
      default:          html.push(renderDashboard());
    }

    html.push('</main>');
    root.innerHTML = html.join('');
  }

  /* ── Modals & Actions ────────────────────────────────────────────── */
  function showModal(contentHtml) {
    closeModal();
    var backdrop = document.createElement('div');
    backdrop.id = 'zsub-active-modal';
    backdrop.className = 'zsub-modal-backdrop';
    backdrop.innerHTML = '<div class="zsub-modal">' + contentHtml + '</div>';
    backdrop.onclick = function (e) {
      if (e.target === backdrop) closeModal();
    };
    document.body.appendChild(backdrop);
  }

  function closeModal() {
    var existing = document.getElementById('zsub-active-modal');
    if (existing) existing.remove();
  }

  function showNewPlanModal() {
    var formHtml = [
      '<div class="zsub-modal-head">',
        '<h3 class="zsub-modal-title">🔄 Create New Recurring Wellness Plan</h3>',
        '<button class="zsub-btn" onclick="ZenveSubscriptionsDashboard.closeModal()">✕</button>',
      '</div>',
      '<form onsubmit="event.preventDefault(); alert(\'Subscription plan created and published to Zenve SuperApp!\'); ZenveSubscriptionsDashboard.closeModal();">',
        '<div class="zsub-form-group"><label>Subscription Plan Title</label><input type="text" class="zsub-input" placeholder="e.g. Feline Renal Care & Monthly Diet Subscription" required /></div>',
        '<div class="zsub-form-row">',
          '<div class="zsub-form-group"><label>Monthly Price (INR)</label><input type="text" class="zsub-input" placeholder="₹1,850" required /></div>',
          '<div class="zsub-form-group"><label>Billing Frequency</label><select class="zsub-select"><option>Monthly Auto-Debit</option><option>Quarterly Advance</option><option>Annual Prepaid</option></select></div>',
        '</div>',
        '<div class="zsub-form-group"><label>Included Benefits & Inclusions</label><input type="text" class="zsub-input" placeholder="e.g. Free 60-min delivery + 2 vet consults + monthly kibble" required /></div>',
        '<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:16px;">',
          '<button type="button" class="zsub-btn" onclick="ZenveSubscriptionsDashboard.closeModal()">Cancel</button>',
          '<button type="submit" class="zsub-btn primary">Publish Subscription</button>',
        '</div>',
      '</form>'
    ].join('');
    showModal(formHtml);
  }

  /* ── Open & Close Mechanics ──────────────────────────────────────── */
  function build() {
    root = document.getElementById('zsub-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'zsub-root';
      root.className = 'zpanel-root';
      document.body.appendChild(root);
    }
  }

  function open(tab) {
    // Close other domain overlays
    ['zfa-root', 'zmkt-dashboard-root', 'zvp-root', 'zfsh-root', 'zb2b-root', 'zix-root', 'zod-root', 'zsd-root', 'zpid-root', 'zph-root', 'zch-root', 'zrep-root', 'zalt-root', 'zset-root', 'zhr-root', 'zsys-root'].forEach(function(id) {
      var el = document.getElementById(id);
      if (el) {
        el.classList.remove('zfa-open', 'zmkt-open', 'zvp-open', 'zfsh-open', 'zb2b-open', 'zix-open', 'zsub-open', 'zod-open', 'zsd-open', 'zpid-open', 'zph-open', 'zch-open', 'zrep-open', 'zalt-open', 'zset-open', 'zhr-open', 'zsys-open', 'zpanel-open');
        el.style.display = 'none';
      }
    });
    if (document.querySelectorAll) {
      document.querySelectorAll('.zpanel-root').forEach(function(el) {
        if (el.id !== 'zsub-root') {
          el.style.display = 'none';
          el.classList.remove('zfa-open', 'zmkt-open', 'zvp-open', 'zfsh-open', 'zb2b-open', 'zix-open', 'zsub-open', 'zod-open', 'zsd-open', 'zpid-open', 'zph-open', 'zch-open', 'zrep-open', 'zalt-open', 'zset-open', 'zhr-open', 'zsys-open', 'zpanel-open');
        }
      });
    }

    if (tab && TABS.some(function (t) { return t.id === tab; })) {
      S.tab = tab;
    } else if (!S.tab) {
      S.tab = 'dashboard';
    }

    build();
    S.open = true;
    root.style.display = 'block';
    root.classList.add('zsub-open', 'zpanel-open');
    try {
      document.documentElement.classList.remove('zfsh-locked', 'zvp-locked', 'zalt-locked', 'zb2b-locked', 'zix-locked');
      document.body.classList.remove('zfsh-locked', 'zvp-locked', 'zalt-locked', 'zb2b-locked', 'zix-locked');
      document.documentElement.classList.add('zsub-locked');
      document.body.classList.add('zsub-locked');
    } catch (e) {}
    render();

    var targetTab = TABS.find(function (t) { return t.id === S.tab; });
    if (targetTab && targetTab.hash && window.location.hash !== targetTab.hash) {
      try { history.replaceState(null, '', targetTab.hash); } catch (e) {}
    }
    root.scrollTop = 0;
  }

  function close() {
    S.open = false;
    if (root) {
      root.classList.remove('zsub-open', 'zpanel-open');
      root.style.display = 'none';
    }
    try {
      document.documentElement.classList.remove('zsub-locked');
      document.body.classList.remove('zsub-locked');
    } catch (e) {}
    if (window.location.hash && tabFromHash(window.location.hash)) {
      try { history.replaceState(null, '', window.location.pathname + window.location.search); } catch (e) {}
    }
  }

  function switchTab(tabId) {
    if (!tabId || !TABS.some(function (t) { return t.id === tabId; })) return;
    S.tab = tabId;
    render();
    var targetTab = TABS.find(function (t) { return t.id === tabId; });
    if (targetTab && targetTab.hash) {
      try { history.replaceState(null, '', targetTab.hash); } catch (e) {}
    }
    if (root) root.scrollTop = 0;
  }

  /* ── Interceptor for Hash & Sidebar Clicks ───────────────────────── */
  function onHashChange() {
    var t = tabFromHash(window.location.hash);
    if (t) {
      open(t);
    } else if (S.open && window.location.hash && window.location.hash !== '#') {
      var otherDomains = ['sales', 'operations', 'inventory', 'pharmacy', 'clinics', 'doctors', 'reports', 'alerts', 'settings', 'finance', 'marketing', 'vendors', 'procurement', 'fashion', 'b2b', 'enterprise', 'import', 'export'];
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

      var isSidebar = !!el.closest('aside, [class*="sidebar"]') && !el.closest('#zsub-root');
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

  /* ── Public API ──────────────────────────────────────────────────── */
  window.ZenveSubscriptionsDashboard = {
    open: open,
    close: close,
    switchTab: switchTab,
    closeModal: closeModal,
    showNewPlanModal: showNewPlanModal
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initInterception);
  } else {
    initInterception();
  }
})();
