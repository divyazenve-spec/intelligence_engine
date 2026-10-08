import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function SalaryCost() {
  const [viewBy, setViewBy] = useState('department');

  const deptCosts = [];

  const salaryBands = [];

  return (
    <DashboardLayout
      category="Employees & HR"
      subcategory="Salary Cost"
      title="Workforce CTC & Departmental Compensation Analytics"
      subtitle="Executive Cost-to-Company (CTC) breakdown, salary band stratification, employer statutory liabilities, and annual payroll forecast"
      icon="💰"
      badge=""
    >
      {/* Top Level KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Monthly Total CTC Burn" value="₹0 / mo" delta="0.0%" trend="neutral" subtext="Direct compensation & benefits" icon="💵" />
        <KpiCard label="Annualized Payroll Commitment" value="₹0" delta="0.0%" trend="neutral" subtext="Projected for full financial year" icon="📊" />
        <KpiCard label="Average CTC per Employee" value="₹0" delta="Median: ₹0" trend="neutral" subtext="Blended clinical, tech & fleet" icon="🏷️" />
        <KpiCard label="Employer Statutory Match" value="₹0 / mo" delta="--" trend="neutral" subtext="Fully provisioned on balance sheet" icon="🏛️" />
      </div>

      {/* View Switcher */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setViewBy('department')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              border: '1px solid',
              borderColor: viewBy === 'department' ? '#3b82f6' : 'rgba(255,255,255,0.1)',
              background: viewBy === 'department' ? '#3b82f6' : 'transparent',
              color: viewBy === 'department' ? '#fff' : 'var(--muted-foreground, #94a3b8)'
            }}
          >
            🏢 Breakdown by Department
          </button>
          <button
            onClick={() => setViewBy('band')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              border: '1px solid',
              borderColor: viewBy === 'band' ? '#3b82f6' : 'rgba(255,255,255,0.1)',
              background: viewBy === 'band' ? '#3b82f6' : 'transparent',
              color: viewBy === 'band' ? '#fff' : 'var(--muted-foreground, #94a3b8)'
            }}
          >
            📊 Breakdown by Salary Band
          </button>
        </div>
        <span style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)' }}>Audited for FY 2026-2027</span>
      </div>

      {/* Department Breakdown Table */}
      {viewBy === 'department' ? (
        <div style={{
          background: 'var(--card, #1e293b)',
          border: '1px solid var(--border, rgba(255,255,255,0.08))',
          borderRadius: '12px',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Departmental CTC Distribution</h3>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)', color: 'var(--muted-foreground, #94a3b8)' }}>
                  <th style={{ padding: '12px 16px' }}>Department</th>
                  <th style={{ padding: '12px 16px' }}>Headcount</th>
                  <th style={{ padding: '12px 16px' }}>Monthly CTC</th>
                  <th style={{ padding: '12px 16px' }}>Annual Commitment</th>
                  <th style={{ padding: '12px 16px' }}>Share of Budget</th>
                </tr>
              </thead>
              <tbody>
                {deptCosts.length === 0 ? (<tr><td colSpan="8" style={{ textAlign: "center", padding: "32px", color: "var(--muted-foreground, #64748b)" }}>No department cost records found</td></tr>) : deptCosts.map(d => (
                  <tr key={d.dept} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: d.color }}>{d.dept}</td>
                    <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace' }}>{d.headcount} staff</td>
                    <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 600, color: '#f8fafc' }}>{d.monthlyCTC}</td>
                    <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', color: '#38bdf8' }}>{d.annualCTC}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '100px', height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '99px', overflow: 'hidden' }}>
                          <div style={{ width: `${d.pctShare}%`, height: '100%', background: d.color, borderRadius: '99px' }}></div>
                        </div>
                        <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: d.color }}>{d.pctShare}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div style={{
          background: 'var(--card, #1e293b)',
          border: '1px solid var(--border, rgba(255,255,255,0.08))',
          borderRadius: '12px',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Compensation Band Stratification</h3>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)', color: 'var(--muted-foreground, #94a3b8)' }}>
                  <th style={{ padding: '12px 16px' }}>Salary Band</th>
                  <th style={{ padding: '12px 16px' }}>CTC Range</th>
                  <th style={{ padding: '12px 16px' }}>Staff Count</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right' }}>Total Annual Spend</th>
                </tr>
              </thead>
              <tbody>
                {salaryBands.map(b => (
                  <tr key={b.band} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: '#f8fafc' }}>{b.band}</td>
                    <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', color: '#93c5fd' }}>{b.range}</td>
                    <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace' }}>{b.count} Employees</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#34d399' }}>{b.totalSpend}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
