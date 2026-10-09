import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function SettingsDashboard() {
  return (
    <DashboardLayout
      category="Settings"
      subcategory="Company Profile & System Preferences"
      title="Platform Settings & Configuration"
      subtitle="Enterprise parameters, business units, role-based access permissions, and billing settings"
      icon="⚙️"
      badge="Enterprise Edition"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Company" value="-" delta="-" trend="neutral" subtext="Corporate identity" icon="🏢" />
        <KpiCard label="Active Locations" value="0" delta="-" trend="neutral" subtext="Warehouses & Clinics" icon="📍" />
        <KpiCard label="Registered Users" value="0" delta="-" trend="neutral" subtext="RBAC enabled" icon="👤" />
        <KpiCard label="Database Mode" value="-" delta="-" trend="neutral" subtext="Database engine" icon="🗄️" />
      </div>

      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 12px', fontSize: '15px', fontWeight: 700 }}>System Configuration & API Connections</h3>
        <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Environment parameters and API connection status</p>
        <div style={{ height: '140px', background: 'rgba(0,0,0,0.15)', borderRadius: '8px', display: 'grid', placeItems: 'center', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>
          Environment Configuration & API Key Management Panel
        </div>
      </div>
    </DashboardLayout>
  );
}
