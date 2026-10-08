import React, { useState, useMemo } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function ClinicPatients() {
  const [wardFilter, setWardFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [toast, setToast] = useState('');

  const inpatientList = [];

  const filtered = useMemo(() => {
    return inpatientList.filter(p => {
      const matchWard = wardFilter === 'ALL' || p.wardStatus === wardFilter;
      const matchSearch = search === '' ||
        p.id.toLowerCase().includes(search.toLowerCase()) ||
        p.petName.toLowerCase().includes(search.toLowerCase()) ||
        p.parent.toLowerCase().includes(search.toLowerCase()) ||
        p.diagnosis.toLowerCase().includes(search.toLowerCase());
      return matchWard && matchSearch;
    });
  }, [wardFilter, search]);

  function handleDischarge(petName) {
    setSelectedPatient(null);
    setToast(`Discharge Summary & Home Care Instructions generated for ${petName}!`);
    setTimeout(() => setToast(''), 3500);
  }

  return (
    <DashboardLayout
      category="Clinics & Hospitals"
      subcategory="Clinic Patients"
      title="Inpatient Ward Census & Patient Tracking"
      subtitle="24x7 hospital admissions, ICU critical care telemetry, recovery monitoring, and digital discharge summaries"
      icon="🐾"
      badge=""
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => alert('Exporting full Inpatient Census & Medication Administration Records (MAR)...')}
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
            <span>📋</span> Export Inpatient MAR Records
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
        <KpiCard label="Admitted Inpatients" value="0" delta="0.0%" trend="neutral" subtext="No inpatients admitted" icon="🛏️" />
        <KpiCard label="Critical ICU Pods" value="0" delta="--" trend="neutral" subtext="Continuous vitals telemetry" icon="💓" />
        <KpiCard label="Daily OPD Consults" value="0" delta="0.0%" trend="neutral" subtext="No OPD visits logged" icon="🐾" />
        <KpiCard label="Planned Discharges" value="0" delta="--" trend="neutral" subtext="Post-op recovery cleared" icon="🏡" />
        <KpiCard label="Average Length of Stay" value="0 Days" delta="0.0%" trend="neutral" subtext="Rapid patient stabilization" icon="📅" />
        <KpiCard label="Hospital Infection Rate" value="0.0%" delta="--" trend="neutral" subtext="UV-C sterilized wards" icon="🛡️" />
      </div>

      {/* Patients Filter & Inpatient Census Table */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Active Hospitalized Patients (Inpatient Census)</h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#94a3b8' }}>Live clinical status, vitals telemetry, attending doctor, and scheduled discharge</p>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search patient, parent, diagnosis..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                background: 'rgba(0,0,0,0.2)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                fontSize: '12px',
                width: '220px'
              }}
            />
            <div style={{ display: 'flex', gap: '4px' }}>
              {['ALL', 'Critical ICU', 'High Dependency', 'Stable Inpatient', 'Discharge Ready', 'Isolation Ward'].map(wf => (
                <button
                  key={wf}
                  onClick={() => setWardFilter(wf)}
                  style={{
                    padding: '5px 10px',
                    borderRadius: '6px',
                    border: 'none',
                    fontSize: '11px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    background: wardFilter === wf ? 'rgba(59,130,246,0.25)' : 'rgba(255,255,255,0.05)',
                    color: wardFilter === wf ? '#60a5fa' : '#94a3b8'
                  }}
                >
                  {wf}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: '#94a3b8' }}>
                <th style={{ padding: '8px 12px' }}>Patient & Pet</th>
                <th style={{ padding: '8px 12px' }}>Facility & Bed</th>
                <th style={{ padding: '8px 12px' }}>Clinical Diagnosis</th>
                <th style={{ padding: '8px 12px' }}>Attending Doctor</th>
                <th style={{ padding: '8px 12px' }}>Live Vitals Telemetry</th>
                <th style={{ padding: '8px 12px' }}>Ward Status</th>
                <th style={{ padding: '8px 12px' }}>Discharge ETA</th>
                <th style={{ padding: '8px 12px', textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (<tr><td colSpan="8" style={{ textAlign: "center", padding: "32px", color: "var(--muted-foreground, #64748b)" }}>No patient records found</td></tr>) : filtered.map((pt, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '10px 12px' }}>
                    <div style={{ fontWeight: 600, color: '#fff' }}>{pt.petName}</div>
                    <div style={{ fontSize: '10px', color: '#38bdf8' }}>{pt.species} · {pt.weight}</div>
                    <div style={{ fontSize: '10px', color: '#64748b' }}>{pt.id}</div>
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <div style={{ fontWeight: 600, color: '#cbd5e1' }}>{pt.bed}</div>
                    <div style={{ fontSize: '10px', color: '#94a3b8' }}>{pt.facility}</div>
                  </td>
                  <td style={{ padding: '10px 12px', maxWidth: '200px' }}>
                    <div style={{ color: '#fff' }}>{pt.diagnosis}</div>
                  </td>
                  <td style={{ padding: '10px 12px', fontWeight: 600, color: '#cbd5e1' }}>
                    {pt.doctor}
                  </td>
                  <td style={{ padding: '10px 12px', fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px', color: '#38bdf8' }}>
                    {pt.vitals}
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '99px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: pt.wardStatus === 'Critical ICU' ? 'rgba(239,68,68,0.15)' :
                        pt.wardStatus === 'Discharge Ready' ? 'rgba(16,185,129,0.15)' :
                        pt.wardStatus === 'Isolation Ward' ? 'rgba(245,158,11,0.15)' : 'rgba(59,130,246,0.15)',
                      color: pt.wardStatus === 'Critical ICU' ? '#f87171' :
                        pt.wardStatus === 'Discharge Ready' ? '#34d399' :
                        pt.wardStatus === 'Isolation Ward' ? '#fbbf24' : '#60a5fa'
                    }}>
                      {pt.wardStatus}
                    </span>
                  </td>
                  <td style={{ padding: '10px 12px', color: '#cbd5e1' }}>
                    {pt.dischargeEta}
                  </td>
                  <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                    <button
                      onClick={() => setSelectedPatient(pt)}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        background: 'rgba(59,130,246,0.2)',
                        border: '1px solid rgba(59,130,246,0.4)',
                        color: '#60a5fa',
                        fontSize: '11px',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Chart & Plan
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Patient Chart Modal */}
      {selectedPatient && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999
        }}>
          <div style={{
            background: '#1e293b',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
            padding: '24px',
            width: '90%',
            maxWidth: '560px',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px' }}>
              <div>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>INPATIENT MEDICAL CHART</span>
                <h3 style={{ margin: '2px 0 0', fontSize: '18px', fontWeight: 700, color: '#38bdf8' }}>{selectedPatient.petName} ({selectedPatient.id})</h3>
              </div>
              <span style={{ padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600, background: 'rgba(59,130,246,0.15)', color: '#60a5fa' }}>
                {selectedPatient.bed}
              </span>
            </div>

            <div style={{ marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px' }}>
              <div style={{ padding: '10px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
                <span style={{ color: '#94a3b8' }}>Pet Parent:</span> <strong>{selectedPatient.parent}</strong>
                <div style={{ marginTop: '4px', color: '#cbd5e1' }}>Species: {selectedPatient.species} · Weight: {selectedPatient.weight}</div>
              </div>
              <div style={{ padding: '10px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
                <span style={{ color: '#94a3b8' }}>Diagnosis:</span>
                <div style={{ marginTop: '4px', fontWeight: 600, color: '#fff' }}>{selectedPatient.diagnosis}</div>
              </div>
              <div style={{ padding: '10px', background: 'rgba(6,182,212,0.1)', borderRadius: '8px', border: '1px solid rgba(6,182,212,0.25)', color: '#38bdf8' }}>
                <span>Real-Time Vitals:</span> <strong>{selectedPatient.vitals}</strong>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px' }}>
              <button
                onClick={() => setSelectedPatient(null)}
                style={{ padding: '8px 16px', borderRadius: '6px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', cursor: 'pointer' }}
              >
                Close
              </button>
              <button
                onClick={() => handleDischarge(selectedPatient.petName)}
                style={{ padding: '8px 16px', borderRadius: '6px', background: '#10b981', border: 'none', color: '#fff', fontWeight: 600, cursor: 'pointer' }}
              >
                Generate Discharge Summary
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
