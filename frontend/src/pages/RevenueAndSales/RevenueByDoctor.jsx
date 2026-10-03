import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function RevenueByDoctor() {
  const doctors = [
    { name: 'Dr. Divya Balasubramanian', spec: 'Lead Physician, MBBS, MD', reg: 'MCI-62910', consults: 248, rev: '₹6,42,000', aov: '₹2,588', rating: '4.98' },
    { name: 'Dr. Arvind Swaminathan', spec: 'Cardiologist, MD, DM', reg: 'MCI-48291', consults: 184, rev: '₹5,18,000', aov: '₹2,815', rating: '4.95' },
    { name: 'Dr. Meera Nambiar', spec: 'Senior Neurologist, MD', reg: 'MCI-39102', consults: 162, rev: '₹4,45,000', aov: '₹2,746', rating: '4.92' },
    { name: 'Dr. Siddharth Rao', spec: 'Pediatric Specialist, DCH', reg: 'MCI-51829', consults: 198, rev: '₹3,96,000', aov: '₹2,000', rating: '4.91' },
    { name: 'Dr. Kavita Reddy', spec: 'Clinical Pathologist, MD', reg: 'MCI-29481', consults: 142, rev: '₹3,40,000', aov: '₹2,394', rating: '4.88' },
    { name: 'Dr. Rohan Kulkarni', spec: 'Orthopedic Surgeon, MS', reg: 'MCI-73019', consults: 118, rev: '₹3,24,000', aov: '₹2,745', rating: '4.89' }
  ];

  return (
    <DashboardLayout
      category="Revenue & Sales"
      subcategory="Revenue by Doctor"
      title="Veterinary Practitioners & Clinical Billings"
      subtitle="Doctor consultations, medical procedure billings, and practitioner ratings"
      icon="🩺"
      badge="Active Medical Board"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Top Physician" value="Dr. Divya Balasubramanian" delta="₹6.42L billings" trend="up" subtext="248 consults" icon="🩺" />
        <KpiCard label="Total Consultations" value="1,052" delta="+18.2%" trend="up" subtext="Across medical team" icon="📋" />
        <KpiCard label="Avg Consult Fee" value="₹2,548" delta="+6.4%" trend="up" subtext="Per clinical session" icon="💰" />
        <KpiCard label="Medical Rating" value="4.92 / 5.0" delta="Top Tier" trend="up" subtext="Patient parent reviews" icon="⭐" />
      </div>

      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>Physician Billings & Consultation Quota</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))', color: 'var(--muted-foreground, #94a3b8)', fontSize: '11px' }}>
                <th style={{ padding: '8px 12px' }}>Doctor Name</th>
                <th style={{ padding: '8px 12px' }}>Specialty & Qualifications</th>
                <th style={{ padding: '8px 12px' }}>MCI Reg</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Consultations</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Total Billings</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Avg Fee</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Patient Rating</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((d) => (
                <tr key={d.name} style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.04))' }}>
                  <td style={{ padding: '12px', fontWeight: 700 }}>{d.name}</td>
                  <td style={{ padding: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>{d.spec}</td>
                  <td style={{ padding: '12px', fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px' }}>{d.reg}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: 600 }}>{d.consults}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{d.rev}</td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>{d.aov}</td>
                  <td style={{ padding: '12px', textAlign: 'right', color: '#f59e0b', fontWeight: 600 }}>⭐ {d.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
