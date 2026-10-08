/* =====================================================================
   Zenve BI — Departments Dashboard
   Sidebar Subcategory: Employees & HR > Departments
   ===================================================================== */
(function () {
  'use strict';

  var root = null;
  var isOpen = false;

  var departments = [];

  function closeOthers() {
    document.querySelectorAll('.zpanel-root').forEach(function (el) {
      el.classList.remove('zpanel-open');
    });
  }

  function render() {
    if (!root) return;
    var cards = departments.map(function (d) {
      return [
        '<div class="zhr-card" style="display:flex;flex-direction:column;justify-content:space-between;">',
        '  <div>',
        '    <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px;">',
        '      <div>',
        '        <span style="font-size:10px;font-family:monospace;color:' + d.color + ';font-weight:700;">' + d.id + '</span>',
        '        <h3 style="margin:4px 0 0;font-size:16px;font-weight:700;color:#f8fafc;">' + d.name + '</h3>',
        '      </div>',
        '      <span class="zhr-badge" style="background:' + d.color + '22;color:' + d.color + ';">' + d.staff + ' Staff</span>',
        '    </div>',
        '    <p style="font-size:12px;color:#94a3b8;line-height:1.5;margin-bottom:14px;">' + d.desc + '</p>',
        '    <div style="background:rgba(0,0,0,0.25);padding:12px;border-radius:8px;display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:11px;margin-bottom:14px;">',
        '      <div><span style="color:#94a3b8;">Department Head</span><div style="color:#f8fafc;font-weight:600;margin-top:2px;">' + d.lead + '</div></div>',
        '      <div><span style="color:#94a3b8;">Monthly Budget</span><div style="color:#34d399;font-weight:600;font-family:monospace;margin-top:2px;">' + d.budget + '</div></div>',
        '      <div><span style="color:#94a3b8;">Open Roles</span><div style="color:#f59e0b;font-weight:600;margin-top:2px;">' + d.openings + ' Vacancies</div></div>',
        '      <div><span style="color:#94a3b8;">Retention</span><div style="color:' + d.color + ';font-weight:600;margin-top:2px;">97.8%</div></div>',
        '    </div>',
        '  </div>',
        '  <div style="border-top:1px solid rgba(255,255,255,0.06);padding-top:10px;display:flex;justify-content:space-between;align-items:center;">',
        '    <span style="font-size:11px;color:#94a3b8;">Roster synced</span>',
        '    <button class="zhr-btn" style="height:26px;font-size:11px;" onclick="alert(\'Department View: ' + d.name + '\\nHead: ' + d.lead + '\\nStaff: ' + d.staff + '\\nMonthly CTC: ' + d.budget + '\');">Department 360°</button>',
        '  </div>',
        '</div>'
      ].join('');
    }).join('');

    root.innerHTML = [
      '<div class="zhr-head">',
      '  <div class="zhr-head-left">',
      '    <h1 class="zhr-title"><span>🏢</span> Departmental Hierarchy & Capacity</h1>',
      '    <div class="zhr-sub">Operational divisions, divisional leadership, monthly payroll allocation, and team capacity</div>',
      '  </div>',
      '  <div style="display:flex;align-items:center;gap:10px;">',
      '    <span class="zhr-badge zhr-badge-success">● 6 Core Divisions</span>',
      '  </div>',
      '</div>',
      '<div class="zhr-body">',
      '  <div class="zhr-kpi-grid">',
      '    <div class="zhr-card"><div class="zhr-card-label">Divisions Operating</div><div class="zhr-card-value">0</div><div class="zhr-card-sub">No records</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Total Monthly Budget</div><div class="zhr-card-value">₹0</div><div class="zhr-card-sub">No records</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Open Requisitions</div><div class="zhr-card-value">0</div><div class="zhr-card-sub">No records</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Avg Dept Health Score</div><div class="zhr-card-value">0.0</div><div class="zhr-card-sub">No records</div></div>',
      '  </div>',
      '  <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(350px, 1fr));gap:16px;">' + cards + '</div>',
      '</div>'
    ].join('');

  }

  function open() {
    closeOthers();
    init();
    render();
    root.classList.add('zpanel-open');
    isOpen = true;
    window.location.hash = '#departments';
  }

  function close() {
    if (root) root.classList.remove('zpanel-open');
    isOpen = false;
    if (window.location.hash === '#departments') {
      history.replaceState(null, document.title, window.location.pathname + window.location.search);
    }
  }

  function init() {
    root = document.getElementById('zhr-departments-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'zhr-departments-root';
      root.className = 'zpanel-root zhr-root';
      document.body.appendChild(root);
    }
  }

  window.ZenveDepartments = { open: open, close: close };

  document.addEventListener('click', function (e) {
    var it = e.target.closest('button, a, li');
    if (it && it.textContent && it.textContent.trim().toLowerCase() === 'departments') {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      open();
    }
  }, true);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      init();
      if (window.location.hash === '#departments') setTimeout(open, 150);
    });
  } else {
    init();
    if (window.location.hash === '#departments') setTimeout(open, 150);
  }
})();