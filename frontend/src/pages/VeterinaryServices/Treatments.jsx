import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function Treatments() {
  const [wardFilter, setWardFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const treatments = [
    { id: 'TRT-401', pet: 'Casper (Siberian Husky)', parent: 'Aditya Oberoi', ward: 'Critical ICU Ward', vet: 'Dr. Neha Singh', protocol: 'Severe Heatstroke & Hyperthermia Protocol', meds: 'Chilled IV Ringer Lactate, Mannitol, O2 Support', daysAdmitted: 2, vitals: 'Temp: 38.8°C (Normalized) • HR: 110bpm', recoveryProgress: '78%', status: 'Guarded Progress' },
    { id: 'TRT-402', pet: 'Simba (Persian Cat)', parent: 'Rashmi Sen', ward: 'Feline Special Ward', vet: 'Dr. Aisha Khan', protocol: 'Urethral Obstruction & Post-Catheterization Care', meds: 'Buprenorphine, Prazosin, IV Plasmalyte', daysAdmitted: 3, vitals: 'Urine Output: 2.2 ml/kg/hr • Normal', recoveryProgress: '92%', status: 'Discharge Ready' },
    { id: 'TRT-403', pet: 'Shadow (Black Labrador)', parent: 'Manish Tiwari', ward: 'Post-Op Surgical Ward', vet: 'Dr. Rahul Mehta', protocol: 'Hemilaminectomy Spinal Decompression Post-Op', meds: 'Gabapentin, Meloxicam, Physical Rehab passive rom', daysAdmitted: 4, vitals: 'Deep Pain Perception: Positive • Reflexes ++', recoveryProgress: '65%', status: 'Stable Recovery' },
    { id: 'TRT-404', pet: 'Ginger (Golden Retriever)', parent: 'Sunita Menon', ward: 'Medical Ward A', vet: 'Dr. Priya Sharma', protocol: 'Canine Parvovirus Intensive Fluid Resuscitation', meds: 'Maropitant, Metronidazole IV, Ondansetron', daysAdmitted: 5, vitals: 'Eating wet gastro diet voluntarily', recoveryProgress: '88%', status: 'Stable Recovery' },
    { id: 'TRT-405', pet: 'Coco (French Bulldog)', parent: 'Varun Grover', ward: 'Post-Op Surgical Ward', vet: 'Dr. Rahul Mehta', protocol: 'BOAS Rhinoplasty & Soft Palate Resection Post-Op', meds: 'Dexamethasone tapering, Nebulization 3x/day', daysAdmitted: 1, vitals: 'SpO2: 99% on room air • Clear airway sounds', recoveryProgress: '70%', status: 'Under Observation' },
    { id: 'TRT-406', pet: 'Tiger (Bengal Cat)', parent: 'Naveen Jindal', ward: 'Isolation Ward', vet: 'Dr. Aisha Khan', protocol: 'Feline Infectious Peritonitis (FIP) GS-441524 Protocol', meds: 'GS-441524 10mg/kg SC Daily, Cobalamin, Hepato-protectant', daysAdmitted: 12, vitals: 'A/G Ratio: 0.72 (Improved from 0.38)', recoveryProgress: '84%', status: 'Guarded Progress' }
  ];

  const filtered = treatments.filter(t => {
    const matchesFilter = wardFilter === 'ALL' || t.ward === wardFilter || t.status === wardFilter;
    const matchesSearch = t.pet.toLowerCase().includes(search.toLowerCase()) ||
      t.parent.toLowerCase().includes(search.toLowerCase()) ||
      t.protocol.toLowerCase().includes(search.toLowerCase()) ||
      t.vet.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <DashboardLayout
      category="Veterinary Services"
      subcategory="Treatments"
      title="Inpatient Treatment Protocols & Ward Management"
      subtitle="ICU patient vitals, fluid therapy rates, surgical recovery milestones, chronic medical therapy, and discharge tracking"
      icon="💊"
      badge="18 Inpatients Admitted"
      actions={
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {['ALL', 'Critical ICU Ward', 'Post-Op Surgical Ward', 'Feline Special Ward', 'Discharge Ready', 'Stable Recovery'].map(w => (
            <button
              key={w}
              onClick={() => setWardFilter(w)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                border: wardFilter === w ? '1px solid #2563eb' : '1px solid #e2e8f0',
                background: wardFilter === w ? '#eff6ff' : '#ffffff',
                color: wardFilter === w ? '#2563eb' : '#64748b'
              }}
            >
              {w}
            </button>
          ))}
        </div>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Active Inpatient Ward" value="18 Patients" delta="82% Bed Occupancy" trend="up" subtext="6 ICU • 7 Post-Op • 5 General" icon="🏥" />
        <KpiCard label="Treatment Success Rate" value="97.4%" delta="+1.1% MoM" trend="up" subtext="Clinical recovery & discharge" icon="🎯" />
        <KpiCard label="Average Hospital Stay" value="3.4 Days" delta="Optimal turnover" trend="up" subtext="Benchmark: 4.0 Days" icon="⏱️" />
        <KpiCard label="Ready for Discharge" value="4 Pets Today" delta="Discharge summaries ready" trend="up" subtext="Pet parent pickup scheduled" icon="🏡" />
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
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Active Clinical Inpatient Wards & Therapeutic Regimens</h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>Hourly nursing vitals, intravenous fluid titration, and attending veterinary physician care logs</p>
          </div>
          <div>
            <input
              type="text"
              placeholder="Search inpatient, treatment protocol, vet..."
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
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Patient & Case</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Ward & Bed</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Primary Veterinarian</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Clinical Treatment Protocol</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Medication & Infusion</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Vitals & Parameters</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Recovery Progress</th>
                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(t => (
                <tr key={t.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{t.pet}</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>{t.id} • {t.parent}</div>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: t.ward.includes('ICU') ? '#fee2e2' : t.ward.includes('Surgical') ? '#eff6ff' : '#f8fafc',
                      color: t.ward.includes('ICU') ? '#b91c1c' : t.ward.includes('Surgical') ? '#1d4ed8' : '#334155'
                    }}>
                      {t.ward}
                    </span>
                    <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>Day {t.daysAdmitted} of admission</div>
                  </td>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#2563eb' }}>{t.vet}</td>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>{t.protocol}</td>
                  <td style={{ padding: '12px 16px', color: '#475569', fontSize: '11px' }}>{t.meds}</td>
                  <td style={{ padding: '12px 16px', color: '#0f172a', fontWeight: 500, fontSize: '11px', fontFamily: '"IBM Plex Mono", monospace' }}>{t.vitals}</td>
                  <td style={{ padding: '12px 16px', minWidth: '130px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 700, marginBottom: '4px' }}>
                      <span>{t.recoveryProgress}</span>
                    </div>
                    <div style={{ height: '6px', width: '100%', background: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: t.recoveryProgress, background: parseInt(t.recoveryProgress) > 80 ? '#16a34a' : '#2563eb', borderRadius: '999px' }} />
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '999px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: t.status === 'Discharge Ready' ? '#dcfce7' : t.status === 'Stable Recovery' ? '#eff6ff' : '#fef9c3',
                      color: t.status === 'Discharge Ready' ? '#15803d' : t.status === 'Stable Recovery' ? '#1d4ed8' : '#854d0e'
                    }}>
                      {t.status}
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
