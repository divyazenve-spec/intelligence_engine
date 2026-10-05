import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function EmployeeExpenses() {
  const [filterCategory, setFilterCategory] = useState('ALL');

  const [claims, setClaims] = useState([
    { id: 'EXP-4011', empName: 'Dr. Priya Sharma', role: 'Chief Vet Officer', category: 'Medical & Diagnostic Supplies', date: '02 Oct 2026', amount: '₹14,250', merchant: 'SurgiCare India', receipt: 'Verified (GST Invoice) 🧾', status: 'Approved' },
    { id: 'EXP-4012', empName: 'Vikram Joshi', role: 'Fleet Lead', category: 'Fuel & Fleet Maintenance', date: '01 Oct 2026', amount: '₹8,400', merchant: 'HPCL Koramangala', receipt: 'Fuel Slips Attached 🧾', status: 'Approved' },
    { id: 'EXP-4013', empName: 'Dr. Rahul Mehta', role: 'Senior Vet Surgeon', category: 'Travel & Accommodation', date: '30 Sep 2026', amount: '₹18,500', merchant: 'IndiGo Airlines (BLR-BOM)', receipt: 'Boarding Pass & Invoice 🧾', status: 'Pending' },
    { id: 'EXP-4014', empName: 'Sneha Chawla', role: 'Senior AI Engineer', category: 'Software & Cloud Tools', date: '28 Sep 2026', amount: '₹6,200', merchant: 'GitHub Copilot & Cursor Pro', receipt: 'Digital Receipt 🧾', status: 'Approved' },
    { id: 'EXP-4015', empName: 'Manish Rawat', role: 'Express Rider', category: 'Mobile & Data Allowance', date: '27 Sep 2026', amount: '₹999', merchant: 'Jio 5G Business Plan', receipt: 'Phone Bill 🧾', status: 'Approved' },
    { id: 'EXP-4016', empName: 'Pooja Hegde', role: 'Support Team Lead', category: 'Team Engagement / Meals', date: '25 Sep 2026', amount: '₹4,500', merchant: 'Swiggy for Work', receipt: 'Itemized Receipt 🧾', status: 'Pending' }
  ]);

  function handleAction(id, newStatus) {
    setClaims(claims.map(c => c.id === id ? { ...c, status: newStatus } : c));
  }

  const filtered = claims.filter(c => {
    if (filterCategory === 'ALL') return true;
    return c.category.includes(filterCategory);
  });

  return (
    <DashboardLayout
      category="Employees & HR"
      subcategory="Employee Expenses"
      title="Expense Reimbursements & Financial Disbursals"
      subtitle="Corporate travel, clinical consumable claims, fuel stipends, software subscriptions, and tax invoice audits"
      icon="🧾"
      badge="2 Pending Approvals · ₹52,849 Processed"
    >
      {/* Top Level KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Monthly Claims Disbursed" value="₹4,28,400" delta="100% within budget" trend="neutral" subtext="Across all 6 divisions" icon="💵" />
        <KpiCard label="Pending Approval Queue" value="2 Claims" delta="₹23,000 value" trend="neutral" subtext="Avg manager SLA: 18h" icon="⏳" />
        <KpiCard label="GST Input Credit Reclaimed" value="₹65,300" delta="18% blended GST" trend="up" subtext="Direct tax savings for Zenve" icon="🏛️" />
        <KpiCard label="Policy Compliance Rate" value="99.2%" delta="Zero fraud detected" trend="up" subtext="Automated OCR receipt scan" icon="🛡️" />
      </div>

      {/* Expense Filter Bar */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)', fontWeight: 600 }}>Category Filter:</span>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {['ALL', 'Medical', 'Fuel', 'Travel', 'Software', 'Meals'].map(c => (
              <button
                key={c}
                onClick={() => setFilterCategory(c)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: '1px solid',
                  borderColor: filterCategory === c ? '#3b82f6' : 'rgba(255,255,255,0.1)',
                  background: filterCategory === c ? '#3b82f6' : 'transparent',
                  color: filterCategory === c ? '#fff' : 'var(--muted-foreground, #94a3b8)'
                }}
              >
                {c === 'ALL' ? 'All Categories' : c}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => alert('New reimbursement claim modal launched.')}
          style={{
            padding: '6px 14px',
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            border: 'none',
            background: '#3b82f6',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <span>➕</span> Submit Expense Claim
        </button>
      </div>

      {/* Expense Claims Table */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        overflow: 'hidden'
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Employee Expense Claims ({filtered.length})</h3>
          <span style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)' }}>Audited for IT &amp; GST compliance</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)', color: 'var(--muted-foreground, #94a3b8)' }}>
                <th style={{ padding: '12px 16px' }}>Claim ID</th>
                <th style={{ padding: '12px 16px' }}>Employee</th>
                <th style={{ padding: '12px 16px' }}>Category</th>
                <th style={{ padding: '12px 16px' }}>Date</th>
                <th style={{ padding: '12px 16px' }}>Merchant / Vendor</th>
                <th style={{ padding: '12px 16px' }}>Amount</th>
                <th style={{ padding: '12px 16px' }}>Receipt Proof</th>
                <th style={{ padding: '12px 16px' }}>Status</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', color: '#93c5fd' }}>{c.id}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ fontWeight: 600, color: '#f8fafc' }}>{c.empName}</div>
                    <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)' }}>{c.role}</div>
                  </td>
                  <td style={{ padding: '12px 16px', color: '#cbd5e1' }}>{c.category}</td>
                  <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', color: 'var(--muted-foreground, #94a3b8)' }}>{c.date}</td>
                  <td style={{ padding: '12px 16px', color: '#cbd5e1' }}>{c.merchant}</td>
                  <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#34d399' }}>{c.amount}</td>
                  <td style={{ padding: '12px 16px', fontSize: '11px', color: '#93c5fd' }}>{c.receipt}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '99px',
                      fontSize: '10px',
                      fontWeight: 700,
                      background: c.status === 'Approved' ? 'rgba(16,185,129,0.15)' : c.status === 'Pending' ? 'rgba(234,179,8,0.15)' : 'rgba(239,68,68,0.15)',
                      color: c.status === 'Approved' ? '#10b981' : c.status === 'Pending' ? '#eab308' : '#ef4444'
                    }}>
                      ● {c.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    {c.status === 'Pending' ? (
                      <div style={{ display: 'inline-flex', gap: '6px' }}>
                        <button
                          onClick={() => handleAction(c.id, 'Approved')}
                          style={{
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '10px',
                            fontWeight: 700,
                            background: '#10b981',
                            color: '#fff',
                            border: 'none',
                            cursor: 'pointer'
                          }}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleAction(c.id, 'Rejected')}
                          style={{
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '10px',
                            fontWeight: 700,
                            background: '#ef4444',
                            color: '#fff',
                            border: 'none',
                            cursor: 'pointer'
                          }}
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)' }}>Reimbursed</span>
                    )}
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
