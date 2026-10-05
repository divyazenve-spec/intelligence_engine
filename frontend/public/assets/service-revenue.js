/* =====================================================================
   Zenve BI — Service Revenue Subcategory
   Sidebar: Veterinary Services > Service Revenue
   ===================================================================== */
(function () {
  'use strict';
  function launch() {
    if (window.ZenveVeterinaryDashboard && window.ZenveVeterinaryDashboard.open) {
      window.ZenveVeterinaryDashboard.open('revenue');
    }
  }

  if (window.location.hash === '#service-revenue') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () { setTimeout(launch, 250); });
    } else {
      setTimeout(launch, 250);
    }
  }
})();
