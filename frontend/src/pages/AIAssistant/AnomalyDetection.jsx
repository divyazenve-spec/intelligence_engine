import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function AnomalyDetection() {
  const cardStyle = {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '22px 24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
  };

  const anomalies = [];

  return (
    <DashboardLayout
      category="AI Assistant"
      subcategory="Anomaly Detection"
      title="Autonomous Statistical Anomaly & Outlier Radar"
      subtitle="Real-time multi-dimensional telemetry scanning (3σ deviation), root-cause diagnostics, and automated remediation"
      icon="🛡️"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Active Anomalies" value="1 Critical" delta="1 High / 1 Med" trend="down" subtext="Whitefield footfall" icon="⚠️" />
        <KpiCard label="Detection Latency" value="0" delta="Real-time stream" trend="up" subtext="From telemetry stream" icon="⚡" />
        <KpiCard label="False Positive Rate" value="0.0%" delta="< 1% Target" trend="up" subtext="Isolation Forest ML" icon="🎯" />
        <KpiCard label="Auto-Remediated (MTD)" value="24 Incidents" delta="91.4% Automated" trend="up" subtext="Self-healing flows" icon="🤖" />
      </div>

      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Real-Time Operational Outlier Feed</h3>
          <span style={{ fontSize: '11px', color: '#64748b' }}>Scanned 14,800 events in last hour</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>ALERT ID</th>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>MONITORED METRIC</th>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>ANOMALY DEVIATION</th>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>DIAGNOSED ROOT CAUSE</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'center' }}>SEVERITY</th>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>STATUS & ACTION</th>
              </tr>
            </thead>
            <tbody>
              {anomalies.map((anm, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#2563eb' }}>{anm.id}</td>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>{anm.metric}</td>
                  <td style={{ padding: '12px 16px', color: anm.type.includes('Negative') ? '#dc2626' : '#059669', fontWeight: 600 }}>{anm.type}</td>
                  <td style={{ padding: '12px 16px', color: '#475569' }}>{anm.rootCause}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                    <span style={{
                      fontSize: '10px',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: '12px',
                      background: anm.severity === 'High' ? '#fee2e2' : anm.severity === 'Medium' ? '#fef3c7' : '#ecfdf5',
                      color: anm.severity === 'High' ? '#991b1b' : anm.severity === 'Medium' ? '#92400e' : '#047857'
                    }}>
                      {anm.severity}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', color: '#334155', fontWeight: 500 }}>{anm.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
