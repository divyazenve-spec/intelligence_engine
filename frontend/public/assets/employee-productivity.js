/* =====================================================================
   Zenve BI — Employee Productivity Dashboard
   Sidebar Subcategory: Employees & HR > Employee Productivity
   ===================================================================== */
(function () {
  'use strict';

  var root = null;
  var isOpen = false;

  var teams = [
    { team: 'Clinical Surgery & Consults', activeHours: '7.8 hrs/day', efficiency: '96.2%', tasksDone: '38 cases/day', turnaround: '22 mins/pet', idlePct: '4.8%', status: 'Optimal' },
    { team: 'Pharmacy Dispensing & Cold Chain', activeHours: '8.1 hrs/day', efficiency: '97.5%', tasksDone: '240 Rx/day', turnaround: '4.2 mins/Rx', idlePct: '3.1%', status: 'High Velocity' },
    { team: 'Hyperlocal 60-Min Riders', activeHours: '8.4 hrs/day', efficiency: '94.8%', tasksDone: '22 drops/rider', turnaround: '34 mins/trip', idlePct: '6.2%', status: 'Optimal' },
    { team: 'Warehouse Picking & Sorting', activeHours: '7.9 hrs/day', efficiency: '95.1%', tasksDone: '180 bins/day', turnaround: '1.8 mins/item', idlePct: '5.4%', status: 'Optimal' },
    { team: 'AI & Full-Stack Engineering', activeHours: '7.6 hrs/day', efficiency: '98.0%', tasksDone: '18 PRs/wk', turnaround: '4.5 hrs/review', idlePct: '3.0%', status: 'High Velocity' },
    { team: 'Customer Support & Pet Helpline', activeHours: '8.0 hrs/day', efficiency: '93.4%', tasksDone: '110 calls/rep', turnaround: '3.8 mins/call', idlePct: '7.1%', status: 'Balanced' }
  ];

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
      '    <span class="zhr-badge zhr-badge-success">● 95.8% Org Efficiency</span>',
      '    <button class="zhr-btn" id="zhr-close-btn">✕ Close</button>',
      '  </div>',
      '</div>',
      '<div class="zhr-body">',
      '  <div class="zhr-kpi-grid">',
      '    <div class="zhr-card"><div class="zhr-card-label">Active Shift Time</div><div class="zhr-card-value">7.97 hrs</div><div class="zhr-card-sub" style="color:#34d399;">98.2% productive time</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Efficiency Index</div><div class="zhr-card-value">95.8%</div><div class="zhr-card-sub" style="color:#34d399;">+1.9% MoM gain</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Daily Unit Throughput</div><div class="zhr-card-value">1,840 Units</div><div class="zhr-card-sub">Consults, Rx & drops</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Idle Capacity</div><div class="zhr-card-value">4.9%</div><div class="zhr-card-sub" style="color:#34d399;">-0.8% reduction</div></div>',
      '  </div>',
      '  <div class="zhr-table-container">',
      '    <div class="zhr-table-head">',
      '      <h3 style="margin:0;font-size:14px;font-weight:700;">Functional Unit Throughput Benchmarks</h3>',
      '      <span style="font-size:11px;color:#94a3b8;">Real-time IoT biometric & POS stream</span>',
      '    </div>',
      '    <table class="zhr-table">',
      '      <thead><tr><th>Operational Unit</th><th>Active Hours / Shift</th><th>Daily Unit Output</th><th>Avg Turnaround</th><th>Idle Capacity</th><th>Efficiency</th><th style="text-align:right;">Status</th></tr></thead>',
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
