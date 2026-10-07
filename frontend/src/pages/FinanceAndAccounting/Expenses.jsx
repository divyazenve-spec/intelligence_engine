import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function Expenses() {
  const [costCenter, setCostCenter] = useState('ALL');

  const expenseBreakdown = [];

  const recentExpenseApprovals = [];

  return (
    <DashboardLayout
      category="Finance & Accounting"
      subcategory="Expenses"
      title="Operating Expenses (OPEX) Control & Ledger"
      subtitle="Departmental cost centers, monthly budget variance, automated expense approvals, and facility overheads"
      icon="🏢"
      badge="Total OPEX: ₹0"
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => alert('New expense voucher requisition initiated.')}
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
            + New Expense Voucher
          </button>
        </div>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Monthly OPEX" value="₹0" delta="+2.5% vs Plan" trend="up" subtext="35.9% of Revenue" icon="🏢" />
        <KpiCard label="Clinical Staffing Payroll" value="₹0" delta="54.6% of OPEX" trend="up" subtext="Doctors, Nurses, Care" icon="👨‍⚕️" />
        <KpiCard label="Facility Rental Leases" value="₹0" delta="22.0% of OPEX" trend="up" subtext="14 Network locations" icon="📍" />
        <KpiCard label="Marketing & CAC" value="₹0" delta="-7.1% under plan" trend="up" subtext="Blended CAC: ₹0" icon="📣" />
        <KpiCard label="Hospital Utilities" value="₹0" delta="+9.1% (Oxygen load)" trend="down" subtext="Bio-waste + power" icon="⚡" />
        <KpiCard label="Budget Adherence" value="0.0%" delta="High compliance" trend="up" subtext="Within ±5% variance" icon="🛡️" />
      </div>

      <div style={{
        background: 'var(--card, #131d2e)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '22px 24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#fff' }}>📋 Departmental OPEX Cost Centers</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Actual disbursements vs approved financial budget allocation</p>
          </div>
          <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>Active Controls</span>
        </div>

        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.22)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <th style={{ padding: '10px 20px', textAlign: 'left', color: '#94a3b8' }}>Code & Line Item</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', color: '#94a3b8' }}>Cost Center</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Approved Budget</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Actual Spend</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Variance</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>% of OPEX</th>
                <th style={{ padding: '10px 20px', textAlign: 'right', color: '#94a3b8' }}>Compliance</th>
              </tr>
            </thead>
            <tbody>
              {expenseBreakdown.map((e, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 20px', color: '#fff', fontWeight: 600 }}>
                    <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '10px', color: '#64748b', marginRight: '8px' }}>{e.code}</span>
                    {e.name}
                  </td>
                  <td style={{ padding: '12px 14px', color: '#38bdf8' }}>{e.cc}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#94a3b8' }}>{e.budget}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#f87171', fontWeight: 700 }}>{e.actual}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: e.var.startsWith('-') ? '#10b981' : e.var === '0.0%' ? '#94a3b8' : '#fbbf24' }}>
                    {e.var}
                  </td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#cbd5e1' }}>{e.pct}</td>
                  <td style={{ padding: '12px 20px', textAlign: 'right' }}>
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '10px',
                      fontWeight: 600,
                      background: e.status === 'Favorable' || e.status === 'Fixed' ? 'rgba(16,185,129,0.15)' : e.status === 'Review' ? 'rgba(245,158,11,0.15)' : 'rgba(56,189,248,0.15)',
                      color: e.status === 'Favorable' || e.status === 'Fixed' ? '#34d399' : e.status === 'Review' ? '#fbbf24' : '#38bdf8'
                    }}>
                      {e.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Expense Approvals */}
      <div style={{
        background: 'var(--card, #131d2e)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '22px 24px'
      }}>
        <h3 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 700, color: '#fff' }}>📑 Expense Requisitions & Approvals Audit</h3>
        <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Recent corporate card and procurement requisitions verified against delegation of powers (DoP)</p>

        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.22)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <th style={{ padding: '10px 20px', textAlign: 'left', color: '#94a3b8' }}>Requisition ID</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', color: '#94a3b8' }}>Description</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', color: '#94a3b8' }}>Facility / Department</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Amount</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', color: '#94a3b8' }}>Requester & Approver</th>
                <th style={{ padding: '10px 20px', textAlign: 'right', color: '#94a3b8' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentExpenseApprovals.map((req, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 20px', fontFamily: '"IBM Plex Mono", monospace', color: '#38bdf8' }}>{req.id}</td>
                  <td style={{ padding: '12px 14px', color: '#fff', fontWeight: 600 }}>{req.desc}</td>
                  <td style={{ padding: '12px 14px', color: '#94a3b8' }}>{req.dept}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#f87171' }}>{req.amt}</td>
                  <td style={{ padding: '12px 14px', color: '#cbd5e1' }}>
                    <b>{req.requester}</b><br />
                    <span style={{ fontSize: '10px', color: '#64748b' }}>Appr: {req.approver}</span>
                  </td>
                  <td style={{ padding: '12px 20px', textAlign: 'right' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '4px', background: 'rgba(16,185,129,0.15)', color: '#34d399', fontSize: '11px', fontWeight: 600 }}>{req.status}</span>
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
