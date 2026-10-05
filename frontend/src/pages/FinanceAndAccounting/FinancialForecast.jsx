import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function FinancialForecast() {
  const [scenario, setScenario] = useState('Base Case');

  const projections = [
    { period: 'Q3 FY 2026-27 (Next)', rev: '₹84,50,000', cogs: '₹36,30,000', opex: '₹29,80,000', ebitda: '₹18,40,000', pat: '₹11,10,000', cashClosing: '₹1,54,00,000' },
    { period: 'Q4 FY 2026-27', rev: '₹92,80,000', cogs: '₹39,50,000', opex: '₹31,40,000', ebitda: '₹21,90,000', pat: '₹13,50,000', cashClosing: '₹1,68,00,000' },
    { period: 'Q1 FY 2027-28', rev: '₹1,02,00,000', cogs: '₹43,20,000', opex: '₹33,60,000', ebitda: '₹25,20,000', pat: '₹15,80,000', cashClosing: '₹1,85,00,000' },
    { period: 'Q2 FY 2027-28', rev: '₹1,14,50,000', cogs: '₹48,00,000', opex: '₹36,20,000', ebitda: '₹30,30,000', pat: '₹19,40,000', cashClosing: '₹2,08,00,000' }
  ];

  const capexRoadmap = [
    { project: 'Whitefield Modular OT Hub Fitout', city: 'Bengaluru', budget: '₹95,00,000', targetDate: 'Jan 2027', roi: '18 Months', status: 'Civil Works Inbound' },
    { project: 'Powai Specialty Surgical Center', city: 'Mumbai', budget: '₹85,00,000', targetDate: 'Mar 2027', roi: '20 Months', status: 'Lease Executed' },
    { project: 'Gachibowli Secondary Care Upgrade', city: 'Hyderabad', budget: '₹60,00,000', targetDate: 'May 2027', roi: '16 Months', status: 'Architectural Review' },
    { project: 'Central High-Volume Pathology Core Lab', city: 'Bengaluru', budget: '₹1,00,00,000', targetDate: 'Jul 2027', roi: '14 Months', status: 'Vendor Shortlisting' }
  ];

  return (
    <DashboardLayout
      category="Finance & Accounting"
      subcategory="Financial Forecast"
      title="Financial Forecasting & Predictive Runway"
      subtitle="12-month rolling balance sheet and P&L modeling, multi-scenario Monte Carlo simulations, and capital expenditure roadmap"
      icon="🔮"
      badge="FY28 ARR: ₹13.7 Cr"
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <select
            value={scenario}
            onChange={(e) => setScenario(e.target.value)}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.1)',
              background: '#090e17',
              color: '#cbd5e1',
              fontSize: '12px'
            }}
          >
            <option value="Base Case">Scenario: Base Case (Realistic)</option>
            <option value="Bull Case">Scenario: Bull Case (+4 Hubs)</option>
            <option value="Bear Case">Scenario: Conservative / Bear</option>
          </select>
          <button
            onClick={() => alert('Exporting full dynamic Excel financial projection model...')}
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
            📊 Export Forecast Model
          </button>
        </div>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Next 12M Projected Revenue" value="₹11.84 Crore" delta="+26.0% YoY" trend="up" subtext="Base expansion path" icon="🔮" />
        <KpiCard label="Projected FY28 EBITDA" value="₹3.12 Crore" delta="26.3% Margin" trend="up" subtext="Operating leverage" icon="⚡" />
        <KpiCard label="12M Free Cash Flow" value="₹1.42 Crore" delta="Post all CAPEX" trend="up" subtext="Self-funded pipeline" icon="💧" />
        <KpiCard label="Total Planned CAPEX" value="₹3.40 Crore" delta="4 New Facilities" trend="up" subtext="+65 Inpatient Beds" icon="🏗️" />
        <KpiCard label="Target Breakeven / Bed" value="2.8 Months" delta="-0.6 mo faster" trend="up" subtext="Capital efficiency" icon="⏱️" />
        <KpiCard label="Sensitivity Risk Score" value="Low Risk (1.18)" delta="Debt Service >12x" trend="up" subtext="Stress-tested" icon="🛡️" />
      </div>

      <div style={{
        background: 'var(--card, #131d2e)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '22px 24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#fff' }}>📈 4-Quarter Rolling Forward P&L Projections ({scenario})</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Management predictive model incorporating 14 existing sites + 4 planned expansions</p>
          </div>
          <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>Active Simulation</span>
        </div>

        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.22)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <th style={{ padding: '10px 20px', textAlign: 'left', color: '#94a3b8' }}>Forward Quarter</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Forecast Revenue</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Direct COGS</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Forecast OPEX</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Projected EBITDA</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Projected PAT</th>
                <th style={{ padding: '10px 20px', textAlign: 'right', color: '#94a3b8' }}>Closing Treasury</th>
              </tr>
            </thead>
            <tbody>
              {projections.map((p, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 20px', color: '#fff', fontWeight: 600 }}>{p.period}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#10b981' }}>{p.rev}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#f87171' }}>{p.cogs}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#94a3b8' }}>{p.opex}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#38bdf8' }}>{p.ebitda}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#34d399' }}>{p.pat}</td>
                  <td style={{ padding: '12px 20px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#fff' }}>{p.cashClosing}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Planned Capital Expenditure (CAPEX) */}
      <div style={{
        background: 'var(--card, #131d2e)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '22px 24px'
      }}>
        <h3 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 700, color: '#fff' }}>🏗️ Capital Expenditure (CAPEX) Expansion Pipeline</h3>
        <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Approved board allocations for modular OT theatres, MRI imaging, and tertiary hubs</p>

        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.22)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <th style={{ padding: '10px 20px', textAlign: 'left', color: '#94a3b8' }}>Project Name</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', color: '#94a3b8' }}>City Cluster</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Approved Budget</th>
                <th style={{ padding: '10px 14px', textAlign: 'center', color: '#94a3b8' }}>Target Live Date</th>
                <th style={{ padding: '10px 14px', textAlign: 'center', color: '#94a3b8' }}>Projected Payback</th>
                <th style={{ padding: '10px 20px', textAlign: 'right', color: '#94a3b8' }}>Execution Status</th>
              </tr>
            </thead>
            <tbody>
              {capexRoadmap.map((c, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 20px', color: '#fff', fontWeight: 600 }}>{c.project}</td>
                  <td style={{ padding: '12px 14px', color: '#38bdf8' }}>{c.city}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#f87171' }}>{c.budget}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'center', color: '#cbd5e1' }}>{c.targetDate}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'center', color: '#10b981', fontWeight: 600 }}>{c.roi}</td>
                  <td style={{ padding: '12px 20px', textAlign: 'right' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '4px', background: 'rgba(56,189,248,0.15)', color: '#38bdf8', fontSize: '11px', fontWeight: 600 }}>{c.status}</span>
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
