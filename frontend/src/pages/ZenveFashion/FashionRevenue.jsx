import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function FashionRevenue() {
  const [timeframe, setTimeframe] = useState('FY26-27');

  const categoryRevenue = [
    { cat: 'Ergonomic Harnesses & Leashes', rev: '₹14.80 L', share: '32.5%', growth: '+34.2%', aov: '₹3,650' },
    { cat: 'Weatherwear & Monsoon Rainwear', rev: '₹10.90 L', share: '24.0%', growth: '+41.8%', aov: '₹2,920' },
    { cat: 'Formal Wedding & Festive Atelier', rev: '₹8.20 L', share: '18.0%', growth: '+52.4%', aov: '₹4,950' },
    { cat: 'Winter Cashmere & Knits', rev: '₹6.40 L', share: '14.1%', growth: '+28.0%', aov: '₹2,480' },
    { cat: 'Collars, Bandanas & Accessories', rev: '₹5.20 L', share: '11.4%', growth: '+22.6%', aov: '₹1,240' }
  ];

  const cityRevenue = [
    { city: 'Mumbai Metro (Bandra & South Mumbai)', rev: '₹18.90 L', share: '41.5%', stores: '1 Flagship + Online', topCategory: 'Formal Atelier & Harnesses' },
    { city: 'Bengaluru (Indiranagar & Koramangala)', rev: '₹17.30 L', share: '38.0%', stores: '2 Boutiques + Online', topCategory: 'Rainwear & Cashmere' },
    { city: 'Delhi NCR (Gurugram & South Delhi)', rev: '₹5.50 L', share: '12.1%', stores: 'Concierge Direct + Online', topCategory: 'Winter Knits & Tuxedos' },
    { city: 'Hyderabad (Jubilee Hills)', rev: '₹3.80 L', share: '8.4%', stores: '1 Studio + Online', topCategory: 'Festive Brocade & Collars' }
  ];

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(255,255,255,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Zenve Fashion"
      subcategory="Revenue Intelligence"
      title="Fashion Revenue Streams & Financial Trajectory"
      subtitle="Financial performance across apparel lines, seasonal holiday surges, geographic luxury hubs, and channel distribution"
      icon="💵"
      badge="Revenue Analytics"
      actions={
        <button onClick={() => alert('Exporting Fashion Financial Revenue Deck (PDF)...')} style={{ padding: '6px 14px', borderRadius: '8px', border: '1px solid #ec4899', background: 'rgba(236,72,153,0.15)', color: '#f472b6', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
          📊 Revenue Export
        </button>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Fashion Gross Revenue (FYTD)" value="₹45.50 L" delta="+36.4% YoY" trend="up" subtext="7 months financial actuals" icon="💵" />
        <KpiCard label="Monthly Revenue Run-Rate" value="₹7.20 L / Mo" delta="+28.5% vs FY25" trend="up" subtext="Accelerating into Q3" icon="📈" />
        <KpiCard label="Showroom vs Online Mix" value="58% : 42%" delta="Healthy omnichannel" trend="neutral" subtext="Boutiques driving high AOV" icon="⚖️" />
        <KpiCard label="Festive Season Surge" value="+64.2%" delta="Diwali & wedding peak" trend="up" subtext="High-margin couture" icon="✨" />
        <KpiCard label="Blended Average Order Value" value="₹3,410" delta="+₹390 YoY" trend="up" subtext="Cross-category basket" icon="🛒" />
        <KpiCard label="Fashion Revenue / Pet Parent" value="₹4,890" delta="+18.2% expansion" trend="up" subtext="Multi-item wardrobe repeat" icon="💎" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: '18px' }}>
        {/* Revenue by Category */}
        <div style={card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>👗 Revenue by Product Category</h3>
              <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Category sales contribution, year-on-year growth, and average ticket</p>
            </div>
          </div>
          <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr style={{ background: 'var(--muted, #f8fafc)', borderBottom: '1px solid var(--border, rgba(0,0,0,0.08))' }}>
                  {['Apparel Category', 'Revenue FYTD', 'Share %', 'Growth YoY', 'Avg Order Value'].map(h => (
                    <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: 'var(--muted-foreground, #64748b)', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {categoryRevenue.map((c, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border, rgba(0,0,0,0.06))' }}>
                    <td style={{ padding: '11px 12px', fontWeight: 600, color: 'var(--foreground, #0f172a)' }}>{c.cat}</td>
                    <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#34d399' }}>{c.rev}</td>
                    <td style={{ padding: '11px 12px', color: '#a78bfa', fontWeight: 600 }}>{c.share}</td>
                    <td style={{ padding: '11px 12px', color: '#34d399', fontWeight: 700 }}>{c.growth}</td>
                    <td style={{ padding: '11px 12px', color: 'var(--foreground, #334155)' }}>{c.aov}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Geographic Revenue */}
        <div style={card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>📍 Regional Revenue Distribution</h3>
              <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Geographic luxury metro contribution and dominant wardrobe styles</p>
            </div>
          </div>
          <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr style={{ background: 'var(--muted, #f8fafc)', borderBottom: '1px solid var(--border, rgba(0,0,0,0.08))' }}>
                  {['Metro Market', 'Revenue', 'Share %', 'Store Presence', 'Top Category'].map(h => (
                    <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: 'var(--muted-foreground, #64748b)', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cityRevenue.map((c, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border, rgba(0,0,0,0.06))' }}>
                    <td style={{ padding: '11px 12px', fontWeight: 600, color: 'var(--foreground, #0f172a)' }}>{c.city}</td>
                    <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#34d399' }}>{c.rev}</td>
                    <td style={{ padding: '11px 12px', color: '#38bdf8', fontWeight: 600 }}>{c.share}</td>
                    <td style={{ padding: '11px 12px', color: 'var(--foreground, #334155)' }}>{c.stores}</td>
                    <td style={{ padding: '11px 12px', color: '#f472b6', fontSize: '11px' }}>{c.topCategory}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
