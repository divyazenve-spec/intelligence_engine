/* =====================================================================
   Zenve BI — Finance & Accounting Domain Control Center & Subdomain Dashboards
   Suite (18 Subdomains):
     1. Finance Dashboard     (#finance-dashboard)
     2. Profit & Loss          (#profit-loss)
     3. Balance Sheet          (#balance-sheet)
     4. Cash Flow              (#cash-flow)
     5. Revenue                (#revenue)
     6. Expenses               (#expenses)
     7. COGS                   (#cogs)
     8. Gross Profit           (#gross-profit)
     9. EBITDA                 (#ebitda)
     10. Net Profit            (#net-profit)
     11. Accounts Receivable   (#accounts-receivable)
     12. Accounts Payable      (#accounts-payable)
     13. Invoices              (#invoices)
     14. Payments              (#payments)
     15. Refunds               (#refunds)
     16. Taxes                 (#taxes)
     17. Financial Forecast    (#financial-forecast)
     18. Cost Analysis         (#cost-analysis)
   ===================================================================== */

(function () {
  'use strict';

  function esc(s) {
    if (s == null) return '';
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ── Tabs Configuration ────────────────────────────────────────── */
  var TABS = [
    { id: 'dashboard',    label: 'Finance Dashboard',   icon: '💰', hash: '#finance-dashboard',   badge: 'EBITDA 20%', title: 'Finance Dashboard', sub: 'Network-wide GAAP profit and loss, operating liquidity, and statutory compliance' },
    { id: 'pnl',          label: 'Profit & Loss',       icon: '📈', hash: '#profit-loss',         badge: 'Audited',    title: 'Profit & Loss Statement (P&L)', sub: 'Management GAAP accounts, operating revenue streams, and cost absorption' },
    { id: 'balance-sheet',label: 'Balance Sheet',       icon: '🏛️', hash: '#balance-sheet',       badge: '₹0 NW', title: 'Balance Sheet & Capital Structure', sub: 'Current liquidity, hospital equipment capital assets, and shareholder net worth' },
    { id: 'cash-flow',    label: 'Cash Flow',           icon: '💧', hash: '#cash-flow',           badge: '14.2 Mo Run', title: 'Cash Flow Statement & Liquidity', sub: 'Direct operating cash conversion, clinical CAPEX, and liquid treasury' },
    { id: 'revenue',      label: 'Revenue',             icon: '💵', hash: '#revenue',             badge: '₹0 MRR', title: 'Revenue Intelligence & Inflows', sub: 'Clinical OPD, surgical IPD, veterinary pharmacy, and corporate B2B contracts' },
    { id: 'expenses',     label: 'Expenses',            icon: '🏢', hash: '#expenses',            badge: '35.9% OPEX', title: 'Operating Expenses (OPEX)', sub: 'Surgeon staffing, hospital leases, utilities, and marketing budget adherence' },
    { id: 'cogs',         label: 'COGS',                icon: '📦', hash: '#cogs',                badge: '44% Ratio',  title: 'Cost of Goods Sold (COGS)', sub: 'Pharma procurement, surgical titanium implants, consumables, and supplier rebates' },
    { id: 'gross-profit', label: 'Gross Profit',        icon: '💎', hash: '#gross-profit',        badge: '56% Margin', title: 'Gross Profit & Unit Economics', sub: 'Clinical department gross contribution and procedure-level profitability' },
    { id: 'ebitda',       label: 'EBITDA',              icon: '⚡', hash: '#ebitda',              badge: '20.02%',     title: 'Operating EBITDA & Bridge', sub: 'Pre-tax operating cash velocity, facility margins, and normalized bridge' },
    { id: 'net-profit',   label: 'Net Profit',          icon: '🏆', hash: '#net-profit',          badge: '11.8% PAT',  title: 'Net Profit (PAT) & Bottom Line', sub: 'Statutory earnings after tax, financing costs, and quarterly profit expansion' },
    { id: 'receivables',  label: 'Accounts Receivable', icon: '📥', hash: '#accounts-receivable', badge: 'DSO 22d',    title: 'Accounts Receivable (AR)', sub: 'Corporate B2B debtor aging, pet insurance TPA claims, and collection notices' },
    { id: 'payables',     label: 'Accounts Payable',    icon: '📤', hash: '#accounts-payable',    badge: 'DPO 34d',    title: 'Accounts Payable (AP)', sub: 'Supplier credit terms, 3-way matching, and scheduled NEFT/RTGS disbursements' },
    { id: 'invoices',     label: 'Invoices',            icon: '🧾', hash: '#invoices',            badge: 'IRN Live',   title: 'GST Tax Invoices Register', sub: 'Automated e-invoice generation, HSN/SAC codes, and client billing receipts' },
    { id: 'payments',     label: 'Payments',            icon: '💳', hash: '#payments',            badge: 'T+1 Sweep',  title: 'Payments & Gateway Settlement', sub: 'Multi-gateway reconciliation, Razorpay UPI, Pine Labs POS, and net credit' },
    { id: 'refunds',      label: 'Refunds',             icon: '🔄', hash: '#refunds',             badge: '1.07% Rate', title: 'Refunds & Reversals Ledger', sub: 'Appointment rescheduling, sealed medication returns, and dispute protection' },
    { id: 'taxes',        label: 'Taxes',               icon: '⚖️', hash: '#taxes',               badge: '100% Compliant', title: 'Statutory Tax Compliance', sub: 'GSTR-1 / 3B filings, ITC reconciliation, TDS 194J/194C, and advance corporate tax' },
    { id: 'forecast',     label: 'Financial Forecast',  icon: '🔮', hash: '#financial-forecast',  badge: '12M Rolling', title: 'Financial Forecasting & Models', sub: '12-month rolling P&L simulations, scenario modeling, and CAPEX roadmap' },
    { id: 'cost-analysis',label: 'Cost Analysis',       icon: '🔍', hash: '#cost-analysis',       badge: 'ABC Model',  title: 'Cost Structure & Breakeven Analysis', sub: 'Activity-based unit costs (ABC), marginal procedure absorption, and safety margin' }
  ];

  /* ── State ─────────────────────────────────────────────────────── */
  var S = {
    open: false,
    tab: 'dashboard',
    invSearch: '',
    invStatus: 'ALL',
    arBucket: 'ALL',
    apStatus: 'ALL',
    expCostCenter: 'ALL',
    forecastScenario: 'Base Case'
  };

  var root = null;

  /* ── Tab Resolution ────────────────────────────────────────────── */
  function tabFromHash(hash) {
    if (!hash) return null;
    var h = (hash.startsWith('#') ? hash.slice(1) : hash).toLowerCase();
    // Exclude other domains
    if (h.indexOf('alert') >= 0 || h.indexOf('report') >= 0 || h.indexOf('clinic') >= 0 || h.indexOf('hospital') >= 0 || h.indexOf('pharmacy') >= 0 || h.indexOf('doctor') >= 0 || h.indexOf('inventory') >= 0) {
      if (h !== 'finance-alerts' && h !== 'finance-reports') {
        // proceed
      } else {
        return null;
      }
    }
    if (h === 'finance-dashboard' || h === 'finance' || h === 'financial-dashboard') return 'dashboard';
    if (h === 'profit-loss' || h === 'pnl' || h === 'profit-and-loss') return 'pnl';
    if (h === 'balance-sheet') return 'balance-sheet';
    if (h === 'cash-flow' || h === 'cashflow') return 'cash-flow';
    if (h === 'finance-revenue' || h === 'revenue') return 'revenue';
    if (h === 'finance-expenses' || h === 'expenses') return 'expenses';
    if (h === 'cogs') return 'cogs';
    if (h === 'gross-profit') return 'gross-profit';
    if (h === 'ebitda') return 'ebitda';
    if (h === 'net-profit') return 'net-profit';
    if (h === 'accounts-receivable' || h === 'receivables') return 'receivables';
    if (h === 'accounts-payable' || h === 'payables') return 'payables';
    if (h === 'invoices') return 'invoices';
    if (h === 'finance-payments' || h === 'payments') return 'payments';
    if (h === 'finance-refunds' || h === 'refunds') return 'refunds';
    if (h === 'taxes' || h === 'tax') return 'taxes';
    if (h === 'financial-forecast' || h === 'forecast') return 'forecast';
    if (h === 'cost-analysis' || h === 'cost') return 'cost-analysis';
    return null;
  }

  function tabFromText(txt) {
    if (!txt) return null;
    var raw = txt.replace(/\s+/g, ' ').trim().toLowerCase();
    if (raw.indexOf('report') >= 0 || raw.indexOf('alert') >= 0 || raw.indexOf('setting') >= 0 || raw.indexOf('doctor') >= 0) return null;

    if (raw === 'finance dashboard' || raw === 'finance & accounting' || raw === 'finance' || raw === 'financial intelligence') return 'dashboard';
    if (raw === 'profit & loss' || raw === 'profit and loss' || raw === 'p&l') return 'pnl';
    if (raw === 'balance sheet') return 'balance-sheet';
    if (raw === 'cash flow') return 'cash-flow';
    if (raw === 'revenue' || raw === 'finance revenue') return 'revenue';
    if (raw === 'expenses' || raw === 'finance expenses') return 'expenses';
    if (raw === 'cogs' || raw === 'cost of goods sold') return 'cogs';
    if (raw === 'gross profit') return 'gross-profit';
    if (raw === 'ebitda') return 'ebitda';
    if (raw === 'net profit') return 'net-profit';
    if (raw === 'accounts receivable' || raw === 'receivables') return 'receivables';
    if (raw === 'accounts payable' || raw === 'payables') return 'payables';
    if (raw === 'invoices' || raw === 'tax invoices') return 'invoices';
    if (raw === 'payments' || raw === 'finance payments') return 'payments';
    if (raw === 'refunds' || raw === 'finance refunds') return 'refunds';
    if (raw === 'taxes' || raw === 'tax compliance') return 'taxes';
    if (raw === 'financial forecast' || raw === 'forecast') return 'forecast';
    if (raw === 'cost analysis') return 'cost-analysis';
    return null;
  }

  /* ── Helper Renderers ─────────────────────────────────────────── */
  function kpiHtml(label, val, delta, trend, subtext, icon) {
    return [
      '<div class="zfa-kpi">',
        '<div class="zfa-kpi-top">',
          '<span class="zfa-kpi-label">' + esc(label) + '</span>',
          '<span class="zfa-kpi-icon">' + esc(icon || '💰') + '</span>',
        '</div>',
        '<div class="zfa-kpi-val">' + esc(val) + '</div>',
        '<div class="zfa-kpi-bottom">',
          '<span class="zfa-delta ' + (trend === 'up' ? 'up' : trend === 'down' ? 'down' : 'warn') + '">' + (trend === 'up' ? '↑ ' : trend === 'down' ? '↓ ' : '• ') + esc(delta) + '</span>',
          '<span class="zfa-subtext">' + esc(subtext) + '</span>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Subdomain Renderers (18 Screens) ─────────────────────────── */

  // 1. Finance Dashboard
  function renderDashboard() {
    return [
      '<div class="zfa-kpi-grid">',
        kpiHtml('Gross Invoiced Revenue', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '💰'),
        kpiHtml('Operating EBITDA', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '⚡'),
        kpiHtml('Net Profit (PAT)', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '🏆'),
        kpiHtml('Liquid Cash & Bank', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '🏦'),
        kpiHtml('Accounts Receivable', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '📥'),
        kpiHtml('Accounts Payable', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '📤'),
      '</div>',
      '<div class="zfa-grid-2">',
        '<div class="zfa-card">',
          '<div class="zfa-card-head">',
            '<div><h3 class="zfa-card-title">📊 Executive Profit & Loss Summary</h3><p class="zfa-card-sub">Management GAAP accounts for Current Month</p></div>',
            '<span class="zfa-badge green">AUDITED ACCRUAL</span>',
          '</div>',
          '<div class="zfa-table-wrap">',
            '<table class="zfa-table">',
              '<thead><tr><th>Financial Metric</th><th style="text-align:right;">Actual</th><th style="text-align:right;">Budget</th><th style="text-align:right;">Variance</th></tr></thead>',
              '<tbody><tr><td colspan="100%" style="text-align:center;padding:28px;color:#94a3b8;">No financial records found</td></tr></tbody>',
            '</table>',
          '</div>',
        '</div>',
        '<div class="zfa-card">',
          '<div class="zfa-card-head">',
            '<div><h3 class="zfa-card-title">⚖️ Working Capital & Aging Profile</h3><p class="zfa-card-sub">Trade receivables vs supplier payables maturity</p></div>',
            '<button class="zfa-btn primary" onclick="ZenveFinanceDashboard.switchTab(\'cash-flow\')">View Cash Flow →</button>',
          '</div>',
          '<div style="display:flex;flex-direction:column;gap:12px;">',
            '<div style="background:rgba(0,0,0,0.2);padding:14px;border-radius:8px;border:1px solid rgba(255,255,255,0.06);"><div style="display:flex;justify-content:space-between;margin-bottom:6px;"><b>Current (0–30 Days)</b><span class="zfa-badge green">LOW RISK</span></div><div style="font-size:11px;color:#94a3b8;">Receivables: <strong style="color:#38bdf8;">₹0</strong> (68.2%) · Payables: <strong style="color:#fbbf24;">₹0</strong> (71.0%)</div></div>',
            '<div style="background:rgba(0,0,0,0.2);padding:14px;border-radius:8px;border:1px solid rgba(255,255,255,0.06);"><div style="display:flex;justify-content:space-between;margin-bottom:6px;"><b>31–60 Days (Grace Period)</b><span class="zfa-badge blue">NORMAL</span></div><div style="font-size:11px;color:#94a3b8;">Receivables: <strong style="color:#38bdf8;">₹0</strong> (19.7%) · Payables: <strong style="color:#fbbf24;">₹0</strong> (20.1%)</div></div>',
            '<div style="background:rgba(0,0,0,0.2);padding:14px;border-radius:8px;border:1px solid rgba(255,255,255,0.06);"><div style="display:flex;justify-content:space-between;margin-bottom:6px;"><b>61–90 Days (Overdue Warning)</b><span class="zfa-badge amber">MEDIUM RISK</span></div><div style="font-size:11px;color:#94a3b8;">Receivables: <strong style="color:#38bdf8;">₹0</strong> (8.6%) · Payables: <strong style="color:#fbbf24;">₹0</strong> (7.3%)</div></div>',
            '<div style="background:rgba(0,0,0,0.2);padding:14px;border-radius:8px;border:1px solid rgba(255,255,255,0.06);"><div style="display:flex;justify-content:space-between;margin-bottom:6px;"><b>90+ Days (Delinquent/Disputed)</b><span class="zfa-badge red">ACTION REQUIRED</span></div><div style="font-size:11px;color:#94a3b8;">Receivables: <strong style="color:#38bdf8;">₹0</strong> (3.5%) · Payables: <strong style="color:#fbbf24;">₹0</strong> (1.6%)</div></div>',
          '</div>',
        '</div>',
      '</div>'
    ].join('');
  }

  // 2. Profit & Loss
  function renderPnL() {
    return [
      '<div class="zfa-kpi-grid">',
        kpiHtml('Operating Revenue', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '💰'),
        kpiHtml('Total Direct COGS', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '📦'),
        kpiHtml('Gross Profit', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '💎'),
        kpiHtml('Total OPEX', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '🏢'),
        kpiHtml('Operating EBITDA', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '⚡'),
        kpiHtml('Net PAT', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '🏆'),
      '</div>',
      '<div class="zfa-card">',
        '<div class="zfa-card-head">',
          '<div><h3 class="zfa-card-title">📑 Comprehensive GAAP Income Statement</h3><p class="zfa-card-sub">Audited waterfall from Top-line Gross Revenue to Bottom-line Net PAT</p></div>',
          '<button class="zfa-btn primary" onclick="alert(\'Downloading official signed GAAP P&L statement (PDF)...\')">Export Audited P&L</button>',
        '</div>',
        '<div class="zfa-table-wrap">',
          '<table class="zfa-table">',
            '<thead><tr><th>Code</th><th>Line Item Description</th><th>Classification</th><th style="text-align:right;">Actual</th><th style="text-align:right;">Budget</th><th style="text-align:right;">Variance</th><th style="text-align:right;">% Revenue</th></tr></thead>',
            '<tbody><tr><td colspan="100%" style="text-align:center;padding:28px;color:#94a3b8;">No financial records found</td></tr></tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  // 3. Balance Sheet
  function renderBalanceSheet() {
    return [
      '<div class="zfa-kpi-grid">',
        kpiHtml('Total Capital Assets', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '🏛️'),
        kpiHtml('Shareholders Equity', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '💎'),
        kpiHtml('Current Ratio', '0.0x', '0.0%', 'neutral', 'neutral', 'No records', '💧'),
        kpiHtml('Quick Ratio', '0.0x', '0.0%', 'neutral', 'neutral', 'No records', '⚡'),
        kpiHtml('Debt to Equity', '0.0x', '0.0%', 'neutral', 'neutral', 'No records', '🛡️'),
        kpiHtml('Net Working Capital', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '📈'),
      '</div>',
      '<div class="zfa-grid-2">',
        '<div class="zfa-card">',
          '<div class="zfa-card-head"><div><h3 class="zfa-card-title">💼 Assets (Total: ₹0)</h3><p class="zfa-card-sub">Current liquid resources and fixed clinical equipment</p></div></div>',
          '<div class="zfa-table-wrap">',
            '<table class="zfa-table">',
              '<thead><tr><th>Asset Class</th><th style="text-align:right;">Balance</th><th style="text-align:right;">Share %</th></tr></thead>',
              '<tbody><tr><td colspan="100%" style="text-align:center;padding:28px;color:#94a3b8;">No financial records found</td></tr></tbody>',
            '</table>',
          '</div>',
        '</div>',
        '<div class="zfa-card">',
          '<div class="zfa-card-head"><div><h3 class="zfa-card-title">⚖️ Liabilities & Equity (Total: ₹0)</h3><p class="zfa-card-sub">External trade obligations and shareholder net worth</p></div></div>',
          '<div class="zfa-table-wrap">',
            '<table class="zfa-table">',
              '<thead><tr><th>Obligation / Capital Component</th><th style="text-align:right;">Balance</th><th style="text-align:right;">Share %</th></tr></thead>',
              '<tbody><tr><td colspan="100%" style="text-align:center;padding:28px;color:#94a3b8;">No financial records found</td></tr></tbody>',
            '</table>',
          '</div>',
        '</div>',
      '</div>'
    ].join('');
  }

  // 4. Cash Flow
  function renderCashFlow() {
    return [
      '<div class="zfa-kpi-grid">',
        kpiHtml('Operating Cash (CFO)', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '💧'),
        kpiHtml('Free Cash Flow (FCF)', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '💎'),
        kpiHtml('Monthly Net Burn', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '🛡️'),
        kpiHtml('Liquid Runway', '0', '0.0%', 'neutral', 'neutral', 'No records', '⏳'),
        kpiHtml('Operating Cash Ratio', '0.0x', '0.0%', 'neutral', 'neutral', 'No records', '📈'),
        kpiHtml('Treasury Cleared', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '🏦'),
      '</div>',
      '<div class="zfa-card">',
        '<div class="zfa-card-head"><div><h3 class="zfa-card-title">🌊 Direct Cash Flow Statement Waterfall</h3><p class="zfa-card-sub">Operating cash collections, capital investments, and financing service</p></div><span class="zfa-badge green">DIRECT GAAP</span></div>',
        '<div class="zfa-table-wrap">',
          '<table class="zfa-table">',
            '<thead><tr><th>Activity Item</th><th>Section</th><th style="text-align:right;">Net Flow (INR)</th></tr></thead>',
            '<tbody><tr><td colspan="100%" style="text-align:center;padding:28px;color:#94a3b8;">No financial records found</td></tr></tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  // 5. Revenue
  function renderRevenue() {
    return [
      '<div class="zfa-kpi-grid">',
        kpiHtml('Monthly Run-Rate (MRR)', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '💰'),
        kpiHtml('Annualized Run-Rate (ARR)', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '🌐'),
        kpiHtml('Avg Ticket / Consultation', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '🐾'),
        kpiHtml('Avg Ticket / Surgery', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '🩺'),
        kpiHtml('Pharmacy Attach Rate', '0.0%', '0.0%', 'neutral', 'neutral', 'No records', '💊'),
        kpiHtml('ASC 606 / Ind-AS 115', '0.0%', '0.0%', 'neutral', 'neutral', 'No records', '🛡️'),
      '</div>',
      '<div class="zfa-card">',
        '<div class="zfa-card-head"><div><h3 class="zfa-card-title">💵 Revenue Stream Breakdown</h3><p class="zfa-card-sub">Commercial intake across outpatient clinics, surgical hospitals, pharmacy, and corporate accounts</p></div><button class="zfa-btn primary" onclick="alert(\'Exporting revenue breakdown ledger (CSV)...\')">Export Revenue CSV</button></div>',
        '<div class="zfa-table-wrap">',
          '<table class="zfa-table">',
            '<thead><tr><th>Stream Name</th><th>Channel Type</th><th style="text-align:right;">Monthly Revenue</th><th style="text-align:right;">Volume</th><th style="text-align:right;">Avg Ticket</th><th style="text-align:right;">Share %</th><th style="text-align:right;">MoM Growth</th></tr></thead>',
            '<tbody><tr><td colspan="100%" style="text-align:center;padding:28px;color:#94a3b8;">No financial records found</td></tr></tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  // 6. Expenses
  function renderExpenses() {
    return [
      '<div class="zfa-kpi-grid">',
        kpiHtml('Total Monthly OPEX', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '🏢'),
        kpiHtml('Staffing & Payroll', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '👨‍⚕️'),
        kpiHtml('Facility Leases', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '📍'),
        kpiHtml('Hospital Utilities', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '⚡'),
        kpiHtml('Marketing & CAC', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '📣'),
        kpiHtml('Budget Compliance', '0.0%', '0.0%', 'neutral', 'neutral', 'No records', '🛡️'),
      '</div>',
      '<div class="zfa-card">',
        '<div class="zfa-card-head"><div><h3 class="zfa-card-title">📋 OPEX Departmental Ledger</h3><p class="zfa-card-sub">Approved budgets, actual disbursements, and variance</p></div><button class="zfa-btn primary" onclick="ZenveFinanceDashboard.showExpenseModal()">+ New Expense Voucher</button></div>',
        '<div class="zfa-table-wrap">',
          '<table class="zfa-table">',
            '<thead><tr><th>Code</th><th>Expense Line Item</th><th>Cost Center</th><th style="text-align:right;">Budget</th><th style="text-align:right;">Actual Spend</th><th style="text-align:right;">Variance</th><th style="text-align:right;">% OPEX</th></tr></thead>',
            '<tbody><tr><td colspan="100%" style="text-align:center;padding:28px;color:#94a3b8;">No financial records found</td></tr></tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  // 7. COGS
  function renderCOGS() {
    return [
      '<div class="zfa-kpi-grid">',
        kpiHtml('Total Monthly COGS', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '📦'),
        kpiHtml('Pharma Procurement', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '💊'),
        kpiHtml('Surgical Hardware', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '🔩'),
        kpiHtml('Diagnostic Consumables', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '🔬'),
        kpiHtml('Manufacturer Rebates', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '🎁'),
        kpiHtml('Inventory Waste Rate', '0.0%', '0.0%', 'neutral', 'neutral', 'No records', '🛡️'),
      '</div>',
      '<div class="zfa-card">',
        '<div class="zfa-card-head"><div><h3 class="zfa-card-title">📦 Direct Material Absorption Schedule</h3><p class="zfa-card-sub">Procurement costs linked to healthcare service delivery</p></div><button class="zfa-btn primary" onclick="alert(\'Opening purchase order procurement terminal...\')">Vendor PO Run</button></div>',
        '<div class="zfa-table-wrap">',
          '<table class="zfa-table">',
            '<thead><tr><th>Code</th><th>Category</th><th style="text-align:right;">Direct Spend</th><th style="text-align:right;">Linked Revenue</th><th style="text-align:right;">Gross Margin</th><th>Key Suppliers</th></tr></thead>',
            '<tbody><tr><td colspan="100%" style="text-align:center;padding:28px;color:#94a3b8;">No financial records found</td></tr></tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  // 8. Gross Profit
  function renderGrossProfit() {
    return [
      '<div class="zfa-kpi-grid">',
        kpiHtml('Total Gross Profit', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '💎'),
        kpiHtml('Blended Gross Margin', '0.0%', '0.0%', 'neutral', 'neutral', 'No records', '📈'),
        kpiHtml('Surgical Gross Margin', '0.0%', '0.0%', 'neutral', 'neutral', 'No records', '🩺'),
        kpiHtml('Diagnostics Margin', '0.0%', '0.0%', 'neutral', 'neutral', 'No records', '🔬'),
        kpiHtml('Pharmacy Gross Margin', '0.0%', '0.0%', 'neutral', 'neutral', 'No records', '💊'),
        kpiHtml('Price Realization Index', '0', '0.0%', 'neutral', 'neutral', 'No records', '🛡️'),
      '</div>',
      '<div class="zfa-card">',
        '<div class="zfa-card-head"><div><h3 class="zfa-card-title">💎 Gross Profit Contribution by Clinical Division</h3><p class="zfa-card-sub">Department gross margins after deducting direct medical materials</p></div><span class="zfa-badge green">ALL UNITS EXCEED TARGET</span></div>',
        '<div class="zfa-table-wrap">',
          '<table class="zfa-table">',
            '<thead><tr><th>Clinical Unit</th><th style="text-align:right;">Gross Revenue</th><th style="text-align:right;">Direct COGS</th><th style="text-align:right;">Gross Profit</th><th style="text-align:right;">Gross Margin %</th><th style="text-align:right;">Target Margin</th><th style="text-align:right;">Status</th></tr></thead>',
            '<tbody><tr><td colspan="100%" style="text-align:center;padding:28px;color:#94a3b8;">No financial records found</td></tr></tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  // 9. EBITDA
  function renderEBITDA() {
    return [
      '<div class="zfa-kpi-grid">',
        kpiHtml('Operating EBITDA (MTD)', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '⚡'),
        kpiHtml('Normalized Adj. EBITDA', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '💎'),
        kpiHtml('Annualized EBITDA Run-rate', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '📈'),
        kpiHtml('EBITDA-to-Cash Ratio', '0.0%', '0.0%', 'neutral', 'neutral', 'No records', '💧'),
        kpiHtml('Flagship Hospital EBITDA', '0.0%', '0.0%', 'neutral', 'neutral', 'No records', '🏥'),
        kpiHtml('Break-even Month', '0', '0.0%', 'neutral', 'neutral', 'No records', '⏱️'),
      '</div>',
      '<div class="zfa-card">',
        '<div class="zfa-card-head"><div><h3 class="zfa-card-title">⚡ Facility-Level EBITDA Ranking</h3><p class="zfa-card-sub">Operating profit generated by each hospital and outpatient center</p></div><span class="zfa-badge green">100% LOCATIONS POSITIVE</span></div>',
        '<div class="zfa-table-wrap">',
          '<table class="zfa-table">',
            '<thead><tr><th>Facility</th><th>City</th><th style="text-align:right;">Revenue</th><th style="text-align:right;">EBITDA</th><th style="text-align:right;">EBITDA Margin</th><th style="text-align:right;">Status</th></tr></thead>',
            '<tbody><tr><td colspan="100%" style="text-align:center;padding:28px;color:#94a3b8;">No financial records found</td></tr></tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  // 10. Net Profit
  function renderNetProfit() {
    return [
      '<div class="zfa-kpi-grid">',
        kpiHtml('Net Profit (PAT)', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '🏆'),
        kpiHtml('Net Profit Margin', '0.0%', '0.0%', 'neutral', 'neutral', 'No records', '📈'),
        kpiHtml('Profit Before Tax (PBT)', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '💼'),
        kpiHtml('Effective Tax Rate', '0.0%', '0.0%', 'neutral', 'neutral', 'No records', '🏛️'),
        kpiHtml('Annualized PAT Run-rate', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '🏗️'),
        kpiHtml('Earnings Per Share (EPS)', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '💎'),
      '</div>',
      '<div class="zfa-card">',
        '<div class="zfa-card-head"><div><h3 class="zfa-card-title">🏆 Bottom-Line Earnings Bridge & Quarterly Trend</h3><p class="zfa-card-sub">Consecutive quarterly profit acceleration</p></div><span class="zfa-badge green">CONSISTENT EXPANSION</span></div>',
        '<div class="zfa-table-wrap">',
          '<table class="zfa-table">',
            '<thead><tr><th>Reporting Quarter</th><th style="text-align:right;">Gross Revenue</th><th style="text-align:right;">Operating EBITDA</th><th style="text-align:right;">Net PAT</th><th style="text-align:right;">PAT Margin %</th><th style="text-align:right;">EPS (INR)</th></tr></thead>',
            '<tbody><tr><td colspan="100%" style="text-align:center;padding:28px;color:#94a3b8;">No financial records found</td></tr></tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  // 11. Accounts Receivable
  function renderReceivables() {
    return [
      '<div class="zfa-kpi-grid">',
        kpiHtml('Total Receivables (AR)', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '📥'),
        kpiHtml('Days Sales Outstanding (DSO)', '0', '0.0%', 'neutral', 'neutral', 'No records', '⏱️'),
        kpiHtml('Current (0–30 Days)', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '🛡️'),
        kpiHtml('31–60 Days Overdue', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '⚡'),
        kpiHtml('Overdue >60 Days', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '🚨'),
        kpiHtml('Bad Debt Provision', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '💎'),
      '</div>',
      '<div class="zfa-card">',
        '<div class="zfa-card-head"><div><h3 class="zfa-card-title">📋 Trade Debtors & Corporate Receivables Schedule</h3><p class="zfa-card-sub">Outstanding balances by insurance TPAs and corporate wellness programs</p></div><button class="zfa-btn primary" onclick="alert(\'Sending automated payment reminder WhatsApp/Email notices...\')">📢 Send Reminders</button></div>',
        '<div class="zfa-table-wrap">',
          '<table class="zfa-table">',
            '<thead><tr><th>Debtor / Partner</th><th>Account Type</th><th style="text-align:right;">Total Due</th><th>Aging Bucket</th><th style="text-align:right;">Client DSO</th><th style="text-align:right;">Status</th></tr></thead>',
            '<tbody><tr><td colspan="100%" style="text-align:center;padding:28px;color:#94a3b8;">No financial records found</td></tr></tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  // 12. Accounts Payable
  function renderPayables() {
    return [
      '<div class="zfa-kpi-grid">',
        kpiHtml('Total Payables (AP)', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '📤'),
        kpiHtml('Days Payable Outstanding', '0', '0.0%', 'neutral', 'neutral', 'No records', '⏱️'),
        kpiHtml('Approved for Immediate Run', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '✅'),
        kpiHtml('Early Cash Discounts', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '🎁'),
        kpiHtml('Pending GRN Match', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '🔍'),
        kpiHtml('Disputed Invoices', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '⚠️'),
      '</div>',
      '<div class="zfa-card">',
        '<div class="zfa-card-head"><div><h3 class="zfa-card-title">📑 Trade Creditors & Supplier Settlement Queue</h3><p class="zfa-card-sub">3-way matching verified against Purchase Order (PO) and Goods Receipt Note (GRN)</p></div><button class="zfa-btn primary" onclick="alert(\'Executing batch payment run via HDFC CMS-NEFT...\')">💳 Execute NEFT Batch Run</button></div>',
        '<div class="zfa-table-wrap">',
          '<table class="zfa-table">',
            '<thead><tr><th>Vendor / Supplier</th><th>Category</th><th style="text-align:right;">Balance Due</th><th style="text-align:center;">Credit Terms</th><th style="text-align:center;">Due In</th><th style="text-align:right;">Early Cash Discount</th><th style="text-align:right;">Status</th></tr></thead>',
            '<tbody><tr><td colspan="100%" style="text-align:center;padding:28px;color:#94a3b8;">No financial records found</td></tr></tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  // 13. Invoices
  function renderInvoices() {
    return [
      '<div class="zfa-kpi-grid">',
        kpiHtml('Invoices Issued (MTD)', '0', '0.0%', 'neutral', 'neutral', 'No records', '🧾'),
        kpiHtml('Total Invoiced Value', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '💰'),
        kpiHtml('Settled / Paid', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '✅'),
        kpiHtml('Pending Settlement', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '⏳'),
        kpiHtml('Overdue Invoices', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '⚠️'),
        kpiHtml('e-Invoice IRN Sync', '0.0%', '0.0%', 'neutral', 'neutral', 'No records', '📶'),
      '</div>',
      '<div class="zfa-card">',
        '<div class="zfa-card-head"><div><h3 class="zfa-card-title">📑 GST Tax Invoices Register</h3><p class="zfa-card-sub">Compliant digital receipts with HSN/SAC codes and automated IRN hash generation</p></div><button class="zfa-btn primary" onclick="ZenveFinanceDashboard.showInvoiceModal()">+ Generate Tax Invoice</button></div>',
        '<div class="zfa-table-wrap">',
          '<table class="zfa-table">',
            '<thead><tr><th>Invoice ID</th><th>Date</th><th>Client / Pet</th><th>Facility</th><th>Clinical Description</th><th style="text-align:right;">Taxable</th><th style="text-align:right;">18% GST</th><th style="text-align:right;">Total</th><th>Status</th><th style="text-align:center;">Action</th></tr></thead>',
            '<tbody><tr><td colspan="100%" style="text-align:center;padding:28px;color:#94a3b8;">No financial records found</td></tr></tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  // 14. Payments
  function renderPayments() {
    return [
      '<div class="zfa-kpi-grid">',
        kpiHtml('Digital Collections', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '💳'),
        kpiHtml('UPI Share', '0.0%', '0.0%', 'neutral', 'neutral', 'No records', '📱'),
        kpiHtml('Card & POS Volume', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '🏧'),
        kpiHtml('Blended MDR Cost', '0.0%', '0.0%', 'neutral', 'neutral', 'No records', '💰'),
        kpiHtml('Settlement Window', '0', '0.0%', 'neutral', 'neutral', 'No records', '⚡'),
        kpiHtml('Reconciliation Accuracy', '0.0%', '0.0%', 'neutral', 'neutral', 'No records', '🛡️'),
      '</div>',
      '<div class="zfa-card">',
        '<div class="zfa-card-head"><div><h3 class="zfa-card-title">💳 Payment Gateways & Merchant Rails</h3><p class="zfa-card-sub">Inflow channels, merchant discount rates (MDR), and net bank realization</p></div><button class="zfa-btn primary" onclick="alert(\'Reconciling gateway batches with Core Banking API...\')">🔄 Run Reconciliation</button></div>',
        '<div class="zfa-table-wrap">',
          '<table class="zfa-table">',
            '<thead><tr><th>Gateway Rail</th><th style="text-align:right;">Processed Volume</th><th style="text-align:right;">Txns</th><th style="text-align:right;">MDR Rate</th><th style="text-align:right;">MDR Fee</th><th style="text-align:right;">Net Cleared</th><th style="text-align:right;">Status</th></tr></thead>',
            '<tbody><tr><td colspan="100%" style="text-align:center;padding:28px;color:#94a3b8;">No financial records found</td></tr></tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  // 15. Refunds
  function renderRefunds() {
    return [
      '<div class="zfa-kpi-grid">',
        kpiHtml('Total Processed Refunds', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '🔄'),
        kpiHtml('Cancelled OPD Consults', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '📅'),
        kpiHtml('Pharmacy Sealed Returns', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '💊'),
        kpiHtml('Duplicate POS Swipes', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '💳'),
        kpiHtml('Average Dispute TAT', '0', '0.0%', 'neutral', 'neutral', 'No records', '⏱️'),
        kpiHtml('Chargeback Loss Rate', '0.0%', '0.0%', 'neutral', 'neutral', 'No records', '🛡️'),
      '</div>',
      '<div class="zfa-card">',
        '<div class="zfa-card-head"><div><h3 class="zfa-card-title">🔄 Customer Refunds & Disputed Reversals Log</h3><p class="zfa-card-sub">Clinical refund authorizations linked directly to verified invoice records</p></div><button class="zfa-btn primary" onclick="ZenveFinanceDashboard.showRefundModal()">+ Authorize Refund</button></div>',
        '<div class="zfa-table-wrap">',
          '<table class="zfa-table">',
            '<thead><tr><th>Refund ID</th><th>Original Invoice</th><th>Pet Parent & Pet</th><th style="text-align:right;">Refund Amount</th><th>Clinical Reason</th><th>Settlement Channel</th><th style="text-align:right;">Status</th></tr></thead>',
            '<tbody><tr><td colspan="100%" style="text-align:center;padding:28px;color:#94a3b8;">No financial records found</td></tr></tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  // 16. Taxes
  function renderTaxes() {
    return [
      '<div class="zfa-kpi-grid">',
        kpiHtml('GST Output Liability', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '🏛️'),
        kpiHtml('Input Tax Credit (ITC)', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '📥'),
        kpiHtml('Net GST Payable', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '💰'),
        kpiHtml('TDS Deposited', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '📑'),
        kpiHtml('Advance Corporate Tax', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '🛡️'),
        kpiHtml('Compliance Rating', '0 / 100', '0.0%', 'neutral', 'neutral', 'No records', '⭐'),
      '</div>',
      '<div class="zfa-card">',
        '<div class="zfa-card-head"><div><h3 class="zfa-card-title">⚖️ Goods & Services Tax (GST) Returns</h3><p class="zfa-card-sub">GSTIN: 29AABCZ8412K1Z9 · Government of India GST Portal Sync</p></div><button class="zfa-btn primary" onclick="alert(\'Generating GST e-Challan PMT-06...\')">Generate PMT-06</button></div>',
        '<div class="zfa-table-wrap">',
          '<table class="zfa-table">',
            '<thead><tr><th>Form Type</th><th>Tax Period</th><th>Due Date</th><th style="text-align:right;">Taxable Turnover</th><th style="text-align:right;">Output Tax</th><th style="text-align:right;">ITC Offset</th><th style="text-align:right;">Net Cash Paid</th><th style="text-align:right;">Status</th></tr></thead>',
            '<tbody><tr><td colspan="100%" style="text-align:center;padding:28px;color:#94a3b8;">No financial records found</td></tr></tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  // 17. Financial Forecast
  function renderForecast() {
    return [
      '<div class="zfa-kpi-grid">',
        kpiHtml('Next 12M Projected Revenue', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '🔮'),
        kpiHtml('Projected FY28 EBITDA', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '⚡'),
        kpiHtml('12M Free Cash Flow', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '💧'),
        kpiHtml('Total Planned CAPEX', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '🏗️'),
        kpiHtml('Target Breakeven / Bed', '0', '0.0%', 'neutral', 'neutral', 'No records', '⏱️'),
        kpiHtml('Sensitivity Risk Score', '0', '0.0%', 'neutral', 'neutral', 'No records', '🛡️'),
      '</div>',
      '<div class="zfa-card">',
        '<div class="zfa-card-head"><div><h3 class="zfa-card-title">📈 4-Quarter Rolling Forward P&L Projections</h3><p class="zfa-card-sub">Management predictive model incorporating 14 existing sites + 4 planned expansions</p></div><button class="zfa-btn primary" onclick="alert(\'Exporting full dynamic forecast simulation model (Excel)...\')">Export Model (XLSX)</button></div>',
        '<div class="zfa-table-wrap">',
          '<table class="zfa-table">',
            '<thead><tr><th>Forward Quarter</th><th style="text-align:right;">Forecast Revenue</th><th style="text-align:right;">Direct COGS</th><th style="text-align:right;">Forecast OPEX</th><th style="text-align:right;">Projected EBITDA</th><th style="text-align:right;">Projected PAT</th><th style="text-align:right;">Closing Treasury</th></tr></thead>',
            '<tbody><tr><td colspan="100%" style="text-align:center;padding:28px;color:#94a3b8;">No financial records found</td></tr></tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  // 18. Cost Analysis
  function renderCostAnalysis() {
    return [
      '<div class="zfa-kpi-grid">',
        kpiHtml('Network Breakeven', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '⚖️'),
        kpiHtml('Margin of Safety', '0.0%', '0.0%', 'neutral', 'neutral', 'No records', '🛡️'),
        kpiHtml('Cost / Inpatient Bed-Day', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '🛏️'),
        kpiHtml('Cost / Surgical OT Hour', '₹0', '0.0%', 'neutral', 'neutral', 'No records', '🩺'),
        kpiHtml('Fixed Cost Ratio', '0.0%', '0.0%', 'neutral', 'neutral', 'No records', '🏢'),
        kpiHtml('Variable Cost Ratio', '0.0%', '0.0%', 'neutral', 'neutral', 'No records', '📉'),
      '</div>',
      '<div class="zfa-card">',
        '<div class="zfa-card-head"><div><h3 class="zfa-card-title">🔍 Activity-Based Unit Costing (ABC Model)</h3><p class="zfa-card-sub">Granular clinical unit costs compared to private hospital industry benchmarks</p></div><span class="zfa-badge green">15–26% COST ADVANTAGE</span></div>',
        '<div class="zfa-table-wrap">',
          '<table class="zfa-table">',
            '<thead><tr><th>Activity / Service Unit</th><th>Classification</th><th style="text-align:right;">Zenve Unit Cost</th><th style="text-align:right;">Metro Benchmark</th><th style="text-align:right;">Variance</th><th style="text-align:right;">Efficiency</th></tr></thead>',
            '<tbody><tr><td colspan="100%" style="text-align:center;padding:28px;color:#94a3b8;">No financial records found</td></tr></tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Master Render Function ───────────────────────────────────── */
  function render() {
    if (!root) return;

    var activeTab = TABS.find(function (t) { return t.id === S.tab; }) || TABS[0];

    // Update Header Content Dynamically
    var titleEl = root.querySelector('.zfa-title');
    if (titleEl) titleEl.textContent = activeTab.title || activeTab.label;

    var subEl = root.querySelector('.zfa-sub');
    if (subEl) subEl.textContent = activeTab.sub || '';

    var badgeEl = root.querySelector('.zfa-live-badge');
    if (badgeEl) {
      badgeEl.innerHTML = '<span class="zfa-pulse-dot"></span> ' + esc(activeTab.badge || 'Active');
    }

    // Contextual Action Button
    var actionBtn = root.querySelector('.zfa-context-action');
    if (actionBtn) {
      if (S.tab === 'invoices') {
        actionBtn.style.display = 'inline-flex';
        actionBtn.textContent = '+ Create Invoice';
        actionBtn.onclick = function () { ZenveFinanceDashboard.showInvoiceModal(); };
      } else if (S.tab === 'expenses') {
        actionBtn.style.display = 'inline-flex';
        actionBtn.textContent = '+ Expense Voucher';
        actionBtn.onclick = function () { ZenveFinanceDashboard.showExpenseModal(); };
      } else if (S.tab === 'refunds') {
        actionBtn.style.display = 'inline-flex';
        actionBtn.textContent = '+ Authorize Refund';
        actionBtn.onclick = function () { ZenveFinanceDashboard.showRefundModal(); };
      } else {
        actionBtn.style.display = 'inline-flex';
        actionBtn.textContent = '+ Add Transaction';
        actionBtn.onclick = function () { ZenveFinanceDashboard.showTxnModal(); };
      }
    }

    // Render Tabs Bar
    var tabsBar = root.querySelector('.zfa-tabs-bar');
    if (tabsBar) {
      tabsBar.innerHTML = TABS.map(function (t) {
        var isActive = t.id === S.tab;
        return [
          '<button class="zfa-tab ' + (isActive ? 'active' : '') + '" onclick="ZenveFinanceDashboard.switchTab(\'' + t.id + '\')">',
            '<span>' + t.icon + '</span>',
            '<span>' + esc(t.label) + '</span>',
            t.badge ? '<span class="zfa-tab-badge">' + esc(t.badge) + '</span>' : '',
          '</button>'
        ].join('');
      }).join('');
    }

    // Render Body Area (DIV with 0 margin, strictly no <main>)
    var body = root.querySelector('.zfa-body');
    if (body) {
      switch (S.tab) {
        case 'dashboard':     body.innerHTML = renderDashboard(); break;
        case 'pnl':           body.innerHTML = renderPnL(); break;
        case 'balance-sheet': body.innerHTML = renderBalanceSheet(); break;
        case 'cash-flow':     body.innerHTML = renderCashFlow(); break;
        case 'revenue':       body.innerHTML = renderRevenue(); break;
        case 'expenses':      body.innerHTML = renderExpenses(); break;
        case 'cogs':          body.innerHTML = renderCOGS(); break;
        case 'gross-profit':  body.innerHTML = renderGrossProfit(); break;
        case 'ebitda':        body.innerHTML = renderEBITDA(); break;
        case 'net-profit':    body.innerHTML = renderNetProfit(); break;
        case 'receivables':   body.innerHTML = renderReceivables(); break;
        case 'payables':      body.innerHTML = renderPayables(); break;
        case 'invoices':      body.innerHTML = renderInvoices(); break;
        case 'payments':      body.innerHTML = renderPayments(); break;
        case 'refunds':       body.innerHTML = renderRefunds(); break;
        case 'taxes':         body.innerHTML = renderTaxes(); break;
        case 'forecast':      body.innerHTML = renderForecast(); break;
        case 'cost-analysis': body.innerHTML = renderCostAnalysis(); break;
        default:              body.innerHTML = renderDashboard(); break;
      }
    }
  }

  /* ── Build Shell ──────────────────────────────────────────────── */
  function build() {
    if (root) return;
    root = document.createElement('div');
    root.id = 'zfa-root';
    root.innerHTML = [
      '<header class="zfa-head">',
        '<div class="zfa-head-left">',
          '<div class="zfa-title-row">',
            '<h1 class="zfa-title">Finance Dashboard</h1>',
            '<span class="zfa-live-badge"><span class="zfa-pulse-dot"></span> EBITDA 20.02%</span>',
          '</div>',
          '<p class="zfa-sub">Network-wide GAAP profit and loss, operating liquidity, and statutory compliance</p>',
        '</div>',
        '<div class="zfa-head-actions">',
          '<button class="zfa-btn" onclick="alert(\'Refreshing live treasury balances and general ledger accounts...\')">🔄 Refresh Ledgers</button>',
          '<button class="zfa-btn primary zfa-context-action">+ Add Transaction</button>',
        '</div>',
      '</header>',
      '<nav class="zfa-tabs-bar" aria-label="Finance & Accounting Subdomains"></nav>',
      '<div class="zfa-body"></div>'
    ].join('');
    document.body.appendChild(root);
  }

  /* ── Open / Close / Switch ────────────────────────────────────── */
  function open(tab) {
    // Close other domain overlays cleanly
    if (window.ZenveSalesDashboard && typeof window.ZenveSalesDashboard.close === 'function') {
      try { window.ZenveSalesDashboard.close(); } catch (e) {}
    }
    if (window.ZenveOperationsDashboard && typeof window.ZenveOperationsDashboard.close === 'function') {
      try { window.ZenveOperationsDashboard.close(); } catch (e) {}
    }
    if (window.ZenveProductsInventory && typeof window.ZenveProductsInventory.close === 'function') {
      try { window.ZenveProductsInventory.close(); } catch (e) {}
    }
    if (window.ZenvePharmacyDashboard && typeof window.ZenvePharmacyDashboard.close === 'function') {
      try { window.ZenvePharmacyDashboard.close(); } catch (e) {}
    }
    if (window.ZenveClinicsDashboard && typeof window.ZenveClinicsDashboard.close === 'function') {
      try { window.ZenveClinicsDashboard.close(); } catch (e) {}
    }
    if (window.ZenveReportsDashboard && typeof window.ZenveReportsDashboard.close === 'function') {
      try { window.ZenveReportsDashboard.close(); } catch (e) {}
    }
    if (window.ZenveAlertsDashboard && typeof window.ZenveAlertsDashboard.close === 'function') {
      try { window.ZenveAlertsDashboard.close(); } catch (e) {}
    }
    if (window.ZenveSettingsDashboard && typeof window.ZenveSettingsDashboard.close === 'function') {
      try { window.ZenveSettingsDashboard.close(); } catch (e) {}
    }

    document.querySelectorAll('.zpanel-root, [id$="-root"]').forEach(function (el) {
      if (el.id !== 'zfa-root') el.classList.remove('zpanel-open', 'zod-open', 'zsd-open', 'zpid-open', 'zph-open', 'zch-open', 'zrep-open', 'zalt-open', 'zset-open');
    });

    // Dismiss any Radix placeholder dialog
    try {
      document.querySelectorAll('[role="dialog"]').forEach(function (d) {
        if (d.closest('#zfa-root')) return;
        var btn = d.querySelector('button[aria-label*="close" i], button:last-child');
        if (btn) btn.click();
      });
    } catch (e) {}

    if (tab && TABS.some(function (t) { return t.id === tab; })) {
      S.tab = tab;
    } else if (!S.tab) {
      S.tab = 'dashboard';
    }

    build();
    S.open = true;
    root.classList.add('zfa-open');
    render();

    var targetTab = TABS.find(function (t) { return t.id === S.tab; });
    if (targetTab && targetTab.hash && window.location.hash !== targetTab.hash) {
      try { history.replaceState(null, '', targetTab.hash); } catch (e) {}
    }
  }

  function close() {
    S.open = false;
    if (root) root.classList.remove('zfa-open');
    if (window.location.hash && tabFromHash(window.location.hash)) {
      try { history.replaceState(null, '', window.location.pathname + window.location.search); } catch (e) {}
    }
  }

  function switchTab(tabId) {
    if (!tabId || !TABS.some(function (t) { return t.id === tabId; })) return;
    S.tab = tabId;
    render();
    var targetTab = TABS.find(function (t) { return t.id === tabId; });
    if (targetTab && targetTab.hash) {
      try { history.replaceState(null, '', targetTab.hash); } catch (e) {}
    }
    if (root) root.scrollTop = 0;
  }

  /* ── Modals ───────────────────────────────────────────────────── */
  function showModal(html) {
    var existing = document.getElementById('zfa-active-modal');
    if (existing) existing.remove();

    var backdrop = document.createElement('div');
    backdrop.id = 'zfa-active-modal';
    backdrop.className = 'zfa-modal-backdrop';
    backdrop.innerHTML = '<div class="zfa-modal">' + html + '</div>';
    backdrop.onclick = function (e) {
      if (e.target === backdrop) backdrop.remove();
    };
    document.body.appendChild(backdrop);
  }

  function closeModal() {
    var existing = document.getElementById('zfa-active-modal');
    if (existing) existing.remove();
  }

  function showTxnModal() {
    var html = [
      '<div class="zfa-modal-head">',
        '<h3 class="zfa-modal-title">Record General Ledger Transaction</h3>',
        '<button class="zfa-btn" onclick="ZenveFinanceDashboard.closeModal()">✕</button>',
      '</div>',
      '<form onsubmit="event.preventDefault(); alert(\'Transaction recorded to General Ledger!\'); ZenveFinanceDashboard.closeModal();">',
        '<div class="zfa-form-group"><label>Transaction Description</label><input type="text" class="zfa-input" placeholder="e.g. Diagnostic Equipment Service Fee" required /></div>',
        '<div class="zfa-form-row">',
          '<div class="zfa-form-group"><label>Account Category</label><select class="zfa-select"><option>Operating Revenue</option><option>Direct COGS</option><option>Clinical OPEX</option><option>Capital CAPEX</option></select></div>',
          '<div class="zfa-form-group"><label>Amount (INR)</label><input type="text" class="zfa-input" placeholder="₹0" required /></div>',
        '</div>',
        '<div class="zfa-form-row">',
          '<div class="zfa-form-group"><label>Payment Rail</label><select class="zfa-select"><option>HDFC Core CMS (RTGS)</option><option>Razorpay UPI</option><option>Pine Labs POS</option><option>Corporate Card</option></select></div>',
          '<div class="zfa-form-group"><label>Linked Facility</label><select class="zfa-select"><option>Koramangala 0.0x7</option><option>Bandra Multi-Specialty</option><option>Okhla Animal Hospital</option><option>Network Wide</option></select></div>',
        '</div>',
        '<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:16px;">',
          '<button type="button" class="zfa-btn" onclick="ZenveFinanceDashboard.closeModal()">Cancel</button>',
          '<button type="submit" class="zfa-btn primary">Record Entry</button>',
        '</div>',
      '</form>'
    ].join('');
    showModal(html);
  }

  function showInvoiceModal() {
    var html = [
      '<div class="zfa-modal-head">',
        '<h3 class="zfa-modal-title">Generate Compliant GST Tax Invoice</h3>',
        '<button class="zfa-btn" onclick="ZenveFinanceDashboard.closeModal()">✕</button>',
      '</div>',
      '<form onsubmit="event.preventDefault(); alert(\'GST Tax Invoice generated and IRN portal synced!\'); ZenveFinanceDashboard.closeModal();">',
        '<div class="zfa-form-group"><label>Pet Parent / Client Name</label><input type="text" class="zfa-input" placeholder="e.g. Kunal Sharma (Pet: Bruno)" required /></div>',
        '<div class="zfa-form-group"><label>Clinical Service Description</label><input type="text" class="zfa-input" placeholder="e.g. TPLO Surgical Package + Inpatient Care" required /></div>',
        '<div class="zfa-form-row">',
          '<div class="zfa-form-group"><label>Taxable Amount (INR)</label><input type="text" class="zfa-input" placeholder="₹0" required /></div>',
          '<div class="zfa-form-group"><label>GST Slab</label><select class="zfa-select"><option>18% GST (9% CGST + 9% SGST)</option><option>18% IGST (Interstate)</option><option>0% Exempted Healthcare</option></select></div>',
        '</div>',
        '<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:16px;">',
          '<button type="button" class="zfa-btn" onclick="ZenveFinanceDashboard.closeModal()">Cancel</button>',
          '<button type="submit" class="zfa-btn primary">Issue e-Invoice</button>',
        '</div>',
      '</form>'
    ].join('');
    showModal(html);
  }

  function showExpenseModal() {
    var html = [
      '<div class="zfa-modal-head">',
        '<h3 class="zfa-modal-title">Submit New Expense Voucher</h3>',
        '<button class="zfa-btn" onclick="ZenveFinanceDashboard.closeModal()">✕</button>',
      '</div>',
      '<form onsubmit="event.preventDefault(); alert(\'Expense voucher submitted for finance controller review!\'); ZenveFinanceDashboard.closeModal();">',
        '<div class="zfa-form-group"><label>Expense Description</label><input type="text" class="zfa-input" placeholder="e.g. Shimadzu Digital X-Ray Annual Calibration" required /></div>',
        '<div class="zfa-form-row">',
          '<div class="zfa-form-group"><label>Cost Center</label><select class="zfa-select"><option>Clinical Operations</option><option>Facilities & Infrastructure</option><option>Hospital Utilities</option><option>Marketing & CAC</option></select></div>',
          '<div class="zfa-form-group"><label>Amount (INR)</label><input type="text" class="zfa-input" placeholder="₹0" required /></div>',
        '</div>',
        '<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:16px;">',
          '<button type="button" class="zfa-btn" onclick="ZenveFinanceDashboard.closeModal()">Cancel</button>',
          '<button type="submit" class="zfa-btn primary">Submit Voucher</button>',
        '</div>',
      '</form>'
    ].join('');
    showModal(html);
  }

  function showRefundModal() {
    var html = [
      '<div class="zfa-modal-head">',
        '<h3 class="zfa-modal-title">Authorize Customer Refund</h3>',
        '<button class="zfa-btn" onclick="ZenveFinanceDashboard.closeModal()">✕</button>',
      '</div>',
      '<form onsubmit="event.preventDefault(); alert(\'Refund authorization sent to Payment Gateway!\'); ZenveFinanceDashboard.closeModal();">',
        '<div class="zfa-form-group"><label>Original Invoice #</label><input type="text" class="zfa-input" placeholder="e.g. INV-ZV-8021" required /></div>',
        '<div class="zfa-form-row">',
          '<div class="zfa-form-group"><label>Refund Amount (INR)</label><input type="text" class="zfa-input" placeholder="₹0" required /></div>',
          '<div class="zfa-form-group"><label>Refund Channel</label><select class="zfa-select"><option>Original UPI Rail</option><option>Original Card Rail</option><option>Zenve Wallet Credit</option></select></div>',
        '</div>',
        '<div class="zfa-form-group"><label>Clinical / Reason Justification</label><input type="text" class="zfa-input" placeholder="e.g. Consultation Cancelled Prior to Triage" required /></div>',
        '<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:16px;">',
          '<button type="button" class="zfa-btn" onclick="ZenveFinanceDashboard.closeModal()">Cancel</button>',
          '<button type="submit" class="zfa-btn danger">Authorize Reversal</button>',
        '</div>',
      '</form>'
    ].join('');
    showModal(html);
  }

  /* ── Event Interception (Sidebar Clicks & Hash Change) ─────────── */
  function onHashChange() {
    var t = tabFromHash(window.location.hash);
    if (t) {
      open(t);
    } else if (S.open && window.location.hash && window.location.hash !== '#') {
      var otherDomains = ['sales', 'operations', 'inventory', 'pharmacy', 'clinics', 'doctors', 'reports', 'alerts', 'settings'];
      var isOther = otherDomains.some(function(d) { return window.location.hash.indexOf(d) >= 0; });
      if (isOther) close();
    }
  }

  function initInterception() {
    document.addEventListener('click', function (e) {
      // Ignore if user is only toggling the accordion dropdown
      var accordionBtn = e.target.closest('button[aria-expanded]');
      if (accordionBtn) {
        return;
      }

      var el = e.target.closest('button, a');
      if (!el) return;

      // Check hash attribute
      var href = el.getAttribute('href');
      var t = tabFromHash(href);
      if (t) {
        e.preventDefault();
        open(t);
        return;
      }

      // Check button text in sidebar
      var isSidebar = !!el.closest('aside, nav, [class*="sidebar"]');
      if (isSidebar) {
        var txt = el.textContent || '';
        var t2 = tabFromText(txt);
        if (t2) {
          e.preventDefault();
          e.stopPropagation();
          open(t2);
        }
      }
    }, true);

    window.addEventListener('hashchange', onHashChange);
    // Initial load check
    if (window.location.hash) {
      var initial = tabFromHash(window.location.hash);
      if (initial) {
        setTimeout(function () { open(initial); }, 100);
      }
    }
  }

  /* ── Public API ────────────────────────────────────────────────── */
  window.ZenveFinanceDashboard = {
    open: open,
    close: close,
    switchTab: switchTab,
    closeModal: closeModal,
    showTxnModal: showTxnModal,
    showInvoiceModal: showInvoiceModal,
    showExpenseModal: showExpenseModal,
    showRefundModal: showRefundModal
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initInterception);
  } else {
    initInterception();
  }
})();