import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function VaccinationRecords() {
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const vaccinations = [
    { id: 'VAX-501', pet: 'Bruno (Golden Retriever)', vaccine: 'DHPPiL (9-in-1 Vanguard Plus 5)', manufacturer: 'Zoetis Animal Health', batch: 'ZT-99410-A', administeredOn: '15-Jan-2026', nextDue: '15-Jan-2027', vet: 'Dr. Priya Sharma', clinic: 'Koramangala Super Hospital', status: 'Valid (Immune)', passId: 'ZV-PASS-8819' },
    { id: 'VAX-502', pet: 'Bruno (Golden Retriever)', vaccine: 'Anti-Rabies (Defensor 3)', manufacturer: 'Zoetis Animal Health', batch: 'ZT-RAB-2041', administeredOn: '15-Jan-2026', nextDue: '15-Jan-2027', vet: 'Dr. Priya Sharma', clinic: 'Koramangala Super Hospital', status: 'Valid (Immune)', passId: 'ZV-PASS-8819' },
    { id: 'VAX-503', pet: 'Milo (Persian Cat)', vaccine: 'Feline Tricat Trio (FPV/FHV/FCV)', manufacturer: 'MSD Animal Health (Nobivac)', batch: 'MSD-TRI-119', administeredOn: '18-Oct-2025', nextDue: '18-Oct-2026', vet: 'Dr. Aisha Khan', clinic: 'Indiranagar Care Center', status: 'Due in 13 Days', passId: 'ZV-PASS-3312' },
    { id: 'VAX-504', pet: 'Milo (Persian Cat)', vaccine: 'Nobivac Rabies Feline', manufacturer: 'MSD Animal Health', batch: 'MSD-RAB-440', administeredOn: '18-Oct-2025', nextDue: '18-Oct-2026', vet: 'Dr. Aisha Khan', clinic: 'Indiranagar Care Center', status: 'Due in 13 Days', passId: 'ZV-PASS-3312' },
    { id: 'VAX-505', pet: 'Rocky (German Shepherd)', vaccine: 'Canine Corona + Giardia Dual', manufacturer: 'Boehringer Ingelheim', batch: 'BI-COR-5510', administeredOn: '10-Apr-2026', nextDue: '10-Apr-2027', vet: 'Dr. Rahul Mehta', clinic: 'Whitefield Specialty OT', status: 'Valid (Immune)', passId: 'ZV-PASS-6041' },
    { id: 'VAX-506', pet: 'Simba (Beagle)', vaccine: 'Kennel Cough (Nobivac KC Intranasal)', manufacturer: 'MSD Animal Health', batch: 'MSD-KC-889', administeredOn: '05-May-2026', nextDue: '05-May-2027', vet: 'Dr. Karan Patel', clinic: 'Bandra West Clinic', status: 'Valid (Immune)', passId: 'ZV-PASS-7120' },
    { id: 'VAX-507', pet: 'Bella (Shih Tzu)', vaccine: 'Annual Rabies Booster', manufacturer: 'Zoetis Animal Health', batch: 'ZT-RAB-1092', administeredOn: '12-Aug-2025', nextDue: '12-Aug-2026', vet: 'Dr. Neha Singh', clinic: 'Gurugram Hospital', status: 'Overdue (Expired)', passId: 'ZV-PASS-1099' }
  ];

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
      badge="94.2% Immune Rate"
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
        <KpiCard label="Doses Administered" value="3,892" delta="+22.1%" trend="up" subtext="YTD across network" icon="💉" />
        <KpiCard label="Immunity Compliance" value="94.2%" delta="High" trend="up" subtext="Protected population" icon="🛡️" />
        <KpiCard label="Due Within 30 Days" value="84 Pets" delta="Recalls sent" trend="neutral" subtext="WhatsApp & SMS alerts" icon="🔔" />
        <KpiCard label="Cold-Chain Lot Tracked" value="100%" delta="Zoetis / MSD" trend="up" subtext="IoT 2-8°C verified" icon="❄️" />
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
