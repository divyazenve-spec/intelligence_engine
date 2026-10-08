import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function PetProfiles() {
  const [selectedPet, setSelectedPet] = useState('PET-101');

  const profiles = [];

  const pet = profiles.find(p => p.id === selectedPet) || profiles[0];

  return (
    <DashboardLayout
      category="Pets 360°"
      subcategory="Pet Profiles"
      title="Comprehensive Longitudinal Pet Profiles"
      subtitle="Holistic biometric identifiers, ownership records, insurance policies, clinical notes, and nutritional profiles"
      icon="🐾"
      badge=""
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          {profiles.map(p => (
            <button
              key={p.id}
              onClick={() => setSelectedPet(p.id)}
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                border: selectedPet === p.id ? '1px solid #2563eb' : '1px solid #cbd5e1',
                background: selectedPet === p.id ? '#2563eb' : '#ffffff',
                color: selectedPet === p.id ? '#ffffff' : '#475569'
              }}
            >
              {p.name} ({p.breed.split(' ')[0]})
            </button>
          ))}
        </div>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '14px', marginBottom: '20px' }}>
        <KpiCard label="Selected Pet" value={pet.name} delta={pet.species} trend="neutral" subtext={pet.id} icon="🐾" />
        <KpiCard label="Weight & Condition" value={pet.weight} delta="--" trend="neutral" subtext="Monthly weighed" icon="⚖️" />
        <KpiCard label="Vaccine Status" value={pet.vaxStatus} delta="Verified" trend="neutral" subtext="Biological passport" icon="💉" />
        <KpiCard label="Attending Vet" value={pet.primaryVet.split(' ')[0] + ' ' + pet.primaryVet.split(' ')[1]} delta={pet.clinic.split(' ')[0]} trend="neutral" subtext="Assigned clinician" icon="👨‍⚕️" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        {/* Left Column: Biological & Clinical Details */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px solid #f1f5f9', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#eff6ff', display: 'grid', placeItems: 'center', fontSize: '24px' }}>
                {pet.species === 'Canine' ? '🐕' : '🐈'}
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>{pet.name}’s Medical Passport</h3>
                <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>{pet.species} • {pet.breed} • {pet.dob}</p>
              </div>
            </div>
            <span style={{ padding: '4px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 700, background: '#ecfdf5', color: '#059669', border: '1px solid #a7f3d0' }}>
              ACTIVE RECORD
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', fontSize: '13px' }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase' }}>Microchip RFID</div>
              <div style={{ fontWeight: 600, color: '#0f172a', fontFamily: 'monospace', marginTop: '2px' }}>{pet.microchip}</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase' }}>Gender & Spay Status</div>
              <div style={{ fontWeight: 600, color: '#0f172a', marginTop: '2px' }}>{pet.gender}</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase' }}>Current Weight & Body Score</div>
              <div style={{ fontWeight: 600, color: '#0f172a', marginTop: '2px' }}>{pet.weight}</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase' }}>Coat Color & Markings</div>
              <div style={{ fontWeight: 600, color: '#0f172a', marginTop: '2px' }}>{pet.color}</div>
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase' }}>Clinical Nutrition & Feeding Protocol</div>
              <div style={{ fontWeight: 600, color: '#0f172a', marginTop: '2px' }}>{pet.diet}</div>
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase' }}>Allergies & Contraindications</div>
              <div style={{ fontWeight: 600, color: '#dc2626', marginTop: '2px' }}>⚠️ {pet.allergies}</div>
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase' }}>Clinical Physician Notes</div>
              <div style={{ color: '#475569', marginTop: '2px', lineHeight: 1.5, background: '#f8fafc', padding: '10px 12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                {pet.notes}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Ownership, Facility & Insurance */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
            <h4 style={{ margin: '0 0 14px', fontSize: '13px', fontWeight: 700, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.04em' }}>👤 Pet Parent Information</h4>
            <div style={{ fontSize: '13px', lineHeight: 1.6 }}>
              <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '15px' }}>{pet.parent}</div>
              <div style={{ color: '#475569', marginTop: '4px' }}>📞 {pet.phone}</div>
              <div style={{ color: '#475569' }}>✉️ {pet.email}</div>
              <div style={{ color: '#64748b', fontSize: '12px', marginTop: '6px' }}>📍 {pet.address}</div>
            </div>
          </div>

          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
            <h4 style={{ margin: '0 0 14px', fontSize: '13px', fontWeight: 700, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.04em' }}>🏥 Care Provider & Coverage</h4>
            <div style={{ fontSize: '13px', lineHeight: 1.6 }}>
              <div style={{ fontWeight: 600, color: '#0f172a' }}>{pet.clinic}</div>
              <div style={{ color: '#2563eb', fontSize: '12px', fontWeight: 600 }}>{pet.primaryVet}</div>
              <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #f1f5f9' }}>
                <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase' }}>Pet Insurance Policy</div>
                <div style={{ fontWeight: 600, color: '#059669' }}>🛡️ {pet.insurance}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
