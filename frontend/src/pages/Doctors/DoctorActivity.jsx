import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function DoctorActivity() {
  const liveActivities = [];

  const cardStyle = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Doctors"
      subcategory="Clinical Telemetry"
      title="Doctor Real-Time Activity & Shift Telemetry"
      subtitle="Live operating theater status, ongoing consultations, outpatient pacing, and urgent case queues"
      icon="⚡"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Doctors Currently On Duty" value="0" delta="--" trend="neutral" subtext="No clinicians on duty" icon="👨‍⚕️" />
        <KpiCard label="Surgeries in Progress" value="0" delta="--" trend="neutral" subtext="No active surgeries" icon="🩺" />
        <KpiCard label="OPD Consults Today" value="0" delta="--" trend="neutral" subtext="No consults today" icon="📋" />
        <KpiCard label="Tele-Consult Queue" value="0" delta="--" trend="neutral" subtext="No tele-consults waiting" icon="📱" />
      </div>

      <div style={cardStyle}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>⚡ Live Physician Activity Feed</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border, #e2e8f0)', textAlign: 'left', color: 'var(--muted-foreground, #475569)' }}>
                <th style={{ padding: '10px' }}>Timestamp</th>
                <th style={{ padding: '10px' }}>Doctor Name</th>
                <th style={{ padding: '10px' }}>Activity Type</th>
                <th style={{ padding: '10px' }}>Patient / Case</th>
                <th style={{ padding: '10px' }}>Clinic / OT Location</th>
                <th style={{ padding: '10px' }}>Vitals / Alert Status</th>
                <th style={{ padding: '10px' }}>Duration</th>
                <th style={{ padding: '10px' }}>Current State</th>
              </tr>
            </thead>
            <tbody>
              {liveActivities.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '32px', color: 'var(--muted-foreground, #64748b)' }}>
                    No live doctor activity records found
                  </td>
                </tr>
              ) : (
                liveActivities.map((a, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                    <td style={{ padding: '10px', fontFamily: 'monospace' }}>{a.time}</td>
                    <td style={{ padding: '10px', fontWeight: 600 }}>{a.doctor}</td>
                    <td style={{ padding: '10px' }}>{a.type}</td>
                    <td style={{ padding: '10px', fontWeight: 600 }}>{a.patient}</td>
                    <td style={{ padding: '10px', color: '#64748b' }}>{a.location}</td>
                    <td style={{ padding: '10px' }}>{a.vitals}</td>
                    <td style={{ padding: '10px' }}>{a.duration}</td>
                    <td style={{ padding: '10px' }}>
                      <span style={{ padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, background: 'rgba(59,130,246,0.12)', color: '#1d4ed8' }}>
                        {a.state}
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
