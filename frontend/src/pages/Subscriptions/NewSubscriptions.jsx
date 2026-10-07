import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function NewSubscriptions() {
  const acquisitions = [];

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Subscriptions"
      subcategory="New Subscriptions"
      title="New Subscriber Acquisition & Channel Velocity"
      subtitle="Monthly new subscriber signups, acquisition channel conversion, customer acquisition cost (CAC), and payback period"
      icon="✨"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="New Subscriptions (MTD)" value="108 Signups" delta="+34% vs last month" trend="up" subtext="Target: 90 signups" icon="✨" />
        <KpiCard label="Blended CAC per Subscriber" value="₹0" delta="-18% YoY" trend="up" subtext="Clinic referral advantage" icon="🎯" />
        <KpiCard label="New MRR Added" value="₹0" delta="+28% MoM" trend="up" subtext="Pure recurring ARR boost" icon="💰" />
        <KpiCard label="Avg Payback Period" value="16.4 Days" delta="Instant unit profitability" trend="up" subtext="First month margin positive" icon="⏱️" />
      </div>

      <div style={card}>
        <h3 style={{ margin: '0 0 12px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>New Subscriber Acquisition Channels & Unit Economics</h3>
        <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Conversion velocity, CAC efficiency, MRR addition, and channel payback duration</p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)' }}>
                <th style={{ padding: '10px 12px' }}>Acquisition Channel</th>
                <th style={{ padding: '10px 12px' }}>New Signups</th>
                <th style={{ padding: '10px 12px' }}>Channel CAC</th>
                <th style={{ padding: '10px 12px' }}>Lead-to-Sub Conversion</th>
                <th style={{ padding: '10px 12px' }}>New MRR Added</th>
                <th style={{ padding: '10px 12px' }}>Payback Period</th>
              </tr>
            </thead>
            <tbody>
              {acquisitions.map(a => (
                <tr key={a.channel} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                  <td style={{ padding: '12px', fontWeight: 600 }}>{a.channel}</td>
                  <td style={{ padding: '12px', fontWeight: 600, color: '#4338ca' }}>{a.newSubs} Subs</td>
                  <td style={{ padding: '12px' }}>{a.cac}</td>
                  <td style={{ padding: '12px', fontWeight: 600, color: '#059669' }}>{a.conversion}</td>
                  <td style={{ padding: '12px', fontWeight: 600 }}>{a.mrrAdded}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ padding: '3px 8px', borderRadius: '999px', fontSize: '10px', fontWeight: 600, background: 'rgba(16,185,129,0.12)', color: '#059669' }}>
                      {a.payback}
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
