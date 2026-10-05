/* =====================================================================
   Zenve BI — Delivery Cost Subcategory
   Sidebar: Logistics & Delivery > Delivery Cost
   ===================================================================== */
(function () {
  'use strict';
  function launch() {
    if (window.ZenveLogisticsDashboard && window.ZenveLogisticsDashboard.open) {
      window.ZenveLogisticsDashboard.open('delivery-cost');
    }
  }

  if (window.location.hash === '#delivery-cost') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () { setTimeout(launch, 250); });
    } else {
      setTimeout(launch, 250);
    }
  }
})();
