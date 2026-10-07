import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function AllOrdersDashboard() {
  const orders = [];

  const cardStyle = {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '22px 24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
  };

  return (
    <DashboardLayout
      category="Orders & Operations"
      subcategory="All Orders"
      title="All Orders Master Ledger"
      subtitle="Comprehensive multi-channel order repository across e-commerce, pharmacy, clinical care, B2B, and fashion operations"
      icon="📋"
      badge="Master Ledger"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Master Orders" value="0" delta="0.0% MoM" trend="neutral" subtext="No records recorded" icon="📋" />
        <KpiCard label="Fulfilled & Delivered" value="0" delta="0.0% Rate" trend="neutral" subtext="No records recorded" icon="✅" />
        <KpiCard label="Processing & Active" value="0" delta="0 Active" trend="neutral" subtext="No records recorded" icon="⚡" />
        <KpiCard label="Cancelled / Returned" value="0" delta="0.0% Rate" trend="neutral" subtext="No records recorded" icon="🚫" />
        <KpiCard label="Gross Order Value" value="₹0" delta="0.0% YoY" trend="neutral" subtext="No records recorded" icon="💰" />
      </div>

      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Master Orders Repository</h3>
            <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#64748b' }}>Real-time audit log of all orders placed across all operational hubs</p>
          </div>
          <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', background: '#f1f5f9', color: '#475569', border: '1px solid #e2e8f0' }}>
            0 Records
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>ORDER ID</th>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>DATE & TIME</th>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>CUSTOMER / ENTITY</th>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>CHANNEL / SOURCE</th>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>ITEMS & FULFILLMENT</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'right' }}>ORDER AMOUNT</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'center' }}>PAYMENT STATUS</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'center' }}>FULFILLMENT SLA</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '36px', color: '#94a3b8' }}>
                    No records found
                  </td>
                </tr>
              ) : (
                orders.map((o) => (
                  <tr key={o.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{o.id}</td>
                    <td style={{ padding: '12px 16px', color: '#64748b' }}>{o.date}</td>
                    <td style={{ padding: '12px 16px', color: '#0f172a', fontWeight: 600 }}>{o.customer}</td>
                    <td style={{ padding: '12px 16px', color: '#64748b' }}>{o.channel}</td>
                    <td style={{ padding: '12px 16px', color: '#475569' }}>{o.items}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 700 }}>{o.amount}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>{o.paymentStatus}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>{o.sla}</td>
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
