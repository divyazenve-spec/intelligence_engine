import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function VendorDashboard() {
  const topVendors = [];

  const categories = [];

  const months = [];

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(255,255,255,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Vendors & Procurement"
      subcategory="Vendor Dashboard"
      title="Vendor Intelligence & Procurement Command Center"
      subtitle="All 24 verified suppliers, real-time PO tracking, spend analytics, category breakdown, and quality scorecards"
      icon="🤝"
      badge=""
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => alert('Opening New Vendor Onboarding Form...')} style={{ padding: '6px 14px', borderRadius: '8px', border: '1px solid #3b82f6', background: 'rgba(59,130,246,0.15)', color: '#60a5fa', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
            + Onboard Vendor
          </button>
          <button onClick={() => alert('Opening New Purchase Order Form...')} style={{ padding: '6px 14px', borderRadius: '8px', border: '1px solid #10b981', background: 'rgba(16,185,129,0.15)', color: '#34d399', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
            + Raise PO
          </button>
        </div>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Active Vendors" value="24 Vendors" delta="+3 new this quarter" trend="up" subtext="6 Preferred / 18 Active" icon="🏭" />
        <KpiCard label="Total Procurement Spend" value="₹0" delta="+8.4% YoY" trend="up" subtext="FY 2026 MTD" icon="💸" />
        <KpiCard label="Open Purchase Orders" value="18 POs" delta="₹0 in pipeline" trend="neutral" subtext="8 pending delivery" icon="📑" />
        <KpiCard label="Avg. Vendor On-Time SLA" value="0.0%" delta="+1.2% MoM" trend="up" subtext="Delivery compliance" icon="⏱️" />
        <KpiCard label="Procurement Savings" value="₹0" delta="+18.4% vs target" trend="up" subtext="Negotiation & bulk discounts" icon="💰" />
        <KpiCard label="Vendor Quality Score" value="AA+ Avg." delta="No critical defects" trend="up" subtext="Across all 24 vendors" icon="⭐" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div style={card}>
          <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>📊 Spend by Category</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {categories.map((c, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                  <span style={{ color: 'var(--muted-foreground, #64748b)' }}>{c.label}</span>
                  <span style={{ color: 'var(--foreground, #0f172a)', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace' }}>{c.value}</span>
                </div>
                <div style={{ height: '5px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px' }}>
                  <div style={{ width: `${c.pct}%`, height: '100%', background: c.color, borderRadius: '3px', opacity: 0.8 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={card}>
          <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>📈 Monthly Procurement Trend</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {months.map((m, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                  <span style={{ color: 'var(--muted-foreground, #64748b)' }}>{m.month}</span>
                  <span style={{ color: 'var(--foreground, #0f172a)', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace' }}>{m.spend}</span>
                </div>
                <div style={{ height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px' }}>
                  <div style={{ width: `${m.pct}%`, height: '100%', background: 'linear-gradient(90deg, #3b82f6, #06b6d4)', borderRadius: '3px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={card}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>🏭 Top Vendor Scorecard — FY 2026</h3>
        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'var(--muted, #f8fafc)', borderBottom: '1px solid var(--border, rgba(0,0,0,0.08))' }}>
                {['Rank', 'Vendor Name', 'Category', 'Annual Spend', 'Open POs', 'On-Time SLA', 'Quality', 'Status'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', color: 'var(--muted-foreground, #64748b)', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {topVendors.map((v, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border, rgba(0,0,0,0.06))' }}>
                  <td style={{ padding: '11px 14px', color: '#fbbf24', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>#{v.rank}</td>
                  <td style={{ padding: '11px 14px', fontWeight: 600, color: 'var(--foreground, #0f172a)' }}>{v.name}</td>
                  <td style={{ padding: '11px 14px', color: 'var(--muted-foreground, #64748b)' }}>{v.category}</td>
                  <td style={{ padding: '11px 14px', fontFamily: '"IBM Plex Mono", monospace', color: '#38bdf8', fontWeight: 600 }}>{v.spend}</td>
                  <td style={{ padding: '11px 14px', textAlign: 'center', color: 'var(--foreground, #334155)' }}>{v.pos}</td>
                  <td style={{ padding: '11px 14px', color: Number(v.onTime) > 97 ? '#34d399' : '#fbbf24', fontWeight: 600 }}>{v.onTime}%</td>
                  <td style={{ padding: '11px 14px' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '4px', background: 'rgba(59,130,246,0.12)', color: '#60a5fa', fontSize: '10px', fontWeight: 700 }}>{v.quality}</span>
                  </td>
                  <td style={{ padding: '11px 14px' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, background: v.status === 'Preferred' ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.06)', color: v.status === 'Preferred' ? '#34d399' : '#94a3b8' }}>{v.status}</span>
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

