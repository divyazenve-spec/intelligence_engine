import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function FinanceDashboard() {
  const [period, setPeriod] = useState('Month to Date');

  const pnlSummary = [];

  const agingBuckets = [];

  const recentTransactions = [];

  return (
    <DashboardLayout
      category="Finance & Accounting"
      subcategory="Finance Dashboard"
      title="Financial Intelligence & Executive Control Center"
      subtitle="Network-wide GAAP profit and loss, operating liquidity, working capital aging, and statutory tax compliance"
      icon="💰"
      badge=""
      actions={
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', padding: '3px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
            {['Month to Date', 'Quarter to Date', 'FY 2026-27'].map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: period === p ? '#3b82f6' : 'transparent',
                  color: period === p ? '#fff' : '#94a3b8'
                }}
              >
                {p}
              </button>
            ))}
          </div>
          <button
            onClick={() => alert('Downloading Executive Audited Financial Pack (PDF + Excel)...')}
            style={{
              padding: '7px 14px',
              borderRadius: '8px',
              border: '1px solid #3b82f6',
              background: 'rgba(59,130,246,0.15)',
              color: '#60a5fa',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            📥 Export Financial Pack
          </button>
        </div>
      }
    >
      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Gross Invoiced Revenue" value="₹0" delta="0.0%" trend="neutral" subtext="All channels" icon="💰" />
        <KpiCard label="Net Operating EBITDA" value="₹0" delta="0.0%" trend="neutral" subtext="Operating surplus" icon="⚡" />
        <KpiCard label="Net Profit (PAT)" value="₹0" delta="0.0%" trend="neutral" subtext="Post tax & depreciation" icon="🏆" />
        <KpiCard label="Cash & Bank Balances" value="₹0" delta="--" trend="neutral" subtext="Zero short-term debt" icon="🏦" />
        <KpiCard label="Accounts Receivable (AR)" value="₹0" delta="0.0%" trend="neutral" subtext="Aging status" icon="📥" />
        <KpiCard label="Accounts Payable (AP)" value="₹0" delta="0.0%" trend="neutral" subtext="Optimal working capital" icon="📤" />
      </div>

      {/* Grid: P&L Statement and Working Capital Aging */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', gap: '20px' }}>
        {/* P&L Statement */}
        <div style={{
          background: 'var(--card, #131d2e)',
          border: '1px solid var(--border, rgba(255,255,255,0.08))',
          borderRadius: '12px',
          padding: '22px 24px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#fff' }}>📊 Executive Profit & Loss Summary</h3>
              <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Management GAAP accounts for {period}</p>
            </div>
            <span style={{ fontSize: '11px', padding: '3px 9px', borderRadius: '6px', background: 'rgba(16,185,129,0.15)', color: '#34d399', fontWeight: 600 }}>Audited Accrual</span>
          </div>

          <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr style={{ background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <th style={{ padding: '10px 20px', textAlign: 'left', color: '#94a3b8' }}>Financial Metric</th>
                  <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>MTD Actual</th>
                  <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>FY Budget</th>
                  <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Variance</th>
                  <th style={{ padding: '10px 20px', textAlign: 'right', color: '#94a3b8' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {pnlSummary.map((item, idx) => {
                  const isHighlight = item.metric.includes('EBITDA') || item.metric.includes('Gross Profit') || item.metric.includes('Net Profit After Tax');
                  return (
                    <tr key={idx} style={{
                      borderBottom: '1px solid rgba(255,255,255,0.04)',
                      background: isHighlight ? 'rgba(56,189,248,0.05)' : 'transparent',
                      fontWeight: isHighlight ? 700 : 400
                    }}>
                      <td style={{ padding: '11px 20px', color: isHighlight ? '#38bdf8' : '#f8fafc' }}>{item.metric}</td>
                      <td style={{ padding: '11px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{item.mtd}</td>
                      <td style={{ padding: '11px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#94a3b8' }}>{item.budget}</td>
                      <td style={{ padding: '11px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: item.status === 'Favorable' ? '#10b981' : item.status === 'Caution' ? '#f59e0b' : '#38bdf8' }}>
                        {item.var}
                      </td>
                      <td style={{ padding: '11px 20px', textAlign: 'right' }}>
                        <span style={{
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontSize: '10px',
                          fontWeight: 600,
                          background: item.status === 'Favorable' ? 'rgba(16,185,129,0.15)' : item.status === 'Caution' ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.08)',
                          color: item.status === 'Favorable' ? '#34d399' : item.status === 'Caution' ? '#fbbf24' : '#cbd5e1'
                        }}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Working Capital & Aging Buckets */}
        <div style={{
          background: 'var(--card, #131d2e)',
          border: '1px solid var(--border, rgba(255,255,255,0.08))',
          borderRadius: '12px',
          padding: '22px 24px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#fff' }}>⚖️ Working Capital & Aging Profile</h3>
              <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Receivables vs Payables maturity schedule</p>
            </div>
            <button
              onClick={() => alert('Initiating working capital reconciliation')}
              style={{ padding: '5px 12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: '#cbd5e1', fontSize: '11px', cursor: 'pointer' }}
            >
              Reconcile Ledgers
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {agingBuckets.map((b, idx) => (
              <div key={idx} style={{
                background: 'rgba(0,0,0,0.18)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '8px',
                padding: '12px 16px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <b style={{ color: '#fff', fontSize: '12px' }}>{b.bucket}</b>
                  <span style={{
                    fontSize: '10px',
                    padding: '2px 7px',
                    borderRadius: '4px',
                    background: b.risk === 'Low' ? 'rgba(16,185,129,0.15)' : b.risk === 'Medium' ? 'rgba(245,158,11,0.15)' : 'rgba(239,68,68,0.15)',
                    color: b.risk === 'Low' ? '#34d399' : b.risk === 'Medium' ? '#fbbf24' : '#f87171'
                  }}>
                    {b.risk} Risk
                  </span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '11px' }}>
                  <div>
                    <span style={{ color: '#94a3b8' }}>Receivables (AR):</span>{' '}
                    <strong style={{ color: '#38bdf8', fontFamily: '"IBM Plex Mono", monospace' }}>{b.ar}</strong>
                    <span style={{ color: '#64748b', marginLeft: '6px' }}>({b.arPct})</span>
                  </div>
                  <div>
                    <span style={{ color: '#94a3b8' }}>Payables (AP):</span>{' '}
                    <strong style={{ color: '#fbbf24', fontFamily: '"IBM Plex Mono", monospace' }}>{b.ap}</strong>
                    <span style={{ color: '#64748b', marginLeft: '6px' }}>({b.apPct})</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent High-Value Financial Ledger Transactions */}
      <div style={{
        background: 'var(--card, #131d2e)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '22px 24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#fff' }}>💳 Recent High-Value General Ledger Transactions</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Audited corporate treasury inflows and outflows</p>
          </div>
          <span style={{ fontSize: '11px', color: '#94a3b8' }}>Real-time Core Banking Sync</span>
        </div>

        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <th style={{ padding: '10px 20px', textAlign: 'left', color: '#94a3b8' }}>Reference ID</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', color: '#94a3b8' }}>Category & Description</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', color: '#94a3b8' }}>Counterparty / Entity</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Amount</th>
                <th style={{ padding: '10px 14px', textAlign: 'center', color: '#94a3b8' }}>Payment Rail</th>
                <th style={{ padding: '10px 20px', textAlign: 'right', color: '#94a3b8' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((tx, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 20px', fontFamily: '"IBM Plex Mono", monospace', color: '#38bdf8', fontWeight: 600 }}>{tx.id}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <b>{tx.type}</b><br />
                    <span style={{ fontSize: '11px', color: '#94a3b8' }}>{tx.desc}</span>
                  </td>
                  <td style={{ padding: '12px 14px', color: '#cbd5e1' }}>{tx.party}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: tx.type.includes('Collection') ? '#10b981' : '#f87171' }}>
                    {tx.type.includes('Collection') ? `+${tx.amt}` : `-${tx.amt}`}
                  </td>
                  <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', fontSize: '11px', color: '#94a3b8' }}>{tx.mode}</span>
                  </td>
                  <td style={{ padding: '12px 20px', textAlign: 'right' }}>
                    <span style={{ padding: '3px 9px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, background: 'rgba(16,185,129,0.15)', color: '#34d399' }}>
                      {tx.status}
                    </span>
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
