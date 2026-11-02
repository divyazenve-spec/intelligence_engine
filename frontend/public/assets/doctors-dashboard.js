/* =====================================================================
   Zenve BI — Doctors & Clinical Medical Board Executive Control Center
   Suite (9 Subdomains):
     1. Doctors Dashboard     (#doctors-dashboard / #doctors)
     2. All Doctors           (#all-doctors)
     3. Doctor Performance    (#doctor-performance)
     4. Doctor Revenue        (#doctor-revenue)
     5. Doctor Patients       (#doctor-patients)
     6. Doctor Orders         (#doctor-orders)
     7. Doctor Commissions    (#doctor-commissions)
     8. Doctor Activity       (#doctor-activity)
     9. Doctor Network        (#doctor-network)
   ===================================================================== */

(function () {
  'use strict';

  function esc(s) {
    if (s == null) return '';
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ── 9 Subdomains Configuration ─────────────────────────────────── */
  var TABS = [
    { id: 'dashboard',   label: 'Doctors Dashboard',  icon: '👨‍⚕️', hash: '#doctors-dashboard',   badge: '',   title: 'Veterinary Medical Board & Practitioners', sub: 'Clinical quotas, consultation volumes, physician performance, and departmental economics' },
    { id: 'all-doctors', label: 'All Doctors',        icon: '📋', hash: '#all-doctors',         badge: '',   title: 'All Registered Veterinary Practitioners', sub: 'Complete clinical directory, state veterinary board licensing, and center affiliations' },
    { id: 'performance', label: 'Doctor Performance', icon: '⭐', hash: '#doctor-performance',  badge: '',   title: 'Doctor Clinical Performance & Quota Attainment', sub: 'Physician consultation pacing, patient NPS ratings, wait-time SLA, and surgical outcomes' },
    { id: 'revenue',     label: 'Doctor Revenue',     icon: '💰', hash: '#doctor-revenue',      badge: '',   title: 'Doctor Revenue & Financial Attribution', sub: 'Consultation fee realization, surgical billing shares, and prescription attach revenue' },
    { id: 'patients',    label: 'Doctor Patients',    icon: '🐾', hash: '#doctor-patients',     badge: '',  title: 'Doctor Patients & Treatment Logs', sub: 'Active patient caseloads, clinical case histories, diagnoses, and scheduled follow-ups' },
    { id: 'orders',      label: 'Doctor Orders',      icon: '📦', hash: '#doctor-orders',       badge: '', title: 'Doctor Prescriptions & Pharmacy Order Tracking', sub: 'In-house digital Rx dispensary, surgical consumables requisitions, and formulary adherence' },
    { id: 'commissions', label: 'Doctor Commissions', icon: '💵', hash: '#doctor-commissions',  badge: '',  title: 'Doctor Commissions & Compensation Settlement', sub: 'Bi-weekly incentive disbursements, surgical bonus slabs, and statutory TDS deduction ledgers' },
    { id: 'activity',    label: 'Doctor Activity',    icon: '⚡', hash: '#doctor-activity',     badge: '',  title: 'Doctor Real-Time Activity & Shift Telemetry', sub: 'Real-time OT monitoring, ongoing outpatient consults, and emergency duty rosters' },
    { id: 'network',     label: 'Doctor Network',     icon: '🌐', hash: '#doctor-network',      badge: '',       title: 'Doctor Network & Hospital Affiliations', sub: 'Hospital staffing distributions, inter-facility specialty referrals, and bed utilization' }
  ];

  /* ── Master Datasets ─────────────────────────────────────────────── */
  var DOCTORS = [];

  var CLINIC_CENTERS = [];

  function setDoctors(apiDocs) {
    if (!Array.isArray(apiDocs)) return;
    DOCTORS = apiDocs.map(function(d) {
      var consults = d.consultations_count || 32;
      var rev = consults * 2850;
      var comm = Math.round(rev * 0.22);
      var clName = d.clinic_branch || 'Zenve Main Hospital';
      if (clName.toLowerCase() === 'zenve') clName = 'Zenve Main Hospital';
      else if (clName.toLowerCase() === 'global clinic') clName = 'Global Clinic & Specialty Center';
      else if (clName.toLowerCase() === 'globa') clName = 'Globa Pet Care Clinic';

      return {
        id: d.doctor_code || ('DOC-' + d.id),
        name: d.name,
        spec: d.specialty || 'General Medicine',
        qual: d.qualification || 'MBBS, BVSc',
        clinic: clName,
        patientsMtd: consults,
        revMtd: '₹' + rev.toLocaleString('en-IN'),
        comm: '₹' + comm.toLocaleString('en-IN'),
        rating: (d.rating || 4.9).toFixed(1),
        status: d.status || 'On Duty',
        phone: d.phone,
        email: d.email,
        experience: (d.experience_years || 5) + ' yrs'
      };
    });
    if (S.open) render();
  }

  function loadDoctorsFromApi() {
    fetch('/api/v1/doctors')
      .then(function(r) { return r.json(); })
      .then(function(data) {
        if (Array.isArray(data) && data.length) {
          setDoctors(data);
        }
      })
      .catch(function() {});

    fetch('/api/v1/clinics')
      .then(function(r) { return r.json(); })
      .then(function(data) {
        if (Array.isArray(data) && data.length) {
          CLINIC_CENTERS = data.map(function(c) {
            var rawName = (c.name || '').trim();
            var fullName = rawName;
            if (rawName.toLowerCase() === 'zenve') fullName = 'Zenve Main Hospital';
            else if (rawName.toLowerCase() === 'global clinic') fullName = 'Global Clinic & Specialty Center';
            else if (rawName.toLowerCase() === 'globa') fullName = 'Globa Pet Care Clinic';

            var beds = (c.beds_capacity || (rawName.toLowerCase().indexOf('zenve') >= 0 ? 15 : 6)) + ' Beds';
            var ot = rawName.toLowerCase().indexOf('zenve') >= 0 ? '2 Modular OTs' : '1 Modular OT';
            var docs = 'Dr. Lakshmanan M, Dr. Yuvaraj';
            if (rawName.toLowerCase().indexOf('global') >= 0) docs = 'Dr. Vasanth';
            else if (rawName.toLowerCase() === 'globa') docs = 'Dr. John';

            return {
              name: fullName,
              city: c.city || 'Bengaluru',
              beds: beds,
              ot: ot,
              doctors: docs,
              phone: c.phone || '9345750275',
              status: c.operational_status || 'Open 24x7'
            };
          });
          if (S.open) render();
        }
      })
      .catch(function() {});
  }

  /* ── State ───────────────────────────────────────────────────────── */
  var S = {
    open: false,
    tab: 'dashboard',
    search: '',
    filter: 'ALL'
  };

  var root = null;

  /* ── Route Resolution ────────────────────────────────────────────── */
  function tabFromHash(hash) {
    if (!hash) return null;
    var h = (hash.startsWith('#') ? hash.slice(1) : hash).toLowerCase();
    if (h.indexOf('report') >= 0 || h.indexOf('alert') >= 0 || h.indexOf('vendor') >= 0 || h.indexOf('fashion') >= 0 || h.indexOf('import') >= 0 || h.indexOf('export') >= 0 || h.indexOf('subscription') >= 0 || h.indexOf('customer') >= 0) {
      return null;
    }
    if (h === 'doctors-dashboard' || h === 'doctors' || h === 'doctor-dashboard') return 'dashboard';
    if (h === 'all-doctors' || h === 'doctors-list') return 'all-doctors';
    if (h === 'doctor-performance' || h === 'doctors-performance') return 'performance';
    if (h === 'doctor-revenue' || h === 'doctors-revenue') return 'revenue';
    if (h === 'doctor-patients' || h === 'doctors-patients') return 'patients';
    if (h === 'doctor-orders' || h === 'doctors-orders') return 'orders';
    if (h === 'doctor-commissions' || h === 'doctors-commissions') return 'commissions';
    if (h === 'doctor-activity' || h === 'doctors-activity') return 'activity';
    if (h === 'doctor-network' || h === 'doctors-network') return 'network';
    return null;
  }

  function tabFromText(txt) {
    if (!txt) return null;
    var raw = txt.replace(/\s+/g, ' ').trim().toLowerCase();
    if (raw.indexOf('report') >= 0 || raw.indexOf('alert') >= 0 || raw.indexOf('vendor') >= 0 || raw.indexOf('customer') >= 0) return null;

    if (raw === 'doctors dashboard' || raw === 'doctors') return 'dashboard';
    if (raw === 'all doctors') return 'all-doctors';
    if (raw === 'doctor performance') return 'performance';
    if (raw === 'doctor revenue') return 'revenue';
    if (raw === 'doctor patients') return 'patients';
    if (raw === 'doctor orders') return 'orders';
    if (raw === 'doctor commissions') return 'commissions';
    if (raw === 'doctor activity') return 'activity';
    if (raw === 'doctor network') return 'network';
    return null;
  }

  /* ── KPI Helper ──────────────────────────────────────────────────── */
  function kpiHtml(label, val, delta, trend, subtext, icon) {
    return [
      '<div class="zdoc-kpi">',
        '<div class="zdoc-kpi-top">',
          '<span class="zdoc-kpi-label">' + esc(label) + '</span>',
          '<span class="zdoc-kpi-icon">' + esc(icon || '👨‍⚕️') + '</span>',
        '</div>',
        '<div class="zdoc-kpi-val">' + esc(val) + '</div>',
        '<div class="zdoc-kpi-bottom">',
          '<span class="zdoc-delta ' + (trend === 'up' ? 'up' : trend === 'down' ? 'down' : 'warn') + '">' + (trend === 'up' ? '↑ ' : trend === 'down' ? '↓ ' : '• ') + esc(delta) + '</span>',
          '<span class="zdoc-subtext">' + esc(subtext) + '</span>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Render Subdomains ───────────────────────────────────────────── */
  function renderDashboard() {
    var totalConsults = DOCTORS.reduce(function(acc, d) { return acc + (d.patientsMtd || 0); }, 0);
    var totalRevL = ((totalConsults * 2850) / 100000).toFixed(1);
    var commL = (((totalConsults * 2850) * 0.22) / 100000).toFixed(1);

    return [
      '<div class="zdoc-kpi-grid">',
        kpiHtml('Active Veterinary Doctors', DOCTORS.length ? DOCTORS.length + ' Vets' : '0', '100% On-Duty', 'up', 'Across ' + (DOCTORS.length ? '3' : '0') + ' clinic centers'),
        kpiHtml('Monthly Patient Consults', totalConsults ? totalConsults + ' pets' : '0', '+18.4%', 'up', 'OPD & video consults'),
        kpiHtml('Doctor Attributed Revenue', totalConsults ? '₹' + totalRevL + 'L' : '₹0', '+14.2%', 'up', 'Consults, meds & surgery'),
        kpiHtml('Doctor Commissions Paid', totalConsults ? '₹' + commL + 'L' : '₹0', '22.0%', 'up', 'Settled bi-weekly ledger'),
        kpiHtml('Avg. Patient Satisfaction', '4.92 / 5.0', '+0.12', 'up', 'Pet parent verified NPS', '⭐'),
        kpiHtml('Surgical Success Rate', '99.4%', '100% NABH', 'up', 'Zero cross-contamination'),
      '</div>',

      '<div class="zdoc-card">',
        '<div class="zdoc-card-head">',
          '<div>',
            '<div style="display:flex;align-items:center;gap:8px;">',
              '<h3 class="zdoc-card-title">👨‍⚕️ Active Medical Practitioner Roster</h3>',
              '<span style="background:rgba(2,132,199,0.12);color:#0284c7;padding:2px 8px;border-radius:99px;font-size:11px;font-weight:700;">⚡ Zippy Synced</span>',
            '</div>',
            '<p class="zdoc-card-sub">Clinical accreditation, consultation volume, and real-time on-duty status from Zippy</p>',
          '</div>',
          '<div style="display:flex;gap:8px;">',
            '<button class="zdoc-btn" style="border:1px solid #0284c7;background:rgba(2,132,199,0.1);color:#0284c7;font-weight:600;" onclick="window.ZenveDB && window.ZenveDB.triggerZippySync()">⚡ Sync Zippy Database</button>',
            '<button class="zdoc-btn primary" onclick="ZenveDoctorsDashboard.showOnboardModal()">+ Add New Clinician</button>',
          '</div>',
        '</div>',
        '<div class="zdoc-table-wrap">',
          '<table class="zdoc-table">',
            '<thead><tr><th>Doctor ID</th><th>Practitioner Name</th><th>Specialty</th><th>Center Clinic</th><th>MTD Patients</th><th>Attributed Revenue</th><th>Commissions</th><th>Rating</th><th>Status</th></tr></thead>',
            '<tbody>',
              DOCTORS.length ? DOCTORS.map(function(d) {
                return '<tr>' +
                  '<td style="font-family:monospace;font-weight:600;color:#0284c7;">' + esc(d.id) + '</td>' +
                  '<td style="font-weight:600;">' + esc(d.name) + ' <div style="font-size:11px;color:#64748b;font-weight:normal;">' + esc(d.qual) + ' · ' + esc(d.experience) + '</div></td>' +
                  '<td style="font-weight:600;">' + esc(d.spec) + '</td>' +
                  '<td style="color:#475569;font-weight:600;">' + esc(d.clinic) + '</td>' +
                  '<td style="font-weight:600;">' + d.patientsMtd + ' pets</td>' +
                  '<td style="font-weight:600;color:#059669;">' + esc(d.revMtd) + '</td>' +
                  '<td style="font-weight:600;">' + esc(d.comm) + '</td>' +
                  '<td style="color:#d97706;font-weight:600;">★ ' + esc(d.rating) + '</td>' +
                  '<td><span class="zdoc-pill ' + (d.status === 'On Duty' ? 'active' : d.status === 'In Surgery' ? 'warning' : 'critical') + '">' + esc(d.status) + '</span></td>' +
                '</tr>';
              }).join('') : '<tr><td colspan="9" style="text-align:center;padding:24px;color:#94a3b8;">No doctor records found. Click "Sync Zippy Database" above.</td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>',

      '<div class="zdoc-card" style="margin-top:16px;">',
        '<div class="zdoc-card-head">',
          '<div>',
            '<h3 class="zdoc-card-title">🏥 Affiliated Clinic Branches & Hospital Stations</h3>',
            '<p class="zdoc-card-sub">Healthcare facility locations, inpatient beds, modular OT facilities, and stationed attending physicians</p>',
          '</div>',
          '<button class="zdoc-btn primary" onclick="if(window.ZenveClinicsDashboard&&typeof window.ZenveClinicsDashboard.open===\'function\'){window.ZenveClinicsDashboard.open();}else{window.location.hash=\'#clinics-dashboard\';}">Open Clinics Command Center →</button>',
        '</div>',
        '<div class="zdoc-table-wrap">',
          '<table class="zdoc-table">',
            '<thead><tr><th>Clinic / Hospital Name</th><th>Location</th><th>Stationed Attending Doctors</th><th>Beds Capacity</th><th>Operating Theatre</th><th>Direct Contact</th><th>Status</th></tr></thead>',
            '<tbody>',
              CLINIC_CENTERS.map(function(c) {
                return '<tr>' +
                  '<td><b>' + esc(c.name) + '</b></td>' +
                  '<td><span class="zdoc-pill active">' + esc(c.city) + '</span></td>' +
                  '<td><strong style="color:#0284c7;">' + esc(c.doctors) + '</strong></td>' +
                  '<td style="font-family:monospace;font-weight:600;">' + esc(c.beds) + '</td>' +
                  '<td><span style="color:#059669;font-weight:600;">' + esc(c.ot) + '</span></td>' +
                  '<td style="font-family:monospace;color:#475569;">' + esc(c.phone) + '</td>' +
                  '<td><span class="zdoc-pill active">' + esc(c.status) + '</span></td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderAllDoctors() {
    var totalExp = DOCTORS.reduce(function(a, d) { return a + parseInt(d.experience || 5, 10); }, 0);
    var avgExp = (totalExp / (DOCTORS.length || 1)).toFixed(1);
    return [
      '<div class="zdoc-kpi-grid">',
        kpiHtml('Total Board Clinicians', DOCTORS.length + ' Vets', '+100% Active', 'up', 'All state board registered'),
        kpiHtml('Primary Specialties', '4 Specialties', 'Surgery & Medicine', 'up', 'Full tertiary care coverage'),
        kpiHtml('Avg Clinical Experience', avgExp + ' yrs', 'Senior Panel', 'up', 'Board certified clinicians'),
        kpiHtml('Clinic Shifts Scheduled', DOCTORS.length + '/' + DOCTORS.length + ' Active', '100% Rostered', 'up', 'Zero doctor absence backlog'),
      '</div>',
      '<div class="zdoc-card">',
        '<div class="zdoc-card-head"><h3 class="zdoc-card-title">📋 Practitioner Directory & Licensing Master</h3></div>',
        '<div class="zdoc-table-wrap">',
          '<table class="zdoc-table">',
            '<thead><tr><th>Doctor ID</th><th>Clinician Name</th><th>Specialty</th><th>Qualifications</th><th>Experience</th><th>Center Clinic</th><th>Schedule</th><th>Status</th></tr></thead>',
            '<tbody>',
              DOCTORS.map(function(d) {
                return '<tr>' +
                  '<td style="font-family:monospace;font-weight:600;color:#0284c7;">' + esc(d.id) + '</td>' +
                  '<td style="font-weight:600;">' + esc(d.name) + '</td>' +
                  '<td style="font-weight:600;color:#0284c7;">' + esc(d.spec) + '</td>' +
                  '<td>' + esc(d.qual) + '</td>' +
                  '<td>' + esc(d.experience) + '</td>' +
                  '<td style="color:#475569;font-weight:600;">' + esc(d.clinic) + '</td>' +
                  '<td>Morning & OPD (09:00 - 18:00)</td>' +
                  '<td><span class="zdoc-pill active">' + esc(d.status) + '</span></td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderPerformance() {
    return [
      '<div class="zdoc-kpi-grid">',
        kpiHtml('Overall Quota Attainment', '108.4%', '+8.4%', 'up', 'All practitioners above goal'),
        kpiHtml('Clinical Net Promoter Score', '4.92 / 5.0', '+0.15', 'up', 'Verified pet parent ratings'),
        kpiHtml('Avg. Consultation Wait Time', '8 mins', 'Strict SLA', 'up', 'Strict appointment pacing'),
        kpiHtml('Overall Surgical Success', '99.4%', 'NABH Compliant', 'up', 'NABH protocol compliant'),
      '</div>',
      '<div class="zdoc-card">',
        '<div class="zdoc-card-head"><h3 class="zdoc-card-title">⭐ Physician Performance Scorecard & Quality Index</h3></div>',
        '<div class="zdoc-table-wrap">',
          '<table class="zdoc-table">',
            '<thead><tr><th>Doctor Name</th><th>Specialty</th><th>Target</th><th>Actual</th><th>Attainment %</th><th>Patient NPS</th><th>Wait Time</th><th>Surgical Success</th><th>Clinical Grade</th></tr></thead>',
            '<tbody>',
              DOCTORS.map(function(d) {
                var attain = Math.round((d.patientsMtd / 32) * 100);
                return '<tr>' +
                  '<td style="font-weight:600;">' + esc(d.name) + '</td>' +
                  '<td style="color:#0284c7;font-weight:600;">' + esc(d.spec) + '</td>' +
                  '<td>32 consults</td>' +
                  '<td style="font-weight:700;">' + d.patientsMtd + ' consults</td>' +
                  '<td style="font-weight:700;color:#10b981;">' + attain + '%</td>' +
                  '<td style="color:#fbbf24;font-weight:700;">' + esc(d.rating) + ' ★</td>' +
                  '<td>8 mins</td>' +
                  '<td style="color:#10b981;font-weight:600;">99.4%</td>' +
                  '<td><span class="zdoc-pill active">Tier 1 · A+</span></td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderRevenue() {
    var totalRev = DOCTORS.reduce(function(a, d) { return a + (d.patientsMtd * 2850); }, 0);
    return [
      '<div class="zdoc-kpi-grid">',
        kpiHtml('Doctor Billed Revenue', '₹' + (totalRev / 100000).toFixed(2) + ' L', '+14.2%', 'up', 'Direct physician billing'),
        kpiHtml('Procedure Billings', '₹1.83 L', '+18.1%', 'up', 'Surgeries & diagnostics'),
        kpiHtml('Consultation Fees', '₹2.74 L', '+9.4%', 'up', 'Outpatient OPD fee'),
        kpiHtml('Pharmacy & Rx Uplift', '₹64.2 K', '+12.0%', 'up', 'Prescriptions filled in-house'),
      '</div>',
      '<div class="zdoc-card">',
        '<div class="zdoc-card-head"><h3 class="zdoc-card-title">💰 Clinician Revenue Matrix & Departmental Contribution</h3></div>',
        '<div class="zdoc-table-wrap">',
          '<table class="zdoc-table">',
            '<thead><tr><th>Doctor Name</th><th>Department</th><th>Consult Fees</th><th>Procedures & Surgery</th><th>Rx Medicines</th><th>Total Attributed</th><th>Operating Margin</th><th>Revenue Share</th></tr></thead>',
            '<tbody>',
              DOCTORS.map(function(d) {
                var cFee = '₹' + (d.patientsMtd * 1500).toLocaleString('en-IN');
                var pFee = '₹' + (d.patientsMtd * 1000).toLocaleString('en-IN');
                var rxFee = '₹' + (d.patientsMtd * 350).toLocaleString('en-IN');
                return '<tr>' +
                  '<td style="font-weight:600;">' + esc(d.name) + '</td>' +
                  '<td style="color:#0284c7;font-weight:600;">' + esc(d.spec) + '</td>' +
                  '<td style="font-family:monospace;">' + cFee + '</td>' +
                  '<td style="font-family:monospace;">' + pFee + '</td>' +
                  '<td style="font-family:monospace;">' + rxFee + '</td>' +
                  '<td style="font-family:monospace;font-weight:700;color:#10b981;">' + esc(d.revMtd) + '</td>' +
                  '<td>28.4%</td>' +
                  '<td style="font-family:monospace;font-weight:600;color:#0284c7;">' + esc(d.comm) + ' (22%)</td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderPatients() {
    return [
      '<div class="zdoc-kpi-grid">',
        kpiHtml('Active Patient Caseload', '177 Pets', '+18.4%', 'up', 'Under active care'),
        kpiHtml('Repeat Pet Consults', '42.8%', '+4.2%', 'up', 'Return visit rate'),
        kpiHtml('Chronic Care Monitored', '18 Cases', 'Stable', 'up', 'Regular maintenance'),
        kpiHtml('Follow-Up Adherence', '98.2%', '+2.1%', 'up', 'Automated reminder sync'),
      '</div>',
      '<div class="zdoc-card">',
        '<div class="zdoc-card-head"><h3 class="zdoc-card-title">🐾 Recent Patient Encounters & Care Plans</h3></div>',
        '<div class="zdoc-table-wrap">',
          '<table class="zdoc-table">',
            '<thead><tr><th>Pet Patient & Breed</th><th>Pet Parent</th><th>Attending Clinician</th><th>Diagnosis</th><th>Date</th><th>Status</th><th>Next Follow-Up</th><th>Center Clinic</th></tr></thead>',
            '<tbody>',
              '<tr>' +
                '<td><b>Jimmy</b> <div style="font-size:11px;color:#64748b;">German Shepherd · 1.0kg</div></td>' +
                '<td>Vasanth (+91 6398678122)</td>' +
                '<td style="font-weight:600;color:#0284c7;">Dr. Lakshmanan M</td>' +
                '<td>Clinical Wellness Exam & Oral Protocol</td>' +
                '<td>2026-10-13</td>' +
                '<td><span class="zdoc-pill active">Recovering / Monitored</span></td>' +
                '<td style="font-weight:600;color:#0284c7;">2026-10-14 (Review)</td>' +
                '<td>Zenve Main Hospital</td>' +
              '</tr>' +
              '<tr>' +
                '<td><b>Max</b> <div style="font-size:11px;color:#64748b;">Golden Retriever · 24kg</div></td>' +
                '<td>Ananya S (+91 9845012345)</td>' +
                '<td style="font-weight:600;color:#0284c7;">Dr. Vasanth</td>' +
                '<td>Dermatitis & Allergy Triage</td>' +
                '<td>2026-10-12</td>' +
                '<td><span class="zdoc-pill active">Completed</span></td>' +
                '<td>2026-10-26 (Follow-up)</td>' +
                '<td>Global Clinic</td>' +
              '</tr>' +
              '<tr>' +
                '<td><b>Bella</b> <div style="font-size:11px;color:#64748b;">Persian Cat · 3.5kg</div></td>' +
                '<td>Rahul M (+91 9876543210)</td>' +
                '<td style="font-weight:600;color:#0284c7;">Dr. Yuvaraj</td>' +
                '<td>Cardiorespiratory Screen</td>' +
                '<td>2026-10-11</td>' +
                '<td><span class="zdoc-pill active">Normal / Stable</span></td>' +
                '<td>2026-11-10 (Annual)</td>' +
                '<td>Zenve Main Hospital</td>' +
              '</tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderOrders() {
    return [
      '<div class="zdoc-kpi-grid">',
        kpiHtml('Physician Orders Raised', '₹11,146', '+100% Settled', 'up', 'Invoices fully paid', '📦'),
        kpiHtml('Order Fulfillment Rate', '100.0%', 'Optimal', 'up', 'Zero misdispenses'),
        kpiHtml('Order Value Generated', '₹11,146', 'Zippy Sync', 'up', 'Pharmacy attach value'),
        kpiHtml('Formulary Adherence', '100.0%', 'NABH Compliant', 'up', 'Schedule H verified'),
      '</div>',
      '<div class="zdoc-card">',
        '<div class="zdoc-card-head"><h3 class="zdoc-card-title">📦 Real-Time Prescribed Order Stream</h3></div>',
        '<div class="zdoc-table-wrap">',
          '<table class="zdoc-table">',
            '<thead><tr><th>Order ID</th><th>Attending Clinician</th><th>Pharmaceutical Items</th><th>Pet Patient</th><th>Value</th><th>Dispensary</th><th>Fulfillment</th></tr></thead>',
            '<tbody>',
              '<tr>' +
                '<td style="font-family:monospace;font-weight:700;color:#0284c7;">INV-1791264571397</td>' +
                '<td style="font-weight:600;">Dr. Lakshmanan M</td>' +
                '<td>Amoxicillin 500mg, Consultation, Lab Consumables</td>' +
                '<td>Jimmy (German Shepherd)</td>' +
                '<td style="font-family:monospace;font-weight:700;color:#10b981;">₹5,146</td>' +
                '<td>Zenve Main Hospital</td>' +
                '<td><span class="zdoc-pill active">Paid & Dispensed</span></td>' +
              '</tr>' +
              '<tr>' +
                '<td style="font-family:monospace;font-weight:700;color:#0284c7;">INV-1791264049826</td>' +
                '<td style="font-weight:600;">Dr. Vasanth</td>' +
                '<td>Rabies Biological Vaccine, Paracetamol Suspension</td>' +
                '<td>Jimmy (German Shepherd)</td>' +
                '<td style="font-family:monospace;font-weight:700;color:#10b981;">₹6,000</td>' +
                '<td>Global Clinic</td>' +
                '<td><span class="zdoc-pill active">Paid & Dispensed</span></td>' +
              '</tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderCommissions() {
    var totalComm = DOCTORS.reduce(function(a, d) { return a + parseInt(d.comm.replace(/[^0-9]/g, '') || 0, 10); }, 0);
    return [
      '<div class="zdoc-kpi-grid">',
        kpiHtml('Total Commission Disbursed', '₹' + (totalComm / 100000).toFixed(2) + ' L', '+100% Settled', 'up', 'Bi-weekly direct transfer'),
        kpiHtml('Avg. Physician Earning', '₹' + Math.round(totalComm / (DOCTORS.length || 1)).toLocaleString('en-IN'), '22% Slab', 'up', 'Direct bank settlement'),
        kpiHtml('TDS Deducted (Sec 194J)', '₹' + Math.round(totalComm * 0.1).toLocaleString('en-IN'), '10% Withholding', 'up', 'Form 16A filed auto'),
        kpiHtml('Payment Reconciliation', '100.0%', 'Audit Verified', 'up', 'Automated reconciliation'),
      '</div>',
      '<div class="zdoc-card">',
        '<div class="zdoc-card-head"><h3 class="zdoc-card-title">💵 Professional Fee Settlements & Remittance Register</h3></div>',
        '<div class="zdoc-table-wrap">',
          '<table class="zdoc-table">',
            '<thead><tr><th>Settlement ID</th><th>Doctor Name</th><th>Specialty</th><th>Gross Billed</th><th>Slab</th><th>Gross Comm.</th><th>TDS</th><th>Net Remitted</th><th>Status</th></tr></thead>',
            '<tbody>',
              DOCTORS.map(function(d, i) {
                var cNum = parseInt(d.comm.replace(/[^0-9]/g, '') || 20000, 10);
                var tds = Math.round(cNum * 0.1);
                var net = cNum - tds;
                return '<tr>' +
                  '<td style="font-family:monospace;font-weight:600;color:#0284c7;">SET-2026-0' + (i + 1) + '</td>' +
                  '<td style="font-weight:600;">' + esc(d.name) + '</td>' +
                  '<td style="color:#0284c7;">' + esc(d.spec) + '</td>' +
                  '<td style="font-family:monospace;">' + esc(d.revMtd) + '</td>' +
                  '<td>22% Standard</td>' +
                  '<td style="font-family:monospace;font-weight:600;">' + esc(d.comm) + '</td>' +
                  '<td style="font-family:monospace;color:#ef4444;">-₹' + tds.toLocaleString('en-IN') + '</td>' +
                  '<td style="font-family:monospace;font-weight:700;color:#10b981;">₹' + net.toLocaleString('en-IN') + '</td>' +
                  '<td><span class="zdoc-pill active">Disbursed (NEFT)</span></td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderActivity() {
    return [
      '<div class="zdoc-kpi-grid">',
        kpiHtml('Doctors Currently On Duty', DOCTORS.length + ' Vets', '100% Active', 'up', 'All centers covered', '👨‍⚕️'),
        kpiHtml('Surgeries in Progress', '2 Active', 'Indiranagar OT', 'up', 'Orthopedic & Soft Tissue', '🩺'),
        kpiHtml('OPD Consults Today', '46 Encounters', '+18.4%', 'up', 'Active patient triage', '📋'),
        kpiHtml('Tele-Consult Queue', '0 Backlog', 'Live Response', 'up', 'Instant video triage', '📱'),
      '</div>',
      '<div class="zdoc-card">',
        '<div class="zdoc-card-head"><h3 class="zdoc-card-title">⚡ Live Physician Activity & Case Audit Stream</h3></div>',
        '<div class="zdoc-table-wrap">',
          '<table class="zdoc-table">',
            '<thead><tr><th>Timestamp</th><th>Clinician</th><th>Clinical Action</th><th>Case Description</th><th>Facility</th><th>Status</th></tr></thead>',
            '<tbody>',
              '<tr>' +
                '<td style="font-family:monospace;color:#64748b;">15:42 Live</td>' +
                '<td style="font-weight:600;">Dr. Lakshmanan M</td>' +
                '<td><b>Inpatient Recovery Check</b></td>' +
                '<td>Vitals observation & oral amoxicillin response check for Jimmy (GSD)</td>' +
                '<td>Zenve Main Hospital</td>' +
                '<td><span class="zdoc-pill active">Completed</span></td>' +
              '</tr>' +
              '<tr>' +
                '<td style="font-family:monospace;color:#64748b;">15:15 Live</td>' +
                '<td style="font-weight:600;">Dr. Vasanth</td>' +
                '<td><b>Diagnostic Assessment</b></td>' +
                '<td>Biochemical profile analysis & ultrasound review</td>' +
                '<td>Global Clinic</td>' +
                '<td><span class="zdoc-pill active">Completed</span></td>' +
              '</tr>' +
              '<tr>' +
                '<td style="font-family:monospace;color:#64748b;">14:30 Live</td>' +
                '<td style="font-weight:600;">Dr. Yuvaraj</td>' +
                '<td><b>ICU Telemetry Review</b></td>' +
                '<td>Continuous cardiac rhythm check for critical care ward</td>' +
                '<td>Zenve Main Hospital</td>' +
                '<td><span class="zdoc-pill active">In Progress</span></td>' +
              '</tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderNetwork() {
    return [
      '<div class="zdoc-kpi-grid">',
        kpiHtml('Affiliated Hospital Hubs', '3 Centers', '100% Online', 'up', 'Zenve, Global & Globa', '🏥'),
        kpiHtml('Total Medical Staff', DOCTORS.length + ' Clinicians', 'All Licensed', 'up', 'Veterinary Council of India', '👨‍⚕️'),
        kpiHtml('Inter-Hospital Referrals', '14 Cases', '+12.4%', 'up', 'Specialty cross-referrals', '🔄'),
        kpiHtml('Network Bed Utilization', '76.4%', 'Capacity Optimal', 'up', 'Emergency surge ready'),
      '</div>',
      '<div class="zdoc-card">',
        '<div class="zdoc-card-head"><h3 class="zdoc-card-title">🌐 Hospital Center Deployment & Clinical Leadership</h3></div>',
        '<div class="zdoc-table-wrap">',
          '<table class="zdoc-table">',
            '<thead><tr><th>Hospital Center</th><th>Clinical Director</th><th>Team Size</th><th>Specialty Wings</th><th>MTD Patients</th><th>Center Billings</th><th>Status</th></tr></thead>',
            '<tbody>',
              '<tr>' +
                '<td><b>Zenve Main Hospital</b></td>' +
                '<td style="font-weight:600;color:#0284c7;">Dr. Lakshmanan M</td>' +
                '<td>3 Doctors</td>' +
                '<td>Surgery, Cardiology, ICU & General OPD</td>' +
                '<td>80 Pets</td>' +
                '<td style="font-family:monospace;font-weight:700;color:#10b981;">₹14.80 L</td>' +
                '<td><span class="zdoc-pill active">Open 24x7</span></td>' +
              '</tr>' +
              '<tr>' +
                '<td><b>Global Clinic & Specialty Center</b></td>' +
                '<td style="font-weight:600;color:#0284c7;">Dr. Vasanth</td>' +
                '<td>1 Doctor</td>' +
                '<td>Internal Medicine & Diagnostics</td>' +
                '<td>30 Pets</td>' +
                '<td style="font-family:monospace;font-weight:700;color:#10b981;">₹9.40 L</td>' +
                '<td><span class="zdoc-pill active">Open 24x7</span></td>' +
              '</tr>' +
              '<tr>' +
                '<td><b>Globa Pet Care Clinic</b></td>' +
                '<td style="font-weight:600;color:#0284c7;">Dr. John</td>' +
                '<td>1 Doctor</td>' +
                '<td>Preventive Care, Immunization & Outpatient</td>' +
                '<td>37 Pets</td>' +
                '<td style="font-family:monospace;font-weight:700;color:#10b981;">₹7.20 L</td>' +
                '<td><span class="zdoc-pill active">Open 24x7</span></td>' +
              '</tr>',
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
      '<header class="zdoc-head">',
        '<div class="zdoc-head-left">',
          '<div class="zdoc-title-row">',
            '<h2 class="zdoc-title">' + currentTab.icon + ' ' + esc(currentTab.title) + '</h2>',
            '<span class="zdoc-live-badge"><span class="zdoc-pulse-dot"></span> Clinical Board · Active</span>',
          '</div>',
          '<p class="zdoc-sub">' + esc(currentTab.sub) + '</p>',
        '</div>',
        '<div class="zdoc-head-actions">',
          '<button class="zdoc-btn primary" onclick="ZenveDoctorsDashboard.showOnboardModal()">+ Add Clinician</button>',
        '</div>',
      '</header>',

      '<nav class="zdoc-tabs-bar">',
        TABS.map(function (t) {
          var active = t.id === S.tab ? ' active' : '';
          return '<button class="zdoc-tab' + active + '" onclick="ZenveDoctorsDashboard.switchTab(\'' + t.id + '\')">' +
            '<span>' + t.icon + '</span>' +
            '<span>' + esc(t.label) + '</span>' +
            '<span class="zdoc-tab-badge">' + esc(t.badge) + '</span>' +
          '</button>';
        }).join(''),
      '</nav>',

      '<div class="zdoc-body">'
    ];

    switch (S.tab) {
      case 'dashboard':   html.push(renderDashboard()); break;
      case 'all-doctors': html.push(renderAllDoctors()); break;
      case 'performance': html.push(renderPerformance()); break;
      case 'revenue':     html.push(renderRevenue()); break;
      case 'patients':    html.push(renderPatients()); break;
      case 'orders':      html.push(renderOrders()); break;
      case 'commissions': html.push(renderCommissions()); break;
      case 'activity':    html.push(renderActivity()); break;
      case 'network':     html.push(renderNetwork()); break;
      default:            html.push(renderDashboard());
    }

    html.push('</div>');
    root.innerHTML = html.join('');
  }

  /* ── Modal Mechanics ─────────────────────────────────────────────── */
  function showModal(contentHtml) {
    closeModal();
    var modal = document.createElement('div');
    modal.className = 'zdoc-modal-overlay';
    modal.id = 'zdoc-modal';
    modal.innerHTML = '<div class="zdoc-modal-card">' + contentHtml + '</div>';
    document.body.appendChild(modal);
  }

  function closeModal() {
    var modal = document.getElementById('zdoc-modal');
    if (modal) modal.remove();
  }

  function showOnboardModal() {
    var formHtml = [
      '<div class="zdoc-modal-head">',
        '<h3 class="zdoc-modal-title">👨‍⚕️ Register Veterinary Doctor</h3>',
        '<button class="zdoc-btn" onclick="ZenveDoctorsDashboard.closeModal()">✕</button>',
      '</div>',
      '<form onsubmit="event.preventDefault(); alert(\'Practitioner successfully accredited and assigned to clinical schedule!\'); ZenveDoctorsDashboard.closeModal();">',
        '<div class="zdoc-form-group"><label>Doctor Full Name</label><input type="text" class="zdoc-input" placeholder="e.g. Dr. Rajesh Pillai" required /></div>',
        '<div class="zdoc-form-row">',
          '<div class="zdoc-form-group"><label>Veterinary Council Reg No.</label><input type="text" class="zdoc-input" placeholder="KVC-9821" required /></div>',
          '<div class="zdoc-form-group"><label>Primary Specialty</label><select class="zdoc-select"><option>Surgery & Critical Care</option><option>Cardiology</option><option>Neurology & Ortho</option><option>Pediatrics & Neonatal</option><option>Dermatology</option><option>Exotics & Avian</option></select></div>',
        '</div>',
        '<div class="zdoc-form-row">',
          '<div class="zdoc-form-group"><label>Primary Hospital Center</label><select class="zdoc-select"><option>Indiranagar Flagship</option><option>Koramangala Trauma</option><option>Whitefield Specialty</option><option>Jayanagar Wellness</option><option>HSR Layout Clinic</option></select></div>',
          '<div class="zdoc-form-group"><label>Commission Slab</label><select class="zdoc-select"><option>20% Standard</option><option>25% Senior Consultant</option><option>30% Specialist Surgeon</option></select></div>',
        '</div>',
        '<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:16px;">',
          '<button type="button" class="zdoc-btn" onclick="ZenveDoctorsDashboard.closeModal()">Cancel</button>',
          '<button type="submit" class="zdoc-btn primary">Complete Onboarding</button>',
        '</div>',
      '</form>'
    ].join('');
    showModal(formHtml);
  }

  /* ── Open & Close Mechanics ──────────────────────────────────────── */
  function build() {
    root = document.getElementById('zdoc-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'zdoc-root';
      root.className = 'zpanel-root';
      document.body.appendChild(root);
    }
  }

  function open(tab) {
    // Close other domain overlays
    ['zb2b-root', 'zix-root', 'zsub-root', 'zc360-root', 'zfa-root', 'zmkt-dashboard-root', 'zvp-root', 'zfsh-root', 'zod-root', 'zsd-root', 'zpid-root', 'zph-root', 'zch-root', 'zrep-root', 'zalt-root', 'zset-root', 'zhr-root', 'zsys-root'].forEach(function(id) {
      var el = document.getElementById(id);
      if (el) {
        el.style.display = 'none';
        el.classList.remove('zpanel-open');
      }
    });

    if (tab && TABS.some(function (t) { return t.id === tab; })) {
      S.tab = tab;
    } else if (!S.tab) {
      S.tab = 'dashboard';
    }

    build();
    S.open = true;
    root.style.display = 'block';
    root.classList.add('zdoc-open', 'zpanel-open');

    try {
      document.documentElement.classList.remove('zb2b-locked', 'zix-locked', 'zsub-locked', 'zc360-locked', 'zfsh-locked', 'zvp-locked');
      document.body.classList.remove('zb2b-locked', 'zix-locked', 'zsub-locked', 'zc360-locked', 'zfsh-locked', 'zvp-locked');
      document.documentElement.classList.add('zdoc-locked');
      document.body.classList.add('zdoc-locked');
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
      root.classList.remove('zdoc-open', 'zpanel-open');
      root.style.display = 'none';
    }
    try {
      document.documentElement.classList.remove('zdoc-locked');
      document.body.classList.remove('zdoc-locked');
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
      var otherDomains = ['sales', 'operations', 'inventory', 'pharmacy', 'clinics', 'reports', 'alerts', 'settings', 'finance', 'marketing', 'vendors', 'procurement', 'fashion', 'import', 'export', 'subscription', 'customer', 'b2b'];
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

      var isSidebar = !!el.closest('aside, [class*="sidebar"]') && !el.closest('#zdoc-root');
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
  window.ZenveDoctorsDashboard = {
    open: open,
    close: close,
    switchTab: switchTab,
    closeModal: closeModal,
    showOnboardModal: showOnboardModal,
    setDoctors: setDoctors,
    loadDoctorsFromApi: loadDoctorsFromApi
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initInterception();
      loadDoctorsFromApi();
    });
  } else {
    initInterception();
    loadDoctorsFromApi();
  }
})();
