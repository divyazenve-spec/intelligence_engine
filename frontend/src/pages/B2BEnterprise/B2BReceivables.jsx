import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function B2BReceivables() {
  const [agingFilter, setAgingFilter] = useState('ALL');

  const invoices = [];

  const filtered = agingFilter === 'ALL' ? invoices : invoices.filter(i => i.aging === agingFilter);

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="B2B / Enterprise"
      subcategory="B2B Receivables"
      title="B2B Accounts Receivable & Aging Ledger"
      subtitle="Corporate invoice aging buckets, DSO tracking, collections follow-up, and institutional credit risk"
      icon="💳"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Outstanding Receivables" value="₹0" delta="" trend="neutral" subtext="No active records" icon="💳" />
        <KpiCard label="Days Sales Outstanding (DSO)" value="0.0 Days" delta="" trend="neutral" subtext="No active records" icon="⏱️" />
        <KpiCard label="Current (0-30 Days)" value="₹0" delta="0.0%" trend="neutral" subtext="No active records" icon="✅" />
        <KpiCard label="Overdue (> 60 Days)" value="₹0" delta="0.0%" trend="neutral" subtext="No active records" icon="⚠️" />
      </div>

      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>Corporate Invoices & Aging Buckets</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Invoice ledger, due date tracking, payment terms, and recovery actions</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['ALL', '0-30 Days', '31-60 Days', '61-90 Days'].map(ag => (
              <button
                key={ag}
                onClick={() => setAgingFilter(ag)}
                style={{
                  padding: '6px 10px',
                  borderRadius: '6px',
                  border: '1px solid ' + (agingFilter === ag ? '#4f46e5' : 'var(--border, #cbd5e1)'),
                  background: agingFilter === ag ? 'rgba(79,70,229,0.1)' : 'transparent',
                  color: agingFilter === ag ? '#4338ca' : 'var(--muted-foreground, #64748b)',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {ag}
              </button>
            ))}
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)' }}>
                <th style={{ padding: '10px 12px' }}>Invoice #</th>
                <th style={{ padding: '10px 12px' }}>Client Organization</th>
                <th style={{ padding: '10px 12px' }}>Invoice Amount</th>
                <th style={{ padding: '10px 12px' }}>Due Date</th>
                <th style={{ padding: '10px 12px' }}>Aging Bucket</th>
                <th style={{ padding: '10px 12px' }}>Terms</th>
                <th style={{ padding: '10px 12px' }}>Recovery Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: '24px', textAlign: 'center', color: 'var(--muted-foreground, #64748b)' }}>
                    No B2B invoice records found
                  </td>
                </tr>
              ) : (
                filtered.map(i => (
                  <tr key={i.inv} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                    <td style={{ padding: '12px', fontFamily: 'monospace', fontWeight: 600 }}>{i.inv}</td>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{i.client}</td>
                    <td style={{ padding: '12px', fontWeight: 600, color: '#0f172a' }}>{i.amt}</td>
                    <td style={{ padding: '12px' }}>{i.dueDate}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        padding: '3px 8px',
                        borderRadius: '999px',
                        fontSize: '10px',
                        fontWeight: 600,
                        background: i.aging === '0-30 Days' ? 'rgba(16,185,129,0.12)' : i.aging === '31-60 Days' ? 'rgba(245,158,11,0.14)' : 'rgba(239,68,68,0.12)',
                        color: i.aging === '0-30 Days' ? '#059669' : i.aging === '31-60 Days' ? '#d97706' : '#dc2626'
                      }}>
                        {i.aging}
                      </span>
                    </td>
                    <td style={{ padding: '12px' }}>{i.terms}</td>
                    <td style={{ padding: '12px' }}>{i.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
