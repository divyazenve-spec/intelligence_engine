/* =====================================================================
   Zenve BI — Onboarding Dashboard
   Sidebar Subcategory: Employees & HR > Onboarding
   ===================================================================== */
(function () {
  'use strict';

  var root = null;
  var isOpen = false;

  var recruits = [
    { name: 'Dr. Aakash Roy', role: 'Veterinary Radiologist', dept: 'Clinical', date: '01 Oct 2026', buddy: 'Dr. Priya Sharma', bvg: 'Verified ✅', hardware: 'MacBook Pro', license: 'Verified (VCI)', pct: 85, status: 'In Progress' },
    { name: 'Sneha Chawla', role: 'Senior React / AI Eng', dept: 'Technology', date: '28 Sep 2026', buddy: 'Sameer Kulkarni', bvg: 'Verified ✅', hardware: 'Laptop & Keys', license: 'N/A', pct: 92, status: 'Near Complete' },
    { name: 'Manish Rawat', role: 'Fleet Lead Rider', dept: 'Logistics', date: '25 Sep 2026', buddy: 'Vikram Joshi', bvg: 'Verified ✅', hardware: 'POS & Kit', license: 'DL Verified', pct: 100, status: 'Completed' },
    { name: 'Divya Sundaram', role: 'Clinical Pharmacist', dept: 'Pharmacy', date: '22 Sep 2026', buddy: 'Rohan Deshmukh', bvg: 'Verified ✅', hardware: 'ERP Creds', license: 'Pharmacy Reg', pct: 100, status: 'Completed' },
    { name: 'Kunal Sen', role: 'Inventory Controller', dept: 'Warehouse', date: '18 Sep 2026', buddy: 'Ananya Verma', bvg: 'Verified ✅', hardware: 'Scanner & ID', license: 'N/A', pct: 100, status: 'Completed' },
    { name: 'Tanya Bhalla', role: 'Tele-Support Specialist', dept: 'Customer Delight', date: '05 Oct 2026', buddy: 'Pooja Hegde', bvg: 'In Progress ⏳', hardware: 'Headset & CRM', license: 'N/A', pct: 45, status: 'Day 1 Roster' }
  ];

  function closeOthers() {
    document.querySelectorAll('.zpanel-root').forEach(function (el) {
      el.classList.remove('zpanel-open');
    });
  }

  function render() {
    if (!root) return;
    var rows = recruits.map(function (r) {
      var isDone = r.pct === 100;
      return [
        '<tr>',
        '  <td><div style="font-weight:600;color:#f8fafc;">' + r.name + '</div><div style="font-size:11px;color:#94a3b8;">' + r.role + ' · ' + r.dept + '</div></td>',
        '  <td style="font-family:monospace;">' + r.date + '</td>',
        '  <td style="color:#93c5fd;">🤝 ' + r.buddy + '</td>',
        '  <td style="color:#cbd5e1;">' + r.hardware + '</td>',
        '  <td style="color:' + (r.bvg.indexOf('Verified') >= 0 ? '#34d399' : '#f59e0b') + ';font-weight:600;">' + r.bvg + '</td>',
        '  <td>',
        '    <div style="display:flex;align-items:center;gap:8px;">',
        '      <div style="width:70px;height:6px;background:rgba(255,255,255,0.08);border-radius:99px;overflow:hidden;"><div style="width:' + r.pct + '%;height:100%;background:' + (isDone ? '#10b981' : '#38bdf8') + ';"></div></div>',
        '      <span style="font-family:monospace;font-weight:700;color:' + (isDone ? '#10b981' : '#38bdf8') + ';">' + r.pct + '%</span>',
        '    </div>',
        '  </td>',
        '  <td style="text-align:right;"><span class="zhr-badge ' + (isDone ? 'zhr-badge-success' : 'zhr-badge-info') + '">● ' + r.status + '</span></td>',
        '</tr>'
      ].join('');
    }).join('');

    root.innerHTML = [
      '<div class="zhr-head">',
      '  <div class="zhr-head-left">',
      '    <h1 class="zhr-title"><span>🐣</span> New Hire Onboarding & Day-1 Readiness</h1>',
      '    <div class="zhr-sub">Recruit integration journeys, hardware provisioning, background checks, medical council verification, and buddy assignments</div>',
      '  </div>',
      '  <div style="display:flex;align-items:center;gap:10px;">',
      '    <span class="zhr-badge zhr-badge-success">● 94% SLA Adherence</span>',
      '    <button class="zhr-btn" id="zhr-close-btn">✕ Close</button>',
      '  </div>',
      '</div>',
      '<div class="zhr-body">',
      '  <div class="zhr-kpi-grid">',
      '    <div class="zhr-card"><div class="zhr-card-label">Active Cohort</div><div class="zhr-card-value">6 Personnel</div><div class="zhr-card-sub">Joined in 30 days</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Day-1 Readiness</div><div class="zhr-card-value">98.5%</div><div class="zhr-card-sub" style="color:#34d399;">Hardware & logins active</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Background Checks</div><div class="zhr-card-value">100% Clear</div><div class="zhr-card-sub">Zero adverse flags</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Buddy Allocation</div><div class="zhr-card-value">100%</div><div class="zhr-card-sub" style="color:#34d399;">Senior mentor assigned</div></div>',
      '  </div>',
      '  <div class="zhr-table-container">',
      '    <div class="zhr-table-head">',
      '      <h3 style="margin:0;font-size:14px;font-weight:700;">Onboarding Cohort Progress</h3>',
      '      <span style="font-size:11px;color:#94a3b8;">Automated HRIS milestone triggers</span>',
      '    </div>',
      '    <table class="zhr-table">',
      '      <thead><tr><th>New Team Member</th><th>Joined Date</th><th>Buddy</th><th>Hardware Issued</th><th>BGV Status</th><th>Readiness</th><th style="text-align:right;">Status</th></tr></thead>',
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
    window.location.hash = '#onboarding';
  }

  function close() {
    if (root) root.classList.remove('zpanel-open');
    isOpen = false;
    if (window.location.hash === '#onboarding') {
      history.replaceState(null, document.title, window.location.pathname + window.location.search);
    }
  }

  function init() {
    root = document.getElementById('zhr-onboarding-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'zhr-onboarding-root';
      root.className = 'zpanel-root zhr-root';
      document.body.appendChild(root);
    }
  }

  window.ZenveOnboarding = { open: open, close: close };

  document.addEventListener('click', function (e) {
    var it = e.target.closest('button, a, li');
    if (it && it.textContent && it.textContent.trim().toLowerCase() === 'onboarding') {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      open();
    }
  }, true);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      init();
      if (window.location.hash === '#onboarding') setTimeout(open, 150);
    });
  } else {
    init();
    if (window.location.hash === '#onboarding') setTimeout(open, 150);
  }
})();

