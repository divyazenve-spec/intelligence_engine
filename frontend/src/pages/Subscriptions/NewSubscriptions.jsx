import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function NewSubscriptions() {
  const acquisitions = [
    { channel: 'Zenve SuperApp First-Time Pet Onboarding', newSubs: 38, cac: '₹420', conversion: '14.2%', mrrAdded: '₹56,400', payback: '22 Days' },
    { channel: 'Veterinary Clinic Post-Consult Checkout', newSubs: 24, cac: '₹180', conversion: '32.5%', mrrAdded: '₹45,600', payback: '8 Days' },
    { channel: 'Puppy & Kitten Welcome Vaccine Camp', newSubs: 16, cac: '₹310', conversion: '28.0%', mrrAdded: '₹23,984', payback: '14 Days' },
    { channel: 'Flagship Showroom Haute Couture VIP Signups', newSubs: 12, cac: '₹550', conversion: '18.4%', mrrAdded: '₹34,200', payback: '16 Days' },
    { channel: 'Corporate Wellness Infosys & Wipro Portals', newSubs: 18, cac: '₹0 (Partner)', conversion: '42.0%', mrrAdded: '₹22,500', payback: 'Instant' }
  ];

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Subscriptions"
      subcategory="New Subscriptions"
      title="New Subscriber Acquisition & Channel Velocity"
      subtitle="Monthly new subscriber signups, acquisition channel conversion, customer acquisition cost (CAC), and payback period"
      icon="✨"
      badge="108 New Subs MTD"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="New Subscriptions (MTD)" value="108 Signups" delta="+34% vs last month" trend="up" subtext="Target: 90 signups" icon="✨" />
        <KpiCard label="Blended CAC per Subscriber" value="₹342" delta="-18% YoY" trend="up" subtext="Clinic referral advantage" icon="🎯" />
        <KpiCard label="New MRR Added" value="₹1,82,684" delta="+28% MoM" trend="up" subtext="Pure recurring ARR boost" icon="💰" />
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
