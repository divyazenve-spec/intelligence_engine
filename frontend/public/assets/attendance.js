/* =====================================================================
   Zenve BI — Attendance Dashboard
   Sidebar Subcategory: Employees & HR > Attendance
   ===================================================================== */
(function () {
  'use strict';

  var root = null;
  var isOpen = false;

  var punches = [
    { id: 'EMP-1001', name: 'Dr. Priya Sharma', shift: 'Morning Clinical (08:00 - 16:30)', punchIn: '07:54 AM', punchOut: 'Pending', status: 'On Time', loc: 'Bengaluru Flagship (Biometric)', ot: '0.0h' },
    { id: 'EMP-1002', name: 'Dr. Rahul Mehta', shift: 'Morning Clinical (08:00 - 16:30)', punchIn: '07:58 AM', punchOut: 'Pending', status: 'On Time', loc: 'Mumbai Center (Biometric)', ot: '0.0h' },
    { id: 'EMP-1003', name: 'Rohan Deshmukh', shift: 'General Shift (09:00 - 18:00)', punchIn: '08:52 AM', punchOut: 'Pending', status: 'On Time', loc: 'Bengaluru Hub (RFID)', ot: '0.0h' },
    { id: 'EMP-1004', name: 'Sneha Chawla', shift: 'Flexible Tech (09:30 - 18:30)', punchIn: '09:28 AM', punchOut: 'Pending', status: 'On Time', loc: 'Remote (Geo-Mobile)', ot: '0.0h' },
    { id: 'EMP-1005', name: 'Vikram Joshi', shift: 'General Shift (09:00 - 18:00)', punchIn: '08:45 AM', punchOut: 'Pending', status: 'On Time', loc: 'Bengaluru South (RFID)', ot: '0.0h' },
    { id: 'EMP-1006', name: 'Ananya Verma', shift: 'Early Warehouse (06:00 - 14:30)', punchIn: '05:50 AM', punchOut: '02:35 PM', status: 'On Time', loc: 'Bhiwandi Hub (Biometric)', ot: '0.5h' },
    { id: 'EMP-1007', name: 'Manish Rawat', shift: 'Afternoon Express (12:00 - 21:00)', punchIn: '12:12 PM', punchOut: 'Pending', status: 'Late Mark', loc: 'Mumbai Bandra (Mobile App)', ot: '0.0h' },
    { id: 'EMP-1008', name: 'Dr. Aisha Khan', shift: 'On Approved Leave', punchIn: '—', punchOut: '—', status: 'On Leave', loc: 'Delhi NCR Clinic', ot: '0.0h' },
    { id: 'EMP-1009', name: 'Pooja Hegde', shift: 'General Shift (09:00 - 18:00)', punchIn: '08:55 AM', punchOut: 'Pending', status: 'On Time', loc: 'Bengaluru HQ (Biometric)', ot: '0.0h' },
    { id: 'EMP-1010', name: 'Kunal Sen', shift: 'Early Warehouse (06:00 - 14:30)', punchIn: '05:58 AM', punchOut: '02:30 PM', status: 'On Time', loc: 'Bengaluru Hub (Biometric)', ot: '0.0h' }
  ];

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
      '    <span class="zhr-badge zhr-badge-success">● 198 Clocked In Today</span>',
      '    <button class="zhr-btn" id="zhr-close-btn">✕ Close</button>',
      '  </div>',
      '</div>',
      '<div class="zhr-body">',
      '  <div class="zhr-kpi-grid">',
      '    <div class="zhr-card"><div class="zhr-card-label">Present on Duty</div><div class="zhr-card-value">198 Staff</div><div class="zhr-card-sub" style="color:#34d399;">95.2% on site</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Punctuality Rate</div><div class="zhr-card-value">96.8%</div><div class="zhr-card-sub" style="color:#34d399;">+1.2% this month</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Late Marks Today</div><div class="zhr-card-value">4 Staff</div><div class="zhr-card-sub" style="color:#f59e0b;">Transit delays</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Approved Off / Leave</div><div class="zhr-card-value">6 Staff</div><div class="zhr-card-sub">Planned absence</div></div>',
      '  </div>',
      '  <div class="zhr-table-container">',
      '    <div class="zhr-table-head">',
      '      <h3 style="margin:0;font-size:14px;font-weight:700;">Live Biometric Punch Ledger</h3>',
      '      <span style="font-size:11px;color:#34d399;font-weight:600;">Hardware Synced: Koramangala, Indiranagar, Bandra, Bhiwandi</span>',
      '    </div>',
      '    <table class="zhr-table">',
      '      <thead><tr><th>Employee</th><th>Assigned Shift</th><th>Punch In</th><th>Punch Out</th><th>Terminal Verification</th><th>Overtime</th><th style="text-align:right;">Status</th></tr></thead>',
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

