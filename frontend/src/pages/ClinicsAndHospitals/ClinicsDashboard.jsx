import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function ClinicsDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('Today');

  const facilityHighlights = [
    { name: 'Zenve Hospital Koramangala (24x7)', type: 'Tertiary Care Center', city: 'Bengaluru', beds: '28 / 32 Beds', ot: '88% OT Utilized', rev: '₹14.20 Lakh', status: 'Operational' },
    { name: 'Zenve Multi-Specialty Bandra', type: '24x7 Surgical Hospital', city: 'Mumbai', beds: '22 / 24 Beds', ot: '92% OT Utilized', rev: '₹11.85 Lakh', status: 'Operational' },
    { name: 'Zenve Animal Hospital Okhla', type: 'Tertiary Referral Center', city: 'Delhi NCR', beds: '18 / 20 Beds', ot: '84% OT Utilized', rev: '₹9.40 Lakh', status: 'Operational' },
    { name: 'Zenve Care Center Indiranagar', type: 'Primary OPD & Diagnostics', city: 'Bengaluru', beds: 'Daycare Only', ot: 'Minor OT Ready', rev: '₹5.60 Lakh', status: 'Operational' },
    { name: 'Zenve Jubilee Hills Specialty', type: 'Secondary Care Clinic', city: 'Hyderabad', beds: '8 / 10 Beds', ot: '75% OT Utilized', rev: '₹4.80 Lakh', status: 'Operational' },
    { name: 'Zenve Koregaon Park Clinic', type: 'Daycare & Wellness Center', city: 'Pune', beds: 'Daycare Only', ot: 'Minor OT Ready', rev: '₹3.20 Lakh', status: 'Operational' }
  ];

  const liveAdmissions = [
    { id: 'ADM-9024', pet: 'Max (Golden Retriever, 34kg)', reason: 'Gastric Dilatation-Volvulus (GDV Surgery)', facility: 'Koramangala 24x7', doctor: 'Dr. Priya Sharma', bed: 'ICU-02', status: 'In Surgery', time: '14 mins ago' },
    { id: 'ADM-9023', pet: 'Mia (Persian Cat, 3.6kg)', reason: 'Acute Feline Lower Urinary Tract (FLUTD)', facility: 'Bandra Specialty', doctor: 'Dr. Rahul Mehta', bed: 'Feline HDU-04', status: 'Admitted', time: '35 mins ago' },
    { id: 'ADM-9022', pet: 'Rocky (Rottweiler, 42kg)', reason: 'Tibial Plateau Leveling Osteotomy (TPLO)', facility: 'Delhi NCR Hospital', doctor: 'Dr. Aisha Khan', bed: 'Post-Op Ward 1', status: 'Post-Op Recovery', time: '1.2 hrs ago' },
    { id: 'ADM-9021', pet: 'Leo (Beagle, 14kg)', reason: 'Parvovirus Enteritis Protocol', facility: 'Koramangala 24x7', doctor: 'Dr. Arun V.', bed: 'Isolation Bay 3', status: 'Stable', time: '2.5 hrs ago' },
    { id: 'ADM-9020', pet: 'Chloe (Shih Tzu, 5.8kg)', reason: 'Severe Corneal Ulcer & Debridement', facility: 'Jubilee Hills Clinic', doctor: 'Dr. Lakshmi Reddy', bed: 'Daycare Bed 2', status: 'Discharge Ready', time: '3.1 hrs ago' }
  ];

  return (
    <DashboardLayout
      category="Clinics & Hospitals"
      subcategory="Clinics Dashboard"
      title="Veterinary Hospitals & Clinics Command Center"
      subtitle="Network-wide healthcare delivery, inpatient bed census, surgical theatre utilization, and emergency clinical triage"
      icon="🏥"
      badge="14 Network Centers"
      actions={
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div style={{
            display: 'flex',
            background: 'rgba(255,255,255,0.05)',
            padding: '3px',
            borderRadius: '8px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            {['Today', 'This Week', 'This Month', 'YTD'].map(p => (
              <button
                key={p}
                onClick={() => setSelectedPeriod(p)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: selectedPeriod === p ? '#3b82f6' : 'transparent',
                  color: selectedPeriod === p ? '#fff' : '#94a3b8'
                }}
              >
                {p}
              </button>
            ))}
          </div>
          <button
            onClick={() => {
              if (window.ZenveClinicsDashboard && typeof window.ZenveClinicsDashboard.open === 'function') {
                window.ZenveClinicsDashboard.open('patients');
              } else {
                alert('Opening inpatient admission workflow');
              }
            }}
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
            <span>+</span> Admit Emergency Patient
          </button>
        </div>
      }
    >
      {/* Network Overview KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Network Facilities" value="14 Facilities" delta="6 Metros" trend="neutral" subtext="3 Hospitals, 11 Outpatient" icon="🏥" />
        <KpiCard label="Network Inpatient Beds" value="76 / 86 Beds" delta="88.4% Occupancy" trend="up" subtext="24x7 ICU, HDU & Isolation" icon="🛏️" />
        <KpiCard label="OT Surgical Utilization" value="86.2%" delta="+5.4% YoY" trend="up" subtext="12 Active Operating Theatres" icon="⚡" />
        <KpiCard label="In-Clinic Monthly Billings" value="₹49.05 Lakh" delta="+18.2% YoY" trend="up" subtext="OPD, Surgeries & ICU" icon="💰" />
        <KpiCard label="Daily OPD Consults" value="482 Pets" delta="Avg 18m wait time" trend="up" subtext="Across all OPD desks" icon="🐾" />
        <KpiCard label="Emergency Response SLA" value="4.8 Mins" delta="Triage to Vet" trend="up" subtext="Critical care protocol" icon="🚨" />
      </div>

      {/* Facilities & Surgical Theatres Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '18px' }}>
        {/* Flagship Hospital Facilities */}
        <div style={{
          background: 'var(--card, #1e293b)',
          border: '1px solid var(--border, rgba(255,255,255,0.08))',
          borderRadius: '12px',
          padding: '20px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Flagship Centers & Capacity Census</h3>
              <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#94a3b8' }}>Real-time inpatient census and surgical suite occupancy</p>
            </div>
            <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>100% Operational</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {facilityHighlights.map((f, i) => (
              <div key={i} style={{ padding: '10px 12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 600 }}>
                  <span>{f.name}</span>
                  <span style={{ fontFamily: '"IBM Plex Mono", monospace', color: '#38bdf8' }}>{f.rev}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>
                  <span>{f.type} · {f.city}</span>
                  <span><strong>{f.beds}</strong> | <span style={{ color: '#10b981' }}>{f.ot}</span></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Clinical Operations Radar */}
        <div style={{
          background: 'var(--card, #1e293b)',
          border: '1px solid var(--border, rgba(255,255,255,0.08))',
          borderRadius: '12px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Clinical Quality & Diagnostics Status</h3>
                <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#94a3b8' }}>Accreditation, imaging suites, infection control & ambulances</p>
              </div>
              <span style={{ background: 'rgba(16,185,129,0.15)', color: '#10b981', padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600 }}>
                Grade-A Quality
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
              <div style={{ padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>Surgeries Performed (MTD)</span>
                <div style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px', color: '#38bdf8' }}>264 Procedures</div>
                <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>99.2% surgical success rate</div>
              </div>
              <div style={{ padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>Advanced Imaging Hub</span>
                <div style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px', color: '#10b981' }}>CT, DR X-Ray, Echo</div>
                <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>Sub-1 hour reporting</div>
              </div>
              <div style={{ padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>Emergency Ambulances</span>
                <div style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px', color: '#f59e0b' }}>6 Mobile Units</div>
                <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>Oxygen & ventilator fitted</div>
              </div>
              <div style={{ padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>Nosocomial Infection Rate</span>
                <div style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px', color: '#a855f7' }}>0.08% (Industry Lowest)</div>
                <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>UV-C sanitized suites</div>
              </div>
            </div>

            <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)', fontSize: '12px', lineHeight: '1.5', color: '#93c5fd' }}>
              <strong>Clinical Advisory:</strong> 24x7 Blood Bank inventory in Koramangala has received 4 units of Canine Packed RBCs (DEA 1.1 Negative) and 2 units Feline Plasma.
            </div>
          </div>

          <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
            <button
              onClick={() => alert('Exporting Hospital Clinical Quality & Inpatient Census Report (NABH Format)...')}
              style={{
                flex: 1,
                padding: '8px',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#f8fafc',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Export Clinical Census Report
            </button>
            <button
              onClick={() => alert('Dispatching emergency ambulance tracking console...')}
              style={{
                flex: 1,
                padding: '8px',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#f8fafc',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Live Ambulance Console
            </button>
          </div>
        </div>
      </div>

      {/* Live Hospital Emergency & Admissions Stream */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Real-Time Inpatient & Emergency Admissions</h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#94a3b8' }}>Live ICU telemetry, surgical scheduling, and patient ward transfers</p>
          </div>
          <span style={{ fontSize: '11px', color: '#38bdf8', fontWeight: 600 }}>Live Telemetry Active</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: '#94a3b8' }}>
                <th style={{ padding: '8px 12px' }}>Admission ID</th>
                <th style={{ padding: '8px 12px' }}>Pet Patient</th>
                <th style={{ padding: '8px 12px' }}>Clinical Indication / Surgery</th>
                <th style={{ padding: '8px 12px' }}>Admitting Facility</th>
                <th style={{ padding: '8px 12px' }}>Primary Surgeon / Vet</th>
                <th style={{ padding: '8px 12px' }}>Assigned Ward / Bed</th>
                <th style={{ padding: '8px 12px' }}>Status</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Admitted</th>
              </tr>
            </thead>
            <tbody>
              {liveAdmissions.map((adm, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '10px 12px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 600, color: '#38bdf8' }}>{adm.id}</td>
                  <td style={{ padding: '10px 12px', fontWeight: 600 }}>{adm.pet}</td>
                  <td style={{ padding: '10px 12px', color: '#cbd5e1' }}>{adm.reason}</td>
                  <td style={{ padding: '10px 12px', color: '#94a3b8' }}>{adm.facility}</td>
                  <td style={{ padding: '10px 12px', fontWeight: 600 }}>{adm.doctor}</td>
                  <td style={{ padding: '10px 12px', fontFamily: '"IBM Plex Mono", monospace', color: '#38bdf8' }}>{adm.bed}</td>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '99px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: adm.status === 'In Surgery' ? 'rgba(239,68,68,0.15)' :
                        adm.status === 'Admitted' ? 'rgba(245,158,11,0.15)' :
                        adm.status === 'Post-Op Recovery' ? 'rgba(59,130,246,0.15)' : 'rgba(16,185,129,0.15)',
                      color: adm.status === 'In Surgery' ? '#f87171' :
                        adm.status === 'Admitted' ? '#fbbf24' :
                        adm.status === 'Post-Op Recovery' ? '#60a5fa' : '#34d399'
                    }}>
                      {adm.status}
                    </span>
                  </td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', color: '#64748b' }}>{adm.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
