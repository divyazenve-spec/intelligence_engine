import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function CashFlow() {
  const [period, setPeriod] = useState('Current Quarter');

  const cashFlowLines = [];

  const bankAccounts = [];

  return (
    <DashboardLayout
      category="Finance & Accounting"
      subcategory="Cash Flow"
      title="Statement of Cash Flows (Cash Flow Statement)"
      subtitle="Direct & indirect operating cash conversion, clinical capital expenditures, and liquid cash runway"
      icon="💧"
      badge="Runway: 14.2 Months"
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => alert('Exporting Cash Flow model with weekly rolling liquidity...')}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              border: '1px solid #0ea5e9',
              background: 'rgba(14,165,233,0.15)',
              color: '#38bdf8',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            💧 Export Cash Flow
          </button>
        </div>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Closing Cash Balance" value="₹0" delta="+₹0 MTD" trend="neutral" subtext="HDFC + ICICI + Axis" icon="🏦" />
        <KpiCard label="Operating Cash (CFO)" value="+₹0" delta="Positive OCF" trend="neutral" subtext="Strong cash conversion" icon="⚡" />
        <KpiCard label="Free Cash Flow (FCF)" value="+₹0" delta="CFO - CAPEX" trend="neutral" subtext="Self-funding expansion" icon="💎" />
        <KpiCard label="Monthly Net Burn" value="₹0 (Profitable)" delta="Net Cash Flow +" trend="neutral" subtext="Self-sustaining" icon="🛡️" />
        <KpiCard label="Cash Runway" value="0 Months" delta="Zero dilution needed" trend="neutral" subtext="Conservative buffer" icon="⏳" />
        <KpiCard label="Operating Cash Ratio" value="0.0x" delta="High coverage" trend="neutral" subtext="CFO / Current Liab" icon="📈" />
      </div>

      <div style={{
        background: 'var(--card, #131d2e)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '22px 24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#fff' }}>🌊 Cash Flow Statement Waterfall</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Direct cash movement across operating, investing, and financing flows</p>
          </div>
          <span style={{ fontSize: '11px', padding: '3px 9px', borderRadius: '4px', background: 'rgba(16,185,129,0.15)', color: '#34d399', fontWeight: 600 }}>Audited Direct Method</span>
        </div>

        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.22)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <th style={{ padding: '10px 20px', textAlign: 'left', color: '#94a3b8' }}>Cash Activity & Category</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', color: '#94a3b8' }}>Flow Classification</th>
                <th style={{ padding: '10px 20px', textAlign: 'right', color: '#94a3b8' }}>Net Inflow / (Outflow)</th>
              </tr>
            </thead>
            <tbody>
              {cashFlowLines.map((row, idx) => {
                const isSub = row.type === 'subtotal';
                const isTot = row.type === 'total';
                return (
                  <tr key={idx} style={{
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    background: isTot ? 'rgba(56,189,248,0.1)' : isSub ? 'rgba(255,255,255,0.03)' : 'transparent',
                    fontWeight: isSub || isTot ? 700 : 400
                  }}>
                    <td style={{ padding: '11px 20px', color: isTot ? '#38bdf8' : isSub ? '#fff' : '#cbd5e1' }}>{row.item}</td>
                    <td style={{ padding: '11px 14px', fontSize: '11px', color: '#94a3b8' }}>{row.section}</td>
                    <td style={{
                      padding: '11px 20px',
                      textAlign: 'right',
                      fontFamily: '"IBM Plex Mono", monospace',
                      color: row.amt.startsWith('-') ? '#f87171' : isTot || isSub ? '#38bdf8' : '#34d399'
                    }}>
                      {row.amt}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bank Accounts & Treasury */}
      <div style={{
        background: 'var(--card, #131d2e)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '22px 24px'
      }}>
        <h3 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 700, color: '#fff' }}>🏦 Corporate Treasury & Institutional Banking Balances</h3>
        <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Real-time core banking balances integrated via RBI Account Aggregator network</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '14px' }}>
          {bankAccounts.map((b, idx) => (
            <div key={idx} style={{
              background: 'rgba(0,0,0,0.18)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '8px',
              padding: '14px 18px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <b style={{ color: '#38bdf8', fontSize: '13px' }}>{b.bank}</b>
                <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '4px', background: 'rgba(16,185,129,0.15)', color: '#34d399' }}>Live</span>
              </div>
              <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '8px' }}>
                Account: <span style={{ fontFamily: '"IBM Plex Mono", monospace', color: '#cbd5e1' }}>{b.acc}</span> · {b.type}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>Cleared Balance:</span>
                <span style={{ fontSize: '18px', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace', color: '#fff' }}>{b.bal}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
