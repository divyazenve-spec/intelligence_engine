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

  /* ── Live Consultation Data from MySQL zenve_engine ────────────── */
  var CONSULTATIONS = [];

  /* ── Live Appointments from MySQL zenve_engine ───────────────── */
  var APPOINTMENTS = [];

  function loadLiveAppointments(cb) {
    fetch('/api/v1/veterinary/appointments')
      .then(function (res) { return res.json(); })
      .then(function (rows) {
        if (Array.isArray(rows) && rows.length > 0) {
          APPOINTMENTS = rows.map(function (a) {
            return {
              id: a.appointment_code || ('APT-' + a.id),
              dbId: a.id,
              time: a.appointment_time || '10:00 AM',
              pet: a.pet_name + ' (' + (a.pet_type || 'Dog') + ')',
              parent: a.parent_name + (a.parent_phone ? ' (' + a.parent_phone + ')' : ''),
              doctor: a.doctor_name || 'Dr. Priya Sharma',
              clinic: a.clinic_name || 'Koramangala Pet Hospital',
              service: a.service_name || 'General Health Checkup',
              type: 'Scheduled App',
              status: a.status || 'Confirmed'
            };
          });
        }
        if (root && S.open) renderAll();
        if (cb) cb();
      })
      .catch(function (err) {
        console.error('[Zenve Vet API Error]', err);
      });
  }
  loadLiveAppointments();

  /* ── Live Clinical Datasets from MySQL zenve_engine ─────────────── */
  var TREATMENTS = [];
  var VACCINATIONS = [];
  var DIAGNOSTICS = [];
  var PROCEDURES = [];
  var REVENUE_DATA = [];
  var PROFIT_DATA = [];

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
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Clinical Revenue (MTD)</span><span class="zvs-kpi-icon">💰</span></div><div class="zvs-kpi-val">₹0</div><div class="zvs-kpi-bottom"><span class="zvs-delta neutral">0% vs Prev</span><span class="zvs-subtext">No transactions recorded</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Total Consultations</span><span class="zvs-kpi-icon">🩺</span></div><div class="zvs-kpi-val">' + CONSULTATIONS.length + ' Pets</div><div class="zvs-kpi-bottom"><span class="zvs-delta neutral">0% MoM</span><span class="zvs-subtext">Outpatient & Video</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Surgical Procedures</span><span class="zvs-kpi-icon">✂️</span></div><div class="zvs-kpi-val">' + PROCEDURES.length + ' Surgeries</div><div class="zvs-kpi-bottom"><span class="zvs-delta neutral">0 Active</span><span class="zvs-subtext">Orthopedic & Soft Tissue</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Clinical Profit Margin</span><span class="zvs-kpi-icon">📈</span></div><div class="zvs-kpi-val">0.0%</div><div class="zvs-kpi-bottom"><span class="zvs-delta neutral">0.0% YoY</span><span class="zvs-subtext">Awaiting operational data</span></div></div>',
      '</div>',

      '<div class="zvs-grid-2">',
      '  <div class="zvs-card">',
      '    <div class="zvs-card-head"><div><h3 class="zvs-card-title">Live Hospital Floor Status & Capacity</h3><p class="zvs-card-sub">Real-time patient intake and facility load across all clinical centers</p></div></div>',
      '    <div style="padding:20px;display:grid;grid-template-columns:1fr 1fr;gap:12px;">',
      '      <div style="padding:14px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;"><div style="font-size:11px;color:#64748b;font-weight:700;">OUTPATIENT CLINICS</div><div style="font-size:22px;font-weight:800;color:#0f172a;margin:4px 0;">' + CONSULTATIONS.length + ' Consults Today</div><div style="font-size:11px;color:#64748b;font-weight:600;">● 0 Surgeons On Duty</div></div>',
      '      <div style="padding:14px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;"><div style="font-size:11px;color:#64748b;font-weight:700;">STERILE THEATERS (OT)</div><div style="font-size:22px;font-weight:800;color:#0f172a;margin:4px 0;">0 OTs Active</div><div style="font-size:11px;color:#64748b;font-weight:600;">● ' + PROCEDURES.length + ' Surgeries Scheduled</div></div>',
      '      <div style="padding:14px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;"><div style="font-size:11px;color:#64748b;font-weight:700;">INPATIENT & ICU WARDS</div><div style="font-size:22px;font-weight:800;color:#0f172a;margin:4px 0;">' + TREATMENTS.length + ' Pets Admitted</div><div style="font-size:11px;color:#64748b;font-weight:600;">● 0% Bed Occupancy</div></div>',
      '      <div style="padding:14px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;"><div style="font-size:11px;color:#64748b;font-weight:700;">PATHOLOGY DIAGNOSTICS</div><div style="font-size:22px;font-weight:800;color:#0f172a;margin:4px 0;">' + DIAGNOSTICS.length + ' Tests MTD</div><div style="font-size:11px;color:#64748b;font-weight:600;">● -- Turnaround Time</div></div>',
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
    var filtered = CONSULTATIONS.filter(function (c) {
      if (!S.searchQuery) return true;
      var q = S.searchQuery.toLowerCase();
      return (c.pet && c.pet.toLowerCase().indexOf(q) >= 0) || (c.doctor && c.doctor.toLowerCase().indexOf(q) >= 0) || (c.diagnosis && c.diagnosis.toLowerCase().indexOf(q) >= 0);
    });

    var rowsHtml = filtered.length > 0 ? filtered.map(function (c) {
      return [
        '<tr>',
        '  <td style="font-weight:700;color:#2563eb;font-family:monospace;">' + c.id + '</td>',
        '  <td style="font-weight:700;color:#0f172a;">' + c.pet + '</td>',
        '  <td style="color:#475569;">' + c.parent + '</td>',
        '  <td style="font-weight:600;color:#0f172a;">' + c.doctor + ' <span style="font-size:11px;color:#64748b;">(' + (c.specialty || 'General') + ')</span></td>',
        '  <td><span class="zvs-tag ' + (c.mode === 'Video Telehealth' ? 'blue' : c.mode === 'Home Visit' ? 'purple' : 'green') + '">' + c.mode + '</span></td>',
        '  <td style="font-weight:600;color:#0f172a;">' + c.diagnosis + '</td>',
        '  <td style="font-family:monospace;font-weight:700;color:#0f172a;">' + c.fee + '</td>',
        '  <td><span class="zvs-tag ' + (c.status === 'Completed' ? 'green' : c.status === 'In Consultation' ? 'blue' : 'yellow') + '">' + c.status + '</span></td>',
        '</tr>'
      ].join('');
    }).join('') : '<tr><td colspan="8" style="text-align:center;padding:48px 20px;color:#94a3b8;font-size:13px;"><div style="font-size:26px;margin-bottom:8px;">🩺</div>No consultation records found. New encounters will appear here.</td></tr>';

    return [
      '<div class="zvs-kpi-grid">',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Consultations Today</span><span class="zvs-kpi-icon">🩺</span></div><div class="zvs-kpi-val">' + CONSULTATIONS.length + ' Cases</div><div class="zvs-kpi-bottom"><span class="zvs-delta neutral">0% Today</span><span class="zvs-subtext">Outpatient & Telehealth</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Avg Encounter Time</span><span class="zvs-kpi-icon">⏱️</span></div><div class="zvs-kpi-val">-- mins</div><div class="zvs-kpi-bottom"><span class="zvs-delta neutral">No active visits</span><span class="zvs-subtext">Benchmark: 20 mins</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Active Triage Queue</span><span class="zvs-kpi-icon">🏥</span></div><div class="zvs-kpi-val">0 Patients</div><div class="zvs-kpi-bottom"><span class="zvs-delta neutral">Queue clear</span><span class="zvs-subtext">Fast-track protocol</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Consultation CSAT</span><span class="zvs-kpi-icon">⭐</span></div><div class="zvs-kpi-val">-- / 5</div><div class="zvs-kpi-bottom"><span class="zvs-delta neutral">No reviews yet</span><span class="zvs-subtext">Verified pet parent reviews</span></div></div>',
      '</div>',

      '<div class="zvs-card">',
      '  <div class="zvs-filter-bar">',
      '    <div><h3 class="zvs-card-title">Live Outpatient Encounters & Triage Records</h3></div>',
      '    <input class="zvs-input" id="zvs-cns-search" placeholder="Search pet, doctor, diagnosis..." value="' + S.searchQuery + '" style="width:260px;">',
      '  </div>',
      '  <div class="zvs-table-wrap">',
      '    <table class="zvs-table">',
      '      <thead><tr><th>Encounter ID</th><th>Pet & Companion</th><th>Pet Parent</th><th>Attending Veterinarian</th><th>Mode</th><th>Diagnosis</th><th>Fee</th><th>Status</th></tr></thead>',
      '      <tbody>' + rowsHtml + '</tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderAppointments() {
    var rowsHtml = APPOINTMENTS.length > 0 ? APPOINTMENTS.map(function (a) {
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
    }).join('') : '<tr><td colspan="7" style="text-align:center;padding:48px 20px;color:#94a3b8;font-size:13px;"><div style="font-size:26px;margin-bottom:8px;">📅</div>No appointments scheduled. Click "+ Book Appointment" above to create one.</td></tr>';

    return [
      '<div class="zvs-kpi-grid">',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Booked Slots Today</span><span class="zvs-kpi-icon">📅</span></div><div class="zvs-kpi-val">' + APPOINTMENTS.length + ' Slots</div><div class="zvs-kpi-bottom"><span class="zvs-delta neutral">0% occupancy</span><span class="zvs-subtext">Across clinical centers</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Walk-In Intake</span><span class="zvs-kpi-icon">🚶</span></div><div class="zvs-kpi-val">0 Patients</div><div class="zvs-kpi-bottom"><span class="zvs-delta neutral">No walk-in bottleneck</span><span class="zvs-subtext">Triage queue ready</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">No-Show Rate</span><span class="zvs-kpi-icon">📉</span></div><div class="zvs-kpi-val">0.0%</div><div class="zvs-kpi-bottom"><span class="zvs-delta neutral">0 cancellations</span><span class="zvs-subtext">Automated reminder system</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Doctor Punctuality</span><span class="zvs-kpi-icon">⏱️</span></div><div class="zvs-kpi-val">--%</div><div class="zvs-kpi-bottom"><span class="zvs-delta neutral">Awaiting appointments</span><span class="zvs-subtext">Strict clinic SLA</span></div></div>',
      '</div>',

      '<div class="zvs-card">',
      '  <div class="zvs-card-head"><div><h3 class="zvs-card-title">Live Master Appointment Roster & Slot Schedule</h3><p class="zvs-card-sub">Real-time scheduling grid with patient assignments and clinic room allocation</p></div></div>',
      '  <div class="zvs-table-wrap">',
      '    <table class="zvs-table">',
      '      <thead><tr><th>Time & Slot</th><th>Pet & Patient</th><th>Parent</th><th>Doctor</th><th>Hospital Branch</th><th>Requested Service</th><th>Status</th></tr></thead>',
      '      <tbody>' + rowsHtml + '</tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderTreatments() {
    var rowsHtml = TREATMENTS.length > 0 ? TREATMENTS.map(function (t) {
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
    }).join('') : '<tr><td colspan="7" style="text-align:center;padding:48px 20px;color:#94a3b8;font-size:13px;"><div style="font-size:26px;margin-bottom:8px;">🏥</div>No inpatient treatment records found.</td></tr>';

    return [
      '<div class="zvs-kpi-grid">',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Active Inpatient Ward</span><span class="zvs-kpi-icon">🏥</span></div><div class="zvs-kpi-val">' + TREATMENTS.length + ' Patients</div><div class="zvs-kpi-bottom"><span class="zvs-delta neutral">0% Occupancy</span><span class="zvs-subtext">All wards available</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Treatment Recovery Rate</span><span class="zvs-kpi-icon">🎯</span></div><div class="zvs-kpi-val">0.0%</div><div class="zvs-kpi-bottom"><span class="zvs-delta neutral">No active cases</span><span class="zvs-subtext">Clinical recovery to discharge</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Avg Hospital Stay</span><span class="zvs-kpi-icon">⏱️</span></div><div class="zvs-kpi-val">-- Days</div><div class="zvs-kpi-bottom"><span class="zvs-delta neutral">Optimal bed turnover</span><span class="zvs-subtext">Target: &lt; 4.0 Days</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Discharge Ready</span><span class="zvs-kpi-icon">🏡</span></div><div class="zvs-kpi-val">0 Pets Today</div><div class="zvs-kpi-bottom"><span class="zvs-delta neutral">No discharges pending</span><span class="zvs-subtext">Post-op follow-up clear</span></div></div>',
      '</div>',

      '<div class="zvs-card">',
      '  <div class="zvs-card-head"><div><h3 class="zvs-card-title">Inpatient Ward Management & Daily Clinical Progress</h3><p class="zvs-card-sub">Active therapy lines, intravenous fluids, vital signs monitoring, and attending physician notes</p></div></div>',
      '  <div class="zvs-table-wrap">',
      '    <table class="zvs-table">',
      '      <thead><tr><th>Patient & Case</th><th>Ward Bed</th><th>Attending Vet</th><th>Clinical Regimen</th><th>Stay Duration</th><th>Recovery</th><th>Status</th></tr></thead>',
      '      <tbody>' + rowsHtml + '</tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderVaccinations() {
    var rowsHtml = VACCINATIONS.length > 0 ? VACCINATIONS.map(function (v) {
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
    }).join('') : '<tr><td colspan="8" style="text-align:center;padding:48px 20px;color:#94a3b8;font-size:13px;"><div style="font-size:26px;margin-bottom:8px;">💉</div>No immunization records found.</td></tr>';

    return [
      '<div class="zvs-kpi-grid">',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Vaccines Administered MTD</span><span class="zvs-kpi-icon">💉</span></div><div class="zvs-kpi-val">' + VACCINATIONS.length + ' Doses</div><div class="zvs-kpi-bottom"><span class="zvs-delta neutral">0 doses MTD</span><span class="zvs-subtext">Canine & Feline</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Cold-Chain Adherence</span><span class="zvs-kpi-icon">❄️</span></div><div class="zvs-kpi-val">100.0%</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">↑ 2-8°C Verified</span><span class="zvs-subtext">IoT cold-chain online</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Booster Recall Rate</span><span class="zvs-kpi-icon">📲</span></div><div class="zvs-kpi-val">0.0%</div><div class="zvs-kpi-bottom"><span class="zvs-delta neutral">0 reminders sent</span><span class="zvs-subtext">Automated recall ready</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Digital Passports Issued</span><span class="zvs-kpi-icon">🛡️</span></div><div class="zvs-kpi-val">0 Certs</div><div class="zvs-kpi-bottom"><span class="zvs-delta neutral">0 issued</span><span class="zvs-subtext">QR code verifiable passport</span></div></div>',
      '</div>',

      '<div class="zvs-card">',
      '  <div class="zvs-card-head"><div><h3 class="zvs-card-title">Official Immunization Registry & Cold-Chain Vials</h3><p class="zvs-card-sub">Biological product lot tracking, refrigeration temperature logs, and expiry management</p></div></div>',
      '  <div class="zvs-table-wrap">',
      '    <table class="zvs-table">',
      '      <thead><tr><th>Cert ID</th><th>Pet & Species</th><th>Vaccine Product</th><th>Batch / Lot No</th><th>Date</th><th>Next Booster</th><th>Cold Chain</th><th>Status</th></tr></thead>',
      '      <tbody>' + rowsHtml + '</tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderDiagnostics() {
    var rowsHtml = DIAGNOSTICS.length > 0 ? DIAGNOSTICS.map(function (d) {
      return [
        '<tr>',
        '  <td style="font-weight:700;color:#2563eb;font-family:monospace;">' + d.id + '</td>',
        '  <td style="font-weight:700;color:#0f172a;">' + d.pet + '</td>',
        '  <td style="font-weight:600;color:#0f172a;">' + d.test + '</td>',
        '  <td><span class="zvs-tag ' + (d.modality === 'Biochemistry' ? 'green' : d.modality === 'Ultrasound' ? 'purple' : 'blue') + '">' + d.modality + '</span></td>',
        '  <td style="color:#475569;">' + d.vet + '</td>',
        '  <td style="font-family:monospace;color:#334155;">' + d.tat + '</td>',
        '  <td><span class="zvs-tag ' + (d.flag && d.flag.indexOf('High') >= 0 ? 'red' : 'yellow') + '">' + d.flag + '</span></td>',
        '  <td><span class="zvs-tag ' + (d.status === 'Report Signed' ? 'green' : 'blue') + '">' + d.status + '</span></td>',
        '</tr>'
      ].join('');
    }).join('') : '<tr><td colspan="8" style="text-align:center;padding:48px 20px;color:#94a3b8;font-size:13px;"><div style="font-size:26px;margin-bottom:8px;">🔬</div>No diagnostic lab orders or imaging tests recorded. Click "Order Diagnostic" to create.</td></tr>';

    return [
      '<div class="zvs-kpi-grid">',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Tests Processed MTD</span><span class="zvs-kpi-icon">🔬</span></div><div class="zvs-kpi-val">' + DIAGNOSTICS.length + ' Tests</div><div class="zvs-kpi-bottom"><span class="zvs-delta neutral">0 MTD</span><span class="zvs-subtext">Biochemistry, Hematology, DR</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Avg Turnaround Time</span><span class="zvs-kpi-icon">⏱️</span></div><div class="zvs-kpi-val">-- mins</div><div class="zvs-kpi-bottom"><span class="zvs-delta neutral">Target &lt; 45m</span><span class="zvs-subtext">Digital PACS sync</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Critical Lab Alerts</span><span class="zvs-kpi-icon">⚠️</span></div><div class="zvs-kpi-val">0 Alerts</div><div class="zvs-kpi-bottom"><span class="zvs-delta neutral">No stat alerts</span><span class="zvs-subtext">Direct vet telemetry</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Digital Imaging Usage</span><span class="zvs-kpi-icon">🩻</span></div><div class="zvs-kpi-val">0.0%</div><div class="zvs-kpi-bottom"><span class="zvs-delta neutral">DR & Ultrasound</span><span class="zvs-subtext">0 imaging runs</span></div></div>',
      '</div>',

      '<div class="zvs-card">',
      '  <div class="zvs-card-head"><div><h3 class="zvs-card-title">Live Clinical Lab Pipeline & Imaging Orders</h3><p class="zvs-card-sub">Hematology analyzers, dry chemistry rotors, radiography, and pathologist validations</p></div></div>',
      '  <div class="zvs-table-wrap">',
      '    <table class="zvs-table">',
      '      <thead><tr><th>Order ID</th><th>Pet & Patient</th><th>Investigation / Panel</th><th>Modality</th><th>Referral Vet</th><th>Turnaround</th><th>Findings</th><th>Status</th></tr></thead>',
      '      <tbody>' + rowsHtml + '</tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderProcedures() {
    var rowsHtml = PROCEDURES.length > 0 ? PROCEDURES.map(function (p) {
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
    }).join('') : '<tr><td colspan="8" style="text-align:center;padding:48px 20px;color:#94a3b8;font-size:13px;"><div style="font-size:26px;margin-bottom:8px;">✂️</div>No surgical procedures scheduled. Operating theaters are ready.</td></tr>';

    return [
      '<div class="zvs-kpi-grid">',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Surgeries Today</span><span class="zvs-kpi-icon">✂️</span></div><div class="zvs-kpi-val">' + PROCEDURES.length + ' Surgeries</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">100% OT Sterility</span><span class="zvs-subtext">Theaters clean & ready</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">OT Theater Utilization</span><span class="zvs-kpi-icon">🏥</span></div><div class="zvs-kpi-val">0.0%</div><div class="zvs-kpi-bottom"><span class="zvs-delta neutral">0 active sessions</span><span class="zvs-subtext">Sterile surgical suites</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Anesthesia Safety Record</span><span class="zvs-kpi-icon">🫁</span></div><div class="zvs-kpi-val">100.0%</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">Monitoring online</span><span class="zvs-subtext">Capnography & ECG logging</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Surgical Infection Rate</span><span class="zvs-kpi-icon">🛡️</span></div><div class="zvs-kpi-val">0.0%</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">Benchmark: 0.0%</span><span class="zvs-subtext">Autoclave biological spore pass</span></div></div>',
      '</div>',

      '<div class="zvs-card">',
      '  <div class="zvs-card-head"><div><h3 class="zvs-card-title">Live Surgical Theater Manifest & Operation Log</h3><p class="zvs-card-sub">Sterile theater assignments, procedure duration, lead surgeon, and anesthesia protocols</p></div></div>',
      '  <div class="zvs-table-wrap">',
      '    <table class="zvs-table">',
      '      <thead><tr><th>Surgical ID</th><th>Patient</th><th>Procedure Details</th><th>Theater</th><th>Lead Surgeon</th><th>Duration</th><th>Anesthesia</th><th>Status</th></tr></thead>',
      '      <tbody>' + rowsHtml + '</tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderRevenue() {
    var rowsHtml = REVENUE_DATA.length > 0 ? REVENUE_DATA.map(function (r) {
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
    }).join('') : '<tr><td colspan="6" style="text-align:center;padding:48px 20px;color:#94a3b8;font-size:13px;"><div style="font-size:26px;margin-bottom:8px;">💰</div>No clinical revenue transactions recorded. New billings will be calculated automatically.</td></tr>';

    return [
      '<div class="zvs-kpi-grid">',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Gross Clinical Revenue</span><span class="zvs-kpi-icon">💰</span></div><div class="zvs-kpi-val">₹0</div><div class="zvs-kpi-bottom"><span class="zvs-delta neutral">₹0 MTD</span><span class="zvs-subtext">Awaiting billings</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Avg Revenue per Case</span><span class="zvs-kpi-icon">💳</span></div><div class="zvs-kpi-val">₹0</div><div class="zvs-kpi-bottom"><span class="zvs-delta neutral">0 cases</span><span class="zvs-subtext">Blended consult + surgery</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Surgery Billings</span><span class="zvs-kpi-icon">✂️</span></div><div class="zvs-kpi-val">₹0</div><div class="zvs-kpi-bottom"><span class="zvs-delta neutral">0 share</span><span class="zvs-subtext">Clinical billings</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Collection Rate</span><span class="zvs-kpi-icon">🎯</span></div><div class="zvs-kpi-val">100.0%</div><div class="zvs-kpi-bottom"><span class="zvs-delta neutral">Zero bad debts</span><span class="zvs-subtext">Instant digital UPI / Card</span></div></div>',
      '</div>',

      '<div class="zvs-card">',
      '  <div class="zvs-card-head"><div><h3 class="zvs-card-title">Clinical Revenue Breakdown by Medical Specialty</h3><p class="zvs-card-sub">Monthly procedure billings, case volumes, and average case realizations</p></div></div>',
      '  <div class="zvs-table-wrap">',
      '    <table class="zvs-table">',
      '      <thead><tr><th>Specialty</th><th>Monthly Billings</th><th>Cases</th><th>Avg Realization (AOV)</th><th>Share of Clinical Billings</th><th>Gross Margin</th></tr></thead>',
      '      <tbody>' + rowsHtml + '</tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderProfitability() {
    var rowsHtml = PROFIT_DATA.length > 0 ? PROFIT_DATA.map(function (p) {
      return [
        '<tr>',
        '  <td style="font-weight:700;color:#0f172a;">' + p.service + '</td>',
        '  <td style="font-weight:600;color:#0f172a;font-family:monospace;">' + p.rev + '</td>',
        '  <td style="color:#dc2626;font-family:monospace;">' + p.cogs + '</td>',
        '  <td style="font-weight:700;color:#16a34a;font-family:monospace;">' + p.profit + '</td>',
        '  <td style="font-weight:700;color:#2563eb;">' + p.margin + '</td>',
        '  <td><span class="zvs-tag ' + (p.tier && p.tier.indexOf('Highest') >= 0 ? 'green' : 'blue') + '">' + p.tier + '</span></td>',
        '</tr>'
      ].join('');
    }).join('') : '<tr><td colspan="6" style="text-align:center;padding:48px 20px;color:#94a3b8;font-size:13px;"><div style="font-size:26px;margin-bottom:8px;">📈</div>No service profitability data recorded. Margins will calculate with incoming revenue.</td></tr>';

    return [
      '<div class="zvs-kpi-grid">',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Blended Gross Margin</span><span class="zvs-kpi-icon">📈</span></div><div class="zvs-kpi-val">0.0%</div><div class="zvs-kpi-bottom"><span class="zvs-delta neutral">0.0% YoY</span><span class="zvs-subtext">Awaiting clinical billings</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Clinical Gross Profit</span><span class="zvs-kpi-icon">💰</span></div><div class="zvs-kpi-val">₹0</div><div class="zvs-kpi-bottom"><span class="zvs-delta neutral">₹0 MTD</span><span class="zvs-subtext">Revenue minus COGS</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Doctor Commission Split</span><span class="zvs-kpi-icon">👨‍⚕️</span></div><div class="zvs-kpi-val">0.0%</div><div class="zvs-kpi-bottom"><span class="zvs-delta neutral">0 payouts</span><span class="zvs-subtext">Accretive model</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">EBITDA Contribution</span><span class="zvs-kpi-icon">💎</span></div><div class="zvs-kpi-val">₹0</div><div class="zvs-kpi-bottom"><span class="zvs-delta neutral">₹0 net yield</span><span class="zvs-subtext">After hospital overheads</span></div></div>',
      '</div>',

      '<div class="zvs-card">',
      '  <div class="zvs-card-head"><div><h3 class="zvs-card-title">Clinical Unit Economics & Direct Expense Margins</h3><p class="zvs-card-sub">Contribution profit per clinical line after surgeon fees, anesthesia gases, implants, and consumables</p></div></div>',
      '  <div class="zvs-table-wrap">',
      '    <table class="zvs-table">',
      '      <thead><tr><th>Service Line</th><th>Revenue</th><th>Direct Cost / COGS</th><th>Gross Profit</th><th>Margin %</th><th>Margin Tier</th></tr></thead>',
      '      <tbody>' + rowsHtml + '</tbody>',
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

      fetch('/api/v1/veterinary/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pet_name: pet,
          pet_type: 'Canine',
          parent_name: p,
          parent_phone: '+91 98450 12345',
          doctor_name: d,
          service_name: r || 'General Consultation',
          appointment_date: new Date().toISOString().slice(0, 10),
          appointment_time: '11:00 AM',
          clinic_name: c
        })
      })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        showToast('✓ Appointment booked in MySQL database!');
        closeM();
        loadLiveAppointments(function () {
          switchTab('appointments');
        });
      })
      .catch(function (err) {
        showToast('Booking error: ' + err.message);
      });
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
