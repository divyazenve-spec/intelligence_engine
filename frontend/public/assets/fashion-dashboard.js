/* =====================================================================
   Zenve BI — Zenve Fashion & Haute Couture Executive Control Center
   Suite (10 Subdomains):
     1. Fashion Dashboard      (#fashion-dashboard / #zenve-fashion)
     2. Fashion Products       (#fashion-products)
     3. Fashion Orders         (#fashion-orders)
     4. Fashion Customers      (#fashion-customers)
     5. Fashion Inventory      (#fashion-inventory)
     6. Fashion Showrooms      (#fashion-showrooms)
     7. Online Fashion Sales   (#online-fashion-sales)
     8. Fashion Revenue        (#fashion-revenue)
     9. Fashion Profitability  (#fashion-profitability)
     10. Fashion Collections   (#fashion-collections)
   ===================================================================== */

(function () {
  'use strict';

  function esc(s) {
    if (s == null) return '';
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ── 10 Subdomains Configuration ─────────────────────────────────── */
  var TABS = [
    { id: 'dashboard',     label: 'Fashion Dashboard',     icon: '🎀', hash: '#fashion-dashboard',     badge: '',    title: 'Zenve Pet Haute Couture & Lifestyle Command Center', sub: 'Bespoke luxury pet apparel, flagship showroom footfalls, online drops, and premium lifestyle unit economics' },
    { id: 'products',      label: 'Fashion Products',      icon: '👗', hash: '#fashion-products',      badge: '',     title: 'Haute Couture Product Line & Sizing Master', sub: 'Bespoke pet apparel catalog, fabric specifications, ergonomic sizing matrices, and retail inventory valuation' },
    { id: 'orders',        label: 'Fashion Orders',        icon: '🛍️', hash: '#fashion-orders',        badge: '',     title: 'Fashion Orders & Tailoring Pipeline', sub: 'Bespoke atelier tailoring queues, showroom styling orders, online drops, and custom monogram fulfillment' },
    { id: 'customers',     label: 'Fashion Customers',     icon: '💎', hash: '#fashion-customers',     badge: '',      title: 'Haute Couture Clientele & Pet Sizing Profiles', sub: 'Exclusive pet fashion client directory, precision ergonomic sizing records, lifetime value, and styling consultation history' },
    { id: 'inventory',     label: 'Fashion Inventory',     icon: '📦', hash: '#fashion-inventory',     badge: '',  title: 'Fashion Stock Allocation & Sizing Matrix', sub: 'Finished pet garments distribution across sizing grids (XS to XXL), raw atelier materials, and showroom stock cover' },
    { id: 'showrooms',     label: 'Fashion Showrooms',     icon: '🛍️', hash: '#fashion-showrooms',     badge: '',    title: 'Flagship Pet Couture Showrooms & Experience Centers', sub: 'Physical boutique performance, in-store trial room conversions, pet footfall, and retail revenue per square foot' },
    { id: 'online-sales',  label: 'Online Fashion Sales',  icon: '📱', hash: '#online-fashion-sales',  badge: '', title: 'Online Fashion E-Commerce & Digital Drops', sub: 'Mobile app luxury storefront, limited-edition drop sell-through, digital 3D sizing guide, and social commerce' },
    { id: 'revenue',       label: 'Fashion Revenue',       icon: '💵', hash: '#fashion-revenue',       badge: '',     title: 'Fashion Revenue Streams & Financial Trajectory', sub: 'Financial performance across apparel lines, seasonal holiday surges, geographic luxury hubs, and channel distribution' },
    { id: 'profitability', label: 'Fashion Profitability', icon: '💎', hash: '#fashion-profitability', badge: '',   title: 'Fashion Margins, COGS & Contribution Profitability', sub: 'Bespoke pet apparel unit economics, artisan atelier labor costs, channel contribution margins, and markdown protection' },
    { id: 'collections',   label: 'Fashion Collections',   icon: '✨', hash: '#fashion-collections',   badge: '',   title: 'Haute Couture Collections & Designer Runway Drops', sub: 'Limited-edition seasonal capsule launches, sell-through velocity, fabric sourcing lead times, and designer portfolios' }
  ];

  /* ── Master Datasets ─────────────────────────────────────────────── */
  var PRODUCTS = [];

  var ORDERS = [];

  var SHOWROOMS = [];

  /* ── State ───────────────────────────────────────────────────────── */
  var S = {
    open: false,
    tab: 'dashboard',
    productCat: 'ALL',
    productSearch: '',
    orderChannel: 'ALL',
    orderSearch: '',
    customerTier: 'ALL',
    customerSearch: ''
  };

  var root = null;

  /* ── Route Resolution ────────────────────────────────────────────── */
  function tabFromHash(hash) {
    if (!hash) return null;
    var h = (hash.startsWith('#') ? hash.slice(1) : hash).toLowerCase();
    if (h.indexOf('report') >= 0 || h.indexOf('alert') >= 0 || h.indexOf('clinic') >= 0 || h.indexOf('pharmacy') >= 0 || h.indexOf('vendor') >= 0 || h.indexOf('procurement') >= 0) {
      return null;
    }
    if (h === 'fashion-dashboard' || h === 'zenve-fashion' || h === 'fashion' || h === 'pet-fashion') return 'dashboard';
    if (h === 'fashion-products' || h === 'fashion-catalog' || h === 'fashion-product') return 'products';
    if (h === 'fashion-orders' || h === 'fashion-order') return 'orders';
    if (h === 'fashion-customers' || h === 'fashion-clients') return 'customers';
    if (h === 'fashion-inventory' || h === 'fashion-stock') return 'inventory';
    if (h === 'fashion-showrooms' || h === 'pet-boutiques' || h === 'showrooms') return 'showrooms';
    if (h === 'online-fashion-sales' || h === 'online-fashion') return 'online-sales';
    if (h === 'fashion-revenue') return 'revenue';
    if (h === 'fashion-profitability' || h === 'fashion-margins') return 'profitability';
    if (h === 'fashion-collections' || h === 'fashion-capsules' || h === 'collections') return 'collections';
    return null;
  }

  function tabFromText(txt) {
    if (!txt) return null;
    var raw = txt.replace(/\s+/g, ' ').trim().toLowerCase();
    if (raw.indexOf('report') >= 0 || raw.indexOf('alert') >= 0 || raw.indexOf('vendor') >= 0 || raw.indexOf('finance') >= 0) return null;

    if (raw === 'fashion dashboard' || raw === 'zenve fashion' || raw === 'pet fashion & lifestyle') return 'dashboard';
    if (raw === 'fashion products') return 'products';
    if (raw === 'fashion orders') return 'orders';
    if (raw === 'fashion customers') return 'customers';
    if (raw === 'fashion inventory') return 'inventory';
    if (raw === 'fashion showrooms') return 'showrooms';
    if (raw === 'online fashion sales' || raw === 'online fashion') return 'online-sales';
    if (raw === 'fashion revenue') return 'revenue';
    if (raw === 'fashion profitability') return 'profitability';
    if (raw === 'fashion collections') return 'collections';
    return null;
  }

  /* ── KPI Helper ──────────────────────────────────────────────────── */
  function kpiHtml(label, val, delta, trend, subtext, icon) {
    return [
      '<div class="zfsh-kpi">',
        '<div class="zfsh-kpi-top">',
          '<span class="zfsh-kpi-label">' + esc(label) + '</span>',
          '<span class="zfsh-kpi-icon">' + esc(icon || '🎀') + '</span>',
        '</div>',
        '<div class="zfsh-kpi-val">' + esc(val) + '</div>',
        '<div class="zfsh-kpi-bottom">',
          '<span class="zfsh-delta ' + (trend === 'up' ? 'up' : trend === 'down' ? 'down' : 'warn') + '">' + (trend === 'up' ? '↑ ' : trend === 'down' ? '↓ ' : '• ') + esc(delta) + '</span>',
          '<span class="zfsh-subtext">' + esc(subtext) + '</span>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Render Subdomains ───────────────────────────────────────────── */
  function renderDashboard() {
    return [
      '<div class="zfsh-kpi-grid">',
        kpiHtml('Fashion Gross Revenue (MTD)', '₹14.25 L', '+34.8% MoM', 'up', 'Combined online & boutique', '🎀'),
        kpiHtml('Apparel Units Sold', '730 Items', '+22.4% vs last month', 'up', 'Average 2.4 items/cart', '👗'),
        kpiHtml('Blended Gross Margin', '68.2%', '+3.1% YoY', 'up', 'High atelier contribution', '💎'),
        kpiHtml('Flagship Showroom Footfall', '1,640 Visitors', '+18.5% conversion', 'up', 'BLR & MUM Boutiques', '🛍️'),
        kpiHtml('Bespoke Atelier Orders', '64 Custom', 'Fit guarantee 100%', 'up', 'Handcrafted tailored fit', '✂️'),
        kpiHtml('Return & Exchange Rate', '3.1%', '-1.4% improvement', 'up', 'Precision 3D pet sizing', '📐'),
      '</div>',

      '<div class="zfsh-grid-2">',
        '<div class="zfsh-card">',
          '<div class="zfsh-card-head">',
            '<div>',
              '<h3 class="zfsh-card-title">👗 Best-Selling Pet Couture Lines</h3>',
              '<p class="zfsh-card-sub">Top apparel velocity across Italian leather, rainwear, and cashmere knits</p>',
            '</div>',
            '<button class="zfsh-btn primary" onclick="ZenveFashionDashboard.showAddStyleModal()">+ Add Style</button>',
          '</div>',
          '<div class="zfsh-table-wrap">',
            '<table class="zfsh-table">',
              '<thead><tr><th>SKU</th><th>Product Name</th><th>Category</th><th>Retail Price</th><th>Stock</th><th>Margin</th><th>Status</th></tr></thead>',
              '<tbody>',
                PRODUCTS.slice(0, 5).map(function (p) {
                  return '<tr>' +
                    '<td style="font-family:monospace;color:#f472b6;font-size:11px;">' + esc(p.sku) + '</td>' +
                    '<td style="font-weight:600;color:var(--foreground,#0f172a);">' + esc(p.name) + '</td>' +
                    '<td style="color:var(--muted-foreground,#64748b);">' + esc(p.cat) + '</td>' +
                    '<td style="font-family:monospace;font-weight:700;color:#34d399;">' + esc(p.price) + '</td>' +
                    '<td style="color:var(--foreground,#334155);">' + esc(p.stock) + '</td>' +
                    '<td style="font-weight:700;color:#a78bfa;">' + esc(p.margin) + '</td>' +
                    '<td><span class="zfsh-tag green">' + esc(p.status) + '</span></td>' +
                  '</tr>';
                }).join(''),
              '</tbody>',
            '</table>',
          '</div>',
        '</div>',

        '<div class="zfsh-card">',
          '<div class="zfsh-card-head">',
            '<div>',
              '<h3 class="zfsh-card-title">🛍️ Flagship Boutique Experience Metrics</h3>',
              '<p class="zfsh-card-sub">Footfall, trial room conversions, and average order value</p>',
            '</div>',
            '<button class="zfsh-btn" onclick="ZenveFashionDashboard.switchTab(\'showrooms\')">All Boutiques</button>',
          '</div>',
          '<div style="display:grid;gap:12px;">',
            SHOWROOMS.map(function (s) {
              return '<div style="background:rgba(0,0,0,0.22);border:1px solid rgba(255,255,255,0.06);border-radius:10px;padding:14px;">' +
                '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">' +
                  '<strong style="font-size:13px;color:var(--foreground,#0f172a);">' + esc(s.name) + '</strong>' +
                  '<span style="padding:2px 7px;border-radius:4px;font-size:10px;font-weight:700;background:rgba(251,191,36,0.15);color:#fbbf24;">' + esc(s.rating) + '</span>' +
                '</div>' +
                '<div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:6px;font-size:11px;">' +
                  '<div><span style="color:#64748b;">Footfall:</span> <strong style="color:var(--foreground,#334155);">' + esc(s.footfall) + '</strong></div>' +
                  '<div><span style="color:#64748b;">Sales:</span> <strong style="color:#34d399;font-family:monospace;">' + esc(s.sales) + '</strong></div>' +
                  '<div><span style="color:#64748b;">Conversion:</span> <strong style="color:#38bdf8;">' + esc(s.conversion) + '</strong></div>' +
                '</div>' +
              '</div>';
            }).join(''),
          '</div>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderProducts() {
    return [
      '<div class="zfsh-kpi-grid">',
        kpiHtml('Active Fashion SKUs', '142 Styles', '6 Core Categories', 'up', 'Bespoke + Ready-to-wear', '👗'),
        kpiHtml('Avg. Retail Price (ASP)', '₹2,240', '+12.4% YoY', 'up', 'Premium fabric upgrade', '🏷️'),
        kpiHtml('Average Product Margin', '69.4%', '+2.8% vs FY25', 'up', 'In-house artisan atelier', '💎'),
        kpiHtml('Eco-Certified Fabrics', '100% Cotton/Wool', 'OEKO-TEX Class 1', 'up', 'Hypoallergenic pet-safe', '🌱'),
        kpiHtml('Low Stock Styles', '4 SKUs', 'Under 30 days cover', 'warn', 'Production run ordered', '⚠️'),
        kpiHtml('Custom Atelier Queue', '34 Orders', '7-day tailoring TAT', 'up', 'Wedding & gala apparel', '✂️'),
      '</div>',

      '<div class="zfsh-card">',
        '<div class="zfsh-card-head">',
          '<div>',
            '<h3 class="zfsh-card-title">👗 Pet Fashion Master Catalog</h3>',
            '<p class="zfsh-card-sub">Fabrics, ergonomic cut specifications, and production unit economics</p>',
          '</div>',
          '<button class="zfsh-btn primary" onclick="ZenveFashionDashboard.showAddStyleModal()">+ Add New Style</button>',
        '</div>',

        '<div class="zfsh-table-wrap">',
          '<table class="zfsh-table">',
            '<thead><tr><th>SKU</th><th>Product Name</th><th>Category</th><th>Target Pet</th><th>Sizes</th><th>Price</th><th>Cost</th><th>Stock</th><th>Margin</th><th>Status</th></tr></thead>',
            '<tbody>',
              PRODUCTS.map(function (p) {
                return '<tr>' +
                  '<td style="font-family:monospace;color:#f472b6;font-size:11px;">' + esc(p.sku) + '</td>' +
                  '<td style="font-weight:600;color:var(--foreground,#0f172a);">' + esc(p.name) + '</td>' +
                  '<td style="color:var(--muted-foreground,#64748b);">' + esc(p.cat) + '</td>' +
                  '<td style="color:var(--foreground,#334155);">' + esc(p.petType) + '</td>' +
                  '<td style="color:#a78bfa;">' + esc(p.sizes) + '</td>' +
                  '<td style="font-family:monospace;font-weight:700;color:#34d399;">' + esc(p.price) + '</td>' +
                  '<td style="color:#64748b;">' + esc(p.cost) + '</td>' +
                  '<td style="color:var(--foreground,#0f172a);font-weight:600;">' + esc(p.stock) + '</td>' +
                  '<td style="font-weight:700;color:#a78bfa;">' + esc(p.margin) + '</td>' +
                  '<td><span class="zfsh-tag ' + (p.status === 'In Stock' ? 'green' : 'amber') + '">' + esc(p.status) + '</span></td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderOrders() {
    return [
      '<div class="zfsh-kpi-grid">',
        kpiHtml('Fashion Orders (MTD)', '730 Orders', '+24.6% MoM', 'up', 'Showroom & e-commerce', '🛍️'),
        kpiHtml('Average Order Value', '₹3,420', '+₹380 vs FY25', 'up', 'Bundled collar & harness', '💳'),
        kpiHtml('Monogram Customization', '48.5%', '354 personalized items', 'up', 'Custom name embroidery', '✨'),
        kpiHtml('In-Store Trial Conversion', '76.2%', '+4.1% conversion', 'up', 'Pet dressing rooms', '🐕'),
        kpiHtml('Atelier Turnaround (TAT)', '4.8 Days', '-1.2d faster', 'up', 'Bespoke made-to-measure', '⏱️'),
        kpiHtml('On-Time Delivery Rate', '98.8%', 'Zero transit damage', 'up', 'Luxury packaging', '📦'),
      '</div>',

      '<div class="zfsh-card">',
        '<div class="zfsh-card-head">',
          '<div>',
            '<h3 class="zfsh-card-title">🛍️ Real-Time Fashion Order Stream</h3>',
            '<p class="zfsh-card-sub">Omnichannel pet fashion orders, custom monogramming details, and fulfillment statuses</p>',
          '</div>',
          '<button class="zfsh-btn primary" onclick="ZenveFashionDashboard.showBespokeOrderModal()">+ Bespoke Order</button>',
        '</div>',

        '<div class="zfsh-table-wrap">',
          '<table class="zfsh-table">',
            '<thead><tr><th>Order ID</th><th>Pet Parent & Pet</th><th>Items Ordered</th><th>Channel</th><th>Custom Details</th><th>Value</th><th>Date</th><th>Payment</th><th>Status</th></tr></thead>',
            '<tbody>',
              ORDERS.map(function (o) {
                return '<tr>' +
                  '<td style="font-family:monospace;color:#f472b6;font-size:11px;font-weight:600;">' + esc(o.orderId) + '</td>' +
                  '<td style="color:var(--foreground,#0f172a);font-weight:600;">' + esc(o.customer) + '<br/><span style="font-size:11px;color:#38bdf8;">' + esc(o.pet) + '</span></td>' +
                  '<td style="color:var(--foreground,#334155);">' + esc(o.items) + '</td>' +
                  '<td style="color:var(--muted-foreground,#64748b);">' + esc(o.channel) + '</td>' +
                  '<td style="color:#a78bfa;font-size:11px;">' + esc(o.customDetails) + '</td>' +
                  '<td style="font-family:monospace;font-weight:700;color:#34d399;">' + esc(o.value) + '</td>' +
                  '<td style="color:#64748b;font-size:11px;">' + esc(o.date) + '</td>' +
                  '<td style="color:var(--foreground,#334155);">' + esc(o.payment) + '</td>' +
                  '<td><span class="zfsh-tag ' + (o.status === 'Delivered' ? 'green' : o.status === 'Dispatched' ? 'blue' : 'pink') + '">' + esc(o.status) + '</span></td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderCustomers() {
    var vips = [
      { id: 'CUST-FSH-01', name: 'Natasha Poonawalla', pet: 'Princess & Chloe', breed: 'Maltipoo', ltv: '₹84,500', orders: 18, tier: 'Platinum Atelier' },
      { id: 'CUST-FSH-02', name: 'Vikramaditya Singhania', pet: 'Simba', breed: 'Golden Retriever', ltv: '₹62,400', orders: 12, tier: 'Platinum Atelier' },
      { id: 'CUST-FSH-03', name: 'Ananya Deshmukh', pet: 'Koko', breed: 'French Bulldog', ltv: '₹48,900', orders: 9, tier: 'Gold Couture' },
      { id: 'CUST-FSH-04', name: 'Kunal Kapoor', pet: 'Diesel', breed: 'Doberman', ltv: '₹41,200', orders: 8, tier: 'Gold Couture' }
    ];

    return [
      '<div class="zfsh-kpi-grid">',
        kpiHtml('Total Couture Clients', '1,840 Parents', '+16.4% YoY', 'up', 'Registered size profiles', '👥'),
        kpiHtml('Average Client LTV', '₹38,200', '+₹4,800 vs FY25', 'up', 'Across apparel & accessories', '💎'),
        kpiHtml('Repeat Purchase Rate', '64.8%', '+5.2% MoM', 'up', 'Seasonal capsule drops', '🔄'),
        kpiHtml('Platinum VIP Members', '142 Clients', 'Spend > ₹50,000/yr', 'up', 'Bespoke atelier priority', '👑'),
        kpiHtml('Personal Stylist Bookings', '88 Sessions', '94% satisfaction', 'up', 'In-showroom fittings', '✂️'),
        kpiHtml('Pet Sizing Accuracy', '98.9%', 'Precision 3D guide', 'up', 'Virtually zero fit returns', '📐'),
      '</div>',

      '<div class="zfsh-card">',
        '<div class="zfsh-card-head">',
          '<div>',
            '<h3 class="zfsh-card-title">👑 VIP Pet Couture Clientele Roster</h3>',
            '<p class="zfsh-card-sub">Client measurement profiles, styling preferences, and lifetime luxury volume</p>',
          '</div>',
          '<button class="zfsh-btn primary" onclick="alert(\'Booking VIP private stylist consultation lounge session...\')">✨ Book Styling</button>',
        '</div>',

        '<div class="zfsh-table-wrap">',
          '<table class="zfsh-table">',
            '<thead><tr><th>Client ID</th><th>Pet Parent</th><th>Pet & Breed</th><th>Total LTV</th><th>Orders</th><th>VIP Tier</th><th>Action</th></tr></thead>',
            '<tbody>',
              vips.map(function (v) {
                return '<tr>' +
                  '<td style="font-family:monospace;color:#f472b6;font-size:11px;">' + esc(v.id) + '</td>' +
                  '<td style="font-weight:600;color:var(--foreground,#0f172a);">' + esc(v.name) + '</td>' +
                  '<td style="color:var(--foreground,#334155);">' + esc(v.pet) + ' (' + esc(v.breed) + ')</td>' +
                  '<td style="font-family:monospace;font-weight:700;color:#34d399;">' + esc(v.ltv) + '</td>' +
                  '<td style="color:var(--foreground,#334155);">' + esc(v.orders) + ' orders</td>' +
                  '<td><span class="zfsh-tag ' + (v.tier === 'Platinum Atelier' ? 'pink' : 'amber') + '">' + esc(v.tier) + '</span></td>' +
                  '<td><button class="zfsh-btn" style="height:26px;padding:2px 8px;font-size:11px;" onclick="alert(\'Opening 3D sizing profile for ' + esc(v.pet) + '.\')">View Measurements</button></td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderInventory() {
    return [
      '<div class="zfsh-kpi-grid">',
        kpiHtml('Finished Apparel Valuation', '₹33.15 L', '1,746 Units', 'up', 'Across all 3 locations', '💎'),
        kpiHtml('Raw Fabric Inventory', '₹8.40 L', 'Premium certified rolls', 'up', 'Italian leather & cashmere', '🧵'),
        kpiHtml('Sizing Completeness Rate', '94.2%', 'XS - XXL coverage', 'up', 'Zero stockouts on core sizes', '📐'),
        kpiHtml('Low Stock Styles (<20u)', '2 Styles', 'Knit & Boots', 'warn', 'Replenishment in progress', '⚠️'),
        kpiHtml('Showroom Display Stock', '₹11.20 L', 'Bandra + Indiranagar', 'up', 'Trial room samples', '🛍️'),
        kpiHtml('Inventory Turnover Ratio', '4.6x', '+0.8x vs FY25', 'up', 'Rapid fashion cycles', '⚡'),
      '</div>',

      '<div class="zfsh-card">',
        '<div class="zfsh-card-head">',
          '<div>',
            '<h3 class="zfsh-card-title">📦 Finished Garment Stock by Size Breakdown</h3>',
            '<p class="zfsh-card-sub">Unit distribution across sizing runs XS to XXL and hub locations</p>',
          '</div>',
          '<button class="zfsh-btn" onclick="alert(\'Rebalance stock requested across Mumbai and Bengaluru hubs.\')">🔄 Rebalance Stock</button>',
        '</div>',

        '<div class="zfsh-table-wrap">',
          '<table class="zfsh-table">',
            '<thead><tr><th>SKU Code</th><th>Product Name</th><th>Category</th><th>XS</th><th>S</th><th>M</th><th>L</th><th>XL</th><th>Total Stock</th><th>Valuation</th><th>Status</th></tr></thead>',
            '<tbody>',
              PRODUCTS.map(function (p) {
                return '<tr>' +
                  '<td style="font-family:monospace;color:#f472b6;font-size:11px;">' + esc(p.sku) + '</td>' +
                  '<td style="font-weight:600;color:var(--foreground,#0f172a);">' + esc(p.name) + '</td>' +
                  '<td style="color:var(--muted-foreground,#64748b);">' + esc(p.cat) + '</td>' +
                  '<td style="color:var(--foreground,#334155);">15</td><td style="color:var(--foreground,#334155);">40</td><td style="color:var(--foreground,#334155);">60</td><td style="color:var(--foreground,#334155);">45</td><td style="color:var(--foreground,#334155);">24</td>' +
                  '<td style="font-weight:700;color:var(--foreground,#0f172a);">' + esc(p.stock) + '</td>' +
                  '<td style="font-family:monospace;font-weight:700;color:#34d399;">₹' + (p.stock * 2200).toLocaleString('en-IN') + '</td>' +
                  '<td><span class="zfsh-tag ' + (p.status === 'In Stock' ? 'green' : 'amber') + '">' + esc(p.status) + '</span></td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderShowrooms() {
    return [
      '<div class="zfsh-kpi-grid">',
        kpiHtml('Showroom Revenue (MTD)', '₹17.10 L', '+26.8% YoY', 'up', 'Across all 4 experience centers', '🛍️'),
        kpiHtml('Pet Footfall (MTD)', '1,950 Pets', '+18.2% vs last month', 'up', 'In-store visits with parents', '🐾'),
        kpiHtml('Dressing Room Trials', '1,297 Trials', '66.5% trial-to-buy rate', 'up', 'Fitting room conversion', '👗'),
        kpiHtml('Avg. Revenue per Sq Ft', '₹272 / sqft', '+₹34 vs industry', 'up', 'Premium retail density', '📐'),
        kpiHtml('On-Spot Customization', '284 Orders', 'Hot-foil monogramming', 'up', 'Atelier personalization', '✨'),
        kpiHtml('Showroom Client Rating', '4.86 ★', 'Based on 480 reviews', 'up', '5-star pet luxury standard', '⭐'),
      '</div>',

      '<div class="zfsh-card">',
        '<div class="zfsh-card-head">',
          '<div>',
            '<h3 class="zfsh-card-title">🛍️ Showroom Performance Matrix</h3>',
            '<p class="zfsh-card-sub">Footfall conversion, sales volume, and retail square footage efficiency</p>',
          '</div>',
          '<button class="zfsh-btn primary" onclick="alert(\'Opening Boutique Event & Masterclass Scheduling Portal...\')">✨ VIP Boutique Event</button>',
        '</div>',

        '<div class="zfsh-table-wrap">',
          '<table class="zfsh-table">',
            '<thead><tr><th>ID</th><th>Showroom Name</th><th>City & Hub Area</th><th>Sq. Ft</th><th>Pet Footfall</th><th>Trials</th><th>Sales MTD</th><th>Rev / Sq Ft</th><th>Conversion</th><th>Avg Ticket</th><th>Rating</th></tr></thead>',
            '<tbody>',
              SHOWROOMS.map(function (s) {
                return '<tr>' +
                  '<td style="font-family:monospace;color:#f472b6;font-size:11px;">' + esc(s.id) + '</td>' +
                  '<td style="font-weight:600;color:var(--foreground,#0f172a);">' + esc(s.name) + '</td>' +
                  '<td style="color:var(--foreground,#334155);">' + esc(s.area) + ', ' + esc(s.city) + '</td>' +
                  '<td style="color:var(--muted-foreground,#64748b);">' + esc(s.sqft) + ' sqft</td>' +
                  '<td style="color:var(--foreground,#0f172a);font-weight:600;">' + esc(s.footfall) + '</td>' +
                  '<td style="color:#a78bfa;">' + esc(s.trials) + '</td>' +
                  '<td style="font-family:monospace;font-weight:700;color:#34d399;">' + esc(s.sales) + '</td>' +
                  '<td style="color:#38bdf8;font-weight:600;">' + esc(s.revPerSqft) + '</td>' +
                  '<td style="color:#34d399;font-weight:700;">' + esc(s.conversion) + '</td>' +
                  '<td style="color:var(--foreground,#334155);">' + esc(s.avgTicket) + '</td>' +
                  '<td><span class="zfsh-tag amber">' + esc(s.rating) + '</span></td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderOnlineSales() {
    return [
      '<div class="zfsh-kpi-grid">',
        kpiHtml('Online Fashion Revenue', '₹28.42 L', '+38.2% YoY', 'up', 'iOS, Android & Social Shop', '📱'),
        kpiHtml('Online Orders (MTD)', '836 Orders', '+21.5% MoM', 'up', 'Average 1.8 items per cart', '🛍️'),
        kpiHtml('Average Online AOV', '₹3,399', '+₹420 vs FY25', 'up', 'Accessory add-on bundle', '💳'),
        kpiHtml('E-Commerce Conversion', '3.02%', '+0.45% MoM', 'up', 'Industry benchmark 1.8%', '⚡'),
        kpiHtml('3D AI Pet Sizing Assist', '78.4% Adoption', '3,210 scans completed', 'up', 'Camera dimension scan', '📐'),
        kpiHtml('60-Min Rush Delivery', '42.8% of Orders', 'Metro hub express', 'up', 'Same-day party wear', '🚀'),
      '</div>',

      '<div class="zfsh-card">',
        '<div class="zfsh-card-head">',
          '<div>',
            '<h3 class="zfsh-card-title">📱 Digital Channel Sales & Mobile Performance</h3>',
            '<p class="zfsh-card-sub">Conversion rates, checkout volume, and revenue by digital sales channel</p>',
          '</div>',
          '<button class="zfsh-btn primary" onclick="alert(\'Push notification scheduled for flash fashion drop!\')">📢 Flash Drop Push</button>',
        '</div>',

        '<div class="zfsh-table-wrap">',
          '<table class="zfsh-table">',
            '<thead><tr><th>Channel Platform</th><th>Sessions</th><th>Orders</th><th>Conversion %</th><th>AOV</th><th>Revenue</th><th>Share</th></tr></thead>',
            '<tbody>',
              [
                { ch: 'Zenve iOS Luxury App', sess: '48,200', ord: 342, conv: '3.42%', aov: '₹3,840', rev: '₹13,13,280', share: '46.2%' },
                { ch: 'Zenve Android App', sess: '36,500', ord: 254, conv: '2.85%', aov: '₹3,120', rev: '₹7,92,480', share: '27.9%' },
                { ch: 'Mobile Responsive Web', sess: '22,400', ord: 118, conv: '2.10%', aov: '₹2,680', rev: '₹3,16,240', share: '11.1%' },
                { ch: 'Instagram Shop & Social Drops', sess: '18,900', ord: 122, conv: '2.95%', aov: '₹3,450', rev: '₹4,20,900', share: '14.8%' }
              ].map(function (c) {
                return '<tr>' +
                  '<td style="font-weight:600;color:var(--foreground,#0f172a);">' + esc(c.ch) + '</td>' +
                  '<td style="color:var(--foreground,#334155);">' + esc(c.sess) + '</td>' +
                  '<td style="color:var(--foreground,#0f172a);font-weight:600;">' + esc(c.ord) + '</td>' +
                  '<td style="color:#38bdf8;font-weight:700;">' + esc(c.conv) + '</td>' +
                  '<td style="color:var(--foreground,#334155);">' + esc(c.aov) + '</td>' +
                  '<td style="font-family:monospace;font-weight:700;color:#34d399;">' + esc(c.rev) + '</td>' +
                  '<td style="color:#a78bfa;font-weight:700;">' + esc(c.share) + '</td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderRevenue() {
    return [
      '<div class="zfsh-kpi-grid">',
        kpiHtml('Fashion Gross Revenue (FYTD)', '₹45.50 L', '+36.4% YoY', 'up', '7 months financial actuals', '💵'),
        kpiHtml('Monthly Revenue Run-Rate', '₹7.20 L / Mo', '+28.5% vs FY25', 'up', 'Accelerating into Q3', '📈'),
        kpiHtml('Showroom vs Online Mix', '58% : 42%', 'Healthy omnichannel', 'neutral', 'Boutiques driving high AOV', '⚖️'),
        kpiHtml('Festive Season Surge', '+64.2%', 'Diwali & wedding peak', 'up', 'High-margin couture', '✨'),
        kpiHtml('Blended Average Order Value', '₹3,410', '+₹390 YoY', 'up', 'Cross-category basket', '🛒'),
        kpiHtml('Fashion Revenue / Pet Parent', '₹4,890', '+18.2% expansion', 'up', 'Multi-item wardrobe repeat', '💎'),
      '</div>',

      '<div class="zfsh-card">',
        '<h3 class="zfsh-card-title" style="margin-bottom:16px;">💵 Revenue by Product Category</h3>',
        '<div class="zfsh-table-wrap">',
          '<table class="zfsh-table">',
            '<thead><tr><th>Category</th><th>Revenue FYTD</th><th>Share %</th><th>Growth YoY</th><th>Avg Ticket</th></tr></thead>',
            '<tbody>',
              [
                { cat: 'Ergonomic Harnesses & Leashes', rev: '₹14.80 L', share: '32.5%', growth: '+34.2%', aov: '₹3,650' },
                { cat: 'Weatherwear & Monsoon Rainwear', rev: '₹10.90 L', share: '24.0%', growth: '+41.8%', aov: '₹2,920' },
                { cat: 'Formal Wedding & Festive Atelier', rev: '₹8.20 L', share: '18.0%', growth: '+52.4%', aov: '₹4,950' },
                { cat: 'Winter Cashmere & Knits', rev: '₹6.40 L', share: '14.1%', growth: '+28.0%', aov: '₹2,480' },
                { cat: 'Collars, Bandanas & Accessories', rev: '₹5.20 L', share: '11.4%', growth: '+22.6%', aov: '₹1,240' }
              ].map(function (c) {
                return '<tr>' +
                  '<td style="font-weight:600;color:var(--foreground,#0f172a);">' + esc(c.cat) + '</td>' +
                  '<td style="font-family:monospace;font-weight:700;color:#34d399;">' + esc(c.rev) + '</td>' +
                  '<td style="color:#a78bfa;font-weight:600;">' + esc(c.share) + '</td>' +
                  '<td style="color:#34d399;font-weight:700;">' + esc(c.growth) + '</td>' +
                  '<td style="color:var(--foreground,#334155);">' + esc(c.aov) + '</td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderProfitability() {
    return [
      '<div class="zfsh-kpi-grid">',
        kpiHtml('Blended Gross Margin', '68.2%', '+3.1% YoY', 'up', 'Direct atelier sourcing', '💎'),
        kpiHtml('Net Contribution Margin', '55.8%', '+4.2% expansion', 'up', 'After showroom OPEX', '📊'),
        kpiHtml('Full-Price Sell-Through', '94.6%', 'Markdowns < 5.4%', 'up', 'No discount brand equity', '🏷️'),
        kpiHtml('Custom Monogram Margin', '84.5%', '₹450 add-on fee', 'up', 'Artisan laser embroidery', '✨'),
        kpiHtml('Sizing Exchange Cost', '1.8% of Rev', '-0.8% reduction', 'up', 'Precise 3D size fitting', '📐'),
        kpiHtml('Fashion Operating EBITDA', '₹16.80 L', '36.9% EBITDA margin', 'up', 'Highly lucrative luxury line', '⚡'),
      '</div>',

      '<div class="zfsh-card">',
        '<h3 class="zfsh-card-title" style="margin-bottom:16px;">💎 Core Apparel Unit Economics & COGS Breakdown</h3>',
        '<div class="zfsh-table-wrap">',
          '<table class="zfsh-table">',
            '<thead><tr><th>Apparel Item</th><th>Retail ASP</th><th>Fabric</th><th>Artisan Labor</th><th>Hardware</th><th>COGS</th><th>Gross Profit</th><th>Margin</th></tr></thead>',
            '<tbody>',
              PRODUCTS.map(function (p) {
                return '<tr>' +
                  '<td style="font-weight:600;color:var(--foreground,#0f172a);">' + esc(p.name) + '</td>' +
                  '<td style="color:var(--foreground,#334155);">' + esc(p.price) + '</td>' +
                  '<td style="color:var(--muted-foreground,#64748b);">₹580</td><td style="color:var(--muted-foreground,#64748b);">₹320</td><td style="color:var(--muted-foreground,#64748b);">₹190</td>' +
                  '<td style="color:#f87171;">' + esc(p.cost) + '</td>' +
                  '<td style="font-family:monospace;font-weight:700;color:#34d399;">₹' + (parseInt(p.price.replace(/[^\d]/g, '')) - parseInt(p.cost.replace(/[^\d]/g, ''))).toLocaleString('en-IN') + '</td>' +
                  '<td style="font-weight:800;color:#a78bfa;">' + esc(p.margin) + '</td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderCollections() {
    var cols = [
      { id: 'COL-2026-03', name: 'Monsoon Canine Splash Capsule', season: 'Monsoon 2026', styles: 12, sellThrough: '94.2%', rev: '₹8,45,000', designer: 'Aarushi Mehta', status: 'Archive' },
      { id: 'COL-2026-04', name: 'Royal Velvet & Zari Festive Collection', season: 'Festive / Diwali 2026', styles: 18, sellThrough: '82.5%', rev: '₹14,20,000', designer: 'Zoya Qureshi', status: 'Active Drop' },
      { id: 'COL-2026-05', name: 'Alpine Cashmere Winter Luxe', season: 'Winter 2026-27', styles: 14, sellThrough: '48.6%', rev: '₹6,80,000', designer: 'Karan Sen', status: 'Active Drop' },
      { id: 'COL-2026-06', name: 'Bespoke Pet Wedding & Gala Runway', season: 'Annual Signature Line', styles: 8, sellThrough: '91.0%', rev: '₹9,60,000', designer: 'Pravin Varma', status: 'Permanent Line' }
    ];

    return [
      '<div class="zfsh-kpi-grid">',
        kpiHtml('Active Capsule Collections', '3 Live Drops', 'Festive + Winter + Gala', 'up', 'Current retail circulation', '✨'),
        kpiHtml('Avg. Drop Sell-Through', '86.8%', '+5.4% YoY', 'up', 'Zero deadstock policy', '🎯'),
        kpiHtml('Highest Grossing Drop', '₹14.20 L', 'Royal Velvet Festive', 'up', 'Sold out in 22 days', '👑'),
        kpiHtml('Design-to-Rack Lead Time', '28 Days', '-8 days faster', 'up', 'In-house artisan studio', '⏱️'),
        kpiHtml('VIP Pre-Order Conversion', '44.2%', 'Platinum member reserve', 'up', 'Sold prior to public launch', '💎'),
        kpiHtml('Runway Pet Models', '36 Verified', 'Brand ambassador pets', 'up', 'Instagram campaign reach', '📸'),
      '</div>',

      '<div class="zfsh-card">',
        '<div class="zfsh-card-head">',
          '<div>',
            '<h3 class="zfsh-card-title">✨ Seasonal Capsule Collections Portfolio</h3>',
            '<p class="zfsh-card-sub">Limited-edition capsule launches, designer runway series, and sell-through rates</p>',
          '</div>',
          '<button class="zfsh-btn primary" onclick="alert(\'Creating new capsule drop blueprint...\')">✨ Create Capsule Drop</button>',
        '</div>',

        '<div class="zfsh-table-wrap">',
          '<table class="zfsh-table">',
            '<thead><tr><th>Collection ID</th><th>Collection Name</th><th>Season</th><th>Styles</th><th>Sell-Through</th><th>Revenue</th><th>Lead Designer</th><th>Status</th></tr></thead>',
            '<tbody>',
              cols.map(function (c) {
                return '<tr>' +
                  '<td style="font-family:monospace;color:#f472b6;font-size:11px;">' + esc(c.id) + '</td>' +
                  '<td style="font-weight:600;color:var(--foreground,#0f172a);">' + esc(c.name) + '</td>' +
                  '<td style="color:var(--foreground,#334155);">' + esc(c.season) + '</td>' +
                  '<td style="color:var(--muted-foreground,#64748b);">' + esc(c.styles) + ' styles</td>' +
                  '<td style="font-weight:700;color:#34d399;">' + esc(c.sellThrough) + '</td>' +
                  '<td style="font-family:monospace;font-weight:700;color:#38bdf8;">' + esc(c.rev) + '</td>' +
                  '<td style="color:#a78bfa;">' + esc(c.designer) + '</td>' +
                  '<td><span class="zfsh-tag ' + (c.status === 'Active Drop' ? 'green' : 'purple') + '">' + esc(c.status) + '</span></td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Master Render Function ──────────────────────────────────────── */
  function render() {
    if (!root) return;
    var currentTab = TABS.find(function (t) { return t.id === S.tab; }) || TABS[0];

    var html = [
      '<header class="zfsh-head">',
        '<div class="zfsh-head-left">',
          '<div class="zfsh-title-row">',
            '<h1 class="zfsh-title">' + esc(currentTab.title) + '</h1>',
            '<span class="zfsh-live-badge"><span class="zfsh-pulse-dot"></span>' + esc(currentTab.badge) + '</span>',
          '</div>',
          '<p class="zfsh-sub">' + esc(currentTab.sub) + '</p>',
        '</div>',
        '<div class="zfsh-head-actions">',
          '<button class="zfsh-btn" onclick="ZenveFashionDashboard.showBespokeOrderModal()">+ Bespoke Order</button>',
          '<button class="zfsh-btn primary" onclick="ZenveFashionDashboard.showAddStyleModal()">+ New Style</button>',
          '<button class="zfsh-btn" onclick="ZenveFashionDashboard.close()">✕ Close</button>',
        '</div>',
      '</header>',

      '<nav class="zfsh-tabs-bar">',
        TABS.map(function (t) {
          var active = t.id === S.tab ? ' active' : '';
          return '<button class="zfsh-tab' + active + '" onclick="ZenveFashionDashboard.switchTab(\'' + t.id + '\')">' +
            '<span>' + t.icon + '</span>' +
            '<span>' + esc(t.label) + '</span>' +
            '<span class="zfsh-tab-badge">' + esc(t.badge) + '</span>' +
          '</button>';
        }).join(''),
      '</nav>',

      '<main class="zfsh-body">'
    ];

    switch (S.tab) {
      case 'dashboard':     html.push(renderDashboard()); break;
      case 'products':      html.push(renderProducts()); break;
      case 'orders':        html.push(renderOrders()); break;
      case 'customers':     html.push(renderCustomers()); break;
      case 'inventory':     html.push(renderInventory()); break;
      case 'showrooms':     html.push(renderShowrooms()); break;
      case 'online-sales':  html.push(renderOnlineSales()); break;
      case 'revenue':       html.push(renderRevenue()); break;
      case 'profitability': html.push(renderProfitability()); break;
      case 'collections':   html.push(renderCollections()); break;
      default:              html.push(renderDashboard());
    }

    html.push('</main>');
    root.innerHTML = html.join('');
  }

  /* ── Modals & Actions ────────────────────────────────────────────── */
  function showModal(contentHtml) {
    closeModal();
    var backdrop = document.createElement('div');
    backdrop.id = 'zfsh-active-modal';
    backdrop.className = 'zfsh-modal-backdrop';
    backdrop.innerHTML = '<div class="zfsh-modal">' + contentHtml + '</div>';
    backdrop.onclick = function (e) {
      if (e.target === backdrop) closeModal();
    };
    document.body.appendChild(backdrop);
  }

  function closeModal() {
    var existing = document.getElementById('zfsh-active-modal');
    if (existing) existing.remove();
  }

  function showAddStyleModal() {
    var formHtml = [
      '<div class="zfsh-modal-head">',
        '<h3 class="zfsh-modal-title">👗 Add New Fashion Couture Style</h3>',
        '<button class="zfsh-btn" onclick="ZenveFashionDashboard.closeModal()">✕</button>',
      '</div>',
      '<form onsubmit="event.preventDefault(); alert(\'New style added to Zenve Fashion master catalog!\'); ZenveFashionDashboard.closeModal();">',
        '<div class="zfsh-form-group"><label>Product Title</label><input type="text" class="zfsh-input" placeholder="e.g. Royal Brocade Wedding Sherwani" required /></div>',
        '<div class="zfsh-form-row">',
          '<div class="zfsh-form-group"><label>Category</label><select class="zfsh-select"><option>Formal Atelier</option><option>Ergonomic Harnesses</option><option>Weatherwear</option><option>Winter Knits</option><option>Collars & Leashes</option></select></div>',
          '<div class="zfsh-form-group"><label>Target Pet</label><select class="zfsh-select"><option>Dog (All Breeds)</option><option>Dog (Small / Toy)</option><option>Dog (Large)</option><option>Cat</option></select></div>',
        '</div>',
        '<div class="zfsh-form-row">',
          '<div class="zfsh-form-group"><label>Retail ASP (INR)</label><input type="text" class="zfsh-input" placeholder="₹3,450" required /></div>',
          '<div class="zfsh-form-group"><label>Production COGS (INR)</label><input type="text" class="zfsh-input" placeholder="₹980" required /></div>',
        '</div>',
        '<div class="zfsh-form-group"><label>Fabric & Material Spec</label><input type="text" class="zfsh-input" placeholder="e.g. 100% Pure Silk with Zari Embroidery" required /></div>',
        '<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:16px;">',
          '<button type="button" class="zfsh-btn" onclick="ZenveFashionDashboard.closeModal()">Cancel</button>',
          '<button type="submit" class="zfsh-btn primary">Save & Publish</button>',
        '</div>',
      '</form>'
    ].join('');
    showModal(formHtml);
  }

  function showBespokeOrderModal() {
    var formHtml = [
      '<div class="zfsh-modal-head">',
        '<h3 class="zfsh-modal-title">✂️ New Bespoke Measurement Order</h3>',
        '<button class="zfsh-btn" onclick="ZenveFashionDashboard.closeModal()">✕</button>',
      '</div>',
      '<form onsubmit="event.preventDefault(); alert(\'Bespoke order created and routed to atelier master tailor!\'); ZenveFashionDashboard.closeModal();">',
        '<div class="zfsh-form-group"><label>Pet Parent Full Name</label><input type="text" class="zfsh-input" placeholder="e.g. Natasha Poonawalla" required /></div>',
        '<div class="zfsh-form-row">',
          '<div class="zfsh-form-group"><label>Pet Name & Breed</label><input type="text" class="zfsh-input" placeholder="e.g. Princess (Maltipoo)" required /></div>',
          '<div class="zfsh-form-group"><label>Occasion / Event</label><input type="text" class="zfsh-input" placeholder="e.g. Family Wedding / Gala" required /></div>',
        '</div>',
        '<div class="zfsh-form-row">',
          '<div class="zfsh-form-group"><label>Neck Girth (cm)</label><input type="text" class="zfsh-input" placeholder="24 cm" required /></div>',
          '<div class="zfsh-form-group"><label>Chest Girth (cm)</label><input type="text" class="zfsh-input" placeholder="36 cm" required /></div>',
        '</div>',
        '<div class="zfsh-form-group"><label>Custom Monogram / Embroidery Text</label><input type="text" class="zfsh-input" placeholder="e.g. Gold Thread Initial &quot;P&quot;" /></div>',
        '<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:16px;">',
          '<button type="button" class="zfsh-btn" onclick="ZenveFashionDashboard.closeModal()">Cancel</button>',
          '<button type="submit" class="zfsh-btn primary">Submit Atelier Order</button>',
        '</div>',
      '</form>'
    ].join('');
    showModal(formHtml);
  }

  /* ── Open & Close Mechanics ──────────────────────────────────────── */
  function build() {
    root = document.getElementById('zfsh-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'zfsh-root';
      root.className = 'zpanel-root';
      document.body.appendChild(root);
    }
  }

  function open(tab) {
    // Close other domain overlays
    ['zfa-root', 'zmkt-dashboard-root', 'zvp-root', 'zod-root', 'zsd-root', 'zpid-root', 'zph-root', 'zch-root', 'zrep-root', 'zalt-root', 'zset-root', 'zhr-root', 'zsys-root'].forEach(function(id) {
      var el = document.getElementById(id);
      if (el) {
        el.classList.remove('zfa-open', 'zmkt-open', 'zvp-open', 'zod-open', 'zsd-open', 'zpid-open', 'zph-open', 'zch-open', 'zrep-open', 'zalt-open', 'zset-open', 'zhr-open', 'zsys-open', 'zpanel-open');
        el.style.display = 'none';
      }
    });
    if (document.querySelectorAll) {
      document.querySelectorAll('.zpanel-root').forEach(function(el) {
        if (el.id !== 'zfsh-root') {
          el.style.display = 'none';
          el.classList.remove('zfa-open', 'zmkt-open', 'zvp-open', 'zod-open', 'zsd-open', 'zpid-open', 'zph-open', 'zch-open', 'zrep-open', 'zalt-open', 'zset-open', 'zhr-open', 'zsys-open', 'zpanel-open');
        }
      });
    }

    if (tab && TABS.some(function (t) { return t.id === tab; })) {
      S.tab = tab;
    } else if (!S.tab) {
      S.tab = 'dashboard';
    }

    build();
    S.open = true;
    root.style.display = 'block';
    root.classList.add('zfsh-open', 'zpanel-open');
    try {
      document.documentElement.classList.remove('zvp-locked', 'zalt-locked');
      document.body.classList.remove('zvp-locked', 'zalt-locked');
      document.documentElement.classList.add('zfsh-locked');
      document.body.classList.add('zfsh-locked');
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
      root.classList.remove('zfsh-open', 'zpanel-open');
      root.style.display = 'none';
    }
    try {
      document.documentElement.classList.remove('zfsh-locked');
      document.body.classList.remove('zfsh-locked');
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
      var otherDomains = ['sales', 'operations', 'inventory', 'pharmacy', 'clinics', 'doctors', 'reports', 'alerts', 'settings', 'finance', 'marketing', 'vendors', 'procurement'];
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

      var isSidebar = !!el.closest('aside, [class*="sidebar"]') && !el.closest('#zfsh-root');
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
  window.ZenveFashionDashboard = {
    open: open,
    close: close,
    switchTab: switchTab,
    closeModal: closeModal,
    showAddStyleModal: showAddStyleModal,
    showBespokeOrderModal: showBespokeOrderModal
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initInterception);
  } else {
    initInterception();
  }
})();
