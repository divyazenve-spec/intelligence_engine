import React, { useState, useMemo } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function ClinicDoctors() {
  const [specialtyFilter, setSpecialtyFilter] = useState('ALL');
  const [dutyFilter, setDutyFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState('');

  const doctorsList = [
    { id: 'DOC-01', name: 'Dr. Priya Sharma', qualification: 'B.V.Sc & A.H, M.V.Sc (Surgery & Radiology)', specialty: 'Orthopedics & TPLO', facility: 'Koramangala 24x7 Hospital', vci: 'VCI-KAR-2018-842', shift: 'Morning (08:00 – 16:00)', consults: 412, surgeries: 48, rating: 4.96, status: 'On Duty' },
    { id: 'DOC-02', name: 'Dr. Rahul Mehta', qualification: 'B.V.Sc & A.H, M.V.Sc (Veterinary Medicine)', specialty: 'Feline Medicine & Critical Care', facility: 'Bandra West Hospital', vci: 'VCI-MAH-2015-110', shift: 'Evening (14:00 – 22:00)', consults: 365, surgeries: 34, rating: 4.93, status: 'In Surgery' },
    { id: 'DOC-03', name: 'Dr. Aisha Khan', qualification: 'B.V.Sc & A.H, M.V.Sc (Surgery)', specialty: 'Cardiology & Soft Tissue', facility: 'Delhi NCR Hospital', vci: 'VCI-DEL-2019-304', shift: 'Morning (08:00 – 16:00)', consults: 340, surgeries: 38, rating: 4.91, status: 'On Duty' },
    { id: 'DOC-04', name: 'Dr. Arun V.', qualification: 'B.V.Sc & A.H', specialty: 'General OPD & Infectious Diseases', facility: 'Care Center Indiranagar', vci: 'VCI-KAR-2020-112', shift: 'Morning (09:00 – 17:00)', consults: 380, surgeries: 12, rating: 4.94, status: 'On Duty' },
    { id: 'DOC-05', name: 'Dr. Lakshmi Reddy', qualification: 'B.V.Sc & A.H, M.V.Sc (Pathology)', specialty: 'Dermatology & Internal Medicine', facility: 'Jubilee Hills Specialty', vci: 'VCI-TEL-2017-488', shift: 'Morning (09:00 – 17:00)', consults: 310, surgeries: 16, rating: 4.90, status: 'On Duty' },
    { id: 'DOC-06', name: 'Dr. Sneha Kulkarni', qualification: 'B.V.Sc & A.H, M.V.Sc (Surgery)', specialty: 'Minimally Invasive Laparoscopy', facility: 'Koregaon Park Clinic', vci: 'VCI-MAH-2018-902', shift: 'Evening (13:00 – 21:00)', consults: 290, surgeries: 22, rating: 4.88, status: 'Off Duty' },
    { id: 'DOC-07', name: 'Dr. Karan Patel', qualification: 'B.V.Sc & A.H, PG Cert (Ophthalmology)', specialty: 'Ophthalmology & Corneal Repair', facility: 'Ahmedabad Partner Hub', vci: 'VCI-GUJ-2020-512', shift: 'Morning (09:00 – 17:00)', consults: 260, surgeries: 28, rating: 4.92, status: 'On Duty' }
  ];

  const filtered = useMemo(() => {
    return doctorsList.filter(d => {
      const matchSpecialty = specialtyFilter === 'ALL' || d.specialty.includes(specialtyFilter);
      const matchDuty = dutyFilter === 'ALL' || d.status === dutyFilter;
      const matchSearch = search === '' ||
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.facility.toLowerCase().includes(search.toLowerCase()) ||
        d.specialty.toLowerCase().includes(search.toLowerCase()) ||
        d.vci.toLowerCase().includes(search.toLowerCase());
      return matchSpecialty && matchDuty && matchSearch;
    });
  }, [specialtyFilter, dutyFilter, search]);

  function handleRosterUpdate() {
    setToast('Duty roster sync completed across all 14 hospital emergency centers!');
    setTimeout(() => setToast(''), 3500);
  }

  return (
    <DashboardLayout
      category="Clinics & Hospitals"
      subcategory="Clinic Doctors"
      title="Clinic Doctors"
      subtitle="Veterinary Clinicians, Surgeons, Specialists & Rosters — 48 registered clinicians, VCI licenses, and shifts"
      icon="👨‍⚕️"
      badge="48 Verified Clinicians"
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
        <KpiCard label="Network Clinicians" value="48 Veterinarians" delta="100% VCI Verified" trend="up" subtext="Across all 14 centers" icon="👨‍⚕️" />
        <KpiCard label="Specialist Surgeons" value="14 Specialists" delta="Orthopedic & Soft-tissue" trend="neutral" subtext="Board-certified M.V.Sc" icon="🔪" />
        <KpiCard label="Clinicians On-Duty Now" value="32 Active" delta="12 Shift Handover" trend="up" subtext="All OPD suites staffed" icon="⚡" />
        <KpiCard label="Daily Consults / Doc" value="16.2 Pets" delta="Optimal consult load" trend="up" subtext="Avg 18m / patient" icon="🩺" />
        <KpiCard label="Doctor Patient CSAT" value="4.93 / 5.0" delta="Top Clinical Rating" trend="up" subtext="4,210 verified reviews" icon="⭐" />
        <KpiCard label="CME Training Credits" value="100% Up to Date" delta="Continuing Education" trend="up" subtext="Annual surgical workshops" icon="📚" />
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
              {filtered.map((d, idx) => (
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
