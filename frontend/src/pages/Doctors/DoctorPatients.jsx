import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function DoctorPatients() {
  const patientLogs = [];

  const cardStyle = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Doctors"
      subcategory="Patient Log"
      title="Doctor Patients & Treatment Logs"
      subtitle="Outpatient records, clinical case histories, diagnoses, and scheduled medical follow-ups"
      icon="🐾"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Active Patient Caseload" value="0" delta="0.0%" trend="neutral" subtext="No active caseload" icon="🐾" />
        <KpiCard label="Repeat Pet Consults" value="0.0%" delta="0.0%" trend="neutral" subtext="No repeat consults" icon="🔄" />
        <KpiCard label="Chronic Care Monitored" value="0" delta="--" trend="neutral" subtext="No chronic patients" icon="🩺" />
        <KpiCard label="Follow-Up Adherence" value="0.0%" delta="0.0%" trend="neutral" subtext="No follow-ups recorded" icon="📅" />
      </div>

      <div style={cardStyle}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>🐾 Active Clinical Cases & Follow-Up Regimens</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border, #e2e8f0)', textAlign: 'left', color: 'var(--muted-foreground, #475569)' }}>
                <th style={{ padding: '10px' }}>Patient Name & Breed</th>
                <th style={{ padding: '10px' }}>Pet Parent</th>
                <th style={{ padding: '10px' }}>Attending Doctor</th>
                <th style={{ padding: '10px' }}>Primary Diagnosis</th>
                <th style={{ padding: '10px' }}>Treatment Plan</th>
                <th style={{ padding: '10px' }}>Next Follow-Up</th>
                <th style={{ padding: '10px' }}>Clinical Status</th>
              </tr>
            </thead>
            <tbody>
              {patientLogs.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '32px', color: 'var(--muted-foreground, #64748b)' }}>
                    No patient logs found
                  </td>
                </tr>
              ) : (
                patientLogs.map((p, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                    <td style={{ padding: '10px', fontWeight: 600 }}>{p.name} <span style={{ color: '#64748b', fontWeight: 400 }}>({p.breed})</span></td>
                    <td style={{ padding: '10px' }}>{p.owner}</td>
                    <td style={{ padding: '10px', fontWeight: 600 }}>{p.doctor}</td>
                    <td style={{ padding: '10px', color: '#dc2626', fontWeight: 600 }}>{p.diagnosis}</td>
                    <td style={{ padding: '10px' }}>{p.plan}</td>
                    <td style={{ padding: '10px', fontFamily: 'monospace' }}>{p.nextVisit}</td>
                    <td style={{ padding: '10px' }}>
                      <span style={{ padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, background: 'rgba(59,130,246,0.12)', color: '#1d4ed8' }}>
                        {p.status}
                      </span>
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
