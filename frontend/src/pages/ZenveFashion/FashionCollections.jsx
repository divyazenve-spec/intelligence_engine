import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function FashionCollections() {
  const collections = [];

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(255,255,255,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Zenve Fashion"
      subcategory="Seasonal Collections"
      title="Haute Couture Collections & Designer Runway Drops"
      subtitle="Limited-edition seasonal capsule launches, sell-through velocity, fabric sourcing lead times, and designer portfolios"
      icon="✨"
      badge="Runway Collections"
      actions={
        <button onClick={() => alert('Creating New Seasonal Capsule Blueprint...')} style={{ padding: '6px 14px', borderRadius: '8px', border: '1px solid #ec4899', background: 'rgba(236,72,153,0.15)', color: '#f472b6', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
          ✨ Create Capsule Blueprint
        </button>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Active Capsule Collections" value="3 Live Drops" delta="Festive + Winter + Gala" trend="up" subtext="Current retail circulation" icon="✨" />
        <KpiCard label="Avg. Drop Sell-Through" value="0.0%" delta="+5.4% YoY" trend="up" subtext="Zero deadstock policy" icon="🎯" />
        <KpiCard label="Highest Grossing Drop" value="₹0" delta="Royal Velvet Festive" trend="up" subtext="Sold out in 22 days" icon="👑" />
        <KpiCard label="Design-to-Rack Lead Time" value="28 Days" delta="-8 days faster" trend="up" subtext="In-house artisan studio" icon="⏱️" />
        <KpiCard label="VIP Pre-Order Conversion" value="0.0%" delta="Platinum member reserve" trend="up" subtext="Sold prior to public launch" icon="💎" />
        <KpiCard label="Runway Pet Models" value="36 Verified" delta="Brand ambassador pets" trend="up" subtext="Instagram campaign reach" icon="📸" />
      </div>

      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>✨ Seasonal Capsule & Runway Lines Portfolio</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Performance metrics, designer ownership, and revenue generated per fashion line</p>
          </div>
        </div>

        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'var(--muted, #f8fafc)', borderBottom: '1px solid var(--border, rgba(0,0,0,0.08))' }}>
                {['Collection ID', 'Collection Title', 'Season', 'Styles', 'Launch Date', 'Sell-Through', 'Revenue Generated', 'Lead Designer', 'Status'].map(h => (
                  <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: 'var(--muted-foreground, #64748b)', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {collections.map((c, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border, rgba(0,0,0,0.06))' }}>
                  <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', color: '#f472b6', fontSize: '11px' }}>{c.id}</td>
                  <td style={{ padding: '11px 12px', fontWeight: 600, color: 'var(--foreground, #0f172a)' }}>{c.name}</td>
                  <td style={{ padding: '11px 12px', color: 'var(--foreground, #334155)' }}>{c.season}</td>
                  <td style={{ padding: '11px 12px', color: 'var(--muted-foreground, #64748b)' }}>{c.styles} styles</td>
                  <td style={{ padding: '11px 12px', color: '#64748b', fontSize: '11px' }}>{c.launchDate}</td>
                  <td style={{ padding: '11px 12px', fontWeight: 700, color: '#34d399' }}>{c.sellThrough}</td>
                  <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#38bdf8' }}>{c.revenue}</td>
                  <td style={{ padding: '11px 12px', color: '#a78bfa' }}>{c.leadDesigner}</td>
                  <td style={{ padding: '11px 12px' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, background: c.status === 'Active Drop' ? 'rgba(52,211,153,0.15)' : c.status === 'Permanent Line' ? 'rgba(167,139,250,0.15)' : 'rgba(148,163,184,0.15)', color: c.status === 'Active Drop' ? '#34d399' : c.status === 'Permanent Line' ? '#a78bfa' : '#94a3b8' }}>
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
