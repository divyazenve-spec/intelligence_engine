import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function UserActivity() {
  const users = [];

  return (
    <DashboardLayout
      category="Audit & Compliance"
      subcategory="User Activity & Telemetry"
      title="User Activity & Staff Telemetry"
      subtitle="Real-time session time, operation volume, and privilege utilization per staff member"
      icon="👥"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Active Staff Today" value="0 Staff" delta="0.0%" trend="neutral" subtext="0 active staff" icon="🧑‍💼" />
        <KpiCard label="Avg Actions / User" value="0 Actions" delta="0.0%" trend="neutral" subtext="0 actions logged" icon="⚡" />
        <KpiCard label="Peak Activity Window" value="--" delta="0.0%" trend="neutral" subtext="No telemetry activity" icon="⏰" />
        <KpiCard label="Suspicious Activity" value="0 Flagged" delta="0.0%" trend="neutral" subtext="0 suspicious events" icon="🛡️" />
      </div>

      <div style={{ background: 'var(--card, #ffffff)', border: '1px solid var(--border, #e2e8f0)', borderRadius: '12px', padding: '20px' }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>Staff Activity Telemetry Matrix</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)', fontSize: '11px', textTransform: 'uppercase' }}>
                <th style={{ padding: '10px 12px' }}>Staff Member</th>
                <th style={{ padding: '10px 12px' }}>Department</th>
                <th style={{ padding: '10px 12px' }}>Role</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Actions Today</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Active Time</th>
                <th style={{ padding: '10px 12px' }}>Last Heartbeat</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ padding: '36px', textAlign: 'center', color: 'var(--muted-foreground, #64748b)' }}>
                    No staff activity telemetry records found.
                  </td>
                </tr>
              ) : (
                users.map((u, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--border, #f1f5f9)' }}>
                    <td style={{ padding: '12px', fontWeight: 700 }}>{u.name}</td>
                    <td style={{ padding: '12px' }}><span style={{ padding: '2px 8px', borderRadius: '99px', background: '#dbeafe', color: '#1d4ed8', fontSize: '11px', fontWeight: 600 }}>{u.dept}</span></td>
                    <td style={{ padding: '12px', color: '#64748b' }}>{u.role}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{u.actionsToday}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{u.activeHours}</td>
                    <td style={{ padding: '12px', fontSize: '12px' }}>{u.lastActive}</td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>
                      <span style={{ padding: '2px 8px', borderRadius: '99px', background: '#dcfce7', color: '#15803d', fontWeight: 600, fontSize: '11px' }}>● {u.status}</span>
                    </td>
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
