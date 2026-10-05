/* =====================================================================
   Zenve BI — Recruitment Dashboard
   Sidebar Subcategory: Employees & HR > Recruitment
   ===================================================================== */
(function () {
  'use strict';

  var root = null;
  var isOpen = false;

  var jobs = [
    { id: 'REQ-101', title: 'Emergency Veterinary Surgeon', dept: 'Clinical', loc: 'Bengaluru Flagship', openings: 2, applicants: 48, screened: 14, interview: 4, offer: 1, priority: 'Urgent', recruiter: 'Divya S.' },
    { id: 'REQ-102', title: 'Staff Veterinarian (Outpatient)', dept: 'Clinical', loc: 'Mumbai Bandra', openings: 3, applicants: 62, screened: 18, interview: 6, offer: 2, priority: 'High', recruiter: 'Divya S.' },
    { id: 'REQ-103', title: 'Registered Clinical Pharmacist', dept: 'Pharmacy', loc: 'Bengaluru Hub', openings: 3, applicants: 54, screened: 12, interview: 5, offer: 1, priority: 'High', recruiter: 'Ankit P.' },
    { id: 'REQ-104', title: 'Senior AI / ML Research Engineer', dept: 'Technology', loc: 'Bengaluru / Remote', openings: 2, applicants: 85, screened: 16, interview: 4, offer: 1, priority: 'Urgent', recruiter: 'Ankit P.' },
    { id: 'REQ-105', title: 'Hyperlocal Fleet Riders', dept: 'Logistics', loc: 'Mumbai & NCR', openings: 12, applicants: 142, screened: 45, interview: 22, offer: 8, priority: 'Normal', recruiter: 'Meera R.' },
    { id: 'REQ-106', title: 'Warehouse Inventory Auditor', dept: 'Warehouse', loc: 'Bhiwandi Central', openings: 2, applicants: 29, screened: 8, interview: 3, offer: 0, priority: 'Normal', recruiter: 'Meera R.' }
  ];

  function closeOthers() {
    document.querySelectorAll('.zpanel-root').forEach(function (el) {
      el.classList.remove('zpanel-open');
    });
  }

  function render() {
    if (!root) return;
    var rows = jobs.map(function (j) {
      var badgeClass = j.priority === 'Urgent' ? 'zhr-badge-danger' : j.priority === 'High' ? 'zhr-badge-warning' : 'zhr-badge-info';
      return [
        '<tr>',
        '  <td><div style="font-weight:600;color:#f8fafc;">' + j.title + '</div><div style="font-size:11px;font-family:monospace;color:#94a3b8;">' + j.id + ' · Lead: ' + j.recruiter + '</div></td>',
        '  <td><span class="zhr-badge zhr-badge-info">' + j.dept + '</span></td>',
        '  <td>' + j.loc + '</td>',
        '  <td style="font-family:monospace;font-weight:600;">' + j.openings + '</td>',
        '  <td style="font-family:monospace;color:#38bdf8;">' + j.applicants + '</td>',
        '  <td style="font-family:monospace;color:#cbd5e1;">' + j.screened + '</td>',
        '  <td style="font-family:monospace;color:#f59e0b;">' + j.interview + '</td>',
        '  <td style="font-family:monospace;font-weight:700;color:#34d399;">' + j.offer + '</td>',
        '  <td style="text-align:right;"><span class="zhr-badge ' + badgeClass + '">● ' + j.priority + '</span></td>',
        '</tr>'
      ].join('');
    }).join('');

    root.innerHTML = [
      '<div class="zhr-head">',
      '  <div class="zhr-head-left">',
      '    <h1 class="zhr-title"><span>📢</span> Talent Acquisition & Pipeline Governance</h1>',
      '    <div class="zhr-sub">Open requisitions, applicant funnel progression, interview scheduling, offer letters, and time-to-hire telemetry</div>',
      '  </div>',
      '  <div style="display:flex;align-items:center;gap:10px;">',
      '    <button class="zhr-btn zhr-btn-primary" onclick="alert(\'Post New Requisition dialog initiated.\');">➕ Post Requisition</button>',
      '    <button class="zhr-btn" id="zhr-close-btn">✕ Close</button>',
      '  </div>',
      '</div>',
      '<div class="zhr-body">',
      '  <div class="zhr-kpi-grid">',
      '    <div class="zhr-card"><div class="zhr-card-label">Open Requisitions</div><div class="zhr-card-value">24 Vacancies</div><div class="zhr-card-sub">Across 6 roles</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Applicant Funnel</div><div class="zhr-card-value">420 Resumes</div><div class="zhr-card-sub" style="color:#34d399;">+64 this week</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Interviews in Flight</div><div class="zhr-card-value">44 Candidates</div><div class="zhr-card-sub">Technical & culture</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Avg Time-to-Hire</div><div class="zhr-card-value">18.4 Days</div><div class="zhr-card-sub" style="color:#34d399;">-3.2 days vs avg</div></div>',
      '  </div>',
      '  <div class="zhr-table-container">',
      '    <div class="zhr-table-head">',
      '      <h3 style="margin:0;font-size:14px;font-weight:700;">Requisition Sourcing Funnel</h3>',
      '      <span style="font-size:11px;color:#94a3b8;">Active pipeline tracking</span>',
      '    </div>',
      '    <table class="zhr-table">',
      '      <thead><tr><th>Requisition & Role</th><th>Department</th><th>Location</th><th>Vacancies</th><th>Applicants</th><th>Screened</th><th>Interview</th><th>Offers</th><th style="text-align:right;">Priority</th></tr></thead>',
      '      <tbody>' + rows + '</tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');

    var closeBtn = root.querySelector('#zhr-close-btn');
    if (closeBtn) closeBtn.onclick = close;
  }

  function open() {
    closeOthers();
    init();
    render();
    root.classList.add('zpanel-open');
    isOpen = true;
    window.location.hash = '#recruitment';
  }

  function close() {
    if (root) root.classList.remove('zpanel-open');
    isOpen = false;
    if (window.location.hash === '#recruitment') {
      history.replaceState(null, document.title, window.location.pathname + window.location.search);
    }
  }

  function init() {
    root = document.getElementById('zhr-recruitment-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'zhr-recruitment-root';
      root.className = 'zpanel-root zhr-root';
      document.body.appendChild(root);
    }
  }

  window.ZenveRecruitment = { open: open, close: close };

  document.addEventListener('click', function (e) {
    var it = e.target.closest('button, a, li');
    if (it && it.textContent && it.textContent.trim().toLowerCase() === 'recruitment') {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      open();
    }
  }, true);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      init();
      if (window.location.hash === '#recruitment') setTimeout(open, 150);
    });
  } else {
    init();
    if (window.location.hash === '#recruitment') setTimeout(open, 150);
  }
})();

