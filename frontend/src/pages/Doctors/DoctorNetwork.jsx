import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function DoctorNetwork() {
  const centers = [];

  const cardStyle = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Doctors"
      subcategory="Clinical Footprint"
      title="Doctor Network & Hospital Affiliations"
      subtitle="Hospital clinical staffing, specialty distribution across network centers, physician rotas, and referral flows"
      icon="🌐"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Affiliated Hospital Hubs" value="5 Centers" delta="Bangalore Metro" trend="neutral" subtext="All equipped with sterile OTs" icon="🏥" />
        <KpiCard label="Total Medical Staff" value="46 Clinicians & Vets" delta="+6 Resident interns" trend="up" subtext="24 Senior Consultants" icon="👨‍⚕️" />
        <KpiCard label="Inter-Hospital Referrals" value="184 Patients" delta="Cross-center specialty" trend="up" subtext="Seamless EHR patient transfers" icon="🔄" />
        <KpiCard label="Network Bed Utilization" value="0.0%" delta="Safe capacity margin" trend="up" subtext="Emergency surge ready" icon="🛏️" />
      </div>

      <div style={cardStyle}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>🌐 Hospital Center Deployment & Clinical Leadership</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border, #e2e8f0)', textAlign: 'left', color: 'var(--muted-foreground, #475569)' }}>
                <th style={{ padding: '10px' }}>Hospital Center</th>
                <th style={{ padding: '10px' }}>Clinical Director / Lead</th>
                <th style={{ padding: '10px' }}>Practitioner Team</th>
                <th style={{ padding: '10px' }}>Key Specialty Wings</th>
                <th style={{ padding: '10px' }}>MTD Patient Vol</th>
                <th style={{ padding: '10px' }}>Center Billings</th>
                <th style={{ padding: '10px' }}>Operating State</th>
              </tr>
            </thead>
            <tbody>
              {centers.map((c, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{c.name}</td>
                  <td style={{ padding: '10px', color: '#047857', fontWeight: 600 }}>{c.leadDoctor}</td>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{c.teamSize} Clinicians</td>
                  <td style={{ padding: '10px', color: '#475569' }}>{c.specialties}</td>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{c.mtdPatients} pets</td>
                  <td style={{ padding: '10px', fontWeight: 700, color: '#059669' }}>{c.revMtd}</td>
                  <td style={{ padding: '10px' }}>
                    <span style={{ padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, background: '#ecfdf5', color: '#047857' }}>
                      {c.status}
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
