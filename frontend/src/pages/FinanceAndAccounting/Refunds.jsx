import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function Refunds() {
  const [filterReason, setFilterReason] = useState('ALL');

  const refunds = [];

  return (
    <DashboardLayout
      category="Finance & Accounting"
      subcategory="Refunds"
      title="Refunds, Reversals & Dispute Resolution"
      subtitle="Chargeback dispute defense, automated reversal processing, medication return audit, and customer credit ledger"
      icon="🔄"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Processed Refunds" value="₹0" delta="--" trend="neutral" subtext="No refunds recorded" icon="🔄" />
        <KpiCard label="Cancelled OPD Consults" value="₹0" delta="--" trend="neutral" subtext="No cancellations" icon="📅" />
        <KpiCard label="Pharmacy Sealed Returns" value="₹0" delta="--" trend="neutral" subtext="No returns" icon="💊" />
        <KpiCard label="Duplicate POS Swipes" value="₹0" delta="--" trend="neutral" subtext="No reversals" icon="💳" />
        <KpiCard label="Avg Dispute TAT" value="--" delta="--" trend="neutral" subtext="No disputes" icon="⏱️" />
        <KpiCard label="Chargeback Loss Rate" value="0.0%" delta="--" trend="neutral" subtext="0 chargebacks" icon="🛡️" />
      </div>

      <div style={{
        background: 'var(--card, #131d2e)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '22px 24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#fff' }}>📋 Customer Refunds & Disputed Reversals Log</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Audited clinical refunds linked directly to original tax invoices</p>
          </div>
          <span style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)', fontWeight: 600 }}>0 Active Disputes</span>
        </div>

        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.22)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <th style={{ padding: '10px 20px', textAlign: 'left', color: '#94a3b8' }}>Refund ID</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', color: '#94a3b8' }}>Original Invoice</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', color: '#94a3b8' }}>Pet Parent & Pet</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Refund Amount</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', color: '#94a3b8' }}>Clinical Reason</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', color: '#94a3b8' }}>Settlement Channel</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', color: '#94a3b8' }}>Processed At</th>
                <th style={{ padding: '10px 20px', textAlign: 'right', color: '#94a3b8' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {refunds.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '24px', color: '#94a3b8' }}>
                    No refund records found
                  </td>
                </tr>
              ) : (
                refunds.map((r, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '12px 20px', fontFamily: '"IBM Plex Mono", monospace', color: '#f87171', fontWeight: 600 }}>{r.id}</td>
                    <td style={{ padding: '12px 14px', fontFamily: '"IBM Plex Mono", monospace', color: '#38bdf8' }}>{r.invId}</td>
                    <td style={{ padding: '12px 14px', color: '#fff', fontWeight: 600 }}>{r.client}</td>
                    <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#f87171' }}>{r.amt}</td>
                    <td style={{ padding: '12px 14px', color: '#cbd5e1' }}>{r.reason}</td>
                    <td style={{ padding: '12px 14px', color: '#94a3b8' }}>{r.rail}</td>
                    <td style={{ padding: '12px 14px', color: '#94a3b8' }}>{r.time}</td>
                    <td style={{ padding: '12px 20px', textAlign: 'right' }}>
                      <span style={{ padding: '2px 8px', borderRadius: '4px', background: 'rgba(16,185,129,0.15)', color: '#34d399', fontSize: '11px', fontWeight: 600 }}>{r.status}</span>
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
