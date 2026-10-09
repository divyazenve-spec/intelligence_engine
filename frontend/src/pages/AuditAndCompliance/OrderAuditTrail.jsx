import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function OrderAuditTrail() {
  const orders = [];

  return (
    <DashboardLayout
      category="Audit & Compliance"
      subcategory="Order State Transitions & Overrides"
      title="Order State & Fulfillment Audit Trail"
      subtitle="State transitions, doctor verifications, price override logs, and courier handover receipts"
      icon="📦"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Audited Orders Today" value="0 Orders" delta="0.0%" trend="neutral" subtext="0 tracked orders" icon="📦" />
        <KpiCard label="OTP Delivery Validation" value="0.0%" delta="0.0%" trend="neutral" subtext="0 validations" icon="📱" />
        <KpiCard label="Price / Discount Overrides" value="0 Logged" delta="0.0%" trend="neutral" subtext="0 overrides" icon="🏷️" />
        <KpiCard label="Prescription Match SLA" value="0 Mins" delta="0.0%" trend="neutral" subtext="0 prescription checks" icon="🩺" />
      </div>

      <div style={{ background: 'var(--card, #ffffff)', border: '1px solid var(--border, #e2e8f0)', borderRadius: '12px', padding: '20px' }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>Order Lifecycle State Audit</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)', fontSize: '11px', textTransform: 'uppercase' }}>
                <th style={{ padding: '10px 12px' }}>Order ID</th>
                <th style={{ padding: '10px 12px' }}>Customer & Location</th>
                <th style={{ padding: '10px 12px' }}>Lifecycle Event</th>
                <th style={{ padding: '10px 12px' }}>Previous State</th>
                <th style={{ padding: '10px 12px' }}>New State</th>
                <th style={{ padding: '10px 12px' }}>Authorizing Officer</th>
                <th style={{ padding: '10px 12px' }}>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ padding: '36px', textAlign: 'center', color: 'var(--muted-foreground, #64748b)' }}>
                    No order audit trail records found.
                  </td>
                </tr>
              ) : (
                orders.map((o, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--border, #f1f5f9)' }}>
                    <td style={{ padding: '12px', fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px', color: '#2563eb', fontWeight: 600 }}>{o.orderId}</td>
                    <td style={{ padding: '12px', fontWeight: 700 }}>{o.customer}</td>
                    <td style={{ padding: '12px' }}>{o.event}</td>
                    <td style={{ padding: '12px' }}><span style={{ padding: '2px 8px', borderRadius: '99px', background: '#fef3c7', color: '#b45309', fontSize: '11px', fontWeight: 600 }}>{o.prevStatus}</span></td>
                    <td style={{ padding: '12px' }}><span style={{ padding: '2px 8px', borderRadius: '99px', background: '#dcfce7', color: '#15803d', fontSize: '11px', fontWeight: 600 }}>{o.newStatus}</span></td>
                    <td style={{ padding: '12px', color: '#64748b' }}>{o.officer}</td>
                    <td style={{ padding: '12px', fontSize: '12px' }}>{o.time}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
