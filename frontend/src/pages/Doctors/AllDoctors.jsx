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
      return d.name.toLowerCase().includes(q) || d.id.toLowerCase().includes(q) || d.spec.toLowerCase().includes(q);
    }
    return true;
  });

  const cardStyle = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Doctors"
      subcategory="Physician Directory"
      title="All Registered Veterinary Practitioners"
      subtitle="Complete veterinary registry, state board licensing, clinical credentials, and center affiliations"
      icon="👨‍⚕️"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Board Clinicians" value="0" delta="0.0%" trend="neutral" subtext="No clinicians registered" icon="👨‍⚕️" />
        <KpiCard label="Primary Specialties" value="0" delta="--" trend="neutral" subtext="No specialties active" icon="🩺" />
        <KpiCard label="Avg Clinical Experience" value="0 Yrs" delta="--" trend="neutral" subtext="No data available" icon="🎓" />
        <KpiCard label="Clinic Shifts Scheduled" value="0.0%" delta="--" trend="neutral" subtext="No shifts scheduled" icon="📅" />
      </div>

      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>📋 Clinical Registry & Practitioner Credentials</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>State Veterinary Board license numbers, verified qualifications, and tenure</p>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search by name, ID or license..."
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
                <th style={{ padding: '10px' }}>Experience</th>
                <th style={{ padding: '10px' }}>State VCI License</th>
                <th style={{ padding: '10px' }}>Primary Clinic Hub</th>
                <th style={{ padding: '10px' }}>OPD Days</th>
                <th style={{ padding: '10px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="9" style={{ textAlign: 'center', padding: '32px', color: 'var(--muted-foreground, #64748b)' }}>
                    No doctor records found
                  </td>
                </tr>
              ) : (
                filtered.map(d => (
                  <tr key={d.id} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                    <td style={{ padding: '10px', fontFamily: 'monospace', fontWeight: 600 }}>{d.id}</td>
                    <td style={{ padding: '10px', fontWeight: 600 }}>{d.name}</td>
                    <td style={{ padding: '10px' }}>{d.spec}</td>
                    <td style={{ padding: '10px', color: '#64748b' }}>{d.degree}</td>
                    <td style={{ padding: '10px' }}>{d.exp}</td>
                    <td style={{ padding: '10px', fontFamily: 'monospace' }}>{d.license}</td>
                    <td style={{ padding: '10px' }}>{d.clinic}</td>
                    <td style={{ padding: '10px' }}>{d.days}</td>
                    <td style={{ padding: '10px' }}>
                      <span style={{ padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, background: 'rgba(16,185,129,0.12)', color: '#047857' }}>
                        {d.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
