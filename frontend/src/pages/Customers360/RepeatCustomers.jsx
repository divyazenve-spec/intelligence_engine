import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function RepeatCustomers() {
  const repeatMetrics = [];

  const cardStyle = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Customers 360°"
      subcategory="Repurchase Dynamics"
      title="Repeat Customers & Order Frequency Progression"
      subtitle="Reorder curve analysis, multi-visit customer counts, replenishment intervals, and habit formation loops"
      icon="🔄"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Overall Repeat Purchase Rate" value="0.0%" delta="0.0%" trend="neutral" subtext="No reorders logged" icon="🔄" />
        <KpiCard label="Repeat Customer Revenue" value="₹0 MTD" delta="0.0%" trend="neutral" subtext="Predictable recurring baseline" icon="💰" />
        <KpiCard label="Avg Order Count / User" value="0 Orders" delta="0.0%" trend="neutral" subtext="Annualized frequency" icon="🛒" />
        <KpiCard label="Reorder Retention 90D" value="0.0%" delta="0.0%" trend="neutral" subtext="No loyalty club logged" icon="🛡️" />
      </div>

      <div style={cardStyle}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>🔄 Customer Order Progression Ladder</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border, #e2e8f0)', textAlign: 'left', color: 'var(--muted-foreground, #475569)' }}>
                <th style={{ padding: '10px' }}>Order Frequency Ladder</th>
                <th style={{ padding: '10px' }}>Customer Count</th>
                <th style={{ padding: '10px' }}>Base Share</th>
                <th style={{ padding: '10px' }}>Next Purchase Likelihood</th>
                <th style={{ padding: '10px' }}>Avg Days to Next Reorder</th>
                <th style={{ padding: '10px' }}>Automated CRM Action</th>
              </tr>
            </thead>
            <tbody>
              {repeatMetrics.length === 0 ? (<tr><td colSpan="6" style={{ textAlign: "center", padding: "32px", color: "var(--muted-foreground, #64748b)" }}>No repeat customer records found</td></tr>) : repeatMetrics.map((r, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{r.tier}</td>
                  <td style={{ padding: '10px', fontWeight: 700, color: '#2563eb' }}>{r.count.toLocaleString()}</td>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{r.share}</td>
                  <td style={{ padding: '10px', color: '#059669', fontWeight: 700 }}>{r.nextPurchaseProb}</td>
                  <td style={{ padding: '10px', color: '#64748b' }}>{r.avgDaysToReorder}</td>
                  <td style={{ padding: '10px', color: '#475569' }}>{r.marketingAction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
