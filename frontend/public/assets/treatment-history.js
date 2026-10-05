/* =====================================================================
   Zenve BI — Treatment History Subcategory
   Sidebar: Pets 360° > Treatment History
   ===================================================================== */
(function () {
  'use strict';
  function launch() {
    if (window.ZenvePetsDashboard && window.ZenvePetsDashboard.open) {
      window.ZenvePetsDashboard.open('treatment-history');
    }
  }

  if (window.location.hash === '#treatment-history') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () { setTimeout(launch, 250); });
    } else {
      setTimeout(launch, 250);
    }
  }
})();
