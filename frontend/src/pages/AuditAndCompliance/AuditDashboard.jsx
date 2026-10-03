import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function AuditDashboard() {
  const auditLogs = [
    { actor: 'Dr. Priya Sharma', action: 'Approved Schedule H Drug Dispense (ZV-MED-01)', ip: '192.168.1.14', time: '14:22 Today', status: 'Verified' },
    { actor: 'Rajesh Verma', action: 'Updated Patient Care Plan #4928', ip: '192.168.1.28', time: '13:45 Today', status: 'Verified' },
    { actor: 'Executive Admin', action: 'Ingested Q4 Sales Pipeline CSV (20 records)', ip: '192.168.1.5', time: '11:10 Today', status: 'Success' },
    { actor: 'Vikram Mehta', action: 'Calibrated Diagnostics Blood Analyzer (Lab-02)', ip: '192.168.1.42', time: '09:30 Today', status: 'Verified' }
  ];

  return (
    <DashboardLayout
      category="Audit & Compliance"
      subcategory="Audit Log & Regulatory Trail"
      title="Audit Trail & Regulatory Compliance"
      subtitle="Immutable activity logs, medical compliance trails, approval workflows, and data governance"
      icon="🛡️"
      badge="SOC-2 & Schedule H Compliant"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Compliance Score" value="100%" delta="Audited" trend="up" subtext="Regulatory standard" icon="🛡️" />
        <KpiCard label="Audit Log Events" value="14,820" delta="Immutable" trend="neutral" subtext="Stored in SQLite" icon="📑" />
        <KpiCard label="Prescription Approvals" value="100% Signed" delta="MCI verified" trend="up" subtext="No unsigned scripts" icon="✍️" />
        <KpiCard label="Data Access Logs" value="Zero Breaches" delta="Secure" trend="up" subtext="Role-based access" icon="🔒" />
      </div>

      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>Immutable Activity Trail</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))', color: 'var(--muted-foreground, #94a3b8)', fontSize: '11px' }}>
              <th style={{ padding: '8px 12px' }}>Staff Actor</th>
              <th style={{ padding: '8px 12px' }}>Action & Description</th>
              <th style={{ padding: '8px 12px' }}>IP & Terminal</th>
              <th style={{ padding: '8px 12px' }}>Timestamp</th>
              <th style={{ padding: '8px 12px', textAlign: 'right' }}>Audit Status</th>
            </tr>
          </thead>
          <tbody>
            {auditLogs.map((log, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.04))' }}>
                <td style={{ padding: '12px', fontWeight: 700 }}>{log.actor}</td>
                <td style={{ padding: '12px' }}>{log.action}</td>
                <td style={{ padding: '12px', fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)' }}>{log.ip}</td>
                <td style={{ padding: '12px' }}>{log.time}</td>
                <td style={{ padding: '12px', textAlign: 'right' }}>
                  <span style={{
                    padding: '2px 8px',
                    borderRadius: '99px',
                    background: 'rgba(16,185,129,0.15)',
                    color: '#10b981',
                    fontWeight: 600,
                    fontSize: '11px'
                  }}>{log.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
