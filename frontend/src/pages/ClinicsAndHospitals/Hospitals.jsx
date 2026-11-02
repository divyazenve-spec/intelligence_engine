import React, { useState, useEffect } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

const INITIAL_HOSPITALS = [
  {
    name: 'Zenve Main Hospital',
    code: 'CLN-ZIP-3',
    city: 'Bengaluru',
    status: 'Open 24x7',
    type: 'Tertiary Referral Hospital & Surgical Center',
    bedsOccupied: 1,
    bedsTotal: 15,
    icuPods: 4,
    otCount: '2 Modular OTs',
    otUtilization: '85% active',
    leadSurgeon: 'Dr. Lakshmanan M',
    imaging: '128-Slice High-Res CT, 1.5T MRI & Digital Fluoroscopy',
    bloodBank: 'Canine DEA 1.1 Negative & Feline Type A Units Banked',
    monthlyBillings: '₹14,80,000'
  },
  {
    name: 'Global Clinic & Specialty Center',
    code: 'CLN-ZIP-5',
    city: 'Bangalore',
    status: 'Open 24x7',
    type: 'Specialty Surgical Center & Daycare Suites',
    bedsOccupied: 0,
    bedsTotal: 6,
    icuPods: 2,
    otCount: '1 Modular OT',
    otUtilization: '70% active',
    leadSurgeon: 'Dr. Vasanth',
    imaging: 'Digital High-Frequency X-Ray & Ultrasound Doppler',
    bloodBank: 'Emergency Cross-Match Reagents & Plasma Reserves',
    monthlyBillings: '₹9,40,000'
  },
  {
    name: 'Globa Pet Care Clinic',
    code: 'CLN-ZIP-4',
    city: 'Bengaluru',
    status: 'Open 24x7',
    type: 'Outpatient Care & Preventive Hospital',
    bedsOccupied: 0,
    bedsTotal: 6,
    icuPods: 1,
    otCount: '1 Minor OT',
    otUtilization: '60% active',
    leadSurgeon: 'Dr. John',
    imaging: 'In-House Digital Radiography & Ultrasound',
    bloodBank: 'Whole Blood Delivery within 15 mins via ALS Ambulance',
    monthlyBillings: '₹7,20,000'
  }
];

const INITIAL_OT_SCHEDULE = [
  {
    ot: 'OT Suite 1',
    patient: 'Jimmy (German Shepherd)',
    procedure: 'Soft Tissue Wound Debridement & Closure',
    surgeon: 'Dr. Lakshmanan M',
    anesthesia: 'Dr. Vasanth',
    time: 'Today 16:30 - 17:30',
    status: 'In Progress'
  },
  {
    ot: 'OT Suite 2',
    patient: 'Max (Golden Retriever)',
    procedure: 'Dental Prophylaxis & Scaling',
    surgeon: 'Dr. Vasanth',
    anesthesia: 'Dr. Yuvaraj',
    time: 'Tomorrow 10:00 - 11:30',
    status: 'Scheduled'
  }
];

export default function Hospitals() {
  const [selectedHospital, setSelectedHospital] = useState('ALL');
  const [toast, setToast] = useState('');
  const [hospitalsData, setHospitalsData] = useState(INITIAL_HOSPITALS);
  const [otSchedule, setOtSchedule] = useState(INITIAL_OT_SCHEDULE);

  useEffect(() => {
    fetch('/api/v1/clinics')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map(c => {
            const isFlagship = (c.name || '').toLowerCase().includes('zenve') || (c.beds_capacity || 0) >= 10;
            return {
              name: c.name,
              code: c.clinic_code || `CLN-${c.id}`,
              city: c.city || 'Bengaluru',
              status: c.operational_status || 'Open 24x7',
              type: isFlagship ? 'Tertiary Referral Hospital & Surgical Center' : 'Specialty Surgical Center',
              bedsOccupied: isFlagship ? 1 : 0,
              bedsTotal: c.beds_capacity || 6,
              icuPods: isFlagship ? 4 : 2,
              otCount: isFlagship ? '2 Modular OTs' : '1 Modular OT',
              otUtilization: isFlagship ? '85% active' : '70% active',
              leadSurgeon: (c.name || '').toLowerCase().includes('global') ? 'Dr. Vasanth' : 'Dr. Lakshmanan M',
              imaging: isFlagship ? '128-Slice High-Res CT, 1.5T MRI & Digital Fluoroscopy' : 'Digital High-Frequency X-Ray',
              bloodBank: 'Emergency Cross-Match Reagents & Plasma Reserves',
              monthlyBillings: isFlagship ? '₹14,80,000' : '₹9,40,000'
            };
          });
          setHospitalsData(mapped);
        }
      })
      .catch(err => console.error("Error fetching hospitals:", err));
  }, []);

  const filteredHospitals = selectedHospital === 'ALL' ? hospitalsData : hospitalsData.filter(h => h.code === selectedHospital);

  function handleBookOT() {
    setToast('Surgical Operating Theatre (OT) slot booked and anesthesiology team notified!');
    setTimeout(() => setToast(''), 3500);
  }

  const totalBeds = hospitalsData.reduce((acc, h) => acc + (h.bedsTotal || 6), 0);
  const occupiedBeds = hospitalsData.reduce((acc, h) => acc + (h.bedsOccupied || 0), 0);

  return (
    <DashboardLayout
      category="Clinics & Hospitals"
      subcategory="Hospitals"
      title="24x7 Multi-Specialty Veterinary Hospitals"
      subtitle="Inpatient bed census, surgical operating suites, ICU pods, blood bank reserves, and advanced diagnostic imaging"
      icon="🏢"
      badge="Live Hospital Census"
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
        <KpiCard label="Tertiary Hospitals" value={`${hospitalsData.length} Centers`} delta="100% Active" trend="up" subtext="Zenve, Global & Globa hubs" icon="🏢" />
        <KpiCard label="Inpatient Census" value={`${occupiedBeds} / ${totalBeds} Beds`} delta="Jimmy in ICU" trend="up" subtext="Across ICU & post-op wards" icon="🛏️" />
        <KpiCard label="Operating Theatres" value="4 Modular OTs" delta="1 Active Now" trend="up" subtext="Surgical suites live" icon="🔪" />
        <KpiCard label="Critical Care Pods" value="7 ICU Pods" delta="Online" trend="up" subtext="Continuous vitals logging" icon="💓" />
        <KpiCard label="Blood Bank Inventory" value="18 Units" delta="Cross-matched" trend="up" subtext="Canine & feline matched" icon="🩸" />
        <KpiCard label="Hospital Billings MTD" value="₹31.40 L" delta="+14.2%" trend="up" subtext="Inpatient & surgical care" icon="💰" />
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
