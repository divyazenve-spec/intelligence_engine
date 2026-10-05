/* =====================================================================
   Zenve BI — All Employees Dashboard
   Sidebar Subcategory: Employees & HR > All Employees
   ===================================================================== */
(function () {
  'use strict';

  var root = null;
  var isOpen = false;
  var employees = [
    { id: 'EMP-1001', name: 'Dr. Priya Sharma', role: 'Chief Veterinary Officer', dept: 'Clinical', loc: 'Bengaluru Flagship', email: 'priya.s@zenve.in', phone: '+91 98450 11201', joined: '15 Jan 2023', status: 'Active', salary: '₹2,40,000/mo' },
    { id: 'EMP-1002', name: 'Dr. Rahul Mehta', role: 'Senior Vet Surgeon', dept: 'Clinical', loc: 'Mumbai Center', email: 'rahul.m@zenve.in', phone: '+91 98200 44312', joined: '10 Mar 2023', status: 'Active', salary: '₹1,95,000/mo' },
    { id: 'EMP-1003', name: 'Rohan Deshmukh', role: 'Head of Pharmacy', dept: 'Pharmacy', loc: 'Bengaluru Hub', email: 'rohan.d@zenve.in', phone: '+91 97401 88392', joined: '01 Jun 2023', status: 'Active', salary: '₹1,45,000/mo' },
    { id: 'EMP-1004', name: 'Sneha Chawla', role: 'Senior AI Engineer', dept: 'Technology', loc: 'Remote / HQ', email: 'sneha.c@zenve.in', phone: '+91 99102 77314', joined: '28 Sep 2026', status: 'Probation', salary: '₹1,80,000/mo' },
    { id: 'EMP-1005', name: 'Vikram Joshi', role: 'Fleet & Logistics Lead', dept: 'Logistics', loc: 'Bengaluru South', email: 'vikram.j@zenve.in', phone: '+91 98860 12093', joined: '12 Aug 2023', status: 'Active', salary: '₹95,000/mo' },
    { id: 'EMP-1006', name: 'Ananya Verma', role: 'Warehouse Ops Manager', dept: 'Warehouse', loc: 'Bhiwandi Hub', email: 'ananya.v@zenve.in', phone: '+91 98211 40592', joined: '05 Feb 2024', status: 'Active', salary: '₹1,10,000/mo' },
    { id: 'EMP-1007', name: 'Manish Rawat', role: 'Express Delivery Rider', dept: 'Logistics', loc: 'Mumbai Bandra', email: 'manish.r@zenve.in', phone: '+91 98330 67123', joined: '25 Sep 2026', status: 'Active', salary: '₹32,000/mo' },
    { id: 'EMP-1008', name: 'Dr. Aisha Khan', role: 'Consultant Dermatologist', dept: 'Clinical', loc: 'Delhi NCR Clinic', email: 'aisha.k@zenve.in', phone: '+91 98110 55421', joined: '14 Apr 2024', status: 'On Leave', salary: '₹1,15,000/mo' },
    { id: 'EMP-1009', name: 'Pooja Hegde', role: 'Support Team Lead', dept: 'Customer Delight', loc: 'Bengaluru HQ', email: 'pooja.h@zenve.in', phone: '+91 99001 22894', joined: '01 Nov 2023', status: 'Active', salary: '₹75,000/mo' },
    { id: 'EMP-1010', name: 'Kunal Sen', role: 'Inventory Controller', dept: 'Warehouse', loc: 'Bengaluru Hub', email: 'kunal.s@zenve.in', phone: '+91 96190 33412', joined: '18 Sep 2026', status: 'Active', salary: '₹65,000/mo' }
  ];

  function closeOthers() {
    document.querySelectorAll('.zpanel-root').forEach(function (el) {
      el.classList.remove('zpanel-open');
    });
  }

  function render(filter) {
    if (!root) return;
    var list = employees;
    if (filter) {
      filter = filter.toLowerCase();
      list = employees.filter(function (e) {
        return (e.name + ' ' + e.role + ' ' + e.dept + ' ' + e.loc + ' ' + e.id).toLowerCase().indexOf(filter) >= 0;
      });
    }

    var rows = list.map(function (e) {
      var badgeClass = e.status === 'Active' ? 'zhr-badge-success' : e.status === 'On Leave' ? 'zhr-badge-warning' : 'zhr-badge-info';
      return [
        '<tr>',
        '  <td>',
        '    <div style="font-weight:600;color:#f8fafc;">' + e.name + '</div>',
        '    <div style="font-size:11px;color:#94a3b8;">' + e.role + ' · <span style="font-family:monospace;">' + e.id + '</span></div>',
        '  </td>',
        '  <td><span class="zhr-badge zhr-badge-info">' + e.dept + '</span></td>',
        '  <td>' + e.loc + '</td>',
        '  <td>' + e.email + '<br/><small style="color:#64748b;">' + e.phone + '</small></td>',
        '  <td style="font-family:monospace;">' + e.joined + '</td>',
        '  <td><span class="zhr-badge ' + badgeClass + '">● ' + e.status + '</span></td>',
        '  <td style="text-align:right;"><button class="zhr-btn" style="height:26px;font-size:11px;" onclick="alert(\'Employee Profile: ' + e.name + '\\nRole: ' + e.role + '\\nDepartment: ' + e.dept + '\\nCTC: ' + e.salary + '\');">View 360°</button></td>',
        '</tr>'
      ].join('');
    }).join('');

    root.innerHTML = [
      '<div class="zhr-head">',
      '  <div class="zhr-head-left">',
      '    <h1 class="zhr-title"><span>👥</span> All Employees Master Directory</h1>',
      '    <div class="zhr-sub">Centralized workforce database across all hospital branches, dark stores, and logistics nodes</div>',
      '  </div>',
      '  <div style="display:flex;align-items:center;gap:10px;">',
      '    <button class="zhr-btn zhr-btn-primary" id="zhr-add-emp-btn">➕ Add Employee</button>',
      '    <button class="zhr-btn" id="zhr-close-btn">✕ Close</button>',
      '  </div>',
      '</div>',
      '<div class="zhr-body">',
      '  <div class="zhr-kpi-grid">',
      '    <div class="zhr-card"><div class="zhr-card-label">Total Roster</div><div class="zhr-card-value">208 Staff</div><div class="zhr-card-sub">+6 additions this month</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Active on Duty</div><div class="zhr-card-value">198 Staff</div><div class="zhr-card-sub" style="color:#34d399;">95.2% active staffing</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">On Approved Leave</div><div class="zhr-card-value">6 Staff</div><div class="zhr-card-sub">Adequately covered</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Probation / Training</div><div class="zhr-card-value">4 Staff</div><div class="zhr-card-sub">30-day review cycle</div></div>',
      '  </div>',
      '  <div class="zhr-card" style="padding:12px 18px;margin-bottom:16px;display:flex;justify-content:space-between;align-items:center;">',
      '    <input type="text" id="zhr-search-input" placeholder="Search by name, role, department, location, ID..." style="flex:1;max-width:450px;padding:8px 14px;border-radius:7px;border:1px solid rgba(255,255,255,0.12);background:rgba(0,0,0,0.3);color:#fff;font-size:12px;outline:none;" />',
      '    <span style="font-size:11px;color:#94a3b8;">Showing ' + list.length + ' entries</span>',
      '  </div>',
      '  <div class="zhr-table-container">',
      '    <table class="zhr-table">',
      '      <thead>',
      '        <tr><th>Employee Name</th><th>Department</th><th>Location</th><th>Contact Info</th><th>Joined Date</th><th>Status</th><th style="text-align:right;">Actions</th></tr>',
      '      </thead>',
      '      <tbody>' + rows + '</tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');

    var closeBtn = root.querySelector('#zhr-close-btn');
    if (closeBtn) closeBtn.onclick = close;

    var addBtn = root.querySelector('#zhr-add-emp-btn');
    if (addBtn) addBtn.onclick = function () {
      var name = prompt('Enter new employee full name:');
      if (name) {
        employees.unshift({
          id: 'EMP-' + Math.floor(1000 + Math.random() * 9000),
          name: name,
          role: 'Staff Member',
          dept: 'Clinical',
          loc: 'Bengaluru Flagship',
          email: name.toLowerCase().replace(/ /g, '.') + '@zenve.in',
          phone: '+91 98000 00000',
          joined: 'Today',
          status: 'Active',
          salary: '₹85,000/mo'
        });
        render();
      }
    };

    var searchInput = root.querySelector('#zhr-search-input');
    if (searchInput) {
      searchInput.oninput = function () {
        render(searchInput.value);
        var inputNow = root.querySelector('#zhr-search-input');
        if (inputNow) {
          inputNow.focus();
          inputNow.value = searchInput.value;
        }
      };
    }
  }

  function open() {
    closeOthers();
    init();
    render();
    root.classList.add('zpanel-open');
    isOpen = true;
    window.location.hash = '#all-employees';
  }

  function close() {
    if (root) root.classList.remove('zpanel-open');
    isOpen = false;
    if (window.location.hash === '#all-employees') {
      history.replaceState(null, document.title, window.location.pathname + window.location.search);
    }
  }

  function init() {
    root = document.getElementById('zhr-all-employees-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'zhr-all-employees-root';
      root.className = 'zpanel-root zhr-root';
      document.body.appendChild(root);
    }
  }

  window.ZenveAllEmployees = { open: open, close: close };

  document.addEventListener('click', function (e) {
    var it = e.target.closest('button, a, li');
    if (it && it.textContent && it.textContent.trim().toLowerCase() === 'all employees') {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      open();
    }
  }, true);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      init();
      if (window.location.hash === '#all-employees') setTimeout(open, 150);
    });
  } else {
    init();
    if (window.location.hash === '#all-employees') setTimeout(open, 150);
  }
})();
