/* =====================================================================
   Zenve BI — Delivery Performance Subcategory
   Sidebar: Logistics & Delivery > Delivery Performance
   ===================================================================== */
(function () {
  'use strict';
  function launch() {
    if (window.ZenveLogisticsDashboard && window.ZenveLogisticsDashboard.open) {
      window.ZenveLogisticsDashboard.open('delivery-performance');
    }
  }

  if (window.location.hash === '#delivery-performance') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () { setTimeout(launch, 250); });
    } else {
      setTimeout(launch, 250);
    }
  }
})();
