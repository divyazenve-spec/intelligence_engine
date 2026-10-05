import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function NetProfit() {
  const [period, setPeriod] = useState('Current Quarter');

  const netProfitSteps = [
    { step: 'Operating EBITDA', amt: '₹15,70,000', margin: '20.0%', note: 'Core healthcare operating surplus' },
    { step: 'Less: Depreciation of Medical Equipment & Imaging', amt: '-₹2,40,000', margin: '3.1%', note: 'Straight-line 10-year life' },
    { step: 'Operating Profit (EBIT)', amt: '₹13,30,000', margin: '17.0%', note: 'Earnings before interest & taxes' },
    { step: 'Less: Bank Interest & Financing Facility Costs', amt: '-₹95,000', margin: '1.2%', note: 'Equipment term loan interest' },
    { step: 'Profit Before Tax (PBT)', amt: '₹12,35,000', margin: '15.8%', note: 'Pre-tax commercial income' },
    { step: 'Less: Corporate Income Tax Provision (25.17%)', amt: '-₹3,10,000', margin: '4.0%', note: 'Section 115BAA corporate rate' },
    { step: 'NET PROFIT AFTER TAX (PAT)', amt: '₹9,25,000', margin: '11.8%', note: 'Clean bottom-line net surplus', isKey: true }
  ];

  const quarterlyPAT = [
    { quarter: 'FY 2025-26 Q3', rev: '₹58,40,000', pat: '₹5,10,000', margin: '8.7%', eps: '₹2.04' },
    { quarter: 'FY 2025-26 Q4', rev: '₹64,20,000', pat: '₹6,40,000', margin: '10.0%', eps: '₹2.56' },
    { quarter: 'FY 2026-27 Q1', rev: '₹71,80,000', pat: '₹7,65,000', margin: '10.7%', eps: '₹3.06' },
    { quarter: 'FY 2026-27 Q2 (Current)', rev: '₹78,40,000', pat: '₹9,25,000', margin: '11.8%', eps: '₹3.70' }
  ];

  return (
    <DashboardLayout
      category="Finance & Accounting"
      subcategory="Net Profit"
      title="Net Profit (PAT) & Bottom-Line Intelligence"
      subtitle="Final statutory earnings after tax and financing obligations, quarterly profit expansion, and dividend retention"
      icon="🏆"
      badge="PAT Margin: 11.8%"
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => alert('Downloading official audited Net Profit (PAT) statement...')}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              border: '1px solid #10b981',
              background: 'rgba(16,185,129,0.15)',
              color: '#34d399',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            🏆 Export PAT Statement
          </button>
        </div>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Net Profit (PAT)" value="₹9.25 Lakh" delta="+52.2% vs Plan" trend="up" subtext="Current month surplus" icon="🏆" />
        <KpiCard label="Net Profit Margin" value="11.8%" delta="+3.1% pts YoY" trend="up" subtext="Target: >10.0%" icon="📈" />
        <KpiCard label="Profit Before Tax (PBT)" value="₹12.35 Lakh" delta="15.8% PBT Margin" trend="up" subtext="Operating surplus" icon="💼" />
        <KpiCard label="Effective Tax Rate" value="25.17%" delta="Section 115BAA" trend="up" subtext="Standard corporate slab" icon="🏛️" />
        <KpiCard label="Annualized PAT Run-rate" value="₹1.11 Crore" delta="100% Retained" trend="up" subtext="For hospital builds" icon="🏗️" />
        <KpiCard label="Earnings Per Share (EPS)" value="₹3.70 / share" delta="+20.9% QoQ" trend="up" subtext="25,00,000 shares" icon="💎" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', gap: '20px' }}>
        {/* Waterfall from EBITDA to PAT */}
        <div style={{
          background: 'var(--card, #131d2e)',
          border: '1px solid var(--border, rgba(255,255,255,0.08))',
          borderRadius: '12px',
          padding: '22px 24px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#fff' }}>💧 Net Profit Waterfall Bridge</h3>
              <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>From operating EBITDA to bottom-line PAT</p>
            </div>
            <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>Audited Accrual</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {netProfitSteps.map((s, idx) => (
              <div key={idx} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 16px',
                borderRadius: '8px',
                background: s.isKey ? 'rgba(16,185,129,0.12)' : 'rgba(0,0,0,0.18)',
                border: s.isKey ? '1px solid rgba(16,185,129,0.3)' : '1px solid rgba(255,255,255,0.06)'
              }}>
                <div>
                  <b style={{ color: s.isKey ? '#34d399' : '#fff', fontSize: '12px' }}>{s.step}</b>
                  <div style={{ fontSize: '10px', color: '#94a3b8' }}>{s.note}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontWeight: 700,
                    fontSize: s.isKey ? '15px' : '13px',
                    color: s.isKey ? '#34d399' : s.amt.startsWith('-') ? '#f87171' : '#38bdf8'
                  }}>
                    {s.amt}
                  </div>
                  <div style={{ fontSize: '10px', color: '#94a3b8' }}>{s.margin}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quarterly PAT Growth Trend */}
        <div style={{
          background: 'var(--card, #131d2e)',
          border: '1px solid var(--border, rgba(255,255,255,0.08))',
          borderRadius: '12px',
          padding: '22px 24px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#fff' }}>📈 Quarterly Net Profit Progression</h3>
              <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Consecutive quarterly margin expansion</p>
            </div>
            <span style={{ fontSize: '11px', color: '#38bdf8', fontWeight: 600 }}>4 Consecutive Quarters</span>
          </div>

          <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr style={{ background: 'rgba(0,0,0,0.22)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <th style={{ padding: '10px 20px', textAlign: 'left', color: '#94a3b8' }}>Quarter</th>
                  <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Revenue</th>
                  <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Net PAT</th>
                  <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Margin</th>
                  <th style={{ padding: '10px 20px', textAlign: 'right', color: '#94a3b8' }}>EPS</th>
                </tr>
              </thead>
              <tbody>
                {quarterlyPAT.map((q, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '12px 20px', color: '#fff', fontWeight: 600 }}>{q.quarter}</td>
                    <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{q.rev}</td>
                    <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#10b981' }}>{q.pat}</td>
                    <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#38bdf8', fontWeight: 600 }}>{q.margin}</td>
                    <td style={{ padding: '12px 20px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#cbd5e1' }}>{q.eps}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
