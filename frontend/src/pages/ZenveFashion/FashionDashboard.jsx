import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function FashionDashboard() {
  const topProducts = [
    { sku: 'ZVF-HARN-01', name: 'Signature Italian Leather Harness', category: 'Ergonomic Harnesses', price: '₹3,450', unitsSold: 142, revenue: '₹4,89,900', margin: '68.4%', trend: '+34%' },
    { sku: 'ZVF-COAT-04', name: 'Monsoon Waterproof Dog Parka', category: 'Weatherwear', price: '₹2,850', unitsSold: 118, revenue: '₹3,36,300', margin: '64.2%', trend: '+42%' },
    { sku: 'ZVF-KNIT-09', name: 'Cashmere-Blend Cable Knit Sweater', category: 'Winter Knits', price: '₹2,400', unitsSold: 96, revenue: '₹2,30,400', margin: '71.0%', trend: '+19%' },
    { sku: 'ZVF-COLL-02', name: 'Rose Gold Hardware Velvet Collar', category: 'Collars & Leashes', price: '₹1,650', unitsSold: 164, revenue: '₹2,70,600', margin: '74.5%', trend: '+28%' },
    { sku: 'ZVF-BAND-05', name: 'Handcrafted Silk Festive Bandana', category: 'Accessories', price: '₹850', unitsSold: 210, revenue: '₹1,78,500', margin: '78.2%', trend: '+55%' },
  ];

  const showroomPerformance = [
    { name: 'Indiranagar Luxe Studio (BLR)', footfall: '640 visitors', sales: '₹5.42 L', conversion: '38.5%', avgTicket: '₹2,190', rating: '4.9 ★' },
    { name: 'Bandra Boutique & Atelier (MUM)', footfall: '520 visitors', sales: '₹4.88 L', conversion: '41.2%', avgTicket: '₹2,280', rating: '4.9 ★' },
    { name: 'Koramangala Pet Styling Lounge', footfall: '480 visitors', sales: '₹3.95 L', conversion: '34.8%', avgTicket: '₹2,360', rating: '4.8 ★' },
  ];

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(255,255,255,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Zenve Fashion"
      subcategory="Executive Dashboard"
      title="Zenve Pet Haute Couture & Lifestyle Command Center"
      subtitle="Bespoke luxury pet apparel, flagship showroom footfalls, online drops, and premium lifestyle unit economics"
      icon="🎀"
      badge="Showroom + Atelier Live"
      actions={
        <button onClick={() => alert('Launching New Seasonal Fashion Capsule...')} style={{ padding: '6px 14px', borderRadius: '8px', border: '1px solid #ec4899', background: 'rgba(236,72,153,0.15)', color: '#f472b6', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
          ✨ Launch Capsule Drop
        </button>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Fashion Gross Revenue (MTD)" value="₹14.25 L" delta="+34.8% MoM" trend="up" subtext="Combined online & boutique" icon="🎀" />
        <KpiCard label="Apparel Units Sold" value="730 Items" delta="+22.4% vs last month" trend="up" subtext="Average 2.4 items/cart" icon="👗" />
        <KpiCard label="Blended Gross Margin" value="68.2%" delta="+3.1% YoY" trend="up" subtext="High atelier contribution" icon="💎" />
        <KpiCard label="Flagship Showroom Footfall" value="1,640 Visitors" delta="+18.5% conversion" trend="up" subtext="BLR & MUM Boutiques" icon="🛍️" />
        <KpiCard label="Bespoke Atelier Orders" value="64 Custom" delta="Fit guarantee 100%" trend="up" subtext="Handcrafted tailored fit" icon="✂️" />
        <KpiCard label="Return & Exchange Rate" value="3.1%" delta="-1.4% improvement" trend="up" subtext="Precision 3D pet sizing" icon="📐" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: '18px' }}>
        {/* Top Product Lines */}
        <div style={card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>👗 Best-Selling Couture Lines</h3>
              <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>High-velocity pet apparel, weatherwear, and artisan accessories</p>
            </div>
          </div>
          <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr style={{ background: 'var(--muted, #f8fafc)', borderBottom: '1px solid var(--border, rgba(0,0,0,0.08))' }}>
                  {['SKU', 'Product Name', 'Category', 'Price', 'Units Sold', 'Revenue', 'Margin', 'Growth'].map(h => (
                    <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: 'var(--muted-foreground, #64748b)', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {topProducts.map((p, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border, rgba(0,0,0,0.06))' }}>
                    <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', color: '#f472b6', fontSize: '11px' }}>{p.sku}</td>
                    <td style={{ padding: '11px 12px', fontWeight: 600, color: 'var(--foreground, #0f172a)' }}>{p.name}</td>
                    <td style={{ padding: '11px 12px', color: 'var(--muted-foreground, #64748b)' }}>{p.category}</td>
                    <td style={{ padding: '11px 12px', color: 'var(--foreground, #334155)' }}>{p.price}</td>
                    <td style={{ padding: '11px 12px', color: 'var(--foreground, #0f172a)', fontWeight: 600 }}>{p.unitsSold}</td>
                    <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#34d399' }}>{p.revenue}</td>
                    <td style={{ padding: '11px 12px', fontWeight: 700, color: '#a78bfa' }}>{p.margin}</td>
                    <td style={{ padding: '11px 12px', color: '#34d399', fontWeight: 600 }}>{p.trend}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Flagship Showrooms */}
        <div style={card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>🛍️ Flagship Pet Boutiques & Styling Lounges</h3>
              <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>In-store pet trial rooms, custom embroidery lounges, and footfall conversions</p>
            </div>
          </div>
          <div style={{ display: 'grid', gap: '12px' }}>
            {showroomPerformance.map((s, idx) => (
              <div key={idx} style={{ background: 'rgba(0,0,0,0.22)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>{s.name}</span>
                  <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 700, background: 'rgba(251,191,36,0.15)', color: '#fbbf24' }}>{s.rating}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', fontSize: '12px' }}>
                  <div><div style={{ color: '#64748b' }}>Footfall:</div><div style={{ color: '#e2e8f0', fontWeight: 600 }}>{s.footfall}</div></div>
                  <div><div style={{ color: '#64748b' }}>Sales MTD:</div><div style={{ color: '#34d399', fontWeight: 700, fontFamily: 'monospace' }}>{s.sales}</div></div>
                  <div><div style={{ color: '#64748b' }}>Conversion:</div><div style={{ color: '#38bdf8', fontWeight: 600 }}>{s.conversion}</div></div>
                  <div><div style={{ color: '#64748b' }}>Avg. Ticket:</div><div style={{ color: '#e2e8f0', fontWeight: 600 }}>{s.avgTicket}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
