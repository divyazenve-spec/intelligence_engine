import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function EmployeeProductivity() {
  const [filterDept, setFilterDept] = useState('ALL');

  const teams = [];

  return (
    <DashboardLayout
      category="Employees & HR"
      subcategory="Employee Productivity"
      title="Productivity Telemetry & Operational Velocity"
      subtitle="Active hours utilization, unit handling throughput, clinical consult velocity, and idle capacity tracking"
      icon="⚡"
      badge=""
    >
      {/* Top Level KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Average Active Shift Time" value="0" delta="0.0%" trend="neutral" subtext="Excluding designated breaks" icon="⏱️" />
        <KpiCard label="Overall Efficiency Index" value="0.0%" delta="0.0%" trend="neutral" subtext="Output per scheduled hour" icon="📈" />
        <KpiCard label="Network Throughput" value="0" delta="--" trend="neutral" subtext="Cross-functional total" icon="📦" />
        <KpiCard label="Idle / Down Capacity" value="0.0%" delta="0.0%" trend="neutral" subtext="Lowest quarterly baseline" icon="📉" />
      </div>

      {/* Productivity by Functional Unit Table */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        overflow: 'hidden'
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Team Productivity &amp; Throughput Benchmark</h3>
            <p style={{ margin: '4px 0 0', fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)' }}>Measured continuously across IoT biometrics, POS scanners, and rider telemetry</p>
          </div>
          <span style={{ fontSize: '10px', padding: '3px 8px', borderRadius: '99px', background: 'rgba(16,185,129,0.15)', color: '#10b981', fontWeight: 700 }}>Live Telemetry</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)', color: 'var(--muted-foreground, #94a3b8)' }}>
                <th style={{ padding: '12px 16px' }}>Operational Unit</th>
                <th style={{ padding: '12px 16px' }}>Active Hours / Shift</th>
                <th style={{ padding: '12px 16px' }}>Daily Unit Output</th>
                <th style={{ padding: '12px 16px' }}>Avg Turnaround Time</th>
                <th style={{ padding: '12px 16px' }}>Idle Capacity</th>
                <th style={{ padding: '12px 16px' }}>Efficiency Score</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Operating Status</th>
              </tr>
            </thead>
            <tbody>
              {teams.map(t => (
                <tr key={t.team} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#f8fafc' }}>{t.team}</td>
                  <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', color: '#cbd5e1' }}>{t.activeHours}</td>
                  <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', color: '#38bdf8' }}>{t.tasksDone}</td>
                  <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', color: 'var(--muted-foreground, #94a3b8)' }}>{t.turnaround}</td>
                  <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', color: '#f59e0b' }}>{t.idlePct}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '80px', height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '99px', overflow: 'hidden' }}>
                        <div style={{ width: t.efficiency, height: '100%', background: '#10b981', borderRadius: '99px' }}></div>
                      </div>
                      <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#10b981' }}>{t.efficiency}</span>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '99px',
                      fontSize: '10px',
                      fontWeight: 700,
                      background: 'rgba(16,185,129,0.15)',
                      color: '#10b981'
                    }}>
                      ● {t.status}
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
