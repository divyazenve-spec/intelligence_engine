/* =====================================================================
   Zenve BI — Enterprise Settings & Governance Suite
   Comprehensive Interactive Controller for 14 Settings Modules:
     1. Company Settings
     2. Business Units
     3. Locations
     4. Users
     5. Roles & Permissions
     6. Approval Workflows
     7. Notification Settings
     8. Dashboard Settings
     9. Tax Settings
     10. Payment Settings
     11. Delivery Settings
     12. API & Integrations
     13. Security
     14. Backup & Recovery
   ===================================================================== */

(function () {
  'use strict';

  /* ── Modules Configuration ───────────────────────────────────────── */
  var MODULES = [
    // Organization
    { id: 'company', label: 'Company Settings', group: 'Organization', icon: '🏢', hash: '#company-settings' },
    { id: 'units', label: 'Business Units', group: 'Organization', icon: '🏛️', hash: '#business-units' },
    { id: 'locations', label: 'Locations', group: 'Organization', icon: '📍', hash: '#locations' },
    // Access & Governance
    { id: 'users', label: 'Users', group: 'Access & Governance', icon: '👥', hash: '#users' },
    { id: 'roles', label: 'Roles & Permissions', group: 'Access & Governance', icon: '🛡️', hash: '#roles-permissions' },
    { id: 'workflows', label: 'Approval Workflows', group: 'Access & Governance', icon: '📋', hash: '#approval-workflows' },
    // System & Portal
    { id: 'notifications', label: 'Notification Settings', group: 'System & Portal', icon: '🔔', hash: '#notification-settings' },
    { id: 'dashboard-settings', label: 'Dashboard Settings', group: 'System & Portal', icon: '📊', hash: '#dashboard-settings' },
    // Commerce & Operations
    { id: 'tax', label: 'Tax Settings', group: 'Commerce & Operations', icon: '🧾', hash: '#tax-settings' },
    { id: 'payments', label: 'Payment Settings', group: 'Commerce & Operations', icon: '💳', hash: '#payment-settings' },
    { id: 'delivery', label: 'Delivery Settings', group: 'Commerce & Operations', icon: '🚚', hash: '#delivery-settings' },
    // Security & DevOps
    { id: 'integrations', label: 'API & Integrations', group: 'Security & DevOps', icon: '🔌', hash: '#api-integrations' },
    { id: 'security', label: 'Security', group: 'Security & DevOps', icon: '🔐', hash: '#security' },
    { id: 'backup', label: 'Backup & Recovery', group: 'Security & DevOps', icon: '💾', hash: '#backup-recovery' }
  ];

  /* ── In-Memory Settings State ────────────────────────────────────── */
  var S = {
    open: false,
    activeTab: 'company',
    searchQuery: '',
    company: {
      name: 'Zenve Healthcare Technologies India Pvt. Ltd.',
      brand: 'Zenve Pets Healthcare',
      cin: 'U85100KA2023PTC174829',
      gstin: '29AAAAZ0000A1Z5',
      pan: 'AABCZ1234D',
      email: 'corporate@zenve.in',
      supportPhone: '+91 80 4719 3200',
      address: 'Plot 42, 80 Feet Road, 4th Block, Koramangala, Bengaluru, Karnataka 560034',
      currency: 'INR (₹)',
      fyStart: 'April 1',
      timezone: 'Asia/Kolkata (IST +5:30)',
      drugLicense: 'KA-BNG-2023-DL-94812 (Form 20B/21B)',
      vciAccreditation: 'VCI-2024-TN884 (Telemedicine Certified)',
      bioWasteAuth: 'KSPCB/BMW/2023/8821'
    },
    units: [],
    locations: [],
    users: [],
    roles: [
      { name: 'Super Administrator', desc: 'Full root access to all system configurations and clinical logs', users: 3 },
      { name: 'Clinical Director & CMO', desc: 'Medical governance, prescription approval, surgical scheduling, clinical audits', users: 2 },
      { name: 'Senior Veterinarian', desc: 'Patient diagnosis, prescriptions, teleconsultations, medical records', users: 18 },
      { name: 'Operations & Dispatch Lead', desc: 'Order fulfillment, rider assignment, 60-min delivery SLAs, inventory transfers', users: 12 },
      { name: 'Head Pharmacist', desc: 'Schedule-X drug dispensing, batch tracking, expiry audits, stock entry', users: 6 },
      { name: 'Financial Auditor', desc: 'Tax computation, P&L reporting, refunds, ledger reconciliation, payout approvals', users: 4 }
    ],
    permissions: [
      { module: 'Clinical Patient Records (EHR)', view: true, create: true, edit: true, del: false, exp: true, app: true },
      { module: 'Veterinary Prescriptions (Rx)', view: true, create: true, edit: true, del: false, exp: true, app: true },
      { module: 'Orders & 60-Min Delivery Command', view: true, create: true, edit: true, del: false, exp: true, app: true },
      { module: 'Cold-Chain Pharmacy & Batch Inventory', view: true, create: true, edit: true, del: false, exp: true, app: true },
      { module: 'Financial Ledgers & Tax Reports', view: true, create: false, edit: false, del: false, exp: true, app: true },
      { module: 'User Management & Security Access', view: true, create: true, edit: true, del: true, exp: true, app: true },
      { module: 'System API & Webhook Configuration', view: true, create: true, edit: true, del: false, exp: true, app: true }
    ],
    workflows: [
      { id: 'WF-01', name: 'High-Value Customer Refund (> ₹5,000)', trigger: 'Refund Request', steps: 'Care Coordinator → Ops Manager → Finance Lead', timeout: '4 Hours', status: 'Active' },
      { id: 'WF-02', name: 'Controlled Narcotic / Schedule-X Dispense', trigger: 'Rx Written', steps: 'Consulting Vet → CMO Dual Sign-Off', timeout: 'Immediate (30m)', status: 'Active' },
      { id: 'WF-03', name: 'Purchase Order Issuance (> ₹1,00,000)', trigger: 'PO Created', steps: 'Procurement Specialist → CFO Approval', timeout: '12 Hours', status: 'Active' },
      { id: 'WF-04', name: 'Cold-Chain Spoilage / Expired Stock Write-off', trigger: 'Quality Breach', steps: 'Warehouse Manager → QA Lead → CFO', timeout: '6 Hours', status: 'Active' },
      { id: 'WF-05', name: 'Breeder / Commercial VIP Discount (> 20%)', trigger: 'Cart Override', steps: 'Sales Manager → Head of Commercial', timeout: '2 Hours', status: 'Active' }
    ],
    pendingApprovals: [],
    notifications: {
      whatsapp: true,
      sms: true,
      email: true,
      push: true,
      orderConfirm: true,
      expressDispatch: true,
      appointmentReminders: true,
      rxReady: true,
      lowStockAlert: true,
      dailyDigest: true,
      securityAlert: true
    },
    dashboardSettings: {
      defaultLanding: 'Executive Control Center',
      refreshInterval: '30s',
      boardroomPrivacy: false,
      theme: 'Dark Nebula',
      showKpis: true,
      highPrecisionNumbers: true
    },
    taxes: [
      { category: 'Veterinary Medical Consultations & Surgeries', code: 'SAC 998351', gst: '0% (Exempt)', cgst: '0%', sgst: '0%', igst: '0%' },
      { category: 'Veterinary Pharmaceuticals & Antibiotics', code: 'HSN 3004', gst: '12%', cgst: '6%', sgst: '6%', igst: '12%' },
      { category: 'Pet Nutrition & Complete Diets (Dry/Wet)', code: 'HSN 2309', gst: '18%', cgst: '9%', sgst: '9%', igst: '18%' },
      { category: 'Pet Accessories, Collars, Leashes & Beds', code: 'HSN 4201', gst: '18%', cgst: '9%', sgst: '9%', igst: '18%' },
      { category: 'Diagnostic Pathology & Radiology Tests', code: 'SAC 9993', gst: '0% (Exempt)', cgst: '0%', sgst: '0%', igst: '0%' }
    ],
    payments: {
      primaryGateway: 'Razorpay Enterprise',
      secondaryGateway: 'Cashfree Payments',
      internationalGateway: 'Stripe Global',
      upiAutoPay: true,
      codEnabled: true,
      maxCodValue: '₹3,000',
      settlementAccount: 'HDFC Bank Ltd. · AC: 00492000019284 · IFSC: HDFC0000049'
    },
    delivery: {
      expressRadiusKm: 4.8,
      expressSlaMins: 60,
      dispatchThresholdMins: 4,
      freeDeliveryMinOrder: 499,
      standardDeliveryFee: 49,
      coldChainEnforced: true,
      primaryFleet: 'Zenve Dedicated Express Fleet (68 active riders)',
      secondaryFleet: 'Shadowfax Logistics Spillover'
    },
    integrations: [
      { name: 'Electronic Health Record (EHR) PMS Sync', type: 'Clinical API', status: 'Online', uptime: '99.98%', lastSync: '2m ago' },
      { name: 'Tally Prime / Zoho Books Financial Sync', type: 'ERP Finance', status: 'Online', uptime: '99.95%', lastSync: '14m ago' },
      { name: 'WhatsApp Business Cloud API (Gupshup)', type: 'Omnichannel Comm', status: 'Online', uptime: '100%', lastSync: '1m ago' },
      { name: 'Firebase Cloud Messaging (FCM Mobile Push)', type: 'Mobile Notification', status: 'Online', uptime: '99.99%', lastSync: 'Just now' },
      { name: 'LIMS Lab Equipment Automated Analyzers', type: 'Pathology Diagnostics', status: 'Online', uptime: '99.92%', lastSync: '8m ago' }
    ],
    security: {
      mfaEnforced: true,
      ssoGoogle: true,
      ssoAzure: true,
      sessionTimeoutMins: 15,
      ipWhitelist: '103.21.144.0/24 (Bangalore Hospital), 14.143.12.18 (Mumbai Surgical)',
      auditLogsRetentionDays: 365,
      activeSessions: [
        { device: 'MacBook Pro 16" (macOS 14.5)', browser: 'Chrome 126.0', ip: '103.21.144.12', location: 'Bengaluru, India', time: 'Active now', current: true },
        { device: 'iPad Pro 12.9" (iPadOS 17.5)', browser: 'Safari Mobile', ip: '103.21.144.45', location: 'Bengaluru Clinic Floor', time: '18m ago', current: false },
        { device: 'Windows 11 Workstation', browser: 'Edge 126.0', ip: '14.143.12.18', location: 'Mumbai Surgical Desk', time: '1h ago', current: false }
      ]
    },
    backup: {
      primaryRegion: 'AWS Mumbai (ap-south-1)',
      secondaryRegion: 'AWS Hyderabad (ap-south-2)',
      rpo: '< 2 Minutes',
      rto: '< 10 Minutes',
      pitrRetention: '35 Days',
      snapshots: [
        { id: 'SNAP-2024-1005-0400', date: 'Today, 04:00 AM', size: '4.82 GB', type: 'Automated Daily WAL', checksum: 'sha256:7f9a8b1...', status: 'Verified' },
        { id: 'SNAP-2024-1004-0400', date: 'Oct 04, 04:00 AM', size: '4.78 GB', type: 'Automated Daily WAL', checksum: 'sha256:2b1c4e9...', status: 'Verified' },
        { id: 'SNAP-2024-1003-0400', date: 'Oct 03, 04:00 AM', size: '4.75 GB', type: 'Automated Daily WAL', checksum: 'sha256:9c8d3f2...', status: 'Verified' },
        { id: 'SNAP-2024-1002-0400', date: 'Oct 02, 04:00 AM', size: '4.71 GB', type: 'Automated Daily WAL', checksum: 'sha256:4a5f6e8...', status: 'Verified' }
      ]
    }
  };

  var root = null;

  /* ── Helpers ─────────────────────────────────────────────────────── */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function showToast(msg) {
    var old = document.querySelector('.zset-toast');
    if (old) old.remove();
    var toast = document.createElement('div');
    toast.className = 'zset-toast';
    toast.innerHTML = '<span>⚡</span> <span>' + esc(msg) + '</span>';
    document.body.appendChild(toast);
    setTimeout(function () {
      toast.style.transition = 'opacity 0.3s ease';
      toast.style.opacity = '0';
      setTimeout(function () { if (toast.parentNode) toast.remove(); }, 300);
    }, 2800);
  }

  /* ── Tab Finders ─────────────────────────────────────────────────── */
  function tabFromText(text) {
    if (!text) return null;
    var s = text.trim().toLowerCase();
    if (s.indexOf('company settings') >= 0 || s === 'company') return 'company';
    if (s.indexOf('business unit') >= 0 || s === 'units') return 'units';
    if (s === 'locations' || s === 'location' || s === 'all locations' || s === 'facility locations') {
      if (s.indexOf('revenue') >= 0) return null;
      return 'locations';
    }
    if (s === 'users' || s === 'all users' || s === 'user management' || s === 'system users') return 'users';
    if (s.indexOf('role') >= 0 || s.indexOf('permission') >= 0) return 'roles';
    if (s.indexOf('approval') >= 0 || s.indexOf('workflow') >= 0) return 'workflows';
    if (s.indexOf('notification') >= 0 && (s.indexOf('setting') >= 0 || s.indexOf('channel') >= 0 || s === 'notification settings')) return 'notifications';
    if (s.indexOf('dashboard settings') >= 0 || s === 'dashboard setting') return 'dashboard-settings';
    if (s.indexOf('tax settings') >= 0 || s === 'tax setting' || s === 'taxes' || s === 'tax') return 'tax';
    if (s.indexOf('payment settings') >= 0 || s === 'payment setting' || (s.indexOf('payment') >= 0 && s.indexOf('setting') >= 0)) return 'payments';
    if (s.indexOf('delivery settings') >= 0 || s === 'delivery setting' || (s.indexOf('delivery') >= 0 && s.indexOf('setting') >= 0)) return 'delivery';
    if (s.indexOf('api & integrations') >= 0 || s.indexOf('api and integrations') >= 0 || s === 'api' || s === 'integrations' || s === 'api settings') return 'integrations';
    if (s === 'security' || s === 'security settings' || s.indexOf('security setting') >= 0) return 'security';
    if (s.indexOf('backup & recovery') >= 0 || s.indexOf('backup and recovery') >= 0 || s === 'backup' || s === 'backups' || s.indexOf('backup') >= 0) return 'backup';
    if (s === 'settings') return 'company';
    return null;
  }

  function tabFromHash(hash) {
    if (!hash) return null;
    var clean = (hash.startsWith('#') ? hash : '#' + hash).toLowerCase().trim();
    for (var i = 0; i < MODULES.length; i++) {
      if (MODULES[i].hash === clean || clean === '#' + MODULES[i].id) {
        return MODULES[i].id;
      }
    }
    if (clean === '#settings' || clean === '#settings-dashboard') return 'company';
    return null;
  }

  function hashFromTab(tab) {
    var mod = MODULES.find(function (m) { return m.id === tab; });
    return mod ? mod.hash : '#company-settings';
  }

  /* ── Shell Renderer ──────────────────────────────────────────────── */
  function renderShell() {
    if (!root) {
      root = document.createElement('div');
      root.id = 'zset-root';
      document.body.appendChild(root);
    }

    var curMod = MODULES.find(function (m) { return m.id === S.activeTab; }) || MODULES[0];

    // Build horizontal top subnav bar with 14 chips
    var subnavHtml = MODULES.map(function (it) {
      var activeCls = (it.id === S.activeTab) ? ' active' : '';
      return '<button type="button" class="zset-tab-chip' + activeCls + '" data-set-tab="' + it.id + '" id="zset-chip-' + it.id + '">' +
        '<span class="zset-tab-chip-icon">' + it.icon + '</span>' +
        '<span>' + esc(it.label) + '</span>' +
        '</button>';
    }).join('');

    root.innerHTML = [
      '<!-- Top Executive Header -->',
      '<header class="zset-header">',
        '<div class="zset-header-left">',
          '<div class="zset-brand-badge">⚙️</div>',
          '<div class="zset-title-group">',
            '<div class="zset-title-row">',
              '<h2 class="zset-main-title">Settings & Governance Control Center</h2>',
              '<span class="zset-env-pill">Production · Active</span>',
            '</div>',
            '<div class="zset-breadcrumbs">',
              '<span>Zenve System</span>',
              '<span>/</span>',
              '<span>' + esc(curMod.group) + '</span>',
              '<span>/</span>',
              '<span class="active">' + esc(curMod.label) + '</span>',
            '</div>',
          '</div>',
        '</div>',
        '<div class="zset-header-actions">',
          '<button type="button" class="zset-btn zset-btn-primary" id="zset-save-all-btn">',
            '<span>💾</span> Save Changes',
          '</button>',
          '<button type="button" class="zset-close-btn" id="zset-close-btn" title="Close Settings (Esc)">✕</button>',
        '</div>',
      '</header>',

      '<!-- Sticky Horizontal Subnav Bar (Replaces Inner Left Rail) -->',
      '<nav class="zset-subnav-bar" id="zset-subnav">',
        subnavHtml,
      '</nav>',

      '<!-- Full-Width Content Canvas (Using div to avoid global main margin pollution) -->',
      '<div class="zset-body" id="zset-pane">',
        renderTabContent(S.activeTab),
      '</div>'
    ].join('');

    wireEvents();
  }

  /* ── Tab Content Dispatcher ──────────────────────────────────────── */
  function renderTabContent(tab) {
    switch (tab) {
      case 'company': return renderCompany();
      case 'units': return renderBusinessUnits();
      case 'locations': return renderLocations();
      case 'users': return renderUsers();
      case 'roles': return renderRolesPermissions();
      case 'workflows': return renderApprovalWorkflows();
      case 'notifications': return renderNotifications();
      case 'dashboard-settings': return renderDashboardSettings();
      case 'tax': return renderTaxes();
      case 'payments': return renderPayments();
      case 'delivery': return renderDelivery();
      case 'integrations': return renderIntegrations();
      case 'security': return renderSecurity();
      case 'backup': return renderBackup();
      default: return renderCompany();
    }
  }

  /* ── Tab 1: Company Settings ─────────────────────────────────────── */
  function renderCompany() {
    var c = S.company;
    return [
      '<div class="zset-tab-header">',
        '<div>',
          '<h3 class="zset-tab-title">Company Settings & Statutory Profile</h3>',
          '<p class="zset-tab-desc">Enterprise identity, statutory registration, drug licenses, and financial standards governing Zenve Healthcare.</p>',
        '</div>',
      '</div>',

      '<div class="zset-card">',
        '<div class="zset-card-header">',
          '<h4 class="zset-card-title">🏢 Legal Entity & Corporate Registration</h4>',
          '<span class="zset-badge zset-badge-success">MCA Verified</span>',
        '</div>',
        '<div class="zset-grid-2">',
          '<div class="zset-form-group">',
            '<label class="zset-label">Legal Entity Name</label>',
            '<input class="zset-input" id="inp-comp-name" value="' + esc(c.name) + '">',
          '</div>',
          '<div class="zset-form-group">',
            '<label class="zset-label">Consumer Brand Identity</label>',
            '<input class="zset-input" id="inp-comp-brand" value="' + esc(c.brand) + '">',
          '</div>',
          '<div class="zset-form-group">',
            '<label class="zset-label">Corporate Identification Number (CIN)</label>',
            '<input class="zset-input font-mono" id="inp-comp-cin" value="' + esc(c.cin) + '">',
          '</div>',
          '<div class="zset-form-group">',
            '<label class="zset-label">Permanent Account Number (PAN)</label>',
            '<input class="zset-input font-mono" id="inp-comp-pan" value="' + esc(c.pan) + '">',
          '</div>',
          '<div class="zset-form-group" style="grid-column: span 2;">',
            '<label class="zset-label">Registered Corporate Address</label>',
            '<input class="zset-input" id="inp-comp-addr" value="' + esc(c.address) + '">',
          '</div>',
        '</div>',
      '</div>',

      '<div class="zset-card">',
        '<div class="zset-card-header">',
          '<h4 class="zset-card-title">🩺 Healthcare Licenses & Board Accreditations</h4>',
          '<span class="zset-badge zset-badge-info">Clinical Compliant</span>',
        '</div>',
        '<div class="zset-grid-3">',
          '<div class="zset-form-group">',
            '<label class="zset-label">Retail/Wholesale Drug License</label>',
            '<input class="zset-input font-mono" id="inp-comp-dl" value="' + esc(c.drugLicense) + '">',
            '<div class="zset-help-text">Form 20B/21B valid till 2028</div>',
          '</div>',
          '<div class="zset-form-group">',
            '<label class="zset-label">Veterinary Council Accreditation</label>',
            '<input class="zset-input font-mono" id="inp-comp-vci" value="' + esc(c.vciAccreditation) + '">',
            '<div class="zset-help-text">Telemedicine practice authorized</div>',
          '</div>',
          '<div class="zset-form-group">',
            '<label class="zset-label">Bio-Medical Waste Authorization</label>',
            '<input class="zset-input font-mono" id="inp-comp-bmw" value="' + esc(c.bioWasteAuth) + '">',
            '<div class="zset-help-text">State Pollution Control Board</div>',
          '</div>',
        '</div>',
      '</div>',

      '<div class="zset-card">',
        '<div class="zset-card-header">',
          '<h4 class="zset-card-title">🌐 Fiscal & Localization Standards</h4>',
        '</div>',
        '<div class="zset-grid-3">',
          '<div class="zset-form-group">',
            '<label class="zset-label">Base Operating Currency</label>',
            '<input class="zset-input" value="' + esc(c.currency) + '" disabled>',
          '</div>',
          '<div class="zset-form-group">',
            '<label class="zset-label">Financial Year Cycle</label>',
            '<input class="zset-input" value="' + esc(c.fyStart) + ' - March 31" disabled>',
          '</div>',
          '<div class="zset-form-group">',
            '<label class="zset-label">System Timezone</label>',
            '<input class="zset-input font-mono" value="' + esc(c.timezone) + '" disabled>',
          '</div>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 2: Business Units ───────────────────────────────────────── */
  function renderBusinessUnits() {
    var rows = S.units.map(function (u) {
      return '<tr>' +
        '<td class="font-mono" style="font-weight:600;color:#38bdf8;">' + esc(u.id) + '</td>' +
        '<td><strong>' + esc(u.name) + '</strong><br><small style="color:#64748b;">' + esc(u.code) + '</small></td>' +
        '<td>' + esc(u.lead) + '</td>' +
        '<td class="font-mono">' + esc(u.staff) + ' Members</td>' +
        '<td class="font-mono" style="font-weight:600;color:#10b981;">' + esc(u.revenue) + '</td>' +
        '<td><span class="zset-badge zset-badge-success">' + esc(u.status) + '</span></td>' +
      '</tr>';
    }).join('');

    return [
      '<div class="zset-tab-header">',
        '<div>',
          '<h3 class="zset-tab-title">Business Units & Divisions</h3>',
          '<p class="zset-tab-desc">Organizational cost centers, vertical heads, and P&L allocations across hospitals, telemedicine, pharmacy, and lifestyle.</p>',
        '</div>',
        '<button type="button" class="zset-btn zset-btn-primary" id="btn-add-unit">+ Add Business Unit</button>',
      '</div>',

      '<div class="zset-kpi-row">',
        '<div class="zset-kpi-card"><div class="zset-kpi-lbl">Total Divisions</div><div class="zset-kpi-val">5 Operating Units</div></div>',
        '<div class="zset-kpi-card"><div class="zset-kpi-lbl">Total Workforce</div><div class="zset-kpi-val font-mono">245 Staff</div></div>',
        '<div class="zset-kpi-card"><div class="zset-kpi-lbl">Consolidated Revenue Run-Rate</div><div class="zset-kpi-val font-mono" style="color:#10b981;">₹2.05 Cr / mo</div></div>',
      '</div>',

      '<div class="zset-card">',
        '<div class="zset-table-wrap">',
          '<table class="zset-table">',
            '<thead><tr><th>Unit ID</th><th>Division Name & Code</th><th>Division Lead</th><th>Staff</th><th>Run-Rate</th><th>Status</th></tr></thead>',
            '<tbody>' + rows + '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 3: Locations ────────────────────────────────────────────── */
  function renderLocations() {
    var q = S.searchQuery.toLowerCase();
    var filtered = S.locations.filter(function (loc) {
      return !q || (loc.name + ' ' + loc.city + ' ' + loc.type + ' ' + loc.area).toLowerCase().indexOf(q) >= 0;
    });

    var rows = filtered.map(function (loc) {
      return '<tr>' +
        '<td class="font-mono" style="color:#38bdf8;font-weight:600;">' + esc(loc.id) + '</td>' +
        '<td><strong>' + esc(loc.name) + '</strong><br><small style="color:#94a3b8;">' + esc(loc.area) + '</small></td>' +
        '<td><span class="zset-badge zset-badge-info">' + esc(loc.type) + '</span></td>' +
        '<td>' + esc(loc.city) + '</td>' +
        '<td class="font-mono">' + esc(loc.radius) + '</td>' +
        '<td>' + esc(loc.manager) + '<br><small class="font-mono" style="color:#64748b;">' + esc(loc.phone) + '</small></td>' +
        '<td><span class="zset-badge zset-badge-success">' + esc(loc.status) + '</span></td>' +
      '</tr>';
    }).join('');

    return [
      '<div class="zset-tab-header">',
        '<div>',
          '<h3 class="zset-tab-title">Locations & Facility Nodes</h3>',
          '<p class="zset-tab-desc">Hospitals, trauma clinics, micro-fulfillment dark stores, and cold-chain hubs powering regional and 60-minute healthcare.</p>',
        '</div>',
        '<button type="button" class="zset-btn zset-btn-primary" id="btn-add-loc">+ Add Location</button>',
      '</div>',

      '<div class="zset-filter-bar">',
        '<input class="zset-search-input" id="inp-loc-search" placeholder="Search by name, city, or facility type..." value="' + esc(S.searchQuery) + '">',
        '<span style="font-size:11px;color:#94a3b8;">Showing ' + filtered.length + ' of ' + S.locations.length + ' active facilities</span>',
      '</div>',

      '<div class="zset-card">',
        '<div class="zset-table-wrap">',
          '<table class="zset-table">',
            '<thead><tr><th>Node ID</th><th>Facility & Area</th><th>Facility Type</th><th>City</th><th>Coverage Radius</th><th>Manager & Contact</th><th>Status</th></tr></thead>',
            '<tbody>' + rows + '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 4: Users ────────────────────────────────────────────────── */
  function renderUsers() {
    var q = S.searchQuery.toLowerCase();
    var filtered = S.users.filter(function (u) {
      return !q || (u.name + ' ' + u.email + ' ' + u.role + ' ' + u.unit + ' ' + u.location).toLowerCase().indexOf(q) >= 0;
    });

    var rows = filtered.map(function (u) {
      var av = u.name.split(/\s+/).map(function (w) { return w[0]; }).join('').slice(0, 2).toUpperCase();
      var mfaBadge = u.mfa === 'Enforced' ? 'zset-badge-success' : 'zset-badge-warning';
      return '<tr>' +
        '<td>' +
          '<div class="zset-user-pill">' +
            '<div class="zset-avatar">' + av + '</div>' +
            '<div>' +
              '<strong>' + esc(u.name) + '</strong><br>' +
              '<small class="font-mono" style="color:#94a3b8;">' + esc(u.email) + '</small>' +
            '</div>' +
          '</div>' +
        '</td>' +
        '<td><span class="zset-badge zset-badge-purple">' + esc(u.role) + '</span></td>' +
        '<td>' + esc(u.unit) + '</td>' +
        '<td>' + esc(u.location) + '</td>' +
        '<td><span class="zset-badge ' + mfaBadge + '">' + esc(u.mfa) + '</span></td>' +
        '<td><span class="zset-badge zset-badge-success">' + esc(u.status) + '</span></td>' +
      '</tr>';
    }).join('');

    return [
      '<div class="zset-tab-header">',
        '<div>',
          '<h3 class="zset-tab-title">Users & Administrative Personnel</h3>',
          '<p class="zset-tab-desc">Manage licensed veterinary practitioners, clinical directors, care coordinators, pharmacists, and operations staff.</p>',
        '</div>',
        '<button type="button" class="zset-btn zset-btn-primary" id="btn-add-user">+ Invite User</button>',
      '</div>',

      '<div class="zset-filter-bar">',
        '<input class="zset-search-input" id="inp-user-search" placeholder="Search staff by name, email, or role..." value="' + esc(S.searchQuery) + '">',
        '<span style="font-size:11px;color:#94a3b8;">' + filtered.length + ' active personnel indexed</span>',
      '</div>',

      '<div class="zset-card">',
        '<div class="zset-table-wrap">',
          '<table class="zset-table">',
            '<thead><tr><th>Personnel</th><th>Designated Role</th><th>Business Unit</th><th>Primary Facility</th><th>2FA Security</th><th>Account</th></tr></thead>',
            '<tbody>' + rows + '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 5: Roles & Permissions ──────────────────────────────────── */
  function renderRolesPermissions() {
    var roleCards = S.roles.map(function (r) {
      return '<div class="zset-kpi-card">' +
        '<div class="zset-kpi-lbl">' + esc(r.name) + ' (' + r.users + ' Users)</div>' +
        '<div style="font-size:11px;color:#cbd5e1;margin-top:6px;line-height:1.4;">' + esc(r.desc) + '</div>' +
      '</div>';
    }).join('');

    var permRows = S.permissions.map(function (p, idx) {
      return '<div class="zset-perm-row">' +
        '<div><strong>' + esc(p.module) + '</strong></div>' +
        '<div class="zset-perm-check"><input type="checkbox" ' + (p.view ? 'checked' : '') + ' data-p-idx="' + idx + '" data-p-field="view"></div>' +
        '<div class="zset-perm-check"><input type="checkbox" ' + (p.create ? 'checked' : '') + ' data-p-idx="' + idx + '" data-p-field="create"></div>' +
        '<div class="zset-perm-check"><input type="checkbox" ' + (p.edit ? 'checked' : '') + ' data-p-idx="' + idx + '" data-p-field="edit"></div>' +
        '<div class="zset-perm-check"><input type="checkbox" ' + (p.del ? 'checked' : '') + ' data-p-idx="' + idx + '" data-p-field="del"></div>' +
        '<div class="zset-perm-check"><input type="checkbox" ' + (p.exp ? 'checked' : '') + ' data-p-idx="' + idx + '" data-p-field="exp"></div>' +
        '<div class="zset-perm-check"><input type="checkbox" ' + (p.app ? 'checked' : '') + ' data-p-idx="' + idx + '" data-p-field="app"></div>' +
      '</div>';
    }).join('');

    return [
      '<div class="zset-tab-header">',
        '<div>',
          '<h3 class="zset-tab-title">Roles & Access Permissions (RBAC)</h3>',
          '<p class="zset-tab-desc">Fine-grained role-based governance protecting clinical data confidentiality, order controls, and financial ledgers.</p>',
        '</div>',
      '</div>',

      '<div class="zset-card">',
        '<div class="zset-card-header"><h4 class="zset-card-title">🛡️ Configured Role Profiles</h4></div>',
        '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:12px;">' + roleCards + '</div>',
      '</div>',

      '<div class="zset-card">',
        '<div class="zset-card-header">',
          '<h4 class="zset-card-title">📋 Granular Privilege Governance Matrix</h4>',
          '<span class="zset-badge zset-badge-info">Active Enforcement</span>',
        '</div>',
        '<div class="zset-table-wrap">',
          '<div class="zset-perm-row" style="background:#141d30;font-weight:700;color:#94a3b8;font-size:10px;text-transform:uppercase;letter-spacing:0.05em;border-color:rgba(255,255,255,0.08);margin-bottom:8px;">' +
            '<div>Module Scope</div>' +
            '<div style="text-align:center;">View</div>' +
            '<div style="text-align:center;">Create</div>' +
            '<div style="text-align:center;">Edit</div>' +
            '<div style="text-align:center;">Delete</div>' +
            '<div style="text-align:center;">Export CSV</div>' +
            '<div style="text-align:center;">Approve</div>' +
          '</div>',
          '<div class="zset-perm-matrix">' + permRows + '</div>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 6: Approval Workflows ───────────────────────────────────── */
  function renderApprovalWorkflows() {
    var wfRows = S.workflows.map(function (wf) {
      return '<tr>' +
        '<td class="font-mono" style="font-weight:600;color:#38bdf8;">' + esc(wf.id) + '</td>' +
        '<td><strong>' + esc(wf.name) + '</strong></td>' +
        '<td><span class="zset-badge zset-badge-info">' + esc(wf.trigger) + '</span></td>' +
        '<td>' + esc(wf.steps) + '</td>' +
        '<td class="font-mono">' + esc(wf.timeout) + '</td>' +
        '<td><span class="zset-badge zset-badge-success">' + esc(wf.status) + '</span></td>' +
      '</tr>';
    }).join('');

    var pendingCards = S.pendingApprovals.map(function (p, idx) {
      return '<div class="zset-switch-row" style="margin-bottom:8px;">' +
        '<div class="zset-switch-info">' +
          '<h5>' + esc(p.title) + ' <span class="font-mono" style="color:#10b981;font-weight:700;margin-left:8px;">' + esc(p.amount) + '</span></h5>' +
          '<p>Ref: <span class="font-mono">' + esc(p.orderId) + '</span> · Requested by ' + esc(p.requester) + ' · ' + esc(p.date) + '</p>' +
        '</div>' +
        '<div style="display:flex;gap:8px;flex-shrink:0;">' +
          '<button type="button" class="zset-btn zset-btn-primary" style="padding:4px 10px;font-size:11px;" data-appr-idx="' + idx + '">✓ Approve</button>' +
          '<button type="button" class="zset-btn zset-btn-danger" style="padding:4px 10px;font-size:11px;" data-rej-idx="' + idx + '">✕ Reject</button>' +
        '</div>' +
      '</div>';
    }).join('');

    return [
      '<div class="zset-tab-header">',
        '<div>',
          '<h3 class="zset-tab-title">Approval Workflows & Multi-Tier Sign-Offs</h3>',
          '<p class="zset-tab-desc">Enforce four-eyes principle on clinical narcotics, large vendor purchase orders, patient refunds, and commercial overrides.</p>',
        '</div>',
      '</div>',

      '<div class="zset-card">',
        '<div class="zset-card-header">',
          '<h4 class="zset-card-title">⏳ Active Requests Awaiting Your Review</h4>',
          '<span class="zset-badge zset-badge-warning">' + S.pendingApprovals.length + ' Pending</span>',
        '</div>',
        (S.pendingApprovals.length ? pendingCards : '<div style="padding:16px;text-align:center;color:#64748b;">All approval queues are completely cleared! ✓</div>'),
      '</div>',

      '<div class="zset-card">',
        '<div class="zset-card-header"><h4 class="zset-card-title">⚙️ Configured Approval Rules</h4></div>',
        '<div class="zset-table-wrap">',
          '<table class="zset-table">',
            '<thead><tr><th>Rule ID</th><th>Governance Scope</th><th>Trigger Event</th><th>Routing Hierarchy</th><th>SLA Escalation</th><th>Status</th></tr></thead>',
            '<tbody>' + wfRows + '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 7: Notification Settings ────────────────────────────────── */
  function renderNotifications() {
    var n = S.notifications;
    return [
      '<div class="zset-tab-header">',
        '<div>',
          '<h3 class="zset-tab-title">Notification Channels & Automated Alerts</h3>',
          '<p class="zset-tab-desc">Configure WhatsApp Business API, transactional SMS, mobile push, and real-time clinic broadcast rules.</p>',
        '</div>',
        '<button type="button" class="zset-btn zset-btn-secondary" id="btn-test-notification">🔔 Test Dispatch Ping</button>',
      '</div>',

      '<div class="zset-card">',
        '<div class="zset-card-header"><h4 class="zset-card-title">📱 Connected Dispatch Gateways</h4></div>',
        '<div class="zset-grid-2">',
          '<div class="zset-switch-row">' +
            '<div class="zset-switch-info"><h5>WhatsApp Business API (Gupshup)</h5><p>Templates approved for order tracking & prescription delivery</p></div>' +
            '<label class="zset-switch"><input type="checkbox" id="sw-notif-wa" ' + (n.whatsapp ? 'checked' : '') + '><span class="zset-slider"></span></label>' +
          '</div>',
          '<div class="zset-switch-row">' +
            '<div class="zset-switch-info"><h5>Transactional SMS (DLT Approved)</h5><p>Primary gateway for OTPs and critical 60-min delivery alerts</p></div>' +
            '<label class="zset-switch"><input type="checkbox" id="sw-notif-sms" ' + (n.sms ? 'checked' : '') + '><span class="zset-slider"></span></label>' +
          '</div>',
          '<div class="zset-switch-row">' +
            '<div class="zset-switch-info"><h5>Transactional Email (Amazon SES)</h5><p>Invoices, clinical consultation summaries, and medical records</p></div>' +
            '<label class="zset-switch"><input type="checkbox" id="sw-notif-email" ' + (n.email ? 'checked' : '') + '><span class="zset-slider"></span></label>' +
          '</div>',
          '<div class="zset-switch-row">' +
            '<div class="zset-switch-info"><h5>Mobile App Push (Firebase FCM)</h5><p>Real-time delivery live map updates and appointment notifications</p></div>' +
            '<label class="zset-switch"><input type="checkbox" id="sw-notif-push" ' + (n.push ? 'checked' : '') + '><span class="zset-slider"></span></label>' +
          '</div>',
        '</div>',
      '</div>',

      '<div class="zset-card">',
        '<div class="zset-card-header"><h4 class="zset-card-title">⚡ Automated Trigger Events</h4></div>',
        '<div class="zset-grid-2">',
          '<div class="zset-switch-row">' +
            '<div class="zset-switch-info"><h5>Order Confirmation & Instant Invoice</h5><p>Dispatched immediately upon successful payment authorization</p></div>' +
            '<label class="zset-switch"><input type="checkbox" id="sw-notif-oc" ' + (n.orderConfirm ? 'checked' : '') + '><span class="zset-slider"></span></label>' +
          '</div>',
          '<div class="zset-switch-row">' +
            '<div class="zset-switch-info"><h5>60-Min Express Dispatch & Live ETA</h5><p>Alerts customer when dedicated rider leaves the micro-hub</p></div>' +
            '<label class="zset-switch"><input type="checkbox" id="sw-notif-ed" ' + (n.expressDispatch ? 'checked' : '') + '><span class="zset-slider"></span></label>' +
          '</div>',
          '<div class="zset-switch-row">' +
            '<div class="zset-switch-info"><h5>Doctor Consultation Reminders</h5><p>Sent 24 hours and 1 hour before scheduled veterinary session</p></div>' +
            '<label class="zset-switch"><input type="checkbox" id="sw-notif-ar" ' + (n.appointmentReminders ? 'checked' : '') + '><span class="zset-slider"></span></label>' +
          '</div>',
          '<div class="zset-switch-row">' +
            '<div class="zset-switch-info"><h5>Critical Low Medicine Stock Alert</h5><p>Notifies head pharmacist when essential drugs fall under 15 units</p></div>' +
            '<label class="zset-switch"><input type="checkbox" id="sw-notif-ls" ' + (n.lowStockAlert ? 'checked' : '') + '><span class="zset-slider"></span></label>' +
          '</div>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 8: Dashboard Settings ───────────────────────────────────── */
  function renderDashboardSettings() {
    var d = S.dashboardSettings;
    return [
      '<div class="zset-tab-header">',
        '<div>',
          '<h3 class="zset-tab-title">Executive Dashboard Preferences</h3>',
          '<p class="zset-tab-desc">Personalize portal behavior, live polling frequency, courtroom/boardroom privacy masking, and visual themes.</p>',
        '</div>',
      '</div>',

      '<div class="zset-card">',
        '<div class="zset-card-header"><h4 class="zset-card-title">🖥️ Workspace Display Preferences</h4></div>',
        '<div class="zset-grid-2">',
          '<div class="zset-form-group">',
            '<label class="zset-label">Default Launch Dashboard</label>',
            '<select class="zset-select" id="sel-dash-launch">' +
              '<option value="Executive Control Center" ' + (d.defaultLanding === 'Executive Control Center' ? 'selected' : '') + '>Executive Control Center (Default)</option>' +
              '<option value="Operations Dashboard" ' + (d.defaultLanding === 'Operations Dashboard' ? 'selected' : '') + '>Orders & Operations Hub</option>' +
              '<option value="Sales Dashboard" ' + (d.defaultLanding === 'Sales Dashboard' ? 'selected' : '') + '>Revenue & Sales Overview</option>' +
            '</select>',
          '</div>',
          '<div class="zset-form-group">',
            '<label class="zset-label">Live Data Polling Cadence</label>',
            '<select class="zset-select" id="sel-dash-poll">' +
              '<option value="10s" ' + (d.refreshInterval === '10s' ? 'selected' : '') + '>Live Websocket (~10s)</option>' +
              '<option value="30s" ' + (d.refreshInterval === '30s' ? 'selected' : '') + '>30 Seconds (Recommended)</option>' +
              '<option value="60s" ' + (d.refreshInterval === '60s' ? 'selected' : '') + '>1 Minute</option>' +
              '<option value="5m" ' + (d.refreshInterval === '5m' ? 'selected' : '') + '>5 Minutes</option>' +
            '</select>',
          '</div>',
        '</div>',
      '</div>',

      '<div class="zset-card">',
        '<div class="zset-card-header"><h4 class="zset-card-title">🔒 Boardroom Privacy & Confidentiality</h4></div>',
        '<div class="zset-switch-row">' +
          '<div class="zset-switch-info">' +
            '<h5>Boardroom Revenue Masking Mode</h5>' +
            '<p>Obfuscates all gross revenue and patient totals with "₹ •••••" during public presentations and shared projector meetings.</p>' +
          '</div>' +
          '<label class="zset-switch"><input type="checkbox" id="sw-dash-privacy" ' + (d.boardroomPrivacy ? 'checked' : '') + '><span class="zset-slider"></span></label>' +
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 9: Tax Settings ─────────────────────────────────────────── */
  function renderTaxes() {
    var taxRows = S.taxes.map(function (t) {
      return '<tr>' +
        '<td><strong>' + esc(t.category) + '</strong></td>' +
        '<td class="font-mono" style="color:#38bdf8;">' + esc(t.code) + '</td>' +
        '<td class="font-mono" style="font-weight:700;color:#10b981;">' + esc(t.gst) + '</td>' +
        '<td class="font-mono">' + esc(t.cgst) + '</td>' +
        '<td class="font-mono">' + esc(t.sgst) + '</td>' +
        '<td class="font-mono">' + esc(t.igst) + '</td>' +
      '</tr>';
    }).join('');

    return [
      '<div class="zset-tab-header">',
        '<div>',
          '<h3 class="zset-tab-title">Tax Governance & GST Engine</h3>',
          '<p class="zset-tab-desc">Goods & Services Tax (GST) schedules, statutory HSN/SAC codes, and veterinary healthcare exemption classifications.</p>',
        '</div>',
      '</div>',

      '<div class="zset-card">',
        '<div class="zset-card-header"><h4 class="zset-card-title">🧾 GST Identification & Master Compliance</h4></div>',
        '<div class="zset-grid-3">',
          '<div class="zset-form-group">',
            '<label class="zset-label">Primary GSTIN Number</label>',
            '<input class="zset-input font-mono" value="' + esc(S.company.gstin) + '" disabled>',
            '<div class="zset-help-text">Karnataka Principal Place of Business</div>',
          '</div>',
          '<div class="zset-form-group">',
            '<label class="zset-label">TCS (Tax Collected at Source)</label>',
            '<input class="zset-input font-mono" value="1.0% (Section 52 CGST Act)" disabled>',
            '<div class="zset-help-text">Marketplace operator deduction</div>',
          '</div>',
          '<div class="zset-form-group">',
            '<label class="zset-label">Automated E-Invoicing Threshold</label>',
            '<input class="zset-input font-mono" value="Mandatory > ₹50,000" disabled>',
            '<div class="zset-help-text">Direct NIC portal sync enabled</div>',
          '</div>',
        '</div>',
      '</div>',

      '<div class="zset-card">',
        '<div class="zset-card-header"><h4 class="zset-card-title">📑 HSN/SAC Code Schedule & Healthcare Exemptions</h4></div>',
        '<div class="zset-table-wrap">',
          '<table class="zset-table">',
            '<thead><tr><th>Item Classification</th><th>HSN / SAC Code</th><th>Applicable GST Rate</th><th>CGST</th><th>SGST</th><th>IGST (Inter-State)</th></tr></thead>',
            '<tbody>' + taxRows + '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 10: Payment Settings ────────────────────────────────────── */
  function renderPayments() {
    var p = S.payments;
    return [
      '<div class="zset-tab-header">',
        '<div>',
          '<h3 class="zset-tab-title">Payment Gateways & Payout Orchestration</h3>',
          '<p class="zset-tab-desc">UPI AutoPay, Razorpay, Cashfree instant doctor disbursements, and Cash-On-Delivery threshold governance.</p>',
        '</div>',
        '<button type="button" class="zset-btn zset-btn-secondary" id="btn-test-payment">💳 Ping Gateway Webhooks</button>',
      '</div>',

      '<div class="zset-card">',
        '<div class="zset-card-header"><h4 class="zset-card-title">💳 Gateway Configurations</h4></div>',
        '<div class="zset-grid-3">',
          '<div class="zset-form-group">',
            '<label class="zset-label">Primary Gateway</label>',
            '<input class="zset-input" value="' + esc(p.primaryGateway) + '" disabled>',
            '<div class="zset-help-text">UPI, Cards, Netbanking (Status: Healthy)</div>',
          '</div>',
          '<div class="zset-form-group">',
            '<label class="zset-label">Secondary / Payout Gateway</label>',
            '<input class="zset-input" value="' + esc(p.secondaryGateway) + '" disabled>',
            '<div class="zset-help-text">Instant doctor & vendor payouts</div>',
          '</div>',
          '<div class="zset-form-group">',
            '<label class="zset-label">Cross-Border Gateway</label>',
            '<input class="zset-input" value="' + esc(p.internationalGateway) + '" disabled>',
            '<div class="zset-help-text">International NRI pet owners</div>',
          '</div>',
        '</div>',
      '</div>',

      '<div class="zset-card">',
        '<div class="zset-card-header"><h4 class="zset-card-title">🏦 Settlement Bank Account (T+1 Cycle)</h4></div>',
        '<div class="zset-form-group">',
          '<label class="zset-label">Operating Account</label>',
          '<input class="zset-input font-mono" value="' + esc(p.settlementAccount) + '" disabled>',
        '</div>',
      '</div>',

      '<div class="zset-card">',
        '<div class="zset-card-header"><h4 class="zset-card-title">💵 Cash-on-Delivery (COD) Controls</h4></div>',
        '<div class="zset-switch-row">' +
          '<div class="zset-switch-info">' +
            '<h5>Enable Cash-on-Delivery (COD)</h5>' +
            '<p>Permitted only for non-prescription nutrition & lifestyle products up to <strong>' + esc(p.maxCodValue) + '</strong>.</p>' +
          '</div>' +
          '<label class="zset-switch"><input type="checkbox" id="sw-pay-cod" ' + (p.codEnabled ? 'checked' : '') + '><span class="zset-slider"></span></label>' +
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 11: Delivery Settings ───────────────────────────────────── */
  function renderDelivery() {
    var d = S.delivery;
    return [
      '<div class="zset-tab-header">',
        '<div>',
          '<h3 class="zset-tab-title">Logistics & 60-Minute Express Settings</h3>',
          '<p class="zset-tab-desc">Hyperlocal service radii, micro-hub dispatch SLAs, cold-chain temperature thresholds, and carrier allocations.</p>',
        '</div>',
      '</div>',

      '<div class="zset-card">',
        '<div class="zset-card-header"><h4 class="zset-card-title">⚡ 60-Minute Express Hyperlocal Rules</h4></div>',
        '<div class="zset-grid-3">',
          '<div class="zset-form-group">',
            '<label class="zset-label">Express Service Radius</label>',
            '<input class="zset-input font-mono" id="inp-del-rad" value="' + d.expressRadiusKm + ' km">',
            '<div class="zset-help-text">Max distance from nearest dark store</div>',
          '</div>',
          '<div class="zset-form-group">',
            '<label class="zset-label">Driver Allocation Timeout</label>',
            '<input class="zset-input font-mono" id="inp-del-sla" value="' + d.dispatchThresholdMins + ' Minutes">',
            '<div class="zset-help-text">Escalate if rider not assigned</div>',
          '</div>',
          '<div class="zset-form-group">',
            '<label class="zset-label">Free Express Delivery Cap</label>',
            '<input class="zset-input font-mono" id="inp-del-cap" value="₹' + d.freeDeliveryMinOrder + '">',
            '<div class="zset-help-text">Standard ₹' + d.standardDeliveryFee + ' fee applied below cap</div>',
          '</div>',
        '</div>',
      '</div>',

      '<div class="zset-card">',
        '<div class="zset-card-header"><h4 class="zset-card-title">❄️ Pharmaceutical Cold-Chain Mandate</h4></div>',
        '<div class="zset-switch-row">' +
          '<div class="zset-switch-info">' +
            '<h5>Mandatory Insulated Cold-Boxes (2°C – 8°C)</h5>' +
            '<p>Requires temperature logger verification before dispatch for all biological vaccines and insulins.</p>' +
          '</div>' +
          '<label class="zset-switch"><input type="checkbox" id="sw-del-cold" ' + (d.coldChainEnforced ? 'checked' : '') + '><span class="zset-slider"></span></label>' +
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 12: API & Integrations ──────────────────────────────────── */
  function renderIntegrations() {
    var intRows = S.integrations.map(function (it) {
      return '<tr>' +
        '<td><strong>' + esc(it.name) + '</strong></td>' +
        '<td><span class="zset-badge zset-badge-info">' + esc(it.type) + '</span></td>' +
        '<td><span class="zset-badge zset-badge-success">' + esc(it.status) + '</span></td>' +
        '<td class="font-mono">' + esc(it.uptime) + '</td>' +
        '<td class="font-mono" style="color:#94a3b8;">' + esc(it.lastSync) + '</td>' +
      '</tr>';
    }).join('');

    return [
      '<div class="zset-tab-header">',
        '<div>',
          '<h3 class="zset-tab-title">API Keys & External Integrations</h3>',
          '<p class="zset-tab-desc">Connect EHR practice management systems, Tally ERP financial ledgers, WhatsApp Cloud, and logistics partners.</p>',
        '</div>',
        '<button type="button" class="zset-btn zset-btn-primary" id="btn-gen-api-key">+ Generate API Key</button>',
      '</div>',

      '<div class="zset-card">',
        '<div class="zset-card-header"><h4 class="zset-card-title">🔑 Production API Credentials</h4></div>',
        '<div class="zset-form-group">',
          '<label class="zset-label">Live API Secret Key</label>',
          '<div style="display:flex;gap:8px;">',
            '<input class="zset-input font-mono" id="inp-api-key" value="sk_live_zenve_9f82a17bc938472910d84a71" type="password" readonly>',
            '<button type="button" class="zset-btn zset-btn-secondary" id="btn-toggle-key">👁️ Reveal</button>',
            '<button type="button" class="zset-btn zset-btn-secondary" id="btn-copy-key">📋 Copy</button>',
          '</div>',
          '<div class="zset-help-text">Rate limited to 1,000 requests per minute with signed HMAC verification</div>',
        '</div>',
      '</div>',

      '<div class="zset-card">',
        '<div class="zset-card-header"><h4 class="zset-card-title">🔌 Active Webhook & Microservice Bridges</h4></div>',
        '<div class="zset-table-wrap">',
          '<table class="zset-table">',
            '<thead><tr><th>Integration Connector</th><th>Service Type</th><th>Status</th><th>Uptime</th><th>Last Sync</th></tr></thead>',
            '<tbody>' + intRows + '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 13: Security ────────────────────────────────────────────── */
  function renderSecurity() {
    var sec = S.security;
    var sessRows = sec.activeSessions.map(function (s) {
      return '<tr>' +
        '<td><strong>' + esc(s.device) + '</strong><br><small style="color:#94a3b8;">' + esc(s.browser) + '</small></td>' +
        '<td class="font-mono">' + esc(s.ip) + '</td>' +
        '<td>' + esc(s.location) + '</td>' +
        '<td class="font-mono">' + esc(s.time) + '</td>' +
        '<td>' + (s.current ? '<span class="zset-badge zset-badge-success">Current Session</span>' : '<button type="button" class="zset-btn zset-btn-danger" style="padding:2px 8px;font-size:10px;">Revoke</button>') + '</td>' +
      '</tr>';
    }).join('');

    return [
      '<div class="zset-tab-header">',
        '<div>',
          '<h3 class="zset-tab-title">Security & Zero-Trust Governance</h3>',
          '<p class="zset-tab-desc">Multi-Factor Authentication (2FA), clinical subnet IP whitelisting, session timeouts, and HIPAA/VCI data confidentiality.</p>',
        '</div>',
      '</div>',

      '<div class="zset-card">',
        '<div class="zset-card-header"><h4 class="zset-card-title">🔐 Authentication & Access Security</h4></div>',
        '<div class="zset-grid-2">',
          '<div class="zset-switch-row">' +
            '<div class="zset-switch-info"><h5>Mandatory Two-Factor Authentication (2FA)</h5><p>Enforced across all doctors, admins, and pharmacists</p></div>' +
            '<label class="zset-switch"><input type="checkbox" id="sw-sec-mfa" ' + (sec.mfaEnforced ? 'checked' : '') + '><span class="zset-slider"></span></label>' +
          '</div>',
          '<div class="zset-switch-row">' +
            '<div class="zset-switch-info"><h5>Single Sign-On (Google & Azure AD)</h5><p>Allows `@zenve.in` enterprise domain authentication</p></div>' +
            '<label class="zset-switch"><input type="checkbox" id="sw-sec-sso" ' + (sec.ssoGoogle ? 'checked' : '') + '><span class="zset-slider"></span></label>' +
          '</div>',
        '</div>',
      '</div>',

      '<div class="zset-card">',
        '<div class="zset-card-header"><h4 class="zset-card-title">🌐 Clinical Subnet IP Whitelisting</h4></div>',
        '<div class="zset-form-group">',
          '<label class="zset-label">Authorized Static IP Ranges</label>',
          '<input class="zset-input font-mono" id="inp-sec-ip" value="' + esc(sec.ipWhitelist) + '">',
          '<div class="zset-help-text">Direct access to patient medical histories restricted to these verified subnets</div>',
        '</div>',
      '</div>',

      '<div class="zset-card">',
        '<div class="zset-card-header"><h4 class="zset-card-title">🖥️ Active Administrative Sessions</h4></div>',
        '<div class="zset-table-wrap">',
          '<table class="zset-table">',
            '<thead><tr><th>Device & Browser</th><th>IP Address</th><th>Location</th><th>Activity</th><th>Action</th></tr></thead>',
            '<tbody>' + sessRows + '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 14: Backup & Recovery ───────────────────────────────────── */
  function renderBackup() {
    var b = S.backup;
    var snapRows = b.snapshots.map(function (s) {
      return '<tr>' +
        '<td class="font-mono" style="font-weight:600;color:#38bdf8;">' + esc(s.id) + '</td>' +
        '<td>' + esc(s.date) + '</td>' +
        '<td class="font-mono">' + esc(s.size) + '</td>' +
        '<td><span class="zset-badge zset-badge-info">' + esc(s.type) + '</span></td>' +
        '<td class="font-mono" style="color:#64748b;">' + esc(s.checksum) + '</td>' +
        '<td><span class="zset-badge zset-badge-success">' + esc(s.status) + '</span></td>' +
        '<td><button type="button" class="zset-btn zset-btn-secondary" style="padding:2px 8px;font-size:11px;">⬇ Download</button></td>' +
      '</tr>';
    }).join('');

    return [
      '<div class="zset-tab-header">',
        '<div>',
          '<h3 class="zset-tab-title">Disaster Recovery & Automated Snapshots</h3>',
          '<p class="zset-tab-desc">Continuous PostgreSQL WAL archiving, cross-region replication between Mumbai and Hyderabad, and Point-In-Time Recovery.</p>',
        '</div>',
        '<button type="button" class="zset-btn zset-btn-primary" id="btn-create-snapshot">💾 Create Manual Snapshot</button>',
      '</div>',

      '<div class="zset-kpi-row">',
        '<div class="zset-kpi-card"><div class="zset-kpi-lbl">Recovery Point Objective (RPO)</div><div class="zset-kpi-val font-mono" style="color:#10b981;">' + esc(b.rpo) + '</div></div>',
        '<div class="zset-kpi-card"><div class="zset-kpi-lbl">Recovery Time Objective (RTO)</div><div class="zset-kpi-val font-mono" style="color:#38bdf8;">' + esc(b.rto) + '</div></div>',
        '<div class="zset-kpi-card"><div class="zset-kpi-lbl">PITR Archive Window</div><div class="zset-kpi-val font-mono">' + esc(b.pitrRetention) + '</div></div>',
      '</div>',

      '<div class="zset-card">',
        '<div class="zset-card-header"><h4 class="zset-card-title">🌍 Cross-Region Resiliency</h4></div>',
        '<div class="zset-grid-2">',
          '<div class="zset-form-group"><label class="zset-label">Primary Database Region</label><input class="zset-input font-mono" value="' + esc(b.primaryRegion) + '" disabled></div>',
          '<div class="zset-form-group"><label class="zset-label">Secondary Replication Region</label><input class="zset-input font-mono" value="' + esc(b.secondaryRegion) + '" disabled></div>',
        '</div>',
      '</div>',

      '<div class="zset-card">',
        '<div class="zset-card-header"><h4 class="zset-card-title">📦 Recent Verified Snapshots</h4></div>',
        '<div class="zset-table-wrap">',
          '<table class="zset-table">',
            '<thead><tr><th>Snapshot ID</th><th>Timestamp</th><th>Size</th><th>Archive Type</th><th>SHA-256 Checksum</th><th>Integrity</th><th>Action</th></tr></thead>',
            '<tbody>' + snapRows + '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── DOM Event Wiring ────────────────────────────────────────────── */
  function wireEvents() {
    if (!root) return;

    // 1. Navigation Rail Item Clicks
    root.querySelectorAll('[data-set-tab]').forEach(function (btn) {
      btn.onclick = function () {
        var targetTab = btn.getAttribute('data-set-tab');
        switchTab(targetTab);
      };
    });

    // 2. Top Save All Changes
    var saveBtn = root.querySelector('#zset-save-all-btn');
    if (saveBtn) {
      saveBtn.onclick = function () {
        saveBtn.disabled = true;
        saveBtn.textContent = 'Saving...';
        setTimeout(function () {
          saveBtn.disabled = false;
          saveBtn.innerHTML = '<span>💾</span> Save Changes';
          showToast('✓ All settings synchronized and saved successfully.');
        }, 400);
      };
    }

    // 3. Close Button
    var closeBtn = root.querySelector('#zset-close-btn');
    if (closeBtn) closeBtn.onclick = close;

    // 4. Tab Specific Event Handlers
    wireTabSpecificEvents();
  }

  function wireTabSpecificEvents() {
    // Search in Locations
    var locSearch = root.querySelector('#inp-loc-search');
    if (locSearch) {
      locSearch.oninput = function (e) {
        S.searchQuery = e.target.value;
        var pane = root.querySelector('#zset-pane');
        if (pane) pane.innerHTML = renderLocations();
        wireTabSpecificEvents();
      };
    }

    // Search in Users
    var userSearch = root.querySelector('#inp-user-search');
    if (userSearch) {
      userSearch.oninput = function (e) {
        S.searchQuery = e.target.value;
        var pane = root.querySelector('#zset-pane');
        if (pane) pane.innerHTML = renderUsers();
        wireTabSpecificEvents();
      };
    }

    // Approvals in Workflows
    root.querySelectorAll('[data-appr-idx]').forEach(function (btn) {
      btn.onclick = function () {
        var idx = parseInt(btn.getAttribute('data-appr-idx'), 10);
        var item = S.pendingApprovals[idx];
        S.pendingApprovals.splice(idx, 1);
        showToast('✓ Approved request: ' + (item ? item.title : ''));
        var pane = root.querySelector('#zset-pane');
        if (pane) pane.innerHTML = renderApprovalWorkflows();
        wireTabSpecificEvents();
      };
    });

    root.querySelectorAll('[data-rej-idx]').forEach(function (btn) {
      btn.onclick = function () {
        var idx = parseInt(btn.getAttribute('data-rej-idx'), 10);
        var item = S.pendingApprovals[idx];
        S.pendingApprovals.splice(idx, 1);
        showToast('✕ Rejected request: ' + (item ? item.title : ''));
        var pane = root.querySelector('#zset-pane');
        if (pane) pane.innerHTML = renderApprovalWorkflows();
        wireTabSpecificEvents();
      };
    });

    // Test notification ping
    var testNotifBtn = root.querySelector('#btn-test-notification');
    if (testNotifBtn) {
      testNotifBtn.onclick = function () {
        showToast('✓ Test WhatsApp & SMS dispatch sent successfully.');
      };
    }

    // Test payment gateway
    var testPayBtn = root.querySelector('#btn-test-payment');
    if (testPayBtn) {
      testPayBtn.onclick = function () {
        showToast('✓ Webhook health check: Razorpay & Cashfree 200 OK.');
      };
    }

    // Create Manual Snapshot
    var snapBtn = root.querySelector('#btn-create-snapshot');
    if (snapBtn) {
      snapBtn.onclick = function () {
        snapBtn.disabled = true;
        snapBtn.textContent = 'Creating Snapshot...';
        setTimeout(function () {
          var now = new Date();
          var id = 'SNAP-' + now.toISOString().slice(0, 10).replace(/-/g, '') + '-' + String(now.getHours()).padStart(2, '0') + String(now.getMinutes()).padStart(2, '0');
          S.backup.snapshots.unshift({
            id: id,
            date: 'Just now',
            size: '4.84 GB',
            type: 'Manual Snapshot',
            checksum: 'sha256:3d8e9f1...',
            status: 'Verified'
          });
          snapBtn.disabled = false;
          snapBtn.textContent = '💾 Create Manual Snapshot';
          showToast('✓ New manual snapshot ' + id + ' verified and stored.');
          var pane = root.querySelector('#zset-pane');
          if (pane) pane.innerHTML = renderBackup();
          wireTabSpecificEvents();
        }, 700);
      };
    }

    // API Key Reveal / Copy
    var revealBtn = root.querySelector('#btn-toggle-key');
    var keyInp = root.querySelector('#inp-api-key');
    if (revealBtn && keyInp) {
      revealBtn.onclick = function () {
        if (keyInp.type === 'password') {
          keyInp.type = 'text';
          revealBtn.textContent = '🙈 Hide';
        } else {
          keyInp.type = 'password';
          revealBtn.textContent = '👁️ Reveal';
        }
      };
    }

    var copyBtn = root.querySelector('#btn-copy-key');
    if (copyBtn && keyInp) {
      copyBtn.onclick = function () {
        navigator.clipboard.writeText(keyInp.value).then(function () {
          showToast('✓ API Key copied to clipboard');
        });
      };
    }

    // Modal triggers
    var addUnitBtn = root.querySelector('#btn-add-unit');
    if (addUnitBtn) {
      addUnitBtn.onclick = function () {
        showModal('Add Business Unit', [
          '<div class="zset-form-group"><label class="zset-label">Unit / Division Name</label><input class="zset-input" id="m-unit-name" placeholder="e.g. Zenve Diagnostics Network"></div>',
          '<div class="zset-form-group"><label class="zset-label">Division Lead</label><input class="zset-input" id="m-unit-lead" placeholder="e.g. Dr. Kavita Reddy"></div>',
          '<div class="zset-form-group"><label class="zset-label">Cost Center Code</label><input class="zset-input font-mono" id="m-unit-code" placeholder="CC-DIAG-NAT"></div>'
        ].join(''), function () {
          var name = document.getElementById('m-unit-name')?.value || 'New Business Unit';
          var lead = document.getElementById('m-unit-lead')?.value || 'Assigned Lead';
          var code = document.getElementById('m-unit-code')?.value || 'CC-NEW';
          S.units.push({
            id: 'BU-0' + (S.units.length + 1),
            name: name,
            lead: lead,
            staff: 12,
            revenue: '₹10.0L/mo',
            status: 'Active',
            code: code
          });
          showToast('✓ Added business unit ' + name);
          switchTab('units');
        });
      };
    }

    var addLocBtn = root.querySelector('#btn-add-loc');
    if (addLocBtn) {
      addLocBtn.onclick = function () {
        showModal('Add Clinic / Dark Store Facility', [
          '<div class="zset-form-group"><label class="zset-label">Facility Name</label><input class="zset-input" id="m-loc-name" placeholder="e.g. Whitefield Express Dark Store"></div>',
          '<div class="zset-form-group"><label class="zset-label">City</label><input class="zset-input" id="m-loc-city" placeholder="e.g. Bengaluru"></div>',
          '<div class="zset-form-group"><label class="zset-label">Area / Address</label><input class="zset-input" id="m-loc-area" placeholder="e.g. ITPL Main Road"></div>',
          '<div class="zset-form-group"><label class="zset-label">Facility Type</label><select class="zset-select" id="m-loc-type"><option>Micro-Fulfillment Hub</option><option>Specialty Surgical Center</option><option>Outpatient & Diagnostic Node</option></select></div>'
        ].join(''), function () {
          var name = document.getElementById('m-loc-name')?.value || 'New Facility';
          var city = document.getElementById('m-loc-city')?.value || 'Bengaluru';
          var area = document.getElementById('m-loc-area')?.value || 'City Central';
          var type = document.getElementById('m-loc-type')?.value || 'Micro-Fulfillment Hub';
          S.locations.push({
            id: 'LOC-0' + (S.locations.length + 1),
            name: name,
            city: city,
            area: area,
            type: type,
            radius: '5.0 km',
            manager: 'Station Manager',
            phone: '+91 80 4719 3299',
            status: 'Active'
          });
          showToast('✓ Added facility ' + name);
          switchTab('locations');
        });
      };
    }

    var addUserBtn = root.querySelector('#btn-add-user');
    if (addUserBtn) {
      addUserBtn.onclick = function () {
        showModal('Invite Administrative / Clinical User', [
          '<div class="zset-form-group"><label class="zset-label">Full Name</label><input class="zset-input" id="m-usr-name" placeholder="e.g. Dr. Sunita Sen"></div>',
          '<div class="zset-form-group"><label class="zset-label">Work Email</label><input class="zset-input font-mono" id="m-usr-email" placeholder="sunita@zenve.in"></div>',
          '<div class="zset-form-group"><label class="zset-label">Role</label><select class="zset-select" id="m-usr-role"><option>Senior Veterinarian</option><option>Clinical Director & CMO</option><option>Head Pharmacist</option><option>Care Operations Lead</option><option>Operations & Dispatch Lead</option></select></div>'
        ].join(''), function () {
          var name = document.getElementById('m-usr-name')?.value || 'New Member';
          var email = document.getElementById('m-usr-email')?.value || 'user@zenve.in';
          var role = document.getElementById('m-usr-role')?.value || 'Senior Veterinarian';
          S.users.push({
            id: 'USR-' + (100 + S.users.length + 1),
            name: name,
            email: email,
            role: role,
            unit: 'Clinical Hospitals',
            location: 'Bengaluru Hospital',
            mfa: 'Enforced',
            status: 'Active'
          });
          showToast('✓ Invitation sent to ' + email);
          switchTab('users');
        });
      };
    }
  }

  /* ── Modal Utility ───────────────────────────────────────────────── */
  function showModal(title, bodyHtml, onConfirm) {
    var modalBackdrop = document.createElement('div');
    modalBackdrop.className = 'zset-modal-backdrop';
    modalBackdrop.innerHTML = [
      '<div class="zset-modal-box">',
        '<div class="zset-modal-head">',
          '<h3>' + esc(title) + '</h3>',
          '<button type="button" class="zset-close-btn" id="m-close-btn">✕</button>',
        '</div>',
        '<div class="zset-modal-body">' + bodyHtml + '</div>',
        '<div class="zset-modal-foot">',
          '<button type="button" class="zset-btn zset-btn-secondary" id="m-cancel-btn">Cancel</button>',
          '<button type="button" class="zset-btn zset-btn-primary" id="m-submit-btn">Confirm</button>',
        '</div>',
      '</div>'
    ].join('');
    document.body.appendChild(modalBackdrop);

    function closeM() { modalBackdrop.remove(); }
    modalBackdrop.querySelector('#m-close-btn').onclick = closeM;
    modalBackdrop.querySelector('#m-cancel-btn').onclick = closeM;
    modalBackdrop.querySelector('#m-submit-btn').onclick = function () {
      if (onConfirm) onConfirm();
      closeM();
    };
  }

  /* ── Tab Switcher ────────────────────────────────────────────────── */
  function switchTab(newTab) {
    if (!newTab) return;
    S.activeTab = newTab;
    S.searchQuery = '';
    var targetHash = hashFromTab(newTab);
    try {
      if (location.hash !== targetHash) {
        history.pushState(null, '', targetHash);
      }
    } catch (e) { }

    renderShell();
    syncSidebar(true, newTab);

    // Smoothly scroll active horizontal chip into view
    var activeChip = document.getElementById('zset-chip-' + newTab);
    if (activeChip && activeChip.scrollIntoView) {
      try {
        activeChip.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      } catch (err) {}
    }
  }

  /* ── Open / Close Controller ────────────────────────────────────── */
  function open(tab) {
    if (tab && MODULES.some(function (m) { return m.id === tab; })) {
      S.activeTab = tab;
    } else {
      S.activeTab = tabFromHash(location.hash) || 'company';
    }

    if (!root) renderShell();
    else if (!document.body.contains(root)) document.body.appendChild(root);
    else renderShell();

    // Close any other open control centers
    document.querySelectorAll('.zpanel-root, #zod-root, #zsd-root').forEach(function (el) {
      if (el !== root) {
        el.classList.remove('zpanel-open');
        el.classList.remove('zod-open');
        el.classList.remove('zsd-open');
      }
    });

    root.classList.add('zset-open');
    S.open = true;
    try {
      document.documentElement.classList.add('zset-locked');
      document.body.classList.add('zset-locked');
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } catch (e) { }

    var targetHash = hashFromTab(S.activeTab);
    try {
      if (location.hash !== targetHash) {
        history.pushState(null, '', targetHash);
      }
    } catch (e) { }

    // Clean up any Radix placeholder dialog / lock attributes
    try {
      document.querySelectorAll('[role="dialog"]').forEach(function (d) {
        if (d.closest('#zset-root')) return;
        var btn = d.querySelector('button[aria-label*="close" i], button:last-child');
        if (btn) {
          try { btn.click(); } catch (err) {}
        }
        try { d.remove(); } catch (err) {}
      });
      document.querySelectorAll('[data-radix-focus-guard], [data-radix-popper-content-wrapper], [data-radix-portal]').forEach(function (g) {
        try { g.remove(); } catch (err) {}
      });
    } catch (e) { }

    syncSidebar(true, S.activeTab);
  }

  function close() {
    if (!root || !S.open) return;
    S.open = false;
    root.classList.remove('zset-open');
    try {
      document.documentElement.classList.remove('zset-locked');
      document.body.classList.remove('zset-locked');
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.pointerEvents = '';
      document.body.removeAttribute('data-scroll-locked');
    } catch (e) { }
    syncSidebar(false);
    try {
      if (location.hash.startsWith('#company-') || location.hash.startsWith('#business-') || location.hash.startsWith('#roles-') || location.hash.startsWith('#approval-') || location.hash.startsWith('#notification-') || location.hash.startsWith('#dashboard-') || location.hash.startsWith('#tax-') || location.hash.startsWith('#payment-') || location.hash.startsWith('#delivery-') || location.hash.startsWith('#api-') || location.hash === '#security' || location.hash.startsWith('#backup-') || location.hash === '#users' || location.hash === '#locations' || location.hash === '#settings') {
        history.pushState(null, '', location.pathname + location.search);
      }
    } catch (e) { }
  }

  function syncSidebar(on, tab) {
    document.querySelectorAll('.sidebar-scope li button, .sidebar-scope button, .sidebar-scope a').forEach(function (b) {
      var text = (b.textContent || '').trim();
      var bTab = tabFromText(text);
      if (bTab) {
        b.classList.toggle('zset-active', on && bTab === tab);
        b.classList.toggle('zsd-active', on && bTab === tab);
      }
    });
  }

  /* ── Public API ─────────────────────────────────────────────────── */
  window.ZenveSettingsDashboard = {
    open: open,
    close: close,
    switchTab: switchTab,
    getState: function () { return S; }
  };

  /* ── Keyboard & Hashchange Listeners ────────────────────────────── */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && S.open) close();
  });

  window.addEventListener('hashchange', function () {
    var tab = tabFromHash(location.hash);
    if (tab) {
      open(tab);
    } else if (S.open && location.hash.indexOf('settings') < 0) {
      close();
    }
  });

  /* ── Capture-Phase Global Interceptor for All 14 Settings Pages ─── */
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;

    // Never intercept accordion group headers or search input
    if (t.closest('[aria-expanded]') || t.closest('button[aria-expanded]') || t.closest('[aria-label="Search menu"]')) return;

    // Check clicked buttons, list items, and links
    var item = t.closest('button, [data-go], a, [role="button"], li');
    if (item && item.textContent) {
      var text = item.textContent.trim();
      var tab = tabFromText(text);

      if (tab) {
        if (!t.closest('#zset-root')) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          open(tab);
          return;
        }
      }
    }
  }, true);

  // Auto-open on initial load if hash matches
  var initialTab = tabFromHash(location.hash);
  if (initialTab) {
    setTimeout(function () { open(initialTab); }, 350);
  }

})();
