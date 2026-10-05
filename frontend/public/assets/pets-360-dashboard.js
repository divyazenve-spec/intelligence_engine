/* =====================================================================
   Zenve BI — Pets 360° Executive Control Center
   Sidebar: Pets 360° Suite (9 Subcategories)
   Pure Light Executive Design System
   ===================================================================== */

(function () {
  'use strict';

  var MODULES = [
    { id: 'all-pets', label: 'All Pets', icon: '🐕', hash: '#all-pets', title: 'Master Pet Registry & Census', sub: 'Comprehensive database of registered companion animals, pet parents, microchip IDs, and longitudinal health statuses' },
    { id: 'pet-profiles', label: 'Pet Profiles', icon: '📋', hash: '#pet-profiles', title: 'Longitudinal Pet Profiles & Biometrics', sub: 'Holistic biometric identifiers, ownership records, insurance policies, clinical notes, and nutritional profiles' },
    { id: 'pet-health-records', label: 'Pet Health Records', icon: '🩺', hash: '#pet-health-records', title: 'Electronic Health Records (EHR) & Clinical Timeline', sub: 'Longitudinal medical history, physical examination findings, vital signs trends, and clinical diagnosis logs' },
    { id: 'vaccination-records', label: 'Vaccination Records', icon: '💉', hash: '#vaccination-records', title: 'Digital Vaccination Passports & Biological Records', sub: 'Verifiable immunization records, vaccine manufacturer lot tracing, expiry recalls, and digital health passports' },
    { id: 'treatment-history', label: 'Treatment History', icon: '💊', hash: '#treatment-history', title: 'Inpatient Protocols, ICU & Surgical Recovery Logs', sub: 'Historical treatment regimens, emergency interventions, surgical procedures, and discharge outcome tracking' },
    { id: 'prescription-history', label: 'Prescription History', icon: '🧪', hash: '#prescription-history', title: 'Veterinary Rx & Medication Dispensation History', sub: 'Digital prescription records, pharmaceutical dosages, chronic maintenance refills, and drug interaction audits' },
    { id: 'purchase-history', label: 'Purchase History', icon: '🛍️', hash: '#purchase-history', title: 'Pet Nutrition, Pharmacy & Merchandise Purchases', sub: 'Complete ledger of food, prescription diets, tick & flea treatments, and accessories purchased across omni-channels' },
    { id: 'pet-analytics', label: 'Pet Analytics', icon: '📊', hash: '#pet-analytics', title: 'Population Demographics & Epidemiological Analytics', sub: 'Species segmentation, breed distribution, age cohort epidemiology, and preventive wellness indices' },
    { id: 'pet-health-insights', label: 'Pet Health Insights', icon: '🧠', hash: '#pet-health-insights', title: 'Zenve AI Pet Health Intelligence & Predictive Insights', sub: 'Epidemiological signal detection, breed health risk surveillance, preventive reminders, and clinical wellness alerts' }
  ];

  var S = {
    open: false,
    tab: 'all-pets',
    searchQuery: '',
    filterVal: 'ALL'
  };

  var root = null;

  /* ── Master Mock Datasets ─────────────────────────────────────────── */
  var PETS = [
    { id: 'PET-101', name: 'Bruno', species: 'Canine', breed: 'Golden Retriever', age: '3 yrs 2 mos', gender: 'Male (Neutered)', parent: 'Vikram Singhania', phone: '+91 98201 44521', city: 'Mumbai', healthScore: 96, vaxStatus: 'Up to Date', microchip: '981098102344120', avatar: '🐕' },
    { id: 'PET-102', name: 'Milo', species: 'Feline', breed: 'Persian Longhair', age: '2 yrs 6 mos', gender: 'Female (Spayed)', parent: 'Ananya Deshmukh', phone: '+91 97112 55923', city: 'Bengaluru', healthScore: 88, vaxStatus: 'Due in 14d', microchip: '981098102344121', avatar: '🐈' },
    { id: 'PET-103', name: 'Rocky', species: 'Canine', breed: 'German Shepherd', age: '4 yrs 1 mo', gender: 'Male', parent: 'Rohan Mehta', phone: '+91 98450 33812', city: 'Delhi NCR', healthScore: 92, vaxStatus: 'Up to Date', microchip: '981098102344122', avatar: '🐕' },
    { id: 'PET-104', name: 'Simba', species: 'Canine', breed: 'Beagle', age: '1 yr 8 mos', gender: 'Male', parent: 'Pooja Nair', phone: '+91 98330 67120', city: 'Bengaluru', healthScore: 84, vaxStatus: 'Up to Date', microchip: '981098102344123', avatar: '🐕' },
    { id: 'PET-105', name: 'Bella', species: 'Canine', breed: 'Shih Tzu', age: '5 yrs 4 mos', gender: 'Female (Spayed)', parent: 'Kavita Rao', phone: '+91 99201 88410', city: 'Hyderabad', healthScore: 78, vaxStatus: 'Overdue', microchip: '981098102344124', avatar: '🐩' },
    { id: 'PET-106', name: 'Oreo', species: 'Feline', breed: 'Domestic Shorthair', age: '1 yr 2 mos', gender: 'Male (Neutered)', parent: 'Farhan Akhtar', phone: '+91 98110 33201', city: 'Mumbai', healthScore: 94, vaxStatus: 'Up to Date', microchip: '981098102344125', avatar: '🐈' },
    { id: 'PET-107', name: 'Max', species: 'Canine', breed: 'Labrador Retriever', age: '6 yrs 0 mos', gender: 'Male (Neutered)', parent: 'Siddharth Roy', phone: '+91 98440 91823', city: 'Bengaluru', healthScore: 89, vaxStatus: 'Up to Date', microchip: '981098102344126', avatar: '🐕' },
    { id: 'PET-108', name: 'Kiwi', species: 'Avian', breed: 'Cockatiel', age: '1 yr 0 mos', gender: 'Unsexed', parent: 'Divya Iyer', phone: '+91 98220 54109', city: 'Pune', healthScore: 98, vaxStatus: 'N/A', microchip: 'Leg Band #881', avatar: '🦜' },
    { id: 'PET-109', name: 'Casper', species: 'Canine', breed: 'Siberian Husky', age: '2 yrs 11 mos', gender: 'Male', parent: 'Aditya Oberoi', phone: '+91 97660 12093', city: 'Delhi NCR', healthScore: 82, vaxStatus: 'Due in 7d', microchip: '981098102344127', avatar: '🐺' },
    { id: 'PET-110', name: 'Ginger', species: 'Feline', breed: 'Orange Tabby', age: '3 yrs 9 mos', gender: 'Female', parent: 'Meera Sen', phone: '+91 98101 44021', city: 'Kolkata', healthScore: 91, vaxStatus: 'Up to Date', microchip: '981098102344128', avatar: '🐈' }
  ];

  var HEALTH_RECORDS = [
    { id: 'EHR-901', date: '02-Oct-2026', pet: 'Bruno (Golden Retriever)', type: 'Routine Clinical Exam', vet: 'Dr. Priya Sharma', vitals: 'Temp: 39.1°C • HR: 110bpm • Wt: 32.4kg', diagnosis: 'Dietary Indiscretion (Enteritis)', status: 'Resolved', notes: 'Hydration restored, antiemetics administered.' },
    { id: 'EHR-902', date: '28-Sep-2026', pet: 'Milo (Persian Cat)', type: 'Urinary Diagnostic', vet: 'Dr. Aisha Khan', vitals: 'Temp: 38.6°C • Wt: 4.1kg', diagnosis: 'Feline Lower Urinary Tract Disease', status: 'Under Regimen', notes: 'Urinalysis shows struvite crystals. Prescription renal diet.' },
    { id: 'EHR-903', date: '24-Sep-2026', pet: 'Rocky (German Shepherd)', type: 'Orthopedic Evaluation', vet: 'Dr. Rahul Mehta', vitals: 'Temp: 38.5°C • Wt: 38.0kg', diagnosis: 'CCL Ligament Laxity (Right Stifle)', status: 'Post-Op Rehab', notes: 'Surgical recovery 4 weeks post-op. Hydrotherapy approved.' },
    { id: 'EHR-904', date: '20-Sep-2026', pet: 'Simba (Beagle)', type: 'Dermatology Cytology', vet: 'Dr. Karan Patel', vitals: 'Temp: 38.8°C • Wt: 14.2kg', diagnosis: 'Malassezia Pachydermatis Otitis', status: 'Improving', notes: 'Bilateral ear cytology shows fungal overgrowth. Posatex drops.' },
    { id: 'EHR-905', date: '15-Sep-2026', pet: 'Bella (Shih Tzu)', type: 'Cardiology Doppler', vet: 'Dr. Neha Singh', vitals: 'Temp: 38.3°C • HR: 165bpm', diagnosis: 'Mitral Valve Insufficiency (Stage B2)', status: 'Chronic Monitoring', notes: 'Vetmedin (Pimobendan 1.25mg) daily maintenance.' },
    { id: 'EHR-906', date: '10-Sep-2026', pet: 'Casper (Siberian Husky)', type: 'Emergency Resuscitation', vet: 'Dr. Neha Singh', vitals: 'Temp: 40.8°C (Hyperthermia)', diagnosis: 'Acute Canine Heat Exhaustion', status: 'Fully Recovered', notes: 'Active cooling protocol, IV Lactated Ringers 120ml/kg.' },
    { id: 'EHR-907', date: '04-Sep-2026', pet: 'Oreo (Domestic Shorthair)', type: 'Oral Dental Scaling', vet: 'Dr. Aisha Khan', vitals: 'Temp: 38.7°C • Wt: 3.8kg', diagnosis: 'Periodontal Calculus Grade 2', status: 'Completed', notes: 'Ultrasonic scaling, subgingival curettage, fluoride polish.' }
  ];

  var VACCINATIONS = [
    { id: 'VAX-501', pet: 'Bruno (Golden Retriever)', vaccine: 'DHPPiL (9-in-1 Vanguard Plus 5)', manufacturer: 'Zoetis Animal Health', batch: 'ZT-99410-A', administeredOn: '15-Jan-2026', nextDue: '15-Jan-2027', vet: 'Dr. Priya Sharma', clinic: 'Koramangala Super Hospital', status: 'Valid (Immune)', passId: 'ZV-PASS-8819' },
    { id: 'VAX-502', pet: 'Bruno (Golden Retriever)', vaccine: 'Anti-Rabies (Defensor 3)', manufacturer: 'Zoetis Animal Health', batch: 'ZT-RAB-2041', administeredOn: '15-Jan-2026', nextDue: '15-Jan-2027', vet: 'Dr. Priya Sharma', clinic: 'Koramangala Super Hospital', status: 'Valid (Immune)', passId: 'ZV-PASS-8819' },
    { id: 'VAX-503', pet: 'Milo (Persian Cat)', vaccine: 'Feline Tricat Trio (FPV/FHV/FCV)', manufacturer: 'MSD Animal Health (Nobivac)', batch: 'MSD-TRI-119', administeredOn: '18-Oct-2025', nextDue: '18-Oct-2026', vet: 'Dr. Aisha Khan', clinic: 'Indiranagar Care Center', status: 'Due in 13 Days', passId: 'ZV-PASS-3312' },
    { id: 'VAX-504', pet: 'Milo (Persian Cat)', vaccine: 'Nobivac Rabies Feline', manufacturer: 'MSD Animal Health', batch: 'MSD-RAB-440', administeredOn: '18-Oct-2025', nextDue: '18-Oct-2026', vet: 'Dr. Aisha Khan', clinic: 'Indiranagar Care Center', status: 'Due in 13 Days', passId: 'ZV-PASS-3312' },
    { id: 'VAX-505', pet: 'Rocky (German Shepherd)', vaccine: 'Canine Corona + Giardia Dual', manufacturer: 'Boehringer Ingelheim', batch: 'BI-COR-5510', administeredOn: '10-Apr-2026', nextDue: '10-Apr-2027', vet: 'Dr. Rahul Mehta', clinic: 'Whitefield Specialty OT', status: 'Valid (Immune)', passId: 'ZV-PASS-6041' },
    { id: 'VAX-506', pet: 'Simba (Beagle)', vaccine: 'Kennel Cough (Nobivac KC Intranasal)', manufacturer: 'MSD Animal Health', batch: 'MSD-KC-889', administeredOn: '05-May-2026', nextDue: '05-May-2027', vet: 'Dr. Karan Patel', clinic: 'Bandra West Clinic', status: 'Valid (Immune)', passId: 'ZV-PASS-7120' },
    { id: 'VAX-507', pet: 'Bella (Shih Tzu)', vaccine: 'Annual Rabies Booster', manufacturer: 'Zoetis Animal Health', batch: 'ZT-RAB-1092', administeredOn: '12-Aug-2025', nextDue: '12-Aug-2026', vet: 'Dr. Neha Singh', clinic: 'Gurugram Hospital', status: 'Overdue (Expired)', passId: 'ZV-PASS-1099' }
  ];

  var TREATMENTS = [
    { id: 'TRT-101', pet: 'Bruno (Golden Retriever)', date: '02-Oct-2026', condition: 'Acute Gastroenteritis', procedure: 'IV Rehydration & Antiemetics (Maropitant 10mg)', duration: 'Day Ward (6 hrs)', vet: 'Dr. Priya Sharma', cost: '₹2,400', outcome: 'Fully Resolved' },
    { id: 'TRT-102', pet: 'Milo (Persian Cat)', date: '28-Sep-2026', condition: 'FLUTD Urethral Spasm', procedure: 'Urinary Catheterization & Spasmolytic Infusion', duration: 'Inpatient (48 hrs)', vet: 'Dr. Aisha Khan', cost: '₹5,800', outcome: 'Catheter Removed / Discharged' },
    { id: 'TRT-103', pet: 'Rocky (German Shepherd)', date: '24-Sep-2026', condition: 'CCL Right Cruciate Rupture', procedure: 'TPLO Surgical Stabilization & Orthopedic Plate', duration: 'OT + 3 Days Inpatient', vet: 'Dr. Rahul Mehta', cost: '₹34,500', outcome: 'Rehab / Hydrotherapy' },
    { id: 'TRT-104', pet: 'Simba (Beagle)', date: '20-Sep-2026', condition: 'Severe Malassezia Otitis', procedure: 'Deep Ear Flushing & Posatex Suspension Course', duration: 'Outpatient (Weekly)', vet: 'Dr. Karan Patel', cost: '₹3,200', outcome: 'Regimen Week 2 of 4' },
    { id: 'TRT-105', pet: 'Bella (Shih Tzu)', date: '15-Sep-2026', condition: 'Mitral Valve Insufficiency (MMVD)', procedure: 'Echocardiogram Staging & Pimobendan Inception', duration: 'Chronic Care Protocol', vet: 'Dr. Neha Singh', cost: '₹4,500', outcome: 'Stable on Daily Meds' },
    { id: 'TRT-106', pet: 'Casper (Siberian Husky)', date: '10-Sep-2026', condition: 'Heatstroke Induced Encephalopathy', procedure: 'Active Cold Perfusion & Mannitol Osmotherapy', duration: 'ICU Critical Care (72 hrs)', vet: 'Dr. Neha Singh', cost: '₹18,200', outcome: 'Full Recovery' }
  ];

  var PRESCRIPTIONS = [
    { id: 'RX-7701', pet: 'Bruno (Golden Retriever)', date: '02-Oct-2026', medicine: 'Maropitant (Cerenia) 24mg', dosage: '1 tab OD x 3 days', indication: 'Antiemetic / Gastritis', prescriber: 'Dr. Priya Sharma', pharmacyStatus: 'Dispensed', refillsLeft: 0 },
    { id: 'RX-7702', pet: 'Milo (Persian Cat)', date: '28-Sep-2026', medicine: 'Prazosin 0.5mg + Gabapentin 50mg', dosage: 'Prazosin 1/4 tab BD, Gaba BID x 7d', indication: 'FLUTD Urethral Relaxation & Analgesia', prescriber: 'Dr. Aisha Khan', pharmacyStatus: 'Dispensed', refillsLeft: 1 },
    { id: 'RX-7703', pet: 'Rocky (German Shepherd)', date: '24-Sep-2026', medicine: 'Carprofen (Rimadyl) 75mg + Tramadol 50mg', dosage: '1 tab BD with food x 10 days', indication: 'Post-Op Orthopedic Analgesia', prescriber: 'Dr. Rahul Mehta', pharmacyStatus: 'Dispensed', refillsLeft: 2 },
    { id: 'RX-7704', pet: 'Simba (Beagle)', date: '20-Sep-2026', medicine: 'Posatex Otic Drops (Orbifloxacin/Mometasone)', dosage: '4 drops into each ear canal OD x 14d', indication: 'Malassezia & Bacterial Otitis', prescriber: 'Dr. Karan Patel', pharmacyStatus: 'Dispensed', refillsLeft: 0 },
    { id: 'RX-7705', pet: 'Bella (Shih Tzu)', date: '15-Sep-2026', medicine: 'Vetmedin (Pimobendan) 1.25mg Chewable', dosage: '1 chewable BD on empty stomach', indication: 'Chronic MMVD Cardiac Support', prescriber: 'Dr. Neha Singh', pharmacyStatus: 'Active Refill', refillsLeft: 5 },
    { id: 'RX-7706', pet: 'Max (Labrador)', date: '10-Sep-2026', medicine: 'Bravecto Chew (Fluralaner 500mg)', dosage: '1 chewable tablet PO every 12 weeks', indication: 'Ectoparasite (Tick & Flea) Prevention', prescriber: 'Dr. Priya Sharma', pharmacyStatus: 'Dispensed', refillsLeft: 3 }
  ];

  var PURCHASES = [
    { id: 'ORD-9801', pet: 'Bruno (Golden Retriever)', date: '02-Oct-2026', item: 'Royal Canin Maxi Adult Dry Food (15kg)', category: 'Food & Nutrition', channel: 'Zenve 60-Min Express', amount: '₹7,450', parent: 'Vikram Singhania', status: 'Delivered' },
    { id: 'ORD-9802', pet: 'Milo (Persian Cat)', date: '29-Sep-2026', item: 'Royal Canin Urinary S/O Feline (3.5kg) + Inaba Churu', category: 'Prescription Diet', channel: 'In-Clinic Pharmacy', amount: '₹3,200', parent: 'Ananya Deshmukh', status: 'Fulfilled' },
    { id: 'ORD-9803', pet: 'Rocky (German Shepherd)', date: '25-Sep-2026', item: 'Orthopedic Memory Foam Pet Bed (XXL) + Ruffwear Harness', category: 'Accessories & Comfort', channel: 'Zenve E-Commerce', amount: '₹9,800', parent: 'Rohan Mehta', status: 'Delivered' },
    { id: 'ORD-9804', pet: 'Simba (Beagle)', date: '21-Sep-2026', item: 'Bravecto Chewable (10-20kg) + TropiClean Ear Wash', category: 'Pharmacy & Wellness', channel: 'Zenve 60-Min Express', amount: '₹2,650', parent: 'Pooja Nair', status: 'Delivered' },
    { id: 'ORD-9805', pet: 'Bella (Shih Tzu)', date: '16-Sep-2026', item: 'Vetmedin Pimobendan 1.25mg (100 Tabs) Monthly Subscription', category: 'Chronic Rx Supply', channel: 'Subscription Auto-Ship', amount: '₹3,900', parent: 'Kavita Rao', status: 'Active Recurring' },
    { id: 'ORD-9806', pet: 'Max (Labrador)', date: '11-Sep-2026', item: 'Orijen Original Dog Food (11.4kg) + Dental Bone Chew', category: 'Food & Nutrition', channel: 'Zenve E-Commerce', amount: '₹8,900', parent: 'Siddharth Roy', status: 'Delivered' }
  ];

  var INSIGHTS = [
    { id: 'INS-01', title: 'Seasonal Flea, Tick & Malassezia Surge', category: 'Critical Outbreak', severity: 'Critical', impact: 'High Risk (410 Canines)', cohort: 'Canine (Bengaluru & Mumbai Hubs)', timeframe: 'Past 14 Days', description: 'Post-monsoon ambient humidity has caused a 38% spike in canine Malassezia pachydermatis dermatitis, tick infestations, and Ehrlichiosis canis seropositivity in outpatient consults.', recommendation: 'Broadcast automated WhatsApp push reminders for Bravecto / NexGard 3-month chewables to 410 overdue canine pet parents. Stock up ectoparasiticide inventory.', metric: '+38% Case Surge', preventable: '94% Avertable', actionLabel: 'Broadcast WhatsApp Recall' },
    { id: 'INS-02', title: 'Canine Parvovirus (CPV) Strain Cluster in Pups < 4 Mos', category: 'Critical Outbreak', severity: 'Critical', impact: 'High Risk (124 Pups)', cohort: 'Canine Pediatric (< 16 weeks) — Delhi NCR', timeframe: 'Past 7 Days', description: 'Surveillance telemetry detected 8 confirmed CPV cases within a 6km radius in Delhi NCR/Gurugram. High mortality risk for unimmunized or single-dose puppies.', recommendation: 'Initiate emergency isolation ward triage protocol. Send high-priority immunization recall to 124 pet parents with pending 2nd or 3rd DHPPiL booster doses.', metric: '8 CPV Cases Detected', preventable: '98% Vaccine Protected', actionLabel: 'Trigger Emergency Booster Alerts' },
    { id: 'INS-03', title: 'Senior Feline Early Renal Azotemia (SDMA Biomarker Cluster)', category: 'Clinical Warning', severity: 'Warning', impact: 'Medium Risk (24 Felines)', cohort: 'Persian & Domestic Shorthair (Age > 6y)', timeframe: 'Past 30 Days', description: 'Routine SDMA biomarker screening identified early Stage 2 Chronic Kidney Disease (CKD) in 24 senior cats prior to overt serum creatinine elevation or clinical nephron loss.', recommendation: 'Enroll flagged pets into Royal Canin Renal / Hill’s k/d therapeutic diet plans and schedule subcutaneous fluid home hydration consultations.', metric: '24 Early Staged', preventable: 'Slows Progression by 62%', actionLabel: 'Prescribe Renal Diet Regimen' },
    { id: 'INS-04', title: 'Brachycephalic Airway (BOAS) Heat Distress Risk', category: 'Breed Genetic Risk', severity: 'Warning', impact: 'Moderate Risk (48 Pets)', cohort: 'French Bulldogs, Pugs & Shih Tzus', timeframe: 'Ongoing Surveillance', description: 'Elevated ambient afternoon temperatures have correlated with a 22% increase in grade 2+ stertor, stridor, and respiratory distress admissions among brachycephalic patients.', recommendation: 'Publish hot-weather exercise avoidance guides to parent app. Schedule preventative rhinoplasty / staphylectomy consultations for high-risk candidates.', metric: '48 Flagged Patients', preventable: 'Averts Heatstroke ICU', actionLabel: 'Send BOAS Care Guide' },
    { id: 'INS-05', title: 'Canine Degenerative Mitral Valve Disease (MMVD) Staging', category: 'Breed Genetic Risk', severity: 'Warning', impact: 'Moderate Risk (32 Dogs)', cohort: 'Shih Tzus, Dachshunds & Senior Toy Breeds', timeframe: 'Past 60 Days', description: 'Auscultation data flagged systolic murmurs (Grade 2-3/6) in 32 senior toy breeds. 14 patients progressed to Stage B2 enlargement requiring inodilator therapy.', recommendation: 'Schedule cardiac Doppler echocardiograms and initiate Pimobendan (Vetmedin 1.25mg) to delay congestive heart failure onset.', metric: '32 Murmurs Logged', preventable: '+60% Delay to CHF', actionLabel: 'Schedule Echocardiograms' },
    { id: 'INS-06', title: 'High Primary Immunization Adherence in Puppy Cohort', category: 'Wellness Milestone', severity: 'Milestone', impact: 'High Protective Efficacy', cohort: 'Canine (< 12 months, All Hubs)', timeframe: 'Year-to-Date', description: '97.4% of registered puppies completed the full DHPPiL + Canine Corona primary vaccination series on schedule within the standard 16-week developmental window.', recommendation: 'Issue automated digital health passports with tamper-proof QR codes and calendarize 1-year Rabies booster reminders in the Zenve Parent App.', metric: '97.4% Completion', preventable: 'Herd Immunity Secured', actionLabel: 'Issue Health Passports' }
  ];

  /* ── UI Initialization ────────────────────────────────────────────── */
  function ensureRoot() {
    if (root && document.body.contains(root)) return;
    var existing = document.getElementById('zpet-root');
    if (existing) { root = existing; return; }

    root = document.createElement('div');
    root.id = 'zpet-root';
    root.innerHTML = [
      '<header class="zpet-header" id="zpet-header-bar">',
      '  <div class="zpet-header-left">',
      '    <div class="zpet-brand-badge">🐾</div>',
      '    <div class="zpet-title-group">',
      '      <div class="zpet-title-row">',
      '        <h2 class="zpet-main-title" id="zpet-header-title">Pets 360° Control Center</h2>',
      '        <span class="zpet-status-badge"><span class="zpet-status-dot"></span> 1,240 Pets</span>',
      '      </div>',
      '      <p class="zpet-subtitle" id="zpet-header-sub">Master census, digital vaccination passports, longitudinal EHRs, and AI health intelligence</p>',
      '    </div>',
      '  </div>',
      '  <div class="zpet-header-right">',
      '    <button type="button" class="zpet-btn zpet-btn-secondary" onclick="window.ZenvePetsDashboard.showAddModal()">➕ Add Pet</button>',
      '    <button type="button" class="zpet-btn zpet-btn-primary" onclick="window.ZenvePetsDashboard.exportTabCSV()">⬇️ Export CSV</button>',
      '    <button type="button" class="zpet-btn-close" onclick="window.ZenvePetsDashboard.close()" title="Close Dashboard">✕</button>',
      '  </div>',
      '</header>',
      '<nav class="zpet-nav-bar" id="zpet-nav-chips"></nav>',
      '<div class="zpet-content" id="zpet-body-content"></div>',
      '<div class="zpet-toast" id="zpet-toast-msg"></div>'
    ].join('\n');

    document.body.appendChild(root);
  }

  function renderNav() {
    var nav = root.querySelector('#zpet-nav-chips');
    if (!nav) return;
    var html = MODULES.map(function (m) {
      var active = (m.id === S.tab) ? ' active' : '';
      return '<button type="button" class="zpet-chip' + active + '" onclick="window.ZenvePetsDashboard.switchTab(\'' + m.id + '\')">' +
        m.icon + ' ' + m.label +
        '</button>';
    }).join('');
    nav.innerHTML = html;
  }

  function showToast(msg) {
    var toast = root.querySelector('#zpet-toast-msg');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(function () { toast.classList.remove('show'); }, 3000);
  }

  /* ── Tab Content Renderers ────────────────────────────────────────── */
  function renderContent() {
    var container = root.querySelector('#zpet-body-content');
    if (!container) return;

    var cur = MODULES.find(function (m) { return m.id === S.tab; }) || MODULES[0];
    root.querySelector('#zpet-header-title').textContent = cur.title;
    root.querySelector('#zpet-header-sub').textContent = cur.sub;

    renderNav();

    if (S.tab === 'all-pets') {
      renderAllPets(container);
    } else if (S.tab === 'pet-profiles') {
      renderProfiles(container);
    } else if (S.tab === 'pet-health-records') {
      renderHealthRecords(container);
    } else if (S.tab === 'vaccination-records') {
      renderVaccinations(container);
    } else if (S.tab === 'treatment-history') {
      renderTreatments(container);
    } else if (S.tab === 'prescription-history') {
      renderPrescriptions(container);
    } else if (S.tab === 'purchase-history') {
      renderPurchases(container);
    } else if (S.tab === 'pet-analytics') {
      renderAnalytics(container);
    } else if (S.tab === 'pet-health-insights') {
      renderInsights(container);
    }
  }

  /* ── 1. All Pets ── */
  function renderAllPets(container) {
    var q = S.searchQuery.toLowerCase();
    var list = PETS.filter(function (p) {
      var matchesFilter = (S.filterVal === 'ALL' || p.species === S.filterVal || p.vaxStatus.includes(S.filterVal));
      var matchesSearch = p.name.toLowerCase().includes(q) ||
        p.breed.toLowerCase().includes(q) ||
        p.parent.toLowerCase().includes(q) ||
        p.microchip.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });

    container.innerHTML = [
      '<div class="zpet-kpi-grid">',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Total Registered Pets</span><span class="zpet-kpi-icon">🐾</span></div><div class="zpet-kpi-val">1,240</div><div class="zpet-kpi-sub"><span class="zpet-badge-pos">+26.4%</span> Canine & Feline census</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Canine Share</span><span class="zpet-kpi-icon">🐕</span></div><div class="zpet-kpi-val">78.2%</div><div class="zpet-kpi-sub"><span class="zpet-badge-neu">970 Dogs</span> Active patients</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Feline Share</span><span class="zpet-kpi-icon">🐈</span></div><div class="zpet-kpi-val">19.4%</div><div class="zpet-kpi-sub"><span class="zpet-badge-pos">+32% YoY</span> 241 Cats</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Vaccine Compliance</span><span class="zpet-kpi-icon">💉</span></div><div class="zpet-kpi-val">93.8%</div><div class="zpet-kpi-sub"><span class="zpet-badge-pos">1,163 Active</span> Valid passports</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Microchip Enrolled</span><span class="zpet-kpi-icon">🏷️</span></div><div class="zpet-kpi-val">86.5%</div><div class="zpet-kpi-sub"><span class="zpet-badge-pos">1,072 Chipped</span> ISO 11784 RFID</div></div>',
      '</div>',
      '<div class="zpet-toolbar">',
      '  <div class="zpet-search-wrap">',
      '    <span>🔍</span>',
      '    <input type="text" class="zpet-search-input" placeholder="Search by pet name, breed, parent, microchip ID..." value="' + S.searchQuery + '" oninput="window.ZenvePetsDashboard.setSearch(this.value)">',
      '  </div>',
      '  <div class="zpet-filter-pills">',
      ['ALL', 'Canine', 'Feline', 'Avian', 'Up to Date', 'Due in 14d', 'Overdue'].map(function (f) {
        var act = (S.filterVal === f) ? ' active' : '';
        return '<button type="button" class="zpet-pill' + act + '" onclick="window.ZenvePetsDashboard.setFilter(\'' + f + '\')">' + f + '</button>';
      }).join(''),
      '  </div>',
      '</div>',
      '<div class="zpet-card">',
      '  <div class="zpet-table-wrap">',
      '    <table class="zpet-table">',
      '      <thead>',
      '        <tr>',
      '          <th>Pet</th>',
      '          <th>Species & Breed</th>',
      '          <th>Age & Gender</th>',
      '          <th>Pet Parent & Contact</th>',
      '          <th>City</th>',
      '          <th>Health Score</th>',
      '          <th>Vaccine Status</th>',
      '          <th>Microchip RFID</th>',
      '        </tr>',
      '      </thead>',
      '      <tbody>',
      list.map(function (p) {
        var vaxCls = p.vaxStatus === 'Up to Date' ? 'zpet-pill-green' : p.vaxStatus.includes('Due') ? 'zpet-pill-blue' : 'zpet-pill-red';
        return '<tr>' +
          '  <td style="font-weight:700;"><div style="display:flex;align-items:center;gap:8px;"><span style="font-size:18px;">' + p.avatar + '</span><div><div>' + p.name + '</div><div style="font-size:11px;color:#94a3b8;font-family:monospace;">' + p.id + '</div></div></div></td>' +
          '  <td><b>' + p.species + '</b><div style="font-size:11px;color:#64748b;">' + p.breed + '</div></td>' +
          '  <td>' + p.age + '<div style="font-size:11px;color:#64748b;">' + p.gender + '</div></td>' +
          '  <td><b>' + p.parent + '</b><div style="font-size:11px;color:#64748b;">' + p.phone + '</div></td>' +
          '  <td>' + p.city + '</td>' +
          '  <td><b style="color:' + (p.healthScore >= 90 ? '#059669' : '#2563eb') + ';">' + p.healthScore + '/100</b></td>' +
          '  <td><span class="zpet-pill-badge ' + vaxCls + '">' + p.vaxStatus + '</span></td>' +
          '  <td style="font-family:monospace;font-size:11px;color:#64748b;">' + p.microchip + '</td>' +
          '</tr>';
      }).join(''),
      '      </tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('\n');
  }

  /* ── 2. Pet Profiles ── */
  function renderProfiles(container) {
    var p = PETS[0];
    container.innerHTML = [
      '<div class="zpet-kpi-grid">',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Selected Profile</span><span class="zpet-kpi-icon">🐕</span></div><div class="zpet-kpi-val">' + p.name + '</div><div class="zpet-kpi-sub">' + p.breed + '</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Body Condition</span><span class="zpet-kpi-icon">⚖️</span></div><div class="zpet-kpi-val">32.4 kg</div><div class="zpet-kpi-sub"><span class="zpet-badge-pos">BCS 5/9 Ideal</span> Weight stable</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Biological Passport</span><span class="zpet-kpi-icon">💉</span></div><div class="zpet-kpi-val">Compliant</div><div class="zpet-kpi-sub">DHPPiL & Rabies verified</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Primary Physician</span><span class="zpet-kpi-icon">👨‍⚕️</span></div><div class="zpet-kpi-val">Dr. Priya S.</div><div class="zpet-kpi-sub">Koramangala Super Clinic</div></div>',
      '</div>',
      '<div style="display:grid;grid-template-columns:2fr 1fr;gap:20px;">',
      '  <div class="zpet-card" style="padding:24px;">',
      '    <div style="display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #f1f5f9;padding-bottom:16px;margin-bottom:18px;">',
      '      <div style="display:flex;align-items:center;gap:12px;">',
      '        <div style="width:48px;height:48px;border-radius:12px;background:#eff6ff;display:grid;placeItems:center;font-size:24px;">🐕</div>',
      '        <div><h3 style="margin:0;font-size:17px;font-weight:700;">' + p.name + '’s Complete Medical Dossier</h3><p style="margin:2px 0 0;font-size:12px;color:#64748b;">' + p.species + ' • ' + p.breed + ' • 3 yrs 2 mos</p></div>',
      '      </div>',
      '      <span class="zpet-pill-badge zpet-pill-green">ACTIVE BIO-PASSPORT</span>',
      '    </div>',
      '    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;font-size:13px;">',
      '      <div><div style="font-size:11px;color:#94a3b8;font-weight:700;">MICROCHIP RFID</div><div style="font-family:monospace;font-weight:700;color:#0f172a;margin-top:2px;">' + p.microchip + '</div></div>',
      '      <div><div style="font-size:11px;color:#94a3b8;font-weight:700;">GENDER & SPAY STATUS</div><div style="font-weight:600;color:#0f172a;margin-top:2px;">' + p.gender + '</div></div>',
      '      <div><div style="font-size:11px;color:#94a3b8;font-weight:700;">CURRENT WEIGHT</div><div style="font-weight:600;color:#0f172a;margin-top:2px;">32.4 kg (Monthly Audited)</div></div>',
      '      <div><div style="font-size:11px;color:#94a3b8;font-weight:700;">COAT COLOR & MARKINGS</div><div style="font-weight:600;color:#0f172a;margin-top:2px;">Dark Golden / Dense Coat</div></div>',
      '      <div style="grid-column:span 2;"><div style="font-size:11px;color:#94a3b8;font-weight:700;">NUTRITION REGIMEN</div><div style="font-weight:600;color:#0f172a;margin-top:2px;">Royal Canin Maxi Adult (380g/day) + Salmon Omega-3 Supplement</div></div>',
      '      <div style="grid-column:span 2;"><div style="font-size:11px;color:#94a3b8;font-weight:700;">KNOWN ALLERGIES</div><div style="font-weight:600;color:#dc2626;margin-top:2px;">⚠️ Chicken byproduct (causes mild contact pruritus)</div></div>',
      '    </div>',
      '  </div>',
      '  <div style="display:flex;flex-direction:column;gap:16px;">',
      '    <div class="zpet-card" style="padding:20px;">',
      '      <h4 style="margin:0 0 12px;font-size:13px;font-weight:700;text-transform:uppercase;">👤 Pet Parent</h4>',
      '      <div style="font-size:13px;line-height:1.6;">',
      '        <div style="font-weight:700;color:#0f172a;font-size:15px;">' + p.parent + '</div>',
      '        <div style="color:#475569;">📞 ' + p.phone + '</div>',
      '        <div style="color:#64748b;font-size:12px;margin-top:6px;">📍 Powai, Mumbai - 400076</div>',
      '      </div>',
      '    </div>',
      '    <div class="zpet-card" style="padding:20px;">',
      '      <h4 style="margin:0 0 12px;font-size:13px;font-weight:700;text-transform:uppercase;">🛡️ Insurance Coverage</h4>',
      '      <div style="font-size:13px;line-height:1.6;">',
      '        <div style="font-weight:700;color:#059669;">PetCover Gold Shield</div>',
      '        <div style="color:#64748b;font-size:12px;">Policy #PCG-881920 (Covered up to ₹1,50,000)</div>',
      '      </div>',
      '    </div>',
      '  </div>',
      '</div>'
    ].join('\n');
  }

  /* ── 3. Pet Health Records ── */
  function renderHealthRecords(container) {
    var q = S.searchQuery.toLowerCase();
    var list = HEALTH_RECORDS.filter(function (r) {
      return (S.filterVal === 'ALL' || r.status === S.filterVal) &&
        (r.pet.toLowerCase().includes(q) || r.diagnosis.toLowerCase().includes(q) || r.vet.toLowerCase().includes(q) || r.id.toLowerCase().includes(q));
    });

    container.innerHTML = [
      '<div class="zpet-kpi-grid">',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Cumulative EHRs</span><span class="zpet-kpi-icon">📋</span></div><div class="zpet-kpi-val">9,410</div><div class="zpet-kpi-sub"><span class="zpet-badge-pos">+18.5%</span> Longitudinal logs</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Monthly Admissions</span><span class="zpet-kpi-icon">📅</span></div><div class="zpet-kpi-val">384</div><div class="zpet-kpi-sub"><span class="zpet-badge-pos">+12.4%</span> Current cycle</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Active Chronic Regimens</span><span class="zpet-kpi-icon">💊</span></div><div class="zpet-kpi-val">142</div><div class="zpet-kpi-sub">Renal, cardiac, endocrine</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Vitals Compliance</span><span class="zpet-kpi-icon">🩺</span></div><div class="zpet-kpi-val">99.4%</div><div class="zpet-kpi-sub"><span class="zpet-badge-pos">Standard</span> Complete telemetry</div></div>',
      '</div>',
      '<div class="zpet-toolbar">',
      '  <div class="zpet-search-wrap">',
      '    <span>🔍</span>',
      '    <input type="text" class="zpet-search-input" placeholder="Search EHRs by pet, diagnosis, doctor..." value="' + S.searchQuery + '" oninput="window.ZenvePetsDashboard.setSearch(this.value)">',
      '  </div>',
      '  <div class="zpet-filter-pills">',
      ['ALL', 'Resolved', 'Under Regimen', 'Post-Op Rehab', 'Chronic Monitoring'].map(function (f) {
        var act = (S.filterVal === f) ? ' active' : '';
        return '<button type="button" class="zpet-pill' + act + '" onclick="window.ZenvePetsDashboard.setFilter(\'' + f + '\')">' + f + '</button>';
      }).join(''),
      '  </div>',
      '</div>',
      '<div class="zpet-card">',
      '  <div class="zpet-table-wrap">',
      '    <table class="zpet-table">',
      '      <thead>',
      '        <tr><th>Record ID</th><th>Date</th><th>Pet Patient</th><th>Encounter Type</th><th>Recorded Vitals</th><th>Diagnosis & Notes</th><th>Attending Vet</th><th>Outcome</th></tr>',
      '      </thead>',
      '      <tbody>',
      list.map(function (r) {
        var stCls = (r.status === 'Resolved' || r.status === 'Fully Recovered') ? 'zpet-pill-green' : 'zpet-pill-blue';
        return '<tr>' +
          '  <td style="font-family:monospace;color:#2563eb;font-weight:700;">' + r.id + '</td>' +
          '  <td>' + r.date + '</td>' +
          '  <td><b>' + r.pet + '</b></td>' +
          '  <td>' + r.type + '</td>' +
          '  <td style="font-family:monospace;font-size:11px;">' + r.vitals + '</td>' +
          '  <td><b>' + r.diagnosis + '</b><div style="font-size:11px;color:#64748b;">' + r.notes + '</div></td>' +
          '  <td style="color:#2563eb;font-weight:600;">' + r.vet + '</td>' +
          '  <td><span class="zpet-pill-badge ' + stCls + '">' + r.status + '</span></td>' +
          '</tr>';
      }).join(''),
      '      </tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('\n');
  }

  /* ── 4. Vaccination Records ── */
  function renderVaccinations(container) {
    var q = S.searchQuery.toLowerCase();
    var list = VACCINATIONS.filter(function (v) {
      return (S.filterVal === 'ALL' || v.status.includes(S.filterVal)) &&
        (v.pet.toLowerCase().includes(q) || v.vaccine.toLowerCase().includes(q) || v.batch.toLowerCase().includes(q) || v.passId.toLowerCase().includes(q));
    });

    container.innerHTML = [
      '<div class="zpet-kpi-grid">',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Immunization Doses</span><span class="zpet-kpi-icon">💉</span></div><div class="zpet-kpi-val">3,892</div><div class="zpet-kpi-sub"><span class="zpet-badge-pos">+22.1%</span> YTD administered</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Herd Immunity Rate</span><span class="zpet-kpi-icon">🛡️</span></div><div class="zpet-kpi-val">94.2%</div><div class="zpet-kpi-sub"><span class="zpet-badge-pos">High</span> Protected cohort</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Due Within 30d</span><span class="zpet-kpi-icon">🔔</span></div><div class="zpet-kpi-val">84 Pets</div><div class="zpet-kpi-sub">WhatsApp recalls sent</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Cold-Chain Verified</span><span class="zpet-kpi-icon">❄️</span></div><div class="zpet-kpi-val">100%</div><div class="zpet-kpi-sub">IoT 2-8°C logged</div></div>',
      '</div>',
      '<div class="zpet-toolbar">',
      '  <div class="zpet-search-wrap">',
      '    <span>🔍</span>',
      '    <input type="text" class="zpet-search-input" placeholder="Search vaccines by pet, brand, batch ID..." value="' + S.searchQuery + '" oninput="window.ZenvePetsDashboard.setSearch(this.value)">',
      '  </div>',
      '  <div class="zpet-filter-pills">',
      ['ALL', 'Valid', 'Due', 'Overdue'].map(function (f) {
        var act = (S.filterVal === f) ? ' active' : '';
        return '<button type="button" class="zpet-pill' + act + '" onclick="window.ZenvePetsDashboard.setFilter(\'' + f + '\')">' + f + '</button>';
      }).join(''),
      '  </div>',
      '</div>',
      '<div class="zpet-card">',
      '  <div class="zpet-table-wrap">',
      '    <table class="zpet-table">',
      '      <thead>',
      '        <tr><th>Pet Patient</th><th>Vaccine Brand</th><th>Manufacturer</th><th>Batch / Lot ID</th><th>Administered</th><th>Next Due</th><th>Clinician</th><th>Status</th></tr>',
      '      </thead>',
      '      <tbody>',
      list.map(function (v) {
        var stCls = v.status.includes('Valid') ? 'zpet-pill-green' : v.status.includes('Due') ? 'zpet-pill-blue' : 'zpet-pill-red';
        return '<tr>' +
          '  <td><b>' + v.pet + '</b><div style="font-family:monospace;font-size:11px;color:#2563eb;">' + v.passId + '</div></td>' +
          '  <td><b>' + v.vaccine + '</b></td>' +
          '  <td>' + v.manufacturer + '</td>' +
          '  <td style="font-family:monospace;font-size:11px;">' + v.batch + '</td>' +
          '  <td>' + v.administeredOn + '</td>' +
          '  <td style="font-weight:600;">' + v.nextDue + '</td>' +
          '  <td style="color:#2563eb;">' + v.vet + '</td>' +
          '  <td><span class="zpet-pill-badge ' + stCls + '">' + v.status + '</span></td>' +
          '</tr>';
      }).join(''),
      '      </tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('\n');
  }

  /* ── 5. Treatment History ── */
  function renderTreatments(container) {
    var q = S.searchQuery.toLowerCase();
    var list = TREATMENTS.filter(function (t) {
      return (S.filterVal === 'ALL' || t.outcome.includes(S.filterVal)) &&
        (t.pet.toLowerCase().includes(q) || t.condition.toLowerCase().includes(q) || t.procedure.toLowerCase().includes(q) || t.vet.toLowerCase().includes(q));
    });

    container.innerHTML = [
      '<div class="zpet-kpi-grid">',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Treatments Logged</span><span class="zpet-kpi-icon">💊</span></div><div class="zpet-kpi-val">1,840</div><div class="zpet-kpi-sub"><span class="zpet-badge-pos">+16.8%</span> Medical & surgical</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Recovery Rate</span><span class="zpet-kpi-icon">📈</span></div><div class="zpet-kpi-val">98.2%</div><div class="zpet-kpi-sub"><span class="zpet-badge-pos">High success</span> Safely discharged</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Avg Inpatient Stay</span><span class="zpet-kpi-icon">⏱️</span></div><div class="zpet-kpi-val">1.8 Days</div><div class="zpet-kpi-sub">-0.4d YoY optimized</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Surgical Sepsis Rate</span><span class="zpet-kpi-icon">🏥</span></div><div class="zpet-kpi-val">0.0%</div><div class="zpet-kpi-sub">Sterile theater protocol</div></div>',
      '</div>',
      '<div class="zpet-toolbar">',
      '  <div class="zpet-search-wrap">',
      '    <span>🔍</span>',
      '    <input type="text" class="zpet-search-input" placeholder="Search treatments by pet, condition, clinician..." value="' + S.searchQuery + '" oninput="window.ZenvePetsDashboard.setSearch(this.value)">',
      '  </div>',
      '  <div class="zpet-filter-pills">',
      ['ALL', 'Resolved', 'Discharged', 'Rehab', 'Full Recovery'].map(function (f) {
        var act = (S.filterVal === f) ? ' active' : '';
        return '<button type="button" class="zpet-pill' + act + '" onclick="window.ZenvePetsDashboard.setFilter(\'' + f + '\')">' + f + '</button>';
      }).join(''),
      '  </div>',
      '</div>',
      '<div class="zpet-card">',
      '  <div class="zpet-table-wrap">',
      '    <table class="zpet-table">',
      '      <thead>',
      '        <tr><th>ID & Date</th><th>Pet Patient</th><th>Condition</th><th>Protocol Executed</th><th>Duration</th><th>Clinician</th><th>Cost</th><th>Outcome</th></tr>',
      '      </thead>',
      '      <tbody>',
      list.map(function (t) {
        var outCls = t.outcome.includes('Resolved') || t.outcome.includes('Full Recovery') ? 'zpet-pill-green' : 'zpet-pill-blue';
        return '<tr>' +
          '  <td style="font-family:monospace;color:#2563eb;font-weight:700;">' + t.id + '<div style="font-size:11px;color:#64748b;">' + t.date + '</div></td>' +
          '  <td><b>' + t.pet + '</b></td>' +
          '  <td><b>' + t.condition + '</b></td>' +
          '  <td style="color:#475569;">' + t.procedure + '</td>' +
          '  <td>' + t.duration + '</td>' +
          '  <td style="color:#2563eb;font-weight:600;">' + t.vet + '</td>' +
          '  <td style="font-family:monospace;font-weight:700;">' + t.cost + '</td>' +
          '  <td><span class="zpet-pill-badge ' + outCls + '">' + t.outcome + '</span></td>' +
          '</tr>';
      }).join(''),
      '      </tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('\n');
  }

  /* ── 6. Prescription History ── */
  function renderPrescriptions(container) {
    var q = S.searchQuery.toLowerCase();
    var list = PRESCRIPTIONS.filter(function (p) {
      return (S.filterVal === 'ALL' || p.pharmacyStatus === S.filterVal) &&
        (p.pet.toLowerCase().includes(q) || p.medicine.toLowerCase().includes(q) || p.indication.toLowerCase().includes(q) || p.prescriber.toLowerCase().includes(q));
    });

    container.innerHTML = [
      '<div class="zpet-kpi-grid">',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Rx Generated</span><span class="zpet-kpi-icon">💊</span></div><div class="zpet-kpi-val">2,940</div><div class="zpet-kpi-sub"><span class="zpet-badge-pos">+15.3%</span> Tamper-proof logs</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Chronic Refills</span><span class="zpet-kpi-icon">🔄</span></div><div class="zpet-kpi-val">312</div><div class="zpet-kpi-sub">Auto-scheduled delivery</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Dispense SLA</span><span class="zpet-kpi-icon">⏱️</span></div><div class="zpet-kpi-val">8.4 Mins</div><div class="zpet-kpi-sub">-2.1m YoY turnaround</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Drug Interaction Check</span><span class="zpet-kpi-icon">🛡️</span></div><div class="zpet-kpi-val">100%</div><div class="zpet-kpi-sub">AI safety verified</div></div>',
      '</div>',
      '<div class="zpet-toolbar">',
      '  <div class="zpet-search-wrap">',
      '    <span>🔍</span>',
      '    <input type="text" class="zpet-search-input" placeholder="Search prescriptions by drug, pet, indication..." value="' + S.searchQuery + '" oninput="window.ZenvePetsDashboard.setSearch(this.value)">',
      '  </div>',
      '  <div class="zpet-filter-pills">',
      ['ALL', 'Dispensed', 'Active Refill'].map(function (f) {
        var act = (S.filterVal === f) ? ' active' : '';
        return '<button type="button" class="zpet-pill' + act + '" onclick="window.ZenvePetsDashboard.setFilter(\'' + f + '\')">' + f + '</button>';
      }).join(''),
      '  </div>',
      '</div>',
      '<div class="zpet-card">',
      '  <div class="zpet-table-wrap">',
      '    <table class="zpet-table">',
      '      <thead>',
      '        <tr><th>Rx ID</th><th>Date</th><th>Pet Patient</th><th>Prescribed Medicine</th><th>Dosage & Frequency</th><th>Indication</th><th>Prescriber</th><th>Status</th></tr>',
      '      </thead>',
      '      <tbody>',
      list.map(function (p) {
        var stCls = (p.pharmacyStatus === 'Dispensed') ? 'zpet-pill-green' : 'zpet-pill-blue';
        return '<tr>' +
          '  <td style="font-family:monospace;color:#2563eb;font-weight:700;">' + p.id + '</td>' +
          '  <td>' + p.date + '</td>' +
          '  <td><b>' + p.pet + '</b></td>' +
          '  <td><b>' + p.medicine + '</b></td>' +
          '  <td style="font-family:monospace;font-size:11px;">' + p.dosage + '</td>' +
          '  <td style="color:#64748b;">' + p.indication + '</td>' +
          '  <td style="color:#2563eb;font-weight:600;">' + p.prescriber + '</td>' +
          '  <td><span class="zpet-pill-badge ' + stCls + '">' + p.pharmacyStatus + '</span></td>' +
          '</tr>';
      }).join(''),
      '      </tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('\n');
  }

  /* ── 7. Purchase History ── */
  function renderPurchases(container) {
    var q = S.searchQuery.toLowerCase();
    var list = PURCHASES.filter(function (p) {
      return (S.filterVal === 'ALL' || p.category === S.filterVal || p.status === S.filterVal) &&
        (p.pet.toLowerCase().includes(q) || p.item.toLowerCase().includes(q) || p.parent.toLowerCase().includes(q) || p.id.toLowerCase().includes(q));
    });

    container.innerHTML = [
      '<div class="zpet-kpi-grid">',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Cumulative Orders</span><span class="zpet-kpi-icon">🛍️</span></div><div class="zpet-kpi-val">4,820</div><div class="zpet-kpi-sub"><span class="zpet-badge-pos">+28.4%</span> Omni-channel</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Avg Pet LTV / Yr</span><span class="zpet-kpi-icon">💰</span></div><div class="zpet-kpi-val">₹32,400</div><div class="zpet-kpi-sub"><span class="zpet-badge-pos">+14.2%</span> Annualized spend</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Rx Diet Penetration</span><span class="zpet-kpi-icon">🥗</span></div><div class="zpet-kpi-val">34.2%</div><div class="zpet-kpi-sub">High margin retention</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Auto-Ship Subscribers</span><span class="zpet-kpi-icon">🔄</span></div><div class="zpet-kpi-val">41.5%</div><div class="zpet-kpi-sub">514 Active subscriptions</div></div>',
      '</div>',
      '<div class="zpet-toolbar">',
      '  <div class="zpet-search-wrap">',
      '    <span>🔍</span>',
      '    <input type="text" class="zpet-search-input" placeholder="Search orders by item, pet, parent..." value="' + S.searchQuery + '" oninput="window.ZenvePetsDashboard.setSearch(this.value)">',
      '  </div>',
      '  <div class="zpet-filter-pills">',
      ['ALL', 'Food & Nutrition', 'Prescription Diet', 'Pharmacy & Wellness', 'Delivered'].map(function (f) {
        var act = (S.filterVal === f) ? ' active' : '';
        return '<button type="button" class="zpet-pill' + act + '" onclick="window.ZenvePetsDashboard.setFilter(\'' + f + '\')">' + f + '</button>';
      }).join(''),
      '  </div>',
      '</div>',
      '<div class="zpet-card">',
      '  <div class="zpet-table-wrap">',
      '    <table class="zpet-table">',
      '      <thead>',
      '        <tr><th>Order ID</th><th>Date</th><th>Pet Consumer</th><th>Item / SKU</th><th>Category</th><th>Channel</th><th>Parent</th><th>Amount</th><th>Status</th></tr>',
      '      </thead>',
      '      <tbody>',
      list.map(function (p) {
        var stCls = (p.status === 'Delivered' || p.status === 'Fulfilled') ? 'zpet-pill-green' : 'zpet-pill-blue';
        return '<tr>' +
          '  <td style="font-family:monospace;color:#2563eb;font-weight:700;">' + p.id + '</td>' +
          '  <td>' + p.date + '</td>' +
          '  <td><b>' + p.pet + '</b></td>' +
          '  <td><b>' + p.item + '</b></td>' +
          '  <td style="color:#64748b;">' + p.category + '</td>' +
          '  <td style="color:#2563eb;font-weight:600;">' + p.channel + '</td>' +
          '  <td>' + p.parent + '</td>' +
          '  <td style="font-family:monospace;font-weight:700;">' + p.amount + '</td>' +
          '  <td><span class="zpet-pill-badge ' + stCls + '">' + p.status + '</span></td>' +
          '</tr>';
      }).join(''),
      '      </tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('\n');
  }

  /* ── 8. Pet Analytics ── */
  var BREEDS_ANALYTICS = [
    { breed: 'Golden Retriever', species: 'Canine', count: 284, pct: 22.9, avgAge: '3.4 yrs', vaxRate: '96.2%', microchipRate: '88.5%', riskTier: 'Low (Joint Monitoring)' },
    { breed: 'Labrador Retriever', species: 'Canine', count: 248, pct: 20.0, avgAge: '4.1 yrs', vaxRate: '94.8%', microchipRate: '85.2%', riskTier: 'Low (Caloric Control)' },
    { breed: 'Indie / Desi Dog', species: 'Canine', count: 186, pct: 15.0, avgAge: '2.8 yrs', vaxRate: '98.4%', microchipRate: '92.0%', riskTier: 'Minimal (High Resilience)' },
    { breed: 'Persian Longhair', species: 'Feline', count: 148, pct: 11.9, avgAge: '2.6 yrs', vaxRate: '91.2%', microchipRate: '72.4%', riskTier: 'Moderate (FLUTD & Renal)' },
    { breed: 'Beagle', species: 'Canine', count: 124, pct: 10.0, avgAge: '3.1 yrs', vaxRate: '92.7%', microchipRate: '81.6%', riskTier: 'Moderate (Otitis Externa)' },
    { breed: 'German Shepherd', species: 'Canine', count: 98, pct: 7.9, avgAge: '3.9 yrs', vaxRate: '95.9%', microchipRate: '89.1%', riskTier: 'Moderate (Hip Dysplasia)' },
    { breed: 'Shih Tzu', species: 'Canine', count: 86, pct: 6.9, avgAge: '5.2 yrs', vaxRate: '88.4%', microchipRate: '68.0%', riskTier: 'High (MMVD Cardiac)' },
    { breed: 'Domestic Shorthair', species: 'Feline', count: 72, pct: 5.8, avgAge: '2.1 yrs', vaxRate: '94.4%', microchipRate: '75.0%', riskTier: 'Minimal (Oral Dental Care)' },
    { breed: 'French Bulldog', species: 'Canine', count: 48, pct: 3.9, avgAge: '2.4 yrs', vaxRate: '93.8%', microchipRate: '91.7%', riskTier: 'High (BOAS Airway)' },
    { breed: 'Cockatiel & Exotic', species: 'Avian', count: 46, pct: 3.7, avgAge: '1.8 yrs', vaxRate: 'N/A', microchipRate: '62.0%', riskTier: 'Low (Avian Respiratory)' }
  ];

  var REGIONAL_HUBS = [
    { city: 'Bengaluru (Koramangala & Indiranagar)', pets: 486, share: '39.2%', visits: '4.8 / yr', vaxRate: '96.4%', plan: '48.2%' },
    { city: 'Mumbai (Bandra, Juhu & Powai)', pets: 342, share: '27.6%', visits: '4.5 / yr', vaxRate: '94.1%', plan: '42.8%' },
    { city: 'Delhi NCR (Gurugram & Saket)', pets: 224, share: '18.1%', visits: '3.9 / yr', vaxRate: '91.8%', plan: '36.5%' },
    { city: 'Hyderabad (Jubilee Hills & Gachibowli)', pets: 118, share: '9.5%', visits: '3.6 / yr', vaxRate: '93.2%', plan: '33.9%' },
    { city: 'Pune (Kalyani Nagar & Baner)', pets: 70, share: '5.6%', visits: '3.2 / yr', vaxRate: '90.0%', plan: '28.6%' }
  ];

  function renderAnalytics(container) {
    var q = S.searchQuery.toLowerCase();
    var filteredBreeds = BREEDS_ANALYTICS.filter(function (b) {
      var matchSpecies = (S.filterVal === 'ALL' || b.species === S.filterVal);
      var matchText = b.breed.toLowerCase().includes(q) || b.riskTier.toLowerCase().includes(q) || b.species.toLowerCase().includes(q);
      return matchSpecies && matchText;
    });

    container.innerHTML = [
      '<div class="zpet-kpi-grid">',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Registered Cohort</span><span class="zpet-kpi-icon">📊</span></div><div class="zpet-kpi-val">1,240 Pets</div><div class="zpet-kpi-sub"><span class="zpet-badge-pos">+26.4% YoY</span> 72.5% Dogs • 21.8% Cats</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Sterilization Rate</span><span class="zpet-kpi-icon">✂️</span></div><div class="zpet-kpi-val">68.4%</div><div class="zpet-kpi-sub">848 Desexed pets</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Microchip RFID Rate</span><span class="zpet-kpi-icon">📡</span></div><div class="zpet-kpi-val">76.2%</div><div class="zpet-kpi-sub">945 ISO Tagged</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Avg Body Condition</span><span class="zpet-kpi-icon">⚖️</span></div><div class="zpet-kpi-val">5.2 / 9</div><div class="zpet-kpi-sub"><span class="zpet-badge-pos">Ideal</span> 58.6% in 4-5 band</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Preventive Adherence</span><span class="zpet-kpi-icon">🛡️</span></div><div class="zpet-kpi-val">84.6%</div><div class="zpet-kpi-sub">+4.8 pts vaccine compliance</div></div>',
      '</div>',

      '<div style="display:grid;grid-template-columns:1.3fr 1fr;gap:20px;margin-bottom:20px;">',
      '  <div class="zpet-card" style="padding:20px;">',
      '    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">',
      '      <div><h3 style="margin:0;font-size:15px;font-weight:700;">Life-Stage & Age Cohort Epidemiology</h3><p style="margin:2px 0 0;font-size:12px;color:#64748b;">Population pyramid across developmental life stages</p></div>',
      '      <span style="font-size:11px;background:#f1f5f9;padding:4px 8px;border-radius:4px;font-weight:600;color:#475569;">Median: 3.4 Yrs</span>',
      '    </div>',
      '    <div style="display:flex;flex-direction:column;gap:14px;">',
      '      <div style="padding:12px 14px;border-radius:8px;background:#f8fafc;border:1px solid #e2e8f0;">',
      '        <div style="display:flex;justify-content:space-between;font-weight:700;font-size:13px;margin-bottom:6px;"><span>Pediatric / Puppy & Kitten (&lt; 1 yr)</span><span style="color:#2563eb;">308 pets (24.8%)</span></div>',
      '        <div style="width:100%;height:7px;background:#e2e8f0;border-radius:4px;overflow:hidden;margin-bottom:8px;"><div style="width:24.8%;height:100%;background:#2563eb;"></div></div>',
      '        <div style="font-size:11px;color:#64748b;"><b>Clinical Focus:</b> Primary DHPPiL/Tricat series, microchipping, puppy socialization, nutritional formulas</div>',
      '      </div>',
      '      <div style="padding:12px 14px;border-radius:8px;background:#f8fafc;border:1px solid #e2e8f0;">',
      '        <div style="display:flex;justify-content:space-between;font-weight:700;font-size:13px;margin-bottom:6px;"><span>Young Adult (1 – 3 yrs)</span><span style="color:#10b981;">398 pets (32.1%)</span></div>',
      '        <div style="width:100%;height:7px;background:#e2e8f0;border-radius:4px;overflow:hidden;margin-bottom:8px;"><div style="width:32.1%;height:100%;background:#10b981;"></div></div>',
      '        <div style="font-size:11px;color:#64748b;"><b>Clinical Focus:</b> Annual booster immunization, dental prophylaxis scaling, flea & tick prevention, desexing</div>',
      '      </div>',
      '      <div style="padding:12px 14px;border-radius:8px;background:#f8fafc;border:1px solid #e2e8f0;">',
      '        <div style="display:flex;justify-content:space-between;font-weight:700;font-size:13px;margin-bottom:6px;"><span>Mature Adult (4 – 6 yrs)</span><span style="color:#f59e0b;">291 pets (23.5%)</span></div>',
      '        <div style="width:100%;height:7px;background:#e2e8f0;border-radius:4px;overflow:hidden;margin-bottom:8px;"><div style="width:23.5%;height:100%;background:#f59e0b;"></div></div>',
      '        <div style="font-size:11px;color:#64748b;"><b>Clinical Focus:</b> Caloric weight tracking, baseline blood chemistry & urinalysis, joint mobility supplements</div>',
      '      </div>',
      '      <div style="padding:12px 14px;border-radius:8px;background:#f8fafc;border:1px solid #e2e8f0;">',
      '        <div style="display:flex;justify-content:space-between;font-weight:700;font-size:13px;margin-bottom:6px;"><span>Senior Companion (7 – 10 yrs)</span><span style="color:#8b5cf6;">176 pets (14.2%)</span></div>',
      '        <div style="width:100%;height:7px;background:#e2e8f0;border-radius:4px;overflow:hidden;margin-bottom:8px;"><div style="width:14.2%;height:100%;background:#8b5cf6;"></div></div>',
      '        <div style="font-size:11px;color:#64748b;"><b>Clinical Focus:</b> Geriatric screening, renal SDMA biomarker panels, cardiac doppler ultrasound, arthritis analgesia</div>',
      '      </div>',
      '      <div style="padding:12px 14px;border-radius:8px;background:#f8fafc;border:1px solid #e2e8f0;">',
      '        <div style="display:flex;justify-content:space-between;font-weight:700;font-size:13px;margin-bottom:6px;"><span>Super Senior / Geriatric (11+ yrs)</span><span style="color:#ef4444;">67 pets (5.4%)</span></div>',
      '        <div style="width:100%;height:7px;background:#e2e8f0;border-radius:4px;overflow:hidden;margin-bottom:8px;"><div style="width:5.4%;height:100%;background:#ef4444;"></div></div>',
      '        <div style="font-size:11px;color:#64748b;"><b>Clinical Focus:</b> Cognitive dysfunction support, palliative comfort protocols, sub-Q hydration therapy</div>',
      '      </div>',
      '    </div>',
      '  </div>',

      '  <div style="display:flex;flex-direction:column;gap:20px;">',
      '    <div class="zpet-card" style="padding:20px;">',
      '      <h3 style="margin:0 0 4px;font-size:15px;font-weight:700;">Body Condition Score (BCS 1–9)</h3>',
      '      <p style="margin:0 0 14px;font-size:12px;color:#64748b;">Nutritional stratification across registered population</p>',
      '      <div style="display:flex;flex-direction:column;gap:10px;">',
      '        <div style="padding:10px 12px;border-radius:6px;background:#f8fafc;border:1px solid #e2e8f0;">',
      '          <div style="display:flex;justify-content:space-between;font-size:12px;font-weight:700;margin-bottom:4px;"><span>BCS 1-3 (Underweight)</span><span style="color:#3b82f6;">52 pets (4.2%)</span></div>',
      '          <div style="width:100%;height:6px;background:#e2e8f0;border-radius:3px;overflow:hidden;margin-bottom:4px;"><div style="width:4.2%;height:100%;background:#3b82f6;"></div></div>',
      '          <div style="font-size:11px;color:#64748b;">High-density caloric nutrition & deworming</div>',
      '        </div>',
      '        <div style="padding:10px 12px;border-radius:6px;background:#f8fafc;border:1px solid #e2e8f0;">',
      '          <div style="display:flex;justify-content:space-between;font-size:12px;font-weight:700;margin-bottom:4px;"><span>BCS 4-5 (Ideal & Optimal)</span><span style="color:#10b981;">727 pets (58.6%)</span></div>',
      '          <div style="width:100%;height:6px;background:#e2e8f0;border-radius:3px;overflow:hidden;margin-bottom:4px;"><div style="width:58.6%;height:100%;background:#10b981;"></div></div>',
      '          <div style="font-size:11px;color:#64748b;">Balanced maintenance diet & regular exercise</div>',
      '        </div>',
      '        <div style="padding:10px 12px;border-radius:6px;background:#f8fafc;border:1px solid #e2e8f0;">',
      '          <div style="display:flex;justify-content:space-between;font-size:12px;font-weight:700;margin-bottom:4px;"><span>BCS 6-7 (Overweight)</span><span style="color:#f59e0b;">327 pets (26.4%)</span></div>',
      '          <div style="width:100%;height:6px;background:#e2e8f0;border-radius:3px;overflow:hidden;margin-bottom:4px;"><div style="width:26.4%;height:100%;background:#f59e0b;"></div></div>',
      '          <div style="font-size:11px;color:#64748b;">Caloric restriction & portion management</div>',
      '        </div>',
      '        <div style="padding:10px 12px;border-radius:6px;background:#f8fafc;border:1px solid #e2e8f0;">',
      '          <div style="display:flex;justify-content:space-between;font-size:12px;font-weight:700;margin-bottom:4px;"><span>BCS 8-9 (Clinically Obese)</span><span style="color:#ef4444;">134 pets (10.8%)</span></div>',
      '          <div style="width:100%;height:6px;background:#e2e8f0;border-radius:3px;overflow:hidden;margin-bottom:4px;"><div style="width:10.8%;height:100%;background:#ef4444;"></div></div>',
      '          <div style="font-size:11px;color:#64748b;">Satiety metabolic diet & endocrinology workup</div>',
      '        </div>',
      '      </div>',
      '    </div>',

      '    <div class="zpet-card" style="padding:20px;">',
      '      <h3 style="margin:0 0 12px;font-size:14px;font-weight:700;">Gender & Reproductive Status</h3>',
      '      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">',
      '        <div style="padding:10px;background:#eff6ff;border-radius:8px;border:1px solid #bfdbfe;text-align:center;"><div style="font-size:18px;font-weight:800;color:#1d4ed8;">482</div><div style="font-size:11px;font-weight:600;color:#1e40af;">Neutered Males (38.9%)</div></div>',
      '        <div style="padding:10px;background:#fdf2f8;border-radius:8px;border:1px solid #fbcfe8;text-align:center;"><div style="font-size:18px;font-weight:800;color:#be185d;">366</div><div style="font-size:11px;font-weight:600;color:#9d174d;">Spayed Females (29.5%)</div></div>',
      '        <div style="padding:10px;background:#f8fafc;border-radius:8px;border:1px solid #e2e8f0;text-align:center;"><div style="font-size:18px;font-weight:800;color:#475569;">218</div><div style="font-size:11px;font-weight:600;color:#64748b;">Intact Males (17.6%)</div></div>',
      '        <div style="padding:10px;background:#f8fafc;border-radius:8px;border:1px solid #e2e8f0;text-align:center;"><div style="font-size:18px;font-weight:800;color:#475569;">174</div><div style="font-size:11px;font-weight:600;color:#64748b;">Intact Females (14.0%)</div></div>',
      '      </div>',
      '    </div>',
      '  </div>',
      '</div>',

      '<div class="zpet-toolbar">',
      '  <div class="zpet-search-wrap">',
      '    <span>🔍</span>',
      '    <input type="text" class="zpet-search-input" placeholder="Search breed demographics or risk factors..." value="' + S.searchQuery + '" oninput="window.ZenvePetsDashboard.setSearch(this.value)">',
      '  </div>',
      '  <div class="zpet-filter-pills">',
      ['ALL', 'Canine', 'Feline', 'Avian'].map(function (f) {
        var act = (S.filterVal === f) ? ' active' : '';
        return '<button type="button" class="zpet-pill' + act + '" onclick="window.ZenvePetsDashboard.setFilter(\'' + f + '\')">' + f + '</button>';
      }).join(''),
      '  </div>',
      '</div>',

      '<div class="zpet-card" style="margin-bottom:20px;">',
      '  <div class="zpet-card-header"><h3 class="zpet-card-title">Breed Demographics & Genetic Predisposition Matrix</h3><span style="font-size:12px;color:#64748b;">' + filteredBreeds.length + ' Breeds Tracked</span></div>',
      '  <div class="zpet-table-wrap">',
      '    <table class="zpet-table">',
      '      <thead><tr><th>Breed & Species</th><th>Census Count</th><th>Share %</th><th>Avg Age</th><th>Vaccine %</th><th>Microchipped %</th><th>Predisposed Risk Tier</th></tr></thead>',
      '      <tbody>',
      filteredBreeds.map(function (b) {
        var rCls = b.riskTier.includes('High') ? 'zpet-pill-red' : b.riskTier.includes('Mod') ? 'zpet-pill-yellow' : 'zpet-pill-green';
        return '<tr>' +
          '  <td><b>' + b.breed + '</b> <span style="font-size:11px;color:#64748b;">(' + b.species + ')</span></td>' +
          '  <td style="font-weight:700;">' + b.count + '</td>' +
          '  <td><b>' + b.pct + '%</b></td>' +
          '  <td>' + b.avgAge + '</td>' +
          '  <td style="color:#059669;font-weight:700;">' + b.vaxRate + '</td>' +
          '  <td style="color:#2563eb;font-weight:700;">' + b.microchipRate + '</td>' +
          '  <td><span class="zpet-pill-badge ' + rCls + '">' + b.riskTier + '</span></td>' +
          '</tr>';
      }).join(''),
      '      </tbody>',
      '    </table>',
      '  </div>',
      '</div>',

      '<div class="zpet-card" style="padding:20px;">',
      '  <h3 style="margin:0 0 4px;font-size:15px;font-weight:700;">Regional Clinic Hub Distribution & Health Plan Adoption</h3>',
      '  <p style="margin:0 0 16px;font-size:12px;color:#64748b;">Active cohort concentration, clinic visit cadence, and care plan adoption</p>',
      '  <div class="zpet-table-wrap">',
      '    <table class="zpet-table">',
      '      <thead><tr><th>Regional Clinic Hub</th><th>Enrolled Cohort</th><th>National Share</th><th>Avg Visits / Pet / Yr</th><th>Vaccine Adherence</th><th>Care+ Plan Adoption</th></tr></thead>',
      '      <tbody>',
      REGIONAL_HUBS.map(function (rh) {
        return '<tr>' +
          '  <td><b>' + rh.city + '</b></td>' +
          '  <td style="color:#2563eb;font-weight:700;">' + rh.pets + '</td>' +
          '  <td>' + rh.share + '</td>' +
          '  <td>' + rh.visits + '</td>' +
          '  <td style="color:#059669;font-weight:700;">' + rh.vaxRate + '</td>' +
          '  <td><span class="zpet-pill-badge zpet-pill-blue">' + rh.plan + '</span></td>' +
          '</tr>';
      }).join(''),
      '      </tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('\n');
  }

  /* ── 9. Pet Health Insights ── */
  var BIOMARKERS = [
    { test: 'Symmetric Dimethylarginine (SDMA)', indication: 'Early Renal Nephron Loss (Feline/Canine)', tested: 342, normal: 312, atRisk: 24, pathological: 6, action: 'Early CKD Renal Diet & Hydration' },
    { test: 'Canine NT-proBNP Cardiac Biomarker', indication: 'Myocardial Wall Stress & MMVD Progression', tested: 188, normal: 156, atRisk: 21, pathological: 11, action: 'Cardiac Ultrasound & Pimobendan' },
    { test: 'Fasting Blood Glucose & Fructosamine', indication: 'Endocrine & Diabetes Mellitus Screening', tested: 260, normal: 242, atRisk: 14, pathological: 4, action: 'Glargine Insulin & Satiety Diet' },
    { test: 'Urine Protein:Creatinine (UPC) Ratio', indication: 'Glomerular Proteinuria & Renal Disease', tested: 215, normal: 198, atRisk: 12, pathological: 5, action: 'ACE Inhibitor (Benazepril) Therapy' },
    { test: 'Feline Spec fPL (Pancreatic Lipase)', indication: 'Acute / Chronic Feline Pancreatitis', tested: 144, normal: 128, atRisk: 10, pathological: 6, action: 'Anti-emetic, Analgesia, Ultra-low Fat Diet' }
  ];

  function renderInsights(container) {
    var q = S.searchQuery.toLowerCase();
    var list = INSIGHTS.filter(function (ins) {
      var matchFilter = (S.filterVal === 'ALL' || ins.severity === S.filterVal || ins.category === S.filterVal);
      var matchText = ins.title.toLowerCase().includes(q) || ins.description.toLowerCase().includes(q) || ins.cohort.toLowerCase().includes(q);
      return matchFilter && matchText;
    });

    container.innerHTML = [
      '<div class="zpet-kpi-grid">',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Population Health Index</span><span class="zpet-kpi-icon">🧠</span></div><div class="zpet-kpi-val">91.2/100</div><div class="zpet-kpi-sub"><span class="zpet-badge-pos">Optimal</span> Low morbidity risk</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Active Surveillance</span><span class="zpet-kpi-icon">🚨</span></div><div class="zpet-kpi-val">5 Live Alerts</div><div class="zpet-kpi-sub">2 Critical, 3 Warnings</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Early Morbidity Staging</span><span class="zpet-kpi-icon">🛡️</span></div><div class="zpet-kpi-val">88.5%</div><div class="zpet-kpi-sub">+6.2 pts YoY detection rate</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Parent Recall Action</span><span class="zpet-kpi-icon">📱</span></div><div class="zpet-kpi-val">81.4%</div><div class="zpet-kpi-sub">642 Recalls sent</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Chronic Care Cohort</span><span class="zpet-kpi-icon">🩺</span></div><div class="zpet-kpi-val">142 Pets</div><div class="zpet-kpi-sub">Remote health telemetry</div></div>',
      '</div>',

      '<div class="zpet-toolbar">',
      '  <div class="zpet-search-wrap">',
      '    <span>🔍</span>',
      '    <input type="text" class="zpet-search-input" placeholder="Search insights by condition, breed, symptom..." value="' + S.searchQuery + '" oninput="window.ZenvePetsDashboard.setSearch(this.value)">',
      '  </div>',
      '  <div class="zpet-filter-pills">',
      ['ALL', 'Critical', 'Warning', 'Milestone'].map(function (f) {
        var act = (S.filterVal === f) ? ' active' : '';
        return '<button type="button" class="zpet-pill' + act + '" onclick="window.ZenvePetsDashboard.setFilter(\'' + f + '\')">' + f + '</button>';
      }).join(''),
      '  </div>',
      '</div>',

      '<div style="display:flex;flex-direction:column;gap:16px;margin-bottom:24px;">',
      list.map(function (ins) {
        var sevCls = (ins.severity === 'Critical') ? 'zpet-pill-red' : (ins.severity === 'Warning') ? 'zpet-pill-yellow' : 'zpet-pill-green';
        return '<div class="zpet-card" style="padding:22px 24px;">' +
          '  <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;flex-wrap:wrap;gap:10px;">' +
          '    <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">' +
          '      <span class="zpet-pill-badge ' + sevCls + '">' + ins.category + '</span>' +
          '      <h3 style="margin:0;font-size:15px;font-weight:700;">' + ins.title + '</h3>' +
          '      <span style="font-size:11px;color:#64748b;background:#f1f5f9;padding:2px 8px;border-radius:4px;">' + ins.timeframe + '</span>' +
          '    </div>' +
          '    <div style="display:flex;align-items:center;gap:10px;">' +
          '      <span style="font-family:monospace;font-weight:700;font-size:13px;color:#2563eb;background:#eff6ff;padding:4px 10px;border-radius:6px;">' + ins.metric + '</span>' +
          '      <span style="font-size:11px;font-weight:600;color:#059669;background:#ecfdf5;padding:4px 8px;border-radius:6px;">' + ins.preventable + '</span>' +
          '    </div>' +
          '  </div>' +
          '  <p style="margin:0 0 14px;font-size:13px;color:#475569;line-height:1.6;">' + ins.description + '</p>' +
          '  <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:14px 18px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:14px;">' +
          '    <div style="flex:1;min-width:280px;">' +
          '      <div style="font-size:13px;color:#0f172a;margin-bottom:4px;"><strong style="color:#2563eb;">💡 Recommended Protocol:</strong> ' + ins.recommendation + '</div>' +
          '      <div style="font-size:11px;color:#64748b;">Target Cohort: <strong style="color:#334155;">' + ins.cohort + '</strong> • Impact: <strong style="color:#334155;">' + ins.impact + '</strong></div>' +
          '    </div>' +
          '    <div style="display:flex;gap:8px;">' +
          '      <button type="button" class="zpet-btn zpet-btn-primary" style="font-size:12px;padding:8px 14px;" onclick="window.ZenvePetsDashboard.triggerInsightById(\'' + ins.id + '\', \'primary\')">⚡ ' + ins.actionLabel + '</button>' +
          '      <button type="button" class="zpet-btn zpet-btn-secondary" style="font-size:12px;padding:8px 12px;" onclick="window.ZenvePetsDashboard.triggerInsightById(\'' + ins.id + '\', \'export\')">Export Cohort</button>' +
          '    </div>' +
          '  </div>' +
          '</div>';
      }).join(''),
      '</div>',

      '<div class="zpet-card" style="padding:20px;">',
      '  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">',
      '    <div><h3 style="margin:0;font-size:15px;font-weight:700;">Biomarker Surveillance & Subclinical Pathology Clustering</h3><p style="margin:2px 0 0;font-size:12px;color:#64748b;">Early diagnostic biomarker testing across registered patients</p></div>',
      '    <span style="font-size:11px;color:#2563eb;font-weight:600;background:#eff6ff;padding:4px 10px;border-radius:4px;">1,149 Panels Screened</span>',
      '  </div>',
      '  <div class="zpet-table-wrap">',
      '    <table class="zpet-table">',
      '      <thead><tr><th>Diagnostic Biomarker</th><th>Clinical Indication</th><th>Tested Count</th><th>Normal Cohort</th><th>At-Risk / Borderline</th><th>Pathological</th><th>Proactive Intervention</th></tr></thead>',
      '      <tbody>',
      BIOMARKERS.map(function (bm) {
        return '<tr>' +
          '  <td><b>' + bm.test + '</b></td>' +
          '  <td style="color:#64748b;">' + bm.indication + '</td>' +
          '  <td style="font-weight:600;">' + bm.tested + '</td>' +
          '  <td style="color:#059669;font-weight:700;">' + bm.normal + '</td>' +
          '  <td style="color:#d97706;font-weight:700;"><span class="zpet-pill-badge zpet-pill-yellow">' + bm.atRisk + '</span></td>' +
          '  <td style="color:#dc2626;font-weight:700;"><span class="zpet-pill-badge zpet-pill-red">' + bm.pathological + '</span></td>' +
          '  <td style="color:#2563eb;font-weight:600;font-size:12px;">' + bm.action + '</td>' +
          '</tr>';
      }).join(''),
      '      </tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('\n');
  }

  function triggerInsightById(id, type) {
    var ins = INSIGHTS.find(function(item) { return item.id === id; });
    if (!ins) return;
    var label = (type === 'primary') ? ins.actionLabel : 'Export Patient Cohort EHRs';
    triggerInsightAction(ins.title, label);
  }

  function triggerInsightAction(title, actionLabel) {
    var toast = document.createElement('div');
    toast.className = 'zpet-toast';
    toast.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:999999;background:#0f172a;color:#ffffff;padding:14px 22px;border-radius:8px;font-size:13px;font-weight:600;box-shadow:0 10px 25px rgba(0,0,0,0.25);display:flex;align-items:center;gap:10px;border-left:4px solid #2563eb;animation:fadeIn 0.2s ease;';
    toast.innerHTML = '<span>⚡</span><span><b>Action Executed:</b> ' + actionLabel + ' for <em>' + title + '</em></span>';
    document.body.appendChild(toast);
    setTimeout(function() {
      toast.style.transition = 'opacity 0.4s ease';
      toast.style.opacity = '0';
      setTimeout(function() { toast.remove(); }, 400);
    }, 3500);
  }

  /* ── Tab Switching & Open/Close ───────────────────────────────────── */
  function open(tab) {
    ensureRoot();
    if (tab && MODULES.some(function (m) { return m.id === tab; })) {
      S.tab = tab;
    }
    S.open = true;
    root.classList.add('zpanel-open');
    renderContent();

    var targetHash = (MODULES.find(function (m) { return m.id === S.tab; }) || {}).hash || '#all-pets';
    if (window.location.hash !== targetHash) {
      history.pushState(null, '', targetHash);
    }
  }

  function close() {
    if (!root) return;
    S.open = false;
    root.classList.remove('zpanel-open');
    if (window.location.hash.startsWith('#pet') || window.location.hash.startsWith('#all-pet') || window.location.hash.startsWith('#vaccin') || window.location.hash.startsWith('#treatment') || window.location.hash.startsWith('#prescription') || window.location.hash.startsWith('#purchase')) {
      history.pushState(null, '', window.location.pathname + window.location.search);
    }
  }

  function switchTab(tab) {
    if (!MODULES.some(function (m) { return m.id === tab; })) return;
    S.tab = tab;
    S.searchQuery = '';
    S.filterVal = 'ALL';
    renderContent();
    var targetHash = (MODULES.find(function (m) { return m.id === tab; }) || {}).hash || '#all-pets';
    history.pushState(null, '', targetHash);
  }

  function setSearch(val) {
    S.searchQuery = val;
    renderContent();
  }

  function setFilter(val) {
    S.filterVal = val;
    renderContent();
  }

  /* ── Modals & CSV Export ─────────────────────────────────────────── */
  function showAddModal() {
    var modalHtml = [
      '<div class="zpet-modal-overlay open" id="zpet-add-modal">',
      '  <div class="zpet-modal">',
      '    <div class="zpet-modal-head">',
      '      <h3 class="zpet-modal-title">➕ Enroll New Companion Animal</h3>',
      '      <button type="button" class="zpet-btn-close" onclick="document.getElementById(\'zpet-add-modal\').remove()">✕</button>',
      '    </div>',
      '    <div class="zpet-modal-body">',
      '      <div class="zpet-form-group"><label>Pet Name</label><input type="text" id="zm-name" class="zpet-form-control" placeholder="e.g. Leo"></div>',
      '      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">',
      '        <div class="zpet-form-group"><label>Species</label><select id="zm-species" class="zpet-form-control"><option>Canine</option><option>Feline</option><option>Avian</option><option>Exotic</option></select></div>',
      '        <div class="zpet-form-group"><label>Breed</label><input type="text" id="zm-breed" class="zpet-form-control" placeholder="e.g. Beagle"></div>',
      '      </div>',
      '      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">',
      '        <div class="zpet-form-group"><label>Age</label><input type="text" id="zm-age" class="zpet-form-control" placeholder="e.g. 1 yr 4 mos"></div>',
      '        <div class="zpet-form-group"><label>Gender</label><select id="zm-gender" class="zpet-form-control"><option>Male (Neutered)</option><option>Male (Intact)</option><option>Female (Spayed)</option><option>Female (Intact)</option></select></div>',
      '      </div>',
      '      <div class="zpet-form-group"><label>Pet Parent Name & Phone</label><input type="text" id="zm-parent" class="zpet-form-control" placeholder="e.g. Sameer Joshi (+91 98201 00000)"></div>',
      '      <div class="zpet-form-group"><label>Microchip RFID (ISO 11784/11785)</label><input type="text" id="zm-chip" class="zpet-form-control" placeholder="e.g. 981098102344199"></div>',
      '    </div>',
      '    <div class="zpet-modal-foot">',
      '      <button type="button" class="zpet-btn zpet-btn-secondary" onclick="document.getElementById(\'zpet-add-modal\').remove()">Cancel</button>',
      '      <button type="button" class="zpet-btn zpet-btn-primary" onclick="window.ZenvePetsDashboard.submitAddPet()">Save & Generate Passport</button>',
      '    </div>',
      '  </div>',
      '</div>'
    ].join('\n');

    var wrap = document.createElement('div');
    wrap.innerHTML = modalHtml;
    document.body.appendChild(wrap.firstElementChild);
  }

  function submitAddPet() {
    var name = document.getElementById('zm-name').value;
    var species = document.getElementById('zm-species').value;
    var breed = document.getElementById('zm-breed').value;
    var age = document.getElementById('zm-age').value;
    var gender = document.getElementById('zm-gender').value;
    var parent = document.getElementById('zm-parent').value;
    var chip = document.getElementById('zm-chip').value;

    if (!name || !breed || !parent) {
      alert('Please fill out pet name, breed, and parent details.');
      return;
    }

    var newId = 'PET-' + (100 + PETS.length + 1);
    var avatar = species === 'Canine' ? '🐕' : species === 'Feline' ? '🐈' : species === 'Avian' ? '🦜' : '🐾';

    PETS.unshift({
      id: newId,
      name: name,
      species: species,
      breed: breed,
      age: age || '1 yr',
      gender: gender,
      parent: parent,
      phone: '+91 98000 00000',
      city: 'Bengaluru',
      healthScore: 98,
      vaxStatus: 'Up to Date',
      microchip: chip || '981098102344' + Math.floor(100 + Math.random() * 900),
      avatar: avatar
    });

    var modal = document.getElementById('zpet-add-modal');
    if (modal) modal.remove();

    renderContent();
    showToast('Enrolled ' + name + ' into Pets 360° master database (' + newId + ')');
  }

  function exportTabCSV() {
    var rows = [];
    var filename = 'zenve-pets-360-' + S.tab + '.csv';

    if (S.tab === 'all-pets') {
      rows.push(['Pet ID', 'Name', 'Species', 'Breed', 'Age', 'Gender', 'Parent', 'Phone', 'City', 'Health Score', 'Vaccine Status', 'Microchip']);
      PETS.forEach(function (p) {
        rows.push([p.id, p.name, p.species, p.breed, p.age, p.gender, p.parent, p.phone, p.city, p.healthScore, p.vaxStatus, p.microchip]);
      });
    } else if (S.tab === 'pet-health-records') {
      rows.push(['Record ID', 'Date', 'Pet', 'Type', 'Vitals', 'Diagnosis', 'Attending Vet', 'Status']);
      HEALTH_RECORDS.forEach(function (r) {
        rows.push([r.id, r.date, r.pet, r.type, r.vitals, r.diagnosis, r.vet, r.status]);
      });
    } else if (S.tab === 'vaccination-records') {
      rows.push(['Pass ID', 'Pet', 'Vaccine', 'Manufacturer', 'Batch', 'Administered', 'Next Due', 'Vet', 'Status']);
      VACCINATIONS.forEach(function (v) {
        rows.push([v.passId, v.pet, v.vaccine, v.manufacturer, v.batch, v.administeredOn, v.nextDue, v.vet, v.status]);
      });
    } else if (S.tab === 'treatment-history') {
      rows.push(['Treatment ID', 'Date', 'Pet', 'Condition', 'Procedure', 'Duration', 'Clinician', 'Cost', 'Outcome']);
      TREATMENTS.forEach(function (t) {
        rows.push([t.id, t.date, t.pet, t.condition, t.procedure, t.duration, t.vet, t.cost, t.outcome]);
      });
    } else if (S.tab === 'prescription-history') {
      rows.push(['Rx ID', 'Date', 'Pet', 'Medicine', 'Dosage', 'Indication', 'Prescriber', 'Pharmacy Status']);
      PRESCRIPTIONS.forEach(function (p) {
        rows.push([p.id, p.date, p.pet, p.medicine, p.dosage, p.indication, p.prescriber, p.pharmacyStatus]);
      });
    } else {
      rows.push(['Order ID', 'Date', 'Pet', 'Item', 'Category', 'Channel', 'Parent', 'Amount', 'Status']);
      PURCHASES.forEach(function (p) {
        rows.push([p.id, p.date, p.pet, p.item, p.category, p.channel, p.parent, p.amount, p.status]);
      });
    }

    var csvContent = 'data:text/csv;charset=utf-8,' + rows.map(function (e) {
      return e.map(function (item) { return '"' + String(item).replace(/"/g, '""') + '"'; }).join(',');
    }).join('\n');

    var encodedUri = encodeURI(csvContent);
    var link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
    showToast('Exported ' + filename);
  }

  /* ── Hash & Navigation Handlers ───────────────────────────────────── */
  function tabFromHash(h) {
    if (!h) return null;
    var clean = h.toLowerCase().trim();
    if (clean === '#all-pets' || clean === '#all-pet' || clean === '#pets' || clean === '#pets-360' || clean === '#pets360' || clean === '#pet-360') return 'all-pets';
    if (clean === '#pet-profiles' || clean === '#profiles') return 'pet-profiles';
    if (clean === '#pet-health-records' || clean === '#health-records' || clean === '#ehr') return 'pet-health-records';
    if (clean === '#vaccination-records' || clean === '#vaccines' || clean === '#vaccine-passports') return 'vaccination-records';
    if (clean === '#treatment-history' || clean === '#treatments-history') return 'treatment-history';
    if (clean === '#prescription-history' || clean === '#prescriptions') return 'prescription-history';
    if (clean === '#purchase-history' || clean === '#pet-purchases') return 'purchase-history';
    if (clean === '#pet-analytics' || clean === '#pet-demographics') return 'pet-analytics';
    if (clean === '#pet-health-insights' || clean === '#health-insights') return 'pet-health-insights';
    return null;
  }

  // Global Click Interception for Sidebar Items
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t) return;
    var btn = t.closest('button, a, li');
    if (!btn) return;
    var text = (btn.textContent || '').trim().toLowerCase();

    var map = {
      'all pets': 'all-pets',
      'pets 360°': 'all-pets',
      'pets 360': 'all-pets',
      'pet 360': 'all-pets',
      'pet profiles': 'pet-profiles',
      'pet health records': 'pet-health-records',
      'vaccination records': 'vaccination-records',
      'treatment history': 'treatment-history',
      'prescription history': 'prescription-history',
      'purchase history': 'purchase-history',
      'pet analytics': 'pet-analytics',
      'pet health insights': 'pet-health-insights'
    };

    for (var key in map) {
      if (text === key || text.startsWith(key + ' ') || (btn.getAttribute('href') && btn.getAttribute('href').includes(key.replace(/ /g, '-')))) {
        var group = btn.closest('div, section, nav');
        var groupText = group ? group.textContent : '';
        if (groupText && groupText.indexOf('Pets 360') === -1 && groupText.indexOf('Pet') === -1 && !t.closest('#zpet-root')) {
          if (map[key] !== 'pet-health-records' && map[key] !== 'vaccination-records' && map[key] !== 'prescription-history' && map[key] !== 'treatment-history') {
            return;
          }
        }

        if (!t.closest('#zpet-root')) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          open(map[key]);
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
    } else if (S.open && !window.location.hash.startsWith('#pet') && !window.location.hash.startsWith('#all-pet') && !window.location.hash.startsWith('#vaccin') && !window.location.hash.startsWith('#treatment') && !window.location.hash.startsWith('#prescription') && !window.location.hash.startsWith('#purchase')) {
      close();
    }
  });

  /* ── Export Global API ────────────────────────────────────────────── */
  window.ZenvePetsDashboard = {
    open: open,
    close: close,
    switchTab: switchTab,
    setSearch: setSearch,
    setFilter: setFilter,
    showAddModal: showAddModal,
    submitAddPet: submitAddPet,
    exportTabCSV: exportTabCSV,
    triggerInsightAction: triggerInsightAction,
    triggerInsightById: triggerInsightById
  };

  // Auto-launch if hash matches
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      var tab = tabFromHash(window.location.hash);
      if (tab) setTimeout(function () { open(tab); }, 300);
    });
  } else {
    var tab = tabFromHash(window.location.hash);
    if (tab) setTimeout(function () { open(tab); }, 300);
  }
})();
