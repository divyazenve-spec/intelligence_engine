import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function CorporateAccounts() {
  const [statusFilter, setStatusFilter] = useState('ALL');

  const accounts = [];

  const filtered = statusFilter === 'ALL' ? accounts : accounts.filter(a => a.risk.toLowerCase().includes(statusFilter.toLowerCase()));

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="B2B / Enterprise"
      subcategory="Corporate Accounts"
      title="Corporate Account Master & Credit Limits"
      subtitle="Corporate KYC compliance, GSTIN master, credit sanctions, and relationship manager assignments"
      icon="🏛️"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Sanctioned Credit" value="₹0" delta="" trend="neutral" subtext="No active records" icon="🏛️" />
        <KpiCard label="Active Credit Utilization" value="0.0%" delta="0.0%" trend="neutral" subtext="No active records" icon="📊" />
        <KpiCard label="Weighted Avg Payment Terms" value="0.0 Days" delta="" trend="neutral" subtext="No active records" icon="⏱️" />
        <KpiCard label="KYC & GST Compliance" value="0.0%" delta="" trend="neutral" subtext="No active records" icon="✅" />
      </div>

      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>Corporate Credit & Account Ledger</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Credit sanctions, current balances, and relationship managers</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['ALL', 'Low', 'Medium'].map(st => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                style={{
                  padding: '6px 10px',
                  borderRadius: '6px',
                  border: '1px solid ' + (statusFilter === st ? '#4f46e5' : 'var(--border, #cbd5e1)'),
                  background: statusFilter === st ? 'rgba(79,70,229,0.1)' : 'transparent',
                  color: statusFilter === st ? '#4338ca' : 'var(--muted-foreground, #64748b)',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {st === 'ALL' ? 'All Risks' : st + ' Risk'}
              </button>
            ))}
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)' }}>
                <th style={{ padding: '10px 12px' }}>Account Code</th>
                <th style={{ padding: '10px 12px' }}>Corporate Entity</th>
                <th style={{ padding: '10px 12px' }}>GSTIN</th>
                <th style={{ padding: '10px 12px' }}>Sanctioned Limit</th>
                <th style={{ padding: '10px 12px' }}>Utilized Balance</th>
                <th style={{ padding: '10px 12px' }}>Terms</th>
                <th style={{ padding: '10px 12px' }}>Account RM</th>
                <th style={{ padding: '10px 12px' }}>Risk Rating</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ padding: '24px', textAlign: 'center', color: 'var(--muted-foreground, #64748b)' }}>
                    No corporate account records found
                  </td>
                </tr>
              ) : (
                filtered.map(acc => (
                  <tr key={acc.code} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                    <td style={{ padding: '12px', fontFamily: 'monospace', fontWeight: 600 }}>{acc.code}</td>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{acc.org}</td>
                    <td style={{ padding: '12px', fontFamily: 'monospace' }}>{acc.gst}</td>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{acc.creditLimit}</td>
                    <td style={{ padding: '12px', color: '#4338ca', fontWeight: 600 }}>{acc.usedCredit}</td>
                    <td style={{ padding: '12px' }}>{acc.paymentTerms}</td>
                    <td style={{ padding: '12px' }}>{acc.rm}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        padding: '3px 8px',
                        borderRadius: '999px',
                        fontSize: '10px',
                        fontWeight: 600,
                        background: acc.risk.includes('Low') ? 'rgba(16,185,129,0.12)' : 'rgba(245,158,11,0.14)',
                        color: acc.risk.includes('Low') ? '#059669' : '#d97706'
                      }}>
                        {acc.risk}
                      </span>
                    </td>
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
