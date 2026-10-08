import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function GrossProfit() {
  const [viewBy, setViewBy] = useState('Department');

  const departmentMargins = [];

  const unitEconomics = [];

  return (
    <DashboardLayout
      category="Finance & Accounting"
      subcategory="Gross Profit"
      title="Gross Profit & Contribution Margin Intelligence"
      subtitle="Unit economics by medical service, gross margin expansion across therapeutic specialties, and pricing leverage"
      icon="💎"
      badge=""
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => alert('Exporting Unit Economics & Gross Margin Model...')}
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
            💎 Export Unit Economics
          </button>
        </div>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Gross Profit" value="₹0" delta="0.0%" trend="neutral" subtext="Revenue - COGS" icon="💎" />
        <KpiCard label="Blended Gross Margin" value="0.0%" delta="0.0%" trend="neutral" subtext="Gross margin" icon="📈" />
        <KpiCard label="Surgical Gross Margin" value="0.0%" delta="Highest margin unit" trend="neutral" subtext="Specialist OTs" icon="🩺" />
        <KpiCard label="Diagnostics Margin" value="0.0%" delta="High capital efficiency" trend="neutral" subtext="In-house blood lab" icon="🔬" />
        <KpiCard label="Pharmacy Gross Margin" value="0.0%" delta="0.0%" trend="neutral" subtext="Direct OEM sourcing" icon="💊" />
        <KpiCard label="Price Realization Index" value="0" delta="0.0%" trend="neutral" subtext="Zero discounting in OTs" icon="🛡️" />
      </div>

      <div style={{
        background: 'var(--card, #131d2e)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '22px 24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#fff' }}>📊 Gross Profit by Clinical Division</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Direct profitability by department after material & pharmaceutical cost deductions</p>
          </div>
          <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>Target Met Across All 5 Units</span>
        </div>

        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.22)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <th style={{ padding: '10px 20px', textAlign: 'left', color: '#94a3b8' }}>Clinical Department / Unit</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Gross Revenue</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Direct COGS</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Gross Profit</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Gross Margin %</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Target Margin</th>
                <th style={{ padding: '10px 20px', textAlign: 'right', color: '#94a3b8' }}>Performance</th>
              </tr>
            </thead>
            <tbody>
              {departmentMargins.map((d, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 20px', color: '#fff', fontWeight: 600 }}>{d.dept}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{d.rev}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#f87171' }}>{d.cogs}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#10b981', fontWeight: 700 }}>{d.gp}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#38bdf8', fontWeight: 700 }}>{d.margin}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#94a3b8' }}>{d.target}</td>
                  <td style={{ padding: '12px 20px', textAlign: 'right' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '4px', background: 'rgba(16,185,129,0.15)', color: '#34d399', fontSize: '11px', fontWeight: 600 }}>{d.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Unit Economics Deep Dive */}
      <div style={{
        background: 'var(--card, #131d2e)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '22px 24px'
      }}>
        <h3 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 700, color: '#fff' }}>🐾 Unit Economics: Top High-Volume Clinical Procedures</h3>
        <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Revenue realization, direct consumables cost, and per-case gross contribution</p>

        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.22)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <th style={{ padding: '10px 20px', textAlign: 'left', color: '#94a3b8' }}>Medical Service / Procedure</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Average Price</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Direct Cost / Case</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Contribution Margin</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Margin %</th>
                <th style={{ padding: '10px 20px', textAlign: 'right', color: '#94a3b8' }}>Monthly Throughput</th>
              </tr>
            </thead>
            <tbody>
              {unitEconomics.map((u, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 20px', color: '#fff', fontWeight: 600 }}>{u.service}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{u.avgPrice}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#f87171' }}>{u.directCost}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#10b981' }}>{u.contribution}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#38bdf8', fontWeight: 600 }}>{u.margin}</td>
                  <td style={{ padding: '12px 20px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#cbd5e1' }}>{u.volume}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
