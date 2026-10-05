/* =====================================================================
   Zenve BI — Delivery SLA Subcategory
   Sidebar: Logistics & Delivery > Delivery SLA
   ===================================================================== */
(function () {
  'use strict';
  function launch() {
    if (window.ZenveLogisticsDashboard && window.ZenveLogisticsDashboard.open) {
      window.ZenveLogisticsDashboard.open('delivery-sla');
    }
  }

  if (window.location.hash === '#delivery-sla') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () { setTimeout(launch, 250); });
    } else {
      setTimeout(launch, 250);
    }
  }
})();
