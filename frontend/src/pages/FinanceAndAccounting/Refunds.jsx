import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function Refunds() {
  const [filterReason, setFilterReason] = useState('ALL');

  const refunds = [
    { id: 'REF-ZV-1041', invId: 'INV-ZV-7992', client: 'Pooja Iyer (Pet: Simba)', amt: '₹1,450', reason: 'Appointment Rescheduled / Pre-pay Cancel', rail: 'Original Source (UPI)', time: '45 mins ago', status: 'Refunded' },
    { id: 'REF-ZV-1042', invId: 'INV-ZV-7988', client: 'Arun Varma (Pet: Bruno)', amt: '₹2,400', reason: 'Unopened Bravecto Packaging Returned', rail: 'Original Source (Card)', time: '3.2 hrs ago', status: 'Refunded' },
    { id: 'REF-ZV-1043', invId: 'INV-ZV-7975', client: 'Deepak Rao (Pet: Shadow)', amt: '₹4,800', reason: 'Duplicate POS Terminal Authorization', rail: 'Bank Batch Reversal', time: '5.1 hrs ago', status: 'Refunded' },
    { id: 'REF-ZV-1044', invId: 'INV-ZV-7960', client: 'Sunita Nair (Pet: Milo)', amt: '₹850', reason: 'Tele-consult Network Disconnect', rail: 'Zenve Wallet Credit', time: '1 day ago', status: 'Credit Issued' },
    { id: 'REF-ZV-1045', invId: 'INV-ZV-7944', client: 'Rajat Kapoor (Pet: Leo)', amt: '₹3,200', reason: 'External Referral Lab Cancelled Assay', rail: 'Original Source (UPI)', time: '2 days ago', status: 'Refunded' }
  ];

  return (
    <DashboardLayout
      category="Finance & Accounting"
      subcategory="Refunds"
      title="Refunds, Reversals & Dispute Resolution"
      subtitle="Chargeback dispute defense, automated reversal processing, medication return audit, and customer credit ledger"
      icon="🔄"
      badge="Refund Rate: 1.07%"
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => alert('Initiating verified customer refund authorization...')}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              border: '1px solid #f87171',
              background: 'rgba(239,68,68,0.15)',
              color: '#f87171',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            + Authorize New Refund
          </button>
        </div>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Processed Refunds" value="₹84,200" delta="1.07% of Revenue" trend="up" subtext="Well below 2% target" icon="🔄" />
        <KpiCard label="Cancelled OPD Consults" value="₹32,000" delta="38.0% of refunds" trend="up" subtext="Auto-refunded in <1h" icon="📅" />
        <KpiCard label="Pharmacy Sealed Returns" value="₹24,500" delta="FEFO verified" trend="up" subtext="Returned to inventory" icon="💊" />
        <KpiCard label="Duplicate POS Swipes" value="₹18,200" delta="Instant reversal" trend="up" subtext="Zero bank chargebacks" icon="💳" />
        <KpiCard label="Avg Dispute TAT" value="3.4 Hours" delta="Fast resolution" trend="up" subtext="Target: <24 Hours" icon="⏱️" />
        <KpiCard label="Chargeback Loss Rate" value="0.00%" delta="Zero bank penalties" trend="up" subtext="100% dispute win rate" icon="🛡️" />
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
          <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>Zero Active Chargebacks</span>
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
              {refunds.map((r, idx) => (
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
