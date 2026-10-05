/* =====================================================================
   Zenve BI — Treatments Subcategory
   Sidebar: Veterinary Services > Treatments
   ===================================================================== */
(function () {
  'use strict';
  function launch() {
    if (window.ZenveVeterinaryDashboard && window.ZenveVeterinaryDashboard.open) {
      window.ZenveVeterinaryDashboard.open('treatments');
    }
  }

  if (window.location.hash === '#treatments') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () { setTimeout(launch, 250); });
    } else {
      setTimeout(launch, 250);
    }
  }
})();
