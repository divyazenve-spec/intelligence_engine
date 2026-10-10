/* =====================================================================
   Zenve BI — Dragon Revolving "Z" Logo Loading Controller
   Provides the animated loading clip whenever switching between subdomains/domains
   to prevent flashing of the underlying Executive Overview dashboard.
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
      '  <div class="zdl-ember zdl-ember-1"></div>',
      '  <div class="zdl-ember zdl-ember-2"></div>',
      '  <div class="zdl-ember zdl-ember-3"></div>',
      '  <div class="zdl-ember zdl-ember-4"></div>',
      '  <!-- Central Zenve "Z" Logo Emblem -->',
      '  <div class="zdl-emblem-core">',
      '    <img src="/zenve-logo.png" alt="Zenve Z Logo" onerror="this.src=\'/assets/zenve-logo.png\'" />',
      '  </div>',
      '  <!-- 3D Dragon Orbital System -->',
      '  <div class="zdl-orbit-system">',
      '    <div class="zdl-dragon-capsule">',
      '      <!-- Majestic Oriental Celestial Dragon SVG -->',
      '      <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;overflow:visible;">',
      '        <defs>',
      '          <linearGradient id="zdlDragonGold" x1="0%" y1="0%" x2="100%" y2="100%">',
      '            <stop offset="0%" stop-color="#fffbeb" />',
      '            <stop offset="25%" stop-color="#fbbf24" />',
      '            <stop offset="65%" stop-color="#d97706" />',
      '            <stop offset="100%" stop-color="#b45309" />',
      '          </linearGradient>',
      '          <linearGradient id="zdlDragonSpine" x1="0%" y1="0%" x2="100%" y2="0%">',
      '            <stop offset="0%" stop-color="#fef08a" />',
      '            <stop offset="50%" stop-color="#f59e0b" />',
      '            <stop offset="100%" stop-color="#dc2626" />',
      '          </linearGradient>',
      '          <radialGradient id="zdlEyeGlow" cx="50%" cy="50%" r="50%">',
      '            <stop offset="0%" stop-color="#38bdf8" />',
      '            <stop offset="70%" stop-color="#0284c7" />',
      '            <stop offset="100%" stop-color="#0369a1" />',
      '          </radialGradient>',
      '          <filter id="zdlGlowFilter" x="-20%" y="-20%" width="140%" height="140%">',
      '            <feGaussianBlur stdDeviation="3.2" result="blur" />',
      '            <feMerge>',
      '              <feMergeNode in="blur" />',
      '              <feMergeNode in="SourceGraphic" />',
      '            </feMerge>',
      '          </filter>',
      '        </defs>',
      '        <!-- Serpentine Undulating Dragon Tail & Body -->',
      '        <path d="M 5 65 C 10 75 18 80 25 72 C 20 68 18 60 12 58 C 8 57 4 60 5 65 Z" fill="url(#zdlDragonSpine)" opacity="0.85" />',
      '        <path d="M 12 70 C 18 78 28 82 35 70 C 28 66 22 55 15 56 Z" fill="url(#zdlDragonGold)" />',
      '        <!-- Main Serpentine Body Trunk -->',
      '        <path d="M 20 68 C 35 85, 60 88, 85 70 C 105 55, 125 55, 142 66 C 152 72, 162 70, 170 60 C 165 52, 150 46, 138 48 C 118 50, 100 42, 80 50 C 55 60, 38 60, 20 68 Z" fill="url(#zdlDragonGold)" filter="url(#zdlGlowFilter)" />',
      '        <!-- Dorsal Spine Flame Crest -->',
      '        <path d="M 32 66 Q 36 58 40 64 Q 45 54 50 63 Q 56 50 62 60 Q 68 47 74 58 Q 80 44 86 54 Q 92 41 98 52 Q 105 38 112 49 Q 120 37 127 48 Q 134 38 141 49" stroke="url(#zdlDragonSpine)" stroke-width="3" stroke-linecap="round" fill="none" />',
      '        <!-- Belly Scales Highlights -->',
      '        <path d="M 35 75 C 50 82 65 82 80 72" stroke="rgba(255,255,255,0.4)" stroke-width="2" stroke-linecap="round" fill="none" />',
      '        <path d="M 90 66 C 105 58 120 58 135 64" stroke="rgba(255,255,255,0.4)" stroke-width="2" stroke-linecap="round" fill="none" />',
      '        <!-- Talons / Claws -->',
      '        <g transform="translate(130, 68)">',
      '          <path d="M 0 0 L 8 10 M 8 10 L 14 12 M 8 10 L 10 16 M 8 10 L 6 15" stroke="#fbbf24" stroke-width="2.5" stroke-linecap="round" />',
      '          <circle cx="14" cy="12" r="1.5" fill="#fff" />',
      '          <circle cx="10" cy="16" r="1.5" fill="#fff" />',
      '        </g>',
      '        <g transform="translate(75, 75)">',
      '          <path d="M 0 0 L -6 10 M -6 10 L -12 11 M -6 10 L -8 15 M -6 10 L -4 14" stroke="#fbbf24" stroke-width="2.2" stroke-linecap="round" />',
      '          <circle cx="-12" cy="11" r="1.5" fill="#fff" />',
      '        </g>',
      '        <!-- Dragon Head -->',
      '        <g transform="translate(155, 38)">',
      '          <path d="M 2 15 C -8 10 -15 8 -22 12 C -18 7 -10 5 -2 8 Z" fill="url(#zdlDragonSpine)" />',
      '          <path d="M 0 22 C -12 24 -24 20 -30 26 C -24 18 -12 18 0 18 Z" fill="url(#zdlDragonSpine)" opacity="0.9" />',
      '          <path d="M 18 24 C 8 32 -6 34 -18 36 C -28 37 -36 32 -42 34" stroke="#fef08a" stroke-width="1.6" stroke-linecap="round" fill="none" />',
      '          <path d="M 22 20 C 14 26 2 28 -8 28" stroke="#fbbf24" stroke-width="1.2" stroke-linecap="round" fill="none" />',
      '          <path d="M 5 12 C 0 4 -5 -4 -12 -8 C -10 -4 -8 2 -3 8 Z" fill="url(#zdlDragonGold)" />',
      '          <path d="M -6 -1 C -10 -8 -16 -12 -22 -14 C -18 -8 -14 -4 -8 0 Z" fill="#fbbf24" />',
      '          <path d="M 0 12 C 6 8 14 8 20 12 C 26 15 32 18 35 22 C 30 23 25 24 22 24 C 24 26 27 28 26 30 C 20 30 16 26 12 24 C 8 26 2 26 -2 22 Z" fill="url(#zdlDragonGold)" filter="url(#zdlGlowFilter)" />',
      '          <path d="M 24 24 L 26 27 L 28 24 Z" fill="#ffffff" />',
      '          <path d="M 20 24 L 22 26 L 23 24 Z" fill="#ffffff" />',
      '          <ellipse cx="14" cy="15" rx="3" ry="2" fill="url(#zdlEyeGlow)" />',
      '          <ellipse cx="14" cy="15" rx="1.2" ry="1.8" fill="#ffffff" />',
      '          <circle cx="14" cy="15" r="4.5" stroke="#38bdf8" stroke-width="0.8" opacity="0.75" />',
      '        </g>',
      '      </svg>',
      '    </div>',
      '  </div>',
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
