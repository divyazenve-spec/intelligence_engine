import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function ExecutiveDashboard() {
  const [period, setPeriod] = useState('MTD');

  const cardStyle = {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '22px 24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
  };

  return (
    <DashboardLayout
      category="Executive Dashboard"
      subcategory="CEO Control Center"
      title="Zenve Executive Control Center"
      subtitle="Complete private business intelligence for healthier, happier pets across all healthcare and commerce operations"
      icon="🏛️"
      badge="All Systems Live"
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => alert('Executive Financial Model export initiated (CSV/PDF)...')}
            style={{
              padding: '7px 14px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              background: '#ffffff',
              color: '#334155',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Export Board Deck
          </button>
          <button
            onClick={() => alert('Refreshing live telemetry across all 14 facilities and digital nodes...')}
            style={{
              padding: '7px 14px',
              borderRadius: '8px',
              border: '1px solid #2563eb',
              background: '#2563eb',
              color: '#ffffff',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            🔄 Sync Enterprise Vitals
          </button>
        </div>
      }
    >
      {/* Executive KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Gross Revenue (MTD)" value="₹54.80 Lakh" delta="+18.4% MoM" trend="up" subtext="Across all 5 divisions" icon="💰" />
        <KpiCard label="Net Revenue" value="₹51.65 Lakh" delta="94.2% Net" trend="up" subtext="Less discounts & returns" icon="📈" />
        <KpiCard label="EBITDA Margin" value="16.9%" delta="₹8.76 Lakh" trend="up" subtext="+2.1% vs Q2 benchmark" icon="💎" />
        <KpiCard label="Registered Pet Parents" value="12,480" delta="+1,120 MTD" trend="up" subtext="78.4% Repeat rate" icon="🐾" />
        <KpiCard label="Clinical Practitioners" value="24 Board Cert" delta="100% On-Duty" trend="neutral" subtext="14 Operating clinics" icon="👨‍⚕️" />
        <KpiCard label="60-Min SLA Velocity" value="98.4%" delta="42 mins avg" trend="up" subtext="Hyperlocal dispatch" icon="⚡" />
      </div>

      {/* Grid 2: Revenue Mix & Operations */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: '18px' }}>
        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Divisional Revenue Attribution</h3>
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748b' }}>₹51.65L Total</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { name: 'Pet Products & Nutrition', pct: 32, rev: '₹16.53L', color: '#3b82f6' },
              { name: 'Veterinary Pharmacy & Rx', pct: 24, rev: '₹12.40L', color: '#10b981' },
              { name: 'Clinical Care & Surgeries', pct: 18, rev: '₹9.30L', color: '#8b5cf6' },
              { name: 'B2B Enterprise & Institutional', pct: 12, rev: '₹6.20L', color: '#f59e0b' },
              { name: 'Pet Fashion & Lifestyle', pct: 8, rev: '₹4.13L', color: '#ec4899' },
              { name: 'Care Subscriptions & Wellness', pct: 6, rev: '₹3.09L', color: '#06b6d4' }
            ].map(div => (
              <div key={div.name} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                  <span style={{ fontWeight: 600, color: '#334155' }}>{div.name}</span>
                  <span style={{ fontWeight: 700, color: '#0f172a' }}>{div.rev} <span style={{ color: '#64748b', fontWeight: 400 }}>({div.pct}%)</span></span>
                </div>
                <div style={{ width: '100%', height: '7px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${div.pct}%`, height: '100%', background: div.color, borderRadius: '4px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Executive Health Scorecard</h3>
            <span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '12px', background: '#ecfdf5', color: '#047857', fontWeight: 600 }}>Enterprise Optimal</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
            <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Working Capital</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginTop: '4px' }}>₹68.4 Lakh</div>
              <div style={{ fontSize: '11px', color: '#059669', fontWeight: 600, marginTop: '2px' }}>18.4 Mos Runway</div>
            </div>
            <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Customer LTV / CAC</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginTop: '4px' }}>5.8x Ratio</div>
              <div style={{ fontSize: '11px', color: '#059669', fontWeight: 600, marginTop: '2px' }}>Payback 2.4 Mos</div>
            </div>
            <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Doctor NPS</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginTop: '4px' }}>4.94 / 5.0</div>
              <div style={{ fontSize: '11px', color: '#2563eb', fontWeight: 600, marginTop: '2px' }}>99.1% Diagnostic Acc</div>
            </div>
            <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Inventory Turns</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginTop: '4px' }}>7.2x / Year</div>
              <div style={{ fontSize: '11px', color: '#059669', fontWeight: 600, marginTop: '2px' }}>Zero Stockout Rate</div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
