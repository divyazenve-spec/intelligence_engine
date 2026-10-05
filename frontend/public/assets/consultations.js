/* =====================================================================
   Zenve BI — Consultations Subcategory
   Sidebar: Veterinary Services > Consultations
   ===================================================================== */
(function () {
  'use strict';
  function launch() {
    if (window.ZenveVeterinaryDashboard && window.ZenveVeterinaryDashboard.open) {
      window.ZenveVeterinaryDashboard.open('consultations');
    }
  }

  if (window.location.hash === '#consultations') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () { setTimeout(launch, 250); });
    } else {
      setTimeout(launch, 250);
    }
  }
})();
