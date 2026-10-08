/* =====================================================================
   Zenve BI — Payroll Dashboard
   Sidebar Subcategory: Employees & HR > Payroll
   ===================================================================== */
(function () {
  'use strict';

  var root = null;
  var isOpen = false;

  var payrollRecords = [];

  function closeOthers() {
    document.querySelectorAll('.zpanel-root').forEach(function (el) {
      el.classList.remove('zpanel-open');
    });
  }

  function render() {
    if (!root) return;
    var rows = payrollRecords.map(function (p) {
      return [
        '<tr>',
        '  <td><div style="font-weight:600;color:#f8fafc;">' + p.name + '</div><div style="font-size:11px;font-family:monospace;color:#94a3b8;">' + p.id + ' · ' + p.role + '</div></td>',
        '  <td style="font-family:monospace;color:#cbd5e1;">' + p.basic + '</td>',
        '  <td style="font-family:monospace;color:#cbd5e1;">' + p.hra + '</td>',
        '  <td style="font-family:monospace;color:#f87171;">-' + p.pf + '</td>',
        '  <td style="font-family:monospace;color:#f87171;">-' + p.tds + '</td>',
        '  <td style="font-family:monospace;font-weight:700;color:#34d399;">' + p.net + '</td>',
        '  <td><span class="zhr-badge zhr-badge-success">● ' + p.status + '</span></td>',
        '  <td style="text-align:right;"><button class="zhr-btn" style="height:26px;font-size:11px;" onclick="alert(\'Payslip for ' + p.name + '\\nBasic: ' + p.basic + '\\nHRA: ' + p.hra + '\\nPF: ' + p.pf + '\\nTDS: ' + p.tds + '\\nNet Take-Home: ' + p.net + '\\nBank Batch: ' + p.batch + '\');">Payslip 📄</button></td>',
        '</tr>'
      ].join('');
    }).join('');

    root.innerHTML = [
      '<div class="zhr-head">',
      '  <div class="zhr-head-left">',
      '    <h1 class="zhr-title"><span>💵</span> Payroll Register & Direct Bank Batches</h1>',
      '    <div class="zhr-sub">Monthly salary processing, PF, ESI, professional tax, TDS deductions, and automated corporate NEFT transfers</div>',
      '  </div>',
      '  <div style="display:flex;align-items:center;gap:10px;">',
      '    <button class="zhr-btn zhr-btn-success" onclick="alert(\'Corporate NEFT Batch XML downloaded successfully for HDFC/ICICI gateway.\');">🏦 Export Bank Batch</button>',
      '  </div>',
      '</div>',
      '<div class="zhr-body">',
      '  <div class="zhr-kpi-grid">',
      '    <div class="zhr-card"><div class="zhr-card-label">Gross Payroll Run</div><div class="zhr-card-value">₹0</div><div class="zhr-card-sub">No records</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">PF & ESI Remittances</div><div class="zhr-card-value">₹0</div><div class="zhr-card-sub">No records</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">TDS Tax Deducted</div><div class="zhr-card-value">₹0</div><div class="zhr-card-sub">No records</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Net Disbursed to Bank</div><div class="zhr-card-value">₹0</div><div class="zhr-card-sub">No records</div></div>',
      '  </div>',
      '  <div class="zhr-table-container">',
      '    <div class="zhr-table-head">',
      '      <h3 style="margin:0;font-size:14px;font-weight:700;">September 2026 Disbursal Register</h3>',
      '      <span style="font-size:11px;color:#94a3b8;">HDFC Corporate Banking Gateway</span>',
      '    </div>',
      '    <table class="zhr-table">',
      '      <thead><tr><th>Employee</th><th>Basic Pay</th><th>HRA</th><th>PF (12%)</th><th>TDS Tax</th><th>Net Disbursed</th><th>Status</th><th style="text-align:right;">Actions</th></tr></thead>',
      '      <tbody>' + rows + '</tbody>',
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
    window.location.hash = '#payroll';
  }

  function close() {
    if (root) root.classList.remove('zpanel-open');
    isOpen = false;
    if (window.location.hash === '#payroll') {
      history.replaceState(null, document.title, window.location.pathname + window.location.search);
    }
  }

  function init() {
    root = document.getElementById('zhr-payroll-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'zhr-payroll-root';
      root.className = 'zpanel-root zhr-root';
      document.body.appendChild(root);
    }
  }

  window.ZenvePayroll = { open: open, close: close };

  document.addEventListener('click', function (e) {
    var it = e.target.closest('button, a, li');
    if (it && it.textContent && it.textContent.trim().toLowerCase() === 'payroll') {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      open();
    }
  }, true);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      init();
      if (window.location.hash === '#payroll') setTimeout(open, 150);
    });
  } else {
    init();
    if (window.location.hash === '#payroll') setTimeout(open, 150);
  }
})();
