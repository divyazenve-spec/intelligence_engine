import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function B2BRevenue() {
  const streams = [];

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="B2B / Enterprise"
      subcategory="B2B Revenue"
      title="B2B Revenue Trajectory & Unit Economics"
      subtitle="Institutional revenue breakdowns, channel contribution margins, contract run rates, and fiscal projections"
      icon="💰"
      badge="₹0 Annualized"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Annualized B2B Run Rate" value="₹0" delta="+34.2% YoY" trend="up" subtext="Target: ₹0" icon="💰" />
        <KpiCard label="Blended Gross Margin" value="0.0%" delta="+2.1% YoY" trend="up" subtext="Supply chain economies" icon="📈" />
        <KpiCard label="Revenue per Enterprise Account" value="₹0 / mo" delta="+14% YoY" trend="up" subtext="Higher order basket size" icon="🏢" />
        <KpiCard label="Repeat Contract Revenue" value="0.0%" delta="Recurring volume" trend="up" subtext="High revenue predictability" icon="🔄" />
      </div>

      <div style={card}>
        <h3 style={{ margin: '0 0 12px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>B2B Enterprise Revenue Streams & Profit Contribution</h3>
        <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Revenue realization, product margins, and YoY channel momentum</p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)' }}>
                <th style={{ padding: '10px 12px' }}>Revenue Stream</th>
                <th style={{ padding: '10px 12px' }}>Share of B2B</th>
                <th style={{ padding: '10px 12px' }}>MTD Revenue</th>
                <th style={{ padding: '10px 12px' }}>YTD Realized</th>
                <th style={{ padding: '10px 12px' }}>Gross Margin</th>
                <th style={{ padding: '10px 12px' }}>Trajectory</th>
              </tr>
            </thead>
            <tbody>
              {streams.map(s => (
                <tr key={s.stream} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                  <td style={{ padding: '12px', fontWeight: 600 }}>{s.stream}</td>
                  <td style={{ padding: '12px' }}>{s.share}</td>
                  <td style={{ padding: '12px', fontWeight: 600, color: '#059669' }}>{s.mtd}</td>
                  <td style={{ padding: '12px' }}>{s.ytd}</td>
                  <td style={{ padding: '12px', fontWeight: 600, color: '#4338ca' }}>{s.margin}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ padding: '3px 8px', borderRadius: '999px', fontSize: '10px', fontWeight: 600, background: 'rgba(16,185,129,0.12)', color: '#059669' }}>
                      {s.status}
                    </span>
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
