import React from 'react';

export default function DashboardLayout({
  title,
  category,
  subcategory,
  subtitle,
  icon,
  badge,
  actions,
  children
}) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      padding: '24px 28px 48px',
      width: '100%',
      margin: 0,
      color: 'var(--foreground, #f8fafc)',
      fontFamily: 'var(--font-sans, "Manrope", sans-serif)'
    }}>
      {/* Header section */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: '16px',
        borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))',
        paddingBottom: '16px'
      }}>
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '11px',
            color: 'var(--muted-foreground, #94a3b8)',
            marginBottom: '4px',
            fontFamily: '"IBM Plex Mono", monospace'
          }}>
            <span>{category}</span>
            <span>›</span>
            <span style={{ color: 'var(--primary, #3b82f6)', fontWeight: 600 }}>{subcategory || title}</span>
          </div>
          <h1 style={{
            fontSize: '24px',
            fontWeight: 700,
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            {icon && <span>{icon}</span>}
            {title}
            {badge && (
              <span style={{
                fontSize: '11px',
                fontWeight: 600,
                padding: '3px 8px',
                borderRadius: '99px',
                background: 'color-mix(in oklab, var(--primary, #3b82f6) 18%, transparent)',
                color: 'var(--primary, #3b82f6)'
              }}>
                {badge}
              </span>
            )}
          </h1>
          {subtitle && (
            <p style={{
              margin: '4px 0 0',
              fontSize: '13px',
              color: 'var(--muted-foreground, #94a3b8)'
            }}>
              {subtitle}
            </p>
          )}
        </div>

        {actions && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            {actions}
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {children}
      </div>
    </div>
  );
}
