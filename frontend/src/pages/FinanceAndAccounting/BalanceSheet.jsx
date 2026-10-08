import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function BalanceSheet() {
  const [asOfDate, setAsOfDate] = useState('September 30, 2026');

  const assets = [];

  const liabilitiesAndEquity = [];

  return (
    <DashboardLayout
      category="Finance & Accounting"
      subcategory="Balance Sheet"
      title="Statement of Financial Position (Balance Sheet)"
      subtitle="Comprehensive capital structure, working capital liquidity, fixed hospital assets, and shareholder net worth"
      icon="🏛️"
      badge="Net Worth: ₹0"
      actions={
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', color: '#94a3b8' }}>As of: <b>{asOfDate}</b></span>
          <button
            onClick={() => alert('Downloading official audited Balance Sheet...')}
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
            📥 Download Balance Sheet
          </button>
        </div>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Assets" value="₹0" delta="0.0%" trend="neutral" subtext="Fully balanced" icon="🏛️" />
        <KpiCard label="Shareholders Equity" value="₹0" delta="0.0%" trend="neutral" subtext="Strong net worth" icon="💎" />
        <KpiCard label="Current Ratio" value="0.0x" delta="--" trend="neutral" subtext="High liquidity buffer" icon="💧" />
        <KpiCard label="Quick Ratio" value="0.0x" delta="--" trend="neutral" subtext="Instant solvency" icon="⚡" />
        <KpiCard label="Debt to Equity" value="0.0x" delta="Conservative" trend="neutral" subtext="No term debt" icon="🛡️" />
        <KpiCard label="Working Capital" value="₹0" delta="0.0%" trend="neutral" subtext="Current A - Current L" icon="📈" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', gap: '20px' }}>
        {/* Assets Side */}
        <div style={{
          background: 'var(--card, #131d2e)',
          border: '1px solid var(--border, rgba(255,255,255,0.08))',
          borderRadius: '12px',
          padding: '22px 24px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#fff' }}>💼 Assets Breakdown</h3>
              <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Current liquid assets and capital infrastructure</p>
            </div>
            <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>Total: ₹0</span>
          </div>

          <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr style={{ background: 'rgba(0,0,0,0.22)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <th style={{ padding: '10px 20px', textAlign: 'left', color: '#94a3b8' }}>Asset Item</th>
                  <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Current Quarter</th>
                  <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Previous</th>
                  <th style={{ padding: '10px 20px', textAlign: 'right', color: '#94a3b8' }}>YoY %</th>
                </tr>
              </thead>
              <tbody>
                {assets.map((a, idx) => (
                  <tr key={idx} style={{
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    background: a.isTotal ? 'rgba(56,189,248,0.1)' : a.isSubtotal ? 'rgba(255,255,255,0.04)' : 'transparent',
                    fontWeight: a.isTotal || a.isSubtotal ? 700 : 400
                  }}>
                    <td style={{ padding: '10px 20px', color: a.isTotal ? '#38bdf8' : a.isSubtotal ? '#fff' : '#cbd5e1' }}>{a.name}</td>
                    <td style={{ padding: '10px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: a.isTotal ? '#38bdf8' : '#fff' }}>{a.val}</td>
                    <td style={{ padding: '10px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#94a3b8' }}>{a.prev}</td>
                    <td style={{ padding: '10px 20px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: a.change.startsWith('+') ? '#10b981' : '#cbd5e1' }}>{a.change}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Liabilities & Equity Side */}
        <div style={{
          background: 'var(--card, #131d2e)',
          border: '1px solid var(--border, rgba(255,255,255,0.08))',
          borderRadius: '12px',
          padding: '22px 24px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#fff' }}>⚖️ Liabilities & Equity</h3>
              <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>External obligations and shareholder capitalization</p>
            </div>
            <span style={{ fontSize: '11px', color: '#38bdf8', fontWeight: 600 }}>Total: ₹0</span>
          </div>

          <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr style={{ background: 'rgba(0,0,0,0.22)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <th style={{ padding: '10px 20px', textAlign: 'left', color: '#94a3b8' }}>Obligation / Capital Item</th>
                  <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Current Quarter</th>
                  <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Previous</th>
                  <th style={{ padding: '10px 20px', textAlign: 'right', color: '#94a3b8' }}>YoY %</th>
                </tr>
              </thead>
              <tbody>
                {liabilitiesAndEquity.map((l, idx) => (
                  <tr key={idx} style={{
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    background: l.isTotal ? 'rgba(56,189,248,0.1)' : l.isSubtotal ? 'rgba(255,255,255,0.04)' : 'transparent',
                    fontWeight: l.isTotal || l.isSubtotal ? 700 : 400
                  }}>
                    <td style={{ padding: '10px 20px', color: l.isTotal ? '#38bdf8' : l.isSubtotal ? '#fff' : '#cbd5e1' }}>{l.name}</td>
                    <td style={{ padding: '10px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: l.isTotal ? '#38bdf8' : '#fff' }}>{l.val}</td>
                    <td style={{ padding: '10px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#94a3b8' }}>{l.prev}</td>
                    <td style={{ padding: '10px 20px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: l.change.startsWith('+') ? '#10b981' : '#cbd5e1' }}>{l.change}</td>
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
