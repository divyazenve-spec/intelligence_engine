import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function Renewals() {
  const renewals = [];

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Subscriptions"
      subcategory="Renewals"
      title="Automated Billing Cycles & Renewal Rates"
      subtitle="Monthly automated debit execution, dunning management, card & UPI retry algorithms, and successful collection velocity"
      icon="🔄"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="First-Pass Renewal Rate" value="0.0%" delta="+1.8% vs Q2" trend="up" subtext="Automated mandate execution" icon="🔄" />
        <KpiCard label="Smart Dunning Recovery" value="0.0%" delta="9 of 12 recovered" trend="up" subtext="WhatsApp prompt + UPI retry" icon="⚡" />
        <KpiCard label="Processed Renewal Value" value="₹0" delta="MTD Realized" trend="up" subtext="Direct settlement to bank" icon="💰" />
        <KpiCard label="Involuntary Churn Rate" value="0.0%" delta="Expired card / low balance" trend="up" subtext="Industry benchmark 2.2%" icon="📉" />
      </div>

      <div style={card}>
        <h3 style={{ margin: '0 0 12px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>Monthly Renewal Batches & Auto-Debit Performance</h3>
        <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Scheduled debits, payment success rates, smart retry recovery, and collected funds</p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)' }}>
                <th style={{ padding: '10px 12px' }}>Billing Cohort</th>
                <th style={{ padding: '10px 12px' }}>Scheduled Mandates</th>
                <th style={{ padding: '10px 12px' }}>First-Pass Success</th>
                <th style={{ padding: '10px 12px' }}>Active Retry Queue</th>
                <th style={{ padding: '10px 12px' }}>Unrecovered</th>
                <th style={{ padding: '10px 12px' }}>Net Renewal Rate</th>
                <th style={{ padding: '10px 12px' }}>Collected Revenue</th>
              </tr>
            </thead>
            <tbody>
              {renewals.map(r => (
                <tr key={r.cohort} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                  <td style={{ padding: '12px', fontWeight: 600 }}>{r.cohort}</td>
                  <td style={{ padding: '12px' }}>{r.scheduled} Debits</td>
                  <td style={{ padding: '12px', color: '#059669', fontWeight: 600 }}>{r.successful}</td>
                  <td style={{ padding: '12px', color: '#d97706' }}>{r.retryQueue}</td>
                  <td style={{ padding: '12px', color: '#dc2626' }}>{r.failed}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ padding: '3px 8px', borderRadius: '999px', fontSize: '10px', fontWeight: 600, background: 'rgba(16,185,129,0.12)', color: '#059669' }}>
                      {r.rate}
                    </span>
                  </td>
                  <td style={{ padding: '12px', fontWeight: 600, color: '#4338ca' }}>{r.processedRev}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
