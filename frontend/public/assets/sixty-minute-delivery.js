/* =====================================================================
   Zenve BI — 60-Minute Delivery Subcategory
   Sidebar: Logistics & Delivery > 60-Minute Delivery
   ===================================================================== */
(function () {
  'use strict';
  function launch() {
    if (window.ZenveLogisticsDashboard && window.ZenveLogisticsDashboard.open) {
      window.ZenveLogisticsDashboard.open('sixty-minute-delivery');
    }
  }

  if (window.location.hash === '#60-minute-delivery') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () { setTimeout(launch, 250); });
    } else {
      setTimeout(launch, 250);
    }
  }
})();
