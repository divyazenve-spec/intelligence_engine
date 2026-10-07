import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function ConversionFunnel() {
  const funnelSteps = [];

  return (
    <DashboardLayout
      category="Marketing"
      subcategory="Conversion Funnel"
      title="Omni-Channel Conversion Funnel & Micro-Attribution"
      subtitle="Step-by-step visitor progression from initial ad view down to completed veterinary appointment or order"
      icon="⚡"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Top-of-Funnel Reach" value="1.84M" delta="0.0%" trend="up" subtext="Impressions across ads" icon="👁️" />
        <KpiCard label="Click-to-Install Rate" value="0.0%" delta="0.0%" trend="up" subtext="High app intent" icon="📲" />
        <KpiCard label="Cart-to-Paid Rate" value="0.0%" delta="0.0%" trend="up" subtext="Checkout completion" icon="🛒" />
        <KpiCard label="Total Converted Customers" value="0" delta="0.0%" trend="up" subtext="Net new buyers MTD" icon="🎉" />
      </div>

      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <h3 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Interactive 5-Stage Healthcare Conversion Funnel</h3>
        <p style={{ margin: '0 0 20px', fontSize: '12px', color: '#64748b' }}>Drop-off velocity, transition ratios, and stage-specific optimizations</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {funnelSteps.map((s, idx) => {
            const barWidth = [100, 78, 55, 38, 25][idx];
            return (
              <div key={s.stage} style={{ border: '1px solid #f1f5f9', borderRadius: '10px', padding: '14px 16px', background: '#f8fafc' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: s.color,
                      color: '#ffffff',
                      fontSize: '11px',
                      fontWeight: 700
                    }}>
                      {idx + 1}
                    </span>
                    <span style={{ fontWeight: 700, fontSize: '14px', color: '#0f172a' }}>{s.stage}</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontWeight: 700, fontSize: '15px', color: '#0f172a', fontFamily: '"IBM Plex Mono", monospace' }}>{s.volume}</span>
                    <span style={{ marginLeft: '8px', fontSize: '12px', color: '#16a34a', fontWeight: 600 }}>({s.convRate})</span>
                  </div>
                </div>

                <div style={{ height: '8px', width: '100%', background: '#e2e8f0', borderRadius: '99px', overflow: 'hidden', marginBottom: '8px' }}>
                  <div style={{ width: `${barWidth}%`, height: '100%', background: s.color, borderRadius: '99px' }} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b' }}>
                  <span>Key Driver: {s.channelLead}</span>
                  {s.dropPct !== '—' && <span style={{ color: '#dc2626' }}>Drop-off: {s.dropPct}</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
