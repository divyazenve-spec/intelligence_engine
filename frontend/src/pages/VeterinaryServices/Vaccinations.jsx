import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function Vaccinations() {
  const [speciesFilter, setSpeciesFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const records = [];

  const filtered = records.filter(r => {
    const matchesFilter = speciesFilter === 'ALL' || r.species === speciesFilter || r.certStatus === speciesFilter;
    const matchesSearch = r.pet.toLowerCase().includes(search.toLowerCase()) ||
      r.parent.toLowerCase().includes(search.toLowerCase()) ||
      r.vaccineName.toLowerCase().includes(search.toLowerCase()) ||
      r.batchNo.toLowerCase().includes(search.toLowerCase()) ||
      r.vet.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <DashboardLayout
      category="Veterinary Services"
      subcategory="Vaccinations"
      title="Pet Immunization & Cold-Chain Biologicals Registry"
      subtitle="Canine & feline vaccination schedules, IoT cold-chain batch tracking, booster recall cycles, and digital health pass generation"
      icon="💉"
      badge=""
      actions={
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {['ALL', 'Canine', 'Feline', 'Certificate Issued', 'Booster Scheduled'].map(s => (
            <button
              key={s}
              onClick={() => setSpeciesFilter(s)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                border: speciesFilter === s ? '1px solid #2563eb' : '1px solid #e2e8f0',
                background: speciesFilter === s ? '#eff6ff' : '#ffffff',
                color: speciesFilter === s ? '#2563eb' : '#64748b'
              }}
            >
              {s}
            </button>
          ))}
        </div>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Vaccines Given MTD" value="784 Doses" delta="+22.1% MoM" trend="up" subtext="512 Canine • 272 Feline" icon="💉" />
        <KpiCard label="Cold-Chain Adherence" value="0.0%" delta="2-8°C Verified" trend="up" subtext="Zero heat excursion recorded" icon="❄️" />
        <KpiCard label="Booster Recall Rate" value="0.0%" delta="+3.8% MoM" trend="up" subtext="Automated WhatsApp reminder" icon="📲" />
        <KpiCard label="Digital Passports Issued" value="768 Certs" delta="Govt Rabies Compliant" trend="up" subtext="Instant QR verifiable" icon="🛡️" />
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
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Official Immunization Log & Batch Verification Ledger</h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>Every vaccine recorded with serial lot number, manufacturer batch cold-chain stamp, and administering veterinary surgeon</p>
          </div>
          <div>
            <input
              type="text"
              placeholder="Search pet, vaccine, batch lot, vet..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '12px',
                width: '300px',
                outline: 'none'
              }}
            />
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', color: '#64748b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Vaccine Code</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Pet & Species</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Pet Parent</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Biological Product & Manufacturer</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Batch / Lot No</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Administered Date</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Next Booster Due</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Cold Chain</th>
                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Passport Cert</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: '#2563eb', fontFamily: '"IBM Plex Mono", monospace' }}>{r.id}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{r.pet}</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>{r.species === 'Canine' ? '🐕 Canine' : '🐈 Feline'}</div>
                  </td>
                  <td style={{ padding: '12px 16px', color: '#475569' }}>{r.parent}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ fontWeight: 600, color: '#0f172a' }}>{r.vaccineName}</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>{r.mfg}</div>
                  </td>
                  <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 600, color: '#334155' }}>{r.batchNo}</td>
                  <td style={{ padding: '12px 16px', color: '#0f172a', fontWeight: 500 }}>{r.administered}</td>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#2563eb', fontFamily: '"IBM Plex Mono", monospace' }}>{r.nextDue}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, background: '#ecfeff', color: '#0891b2', border: '1px solid #a5f3fc' }}>
                      ❄️ {r.coldChainVerified}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '999px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: r.certStatus === 'Certificate Issued' ? '#dcfce7' : '#fef9c3',
                      color: r.certStatus === 'Certificate Issued' ? '#15803d' : '#854d0e'
                    }}>
                      {r.certStatus}
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
