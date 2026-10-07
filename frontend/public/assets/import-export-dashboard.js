/* =====================================================================
   Zenve BI — Import & Export Executive Control Center & Dashboards
   Suite (9 Subdomains):
     1. Import Dashboard           (#import-dashboard / #import-export)
     2. Export Dashboard           (#export-dashboard)
     3. Import Orders              (#import-orders)
     4. Export Orders              (#export-orders)
     5. Suppliers                  (#suppliers / #global-suppliers)
     6. Buyers                     (#buyers / #international-buyers)
     7. Customs & Documentation    (#customs-documentation / #customs)
     8. Logistics                  (#trade-logistics / #import-export-logistics)
     9. Import/Export Profitability (#import-export-profitability / #trade-profitability)
   ===================================================================== */

(function () {
  'use strict';

  function esc(s) {
    if (s == null) return '';
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ── 9 Subdomains Configuration ─────────────────────────────────── */
  var TABS = [
    { id: 'import-dashboard', label: 'Import Dashboard',        icon: '🌐', hash: '#import-dashboard',          badge: '',  title: 'Global Import Procurement & Supply', sub: 'International procurement manifests, ocean & air cargo shipments, CDSCO veterinary drug clearance, and customs duty tracking' },
    { id: 'export-dashboard', label: 'Export Dashboard',        icon: '🛫', hash: '#export-dashboard',          badge: '',   title: 'International Export Sales & Global Trade', sub: 'Overseas market shipments, foreign exchange (Forex) remittances, Letter of Credit (LC) execution, and export duty incentives' },
    { id: 'import-orders',    label: 'Import Orders',           icon: '📑', hash: '#import-orders',             badge: '',   title: 'International Purchase Orders (IPO) & LC Pipeline', sub: 'Cross-border procurement orders, commercial proforma invoices, forex hedging contracts, and port ETA milestones' },
    { id: 'export-orders',    label: 'Export Orders',           icon: '📦', hash: '#export-orders',             badge: '', title: 'International Export Sales Orders & Invoicing', sub: 'Overseas commercial sales orders, foreign bank letters of credit, customs shipping bill filings, and cargo manifests' },
    { id: 'suppliers',        label: 'Suppliers',               icon: '🌍', hash: '#suppliers',                 badge: '', title: 'Global Veterinary & Raw Material Suppliers', sub: 'International manufacturer registry, CDSCO import licenses, country of origin compliance, and quality certifications' },
    { id: 'buyers',           label: 'Buyers',                  icon: '🤝', hash: '#buyers',                    badge: '', title: 'International Buyers & Distribution Partners', sub: 'Overseas retail chains, international veterinary hospital groups, luxury boutique distributors, and credit limits' },
    { id: 'customs',          label: 'Customs & Documentation', icon: '🏛️', hash: '#customs-documentation',    badge: '',  title: 'Customs Compliance, Bill of Entry & Shipping Bills', sub: 'DGFT import export code (IEC), CDSCO drug controller permits, ICEGATE electronic filings, and animal quarantine NOCs' },
    { id: 'logistics',        label: 'Logistics',               icon: '🚢', hash: '#trade-logistics',           badge: '',   title: 'Multimodal Reefer, Ocean & Air Corridors', sub: 'Cross-border freight forwarding, maritime vessel telemetry, cold-chain flight routes, and container yard milestones' },
    { id: 'profitability',    label: 'Import/Export Profit',    icon: '💎', hash: '#import-export-profitability', badge: '', title: 'Landed Cost Economics & Cross-Border Margins', sub: 'Total landed cost breakdown (CIF, customs duty, IGST, clearing, cold freight) and net international export arbitrage' }
  ];

  /* ── Master Datasets ─────────────────────────────────────────────── */
  var IMPORTS = [];

  var EXPORTS = [];

  /* ── State ───────────────────────────────────────────────────────── */
  var S = {
    open: false,
    tab: 'import-dashboard',
    search: ''
  };

  var root = null;

  /* ── Route Resolution ────────────────────────────────────────────── */
  function tabFromHash(hash) {
    if (!hash) return null;
    var h = (hash.startsWith('#') ? hash.slice(1) : hash).toLowerCase();
    if (h.indexOf('report') >= 0 || h.indexOf('alert') >= 0 || h.indexOf('vendor') >= 0 || h.indexOf('fashion') >= 0 || h.indexOf('b2b') >= 0 || h.indexOf('enterprise') >= 0 || h.indexOf('subscription') >= 0) {
      return null;
    }
    if (h === 'import-dashboard' || h === 'import-export' || h === 'import' || h === 'trade') return 'import-dashboard';
    if (h === 'export-dashboard' || h === 'export') return 'export-dashboard';
    if (h === 'import-orders' || h === 'ipo') return 'import-orders';
    if (h === 'export-orders' || h === 'xpo') return 'export-orders';
    if (h === 'suppliers' || h === 'global-suppliers') return 'suppliers';
    if (h === 'buyers' || h === 'international-buyers') return 'buyers';
    if (h === 'customs-documentation' || h === 'customs' || h === 'customs-docs') return 'customs';
    if (h === 'trade-logistics' || h === 'import-export-logistics') return 'logistics';
    if (h === 'import-export-profitability' || h === 'trade-profitability') return 'profitability';
    return null;
  }

  function tabFromText(txt) {
    if (!txt) return null;
    var raw = txt.replace(/\s+/g, ' ').trim().toLowerCase();
    if (raw.indexOf('report') >= 0 || raw.indexOf('alert') >= 0 || raw.indexOf('vendor') >= 0 || raw.indexOf('b2b') >= 0) return null;

    if (raw === 'import dashboard' || raw === 'import & export') return 'import-dashboard';
    if (raw === 'export dashboard') return 'export-dashboard';
    if (raw === 'import orders') return 'import-orders';
    if (raw === 'export orders') return 'export-orders';
    if (raw === 'suppliers') return 'suppliers';
    if (raw === 'buyers') return 'buyers';
    if (raw === 'customs & documentation' || raw === 'customs') return 'customs';
    if (raw === 'logistics' && raw.indexOf('delivery') < 0) return 'logistics';
    if (raw === 'import/export profitability' || raw === 'import export profitability') return 'profitability';
    return null;
  }

  /* ── KPI Helper ──────────────────────────────────────────────────── */
  function kpiHtml(label, val, delta, trend, subtext, icon) {
    return [
      '<div class="zix-kpi">',
        '<div class="zix-kpi-top">',
          '<span class="zix-kpi-label">' + esc(label) + '</span>',
          '<span class="zix-kpi-icon">' + esc(icon || '🌐') + '</span>',
        '</div>',
        '<div class="zix-kpi-val">' + esc(val) + '</div>',
        '<div class="zix-kpi-bottom">',
          '<span class="zix-delta ' + (trend === 'up' ? 'up' : trend === 'down' ? 'down' : 'warn') + '">' + (trend === 'up' ? '↑ ' : trend === 'down' ? '↓ ' : '• ') + esc(delta) + '</span>',
          '<span class="zix-subtext">' + esc(subtext) + '</span>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Render Subdomains ───────────────────────────────────────────── */
  function renderImportDashboard() {
    return [
      '<div class="zix-kpi-grid">',
        kpiHtml('Import Procurement (MTD)', '₹1.82 Crore', '12 Active Shipments', 'up', 'CIF Invoiced Valuation', '🚢'),
        kpiHtml('Avg Customs Clearance', '2.4 Days', '-0.8 days via advance BE', 'up', 'Advance filing protocol', '⚡'),
        kpiHtml('Cold-Chain Marine Reefers', '4 Containers', '2°C to 8°C Verified', 'up', 'IoT Marine Telemetry', '❄️'),
        kpiHtml('Customs Duty & IGST Paid', '₹28.40 Lakh', 'Tariff code 3004 / 3002', 'neutral', 'Auto-debited via ICEGATE', '🏛️'),
        kpiHtml('CDSCO / Quarantine NOC', '100% Granted', 'Zero compliance holds', 'up', 'Veterinary drug permits', '🛡️'),
        kpiHtml('Global OEM Suppliers', '16 Partners', 'France, Germany, USA, Japan', 'up', 'Direct exclusive contracts', '🌍'),
      '</div>',

      '<div class="zix-card">',
        '<div class="zix-card-head">',
          '<div>',
            '<h3 class="zix-card-title">🌐 Active Inbound Import Consignments & Clearances</h3>',
            '<p class="zix-card-sub">Bill of Lading status, port of entry, and customs clearance milestones</p>',
          '</div>',
          '<button class="zix-btn primary" onclick="ZenveImportExportDashboard.showNewConsignmentModal()">+ New Consignment</button>',
        '</div>',
        '<div class="zix-table-wrap">',
          '<table class="zix-table">',
            '<thead><tr><th>B/L or AWB #</th><th>Origin Country</th><th>Consignment Description</th><th>Port of Entry</th><th>CIF Value</th><th>Customs Clearance</th><th>ETA / Delivery</th><th>Status</th></tr></thead>',
            '<tbody>',
              IMPORTS.map(function(s) {
                return '<tr>' +
                  '<td style="font-family:monospace;font-weight:600;">' + esc(s.bl) + '</td>' +
                  '<td style="font-weight:600;">' + esc(s.origin) + '</td>' +
                  '<td>' + esc(s.product) + '</td>' +
                  '<td>' + esc(s.port) + '</td>' +
                  '<td style="font-weight:600;color:#059669;">' + esc(s.value) + '</td>' +
                  '<td>' + esc(s.customs) + '</td>' +
                  '<td>' + esc(s.eta) + '</td>' +
                  '<td><span class="zix-pill ' + (s.status === 'Received' ? 'cleared' : s.status === 'In Customs' ? 'customs' : 'transit') + '">' + esc(s.status) + '</span></td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderExportDashboard() {
    return [
      '<div class="zix-kpi-grid">',
        kpiHtml('Export Revenue (MTD)', '₹64.40 Lakh', '+42.5% YoY', 'up', 'FOB Realization ($78.2K USD)', '🛫'),
        kpiHtml('Overseas Export Markets', '7 Countries', 'UAE, SG, UK, KSA, Qatar', 'up', 'Expanding to US in Q1', '🌍'),
        kpiHtml('LC Execution Adherence', '100% Sight LC', 'Zero default history', 'up', 'Backed by Tier-1 Banks', '📑'),
        kpiHtml('Duty Drawback / RoDTEP', '₹3.22 Lakh', '5% incentive realized', 'up', 'Bank direct credit', '💵'),
      '</div>',
      '<div class="zix-card">',
        '<div class="zix-card-head">',
          '<div><h3 class="zix-card-title">🛫 Outbound Export Consignments & Trade Orders</h3><p class="zix-card-sub">Shipping bills, destination clearance, and cargo dispatch telemetry</p></div>',
        '</div>',
        '<div class="zix-table-wrap">',
          '<table class="zix-table">',
            '<thead><tr><th>Shipping Bill</th><th>Destination</th><th>Foreign Importer</th><th>Product Line</th><th>FOB Value</th><th>Status</th></tr></thead>',
            '<tbody>',
              EXPORTS.map(function(e) {
                return '<tr>' +
                  '<td style="font-family:monospace;font-weight:600;">' + esc(e.sb) + '</td>' +
                  '<td style="font-weight:600;">' + esc(e.dest) + '</td>' +
                  '<td>' + esc(e.client) + '</td>' +
                  '<td>' + esc(e.items) + '</td>' +
                  '<td style="font-weight:600;color:#059669;">' + esc(e.fob) + '</td>' +
                  '<td><span class="zix-pill ' + (e.status === 'Delivered' ? 'cleared' : 'trade') + '">' + esc(e.status) + '</span></td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderImportOrders() {
    return [
      '<div class="zix-kpi-grid">',
        kpiHtml('Open Import POs', '5 Consignments', '€68.5K + $137K', 'up', 'Inbound global trade', '📑'),
        kpiHtml('Average Lead Time', '28 Days', '-4 days air corridor', 'up', 'Factory dispatch to hub', '⏱️'),
        kpiHtml('Forex Hedging Coverage', '92.5%', 'Forward contracts active', 'up', 'Protected vs USD/EUR surge', '🔒'),
        kpiHtml('Port Demurrage Days', '0 Days', 'DPD Direct Delivery', 'up', 'Zero demurrage charges', '⚡'),
      '</div>',
      '<div class="zix-card">',
        '<div class="zix-card-head"><div><h3 class="zix-card-title">📑 International Purchase Orders (IPO) Master</h3><p class="zix-card-sub">Foreign currencies, incoterms, and customs milestones</p></div></div>',
        '<div class="zix-table-wrap">',
          '<table class="zix-table">',
            '<thead><tr><th>IPO #</th><th>Supplier</th><th>Goods Description</th><th>Value</th><th>Terms</th><th>Status</th></tr></thead>',
            '<tbody>',
              '<tr><td style="font-family:monospace;">IPO-2026-081</td><td style="font-weight:600;">Royal Canin SAS (France)</td><td>Gastrointestinal & Hepatic Diet Pallets</td><td style="font-weight:600;color:#059669;">€52,000 (~₹46.8L)</td><td>CIF JNPT (LC 60D)</td><td><span class="zix-pill customs">Port Inspection</span></td></tr>',
              '<tr><td style="font-family:monospace;">IPO-2026-082</td><td style="font-weight:600;">MSD Animal Health (Germany)</td><td>Bravecto Chewable Dog Fluralaner</td><td style="font-weight:600;color:#059669;">$41,000 (~₹34.4L)</td><td>CIP BLR Airport</td><td><span class="zix-pill customs">Customs Clearance</span></td></tr>',
              '<tr><td style="font-family:monospace;">IPO-2026-083</td><td style="font-weight:600;">Guccio Leather Atelier (Italy)</td><td>Tuscan Full Grain Nappa Hides</td><td style="font-weight:600;color:#059669;">€16,500 (~₹14.8L)</td><td>FOB Genoa (Air)</td><td><span class="zix-pill transit">In Transit</span></td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderExportOrders() {
    return [
      '<div class="zix-kpi-grid">',
        kpiHtml('Active Export Orders', '4 Consignments', '$72.3K USD Value', 'up', 'Middle East & APAC', '📦'),
        kpiHtml('Order Realization', '100% Secured', 'LC + Advance wire', 'up', 'Zero bad debt risk', '🛡️'),
        kpiHtml('Avg Export Ticket', '₹15.80 Lakh', '+18.4% YoY', 'up', 'High-margin bespoke lines', '💰'),
        kpiHtml('Export Airway TAT', '3.2 Days', 'Direct express flights', 'up', 'BOM/BLR to DXB/SIN', '⚡'),
      '</div>',
      '<div class="zix-card">',
        '<div class="zix-card-head"><div><h3 class="zix-card-title">📦 International Export Orders Stream</h3><p class="zix-card-sub">Foreign buyers, contract terms, and dispatch progress</p></div></div>',
        '<div class="zix-table-wrap">',
          '<table class="zix-table">',
            '<thead><tr><th>Export Order</th><th>Buyer Entity</th><th>Country</th><th>Items</th><th>Value</th><th>Status</th></tr></thead>',
            '<tbody>',
              '<tr><td style="font-family:monospace;">XPO-2026-031</td><td style="font-weight:600;">Royal Pets Hospital LLC</td><td>UAE</td><td>Italian Leather Collars & Leashes</td><td style="font-weight:600;color:#059669;">$18,500 (~₹15.5L)</td><td><span class="zix-pill transit">In Transit</span></td></tr>',
              '<tr><td style="font-family:monospace;">XPO-2026-032</td><td style="font-weight:600;">PetLovers Centre APAC</td><td>Singapore</td><td>Ayurvedic Herbal Shampoos</td><td style="font-weight:600;color:#059669;">$28,000 (~₹23.5L)</td><td><span class="zix-pill cleared">Customs Passed</span></td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderSuppliers() {
    return [
      '<div class="zix-kpi-grid">',
        kpiHtml('Global OEM Suppliers', '16 Manufacturers', 'France, Germany, USA, Japan', 'up', 'Direct exclusive contracts', '🌍'),
        kpiHtml('CDSCO Registered', '100% Compliant', 'Form 10 / 11 active', 'up', 'Biologicals clearance', '🛡️'),
        kpiHtml('Avg Import Lead Time', '21.4 Days', '-3 days via air freight', 'up', 'Corridor optimization', '⏱️'),
        kpiHtml('Pre-Shipment QA Score', '99.2%', 'Zero batch rejections', 'up', 'Certificate of Analysis (COA)', '✅'),
      '</div>',
      '<div class="zix-card">',
        '<div class="zix-card-head"><div><h3 class="zix-card-title">🌍 Global Supplier Master Registry</h3><p class="zix-card-sub">OEM manufacturers, CDSCO registrations, and annual volumes</p></div></div>',
        '<div class="zix-table-wrap">',
          '<table class="zix-table">',
            '<thead><tr><th>Supplier Code</th><th>Company Name</th><th>Country</th><th>Category</th><th>Annual Volume</th><th>Regulatory Status</th></tr></thead>',
            '<tbody>',
              '<tr><td style="font-family:monospace;">SUP-GLB-01</td><td style="font-weight:600;">Royal Canin SAS</td><td>France</td><td>Veterinary Clinical Diets</td><td style="font-weight:600;color:#059669;">€580,000</td><td><span class="zix-pill cleared">Approved & Active</span></td></tr>',
              '<tr><td style="font-family:monospace;">SUP-GLB-02</td><td style="font-weight:600;">MSD Animal Health GmbH</td><td>Germany</td><td>Biologics & Parasiticides</td><td style="font-weight:600;color:#059669;">€420,000</td><td><span class="zix-pill cleared">Form 10 Active</span></td></tr>',
              '<tr><td style="font-family:monospace;">SUP-GLB-03</td><td style="font-weight:600;">Zoetis Global LLC</td><td>United States</td><td>Vaccines & Rx Rx</td><td style="font-weight:600;color:#059669;">$640,000</td><td><span class="zix-pill cleared">Form 10 Active</span></td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderBuyers() {
    return [
      '<div class="zix-kpi-grid">',
        kpiHtml('Active Global Buyers', '8 Accounts', 'Across 7 countries', 'up', 'Direct export frameworks', '🤝'),
        kpiHtml('Annualized Export Demand', '$860,000 USD', '+38.4% YoY', 'up', '₹7.18 Cr INR equivalent', '💰'),
        kpiHtml('Buyer Payment Record', '100% On-Time', 'Zero defaults', 'up', 'Bank LC backed', '🛡️'),
        kpiHtml('Target Markets', '3 New Regions', 'Japan, Germany, Qatar', 'up', 'Clearance in process', '🌍'),
      '</div>',
      '<div class="zix-card">',
        '<div class="zix-card-head"><div><h3 class="zix-card-title">🤝 International Buyers Master Ledger</h3><p class="zix-card-sub">Foreign distributor chains, hospital networks, and contract values</p></div></div>',
        '<div class="zix-table-wrap">',
          '<table class="zix-table">',
            '<thead><tr><th>Buyer Code</th><th>Organization Name</th><th>Country</th><th>Channel Profile</th><th>Annual Value</th><th>Payment Terms</th></tr></thead>',
            '<tbody>',
              '<tr><td style="font-family:monospace;">BYR-INT-01</td><td style="font-weight:600;">Royal Pets Hospital LLC</td><td>UAE (Dubai)</td><td>Hospital Chain</td><td style="font-weight:600;color:#059669;">$180,000 / yr</td><td>Sight LC (Confirmed)</td></tr>',
              '<tr><td style="font-family:monospace;">BYR-INT-02</td><td style="font-weight:600;">PetLovers Centre APAC</td><td>Singapore</td><td>Retail Superstore</td><td style="font-weight:600;color:#059669;">$340,000 / yr</td><td>TT Wire (30D)</td></tr>',
              '<tr><td style="font-family:monospace;">BYR-INT-03</td><td style="font-weight:600;">Mayfair Canine Atelier</td><td>UK (London)</td><td>Luxury Boutique</td><td style="font-weight:600;color:#059669;">£120,000 / yr</td><td>Card / Advance Wire</td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderCustoms() {
    return [
      '<div class="zix-kpi-grid">',
        kpiHtml('ICEGATE Filings', '14 Active', '100% digital e-Sanchit', 'up', 'Direct port clearance', '🏛️'),
        kpiHtml('Clearance Turnaround', '2.4 Days', '-0.8 days improvement', 'up', 'Advance filing protocol', '⚡'),
        kpiHtml('Tariff Compliance', '100%', 'Zero penalty notices', 'up', 'Certified CHA audited', '🛡️'),
        kpiHtml('Drawback Claimed', '₹3.22 Lakh', '5% export incentive', 'up', 'Credited to bank', '💵'),
      '</div>',
      '<div class="zix-card">',
        '<div class="zix-card-head"><div><h3 class="zix-card-title">🏛️ Customs Declarations (Bill of Entry & Shipping Bills)</h3><p class="zix-card-sub">HSN tariff codes, assessable values, duty amounts, and clearance status</p></div></div>',
        '<div class="zix-table-wrap">',
          '<table class="zix-table">',
            '<thead><tr><th>Filing #</th><th>Type</th><th>Port</th><th>HSN Code</th><th>Declared Value</th><th>Duty / Drawback</th><th>Status</th></tr></thead>',
            '<tbody>',
              '<tr><td style="font-family:monospace;">BOE-2026-9901</td><td style="font-weight:600;">Bill of Entry (Import)</td><td>Nhava Sheva (JNPT)</td><td>3004.90.99</td><td>₹48,50,000</td><td style="color:#059669;font-weight:600;">₹5,82,000 (12%)</td><td><span class="zix-pill cleared">Out of Charge</span></td></tr>',
              '<tr><td style="font-family:monospace;">BOE-2026-9902</td><td style="font-weight:600;">Bill of Entry (Import)</td><td>Bengaluru Air (BLR)</td><td>3002.20.19</td><td>₹34,20,000</td><td style="color:#059669;font-weight:600;">₹3,42,000 (10%)</td><td><span class="zix-pill customs">Inspection (ADC)</span></td></tr>',
              '<tr><td style="font-family:monospace;">SB-2026-4401</td><td style="font-weight:600;">Shipping Bill (Export)</td><td>Mumbai Air (BOM)</td><td>4201.00.00</td><td>₹14,50,000</td><td style="color:#0e7490;font-weight:600;">5% Drawback</td><td><span class="zix-pill cleared">LEO Granted</span></td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderLogistics() {
    return [
      '<div class="zix-kpi-grid">',
        kpiHtml('Multimodal Trade Legs', '4 Corridors', 'Ocean & Air Freight', 'up', 'Direct OEM routing', '🚢'),
        kpiHtml('Marine Cold-Chain IoT', '99.9% In-Range', '2°C to 8°C continuous', 'up', 'Zero temperature excursions', '❄️'),
        kpiHtml('Air Cargo Transit Time', '18.4 Hours', 'Direct European corridors', 'up', 'CDG/FRA to BLR/BOM', '✈️'),
        kpiHtml('Port DPD Clearance', '36 Hours', 'Direct Port Delivery', 'up', 'Zero port container delay', '⚡'),
      '</div>',
      '<div class="zix-card">',
        '<div class="zix-card-head"><div><h3 class="zix-card-title">🚢 Live Cross-Border Multimodal Telematics</h3><p class="zix-card-sub">Vessel positions, flight numbers, temperature telemetry, and port arrival</p></div></div>',
        '<div class="zix-table-wrap">',
          '<table class="zix-table">',
            '<thead><tr><th>Corridor</th><th>Route</th><th>Carrier & Vessel</th><th>Mode</th><th>Temperature</th><th>Status</th></tr></thead>',
            '<tbody>',
              '<tr><td style="font-family:monospace;">TRK-COR-01</td><td style="font-weight:600;">Marseille to JNPT</td><td>CMA CGM (Mozart)</td><td>Ocean (2 x 40ft)</td><td style="color:#0891b2;font-weight:600;">Ambient</td><td><span class="zix-pill cleared">Docked / JNPT</span></td></tr>',
              '<tr><td style="font-family:monospace;">TRK-COR-02</td><td style="font-weight:600;">Frankfurt to BLR</td><td>Lufthansa (LH 8220)</td><td>Air Reefer</td><td style="color:#0891b2;font-weight:600;">4.2°C Continuous</td><td><span class="zix-pill customs">Customs / BLR</span></td></tr>',
              '<tr><td style="font-family:monospace;">TRK-COR-03</td><td style="font-weight:600;">Rotterdam to JNPT</td><td>Maersk (Mc-Kinney)</td><td>Ocean Reefer</td><td style="color:#0891b2;font-weight:600;">3.8°C Continuous</td><td><span class="zix-pill transit">In Transit (Sea)</span></td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderProfitability() {
    return [
      '<div class="zix-kpi-grid">',
        kpiHtml('Blended Trade Margin', '47.2%', '+3.4% YoY', 'up', 'Direct OEM arbitrage', '💎'),
        kpiHtml('Landed Cost Multiplier', '1.14x CIF', 'Duty + Freight + Clearing', 'up', 'Lean cross-border supply', '📈'),
        kpiHtml('Export Net Contribution', '₹21.10 Lakh', '60.5% export margin', 'up', 'Haute couture luxury markup', '💰'),
        kpiHtml('Forex Gain / Arbitrage', '+₹1.84 Lakh', 'Favorable hedge settlement', 'up', 'Treasury forward contracts', '🌐'),
      '</div>',
      '<div class="zix-card">',
        '<div class="zix-card-head"><div><h3 class="zix-card-title">💎 Trade Lane Unit Economics & Landed Cost Margins</h3><p class="zix-card-sub">Procurement cost, landed duties, realized sales, and gross profit</p></div></div>',
        '<div class="zix-table-wrap">',
          '<table class="zix-table">',
            '<thead><tr><th>Trade Lane Description</th><th>Procurement</th><th>Landed Cost</th><th>Realized Revenue</th><th>Gross Profit</th><th>Margin</th></tr></thead>',
            '<tbody>',
              '<tr><td style="font-weight:600;">Import: Clinical Diet (France to India)</td><td>₹48,50,000</td><td>₹56,40,000</td><td style="font-weight:600;">₹94,80,000</td><td style="color:#059669;font-weight:600;">₹38,40,000</td><td><span class="zix-pill cleared">40.5%</span></td></tr>',
              '<tr><td style="font-weight:600;">Import: Antiparasitics & Biologics (Germany)</td><td>₹34,20,000</td><td>₹38,60,000</td><td style="font-weight:600;">₹74,20,000</td><td style="color:#059669;font-weight:600;">₹35,60,000</td><td><span class="zix-pill cleared">48.0%</span></td></tr>',
              '<tr><td style="font-weight:600;">Export: Bespoke Luxury Leather (India to UAE)</td><td>₹4,80,000</td><td>₹5,40,000</td><td style="font-weight:600;">₹14,50,000</td><td style="color:#059669;font-weight:600;">₹9,10,000</td><td><span class="zix-pill trade">62.8%</span></td></tr>',
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Master Render ───────────────────────────────────────────────── */
  function render() {
    if (!root) return;
    var currentTab = TABS.find(function (t) { return t.id === S.tab; }) || TABS[0];

    var html = [
      '<header class="zix-head">',
        '<div class="zix-head-left">',
          '<div class="zix-title-row">',
            '<h2 class="zix-title">' + currentTab.icon + ' ' + esc(currentTab.title) + '</h2>',
            '<span class="zix-live-badge"><span class="zix-pulse-dot"></span> Cross-Border Trade · Live</span>',
          '</div>',
          '<p class="zix-sub">' + esc(currentTab.sub) + '</p>',
        '</div>',
        '<div class="zix-head-actions">',
          '<button class="zix-btn" onclick="ZenveImportExportDashboard.showExportBookingModal()">+ Book Export</button>',
          '<button class="zix-btn primary" onclick="ZenveImportExportDashboard.showNewConsignmentModal()">+ New Consignment</button>',
          '<button class="zix-btn" onclick="ZenveImportExportDashboard.close()">✕ Close</button>',
        '</div>',
      '</header>',

      '<nav class="zix-tabs-bar">',
        TABS.map(function (t) {
          var active = t.id === S.tab ? ' active' : '';
          return '<button class="zix-tab' + active + '" onclick="ZenveImportExportDashboard.switchTab(\'' + t.id + '\')">' +
            '<span>' + t.icon + '</span>' +
            '<span>' + esc(t.label) + '</span>' +
            '<span class="zix-tab-badge">' + esc(t.badge) + '</span>' +
          '</button>';
        }).join(''),
      '</nav>',

      '<main class="zix-body">'
    ];

    switch (S.tab) {
      case 'import-dashboard': html.push(renderImportDashboard()); break;
      case 'export-dashboard': html.push(renderExportDashboard()); break;
      case 'import-orders':    html.push(renderImportOrders()); break;
      case 'export-orders':    html.push(renderExportOrders()); break;
      case 'suppliers':        html.push(renderSuppliers()); break;
      case 'buyers':           html.push(renderBuyers()); break;
      case 'customs':          html.push(renderCustoms()); break;
      case 'logistics':        html.push(renderLogistics()); break;
      case 'profitability':    html.push(renderProfitability()); break;
      default:                 html.push(renderImportDashboard());
    }

    html.push('</main>');
    root.innerHTML = html.join('');
  }

  /* ── Modals & Actions ────────────────────────────────────────────── */
  function showModal(contentHtml) {
    closeModal();
    var backdrop = document.createElement('div');
    backdrop.id = 'zix-active-modal';
    backdrop.className = 'zix-modal-backdrop';
    backdrop.innerHTML = '<div class="zix-modal">' + contentHtml + '</div>';
    backdrop.onclick = function (e) {
      if (e.target === backdrop) closeModal();
    };
    document.body.appendChild(backdrop);
  }

  function closeModal() {
    var existing = document.getElementById('zix-active-modal');
    if (existing) existing.remove();
  }

  function showNewConsignmentModal() {
    var formHtml = [
      '<div class="zix-modal-head">',
        '<h3 class="zix-modal-title">🚢 Create Inbound Import Consignment</h3>',
        '<button class="zix-btn" onclick="ZenveImportExportDashboard.closeModal()">✕</button>',
      '</div>',
      '<form onsubmit="event.preventDefault(); alert(\'Consignment created. Advance Bill of Entry generated for ICEGATE filing!\'); ZenveImportExportDashboard.closeModal();">',
        '<div class="zix-form-group"><label>International Supplier</label><select class="zix-select"><option>Royal Canin SAS (France)</option><option>MSD Animal Health GmbH (Germany)</option><option>Zoetis Global LLC (USA)</option><option>Guccio Leather Atelier (Italy)</option></select></div>',
        '<div class="zix-form-group"><label>Consignment Description / B/L</label><input type="text" class="zix-input" placeholder="e.g. 2 x 40ft HQ Reefer Container Nobivac DHPPi" required /></div>',
        '<div class="zix-form-row">',
          '<div class="zix-form-group"><label>CIF Value (USD / EUR)</label><input type="text" class="zix-input" placeholder="€52,000 (~₹46.8L)" required /></div>',
          '<div class="zix-form-group"><label>Port of Entry</label><select class="zix-select"><option>Nhava Sheva (JNPT)</option><option>Bengaluru Air Cargo (BLR)</option><option>Mumbai Air Cargo (BOM)</option><option>Chennai Port (MAA)</option></select></div>',
        '</div>',
        '<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:16px;">',
          '<button type="button" class="zix-btn" onclick="ZenveImportExportDashboard.closeModal()">Cancel</button>',
          '<button type="submit" class="zix-btn primary">Submit Consignment</button>',
        '</div>',
      '</form>'
    ].join('');
    showModal(formHtml);
  }

  function showExportBookingModal() {
    var formHtml = [
      '<div class="zix-modal-head">',
        '<h3 class="zix-modal-title">🛫 Book Overseas Export Flight / Vessel</h3>',
        '<button class="zix-btn" onclick="ZenveImportExportDashboard.closeModal()">✕</button>',
      '</div>',
      '<form onsubmit="event.preventDefault(); alert(\'Export booking confirmed. Shipping Bill auto-generated!\'); ZenveImportExportDashboard.closeModal();">',
        '<div class="zix-form-group"><label>Foreign Importer / Destination</label><input type="text" class="zix-input" placeholder="e.g. Royal Pets Hospital LLC (Dubai, UAE)" required /></div>',
        '<div class="zix-form-row">',
          '<div class="zix-form-group"><label>FOB Value (INR)</label><input type="text" class="zix-input" placeholder="₹14,50,000" required /></div>',
          '<div class="zix-form-group"><label>Mode of Export</label><select class="zix-select"><option>Air Cargo (Emirates)</option><option>Air Express (DHL)</option><option>Ocean Container (FCL)</option></select></div>',
        '</div>',
        '<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:16px;">',
          '<button type="button" class="zix-btn" onclick="ZenveImportExportDashboard.closeModal()">Cancel</button>',
          '<button type="submit" class="zix-btn primary">Confirm Export Booking</button>',
        '</div>',
      '</form>'
    ].join('');
    showModal(formHtml);
  }

  /* ── Open & Close Mechanics ──────────────────────────────────────── */
  function build() {
    root = document.getElementById('zix-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'zix-root';
      root.className = 'zpanel-root';
      document.body.appendChild(root);
    }
  }

  function open(tab) {
    // Close other domain overlays
    ['zfa-root', 'zmkt-dashboard-root', 'zvp-root', 'zfsh-root', 'zb2b-root', 'zsub-root', 'zod-root', 'zsd-root', 'zpid-root', 'zph-root', 'zch-root', 'zrep-root', 'zalt-root', 'zset-root', 'zhr-root', 'zsys-root'].forEach(function(id) {
      var el = document.getElementById(id);
      if (el) {
        el.classList.remove('zfa-open', 'zmkt-open', 'zvp-open', 'zfsh-open', 'zb2b-open', 'zsub-open', 'zod-open', 'zsd-open', 'zpid-open', 'zph-open', 'zch-open', 'zrep-open', 'zalt-open', 'zset-open', 'zhr-open', 'zsys-open', 'zpanel-open');
        el.style.display = 'none';
      }
    });
    if (document.querySelectorAll) {
      document.querySelectorAll('.zpanel-root').forEach(function(el) {
        if (el.id !== 'zix-root') {
          el.style.display = 'none';
          el.classList.remove('zfa-open', 'zmkt-open', 'zvp-open', 'zfsh-open', 'zb2b-open', 'zsub-open', 'zod-open', 'zsd-open', 'zpid-open', 'zph-open', 'zch-open', 'zrep-open', 'zalt-open', 'zset-open', 'zhr-open', 'zsys-open', 'zpanel-open');
        }
      });
    }

    if (tab && TABS.some(function (t) { return t.id === tab; })) {
      S.tab = tab;
    } else if (!S.tab) {
      S.tab = 'import-dashboard';
    }

    build();
    S.open = true;
    root.style.display = 'block';
    root.classList.add('zix-open', 'zpanel-open');
    try {
      document.documentElement.classList.remove('zfsh-locked', 'zvp-locked', 'zalt-locked', 'zb2b-locked', 'zsub-locked');
      document.body.classList.remove('zfsh-locked', 'zvp-locked', 'zalt-locked', 'zb2b-locked', 'zsub-locked');
      document.documentElement.classList.add('zix-locked');
      document.body.classList.add('zix-locked');
    } catch (e) {}
    render();

    var targetTab = TABS.find(function (t) { return t.id === S.tab; });
    if (targetTab && targetTab.hash && window.location.hash !== targetTab.hash) {
      try { history.replaceState(null, '', targetTab.hash); } catch (e) {}
    }
    root.scrollTop = 0;
  }

  function close() {
    S.open = false;
    if (root) {
      root.classList.remove('zix-open', 'zpanel-open');
      root.style.display = 'none';
    }
    try {
      document.documentElement.classList.remove('zix-locked');
      document.body.classList.remove('zix-locked');
    } catch (e) {}
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

  /* ── Interceptor for Hash & Sidebar Clicks ───────────────────────── */
  function onHashChange() {
    var t = tabFromHash(window.location.hash);
    if (t) {
      open(t);
    } else if (S.open && window.location.hash && window.location.hash !== '#') {
      var otherDomains = ['sales', 'operations', 'inventory', 'pharmacy', 'clinics', 'doctors', 'reports', 'alerts', 'settings', 'finance', 'marketing', 'vendors', 'procurement', 'fashion', 'b2b', 'enterprise', 'subscription'];
      var isOther = otherDomains.some(function(d) { return window.location.hash.indexOf(d) >= 0; });
      if (isOther) close();
    }
  }

  function initInterception() {
    document.addEventListener('click', function (e) {
      var accordionBtn = e.target.closest('button[aria-expanded]');
      if (accordionBtn) return;

      var el = e.target.closest('button, a, [data-go], [role="button"], li');
      if (!el) return;

      var href = el.getAttribute('href');
      var t = tabFromHash(href);
      if (t) {
        e.preventDefault();
        open(t);
        return;
      }

      var isSidebar = !!el.closest('aside, [class*="sidebar"]') && !el.closest('#zix-root');
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

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && S.open) close();
    });

    window.addEventListener('hashchange', onHashChange);

    if (window.location.hash) {
      var initial = tabFromHash(window.location.hash);
      if (initial) {
        setTimeout(function () { open(initial); }, 150);
      }
    }
  }

  /* ── Public API ──────────────────────────────────────────────────── */
  window.ZenveImportExportDashboard = {
    open: open,
    close: close,
    switchTab: switchTab,
    closeModal: closeModal,
    showNewConsignmentModal: showNewConsignmentModal,
    showExportBookingModal: showExportBookingModal
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initInterception);
  } else {
    initInterception();
  }
})();
