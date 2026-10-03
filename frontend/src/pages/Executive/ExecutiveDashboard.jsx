import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function ExecutiveDashboard() {
  return (
    <DashboardLayout
      category="Executive Dashboard"
      subcategory="CEO Control Center"
      title="Zenve Executive Control Center"
      subtitle="Complete private business intelligence for healthier, happier pets"
      icon="🏛️"
      badge="All Systems Live"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Today's Sales" value="₹38,100" delta="+18.4%" trend="up" subtext="Live revenue" icon="⚡" />
        <KpiCard label="Period Revenue" value="₹17.84 Lakh" delta="+12.6%" trend="up" subtext="Last 30 days" icon="📈" />
        <KpiCard label="Paid Transactions" value="1,248" delta="98.2%" trend="up" subtext="Settled orders" icon="✅" />
        <KpiCard label="Active Customers" value="894" delta="+15.1%" trend="up" subtext="Unique parents" icon="👥" />
        <KpiCard label="App Downloads" value="2,480" delta="+22.0%" trend="up" subtext="iOS + Android" icon="📱" />
        <KpiCard label="Net Profit Margin" value="14.6%" delta="+1.8%" trend="up" subtext="MTD EBITDA" icon="💰" />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '16px'
      }}>
        <div style={{
          background: 'var(--card, #1e293b)',
          border: '1px solid var(--border, rgba(255,255,255,0.08))',
          borderRadius: '12px',
          padding: '20px'
        }}>
          <h3 style={{ margin: '0 0 12px', fontSize: '15px', fontWeight: 700 }}>Revenue by Channel Mix</h3>
          <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Pet Products (32%), Pharmacy (24%), Vet Services (18%), Marketplace (8%)</p>
          <div style={{ height: '160px', background: 'rgba(0,0,0,0.15)', borderRadius: '8px', display: 'grid', placeItems: 'center', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>
            Channel Contribution Donut Matrix
          </div>
        </div>

        <div style={{
          background: 'var(--card, #1e293b)',
          border: '1px solid var(--border, rgba(255,255,255,0.08))',
          borderRadius: '12px',
          padding: '20px'
        }}>
          <h3 style={{ margin: '0 0 12px', fontSize: '15px', fontWeight: 700 }}>Orders & 60-Minute Fulfillment</h3>
          <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Delivered (72%), Processing (12%), Packed (8%), Cancelled (5%)</p>
          <div style={{ height: '160px', background: 'rgba(0,0,0,0.15)', borderRadius: '8px', display: 'grid', placeItems: 'center', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>
            Fulfillment SLA Velocity
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
