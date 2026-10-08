import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function AccountsReceivable() {
  const [filterBucket, setFilterBucket] = useState('ALL');

  const debtors = [];

  const filteredDebtors = filterBucket === 'ALL' ? debtors : debtors.filter(d => d.bucket === filterBucket);

  return (
    <DashboardLayout
      category="Finance & Accounting"
      subcategory="Accounts Receivable"
      title="Accounts Receivable (AR) & Credit Ledger"
      subtitle="Corporate client aging schedules, Days Sales Outstanding (DSO), pet insurance TPA receivables, and automated collection notices"
      icon="📥"
      badge="DSO: 22 Days"
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => alert('Sending automated payment reminder WhatsApp/Email notices to overdue accounts...')}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              border: '1px solid #38bdf8',
              background: 'rgba(56,189,248,0.15)',
              color: '#38bdf8',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            📢 Send Reminders
          </button>
        </div>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Receivables (AR)" value="₹0" delta="0.0%" trend="neutral" subtext="No debtors" icon="📥" />
        <KpiCard label="Days Sales Outstanding (DSO)" value="0 Days" delta="0.0%" trend="neutral" subtext="Industry average benchmark" icon="⏱️" />
        <KpiCard label="Current (0–30 Days)" value="₹0" delta="0.0%" trend="neutral" subtext="Healthy collection" icon="🛡️" />
        <KpiCard label="31–60 Days Overdue" value="₹0" delta="0.0%" trend="neutral" subtext="Active follow-up" icon="⚡" />
        <KpiCard label="Overdue >60 Days" value="₹0" delta="0.0%" trend="neutral" subtext="Escalated collections" icon="🚨" />
        <KpiCard label="Bad Debt Provision" value="₹0" delta="0.0%" trend="neutral" subtext="Exceptionally low risk" icon="💎" />
      </div>

      <div style={{
        background: 'var(--card, #131d2e)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '22px 24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#fff' }}>📋 Trade Debtors & Corporate Receivables Schedule</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Outstanding dues by insurance TPAs, B2B wellness accounts, and partner clinics</p>
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            {['ALL', '0–30 Days', '31–60 Days', '61–90 Days', '90+ Days'].map(bucket => (
              <button
                key={bucket}
                onClick={() => setFilterBucket(bucket)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: filterBucket === bucket ? '#38bdf8' : 'rgba(255,255,255,0.03)',
                  color: filterBucket === bucket ? '#090e17' : '#94a3b8',
                  fontWeight: 600,
                  fontSize: '11px',
                  cursor: 'pointer'
                }}
              >
                {bucket}
              </button>
            ))}
          </div>
        </div>

        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.22)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <th style={{ padding: '10px 20px', textAlign: 'left', color: '#94a3b8' }}>Client / Institutional Debtor</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', color: '#94a3b8' }}>Account Type</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Total Due</th>
                <th style={{ padding: '10px 14px', textAlign: 'center', color: '#94a3b8' }}>Aging Bucket</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Client DSO</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Credit Limit</th>
                <th style={{ padding: '10px 20px', textAlign: 'right', color: '#94a3b8' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredDebtors.map((d, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 20px', color: '#fff', fontWeight: 600 }}>
                    <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '10px', color: '#38bdf8', marginRight: '6px' }}>{d.id}</span>
                    {d.client}
                  </td>
                  <td style={{ padding: '12px 14px', color: '#94a3b8' }}>{d.type}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#38bdf8' }}>{d.totalDue}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      background: d.bucket.includes('0–30') ? 'rgba(16,185,129,0.15)' : d.bucket.includes('31–60') ? 'rgba(56,189,248,0.15)' : d.bucket.includes('61–90') ? 'rgba(245,158,11,0.15)' : 'rgba(239,68,68,0.15)',
                      color: d.bucket.includes('0–30') ? '#34d399' : d.bucket.includes('31–60') ? '#38bdf8' : d.bucket.includes('61–90') ? '#fbbf24' : '#f87171'
                    }}>
                      {d.bucket}
                    </span>
                  </td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#cbd5e1' }}>{d.dso}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#94a3b8' }}>{d.creditLimit}</td>
                  <td style={{ padding: '12px 20px', textAlign: 'right' }}>
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '10px',
                      fontWeight: 600,
                      background: d.status.includes('Current') ? 'rgba(16,185,129,0.15)' : d.status.includes('Scheduled') ? 'rgba(56,189,248,0.15)' : d.status.includes('Warning') ? 'rgba(245,158,11,0.15)' : 'rgba(239,68,68,0.15)',
                      color: d.status.includes('Current') ? '#34d399' : d.status.includes('Scheduled') ? '#38bdf8' : d.status.includes('Warning') ? '#fbbf24' : '#f87171'
                    }}>
                      {d.status}
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
