import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function SalaryCost() {
  const [viewBy, setViewBy] = useState('department');

  const deptCosts = [
    { dept: 'Veterinary Clinical Services', headcount: 48, monthlyCTC: '₹42,00,000', annualCTC: '₹5,04,00,000', pctShare: 25.6, color: '#10b981' },
    { dept: 'Technology & AI Engineering', headcount: 24, monthlyCTC: '₹38,00,000', annualCTC: '₹4,56,00,000', pctShare: 23.2, color: '#ec4899' },
    { dept: 'Logistics & 60-Min Delivery', headcount: 54, monthlyCTC: '₹28,80,000', annualCTC: '₹3,45,60,000', pctShare: 17.5, color: '#f59e0b' },
    { dept: 'Pharmacy & Drug Dispensing', headcount: 32, monthlyCTC: '₹22,50,000', annualCTC: '₹2,70,000,000', pctShare: 13.7, color: '#0ea5e9' },
    { dept: 'Warehouse & Fulfillment', headcount: 28, monthlyCTC: '₹18,40,000', annualCTC: '₹2,20,80,000', pctShare: 11.2, color: '#8b5cf6' },
    { dept: 'Customer Delight & Support', headcount: 22, monthlyCTC: '₹14,20,000', annualCTC: '₹1,70,40,000', pctShare: 8.8, color: '#14b8a6' }
  ];

  const salaryBands = [
    { band: 'Band E1 (Leadership / CMO / VP)', range: '₹25L – ₹45L CTC', count: 6, totalSpend: '₹2,10,00,000 / yr' },
    { band: 'Band E2 (Senior Surgeons & Staff Eng)', range: '₹18L – ₹25L CTC', count: 18, totalSpend: '₹3,96,00,000 / yr' },
    { band: 'Band M1 (Mid-Level Specialists & Leads)', range: '₹10L – ₹18L CTC', count: 42, totalSpend: '₹5,88,00,000 / yr' },
    { band: 'Band S1 (Pharmacists & Ops Associates)', range: '₹5L – ₹10L CTC', count: 68, totalSpend: '₹5,10,00,000 / yr' },
    { band: 'Band F1 (Riders & Ground Delivery Riders)', range: '₹3.5L – ₹5L CTC', count: 74, totalSpend: '₹2,62,80,000 / yr' }
  ];

  return (
    <DashboardLayout
      category="Employees & HR"
      subcategory="Salary Cost"
      title="Workforce CTC & Departmental Compensation Analytics"
      subtitle="Executive Cost-to-Company (CTC) breakdown, salary band stratification, employer statutory liabilities, and annual payroll forecast"
      icon="💰"
      badge="₹19.66 Cr Annualized CTC · 208 Headcount"
    >
      {/* Top Level KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Monthly Total CTC Burn" value="₹1.64 Cr / mo" delta="98% within plan" trend="neutral" subtext="Direct compensation & benefits" icon="💵" />
        <KpiCard label="Annualized Payroll Commitment" value="₹19.66 Cr" delta="+12.4% vs FY25" trend="up" subtext="Projected for full financial year" icon="📊" />
        <KpiCard label="Average CTC per Employee" value="₹9,45,000" delta="Median: ₹7,80,000" trend="neutral" subtext="Blended clinical, tech & fleet" icon="🏷️" />
        <KpiCard label="Employer Statutory Match" value="₹19.72 L / mo" delta="PF 12% + Insurance" trend="neutral" subtext="Fully provisioned on balance sheet" icon="🏛️" />
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
                {deptCosts.map(d => (
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
