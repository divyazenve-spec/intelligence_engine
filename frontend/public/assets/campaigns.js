/* =====================================================================
   Zenve BI — Campaigns Subcategory
   Sidebar: Marketing > Campaigns
   ===================================================================== */
(function () {
  'use strict';
  function launch() {
    if (window.ZenveMarketingDashboard && window.ZenveMarketingDashboard.open) {
      window.ZenveMarketingDashboard.open('campaigns');
    }
  }

  if (window.location.hash === '#campaigns') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () { setTimeout(launch, 250); });
    } else {
      setTimeout(launch, 250);
    }
  }
})();
