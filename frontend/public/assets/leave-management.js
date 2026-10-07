/* =====================================================================
   Zenve BI — Leave Management Dashboard
   Sidebar Subcategory: Employees & HR > Leave Management
   ===================================================================== */
(function () {
  'use strict';

  var root = null;
  var isOpen = false;

  var leaveRequests = [];

  function closeOthers() {
    document.querySelectorAll('.zpanel-root').forEach(function (el) {
      el.classList.remove('zpanel-open');
    });
  }

  function render() {
    if (!root) return;
    var rows = leaveRequests.map(function (lr) {
      var badgeClass = lr.status === 'Approved' ? 'zhr-badge-success' : lr.status === 'Pending' ? 'zhr-badge-warning' : 'zhr-badge-danger';
      var actionBtn = lr.status === 'Pending'
        ? '<button class="zhr-btn zhr-btn-success" style="height:24px;font-size:10px;padding:0 8px;" onclick="window.ZenveLeaveManagement.approve(\'' + lr.id + '\');">Approve</button> <button class="zhr-btn" style="height:24px;font-size:10px;padding:0 8px;color:#f87171;" onclick="window.ZenveLeaveManagement.reject(\'' + lr.id + '\');">Reject</button>'
        : '<span style="font-size:11px;color:#94a3b8;">Processed</span>';

      return [
        '<tr>',
        '  <td style="font-family:monospace;color:#93c5fd;">' + lr.id + '</td>',
        '  <td><div style="font-weight:600;color:#f8fafc;">' + lr.name + '</div><div style="font-size:11px;color:#94a3b8;">' + lr.role + '</div></td>',
        '  <td style="color:#cbd5e1;">' + lr.type + '</td>',
        '  <td style="font-family:monospace;color:#f8fafc;">' + lr.dates + '</td>',
        '  <td style="color:#94a3b8;">' + lr.reason + '</td>',
        '  <td style="font-family:monospace;color:#34d399;">' + lr.bal + '</td>',
        '  <td><span class="zhr-badge ' + badgeClass + '">● ' + lr.status + '</span></td>',
        '  <td style="text-align:right;">' + actionBtn + '</td>',
        '</tr>'
      ].join('');
    }).join('');

    root.innerHTML = [
      '<div class="zhr-head">',
      '  <div class="zhr-head-left">',
      '    <h1 class="zhr-title"><span>🏖️</span> Leave Management & Time-Off Governance</h1>',
      '    <div class="zhr-sub">PTO balances, pending managerial signoffs, sick leaves, and public holiday calendars</div>',
      '  </div>',
      '  <div style="display:flex;align-items:center;gap:10px;">',
      '    <span class="zhr-badge zhr-badge-warning">● 3 Pending Approvals</span>',
      '    <button class="zhr-btn" id="zhr-close-btn">✕ Close</button>',
      '  </div>',
      '</div>',
      '<div class="zhr-body">',
      '  <div class="zhr-kpi-grid">',
      '    <div class="zhr-card"><div class="zhr-card-label">Currently on Leave</div><div class="zhr-card-value">6 Staff</div><div class="zhr-card-sub">2.8% of headcount</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Pending Approval</div><div class="zhr-card-value">3 Requests</div><div class="zhr-card-sub" style="color:#fbbf24;">Action required</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Avg Org PTO Balance</div><div class="zhr-card-value">14.2 Days</div><div class="zhr-card-sub" style="color:#34d399;">Healthy burn rate</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Upcoming Q4 Holidays</div><div class="zhr-card-value">5 Days</div><div class="zhr-card-sub">Rosters planned</div></div>',
      '  </div>',
      '  <div class="zhr-table-container">',
      '    <div class="zhr-table-head">',
      '      <h3 style="margin:0;font-size:14px;font-weight:700;">Leave Requests Approval Ledger</h3>',
      '      <span style="font-size:11px;color:#94a3b8;">Direct manager workflow queue</span>',
      '    </div>',
      '    <table class="zhr-table">',
      '      <thead><tr><th>Request ID</th><th>Employee</th><th>Leave Type</th><th>Duration & Dates</th><th>Reason</th><th>Balance</th><th>Status</th><th style="text-align:right;">Actions</th></tr></thead>',
      '      <tbody>' + rows + '</tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');

    var closeBtn = root.querySelector('#zhr-close-btn');
    if (closeBtn) closeBtn.onclick = close;
  }

  function approve(id) {
    leaveRequests.forEach(function (lr) {
      if (lr.id === id) lr.status = 'Approved';
    });
    render();
  }

  function reject(id) {
    leaveRequests.forEach(function (lr) {
      if (lr.id === id) lr.status = 'Rejected';
    });
    render();
  }

  function open() {
    closeOthers();
    init();
    render();
    root.classList.add('zpanel-open');
    isOpen = true;
    window.location.hash = '#leave-management';
  }

  function close() {
    if (root) root.classList.remove('zpanel-open');
    isOpen = false;
    if (window.location.hash === '#leave-management') {
      history.replaceState(null, document.title, window.location.pathname + window.location.search);
    }
  }

  function init() {
    root = document.getElementById('zhr-leave-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'zhr-leave-root';
      root.className = 'zpanel-root zhr-root';
      document.body.appendChild(root);
    }
  }

  window.ZenveLeaveManagement = { open: open, close: close, approve: approve, reject: reject };

  document.addEventListener('click', function (e) {
    var it = e.target.closest('button, a, li');
    if (it && it.textContent && it.textContent.trim().toLowerCase() === 'leave management') {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      open();
    }
  }, true);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      init();
      if (window.location.hash === '#leave-management') setTimeout(open, 150);
    });
  } else {
    init();
    if (window.location.hash === '#leave-management') setTimeout(open, 150);
  }
})();

