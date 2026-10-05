import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function Procedures() {
  const [otFilter, setOtFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const procedures = [
    { id: 'SUR-701', patient: 'Thor (Rottweiler)', parent: 'Deepak Varma', procedureName: 'Tibial Plateau Leveling Osteotomy (TPLO Left Stifle)', theater: 'OT 1 (Orthopedic Suite)', leadSurgeon: 'Dr. Rahul Mehta', anesthetist: 'Dr. Neha Singh', duration: '95 mins', anesthesiaType: 'Isoflurane + Epidural Bupivacaine', recoveryStatus: 'Extubated / Stable ICU', status: 'Completed' },
    { id: 'SUR-702', patient: 'Daisy (Lhasa Apso)', parent: 'Nandita Bose', procedureName: 'Full Mouth Dental Prophylaxis & Ultrasonic Scaling', theater: 'Dental / Minor OT', leadSurgeon: 'Dr. Priya Sharma', anesthetist: 'Dr. Karan Patel', duration: '50 mins', anesthesiaType: 'Propofol Induction + Isoflurane', recoveryStatus: 'Discharged to Day Care', status: 'Completed' },
    { id: 'SUR-703', patient: 'Coco (French Bulldog)', parent: 'Varun Grover', procedureName: 'BOAS Corrective Staphylectomy & Rhinoplasty', theater: 'OT 2 (Soft Tissue Suite)', leadSurgeon: 'Dr. Rahul Mehta', anesthetist: 'Dr. Neha Singh', duration: '75 mins', anesthesiaType: 'Sevoflurane + Local Infiltration', recoveryStatus: 'In Recovery Cage (O2 Hood)', status: 'In Procedure' },
    { id: 'SUR-704', patient: 'Cleo (Persian Cat)', parent: 'Farhan Akhtar', procedureName: 'Laparoscopic Assisted Ovariohysterectomy (Spay)', theater: 'OT 2 (Soft Tissue Suite)', leadSurgeon: 'Dr. Aisha Khan', anesthetist: 'Dr. Karan Patel', duration: '40 mins', anesthesiaType: 'Alfaxalone + Isoflurane', recoveryStatus: 'Pre-Op Scrubbing', status: 'Prep / Induction' },
    { id: 'SUR-705', patient: 'Simba (Golden Pup)', parent: 'Pooja Nair', procedureName: 'Diagnostic Gastroduodenoscopy & Foreign Body Retrieval', theater: 'Endoscopy OT', leadSurgeon: 'Dr. Priya Sharma', anesthetist: 'Dr. Neha Singh', duration: '45 mins', anesthesiaType: 'Propofol TIVA Continuous Infusion', recoveryStatus: 'Scheduled 02:30 PM', status: 'Scheduled' },
    { id: 'SUR-706', patient: 'Rocky (Beagle)', parent: 'Vikram Singhania', procedureName: 'Bilateral Ear Canal Lateral Wall Resection (Zepp)', theater: 'OT 1 (Orthopedic Suite)', leadSurgeon: 'Dr. Karan Patel', anesthetist: 'Dr. Rahul Mehta', duration: '80 mins', anesthesiaType: 'Isoflurane + Ring Block', recoveryStatus: 'Scheduled 04:00 PM', status: 'Scheduled' }
  ];

  const filtered = procedures.filter(p => {
    const matchesFilter = otFilter === 'ALL' || p.theater.includes(otFilter) || p.status === otFilter;
    const matchesSearch = p.patient.toLowerCase().includes(search.toLowerCase()) ||
      p.parent.toLowerCase().includes(search.toLowerCase()) ||
      p.procedureName.toLowerCase().includes(search.toLowerCase()) ||
      p.leadSurgeon.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <DashboardLayout
      category="Veterinary Services"
      subcategory="Procedures"
      title="Surgical Operations & Sterile Theater Suite"
      subtitle="Operation theater schedule, surgical procedures, inhalation anesthesia logs, surgical team rosters, and recovery status"
      icon="✂️"
      badge="Zero Surgical Infection (SSI) Rate"
      actions={
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {['ALL', 'OT 1', 'OT 2', 'Dental', 'In Procedure', 'Completed', 'Scheduled'].map(f => (
            <button
              key={f}
              onClick={() => setOtFilter(f)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                border: otFilter === f ? '1px solid #2563eb' : '1px solid #e2e8f0',
                background: otFilter === f ? '#eff6ff' : '#ffffff',
                color: otFilter === f ? '#2563eb' : '#64748b'
              }}
            >
              {f}
            </button>
          ))}
        </div>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Surgeries Today" value="14 Surgeries" delta="100% OT Sterility" trend="up" subtext="4 Orthopedic • 6 Soft Tissue • 4 Dental" icon="✂️" />
        <KpiCard label="OT Theater Utilization" value="91.4%" delta="Optimal turnover" trend="up" subtext="Across 3 sterile surgical suites" icon="🏥" />
        <KpiCard label="Anesthesia Safety Record" value="99.98%" delta="Multi-parameter capnography" trend="up" subtext="Continuous vitals logging" icon="🫁" />
        <KpiCard label="Surgical Site Infection" value="0.0%" delta="Industry benchmark: 1.8%" trend="up" subtext="Autoclave spore test validated" icon="🛡️" />
      </div>

      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Live Operation Theater Schedule & Surgical Log</h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>Real-time surgical log tracking surgeon assignments, anesthesia protocols, procedure elapsed time, and PACU recovery</p>
          </div>
          <div>
            <input
              type="text"
              placeholder="Search surgery, pet, surgeon..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '12px',
                width: '280px',
                outline: 'none'
              }}
            />
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', color: '#64748b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Surgical ID</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Patient & Client</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Procedure Details</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Theater</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Surgical Team</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Duration</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Anesthesia & Post-Op Recovery</th>
                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: '#2563eb', fontFamily: '"IBM Plex Mono", monospace' }}>{p.id}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{p.patient}</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>{p.parent}</div>
                  </td>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>{p.procedureName}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: p.theater.includes('Orthopedic') ? '#eff6ff' : p.theater.includes('Dental') ? '#f0fdf4' : '#fdf4ff',
                      color: p.theater.includes('Orthopedic') ? '#1d4ed8' : p.theater.includes('Dental') ? '#15803d' : '#a21caf'
                    }}>
                      {p.theater}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ fontWeight: 600, color: '#0f172a' }}>{p.leadSurgeon}</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>Anesth: {p.anesthetist}</div>
                  </td>
                  <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 600, color: '#475569' }}>{p.duration}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ fontWeight: 500, color: '#0f172a', fontSize: '11px' }}>{p.recoveryStatus}</div>
                    <div style={{ fontSize: '10px', color: '#64748b' }}>{p.anesthesiaType}</div>
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '999px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: p.status === 'Completed' ? '#dcfce7' : p.status === 'In Procedure' ? '#fee2e2' : p.status === 'Prep / Induction' ? '#fef3c7' : '#eff6ff',
                      color: p.status === 'Completed' ? '#15803d' : p.status === 'In Procedure' ? '#b91c1c' : p.status === 'Prep / Induction' ? '#b45309' : '#1d4ed8'
                    }}>
                      {p.status}
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
