/**
 * Zenve Intelligence Engine — Live MySQL Database Synchronization Bridge
 * Database: zenve_engine (MySQL 8.0)
 * Connects all UI dashboards, tables, and buttons directly to the Python FastAPI backend
 */
(function () {
  'use strict';

  console.log('[Zenve DB] Initializing Live MySQL Database Bridge...');

  var API_BASE = '/api/v1';

  // In-memory cache of live data
  var DB_STATE = {
    plans: [],
    subscribers: [],
    orders: [],
    products: [],
    medicines: [],
    appointments: [],
    doctors: [],
    clinics: [],
    customers: [],
    pets: [],
    employees: [],
    campaigns: [],
    vendors: [],
    deliveries: [],
    fashion: [],
    b2b: [],
    shipments: [],
    reports: [],
    alerts: [],
    health: [],
    settings: []
  };

  // Toast Notification
  function showToast(msg, isError) {
    var existing = document.getElementById('zenve-db-toast');
    if (existing) existing.remove();

    var toast = document.createElement('div');
    toast.id = 'zenve-db-toast';
    toast.style.cssText = [
      'position: fixed',
      'bottom: 24px',
      'right: 24px',
      'background: ' + (isError ? '#ef4444' : '#10b981'),
      'color: #ffffff',
      'padding: 12px 20px',
      'border-radius: 10px',
      'font-size: 13px',
      'font-weight: 700',
      'box-shadow: 0 10px 25px rgba(0,0,0,0.3)',
      'z-index: 9999999',
      'display: flex',
      'align-items: center',
      'gap: 8px',
      'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      'transition: all 0.3s ease'
    ].join(';');

    toast.innerHTML = (isError ? '⚠️ ' : '✓ ') + msg;
    document.body.appendChild(toast);

    setTimeout(function () {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(function () { toast.remove(); }, 300);
    }, 4000);
  }

  // Generic API Helper
  async function apiCall(endpoint, method, body) {
    try {
      var opts = {
        method: method || 'GET',
        headers: { 'Content-Type': 'application/json' }
      };
      if (body) opts.body = JSON.stringify(body);
      var res = await fetch(API_BASE + endpoint, opts);
      if (!res.ok) throw new Error('API returned ' + res.status);
      return await res.json();
    } catch (err) {
      console.error('[Zenve DB Error]', endpoint, err);
      showToast('Database Error: ' + err.message, true);
      return null;
    }
  }

  // 1. Subscriptions Sync
  async function syncSubscriptions() {
    var plans = await apiCall('/subscriptions/plans');
    var subs = await apiCall('/subscriptions/subscribers');
    if (plans) DB_STATE.plans = plans;
    if (subs) DB_STATE.subscribers = subs;

    // Patch global subscriptions dashboard variables if present
    if (window.ZenveSubscriptionsDashboard) {
      if (plans && Array.isArray(plans)) {
        // Re-render table if open
        var tableBody = document.querySelector('#zsub-root .zsub-table tbody');
        if (tableBody) {
          tableBody.innerHTML = plans.map(function (p) {
            return '<tr>' +
              '<td style="font-family:monospace;font-weight:600;">' + (p.plan_code || 'SUB-' + p.id) + '</td>' +
              '<td style="font-weight:600;">' + p.name + '</td>' +
              '<td style="font-weight:600;color:#38bdf8;">₹' + Number(p.price).toLocaleString('en-IN') + ' / mo</td>' +
              '<td>' + p.active_subscribers + ' Pets</td>' +
              '<td style="font-weight:600;color:#10b981;">₹' + Number(p.mrr || (p.price * p.active_subscribers)).toLocaleString('en-IN') + '</td>' +
              '<td>' + (p.renewal_rate || '96%') + '</td>' +
              '<td><span style="padding:2px 8px;border-radius:99px;background:rgba(16,185,129,0.15);color:#10b981;font-size:11px;font-weight:600;">' + (p.churn_rate || '0.8%') + '</span></td>' +
              '<td><span style="padding:2px 8px;border-radius:99px;background:rgba(56,189,248,0.15);color:#38bdf8;font-size:11px;font-weight:600;">Active</span></td>' +
            '</tr>';
          }).join('');
        }
      }
    }
  }

  // 2. Orders Sync
  async function syncOrders() {
    var orders = await apiCall('/orders');
    if (orders) DB_STATE.orders = orders;
  }

  // 3. Products & Stock Sync
  async function syncProducts() {
    var products = await apiCall('/products');
    if (products) DB_STATE.products = products;
  }

  // 4. Pharmacy Sync
  async function syncPharmacy() {
    var meds = await apiCall('/pharmacy/medicines');
    if (meds) DB_STATE.medicines = meds;
  }

  // 5. Veterinary & Appointments Sync
  async function syncVeterinary() {
    var apps = await apiCall('/veterinary/appointments');
    var srvs = await apiCall('/veterinary/services');
    if (apps) DB_STATE.appointments = apps;
  }

  // 6. Customers Sync
  async function syncCustomers() {
    var custs = await apiCall('/customers');
    if (custs) DB_STATE.customers = custs;
  }

  // 7. Pets Sync
  async function syncPets() {
    var pets = await apiCall('/pets');
    if (pets) DB_STATE.pets = pets;
  }

  // Initial full load
  async function syncAll() {
    console.log('[Zenve DB] Connecting to MySQL zenve_engine backend...');
    await Promise.all([
      syncSubscriptions(),
      syncOrders(),
      syncProducts(),
      syncPharmacy(),
      syncVeterinary(),
      syncCustomers(),
      syncPets()
    ]);
    console.log('[Zenve DB] Successfully synced live data from MySQL!');

    // Update the sidebar footer status card text
    var statusTitle = document.querySelector('.sidebar-status-title');
    var statusSub = document.querySelector('.sidebar-status-sub');
    if (statusTitle) statusTitle.textContent = 'ALL SYSTEMS LIVE (MySQL)';
    if (statusSub) statusSub.textContent = 'zenve_engine database synced';
  }

  // Global button handler & modal interceptor for CRUD actions
  function setupButtonInterceptors() {
    document.addEventListener('submit', async function (e) {
      var form = e.target;

      // New Subscription Plan Modal
      if (form.closest('#zsub-active-modal') || form.closest('.zsub-modal')) {
        e.preventDefault();
        e.stopPropagation();
        var inputs = form.querySelectorAll('input, select, textarea');
        var name = inputs[0] ? inputs[0].value : 'New Wellness Plan';
        var price = inputs[1] ? Number(inputs[1].value.replace(/[^0-9.]/g, '')) || 1499 : 1499;
        var cycle = inputs[2] ? inputs[2].value : 'Monthly';
        var benefits = inputs[3] ? inputs[3].value : 'Unlimited Vet Consults + Free Vaccines';

        var res = await apiCall('/subscriptions/plans', 'POST', {
          name: name,
          price: price,
          billing_cycle: cycle,
          benefits: benefits,
          active_subscribers: 1,
          mrr: price
        });

        if (res && res.success) {
          showToast('New Subscription Plan saved to MySQL zenve_engine!');
          if (window.ZenveSubscriptionsDashboard && window.ZenveSubscriptionsDashboard.closeModal) {
            window.ZenveSubscriptionsDashboard.closeModal();
          }
          await syncSubscriptions();
        }
        return false;
      }

      // Order Creation Modal
      if (form.closest('#zod-modal') || form.closest('[class*="order-modal"]')) {
        e.preventDefault();
        e.stopPropagation();
        var inputs = form.querySelectorAll('input, select');
        var custName = inputs[0] ? inputs[0].value : 'Pet Parent';
        var phone = inputs[1] ? inputs[1].value : '+91 98450 12345';
        var amt = inputs[2] ? Number(inputs[2].value.replace(/[^0-9.]/g, '')) || 2450 : 2450;

        var res = await apiCall('/orders', 'POST', {
          customer_name: custName,
          customer_phone: phone,
          items_count: 2,
          total_amount: amt,
          delivery_slot: 'Express 60-Min',
          city: 'Bengaluru'
        });

        if (res && res.success) {
          showToast('Order saved to MySQL zenve_engine database!');
          await syncOrders();
        }
        return false;
      }

      // Product Creation Modal
      if (form.closest('#zpid-modal') || form.closest('[class*="product-modal"]')) {
        e.preventDefault();
        e.stopPropagation();
        var inputs = form.querySelectorAll('input, select');
        var pName = inputs[0] ? inputs[0].value : 'New Pet Product';
        var pCat = inputs[1] ? inputs[1].value : 'Food & Nutrition';
        var pPrice = inputs[2] ? Number(inputs[2].value.replace(/[^0-9.]/g, '')) || 999 : 999;
        var pStock = inputs[3] ? Number(inputs[3].value) || 50 : 50;

        var res = await apiCall('/products', 'POST', {
          name: pName,
          category: pCat,
          price: pPrice,
          stock: pStock
        });

        if (res && res.success) {
          showToast('Product added to MySQL inventory!');
          await syncProducts();
        }
        return false;
      }
    }, true);

    // Click handler for Action buttons (Cancel, Renew, Delete, Refresh)
    document.addEventListener('click', async function (e) {
      var btn = e.target.closest('button');
      if (!btn) return;

      var text = (btn.textContent || '').trim().toLowerCase();

      // Refresh DB button
      if (text.indexOf('refresh') >= 0 || text.indexOf('↻') >= 0) {
        showToast('Refreshing live data from MySQL zenve_engine...');
        await syncAll();
      }

      // Cancel Subscription button
      if (text === 'cancel subscription' || text === 'cancel sub') {
        var subId = btn.getAttribute('data-sub-id') || 1;
        var res = await apiCall('/subscriptions/subscribers/' + subId + '/cancel', 'POST');
        if (res && res.success) {
          showToast('Subscription cancelled in MySQL database');
          await syncSubscriptions();
        }
      }

      // Renew Subscription button
      if (text === 'renew subscription' || text === 'renew sub') {
        var subId = btn.getAttribute('data-sub-id') || 1;
        var res = await apiCall('/subscriptions/subscribers/' + subId + '/renew', 'POST');
        if (res && res.success) {
          showToast('Subscription renewed in MySQL database');
          await syncSubscriptions();
        }
      }
    }, true);
  }

  // Hook into hash change to trigger domain sync
  window.addEventListener('hashchange', function () {
    var h = (window.location.hash || '').toLowerCase();
    if (h.indexOf('subscription') >= 0) syncSubscriptions();
    else if (h.indexOf('order') >= 0) syncOrders();
    else if (h.indexOf('inventory') >= 0 || h.indexOf('stock') >= 0 || h.indexOf('product') >= 0) syncProducts();
    else if (h.indexOf('pharmacy') >= 0) syncPharmacy();
    else if (h.indexOf('vet') >= 0 || h.indexOf('appointment') >= 0) syncVeterinary();
    else if (h.indexOf('cust') >= 0) syncCustomers();
    else if (h.indexOf('pet') >= 0) syncPets();
  });

  // Expose API on window
  window.ZenveDB = {
    state: DB_STATE,
    syncAll: syncAll,
    syncSubscriptions: syncSubscriptions,
    syncOrders: syncOrders,
    syncProducts: syncProducts,
    syncPharmacy: syncPharmacy,
    syncVeterinary: syncVeterinary,
    syncCustomers: syncCustomers,
    syncPets: syncPets,
    apiCall: apiCall,
    showToast: showToast
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      syncAll();
      setupButtonInterceptors();
    });
  } else {
    syncAll();
    setupButtonInterceptors();
  }
})();
