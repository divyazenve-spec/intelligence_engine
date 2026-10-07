import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function BusinessOverview() {
  const cardStyle = {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '22px 24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
  };

  const plItems = [];
  const regions = [];

  return (
    <DashboardLayout
      category="Executive Dashboard"
      subcategory="Business Overview"
      title="Macro Business Overview & Divisional P&L"
      subtitle="Comprehensive cross-divisional profit & loss, geographic penetration, and business unit balance"
      icon="🌐"
      badge="Enterprise View"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Consolidated Sales" value="₹0" delta="0.0% YoY" trend="neutral" subtext="No records recorded" icon="💰" />
        <KpiCard label="Consolidated COGS" value="₹0" delta="0.0% of Rev" trend="neutral" subtext="No records recorded" icon="📦" />
        <KpiCard label="Operating Profit" value="₹0" delta="0.0% EBITDA" trend="neutral" subtext="No records recorded" icon="📈" />
        <KpiCard label="Regional Coverage" value="0 Metros" delta="0 Centers" trend="neutral" subtext="No records recorded" icon="🗺️" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: '18px' }}>
        {/* Condensed P&L */}
        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Consolidated Executive P&L (MTD)</h3>
            <span style={{ fontSize: '11px', color: '#64748b' }}>Currency: INR</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {plItems.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '24px', color: '#94a3b8', fontSize: '13px' }}>
                No records found
              </div>
            ) : (
              plItems.map(item => (
                <div key={item.label} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  background: item.hl ? '#f0fdf4' : 'transparent',
                  borderBottom: item.bold ? '1px solid #e2e8f0' : 'none'
                }}>
                  <span style={{ fontSize: '12px', fontWeight: item.bold ? 700 : 500, color: item.bold ? '#0f172a' : '#475569' }}>
                    {item.label}
                  </span>
                  <span style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    fontFamily: '"IBM Plex Mono", monospace',
                    color: item.neg ? '#dc2626' : item.hl ? '#15803d' : '#0f172a'
                  }}>
                    {item.val}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Geographic Breakdown */}
        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Geographic Market Penetration</h3>
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748b' }}>0 Clusters</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {regions.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '24px', color: '#94a3b8', fontSize: '13px' }}>
                No records found
              </div>
            ) : (
              regions.map(r => (
                <div key={r.name} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                    <span style={{ fontWeight: 600, color: '#0f172a' }}>{r.name}</span>
                    <span style={{ fontWeight: 700, color: '#0f172a' }}>{r.rev} <span style={{ color: '#64748b', fontWeight: 400 }}>({r.pct}%)</span></span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#64748b' }}>
                    <span>Footfall: {r.footfall}</span>
                    <span>Contribution Rank: #{regions.indexOf(r) + 1}</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${r.pct * 3}%`, height: '100%', background: '#2563eb', borderRadius: '3px' }} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
