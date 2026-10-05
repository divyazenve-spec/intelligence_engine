/* =====================================================================
   Zenve BI — Conversion Funnel Subcategory
   Sidebar: Marketing > Conversion Funnel
   ===================================================================== */
(function () {
  'use strict';
  function launch() {
    if (window.ZenveMarketingDashboard && window.ZenveMarketingDashboard.open) {
      window.ZenveMarketingDashboard.open('conversion-funnel');
    }
  }

  if (window.location.hash === '#conversion-funnel') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () { setTimeout(launch, 250); });
    } else {
      setTimeout(launch, 250);
    }
  }
})();
