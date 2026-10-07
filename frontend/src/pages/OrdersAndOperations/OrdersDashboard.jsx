import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function OrdersDashboard() {
  const orders = [];

  return (
    <DashboardLayout
      category="Orders & Operations"
      subcategory="All Orders & 60-Min Delivery"
      title="Fulfillment & Operations Control"
      subtitle="Rapid delivery SLA monitoring, dispatch status, returns, and order workflows"
      icon="🚚"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Active Orders" value="0" delta="Today" trend="neutral" subtext="In flight" icon="📦" />
        <KpiCard label="Avg Delivery Time" value="0" delta="Under 60m" trend="up" subtext="SLA met" icon="⚡" />
        <KpiCard label="Delivered Today" value="0" delta="0.0%" trend="up" subtext="98.5% success" icon="✅" />
        <KpiCard label="Return / Refund Rate" value="0.0%" delta="Low" trend="up" subtext="Below 3% threshold" icon="🛡️" />
      </div>

      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>Live Operations Stream</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))', color: 'var(--muted-foreground, #94a3b8)', fontSize: '11px' }}>
              <th style={{ padding: '8px 12px' }}>Order ID</th>
              <th style={{ padding: '8px 12px' }}>Customer</th>
              <th style={{ padding: '8px 12px' }}>Items & Prescriptions</th>
              <th style={{ padding: '8px 12px', textAlign: 'right' }}>Amount</th>
              <th style={{ padding: '8px 12px' }}>Fulfillment SLA</th>
              <th style={{ padding: '8px 12px', textAlign: 'right' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.04))' }}>
                <td style={{ padding: '12px', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{o.id}</td>
                <td style={{ padding: '12px' }}>{o.customer}</td>
                <td style={{ padding: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>{o.items}</td>
                <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700 }}>{o.amount}</td>
                <td style={{ padding: '12px' }}>⚡ {o.time}</td>
                <td style={{ padding: '12px', textAlign: 'right' }}>
                  <span style={{
                    padding: '2px 8px',
                    borderRadius: '99px',
                    background: o.status === 'Delivered' ? 'rgba(16,185,129,0.15)' : 'rgba(59,130,246,0.15)',
                    color: o.status === 'Delivered' ? '#10b981' : '#3b82f6',
                    fontWeight: 600,
                    fontSize: '11px'
                  }}>{o.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
