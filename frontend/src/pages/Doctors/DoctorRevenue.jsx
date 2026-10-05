import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function DoctorRevenue() {
  const revStreams = [
    { doctor: 'Dr. Divya Ramesh', spec: 'Surgery', consultsRev: '₹1,95,000', procRev: '₹3,45,000', medsRev: '₹1,00,000', totalRev: '₹6,40,000', margin: '42.5%', share: '17.4%' },
    { doctor: 'Dr. Arvind Swaminathan', spec: 'Cardiology', consultsRev: '₹1,50,000', procRev: '₹2,40,000', medsRev: '₹95,000', totalRev: '₹4,85,000', margin: '39.8%', share: '13.2%' },
    { doctor: 'Dr. Meera Nambiar', spec: 'Neurology', consultsRev: '₹1,40,000', procRev: '₹2,10,000', medsRev: '₹80,000', totalRev: '₹4,30,000', margin: '41.0%', share: '11.7%' },
    { doctor: 'Dr. Siddharth Varma', spec: 'Pediatrics', consultsRev: '₹1,75,000', procRev: '₹1,20,000', medsRev: '₹95,000', totalRev: '₹3,90,000', margin: '36.5%', share: '10.6%' },
    { doctor: 'Dr. Ananya Joshi', spec: 'Dermatology', consultsRev: '₹1,30,000', procRev: '₹1,15,000', medsRev: '₹1,00,000', totalRev: '₹3,45,000', margin: '38.2%', share: '9.4%' },
    { doctor: 'Dr. Rohan Deshmukh', spec: 'Exotics', consultsRev: '₹1,10,000', procRev: '₹1,40,000', medsRev: '₹60,000', totalRev: '₹3,10,000', margin: '44.0%', share: '8.4%' }
  ];

  const cardStyle = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Doctors"
      subcategory="Financial Attribution"
      title="Doctor Revenue & Financial Attribution"
      subtitle="Comprehensive revenue breakdowns by consultation fees, clinical procedures, surgical billings, and pharmacy write-ups"
      icon="💰"
      badge="₹36.85L Total Revenue"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Doctor Billed Revenue" value="₹36.85 Lakh" delta="+16.8% MoM" trend="up" subtext="Direct physician billing" icon="💰" />
        <KpiCard label="Procedure Billings" value="₹19.40 Lakh" delta="52.6% of doctor rev" trend="up" subtext="Surgeries & diagnostics" icon="🩺" />
        <KpiCard label="Consultation Fees" value="₹11.20 Lakh" delta="30.4% of doctor rev" trend="up" subtext="Outpatient OPD fee" icon="📋" />
        <KpiCard label="Pharmacy & Rx Uplift" value="₹6.25 Lakh" delta="17.0% attach rate" trend="up" subtext="Prescriptions filled in-house" icon="💊" />
      </div>

      <div style={cardStyle}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>💰 Clinician Revenue Matrix & Departmental Contribution</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border, #e2e8f0)', textAlign: 'left', color: 'var(--muted-foreground, #475569)' }}>
                <th style={{ padding: '10px' }}>Doctor Name</th>
                <th style={{ padding: '10px' }}>Department</th>
                <th style={{ padding: '10px' }}>Consult Fees</th>
                <th style={{ padding: '10px' }}>Procedures & Surgery</th>
                <th style={{ padding: '10px' }}>Rx Medicines</th>
                <th style={{ padding: '10px' }}>Total Attributed</th>
                <th style={{ padding: '10px' }}>Operating Margin</th>
                <th style={{ padding: '10px' }}>Revenue Share</th>
              </tr>
            </thead>
            <tbody>
              {revStreams.map((r, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{r.doctor}</td>
                  <td style={{ padding: '10px', color: '#64748b' }}>{r.spec}</td>
                  <td style={{ padding: '10px' }}>{r.consultsRev}</td>
                  <td style={{ padding: '10px' }}>{r.procRev}</td>
                  <td style={{ padding: '10px' }}>{r.medsRev}</td>
                  <td style={{ padding: '10px', fontWeight: 700, color: '#059669' }}>{r.totalRev}</td>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{r.margin}</td>
                  <td style={{ padding: '10px', color: '#4f46e5', fontWeight: 600 }}>{r.share}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
