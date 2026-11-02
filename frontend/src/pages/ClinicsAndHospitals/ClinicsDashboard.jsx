import React, { useState, useEffect } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function ClinicsDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('Today');
  const [facilityHighlights, setFacilityHighlights] = useState([]);
  const [liveAdmissions, setLiveAdmissions] = useState([]);
  const [stationedDoctors, setStationedDoctors] = useState([]);

  useEffect(() => {
    fetch('/api/v1/clinics')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const list = data.map(c => {
            const rawName = (c.name || '').trim();
            let fullName = rawName;
            if (rawName.toLowerCase() === 'zenve') fullName = 'Zenve Main Hospital';
            else if (rawName.toLowerCase() === 'global clinic') fullName = 'Global Clinic & Specialty Center';
            else if (rawName.toLowerCase() === 'globa') fullName = 'Globa Pet Care Clinic';

            const beds = c.beds_capacity || (rawName.toLowerCase().includes('zenve') ? 15 : 6);
            const isTertiary = beds >= 10 || fullName.toLowerCase().includes('hospital');

            let lead = 'Dr. Lakshmanan M';
            if (rawName.toLowerCase().includes('global')) lead = 'Dr. Vasanth';
            else if (rawName.toLowerCase() === 'globa') lead = 'Dr. John';
            else if (rawName.toLowerCase().includes('zenve')) lead = 'Dr. Lakshmanan M & Dr. Yuvaraj';

            return {
              id: c.clinic_code || `CLN-${c.id}`,
              name: fullName,
              city: c.city || 'Bengaluru',
              type: isTertiary ? 'Tertiary Referral Center' : 'Specialty Clinic',
              beds: `${beds} Beds Capacity`,
              ot: isTertiary ? '2 Modular OTs' : '1 Minor OT',
              rev: isTertiary ? '₹14.80 L' : (rawName.toLowerCase() === 'globa' ? '₹7.20 L' : '₹9.40 L'),
              status: c.operational_status || 'Open 24x7',
              lead: lead,
              phone: c.phone || (rawName.toLowerCase().includes('zenve') ? '9345750275' : rawName.toLowerCase().includes('global') ? '6380924878' : '9874561230'),
              address: c.address || 'Pattabhirama Nagara, Bengaluru'
            };
          });
          setFacilityHighlights(list);
        }
      })
      .catch(err => console.error('Failed to load clinics:', err));

    fetch('/api/v1/doctors')
      .then(r => r.json())
      .then(docs => {
        if (Array.isArray(docs) && docs.length > 0) {
          setStationedDoctors(docs);
        }
      })
      .catch(err => console.error('Failed to load doctors in clinics dashboard:', err));

    fetch('/api/v1/zippy/all-clinical-records')
      .then(r => r.json())
      .then(data => {
        const admissions = [];
        if (data.medical_records && data.medical_records.length > 0) {
          data.medical_records.forEach((m, idx) => {
            admissions.push({
              id: m.record_code || `ADM-0${idx + 1}`,
              pet: `${m.pet_name} (${m.weight_kg ? m.weight_kg + 'kg' : 'Canine'})`,
              reason: m.diagnosis || 'Clinical evaluation and wellness monitoring',
              facility: 'Zenve Main Hospital',
              doctor: m.doctor_name || 'Dr. Lakshmanan M',
              bed: `Ward Bay ${idx + 1}A`,
              status: 'Admitted',
              time: '10:30 AM'
            });
          });
        }
        if (admissions.length === 0) {
          admissions.push({
            id: 'ADM-ZIP-1',
            pet: 'Jimmy (German Shepherd)',
            reason: 'Post-consult recovery & oral amoxicillin protocol',
            facility: 'Zenve Main Hospital',
            doctor: 'Dr. Lakshmanan M',
            bed: 'Ward Bay 1A (ICU)',
            status: 'Admitted',
            time: '09:45 AM'
          });
        }
        setLiveAdmissions(admissions);
      })
      .catch(err => console.error('Failed to load admissions:', err));
  }, []);

  return (
    <DashboardLayout
      category="Clinics & Hospitals"
      subcategory="Clinics Dashboard"
      title="Veterinary Hospitals & Clinics Command Center"
      subtitle="Network-wide healthcare delivery, inpatient bed census, surgical theatre utilization, and emergency clinical triage"
      icon="🏥"
      badge=""
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
        <KpiCard label="Network Facilities" value={`${facilityHighlights.length || 3} Centers`} delta="+100% Online" trend="up" subtext="Zenve, Global & Globa hubs" icon="🏥" />
        <KpiCard label="Network Inpatient Beds" value="27 Licensed" delta="15 ICU Pods" trend="up" subtext="Zero bed overflow" icon="🛏️" />
        <KpiCard label="OT Surgical Utilization" value="84.2%" delta="+6.4%" trend="up" subtext="Active modular suites" icon="⚡" />
        <KpiCard label="In-Clinic Monthly Billings" value="₹31.40 L" delta="+14.2%" trend="up" subtext="OPD, Surgeries & ICU" icon="💰" />
        <KpiCard label="Daily OPD Consults" value="84 Pets/day" delta="+18.4%" trend="up" subtext="Across all 3 centers" icon="🐾" />
        <KpiCard label="Emergency Response SLA" value="12 Mins" delta="Fast-Track" trend="up" subtext="ALS Ambulance ready" icon="🚨" />
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
            {facilityHighlights.length === 0 ? (<div style={{ textAlign: "center", padding: "32px", color: "var(--muted-foreground, #64748b)" }}>No facility highlight records found</div>) : facilityHighlights.map((f, i) => (
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
              {liveAdmissions.length === 0 ? (<tr><td colSpan="8" style={{ textAlign: "center", padding: "32px", color: "var(--muted-foreground, #64748b)" }}>No admission records found</td></tr>) : liveAdmissions.map((adm, idx) => (
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

      {/* Attending Veterinary Specialists Stationed Across Clinics */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px',
        marginTop: '16px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>👨‍⚕️ Attending Veterinary Specialists Stationed Across Clinics</h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#94a3b8' }}>State veterinary council accreditation, hospital base assignment, consultations, and ratings</p>
          </div>
          <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>100% On-Duty</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: '#94a3b8' }}>
                <th style={{ padding: '8px 12px' }}>Doctor Name & Code</th>
                <th style={{ padding: '8px 12px' }}>Specialty & Qualifications</th>
                <th style={{ padding: '8px 12px' }}>Assigned Clinic Base</th>
                <th style={{ padding: '8px 12px' }}>Contact Phone</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Consultations</th>
                <th style={{ padding: '8px 12px', textAlign: 'center' }}>CSAT Rating</th>
                <th style={{ padding: '8px 12px', textAlign: 'center' }}>Duty Status</th>
              </tr>
            </thead>
            <tbody>
              {stationedDoctors.length === 0 ? (
                <tr><td colSpan="7" style={{ textAlign: "center", padding: "24px", color: "#94a3b8" }}>No doctor records found</td></tr>
              ) : stationedDoctors.map(d => (
                <tr key={d.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '10px 12px' }}>
                    <div style={{ fontWeight: 700, color: '#f8fafc' }}>{d.name}</div>
                    <div style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '10px', color: '#38bdf8' }}>{d.doctor_code || `DOC-${d.id}`}</div>
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <div style={{ fontWeight: 600, color: '#cbd5e1' }}>{d.specialty}</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>{d.qualification} · {d.experience_years} yrs exp</div>
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{ background: 'rgba(56,189,248,0.15)', color: '#38bdf8', padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600 }}>
                      {d.clinic_branch || 'Zenve Main Hospital'}
                    </span>
                  </td>
                  <td style={{ padding: '10px 12px', fontFamily: '"IBM Plex Mono", monospace', color: '#94a3b8' }}>{d.phone}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 700, color: '#f8fafc' }}>
                    {d.consultations_count || 32} consults
                  </td>
                  <td style={{ padding: '10px 12px', textAlign: 'center', color: '#fbbf24', fontWeight: 700 }}>
                    ★ {(d.rating || 4.9).toFixed(1)}
                  </td>
                  <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '99px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: 'rgba(16,185,129,0.15)',
                      color: '#34d399'
                    }}>
                      {d.status || 'On Duty'}
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
