/* =====================================================================
   Zenve BI — All Pets Subcategory
   Sidebar: Pets 360° > All Pets
   ===================================================================== */
(function () {
  'use strict';
  function launch() {
    if (window.ZenvePetsDashboard && window.ZenvePetsDashboard.open) {
      window.ZenvePetsDashboard.open('all-pets');
    }
  }

  if (window.location.hash === '#all-pets' || window.location.hash === '#pets-360') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () { setTimeout(launch, 250); });
    } else {
      setTimeout(launch, 250);
    }
  }
})();
