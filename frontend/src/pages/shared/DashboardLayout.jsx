import React from 'react';

export default function DashboardLayout({
  title,
  category,
  subcategory,
  subtitle,
  icon,
  badge,
  actions,
  noPadding,
  hideHeader = false,
  children
}) {
  const containerPadding = noPadding ? 0 : '24px 28px 48px';

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      padding: containerPadding,
      width: '100%',
      margin: 0,
      color: 'var(--foreground, #0f172a)',
      fontFamily: 'var(--font-sans, "Manrope", sans-serif)'
    }}>
      {/* Header section */}
      {!hideHeader && (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '16px',
          borderBottom: '1px solid var(--border, #e2e8f0)',
          paddingBottom: '16px'
        }}>
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '11px',
            color: 'var(--muted-foreground, #64748b)',
            marginBottom: '4px',
            fontFamily: '"IBM Plex Mono", monospace'
          }}>
            <span>{category}</span>
            <span>›</span>
            <span style={{ color: 'var(--primary, #2563eb)', fontWeight: 600 }}>{subcategory || title}</span>
          </div>
          <h1 style={{
            fontSize: '22px',
            fontWeight: 700,
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: 'var(--foreground, #0f172a)',
            fontFamily: 'var(--font-display, "Sora", sans-serif)'
          }}>
            {icon && <span>{icon}</span>}
            {title}
            {badge && (
              <span style={{
                fontSize: '11px',
                fontWeight: 600,
                padding: '3px 9px',
                borderRadius: '9999px',
                background: '#f0fdf4',
                color: '#166534',
                border: '1px solid #bbf7d0'
              }}>
                {badge}
              </span>
            )}
          </h1>
          {subtitle && (
            <p style={{
              margin: '4px 0 0',
              fontSize: '13px',
              color: 'var(--muted-foreground, #64748b)'
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
      )}

      {/* Main Content Area */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {children}
      </div>
    </div>
  );
}
