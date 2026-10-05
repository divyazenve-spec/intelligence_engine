import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function Hospitals() {
  const [selectedHospital, setSelectedHospital] = useState('ALL');
  const [toast, setToast] = useState('');

  const hospitalsData = [
    {
      code: 'HSP-BLR-01',
      name: 'Zenve Super-Specialty Animal Hospital',
      city: 'Bengaluru (Koramangala)',
      type: 'Level-1 Tertiary Referral Center (24x7)',
      bedsTotal: 32,
      bedsOccupied: 28,
      icuPods: 8,
      otCount: 5,
      otUtilization: '88.0%',
      bloodBank: '8 Units Packed RBC, 4 Plasma',
      imaging: '16-Slice Helical CT, High-Res Echo, DR X-Ray, C-Arm',
      leadSurgeon: 'Dr. Priya Sharma (M.V.Sc Surgery)',
      monthlyBillings: '₹18.40 Lakh',
      status: 'High Occupancy'
    },
    {
      code: 'HSP-MUM-01',
      name: 'Zenve Multi-Specialty Veterinary Hospital',
      city: 'Mumbai (Bandra West)',
      type: '24x7 Critical Care & Surgical Hospital',
      bedsTotal: 24,
      bedsOccupied: 22,
      icuPods: 6,
      otCount: 4,
      otUtilization: '92.0%',
      bloodBank: '5 Units Packed RBC, 3 Plasma',
      imaging: '1.5T MRI, Laparoscopy Tower, Digital Radiography',
      leadSurgeon: 'Dr. Rahul Mehta (M.V.Sc Critical Care)',
      monthlyBillings: '₹14.85 Lakh',
      status: 'High Occupancy'
    },
    {
      code: 'HSP-DEL-01',
      name: 'Zenve Tertiary Referral Center',
      city: 'Delhi NCR (Okhla Phase 3)',
      type: '24x7 Orthopedic & Neuro Hospital',
      bedsTotal: 20,
      bedsOccupied: 16,
      icuPods: 4,
      otCount: 3,
      otUtilization: '84.0%',
      bloodBank: '4 Units Packed RBC, 2 Plasma',
      imaging: '16-Slice CT Scanner, Color Doppler Ultrasound',
      leadSurgeon: 'Dr. Aisha Khan (M.V.Sc Orthopedics)',
      monthlyBillings: '₹11.20 Lakh',
      status: 'Optimal Occupancy'
    }
  ];

  const otSchedule = [
    { ot: 'OT Suite 1 (Bengaluru)', patient: 'Simba (GSD)', procedure: 'Total Hip Replacement (THR)', surgeon: 'Dr. Priya Sharma', anesthesia: 'Dr. Arun V.', time: '09:00 AM – 12:30 PM', status: 'In Progress' },
    { ot: 'OT Suite 2 (Bengaluru)', patient: 'Max (Labrador)', procedure: 'Emergency Gastric De-torsion (GDV)', surgeon: 'Dr. Kavita Nair', anesthesia: 'Dr. Ramesh S.', time: '11:00 AM – 01:00 PM', status: 'In Progress' },
    { ot: 'OT Suite 1 (Mumbai)', patient: 'Kiki (Persian Cat)', procedure: 'Subtotal Colectomy for Megacolon', surgeon: 'Dr. Rahul Mehta', anesthesia: 'Dr. Sneha P.', time: '10:00 AM – 12:00 PM', status: 'Completed' },
    { ot: 'OT Suite 2 (Mumbai)', patient: 'Bruno (Boxer)', procedure: 'Hemilaminectomy (IVDD L2-L3)', surgeon: 'Dr. Meera Deshmukh', anesthesia: 'Dr. Sneha P.', time: '01:30 PM – 04:00 PM', status: 'Scheduled' },
    { ot: 'OT Suite 1 (Delhi NCR)', patient: 'Rocky (Rottweiler)', procedure: 'TPLO Cruciate Ligament Repair', surgeon: 'Dr. Aisha Khan', anesthesia: 'Dr. Vikram Sethi', time: '09:30 AM – 11:45 AM', status: 'Completed' }
  ];

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
      badge="3 Tertiary Hospitals"
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
        <KpiCard label="Tertiary Hospitals" value="3 Hospitals" delta="24x7 Open" trend="neutral" subtext="Bengaluru, Mumbai, Delhi" icon="🏢" />
        <KpiCard label="Inpatient Census" value="66 / 76 Beds" delta="86.8% Occupancy" trend="up" subtext="Across ICU & post-op wards" icon="🛏️" />
        <KpiCard label="Operating Theatres" value="12 OT Suites" delta="88.0% Utilized" trend="up" subtext="Laminar airflow Class 100" icon="🔪" />
        <KpiCard label="Critical Care Pods" value="18 ICU Pods" delta="100% telemetry" trend="up" subtext="Continuous vitals logging" icon="💓" />
        <KpiCard label="Blood Bank Inventory" value="26 Units" delta="Safe Reserves" trend="up" subtext="Canine & feline matched" icon="🩸" />
        <KpiCard label="Hospital Billings MTD" value="₹44.45 Lakh" delta="+21.4% YoY" trend="up" subtext="Inpatient & surgical care" icon="💰" />
      </div>

      {/* Flagship Hospital Profiles */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '18px' }}>
        {filteredHospitals.map((h, idx) => (
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
              {otSchedule.map((s, idx) => (
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
