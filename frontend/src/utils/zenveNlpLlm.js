/**
 * Zenve Pet-Trained Intelligence & Domain LLM Core (v5.0)
 * 100% Free, zero-dependency, in-browser NLP and generative reasoning engine.
 * Tailored for Zenve Pets Healthcare: 14 Veterinary Hospitals, E-Pharmacy,
 * 60-Minute Logistics, Clinical Care, and Executive Business Intelligence.
 *
 * v5.0 — Clean text-only responses. No KPI cards, badges, or action buttons.
 */

export const ZENVE_PET_KNOWLEDGE = {
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

export const ZENVE_KNOWLEDGE = ZENVE_PET_KNOWLEDGE;

/* ──────────────────────────────────────────────
   Conversational Intent Detection
   ────────────────────────────────────────────── */

export function detectConversationalIntent(text) {
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

export function extractEntities(text) {
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

export function classifyIntent(text, entities, ctx) {
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

export function generateResponse(text, ctx) {
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
