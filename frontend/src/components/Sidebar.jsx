import React, { useState } from 'react';

export default function Sidebar({ activeItem = 'Sales Dashboard', onNavigate }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSection, setExpandedSection] = useState('Revenue & Sales');

  const navigationSections = [
    {
      title: 'Executive Dashboard',
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" />
          <rect width="7" height="7" x="14" y="14" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" />
        </svg>
      ),
      color: '#38bdf8',
      bg: 'rgba(56, 189, 248, 0.12)',
      items: ['Executive Dashboard', 'CEO Control Center', 'Business Overview', 'KPI Dashboard']
    },
    {
      title: 'Revenue & Sales',
      icon: (
        <span style={{ fontSize: '13px', fontWeight: 700 }}>₹</span>
      ),
      color: '#00f2fe',
      bg: 'rgba(0, 242, 254, 0.18)',
      items: [
        'Sales Dashboard',
        'Revenue by Channel',
        'Revenue by Location',
        'Revenue by Product',
        'Revenue by Employee',
        'Revenue by Doctor',
        'Revenue by Customer',
        'Sales Funnel',
        'Targets & Achievement',
        'Sales Forecast'
      ]
    },
    {
      title: 'Orders & Operations',
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="16" height="20" x="4" y="2" rx="2" /><line x1="8" x2="16" y1="6" y2="6" />
          <line x1="8" x2="16" y1="10" y2="10" /><line x1="8" x2="12" y1="14" y2="14" />
        </svg>
      ),
      color: '#38bdf8',
      bg: 'rgba(56, 189, 248, 0.12)',
      items: ['All Orders', 'Order Management', 'Order Status', 'Returns & Refunds', 'Cancellations', 'Delivery Performance', '60-Minute Delivery', 'Operations Dashboard']
    },
    {
      title: 'Products & Inventory',
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
          <path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" />
        </svg>
      ),
      color: '#a855f7',
      bg: 'rgba(168, 85, 247, 0.15)',
      items: ['Product Catalog', 'SKU Management', 'Inventory Dashboard', 'Stock Management', 'Low Stock', 'Out of Stock', 'Expiry Management']
    },
    {
      title: 'Pharmacy',
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
          <path d="m8.5 8.5 7 7" />
        </svg>
      ),
      color: '#f97316',
      bg: 'rgba(249, 115, 22, 0.15)',
      items: ['Pharmacy Dashboard', 'Pharmacy Sales', 'Medicines', 'Prescriptions', 'Pharmacy Orders', 'Expiry Tracking']
    },
    {
      title: 'Veterinary Services',
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 2v2" /><path d="M5 2v2" /><path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1" />
          <path d="M8 15a6 6 0 0 0 12 0v-3" /><circle cx="20" cy="10" r="2" />
        </svg>
      ),
      color: '#ec4899',
      bg: 'rgba(236, 72, 153, 0.15)',
      items: ['Services Dashboard', 'Consultations', 'Appointments', 'Treatments', 'Vaccinations', 'Diagnostics', 'Procedures']
    },
    {
      title: 'Doctors',
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
        </svg>
      ),
      color: '#06b6d4',
      bg: 'rgba(6, 182, 212, 0.15)',
      items: ['Doctors Dashboard', 'All Doctors', 'Doctor Performance', 'Doctor Revenue', 'Doctor Patients']
    },
    {
      title: 'Clinics & Hospitals',
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="16" height="20" x="4" y="2" rx="2" /><path d="M9 22v-4h6v4" /><path d="M8 6h.01" />
          <path d="M16 6h.01" /><path d="M12 6h.01" /><path d="M12 10h.01" /><path d="M12 14h.01" /><path d="M16 10h.01" /><path d="M16 14h.01" /><path d="M8 10h.01" /><path d="M8 14h.01" />
        </svg>
      ),
      color: '#8b5cf6',
      bg: 'rgba(139, 92, 246, 0.15)',
      items: ['Clinics Dashboard', 'All Clinics', 'Hospitals', 'Clinic Performance', 'Clinic Revenue']
    },
    {
      title: 'Customers 360°',
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      color: '#10b981',
      bg: 'rgba(16, 185, 129, 0.15)',
      items: ['Customer Dashboard', 'All Customers', 'New Customers', 'Active Customers', 'Customer Retention']
    },
    {
      title: 'Pets 360°',
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="4" r="2" /><circle cx="18" cy="8" r="2" /><circle cx="20" cy="16" r="2" />
          <path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z" />
        </svg>
      ),
      color: '#f59e0b',
      bg: 'rgba(245, 158, 11, 0.15)',
      items: ['All Pets', 'Pet Profiles', 'Pet Health Records', 'Vaccination Records', 'Pet Analytics']
    },
    {
      title: 'Employees & HR',
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      color: '#6366f1',
      bg: 'rgba(99, 102, 241, 0.15)',
      items: ['HR Dashboard', 'All Employees', 'Departments', 'Employee Performance', 'Payroll', 'Attendance']
    },
    {
      title: 'Finance & Accounting',
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" x2="22" y1="10" y2="10" />
        </svg>
      ),
      color: '#eab308',
      bg: 'rgba(234, 179, 8, 0.15)',
      items: ['Finance Dashboard', 'Profit & Loss', 'Balance Sheet', 'Cash Flow', 'Receivables', 'Payables']
    },
    {
      title: 'Marketing',
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 11 18-5v12L3 14v-3z" /><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
        </svg>
      ),
      color: '#f43f5e',
      bg: 'rgba(244, 63, 94, 0.15)',
      items: ['Marketing Dashboard', 'Campaigns', 'Leads', 'Lead Sources', 'Website Analytics', 'CAC', 'ROAS']
    },
    {
      title: 'Logistics & Delivery',
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
          <path d="M15 18H9" /><path d="M19 18h2a1 1 0 0 0 1-1v-5l-3-4h-5v10" />
          <circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" />
        </svg>
      ),
      color: '#3b82f6',
      bg: 'rgba(59, 130, 246, 0.15)',
      items: ['Logistics Dashboard', 'Delivery Orders', 'Delivery Partners', 'Delivery Tracking', '60-Minute Delivery']
    },
    {
      title: 'Subscriptions',
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m17 2 4 4-4 4" /><path d="M3 11v-1a4 4 0 0 1 4-4h14" />
          <path d="m7 22-4-4 4-4" /><path d="M21 13v1a4 4 0 0 1-4 4H3" />
        </svg>
      ),
      color: '#8b5cf6',
      bg: 'rgba(139, 92, 246, 0.15)',
      items: ['Subscription Dashboard', 'Active Subscriptions', 'New Subscriptions', 'Renewals', 'Churn']
    },
    {
      title: 'Reports & Analytics',
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" x2="12" y1="20" y2="10" /><line x1="18" x2="18" y1="20" y2="4" /><line x1="6" x2="6" y1="20" y2="16" />
        </svg>
      ),
      color: '#38bdf8',
      bg: 'rgba(56, 189, 248, 0.15)',
      items: ['Sales Reports', 'Revenue Reports', 'Export Center', 'Scheduled Reports']
    },
    {
      title: 'AI Assistant',
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" />
          <path d="M2 14h2" /><path d="M20 14h2" /><path d="M15 13v2" /><path d="M9 13v2" />
        </svg>
      ),
      color: '#a855f7',
      bg: 'rgba(168, 85, 247, 0.15)',
      items: ['Ask Zenve AI', 'Business Insights', 'Revenue Intelligence', 'Sales Forecast', 'Anomaly Detection']
    },
    {
      title: 'Alerts & Notifications',
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </svg>
      ),
      color: '#ef4444',
      bg: 'rgba(239, 68, 68, 0.15)',
      items: ['Critical Alerts', 'Revenue Alerts', 'Inventory Alerts', 'System Alerts', 'Alert Rules']
    },
    {
      title: 'Settings',
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
      color: '#94a3b8',
      bg: 'rgba(148, 163, 184, 0.15)',
      items: ['Company Settings', 'Locations', 'Users', 'Roles & Permissions', 'API & Integrations']
    }
  ];

  const filteredSections = navigationSections.map(sec => ({
    ...sec,
    items: sec.items.filter(item =>
      !searchTerm ||
      item.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sec.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(sec => sec.items.length > 0);

  return (
    <aside
      className="sidebar-scope"
      style={{
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        width: '224px',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 9999,
        background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
        color: '#0f172a',
        borderRight: '1px solid #e2e8f0',
        boxShadow: '4px 0 20px rgba(0, 0, 0, 0.06)',
        padding: '16px 12px 12px 12px',
        overflowY: 'auto',
        overflowX: 'hidden',
        boxSizing: 'border-box',
        fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, sans-serif"
      }}
    >
      {/* 1. Zenve Brand & Logo Header */}
      <div
        className="sidebar-header-box"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          paddingBottom: '14px',
          borderBottom: '1px solid #e2e8f0',
          cursor: 'pointer',
          userSelect: 'none'
        }}
        onClick={() => {
          if (onNavigate) onNavigate('overview');
          else {
            window.location.hash = '';
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
      >
        <div
          className="sidebar-logo-frame"
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'radial-gradient(circle at 50% 35%, rgba(245, 158, 11, 0.15) 0%, #ffffff 85%)',
            border: '1.5px solid rgba(245, 158, 11, 0.45)',
            boxShadow: '0 2px 8px rgba(245, 158, 11, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            overflow: 'hidden'
          }}
        >
          <img
            src="/zenve-logo.png"
            alt="Zenve Logo"
            onError={(e) => { e.currentTarget.src = '/assets/zenve-logo.png'; }}
            style={{
              width: '34px',
              height: '34px',
              objectFit: 'contain',
              filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.15))'
            }}
          />
        </div>
        <div className="sidebar-brand-text" style={{ display: 'flex', flexDirection: 'column' }}>
          <p
            className="sidebar-brand-name"
            style={{
              margin: 0,
              fontSize: '20px',
              fontWeight: 800,
              color: '#d97706',
              letterSpacing: '0.06em',
              lineHeight: 1,
              fontFamily: "'Sora', sans-serif"
            }}
          >
            ZENVE
          </p>
          <p
            className="sidebar-brand-sub"
            style={{
              margin: '4px 0 0',
              fontSize: '7.5px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              color: '#0284c7',
              opacity: 0.9
            }}
          >
            PETS • HEALTH • CARE
          </p>
        </div>
      </div>

      {/* 2. Menu Search Input with Ctrl + K */}
      <div
        className="sidebar-search-wrap"
        style={{
          position: 'relative',
          margin: '12px 0 10px'
        }}
      >
        <span
          className="sidebar-search-icon"
          style={{
            position: 'absolute',
            left: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#0284c7',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
          </svg>
        </span>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search 250+ pages…"
          style={{
            height: '36px',
            width: '100%',
            boxSizing: 'border-box',
            padding: '0 62px 0 32px',
            background: '#f1f5f9',
            border: '1px solid #e2e8f0',
            borderRadius: '11px',
            color: '#0f172a',
            fontSize: '11.5px',
            outline: 'none'
          }}
        />
        <span
          className="sidebar-search-kbd"
          style={{
            position: 'absolute',
            right: '8px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: '#e2e8f0',
            border: '1px solid #cbd5e1',
            borderRadius: '6px',
            padding: '2px 6px',
            fontSize: '9.5px',
            fontWeight: 600,
            color: '#475569',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
            pointerEvents: 'none'
          }}
        >
          Ctrl + K
        </span>
      </div>

      {/* 3. Navigation Sections List */}
      <nav
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          margin: '6px 0',
          flex: 1,
          overflowY: 'auto'
        }}
      >
        {filteredSections.map((sec) => {
          const isExpanded = !!searchTerm || expandedSection === sec.title;
          return (
            <div key={sec.title}>
              <button
                type="button"
                data-domain={sec.title}
                onClick={() => setExpandedSection(isExpanded ? '' : sec.title)}
                className={`sidebar-nav-item ${isExpanded ? 'sidebar-nav-active' : ''}`}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 10px',
                  borderRadius: '12px',
                  border: isExpanded ? '1px solid #7dd3fc' : '1px solid transparent',
                  borderLeft: isExpanded ? '3.5px solid #0284c7' : '1px solid transparent',
                  background: isExpanded ? 'linear-gradient(90deg, #e0f2fe 0%, #f0f9ff 100%)' : 'transparent',
                  boxShadow: isExpanded ? '0 2px 8px rgba(2, 132, 199, 0.08)' : 'none',
                  color: isExpanded ? '#0369a1' : '#334155',
                  fontSize: '11.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textAlign: 'left',
                  boxSizing: 'border-box'
                }}
              >
                <span
                  className="sidebar-icon-wrap"
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    background: isExpanded ? '#bae6fd' : (sec.bg || '#f1f5f9'),
                    color: isExpanded ? '#0284c7' : sec.color
                  }}
                >
                  {sec.icon}
                </span>

                <span
                  className="sidebar-label"
                  style={{
                    flex: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    fontSize: '11.5px'
                  }}
                >
                  {sec.title}
                </span>

                <span
                  className="sidebar-pill-count"
                  style={{
                    fontSize: '9px',
                    fontWeight: 700,
                    padding: '1.5px 6.5px',
                    borderRadius: '99px',
                    background: isExpanded ? '#bae6fd' : '#e2e8f0',
                    color: isExpanded ? '#0284c7' : '#475569',
                    border: isExpanded ? '1px solid #7dd3fc' : '1px solid #cbd5e1'
                  }}
                >
                  {sec.items.length}
                </span>

                <span
                  className="sidebar-chevron"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: isExpanded ? '#0284c7' : '#94a3b8',
                    transform: isExpanded ? 'rotate(90deg)' : 'none',
                    transition: 'transform 0.18s ease'
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </span>
              </button>

              {isExpanded && (
                <ul
                  className="sidebar-submenu-box"
                  style={{
                    listStyle: 'none',
                    margin: '3px 0 6px 0',
                    padding: '6px 6px 6px 10px',
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '11px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px'
                  }}
                >
                  {sec.items.map((item) => {
                    const isActive = activeItem === item;
                    return (
                      <li key={item}>
                        <button
                          type="button"
                          onClick={() => {
                            if (item === 'Executive Dashboard') {
                              window.location.hash = '#overview';
                              document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' });
                            } else if (onNavigate) {
                              onNavigate(item);
                            } else {
                              window.location.hash = `#${item.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
                            }
                          }}
                          className={`sidebar-sub-item ${isActive ? 'sidebar-sub-item-active' : ''}`}
                          style={{
                            width: '100%',
                            textAlign: 'left',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '5px 8px',
                            borderRadius: '6px',
                            border: 'none',
                            background: isActive ? '#e0f2fe' : 'transparent',
                            color: isActive ? '#0284c7' : '#475569',
                            fontSize: '11px',
                            fontWeight: isActive ? 600 : 500,
                            cursor: 'pointer'
                          }}
                        >
                          <span
                            className="sidebar-dot"
                            style={{
                              width: '5.5px',
                              height: '5.5px',
                              borderRadius: '50%',
                              background: '#0284c7',
                              boxShadow: '0 0 4px rgba(2, 132, 199, 0.4)',
                              flexShrink: 0
                            }}
                          />
                          {item}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </nav>

      {/* 4. Footer Status & Profile Cards */}
      <div
        className="sidebar-footer-wrap"
        style={{
          marginTop: 'auto',
          paddingTop: '10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}
      >
        {/* ALL SYSTEMS LIVE Card */}
        <div
          className="sidebar-status-card"
          style={{
            padding: '10px 12px',
            borderRadius: '13px',
            background: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%)',
            border: '1.5px solid #a7f3d0',
            boxShadow: '0 2px 6px rgba(16, 185, 129, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
            cursor: 'pointer'
          }}
        >
          <div className="sidebar-status-left" style={{ color: '#059669', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
            </svg>
          </div>
          <div className="sidebar-status-mid" style={{ flex: 1 }}>
            <p className="sidebar-status-title" style={{ margin: 0, fontSize: '10.5px', fontWeight: 800, color: '#047857', letterSpacing: '0.05em', lineHeight: 1.2 }}>
              ALL SYSTEMS LIVE
            </p>
            <p className="sidebar-status-sub" style={{ margin: '2px 0 0', fontSize: '9.5px', color: '#059669' }}>
              Private workspace synced
            </p>
          </div>
          <div className="sidebar-status-right" style={{ color: '#059669', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
        </div>

        {/* Executive Profile Card */}
        <div
          className="sidebar-profile-card"
          style={{
            padding: '8px 10px',
            borderRadius: '13px',
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer'
          }}
        >
          <span
            className="sidebar-avatar"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #4f46e5 0%, #9333ea 100%)',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '11.5px',
              display: 'grid',
              placeItems: 'center',
              flexShrink: 0,
              boxShadow: '0 2px 8px rgba(79, 70, 229, 0.25)'
            }}
          >
            EK
          </span>
          <div className="sidebar-profile-info" style={{ flex: 1 }}>
            <p className="sidebar-profile-name" style={{ margin: 0, fontSize: '11.5px', fontWeight: 700, color: '#0f172a' }}>
              Executive
            </p>
            <p className="sidebar-profile-role" style={{ margin: '1px 0 0', fontSize: '9.5px', color: '#64748b' }}>
              Full access
            </p>
          </div>
          <span className="sidebar-profile-chevron" style={{ color: '#94a3b8', display: 'flex', alignItems: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </span>
        </div>
      </div>
    </aside>
  );
}
