import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function Recruitment() {
  const [stageFilter, setStageFilter] = useState('ALL');

  const jobs = [];

  return (
    <DashboardLayout
      category="Employees & HR"
      subcategory="Recruitment"
      title="Talent Acquisition & Pipeline Governance"
      subtitle="Open requisitions, applicant funnel progression, interview scheduling, offer letters, and time-to-hire telemetry"
      icon="📢"
      badge=""
    >
      {/* Top Level KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Open Requisitions" value="24 Vacancies" delta="Across 6 roles" trend="neutral" subtext="Clinical, logistics & tech" icon="📢" />
        <KpiCard label="Active Applicants Funnel" value="420 Resumes" delta="+64 this week" trend="up" subtext="LinkedIn, IIM/VCI job boards" icon="📥" />
        <KpiCard label="Interviews in Flight" value="44 Candidates" delta="Technical & cultural" trend="neutral" subtext="Scheduled this fortnight" icon="🎙️" />
        <KpiCard label="Average Time to Hire" value="18.4 Days" delta="-3.2 days faster" trend="up" subtext="Industry average: 32 days" icon="⚡" />
      </div>

      {/* Requisitions Pipeline Table */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        overflow: 'hidden'
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Active Job Openings &amp; Sourcing Pacing</h3>
            <p style={{ margin: '4px 0 0', fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)' }}>Candidate progression across hiring stages</p>
          </div>
          <button
            onClick={() => alert('New Job Requisition workflow initiated.')}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              border: 'none',
              background: '#3b82f6',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>➕</span> Post New Requisition
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)', color: 'var(--muted-foreground, #94a3b8)' }}>
                <th style={{ padding: '12px 16px' }}>Requisition &amp; Role</th>
                <th style={{ padding: '12px 16px' }}>Department</th>
                <th style={{ padding: '12px 16px' }}>Location</th>
                <th style={{ padding: '12px 16px' }}>Vacancies</th>
                <th style={{ padding: '12px 16px' }}>Applicants</th>
                <th style={{ padding: '12px 16px' }}>Screened</th>
                <th style={{ padding: '12px 16px' }}>Interviews</th>
                <th style={{ padding: '12px 16px' }}>Offers</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Priority</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map(j => (
                <tr key={j.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ fontWeight: 600, color: '#f8fafc' }}>{j.title}</div>
                    <div style={{ fontSize: '11px', fontFamily: '"IBM Plex Mono", monospace', color: 'var(--muted-foreground, #94a3b8)' }}>{j.id} · Lead: {j.recruiter}</div>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ padding: '3px 8px', borderRadius: '6px', fontSize: '11px', background: 'rgba(255,255,255,0.06)', color: '#cbd5e1' }}>
                      {j.dept}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', color: '#cbd5e1' }}>{j.location}</td>
                  <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 600, color: '#f8fafc' }}>{j.openings}</td>
                  <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', color: '#38bdf8' }}>{j.applicants}</td>
                  <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', color: '#cbd5e1' }}>{j.screened}</td>
                  <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', color: '#f59e0b' }}>{j.interview}</td>
                  <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#34d399' }}>{j.offer}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '99px',
                      fontSize: '10px',
                      fontWeight: 700,
                      background: j.priority === 'Urgent' ? 'rgba(239,68,68,0.15)' : j.priority === 'High' ? 'rgba(245,158,11,0.15)' : 'rgba(59,130,246,0.15)',
                      color: j.priority === 'Urgent' ? '#ef4444' : j.priority === 'High' ? '#f59e0b' : '#60a5fa'
                    }}>
                      ● {j.priority}
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
