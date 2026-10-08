import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function DoctorCommissions() {
  const settlements = [];

  const cardStyle = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Doctors"
      subcategory="Incentive Settlements"
      title="Doctor Commissions & Compensation Settlement"
      subtitle="Bi-weekly incentive disbursements, surgical bonus slabs, consult rev-shares, and statutory TDS deduction ledgers"
      icon="💵"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Commission Disbursed" value="₹0" delta="--" trend="neutral" subtext="No commissions disbursed" icon="💵" />
        <KpiCard label="Avg. Physician Earning" value="₹0" delta="0.0%" trend="neutral" subtext="No earnings recorded" icon="📈" />
        <KpiCard label="TDS Deducted (Section 194J)" value="₹0" delta="0.0%" trend="neutral" subtext="No tax withheld" icon="🏛️" />
        <KpiCard label="Payment Reconciliation" value="0.0%" delta="--" trend="neutral" subtext="No settlements logged" icon="✅" />
      </div>

      <div style={cardStyle}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>💵 Clinician Settlement Ledger & TDS Withholding</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border, #e2e8f0)', textAlign: 'left', color: 'var(--muted-foreground, #475569)' }}>
                <th style={{ padding: '10px' }}>Settlement ID</th>
                <th style={{ padding: '10px' }}>Doctor Name</th>
                <th style={{ padding: '10px' }}>Department</th>
                <th style={{ padding: '10px' }}>Total Clinical Billing</th>
                <th style={{ padding: '10px' }}>Commission Rate</th>
                <th style={{ padding: '10px' }}>Gross Incentive</th>
                <th style={{ padding: '10px' }}>TDS Withheld (10%)</th>
                <th style={{ padding: '10px' }}>Net Bank Payout</th>
              </tr>
            </thead>
            <tbody>
              {settlements.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '32px', color: 'var(--muted-foreground, #64748b)' }}>
                    No settlement records found
                  </td>
                </tr>
              ) : (
                settlements.map((s, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                    <td style={{ padding: '10px', fontFamily: 'monospace', fontWeight: 600 }}>{s.id}</td>
                    <td style={{ padding: '10px', fontWeight: 600 }}>{s.doctor}</td>
                    <td style={{ padding: '10px', color: '#64748b' }}>{s.spec}</td>
                    <td style={{ padding: '10px' }}>{s.billed}</td>
                    <td style={{ padding: '10px' }}>{s.rate}</td>
                    <td style={{ padding: '10px' }}>{s.gross}</td>
                    <td style={{ padding: '10px', color: '#dc2626' }}>{s.tds}</td>
                    <td style={{ padding: '10px', fontWeight: 700, color: '#059669' }}>{s.net}</td>
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
