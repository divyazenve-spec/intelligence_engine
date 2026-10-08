import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function VaccinationRecords() {
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const vaccinations = [];

  const filtered = vaccinations.filter(v => {
    const matchesFilter = filter === 'ALL' || v.status.includes(filter);
    const matchesSearch = v.pet.toLowerCase().includes(search.toLowerCase()) ||
      v.vaccine.toLowerCase().includes(search.toLowerCase()) ||
      v.batch.toLowerCase().includes(search.toLowerCase()) ||
      v.passId.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <DashboardLayout
      category="Pets 360°"
      subcategory="Vaccination Records"
      title="Digital Vaccination Passports & Biological Records"
      subtitle="Verifiable immunization records, vaccine manufacturer lot tracing, expiry recalls, and digital health pass passes"
      icon="🐾"
      badge=""
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          {['ALL', 'Valid', 'Due', 'Overdue'].map(f => (
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
        <KpiCard label="Doses Administered" value="0" delta="0.0%" trend="neutral" subtext="YTD across network" icon="💉" />
        <KpiCard label="Immunity Compliance" value="0.0%" delta="High" trend="neutral" subtext="Protected population" icon="🛡️" />
        <KpiCard label="Due Within 30 Days" value="0" delta="--" trend="neutral" subtext="WhatsApp & SMS alerts" icon="🔔" />
        <KpiCard label="Cold-Chain Lot Tracked" value="0.0%" delta="Zoetis / MSD" trend="neutral" subtext="IoT monitored" icon="❄️" />
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
            placeholder="Search by pet name, vaccine brand, batch number, or passport ID..."
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
          Showing <b>{filtered.length}</b> biological certificates
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
              <th style={{ padding: '12px 16px' }}>Pet Patient & Passport</th>
              <th style={{ padding: '12px 16px' }}>Vaccine & Manufacturer</th>
              <th style={{ padding: '12px 16px' }}>Batch / Lot ID</th>
              <th style={{ padding: '12px 16px' }}>Administered Date</th>
              <th style={{ padding: '12px 16px' }}>Next Recall Date</th>
              <th style={{ padding: '12px 16px' }}>Attending Vet</th>
              <th style={{ padding: '12px 16px' }}>Passport Validity</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((v, idx) => (
              <tr key={v.id} style={{ borderBottom: idx !== filtered.length - 1 ? '1px solid #f1f5f9' : 'none', transition: 'background 0.1s' }} onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={e => e.currentTarget.style.background = '#ffffff'}>
                <td style={{ padding: '12px 16px', fontWeight: 600 }}>
                  <div style={{ color: '#0f172a' }}>{v.pet}</div>
                  <div style={{ fontSize: '11px', fontFamily: 'monospace', color: '#2563eb' }}>{v.passId}</div>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ fontWeight: 600, color: '#0f172a' }}>{v.vaccine}</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>{v.manufacturer}</div>
                </td>
                <td style={{ padding: '12px 16px', fontFamily: 'monospace', fontSize: '11px', color: '#475569' }}>
                  {v.batch}
                </td>
                <td style={{ padding: '12px 16px', color: '#334155' }}>{v.administeredOn}</td>
                <td style={{ padding: '12px 16px', fontWeight: 600, color: v.status.includes('Overdue') ? '#dc2626' : '#0f172a' }}>{v.nextDue}</td>
                <td style={{ padding: '12px 16px', color: '#2563eb', fontSize: '12px', fontWeight: 600 }}>{v.vet}</td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '3px 8px',
                    borderRadius: '999px',
                    fontSize: '11px',
                    fontWeight: 600,
                    background: v.status.includes('Valid') ? '#ecfdf5' : v.status.includes('Due') ? '#eff6ff' : '#fef2f2',
                    color: v.status.includes('Valid') ? '#059669' : v.status.includes('Due') ? '#1d4ed8' : '#dc2626'
                  }}>
                    {v.status}
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
