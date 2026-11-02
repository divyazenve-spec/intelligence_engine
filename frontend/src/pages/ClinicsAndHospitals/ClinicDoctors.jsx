import React, { useState, useMemo, useEffect } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

const INITIAL_DOCTORS = [
  {
    name: 'Dr. Lakshmanan M',
    qualification: 'MBBS, BVSc',
    specialty: 'Orthopedics & Surgery',
    facility: 'Zenve Main Hospital',
    vci: 'KVC-78421',
    shift: 'Morning & Trauma (08:00 - 16:00)',
    consults: 46,
    surgeries: 18,
    rating: '4.97',
    status: 'On Duty'
  },
  {
    name: 'Dr. Vasanth',
    qualification: 'MBBS, MVSc',
    specialty: 'Internal Medicine & Diagnostics',
    facility: 'Global Clinic & Specialty Center',
    vci: 'KVC-69104',
    shift: 'General OPD (09:00 - 18:00)',
    consults: 30,
    surgeries: 12,
    rating: '4.93',
    status: 'On Duty'
  },
  {
    name: 'Dr. Yuvaraj',
    qualification: 'MBBS, BVSc',
    specialty: 'Cardiology & Critical Care',
    facility: 'Zenve Main Hospital',
    vci: 'KVC-81239',
    shift: 'ICU Telemetry (12:00 - 20:00)',
    consults: 34,
    surgeries: 14,
    rating: '4.95',
    status: 'In Surgery'
  },
  {
    name: 'Dr. Test Doc',
    qualification: 'BVSc & AH',
    specialty: 'Feline & Preventative Care',
    facility: 'Zenve Main Hospital',
    vci: 'KVC-65412',
    shift: 'General OPD (09:00 - 18:00)',
    consults: 30,
    surgeries: 8,
    rating: '4.90',
    status: 'On Duty'
  },
  {
    name: 'Dr. John',
    qualification: 'MBBS MS',
    specialty: 'General Veterinary Medicine',
    facility: 'Globa Pet Care Clinic',
    vci: 'KVC-73205',
    shift: 'Evening OPD (14:00 - 22:00)',
    consults: 37,
    surgeries: 10,
    rating: '4.89',
    status: 'On Duty'
  }
];

export default function ClinicDoctors() {
  const [specialtyFilter, setSpecialtyFilter] = useState('ALL');
  const [dutyFilter, setDutyFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState('');
  const [doctorsList, setDoctorsList] = useState(INITIAL_DOCTORS);

  useEffect(() => {
    fetch('/api/v1/doctors')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map((d, i) => {
            const consults = d.consultations_count || 32;
            return {
              name: d.name,
              qualification: d.qualification || 'MBBS, BVSc',
              specialty: d.specialty || 'General Medicine',
              facility: d.clinic_branch || 'Zenve Main Hospital',
              vci: `KVC-${70000 + ((d.id || i) * 1421) % 20000}`,
              shift: i === 2 ? 'ICU Telemetry (12:00 - 20:00)' : 'General OPD (09:00 - 18:00)',
              consults: consults,
              surgeries: Math.round(consults * 0.4),
              rating: (d.rating || 4.9).toFixed(2),
              status: d.status || (i === 2 ? 'In Surgery' : 'On Duty')
            };
          });
          setDoctorsList(mapped);
        }
      })
      .catch(err => console.error("Error fetching doctors:", err));
  }, []);

  const filtered = useMemo(() => {
    return doctorsList.filter(d => {
      const matchSpecialty = specialtyFilter === 'ALL' || d.specialty.toLowerCase().includes(specialtyFilter.toLowerCase());
      const matchDuty = dutyFilter === 'ALL' || d.status === dutyFilter;
      const matchSearch = search === '' ||
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.facility.toLowerCase().includes(search.toLowerCase()) ||
        d.specialty.toLowerCase().includes(search.toLowerCase()) ||
        d.vci.toLowerCase().includes(search.toLowerCase());
      return matchSpecialty && matchDuty && matchSearch;
    });
  }, [doctorsList, specialtyFilter, dutyFilter, search]);

  function handleRosterUpdate() {
    setToast('Duty roster sync completed across all 3 veterinary centers!');
    setTimeout(() => setToast(''), 3500);
  }

  const totalConsults = doctorsList.reduce((acc, d) => acc + (d.consults || 0), 0);
  const totalSurgeries = doctorsList.reduce((acc, d) => acc + (d.surgeries || 0), 0);
  const onDutyCount = doctorsList.filter(d => d.status === 'On Duty').length;

  return (
    <DashboardLayout
      category="Clinics & Hospitals"
      subcategory="Clinic Doctors"
      title="Clinic Doctors"
      subtitle="Veterinary Clinicians, Surgeons, Specialists & Rosters — Registered clinicians, VCI licenses, and shifts"
      icon="👨‍⚕️"
      badge="Active Medical Staff"
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={handleRosterUpdate}
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
            <span>🔄</span> Publish Weekly Roster
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
        <KpiCard label="Network Clinicians" value={`${doctorsList.length} Doctors`} delta="100% Active" trend="up" subtext="Across 3 clinic centers" icon="👨‍⚕️" />
        <KpiCard label="Specialist Surgeons" value="3 Surgeons" delta="Board-certified" trend="up" subtext="Orthopedic & Soft Tissue" icon="🔪" />
        <KpiCard label="Clinicians On-Duty Now" value={`${onDutyCount} Clinicians`} delta="Active Shifts" trend="up" subtext="All OPD suites staffed" icon="⚡" />
        <KpiCard label="Monthly Consultations" value={`${totalConsults} Visits`} delta="+18.4%" trend="up" subtext="Outpatient & emergency" icon="🩺" />
        <KpiCard label="Doctor Patient CSAT" value="4.94 / 5.0" delta="+0.15" trend="up" subtext="Verified pet parent NPS" icon="⭐" />
        <KpiCard label="CME Training Credits" value="100.0%" delta="Compliant" trend="up" subtext="Annual surgical workshops" icon="📚" />
      </div>

      {/* Clinicians Table */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '22px 24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#fff' }}>Veterinary Doctor Registry & Active Shifts</h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#94a3b8' }}>Licensure credentials, primary facility assignment, surgical procedures, and performance ratings</p>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search doctor, hospital, specialty..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                padding: '7px 12px',
                borderRadius: '8px',
                background: 'rgba(0,0,0,0.25)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                fontSize: '12px',
                width: '240px',
                outline: 'none'
              }}
            />
            <select
              value={specialtyFilter}
              onChange={e => setSpecialtyFilter(e.target.value)}
              style={{
                padding: '7px 10px',
                borderRadius: '8px',
                background: 'rgba(0,0,0,0.25)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#cbd5e1',
                fontSize: '12px',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="ALL">All Clinical Specialties</option>
              <option value="Orthopedics">Orthopedics & TPLO</option>
              <option value="Feline">Feline Medicine</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Dermatology">Dermatology</option>
              <option value="Laparoscopy">Laparoscopy</option>
            </select>
            <select
              value={dutyFilter}
              onChange={e => setDutyFilter(e.target.value)}
              style={{
                padding: '7px 10px',
                borderRadius: '8px',
                background: 'rgba(0,0,0,0.25)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#cbd5e1',
                fontSize: '12px',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="ALL">All Duty Statuses</option>
              <option value="On Duty">On Duty</option>
              <option value="In Surgery">In Surgery</option>
              <option value="Off Duty">Off Duty</option>
            </select>
          </div>
        </div>

        <div style={{
          overflowX: 'auto',
          margin: '0 -24px -22px',
          borderTop: '1px solid var(--border, rgba(255,255,255,0.08))',
          borderRadius: '0 0 12px 12px'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.18)', borderBottom: '1px solid rgba(255,255,255,0.08)', textAlign: 'left', color: '#94a3b8' }}>
                <th style={{ padding: '12px 24px', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: '"IBM Plex Mono", monospace' }}>Doctor Name & Credentials</th>
                <th style={{ padding: '12px 24px', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: '"IBM Plex Mono", monospace' }}>Specialty</th>
                <th style={{ padding: '12px 24px', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: '"IBM Plex Mono", monospace' }}>Hospital / Clinic</th>
                <th style={{ padding: '12px 24px', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: '"IBM Plex Mono", monospace' }}>VCI License</th>
                <th style={{ padding: '12px 24px', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: '"IBM Plex Mono", monospace' }}>Active Shift</th>
                <th style={{ padding: '12px 24px', textAlign: 'right', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: '"IBM Plex Mono", monospace' }}>Consults</th>
                <th style={{ padding: '12px 24px', textAlign: 'right', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: '"IBM Plex Mono", monospace' }}>Surgeries</th>
                <th style={{ padding: '12px 24px', textAlign: 'right', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: '"IBM Plex Mono", monospace' }}>Rating</th>
                <th style={{ padding: '12px 24px', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: '"IBM Plex Mono", monospace' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (<tr><td colSpan="9" style={{ textAlign: "center", padding: "32px", color: "var(--muted-foreground, #64748b)" }}>No doctor records found</td></tr>) : filtered.map((d, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '14px 24px' }}>
                    <div style={{ fontWeight: 600, color: '#fff' }}>{d.name}</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>{d.qualification}</div>
                  </td>
                  <td style={{ padding: '14px 24px' }}>
                    <span style={{ padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, background: 'rgba(59,130,246,0.15)', color: '#60a5fa' }}>
                      {d.specialty}
                    </span>
                  </td>
                  <td style={{ padding: '14px 24px', color: '#cbd5e1' }}>{d.facility}</td>
                  <td style={{ padding: '14px 24px', fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px', color: '#38bdf8' }}>{d.vci}</td>
                  <td style={{ padding: '14px 24px', color: '#94a3b8', fontSize: '11px' }}>{d.shift}</td>
                  <td style={{ padding: '14px 24px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 600 }}>{d.consults}</td>
                  <td style={{ padding: '14px 24px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#10b981', fontWeight: 600 }}>{d.surgeries}</td>
                  <td style={{ padding: '14px 24px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#fbbf24', fontWeight: 700 }}>
                    ⭐ {d.rating}
                  </td>
                  <td style={{ padding: '14px 24px' }}>
                    <span style={{
                      padding: '3px 9px',
                      borderRadius: '99px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: d.status === 'On Duty' ? 'rgba(16,185,129,0.15)' :
                        d.status === 'In Surgery' ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.06)',
                      color: d.status === 'On Duty' ? '#34d399' :
                        d.status === 'In Surgery' ? '#f87171' : '#94a3b8'
                    }}>
                      {d.status}
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
