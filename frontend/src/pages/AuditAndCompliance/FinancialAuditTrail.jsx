import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function FinancialAuditTrail() {
  const financial = [
    { ref: 'FIN-TX-8921', type: 'General Ledger Adjustment', debit: '₹45,000.00', credit: '₹45,000.00', account: 'Inventory Write-down vs COGS', approver: 'Sneha Rao (Controller)', time: '12:40 Today', status: 'Reconciled' },
    { ref: 'FIN-TX-8920', type: 'Customer Refund Clearance', debit: '₹2,450.00', credit: '₹0.00', account: 'Razorpay UPI Gateway #REF-82', approver: 'Executive Admin', time: '11:15 Today', status: 'Reconciled' },
    { ref: 'FIN-TX-8919', type: 'Doctor Commission Payout', debit: '₹84,000.00', credit: '₹84,000.00', account: 'Dr. Priya Sharma (58 Consults)', approver: 'Executive Admin', time: '09:00 Today', status: 'Reconciled' },
    { ref: 'FIN-TX-8918', type: 'GST ITC Reconciliation', debit: '₹1,24,500.00', credit: '₹1,24,500.00', account: 'Input Tax Credit (GSTR-2B)', approver: 'CA External Auditor', time: 'Yesterday 17:30', status: 'Reconciled' },
    { ref: 'FIN-TX-8917', type: 'Vendor Invoice Settlement', debit: '₹3,20,000.00', credit: '₹3,20,000.00', account: 'Royal Canin India Pvt Ltd', approver: 'Sneha Rao (Controller)', time: 'Yesterday 15:10', status: 'Reconciled' }
  ];

  return (
    <DashboardLayout
      category="Audit & Compliance"
      subcategory="Financial Ledger & Journal Audits"
      title="Financial Ledger & Journal Audit Trail"
      subtitle="Double-entry accounting validation, refund authorizations, and tax compliance trails"
      icon="💰"
      badge="₹0.00 Variance"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Reconciliation Variance" value="₹0.00" delta="Perfect Match" trend="up" subtext="Tally & Zoho Books matched" icon="⚖️" />
        <KpiCard label="Total Audited Ledger" value="₹54.80 L" delta="MTD Volume" trend="up" subtext="Zero unapproved journal entries" icon="💰" />
        <KpiCard label="GST Input Tax Credit" value="₹1.24 L" delta="100% Validated" trend="up" subtext="GSTR-2B automated match" icon="🧾" />
        <KpiCard label="Audit Sign-off" value="Unqualified" delta="Clean Opinion" trend="up" subtext="Deloitte standard practices" icon="🛡️" />
      </div>

      <div style={{ background: 'var(--card, #ffffff)', border: '1px solid var(--border, #e2e8f0)', borderRadius: '12px', padding: '20px' }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>Audited Financial Journals & Transactions</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)', fontSize: '11px', textTransform: 'uppercase' }}>
                <th style={{ padding: '10px 12px' }}>Reference</th>
                <th style={{ padding: '10px 12px' }}>Transaction Type</th>
                <th style={{ padding: '10px 12px' }}>Account / Target</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Debit</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Credit</th>
                <th style={{ padding: '10px 12px' }}>Authorized Approver</th>
                <th style={{ padding: '10px 12px' }}>Timestamp</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {financial.map((f, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border, #f1f5f9)' }}>
                  <td style={{ padding: '12px', fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px', color: '#2563eb', fontWeight: 600 }}>{f.ref}</td>
                  <td style={{ padding: '12px', fontWeight: 700 }}>{f.type}</td>
                  <td style={{ padding: '12px' }}>{f.account}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#16a34a', fontWeight: 600 }}>{f.debit}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#2563eb', fontWeight: 600 }}>{f.credit}</td>
                  <td style={{ padding: '12px' }}>{f.approver}</td>
                  <td style={{ padding: '12px', fontSize: '12px' }}>{f.time}</td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '99px', background: '#dcfce7', color: '#15803d', fontWeight: 600, fontSize: '11px' }}>● {f.status}</span>
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
