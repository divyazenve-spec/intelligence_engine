import React from 'react';

export default function KpiCard({ label, value, delta, subtext, icon, trend = 'neutral' }) {
  const isUp = trend === 'up';
  const isDown = trend === 'down';
  const isWarn = trend === 'warn';
  const deltaBg = isUp ? '#f0fdf4' : isDown ? '#fee2e2' : isWarn ? '#fffbeb' : '#eff6ff';
  const deltaColor = isUp ? '#16a34a' : isDown ? '#dc2626' : isWarn ? '#d97706' : '#2563eb';
  const deltaBorder = isUp ? '#bbf7d0' : isDown ? '#fecaca' : isWarn ? '#fde68a' : '#bfdbfe';

  return (
    <div style={{
      background: 'var(--card, #ffffff)',
      border: '1px solid var(--border, #e2e8f0)',
      borderRadius: '12px',
      padding: '16px 18px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      gap: '6px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
      transition: 'transform 0.15s ease, box-shadow 0.15s ease'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{
          fontSize: '11px',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
          color: 'var(--muted-foreground, #64748b)',
          fontFamily: '"IBM Plex Mono", monospace'
        }}>{label}</span>
        {icon && (
          <span style={{
            fontSize: '16px',
            padding: '4px',
            borderRadius: '8px',
            background: '#f8fafc',
            lineHeight: 1
          }}>{icon}</span>
        )}
      </div>
      <div style={{
        fontSize: '24px',
        fontWeight: 700,
        fontFamily: 'var(--font-display, "Sora", sans-serif)',
        color: 'var(--foreground, #0f172a)',
        marginTop: '4px',
        lineHeight: 1.2,
        letterSpacing: '-0.02em'
      }}>{value}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', marginTop: '4px' }}>
        {delta && (
          <span style={{
            color: deltaColor,
            fontWeight: 600,
            background: deltaBg,
            border: `1px solid ${deltaBorder}`,
            padding: '2px 7px',
            borderRadius: '99px',
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: '10.5px'
          }}>{delta}</span>
        )}
        {subtext && <span style={{ color: 'var(--muted-foreground, #94a3b8)', fontSize: '11px' }}>{subtext}</span>}
      </div>
    </div>
  );
}
