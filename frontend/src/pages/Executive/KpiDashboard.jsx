import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function KpiDashboard() {
  const cardStyle = {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '22px 24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
  };

  const kpis = [];

  return (
    <DashboardLayout
      category="Executive Dashboard"
      subcategory="KPI Dashboard"
      title="Enterprise Master KPI Scorecard"
      subtitle="Strategic performance indicators across financial growth, operational velocity, clinical care, and customer satisfaction"
      icon="📊"
      badge="Scorecard Standard"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Overall Scorecard Health" value="0.0%" delta="0 of 0 Met" trend="neutral" subtext="No active metrics" icon="✅" />
        <KpiCard label="Customer NPS" value="0" delta="0 pts QoQ" trend="neutral" subtext="No records recorded" icon="⭐" />
        <KpiCard label="Delivery SLA Velocity" value="0.0%" delta="-- average" trend="neutral" subtext="No records recorded" icon="⚡" />
        <KpiCard label="Gross Margin" value="0.0%" delta="0.0% YoY" trend="neutral" subtext="No records recorded" icon="💎" />
      </div>

      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Cross-Enterprise KPI Performance Matrix</h3>
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', background: '#f1f5f9', padding: '3px 8px', borderRadius: '12px' }}>0 KPIs Recorded</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>CATEGORY</th>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>STRATEGIC KPI</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'right' }}>BENCHMARK TARGET</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'right' }}>ACTUAL PERFORMANCE</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'right' }}>VARIANCE</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'center' }}>HEALTH STATUS</th>
              </tr>
            </thead>
            <tbody>
              {kpis.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '24px', color: '#94a3b8' }}>
                    No records found
                  </td>
                </tr>
              ) : (
                kpis.map((kpi, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px 16px', color: '#64748b', fontWeight: 500 }}>{kpi.category}</td>
                    <td style={{ padding: '12px 16px', color: '#0f172a', fontWeight: 600 }}>{kpi.metric}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#475569' }}>{kpi.target}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#0f172a' }}>{kpi.actual}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 600, color: '#059669' }}>{kpi.variance}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                      <span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '12px', background: '#ecfdf5', color: '#047857' }}>
                        ● {kpi.status}
                      </span>
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
