import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function B2BReceivables() {
  const [agingFilter, setAgingFilter] = useState('ALL');

  const invoices = [
    { inv: 'INV-B2B-9101', client: 'PetCare Hospital Network', amt: '₹3,45,000', dueDate: '2026-10-25', aging: '0-30 Days', status: 'Current (Unpaid)', terms: 'Net 30' },
    { inv: 'INV-B2B-9088', client: 'K-9 Paramilitary Kennels', amt: '₹2,80,000', dueDate: '2026-11-15', aging: '0-30 Days', status: 'Current (Govt Audit)', terms: 'Net 60' },
    { inv: 'INV-B2B-9042', client: 'Bangalore Canine Breeding Co-op', amt: '₹1,95,000', dueDate: '2026-09-28', aging: '31-60 Days', status: 'Follow-up Sent', terms: 'Net 45' },
    { inv: 'INV-B2B-9011', client: 'Urban Mutts Luxury Hospitality', amt: '₹1,12,000', dueDate: '2026-10-18', aging: '0-30 Days', status: 'Current (Unpaid)', terms: 'Net 30' },
    { inv: 'INV-B2B-8994', client: 'Airports Authority Canine Unit', amt: '₹1,65,000', dueDate: '2026-10-02', aging: '0-30 Days', status: 'Processing Release', terms: 'Net 60' },
    { inv: 'INV-B2B-8872', client: 'Western India Shelter Network', amt: '₹68,000', dueDate: '2026-08-15', aging: '61-90 Days', status: 'Escalated / Grace', terms: 'Net 30' }
  ];

  const filtered = agingFilter === 'ALL' ? invoices : invoices.filter(i => i.aging === agingFilter);

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="B2B / Enterprise"
      subcategory="B2B Receivables"
      title="B2B Accounts Receivable & Aging Ledger"
      subtitle="Corporate invoice aging buckets, DSO tracking, collections follow-up, and institutional credit risk"
      icon="💳"
      badge="₹12.40L Outstanding"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Outstanding Receivables" value="₹12.40 Lakh" delta="6 Accounts" trend="up" subtext="All within approved limits" icon="💳" />
        <KpiCard label="Days Sales Outstanding (DSO)" value="34.2 Days" delta="-4.1 days improvement" trend="up" subtext="Target < 40 days" icon="⏱️" />
        <KpiCard label="Current (0-30 Days)" value="₹9.02 Lakh" delta="72.7% of total" trend="up" subtext="Healthy debt profile" icon="✅" />
        <KpiCard label="Overdue (> 60 Days)" value="₹68,000" delta="5.5% of total" trend="warn" subtext="1 account in grace period" icon="⚠️" />
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
              {filtered.map(i => (
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
