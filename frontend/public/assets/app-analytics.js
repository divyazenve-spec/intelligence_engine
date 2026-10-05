/* =====================================================================
   Zenve BI — App Analytics Subcategory
   Sidebar: Marketing > App Analytics
   ===================================================================== */
(function () {
  'use strict';
  function launch() {
    if (window.ZenveMarketingDashboard && window.ZenveMarketingDashboard.open) {
      window.ZenveMarketingDashboard.open('app-analytics');
    }
  }

  if (window.location.hash === '#app-analytics') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () { setTimeout(launch, 250); });
    } else {
      setTimeout(launch, 250);
    }
  }
})();
