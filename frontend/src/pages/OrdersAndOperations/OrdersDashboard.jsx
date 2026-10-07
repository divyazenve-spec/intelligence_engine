import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function OrdersDashboard() {
  const orders = [];

  return (
    <DashboardLayout
      category="Orders & Operations"
      subcategory="Operations Dashboard"
      title="Fulfillment & Operations Control"
      subtitle="Rapid delivery SLA monitoring, dispatch status, returns, and order workflows"
      icon="🚚"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Active Orders" value="0" delta="Today" trend="neutral" subtext="No records recorded" icon="📦" />
        <KpiCard label="Avg Delivery Time" value="0" delta="-- mins" trend="neutral" subtext="No records recorded" icon="⚡" />
        <KpiCard label="Delivered Today" value="0" delta="0.0%" trend="neutral" subtext="No records recorded" icon="✅" />
        <KpiCard label="Return / Refund Rate" value="0.0%" delta="--%" trend="neutral" subtext="No records recorded" icon="🛡️" />
      </div>

      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Live Operations Stream</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '11px' }}>
              <th style={{ padding: '8px 12px' }}>Order ID</th>
              <th style={{ padding: '8px 12px' }}>Customer</th>
              <th style={{ padding: '8px 12px' }}>Items & Prescriptions</th>
              <th style={{ padding: '8px 12px', textAlign: 'right' }}>Amount</th>
              <th style={{ padding: '8px 12px' }}>Fulfillment SLA</th>
              <th style={{ padding: '8px 12px', textAlign: 'right' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '24px', color: '#94a3b8' }}>
                  No records found
                </td>
              </tr>
            ) : (
              orders.map((o) => (
                <tr key={o.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{o.id}</td>
                  <td style={{ padding: '12px' }}>{o.customer}</td>
                  <td style={{ padding: '12px', color: '#64748b' }}>{o.items}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700 }}>{o.amount}</td>
                  <td style={{ padding: '12px' }}>⚡ {o.time}</td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: '99px',
                      background: '#ecfdf5',
                      color: '#059669',
                      fontWeight: 600,
                      fontSize: '11px'
                    }}>{o.status}</span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
