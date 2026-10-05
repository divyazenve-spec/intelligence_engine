/* =====================================================================
   Zenve BI — Pet Analytics Subcategory
   Sidebar: Pets 360° > Pet Analytics
   ===================================================================== */
(function () {
  'use strict';
  function launch() {
    if (window.ZenvePetsDashboard && window.ZenvePetsDashboard.open) {
      window.ZenvePetsDashboard.open('pet-analytics');
    }
  }

  if (window.location.hash === '#pet-analytics') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () { setTimeout(launch, 250); });
    } else {
      setTimeout(launch, 250);
    }
  }
})();
