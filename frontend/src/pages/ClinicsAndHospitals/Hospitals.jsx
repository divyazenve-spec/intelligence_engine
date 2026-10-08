import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function Hospitals() {
  const [selectedHospital, setSelectedHospital] = useState('ALL');
  const [toast, setToast] = useState('');

  const hospitalsData = [];

  const otSchedule = [];

  const filteredHospitals = selectedHospital === 'ALL' ? hospitalsData : hospitalsData.filter(h => h.code === selectedHospital);

  function handleBookOT() {
    setToast('Surgical Operating Theatre (OT) slot booked and anesthesiology team notified!');
    setTimeout(() => setToast(''), 3500);
  }

  return (
    <DashboardLayout
      category="Clinics & Hospitals"
      subcategory="Hospitals"
      title="24x7 Multi-Specialty Veterinary Hospitals"
      subtitle="Inpatient bed census, surgical operating suites, ICU pods, blood bank reserves, and advanced diagnostic imaging"
      icon="🏢"
      badge=""
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={handleBookOT}
            style={{
              padding: '7px 14px',
              borderRadius: '8px',
              background: '#3b82f6',
              color: '#fff',
              border: 'none',
              fontWeight: 600,
              fontSize: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>⚡</span> Book Surgical OT Slot
          </button>
        </div>
      }
    >
      {toast && (
        <div style={{
          padding: '12px 16px',
          borderRadius: '8px',
          background: 'rgba(16,185,129,0.15)',
          border: '1px solid rgba(16,185,129,0.3)',
          color: '#10b981',
          fontSize: '13px',
          fontWeight: 600
        }}>
          ✓ {toast}
        </div>
      )}

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Tertiary Hospitals" value="0" delta="--" trend="neutral" subtext="Bengaluru, Mumbai, Delhi" icon="🏢" />
        <KpiCard label="Inpatient Census" value="0" delta="0.0%" trend="neutral" subtext="Across ICU & post-op wards" icon="🛏️" />
        <KpiCard label="Operating Theatres" value="0" delta="0.0%" trend="neutral" subtext="No surgical suites active" icon="🔪" />
        <KpiCard label="Critical Care Pods" value="0" delta="--" trend="neutral" subtext="Continuous vitals logging" icon="💓" />
        <KpiCard label="Blood Bank Inventory" value="0 Units" delta="--" trend="neutral" subtext="Canine & feline matched" icon="🩸" />
        <KpiCard label="Hospital Billings MTD" value="₹0" delta="0.0%" trend="neutral" subtext="Inpatient & surgical care" icon="💰" />
      </div>

      {/* Flagship Hospital Profiles */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '18px' }}>
        {filteredHospitals.length === 0 ? (<div style={{ textAlign: "center", padding: "32px", color: "var(--muted-foreground, #64748b)" }}>No hospital records found</div>) : filteredHospitals.map((h, idx) => (
          <div key={idx} style={{
            background: 'var(--card, #1e293b)',
            border: '1px solid var(--border, rgba(255,255,255,0.08))',
            borderRadius: '12px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#fff' }}>{h.name}</h3>
                  <span style={{ fontSize: '11px', color: '#38bdf8', fontFamily: '"IBM Plex Mono", monospace' }}>{h.code} · {h.city}</span>
                </div>
                <span style={{
                  padding: '3px 8px',
                  borderRadius: '99px',
                  fontSize: '11px',
                  fontWeight: 600,
                  background: 'rgba(16,185,129,0.15)',
                  color: '#10b981'
                }}>
                  {h.status}
                </span>
              </div>
              <p style={{ margin: '4px 0 14px', fontSize: '12px', color: '#94a3b8' }}>{h.type}</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
                <div style={{ padding: '10px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
                  <span style={{ fontSize: '10px', color: '#94a3b8' }}>Bed Census</span>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: '#fff' }}>{h.bedsOccupied} / {h.bedsTotal} Beds</div>
                  <div style={{ fontSize: '10px', color: '#10b981', marginTop: '2px' }}>{h.icuPods} Dedicated ICU Pods</div>
                </div>
                <div style={{ padding: '10px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
                  <span style={{ fontSize: '10px', color: '#94a3b8' }}>Surgical Theatres</span>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: '#38bdf8' }}>{h.otCount} OTs ({h.otUtilization})</div>
                  <div style={{ fontSize: '10px', color: '#cbd5e1', marginTop: '2px' }}>Lead: {h.leadSurgeon}</div>
                </div>
              </div>

              <div style={{ padding: '10px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', fontSize: '11px', marginBottom: '8px' }}>
                <span style={{ color: '#94a3b8' }}>Advanced Imaging:</span> <strong style={{ color: '#cbd5e1' }}>{h.imaging}</strong>
              </div>
              <div style={{ padding: '10px', background: 'rgba(239,68,68,0.08)', borderRadius: '8px', fontSize: '11px', border: '1px solid rgba(239,68,68,0.2)', color: '#fca5a5' }}>
                <span>Blood Bank Reserves:</span> <strong>{h.bloodBank}</strong>
              </div>
            </div>

            <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '12px' }}>
              <div>
                <span style={{ fontSize: '10px', color: '#94a3b8' }}>Monthly Hospital Billings</span>
                <div style={{ fontSize: '16px', fontWeight: 700, color: '#38bdf8', fontFamily: '"IBM Plex Mono", monospace' }}>{h.monthlyBillings}</div>
              </div>
              <button
                onClick={() => alert(`Opening 24x7 ICU Telemetry & Live CCTV Feeds for ${h.name}...`)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  background: 'rgba(59,130,246,0.2)',
                  border: '1px solid rgba(59,130,246,0.4)',
                  color: '#60a5fa',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                View Live Telemetry
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Active Surgical OT Schedule */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Today's Surgical Operating Theatre (OT) Schedule</h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#94a3b8' }}>Orthopedic, soft-tissue, laparoscopic, and neurological surgeries</p>
          </div>
          <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>100% Class 100 Airflow</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: '#94a3b8' }}>
                <th style={{ padding: '8px 12px' }}>Surgical Suite</th>
                <th style={{ padding: '8px 12px' }}>Pet Patient</th>
                <th style={{ padding: '8px 12px' }}>Procedure</th>
                <th style={{ padding: '8px 12px' }}>Primary Surgeon</th>
                <th style={{ padding: '8px 12px' }}>Anesthesiologist</th>
                <th style={{ padding: '8px 12px' }}>Scheduled Window</th>
                <th style={{ padding: '8px 12px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {otSchedule.length === 0 ? (<tr><td colSpan="8" style={{ textAlign: "center", padding: "32px", color: "var(--muted-foreground, #64748b)" }}>No scheduled surgical procedures</td></tr>) : otSchedule.map((s, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '10px 12px', fontWeight: 600, color: '#38bdf8' }}>{s.ot}</td>
                  <td style={{ padding: '10px 12px', fontWeight: 600 }}>{s.patient}</td>
                  <td style={{ padding: '10px 12px', color: '#cbd5e1' }}>{s.procedure}</td>
                  <td style={{ padding: '10px 12px', color: '#fff' }}>{s.surgeon}</td>
                  <td style={{ padding: '10px 12px', color: '#94a3b8' }}>{s.anesthesia}</td>
                  <td style={{ padding: '10px 12px', fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px' }}>{s.time}</td>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '99px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: s.status === 'In Progress' ? 'rgba(239,68,68,0.15)' :
                        s.status === 'Completed' ? 'rgba(16,185,129,0.15)' : 'rgba(59,130,246,0.15)',
                      color: s.status === 'In Progress' ? '#f87171' :
                        s.status === 'Completed' ? '#34d399' : '#60a5fa'
                    }}>
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
