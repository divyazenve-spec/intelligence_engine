import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function DoctorPatients() {
  const patientLogs = [];

  const cardStyle = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Doctors"
      subcategory="Clinical Caseload"
      title="Doctor Patients & Treatment Logs"
      subtitle="Outpatient records, clinical case histories, diagnoses, and scheduled medical follow-ups"
      icon="🐾"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Active Patient Caseload" value="2,148 Pets" delta="+18.4% MTD" trend="up" subtext="Under active care" icon="🐾" />
        <KpiCard label="Repeat Pet Consults" value="0.0%" delta="High physician trust" trend="up" subtext="Return visit rate" icon="🔄" />
        <KpiCard label="Chronic Care Monitored" value="482 Pets" delta="Cardiac, renal, ortho" trend="neutral" subtext="Regular maintenance" icon="🩺" />
        <KpiCard label="Follow-Up Adherence" value="0.0%" delta="+3.4% vs benchmark" trend="up" subtext="Automated reminder sync" icon="📅" />
      </div>

      <div style={cardStyle}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>🐾 Recent Patient Encounters & Care Plans</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border, #e2e8f0)', textAlign: 'left', color: 'var(--muted-foreground, #475569)' }}>
                <th style={{ padding: '10px' }}>Pet Patient & Breed</th>
                <th style={{ padding: '10px' }}>Pet Parent</th>
                <th style={{ padding: '10px' }}>Attending Clinician</th>
                <th style={{ padding: '10px' }}>Diagnosis / Reason</th>
                <th style={{ padding: '10px' }}>Consult Date</th>
                <th style={{ padding: '10px' }}>Clinical Status</th>
                <th style={{ padding: '10px' }}>Next Follow-Up</th>
                <th style={{ padding: '10px' }}>Center Clinic</th>
              </tr>
            </thead>
            <tbody>
              {patientLogs.map((p, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{p.petName}</td>
                  <td style={{ padding: '10px' }}>{p.parent}</td>
                  <td style={{ padding: '10px', color: '#047857', fontWeight: 600 }}>{p.doctor}</td>
                  <td style={{ padding: '10px' }}>{p.condition}</td>
                  <td style={{ padding: '10px', color: '#64748b' }}>{p.date}</td>
                  <td style={{ padding: '10px' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600, background: '#f0fdf4', color: '#16a34a' }}>
                      {p.status}
                    </span>
                  </td>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{p.followUp}</td>
                  <td style={{ padding: '10px', color: '#64748b' }}>{p.clinic}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
