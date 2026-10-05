import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function SubscriptionAnalytics() {
  const cohorts = [
    { cohort: 'Q1 2026 Cohort', startingUsers: 140, m3Ret: '96.4%', m6Ret: '92.1%', m9Ret: '89.5%', cumulativeLtv: '₹18,400', ltvCacRatio: '5.2x' },
    { cohort: 'Q2 2026 Cohort', startingUsers: 185, m3Ret: '97.2%', m6Ret: '93.5%', m9Ret: '—', cumulativeLtv: '₹14,200', ltvCacRatio: '5.5x' },
    { cohort: 'Q3 2026 Cohort', startingUsers: 240, m3Ret: '98.0%', m6Ret: '—', m9Ret: '—', cumulativeLtv: '₹8,900', ltvCacRatio: '5.8x' },
    { cohort: 'Q4 2026 (MTD)', startingUsers: 108, m3Ret: '—', m6Ret: '—', m9Ret: '—', cumulativeLtv: '₹2,400', ltvCacRatio: '6.1x (Proj)' }
  ];

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Subscriptions"
      subcategory="Analytics"
      title="Cohort Retention & Lifetime Value (LTV) Deep-Dive"
      subtitle="Multi-month retention heatmaps, customer lifetime value expansion, payback velocity, and subscriber health scores"
      icon="📊"
      badge="5.4x LTV / CAC"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Blended LTV / CAC" value="5.4x" delta="World-class > 3.0x" trend="up" subtext="Healthy acquisition engine" icon="📊" />
        <KpiCard label="Average Customer Lifetime" value="18.2 Months" delta="+2.6 mo vs FY25" trend="up" subtext="Long-term pet relationship" icon="⏱️" />
        <KpiCard label="Quick Ratio (Growth / Churn)" value="7.7x" delta="New MRR vs Lost MRR" trend="up" subtext="Extremely healthy growth" icon="🚀" />
        <KpiCard label="Net Revenue Retention (NRR)" value="114.2%" delta="+14.2% expansion" trend="up" subtext="Negative net churn" icon="📈" />
      </div>

      <div style={card}>
        <h3 style={{ margin: '0 0 12px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>Subscriber Cohort Retention Analysis</h3>
        <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Month-over-month cohort retention longevity, cumulative customer LTV, and unit efficiency</p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)' }}>
                <th style={{ padding: '10px 12px' }}>Signup Cohort</th>
                <th style={{ padding: '10px 12px' }}>Starting Subscribers</th>
                <th style={{ padding: '10px 12px' }}>Month 3 Retention</th>
                <th style={{ padding: '10px 12px' }}>Month 6 Retention</th>
                <th style={{ padding: '10px 12px' }}>Month 9 Retention</th>
                <th style={{ padding: '10px 12px' }}>Cumulative LTV</th>
                <th style={{ padding: '10px 12px' }}>LTV / CAC Multiple</th>
              </tr>
            </thead>
            <tbody>
              {cohorts.map(c => (
                <tr key={c.cohort} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                  <td style={{ padding: '12px', fontWeight: 600 }}>{c.cohort}</td>
                  <td style={{ padding: '12px' }}>{c.startingUsers} Pets</td>
                  <td style={{ padding: '12px', color: '#059669', fontWeight: 600 }}>{c.m3Ret}</td>
                  <td style={{ padding: '12px', color: '#059669', fontWeight: 600 }}>{c.m6Ret}</td>
                  <td style={{ padding: '12px', color: '#059669', fontWeight: 600 }}>{c.m9Ret}</td>
                  <td style={{ padding: '12px', fontWeight: 600, color: '#4338ca' }}>{c.cumulativeLtv}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ padding: '3px 8px', borderRadius: '999px', fontSize: '10px', fontWeight: 600, background: 'rgba(16,185,129,0.12)', color: '#059669' }}>
                      {c.ltvCacRatio}
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
