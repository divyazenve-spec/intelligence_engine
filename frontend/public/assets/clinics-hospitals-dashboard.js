/* =====================================================================
   Zenve BI — Clinics & Hospitals Domain Control Center & Subdomain Suite
   All 10 Subdomains:
     1. Clinics Dashboard     (#clinics-dashboard)
     2. All Clinics           (#all-clinics)
     3. Hospitals             (#hospitals)
     4. Clinic Performance    (#clinic-performance)
     5. Clinic Revenue        (#clinic-revenue)
     6. Clinic Orders         (#clinic-orders)
     7. Clinic Patients       (#clinic-patients)
     8. Clinic Doctors        (#clinic-doctors)
     9. Clinic Commissions    (#clinic-commissions)
     10. Clinic Network       (#clinic-network)
   ===================================================================== */
(function () {
  'use strict';

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function inr(n) {
    n = Number(n) || 0;
    if (n >= 1e7) return '₹' + (n / 1e7).toFixed(2) + ' Cr';
    if (n >= 1e5) return '₹' + (n / 1e5).toFixed(2) + ' L';
    if (n >= 1000) return '₹' + (n / 1000).toFixed(1) + 'K';
    return '₹' + n.toLocaleString('en-IN');
  }

  /* ── 10 Tabs Definition with Explicit Titles & Subtitles ────────── */
  var TABS = [
    { id: 'dashboard',   label: 'Clinics Dashboard',   icon: '🏥', hash: '#clinics-dashboard',   badge: 'Command Center', title: 'Clinics Dashboard', sub: 'Veterinary Hospitals & Clinics Command Center — Healthcare delivery, inpatient census, and OT utilization' },
    { id: 'all-clinics', label: 'All Clinics',         icon: '🏨', hash: '#all-clinics',         badge: '0 Clinics', title: 'All Clinics', sub: 'Outpatient Care Directory — Daycare suites, lead veterinarians, diagnostics tier, and daily footfall' },
    { id: 'hospitals',   label: 'Hospitals',           icon: '🚨', hash: '#hospitals',           badge: '0 Tertiary', title: 'Hospitals', sub: '24x7 Tertiary Care Referral Centers — Modular OTs, ICU pods, isolation bays, blood bank, and imaging' },
    { id: 'performance', label: 'Clinic Performance',  icon: '📊', hash: '#clinic-performance',  badge: '0.0%', title: 'Clinic Performance', sub: 'Clinical Quality & Operational Benchmarking — OPD throughput, wait times, bed turnaround, and CSAT' },
    { id: 'revenue',     label: 'Clinic Revenue',      icon: '💎', hash: '#clinic-revenue',      badge: '₹0', title: 'Clinic Revenue', sub: 'Healthcare Financials & Department Billings — OT Surgeries, OPD, Diagnostics, and ICU' },
    { id: 'orders',      label: 'Clinic Orders',       icon: '📦', hash: '#clinic-orders',       badge: '0 Orders', title: 'Clinic Orders', sub: 'Clinical Supply Requisitions & Purchase Orders — Titanium implants, inhalation gases, and suture packs' },
    { id: 'patients',    label: 'Clinic Patients',     icon: '🐾', hash: '#clinic-patients',     badge: '0 Inpatients', title: 'Clinic Patients', sub: 'Inpatient Ward Census & Telemetry Roster — Admitted pets, ICU monitoring, surgical recovery, and vitals' },
    { id: 'doctors',     label: 'Clinic Doctors',      icon: '👨‍⚕️', hash: '#clinic-doctors',      badge: '0 Clinicians', title: 'Clinic Doctors', sub: 'Veterinary Clinicians, Surgeons, Specialists & Rosters — Registered clinicians, VCI licenses, and shifts' },
    { id: 'commissions', label: 'Clinic Commissions',  icon: '🤝', hash: '#clinic-commissions',  badge: '₹0', title: 'Clinic Commissions', sub: 'B2B Partner Clinic Referrals & Specialist Settlements — Statutory TDS, gross commission, and disbursement' },
    { id: 'network',     label: 'Clinic Network',      icon: '🌐', hash: '#clinic-network',      badge: '0 Fleet', title: 'Clinic Network', sub: 'Regional Hub-and-Spoke Infrastructure — Metro clusters, ALS veterinary ambulances, and expansion pipeline' }
  ];

  /* ── Datasets ─────────────────────────────────────────────────── */
  /* ── Datasets (Live from MySQL zenve_engine) ─────────────────── */
  var FACILITIES = [];

  function loadLiveFacilities(cb) {
    fetch('/api/v1/clinics')
      .then(function (res) { return res.json(); })
      .then(function (rows) {
        if (Array.isArray(rows) && rows.length > 0) {
          FACILITIES = rows.map(function (c) {
            return {
              id: c.clinic_code || ('FAC-' + c.id),
              dbId: c.id,
              name: c.name,
              type: c.type || 'Tertiary Care Center',
              city: c.city || 'Bengaluru',
              beds: (c.bed_count || 24) + ' Beds Available',
              ot: '88% OT Utilized',
              rev: '₹14.20 L',
              status: c.status || 'Operational',
              lead: 'Dr. Priya Sharma, MVSc Surgery'
            };
          });
        }
        if (root && S.open) render();
        if (cb) cb();
      })
      .catch(function (err) {
        console.error('[Zenve Clinics API Error]', err);
      });
  }
  loadLiveFacilities();

  /* ── Live Datasets from MySQL zenve_engine ───────────────────── */
  var LIVE_ADMISSIONS = [];
  var INPATIENTS = [];
  var DOCTORS = [];
  var CLINIC_ORDERS = [];
  var COMMISSIONS = [];
  var AMBULANCE_FLEET = [];

  /* ── State ─────────────────────────────────────────────────────── */
  var S = {
    open: false,
    tab: 'dashboard',
    docSearch: '',
    docSpecialty: 'ALL',
    docDuty: 'ALL'
  };

  var root = null;

  /* ── Tab resolution from Hash and Sidebar Text ──────────────────── */
  function tabFromHash(hash) {
    if (!hash) return null;
    var h = (hash.startsWith('#') ? hash.slice(1) : hash).toLowerCase();
    if (h.indexOf('pharmacy') >= 0 || h.indexOf('medicines') >= 0 || h.indexOf('prescriptions') >= 0) return null;
    if (h === 'clinics-dashboard' || h === 'clinics') return 'dashboard';
    if (h === 'all-clinics') return 'all-clinics';
    if (h === 'hospitals') return 'hospitals';
    if (h === 'clinic-performance') return 'performance';
    if (h === 'clinic-revenue') return 'revenue';
    if (h === 'clinic-orders') return 'orders';
    if (h === 'clinic-patients') return 'patients';
    if (h === 'clinic-doctors') return 'doctors';
    if (h === 'clinic-commissions') return 'commissions';
    if (h === 'clinic-network') return 'network';
    return null;
  }

  function tabFromText(txt) {
    if (!txt) return null;
    var raw = txt.replace(/\s+/g, ' ').trim().toLowerCase();
    // Exclude other domains
    if (raw.indexOf('pharmacy') !== -1 || raw.indexOf('medicines') !== -1 || raw.indexOf('prescriptions') !== -1 || raw.indexOf('batch') !== -1 || raw.indexOf('expiry') !== -1 || raw.indexOf('report') !== -1 || raw.indexOf('alert') !== -1) {
      return null;
    }
    if (raw.indexOf('revenue by') !== -1 || raw.indexOf('sales by') !== -1 || raw === 'doctors dashboard' || raw === 'all doctors' || raw === 'doctor performance' || raw === 'doctor revenue' || raw === 'doctor patients' || raw === 'doctor orders' || raw === 'doctor commissions') {
      return null;
    }
    // Never match the parent category / domain accordion header ("Clinics & Hospitals", etc.)
    if (raw.indexOf('clinics & hospitals') !== -1 || raw.indexOf('clinics & hospit') !== -1 || raw.indexOf('clinics and hospitals') !== -1 || raw.startsWith('clinics &') || raw.startsWith('clinics and')) {
      return null;
    }
    if (raw === 'clinics dashboard' || raw.indexOf('clinics dashboard') >= 0 || raw === 'hospital command center') return 'dashboard';
    if (raw === 'all clinics' || raw.indexOf('all clinics') >= 0 || raw === 'outpatient clinics') return 'all-clinics';
    if (raw === 'hospitals' || raw === 'tertiary hospitals' || raw === '24x7 hospitals' || (raw.indexOf('hospitals') >= 0 && raw.indexOf('clinic') === -1 && raw.indexOf('&') === -1)) return 'hospitals';
    if (raw === 'clinic performance' || raw.indexOf('clinic performance') >= 0) return 'performance';
    if (raw === 'clinic revenue' || raw.indexOf('clinic revenue') >= 0 || raw === 'hospital revenue') return 'revenue';
    if (raw === 'clinic orders' || raw.indexOf('clinic orders') >= 0 || raw === 'clinical orders') return 'orders';
    if (raw === 'clinic patients' || raw.indexOf('clinic patients') >= 0 || raw === 'inpatients' || raw === 'ward patients') return 'patients';
    if (raw === 'clinic doctors' || raw.indexOf('clinic doctors') >= 0 || raw === 'clinicians' || raw === 'hospital doctors') return 'doctors';
    if (raw === 'clinic commissions' || raw.indexOf('clinic commissions') >= 0) return 'commissions';
    if (raw === 'clinic network' || raw.indexOf('clinic network') >= 0 || raw === 'facilities network') return 'network';
    return null;
  }

  /* ── Helper Renderers ─────────────────────────────────────────── */
  function kpiHtml(label, val, delta, trend, subtext, icon) {
    return [
      '<div class="zch-kpi">',
        '<div class="zch-kpi-top">',
          '<span class="zch-kpi-label">' + esc(label) + '</span>',
          '<span class="zch-kpi-icon">' + esc(icon || '🏥') + '</span>',
        '</div>',
        '<div class="zch-kpi-val">' + esc(val) + '</div>',
        '<div class="zch-kpi-bottom">',
          '<span class="zch-delta ' + (trend === 'up' ? 'up' : trend === 'down' ? 'down' : 'warn') + '">' + (trend === 'up' ? '↑ ' : trend === 'down' ? '↓ ' : '• ') + esc(delta) + '</span>',
          '<span class="zch-subtext">' + esc(subtext) + '</span>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 1: Clinics Dashboard ─────────────────────────────────── */
  function renderDashboard() {
    var admissionRows = LIVE_ADMISSIONS.length > 0 ? LIVE_ADMISSIONS.map(function (a) {
      return '<tr>' +
        '<td><b>' + esc(a.pet) + '</b><br><span style="font-family:IBM Plex Mono,monospace;font-size:10px;color:#38bdf8;">' + esc(a.id) + '</span></td>' +
        '<td style="color:#f8fafc;">' + esc(a.reason) + '</td>' +
        '<td style="color:#94a3b8;">' + esc(a.facility) + '</td>' +
        '<td><span style="color:#cbd5e1;font-weight:600;">' + esc(a.doctor) + '</span><br><span style="font-size:10px;color:#64748b;">' + esc(a.bed) + '</span></td>' +
        '<td><span class="zch-badge ' + (a.status === 'In Surgery' ? 'red' : a.status === 'Admitted' ? 'blue' : 'green') + '">' + esc(a.status) + '</span></td>' +
      '</tr>';
    }).join('') : '<tr><td colspan="5" style="text-align:center;padding:32px;color:#94a3b8;font-size:13px;">No emergency admissions in queue. Triage desks standing by.</td></tr>';

    var facilityRows = FACILITIES.length > 0 ? FACILITIES.slice(0, 5).map(function (f) {
      return '<tr>' +
        '<td><b>' + esc(f.name) + '</b><br><span style="font-size:11px;color:#94a3b8;">' + esc(f.type) + '</span></td>' +
        '<td><span class="zch-badge blue">' + esc(f.city) + '</span></td>' +
        '<td style="font-family:IBM Plex Mono,monospace;font-weight:600;">' + esc(f.beds) + '</td>' +
        '<td><span style="color:#38bdf8;font-weight:600;">' + esc(f.ot) + '</span></td>' +
        '<td><span class="zch-badge green">' + esc(f.status) + '</span></td>' +
      '</tr>';
    }).join('') : '<tr><td colspan="5" style="text-align:center;padding:32px;color:#94a3b8;font-size:13px;">No facilities registered yet. Click "Register New Clinic" below.</td></tr>';

    return [
      '<div class="zch-kpi-grid">',
        kpiHtml('Network Inpatients', INPATIENTS.length + ' Beds', '0.0% Occupancy', 'warn', 'Across registered facilities', '🛏️'),
        kpiHtml('Active Surgical Theatres', '0 OTs', '0% Utilization', 'warn', 'Operating theaters ready', '🩺'),
        kpiHtml('Clinical Quality Index', '100%', 'Optimal protocol', 'up', 'Zero Surgical Site Infections', '🛡️'),
        kpiHtml('Emergency Admissions', LIVE_ADMISSIONS.length + ' Today', '0 Critical cases', 'up', 'Triage protocol online', '🚨'),
        kpiHtml('Network Monthly Revenue', '₹0', '0.0% vs prev', 'warn', 'Awaiting clinical billings', '💎'),
        kpiHtml('Emergency Ambulances', AMBULANCE_FLEET.length + ' Units', '0 Dispatched', 'up', 'GPS Fleet Standby', '🚑'),
      '</div>',

      '<div class="zch-grid-2">',
        '<div class="zch-card">',
          '<div class="zch-card-head">',
            '<div><h3 class="zch-card-title">🚨 Real-Time Emergency Triage & Inpatient Admissions</h3><p class="zch-card-sub">Live feed from trauma desks and surgical intake</p></div>',
            '<span class="zch-badge green">LIVE STREAM</span>',
          '</div>',
          '<div class="zch-table-wrap">',
            '<table class="zch-table">',
              '<thead><tr><th>Case & Pet</th><th>Clinical Indication</th><th>Facility</th><th>Attending Surgeon</th><th>Status</th></tr></thead>',
              '<tbody>' + admissionRows + '</tbody>',
            '</table>',
          '</div>',
        '</div>',

        '<div class="zch-card">',
          '<div class="zch-card-head">',
            '<div><h3 class="zch-card-title">🏥 Facility Census & Inpatient Bed Capacity</h3><p class="zch-card-sub">Real-time status of high-dependency and surgical units</p></div>',
            '<button class="zch-btn primary" onclick="ZenveClinicsDashboard.switchTab(\'hospitals\')">View All Hospitals →</button>',
          '</div>',
          '<div class="zch-table-wrap">',
            '<table class="zch-table">',
              '<thead><tr><th>Facility</th><th>City</th><th>Occupancy</th><th>OT Load</th><th>Status</th></tr></thead>',
              '<tbody>' + facilityRows + '</tbody>',
            '</table>',
          '</div>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 2: All Clinics ───────────────────────────────────────── */
  function renderAllClinics() {
    var outpatientList = FACILITIES.filter(function (f) { return !f.type.includes('Tertiary'); });
    var rows = outpatientList.length > 0 ? outpatientList.map(function (f) {
      return '<tr>' +
        '<td><b>' + esc(f.name) + '</b><br><span style="font-family:IBM Plex Mono,monospace;font-size:10px;color:#38bdf8;">' + esc(f.id) + '</span></td>' +
        '<td><span class="zch-badge blue">' + esc(f.city) + '</span></td>' +
        '<td><div style="font-weight:600;color:#f8fafc;">' + esc(f.type) + '</div><div style="font-size:10px;color:#94a3b8;">Preventive & Daycare</div></td>' +
        '<td><div style="font-weight:600;color:#cbd5e1;">' + esc(f.lead) + '</div></td>' +
        '<td style="font-family:IBM Plex Mono,monospace;font-weight:600;">' + esc(f.beds) + '</td>' +
        '<td><span style="color:#38bdf8;">' + esc(f.ot) + '</span></td>' +
        '<td><span class="zch-badge green">' + esc(f.status) + '</span></td>' +
        '<td><button class="zch-btn" onclick="alert(\'Viewing telemetry for ' + esc(f.name) + '\')">Details</button></td>' +
      '</tr>';
    }).join('') : '<tr><td colspan="8" style="text-align:center;padding:36px;color:#94a3b8;font-size:13px;">No outpatient clinics registered yet. Click "+ Register New Clinic" to add one.</td></tr>';

    return [
      '<div class="zch-kpi-grid">',
        kpiHtml('Outpatient Facilities', outpatientList.length + ' Clinics', 'Primary Care', 'up', 'Neighbourhood pet wellness', '🏨'),
        kpiHtml('Daily OPD Footfall', '0 Visits', '0% vs last mo', 'warn', 'Consultations & Vaccinations', '👥'),
        kpiHtml('Average Consultation Time', '-- mins', 'Awaiting consultations', 'up', 'Target: 15–20 mins', '⏱️'),
        kpiHtml('Outpatient Revenue', '₹0', '0.0% share', 'warn', 'Pharmacy + Diagnostic add-on', '💰'),
      '</div>',

      '<div class="zch-card">',
        '<div class="zch-card-head">',
          '<div><h3 class="zch-card-title">Outpatient Clinics Directory & Care Centers</h3><p class="zch-card-sub">Daycare suites, lead veterinarians, diagnostic equipment, and patient volume</p></div>',
          '<div style="display:flex;gap:8px;">',
            '<button class="zch-btn primary" onclick="ZenveClinicsDashboard.showNewClinicModal()">+ Register New Clinic</button>',
          '</div>',
        '</div>',

        '<div class="zch-table-wrap">',
          '<table class="zch-table">',
            '<thead><tr><th>Clinic Name & Code</th><th>City Cluster</th><th>Tier & Focus</th><th>Lead Veterinarian</th><th>Inpatient/Daycare</th><th>OT Capability</th><th>Status</th><th>Actions</th></tr></thead>',
            '<tbody>' + rows + '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 3: Hospitals ─────────────────────────────────────────── */
  function renderHospitals() {
    var tertiaryList = FACILITIES.filter(function (f) { return f.type.includes('Tertiary'); });
    var hospitalCards = tertiaryList.length > 0 ? tertiaryList.map(function (h) {
      return '<div style="background:#090e17;border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:16px;">' +
        '<div style="display:flex;justify-content:space-between;align-items:flex-start;">' +
          '<div>' +
            '<span style="font-size:10px;color:#38bdf8;font-weight:700;text-transform:uppercase;">' + esc(h.city) + ' REGIONAL HUB</span>' +
            '<h4 style="margin:2px 0 4px;font-size:15px;color:#fff;">' + esc(h.name) + '</h4>' +
            '<div style="font-size:12px;color:#94a3b8;">Medical Director: <strong style="color:#cbd5e1;">' + esc(h.lead) + '</strong></div>' +
          '</div>' +
          '<span class="zch-badge green">24x7 Active</span>' +
        '</div>' +
        '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-top:12px;padding-top:12px;border-top:1px solid rgba(255,255,255,0.06);font-size:11px;">' +
          '<div><span style="color:#64748b;">Bed Census:</span><div style="font-weight:700;color:#fff;font-family:IBM Plex Mono,monospace;">' + esc(h.beds) + '</div></div>' +
          '<div><span style="color:#64748b;">Surgical OT:</span><div style="font-weight:700;color:#38bdf8;font-family:IBM Plex Mono,monospace;">' + esc(h.ot) + '</div></div>' +
          '<div><span style="color:#64748b;">Daily Revenue:</span><div style="font-weight:700;color:#10b981;font-family:IBM Plex Mono,monospace;">' + esc(h.rev) + '</div></div>' +
        '</div>' +
      '</div>';
    }).join('') : '<div style="text-align:center;padding:36px;color:#94a3b8;font-size:13px;">No tertiary referral flagship hospitals registered yet.</div>';

    return [
      '<div class="zch-kpi-grid">',
        kpiHtml('Tertiary Referral Hospitals', tertiaryList.length + ' Flagships', '24x7 Multi-Specialty', 'up', 'Regional referral hubs', '🚨'),
        kpiHtml('Total Licensed Beds', '0 Beds', '0 Dedicated ICU Pods', 'warn', 'Oxygenated & Isolations', '🛏️'),
        kpiHtml('Modular Operating Theatres', '0 Theatres', 'C-Arm & Laparoscopy', 'warn', 'HEPA Class 10,000 ready', '🩺'),
        kpiHtml('Emergency Blood Bank', '0 Units Ready', 'Dog & Cat Blood Bank', 'warn', 'Stored at 4°C with crossmatch', '🩸'),
      '</div>',

      '<div class="zch-grid-2">',
        '<div class="zch-card">',
          '<div class="zch-card-head">',
            '<div><h3 class="zch-card-title">24x7 Tertiary Flagship Hospitals</h3><p class="zch-card-sub">Advanced diagnostic imaging (CT/MRI), blood banking, and multi-specialty surgery</p></div>',
          '</div>',
          '<div style="display:flex;flex-direction:column;gap:12px;">' + hospitalCards + '</div>',
        '</div>',

        '<div class="zch-card">',
          '<div class="zch-card-head">',
            '<div><h3 class="zch-card-title">Live Surgical Theatre Schedule</h3><p class="zch-card-sub">Active and upcoming operations across tertiary facilities</p></div>',
            '<span class="zch-badge blue">OT ROSTER</span>',
          '</div>',
          '<div class="zch-table-wrap">',
            '<table class="zch-table">',
              '<thead><tr><th>Patient & Surgery</th><th>OT Suite</th><th>Surgeon</th><th>Anesthetist</th><th>Schedule</th></tr></thead>',
              '<tbody>',
                '<tr><td colspan="5" style="text-align:center;padding:36px;color:#94a3b8;font-size:13px;">No surgical procedures currently scheduled or in progress.</td></tr>',
              '</tbody>',
            '</table>',
          '</div>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 4: Clinic Performance ────────────────────────────────── */
  function renderPerformance() {
    var perfRows = FACILITIES.length > 0 ? FACILITIES.map(function (f) {
      return '<tr>' +
        '<td><b>' + esc(f.name) + '</b></td>' +
        '<td><span class="zch-badge blue">' + esc(f.city) + '</span></td>' +
        '<td style="font-family:IBM Plex Mono,monospace;font-weight:600;">0</td>' +
        '<td style="font-family:IBM Plex Mono,monospace;">0</td>' +
        '<td style="font-family:IBM Plex Mono,monospace;">--</td>' +
        '<td><span style="color:#10b981;font-weight:600;">0.0%</span></td>' +
        '<td style="color:#fbbf24;font-weight:700;">-- ★</td>' +
        '<td><span class="zch-badge green">Compliant</span></td>' +
      '</tr>';
    }).join('') : '<tr><td colspan="8" style="text-align:center;padding:36px;color:#94a3b8;font-size:13px;">No facility benchmarking metrics available.</td></tr>';

    return [
      '<div class="zch-kpi-grid">',
        kpiHtml('Surgical Success Rate', '0.0%', '0% YoY', 'warn', 'Benchmark target: >98.5%', '🩺'),
        kpiHtml('Client CSAT Score', '-- / 5.0', '0 Reviews', 'warn', 'Post-discharge satisfaction', '⭐'),
        kpiHtml('Average Wait Time', '-- mins', '0.0 mins', 'warn', 'Target: Under 10 minutes', '⏱️'),
        kpiHtml('Clinical Audit Compliance', '100%', 'Accredited', 'up', 'Sterilization protocol standard', '📋'),
      '</div>',

      '<div class="zch-card">',
        '<div class="zch-card-head">',
          '<div><h3 class="zch-card-title">Network Facilities Performance Benchmarking</h3><p class="zch-card-sub">OPD throughput, surgical volume, bed turnaround, and patient experience ratings</p></div>',
          '<button class="zch-btn" onclick="alert(\'No audit data to export currently.\')">Download Quality Audit PDF</button>',
        '</div>',
        '<div class="zch-table-wrap">',
          '<table class="zch-table">',
            '<thead><tr><th>Facility</th><th>City</th><th>Monthly Surgeries</th><th>OPD Visits</th><th>Bed Turnaround</th><th>Infection Rate</th><th>Client CSAT</th><th>Performance Index</th></tr></thead>',
            '<tbody>' + perfRows + '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 5: Clinic Revenue ────────────────────────────────────── */
  function renderRevenue() {
    var revRows = FACILITIES.length > 0 ? FACILITIES.map(function (f) {
      return '<tr>' +
        '<td><b>' + esc(f.name) + '</b></td>' +
        '<td><span class="zch-badge blue">' + esc(f.city) + '</span></td>' +
        '<td style="font-family:IBM Plex Mono,monospace;font-weight:700;color:#10b981;">₹0</td>' +
        '<td><span style="color:#64748b;font-weight:600;">0.0%</span></td>' +
      '</tr>';
    }).join('') : '<tr><td colspan="4" style="text-align:center;padding:36px;color:#94a3b8;font-size:13px;">No clinical billing records recorded.</td></tr>';

    return [
      '<div class="zch-kpi-grid">',
        kpiHtml('Total Network Revenue', '₹0', '0.0% YoY', 'warn', 'Current Month Net Billings', '💰'),
        kpiHtml('Surgeries & Procedures', '₹0', '0.0% Share', 'warn', 'High-margin surgical theatre', '🩺'),
        kpiHtml('Outpatient Consultations', '₹0', '0.0% Share', 'warn', 'Primary preventive footfall', '👥'),
        kpiHtml('Diagnostic Imaging & Lab', '₹0', '0.0% Share', 'warn', 'CT, USG, Digital X-Ray, Blood', '🔬'),
        kpiHtml('Inpatient ICU & Wards', '₹0', '0.0% Share', 'warn', 'Critical care bed days', '🛏️'),
        kpiHtml('Avg Ticket Size / Pet', '₹0', '0.0% YoY', 'warn', 'Integrated medical pathway', '📈'),
      '</div>',

      '<div class="zch-grid-2">',
        '<div class="zch-card">',
          '<div class="zch-card-head">',
            '<div><h3 class="zch-card-title">Departmental Revenue Contribution</h3><p class="zch-card-sub">Clinical billing distribution across major practice streams</p></div>',
          '</div>',
          '<div style="display:flex;flex-direction:column;gap:14px;padding:8px 0;">',
            '<div>' +
              '<div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:6px;"><span>Surgical & Anesthetic Procedures</span><strong style="color:#38bdf8;">₹0 (0.0%)</strong></div>' +
              '<div class="zch-progress-bar"><div class="zch-progress-fill" style="width:0%;background:#38bdf8;"></div></div>' +
            '</div>' +
            '<div>' +
              '<div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:6px;"><span>Outpatient Consultations & Vaccinations</span><strong style="color:#34d399;">₹0 (0.0%)</strong></div>' +
              '<div class="zch-progress-bar"><div class="zch-progress-fill" style="width:0%;background:#34d399;"></div></div>' +
            '</div>' +
            '<div>' +
              '<div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:6px;"><span>Diagnostics, Ultrasound & CT Imaging</span><strong style="color:#c084fc;">₹0 (0.0%)</strong></div>' +
              '<div class="zch-progress-bar"><div class="zch-progress-fill" style="width:0%;background:#c084fc;"></div></div>' +
            '</div>' +
            '<div>' +
              '<div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:6px;"><span>Inpatient Critical Care & ICU Stays</span><strong style="color:#fbbf24;">₹0 (0.0%)</strong></div>' +
              '<div class="zch-progress-bar"><div class="zch-progress-fill" style="width:0%;background:#fbbf24;"></div></div>' +
            '</div>' +
          '</div>',
        '</div>',

        '<div class="zch-card">',
          '<div class="zch-card-head">',
            '<div><h3 class="zch-card-title">Facility Monthly Billing League</h3><p class="zch-card-sub">Revenue centers across India clusters</p></div>',
          '</div>',
          '<div class="zch-table-wrap">',
            '<table class="zch-table">',
              '<thead><tr><th>Facility</th><th>City</th><th>Monthly Billings</th><th>Growth YoY</th></tr></thead>',
              '<tbody>' + revRows + '</tbody>',
            '</table>',
          '</div>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 6: Clinic Orders ─────────────────────────────────────── */
  function renderOrders() {
    var orderRows = CLINIC_ORDERS.length > 0 ? CLINIC_ORDERS.map(function (o) {
      return '<tr>' +
        '<td style="font-family:IBM Plex Mono,monospace;font-weight:600;color:#38bdf8;">' + esc(o.po) + '</td>' +
        '<td><b>' + esc(o.facility) + '</b></td>' +
        '<td>' + esc(o.item) + '</td>' +
        '<td style="color:#94a3b8;">' + esc(o.vendor) + '</td>' +
        '<td style="font-family:IBM Plex Mono,monospace;">' + esc(o.qty) + '</td>' +
        '<td style="font-family:IBM Plex Mono,monospace;font-weight:600;color:#f8fafc;">' + esc(o.cost) + '</td>' +
        '<td><span class="zch-badge ' + (o.priority === 'Critical' ? 'red' : o.priority === 'High' ? 'amber' : 'blue') + '">' + esc(o.priority) + '</span></td>' +
        '<td><span class="zch-badge ' + (o.status.includes('Approved') ? 'green' : o.status.includes('Delivered') ? 'blue' : 'amber') + '">' + esc(o.status) + '</span></td>' +
        '<td><button class="zch-btn" onclick="alert(\'Viewing invoice and tracking for ' + esc(o.po) + '\')">Inspect</button></td>' +
      '</tr>';
    }).join('') : '<tr><td colspan="9" style="text-align:center;padding:36px;color:#94a3b8;font-size:13px;">No clinical supply purchase orders or requisitions recorded. Click "+ Create Requisition PO" above.</td></tr>';

    return [
      '<div class="zch-kpi-grid">',
        kpiHtml('Clinical PO Volume', '₹0', '0 Requisitions', 'warn', 'Surgeries, implants, consumables', '📦'),
        kpiHtml('Critical Implants & Ortho', '0 Kits', 'Titanium TPLO / Plates', 'warn', 'Sterilized Stocked', '🔩'),
        kpiHtml('Medical Gases (O2 & N2O)', '0 Cylinders', 'Hospital Reserves', 'warn', 'Dual manifold backup', '💨'),
        kpiHtml('Pending Approvals', '0 POs', 'No approvals pending', 'up', 'Clear queue', '⏳'),
      '</div>',

      '<div class="zch-card">',
        '<div class="zch-card-head">',
          '<div><h3 class="zch-card-title">Clinical Supply Requisitions & Purchase Orders</h3><p class="zch-card-sub">Surgical implants, anesthesia supplies, diagnostic reagents, and surgical packs</p></div>',
          '<button class="zch-btn primary" onclick="ZenveClinicsDashboard.showNewOrderModal()">+ Create Requisition PO</button>',
        '</div>',
        '<div class="zch-table-wrap">',
          '<table class="zch-table">',
            '<thead><tr><th>PO Number</th><th>Target Facility</th><th>Clinical Item Description</th><th>Vendor / Supplier</th><th>Qty</th><th>Value</th><th>Priority</th><th>Status</th><th>Actions</th></tr></thead>',
            '<tbody>' + orderRows + '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 7: Clinic Patients ───────────────────────────────────── */
  function renderPatients() {
    var patientRows = INPATIENTS.length > 0 ? INPATIENTS.map(function (p) {
      return '<tr>' +
        '<td><b>' + esc(p.pet) + '</b><br><span style="font-family:IBM Plex Mono,monospace;font-size:10px;color:#38bdf8;">' + esc(p.id) + '</span></td>' +
        '<td style="color:#cbd5e1;">' + esc(p.owner) + '</td>' +
        '<td style="font-family:IBM Plex Mono,monospace;">' + esc(p.admitDate) + '</td>' +
        '<td><b>' + esc(p.facility) + '</b><br><span style="color:#38bdf8;font-size:11px;">' + esc(p.bed) + '</span></td>' +
        '<td style="color:#f8fafc;">' + esc(p.dx) + '</td>' +
        '<td style="color:#cbd5e1;font-weight:600;">' + esc(p.doc) + '</td>' +
        '<td><span style="font-family:IBM Plex Mono,monospace;font-size:11px;color:#34d399;">' + esc(p.vitals) + '</span></td>' +
        '<td><span class="zch-badge ' + (p.status.includes('Critical') ? 'red' : p.status.includes('High') ? 'amber' : 'green') + '">' + esc(p.status) + '</span></td>' +
        '<td><button class="zch-btn" onclick="alert(\'Discharge protocol initiated for ' + esc(p.pet) + '\')">Discharge</button></td>' +
      '</tr>';
    }).join('') : '<tr><td colspan="9" style="text-align:center;padding:36px;color:#94a3b8;font-size:13px;">No admitted inpatients recorded in ward telemetry.</td></tr>';

    return [
      '<div class="zch-kpi-grid">',
        kpiHtml('Active Inpatients', INPATIENTS.length + ' Patients', 'Across registered facilities', 'warn', 'Canine & Feline wards', '🐾'),
        kpiHtml('Critical Care ICU', '0 Pets', 'Continuous ECG telemetry', 'up', 'ICU beds available', '❤️'),
        kpiHtml('Average Length of Stay', '-- Days', 'Optimal turnaround', 'up', 'Mobility protocol', '📅'),
        kpiHtml('Discharges Planned Today', '0 Pets', 'Homecare clearance ready', 'up', 'Post-op discharge', '🏠'),
      '</div>',

      '<div class="zch-card">',
        '<div class="zch-card-head">',
          '<div><h3 class="zch-card-title">Inpatient Ward Census & Telemetry Roster</h3><p class="zch-card-sub">Admitted pets, diagnosis, attending clinical lead, and real-time vital status</p></div>',
          '<button class="zch-btn primary" onclick="alert(\'Opening Inpatient Admission Form...\')">+ Admit Inpatient</button>',
        '</div>',
        '<div class="zch-table-wrap">',
          '<table class="zch-table">',
            '<thead><tr><th>Patient & Code</th><th>Pet Parent</th><th>Admission Date</th><th>Facility & Bed</th><th>Clinical Diagnosis</th><th>Attending Doctor</th><th>Current Vitals</th><th>Care Status</th><th>Discharge</th></tr></thead>',
            '<tbody>' + patientRows + '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 8: Clinic Doctors (Comprehensive & Dedicated) ────────── */
  function renderDoctors() {
    var search = (S.docSearch || '').toLowerCase().trim();
    var specialty = S.docSpecialty || 'ALL';
    var duty = S.docDuty || 'ALL';

    var filtered = DOCTORS.filter(function (d) {
      if (specialty !== 'ALL' && d.spec.toLowerCase().indexOf(specialty.toLowerCase()) === -1) return false;
      if (duty !== 'ALL' && d.status !== duty) return false;
      if (search) {
        var str = (d.name + ' ' + d.qual + ' ' + d.spec + ' ' + d.base + ' ' + d.vci).toLowerCase();
        if (str.indexOf(search) === -1) return false;
      }
      return true;
    });

    return [
      '<div class="zch-kpi-grid">',
        kpiHtml('Registered Veterinary Doctors', DOCTORS.length + ' Clinicians', '100% VCI Verified', 'neutral', 'Resident & Specialist Staff', '👨‍⚕️'),
        kpiHtml('Specialist Surgeons', '0 Surgeons', 'Ortho, Neuro & Soft Tissue', 'neutral', 'Board-Certified M.V.Sc', '🔪'),
        kpiHtml('Clinicians On-Duty Now', '0 Active', 'Shift Rosters', 'neutral', 'All Centers Staffed', '⚡'),
        kpiHtml('In Surgery Right Now', '0 Surgeons', 'Modular OTs Active', 'neutral', 'Zero SSI Infection Rate', '🩺'),
        kpiHtml('Doctor Patient CSAT', '-- / 5.0', '0 Verified Reviews', 'neutral', 'Clinical Empathy Rating', '⭐'),
        kpiHtml('Monthly Consultations', '0 Visits', 'No visits logged', 'neutral', 'Consultation Throughput', '🐾'),
      '</div>',

      '<div class="zch-card">',
        '<div class="zch-card-head">',
          '<div>',
            '<h3 class="zch-card-title">Veterinary Medical Staff & Surgical Specialist Registry</h3>',
            '<p class="zch-card-sub">State Veterinary Council (VCI) registrations, hospital assignments, shift rosters, and surgical performance</p>',
          '</div>',
          '<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">',
            '<button class="zch-btn" onclick="alert(\'Exporting weekly doctor duty roster...\')">📅 Export Shift Schedule</button>',
            '<button class="zch-btn primary" onclick="ZenveClinicsDashboard.showAddDoctorModal()">+ Register New Doctor</button>',
          '</div>',
        '</div>',

        '<div class="zch-filters">',
          '<input type="text" class="zch-input" style="min-width:240px;" placeholder="Search doctor, hospital, license, specialty..." value="' + esc(S.docSearch) + '" oninput="ZenveClinicsDashboard.filterDoctors(this.value, null, null)" />',
          '<select class="zch-select" onchange="ZenveClinicsDashboard.filterDoctors(null, this.value, null)">',
            '<option value="ALL"' + (specialty === 'ALL' ? ' selected' : '') + '>All Clinical Specialties</option>',
            '<option value="Orthopedic"' + (specialty === 'Orthopedic' ? ' selected' : '') + '>Orthopedics & TPLO</option>',
            '<option value="Neuro"' + (specialty === 'Neuro' ? ' selected' : '') + '>Neurosurgery</option>',
            '<option value="Oncology"' + (specialty === 'Oncology' ? ' selected' : '') + '>Veterinary Oncology</option>',
            '<option value="Internal"' + (specialty === 'Internal' ? ' selected' : '') + '>Internal Medicine</option>',
            '<option value="Feline"' + (specialty === 'Feline' ? ' selected' : '') + '>Feline Medicine</option>',
            '<option value="Emergency"' + (specialty === 'Emergency' ? ' selected' : '') + '>Critical Care & Emergency</option>',
            '<option value="Ophthalmology"' + (specialty === 'Ophthalmology' ? ' selected' : '') + '>Ophthalmology</option>',
          '</select>',
          '<select class="zch-select" onchange="ZenveClinicsDashboard.filterDoctors(null, null, this.value)">',
            '<option value="ALL"' + (duty === 'ALL' ? ' selected' : '') + '>All Duty Statuses</option>',
            '<option value="On Duty"' + (duty === 'On Duty' ? ' selected' : '') + '>On Duty</option>',
            '<option value="In Surgery"' + (duty === 'In Surgery' ? ' selected' : '') + '>In Surgery</option>',
            '<option value="On Call"' + (duty === 'On Call' ? ' selected' : '') + '>On Call Emergency</option>',
            '<option value="Off Duty"' + (duty === 'Off Duty' ? ' selected' : '') + '>Off Duty</option>',
          '</select>',
          '<span style="font-size:12px;color:#94a3b8;margin-left:auto;">Showing <b>' + filtered.length + '</b> of ' + DOCTORS.length + ' Clinicians</span>',
        '</div>',

        '<div class="zch-table-wrap">',
          '<table class="zch-table">',
            '<thead>',
              '<tr>',
                '<th>Doctor Name & Code</th>',
                '<th>Specialization & Degrees</th>',
                '<th>VCI License</th>',
                '<th>Hospital / Facility Base</th>',
                '<th>Current Duty Shift</th>',
                '<th style="text-align:right;">Consults</th>',
                '<th style="text-align:right;">Surgeries</th>',
                '<th style="text-align:right;">Client CSAT</th>',
                '<th>Status</th>',
                '<th style="text-align:center;">Action</th>',
              '</tr>',
            '</thead>',
            '<tbody>',
              filtered.length === 0 ?
                '<tr><td colspan="10" style="text-align:center;padding:32px;color:#94a3b8;">No registered clinicians found. Click "+ Register New Doctor" to onboard.</td></tr>' :
                filtered.map(function (d) {
                  var statusClass = d.status === 'On Duty' ? 'green' : d.status === 'In Surgery' ? 'red' : d.status === 'On Call' ? 'amber' : 'purple';
                  return '<tr>' +
                    '<td>' +
                      '<div style="display:flex;align-items:center;gap:10px;">' +
                        '<div style="width:32px;height:32px;border-radius:50%;background:rgba(59,130,246,0.15);border:1px solid rgba(59,130,246,0.3);color:#60a5fa;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:11px;">' + esc((d.name || 'D').split(' ').map(function(n){ return n[0]; }).join('').replace('D', '') || 'DR') + '</div>' +
                        '<div>' +
                          '<b style="color:#fff;">' + esc(d.name) + '</b>' +
                          '<div style="font-family:IBM Plex Mono,monospace;font-size:10px;color:#38bdf8;">' + esc(d.id) + '</div>' +
                        '</div>' +
                      '</div>' +
                    '</td>' +
                    '<td>' +
                      '<div style="font-weight:600;color:#60a5fa;">' + esc(d.spec) + '</div>' +
                      '<div style="font-size:11px;color:#94a3b8;">' + esc(d.qual) + '</div>' +
                    '</td>' +
                    '<td style="font-family:IBM Plex Mono,monospace;color:#c084fc;font-weight:600;">' + esc(d.vci) + '</td>' +
                    '<td><span class="zch-badge blue">' + esc(d.base) + '</span></td>' +
                    '<td><span style="color:#cbd5e1;font-size:11px;">' + esc(d.shift) + '</span></td>' +
                    '<td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:600;">' + esc(d.consults || 0) + '</td>' +
                    '<td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#10b981;">' + esc(d.surgeries || 0) + '</td>' +
                    '<td style="text-align:right;color:#fbbf24;font-weight:700;">' + esc(d.csat || '--') + '</td>' +
                    '<td><span class="zch-badge ' + statusClass + '">' + esc(d.status) + '</span></td>' +
                    '<td style="text-align:center;">' +
                      '<button class="zch-btn" onclick="ZenveClinicsDashboard.showDoctorBioModal(\'' + esc(d.id) + '\')">View Bio</button>' +
                    '</td>' +
                  '</tr>';
                }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>',

      /* Surgical & Emergency On-Call Rostering Split */
      '<div class="zch-grid-2">',
        '<div class="zch-card">',
          '<div class="zch-card-head">',
            '<div><h3 class="zch-card-title">🚨 Emergency & 24x7 Night Trauma Roster</h3><p class="zch-card-sub">Immediate on-call coverage for critical emergency surgical interventions</p></div>',
            '<span class="zch-badge blue">ROSTER READY</span>',
          '</div>',
          '<div style="display:flex;flex-direction:column;gap:10px;">',
            DOCTORS.length === 0 ?
              '<div style="padding:20px;text-align:center;color:#94a3b8;background:#090e17;border-radius:8px;">No doctors currently assigned to emergency roster.</div>' :
              DOCTORS.slice(0, 3).map(function(d) {
                return '<div style="background:#090e17;border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:12px;display:flex;justify-content:space-between;align-items:center;">' +
                  '<div><b style="color:#fff;">' + esc(d.name) + '</b><div style="font-size:11px;color:#94a3b8;">' + esc(d.base) + ' • ' + esc(d.spec) + '</div></div>' +
                  '<span class="zch-badge green">' + esc(d.status) + '</span>' +
                '</div>';
              }).join(''),
          '</div>',
        '</div>',

        '<div class="zch-card">',
          '<div class="zch-card-head">',
            '<div><h3 class="zch-card-title">📚 Continuing Veterinary Medical Education (CME)</h3><p class="zch-card-sub">Clinical accreditation status, surgical simulations, and peer case audits</p></div>',
            '<span class="zch-badge blue">0 COMPLETED</span>',
          '</div>',
          '<div style="display:flex;flex-direction:column;gap:12px;padding:4px 0;">',
            '<div>',
              '<div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:6px;"><span>Small Animal Arthroscopy & TPLO Hands-on</span><strong style="color:#38bdf8;">0/0 Surgeons Certified</strong></div>',
              '<div class="zch-progress-bar"><div class="zch-progress-fill" style="width:0%;background:#38bdf8;"></div></div>',
            '</div>',
            '<div>',
              '<div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:6px;"><span>Feline Friendly Clinical Handling Protocol</span><strong style="color:#34d399;">0/0 Clinicians Completed</strong></div>',
              '<div class="zch-progress-bar"><div class="zch-progress-fill" style="width:0%;background:#34d399;"></div></div>',
            '</div>',
            '<div>',
              '<div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:6px;"><span>Antimicrobial Stewardship & Infection Control</span><strong style="color:#c084fc;">Audit Score: 0.0%</strong></div>',
              '<div class="zch-progress-bar"><div class="zch-progress-fill" style="width:0%;background:#c084fc;"></div></div>',
            '</div>',
          '</div>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 9: Clinic Commissions ────────────────────────────────── */
  function renderCommissions() {
    return [
      '<div class="zch-kpi-grid">',
        kpiHtml('Total Partner Payouts', inr(0), 'Current Month Accrual', 'neutral', 'Partner clinics & consultants', '🤝'),
        kpiHtml('Referral Cases Handled', '0 Cases', 'No referral records', 'neutral', 'High-complexity referrals', '🔄'),
        kpiHtml('Average Commission Rate', '0.0%', 'Standard B2B Referral', 'neutral', 'Surgical revenue basis', '📊'),
        kpiHtml('Statutory TDS Deducted', inr(0), '10% Section 194J', 'neutral', 'Tax compliance remitted', '🏛️'),
      '</div>',

      '<div class="zch-card">',
        '<div class="zch-card-head">',
          '<div><h3 class="zch-card-title">B2B Clinic Referrals & Visiting Specialist Settlements</h3><p class="zch-card-sub">Transparent revenue sharing, patient referral volume, 10% TDS withholding, and disbursement status</p></div>',
          '<button class="zch-btn primary" onclick="alert(\'No pending commission disbursements to process.\')">Process Approved Payouts</button>',
        '</div>',
        '<div class="zch-table-wrap">',
          '<table class="zch-table">',
            '<thead><tr><th>Settlement ID</th><th>Partner Clinic / Consultant</th><th>Affiliation Type</th><th>Cases Referred</th><th>Total Case Value</th><th>Comm %</th><th>Gross Comm</th><th>10% TDS</th><th>Net Payable</th><th>Status</th></tr></thead>',
            '<tbody>',
              COMMISSIONS.length === 0 ?
                '<tr><td colspan="10" style="text-align:center;padding:32px;color:#94a3b8;">No referral commissions or partner settlements recorded.</td></tr>' :
                COMMISSIONS.map(function (c) {
                  return '<tr>' +
                    '<td style="font-family:IBM Plex Mono,monospace;font-weight:600;color:#38bdf8;">' + esc(c.id) + '</td>' +
                    '<td><b>' + esc(c.partner) + '</b></td>' +
                    '<td><span class="zch-badge blue">' + esc(c.type) + '</span></td>' +
                    '<td style="font-family:IBM Plex Mono,monospace;font-weight:600;">' + c.cases + ' cases</td>' +
                    '<td style="font-family:IBM Plex Mono,monospace;">' + esc(c.val) + '</td>' +
                    '<td style="font-family:IBM Plex Mono,monospace;color:#38bdf8;">' + esc(c.rate) + '</td>' +
                    '<td style="font-family:IBM Plex Mono,monospace;font-weight:600;">' + esc(c.comm) + '</td>' +
                    '<td style="font-family:IBM Plex Mono,monospace;color:#f87171;">' + esc(c.tds) + '</td>' +
                    '<td style="font-family:IBM Plex Mono,monospace;font-weight:700;color:#10b981;">' + esc(c.net) + '</td>' +
                    '<td><span class="zch-badge ' + (c.status === 'Paid' ? 'green' : c.status === 'Approved' ? 'blue' : 'amber') + '">' + esc(c.status) + '</span></td>' +
                  '</tr>';
                }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 10: Clinic Network ───────────────────────────────────── */
  function renderNetwork() {
    return [
      '<div class="zch-kpi-grid">',
        kpiHtml('Active Network Facilities', FACILITIES.length + ' Centers', 'Flagships & Spokes', 'neutral', 'Operating across network', '🌐'),
        kpiHtml('ALS Pet Ambulance Fleet', AMBULANCE_FLEET.length + ' Units', '0 Dispatched | 0 Ready', 'neutral', 'GPS mobile ICU vehicles', '🚑'),
        kpiHtml('Inter-Facility Transfers', '0 / mo', 'No active transfers', 'neutral', 'Peripheral to tertiary hubs', '🔄'),
        kpiHtml('Avg Emergency Transit Time', '--', 'No transit records', 'neutral', 'Dedicated veterinary corridor', '⏱️'),
        kpiHtml('Cloud Tele-PACS Sync', '100%', 'Tier 4 Cloud EMR', 'neutral', 'Sub-second digital X-ray sync', '📶'),
        kpiHtml('Expansion Pipeline', '0 In Build', 'Planned hubs', 'neutral', 'Future Capacity', '🏗️'),
      '</div>',

      '<div class="zch-grid-2">',
        '<div class="zch-card">',
          '<div class="zch-card-head">',
            '<div><h3 class="zch-card-title">Hub-and-Spoke Regional Corridors</h3><p class="zch-card-sub">Tertiary hubs anchor specialized neuro, ortho, and oncologic care</p></div>',
            '<span class="zch-badge blue">0 HUBS ACTIVE</span>',
          '</div>',
          '<div style="display:flex;flex-direction:column;gap:12px;">',
            FACILITIES.length === 0 ?
              '<div style="text-align:center;padding:32px;color:#94a3b8;background:#090e17;border-radius:10px;">No regional facility hubs registered yet.</div>' :
              FACILITIES.map(function(f) {
                return '<div style="background:#090e17;border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:14px;">' +
                  '<div style="display:flex;justify-content:space-between;margin-bottom:6px;"><b style="color:#38bdf8;">' + esc(f.name) + '</b><span class="zch-badge blue">' + esc(f.city) + '</span></div>' +
                  '<div style="font-size:12px;color:#94a3b8;">' + esc(f.type) + ' • ' + esc(f.beds) + '</div>' +
                '</div>';
              }).join(''),
          '</div>',
        '</div>',

        '<div class="zch-card">',
          '<div class="zch-card-head">',
            '<div><h3 class="zch-card-title">24x7 ALS Mobile ICU Pet Ambulances</h3><p class="zch-card-sub">GPS tracked veterinary emergency response units</p></div>',
            '<span class="zch-badge blue">' + AMBULANCE_FLEET.length + ' UNITS LIVE</span>',
          '</div>',
          '<div style="display:flex;flex-direction:column;gap:10px;">',
            AMBULANCE_FLEET.length === 0 ?
              '<div style="text-align:center;padding:32px;color:#94a3b8;background:#090e17;border-radius:8px;">No mobile ICU pet ambulances registered in fleet.</div>' :
              AMBULANCE_FLEET.map(function (amb) {
                return '<div style="background:#090e17;border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:12px;">' +
                  '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">' +
                    '<div><b style="color:#fff;font-size:13px;">🚑 ' + esc(amb.vehicle) + '</b> <span style="font-family:IBM Plex Mono,monospace;font-size:10px;color:#64748b;">(' + esc(amb.id) + ')</span></div>' +
                    '<span class="zch-badge ' + (amb.status.includes('Transit') || amb.status.includes('Emergency') || amb.status.includes('Dispatched') ? 'red' : 'green') + '">' + esc(amb.status) + '</span>' +
                  '</div>' +
                  '<div style="display:flex;justify-content:space-between;font-size:11px;color:#94a3b8;margin-bottom:4px;">' +
                    '<span>Base: <strong style="color:#cbd5e1;">' + esc(amb.base) + '</strong></span>' +
                    '<span>Crew: <strong style="color:#cbd5e1;">' + esc(amb.medic) + '</strong></span>' +
                  '</div>' +
                  '<div style="font-size:10px;color:#64748b;margin-bottom:6px;">Equipment: ' + esc(amb.equipment) + '</div>' +
                  '<div style="display:flex;justify-content:space-between;background:rgba(255,255,255,0.02);padding:4px 8px;border-radius:4px;font-size:11px;">' +
                    '<span style="color:#94a3b8;">ETA to destination:</span>' +
                    '<span style="color:#38bdf8;font-weight:700;font-family:IBM Plex Mono,monospace;">' + esc(amb.eta) + '</span>' +
                  '</div>' +
                '</div>';
              }).join(''),
          '</div>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Master Render Function with Dynamic Header Updates ───────── */
  function render() {
    if (!root) return;

    var activeTab = TABS.find(function (t) { return t.id === S.tab; }) || TABS[0];

    // Update Header Content Dynamically
    var titleEl = root.querySelector('.zch-title');
    if (titleEl) titleEl.textContent = activeTab.title || activeTab.label;

    var subEl = root.querySelector('.zch-sub');
    if (subEl) subEl.textContent = activeTab.sub || '';

    var badgeEl = root.querySelector('.zch-live-badge');
    if (badgeEl) {
      badgeEl.innerHTML = '<span class="zch-pulse-dot"></span> ' + esc(activeTab.badge || 'Active');
    }

    // Contextual Action Button in Header
    var actionBtn = root.querySelector('.zch-context-action');
    if (actionBtn) {
      if (S.tab === 'doctors') {
        actionBtn.style.display = 'inline-flex';
        actionBtn.textContent = '+ Register Doctor';
        actionBtn.onclick = function() { ZenveClinicsDashboard.showAddDoctorModal(); };
      } else if (S.tab === 'all-clinics' || S.tab === 'dashboard') {
        actionBtn.style.display = 'inline-flex';
        actionBtn.textContent = '+ Add Facility';
        actionBtn.onclick = function() { ZenveClinicsDashboard.showNewClinicModal(); };
      } else if (S.tab === 'orders') {
        actionBtn.style.display = 'inline-flex';
        actionBtn.textContent = '+ Create PO';
        actionBtn.onclick = function() { ZenveClinicsDashboard.showNewOrderModal(); };
      } else {
        actionBtn.style.display = 'none';
      }
    }

    // Render Tabs Bar
    var tabsBar = root.querySelector('.zch-tabs-bar');
    if (tabsBar) {
      tabsBar.innerHTML = TABS.map(function (t) {
        var isActive = t.id === S.tab;
        return [
          '<button class="zch-tab ' + (isActive ? 'active' : '') + '" onclick="ZenveClinicsDashboard.switchTab(\'' + t.id + '\')">',
            '<span>' + t.icon + '</span>',
            '<span>' + esc(t.label) + '</span>',
            t.badge ? '<span class="zch-tab-badge ' + (t.warnBadge ? 'warn' : '') + '">' + esc(t.badge) + '</span>' : '',
          '</button>'
        ].join('');
      }).join('');
    }

    // Render Content Area
    var body = root.querySelector('.zch-body');
    if (body) {
      switch (S.tab) {
        case 'dashboard': body.innerHTML = renderDashboard(); break;
        case 'all-clinics': body.innerHTML = renderAllClinics(); break;
        case 'hospitals': body.innerHTML = renderHospitals(); break;
        case 'performance': body.innerHTML = renderPerformance(); break;
        case 'revenue': body.innerHTML = renderRevenue(); break;
        case 'orders': body.innerHTML = renderOrders(); break;
        case 'patients': body.innerHTML = renderPatients(); break;
        case 'doctors': body.innerHTML = renderDoctors(); break;
        case 'commissions': body.innerHTML = renderCommissions(); break;
        case 'network': body.innerHTML = renderNetwork(); break;
        default: body.innerHTML = renderDashboard(); break;
      }
    }
  }

  /* ── Build Shell ──────────────────────────────────────────────── */
  function build() {
    if (root) return;
    root = document.createElement('div');
    root.id = 'zch-root';
    root.innerHTML = [
      '<header class="zch-head">',
        '<div class="zch-head-left">',
          '<div class="zch-title-row">',
            '<h1 class="zch-title">Clinics Dashboard</h1>',
            '<span class="zch-live-badge"><span class="zch-pulse-dot"></span> 14 Facilities Active</span>',
          '</div>',
          '<p class="zch-sub">Veterinary Hospitals & Clinics Command Center</p>',
        '</div>',
        '<div class="zch-head-actions">',
          '<button class="zch-btn" onclick="ZenveClinicsDashboard.loadLiveFacilities()">🔄 Refresh Vitals (MySQL)</button>',
          '<button class="zch-btn primary zch-context-action">+ Add Facility</button>',
          '<button class="zch-btn danger" onclick="ZenveClinicsDashboard.close()">✕ Exit Dashboard</button>',
        '</div>',
      '</header>',
      '<nav class="zch-tabs-bar" aria-label="Clinics & Hospitals Subdomains"></nav>',
      '<div class="zch-body"></div>'
    ].join('');
    document.body.appendChild(root);
  }

  /* ── Open / Close / Switch ────────────────────────────────────── */
  function open(tab) {
    // Close other domain overlays cleanly
    if (window.ZenveSalesDashboard && typeof window.ZenveSalesDashboard.close === 'function') {
      try { window.ZenveSalesDashboard.close(); } catch (e) {}
    }
    if (window.ZenveOperationsDashboard && typeof window.ZenveOperationsDashboard.close === 'function') {
      try { window.ZenveOperationsDashboard.close(); } catch (e) {}
    }
    if (window.ZenveProductsInventory && typeof window.ZenveProductsInventory.close === 'function') {
      try { window.ZenveProductsInventory.close(); } catch (e) {}
    }
    if (window.ZenvePharmacyDashboard && typeof window.ZenvePharmacyDashboard.close === 'function') {
      try { window.ZenvePharmacyDashboard.close(); } catch (e) {}
    }
    if (window.ZenveReportsDashboard && typeof window.ZenveReportsDashboard.close === 'function') {
      try { window.ZenveReportsDashboard.close(); } catch (e) {}
    }
    if (window.ZenveAlertsDashboard && typeof window.ZenveAlertsDashboard.close === 'function') {
      try { window.ZenveAlertsDashboard.close(); } catch (e) {}
    }
    if (window.ZenveFinanceDashboard && typeof window.ZenveFinanceDashboard.close === 'function') {
      try { window.ZenveFinanceDashboard.close(); } catch (e) {}
    }
    if (window.ZenveSettingsDashboard && typeof window.ZenveSettingsDashboard.close === 'function') {
      try { window.ZenveSettingsDashboard.close(); } catch (e) {}
    }

    document.querySelectorAll('.zpanel-root, [id$="-root"]').forEach(function (el) {
      if (el.id !== 'zch-root') el.classList.remove('zpanel-open', 'zod-open', 'zsd-open', 'zpid-open', 'zph-open', 'zrep-open', 'zalt-open', 'zset-open', 'zfa-open');
    });

    // Dismiss any Radix placeholder dialog
    try {
      document.querySelectorAll('[role="dialog"]').forEach(function (d) {
        if (d.closest('#zch-root')) return;
        var btn = d.querySelector('button[aria-label*="close" i], button:last-child');
        if (btn) btn.click();
      });
    } catch (e) {}

    if (tab && TABS.some(function (t) { return t.id === tab; })) {
      S.tab = tab;
    } else if (!S.tab) {
      S.tab = 'dashboard';
    }

    build();
    S.open = true;
    root.classList.add('zch-open');
    render();

    var targetHash = TABS.find(function (t) { return t.id === S.tab; })?.hash;
    if (targetHash && location.hash !== targetHash) {
      try { history.replaceState(null, '', targetHash); } catch (e) {}
    }
  }

  function close() {
    S.open = false;
    if (root) root.classList.remove('zch-open');
    if (TABS.some(function (t) { return t.hash === location.hash; })) {
      try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {}
    }
  }

  function switchTab(tabId) {
    if (!TABS.some(function (t) { return t.id === tabId; })) return;
    S.tab = tabId;
    render();
    var t = TABS.find(function (it) { return it.id === tabId; });
    if (t && t.hash) {
      try { history.replaceState(null, '', t.hash); } catch (e) {}
    }
  }

  function filterDoctors(search, specialty, duty) {
    if (search !== null && search !== undefined) S.docSearch = search;
    if (specialty !== null && specialty !== undefined) S.docSpecialty = specialty;
    if (duty !== null && duty !== undefined) S.docDuty = duty;
    var body = root ? root.querySelector('.zch-body') : null;
    if (body && S.tab === 'doctors') {
      body.innerHTML = renderDoctors();
    }
  }

  /* ── Interactive Modals ────────────────────────────────────────── */
  function showDoctorBioModal(docId) {
    var d = DOCTORS.find(function (it) { return it.id === docId; });
    if (!d) {
      alert('Doctor record not found.');
      return;
    }
    var modalHtml = [
      '<div class="zch-modal-backdrop" id="zch-doc-bio-modal">',
        '<div class="zch-modal">',
          '<div class="zch-modal-head">',
            '<div style="display:flex;align-items:center;gap:12px;">',
              '<div style="width:40px;height:40px;border-radius:50%;background:rgba(59,130,246,0.15);border:1px solid rgba(59,130,246,0.3);color:#60a5fa;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:16px;">👨‍⚕️</div>',
              '<div>',
                '<h3 class="zch-modal-title">' + esc(d.name) + '</h3>',
                '<span style="font-size:11px;color:#94a3b8;font-family:IBM Plex Mono,monospace;">' + esc(d.id) + ' • ' + esc(d.vci) + '</span>',
              '</div>',
            '</div>',
            '<button type="button" class="zch-btn" onclick="document.getElementById(\'zch-doc-bio-modal\').remove()">✕</button>',
          '</div>',
          '<div class="zch-modal-body">',
            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;background:rgba(255,255,255,0.02);padding:14px;border-radius:10px;border:1px solid rgba(255,255,255,0.06);font-size:12px;">',
              '<div><span style="color:#64748b;">Clinical Specialization:</span><div style="font-weight:600;color:#38bdf8;">' + esc(d.spec) + '</div></div>',
              '<div><span style="color:#64748b;">Primary Facility Base:</span><div style="font-weight:600;color:#fff;">' + esc(d.base) + '</div></div>',
              '<div><span style="color:#64748b;">Degrees & Credentials:</span><div style="color:#cbd5e1;">' + esc(d.qual) + '</div></div>',
              '<div><span style="color:#64748b;">Current Active Shift:</span><div style="color:#10b981;font-weight:600;">' + esc(d.shift) + '</div></div>',
              '<div><span style="color:#64748b;">Lifetime Consultations:</span><div style="font-weight:700;font-family:IBM Plex Mono,monospace;">' + esc(d.consults) + ' Patients</div></div>',
              '<div><span style="color:#64748b;">Surgical Procedures:</span><div style="font-weight:700;font-family:IBM Plex Mono,monospace;color:#10b981;">' + esc(d.surgeries) + ' OTs</div></div>',
            '</div>',
            '<div>',
              '<h4 style="margin:0 0 6px;font-size:13px;color:#f8fafc;">Clinical Bio & Expertise</h4>',
              '<p style="margin:0;font-size:12px;color:#94a3b8;line-height:1.5;">' + esc(d.bio) + '</p>',
            '</div>',
            '<div style="display:flex;justify-content:space-between;align-items:center;background:rgba(251,191,36,0.1);padding:10px 14px;border-radius:8px;border:1px solid rgba(251,191,36,0.25);">',
              '<span style="font-size:12px;color:#cbd5e1;">Verified Patient Satisfaction (CSAT):</span>',
              '<span style="font-size:14px;font-weight:700;color:#fbbf24;">' + esc(d.csat) + ' (99.4% Positive Feedback)</span>',
            '</div>',
          '</div>',
          '<div class="zch-modal-foot">',
            '<button type="button" class="zch-btn" onclick="document.getElementById(\'zch-doc-bio-modal\').remove()">Close</button>',
            '<button type="button" class="zch-btn primary" onclick="alert(\'Roster modification requested for ' + esc(d.name) + '\')">Modify Shift Assignment</button>',
          '</div>',
        '</div>',
      '</div>'
    ].join('');

    var div = document.createElement('div');
    div.innerHTML = modalHtml;
    document.body.appendChild(div.firstElementChild);
  }

  function showNewClinicModal() {
    var modalHtml = [
      '<div class="zch-modal-backdrop" id="zch-clinic-modal">',
        '<div class="zch-modal">',
          '<div class="zch-modal-head">',
            '<h3 class="zch-modal-title">Register New Facility in Zenve Network</h3>',
            '<button type="button" class="zch-btn" onclick="document.getElementById(\'zch-clinic-modal\').remove()">✕</button>',
          '</div>',
          '<form id="zch-add-clinic-form" class="zch-modal-body">',
            '<div><label style="display:block;color:#94a3b8;font-size:12px;margin-bottom:4px;">Facility Commercial Name</label><input required class="zch-input" style="width:100%;" id="clinic-name" placeholder="e.g. Zenve Care Center Whitefield" /></div>',
            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">',
              '<div><label style="display:block;color:#94a3b8;font-size:12px;margin-bottom:4px;">City Cluster</label><select class="zch-select" style="width:100%;" id="clinic-city"><option>Bengaluru</option><option>Mumbai</option><option>Delhi NCR</option><option>Hyderabad</option><option>Pune</option></select></div>',
              '<div><label style="display:block;color:#94a3b8;font-size:12px;margin-bottom:4px;">Facility Tier</label><select class="zch-select" style="width:100%;" id="clinic-tier"><option>Primary OPD & Diagnostics</option><option>Secondary Care Clinic</option><option>Tertiary 24x7 Hospital</option></select></div>',
            '</div>',
            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">',
              '<div><label style="display:block;color:#94a3b8;font-size:12px;margin-bottom:4px;">Inpatient Beds</label><input class="zch-input" style="width:100%;" id="clinic-beds" placeholder="e.g. 6 Daycare Bays" /></div>',
              '<div><label style="display:block;color:#94a3b8;font-size:12px;margin-bottom:4px;">OT Specification</label><input class="zch-input" style="width:100%;" id="clinic-ot" placeholder="e.g. Minor Surgical Suite" /></div>',
            '</div>',
            '<div><label style="display:block;color:#94a3b8;font-size:12px;margin-bottom:4px;">Lead Attending Veterinarian</label><input required class="zch-input" style="width:100%;" id="clinic-lead" placeholder="e.g. Dr. Sneha Nair, BVSc" /></div>',
            '<div class="zch-modal-foot">',
              '<button type="button" class="zch-btn" onclick="document.getElementById(\'zch-clinic-modal\').remove()">Cancel</button>',
              '<button type="submit" class="zch-btn primary">Commission Facility</button>',
            '</div>',
          '</form>',
        '</div>',
      '</div>'
    ].join('');

    var div = document.createElement('div');
    div.innerHTML = modalHtml;
    document.body.appendChild(div.firstElementChild);

    var form = document.getElementById('zch-add-clinic-form');
    if (form) {
      form.onsubmit = function (e) {
        e.preventDefault();
        var name = document.getElementById('clinic-name').value;
        var city = document.getElementById('clinic-city').value;
        var tier = document.getElementById('clinic-tier').value;
        var beds = document.getElementById('clinic-beds').value || '4 Pods';
        var ot = document.getElementById('clinic-ot').value || 'Minor OT';
        var lead = document.getElementById('clinic-lead').value;

        fetch('/api/v1/clinics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name,
            type: tier,
            city: city,
            address: city + ' Healthcare Center',
            phone: '+91 80 4912 3456',
            operating_hours: '24x7 Emergency & Critical Care',
            doctor_count: 8,
            bed_count: Number(beds.replace(/[^0-9]/g, '')) || 16
          })
        })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          var m = document.getElementById('zch-clinic-modal');
          if (m) m.remove();
          alert('✓ Facility "' + name + '" saved to MySQL zenve_engine database!');
          loadLiveFacilities();
        })
        .catch(function (err) {
          alert('Error saving facility: ' + err.message);
        });
      };
    }
  }

  function showNewOrderModal() {
    var modalHtml = [
      '<div class="zch-modal-backdrop" id="zch-order-modal">',
        '<div class="zch-modal">',
          '<div class="zch-modal-head">',
            '<h3 class="zch-modal-title">Create Clinical Supply Requisition</h3>',
            '<button type="button" class="zch-btn" onclick="document.getElementById(\'zch-order-modal\').remove()">✕</button>',
          '</div>',
          '<form id="zch-add-order-form" class="zch-modal-body">',
            '<div><label style="display:block;color:#94a3b8;font-size:12px;margin-bottom:4px;">Target Healthcare Facility</label><select class="zch-select" style="width:100%;" id="order-fac">' +
              FACILITIES.map(function(f){ return '<option>' + esc(f.name) + '</option>'; }).join('') +
            '</select></div>',
            '<div><label style="display:block;color:#94a3b8;font-size:12px;margin-bottom:4px;">Item Description (Implants, Gases, Consumables)</label><input required class="zch-input" style="width:100%;" id="order-item" placeholder="e.g. Titanium Locking Screws 3.5mm" /></div>',
            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">',
              '<div><label style="display:block;color:#94a3b8;font-size:12px;margin-bottom:4px;">Vendor</label><input required class="zch-input" style="width:100%;" id="order-vendor" placeholder="e.g. Synthes Vet India" /></div>',
              '<div><label style="display:block;color:#94a3b8;font-size:12px;margin-bottom:4px;">Quantity</label><input required class="zch-input" style="width:100%;" id="order-qty" placeholder="e.g. 10 Kits" /></div>',
            '</div>',
            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">',
              '<div><label style="display:block;color:#94a3b8;font-size:12px;margin-bottom:4px;">Estimated Value (₹)</label><input type="number" required class="zch-input" style="width:100%;" id="order-val" placeholder="45000" /></div>',
              '<div><label style="display:block;color:#94a3b8;font-size:12px;margin-bottom:4px;">Priority</label><select class="zch-select" style="width:100%;" id="order-priority"><option>High</option><option>Critical</option><option>Routine</option></select></div>',
            '</div>',
            '<div class="zch-modal-foot">',
              '<button type="button" class="zch-btn" onclick="document.getElementById(\'zch-order-modal\').remove()">Cancel</button>',
              '<button type="submit" class="zch-btn primary">Issue Requisition PO</button>',
            '</div>',
          '</form>',
        '</div>',
      '</div>'
    ].join('');

    var div = document.createElement('div');
    div.innerHTML = modalHtml;
    document.body.appendChild(div.firstElementChild);

    var form = document.getElementById('zch-add-order-form');
    if (form) {
      form.onsubmit = function (e) {
        e.preventDefault();
        var fac = document.getElementById('order-fac').value;
        var item = document.getElementById('order-item').value;
        var vendor = document.getElementById('order-vendor').value;
        var qty = document.getElementById('order-qty').value;
        var val = Number(document.getElementById('order-val').value) || 25000;
        var prio = document.getElementById('order-priority').value;

        CLINIC_ORDERS.unshift({
          po: 'PO-CLIN-40' + (CLINIC_ORDERS.length + 80),
          facility: fac,
          item: item,
          vendor: vendor,
          qty: qty,
          cost: '₹' + val.toLocaleString('en-IN'),
          status: 'Pending Approval',
          priority: prio
        });

        document.getElementById('zch-order-modal').remove();
        render();
        alert('Requisition issued for ' + item + ' (' + fac + ')');
      };
    }
  }

  function showAddDoctorModal() {
    var modalHtml = [
      '<div class="zch-modal-backdrop" id="zch-doc-modal">',
        '<div class="zch-modal">',
          '<div class="zch-modal-head">',
            '<h3 class="zch-modal-title">Register Veterinary Clinician / Surgeon</h3>',
            '<button type="button" class="zch-btn" onclick="document.getElementById(\'zch-doc-modal\').remove()">✕</button>',
          '</div>',
          '<form id="zch-add-doc-form" class="zch-modal-body">',
            '<div><label style="display:block;color:#94a3b8;font-size:12px;margin-bottom:4px;">Doctor Full Name</label><input required class="zch-input" style="width:100%;" id="doc-name" placeholder="e.g. Dr. Siddharth Roy" /></div>',
            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">',
              '<div><label style="display:block;color:#94a3b8;font-size:12px;margin-bottom:4px;">Degrees & Qualifications</label><input required class="zch-input" style="width:100%;" id="doc-qual" placeholder="e.g. B.V.Sc & A.H, M.V.Sc (Vet Surgery)" /></div>',
              '<div><label style="display:block;color:#94a3b8;font-size:12px;margin-bottom:4px;">VCI License No.</label><input required class="zch-input" style="width:100%;" id="doc-vci" placeholder="e.g. VCI-KAR-2021-512" /></div>',
            '</div>',
            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">',
              '<div><label style="display:block;color:#94a3b8;font-size:12px;margin-bottom:4px;">Clinical Specialty</label><input required class="zch-input" style="width:100%;" id="doc-spec" placeholder="e.g. Orthopedic Surgery & TPLO" /></div>',
              '<div><label style="display:block;color:#94a3b8;font-size:12px;margin-bottom:4px;">Hospital Base</label><select class="zch-select" style="width:100%;" id="doc-base">' +
                FACILITIES.map(function(f){ return '<option>' + esc(f.name) + '</option>'; }).join('') +
              '</select></div>',
            '</div>',
            '<div><label style="display:block;color:#94a3b8;font-size:12px;margin-bottom:4px;">Clinical Biography / Special Achievements</label><textarea class="zch-input" style="width:100%;height:60px;" id="doc-bio" placeholder="e.g. Gold medalist surgeon with extensive experience in small animal soft-tissue surgery..."></textarea></div>',
            '<div class="zch-modal-foot">',
              '<button type="button" class="zch-btn" onclick="document.getElementById(\'zch-doc-modal\').remove()">Cancel</button>',
              '<button type="submit" class="zch-btn primary">Add to Clinical Roster</button>',
            '</div>',
          '</form>',
        '</div>',
      '</div>'
    ].join('');

    var div = document.createElement('div');
    div.innerHTML = modalHtml;
    document.body.appendChild(div.firstElementChild);

    var form = document.getElementById('zch-add-doc-form');
    if (form) {
      form.onsubmit = function (e) {
        e.preventDefault();
        var name = document.getElementById('doc-name').value;
        var qual = document.getElementById('doc-qual').value;
        var vci = document.getElementById('doc-vci').value;
        var spec = document.getElementById('doc-spec').value;
        var base = document.getElementById('doc-base').value;
        var bio = document.getElementById('doc-bio').value || 'Registered veterinarian practicing small animal medicine.';

        DOCTORS.unshift({
          id: 'DOC-0' + (DOCTORS.length + 1),
          name: name,
          qual: qual,
          vci: vci,
          spec: spec,
          base: base,
          shift: 'Morning (08:00 – 16:00)',
          csat: '5.00 ★',
          consults: 0,
          surgeries: 0,
          status: 'On Duty',
          bio: bio
        });

        document.getElementById('zch-doc-modal').remove();
        render();
        alert('Clinician ' + name + ' registered in roster!');
      };
    }
  }

  /* ── Hash-change listener ─────────────────────────────────────── */
  window.addEventListener('hashchange', function () {
    var tab = tabFromHash(location.hash);
    if (tab) {
      if (!S.open) open(tab);
      else switchTab(tab);
    } else if (S.open) {
      close();
    }
  });

  /* ── Check initial hash on load ───────────────────────────────── */
  var initialTab = tabFromHash(location.hash);
  if (initialTab) {
    var go = function () { setTimeout(function () { open(initialTab); }, 400); };
    if (document.readyState === 'complete') go();
    else window.addEventListener('load', go);
  }

  /* ── Global Click Interception & Wire Sidebar ─────────────────── */
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;

    // Never intercept accordion group toggles or search bar
    if (t.closest('[aria-expanded]') || t.closest('button[aria-expanded]') || t.closest('[aria-label="Search menu"]')) return;

    var item = t.closest('button, [data-go], a, [role="button"], li');
    if (item && item.textContent) {
      var tab = tabFromText(item.textContent.trim());
      if (tab) {
        if (!t.closest('#zch-root')) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          open(tab);
          return;
        }
      }
    }

    if (S.open) {
      if (t.closest('#zch-root')) return;
      var b = t.closest('.sidebar-scope button, .sidebar-scope a, nav button, nav a, aside button, aside a');
      if (!b) return;
      if (b.getAttribute('aria-label') === 'Search menu') return;
      if (b.getAttribute('aria-expanded') !== null) return;
      if (b.textContent && tabFromText(b.textContent.trim())) return;

      close();
    }
  }, true);

  document.addEventListener('pointerdown', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;

    if (t.closest('[aria-expanded]') || t.closest('button[aria-expanded]') || t.closest('[aria-label="Search menu"]')) return;

    var item = t.closest('.sidebar-scope li button, .sidebar-scope li a, nav li button, nav li a');
    if (item && item.textContent) {
      var tab = tabFromText(item.textContent.trim());
      if (tab) {
        e.stopPropagation();
      }
    }
  }, true);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && S.open) {
      close();
    }
  });

  /* ── Hashchange Listener ───────────────────────────────────────── */
  window.addEventListener('hashchange', function () {
    var tab = tabFromHash(location.hash);
    if (tab) {
      open(tab);
    } else if (S.open && location.hash && !location.hash.startsWith('#clinic') && !location.hash.startsWith('#all-clinic') && !location.hash.startsWith('#hospital')) {
      close();
    }
  });

  function wireSidebar() {
    document.querySelectorAll(
      '.sidebar-scope li button, .sidebar-scope li a, ' +
      '[data-sidebar] li button, [data-sidebar] li a, nav li button, nav li a'
    ).forEach(function (btn) {
      if (btn.getAttribute('aria-expanded') !== null || btn.closest('[aria-expanded]') || btn.closest('button[aria-expanded]')) return;
      if (btn._zchWired) return;
      btn._zchWired = true;
      btn.addEventListener('click', function (e) {
        if (btn.getAttribute('aria-expanded') !== null || btn.closest('[aria-expanded]') || btn.closest('button[aria-expanded]')) return;
        var tab = tabFromText(btn.textContent ? btn.textContent.trim() : '');
        if (tab) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          open(tab);
        }
      }, true);
    });
    setTimeout(wireSidebar, 1500);
  }

  /* ── Public API ───────────────────────────────────────────────── */
  window.ZenveClinicsDashboard = {
    open: open,
    close: close,
    switchTab: switchTab,
    filterDoctors: filterDoctors,
    showNewClinicModal: showNewClinicModal,
    showNewOrderModal: showNewOrderModal,
    showAddDoctorModal: showAddDoctorModal,
    showDoctorBioModal: showDoctorBioModal,
    loadLiveFacilities: loadLiveFacilities
  };

  /* ── Boot ─────────────────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { build(); wireSidebar(); });
  } else {
    build();
    wireSidebar();
  }

})();
