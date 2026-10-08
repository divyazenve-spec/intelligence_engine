/* =====================================================================
   Zenve BI — Employee Targets Dashboard
   Sidebar Subcategory: Employees & HR > Employee Targets
   ===================================================================== */
(function () {
  'use strict';

  var root = null;
  var isOpen = false;

  var targets = [];

  function closeOthers() {
    document.querySelectorAll('.zpanel-root').forEach(function (el) {
      el.classList.remove('zpanel-open');
    });
  }

  function render() {
    if (!root) return;
    var rows = targets.map(function (t) {
      var isOver = t.pct >= 100;
      return [
        '<tr>',
        '  <td><div style="font-weight:600;color:#f8fafc;">' + t.name + '</div><div style="font-size:11px;color:#94a3b8;">' + t.role + '</div></td>',
        '  <td style="color:#cbd5e1;">' + t.metric + '</td>',
        '  <td style="font-family:monospace;color:#94a3b8;">' + t.target + '</td>',
        '  <td style="font-family:monospace;font-weight:600;color:#f8fafc;">' + t.achieved + '</td>',
        '  <td>',
        '    <div style="display:flex;align-items:center;gap:8px;">',
        '      <div style="flex:1;height:6px;background:rgba(255,255,255,0.08);border-radius:99px;overflow:hidden;"><div style="width:' + Math.min(100, t.pct) + '%;height:100%;background:' + (isOver ? '#10b981' : '#f59e0b') + ';"></div></div>',
        '      <span style="font-family:monospace;font-weight:700;color:' + (isOver ? '#10b981' : '#f59e0b') + ';">' + t.pct + '%</span>',
        '    </div>',
        '  </td>',
        '  <td><span class="zhr-badge ' + (isOver ? 'zhr-badge-success' : 'zhr-badge-warning') + '">● ' + t.status + '</span></td>',
        '  <td style="text-align:right;font-weight:600;color:#93c5fd;">' + t.tier + '</td>',
        '</tr>'
      ].join('');
    }).join('');

    root.innerHTML = [
      '<div class="zhr-head">',
      '  <div class="zhr-head-left">',
      '    <h1 class="zhr-title"><span>🎯</span> Employee Quota & Targets Leaderboard</h1>',
      '    <div class="zhr-sub">Monthly and quarterly revenue quotas, clinical case targets, operational delivery SLAs, and incentive tiers</div>',
      '  </div>',
      '  <div style="display:flex;align-items:center;gap:10px;">',
      '    <span class="zhr-badge">No Quota Data</span>',
      '    <button class="zhr-btn" id="zhr-close-btn">✕ Close</button>',
      '  </div>',
      '</div>',
      '<div class="zhr-body">',
      '  <div class="zhr-kpi-grid">',
      '    <div class="zhr-card"><div class="zhr-card-label">Blended Attainment</div><div class="zhr-card-value">0.0%</div><div class="zhr-card-sub">No records</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Exceeding Target</div><div class="zhr-card-value">0</div><div class="zhr-card-sub">No records</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Incentive Pool</div><div class="zhr-card-value">₹0</div><div class="zhr-card-sub">No records</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Deficit Attainment</div><div class="zhr-card-value">0</div><div class="zhr-card-sub">No records</div></div>',
      '  </div>',
      '  <div class="zhr-table-container">',
      '    <div class="zhr-table-head">',
      '      <h3 style="margin:0;font-size:14px;font-weight:700;">Quota Delivery Matrix</h3>',
      '      <span style="font-size:11px;color:#94a3b8;">October 2026 Target Cycle</span>',
      '    </div>',
      '    <table class="zhr-table">',
      '      <thead><tr><th>Team Member</th><th>Target Metric</th><th>Set Quota</th><th>Achieved</th><th>Attainment %</th><th>Status</th><th style="text-align:right;">Incentive Tier</th></tr></thead>',
      '      <tbody>' + (rows || '<tr><td colspan="7" style="text-align:center;padding:24px;color:#94a3b8;">No quota records found</td></tr>') + '</tbody>',
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
    window.location.hash = '#employee-targets';
  }

  function close() {
    if (root) root.classList.remove('zpanel-open');
    isOpen = false;
    if (window.location.hash === '#employee-targets') {
      history.replaceState(null, document.title, window.location.pathname + window.location.search);
    }
  }

  function init() {
    root = document.getElementById('zhr-targets-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'zhr-targets-root';
      root.className = 'zpanel-root zhr-root';
      document.body.appendChild(root);
    }
  }

  window.ZenveEmployeeTargets = { open: open, close: close };

  document.addEventListener('click', function (e) {
    var it = e.target.closest('button, a, li');
    if (it && it.textContent && it.textContent.trim().toLowerCase() === 'employee targets') {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      open();
    }
  }, true);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      init();
      if (window.location.hash === '#employee-targets') setTimeout(open, 150);
    });
  } else {
    init();
    if (window.location.hash === '#employee-targets') setTimeout(open, 150);
  }
})();