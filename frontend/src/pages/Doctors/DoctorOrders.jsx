import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function DoctorOrders() {
  const clinicalOrders = [];

  const cardStyle = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Doctors"
      subcategory="Clinical Prescriptions"
      title="Doctor Prescriptions & Pharmacy Order Tracking"
      subtitle="Physician pharmaceutical orders, surgical consumables requisition, and automated clinical dispensary sync"
      icon="📦"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Physician Orders Raised" value="0" delta="0.0%" trend="neutral" subtext="No orders raised" icon="📦" />
        <KpiCard label="Order Fulfillment Rate" value="0.0%" delta="--" trend="neutral" subtext="No orders recorded" icon="⚡" />
        <KpiCard label="Order Value Generated" value="₹0" delta="0.0%" trend="neutral" subtext="No order value generated" icon="💰" />
        <KpiCard label="Formulary Adherence" value="0.0%" delta="--" trend="neutral" subtext="No requisitions logged" icon="🛡️" />
      </div>

      <div style={cardStyle}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>📦 Clinical Dispensary & Requisition Log</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border, #e2e8f0)', textAlign: 'left', color: 'var(--muted-foreground, #475569)' }}>
                <th style={{ padding: '10px' }}>Order ID</th>
                <th style={{ padding: '10px' }}>Doctor Name</th>
                <th style={{ padding: '10px' }}>Patient / Pet</th>
                <th style={{ padding: '10px' }}>Prescribed Drugs & Supplies</th>
                <th style={{ padding: '10px' }}>Dispensary Center</th>
                <th style={{ padding: '10px' }}>Total Amount</th>
                <th style={{ padding: '10px' }}>Fulfillment Status</th>
              </tr>
            </thead>
            <tbody>
              {clinicalOrders.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '32px', color: 'var(--muted-foreground, #64748b)' }}>
                    No clinical orders found
                  </td>
                </tr>
              ) : (
                clinicalOrders.map((o, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                    <td style={{ padding: '10px', fontFamily: 'monospace', fontWeight: 600 }}>{o.id}</td>
                    <td style={{ padding: '10px', fontWeight: 600 }}>{o.doctor}</td>
                    <td style={{ padding: '10px' }}>{o.patient}</td>
                    <td style={{ padding: '10px', color: '#64748b' }}>{o.items}</td>
                    <td style={{ padding: '10px' }}>{o.center}</td>
                    <td style={{ padding: '10px', fontWeight: 600, color: '#059669' }}>{o.amount}</td>
                    <td style={{ padding: '10px' }}>
                      <span style={{ padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, background: 'rgba(16,185,129,0.12)', color: '#047857' }}>
                        {o.status}
                      </span>
                    </td>
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
