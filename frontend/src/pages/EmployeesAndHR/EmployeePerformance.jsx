import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function EmployeePerformance() {
  const [cycle, setCycle] = useState('Q3-2026');
  const [filterRating, setFilterRating] = useState('ALL');

  const performers = [];

  const filtered = performers.filter(p => {
    if (filterRating === 'ALL') return true;
    return p.rating.includes(filterRating);
  });

  return (
    <DashboardLayout
      category="Employees & HR"
      subcategory="Employee Performance"
      title="Performance Governance & Appraisal Scorecards"
      subtitle="Quarterly review cycles, clinical and operational KPI delivery, customer satisfaction indices, and merit ratings"
      icon="⭐"
      badge="Q3 2026 Cycle · 92.4% Completion"
    >
      {/* Top Level KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Average Org KPI Score" value="93.8 / 100" delta="+2.4% vs Q2" trend="up" subtext="Across all 208 staff" icon="🎯" />
        <KpiCard label="Top Tier Performers (5★)" value="34 Staff" delta="16.3% of workforce" trend="up" subtext="Eligible for merit bonus" icon="🌟" />
        <KpiCard label="Customer / Pet CSAT" value="4.86 / 5.0" delta="Top quartile benchmark" trend="up" subtext="Based on 14,800+ ratings" icon="❤️" />
        <KpiCard label="Appraisal Reviews Completed" value="192 / 208" delta="92.3% closed" trend="neutral" subtext="16 reviews pending" icon="📝" />
      </div>

      {/* Cycle Selector & Filter Bar */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '16px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--muted-foreground, #94a3b8)' }}>Appraisal Cycle:</span>
          <div style={{ display: 'flex', gap: '6px' }}>
            {['Q1-2026', 'Q2-2026', 'Q3-2026', 'Annual 2026'].map(c => (
              <button
                key={c}
                onClick={() => setCycle(c)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: '1px solid',
                  borderColor: cycle === c ? '#3b82f6' : 'rgba(255,255,255,0.1)',
                  background: cycle === c ? '#3b82f6' : 'transparent',
                  color: cycle === c ? '#fff' : 'var(--muted-foreground, #94a3b8)'
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Rating Filter:</span>
          <select
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
            style={{
              padding: '6px 10px',
              borderRadius: '6px',
              border: '1px solid rgba(255,255,255,0.12)',
              background: '#0f172a',
              color: '#fff',
              fontSize: '12px'
            }}
          >
            <option value="ALL">All Ratings</option>
            <option value="5★">Exceptional (5★)</option>
            <option value="4★">Exceeds (4★)</option>
            <option value="3★">Meets (3★)</option>
          </select>
        </div>
      </div>

      {/* Performance Scorecards Table */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        overflow: 'hidden'
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Employee Appraisal Scorecards ({filtered.length})</h3>
          <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>Active Cycle: {cycle}</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)', color: 'var(--muted-foreground, #94a3b8)' }}>
                <th style={{ padding: '12px 16px' }}>Employee</th>
                <th style={{ padding: '12px 16px' }}>Department</th>
                <th style={{ padding: '12px 16px' }}>KPI Score</th>
                <th style={{ padding: '12px 16px' }}>Rating Tier</th>
                <th style={{ padding: '12px 16px' }}>Output / Workload</th>
                <th style={{ padding: '12px 16px' }}>CSAT Rating</th>
                <th style={{ padding: '12px 16px' }}>SLA Adherence</th>
                <th style={{ padding: '12px 16px' }}>Appraisal Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.name} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ fontWeight: 600, color: '#f8fafc' }}>{p.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)' }}>{p.role}</div>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ padding: '2px 6px', borderRadius: '4px', background: 'rgba(255,255,255,0.06)', fontSize: '11px', color: '#cbd5e1' }}>
                      {p.dept}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace', color: p.score >= 95 ? '#10b981' : p.score >= 90 ? '#38bdf8' : '#f59e0b' }}>
                        {p.score}%
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: p.rating.includes('5★') ? 'rgba(16,185,129,0.15)' : p.rating.includes('4★') ? 'rgba(56,189,248,0.15)' : 'rgba(245,158,11,0.15)',
                      color: p.rating.includes('5★') ? '#34d399' : p.rating.includes('4★') ? '#38bdf8' : '#f59e0b'
                    }}>
                      {p.rating}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', color: '#e2e8f0' }}>{p.consultations}</td>
                  <td style={{ padding: '12px 16px', color: '#fcd34d', fontWeight: 600 }}>⭐ {p.csat}</td>
                  <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', color: '#34d399' }}>{p.sla}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '99px',
                      fontSize: '10px',
                      fontWeight: 700,
                      background: p.status === 'Appraised' ? 'rgba(16,185,129,0.15)' : 'rgba(234,179,8,0.15)',
                      color: p.status === 'Appraised' ? '#10b981' : '#eab308'
                    }}>
                      {p.status}
                    </span>
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
