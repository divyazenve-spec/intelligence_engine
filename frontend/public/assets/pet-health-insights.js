/* =====================================================================
   Zenve BI — Pet Health Insights Subcategory
   Sidebar: Pets 360° > Pet Health Insights
   ===================================================================== */
(function () {
  'use strict';
  function launch() {
    if (window.ZenvePetsDashboard && window.ZenvePetsDashboard.open) {
      window.ZenvePetsDashboard.open('pet-health-insights');
    }
  }

  if (window.location.hash === '#pet-health-insights') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () { setTimeout(launch, 250); });
    } else {
      setTimeout(launch, 250);
    }
  }
})();
