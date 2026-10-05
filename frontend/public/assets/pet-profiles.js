/* =====================================================================
   Zenve BI — Pet Profiles Subcategory
   Sidebar: Pets 360° > Pet Profiles
   ===================================================================== */
(function () {
  'use strict';
  function launch() {
    if (window.ZenvePetsDashboard && window.ZenvePetsDashboard.open) {
      window.ZenvePetsDashboard.open('pet-profiles');
    }
  }

  if (window.location.hash === '#pet-profiles') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () { setTimeout(launch, 250); });
    } else {
      setTimeout(launch, 250);
    }
  }
})();
