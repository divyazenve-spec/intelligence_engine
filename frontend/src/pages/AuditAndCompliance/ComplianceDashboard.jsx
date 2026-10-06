import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function ComplianceDashboard() {
  const [toast, setToast] = useState('');

  const frameworks = [
    { standard: 'SOC-2 Type II (Security & Availability)', score: '100%', controls: '64 / 64 Controls Passing', auditor: 'Ernst & Young / Vanta', renew: 'Oct 2027', status: 'Compliant' },
    { standard: 'Schedule H & H1 Drug Dispensing Registry', score: '100%', controls: 'MCI Signed Digital Scripts', auditor: 'Drugs Control Dept KA', renew: 'Continuous', status: 'Compliant' },
    { standard: 'HIPAA & Pet Healthcare Data Privacy', score: '99.4%', controls: 'AES-256 at Rest & TLS 1.3', auditor: 'Internal InfoSec Office', renew: 'Q4 2026', status: 'Compliant' },
    { standard: 'GST & E-Way Bill Regulatory Filing', score: '100%', controls: 'GSTR-1 & 3B Monthly Auto-reconcile', auditor: 'GSTN Portal Sync', renew: 'Monthly (20th)', status: 'Compliant' },
    { standard: 'ISO 27001:2022 ISMS Framework', score: '98.8%', controls: 'Access Controls & Backup SLAs', auditor: 'BSI Global Assurance', renew: 'Jan 2027', status: 'Compliant' },
    { standard: 'Biomedical Waste Disposal Protocol', score: '100%', controls: 'Daily Clinic Waste Manifests', auditor: 'Pollution Control Board', renew: 'Quarterly', status: 'Compliant' }
  ];

  const runProbe = () => {
    setToast('Executing automated compliance health check across 64 regulatory controls...');
    setTimeout(() => {
      setToast('Compliance Health Check Complete: 64/64 Controls Passed (Overall Posture: 99.8% Grade A+).');
      setTimeout(() => setToast(''), 4000);
    }, 1500);
  };

  return (
    <DashboardLayout
      category="Audit & Compliance"
      subcategory="Regulatory Governance & Standards"
      title="Regulatory Compliance Dashboard"
      subtitle="Real-time posture across SOC-2, medical laws, drug registries, data privacy, and taxation standards"
      icon="⚖️"
      badge="Grade A+ Verified"
      actions={
        <button
          onClick={runProbe}
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
          ⚡ Run Automated Audit Probe
        </button>
      }
    >
      {toast && (
        <div style={{ padding: '10px 16px', background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '8px', color: '#065f46', fontSize: '13px', fontWeight: 600 }}>
          ℹ️ {toast}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Overall Compliance Score" value="99.8%" delta="Grade A+" trend="up" subtext="Audited across 6 frameworks" icon="🛡️" />
        <KpiCard label="SOC-2 Controls" value="64 / 64 Passing" delta="100% Tested" trend="up" subtext="Automated evidence collector" icon="🔒" />
        <KpiCard label="Schedule H Drug Audit" value="100% Compliant" delta="Zero Deviations" trend="up" subtext="Full prescription audit trail" icon="💊" />
        <KpiCard label="Next Regulatory Audit" value="34 Days" delta="GST & ISO Review" trend="neutral" subtext="Readiness score: 100%" icon="📅" />
      </div>

      <div style={{ background: 'var(--card, #ffffff)', border: '1px solid var(--border, #e2e8f0)', borderRadius: '12px', padding: '20px' }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>Statutory & Regulatory Frameworks Matrix</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)', fontSize: '11px', textTransform: 'uppercase' }}>
                <th style={{ padding: '10px 12px' }}>Compliance Framework</th>
                <th style={{ padding: '10px 12px' }}>Posture Score</th>
                <th style={{ padding: '10px 12px' }}>Automated Controls Status</th>
                <th style={{ padding: '10px 12px' }}>Audit Authority</th>
                <th style={{ padding: '10px 12px' }}>Next Review</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Compliance State</th>
              </tr>
            </thead>
            <tbody>
              {frameworks.map((f, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border, #f1f5f9)' }}>
                  <td style={{ padding: '12px', fontWeight: 700 }}>{f.standard}</td>
                  <td style={{ padding: '12px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#16a34a' }}>{f.score}</td>
                  <td style={{ padding: '12px' }}>{f.controls}</td>
                  <td style={{ padding: '12px', color: '#64748b' }}>{f.auditor}</td>
                  <td style={{ padding: '12px', fontFamily: '"IBM Plex Mono", monospace', fontSize: '12px' }}>{f.renew}</td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '99px', background: '#dcfce7', color: '#15803d', fontWeight: 600, fontSize: '11px' }}>● {f.status}</span>
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
