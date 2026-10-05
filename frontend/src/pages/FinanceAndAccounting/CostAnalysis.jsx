import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function CostAnalysis() {
  const [costModel, setCostModel] = useState('Activity-Based');

  const activityCosts = [
    { activity: 'Modular OT Theatre Hour (Anesthesia + Scrub Nurse + Gas)', type: 'Surgical Procedure', unitCost: '₹4,200 / hr', benchmark: '₹5,100 / hr', variance: '-17.6%', efficiency: 'High' },
    { activity: 'Tertiary Inpatient Care Bed-Day (24h Nursing + Vitals)', type: 'Inpatient Ward', unitCost: '₹1,840 / bed-day', benchmark: '₹2,200 / bed-day', variance: '-16.4%', efficiency: 'High' },
    { activity: 'Primary Veterinary Outpatient Consultation (18m slot)', type: 'Clinical OPD', unitCost: '₹245 / visit', benchmark: '₹290 / visit', variance: '-15.5%', efficiency: 'High' },
    { activity: 'In-House Automated Hematology & Biochemistry Assay', type: 'Pathology Lab', unitCost: '₹310 / panel', benchmark: '₹420 / panel', variance: '-26.2%', efficiency: 'Superior' },
    { activity: 'Cold-Chain Pet Vaccine Administration & Record Sync', type: 'Preventative', unitCost: '₹140 / pet', benchmark: '₹180 / pet', variance: '-22.2%', efficiency: 'High' },
    { activity: 'ALS Pet Ambulance Emergency Transit (per dispatch)', type: 'Logistics / Fleet', unitCost: '₹1,150 / callout', benchmark: '₹1,400 / callout', variance: '-17.9%', efficiency: 'High' }
  ];

  const costStructure = [
    { category: 'Variable Costs (COGS, Meds, Implants, Oxygen, Reagents)', monthlyAmt: '₹36,10,000', pct: '57.6%', behavior: 'Directly scales with patient footfall' },
    { category: 'Semi-Variable Costs (Surgeon Performance Pay, Utilities)', monthlyAmt: '₹11,40,000', pct: '18.2%', behavior: 'Base fee + per-procedure incentive' },
    { category: 'Fixed Facility Overhead (Lease Rents, Depreciation, Core Staff)', monthlyAmt: '₹15,20,000', pct: '24.2%', behavior: 'Stable fixed baseline across 14 sites' }
  ];

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
        <KpiCard label="Network Monthly Breakeven" value="₹48.20 Lakh" delta="Actual: ₹78.40L" trend="up" subtext="Breakeven reached on Day 18" icon="⚖️" />
        <KpiCard label="Margin of Safety" value="38.5%" delta="+4.2% pts YoY" trend="up" subtext="Substantial cushion" icon="🛡️" />
        <KpiCard label="Cost / Inpatient Bed-Day" value="₹1,840" delta="-16.4% vs Industry" trend="up" subtext="Optimized nurse-to-pet ratio" icon="🛏️" />
        <KpiCard label="Cost / Surgical OT Hour" value="₹4,200 / hr" delta="High throughput" trend="up" subtext="3 Modular OTs" icon="🩺" />
        <KpiCard label="Fixed Cost Ratio" value="24.2%" delta="Lean real estate" trend="up" subtext="₹15.20 Lakh fixed base" icon="🏢" />
        <KpiCard label="Variable Cost Ratio" value="57.6%" delta="High elasticity" trend="up" subtext="Low risk capital model" icon="📉" />
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
