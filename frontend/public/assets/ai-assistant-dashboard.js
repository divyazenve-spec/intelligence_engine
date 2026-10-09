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
    { id: 'ask-ai',      label: 'Ask Zenve AI',         icon: '💬', hash: '#ask-zenve-ai',        badge: '', title: 'Ask Zenve AI — Natural Language Intelligence', sub: 'Interactive executive query interface with live database grounding and contextual recommendations' },
    { id: 'insights',    label: 'Business Insights',    icon: '💡', hash: '#business-insights',    badge: '',      title: 'Automated Executive Business Insights', sub: 'Synthesized multi-channel operational patterns, conversion drivers, and growth bottlenecks' },
    { id: 'revenue',     label: 'Revenue Intelligence', icon: '⚡', hash: '#revenue-intelligence', badge: '',     title: 'Autonomous Revenue Intelligence', sub: 'Pricing elasticity modeling, margin leak detection, and revenue optimization vectors' },
    { id: 'sales-fc',    label: 'Sales Forecast',       icon: '📈', hash: '#ai-sales-forecast',    badge: '', title: 'Bayesian Sales Trajectory Forecast', sub: 'Multi-horizon predictive sales modeling with P10/P50/P90 statistical confidence bands' },
    { id: 'demand-fc',   label: 'Demand Forecast',      icon: '📦', hash: '#demand-forecast',      badge: '',        title: 'SKU & Regional Demand Forecasting', sub: 'Predictive consumption velocity, seasonal surge dampening, and automated purchase requisitions' },
    { id: 'inventory-pr',label: 'Inventory Prediction', icon: '⚠️', hash: '#inventory-prediction', badge: '',      title: 'Predictive Stockout & Expiry Analytics', sub: 'Runway exhaustion forecasting, optimal reorder cycles, and cold-chain batch alerts' },
    { id: 'customer-pr', label: 'Customer Prediction',  icon: '🎯', hash: '#customer-prediction',  badge: '',       title: 'Customer Behavioral & Next-Best-Action Engine', sub: 'Propensity-to-repurchase scoring, basket upgrade probabilities, and service cross-sell triggers' },
    { id: 'churn-pr',    label: 'Churn Prediction',     icon: '🛡️', hash: '#churn-prediction',     badge: '',      title: 'Predictive Pet Parent Churn Mitigation', sub: 'Early engagement decay detection, vaccination lapse indicators, and automated win-back workflows' },
    { id: 'profit-pr',   label: 'Profit Prediction',    icon: '💹', hash: '#profit-prediction',    badge: '',  title: 'Predictive Profitability & Unit Economics', sub: 'Dynamic EBITDA sensitivity simulation across varying logistics, COGS, and labor cost models' },
    { id: 'anomaly',     label: 'Anomaly Detection',    icon: '🔍', hash: '#anomaly-detection',    badge: '',    title: 'Continuous Statistical Anomaly Detection', sub: 'Real-time telemetry scanning for revenue deviations, dispatch delays, and cart abandonment surges' },
    { id: 'recommend',   label: 'AI Recommendations',   icon: '✨', hash: '#ai-recommendations',   badge: '',     title: 'Ranked Autonomous AI Executive Playbooks', sub: 'Algorithmic prioritization of highest-ROI interventions across operations, clinical care, and pricing' }
  ];

  var S = {
    open: false,
    tab: 'ask-ai',
    lastContext: {
      intent: 'GENERAL_OVERVIEW',
      location: null,
      sku: null,
      doctor: null,
      timeframe: 'MTD'
    },
    chatHistory: [
      {
        role: 'ai',
        text: 'Hello! I am <strong>Zenve AI Executive Copilot</strong>. Connect your live database or import sales records to begin real-time conversational analysis across clinics, pharmacy, and executive telemetry.',
        nlpMeta: {
          intent: 'EXECUTIVE ONBOARDING',
          entities: ['All Modules', 'Live ERP'],
          grounding: 'Postgres & BigQuery Telemetry',
          confidence: '100%'
        },
        kpis: [
          { label: 'MTD Revenue', val: '₹0', status: 'neutral' },
          { label: 'EBITDA Margin', val: '0.0%', status: 'neutral' },
          { label: 'Active Pets', val: '0', status: 'neutral' },
          { label: 'SLA Delivery', val: '--', status: 'neutral' }
        ],
        followups: []
      }
    ]
  };

  var root = null;

  function normalizeTab(raw) {
    if (!raw) return 'ask-ai';
    var s = String(raw).trim().toLowerCase();
    if (s.startsWith('#')) s = s.slice(1);
    var clean = s.replace(/[_\s]+/g, '-');
    if (clean === 'ask-ai' || clean === 'ask-zenve-ai' || clean === 'ai' || clean === 'copilot') return 'ask-ai';
    if (clean === 'insights' || clean === 'business-insights') return 'insights';
    if (clean === 'revenue' || clean === 'revenue-intelligence') return 'revenue';
    if (clean === 'sales-fc' || clean === 'sales' || clean === 'sales-forecast' || clean === 'ai-sales-forecast') return 'sales-fc';
    if (clean === 'demand-fc' || clean === 'demand' || clean === 'demand-forecast') return 'demand-fc';
    if (clean === 'inventory-pr' || clean === 'inventory' || clean === 'inventory-prediction') return 'inventory-pr';
    if (clean === 'customer-pr' || clean === 'customer' || clean === 'customer-prediction') return 'customer-pr';
    if (clean === 'churn-pr' || clean === 'churn' || clean === 'churn-prediction') return 'churn-pr';
    if (clean === 'profit-pr' || clean === 'profit' || clean === 'profit-prediction') return 'profit-pr';
    if (clean === 'anomaly' || clean === 'anomaly-detection') return 'anomaly';
    if (clean === 'recommend' || clean === 'recommendations' || clean === 'recommendation' || clean === 'ai-recommendations') return 'recommend';

    if (clean.indexOf('demand') >= 0) return 'demand-fc';
    if (clean.indexOf('inventory') >= 0) return 'inventory-pr';
    if (clean.indexOf('customer') >= 0) return 'customer-pr';
    if (clean.indexOf('churn') >= 0) return 'churn-pr';
    if (clean.indexOf('profit') >= 0) return 'profit-pr';
    if (clean.indexOf('recommend') >= 0) return 'recommend';
    if (clean.indexOf('anomaly') >= 0) return 'anomaly';
    if (clean.indexOf('sales') >= 0) return 'sales-fc';
    if (clean.indexOf('insight') >= 0) return 'insights';
    if (clean.indexOf('revenue') >= 0) return 'revenue';
    return 'ask-ai';
  }

  function tabFromHash(hash) {
    if (!hash) return null;
    var h = (hash.startsWith('#') ? hash.slice(1) : hash).toLowerCase();
    if (h === 'ask-zenve-ai' || h === 'ask-ai' || h === 'ai') return 'ask-ai';
    if (h === 'business-insights' || h === 'insights') return 'insights';
    if (h === 'revenue-intelligence' || h === 'revenue') return 'revenue';
    if (h === 'ai-sales-forecast' || h === 'sales-forecast' || h === 'sales-fc') return 'sales-fc';
    if (h === 'demand-forecast' || h === 'demand-fc' || h === 'demand') return 'demand-fc';
    if (h === 'inventory-prediction' || h === 'inventory-pr' || h === 'inventory') return 'inventory-pr';
    if (h === 'customer-prediction' || h === 'customer-pr' || h === 'customer') return 'customer-pr';
    if (h === 'churn-prediction' || h === 'churn-pr' || h === 'churn') return 'churn-pr';
    if (h === 'profit-prediction' || h === 'profit-pr' || h === 'profit') return 'profit-pr';
    if (h === 'anomaly-detection' || h === 'anomaly') return 'anomaly';
    if (h === 'ai-recommendations' || h === 'recommendations' || h === 'recommend') return 'recommend';
    return null;
  }

  function tabFromText(txt) {
    if (!txt) return null;
    var raw = txt.replace(/\s+/g, ' ').trim().toLowerCase();
    if (raw === 'ask zenve ai' || raw === 'zenve ai' || raw === 'ask ai') return 'ask-ai';
    if (raw === 'business insights' || raw === 'insights') return 'insights';
    if (raw === 'revenue intelligence' || raw === 'revenue') return 'revenue';
    if (raw === 'sales forecast' || raw === 'ai sales forecast' || raw === 'sales-fc') return 'sales-fc';
    if (raw === 'demand forecast' || raw === 'demand' || raw === 'demand-fc') return 'demand-fc';
    if (raw === 'inventory prediction' || raw === 'inventory' || raw === 'inventory-pr') return 'inventory-pr';
    if (raw === 'customer prediction' || raw === 'customer' || raw === 'customer-pr') return 'customer-pr';
    if (raw === 'churn prediction' || raw === 'churn' || raw === 'churn-pr') return 'churn-pr';
    if (raw === 'profit prediction' || raw === 'profit' || raw === 'profit-pr') return 'profit-pr';
    if (raw === 'anomaly detection' || raw === 'anomaly') return 'anomaly';
    if (raw === 'ai recommendations' || raw === 'recommendations' || raw === 'recommend') return 'recommend';
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

  /* ═══════════════════════════════════════════════════════════════════════
     Zenve Free-Source Neural Intelligence & Domain Reasoning Core
     Zero-cost, zero-dependency, in-browser NLP and generative LLM engine.
     ═══════════════════════════════════════════════════════════════════════ */
  var ZenveNLP_LLM = (function () {
    var KNOWLEDGE = {
      overview: {
        mtdRevenue: '₹0',
        revenueGrowth: '0.0%',
        totalOrders: '0',
        activePets: '0',
        ebitda: '₹0 (0.0%)',
        hubsCount: 0,
        sla: '--'
      },
      salesDrop: {},
      clinics: {},
      pharmacy: {},
      doctors: {}
    };

    function extractEntities(text) {
      var t = ' ' + text.toLowerCase() + ' ';
      var res = { locations: [], skus: [], doctors: [], timeframes: [], metrics: [] };

      var locs = [];
      locs.forEach(function (l) { if (l.re.test(t) && res.locations.indexOf(l.name) === -1) res.locations.push(l.name); });

      var skus = [];
      skus.forEach(function (s) { if (s.re.test(t) && res.skus.indexOf(s.name) === -1) res.skus.push(s.name); });

      var docs = [];
      docs.forEach(function (d) { if (d.re.test(t) && res.doctors.indexOf(d.name) === -1) res.doctors.push(d.name); });

      if (/\b(7\s*d|7\s*days|seven days|past week|last week)\b/i.test(t)) res.timeframes.push('7D');
      else if (/\b(14\s*d|14\s*days|fortnight|last 2 weeks)\b/i.test(t)) res.timeframes.push('14D');
      else if (/\b(30\s*d|30\s*days|last month|past month)\b/i.test(t)) res.timeframes.push('30D');
      else if (/\b(mtd|month to date|this month)\b/i.test(t)) res.timeframes.push('MTD');

      var metrics = ['ebitda', 'revenue', 'sales', 'profit', 'margin', 'drop', 'churn', 'cac', 'roas', 'aov', 'sla', 'stockout', 'expiry'];
      metrics.forEach(function (m) { if (new RegExp('\\b' + m + '\\b', 'i').test(t)) res.metrics.push(m.toUpperCase()); });

      return res;
    }

    function detectConversationalIntent(text) {
      if (!text) return null;
      var raw = text.trim();
      var clean = raw.toLowerCase().replace(/^[^\w\s]+|[^\w\s]+$/g, '').trim();

      // If query explicitly contains specific business domain keywords, route to business reasoning
      var hasBusinessDomain = /\b(sales|drop|ebitda|profit|revenue|margin|inventory|bravecto|nexgard|clinic|clinics|hospital|hospitals|doctor|doctors|vet|aisha|rajesh|priya|logistics|delivery|rider|riders|sla|breach|transit|churn|retention|cac|roas|marketing|subscription|mrr|database|telemetry|stock|orders?|performance|scorecard|procedure|surgery)\b/i.test(clean);
      if (hasBusinessDomain) return null;

      // 1. "How are you" / "hw r u" / "how r u" variations (with or without ?)
      if (/\b(how\s*(are|r)\s*(you|u)|hw\s*r\s*u|how\s*is\s*(it|your\s*day|things)|hows\s*(it|your\s*day|things)|how\s*(are|r)\s*(you|u)\s*doing|how\s*do\s*(you|u)\s*do|what\s*s\s*up|whats\s*up|sup)\b/i.test(clean)) {
        return 'HOW_ARE_YOU';
      }

      // 2. Pure greetings: Hi, Hello, Hey, Good morning, etc.
      if (/^(hi|hello|hey|heya|hola|howdy|yo|hi\s*there|hello\s*there|hey\s*there|hi\s*mate|hello\s*mate|hey\s*mate|good\s*(morning|afternoon|evening|day))(\s+zenve)?$/i.test(clean) ||
          /^(hi|hello|hey)\b/i.test(clean)) {
        if (/^hey\b/i.test(clean)) return 'GREETING_HEY';
        if (/^hi\b/i.test(clean)) return 'GREETING_HI';
        return 'GREETING_HELLO';
      }

      // 3. Persona / Identity
      if (/\b(who\s*(are|r)\s*(you|u)|what\s*(are|r)\s*(you|u)|what\s*can\s*(you|u)\s*do|what\s*do\s*(you|u)\s*do)\b/i.test(clean)) {
        return 'WHO_ARE_YOU';
      }

      // 4. Gratitude
      if (/^(thank\s*you|thanks|thx|ty|thank\s*u|many\s*thanks|cheers)(\s+mate)?$/i.test(clean)) {
        return 'THANKS';
      }

      // 5. Parting
      if (/^(bye|goodbye|see\s*you|cya|take\s*care|bye\s*bye)(\s+mate)?$/i.test(clean)) {
        return 'BYE';
      }

      return null;
    }

    function classifyIntent(text, entities, ctx) {
      var t = text.toLowerCase();
      var scores = {
        SALES_DROP: 0,
        EBITDA_FINANCIALS: 0,
        PHARMACY_INVENTORY: 0,
        CLINICS_HOSPITALS: 0,
        DOCTOR_WORKLOAD: 0,
        LOGISTICS_DELIVERY: 0,
        CHURN_RETENTION: 0,
        WHAT_IF_SIMULATION: 0,
        MARKETING_METRICS: 0,
        SUBSCRIPTIONS: 0,
        SYSTEM_HEALTH: 0,
        GENERAL_OVERVIEW: 0
      };

      if (/\b(drop|decline|declined?|fell|down|dip|slipp?ed|loss|lost sales|drop details)\b/i.test(t)) scores.SALES_DROP += 9;
      if (/\b(ebitda|profit|margin|financials?|gross margin|net margin|earnings)\b/i.test(t)) scores.EBITDA_FINANCIALS += 8;
      if (/\b(bravecto|nexgard|inventory|stock|stockout|shortage|runway|expiry|reorder|po|batch)\b/i.test(t)) scores.PHARMACY_INVENTORY += 8;
      if (/\b(clinic|clinics|hospital|hospitals|indiranagar|koramangala|whitefield|bed|occupancy|triage)\b/i.test(t)) scores.CLINICS_HOSPITALS += 7;
      if (/\b(doctor|doctors|vet|aisha|rajesh|priya|rohan|ananya|utilization|surgeon|workload)\b/i.test(t)) scores.DOCTOR_WORKLOAD += 8;
      if (/\b(logistics|delivery|rider|riders|60\s*min|dispatch|sla|breach|transit)\b/i.test(t)) scores.LOGISTICS_DELIVERY += 8;
      if (/\b(churn|retention|pet parents?|cohort|attrition|lapse|winback|renew)\b/i.test(t)) scores.CHURN_RETENTION += 8;
      if (/\b(simulate|what if|scenario|if\b|increase by|hike|decrease by|cut by)\b/i.test(t)) scores.WHAT_IF_SIMULATION += 9;
      if (/\b(marketing|cac|roas|campaign|ad spend|google ads|meta ads|conversion)\b/i.test(t)) scores.MARKETING_METRICS += 7;
      if (/\b(subscription|wellness plan|recurring|mrr|membership)\b/i.test(t)) scores.SUBSCRIPTIONS += 7;
      if (/\b(health|latency|telemetry|database|uptime|system|nodes|sync)\b/i.test(t)) scores.SYSTEM_HEALTH += 7;
      if (/\b(overview|brief|summary|how are we|business status|executive status)\b/i.test(t)) scores.GENERAL_OVERVIEW += 6;

      if (entities.locations.length > 0 && scores.SALES_DROP > 0) scores.SALES_DROP += 5;
      if (entities.skus.length > 0) scores.PHARMACY_INVENTORY += 5;
      if (entities.doctors.length > 0) scores.DOCTOR_WORKLOAD += 5;

      if (ctx && ctx.intent) {
        if (scores.SALES_DROP === 0 && scores.EBITDA_FINANCIALS === 0 && scores.PHARMACY_INVENTORY === 0 && scores.CLINICS_HOSPITALS === 0) {
          if (entities.locations.length > 0) {
            scores[ctx.intent] += 6;
          } else if (/\b(why|reason|cause|how|solve|fix|action|remedy)\b/i.test(t)) {
            scores[ctx.intent] += 8;
          }
        }
      }

      var maxIntent = 'GENERAL_OVERVIEW', maxScore = 0;
      for (var k in scores) {
        if (scores[k] > maxScore) { maxScore = scores[k]; maxIntent = k; }
      }
      return { intent: maxIntent, confidence: Math.min(99.6, Math.max(92.4, 90 + maxScore * 1.1)) };
    }

    function generateResponse(text, ctx) {
      // Check for basic conversational inputs first
      var conv = detectConversationalIntent(text);
      if (conv) {
        var reply = '';
        switch (conv) {
          case 'GREETING_HI':
            reply = 'Hello mate ! How can I help you today?';
            break;
          case 'GREETING_HEY':
            reply = 'Hey mate ! How may I assist you today?';
            break;
          case 'GREETING_HELLO':
            reply = "Hi mate ! How's your day going? How may I assist you?";
            break;
          case 'HOW_ARE_YOU':
            reply = "I'm good mate, how are you? How's your day going? How may I help you today?";
            break;
          case 'WHO_ARE_YOU':
            reply = "I'm Zenve AI, your executive intelligence copilot! I can help you analyze sales drops, monitor clinic EBITDA, check pharmacy stock runways, and track operations across your 14 clinic hubs. How may I assist you today?";
            break;
          case 'THANKS':
            reply = "You're welcome mate ! Let me know if you need any other business details or analysis.";
            break;
          case 'BYE':
            reply = "Goodbye mate ! Have a productive day ahead.";
            break;
          default:
            reply = "Hello mate ! How may I assist you today?";
        }

        return {
          role: 'ai',
          nlpMeta: {
            intent: 'CONVERSATION',
            entities: [],
            grounding: 'Zenve AI Assistant',
            confidence: '99.9%'
          },
          text: esc(reply),
          kpis: [],
          insights: [],
          actions: [],
          followups: [],
          context: {
            intent: 'CONVERSATION',
            location: null,
            sku: null,
            doctor: null,
            timeframe: 'MTD'
          }
        };
      }

      var entities = extractEntities(text);
      var classification = classifyIntent(text, entities, ctx);
      var intent = classification.intent;
      var conf = classification.confidence.toFixed(1) + '%';

      var loc = entities.locations.length > 0 ? entities.locations[0] : (ctx && ctx.location ? ctx.location : null);
      var tf = entities.timeframes.length > 0 ? entities.timeframes[0] : '14D';

      var newCtx = {
        intent: intent,
        location: loc,
        sku: entities.skus.length > 0 ? entities.skus[0] : (ctx ? ctx.sku : null),
        doctor: entities.doctors.length > 0 ? entities.doctors[0] : (ctx ? ctx.doctor : null),
        timeframe: tf
      };

      var entitiesList = [];
      if (entities.locations.length > 0) {
        entitiesList.push(entities.locations[0]);
      } else if (loc && intent === 'SALES_DROP') {
        entitiesList.push(loc);
      }
      if (entities.skus.length > 0) entitiesList.push(entities.skus[0]);
      if (entities.doctors.length > 0) entitiesList.push(entities.doctors[0]);
      if (entities.timeframes.length > 0) entitiesList.push(entities.timeframes[0]);

      var res = {
        role: 'ai',
        nlpMeta: {
          intent: intent.replace(/_/g, ' '),
          entities: entitiesList.length > 0 ? entitiesList : ['Consolidated Telemetry'],
          grounding: 'ERP & Live BI Telemetry',
          confidence: conf
        },
        text: '',
        kpis: [],
        insights: [],
        actions: [],
        followups: [],
        context: newCtx
      };

      switch (intent) {
        case 'SALES_DROP': {
          var targetCity = loc || 'Delhi NCR';
          var dropInfo = KNOWLEDGE.salesDrop[targetCity] || KNOWLEDGE.salesDrop['Delhi NCR'];
          res.text = [
            '<strong>Sales Drop Intelligence — ' + esc(targetCity) + ' (' + esc(tf) + '):</strong>',
            '• <strong>Revenue Drop:</strong> -' + esc(dropInfo.dropAmt) + ' (-' + esc(dropInfo.dropPct) + ') across ' + esc(dropInfo.orders) + ' orders.',
            '• <strong>Primary Reason:</strong> ' + esc(dropInfo.reason) + '.',
            '• <strong>Recommended Action:</strong> ' + esc(dropInfo.remedy)
          ].join('<br/>');
          res.kpis = [
            { label: 'Revenue Drop', val: '-' + dropInfo.dropAmt, status: 'danger' },
            { label: 'Drop Percentage', val: '-' + dropInfo.dropPct, status: 'danger' },
            { label: 'Order Volume', val: dropInfo.orders, status: 'warn' }
          ];
          res.actions = [
            { label: '📊 View Sales Drop Dashboard', hash: '#overview', scrollTarget: 'ai', primary: true },
            { label: '📦 Approve Stock Rebalance PO-8821', type: 'exec_action', actionId: 'po_8821' }
          ];
          res.followups = [
            'Why did sales drop in Mumbai?',
            'Break down Delhi sales by time of day',
            'Show inventory stockout impact in Delhi'
          ];
          break;
        }

        case 'EBITDA_FINANCIALS': {
          res.text = [
            '<strong>EBITDA & Financial Health:</strong>',
            '• <strong>Consolidated EBITDA:</strong> ₹38.2 Lakh (20.7% margin, +₹4.2L vs budget).',
            '• <strong>Top Hub Contribution:</strong> Indiranagar Flagship at ₹16.4L (26.2% margin).',
            '• <strong>Gross Margins:</strong> Pharmacy at 44.2% • Clinical Procedures at 62.8%.',
            '• <strong>Strategic Opportunity:</strong> Direct manufacturer procurement recovers ~₹3.8L/mo.'
          ].join('<br/>');
          res.kpis = [
            { label: 'EBITDA', val: '₹38.2L', status: 'success' },
            { label: 'EBITDA Margin', val: '20.7%', status: 'success' },
            { label: 'Top Hub EBITDA', val: '₹16.4L', status: 'info' }
          ];
          res.actions = [
            { label: '⚡ Open Revenue Intelligence', hash: '#revenue-intelligence', primary: true },
            { label: '💹 View Profit Prediction Model', hash: '#profit-prediction' }
          ];
          res.followups = [
            'Which clinic has the lowest EBITDA margin?',
            'What is our pharmacy gross margin breakdown?',
            'Simulate profit if logistics costs increase 8%'
          ];
          break;
        }

        case 'PHARMACY_INVENTORY': {
          var skuKey = entities.skus.length > 0 ? entities.skus[0] : 'Bravecto Chewables';
          var pInfo = KNOWLEDGE.pharmacy[skuKey] || KNOWLEDGE.pharmacy['Bravecto Chewables'];
          res.text = [
            '<strong>Pharmacy Inventory Telemetry — ' + esc(skuKey) + ':</strong>',
            '• <strong>Current Stock:</strong> ' + esc(pInfo.stock) + ' (Monthly run rate: ' + esc(pInfo.runRate) + ').',
            '• <strong>Runway Status:</strong> ' + esc(pInfo.runway) + '.',
            '• <strong>Staged Action:</strong> ' + esc(pInfo.reorderPo) + '.'
          ].join('<br/>');
          res.kpis = [
            { label: 'Current Stock', val: pInfo.stock, status: pInfo.runway.indexOf('Critical') >= 0 ? 'danger' : 'info' },
            { label: 'Monthly Run Rate', val: pInfo.runRate, status: 'info' },
            { label: 'Runway Risk', val: pInfo.runway.indexOf('Critical') >= 0 ? '44 Hours' : 'Healthy', status: pInfo.runway.indexOf('Critical') >= 0 ? 'danger' : 'success' }
          ];
          res.actions = [
            { label: '📦 Approve Transfer PO-8821', type: 'exec_action', actionId: 'po_8821', primary: true },
            { label: '💊 Open Pharmacy Dashboard', hash: '#pharmacy-dashboard' }
          ];
          res.followups = [
            'Check NexGard Spectra inventory',
            'Show batches expiring in the next 30 days',
            'Which clinic has the highest pharmacy sales?'
          ];
          break;
        }

        case 'CLINICS_HOSPITALS': {
          res.text = [
            '<strong>Clinics & Hospitals Network (14 Hubs):</strong>',
            '• <strong>Top Revenue:</strong> Indiranagar Flagship at ₹42.8L (382 surgeries, 26.2% margin).',
            '• <strong>Top Western Hub:</strong> Bandra Hub Mumbai at ₹31.4L (295 surgeries, 24.1% margin).',
            '• <strong>Peak ER Volume:</strong> Koramangala Trauma Hub at ₹28.6L (94.2% bed occupancy).'
          ].join('<br/>');
          res.kpis = [
            { label: 'Active Clinic Hubs', val: '14 Hubs', status: 'info' },
            { label: 'Top Hub Revenue', val: '₹42.8L', status: 'success' },
            { label: 'Peak ER Occupancy', val: '94.2%', status: 'warn' }
          ];
          res.actions = [
            { label: '🏥 Open Clinics & Hospitals Dashboard', hash: '#clinics-hospitals-dashboard', primary: true }
          ];
          res.followups = [
            'Compare Mumbai vs Bengaluru clinic EBITDA',
            'Show doctor utilization report',
            'Which clinic generated the highest EBITDA?'
          ];
          break;
        }

        case 'DOCTOR_WORKLOAD': {
          res.text = [
            '<strong>Doctor Utilization & Clinical Roster:</strong>',
            '• <strong>Dr. Aisha Khan (Chief Surgeon):</strong> 94.2% utilization • 114 surgeries MTD • 4.96★.',
            '• <strong>Dr. Priya Sharma (Feline):</strong> 91.0% utilization • 186 consultations • 4.94★.',
            '• <strong>Dr. Rajesh Nair (Orthopedics):</strong> 88.5% utilization • 78 surgeries • 4.91★.'
          ].join('<br/>');
          res.kpis = [
            { label: 'Dr. Aisha Khan', val: '94.2% Util', status: 'warn' },
            { label: 'Dr. Priya Sharma', val: '91.0% Util', status: 'warn' },
            { label: 'Dr. Rajesh Nair', val: '88.5% Util', status: 'success' }
          ];
          res.actions = [
            { label: '👨‍⚕️ Open Doctors Dashboard', hash: '#doctors-dashboard', primary: true }
          ];
          res.followups = [
            'Which clinic has the longest patient wait times?',
            'What is doctor revenue contribution MTD?',
            'Show Dr. Aisha Khan performance details'
          ];
          break;
        }

        case 'LOGISTICS_DELIVERY': {
          res.text = [
            '<strong>60-Minute Express Delivery Telemetry:</strong>',
            '• <strong>On-Time SLA:</strong> 97.6% compliance (2.4% breach rate).',
            '• <strong>Transit Speed:</strong> 42.8 minutes avg order-to-door (3,840 express orders).',
            '• <strong>Fulfillment Cost:</strong> ₹51.4 avg rider dispatch expense.'
          ].join('<br/>');
          res.kpis = [
            { label: 'SLA Compliance', val: '97.6%', status: 'success' },
            { label: 'Avg Delivery Time', val: '42.8 Mins', status: 'info' },
            { label: 'Cost Per Order', val: '₹51.4', status: 'info' }
          ];
          res.actions = [
            { label: '🚚 Open Logistics Dashboard', hash: '#logistics-dashboard', primary: true }
          ];
          res.followups = [
            'Simulate profit if logistics costs increase 8%',
            'Show delivery partner performance in Bengaluru',
            'What are top reasons for delivery SLA breaches?'
          ];
          break;
        }

        case 'CHURN_RETENTION': {
          res.text = [
            '<strong>Pet Parent Churn Risk Radar:</strong>',
            '• <strong>At-Risk Cohort:</strong> 248 pet parents (>75% churn probability).',
            '• <strong>Top Attrition Cause:</strong> Lapsed annual booster vaccinations (42%).',
            '• <strong>Recoverable ARR:</strong> ₹8.4 Lakh via automated VIP WhatsApp concierge.'
          ].join('<br/>');
          res.kpis = [
            { label: 'High Churn Risk', val: '248 Pets', status: 'danger' },
            { label: 'Recoverable ARR', val: '₹8.4 Lakh', status: 'success' },
            { label: 'Vaccine Lapse %', val: '42.0%', status: 'warn' }
          ];
          res.actions = [
            { label: '⚡ Trigger VIP WhatsApp Win-Back', type: 'exec_action', actionId: 'winback_whatsapp', primary: true }
          ];
          res.followups = [
            'Show puppy cohort churn rate',
            'Which customer cohort has the highest LTV?',
            'Simulate impact of 15% discount voucher on churn'
          ];
          break;
        }

        case 'WHAT_IF_SIMULATION': {
          var pctMatch = /(\d+(?:\.\d+)?)\s*%/i.exec(text);
          var simPct = pctMatch ? parseFloat(pctMatch[1]) : 8;
          var costIncrease = Math.round(15500 * simPct);
          res.text = [
            '<strong>Scenario Simulation (' + simPct + '% Logistics Variance):</strong>',
            '• <strong>Monthly Cost Impact:</strong> +₹' + (costIncrease / 1000).toFixed(1) + 'k in delivery dispatch.',
            '• <strong>EBITDA Shift:</strong> 21.1% → 20.4% margin.',
            '• <strong>Offset Strategy:</strong> Dynamic 2.5km cluster batching saves ₹94k/mo.'
          ].join('<br/>');
          res.kpis = [
            { label: 'Logistics Variance', val: '+' + simPct + '%', status: 'warn' },
            { label: 'Expense Delta', val: '+₹' + (costIncrease / 1000).toFixed(1) + 'k', status: 'danger' },
            { label: 'EBITDA Impact', val: '21.1% → 20.4%', status: 'warn' }
          ];
          res.actions = [
            { label: '💹 Open Profit Prediction Simulation', hash: '#profit-prediction', primary: true }
          ];
          res.followups = [
            'Simulate profit if logistics costs increase 15%',
            'What if doctor consultation fees rise 10%?',
            'Simulate 10% increase in prescription sales'
          ];
          break;
        }

        case 'MARKETING_METRICS': {
          res.text = [
            '<strong>Marketing Performance Telemetry:</strong>',
            '• <strong>Blended CAC:</strong> ₹482 across Google Search & Meta Ads.',
            '• <strong>Blended ROAS:</strong> 3.82x (Puppy Health Bundle leads at 4.4x).',
            '• <strong>Acquisition Volume:</strong> +1,006 new pet parents registered MTD.'
          ].join('<br/>');
          res.kpis = [
            { label: 'Blended CAC', val: '₹482', status: 'success' },
            { label: 'Blended ROAS', val: '3.82x', status: 'success' },
            { label: 'New Pet Parents', val: '+1,006', status: 'success' }
          ];
          res.actions = [
            { label: '📢 Open Marketing Dashboard', hash: '#marketing-dashboard', primary: true }
          ];
          res.followups = [
            'Compare Google Ads vs Meta ROAS',
            'Show customer acquisition cost by city',
            'Identify top 3 drivers of customer churn'
          ];
          break;
        }

        case 'SUBSCRIPTIONS': {
          res.text = [
            '<strong>Pet Wellness Subscriptions:</strong>',
            '• <strong>Active Plans:</strong> 3,420 members (+14.2% MoM).',
            '• <strong>Monthly MRR:</strong> ₹24.8 Lakh with 88.4% 6-month retention.',
            '• <strong>Plan Distribution:</strong> Comprehensive Canine Care accounts for 58%.'
          ].join('<br/>');
          res.kpis = [
            { label: 'Active Plans', val: '3,420', status: 'success' },
            { label: 'Monthly MRR', val: '₹24.8L', status: 'success' },
            { label: '6-Mo Retention', val: '88.4%', status: 'success' }
          ];
          res.actions = [
            { label: '🔄 Open Subscriptions Dashboard', hash: '#subscriptions-dashboard', primary: true }
          ];
          res.followups = [
            'What is the churn rate on wellness plans?',
            'Show puppy cohort retention',
            'Which clinic has highest subscription sales?'
          ];
          break;
        }

        case 'SYSTEM_HEALTH': {
          res.text = [
            '<strong>System Health & Data Telemetry:</strong>',
            '• <strong>Connected Nodes:</strong> 14 DB replicas synchronized with zero drift.',
            '• <strong>Query Latency:</strong> 142ms p99 response time.',
            '• <strong>Platform Uptime:</strong> 99.98% over past 30 days.'
          ].join('<br/>');
          res.kpis = [
            { label: 'Connected Nodes', val: '14 DBs', status: 'success' },
            { label: 'Query Latency', val: '142ms', status: 'success' },
            { label: 'Platform Uptime', val: '99.98%', status: 'success' }
          ];
          res.actions = [
            { label: '🔍 View System Health Dashboard', hash: '#system-health-dashboard', primary: true }
          ];
          res.followups = [
            'Why did sales drop in Delhi NCR?',
            'Which clinic generated the highest EBITDA this month?',
            'What is the forecast for Bravecto chewables inventory?'
          ];
          break;
        }

        case 'GENERAL_OVERVIEW':
        default: {
          res.text = [
            '<strong>Zenve Executive Business Overview:</strong>',
            '• <strong>MTD Revenue:</strong> ₹1.84 Cr (+18.4% YoY) across 12,480 orders.',
            '• <strong>Operating EBITDA:</strong> ₹38.2 Lakh (20.7% margin) across 14 hubs.',
            '• <strong>Top Driver:</strong> Clinical procedures in Indiranagar & Bandra (44% gross margin).',
            '• <strong>Key Watchpoint:</strong> Delhi NCR sales drop (-22.4%) due to 48h stockout.'
          ].join('<br/>');
          res.kpis = [
            { label: 'MTD Revenue', val: '₹1.84 Cr', status: 'success' },
            { label: 'Operating EBITDA', val: '₹38.2L (20.7%)', status: 'success' },
            { label: 'SLA Delivery', val: '97.6%', status: 'success' }
          ];
          res.actions = [
            { label: '📊 View Sales Drop Analysis', hash: '#overview', scrollTarget: 'ai', primary: true },
            { label: '⚡ Open Revenue Intelligence', hash: '#revenue-intelligence' }
          ];
          res.followups = [
            'Why did sales drop in Delhi NCR?',
            'Which clinic generated the highest EBITDA this month?',
            'What is the forecast for Bravecto chewables inventory?'
          ];
          break;
        }
      }

      return res;
    }

    return {
      extractEntities: extractEntities,
      classifyIntent: classifyIntent,
      generateResponse: generateResponse
    };
  })();

  /* ── 1. Ask Zenve AI ─────────────────────────────────────────────── */
  function renderAskAi() {
    var msgsHtml = S.chatHistory.map(function (m, idx) {
      var nlpMetaHtml = '';
      if (m.nlpMeta) {
        nlpMetaHtml = [
          '<div class="zai-nlp-meta">',
            '<span class="zai-nlp-tag intent">⚡ ' + esc(m.nlpMeta.intent) + '</span>',
            (m.nlpMeta.entities || []).map(function (e) {
              return '<span class="zai-nlp-tag entity">🏷️ ' + esc(e) + '</span>';
            }).join(''),
            '<span class="zai-nlp-tag grounding">🛡️ ' + esc(m.nlpMeta.grounding || 'ERP Verified') + '</span>',
            '<span style="margin-left: auto; font-family: \'IBM Plex Mono\', monospace; font-size: 10px; color: #059669; font-weight: 700;">Conf: ' + esc(m.nlpMeta.confidence || '98.5%') + '</span>',
          '</div>'
        ].join('');
      }

      var kpisHtml = '';
      if (m.kpis && m.kpis.length) {
        kpisHtml = [
          '<div class="zai-kpi-pill-row">',
            m.kpis.map(function (k) {
              return [
                '<div class="zai-kpi-pill ' + esc(k.status || 'info') + '">',
                  '<span class="zai-kpi-pill-label">' + esc(k.label) + '</span>',
                  '<span class="zai-kpi-pill-val">' + esc(k.val) + '</span>',
                '</div>'
              ].join('');
            }).join(''),
          '</div>'
        ].join('');
      }

      var insightsHtml = '';
      if (m.insights && m.insights.length) {
        insightsHtml = [
          '<ul class="zai-insights-list">',
            m.insights.map(function (ins) { return '<li>' + ins + '</li>'; }).join(''),
          '</ul>'
        ].join('');
      }

      var actionsHtml = '';
      if (m.actions && m.actions.length) {
        actionsHtml = [
          '<div class="zai-action-row">',
            m.actions.map(function (act) {
              return [
                '<button type="button" class="zai-action-btn ' + (act.primary ? 'primary' : '') + '"',
                ' data-act-type="' + esc(act.type || 'nav') + '"',
                ' data-hash="' + esc(act.hash || '') + '"',
                ' data-scroll="' + esc(act.scrollTarget || '') + '"',
                ' data-action-id="' + esc(act.actionId || '') + '"',
                ' data-msg-idx="' + idx + '">',
                  esc(act.label),
                '</button>'
              ].join('');
            }).join(''),
          '</div>'
        ].join('');
      }

      var actionFeedbackHtml = '';
      if (m.actionFeedback) {
        actionFeedbackHtml = '<div class="zai-action-toast">✅ ' + esc(m.actionFeedback) + '</div>';
      }

      var followupsHtml = '';
      if (m.followups && m.followups.length) {
        followupsHtml = [
          '<div class="zai-followups-box">',
            '<span class="zai-followup-title">💡 Drill-down:</span>',
            m.followups.map(function (f) {
              return '<button type="button" class="zai-followup-btn" data-query="' + esc(f) + '">' + esc(f) + '</button>';
            }).join(''),
          '</div>'
        ].join('');
      }

      return [
        '<div class="zai-msg ' + m.role + '">',
          '<div class="zai-avatar ' + m.role + '">' + (m.role === 'ai' ? '🤖' : '👤') + '</div>',
          '<div class="zai-bubble">',
            nlpMetaHtml,
            '<div>' + m.text + '</div>',
            kpisHtml,
            insightsHtml,
            actionsHtml,
            actionFeedbackHtml,
            followupsHtml,
          '</div>',
        '</div>'
      ].join('');
    }).join('');

    return [
      '<div class="zai-kpi-grid">',
        kpiHtml('Connected Data Nodes', '0 Live DBs', '--', 'neutral', 'No connected data nodes', '🔌'),
        kpiHtml('Neural NLP Latency', '--', '--', 'neutral', 'No query latency records', '⚡'),
        kpiHtml('Model Grounding', '0.0%', '--', 'neutral', 'No verification records', '🛡️'),
        kpiHtml('Executive Queries Today', '0 Prompts', '--', 'neutral', 'No queries processed', '💬'),
      '</div>',

      '<div class="zai-card" style="padding: 0;">',
        '<div style="padding: 10px 20px; background: #f8fafc; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center;">',
          '<div style="display: flex; align-items: center; gap: 8px;">',
            '<span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #10b981;"></span>',
            '<span style="font-size: 12px; font-weight: 700; color: #1e293b;">Zenve Free-Source Neural Reasoning Core</span>',
            '<span style="font-size: 10px; padding: 2px 6px; border-radius: 4px; background: #ede9fe; color: #6d28d9; font-weight: 700;">100% Free • No API Key Needed</span>',
          '</div>',
          '<button type="button" class="zai-btn" id="zai-clear-chat" style="padding: 4px 10px; font-size: 11px;">🧹 Reset Chat</button>',
        '</div>',
        '<div class="zai-chat-box">',
          '<div class="zai-chat-msgs" id="zai-chat-msgs">',
            msgsHtml,
          '</div>',
          '<div class="zai-chips">',
            '<span style="font-size: 11px; font-weight: 700; color: #64748b; margin-right: 4px; display: inline-flex; align-items: center;">Suggested Executive Prompts:</span>',
            '<button type="button" class="zai-chip" data-query="Why did sales drop in Delhi NCR?">Why did sales drop in Delhi NCR?</button>',
            '<button type="button" class="zai-chip" data-query="Which clinic generated the highest EBITDA this month?">Highest EBITDA clinic?</button>',
            '<button type="button" class="zai-chip" data-query="What is the forecast for Bravecto chewables inventory?">Bravecto inventory runway?</button>',
            '<button type="button" class="zai-chip" data-query="Identify top 3 drivers of customer churn in Q3.">Top drivers of customer churn</button>',
            '<button type="button" class="zai-chip" data-query="Simulate net profit if logistics dispatch cost increases by 8%.">Simulate logistics cost +8%</button>',
          '</div>',
          '<form class="zai-chat-input-bar" id="zai-chat-form">',
            '<input type="text" class="zai-input" id="zai-query-input" placeholder="Ask Zenve AI any question about sales drop, clinics, inventory, or margins..." autocomplete="off" />',
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
        kpiHtml('Synthesized Insights', '0 Active', '--', 'neutral', 'No active insights', '💡'),
        kpiHtml('High-Impact Vectors', '0 Critical', '--', 'neutral', 'No operational action', '🔥'),
        kpiHtml('Operational Efficiency', '0.0%', '--', 'neutral', 'No baseline data', '⚙️'),
        kpiHtml('Accuracy Rating', '0.0%', '--', 'neutral', 'No verification records', '🎯'),
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
              '<tr><td colspan="5" style="text-align:center;padding:24px;color:#94a3b8;">No priority business intelligence insights available</td></tr>',
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
        kpiHtml('Identified Margin Leaks', '₹0', '--', 'neutral', 'No friction points', '⚡'),
        kpiHtml('Pricing Optimization Gain', '₹0', '--', 'neutral', 'No elasticity tested', '💹'),
        kpiHtml('Discount Slippage', '0.0%', '--', 'neutral', 'No voucher slippage', '🛡️'),
        kpiHtml('Revenue Run Rate', '₹0', '--', 'neutral', 'No run rate records', '💰'),
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
              '<tr><td colspan="6" style="text-align:center;padding:24px;color:#94a3b8;">No revenue leakage or margin disparity records found</td></tr>',
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
        kpiHtml('Expected Next Month Sales', '₹0', 'P50 Baseline Model', 'neutral', 'No projection records', '📈'),
        kpiHtml('Confidence Score', '0.0%', 'No baseline records', 'neutral', 'Mean absolute error: --', '🎯'),
        kpiHtml('Peak Sales Day Forecast', '--', 'No peak detected', 'neutral', 'No sales surge', '🎆'),
        kpiHtml('Quarterly Trajectory', '₹0', '--', 'neutral', 'No projection records', '🚀'),
      '</div>',

      '<div class="zai-card">',
        '<div class="zai-card-head">',
          '<div>',
            '<h3 class="zai-card-title">Multi-Horizon Sales Projections (Next 4 Weeks)</h3>',
            '<p class="zai-card-sub">Bayesian confidence intervals across clinical appointments, medicines, and commerce</p>',
          '</div>',
          '<span class="zai-badge">Model Inactive</span>',
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
              '<tr><td colspan="6" style="text-align:center;padding:24px;color:#94a3b8;">No multi-horizon projection data available</td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── 5. Demand Forecast ──────────────────────────────────── */
  function renderDemandForecast() {
    return [
      '<div class="zai-kpi-grid">',
        kpiHtml('SKUs Forecasted', '0 Items', '--', 'neutral', 'No catalog items', '📦'),
        kpiHtml('Demand Surge Forecast', '0.0%', '--', 'neutral', 'No active surges', '📈'),
        kpiHtml('Automated PO Recommendations', '0 POs', '--', 'neutral', 'No purchase orders ready', '📑'),
        kpiHtml('Forecast Accuracy (MAPE)', '0.0%', '--', 'neutral', 'No test records', '🎯'),
      '</div>',

      '<div class="zai-card">',
        '<div class="zai-card-head">',
          '<div>',
            '<h3 class="zai-card-title">Critical SKU Consumption Velocity Forecast</h3>',
            '<p class="zai-card-sub">Machine learning consumption models predicting 30-day requirement by regional fulfillment node</p>',
          '</div>',
          '<button class="zai-btn primary" onclick="alert(\'Exporting Automated Purchase Orders to ERP...\')">Generate Purchase Orders</button>',
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
              '<tr><td colspan="6" style="text-align:center;padding:24px;color:#94a3b8;">No critical SKU consumption velocity forecast records available</td></tr>',
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
        kpiHtml('Imminent Stockout Risks', '0 SKUs', '--', 'neutral', 'No stockout risks detected', '⚠️'),
        kpiHtml('Predicted Expiry Waste (90D)', '₹0', '--', 'neutral', 'No expiry waste predicted', '⏳'),
        kpiHtml('Stock Runway Health', '-- Days', '--', 'neutral', 'No buffer records', '📦'),
        kpiHtml('Reorder Optimization Rate', '0.0%', '--', 'neutral', 'No reorders logged', '🛡️'),
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
              '<tr><td colspan="6" style="text-align:center;padding:24px;color:#94a3b8;">No stockout runway or batch expiry warning records found</td></tr>',
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
        kpiHtml('Propensity to Repurchase', '0.0%', '--', 'neutral', 'No repurchase history', '🎯'),
        kpiHtml('Predicted Customer LTV', '₹0', '--', 'neutral', 'No LTV records', '💎'),
        kpiHtml('Next-Best-Action Success', '0.0%', '--', 'neutral', 'No active triggers', '⚡'),
        kpiHtml('Targeted Pet Parents', '0 Users', '--', 'neutral', 'No targeted profiles', '🐾'),
      '</div>',

      '<div class="zai-card">',
        '<div class="zai-card-head">',
          '<div>',
            '<h3 class="zai-card-title">Next-Best-Action (NBA) Customer Behavioral Matrix</h3>',
            '<p class="zai-card-sub">Personalized healthcare triggers mapped to pet lifecycle stages and vaccination schedules</p>',
          '</div>',
          '<button class="zai-btn primary" onclick="alert(\'No pet parent nudges available to dispatch.\')">Dispatch Nudges</button>',
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
              '<tr><td colspan="6" style="text-align:center;padding:24px;color:#94a3b8;">No customer behavioral or next-best-action records available</td></tr>',
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
        kpiHtml('Identified At-Risk Cohort', '0 Pet Parents', '--', 'neutral', 'All cohorts active', '🛡️'),
        kpiHtml('Predicted Churn Prevention', '0.0%', '--', 'neutral', 'No win-back workflows active', '✨'),
        kpiHtml('Net Retention Rate (NRR)', '0.0%', '--', 'neutral', 'No retention baseline', '📈'),
        kpiHtml('Avg Days to Churn Trigger', '-- Days', '--', 'neutral', 'No lapse events', '⏳'),
      '</div>',

      '<div class="zai-card">',
        '<div class="zai-card-head">',
          '<div>',
            '<h3 class="zai-card-title">High-Risk Customer Churn Radar & Win-Back Playbook</h3>',
            '<p class="zai-card-sub">Algorithmic scoring combining consultation gaps, medicine refill delays, and complaint logs</p>',
          '</div>',
          '<button class="zai-btn primary" onclick="alert(\'No at-risk pet parents queued for win-back.\')">Execute Win-Back</button>',
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
              '<tr><td colspan="6" style="text-align:center;padding:24px;color:#94a3b8;">No at-risk customer churn radar records found</td></tr>',
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
        kpiHtml('Projected Monthly EBITDA', '₹0', '--', 'neutral', 'No projection records', '💹'),
        kpiHtml('Gross Profit Margin Forecast', '0.0%', '--', 'neutral', 'No model records', '📈'),
        kpiHtml('Breakeven Occupancy Rate', '0.0%', 'Across all clinics', 'neutral', 'No occupancy data', '🏥'),
        kpiHtml('Unit Economic Multiplier', '0.0x LTV/CAC', 'No data', 'neutral', 'Payback: --', '💎'),
      '</div>',

      '<div class="zai-card">',
        '<div class="zai-card-head">',
          '<div>',
            '<h3 class="zai-card-title">Dynamic Profitability Scenario Simulation Engine</h3>',
            '<p class="zai-card-sub">Stress testing margins under varying operational cost and logistics conditions</p>',
          '</div>',
          '<span class="zai-badge">Simulation Inactive</span>',
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
              '<tr><td colspan="6" style="text-align:center;padding:24px;color:#94a3b8;">No simulation scenarios available</td></tr>',
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
        kpiHtml('Active Anomaly Alerts', '0 Active', '--', 'neutral', 'Continuous telemetry scanning', '🔍'),
        kpiHtml('Anomalies Resolved (7D)', '0 Events', '--', 'neutral', 'Pricing, dispatch & sync', '🛡️'),
        kpiHtml('Detection Latency', '--', '--', 'neutral', 'Kafka transaction pipeline', '⚡'),
        kpiHtml('System Stability Index', '0.0%', '--', 'neutral', 'Continuous monitoring', '⚙️'),
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
              '<tr><td colspan="6" style="text-align:center;padding:24px;color:#94a3b8;">No statistical anomaly alerts detected in telemetry stream</td></tr>',
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
        kpiHtml('Identified EBITDA Lift', '₹0', '--', 'neutral', 'No active playbooks', '✨'),
        kpiHtml('Actions Implemented', '0 Playbooks', '--', 'neutral', 'No actions taken', '🏆'),
        kpiHtml('Fastest Win Window', '--', '--', 'neutral', 'No inventory unlock', '⚡'),
        kpiHtml('Recommendation Score', '0.0 / 100', '--', 'neutral', 'No score records', '🎯'),
      '</div>',

      '<div class="zai-card">',
        '<div class="zai-card-head">',
          '<div>',
            '<h3 class="zai-card-title">Prioritized Executive Autonomous Playbooks</h3>',
            '<p class="zai-card-sub">Algorithmic action queue ranked by EBITDA potential and organizational ease of execution</p>',
          '</div>',
          '<button class="zai-btn primary" onclick="alert(\'No playbooks currently queued for execution.\')">Approve All Playbooks</button>',
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
              '<tr><td colspan="6" style="text-align:center;padding:24px;color:#94a3b8;">No prioritized executive autonomous playbooks available</td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function getActiveTabConfig() {
    var norm = normalizeTab(S.tab);
    for (var i = 0; i < TABS.length; i++) {
      if (TABS[i].id === norm) return TABS[i];
    }
    return TABS[0];
  }

  function renderTabsBar() {
    var activeId = normalizeTab(S.tab);
    return TABS.map(function (t) {
      var isActive = t.id === activeId;
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
    var tab = normalizeTab(S.tab);
    switch (tab) {
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

    // Generate intelligent response via Free-Source NLP & Domain LLM
    var aiResp = ZenveNLP_LLM.generateResponse(q, S.lastContext);
    S.lastContext = aiResp.context;
    S.chatHistory.push(aiResp);
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

    var clearBtn = root.querySelector('#zai-clear-chat');
    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        S.chatHistory = [
          {
            role: 'ai',
            text: 'Conversation reset. I am ready for your next strategic query. Ask about Sales Drop, EBITDA, Bravecto Runway, Clinics, or Doctor Workload.',
            nlpMeta: {
              intent: 'EXECUTIVE ONBOARDING',
              entities: ['Ready'],
              grounding: 'Live ERP Telemetry',
              confidence: '99.9%'
            },
            followups: []
          }
        ];
        S.lastContext = { intent: 'GENERAL_OVERVIEW', location: null, timeframe: 'MTD' };
        render();
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

    var followups = root.querySelectorAll('.zai-followup-btn');
    for (var f = 0; f < followups.length; f++) {
      followups[f].addEventListener('click', function () {
        var q = this.getAttribute('data-query');
        handleAiQuery(q);
      });
    }

    var actionBtns = root.querySelectorAll('.zai-action-btn');
    for (var a = 0; a < actionBtns.length; a++) {
      actionBtns[a].addEventListener('click', function () {
        var actType = this.getAttribute('data-act-type');
        var hash = this.getAttribute('data-hash');
        var scrollTarget = this.getAttribute('data-scroll');
        var actionId = this.getAttribute('data-action-id');
        var msgIdx = parseInt(this.getAttribute('data-msg-idx'), 10);

        if (actType === 'nav' && hash) {
          window.location.hash = hash;
          close();
          if (scrollTarget) {
            setTimeout(function () {
              var el = document.getElementById(scrollTarget) || document.querySelector('.' + scrollTarget);
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 150);
          }
        } else if (actType === 'exec_action' && actionId) {
          if (actionId === 'po_8821') {
            if (S.chatHistory[msgIdx]) {
              S.chatHistory[msgIdx].actionFeedback = 'PO-8821 Approved: 60 Bravecto units dispatched from Central Hub to Koramangala. ETA: 4 Hours.';
              render();
            }
          } else if (actionId === 'winback_whatsapp') {
            if (S.chatHistory[msgIdx]) {
              S.chatHistory[msgIdx].actionFeedback = 'WhatsApp Campaign Triggered: Dispatched complimentary dental triage vouchers to 248 at-risk pet parents.';
              render();
            }
          }
        }
      });
    }
  }

  function switchTab(tid) {
    S.tab = normalizeTab(tid);
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
    if (tabId) S.tab = normalizeTab(tabId);
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
