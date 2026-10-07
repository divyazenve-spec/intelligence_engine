import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function MarketingROI() {
  const financialROI = [];

  return (
    <DashboardLayout
      category="Marketing"
      subcategory="Marketing ROI"
      title="Net Marketing Return on Investment (ROI)"
      subtitle="Margin-adjusted financial return, gross profit contribution, and payback duration"
      icon="💎"
      badge="+168% Net Blended ROI"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Net Marketing ROI" value="0.0%" delta="0.0%" trend="up" subtext="Net profit / Ad spend" icon="📈" />
        <KpiCard label="Gross Profit Lift" value="₹0" delta="0.0%" trend="up" subtext="From marketing campaigns" icon="💰" />
        <KpiCard label="Avg Payback Period" value="24.8 Days" delta="-4.2 days" trend="up" subtext="Time to recoup CAC" icon="⏱️" />
        <KpiCard label="Marketing Efficiency Ratio" value="0" delta="+0.42" trend="up" subtext="Total Sales ÷ Marketing Spend" icon="⚡" />
      </div>

      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Financial Margin-Adjusted ROI & Payback Timeline</h3>
          <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>Bottom-line profit generation after accounting for product COGS and direct advertising cost</p>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <th style={{ padding: '12px 16px' }}>Marketing Channel</th>
                <th style={{ padding: '12px 16px' }}>Spend</th>
                <th style={{ padding: '12px 16px' }}>Gross Profit Generated</th>
                <th style={{ padding: '12px 16px' }}>Net Profit Lift</th>
                <th style={{ padding: '12px 16px' }}>Net ROI %</th>
                <th style={{ padding: '12px 16px' }}>Payback Window</th>
              </tr>
            </thead>
            <tbody>
              {financialROI.map(f => (
                <tr key={f.channel} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 600, color: '#0f172a' }}>{f.channel}</td>
                  <td style={{ padding: '14px 16px', fontFamily: '"IBM Plex Mono", monospace' }}>{f.spend}</td>
                  <td style={{ padding: '14px 16px', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace' }}>{f.grossProfitContrib}</td>
                  <td style={{ padding: '14px 16px', fontWeight: 700, color: '#16a34a', fontFamily: '"IBM Plex Mono", monospace' }}>{f.netProfitLift}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ padding: '3px 8px', borderRadius: '4px', background: '#dcfce7', color: '#15803d', fontWeight: 700, fontSize: '12px' }}>
                      {f.netROI}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', color: '#475569', fontWeight: 500, fontFamily: '"IBM Plex Mono", monospace' }}>{f.paybackDays}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
