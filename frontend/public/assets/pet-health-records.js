/* =====================================================================
   Zenve BI — Pet Health Records Subcategory
   Sidebar: Pets 360° > Pet Health Records
   ===================================================================== */
(function () {
  'use strict';
  function launch() {
    if (window.ZenvePetsDashboard && window.ZenvePetsDashboard.open) {
      window.ZenvePetsDashboard.open('pet-health-records');
    }
  }

  if (window.location.hash === '#pet-health-records') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () { setTimeout(launch, 250); });
    } else {
      setTimeout(launch, 250);
    }
  }
})();
