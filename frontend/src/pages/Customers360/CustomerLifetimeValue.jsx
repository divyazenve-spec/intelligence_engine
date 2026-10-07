import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function CustomerLifetimeValue() {
  const ltvSegments = [];

  const cardStyle = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Customers 360°"
      subcategory="Unit Economics & Value"
      title="Customer Lifetime Value (LTV) & CAC Multiples"
      subtitle="Cohort lifetime economics, predictive CLV models, customer gross margin contribution, and LTV:CAC ratios"
      icon="💎"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Average Blended LTV" value="₹0" delta="+14.2% YoY" trend="up" subtext="Across 12,480 active accounts" icon="💎" />
        <KpiCard label="Blended LTV : CAC Multiple" value="5.8x" delta="+0.8x vs FY25" trend="up" subtext="Payback period: 2.1 months" icon="📈" />
        <KpiCard label="Average Customer Lifespan" value="26.4 Months" delta="+4.2 months YoY" trend="up" subtext="Increasing membership retention" icon="⏳" />
        <KpiCard label="Cumulative Cohort GMV" value="₹0" delta="Historic realized value" trend="up" subtext="Since platform inception" icon="💰" />
      </div>

      <div style={cardStyle}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>💎 Customer Lifetime Value (LTV) Tier Breakdown</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border, #e2e8f0)', textAlign: 'left', color: 'var(--muted-foreground, #475569)' }}>
                <th style={{ padding: '10px' }}>Value Tier Segment</th>
                <th style={{ padding: '10px' }}>Active Customers</th>
                <th style={{ padding: '10px' }}>Avg Lifespan</th>
                <th style={{ padding: '10px' }}>Annual Spend</th>
                <th style={{ padding: '10px' }}>Estimated LTV</th>
                <th style={{ padding: '10px' }}>Gross Margin %</th>
                <th style={{ padding: '10px' }}>LTV : CAC Multiple</th>
              </tr>
            </thead>
            <tbody>
              {ltvSegments.map((s, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{s.segment}</td>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{s.customers.toLocaleString()}</td>
                  <td style={{ padding: '10px', color: '#64748b' }}>{s.avgLifespan}</td>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{s.avgAnnualSpend}</td>
                  <td style={{ padding: '10px', fontWeight: 700, color: '#059669' }}>{s.ltvValue}</td>
                  <td style={{ padding: '10px' }}>{s.marginContrib}</td>
                  <td style={{ padding: '10px', fontWeight: 700, color: '#2563eb' }}>{s.ltvCac}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
