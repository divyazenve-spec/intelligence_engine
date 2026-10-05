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
    { id: 'balance-sheet',label: 'Balance Sheet',       icon: '🏛️', hash: '#balance-sheet',       badge: '₹4.43 Cr NW', title: 'Balance Sheet & Capital Structure', sub: 'Current liquidity, hospital equipment capital assets, and shareholder net worth' },
    { id: 'cash-flow',    label: 'Cash Flow',           icon: '💧', hash: '#cash-flow',           badge: '14.2 Mo Run', title: 'Cash Flow Statement & Liquidity', sub: 'Direct operating cash conversion, clinical CAPEX, and liquid treasury' },
    { id: 'revenue',      label: 'Revenue',             icon: '💵', hash: '#revenue',             badge: '₹78.4L MRR', title: 'Revenue Intelligence & Inflows', sub: 'Clinical OPD, surgical IPD, veterinary pharmacy, and corporate B2B contracts' },
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
        kpiHtml('Gross Invoiced Revenue', '₹78.40 Lakh', '+18.4% YoY', 'up', '14 Facilities + Digital', '💰'),
        kpiHtml('Operating EBITDA', '₹15.70 Lakh', '20.02% Margin', 'up', '+49.5% vs Plan', '⚡'),
        kpiHtml('Net Profit (PAT)', '₹9.25 Lakh', '11.8% Net PAT', 'up', 'Post-tax commercial surplus', '🏆'),
        kpiHtml('Liquid Cash & Bank', '₹1.48 Crore', '14.2 mo runway', 'up', 'Zero short-term debt', '🏦'),
        kpiHtml('Accounts Receivable', '₹20.82 Lakh', 'DSO: 22 Days', 'up', '68.2% Current', '📥'),
        kpiHtml('Accounts Payable', '₹25.90 Lakh', 'DPO: 34 Days', 'up', 'Optimal vendor credit', '📤'),
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
              '<tbody>',
                '<tr><td><b>Gross Operating Revenue</b></td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#38bdf8;">₹78,40,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹75,00,000</td><td style="text-align:right;color:#10b981;">+4.5%</td></tr>',
                '<tr><td>Direct Cost of Goods Sold (COGS)</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#f87171;">₹34,50,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹36,00,000</td><td style="text-align:right;color:#10b981;">-4.2%</td></tr>',
                '<tr style="background:rgba(56,189,248,0.06);font-weight:700;"><td>Gross Profit (56.0%)</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#10b981;">₹43,90,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹39,00,000</td><td style="text-align:right;color:#10b981;">+12.6%</td></tr>',
                '<tr><td>Operating Expenses (OPEX)</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#fbbf24;">₹28,20,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹27,50,000</td><td style="text-align:right;color:#fbbf24;">+2.5%</td></tr>',
                '<tr style="background:rgba(56,189,248,0.08);font-weight:700;"><td>Operating EBITDA (20.02%)</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#38bdf8;">₹15,70,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹11,50,000</td><td style="text-align:right;color:#10b981;">+36.5%</td></tr>',
                '<tr><td>Depreciation & Amortization</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹2,40,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹2,40,000</td><td style="text-align:right;">0.0%</td></tr>',
                '<tr><td>Corporate Tax Provision (25.17%)</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#f87171;">₹3,10,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹2,02,500</td><td style="text-align:right;color:#38bdf8;">+53.1%</td></tr>',
                '<tr style="background:rgba(16,185,129,0.08);font-weight:700;"><td>Net Profit After Tax (PAT - 11.8%)</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#34d399;">₹9,25,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹6,07,500</td><td style="text-align:right;color:#10b981;">+52.2%</td></tr>',
              '</tbody>',
            '</table>',
          '</div>',
        '</div>',
        '<div class="zfa-card">',
          '<div class="zfa-card-head">',
            '<div><h3 class="zfa-card-title">⚖️ Working Capital & Aging Profile</h3><p class="zfa-card-sub">Trade receivables vs supplier payables maturity</p></div>',
            '<button class="zfa-btn primary" onclick="ZenveFinanceDashboard.switchTab(\'cash-flow\')">View Cash Flow →</button>',
          '</div>',
          '<div style="display:flex;flex-direction:column;gap:12px;">',
            '<div style="background:rgba(0,0,0,0.2);padding:14px;border-radius:8px;border:1px solid rgba(255,255,255,0.06);"><div style="display:flex;justify-content:space-between;margin-bottom:6px;"><b>Current (0–30 Days)</b><span class="zfa-badge green">LOW RISK</span></div><div style="font-size:11px;color:#94a3b8;">Receivables: <strong style="color:#38bdf8;">₹14,20,000</strong> (68.2%) · Payables: <strong style="color:#fbbf24;">₹18,40,000</strong> (71.0%)</div></div>',
            '<div style="background:rgba(0,0,0,0.2);padding:14px;border-radius:8px;border:1px solid rgba(255,255,255,0.06);"><div style="display:flex;justify-content:space-between;margin-bottom:6px;"><b>31–60 Days (Grace Period)</b><span class="zfa-badge blue">NORMAL</span></div><div style="font-size:11px;color:#94a3b8;">Receivables: <strong style="color:#38bdf8;">₹4,10,000</strong> (19.7%) · Payables: <strong style="color:#fbbf24;">₹5,20,000</strong> (20.1%)</div></div>',
            '<div style="background:rgba(0,0,0,0.2);padding:14px;border-radius:8px;border:1px solid rgba(255,255,255,0.06);"><div style="display:flex;justify-content:space-between;margin-bottom:6px;"><b>61–90 Days (Overdue Warning)</b><span class="zfa-badge amber">MEDIUM RISK</span></div><div style="font-size:11px;color:#94a3b8;">Receivables: <strong style="color:#38bdf8;">₹1,80,000</strong> (8.6%) · Payables: <strong style="color:#fbbf24;">₹1,90,000</strong> (7.3%)</div></div>',
            '<div style="background:rgba(0,0,0,0.2);padding:14px;border-radius:8px;border:1px solid rgba(255,255,255,0.06);"><div style="display:flex;justify-content:space-between;margin-bottom:6px;"><b>90+ Days (Delinquent/Disputed)</b><span class="zfa-badge red">ACTION REQUIRED</span></div><div style="font-size:11px;color:#94a3b8;">Receivables: <strong style="color:#38bdf8;">₹72,000</strong> (3.5%) · Payables: <strong style="color:#fbbf24;">₹40,000</strong> (1.6%)</div></div>',
          '</div>',
        '</div>',
      '</div>'
    ].join('');
  }

  // 2. Profit & Loss
  function renderPnL() {
    return [
      '<div class="zfa-kpi-grid">',
        kpiHtml('Operating Revenue', '₹78.40 Lakh', '+5.7% vs Budget', 'up', 'Clinical + Pharma + Digital', '💰'),
        kpiHtml('Total Direct COGS', '₹34.50 Lakh', '44.0% of Rev', 'up', 'Target: <46%', '📦'),
        kpiHtml('Gross Profit', '₹43.90 Lakh', '56.0% Gross Margin', 'up', '+14.9% vs Plan', '💎'),
        kpiHtml('Total OPEX', '₹28.20 Lakh', '35.9% of Rev', 'up', 'Disciplined burn', '🏢'),
        kpiHtml('Operating EBITDA', '₹15.70 Lakh', '20.02% Margin', 'up', '+49.5% vs Plan', '⚡'),
        kpiHtml('Net PAT', '₹9.25 Lakh', '11.8% Net Margin', 'up', 'Net profit surplus', '🏆'),
      '</div>',
      '<div class="zfa-card">',
        '<div class="zfa-card-head">',
          '<div><h3 class="zfa-card-title">📑 Comprehensive GAAP Income Statement</h3><p class="zfa-card-sub">Audited waterfall from Top-line Gross Revenue to Bottom-line Net PAT</p></div>',
          '<button class="zfa-btn primary" onclick="alert(\'Downloading official signed GAAP P&L statement (PDF)...\')">Export Audited P&L</button>',
        '</div>',
        '<div class="zfa-table-wrap">',
          '<table class="zfa-table">',
            '<thead><tr><th>Code</th><th>Line Item Description</th><th>Classification</th><th style="text-align:right;">Actual</th><th style="text-align:right;">Budget</th><th style="text-align:right;">Variance</th><th style="text-align:right;">% Revenue</th></tr></thead>',
            '<tbody>',
              '<tr><td>REV-01</td><td><b>Outpatient OPD Consultations & Preventive Vaccines</b></td><td><span class="zfa-badge green">Revenue</span></td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:600;">₹28,40,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹26,00,000</td><td style="text-align:right;color:#10b981;">+9.2%</td><td style="text-align:right;">36.2%</td></tr>',
              '<tr><td>REV-02</td><td><b>Tertiary Hospital Surgeries & Inpatient HDU</b></td><td><span class="zfa-badge green">Revenue</span></td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:600;">₹24,80,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹22,50,000</td><td style="text-align:right;color:#10b981;">+10.2%</td><td style="text-align:right;">31.6%</td></tr>',
              '<tr><td>REV-03</td><td><b>Veterinary Pharmacy Prescription Dispensing</b></td><td><span class="zfa-badge green">Revenue</span></td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:600;">₹14,20,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹15,00,000</td><td style="text-align:right;color:#f87171;">-5.3%</td><td style="text-align:right;">18.1%</td></tr>',
              '<tr><td>REV-04</td><td><b>Pet Care E-Commerce & Rapid Home Delivery</b></td><td><span class="zfa-badge green">Revenue</span></td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:600;">₹6,80,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹7,20,000</td><td style="text-align:right;color:#f87171;">-5.6%</td><td style="text-align:right;">8.7%</td></tr>',
              '<tr><td>REV-05</td><td><b>B2B Corporate Wellness Partnerships & Referrals</b></td><td><span class="zfa-badge green">Revenue</span></td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:600;">₹4,20,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹3,50,000</td><td style="text-align:right;color:#10b981;">+20.0%</td><td style="text-align:right;">5.4%</td></tr>',
              '<tr style="background:rgba(56,189,248,0.06);font-weight:700;"><td>TOT-REV</td><td>TOTAL GROSS REVENUE</td><td><span class="zfa-badge blue">Subtotal</span></td><td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#38bdf8;">₹78,40,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹74,20,000</td><td style="text-align:right;color:#10b981;">+5.7%</td><td style="text-align:right;">100.0%</td></tr>',
              '<tr><td>COG-01</td><td>Direct Pharma, Implants & Consumable COGS</td><td><span class="zfa-badge red">COGS</span></td><td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#f87171;">₹34,50,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹36,00,000</td><td style="text-align:right;color:#10b981;">-4.2%</td><td style="text-align:right;">44.0%</td></tr>',
              '<tr style="background:rgba(16,185,129,0.08);font-weight:700;"><td>TOT-GP</td><td>GROSS PROFIT (56.0%)</td><td><span class="zfa-badge green">Key Metric</span></td><td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#34d399;">₹43,90,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹38,20,000</td><td style="text-align:right;color:#10b981;">+14.9%</td><td style="text-align:right;">56.0%</td></tr>',
              '<tr><td>OPX-01</td><td>Surgeon, Nursing & Clinical Staff Payroll</td><td><span class="zfa-badge amber">OPEX</span></td><td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#fbbf24;">₹15,40,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹15,00,000</td><td style="text-align:right;color:#fbbf24;">+2.7%</td><td style="text-align:right;">19.6%</td></tr>',
              '<tr><td>OPX-02</td><td>Hospital Leases & Real Estate Rentals (14 sites)</td><td><span class="zfa-badge amber">OPEX</span></td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹6,20,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹6,20,000</td><td style="text-align:right;">0.0%</td><td style="text-align:right;">7.9%</td></tr>',
              '<tr><td>OPX-03</td><td>Hospital Utilities, Medical Waste & Marketing</td><td><span class="zfa-badge amber">OPEX</span></td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹6,60,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹6,30,000</td><td style="text-align:right;color:#fbbf24;">+4.8%</td><td style="text-align:right;">8.4%</td></tr>',
              '<tr style="background:rgba(56,189,248,0.12);font-weight:700;"><td>TOT-EBITDA</td><td>OPERATING EBITDA (20.02%)</td><td><span class="zfa-badge blue">Key Metric</span></td><td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#38bdf8;">₹15,70,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹10,50,000</td><td style="text-align:right;color:#10b981;">+49.5%</td><td style="text-align:right;">20.0%</td></tr>',
              '<tr><td>NON-01</td><td>Depreciation, Amortization & Debt Interest</td><td><span class="zfa-badge">Below EBITDA</span></td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹3,35,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹3,40,000</td><td style="text-align:right;color:#10b981;">-1.5%</td><td style="text-align:right;">4.3%</td></tr>',
              '<tr><td>TAX-01</td><td>Corporate Income Tax Provision (25.17%)</td><td><span class="zfa-badge">Statutory</span></td><td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#f87171;">₹3,10,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹1,80,000</td><td style="text-align:right;color:#38bdf8;">+72.2%</td><td style="text-align:right;">4.0%</td></tr>',
              '<tr style="background:rgba(16,185,129,0.14);font-weight:700;"><td>TOT-PAT</td><td>NET PROFIT AFTER TAX (PAT - 11.8%)</td><td><span class="zfa-badge green">Final PAT</span></td><td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#34d399;">₹9,25,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹5,30,000</td><td style="text-align:right;color:#10b981;">+74.5%</td><td style="text-align:right;">11.8%</td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  // 3. Balance Sheet
  function renderBalanceSheet() {
    return [
      '<div class="zfa-kpi-grid">',
        kpiHtml('Total Capital Assets', '₹6.70 Crore', '+2.8% QoQ', 'up', 'Fully balanced', '🏛️'),
        kpiHtml('Shareholders Equity', '₹4.43 Crore', '66.2% of Capital', 'up', 'Strong solvency', '💎'),
        kpiHtml('Current Ratio', '3.59x', 'Standard >1.5x', 'up', 'Ample liquidity', '💧'),
        kpiHtml('Quick Ratio', '3.24x', 'Excl inventory', 'up', 'Instant solvency', '⚡'),
        kpiHtml('Debt to Equity', '0.11x', 'Conservative', 'up', 'Term debt: ₹48 Lakh', '🛡️'),
        kpiHtml('Net Working Capital', '₹1.41 Crore', '+27.4% QoQ', 'up', 'Current A - Current L', '📈'),
      '</div>',
      '<div class="zfa-grid-2">',
        '<div class="zfa-card">',
          '<div class="zfa-card-head"><div><h3 class="zfa-card-title">💼 Assets (Total: ₹6.70 Cr)</h3><p class="zfa-card-sub">Current liquid resources and fixed clinical equipment</p></div></div>',
          '<div class="zfa-table-wrap">',
            '<table class="zfa-table">',
              '<thead><tr><th>Asset Class</th><th style="text-align:right;">Balance</th><th style="text-align:right;">Share %</th></tr></thead>',
              '<tbody>',
                '<tr><td>Cash & Cash Equivalents (HDFC & ICICI)</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:600;color:#10b981;">₹1,48,20,000</td><td style="text-align:right;">22.1%</td></tr>',
                '<tr><td>Trade Receivables (Insurance & Corporate TPA)</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:600;color:#38bdf8;">₹20,82,000</td><td style="text-align:right;">3.1%</td></tr>',
                '<tr><td>Pharma & Surgical Consumable Inventory</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:600;">₹18,65,000</td><td style="text-align:right;">2.8%</td></tr>',
                '<tr><td>Prepaid Clinical Leases & Deposits</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:600;">₹8,40,000</td><td style="text-align:right;">1.3%</td></tr>',
                '<tr style="background:rgba(255,255,255,0.04);font-weight:700;"><td>TOTAL CURRENT ASSETS</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#38bdf8;">₹1,96,07,000</td><td style="text-align:right;">29.3%</td></tr>',
                '<tr><td>Modular Surgical OTs & DR Imaging Scanners</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:600;">₹2,84,00,000</td><td style="text-align:right;">42.4%</td></tr>',
                '<tr><td>Hospital Leasehold Infrastructure (14 Facilities)</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:600;">₹1,12,00,000</td><td style="text-align:right;">16.7%</td></tr>',
                '<tr><td>Tele-PACS & Cloud EMR Software Capitalization</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:600;">₹42,00,000</td><td style="text-align:right;">6.3%</td></tr>',
                '<tr><td>Hospital Landlord Security Deposits</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:600;">₹36,00,000</td><td style="text-align:right;">5.4%</td></tr>',
                '<tr style="background:rgba(255,255,255,0.04);font-weight:700;"><td>TOTAL NON-CURRENT ASSETS</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#38bdf8;">₹4,74,00,000</td><td style="text-align:right;">70.7%</td></tr>',
                '<tr style="background:rgba(56,189,248,0.1);font-weight:700;"><td>TOTAL ASSETS</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#38bdf8;font-size:14px;">₹6,70,07,000</td><td style="text-align:right;">100.0%</td></tr>',
              '</tbody>',
            '</table>',
          '</div>',
        '</div>',
        '<div class="zfa-card">',
          '<div class="zfa-card-head"><div><h3 class="zfa-card-title">⚖️ Liabilities & Equity (Total: ₹6.70 Cr)</h3><p class="zfa-card-sub">External trade obligations and shareholder net worth</p></div></div>',
          '<div class="zfa-table-wrap">',
            '<table class="zfa-table">',
              '<thead><tr><th>Obligation / Capital Component</th><th style="text-align:right;">Balance</th><th style="text-align:right;">Share %</th></tr></thead>',
              '<tbody>',
                '<tr><td>Trade Payables (Pharma & Consumable Vendors)</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#f87171;">₹25,90,000</td><td style="text-align:right;">3.9%</td></tr>',
                '<tr><td>Accrued Surgeon Professional Fees & Payroll</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#f87171;">₹14,20,000</td><td style="text-align:right;">2.1%</td></tr>',
                '<tr><td>Statutory GST & TDS Withholding Obligations</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#fbbf24;">₹8,45,000</td><td style="text-align:right;">1.3%</td></tr>',
                '<tr><td>Advance Unearned Patient Package Deposits</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹6,12,000</td><td style="text-align:right;">0.9%</td></tr>',
                '<tr style="background:rgba(255,255,255,0.04);font-weight:700;"><td>TOTAL CURRENT LIABILITIES</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#f87171;">₹54,67,000</td><td style="text-align:right;">8.2%</td></tr>',
                '<tr><td>SIDBI Modular OT Long-term Equipment Loan</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#fbbf24;">₹48,00,000</td><td style="text-align:right;">7.2%</td></tr>',
                '<tr><td>Long-term Hospital Lease Financial Liabilities</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹1,24,00,000</td><td style="text-align:right;">18.5%</td></tr>',
                '<tr style="background:rgba(255,255,255,0.04);font-weight:700;"><td>TOTAL NON-CURRENT LIABILITIES</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#fbbf24;">₹1,72,00,000</td><td style="text-align:right;">25.7%</td></tr>',
                '<tr><td>Paid-up Common Equity Share Capital</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:600;">₹2,50,00,000</td><td style="text-align:right;">37.3%</td></tr>',
                '<tr><td>Retained Earnings & General Reserve</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:600;color:#10b981;">₹1,57,20,000</td><td style="text-align:right;">23.5%</td></tr>',
                '<tr><td>Current Period Retained PAT Surplus</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:600;color:#10b981;">₹36,20,000</td><td style="text-align:right;">5.4%</td></tr>',
                '<tr style="background:rgba(16,185,129,0.08);font-weight:700;"><td>TOTAL SHAREHOLDERS EQUITY</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#34d399;">₹4,43,40,000</td><td style="text-align:right;">66.2%</td></tr>',
                '<tr style="background:rgba(56,189,248,0.1);font-weight:700;"><td>TOTAL LIABILITIES & EQUITY</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#38bdf8;font-size:14px;">₹6,70,07,000</td><td style="text-align:right;">100.0%</td></tr>',
              '</tbody>',
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
        kpiHtml('Operating Cash (CFO)', '+₹16.30 Lakh', 'Positive OCF', 'up', 'Clinical cash generation', '💧'),
        kpiHtml('Free Cash Flow (FCF)', '+₹5.80 Lakh', 'CFO - CAPEX', 'up', 'Self-funding expansion', '💎'),
        kpiHtml('Monthly Net Burn', '₹0 (Profitable)', 'Cash Flow +', 'up', 'Self-sustaining', '🛡️'),
        kpiHtml('Liquid Runway', '14.2 Months', 'Zero dilution', 'up', 'Conservative buffer', '⏳'),
        kpiHtml('Operating Cash Ratio', '2.98x', 'High coverage', 'up', 'CFO / Current Liab', '📈'),
        kpiHtml('Treasury Cleared', '₹1.48 Crore', '+₹2.45L MTD', 'up', '3 Core Bank Accounts', '🏦'),
      '</div>',
      '<div class="zfa-card">',
        '<div class="zfa-card-head"><div><h3 class="zfa-card-title">🌊 Direct Cash Flow Statement Waterfall</h3><p class="zfa-card-sub">Operating cash collections, capital investments, and financing service</p></div><span class="zfa-badge green">DIRECT GAAP</span></div>',
        '<div class="zfa-table-wrap">',
          '<table class="zfa-table">',
            '<thead><tr><th>Activity Item</th><th>Section</th><th style="text-align:right;">Net Flow (INR)</th></tr></thead>',
            '<tbody>',
              '<tr><td><b>Cash Received from Consultations, Surgeries & Pharmacy</b></td><td>Operating (CFO)</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#10b981;">+₹74,20,000</td></tr>',
              '<tr><td>Cash Paid to Pharmaceutical & Consumable Vendors</td><td>Operating (CFO)</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#f87171;">-₹31,40,000</td></tr>',
              '<tr><td>Salaries Paid to Surgeons, Nurses & Front Desk</td><td>Operating (CFO)</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#f87171;">-₹15,20,000</td></tr>',
              '<tr><td>Hospital Utilities, Leases, Bio-waste & Direct Taxes</td><td>Operating (CFO)</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#f87171;">-₹11,30,000</td></tr>',
              '<tr style="background:rgba(16,185,129,0.08);font-weight:700;"><td>NET CASH GENERATED FROM OPERATING ACTIVITIES (CFO)</td><td>Operating (CFO)</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#34d399;">+₹16,30,000</td></tr>',
              '<tr><td>Capital Outlay: Video Laparoscopy Rig & 2 Mobile ALS Ambulances</td><td>Investing (CFI)</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#f87171;">-₹9,00,000</td></tr>',
              '<tr><td>Tele-radiology PACS & Cloud Practice Management Software</td><td>Investing (CFI)</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#f87171;">-₹1,50,000</td></tr>',
              '<tr style="background:rgba(239,68,68,0.06);font-weight:700;"><td>NET CASH USED IN INVESTING ACTIVITIES (CFI)</td><td>Investing (CFI)</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#f87171;">-₹10,50,000</td></tr>',
              '<tr><td>Principal Repayment on SIDBI Equipment Loan</td><td>Financing (CFF)</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#f87171;">-₹2,40,000</td></tr>',
              '<tr><td>Equipment Lease Financing & Bank Facility Fees</td><td>Financing (CFF)</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#f87171;">-₹95,000</td></tr>',
              '<tr style="background:rgba(239,68,68,0.06);font-weight:700;"><td>NET CASH USED IN FINANCING ACTIVITIES (CFF)</td><td>Financing (CFF)</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#f87171;">-₹3,35,000</td></tr>',
              '<tr style="background:rgba(56,189,248,0.12);font-weight:700;"><td>NET PERIOD INCREASE IN CASH AND CASH EQUIVALENTS</td><td>Net Change</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#38bdf8;font-size:14px;">+₹2,45,000</td></tr>',
              '<tr><td>Cash and Cash Equivalents at Beginning of Period</td><td>Treasury Baseline</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹1,45,75,000</td></tr>',
              '<tr style="background:rgba(16,185,129,0.15);font-weight:700;"><td>CASH AND CASH EQUIVALENTS AT END OF PERIOD</td><td>Closing Balance</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#34d399;font-size:14px;">₹1,48,20,000</td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  // 5. Revenue
  function renderRevenue() {
    return [
      '<div class="zfa-kpi-grid">',
        kpiHtml('Monthly Run-Rate (MRR)', '₹78.40 Lakh', '+18.4% YoY', 'up', 'Current monthly intake', '💰'),
        kpiHtml('Annualized Run-Rate (ARR)', '₹9.40 Crore', '+22.1% YoY', 'up', '14 Network Facilities', '🌐'),
        kpiHtml('Avg Ticket / Consultation', '₹1,626', '+8.4% YoY', 'up', 'Consultation + Rx add-on', '🐾'),
        kpiHtml('Avg Ticket / Surgery', '₹17,465', 'High-complexity', 'up', 'Orthopedics & Neuro', '🩺'),
        kpiHtml('Pharmacy Attach Rate', '78.2%', '+4.2% MoM', 'up', 'High retail conversion', '💊'),
        kpiHtml('ASC 606 / Ind-AS 115', '100% Recognized', 'Zero leakage', 'up', 'Strict delivery audit', '🛡️'),
      '</div>',
      '<div class="zfa-card">',
        '<div class="zfa-card-head"><div><h3 class="zfa-card-title">💵 Revenue Stream Breakdown</h3><p class="zfa-card-sub">Commercial intake across outpatient clinics, surgical hospitals, pharmacy, and corporate accounts</p></div><button class="zfa-btn primary" onclick="alert(\'Exporting revenue breakdown ledger (CSV)...\')">Export Revenue CSV</button></div>',
        '<div class="zfa-table-wrap">',
          '<table class="zfa-table">',
            '<thead><tr><th>Stream Name</th><th>Channel Type</th><th style="text-align:right;">Monthly Revenue</th><th style="text-align:right;">Volume</th><th style="text-align:right;">Avg Ticket</th><th style="text-align:right;">Share %</th><th style="text-align:right;">MoM Growth</th></tr></thead>',
            '<tbody>',
              '<tr><td><b>Outpatient OPD Consults & Preventative Care</b></td><td><span class="zfa-badge blue">Clinical OPD</span></td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#10b981;">₹28,40,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">4,820 visits</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹589</td><td style="text-align:right;font-weight:600;color:#38bdf8;">36.2%</td><td style="text-align:right;color:#10b981;">+12.4%</td></tr>',
              '<tr><td><b>Modular OT Surgeries & Inpatient HDU Beds</b></td><td><span class="zfa-badge green">Surgical IPD</span></td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#10b981;">₹24,80,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">142 cases</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹17,465</td><td style="text-align:right;font-weight:600;color:#38bdf8;">31.6%</td><td style="text-align:right;color:#10b981;">+18.6%</td></tr>',
              '<tr><td><b>Prescription Drugs & Pharmacy Retail</b></td><td><span class="zfa-badge amber">Pharma Retail</span></td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#10b981;">₹14,20,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">6,450 orders</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹220</td><td style="text-align:right;font-weight:600;color:#38bdf8;">18.1%</td><td style="text-align:right;color:#10b981;">+8.2%</td></tr>',
              '<tr><td><b>Pet Care E-Commerce & Rapid Delivery</b></td><td><span class="zfa-badge purple">Digital App</span></td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#10b981;">₹6,80,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">2,980 orders</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹228</td><td style="text-align:right;font-weight:600;color:#38bdf8;">8.7%</td><td style="text-align:right;color:#10b981;">+4.5%</td></tr>',
              '<tr><td><b>B2B Corporate Wellness & Referral Partners</b></td><td><span class="zfa-badge cyan">B2B Contracts</span></td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#10b981;">₹4,20,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">18 clients</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹23,333</td><td style="text-align:right;font-weight:600;color:#38bdf8;">5.4%</td><td style="text-align:right;color:#10b981;">+24.0%</td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  // 6. Expenses
  function renderExpenses() {
    return [
      '<div class="zfa-kpi-grid">',
        kpiHtml('Total Monthly OPEX', '₹28.20 Lakh', '+2.5% vs Plan', 'up', '35.9% of Revenue', '🏢'),
        kpiHtml('Staffing & Payroll', '₹15.40 Lakh', '54.6% of OPEX', 'up', '18 resident surgeons', '👨‍⚕️'),
        kpiHtml('Facility Leases', '₹6.20 Lakh', '22.0% of OPEX', 'up', '14 Network Centers', '📍'),
        kpiHtml('Hospital Utilities', '₹2.40 Lakh', '8.5% of OPEX', 'warn', 'Power & Medical O2', '⚡'),
        kpiHtml('Marketing & CAC', '₹2.60 Lakh', '9.2% of OPEX', 'up', 'Blended CAC: ₹420', '📣'),
        kpiHtml('Budget Compliance', '97.5%', 'High adherence', 'up', 'Within ±5% variance', '🛡️'),
      '</div>',
      '<div class="zfa-card">',
        '<div class="zfa-card-head"><div><h3 class="zfa-card-title">📋 OPEX Departmental Ledger</h3><p class="zfa-card-sub">Approved budgets, actual disbursements, and variance</p></div><button class="zfa-btn primary" onclick="ZenveFinanceDashboard.showExpenseModal()">+ New Expense Voucher</button></div>',
        '<div class="zfa-table-wrap">',
          '<table class="zfa-table">',
            '<thead><tr><th>Code</th><th>Expense Line Item</th><th>Cost Center</th><th style="text-align:right;">Budget</th><th style="text-align:right;">Actual Spend</th><th style="text-align:right;">Variance</th><th style="text-align:right;">% OPEX</th></tr></thead>',
            '<tbody>',
              '<tr><td>EXP-PAY-01</td><td><b>Veterinary Surgeons, Clinicians & Nursing Roster</b></td><td>Clinical Operations</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹15,00,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#f87171;">₹15,40,000</td><td style="text-align:right;color:#fbbf24;">+2.7%</td><td style="text-align:right;">54.6%</td></tr>',
              '<tr><td>EXP-LSE-02</td><td><b>Hospital Real Estate & Clinic Leases (14 sites)</b></td><td>Facilities & Infrastructure</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹6,20,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#f87171;">₹6,20,000</td><td style="text-align:right;color:#94a3b8;">0.0%</td><td style="text-align:right;">22.0%</td></tr>',
              '<tr><td>EXP-UTL-03</td><td><b>Clinical Electricity, Medical Gas & Waste Disposal</b></td><td>Hospital Utilities</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹2,20,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#f87171;">₹2,40,000</td><td style="text-align:right;color:#f87171;">+9.1%</td><td style="text-align:right;">8.5%</td></tr>',
              '<tr><td>EXP-MKT-04</td><td><b>Pet Parent Digital Acquisition & Retention</b></td><td>Marketing & Growth</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹2,80,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#10b981;">₹2,60,000</td><td style="text-align:right;color:#10b981;">-7.1%</td><td style="text-align:right;">9.2%</td></tr>',
              '<tr><td>EXP-TEC-05</td><td><b>Cloud EMR, Tele-radiology Storage & Practice SaaS</b></td><td>Information Technology</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹1,50,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#f87171;">₹1,60,000</td><td style="text-align:right;color:#fbbf24;">+6.7%</td><td style="text-align:right;">5.7%</td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  // 7. COGS
  function renderCOGS() {
    return [
      '<div class="zfa-kpi-grid">',
        kpiHtml('Total Monthly COGS', '₹34.50 Lakh', '-4.2% under plan', 'up', '44.0% of revenue', '📦'),
        kpiHtml('Pharma Procurement', '₹14.50 Lakh', '42.0% of COGS', 'up', 'Vaccines & Cold Chain', '💊'),
        kpiHtml('Surgical Hardware', '₹9.80 Lakh', '28.4% of COGS', 'up', 'Titanium TPLO & Pins', '🔩'),
        kpiHtml('Diagnostic Consumables', '₹5.40 Lakh', '15.7% of COGS', 'up', 'IDEXX lab cartridges', '🔬'),
        kpiHtml('Manufacturer Rebates', '₹12.14 Lakh', 'Annualized pool', 'up', 'Direct gross margin credit', '🎁'),
        kpiHtml('Inventory Waste Rate', '0.42%', 'Industry: 1.8%', 'up', 'Strict FEFO adherence', '🛡️'),
      '</div>',
      '<div class="zfa-card">',
        '<div class="zfa-card-head"><div><h3 class="zfa-card-title">📦 Direct Material Absorption Schedule</h3><p class="zfa-card-sub">Procurement costs linked to healthcare service delivery</p></div><button class="zfa-btn primary" onclick="alert(\'Opening purchase order procurement terminal...\')">Vendor PO Run</button></div>',
        '<div class="zfa-table-wrap">',
          '<table class="zfa-table">',
            '<thead><tr><th>Code</th><th>Category</th><th style="text-align:right;">Direct Spend</th><th style="text-align:right;">Linked Revenue</th><th style="text-align:right;">Gross Margin</th><th>Key Suppliers</th></tr></thead>',
            '<tbody>',
              '<tr><td>COG-PHR-01</td><td><b>Veterinary Pharma (Antibiotics, Vaccines, NSAIDs)</b></td><td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#f87171;">₹14,50,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#10b981;">₹26,80,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#38bdf8;">45.9%</td><td>Zoetis, Boehringer, Intas</td></tr>',
              '<tr><td>COG-SUR-02</td><td><b>Surgical Titanium Implants, TPLO & Anesthetics</b></td><td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#f87171;">₹9,80,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#10b981;">₹24,80,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#38bdf8;">60.5%</td><td>DePuy Synthes Vet, Abbott</td></tr>',
              '<tr><td>COG-DX-03</td><td><b>Diagnostic Reagents, IDEXX Cartridges & Strips</b></td><td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#f87171;">₹5,40,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#10b981;">₹12,40,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#38bdf8;">56.5%</td><td>IDEXX India, Mindray</td></tr>',
              '<tr><td>COG-CON-04</td><td><b>Sterile Surgical Drapes, Gowns, Gloves & Sutures</b></td><td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#f87171;">₹4,80,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#10b981;">₹14,40,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#38bdf8;">66.7%</td><td>Medline, Ethicon Sutures</td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  // 8. Gross Profit
  function renderGrossProfit() {
    return [
      '<div class="zfa-kpi-grid">',
        kpiHtml('Total Gross Profit', '₹43.90 Lakh', '+14.9% vs Plan', 'up', 'Revenue minus COGS', '💎'),
        kpiHtml('Blended Gross Margin', '56.0%', '+2.2% pts YoY', 'up', 'Target: >52.0%', '📈'),
        kpiHtml('Surgical Gross Margin', '64.2%', 'Highest margin unit', 'up', 'Specialist OTs', '🩺'),
        kpiHtml('Diagnostics Margin', '62.5%', 'High capital efficiency', 'up', 'In-house blood lab', '🔬'),
        kpiHtml('Pharmacy Gross Margin', '42.0%', '+1.8% pts QoQ', 'up', 'Direct OEM sourcing', '💊'),
        kpiHtml('Price Realization Index', '103.4', '+3.4% YoY', 'up', 'Zero discounting in OTs', '🛡️'),
      '</div>',
      '<div class="zfa-card">',
        '<div class="zfa-card-head"><div><h3 class="zfa-card-title">💎 Gross Profit Contribution by Clinical Division</h3><p class="zfa-card-sub">Department gross margins after deducting direct medical materials</p></div><span class="zfa-badge green">ALL UNITS EXCEED TARGET</span></div>',
        '<div class="zfa-table-wrap">',
          '<table class="zfa-table">',
            '<thead><tr><th>Clinical Unit</th><th style="text-align:right;">Gross Revenue</th><th style="text-align:right;">Direct COGS</th><th style="text-align:right;">Gross Profit</th><th style="text-align:right;">Gross Margin %</th><th style="text-align:right;">Target Margin</th><th style="text-align:right;">Status</th></tr></thead>',
            '<tbody>',
              '<tr><td><b>Surgical Operations & Modular OTs</b></td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹24,80,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#f87171;">₹8,88,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#10b981;">₹15,92,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#38bdf8;">64.2%</td><td style="text-align:right;">60.0%</td><td style="text-align:right;"><span class="zfa-badge green">Exceeding</span></td></tr>',
              '<tr><td><b>Diagnostic Pathology & Imaging (DR/USG)</b></td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹12,40,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#f87171;">₹4,65,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#10b981;">₹7,75,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#38bdf8;">62.5%</td><td style="text-align:right;">60.0%</td><td style="text-align:right;"><span class="zfa-badge green">Exceeding</span></td></tr>',
              '<tr><td><b>Outpatient Care & Wellness Consults</b></td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹28,40,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#f87171;">₹11,82,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#10b981;">₹16,58,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#38bdf8;">58.4%</td><td style="text-align:right;">55.0%</td><td style="text-align:right;"><span class="zfa-badge green">Exceeding</span></td></tr>',
              '<tr><td><b>Veterinary Pharmacy & Prescription Retail</b></td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹14,20,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#f87171;">₹8,24,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#10b981;">₹5,96,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#38bdf8;">42.0%</td><td style="text-align:right;">40.0%</td><td style="text-align:right;"><span class="zfa-badge blue">On Target</span></td></tr>',
              '<tr><td><b>Pet Food, Supplements & Accessories E-Com</b></td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹6,80,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#f87171;">₹4,86,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#10b981;">₹1,94,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#38bdf8;">28.5%</td><td style="text-align:right;">28.0%</td><td style="text-align:right;"><span class="zfa-badge blue">On Target</span></td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  // 9. EBITDA
  function renderEBITDA() {
    return [
      '<div class="zfa-kpi-grid">',
        kpiHtml('Operating EBITDA (MTD)', '₹15.70 Lakh', '+49.5% vs Plan', 'up', '20.02% of Revenue', '⚡'),
        kpiHtml('Normalized Adj. EBITDA', '₹17.50 Lakh', '22.3% Adj Margin', 'up', 'Adding non-recurring', '💎'),
        kpiHtml('Annualized EBITDA Run-rate', '₹1.88 Crore', '+28.4% YoY', 'up', 'Debt service >15x', '📈'),
        kpiHtml('EBITDA-to-Cash Ratio', '76.4%', 'High conversion', 'up', 'CFO / EBITDA', '💧'),
        kpiHtml('Flagship Hospital EBITDA', '28.9%', 'Koramangala 24x7', 'up', 'Highest volume hub', '🏥'),
        kpiHtml('Break-even Month', '3.2 Months', '-1.4 mo faster', 'up', 'Avg new facility', '⏱️'),
      '</div>',
      '<div class="zfa-card">',
        '<div class="zfa-card-head"><div><h3 class="zfa-card-title">⚡ Facility-Level EBITDA Ranking</h3><p class="zfa-card-sub">Operating profit generated by each hospital and outpatient center</p></div><span class="zfa-badge green">100% LOCATIONS POSITIVE</span></div>',
        '<div class="zfa-table-wrap">',
          '<table class="zfa-table">',
            '<thead><tr><th>Facility</th><th>City</th><th style="text-align:right;">Revenue</th><th style="text-align:right;">EBITDA</th><th style="text-align:right;">EBITDA Margin</th><th style="text-align:right;">Status</th></tr></thead>',
            '<tbody>',
              '<tr><td><b>Zenve Hospital Koramangala (24x7)</b></td><td>Bengaluru</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹14,20,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#10b981;">₹4,10,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#38bdf8;">28.9%</td><td style="text-align:right;"><span class="zfa-badge green">Top Performer</span></td></tr>',
              '<tr><td><b>Zenve Multi-Specialty Bandra</b></td><td>Mumbai</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹11,85,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#10b981;">₹3,25,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#38bdf8;">27.4%</td><td style="text-align:right;"><span class="zfa-badge green">Top Performer</span></td></tr>',
              '<tr><td><b>Zenve Animal Hospital Okhla</b></td><td>Delhi NCR</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹9,40,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#10b981;">₹2,24,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#38bdf8;">23.8%</td><td style="text-align:right;"><span class="zfa-badge blue">Solid EBITDA</span></td></tr>',
              '<tr><td><b>Zenve Jubilee Hills Specialty</b></td><td>Hyderabad</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹4,80,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#10b981;">₹98,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#38bdf8;">20.4%</td><td style="text-align:right;"><span class="zfa-badge blue">Solid EBITDA</span></td></tr>',
              '<tr><td><b>Zenve Care Center Indiranagar</b></td><td>Bengaluru</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹5,60,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#10b981;">₹1,15,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#38bdf8;">20.5%</td><td style="text-align:right;"><span class="zfa-badge blue">Solid EBITDA</span></td></tr>',
              '<tr><td><b>Zenve Koregaon Park Clinic</b></td><td>Pune</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹3,20,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#10b981;">₹47,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#38bdf8;">14.7%</td><td style="text-align:right;"><span class="zfa-badge cyan">Ramping Up</span></td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  // 10. Net Profit
  function renderNetProfit() {
    return [
      '<div class="zfa-kpi-grid">',
        kpiHtml('Net Profit (PAT)', '₹9.25 Lakh', '+52.2% vs Plan', 'up', 'Current month surplus', '🏆'),
        kpiHtml('Net Profit Margin', '11.8%', '+3.1% pts YoY', 'up', 'Target: >10.0%', '📈'),
        kpiHtml('Profit Before Tax (PBT)', '₹12.35 Lakh', '15.8% Margin', 'up', 'Pre-tax income', '💼'),
        kpiHtml('Effective Tax Rate', '25.17%', 'Section 115BAA', 'up', 'Standard corporate rate', '🏛️'),
        kpiHtml('Annualized PAT Run-rate', '₹1.11 Crore', '100% Retained', 'up', 'Self-funded builds', '🏗️'),
        kpiHtml('Earnings Per Share (EPS)', '₹3.70 / sh', '+20.9% QoQ', 'up', '25,00,000 shares', '💎'),
      '</div>',
      '<div class="zfa-card">',
        '<div class="zfa-card-head"><div><h3 class="zfa-card-title">🏆 Bottom-Line Earnings Bridge & Quarterly Trend</h3><p class="zfa-card-sub">Consecutive quarterly profit acceleration</p></div><span class="zfa-badge green">CONSISTENT EXPANSION</span></div>',
        '<div class="zfa-table-wrap">',
          '<table class="zfa-table">',
            '<thead><tr><th>Reporting Quarter</th><th style="text-align:right;">Gross Revenue</th><th style="text-align:right;">Operating EBITDA</th><th style="text-align:right;">Net PAT</th><th style="text-align:right;">PAT Margin %</th><th style="text-align:right;">EPS (INR)</th></tr></thead>',
            '<tbody>',
              '<tr><td>FY 2025-26 Q3</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹58,40,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹9,20,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#10b981;">₹5,10,000</td><td style="text-align:right;color:#38bdf8;">8.7%</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹2.04</td></tr>',
              '<tr><td>FY 2025-26 Q4</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹64,20,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹11,40,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#10b981;">₹6,40,000</td><td style="text-align:right;color:#38bdf8;">10.0%</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹2.56</td></tr>',
              '<tr><td>FY 2026-27 Q1</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹71,80,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹13,80,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#10b981;">₹7,65,000</td><td style="text-align:right;color:#38bdf8;">10.7%</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹3.06</td></tr>',
              '<tr style="background:rgba(16,185,129,0.1);font-weight:700;"><td>FY 2026-27 Q2 (Current)</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#38bdf8;">₹78,40,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#38bdf8;">₹15,70,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#34d399;font-size:13px;">₹9,25,000</td><td style="text-align:right;color:#34d399;font-size:13px;">11.8%</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#38bdf8;">₹3.70</td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  // 11. Accounts Receivable
  function renderReceivables() {
    return [
      '<div class="zfa-kpi-grid">',
        kpiHtml('Total Receivables (AR)', '₹20.82 Lakh', '-8.4% MoM', 'up', '7 Institutional Debtors', '📥'),
        kpiHtml('Days Sales Outstanding (DSO)', '22 Days', '-4 Days faster', 'up', 'Industry avg: 45d', '⏱️'),
        kpiHtml('Current (0–30 Days)', '₹14.20 Lakh', '68.2% of Total', 'up', 'Healthy collection', '🛡️'),
        kpiHtml('31–60 Days Overdue', '₹4.10 Lakh', '19.7% of Total', 'up', 'Active follow-up', '⚡'),
        kpiHtml('Overdue >60 Days', '₹2.52 Lakh', '12.1% of Total', 'down', 'Escalated collections', '🚨'),
        kpiHtml('Bad Debt Provision', '₹24,000', '0.12% write-off', 'up', 'Near-zero risk', '💎'),
      '</div>',
      '<div class="zfa-card">',
        '<div class="zfa-card-head"><div><h3 class="zfa-card-title">📋 Trade Debtors & Corporate Receivables Schedule</h3><p class="zfa-card-sub">Outstanding balances by insurance TPAs and corporate wellness programs</p></div><button class="zfa-btn primary" onclick="alert(\'Sending automated payment reminder WhatsApp/Email notices...\')">📢 Send Reminders</button></div>',
        '<div class="zfa-table-wrap">',
          '<table class="zfa-table">',
            '<thead><tr><th>Debtor / Partner</th><th>Account Type</th><th style="text-align:right;">Total Due</th><th>Aging Bucket</th><th style="text-align:right;">Client DSO</th><th style="text-align:right;">Status</th></tr></thead>',
            '<tbody>',
              '<tr><td><b>Bajaj Allianz Pet Insurance TPA</b></td><td>Insurance TPA</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#38bdf8;">₹4,80,000</td><td><span class="zfa-badge green">0–30 Days</span></td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">14 Days</td><td style="text-align:right;"><span class="zfa-badge green">Current / Approved</span></td></tr>',
              '<tr><td><b>Digit Pet Healthcare Claims Hub</b></td><td>Insurance TPA</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#38bdf8;">₹3,60,000</td><td><span class="zfa-badge green">0–30 Days</span></td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">18 Days</td><td style="text-align:right;"><span class="zfa-badge green">Current / Approved</span></td></tr>',
              '<tr><td><b>Infosys Employee Pets Wellness Benefit</b></td><td>Corporate B2B</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#38bdf8;">₹4,20,000</td><td><span class="zfa-badge green">0–30 Days</span></td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">24 Days</td><td style="text-align:right;"><span class="zfa-badge blue">Payment Scheduled</span></td></tr>',
              '<tr><td><b>Wipro Corporate Pet Care Policy</b></td><td>Corporate B2B</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#fbbf24;">₹2,40,000</td><td><span class="zfa-badge blue">31–60 Days</span></td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">38 Days</td><td style="text-align:right;"><span class="zfa-badge cyan">Follow-up Active</span></td></tr>',
              '<tr><td><b>Paws & Claws Satellite Partner Clinic</b></td><td>Affiliate Clinic</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#fbbf24;">₹1,70,000</td><td><span class="zfa-badge blue">31–60 Days</span></td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">42 Days</td><td style="text-align:right;"><span class="zfa-badge amber">Notice Sent</span></td></tr>',
              '<tr><td><b>Dr. Oak Referral Surgical Lab Andheri</b></td><td>Diagnostic B2B</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#f87171;">₹1,80,000</td><td><span class="zfa-badge amber">61–90 Days</span></td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">68 Days</td><td style="text-align:right;"><span class="zfa-badge amber">Overdue Warning</span></td></tr>',
              '<tr><td><b>Canine Care Center Secunderabad</b></td><td>Affiliate Clinic</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#f87171;">₹72,000</td><td><span class="zfa-badge red">90+ Days</span></td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">96 Days</td><td style="text-align:right;"><span class="zfa-badge red">Credit Blocked</span></td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  // 12. Accounts Payable
  function renderPayables() {
    return [
      '<div class="zfa-kpi-grid">',
        kpiHtml('Total Payables (AP)', '₹25.90 Lakh', 'Optimal working cap', 'up', '7 OEM Vendors', '📤'),
        kpiHtml('Days Payable Outstanding', '34 Days', 'Target: 30–40d', 'up', 'Vendor terms maximized', '⏱️'),
        kpiHtml('Approved for Immediate Run', '₹18.40 Lakh', '71.0% verified', 'up', 'Full 3-way match OK', '✅'),
        kpiHtml('Early Cash Discounts', '₹41,600', '2/10 Net 30', 'up', 'Discounts captured', '🎁'),
        kpiHtml('Pending GRN Match', '₹2.80 Lakh', '1 Inbound batch', 'up', 'Warehouse verification', '🔍'),
        kpiHtml('Disputed Invoices', '₹40,000', '1 Clinical query', 'down', 'Biohazard billing', '⚠️'),
      '</div>',
      '<div class="zfa-card">',
        '<div class="zfa-card-head"><div><h3 class="zfa-card-title">📑 Trade Creditors & Supplier Settlement Queue</h3><p class="zfa-card-sub">3-way matching verified against Purchase Order (PO) and Goods Receipt Note (GRN)</p></div><button class="zfa-btn primary" onclick="alert(\'Executing batch payment run via HDFC CMS-NEFT...\')">💳 Execute NEFT Batch Run</button></div>',
        '<div class="zfa-table-wrap">',
          '<table class="zfa-table">',
            '<thead><tr><th>Vendor / Supplier</th><th>Category</th><th style="text-align:right;">Balance Due</th><th style="text-align:center;">Credit Terms</th><th style="text-align:center;">Due In</th><th style="text-align:right;">Early Cash Discount</th><th style="text-align:right;">Status</th></tr></thead>',
            '<tbody>',
              '<tr><td><b>Zoetis India Veterinary Ltd</b></td><td>Biologicals & Vaccines</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#f87171;">₹8,40,000</td><td style="text-align:center;">Net 30</td><td style="text-align:center;color:#38bdf8;">12 Days</td><td style="text-align:right;color:#10b981;">₹16,800 (2%)</td><td style="text-align:right;"><span class="zfa-badge green">Payment Approved</span></td></tr>',
              '<tr><td><b>DePuy Synthes Vet Implants</b></td><td>Titanium TPLO Hardware</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#f87171;">₹5,60,000</td><td style="text-align:center;">Net 45</td><td style="text-align:center;color:#38bdf8;">18 Days</td><td style="text-align:right;color:#10b981;">₹11,200 (2%)</td><td style="text-align:right;"><span class="zfa-badge green">Payment Approved</span></td></tr>',
              '<tr><td><b>Abbott Healthcare Anesthetics</b></td><td>Sevoflurane & Sedatives</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#f87171;">₹4,40,000</td><td style="text-align:center;">Net 30</td><td style="text-align:center;color:#38bdf8;">6 Days</td><td style="text-align:right;color:#10b981;">₹8,800 (2%)</td><td style="text-align:right;"><span class="zfa-badge blue">Batch Scheduled</span></td></tr>',
              '<tr><td><b>BOC Linde Medical Gases</b></td><td>Medical Oxygen Bulk Cylinders</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#f87171;">₹2,80,000</td><td style="text-align:center;">Net 30</td><td style="text-align:center;">22 Days</td><td style="text-align:right;color:#94a3b8;">None</td><td style="text-align:right;"><span class="zfa-badge amber">Awaiting GRN Match</span></td></tr>',
              '<tr><td><b>Medline Veterinary Disposables</b></td><td>Surgical Drapes & PPE</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#f87171;">₹2,40,000</td><td style="text-align:center;">Net 30</td><td style="text-align:center;color:#38bdf8;">14 Days</td><td style="text-align:right;color:#10b981;">₹4,800</td><td style="text-align:right;"><span class="zfa-badge green">Payment Approved</span></td></tr>',
              '<tr><td><b>Siemens Healthineers Lease</b></td><td>Ultrasound Scanner Lease Q3</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#f87171;">₹1,90,000</td><td style="text-align:center;">Net 15</td><td style="text-align:center;color:#f87171;font-weight:700;">2 Days</td><td style="text-align:right;color:#94a3b8;">None</td><td style="text-align:right;"><span class="zfa-badge red">Urgent Processing</span></td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  // 13. Invoices
  function renderInvoices() {
    return [
      '<div class="zfa-kpi-grid">',
        kpiHtml('Invoices Issued (MTD)', '1,842 Invoices', '+14.2% MoM', 'up', '100% GST Compliant', '🧾'),
        kpiHtml('Total Invoiced Value', '₹78.40 Lakh', '₹11.96L GST Output', 'up', '18% GST Applicable', '💰'),
        kpiHtml('Settled / Paid', '₹72.40 Lakh', '92.3% Realization', 'up', 'Instant digital pay', '✅'),
        kpiHtml('Pending Settlement', '₹4.20 Lakh', 'B2B terms', 'up', 'Within credit window', '⏳'),
        kpiHtml('Overdue Invoices', '₹1.80 Lakh', '1 Account', 'down', 'Follow-up sent', '⚠️'),
        kpiHtml('e-Invoice IRN Sync', '99.98%', 'Sub-second sync', 'up', 'NIC e-Invoice portal', '📶'),
      '</div>',
      '<div class="zfa-card">',
        '<div class="zfa-card-head"><div><h3 class="zfa-card-title">📑 GST Tax Invoices Register</h3><p class="zfa-card-sub">Compliant digital receipts with HSN/SAC codes and automated IRN hash generation</p></div><button class="zfa-btn primary" onclick="ZenveFinanceDashboard.showInvoiceModal()">+ Generate Tax Invoice</button></div>',
        '<div class="zfa-table-wrap">',
          '<table class="zfa-table">',
            '<thead><tr><th>Invoice ID</th><th>Date</th><th>Client / Pet</th><th>Facility</th><th>Clinical Description</th><th style="text-align:right;">Taxable</th><th style="text-align:right;">18% GST</th><th style="text-align:right;">Total</th><th>Status</th><th style="text-align:center;">Action</th></tr></thead>',
            '<tbody>',
              '<tr><td style="font-family:IBM Plex Mono,monospace;color:#38bdf8;">INV-ZV-8021</td><td>2026-10-04</td><td><b>Rohit Sharma (Bruno)</b></td><td>Koramangala 24x7</td><td>Emergency GDV Surgical Package</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹38,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#fbbf24;">₹6,840</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#10b981;">₹44,840</td><td><span class="zfa-badge green">Paid</span></td><td style="text-align:center;"><button class="zfa-btn" onclick="alert(\'Printing invoice INV-ZV-8021\')">📄 PDF</button></td></tr>',
              '<tr><td style="font-family:IBM Plex Mono,monospace;color:#38bdf8;">INV-ZV-8022</td><td>2026-10-04</td><td><b>Infosys Pets Benefit</b></td><td>Network Wide</td><td>Corporate OPD Retainer Q3</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹3,55,932</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#fbbf24;">₹64,068</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#10b981;">₹4,20,000</td><td><span class="zfa-badge blue">Pending</span></td><td style="text-align:center;"><button class="zfa-btn" onclick="alert(\'Printing invoice INV-ZV-8022\')">📄 PDF</button></td></tr>',
              '<tr><td style="font-family:IBM Plex Mono,monospace;color:#38bdf8;">INV-ZV-8023</td><td>2026-10-03</td><td><b>Meera Kapoor (Bella)</b></td><td>Bandra Specialty</td><td>Laparoscopic Spay Procedure</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹18,500</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#fbbf24;">₹3,330</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#10b981;">₹21,830</td><td><span class="zfa-badge green">Paid</span></td><td style="text-align:center;"><button class="zfa-btn" onclick="alert(\'Printing invoice INV-ZV-8023\')">📄 PDF</button></td></tr>',
              '<tr><td style="font-family:IBM Plex Mono,monospace;color:#38bdf8;">INV-ZV-8024</td><td>2026-10-03</td><td><b>Dr. Oak Referral Lab</b></td><td>Bandra Specialty</td><td>CT Scan & 3D Imaging Referral</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹1,52,542</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#fbbf24;">₹27,458</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#f87171;">₹1,80,000</td><td><span class="zfa-badge red">Overdue</span></td><td style="text-align:center;"><button class="zfa-btn" onclick="alert(\'Printing invoice INV-ZV-8024\')">📄 PDF</button></td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  // 14. Payments
  function renderPayments() {
    return [
      '<div class="zfa-kpi-grid">',
        kpiHtml('Digital Collections', '₹72.40 Lakh', '+18.2% MoM', 'up', 'Inbound MTD flow', '💳'),
        kpiHtml('UPI Share', '50.0%', 'Zero MDR rate', 'up', '4,120 instant scans', '📱'),
        kpiHtml('Card & POS Volume', '₹21.72 Lakh', '30.0% of total', 'up', 'Pine Labs terminals', '🏧'),
        kpiHtml('Blended MDR Cost', '0.27%', '-0.08% pts YoY', 'up', 'Minimal fee leakage', '💰'),
        kpiHtml('Settlement Window', 'T+1 Morning', 'Auto-cleared', 'up', 'Direct HDFC sweep', '⚡'),
        kpiHtml('Reconciliation Accuracy', '100.0%', 'Zero mismatch', 'up', 'Automated bank sync', '🛡️'),
      '</div>',
      '<div class="zfa-card">',
        '<div class="zfa-card-head"><div><h3 class="zfa-card-title">💳 Payment Gateways & Merchant Rails</h3><p class="zfa-card-sub">Inflow channels, merchant discount rates (MDR), and net bank realization</p></div><button class="zfa-btn primary" onclick="alert(\'Reconciling gateway batches with Core Banking API...\')">🔄 Run Reconciliation</button></div>',
        '<div class="zfa-table-wrap">',
          '<table class="zfa-table">',
            '<thead><tr><th>Gateway Rail</th><th style="text-align:right;">Processed Volume</th><th style="text-align:right;">Txns</th><th style="text-align:right;">MDR Rate</th><th style="text-align:right;">MDR Fee</th><th style="text-align:right;">Net Cleared</th><th style="text-align:right;">Status</th></tr></thead>',
            '<tbody>',
              '<tr><td><b>Razorpay UPI & Smart Collect</b></td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#38bdf8;">₹36,20,000</td><td style="text-align:right;">4,120</td><td style="text-align:right;">0.00%</td><td style="text-align:right;color:#10b981;">₹0</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#10b981;">₹36,20,000</td><td style="text-align:right;"><span class="zfa-badge green">Settled (T+1)</span></td></tr>',
              '<tr><td><b>Pine Labs Hospital POS Terminals</b></td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#38bdf8;">₹21,72,000</td><td style="text-align:right;">1,450</td><td style="text-align:right;">0.90%</td><td style="text-align:right;color:#f87171;">₹19,548</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#10b981;">₹21,52,452</td><td style="text-align:right;"><span class="zfa-badge green">Settled (T+1)</span></td></tr>',
              '<tr><td><b>HDFC Corporate NetBanking CMS</b></td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#38bdf8;">₹10,86,000</td><td style="text-align:right;">64</td><td style="text-align:right;">₹5/txn</td><td style="text-align:right;color:#f87171;">₹320</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#10b981;">₹10,85,680</td><td style="text-align:right;"><span class="zfa-badge green">Cleared / Instant</span></td></tr>',
              '<tr><td><b>Clinical Desk Cash at Reception</b></td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#38bdf8;">₹3,62,000</td><td style="text-align:right;">420</td><td style="text-align:right;">0.00%</td><td style="text-align:right;color:#10b981;">₹0</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#10b981;">₹3,62,000</td><td style="text-align:right;"><span class="zfa-badge green">Bank Deposited</span></td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  // 15. Refunds
  function renderRefunds() {
    return [
      '<div class="zfa-kpi-grid">',
        kpiHtml('Total Processed Refunds', '₹84,200', '1.07% of Revenue', 'up', 'Well below 2% target', '🔄'),
        kpiHtml('Cancelled OPD Consults', '₹32,000', '38.0% of refunds', 'up', 'Auto-refunded in <1h', '📅'),
        kpiHtml('Pharmacy Sealed Returns', '₹24,500', 'FEFO verified', 'up', 'Returned to inventory', '💊'),
        kpiHtml('Duplicate POS Swipes', '₹18,200', 'Instant reversal', 'up', 'Zero bank chargebacks', '💳'),
        kpiHtml('Average Dispute TAT', '3.4 Hours', 'Fast resolution', 'up', 'Target: <24 Hours', '⏱️'),
        kpiHtml('Chargeback Loss Rate', '0.00%', 'Zero bank penalties', 'up', '100% dispute win rate', '🛡️'),
      '</div>',
      '<div class="zfa-card">',
        '<div class="zfa-card-head"><div><h3 class="zfa-card-title">🔄 Customer Refunds & Disputed Reversals Log</h3><p class="zfa-card-sub">Clinical refund authorizations linked directly to verified invoice records</p></div><button class="zfa-btn primary" onclick="ZenveFinanceDashboard.showRefundModal()">+ Authorize Refund</button></div>',
        '<div class="zfa-table-wrap">',
          '<table class="zfa-table">',
            '<thead><tr><th>Refund ID</th><th>Original Invoice</th><th>Pet Parent & Pet</th><th style="text-align:right;">Refund Amount</th><th>Clinical Reason</th><th>Settlement Channel</th><th style="text-align:right;">Status</th></tr></thead>',
            '<tbody>',
              '<tr><td style="font-family:IBM Plex Mono,monospace;color:#f87171;">REF-ZV-1041</td><td style="font-family:IBM Plex Mono,monospace;color:#38bdf8;">INV-ZV-7992</td><td><b>Pooja Iyer (Simba)</b></td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#f87171;">₹1,450</td><td>Appointment Rescheduled / Pre-pay Cancel</td><td>UPI 2.0 Reversal</td><td style="text-align:right;"><span class="zfa-badge green">Refunded</span></td></tr>',
              '<tr><td style="font-family:IBM Plex Mono,monospace;color:#f87171;">REF-ZV-1042</td><td style="font-family:IBM Plex Mono,monospace;color:#38bdf8;">INV-ZV-7988</td><td><b>Arun Varma (Bruno)</b></td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#f87171;">₹2,400</td><td>Unopened Bravecto Packaging Returned</td><td>Card Reversal</td><td style="text-align:right;"><span class="zfa-badge green">Refunded</span></td></tr>',
              '<tr><td style="font-family:IBM Plex Mono,monospace;color:#f87171;">REF-ZV-1043</td><td style="font-family:IBM Plex Mono,monospace;color:#38bdf8;">INV-ZV-7975</td><td><b>Deepak Rao (Shadow)</b></td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#f87171;">₹4,800</td><td>Duplicate POS Terminal Authorization</td><td>Bank Batch Reversal</td><td style="text-align:right;"><span class="zfa-badge green">Refunded</span></td></tr>',
              '<tr><td style="font-family:IBM Plex Mono,monospace;color:#f87171;">REF-ZV-1044</td><td style="font-family:IBM Plex Mono,monospace;color:#38bdf8;">INV-ZV-7960</td><td><b>Sunita Nair (Milo)</b></td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#f87171;">₹850</td><td>Tele-consult Network Disconnect</td><td>Zenve Wallet Credit</td><td style="text-align:right;"><span class="zfa-badge blue">Credit Issued</span></td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  // 16. Taxes
  function renderTaxes() {
    return [
      '<div class="zfa-kpi-grid">',
        kpiHtml('GST Output Liability', '₹11.96 Lakh', '18% Outward GST', 'up', 'Current month gross', '🏛️'),
        kpiHtml('Input Tax Credit (ITC)', '₹5.82 Lakh', '100% 2B match', 'up', 'Zero disputed credit', '📥'),
        kpiHtml('Net GST Payable', '₹6.14 Lakh', 'Settled via PMT-06', 'up', 'Due Oct 20, 2026', '💰'),
        kpiHtml('TDS Deposited', '₹3.10 Lakh', '100% Remitted', 'up', 'Challan ITNS 281', '📑'),
        kpiHtml('Advance Corporate Tax', '₹7.50 Lakh', 'Q2 Paid', 'up', 'Section 115BAA rate', '🛡️'),
        kpiHtml('Compliance Rating', '100 / 100', 'Zero penalties', 'up', 'Clean statutory audit', '⭐'),
      '</div>',
      '<div class="zfa-card">',
        '<div class="zfa-card-head"><div><h3 class="zfa-card-title">⚖️ Goods & Services Tax (GST) Returns</h3><p class="zfa-card-sub">GSTIN: 29AABCZ8412K1Z9 · Government of India GST Portal Sync</p></div><button class="zfa-btn primary" onclick="alert(\'Generating GST e-Challan PMT-06...\')">Generate PMT-06</button></div>',
        '<div class="zfa-table-wrap">',
          '<table class="zfa-table">',
            '<thead><tr><th>Form Type</th><th>Tax Period</th><th>Due Date</th><th style="text-align:right;">Taxable Turnover</th><th style="text-align:right;">Output Tax</th><th style="text-align:right;">ITC Offset</th><th style="text-align:right;">Net Cash Paid</th><th style="text-align:right;">Status</th></tr></thead>',
            '<tbody>',
              '<tr><td><b>GSTR-1 (Outward Supplies)</b></td><td>September 2026</td><td>Oct 11, 2026</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹66,44,068</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#fbbf24;">₹11,95,932</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#10b981;">₹5,82,400</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#38bdf8;">₹6,13,532</td><td style="text-align:right;"><span class="zfa-badge green">Filed / ARN Live</span></td></tr>',
              '<tr><td><b>GSTR-3B (Summary & Payment)</b></td><td>September 2026</td><td>Oct 20, 2026</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹66,44,068</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#fbbf24;">₹11,95,932</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#10b981;">₹5,82,400</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#38bdf8;">₹6,13,532</td><td style="text-align:right;"><span class="zfa-badge blue">Ready for Challan</span></td></tr>',
              '<tr><td><b>GSTR-2B (Auto-Drafted ITC)</b></td><td>September 2026</td><td>Oct 14, 2026</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹32,35,556</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹5,82,400</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#10b981;">₹5,82,400</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹0</td><td style="text-align:right;"><span class="zfa-badge green">Reconciled 100%</span></td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  // 17. Financial Forecast
  function renderForecast() {
    return [
      '<div class="zfa-kpi-grid">',
        kpiHtml('Next 12M Projected Revenue', '₹11.84 Crore', '+26.0% YoY', 'up', 'Base expansion path', '🔮'),
        kpiHtml('Projected FY28 EBITDA', '₹3.12 Crore', '26.3% Margin', 'up', 'Operating leverage', '⚡'),
        kpiHtml('12M Free Cash Flow', '₹1.42 Crore', 'Post all CAPEX', 'up', 'Self-funded pipeline', '💧'),
        kpiHtml('Total Planned CAPEX', '₹3.40 Crore', '4 New Facilities', 'up', '+65 Inpatient Beds', '🏗️'),
        kpiHtml('Target Breakeven / Bed', '2.8 Months', '-0.6 mo faster', 'up', 'Capital efficiency', '⏱️'),
        kpiHtml('Sensitivity Risk Score', 'Low Risk (1.18)', 'Debt Coverage >12x', 'up', 'Stress-tested', '🛡️'),
      '</div>',
      '<div class="zfa-card">',
        '<div class="zfa-card-head"><div><h3 class="zfa-card-title">📈 4-Quarter Rolling Forward P&L Projections</h3><p class="zfa-card-sub">Management predictive model incorporating 14 existing sites + 4 planned expansions</p></div><button class="zfa-btn primary" onclick="alert(\'Exporting full dynamic forecast simulation model (Excel)...\')">Export Model (XLSX)</button></div>',
        '<div class="zfa-table-wrap">',
          '<table class="zfa-table">',
            '<thead><tr><th>Forward Quarter</th><th style="text-align:right;">Forecast Revenue</th><th style="text-align:right;">Direct COGS</th><th style="text-align:right;">Forecast OPEX</th><th style="text-align:right;">Projected EBITDA</th><th style="text-align:right;">Projected PAT</th><th style="text-align:right;">Closing Treasury</th></tr></thead>',
            '<tbody>',
              '<tr><td><b>Q3 FY 2026-27 (Next)</b></td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#10b981;">₹84,50,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#f87171;">₹36,30,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹29,80,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#38bdf8;">₹18,40,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#34d399;">₹11,10,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹1,54,00,000</td></tr>',
              '<tr><td><b>Q4 FY 2026-27</b></td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#10b981;">₹92,80,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#f87171;">₹39,50,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹31,40,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#38bdf8;">₹21,90,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#34d399;">₹13,50,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹1,68,00,000</td></tr>',
              '<tr><td><b>Q1 FY 2027-28</b></td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#10b981;">₹1,02,00,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#f87171;">₹43,20,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹33,60,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#38bdf8;">₹25,20,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#34d399;">₹15,80,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹1,85,00,000</td></tr>',
              '<tr><td><b>Q2 FY 2027-28</b></td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#10b981;">₹1,14,50,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#f87171;">₹48,00,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹36,20,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#38bdf8;">₹30,30,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#34d399;">₹19,40,000</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹2,08,00,000</td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  // 18. Cost Analysis
  function renderCostAnalysis() {
    return [
      '<div class="zfa-kpi-grid">',
        kpiHtml('Network Breakeven', '₹48.20 Lakh', 'Actual: ₹78.40L', 'up', 'Breakeven on Day 18', '⚖️'),
        kpiHtml('Margin of Safety', '38.5%', '+4.2% pts YoY', 'up', 'Substantial cushion', '🛡️'),
        kpiHtml('Cost / Inpatient Bed-Day', '₹1,840', '-16.4% vs Mkt', 'up', 'Optimized nurse ratio', '🛏️'),
        kpiHtml('Cost / Surgical OT Hour', '₹4,200 / hr', 'High throughput', 'up', '3 Modular OTs', '🩺'),
        kpiHtml('Fixed Cost Ratio', '24.2%', 'Lean overhead', 'up', '₹15.20 Lakh base', '🏢'),
        kpiHtml('Variable Cost Ratio', '57.6%', 'High elasticity', 'up', 'Scales with footfall', '📉'),
      '</div>',
      '<div class="zfa-card">',
        '<div class="zfa-card-head"><div><h3 class="zfa-card-title">🔍 Activity-Based Unit Costing (ABC Model)</h3><p class="zfa-card-sub">Granular clinical unit costs compared to private hospital industry benchmarks</p></div><span class="zfa-badge green">15–26% COST ADVANTAGE</span></div>',
        '<div class="zfa-table-wrap">',
          '<table class="zfa-table">',
            '<thead><tr><th>Activity / Service Unit</th><th>Classification</th><th style="text-align:right;">Zenve Unit Cost</th><th style="text-align:right;">Metro Benchmark</th><th style="text-align:right;">Variance</th><th style="text-align:right;">Efficiency</th></tr></thead>',
            '<tbody>',
              '<tr><td><b>Modular OT Hour (Anesthesia + Nurse + Gas)</b></td><td>Surgical Procedure</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#34d399;">₹4,200 / hr</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹5,100 / hr</td><td style="text-align:right;color:#10b981;">-17.6%</td><td style="text-align:right;"><span class="zfa-badge green">High</span></td></tr>',
              '<tr><td><b>Tertiary Inpatient Care Bed-Day (24h Nursing)</b></td><td>Inpatient Ward</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#34d399;">₹1,840 / bed-day</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹2,200 / bed-day</td><td style="text-align:right;color:#10b981;">-16.4%</td><td style="text-align:right;"><span class="zfa-badge green">High</span></td></tr>',
              '<tr><td><b>Primary Veterinary Outpatient Consult (18m slot)</b></td><td>Clinical OPD</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#34d399;">₹245 / visit</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹290 / visit</td><td style="text-align:right;color:#10b981;">-15.5%</td><td style="text-align:right;"><span class="zfa-badge green">High</span></td></tr>',
              '<tr><td><b>In-House Automated Pathology Lab Panel</b></td><td>Pathology Assay</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#34d399;">₹310 / panel</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹420 / panel</td><td style="text-align:right;color:#10b981;">-26.2%</td><td style="text-align:right;"><span class="zfa-badge green">Superior</span></td></tr>',
              '<tr><td><b>ALS Pet Ambulance Emergency Dispatch</b></td><td>Logistics / Fleet</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#34d399;">₹1,150 / callout</td><td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹1,400 / callout</td><td style="text-align:right;color:#10b981;">-17.9%</td><td style="text-align:right;"><span class="zfa-badge green">High</span></td></tr>',
            '</tbody>',
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
          '<button class="zfa-btn danger" onclick="ZenveFinanceDashboard.close()">✕ Exit Dashboard</button>',
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
          '<div class="zfa-form-group"><label>Amount (INR)</label><input type="text" class="zfa-input" placeholder="₹45,000" required /></div>',
        '</div>',
        '<div class="zfa-form-row">',
          '<div class="zfa-form-group"><label>Payment Rail</label><select class="zfa-select"><option>HDFC Core CMS (RTGS)</option><option>Razorpay UPI</option><option>Pine Labs POS</option><option>Corporate Card</option></select></div>',
          '<div class="zfa-form-group"><label>Linked Facility</label><select class="zfa-select"><option>Koramangala 24x7</option><option>Bandra Multi-Specialty</option><option>Okhla Animal Hospital</option><option>Network Wide</option></select></div>',
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
          '<div class="zfa-form-group"><label>Taxable Amount (INR)</label><input type="text" class="zfa-input" placeholder="₹24,000" required /></div>',
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
          '<div class="zfa-form-group"><label>Amount (INR)</label><input type="text" class="zfa-input" placeholder="₹18,500" required /></div>',
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
          '<div class="zfa-form-group"><label>Refund Amount (INR)</label><input type="text" class="zfa-input" placeholder="₹1,450" required /></div>',
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
