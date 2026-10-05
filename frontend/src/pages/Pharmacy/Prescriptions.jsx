import React, { useState, useMemo } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function Prescriptions() {
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [selectedRx, setSelectedRx] = useState(null);
  const [toast, setToast] = useState('');

  const prescriptions = [
    {
      id: 'RX-2026-9041',
      date: 'Today, 11:35 AM',
      petName: 'Bruno',
      species: 'Canine (Labrador Retriever)',
      weight: '32.4 kg',
      age: '4 yrs',
      parent: 'Rajesh Nair (+91 98450 12345)',
      vet: 'Dr. Priya Sharma',
      vci: 'VCI-KAR-2018-842',
      clinic: 'Zenve Animal Hospital (Koramangala)',
      drugs: [
        { name: 'Bravecto Chewable 20-40kg', dose: '1 Chewable Tab', freq: 'Single dose', duration: '90 days protection', schedule: 'Schedule H' },
        { name: 'Amoxiclav Pet 625mg', dose: '1 Tab (BID)', freq: 'Twice daily after meals', duration: '7 days', schedule: 'Schedule H' }
      ],
      diagnosis: 'Severe flea allergy dermatitis + secondary superficial pyoderma',
      status: 'Pending Verification',
      refillEligible: false,
      notes: 'Ensure pet is fed prior to administration.'
    },
    {
      id: 'RX-2026-9040',
      date: 'Today, 11:10 AM',
      petName: 'Kiki',
      species: 'Feline (Persian Longhair)',
      weight: '3.8 kg',
      age: '6 yrs',
      parent: 'Meera Deshmukh (+91 98201 44556)',
      vet: 'Dr. Rahul Mehta',
      vci: 'VCI-MAH-2015-110',
      clinic: 'Zenve Feline Specialty Care (Bandra)',
      drugs: [
        { name: 'Zoetis Revolution Spot-On (Cat)', dose: '1 Pipette (0.75ml)', freq: 'Topical monthly', duration: '30 days', schedule: 'Schedule H' },
        { name: 'Gabapentin Oral Liquid 50mg/ml', dose: '0.4 ml (OD)', freq: 'Once daily before bedtime', duration: '14 days', schedule: 'Schedule H' }
      ],
      diagnosis: 'Hyperesthesia syndrome & periodic anxiety',
      status: 'Pending Verification',
      refillEligible: true,
      notes: 'Calibrated oral syringe provided.'
    },
    {
      id: 'RX-2026-9039',
      date: 'Today, 10:45 AM',
      petName: 'Simba',
      species: 'Canine (German Shepherd)',
      weight: '38.0 kg',
      age: '9 yrs',
      parent: 'Ananya Roy (+91 97110 99881)',
      vet: 'Dr. Aisha Khan',
      vci: 'VCI-DEL-2019-304',
      clinic: 'Zenve Cardiology Wing (Delhi NCR)',
      drugs: [
        { name: 'Cardisure 5mg (Pimobendan)', dose: '1.5 Tabs (BID)', freq: 'Twice daily empty stomach (1hr before food)', duration: '30 days (Chronic)', schedule: 'Schedule H' },
        { name: 'Furosemide 20mg', dose: '1 Tab (OD)', freq: 'Morning after breakfast', duration: '30 days', schedule: 'Schedule H' }
      ],
      diagnosis: 'Congestive Heart Failure (Stage C MMVD)',
      status: 'Verified & Ready',
      refillEligible: true,
      notes: 'Strict chronic refill protocol active.'
    },
    {
      id: 'RX-2026-9038',
      date: 'Today, 09:30 AM',
      petName: 'Bella',
      species: 'Canine (Beagle)',
      weight: '13.5 kg',
      age: '1 yr',
      parent: 'Deepika Sen (+91 99002 77665)',
      vet: 'Dr. Karan Patel',
      vci: 'VCI-GUJ-2020-512',
      clinic: 'Zenve Wellness Hub',
      drugs: [
        { name: 'Nobivac DHPPi Core Vaccine 1D', dose: '1 Vial (1ml SubQ)', freq: 'Immediate clinic administration', duration: 'Annual Booster', schedule: 'Schedule H' }
      ],
      diagnosis: 'Annual core vaccination booster schedule',
      status: 'Dispensed',
      refillEligible: false,
      notes: 'Cold chain 3.6°C custody maintained.'
    },
    {
      id: 'RX-2026-9037',
      date: 'Yesterday, 05:40 PM',
      petName: 'Rocky',
      species: 'Canine (Rottweiler)',
      weight: '45.0 kg',
      age: '5 yrs',
      parent: 'Vikram Sethi (+91 98110 33221)',
      vet: 'Dr. Neha Singh',
      vci: 'VCI-PUN-2017-628',
      clinic: 'Zenve Ortho Center',
      drugs: [
        { name: 'Carprovet 100mg (Carprofen)', dose: '1 Tab (BID)', freq: 'Twice daily with meals', duration: '10 days', schedule: 'Schedule H' },
        { name: 'Tramadol Vet 50mg', dose: '1 Tab (TID)', freq: 'Every 8 hours as needed', duration: '5 days', schedule: 'Schedule H' }
      ],
      diagnosis: 'Post-op cruciate ligament repair rehabilitation',
      status: 'Flagged for Review',
      refillEligible: false,
      notes: 'Pharmacist warning: check concurrent renal panel before release.'
    }
  ];

  const filtered = useMemo(() => {
    return prescriptions.filter(rx => {
      const matchStatus = statusFilter === 'ALL' || rx.status === statusFilter;
      const matchSearch = search === '' ||
        rx.id.toLowerCase().includes(search.toLowerCase()) ||
        rx.petName.toLowerCase().includes(search.toLowerCase()) ||
        rx.parent.toLowerCase().includes(search.toLowerCase()) ||
        rx.vet.toLowerCase().includes(search.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [statusFilter, search]);

  function handleVerifyRx(rxId) {
    setSelectedRx(null);
    setToast(`Prescription ${rxId} verified by Registered Pharmacist and allocated for dispensing!`);
    setTimeout(() => setToast(''), 3500);
  }

  return (
    <DashboardLayout
      category="Pharmacy"
      subcategory="Prescriptions"
      title="Digital Veterinary Prescriptions (e-Rx)"
      subtitle="Doctor verification, VCI licensure audit, drug interaction alerts, and dispensing authorization"
      icon="📋"
      badge="100% Licensed e-Rx"
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => alert('Searching Veterinary Council of India (VCI) registry database for license validations...')}
            style={{
              padding: '7px 14px',
              borderRadius: '8px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: '#fff',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Verify Doctor VCI License
          </button>
        </div>
      }
    >
      {toast && (
        <div style={{
          padding: '12px 16px',
          borderRadius: '8px',
          background: 'rgba(16,185,129,0.15)',
          border: '1px solid rgba(16,185,129,0.3)',
          color: '#10b981',
          fontSize: '13px',
          fontWeight: 600
        }}>
          ✓ {toast}
        </div>
      )}

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Prescriptions MTD" value="1,840 Rx" delta="+14.2% YoY" trend="up" subtext="Digital tamper-proof" icon="📋" />
        <KpiCard label="Pending Pharmacist Queue" value="14 Rx" delta="Avg 4.2 min review" trend="neutral" subtext="Action required" icon="⏳" />
        <KpiCard label="Dispensed Today" value="86 Rx" delta="100% on time" trend="up" subtext="Zero misdispenses" icon="✅" />
        <KpiCard label="Chronic Refill Orders" value="38 Rx" delta="Automated reminder" trend="up" subtext="Heart, renal & endocrine" icon="🔄" />
        <KpiCard label="Flagged Safety Alerts" value="2 Rx" delta="Drug Interaction" trend="down" subtext="Under doctor review" icon="⚠️" />
        <KpiCard label="Doctor Licensure" value="100.0%" delta="VCI Verified" trend="up" subtext="48 verified veterinarians" icon="👨‍⚕️" />
      </div>

      {/* Prescription Queue Container */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Veterinary Prescription In-Queue</h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#94a3b8' }}>Review prescriptions before release under Schedule H Regulations</p>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Search Rx ID, pet, parent, doctor..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                background: 'rgba(0,0,0,0.2)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                fontSize: '12px',
                width: '240px'
              }}
            />
            <div style={{ display: 'flex', gap: '4px' }}>
              {['ALL', 'Pending Verification', 'Verified & Ready', 'Dispensed', 'Flagged for Review'].map(st => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  style={{
                    padding: '5px 10px',
                    borderRadius: '6px',
                    border: 'none',
                    fontSize: '11px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    background: statusFilter === st ? 'rgba(59,130,246,0.25)' : 'rgba(255,255,255,0.05)',
                    color: statusFilter === st ? '#60a5fa' : '#94a3b8'
                  }}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Prescriptions Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: '#94a3b8' }}>
                <th style={{ padding: '8px 12px' }}>Rx Number</th>
                <th style={{ padding: '8px 12px' }}>Date</th>
                <th style={{ padding: '8px 12px' }}>Pet Patient</th>
                <th style={{ padding: '8px 12px' }}>Prescribing Vet</th>
                <th style={{ padding: '8px 12px' }}>Prescribed Drugs</th>
                <th style={{ padding: '8px 12px' }}>Status</th>
                <th style={{ padding: '8px 12px', textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((rx, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '10px 12px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 600, color: '#38bdf8' }}>
                    {rx.id}
                  </td>
                  <td style={{ padding: '10px 12px', color: '#94a3b8' }}>{rx.date}</td>
                  <td style={{ padding: '10px 12px' }}>
                    <div style={{ fontWeight: 600 }}>{rx.petName}</div>
                    <div style={{ fontSize: '10px', color: '#64748b' }}>{rx.species} · {rx.weight}</div>
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <div style={{ fontWeight: 600 }}>{rx.vet}</div>
                    <div style={{ fontSize: '10px', color: '#38bdf8' }}>{rx.vci}</div>
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    {rx.drugs.map((d, dIdx) => (
                      <div key={dIdx} style={{ fontSize: '11px', color: '#cbd5e1' }}>
                        • <strong>{d.name}</strong> ({d.dose})
                      </div>
                    ))}
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '99px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: rx.status === 'Dispensed' ? 'rgba(16,185,129,0.15)' :
                        rx.status === 'Verified & Ready' ? 'rgba(59,130,246,0.15)' :
                        rx.status === 'Flagged for Review' ? 'rgba(239,68,68,0.15)' : 'rgba(245,158,11,0.15)',
                      color: rx.status === 'Dispensed' ? '#34d399' :
                        rx.status === 'Verified & Ready' ? '#60a5fa' :
                        rx.status === 'Flagged for Review' ? '#f87171' : '#fbbf24'
                    }}>
                      {rx.status}
                    </span>
                  </td>
                  <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                    <button
                      onClick={() => setSelectedRx(rx)}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        background: 'rgba(59,130,246,0.2)',
                        border: '1px solid rgba(59,130,246,0.4)',
                        color: '#60a5fa',
                        fontSize: '11px',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      View & Verify
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Prescription Detail & Approval Modal */}
      {selectedRx && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999
        }}>
          <div style={{
            background: '#1e293b',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
            padding: '24px',
            width: '90%',
            maxWidth: '620px',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px' }}>
              <div>
                <span style={{ fontSize: '11px', color: '#94a3b8', fontFamily: '"IBM Plex Mono", monospace' }}>OFFICIAL E-PRESCRIPTION</span>
                <h3 style={{ margin: '2px 0 0', fontSize: '18px', fontWeight: 700, color: '#38bdf8' }}>{selectedRx.id}</h3>
              </div>
              <span style={{
                padding: '3px 8px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 600,
                background: 'rgba(16,185,129,0.15)',
                color: '#10b981'
              }}>
                VCI Licensure Active
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '16px' }}>
              <div style={{ padding: '10px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>Patient Details</span>
                <div style={{ fontWeight: 600, marginTop: '2px' }}>{selectedRx.petName} ({selectedRx.species})</div>
                <div style={{ fontSize: '11px', color: '#cbd5e1' }}>Age: {selectedRx.age} · Weight: <strong>{selectedRx.weight}</strong></div>
                <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>Parent: {selectedRx.parent}</div>
              </div>
              <div style={{ padding: '10px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>Prescribing Veterinarian</span>
                <div style={{ fontWeight: 600, marginTop: '2px' }}>{selectedRx.vet}</div>
                <div style={{ fontSize: '11px', color: '#38bdf8' }}>License: {selectedRx.vci}</div>
                <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>{selectedRx.clinic}</div>
              </div>
            </div>

            <div style={{ marginTop: '16px' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8' }}>Clinical Diagnosis</span>
              <div style={{ padding: '8px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: '6px', fontSize: '12px', marginTop: '4px' }}>
                {selectedRx.diagnosis}
              </div>
            </div>

            <div style={{ marginTop: '16px' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8' }}>Prescribed Regimen</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '6px' }}>
                {selectedRx.drugs.map((d, i) => (
                  <div key={i} style={{ padding: '10px 12px', background: 'rgba(0,0,0,0.25)', borderRadius: '8px', borderLeft: '3px solid #3b82f6' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <strong style={{ fontSize: '13px', color: '#fff' }}>{d.name}</strong>
                      <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '4px', background: 'rgba(239,68,68,0.15)', color: '#f87171' }}>{d.schedule}</span>
                    </div>
                    <div style={{ fontSize: '11px', color: '#cbd5e1', marginTop: '4px' }}>
                      Dosage: <strong>{d.dose}</strong> · Frequency: {d.freq} · Duration: {d.duration}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px' }}>
              <button
                onClick={() => setSelectedRx(null)}
                style={{ padding: '8px 16px', borderRadius: '6px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', cursor: 'pointer' }}
              >
                Close
              </button>
              <button
                onClick={() => handleVerifyRx(selectedRx.id)}
                style={{ padding: '8px 16px', borderRadius: '6px', background: '#10b981', border: 'none', color: '#fff', fontWeight: 600, cursor: 'pointer' }}
              >
                ✓ Approve & Authorize Dispensing
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
