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

  const plItems = [
    { label: 'Gross Billed Revenue', val: '₹54,80,000', bold: true, hl: false },
    { label: 'Promotional Discounts & Coupons', val: '-₹2,10,000', bold: false, hl: false, neg: true },
    { label: 'Customer Returns & Refund Settlements', val: '-₹1,05,000', bold: false, hl: false, neg: true },
    { label: 'Net Operational Revenue', val: '₹51,65,000', bold: true, hl: true },
    { label: 'Cost of Goods Sold (COGS & Procurement)', val: '-₹32,40,000', bold: false, hl: false, neg: true },
    { label: 'Gross Profit (37.3% Margin)', val: '₹19,25,000', bold: true, hl: true },
    { label: 'Operating & Administrative Expenses (OpEx)', val: '-₹10,49,000', bold: false, hl: false, neg: true },
    { label: 'EBITDA (Operating Cash Flow)', val: '₹8,76,000', bold: true, hl: true },
    { label: 'Depreciation, Amortization & Tax', val: '-₹1,20,000', bold: false, hl: false, neg: true },
    { label: 'Net Profit (14.6% PAT)', val: '₹7,56,000', bold: true, hl: true }
  ];

  const regions = [
    { name: 'Karnataka (Bengaluru Hub)', rev: '₹14.60L', pct: 28.3, footfall: '1,420 pets' },
    { name: 'Maharashtra (Mumbai & Pune)', rev: '₹9.18L', pct: 17.8, footfall: '980 pets' },
    { name: 'Delhi NCR (Gurugram & South Ex)', rev: '₹6.55L', pct: 12.7, footfall: '740 pets' },
    { name: 'Tamil Nadu (Chennai Metro)', rev: '₹5.76L', pct: 11.2, footfall: '620 pets' },
    { name: 'Telangana (Hyderabad Hub)', rev: '₹4.19L', pct: 8.1, footfall: '460 pets' },
    { name: 'Other Metros & Direct DTC', rev: '₹11.37L', pct: 21.9, footfall: '1,220 pets' }
  ];

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
        <KpiCard label="Consolidated Sales" value="₹54.80L" delta="+18.4% YoY" trend="up" subtext="All business units" icon="💰" />
        <KpiCard label="Consolidated COGS" value="₹32.40L" delta="62.7% of Rev" trend="down" subtext="Supply chain costs" icon="📦" />
        <KpiCard label="Operating Profit" value="₹8.76L" delta="16.9% EBITDA" trend="up" subtext="Positive cash flow" icon="📈" />
        <KpiCard label="Regional Coverage" value="6 Metros" delta="14 Centers" trend="neutral" subtext="Pan-India footprint" icon="🗺️" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: '18px' }}>
        {/* Condensed P&L */}
        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Consolidated Executive P&L (MTD)</h3>
            <span style={{ fontSize: '11px', color: '#64748b' }}>Currency: INR</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {plItems.map(item => (
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
            ))}
          </div>
        </div>

        {/* Geographic Breakdown */}
        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Geographic Market Penetration</h3>
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#2563eb' }}>6 Clusters</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {regions.map(r => (
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
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
