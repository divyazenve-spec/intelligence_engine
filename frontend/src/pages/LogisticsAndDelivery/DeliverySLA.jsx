import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function DeliverySLA() {
  const slaBreakdown = [];

  return (
    <DashboardLayout
      category="Logistics & Delivery"
      subcategory="Delivery SLA"
      title="Delivery Service Level Agreements (SLA) & Compliance"
      subtitle="Fulfillment SLA adherence, breach root causes, temperature cold-chain compliance, and first-attempt success"
      icon="🛡️"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Overall SLA Rate" value="0.0%" delta="+0.9% MoM" trend="up" subtext="Target: 95.0%" icon="🛡️" />
        <KpiCard label="Cold-Chain SLA" value="0.0%" delta="Zero spoilage" trend="up" subtext="Refrigerated integrity" icon="❄️" />
        <KpiCard label="First Attempt SLA" value="0.0%" delta="+0.3% MoM" trend="up" subtext="Doorstep delivery success" icon="🎯" />
        <KpiCard label="Total Breaches MTD" value="57 Breaches" delta="-18.2% vs last mo" trend="up" subtext="Across 26,630 orders" icon="📉" />
      </div>

      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Delivery Tier SLA Adherence Matrix</h3>
          <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>Contractual targets, actual speed metrics, breach counts, and performance status</p>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', color: '#64748b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Delivery Tier</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>SLA Target</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Actual Speed</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Monthly Volume</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Total Breaches</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>SLA Compliance</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {slaBreakdown.map(s => (
                <tr key={s.tier} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: '#0f172a' }}>{s.tier}</td>
                  <td style={{ padding: '12px 16px', color: '#64748b' }}>{s.target}</td>
                  <td style={{ padding: '12px 16px', color: '#2563eb', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{s.actual}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace' }}>{s.volume}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', color: s.breaches > 20 ? '#dc2626' : '#475569', fontWeight: 600 }}>{s.breaches}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', color: '#16a34a', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{s.compliance}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      padding: '4px 9px',
                      borderRadius: '12px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: s.status === 'World Class' ? '#eff6ff' : '#dcfce7',
                      color: s.status === 'World Class' ? '#1d4ed8' : '#15803d'
                    }}>
                      {s.status}
                    </span>
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
