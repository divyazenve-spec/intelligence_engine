import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function FashionProfitability() {
  const unitEconomics = [];

  const channelProfitability = [];

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(255,255,255,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Zenve Fashion"
      subcategory="Unit Economics & Margins"
      title="Fashion Margins, COGS & Contribution Profitability"
      subtitle="Bespoke pet apparel unit economics, artisan atelier labor costs, channel contribution margins, and markdown protection"
      icon="💎"
      badge=""
      actions={
        <button onClick={() => alert('Exporting Fashion Unit Economics Model...')} style={{ padding: '6px 14px', borderRadius: '8px', border: '1px solid #ec4899', background: 'rgba(236,72,153,0.15)', color: '#f472b6', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
          📑 Profit Model Export
        </button>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Blended Gross Margin" value="0.0%" delta="+3.1% YoY" trend="up" subtext="Direct atelier sourcing" icon="💎" />
        <KpiCard label="Net Contribution Margin" value="0.0%" delta="+4.2% expansion" trend="up" subtext="After showroom OPEX" icon="📊" />
        <KpiCard label="Full-Price Sell-Through" value="0.0%" delta="Markdowns < 5.4%" trend="up" subtext="No discount brand equity" icon="🏷️" />
        <KpiCard label="Custom Monogram Margin" value="0.0%" delta="₹0-on fee" trend="up" subtext="Artisan laser embroidery" icon="✨" />
        <KpiCard label="Sizing Exchange Cost" value="1.8% of Rev" delta="-0.8% reduction" trend="up" subtext="Precise 3D size fitting" icon="📐" />
        <KpiCard label="Fashion Operating EBITDA" value="₹0" delta="36.9% EBITDA margin" trend="up" subtext="Highly lucrative luxury line" icon="⚡" />
      </div>

      {/* Unit Economics Breakdown */}
      <div style={card}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>💎 Core SKU Unit Economics & Margin Matrix</h3>
        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'var(--muted, #f8fafc)', borderBottom: '1px solid var(--border, rgba(0,0,0,0.08))' }}>
                {['Apparel Product', 'Retail ASP', 'Fabric Cost', 'Artisan Labor', 'Hardware & Pkg', 'Total COGS', 'Gross Profit', 'Gross Margin'].map(h => (
                  <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: 'var(--muted-foreground, #64748b)', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {unitEconomics.map((u, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border, rgba(0,0,0,0.06))' }}>
                  <td style={{ padding: '11px 12px', fontWeight: 600, color: 'var(--foreground, #0f172a)' }}>{u.product}</td>
                  <td style={{ padding: '11px 12px', color: 'var(--foreground, #334155)' }}>{u.asp}</td>
                  <td style={{ padding: '11px 12px', color: 'var(--muted-foreground, #64748b)' }}>{u.fabricCost}</td>
                  <td style={{ padding: '11px 12px', color: 'var(--muted-foreground, #64748b)' }}>{u.artisanLabor}</td>
                  <td style={{ padding: '11px 12px', color: 'var(--muted-foreground, #64748b)' }}>{u.packagingHardware}</td>
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
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>📊 Channel Contribution & Operating Margins</h3>
        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'var(--muted, #f8fafc)', borderBottom: '1px solid var(--border, rgba(0,0,0,0.08))' }}>
                {['Channel', 'Gross Revenue', 'Direct COGS', 'Channel OPEX / Fulfillment', 'Net Contribution', 'Contribution %'].map(h => (
                  <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: 'var(--muted-foreground, #64748b)', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {channelProfitability.map((cp, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border, rgba(0,0,0,0.06))' }}>
                  <td style={{ padding: '11px 12px', fontWeight: 600, color: 'var(--foreground, #0f172a)' }}>{cp.channel}</td>
                  <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#34d399' }}>{cp.rev}</td>
                  <td style={{ padding: '11px 12px', color: '#f87171' }}>{cp.cogs}</td>
                  <td style={{ padding: '11px 12px', color: 'var(--muted-foreground, #64748b)' }}>{cp.storeOpex || cp.fulfillment || cp.stylistTravel}</td>
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
