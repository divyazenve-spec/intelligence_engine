import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function VendorPerformance() {
  const [sortBy, setSortBy] = useState('score');

  const vendors = [];

  const sorted = [...vendors].sort((a, b) => b[sortBy] - a[sortBy]);
  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(255,255,255,0.08))', borderRadius: '12px', padding: '22px 24px' };

  const scoreColor = s => s >= 98 ? '#34d399' : s >= 95 ? '#fbbf24' : '#f87171';

  return (
    <DashboardLayout
      category="Vendors & Procurement"
      subcategory="Vendor Performance"
      title="Vendor Performance Scorecards & SLA Analytics"
      subtitle="On-time delivery SLA, fill rate, defect rate, lead times, and composite vendor performance scores"
      icon="📊"
      badge="Monthly Scorecard"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Avg. On-Time Delivery" value="0.0%" delta="+1.2% MoM" trend="up" subtext="Across all vendors" icon="⏱️" />
        <KpiCard label="Avg. Fill Rate" value="0.0%" delta="+0.8% MoM" trend="up" subtext="Order fulfillment" icon="📦" />
        <KpiCard label="Avg. Defect Rate" value="0.0%" delta="-0.04% MoM" trend="up" subtext="Quality compliance" icon="🎯" />
        <KpiCard label="Avg. Lead Time" value="6.2 Days" delta="-0.5d improvement" trend="up" subtext="Order to receipt" icon="🚛" />
        <KpiCard label="Preferred Vendor SLA" value="0.0%" delta="MSD, Zoetis, BI" trend="up" subtext="Top 3 performers" icon="⭐" />
        <KpiCard label="Vendors Below Target" value="2 Vendors" delta="Below 94% threshold" trend="down" subtext="Improvement notices sent" icon="⚠️" />
      </div>

      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>📊 Vendor Performance Scoreboard</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Composite score = On-Time (35%) + Quality (30%) + Fill Rate (25%) + Compliance (10%)</p>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Sort by:</span>
            {[['score', 'Score'], ['onTime', 'On-Time'], ['quality', 'Quality'], ['fillRate', 'Fill Rate']].map(([k, l]) => (
              <button key={k} onClick={() => setSortBy(k)} style={{ padding: '4px 10px', borderRadius: '6px', border: '1px solid ' + (sortBy === k ? '#3b82f6' : 'rgba(255,255,255,0.1)'), background: sortBy === k ? 'rgba(59,130,246,0.15)' : 'transparent', color: sortBy === k ? '#60a5fa' : '#94a3b8', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>{l}</button>
            ))}
          </div>
        </div>
        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'var(--muted, #f8fafc)', borderBottom: '1px solid var(--border, rgba(0,0,0,0.08))' }}>
                {['Rank', 'Vendor Name', 'On-Time %', 'Quality %', 'Fill Rate %', 'Defect Rate', 'Lead Time', 'Compliance', 'Score', 'Trend'].map(h => (
                  <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: 'var(--muted-foreground, #64748b)', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((v, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border, rgba(0,0,0,0.06))' }}>
                  <td style={{ padding: '11px 12px', color: '#fbbf24', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>#{i + 1}</td>
                  <td style={{ padding: '11px 12px', fontWeight: 600, color: 'var(--foreground, #0f172a)' }}>{v.name}</td>
                  <td style={{ padding: '11px 12px', color: v.onTime >= 97 ? '#34d399' : '#fbbf24', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace' }}>{v.onTime}%</td>
                  <td style={{ padding: '11px 12px', color: v.quality >= 98 ? '#34d399' : '#fbbf24', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace' }}>{v.quality}%</td>
                  <td style={{ padding: '11px 12px', color: v.fillRate >= 98 ? '#34d399' : '#fbbf24', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace' }}>{v.fillRate}%</td>
                  <td style={{ padding: '11px 12px', color: v.defect <= 0.2 ? '#34d399' : '#f87171', fontFamily: '"IBM Plex Mono", monospace' }}>{v.defect}%</td>
                  <td style={{ padding: '11px 12px', color: 'var(--muted-foreground, #64748b)' }}>{v.lead}</td>
                  <td style={{ padding: '11px 12px', color: v.compliance === 100 ? '#34d399' : '#fbbf24', fontFamily: '"IBM Plex Mono", monospace' }}>{v.compliance}%</td>
                  <td style={{ padding: '11px 12px' }}>
                    <span style={{ padding: '3px 10px', borderRadius: '6px', background: scoreColor(v.score) + '22', color: scoreColor(v.score), fontSize: '12px', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{v.score}</span>
                  </td>
                  <td style={{ padding: '11px 12px', fontSize: '14px' }}>{v.trend === 'up' ? '▲' : v.trend === 'down' ? '▼' : '●'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}