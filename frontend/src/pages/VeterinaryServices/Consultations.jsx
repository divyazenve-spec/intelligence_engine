import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function Consultations() {
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const consultations = [
    { id: 'CNS-8801', pet: 'Bruno (Golden Retriever)', parent: 'Vikram Singhania', doctor: 'Dr. Priya Sharma', specialty: 'General Medicine', mode: 'In-Clinic', complaint: 'Acute gastroenteritis, persistent vomiting', vitals: 'Temp: 39.1°C, Wt: 32kg', diagnosis: 'Dietary Indiscretion (Mild Enteritis)', fee: '₹950', status: 'Completed', time: '09:30 AM' },
    { id: 'CNS-8802', pet: 'Milo (Persian Cat)', parent: 'Ananya Deshmukh', doctor: 'Dr. Aisha Khan', specialty: 'Feline Medicine', mode: 'Video Telehealth', complaint: 'Lethargy, reduced water intake, squinting', vitals: 'Wt: 4.1kg, Age: 3y', diagnosis: 'Early Feline Lower Urinary Tract (FLUTD)', fee: '₹750', status: 'In Consultation', time: '10:15 AM' },
    { id: 'CNS-8803', pet: 'Rocky (German Shepherd)', parent: 'Rohan Mehta', doctor: 'Dr. Rahul Mehta', specialty: 'Orthopedics', mode: 'In-Clinic', complaint: 'Right hind leg lameness post-run', vitals: 'Temp: 38.6°C, Wt: 38kg', diagnosis: 'Cranial Cruciate Ligament (CCL) Partial Tear', fee: '₹1,400', status: 'Completed', time: '11:00 AM' },
    { id: 'CNS-8804', pet: 'Simba (Beagle)', parent: 'Pooja Nair', doctor: 'Dr. Karan Patel', specialty: 'Dermatology', mode: 'In-Clinic', complaint: 'Severe pruritus, bilateral ear discharge', vitals: 'Temp: 38.8°C, Wt: 14kg', diagnosis: 'Malassezia Otitis Externa & Atopy', fee: '₹1,100', status: 'Waiting in Triage', time: '11:45 AM' },
    { id: 'CNS-8805', pet: 'Bella (Shih Tzu)', parent: 'Kavita Rao', doctor: 'Dr. Neha Singh', specialty: 'Cardiology', mode: 'In-Clinic', complaint: 'Chronic dry hacking cough, tachypnea', vitals: 'Temp: 38.4°C, HR: 160bpm', diagnosis: 'Stage B2 Mitral Valve Disease (MMVD)', fee: '₹1,800', status: 'Completed', time: '12:30 PM' },
    { id: 'CNS-8806', pet: 'Leo (Indie Pup)', parent: 'Sameer Joshi', doctor: 'Dr. Priya Sharma', specialty: 'Pediatrics & Neonatal', mode: 'Home Visit', complaint: 'General wellness checkup, deworming', vitals: 'Temp: 38.5°C, Wt: 6.2kg', diagnosis: 'Healthy Puppy Routine Check', fee: '₹1,250', status: 'Scheduled', time: '02:00 PM' },
    { id: 'CNS-8807', pet: 'Oreo (Domestic Shorthair)', parent: 'Farhan Akhtar', doctor: 'Dr. Aisha Khan', specialty: 'Dental & Oral', mode: 'In-Clinic', complaint: 'Halitosis, pawing at mouth, anorexia', vitals: 'Temp: 38.9°C, Wt: 3.8kg', diagnosis: 'Grade 3 Periodontitis, Subgingival Calculus', fee: '₹1,150', status: 'Scheduled', time: '03:15 PM' },
    { id: 'CNS-8808', pet: 'Max (Labrador)', parent: 'Siddharth Roy', doctor: 'Dr. Rahul Mehta', specialty: 'Emergency / Triage', mode: 'In-Clinic', complaint: 'Suspected chocolate toxicity (dark chocolate)', vitals: 'Temp: 39.4°C, HR: 175bpm', diagnosis: 'Theobromine Toxicosis (Stat Induction)', fee: '₹2,200', status: 'Under Observation', time: '04:00 PM' }
  ];

  const filtered = consultations.filter(c => {
    const matchesFilter = filter === 'ALL' || c.mode === filter || c.status === filter;
    const matchesSearch = c.pet.toLowerCase().includes(search.toLowerCase()) ||
      c.parent.toLowerCase().includes(search.toLowerCase()) ||
      c.doctor.toLowerCase().includes(search.toLowerCase()) ||
      c.diagnosis.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <DashboardLayout
      category="Veterinary Services"
      subcategory="Consultations"
      title="Clinical Consultations & Patient Triage"
      subtitle="In-clinic visits, video telehealth consults, chief complaints, diagnostic triage, and attending veterinarian assignments"
      icon="🩺"
      badge="48 Consultations Today"
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
        <KpiCard label="Consultations Today" value="48 Cases" delta="+14.2% vs yesterday" trend="up" subtext="34 In-Clinic • 11 Video • 3 Home" icon="🩺" />
        <KpiCard label="Avg Consultation Duration" value="24.6 mins" delta="High patient care" trend="up" subtext="Benchmark: 20 mins" icon="⏱️" />
        <KpiCard label="Active Triage Queue" value="4 Patients" delta="Avg wait: 8 mins" trend="up" subtext="Zero critical wait time" icon="🏥" />
        <KpiCard label="Consultation CSAT" value="4.94 / 5" delta="98.8% Positive" trend="up" subtext="Based on 412 verified ratings" icon="⭐" />
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
