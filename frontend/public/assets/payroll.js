/* =====================================================================
   Zenve BI — Payroll Dashboard
   Sidebar Subcategory: Employees & HR > Payroll
   ===================================================================== */
(function () {
  'use strict';

  var root = null;
  var isOpen = false;

  var payrollRecords = [
    { id: 'EMP-1001', name: 'Dr. Priya Sharma', role: 'Chief Vet Officer', basic: '₹1,20,000', hra: '₹60,000', pf: '₹14,400', tds: '₹28,500', net: '₹1,97,100', status: 'Disbursed', batch: 'HDFC-0926-01' },
    { id: 'EMP-1002', name: 'Dr. Rahul Mehta', role: 'Senior Vet Surgeon', basic: '₹97,500', hra: '₹48,750', pf: '₹11,700', tds: '₹22,100', net: '₹1,61,200', status: 'Disbursed', batch: 'HDFC-0926-01' },
    { id: 'EMP-1003', name: 'Rohan Deshmukh', role: 'Head Pharmacist', basic: '₹72,500', hra: '₹36,250', pf: '₹8,700', tds: '₹14,200', net: '₹1,22,100', status: 'Disbursed', batch: 'HDFC-0926-01' },
    { id: 'EMP-1004', name: 'Sneha Chawla', role: 'Senior AI Engineer', basic: '₹90,000', hra: '₹45,000', pf: '₹10,800', tds: '₹19,400', net: '₹1,49,800', status: 'Disbursed', batch: 'HDFC-0926-02' },
    { id: 'EMP-1005', name: 'Vikram Joshi', role: 'Fleet Lead', basic: '₹47,500', hra: '₹23,750', pf: '₹5,700', tds: '₹6,400', net: '₹82,900', status: 'Disbursed', batch: 'HDFC-0926-02' },
    { id: 'EMP-1006', name: 'Ananya Verma', role: 'Warehouse Ops Manager', basic: '₹55,000', hra: '₹27,500', pf: '₹6,600', tds: '₹8,100', net: '₹95,300', status: 'Disbursed', batch: 'HDFC-0926-02' },
    { id: 'EMP-1007', name: 'Manish Rawat', role: 'Express Rider', basic: '₹18,000', hra: '₹7,000', pf: '₹2,160', tds: '₹0', net: '₹29,840', status: 'Disbursed', batch: 'ICICI-0926-03' },
    { id: 'EMP-1009', name: 'Pooja Hegde', role: 'Support Team Lead', basic: '₹37,500', hra: '₹18,750', pf: '₹4,500', tds: '₹4,200', net: '₹66,300', status: 'Disbursed', batch: 'HDFC-0926-02' }
  ];

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
      '    <button class="zhr-btn" id="zhr-close-btn">✕ Close</button>',
      '  </div>',
      '</div>',
      '<div class="zhr-body">',
      '  <div class="zhr-kpi-grid">',
      '    <div class="zhr-card"><div class="zhr-card-label">Gross Payroll Run</div><div class="zhr-card-value">₹1,64,30,000</div><div class="zhr-card-sub" style="color:#34d399;">100% processed</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">PF & ESI Remittances</div><div class="zhr-card-value">₹19,71,600</div><div class="zhr-card-sub">Statutory deposit ready</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">TDS Tax Deducted</div><div class="zhr-card-value">₹24,80,000</div><div class="zhr-card-sub">Sec 192 compliance</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Net Disbursed to Bank</div><div class="zhr-card-value">₹1,19,78,400</div><div class="zhr-card-sub" style="color:#34d399;">208 accounts credited</div></div>',
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

    var closeBtn = root.querySelector('#zhr-close-btn');
    if (closeBtn) closeBtn.onclick = close;
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

