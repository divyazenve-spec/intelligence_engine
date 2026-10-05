/* =====================================================================
   Zenve BI — Vaccination Records Subcategory
   Sidebar: Pets 360° > Vaccination Records
   ===================================================================== */
(function () {
  'use strict';
  function launch() {
    if (window.ZenvePetsDashboard && window.ZenvePetsDashboard.open) {
      window.ZenvePetsDashboard.open('vaccination-records');
    }
  }

  if (window.location.hash === '#vaccination-records') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () { setTimeout(launch, 250); });
    } else {
      setTimeout(launch, 250);
    }
  }
})();
