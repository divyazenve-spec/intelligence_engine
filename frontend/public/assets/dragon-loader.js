/* =====================================================================
   Zenve BI — Adaptive Thematic Celestial Stars Revolving Logo Loader
   Dynamic Palette Adaptation per Page & Dashboard Domain:
     - Theme Colors automatically adapt to the loaded dashboard/subdomain
     - Glowing Ambient Aura, Celestial Orbit Rings, Twinkling Stars
     - Dynamic Category Pill Badge & Real-Time Sync Indicator
   ===================================================================== */
(function () {
  'use strict';

  var LOADER_ID = 'zenve-dragon-loader';
  var _lastShownAt = 0;
  var _hideTimer = null;
  var MIN_DISPLAY_MS = 450; // Smooth viewing window for the revolving stars animation

  // Comprehensive theme registry for all 25 Zenve BI domains & subdomains
  var THEMES = {
    'executive': {
      tag: 'Executive Control',
      primary: '#0284c7',
      secondary: '#38bdf8',
      light: '#bae6fd',
      dark: '#0369a1',
      accent: '#7dd3fc',
      glow: 'rgba(2, 132, 199, 0.22)',
      glowBorder: 'rgba(2, 132, 199, 0.38)',
      coreBorder: 'rgba(2, 132, 199, 0.68)',
      coreInner: '#f0f9ff',
      bgTint: 'rgba(240, 249, 255, 0.96)',
      badgeBg: '#e0f2fe',
      badgeBorder: '#bae6fd',
      badgeColor: '#0369a1',
      starGlow1: 'rgba(2, 132, 199, 0.95)',
      starGlow2: 'rgba(56, 189, 248, 0.70)',
      runnerGrad: 'linear-gradient(90deg, transparent, #38bdf8, #0284c7, #0369a1, transparent)',
      titleGrad: 'linear-gradient(135deg, #0f172a 0%, #1e293b 35%, #0284c7 70%, #38bdf8 100%)'
    },
    'revenue-sales': {
      tag: 'Revenue & Sales',
      primary: '#06b6d4',
      secondary: '#00f2fe',
      light: '#a5f3fc',
      dark: '#0891b2',
      accent: '#22d3ee',
      glow: 'rgba(6, 182, 212, 0.22)',
      glowBorder: 'rgba(6, 182, 212, 0.38)',
      coreBorder: 'rgba(6, 182, 212, 0.68)',
      coreInner: '#ecfeff',
      bgTint: 'rgba(236, 254, 255, 0.96)',
      badgeBg: '#cffafe',
      badgeBorder: '#a5f3fc',
      badgeColor: '#0e7490',
      starGlow1: 'rgba(6, 182, 212, 0.95)',
      starGlow2: 'rgba(34, 211, 238, 0.70)',
      runnerGrad: 'linear-gradient(90deg, transparent, #22d3ee, #06b6d4, #0891b2, transparent)',
      titleGrad: 'linear-gradient(135deg, #0f172a 0%, #1e293b 35%, #0891b2 70%, #06b6d4 100%)'
    },
    'orders-operations': {
      tag: 'Operations & Dispatch',
      primary: '#2563eb',
      secondary: '#38bdf8',
      light: '#bfdbfe',
      dark: '#1d4ed8',
      accent: '#60a5fa',
      glow: 'rgba(37, 99, 235, 0.22)',
      glowBorder: 'rgba(37, 99, 235, 0.38)',
      coreBorder: 'rgba(37, 99, 235, 0.68)',
      coreInner: '#eff6ff',
      bgTint: 'rgba(239, 246, 255, 0.96)',
      badgeBg: '#dbeafe',
      badgeBorder: '#bfdbfe',
      badgeColor: '#1e40af',
      starGlow1: 'rgba(37, 99, 235, 0.95)',
      starGlow2: 'rgba(96, 165, 250, 0.70)',
      runnerGrad: 'linear-gradient(90deg, transparent, #60a5fa, #2563eb, #1d4ed8, transparent)',
      titleGrad: 'linear-gradient(135deg, #0f172a 0%, #1e293b 35%, #1d4ed8 70%, #3b82f6 100%)'
    },
    'products-inventory': {
      tag: 'Products & Inventory',
      primary: '#9333ea',
      secondary: '#a855f7',
      light: '#e9d5ff',
      dark: '#7c3aed',
      accent: '#c084fc',
      glow: 'rgba(147, 51, 234, 0.24)',
      glowBorder: 'rgba(147, 51, 234, 0.38)',
      coreBorder: 'rgba(147, 51, 234, 0.68)',
      coreInner: '#faf5ff',
      bgTint: 'rgba(250, 245, 255, 0.96)',
      badgeBg: '#f3e8ff',
      badgeBorder: '#e9d5ff',
      badgeColor: '#7e22ce',
      starGlow1: 'rgba(147, 51, 234, 0.95)',
      starGlow2: 'rgba(192, 132, 252, 0.70)',
      runnerGrad: 'linear-gradient(90deg, transparent, #c084fc, #9333ea, #6b21a8, transparent)',
      titleGrad: 'linear-gradient(135deg, #0f172a 0%, #1e293b 35%, #7c3aed 70%, #a855f7 100%)'
    },
    'pharmacy': {
      tag: 'Pharmacy Dispensary',
      primary: '#ea580c',
      secondary: '#f97316',
      light: '#fed7aa',
      dark: '#c2410c',
      accent: '#fb923c',
      glow: 'rgba(234, 88, 12, 0.22)',
      glowBorder: 'rgba(234, 88, 12, 0.38)',
      coreBorder: 'rgba(234, 88, 12, 0.68)',
      coreInner: '#fff7ed',
      bgTint: 'rgba(255, 247, 237, 0.96)',
      badgeBg: '#ffedd5',
      badgeBorder: '#fed7aa',
      badgeColor: '#9a3412',
      starGlow1: 'rgba(234, 88, 12, 0.95)',
      starGlow2: 'rgba(251, 146, 60, 0.70)',
      runnerGrad: 'linear-gradient(90deg, transparent, #fb923c, #ea580c, #c2410c, transparent)',
      titleGrad: 'linear-gradient(135deg, #0f172a 0%, #1e293b 35%, #c2410c 70%, #f97316 100%)'
    },
    'veterinary-services': {
      tag: 'Veterinary Services',
      primary: '#db2777',
      secondary: '#ec4899',
      light: '#fbcfe8',
      dark: '#be185d',
      accent: '#f472b6',
      glow: 'rgba(219, 39, 119, 0.22)',
      glowBorder: 'rgba(219, 39, 119, 0.38)',
      coreBorder: 'rgba(219, 39, 119, 0.68)',
      coreInner: '#fdf2f8',
      bgTint: 'rgba(253, 242, 248, 0.96)',
      badgeBg: '#fce7f3',
      badgeBorder: '#fbcfe8',
      badgeColor: '#9d174d',
      starGlow1: 'rgba(219, 39, 119, 0.95)',
      starGlow2: 'rgba(244, 114, 182, 0.70)',
      runnerGrad: 'linear-gradient(90deg, transparent, #f472b6, #db2777, #be185d, transparent)',
      titleGrad: 'linear-gradient(135deg, #0f172a 0%, #1e293b 35%, #be185d 70%, #ec4899 100%)'
    },
    'doctors': {
      tag: 'Doctor Practitioners',
      primary: '#0891b2',
      secondary: '#06b6d4',
      light: '#a5f3fc',
      dark: '#0e7490',
      accent: '#22d3ee',
      glow: 'rgba(8, 145, 178, 0.22)',
      glowBorder: 'rgba(8, 145, 178, 0.38)',
      coreBorder: 'rgba(8, 145, 178, 0.68)',
      coreInner: '#ecfeff',
      bgTint: 'rgba(236, 254, 255, 0.96)',
      badgeBg: '#cffafe',
      badgeBorder: '#a5f3fc',
      badgeColor: '#155e75',
      starGlow1: 'rgba(8, 145, 178, 0.95)',
      starGlow2: 'rgba(34, 211, 238, 0.70)',
      runnerGrad: 'linear-gradient(90deg, transparent, #22d3ee, #0891b2, #0e7490, transparent)',
      titleGrad: 'linear-gradient(135deg, #0f172a 0%, #1e293b 35%, #0e7490 70%, #06b6d4 100%)'
    },
    'clinics-hospitals': {
      tag: 'Clinics & Hospitals',
      primary: '#7c3aed',
      secondary: '#8b5cf6',
      light: '#ddd6fe',
      dark: '#6d28d9',
      accent: '#a78bfa',
      glow: 'rgba(124, 58, 237, 0.24)',
      glowBorder: 'rgba(124, 58, 237, 0.38)',
      coreBorder: 'rgba(124, 58, 237, 0.68)',
      coreInner: '#f5f3ff',
      bgTint: 'rgba(245, 243, 255, 0.96)',
      badgeBg: '#ede9fe',
      badgeBorder: '#ddd6fe',
      badgeColor: '#5b21b6',
      starGlow1: 'rgba(124, 58, 237, 0.95)',
      starGlow2: 'rgba(167, 139, 250, 0.70)',
      runnerGrad: 'linear-gradient(90deg, transparent, #a78bfa, #7c3aed, #5b21b6, transparent)',
      titleGrad: 'linear-gradient(135deg, #0f172a 0%, #1e293b 35%, #6d28d9 70%, #8b5cf6 100%)'
    },
    'customers-360': {
      tag: 'Customers 360°',
      primary: '#059669',
      secondary: '#10b981',
      light: '#a7f3d0',
      dark: '#047857',
      accent: '#34d399',
      glow: 'rgba(5, 150, 105, 0.22)',
      glowBorder: 'rgba(5, 150, 105, 0.38)',
      coreBorder: 'rgba(5, 150, 105, 0.68)',
      coreInner: '#ecfdf5',
      bgTint: 'rgba(240, 253, 250, 0.96)',
      badgeBg: '#d1fae5',
      badgeBorder: '#a7f3d0',
      badgeColor: '#065f46',
      starGlow1: 'rgba(5, 150, 105, 0.95)',
      starGlow2: 'rgba(52, 211, 153, 0.70)',
      runnerGrad: 'linear-gradient(90deg, transparent, #34d399, #059669, #047857, transparent)',
      titleGrad: 'linear-gradient(135deg, #0f172a 0%, #1e293b 35%, #047857 70%, #10b981 100%)'
    },
    'pets-360': {
      tag: 'Pets 360° Health',
      primary: '#d97706',
      secondary: '#f59e0b',
      light: '#fde68a',
      dark: '#b45309',
      accent: '#fbbf24',
      glow: 'rgba(217, 119, 6, 0.24)',
      glowBorder: 'rgba(217, 119, 6, 0.38)',
      coreBorder: 'rgba(217, 119, 6, 0.68)',
      coreInner: '#fefce8',
      bgTint: 'rgba(254, 252, 232, 0.96)',
      badgeBg: '#fef3c7',
      badgeBorder: '#fde68a',
      badgeColor: '#92400e',
      starGlow1: 'rgba(217, 119, 6, 0.95)',
      starGlow2: 'rgba(251, 191, 36, 0.70)',
      runnerGrad: 'linear-gradient(90deg, transparent, #fbbf24, #d97706, #92400e, transparent)',
      titleGrad: 'linear-gradient(135deg, #0f172a 0%, #1e293b 35%, #b45309 70%, #f59e0b 100%)'
    },
    'employees-hr': {
      tag: 'Human Resources & Talent',
      primary: '#4f46e5',
      secondary: '#6366f1',
      light: '#c7d2fe',
      dark: '#4338ca',
      accent: '#818cf8',
      glow: 'rgba(79, 70, 229, 0.24)',
      glowBorder: 'rgba(79, 70, 229, 0.38)',
      coreBorder: 'rgba(79, 70, 229, 0.68)',
      coreInner: '#eef2ff',
      bgTint: 'rgba(238, 242, 255, 0.96)',
      badgeBg: '#e0e7ff',
      badgeBorder: '#c7d2fe',
      badgeColor: '#3730a3',
      starGlow1: 'rgba(79, 70, 229, 0.95)',
      starGlow2: 'rgba(129, 140, 248, 0.70)',
      runnerGrad: 'linear-gradient(90deg, transparent, #818cf8, #4f46e5, #3730a3, transparent)',
      titleGrad: 'linear-gradient(135deg, #0f172a 0%, #1e293b 35%, #4338ca 70%, #6366f1 100%)'
    },
    'finance-accounting': {
      tag: 'Finance & Treasury',
      primary: '#ca8a04',
      secondary: '#eab308',
      light: '#fef08a',
      dark: '#a16207',
      accent: '#facc15',
      glow: 'rgba(202, 138, 4, 0.25)',
      glowBorder: 'rgba(202, 138, 4, 0.38)',
      coreBorder: 'rgba(202, 138, 4, 0.68)',
      coreInner: '#fefce8',
      bgTint: 'rgba(254, 252, 232, 0.96)',
      badgeBg: '#fef9c3',
      badgeBorder: '#fef08a',
      badgeColor: '#854d0e',
      starGlow1: 'rgba(202, 138, 4, 0.95)',
      starGlow2: 'rgba(250, 204, 21, 0.70)',
      runnerGrad: 'linear-gradient(90deg, transparent, #facc15, #ca8a04, #854d0e, transparent)',
      titleGrad: 'linear-gradient(135deg, #0f172a 0%, #1e293b 35%, #a16207 70%, #eab308 100%)'
    },
    'marketing': {
      tag: 'Growth & Marketing',
      primary: '#e11d48',
      secondary: '#f43f5e',
      light: '#fecdd3',
      dark: '#be123c',
      accent: '#fb7185',
      glow: 'rgba(225, 29, 72, 0.24)',
      glowBorder: 'rgba(225, 29, 72, 0.38)',
      coreBorder: 'rgba(225, 29, 72, 0.68)',
      coreInner: '#fff1f2',
      bgTint: 'rgba(255, 241, 242, 0.96)',
      badgeBg: '#ffe4e6',
      badgeBorder: '#fecdd3',
      badgeColor: '#9f1239',
      starGlow1: 'rgba(225, 29, 72, 0.95)',
      starGlow2: 'rgba(251, 113, 133, 0.70)',
      runnerGrad: 'linear-gradient(90deg, transparent, #fb7185, #e11d48, #9f1239, transparent)',
      titleGrad: 'linear-gradient(135deg, #0f172a 0%, #1e293b 35%, #be123c 70%, #f43f5e 100%)'
    },
    'vendors-procurement': {
      tag: 'Vendors & Procurement',
      primary: '#0d9488',
      secondary: '#14b8a6',
      light: '#99f6e4',
      dark: '#0f766e',
      accent: '#2dd4bf',
      glow: 'rgba(13, 148, 136, 0.22)',
      glowBorder: 'rgba(13, 148, 136, 0.38)',
      coreBorder: 'rgba(13, 148, 136, 0.68)',
      coreInner: '#f0fdfa',
      bgTint: 'rgba(240, 253, 250, 0.96)',
      badgeBg: '#ccfbf1',
      badgeBorder: '#99f6e4',
      badgeColor: '#115e59',
      starGlow1: 'rgba(13, 148, 136, 0.95)',
      starGlow2: 'rgba(45, 212, 191, 0.70)',
      runnerGrad: 'linear-gradient(90deg, transparent, #2dd4bf, #0d9488, #115e59, transparent)',
      titleGrad: 'linear-gradient(135deg, #0f172a 0%, #1e293b 35%, #0f766e 70%, #14b8a6 100%)'
    },
    'logistics-delivery': {
      tag: 'Logistics & Fleet',
      primary: '#1d4ed8',
      secondary: '#3b82f6',
      light: '#bfdbfe',
      dark: '#1e40af',
      accent: '#60a5fa',
      glow: 'rgba(29, 78, 216, 0.24)',
      glowBorder: 'rgba(29, 78, 216, 0.38)',
      coreBorder: 'rgba(29, 78, 216, 0.68)',
      coreInner: '#eff6ff',
      bgTint: 'rgba(239, 246, 255, 0.96)',
      badgeBg: '#dbeafe',
      badgeBorder: '#bfdbfe',
      badgeColor: '#1e3a8a',
      starGlow1: 'rgba(29, 78, 216, 0.95)',
      starGlow2: 'rgba(96, 165, 250, 0.70)',
      runnerGrad: 'linear-gradient(90deg, transparent, #60a5fa, #1d4ed8, #1e3a8a, transparent)',
      titleGrad: 'linear-gradient(135deg, #0f172a 0%, #1e293b 35%, #1e40af 70%, #3b82f6 100%)'
    },
    'fashion': {
      tag: 'Zenve Fashion',
      primary: '#c026d3',
      secondary: '#d946ef',
      light: '#f5d0fe',
      dark: '#a21caf',
      accent: '#e879f9',
      glow: 'rgba(192, 38, 211, 0.24)',
      glowBorder: 'rgba(192, 38, 211, 0.38)',
      coreBorder: 'rgba(192, 38, 211, 0.68)',
      coreInner: '#fdf4ff',
      bgTint: 'rgba(253, 244, 255, 0.96)',
      badgeBg: '#fae8ff',
      badgeBorder: '#f5d0fe',
      badgeColor: '#86198f',
      starGlow1: 'rgba(192, 38, 211, 0.95)',
      starGlow2: 'rgba(232, 121, 249, 0.70)',
      runnerGrad: 'linear-gradient(90deg, transparent, #e879f9, #c026d3, #86198f, transparent)',
      titleGrad: 'linear-gradient(135deg, #0f172a 0%, #1e293b 35%, #a21caf 70%, #d946ef 100%)'
    },
    'b2b-enterprise': {
      tag: 'B2B & Enterprise',
      primary: '#1d4ed8',
      secondary: '#2563eb',
      light: '#bfdbfe',
      dark: '#1e3a8a',
      accent: '#60a5fa',
      glow: 'rgba(29, 78, 216, 0.22)',
      glowBorder: 'rgba(29, 78, 216, 0.38)',
      coreBorder: 'rgba(29, 78, 216, 0.68)',
      coreInner: '#eff6ff',
      bgTint: 'rgba(239, 246, 255, 0.96)',
      badgeBg: '#dbeafe',
      badgeBorder: '#bfdbfe',
      badgeColor: '#172554',
      starGlow1: 'rgba(29, 78, 216, 0.95)',
      starGlow2: 'rgba(96, 165, 250, 0.70)',
      runnerGrad: 'linear-gradient(90deg, transparent, #60a5fa, #1d4ed8, #172554, transparent)',
      titleGrad: 'linear-gradient(135deg, #0f172a 0%, #1e293b 35%, #1e3a8a 70%, #2563eb 100%)'
    },
    'import-export': {
      tag: 'Import & Export',
      primary: '#0369a1',
      secondary: '#0284c7',
      light: '#bae6fd',
      dark: '#075985',
      accent: '#38bdf8',
      glow: 'rgba(3, 105, 161, 0.22)',
      glowBorder: 'rgba(3, 105, 161, 0.38)',
      coreBorder: 'rgba(3, 105, 161, 0.68)',
      coreInner: '#f0f9ff',
      bgTint: 'rgba(240, 249, 255, 0.96)',
      badgeBg: '#e0f2fe',
      badgeBorder: '#bae6fd',
      badgeColor: '#0c4a6e',
      starGlow1: 'rgba(3, 105, 161, 0.95)',
      starGlow2: 'rgba(56, 189, 248, 0.70)',
      runnerGrad: 'linear-gradient(90deg, transparent, #38bdf8, #0369a1, #0c4a6e, transparent)',
      titleGrad: 'linear-gradient(135deg, #0f172a 0%, #1e293b 35%, #075985 70%, #0284c7 100%)'
    },
    'subscriptions': {
      tag: 'Subscription Commerce',
      primary: '#7e22ce',
      secondary: '#9333ea',
      light: '#e9d5ff',
      dark: '#6b21a8',
      accent: '#c084fc',
      glow: 'rgba(126, 34, 206, 0.24)',
      glowBorder: 'rgba(126, 34, 206, 0.38)',
      coreBorder: 'rgba(126, 34, 206, 0.68)',
      coreInner: '#faf5ff',
      bgTint: 'rgba(250, 245, 255, 0.96)',
      badgeBg: '#f3e8ff',
      badgeBorder: '#e9d5ff',
      badgeColor: '#581c87',
      starGlow1: 'rgba(126, 34, 206, 0.95)',
      starGlow2: 'rgba(192, 132, 252, 0.70)',
      runnerGrad: 'linear-gradient(90deg, transparent, #c084fc, #7e22ce, #581c87, transparent)',
      titleGrad: 'linear-gradient(135deg, #0f172a 0%, #1e293b 35%, #6b21a8 70%, #9333ea 100%)'
    },
    'reports-analytics': {
      tag: 'Reports & Analytics',
      primary: '#0284c7',
      secondary: '#0ea5e9',
      light: '#bae6fd',
      dark: '#0369a1',
      accent: '#38bdf8',
      glow: 'rgba(2, 132, 199, 0.22)',
      glowBorder: 'rgba(2, 132, 199, 0.38)',
      coreBorder: 'rgba(2, 132, 199, 0.68)',
      coreInner: '#f0f9ff',
      bgTint: 'rgba(240, 249, 255, 0.96)',
      badgeBg: '#e0f2fe',
      badgeBorder: '#bae6fd',
      badgeColor: '#0369a1',
      starGlow1: 'rgba(2, 132, 199, 0.95)',
      starGlow2: 'rgba(56, 189, 248, 0.70)',
      runnerGrad: 'linear-gradient(90deg, transparent, #38bdf8, #0ea5e9, #0369a1, transparent)',
      titleGrad: 'linear-gradient(135deg, #0f172a 0%, #1e293b 35%, #0369a1 70%, #0ea5e9 100%)'
    },
    'ai-assistant': {
      tag: 'Neural AI Engine',
      primary: '#7c3aed',
      secondary: '#8b5cf6',
      light: '#ddd6fe',
      dark: '#6d28d9',
      accent: '#a78bfa',
      glow: 'rgba(124, 58, 237, 0.26)',
      glowBorder: 'rgba(124, 58, 237, 0.40)',
      coreBorder: 'rgba(124, 58, 237, 0.68)',
      coreInner: '#f5f3ff',
      bgTint: 'rgba(245, 243, 255, 0.96)',
      badgeBg: '#ede9fe',
      badgeBorder: '#ddd6fe',
      badgeColor: '#5b21b6',
      starGlow1: 'rgba(124, 58, 237, 0.95)',
      starGlow2: 'rgba(167, 139, 250, 0.70)',
      runnerGrad: 'linear-gradient(90deg, transparent, #a78bfa, #7c3aed, #5b21b6, transparent)',
      titleGrad: 'linear-gradient(135deg, #0f172a 0%, #1e293b 35%, #6d28d9 70%, #8b5cf6 100%)'
    },
    'alerts': {
      tag: 'Real-Time Alerts',
      primary: '#dc2626',
      secondary: '#ef4444',
      light: '#fecaca',
      dark: '#b91c1c',
      accent: '#f87171',
      glow: 'rgba(220, 38, 38, 0.24)',
      glowBorder: 'rgba(220, 38, 38, 0.38)',
      coreBorder: 'rgba(220, 38, 38, 0.68)',
      coreInner: '#fef2f2',
      bgTint: 'rgba(254, 242, 242, 0.96)',
      badgeBg: '#fee2e2',
      badgeBorder: '#fecaca',
      badgeColor: '#991b1b',
      starGlow1: 'rgba(220, 38, 38, 0.95)',
      starGlow2: 'rgba(248, 113, 113, 0.70)',
      runnerGrad: 'linear-gradient(90deg, transparent, #f87171, #dc2626, #991b1b, transparent)',
      titleGrad: 'linear-gradient(135deg, #0f172a 0%, #1e293b 35%, #b91c1c 70%, #ef4444 100%)'
    },
    'audit-compliance': {
      tag: 'Audit & Governance',
      primary: '#475569',
      secondary: '#64748b',
      light: '#e2e8f0',
      dark: '#334155',
      accent: '#94a3b8',
      glow: 'rgba(71, 85, 105, 0.22)',
      glowBorder: 'rgba(71, 85, 105, 0.38)',
      coreBorder: 'rgba(71, 85, 105, 0.68)',
      coreInner: '#f8fafc',
      bgTint: 'rgba(248, 250, 252, 0.96)',
      badgeBg: '#f1f5f9',
      badgeBorder: '#e2e8f0',
      badgeColor: '#1e293b',
      starGlow1: 'rgba(71, 85, 105, 0.95)',
      starGlow2: 'rgba(148, 163, 184, 0.70)',
      runnerGrad: 'linear-gradient(90deg, transparent, #94a3b8, #475569, #1e293b, transparent)',
      titleGrad: 'linear-gradient(135deg, #0f172a 0%, #1e293b 35%, #334155 70%, #64748b 100%)'
    },
    'system-health': {
      tag: 'System Diagnostics',
      primary: '#059669',
      secondary: '#10b981',
      light: '#a7f3d0',
      dark: '#047857',
      accent: '#34d399',
      glow: 'rgba(5, 150, 105, 0.22)',
      glowBorder: 'rgba(5, 150, 105, 0.38)',
      coreBorder: 'rgba(5, 150, 105, 0.68)',
      coreInner: '#ecfdf5',
      bgTint: 'rgba(240, 253, 250, 0.96)',
      badgeBg: '#d1fae5',
      badgeBorder: '#a7f3d0',
      badgeColor: '#065f46',
      starGlow1: 'rgba(5, 150, 105, 0.95)',
      starGlow2: 'rgba(52, 211, 153, 0.70)',
      runnerGrad: 'linear-gradient(90deg, transparent, #34d399, #059669, #047857, transparent)',
      titleGrad: 'linear-gradient(135deg, #0f172a 0%, #1e293b 35%, #047857 70%, #10b981 100%)'
    },
    'settings': {
      tag: 'Platform Settings',
      primary: '#475569',
      secondary: '#64748b',
      light: '#cbd5e1',
      dark: '#334155',
      accent: '#94a3b8',
      glow: 'rgba(71, 85, 105, 0.20)',
      glowBorder: 'rgba(71, 85, 105, 0.38)',
      coreBorder: 'rgba(71, 85, 105, 0.68)',
      coreInner: '#f8fafc',
      bgTint: 'rgba(248, 250, 252, 0.96)',
      badgeBg: '#f1f5f9',
      badgeBorder: '#cbd5e1',
      badgeColor: '#1e293b',
      starGlow1: 'rgba(71, 85, 105, 0.95)',
      starGlow2: 'rgba(148, 163, 184, 0.70)',
      runnerGrad: 'linear-gradient(90deg, transparent, #94a3b8, #475569, #1e293b, transparent)',
      titleGrad: 'linear-gradient(135deg, #0f172a 0%, #1e293b 35%, #334155 70%, #64748b 100%)'
    },
    'default': {
      tag: 'Zenve Intelligence',
      primary: '#059669',
      secondary: '#10b981',
      light: '#a7f3d0',
      dark: '#047857',
      accent: '#34d399',
      glow: 'rgba(16, 185, 129, 0.22)',
      glowBorder: 'rgba(16, 185, 129, 0.38)',
      coreBorder: 'rgba(16, 185, 129, 0.68)',
      coreInner: '#ecfdf5',
      bgTint: 'rgba(240, 253, 250, 0.96)',
      badgeBg: '#d1fae5',
      badgeBorder: '#a7f3d0',
      badgeColor: '#065f46',
      starGlow1: 'rgba(16, 185, 129, 0.95)',
      starGlow2: 'rgba(52, 211, 153, 0.70)',
      runnerGrad: 'linear-gradient(90deg, transparent, #34d399, #10b981, #059669, transparent)',
      titleGrad: 'linear-gradient(135deg, #0f172a 0%, #1e293b 35%, #059669 70%, #10b981 100%)'
    }
  };

  /**
   * Intelligently resolves the active theme key by inspecting:
   * 1. moduleName
   * 2. targetName
   * 3. window.location.hash
   */
  function resolveThemeKey(targetName, moduleName) {
    var raw = ((moduleName || '') + ' ' + (targetName || '') + ' ' + (window.location.hash || '')).toLowerCase();

    if (raw.indexOf('executive') !== -1 || raw.indexOf('ceo control') !== -1 || raw.indexOf('overview') !== -1 || raw.indexOf('kpi') !== -1) {
      return 'executive';
    }
    if (raw.indexOf('product') !== -1 || raw.indexOf('inventory') !== -1 || raw.indexOf('sku') !== -1 || raw.indexOf('stock') !== -1 || raw.indexOf('warehouse') !== -1 || raw.indexOf('valuation') !== -1) {
      return 'products-inventory';
    }
    if (raw.indexOf('pharmacy') !== -1 || raw.indexOf('medicine') !== -1 || raw.indexOf('prescription') !== -1 || raw.indexOf('batch') !== -1) {
      return 'pharmacy';
    }
    if (raw.indexOf('veterinary') !== -1 || raw.indexOf('treatment') !== -1 || raw.indexOf('vaccination') !== -1 || raw.indexOf('consultation') !== -1 || raw.indexOf('procedure') !== -1) {
      return 'veterinary-services';
    }
    if (raw.indexOf('doctor') !== -1) {
      return 'doctors';
    }
    if (raw.indexOf('clinic') !== -1 || raw.indexOf('hospital') !== -1) {
      return 'clinics-hospitals';
    }
    if (raw.indexOf('pet') !== -1) {
      return 'pets-360';
    }
    if (raw.indexOf('customer') !== -1) {
      return 'customers-360';
    }
    if (raw.indexOf('employee') !== -1 || raw.indexOf('hr') !== -1 || raw.indexOf('payroll') !== -1 || raw.indexOf('attendance') !== -1 || raw.indexOf('recruitment') !== -1 || raw.indexOf('department') !== -1 || raw.indexOf('onboarding') !== -1 || raw.indexOf('salary') !== -1) {
      return 'employees-hr';
    }
    if (raw.indexOf('finance') !== -1 || raw.indexOf('accounting') !== -1 || raw.indexOf('profit') !== -1 || raw.indexOf('balance sheet') !== -1 || raw.indexOf('cash flow') !== -1 || raw.indexOf('pnl') !== -1 || raw.indexOf('cogs') !== -1 || raw.indexOf('ebitda') !== -1 || raw.indexOf('invoice') !== -1 || raw.indexOf('payable') !== -1 || raw.indexOf('receivable') !== -1 || raw.indexOf('tax') !== -1) {
      return 'finance-accounting';
    }
    if (raw.indexOf('sales') !== -1 || raw.indexOf('revenue') !== -1 || raw.indexOf('target') !== -1 || raw.indexOf('funnel') !== -1 || raw.indexOf('forecast') !== -1) {
      return 'revenue-sales';
    }
    if (raw.indexOf('marketing') !== -1 || raw.indexOf('campaign') !== -1 || raw.indexOf('lead') !== -1 || raw.indexOf('roas') !== -1 || raw.indexOf('cac') !== -1 || raw.indexOf('advertising') !== -1) {
      return 'marketing';
    }
    if (raw.indexOf('vendor') !== -1 || raw.indexOf('procurement') !== -1 || raw.indexOf('purchase order') !== -1 || raw.indexOf('supplier') !== -1) {
      return 'vendors-procurement';
    }
    if (raw.indexOf('logistics') !== -1 || raw.indexOf('delivery') !== -1 || raw.indexOf('60-minute') !== -1 || raw.indexOf('fleet') !== -1) {
      return 'logistics-delivery';
    }
    if (raw.indexOf('fashion') !== -1 || raw.indexOf('apparel') !== -1 || raw.indexOf('showroom') !== -1) {
      return 'fashion';
    }
    if (raw.indexOf('b2b') !== -1 || raw.indexOf('enterprise') !== -1 || raw.indexOf('corporate') !== -1) {
      return 'b2b-enterprise';
    }
    if (raw.indexOf('import') !== -1 || raw.indexOf('export') !== -1 || raw.indexOf('customs') !== -1 || raw.indexOf('buyer') !== -1) {
      return 'import-export';
    }
    if (raw.indexOf('subscription') !== -1 || raw.indexOf('churn') !== -1 || raw.indexOf('renewal') !== -1) {
      return 'subscriptions';
    }
    if (raw.indexOf('report') !== -1) {
      return 'reports-analytics';
    }
    if (raw.indexOf('ai') !== -1 || raw.indexOf('assistant') !== -1 || raw.indexOf('insight') !== -1 || raw.indexOf('anomaly') !== -1 || raw.indexOf('prediction') !== -1) {
      return 'ai-assistant';
    }
    if (raw.indexOf('alert') !== -1 || raw.indexOf('notification') !== -1 || raw.indexOf('critical') !== -1) {
      return 'alerts';
    }
    if (raw.indexOf('audit') !== -1 || raw.indexOf('compliance') !== -1 || raw.indexOf('activity') !== -1) {
      return 'audit-compliance';
    }
    if (raw.indexOf('system') !== -1 || raw.indexOf('health') !== -1 || raw.indexOf('api health') !== -1 || raw.indexOf('database') !== -1) {
      return 'system-health';
    }
    if (raw.indexOf('setting') !== -1 || raw.indexOf('permission') !== -1 || raw.indexOf('location') !== -1) {
      return 'settings';
    }
    if (raw.indexOf('order') !== -1 || raw.indexOf('operation') !== -1 || raw.indexOf('return') !== -1 || raw.indexOf('cancellation') !== -1) {
      return 'orders-operations';
    }

    return 'default';
  }

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
      '<!-- Dynamic SVG Definitions for Themed Celestial Stars -->',
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
      '  <div class="zdl-category-pill" id="zdl-category-pill">Executive Control</div>',
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

  /**
   * Applies all theme colors and CSS variables to the loader overlay and SVG gradients.
   */
  function applyTheme(themeKey, theme) {
    var loader = ensureLoaderElement();
    if (!loader || !theme) return;

    loader.setAttribute('data-theme', themeKey);

    // Apply CSS custom properties dynamically
    loader.style.setProperty('--zdl-primary', theme.primary);
    loader.style.setProperty('--zdl-secondary', theme.secondary);
    loader.style.setProperty('--zdl-light', theme.light);
    loader.style.setProperty('--zdl-dark', theme.dark);
    loader.style.setProperty('--zdl-accent', theme.accent);
    loader.style.setProperty('--zdl-glow', theme.glow);
    loader.style.setProperty('--zdl-glow-border', theme.glowBorder);
    loader.style.setProperty('--zdl-core-border', theme.coreBorder);
    loader.style.setProperty('--zdl-core-inner', theme.coreInner);
    loader.style.setProperty('--zdl-bg-tint', theme.bgTint);
    loader.style.setProperty('--zdl-badge-bg', theme.badgeBg);
    loader.style.setProperty('--zdl-badge-border', theme.badgeBorder);
    loader.style.setProperty('--zdl-badge-color', theme.badgeColor);
    loader.style.setProperty('--zdl-star-glow1', theme.starGlow1);
    loader.style.setProperty('--zdl-star-glow2', theme.starGlow2);
    loader.style.setProperty('--zdl-runner-grad', theme.runnerGrad);
    loader.style.setProperty('--zdl-title-grad', theme.titleGrad);

    // Update SVG star gradients dynamically
    var grad = document.getElementById('zdlThemeStarGrad');
    if (grad) {
      grad.innerHTML = [
        '<stop offset="0%" stop-color="#ffffff" />',
        '<stop offset="25%" stop-color="' + theme.light + '" />',
        '<stop offset="65%" stop-color="' + theme.secondary + '" />',
        '<stop offset="100%" stop-color="' + theme.dark + '" />'
      ].join('');
    }
    var goldGrad = document.getElementById('zdlGoldStarGrad');
    if (goldGrad) {
      goldGrad.innerHTML = [
        '<stop offset="0%" stop-color="#ffffff" />',
        '<stop offset="25%" stop-color="' + theme.light + '" />',
        '<stop offset="65%" stop-color="' + theme.secondary + '" />',
        '<stop offset="100%" stop-color="' + theme.dark + '" />'
      ].join('');
    }

    // Update domain pill badge
    var pillEl = document.getElementById('zdl-category-pill');
    if (pillEl) {
      pillEl.textContent = theme.tag || 'Zenve Intelligence';
    }
  }

  function show(targetName, moduleName) {
    if (_hideTimer) {
      clearTimeout(_hideTimer);
      _hideTimer = null;
    }
    var loader = ensureLoaderElement();

    // 1. Resolve theme based on target, module, or current URL hash
    var themeKey = resolveThemeKey(targetName, moduleName);
    var theme = THEMES[themeKey] || THEMES['default'];
    applyTheme(themeKey, theme);

    // 2. Set synchronous label with clean target name
    var labelEl = document.getElementById('zdl-target-label');
    if (labelEl) {
      var displayTarget = targetName || moduleName || theme.tag || 'Dashboard';
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
    hide: hide,
    applyTheme: applyTheme,
    getTheme: function(key) { return THEMES[key]; },
    getThemeKey: resolveThemeKey
  };
})();
