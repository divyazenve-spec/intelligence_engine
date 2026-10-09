/* =====================================================================
   Zenve BI — Attendance Dashboard
   Sidebar Subcategory: Employees & HR > Attendance
   ===================================================================== */
(function () {
  'use strict';

  var root = null;
  var isOpen = false;

  var punches = [];

  function closeOthers() {
    document.querySelectorAll('.zpanel-root').forEach(function (el) {
      el.classList.remove('zpanel-open');
    });
  }

  function render() {
    if (!root) return;
    var rows = punches.map(function (p) {
      var badgeClass = p.status === 'On Time' ? 'zhr-badge-success' : p.status === 'Late Mark' ? 'zhr-badge-danger' : 'zhr-badge-warning';
      return [
        '<tr>',
        '  <td><div style="font-weight:600;color:#f8fafc;">' + p.name + '</div><div style="font-size:11px;font-family:monospace;color:#94a3b8;">' + p.id + '</div></td>',
        '  <td style="color:#cbd5e1;">' + p.shift + '</td>',
        '  <td style="font-family:monospace;font-weight:600;color:' + (p.punchIn === '—' ? '#64748b' : '#34d399') + ';">' + p.punchIn + '</td>',
        '  <td style="font-family:monospace;color:#94a3b8;">' + p.punchOut + '</td>',
        '  <td style="font-size:11px;color:#94a3b8;">' + p.loc + '</td>',
        '  <td style="font-family:monospace;color:' + (p.ot !== '0.0h' ? '#f59e0b' : '#64748b') + ';">' + p.ot + '</td>',
        '  <td style="text-align:right;"><span class="zhr-badge ' + badgeClass + '">● ' + p.status + '</span></td>',
        '</tr>'
      ].join('');
    }).join('');

    root.innerHTML = [
      '<div class="zhr-head">',
      '  <div class="zhr-head-left">',
      '    <h1 class="zhr-title"><span>⏰</span> Attendance Telemetry & Shift Roster</h1>',
      '    <div class="zhr-sub">Live biometric terminal clock-in stream, geo-fenced mobile punches, shift rosters, and punctuality monitoring</div>',
      '  </div>',
      '  <div style="display:flex;align-items:center;gap:10px;">',
      '    <span class="zhr-badge">● 0 Clocked In Today</span>',
      '  </div>',
      '</div>',
      '<div class="zhr-body">',
      '  <div class="zhr-kpi-grid">',
      '    <div class="zhr-card"><div class="zhr-card-label">Present on Duty</div><div class="zhr-card-value">0</div><div class="zhr-card-sub">No records</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Punctuality Rate</div><div class="zhr-card-value">0.0%</div><div class="zhr-card-sub">No records</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Late Marks Today</div><div class="zhr-card-value">0</div><div class="zhr-card-sub">No records</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Approved Off / Leave</div><div class="zhr-card-value">0</div><div class="zhr-card-sub">No records</div></div>',
      '  </div>',
      '  <div class="zhr-table-container">',
      '    <div class="zhr-table-head">',
      '      <h3 style="margin:0;font-size:14px;font-weight:700;">Live Biometric Punch Ledger</h3>',
      '      <span style="font-size:11px;color:#34d399;font-weight:600;">Hardware Synced: Koramangala, Indiranagar, Bandra, Bhiwandi</span>',
      '    </div>',
      '    <table class="zhr-table">',
      '      <thead><tr><th>Employee</th><th>Assigned Shift</th><th>Punch In</th><th>Punch Out</th><th>Terminal Verification</th><th>Overtime</th><th style="text-align:right;">Status</th></tr></thead>',
      '      <tbody>' + (rows || '<tr><td colspan="7" style="text-align:center;padding:36px 16px;color:#94a3b8;">No clock-in records found</td></tr>') + '</tbody>',
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
    window.location.hash = '#attendance';
  }

  function close() {
    if (root) root.classList.remove('zpanel-open');
    isOpen = false;
    if (window.location.hash === '#attendance') {
      history.replaceState(null, document.title, window.location.pathname + window.location.search);
    }
  }

  function init() {
    root = document.getElementById('zhr-attendance-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'zhr-attendance-root';
      root.className = 'zpanel-root zhr-root';
      document.body.appendChild(root);
    }
  }

  window.ZenveAttendance = { open: open, close: close };

  document.addEventListener('click', function (e) {
    var it = e.target.closest('button, a, li');
    if (it && it.textContent && it.textContent.trim().toLowerCase() === 'attendance') {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      open();
    }
  }, true);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      init();
      if (window.location.hash === '#attendance') setTimeout(open, 150);
    });
  } else {
    init();
    if (window.location.hash === '#attendance') setTimeout(open, 150);
  }
})();
