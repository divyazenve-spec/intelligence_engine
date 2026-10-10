/* =====================================================================
   Zenve BI — Winged Chinese Dragon (Yinglong) Revolving "Z" Logo Controller
   Website Light Theme | Flexible Bending Serpentine Spine | Torn Wings | Sword Talons
   Smoothly bends around and revolves in 3D orbit around the central Zenve "Z" logo.
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
      '  <!-- 3D Dragon Revolving System (Flexible bending body encircling the emblem) -->',
      '  <div class="zdl-dragon-revolver">',
      '    <svg viewBox="0 0 380 380" fill="none" xmlns="http://www.w3.org/2000/svg" class="zdl-dragon-canvas">',
      '      <defs>',
      '        <!-- Imperial Dragon Gold Gradient -->',
      '        <linearGradient id="zdlDragonGold" x1="0%" y1="0%" x2="100%" y2="100%">',
      '          <stop offset="0%" stop-color="#fffbeb" />',
      '          <stop offset="20%" stop-color="#fde047" />',
      '          <stop offset="50%" stop-color="#f59e0b" />',
      '          <stop offset="80%" stop-color="#d97706" />',
      '          <stop offset="100%" stop-color="#92400e" />',
      '        </linearGradient>',
      '        <!-- Ventral Belly Scales Gradient -->',
      '        <linearGradient id="zdlDragonBelly" x1="0%" y1="0%" x2="100%" y2="100%">',
      '          <stop offset="0%" stop-color="#ffffff" />',
      '          <stop offset="45%" stop-color="#fef3c7" />',
      '          <stop offset="100%" stop-color="#fde68a" />',
      '        </linearGradient>',
      '        <!-- Fiery Mane, Crest & Tail Flame Gradient -->',
      '        <linearGradient id="zdlDragonFlame" x1="0%" y1="0%" x2="100%" y2="0%">',
      '          <stop offset="0%" stop-color="#fef08a" />',
      '          <stop offset="30%" stop-color="#f59e0b" />',
      '          <stop offset="65%" stop-color="#dc2626" />',
      '          <stop offset="100%" stop-color="#991b1b" />',
      '        </linearGradient>',
      '        <!-- Torn Wing Leather Membrane Gradient -->',
      '        <linearGradient id="zdlWingLeather" x1="0%" y1="0%" x2="100%" y2="100%">',
      '          <stop offset="0%" stop-color="#fef08a" />',
      '          <stop offset="25%" stop-color="#f59e0b" />',
      '          <stop offset="55%" stop-color="#b45309" />',
      '          <stop offset="85%" stop-color="#78350f" />',
      '          <stop offset="100%" stop-color="#451a03" />',
      '        </linearGradient>',
      '        <!-- Wing Bone Strut Gradient -->',
      '        <linearGradient id="zdlWingBone" x1="0%" y1="0%" x2="100%" y2="100%">',
      '          <stop offset="0%" stop-color="#ffffff" />',
      '          <stop offset="35%" stop-color="#fde047" />',
      '          <stop offset="80%" stop-color="#d97706" />',
      '          <stop offset="100%" stop-color="#78350f" />',
      '        </linearGradient>',
      '        <!-- Sword Blade Talon Steel Gradient -->',
      '        <linearGradient id="zdlSwordSteel" x1="0%" y1="0%" x2="100%" y2="100%">',
      '          <stop offset="0%" stop-color="#ffffff" />',
      '          <stop offset="30%" stop-color="#f1f5f9" />',
      '          <stop offset="60%" stop-color="#cbd5e1" />',
      '          <stop offset="85%" stop-color="#94a3b8" />',
      '          <stop offset="100%" stop-color="#475569" />',
      '        </linearGradient>',
      '        <!-- Sword Edge Razor Highlight -->',
      '        <linearGradient id="zdlSwordEdge" x1="0%" y1="0%" x2="100%" y2="0%">',
      '          <stop offset="0%" stop-color="#ffffff" />',
      '          <stop offset="50%" stop-color="#fef08a" />',
      '          <stop offset="100%" stop-color="#f59e0b" />',
      '        </linearGradient>',
      '        <!-- Stag Antler Horn Gradient -->',
      '        <linearGradient id="zdlDragonAntler" x1="20%" y1="100%" x2="80%" y2="0%">',
      '          <stop offset="0%" stop-color="#78350f" />',
      '          <stop offset="45%" stop-color="#b45309" />',
      '          <stop offset="85%" stop-color="#fbbf24" />',
      '          <stop offset="100%" stop-color="#fef3c7" />',
      '        </linearGradient>',
      '        <!-- Piercing Dragon Eye Radial Gradient -->',
      '        <radialGradient id="zdlDragonEye" cx="50%" cy="50%" r="50%">',
      '          <stop offset="0%" stop-color="#fef08a" />',
      '          <stop offset="35%" stop-color="#ef4444" />',
      '          <stop offset="75%" stop-color="#b91c1c" />',
      '          <stop offset="100%" stop-color="#450a0a" />',
      '        </radialGradient>',
      '      </defs>',
      '      <!-- Dragon Figure encompassing entire flexible dragon -->',
      '      <g id="zdl-dragon-figure">',
      '        <!-- LAYER 1: BACKGROUND TORN WING (Behind Body Spine) -->',
      '        <g id="zdl-wing-back" class="zdl-wing-back-anim">',
      '          <path d="M 195 285 C 190 320, 160 345, 135 365 C 142 355, 140 348, 148 344 C 144 338, 148 330, 158 328 C 152 320, 158 312, 170 310 C 165 300, 175 295, 195 285 Z" fill="url(#zdlWingLeather)" opacity="0.82" />',
      '          <path d="M 160 338 C 158 344, 154 345, 153 340 C 154 336, 159 335, 160 338 Z" fill="#ffffff" opacity="0.65" />',
      '          <path d="M 175 318 C 173 323, 169 323, 168 319 C 170 315, 174 315, 175 318 Z" fill="#ffffff" opacity="0.65" />',
      '          <path d="M 195 285 Q 165 320 135 365" stroke="url(#zdlWingBone)" stroke-width="2.6" stroke-linecap="round" fill="none" />',
      '          <path d="M 195 285 Q 172 312 148 344" stroke="url(#zdlWingBone)" stroke-width="2.2" stroke-linecap="round" fill="none" />',
      '          <path d="M 195 285 Q 180 304 158 328" stroke="url(#zdlWingBone)" stroke-width="1.8" stroke-linecap="round" fill="none" />',
      '          <path d="M 135 365 L 126 374 L 132 368 Z" fill="#ffffff" stroke="#d97706" stroke-width="0.8" />',
      '        </g>',
      '        <!-- LAYER 2: HINDQUARTERS & HIND SWORD TALONS -->',
      '        <g id="zdl-hind-limb" class="zdl-limb-anim">',
      '          <path d="M 98 178 C 82 186, 70 200, 62 214 C 58 222, 54 228, 48 234 C 54 233, 62 227, 68 220 C 76 210, 88 198, 102 188 Z" fill="url(#zdlDragonGold)" />',
      '          <path d="M 72 208 C 62 212, 52 210, 44 204 C 52 202, 60 203, 68 206 Z" fill="url(#zdlDragonFlame)" />',
      '          <circle cx="50" cy="232" r="5" fill="#b45309" />',
      '          <!-- 4 Razor-Sharp Curved Sword Talons (刀刃龙爪) -->',
      '          <path d="M 48 234 C 40 244, 30 255, 18 262 C 26 254, 34 242, 44 232 Z" fill="url(#zdlSwordSteel)" stroke="url(#zdlSwordEdge)" stroke-width="0.9" />',
      '          <path d="M 50 236 C 45 250, 36 264, 25 274 C 32 262, 40 250, 48 235 Z" fill="url(#zdlSwordSteel)" stroke="url(#zdlSwordEdge)" stroke-width="0.9" />',
      '          <path d="M 52 237 C 50 252, 46 268, 38 280 C 42 267, 46 254, 50 236 Z" fill="url(#zdlSwordSteel)" stroke="url(#zdlSwordEdge)" stroke-width="0.9" />',
      '          <path d="M 54 231 C 58 240, 62 248, 68 254 C 64 246, 60 238, 55 230 Z" fill="url(#zdlSwordSteel)" stroke="url(#zdlSwordEdge)" stroke-width="0.9" />',
      '          <circle cx="18" cy="262" r="1.2" fill="#ffffff" />',
      '          <circle cx="25" cy="274" r="1.2" fill="#ffffff" />',
      '          <circle cx="38" cy="280" r="1.2" fill="#ffffff" />',
      '        </g>',
      '        <!-- LAYER 3: SERPENTINE BENDING BODY (Spine curved organically around Z logo) -->',
      '        <g id="zdl-spine-body" class="zdl-spine-anim">',
      '          <!-- Dorsal Spine Fiery Crest Spikes -->',
      '          <path d="M 124 102 Q 112 110 110 122 Q 98 132 96 146 Q 84 160 84 176 Q 74 192 78 208 Q 72 226 80 242 Q 80 260 92 274 Q 98 290 114 302 Q 124 316 142 324 Q 156 336 176 340 Q 194 346 214 344 Q 232 342 248 334 Q 266 326 278 312 Q 294 300 302 282 Q 312 264 314 244 Q 318 224 316 204" stroke="url(#zdlDragonFlame)" stroke-width="4.8" stroke-linecap="round" fill="none" />',
      '          <path d="M 126 104 Q 115 112 113 124 Q 101 134 99 148 Q 87 162 87 178 Q 77 194 81 210 Q 75 228 83 244 Q 83 262 95 276 Q 101 292 117 304 Q 127 318 145 326 Q 159 338 179 342 Q 197 348 217 346 Q 235 344 251 336 Q 269 328 281 314 Q 297 302 305 284 Q 315 266 317 246" stroke="#fef08a" stroke-width="1.8" stroke-linecap="round" fill="none" />',
      '          <!-- Main Flexible Serpentine Trunk (curved along radius R ~ 112px) -->',
      '          <path d="M 124 102 C 100 124, 82 154, 80 188 C 78 224, 88 258, 108 284 C 130 312, 164 330, 202 334 C 240 338, 276 322, 298 294 C 316 270, 320 238, 314 208 C 304 212, 298 228, 290 248 C 278 276, 252 296, 222 300 C 188 304, 156 292, 134 268 C 114 246, 104 216, 106 186 C 108 158, 122 134, 138 116 Z" fill="url(#zdlDragonGold)" />',
      '          <!-- Ventral Belly Plates (Inner curve embracing Z emblem) -->',
      '          <path d="M 138 116 C 122 134, 108 158, 106 186 C 104 216, 114 246, 134 268 C 156 292, 188 304, 222 300 C 252 296, 278 276, 290 248 C 284 254, 268 270, 246 278 C 218 286, 188 284, 162 266 C 138 248, 124 220, 122 190 C 120 164, 130 140, 144 122 Z" fill="url(#zdlDragonBelly)" opacity="0.95" />',
      '          <!-- Belly Segment Grooves -->',
      '          <g stroke="rgba(180, 83, 9, 0.45)" stroke-width="1.3" stroke-linecap="round">',
      '            <line x1="135" y1="126" x2="143" y2="123" />',
      '            <line x1="128" y1="140" x2="137" y2="138" />',
      '            <line x1="122" y1="156" x2="132" y2="155" />',
      '            <line x1="117" y1="172" x2="128" y2="173" />',
      '            <line x1="114" y1="190" x2="126" y2="192" />',
      '            <line x1="116" y1="208" x2="127" y2="210" />',
      '            <line x1="120" y1="226" x2="132" y2="228" />',
      '            <line x1="128" y1="244" x2="140" y2="244" />',
      '            <line x1="140" y1="260" x2="152" y2="258" />',
      '            <line x1="156" y1="274" x2="167" y2="270" />',
      '            <line x1="176" y1="284" x2="185" y2="278" />',
      '            <line x1="198" y1="290" x2="204" y2="283" />',
      '            <line x1="220" y1="291" x2="224" y2="284" />',
      '            <line x1="242" y1="287" x2="244" y2="279" />',
      '            <line x1="262" y1="277" x2="262" y2="270" />',
      '            <line x1="278" y1="263" x2="276" y2="257" />',
      '          </g>',
      '          <!-- Carp Scales Texture -->',
      '          <g stroke="rgba(255, 255, 255, 0.6)" stroke-width="1.2" stroke-linecap="round" fill="none">',
      '            <path d="M 124 140 Q 120 146 122 152 M 116 158 Q 112 164 114 170 M 112 178 Q 108 184 110 190" />',
      '            <path d="M 112 198 Q 108 204 110 210 M 114 218 Q 112 224 116 230 M 122 238 Q 120 244 126 250" />',
      '            <path d="M 132 258 Q 132 264 140 268 M 146 274 Q 148 280 156 284 M 164 288 Q 168 294 176 296" />',
      '            <path d="M 186 298 Q 192 302 200 302 M 210 302 Q 216 304 224 302 M 234 300 Q 240 300 248 296" />',
      '            <path d="M 258 292 Q 264 290 270 284 M 278 278 Q 284 274 288 266 M 294 258 Q 298 252 300 244" />',
      '          </g>',
      '          <g stroke="rgba(146, 64, 14, 0.45)" stroke-width="1.0" stroke-linecap="round" fill="none">',
      '            <path d="M 128 144 Q 124 150 126 156 M 120 162 Q 116 168 118 174 M 116 182 Q 112 188 114 194" />',
      '            <path d="M 116 202 Q 112 208 114 214 M 118 222 Q 116 228 120 234 M 126 242 Q 124 248 130 254" />',
      '            <path d="M 136 262 Q 136 268 144 272 M 150 278 Q 152 284 160 288 M 168 292 Q 172 298 180 300" />',
      '            <path d="M 190 302 Q 196 306 204 306 M 214 306 Q 220 308 228 306 M 238 304 Q 244 304 252 300" />',
      '          </g>',
      '        </g>',
      '        <!-- LAYER 4: FLEXIBLE UNDULATING TAIL & FLAMING BRUSH (Upper-Left) -->',
      '        <g id="zdl-tail" class="zdl-tail-anim">',
      '          <path d="M 130 110 C 138 96, 142 82, 134 68 C 124 54, 108 52, 94 60 C 82 70, 84 86, 96 98 C 104 106, 114 110, 124 104 Z" fill="url(#zdlDragonGold)" />',
      '          <path d="M 134 68 Q 124 46 112 44 Q 96 42 84 54 Q 74 68 76 84" stroke="url(#zdlDragonFlame)" stroke-width="3.2" stroke-linecap="round" fill="none" />',
      '          <!-- Auspicious Flaming Tail Tuft Plumes -->',
      '          <path d="M 108 52 C 104 36, 92 20, 76 12 C 78 28, 86 38, 94 48 Z" fill="url(#zdlDragonFlame)" />',
      '          <path d="M 94 60 C 80 50, 60 46, 44 52 C 54 62, 68 68, 82 70 Z" fill="url(#zdlDragonFlame)" />',
      '          <path d="M 84 70 C 66 66, 46 72, 32 86 C 48 88, 64 86, 78 82 Z" fill="url(#zdlDragonFlame)" />',
      '          <path d="M 84 86 C 70 88, 54 98, 46 112 C 58 106, 72 100, 86 94 Z" fill="url(#zdlDragonFlame)" />',
      '          <path d="M 98 56 C 88 44, 76 36, 64 32 C 70 42, 78 50, 88 56 Z" fill="url(#zdlDragonGold)" />',
      '          <path d="M 88 68 C 74 66, 58 72, 48 80 C 58 80, 70 78, 80 74 Z" fill="url(#zdlDragonGold)" />',
      '          <path d="M 76 12 Q 68 8 60 4 Q 66 16 72 24" stroke="#fef08a" stroke-width="1.4" fill="none" />',
      '          <path d="M 44 52 Q 36 50 28 50 Q 36 60 42 66" stroke="#fef08a" stroke-width="1.4" fill="none" />',
      '        </g>',
      '        <!-- LAYER 5: FOREQUARTERS & VICIOUS SWORD CLAWS -->',
      '        <g id="zdl-fore-limb" class="zdl-forelimb-anim">',
      '          <path d="M 286 260 C 298 274, 314 286, 328 296 C 334 300, 340 304, 348 306 C 344 300, 336 294, 328 288 C 316 278, 304 266, 294 252 Z" fill="url(#zdlDragonGold)" />',
      '          <path d="M 314 280 C 326 284, 338 282, 346 276 C 338 274, 328 275, 318 278 Z" fill="url(#zdlDragonFlame)" />',
      '          <circle cx="342" cy="302" r="5.5" fill="#b45309" />',
      '          <!-- 4 Razor-Sharp Curved Sword Talons (剑刃龙爪) -->',
      '          <path d="M 344 298 C 354 292, 368 288, 382 284 C 372 292, 360 298, 348 302 Z" fill="url(#zdlSwordSteel)" stroke="url(#zdlSwordEdge)" stroke-width="1.0" />',
      '          <path d="M 346 302 C 358 302, 374 304, 388 304 C 374 308, 360 308, 346 306 Z" fill="url(#zdlSwordSteel)" stroke="url(#zdlSwordEdge)" stroke-width="1.0" />',
      '          <path d="M 344 306 C 356 312, 370 320, 384 326 C 370 322, 358 318, 344 310 Z" fill="url(#zdlSwordSteel)" stroke="url(#zdlSwordEdge)" stroke-width="1.0" />',
      '          <path d="M 340 308 C 348 318, 356 330, 366 342 C 356 332, 348 322, 338 312 Z" fill="url(#zdlSwordSteel)" stroke="url(#zdlSwordEdge)" stroke-width="1.0" />',
      '          <circle cx="382" cy="284" r="1.3" fill="#ffffff" />',
      '          <circle cx="388" cy="304" r="1.3" fill="#ffffff" />',
      '          <circle cx="384" cy="326" r="1.3" fill="#ffffff" />',
      '          <circle cx="366" cy="342" r="1.3" fill="#ffffff" />',
      '        </g>',
      '        <!-- LAYER 6: FOREGROUND LARGE TORN WING (Primary Yinglong Wing with Shreds & Tears) -->',
      '        <g id="zdl-wing-front" class="zdl-wing-front-anim">',
      '          <path d="M 230 310 C 238 335, 256 358, 276 376 C 270 368, 254 346, 246 322 Z" fill="url(#zdlWingBone)" />',
      '          <circle cx="276" cy="376" r="4.5" fill="#b45309" />',
      '          <path d="M 276 376 C 286 384, 292 394, 296 404 C 290 396, 284 388, 276 380 Z" fill="url(#zdlSwordSteel)" stroke="#f59e0b" stroke-width="0.8" />',
      '          <!-- Tattered & Torn Wing Membrane with Rips and Holes -->',
      '          <path d="M 276 376 C 295 362, 322 344, 348 320 C 340 326, 332 328, 326 318 C 334 310, 346 296, 356 276 C 346 282, 338 280, 332 270 C 340 262, 348 248, 352 230 C 344 236, 336 236, 330 226 C 324 238, 308 260, 288 282 C 264 300, 246 308, 230 310 Z" fill="url(#zdlWingLeather)" />',
      '          <!-- Torn Battle-Punctures in Wing -->',
      '          <path d="M 314 310 C 310 320, 302 322, 300 314 C 302 306, 310 305, 314 310 Z" fill="#ffffff" opacity="0.75" />',
      '          <path d="M 328 274 C 324 282, 318 282, 316 276 C 318 270, 324 270, 328 274 Z" fill="#ffffff" opacity="0.75" />',
      '          <!-- Shredded Rip Cuts -->',
      '          <path d="M 334 322 L 322 330 M 342 284 L 330 292 M 338 240 L 328 248" stroke="#451a03" stroke-width="1.4" stroke-linecap="round" />',
      '          <!-- 4 Wing Finger Bone Struts -->',
      '          <path d="M 276 376 Q 312 350 348 320" stroke="url(#zdlWingBone)" stroke-width="3.4" stroke-linecap="round" fill="none" />',
      '          <path d="M 276 376 Q 320 326 356 276" stroke="url(#zdlWingBone)" stroke-width="3.0" stroke-linecap="round" fill="none" />',
      '          <path d="M 276 376 Q 318 298 352 230" stroke="url(#zdlWingBone)" stroke-width="2.6" stroke-linecap="round" fill="none" />',
      '          <path d="M 276 376 Q 296 280 320 220" stroke="url(#zdlWingBone)" stroke-width="2.2" stroke-linecap="round" fill="none" />',
      '          <circle cx="312" cy="350" r="2.2" fill="#fffbeb" />',
      '          <circle cx="320" cy="326" r="2.0" fill="#fffbeb" />',
      '          <circle cx="318" cy="298" r="1.8" fill="#fffbeb" />',
      '        </g>',
      '        <!-- LAYER 7: IMPERIAL DRAGON HEAD, ANTLERS & WHISKERS -->',
      '        <g id="zdl-head" class="zdl-head-anim">',
      '          <!-- Rear Antler Tines (Background 3D Depth) -->',
      '          <g opacity="0.75">',
      '            <path d="M 326 198 C 334 184, 342 168, 346 150 C 342 160, 334 170, 324 180 Z" fill="url(#zdlDragonAntler)" />',
      '            <path d="M 338 174 C 348 168, 356 160, 362 152 C 354 160, 346 166, 336 172 Z" fill="url(#zdlDragonAntler)" />',
      '          </g>',
      '          <!-- Fiery Mane Locks (龙鬃) -->',
      '          <path d="M 314 208 C 328 206, 342 208, 356 216 C 346 206, 334 200, 320 200 Z" fill="url(#zdlDragonFlame)" />',
      '          <path d="M 316 200 C 332 194, 348 194, 364 200 C 350 190, 334 186, 318 190 Z" fill="url(#zdlDragonFlame)" />',
      '          <path d="M 320 192 C 336 182, 354 180, 372 184 C 356 176, 338 174, 322 180 Z" fill="url(#zdlDragonFlame)" />',
      '          <!-- Main Branching Stag Antler (鹿角) -->',
      '          <path d="M 322 190 C 332 172, 344 150, 354 126 C 346 142, 334 162, 320 180 Z" fill="url(#zdlDragonAntler)" />',
      '          <path d="M 334 168 C 346 158, 358 146, 368 132 C 356 146, 344 156, 332 164 Z" fill="url(#zdlDragonAntler)" />',
      '          <path d="M 346 144 C 358 136, 368 126, 376 114 C 366 128, 356 136, 344 142 Z" fill="url(#zdlDragonAntler)" />',
      '          <path d="M 322 188 Q 338 156 354 126" stroke="#fef9c3" stroke-width="1.3" stroke-linecap="round" fill="none" />',
      '          <!-- Dragon Cranium, Snout & Upper Jaw (驼头 / 吻部) -->',
      '          <path d="M 310 216 C 318 214, 328 216, 336 222 C 346 230, 354 240, 364 248 C 356 250, 346 250, 338 248 C 342 254, 346 258, 342 262 C 334 262, 328 256, 322 252 C 316 254, 308 252, 302 246 C 304 236, 306 226, 310 216 Z" fill="url(#zdlDragonGold)" />',
      '          <ellipse cx="356" cy="246" rx="3.2" ry="2.0" fill="#78350f" transform="rotate(-20 356 246)" />',
      '          <path d="M 358 244 L 366 238 L 360 248 Z" fill="url(#zdlDragonGold)" />',
      '          <!-- Open Roaring Lower Jaw & Throat (龙颚) -->',
      '          <path d="M 322 252 C 330 256, 340 258, 348 254 C 342 262, 332 266, 324 264 C 318 262, 316 258, 322 252 Z" fill="url(#zdlDragonGold)" />',
      '          <path d="M 330 250 C 336 252, 342 252, 346 252 C 340 256, 334 256, 330 254 Z" fill="#991b1b" />',
      '          <!-- Razor Teeth & Fangs (龙牙) -->',
      '          <polygon points="348,248 352,256 354,248" fill="#ffffff" />',
      '          <polygon points="340,249 344,255 345,249" fill="#ffffff" />',
      '          <polygon points="334,249 336,253 338,249" fill="#ffffff" />',
      '          <polygon points="344,256 347,251 349,256" fill="#ffffff" />',
      '          <polygon points="338,258 340,253 342,258" fill="#ffffff" />',
      '          <!-- Chin Beard (龙髯) -->',
      '          <path d="M 324 264 C 320 274, 312 282, 302 288 C 310 280, 318 274, 322 266 Z" fill="url(#zdlDragonFlame)" />',
      '          <path d="M 328 262 C 326 272, 320 280, 312 286 C 318 278, 324 272, 326 264 Z" fill="url(#zdlDragonGold)" />',
      '          <!-- Piercing Dragon Eye (龙目) -->',
      '          <path d="M 324 220 C 330 216, 338 218, 344 224 C 338 222, 330 221, 324 224 Z" fill="#78350f" />',
      '          <ellipse cx="334" cy="226" rx="4.2" ry="2.6" fill="url(#zdlDragonEye)" />',
      '          <ellipse cx="334" cy="226" rx="1.3" ry="2.4" fill="#000000" />',
      '          <circle cx="335" cy="225" r="0.8" fill="#ffffff" />',
      '          <!-- Long Flowing Whisker Barbels (龙须) -->',
      '          <path d="M 358 246 C 374 242, 386 248, 382 260 C 372 276, 348 278, 330 282 C 310 286, 290 284, 272 290" stroke="#fef08a" stroke-width="2.4" stroke-linecap="round" fill="none" class="zdl-barbel-1-anim" />',
      '          <path d="M 358 246 C 374 242, 386 248, 382 260 C 372 276, 348 278, 330 282 C 310 286, 290 284, 272 290" stroke="#d97706" stroke-width="1.0" stroke-linecap="round" fill="none" />',
      '          <path d="M 346 258 C 356 266, 350 276, 338 280 C 322 284, 304 282, 286 288" stroke="#fbbf24" stroke-width="1.8" stroke-linecap="round" fill="none" class="zdl-barbel-2-anim" />',
      '        </g>',
      '      </g>',
      '    </svg>',
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
