import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function CustomerOrders() {
  const customerOrdersList = [];

  const cardStyle = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Customers 360°"
      subcategory="Omni-Channel Purchases"
      title="Customer Orders & Transaction History"
      subtitle="Complete multi-channel sales orders, clinic service bookings, pharmacy prescriptions, and dispatch status"
      icon="🛒"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Customer Orders" value="28,420 Orders" delta="+24.2% YoY" trend="up" subtext="Across app, clinic & web" icon="🛒" />
        <KpiCard label="Average Order Value" value="₹0" delta="+11.5% vs FY25" trend="up" subtext="Combined retail & medical basket" icon="💰" />
        <KpiCard label="60-Minute Fast Delivery" value="0.0%" delta="98.2% on-time" trend="up" subtext="Hyperlocal quick-commerce" icon="⚡" />
        <KpiCard label="Omni-Basket Attach Rate" value="0.0%" delta="Food + Meds + Spa" trend="up" subtext="High multi-category cross-sell" icon="📦" />
      </div>

      <div style={cardStyle}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>🛒 Live Customer Purchase & Appointment Stream</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border, #e2e8f0)', textAlign: 'left', color: 'var(--muted-foreground, #475569)' }}>
                <th style={{ padding: '10px' }}>Order ID</th>
                <th style={{ padding: '10px' }}>Pet Parent</th>
                <th style={{ padding: '10px' }}>Pet Patient</th>
                <th style={{ padding: '10px' }}>Ordered Items / Services</th>
                <th style={{ padding: '10px' }}>Order Total</th>
                <th style={{ padding: '10px' }}>Sales Channel</th>
                <th style={{ padding: '10px' }}>Fulfillment Status</th>
                <th style={{ padding: '10px' }}>Time</th>
              </tr>
            </thead>
            <tbody>
              {customerOrdersList.map((o, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                  <td style={{ padding: '10px', fontFamily: 'monospace', fontWeight: 600 }}>{o.orderId || o.id}</td>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{o.parent}</td>
                  <td style={{ padding: '10px', color: '#64748b' }}>{o.pet}</td>
                  <td style={{ padding: '10px' }}>{o.items}</td>
                  <td style={{ padding: '10px', fontWeight: 700, color: '#059669' }}>{o.val}</td>
                  <td style={{ padding: '10px' }}><span style={{ padding: '2px 6px', background: '#eff6ff', color: '#1d4ed8', borderRadius: '4px', fontWeight: 600 }}>{o.channel}</span></td>
                  <td style={{ padding: '10px' }}>
                    <span style={{ padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, background: '#f0fdf4', color: '#16a34a' }}>
                      {o.fulfillment}
                    </span>
                  </td>
                  <td style={{ padding: '10px', color: '#64748b' }}>{o.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
