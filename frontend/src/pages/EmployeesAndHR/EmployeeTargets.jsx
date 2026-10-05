import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function EmployeeTargets() {
  const [filterPeriod, setFilterPeriod] = useState('October 2026');

  const targets = [
    { name: 'Dr. Priya Sharma', role: 'Chief Vet Officer', metric: 'Consultation Revenue', target: '₹8,00,000', achieved: '₹8,40,000', pct: 105.0, status: 'Surplus (+5%)', tier: 'Diamond 💎' },
    { name: 'Dr. Rahul Mehta', role: 'Senior Vet Surgeon', metric: 'Surgical Procedures', target: '₹6,50,000', achieved: '₹6,80,000', pct: 104.6, status: 'Surplus (+4.6%)', tier: 'Diamond 💎' },
    { name: 'Rohan Deshmukh', role: 'Head Pharmacist', metric: 'Prescription Dispensing', target: '1,300 Rx', achieved: '1,420 Rx', pct: 109.2, status: 'Surplus (+9.2%)', tier: 'Platinum 🏆' },
    { name: 'Manish Rawat', role: 'Express Rider', metric: 'On-Time Deliveries', target: '550 Orders', achieved: '612 Orders', pct: 111.3, status: 'Surplus (+11.3%)', tier: 'Platinum 🏆' },
    { name: 'Sneha Chawla', role: 'Senior AI Engineer', metric: 'Sprint Velocity & Models', target: '20 Tasks', achieved: '24 Tasks', pct: 120.0, status: 'Surplus (+20%)', tier: 'Diamond 💎' },
    { name: 'Pooja Hegde', role: 'Support Team Lead', metric: 'Tickets SLA & Resolution', target: '800 Solved', achieved: '792 Solved', pct: 99.0, status: 'On Track (99%)', tier: 'Gold 🥇' },
    { name: 'Ananya Verma', role: 'Warehouse Ops Manager', metric: 'Outbound Dispatch SLA', target: '98.0%', achieved: '96.8%', pct: 98.7, status: 'On Track (98.7%)', tier: 'Gold 🥇' },
    { name: 'Kunal Sen', role: 'Inventory Controller', metric: 'Stock Reconciliation Audit', target: '100% SKU audit', achieved: '94.2%', pct: 94.2, status: 'Gap (-5.8%)', tier: 'Silver 🥈' }
  ];

  return (
    <DashboardLayout
      category="Employees & HR"
      subcategory="Employee Targets"
      title="Quota Attainment & Target Leaderboard"
      subtitle="Monthly & quarterly revenue quotas, clinical case targets, operational delivery SLAs, and incentive tiers"
      icon="🎯"
      badge={`${filterPeriod} · 106.8% Org Attainment`}
    >
      {/* Top Level KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Blended Quota Attainment" value="106.8%" delta="+6.8% over plan" trend="up" subtext="Across all quota-bearing roles" icon="🏆" />
        <KpiCard label="Team Members Surpassing Target" value="142 Staff" delta="68.2% of cohort" trend="up" subtext="Eligible for tier incentives" icon="🚀" />
        <KpiCard label="Incentive Pool Allocated" value="₹18,40,000" delta="Fully funded" trend="neutral" subtext="To be disbursed with payroll" icon="💰" />
        <KpiCard label="Quota Deficit Cases" value="8 Personnel" delta="Coaching plan initiated" trend="down" subtext="Under 90% attainment" icon="⚠️" />
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
        <span style={{ fontSize: '11px', color: '#34d399', fontWeight: 600 }}>● Live Quota Tracking Synced</span>
      </div>

      {/* Targets Table */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        overflow: 'hidden'
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Target Attainment Leaderboard ({targets.length})</h3>
          <span style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)' }}>Individual goal achievements</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)', color: 'var(--muted-foreground, #94a3b8)' }}>
                <th style={{ padding: '12px 16px' }}>Team Member</th>
                <th style={{ padding: '12px 16px' }}>Target Metric</th>
                <th style={{ padding: '12px 16px' }}>Set Quota</th>
                <th style={{ padding: '12px 16px' }}>Achieved</th>
                <th style={{ padding: '12px 16px', width: '180px' }}>Attainment %</th>
                <th style={{ padding: '12px 16px' }}>Status</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Incentive Tier</th>
              </tr>
            </thead>
            <tbody>
              {targets.map(t => {
                const isOver = t.pct >= 100;
                return (
                  <tr key={t.name} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ fontWeight: 600, color: '#f8fafc' }}>{t.name}</div>
                      <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)' }}>{t.role}</div>
                    </td>
                    <td style={{ padding: '12px 16px', color: '#cbd5e1' }}>{t.metric}</td>
                    <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', color: 'var(--muted-foreground, #94a3b8)' }}>{t.target}</td>
                    <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 600, color: '#f8fafc' }}>{t.achieved}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '99px', overflow: 'hidden' }}>
                          <div style={{ width: `${Math.min(100, t.pct)}%`, height: '100%', background: isOver ? '#10b981' : '#f59e0b', borderRadius: '99px' }}></div>
                        </div>
                        <span style={{ fontSize: '11px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: isOver ? '#10b981' : '#f59e0b' }}>
                          {t.pct}%
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{
                        padding: '3px 8px',
                        borderRadius: '99px',
                        fontSize: '10px',
                        fontWeight: 700,
                        background: isOver ? 'rgba(16,185,129,0.15)' : 'rgba(245,158,11,0.15)',
                        color: isOver ? '#10b981' : '#f59e0b'
                      }}>
                        {t.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 600, color: '#93c5fd' }}>
                      {t.tier}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
