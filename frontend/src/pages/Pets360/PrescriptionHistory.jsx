import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function PrescriptionHistory() {
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const prescriptions = [
    { id: 'RX-7701', pet: 'Bruno (Golden Retriever)', date: '02-Oct-2026', medicine: 'Maropitant (Cerenia) 24mg', dosage: '1 tab OD x 3 days', indication: 'Antiemetic / Gastritis', prescriber: 'Dr. Priya Sharma', pharmacyStatus: 'Dispensed', refillsLeft: 0 },
    { id: 'RX-7702', pet: 'Milo (Persian Cat)', date: '28-Sep-2026', medicine: 'Prazosin 0.5mg + Gabapentin 50mg', dosage: 'Prazosin 1/4 tab BD, Gaba BID x 7d', indication: 'FLUTD Urethral Relaxation & Analgesia', prescriber: 'Dr. Aisha Khan', pharmacyStatus: 'Dispensed', refillsLeft: 1 },
    { id: 'RX-7703', pet: 'Rocky (German Shepherd)', date: '24-Sep-2026', medicine: 'Carprofen (Rimadyl) 75mg + Tramadol 50mg', dosage: '1 tab BD with food x 10 days', indication: 'Post-Op Orthopedic Analgesia', prescriber: 'Dr. Rahul Mehta', pharmacyStatus: 'Dispensed', refillsLeft: 2 },
    { id: 'RX-7704', pet: 'Simba (Beagle)', date: '20-Sep-2026', medicine: 'Posatex Otic Drops (Orbifloxacin/Mometasone)', dosage: '4 drops into each ear canal OD x 14d', indication: 'Malassezia & Bacterial Otitis', prescriber: 'Dr. Karan Patel', pharmacyStatus: 'Dispensed', refillsLeft: 0 },
    { id: 'RX-7705', pet: 'Bella (Shih Tzu)', date: '15-Sep-2026', medicine: 'Vetmedin (Pimobendan) 1.25mg Chewable', dosage: '1 chewable BD on empty stomach', indication: 'Chronic MMVD Cardiac Support', prescriber: 'Dr. Neha Singh', pharmacyStatus: 'Active Refill', refillsLeft: 5 },
    { id: 'RX-7706', pet: 'Max (Labrador)', date: '10-Sep-2026', medicine: 'Bravecto Chew (Fluralaner 500mg)', dosage: '1 chewable tablet PO every 12 weeks', indication: 'Ectoparasite (Tick & Flea) Prevention', prescriber: 'Dr. Priya Sharma', pharmacyStatus: 'Dispensed', refillsLeft: 3 }
  ];

  const filtered = prescriptions.filter(p => {
    const matchesFilter = filter === 'ALL' || p.pharmacyStatus === filter;
    const matchesSearch = p.pet.toLowerCase().includes(search.toLowerCase()) ||
      p.medicine.toLowerCase().includes(search.toLowerCase()) ||
      p.indication.toLowerCase().includes(search.toLowerCase()) ||
      p.prescriber.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <DashboardLayout
      category="Pets 360°"
      subcategory="Prescription History"
      title="Veterinary Rx & Medication Dispensation History"
      subtitle="Digital prescription records, pharmaceutical dosages, chronic maintenance refills, and drug interaction audits"
      icon="🐾"
      badge="2,940 Prescriptions Tracked"
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          {['ALL', 'Dispensed', 'Active Refill'].map(f => (
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
        <KpiCard label="Total Rx Generated" value="2,940" delta="+15.3%" trend="up" subtext="Digital tamper-proof" icon="💊" />
        <KpiCard label="Active Chronic Refills" value="312" delta="Auto-scheduled" trend="neutral" subtext="Cardiac, renal, thyroid" icon="🔄" />
        <KpiCard label="Dispense Turnaround" value="8.4 Mins" delta="-2.1m YoY" trend="up" subtext="In-house pharmacy" icon="⏱️" />
        <KpiCard label="Drug Safety Adherence" value="100%" delta="Zero errors" trend="up" subtext="Species-weight verified" icon="🛡️" />
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
            placeholder="Search prescriptions by pet, drug molecule, clinical indication, or doctor..."
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
          Showing <b>{filtered.length}</b> prescription orders
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
              <th style={{ padding: '12px 16px' }}>Rx ID & Date</th>
              <th style={{ padding: '12px 16px' }}>Pet Patient</th>
              <th style={{ padding: '12px 16px' }}>Prescribed Medicine</th>
              <th style={{ padding: '12px 16px' }}>Dosage & Frequency</th>
              <th style={{ padding: '12px 16px' }}>Clinical Indication</th>
              <th style={{ padding: '12px 16px' }}>Prescribing Vet</th>
              <th style={{ padding: '12px 16px' }}>Refills</th>
              <th style={{ padding: '12px 16px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, idx) => (
              <tr key={p.id} style={{ borderBottom: idx !== filtered.length - 1 ? '1px solid #f1f5f9' : 'none', transition: 'background 0.1s' }} onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={e => e.currentTarget.style.background = '#ffffff'}>
                <td style={{ padding: '12px 16px', fontWeight: 600 }}>
                  <div style={{ fontFamily: 'monospace', color: '#2563eb' }}>{p.id}</div>
                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>{p.date}</div>
                </td>
                <td style={{ padding: '12px 16px', fontWeight: 700, color: '#0f172a' }}>
                  {p.pet}
                </td>
                <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>
                  {p.medicine}
                </td>
                <td style={{ padding: '12px 16px', fontFamily: 'monospace', fontSize: '12px', color: '#475569' }}>
                  {p.dosage}
                </td>
                <td style={{ padding: '12px 16px', color: '#64748b' }}>
                  {p.indication}
                </td>
                <td style={{ padding: '12px 16px', color: '#2563eb', fontWeight: 600 }}>
                  {p.prescriber}
                </td>
                <td style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 600, color: '#475569' }}>
                  {p.refillsLeft}
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '3px 8px',
                    borderRadius: '999px',
                    fontSize: '11px',
                    fontWeight: 600,
                    background: p.pharmacyStatus === 'Dispensed' ? '#ecfdf5' : '#eff6ff',
                    color: p.pharmacyStatus === 'Dispensed' ? '#059669' : '#1d4ed8'
                  }}>
                    {p.pharmacyStatus}
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
