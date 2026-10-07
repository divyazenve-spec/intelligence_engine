import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function PetHealthRecords() {
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const records = [];

  const filtered = records.filter(r => {
    const matchesFilter = filter === 'ALL' || r.status === filter || r.type.includes(filter);
    const matchesSearch = r.pet.toLowerCase().includes(search.toLowerCase()) ||
      r.diagnosis.toLowerCase().includes(search.toLowerCase()) ||
      r.vet.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <DashboardLayout
      category="Pets 360°"
      subcategory="Pet Health Records"
      title="Electronic Health Records (EHR) & Clinical Timeline"
      subtitle="Longitudinal medical history, physical examination findings, vital signs trends, and clinical diagnosis logs"
      icon="🐾"
      badge=""
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          {['ALL', 'Resolved', 'Under Regimen', 'Post-Op Rehab', 'Chronic Monitoring'].map(f => (
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
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '14px', marginBottom: '20px' }}>
        <KpiCard label="Total Medical Records" value="0" delta="0.0%" trend="up" subtext="All time logged" icon="📋" />
        <KpiCard label="Records Added This Month" value="0" delta="0.0%" trend="up" subtext="Current period" icon="📅" />
        <KpiCard label="Active Chronic Regimens" value="0" delta="Monitored" trend="neutral" subtext="Renal, cardio, endocrine" icon="💊" />
        <KpiCard label="Vital Signs Compliance" value="0.0%" delta="Standard" trend="up" subtext="Temp, HR, Wt recorded" icon="🩺" />
      </div>

      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '16px 20px',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, maxWidth: '480px' }}>
          <span style={{ color: '#94a3b8', fontSize: '15px' }}>🔍</span>
          <input
            type="text"
            placeholder="Search health records by pet, diagnosis, doctor, or record ID..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              fontSize: '13px',
              outline: 'none',
              background: '#f8fafc'
            }}
          />
        </div>
        <div style={{ fontSize: '12px', color: '#64748b' }}>
          Showing <b>{filtered.length}</b> clinical records
        </div>
      </div>

      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <th style={{ padding: '12px 16px' }}>Record ID & Date</th>
              <th style={{ padding: '12px 16px' }}>Pet Patient</th>
              <th style={{ padding: '12px 16px' }}>Clinical Encounter Type</th>
              <th style={{ padding: '12px 16px' }}>Recorded Vitals</th>
              <th style={{ padding: '12px 16px' }}>Diagnosis</th>
              <th style={{ padding: '12px 16px' }}>Attending Vet</th>
              <th style={{ padding: '12px 16px' }}>Outcome Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, idx) => (
              <tr key={r.id} style={{ borderBottom: idx !== filtered.length - 1 ? '1px solid #f1f5f9' : 'none', transition: 'background 0.1s' }} onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={e => e.currentTarget.style.background = '#ffffff'}>
                <td style={{ padding: '12px 16px', fontWeight: 600 }}>
                  <div style={{ fontFamily: 'monospace', color: '#2563eb' }}>{r.id}</div>
                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>{r.date}</div>
                </td>
                <td style={{ padding: '12px 16px', fontWeight: 700, color: '#0f172a' }}>
                  {r.pet}
                </td>
                <td style={{ padding: '12px 16px', color: '#334155' }}>
                  {r.type}
                </td>
                <td style={{ padding: '12px 16px', fontFamily: 'monospace', fontSize: '11px', color: '#475569' }}>
                  {r.vitals}
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ fontWeight: 600, color: '#0f172a' }}>{r.diagnosis}</div>
                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>{r.notes}</div>
                </td>
                <td style={{ padding: '12px 16px', color: '#2563eb', fontWeight: 600 }}>
                  {r.vet}
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '3px 8px',
                    borderRadius: '999px',
                    fontSize: '11px',
                    fontWeight: 600,
                    background: r.status === 'Resolved' || r.status === 'Fully Recovered' ? '#ecfdf5' : '#eff6ff',
                    color: r.status === 'Resolved' || r.status === 'Fully Recovered' ? '#059669' : '#1d4ed8'
                  }}>
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
