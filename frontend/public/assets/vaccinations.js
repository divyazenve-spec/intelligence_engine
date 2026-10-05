/* =====================================================================
   Zenve BI — Vaccinations Subcategory
   Sidebar: Veterinary Services > Vaccinations
   ===================================================================== */
(function () {
  'use strict';
  function launch() {
    if (window.ZenveVeterinaryDashboard && window.ZenveVeterinaryDashboard.open) {
      window.ZenveVeterinaryDashboard.open('vaccinations');
    }
  }

  if (window.location.hash === '#vaccinations') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () { setTimeout(launch, 250); });
    } else {
      setTimeout(launch, 250);
    }
  }
})();
