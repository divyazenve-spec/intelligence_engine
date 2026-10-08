import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function DoctorNetwork() {
  const centers = [];

  const cardStyle = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Doctors"
      subcategory="Clinical Infrastructure"
      title="Doctor Network & Hospital Affiliations"
      subtitle="Hospital clinical staffing, specialty distribution across network centers, physician rotas, and referral flows"
      icon="🌐"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Affiliated Hospital Hubs" value="0" delta="--" trend="neutral" subtext="No affiliated centers" icon="🏥" />
        <KpiCard label="Total Medical Staff" value="0" delta="--" trend="neutral" subtext="No medical staff" icon="👨‍⚕️" />
        <KpiCard label="Inter-Hospital Referrals" value="0" delta="--" trend="neutral" subtext="No referrals logged" icon="🔄" />
        <KpiCard label="Network Bed Utilization" value="0.0%" delta="0.0%" trend="neutral" subtext="No beds occupied" icon="🛏️" />
      </div>

      <div style={cardStyle}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>🌐 Hospital Network Staffing & Facility Profile</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border, #e2e8f0)', textAlign: 'left', color: 'var(--muted-foreground, #475569)' }}>
                <th style={{ padding: '10px' }}>Hospital Center</th>
                <th style={{ padding: '10px' }}>Location</th>
                <th style={{ padding: '10px' }}>Senior Doctors</th>
                <th style={{ padding: '10px' }}>Specialty Wings</th>
                <th style={{ padding: '10px' }}>Operating Theaters</th>
                <th style={{ padding: '10px' }}>Inpatient Beds</th>
                <th style={{ padding: '10px' }}>Monthly Patient Capacity</th>
              </tr>
            </thead>
            <tbody>
              {centers.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '32px', color: 'var(--muted-foreground, #64748b)' }}>
                    No hospital network centers found
                  </td>
                </tr>
              ) : (
                centers.map((c, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                    <td style={{ padding: '10px', fontWeight: 600 }}>{c.name}</td>
                    <td style={{ padding: '10px', color: '#64748b' }}>{c.location}</td>
                    <td style={{ padding: '10px', fontWeight: 600 }}>{c.doctors}</td>
                    <td style={{ padding: '10px' }}>{c.specialties}</td>
                    <td style={{ padding: '10px' }}>{c.ots}</td>
                    <td style={{ padding: '10px' }}>{c.beds}</td>
                    <td style={{ padding: '10px', fontWeight: 600, color: '#059669' }}>{c.capacity}</td>
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
