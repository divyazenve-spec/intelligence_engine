import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function DoctorActivity() {
  const liveActivities = [
    { time: '18:04', doctor: 'Dr. Divya Ramesh', action: 'Completed Surgery', details: 'Tibial Plateau Leveling Osteotomy (TPLO) on German Shepherd', location: 'OT-1 Indiranagar', status: 'Success' },
    { time: '17:52', doctor: 'Dr. Arvind Swaminathan', action: 'Echocardiogram Review', details: 'Doppler assessment on Persian Cat - Prescribed Pimobendan', location: 'Cardio Lab Koramangala', status: 'Logged' },
    { time: '17:40', doctor: 'Dr. Siddharth Varma', action: 'Vaccination Milestone', details: '7-in-1 Booster + Anti-Rabies administered to Golden Pup', location: 'OPD-2 Jayanagar', status: 'Completed' },
    { time: '17:28', doctor: 'Dr. Meera Nambiar', action: 'Spinal Rehab Session', details: 'Hydrotherapy & neuromuscular electric stimulation', location: 'Physio Suite Whitefield', status: 'Active' },
    { time: '17:15', doctor: 'Dr. Ananya Joshi', action: 'Skin Scraping Cytology', details: 'Microscopic examination for demodectic mange diagnosed', location: 'Diagnostics HSR', status: 'Discharged' },
    { time: '16:50', doctor: 'Dr. Rohan Deshmukh', action: 'Emergency Crop Flush', details: 'Ingluvies impaction treated in Eclectus Parrot', location: 'Exotic Ward Indiranagar', status: 'Stabilized' }
  ];

  const cardStyle = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Doctors"
      subcategory="Clinical Operations & Telemetry"
      title="Doctor Real-Time Activity & Shift Telemetry"
      subtitle="Live consultation logs, ongoing surgical interventions, digital prescription dispatches, and emergency calls"
      icon="⚡"
      badge="Live Telemetry Active"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Doctors Currently On Duty" value="18 Clinicians" delta="Full evening coverage" trend="up" subtext="Across all 6 hospitals" icon="👨‍⚕️" />
        <KpiCard label="Surgeries in Progress" value="3 OTs Active" delta="Indiranagar & Koramangala" trend="neutral" subtext="All monitors normal" icon="🩺" />
        <KpiCard label="OPD Consults Today" value="142 Completed" delta="Avg 16 min/consult" trend="up" subtext="Pacing on schedule" icon="📋" />
        <KpiCard label="Tele-Consult Queue" value="2 Waiting" delta="Under 4 min wait" trend="up" subtext="Live mobile video vet" icon="📱" />
      </div>

      <div style={cardStyle}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>⚡ Live Physician Activity & Case Audit Stream</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border, #e2e8f0)', textAlign: 'left', color: 'var(--muted-foreground, #475569)' }}>
                <th style={{ padding: '10px' }}>Timestamp</th>
                <th style={{ padding: '10px' }}>Clinician</th>
                <th style={{ padding: '10px' }}>Clinical Action</th>
                <th style={{ padding: '10px' }}>Case Description & Notes</th>
                <th style={{ padding: '10px' }}>Facility / Room</th>
                <th style={{ padding: '10px' }}>Clinical Status</th>
              </tr>
            </thead>
            <tbody>
              {liveActivities.map((a, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                  <td style={{ padding: '10px', fontFamily: 'monospace', fontWeight: 600, color: '#059669' }}>{a.time}</td>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{a.doctor}</td>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{a.action}</td>
                  <td style={{ padding: '10px', color: '#475569' }}>{a.details}</td>
                  <td style={{ padding: '10px', color: '#64748b' }}>{a.location}</td>
                  <td style={{ padding: '10px' }}>
                    <span style={{ padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, background: '#ecfdf5', color: '#047857' }}>
                      {a.status}
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
