/* =====================================================================
   Zenve BI — Delivery Tracking Subcategory
   Sidebar: Logistics & Delivery > Delivery Tracking
   ===================================================================== */
(function () {
  'use strict';
  function launch() {
    if (window.ZenveLogisticsDashboard && window.ZenveLogisticsDashboard.open) {
      window.ZenveLogisticsDashboard.open('delivery-tracking');
    }
  }

  if (window.location.hash === '#delivery-tracking') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () { setTimeout(launch, 250); });
    } else {
      setTimeout(launch, 250);
    }
  }
})();
