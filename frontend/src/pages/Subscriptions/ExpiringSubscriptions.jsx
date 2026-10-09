import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function ExpiringSubscriptions() {
  const expiring = [];

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Subscriptions"
      subcategory="Expiring Subscriptions"
      title="Upcoming Expiries & Proactive Retention Alerts"
      subtitle="Annual membership renewals due in 30 days, token expiration mitigation, and concierge outreach pipeline"
      icon="⏳"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Subscriptions Due in 30D" value="0 Plans" delta="" trend="neutral" subtext="Annual membership tier" icon="⏳" />
        <KpiCard label="Pre-Renewal Confirmation" value="0.0%" delta="" trend="neutral" subtext="Automated outreach response" icon="✅" />
        <KpiCard label="Card Token Expirations" value="0 Cards" delta="" trend="neutral" subtext="NPCI bank notification" icon="💳" />
        <KpiCard label="Concierge Retention Save Rate" value="0.0%" delta="" trend="neutral" subtext="Zero passive drop-off" icon="🛡️" />
      </div>

      <div style={card}>
        <h3 style={{ margin: '0 0 12px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>Proactive Expiration Watchlist & Action Queue</h3>
        <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Subscriptions expiring within 30 days and automated retention actions</p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)' }}>
                <th style={{ padding: '10px 12px' }}>Subscription ID</th>
                <th style={{ padding: '10px 12px' }}>Pet Patient</th>
                <th style={{ padding: '10px 12px' }}>Pet Parent</th>
                <th style={{ padding: '10px 12px' }}>Plan Details</th>
                <th style={{ padding: '10px 12px' }}>Expiry Timeline</th>
                <th style={{ padding: '10px 12px' }}>Annual Value</th>
                <th style={{ padding: '10px 12px' }}>Outreach Action Taken</th>
              </tr>
            </thead>
            <tbody>
              {expiring.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: '24px', textAlign: 'center', color: 'var(--muted-foreground, #64748b)' }}>
                    No expiring subscription records found
                  </td>
                </tr>
              ) : (
                expiring.map(e => (
                  <tr key={e.subId} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                    <td style={{ padding: '12px', fontFamily: 'monospace', fontWeight: 600 }}>{e.subId}</td>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{e.pet || e.petName}</td>
                    <td style={{ padding: '12px' }}>{e.parent}</td>
                    <td style={{ padding: '12px' }}>{e.plan}</td>
                    <td style={{ padding: '12px', color: '#d97706', fontWeight: 600 }}>{e.expiryDate}</td>
                    <td style={{ padding: '12px', fontWeight: 600, color: '#059669' }}>{e.val}</td>
                    <td style={{ padding: '12px' }}>{e.action}</td>
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
