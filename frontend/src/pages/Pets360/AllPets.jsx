import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function AllPets() {
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const pets = [];

  const filtered = pets.filter(p => {
    const matchesFilter = filter === 'ALL' || p.species === filter || p.vaxStatus === filter;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.breed.toLowerCase().includes(search.toLowerCase()) ||
      p.parent.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.city.toLowerCase().includes(search.toLowerCase()) ||
      p.microchip.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <DashboardLayout
      category="Pets 360°"
      subcategory="All Pets"
      title="Master Pet Registry & Census"
      subtitle="Complete database of registered companion animals, pet parents, microchip IDs, and longitudinal health statuses"
      icon="🐾"
      badge=""
      actions={
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {['ALL', 'Canine', 'Feline', 'Avian', 'Up to Date', 'Due in 14d', 'Overdue'].map(f => (
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
        <KpiCard label="Total Registered Pets" value="0" delta="0.0%" trend="up" subtext="Canine, Feline & Exotic" icon="🐾" />
        <KpiCard label="Canine Share" value="0.0%" delta="970 Dogs" trend="neutral" subtext="Primary demographic" icon="🐕" />
        <KpiCard label="Feline Share" value="0.0%" delta="241 Cats" trend="up" subtext="+32% YoY growth" icon="🐈" />
        <KpiCard label="Vaccine Compliant" value="0.0%" delta="1,163 Active" trend="up" subtext="Health pass verified" icon="💉" />
        <KpiCard label="Microchip Enrolled" value="0.0%" delta="1,072 Chipped" trend="up" subtext="ISO 11784 RFID standard" icon="🏷️" />
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
        gap: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, maxWidth: '480px' }}>
          <span style={{ color: '#94a3b8', fontSize: '15px' }}>🔍</span>
          <input
            type="text"
            placeholder="Search by pet name, breed, parent, microchip, or city..."
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
          Showing <b>{filtered.length}</b> of <b>{pets.length}</b> pets
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
              <th style={{ padding: '12px 16px' }}>Pet</th>
              <th style={{ padding: '12px 16px' }}>Species / Breed</th>
              <th style={{ padding: '12px 16px' }}>Age & Gender</th>
              <th style={{ padding: '12px 16px' }}>Pet Parent & Contact</th>
              <th style={{ padding: '12px 16px' }}>City</th>
              <th style={{ padding: '12px 16px' }}>Health Score</th>
              <th style={{ padding: '12px 16px' }}>Vaccine Status</th>
              <th style={{ padding: '12px 16px' }}>Microchip</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, idx) => (
              <tr key={p.id} style={{ borderBottom: idx !== filtered.length - 1 ? '1px solid #f1f5f9' : 'none', transition: 'background 0.1s' }} onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={e => e.currentTarget.style.background = '#ffffff'}>
                <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '20px' }}>{p.avatar}</span>
                    <div>
                      <div style={{ fontWeight: 700 }}>{p.name}</div>
                      <div style={{ fontSize: '11px', color: '#94a3b8', fontFamily: 'monospace' }}>{p.id}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ fontWeight: 600, color: '#334155' }}>{p.species}</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>{p.breed}</div>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ color: '#334155' }}>{p.age}</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>{p.gender}</div>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ fontWeight: 600, color: '#0f172a' }}>{p.parent}</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>{p.phone}</div>
                </td>
                <td style={{ padding: '12px 16px', color: '#475569' }}>{p.city}</td>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{
                      fontWeight: 700,
                      color: p.healthScore >= 90 ? '#059669' : p.healthScore >= 80 ? '#2563eb' : '#d97706'
                    }}>
                      {p.healthScore}/100
                    </span>
                  </div>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '3px 8px',
                    borderRadius: '999px',
                    fontSize: '11px',
                    fontWeight: 600,
                    background: p.vaxStatus === 'Up to Date' ? '#ecfdf5' : p.vaxStatus.includes('Due') ? '#eff6ff' : '#fef2f2',
                    color: p.vaxStatus === 'Up to Date' ? '#059669' : p.vaxStatus.includes('Due') ? '#1d4ed8' : '#dc2626'
                  }}>
                    {p.vaxStatus}
                  </span>
                </td>
                <td style={{ padding: '12px 16px', fontFamily: 'monospace', fontSize: '11px', color: '#64748b' }}>
                  {p.microchip}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
