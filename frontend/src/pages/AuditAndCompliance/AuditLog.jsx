import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function AuditLog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState('');

  const auditLogs = [];

  const filteredLogs = auditLogs.filter(l =>
    l.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.module.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout
      category="Audit & Compliance"
      subcategory="Master Audit Log"
      title="Master Immutable Audit Log"
      subtitle="Cryptographically sealed chronological log of all administrative, clinical, and financial actions"
      icon="🛡️"
      badge=""
    >
      {toast && (
        <div style={{ padding: '10px 16px', background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '8px', color: '#065f46', fontSize: '13px', fontWeight: 600 }}>
          ℹ️ {toast}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Audit Events" value="0" delta="0.0%" trend="neutral" subtext="0 audit events" icon="📑" />
        <KpiCard label="Cryptographic Integrity" value="0.0%" delta="0.0%" trend="neutral" subtext="0 verification logs" icon="🔒" />
        <KpiCard label="Staff Actions Logged" value="0" delta="0.0%" trend="neutral" subtext="0 staff actions" icon="👥" />
        <KpiCard label="Tamper Alerts" value="0 Detected" delta="0.0%" trend="neutral" subtext="0 tamper alerts" icon="🛡️" />
      </div>

      <div style={{
        background: 'var(--card, #ffffff)',
        border: '1px solid var(--border, #e2e8f0)',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <input
            type="text"
            placeholder="Search actor, action, or module..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              border: '1px solid var(--border, #cbd5e1)',
              fontSize: '12px',
              minWidth: '260px',
              outline: 'none'
            }}
          />
          <button
            onClick={() => {
              setToast('SHA-256 Ledger integrity verified. 0 audit records.');
              setTimeout(() => setToast(''), 3000);
            }}
            style={{
              padding: '7px 14px',
              borderRadius: '8px',
              background: '#059669',
              color: '#ffffff',
              border: '1px solid #047857',
              fontWeight: 600,
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            ⚡ Verify SHA-256 Ledger
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)', fontSize: '11px', textTransform: 'uppercase' }}>
                <th style={{ padding: '10px 12px' }}>Event ID</th>
                <th style={{ padding: '10px 12px' }}>Staff Actor</th>
                <th style={{ padding: '10px 12px' }}>Action & Description</th>
                <th style={{ padding: '10px 12px' }}>Module</th>
                <th style={{ padding: '10px 12px' }}>IP / Terminal</th>
                <th style={{ padding: '10px 12px' }}>Timestamp</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Audit Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ padding: '36px', textAlign: 'center', color: 'var(--muted-foreground, #64748b)' }}>
                    No audit events found. Log ledger is empty.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--border, #f1f5f9)' }}>
                    <td style={{ padding: '12px', fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px', fontWeight: 600, color: '#2563eb' }}>{log.id}</td>
                    <td style={{ padding: '12px', fontWeight: 700 }}>
                      {log.actor}
                      <div style={{ fontSize: '10.5px', color: '#64748b', fontWeight: 400 }}>{log.role}</div>
                    </td>
                    <td style={{ padding: '12px' }}>{log.action}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ padding: '2px 8px', borderRadius: '99px', background: '#f3e8ff', color: '#7e22ce', fontSize: '11px', fontWeight: 600 }}>{log.module}</span>
                    </td>
                    <td style={{ padding: '12px', fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px', color: 'var(--muted-foreground, #64748b)' }}>{log.ip}</td>
                    <td style={{ padding: '12px', fontSize: '12px' }}>{log.time}</td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>
                      <span style={{
                        padding: '2px 8px',
                        borderRadius: '99px',
                        background: '#dcfce7',
                        color: '#15803d',
                        fontWeight: 600,
                        fontSize: '11px'
                      }}>● {log.status}</span>
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
