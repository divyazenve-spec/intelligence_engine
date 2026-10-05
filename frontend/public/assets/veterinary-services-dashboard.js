/* =====================================================================
   Zenve BI — Veterinary Services Executive Control Center
   Sidebar: Veterinary Services Suite (9 Subdomains)
   Pure Light Executive Design System
   ===================================================================== */

(function () {
  'use strict';

  var MODULES = [
    { id: 'overview', label: 'Services Dashboard', icon: '🩺', hash: '#services-dashboard', title: 'Veterinary Clinical Operations Control Center', sub: 'Master clinical floor dashboard: consultations throughput, triage queues, surgeries, and revenue' },
    { id: 'consultations', label: 'Consultations', icon: '👨‍⚕️', hash: '#consultations', title: 'Outpatient Consultations & Clinical Triage', sub: 'In-clinic encounters, video telehealth consults, chief complaints, diagnostic triage, and doctor allocations' },
    { id: 'appointments', label: 'Appointments', icon: '📅', hash: '#appointments', title: 'Appointment Scheduling & Clinic Capacity', sub: 'Calendar capacity, slot utilization, doctor availability, walk-in queues, and no-show prevention' },
    { id: 'treatments', label: 'Treatments', icon: '💊', hash: '#treatments', title: 'Inpatient Care, ICU & Chronic Treatment Regimens', sub: 'Ward bed occupancy, fluid therapy rates, surgical recovery milestones, chronic medical protocols, and discharge ready' },
    { id: 'vaccinations', label: 'Vaccinations', icon: '💉', hash: '#vaccinations', title: 'Immunization Schedules & Biological Lot Tracking', sub: 'Canine & feline vaccination schedules, IoT cold-chain batch tracking, booster recalls, and digital health pass generation' },
    { id: 'diagnostics', label: 'Diagnostics', icon: '🔬', hash: '#diagnostics', title: 'Clinical Pathology, In-House Lab & Advanced Imaging', sub: 'Hematology CBC, dry biochemistry panels, digital X-Ray DR, ultrasound Doppler, and rapid PCR panels' },
    { id: 'procedures', label: 'Procedures', icon: '✂️', hash: '#procedures', title: 'Surgical Operations & Sterile Theater Suite', sub: 'Sterile OT occupancy, orthopedic/soft tissue surgeries, inhalation anesthesia logs, and recovery PACU' },
    { id: 'revenue', label: 'Service Revenue', icon: '💰', hash: '#service-revenue', title: 'Clinical Revenue & Specialty Billings', sub: 'Financial billings by medical specialty, multi-clinic branch contributions, doctor splits, and average case value' },
    { id: 'profitability', label: 'Service Profitability', icon: '📈', hash: '#service-profitability', title: 'Clinical Unit Economics & Margin Diagnostics', sub: 'Gross contribution margins per service line, doctor commission expense analysis, and EBITDA contribution' }
  ];

  var S = {
    open: false,
    tab: 'overview',
    searchQuery: '',
    filterVal: 'ALL'
  };

  var root = null;

  /* ── Master Mock Clinical Datasets ────────────────────────────────── */
  var CONSULTATIONS = [
    { id: 'CNS-8801', pet: 'Bruno (Golden Retriever)', parent: 'Vikram Singhania', doctor: 'Dr. Priya Sharma', specialty: 'General Medicine', mode: 'In-Clinic', diagnosis: 'Dietary Indiscretion (Enteritis)', fee: '₹950', status: 'Completed', time: '09:30 AM' },
    { id: 'CNS-8802', pet: 'Milo (Persian Cat)', parent: 'Ananya Deshmukh', doctor: 'Dr. Aisha Khan', specialty: 'Feline Medicine', mode: 'Video Telehealth', diagnosis: 'Early Feline Lower Urinary (FLUTD)', fee: '₹750', status: 'In Consultation', time: '10:15 AM' },
    { id: 'CNS-8803', pet: 'Rocky (German Shepherd)', parent: 'Rohan Mehta', doctor: 'Dr. Rahul Mehta', specialty: 'Orthopedics', mode: 'In-Clinic', diagnosis: 'CCL Partial Ligament Tear', fee: '₹1,400', status: 'Completed', time: '11:00 AM' },
    { id: 'CNS-8804', pet: 'Simba (Beagle)', parent: 'Pooja Nair', doctor: 'Dr. Karan Patel', specialty: 'Dermatology', mode: 'In-Clinic', diagnosis: 'Malassezia Otitis Externa & Atopy', fee: '₹1,100', status: 'Waiting in Triage', time: '11:45 AM' },
    { id: 'CNS-8805', pet: 'Bella (Shih Tzu)', parent: 'Kavita Rao', doctor: 'Dr. Neha Singh', specialty: 'Cardiology', mode: 'In-Clinic', diagnosis: 'Stage B2 Mitral Valve Disease', fee: '₹1,800', status: 'Completed', time: '12:30 PM' },
    { id: 'CNS-8806', pet: 'Leo (Indie Pup)', parent: 'Sameer Joshi', doctor: 'Dr. Priya Sharma', specialty: 'Pediatrics', mode: 'Home Visit', diagnosis: 'Puppy Wellness Exam & Deworm', fee: '₹1,250', status: 'Scheduled', time: '02:00 PM' },
    { id: 'CNS-8807', pet: 'Oreo (Domestic Shorthair)', parent: 'Farhan Akhtar', doctor: 'Dr. Aisha Khan', specialty: 'Dental / Oral', mode: 'In-Clinic', diagnosis: 'Grade 3 Periodontitis & Calculus', fee: '₹1,150', status: 'Scheduled', time: '03:15 PM' },
    { id: 'CNS-8808', pet: 'Max (Labrador)', parent: 'Siddharth Roy', doctor: 'Dr. Rahul Mehta', specialty: 'Emergency / Triage', mode: 'In-Clinic', diagnosis: 'Theobromine Toxicity (Stat Care)', fee: '₹2,200', status: 'Under Observation', time: '04:00 PM' }
  ];

  var APPOINTMENTS = [
    { id: 'APT-1041', time: '09:00 AM', pet: 'Koko (Pug)', parent: 'Ramesh Sundaram', doctor: 'Dr. Priya Sharma', clinic: 'Koramangala Pet Hospital', service: 'Annual Check & Rabies Booster', type: 'Scheduled App', status: 'Confirmed' },
    { id: 'APT-1042', time: '09:30 AM', pet: 'Ginger (Tabby Cat)', parent: 'Meera Sen', doctor: 'Dr. Aisha Khan', clinic: 'Indiranagar Care Center', service: 'Senior Feline Renal Profile', type: 'Scheduled App', status: 'In Session' },
    { id: 'APT-1043', time: '10:00 AM', pet: 'Thor (Rottweiler)', parent: 'Deepak Varma', doctor: 'Dr. Rahul Mehta', clinic: 'Whitefield Specialty OT', service: 'Pre-Op Orthopedic Radiography', type: 'Referral', status: 'Arrived' },
    { id: 'APT-1044', time: '10:30 AM', pet: 'Daisy (Lhasa Apso)', parent: 'Nandita Bose', doctor: 'Dr. Karan Patel', clinic: 'Bandra West Super-Clinic', service: 'Cytology & Medicated Bath', type: 'Walk-In Priority', status: 'Confirmed' },
    { id: 'APT-1045', time: '11:15 AM', pet: 'Whiskey (Golden Ret)', parent: 'Amitabh Sen', doctor: 'Dr. Neha Singh', clinic: 'Gurugram Central Hospital', service: 'Echocardiogram & ECG Review', type: 'Scheduled App', status: 'Confirmed' },
    { id: 'APT-1046', time: '12:00 PM', pet: 'Snowy (Maltese)', parent: 'Preeti Chawla', doctor: 'Dr. Priya Sharma', clinic: 'Koramangala Pet Hospital', service: 'Puppy Booster & Microchip', type: 'Scheduled App', status: 'Scheduled' },
    { id: 'APT-1047', time: '01:30 PM', pet: 'Rocky (Doberman)', parent: 'Kabir Bakshi', doctor: 'Dr. Rahul Mehta', clinic: 'Whitefield Specialty OT', service: 'Post-Surgical Suture Removal', type: 'Follow-Up', status: 'Scheduled' }
  ];

  var TREATMENTS = [
    { id: 'TRT-401', pet: 'Casper (Husky)', parent: 'Aditya Oberoi', ward: 'Critical ICU Ward', vet: 'Dr. Neha Singh', protocol: 'Severe Heatstroke & Hyperthermia', days: 2, progress: '78%', status: 'Guarded Progress' },
    { id: 'TRT-402', pet: 'Simba (Persian Cat)', parent: 'Rashmi Sen', ward: 'Feline Special Ward', vet: 'Dr. Aisha Khan', protocol: 'FLUTD Post-Catheterization Care', days: 3, progress: '92%', status: 'Discharge Ready' },
    { id: 'TRT-403', pet: 'Shadow (Labrador)', parent: 'Manish Tiwari', ward: 'Post-Op Surgical Ward', vet: 'Dr. Rahul Mehta', protocol: 'Hemilaminectomy Spinal Rehab', days: 4, progress: '65%', status: 'Stable Recovery' },
    { id: 'TRT-404', pet: 'Ginger (Golden Ret)', parent: 'Sunita Menon', ward: 'Medical Ward A', vet: 'Dr. Priya Sharma', protocol: 'Canine Parvovirus Fluid Resuscitation', days: 5, progress: '88%', status: 'Stable Recovery' },
    { id: 'TRT-405', pet: 'Coco (Frenchie)', parent: 'Varun Grover', ward: 'Post-Op Surgical Ward', vet: 'Dr. Rahul Mehta', protocol: 'BOAS Staphylectomy Airway Post-Op', days: 1, progress: '70%', status: 'Under Observation' }
  ];

  var VACCINATIONS = [
    { id: 'VAC-991', pet: 'Cooper (Golden Ret)', species: 'Canine', vaccine: 'Nobivac DHPPi + L4 (9-in-1 Core)', batch: 'NBV-2026-X81', date: '05 Oct 2026', nextDue: '05 Oct 2027', vet: 'Dr. Priya Sharma', temp: '3.4°C', cert: 'Issued' },
    { id: 'VAC-992', pet: 'Luna (Persian Cat)', species: 'Feline', vaccine: 'Felocell 4 (FVRCP Core)', batch: 'ZTS-9410-F2', date: '05 Oct 2026', nextDue: '05 Oct 2027', vet: 'Dr. Aisha Khan', temp: '3.8°C', cert: 'Issued' },
    { id: 'VAC-993', pet: 'Rocky (Rottweiler)', species: 'Canine', vaccine: 'Defensor 3 (Anti-Rabies Core)', batch: 'DEF-8820-R1', date: '04 Oct 2026', nextDue: '04 Oct 2029', vet: 'Dr. Rahul Mehta', temp: '4.1°C', cert: 'Issued' },
    { id: 'VAC-994', pet: 'Bella (Shih Tzu Pup)', species: 'Canine', vaccine: 'Nobivac Puppy DP First Shot', batch: 'NBV-7714-P0', date: '04 Oct 2026', nextDue: '25 Oct 2026', vet: 'Dr. Priya Sharma', temp: '3.2°C', cert: 'Scheduled' },
    { id: 'VAC-995', pet: 'Simba (British Cat)', species: 'Feline', vaccine: 'Rabisin (Inactivated Rabies)', batch: 'BOE-6102-RB', date: '03 Oct 2026', nextDue: '03 Oct 2027', vet: 'Dr. Aisha Khan', temp: '3.6°C', cert: 'Issued' }
  ];

  var DIAGNOSTICS = [
    { id: 'LAB-5101', pet: 'Oscar (Beagle)', test: '18-Parameter Biochemistry + Electrolytes', modality: 'Biochemistry', vet: 'Dr. Priya Sharma', tat: '45 mins', flag: 'High BUN / Creatinine', status: 'Result Ready' },
    { id: 'LAB-5102', pet: 'Bella (Persian Cat)', test: 'Digital Abdominal Ultrasonography (Doppler)', modality: 'Ultrasound', vet: 'Dr. Aisha Khan', tat: '30 mins', flag: 'Bilateral Renal Cysts', status: 'Report Signed' },
    { id: 'LAB-5103', pet: 'Max (German Shep)', test: 'Orthopedic Digital Radiography (Stifle / Hip)', modality: 'Digital X-Ray', vet: 'Dr. Rahul Mehta', tat: '20 mins', flag: 'Joint Effusion & Osteophytes', status: 'Report Signed' },
    { id: 'LAB-5104', pet: 'Simba (Golden Ret)', test: 'Complete Blood Count (CBC) with Reticulocytes', modality: 'Hematology', vet: 'Dr. Karan Patel', tat: '25 mins', flag: 'Leukocytosis (WBC 22.4K)', status: 'Result Ready' },
    { id: 'LAB-5105', pet: 'Milo (Indie Pup)', test: 'CPV / CCV Antigen Rapid Fluorescence Immunoassay', modality: 'Pathogen PCR', vet: 'Dr. Priya Sharma', tat: '15 mins', flag: 'Parvovirus Negative', status: 'Result Ready' }
  ];

  var PROCEDURES = [
    { id: 'SUR-701', patient: 'Thor (Rottweiler)', procedure: 'TPLO Left Stifle Reconstruction', theater: 'OT 1 (Orthopedic Suite)', surgeon: 'Dr. Rahul Mehta', duration: '95 mins', anesthesia: 'Isoflurane + Epidural', status: 'Completed' },
    { id: 'SUR-702', patient: 'Daisy (Lhasa Apso)', procedure: 'Full Mouth Dental Prophylaxis & Polish', theater: 'Dental OT', surgeon: 'Dr. Priya Sharma', duration: '50 mins', anesthesia: 'Propofol Induction', status: 'Completed' },
    { id: 'SUR-703', patient: 'Coco (Frenchie)', procedure: 'BOAS Corrective Staphylectomy', theater: 'OT 2 (Soft Tissue)', surgeon: 'Dr. Rahul Mehta', duration: '75 mins', anesthesia: 'Sevoflurane + Block', status: 'In Procedure' },
    { id: 'SUR-704', patient: 'Cleo (Persian Cat)', procedure: 'Laparoscopic Assisted Ovariohysterectomy', theater: 'OT 2 (Soft Tissue)', surgeon: 'Dr. Aisha Khan', duration: '40 mins', anesthesia: 'Alfaxalone + Iso', status: 'Prep / Induction' },
    { id: 'SUR-705', patient: 'Simba (Golden Pup)', procedure: 'Endoscopic Foreign Body Retrieval', theater: 'Endoscopy OT', surgeon: 'Dr. Priya Sharma', duration: '45 mins', anesthesia: 'Propofol TIVA', status: 'Scheduled' }
  ];

  var REVENUE_DATA = [
    { specialty: 'Orthopedic & Soft Tissue Surgery', rev: '₹4,85,000', cases: 38, aov: '₹12,763', share: '32.4%', margin: '72.0%' },
    { specialty: 'Outpatient Clinical Consultations', rev: '₹3,42,000', cases: 342, aov: '₹1,000', share: '22.8%', margin: '84.0%' },
    { specialty: 'Laboratory Pathology & Diagnostics', rev: '₹2,68,000', cases: 214, aov: '₹1,252', share: '17.9%', margin: '68.5%' },
    { specialty: 'Cardiology & Diagnostic Ultrasound', rev: '₹1,84,000', cases: 68, aov: '₹2,705', share: '12.3%', margin: '74.2%' },
    { specialty: 'Dentistry & Ultrasonic Scaling', rev: '₹1,22,000', cases: 46, aov: '₹2,652', share: '8.1%', margin: '78.0%' },
    { specialty: 'Vaccinations & Biologicals', rev: '₹98,000', cases: 142, aov: '₹690', share: '6.5%', margin: '58.0%' }
  ];

  var PROFIT_DATA = [
    { service: 'Outpatient Consultations', rev: '₹3,42,000', cogs: '₹54,720', profit: '₹2,87,280', margin: '84.0%', tier: 'Highest Margin' },
    { service: 'Dental & Oral Surgery', rev: '₹1,22,000', cogs: '₹26,840', profit: '₹95,160', margin: '78.0%', tier: 'High Margin' },
    { service: 'Cardiology & Diagnostic Ultrasound', rev: '₹1,84,000', cogs: '₹47,472', profit: '₹1,36,528', margin: '74.2%', tier: 'High Margin' },
    { service: 'Orthopedic & Soft Tissue Surgery', rev: '₹4,85,000', cogs: '₹1,35,800', profit: '₹3,49,200', margin: '72.0%', tier: 'High Absolute EBITDA' },
    { service: 'In-House Laboratory Diagnostics', rev: '₹2,68,000', cogs: '₹84,420', profit: '₹1,83,580', margin: '68.5%', tier: 'Steady Margin' },
    { service: 'Vaccinations & Biologicals', rev: '₹98,000', cogs: '₹41,160', profit: '₹56,840', margin: '58.0%', tier: 'Retention Anchor' }
  ];

  /* ── Tab Helpers ──────────────────────────────────────────────────── */
  function tabFromText(t) {
    if (!t) return null;
    t = t.toLowerCase().trim();
    if (t === 'services dashboard' || t === 'veterinary services' || t === 'veterinary' || t === 'clinical operations') return 'overview';
    if (t === 'consultations') return 'consultations';
    if (t === 'appointments') return 'appointments';
    if (t === 'treatments') return 'treatments';
    if (t === 'vaccinations') return 'vaccinations';
    if (t === 'diagnostics') return 'diagnostics';
    if (t === 'procedures') return 'procedures';
    if (t === 'service revenue') return 'revenue';
    if (t === 'service profitability') return 'profitability';
    return null;
  }

  function tabFromHash(h) {
    if (!h) return null;
    h = h.toLowerCase().trim();
    if (h === '#services-dashboard' || h === '#veterinary-services' || h === '#veterinary') return 'overview';
    if (h === '#consultations') return 'consultations';
    if (h === '#appointments') return 'appointments';
    if (h === '#treatments') return 'treatments';
    if (h === '#vaccinations') return 'vaccinations';
    if (h === '#diagnostics') return 'diagnostics';
    if (h === '#procedures') return 'procedures';
    if (h === '#service-revenue') return 'revenue';
    if (h === '#service-profitability') return 'profitability';
    return null;
  }

  /* ── Close Other Overlay Panels ───────────────────────────────────── */
  function closeOthers() {
    var ids = [
      'zsd-root', 'zod-root', 'zpid-root', 'zph-root', 'zch-root',
      'zfa-root', 'zset-root', 'zalt-root', 'zrep-root', 'zsh-root',
      'zhr-dashboard-root', 'zmkt-dashboard-root', 'zvp-root',
      'zfsh-root', 'zlog-dashboard-root'
    ];
    ids.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) {
        el.style.display = 'none';
        el.classList.remove('zpanel-open');
      }
    });
  }

  /* ── Master HTML Renderer ─────────────────────────────────────────── */
  function render() {
    if (!root) return;
    var curMod = MODULES.find(function (m) { return m.id === S.tab; }) || MODULES[0];

    var chipsHtml = MODULES.map(function (m) {
      var activeCls = m.id === S.tab ? ' active' : '';
      return '<button type="button" class="zvs-chip' + activeCls + '" data-tab="' + m.id + '">' +
        '<span>' + m.icon + '</span>' +
        '<span>' + m.label + '</span>' +
        '</button>';
    }).join('');

    root.innerHTML = [
      '<header class="zvs-header">',
      '  <div class="zvs-header-left">',
      '    <div class="zvs-brand-badge">🩺</div>',
      '    <div class="zvs-title-group">',
      '      <div class="zvs-title-row">',
      '        <h1 class="zvs-main-title">' + curMod.title + '</h1>',
      '        <div class="zvs-status-badge"><span class="zvs-status-dot"></span> All 6 Hospitals Live & Accredited</div>',
      '      </div>',
      '      <div class="zvs-subtitle">' + curMod.sub + '</div>',
      '    </div>',
      '  </div>',
      '  <div class="zvs-header-right">',
      '    <button type="button" class="zvs-btn zvs-btn-secondary" id="zvs-export-btn">📊 Export CSV</button>',
      '    <button type="button" class="zvs-btn zvs-btn-secondary" id="zvs-order-lab-btn">🔬 Order Diagnostic</button>',
      '    <button type="button" class="zvs-btn zvs-btn-primary" id="zvs-book-apt-btn">+ Book Appointment</button>',
      '    <button type="button" class="zvs-btn-close" id="zvs-close-btn" title="Close Dashboard (Esc)">✕</button>',
      '  </div>',
      '</header>',
      '<nav class="zvs-nav-bar">' + chipsHtml + '</nav>',
      '<div class="zvs-content" id="zvs-body-content"></div>'
    ].join('');

    wireHeaderEvents();
    renderTabContent();
  }

  function wireHeaderEvents() {
    var chips = root.querySelectorAll('.zvs-chip');
    chips.forEach(function (c) {
      c.onclick = function () {
        var t = c.getAttribute('data-tab');
        switchTab(t);
      };
    });

    var closeBtn = root.querySelector('#zvs-close-btn');
    if (closeBtn) closeBtn.onclick = function () { close(); };

    var expBtn = root.querySelector('#zvs-export-btn');
    if (expBtn) expBtn.onclick = function () { exportTabCSV(); };

    var bookBtn = root.querySelector('#zvs-book-apt-btn');
    if (bookBtn) bookBtn.onclick = function () { showBookModal(); };

    var labBtn = root.querySelector('#zvs-order-lab-btn');
    if (labBtn) labBtn.onclick = function () { showLabModal(); };
  }

  /* ── Tab Views ────────────────────────────────────────────────────── */
  function renderTabContent() {
    var container = root.querySelector('#zvs-body-content');
    if (!container) return;

    if (S.tab === 'overview') container.innerHTML = renderOverview();
    else if (S.tab === 'consultations') container.innerHTML = renderConsultations();
    else if (S.tab === 'appointments') container.innerHTML = renderAppointments();
    else if (S.tab === 'treatments') container.innerHTML = renderTreatments();
    else if (S.tab === 'vaccinations') container.innerHTML = renderVaccinations();
    else if (S.tab === 'diagnostics') container.innerHTML = renderDiagnostics();
    else if (S.tab === 'procedures') container.innerHTML = renderProcedures();
    else if (S.tab === 'revenue') container.innerHTML = renderRevenue();
    else if (S.tab === 'profitability') container.innerHTML = renderProfitability();

    wireTabSpecificEvents();
  }

  function renderOverview() {
    return [
      '<div class="zvs-kpi-grid">',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Clinical Revenue (MTD)</span><span class="zvs-kpi-icon">💰</span></div><div class="zvs-kpi-val">₹14.99 L</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">↑ +18.4% MoM</span><span class="zvs-subtext">18% total Zenve revenue</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Total Consultations</span><span class="zvs-kpi-icon">🩺</span></div><div class="zvs-kpi-val">1,420 Pets</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">↑ +14.2% MoM</span><span class="zvs-subtext">Outpatient & Video</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Surgical Procedures</span><span class="zvs-kpi-icon">✂️</span></div><div class="zvs-kpi-val">184 Surgeries</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">↑ 100% OT Sterility</span><span class="zvs-subtext">Orthopedic & Soft Tissue</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Clinical Profit Margin</span><span class="zvs-kpi-icon">📈</span></div><div class="zvs-kpi-val">73.9%</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">↑ +2.8% YoY</span><span class="zvs-subtext">Accretive high-yield unit</span></div></div>',
      '</div>',

      '<div class="zvs-grid-2">',
      '  <div class="zvs-card">',
      '    <div class="zvs-card-head"><div><h3 class="zvs-card-title">Live Hospital Floor Status & Capacity</h3><p class="zvs-card-sub">Real-time patient intake and facility load across all 6 clinical hospitals</p></div></div>',
      '    <div style="padding:20px;display:grid;grid-template-columns:1fr 1fr;gap:12px;">',
      '      <div style="padding:14px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;"><div style="font-size:11px;color:#64748b;font-weight:700;">OUTPATIENT CLINICS</div><div style="font-size:22px;font-weight:800;color:#0f172a;margin:4px 0;">48 Consults Today</div><div style="font-size:11px;color:#16a34a;font-weight:600;">● 18 Surgeons On Duty</div></div>',
      '      <div style="padding:14px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;"><div style="font-size:11px;color:#64748b;font-weight:700;">STERILE THEATERS (OT)</div><div style="font-size:22px;font-weight:800;color:#0f172a;margin:4px 0;">3 OTs Active</div><div style="font-size:11px;color:#2563eb;font-weight:600;">● 14 Surgeries Scheduled</div></div>',
      '      <div style="padding:14px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;"><div style="font-size:11px;color:#64748b;font-weight:700;">INPATIENT & ICU WARDS</div><div style="font-size:22px;font-weight:800;color:#0f172a;margin:4px 0;">18 Pets Admitted</div><div style="font-size:11px;color:#ea580c;font-weight:600;">● 82% Bed Occupancy</div></div>',
      '      <div style="padding:14px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;"><div style="font-size:11px;color:#64748b;font-weight:700;">PATHOLOGY DIAGNOSTICS</div><div style="font-size:22px;font-weight:800;color:#0f172a;margin:4px 0;">142 Tests MTD</div><div style="font-size:11px;color:#0284c7;font-weight:600;">● 38m Turnaround Time</div></div>',
      '    </div>',
      '  </div>',

      '  <div class="zvs-card">',
      '    <div class="zvs-card-head"><div><h3 class="zvs-card-title">Veterinary Services Subdomains Directory</h3><p class="zvs-card-sub">Dedicated operational suites for specialized clinical functions</p></div></div>',
      '    <div style="padding:16px 20px;display:grid;grid-template-columns:1fr 1fr;gap:10px;">',
      MODULES.slice(1).map(function (m) {
        return '<button type="button" class="zvs-btn zvs-btn-secondary" onclick="window.ZenveVeterinaryDashboard.switchTab(\'' + m.id + '\')" style="justify-content:flex-start;padding:12px;font-size:12px;text-align:left;">' +
          '<span style="font-size:16px;">' + m.icon + '</span>' +
          '<span style="font-weight:600;color:#0f172a;">' + m.label + '</span>' +
          '</button>';
      }).join(''),
      '    </div>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderConsultations() {
    return [
      '<div class="zvs-kpi-grid">',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Consultations Today</span><span class="zvs-kpi-icon">🩺</span></div><div class="zvs-kpi-val">48 Cases</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">↑ +14.2%</span><span class="zvs-subtext">34 In-Clinic • 11 Video • 3 Home</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Avg Encounter Time</span><span class="zvs-kpi-icon">⏱️</span></div><div class="zvs-kpi-val">24.6 mins</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">↑ Detailed care</span><span class="zvs-subtext">Benchmark: 20 mins</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Active Triage Queue</span><span class="zvs-kpi-icon">🏥</span></div><div class="zvs-kpi-val">4 Patients</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">↑ 8m avg wait</span><span class="zvs-subtext">Fast-track emergency protocol</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Consultation CSAT</span><span class="zvs-kpi-icon">⭐</span></div><div class="zvs-kpi-val">4.94 / 5</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">↑ 98.8% satisfaction</span><span class="zvs-subtext">412 verified pet parent reviews</span></div></div>',
      '</div>',

      '<div class="zvs-card">',
      '  <div class="zvs-filter-bar">',
      '    <div><h3 class="zvs-card-title">Live Outpatient Encounters & Triage Records</h3></div>',
      '    <input class="zvs-input" id="zvs-cns-search" placeholder="Search pet, doctor, diagnosis..." value="' + S.searchQuery + '" style="width:260px;">',
      '  </div>',
      '  <div class="zvs-table-wrap">',
      '    <table class="zvs-table">',
      '      <thead><tr><th>Encounter ID</th><th>Pet & Companion</th><th>Pet Parent</th><th>Attending Veterinarian</th><th>Mode</th><th>Diagnosis</th><th>Fee</th><th>Status</th></tr></thead>',
      '      <tbody>',
      CONSULTATIONS.filter(function (c) {
        if (!S.searchQuery) return true;
        var q = S.searchQuery.toLowerCase();
        return c.pet.toLowerCase().indexOf(q) >= 0 || c.doctor.toLowerCase().indexOf(q) >= 0 || c.diagnosis.toLowerCase().indexOf(q) >= 0;
      }).map(function (c) {
        return [
          '<tr>',
          '  <td style="font-weight:700;color:#2563eb;font-family:monospace;">' + c.id + '</td>',
          '  <td style="font-weight:700;color:#0f172a;">' + c.pet + '</td>',
          '  <td style="color:#475569;">' + c.parent + '</td>',
          '  <td style="font-weight:600;color:#0f172a;">' + c.doctor + ' <span style="font-size:11px;color:#64748b;">(' + c.specialty + ')</span></td>',
          '  <td><span class="zvs-tag ' + (c.mode === 'Video Telehealth' ? 'blue' : c.mode === 'Home Visit' ? 'purple' : 'green') + '">' + c.mode + '</span></td>',
          '  <td style="font-weight:600;color:#0f172a;">' + c.diagnosis + '</td>',
          '  <td style="font-family:monospace;font-weight:700;color:#0f172a;">' + c.fee + '</td>',
          '  <td><span class="zvs-tag ' + (c.status === 'Completed' ? 'green' : c.status === 'In Consultation' ? 'blue' : 'yellow') + '">' + c.status + '</span></td>',
          '</tr>'
        ].join('');
      }).join(''),
      '      </tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderAppointments() {
    return [
      '<div class="zvs-kpi-grid">',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Booked Slots Today</span><span class="zvs-kpi-icon">📅</span></div><div class="zvs-kpi-val">76 Slots</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">↑ 94.2% occupancy</span><span class="zvs-subtext">Across 6 flagship hospitals</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Walk-In Intake</span><span class="zvs-kpi-icon">🚶</span></div><div class="zvs-kpi-val">12 Patients</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">↑ Zero bottleneck</span><span class="zvs-subtext">Fast-track triage buffer</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">No-Show Rate</span><span class="zvs-kpi-icon">📉</span></div><div class="zvs-kpi-val">2.8%</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">↑ -1.4% MoM</span><span class="zvs-subtext">Automated WhatsApp 2h reminder</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Doctor Punctuality</span><span class="zvs-kpi-icon">⏱️</span></div><div class="zvs-kpi-val">96.5%</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">↑ Within 5 mins</span><span class="zvs-subtext">Strict clinic SLA</span></div></div>',
      '</div>',

      '<div class="zvs-card">',
      '  <div class="zvs-card-head"><div><h3 class="zvs-card-title">Live Master Appointment Roster & Slot Schedule</h3><p class="zvs-card-sub">Real-time scheduling grid with patient assignments and clinic room allocation</p></div></div>',
      '  <div class="zvs-table-wrap">',
      '    <table class="zvs-table">',
      '      <thead><tr><th>Time & Slot</th><th>Pet & Patient</th><th>Parent</th><th>Doctor</th><th>Hospital Branch</th><th>Requested Service</th><th>Status</th></tr></thead>',
      '      <tbody>',
      APPOINTMENTS.map(function (a) {
        return [
          '<tr>',
          '  <td style="font-weight:700;font-family:monospace;color:#0f172a;">' + a.time + ' <span style="font-size:10px;color:#64748b;">(' + a.id + ')</span></td>',
          '  <td style="font-weight:700;color:#0f172a;">' + a.pet + '</td>',
          '  <td style="color:#475569;">' + a.parent + '</td>',
          '  <td style="font-weight:600;color:#2563eb;">' + a.doctor + '</td>',
          '  <td style="color:#334155;">' + a.clinic + '</td>',
          '  <td style="font-weight:600;color:#0f172a;">' + a.service + '</td>',
          '  <td><span class="zvs-tag ' + (a.status === 'Confirmed' ? 'green' : a.status === 'In Session' ? 'blue' : 'yellow') + '">' + a.status + '</span></td>',
          '</tr>'
        ].join('');
      }).join(''),
      '      </tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderTreatments() {
    return [
      '<div class="zvs-kpi-grid">',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Active Inpatient Ward</span><span class="zvs-kpi-icon">🏥</span></div><div class="zvs-kpi-val">18 Patients</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">↑ 82% Occupancy</span><span class="zvs-subtext">6 ICU • 7 Post-Op • 5 Medical</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Treatment Recovery Rate</span><span class="zvs-kpi-icon">🎯</span></div><div class="zvs-kpi-val">97.4%</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">↑ +1.1% MoM</span><span class="zvs-subtext">Clinical recovery to discharge</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Avg Hospital Stay</span><span class="zvs-kpi-icon">⏱️</span></div><div class="zvs-kpi-val">3.4 Days</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">↑ Optimal bed turnover</span><span class="zvs-subtext">Target: &lt; 4.0 Days</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Discharge Ready</span><span class="zvs-kpi-icon">🏡</span></div><div class="zvs-kpi-val">4 Pets Today</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">↑ Med summaries ready</span><span class="zvs-subtext">Post-op follow-up scheduled</span></div></div>',
      '</div>',

      '<div class="zvs-card">',
      '  <div class="zvs-card-head"><div><h3 class="zvs-card-title">Inpatient Ward Management & Daily Clinical Progress</h3><p class="zvs-card-sub">Active therapy lines, intravenous fluids, vital signs monitoring, and attending physician notes</p></div></div>',
      '  <div class="zvs-table-wrap">',
      '    <table class="zvs-table">',
      '      <thead><tr><th>Patient & Case</th><th>Ward Bed</th><th>Attending Vet</th><th>Clinical Regimen</th><th>Stay Duration</th><th>Recovery</th><th>Status</th></tr></thead>',
      '      <tbody>',
      TREATMENTS.map(function (t) {
        return [
          '<tr>',
          '  <td style="font-weight:700;color:#0f172a;">' + t.pet + ' <span style="font-size:11px;color:#64748b;">(' + t.id + ')</span></td>',
          '  <td><span class="zvs-tag ' + (t.ward.indexOf('ICU') >= 0 ? 'red' : 'blue') + '">' + t.ward + '</span></td>',
          '  <td style="font-weight:600;color:#2563eb;">' + t.vet + '</td>',
          '  <td style="font-weight:600;color:#0f172a;">' + t.protocol + '</td>',
          '  <td style="font-family:monospace;color:#475569;">Day ' + t.days + '</td>',
          '  <td style="font-weight:700;color:#16a34a;font-family:monospace;">' + t.progress + '</td>',
          '  <td><span class="zvs-tag ' + (t.status === 'Discharge Ready' ? 'green' : 'blue') + '">' + t.status + '</span></td>',
          '</tr>'
        ].join('');
      }).join(''),
      '      </tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderVaccinations() {
    return [
      '<div class="zvs-kpi-grid">',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Vaccines Administered MTD</span><span class="zvs-kpi-icon">💉</span></div><div class="zvs-kpi-val">784 Doses</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">↑ +22.1% MoM</span><span class="zvs-subtext">512 Canine • 272 Feline</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Cold-Chain Adherence</span><span class="zvs-kpi-icon">❄️</span></div><div class="zvs-kpi-val">100.0%</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">↑ 2-8°C Verified</span><span class="zvs-subtext">Zero heat excursion recorded</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Booster Recall Rate</span><span class="zvs-kpi-icon">📲</span></div><div class="zvs-kpi-val">94.6%</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">↑ +3.8% MoM</span><span class="zvs-subtext">Automated WhatsApp recall</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Digital Passports Issued</span><span class="zvs-kpi-icon">🛡️</span></div><div class="zvs-kpi-val">768 Certs</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">↑ Govt Rabies Compliant</span><span class="zvs-subtext">QR code verifiable passport</span></div></div>',
      '</div>',

      '<div class="zvs-card">',
      '  <div class="zvs-card-head"><div><h3 class="zvs-card-title">Official Immunization Registry & Cold-Chain Vials</h3><p class="zvs-card-sub">Biological product lot tracking, refrigeration temperature logs, and expiry management</p></div></div>',
      '  <div class="zvs-table-wrap">',
      '    <table class="zvs-table">',
      '      <thead><tr><th>Cert ID</th><th>Pet & Species</th><th>Vaccine Product</th><th>Batch / Lot No</th><th>Date</th><th>Next Booster</th><th>Cold Chain</th><th>Status</th></tr></thead>',
      '      <tbody>',
      VACCINATIONS.map(function (v) {
        return [
          '<tr>',
          '  <td style="font-weight:700;color:#2563eb;font-family:monospace;">' + v.id + '</td>',
          '  <td style="font-weight:700;color:#0f172a;">' + v.pet + ' <span style="font-size:11px;color:#64748b;">(' + v.species + ')</span></td>',
          '  <td style="font-weight:600;color:#0f172a;">' + v.vaccine + '</td>',
          '  <td style="font-family:monospace;color:#334155;">' + v.batch + '</td>',
          '  <td style="color:#475569;">' + v.date + '</td>',
          '  <td style="font-weight:700;color:#2563eb;font-family:monospace;">' + v.nextDue + '</td>',
          '  <td><span class="zvs-tag cyan">❄️ ' + v.temp + '</span></td>',
          '  <td><span class="zvs-tag ' + (v.cert === 'Issued' ? 'green' : 'yellow') + '">' + v.cert + '</span></td>',
          '</tr>'
        ].join('');
      }).join(''),
      '      </tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderDiagnostics() {
    return [
      '<div class="zvs-kpi-grid">',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Tests Processed MTD</span><span class="zvs-kpi-icon">🔬</span></div><div class="zvs-kpi-val">142 Tests</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">↑ +18.9% MoM</span><span class="zvs-subtext">Biochemistry, Hematology, DR</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Avg Turnaround Time</span><span class="zvs-kpi-icon">⏱️</span></div><div class="zvs-kpi-val">38.4 mins</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">↑ Target &lt; 45m</span><span class="zvs-subtext">Instant digital PACS sync</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Critical Lab Alerts</span><span class="zvs-kpi-icon">⚠️</span></div><div class="zvs-kpi-val">6 Alerts</div><div class="zvs-kpi-bottom"><span class="zvs-delta neutral">● Stat notification</span><span class="zvs-subtext">Direct vet telemetry alert</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Digital Imaging Usage</span><span class="zvs-kpi-icon">🩻</span></div><div class="zvs-kpi-val">88.2%</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">↑ DR & Ultrasound</span><span class="zvs-subtext">42 imaging runs completed</span></div></div>',
      '</div>',

      '<div class="zvs-card">',
      '  <div class="zvs-card-head"><div><h3 class="zvs-card-title">Live Clinical Lab Pipeline & Imaging Orders</h3><p class="zvs-card-sub">Hematology analyzers, dry chemistry rotors, radiography, and pathologist validations</p></div></div>',
      '  <div class="zvs-table-wrap">',
      '    <table class="zvs-table">',
      '      <thead><tr><th>Order ID</th><th>Pet & Patient</th><th>Investigation / Panel</th><th>Modality</th><th>Referral Vet</th><th>Turnaround</th><th>Findings</th><th>Status</th></tr></thead>',
      '      <tbody>',
      DIAGNOSTICS.map(function (d) {
        return [
          '<tr>',
          '  <td style="font-weight:700;color:#2563eb;font-family:monospace;">' + d.id + '</td>',
          '  <td style="font-weight:700;color:#0f172a;">' + d.pet + '</td>',
          '  <td style="font-weight:600;color:#0f172a;">' + d.test + '</td>',
          '  <td><span class="zvs-tag ' + (d.modality === 'Biochemistry' ? 'green' : d.modality === 'Ultrasound' ? 'purple' : 'blue') + '">' + d.modality + '</span></td>',
          '  <td style="color:#475569;">' + d.vet + '</td>',
          '  <td style="font-family:monospace;color:#334155;">' + d.tat + '</td>',
          '  <td><span class="zvs-tag ' + (d.flag.indexOf('High') >= 0 ? 'red' : 'yellow') + '">' + d.flag + '</span></td>',
          '  <td><span class="zvs-tag ' + (d.status === 'Report Signed' ? 'green' : 'blue') + '">' + d.status + '</span></td>',
          '</tr>'
        ].join('');
      }).join(''),
      '      </tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderProcedures() {
    return [
      '<div class="zvs-kpi-grid">',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Surgeries Today</span><span class="zvs-kpi-icon">✂️</span></div><div class="zvs-kpi-val">14 Surgeries</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">↑ 100% OT Sterility</span><span class="zvs-subtext">4 Ortho • 6 Soft Tissue • 4 Dental</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">OT Theater Utilization</span><span class="zvs-kpi-icon">🏥</span></div><div class="zvs-kpi-val">91.4%</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">↑ High throughput</span><span class="zvs-subtext">3 sterile surgical suites</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Anesthesia Safety Record</span><span class="zvs-kpi-icon">🫁</span></div><div class="zvs-kpi-val">99.98%</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">↑ Multi-parameter monitoring</span><span class="zvs-subtext">Capnography & ECG logging</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Surgical Infection Rate</span><span class="zvs-kpi-icon">🛡️</span></div><div class="zvs-kpi-val">0.0%</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">↑ Benchmark: 1.8%</span><span class="zvs-subtext">Autoclave biological spore pass</span></div></div>',
      '</div>',

      '<div class="zvs-card">',
      '  <div class="zvs-card-head"><div><h3 class="zvs-card-title">Live Surgical Theater Manifest & Operation Log</h3><p class="zvs-card-sub">Sterile theater assignments, procedure duration, lead surgeon, and anesthesia protocols</p></div></div>',
      '  <div class="zvs-table-wrap">',
      '    <table class="zvs-table">',
      '      <thead><tr><th>Surgical ID</th><th>Patient</th><th>Procedure Details</th><th>Theater</th><th>Lead Surgeon</th><th>Duration</th><th>Anesthesia</th><th>Status</th></tr></thead>',
      '      <tbody>',
      PROCEDURES.map(function (p) {
        return [
          '<tr>',
          '  <td style="font-weight:700;color:#2563eb;font-family:monospace;">' + p.id + '</td>',
          '  <td style="font-weight:700;color:#0f172a;">' + p.patient + '</td>',
          '  <td style="font-weight:600;color:#0f172a;">' + p.procedure + '</td>',
          '  <td><span class="zvs-tag blue">' + p.theater + '</span></td>',
          '  <td style="font-weight:600;color:#2563eb;">' + p.surgeon + '</td>',
          '  <td style="font-family:monospace;color:#475569;">' + p.duration + '</td>',
          '  <td style="font-size:11px;color:#334155;">' + p.anesthesia + '</td>',
          '  <td><span class="zvs-tag ' + (p.status === 'Completed' ? 'green' : p.status === 'In Procedure' ? 'red' : 'yellow') + '">' + p.status + '</span></td>',
          '</tr>'
        ].join('');
      }).join(''),
      '      </tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderRevenue() {
    return [
      '<div class="zvs-kpi-grid">',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Gross Clinical Revenue</span><span class="zvs-kpi-icon">💰</span></div><div class="zvs-kpi-val">₹14.99 L</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">↑ +18.4% MoM</span><span class="zvs-subtext">18% total Zenve revenue</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Avg Revenue per Case</span><span class="zvs-kpi-icon">💳</span></div><div class="zvs-kpi-val">₹1,763</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">↑ +8.2% vs Plan</span><span class="zvs-subtext">Blended consult + surgery</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Surgery Billings</span><span class="zvs-kpi-icon">✂️</span></div><div class="zvs-kpi-val">₹4.85 L</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">↑ Top clinical line</span><span class="zvs-subtext">32.4% share of billings</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Collection Rate</span><span class="zvs-kpi-icon">🎯</span></div><div class="zvs-kpi-val">99.4%</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">↑ Zero bad debts</span><span class="zvs-subtext">Instant digital UPI / Card</span></div></div>',
      '</div>',

      '<div class="zvs-card">',
      '  <div class="zvs-card-head"><div><h3 class="zvs-card-title">Clinical Revenue Breakdown by Medical Specialty</h3><p class="zvs-card-sub">Monthly procedure billings, case volumes, and average case realizations</p></div></div>',
      '  <div class="zvs-table-wrap">',
      '    <table class="zvs-table">',
      '      <thead><tr><th>Specialty</th><th>Monthly Billings</th><th>Cases</th><th>Avg Realization (AOV)</th><th>Share of Clinical Billings</th><th>Gross Margin</th></tr></thead>',
      '      <tbody>',
      REVENUE_DATA.map(function (r) {
        return [
          '<tr>',
          '  <td style="font-weight:700;color:#0f172a;">' + r.specialty + '</td>',
          '  <td style="font-weight:700;color:#16a34a;font-family:monospace;">' + r.rev + '</td>',
          '  <td style="font-family:monospace;color:#334155;">' + r.cases + '</td>',
          '  <td style="color:#64748b;font-family:monospace;">' + r.aov + '</td>',
          '  <td style="font-weight:600;color:#2563eb;">' + r.share + '</td>',
          '  <td style="font-weight:700;color:#16a34a;">' + r.margin + '</td>',
          '</tr>'
        ].join('');
      }).join(''),
      '      </tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderProfitability() {
    return [
      '<div class="zvs-kpi-grid">',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Blended Gross Margin</span><span class="zvs-kpi-icon">📈</span></div><div class="zvs-kpi-val">73.9%</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">↑ +2.8% YoY</span><span class="zvs-subtext">Benchmark: 68.0%</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Clinical Gross Profit</span><span class="zvs-kpi-icon">💰</span></div><div class="zvs-kpi-val">₹11.08 L</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">↑ +21.4% MoM</span><span class="zvs-subtext">From ₹14.99L revenue</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Doctor Commission Split</span><span class="zvs-kpi-icon">👨‍⚕️</span></div><div class="zvs-kpi-val">16.1%</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">↑ Accretive payout model</span><span class="zvs-subtext">Target &lt; 18.0%</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">EBITDA Contribution</span><span class="zvs-kpi-icon">💎</span></div><div class="zvs-kpi-val">₹8.68 L</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">↑ 57.9% net yield</span><span class="zvs-subtext">After hospital overheads</span></div></div>',
      '</div>',

      '<div class="zvs-card">',
      '  <div class="zvs-card-head"><div><h3 class="zvs-card-title">Clinical Unit Economics & Direct Expense Margins</h3><p class="zvs-card-sub">Contribution profit per clinical line after surgeon fees, anesthesia gases, implants, and consumables</p></div></div>',
      '  <div class="zvs-table-wrap">',
      '    <table class="zvs-table">',
      '      <thead><tr><th>Service Line</th><th>Revenue</th><th>Direct Cost / COGS</th><th>Gross Profit</th><th>Margin %</th><th>Margin Tier</th></tr></thead>',
      '      <tbody>',
      PROFIT_DATA.map(function (p) {
        return [
          '<tr>',
          '  <td style="font-weight:700;color:#0f172a;">' + p.service + '</td>',
          '  <td style="font-weight:600;color:#0f172a;font-family:monospace;">' + p.rev + '</td>',
          '  <td style="color:#dc2626;font-family:monospace;">' + p.cogs + '</td>',
          '  <td style="font-weight:700;color:#16a34a;font-family:monospace;">' + p.profit + '</td>',
          '  <td style="font-weight:700;color:#2563eb;">' + p.margin + '</td>',
          '  <td><span class="zvs-tag ' + (p.tier.indexOf('Highest') >= 0 ? 'green' : 'blue') + '">' + p.tier + '</span></td>',
          '</tr>'
        ].join('');
      }).join(''),
      '      </tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function wireTabSpecificEvents() {
    var cnsSearch = root.querySelector('#zvs-cns-search');
    if (cnsSearch) {
      cnsSearch.oninput = function () {
        S.searchQuery = cnsSearch.value;
        renderTabContent();
        var newInp = root.querySelector('#zvs-cns-search');
        if (newInp) {
          newInp.focus();
          newInp.setSelectionRange(newInp.value.length, newInp.value.length);
        }
      };
    }
  }

  /* ── Modals & Actions ─────────────────────────────────────────────── */
  function showBookModal() {
    var modal = document.createElement('div');
    modal.className = 'zvs-modal-backdrop';
    modal.innerHTML = [
      '<div class="zvs-modal-box">',
      '  <div class="zvs-modal-head">',
      '    <h3>🩺 Book Veterinary Appointment</h3>',
      '    <button type="button" class="zvs-btn-close" id="vm-close">✕</button>',
      '  </div>',
      '  <div class="zvs-modal-body">',
      '    <div class="zvs-form-group"><label class="zvs-label">Pet Parent Name & Phone</label><input class="zvs-input" id="vm-parent" placeholder="e.g. Shalini Roy (98765-43210)" required style="width:100%;"></div>',
      '    <div class="zvs-form-group"><label class="zvs-label">Pet Companion Details (Breed & Age)</label><input class="zvs-input" id="vm-pet" placeholder="e.g. Bruno (Labrador, 3 years)" required style="width:100%;"></div>',
      '    <div class="zvs-form-group"><label class="zvs-label">Hospital Branch</label><select class="zvs-select" id="vm-clinic" style="width:100%;"><option value="Koramangala Pet Hospital">Koramangala Pet Hospital (BLR)</option><option value="Indiranagar Care Center">Indiranagar Care Center (BLR)</option><option value="Whitefield Specialty OT">Whitefield Specialty OT (BLR)</option><option value="Bandra West Super-Clinic">Bandra West Super-Clinic (BOM)</option><option value="Gurugram Central Hospital">Gurugram Central Hospital (DEL)</option></select></div>',
      '    <div class="zvs-form-group"><label class="zvs-label">Consulting Veterinarian</label><select class="zvs-select" id="vm-doc" style="width:100%;"><option value="Dr. Priya Sharma">Dr. Priya Sharma (General Medicine)</option><option value="Dr. Rahul Mehta">Dr. Rahul Mehta (Orthopedic Surgeon)</option><option value="Dr. Aisha Khan">Dr. Aisha Khan (Feline Specialist)</option><option value="Dr. Karan Patel">Dr. Karan Patel (Dermatologist)</option><option value="Dr. Neha Singh">Dr. Neha Singh (Cardiologist)</option></select></div>',
      '    <div class="zvs-form-group"><label class="zvs-label">Reason for Visit / Chief Complaint</label><input class="zvs-input" id="vm-reason" placeholder="e.g. Annual vaccination booster & ear checkup" required style="width:100%;"></div>',
      '  </div>',
      '  <div class="zvs-modal-foot">',
      '    <button type="button" class="zvs-btn zvs-btn-secondary" id="vm-cancel">Cancel</button>',
      '    <button type="button" class="zvs-btn zvs-btn-primary" id="vm-save">Confirm Booking</button>',
      '  </div>',
      '</div>'
    ].join('');
    document.body.appendChild(modal);

    function closeM() { modal.remove(); }
    modal.querySelector('#vm-close').onclick = closeM;
    modal.querySelector('#vm-cancel').onclick = closeM;
    modal.querySelector('#vm-save').onclick = function () {
      var p = document.getElementById('vm-parent').value;
      var pet = document.getElementById('vm-pet').value;
      var c = document.getElementById('vm-clinic').value;
      var d = document.getElementById('vm-doc').value;
      var r = document.getElementById('vm-reason').value;
      if (!p || !pet) { alert('Please enter pet parent and pet companion details.'); return; }

      APPOINTMENTS.unshift({
        id: 'APT-' + (1050 + APPOINTMENTS.length),
        time: 'Just Now',
        pet: pet,
        parent: p,
        doctor: d,
        clinic: c,
        service: r || 'General Clinical Consultation',
        type: 'Express Booking',
        status: 'Confirmed'
      });

      showToast('Appointment booked for ' + pet + '! Slot confirmed.');
      closeM();
      switchTab('appointments');
    };
  }

  function showLabModal() {
    var modal = document.createElement('div');
    modal.className = 'zvs-modal-backdrop';
    modal.innerHTML = [
      '<div class="zvs-modal-box">',
      '  <div class="zvs-modal-head">',
      '    <h3>🔬 Order In-House Diagnostic Panel</h3>',
      '    <button type="button" class="zvs-btn-close" id="lm-close">✕</button>',
      '  </div>',
      '  <div class="zvs-modal-body">',
      '    <div class="zvs-form-group"><label class="zvs-label">Pet Name & ID</label><input class="zvs-input" id="lm-pet" placeholder="e.g. Bruno (Golden Retriever - #PET-920)" required style="width:100%;"></div>',
      '    <div class="zvs-form-group"><label class="zvs-label">Diagnostic Investigation</label><select class="zvs-select" id="lm-test" style="width:100%;"><option value="18-Parameter Biochemistry + Electrolytes">18-Parameter Biochemistry + Electrolytes</option><option value="Complete Blood Count (CBC) with Reticulocytes">Complete Blood Count (CBC) with Reticulocytes</option><option value="Digital Abdominal Ultrasonography (Full Doppler)">Digital Abdominal Ultrasonography (Full Doppler)</option><option value="Orthopedic Digital Radiography (DR X-Ray)">Orthopedic Digital Radiography (DR X-Ray)</option><option value="Echocardiography & Color Doppler">Echocardiography & Color Doppler</option><option value="Rapid CPV / CCV Antigen PCR Immunoassay">Rapid CPV / CCV Antigen PCR Immunoassay</option></select></div>',
      '    <div class="zvs-form-group"><label class="zvs-label">Ordering Clinician</label><select class="zvs-select" id="lm-vet" style="width:100%;"><option value="Dr. Priya Sharma">Dr. Priya Sharma</option><option value="Dr. Rahul Mehta">Dr. Rahul Mehta</option><option value="Dr. Aisha Khan">Dr. Aisha Khan</option><option value="Dr. Karan Patel">Dr. Karan Patel</option><option value="Dr. Neha Singh">Dr. Neha Singh</option></select></div>',
      '    <div class="zvs-form-group"><label class="zvs-label">Clinical Indication & Urgency</label><input class="zvs-input" id="lm-urgency" placeholder="e.g. Pre-anesthetic screening / Stat acute renal" required style="width:100%;"></div>',
      '  </div>',
      '  <div class="zvs-modal-foot">',
      '    <button type="button" class="zvs-btn zvs-btn-secondary" id="lm-cancel">Cancel</button>',
      '    <button type="button" class="zvs-btn zvs-btn-primary" id="lm-save">Dispatch to Lab</button>',
      '  </div>',
      '</div>'
    ].join('');
    document.body.appendChild(modal);

    function closeM() { modal.remove(); }
    modal.querySelector('#lm-close').onclick = closeM;
    modal.querySelector('#lm-cancel').onclick = closeM;
    modal.querySelector('#lm-save').onclick = function () {
      var pet = document.getElementById('lm-pet').value;
      var test = document.getElementById('lm-test').value;
      var vet = document.getElementById('lm-vet').value;
      if (!pet) { alert('Please enter pet name.'); return; }

      DIAGNOSTICS.unshift({
        id: 'LAB-' + (5110 + DIAGNOSTICS.length),
        pet: pet,
        test: test,
        modality: test.indexOf('CBC') >= 0 ? 'Hematology' : test.indexOf('Radiography') >= 0 ? 'Digital X-Ray' : test.indexOf('Ultra') >= 0 ? 'Ultrasound' : 'Biochemistry',
        vet: vet,
        tat: '30 mins',
        flag: 'Sample in Processing',
        status: 'Processing'
      });

      showToast('Lab test ' + test + ' ordered for ' + pet + '!');
      closeM();
      switchTab('diagnostics');
    };
  }

  function exportTabCSV() {
    var curMod = MODULES.find(function (m) { return m.id === S.tab; }) || MODULES[0];
    var csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Zenve BI Veterinary Services Intelligence Export - " + curMod.label + "\n";
    csvContent += "Export Date: " + new Date().toISOString() + "\n\n";

    if (S.tab === 'consultations') {
      csvContent += "ID,Pet,Parent,Doctor,Specialty,Mode,Diagnosis,Fee,Status\n";
      CONSULTATIONS.forEach(function (c) {
        csvContent += [c.id, '"' + c.pet + '"', '"' + c.parent + '"', '"' + c.doctor + '"', c.specialty, c.mode, '"' + c.diagnosis + '"', c.fee, c.status].join(',') + "\n";
      });
    } else if (S.tab === 'appointments') {
      csvContent += "ID,Time,Pet,Parent,Doctor,Clinic,Service,Status\n";
      APPOINTMENTS.forEach(function (a) {
        csvContent += [a.id, a.time, '"' + a.pet + '"', '"' + a.parent + '"', '"' + a.doctor + '"', '"' + a.clinic + '"', '"' + a.service + '"', a.status].join(',') + "\n";
      });
    } else {
      csvContent += "Specialty,Billings,Cases,AOV,Share,Margin\n";
      REVENUE_DATA.forEach(function (r) {
        csvContent += ['"' + r.specialty + '"', r.rev, r.cases, r.aov, r.share, r.margin].join(',') + "\n";
      });
    }

    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "zenve_veterinary_" + S.tab + "_report.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
    showToast('Downloaded ' + curMod.label + ' CSV report.');
  }

  function showToast(msg) {
    var toast = document.createElement('div');
    toast.className = 'zvs-toast';
    toast.innerHTML = '<span>🩺</span><span>' + msg + '</span>';
    document.body.appendChild(toast);
    setTimeout(function () { toast.remove(); }, 3200);
  }

  /* ── Navigation & Control ─────────────────────────────────────────── */
  function open(tab) {
    closeOthers();
    init();
    if (tab) S.tab = tab;
    S.open = true;
    render();
    root.classList.add('zpanel-open');
    markSidebar(true, S.tab);
    var targetHash = (MODULES.find(function(m){ return m.id === S.tab; }) || {}).hash || '#services-dashboard';
    if (window.location.hash !== targetHash) {
      try { history.pushState(null, '', targetHash); } catch (e) { window.location.hash = targetHash; }
    }
  }

  function markSidebar(on, tab) {
    var targetTab = tab || S.tab || 'overview';
    document.querySelectorAll('.sidebar-scope li button, .sidebar-scope button, .sidebar-scope a').forEach(function (b) {
      var txt = b.textContent ? b.textContent.trim() : '';
      var bTab = tabFromText(txt);
      if (bTab) {
        b.classList.toggle('zpanel-active', on && bTab === targetTab);
        b.classList.toggle('zsd-active', on && bTab === targetTab);
        b.classList.toggle('zvs-active', on && bTab === targetTab);
      }
    });
  }

  function close() {
    if (root) root.classList.remove('zpanel-open');
    S.open = false;
    markSidebar(false);
    var h = window.location.hash;
    if (h.startsWith('#services') || h.startsWith('#consult') || h.startsWith('#appoint') || h.startsWith('#treat') || h.startsWith('#vaccin') || h.startsWith('#diagnos') || h.startsWith('#procedure')) {
      try { history.pushState(null, '', window.location.pathname + window.location.search); } catch (e) {}
    }
  }

  function switchTab(tab) {
    if (!tab) return;
    S.tab = tab;
    markSidebar(true, tab);
    var targetHash = (MODULES.find(function(m){ return m.id === tab; }) || {}).hash || '#services-dashboard';
    if (window.location.hash !== targetHash) {
      try { history.pushState(null, '', targetHash); } catch (e) { window.location.hash = targetHash; }
    }
    render();
  }

  function init() {
    root = document.getElementById('zvs-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'zvs-root';
      root.className = 'zpanel-root zvs-root';
      document.body.appendChild(root);
    }
  }

  /* ── Interceptor for Sidebar ──────────────────────────────────────── */
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;

    if (t.closest('[aria-expanded]') || t.closest('button[aria-expanded]') || t.closest('[aria-label="Search menu"]')) return;

    var item = t.closest('button, [data-go], a, [role="button"], li');
    if (item && item.textContent) {
      var txt = item.textContent.trim();
      var tab = tabFromText(txt);

      // Verify item belongs under Veterinary Services or global matching
      if (tab) {
        var parentUl = item.closest('ul');
        var groupBtn = parentUl ? parentUl.previousElementSibling : null;
        var groupText = groupBtn ? (groupBtn.textContent || '') : '';
        // If explicitly under another category, ignore
        if (groupText && groupText.indexOf('Veterinary') === -1 && groupText.indexOf('Services') === -1 && !t.closest('#zvs-root')) {
          // If not Veterinary Services header, continue only if unique tab
          if (tab !== 'consultations' && tab !== 'treatments' && tab !== 'vaccinations' && tab !== 'diagnostics' && tab !== 'procedures') {
            return;
          }
        }

        if (!t.closest('#zvs-root')) {
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
    } else if (S.open && !window.location.hash.startsWith('#services') && !window.location.hash.startsWith('#consult') && !window.location.hash.startsWith('#appoint') && !window.location.hash.startsWith('#treat') && !window.location.hash.startsWith('#vaccin') && !window.location.hash.startsWith('#diagnos') && !window.location.hash.startsWith('#procedure')) {
      close();
    }
  });

  /* ── Export Global API ────────────────────────────────────────────── */
  window.ZenveVeterinaryDashboard = {
    open: open,
    close: close,
    switchTab: switchTab,
    showBookModal: showBookModal,
    showLabModal: showLabModal,
    exportTabCSV: exportTabCSV
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
