import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function CustomerRevenue() {
  const revStreams = [
    { channel: 'Zenve Mobile App (Quick Commerce)', mtdRev: '₹78.50 Lakh', share: '45.8%', avgUserSpend: '₹4,200', grossMargin: '42.5%', growth: '+28.4% YoY' },
    { channel: 'Physical Clinic Centers & OPD', mtdRev: '₹46.20 Lakh', share: '26.9%', avgUserSpend: '₹5,800', grossMargin: '48.0%', growth: '+18.2% YoY' },
    { channel: 'Zenve Online Web Portal', mtdRev: '₹28.40 Lakh', share: '16.6%', avgUserSpend: '₹3,400', grossMargin: '38.0%', growth: '+12.5% YoY' },
    { channel: 'Recurring Wellness Subscriptions', mtdRev: '₹18.42 Lakh', share: '10.7%', avgUserSpend: '₹1,850', grossMargin: '58.5%', growth: '+42.0% YoY' }
  ];

  const cardStyle = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Customers 360°"
      subcategory="Financial Intelligence"
      title="Customer Revenue & Monetization Streams"
      subtitle="Total customer-generated gross revenue, channel share, ARPU trajectory, and category margin analysis"
      icon="💰"
      badge="₹1.71 Cr MTD Revenue"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Customer Billed Revenue" value="₹1.71 Cr MTD" delta="+24.8% YoY" trend="up" subtext="All retail and clinical channels" icon="💰" />
        <KpiCard label="Monthly ARPU" value="₹4,620 / User" delta="+11.2% MoM" trend="up" subtext="Across active transactors" icon="📈" />
        <KpiCard label="Blended Gross Margin" value="44.2%" delta="+2.1% vs FY25" trend="up" subtext="High margin clinical services" icon="💎" />
        <KpiCard label="Subscription Recurring Share" value="10.7%" delta="High predictable baseline" trend="up" subtext="Aiming for 18% in FY27" icon="🔄" />
      </div>

      <div style={cardStyle}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>💰 Customer Revenue Contribution by Channel</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border, #e2e8f0)', textAlign: 'left', color: 'var(--muted-foreground, #475569)' }}>
                <th style={{ padding: '10px' }}>Revenue Channel</th>
                <th style={{ padding: '10px' }}>MTD Revenue</th>
                <th style={{ padding: '10px' }}>Revenue Share</th>
                <th style={{ padding: '10px' }}>Avg User Spend</th>
                <th style={{ padding: '10px' }}>Channel Gross Margin</th>
                <th style={{ padding: '10px' }}>YoY Growth Velocity</th>
              </tr>
            </thead>
            <tbody>
              {revStreams.map((r, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{r.channel}</td>
                  <td style={{ padding: '10px', fontWeight: 700, color: '#059669' }}>{r.mtdRev}</td>
                  <td style={{ padding: '10px', fontWeight: 600, color: '#2563eb' }}>{r.share}</td>
                  <td style={{ padding: '10px' }}>{r.avgUserSpend}</td>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{r.grossMargin}</td>
                  <td style={{ padding: '10px', color: '#059669', fontWeight: 600 }}>{r.growth}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
