import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function OnlineFashionSales() {
  const [selectedChannel, setSelectedChannel] = useState('ALL');

  const channels = [
    { channel: 'Zenve iOS Luxury App', sessions: '48,200', aov: '₹3,840', orders: 342, revenue: '₹13,13,280', convRate: '3.42%', share: '46.2%' },
    { channel: 'Zenve Android App', sessions: '36,500', aov: '₹3,120', orders: 254, revenue: '₹7,92,480', convRate: '2.85%', share: '27.9%' },
    { channel: 'Mobile Responsive Web', sessions: '22,400', aov: '₹2,680', orders: 118, revenue: '₹3,16,240', convRate: '2.10%', share: '11.1%' },
    { channel: 'Instagram Shop & Social Drops', sessions: '18,900', aov: '₹3,450', orders: 122, revenue: '₹4,20,900', convRate: '2.95%', share: '14.8%' }
  ];

  const onlineDrops = [
    { dropName: 'Monsoon Canine Splash Capsule', releaseDate: '2026-08-15', itemsOffered: 'Parkas, Waterproof Boots, Drying Robes', sellThrough: '92.4%', revenue: '₹8,45,000', stockoutDays: '14 days', status: 'Completed' },
    { dropName: 'Royal Velvet Festive Collection', releaseDate: '2026-09-20', itemsOffered: 'Zari Collars, Brocade Bandanas, Tuxedos', sellThrough: '78.5%', revenue: '₹12,40,000', stockoutDays: 'Active Drop', status: 'Live' },
    { dropName: 'Alpine Cashmere Winter Preview', releaseDate: '2026-10-01', itemsOffered: 'Cable Knit Sweaters, Thermal Vests', sellThrough: '44.8%', revenue: '₹5,18,000', stockoutDays: 'Active Drop', status: 'Live' }
  ];

  const filtered = channels.filter(c => {
    if (selectedChannel !== 'ALL' && c.channel !== selectedChannel) return false;
    return true;
  });

  const card = { background: 'var(--card, #131d2e)', border: '1px solid var(--border, rgba(255,255,255,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Zenve Fashion"
      subcategory="Online E-Commerce"
      title="Online Fashion E-Commerce & Digital Drops"
      subtitle="Mobile app luxury storefront, limited-edition drop sell-through, digital 3D sizing guide, and social commerce"
      icon="📱"
      badge="Digital Store Live"
      actions={
        <button onClick={() => alert('Configuring Push Notification for Flash Fashion Drop...')} style={{ padding: '6px 14px', borderRadius: '8px', border: '1px solid #ec4899', background: 'rgba(236,72,153,0.15)', color: '#f472b6', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
          📢 Broadcast Drop Alert
        </button>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Online Fashion Revenue" value="₹28.42 L" delta="+38.2% YoY" trend="up" subtext="iOS, Android & Social Shop" icon="📱" />
        <KpiCard label="Online Orders (MTD)" value="836 Orders" delta="+21.5% MoM" trend="up" subtext="Average 1.8 items per cart" icon="🛍️" />
        <KpiCard label="Average Online AOV" value="₹3,399" delta="+₹420 vs FY25" trend="up" subtext="Accessory add-on bundle" icon="💳" />
        <KpiCard label="E-Commerce Conversion" value="3.02%" delta="+0.45% MoM" trend="up" subtext="Industry benchmark 1.8%" icon="⚡" />
        <KpiCard label="3D AI Pet Sizing Assist" value="78.4% Adoption" delta="3,210 scans completed" trend="up" subtext="Camera dimension scan" icon="📐" />
        <KpiCard label="60-Min Rush Delivery" value="42.8% of Orders" delta="Metro hub express" trend="up" subtext="Same-day party wear" icon="🚀" />
      </div>

      {/* Limited Edition Online Drops */}
      <div style={card}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: '#fff' }}>✨ Limited Edition Capsule Drops & Sell-Through</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '14px' }}>
          {onlineDrops.map((d, i) => (
            <div key={i} style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#f472b6' }}>{d.dropName}</span>
                <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, background: d.status === 'Live' ? 'rgba(52,211,153,0.15)' : 'rgba(148,163,184,0.15)', color: d.status === 'Live' ? '#34d399' : '#94a3b8' }}>{d.status}</span>
              </div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#fff', marginBottom: '4px' }}>{d.revenue}</div>
              <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '8px' }}>Items: {d.itemsOffered}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#cbd5e1' }}>
                <span>Sell-Through: <strong style={{ color: '#34d399' }}>{d.sellThrough}</strong></span>
                <span>Velocity: {d.stockoutDays}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Online Sales Channels Table */}
      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#fff' }}>📱 Digital Channel Traffic & Conversion</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: '#94a3b8' }}>Session volume, checkout conversion rates, and revenue share by digital channel</p>
          </div>
        </div>

        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.25)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                {['Channel Platform', 'Unique Sessions', 'Completed Orders', 'Conversion %', 'Average Order Value', 'Gross Revenue', 'Channel Share'].map(h => (
                  <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: '#94a3b8', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '11px 12px', fontWeight: 600, color: '#fff' }}>{c.channel}</td>
                  <td style={{ padding: '11px 12px', color: '#cbd5e1' }}>{c.sessions}</td>
                  <td style={{ padding: '11px 12px', color: '#fff', fontWeight: 600 }}>{c.orders}</td>
                  <td style={{ padding: '11px 12px', fontWeight: 700, color: '#38bdf8' }}>{c.convRate}</td>
                  <td style={{ padding: '11px 12px', color: '#cbd5e1' }}>{c.aov}</td>
                  <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#34d399' }}>{c.revenue}</td>
                  <td style={{ padding: '11px 12px', fontWeight: 700, color: '#a78bfa' }}>{c.share}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
