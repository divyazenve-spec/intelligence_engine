import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function RevenueByChannel() {
  const channels = [
    { name: 'Android Mobile App', share: '46.2%', rev: '₹8,24,300', orders: 576, aov: '₹1,431', color: '#3ddc84', icon: '📱' },
    { name: 'iOS Mobile App', share: '27.8%', rev: '₹4,96,000', orders: 288, aov: '₹1,722', color: '#0071e3', icon: '🍏' },
    { name: 'Web & Direct Portal', share: '18.4%', rev: '₹3,28,300', orders: 242, aov: '₹1,356', color: '#6366f1', icon: '💻' },
    { name: 'B2B & Partner Clinics', share: '7.6%', rev: '₹1,35,600', orders: 142, aov: '₹955', color: '#f59e0b', icon: '🏥' }
  ];

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
        <KpiCard label="Top Channel" value="Android App" delta="46.2% share" trend="up" subtext="₹8,24,300 generated" icon="📱" />
        <KpiCard label="Highest Ticket Size" value="iOS Mobile" delta="₹1,722 AOV" trend="up" subtext="+20% vs Android" icon="🍏" />
        <KpiCard label="Web Direct Volume" value="₹3,28,300" delta="18.4% share" trend="neutral" subtext="242 orders" icon="💻" />
        <KpiCard label="Partner Network" value="₹1,35,600" delta="7.6% share" trend="up" subtext="142 clinic orders" icon="🏥" />
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
