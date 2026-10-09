import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function RevenueIntelligence() {
  const cardStyle = {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '22px 24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
  };

  const leakagePoints = [];

  return (
    <DashboardLayout
      category="AI Assistant"
      subcategory="Revenue Intelligence"
      title="Revenue Intelligence & Margin Optimization"
      subtitle="Autonomous revenue leakage radar, price elasticity analysis, and conversion monetization drivers"
      icon="💎"
      badge="Revenue Radar Active"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Detected Revenue Leakage" value="₹0" delta="--" trend="neutral" subtext="No leakage detected" icon="⚠️" />
        <KpiCard label="Recovery Realization (MTD)" value="₹0" delta="--" trend="neutral" subtext="No recovery actions" icon="💰" />
        <KpiCard label="Optimal Price Elasticity" value="0.0%" delta="--" trend="neutral" subtext="No elasticity tested" icon="📈" />
        <KpiCard label="Discount Efficiency Score" value="0.0%" delta="--" trend="neutral" subtext="No discount records" icon="🎯" />
      </div>

      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Identified Revenue Leakage & Remediation Radar</h3>
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748b' }}>Total Identified: ₹0</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>REVENUE LEAKAGE SOURCE</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'right' }}>ESTIMATED LOSS</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'center' }}>SEVERITY</th>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>RECOMMENDED AUTOMATED ACTION</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'right' }}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {leakagePoints.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: '24px', textAlign: 'center', color: '#94a3b8' }}>
                    No revenue leakage detected.
                  </td>
                </tr>
              ) : (
                leakagePoints.map((item, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 16px', color: '#0f172a', fontWeight: 600 }}>{item.source}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#dc2626' }}>{item.amount}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                    <span style={{
                      fontSize: '10px',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: '12px',
                      background: item.risk === 'High' ? '#fee2e2' : item.risk === 'Medium' ? '#fef3c7' : '#f1f5f9',
                      color: item.risk === 'High' ? '#991b1b' : item.risk === 'Medium' ? '#92400e' : '#475569'
                    }}>
                      {item.risk}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', color: '#475569' }}>{item.action}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <button
                      onClick={() => alert(`Enforcing remediation for: ${item.source}`)}
                      style={{
                        padding: '5px 12px',
                        borderRadius: '6px',
                        border: '1px solid #2563eb',
                        background: '#eff6ff',
                        color: '#1d4ed8',
                        fontSize: '11px',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Remediate
                    </button>
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
