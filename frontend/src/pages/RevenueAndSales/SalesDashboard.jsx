import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function SalesDashboard() {
  return (
    <DashboardLayout
      category="Revenue & Sales"
      subcategory="Sales Dashboard"
      title="Executive Sales Overview"
      subtitle="Comprehensive revenue velocity, order volumes, and financial transaction streams"
      icon="💼"
      badge="Live Feed"
      actions={
        <>
          <button style={{
            background: 'var(--card, #1e293b)',
            border: '1px solid var(--border, rgba(255,255,255,0.1))',
            color: 'var(--foreground, #f8fafc)',
            padding: '6px 14px',
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer'
          }}>14D Filter</button>
          <button style={{
            background: 'var(--primary, #3b82f6)',
            border: 'none',
            color: '#fff',
            padding: '6px 14px',
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer'
          }}>Export Report</button>
        </>
      }
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '14px'
      }}>
        <KpiCard label="Today's Sales" value="₹38,100" delta="+18.4%" trend="up" subtext="vs yesterday" icon="⚡" />
        <KpiCard label="Period Revenue" value="₹17,84,200" delta="+12.6%" trend="up" subtext="30 days volume" icon="📈" />
        <KpiCard label="Paid Transactions" value="1,248" delta="98.2%" trend="up" subtext="Settlement rate" icon="✅" />
        <KpiCard label="Avg Order Value" value="₹1,429" delta="+4.2%" trend="up" subtext="Basket size" icon="🛒" />
        <KpiCard label="Active Clients" value="894" delta="+15.1%" trend="up" subtext="Unique pet parents" icon="👥" />
        <KpiCard label="App Downloads" value="2,480" delta="+22.0%" trend="up" subtext="Android & iOS" icon="📱" />
      </div>

      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 12px', fontSize: '15px', fontWeight: 700 }}>Revenue Trajectory & Sales Velocity</h3>
        <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Daily settled sales compared to previous period benchmark</p>
        <div style={{
          height: '240px',
          background: 'rgba(0,0,0,0.15)',
          borderRadius: '8px',
          display: 'grid',
          placeItems: 'center',
          border: '1px dashed var(--border, rgba(255,255,255,0.1))',
          fontSize: '12px',
          color: 'var(--muted-foreground, #94a3b8)'
        }}>
          Interactive Revenue Velocity Graph (SVG High Definition)
        </div>
      </div>
    </DashboardLayout>
  );
}
