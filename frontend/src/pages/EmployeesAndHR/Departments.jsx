import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function Departments() {
  const [selectedDept, setSelectedDept] = useState(null);

  const departments = [];

  return (
    <DashboardLayout
      category="Employees & HR"
      subcategory="Departments"
      title="Departmental Hierarchy & Resource Stratification"
      subtitle="Organizational divisions, departmental leadership, monthly payroll commitments, and headcount capacity"
      icon="🏢"
      badge=""
    >
      {/* Top Level KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Operating Units" value="6 Core Divisions" delta="Full org coverage" trend="neutral" subtext="Clinical, logistics & tech" icon="🏛️" />
        <KpiCard label="Total Monthly Budget" value="₹0 / mo" delta="98.2% utilization" trend="neutral" subtext="Direct payroll & incentives" icon="💳" />
        <KpiCard label="Open Requisitions" value="25 Positions" delta="Active hiring pipeline" trend="up" subtext="Across all 6 departments" icon="📢" />
        <KpiCard label="Average Org Health" value="94.7 / 100" delta="+1.8 pts QoQ" trend="up" subtext="Blended satisfaction & SLA" icon="⭐" />
      </div>

      {/* Department Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '16px' }}>
        {departments.map(dept => (
          <div
            key={dept.id}
            style={{
              background: 'var(--card, #1e293b)',
              border: '1px solid var(--border, rgba(255,255,255,0.08))',
              borderRadius: '14px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'transform 0.15s ease, border-color 0.15s ease'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div>
                  <span style={{ fontSize: '11px', fontFamily: '"IBM Plex Mono", monospace', color: dept.color, fontWeight: 700 }}>{dept.id}</span>
                  <h3 style={{ margin: '4px 0 0', fontSize: '16px', fontWeight: 700, color: '#f8fafc' }}>{dept.name}</h3>
                </div>
                <span style={{
                  padding: '3px 8px',
                  borderRadius: '99px',
                  fontSize: '11px',
                  fontWeight: 700,
                  background: `${dept.color}22`,
                  color: dept.color
                }}>
                  {dept.headcount} Staff
                </span>
              </div>

              <p style={{ fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)', lineHeight: '1.5', margin: '0 0 16px' }}>
                {dept.description}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '10px', fontSize: '12px', marginBottom: '16px' }}>
                <div>
                  <div style={{ color: 'var(--muted-foreground, #94a3b8)', fontSize: '11px' }}>Department Head</div>
                  <div style={{ fontWeight: 600, color: '#e2e8f0', marginTop: '2px' }}>{dept.lead}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--muted-foreground, #94a3b8)', fontSize: '11px' }}>Monthly Payroll</div>
                  <div style={{ fontWeight: 600, color: '#34d399', marginTop: '2px', fontFamily: '"IBM Plex Mono", monospace' }}>{dept.budget}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--muted-foreground, #94a3b8)', fontSize: '11px' }}>Open Positions</div>
                  <div style={{ fontWeight: 600, color: '#f59e0b', marginTop: '2px' }}>{dept.openings} roles vacant</div>
                </div>
                <div>
                  <div style={{ color: 'var(--muted-foreground, #94a3b8)', fontSize: '11px' }}>KPI Health Index</div>
                  <div style={{ fontWeight: 600, color: dept.color, marginTop: '2px' }}>{dept.kpiHealth}% Score</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <span style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)' }}>Retention: <strong style={{ color: '#fff' }}>{dept.retention}</strong></span>
              <button
                onClick={() => setSelectedDept(dept)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: 600,
                  border: '1px solid rgba(255,255,255,0.15)',
                  background: 'transparent',
                  color: '#93c5fd',
                  cursor: 'pointer'
                }}
              >
                Department 360° →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Department Detail Modal */}
      {selectedDept && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999
        }}>
          <div style={{
            background: '#1e293b',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '14px',
            padding: '24px',
            maxWidth: '550px',
            width: '90%',
            color: '#fff'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '18px' }}>🏢 {selectedDept.name} Overview</h3>
              <button onClick={() => setSelectedDept(null)} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '18px', cursor: 'pointer' }}>✕</button>
            </div>
            <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: '1.6', marginBottom: '16px' }}>{selectedDept.description}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', fontSize: '13px' }}>
              <div><strong style={{ color: '#94a3b8' }}>Designated Lead:</strong> <div>{selectedDept.lead}</div></div>
              <div><strong style={{ color: '#94a3b8' }}>Total Headcount:</strong> <div>{selectedDept.headcount} active personnel</div></div>
              <div><strong style={{ color: '#94a3b8' }}>Monthly Payroll:</strong> <div style={{ color: '#34d399', fontWeight: 600 }}>{selectedDept.budget}</div></div>
              <div><strong style={{ color: '#94a3b8' }}>Average Salary:</strong> <div>{selectedDept.avgSalary}</div></div>
              <div><strong style={{ color: '#94a3b8' }}>Retention Rate:</strong> <div>{selectedDept.retention}</div></div>
              <div><strong style={{ color: '#94a3b8' }}>Active Vacancies:</strong> <div style={{ color: '#f59e0b' }}>{selectedDept.openings} roles hiring</div></div>
            </div>
            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setSelectedDept(null)} style={{ padding: '8px 16px', borderRadius: '8px', background: '#3b82f6', border: 'none', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>Close View</button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
