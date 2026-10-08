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
  var PETS = [];

  var HEALTH_RECORDS = [];

  var VACCINATIONS = [];

  var TREATMENTS = [];

  var PRESCRIPTIONS = [];

  var PURCHASES = [];

  var INSIGHTS = [];

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
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Total Registered Pets</span><span class="zpet-kpi-icon">🐾</span></div><div class="zpet-kpi-val">0</div><div class="zpet-kpi-sub"><span class="zpet-badge-neu">0.0%</span> Canine & Feline census</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Canine Share</span><span class="zpet-kpi-icon">🐕</span></div><div class="zpet-kpi-val">0.0%</div><div class="zpet-kpi-sub"><span class="zpet-badge-neu">0.0%</span> Active patients</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Feline Share</span><span class="zpet-kpi-icon">🐈</span></div><div class="zpet-kpi-val">0.0%</div><div class="zpet-kpi-sub"><span class="zpet-badge-neu">0.0%</span> No cats recorded</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Vaccine Compliance</span><span class="zpet-kpi-icon">💉</span></div><div class="zpet-kpi-val">0.0%</div><div class="zpet-kpi-sub"><span class="zpet-badge-neu">0.0%</span> Valid passports</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Microchip Enrolled</span><span class="zpet-kpi-icon">🏷️</span></div><div class="zpet-kpi-val">0.0%</div><div class="zpet-kpi-sub"><span class="zpet-badge-neu">0.0%</span> ISO 11784 RFID</div></div>',
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
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Selected Profile</span><span class="zpet-kpi-icon">🐕</span></div><div class="zpet-kpi-val">0</div><div class="zpet-kpi-sub">' + p.breed + '</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Body Condition</span><span class="zpet-kpi-icon">⚖️</span></div><div class="zpet-kpi-val">0</div><div class="zpet-kpi-sub"><span class="zpet-badge-neu">0.0%</span> Weight stable</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Biological Passport</span><span class="zpet-kpi-icon">💉</span></div><div class="zpet-kpi-val">0</div><div class="zpet-kpi-sub">DHPPiL & Rabies verified</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Primary Physician</span><span class="zpet-kpi-icon">👨‍⚕️</span></div><div class="zpet-kpi-val">0</div><div class="zpet-kpi-sub">Koramangala Super Clinic</div></div>',
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
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Cumulative EHRs</span><span class="zpet-kpi-icon">📋</span></div><div class="zpet-kpi-val">0</div><div class="zpet-kpi-sub"><span class="zpet-badge-neu">0.0%</span> Longitudinal logs</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Monthly Admissions</span><span class="zpet-kpi-icon">📅</span></div><div class="zpet-kpi-val">0</div><div class="zpet-kpi-sub"><span class="zpet-badge-neu">0.0%</span> Current cycle</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Active Chronic Regimens</span><span class="zpet-kpi-icon">💊</span></div><div class="zpet-kpi-val">0</div><div class="zpet-kpi-sub">Renal, cardiac, endocrine</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Vitals Compliance</span><span class="zpet-kpi-icon">🩺</span></div><div class="zpet-kpi-val">0.0%</div><div class="zpet-kpi-sub"><span class="zpet-badge-neu">0.0%</span> Complete telemetry</div></div>',
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
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Immunization Doses</span><span class="zpet-kpi-icon">💉</span></div><div class="zpet-kpi-val">0</div><div class="zpet-kpi-sub"><span class="zpet-badge-neu">0.0%</span> YTD administered</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Herd Immunity Rate</span><span class="zpet-kpi-icon">🛡️</span></div><div class="zpet-kpi-val">0.0%</div><div class="zpet-kpi-sub"><span class="zpet-badge-neu">0.0%</span> Protected cohort</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Due Within 30d</span><span class="zpet-kpi-icon">🔔</span></div><div class="zpet-kpi-val">0</div><div class="zpet-kpi-sub">No recalls sent</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Cold-Chain Verified</span><span class="zpet-kpi-icon">❄️</span></div><div class="zpet-kpi-val">0.0%</div><div class="zpet-kpi-sub">Temperature monitored</div></div>',
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
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Treatments Logged</span><span class="zpet-kpi-icon">💊</span></div><div class="zpet-kpi-val">0</div><div class="zpet-kpi-sub"><span class="zpet-badge-neu">0.0%</span> Medical & surgical</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Recovery Rate</span><span class="zpet-kpi-icon">📈</span></div><div class="zpet-kpi-val">0.0%</div><div class="zpet-kpi-sub"><span class="zpet-badge-neu">0.0%</span> Safely discharged</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Avg Inpatient Stay</span><span class="zpet-kpi-icon">⏱️</span></div><div class="zpet-kpi-val">0</div><div class="zpet-kpi-sub">No stay data</div></div>',
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
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Rx Generated</span><span class="zpet-kpi-icon">💊</span></div><div class="zpet-kpi-val">0</div><div class="zpet-kpi-sub"><span class="zpet-badge-neu">0.0%</span> Tamper-proof logs</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Chronic Refills</span><span class="zpet-kpi-icon">🔄</span></div><div class="zpet-kpi-val">0</div><div class="zpet-kpi-sub">Auto-scheduled delivery</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Dispense SLA</span><span class="zpet-kpi-icon">⏱️</span></div><div class="zpet-kpi-val">0</div><div class="zpet-kpi-sub">Standard SLA</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Drug Interaction Check</span><span class="zpet-kpi-icon">🛡️</span></div><div class="zpet-kpi-val">0.0%</div><div class="zpet-kpi-sub">AI safety verified</div></div>',
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
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Cumulative Orders</span><span class="zpet-kpi-icon">🛍️</span></div><div class="zpet-kpi-val">0</div><div class="zpet-kpi-sub"><span class="zpet-badge-neu">0.0%</span> Omni-channel</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Avg Pet LTV / Yr</span><span class="zpet-kpi-icon">💰</span></div><div class="zpet-kpi-val">₹0</div><div class="zpet-kpi-sub"><span class="zpet-badge-neu">0.0%</span> Annualized spend</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Rx Diet Penetration</span><span class="zpet-kpi-icon">🥗</span></div><div class="zpet-kpi-val">0.0%</div><div class="zpet-kpi-sub">High margin retention</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Auto-Ship Subscribers</span><span class="zpet-kpi-icon">🔄</span></div><div class="zpet-kpi-val">0.0%</div><div class="zpet-kpi-sub">No active subscriptions</div></div>',
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
  var BREEDS_ANALYTICS = [];

  var REGIONAL_HUBS = [];

  function renderAnalytics(container) {
    var q = S.searchQuery.toLowerCase();
    var filteredBreeds = BREEDS_ANALYTICS.filter(function (b) {
      var matchSpecies = (S.filterVal === 'ALL' || b.species === S.filterVal);
      var matchText = b.breed.toLowerCase().includes(q) || b.riskTier.toLowerCase().includes(q) || b.species.toLowerCase().includes(q);
      return matchSpecies && matchText;
    });

    container.innerHTML = [
      '<div class="zpet-kpi-grid">',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Registered Cohort</span><span class="zpet-kpi-icon">📊</span></div><div class="zpet-kpi-val">0</div><div class="zpet-kpi-sub"><span class="zpet-badge-neu">0.0%</span> No registered cohort</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Sterilization Rate</span><span class="zpet-kpi-icon">✂️</span></div><div class="zpet-kpi-val">0.0%</div><div class="zpet-kpi-sub">No sterilization records</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Microchip RFID Rate</span><span class="zpet-kpi-icon">📡</span></div><div class="zpet-kpi-val">0.0%</div><div class="zpet-kpi-sub">No tagged pets</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Avg Body Condition</span><span class="zpet-kpi-icon">⚖️</span></div><div class="zpet-kpi-val">0.0</div><div class="zpet-kpi-sub"><span class="zpet-badge-neu">0.0%</span> Standard condition</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Preventive Adherence</span><span class="zpet-kpi-icon">🛡️</span></div><div class="zpet-kpi-val">0.0%</div><div class="zpet-kpi-sub">No compliance data</div></div>',
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
  var BIOMARKERS = [];

  function renderInsights(container) {
    var q = S.searchQuery.toLowerCase();
    var list = INSIGHTS.filter(function (ins) {
      var matchFilter = (S.filterVal === 'ALL' || ins.severity === S.filterVal || ins.category === S.filterVal);
      var matchText = ins.title.toLowerCase().includes(q) || ins.description.toLowerCase().includes(q) || ins.cohort.toLowerCase().includes(q);
      return matchFilter && matchText;
    });

    container.innerHTML = [
      '<div class="zpet-kpi-grid">',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Population Health Index</span><span class="zpet-kpi-icon">🧠</span></div><div class="zpet-kpi-val">0.0</div><div class="zpet-kpi-sub"><span class="zpet-badge-neu">0.0%</span> Low morbidity risk</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Active Surveillance</span><span class="zpet-kpi-icon">🚨</span></div><div class="zpet-kpi-val">0</div><div class="zpet-kpi-sub">No active warnings</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Early Morbidity Staging</span><span class="zpet-kpi-icon">🛡️</span></div><div class="zpet-kpi-val">0.0%</div><div class="zpet-kpi-sub">Standard monitoring</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Parent Recall Action</span><span class="zpet-kpi-icon">📱</span></div><div class="zpet-kpi-val">0.0%</div><div class="zpet-kpi-sub">No recalls sent</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Chronic Care Cohort</span><span class="zpet-kpi-icon">🩺</span></div><div class="zpet-kpi-val">0</div><div class="zpet-kpi-sub">Remote health telemetry</div></div>',
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
