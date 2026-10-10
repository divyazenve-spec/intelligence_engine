/* =====================================================================
   Zenve BI — Real Chinese Dragon Revolving "Z" Logo Loading Controller
   Website-matching Light Theme & Authentic Imperial Chinese Dragon (Loong)
   Smoothly revolving in 3D orbit around the central Zenve "Z" logo emblem.
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
      '  <!-- Authentic Chinese Auspicious Clouds (Xiangyun / 祥云) -->',
      '  <svg class="zdl-cloud zdl-cloud-1" viewBox="0 0 60 36" fill="none" xmlns="http://www.w3.org/2000/svg">',
      '    <path d="M 8 22 C 3 17, 1 20, 1 26 C 1 31, 7 34, 14 31 C 20 35, 30 34, 34 28 C 38 21, 31 14, 23 16 C 20 10, 10 12, 8 22 Z" fill="rgba(245, 158, 11, 0.12)" stroke="rgba(217, 119, 6, 0.35)" stroke-width="1.2" />',
      '    <path d="M 12 25 C 8 22, 10 17, 15 18 C 18 20, 17 23, 14 23" stroke="rgba(217, 119, 6, 0.4)" stroke-width="1" stroke-linecap="round" fill="none" />',
      '  </svg>',
      '  <svg class="zdl-cloud zdl-cloud-2" viewBox="0 0 64 38" fill="none" xmlns="http://www.w3.org/2000/svg">',
      '    <path d="M 10 24 C 4 19, 2 22, 2 28 C 2 33, 9 36, 17 33 C 23 37, 34 36, 38 30 C 43 23, 35 15, 26 17 C 23 11, 12 13, 10 24 Z" fill="rgba(245, 158, 11, 0.12)" stroke="rgba(217, 119, 6, 0.35)" stroke-width="1.2" />',
      '    <path d="M 14 27 C 10 24, 12 19, 17 20 C 21 22, 19 25, 16 25" stroke="rgba(217, 119, 6, 0.4)" stroke-width="1" stroke-linecap="round" fill="none" />',
      '  </svg>',
      '  <!-- Golden Celestial Embers -->',
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
      '      <!-- Authentic Imperial Chinese Dragon (Loong / 龙) Vector Artwork -->',
      '      <svg viewBox="0 0 250 130" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;overflow:visible;">',
      '        <defs>',
      '          <linearGradient id="zdlDragonGold" x1="0%" y1="0%" x2="100%" y2="80%">',
      '            <stop offset="0%" stop-color="#fffbeb" />',
      '            <stop offset="20%" stop-color="#fde047" />',
      '            <stop offset="50%" stop-color="#f59e0b" />',
      '            <stop offset="80%" stop-color="#d97706" />',
      '            <stop offset="100%" stop-color="#92400e" />',
      '          </linearGradient>',
      '          <linearGradient id="zdlDragonBelly" x1="0%" y1="0%" x2="100%" y2="100%">',
      '            <stop offset="0%" stop-color="#ffffff" />',
      '            <stop offset="50%" stop-color="#fef3c7" />',
      '            <stop offset="100%" stop-color="#fde68a" />',
      '          </linearGradient>',
      '          <linearGradient id="zdlDragonFlame" x1="0%" y1="0%" x2="100%" y2="0%">',
      '            <stop offset="0%" stop-color="#fef08a" />',
      '            <stop offset="35%" stop-color="#f59e0b" />',
      '            <stop offset="70%" stop-color="#dc2626" />',
      '            <stop offset="100%" stop-color="#991b1b" />',
      '          </linearGradient>',
      '          <linearGradient id="zdlDragonAntler" x1="20%" y1="100%" x2="80%" y2="0%">',
      '            <stop offset="0%" stop-color="#78350f" />',
      '            <stop offset="45%" stop-color="#b45309" />',
      '            <stop offset="85%" stop-color="#fbbf24" />',
      '            <stop offset="100%" stop-color="#fef3c7" />',
      '          </linearGradient>',
      '          <radialGradient id="zdlDragonEye" cx="50%" cy="50%" r="50%">',
      '            <stop offset="0%" stop-color="#fef08a" />',
      '            <stop offset="40%" stop-color="#ef4444" />',
      '            <stop offset="85%" stop-color="#b91c1c" />',
      '            <stop offset="100%" stop-color="#450a0a" />',
      '          </radialGradient>',
      '        </defs>',
      '        <g>',
      '          <!-- 1. Flaming Tail Plumes (龙尾 / 尾羽) -->',
      '          <path d="M 18 78 C 8 72 -4 68 -10 58 C -4 70 8 74 15 77 Z" fill="url(#zdlDragonFlame)" />',
      '          <path d="M 14 82 C 4 84 -8 92 -12 104 C -4 94 6 88 16 84 Z" fill="url(#zdlDragonFlame)" />',
      '          <path d="M 22 80 C 10 80 -6 82 -18 76 C -6 88 8 89 20 84 Z" fill="url(#zdlDragonFlame)" />',
      '          <path d="M 26 81 C 12 76 2 70 -6 64 C 4 72 16 75 24 79 Z" fill="url(#zdlDragonGold)" />',
      '          <path d="M 6 76 Q -2 72 -8 68 Q 0 74 8 77" stroke="#fde047" stroke-width="1.2" fill="none" />',
      '          <path d="M 8 83 Q -2 88 -8 94 Q 2 87 10 84" stroke="#fde047" stroke-width="1.2" fill="none" />',
      '          <!-- 2. Dorsal Spine Fiery Crest (背鬣) along serpentine back -->',
      '          <path d="M 24 78 Q 28 70 33 76 Q 38 66 44 74 Q 50 62 57 72 Q 64 58 72 70 Q 80 56 89 68 Q 98 55 107 67 Q 116 54 125 66 Q 134 52 143 64 Q 152 50 161 63 Q 170 48 180 62 Q 188 47 196 58" stroke="url(#zdlDragonFlame)" stroke-width="3.6" stroke-linecap="round" fill="none" />',
      '          <path d="M 28 76 Q 32 70 36 74 Q 42 64 48 71 Q 54 59 61 69 Q 69 56 77 67 Q 86 54 95 65 Q 104 53 113 64 Q 123 51 132 62 Q 141 49 150 61 Q 160 48 169 60 Q 178 47 186 56" stroke="#fef08a" stroke-width="1.4" stroke-linecap="round" fill="none" />',
      '          <!-- 3. Main Serpentine Body Trunk (蛇身) -->',
      '          <path d="M 20 82 C 34 96, 60 98, 86 86 C 112 74, 134 68, 158 73 C 178 77, 194 74, 206 58 C 200 50, 186 46, 172 52 C 146 63, 126 56, 102 68 C 76 80, 50 82, 30 76 C 24 74, 20 77, 20 82 Z" fill="url(#zdlDragonGold)" />',
      '          <!-- 4. Ventral Underside Belly Plates (蛇腹) -->',
      '          <path d="M 23 83 C 36 94, 60 96, 84 85 C 108 74, 130 70, 154 75 C 170 78, 185 76, 198 65 C 190 69, 172 73, 156 70 C 132 65, 110 70, 86 81 C 62 91, 38 90, 26 80 Z" fill="url(#zdlDragonBelly)" opacity="0.95" />',
      '          <!-- Transverse Belly Segmentation Grooves -->',
      '          <path d="M 38 88 L 35 91 M 48 89 L 45 93 M 58 89 L 56 93 M 68 87 L 66 91 M 78 84 L 76 88 M 88 80 L 86 84 M 98 76 L 97 80 M 108 73 L 107 77 M 118 70 L 118 74 M 128 69 L 128 73 M 138 70 L 138 74 M 148 71 L 148 75 M 158 72 L 159 76 M 168 72 L 170 76 M 178 70 L 180 74 M 188 66 L 191 70" stroke="rgba(180, 83, 9, 0.45)" stroke-width="1.2" stroke-linecap="round" />',
      '          <!-- 5. Authentic Carp Scale Texture (鲤鳞) -->',
      '          <g stroke="rgba(255, 255, 255, 0.55)" stroke-width="1.1" stroke-linecap="round" fill="none">',
      '            <path d="M 44 82 Q 48 85 52 82 M 54 81 Q 58 84 62 81 M 64 79 Q 68 82 72 79 M 74 76 Q 78 79 82 76" />',
      '            <path d="M 84 72 Q 88 75 92 72 M 94 69 Q 98 72 102 69 M 104 66 Q 108 69 112 66 M 114 64 Q 118 67 122 64" />',
      '            <path d="M 124 63 Q 128 66 132 63 M 134 63 Q 138 66 142 63 M 144 64 Q 148 67 152 64 M 154 65 Q 158 68 162 65" />',
      '            <path d="M 164 64 Q 168 67 172 64 M 174 61 Q 178 64 182 61 M 184 57 Q 188 60 192 57" />',
      '          </g>',
      '          <g stroke="rgba(146, 64, 14, 0.4)" stroke-width="1" stroke-linecap="round" fill="none">',
      '            <path d="M 49 84 Q 53 87 57 84 M 59 83 Q 63 86 67 83 M 69 81 Q 73 84 77 81 M 79 78 Q 83 81 87 78" />',
      '            <path d="M 89 74 Q 93 77 97 74 M 99 71 Q 103 74 107 71 M 109 68 Q 113 71 117 68 M 119 66 Q 123 69 127 66" />',
      '            <path d="M 129 65 Q 133 68 137 65 M 139 65 Q 143 68 147 65 M 149 66 Q 153 69 157 66 M 159 66 Q 163 69 167 66" />',
      '          </g>',
      '          <!-- 6. Hind Limb & Talons (后腿 & 鹰爪) -->',
      '          <g transform="translate(68, 86)">',
      '            <path d="M -6 0 C -12 -5 -18 -4 -22 -1 C -18 3 -12 2 -8 3 Z" fill="url(#zdlDragonFlame)" />',
      '            <path d="M 0 0 C -4 8 -8 14 -12 18 C -14 20 -18 20 -20 22 C -18 23 -14 23 -11 20 C -7 16 -3 10 2 2 Z" fill="url(#zdlDragonGold)" />',
      '            <path d="M -12 18 L -18 22 M -12 18 L -16 26 M -12 18 L -11 27 M -12 18 L -7 24" stroke="#fbbf24" stroke-width="2.4" stroke-linecap="round" />',
      '            <path d="M -18 22 L -21 23 M -16 26 L -18 29 M -11 27 L -11 30 M -7 24 L -5 26" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" />',
      '          </g>',
      '          <!-- 7. Forelimb & Imperial Eagle Talons (前腿 & 龙爪) -->',
      '          <g transform="translate(162, 72)">',
      '            <path d="M 2 2 C 8 -3 14 -3 18 0 C 14 4 8 3 4 4 Z" fill="url(#zdlDragonFlame)" />',
      '            <path d="M 0 0 C 6 6 12 11 18 14 C 20 15 22 17 24 20 C 22 20 19 18 16 16 C 11 13 5 8 -1 2 Z" fill="url(#zdlDragonGold)" />',
      '            <path d="M 18 14 L 26 12 M 18 14 L 27 17 M 18 14 L 24 22 M 18 14 L 19 23" stroke="#fbbf24" stroke-width="2.4" stroke-linecap="round" />',
      '            <path d="M 26 12 L 29 11 M 27 17 L 30 18 M 24 22 L 26 25 M 19 23 L 19 26" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" />',
      '          </g>',
      '          <!-- 8. Imperial Chinese Dragon Head (龙头) -->',
      '          <g transform="translate(196, 25)">',
      '            <!-- Rear antler tine (3D depth) -->',
      '            <path d="M 6 18 C 3 8 -5 0 -14 -6 C -11 0 -6 5 -3 14 Z" fill="url(#zdlDragonAntler)" opacity="0.75" />',
      '            <path d="M -7 1 C -12 -3 -17 -4 -21 -3 C -17 0 -13 2 -9 4 Z" fill="url(#zdlDragonAntler)" opacity="0.75" />',
      '            <!-- Mane billows (龙鬃) -->',
      '            <path d="M 2 24 C -8 16 -18 14 -26 18 C -22 11 -12 8 -2 12 Z" fill="url(#zdlDragonFlame)" />',
      '            <path d="M -1 32 C -14 32 -26 26 -34 32 C -28 24 -15 24 0 24 Z" fill="url(#zdlDragonFlame)" />',
      '            <path d="M 3 38 C -10 42 -22 40 -30 46 C -24 38 -12 36 2 35 Z" fill="url(#zdlDragonFlame)" opacity="0.9" />',
      '            <!-- Branching Stag Antler (鹿角) -->',
      '            <path d="M 10 16 C 8 4 0 -6 -10 -14 C -6 -6 0 1 4 12 Z" fill="url(#zdlDragonAntler)" />',
      '            <path d="M 1 -3 C -4 -10 -8 -15 -14 -18 C -10 -12 -7 -7 -3 -2 Z" fill="url(#zdlDragonAntler)" />',
      '            <path d="M -4 -8 C -11 -11 -18 -13 -24 -12 C -18 -8 -13 -6 -8 -4 Z" fill="url(#zdlDragonAntler)" />',
      '            <path d="M 6 14 C 4 5 -1 -4 -9 -11" stroke="#fef9c3" stroke-width="1.2" stroke-linecap="round" fill="none" />',
      '            <!-- Dragon Snout & Cranium (驼头 / 鼻与额) -->',
      '            <path d="M 4 20 C 10 14 18 13 25 15 C 32 17 38 20 42 24 C 36 26 30 27 26 27 C 28 29 32 30 30 32 C 24 32 20 28 16 26 C 12 28 6 28 2 24 Z" fill="url(#zdlDragonGold)" />',
      '            <!-- Flared Nostril & Nose Horn -->',
      '            <ellipse cx="36" cy="22" rx="2.5" ry="1.6" fill="#78350f" transform="rotate(-15 36 22)" />',
      '            <path d="M 37 20 C 39 16 42 15 44 14 C 41 18 39 19 37 20 Z" fill="url(#zdlDragonGold)" />',
      '            <!-- Open Roaring Lower Jaw & Throat (龙颚) -->',
      '            <path d="M 16 32 C 22 34 28 35 34 32 C 30 36 24 38 18 37 C 14 36 12 34 16 32 Z" fill="url(#zdlDragonGold)" />',
      '            <path d="M 22 28 C 26 29 29 30 31 31 C 28 32 25 32 22 30 Z" fill="#b91c1c" />',
      '            <!-- Razor Dragon Teeth & Fangs (龙牙) -->',
      '            <polygon points="34,26 36,30 38,26" fill="#ffffff" />',
      '            <polygon points="28,27 30,30 31,27" fill="#ffffff" />',
      '            <polygon points="24,27 25,29 26,27" fill="#ffffff" />',
      '            <polygon points="31,33 33,30 34,33" fill="#ffffff" />',
      '            <polygon points="26,34 27,32 28,34" fill="#ffffff" />',
      '            <!-- Chin Beard (龙髯) -->',
      '            <path d="M 18 37 C 14 44 8 48 0 51 C 6 45 12 42 16 37 Z" fill="url(#zdlDragonFlame)" />',
      '            <path d="M 22 36 C 20 44 16 49 10 53 C 14 47 18 43 20 37 Z" fill="url(#zdlDragonGold)" />',
      '            <!-- Penetrating Dragon Eye (龙目) -->',
      '            <path d="M 14 14 C 18 12 24 13 28 16 C 24 15 18 15 14 17 Z" fill="#92400e" />',
      '            <ellipse cx="21" cy="17" rx="3.5" ry="2.2" fill="url(#zdlDragonEye)" />',
      '            <ellipse cx="21" cy="17" rx="1.1" ry="2.0" fill="#000000" />',
      '            <circle cx="22" cy="16" r="0.7" fill="#ffffff" />',
      '            <!-- Flowing Whisker Barbels (龙须) -->',
      '            <path d="M 38 23 C 48 21, 54 26, 48 34 C 40 44, 25 45, 10 46 C -6 47, -22 44, -36 47" stroke="#fef08a" stroke-width="2.2" stroke-linecap="round" fill="none" />',
      '            <path d="M 38 23 C 48 21, 54 26, 48 34 C 40 44, 25 45, 10 46 C -6 47, -22 44, -36 47" stroke="#f59e0b" stroke-width="1.0" stroke-linecap="round" fill="none" />',
      '            <path d="M 28 32 C 34 37, 26 44, 16 45 C 4 46, -10 44, -24 48" stroke="#fbbf24" stroke-width="1.6" stroke-linecap="round" fill="none" />',
      '          </g>',
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
