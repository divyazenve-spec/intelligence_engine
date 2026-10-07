import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function DoctorOrders() {
  const clinicalOrders = [];

  const cardStyle = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Doctors"
      subcategory="Clinical Prescriptions & Orders"
      title="Doctor Prescriptions & Pharmacy Order Tracking"
      subtitle="Physician pharmaceutical orders, surgical consumables requisition, and automated clinical dispensary sync"
      icon="📦"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Physician Orders Raised" value="1,480 Orders" delta="+15.2% MoM" trend="up" subtext="Direct doctor requisitions" icon="📦" />
        <KpiCard label="Order Fulfillment Rate" value="0.0%" delta="Instant dispensary" trend="up" subtext="Under 12 mins at clinic" icon="⚡" />
        <KpiCard label="Order Value Generated" value="₹0" delta="+12.8% YoY" trend="up" subtext="Pharmacy attach value" icon="💰" />
        <KpiCard label="Formulary Adherence" value="0.0%" delta="Zero out-of-stock subst." trend="up" subtext="NABH quality standards" icon="🛡️" />
      </div>

      <div style={cardStyle}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>📦 Real-Time Prescribed Order Stream</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border, #e2e8f0)', textAlign: 'left', color: 'var(--muted-foreground, #475569)' }}>
                <th style={{ padding: '10px' }}>Order ID</th>
                <th style={{ padding: '10px' }}>Attending Clinician</th>
                <th style={{ padding: '10px' }}>Items & Pharmaceuticals</th>
                <th style={{ padding: '10px' }}>Pet Patient</th>
                <th style={{ padding: '10px' }}>Order Value</th>
                <th style={{ padding: '10px' }}>Pharmacy Status</th>
                <th style={{ padding: '10px' }}>Fulfillment</th>
              </tr>
            </thead>
            <tbody>
              {clinicalOrders.map((o, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                  <td style={{ padding: '10px', fontFamily: 'monospace', fontWeight: 600 }}>{o.orderId}</td>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{o.doctor}</td>
                  <td style={{ padding: '10px' }}>{o.orderType}</td>
                  <td style={{ padding: '10px', color: '#64748b' }}>{o.pet}</td>
                  <td style={{ padding: '10px', fontWeight: 600, color: '#059669' }}>{o.val}</td>
                  <td style={{ padding: '10px' }}><span style={{ padding: '2px 6px', background: '#ecfdf5', color: '#047857', borderRadius: '4px', fontWeight: 600 }}>{o.pharmacyStatus}</span></td>
                  <td style={{ padding: '10px' }}>
                    <span style={{ padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, background: o.status === 'Fulfilled' ? 'rgba(16,185,129,0.12)' : 'rgba(245,158,11,0.12)', color: o.status === 'Fulfilled' ? '#047857' : '#b45309' }}>
                      {o.status}
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
