import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function Advertising() {
  const adSets = [];

  return (
    <DashboardLayout
      category="Marketing"
      subcategory="Advertising"
      title="Paid Advertising Networks & Creative Efficiency"
      subtitle="Meta Ads Manager, Google Ads MCC, CPM, CPC, cost-per-acquisition, and ad creative health"
      icon="📢"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Average CPM" value="₹0" delta="0.0%" trend="neutral" subtext="Cost per 1,000 impressions" icon="👁️" />
        <KpiCard label="Blended CPC" value="₹0" delta="0.0%" trend="neutral" subtext="Cost per ad click" icon="🖱️" />
        <KpiCard label="Target CPA Adherence" value="₹0" delta="0.0%" trend="neutral" subtext="Cap set at ₹0" icon="🎯" />
        <KpiCard label="Ad Spend Efficiency" value="0.0%" delta="0.0%" trend="neutral" subtext="Impression share score" icon="⚡" />
      </div>

      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Active Ad Network Placements & Performance</h3>
          <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>Platform spend, auction bid efficiency, and creative fatigue diagnostics</p>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <th style={{ padding: '12px 16px' }}>Ad Set / Campaign</th>
                <th style={{ padding: '12px 16px' }}>Platform</th>
                <th style={{ padding: '12px 16px' }}>Spend</th>
                <th style={{ padding: '12px 16px' }}>CPM</th>
                <th style={{ padding: '12px 16px' }}>CPC</th>
                <th style={{ padding: '12px 16px' }}>CPA</th>
                <th style={{ padding: '12px 16px' }}>ROAS</th>
                <th style={{ padding: '12px 16px' }}>Creative Health</th>
              </tr>
            </thead>
            <tbody>
              {adSets.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ padding: '32px 16px', textAlign: 'center', color: '#94a3b8' }}>
                    No advertising ad sets found
                  </td>
                </tr>
              ) : (
                adSets.map(a => (
                  <tr key={a.name} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '14px 16px', fontWeight: 600, color: '#0f172a' }}>{a.name}</td>
                    <td style={{ padding: '14px 16px', color: '#475569' }}>{a.platform}</td>
                    <td style={{ padding: '14px 16px', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace' }}>{a.spend}</td>
                    <td style={{ padding: '14px 16px', fontFamily: '"IBM Plex Mono", monospace' }}>{a.cpm}</td>
                    <td style={{ padding: '14px 16px', fontFamily: '"IBM Plex Mono", monospace' }}>{a.cpc}</td>
                    <td style={{ padding: '14px 16px', color: '#2563eb', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace' }}>{a.cpa}</td>
                    <td style={{ padding: '14px 16px', color: '#16a34a', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{a.roas}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: 600,
                        background: a.health === 'Optimal' ? '#f0fdf4' : a.health === 'Scaling' ? '#eff6ff' : '#fef3c7',
                        color: a.health === 'Optimal' ? '#16a34a' : a.health === 'Scaling' ? '#2563eb' : '#d97706',
                        border: `1px solid ${a.health === 'Optimal' ? '#bbf7d0' : a.health === 'Scaling' ? '#bfdbfe' : '#fde68a'}`
                      }}>
                        {a.health}
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
