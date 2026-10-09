import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function ProfitPrediction() {
  const [scenario, setScenario] = useState('BASE');

  const cardStyle = {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '22px 24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
  };

  const scenarios = {
    BASE: { rev: '₹0', cogs: '₹0', grossProfit: '₹0 (0.0%)', opex: '₹0', ebitda: '₹0 (0.0%)', pat: '₹0 (0.0%)' },
    AGGRESSIVE: { rev: '₹0', cogs: '₹0', grossProfit: '₹0 (0.0%)', opex: '₹0', ebitda: '₹0 (0.0%)', pat: '₹0 (0.0%)' },
    CONSERVATIVE: { rev: '₹0', cogs: '₹0', grossProfit: '₹0 (0.0%)', opex: '₹0', ebitda: '₹0 (0.0%)', pat: '₹0 (0.0%)' }
  };

  const cur = scenarios[scenario];

  return (
    <DashboardLayout
      category="AI Assistant"
      subcategory="Profit Prediction"
      title="Predictive Profitability & Scenario Simulation Engine"
      subtitle="Dynamic unit economics modeling, contribution margin sensitivity analysis, and quarterly EBITDA forecast"
      icon="💰"
      badge="Financial Scenario Simulator"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Projected Q4 EBITDA" value={cur.ebitda} delta="--" trend="neutral" subtext="Under current simulation" icon="📈" />
        <KpiCard label="Projected Gross Margin" value={cur.grossProfit.split(' ')[1]} delta="--" trend="neutral" subtext="Direct sourcing" icon="💎" />
        <KpiCard label="Net Profit Margin (PAT)" value={cur.pat.split(' ')[1]} delta="--" trend="neutral" subtext="Bottom-line yield" icon="💰" />
        <KpiCard label="Contribution Margin / Order" value="₹0" delta="--" trend="neutral" subtext="AOV: ₹0" icon="⚡" />
      </div>

      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Simulated Profit & Loss Model</h3>
            <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#64748b' }}>Select simulation scenario to model financial sensitivity</p>
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            {[
              { id: 'CONSERVATIVE', label: 'Conservative Downside' },
              { id: 'BASE', label: 'Base Plan (Expected)' },
              { id: 'AGGRESSIVE', label: 'Aggressive Upside' }
            ].map(sc => (
              <button
                key={sc.id}
                onClick={() => setScenario(sc.id)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '6px',
                  border: scenario === sc.id ? '1px solid #4f46e5' : '1px solid #cbd5e1',
                  background: scenario === sc.id ? '#4f46e5' : '#ffffff',
                  color: scenario === sc.id ? '#ffffff' : '#334155',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {sc.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginTop: '16px' }}>
          {[
            { label: 'Projected Net Revenue', val: cur.rev, sub: 'Gross billed less discounts' },
            { label: 'Projected COGS', val: cur.cogs, sub: 'Procurement & clinical consumables' },
            { label: 'Projected Gross Profit', val: cur.grossProfit, sub: 'Direct margin contribution', hl: true },
            { label: 'Projected OpEx', val: cur.opex, sub: 'Logistics, marketing & admin' },
            { label: 'Projected EBITDA', val: cur.ebitda, sub: 'Operating cash realization', hl: true },
            { label: 'Projected PAT', val: cur.pat, sub: 'Final net profit', hl: true }
          ].map((item, idx) => (
            <div key={idx} style={{ padding: '16px', borderRadius: '10px', background: item.hl ? '#f0fdf4' : '#f8fafc', border: item.hl ? '1px solid #bbf7d0' : '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>{item.label}</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: item.hl ? '#15803d' : '#0f172a', margin: '6px 0 2px' }}>{item.val}</div>
              <div style={{ fontSize: '10px', color: '#64748b' }}>{item.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
