/* =====================================================================
   Zenve BI — AI Assistant Executive Intelligence Suite
   Subdomains (11):
     1. Ask Zenve AI         (#ask-zenve-ai / #ai / #ask-ai)
     2. Business Insights     (#business-insights)
     3. Revenue Intelligence  (#revenue-intelligence)
     4. Sales Forecast       (#ai-sales-forecast / #sales-forecast)
     5. Demand Forecast      (#demand-forecast)
     6. Inventory Prediction (#inventory-prediction)
     7. Customer Prediction  (#customer-prediction)
     8. Churn Prediction     (#churn-prediction)
     9. Profit Prediction    (#profit-prediction)
    10. Anomaly Detection    (#anomaly-detection)
    11. AI Recommendations   (#ai-recommendations)
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
    { id: 'ask-ai',      label: 'Ask Zenve AI',         icon: '💬', hash: '#ask-zenve-ai',        badge: 'Gemini 2.5 Flash', title: 'Ask Zenve AI — Natural Language Intelligence', sub: 'Interactive executive query interface with live database grounding and contextual recommendations' },
    { id: 'insights',    label: 'Business Insights',    icon: '💡', hash: '#business-insights',    badge: '18 Insights',      title: 'Automated Executive Business Insights', sub: 'Synthesized multi-channel operational patterns, conversion drivers, and growth bottlenecks' },
    { id: 'revenue',     label: 'Revenue Intelligence', icon: '⚡', hash: '#revenue-intelligence', badge: 'Active Radar',     title: 'Autonomous Revenue Intelligence', sub: 'Pricing elasticity modeling, margin leak detection, and revenue optimization vectors' },
    { id: 'sales-fc',    label: 'Sales Forecast',       icon: '📈', hash: '#ai-sales-forecast',    badge: '96.2% Confidence', title: 'Bayesian Sales Trajectory Forecast', sub: 'Multi-horizon predictive sales modeling with P10/P50/P90 statistical confidence bands' },
    { id: 'demand-fc',   label: 'Demand Forecast',      icon: '📦', hash: '#demand-forecast',      badge: 'SKU Level',        title: 'SKU & Regional Demand Forecasting', sub: 'Predictive consumption velocity, seasonal surge dampening, and automated purchase requisitions' },
    { id: 'inventory-pr',label: 'Inventory Prediction', icon: '⚠️', hash: '#inventory-prediction', badge: 'Risk Alert',      title: 'Predictive Stockout & Expiry Analytics', sub: 'Runway exhaustion forecasting, optimal reorder cycles, and cold-chain batch alerts' },
    { id: 'customer-pr', label: 'Customer Prediction',  icon: '🎯', hash: '#customer-prediction',  badge: 'LTV Uplift',       title: 'Customer Behavioral & Next-Best-Action Engine', sub: 'Propensity-to-repurchase scoring, basket upgrade probabilities, and service cross-sell triggers' },
    { id: 'churn-pr',    label: 'Churn Prediction',     icon: '🛡️', hash: '#churn-prediction',     badge: '4 High Risk',      title: 'Predictive Pet Parent Churn Mitigation', sub: 'Early engagement decay detection, vaccination lapse indicators, and automated win-back workflows' },
    { id: 'profit-pr',   label: 'Profit Prediction',    icon: '💹', hash: '#profit-prediction',    badge: 'Scenario Engine',  title: 'Predictive Profitability & Unit Economics', sub: 'Dynamic EBITDA sensitivity simulation across varying logistics, COGS, and labor cost models' },
    { id: 'anomaly',     label: 'Anomaly Detection',    icon: '🔍', hash: '#anomaly-detection',    badge: '3-Sigma Watch',    title: 'Continuous Statistical Anomaly Detection', sub: 'Real-time telemetry scanning for revenue deviations, dispatch delays, and cart abandonment surges' },
    { id: 'recommend',   label: 'AI Recommendations',   icon: '✨', hash: '#ai-recommendations',   badge: '+₹38.4L Est.',     title: 'Ranked Autonomous AI Executive Playbooks', sub: 'Algorithmic prioritization of highest-ROI interventions across operations, clinical care, and pricing' }
  ];

  var S = {
    open: false,
    tab: 'ask-ai',
    chatHistory: [
      { role: 'ai', text: 'Hello! I am Zenve AI Executive Assistant. I have live access to your 14 clinic hubs, ₹1.84 Cr MTD sales, pharmacy inventories, and 18,450 pet patient histories. Ask me any strategic or operational question.' }
    ]
  };

  var root = null;

  function tabFromHash(hash) {
    if (!hash) return null;
    var h = (hash.startsWith('#') ? hash.slice(1) : hash).toLowerCase();
    if (h === 'ask-zenve-ai' || h === 'ask-ai' || h === 'ai') return 'ask-ai';
    if (h === 'business-insights') return 'insights';
    if (h === 'revenue-intelligence') return 'revenue';
    if (h === 'ai-sales-forecast' || h === 'sales-forecast') return 'sales-fc';
    if (h === 'demand-forecast') return 'demand-fc';
    if (h === 'inventory-prediction') return 'inventory-pr';
    if (h === 'customer-prediction') return 'customer-pr';
    if (h === 'churn-prediction') return 'churn-pr';
    if (h === 'profit-prediction') return 'profit-pr';
    if (h === 'anomaly-detection') return 'anomaly';
    if (h === 'ai-recommendations') return 'recommend';
    return null;
  }

  function tabFromText(txt) {
    if (!txt) return null;
    var raw = txt.replace(/\s+/g, ' ').trim().toLowerCase();
    if (raw === 'ask zenve ai' || raw === 'zenve ai') return 'ask-ai';
    if (raw === 'business insights') return 'insights';
    if (raw === 'revenue intelligence') return 'revenue';
    if (raw === 'sales forecast') return 'sales-fc';
    if (raw === 'demand forecast') return 'demand-fc';
    if (raw === 'inventory prediction') return 'inventory-pr';
    if (raw === 'customer prediction') return 'customer-pr';
    if (raw === 'churn prediction') return 'churn-pr';
    if (raw === 'profit prediction') return 'profit-pr';
    if (raw === 'anomaly detection') return 'anomaly';
    if (raw === 'ai recommendations') return 'recommend';
    return null;
  }

  function kpiHtml(label, val, delta, trend, subtext, icon) {
    return [
      '<div class="zai-kpi">',
        '<div class="zai-kpi-top">',
          '<span class="zai-kpi-label">' + esc(label) + '</span>',
          '<span class="zai-kpi-icon">' + esc(icon || '🤖') + '</span>',
        '</div>',
        '<div class="zai-kpi-val">' + esc(val) + '</div>',
        '<div class="zai-kpi-bottom">',
          '<span class="zai-delta ' + (trend === 'up' ? 'up' : trend === 'down' ? 'down' : 'warn') + '">' + (trend === 'up' ? '↑ ' : trend === 'down' ? '↓ ' : '• ') + esc(delta) + '</span>',
          '<span class="zai-subtext">' + esc(subtext) + '</span>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── 1. Ask Zenve AI ─────────────────────────────────────────────── */
  function renderAskAi() {
    var msgsHtml = S.chatHistory.map(function (m) {
      return [
        '<div class="zai-msg ' + m.role + '">',
          '<div class="zai-avatar ' + m.role + '">' + (m.role === 'ai' ? '🤖' : '👤') + '</div>',
          '<div class="zai-bubble">' + m.text + '</div>',
        '</div>'
      ].join('');
    }).join('');

    return [
      '<div class="zai-kpi-grid">',
        kpiHtml('Connected Data Nodes', '14 Live DBs', 'Synchronized', 'up', 'Postgres, Redis & BigQuery', '🔌'),
        kpiHtml('Query Latency', '142ms', '99th percentile', 'up', 'Sub-second response time', '⚡'),
        kpiHtml('Model Grounding', '100% Verified', 'Zero hallucination', 'up', 'Direct ERP record links', '🛡️'),
        kpiHtml('Executive Queries Today', '86 Prompts', '+24% usage', 'up', 'Top: Revenue & Inventory', '💬'),
      '</div>',

      '<div class="zai-card" style="padding: 0;">',
        '<div class="zai-chat-box">',
          '<div class="zai-chat-msgs" id="zai-chat-msgs">',
            msgsHtml,
          '</div>',
          '<div class="zai-chips">',
            '<span style="font-size: 11px; font-weight: 700; color: #64748b; margin-right: 4px; display: inline-flex; align-items: center;">Try Asking:</span>',
            '<button type="button" class="zai-chip" data-query="Which clinic generated the highest EBITDA this month?">Which clinic generated the highest EBITDA this month?</button>',
            '<button type="button" class="zai-chip" data-query="What is the forecast for Bravecto chewables inventory in Bengaluru?">What is the forecast for Bravecto chewables?</button>',
            '<button type="button" class="zai-chip" data-query="Identify the top 3 drivers of customer churn in Q3.">Identify top 3 drivers of customer churn</button>',
            '<button type="button" class="zai-chip" data-query="Simulate net profit if logistics dispatch cost increases by 8%.">Simulate profit if logistics costs increase 8%</button>',
          '</div>',
          '<form class="zai-chat-input-bar" id="zai-chat-form">',
            '<input type="text" class="zai-input" id="zai-query-input" placeholder="Ask Zenve AI any question about revenue, clinics, inventory, or margins..." autocomplete="off" />',
            '<button type="submit" class="zai-btn primary">Ask AI →</button>',
          '</form>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── 2. Business Insights ────────────────────────────────────────── */
  function renderInsights() {
    return [
      '<div class="zai-kpi-grid">',
        kpiHtml('Synthesized Insights', '18 Active', 'Across 6 departments', 'up', 'Updated 12 mins ago', '💡'),
        kpiHtml('High-Impact Vectors', '4 Critical', 'Potential +₹18.4L EBITDA', 'up', 'Requires operational action', '🔥'),
        kpiHtml('Operational Efficiency', '92.4%', '+3.6% MoM', 'up', 'Automated replenishment boost', '⚙️'),
        kpiHtml('Accuracy Rating', '98.2%', 'Audited by CFO office', 'up', 'Continuous metric verification', '🎯'),
      '</div>',

      '<div class="zai-card">',
        '<div class="zai-card-head">',
          '<div>',
            '<h3 class="zai-card-title">Priority Business Intelligence Insights</h3>',
            '<p class="zai-card-sub">Algorithmic operational patterns extracted across 14 facilities and digital commerce</p>',
          '</div>',
          '<span class="zai-badge info">Automated Daily Briefing</span>',
        '</div>',
        '<div class="zai-table-wrap">',
          '<table class="zai-table">',
            '<thead>',
              '<tr>',
                '<th>Department</th>',
                '<th>Pattern Observed</th>',
                '<th>Financial / Operational Impact</th>',
                '<th>Confidence</th>',
                '<th>Prescribed Action</th>',
              '</tr>',
            '</thead>',
            '<tbody>',
              '<tr>',
                '<td><strong>Clinical Orthopedics</strong></td>',
                '<td>Knee arthroscopy demand up 48% in Indiranagar flagship</td>',
                '<td><span class="zai-badge success">+₹8.40 Lakh Rev</span></td>',
                '<td>98%</td>',
                '<td>Allocate Dr. Nambiar additional Thursday morning OT slot</td>',
              '</tr>',
              '<tr>',
                '<td><strong>Pharmacy Logistics</strong></td>',
                '<td>Whitefield hub experiencing 22% split shipments due to Bravecto stockout</td>',
                '<td><span class="zai-badge danger">-₹42,000 Logistics Leak</span></td>',
                '<td>96%</td>',
                '<td>Trigger automated transfer of 60 units from Central Hub</td>',
              '</tr>',
              '<tr>',
                '<td><strong>Mobile Pet Parent App</strong></td>',
                '<td>Push notifications sent on day 21 post-vaccine deliver 4.2x reorder rate</td>',
                '<td><span class="zai-badge success">+₹3.80 Lakh ARR</span></td>',
                '<td>94%</td>',
                '<td>Enable dynamic automated reminder rule for all cat parents</td>',
              '</tr>',
              '<tr>',
                '<td><strong>Diagnostics Pathology</strong></td>',
                '<td>Feline biochemistry panels attach rate jumped from 32% to 54%</td>',
                '<td><span class="zai-badge success">+₹4.20 Lakh Margin</span></td>',
                '<td>99%</td>',
                '<td>Standardize pre-op diagnostic bundle across all 14 clinics</td>',
              '</tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── 3. Revenue Intelligence ─────────────────────────────────────── */
  function renderRevenue() {
    return [
      '<div class="zai-kpi-grid">',
        kpiHtml('Identified Margin Leaks', '₹3.14 Lakh', 'Under active containment', 'warn', '3 fulfillment friction points', '⚡'),
        kpiHtml('Pricing Optimization Gain', '+₹8.90 Lakh', 'EBITDA expansion potential', 'up', 'Elasticity tested on 42 SKUs', '💹'),
        kpiHtml('Discount Slippage', '1.4%', 'Target < 2.0%', 'up', 'Strict voucher auto-capping', '🛡️'),
        kpiHtml('Revenue Run Rate', '₹22.1 Crore', '+18.4% YoY', 'up', 'On track for Q4 milestone', '💰'),
      '</div>',

      '<div class="zai-card">',
        '<div class="zai-card-head">',
          '<div>',
            '<h3 class="zai-card-title">Revenue Leakage & Elasticity Heatmap</h3>',
            '<p class="zai-card-sub">Real-time leak radar highlighting pricing disparities, uncollected fees, and coupon misuse</p>',
          '</div>',
          '<button class="zai-btn primary" onclick="alert(\'Applying automated pricing elasticity safeguards...\')">Apply Safeguards</button>',
        '</div>',
        '<div class="zai-table-wrap">',
          '<table class="zai-table">',
            '<thead>',
              '<tr>',
                '<th>Leakage Vector</th>',
                '<th>Facility / Channel</th>',
                '<th>Monthly Drag</th>',
                '<th>Root Cause</th>',
                '<th>Automated Remediation</th>',
                '<th>Status</th>',
              '</tr>',
            '</thead>',
            '<tbody>',
              '<tr>',
                '<td><strong>Uncollected Emergency Night Fees</strong></td>',
                '<td>Koramangala Trauma</td>',
                '<td>₹1,18,000</td>',
                '<td>Front desk billing delay during peak 11pm-2am intake</td>',
                '<td>Enforce mandatory digital check-in surcharge latch</td>',
                '<td><span class="zai-badge warning">Pending Policy</span></td>',
              '</tr>',
              '<tr>',
                '<td><strong>Split Delivery Shipping Subsidies</strong></td>',
                '<td>Bengaluru East Delivery</td>',
                '<td>₹94,000</td>',
                '<td>Partial fulfillment from secondary warehouse</td>',
                '<td>Consolidate dispatch logic before courier assignment</td>',
                '<td><span class="zai-badge success">Remediated</span></td>',
              '</tr>',
              '<tr>',
                '<td><strong>Prescription Margin Inelasticity</strong></td>',
                '<td>Specialty Oncology Drugs</td>',
                '<td>₹68,000</td>',
                '<td>Wholesale vendor price hike not passed to final bill</td>',
                '<td>Dynamic MRP markup indexation activated</td>',
                '<td><span class="zai-badge success">Live Active</span></td>',
              '</tr>',
              '<tr>',
                '<td><strong>Loyalty Point Multi-Spend</strong></td>',
                '<td>Web Checkout</td>',
                '<td>₹34,000</td>',
                '<td>Race condition in simultaneous cart checkout</td>',
                '<td>Atomic point lock on payment intent created</td>',
                '<td><span class="zai-badge success">Fixed</span></td>',
              '</tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── 4. Sales Forecast ───────────────────────────────────────────── */
  function renderSalesForecast() {
    return [
      '<div class="zai-kpi-grid">',
        kpiHtml('Expected Next Month Sales', '₹1.98 Crore', 'P50 Baseline Model', 'up', 'Range: ₹1.88Cr - ₹2.08Cr', '📈'),
        kpiHtml('Confidence Score', '96.2%', 'Backtested over 24 months', 'up', 'Mean absolute error < 2.1%', '🎯'),
        kpiHtml('Peak Sales Day Forecast', 'Oct 24 (Diwali)', '₹9.4 Lakh estimated', 'up', 'Pet wellness & grooming surge', '🎆'),
        kpiHtml('Quarterly Trajectory', '₹6.20 Crore', '+22.4% vs Q2', 'up', 'Strong tailwinds in veterinary care', '🚀'),
      '</div>',

      '<div class="zai-card">',
        '<div class="zai-card-head">',
          '<div>',
            '<h3 class="zai-card-title">Multi-Horizon Sales Projections (Next 4 Weeks)</h3>',
            '<p class="zai-card-sub">Bayesian confidence intervals across clinical appointments, medicines, and commerce</p>',
          '</div>',
          '<span class="zai-badge info">Bayesian Ensemble Active</span>',
        '</div>',
        '<div class="zai-table-wrap">',
          '<table class="zai-table">',
            '<thead>',
              '<tr>',
                '<th>Forecast Horizon</th>',
                '<th>Conservative (P10)</th>',
                '<th>Expected (P50)</th>',
                '<th>Optimistic (P90)</th>',
                '<th>Primary Growth Driver</th>',
                '<th>Risk Factor</th>',
              '</tr>',
            '</thead>',
            '<tbody>',
              '<tr>',
                '<td><strong>Week 1 (Current)</strong></td>',
                '<td>₹44,20,000</td>',
                '<td><strong>₹47,80,000</strong></td>',
                '<td>₹50,40,000</td>',
                '<td>Bravecto & seasonal tick prevention bundles</td>',
                '<td>Local courier rain delays</td>',
              '</tr>',
              '<tr>',
                '<td><strong>Week 2</strong></td>',
                '<td>₹46,00,000</td>',
                '<td><strong>₹49,50,000</strong></td>',
                '<td>₹52,80,000</td>',
                '<td>Puppy vaccination cohort booster follow-ups</td>',
                '<td>Vaccine supply delivery lead-time</td>',
              '</tr>',
              '<tr>',
                '<td><strong>Week 3</strong></td>',
                '<td>₹48,50,000</td>',
                '<td><strong>₹52,10,000</strong></td>',
                '<td>₹55,60,000</td>',
                '<td>Pre-festival boarding & grooming reservations</td>',
                '<td>Boarding facility capacity limits</td>',
              '</tr>',
              '<tr>',
                '<td><strong>Week 4</strong></td>',
                '<td>₹51,00,000</td>',
                '<td><strong>₹54,80,000</strong></td>',
                '<td>₹58,40,000</td>',
                '<td>Month-end prescription refill cycles</td>',
                '<td>Wholesale pharma cost shifts</td>',
              '</tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── 5. Demand Forecast ──────────────────────────────────────────── */
  function renderDemandForecast() {
    return [
      '<div class="zai-kpi-grid">',
        kpiHtml('SKUs Forecasted', '1,420 Items', '100% catalog coverage', 'up', 'Multi-hub velocity analysis', '📦'),
        kpiHtml('Demand Surge Forecast', '+28.4%', 'Next 30 days', 'up', 'Anti-parasitic & grooming', '📈'),
        kpiHtml('Automated PO Recommendations', '24 POs Ready', '₹14.8 Lakh value', 'up', 'Pre-negotiated wholesale rates', '📑'),
        kpiHtml('Forecast Accuracy (MAPE)', '4.8%', 'Target < 8.0%', 'up', 'Industry benchmark is 12%', '🎯'),
      '</div>',

      '<div class="zai-card">',
        '<div class="zai-card-head">',
          '<div>',
            '<h3 class="zai-card-title">Critical SKU Consumption Velocity Forecast</h3>',
            '<p class="zai-card-sub">Machine learning consumption models predicting 30-day requirement by regional fulfillment node</p>',
          '</div>',
          '<button class="zai-btn primary" onclick="alert(\'Exporting 24 Automated Purchase Orders to ERP...\')">Generate Purchase Orders</button>',
        '</div>',
        '<div class="zai-table-wrap">',
          '<table class="zai-table">',
            '<thead>',
              '<tr>',
                '<th>Item Name & SKU</th>',
                '<th>Category</th>',
                '<th>Current Stock</th>',
                '<th>Predicted 30D Run Rate</th>',
                '<th>Days of Stock Left</th>',
                '<th>Action Recommended</th>',
              '</tr>',
            '</thead>',
            '<tbody>',
              '<tr>',
                '<td><strong>Bravecto Chewable 20-40kg (ZV-MED-04)</strong></td>',
                'Anti-Parasitic',
                '142 Units',
                '480 Units',
                '<span class="zai-badge danger">9 Days Left</span>',
                'Order 350 Units from MSD Animal Health',
              '</tr>',
              '<tr>',
                '<td><strong>Royal Canin Gastrointestinal Dog 12kg</strong></td>',
                'Clinical Diet',
                '86 Bags',
                '240 Bags',
                '<span class="zai-badge warning">11 Days Left</span>',
                'Order 180 Bags from Royal Canin India',
              '</tr>',
              '<tr>',
                '<td><strong>Zoetis Vanguard Plus 5 Vaccine</strong></td>',
                'Vaccines',
                '320 Vials',
                '580 Vials',
                '<span class="zai-badge success">17 Days Left</span>',
                'Routine replenishment PO-9014',
              '</tr>',
              '<tr>',
                '<td><strong>Apoquel 16mg Tablets (100s)</strong></td>',
                'Dermatology',
                '44 Bottles',
                '90 Bottles',
                '<span class="zai-badge warning">14 Days Left</span>',
                'Order 60 Bottles from Zoetis',
              '</tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── 6. Inventory Prediction ─────────────────────────────────────── */
  function renderInventoryPrediction() {
    return [
      '<div class="zai-kpi-grid">',
        kpiHtml('Imminent Stockout Risks', '2 Critical SKUs', 'Action required < 48h', 'down', 'Koramangala & Indiranagar hubs', '⚠️'),
        kpiHtml('Predicted Expiry Waste (90D)', '₹18,400', '-64% vs last quarter', 'up', 'Dynamic FIFO allocation active', '⏳'),
        kpiHtml('Stock Runway Health', '28.4 Days', 'Optimal buffer', 'up', 'Zero excess capital lockup', '📦'),
        kpiHtml('Reorder Optimization Rate', '99.4%', 'Automated buffer triggers', 'up', 'Zero manual PO errors', '🛡️'),
      '</div>',

      '<div class="zai-card">',
        '<div class="zai-card-head">',
          '<div>',
            '<h3 class="zai-card-title">Stockout Runway & Batch Expiry Early Warning</h3>',
            '<p class="zai-card-sub">Predictive exhaustion timelines based on daily run rate and supplier fulfillment lead times</p>',
          '</div>',
          '<button class="zai-btn" onclick="alert(\'Dispatching stock transfer PO...\')">🔄 Dispatch Transfers</button>',
        '</div>',
        '<div class="zai-table-wrap">',
          '<table class="zai-table">',
            '<thead>',
              '<tr>',
                '<th>Facility / Hub</th>',
                '<th>Product At Risk</th>',
                '<th>Current Units</th>',
                '<th>Depletion Date</th>',
                '<th>Supplier Lead Time</th>',
                '<th>Safety Status</th>',
              '</tr>',
            '</thead>',
            '<tbody>',
              '<tr>',
                '<td><strong>Koramangala Trauma Hub</strong></td>',
                'Isoflurane Anesthetic 250ml',
                '6 Bottles',
                'In 44 Hours',
                '24 Hours',
                '<td><span class="zai-badge danger">CRITICAL: Reorder Now</span></td>',
              '</tr>',
              '<tr>',
                '<td><strong>Indiranagar Flagship</strong></td>',
                'Bravecto Chewable (Large Dog)',
                '14 Units',
                'In 3 Days',
                '2 Days',
                '<td><span class="zai-badge warning">Inter-hub Transfer</span></td>',
              '</tr>',
              '<tr>',
                '<td><strong>Whitefield Specialty</strong></td>',
                'Feline Calicivirus PCR Kits',
                '12 Kits',
                'In 6 Days',
                '3 Days',
                '<td><span class="zai-badge info">Adequate Buffer</span></td>',
              '</tr>',
              '<tr>',
                '<td><strong>Central Warehouse</strong></td>',
                'Royal Canin Urinary S/O Cat',
                '48 Bags',
                'In 18 Days',
                '5 Days',
                '<td><span class="zai-badge success">Healthy</span></td>',
              '</tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── 7. Customer Prediction ──────────────────────────────────────── */
  function renderCustomerPrediction() {
    return [
      '<div class="zai-kpi-grid">',
        kpiHtml('Propensity to Repurchase', '76.8%', 'Within 30-day window', 'up', 'Based on pet age and health history', '🎯'),
        kpiHtml('Predicted Customer LTV', '₹24,800', '+18.2% YoY', 'up', 'Multi-pet household expansion', '💎'),
        kpiHtml('Next-Best-Action Success', '34.2%', 'Conversion from AI nudges', 'up', 'WhatsApp & In-App triggers', '⚡'),
        kpiHtml('Targeted Pet Parents', '4,820 Users', 'Active segment for October', 'up', 'Tailored healthcare protocols', '🐾'),
      '</div>',

      '<div class="zai-card">',
        '<div class="zai-card-head">',
          '<div>',
            '<h3 class="zai-card-title">Next-Best-Action (NBA) Customer Behavioral Matrix</h3>',
            '<p class="zai-card-sub">Personalized healthcare triggers mapped to pet lifecycle stages and vaccination schedules</p>',
          '</div>',
          '<button class="zai-btn primary" onclick="alert(\'Automated WhatsApp nudges scheduled for 1,240 pet parents.\')">Dispatch Nudges</button>',
        '</div>',
        '<div class="zai-table-wrap">',
          '<table class="zai-table">',
            '<thead>',
              '<tr>',
                '<th>Customer Cohort</th>',
                '<th>Pet Profile & Stage</th>',
                '<th>Predicted Next Need</th>',
                '<th>Timing Window</th>',
                '<th>Predicted Lift</th>',
                '<th>Channel Strategy</th>',
              '</tr>',
            '</thead>',
            '<tbody>',
              '<tr>',
                '<td><strong>Puppy Care Club (1-6 Mo)</strong></td>',
                'Golden Retrievers, Labradors (3,240 pets)',
                'Rabies & DHPPiL booster vaccination',
                'Days 84 - 90',
                '<span class="zai-badge success">+₹6.2 Lakh</span>',
                'Automated clinic booking via WhatsApp',
              '</tr>',
              '<tr>',
                '<td><strong>Senior Feline Wellness (7+ Yrs)</strong></td>',
                'Persian, Domestic Shorthair (1,840 pets)',
                'Renal & kidney panel screening',
                'Bi-annual checkup',
                '<span class="zai-badge success">+₹4.8 Lakh</span>',
                'Personalized doctor consult voucher',
              '</tr>',
              '<tr>',
                '<td><strong>Chronic Allergy Patients</strong></td>',
                'French Bulldogs, Beagles (920 pets)',
                'Cytopoint injection & Apoquel refills',
                'Every 28 - 32 Days',
                '<span class="zai-badge success">+₹3.9 Lakh</span>',
                '1-click prescription subscription link',
              '</tr>',
              '<tr>',
                '<td><strong>Active Canine Agility</strong></td>',
                'German Shepherds, Huskies (1,150 pets)',
                'Joint supplements (Glucosamine + Omega 3)',
                'Every 45 Days',
                '<span class="zai-badge success">+₹2.4 Lakh</span>',
                'App notification on replenishment date',
              '</tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── 8. Churn Prediction ─────────────────────────────────────────── */
  function renderChurnPrediction() {
    return [
      '<div class="zai-kpi-grid">',
        kpiHtml('Identified At-Risk Cohort', '248 Pet Parents', 'Score > 0.75 risk', 'warn', 'Inactive for > 60 days', '🛡️'),
        kpiHtml('Predicted Churn Prevention', '68.4%', 'With targeted win-back', 'up', 'Saves ₹8.4L in annual ARR', '✨'),
        kpiHtml('Net Retention Rate (NRR)', '114.2%', 'Best-in-class veterinary', 'up', 'High multi-service adoption', '📈'),
        kpiHtml('Avg Days to Churn Trigger', '42 Days', 'Threshold for intervention', 'neutral', 'Post last consultation', '⏳'),
      '</div>',

      '<div class="zai-card">',
        '<div class="zai-card-head">',
          '<div>',
            '<h3 class="zai-card-title">High-Risk Customer Churn Radar & Win-Back Playbook</h3>',
            '<p class="zai-card-sub">Algorithmic scoring combining consultation gaps, medicine refill delays, and complaint logs</p>',
          '</div>',
          '<button class="zai-btn primary" onclick="alert(\'Executing VIP pet parent concierge outreach...\')">Execute Win-Back</button>',
        '</div>',
        '<div class="zai-table-wrap">',
          '<table class="zai-table">',
            '<thead>',
              '<tr>',
                '<th>Pet Parent Name</th>',
                '<th>Pet Profile</th>',
                '<th>Past Spend</th>',
                '<th>Churn Risk Score</th>',
                '<th>Primary Decay Factor</th>',
                '<th>Automated Playbook</th>',
              '</tr>',
            '</thead>',
            '<tbody>',
              '<tr>',
                '<td><strong>Meenakshi Sundaram</strong></td>',
                'Bruno (German Shepherd, 4Y)',
                '₹42,800',
                '<td><span class="zai-badge danger">0.91 (Critical)</span></td>',
                'Lapsed annual vaccination by 45 days',
                'VIP Home Consultation free upgrade invite',
              '</tr>',
              '<tr>',
                '<td><strong>Rajesh Kulkarni</strong></td>',
                'Milo & Coco (Shih Tzus, 2Y)',
                '₹38,200',
                '<td><span class="zai-badge danger">0.84 (High)</span></td>',
                'Unfulfilled prescription complaint 3 weeks ago',
                'Senior Vet complimentary wellness review',
              '</tr>',
              '<tr>',
                '<td><strong>Pooja Agarwal</strong></td>',
                'Simba (Persian Cat, 3Y)',
                '₹29,400',
                '<td><span class="zai-badge warning">0.78 (Elevated)</span></td>',
                'Grooming appointment cancelled, no rebook',
                '20% Spa & Grooming voucher code',
              '</tr>',
              '<tr>',
                '<td><strong>Vikram Malhotra</strong></td>',
                'Rocky (Golden Retriever, 6Y)',
                '₹56,000',
                '<td><span class="zai-badge warning">0.76 (Elevated)</span></td>',
                'Refill interval delayed by 18 days',
                'Concierge medicine dispatch follow-up',
              '</tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── 9. Profit Prediction ────────────────────────────────────────── */
  function renderProfitPrediction() {
    return [
      '<div class="zai-kpi-grid">',
        kpiHtml('Projected Monthly EBITDA', '₹41.8 Lakh', '+14.2% MoM', 'up', 'Under Base Case Scenario', '💹'),
        kpiHtml('Gross Profit Margin Forecast', '42.4%', '+1.8% expansion', 'up', 'Optimized surgical consumable mix', '📈'),
        kpiHtml('Breakeven Occupancy Rate', '58.2%', 'Across all 14 clinics', 'up', 'Current occupancy is 78.4%', '🏥'),
        kpiHtml('Unit Economic Multiplier', '2.84x LTV/CAC', 'Healthy ratio', 'up', 'Payback within 3.4 months', '💎'),
      '</div>',

      '<div class="zai-card">',
        '<div class="zai-card-head">',
          '<div>',
            '<h3 class="zai-card-title">Dynamic Profitability Scenario Simulation Engine</h3>',
            '<p class="zai-card-sub">Stress testing margins under varying operational cost and logistics conditions</p>',
          '</div>',
          '<span class="zai-badge info">Monte Carlo Simulation</span>',
        '</div>',
        '<div class="zai-table-wrap">',
          '<table class="zai-table">',
            '<thead>',
              '<tr>',
                '<th>Operating Scenario</th>',
                '<th>Revenue Assumption</th>',
                '<th>COGS & Supply</th>',
                '<th>Projected EBITDA</th>',
                '<th>Net Margin</th>',
                '<th>Probability</th>',
              '</tr>',
            '</thead>',
            '<tbody>',
              '<tr>',
                '<td><strong>Aggressive Expansion</strong></td>',
                '₹2.15 Crore (+16.8%)',
                '36.5% of Gross',
                '<strong>₹49.20 Lakh</strong>',
                '<span class="zai-badge success">22.8%</span>',
                '25%',
              '</tr>',
              '<tr>',
                '<td><strong>Base Case (Expected)</strong></td>',
                '₹1.98 Crore (+7.6%)',
                '37.8% of Gross',
                '<strong>₹41.80 Lakh</strong>',
                '<span class="zai-badge success">21.1%</span>',
                '60%',
              '</tr>',
              '<tr>',
                '<td><strong>Supply Shock (Conservative)</strong></td>',
                '₹1.84 Crore (Flat)',
                '41.2% of Gross',
                '<strong>₹32.40 Lakh</strong>',
                '<span class="zai-badge warning">17.6%</span>',
                '15%',
              '</tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── 10. Anomaly Detection ───────────────────────────────────────── */
  function renderAnomalyDetection() {
    return [
      '<div class="zai-kpi-grid">',
        kpiHtml('Active Anomaly Alerts', '2 Minor', 'Zero critical 3σ events', 'up', 'Continuous telemetry scanning', '🔍'),
        kpiHtml('Anomalies Resolved (7D)', '14 Events', '100% resolved in SLA', 'up', 'Pricing, dispatch & sync', '🛡️'),
        kpiHtml('Detection Latency', '4.2 Seconds', 'Real-time telemetry stream', 'up', 'Kafka transaction pipeline', '⚡'),
        kpiHtml('System Stability Index', '99.98%', 'Optimal health', 'up', 'Zero downtime across 14 hubs', '⚙️'),
      '</div>',

      '<div class="zai-card">',
        '<div class="zai-card-head">',
          '<div>',
            '<h3 class="zai-card-title">Live 3-Sigma Statistical Anomaly Event Feed</h3>',
            '<p class="zai-card-sub">Sub-minute automated surveillance of revenue flows, fulfillment timings, and inventory drops</p>',
          '</div>',
          '<button class="zai-btn" onclick="alert(\'Telemetry stream refresh initiated...\')">🔄 Refresh Stream</button>',
        '</div>',
        '<div class="zai-table-wrap">',
          '<table class="zai-table">',
            '<thead>',
              '<tr>',
                '<th>Timestamp</th>',
                '<th>Domain</th>',
                '<th>Anomaly Description</th>',
                '<th>Deviation</th>',
                '<th>Severity</th>',
                '<th>Auto-Resolution Action</th>',
              '</tr>',
            '</thead>',
            '<tbody>',
              '<tr>',
                '<td>14:28:10</td>',
                '<strong>Pharmacy Orders</strong>',
                'Spike in Apoquel rejections in Mumbai clinic',
                '+3.8σ above mean',
                '<td><span class="zai-badge warning">Medium</span></td>',
                'Switched fallback payment gateway routing',
              '</tr>',
              '<tr>',
                '<td>11:14:02</td>',
                '<strong>60-Min Logistics</strong>',
                'Koramangala delivery rider latency 38m vs 18m SLA',
                '+2.9σ above mean',
                '<td><span class="zai-badge info">Low</span></td>',
                'Re-assigned 8 orders to secondary delivery partner',
              '</tr>',
              '<tr>',
                '<td>08:05:44</td>',
                '<strong>Clinical Billing</strong>',
                'Duplicate consultation invoice attempt for Pet #8842',
                'Exact duplicate hash',
                '<td><span class="zai-badge success">Resolved</span></td>',
                'Automated idempotency lock blocked second charge',
              '</tr>',
              '<tr>',
                '<td>Yesterday</td>',
                '<strong>ERP Inventory Sync</strong>',
                'Negative stock count detected on Bravecto 10kg batch',
                '-2 units variance',
                '<td><span class="zai-badge success">Resolved</span></td>',
                'Reconciled against scanned dispatch physical barcode',
              '</tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── 11. AI Recommendations ─────────────────────────────────────── */
  function renderRecommendations() {
    return [
      '<div class="zai-kpi-grid">',
        kpiHtml('Identified EBITDA Lift', '₹38.4 Lakh', 'Across top 5 actions', 'up', 'Ranked by implementation ROI', '✨'),
        kpiHtml('Actions Implemented', '12 Playbooks', 'Realized ₹24.2L lift', 'up', 'Past 90 days of execution', '🏆'),
        kpiHtml('Fastest Win Window', '48 Hours', 'Inter-hub stock transfers', 'up', 'Immediate inventory unlock', '⚡'),
        kpiHtml('Recommendation Score', '94.8 / 100', 'Executive prioritization index', 'up', 'Validated by board metrics', '🎯'),
      '</div>',

      '<div class="zai-card">',
        '<div class="zai-card-head">',
          '<div>',
            '<h3 class="zai-card-title">Prioritized Executive Autonomous Playbooks</h3>',
            '<p class="zai-card-sub">Algorithmic action queue ranked by EBITDA potential and organizational ease of execution</p>',
          '</div>',
          '<button class="zai-btn primary" onclick="alert(\'All 4 prioritized playbooks queued for executive implementation.\')">Approve All Playbooks</button>',
        '</div>',
        '<div class="zai-table-wrap">',
          '<table class="zai-table">',
            '<thead>',
              '<tr>',
                '<th>Priority</th>',
                '<th>Strategic Action Playbook</th>',
                '<th>Target Entity / Department</th>',
                '<th>Projected EBITDA Gain</th>',
                '<th>Effort</th>',
                '<th>Action</th>',
              '</tr>',
            '</thead>',
            '<tbody>',
              '<tr>',
                '<td><span class="zai-badge danger">#1 High</span></td>',
                '<strong>Transfer 80 units Bravecto from Koramangala to Whitefield</strong><br><span style="font-size: 11px; color: #64748b;">Eliminates stockout and stops split courier leakage</span>',
                'Pharmacy Supply Chain',
                '<strong>+₹2.80 Lakh</strong>',
                '<td><span class="zai-badge success">Immediate (4h)</span></td>',
                '<td><button class="zai-btn" onclick="alert(\'Transfer initiated.\')">Execute</button></td>',
              '</tr>',
              '<tr>',
                '<td><span class="zai-badge danger">#2 High</span></td>',
                '<strong>Launch WhatsApp Vaccination Booster Automation</strong><br><span style="font-size: 11px; color: #64748b;">Targets 3,240 puppy parents approaching day 90 booster</span>',
                'Veterinary Clinical Growth',
                '<strong>+₹6.20 Lakh</strong>',
                '<td><span class="zai-badge success">1 Click</span></td>',
                '<td><button class="zai-btn" onclick="alert(\'Campaign activated.\')">Activate</button></td>',
              '</tr>',
              '<tr>',
                '<td><span class="zai-badge warning">#3 Medium</span></td>',
                '<strong>Index Oncology Drug MRP to Dynamic Vendor Wholesale</strong><br><span style="font-size: 11px; color: #64748b;">Protects 18% margin slippage on specialized oncology therapies</span>',
                'Commercial Pricing Policy',
                '<strong>+₹4.10 Lakh</strong>',
                '<td><span class="zai-badge info">2 Days</span></td>',
                '<td><button class="zai-btn" onclick="alert(\'Pricing rule applied.\')">Apply Rule</button></td>',
              '</tr>',
              '<tr>',
                '<td><span class="zai-badge info">#4 Medium</span></td>',
                '<strong>Expand Dr. Nambiar Orthopedic Surgery Slots to Whitefield</strong><br><span style="font-size: 11px; color: #64748b;">Meets 3-week backlog of pending orthopedic procedures</span>',
                'Medical Board Scheduling',
                '<strong>+₹8.40 Lakh</strong>',
                '<td><span class="zai-badge info">1 Week</span></td>',
                '<td><button class="zai-btn" onclick="alert(\'Roster updated.\')">Update Roster</button></td>',
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
        '<button type="button" class="zai-tab ' + (isActive ? 'active' : '') + '" data-tab="' + t.id + '">',
          '<span>' + t.icon + '</span>',
          '<span>' + esc(t.label) + '</span>',
          '<span class="zai-tab-badge">' + esc(t.badge) + '</span>',
        '</button>'
      ].join('');
    }).join('');
  }

  function renderBody() {
    switch (S.tab) {
      case 'insights':     return renderInsights();
      case 'revenue':      return renderRevenue();
      case 'sales-fc':     return renderSalesForecast();
      case 'demand-fc':    return renderDemandForecast();
      case 'inventory-pr': return renderInventoryPrediction();
      case 'customer-pr':  return renderCustomerPrediction();
      case 'churn-pr':     return renderChurnPrediction();
      case 'profit-pr':    return renderProfitPrediction();
      case 'anomaly':      return renderAnomalyDetection();
      case 'recommend':    return renderRecommendations();
      case 'ask-ai':
      default:             return renderAskAi();
    }
  }

  function render() {
    if (!root) return;
    var current = getActiveTabConfig();

    root.innerHTML = [
      '<header class="zai-head">',
        '<div class="zai-head-left">',
          '<div class="zai-title-row">',
            '<h1 class="zai-title">' + esc(current.title) + '</h1>',
            '<span class="zai-live-badge"><span class="zai-pulse-dot"></span> AI Autonomous Core</span>',
          '</div>',
          '<p class="zai-sub">' + esc(current.sub) + '</p>',
        '</div>',
        '<div class="zai-head-actions">',
          '<button class="zai-btn" onclick="alert(\'Retraining neural embeddings on live October transaction ledgers...\')">🔄 Refresh Models</button>',
          '<button class="zai-btn primary" onclick="alert(\'Executive AI Intelligence Packet generated (PDF).\')">📊 Download Briefing</button>',
          '<button class="zai-btn" id="zai-close-btn" title="Close AI Assistant">✕</button>',
        '</div>',
      '</header>',
      '<nav class="zai-tabs-bar">',
        renderTabsBar(),
      '</nav>',
      '<div class="zai-body">',
        renderBody(),
      '</div>'
    ].join('');

    bindEvents();
  }

  function handleAiQuery(text) {
    if (!text || !text.trim()) return;
    var q = text.trim();
    S.chatHistory.push({ role: 'user', text: esc(q) });

    // Generate smart context-aware response
    var lower = q.toLowerCase();
    var response = '';

    if (lower.indexOf('ebitda') >= 0 || lower.indexOf('profit') >= 0 || lower.indexOf('margin') >= 0) {
      response = '<strong>EBITDA Analysis:</strong> Consolidated operating EBITDA is currently <strong>₹38.2 Lakh (20.7% margin)</strong>, pacing +₹4.2L ahead of budget. <strong>Indiranagar Flagship</strong> generated the highest EBITDA (₹16.4L) due to high surgical procedure throughput and premium orthopedic attach rates.';
    } else if (lower.indexOf('bravecto') >= 0 || lower.indexOf('stockout') >= 0 || lower.indexOf('inventory') >= 0) {
      response = '<strong>Inventory Telemetry:</strong> <strong>Bravecto Chewable 20-40kg</strong> has 142 units remaining across hubs with a 30-day run rate of 480 units. Koramangala Trauma Hub is within <strong>44 hours of exhaustion</strong>. Transfer PO-8821 for 60 units from Central Hub is ready for execution.';
    } else if (lower.indexOf('churn') >= 0 || lower.indexOf('retention') >= 0) {
      response = '<strong>Churn Intelligence:</strong> 248 pet parents are currently flagged at high risk (>0.75 probability). The top 3 drivers are: 1) Lapsed annual booster vaccines (42%), 2) Unfulfilled prescription delivery delays (28%), and 3) Lapsed recurring food replenishment cycles (22%). Executing the VIP Concierge win-back playbook is estimated to recover <strong>₹8.4L in ARR</strong>.';
    } else if (lower.indexOf('simulate') >= 0 || lower.indexOf('logistics') >= 0 || lower.indexOf('cost') >= 0) {
      response = '<strong>Scenario Simulation:</strong> An 8% increase in logistics delivery costs would increase monthly dispatch expense by ₹1.24 Lakh, shifting operating EBITDA from 21.1% to 20.4%. However, dynamic consolidation of 60-minute routes in Bengaluru East can offset ₹94,000 of this variance.';
    } else {
      response = '<strong>Executive Intelligence:</strong> Based on live October telemetry across 14 clinic hubs, overall revenue is at <strong>₹1.84 Crore MTD (+18.4% YoY)</strong> with 4,820 consultations and 18,450 active pets. All clinical protocols and inventory reorders are tracking within optimal 2σ bounds.';
    }

    S.chatHistory.push({ role: 'ai', text: response });
    render();

    var msgsEl = document.getElementById('zai-chat-msgs');
    if (msgsEl) msgsEl.scrollTop = msgsEl.scrollHeight;
  }

  function bindEvents() {
    if (!root) return;

    var tabs = root.querySelectorAll('.zai-tab');
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].addEventListener('click', function () {
        var tid = this.getAttribute('data-tab');
        switchTab(tid);
      });
    }

    var closeBtn = root.querySelector('#zai-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        close();
      });
    }

    var chatForm = root.querySelector('#zai-chat-form');
    if (chatForm) {
      chatForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var input = root.querySelector('#zai-query-input');
        if (input) {
          var val = input.value;
          input.value = '';
          handleAiQuery(val);
        }
      });
    }

    var chips = root.querySelectorAll('.zai-chip');
    for (var j = 0; j < chips.length; j++) {
      chips[j].addEventListener('click', function () {
        var q = this.getAttribute('data-query');
        handleAiQuery(q);
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
      root.id = 'zai-root';
      document.body.appendChild(root);
    }
    if (tabId) S.tab = tabId;
    S.open = true;
    root.style.display = 'block';
    document.documentElement.classList.add('zai-locked');
    document.body.classList.add('zai-locked');
    render();
  }

  function close() {
    if (!root) return;
    root.style.display = 'none';
    S.open = false;
    document.documentElement.classList.remove('zai-locked');
    document.body.classList.remove('zai-locked');
  }

  function onHashChange() {
    var t = tabFromHash(window.location.hash);
    if (t) {
      open(t);
    } else if (S.open && window.location.hash && window.location.hash !== '#') {
      close();
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

      var isSidebar = !!el.closest('aside, [class*="sidebar"]') && !el.closest('#zai-root');
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

  window.ZenveAIAssistant = {
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
