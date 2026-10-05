import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function FashionProfitability() {
  const unitEconomics = [
    { product: 'Signature Italian Leather Harness', asp: '₹3,450', fabricCost: '₹620', artisanLabor: '₹340', packagingHardware: '₹130', totalCogs: '₹1,090', grossProfit: '₹2,360', margin: '68.4%' },
    { product: 'Monsoon Waterproof Dog Parka', asp: '₹2,850', fabricCost: '₹580', artisanLabor: '₹280', packagingHardware: '₹120', totalCogs: '₹980', grossProfit: '₹1,870', margin: '65.6%' },
    { product: 'Cashmere-Blend Cable Knit Sweater', asp: '₹2,400', fabricCost: '₹410', artisanLabor: '₹210', packagingHardware: '₹70', totalCogs: '₹690', grossProfit: '₹1,710', margin: '71.3%' },
    { product: 'Bespoke Satin Wedding Tuxedo', asp: '₹4,950', fabricCost: '₹780', artisanLabor: '₹520', packagingHardware: '₹150', totalCogs: '₹1,450', grossProfit: '₹3,500', margin: '70.7%' },
    { product: 'Velvet Midnight Rose Gold Collar', asp: '₹1,650', fabricCost: '₹190', artisanLabor: '₹140', packagingHardware: '₹90', totalCogs: '₹420', grossProfit: '₹1,230', margin: '74.5%' },
    { product: 'Handcrafted Silk Festive Bandana', asp: '₹850', fabricCost: '₹95', artisanLabor: '₹60', packagingHardware: '₹30', totalCogs: '₹185', grossProfit: '₹665', margin: '78.2%' }
  ];

  const channelProfitability = [
    { channel: 'Zenve iOS & Android App Direct', rev: '₹21.05 L', cogs: '₹6.32 L', fulfillment: '₹1.47 L', netContribution: '₹13.26 L', margin: '63.0%' },
    { channel: 'Indiranagar Flagship Studio', rev: '₹10.84 L', cogs: '₹3.36 L', storeOpex: '₹1.95 L', netContribution: '₹5.53 L', margin: '51.0%' },
    { channel: 'Bandra Boutique & Atelier', rev: '₹9.76 L', cogs: '₹3.02 L', storeOpex: '₹1.80 L', netContribution: '₹4.94 L', margin: '50.6%' },
    { channel: 'Concierge VIP Atelier & Events', rev: '₹3.85 L', cogs: '₹1.15 L', stylistTravel: '₹0.45 L', netContribution: '₹2.25 L', margin: '58.4%' }
  ];

  const card = { background: 'var(--card, #131d2e)', border: '1px solid var(--border, rgba(255,255,255,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Zenve Fashion"
      subcategory="Unit Economics & Margins"
      title="Fashion Margins, COGS & Contribution Profitability"
      subtitle="Bespoke pet apparel unit economics, artisan atelier labor costs, channel contribution margins, and markdown protection"
      icon="💎"
      badge="68.2% Gross Margin"
      actions={
        <button onClick={() => alert('Exporting Fashion Unit Economics Model...')} style={{ padding: '6px 14px', borderRadius: '8px', border: '1px solid #ec4899', background: 'rgba(236,72,153,0.15)', color: '#f472b6', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
          📑 Profit Model Export
        </button>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Blended Gross Margin" value="68.2%" delta="+3.1% YoY" trend="up" subtext="Direct atelier sourcing" icon="💎" />
        <KpiCard label="Net Contribution Margin" value="55.8%" delta="+4.2% expansion" trend="up" subtext="After showroom OPEX" icon="📊" />
        <KpiCard label="Full-Price Sell-Through" value="94.6%" delta="Markdowns < 5.4%" trend="up" subtext="No discount brand equity" icon="🏷️" />
        <KpiCard label="Custom Monogram Margin" value="84.5%" delta="₹450 add-on fee" trend="up" subtext="Artisan laser embroidery" icon="✨" />
        <KpiCard label="Sizing Exchange Cost" value="1.8% of Rev" delta="-0.8% reduction" trend="up" subtext="Precise 3D size fitting" icon="📐" />
        <KpiCard label="Fashion Operating EBITDA" value="₹16.80 L" delta="36.9% EBITDA margin" trend="up" subtext="Highly lucrative luxury line" icon="⚡" />
      </div>

      {/* Unit Economics Breakdown */}
      <div style={card}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: '#fff' }}>💎 Core SKU Unit Economics & Margin Matrix</h3>
        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.25)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                {['Apparel Product', 'Retail ASP', 'Fabric Cost', 'Artisan Labor', 'Hardware & Pkg', 'Total COGS', 'Gross Profit', 'Gross Margin'].map(h => (
                  <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: '#94a3b8', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {unitEconomics.map((u, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '11px 12px', fontWeight: 600, color: '#fff' }}>{u.product}</td>
                  <td style={{ padding: '11px 12px', color: '#cbd5e1' }}>{u.asp}</td>
                  <td style={{ padding: '11px 12px', color: '#94a3b8' }}>{u.fabricCost}</td>
                  <td style={{ padding: '11px 12px', color: '#94a3b8' }}>{u.artisanLabor}</td>
                  <td style={{ padding: '11px 12px', color: '#94a3b8' }}>{u.packagingHardware}</td>
                  <td style={{ padding: '11px 12px', color: '#f87171' }}>{u.totalCogs}</td>
                  <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#34d399' }}>{u.grossProfit}</td>
                  <td style={{ padding: '11px 12px', fontWeight: 800, color: '#a78bfa' }}>{u.margin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Channel Contribution */}
      <div style={card}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: '#fff' }}>📊 Channel Contribution & Operating Margins</h3>
        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.25)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                {['Channel', 'Gross Revenue', 'Direct COGS', 'Channel OPEX / Fulfillment', 'Net Contribution', 'Contribution %'].map(h => (
                  <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: '#94a3b8', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {channelProfitability.map((cp, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '11px 12px', fontWeight: 600, color: '#fff' }}>{cp.channel}</td>
                  <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#34d399' }}>{cp.rev}</td>
                  <td style={{ padding: '11px 12px', color: '#f87171' }}>{cp.cogs}</td>
                  <td style={{ padding: '11px 12px', color: '#94a3b8' }}>{cp.storeOpex || cp.fulfillment || cp.stylistTravel}</td>
                  <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#38bdf8' }}>{cp.netContribution}</td>
                  <td style={{ padding: '11px 12px', fontWeight: 800, color: '#34d399' }}>{cp.margin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
