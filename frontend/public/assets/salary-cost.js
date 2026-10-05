/* =====================================================================
   Zenve BI — Salary Cost Dashboard
   Sidebar Subcategory: Employees & HR > Salary Cost
   ===================================================================== */
(function () {
  'use strict';

  var root = null;
  var isOpen = false;

  var deptCosts = [
    { dept: 'Veterinary Clinical Services', staff: 48, monthly: '₹42,00,000', annual: '₹5,04,00,000', pct: 25.6, color: '#10b981' },
    { dept: 'Technology & AI Engineering', staff: 24, monthly: '₹38,00,000', annual: '₹4,56,00,000', pct: 23.2, color: '#ec4899' },
    { dept: 'Logistics & 60-Min Delivery', staff: 54, monthly: '₹28,80,000', annual: '₹3,45,60,000', pct: 17.5, color: '#f59e0b' },
    { dept: 'Pharmacy & Drug Dispensing', staff: 32, monthly: '₹22,50,000', annual: '₹2,70,000,000', pct: 13.7, color: '#0ea5e9' },
    { dept: 'Warehouse & Fulfillment', staff: 28, monthly: '₹18,40,000', annual: '₹2,20,80,000', pct: 11.2, color: '#8b5cf6' },
    { dept: 'Customer Delight & Support', staff: 22, monthly: '₹14,20,000', annual: '₹1,70,40,000', pct: 8.8, color: '#14b8a6' }
  ];

  function closeOthers() {
    document.querySelectorAll('.zpanel-root').forEach(function (el) {
      el.classList.remove('zpanel-open');
    });
  }

  function render() {
    if (!root) return;
    var rows = deptCosts.map(function (d) {
      return [
        '<tr>',
        '  <td style="font-weight:600;color:' + d.color + ';">' + d.dept + '</td>',
        '  <td style="font-family:monospace;">' + d.staff + ' staff</td>',
        '  <td style="font-family:monospace;font-weight:600;color:#f8fafc;">' + d.monthly + '</td>',
        '  <td style="font-family:monospace;color:#38bdf8;">' + d.annual + '</td>',
        '  <td>',
        '    <div style="display:flex;align-items:center;gap:8px;">',
        '      <div style="width:100px;height:6px;background:rgba(255,255,255,0.08);border-radius:99px;overflow:hidden;"><div style="width:' + d.pct + '%;height:100%;background:' + d.color + ';"></div></div>',
        '      <span style="font-family:monospace;font-weight:700;color:' + d.color + ';">' + d.pct + '%</span>',
        '    </div>',
        '  </td>',
        '</tr>'
      ].join('');
    }).join('');

    root.innerHTML = [
      '<div class="zhr-head">',
      '  <div class="zhr-head-left">',
      '    <h1 class="zhr-title"><span>💰</span> Workforce CTC & Salary Cost Analytics</h1>',
      '    <div class="zhr-sub">Executive Cost-to-Company (CTC) breakdown, department spend, salary bands, and employer liabilities</div>',
      '  </div>',
      '  <div style="display:flex;align-items:center;gap:10px;">',
      '    <span class="zhr-badge zhr-badge-success">● ₹19.66 Cr Annualized CTC</span>',
      '    <button class="zhr-btn" id="zhr-close-btn">✕ Close</button>',
      '  </div>',
      '</div>',
      '<div class="zhr-body">',
      '  <div class="zhr-kpi-grid">',
      '    <div class="zhr-card"><div class="zhr-card-label">Monthly CTC Burn</div><div class="zhr-card-value">₹1.64 Cr / mo</div><div class="zhr-card-sub" style="color:#34d399;">98% within plan</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Annualized Commitment</div><div class="zhr-card-value">₹19.66 Cr</div><div class="zhr-card-sub">+12.4% vs FY25</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Avg CTC per Employee</div><div class="zhr-card-value">₹9,45,000</div><div class="zhr-card-sub">Median: ₹7,80,000</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Employer PF Match</div><div class="zhr-card-value">₹19.72 L / mo</div><div class="zhr-card-sub" style="color:#34d399;">Fully provisioned</div></div>',
      '  </div>',
      '  <div class="zhr-table-container">',
      '    <div class="zhr-table-head">',
      '      <h3 style="margin:0;font-size:14px;font-weight:700;">Departmental Salary Cost Stratification</h3>',
      '      <span style="font-size:11px;color:#94a3b8;">FY 2026-2027 Projections</span>',
      '    </div>',
      '    <table class="zhr-table">',
      '      <thead><tr><th>Department</th><th>Headcount</th><th>Monthly CTC</th><th>Annualized Commitment</th><th>Budget Share</th></tr></thead>',
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
    window.location.hash = '#salary-cost';
  }

  function close() {
    if (root) root.classList.remove('zpanel-open');
    isOpen = false;
    if (window.location.hash === '#salary-cost') {
      history.replaceState(null, document.title, window.location.pathname + window.location.search);
    }
  }

  function init() {
    root = document.getElementById('zhr-salary-cost-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'zhr-salary-cost-root';
      root.className = 'zpanel-root zhr-root';
      document.body.appendChild(root);
    }
  }

  window.ZenveSalaryCost = { open: open, close: close };

  document.addEventListener('click', function (e) {
    var it = e.target.closest('button, a, li');
    if (it && it.textContent && it.textContent.trim().toLowerCase() === 'salary cost') {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      open();
    }
  }, true);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      init();
      if (window.location.hash === '#salary-cost') setTimeout(open, 150);
    });
  } else {
    init();
    if (window.location.hash === '#salary-cost') setTimeout(open, 150);
  }
})();

