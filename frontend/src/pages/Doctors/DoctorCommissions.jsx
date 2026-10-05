import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function DoctorCommissions() {
  const settlements = [
    { id: 'SET-9901', doctor: 'Dr. Divya Ramesh', spec: 'Lead Surgeon', grossBilled: '₹6,40,000', slab: '20% + 5% Surgical', commTotal: '₹1,60,000', tds: '₹16,000', netPay: '₹1,44,000', payoutDate: '2026-10-05', status: 'Disbursed' },
    { id: 'SET-9902', doctor: 'Dr. Arvind Swaminathan', spec: 'Cardiology', grossBilled: '₹4,85,000', slab: '20% Standard', commTotal: '₹97,000', tds: '₹9,700', netPay: '₹87,300', payoutDate: '2026-10-05', status: 'Disbursed' },
    { id: 'SET-9903', doctor: 'Dr. Meera Nambiar', spec: 'Neurology', grossBilled: '₹4,30,000', slab: '20% Standard', commTotal: '₹86,000', tds: '₹8,600', netPay: '₹77,400', payoutDate: '2026-10-05', status: 'Disbursed' },
    { id: 'SET-9904', doctor: 'Dr. Siddharth Varma', spec: 'Pediatrics', grossBilled: '₹3,90,000', slab: '20% Standard', commTotal: '₹78,000', tds: '₹7,800', netPay: '₹70,200', payoutDate: '2026-10-05', status: 'Disbursed' },
    { id: 'SET-9905', doctor: 'Dr. Ananya Joshi', spec: 'Dermatology', grossBilled: '₹3,45,000', slab: '20% Standard', commTotal: '₹69,000', tds: '₹6,900', netPay: '₹62,100', payoutDate: '2026-10-05', status: 'Disbursed' },
    { id: 'SET-9906', doctor: 'Dr. Rohan Deshmukh', spec: 'Exotics', grossBilled: '₹3,10,000', slab: '20% Standard', commTotal: '₹62,000', tds: '₹6,200', netPay: '₹55,800', payoutDate: '2026-10-05', status: 'Disbursed' }
  ];

  const cardStyle = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Doctors"
      subcategory="Physician Incentives & Payouts"
      title="Doctor Commissions & Compensation Settlement"
      subtitle="Bi-weekly professional fee disbursements, incentive slabs, surgical bonus tiers, and statutory TDS deduction ledgers"
      icon="💵"
      badge="₹7.37L Settled MTD"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Commission Disbursed" value="₹7.37 Lakh" delta="100% on schedule" trend="up" subtext="Bi-weekly direct bank transfer" icon="💵" />
        <KpiCard label="Avg. Physician Earning" value="₹1.22 Lakh/mo" delta="+11.4% YoY" trend="up" subtext="Excluding fixed base retainers" icon="📈" />
        <KpiCard label="TDS Deducted (Section 194J)" value="₹73,700" delta="10% statutory tax" trend="neutral" subtext="Form 16A filed automatically" icon="🏛️" />
        <KpiCard label="Payment Reconciliation" value="100.0%" delta="Zero dispute log" trend="up" subtext="Automated ledger audit" icon="✅" />
      </div>

      <div style={cardStyle}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>💵 Professional Fee Settlements & Remittance Register</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border, #e2e8f0)', textAlign: 'left', color: 'var(--muted-foreground, #475569)' }}>
                <th style={{ padding: '10px' }}>Settlement ID</th>
                <th style={{ padding: '10px' }}>Doctor Name</th>
                <th style={{ padding: '10px' }}>Specialty</th>
                <th style={{ padding: '10px' }}>Gross Attributed</th>
                <th style={{ padding: '10px' }}>Commission Slab</th>
                <th style={{ padding: '10px' }}>Gross Comm.</th>
                <th style={{ padding: '10px' }}>TDS (10%)</th>
                <th style={{ padding: '10px' }}>Net Remitted</th>
                <th style={{ padding: '10px' }}>Disbursal Date</th>
                <th style={{ padding: '10px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {settlements.map((s, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                  <td style={{ padding: '10px', fontFamily: 'monospace', fontWeight: 600 }}>{s.id}</td>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{s.doctor}</td>
                  <td style={{ padding: '10px', color: '#64748b' }}>{s.spec}</td>
                  <td style={{ padding: '10px' }}>{s.grossBilled}</td>
                  <td style={{ padding: '10px', color: '#64748b' }}>{s.slab}</td>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{s.commTotal}</td>
                  <td style={{ padding: '10px', color: '#b91c1c' }}>-{s.tds}</td>
                  <td style={{ padding: '10px', fontWeight: 700, color: '#059669' }}>{s.netPay}</td>
                  <td style={{ padding: '10px', color: '#64748b' }}>{s.payoutDate}</td>
                  <td style={{ padding: '10px' }}>
                    <span style={{ padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, background: '#f0fdf4', color: '#16a34a' }}>
                      {s.status}
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
