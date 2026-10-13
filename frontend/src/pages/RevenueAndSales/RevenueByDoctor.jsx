import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function RevenueByDoctor() {
  const doctors = [];

  return (
    <DashboardLayout
      category="Revenue & Sales"
      subcategory="Revenue by Doctor"
      title="Veterinary Practitioners & Clinical Billings"
      subtitle="Doctor consultations, medical procedure billings, and practitioner ratings"
      icon="🩺"
      badge="Active Medical Board"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <KpiCard label="Top Physician" value="Dr. Divya Balasubramanian" delta="₹0 billings" trend="up" subtext="248 consults" icon="🩺" />
        <KpiCard label="Total Consultations" value="0" delta="0.0%" trend="up" subtext="Across medical team" icon="📋" />
        <KpiCard label="Avg Consult Fee" value="₹0" delta="0.0%" trend="up" subtext="Per clinical session" icon="💰" />
        <KpiCard label="Medical Rating" value="4.92 / 5.0" delta="Top Tier" trend="up" subtext="Patient parent reviews" icon="⭐" />
      </div>

      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px 24px'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>Physician Billings & Consultation Quota</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))', color: 'var(--muted-foreground, #94a3b8)', fontSize: '11px' }}>
                <th style={{ padding: '10px 14px 10px 16px', verticalAlign: 'middle' }}>Doctor Name</th>
                <th style={{ padding: '10px 14px', verticalAlign: 'middle' }}>Specialty & Qualifications</th>
                <th style={{ padding: '10px 14px', verticalAlign: 'middle' }}>MCI Reg</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', verticalAlign: 'middle' }}>Consultations</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', verticalAlign: 'middle' }}>Total Billings</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', verticalAlign: 'middle' }}>Avg Fee</th>
                <th style={{ padding: '10px 16px 10px 14px', textAlign: 'right', verticalAlign: 'middle' }}>Patient Rating</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((d) => (
                <tr key={d.name} style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.04))' }}>
                  <td style={{ padding: '12px 14px 12px 16px', fontWeight: 700, verticalAlign: 'middle' }}>{d.name}</td>
                  <td style={{ padding: '12px 14px', color: 'var(--muted-foreground, #94a3b8)', verticalAlign: 'middle' }}>{d.spec}</td>
                  <td style={{ padding: '12px 14px', fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px', verticalAlign: 'middle' }}>{d.reg}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontWeight: 600, verticalAlign: 'middle' }}>{d.consults}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace', verticalAlign: 'middle' }}>{d.rev}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', verticalAlign: 'middle' }}>{d.aov}</td>
                  <td style={{ padding: '12px 16px 12px 14px', textAlign: 'right', color: '#f59e0b', fontWeight: 600, verticalAlign: 'middle' }}>⭐ {d.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
