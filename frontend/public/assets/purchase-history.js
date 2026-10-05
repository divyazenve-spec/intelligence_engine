/* =====================================================================
   Zenve BI — Purchase History Subcategory
   Sidebar: Pets 360° > Purchase History
   ===================================================================== */
(function () {
  'use strict';
  function launch() {
    if (window.ZenvePetsDashboard && window.ZenvePetsDashboard.open) {
      window.ZenvePetsDashboard.open('purchase-history');
    }
  }

  if (window.location.hash === '#purchase-history') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () { setTimeout(launch, 250); });
    } else {
      setTimeout(launch, 250);
    }
  }
})();
