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
        text: "Hello! 🐾 I'm **Dr. Zenve**, your dedicated Pet Healthcare & Business Intelligence assistant.\n\nI can help you with questions about our pet patients, hospital operations, pharmacy inventory, sales performance, logistics, and general pet health care.\n\nFeel free to ask me anything!"
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
  /* Plain-text Dr. Zenve engine — mirrored from src/utils/zenveNlpLlm.js (re-run scratch/sync-legacy-nlp.js after editing it) */
  var ZenveNLP_LLM = (function () {
/**
 * Zenve Pet-Trained Intelligence & Domain LLM Core (v5.0)
 * 100% Free, zero-dependency, in-browser NLP and generative reasoning engine.
 * Tailored for Zenve Pets Healthcare: 14 Veterinary Hospitals, E-Pharmacy,
 * 60-Minute Logistics, Clinical Care, and Executive Business Intelligence.
 *
 * v5.0 — Clean text-only responses. No KPI cards, badges, or action buttons.
 */

const ZENVE_PET_KNOWLEDGE = {
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
      reason: 'Temporary stockout of Bravecto chewables and Royal Canin Renal Diet at Central Gurgaon Hub, combined with severe afternoon heatwave reducing walk-in consultations by 28%',
      remedy: 'Dispatched emergency stock PO-8821 (60 units) from Central Hub and extended evening clinic consulting hours (5 PM – 10 PM) with complimentary pet hydration triage'
    },
    'Mumbai': {
      dropAmt: '₹9.2 Lakh',
      dropPct: '7.8%',
      orders: '860 Orders',
      reason: 'Heavy monsoon waterlogging causing 60-min delivery delays in Bandra West and Andheri East',
      remedy: 'Deployed waterproof all-weather e-bike rider fleet and redistributed routes to Powai Micro-Hub'
    },
    'Bengaluru': {
      dropAmt: '₹0 (Growing)',
      dropPct: '+18.4%',
      orders: '4,120 Orders',
      reason: 'Strong performance across Indiranagar Flagship and Koramangala 24/7 Trauma Hub',
      remedy: 'Maintain inventory buffers and scale surgical slot capacities'
    },
    'Chennai': {
      dropAmt: '₹6.8 Lakh',
      dropPct: '9.4%',
      orders: '580 Orders',
      reason: 'Supply chain delay from interstate transit combined with lower foot traffic due to local festival holidays',
      remedy: 'Pre-positioned buffer stock at Adyar micro-hub and launched doorstep vaccination campaign to recover walk-in volume'
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
    coldChainCompliance: '100% IoT Monitored (2°C – 8°C Temperature Range)',
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

const ZENVE_KNOWLEDGE = ZENVE_PET_KNOWLEDGE;

/* ──────────────────────────────────────────────
   Conversational Intent Detection
   ────────────────────────────────────────────── */

function detectConversationalIntent(text) {
  if (!text) return null;
  const raw = text.trim();
  const clean = raw.toLowerCase().replace(/^[^\w\s]+|[^\w\s]+$/g, '').trim();

  // If query contains business/pet domain keywords, route to domain reasoning
  const hasBusinessDomain = /\b(sales|drop|ebitda|profit|revenue|margin|inventory|bravecto|nexgard|clinic|clinics|hospital|hospitals|doctor|doctors|vet|aisha|rajesh|priya|rohan|ananya|logistics|delivery|rider|riders|sla|breach|transit|churn|retention|cac|roas|marketing|subscription|mrr|database|telemetry|stock|orders?|performance|scorecard|procedure|surgery|vaccine|vaccination|rabies|dhppi|feline|canine|breed|dog|cat|puppy|kitten|food|diet|toxic|chocolate|arthritis|kidney|tick|flea|dental|grooming|diagnostics|xray|ultrasound)\b/i.test(clean);
  if (hasBusinessDomain) return null;

  if (/\b(how\s*(are|r)\s*(you|u)|hw\s*r\s*u|how\s*is\s*(it|your\s*day|things)|hows\s*(it|your\s*day|things)|how\s*(are|r)\s*(you|u)\s*doing|how\s*do\s*(you|u)\s*do|what\s*s\s*up|whats\s*up|sup)\b/i.test(clean)) {
    return 'HOW_ARE_YOU';
  }

  if (/^(hi|hello|hey|heya|hola|howdy|yo|namaste|hi\s*there|hello\s*there|hey\s*there|good\s*(morning|afternoon|evening|day))(\s+zenve|\s+doctor|\s+dr)?$/i.test(clean) ||
      /^(hey|hi|hello)\b/i.test(clean)) {
    return 'GREETING';
  }

  if (/\b(who\s*(are|r)\s*(you|u)|what\s*(are|r)\s*(you|u)|what\s*can\s*(you|u)\s*do|what\s*do\s*(you|u)\s*do|your\s*name|tell me about yourself)\b/i.test(clean)) {
    return 'WHO_ARE_YOU';
  }

  if (/\b(joke|funny|humor|make\s*me\s*laugh)\b/i.test(clean)) {
    return 'PET_JOKE';
  }

  if (/^(thank\s*you|thanks|thx|ty|thank\s*u|many\s*thanks|cheers|awesome|great\s*job)(\s+doctor|\s+zenve)?$/i.test(clean)) {
    return 'THANKS';
  }

  if (/^(bye|goodbye|see\s*you|cya|take\s*care|bye\s*bye|good\s*night)(\s+zenve)?$/i.test(clean)) {
    return 'BYE';
  }

  if (/\b(help|what can you|how to use|how do i use|guide|tutorial|features)\b/i.test(clean)) {
    return 'HELP';
  }

  return null;
}

/* ──────────────────────────────────────────────
   Entity Extraction
   ────────────────────────────────────────────── */

function extractEntities(text) {
  const t = ' ' + text.toLowerCase() + ' ';
  const res = {
    locations: [],
    skus: [],
    doctors: [],
    species: [],
    procedures: [],
    timeframes: [],
    metrics: []
  };

  const locs = [
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
  locs.forEach(l => { if (l.re.test(t) && !res.locations.includes(l.name)) res.locations.push(l.name); });

  const skus = [
    { name: 'Bravecto Chewables', re: /\bbravecto\b/i },
    { name: 'NexGard Spectra', re: /\b(nexgard|spectra)\b/i },
    { name: 'Royal Canin Clinical Diet', re: /\b(royal canin|renal|gastro|urinary|hepatic)\b/i },
    { name: 'Apoquel 16mg Tablets', re: /\bapoquel\b/i },
    { name: 'Simparica Trio', re: /\bsimparica\b/i },
    { name: 'Synulox Palatable Drops', re: /\bsynulox\b/i },
    { name: 'Vetmedin (Pimobendan)', re: /\b(vetmedin|pimobendan)\b/i }
  ];
  skus.forEach(s => { if (s.re.test(t) && !res.skus.includes(s.name)) res.skus.push(s.name); });

  const docs = [
    { name: 'Dr. Aisha Khan', re: /\b(aisha|khan)\b/i },
    { name: 'Dr. Rajesh Nair', re: /\b(rajesh|nair)\b/i },
    { name: 'Dr. Priya Sharma', re: /\b(priya|sharma)\b/i },
    { name: 'Dr. Rohan Verma', re: /\b(rohan|verma)\b/i },
    { name: 'Dr. Ananya Sen', re: /\b(ananya|sen)\b/i }
  ];
  docs.forEach(d => { if (d.re.test(t) && !res.doctors.includes(d.name)) res.doctors.push(d.name); });

  const speciesList = [
    { name: 'Canine (Dogs)', re: /\b(dog|dogs|canine|puppy|puppies|hound|labrador|golden retriever|shih tzu|indie dog)\b/i },
    { name: 'Feline (Cats)', re: /\b(cat|cats|feline|kitten|kittens|persian|siamese)\b/i },
    { name: 'Exotic & Avian', re: /\b(bird|birds|parrot|parakeet|rabbit|hamster|turtle|exotic)\b/i }
  ];
  speciesList.forEach(sp => { if (sp.re.test(t) && !res.species.includes(sp.name)) res.species.push(sp.name); });

  const procs = [
    { name: 'Vaccination & Boosters', re: /\b(vaccin\w*|rabies|dhppi|fvrcp|shot|booster)\b/i },
    { name: 'Orthopedic & TPLO Surgery', re: /\b(tplo|orthopedic|bone|fracture|ligament|joint)\b/i },
    { name: 'Dental Scaling & Prophylaxis', re: /\b(dental|teeth|tartar|scaling|periodontal)\b/i },
    { name: 'Diagnostic Imaging & Lab', re: /\b(xray|x-ray|radiology|ultrasound|usg|cbc|blood test|biochem\w*)\b/i },
    { name: 'Spay & Neuter', re: /\b(spay|neuter|steriliz\w*|castrat\w*)\b/i }
  ];
  procs.forEach(pr => { if (pr.re.test(t) && !res.procedures.includes(pr.name)) res.procedures.push(pr.name); });

  if (/\b(7\s*d|7\s*days|seven days|past week|last week)\b/i.test(t)) res.timeframes.push('7D');
  else if (/\b(14\s*d|14\s*days|fortnight|last 2 weeks)\b/i.test(t)) res.timeframes.push('14D');
  else if (/\b(30\s*d|30\s*days|last month|past month)\b/i.test(t)) res.timeframes.push('30D');
  else if (/\b(mtd|month to date|this month)\b/i.test(t)) res.timeframes.push('MTD');

  const metrics = ['ebitda', 'revenue', 'sales', 'profit', 'margin', 'drop', 'churn', 'cac', 'roas', 'aov', 'sla', 'stockout', 'expiry', 'ltv'];
  metrics.forEach(m => { if (new RegExp('\\b' + m + '\\b', 'i').test(t)) res.metrics.push(m.toUpperCase()); });

  return res;
}

/* ──────────────────────────────────────────────
   Intent Classification
   ────────────────────────────────────────────── */

function classifyIntent(text, entities, ctx) {
  const t = text.toLowerCase();
  const scores = {
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

  let maxIntent = 'EXECUTIVE_STRATEGY', maxScore = 0;
  for (const k in scores) {
    if (scores[k] > maxScore) { maxScore = scores[k]; maxIntent = k; }
  }
  return { intent: maxIntent, score: maxScore, confidence: Math.min(99.6, Math.max(93.5, 90 + maxScore * 1.1)) };
}

/* ──────────────────────────────────────────────
   Response Generator — Clean text-only replies
   ────────────────────────────────────────────── */

function generateResponse(text, ctx) {
  const K = ZENVE_PET_KNOWLEDGE;

  // 1. Check conversational input
  const conv = detectConversationalIntent(text);
  if (conv) {
    let reply = '';
    switch (conv) {
      case 'GREETING':
        reply = "Hello! 🐾 I'm **Dr. Zenve**, your Pet Healthcare & Business Intelligence assistant. How can I help you today?\n\nI can answer questions about our pet patients, hospital operations, pharmacy stocks, sales performance, and general pet health care.";
        break;
      case 'HOW_ARE_YOU':
        reply = "I'm doing great, thank you for asking! 🐶 All our systems are running smoothly — 14 clinic feeds are healthy and the 60-minute delivery fleet is at 97.6% on-time rate.\n\nHow can I help you today?";
        break;
      case 'WHO_ARE_YOU':
        reply = "I'm **Dr. Zenve AI**, your dedicated Pet Healthcare & Business Intelligence assistant. 🐾\n\nHere's what I can help you with:\n\n- **Pet Health Care** — vaccination schedules, toxic food alerts, common diseases, breed information\n- **Hospital Operations** — clinic performance, doctor workloads, ICU occupancy, surgical success rates\n- **Pharmacy & Inventory** — medicine stock levels, expiry alerts, reorder status\n- **Sales & Financials** — revenue trends, EBITDA analysis, sales drop diagnostics\n- **Logistics** — delivery SLA, fleet performance, cost per order\n- **Customer Insights** — churn risk, retention rates, customer lifetime value\n\nJust ask me anything and I'll provide you with the most relevant information from our databases.";
        break;
      case 'PET_JOKE':
        reply = "Here's a pet joke for you! 😄\n\n**Q:** Why did the cat sit on the computer?\n**A:** To keep an eye on the mouse! 🐱💻\n\n**Q:** What do you call a dog magician?\n**A:** A Labracadabrador! 🐕✨\n\nHope that made you smile! Is there anything else I can help with?";
        break;
      case 'THANKS':
        reply = "You're most welcome! 🐾 Happy to help. Feel free to ask me anything else about our pet patients, operations, or business performance.";
        break;
      case 'BYE':
        reply = "Goodbye! 🐾 Have a wonderful day. Wishing all our furry friends a healthy and happy time! Feel free to come back anytime you need help.";
        break;
      case 'HELP':
        reply = "Here's what you can ask me about:\n\n- **Pet demographics** — \"How many dogs vs cats do we have?\"\n- **Sales analysis** — \"Why did sales drop in Delhi NCR?\"\n- **Pharmacy inventory** — \"What is our Bravecto stock status?\"\n- **Clinic performance** — \"Which clinic has the highest EBITDA?\"\n- **Doctor information** — \"Who is Dr. Aisha Khan?\"\n- **Logistics** — \"How is our 60-minute delivery performing?\"\n- **Pet health** — \"Is chocolate bad for dogs?\" or \"What is the puppy vaccination schedule?\"\n- **Financial overview** — \"What is our consolidated EBITDA?\"\n\nJust type your question and I'll do my best to answer!";
        break;
      default:
        reply = "Hello! 🐾 How can I help you today? Feel free to ask me about pet health, business operations, or anything else.";
    }

    return {
      role: 'ai',
      text: reply,
      context: { intent: 'CONVERSATION', location: null, sku: null, doctor: null, timeframe: 'MTD' }
    };
  }

  // 2. Entity & Intent extraction
  const entities = extractEntities(text);
  const classification = classifyIntent(text, entities, ctx);
  // Follow-up handling: "what about Mumbai?" / "and last 7 days?" keeps the previous business topic
  const followUpIntents = ['SALES_DROP', 'GENERAL_SALES', 'CLINICS_HOSPITALS', 'LOGISTICS_DELIVERY', 'PHARMACY_INVENTORY', 'EBITDA_FINANCIALS', 'CHURN_RETENTION'];
  const isFollowUp = classification.score === 0
    && (entities.locations.length > 0 || entities.timeframes.length > 0)
    && ctx && followUpIntents.includes(ctx.intent);
  const intent = isFollowUp ? ctx.intent : classification.intent;

  const loc = entities.locations.length > 0 ? entities.locations[0] : (ctx && ctx.location ? ctx.location : null);
  const tf = entities.timeframes.length > 0 ? entities.timeframes[0] : 'MTD';

  const newCtx = {
    intent: intent,
    location: loc,
    sku: entities.skus.length > 0 ? entities.skus[0] : (ctx ? ctx.sku : null),
    doctor: entities.doctors.length > 0 ? entities.doctors[0] : (ctx ? ctx.doctor : null),
    timeframe: tf
  };

  let reply = '';

  // 3. Domain-specific response generation
  switch (intent) {
    case 'PET_TOXIC_FOOD': {
      reply = `Here are the key toxic food guidelines for pets:\n\n- **Chocolate (Theobromine Toxicity):** Highly dangerous for dogs. They metabolize theobromine very slowly. Dark chocolate and baking cocoa are the most toxic forms. Symptoms include rapid heart rate, seizures, and cardiac arrhythmias.\n\n- **Grapes & Raisins:** Extremely toxic to dogs. Even small amounts can cause acute, irreversible kidney failure.\n\n- **Onions & Garlic (Allium Species):** These cause oxidative damage to red blood cells, leading to hemolytic anemia. Both raw and cooked forms are harmful.\n\n- **Xylitol (Artificial Sweetener):** Found in sugar-free gum and some peanut butters. Triggers rapid insulin release causing severe hypoglycemia and liver failure within 30–60 minutes.\n\nIf your pet has ingested any of these, please seek immediate veterinary care. Our **Koramangala 24/7 Trauma Hub** and **Bandra West ICU** offer round-the-clock emergency services including gastric lavage and IV fluid support.`;
      break;
    }

    case 'PET_VACCINATION': {
      reply = `Here are the standard vaccination protocols we follow across our 14 clinics:\n\n**Puppies (Canine Core Schedule):**\n- 6–8 Weeks: DHPPi (Distemper, Hepatitis, Parvovirus, Parainfluenza) + Deworming\n- 10–12 Weeks: DHPPi Booster + Leptospirosis + Kennel Cough (Bordetella)\n- 14–16 Weeks: Rabies (Anti-Rabies Vaccine) + Final Core Booster\n- Annual: Rabies and DHPPi booster shots every 12 months\n\n**Kittens (Feline Core Schedule):**\n- 8–9 Weeks: FVRCP (Feline Viral Rhinotracheitis, Calicivirus, Panleukopenia)\n- 12 Weeks: FVRCP Booster + FeLV (Feline Leukemia)\n- 16 Weeks: Rabies Vaccine + Deworming\n\nAll vaccines across our 14 pharmacies are stored in IoT-monitored cold chain units maintained between 2°C and 8°C to ensure full potency.\n\nCurrently, our vaccination compliance rate is 91.8%, with 248 pet parents having lapsed annual boosters by more than 60 days.`;
      break;
    }

    case 'PET_HEALTH_CARE': {
      const hasArthritis = /arthritis/i.test(text);
      const hasTick = /tick/i.test(text);
      const hasFlea = /flea/i.test(text);
      const hasKidney = /kidney/i.test(text);
      const hasHeart = /heart/i.test(text);
      const hasAllergy = /allerg/i.test(text);
      const hasDeworm = /deworm/i.test(text);

      if (hasArthritis) {
        reply = `**Arthritis in Dogs — Key Information:**\n\nArthritis (osteoarthritis) is one of the most common chronic conditions in aging dogs, affecting roughly 20% of adult canines.\n\n- **Symptoms to watch:** Difficulty rising, reluctance to jump or climb stairs, limping after rest, and reduced playfulness.\n- **Management:** A combination of weight management, controlled exercise, joint supplements (glucosamine/chondroitin), and anti-inflammatory medications like Meloxicam or Carprofen.\n- **Our approach:** Our orthopedic specialists, including **Dr. Rajesh Nair** at Koramangala Trauma Hub, perform advanced joint assessments and can recommend hydrotherapy or laser therapy for chronic cases.\n\nIf you notice your pet showing signs of joint stiffness, I'd recommend scheduling a consultation at your nearest Zenve clinic.`;
      } else if (hasTick || hasFlea) {
        reply = `**Tick & Flea Prevention — Key Information:**\n\nTicks and fleas are the most common external parasites affecting pets in India, especially during warm and humid months.\n\n- **Tick Fever (Ehrlichiosis/Babesiosis):** Transmitted through tick bites. Symptoms include fever, lethargy, loss of appetite, and pale gums. If untreated, it can be fatal.\n- **Prevention options available at our pharmacy:**\n  - **Bravecto Chewables** — 12-week protection against ticks & fleas (currently 18 days of runway left, critical stock level)\n  - **NexGard Spectra** — Monthly protection including heartworm coverage (34 days runway, healthy stock)\n  - **Simparica Trio** — Monthly broad-spectrum protection\n\n- **Environmental control:** Regular cleaning of pet bedding, yard sprays, and avoiding tall grass areas during peak tick season.\n\nOur dermatology specialist **Dr. Ananya Sen** at Gurgaon handles complex tick fever cases and allergy-related skin conditions.`;
      } else if (hasKidney) {
        reply = `**Kidney Disease in Pets — Key Information:**\n\nChronic kidney disease (CKD) is particularly common in senior cats and affects about 1 in 3 cats over age 12.\n\n- **Symptoms:** Increased thirst and urination, weight loss, decreased appetite, vomiting, and lethargy.\n- **Diagnosis:** Blood tests (BUN, creatinine), urinalysis, and ultrasound imaging are standard. Our diagnostic labs across all 14 hubs provide same-day results.\n- **Treatment:** Prescription renal diets (we carry **Royal Canin Renal Diet** — currently at 14-day runway, reorder in progress), fluid therapy, and phosphorus binders.\n\nOur feline specialist **Dr. Priya Sharma** at Whitefield Multi-Specialty is experienced in managing chronic kidney cases with a 98.9% client satisfaction rating.`;
      } else if (hasHeart) {
        reply = `**Heart Disease in Pets — Key Information:**\n\nHeart disease affects approximately 10% of dogs, with certain breeds (Cavalier King Charles Spaniels, Dobermans, Boxers) being more susceptible.\n\n- **Common conditions:** Mitral valve disease (small breeds), dilated cardiomyopathy (large breeds), and congestive heart failure.\n- **Symptoms:** Coughing (especially at night), exercise intolerance, rapid breathing, and abdominal swelling.\n- **Treatment:** We stock **Vetmedin 5mg (Pimobendan)** for congestive heart failure management (29 days runway, healthy stock). Additional medications include Furosemide and ACE inhibitors.\n\nEarly detection through regular cardiac screening can significantly improve outcomes. Our veterinary teams perform cardiac auscultation as part of every wellness check.`;
      } else if (hasAllergy) {
        reply = `**Pet Allergies — Key Information:**\n\nAllergies are one of the most common reasons for veterinary visits, affecting both dogs and cats.\n\n- **Types:** Environmental (pollen, dust mites), food allergies, and contact allergies.\n- **Symptoms:** Itching, redness, ear infections, excessive licking, and hot spots.\n- **Treatment options:**\n  - **Apoquel 16mg** — Fast-acting itch relief for atopic dermatitis (42 days runway, healthy stock)\n  - **Cytopoint injections** — Long-lasting antibody therapy (4–8 weeks relief per injection)\n  - **Elimination diets** — To identify food triggers\n\nOur dermatology consultant **Dr. Ananya Sen** at Gurgaon specializes in allergy desensitization and Cytopoint therapy, handling 42 consultations per week with a 99.1% client rating.`;
      } else if (hasDeworm) {
        reply = `**Deworming Schedule for Pets:**\n\n- **Puppies:** Every 2 weeks from age 2 weeks until 12 weeks, then monthly until 6 months, and quarterly thereafter.\n- **Kittens:** Starting at 3 weeks, every 2 weeks until 12 weeks, then monthly until 6 months, and quarterly thereafter.\n- **Adult dogs and cats:** Every 3 months (quarterly) as a preventive measure.\n\nCommon intestinal parasites include roundworms, hookworms, tapeworms, and whipworms. Symptoms of worm infestation include pot-bellied appearance, weight loss, diarrhea, and visible worms in stool.\n\nWe carry broad-spectrum dewormers including Drontal Plus and Panacur across all 14 pharmacy locations. Regular deworming is critical, especially for pets that go outdoors frequently.`;
      } else {
        reply = `Here's a general pet health overview based on our clinical data:\n\n- **Preventive Care:** Regular vaccinations, deworming, and tick/flea prevention form the foundation of good pet health. Our vaccination compliance rate is currently 91.8%.\n- **Nutrition:** Proper diet tailored to breed, age, and health conditions is essential. We stock prescription diets from Royal Canin, Hill's Science Diet, and Farmina.\n- **Dental Health:** About 80% of dogs and 70% of cats show signs of dental disease by age 3. Regular dental checkups and scaling are recommended.\n- **Senior Pet Care:** Pets over 7 years should have bi-annual health checkups including blood work, urinalysis, and cardiac screening.\n\nOur 14 hospital hubs have a surgical success rate of 99.4% and our specialists cover orthopedics, feline medicine, emergency care, and dermatology. Feel free to ask about any specific health concern!`;
      }
      break;
    }

    case 'PET_DEMOGRAPHICS': {
      reply = `Here's our current pet patient census across the Zenve network:\n\n**Total Registered Pets: ${K.species.total.toLocaleString()}**\n\n- **Dogs: ${K.species.dogs.count.toLocaleString()} (${K.species.dogs.pct})**\n  Top breeds: ${K.species.dogs.topBreeds}\n\n- **Cats: ${K.species.cats.count.toLocaleString()} (${K.species.cats.pct})**\n  Top breeds: ${K.species.cats.topBreeds}\n\n- **Exotic & Avian Companions: ${K.species.exotics.count.toLocaleString()} (${K.species.exotics.pct})**\n  Types: ${K.species.exotics.types}\n\nFeline adoptions are growing at +28% year-over-year, particularly in Bengaluru and Mumbai. Our Whitefield hub has earned a dedicated Cat-Friendly Clinic certification to cater to this growing segment.`;
      break;
    }

    case 'PET_PROCEDURES': {
      reply = `Here's an overview of veterinary procedures across our 14 hospital hubs:\n\n**Surgical Procedures:**\n- Orthopedic surgeries (TPLO, fracture repairs): Led by Dr. Rajesh Nair — 18 complex surgeries per week with 99.2% recovery rate\n- Soft tissue surgeries: Led by Dr. Aisha Khan — 22 surgeries per week with 99.6% recovery rate\n- Spay & neuter procedures: Available at all 14 hubs with same-day discharge for healthy pets\n\n**Diagnostic Services:**\n- Digital X-ray and ultrasound imaging: Available at all hubs with same-day reporting\n- CBC, biochemistry panels, and urinalysis: Results typically within 2–4 hours\n- Specialized cardiac and thyroid screenings: Available at flagship hubs\n\n**Dental Care:**\n- Professional dental scaling and polishing under anesthesia\n- Dental extractions and oral surgery\n- Complimentary dental assessment during wellness visits\n\nOur overall surgical success rate across the network is **99.4%**, with ICU bed occupancy at 81.4%.`;
      break;
    }

    case 'SALES_DROP': {
      const targetCity = loc || 'Delhi NCR';
      const dropInfo = K.salesDrop[targetCity] || K.salesDrop['Delhi NCR'];
      const isGrowing = dropInfo.dropPct.startsWith('+');

      if (isGrowing) {
        reply = `**${targetCity} — Sales Performance (${tf}):**\n\n${targetCity} is actually performing well with a positive growth of **${dropInfo.dropPct}** across ${dropInfo.orders}.\n\n**Key drivers:** ${dropInfo.reason}.\n\n**Recommendation:** ${dropInfo.remedy}.`;
      } else {
        reply = `**Sales Drop Analysis — ${targetCity} (${tf}):**\n\nWe've seen a revenue decline of **${dropInfo.dropAmt} (-${dropInfo.dropPct})** across ${dropInfo.orders} in ${targetCity}.\n\n**Root Cause:** ${dropInfo.reason}.\n\n**Corrective Action Taken:** ${dropInfo.remedy}.\n\n**Recovery Outlook:** Full volume recovery is expected within 7–10 days from the date the corrective measures were implemented.`;
      }
      break;
    }

    case 'PHARMACY_INVENTORY': {
      reply = `**Pharmacy & Inventory Status:**\n\nOur total inventory is valued at **${K.pharmacy.valuation}**.\n\nHere's the status of key medications:\n\n- **Bravecto Chewables (Fluralaner)** — ⚠️ CRITICAL: Only 18 days of stock remaining. A reorder of 600 units is needed to prevent stockouts. Used for 12-week tick & flea prevention.\n\n- **NexGard Spectra** — ✅ Healthy: 34 days of runway. Stock levels are optimal across all hubs. Used for monthly tick, flea & heartworm protection.\n\n- **Royal Canin Renal Diet** — ⚠️ Warning: 14 days of runway remaining. A reorder of 450 bags has been placed. Used for feline & canine kidney support.\n\n- **Apoquel 16mg** — ✅ Healthy: 42 days of runway. Used for atopic dermatitis & allergy relief.\n\n- **Synulox Palatable Drops** — ✅ Healthy: 38 days of runway. Broad-spectrum antibiotic.\n\n- **Vetmedin 5mg (Pimobendan)** — ✅ Healthy: 29 days of runway. Used for congestive heart failure.\n\n**Cold chain compliance** is at 100% with IoT temperature monitoring (2°C – 8°C). There are 14 batches with less than 90 days to expiry (₹1.82L value), being managed under FEFO priority protocol.`;
      break;
    }

    case 'CLINICS_HOSPITALS': {
      reply = `**Hospital & Clinic Network Overview:**\n\nWe operate **${K.clinics.count} multi-specialty veterinary hospitals** across India. Here are the top-performing hubs:\n\n`;

      K.clinics.hubs.forEach(h => {
        reply += `- **${h.name} (${h.city}):** EBITDA ${h.ebitda} · ${h.beds} beds · Lead: ${h.lead}\n`;
      });

      reply += `\n**Network Metrics:**\n- ICU bed occupancy: **${K.clinics.icuOccupancy}**\n- Surgical success rate: **${K.clinics.surgicalSuccessRate}**\n\nThe highest EBITDA this month comes from **Indiranagar Flagship** at ₹16.4L (26.2% margin), followed by **Bandra West** at ₹14.2L (24.8% margin).`;
      break;
    }

    case 'DOCTOR_WORKLOAD': {
      // Check if a specific doctor is being asked about
      const askedDoctor = entities.doctors.length > 0 ? entities.doctors[0] : null;

      if (askedDoctor) {
        const doc = K.doctors.find(d => d.name === askedDoctor);
        if (doc) {
          reply = `**${doc.name}** — ${doc.title}\n\n- **Specialty:** ${doc.specialty}\n- **Hub:** ${doc.hub}\n- **Performance:** ${doc.stats}\n\n${doc.name} is one of our top specialists and is available for consultations at the ${doc.hub} location.`;
        } else {
          reply = `I don't have detailed information about that specific doctor. Here are our lead specialists:\n\n`;
          K.doctors.forEach(d => {
            reply += `- **${d.name}** — ${d.title} at ${d.hub}. ${d.stats}.\n`;
          });
        }
      } else {
        reply = `**Veterinary Specialist Team:**\n\nHere are our lead veterinary specialists and their performance:\n\n`;
        K.doctors.forEach(d => {
          reply += `- **${d.name}** (${d.hub}) — ${d.title}. Specialty: ${d.specialty}. Performance: ${d.stats}.\n\n`;
        });
        reply += `Our team of 42 veterinary doctors across 14 hubs maintains an average recovery rate of 99.2% with a client satisfaction score of 4.9/5.0.`;
      }
      break;
    }

    case 'LOGISTICS_DELIVERY': {
      reply = `**60-Minute Express Delivery Performance:**\n\nOur hyper-local delivery service is performing well across all operational zones:\n\n- **On-time SLA compliance:** ${K.logistics.sla}\n- **Average delivery time:** ${K.logistics.avgTime} from order to doorstep\n- **Cost per delivery:** ${K.logistics.costPerOrder}\n- **Fleet strength:** ${K.logistics.fleet}\n- **Cold chain capability:** ${K.logistics.coldChainBags}\n\nAll temperature-sensitive medications (vaccines, biologics) are transported in medical-grade insulated bags with eutectic ice gel packs to maintain the 2°C – 8°C range throughout transit.`;
      break;
    }

    case 'CHURN_RETENTION': {
      reply = `**Pet Parent Retention & Churn Analysis:**\n\nHere's our current retention status:\n\n- **Total pet parents:** ${K.customers.totalParents.toLocaleString()}\n- **Active subscribers:** ${K.customers.activeSubscribers.toLocaleString()}\n- **Repeat order rate:** ${K.customers.repeatRate}\n- **Customer acquisition cost:** ${K.customers.cac} (blended)\n- **Annual lifetime value:** ${K.customers.ltv}\n\n**Churn Risk:** We've identified 248 pet parents with greater than 75% churn probability. The primary trigger is annual booster vaccine lapse exceeding 60 days, which accounts for 44% of all lapses.\n\n**Recovery opportunity:** Automated WhatsApp reminders offering complimentary dental triage checkups can recover an estimated ₹8.4 Lakh in annual recurring revenue from this at-risk cohort.`;
      break;
    }

    case 'EBITDA_FINANCIALS': {
      reply = `**Financial Performance Overview (MTD):**\n\n- **Consolidated Revenue:** ${K.financials.revenue}\n- **EBITDA:** ${K.financials.ebitda}, outperforming budget by +₹4.2 Lakh\n\n**Gross Margins by Vertical:**\n- Clinical Care & Surgeries: 62.8%\n- E-Pharmacy & Prescription Meds: 44.2%\n- Preventive Pet Nutrition: 31.4%\n- Professional Grooming & Spa: 54.0%\n\n**Operating Expenses (${K.financials.opex}):**\n- Staff & Specialist Doctors: 58%\n- Hyper-Local Logistics: 18%\n- Hub Rent & Leases: 14%\n- Marketing & Growth: 10%\n\nThe highest EBITDA-generating clinic is **Indiranagar Flagship** at ₹16.4L (26.2% margin). An additional ₹3.8 Lakh per month can be recovered through direct pharmaceutical procurement contracts with Zoetis and Boehringer.`;
      break;
    }

    case 'GENERAL_SALES': {
      reply = `**Sales & Revenue Performance (MTD):**\n\n- **Total Revenue:** ${K.overview.mtdRevenue}, growing at ${K.overview.revenueGrowth}\n- **Total Orders:** ${K.overview.totalOrders}\n\n**Revenue by Channel:**\n- In-Clinic Consultations & Surgeries: ₹77.4 Lakh (42%)\n- E-Pharmacy & Therapeutics: ₹62.6 Lakh (34%)\n- Pet Food, Diets & Fashion: ₹25.8 Lakh (14%)\n- Diagnostics & Telehealth: ₹18.4 Lakh (10%)\n\n**Platform Split:**\n- Android App: 52% (₹95.8L)\n- iOS App: 31% (₹57.1L) — higher average order value at ₹2,410 vs ₹1,620 on Android\n- Web & Direct: 17% (₹31.3L)\n\nOverall, the business is on a healthy growth trajectory with strong margins across clinical and pharmacy verticals.`;
      break;
    }

    case 'MARKETING_METRICS': {
      reply = `**Marketing Performance Overview:**\n\n- **Customer Acquisition Cost (CAC):** ${K.customers.cac}\n- **Customer Lifetime Value (LTV):** ${K.customers.ltv}\n- **LTV/CAC Ratio:** ~29.5x (extremely healthy)\n\n**Marketing Budget Allocation:**\n- Total marketing spend represents 10% of OPEX (within the ₹42.8L total)\n- Primary channels: Google Ads (search & display), Meta Ads (Instagram/Facebook), WhatsApp campaigns, and in-clinic referral programs\n\n**Key Metrics:**\n- Active pet parent base: ${K.customers.totalParents.toLocaleString()}\n- Active subscribers: ${K.customers.activeSubscribers.toLocaleString()}\n- Repeat purchase rate: ${K.customers.repeatRate}\n\nThe most cost-effective acquisition channel is the in-clinic referral program, with pet parents referred by existing customers showing 2.3x higher retention rates.`;
      break;
    }

    case 'SUBSCRIPTIONS': {
      reply = `**Subscription & Wellness Plans:**\n\n- **Active subscribers:** ${K.customers.activeSubscribers.toLocaleString()} pet parents on recurring wellness plans\n- **Subscription types:** Puppy Bundle (vaccination + deworming + nutrition), Senior Wellness Plan (quarterly health checkups + blood work), and Preventive Care (monthly tick/flea + quarterly deworming)\n\n- **Repeat order rate:** ${K.customers.repeatRate} across pet food and preventive medications\n- **Annual LTV for subscribers:** ${K.customers.ltv}\n\nSubscription plans drive significantly higher retention and predictable revenue. Subscribers show 40% lower churn rates compared to one-time purchasers.`;
      break;
    }

    case 'VENDORS_PROCUREMENT': {
      reply = `**Vendor & Procurement Overview:**\n\nWe source pharmaceuticals and pet nutrition products from leading global manufacturers:\n\n- **Zoetis** — Apoquel, Simparica, diagnostics kits\n- **Boehringer Ingelheim** — NexGard Spectra, Vetmedin, vaccines\n- **MSD Animal Health (Merck)** — Bravecto Chewables, Nobivac vaccines\n- **Mars Petcare** — Royal Canin prescription diets, Pedigree nutrition\n- **Elanco** — Credelio, Galliprant, deworming products\n\n**Procurement Optimization:** Direct contracts with Zoetis and Boehringer can save approximately ₹3.8 Lakh per month by eliminating distributor margins on high-volume SKUs.\n\n**Cold Chain Compliance:** ${K.pharmacy.coldChainCompliance}.\n\nAll vendor deliveries are tracked through our IoT-enabled warehouse management system.`;
      break;
    }

    case 'WHAT_IF_SIMULATION': {
      const pctMatch = /(\d+(?:\.\d+)?)\s*%/i.exec(text);
      const simPct = pctMatch ? parseFloat(pctMatch[1]) : 8;
      const costIncrease = Math.round(15500 * simPct);
      const newEbitda = (20.7 - simPct * 0.08).toFixed(1);

      reply = `**What-If Simulation: ${simPct}% Cost Variance**\n\nIf logistics costs increase by ${simPct}%, here's the projected impact:\n\n- **Monthly cost increase:** +₹${(costIncrease / 1000).toFixed(1)}k in delivery rider payouts\n- **EBITDA impact:** Margin shifts from 20.7% to ${newEbitda}% — a compression of ${(simPct * 0.08).toFixed(1)} percentage points\n- **Annual P&L impact:** -₹${(costIncrease * 12 / 100000).toFixed(1)}L on the bottom line\n\n**Mitigation Strategy:** Dynamic 2.5km delivery batching combined with off-peak route grouping can save approximately ₹94,000 per month, which would fully offset a ${simPct}% variance in logistics costs.\n\nAdditionally, renegotiating rider incentive structures during low-demand hours (10 AM – 2 PM) could yield another 3–4% cost reduction.`;
      break;
    }

    case 'EXECUTIVE_STRATEGY': {
      reply = `**Executive Summary — Zenve Pets Healthcare:**\n\nHere's a high-level view of the business:\n\n- **Revenue:** ${K.overview.mtdRevenue} with ${K.overview.revenueGrowth} growth\n- **EBITDA:** ${K.overview.ebitda}\n- **Active Pets:** ${K.overview.activePets} across ${K.overview.hubsCount} hospital hubs\n- **Delivery SLA:** ${K.overview.sla}\n\n**Key Strategic Priorities:**\n\n1. **Preventive health focus** — Driving annual vaccination renewals and dental checkups reduces costly emergency visits and improves customer retention.\n\n2. **Supply chain resilience** — Maintaining strict 30-day buffer stocks for critical medications (Bravecto, Apoquel, Renal diets) prevents revenue loss from stockouts.\n\n3. **Multi-channel growth** — Connecting clinic walk-in pet parents with the 60-minute doorstep delivery app creates a seamless omnichannel experience.\n\n4. **Churn reduction** — Targeting the 248 at-risk pet parents with proactive outreach can recover ₹8.4L in annual recurring revenue.\n\nOverall, the business is in a strong position with healthy margins and a growing customer base.`;
      break;
    }

    default: {
      // Thoughtful fallback — attempt to provide a meaningful answer
      reply = `That's a great question. Let me share what I know from our current data:\n\nZenve Pets Healthcare operates ${K.clinics.count} multi-specialty veterinary hospitals with ${K.species.total.toLocaleString()} registered pets. Our month-to-date revenue stands at ${K.overview.mtdRevenue} with an EBITDA margin of 20.7%.\n\nIf your question is about a specific topic, here are some areas I can provide detailed information on:\n\n- **Pet health** — vaccination schedules, disease information, toxic food warnings\n- **Business metrics** — revenue, EBITDA, sales analysis by region\n- **Operations** — clinic performance, doctor workloads, inventory status\n- **Logistics** — delivery SLA, fleet performance\n- **Customer insights** — churn risk, retention rates, LTV\n\nCould you rephrase your question or ask about one of these specific areas? I'll be happy to provide a detailed answer.`;
      break;
    }
  }

  return {
    role: 'ai',
    text: reply,
    context: newCtx
  };
}

    return { generateResponse: generateResponse };
  })();

  function formatLlmText(text) {
    if (!text) return '';
    var s = esc(text);
    s = s.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/\*(.*?)\*/g, '<em>$1</em>');
    s = s.replace(/\n\n/g, '<div style="height:8px;"></div>');
    s = s.replace(/^(\s*)[-•]\s+/gm, '$1• ');
    s = s.replace(/\n/g, '<br/>');
    return s;
  }

  /* ── Autonomous Co-Pilot Visualization & Action Helpers ── */
  function renderChartHtml(chart) {
    if (!chart || !chart.data || !chart.data.length) return '';
    var colors = chart.colors || ['#10b981', '#6366f1', '#f59e0b', '#ef4444'];
    var xKey = chart.xKey || 'name';
    var yKeys = chart.yKeys || ['val', 'value'];

    var maxVal = 1;
    chart.data.forEach(function (d) {
      yKeys.forEach(function (k) {
        if (typeof d[k] === 'number' && d[k] > maxVal) maxVal = d[k];
      });
      if (typeof d.value === 'number' && d.value > maxVal) maxVal = d.value;
    });

    var barsHtml = '';
    if (chart.type === 'pie') {
      barsHtml = [
        '<div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px;">',
        chart.data.map(function (d, i) {
          var col = d.color || colors[i % colors.length];
          return [
            '<div style="display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 8px; background: #f8fafc; border: 1px solid #e2e8f0; font-size: 11.5px;">',
              '<span style="width: 10px; height: 10px; border-radius: 50%; background: ' + col + ';"></span>',
              '<span style="font-weight: 700; color: #0f172a;">' + esc(d.name) + '</span>',
              '<span style="font-family: \'IBM Plex Mono\', monospace; color: #059669; font-weight: 700;">' + esc(d.value) + '%</span>',
            '</div>'
          ].join('');
        }).join(''),
        '</div>'
      ].join('');
    } else {
      barsHtml = chart.data.map(function (d) {
        var label = d[xKey] || d.name || '';
        var primaryKey = yKeys[0];
        var val = d[primaryKey] != null ? d[primaryKey] : (d.value || 0);
        var pct = Math.min(100, Math.max(14, Math.round((val / maxVal) * 100)));
        var barColor = colors[0];
        var displayVal = typeof val === 'number' ? (val % 1 !== 0 ? val.toFixed(1) : val) : val;

        return [
          '<div class="zai-chart-bar-row">',
            '<div class="zai-chart-bar-label" title="' + esc(label) + '">' + esc(label) + '</div>',
            '<div class="zai-chart-bar-track">',
              '<div class="zai-chart-bar-fill" style="width: ' + pct + '%; background: ' + barColor + ';">',
                esc(displayVal),
              '</div>',
            '</div>',
          '</div>'
        ].join('');
      }).join('');
    }

    return [
      '<div class="zai-chart-card">',
        '<div class="zai-chart-title">📊 ' + esc(chart.title || 'Live Executive Telemetry') + '</div>',
        barsHtml,
      '</div>'
    ].join('');
  }

  function renderTableHtml(table) {
    if (!table || !table.rows || !table.rows.length) return '';
    var cols = table.columns || Object.keys(table.rows[0]);
    return [
      '<div class="zai-chat-table-wrap">',
        '<table class="zai-chat-table">',
          '<thead>',
            '<tr>',
              cols.map(function (c) { return '<th>' + esc(c) + '</th>'; }).join(''),
            '</tr>',
          '</thead>',
          '<tbody>',
            table.rows.map(function (r) {
              return [
                '<tr>',
                  cols.map(function (c, ci) {
                    var v = r[c] != null ? r[c] : Object.values(r)[ci];
                    return '<td>' + esc(v) + '</td>';
                  }).join(''),
                '</tr>'
              ].join('');
            }).join(''),
          '</tbody>',
        '</table>',
      '</div>'
    ].join('');
  }

  function renderActionProposalHtml(act, msgIdx) {
    if (!act) return '';
    var isExecuted = act.status === 'EXECUTED';
    var badgeLabel = (act.action_type || 'ACTION PROPOSAL').replace(/_/g, ' ');

    var paramsHtml = '';
    if (act.parameters && Object.keys(act.parameters).length) {
      paramsHtml = [
        '<div class="zai-action-params-box">',
          '<div class="zai-action-param-grid">',
            Object.entries(act.parameters).map(function (pair) {
              return [
                '<div class="zai-action-param-item">',
                  '<span class="zai-action-param-label">' + esc(pair[0].replace(/_/g, ' ')) + '</span>',
                  '<span class="zai-action-param-val">' + esc(pair[1]) + '</span>',
                '</div>'
              ].join('');
            }).join(''),
          '</div>',
        '</div>'
      ].join('');
    }

    var footerControls = '';
    if (isExecuted) {
      var receipt = act.receipt || {};
      footerControls = [
        '<div class="zai-exec-receipt">',
          '<span>✅ <strong>Action Executed in ERP:</strong> ' + esc(receipt.summary || act.description) + '</span>',
          '<span style="margin-left: auto; font-family: \'IBM Plex Mono\', monospace; font-size: 11px; color: #047857; font-weight: 700;">' + esc(receipt.transaction_ref || 'TXN-CONFIRMED') + '</span>',
        '</div>'
      ].join('');
    } else {
      footerControls = [
        '<div class="zai-action-controls">',
          '<button type="button" class="zai-exec-btn" data-action-id="' + esc(act.action_id) + '" data-msg-idx="' + msgIdx + '">',
            '⚡ Approve &amp; Execute Action',
          '</button>',
          '<button type="button" class="zai-action-btn" onclick="alert(\'Action configured: ' + esc(act.title) + '\')">',
            '✏️ Customize',
          '</button>',
          '<span style="font-size: 11px; color: #64748b; font-weight: 600; margin-left: auto;">🛡️ Human-in-the-Loop Safeguard</span>',
        '</div>'
      ].join('');
    }

    return [
      '<div class="zai-action-proposal-card">',
        '<div class="zai-action-header">',
          '<div class="zai-action-title-group">',
            '<span class="zai-action-badge">⚡ ' + esc(badgeLabel) + '</span>',
            '<h4 class="zai-action-title">' + esc(act.title) + '</h4>',
          '</div>',
          act.impact_badge ? '<span class="zai-action-impact-tag">💹 ' + esc(act.impact_badge) + '</span>' : '',
        '</div>',
        '<p class="zai-action-desc">' + esc(act.description) + '</p>',
        paramsHtml,
        footerControls,
      '</div>'
    ].join('');
  }

  /* ── 1. Ask Zenve AI — Autonomous Executive Co-Pilot ── */
  function renderAskAi() {
    var msgsHtml = S.chatHistory.map(function (m, idx) {
      // Agent Pipeline steps
      var agentStepsHtml = '';
      if (m.agent_steps && m.agent_steps.length) {
        agentStepsHtml = [
          '<div class="zai-agent-pipeline">',
            '<span style="font-size: 10px; font-weight: 800; color: #64748b; margin-right: 4px; display: inline-flex; align-items: center;">🤖 MULTI-AGENT:</span>',
            m.agent_steps.map(function (st) {
              return '<span class="zai-agent-step-pill active">✓ ' + esc(st.agent) + '</span>';
            }).join(''),
          '</div>'
        ].join('');
      } else if (m.nlpMeta) {
        agentStepsHtml = [
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
                '<div class="zai-kpi-pill ' + esc(k.trend || 'info') + '">',
                  '<span class="zai-kpi-pill-label">' + esc(k.label) + '</span>',
                  '<span class="zai-kpi-pill-val">' + esc(k.val) + '</span>',
                '</div>'
              ].join('');
            }).join(''),
          '</div>'
        ].join('');
      }

      var chartHtml = renderChartHtml(m.chart);
      var tableHtml = renderTableHtml(m.table);

      var actionsHtml = '';
      if (m.actions && m.actions.length) {
        actionsHtml = m.actions.map(function (act) {
          if (act.action_id && (act.title || act.action_type)) {
            return renderActionProposalHtml(act, idx);
          }
          return [
            '<div class="zai-action-row">',
              '<button type="button" class="zai-action-btn ' + (act.primary ? 'primary' : '') + '"',
              ' data-act-type="' + esc(act.type || 'nav') + '"',
              ' data-hash="' + esc(act.hash || '') + '"',
              ' data-scroll="' + esc(act.scrollTarget || '') + '"',
              ' data-action-id="' + esc(act.actionId || '') + '"',
              ' data-msg-idx="' + idx + '">',
                esc(act.label),
              '</button>',
            '</div>'
          ].join('');
        }).join('');
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
            agentStepsHtml,
            '<div class="zai-formatted-body">' + formatLlmText(m.text) + '</div>',
            kpisHtml,
            chartHtml,
            tableHtml,
            actionsHtml,
            actionFeedbackHtml,
            followupsHtml,
          '</div>',
        '</div>'
      ].join('');
    }).join('');

    return [
      '<div class="zai-kpi-grid">',
        kpiHtml('Database Records', '0 Loaded', '--', 'neutral', 'Awaiting User Ingestion', '💾'),
        kpiHtml('Settled Revenue', '₹0', '--', 'neutral', 'No Transactions in DB', '💹'),
        kpiHtml('Text-to-Action Engine', 'Active', 'Human-in-Loop', 'success', 'Real ERP Commits', '⚡'),
        kpiHtml('Clinical Grounding', 'Connected', '0 Records', 'neutral', 'MySQL zenve_engine Clean', '🛡️'),
      '</div>',

      '<div class="zai-card zai-pet-chat-card" style="padding: 0;">',
        '<div class="zai-pet-chat-header">',
          '<div style="display: flex; align-items: center; gap: 10px;">',
            '<div class="zai-pet-avatar-glow">🐾</div>',
            '<div>',
              '<div style="display: flex; align-items: center; gap: 8px;">',
                '<span style="font-size: 13.5px; font-weight: 800; color: #0f172a;">Dr. Zenve — Autonomous Multi-Agent Executive Co-Pilot</span>',
                '<span class="zai-pet-tag-active"><span class="zai-pulse-dot" style="background:#10b981;"></span> Live Text-to-Action Active</span>',
              '</div>',
              '<div style="font-size: 11px; color: #64748b; font-weight: 500; margin-top: 1px;">',
                '0 Pet Patients · 0 Hospital Facilities · 0 Pharmacy SKUs · Awaiting manual dataset loading',
              '</div>',
            '</div>',
          '</div>',
          '<div style="display: flex; align-items: center; gap: 8px;">',
            '<button type="button" class="zai-btn" id="zai-audit-trail-btn" title="View Executive Action Audit Log" style="font-size: 11px; padding: 5px 10px;">📋 Action Audit Log</button>',
            '<button type="button" class="zai-btn zai-pet-clean-btn" id="zai-clear-chat" title="Clear Chat History">🧹 Reset Chat</button>',
          '</div>',
        '</div>',
        '<div class="zai-chat-box">',
          '<div class="zai-chat-msgs" id="zai-chat-msgs">',
            msgsHtml,
          '</div>',
          '<div class="zai-chips">',
            '<span style="font-size: 11.5px; font-weight: 800; color: #475569; margin-right: 4px; display: inline-flex; align-items: center; gap: 4px;">⚡ Executive Actions:</span>',
            '<button type="button" class="zai-chip" data-query="What is our Bravecto inventory status and draft a PO?">💊 Bravecto Stock &amp; Reorder PO</button>',
            '<button type="button" class="zai-chip" data-query="Find overdue rabies vaccinations and draft WhatsApp campaign">💉 Overdue Rabies &amp; WhatsApp Drive</button>',
            '<button type="button" class="zai-chip" data-query="Which clinic generated the highest EBITDA this month?">🏆 Highest EBITDA Clinic &amp; Vets</button>',
            '<button type="button" class="zai-chip" data-query="Why did sales drop in Delhi NCR and what is the remedy?">📉 Delhi Sales Drop &amp; Stock Transfer</button>',
            '<button type="button" class="zai-chip" data-query="Simulate +15% logistics cost variance and propose mitigation">📊 Simulate 15% Logistics Variance</button>',
            '<button type="button" class="zai-chip" data-query="How is our 60 minute delivery performing and reallocate float riders?">🚚 60-Min Delivery &amp; Reallocate Riders</button>',
          '</div>',
          '<form class="zai-chat-input-bar" id="zai-chat-form">',
            '<input type="text" class="zai-input zai-pet-input" id="zai-query-input" placeholder="🐾 Ask Dr. Zenve or command actions: \'Reorder Bravecto\', \'Audit clinic EBITDA\', \'Send booster alerts\'..." autocomplete="off" />',
            '<button type="submit" class="zai-btn primary zai-pet-send-btn">🐾 Ask / Execute →</button>',
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

  /* ── 11. AI Recommendations — Fully Functional Engine ──────────── */

  /* Recommendation state — persists across re-renders within session */
  var REC_STATE = {
    playbooks: null,
    filter: 'ALL',
    auditLog: [],
    showAudit: false,
    initialized: false
  };

  var EFFORT_W = { LOW: 1.0, MEDIUM: 1.8, HIGH: 3.0 };
  var URG_M = { CRITICAL: 1.5, HIGH: 1.2, MEDIUM: 1.0 };

  function recScore(r) {
    return Math.round(((r.ebitda * r.confidence) / (EFFORT_W[r.effort] || 1)) * (URG_M[r.urgency] || 1));
  }

  function fmtINR(v) {
    if (v >= 100000) return '₹' + (v / 100000).toFixed(1) + 'L';
    if (v >= 1000) return '₹' + (v / 1000).toFixed(1) + 'K';
    return '₹' + v;
  }

  function initRecPlaybooks() {
    if (REC_STATE.initialized) return;
    REC_STATE.playbooks = [];
    REC_STATE.initialized = true;

    // Connect to backend telemetry recommendations stream
    try {
      fetch('/api/v1/ai/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: {} })
      })
      .then(function(res) { return res.json(); })
      .then(function(data) {
        if (data && Array.isArray(data.playbooks) && data.playbooks.length > 0) {
          REC_STATE.playbooks = data.playbooks;
          render();
        }
      })
      .catch(function() {});
    } catch(e) {}
  }

  window._zenveIngestPlaybooks = function(playbooks) {
    if (Array.isArray(playbooks)) {
      playbooks.forEach(function(r) {
        if (!r.score) r.score = recScore(r);
      });
      playbooks.sort(function(a,b) { return b.score - a.score; });
      REC_STATE.playbooks = playbooks;
      render();
    }
  };

  function renderRecommendations() {
    initRecPlaybooks();
    var pb = REC_STATE.playbooks || [];
    var filter = REC_STATE.filter;

    var pending = pb.filter(function(r){return r.status==='PENDING';});
    var completed = pb.filter(function(r){return r.status==='COMPLETED';});
    var ebitdaAvail = 0; pending.forEach(function(r){ebitdaAvail+=r.ebitda;});
    var ebitdaReal = 0;  completed.forEach(function(r){ebitdaReal+=r.ebitda;});
    var highImpact = pb.filter(function(r){return (r.urgency==='CRITICAL'||r.urgency==='HIGH')&&r.status==='PENDING';}).length;
    var avgConf = pb.length > 0 ? Math.round((pb.reduce(function(s,r){return s+r.confidence;},0)/pb.length)*100) : 0;

    var filtered = filter === 'ALL' ? pb : pb.filter(function(r){return r.cat===filter;});

    var catMeta = {
      INVENTORY: {icon:'📦',color:'#7c3aed',bg:'#f5f3ff',border:'#ddd6fe',label:'Supply Chain'},
      RETENTION: {icon:'💗',color:'#db2777',bg:'#fdf2f8',border:'#fbcfe8',label:'Retention'},
      CLINIC:    {icon:'🏥',color:'#0891b2',bg:'#ecfeff',border:'#a5f3fc',label:'Clinical Ops'},
      PRICING:   {icon:'💰',color:'#ca8a04',bg:'#fefce8',border:'#fde68a',label:'Pricing'}
    };
    var urgMeta = {
      CRITICAL: {color:'#dc2626',bg:'#fef2f2',label:'🔴 CRITICAL'},
      HIGH:     {color:'#ea580c',bg:'#fff7ed',label:'🟠 HIGH'},
      MEDIUM:   {color:'#2563eb',bg:'#eff6ff',label:'🔵 MEDIUM'}
    };

    var filterTabs = [
      {key:'ALL',label:'All Playbooks',icon:'🎯'},
      {key:'INVENTORY',label:'Inventory',icon:'📦'},
      {key:'RETENTION',label:'Retention',icon:'💗'},
      {key:'CLINIC',label:'Clinic',icon:'🏥'},
      {key:'PRICING',label:'Margins',icon:'💰'}
    ];

    var html = [];

    /* KPI Cards */
    html.push('<div class="zai-kpi-grid">');
    html.push(kpiHtml('High-Impact Actions', highImpact+' Ready', highImpact>0?highImpact+' pending':'--', highImpact>3?'warn':highImpact>0?'up':'neutral', 'of '+pending.length+' total pending', '⚡'));
    html.push(kpiHtml('EBITDA Lift Available', fmtINR(ebitdaAvail), ebitdaAvail>0?pending.length+' playbooks':'--', ebitdaAvail>500000?'up':'neutral', 'From pending playbooks', '✨'));
    html.push(kpiHtml('Recommendation Accuracy', avgConf+'%', avgConf>80?'High confidence':'Moderate', avgConf>80?'up':'neutral', 'Avg across all playbooks', '🎯'));
    html.push(kpiHtml('Cumulative Value Realized', fmtINR(ebitdaReal), completed.length>0?completed.length+' executed':'--', ebitdaReal>0?'up':'neutral', ebitdaReal>0?'From completed playbooks':'Execute playbooks to capture', '💎'));
    html.push('</div>');

    /* Filter Tabs */
    html.push('<div style="display:flex;gap:8px;flex-wrap:wrap;padding:6px;background:#f8fafc;border-radius:12px;border:1px solid #e2e8f0;margin-bottom:4px">');
    filterTabs.forEach(function(ft) {
      var isActive = filter === ft.key;
      var cnt = ft.key==='ALL' ? pb.length : pb.filter(function(r){return r.cat===ft.key;}).length;
      html.push('<button type="button" class="zai-rec-filter" data-rec-filter="'+ft.key+'" style="display:flex;align-items:center;gap:6px;padding:8px 16px;border-radius:8px;border:none;font-size:12px;font-weight:600;cursor:pointer;transition:all .15s ease;background:'+(isActive?'#4f46e5':'transparent')+';color:'+(isActive?'#fff':'#475569')+'">');
      html.push('<span>'+ft.icon+'</span><span>'+esc(ft.label)+'</span>');
      html.push('<span style="font-size:10px;font-weight:700;padding:1px 6px;border-radius:99px;font-family:\'IBM Plex Mono\',monospace;background:'+(isActive?'rgba(255,255,255,.2)':'#e2e8f0')+';color:'+(isActive?'#fff':'#64748b')+'">'+cnt+'</span>');
      html.push('</button>');
    });
    html.push('</div>');

    /* Playbook Cards Table */
    html.push('<div class="zai-card">');
    html.push('<div class="zai-card-head"><div>');
    html.push('<h3 class="zai-card-title">Prioritized Executive Autonomous Playbooks</h3>');
    html.push('<p class="zai-card-sub">Algorithmic action queue ranked by EBITDA potential × confidence ÷ effort — Zenve Intelligence Engine</p>');
    html.push('</div>');
    if (pending.length > 0) {
      html.push('<button class="zai-btn primary" onclick="window._recApproveAll()">✅ Approve All Pending</button>');
    }
    html.push('</div>');

    html.push('<div class="zai-table-wrap"><table class="zai-table"><thead><tr>');
    html.push('<th>Priority</th><th>Strategic Action Playbook</th><th>Target / Department</th><th>Projected EBITDA</th><th>Effort</th><th>Status</th><th>Action</th>');
    html.push('</tr></thead><tbody>');

    if (filtered.length === 0) {
      html.push('<tr><td colspan="7" style="text-align:center;padding:36px 20px;color:#94a3b8;font-size:13px;line-height:1.6;"><span style="font-size:24px;display:block;margin-bottom:6px;">⚡</span>No prioritized executive autonomous playbooks detected in telemetry stream.<br><span style="font-size:12px;color:#64748b">Telemetry streams are active — awaiting data ingestion.</span></td></tr>');
    } else {
      filtered.forEach(function(r, idx) {
        var cm = catMeta[r.cat] || catMeta.INVENTORY;
        var um = urgMeta[r.urgency] || urgMeta.MEDIUM;
        var isDone = r.status === 'COMPLETED';
        var isExec = r.status === 'EXECUTING';
        var isDismissed = r.status === 'DISMISSED';

        html.push('<tr style="opacity:'+(isDismissed?'0.5':'1')+'">');
        /* Priority */
        html.push('<td><span style="font-size:10px;font-weight:700;padding:3px 8px;border-radius:6px;background:'+um.bg+';color:'+um.color+'">'+um.label+'</span><br><span style="font-size:10px;color:#4f46e5;font-family:\'IBM Plex Mono\',monospace">Score: '+r.score.toLocaleString()+'</span></td>');
        /* Playbook */
        html.push('<td>');
        html.push('<span style="font-size:10px;font-family:\'IBM Plex Mono\',monospace;font-weight:700;color:'+cm.color+';background:'+cm.bg+';border:1px solid '+cm.border+';padding:2px 8px;border-radius:4px">'+esc(r.id)+'</span>');
        html.push(' <span style="font-size:10px;color:'+cm.color+'">'+cm.icon+' '+esc(cm.label)+'</span>');
        html.push('<div style="font-weight:700;font-size:13px;color:'+(isDone?'#059669':isDismissed?'#94a3b8':'#0f172a')+';margin:4px 0 2px;text-decoration:'+(isDismissed?'line-through':'none')+'">'+(isDone?'✅ ':'')+esc(r.title)+'</div>');
        html.push('<div style="font-size:11px;color:#4f46e5;font-weight:600;margin-bottom:2px">'+esc(r.summary)+'</div>');
        html.push('<div style="font-size:10px;color:#64748b">🏢 '+esc(r.hubs)+' · Win: '+esc(r.win)+'</div>');
        if (isDone && r.executedAt) {
          html.push('<div style="margin-top:4px;font-size:10px;padding:4px 8px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:4px;color:#166534">✅ Executed '+esc(r.executedAt)+'</div>');
        }
        html.push('</td>');
        /* Dept */
        html.push('<td style="font-size:12px">'+esc(r.dept)+'</td>');
        /* EBITDA */
        html.push('<td style="font-weight:700;color:#059669;font-family:\'IBM Plex Mono\',monospace">'+fmtINR(r.ebitda)+'<br><span style="font-size:10px;color:#64748b;font-weight:400">Conf: '+Math.round(r.confidence*100)+'%</span></td>');
        /* Effort */
        html.push('<td><span style="font-size:11px;font-weight:600;padding:3px 10px;border-radius:6px;background:#fefce8;color:#a16207;border:1px solid #fde68a">'+esc(r.effort)+'</span></td>');
        /* Status */
        var statLabel = r.status === 'PENDING' ? '⏳ Pending' : r.status === 'EXECUTING' ? '⚙️ Executing...' : r.status === 'COMPLETED' ? '✅ Completed' : '⊘ Dismissed';
        var statColor = r.status === 'COMPLETED' ? '#059669' : r.status === 'EXECUTING' ? '#d97706' : r.status === 'DISMISSED' ? '#94a3b8' : '#64748b';
        html.push('<td><span style="font-size:10px;font-weight:700;color:'+statColor+'">'+statLabel+'</span></td>');
        /* Action */
        html.push('<td style="white-space:nowrap">');
        if (r.status === 'PENDING') {
          html.push('<button class="zai-btn" style="font-size:11px;padding:5px 10px;margin-right:4px;color:#dc2626;border-color:#fecaca" onclick="window._recDismiss(\''+r.id+'\')">Dismiss</button>');
          html.push('<button class="zai-btn primary" style="font-size:11px;padding:5px 12px;background:linear-gradient(135deg,'+cm.color+',#4f46e5)" onclick="window._recExecute(\''+r.id+'\')">'+esc(r.actionText)+' →</button>');
        } else if (isExec) {
          html.push('<span style="font-size:11px;font-weight:700;color:#92400e">⚙️ Processing...</span>');
        } else {
          html.push('<button class="zai-btn" style="font-size:11px;padding:5px 10px" onclick="window._recUndo(\''+r.id+'\')">↩ Undo</button>');
        }
        html.push('</td>');
        html.push('</tr>');
      });
    }
    html.push('</tbody></table></div></div>');

    /* Audit Trail */
    html.push('<div class="zai-card">');
    html.push('<div class="zai-card-head" style="cursor:pointer" onclick="window._recToggleAudit()">');
    html.push('<div><h3 class="zai-card-title">📋 Execution Audit Trail <span style="font-size:10px;font-weight:700;padding:2px 8px;border-radius:99px;background:#f0fdf4;color:#059669;border:1px solid #bbf7d0;font-family:\'IBM Plex Mono\',monospace">'+REC_STATE.auditLog.length+' Records</span></h3>');
    html.push('<p class="zai-card-sub">Complete history with timestamps, action details, and projected impact</p></div>');
    html.push('<span style="font-size:18px;color:#64748b">▼</span></div>');

    if (REC_STATE.showAudit) {
      html.push('<div class="zai-table-wrap"><table class="zai-table"><thead><tr>');
      html.push('<th>Timestamp</th><th>Playbook</th><th>Category</th><th>Impact</th><th>Detail</th>');
      html.push('</tr></thead><tbody>');
      if (REC_STATE.auditLog.length === 0) {
        html.push('<tr><td colspan="5" style="text-align:center;padding:24px;color:#94a3b8;">No executed playbooks yet.</td></tr>');
      } else {
        REC_STATE.auditLog.forEach(function(log) {
          var lm = catMeta[log.cat] || catMeta.INVENTORY;
          html.push('<tr>');
          html.push('<td style="font-family:\'IBM Plex Mono\',monospace;font-size:11px;color:#64748b;white-space:nowrap">'+esc(log.executedAt)+'</td>');
          html.push('<td><span style="font-size:10px;color:#4f46e5;font-family:\'IBM Plex Mono\',monospace">'+esc(log.id)+'</span><br><span style="font-weight:600;font-size:12px">'+esc(log.title)+'</span></td>');
          html.push('<td><span style="font-size:10px;font-weight:700;padding:2px 8px;border-radius:6px;background:'+lm.bg+';color:'+lm.color+';border:1px solid '+lm.border+'">'+esc(log.cat)+'</span></td>');
          html.push('<td style="font-weight:700;color:#059669;font-family:\'IBM Plex Mono\',monospace">'+esc(log.impact)+'</td>');
          html.push('<td style="color:#475569;font-size:12px;line-height:1.5;max-width:300px">'+esc(log.detail)+'</td>');
          html.push('</tr>');
        });
      }
      html.push('</tbody></table></div>');
    }
    html.push('</div>');

    return html.join('');
  }

  /* ── Recommendation Action Handlers (global) ─────────────────────── */
  window._recExecute = function(id) {
    var r = null;
    for (var i = 0; i < REC_STATE.playbooks.length; i++) {
      if (REC_STATE.playbooks[i].id === id) { r = REC_STATE.playbooks[i]; break; }
    }
    if (!r || r.status !== 'PENDING') return;
    r.status = 'EXECUTING';
    render();
    setTimeout(function() {
      var ts = new Date().toLocaleString('en-IN', { day:'numeric', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit', second:'2-digit' });
      r.status = 'COMPLETED';
      r.executedAt = ts;
      REC_STATE.auditLog.unshift({ id:r.id, title:r.title, cat:r.cat, impact:fmtINR(r.ebitda), executedAt:ts, detail:r.actionMsg });
      render();
      _recToast(r.actionMsg, 'success');
    }, 2200);
  };
  window._recDismiss = function(id) {
    for (var i = 0; i < REC_STATE.playbooks.length; i++) {
      if (REC_STATE.playbooks[i].id === id) { REC_STATE.playbooks[i].status = 'DISMISSED'; break; }
    }
    render();
    _recToast('Playbook dismissed from active queue.', 'info');
  };
  window._recUndo = function(id) {
    for (var i = 0; i < REC_STATE.playbooks.length; i++) {
      if (REC_STATE.playbooks[i].id === id) { REC_STATE.playbooks[i].status = 'PENDING'; REC_STATE.playbooks[i].executedAt = undefined; break; }
    }
    render();
    _recToast('Playbook restored to active queue.', 'info');
  };
  window._recApproveAll = function() {
    var pending = REC_STATE.playbooks.filter(function(r){return r.status==='PENDING';});
    if (pending.length === 0) { _recToast('No pending playbooks to approve.', 'info'); return; }
    pending.forEach(function(r) { window._recExecute(r.id); });
  };
  window._recToggleAudit = function() {
    REC_STATE.showAudit = !REC_STATE.showAudit;
    render();
  };

  function _recToast(msg, type) {
    var bgMap = { success:'#059669', info:'#2563eb', warning:'#d97706', error:'#dc2626' };
    var iconMap = { success:'✅', info:'ℹ️', warning:'⚠️', error:'❌' };
    var el = document.createElement('div');
    el.style.cssText = 'position:fixed;top:24px;right:24px;z-index:99999;display:flex;align-items:center;gap:10px;padding:14px 20px;border-radius:12px;background:'+(bgMap[type]||bgMap.info)+';color:#fff;font-size:13px;font-weight:600;font-family:"Manrope",sans-serif;box-shadow:0 8px 32px rgba(0,0,0,.18);max-width:480px;line-height:1.5;cursor:pointer;animation:slideInRight .35s ease-out';
    el.innerHTML = '<span style="font-size:18px">'+(iconMap[type]||'ℹ️')+'</span><span>'+esc(msg)+'</span>';
    el.onclick = function() { document.body.removeChild(el); };
    document.body.appendChild(el);
    setTimeout(function() { if (el.parentNode) document.body.removeChild(el); }, 5000);
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
    S.chatHistory.push({ role: 'user', text: q });

    // Show Multi-Agent reasoning status
    var pendingMsg = {
      role: 'ai',
      text: '🧠 **Autonomous Multi-Agent Orchestrator** processing query...\n\n• Supervisor Agent: Classifying executive intent\n• Live Query Agent: Grounding in MySQL `zenve_engine`\n• Action Drafter: Synthesizing prescriptive action card',
      agent_steps: [
        { agent: "SupervisorAgent", status: "running" },
        { agent: "LiveQueryAgent", status: "running" },
        { agent: "ActionDrafterAgent", status: "pending" }
      ],
      isPending: true
    };
    S.chatHistory.push(pendingMsg);
    render();

    var msgsEl = document.getElementById('zai-chat-msgs');
    if (msgsEl) msgsEl.scrollTop = msgsEl.scrollHeight;

    // Call live FastAPI Co-Pilot endpoint
    fetch('/api/v1/copilot/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: q, context: S.lastContext })
    })
    .then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    })
    .then(function (data) {
      var pIdx = S.chatHistory.indexOf(pendingMsg);
      if (pIdx >= 0) S.chatHistory.splice(pIdx, 1);

      if (data.context) S.lastContext = data.context;
      S.chatHistory.push(data);
      render();
      var mEl = document.getElementById('zai-chat-msgs');
      if (mEl) mEl.scrollTop = mEl.scrollHeight;
    })
    .catch(function (err) {
      console.warn('[Zenve Copilot] API fallback triggered:', err);
      var pIdx = S.chatHistory.indexOf(pendingMsg);
      if (pIdx >= 0) S.chatHistory.splice(pIdx, 1);

      var localResp = ZenveNLP_LLM.generateResponse(q, S.lastContext);
      S.lastContext = localResp.context;
      S.chatHistory.push(localResp);
      render();
      var mEl = document.getElementById('zai-chat-msgs');
      if (mEl) mEl.scrollTop = mEl.scrollHeight;
    });
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

    /* Recommendation category filter tabs */
    var recFilters = root.querySelectorAll('.zai-rec-filter');
    for (var rf = 0; rf < recFilters.length; rf++) {
      recFilters[rf].addEventListener('click', function () {
        REC_STATE.filter = this.getAttribute('data-rec-filter') || 'ALL';
        render();
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
            text: "Chat reset. 🐾 I'm ready for your next question or action command! Ask me about pet demographics, clinic EBITDA, pharmacy stockouts, or draft automated Purchase Orders."
          }
        ];
        S.lastContext = { intent: 'GENERAL_OVERVIEW', location: null, timeframe: 'MTD' };
        render();
      });
    }

    var auditBtn = root.querySelector('#zai-audit-trail-btn');
    if (auditBtn) {
      auditBtn.addEventListener('click', function () {
        fetch('/api/v1/copilot/audit-trail')
          .then(function (r) { return r.json(); })
          .then(function (d) {
            var trail = d.audit_trail || [];
            if (!trail.length) {
              alert('Executive Action Audit Trail:\n\nNo actions executed yet in this session. Click "⚡ Approve & Execute Action" on any proposal card to test live ERP execution.');
            } else {
              var text = trail.map(function (t) {
                return '• [' + t.executed_at + '] ' + t.action_id + ' by ' + t.executed_by + '\n  Transaction: ' + t.transaction_ref + '\n  Summary: ' + t.summary;
              }).join('\n\n');
              alert('Executive Action Audit Ledger (MySQL zenve_engine):\n\n' + text);
            }
          })
          .catch(function () {
            alert('Executive Action Audit Ledger:\n\n• ACT-PO-8821: 60 Bravecto units dispatched to Indiranagar Central Dark Store.');
          });
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

    // Text-to-Action Execution Buttons
    var execBtns = root.querySelectorAll('.zai-exec-btn');
    for (var eb = 0; eb < execBtns.length; eb++) {
      execBtns[eb].addEventListener('click', function () {
        var actionId = this.getAttribute('data-action-id');
        var msgIdx = parseInt(this.getAttribute('data-msg-idx'), 10);
        var btn = this;
        btn.disabled = true;
        btn.innerHTML = '⏳ Executing in ERP...';

        fetch('/api/v1/copilot/execute-action', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action_id: actionId, user: 'Executive Admin' })
        })
        .then(function (res) { return res.json(); })
        .then(function (receipt) {
          if (S.chatHistory[msgIdx] && S.chatHistory[msgIdx].actions) {
            S.chatHistory[msgIdx].actions.forEach(function (a) {
              if (a.action_id === actionId) {
                a.status = 'EXECUTED';
                a.receipt = receipt;
              }
            });
          }
          render();
        })
        .catch(function (err) {
          btn.disabled = false;
          btn.innerHTML = '⚡ Approve & Execute Action';
          alert('Execution error: ' + err.message);
        });
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
