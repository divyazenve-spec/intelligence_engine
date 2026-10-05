/* =====================================================================
   Zenve BI — Services Dashboard Subcategory
   Sidebar: Veterinary Services > Services Dashboard
   ===================================================================== */
(function () {
  'use strict';
  function launch() {
    if (window.ZenveVeterinaryDashboard && window.ZenveVeterinaryDashboard.open) {
      window.ZenveVeterinaryDashboard.open('overview');
    }
  }

  if (window.location.hash === '#services-dashboard' || window.location.hash === '#veterinary-services') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () { setTimeout(launch, 250); });
    } else {
      setTimeout(launch, 250);
    }
  }
})();
