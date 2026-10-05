/* =====================================================================
   Zenve BI — Delivery Partners Subcategory
   Sidebar: Logistics & Delivery > Delivery Partners
   ===================================================================== */
(function () {
  'use strict';
  function launch() {
    if (window.ZenveLogisticsDashboard && window.ZenveLogisticsDashboard.open) {
      window.ZenveLogisticsDashboard.open('delivery-partners');
    }
  }

  if (window.location.hash === '#delivery-partners') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () { setTimeout(launch, 250); });
    } else {
      setTimeout(launch, 250);
    }
  }
})();
