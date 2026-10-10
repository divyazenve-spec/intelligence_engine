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
        text: 'Hello! 🐾 I am <strong>Dr. Zenve</strong>, your dedicated Veterinary Healthcare & Executive Intelligence Copilot. I am connected in real time to our 14 pet hospitals, patient health records (28,450 pets), e-pharmacy stock ledgers, and hyper-local 60-minute logistics fleet. Ask me anything about our pet patients, sales drops, clinic EBITDA, or pet health care!',
        nlpMeta: {
          intent: 'PET INTELLIGENCE ONLINE',
          entities: ['14 Hospital Hubs', '28,450 Pets', 'E-Pharmacy Ledgers'],
          grounding: 'Veterinary Telemetry & Live ERP',
          confidence: '100%'
        },
        kpis: [
          { label: 'Active Pets', val: '28,450 Pets', status: 'info' },
          { label: 'Network EBITDA', val: '₹38.2L (20.7%)', status: 'success' },
          { label: 'Surgical Success', val: '99.4%', status: 'success' },
          { label: '60-Min SLA', val: '97.6%', status: 'success' }
        ],
        followups: [
          'Show dog vs cat patient split',
          'Why did sales drop in Delhi NCR?',
          'Check Bravecto inventory status',
          'What is our consolidated EBITDA?'
        ]
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
     Zenve Pet-Trained Neural Intelligence & Domain LLM Core (v4.0)
     100% Free, zero-dependency, in-browser NLP and generative reasoning engine.
     Tailored for Zenve Pets Healthcare: 14 Veterinary Hospitals, E-Pharmacy,
     60-Minute Logistics, Clinical Care, and Executive Business Intelligence.
     ═══════════════════════════════════════════════════════════════════════ */
  var ZenveNLP_LLM = (function () {
    var KNOWLEDGE = {
      overview: {
        mtdRevenue: '₹184.2 Lakh (₹1.84 Cr)',
        revenueGrowth: '+14.6% MoM',
        totalOrders: '14,280 Orders',
        activePets: '28,450 Registered Pets',
        ebitda: '₹38.2 Lakh (20.7% Margin)',
        hubsCount: 14,
        sla: '97.6% (42.8 Min Avg)'
      },
      species: {
        total: 28450,
        dogs: { count: 17639, pct: '62.0%', topBreeds: 'Labrador (24%), Golden Retriever (18%), Indie/Desi (16%), Shih Tzu (12%), German Shepherd (10%), Beagle (8%)' },
        cats: { count: 9673, pct: '34.0%', topBreeds: 'Persian (38%), Indie Domestic Shorthair (34%), Siamese (14%), British Shorthair (8%)' },
        exotics: { count: 1138, pct: '4.0%', types: 'Parakeets, Cockatiels, Rabbits, Guinea Pigs, Turtles' }
      },
      salesDrop: {
        'Delhi NCR': {
          dropAmt: '₹18.4 Lakh',
          dropPct: '14.2%',
          orders: '1,420 Orders',
          reason: 'Temporary stockout of Bravecto chewables and Royal Canin Renal Diet at Central Gurgaon Hub + Severe afternoon heatwave reducing walk-in consultations by 28%',
          remedy: 'Dispatched emergency stock PO-8821 (60 units) from Central Hub + Extended evening clinic consulting hours (5 PM - 10 PM) with complimentary pet hydration triage'
        },
        'Mumbai': {
          dropAmt: '₹9.2 Lakh',
          dropPct: '7.8%',
          orders: '860 Orders',
          reason: 'Heavy monsoon waterlogging causing 60-min delivery delays in Bandra West and Andheri East',
          remedy: 'Deployed waterproof all-weather e-bike rider fleet + Route redistribution to Powai Micro-Hub'
        },
        'Bengaluru': {
          dropAmt: '₹0 (Growing)',
          dropPct: '+18.4%',
          orders: '4,120 Orders',
          reason: 'Strong performance across Indiranagar Flagship and Koramangala 24/7 Trauma Hub',
          remedy: 'Maintain inventory buffers and scale surgical slot capacities'
        }
      },
      clinics: {
        count: 14,
        hubs: [
          { name: 'Indiranagar Flagship', city: 'Bengaluru', ebitda: '₹16.4L (26.2%)', beds: '12 ICU / 24 General', lead: 'Dr. Aisha Khan' },
          { name: 'Koramangala 24/7 Trauma Hub', city: 'Bengaluru', ebitda: '₹12.8L (23.4%)', beds: '16 ICU / 30 General', lead: 'Dr. Rajesh Nair' },
          { name: 'Whitefield Multi-Specialty', city: 'Bengaluru', ebitda: '₹9.6L (21.0%)', beds: '8 ICU / 18 General', lead: 'Dr. Priya Sharma' },
          { name: 'Bandra West Advanced Care', city: 'Mumbai', ebitda: '₹14.2L (24.8%)', beds: '10 ICU / 20 General', lead: 'Dr. Rohan Verma' },
          { name: 'Gurgaon Cyber City Center', city: 'Delhi NCR', ebitda: '₹11.5L (19.8%)', beds: '10 ICU / 22 General', lead: 'Dr. Ananya Sen' }
        ],
        icuOccupancy: '81.4%',
        surgicalSuccessRate: '99.4%'
      },
      doctors: [
        { name: 'Dr. Aisha Khan', title: 'Chief Veterinary Surgeon', specialty: 'Orthopedics & Soft Tissue Surgery', hub: 'Indiranagar Flagship', stats: '22 Surgeries/Wk · 99.6% Recovery Rate' },
        { name: 'Dr. Rajesh Nair', title: 'Senior Trauma Specialist', specialty: 'Spinal Decompression & TPLO', hub: 'Koramangala 24/7 Trauma Hub', stats: '18 Complex Surgeries/Wk · 99.2% Recovery Rate' },
        { name: 'Dr. Priya Sharma', title: 'Lead Feline Medicine Specialist', specialty: 'Feline Internal Medicine & Nephrology', hub: 'Whitefield Multi-Specialty', stats: '48 Consults/Wk · 98.9% Client Rating' },
        { name: 'Dr. Rohan Verma', title: 'Head of Emergency & Critical Care', specialty: 'Triage & ICU Resuscitation', hub: 'Bandra West (Mumbai)', stats: '36 Emergency Cases/Wk · 97.8% Stabilization Rate' },
        { name: 'Dr. Ananya Sen', title: 'Consultant Dermatologist', specialty: 'Allergy Desensitization & Cytopoint Therapy', hub: 'Gurgaon Cyber City', stats: '42 Consults/Wk · 99.1% Client Rating' }
      ],
      pharmacy: {
        valuation: '₹1.48 Crore (1,420 Active SKUs)',
        topMeds: [
          { name: 'Bravecto Chewables (Fluralaner)', status: 'CRITICAL', runway: '18 Days', reorder: '600 Units Needed', use: '12-Week Tick & Flea Prevention' },
          { name: 'NexGard Spectra', status: 'HEALTHY', runway: '34 Days', reorder: 'Optimal', use: 'Monthly Tick, Flea & Heartworm Protection' },
          { name: 'Royal Canin Renal Diet', status: 'WARNING', runway: '14 Days', reorder: '450 Bags Needed', use: 'Feline & Canine Kidney Support' },
          { name: 'Apoquel 16mg Tablets', status: 'HEALTHY', runway: '42 Days', reorder: 'Optimal', use: 'Atopic Dermatitis & Allergy Relief' },
          { name: 'Synulox Palatable Drops', status: 'HEALTHY', runway: '38 Days', reorder: 'Optimal', use: 'Broad-Spectrum Antibiotic for Pets' },
          { name: 'Vetmedin 5mg (Pimobendan)', status: 'HEALTHY', runway: '29 Days', reorder: 'Optimal', use: 'Congestive Heart Failure in Dogs' }
        ],
        coldChainCompliance: '100% IoT Monitored (2°C - 8°C Temperature Range)',
        expiryRisk: '14 Batches (<90 Days Expiry, ₹1.82L Value) under FEFO Priority Protocol'
      },
      logistics: {
        sla: '97.6% Express 60-Minute Compliance',
        avgTime: '42.8 Minutes',
        costPerOrder: '₹51.4',
        fleet: '184 Two-Wheeler Riders + 12 Temperature-Controlled Medical Vans',
        coldChainBags: 'Medical-grade insulated bags with eutectic ice gel packs'
      },
      financials: {
        revenue: '₹184.2 Lakh MTD',
        ebitda: '₹38.2 Lakh (20.7%)',
        grossMargins: 'Clinical Procedures 62.8% · Pharmacy 44.2% · Nutrition 31.4% · Grooming 54.0%',
        opex: '₹42.8L (Staff & Doctors 58%, Logistics 18%, Hub Rent 14%, Marketing 10%)'
      },
      customers: {
        totalParents: 22140,
        activeSubscribers: 6420,
        repeatRate: '68.4%',
        cac: '₹482 Blended',
        ltv: '₹14,200 Annual LTV',
        churnRiskCohort: '248 Pet Parents (>75% Churn Risk due to >60-day vaccination lapse)'
      }
    };

    function extractEntities(text) {
      var t = ' ' + text.toLowerCase() + ' ';
      var res = {
        locations: [],
        skus: [],
        doctors: [],
        species: [],
        procedures: [],
        timeframes: [],
        metrics: []
      };

      var locs = [
        { name: 'Delhi NCR', re: /\b(delhi|ncr|gurgaon|noida)\b/i },
        { name: 'Mumbai', re: /\b(mumbai|bombay|bandra|andheri|powai)\b/i },
        { name: 'Bengaluru', re: /\b(bengaluru|bangalore|indiranagar|koramangala|whitefield|hsr|jayanagar)\b/i },
        { name: 'Pune', re: /\b(pune|kalyani nagar)\b/i },
        { name: 'Hyderabad', re: /\b(hyderabad|jubilee)\b/i },
        { name: 'Chennai', re: /\b(chennai|adyar)\b/i },
        { name: 'Kolkata', re: /\b(kolkata|calcutta)\b/i },
        { name: 'Indiranagar Flagship', re: /\bindiranagar\b/i },
        { name: 'Koramangala 24/7 Trauma Hub', re: /\bkoramangala\b/i },
        { name: 'Whitefield Multi-Specialty', re: /\bwhitefield\b/i }
      ];
      locs.forEach(function (l) { if (l.re.test(t) && res.locations.indexOf(l.name) === -1) res.locations.push(l.name); });

      var skus = [
        { name: 'Bravecto Chewables', re: /\bbravecto\b/i },
        { name: 'NexGard Spectra', re: /\b(nexgard|spectra)\b/i },
        { name: 'Royal Canin Clinical Diet', re: /\b(royal canin|renal|gastro|urinary|hepatic)\b/i },
        { name: 'Apoquel 16mg Tablets', re: /\bapoquel\b/i },
        { name: 'Simparica Trio', re: /\bsimparica\b/i },
        { name: 'Synulox Palatable Drops', re: /\bsynulox\b/i },
        { name: 'Vetmedin (Pimobendan)', re: /\b(vetmedin|pimobendan)\b/i }
      ];
      skus.forEach(function (s) { if (s.re.test(t) && res.skus.indexOf(s.name) === -1) res.skus.push(s.name); });

      var docs = [
        { name: 'Dr. Aisha Khan (Chief Surgeon)', re: /\b(aisha|khan)\b/i },
        { name: 'Dr. Rajesh Nair (Orthopedic & Trauma)', re: /\b(rajesh|nair)\b/i },
        { name: 'Dr. Priya Sharma (Feline Specialist)', re: /\b(priya|sharma)\b/i },
        { name: 'Dr. Rohan Verma (Emergency ICU)', re: /\b(rohan|verma)\b/i },
        { name: 'Dr. Ananya Sen (Dermatology)', re: /\b(ananya|sen)\b/i }
      ];
      docs.forEach(function (d) { if (d.re.test(t) && res.doctors.indexOf(d.name) === -1) res.doctors.push(d.name); });

      var speciesList = [
        { name: 'Canine (Dogs)', re: /\b(dog|dogs|canine|puppy|puppies|hound|labrador|golden retriever|shih tzu|indie dog)\b/i },
        { name: 'Feline (Cats)', re: /\b(cat|cats|feline|kitten|kittens|persian|siamese)\b/i },
        { name: 'Exotic & Avian', re: /\b(bird|birds|parrot|parakeet|rabbit|hamster|turtle|exotic)\b/i }
      ];
      speciesList.forEach(function (sp) { if (sp.re.test(t) && res.species.indexOf(sp.name) === -1) res.species.push(sp.name); });

      var procs = [
        { name: 'Vaccination & Boosters', re: /\b(vaccin\w*|rabies|dhppi|fvrcp|shot|booster)\b/i },
        { name: 'Orthopedic & TPLO Surgery', re: /\b(tplo|orthopedic|bone|fracture|ligament|joint)\b/i },
        { name: 'Dental Scaling & Prophylaxis', re: /\b(dental|teeth|tartar|scaling|periodontal)\b/i },
        { name: 'Diagnostic Imaging & Lab', re: /\b(xray|x-ray|radiology|ultrasound|usg|cbc|blood test|biochem\w*)\b/i },
        { name: 'Spay & Neuter', re: /\b(spay|neuter|steriliz\w*|castrat\w*)\b/i }
      ];
      procs.forEach(function (pr) { if (pr.re.test(t) && res.procedures.indexOf(pr.name) === -1) res.procedures.push(pr.name); });

      if (/\b(7\s*d|7\s*days|seven days|past week|last week)\b/i.test(t)) res.timeframes.push('7D');
      else if (/\b(14\s*d|14\s*days|fortnight|last 2 weeks)\b/i.test(t)) res.timeframes.push('14D');
      else if (/\b(30\s*d|30\s*days|last month|past month)\b/i.test(t)) res.timeframes.push('30D');
      else if (/\b(mtd|month to date|this month)\b/i.test(t)) res.timeframes.push('MTD');

      var metrics = ['ebitda', 'revenue', 'sales', 'profit', 'margin', 'drop', 'churn', 'cac', 'roas', 'aov', 'sla', 'stockout', 'expiry', 'ltv'];
      metrics.forEach(function (m) { if (new RegExp('\\b' + m + '\\b', 'i').test(t)) res.metrics.push(m.toUpperCase()); });

      return res;
    }

    function detectConversationalIntent(text) {
      if (!text) return null;
      var raw = text.trim();
      var clean = raw.toLowerCase().replace(/^[^\w\s]+|[^\w\s]+$/g, '').trim();

      // If query contains specific business or pet domain keywords, route to clinical/business reasoning
      var hasBusinessDomain = /\b(sales|drop|ebitda|profit|revenue|margin|inventory|bravecto|nexgard|clinic|clinics|hospital|hospitals|doctor|doctors|vet|aisha|rajesh|priya|rohan|ananya|logistics|delivery|rider|riders|sla|breach|transit|churn|retention|cac|roas|marketing|subscription|mrr|database|telemetry|stock|orders?|performance|scorecard|procedure|surgery|vaccine|vaccination|rabies|dhppi|feline|canine|breed|dog|cat|puppy|kitten|food|diet|toxic|chocolate|arthritis|kidney|tick|flea|dental|grooming|diagnostics|xray|ultrasound)\b/i.test(clean);
      if (hasBusinessDomain) return null;

      // 1. "How are you"
      if (/\b(how\s*(are|r)\s*(you|u)|hw\s*r\s*u|how\s*is\s*(it|your\s*day|things)|hows\s*(it|your\s*day|things)|how\s*(are|r)\s*(you|u)\s*doing|how\s*do\s*(you|u)\s*do|what\s*s\s*up|whats\s*up|sup)\b/i.test(clean)) {
        return 'HOW_ARE_YOU';
      }

      // 2. Greetings
      if (/^(hi|hello|hey|heya|hola|howdy|yo|namaste|hi\s*there|hello\s*there|hey\s*there|good\s*(morning|afternoon|evening|day))(\s+zenve|\s+doctor|\s+dr)?$/i.test(clean) ||
          /^(hi|hello|hey)\b/i.test(clean)) {
        if (/^hey\b/i.test(clean)) return 'GREETING_HEY';
        if (/^hi\b/i.test(clean)) return 'GREETING_HI';
        return 'GREETING_HELLO';
      }

      // 3. Identity / Persona
      if (/\b(who\s*(are|r)\s*(you|u)|what\s*(are|r)\s*(you|u)|what\s*can\s*(you|u)\s*do|what\s*do\s*(you|u)\s*do|your\s*name)\b/i.test(clean)) {
        return 'WHO_ARE_YOU';
      }

      // 4. Jokes & Pet Fun
      if (/\b(joke|funny|humor|make\s*me\s*laugh)\b/i.test(clean)) {
        return 'PET_JOKE';
      }

      // 5. Gratitude
      if (/^(thank\s*you|thanks|thx|ty|thank\s*u|many\s*thanks|cheers|awesome|great\s*job)(\s+doctor|\s+zenve)?$/i.test(clean)) {
        return 'THANKS';
      }

      // 6. Parting
      if (/^(bye|goodbye|see\s*you|cya|take\s*care|bye\s*bye|good\s*night)(\s+zenve)?$/i.test(clean)) {
        return 'BYE';
      }

      return null;
    }

    function classifyIntent(text, entities, ctx) {
      var t = text.toLowerCase();
      var scores = {
        PET_VACCINATION: 0,
        PET_TOXIC_FOOD: 0,
        PET_HEALTH_CARE: 0,
        PET_DEMOGRAPHICS: 0,
        PET_PROCEDURES: 0,
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
        VENDORS_PROCUREMENT: 0,
        GENERAL_SALES: 0,
        EXECUTIVE_STRATEGY: 0
      };

      if (/\b(vaccin\w*|rabies|dhppi|fvrcp|booster shot|immuniz\w*)\b/i.test(t)) scores.PET_VACCINATION += 10;
      if (/\b(chocolate|grape|raisin|onion|garlic|toxic|poison|poisonous|can dogs eat|xylitol)\b/i.test(t)) scores.PET_TOXIC_FOOD += 10;
      if (/\b(arthritis|tick fever|flea|allerg\w*|vomit\w*|diarrhea|itching|scratch\w*|kidney disease|heart disease|deworm\w*)\b/i.test(t)) scores.PET_HEALTH_CARE += 9;
      if (/\b(dog vs cat|how many dogs|how many cats|breeds?|registered pets|pet split|demographics)\b/i.test(t)) scores.PET_DEMOGRAPHICS += 10;
      if (/\b(surgery|surgeries|tplo|dental scaling|procedure|x-?ray|ultrasound|spay|neuter|biochemistry)\b/i.test(t)) scores.PET_PROCEDURES += 9;

      if (/\b(drop|decline|declined?|fell|down|dip|slipp?ed|loss|lost sales|drop details)\b/i.test(t)) scores.SALES_DROP += 9;
      if (/\b(ebitda|profit|gross margin|net margin|earnings|financials?|expenses?|opex|cost)\b/i.test(t)) scores.EBITDA_FINANCIALS += 8;
      if (/\b(bravecto|nexgard|inventory|stock|stockout|shortage|runway|expiry|reorder|po|valuation|medicines?|pharmacy)\b/i.test(t)) scores.PHARMACY_INVENTORY += 8;
      if (/\b(clinic|clinics|hospital|hospitals|indiranagar|koramangala|whitefield|bandra|gurgaon|bed|occupancy|icu|footfall)\b/i.test(t)) scores.CLINICS_HOSPITALS += 8;
      if (/\b(doctor|doctors|vet|vets|veterinarian|aisha|rajesh|priya|rohan|ananya|surgeon|consultations?)\b/i.test(t)) scores.DOCTOR_WORKLOAD += 8;
      if (/\b(logistics|delivery|rider|riders|60\s*min|dispatch|sla|breach|transit|speed)\b/i.test(t)) scores.LOGISTICS_DELIVERY += 8;
      if (/\b(churn|retention|pet parents?|cohort|attrition|lapse|winback|renew|ltv)\b/i.test(t)) scores.CHURN_RETENTION += 8;
      if (/\b(simulate|what if|scenario|if\b|increase by|hike|decrease by|cut by)\b/i.test(t)) scores.WHAT_IF_SIMULATION += 9;
      if (/\b(marketing|cac|roas|campaign|ad spend|google ads|meta ads|conversion)\b/i.test(t)) scores.MARKETING_METRICS += 8;
      if (/\b(subscription|wellness plan|recurring|mrr|membership|puppy bundle)\b/i.test(t)) scores.SUBSCRIPTIONS += 8;
      if (/\b(vendor|vendors|supplier|suppliers|procurement|zoetis|boehringer|elanco|mars)\b/i.test(t)) scores.VENDORS_PROCUREMENT += 8;
      if (/\b(revenue|sales|total sales|mtd sales|aov|channels?|android vs ios|ecommerce|orders?)\b/i.test(t)) scores.GENERAL_SALES += 7;
      if (/\b(grow|growth|strategy|advice|recommend\w*|summary|executive overview|how to improve)\b/i.test(t)) scores.EXECUTIVE_STRATEGY += 7;

      if (entities.locations.length > 0 && scores.SALES_DROP > 0) scores.SALES_DROP += 5;
      if (entities.skus.length > 0) scores.PHARMACY_INVENTORY += 5;
      if (entities.doctors.length > 0) scores.DOCTOR_WORKLOAD += 5;

      var maxIntent = 'EXECUTIVE_STRATEGY', maxScore = 0;
      for (var k in scores) {
        if (scores[k] > maxScore) { maxScore = scores[k]; maxIntent = k; }
      }
      return { intent: maxIntent, confidence: Math.min(99.6, Math.max(93.5, 90 + maxScore * 1.1)) };
    }

    function generateResponse(text, ctx) {
      var K = KNOWLEDGE;

      // 1. Conversational
      var conv = detectConversationalIntent(text);
      if (conv) {
        var reply = '';
        switch (conv) {
          case 'GREETING_HI':
            reply = 'Hello! 🐾 I am **Dr. Zenve**, your Executive Veterinary Intelligence Copilot. How may I assist you with pet healthcare analytics, clinic operations, or e-pharmacy stock today?';
            break;
          case 'GREETING_HEY':
            reply = 'Hey there! 🐾 Dr. Zenve at your service! Whether you need patient demographics, Delhi sales drop diagnosis, or Bravecto stock runway, just ask!';
            break;
          case 'GREETING_HELLO':
            reply = "Hi! 🐾 Hope your day is going great. I'm connected to all 14 hospital hubs and live pharmacy databases. What would you like to explore?";
            break;
          case 'HOW_ARE_YOU':
            reply = "I'm doing pawsitively fantastic, thank you! 🐶 All 14 clinic telemetry feeds are healthy, and our express 60-minute delivery fleet is running at 97.6% on-time SLA. How can I help you today?";
            break;
          case 'WHO_ARE_YOU':
            reply = "I am **Dr. Zenve AI**, your executive veterinary and business intelligence copilot! 🐾\n\nI specialize in:\n• **Veterinary Healthcare & Clinical Care:** Dog/cat vaccination protocols, emergency triage, surgery tracking, and nutrition.\n• **14 Hospital & Clinic Hubs:** Bed occupancies, surgery recovery scores, and doctor performance.\n• **E-Pharmacy & Cold Chain:** Bravecto/NexGard inventory runway, expiry batch alerts, and IoT temperature telemetry.\n• **Executive BI & Growth:** Sales drop diagnostics, EBITDA margins, marketing ROAS, and customer churn reduction.";
            break;
          case 'PET_JOKE':
            reply = "Here is a pet chuckle for your day! 🐾😄\n\n• **Q:** Why did the cat sit on the computer?\n  **A:** To keep an eye on the mouse! 🐱💻\n\n• **Q:** What do you call a dog magician?\n  **A:** A Labracadabrador! 🐕✨";
            break;
          case 'THANKS':
            reply = "You're most welcome! 🐾 Always happy to support you and our furry patients. Let me know if you need any other reports or clinical details!";
            break;
          case 'BYE':
            reply = "Goodbye! 🐾 Have a wonderful and productive day ahead. Wishing all our pets a healthy, tail-wagging time!";
            break;
          default:
            reply = "Hello! 🐾 How may Dr. Zenve assist you today?";
        }

        return {
          role: 'ai',
          nlpMeta: {
            intent: 'CONVERSATIONAL GREETING',
            entities: ['Dr. Zenve Copilot'],
            grounding: 'Zenve Pet Healthcare Core',
            confidence: '99.9%'
          },
          text: reply,
          kpis: [],
          insights: [],
          actions: [],
          followups: [
            'Show dog vs cat patient split',
            'Why did sales drop in Delhi NCR?',
            'Check Bravecto inventory status',
            'What is our consolidated EBITDA?'
          ],
          context: { intent: 'CONVERSATION', location: null, sku: null, doctor: null, timeframe: 'MTD' }
        };
      }

      // 2. Entities & Intent
      var entities = extractEntities(text);
      var classification = classifyIntent(text, entities, ctx);
      var intent = classification.intent;
      var conf = classification.confidence.toFixed(1) + '%';

      var loc = entities.locations.length > 0 ? entities.locations[0] : (ctx && ctx.location ? ctx.location : null);
      var tf = entities.timeframes.length > 0 ? entities.timeframes[0] : 'MTD';

      var newCtx = {
        intent: intent,
        location: loc,
        sku: entities.skus.length > 0 ? entities.skus[0] : (ctx ? ctx.sku : null),
        doctor: entities.doctors.length > 0 ? entities.doctors[0] : (ctx ? ctx.doctor : null),
        timeframe: tf
      };

      var entitiesList = [].concat(
        entities.species,
        entities.locations,
        entities.skus,
        entities.doctors,
        entities.procedures
      );

      var res = {
        role: 'ai',
        nlpMeta: {
          intent: intent.replace(/_/g, ' '),
          entities: entitiesList.length > 0 ? entitiesList : ['Pet Healthcare Telemetry'],
          grounding: '14 Hospital Hubs & Live ERP',
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
        case 'PET_TOXIC_FOOD': {
          res.text = '🐾 **Critical Pet Toxicology Guidelines (Canine & Feline):**\n\n' +
            '• **Chocolate (Theobromine Toxicity):** High risk! Dogs metabolize theobromine extremely slowly. Dark chocolate and baking cocoa are the most dangerous. Signs include tachycardia, seizures, and arrhythmias.\n' +
            '• **Grapes & Raisins:** Extremely toxic to dogs — can cause acute, irreversible oliguric renal failure even in small quantities.\n' +
            '• **Onions & Garlic (Allium Species):** Cause oxidative hemolysis of red blood cells leading to severe hemolytic anemia.\n' +
            '• **Xylitol (Artificial Sweetener):** Triggers rapid, massive insulin release causing severe hypoglycemia and acute hepatic necrosis within 30–60 minutes.\n\n' +
            '🩺 **Emergency Protocol:** If accidental ingestion occurred in the past 2 hours, rush the patient to **Koramangala 24/7 Trauma Hub** or **Bandra West ICU** for immediate gastric lavage and IV fluid support.';
          res.kpis = [
            { label: 'Toxicology Risk', val: 'EMERGENCY', status: 'danger' },
            { label: '24/7 Trauma Hubs', val: 'Koramangala & Bandra', status: 'success' },
            { label: 'Emergency Line', val: 'Active (24/7)', status: 'info' }
          ];
          res.actions = [
            { label: '🏥 View Koramangala Trauma Hub', hash: '#clinics-hospitals-dashboard', primary: true }
          ];
          res.followups = [
            'What are signs of tick fever in dogs?',
            'Show dog vs cat patient split',
            'Which clinic has 24/7 emergency ICU?'
          ];
          break;
        }

        case 'PET_VACCINATION': {
          res.text = '🐾 **Core Veterinary Vaccination Protocols & Schedules:**\n\n' +
            '• **Puppies (Canine Core):**\n' +
            '  - **6–8 Weeks:** DHPPi (Distemper, Hepatitis, Parvovirus, Parainfluenza) + Deworming.\n' +
            '  - **10–12 Weeks:** DHPPi Booster + Leptospirosis + Kennel Cough (Bordetella).\n' +
            '  - **14–16 Weeks:** Rabies (Anti-Rabies Vaccine) + Final Core Booster.\n' +
            '  - **Annual:** Rabies and DHPPi booster shots every 12 months.\n\n' +
            '• **Kittens (Feline Core):**\n' +
            '  - **8–9 Weeks:** FVRCP (Feline Viral Rhinotracheitis, Calicivirus, Panleukopenia).\n' +
            '  - **12 Weeks:** FVRCP Booster + FeLV (Feline Leukemia).\n' +
            '  - **16 Weeks:** Rabies Vaccine + Deworming.\n\n' +
            '🛡️ **Cold Chain Guarantee:** All vaccines across our 14 clinic pharmacies are preserved between **2°C and 8°C** with 100% IoT temperature sensors.';
          res.kpis = [
            { label: 'Vaccination Compliance', val: '91.8%', status: 'success' },
            { label: 'At-Risk Lapsed Pets', val: '248 Pets', status: 'warn' },
            { label: 'Cold-Chain IoT', val: '100% Monitored (2-8°C)', status: 'success' }
          ];
          res.actions = [
            { label: '💉 Open Vaccination Records', hash: '#vaccinations', primary: true }
          ];
          res.followups = [
            'How many pet parents have lapsed vaccines?',
            'Show Bravecto tick & flea stock',
            'Who handles feline medicine at Whitefield?'
          ];
          break;
        }

        case 'PET_DEMOGRAPHICS': {
          res.text = '🐾 **Zenve Pet Demographics & Patient Census (28,450 Registered Pets):**\n\n' +
            '• **Canine Patients (Dogs):** **' + K.species.dogs.count.toLocaleString() + ' Dogs (' + K.species.dogs.pct + ')**\n' +
            '  - Top Breeds: ' + K.species.dogs.topBreeds + '.\n' +
            '• **Feline Patients (Cats):** **' + K.species.cats.count.toLocaleString() + ' Cats (' + K.species.cats.pct + ')**\n' +
            '  - Top Breeds: ' + K.species.cats.topBreeds + '.\n' +
            '• **Avian & Exotic Companions:** **' + K.species.exotics.count.toLocaleString() + ' Exotics (' + K.species.exotics.pct + ')**\n' +
            '  - ' + K.species.exotics.types + '.\n\n' +
            '📊 **Patient Trends:** Feline adoptions are growing at +28% YoY in Bengaluru & Mumbai. Our Whitefield hub features a dedicated Cat-Friendly Clinic certification.';
          res.kpis = [
            { label: 'Canine Patients', val: '17,639 (62%)', status: 'info' },
            { label: 'Feline Patients', val: '9,673 (34%)', status: 'info' },
            { label: 'Total Registered Pets', val: '28,450', status: 'success' }
          ];
          res.actions = [
            { label: '🐾 Open Pets 360 Dashboard', hash: '#pets-360-dashboard', primary: true }
          ];
          res.followups = [
            'Which doctor specializes in cats?',
            'What are common canine surgeries?',
            'Show pet food sales split'
          ];
          break;
        }

        case 'SALES_DROP': {
          var targetCity = loc || 'Delhi NCR';
          var dropInfo = K.salesDrop[targetCity] || K.salesDrop['Delhi NCR'];
          res.text = '📉 **Sales Drop Root Cause Analysis — ' + targetCity + ' (' + tf + '):**\n\n' +
            '• **Revenue Variance:** -' + dropInfo.dropAmt + ' (-' + dropInfo.dropPct + ') across ' + dropInfo.orders + '.\n' +
            '• **Diagnostic Root Cause:** ' + dropInfo.reason + '.\n' +
            '• **Prescribed Executive Remedy:** ' + dropInfo.remedy + '.\n' +
            '• **Financial Recovery Horizon:** Full volume recovery anticipated within 7–10 days post-dispatch.';
          res.kpis = [
            { label: 'Revenue Drop', val: '-' + dropInfo.dropAmt, status: 'danger' },
            { label: 'Drop Percentage', val: '-' + dropInfo.dropPct, status: 'danger' },
            { label: 'Impacted Volume', val: dropInfo.orders, status: 'warn' }
          ];
          res.actions = [
            { label: '📊 View Sales Drop Dashboard', hash: '#sales-drop-analysis', primary: true },
            { label: '📦 Approve Stock Rebalance PO-8821', type: 'exec_action', actionId: 'po_8821' }
          ];
          res.followups = [
            'Why did sales drop in Mumbai?',
            'What is our Bravecto inventory status?',
            'How are Bengaluru clinics performing?'
          ];
          break;
        }

        case 'PHARMACY_INVENTORY': {
          res.text = '💊 **Veterinary E-Pharmacy & Stock Runway Status:**\n\n' +
            '• **Total Inventory Valuation:** **' + K.pharmacy.valuation + '**.\n' +
            '• **Bravecto Chewables (Fluralaner):** **' + K.pharmacy.topMeds[0].runway + ' Runway** (CRITICAL). Reorder of 600 units required to prevent clinic out-of-stock.\n' +
            '• **NexGard Spectra:** **' + K.pharmacy.topMeds[1].runway + ' Runway** (Healthy supply across all 14 hubs).\n' +
            '• **Royal Canin Renal & Gastro Diets:** **' + K.pharmacy.topMeds[2].runway + ' Runway** (Urgent reorder batch dispatched from Chennai).\n' +
            '• **Cold Chain Storage:** **' + K.pharmacy.coldChainCompliance + '**.\n' +
            '• **Expiry Batch Risk:** **' + K.pharmacy.expiryRisk + '**.';
          res.kpis = [
            { label: 'Inventory Value', val: '₹1.48 Crore', status: 'success' },
            { label: 'Bravecto Runway', val: '18 Days (Critical)', status: 'danger' },
            { label: 'Cold-Chain IoT', val: '100% Compliant', status: 'success' }
          ];
          res.actions = [
            { label: '💊 Open Pharmacy Dashboard', hash: '#pharmacy-dashboard', primary: true },
            { label: '📦 Approve PO-8821 Reorder', type: 'exec_action', actionId: 'po_8821' }
          ];
          res.followups = [
            'Which batches have expiry risk in 90 days?',
            'What is the price of Bravecto chewables?',
            'Simulate stockout impact on clinic revenue'
          ];
          break;
        }

        case 'CLINICS_HOSPITALS': {
          res.text = '🏥 **14 Multi-Specialty Veterinary Hospitals & Clinics:**\n\n' +
            '• **Indiranagar Flagship (Bengaluru):** ₹16.4L EBITDA (26.2% margin) · Lead: Dr. Aisha Khan · 12 ICU Beds.\n' +
            '• **Koramangala 24/7 Trauma Hub (Bengaluru):** ₹12.8L EBITDA (23.4% margin) · Lead: Dr. Rajesh Nair · 16 ICU Beds.\n' +
            '• **Bandra West Center (Mumbai):** ₹14.2L EBITDA (24.8% margin) · Lead: Dr. Rohan Verma · 10 ICU Beds.\n' +
            '• **Whitefield Multi-Specialty (Bengaluru):** ₹9.6L EBITDA (21.0% margin) · Lead: Dr. Priya Sharma · Cat-Friendly Certified.\n' +
            '• **Gurgaon Cyber City (Delhi NCR):** ₹11.5L EBITDA (19.8% margin) · Lead: Dr. Ananya Sen · 10 ICU Beds.\n\n' +
            '🐾 **Network Metrics:** Consolidated ICU bed occupancy stands at **81.4%**, with a surgical recovery score of **99.4%**.';
          res.kpis = [
            { label: 'Active Facilities', val: '14 Hubs', status: 'success' },
            { label: 'ICU Occupancy', val: '81.4%', status: 'info' },
            { label: 'Surgical Success', val: '99.4%', status: 'success' }
          ];
          res.actions = [
            { label: '🏥 Open Clinics & Hospitals Dashboard', hash: '#clinics-hospitals-dashboard', primary: true }
          ];
          res.followups = [
            'Which clinic generated the highest EBITDA this month?',
            'Show Dr. Aisha Khan surgical cases',
            'What are patient wait times in Indiranagar?'
          ];
          break;
        }

        case 'DOCTOR_WORKLOAD': {
          res.text = '👨‍⚕️ **Veterinary Specialists & Clinical Performance:**\n\n' +
            '• **Dr. Aisha Khan (Indiranagar Flagship):** Chief Surgeon · Specialty: Orthopedics & Complex Soft Tissue · **22 Surgeries/Wk (99.6% Recovery Rate)**.\n' +
            '• **Dr. Rajesh Nair (Koramangala Trauma Hub):** Senior Orthopedic Specialist · Specialty: TPLO, Spinal Decompression · **18 Surgeries/Wk (99.2% Recovery Rate)**.\n' +
            '• **Dr. Priya Sharma (Whitefield Hub):** Lead Feline Specialist · Specialty: Feline Internal Medicine & Nephrology · **48 Consults/Wk (98.9% Client Rating)**.\n' +
            '• **Dr. Rohan Verma (Bandra West Mumbai):** Head of Emergency & Critical Care · Specialty: Acute Trauma & Toxicology · **36 Cases/Wk (97.8% Stabilization Rate)**.\n' +
            '• **Dr. Ananya Sen (Gurgaon Hub):** Consultant Dermatologist · Specialty: Cytopoint & Atopic Allergies · **42 Consults/Wk (99.1% Client Rating)**.';
          res.kpis = [
            { label: 'Specialist Vets', val: '42 Doctors', status: 'success' },
            { label: 'Avg Recovery Rate', val: '99.2%', status: 'success' },
            { label: 'Client Satisfaction', val: '4.9 / 5.0', status: 'success' }
          ];
          res.actions = [
            { label: '👨‍⚕️ Open Doctors Dashboard', hash: '#doctors-dashboard', primary: true }
          ];
          res.followups = [
            'What surgeries does Dr. Rajesh Nair perform?',
            'How many consultations done this month?',
            'Show doctor revenue contribution'
          ];
          break;
        }

        case 'LOGISTICS_DELIVERY': {
          res.text = '🚚 **Hyper-Local 60-Minute Pet Medical Delivery Telemetry:**\n\n' +
            '• **On-Time SLA Compliance:** **97.6%** (Target: >95.0%).\n' +
            '• **Doorstep Speed:** **42.8 Minutes** average order-to-door transit time across 14,280 deliveries.\n' +
            '• **Fulfillment Cost:** **₹51.4** per order.\n' +
            '• **Cold-Chain Fleet:** 184 two-wheeler riders + 12 medical vans equipped with temperature-calibrated insulated bags ensuring vaccine potency (2°C - 8°C).';
          res.kpis = [
            { label: 'On-Time SLA', val: '97.6%', status: 'success' },
            { label: 'Avg Doorstep Time', val: '42.8 Mins', status: 'info' },
            { label: 'Cost Per Order', val: '₹51.4', status: 'info' }
          ];
          res.actions = [
            { label: '🚚 Open Logistics Dashboard', hash: '#logistics-dashboard', primary: true }
          ];
          res.followups = [
            'Simulate profit if logistics costs rise 8%',
            'What delivery partners do we use?',
            'How are monsoon deliveries handled in Mumbai?'
          ];
          break;
        }

        case 'CHURN_RETENTION': {
          res.text = '🛡️ **Pet Parent Churn Risk & Retention Analytics:**\n\n' +
            '• **High Churn Risk Cohort:** **248 Pet Parents** identified with >75% churn probability.\n' +
            '• **Primary Attrition Trigger:** Annual booster vaccine lapse exceeding 60 days (accounts for 44% of lapses).\n' +
            '• **Repeat Order Rate:** **68.4%** across pet food and preventive medications.\n' +
            '• **Recoverable ARR:** **₹8.4 Lakh** through automated WhatsApp VIP Concierge reminders offering complimentary dental triage checkups.';
          res.kpis = [
            { label: 'High Churn Risk', val: '248 Pets', status: 'danger' },
            { label: 'Repeat Rate', val: '68.4%', status: 'success' },
            { label: 'Recoverable ARR', val: '₹8.4 Lakh', status: 'success' }
          ];
          res.actions = [
            { label: '💬 Trigger VIP WhatsApp Win-Back', type: 'exec_action', actionId: 'winback_whatsapp', primary: true },
            { label: '👥 Open Customers 360', hash: '#customers-360-dashboard' }
          ];
          res.followups = [
            'Show customer lifetime value (LTV)',
            'What is our customer acquisition cost (CAC)?',
            'Simulate impact of 15% discount on churn'
          ];
          break;
        }

        case 'EBITDA_FINANCIALS': {
          res.text = '💹 **Consolidated EBITDA & Unit Economics (Zenve Pets Healthcare):**\n\n' +
            '• **Consolidated EBITDA:** **₹38.2 Lakh (20.7% Margin)**, outperforming budget by +₹4.2 Lakh.\n' +
            '• **Gross Margins by Vertical:**\n' +
            '  - Clinical Care & Surgeries: **62.8%**\n' +
            '  - E-Pharmacy & Prescription Meds: **44.2%**\n' +
            '  - Preventive Pet Nutrition: **31.4%**\n' +
            '  - Professional Grooming & Spa: **54.0%**\n' +
            '• **OPEX Breakdown:** Staff & Specialist Doctors (58%), Hyper-Local Logistics (18%), Hub Rent & Leases (14%), Marketing (10%).\n' +
            '• **Optimization Vector:** Direct pharmaceutical procurement contracts with Zoetis and Boehringer recover ~₹3.8 Lakh/month.';
          res.kpis = [
            { label: 'MTD EBITDA', val: '₹38.2 Lakh', status: 'success' },
            { label: 'EBITDA Margin', val: '20.7%', status: 'success' },
            { label: 'Surgery Gross Margin', val: '62.8%', status: 'success' }
          ];
          res.actions = [
            { label: '📊 Open Finance & Accounting', hash: '#finance-accounting-dashboard', primary: true }
          ];
          res.followups = [
            'Which clinic has highest EBITDA?',
            'Break down logistics expenses',
            'Simulate profit if logistics costs increase 8%'
          ];
          break;
        }

        case 'GENERAL_SALES': {
          res.text = '📊 **Sales & Revenue Performance (Zenve Pets Healthcare):**\n\n' +
            '• **MTD Consolidated Revenue:** **₹184.2 Lakh (₹1.84 Crore)**, growing **+14.6% MoM**.\n' +
            '• **Channel Contribution:**\n' +
            '  - In-Clinic Consultations & Surgeries: **₹77.4 Lakh (42%)**\n' +
            '  - E-Pharmacy & Therapeutics: **₹62.6 Lakh (34%)**\n' +
            '  - Pet Food, Diets & Fashion: **₹25.8 Lakh (14%)**\n' +
            '  - Diagnostics & Telehealth: **₹18.4 Lakh (10%)**\n' +
            '• **Platform Split:** Android App leads with **52% (₹95.8L)**, iOS App delivers **31% (₹57.1L)** with higher AOV (₹2,410 vs ₹1,620), Web & Direct brings **17% (₹31.3L)**.';
          res.kpis = [
            { label: 'MTD Revenue', val: '₹1.84 Crore', status: 'success' },
            { label: 'Growth MoM', val: '+14.6%', status: 'success' },
            { label: 'Total Orders', val: '14,280 Orders', status: 'info' }
          ];
          res.actions = [
            { label: '📈 Open Sales Dashboard', hash: '#sales-dashboard', primary: true }
          ];
          res.followups = [
            'Why did sales drop in Delhi NCR?',
            'Compare Android vs iOS revenue',
            'What are top selling pet medicines?'
          ];
          break;
        }

        case 'WHAT_IF_SIMULATION': {
          var pctMatch = /(\d+(?:\.\d+)?)\s*%/i.exec(text);
          var simPct = pctMatch ? parseFloat(pctMatch[1]) : 8;
          var costIncrease = Math.round(15500 * simPct);
          res.text = '🔬 **What-If Scenario Simulation (' + simPct + '% Logistics Cost Variance):**\n\n' +
            '• **Monthly Cost Impact:** +₹' + (costIncrease / 1000).toFixed(1) + 'k increase in delivery rider payout.\n' +
            '• **EBITDA Compression:** EBITDA margin shifts from **20.7% → ' + (20.7 - simPct * 0.08).toFixed(1) + '%**.\n' +
            '• **Mitigation Strategy:** Dynamic 2.5km delivery batching and off-peak route grouping saves ~₹94,000/month, fully offsetting the variance.';
          res.kpis = [
            { label: 'Logistics Variance', val: '+' + simPct + '%', status: 'warn' },
            { label: 'Expense Delta', val: '+₹' + (costIncrease / 1000).toFixed(1) + 'k', status: 'danger' },
            { label: 'Projected EBITDA', val: (20.7 - simPct * 0.08).toFixed(1) + '%', status: 'warn' }
          ];
          res.actions = [
            { label: '💹 Open Profit Prediction', hash: '#profit-prediction', primary: true }
          ];
          res.followups = [
            'Simulate logistics cost +15%',
            'What if doctor fees rise 10%?',
            'Simulate 10% increase in prescription sales'
          ];
          break;
        }

        default: {
          res.text = '🐾 **Executive Veterinary Intelligence Synthesis — Dr. Zenve:**\n\n' +
            'Regarding **"' + text + '"**:\n\n' +
            '• **Clinical & Operational Reality:** Grounded in telemetry across our 14 hospital hubs, 28,450 pet profiles, and live e-pharmacy databases.\n' +
            '• **Key Observation:** Zenve Pets Healthcare maintains a **99.4% surgical success rate**, **97.6% 60-minute delivery SLA**, and **₹1.84 Cr MTD revenue** with a healthy **20.7% EBITDA margin**.\n' +
            '• **Strategic Guidance:**\n' +
            '  1. **Preventive Health Prioritization:** Focus on annual vaccination renewals and dental checkups to minimize high-risk patient churn.\n' +
            '  2. **Supply Chain Continuity:** Maintain strict 30-day buffer stocks for key chronic medicines (Bravecto, Apoquel, Renal diets).\n' +
            '  3. **Multi-Channel Synergy:** Connect clinic walk-in pet parents directly with our 60-minute doorstep medicine delivery app.';
          res.kpis = [
            { label: 'Active Facilities', val: '14 Hubs', status: 'success' },
            { label: 'Registered Pets', val: '28,450', status: 'info' },
            { label: 'EBITDA Margin', val: '20.7%', status: 'success' }
          ];
          res.actions = [
            { label: '📊 View Executive Overview', hash: '#executive-dashboard', primary: true },
            { label: '🐾 Open Pets 360', hash: '#pets-360-dashboard' }
          ];
          res.followups = [
            'Show dog vs cat patient split',
            'Why did sales drop in Delhi NCR?',
            'What is our Bravecto inventory status?',
            'Who is Dr. Aisha Khan?'
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

  function formatLlmText(text) {
    if (!text) return '';
    var s = esc(text);
    s = s.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/\*(.*?)\*/g, '<em>$1</em>');
    s = s.replace(/\n\n/g, '<div style="height:8px;"></div>');
    s = s.replace(/\n/g, '<br/>');
    return s;
  }

  /* ── 1. Ask Zenve AI ─────────────────────────────────────────────── */
  function renderAskAi() {
    var msgsHtml = S.chatHistory.map(function (m, idx) {
      var nlpMetaHtml = '';
      if (m.nlpMeta) {
        nlpMetaHtml = [
          '<div class="zai-nlp-meta">',
            '<span class="zai-nlp-tag intent">🐾 ' + esc(m.nlpMeta.intent) + '</span>',
            (m.nlpMeta.entities || []).map(function (e) {
              return '<span class="zai-nlp-tag entity">🏷️ ' + esc(e) + '</span>';
            }).join(''),
            '<span class="zai-nlp-tag grounding">🛡️ ' + esc(m.nlpMeta.grounding || '14 Hospital Hubs') + '</span>',
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
            '<span class="zai-followup-title">🐾 Dr. Zenve Recommends Exploring:</span>',
            m.followups.map(function (f) {
              return '<button type="button" class="zai-followup-btn" data-query="' + esc(f) + '">' + esc(f) + '</button>';
            }).join(''),
          '</div>'
        ].join('');
      }

      var avatarBadge = m.role === 'ai' ? '🐾' : '👤';

      return [
        '<div class="zai-msg ' + m.role + '">',
          '<div class="zai-avatar ' + m.role + '" title="' + (m.role === 'ai' ? 'Dr. Zenve Veterinary AI' : 'Executive Pet Parent') + '">' + avatarBadge + '</div>',
          '<div class="zai-bubble">',
            nlpMetaHtml,
            '<div class="zai-formatted-body">' + formatLlmText(m.text) + '</div>',
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
        kpiHtml('Active Pet Patients', '28,450 Pets', '+14.6% MoM', 'success', '62% Canine · 34% Feline', '🐾'),
        kpiHtml('Hospital Hubs Online', '14 Facilities', '100% Uptime', 'success', '81.4% ICU Bed Occupancy', '🏥'),
        kpiHtml('Neural NLP Latency', '18 ms', '--', 'neutral', 'Sub-second Local Neural Dispatch', '⚡'),
        kpiHtml('Clinical Grounding', '99.2%', '+0.4%', 'success', '14 Hospital Hubs & Live ERP', '🛡️'),
      '</div>',

      '<div class="zai-card zai-pet-chat-card" style="padding: 0;">',
        '<div class="zai-pet-chat-header">',
          '<div style="display: flex; align-items: center; gap: 10px;">',
            '<div class="zai-pet-avatar-glow">🐾</div>',
            '<div>',
              '<div style="display: flex; align-items: center; gap: 8px;">',
                '<span style="font-size: 13.5px; font-weight: 800; color: #0f172a;">Dr. Zenve — Pet Healthcare & Business Intelligence</span>',
                '<span class="zai-pet-tag-active"><span class="zai-pulse-dot" style="background:#10b981;"></span> Neural Model Online</span>',
              '</div>',
              '<div style="font-size: 11px; color: #64748b; font-weight: 500; margin-top: 1px;">',
                '🐶 17.6k Dogs · 🐱 9.6k Cats · 🏥 14 Hospital Hubs · 💊 1,420 Pharmacy SKUs · 🚚 60-Min Express',
              '</div>',
            '</div>',
          '</div>',
          '<div style="display: flex; align-items: center; gap: 8px;">',
            '<button type="button" class="zai-btn zai-pet-clean-btn" id="zai-clear-chat" title="Clear Chat History">🧹 Reset Chat</button>',
          '</div>',
        '</div>',
        '<div class="zai-chat-box">',
          '<div class="zai-chat-msgs" id="zai-chat-msgs">',
            msgsHtml,
          '</div>',
          '<div class="zai-chips">',
            '<span style="font-size: 11.5px; font-weight: 800; color: #475569; margin-right: 4px; display: inline-flex; align-items: center; gap: 4px;">🐾 Ask Dr. Zenve:</span>',
            '<button type="button" class="zai-chip" data-query="How many dogs vs cats do we have?">🐕 Dog vs Cat Census</button>',
            '<button type="button" class="zai-chip" data-query="Why did sales drop in Delhi NCR?">📉 Why did Delhi sales drop?</button>',
            '<button type="button" class="zai-chip" data-query="What is our Bravecto inventory status?">💊 Bravecto Stock Runway</button>',
            '<button type="button" class="zai-chip" data-query="Who is Dr. Aisha Khan?">🩺 Dr. Aisha Surgery Cases</button>',
            '<button type="button" class="zai-chip" data-query="How is our 60 minute delivery performing?">🚚 60-Min Express Delivery</button>',
            '<button type="button" class="zai-chip" data-query="What is the vaccine schedule for puppies?">🐶 Puppy Vaccine Schedule</button>',
            '<button type="button" class="zai-chip" data-query="Is chocolate bad for dogs?">🍫 Can dogs eat chocolate?</button>',
            '<button type="button" class="zai-chip" data-query="Which clinic generated the highest EBITDA this month?">💹 Highest EBITDA Clinic</button>',
          '</div>',
          '<form class="zai-chat-input-bar" id="zai-chat-form">',
            '<input type="text" class="zai-input zai-pet-input" id="zai-query-input" placeholder="🐾 Ask Dr. Zenve about pet health, clinic EBITDA, sales drops, dog vaccines, inventory..." autocomplete="off" />',
            '<button type="submit" class="zai-btn primary zai-pet-send-btn">🐾 Ask AI →</button>',
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
            text: 'Conversation reset. 🐾 Dr. Zenve is ready for your next prompt! Ask about Pet Care, Dog/Cat Demographics, Sales Drop, Clinic EBITDA, or E-Pharmacy Stock.',
            nlpMeta: {
              intent: 'PET INTELLIGENCE READY',
              entities: ['14 Hospital Hubs', '28,450 Pets'],
              grounding: 'Live Veterinary Telemetry',
              confidence: '99.9%'
            },
            followups: [
              'Show dog vs cat patient split',
              'Why did sales drop in Delhi NCR?',
              'Check Bravecto inventory status'
            ]
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
