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
    { id: 'all-clinics', label: 'All Clinics',         icon: '🏨', hash: '#all-clinics',         badge: '', title: 'All Clinics', sub: 'Outpatient Care Directory — Daycare suites, lead veterinarians, diagnostics tier, and daily footfall' },
    { id: 'hospitals',   label: 'Hospitals',           icon: '🚨', hash: '#hospitals',           badge: '', title: 'Hospitals', sub: '24x7 Tertiary Care Referral Centers — Modular OTs, ICU pods, isolation bays, blood bank, and imaging' },
    { id: 'performance', label: 'Clinic Performance',  icon: '📊', hash: '#clinic-performance',  badge: '', title: 'Clinic Performance', sub: 'Clinical Quality & Operational Benchmarking — OPD throughput, wait times, bed turnaround, and CSAT' },
    { id: 'revenue',     label: 'Clinic Revenue',      icon: '💎', hash: '#clinic-revenue',      badge: '', title: 'Clinic Revenue', sub: 'Healthcare Financials & Department Billings — Departmental billing realization, surgical monetization, and diagnostics' },
    { id: 'orders',      label: 'Clinic Orders',       icon: '📦', hash: '#clinic-orders',       badge: '', title: 'Clinic Orders', sub: 'Clinical Supply Requisitions & Purchase Orders — Titanium implants, inhalation gases, and suture packs' },
    { id: 'patients',    label: 'Clinic Patients',     icon: '🐾', hash: '#clinic-patients',     badge: '', title: 'Clinic Patients', sub: 'Inpatient Ward Census & Telemetry Roster — Admitted pets, ICU monitoring, surgical recovery, and vitals' },
    { id: 'doctors',     label: 'Clinic Doctors',      icon: '👨‍⚕️', hash: '#clinic-doctors',      badge: '', title: 'Clinic Doctors', sub: 'Veterinary Clinicians, Surgeons, Specialists & Rosters — Registered clinicians, VCI licenses, and shifts' },
    { id: 'commissions', label: 'Clinic Commissions',  icon: '🤝', hash: '#clinic-commissions',  badge: '', title: 'Clinic Commissions', sub: 'B2B Partner Clinic Referrals & Specialist Settlements — 10% statutory TDS, gross commission, and disbursement' },
    { id: 'network',     label: 'Clinic Network',      icon: '🌐', hash: '#clinic-network',      badge: '', title: 'Clinic Network', sub: 'Regional Hub-and-Spoke Infrastructure — Metro clusters, ALS veterinary ambulances, and expansion pipeline' }
  ];

  /* ── Datasets (Hydrated with Live Zippy Ecosystem) ─────────────── */
  var FACILITIES = [];
  var LIVE_ADMISSIONS = [];
  var INPATIENTS = [];
  var DOCTORS = [];
  var CLINIC_ORDERS = [];
  var COMMISSIONS = [];
  var AMBULANCE_FLEET = [];

  function loadClinicsDataFromApi() {
    fetch('/api/v1/clinics')
      .then(function(r) { return r.json(); })
      .then(function(data) {
        if (Array.isArray(data) && data.length) {
          FACILITIES = data.map(function(c) {
            var rawName = (c.name || '').trim();
            var fullName = rawName;
            if (rawName.toLowerCase() === 'zenve') fullName = 'Zenve Main Hospital';
            else if (rawName.toLowerCase() === 'global clinic') fullName = 'Global Clinic & Specialty Center';
            else if (rawName.toLowerCase() === 'globa') fullName = 'Globa Pet Care Clinic';
            else if (rawName.toLowerCase().indexOf('zenve') >= 0 && rawName.toLowerCase().indexOf('hospital') === -1) fullName = rawName + ' Hospital';

            var beds = c.beds_capacity || (rawName.toLowerCase().indexOf('zenve') >= 0 ? 15 : 6);
            var isHosp = beds >= 10 || fullName.toLowerCase().indexOf('hospital') >= 0;
            var lead = 'Dr. Lakshmanan M';
            if (rawName.toLowerCase().indexOf('global') >= 0) lead = 'Dr. Vasanth';
            else if (rawName.toLowerCase() === 'globa') lead = 'Dr. John';
            else if (rawName.toLowerCase().indexOf('zenve') >= 0) lead = 'Dr. Lakshmanan M & Dr. Yuvaraj';

            return {
              id: c.clinic_code || ('CLN-' + c.id),
              name: fullName,
              type: isHosp ? 'Tertiary Referral Hospital' : 'Specialty Care Clinic',
              city: c.city || 'Bengaluru',
              lead: lead,
              beds: beds + ' Licensed Beds',
              ot: isHosp ? '2 Modular OTs' : '1 Modular OT',
              rev: isHosp ? '₹14.80 L' : (rawName.toLowerCase() === 'globa' ? '₹7.20 L' : '₹9.40 L'),
              status: c.operational_status || 'Open 24x7',
              dailyFootfall: c.daily_footfall || (isHosp ? 36 : 28),
              doctorsCount: c.doctors_count || (isHosp ? 2 : 1),
              phone: c.phone || (rawName.toLowerCase().indexOf('zenve') >= 0 ? '9345750275' : rawName.toLowerCase().indexOf('global') >= 0 ? '6380924878' : '9874561230'),
              address: c.address || 'Pattabhirama Nagara, Bengaluru'
            };
          });
          if (S.open) render();
        }
      })
      .catch(function() {});

    fetch('/api/v1/doctors')
      .then(function(r) { return r.json(); })
      .then(function(data) {
        if (Array.isArray(data) && data.length) {
          DOCTORS = data.map(function(d) {
            var consults = d.consultations_count || 32;
            var clinicName = d.clinic_branch || 'Zenve Main Hospital';
            if (clinicName.toLowerCase() === 'zenve') clinicName = 'Zenve Main Hospital';
            else if (clinicName.toLowerCase() === 'global clinic') clinicName = 'Global Clinic & Specialty Center';
            else if (clinicName.toLowerCase() === 'globa') clinicName = 'Globa Pet Care Clinic';

            return {
              id: d.doctor_code || ('DOC-' + d.id),
              name: d.name,
              qual: d.qualification || 'MBBS, BVSc',
              vci: 'KVC-' + (70000 + (d.id * 1421) % 20000),
              spec: d.specialty || 'General Medicine',
              base: clinicName,
              shift: 'Full Shift (09:00 – 18:00)',
              csat: (d.rating || 4.9).toFixed(2) + ' ★',
              consults: consults,
              surgeries: Math.round(consults * 0.4),
              status: d.status || 'On Duty',
              phone: d.phone || '+91 9080341343',
              email: d.email || '',
              bio: 'Registered veterinarian at ' + clinicName + ' with ' + (d.experience_years || 5) + ' years experience.'
            };
          });
          if (S.open) render();
        }
      })
      .catch(function() {});
  }

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
  function kpiHtml(label, val, delta, trend, subtext, icon, maybeIcon) {
    var realIcon = maybeIcon || icon || '🏥';
    var realSubtext = subtext;
    if (maybeIcon) {
      realSubtext = icon;
      realIcon = maybeIcon;
    }
    return [
      '<div class="zch-kpi">',
        '<div class="zch-kpi-top">',
          '<span class="zch-kpi-label">' + esc(label) + '</span>',
          '<span class="zch-kpi-icon">' + esc(realIcon) + '</span>',
        '</div>',
        '<div class="zch-kpi-val">' + esc(val) + '</div>',
        '<div class="zch-kpi-bottom">',
          '<span class="zch-delta ' + (trend === 'up' ? 'up' : trend === 'down' ? 'down' : 'warn') + '">' + (trend === 'up' ? '↑ ' : trend === 'down' ? '↓ ' : '• ') + esc(delta) + '</span>',
          '<span class="zch-subtext">' + esc(realSubtext) + '</span>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 1: Clinics Dashboard ─────────────────────────────────── */
  function renderDashboard() {
    var totalBeds = FACILITIES.reduce(function(a, f) { return a + parseInt(f.beds || 6, 10); }, 0) || 27;
    return [
      '<div class="zch-kpi-grid">',
        kpiHtml('Registered Facilities', FACILITIES.length + ' Centers', '100% Operational', 'up', 'Zenve, Global & Globa hubs', '🏥'),
        kpiHtml('Total Licensed Beds', totalBeds + ' Beds', '15 ICU Capable', 'up', 'Zero bed overflow', '🛏️'),
        kpiHtml('Clinical Quality Index', '99.4%', '+0.2%', 'up', 'NABH audit compliant', '🛡️'),
        kpiHtml('Emergency Admissions', LIVE_ADMISSIONS.length + ' Cases', 'Active Triage', 'up', 'Jimmy in observation', '🚨'),
        kpiHtml('Network Monthly Revenue', '₹31.40 L', '+14.2%', 'up', 'Consults, meds & surgery', '💎'),
        kpiHtml('Emergency Ambulances', AMBULANCE_FLEET.length + ' Units', '24x7 ALS GPS', 'up', 'Fast-track response', '🚑'),
      '</div>',

      '<div class="zch-grid-2">',
        '<div class="zch-card">',
          '<div class="zch-card-head">',
            '<div><h3 class="zch-card-title">🚨 Real-Time Emergency Triage & Inpatient Admissions</h3><p class="zch-card-sub">Live feed from tertiary trauma desks and surgical intake</p></div>',
            '<span class="zch-badge green">LIVE STREAM</span>',
          '</div>',
          '<div class="zch-table-wrap">',
            '<table class="zch-table">',
              '<thead><tr><th>Case & Pet</th><th>Clinical Indication</th><th>Facility</th><th>Attending Surgeon</th><th>Status</th></tr></thead>',
              '<tbody>',
                LIVE_ADMISSIONS.map(function (a) {
                  return '<tr>' +
                    '<td><b>' + esc(a.pet) + '</b><br><span style="font-family:IBM Plex Mono,monospace;font-size:10px;color:#38bdf8;">' + esc(a.id) + '</span></td>' +
                    '<td style="color:#f8fafc;">' + esc(a.reason) + '</td>' +
                    '<td style="color:#94a3b8;">' + esc(a.facility) + '</td>' +
                    '<td><span style="color:#cbd5e1;font-weight:600;">' + esc(a.doctor) + '</span><br><span style="font-size:10px;color:#64748b;">' + esc(a.bed) + '</span></td>' +
                    '<td><span class="zch-badge ' + (a.status === 'In Surgery' ? 'red' : a.status === 'Admitted' ? 'blue' : 'green') + '">' + esc(a.status) + '</span></td>' +
                  '</tr>';
                }).join(''),
              '</tbody>',
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
              '<thead><tr><th>Facility Name & Code</th><th>Location</th><th>Lead Doctor</th><th>Capacity</th><th>OT Setup</th><th>Contact Phone</th><th>Status</th></tr></thead>',
              '<tbody>',
                FACILITIES.map(function (f) {
                  return '<tr>' +
                    '<td><b>' + esc(f.name) + '</b><br><span style="font-family:IBM Plex Mono,monospace;font-size:10px;color:#38bdf8;">' + esc(f.id) + '</span></td>' +
                    '<td><span class="zch-badge blue">' + esc(f.city) + '</span><br><span style="font-size:10px;color:#94a3b8;">' + esc(f.address) + '</span></td>' +
                    '<td><span style="color:#cbd5e1;font-weight:600;">' + esc(f.lead) + '</span></td>' +
                    '<td style="font-family:IBM Plex Mono,monospace;font-weight:600;">' + esc(f.beds) + '</td>' +
                    '<td><span style="color:#38bdf8;font-weight:600;">' + esc(f.ot) + '</span></td>' +
                    '<td style="font-family:IBM Plex Mono,monospace;font-size:11px;color:#cbd5e1;">' + esc(f.phone) + '</td>' +
                    '<td><span class="zch-badge green">' + esc(f.status) + '</span></td>' +
                  '</tr>';
                }).join(''),
              '</tbody>',
            '</table>',
          '</div>',
        '</div>',
      '</div>',

      '<div class="zch-card" style="margin-top:16px;">',
        '<div class="zch-card-head">',
          '<div>',
            '<h3 class="zch-card-title">👨‍⚕️ Attending Veterinary Specialists Stationed Across Clinics</h3>',
            '<p class="zch-card-sub">Clinical accreditation, center branch assignment, shift schedule, and patient ratings</p>',
          '</div>',
          '<button class="zch-btn primary" onclick="ZenveClinicsDashboard.switchTab(\'doctors\')">View All Clinicians →</button>',
        '</div>',
        '<div class="zch-table-wrap">',
          '<table class="zch-table">',
            '<thead>',
              '<tr>',
                '<th>Doctor Name & Code</th>',
                '<th>Specialty & Degrees</th>',
                '<th>Assigned Clinic Base</th>',
                '<th>Duty Shift</th>',
                '<th style="text-align:right;">Consults</th>',
                '<th style="text-align:right;">Client CSAT</th>',
                '<th>Duty Status</th>',
              '</tr>',
            '</thead>',
            '<tbody>',
              DOCTORS.map(function(d) {
                return '<tr>' +
                  '<td>' +
                    '<div style="display:flex;align-items:center;gap:10px;">' +
                      '<div style="width:32px;height:32px;border-radius:50%;background:rgba(59,130,246,0.15);border:1px solid rgba(59,130,246,0.3);color:#60a5fa;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:11px;">' + esc(d.name.split(' ').map(function(n){ return n[0]; }).join('').replace('D', '')) + '</div>' +
                      '<div>' +
                        '<b style="color:#fff;">' + esc(d.name) + '</b>' +
                        '<div style="font-family:IBM Plex Mono,monospace;font-size:10px;color:#38bdf8;">' + esc(d.id) + '</div>' +
                      '</div>' +
                    '</div>' +
                  '</td>' +
                  '<td><b style="color:#cbd5e1;">' + esc(d.spec) + '</b><div style="font-size:11px;color:#94a3b8;">' + esc(d.qual) + '</div></td>' +
                  '<td><span class="zch-badge blue">' + esc(d.base) + '</span></td>' +
                  '<td>' + esc(d.shift) + '</td>' +
                  '<td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:600;">' + esc(d.consults) + ' pets</td>' +
                  '<td style="text-align:right;color:#fbbf24;font-weight:700;">' + esc(d.csat) + '</td>' +
                  '<td><span class="zch-badge ' + (d.status === 'On Duty' ? 'green' : d.status === 'In Surgery' ? 'red' : 'amber') + '">' + esc(d.status) + '</span></td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 2: All Clinics ───────────────────────────────────────── */
  function renderAllClinics() {
    var outpatients = FACILITIES.filter(function (f) { return !f.type.includes('Tertiary'); });
    var totalFootfall = outpatients.reduce(function(a, f) { return a + (f.dailyFootfall || 28); }, 0) || 56;
    return [
      '<div class="zch-kpi-grid">',
        kpiHtml('Outpatient Facilities', outpatients.length + ' Centers', '100% Operational', 'up', 'Global & Globa hubs', '🏨'),
        kpiHtml('Daily OPD Footfall', totalFootfall + ' Pets/day', '+12.4%', 'up', 'OPD walk-ins & slots', '👥'),
        kpiHtml('Average Consultation Time', '18 mins', 'Optimal SLA', 'up', 'Standard pacing met', '⏱️'),
        kpiHtml('Outpatient Revenue', '₹16.60 L', '+15.2%', 'up', 'Consult fees & treatments', '💰'),
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
            '<tbody>',
              outpatients.map(function (f) {
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
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 3: Hospitals ─────────────────────────────────────────── */
  function renderHospitals() {
    var tertiary = FACILITIES.filter(function (f) { return f.type.includes('Tertiary'); });
    return [
      '<div class="zch-kpi-grid">',
        kpiHtml('Tertiary Referral Hospitals', (tertiary.length || 1) + ' Center', 'Flagship Bengaluru', 'up', 'Full surgical suite', '🚨'),
        kpiHtml('Total Licensed Beds', '15 Beds', '100% Capacity', 'up', 'ICU & isolation pods', '🛏️'),
        kpiHtml('Modular Operating Theatres', '2 Modular OTs', 'Live Roster', 'up', 'Orthopedic & soft tissue', '🩺'),
        kpiHtml('Emergency Blood Bank', 'Active', 'Cross-match Ready', 'up', 'Canine & feline banked', '🩸'),
      '</div>',

      '<div class="zch-grid-2">',
        '<div class="zch-card">',
          '<div class="zch-card-head">',
            '<div><h3 class="zch-card-title">24x7 Tertiary Flagship Hospitals</h3><p class="zch-card-sub">Advanced diagnostic imaging (CT/MRI), blood banking, and multi-specialty surgery</p></div>',
          '</div>',
          '<div style="display:flex;flex-direction:column;gap:12px;">',
            (FACILITIES.filter(function (f) { return f.type.includes('Tertiary'); }).length === 0 ?
              '<div style="text-align:center;padding:28px;color:#94a3b8;">No hospital records found</div>' :
              FACILITIES.filter(function (f) { return f.type.includes('Tertiary'); }).map(function (h) {
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
              }).join('')),
          '</div>',
        '</div>',

        '<div class="zch-card">',
          '<div class="zch-card-head">',
            '<div><h3 class="zch-card-title">Live Surgical Theatre Schedule</h3><p class="zch-card-sub">Active and upcoming operations across tertiary facilities</p></div>',
            '<span class="zch-badge blue">OT ROSTER</span>',
          '</div>',
          '<div class="zch-table-wrap">',
            '<table class="zch-table">',
              '<thead><tr><th>Patient & Surgery</th><th>OT Suite</th><th>Surgeon</th><th>Anesthetist</th><th>Schedule</th></tr></thead>',
              '<tbody>' +
                '<tr>' +
                  '<td><b>Jimmy (German Shepherd)</b><br><span style="font-size:11px;color:#94a3b8;">Soft Tissue Wound Debridement & Closure</span></td>' +
                  '<td><span class="zch-badge blue">OT Suite 1 (Zenve Main)</span></td>' +
                  '<td style="color:#cbd5e1;font-weight:600;">Dr. Lakshmanan M</td>' +
                  '<td style="color:#94a3b8;">Dr. Vasanth</td>' +
                  '<td><span class="zch-badge green">Today 16:30 · Prepped</span></td>' +
                '</tr>' +
                '<tr>' +
                  '<td><b>Max (Golden Retriever)</b><br><span style="font-size:11px;color:#94a3b8;">Dental Prophylaxis & Deep Scaling</span></td>' +
                  '<td><span class="zch-badge blue">OT Suite 2 (Global Clinic)</span></td>' +
                  '<td style="color:#cbd5e1;font-weight:600;">Dr. Vasanth</td>' +
                  '<td style="color:#94a3b8;">Dr. Yuvaraj</td>' +
                  '<td><span class="zch-badge amber">Tomorrow 10:00 · Scheduled</span></td>' +
                '</tr>' +
              '</tbody>',
            '</table>',
          '</div>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 4: Clinic Performance ────────────────────────────────── */
  function renderPerformance() {
    return [
      '<div class="zch-kpi-grid">',
        kpiHtml('Surgical Success Rate', '99.4%', '+0.2%', 'up', 'NABH audit compliant', '🩺'),
        kpiHtml('Client CSAT Score', '4.94 / 5.0', '+0.12', 'up', 'Pet parent verified NPS', '⭐'),
        kpiHtml('Average Wait Time', '8 mins', '-2 mins', 'up', 'Strict appointment pacing', '⏱️'),
        kpiHtml('Clinical Audit Compliance', '100.0%', 'Optimal', 'up', 'VCI & NABH compliant', '📋'),
      '</div>',

      '<div class="zch-card">',
        '<div class="zch-card-head">',
          '<div><h3 class="zch-card-title">Network Facilities Performance Benchmarking</h3><p class="zch-card-sub">OPD throughput, surgical volume, bed turnaround, and patient experience ratings</p></div>',
          '<button class="zch-btn" onclick="alert(\'Exporting Clinical Quality Audit PDF report...\')">Download Quality Audit PDF</button>',
        '</div>',
        '<div class="zch-table-wrap">',
          '<table class="zch-table">',
            '<thead><tr><th>Facility</th><th>City</th><th>Monthly Surgeries</th><th>OPD Visits</th><th>Bed Turnaround</th><th>Infection Rate</th><th>Client CSAT</th><th>Performance Index</th></tr></thead>',
            '<tbody>',
              FACILITIES.map(function (f, i) {
                var surg = 45 - (i * 3);
                var opd = 520 - (i * 35);
                var turn = (1.8 + (i * 0.1)).toFixed(1) + ' days';
                var csat = (4.96 - (i * 0.02)).toFixed(2);
                return '<tr>' +
                  '<td><b>' + esc(f.name) + '</b></td>' +
                  '<td><span class="zch-badge blue">' + esc(f.city) + '</span></td>' +
                  '<td style="font-family:IBM Plex Mono,monospace;font-weight:600;">' + (surg > 10 ? surg : 12) + '</td>' +
                  '<td style="font-family:IBM Plex Mono,monospace;">' + opd + '</td>' +
                  '<td style="font-family:IBM Plex Mono,monospace;">' + turn + '</td>' +
                  '<td><span style="color:#10b981;font-weight:600;">0.0%</span></td>' +
                  '<td style="color:#fbbf24;font-weight:700;">' + csat + ' ★</td>' +
                  '<td><span class="zch-badge green">9' + (8 - i % 3) + '% Top Tier</span></td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 5: Clinic Revenue ────────────────────────────────────── */
  function renderRevenue() {
    return [
      '<div class="zch-kpi-grid">',
        kpiHtml('Total Network Revenue', '₹31.40 L', '+14.2%', 'up', 'Consults, meds & surgery', '💰'),
        kpiHtml('Surgeries & Procedures', '₹11.80 L', '+18.1%', 'up', 'Tertiary OT billings', '🩺'),
        kpiHtml('Outpatient Consultations', '₹9.40 L', '+9.4%', 'up', 'Daily OPD consultations', '👥'),
        kpiHtml('Diagnostic Imaging & Lab', '₹6.20 L', '+11.5%', 'up', 'Digital X-ray & lab panels', '🔬'),
        kpiHtml('Inpatient ICU & Wards', '₹4.00 L', '+16.0%', 'up', 'Critical telemetry & ICU', '🛏️'),
        kpiHtml('Avg Ticket Size / Pet', '₹2,850', '+5.8%', 'up', 'Comprehensive care bundle', '📈'),
      '</div>',

      '<div class="zch-grid-2">',
        '<div class="zch-card">',
          '<div class="zch-card-head">',
            '<div><h3 class="zch-card-title">Departmental Revenue Contribution</h3><p class="zch-card-sub">Clinical billing distribution across major practice streams</p></div>',
          '</div>',
          '<div style="display:flex;flex-direction:column;gap:14px;padding:8px 0;">' +
            '<div><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:6px;"><span>Surgeries & Operative Procedures (38%)</span><strong style="color:#10b981;">₹11.80 L</strong></div><div class="zch-progress-bar"><div class="zch-progress-fill" style="width:38%;background:#10b981;"></div></div></div>' +
            '<div><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:6px;"><span>Outpatient Consultations & OPD (30%)</span><strong style="color:#38bdf8;">₹9.40 L</strong></div><div class="zch-progress-bar"><div class="zch-progress-fill" style="width:30%;background:#38bdf8;"></div></div></div>' +
            '<div><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:6px;"><span>Diagnostic Imaging & Blood Panels (20%)</span><strong style="color:#c084fc;">₹6.20 L</strong></div><div class="zch-progress-bar"><div class="zch-progress-fill" style="width:20%;background:#c084fc;"></div></div></div>' +
            '<div><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:6px;"><span>Inpatient ICU & High-Dependency Beds (12%)</span><strong style="color:#fbbf24;">₹4.00 L</strong></div><div class="zch-progress-bar"><div class="zch-progress-fill" style="width:12%;background:#fbbf24;"></div></div></div>' +
          '</div>',
        '</div>',

        '<div class="zch-card">',
          '<div class="zch-card-head">',
            '<div><h3 class="zch-card-title">Facility Monthly Billing League</h3><p class="zch-card-sub">Top revenue centers across India clusters</p></div>',
          '</div>',
          '<div class="zch-table-wrap">',
            '<table class="zch-table">',
              '<thead><tr><th>Facility</th><th>City</th><th>Monthly Billings</th><th>Growth YoY</th></tr></thead>',
              '<tbody>',
                (FACILITIES.length === 0 ?
                  '<tr><td colspan="4" style="text-align:center;padding:28px;color:#94a3b8;">No facility revenue records found</td></tr>' :
                  FACILITIES.map(function (f) {
                    return '<tr>' +
                      '<td><b>' + esc(f.name) + '</b></td>' +
                      '<td><span class="zch-badge blue">' + esc(f.city) + '</span></td>' +
                      '<td style="font-family:IBM Plex Mono,monospace;font-weight:700;color:#10b981;">' + esc(f.rev) + '</td>' +
                      '<td><span style="color:#10b981;font-weight:600;">+14.2%</span></td>' +
                    '</tr>';
                  }).join('')),
              '</tbody>',
            '</table>',
          '</div>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 6: Clinic Orders ─────────────────────────────────────── */
  function renderOrders() {
    return [
      '<div class="zch-kpi-grid">',
        kpiHtml('Clinical PO Volume', '₹11,146', '+100% Settled', 'up', 'Prescription invoices paid', '📦'),
        kpiHtml('Critical Implants & Ortho', '14 Units', 'Optimal', 'up', 'Titanium plates & pins', '🔩'),
        kpiHtml('Medical Gases (O2 & N2O)', '100% Full', 'Cryo Monitored', 'up', 'Zero pressure drops', '💨'),
        kpiHtml('Pending Approvals', '0 POs', 'All Settled', 'up', 'Zero supply delay', '⏳'),
      '</div>',

      '<div class="zch-card">',
        '<div class="zch-card-head">',
          '<div><h3 class="zch-card-title">Clinical Supply Requisitions & Purchase Orders</h3><p class="zch-card-sub">Surgical implants, anesthesia supplies, diagnostic reagents, and surgical packs</p></div>',
          '<button class="zch-btn primary" onclick="ZenveClinicsDashboard.showNewOrderModal()">+ Create Requisition PO</button>',
        '</div>',
        '<div class="zch-table-wrap">',
          '<table class="zch-table">',
            '<thead><tr><th>PO Number</th><th>Target Facility</th><th>Clinical Item Description</th><th>Vendor / Supplier</th><th>Qty</th><th>Value</th><th>Priority</th><th>Status</th><th>Actions</th></tr></thead>',
            '<tbody>',
              CLINIC_ORDERS.map(function (o) {
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
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 7: Clinic Patients ───────────────────────────────────── */
  function renderPatients() {
    return [
      '<div class="zch-kpi-grid">',
        kpiHtml('Active Inpatients', INPATIENTS.length + ' Pets', 'Monitored', 'up', 'Jimmy & admitted cases', '🐾'),
        kpiHtml('Critical Care ICU', '1 Pet', 'High Dependency', 'up', 'Continuous telemetry', '❤️'),
        kpiHtml('Average Length of Stay', '1.8 Days', '-0.3 Days', 'up', 'Rapid clinical recovery', '📅'),
        kpiHtml('Discharges Planned Today', '1 Pet', 'On Schedule', 'up', 'Post-observation release', '🏠'),
      '</div>',

      '<div class="zch-card">',
        '<div class="zch-card-head">',
          '<div><h3 class="zch-card-title">Inpatient Ward Census & Telemetry Roster</h3><p class="zch-card-sub">Admitted pets, diagnosis, attending clinical lead, and real-time vital status</p></div>',
          '<button class="zch-btn primary" onclick="alert(\'Opening Inpatient Admission Form...\')">+ Admit Inpatient</button>',
        '</div>',
        '<div class="zch-table-wrap">',
          '<table class="zch-table">',
            '<thead><tr><th>Patient & Code</th><th>Pet Parent</th><th>Admission Date</th><th>Facility & Bed</th><th>Clinical Diagnosis</th><th>Attending Doctor</th><th>Current Vitals</th><th>Care Status</th><th>Discharge</th></tr></thead>',
            '<tbody>',
              INPATIENTS.map(function (p) {
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
              }).join(''),
            '</tbody>',
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
        kpiHtml('Registered Veterinary Doctors', (DOCTORS.length || 5) + ' Clinicians', '100% Active', 'up', 'All state board registered', '👨‍⚕️'),
        kpiHtml('Specialist Surgeons', '3 Surgeons', 'Ortho & Soft Tissue', 'up', 'Board certified', '🔪'),
        kpiHtml('Clinicians On-Duty Now', (DOCTORS.length || 5) + ' Vets', 'Active Shifts', 'up', 'Across all 3 facilities', '⚡'),
        kpiHtml('In Surgery Right Now', '1 Case', 'OT Suite 1', 'up', 'Dr. Lakshmanan attending', '🩺'),
        kpiHtml('Doctor Patient CSAT', '4.94 / 5.0', '+0.15', 'up', 'Verified pet parent ratings', '⭐'),
        kpiHtml('Monthly Consultations', '177 Consults', '+18.4%', 'up', 'OPD & emergency', '🐾'),
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
              filtered.length === 0
                ? '<tr><td colspan="10" style="text-align:center;padding:32px;color:#94a3b8;">No registered doctor records found</td></tr>'
                : filtered.map(function (d) {
                    var statusClass = d.status === 'On Duty' ? 'green' : d.status === 'In Surgery' ? 'red' : d.status === 'On Call' ? 'amber' : 'purple';
                    return '<tr>' +
                      '<td>' +
                        '<div style="display:flex;align-items:center;gap:10px;">' +
                          '<div style="width:32px;height:32px;border-radius:50%;background:rgba(59,130,246,0.15);border:1px solid rgba(59,130,246,0.3);color:#60a5fa;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:11px;">' + esc(d.name.split(' ').map(function(n){ return n[0]; }).join('').replace('D', '')) + '</div>' +
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
                      '<td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:600;">' + esc(d.consults) + '</td>' +
                      '<td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#10b981;">' + esc(d.surgeries) + '</td>' +
                      '<td style="text-align:right;color:#fbbf24;font-weight:700;">' + esc(d.csat) + '</td>' +
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
            '<span class="zch-badge green">ACTIVE ROSTER</span>',
          '</div>',
          '<div style="display:flex;flex-direction:column;gap:10px;">' +
            '<div style="background:#090e17;border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:12px;display:flex;justify-content:space-between;align-items:center;">' +
              '<div><b style="color:#fff;font-size:13px;">Dr. Lakshmanan M</b> <span style="font-size:11px;color:#38bdf8;">(Lead Trauma Surgeon)</span><div style="font-size:11px;color:#94a3b8;">Zenve Main Hospital · Mobile ALS Link</div></div>' +
              '<span class="zch-badge green">ON CALL 24x7</span>' +
            '</div>' +
            '<div style="background:#090e17;border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:12px;display:flex;justify-content:space-between;align-items:center;">' +
              '<div><b style="color:#fff;font-size:13px;">Dr. Vasanth</b> <span style="font-size:11px;color:#38bdf8;">(Critical Care Diagnostics)</span><div style="font-size:11px;color:#94a3b8;">Global Clinic · Rapid Diagnostics</div></div>' +
              '<span class="zch-badge blue">ON DUTY</span>' +
            '</div>' +
            '<div style="background:#090e17;border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:12px;display:flex;justify-content:space-between;align-items:center;">' +
              '<div><b style="color:#fff;font-size:13px;">Dr. Yuvaraj</b> <span style="font-size:11px;color:#38bdf8;">(Emergency ICU Fellow)</span><div style="font-size:11px;color:#94a3b8;">Zenve Main Hospital · Telemetry</div></div>' +
              '<span class="zch-badge green">ON CALL</span>' +
            '</div>' +
          '</div>',
        '</div>',

        '<div class="zch-card">',
          '<div class="zch-card-head">',
            '<div><h3 class="zch-card-title">📚 Continuing Veterinary Medical Education (CME)</h3><p class="zch-card-sub">Clinical accreditation status, surgical simulations, and peer case audits</p></div>',
            '<span class="zch-badge green">100% COMPLIANT</span>',
          '</div>',
          '<div style="display:flex;flex-direction:column;gap:12px;padding:4px 0;">',
            '<div>',
              '<div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:6px;"><span>Small Animal Arthroscopy & TPLO Hands-on</span><strong style="color:#38bdf8;">3/3 Surgeons Certified</strong></div>',
              '<div class="zch-progress-bar"><div class="zch-progress-fill" style="width:100%;background:#38bdf8;"></div></div>',
            '</div>',
            '<div>',
              '<div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:6px;"><span>Feline Friendly Clinical Handling Protocol</span><strong style="color:#34d399;">5/5 Clinicians Completed</strong></div>',
              '<div class="zch-progress-bar"><div class="zch-progress-fill" style="width:100%;background:#34d399;"></div></div>',
            '</div>',
            '<div>',
              '<div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:6px;"><span>Antimicrobial Stewardship & Infection Control</span><strong style="color:#c084fc;">Annual Audit Score: 99.4%</strong></div>',
              '<div class="zch-progress-bar"><div class="zch-progress-fill" style="width:99.4%;background:#c084fc;"></div></div>',
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
        kpiHtml('Total Partner Payouts', '₹68,970', '+100% Settled', 'up', 'Bi-weekly direct transfer', '🤝'),
        kpiHtml('Referral Cases Handled', '110 Cases', '+22.4%', 'up', 'From partner clinics', '🔄'),
        kpiHtml('Average Commission Rate', '22.0%', 'Standard Slab', 'up', 'Incentive agreement', '📊'),
        kpiHtml('Statutory TDS Deducted', '₹6,897', 'Sec 194J', 'up', 'Form 16A filed auto', '🏛️'),
      '</div>',

      '<div class="zch-card">',
        '<div class="zch-card-head">',
          '<div><h3 class="zch-card-title">B2B Clinic Referrals & Visiting Specialist Settlements</h3><p class="zch-card-sub">Transparent revenue sharing, patient referral volume, 10% TDS withholding, and disbursement status</p></div>',
          '<button class="zch-btn primary" onclick="alert(\'Bulk NEFT Bank Transfer initiated for approved commissions!\')">Process Approved Payouts</button>',
        '</div>',
        '<div class="zch-table-wrap">',
          '<table class="zch-table">',
            '<thead><tr><th>Settlement ID</th><th>Partner Clinic / Consultant</th><th>Affiliation Type</th><th>Cases Referred</th><th>Total Case Value</th><th>Comm %</th><th>Gross Comm</th><th>10% TDS</th><th>Net Payable</th><th>Status</th></tr></thead>',
            '<tbody>',
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
        kpiHtml('Active Network Facilities', FACILITIES.length + ' Centers', '100% Operational', 'up', 'Bengaluru Metro Hubs', '🌐'),
        kpiHtml('ALS Pet Ambulance Fleet', AMBULANCE_FLEET.length + ' Ambulances', '24x7 GPS Tracked', 'up', 'Rapid ALS dispatch', '🚑'),
        kpiHtml('Inter-Facility Transfers', '12 Transfers', 'Zero Delay', 'up', 'Safe critical transport', '🔄'),
        kpiHtml('Avg Emergency Transit Time', '14 Mins', '-4 Mins SLA', 'up', 'Emergency green corridor', '⏱️'),
        kpiHtml('Cloud Tele-PACS Sync', '100.0%', 'Sub-second', 'up', 'DICOM images real-time', '📶'),
        kpiHtml('Expansion Pipeline', '2 New Hubs', 'HSR & Indiranagar', 'up', 'Q4 2026 launch', '🏗️'),
      '</div>',

      '<div class="zch-grid-2">',
        '<div class="zch-card">',
          '<div class="zch-card-head">',
            '<div><h3 class="zch-card-title">Hub-and-Spoke Regional Corridors</h3><p class="zch-card-sub">Tertiary hubs anchor specialized neuro, ortho, and oncologic care</p></div>',
            '<span class="zch-badge green">100% TELEMED</span>',
          '</div>',
          '<div style="display:flex;flex-direction:column;gap:12px;">' +
            '<div style="background:#090e17;border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:12px;">' +
              '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;"><b style="color:#fff;font-size:13px;">🏢 Central Tertiary Hub: Zenve Main Hospital</b><span class="zch-badge green">Anchor Hub</span></div>' +
              '<div style="font-size:11px;color:#94a3b8;">High-dependency ICU, modular OTs, central blood bank, and 24x7 diagnostic pathology.</div>' +
            '</div>' +
            '<div style="background:#090e17;border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:12px;">' +
              '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;"><b style="color:#fff;font-size:13px;">🏥 Satellite Node: Global Clinic & Specialty Center</b><span class="zch-badge blue">Surgical Spoke</span></div>' +
              '<div style="font-size:11px;color:#94a3b8;">Dedicated outpatient daycare, orthopedics consults, and connected telemetry link to Central Hub.</div>' +
            '</div>' +
            '<div style="background:#090e17;border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:12px;">' +
              '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;"><b style="color:#fff;font-size:13px;">🏨 Satellite Node: Globa Pet Care Clinic</b><span class="zch-badge blue">Wellness Spoke</span></div>' +
              '<div style="font-size:11px;color:#94a3b8;">Preventive medicine, vaccinations, routine diagnostics, and direct ambulance referral corridor.</div>' +
            '</div>' +
          '</div>',
        '</div>',

        '<div class="zch-card">',
          '<div class="zch-card-head">',
            '<div><h3 class="zch-card-title">24x7 ALS Mobile ICU Pet Ambulances</h3><p class="zch-card-sub">GPS tracked veterinary emergency response units</p></div>',
            '<span class="zch-badge green">' + AMBULANCE_FLEET.length + ' UNITS LIVE</span>',
          '</div>',
          '<div style="display:flex;flex-direction:column;gap:10px;">',
            (AMBULANCE_FLEET.length ? AMBULANCE_FLEET.map(function (amb) {
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
            }).join('') : '<div style="text-align:center;padding:32px;color:#94a3b8;font-size:12px;">No active ambulance units</div>'),
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
            '<span class="zch-live-badge"><span class="zch-pulse-dot"></span> Active</span>',
          '</div>',
          '<p class="zch-sub">Veterinary Hospitals & Clinics Command Center</p>',
        '</div>',
        '<div class="zch-head-actions">',
          '<button class="zch-btn" onclick="alert(\'Refreshing live clinical census...\')">🔄 Refresh Vitals</button>',
          '<button class="zch-btn primary zch-context-action">+ Add Facility</button>',
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
    if (!d) return;
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

        FACILITIES.push({
          id: 'FAC-0' + (FACILITIES.length + 1),
          name: name,
          type: tier,
          city: city,
          beds: beds,
          ot: ot,
          rev: '₹1.50 L',
          status: 'Operational',
          lead: lead
        });

        document.getElementById('zch-clinic-modal').remove();
        render();
        alert('Facility ' + name + ' registered successfully in ' + city + '!');
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
    showDoctorBioModal: showDoctorBioModal
  };

  /* ── Boot ─────────────────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { build(); wireSidebar(); loadClinicsDataFromApi(); });
  } else {
    build();
    wireSidebar();
    loadClinicsDataFromApi();
  }

})();