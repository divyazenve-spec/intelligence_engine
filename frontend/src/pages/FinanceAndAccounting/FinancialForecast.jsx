import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function FinancialForecast() {
  const [scenario, setScenario] = useState('Base Case');

  const projections = [];

  const capexRoadmap = [];

  return (
    <DashboardLayout
      category="Finance & Accounting"
      subcategory="Financial Forecast"
      title="Financial Forecasting & Predictive Runway"
      subtitle="12-month rolling balance sheet and P&L modeling, multi-scenario Monte Carlo simulations, and capital expenditure roadmap"
      icon="🔮"
      badge=""
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
            <option value="Bull Case">Scenario: Bull Case</option>
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
        <KpiCard label="Next 12M Projected Revenue" value="₹0" delta="0.0%" trend="neutral" subtext="Base expansion path" icon="🔮" />
        <KpiCard label="Projected FY28 EBITDA" value="₹0" delta="0.0%" trend="neutral" subtext="Operating leverage" icon="⚡" />
        <KpiCard label="12M Free Cash Flow" value="₹0" delta="Post all CAPEX" trend="neutral" subtext="Self-funded pipeline" icon="💧" />
        <KpiCard label="Total Planned CAPEX" value="₹0" delta="--" trend="neutral" subtext="No new beds" icon="🏗️" />
        <KpiCard label="Target Breakeven / Bed" value="0 Months" delta="0.0%" trend="neutral" subtext="Capital efficiency" icon="⏱️" />
        <KpiCard label="Sensitivity Risk Score" value="0.0" delta="--" trend="neutral" subtext="Stress-tested" icon="🛡️" />
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
