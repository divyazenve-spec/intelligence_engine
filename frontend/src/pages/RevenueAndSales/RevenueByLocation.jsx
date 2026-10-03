import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function RevenueByLocation() {
  const cities = [
    { city: 'Bengaluru', state: 'Karnataka', share: '32.4%', rev: '₹5,78,000', orders: 412, growth: '+18.4%' },
    { city: 'Mumbai', state: 'Maharashtra', share: '24.2%', rev: '₹4,31,700', orders: 298, growth: '+14.1%' },
    { city: 'Delhi NCR', state: 'Delhi', share: '18.6%', rev: '₹3,31,800', orders: 234, growth: '+9.8%' },
    { city: 'Chennai', state: 'Tamil Nadu', share: '12.8%', rev: '₹2,28,300', orders: 164, growth: '+11.2%' },
    { city: 'Hyderabad', state: 'Telangana', share: '8.4%', rev: '₹1,49,800', orders: 104, growth: '+15.6%' },
    { city: 'Pune', state: 'Maharashtra', share: '3.6%', rev: '₹64,200', orders: 48, growth: '+7.4%' }
  ];

  return (
    <DashboardLayout
      category="Revenue & Sales"
      subcategory="Revenue by Location"
      title="Geographic Sales & Territory Intelligence"
      subtitle="Regional market penetration, city-level demand, and rapid delivery territory breakdown"
      icon="📍"
      badge="6 Metro Territories"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Top Market" value="Bengaluru" delta="32.4% share" trend="up" subtext="₹5.78L volume" icon="🏙️" />
        <KpiCard label="Fastest Growing" value="Bengaluru" delta="+18.4% MoM" trend="up" subtext="Hub territory" icon="🚀" />
        <KpiCard label="Active Regions" value="6 Metros" delta="100% coverage" trend="neutral" subtext="Tier-1 cities" icon="📍" />
        <KpiCard label="Territory Revenue" value="₹17,83,800" delta="+14.2%" trend="up" subtext="Total regional sales" icon="💼" />
      </div>

      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>Metro Territory Performance Breakdown</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))', color: 'var(--muted-foreground, #94a3b8)', fontSize: '11px' }}>
                <th style={{ padding: '8px 12px' }}>City & Territory</th>
                <th style={{ padding: '8px 12px' }}>State</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Revenue Realized</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Market Share</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Orders</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>MoM Expansion</th>
              </tr>
            </thead>
            <tbody>
              {cities.map((c) => (
                <tr key={c.city} style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.04))' }}>
                  <td style={{ padding: '12px', fontWeight: 700 }}>{c.city}</td>
                  <td style={{ padding: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>{c.state}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{c.rev}</td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: '99px',
                      background: 'rgba(59,130,246,0.15)',
                      color: '#3b82f6',
                      fontWeight: 600,
                      fontSize: '11px'
                    }}>{c.share}</span>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>{c.orders}</td>
                  <td style={{ padding: '12px', textAlign: 'right', color: '#10b981', fontWeight: 600 }}>{c.growth}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
