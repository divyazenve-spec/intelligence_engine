import React, { useState, useMemo } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function ClinicDoctors() {
  const [specialtyFilter, setSpecialtyFilter] = useState('ALL');
  const [dutyFilter, setDutyFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState('');

  const doctorsList = [];

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
      badge=""
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
        <KpiCard label="Network Clinicians" value="0" delta="--" trend="neutral" subtext="No centers active" icon="👨‍⚕️" />
        <KpiCard label="Specialist Surgeons" value="0" delta="--" trend="neutral" subtext="Board-certified M.V.Sc" icon="🔪" />
        <KpiCard label="Clinicians On-Duty Now" value="0" delta="--" trend="neutral" subtext="All OPD suites staffed" icon="⚡" />
        <KpiCard label="Daily Consults / Doc" value="0" delta="--" trend="neutral" subtext="No consults logged" icon="🩺" />
        <KpiCard label="Doctor Patient CSAT" value="0.0" delta="--" trend="neutral" subtext="No reviews recorded" icon="⭐" />
        <KpiCard label="CME Training Credits" value="0.0%" delta="--" trend="neutral" subtext="Annual surgical workshops" icon="📚" />
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
              {filtered.length === 0 ? (<tr><td colSpan="8" style={{ textAlign: "center", padding: "32px", color: "var(--muted-foreground, #64748b)" }}>No doctor records found</td></tr>) : filtered.map((d, idx) => (
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
