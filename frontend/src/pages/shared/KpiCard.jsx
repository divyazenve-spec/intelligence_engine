import React from 'react';

export default function KpiCard({ label, value, delta, subtext, icon, trend = 'neutral' }) {
  const trendColor = trend === 'up' ? '#10b981' : trend === 'down' ? '#ef4444' : '#64748b';
  
  return (
    <div style={{
      background: 'var(--card, #1e293b)',
      border: '1px solid var(--border, rgba(255,255,255,0.08))',
      borderRadius: '12px',
      padding: '16px 18px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{
          fontSize: '11px',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color: 'var(--muted-foreground, #94a3b8)',
          fontFamily: '"IBM Plex Mono", monospace'
        }}>{label}</span>
        {icon && <span style={{ fontSize: '16px' }}>{icon}</span>}
      </div>
      <div style={{
        fontSize: '24px',
        fontWeight: 700,
        fontFamily: '"IBM Plex Mono", monospace',
        color: 'var(--foreground, #f8fafc)'
      }}>{value}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px' }}>
        {delta && (
          <span style={{
            color: trendColor,
            fontWeight: 600,
            background: `color-mix(in oklab, ${trendColor} 15%, transparent)`,
            padding: '2px 6px',
            borderRadius: '99px'
          }}>{delta}</span>
        )}
        {subtext && <span style={{ color: 'var(--muted-foreground, #94a3b8)' }}>{subtext}</span>}
      </div>
    </div>
  );
}
