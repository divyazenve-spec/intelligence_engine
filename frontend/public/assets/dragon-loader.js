/* =====================================================================
   Zenve BI — Fiery Celestial Chinese Dragon Revolving "Z" Logo Controller
   Website Light Luxury Theme & Realistic Fiery Magma Dragon
   Smoothly revolving 360 degrees around the central Zenve "Z" logo emblem.
   Active during subdomain and domain transitions to eliminate dashboard flashing.
   ===================================================================== */
(function () {
  'use strict';

  var LOADER_ID = 'zenve-dragon-loader';
  var _lastShownAt = 0;
  var _hideTimer = null;
  var MIN_DISPLAY_MS = 450; // Smooth viewing window for the dragon revolving animation

  function getLoaderMarkup() {
    return [
      '<div class="zdl-stage">',
      '  <div class="zdl-ambient-aura"></div>',
      '  <div class="zdl-celestial-ring-outer"></div>',
      '  <div class="zdl-celestial-ring-inner"></div>',
      '  <!-- Central Zenve "Z" Logo Emblem -->',
      '  <div class="zdl-emblem-core">',
      '    <img src="/zenve-logo.png" alt="Zenve Z Logo" onerror="this.src=\'/assets/zenve-logo.png\'" />',
      '  </div>',
      '  <!-- Fiery Celestial Dragon Circling the Logo (matching reference image) -->',
      '  <div class="zdl-fiery-dragon-wrap">',
      '    <img src="/assets/fiery-dragon-circle-opt.png" class="zdl-fiery-dragon-img" alt="Fiery Dragon Circling Logo" onerror="this.src=\'/assets/fiery-dragon-circle.png\'" />',
      '  </div>',
      '  <!-- Golden Celestial Embers -->',
      '  <div class="zdl-ember zdl-ember-1"></div>',
      '  <div class="zdl-ember zdl-ember-2"></div>',
      '  <div class="zdl-ember zdl-ember-3"></div>',
      '  <div class="zdl-ember zdl-ember-4"></div>',
      '  <div class="zdl-ember zdl-ember-5"></div>',
      '  <div class="zdl-ember zdl-ember-6"></div>',
      '</div>',
      '<div class="zdl-caption">',
      '  <div class="zdl-title">ZENVE INTELLIGENCE</div>',
      '  <div class="zdl-subtitle">',
      '    <span class="zdl-status-dot"></span>',
      '    <span id="zdl-target-label">Synchronizing Dashboard...</span>',
      '  </div>',
      '  <div class="zdl-progress-track">',
      '    <div class="zdl-progress-runner"></div>',
      '  </div>',
      '</div>'
    ].join('\n');
  }

  function ensureLoaderElement() {
    var el = document.getElementById(LOADER_ID);
    if (!el) {
      el = document.createElement('div');
      el.id = LOADER_ID;
      el.innerHTML = getLoaderMarkup();
      document.body.appendChild(el);
    }
    return el;
  }

  function show(targetName, moduleName) {
    if (_hideTimer) {
      clearTimeout(_hideTimer);
      _hideTimer = null;
    }
    var loader = ensureLoaderElement();
    var labelEl = document.getElementById('zdl-target-label');
    if (labelEl) {
      var displayTarget = targetName || moduleName || 'Dashboard';
      // Clean up target name
      displayTarget = displayTarget.replace(/^[•·●\s]+/, '').trim();
      labelEl.textContent = 'Synchronizing ' + displayTarget + '...';
    }

    loader.classList.add('zdl-active');
    _lastShownAt = Date.now();

    // Safety timeout: auto-hide after 2500ms max so user is never frozen
    _hideTimer = setTimeout(function () {
      if (loader.classList.contains('zdl-active')) {
        loader.classList.remove('zdl-active');
      }
    }, 2500);
  }

  function hide(callback) {
    var elapsed = Date.now() - _lastShownAt;
    var remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);

    if (_hideTimer) clearTimeout(_hideTimer);

    _hideTimer = setTimeout(function () {
      var loader = document.getElementById(LOADER_ID);
      if (loader) {
        loader.classList.remove('zdl-active');
      }
      if (typeof callback === 'function') {
        callback();
      }
    }, remaining);
  }

  // Early capture click listener: triggers IMMEDIATELY on click before previous dashboard closes
  document.addEventListener('click', function (e) {
    var target = e.target;
    if (!target) return;

    var subItem = target.closest('.sidebar-sub-item, .sidebar-submenu-box button, .sidebar-submenu-box a, .sidebar-submenu-box li');
    if (subItem) {
      var text = (subItem.textContent || '').replace(/^[•·●\s]+/, '').trim();
      if (text && text.toLowerCase() !== 'export center') {
        show(text);
      }
    }

    var viewAllBtn = target.closest('button');
    if (viewAllBtn && viewAllBtn.textContent && viewAllBtn.textContent.trim().toLowerCase() === 'view all') {
      var card = viewAllBtn.closest('article, section, div');
      var cardTitle = card ? card.querySelector('h3, h2, .font-semibold') : null;
      if (cardTitle) {
        show(cardTitle.textContent.trim());
      }
    }
  }, true);

  window.addEventListener('hashchange', function () {
    var hash = window.location.hash;
    if (hash && hash !== '#' && hash !== '#overview' && hash !== '#daily' && hash !== '#ledger' && hash !== '#ai' && hash !== '#apps') {
      var clean = hash.replace(/^#/, '').replace(/-/g, ' ');
      show(clean);
    }
  });

  window.ZenveDragonLoader = {
    show: show,
    hide: hide,
    ensure: ensureLoaderElement
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ensureLoaderElement);
  } else {
    ensureLoaderElement();
  }
})();
