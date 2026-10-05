import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function ExpiringSubscriptions() {
  const expiring = [
    { subId: 'SUB-EXP-1101', pet: 'Rocky (Beagle)', parent: 'Rajesh Subramaniam', plan: 'Puppy Preventive Care (Annual)', expiryDate: '2026-10-12 (In 7 Days)', val: '₹14,990 / yr', status: 'Renewal Link Sent', action: 'WhatsApp Auto-Prompt Sent' },
    { subId: 'SUB-EXP-1102', pet: 'Snowy (Persian Cat)', parent: 'Meera Chawla', plan: 'Feline Wellness & Spa (Annual)', expiryDate: '2026-10-15 (In 10 Days)', val: '₹12,500 / yr', status: 'Payment Token Expired', action: 'Card Update Prompt Triggered' },
    { subId: 'SUB-EXP-1103', pet: 'Cooper (Labrador)', parent: 'Nikhil Kashyap', plan: 'Senior Pet Geriatric (Annual)', expiryDate: '2026-10-18 (In 13 Days)', val: '₹18,500 / yr', status: 'Clinic Review Pending', action: 'Dr. Priya Assigned for Call' },
    { subId: 'SUB-EXP-1104', petName: 'Tiger (German Shepherd)', parent: 'Vikramaditya Rao', plan: 'Emergency Telehealth (Annual)', expiryDate: '2026-10-22 (In 17 Days)', val: '₹4,990 / yr', status: 'Auto-Renew Confirmed', action: 'Auto-Debit Ready' }
  ];

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Subscriptions"
      subcategory="Expiring Subscriptions"
      title="Upcoming Expiries & Proactive Retention Alerts"
      subtitle="Annual membership renewals due in 30 days, token expiration mitigation, and concierge outreach pipeline"
      icon="⏳"
      badge="14 Due in 30 Days"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Subscriptions Due in 30D" value="14 Plans" delta="₹1.84L Annualized" trend="warn" subtext="Annual membership tier" icon="⏳" />
        <KpiCard label="Pre-Renewal Confirmation" value="71.4%" delta="10 of 14 confirmed" trend="up" subtext="Automated outreach response" icon="✅" />
        <KpiCard label="Card Token Expirations" value="2 Cards" delta="Mandate token expired" trend="warn" subtext="NPCI bank notification" icon="💳" />
        <KpiCard label="Concierge Retention Save Rate" value="88.0%" delta="Direct vet nurse call" trend="up" subtext="Zero passive drop-off" icon="🛡️" />
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
              {expiring.map(e => (
                <tr key={e.subId} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                  <td style={{ padding: '12px', fontFamily: 'monospace', fontWeight: 600 }}>{e.subId}</td>
                  <td style={{ padding: '12px', fontWeight: 600 }}>{e.pet || e.petName}</td>
                  <td style={{ padding: '12px' }}>{e.parent}</td>
                  <td style={{ padding: '12px' }}>{e.plan}</td>
                  <td style={{ padding: '12px', color: '#d97706', fontWeight: 600 }}>{e.expiryDate}</td>
                  <td style={{ padding: '12px', fontWeight: 600, color: '#059669' }}>{e.val}</td>
                  <td style={{ padding: '12px' }}>{e.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
