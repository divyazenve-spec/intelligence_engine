import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function LoginHistory() {
  const logins = [];

  return (
    <DashboardLayout
      category="Audit & Compliance"
      subcategory="Authentication & Access Control"
      title="Login History & Access Security"
      subtitle="Tracks multi-factor authentication events, terminal fingerprints, IP addresses, and intrusion blocks"
      icon="🔑"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="2FA Enforcement" value="0.0%" delta="0.0%" trend="neutral" subtext="TOTP / SSO / FIDO2" icon="🔑" />
        <KpiCard label="Successful Logins (24h)" value="0" delta="0.0%" trend="neutral" subtext="0 successful logins" icon="✅" />
        <KpiCard label="Blocked Intrusion Attempts" value="0 Blocked" delta="0.0%" trend="neutral" subtext="0 intrusion alerts" icon="🚫" />
        <KpiCard label="Concurrent Sessions" value="0 Active" delta="0.0%" trend="neutral" subtext="0 active sessions" icon="💻" />
      </div>

      <div style={{ background: 'var(--card, #ffffff)', border: '1px solid var(--border, #e2e8f0)', borderRadius: '12px', padding: '20px' }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>Authentication & Access Security Log</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)', fontSize: '11px', textTransform: 'uppercase' }}>
                <th style={{ padding: '10px 12px' }}>User Account</th>
                <th style={{ padding: '10px 12px' }}>Role</th>
                <th style={{ padding: '10px 12px' }}>Auth Method</th>
                <th style={{ padding: '10px 12px' }}>IP Address</th>
                <th style={{ padding: '10px 12px' }}>Location</th>
                <th style={{ padding: '10px 12px' }}>Device</th>
                <th style={{ padding: '10px 12px' }}>Timestamp</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Result</th>
              </tr>
            </thead>
            <tbody>
              {logins.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ padding: '36px', textAlign: 'center', color: 'var(--muted-foreground, #64748b)' }}>
                    No login history records found.
                  </td>
                </tr>
              ) : (
                logins.map((l, idx) => {
                  const isSuccess = l.status === 'Success';
                  return (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--border, #f1f5f9)' }}>
                      <td style={{ padding: '12px', fontWeight: 700 }}>{l.user}</td>
                      <td style={{ padding: '12px', color: '#64748b' }}>{l.role}</td>
                      <td style={{ padding: '12px' }}><span style={{ padding: '2px 8px', borderRadius: '99px', background: isSuccess ? '#dbeafe' : '#fee2e2', color: isSuccess ? '#1d4ed8' : '#dc2626', fontSize: '11px', fontWeight: 600 }}>{l.authMethod}</span></td>
                      <td style={{ padding: '12px', fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px' }}>{l.ip}</td>
                      <td style={{ padding: '12px' }}>{l.location}</td>
                      <td style={{ padding: '12px', color: '#64748b', fontSize: '12px' }}>{l.device}</td>
                      <td style={{ padding: '12px', fontSize: '12px' }}>{l.time}</td>
                      <td style={{ padding: '12px', textAlign: 'right' }}>
                        <span style={{ padding: '2px 8px', borderRadius: '99px', background: isSuccess ? '#dcfce7' : '#fee2e2', color: isSuccess ? '#15803d' : '#b91c1c', fontWeight: 600, fontSize: '11px' }}>● {l.status}</span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
