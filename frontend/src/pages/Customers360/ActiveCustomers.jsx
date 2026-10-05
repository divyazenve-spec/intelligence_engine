import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function ActiveCustomers() {
  const activeCohorts = [
    { cohort: 'Daily Active (DAU)', count: '2,840 Users', pctTotal: '22.8%', frequency: 'App tracking, pet diary, reminders', topActivity: 'Vet chat & telemetry', trend: '+14% MoM' },
    { cohort: 'Weekly Active (WAU)', count: '6,150 Users', pctTotal: '49.3%', frequency: 'Weekly treat & pharmacy reorders', topActivity: 'Commerce cart checkout', trend: '+18% MoM' },
    { cohort: 'Monthly Active (MAU)', count: '8,420 Users', pctTotal: '67.5%', frequency: 'Monthly wellness subscription + OPD', topActivity: 'Clinic visits & food replenishment', trend: '+22% MoM' },
    { cohort: 'Quarterly Active (QAU)', count: '10,850 Users', pctTotal: '86.9%', frequency: 'Periodic grooming, flea/tick cycles', topActivity: 'Spa appointments & dental', trend: '+9% YoY' }
  ];

  const cardStyle = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Customers 360°"
      subcategory="Active Engagement & Telemetry"
      title="Active Customers & Omni-Channel Frequency"
      subtitle="Rolling DAU / WAU / MAU ratios, commerce order frequency, clinic visits, and mobile digital engagement"
      icon="⚡"
      badge="8,420 Active MAU"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Monthly Active Customers" value="8,420 MAU" delta="67.5% total base" trend="up" subtext="Transacting or visiting" icon="⚡" />
        <KpiCard label="DAU / MAU Stickiness" value="33.7%" delta="Top decile consumer app" trend="up" subtext="High daily app utility" icon="📱" />
        <KpiCard label="Avg Order Interval" value="18.2 Days" delta="-3.4 days vs FY25" trend="up" subtext="Faster replenishment" icon="⏱️" />
        <KpiCard label="Omni-Channel Engaged" value="58.4%" delta="App + Physical Clinic" trend="up" subtext="Highest LTV customer bracket" icon="🏬" />
      </div>

      <div style={cardStyle}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>⚡ Active Engagement Cadence & Platform Cohorts</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border, #e2e8f0)', textAlign: 'left', color: 'var(--muted-foreground, #475569)' }}>
                <th style={{ padding: '10px' }}>Engagement Window</th>
                <th style={{ padding: '10px' }}>Active User Count</th>
                <th style={{ padding: '10px' }}>Share of Total Base</th>
                <th style={{ padding: '10px' }}>Usage Profile & Frequency</th>
                <th style={{ padding: '10px' }}>Dominant Service Touchpoint</th>
                <th style={{ padding: '10px' }}>Growth Velocity</th>
              </tr>
            </thead>
            <tbody>
              {activeCohorts.map((c, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{c.cohort}</td>
                  <td style={{ padding: '10px', fontWeight: 700, color: '#2563eb' }}>{c.count}</td>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{c.pctTotal}</td>
                  <td style={{ padding: '10px', color: '#475569' }}>{c.frequency}</td>
                  <td style={{ padding: '10px', color: '#64748b' }}>{c.topActivity}</td>
                  <td style={{ padding: '10px', color: '#059669', fontWeight: 600 }}>{c.trend}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
