import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function MarketingDashboard() {
  return (
    <DashboardLayout
      category="Marketing"
      subcategory="Campaigns, Leads & ROAS"
      title="Marketing Performance & Acquisition"
      subtitle="Ad spend efficiency, blended CAC, conversion attribution, and multi-channel ROAS"
      icon="📣"
      badge="2.9x ROAS"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Ad Spend" value="₹6,40,000" delta="-4.2%" trend="up" subtext="Meta, Google, In-App" icon="💳" />
        <KpiCard label="Acquired Leads" value="12,840" delta="+14.6%" trend="up" subtext="Form & app clicks" icon="🎯" />
        <KpiCard label="Converted Customers" value="2,160" delta="+18.3%" trend="up" subtext="First paid order" icon="👥" />
        <KpiCard label="Blended ROAS" value="2.9x" delta="+16.4%" trend="up" subtext="₹18.75L revenue" icon="🚀" />
      </div>

      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 12px', fontSize: '15px', fontWeight: 700 }}>Acquisition Channel ROAS</h3>
        <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Google Search (3.4x), Meta Instagram (2.8x), Local Vet Clinic Referrals (4.2x)</p>
        <div style={{ height: '140px', background: 'rgba(0,0,0,0.15)', borderRadius: '8px', display: 'grid', placeItems: 'center', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>
          Campaign Conversion Funnel & Lead Cost Timeline
        </div>
      </div>
    </DashboardLayout>
  );
}
