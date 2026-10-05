/* =====================================================================
   Zenve BI — Logistics & Delivery Executive Control Center
   Sidebar: Logistics & Delivery Suite (9 Subcategories)
   Pure Light Executive Design System
   ===================================================================== */

(function () {
  'use strict';

  var root = null;
  var S = {
    open: false,
    tab: 'overview',
    searchQuery: '',
    statusFilter: 'ALL',
    toastTimeout: null
  };

  /* ── 9 Subcategories Configuration ────────────────────────────────── */
  var MODULES = [
    { id: 'overview',               label: 'Logistics Dashboard',   icon: '⚡', hash: '#logistics-dashboard',   title: 'Rapid Logistics & Cold-Chain Dispatch Control Center', sub: 'Hyperlocal rapid dispatch, refrigerated vaccine cold-chain monitoring, and rider SLAs across 14 urban micro-hubs' },
    { id: 'delivery-orders',        label: 'Delivery Orders',        icon: '📦', hash: '#delivery-orders',        title: 'Live Delivery Orders & Manifest Stream', sub: 'Real-time parcel dispatch status, rider allocation, hyperlocal express tracking, and cold-chain temperature telemetry' },
    { id: 'delivery-partners',      label: 'Delivery Partners',      icon: '🛵', hash: '#delivery-partners',      title: 'Fleet & 3PL Logistics Delivery Partners', sub: 'Dedicated electric vehicle (EV) rider fleets, contracted hyperlocal 3PLs, bulk hub transfers, and SLA scorecards' },
    { id: 'delivery-tracking',      label: 'Delivery Tracking',      icon: '📍', hash: '#delivery-tracking',      title: 'Live GPS Fleet Telematics & Cold-Chain Tracking', sub: 'Real-time rider coordinates, IoT Bluetooth cold-box temperature telemetry, EV battery state, and route milestones' },
    { id: 'sixty-minute-delivery',  label: '60-Minute Delivery',     icon: '⏱️', hash: '#60-minute-delivery',     title: 'Hyperlocal 60-Minute Rapid Delivery SLA', sub: 'Guaranteed sub-60 minute order-to-doorstep dispatch for critical pet medications, diets, and emergency supplies' },
    { id: 'delivery-sla',           label: 'Delivery SLA',           icon: '🛡️', hash: '#delivery-sla',           title: 'Delivery Service Level Agreements (SLA) & Compliance', sub: 'Fulfillment SLA adherence, breach root causes, temperature cold-chain compliance, and first-attempt success' },
    { id: 'delivery-cost',          label: 'Delivery Cost',          icon: '💰', hash: '#delivery-cost',          title: 'Delivery Cost Economics & Per-Drop Efficiency', sub: 'Unit economics of last-mile delivery, EV vs ICE cost comparison, packaging expenses, and hub efficiency' },
    { id: 'failed-deliveries',       label: 'Failed Deliveries',      icon: '⚠️', hash: '#failed-deliveries',      title: 'Non-Delivery Reports (NDR) & Failed Delivery Analytics', sub: 'Failed first-attempt analysis, doorstep reachability, Return to Origin (RTO) prevention, and recovery velocity' },
    { id: 'delivery-performance',   label: 'Delivery Performance',   icon: '🏆', hash: '#delivery-performance',   title: 'Rider & Fleet Delivery Performance Scorecards', sub: 'Fulfillment efficiency rankings, doorstep customer satisfaction (CSAT), cold-chain compliance, and safety scorecards' }
  ];

  /* ── Master Datasets ──────────────────────────────────────────────── */
  var ORDERS = [
    { id: 'ORD-DL-9821', customer: 'Ananya Deshmukh', pet: 'Golden Retriever (Max)', hub: 'Koramangala Hub (BLR)', rider: 'Kiran Kumar (EV-44)', items: 'Nobivac DHPPi + Royal Canin Hepatic', time: '14 mins ago', eta: '18 mins', type: '60-Min Express', temp: '3.4°C', status: 'In Transit' },
    { id: 'ORD-DL-9820', customer: 'Rajesh Subramaniam', pet: 'Beagle (Rocky)', hub: 'Indiranagar Hub (BLR)', rider: 'Arun Varma (EV-12)', items: 'NexGard Chewables + Ear Cleanser', time: '22 mins ago', eta: '8 mins', type: '60-Min Express', temp: 'Ambient', status: 'Out for Delivery' },
    { id: 'ORD-DL-9819', customer: 'Meera Chawla', pet: 'Persian Cat (Snowy)', hub: 'Bandra West Hub (BOM)', rider: 'Sunil Jadhav (EV-88)', items: 'Renal Liquid Diet + Syringes', time: '35 mins ago', eta: 'Delivered', type: 'Same Day', temp: '4.1°C', status: 'Delivered' },
    { id: 'ORD-DL-9818', customer: 'Vikramaditya Rao', pet: 'German Shepherd (Tiger)', hub: 'Whitefield Hub (BLR)', rider: 'Praveen Gowda (EV-23)', items: 'Post-op Antibiotics + Collar', time: '41 mins ago', eta: '24 mins', type: '60-Min Express', temp: 'Ambient', status: 'In Transit' },
    { id: 'ORD-DL-9817', customer: 'Pooja Agarwal', pet: 'Shih Tzu (Coco)', hub: 'Andheri East Hub (BOM)', rider: 'Ramesh Sawant (EV-31)', items: 'Puppy Starter Pack + Tick Shield', time: '55 mins ago', eta: 'Delivered', type: 'Same Day', temp: 'Ambient', status: 'Delivered' },
    { id: 'ORD-DL-9816', customer: 'Nikhil Kashyap', pet: 'Labrador (Cooper)', hub: 'Gurugram Sec 29 (DEL)', rider: 'Mohit Sharma (EV-09)', items: 'Rabies Booster + Calcium Chewables', time: '1 hr ago', eta: 'Scheduled', type: 'Scheduled Slot', temp: '3.8°C', status: 'Dispatched' },
    { id: 'ORD-DL-9815', customer: 'Sonalika Sen', pet: 'Indie Puppy (Chutki)', hub: 'Jubilee Hills Hub (HYD)', rider: 'Venkatesh R (EV-55)', items: 'Emergency Deworming Suspension', time: '1 hr ago', eta: 'Delivered', type: '60-Min Express', temp: 'Ambient', status: 'Delivered' },
    { id: 'ORD-DL-9814', customer: 'Harish Mehta', pet: 'Rottweiler (Bruno)', hub: 'Koramangala Hub (BLR)', rider: 'Dinesh Patil (EV-19)', items: 'Prescription Joint Supplements', time: '2 hrs ago', eta: 'Rescheduled', type: 'Same Day', temp: 'Ambient', status: 'Failed Attempt' }
  ];

  var PARTNERS = [
    { name: 'Zenve Internal EV Fleet', type: 'Dedicated Electric 2-Wheeler', fleetSize: '76 Riders', activeNow: 62, onTimeSla: '99.4%', avgCost: '₹38 / drop', rating: '4.95 / 5.0', coldChainReady: 'Yes (Insulated Boxes)', status: 'Primary' },
    { name: 'Shadowfax Quick Delivery', type: 'On-Demand Hyperlocal 3PL', fleetSize: 'Flex Pool (BLR/BOM)', activeNow: 28, onTimeSla: '96.2%', avgCost: '₹46 / drop', rating: '4.78 / 5.0', coldChainReady: 'Partial', status: 'Active 3PL' },
    { name: 'Dunzo for Business', type: 'Instant Hyperlocal 3PL', fleetSize: 'Flex Pool (BLR)', activeNow: 14, onTimeSla: '95.8%', avgCost: '₹48 / drop', rating: '4.72 / 5.0', coldChainReady: 'No (Dry goods only)', status: 'Active 3PL' },
    { name: 'Porter Enterprise', type: '4-Wheeler & Bulk Hub Transfer', fleetSize: '12 Vans', activeNow: 9, onTimeSla: '98.1%', avgCost: '₹340 / trip', rating: '4.88 / 5.0', coldChainReady: 'Yes (Reefer Vans)', status: 'Bulk & Hubs' },
    { name: 'Delhivery Surface Direct', type: 'Inter-City & Regional Courier', fleetSize: 'National Network', activeNow: 4, onTimeSla: '94.5%', avgCost: '₹85 / parcel', rating: '4.65 / 5.0', coldChainReady: 'Dry Ice Verified', status: 'Inter-City' }
  ];

  var TRACKING_STREAMS = [
    { trackerId: 'TRK-901', rider: 'Kiran Kumar (EV-44)', location: '100ft Road, Indiranagar', dest: 'Koramangala 4th Block', speed: '32 km/h', battery: '82%', temp: '3.4°C', signal: 'Strong (5G)', eta: '12 mins', status: 'En Route' },
    { trackerId: 'TRK-902', rider: 'Arun Varma (EV-12)', location: 'HSR 27th Main', dest: 'HSR Layout Sector 1', speed: '24 km/h', battery: '68%', temp: 'Ambient', signal: 'Strong (5G)', eta: '6 mins', status: 'En Route' },
    { trackerId: 'TRK-903', rider: 'Praveen Gowda (EV-23)', location: 'ITPL Main Rd, Whitefield', dest: 'Prestige Shantiniketan', speed: '28 km/h', battery: '74%', temp: '3.9°C', signal: 'Normal (4G)', eta: '18 mins', status: 'En Route' },
    { trackerId: 'TRK-904', rider: 'Sunil Jadhav (EV-88)', location: 'Linking Road, Bandra West', dest: 'Pali Hill, Bandra', speed: '19 km/h', battery: '59%', temp: '4.2°C', signal: 'Strong (5G)', eta: '9 mins', status: 'En Route' },
    { trackerId: 'TRK-905', rider: 'Ramesh Sawant (EV-31)', location: 'JVLR Junction, Andheri East', dest: 'Poonam Nagar', speed: '26 km/h', battery: '91%', temp: 'Ambient', signal: 'Normal (4G)', eta: '14 mins', status: 'En Route' },
    { trackerId: 'TRK-906', rider: 'Mohit Sharma (EV-09)', location: 'Cyber City, Gurugram', dest: 'DLF Phase 2', speed: '34 km/h', battery: '64%', temp: '3.7°C', signal: 'Strong (5G)', eta: '16 mins', status: 'En Route' }
  ];

  var HUBS_60M = [
    { hub: 'Koramangala Dark Store Hub', city: 'Bengaluru', orders60m: 142, avgFulfillment: '32.4 mins', dispatchTime: '6.2 mins', breachCount: 1, slaCompliance: '99.3%', peakCapacity: '28 riders' },
    { hub: 'Indiranagar Care Hub', city: 'Bengaluru', orders60m: 118, avgFulfillment: '34.8 mins', dispatchTime: '7.1 mins', breachCount: 2, slaCompliance: '98.3%', peakCapacity: '22 riders' },
    { hub: 'Whitefield Tech Center', city: 'Bengaluru', orders60m: 86, avgFulfillment: '38.6 mins', dispatchTime: '8.4 mins', breachCount: 3, slaCompliance: '96.5%', peakCapacity: '18 riders' },
    { hub: 'Bandra West Specialty Hub', city: 'Mumbai', orders60m: 98, avgFulfillment: '35.1 mins', dispatchTime: '6.8 mins', breachCount: 1, slaCompliance: '99.0%', peakCapacity: '20 riders' },
    { hub: 'Andheri East Logistics Node', city: 'Mumbai', orders60m: 84, avgFulfillment: '37.2 mins', dispatchTime: '7.9 mins', breachCount: 2, slaCompliance: '97.6%', peakCapacity: '16 riders' },
    { hub: 'Gurugram Cyber Hub Node', city: 'Delhi-NCR', orders60m: 76, avgFulfillment: '39.0 mins', dispatchTime: '8.1 mins', breachCount: 2, slaCompliance: '97.4%', peakCapacity: '15 riders' }
  ];

  var SLA_DATA = [
    { tier: '60-Minute Rapid Tier', target: '< 60 mins', actual: '36.2 mins', volume: '14,200', breaches: 24, compliance: '98.3%', benchmark: '95.0%', status: 'Exceeding' },
    { tier: 'Same-Day Slotted Tier', target: '< 4 hours', actual: '2.8 hours', volume: '6,400', breaches: 18, compliance: '97.2%', benchmark: '95.0%', status: 'Exceeding' },
    { tier: 'Cold-Chain Biologicals', target: '2°C to 8°C continuous', actual: '99.9% in-range', volume: '3,850', breaches: 3, compliance: '99.9%', benchmark: '99.5%', status: 'World Class' },
    { tier: 'Next-Day Clinic Supply', target: '< 24 hours', actual: '18.4 hours', volume: '1,200', breaches: 8, compliance: '99.3%', benchmark: '98.0%', status: 'Exceeding' },
    { tier: 'Emergency Telehealth Dispatch', target: '< 45 mins', actual: '28.1 mins', volume: '980', breaches: 4, compliance: '99.6%', benchmark: '98.0%', status: 'World Class' }
  ];

  var COST_DATA = [
    { component: 'Rider Payout (Per Drop Base)', internalEv: '₹28.00', partner3pl: '₹38.50', variance: '-₹10.50 (EV Saves 27%)', shareOfCost: '54.2%' },
    { component: 'Fuel & EV Battery Swapping', internalEv: '₹3.40', partner3pl: '₹8.20', variance: '-₹4.80 (EV Saves 58%)', shareOfCost: '12.4%' },
    { component: 'Packaging & Thermal Cold-Box Pouches', internalEv: '₹6.20', partner3pl: '₹6.20', variance: '₹0.00 (Standardized)', shareOfCost: '14.8%' },
    { component: 'Dispatch Telematics & SaaS Platform', internalEv: '₹1.80', partner3pl: '₹2.40', variance: '-₹0.60 (In-House)', shareOfCost: '5.1%' },
    { component: 'Failed Attempt Re-dispatch Buffer', internalEv: '₹1.10', partner3pl: '₹2.80', variance: '-₹1.70 (Higher EV OTP rate)', shareOfCost: '3.5%' },
    { component: 'Insurance & Transit Damage Guarantee', internalEv: '₹1.40', partner3pl: '₹1.40', variance: '₹0.00 (Shared)', shareOfCost: '10.0%' }
  ];

  var FAILED_CAUSES = [
    { cause: 'Pet Parent Unavailable / Phone Unreachable', incidents: 38, pct: '44.2%', avgResolution: 'Same-day re-slot via WhatsApp', rtoImpact: 'Low (92% re-delivered)' },
    { cause: 'Gated Society Entry Delayed / Denied', incidents: 19, pct: '22.1%', avgResolution: 'Security gate handover OTP', rtoImpact: 'Minimal (96% re-delivered)' },
    { cause: 'Address Incomplete / Incorrect Landmark', incidents: 14, pct: '16.3%', avgResolution: 'Google Maps pin sharing with rider', rtoImpact: 'Medium (88% re-delivered)' },
    { cause: 'Customer Cancelled at Doorstep', incidents: 8, pct: '9.3%', avgResolution: 'Immediate dark store restock', rtoImpact: 'Definite RTO (Refund initiated)' },
    { cause: 'Severe Monsoon Waterlogging / Roadblock', incidents: 5, pct: '5.8%', avgResolution: 'Alternate rider re-routing', rtoImpact: 'Low (Delivered within 3 hrs)' },
    { cause: 'Cold-Chain Temperature Warning Excursion', incidents: 2, pct: '2.3%', avgResolution: 'Fresh vial dispatched immediately from hub', rtoImpact: 'Zero cost to customer' }
  ];

  var TOP_RIDERS = [
    { rank: 1, name: 'Kiran Kumar', vehicleId: 'EV-BLR-044', hub: 'Koramangala Hub', deliveries: 312, onTime: '99.7%', avgSpeed: '27.4 km/h', csat: '4.98 / 5.0', coldChainAudits: '100% Pass', badge: 'Star Rider of Month' },
    { rank: 2, name: 'Arun Varma', vehicleId: 'EV-BLR-012', hub: 'Indiranagar Hub', deliveries: 294, onTime: '99.3%', avgSpeed: '26.8 km/h', csat: '4.95 / 5.0', coldChainAudits: '100% Pass', badge: 'Top CSAT' },
    { rank: 3, name: 'Sunil Jadhav', vehicleId: 'EV-BOM-088', hub: 'Bandra West Hub', deliveries: 288, onTime: '98.9%', avgSpeed: '22.1 km/h', csat: '4.94 / 5.0', coldChainAudits: '100% Pass', badge: 'Rapid City Master' },
    { rank: 4, name: 'Praveen Gowda', vehicleId: 'EV-BLR-023', hub: 'Whitefield Hub', deliveries: 276, onTime: '98.6%', avgSpeed: '28.2 km/h', csat: '4.91 / 5.0', coldChainAudits: '100% Pass', badge: 'Long-Range Ace' },
    { rank: 5, name: 'Mohit Sharma', vehicleId: 'EV-DEL-009', hub: 'Gurugram Hub', deliveries: 264, onTime: '98.4%', avgSpeed: '29.5 km/h', csat: '4.89 / 5.0', coldChainAudits: '100% Pass', badge: 'High-Volume Pro' }
  ];

  /* ── Helpers ──────────────────────────────────────────────────────── */
  function showToast(msg) {
    var old = document.querySelector('.zlog-toast');
    if (old) old.remove();
    var t = document.createElement('div');
    t.className = 'zlog-toast';
    t.innerHTML = '<span>⚡</span> <span>' + msg + '</span>';
    document.body.appendChild(t);
    clearTimeout(S.toastTimeout);
    S.toastTimeout = setTimeout(function () {
      if (t.parentNode) t.remove();
    }, 3200);
  }

  function closeOthers() {
    var otherRoots = ['#zmkt-dashboard-root', '#zvp-dashboard-root', '#zhr-dashboard-root', '#zod-root', '#zsd-root'];
    otherRoots.forEach(function (sel) {
      var el = document.querySelector(sel);
      if (el) {
        el.classList.remove('zpanel-open');
        el.style.display = 'none';
      }
    });
  }

  function tabFromHash(hash) {
    if (!hash) return null;
    var clean = hash.toLowerCase();
    for (var i = 0; i < MODULES.length; i++) {
      if (clean === MODULES[i].hash.toLowerCase()) {
        return MODULES[i].id;
      }
    }
    if (clean === '#logistics' || clean === '#logistics-dashboard' || clean === '#logistics-delivery' || clean === '#delivery') return 'overview';
    if (clean === '#delivery-orders' || clean === '#deliveryorders') return 'delivery-orders';
    if (clean === '#delivery-partners' || clean === '#deliverypartners') return 'delivery-partners';
    if (clean === '#delivery-tracking' || clean === '#deliverytracking') return 'delivery-tracking';
    if (clean === '#60-minute-delivery' || clean === '#60-minute' || clean === '#60min') return 'sixty-minute-delivery';
    if (clean === '#delivery-sla' || clean === '#deliverysla') return 'delivery-sla';
    if (clean === '#delivery-cost' || clean === '#deliverycost') return 'delivery-cost';
    if (clean === '#failed-deliveries' || clean === '#faileddeliveries') return 'failed-deliveries';
    if (clean === '#delivery-performance' || clean === '#deliveryperformance') return 'delivery-performance';
    return null;
  }

  function tabFromText(text) {
    if (!text) return null;
    var t = text.trim().toLowerCase();
    if (t === 'logistics dashboard' || t === 'logistics & delivery' || t === 'logistics & deliveries' || t === 'logistics' || t === 'rapid logistics & cold-chain dispatch') return 'overview';
    if (t === 'delivery orders' || t === 'orders dispatch') return 'delivery-orders';
    if (t === 'delivery partners' || t === 'fleet partners' || t === 'partners') return 'delivery-partners';
    if (t === 'delivery tracking' || t === 'telematics' || t === 'live tracking') return 'delivery-tracking';
    if (t === '60-minute delivery' || t === '60-minute rapid delivery' || t === '60 min delivery') return 'sixty-minute-delivery';
    if (t === 'delivery sla' || t === 'sla compliance' || t === 'sla') return 'delivery-sla';
    if (t === 'delivery cost' || t === 'delivery economics' || t === 'cost per drop') return 'delivery-cost';
    if (t === 'failed deliveries' || t === 'failed delivery' || t === 'ndr reports') return 'failed-deliveries';
    if (t === 'delivery performance' || t === 'rider performance' || t === 'fleet performance') return 'delivery-performance';
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
      if (m.id === 'delivery-orders') count = '<span class="zlog-chip-count">' + ORDERS.length + '</span>';
      else if (m.id === 'delivery-partners') count = '<span class="zlog-chip-count">' + PARTNERS.length + '</span>';
      else if (m.id === 'sixty-minute-delivery') count = '<span class="zlog-chip-count">36m</span>';
      else if (m.id === 'delivery-sla') count = '<span class="zlog-chip-count">98.4%</span>';

      return [
        '<button type="button" class="zlog-chip ' + (isActive ? 'active' : '') + '" data-tab="' + m.id + '">',
        '  <span>' + m.icon + '</span>',
        '  <span>' + m.label + '</span>',
        count,
        '</button>'
      ].join('');
    }).join('');

    root.innerHTML = [
      '<header class="zlog-header">',
      '  <div class="zlog-header-left">',
      '    <div class="zlog-brand-badge">⚡</div>',
      '    <div class="zlog-title-group">',
      '      <div class="zlog-title-row">',
      '        <h1 class="zlog-main-title">' + curMod.title + '</h1>',
      '        <div class="zlog-status-badge"><span class="zlog-status-dot"></span> Cold Chain & Fleet Live</div>',
      '      </div>',
      '      <div class="zlog-subtitle">' + curMod.sub + '</div>',
      '    </div>',
      '  </div>',
      '  <div class="zlog-header-right">',
      '    <button type="button" class="zlog-btn zlog-btn-secondary" id="zlog-export-btn">📊 Export CSV</button>',
      '    <button type="button" class="zlog-btn zlog-btn-secondary" id="zlog-track-btn">📍 Live Telematics</button>',
      '    <button type="button" class="zlog-btn zlog-btn-primary" id="zlog-dispatch-btn">+ Fast Dispatch</button>',
      '    <button type="button" class="zlog-btn-close" id="zlog-close-btn" title="Close Dashboard (Esc)">✕</button>',
      '  </div>',
      '</header>',
      '<nav class="zlog-nav-bar">' + chipsHtml + '</nav>',
      '<main class="zlog-content" id="zlog-body-content"></main>'
    ].join('');

    wireHeaderEvents();
    renderTabContent();
  }

  function wireHeaderEvents() {
    // Subcategory chip clicks
    var chips = root.querySelectorAll('.zlog-chip');
    chips.forEach(function (c) {
      c.onclick = function () {
        var t = c.getAttribute('data-tab');
        switchTab(t);
      };
    });

    // Close button
    var closeBtn = root.querySelector('#zlog-close-btn');
    if (closeBtn) {
      closeBtn.onclick = function () { close(); };
    }

    // Fast dispatch modal
    var dispatchBtn = root.querySelector('#zlog-dispatch-btn');
    if (dispatchBtn) {
      dispatchBtn.onclick = function () { showDispatchModal(); };
    }

    // Telematics modal
    var trackBtn = root.querySelector('#zlog-track-btn');
    if (trackBtn) {
      trackBtn.onclick = function () { showTelematicsModal(); };
    }

    // Export CSV
    var expBtn = root.querySelector('#zlog-export-btn');
    if (expBtn) {
      expBtn.onclick = function () { exportTabCSV(); };
    }
  }

  /* ── Tab Content Renderer ─────────────────────────────────────────── */
  function renderTabContent() {
    var c = root.querySelector('#zlog-body-content');
    if (!c) return;

    if (S.tab === 'overview') c.innerHTML = renderOverview();
    else if (S.tab === 'delivery-orders') c.innerHTML = renderDeliveryOrders();
    else if (S.tab === 'delivery-partners') c.innerHTML = renderDeliveryPartners();
    else if (S.tab === 'delivery-tracking') c.innerHTML = renderDeliveryTracking();
    else if (S.tab === 'sixty-minute-delivery') c.innerHTML = renderSixtyMinuteDelivery();
    else if (S.tab === 'delivery-sla') c.innerHTML = renderDeliverySLA();
    else if (S.tab === 'delivery-cost') c.innerHTML = renderDeliveryCost();
    else if (S.tab === 'failed-deliveries') c.innerHTML = renderFailedDeliveries();
    else if (S.tab === 'delivery-performance') c.innerHTML = renderDeliveryPerformance();

    wireTabSpecificEvents();
  }

  /* ── Individual Subcategory Views ─────────────────────────────────── */
  function renderOverview() {
    return [
      '<div class="zlog-kpi-grid">',
      '  <div class="zlog-kpi">',
      '    <div class="zlog-kpi-top"><span class="zlog-kpi-label">Active Hyperlocal Fleet</span><span class="zlog-kpi-icon">🛵</span></div>',
      '    <div class="zlog-kpi-val">76 EV Riders</div>',
      '    <div class="zlog-kpi-bottom"><span class="zlog-delta up">↑ 100% Electric</span><span class="zlog-subtext">38 riders on road right now</span></div>',
      '  </div>',
      '  <div class="zlog-kpi">',
      '    <div class="zlog-kpi-top"><span class="zlog-kpi-label">Avg Fulfillment Speed</span><span class="zlog-kpi-icon">⚡</span></div>',
      '    <div class="zlog-kpi-val">36.2 mins</div>',
      '    <div class="zlog-kpi-bottom"><span class="zlog-delta up">↑ Target &lt; 60m</span><span class="zlog-subtext">Order placement to OTP doorstep</span></div>',
      '  </div>',
      '  <div class="zlog-kpi">',
      '    <div class="zlog-kpi-top"><span class="zlog-kpi-label">Cold-Chain Integrity</span><span class="zlog-kpi-icon">❄️</span></div>',
      '    <div class="zlog-kpi-val">99.9%</div>',
      '    <div class="zlog-kpi-bottom"><span class="zlog-delta up">↑ Constant 2-8°C</span><span class="zlog-subtext">Refrigerated vaccines & biologics</span></div>',
      '  </div>',
      '  <div class="zlog-kpi">',
      '    <div class="zlog-kpi-top"><span class="zlog-kpi-label">Delivery Failure Rate</span><span class="zlog-kpi-icon">🎯</span></div>',
      '    <div class="zlog-kpi-val">0.8%</div>',
      '    <div class="zlog-kpi-bottom"><span class="zlog-delta up">↑ Benchmark 3.5%</span><span class="zlog-subtext">First attempt doorstep success</span></div>',
      '  </div>',
      '</div>',

      '<div class="zlog-grid-2">',
      '  <div class="zlog-card">',
      '    <div class="zlog-card-head">',
      '      <div>',
      '        <h3 class="zlog-card-title">🗺️ Live Fleet Dispatch Streams</h3>',
      '        <p class="zlog-card-sub">Urban micro-hub delivery cluster velocity across metro areas</p>',
      '      </div>',
      '      <button class="zlog-btn zlog-btn-secondary" onclick="ZenveLogisticsDashboard.switchTab(\'delivery-tracking\')">Open Full Map</button>',
      '    </div>',
      '    <div style="height:210px;background:linear-gradient(135deg, #0f172a, #1e293b);border-radius:10px;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#38bdf8;text-align:center;padding:16px;">',
      '      <div style="font-size:36px;margin-bottom:8px;">🗺️</div>',
      '      <div style="font-size:13px;font-weight:700;color:#f8fafc;">Bengaluru Central (28m avg) • South Mumbai (34m avg) • Delhi-NCR (39m avg)</div>',
      '      <div style="font-size:11px;color:#94a3b8;margin-top:6px;">62 active EV riders communicating live telemetry via Bluetooth Cold-Box IoT sensors</div>',
      '    </div>',
      '  </div>',

      '  <div class="zlog-card">',
      '    <div class="zlog-card-head">',
      '      <div>',
      '        <h3 class="zlog-card-title">⚡ Quick Logistics Subcategories</h3>',
      '        <p class="zlog-card-sub">Access dedicated dashboards across the delivery lifecycle</p>',
      '      </div>',
      '    </div>',
      '    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">',
      MODULES.slice(1).map(function (m) {
        return [
          '<button type="button" class="zlog-chip" style="justify-content:flex-start;padding:10px 12px;" onclick="ZenveLogisticsDashboard.switchTab(\'' + m.id + '\')">',
          '  <span style="font-size:16px;">' + m.icon + '</span>',
          '  <div style="text-align:left;">',
          '    <div style="font-weight:700;font-size:12px;color:#0f172a;">' + m.label + '</div>',
          '    <div style="font-size:10px;color:#64748b;">Direct Subcategory View</div>',
          '  </div>',
          '</button>'
        ].join('');
      }).join(''),
      '    </div>',
      '  </div>',
      '</div>',

      '<div class="zlog-card">',
      '  <div class="zlog-card-head">',
      '    <div>',
      '      <h3 class="zlog-card-title">📦 Recent High-Priority Dispatches</h3>',
      '      <p class="zlog-card-sub">Active medical prescriptions and express deliveries in-flight</p>',
      '    </div>',
      '    <button class="zlog-btn zlog-btn-secondary" onclick="ZenveLogisticsDashboard.switchTab(\'delivery-orders\')">View All Manifests</button>',
      '  </div>',
      '  <div class="zlog-table-wrap">',
      '    <table class="zlog-table">',
      '      <thead><tr><th>Order ID</th><th>Customer & Pet</th><th>Hub</th><th>Rider</th><th>Items</th><th>Cold Chain</th><th>Status</th></tr></thead>',
      '      <tbody>',
      ORDERS.slice(0, 5).map(function (o) {
        return [
          '<tr>',
          '  <td style="font-weight:700;font-family:monospace;color:#0f172a;">' + o.id + '</td>',
          '  <td><strong>' + o.customer + '</strong><br><span style="color:#64748b;font-size:11px;">' + o.pet + '</span></td>',
          '  <td>' + o.hub + '</td>',
          '  <td style="color:#0284c7;font-weight:600;">' + o.rider + '</td>',
          '  <td style="max-width:200px;color:#475569;">' + o.items + '</td>',
          '  <td>' + (o.temp !== 'Ambient' ? '<span class="zlog-tag cyan">❄️ ' + o.temp + '</span>' : '<span style="color:#94a3b8;">Ambient</span>') + '</td>',
          '  <td><span class="zlog-tag ' + (o.status === 'Delivered' ? 'green' : o.status === 'Failed Attempt' ? 'red' : 'yellow') + '">' + o.status + ' (' + o.eta + ')</span></td>',
          '</tr>'
        ].join('');
      }).join(''),
      '      </tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderDeliveryOrders() {
    var filtered = ORDERS.filter(function (o) {
      var matchF = S.statusFilter === 'ALL' || o.status === S.statusFilter;
      var matchQ = !S.searchQuery ||
        o.id.toLowerCase().indexOf(S.searchQuery.toLowerCase()) >= 0 ||
        o.customer.toLowerCase().indexOf(S.searchQuery.toLowerCase()) >= 0 ||
        o.hub.toLowerCase().indexOf(S.searchQuery.toLowerCase()) >= 0 ||
        o.rider.toLowerCase().indexOf(S.searchQuery.toLowerCase()) >= 0;
      return matchF && matchQ;
    });

    return [
      '<div class="zlog-kpi-grid">',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Dispatched Today</span><span class="zlog-kpi-icon">📦</span></div><div class="zlog-kpi-val">482 Orders</div><div class="zlog-kpi-bottom"><span class="zlog-delta up">↑ +18.4%</span><span class="zlog-subtext">Across 14 micro-hubs</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Active In-Transit</span><span class="zlog-kpi-icon">🛵</span></div><div class="zlog-kpi-val">38 Parcels</div><div class="zlog-kpi-bottom"><span class="zlog-delta neutral">• Live Now</span><span class="zlog-subtext">Avg speed 26.8 km/h</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">60-Min Express Tier</span><span class="zlog-kpi-icon">⚡</span></div><div class="zlog-kpi-val">294 Orders</div><div class="zlog-kpi-bottom"><span class="zlog-delta up">↑ 61% mix</span><span class="zlog-subtext">High urgency Rx & diets</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Doorstep OTP Rate</span><span class="zlog-kpi-icon">🎯</span></div><div class="zlog-kpi-val">99.2%</div><div class="zlog-kpi-bottom"><span class="zlog-delta up">↑ +0.4% MoM</span><span class="zlog-subtext">Verified handoffs</span></div></div>',
      '</div>',

      '<div class="zlog-card">',
      '  <div class="zlog-card-head">',
      '    <div>',
      '      <h3 class="zlog-card-title">Delivery Orders Manifest & Dispatch Console</h3>',
      '      <p class="zlog-card-sub">Real-time status of orders handled by Zenve EV Fleet and partner delivery networks</p>',
      '    </div>',
      '    <div style="display:flex;gap:10px;align-items:center;">',
      '      <input type="text" class="zlog-input" id="zlog-order-search" placeholder="Search order, pet parent, rider, hub..." value="' + S.searchQuery + '" style="min-width:240px;"/>',
      '      <select class="zlog-select" id="zlog-order-status" style="min-width:140px;">',
      '        <option value="ALL"' + (S.statusFilter === 'ALL' ? ' selected' : '') + '>All Statuses</option>',
      '        <option value="In Transit"' + (S.statusFilter === 'In Transit' ? ' selected' : '') + '>In Transit</option>',
      '        <option value="Out for Delivery"' + (S.statusFilter === 'Out for Delivery' ? ' selected' : '') + '>Out for Delivery</option>',
      '        <option value="Dispatched"' + (S.statusFilter === 'Dispatched' ? ' selected' : '') + '>Dispatched</option>',
      '        <option value="Delivered"' + (S.statusFilter === 'Delivered' ? ' selected' : '') + '>Delivered</option>',
      '        <option value="Failed Attempt"' + (S.statusFilter === 'Failed Attempt' ? ' selected' : '') + '>Failed Attempt</option>',
      '      </select>',
      '    </div>',
      '  </div>',
      '  <div class="zlog-table-wrap">',
      '    <table class="zlog-table">',
      '      <thead><tr><th>Order ID</th><th>Customer & Companion</th><th>Origin Hub</th><th>Rider</th><th>Items</th><th>Tier</th><th>Cold Chain</th><th>Status / ETA</th></tr></thead>',
      '      <tbody>',
      filtered.map(function (o) {
        return [
          '<tr>',
          '  <td style="font-weight:700;font-family:monospace;color:#0f172a;">' + o.id + '</td>',
          '  <td><strong>' + o.customer + '</strong><div style="font-size:11px;color:#64748b;">' + o.pet + '</div></td>',
          '  <td>' + o.hub + '</td>',
          '  <td style="color:#0284c7;font-weight:600;">' + o.rider + '</td>',
          '  <td style="color:#475569;max-width:210px;">' + o.items + '</td>',
          '  <td><span class="zlog-tag ' + (o.type.indexOf('60-Min') >= 0 ? 'blue' : 'yellow') + '">' + o.type + '</span></td>',
          '  <td>' + (o.temp !== 'Ambient' ? '<span class="zlog-tag cyan">❄️ ' + o.temp + '</span>' : '<span style="color:#94a3b8;">Ambient</span>') + '</td>',
          '  <td><span class="zlog-tag ' + (o.status === 'Delivered' ? 'green' : o.status === 'Failed Attempt' ? 'red' : 'yellow') + '">' + o.status + ' (' + o.eta + ')</span></td>',
          '</tr>'
        ].join('');
      }).join(''),
      '      </tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderDeliveryPartners() {
    return [
      '<div class="zlog-kpi-grid">',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Dedicated Fleet</span><span class="zlog-kpi-icon">⚡</span></div><div class="zlog-kpi-val">76 EV Riders</div><div class="zlog-kpi-bottom"><span class="zlog-delta up">↑ 100% Electric</span><span class="zlog-subtext">Zero carbon emissions</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Active On Road</span><span class="zlog-kpi-icon">🛵</span></div><div class="zlog-kpi-val">117 Riders</div><div class="zlog-kpi-bottom"><span class="zlog-delta up">↑ Live Capacity</span><span class="zlog-subtext">Internal + Contracted 3PLs</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Blended On-Time SLA</span><span class="zlog-kpi-icon">⏱️</span></div><div class="zlog-kpi-val">98.2%</div><div class="zlog-kpi-bottom"><span class="zlog-delta up">↑ +0.8% MoM</span><span class="zlog-subtext">Network average</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Avg Fleet Rating</span><span class="zlog-kpi-icon">⭐</span></div><div class="zlog-kpi-val">4.86 / 5</div><div class="zlog-kpi-bottom"><span class="zlog-delta up">↑ Exceptional</span><span class="zlog-subtext">Pet parent feedback</span></div></div>',
      '</div>',

      '<div class="zlog-card">',
      '  <div class="zlog-card-head">',
      '    <div>',
      '      <h3 class="zlog-card-title">Delivery Partners & Fleet Roster</h3>',
      '      <p class="zlog-card-sub">Fleet model, rider volume, on-time SLA metrics, and cold-chain compliance</p>',
      '    </div>',
      '  </div>',
      '  <div class="zlog-table-wrap">',
      '    <table class="zlog-table">',
      '      <thead><tr><th>Partner Name</th><th>Fleet Model</th><th>Fleet Size</th><th>Active Now</th><th>On-Time SLA</th><th>Drop Cost</th><th>Cold-Chain Ready</th><th>CSAT Rating</th><th>Status</th></tr></thead>',
      '      <tbody>',
      PARTNERS.map(function (p) {
        return [
          '<tr>',
          '  <td style="font-weight:700;color:#0f172a;">' + p.name + '</td>',
          '  <td style="color:#64748b;">' + p.type + '</td>',
          '  <td style="font-weight:600;">' + p.fleetSize + '</td>',
          '  <td style="color:#16a34a;font-weight:700;font-family:monospace;">' + p.activeNow + ' on road</td>',
          '  <td style="color:#2563eb;font-weight:700;font-family:monospace;">' + p.onTimeSla + '</td>',
          '  <td style="font-family:monospace;color:#475569;">' + p.avgCost + '</td>',
          '  <td><span class="zlog-tag ' + (p.coldChainReady.indexOf('Yes') >= 0 ? 'cyan' : 'yellow') + '">' + p.coldChainReady + '</span></td>',
          '  <td style="color:#d97706;font-weight:700;">' + p.rating + '</td>',
          '  <td><span class="zlog-tag ' + (p.status === 'Primary' ? 'green' : 'blue') + '">' + p.status + '</span></td>',
          '</tr>'
        ].join('');
      }).join(''),
      '      </tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderDeliveryTracking() {
    return [
      '<div class="zlog-kpi-grid">',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Live Tracked Riders</span><span class="zlog-kpi-icon">📡</span></div><div class="zlog-kpi-val">38 Active</div><div class="zlog-kpi-bottom"><span class="zlog-delta up">↑ 100% Lock</span><span class="zlog-subtext">Sub-second telemetry</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Refrigerated Parcels</span><span class="zlog-kpi-icon">❄️</span></div><div class="zlog-kpi-val">14 Boxes</div><div class="zlog-kpi-bottom"><span class="zlog-delta up">↑ 2°C - 8°C Safe</span><span class="zlog-subtext">Bluetooth IoT sensors</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Average Speed</span><span class="zlog-kpi-icon">⚡</span></div><div class="zlog-kpi-val">26.8 km/h</div><div class="zlog-kpi-bottom"><span class="zlog-delta up">↑ Optimal city speed</span><span class="zlog-subtext">Zero infractions</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Fleet Battery Health</span><span class="zlog-kpi-icon">🔋</span></div><div class="zlog-kpi-val">74% Avg</div><div class="zlog-kpi-bottom"><span class="zlog-delta up">↑ Safe battery margin</span><span class="zlog-subtext">Smart charging stations</span></div></div>',
      '</div>',

      '<div class="zlog-grid-2">',
      '  <div class="zlog-card">',
      '    <div class="zlog-card-head">',
      '      <div>',
      '        <h3 class="zlog-card-title">🗺️ Real-Time Fleet GPS Geofence</h3>',
      '        <p class="zlog-card-sub">Active EV rider positions and delivery route telemetry</p>',
      '      </div>',
      '    </div>',
      '    <div style="height:240px;background:linear-gradient(135deg, #0f172a, #1e293b);border-radius:10px;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#38bdf8;position:relative;">',
      '      <div style="font-size:38px;margin-bottom:8px;">📍</div>',
      '      <div style="font-size:14px;font-weight:700;color:#f8fafc;">Live Urban Telematics Radar (Bengaluru • Mumbai • Delhi)</div>',
      '      <div style="font-size:11px;color:#94a3b8;margin-top:4px;">38 active couriers pinging GPS every 1,000ms</div>',
      '      <div style="position:absolute;bottom:12px;left:12px;background:rgba(15,23,42,0.85);padding:4px 10px;border-radius:6px;border:1px solid #334155;font-size:11px;color:#34d399;">● WebSocket Telemetry: Synchronized</div>',
      '    </div>',
      '  </div>',

      '  <div class="zlog-card">',
      '    <div class="zlog-card-head">',
      '      <div>',
      '        <h3 class="zlog-card-title">Live Rider Telematics Stream</h3>',
      '        <p class="zlog-card-sub">Current GPS waypoint, cold-box temp & destination ETA</p>',
      '      </div>',
      '    </div>',
      '    <div class="zlog-table-wrap">',
      '      <table class="zlog-table">',
      '        <thead><tr><th>Rider</th><th>Location</th><th>Cold Box</th><th>Battery</th><th>ETA</th></tr></thead>',
      '        <tbody>',
      TRACKING_STREAMS.map(function (s) {
        return [
          '<tr>',
          '  <td style="font-weight:700;color:#0f172a;">' + s.rider + '</td>',
          '  <td style="color:#475569;">' + s.location + '</td>',
          '  <td>' + (s.temp !== 'Ambient' ? '<span class="zlog-tag cyan">❄️ ' + s.temp + '</span>' : '<span style="color:#94a3b8;">Ambient</span>') + '</td>',
          '  <td style="color:#16a34a;font-weight:600;">' + s.battery + '</td>',
          '  <td style="color:#2563eb;font-weight:700;">' + s.eta + '</td>',
          '</tr>'
        ].join('');
      }).join(''),
      '        </tbody>',
      '      </table>',
      '    </div>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderSixtyMinuteDelivery() {
    return [
      '<div class="zlog-kpi-grid">',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Avg Doorstep Speed</span><span class="zlog-kpi-icon">⏱️</span></div><div class="zlog-kpi-val">36.2 mins</div><div class="zlog-kpi-bottom"><span class="zlog-delta up">↑ Target &lt; 60m</span><span class="zlog-subtext">Order placement to OTP</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Rapid SLA Compliance</span><span class="zlog-kpi-icon">⚡</span></div><div class="zlog-kpi-val">98.1%</div><div class="zlog-kpi-bottom"><span class="zlog-delta up">↑ +1.2% MoM</span><span class="zlog-subtext">Delivered &lt; 60 mins</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Pick & Pack Velocity</span><span class="zlog-kpi-icon">📦</span></div><div class="zlog-kpi-val">7.2 mins</div><div class="zlog-kpi-bottom"><span class="zlog-delta up">↑ Ultra-fast</span><span class="zlog-subtext">Dark store bag-ready</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">60-Min Volume</span><span class="zlog-kpi-icon">🚀</span></div><div class="zlog-kpi-val">604 Orders</div><div class="zlog-kpi-bottom"><span class="zlog-delta up">↑ 62.4% total mix</span><span class="zlog-subtext">Highest pet parent retention</span></div></div>',
      '</div>',

      '<div class="zlog-card">',
      '  <div class="zlog-card-head">',
      '    <div>',
      '      <h3 class="zlog-card-title">Micro-Hub 60-Minute Performance Benchmark</h3>',
      '      <p class="zlog-card-sub">Fulfillment speed, dispatch velocity, and breach prevention across urban dark stores</p>',
      '    </div>',
      '  </div>',
      '  <div class="zlog-table-wrap">',
      '    <table class="zlog-table">',
      '      <thead><tr><th>Hub Location</th><th>City</th><th>60M Orders</th><th>Avg Doorstep Time</th><th>Pack Time</th><th>Breaches</th><th>SLA Compliance</th><th>Active EV Pool</th></tr></thead>',
      '      <tbody>',
      HUBS_60M.map(function (h) {
        return [
          '<tr>',
          '  <td style="font-weight:700;color:#0f172a;">' + h.hub + '</td>',
          '  <td style="color:#64748b;">' + h.city + '</td>',
          '  <td style="font-weight:600;font-family:monospace;">' + h.orders60m + '</td>',
          '  <td style="color:#2563eb;font-weight:700;font-family:monospace;">' + h.avgFulfillment + '</td>',
          '  <td style="font-family:monospace;color:#475569;">' + h.dispatchTime + '</td>',
          '  <td style="color:' + (h.breachCount > 2 ? '#dc2626' : '#64748b') + ';font-weight:600;">' + h.breachCount + '</td>',
          '  <td style="color:#16a34a;font-weight:700;font-family:monospace;">' + h.slaCompliance + '</td>',
          '  <td style="color:#0284c7;font-weight:600;">' + h.peakCapacity + '</td>',
          '</tr>'
        ].join('');
      }).join(''),
      '      </tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderDeliverySLA() {
    return [
      '<div class="zlog-kpi-grid">',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Overall SLA Rate</span><span class="zlog-kpi-icon">🛡️</span></div><div class="zlog-kpi-val">98.4%</div><div class="zlog-kpi-bottom"><span class="zlog-delta up">↑ +0.9% MoM</span><span class="zlog-subtext">Target: 95.0%</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Cold-Chain SLA</span><span class="zlog-kpi-icon">❄️</span></div><div class="zlog-kpi-val">99.9%</div><div class="zlog-kpi-bottom"><span class="zlog-delta up">↑ Zero spoilage</span><span class="zlog-subtext">Constant 2-8°C integrity</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">First Attempt SLA</span><span class="zlog-kpi-icon">🎯</span></div><div class="zlog-kpi-val">99.1%</div><div class="zlog-kpi-bottom"><span class="zlog-delta up">↑ +0.3% MoM</span><span class="zlog-subtext">Doorstep OTP success</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Total Breaches (MTD)</span><span class="zlog-kpi-icon">📉</span></div><div class="zlog-kpi-val">57 Breaches</div><div class="zlog-kpi-bottom"><span class="zlog-delta up">↑ -18.2% vs last mo</span><span class="zlog-subtext">26,630 total orders</span></div></div>',
      '</div>',

      '<div class="zlog-card">',
      '  <div class="zlog-card-head">',
      '    <div>',
      '      <h3 class="zlog-card-title">Delivery Tier SLA Adherence Matrix</h3>',
      '      <p class="zlog-card-sub">Contractual targets, actual speed metrics, breach counts, and performance status</p>',
      '    </div>',
      '  </div>',
      '  <div class="zlog-table-wrap">',
      '    <table class="zlog-table">',
      '      <thead><tr><th>Delivery Tier</th><th>SLA Target</th><th>Actual Speed</th><th>Monthly Volume</th><th>Total Breaches</th><th>SLA Compliance</th><th>Status</th></tr></thead>',
      '      <tbody>',
      SLA_DATA.map(function (s) {
        return [
          '<tr>',
          '  <td style="font-weight:700;color:#0f172a;">' + s.tier + '</td>',
          '  <td style="color:#64748b;">' + s.target + '</td>',
          '  <td style="color:#2563eb;font-weight:700;font-family:monospace;">' + s.actual + '</td>',
          '  <td style="font-weight:600;font-family:monospace;">' + s.volume + '</td>',
          '  <td style="color:' + (s.breaches > 20 ? '#dc2626' : '#475569') + ';font-weight:600;">' + s.breaches + '</td>',
          '  <td style="color:#16a34a;font-weight:700;font-family:monospace;">' + s.compliance + '</td>',
          '  <td><span class="zlog-tag ' + (s.status === 'World Class' ? 'blue' : 'green') + '">' + s.status + '</span></td>',
          '</tr>'
        ].join('');
      }).join(''),
      '      </tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderDeliveryCost() {
    return [
      '<div class="zlog-kpi-grid">',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Blended Cost / Drop</span><span class="zlog-kpi-icon">💰</span></div><div class="zlog-kpi-val">₹41.90</div><div class="zlog-kpi-bottom"><span class="zlog-delta up">↑ -₹4.20 MoM</span><span class="zlog-subtext">Target &lt; ₹45.00</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Internal EV Fleet Cost</span><span class="zlog-kpi-icon">⚡</span></div><div class="zlog-kpi-val">₹38.20</div><div class="zlog-kpi-bottom"><span class="zlog-delta up">↑ 18% cheaper</span><span class="zlog-subtext">Own electric fleet</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">3PL Partner Cost</span><span class="zlog-kpi-icon">🛵</span></div><div class="zlog-kpi-val">₹46.80</div><div class="zlog-kpi-bottom"><span class="zlog-delta neutral">• Flex on-demand</span><span class="zlog-subtext">Peak overflow fulfillment</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Monthly Fleet Spend</span><span class="zlog-kpi-icon">📉</span></div><div class="zlog-kpi-val">₹11.15 L</div><div class="zlog-kpi-bottom"><span class="zlog-delta up">↑ -8.4% vs Budget</span><span class="zlog-subtext">26,600 deliveries</span></div></div>',
      '</div>',

      '<div class="zlog-card">',
      '  <div class="zlog-card-head">',
      '    <div>',
      '      <h3 class="zlog-card-title">Delivery Cost Component Breakdown</h3>',
      '      <p class="zlog-card-sub">Per-drop line item analysis: Internal EV Fleet vs Partner 3PL comparison</p>',
      '    </div>',
      '  </div>',
      '  <div class="zlog-table-wrap">',
      '    <table class="zlog-table">',
      '      <thead><tr><th>Cost Component</th><th>Internal EV Fleet</th><th>Partner 3PL</th><th>Variance (EV Advantage)</th><th>Share of Cost</th></tr></thead>',
      '      <tbody>',
      COST_DATA.map(function (c) {
        return [
          '<tr>',
          '  <td style="font-weight:700;color:#0f172a;">' + c.component + '</td>',
          '  <td style="color:#16a34a;font-weight:700;font-family:monospace;">' + c.internalEv + '</td>',
          '  <td style="color:#64748b;font-weight:600;font-family:monospace;">' + c.partner3pl + '</td>',
          '  <td style="color:#2563eb;font-weight:600;">' + c.variance + '</td>',
          '  <td style="color:#475569;font-weight:600;">' + c.shareOfCost + '</td>',
          '</tr>'
        ].join('');
      }).join(''),
      '      </tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderFailedDeliveries() {
    return [
      '<div class="zlog-kpi-grid">',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Failed Attempt Rate</span><span class="zlog-kpi-icon">🎯</span></div><div class="zlog-kpi-val">0.8%</div><div class="zlog-kpi-bottom"><span class="zlog-delta up">↑ -0.3% MoM</span><span class="zlog-subtext">Benchmark: 3.5%</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">NDR Recovery Rate</span><span class="zlog-kpi-icon">🔄</span></div><div class="zlog-kpi-val">91.4%</div><div class="zlog-kpi-bottom"><span class="zlog-delta up">↑ +2.1% MoM</span><span class="zlog-subtext">Re-delivered same day</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Return to Origin (RTO)</span><span class="zlog-kpi-icon">📦</span></div><div class="zlog-kpi-val">0.32%</div><div class="zlog-kpi-bottom"><span class="zlog-delta up">↑ Ultra-low</span><span class="zlog-subtext">Only 86 orders / mo</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Avg Re-attempt Speed</span><span class="zlog-kpi-icon">⚡</span></div><div class="zlog-kpi-val">2.2 hrs</div><div class="zlog-kpi-bottom"><span class="zlog-delta up">↑ Same day loop</span><span class="zlog-subtext">Automated WhatsApp bot</span></div></div>',
      '</div>',

      '<div class="zlog-card">',
      '  <div class="zlog-card-head">',
      '    <div>',
      '      <h3 class="zlog-card-title">Failed Delivery Root Cause Diagnostics</h3>',
      '      <p class="zlog-card-sub">Exception classification and automated SOP recovery workflows</p>',
      '    </div>',
      '  </div>',
      '  <div class="zlog-table-wrap">',
      '    <table class="zlog-table">',
      '      <thead><tr><th>Failure Root Cause</th><th>Incidents</th><th>% of Failures</th><th>Automated SOP & Resolution</th><th>RTO Impact</th></tr></thead>',
      '      <tbody>',
      FAILED_CAUSES.map(function (f) {
        return [
          '<tr>',
          '  <td style="font-weight:700;color:#0f172a;">' + f.cause + '</td>',
          '  <td style="font-weight:600;font-family:monospace;">' + f.incidents + '</td>',
          '  <td style="color:#b91c1c;font-weight:700;font-family:monospace;">' + f.pct + '</td>',
          '  <td style="color:#334155;">' + f.avgResolution + '</td>',
          '  <td style="color:#2563eb;font-weight:600;">' + f.rtoImpact + '</td>',
          '</tr>'
        ].join('');
      }).join(''),
      '      </tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderDeliveryPerformance() {
    return [
      '<div class="zlog-kpi-grid">',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Network CSAT Score</span><span class="zlog-kpi-icon">⭐</span></div><div class="zlog-kpi-val">4.92 / 5</div><div class="zlog-kpi-bottom"><span class="zlog-delta up">↑ +0.04 MoM</span><span class="zlog-subtext">Based on 18,400 ratings</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">On-Time Delivery Rate</span><span class="zlog-kpi-icon">⏱️</span></div><div class="zlog-kpi-val">98.8%</div><div class="zlog-kpi-bottom"><span class="zlog-delta up">↑ +0.6% MoM</span><span class="zlog-subtext">Across 76 EV riders</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Avg Fleet Velocity</span><span class="zlog-kpi-icon">⚡</span></div><div class="zlog-kpi-val">26.8 km/h</div><div class="zlog-kpi-bottom"><span class="zlog-delta up">↑ Green eco-speed</span><span class="zlog-subtext">Zero safety incidents</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Cold-Chain Audit Pass</span><span class="zlog-kpi-icon">❄️</span></div><div class="zlog-kpi-val">100%</div><div class="zlog-kpi-bottom"><span class="zlog-delta up">↑ Zero spoilage</span><span class="zlog-subtext">14,800 vaccine drops</span></div></div>',
      '</div>',

      '<div class="zlog-card">',
      '  <div class="zlog-card-head">',
      '    <div>',
      '      <h3 class="zlog-card-title">Top Rider Leaderboard & Performance Scorecards</h3>',
      '      <p class="zlog-card-sub">Rankings based on on-time delivery rates, pet parent feedback, and cold-chain compliance</p>',
      '    </div>',
      '  </div>',
      '  <div class="zlog-table-wrap">',
      '    <table class="zlog-table">',
      '      <thead><tr><th>Rank</th><th>Rider Name</th><th>EV Unit</th><th>Base Hub</th><th>Deliveries (MTD)</th><th>On-Time %</th><th>Avg Speed</th><th>Doorstep CSAT</th><th>Achievement Badge</th></tr></thead>',
      '      <tbody>',
      TOP_RIDERS.map(function (r) {
        return [
          '<tr>',
          '  <td style="font-weight:700;font-size:14px;">' + (r.rank === 1 ? '🥇' : r.rank === 2 ? '🥈' : r.rank === 3 ? '🥉' : '#' + r.rank) + '</td>',
          '  <td style="font-weight:700;color:#0f172a;">' + r.name + '</td>',
          '  <td style="color:#0284c7;font-family:monospace;">' + r.vehicleId + '</td>',
          '  <td style="color:#475569;">' + r.hub + '</td>',
          '  <td style="font-weight:700;font-family:monospace;">' + r.deliveries + '</td>',
          '  <td style="color:#16a34a;font-weight:700;font-family:monospace;">' + r.onTime + '</td>',
          '  <td style="color:#334155;">' + r.avgSpeed + '</td>',
          '  <td style="color:#d97706;font-weight:700;">' + r.csat + '</td>',
          '  <td><span class="zlog-tag yellow">⭐ ' + r.badge + '</span></td>',
          '</tr>'
        ].join('');
      }).join(''),
      '      </tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function wireTabSpecificEvents() {
    // Delivery orders search
    var ordSearch = root.querySelector('#zlog-order-search');
    if (ordSearch) {
      ordSearch.oninput = function () {
        S.searchQuery = ordSearch.value;
        renderTabContent();
        var newInp = root.querySelector('#zlog-order-search');
        if (newInp) {
          newInp.focus();
          newInp.setSelectionRange(newInp.value.length, newInp.value.length);
        }
      };
    }

    // Delivery orders status filter
    var ordStatus = root.querySelector('#zlog-order-status');
    if (ordStatus) {
      ordStatus.onchange = function () {
        S.statusFilter = ordStatus.value;
        renderTabContent();
      };
    }
  }

  /* ── Modals & Actions ─────────────────────────────────────────────── */
  function showDispatchModal() {
    var modal = document.createElement('div');
    modal.className = 'zlog-modal-backdrop';
    modal.innerHTML = [
      '<div class="zlog-modal-box">',
      '  <div class="zlog-modal-head">',
      '    <h3>⚡ Fast Dispatch Emergency Delivery</h3>',
      '    <button type="button" class="zlog-btn-close" id="m-close">✕</button>',
      '  </div>',
      '  <div class="zlog-modal-body">',
      '    <div class="zlog-form-group"><label class="zlog-label">Pet Parent Name & Phone</label><input class="zlog-input" id="m-cname" placeholder="e.g. Shalini Roy (98765-43210)" required></div>',
      '    <div class="zlog-form-group"><label class="zlog-label">Pet Companion (Breed & Urgency)</label><input class="zlog-input" id="m-pet" placeholder="e.g. Beagle (Post-Op Urgent Pain Relief)" required></div>',
      '    <div class="zlog-form-group"><label class="zlog-label">Origin Micro-Hub</label><select class="zlog-select" id="m-hub"><option value="Koramangala Hub (BLR)">Koramangala Hub (BLR)</option><option value="Indiranagar Hub (BLR)">Indiranagar Hub (BLR)</option><option value="Whitefield Hub (BLR)">Whitefield Hub (BLR)</option><option value="Bandra West Hub (BOM)">Bandra West Hub (BOM)</option><option value="Gurugram Hub (DEL)">Gurugram Hub (DEL)</option></select></div>',
      '    <div class="zlog-form-group"><label class="zlog-label">Delivery SLA Tier</label><select class="zlog-select" id="m-tier"><option value="60-Min Express">60-Min Express Guaranteed</option><option value="Scheduled Slot">Scheduled Same-Day Slot</option><option value="Emergency Vet Telehealth">Emergency Vet Telehealth (30m)</option></select></div>',
      '    <div class="zlog-form-group"><label class="zlog-label">Cold-Chain Temperature Requirement</label><select class="zlog-select" id="m-cold"><option value="Ambient">Standard Ambient (Food/Care)</option><option value="3.5°C">Refrigerated Vaccine (2°C - 8°C IoT Box)</option></select></div>',
      '  </div>',
      '  <div class="zlog-modal-foot">',
      '    <button type="button" class="zlog-btn zlog-btn-secondary" id="m-cancel">Cancel</button>',
      '    <button type="button" class="zlog-btn zlog-btn-primary" id="m-save">Dispatch Rider</button>',
      '  </div>',
      '</div>'
    ].join('');
    document.body.appendChild(modal);

    function closeM() { modal.remove(); }
    modal.querySelector('#m-close').onclick = closeM;
    modal.querySelector('#m-cancel').onclick = closeM;
    modal.querySelector('#m-save').onclick = function () {
      var cname = document.getElementById('m-cname').value;
      var pet = document.getElementById('m-pet').value;
      var hub = document.getElementById('m-hub').value;
      var tier = document.getElementById('m-tier').value;
      var cold = document.getElementById('m-cold').value;
      if (!cname || !pet) { alert('Please enter pet parent and pet companion details.'); return; }

      ORDERS.unshift({
        id: 'ORD-DL-' + (9820 + ORDERS.length + 1),
        customer: cname,
        pet: pet,
        hub: hub,
        rider: 'Kiran Kumar (EV-44)',
        items: 'Emergency Rx Medicine Package',
        time: 'Just now',
        eta: '25 mins',
        type: tier,
        temp: cold,
        status: 'In Transit'
      });

      showToast('Fast Dispatch initiated for ' + cname + '! Rider assigned.');
      closeM();
      S.tab = 'delivery-orders';
      render();
    };
  }

  function showTelematicsModal() {
    var modal = document.createElement('div');
    modal.className = 'zlog-modal-backdrop';
    modal.innerHTML = [
      '<div class="zlog-modal-box" style="max-width:540px;">',
      '  <div class="zlog-modal-head">',
      '    <h3>📍 Fleet Telematics & Cold-Chain Radar</h3>',
      '    <button type="button" class="zlog-btn-close" id="m-close">✕</button>',
      '  </div>',
      '  <div class="zlog-modal-body">',
      '    <div style="background:#0f172a;color:#38bdf8;padding:16px;border-radius:10px;font-family:monospace;font-size:12px;margin-bottom:14px;">',
      '      <div>[SYSTEM] IoT Telematics Gateway: CONNECTED</div>',
      '      <div>[GPS] 38 Active EV 2-Wheelers transmitting 1Hz coordinates</div>',
      '      <div>[SENSORS] 14 Bluetooth Cold Boxes reporting 3.2°C - 4.1°C (SAFE)</div>',
      '      <div>[PING] WebSocket latency: 24ms (High Speed 5G)</div>',
      '    </div>',
      '    <p style="font-size:12px;color:#64748b;margin:0 0 10px;">Urban dispatch clusters currently operating at optimal 36.2 min average delivery speed with zero cold-chain deviations.</p>',
      '  </div>',
      '  <div class="zlog-modal-foot">',
      '    <button type="button" class="zlog-btn zlog-btn-primary" id="m-close2">Dismiss Radar</button>',
      '  </div>',
      '</div>'
    ].join('');
    document.body.appendChild(modal);

    modal.querySelector('#m-close').onclick = function () { modal.remove(); };
    modal.querySelector('#m-close2').onclick = function () { modal.remove(); };
  }

  function exportTabCSV() {
    var curMod = MODULES.find(function (m) { return m.id === S.tab; }) || MODULES[0];
    var csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Zenve BI Logistics & Delivery Intelligence Export - " + curMod.label + "\n";
    csvContent += "Export Date: " + new Date().toISOString() + "\n\n";

    if (S.tab === 'delivery-orders') {
      csvContent += "Order ID,Customer,Pet,Hub,Rider,Items,Tier,Cold Chain,Status,ETA\n";
      ORDERS.forEach(function (o) {
        csvContent += [o.id, '"' + o.customer + '"', '"' + o.pet + '"', '"' + o.hub + '"', '"' + o.rider + '"', '"' + o.items + '"', o.type, o.temp, o.status, o.eta].join(',') + "\n";
      });
    } else if (S.tab === 'delivery-partners') {
      csvContent += "Partner Name,Fleet Model,Fleet Size,Active Now,On-Time SLA,Drop Cost,Cold-Chain,CSAT,Status\n";
      PARTNERS.forEach(function (p) {
        csvContent += ['"' + p.name + '"', '"' + p.type + '"', p.fleetSize, p.activeNow, p.onTimeSla, p.avgCost, p.coldChainReady, p.rating, p.status].join(',') + "\n";
      });
    } else {
      csvContent += "Category,Metric,Value,Note\n";
      csvContent += "Logistics Performance,Avg Doorstep Speed,36.2 mins,Across all 14 micro-hubs\n";
      csvContent += "Cold-Chain Integrity,Compliance Rate,99.9%,IoT Bluetooth refrigerated boxes\n";
      csvContent += "Doorstep Success,First Attempt Delivery,99.2%,Doorstep OTP verification\n";
    }

    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "zenve_logistics_" + S.tab + "_report.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
    showToast('Downloaded ' + curMod.label + ' CSV report.');
  }

  /* ── Navigation & Control ─────────────────────────────────────────── */
  function open(tab) {
    closeOthers();
    init();
    if (tab) S.tab = tab;
    S.open = true;
    render();
    root.classList.add('zpanel-open');
    var targetHash = (MODULES.find(function(m){ return m.id === S.tab; }) || {}).hash || '#logistics-dashboard';
    if (window.location.hash !== targetHash) {
      try { history.pushState(null, '', targetHash); } catch (e) { window.location.hash = targetHash; }
    }
  }

  function close() {
    if (root) root.classList.remove('zpanel-open');
    S.open = false;
    var h = window.location.hash;
    if (h.startsWith('#logistics') || h.startsWith('#delivery') || h.startsWith('#60-minute') || h.startsWith('#failed')) {
      try { history.pushState(null, '', window.location.pathname + window.location.search); } catch (e) {}
    }
  }

  function switchTab(tab) {
    if (!tab) return;
    S.tab = tab;
    var targetHash = (MODULES.find(function(m){ return m.id === tab; }) || {}).hash || '#logistics-dashboard';
    if (window.location.hash !== targetHash) {
      try { history.pushState(null, '', targetHash); } catch (e) { window.location.hash = targetHash; }
    }
    render();
  }

  function init() {
    root = document.getElementById('zlog-dashboard-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'zlog-dashboard-root';
      root.className = 'zpanel-root zlog-root';
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
      var txt = item.textContent.trim();
      var tab = tabFromText(txt);

      // Disambiguation for "Delivery Performance" and "60-Minute Delivery"
      // Check if inside Logistics & Delivery section
      if (tab === 'sixty-minute-delivery' || tab === 'delivery-performance') {
        var parentUl = item.closest('ul');
        var groupBtn = parentUl ? parentUl.previousElementSibling : null;
        var groupText = groupBtn ? (groupBtn.textContent || '') : '';
        // If explicitly under Orders & Operations, do not intercept here
        if (groupText.indexOf('Orders & Operations') >= 0 || groupText.indexOf('Orders') >= 0) {
          return;
        }
      }

      if (tab) {
        if (!t.closest('#zlog-dashboard-root')) {
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
    } else if (S.open && !window.location.hash.startsWith('#logistics') && !window.location.hash.startsWith('#delivery') && !window.location.hash.startsWith('#60-minute') && !window.location.hash.startsWith('#failed')) {
      close();
    }
  });

  /* ── Export Global API ────────────────────────────────────────────── */
  window.ZenveLogisticsDashboard = {
    open: open,
    close: close,
    switchTab: switchTab,
    showDispatchModal: showDispatchModal,
    showTelematicsModal: showTelematicsModal,
    exportTabCSV: exportTabCSV
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
