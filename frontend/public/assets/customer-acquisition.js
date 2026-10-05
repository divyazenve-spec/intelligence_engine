/* =====================================================================
   Zenve BI — Customer Acquisition Subcategory
   Sidebar: Marketing > Customer Acquisition
   ===================================================================== */
(function () {
  'use strict';
  function launch() {
    if (window.ZenveMarketingDashboard && window.ZenveMarketingDashboard.open) {
      window.ZenveMarketingDashboard.open('customer-acquisition');
    }
  }

  if (window.location.hash === '#customer-acquisition') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () { setTimeout(launch, 250); });
    } else {
      setTimeout(launch, 250);
    }
  }
})();
