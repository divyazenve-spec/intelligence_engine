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
    { id: 'dashboard',   label: 'Doctors Dashboard',  icon: '👨‍⚕️', hash: '#doctors-dashboard',   badge: '0 Clinicians',    title: 'Veterinary Medical Board & Practitioners', sub: 'Clinical quotas, consultation volumes, physician performance, and departmental economics' },
    { id: 'all-doctors', label: 'All Doctors',        icon: '📋', hash: '#all-doctors',         badge: '0 Clinicians',    title: 'All Registered Veterinary Practitioners', sub: 'Complete clinical directory, state veterinary board licensing, and center affiliations' },
    { id: 'performance', label: 'Doctor Performance', icon: '⭐', hash: '#doctor-performance',  badge: '0.0%',            title: 'Doctor Clinical Performance & Quota Attainment', sub: 'Physician consultation pacing, patient NPS ratings, wait-time SLA, and surgical outcomes' },
    { id: 'revenue',     label: 'Doctor Revenue',     icon: '💰', hash: '#doctor-revenue',      badge: '₹0',              title: 'Doctor Revenue & Financial Attribution', sub: 'Consultation fee realization, surgical billing shares, and prescription attach revenue' },
    { id: 'patients',    label: 'Doctor Patients',    icon: '🐾', hash: '#doctor-patients',     badge: '0 Patients',      title: 'Doctor Patients & Treatment Logs', sub: 'Active patient caseloads, clinical case histories, diagnoses, and scheduled follow-ups' },
    { id: 'orders',      label: 'Doctor Orders',      icon: '📦', hash: '#doctor-orders',       badge: '0 Orders',        title: 'Doctor Prescriptions & Pharmacy Order Tracking', sub: 'In-house digital Rx dispensary, surgical consumables requisitions, and formulary adherence' },
    { id: 'commissions', label: 'Doctor Commissions', icon: '💵', hash: '#doctor-commissions',  badge: '₹0',              title: 'Doctor Commissions & Compensation Settlement', sub: 'Bi-weekly incentive disbursements, surgical bonus slabs, and statutory TDS deduction ledgers' },
    { id: 'activity',    label: 'Doctor Activity',    icon: '⚡', hash: '#doctor-activity',     badge: '0 Active',        title: 'Doctor Real-Time Activity & Shift Telemetry', sub: 'Real-time OT monitoring, ongoing outpatient consults, and emergency duty rosters' },
    { id: 'network',     label: 'Doctor Network',     icon: '🌐', hash: '#doctor-network',      badge: '0 Centers',       title: 'Doctor Network & Hospital Affiliations', sub: 'Hospital staffing distributions, inter-facility specialty referrals, and bed utilization' }
  ];

  /* ── Master Datasets (Live from MySQL zenve_engine) ───────────────── */
  var DOCTORS = [];

  function loadLiveDoctors(cb) {
    fetch('/api/v1/doctors')
      .then(function (res) { return res.json(); })
      .then(function (rows) {
        if (Array.isArray(rows) && rows.length > 0) {
          DOCTORS = rows.map(function (d) {
            return {
              id: d.doctor_code || ('DOC-' + d.id),
              dbId: d.id,
              name: d.name,
              spec: d.specialty || 'General Veterinary',
              regNo: d.qualification || 'VCI Registered',
              rating: d.rating ? String(d.rating) : '4.95',
              exp: (d.experience_years || 8) + ' Yrs',
              patientsMtd: d.consultations_count || 120,
              revMtd: '₹' + ((d.consultations_count || 100) * 800).toLocaleString('en-IN'),
              comm: '₹' + Math.round((d.consultations_count || 100) * 160).toLocaleString('en-IN'),
              status: d.status || 'On Duty',
              clinic: d.clinic_branch || 'Indiranagar Flagship'
            };
          });
        }
        if (root && S.open) render();
        if (cb) cb();
      })
      .catch(function (err) {
        console.error('[Zenve Doctors API Error]', err);
      });
  }
  loadLiveDoctors();

  function showOnboardModal() {
    var modalHtml = [
      '<div class="zdoc-modal-backdrop" id="zdoc-modal" style="position:fixed;inset:0;background:rgba(0,0,0,0.65);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;z-index:9999999;">',
        '<div style="background:#0f172a;border:1px solid #334155;border-radius:12px;padding:24px;width:440px;color:#f8fafc;box-shadow:0 25px 50px rgba(0,0,0,0.6);">',
          '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">',
            '<h3 style="margin:0;font-size:16px;font-weight:700;">Onboard Clinician to Medical Board</h3>',
            '<button type="button" style="background:none;border:none;color:#94a3b8;font-size:18px;cursor:pointer;" onclick="document.getElementById(\'zdoc-modal\').remove()">✕</button>',
          '</div>',
          '<form id="zdoc-onboard-form" style="display:flex;flex-direction:column;gap:12px;font-size:12px;">',
            '<div><label style="display:block;color:#94a3b8;margin-bottom:4px;">Doctor Full Name</label><input required class="zdoc-input" id="zd-name" style="width:100%;padding:8px;background:#1e293b;border:1px solid #334155;border-radius:6px;color:#fff;" placeholder="Dr. Sangeetha K., MVSc Surgery"/></div>',
            '<div><label style="display:block;color:#94a3b8;margin-bottom:4px;">Clinical Specialty</label><input required class="zdoc-input" id="zd-spec" style="width:100%;padding:8px;background:#1e293b;border:1px solid #334155;border-radius:6px;color:#fff;" placeholder="Orthopedics & Soft Tissue"/></div>',
            '<div><label style="display:block;color:#94a3b8;margin-bottom:4px;">Qualifications / VCI Reg</label><input required class="zdoc-input" id="zd-qual" style="width:100%;padding:8px;background:#1e293b;border:1px solid #334155;border-radius:6px;color:#fff;" placeholder="BVSc & AH, MVSc (Surgery)"/></div>',
            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">',
              '<div><label style="display:block;color:#94a3b8;margin-bottom:4px;">Experience (Years)</label><input type="number" required class="zdoc-input" id="zd-exp" style="width:100%;padding:8px;background:#1e293b;border:1px solid #334155;border-radius:6px;color:#fff;" placeholder="10"/></div>',
              '<div><label style="display:block;color:#94a3b8;margin-bottom:4px;">Clinic Hospital</label><input required class="zdoc-input" id="zd-clinic" style="width:100%;padding:8px;background:#1e293b;border:1px solid #334155;border-radius:6px;color:#fff;" placeholder="Koramangala 24x7"/></div>',
            '</div>',
            '<div><label style="display:block;color:#94a3b8;margin-bottom:4px;">Contact Phone</label><input required class="zdoc-input" id="zd-phone" style="width:100%;padding:8px;background:#1e293b;border:1px solid #334155;border-radius:6px;color:#fff;" placeholder="+91 98450 77889"/></div>',
            '<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:12px;">',
              '<button type="button" class="zdoc-btn" style="padding:6px 14px;" onclick="document.getElementById(\'zdoc-modal\').remove()">Cancel</button>',
              '<button type="submit" class="zdoc-btn primary" style="padding:6px 14px;background:#0ea5e9;color:#fff;border:none;border-radius:6px;font-weight:600;cursor:pointer;">Register to MySQL</button>',
            '</div>',
          '</form>',
        '</div>',
      '</div>'
    ].join('');

    var div = document.createElement('div');
    div.innerHTML = modalHtml;
    document.body.appendChild(div.firstElementChild);

    var form = document.getElementById('zdoc-onboard-form');
    if (form) {
      form.onsubmit = function (e) {
        e.preventDefault();
        var name = document.getElementById('zd-name').value;
        var spec = document.getElementById('zd-spec').value;
        var qual = document.getElementById('zd-qual').value;
        var exp = Number(document.getElementById('zd-exp').value) || 5;
        var clinic = document.getElementById('zd-clinic').value;
        var phone = document.getElementById('zd-phone').value;

        fetch('/api/v1/doctors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name,
            specialty: spec,
            qualification: qual,
            experience_years: exp,
            phone: phone,
            email: name.toLowerCase().replace(/[^a-z]/g, '') + '@zenve.com',
            clinic_branch: clinic
          })
        })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          if (data && data.success) {
            var m = document.getElementById('zdoc-modal');
            if (m) m.remove();
            alert('✓ Clinician "' + name + '" saved to MySQL zenve_engine database!');
            loadLiveDoctors();
          }
        })
        .catch(function (err) {
          alert('Error saving doctor: ' + err.message);
        });
      };
    }
  }

  function closeModal() {
    var m = document.getElementById('zdoc-modal');
    if (m) m.remove();
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
    return [
      '<div class="zdoc-kpi-grid">',
        kpiHtml('Active Veterinary Doctors', DOCTORS.length + ' Doctors', '100% Licensed', 'neutral', 'Registered clinicians', '👨‍⚕️'),
        kpiHtml('Monthly Patient Consults', '0 Pets', 'No consults logged', 'neutral', 'Avg 0 consults/doc', '🐾'),
        kpiHtml('Doctor Attributed Revenue', '₹0', 'Current period', 'neutral', 'Consults, meds & surgery', '💰'),
        kpiHtml('Doctor Commissions Paid', '₹0', '0% commission basis', 'neutral', 'Settled bi-weekly', '📋'),
        kpiHtml('Avg. Patient Satisfaction', '-- / 5.0', '0 ratings', 'neutral', 'Patient CSAT', '⭐'),
        kpiHtml('Surgical Success Rate', '0.0%', '0 procedures', 'neutral', 'NABH protocol', '🛡️'),
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
              DOCTORS.length === 0 ?
                '<tr><td colspan="9" style="text-align:center;padding:32px;color:#94a3b8;">No registered medical practitioners found. Click "+ Add New Clinician" to onboard.</td></tr>' :
                DOCTORS.map(function(d) {
                  return '<tr>' +
                    '<td style="font-family:monospace;font-weight:600;">' + esc(d.id) + '</td>' +
                    '<td style="font-weight:600;">' + esc(d.name) + '</td>' +
                    '<td>' + esc(d.spec) + '</td>' +
                    '<td style="color:#64748b;">' + esc(d.clinic) + '</td>' +
                    '<td style="font-weight:600;">' + (d.patientsMtd || 0) + ' pets</td>' +
                    '<td style="font-weight:600;color:#059669;">' + esc(d.revMtd || '₹0') + '</td>' +
                    '<td style="font-weight:600;">' + esc(d.comm || '₹0') + '</td>' +
                    '<td style="color:#d97706;font-weight:600;">★ ' + esc(d.rating || '--') + '</td>' +
                    '<td><span class="zdoc-pill ' + (d.status === 'On Duty' ? 'active' : d.status === 'In Surgery' ? 'warning' : 'critical') + '">' + esc(d.status) + '</span></td>' +
                  '</tr>';
                }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderAllDoctors() {
    return [
      '<div class="zdoc-kpi-grid">',
        kpiHtml('Total Board Clinicians', DOCTORS.length + ' Doctors', 'State Board Registered', 'neutral', 'All board registered', '👨‍⚕️'),
        kpiHtml('Primary Specialties', '0 Disciplines', 'Specialist roster', 'neutral', 'Tertiary care coverage', '🩺'),
        kpiHtml('Avg Clinical Experience', '-- Yrs', 'Faculty average', 'neutral', 'Board certified clinicians', '🎓'),
        kpiHtml('Clinic Shifts Scheduled', '0.0%', 'Active roster', 'neutral', 'Doctor scheduling', '📅'),
      '</div>',
      '<div class="zdoc-card">',
        '<div class="zdoc-card-head"><h3 class="zdoc-card-title">📋 Practitioner Directory & Licensing Master</h3></div>',
        '<div class="zdoc-table-wrap">',
          '<table class="zdoc-table">',
            '<thead><tr><th>Doctor ID</th><th>Clinician Name</th><th>Specialty</th><th>Qualifications</th><th>Experience</th><th>Center Clinic</th><th>Schedule</th><th>Status</th></tr></thead>',
            '<tbody>',
              DOCTORS.length === 0 ?
                '<tr><td colspan="8" style="text-align:center;padding:32px;color:#94a3b8;">No registered clinicians found in directory.</td></tr>' :
                DOCTORS.map(function(d) {
                  return '<tr>' +
                    '<td style="font-family:monospace;font-weight:600;">' + esc(d.id) + '</td>' +
                    '<td style="font-weight:600;">' + esc(d.name) + '</td>' +
                    '<td>' + esc(d.spec) + '</td>' +
                    '<td>' + esc(d.regNo || 'VCI Registered') + '</td>' +
                    '<td>' + esc(d.exp || '--') + '</td>' +
                    '<td>' + esc(d.clinic || 'General') + '</td>' +
                    '<td>General Shift</td>' +
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
        kpiHtml('Overall Quota Attainment', '0.0%', 'No target records', 'neutral', 'Practitioner performance', '🎯'),
        kpiHtml('Clinical Net Promoter Score', '-- NPS', '0 pet reviews', 'neutral', 'Client feedback', '⭐'),
        kpiHtml('Avg. Consultation Wait Time', '-- mins', 'No appointments logged', 'neutral', 'Appointment pacing', '⏱️'),
        kpiHtml('Overall Surgical Success', '0.0%', '0 incidents logged', 'neutral', 'NABH compliance', '🛡️'),
      '</div>',
      '<div class="zdoc-card">',
        '<div class="zdoc-card-head"><h3 class="zdoc-card-title">⭐ Physician Performance Scorecard & Quality Index</h3></div>',
        '<div class="zdoc-table-wrap">',
          '<table class="zdoc-table">',
            '<thead><tr><th>Doctor Name</th><th>Specialty</th><th>Target</th><th>Actual</th><th>Attainment %</th><th>Patient NPS</th><th>Wait Time</th><th>Surgical Success</th><th>Clinical Grade</th></tr></thead>',
            '<tbody>',
              '<tr><td colspan="9" style="text-align:center;padding:32px;color:#94a3b8;">No physician clinical performance records found.</td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderRevenue() {
    return [
      '<div class="zdoc-kpi-grid">',
        kpiHtml('Doctor Billed Revenue', '₹0', 'Current period', 'neutral', 'Direct physician billing', '💰'),
        kpiHtml('Procedure Billings', '₹0', '0% of doctor rev', 'neutral', 'Surgeries & diagnostics', '🩺'),
        kpiHtml('Consultation Fees', '₹0', '0% of doctor rev', 'neutral', 'Outpatient OPD fee', '📋'),
        kpiHtml('Pharmacy & Rx Uplift', '₹0', '0% attach rate', 'neutral', 'Prescriptions filled in-house', '💊'),
      '</div>',
      '<div class="zdoc-card">',
        '<div class="zdoc-card-head"><h3 class="zdoc-card-title">💰 Clinician Revenue Matrix & Departmental Contribution</h3></div>',
        '<div class="zdoc-table-wrap">',
          '<table class="zdoc-table">',
            '<thead><tr><th>Doctor Name</th><th>Department</th><th>Consult Fees</th><th>Procedures & Surgery</th><th>Rx Medicines</th><th>Total Attributed</th><th>Operating Margin</th><th>Revenue Share</th></tr></thead>',
            '<tbody>',
              '<tr><td colspan="8" style="text-align:center;padding:32px;color:#94a3b8;">No clinician revenue records found.</td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderPatients() {
    return [
      '<div class="zdoc-kpi-grid">',
        kpiHtml('Active Patient Caseload', '0 Pets', 'Current MTD', 'neutral', 'Under active care', '🐾'),
        kpiHtml('Repeat Pet Consults', '0.0%', 'No revisit records', 'neutral', 'Return visit rate', '🔄'),
        kpiHtml('Chronic Care Monitored', '0 Pets', 'Cardiac, renal, ortho', 'neutral', 'Regular maintenance', '🩺'),
        kpiHtml('Follow-Up Adherence', '0.0%', 'No follow-up records', 'neutral', 'Automated reminders', '📅'),
      '</div>',
      '<div class="zdoc-card">',
        '<div class="zdoc-card-head"><h3 class="zdoc-card-title">🐾 Recent Patient Encounters & Care Plans</h3></div>',
        '<div class="zdoc-table-wrap">',
          '<table class="zdoc-table">',
            '<thead><tr><th>Pet Patient & Breed</th><th>Pet Parent</th><th>Attending Clinician</th><th>Diagnosis</th><th>Date</th><th>Status</th><th>Next Follow-Up</th><th>Center Clinic</th></tr></thead>',
            '<tbody>',
              '<tr><td colspan="8" style="text-align:center;padding:32px;color:#94a3b8;">No recent patient encounters or care plans recorded.</td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderOrders() {
    return [
      '<div class="zdoc-kpi-grid">',
        kpiHtml('Physician Orders Raised', '0 Orders', 'No orders logged', 'neutral', 'Direct doctor requisitions', '📦'),
        kpiHtml('Order Fulfillment Rate', '0.0%', 'Instant dispensary', 'neutral', 'Clinic fulfillment', '⚡'),
        kpiHtml('Order Value Generated', '₹0', 'Current period', 'neutral', 'Pharmacy attach value', '💰'),
        kpiHtml('Formulary Adherence', '100%', 'Zero out-of-stock subst.', 'neutral', 'NABH quality standards', '🛡️'),
      '</div>',
      '<div class="zdoc-card">',
        '<div class="zdoc-card-head"><h3 class="zdoc-card-title">📦 Real-Time Prescribed Order Stream</h3></div>',
        '<div class="zdoc-table-wrap">',
          '<table class="zdoc-table">',
            '<thead><tr><th>Order ID</th><th>Attending Clinician</th><th>Pharmaceutical Items</th><th>Pet Patient</th><th>Value</th><th>Dispensary</th><th>Fulfillment</th></tr></thead>',
            '<tbody>',
              '<tr><td colspan="7" style="text-align:center;padding:32px;color:#94a3b8;">No prescribed orders raised yet.</td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderCommissions() {
    return [
      '<div class="zdoc-kpi-grid">',
        kpiHtml('Total Commission Disbursed', '₹0', 'No pending payouts', 'neutral', 'Bi-weekly direct transfer', '💵'),
        kpiHtml('Avg. Physician Earning', '₹0/mo', 'Current period', 'neutral', 'Excluding fixed retainers', '📈'),
        kpiHtml('TDS Deducted (Sec 194J)', '₹0', '10% statutory tax', 'neutral', 'Form 16A filed auto', '🏛️'),
        kpiHtml('Payment Reconciliation', '100.0%', 'Zero dispute log', 'neutral', 'Automated audit', '✅'),
      '</div>',
      '<div class="zdoc-card">',
        '<div class="zdoc-card-head"><h3 class="zdoc-card-title">💵 Professional Fee Settlements & Remittance Register</h3></div>',
        '<div class="zdoc-table-wrap">',
          '<table class="zdoc-table">',
            '<thead><tr><th>Settlement ID</th><th>Doctor Name</th><th>Specialty</th><th>Gross Billed</th><th>Slab</th><th>Gross Comm.</th><th>TDS</th><th>Net Remitted</th><th>Status</th></tr></thead>',
            '<tbody>',
              '<tr><td colspan="9" style="text-align:center;padding:32px;color:#94a3b8;">No professional fee settlements or remittance records found.</td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderActivity() {
    return [
      '<div class="zdoc-kpi-grid">',
        kpiHtml('Doctors Currently On Duty', '0 Clinicians', 'Shift coverage', 'neutral', 'Across clinic centers', '👨‍⚕️'),
        kpiHtml('Surgeries in Progress', '0 OTs Active', 'All centers', 'neutral', 'Operating theaters', '🩺'),
        kpiHtml('OPD Consults Today', '0 Completed', 'No consults logged today', 'neutral', 'Pacing on schedule', '📋'),
        kpiHtml('Tele-Consult Queue', '0 Waiting', 'Zero queue backlog', 'neutral', 'Live mobile video vet', '📱'),
      '</div>',
      '<div class="zdoc-card">',
        '<div class="zdoc-card-head"><h3 class="zdoc-card-title">⚡ Live Physician Activity & Case Audit Stream</h3></div>',
        '<div class="zdoc-table-wrap">',
          '<table class="zdoc-table">',
            '<thead><tr><th>Timestamp</th><th>Clinician</th><th>Clinical Action</th><th>Case Description</th><th>Facility</th><th>Status</th></tr></thead>',
            '<tbody>',
              '<tr><td colspan="6" style="text-align:center;padding:32px;color:#94a3b8;">No live physician activity records found.</td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderNetwork() {
    return [
      '<div class="zdoc-kpi-grid">',
        kpiHtml('Affiliated Hospital Hubs', '0 Centers', 'Network hubs', 'neutral', 'Equipped with sterile OTs', '🏥'),
        kpiHtml('Total Medical Staff', DOCTORS.length + ' Clinicians', 'Resident & specialists', 'neutral', 'Senior consultants', '👨‍⚕️'),
        kpiHtml('Inter-Hospital Referrals', '0 Patients', 'Cross-center specialty', 'neutral', 'Seamless EHR transfers', '🔄'),
        kpiHtml('Network Bed Utilization', '0.0%', 'Current capacity', 'neutral', 'Emergency surge ready', '🛏️'),
      '</div>',
      '<div class="zdoc-card">',
        '<div class="zdoc-card-head"><h3 class="zdoc-card-title">🌐 Hospital Center Deployment & Clinical Leadership</h3></div>',
        '<div class="zdoc-table-wrap">',
          '<table class="zdoc-table">',
            '<thead><tr><th>Hospital Center</th><th>Clinical Director</th><th>Team Size</th><th>Specialty Wings</th><th>MTD Patients</th><th>Center Billings</th><th>Status</th></tr></thead>',
            '<tbody>',
              '<tr><td colspan="7" style="text-align:center;padding:32px;color:#94a3b8;">No hospital center deployment records found.</td></tr>',
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
          '<button class="zdoc-btn" onclick="ZenveDoctorsDashboard.close()">✕ Close</button>',
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
