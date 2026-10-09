import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function AppAnalytics() {
  const osMetrics = [];

  const appActions = [];

  return (
    <DashboardLayout
      category="Marketing"
      subcategory="App Analytics"
      title="Mobile App Acquisition & Product Analytics"
      subtitle="Android & iOS store installs, daily active users (DAU/MAU), and in-app pet health actions"
      icon="📱"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total App Downloads" value="0" delta="0.0%" trend="neutral" subtext="Android (0%) · iOS (0%)" icon="📲" />
        <KpiCard label="Daily Active Users" value="0" delta="0.0%" trend="neutral" subtext="DAU / MAU ratio: 0.0%" icon="⚡" />
        <KpiCard label="Monthly Active Users" value="0" delta="0.0%" trend="neutral" subtext="Active pet parents" icon="🐾" />
        <KpiCard label="App Store Rating" value="0.0 ★" delta="0.0" trend="neutral" subtext="0 verified reviews" icon="⭐" />
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
              {osMetrics.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ padding: '24px 12px', textAlign: 'center', color: '#94a3b8' }}>
                    No platform metrics recorded
                  </td>
                </tr>
              ) : (
                osMetrics.map(m => (
                  <tr key={m.platform} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{m.platform}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{m.installs}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{m.dau}</td>
                    <td style={{ padding: '12px', textAlign: 'right', color: '#16a34a', fontWeight: 600 }}>{m.rating}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
          <h3 style={{ margin: '0 0 14px', fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>In-App Veterinary Milestone Completion</h3>
          {appActions.length === 0 ? (
            <div style={{ padding: '24px', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}>
              No app milestones recorded
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
