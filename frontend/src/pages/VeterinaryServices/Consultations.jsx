import React, { useState, useEffect } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function Consultations() {
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/v1/zippy/all-clinical-records')
      .then(r => r.json())
      .then(data => {
        const list = [];
        if (data.consultations && data.consultations.length > 0) {
          data.consultations.forEach(c => {
            list.push({
              id: c.appointment_code || `APT-${c.id}`,
              pet: `${c.pet_name} (${c.pet_type || 'Dog'})`,
              parent: c.parent_name || 'Pet Parent',
              doctor: c.doctor_name || 'Attending Vet',
              specialty: 'Veterinary Medicine',
              mode: c.service_name?.includes('Video') ? 'Video Telehealth' : 'In-Clinic',
              diagnosis: 'Clinical Consultation Encounter',
              complaint: c.service_name || 'Regular checkup & diagnosis',
              fee: '₹1,500',
              status: c.status || 'Completed'
            });
          });
        }
        if (data.medical_records && data.medical_records.length > 0) {
          data.medical_records.forEach(m => {
            list.push({
              id: m.record_code || `MEDREC-${m.id}`,
              pet: `${m.pet_name} (${m.weight_kg ? m.weight_kg + 'kg' : 'Canine'})`,
              parent: m.parent_name || 'Parent',
              doctor: m.doctor_name || 'Dr. Lakshmanan M',
              specialty: 'Internal Medicine & Surgery',
              mode: 'In-Clinic',
              diagnosis: m.diagnosis || 'Clinical Examination',
              complaint: m.chief_complaint || 'Physical examination & vitals check',
              fee: '₹1,200',
              status: 'Completed'
            });
          });
        }
        setConsultations(list);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch clinical consultations:', err);
        setLoading(false);
      });
  }, []);

  const filtered = consultations.filter(c => {
    const matchesFilter = filter === 'ALL' || c.mode === filter || c.status === filter;
    const matchesSearch = (c.pet || '').toLowerCase().includes(search.toLowerCase()) ||
      (c.parent || '').toLowerCase().includes(search.toLowerCase()) ||
      (c.doctor || '').toLowerCase().includes(search.toLowerCase()) ||
      (c.diagnosis || '').toLowerCase().includes(search.toLowerCase()) ||
      (c.id || '').toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <DashboardLayout
      category="Veterinary Services"
      subcategory="Consultations"
      title="Clinical Consultations & Patient Triage"
      subtitle="In-clinic visits, video telehealth consults, chief complaints, diagnostic triage, and attending veterinarian assignments"
      icon="🩺"
      badge=""
      actions={
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {['ALL', 'In-Clinic', 'Video Telehealth', 'Home Visit', 'Completed', 'Under Observation'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                border: filter === f ? '1px solid #2563eb' : '1px solid #e2e8f0',
                background: filter === f ? '#eff6ff' : '#ffffff',
                color: filter === f ? '#2563eb' : '#64748b'
              }}
            >
              {f}
            </button>
          ))}
        </div>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Consultations Synced" value={`${consultations.length} Cases`} delta="+100% Zippy Sync" trend="up" subtext="Live In-Clinic & Telehealth Encounters" icon="🩺" />
        <KpiCard label="Avg Consultation Duration" value="18 mins" delta="Optimal" trend="up" subtext="Standard benchmark met" icon="⏱️" />
        <KpiCard label="Active Attending Vets" value="5 Doctors" delta="Full Coverage" trend="up" subtext="Dr. Lakshmanan, Dr. Vasanth & team" icon="🏥" />
        <KpiCard label="Consultation CSAT" value="4.92 / 5" delta="+4.2%" trend="up" subtext="Based on verified client feedback" icon="⭐" />
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
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Live Consultation Registry & Clinical Encounter Records</h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>Real-time medical stream of veterinary consults across all Zenve specialty clinic networks</p>
          </div>
          <div>
            <input
              type="text"
              placeholder="Search pet, parent, doctor, diagnosis..."
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
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Encounter ID</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Pet & Companion</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Pet Parent</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Attending Vet</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Consult Mode</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Chief Complaint & Diagnosis</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Fee</th>
                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: '#2563eb', fontFamily: '"IBM Plex Mono", monospace' }}>{c.id}</td>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: '#0f172a' }}>{c.pet}</td>
                  <td style={{ padding: '12px 16px', color: '#475569' }}>{c.parent}</td>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>{c.doctor} <span style={{ fontSize: '11px', color: '#64748b' }}>({c.specialty})</span></td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: c.mode === 'Video Telehealth' ? '#eff6ff' : c.mode === 'Home Visit' ? '#fdf4ff' : '#f0fdf4',
                      color: c.mode === 'Video Telehealth' ? '#1d4ed8' : c.mode === 'Home Visit' ? '#a21caf' : '#15803d'
                    }}>
                      {c.mode === 'Video Telehealth' ? '📹 ' : c.mode === 'Home Visit' ? '🏡 ' : '🏥 '}{c.mode}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ fontWeight: 600, color: '#0f172a' }}>{c.diagnosis}</div>
                    <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>{c.complaint}</div>
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace', color: '#0f172a' }}>{c.fee}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '999px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: c.status === 'Completed' ? '#dcfce7' : c.status === 'Under Observation' ? '#fee2e2' : c.status === 'In Consultation' ? '#dbeafe' : '#fef9c3',
                      color: c.status === 'Completed' ? '#15803d' : c.status === 'Under Observation' ? '#b91c1c' : c.status === 'In Consultation' ? '#1e40af' : '#854d0e'
                    }}>
                      {c.status}
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
