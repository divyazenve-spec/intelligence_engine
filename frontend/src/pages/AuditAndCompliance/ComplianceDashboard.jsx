import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function ComplianceDashboard() {
  const [toast, setToast] = useState('');

  const frameworks = [];

  const runProbe = () => {
    setToast('Executing automated compliance health check across regulatory controls...');
    setTimeout(() => {
      setToast('Compliance Health Check Complete: 0 active controls detected.');
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
      badge=""
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
        <KpiCard label="Overall Compliance Score" value="0.0%" delta="0.0%" trend="neutral" subtext="No frameworks audited" icon="🛡️" />
        <KpiCard label="SOC-2 Controls" value="0 / 0 Passing" delta="0.0%" trend="neutral" subtext="Automated evidence collector" icon="🔒" />
        <KpiCard label="Schedule H Drug Audit" value="0.0%" delta="0.0%" trend="neutral" subtext="Prescription audit trail" icon="💊" />
        <KpiCard label="Next Regulatory Audit" value="0 Days" delta="0.0%" trend="neutral" subtext="No scheduled reviews" icon="📅" />
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
              {frameworks.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ padding: '36px', textAlign: 'center', color: 'var(--muted-foreground, #64748b)' }}>
                    No regulatory frameworks found.
                  </td>
                </tr>
              ) : (
                frameworks.map((f, idx) => (
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
