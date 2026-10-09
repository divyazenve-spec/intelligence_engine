/* =====================================================================
   Zenve BI — Employee Productivity Dashboard
   Sidebar Subcategory: Employees & HR > Employee Productivity
   ===================================================================== */
(function () {
  'use strict';

  var root = null;
  var isOpen = false;

  var teams = [];

  function closeOthers() {
    document.querySelectorAll('.zpanel-root').forEach(function (el) {
      el.classList.remove('zpanel-open');
    });
  }

  function render() {
    if (!root) return;
    var rows = teams.map(function (t) {
      return [
        '<tr>',
        '  <td style="font-weight:600;color:#f8fafc;">' + t.team + '</td>',
        '  <td style="font-family:monospace;color:#cbd5e1;">' + t.activeHours + '</td>',
        '  <td style="font-family:monospace;color:#38bdf8;">' + t.tasksDone + '</td>',
        '  <td style="font-family:monospace;color:#94a3b8;">' + t.turnaround + '</td>',
        '  <td style="font-family:monospace;color:#f59e0b;">' + t.idlePct + '</td>',
        '  <td>',
        '    <div style="display:flex;align-items:center;gap:8px;">',
        '      <div style="width:70px;height:6px;background:rgba(255,255,255,0.08);border-radius:99px;overflow:hidden;"><div style="width:' + t.efficiency + ';height:100%;background:#10b981;"></div></div>',
        '      <span style="font-family:monospace;font-weight:700;color:#10b981;">' + t.efficiency + '</span>',
        '    </div>',
        '  </td>',
        '  <td style="text-align:right;"><span class="zhr-badge zhr-badge-success">● ' + t.status + '</span></td>',
        '</tr>'
      ].join('');
    }).join('');

    root.innerHTML = [
      '<div class="zhr-head">',
      '  <div class="zhr-head-left">',
      '    <h1 class="zhr-title"><span>⚡</span> Workforce Productivity & Velocity Telemetry</h1>',
      '    <div class="zhr-sub">Active hours utilization, unit handling throughput, clinical consult velocity, and idle capacity tracking</div>',
      '  </div>',
      '  <div style="display:flex;align-items:center;gap:10px;">',
      '    <span class="zhr-badge">● 0.0% Org Efficiency</span>',
      '  </div>',
      '</div>',
      '<div class="zhr-body">',
      '  <div class="zhr-kpi-grid">',
      '    <div class="zhr-card"><div class="zhr-card-label">Active Shift Time</div><div class="zhr-card-value">0</div><div class="zhr-card-sub">No records</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Efficiency Index</div><div class="zhr-card-value">0.0%</div><div class="zhr-card-sub">No records</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Daily Unit Throughput</div><div class="zhr-card-value">0</div><div class="zhr-card-sub">No records</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Idle Capacity</div><div class="zhr-card-value">0.0%</div><div class="zhr-card-sub">No records</div></div>',
      '  </div>',
      '  <div class="zhr-table-container">',
      '    <div class="zhr-table-head">',
      '      <h3 style="margin:0;font-size:14px;font-weight:700;">Functional Unit Throughput Benchmarks</h3>',
      '      <span style="font-size:11px;color:#94a3b8;">Real-time IoT biometric & POS stream</span>',
      '    </div>',
      '    <table class="zhr-table">',
      '      <thead><tr><th>Operational Unit</th><th>Active Hours / Shift</th><th>Daily Unit Output</th><th>Avg Turnaround</th><th>Idle Capacity</th><th>Efficiency</th><th style="text-align:right;">Status</th></tr></thead>',
      '      <tbody>' + (rows || '<tr><td colspan="7" style="text-align:center;padding:36px 16px;color:#94a3b8;">No operational unit productivity records found</td></tr>') + '</tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');

  }

  function open() {
    closeOthers();
    init();
    render();
    root.classList.add('zpanel-open');
    isOpen = true;
    window.location.hash = '#employee-productivity';
  }

  function close() {
    if (root) root.classList.remove('zpanel-open');
    isOpen = false;
    if (window.location.hash === '#employee-productivity') {
      history.replaceState(null, document.title, window.location.pathname + window.location.search);
    }
  }

  function init() {
    root = document.getElementById('zhr-productivity-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'zhr-productivity-root';
      root.className = 'zpanel-root zhr-root';
      document.body.appendChild(root);
    }
  }

  window.ZenveEmployeeProductivity = { open: open, close: close };

  document.addEventListener('click', function (e) {
    var it = e.target.closest('button, a, li');
    if (it && it.textContent && it.textContent.trim().toLowerCase() === 'employee productivity') {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      open();
    }
  }, true);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      init();
      if (window.location.hash === '#employee-productivity') setTimeout(open, 150);
    });
  } else {
    init();
    if (window.location.hash === '#employee-productivity') setTimeout(open, 150);
  }
})();