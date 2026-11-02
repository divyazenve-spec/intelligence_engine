import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function RevenueByCustomer() {
  const customers = [];

  return (
    <DashboardLayout
      category="Revenue & Sales"
      subcategory="Revenue by Customer"
      title="High-Value Client Lifetime Value & Loyalty"
      subtitle="Client order frequencies, lifetime healthcare spend, and customer loyalty tiers"
      icon="👥"
      badge="Top Clients"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <KpiCard label="Top Client Spend" value="₹0" delta="18 orders" trend="up" subtext="Diamond Tier" icon="💎" />
        <KpiCard label="Avg Lifetime Value" value="₹0" delta="0.0%" trend="up" subtext="Per active parent" icon="📈" />
        <KpiCard label="Repeat Customer Rate" value="0.0%" delta="0.0%" trend="up" subtext="Multi-order loyalty" icon="🔁" />
        <KpiCard label="Loyalty Tier Members" value="0" delta="Tiered base" trend="neutral" subtext="Diamond/Gold/Silver" icon="🏅" />
      </div>

      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px 24px'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>VIP Client Directory</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))', color: 'var(--muted-foreground, #94a3b8)', fontSize: '11px' }}>
                <th style={{ padding: '10px 14px 10px 16px', verticalAlign: 'middle' }}>Customer Name</th>
                <th style={{ padding: '10px 14px', verticalAlign: 'middle' }}>City</th>
                <th style={{ padding: '10px 14px', verticalAlign: 'middle' }}>Pet Profile</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', verticalAlign: 'middle' }}>Lifetime Spend</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', verticalAlign: 'middle' }}>Orders</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', verticalAlign: 'middle' }}>Avg Ticket</th>
                <th style={{ padding: '10px 16px 10px 14px', textAlign: 'right', verticalAlign: 'middle' }}>Loyalty Tier</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.name} style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.04))' }}>
                  <td style={{ padding: '12px 14px 12px 16px', fontWeight: 700, verticalAlign: 'middle' }}>{c.name}</td>
                  <td style={{ padding: '12px 14px', verticalAlign: 'middle' }}>{c.city}</td>
                  <td style={{ padding: '12px 14px', color: 'var(--muted-foreground, #94a3b8)', verticalAlign: 'middle' }}>{c.pet}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace', verticalAlign: 'middle' }}>{c.spend}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', verticalAlign: 'middle' }}>{c.orders}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', verticalAlign: 'middle' }}>{c.aov}</td>
                  <td style={{ padding: '12px 16px 12px 14px', textAlign: 'right', verticalAlign: 'middle' }}>
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
