/* =====================================================================
   Zenve BI — Diagnostics Subcategory
   Sidebar: Veterinary Services > Diagnostics
   ===================================================================== */
(function () {
  'use strict';
  function launch() {
    if (window.ZenveVeterinaryDashboard && window.ZenveVeterinaryDashboard.open) {
      window.ZenveVeterinaryDashboard.open('diagnostics');
    }
  }

  if (window.location.hash === '#diagnostics') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () { setTimeout(launch, 250); });
    } else {
      setTimeout(launch, 250);
    }
  }
})();
