import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function ServiceProfitability() {
  const profitLines = [];

  const costBreakdown = [];

  return (
    <DashboardLayout
      category="Veterinary Services"
      subcategory="Service Profitability"
      title="Veterinary Clinical Unit Economics & Margin Diagnostics"
      subtitle="Gross profit margins, doctor compensation splits, surgical consumable expenses, diagnostic test cost-of-goods, and operating EBITDA"
      icon="📈"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Blended Gross Margin" value="0.0%" delta="0.0%" trend="neutral" subtext="Benchmark: --" icon="📈" />
        <KpiCard label="Clinical Gross Profit" value="₹0" delta="0.0%" trend="neutral" subtext="From ₹0 revenue" icon="💰" />
        <KpiCard label="Doctor Commission Ratio" value="0.0%" delta="0.0%" trend="neutral" subtext="Highly accretive payout model" icon="👨‍⚕️" />
        <KpiCard label="EBITDA Contribution" value="₹0" delta="0.0%" trend="neutral" subtext="After all hub operating overheads" icon="💎" />
      </div>

      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Clinical Service Line Profitability & Margin Matrix</h3>
          <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>Granular contribution margins per specialty after direct consumables, lab reagents, and doctor clinical incentives</p>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', color: '#64748b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Service Line</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Revenue (MTD)</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Direct COGS</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Gross Margin (₹)</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Margin %</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Key Cost Drivers</th>
                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Tier</th>
              </tr>
            </thead>
            <tbody>
              {profitLines.map(p => (
                <tr key={p.service} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: '#0f172a' }}>{p.service}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 600, color: '#0f172a', fontFamily: '"IBM Plex Mono", monospace' }}>{p.revenue}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', color: '#dc2626', fontFamily: '"IBM Plex Mono", monospace' }}>{p.directCost}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 700, color: '#16a34a', fontFamily: '"IBM Plex Mono", monospace' }}>{p.grossProfit}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 700, color: '#2563eb' }}>{p.margin}</td>
                  <td style={{ padding: '12px 16px', color: '#64748b', fontSize: '11px' }}>{p.costDrivers}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '999px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: p.status === 'Highest Margin' ? '#dcfce7' : p.status === 'High Margin' ? '#dbeafe' : p.status.includes('EBITDA') ? '#f3e8ff' : '#f1f5f9',
                      color: p.status === 'Highest Margin' ? '#15803d' : p.status === 'High Margin' ? '#1e40af' : p.status.includes('EBITDA') ? '#7e22ce' : '#475569'
                    }}>
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Direct Clinical Expense Waterfall */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Direct Clinical Operating Expenses (Opex & Consumables)</h3>
          <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>Detailed expenditure breakdown across surgical implants, diagnostics, and clinical staff</p>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', color: '#64748b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Cost Center</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Monthly Outflow</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>% of Revenue</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Operational Rationale & Controls</th>
              </tr>
            </thead>
            <tbody>
              {costBreakdown.map(c => (
                <tr key={c.category} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>{c.category}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 700, color: '#dc2626', fontFamily: '"IBM Plex Mono", monospace' }}>{c.amount}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 600, color: '#2563eb' }}>{c.pctOfRev}</td>
                  <td style={{ padding: '12px 16px', color: '#64748b' }}>{c.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
