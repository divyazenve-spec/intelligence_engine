import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function NewCustomers() {
  const newSignups = [];

  const cardStyle = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Customers 360°"
      subcategory="Acquisition & Onboarding"
      title="New Customer Acquisition & First-Order Velocity"
      subtitle="New pet parent signups, onboarding funnel progression, acquisition channels, and CAC efficiency"
      icon="✨"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="New Customers (MTD)" value="0" delta="0.0%" trend="neutral" subtext="No accounts active" icon="✨" />
        <KpiCard label="Blended CAC" value="₹0 / Acq" delta="0.0%" trend="neutral" subtext="High organic referral mix" icon="📉" />
        <KpiCard label="Day 1 Activation Rate" value="0.0%" delta="0.0%" trend="neutral" subtext="No installs active" icon="⚡" />
        <KpiCard label="First Order Avg. Basket" value="₹0" delta="0.0%" trend="neutral" subtext="Welcome bundle attach" icon="🛒" />
      </div>

      <div style={cardStyle}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>✨ Recent New Pet Parent Registrations & First Purchase</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border, #e2e8f0)', textAlign: 'left', color: 'var(--muted-foreground, #475569)' }}>
                <th style={{ padding: '10px' }}>Customer ID</th>
                <th style={{ padding: '10px' }}>Pet Parent</th>
                <th style={{ padding: '10px' }}>Pet Details</th>
                <th style={{ padding: '10px' }}>Acquisition Channel</th>
                <th style={{ padding: '10px' }}>Signup Date</th>
                <th style={{ padding: '10px' }}>First Order Items & Value</th>
                <th style={{ padding: '10px' }}>Attributed CAC</th>
                <th style={{ padding: '10px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {newSignups.map((n, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                  <td style={{ padding: '10px', fontFamily: 'monospace', fontWeight: 600 }}>{n.id}</td>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{n.name}</td>
                  <td style={{ padding: '10px', color: '#475569' }}>{n.pet}</td>
                  <td style={{ padding: '10px' }}><span style={{ padding: '2px 8px', background: '#eff6ff', color: '#1d4ed8', borderRadius: '4px', fontWeight: 600 }}>{n.channel}</span></td>
                  <td style={{ padding: '10px', color: '#64748b' }}>{n.date}</td>
                  <td style={{ padding: '10px', fontWeight: 600, color: '#059669' }}>{n.firstOrder}</td>
                  <td style={{ padding: '10px', color: '#64748b' }}>{n.cac}</td>
                  <td style={{ padding: '10px' }}>
                    <span style={{ padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, background: '#f0fdf4', color: '#16a34a' }}>
                      {n.status}
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
