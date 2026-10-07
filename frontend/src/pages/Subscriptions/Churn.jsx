import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function Churn() {
  const churnReasons = [];

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Subscriptions"
      subcategory="Churn"
      title="Subscriber Churn Analytics & Root Cause Mitigation"
      subtitle="Voluntary and involuntary churn analysis, exit survey insights, revenue attrition, and win-back campaigns"
      icon="📉"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Gross Monthly Churn" value="0.0%" delta="-0.3% MoM" trend="up" subtext="Only 14 cancellations MTD" icon="📉" />
        <KpiCard label="Net Revenue Retention (NRR)" value="0.0%" delta="+4.2% YoY" trend="up" subtext="Expansion > Churn" icon="📈" />
        <KpiCard label="Preventable Churn Ratio" value="0.0%" delta="Mitigated via downgrades" trend="up" subtext="Saved 42% of budget exits" icon="🛡️" />
        <KpiCard label="Win-Back Campaign Rate" value="0.0%" delta="Re-subscribed in 90D" trend="up" subtext="Targeted promotion" icon="🔄" />
      </div>

      <div style={card}>
        <h3 style={{ margin: '0 0 12px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>Root Cause Churn Categorization & Remediation</h3>
        <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Exit survey telemetry, lost MRR quantification, and automated win-back workflows</p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)' }}>
                <th style={{ padding: '10px 12px' }}>Stated Cancellation Reason</th>
                <th style={{ padding: '10px 12px' }}>Share of Churn</th>
                <th style={{ padding: '10px 12px' }}>Cancelled Accounts</th>
                <th style={{ padding: '10px 12px' }}>Lost Monthly MRR</th>
                <th style={{ padding: '10px 12px' }}>Preventable?</th>
                <th style={{ padding: '10px 12px' }}>Mitigation / Win-Back Action</th>
              </tr>
            </thead>
            <tbody>
              {churnReasons.map(c => (
                <tr key={c.reason} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                  <td style={{ padding: '12px', fontWeight: 600 }}>{c.reason}</td>
                  <td style={{ padding: '12px', color: '#4338ca', fontWeight: 600 }}>{c.pct}</td>
                  <td style={{ padding: '12px' }}>{c.count} Pets</td>
                  <td style={{ padding: '12px', fontWeight: 600, color: '#dc2626' }}>{c.mrrLost}</td>
                  <td style={{ padding: '12px' }}>{c.preventable}</td>
                  <td style={{ padding: '12px', color: '#059669' }}>{c.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
