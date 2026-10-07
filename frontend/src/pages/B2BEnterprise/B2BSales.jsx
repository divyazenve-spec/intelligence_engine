import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function B2BSales() {
  const reps = [];

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="B2B / Enterprise"
      subcategory="B2B Sales"
      title="Enterprise Sales Pipeline & Performance"
      subtitle="Deal stage velocity, relationship manager quotas, RFP win-loss ratios, and qualified corporate pipeline"
      icon="💼"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Quarterly Enterprise Bookings" value="₹0" delta="+28.4% YoY" trend="up" subtext="Quota: ₹0" icon="💼" />
        <KpiCard label="Pipeline Value (Q4)" value="₹0" delta="14 deals in RFP" trend="up" subtext="Weighted: ₹0" icon="📈" />
        <KpiCard label="Deal Win Rate" value="0.0%" delta="+6.2% vs industry" trend="up" subtext="Enterprise proposals" icon="🏆" />
        <KpiCard label="Avg Sales Cycle" value="42 Days" delta="-8 days reduction" trend="up" subtext="Standardized MSAs" icon="⚡" />
      </div>

      <div style={card}>
        <h3 style={{ margin: '0 0 12px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>Enterprise Account Executives & Quota Scorecard</h3>
        <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Commercial quotas, year-to-date attainment, pipeline coverage, and commissions</p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)' }}>
                <th style={{ padding: '10px 12px' }}>Sales Executive</th>
                <th style={{ padding: '10px 12px' }}>Assigned Accounts</th>
                <th style={{ padding: '10px 12px' }}>Target Quota</th>
                <th style={{ padding: '10px 12px' }}>Closed Bookings</th>
                <th style={{ padding: '10px 12px' }}>Attainment %</th>
                <th style={{ padding: '10px 12px' }}>Live Pipeline</th>
                <th style={{ padding: '10px 12px' }}>Commissions</th>
              </tr>
            </thead>
            <tbody>
              {reps.map(r => (
                <tr key={r.rep} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                  <td style={{ padding: '12px', fontWeight: 600 }}>{r.rep}</td>
                  <td style={{ padding: '12px' }}>{r.accounts} Accounts</td>
                  <td style={{ padding: '12px' }}>{r.quota}</td>
                  <td style={{ padding: '12px', fontWeight: 600, color: '#059669' }}>{r.actual}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ padding: '3px 8px', borderRadius: '999px', fontSize: '10px', fontWeight: 600, background: 'rgba(16,185,129,0.12)', color: '#059669' }}>
                      {r.attainment}
                    </span>
                  </td>
                  <td style={{ padding: '12px', color: '#4338ca', fontWeight: 600 }}>{r.pipeline}</td>
                  <td style={{ padding: '12px' }}>{r.commission}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
