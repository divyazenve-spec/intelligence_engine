import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function TargetsAndAchievement() {
  const [targetAdjust, setTargetAdjust] = useState(0); // 0 = baseline, 10 = +10%, 20 = +20%, -10 = -10%
  const [selectedDept, setSelectedDept] = useState('all');

  const basePeriodTarget = 5000000;
  const targetMultiplier = 1 + targetAdjust / 100;
  const adjustedTarget = Math.round(basePeriodTarget * targetMultiplier);
  const realizedRevenue = 5050000;
  const attainment = ((realizedRevenue / adjustedTarget) * 100);
  const calendarElapsedPct = 73.3; // 22 of 30 days
  const pacingDiff = attainment - calendarElapsedPct;
  const projectedFinish = Math.round(realizedRevenue / (calendarElapsedPct / 100));
  const surplusDeficit = realizedRevenue - adjustedTarget;

  // Department targets
  const departments = [
    { id: 'clin-ops', name: 'Clinical Operations', lead: 'Dr. Priya Sharma', weight: 0.28, achieved: 1520000, icon: '🩺', color: '#0ea5e9' },
    { id: 'pat-serv', name: 'Patient Services', lead: 'Rajesh Verma', weight: 0.20, achieved: 980000, icon: '👥', color: '#10b981' },
    { id: 'out-care', name: 'Outpatient Care', lead: 'Ananya Deshmukh', weight: 0.18, achieved: 890000, icon: '🏥', color: '#8b5cf6' },
    { id: 'diag-lab', name: 'Diagnostics & Lab', lead: 'Vikram Mehta', weight: 0.14, achieved: 640000, icon: '🔬', color: '#f59e0b' },
    { id: 'pharm-well', name: 'Pharmacy & Wellness', lead: 'Sneha Patel', weight: 0.12, achieved: 680000, icon: '💊', color: '#ec4899' },
    { id: 'tele-dig', name: 'Telehealth & Digital', lead: 'Arjun Nair', weight: 0.08, achieved: 340000, icon: '📱', color: '#06b6d4' }
  ].map(dept => {
    const deptTarget = Math.round(adjustedTarget * dept.weight);
    const deptAttain = (dept.achieved / deptTarget) * 100;
    const deptVariance = dept.achieved - deptTarget;
    let status = 'On Track';
    let statusColor = '#0ea5e9';
    if (deptAttain >= 100) {
      status = '★ Exceeded';
      statusColor = '#10b981';
    } else if (deptAttain < 88) {
      status = 'Needs Focus';
      statusColor = '#f59e0b';
    }
    return { ...dept, target: deptTarget, attain: deptAttain, variance: deptVariance, status, statusColor };
  });

  const filteredDepts = selectedDept === 'all' ? departments : departments.filter(d => d.id === selectedDept);

  // Individual reps & coordinators
  const reps = [
    { rank: '01', medal: '🥇', name: 'Kavita Menon', role: 'Sr. Clinical Coordinator', dept: 'Clinical Operations', target: 800000, achieved: 940000, bonus: 'Tier 1 (+₹25K)' },
    { rank: '02', medal: '🥈', name: 'Rohan Deshmukh', role: 'Wellness Account Lead', dept: 'Pharmacy & Wellness', target: 600000, achieved: 680000, bonus: 'Tier 1 (+₹20K)' },
    { rank: '03', medal: '🥉', name: 'Sneha Rao', role: 'Patient Care Specialist', dept: 'Patient Services', target: 550000, achieved: 590000, bonus: 'Tier 2 (+₹15K)' },
    { rank: '04', medal: '04', name: 'Aditya Birla', role: 'Surgical Consult Planner', dept: 'Outpatient Care', target: 500000, achieved: 495000, bonus: 'Eligible' },
    { rank: '05', medal: '05', name: 'Vikram Joshi', role: 'Lab Diagnostics Partner', dept: 'Diagnostics & Lab', target: 450000, achieved: 410000, bonus: 'Pacing 91%' },
    { rank: '06', medal: '06', name: 'Meera Nair', role: 'Telehealth Coordinator', dept: 'Telehealth & Digital', target: 350000, achieved: 295000, bonus: 'In Review' }
  ];

  // Doctors Quotas
  const doctors = [
    { name: 'Dr. Priya Sharma', spec: 'Senior Canine Surgeon', consultTarget: 120, consultActual: 134, revTarget: 1100000, revActual: 1220000 },
    { name: 'Dr. Sameer Joshi', spec: 'Avian & Exotic Specialist', consultTarget: 95, consultActual: 102, revTarget: 850000, revActual: 890000 },
    { name: 'Dr. Anita Roy', spec: 'Feline Internal Medicine', consultTarget: 110, consultActual: 108, revTarget: 950000, revActual: 940000 },
    { name: 'Dr. Rajesh Rao', spec: 'Orthopedic Consultant', consultTarget: 80, consultActual: 86, revTarget: 780000, revActual: 840000 }
  ];

  // Circular gauge calculations
  const rad = 65;
  const circ = 2 * Math.PI * rad;
  const cappedAttain = Math.min(100, Math.max(0, attainment));
  const arcOffset = circ - (cappedAttain / 100) * circ;
  const dialColor = attainment >= 100 ? '#10b981' : attainment >= 90 ? '#0ea5e9' : '#f59e0b';

  return (
    <DashboardLayout
      category="Revenue & Sales"
      subcategory="Targets & Achievement"
      title="Sales Targets & Quota Realization"
      subtitle="Executive pacing command center, calendar elapsed pacing, and departmental quota attainment"
      icon="🎯"
      badge={attainment >= 100 ? 'Quota Met' : 'Pacing On-Track'}
      actions={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)', fontWeight: 600 }}>Scenario:</span>
          <button
            onClick={() => setTargetAdjust(0)}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid var(--border, rgba(255,255,255,0.1))',
              background: targetAdjust === 0 ? 'var(--primary, #3b82f6)' : 'var(--card, #1e293b)',
              color: '#fff',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >Baseline Goal</button>
          <button
            onClick={() => setTargetAdjust(10)}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid var(--border, rgba(255,255,255,0.1))',
              background: targetAdjust === 10 ? 'var(--primary, #3b82f6)' : 'var(--card, #1e293b)',
              color: '#fff',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >+10% Stretch</button>
          <button
            onClick={() => setTargetAdjust(20)}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid var(--border, rgba(255,255,255,0.1))',
              background: targetAdjust === 20 ? 'var(--primary, #3b82f6)' : 'var(--card, #1e293b)',
              color: '#fff',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >+20% High Growth</button>
          <button
            onClick={() => setTargetAdjust(-10)}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid var(--border, rgba(255,255,255,0.1))',
              background: targetAdjust === -10 ? 'var(--primary, #3b82f6)' : 'var(--card, #1e293b)',
              color: '#fff',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >-10% Conservative</button>
        </div>
      }
    >
      {/* Quota KPI Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '14px'
      }}>
        <KpiCard
          label="Active Target Quota"
          value={`₹${(adjustedTarget / 100000).toFixed(2)}L`}
          delta={targetAdjust === 0 ? 'Baseline (30d)' : `${targetAdjust > 0 ? '+' : ''}${targetAdjust}% Adjusted`}
          trend="neutral"
          subtext="Configured milestone"
          icon="🎯"
        />
        <KpiCard
          label="Realized Revenue"
          value={`₹${(realizedRevenue / 100000).toFixed(2)}L`}
          delta={`${attainment.toFixed(1)}% Attained`}
          trend={attainment >= 100 ? 'up' : 'neutral'}
          subtext="Confirmed billings"
          icon="🏆"
        />
        <KpiCard
          label="Pacing vs Calendar"
          value={`${pacingDiff >= 0 ? '+' : ''}${pacingDiff.toFixed(1)}%`}
          delta="Day 22 / 30"
          trend={pacingDiff >= 0 ? 'up' : 'down'}
          subtext={pacingDiff >= 0 ? 'Ahead of calendar' : 'Behind calendar'}
          icon="⚡"
        />
        <KpiCard
          label="Projected Finish"
          value={`₹${(projectedFinish / 100000).toFixed(2)}L`}
          delta={`${((projectedFinish / adjustedTarget) * 100).toFixed(1)}% of Goal`}
          trend={projectedFinish >= adjustedTarget ? 'up' : 'down'}
          subtext="Run-rate projection"
          icon="🚀"
        />
        <KpiCard
          label="Net Quota Variance"
          value={`${surplusDeficit >= 0 ? '+' : '-'}₹${(Math.abs(surplusDeficit) / 1000).toFixed(0)}K`}
          delta={surplusDeficit >= 0 ? 'Surplus' : 'Deficit'}
          trend={surplusDeficit >= 0 ? 'up' : 'down'}
          subtext="Balance to target"
          icon="📊"
        />
      </div>

      {/* Executive Pacing Speedometer & Goal Gauge Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(280px, 340px) 1fr',
        gap: '16px',
        alignItems: 'stretch'
      }}>
        {/* Radial SVG Dial Card */}
        <div style={{
          background: 'linear-gradient(145deg, rgba(30,41,59,0.9), rgba(15,23,42,0.95))',
          border: '1px solid var(--border, rgba(255,255,255,0.08))',
          borderRadius: '14px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: `linear-gradient(90deg, ${dialColor}, #3b82f6)`
          }} />

          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--muted-foreground, #94a3b8)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '14px' }}>
            Overall Quota Attainment
          </div>

          <div style={{ position: 'relative', width: '160px', height: '160px' }}>
            <svg width="160" height="160" viewBox="0 0 160 160">
              <circle
                cx="80"
                cy="80"
                r={rad}
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="14"
              />
              <circle
                cx="80"
                cy="80"
                r={rad}
                fill="none"
                stroke={dialColor}
                strokeWidth="14"
                strokeLinecap="round"
                strokeDasharray={circ}
                strokeDashoffset={arcOffset}
                transform="rotate(-90 80 80)"
                style={{ transition: 'stroke-dashoffset 0.8s ease' }}
              />
            </svg>
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ fontSize: '28px', fontWeight: 800, fontFamily: '"IBM Plex Mono", monospace', color: 'var(--foreground, #f8fafc)' }}>
                {attainment.toFixed(1)}%
              </span>
              <span style={{ fontSize: '11px', color: dialColor, fontWeight: 700, textTransform: 'uppercase', marginTop: '2px' }}>
                {attainment >= 100 ? '★ Quota Met' : 'In Progress'}
              </span>
            </div>
          </div>

          <div style={{ marginTop: '16px', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)', maxWidth: '240px' }}>
            {attainment >= 100
              ? `Surpassed monthly benchmark by ₹${(surplusDeficit / 1000).toFixed(0)}K with 8 days remaining.`
              : `Pacing requires ₹${(Math.abs(surplusDeficit) / 8000).toFixed(0)}K daily revenue over next 8 days.`}
          </div>
        </div>

        {/* Speedometer & Comparative Velocity Card */}
        <div style={{
          background: 'var(--card, #1e293b)',
          border: '1px solid var(--border, rgba(255,255,255,0.08))',
          borderRadius: '14px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '16px'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 700 }}>Calendar Pacing & Velocity Index</h3>
                <p style={{ margin: 0, fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>
                  Tracking realized run-rate against calendar time elapsed (Day 22 of 30)
                </p>
              </div>
              <div style={{
                background: pacingDiff >= 0 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                color: pacingDiff >= 0 ? '#10b981' : '#ef4444',
                padding: '4px 10px',
                borderRadius: '99px',
                fontSize: '11px',
                fontWeight: 700
              }}>
                {pacingDiff >= 0 ? `+${pacingDiff.toFixed(1)}% Ahead of Schedule` : `${pacingDiff.toFixed(1)}% Lagging`}
              </div>
            </div>

            {/* Pacing Bars */}
            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                  <span style={{ color: 'var(--muted-foreground, #94a3b8)' }}>📅 Calendar Period Elapsed (22 / 30 Days)</span>
                  <span style={{ fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{calendarElapsedPct}%</span>
                </div>
                <div style={{ height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '99px', overflow: 'hidden' }}>
                  <div style={{ width: `${calendarElapsedPct}%`, height: '100%', background: '#64748b', borderRadius: '99px' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                  <span style={{ color: dialColor, fontWeight: 600 }}>🎯 Revenue Target Realized ({attainment.toFixed(1)}%)</span>
                  <span style={{ fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace', color: dialColor }}>₹{(realizedRevenue / 100000).toFixed(2)}L / ₹{(adjustedTarget / 100000).toFixed(2)}L</span>
                </div>
                <div style={{ height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '99px', overflow: 'hidden' }}>
                  <div style={{ width: `${Math.min(100, attainment)}%`, height: '100%', background: dialColor, borderRadius: '99px' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                  <span style={{ color: '#3b82f6', fontWeight: 600 }}>🚀 Projected Month-End Run Rate</span>
                  <span style={{ fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace', color: '#3b82f6' }}>₹{(projectedFinish / 100000).toFixed(2)}L ({((projectedFinish / adjustedTarget) * 100).toFixed(0)}%)</span>
                </div>
                <div style={{ height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '99px', overflow: 'hidden' }}>
                  <div style={{ width: `${Math.min(100, (projectedFinish / adjustedTarget) * 100)}%`, height: '100%', background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)', borderRadius: '99px' }} />
                </div>
              </div>
            </div>
          </div>

          <div style={{
            background: 'rgba(0,0,0,0.2)',
            borderRadius: '10px',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            border: '1px solid var(--border, rgba(255,255,255,0.04))'
          }}>
            <span style={{ fontSize: '20px' }}>💡</span>
            <span style={{ fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)', lineHeight: 1.5 }}>
              <b style={{ color: 'var(--foreground, #f8fafc)' }}>Executive Pacing Note:</b> Realized sales velocity is currently outperforming linear calendar pacing by <b>{pacingDiff.toFixed(1)} percentage points</b>, driven by high pet pharmacy repeat orders and surgical consults.
            </span>
          </div>
        </div>
      </div>

      {/* Departmental Quota Realization Grid */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '14px',
        padding: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Departmental Quota Realization</h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Individual operating business units and their prorated targets</p>
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              onClick={() => setSelectedDept('all')}
              style={{
                padding: '4px 10px',
                borderRadius: '6px',
                border: '1px solid var(--border, rgba(255,255,255,0.1))',
                background: selectedDept === 'all' ? 'var(--primary, #3b82f6)' : 'rgba(0,0,0,0.2)',
                color: '#fff',
                fontSize: '11px',
                cursor: 'pointer'
              }}
            >All Units</button>
            {departments.map(d => (
              <button
                key={d.id}
                onClick={() => setSelectedDept(d.id)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  border: '1px solid var(--border, rgba(255,255,255,0.1))',
                  background: selectedDept === d.id ? 'var(--primary, #3b82f6)' : 'rgba(0,0,0,0.2)',
                  color: '#fff',
                  fontSize: '11px',
                  cursor: 'pointer'
                }}
              >{d.icon} {d.name.split(' ')[0]}</button>
            ))}
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '14px'
        }}>
          {filteredDepts.map(dept => (
            <div key={dept.id} style={{
              background: 'rgba(0,0,0,0.18)',
              border: `1px solid ${selectedDept === dept.id ? dept.color : 'var(--border, rgba(255,255,255,0.06))'}`,
              borderRadius: '10px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              position: 'relative'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, fontSize: '14px', color: 'var(--foreground, #f8fafc)' }}>
                  {dept.icon} {dept.name}
                </span>
                <span style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  color: dept.statusColor,
                  background: `color-mix(in oklab, ${dept.statusColor} 18%, transparent)`,
                  padding: '2px 8px',
                  borderRadius: '99px',
                  border: `1px solid color-mix(in oklab, ${dept.statusColor} 30%, transparent)`
                }}>
                  {dept.status}
                </span>
              </div>

              <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)' }}>
                Operational Lead: <b style={{ color: 'var(--foreground, #f8fafc)' }}>{dept.lead}</b>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: '4px' }}>
                <div>
                  <div style={{ fontSize: '10px', color: 'var(--muted-foreground, #94a3b8)' }}>Achieved</div>
                  <div style={{ fontSize: '17px', fontWeight: 800, fontFamily: '"IBM Plex Mono", monospace', color: dept.color }}>
                    ₹{(dept.achieved / 100000).toFixed(2)}L
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '10px', color: 'var(--muted-foreground, #94a3b8)' }}>Target Quota</div>
                  <div style={{ fontSize: '13px', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace', color: 'var(--muted-foreground, #94a3b8)' }}>
                    ₹{(dept.target / 100000).toFixed(2)}L
                  </div>
                </div>
              </div>

              <div style={{ height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '99px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${Math.min(100, dept.attain)}%`,
                  background: dept.color,
                  borderRadius: '99px'
                }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontFamily: '"IBM Plex Mono", monospace' }}>
                <span style={{ color: dept.statusColor, fontWeight: 700 }}>{dept.attain.toFixed(1)}% Attained</span>
                <span style={{ color: dept.variance >= 0 ? '#10b981' : '#f59e0b' }}>
                  {dept.variance >= 0 ? '+' : '-'}₹{(Math.abs(dept.variance) / 1000).toFixed(0)}K
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Columns: Rep Leaderboard & Doctor Quotas */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '16px'
      }}>
        {/* Rep & Coordinator Quota Attainment */}
        <div style={{
          background: 'var(--card, #1e293b)',
          border: '1px solid var(--border, rgba(255,255,255,0.08))',
          borderRadius: '14px',
          padding: '20px'
        }}>
          <h3 style={{ margin: '0 0 4px', fontSize: '15px', fontWeight: 700 }}>Care Coordinator & Rep Quotas</h3>
          <p style={{ margin: '0 0 14px', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Individual team member contribution to revenue targets</p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))', color: 'var(--muted-foreground, #94a3b8)', fontSize: '11px' }}>
                  <th style={{ padding: '8px 6px' }}>Rank</th>
                  <th style={{ padding: '8px 10px' }}>Coordinator</th>
                  <th style={{ padding: '8px 10px', textAlign: 'right' }}>Target</th>
                  <th style={{ padding: '8px 10px', textAlign: 'right' }}>Achieved</th>
                  <th style={{ padding: '8px 10px', textAlign: 'right' }}>Attainment</th>
                  <th style={{ padding: '8px 10px', textAlign: 'right' }}>Incentive</th>
                </tr>
              </thead>
              <tbody>
                {reps.map(rep => {
                  const repAttain = ((rep.achieved / rep.target) * 100).toFixed(1);
                  return (
                    <tr key={rep.rank} style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.04))' }}>
                      <td style={{ padding: '10px 6px', fontWeight: 700 }}>{rep.medal}</td>
                      <td style={{ padding: '10px' }}>
                        <div style={{ fontWeight: 600, color: 'var(--foreground, #f8fafc)' }}>{rep.name}</div>
                        <div style={{ fontSize: '10px', color: 'var(--muted-foreground, #94a3b8)' }}>{rep.dept}</div>
                      </td>
                      <td style={{ padding: '10px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: 'var(--muted-foreground, #94a3b8)' }}>
                        ₹{(rep.target / 100000).toFixed(2)}L
                      </td>
                      <td style={{ padding: '10px', textAlign: 'right', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace', color: 'var(--foreground, #f8fafc)' }}>
                        ₹{(rep.achieved / 100000).toFixed(2)}L
                      </td>
                      <td style={{ padding: '10px', textAlign: 'right' }}>
                        <span style={{
                          padding: '2px 6px',
                          borderRadius: '4px',
                          fontSize: '10px',
                          fontWeight: 700,
                          background: repAttain >= 100 ? 'rgba(16,185,129,0.15)' : 'rgba(14,165,233,0.15)',
                          color: repAttain >= 100 ? '#10b981' : '#0ea5e9'
                        }}>
                          {repAttain}%
                        </span>
                      </td>
                      <td style={{ padding: '10px', textAlign: 'right', fontSize: '11px', color: '#10b981', fontWeight: 600 }}>
                        {rep.bonus}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Doctor Consultation & Billings Quota */}
        <div style={{
          background: 'var(--card, #1e293b)',
          border: '1px solid var(--border, rgba(255,255,255,0.08))',
          borderRadius: '14px',
          padding: '20px'
        }}>
          <h3 style={{ margin: '0 0 4px', fontSize: '15px', fontWeight: 700 }}>Doctor Billings & Consultation Quotas</h3>
          <p style={{ margin: '0 0 14px', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Practitioner clinical appointment volume and revenue target realization</p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))', color: 'var(--muted-foreground, #94a3b8)', fontSize: '11px' }}>
                  <th style={{ padding: '8px 10px' }}>Veterinarian</th>
                  <th style={{ padding: '8px 10px', textAlign: 'right' }}>Consultations</th>
                  <th style={{ padding: '8px 10px', textAlign: 'right' }}>Consult Rate</th>
                  <th style={{ padding: '8px 10px', textAlign: 'right' }}>Billing Attainment</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map(doc => {
                  const cRate = ((doc.consultActual / doc.consultTarget) * 100).toFixed(0);
                  const bRate = ((doc.revActual / doc.revTarget) * 100).toFixed(1);
                  return (
                    <tr key={doc.name} style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.04))' }}>
                      <td style={{ padding: '10px' }}>
                        <div style={{ fontWeight: 600, color: 'var(--foreground, #f8fafc)' }}>{doc.name}</div>
                        <div style={{ fontSize: '10px', color: 'var(--muted-foreground, #94a3b8)' }}>{doc.spec}</div>
                      </td>
                      <td style={{ padding: '10px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>
                        <b>{doc.consultActual}</b> / {doc.consultTarget}
                      </td>
                      <td style={{ padding: '10px', textAlign: 'right' }}>
                        <span style={{
                          padding: '2px 6px',
                          borderRadius: '4px',
                          fontSize: '10px',
                          fontWeight: 700,
                          background: cRate >= 100 ? 'rgba(16,185,129,0.15)' : 'rgba(59,130,246,0.15)',
                          color: cRate >= 100 ? '#10b981' : '#3b82f6'
                        }}>
                          {cRate}%
                        </span>
                      </td>
                      <td style={{ padding: '10px', textAlign: 'right' }}>
                        <div style={{ fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace', color: bRate >= 100 ? '#10b981' : '#0ea5e9' }}>
                          ₹{(doc.revActual / 100000).toFixed(2)}L
                        </div>
                        <div style={{ fontSize: '10px', color: 'var(--muted-foreground, #94a3b8)' }}>
                          {bRate}% of ₹{(doc.revTarget / 100000).toFixed(2)}L
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
