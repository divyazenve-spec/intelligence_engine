/* =====================================================================
   Zenve BI — Human Resources Executive Control Center
   Sidebar: Employees & HR > HR Dashboard
   Pure Light Executive Design System
   ===================================================================== */

(function () {
  'use strict';

  var root = null;
  var S = {
    open: false,
    tab: 'overview',
    deptFilter: 'ALL',
    searchQuery: '',
    toastTimeout: null
  };

  /* ── 13 Modules matching Employees & HR Suite ─────────────────────── */
  var MODULES = [
    { id: 'overview', label: 'Executive Overview', icon: '📊', hash: '#hr-dashboard' },
    { id: 'directory', label: 'All Employees', icon: '👥', hash: '#all-employees' },
    { id: 'departments', label: 'Departments', icon: '🏢', hash: '#departments' },
    { id: 'performance', label: 'Employee Performance', icon: '⭐', hash: '#employee-performance' },
    { id: 'targets', label: 'Employee Targets', icon: '🎯', hash: '#employee-targets' },
    { id: 'productivity', label: 'Employee Productivity', icon: '📈', hash: '#employee-productivity' },
    { id: 'attendance', label: 'Attendance', icon: '⏰', hash: '#attendance' },
    { id: 'leaves', label: 'Leave Management', icon: '🏖️', hash: '#leave-management' },
    { id: 'payroll', label: 'Payroll', icon: '💵', hash: '#payroll' },
    { id: 'salary-cost', label: 'Salary Cost', icon: '💰', hash: '#salary-cost' },
    { id: 'recruitment', label: 'Recruitment', icon: '📢', hash: '#recruitment' },
    { id: 'onboarding', label: 'Onboarding', icon: '🚀', hash: '#onboarding' },
    { id: 'expenses', label: 'Employee Expenses', icon: '🧾', hash: '#employee-expenses' }
  ];

  /* ── Datasets ─────────────────────────────────────────────────────── */
  var DEPARTMENTS = [];

  var EMPLOYEES = [];

  var LEAVE_REQUESTS = [];

  var OPEN_JOBS = [];

  var EXPENSES = [];

  function showToast(msg) {
    var el = document.getElementById('zhr-toast');
    if (el) el.remove();
    if (S.toastTimeout) clearTimeout(S.toastTimeout);

    el = document.createElement('div');
    el.id = 'zhr-toast';
    el.innerHTML = '<span>⚡</span> <span>' + msg + '</span>';
    document.body.appendChild(el);

    S.toastTimeout = setTimeout(function () {
      if (el && el.parentNode) el.remove();
    }, 2800);
  }

  function closeOthers() {
    document.querySelectorAll('.zpanel-root, #zset-root, #zod-root, #zsd-root, #zph-root, #zch-root, #zalt-root, #zrep-root, #zsh-root').forEach(function (p) {
      p.classList.remove('zpanel-open');
      p.classList.remove('zset-open');
      p.classList.remove('zod-open');
      p.classList.remove('zsd-open');
      p.classList.remove('zph-open');
      p.classList.remove('zch-open');
      p.classList.remove('zalt-open');
      p.classList.remove('zrep-open');
      p.classList.remove('zsh-open');
    });
    if (window.ZenveSettingsDashboard && window.ZenveSettingsDashboard.close) {
      try { window.ZenveSettingsDashboard.close(); } catch (err) {}
    }
  }

  /* ── Tab Helpers ──────────────────────────────────────────────────── */
  function tabFromHash(hash) {
    if (!hash) return null;
    var clean = (hash.startsWith('#') ? hash : '#' + hash).toLowerCase().trim();
    for (var i = 0; i < MODULES.length; i++) {
      if (MODULES[i].hash === clean || clean === '#' + MODULES[i].id) {
        return MODULES[i].id;
      }
    }
    if (clean === '#hr-dashboard' || clean === '#hr' || clean === '#human-resources') return 'overview';
    return null;
  }

  function tabFromText(text) {
    if (!text) return null;
    var t = text.trim().toLowerCase();
    if (t === 'hr dashboard' || t === 'hr' || t === 'human resources') return 'overview';
    if (t === 'all employees' || t === 'employees' || t === 'staff directory') return 'directory';
    if (t === 'departments' || t === 'org structure') return 'departments';
    if (t === 'employee performance' || t === 'performance') return 'performance';
    if (t === 'employee targets' || t === 'targets') return 'targets';
    if (t === 'employee productivity' || t === 'productivity') return 'productivity';
    if (t === 'attendance' || t === 'biometric attendance') return 'attendance';
    if (t === 'leave management' || t === 'leaves') return 'leaves';
    if (t === 'payroll' || t === 'ctc') return 'payroll';
    if (t === 'salary cost' || t === 'salary') return 'salary-cost';
    if (t === 'recruitment' || t === 'talent acquisition' || t === 'jobs') return 'recruitment';
    if (t === 'onboarding') return 'onboarding';
    if (t === 'employee expenses' || t === 'expenses') return 'expenses';
    return null;
  }

  /* ── Shell Renderer ───────────────────────────────────────────────── */
  function render() {
    if (!root) return;

    var curMod = MODULES.find(function (m) { return m.id === S.tab; }) || MODULES[0];

    // Build chip navigation
    var chipsHtml = MODULES.map(function (m) {
      var isActive = S.tab === m.id;
      var count = '';
      if (m.id === 'directory') count = '<span class="zhr-chip-count">' + EMPLOYEES.length + '</span>';
      else if (m.id === 'leaves') count = '<span class="zhr-chip-count">' + LEAVE_REQUESTS.length + '</span>';
      else if (m.id === 'recruitment') count = '<span class="zhr-chip-count">' + OPEN_JOBS.length + '</span>';

      return [
        '<button type="button" class="zhr-chip ' + (isActive ? 'active' : '') + '" data-tab="' + m.id + '">',
        '  <span>' + m.icon + '</span>',
        '  <span>' + m.label + '</span>',
        count,
        '</button>'
      ].join('');
    }).join('');

    root.innerHTML = [
      '<header class="zhr-header">',
      '  <div class="zhr-header-left">',
      '    <div class="zhr-brand-badge">🧑‍💼</div>',
      '    <div class="zhr-title-group">',
      '      <div class="zhr-title-row">',
      '        <h1 class="zhr-main-title">HR Dashboard</h1>',
      '        <span class="zhr-env-pill">PRODUCTION • ACTIVE</span>',
      '      </div>',
      '      <div class="zhr-breadcrumbs">',
      '        <span>Zenve System</span>',
      '        <span>/</span>',
      '        <span>Employees &amp; HR</span>',
      '        <span>/</span>',
      '        <span class="active">' + curMod.label + '</span>',
      '      </div>',
      '    </div>',
      '  </div>',
      '  <div class="zhr-header-actions">',
      '    <button type="button" class="zhr-btn zhr-btn-primary" id="zhr-add-btn">',
      '      <span>➕</span> Onboard Staff',
      '    </button>',
      '    <button type="button" class="zhr-btn zhr-btn-secondary" id="zhr-sync-btn">',
      '      <span>🔄</span> Sync HRIS',
      '    </button>',
      '  </div>',
      '</header>',
      '<div class="zhr-chip-bar">' + chipsHtml + '</div>',
      '<div class="zhr-body">',
      '  <div class="zhr-section-header">',
      '    <h2 class="zhr-section-title">' + curMod.icon + ' ' + curMod.label + '</h2>',
      '    <p class="zhr-section-desc">Real-time people operations, headcount governance, payroll allocation and talent tracking across Zenve clinics &amp; hubs.</p>',
      '  </div>',
      '  <div id="zhr-tab-container"></div>',
      '</div>'
    ].join('');

    renderTabContent();
    wireEvents();
  }

  function renderTabContent() {
    var container = root.querySelector('#zhr-tab-container');
    if (!container) return;

    if (S.tab === 'overview') container.innerHTML = renderOverviewTab();
    else if (S.tab === 'directory') container.innerHTML = renderDirectoryTab();
    else if (S.tab === 'departments') container.innerHTML = renderDepartmentsTab();
    else if (S.tab === 'performance') container.innerHTML = renderPerformanceTab();
    else if (S.tab === 'targets') container.innerHTML = renderTargetsTab();
    else if (S.tab === 'productivity') container.innerHTML = renderProductivityTab();
    else if (S.tab === 'attendance') container.innerHTML = renderAttendanceTab();
    else if (S.tab === 'leaves') container.innerHTML = renderLeavesTab();
    else if (S.tab === 'payroll') container.innerHTML = renderPayrollTab();
    else if (S.tab === 'salary-cost') container.innerHTML = renderSalaryCostTab();
    else if (S.tab === 'recruitment') container.innerHTML = renderRecruitmentTab();
    else if (S.tab === 'onboarding') container.innerHTML = renderOnboardingTab();
    else if (S.tab === 'expenses') container.innerHTML = renderExpensesTab();
    else container.innerHTML = renderOverviewTab();

    wireTabSpecificEvents();
  }

  /* ── Tab 1: Executive Overview ────────────────────────────────────── */
  function renderOverviewTab() {
    var deptBars = DEPARTMENTS.map(function (d) {
      var pct = Math.round((d.count / 208) * 100);
      return [
        '<div style="margin-bottom:12px;">',
        '  <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px;">',
        '    <span style="font-weight:600;color:#0f172a;">' + d.name + '</span>',
        '    <span style="color:#64748b;font-family:monospace;">' + d.count + ' staff · ' + pct + '% (' + d.budget + ')</span>',
        '  </div>',
        '  <div style="height:6px;background:#e2e8f0;border-radius:99px;overflow:hidden;">',
        '    <div style="width:' + pct + '%;height:100%;background:' + d.color + ';border-radius:99px;"></div>',
        '  </div>',
        '</div>'
      ].join('');
    }).join('');

    var leaveRows = LEAVE_REQUESTS.map(function (l) {
      var actions = l.status === 'Pending'
        ? '<button type="button" class="zhr-btn zhr-btn-primary" style="height:26px;font-size:11px;padding:0 10px;" onclick="ZenveHRDashboard.approveLeave(\'' + l.id + '\');">Approve</button> ' +
          '<button type="button" class="zhr-btn zhr-btn-secondary" style="height:26px;font-size:11px;padding:0 10px;color:#dc2626;" onclick="ZenveHRDashboard.rejectLeave(\'' + l.id + '\');">Reject</button>'
        : '<span class="zhr-pill ' + (l.status === 'Approved' ? 'zhr-pill-success' : 'zhr-pill-danger') + '">' + l.status + '</span>';

      return [
        '<tr>',
        '  <td><strong>' + l.name + '</strong><br/><small style="color:#64748b;">' + l.role + '</small></td>',
        '  <td><span class="zhr-pill zhr-pill-info">' + l.type + '</span></td>',
        '  <td>' + l.dates + '<br/><small style="color:#64748b;">' + l.reason + '</small></td>',
        '  <td>' + l.bal + '</td>',
        '  <td style="text-align:right;">' + actions + '</td>',
        '</tr>'
      ].join('');
    }).join('');

    return [
      '<div class="zhr-kpi-grid">',
      '  <div class="zhr-kpi-card"><div class="zhr-kpi-label"><span>Active Workforce</span><span>👥</span></div><div class="zhr-kpi-value">0 Staff</div><div class="zhr-kpi-sub">0 net additions this quarter</div></div>',
      '  <div class="zhr-kpi-card"><div class="zhr-kpi-label"><span>Monthly Payroll</span><span>💵</span></div><div class="zhr-kpi-value">₹0</div><div class="zhr-kpi-sub">0.0% budget allocation</div></div>',
      '  <div class="zhr-kpi-card"><div class="zhr-kpi-label"><span>Retention Rate</span><span>🤝</span></div><div class="zhr-kpi-value">0.0%</div><div class="zhr-kpi-sub">0.0% YoY healthcare gain</div></div>',
      '  <div class="zhr-kpi-card"><div class="zhr-kpi-label"><span>eNPS Pulse Score</span><span>❤️</span></div><div class="zhr-kpi-value">0.0 eNPS</div><div class="zhr-kpi-sub">Staff morale baseline</div></div>',
      '  <div class="zhr-kpi-card"><div class="zhr-kpi-label"><span>Open Requisitions</span><span>📢</span></div><div class="zhr-kpi-value">0 Roles</div><div class="zhr-kpi-sub">0 in interview stage</div></div>',
      '</div>',

      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px;">',
      '  <div class="zhr-card" style="margin-bottom:0;">',
      '    <div class="zhr-card-head">',
      '      <h3 class="zhr-card-title">🏢 Department Headcount &amp; Budget</h3>',
      '      <span class="zhr-pill zhr-pill-info">0 Divisions</span>',
      '    </div>',
      '    <div>' + (deptBars || '<div style="padding:24px 16px;text-align:center;color:#94a3b8;font-size:12px;">No department records found</div>') + '</div>',
      '  </div>',
      '  <div class="zhr-card" style="margin-bottom:0;">',
      '    <div class="zhr-card-head">',
      '      <h3 class="zhr-card-title">⚡ Quick HR Actions</h3>',
      '      <span class="zhr-pill zhr-pill-success">HRIS Live</span>',
      '    </div>',
      '    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">',
      '      <button class="zhr-btn zhr-btn-secondary" style="height:48px;justify-content:center;" onclick="ZenveHRDashboard.switchTab(\'directory\');">👥 Master Directory</button>',
      '      <button class="zhr-btn zhr-btn-secondary" style="height:48px;justify-content:center;" onclick="ZenveHRDashboard.switchTab(\'attendance\');">⏰ Biometric Logs</button>',
      '      <button class="zhr-btn zhr-btn-secondary" style="height:48px;justify-content:center;" onclick="ZenveHRDashboard.switchTab(\'payroll\');">💵 Run Payroll</button>',
      '      <button class="zhr-btn zhr-btn-secondary" style="height:48px;justify-content:center;" onclick="ZenveHRDashboard.switchTab(\'recruitment\');">📢 Post New Role</button>',
      '    </div>',
      '    <div style="margin-top:16px;padding:12px;background:#f8fafc;border-radius:8px;border:1px solid #e2e8f0;font-size:12px;color:#475569;">',
      '      <strong>🏥 Clinical Staff Availability:</strong> 0.0% coverage today. 0 active surgeons across clinics.',
      '    </div>',
      '  </div>',
      '</div>',

      '<div class="zhr-card">',
      '  <div class="zhr-card-head">',
      '    <h3 class="zhr-card-title">🏖️ Pending Leave Authorizations</h3>',
      '    <button class="zhr-btn zhr-btn-secondary" onclick="ZenveHRDashboard.switchTab(\'leaves\');">View All Leaves →</button>',
      '  </div>',
      '  <div class="zhr-table-wrap">',
      '    <table class="zhr-table">',
      '      <thead><tr><th>Employee</th><th>Type</th><th>Dates / Reason</th><th>Balance</th><th style="text-align:right;">Decision</th></tr></thead>',
      '      <tbody>' + (leaveRows || '<tr><td colspan="5" style="text-align:center;padding:36px 16px;color:#94a3b8;">No pending leave authorizations found</td></tr>') + '</tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 2: All Employees ─────────────────────────────────────────── */
  function renderDirectoryTab() {
    var filtered = EMPLOYEES.filter(function (e) {
      var matchQ = (e.name + ' ' + e.role + ' ' + e.dept + ' ' + e.loc + ' ' + e.id).toLowerCase().indexOf(S.searchQuery.toLowerCase()) >= 0;
      var matchD = S.deptFilter === 'ALL' || e.dept === S.deptFilter;
      return matchQ && matchD;
    });

    var rows = filtered.map(function (e) {
      var badgeClass = e.status === 'Active' ? 'zhr-pill-success' : e.status === 'On Leave' ? 'zhr-pill-warning' : 'zhr-pill-info';
      return [
        '<tr>',
        '  <td><strong>' + e.name + '</strong><br/><small style="color:#64748b;">' + e.role + ' · <code style="font-size:11px;">' + e.id + '</code></small></td>',
        '  <td><span class="zhr-pill zhr-pill-info">' + e.dept + '</span></td>',
        '  <td>' + e.loc + '</td>',
        '  <td>' + e.email + '<br/><small style="color:#64748b;">' + e.phone + '</small></td>',
        '  <td>' + e.joined + '</td>',
        '  <td><span class="zhr-pill ' + badgeClass + '">' + e.status + '</span></td>',
        '  <td><strong>' + e.rating + '</strong></td>',
        '  <td style="text-align:right;"><button class="zhr-btn zhr-btn-secondary" style="height:26px;font-size:11px;" onclick="ZenveHRDashboard.viewStaff(\'' + e.id + '\');">View 360°</button></td>',
        '</tr>'
      ].join('');
    }).join('');

    return [
      '<div class="zhr-card">',
      '  <div class="zhr-filter-row">',
      '    <input class="zhr-search-input" id="zhr-dir-search" placeholder="🔍 Search staff by name, role, ID, or clinic..." value="' + S.searchQuery + '">',
      '    <div style="display:flex;gap:10px;">',
      '      <select class="zhr-select" id="zhr-dir-dept">',
      '        <option value="ALL"' + (S.deptFilter === 'ALL' ? ' selected' : '') + '>All Departments</option>',
      '        <option value="Clinical"' + (S.deptFilter === 'Clinical' ? ' selected' : '') + '>Clinical Services</option>',
      '        <option value="Pharmacy"' + (S.deptFilter === 'Pharmacy' ? ' selected' : '') + '>Pharmacy</option>',
      '        <option value="Logistics"' + (S.deptFilter === 'Logistics' ? ' selected' : '') + '>Logistics</option>',
      '        <option value="Warehouse"' + (S.deptFilter === 'Warehouse' ? ' selected' : '') + '>Warehouse</option>',
      '        <option value="Technology"' + (S.deptFilter === 'Technology' ? ' selected' : '') + '>Technology</option>',
      '        <option value="Customer Delight"' + (S.deptFilter === 'Customer Delight' ? ' selected' : '') + '>Customer Delight</option>',
      '      </select>',
      '      <button class="zhr-btn zhr-btn-primary" onclick="ZenveHRDashboard.showOnboardModal();">➕ New Staff</button>',
      '    </div>',
      '  </div>',
      '  <div class="zhr-table-wrap">',
      '    <table class="zhr-table">',
      '      <thead><tr><th>Employee</th><th>Department</th><th>Location</th><th>Contact</th><th>Joined</th><th>Status</th><th>Rating</th><th style="text-align:right;">Action</th></tr></thead>',
      '      <tbody>' + (rows || '<tr><td colspan="8" style="text-align:center;padding:32px;color:#94a3b8;">No staff members matched your query.</td></tr>') + '</tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 3: Departments ───────────────────────────────────────────── */
  function renderDepartmentsTab() {
    var cards = DEPARTMENTS.map(function (d) {
      return [
        '<div class="zhr-card" style="margin-bottom:0;">',
        '  <div class="zhr-card-head">',
        '    <h3 class="zhr-card-title"><span style="color:' + d.color + ';">●</span> ' + d.name + '</h3>',
        '    <span class="zhr-pill zhr-pill-info">' + d.count + ' Staff</span>',
        '  </div>',
        '  <div style="font-size:13px;color:#475569;margin-bottom:12px;">',
        '    <div><strong>Department Lead:</strong> ' + d.lead + '</div>',
        '    <div><strong>Monthly Budget:</strong> ' + d.budget + '</div>',
        '    <div><strong>Attendance Rate:</strong> <span style="color:#16a34a;font-weight:600;">' + d.attendance + '</span></div>',
        '    <div><strong>Open Vacancies:</strong> <span style="color:#2563eb;font-weight:600;">' + d.vacancies + ' Open Roles</span></div>',
        '  </div>',
        '  <button class="zhr-btn zhr-btn-secondary" style="width:100%;justify-content:center;" onclick="ZenveHRDashboard.filterDept(\'' + d.name.split(' ')[0] + '\');">View Department Staff</button>',
        '</div>'
      ].join('');
    }).join('');

    return '<div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(320px, 1fr));gap:20px;">' + (cards || '<div class="zhr-card" style="padding:36px;text-align:center;color:#94a3b8;grid-column:1 / -1;">No department records found</div>') + '</div>';
  }

  /* ── Tab 4: Performance ───────────────────────────────────────────── */
  function renderPerformanceTab() {
    return [
      '<div class="zhr-card">',
      '  <div class="zhr-card-head"><h3 class="zhr-card-title">⭐ Employee Performance Scorecards (Q3)</h3></div>',
      '  <div class="zhr-table-wrap">',
      '    <table class="zhr-table">',
      '      <thead><tr><th>Employee</th><th>Department</th><th>Role</th><th>OKRs Achieved</th><th>Client / Patient Rating</th><th>Appraisal Readiness</th></tr></thead>',
      '      <tbody>',
      '        <tr><td colspan="6" style="text-align:center;padding:36px 16px;color:#94a3b8;">No appraisal scorecards found</td></tr>',
      '      </tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 5: Targets ───────────────────────────────────────────────── */
  function renderTargetsTab() {
    return [
      '<div class="zhr-card">',
      '  <div class="zhr-card-head"><h3 class="zhr-card-title">🎯 Monthly Division Targets &amp; KPI Milestones</h3></div>',
      '  <div class="zhr-table-wrap">',
      '    <table class="zhr-table">',
      '      <thead><tr><th>Division</th><th>Target Metric</th><th>Current Achievement</th><th>Pacing</th><th>Status</th></tr></thead>',
      '      <tbody>',
      '        <tr><td colspan="5" style="text-align:center;padding:36px 16px;color:#94a3b8;">No quota targets found</td></tr>',
      '      </tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 6: Productivity ─────────────────────────────────────────── */
  function renderProductivityTab() {
    return [
      '<div class="zhr-card">',
      '  <div class="zhr-card-head"><h3 class="zhr-card-title">📈 Staff Productivity &amp; Output Indices</h3></div>',
      '  <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:16px;margin-bottom:20px;">',
      '    <div class="zhr-kpi-card"><div class="zhr-kpi-label">Avg Consults / Vet</div><div class="zhr-kpi-value">0.0 / day</div><div class="zhr-kpi-sub">Baseline hospital standard</div></div>',
      '    <div class="zhr-kpi-card"><div class="zhr-kpi-label">Rx Accuracy Rate</div><div class="zhr-kpi-value">0.0%</div><div class="zhr-kpi-sub">No errors recorded</div></div>',
      '    <div class="zhr-kpi-card"><div class="zhr-kpi-label">Deliveries / Rider</div><div class="zhr-kpi-value">0.0 / day</div><div class="zhr-kpi-sub">Turnaround baseline</div></div>',
      '  </div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 7: Attendance ────────────────────────────────────────────── */
  function renderAttendanceTab() {
    return [
      '<div class="zhr-card">',
      '  <div class="zhr-card-head"><h3 class="zhr-card-title">⏰ Live Biometric Attendance Monitoring</h3><span class="zhr-pill zhr-pill-info">0.0% Today Present</span></div>',
      '  <div class="zhr-table-wrap">',
      '    <table class="zhr-table">',
      '      <thead><tr><th>Employee</th><th>Department</th><th>Shift</th><th>Punch-In Time</th><th>Biometric Status</th></tr></thead>',
      '      <tbody>',
      '        <tr><td colspan="5" style="text-align:center;padding:36px 16px;color:#94a3b8;">No clock-in records found</td></tr>',
      '      </tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 8: Leaves ────────────────────────────────────────────────── */
  function renderLeavesTab() {
    var leaveRows = LEAVE_REQUESTS.map(function (l) {
      var actions = l.status === 'Pending'
        ? '<button type="button" class="zhr-btn zhr-btn-primary" style="height:26px;font-size:11px;padding:0 10px;" onclick="ZenveHRDashboard.approveLeave(\'' + l.id + '\');">Approve</button> ' +
          '<button type="button" class="zhr-btn zhr-btn-secondary" style="height:26px;font-size:11px;padding:0 10px;color:#dc2626;" onclick="ZenveHRDashboard.rejectLeave(\'' + l.id + '\');">Reject</button>'
        : '<span class="zhr-pill ' + (l.status === 'Approved' ? 'zhr-pill-success' : 'zhr-pill-danger') + '">' + l.status + '</span>';

      return [
        '<tr>',
        '  <td><strong>' + l.name + '</strong><br/><small style="color:#64748b;">' + l.role + '</small></td>',
        '  <td><span class="zhr-pill zhr-pill-info">' + l.type + '</span></td>',
        '  <td>' + l.dates + '<br/><small style="color:#64748b;">' + l.reason + '</small></td>',
        '  <td>' + l.bal + '</td>',
        '  <td style="text-align:right;">' + actions + '</td>',
        '</tr>'
      ].join('');
    }).join('');

    return [
      '<div class="zhr-card">',
      '  <div class="zhr-card-head"><h3 class="zhr-card-title">🏖️ Leave Applications &amp; Approvals</h3></div>',
      '  <div class="zhr-table-wrap">',
      '    <table class="zhr-table">',
      '      <thead><tr><th>Employee</th><th>Type</th><th>Dates / Reason</th><th>Balance</th><th style="text-align:right;">Decision</th></tr></thead>',
      '      <tbody>' + (leaveRows || '<tr><td colspan="5" style="text-align:center;padding:36px 16px;color:#94a3b8;">No pending leave authorizations found</td></tr>') + '</tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 9: Payroll ───────────────────────────────────────────────── */
  function renderPayrollTab() {
    return [
      '<div class="zhr-card">',
      '  <div class="zhr-card-head"><h3 class="zhr-card-title">💵 Monthly Salary &amp; CTC Disbursement Ledger</h3><button class="zhr-btn zhr-btn-primary" onclick="alert(\'✓ Payroll batch initialized for 0 employees.\');">Disburse Payroll</button></div>',
      '  <div class="zhr-table-wrap">',
      '    <table class="zhr-table">',
      '      <thead><tr><th>Employee</th><th>Department</th><th>Gross Monthly</th><th>PF &amp; TDS</th><th>Net Payable</th><th>Status</th></tr></thead>',
      '      <tbody>',
      '        <tr><td colspan="6" style="text-align:center;padding:36px 16px;color:#94a3b8;">No payroll records found</td></tr>',
      '      </tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 10: Salary Cost ──────────────────────────────────── */
  function renderSalaryCostTab() {
    return [
      '<div class="zhr-card">',
      '  <div class="zhr-card-head"><h3 class="zhr-card-title">💰 Organizational Salary Cost Breakdown</h3><span class="zhr-pill zhr-pill-info">Annualized ₹0</span></div>',
      '  <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(240px, 1fr));gap:16px;">',
      '    <div class="zhr-kpi-card"><div class="zhr-kpi-label">Clinical Dept CTC</div><div class="zhr-kpi-value">₹0 / mo</div><div class="zhr-kpi-sub">0 Staff</div></div>',
      '    <div class="zhr-kpi-card"><div class="zhr-kpi-label">Tech &amp; AI CTC</div><div class="zhr-kpi-value">₹0 / mo</div><div class="zhr-kpi-sub">0 Staff</div></div>',
      '    <div class="zhr-kpi-card"><div class="zhr-kpi-label">Logistics Fleet CTC</div><div class="zhr-kpi-value">₹0 / mo</div><div class="zhr-kpi-sub">0 Staff</div></div>',
      '    <div class="zhr-kpi-card"><div class="zhr-kpi-label">Pharmacy Operations</div><div class="zhr-kpi-value">₹0 / mo</div><div class="zhr-kpi-sub">0 Staff</div></div>',
      '  </div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 11: Recruitment ──────────────────────────────────────────── */
  function renderRecruitmentTab() {
    var jobRows = OPEN_JOBS.map(function (j) {
      return [
        '<tr>',
        '  <td><strong>' + j.title + '</strong><br/><small style="color:#64748b;">' + j.id + ' · ' + j.loc + '</small></td>',
        '  <td><span class="zhr-pill zhr-pill-info">' + j.dept + '</span></td>',
        '  <td>' + j.openings + ' Vacancies</td>',
        '  <td>' + j.applicants + ' Applicants (' + j.interview + ' in final interview)</td>',
        '  <td><span class="zhr-pill ' + (j.priority === 'Urgent' ? 'zhr-pill-danger' : 'zhr-pill-warning') + '">' + j.priority + '</span></td>',
        '  <td style="text-align:right;"><button class="zhr-btn zhr-btn-secondary" style="height:26px;font-size:11px;" onclick="alert(\'Candidate pipeline for ' + j.title + ' opened.\');">View Candidates</button></td>',
        '</tr>'
      ].join('');
    }).join('');

    return [
      '<div class="zhr-card">',
      '  <div class="zhr-card-head"><h3 class="zhr-card-title">📢 Talent Acquisition &amp; Active Job Postings</h3><button class="zhr-btn zhr-btn-primary" onclick="ZenveHRDashboard.showNewReqModal();">➕ Post Job Requisition</button></div>',
      '  <div class="zhr-table-wrap">',
      '    <table class="zhr-table">',
      '      <thead><tr><th>Position Title</th><th>Department</th><th>Openings</th><th>Candidate Pipeline</th><th>Priority</th><th style="text-align:right;">Action</th></tr></thead>',
      '      <tbody>' + (jobRows || '<tr><td colspan="6" style="text-align:center;padding:36px 16px;color:#94a3b8;">No job requisitions found</td></tr>') + '</tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 12: Onboarding ───────────────────────────────────────────── */
  function renderOnboardingTab() {
    return [
      '<div class="zhr-card">',
      '  <div class="zhr-card-head"><h3 class="zhr-card-title">🚀 New Joiner Onboarding Pacing</h3></div>',
      '  <div class="zhr-table-wrap">',
      '    <table class="zhr-table">',
      '      <thead><tr><th>New Joiner</th><th>Role</th><th>Start Date</th><th>Checklist Progress</th><th>IT Provisioning</th><th>Mentor</th></tr></thead>',
      '      <tbody>',
      '        <tr><td colspan="6" style="text-align:center;padding:36px 16px;color:#94a3b8;">No onboarding records found</td></tr>',
      '      </tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 13: Expenses ─────────────────────────────────────────────── */
  function renderExpensesTab() {
    var rows = EXPENSES.map(function (x) {
      return [
        '<tr>',
        '  <td><strong>' + x.name + '</strong><br/><small style="color:#64748b;">' + x.id + '</small></td>',
        '  <td>' + x.dept + '</td>',
        '  <td>' + x.category + '</td>',
        '  <td><strong>' + x.amount + '</strong></td>',
        '  <td>' + x.date + '</td>',
        '  <td><span class="zhr-pill ' + (x.status === 'Approved' ? 'zhr-pill-success' : 'zhr-pill-warning') + '">' + x.status + '</span></td>',
        '  <td style="text-align:right;"><button class="zhr-btn zhr-btn-secondary" style="height:26px;font-size:11px;" onclick="ZenveHRDashboard.approveExpense(\'' + x.id + '\');">' + (x.status === 'Pending' ? 'Approve Claim' : 'View Receipt') + '</button></td>',
        '</tr>'
      ].join('');
    }).join('');

    return [
      '<div class="zhr-card">',
      '  <div class="zhr-card-head"><h3 class="zhr-card-title">🧾 Employee Reimbursements &amp; Claims</h3></div>',
      '  <div class="zhr-table-wrap">',
      '    <table class="zhr-table">',
      '      <thead><tr><th>Employee</th><th>Department</th><th>Category</th><th>Amount</th><th>Date</th><th>Status</th><th style="text-align:right;">Action</th></tr></thead>',
      '      <tbody>' + (rows || '<tr><td colspan="7" style="text-align:center;padding:36px 16px;color:#94a3b8;">No employee expense records found</td></tr>') + '</tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  /* ── Event Listeners ──────────────────────────────────────────────── */
  function wireEvents() {
    // Tab switching
    root.querySelectorAll('.zhr-chip').forEach(function (btn) {
      btn.onclick = function () {
        var t = btn.getAttribute('data-tab');
        switchTab(t);
      };
    });

    // Close button
    var closeBtn = root.querySelector('#zhr-close-btn');
    if (closeBtn) {
      closeBtn.onclick = function () {
        close();
      };
    }

    // Onboard Staff button
    var addBtn = root.querySelector('#zhr-add-btn');
    if (addBtn) {
      addBtn.onclick = function () {
        showOnboardModal();
      };
    }

    // Sync button
    var syncBtn = root.querySelector('#zhr-sync-btn');
    if (syncBtn) {
      syncBtn.onclick = function () {
        syncBtn.innerHTML = '<span>⏳</span> Syncing...';
        setTimeout(function () {
          syncBtn.innerHTML = '<span>✓</span> HRIS Synced';
          showToast('Zenve HRIS master records synced with biometric clocks.');
          setTimeout(function () {
            syncBtn.innerHTML = '<span>🔄</span> Sync HRIS';
          }, 2000);
        }, 800);
      };
    }
  }

  function wireTabSpecificEvents() {
    // Search input in directory
    var searchInp = root.querySelector('#zhr-dir-search');
    if (searchInp) {
      searchInp.oninput = function () {
        S.searchQuery = searchInp.value;
        renderTabContent();
        // Restore focus
        var newInp = root.querySelector('#zhr-dir-search');
        if (newInp) {
          newInp.focus();
          newInp.setSelectionRange(newInp.value.length, newInp.value.length);
        }
      };
    }

    // Department select in directory
    var deptSel = root.querySelector('#zhr-dir-dept');
    if (deptSel) {
      deptSel.onchange = function () {
        S.deptFilter = deptSel.value;
        renderTabContent();
      };
    }
  }

  /* ── Modals & Actions ─────────────────────────────────────────────── */
  function showOnboardModal() {
    var modal = document.createElement('div');
    modal.className = 'zhr-modal-backdrop';
    modal.innerHTML = [
      '<div class="zhr-modal-box">',
      '  <div class="zhr-modal-head">',
      '    <h3>➕ Onboard New Staff Member</h3>',
      '    <button type="button" class="zhr-close-btn" id="m-close">✕</button>',
      '  </div>',
      '  <div class="zhr-modal-body">',
      '    <div class="zhr-form-group"><label class="zhr-label">Full Name</label><input class="zhr-input" id="m-name" placeholder="e.g. Dr. Sunita Sen" required></div>',
      '    <div class="zhr-form-group"><label class="zhr-label">Role / Designation</label><input class="zhr-input" id="m-role" placeholder="e.g. Senior Surgeon" required></div>',
      '    <div class="zhr-form-group"><label class="zhr-label">Department</label><select class="zhr-select" id="m-dept" style="width:100%;"><option value="Clinical">Clinical</option><option value="Pharmacy">Pharmacy</option><option value="Logistics">Logistics</option><option value="Warehouse">Warehouse</option><option value="Technology">Technology</option><option value="Customer Delight">Customer Delight</option></select></div>',
      '    <div class="zhr-form-group"><label class="zhr-label">Facility Location</label><input class="zhr-input" id="m-loc" placeholder="e.g. Bengaluru Flagship" required></div>',
      '  </div>',
      '  <div class="zhr-modal-foot">',
      '    <button type="button" class="zhr-btn zhr-btn-secondary" id="m-cancel">Cancel</button>',
      '    <button type="button" class="zhr-btn zhr-btn-primary" id="m-save">Save Staff</button>',
      '  </div>',
      '</div>'
    ].join('');
    document.body.appendChild(modal);

    function closeM() { modal.remove(); }
    modal.querySelector('#m-close').onclick = closeM;
    modal.querySelector('#m-cancel').onclick = closeM;
    modal.querySelector('#m-save').onclick = function () {
      var name = document.getElementById('m-name').value;
      var role = document.getElementById('m-role').value;
      var dept = document.getElementById('m-dept').value;
      var loc = document.getElementById('m-loc').value;
      if (!name || !role) { alert('Please enter staff name and designation.'); return; }

      EMPLOYEES.unshift({
        id: 'EMP-' + (1000 + EMPLOYEES.length + 1),
        name: name,
        role: role,
        dept: dept,
        loc: loc || 'HQ Flagship',
        email: name.toLowerCase().replace(/[^a-z]/g, '.') + '@zenve.in',
        phone: '+91 98000 00000',
        joined: 'Today',
        status: 'Active',
        salary: '₹85,000/mo',
        rating: '5.0★'
      });
      showToast('Staff member ' + name + ' onboarded.');
      closeM();
      S.tab = 'directory';
      render();
    };
  }

  function showNewReqModal() {
    var title = prompt('Enter new position title:');
    if (title) {
      OPEN_JOBS.unshift({
        id: 'REQ-' + Math.floor(100 + Math.random() * 900),
        title: title,
        dept: 'Clinical',
        loc: 'Bengaluru Flagship',
        openings: 1,
        applicants: 0,
        interview: 0,
        priority: 'High'
      });
      showToast('Position "' + title + '" posted to career portal.');
      renderTabContent();
    }
  }

  function viewStaff(id) {
    var s = EMPLOYEES.find(function (e) { return e.id === id; });
    if (!s) return;
    alert('👤 Staff Profile 360°:\n\n' +
      'ID: ' + s.id + '\n' +
      'Name: ' + s.name + '\n' +
      'Role: ' + s.role + '\n' +
      'Department: ' + s.dept + '\n' +
      'Facility: ' + s.loc + '\n' +
      'Contact: ' + s.email + ' | ' + s.phone + '\n' +
      'Joining Date: ' + s.joined + '\n' +
      'Monthly CTC: ' + s.salary + '\n' +
      'Performance Rating: ' + s.rating + '\n' +
      'Status: ' + s.status
    );
  }

  function approveLeave(id) {
    LEAVE_REQUESTS.forEach(function (l) {
      if (l.id === id) l.status = 'Approved';
    });
    showToast('Leave request ' + id + ' approved.');
    renderTabContent();
  }

  function rejectLeave(id) {
    LEAVE_REQUESTS.forEach(function (l) {
      if (l.id === id) l.status = 'Rejected';
    });
    showToast('Leave request ' + id + ' rejected.');
    renderTabContent();
  }

  function approveExpense(id) {
    EXPENSES.forEach(function (x) {
      if (x.id === id) x.status = 'Approved';
    });
    showToast('Expense claim ' + id + ' approved for reimbursement.');
    renderTabContent();
  }

  function filterDept(dept) {
    S.deptFilter = dept;
    switchTab('directory');
  }

  /* ── Navigation & Control ─────────────────────────────────────────── */
  function open(tab) {
    closeOthers();
    init();
    if (tab) S.tab = tab;
    S.open = true;
    render();
    root.classList.add('zpanel-open');
    var targetHash = (MODULES.find(function(m){ return m.id === S.tab; }) || {}).hash || '#hr-dashboard';
    if (window.location.hash !== targetHash) {
      try { history.pushState(null, '', targetHash); } catch (e) { window.location.hash = targetHash; }
    }
  }

  function close() {
    if (root) root.classList.remove('zpanel-open');
    S.open = false;
    if (window.location.hash.startsWith('#hr-') || window.location.hash.startsWith('#employee-') || window.location.hash === '#attendance' || window.location.hash === '#departments' || window.location.hash === '#payroll' || window.location.hash === '#recruitment' || window.location.hash === '#onboarding' || window.location.hash === '#all-employees') {
      try { history.pushState(null, '', window.location.pathname + window.location.search); } catch (e) {}
    }
  }

  function switchTab(tab) {
    if (!tab) return;
    S.tab = tab;
    var targetHash = (MODULES.find(function(m){ return m.id === tab; }) || {}).hash || '#hr-dashboard';
    if (window.location.hash !== targetHash) {
      try { history.pushState(null, '', targetHash); } catch (e) { window.location.hash = targetHash; }
    }
    render();
  }

  function init() {
    root = document.getElementById('zhr-dashboard-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'zhr-dashboard-root';
      root.className = 'zpanel-root zhr-root';
      document.body.appendChild(root);
    }
  }

  /* ── Interceptor for Sidebar ──────────────────────────────────────── */
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;

    // Never intercept accordion group headers or search input
    if (t.closest('[aria-expanded]') || t.closest('button[aria-expanded]') || t.closest('[aria-label="Search menu"]')) return;

    var item = t.closest('button, [data-go], a, [role="button"], li');
    if (item && item.textContent) {
      var tab = tabFromText(item.textContent);
      if (tab) {
        if (!t.closest('#zhr-dashboard-root')) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          open(tab);
        }
      }
    }
  }, true);

  // Keyboard Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && S.open) close();
  });

  // Hashchange Listener
  window.addEventListener('hashchange', function () {
    var tab = tabFromHash(window.location.hash);
    if (tab) {
      open(tab);
    } else if (S.open && !window.location.hash.startsWith('#hr') && !window.location.hash.startsWith('#employee') && !window.location.hash.startsWith('#all-employees') && !window.location.hash.startsWith('#departments') && !window.location.hash.startsWith('#attendance') && !window.location.hash.startsWith('#payroll') && !window.location.hash.startsWith('#recruitment') && !window.location.hash.startsWith('#onboarding')) {
      close();
    }
  });

  /* ── Export Global API ────────────────────────────────────────────── */
  window.ZenveHRDashboard = {
    open: open,
    close: close,
    switchTab: switchTab,
    showOnboardModal: showOnboardModal,
    showNewReqModal: showNewReqModal,
    viewStaff: viewStaff,
    approveLeave: approveLeave,
    rejectLeave: rejectLeave,
    approveExpense: approveExpense,
    filterDept: filterDept
  };

  /* ── Boot ─────────────────────────────────────────────────────────── */
  function boot() {
    init();
    var initialTab = tabFromHash(window.location.hash);
    if (initialTab) {
      setTimeout(function () { open(initialTab); }, 200);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();