/* =====================================================================
   Zenve BI — Service Profitability Subcategory
   Sidebar: Veterinary Services > Service Profitability
   ===================================================================== */
(function () {
  'use strict';
  function launch() {
    if (window.ZenveVeterinaryDashboard && window.ZenveVeterinaryDashboard.open) {
      window.ZenveVeterinaryDashboard.open('profitability');
    }
  }

  if (window.location.hash === '#service-profitability') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () { setTimeout(launch, 250); });
    } else {
      setTimeout(launch, 250);
    }
  }
})();
