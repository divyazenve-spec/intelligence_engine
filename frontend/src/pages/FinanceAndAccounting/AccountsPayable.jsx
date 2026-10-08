import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function AccountsPayable() {
  const [vendorFilter, setVendorFilter] = useState('ALL');

  const payables = [];

  return (
    <DashboardLayout
      category="Finance & Accounting"
      subcategory="Accounts Payable"
      title="Accounts Payable (AP) & Vendor Settlements"
      subtitle="Vendor credit terms, Days Payable Outstanding (DPO), automated 3-way matching, and scheduled corporate disbursements"
      icon="📤"
      badge="DPO: 34 Days"
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => alert('Initiating verified NEFT/RTGS batch disbursement for approved vendor invoices...')}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              border: '1px solid #10b981',
              background: 'rgba(16,185,129,0.15)',
              color: '#34d399',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            💳 Execute NEFT Batch Run
          </button>
        </div>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Payables (AP)" value="₹0" delta="Optimal working cap" trend="neutral" subtext="No vendors" icon="📤" />
        <KpiCard label="Days Payable Outstanding (DPO)" value="0 Days" delta="--" trend="neutral" subtext="Vendor terms maximized" icon="⏱️" />
        <KpiCard label="Approved for Immediate Run" value="₹0" delta="0.0%" trend="neutral" subtext="Full match verified" icon="✅" />
        <KpiCard label="Early Settlement Discounts" value="₹0" delta="--" trend="neutral" subtext="Cash savings captured" icon="🎁" />
        <KpiCard label="Pending GRN Match" value="₹0" delta="--" trend="neutral" subtext="Warehouse verification" icon="🔍" />
        <KpiCard label="Disputed Invoices" value="₹0" delta="--" trend="neutral" subtext="Biohazard waste billing" icon="⚠️" />
      </div>

      <div style={{
        background: 'var(--card, #131d2e)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '22px 24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#fff' }}>📑 Trade Creditors & Supplier Settlement Queue</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>3-way matching verified against Purchase Order (PO) and Goods Receipt Note (GRN)</p>
          </div>
          <span style={{ fontSize: '11px', color: '#38bdf8', fontWeight: 600 }}>Batch Rail: CMS-NEFT</span>
        </div>

        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.22)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <th style={{ padding: '10px 20px', textAlign: 'left', color: '#94a3b8' }}>Vendor / Supplier</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', color: '#94a3b8' }}>Category</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Balance Due</th>
                <th style={{ padding: '10px 14px', textAlign: 'center', color: '#94a3b8' }}>Credit Terms</th>
                <th style={{ padding: '10px 14px', textAlign: 'center', color: '#94a3b8' }}>Maturity Due</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Early Cash Discount</th>
                <th style={{ padding: '10px 20px', textAlign: 'right', color: '#94a3b8' }}>Verification Status</th>
              </tr>
            </thead>
            <tbody>
              {payables.length === 0 ? (<tr><td colSpan="8" style={{ textAlign: "center", padding: "32px", color: "var(--muted-foreground, #64748b)" }}>No accounts payable records found</td></tr>) : payables.map((p, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 20px', color: '#fff', fontWeight: 600 }}>
                    <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '10px', color: '#38bdf8', marginRight: '6px' }}>{p.id}</span>
                    {p.vendor}
                  </td>
                  <td style={{ padding: '12px 14px', color: '#94a3b8' }}>{p.category}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#f87171' }}>{p.balance}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'center', color: '#cbd5e1' }}>{p.terms}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'center', fontFamily: '"IBM Plex Mono", monospace', color: p.dueIn === 'Overdue' ? '#f87171' : '#38bdf8' }}>{p.dueIn}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#10b981' }}>{p.earlyDiscount}</td>
                  <td style={{ padding: '12px 20px', textAlign: 'right' }}>
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '10px',
                      fontWeight: 600,
                      background: p.status.includes('Approved') || p.status.includes('Scheduled') ? 'rgba(16,185,129,0.15)' : p.status.includes('Urgent') ? 'rgba(239,68,68,0.15)' : 'rgba(245,158,11,0.15)',
                      color: p.status.includes('Approved') || p.status.includes('Scheduled') ? '#34d399' : p.status.includes('Urgent') ? '#f87171' : '#fbbf24'
                    }}>
                      {p.status}
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
