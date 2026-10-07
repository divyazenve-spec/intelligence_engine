/* =====================================================================
   Zenve BI — Employee Expenses Dashboard
   Sidebar Subcategory: Employees & HR > Employee Expenses
   ===================================================================== */
(function () {
  'use strict';

  var root = null;
  var isOpen = false;

  var claims = [];

  function closeOthers() {
    document.querySelectorAll('.zpanel-root').forEach(function (el) {
      el.classList.remove('zpanel-open');
    });
  }

  function render() {
    if (!root) return;
    var rows = claims.map(function (c) {
      var badgeClass = c.status === 'Approved' ? 'zhr-badge-success' : c.status === 'Pending' ? 'zhr-badge-warning' : 'zhr-badge-danger';
      var actionBtn = c.status === 'Pending'
        ? '<button class="zhr-btn zhr-btn-success" style="height:24px;font-size:10px;padding:0 8px;" onclick="window.ZenveEmployeeExpenses.approve(\'' + c.id + '\');">Approve</button> <button class="zhr-btn" style="height:24px;font-size:10px;padding:0 8px;color:#f87171;" onclick="window.ZenveEmployeeExpenses.reject(\'' + c.id + '\');">Reject</button>'
        : '<span style="font-size:11px;color:#94a3b8;">Reimbursed</span>';

      return [
        '<tr>',
        '  <td style="font-family:monospace;color:#93c5fd;">' + c.id + '</td>',
        '  <td><div style="font-weight:600;color:#f8fafc;">' + c.name + '</div><div style="font-size:11px;color:#94a3b8;">' + c.role + '</div></td>',
        '  <td style="color:#cbd5e1;">' + c.cat + '</td>',
        '  <td style="font-family:monospace;color:#94a3b8;">' + c.date + '</td>',
        '  <td style="color:#cbd5e1;">' + c.merchant + '</td>',
        '  <td style="font-family:monospace;font-weight:700;color:#34d399;">' + c.amt + '</td>',
        '  <td style="font-size:11px;color:#93c5fd;">' + c.receipt + '</td>',
        '  <td><span class="zhr-badge ' + badgeClass + '">● ' + c.status + '</span></td>',
        '  <td style="text-align:right;">' + actionBtn + '</td>',
        '</tr>'
      ].join('');
    }).join('');

    root.innerHTML = [
      '<div class="zhr-head">',
      '  <div class="zhr-head-left">',
      '    <h1 class="zhr-title"><span>🧾</span> Employee Expenses & Claims Settlement</h1>',
      '    <div class="zhr-sub">Corporate travel, clinical consumable claims, fuel stipends, software subscriptions, and tax invoice audits</div>',
      '  </div>',
      '  <div style="display:flex;align-items:center;gap:10px;">',
      '    <button class="zhr-btn zhr-btn-primary" onclick="alert(\'Submit Expense Claim modal launched.\');">➕ New Claim</button>',
      '    <button class="zhr-btn" id="zhr-close-btn">✕ Close</button>',
      '  </div>',
      '</div>',
      '<div class="zhr-body">',
      '  <div class="zhr-kpi-grid">',
      '    <div class="zhr-card"><div class="zhr-card-label">Monthly Claims Disbursed</div><div class="zhr-card-value">₹4,28,400</div><div class="zhr-card-sub" style="color:#34d399;">100% within policy</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Pending Approval</div><div class="zhr-card-value">2 Claims</div><div class="zhr-card-sub" style="color:#fbbf24;">₹23,000 value</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">GST Input Reclaimed</div><div class="zhr-card-value">₹65,300</div><div class="zhr-card-sub">18% blended GST</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Policy Compliance</div><div class="zhr-card-value">99.2%</div><div class="zhr-card-sub" style="color:#34d399;">Zero fraud flagged</div></div>',
      '  </div>',
      '  <div class="zhr-table-container">',
      '    <div class="zhr-table-head">',
      '      <h3 style="margin:0;font-size:14px;font-weight:700;">Reimbursement Claims Ledger</h3>',
      '      <span style="font-size:11px;color:#94a3b8;">Audited for IT & GST compliance</span>',
      '    </div>',
      '    <table class="zhr-table">',
      '      <thead><tr><th>Claim ID</th><th>Employee</th><th>Category</th><th>Date</th><th>Merchant / Vendor</th><th>Amount</th><th>Receipt Proof</th><th>Status</th><th style="text-align:right;">Actions</th></tr></thead>',
      '      <tbody>' + rows + '</tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');

    var closeBtn = root.querySelector('#zhr-close-btn');
    if (closeBtn) closeBtn.onclick = close;
  }

  function approve(id) {
    claims.forEach(function (c) {
      if (c.id === id) c.status = 'Approved';
    });
    render();
  }

  function reject(id) {
    claims.forEach(function (c) {
      if (c.id === id) c.status = 'Rejected';
    });
    render();
  }

  function open() {
    closeOthers();
    init();
    render();
    root.classList.add('zpanel-open');
    isOpen = true;
    window.location.hash = '#employee-expenses';
  }

  function close() {
    if (root) root.classList.remove('zpanel-open');
    isOpen = false;
    if (window.location.hash === '#employee-expenses') {
      history.replaceState(null, document.title, window.location.pathname + window.location.search);
    }
  }

  function init() {
    root = document.getElementById('zhr-expenses-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'zhr-expenses-root';
      root.className = 'zpanel-root zhr-root';
      document.body.appendChild(root);
    }
  }

  window.ZenveEmployeeExpenses = { open: open, close: close, approve: approve, reject: reject };

  document.addEventListener('click', function (e) {
    var it = e.target.closest('button, a, li');
    if (it && it.textContent && it.textContent.trim().toLowerCase() === 'employee expenses') {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      open();
    }
  }, true);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      init();
      if (window.location.hash === '#employee-expenses') setTimeout(open, 150);
    });
  } else {
    init();
    if (window.location.hash === '#employee-expenses') setTimeout(open, 150);
  }
})();

