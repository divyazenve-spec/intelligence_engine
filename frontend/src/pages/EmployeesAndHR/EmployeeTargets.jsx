import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function EmployeeTargets() {
  const [filterPeriod, setFilterPeriod] = useState('October 2026');

  const targets = [];

  return (
    <DashboardLayout
      category="Employees & HR"
      subcategory="Employee Targets"
      title="Quota Attainment & Target Leaderboard"
      subtitle="Monthly & quarterly revenue quotas, clinical case targets, operational delivery SLAs, and incentive tiers"
      icon="🎯"
      badge=""
    >
      {/* Top Level KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Blended Quota Attainment" value="0.0%" delta="--" trend="neutral" subtext="No quota records" icon="🏆" />
        <KpiCard label="Team Members Surpassing Target" value="0 Staff" delta="--" trend="neutral" subtext="0 staff recorded" icon="🚀" />
        <KpiCard label="Incentive Pool Allocated" value="₹0" delta="--" trend="neutral" subtext="No incentive pool" icon="💰" />
        <KpiCard label="Quota Deficit Cases" value="0 Personnel" delta="--" trend="neutral" subtext="0 deficit cases" icon="⚠️" />
      </div>

      {/* Period Selection */}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)', fontWeight: 600 }}>Active Period:</span>
          {['August 2026', 'September 2026', 'October 2026', 'Q4 2026 Target'].map(p => (
            <button
              key={p}
              onClick={() => setFilterPeriod(p)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer',
                border: '1px solid',
                borderColor: filterPeriod === p ? '#3b82f6' : 'rgba(255,255,255,0.1)',
                background: filterPeriod === p ? '#3b82f6' : 'transparent',
                color: filterPeriod === p ? '#fff' : 'var(--muted-foreground, #94a3b8)'
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Table Section */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        overflow: 'hidden',
        marginTop: '16px'
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Quota Delivery Matrix</h3>
          <p style={{ margin: '2px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Individual staff quota targets and achievement breakdown</p>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.2)', color: 'var(--muted-foreground, #94a3b8)', fontSize: '11px', textTransform: 'uppercase' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Team Member</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Target Metric</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Set Quota</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Achieved</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', width: '180px' }}>Attainment %</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Status</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Incentive Tier</th>
              </tr>
            </thead>
            <tbody>
              {targets.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '24px', color: 'var(--muted-foreground, #94a3b8)' }}>
                    No quota records found
                  </td>
                </tr>
              ) : (
                targets.map(t => (
                  <tr key={t.name}>
                    <td>{t.name}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
