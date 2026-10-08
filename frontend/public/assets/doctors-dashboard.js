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
    return [
      '<div class="zdoc-kpi-grid">',
        kpiHtml('Active Veterinary Doctors', '0', '0.0%', 'neutral', 'neutral', 'Across 0 clinic centers'),
        kpiHtml('Monthly Patient Consults', '0', '0.0%', 'neutral', 'neutral', 'No consults recorded'),
        kpiHtml('Doctor Attributed Revenue', '0', '0.0%', 'neutral', 'up', 'Consults, meds & surgery'),
        kpiHtml('Doctor Commissions Paid', '0', '0.0%', 'neutral', 'up', 'Settled bi-weekly'),
        kpiHtml('Avg. Patient Satisfaction', '0.0 / 5.0', '0 ratings', 'neutral', 'No ratings recorded', '⭐'),
        kpiHtml('Surgical Success Rate', '0', '0.0%', 'neutral', 'up', 'Zero cross-contamination'),
      '</div>',

      '<div class="zdoc-card">',
        '<div class="zdoc-card-head">',
          '<div>',
            '<h3 class="zdoc-card-title">👨‍⚕️ Active Medical Practitioner Roster</h3>',
            '<p class="zdoc-card-sub">Clinical accreditation, consultation volume, and real-time on-duty status</p>',
          '</div>',
          '<button class="zdoc-btn primary" onclick="ZenveDoctorsDashboard.showOnboardModal()">+ Add New Clinician</button>',
        '</div>',
        '<div class="zdoc-table-wrap">',
          '<table class="zdoc-table">',
            '<thead><tr><th>Doctor ID</th><th>Practitioner Name</th><th>Specialty</th><th>Center Clinic</th><th>MTD Patients</th><th>Attributed Revenue</th><th>Commissions</th><th>Rating</th><th>Status</th></tr></thead>',
            '<tbody>',
              DOCTORS.length ? DOCTORS.map(function(d) {
                return '<tr>' +
                  '<td style="font-family:monospace;font-weight:600;">' + esc(d.id) + '</td>' +
                  '<td style="font-weight:600;">' + esc(d.name) + '</td>' +
                  '<td>' + esc(d.spec) + '</td>' +
                  '<td style="color:#64748b;">' + esc(d.clinic) + '</td>' +
                  '<td style="font-weight:600;">' + d.patientsMtd + ' pets</td>' +
                  '<td style="font-weight:600;color:#059669;">' + esc(d.revMtd) + '</td>' +
                  '<td style="font-weight:600;">' + esc(d.comm) + '</td>' +
                  '<td style="color:#d97706;font-weight:600;">★ ' + esc(d.rating) + '</td>' +
                  '<td><span class="zdoc-pill ' + (d.status === 'On Duty' ? 'active' : d.status === 'In Surgery' ? 'warning' : 'critical') + '">' + esc(d.status) + '</span></td>' +
                '</tr>';
              }).join('') : '<tr><td colspan="9" style="text-align:center;padding:24px;color:#94a3b8;">No doctor records found</td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderAllDoctors() {
    return [
      '<div class="zdoc-kpi-grid">',
        kpiHtml('Total Board Clinicians', '0', '0.0%', 'neutral', 'up', 'All state board registered'),
        kpiHtml('Primary Specialties', '0', '0.0%', 'neutral', 'up', 'Full tertiary care coverage'),
        kpiHtml('Avg Clinical Experience', '0', '0.0%', 'neutral', 'up', 'Board certified clinicians'),
        kpiHtml('Clinic Shifts Scheduled', '0', '0.0%', 'neutral', 'up', 'Zero doctor absence backlog'),
      '</div>',
      '<div class="zdoc-card">',
        '<div class="zdoc-card-head"><h3 class="zdoc-card-title">📋 Practitioner Directory & Licensing Master</h3></div>',
        '<div class="zdoc-table-wrap">',
          '<table class="zdoc-table">',
            '<thead><tr><th>Doctor ID</th><th>Clinician Name</th><th>Specialty</th><th>Qualifications</th><th>Experience</th><th>Center Clinic</th><th>Schedule</th><th>Status</th></tr></thead>',
            '<tbody><tr><td colspan="8" style="text-align:center;padding:24px;color:#94a3b8;">No practitioner records found</td></tr></tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderPerformance() {
    return [
      '<div class="zdoc-kpi-grid">',
        kpiHtml('Overall Quota Attainment', '0', '0.0%', 'neutral', 'up', 'All practitioners above goal'),
        kpiHtml('Clinical Net Promoter Score', '0', '0.0%', 'neutral', 'neutral', 'No reviews recorded'),
        kpiHtml('Avg. Consultation Wait Time', '0', '0.0%', 'neutral', 'up', 'Strict appointment pacing'),
        kpiHtml('Overall Surgical Success', '0', '0.0%', 'neutral', 'up', 'NABH protocol compliant'),
      '</div>',
      '<div class="zdoc-card">',
        '<div class="zdoc-card-head"><h3 class="zdoc-card-title">⭐ Physician Performance Scorecard & Quality Index</h3></div>',
        '<div class="zdoc-table-wrap">',
          '<table class="zdoc-table">',
            '<thead><tr><th>Doctor Name</th><th>Specialty</th><th>Target</th><th>Actual</th><th>Attainment %</th><th>Patient NPS</th><th>Wait Time</th><th>Surgical Success</th><th>Clinical Grade</th></tr></thead>',
            '<tbody><tr><td colspan="9" style="text-align:center;padding:24px;color:#94a3b8;">No performance records found</td></tr></tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderRevenue() {
    return [
      '<div class="zdoc-kpi-grid">',
        kpiHtml('Doctor Billed Revenue', '0', '0.0%', 'neutral', 'up', 'Direct physician billing'),
        kpiHtml('Procedure Billings', '0', '0.0%', 'neutral', 'up', 'Surgeries & diagnostics'),
        kpiHtml('Consultation Fees', '0', '0.0%', 'neutral', 'up', 'Outpatient OPD fee'),
        kpiHtml('Pharmacy & Rx Uplift', '0', '0.0%', 'neutral', 'up', 'Prescriptions filled in-house'),
      '</div>',
      '<div class="zdoc-card">',
        '<div class="zdoc-card-head"><h3 class="zdoc-card-title">💰 Clinician Revenue Matrix & Departmental Contribution</h3></div>',
        '<div class="zdoc-table-wrap">',
          '<table class="zdoc-table">',
            '<thead><tr><th>Doctor Name</th><th>Department</th><th>Consult Fees</th><th>Procedures & Surgery</th><th>Rx Medicines</th><th>Total Attributed</th><th>Operating Margin</th><th>Revenue Share</th></tr></thead>',
            '<tbody><tr><td colspan="8" style="text-align:center;padding:24px;color:#94a3b8;">No revenue records found</td></tr></tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderPatients() {
    return [
      '<div class="zdoc-kpi-grid">',
        kpiHtml('Active Patient Caseload', '0', '0.0%', 'neutral', 'up', 'Under active care'),
        kpiHtml('Repeat Pet Consults', '0', '0.0%', 'neutral', 'up', 'Return visit rate'),
        kpiHtml('Chronic Care Monitored', '0', '0.0%', 'neutral', 'up', 'Regular maintenance'),
        kpiHtml('Follow-Up Adherence', '0', '0.0%', 'neutral', 'up', 'Automated reminder sync'),
      '</div>',
      '<div class="zdoc-card">',
        '<div class="zdoc-card-head"><h3 class="zdoc-card-title">🐾 Recent Patient Encounters & Care Plans</h3></div>',
        '<div class="zdoc-table-wrap">',
          '<table class="zdoc-table">',
            '<thead><tr><th>Pet Patient & Breed</th><th>Pet Parent</th><th>Attending Clinician</th><th>Diagnosis</th><th>Date</th><th>Status</th><th>Next Follow-Up</th><th>Center Clinic</th></tr></thead>',
            '<tbody><tr><td colspan="8" style="text-align:center;padding:24px;color:#94a3b8;">No patient encounter records found</td></tr></tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderOrders() {
    return [
      '<div class="zdoc-kpi-grid">',
        kpiHtml('Physician Orders Raised', '0', '0.0%', 'neutral', 'No requisitions raised', '📦'),
        kpiHtml('Order Fulfillment Rate', '0.0%', '0.0%', 'neutral', 'neutral', 'No orders recorded'),
        kpiHtml('Order Value Generated', '0', '0.0%', 'neutral', 'up', 'Pharmacy attach value'),
        kpiHtml('Formulary Adherence', '0', '0.0%', 'neutral', 'up', 'NABH quality standards'),
      '</div>',
      '<div class="zdoc-card">',
        '<div class="zdoc-card-head"><h3 class="zdoc-card-title">📦 Real-Time Prescribed Order Stream</h3></div>',
        '<div class="zdoc-table-wrap">',
          '<table class="zdoc-table">',
            '<thead><tr><th>Order ID</th><th>Attending Clinician</th><th>Pharmaceutical Items</th><th>Pet Patient</th><th>Value</th><th>Dispensary</th><th>Fulfillment</th></tr></thead>',
            '<tbody>',
              '<tr><td style="font-family:monospace;font-weight:600;">DOC-ORD-9021</td><td style="font-weight:600;">Dr. Divya Ramesh</td><td>Titanium Bone Plates (3.5mm)</td><td>Leo (Golden)</td><td style="font-weight:600;color:#059669;">₹42,000</td><td>Dispensed</td><td><span class="zdoc-pill active">Fulfilled</span></td></tr>',
              '<tr><td style="font-family:monospace;font-weight:600;">DOC-ORD-9022</td><td style="font-weight:600;">Dr. Arvind Swaminathan</td><td>Vetmedin (Pimobendan 5mg) x 4</td><td>Milo (Persian)</td><td style="font-weight:600;color:#059669;">₹14,500</td><td>Dispensed</td><td><span class="zdoc-pill active">Fulfilled</span></td></tr>',
              '<tr><td style="font-family:monospace;font-weight:600;">DOC-ORD-9023</td><td style="font-weight:600;">Dr. Meera Nambiar</td><td>Gabapentin + Neurocare Drops</td><td>Bruno (Rottweiler)</td><td style="font-weight:600;color:#059669;">₹8,200</td><td>Dispensed</td><td><span class="zdoc-pill active">Fulfilled</span></td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderCommissions() {
    return [
      '<div class="zdoc-kpi-grid">',
        kpiHtml('Total Commission Disbursed', '0', '0.0%', 'neutral', 'up', 'Bi-weekly direct transfer'),
        kpiHtml('Avg. Physician Earning', '₹0', '0.0%', 'neutral', 'No earnings recorded', '📈'),
        kpiHtml('TDS Deducted (Sec 194J)', '₹0', '0.0%', 'neutral', 'Form 16A filed auto', '🏛️'),
        kpiHtml('Payment Reconciliation', '0', '0.0%', 'neutral', 'up', 'Automated audit'),
      '</div>',
      '<div class="zdoc-card">',
        '<div class="zdoc-card-head"><h3 class="zdoc-card-title">💵 Professional Fee Settlements & Remittance Register</h3></div>',
        '<div class="zdoc-table-wrap">',
          '<table class="zdoc-table">',
            '<thead><tr><th>Settlement ID</th><th>Doctor Name</th><th>Specialty</th><th>Gross Billed</th><th>Slab</th><th>Gross Comm.</th><th>TDS</th><th>Net Remitted</th><th>Status</th></tr></thead>',
            '<tbody>',
              '<tr><td style="font-family:monospace;font-weight:600;">SET-9901</td><td style="font-weight:600;">Dr. Divya Ramesh</td><td>Lead Surgeon</td><td>₹6,40,000</td><td>20% + 5% Surg</td><td style="font-weight:600;">₹1,60,000</td><td style="color:#b91c1c;">-₹16,000</td><td style="font-weight:700;color:#059669;">₹1,44,000</td><td><span class="zdoc-pill active">Disbursed</span></td></tr>',
              '<tr><td style="font-family:monospace;font-weight:600;">SET-9902</td><td style="font-weight:600;">Dr. Arvind Swaminathan</td><td>Cardiology</td><td>₹4,85,000</td><td>20% Standard</td><td style="font-weight:600;">₹97,000</td><td style="color:#b91c1c;">-₹9,700</td><td style="font-weight:700;color:#059669;">₹87,300</td><td><span class="zdoc-pill active">Disbursed</span></td></tr>',
              '<tr><td style="font-family:monospace;font-weight:600;">SET-9903</td><td style="font-weight:600;">Dr. Meera Nambiar</td><td>Neurology</td><td>₹4,30,000</td><td>20% Standard</td><td style="font-weight:600;">₹86,000</td><td style="color:#b91c1c;">-₹8,600</td><td style="font-weight:700;color:#059669;">₹77,400</td><td><span class="zdoc-pill active">Disbursed</span></td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderActivity() {
    return [
      '<div class="zdoc-kpi-grid">',
        kpiHtml('Doctors Currently On Duty', '0', '--', 'neutral', 'No clinicians on duty', '👨‍⚕️'),
        kpiHtml('Surgeries in Progress', '0', '--', 'neutral', 'No active surgeries', '🩺'),
        kpiHtml('OPD Consults Today', '0', '--', 'neutral', 'No consults logged', '📋'),
        kpiHtml('Tele-Consult Queue', '0', '--', 'neutral', 'No queue active', '📱'),
      '</div>',
      '<div class="zdoc-card">',
        '<div class="zdoc-card-head"><h3 class="zdoc-card-title">⚡ Live Physician Activity & Case Audit Stream</h3></div>',
        '<div class="zdoc-table-wrap">',
          '<table class="zdoc-table">',
            '<thead><tr><th>Timestamp</th><th>Clinician</th><th>Clinical Action</th><th>Case Description</th><th>Facility</th><th>Status</th></tr></thead>',
            '<tbody>',
              '<tr><td style="font-family:monospace;font-weight:600;color:#059669;">18:04</td><td style="font-weight:600;">Dr. Divya Ramesh</td><td style="font-weight:600;">Completed Surgery</td><td>TPLO on German Shepherd</td><td>OT-1 Indiranagar</td><td><span class="zdoc-pill active">Success</span></td></tr>',
              '<tr><td style="font-family:monospace;font-weight:600;color:#059669;">17:52</td><td style="font-weight:600;">Dr. Arvind Swaminathan</td><td style="font-weight:600;">Echocardiogram</td><td>Doppler assessment on Persian Cat</td><td>Cardio Lab Koramangala</td><td><span class="zdoc-pill active">Logged</span></td></tr>',
              '<tr><td style="font-family:monospace;font-weight:600;color:#059669;">17:40</td><td style="font-weight:600;">Dr. Siddharth Varma</td><td style="font-weight:600;">Vaccination</td><td>7-in-1 Booster + Anti-Rabies</td><td>OPD-2 Jayanagar</td><td><span class="zdoc-pill active">Completed</span></td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderNetwork() {
    return [
      '<div class="zdoc-kpi-grid">',
        kpiHtml('Affiliated Hospital Hubs', '0', '--', 'neutral', 'No affiliated centers', '🏥'),
        kpiHtml('Total Medical Staff', '0', '--', 'neutral', 'No medical staff', '👨‍⚕️'),
        kpiHtml('Inter-Hospital Referrals', '0', '--', 'neutral', 'No referrals logged', '🔄'),
        kpiHtml('Network Bed Utilization', '0', '0.0%', 'neutral', 'up', 'Emergency surge ready'),
      '</div>',
      '<div class="zdoc-card">',
        '<div class="zdoc-card-head"><h3 class="zdoc-card-title">🌐 Hospital Center Deployment & Clinical Leadership</h3></div>',
        '<div class="zdoc-table-wrap">',
          '<table class="zdoc-table">',
            '<thead><tr><th>Hospital Center</th><th>Clinical Director</th><th>Team Size</th><th>Specialty Wings</th><th>MTD Patients</th><th>Center Billings</th><th>Status</th></tr></thead>',
            '<tbody>',
              '<tr><td style="font-weight:600;">Indiranagar Flagship Specialty Hospital</td><td style="color:#047857;font-weight:600;">Dr. Divya Ramesh</td><td style="font-weight:600;">8 Clinicians</td><td>Orthopedics, Soft Tissue, Exotics</td><td style="font-weight:600;">740 pets</td><td style="font-weight:700;color:#059669;">₹14.20 Lakh</td><td><span class="zdoc-pill active">Optimal</span></td></tr>',
              '<tr><td style="font-weight:600;">Koramangala Emergency & Critical Trauma</td><td style="color:#047857;font-weight:600;">Dr. Arvind Swaminathan</td><td style="font-weight:600;">5 Clinicians</td><td>Cardiology, Emergency Triage, 24/7 ICU</td><td style="font-weight:600;">490 pets</td><td style="font-weight:700;color:#059669;">₹9.40 Lakh</td><td><span class="zdoc-pill warning">High Load</span></td></tr>',
              '<tr><td style="font-weight:600;">Whitefield Comprehensive Veterinary Clinic</td><td style="color:#047857;font-weight:600;">Dr. Meera Nambiar</td><td style="font-weight:600;">4 Clinicians</td><td>Neurology, Physical Rehab</td><td style="font-weight:600;">380 pets</td><td style="font-weight:700;color:#059669;">₹6.80 Lakh</td><td><span class="zdoc-pill active">Optimal</span></td></tr>',
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
    showOnboardModal: showOnboardModal
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initInterception);
  } else {
    initInterception();
  }
})();
