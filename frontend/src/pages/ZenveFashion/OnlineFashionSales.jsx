import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function OnlineFashionSales() {
  const [selectedChannel, setSelectedChannel] = useState('ALL');

  const channels = [];

  const onlineDrops = [];

  const filtered = channels.filter(c => {
    if (selectedChannel !== 'ALL' && c.channel !== selectedChannel) return false;
    return true;
  });

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(255,255,255,0.08))', borderRadius: '12px', padding: '22px 24px' };

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
        <KpiCard label="Online Fashion Revenue" value="₹0" delta="+38.2% YoY" trend="up" subtext="iOS, Android & Social Shop" icon="📱" />
        <KpiCard label="Online Orders (MTD)" value="836 Orders" delta="+21.5% MoM" trend="up" subtext="Average 1.8 items per cart" icon="🛍️" />
        <KpiCard label="Average Online AOV" value="₹0" delta="+₹0 FY25" trend="up" subtext="Accessory add-on bundle" icon="💳" />
        <KpiCard label="E-Commerce Conversion" value="0.0%" delta="+0.45% MoM" trend="up" subtext="Industry benchmark 1.8%" icon="⚡" />
        <KpiCard label="3D AI Pet Sizing Assist" value="78.4% Adoption" delta="3,210 scans completed" trend="up" subtext="Camera dimension scan" icon="📐" />
        <KpiCard label="60-Min Rush Delivery" value="42.8% of Orders" delta="Metro hub express" trend="up" subtext="Same-day party wear" icon="🚀" />
      </div>

      {/* Limited Edition Online Drops */}
      <div style={card}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>✨ Limited Edition Capsule Drops & Sell-Through</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '14px' }}>
          {onlineDrops.map((d, i) => (
            <div key={i} style={{ background: 'var(--muted, #f8fafc)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#f472b6' }}>{d.dropName}</span>
                <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, background: d.status === 'Live' ? 'rgba(52,211,153,0.15)' : 'rgba(148,163,184,0.15)', color: d.status === 'Live' ? '#34d399' : '#94a3b8' }}>{d.status}</span>
              </div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--foreground, #0f172a)', marginBottom: '4px' }}>{d.revenue}</div>
              <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #64748b)', marginBottom: '8px' }}>Items: {d.itemsOffered}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--foreground, #334155)' }}>
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
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>📱 Digital Channel Traffic & Conversion</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Session volume, checkout conversion rates, and revenue share by digital channel</p>
          </div>
        </div>

        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'var(--muted, #f8fafc)', borderBottom: '1px solid var(--border, rgba(0,0,0,0.08))' }}>
                {['Channel Platform', 'Unique Sessions', 'Completed Orders', 'Conversion %', 'Average Order Value', 'Gross Revenue', 'Channel Share'].map(h => (
                  <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: 'var(--muted-foreground, #64748b)', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border, rgba(0,0,0,0.06))' }}>
                  <td style={{ padding: '11px 12px', fontWeight: 600, color: 'var(--foreground, #0f172a)' }}>{c.channel}</td>
                  <td style={{ padding: '11px 12px', color: 'var(--foreground, #334155)' }}>{c.sessions}</td>
                  <td style={{ padding: '11px 12px', color: 'var(--foreground, #0f172a)', fontWeight: 600 }}>{c.orders}</td>
                  <td style={{ padding: '11px 12px', fontWeight: 700, color: '#38bdf8' }}>{c.convRate}</td>
                  <td style={{ padding: '11px 12px', color: 'var(--foreground, #334155)' }}>{c.aov}</td>
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
