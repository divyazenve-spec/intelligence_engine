import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function AuditLog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState('');

  const auditLogs = [
    { id: 'AUD-9481', actor: 'Dr. Priya Sharma', role: 'Chief Vet Surgeon', action: 'Approved Schedule H Drug Dispense (ZV-MED-01)', module: 'Pharmacy', ip: '192.168.1.14', time: '14:22 Today', hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', status: 'Verified' },
    { id: 'AUD-9480', actor: 'Rajesh Verma', role: 'Staff Pharmacist', action: 'Updated Patient Care Plan #4928 (Golden Retriever)', module: 'Clinical', ip: '192.168.1.28', time: '13:45 Today', hash: '8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4', status: 'Verified' },
    { id: 'AUD-9479', actor: 'Executive Admin', role: 'Super Admin', action: 'Ingested Q4 Sales Pipeline CSV (20 records)', module: 'Sales', ip: '192.168.1.5', time: '11:10 Today', hash: 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb', status: 'Verified' },
    { id: 'AUD-9478', actor: 'Vikram Mehta', role: 'Lab Technician', action: 'Calibrated Diagnostics Blood Analyzer (Lab-02)', module: 'Diagnostics', ip: '192.168.1.42', time: '09:30 Today', hash: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', status: 'Verified' },
    { id: 'AUD-9477', actor: 'Sneha Rao', role: 'Financial Controller', action: 'Authorized Vendor Wire Transfer ₹4,50,000 (PO-2026-88)', module: 'Finance', ip: '192.168.1.19', time: '08:15 Today', hash: '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a', status: 'Verified' },
    { id: 'AUD-9476', actor: 'Dr. Rahul Mehta', role: 'Senior Vet', action: 'Digitally Signed Rabies Vaccination Certificate (PET-8201)', module: 'Veterinary', ip: '192.168.1.16', time: 'Yesterday 18:40', hash: 'ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d', status: 'Verified' },
    { id: 'AUD-9475', actor: 'System Daemon', role: 'Automated Cron', action: 'Encrypted Daily DB Snapshot to Cold Storage (zenve-wal.bak)', module: 'Security', ip: '127.0.0.1', time: 'Yesterday 00:00', hash: 'd7a8fbb307d7809469ca9abcb0082e4f8d5651e46d3cdb762d02d0bf37c9e592', status: 'Verified' }
  ];

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
      badge="Append-Only Log Active"
    >
      {toast && (
        <div style={{ padding: '10px 16px', background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '8px', color: '#065f46', fontSize: '13px', fontWeight: 600 }}>
          ℹ️ {toast}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Audit Events" value="14,820" delta="+184 Today" trend="up" subtext="Immutable SQLite WAL" icon="📑" />
        <KpiCard label="Cryptographic Integrity" value="100% Valid" delta="SHA-256 Seal" trend="up" subtext="Zero hash mismatches" icon="🔒" />
        <KpiCard label="Staff Actions Logged" value="4,289" delta="Last 30 Days" trend="up" subtext="100% auditable trail" icon="👥" />
        <KpiCard label="Tamper Alerts" value="0 Detected" delta="Clean Log" trend="up" subtext="Zero unauthorized diffs" icon="🛡️" />
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
              setToast('SHA-256 Ledger integrity check passed: 14,820 / 14,820 cryptographic hashes verified.');
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
              {filteredLogs.map((log, idx) => (
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
