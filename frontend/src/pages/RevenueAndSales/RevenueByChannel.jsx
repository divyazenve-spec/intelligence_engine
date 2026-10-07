import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function RevenueByChannel() {
  const channels = [];

  return (
    <DashboardLayout
      category="Revenue & Sales"
      subcategory="Revenue by Channel"
      title="Channel Attribution & Performance"
      subtitle="Platform contribution, order volumes, and average ticket sizes across customer entrypoints"
      icon="📱"
      badge="Multi-Channel"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Top Channel" value="Android App" delta="46.2% share" trend="up" subtext="₹0" icon="📱" />
        <KpiCard label="Highest Ticket Size" value="iOS Mobile" delta="₹0" trend="up" subtext="+20% vs Android" icon="🍏" />
        <KpiCard label="Web Direct Volume" value="₹0" delta="18.4% share" trend="neutral" subtext="242 orders" icon="💻" />
        <KpiCard label="Partner Network" value="₹0" delta="7.6% share" trend="up" subtext="142 clinic orders" icon="🏥" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
        {channels.map((ch) => (
          <div key={ch.name} style={{
            background: 'var(--card, #1e293b)',
            border: '1px solid var(--border, rgba(255,255,255,0.08))',
            borderRadius: '12px',
            padding: '18px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}>
                <span>{ch.icon}</span>
                <span>{ch.name}</span>
              </div>
              <span style={{
                fontSize: '11px',
                fontWeight: 700,
                color: ch.color,
                background: `color-mix(in oklab, ${ch.color} 15%, transparent)`,
                padding: '2px 8px',
                borderRadius: '99px'
              }}>{ch.share}</span>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{ch.rev}</div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '8px',
              padding: '10px',
              background: 'rgba(0,0,0,0.15)',
              borderRadius: '8px',
              fontSize: '12px'
            }}>
              <div><span style={{ color: 'var(--muted-foreground, #94a3b8)' }}>Orders:</span> <b>{ch.orders}</b></div>
              <div><span style={{ color: 'var(--muted-foreground, #94a3b8)' }}>Avg Ticket:</span> <b>{ch.aov}</b></div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
