import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function RevenueByCustomer() {
  const customers = [
    { name: 'Kavita Menon', city: 'Bengaluru', pet: 'Golden Retriever (Bruno)', spend: '₹42,800', orders: 18, aov: '₹2,377', tier: 'Diamond' },
    { name: 'Aditya Birla', city: 'Mumbai', pet: 'German Shepherd (Max)', spend: '₹38,400', orders: 14, aov: '₹2,742', tier: 'Diamond' },
    { name: 'Sneha Rao', city: 'Bengaluru', pet: 'Beagle (Daisy)', spend: '₹31,200', orders: 12, aov: '₹2,600', tier: 'Gold' },
    { name: 'Vikram Joshi', city: 'Delhi NCR', pet: 'Labrador (Cooper)', spend: '₹28,500', orders: 11, aov: '₹2,590', tier: 'Gold' },
    { name: 'Pooja Hegde', city: 'Chennai', pet: 'Persian Cat (Simba)', spend: '₹24,900', orders: 9, aov: '₹2,766', tier: 'Gold' },
    { name: 'Rohan Deshmukh', city: 'Pune', pet: 'Shih Tzu (Coco)', spend: '₹19,800', orders: 8, aov: '₹2,475', tier: 'Silver' }
  ];

  return (
    <DashboardLayout
      category="Revenue & Sales"
      subcategory="Revenue by Customer"
      title="High-Value Client Lifetime Value & Loyalty"
      subtitle="Client order frequencies, lifetime healthcare spend, and customer loyalty tiers"
      icon="👥"
      badge="Top Clients"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Top Client Spend" value="₹42,800" delta="18 orders" trend="up" subtext="Diamond Tier" icon="💎" />
        <KpiCard label="Avg Lifetime Value" value="₹12,480" delta="+18.4%" trend="up" subtext="Per active parent" icon="📈" />
        <KpiCard label="Repeat Customer Rate" value="68.4%" delta="+4.2%" trend="up" subtext="Multi-order loyalty" icon="🔁" />
        <KpiCard label="Loyalty Tier Members" value="482" delta="Tiered base" trend="neutral" subtext="Diamond/Gold/Silver" icon="🏅" />
      </div>

      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>VIP Client Directory</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))', color: 'var(--muted-foreground, #94a3b8)', fontSize: '11px' }}>
                <th style={{ padding: '8px 12px' }}>Customer Name</th>
                <th style={{ padding: '8px 12px' }}>City</th>
                <th style={{ padding: '8px 12px' }}>Pet Profile</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Lifetime Spend</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Orders</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Avg Ticket</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Loyalty Tier</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.name} style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.04))' }}>
                  <td style={{ padding: '12px', fontWeight: 700 }}>{c.name}</td>
                  <td style={{ padding: '12px' }}>{c.city}</td>
                  <td style={{ padding: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>{c.pet}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{c.spend}</td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>{c.orders}</td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>{c.aov}</td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: '99px',
                      background: c.tier === 'Diamond' ? 'rgba(168,85,247,0.2)' : 'rgba(245,158,11,0.2)',
                      color: c.tier === 'Diamond' ? '#c084fc' : '#fbbf24',
                      fontWeight: 700,
                      fontSize: '11px'
                    }}>{c.tier}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
