import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function CustomerRetention() {
  const retentionCohorts = [];

  const cardStyle = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Customers 360°"
      subcategory="Cohort Health & Churn"
      title="Customer Retention & Cohort Decay Curves"
      subtitle="Monthly cohort retention curves, churn rate tracking, at-risk customer indicators, and automated win-back triggers"
      icon="🛡️"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Month-1 Cohort Retention" value="0.0%" delta="+3.4% YoY" trend="up" subtext="Industry benchmark: 68%" icon="🛡️" />
        <KpiCard label="Annual Churn Rate" value="0.0%" delta="-0.24% vs FY25" trend="up" subtext="Subscribers & repeat clients" icon="📉" />
        <KpiCard label="Win-Back Campaign Success" value="0.0%" delta="Re-activated within 30D" trend="up" subtext="Automated reminder triggers" icon="🔄" />
        <KpiCard label="Net Revenue Retention (NRR)" value="0.0%" delta="+6.2% YoY" trend="up" subtext="Expansion revenue from existing base" icon="💎" />
      </div>

      <div style={cardStyle}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>🛡️ Longitudinal Cohort Retention Analysis (M1 - M12)</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border, #e2e8f0)', textAlign: 'left', color: 'var(--muted-foreground, #475569)' }}>
                <th style={{ padding: '10px' }}>Cohort Inception</th>
                <th style={{ padding: '10px' }}>Initial Customers</th>
                <th style={{ padding: '10px' }}>Month 1</th>
                <th style={{ padding: '10px' }}>Month 3</th>
                <th style={{ padding: '10px' }}>Month 6</th>
                <th style={{ padding: '10px' }}>Month 12</th>
                <th style={{ padding: '10px' }}>Cohort Health Status</th>
              </tr>
            </thead>
            <tbody>
              {retentionCohorts.map((c, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{c.cohortMonth}</td>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{c.initialSize.toLocaleString()}</td>
                  <td style={{ padding: '10px', color: '#059669', fontWeight: 700 }}>{c.m1}</td>
                  <td style={{ padding: '10px', color: '#059669', fontWeight: 600 }}>{c.m3}</td>
                  <td style={{ padding: '10px', color: '#2563eb', fontWeight: 600 }}>{c.m6}</td>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{c.m12}</td>
                  <td style={{ padding: '10px' }}>
                    <span style={{ padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, background: '#f0fdf4', color: '#16a34a' }}>
                      {c.status}
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
