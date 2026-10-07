import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function CostAnalysis() {
  const [costModel, setCostModel] = useState('Activity-Based');

  const activityCosts = [];

  const costStructure = [];

  return (
    <DashboardLayout
      category="Finance & Accounting"
      subcategory="Cost Analysis"
      title="Cost Structure, Activity-Based Costing & Breakeven"
      subtitle="Activity-based unit costs (ABC), marginal procedure absorption, fixed vs variable cost equilibrium, and safety margin"
      icon="🔍"
      badge="Margin of Safety: 38.5%"
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => alert('Exporting comprehensive Activity-Based Costing (ABC) ledger...')}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              border: '1px solid #3b82f6',
              background: 'rgba(59,130,246,0.15)',
              color: '#60a5fa',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            🔍 Export Cost Model
          </button>
        </div>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Network Monthly Breakeven" value="₹0" delta="Actual: ₹0" trend="up" subtext="Breakeven reached on Day 18" icon="⚖️" />
        <KpiCard label="Margin of Safety" value="0.0%" delta="+4.2% pts YoY" trend="up" subtext="Substantial cushion" icon="🛡️" />
        <KpiCard label="Cost / Inpatient Bed-Day" value="₹0" delta="-16.4% vs Industry" trend="up" subtext="Optimized nurse-to-pet ratio" icon="🛏️" />
        <KpiCard label="Cost / Surgical OT Hour" value="₹0 / hr" delta="High throughput" trend="up" subtext="3 Modular OTs" icon="🩺" />
        <KpiCard label="Fixed Cost Ratio" value="0.0%" delta="Lean real estate" trend="up" subtext="₹0 fixed base" icon="🏢" />
        <KpiCard label="Variable Cost Ratio" value="0.0%" delta="High elasticity" trend="up" subtext="Low risk capital model" icon="📉" />
      </div>

      <div style={{
        background: 'var(--card, #131d2e)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '22px 24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#fff' }}>📋 Activity-Based Unit Costing (ABC Model)</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Granular clinical unit costs compared to private hospital industry benchmarks</p>
          </div>
          <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>15–26% Cost Advantage</span>
        </div>

        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.22)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <th style={{ padding: '10px 20px', textAlign: 'left', color: '#94a3b8' }}>Clinical Activity / Procedure Unit</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', color: '#94a3b8' }}>Service Classification</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Zenve Unit Cost</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Metro Benchmark</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Variance</th>
                <th style={{ padding: '10px 20px', textAlign: 'right', color: '#94a3b8' }}>Efficiency Rating</th>
              </tr>
            </thead>
            <tbody>
              {activityCosts.map((a, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 20px', color: '#fff', fontWeight: 600 }}>{a.activity}</td>
                  <td style={{ padding: '12px 14px', color: '#38bdf8' }}>{a.type}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#34d399' }}>{a.unitCost}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#94a3b8' }}>{a.benchmark}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#10b981', fontWeight: 600 }}>{a.variance}</td>
                  <td style={{ padding: '12px 20px', textAlign: 'right' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '4px', background: 'rgba(16,185,129,0.15)', color: '#34d399', fontSize: '11px', fontWeight: 600 }}>{a.efficiency}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cost Behavior & Fixed vs Variable Split */}
      <div style={{
        background: 'var(--card, #131d2e)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '22px 24px'
      }}>
        <h3 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 700, color: '#fff' }}>⚖️ Cost Behavior Breakdown & Operating Leverage</h3>
        <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Analysis of operational flexibility during demand swings</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '14px' }}>
          {costStructure.map((c, idx) => (
            <div key={idx} style={{
              background: 'rgba(0,0,0,0.18)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '8px',
              padding: '14px 18px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <b style={{ color: '#38bdf8', fontSize: '13px' }}>{c.category}</b>
                <span style={{ color: '#fff', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{c.pct}</span>
              </div>
              <div style={{ fontSize: '18px', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace', color: '#10b981', marginBottom: '6px' }}>{c.monthlyAmt}</div>
              <div style={{ fontSize: '11px', color: '#94a3b8' }}>{c.behavior}</div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
