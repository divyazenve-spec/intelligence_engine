/* =====================================================================
   Zenve BI — Marketing Spend Subcategory
   Sidebar: Marketing > Marketing Spend
   ===================================================================== */
(function () {
  'use strict';
  function launch() {
    if (window.ZenveMarketingDashboard && window.ZenveMarketingDashboard.open) {
      window.ZenveMarketingDashboard.open('marketing-spend');
    }
  }

  if (window.location.hash === '#marketing-spend') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () { setTimeout(launch, 250); });
    } else {
      setTimeout(launch, 250);
    }
  }
})();
