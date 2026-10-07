import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function AllDoctors() {
  const [search, setSearch] = useState('');
  const [specFilter, setSpecFilter] = useState('ALL');

  const roster = [];

  const filtered = roster.filter(d => {
    if (specFilter !== 'ALL' && d.spec !== specFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return d.name.toLowerCase().includes(q) || d.id.toLowerCase().includes(q) || d.clinic.toLowerCase().includes(q) || d.spec.toLowerCase().includes(q);
    }
    return true;
  });

  const cardStyle = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Doctors"
      subcategory="Clinical Directory"
      title="All Registered Veterinary Practitioners"
      subtitle="Complete clinical registry, specialty qualifications, clinic affiliations, and contact rosters"
      icon="📋"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Practitioners" value="24 Doctors" delta="+3 Hired Q3" trend="up" subtext="All state board registered" icon="👨‍⚕️" />
        <KpiCard label="Primary Specialties" value="8 Disciplines" delta="Surgery, Cardio, Neuro+" trend="neutral" subtext="Full tertiary care coverage" icon="🩺" />
        <KpiCard label="Avg Clinical Experience" value="10.8 Yrs" delta="Senior faculty" trend="up" subtext="Board certified clinicians" icon="🎓" />
        <KpiCard label="Clinic Shifts Scheduled" value="0.0%" delta="Optimal roster" trend="up" subtext="Zero doctor absence backlog" icon="📅" />
      </div>

      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>📋 Comprehensive Practitioner Directory</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Filter by clinical specialty, qualifications, practice hours, and primary healthcare centers</p>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search by doctor, clinic, ID..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid var(--border, #cbd5e1)', fontSize: '12px', background: '#f8fafc', color: '#0f172a', width: '220px' }}
            />
            {['ALL', 'Lead Surgeon', 'Cardiology', 'Neurology', 'Pediatrics', 'Dermatology'].map(s => (
              <button
                key={s}
                onClick={() => setSpecFilter(s)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '8px',
                  border: specFilter === s ? '1px solid #059669' : '1px solid var(--border, #cbd5e1)',
                  background: specFilter === s ? '#059669' : '#ffffff',
                  color: specFilter === s ? '#ffffff' : '#334155',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border, #e2e8f0)', textAlign: 'left', color: 'var(--muted-foreground, #475569)' }}>
                <th style={{ padding: '10px' }}>Doctor ID</th>
                <th style={{ padding: '10px' }}>Clinician Name</th>
                <th style={{ padding: '10px' }}>Specialty</th>
                <th style={{ padding: '10px' }}>Qualifications</th>
                <th style={{ padding: '10px' }}>Exp</th>
                <th style={{ padding: '10px' }}>Center Clinic</th>
                <th style={{ padding: '10px' }}>Working Schedule</th>
                <th style={{ padding: '10px' }}>Contact</th>
                <th style={{ padding: '10px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(d => (
                <tr key={d.id} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                  <td style={{ padding: '10px', fontFamily: 'monospace', fontWeight: 600 }}>{d.id}</td>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{d.name}</td>
                  <td style={{ padding: '10px' }}><span style={{ padding: '2px 6px', background: '#ecfdf5', color: '#047857', borderRadius: '4px', fontWeight: 600 }}>{d.spec}</span></td>
                  <td style={{ padding: '10px', color: '#64748b' }}>{d.qual}</td>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{d.exp}</td>
                  <td style={{ padding: '10px' }}>{d.clinic}</td>
                  <td style={{ padding: '10px', color: '#64748b' }}>{d.schedule}</td>
                  <td style={{ padding: '10px' }}>{d.phone}</td>
                  <td style={{ padding: '10px' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: d.status === 'Active' ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)',
                      color: d.status === 'Active' ? '#047857' : '#b91c1c'
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
