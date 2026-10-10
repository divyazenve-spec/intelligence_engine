/* =====================================================================
   Zenve BI — Celestial Stars Revolving Circular Logo Controller
   Website Light Luxury Theme & Sparkling Celestial Stars
   Stars smoothly revolving around the central circular Zenve Logo.
   Active during subdomain and domain transitions to eliminate dashboard flashing.
   ===================================================================== */
(function () {
  'use strict';

  var LOADER_ID = 'zenve-dragon-loader';
  var _lastShownAt = 0;
  var _hideTimer = null;
  var MIN_DISPLAY_MS = 450; // Smooth viewing window for the revolving stars animation

  function getLoaderMarkup() {
    var starFlarePath = 'M12 0 C12 6.5, 17.5 12, 24 12 C17.5 12, 12 17.5, 12 24 C12 17.5, 6.5 12, 0 12 C6.5 12, 12 6.5, 12 0 Z';

    function starSvg(sizeClass, isEightPoint, delayClass) {
      var extra = isEightPoint
        ? '<path d="' + starFlarePath + '" fill="url(#zdlThemeStarGrad)" transform="rotate(45 12 12) scale(0.62)" transform-origin="center" />'
        : '';
      var coreRadius = sizeClass === 'zdl-star-lg' ? '3' : (sizeClass === 'zdl-star-md' ? '2.2' : '1.8');
      return [
        '<svg viewBox="0 0 24 24" class="zdl-star ' + sizeClass + ' ' + (delayClass || '') + '">',
        '  <path d="' + starFlarePath + '" fill="url(#zdlThemeStarGrad)" />',
        extra,
        '  <circle cx="12" cy="12" r="' + coreRadius + '" fill="#ffffff" />',
        '</svg>'
      ].join('');
    }

    return [
      '<!-- SVG Definitions for Celestial Stars -->',
      '<svg width="0" height="0" style="position:absolute;visibility:hidden;pointer-events:none;">',
      '  <defs>',
      '    <linearGradient id="zdlThemeStarGrad" x1="0%" y1="0%" x2="100%" y2="100%">',
      '      <stop offset="0%" stop-color="#ffffff" />',
      '      <stop offset="25%" stop-color="#a7f3d0" />',
      '      <stop offset="65%" stop-color="#10b981" />',
      '      <stop offset="100%" stop-color="#059669" />',
      '    </linearGradient>',
      '    <linearGradient id="zdlGoldStarGrad" x1="0%" y1="0%" x2="100%" y2="100%">',
      '      <stop offset="0%" stop-color="#ffffff" />',
      '      <stop offset="25%" stop-color="#a7f3d0" />',
      '      <stop offset="65%" stop-color="#10b981" />',
      '      <stop offset="100%" stop-color="#059669" />',
      '    </linearGradient>',
      '  </defs>',
      '</svg>',
      '<div class="zdl-stage">',
      '  <!-- Starlight Ambient Radiance Aura -->',
      '  <div class="zdl-ambient-aura"></div>',
      '  <!-- Orbit Tracks -->',
      '  <div class="zdl-orbit-track-outer"></div>',
      '  <div class="zdl-orbit-track-inner"></div>',
      '  <div class="zdl-logo-halo"></div>',
      '  <!-- Central Zenve Logo in a Circular Badge -->',
      '  <div class="zdl-emblem-core">',
      '    <img src="/zenve-logo.png" alt="Zenve Logo" onerror="this.src=\'/assets/zenve-logo.png\'" />',
      '  </div>',
      '  <!-- OUTER REVOLVING ORBIT WITH STARS -->',
      '  <div class="zdl-orbit-outer">',
      '    <div class="zdl-star-holder zdl-star-pos-0">' + starSvg('zdl-star-lg', true, 'zdl-delay-0') + '</div>',
      '    <div class="zdl-star-holder zdl-star-pos-60">' + starSvg('zdl-star-md', false, 'zdl-delay-1') + '</div>',
      '    <div class="zdl-star-holder zdl-star-pos-120">' + starSvg('zdl-star-sm', false, 'zdl-delay-2') + '</div>',
      '    <div class="zdl-star-holder zdl-star-pos-180">' + starSvg('zdl-star-lg', true, 'zdl-delay-3') + '</div>',
      '    <div class="zdl-star-holder zdl-star-pos-240">' + starSvg('zdl-star-md', false, 'zdl-delay-4') + '</div>',
      '    <div class="zdl-star-holder zdl-star-pos-300">' + starSvg('zdl-star-sm', false, 'zdl-delay-5') + '</div>',
      '  </div>',
      '  <!-- INNER REVOLVING COUNTER-ORBIT WITH STARS -->',
      '  <div class="zdl-orbit-inner">',
      '    <div class="zdl-star-holder zdl-star-pos-in-45">' + starSvg('zdl-star-md', false, 'zdl-delay-2') + '</div>',
      '    <div class="zdl-star-holder zdl-star-pos-in-135">' + starSvg('zdl-star-xs', false, 'zdl-delay-3') + '</div>',
      '    <div class="zdl-star-holder zdl-star-pos-in-225">' + starSvg('zdl-star-md', false, 'zdl-delay-4') + '</div>',
      '    <div class="zdl-star-holder zdl-star-pos-in-315">' + starSvg('zdl-star-xs', false, 'zdl-delay-1') + '</div>',
      '  </div>',
      '  <!-- Twinkling Stardust Embers -->',
      '  <div class="zdl-stardust zdl-dust-1"></div>',
      '  <div class="zdl-stardust zdl-dust-2"></div>',
      '  <div class="zdl-stardust zdl-dust-3"></div>',
      '  <div class="zdl-stardust zdl-dust-4"></div>',
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

  // Pre-instantiate loader early so elements and fonts are ready instantly
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      ensureLoaderElement();
    });
  } else {
    ensureLoaderElement();
  }

  // Global API attached to window for zenve-router and navigation hooks
  window.ZenveDragonLoader = {
    show: show,
    hide: hide
  };
})();
