import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function CorporateAccounts() {
  const [statusFilter, setStatusFilter] = useState('ALL');

  const accounts = [
    { code: 'ACC-CRP-01', org: 'PetCare Hospital Network Ltd', pan: 'AAACP8912K', gst: '29AAACP8912K1Z8', creditLimit: '₹30,00,000', usedCredit: '₹14,50,000', paymentTerms: 'Net 30', rm: 'Vikram Mehta', risk: 'Low' },
    { code: 'ACC-CRP-02', org: 'K-9 Paramilitary Security Training', pan: 'GOVK91234F', gst: '07GOVK91234F1Z2', creditLimit: '₹25,00,000', usedCredit: '₹8,40,000', paymentTerms: 'Net 60', rm: 'Vikram Mehta', risk: 'Low (Govt)' },
    { code: 'ACC-CRP-03', org: 'Bangalore Canine Breeding Co-op', pan: 'AAGCB5544R', gst: '29AAGCB5544R1Z5', creditLimit: '₹15,00,000', usedCredit: '₹11,20,000', paymentTerms: 'Net 45', rm: 'Aarav Sen', risk: 'Medium' },
    { code: 'ACC-CRP-04', org: 'Airports Authority Canine Unit', pan: 'AAIAA1001A', gst: '29AAIAA1001A1Z9', creditLimit: '₹20,00,000', usedCredit: '₹4,90,000', paymentTerms: 'Net 60', rm: 'Vikram Mehta', risk: 'Low (Govt)' },
    { code: 'ACC-CRP-05', org: 'Urban Mutts Luxury Hospitality', pan: 'AAHUM7766P', gst: '27AAHUM7766P1Z3', creditLimit: '₹10,00,000', usedCredit: '₹6,80,000', paymentTerms: 'Net 30', rm: 'Sneha Rao', risk: 'Low' },
    { code: 'ACC-CRP-06', org: 'Infosys Corp Employee Wellness', pan: 'AAAIC3344M', gst: '29AAAIC3344M1Z4', creditLimit: '₹12,00,000', usedCredit: '₹2,50,000', paymentTerms: 'Net 30', rm: 'Sneha Rao', risk: 'Low' }
  ];

  const filtered = statusFilter === 'ALL' ? accounts : accounts.filter(a => a.risk.toLowerCase().includes(statusFilter.toLowerCase()));

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="B2B / Enterprise"
      subcategory="Corporate Accounts"
      title="Corporate Account Master & Credit Limits"
      subtitle="Corporate KYC compliance, GSTIN master, credit sanctions, and relationship manager assignments"
      icon="🏛️"
      badge="₹1.12 Cr Sanctioned"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Sanctioned Credit" value="₹1.12 Crore" delta="Across 48 accounts" trend="up" subtext="Revolving commercial credit" icon="🏛️" />
        <KpiCard label="Active Credit Utilization" value="43.2%" delta="₹48.3L drawn" trend="up" subtext="Healthy safety margin" icon="📊" />
        <KpiCard label="Weighted Avg Payment Terms" value="38.5 Days" delta="Target < 45" trend="up" subtext="Commercial terms compliance" icon="⏱️" />
        <KpiCard label="KYC & GST Compliance" value="100%" delta="All 48 verified" trend="up" subtext="Active GST e-invoicing" icon="✅" />
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
              {filtered.map(acc => (
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
