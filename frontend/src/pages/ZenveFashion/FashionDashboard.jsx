import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function FashionDashboard() {
  return (
    <DashboardLayout
      category="Zenve Fashion"
      subcategory="Apparel, Showrooms & Accessories"
      title="Zenve Pet Fashion & Lifestyle"
      subtitle="Bespoke pet apparel, luxury showroom sales, seasonal collars, and premium lifestyle profitability"
      icon="🎀"
      badge="Showroom + Online"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Fashion Revenue" value="₹2.62 Lakh" delta="+28.4%" trend="up" subtext="5% total revenue" icon="🎀" />
        <KpiCard label="Apparel Units Sold" value="384 items" delta="+18.2%" trend="up" subtext="Bespoke & seasonal" icon="👗" />
        <KpiCard label="Gross Margin" value="62.5%" delta="High margin" trend="up" subtext="Premium lifestyle" icon="💎" />
        <KpiCard label="Showroom Footfall" value="1,480 visitors" delta="+14.0%" trend="up" subtext="Experience centers" icon="🛍️" />
      </div>

      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 12px', fontSize: '15px', fontWeight: 700 }}>Fashion Product Line Performance</h3>
        <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Monsoon Raincoats (34%), Winter Sweaters (28%), Ergonomic Harnesses (24%), Bows & Bandanas (14%)</p>
        <div style={{ height: '140px', background: 'rgba(0,0,0,0.15)', borderRadius: '8px', display: 'grid', placeItems: 'center', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>
          Fashion Catalog Velocity & Sizing Exchange Metrics
        </div>
      </div>
    </DashboardLayout>
  );
}
