import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function CustomerRevenue() {
  const revStreams = [];

  const cardStyle = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Customers 360°"
      subcategory="Financial Intelligence"
      title="Customer Revenue & Monetization Streams"
      subtitle="Total customer-generated gross revenue, channel share, ARPU trajectory, and category margin analysis"
      icon="💰"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Customer Billed Revenue" value="₹0 MTD" delta="0.0%" trend="neutral" subtext="All retail and clinical channels" icon="💰" />
        <KpiCard label="Monthly ARPU" value="₹0 / User" delta="0.0%" trend="neutral" subtext="Across active transactors" icon="📈" />
        <KpiCard label="Blended Gross Margin" value="0.0%" delta="0.0%" trend="neutral" subtext="High margin clinical services" icon="💎" />
        <KpiCard label="Subscription Recurring Share" value="0.0%" delta="0.0%" trend="neutral" subtext="Recurring baseline" icon="🔄" />
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
              {revStreams.length === 0 ? (<tr><td colSpan="8" style={{ textAlign: "center", padding: "32px", color: "var(--muted-foreground, #64748b)" }}>No customer revenue records found</td></tr>) : revStreams.map((r, idx) => (
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
