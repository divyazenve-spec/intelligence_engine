import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function TargetsAndAchievement() {
  const [targetAdjust, setTargetAdjust] = useState(0);
  const [selectedDept, setSelectedDept] = useState('all');

  const basePeriodTarget = 0;
  const targetMultiplier = 1 + targetAdjust / 100;
  const adjustedTarget = Math.round(basePeriodTarget * targetMultiplier);
  const realizedRevenue = 0;
  const attainment = adjustedTarget > 0 ? ((realizedRevenue / adjustedTarget) * 100) : 0;
  const calendarElapsedPct = 0;
  const pacingDiff = 0;
  const projectedFinish = 0;
  const surplusDeficit = 0;

  // Department targets
  const departments = [];
  const filteredDepts = [];

  // Team Reps & Coordinators
  const reps = [];

  // Doctors Quotas
  const doctors = [];

  // Circular gauge calculations
  const rad = 65;
  const circ = 2 * Math.PI * rad;
  const cappedAttain = 0;
  const arcOffset = circ;
  const dialColor = '#64748b';

  return (
    <DashboardLayout
      category="Revenue & Sales"
      subcategory="Targets & Achievement"
      title="Sales Targets & Quota Realization"
      subtitle="Executive pacing command center, calendar elapsed pacing, and departmental quota attainment"
      icon="🎯"
      badge="No Active Quota"
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
          value="₹0"
          delta="--"
          trend="neutral"
          subtext="No target configured"
          icon="🎯"
        />
        <KpiCard
          label="Realized Revenue"
          value="₹0"
          delta="0.0% Attained"
          trend="neutral"
          subtext="0 confirmed billings"
          icon="🏆"
        />
        <KpiCard
          label="Pacing vs Calendar"
          value="0.0%"
          delta="--"
          trend="neutral"
          subtext="No pacing variance"
          icon="⚡"
        />
        <KpiCard
          label="Projected Finish"
          value="₹0"
          delta="0.0% of Goal"
          trend="neutral"
          subtext="Run-rate projection"
          icon="🚀"
        />
        <KpiCard
          label="Net Quota Variance"
          value="₹0"
          delta="--"
          trend="neutral"
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
            background: 'rgba(255,255,255,0.1)'
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
                0.0%
              </span>
              <span style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)', fontWeight: 700, textTransform: 'uppercase', marginTop: '2px' }}>
                No Target Set
              </span>
            </div>
          </div>

          <div style={{ marginTop: '16px', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)', maxWidth: '240px' }}>
            No revenue targets or active quota benchmarks configured for this cycle.
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
                  Tracking realized run-rate against calendar time elapsed
                </p>
              </div>
              <div style={{
                background: 'rgba(255,255,255,0.06)',
                color: 'var(--muted-foreground, #94a3b8)',
                padding: '4px 10px',
                borderRadius: '99px',
                fontSize: '11px',
                fontWeight: 700
              }}>
                -- Pacing
              </div>
            </div>

            {/* Pacing Bars */}
            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                  <span style={{ color: 'var(--muted-foreground, #94a3b8)' }}>📅 Calendar Period Elapsed</span>
                  <span style={{ fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>0.0%</span>
                </div>
                <div style={{ height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '99px', overflow: 'hidden' }}>
                  <div style={{ width: '0%', height: '100%', background: '#64748b', borderRadius: '99px' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                  <span style={{ color: 'var(--muted-foreground, #94a3b8)', fontWeight: 600 }}>🎯 Revenue Target Realized (0.0%)</span>
                  <span style={{ fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace', color: 'var(--muted-foreground, #94a3b8)' }}>₹0 / ₹0</span>
                </div>
                <div style={{ height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '99px', overflow: 'hidden' }}>
                  <div style={{ width: '0%', height: '100%', background: '#64748b', borderRadius: '99px' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                  <span style={{ color: 'var(--muted-foreground, #94a3b8)', fontWeight: 600 }}>🚀 Projected Month-End Run Rate</span>
                  <span style={{ fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace', color: 'var(--muted-foreground, #94a3b8)' }}>₹0 (0%)</span>
                </div>
                <div style={{ height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '99px', overflow: 'hidden' }}>
                  <div style={{ width: '0%', height: '100%', background: '#64748b', borderRadius: '99px' }} />
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
              <b style={{ color: 'var(--foreground, #f8fafc)' }}>Executive Pacing Note:</b> No active targets or revenue records found for this period.
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
        </div>

        {filteredDepts.length === 0 ? (
          <div style={{ padding: '36px 20px', textAlign: 'center', color: 'var(--muted-foreground, #94a3b8)', fontSize: '13px' }}>
            No departmental targets recorded
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '14px'
          }}>
            {filteredDepts.map(dept => (
              <div key={dept.id} style={{
                background: 'rgba(0,0,0,0.18)',
                border: '1px solid var(--border, rgba(255,255,255,0.06))',
                borderRadius: '10px',
                padding: '16px'
              }}>
                <div style={{ fontWeight: 700, fontSize: '14px' }}>{dept.name}</div>
              </div>
            ))}
          </div>
        )}
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
                {reps.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '24px', color: 'var(--muted-foreground, #94a3b8)' }}>
                      No coordinator quota records found
                    </td>
                  </tr>
                ) : (
                  reps.map(rep => (
                    <tr key={rep.rank}>
                      <td>{rep.name}</td>
                    </tr>
                  ))
                )}
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
                {doctors.length === 0 ? (
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'center', padding: '24px', color: 'var(--muted-foreground, #94a3b8)' }}>
                      No doctor quota records found
                    </td>
                  </tr>
                ) : (
                  doctors.map(doc => (
                    <tr key={doc.name}>
                      <td>{doc.name}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
