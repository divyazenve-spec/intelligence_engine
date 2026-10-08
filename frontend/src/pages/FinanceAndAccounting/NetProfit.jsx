import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function NetProfit() {
  const [period, setPeriod] = useState('Current Quarter');

  const netProfitSteps = [];

  const quarterlyPAT = [];

  return (
    <DashboardLayout
      category="Finance & Accounting"
      subcategory="Net Profit"
      title="Net Profit (PAT) & Bottom-Line Intelligence"
      subtitle="Final statutory earnings after tax and financing obligations, quarterly profit expansion, and dividend retention"
      icon="🏆"
      badge=""
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
        <KpiCard label="Net Profit (PAT)" value="₹0" delta="0.0%" trend="neutral" subtext="Current month surplus" icon="🏆" />
        <KpiCard label="Net Profit Margin" value="0.0%" delta="0.0%" trend="neutral" subtext="Net margin" icon="📈" />
        <KpiCard label="Profit Before Tax (PBT)" value="₹0" delta="0.0%" trend="neutral" subtext="Operating surplus" icon="💼" />
        <KpiCard label="Effective Tax Rate" value="0.0%" delta="--" trend="neutral" subtext="Standard corporate slab" icon="🏛️" />
        <KpiCard label="Annualized PAT Run-rate" value="₹0" delta="0.0%" trend="neutral" subtext="For hospital builds" icon="🏗️" />
        <KpiCard label="Earnings Per Share (EPS)" value="₹0 / share" delta="0.0%" trend="neutral" subtext="Common shares" icon="💎" />
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
