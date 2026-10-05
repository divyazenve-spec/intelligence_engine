import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function AppAnalytics() {
  const osMetrics = [
    { platform: 'Android (Google Play)', installs: '184,200', activeInstalls: '142,500', dau: '28,400', mau: '112,000', stickiness: '25.3%', crashFree: '99.82%', rating: '4.8★ (32K reviews)' },
    { platform: 'iOS (Apple App Store)', installs: '96,400', activeInstalls: '84,100', dau: '19,800', mau: '68,500', stickiness: '28.9%', crashFree: '99.91%', rating: '4.9★ (18K reviews)' }
  ];

  const appActions = [
    { action: 'Pet Health Profile Created', completion: '82.4%', volume: '18,400 / mo', change: '+14.2%' },
    { action: 'Instant Tele-Vet Call Initiated', completion: '68.9%', volume: '9,200 / mo', change: '+22.5%' },
    { action: 'Prescription Reorder in 60 Mins', completion: '74.2%', volume: '14,800 / mo', change: '+19.1%' },
    { action: 'Vaccination Digital Pass Download', completion: '91.0%', volume: '12,600 / mo', change: '+31.4%' }
  ];

  return (
    <DashboardLayout
      category="Marketing"
      subcategory="App Analytics"
      title="Mobile App Acquisition & Product Analytics"
      subtitle="Android & iOS store installs, daily active users (DAU/MAU), and in-app pet health actions"
      icon="📱"
      badge="280.6K Total App Installs"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total App Downloads" value="280,600" delta="+26.8%" trend="up" subtext="Android (66%) · iOS (34%)" icon="📲" />
        <KpiCard label="Daily Active Users" value="48,200" delta="+18.4%" trend="up" subtext="DAU / MAU ratio: 26.7%" icon="⚡" />
        <KpiCard label="Monthly Active Users" value="180,500" delta="+21.2%" trend="up" subtext="Active pet parents" icon="🐾" />
        <KpiCard label="App Store Rating" value="4.85 ★" delta="+0.12" trend="up" subtext="50K+ verified reviews" icon="⭐" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '16px' }}>
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
          <h3 style={{ margin: '0 0 14px', fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Platform Distribution (Android vs iOS)</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', color: '#64748b', fontSize: '11px', textTransform: 'uppercase' }}>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>Platform</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Installs</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>DAU</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Rating</th>
              </tr>
            </thead>
            <tbody>
              {osMetrics.map(m => (
                <tr key={m.platform} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px', fontWeight: 600 }}>{m.platform}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{m.installs}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{m.dau}</td>
                  <td style={{ padding: '12px', textAlign: 'right', color: '#16a34a', fontWeight: 600 }}>{m.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
          <h3 style={{ margin: '0 0 14px', fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>In-App Veterinary Milestone Completion</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {appActions.map(a => (
              <div key={a.action} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: '#f8fafc', borderRadius: '8px' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '13px', color: '#0f172a' }}>{a.action}</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>{a.volume}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 700, fontSize: '13px', color: '#2563eb' }}>{a.completion}</div>
                  <div style={{ fontSize: '11px', color: '#16a34a' }}>{a.change}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
