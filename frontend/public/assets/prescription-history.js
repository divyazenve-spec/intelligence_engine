/* =====================================================================
   Zenve BI — Prescription History Subcategory
   Sidebar: Pets 360° > Prescription History
   ===================================================================== */
(function () {
  'use strict';
  function launch() {
    if (window.ZenvePetsDashboard && window.ZenvePetsDashboard.open) {
      window.ZenvePetsDashboard.open('prescription-history');
    }
  }

  if (window.location.hash === '#prescription-history') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () { setTimeout(launch, 250); });
    } else {
      setTimeout(launch, 250);
    }
  }
})();
