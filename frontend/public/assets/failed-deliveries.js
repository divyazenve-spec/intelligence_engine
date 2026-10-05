/* =====================================================================
   Zenve BI — Failed Deliveries Subcategory
   Sidebar: Logistics & Delivery > Failed Deliveries
   ===================================================================== */
(function () {
  'use strict';
  function launch() {
    if (window.ZenveLogisticsDashboard && window.ZenveLogisticsDashboard.open) {
      window.ZenveLogisticsDashboard.open('failed-deliveries');
    }
  }

  if (window.location.hash === '#failed-deliveries') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () { setTimeout(launch, 250); });
    } else {
      setTimeout(launch, 250);
    }
  }
})();
