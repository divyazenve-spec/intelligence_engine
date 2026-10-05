import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function PetsDashboard() {
  const [activeTab, setActiveTab] = useState('ALL');

  const subcategories = [
    { name: 'All Pets', desc: '1,240 Enrolled Census', icon: '🐕', path: '#all-pets' },
    { name: 'Pet Profiles', desc: 'Biometric RFID & Vitals', icon: '📋', path: '#pet-profiles' },
    { name: 'Pet Health Records', desc: '9,410 Longitudinal EHRs', icon: '🩺', path: '#pet-health-records' },
    { name: 'Vaccination Records', desc: 'Digital Health Passports', icon: '💉', path: '#vaccination-records' },
    { name: 'Treatment History', desc: 'ICU & Recovery Regimens', icon: '💊', path: '#treatment-history' },
    { name: 'Prescription History', desc: 'Active Refills & Rx Dosages', icon: '🧪', path: '#prescription-history' },
    { name: 'Purchase History', desc: 'Nutrition & Wellness Spend', icon: '🛍️', path: '#purchase-history' },
    { name: 'Pet Analytics', desc: 'Breed & Age Demographics', icon: '📊', path: '#pet-analytics' },
    { name: 'Pet Health Insights', desc: 'AI Epidemiological Alerts', icon: '🧠', path: '#pet-health-insights' }
  ];

  const recentPets = [
    { id: 'PET-101', name: 'Bruno', species: 'Canine', breed: 'Golden Retriever', age: '3y 2m', parent: 'Vikram Singhania', status: 'Healthy', vax: 'Up to Date', score: 96 },
    { id: 'PET-102', name: 'Milo', species: 'Feline', breed: 'Persian Longhair', age: '2y 6m', parent: 'Ananya Deshmukh', status: 'Care Plan Active', vax: 'Due in 14d', score: 88 },
    { id: 'PET-103', name: 'Rocky', species: 'Canine', breed: 'German Shepherd', age: '4y 1m', parent: 'Rohan Mehta', status: 'Post-Op Rehab', vax: 'Up to Date', score: 92 },
    { id: 'PET-104', name: 'Simba', species: 'Canine', breed: 'Beagle', age: '1y 8m', parent: 'Pooja Nair', status: 'Otitis Regimen', vax: 'Up to Date', score: 84 },
    { id: 'PET-105', name: 'Bella', species: 'Canine', breed: 'Shih Tzu', age: '5y 4m', parent: 'Kavita Rao', status: 'Cardiac Monitor', vax: 'Overdue', score: 78 }
  ];

  return (
    <DashboardLayout
      category="Pets 360°"
      subcategory="Overview"
      title="Pet Health Intelligence & Census Control Center"
      subtitle="Master control center for 1,240 registered companion animals: longitudinal electronic health records, digital vaccine passports, and clinical analytics"
      icon="🐾"
      badge="1,240 Registered Pets"
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => { if (window.ZenvePetsDashboard && window.ZenvePetsDashboard.open) window.ZenvePetsDashboard.open('all-pets'); }}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              border: 'none',
              background: '#2563eb',
              color: '#ffffff'
            }}
          >
            Launch Interactive Suite
          </button>
        </div>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '14px', marginBottom: '20px' }}>
        <KpiCard label="Total Registered Pets" value="1,240" delta="+26.4%" trend="up" subtext="Canine & Feline" icon="🐾" />
        <KpiCard label="Canine Population" value="970 Dogs" delta="78.2% Share" trend="neutral" subtext="Primary demographic" icon="🐕" />
        <KpiCard label="Feline Population" value="241 Cats" delta="19.4% Share" trend="up" subtext="+32% YoY growth" icon="🐈" />
        <KpiCard label="Immunization Compliance" value="93.8%" delta="1,163 Active" trend="up" subtext="Vaccine passports valid" icon="💉" />
        <KpiCard label="Microchip Enrollment" value="86.5%" delta="1,072 Chipped" trend="up" subtext="RFID registered" icon="🏷️" />
      </div>

      {/* Subcategory Grid */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Pets 360° Subcategory Dashboards</h3>
          <span style={{ fontSize: '12px', color: '#64748b' }}>Select a domain module to inspect live records</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
          {subcategories.map(sc => (
            <div
              key={sc.name}
              onClick={() => {
                const idMap = {
                  'All Pets': 'all-pets',
                  'Pet Profiles': 'pet-profiles',
                  'Pet Health Records': 'pet-health-records',
                  'Vaccination Records': 'vaccination-records',
                  'Treatment History': 'treatment-history',
                  'Prescription History': 'prescription-history',
                  'Purchase History': 'purchase-history',
                  'Pet Analytics': 'pet-analytics',
                  'Pet Health Insights': 'pet-health-insights'
                };
                if (window.ZenvePetsDashboard && window.ZenvePetsDashboard.open) {
                  window.ZenvePetsDashboard.open(idMap[sc.name] || 'all-pets');
                }
              }}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '10px',
                padding: '14px 16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                transition: 'all 0.15s ease',
                boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#2563eb';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(37,99,235,0.08)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.02)';
              }}
            >
              <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: '#eff6ff', display: 'grid', placeItems: 'center', fontSize: '18px', flexShrink: 0 }}>
                {sc.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: '13px', color: '#0f172a' }}>{sc.name}</div>
                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>{sc.desc}</div>
              </div>
              <span style={{ color: '#94a3b8', fontSize: '14px' }}>→</span>
            </div>
          ))}
        </div>
      </div>

      {/* Patient Census Stream */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Recent Patient Admissions & Clinical Health Index</h3>
          <span style={{ fontSize: '11px', color: '#64748b' }}>Updated in real time</span>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontSize: '11px', textTransform: 'uppercase' }}>
              <th style={{ padding: '10px 14px' }}>Pet</th>
              <th style={{ padding: '10px 14px' }}>Species & Breed</th>
              <th style={{ padding: '10px 14px' }}>Age</th>
              <th style={{ padding: '10px 14px' }}>Pet Parent</th>
              <th style={{ padding: '10px 14px' }}>Clinical Status</th>
              <th style={{ padding: '10px 14px' }}>Vaccines</th>
              <th style={{ padding: '10px 14px' }}>Health Score</th>
            </tr>
          </thead>
          <tbody>
            {recentPets.map((p, idx) => (
              <tr key={p.id} style={{ borderBottom: idx !== recentPets.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                <td style={{ padding: '10px 14px', fontWeight: 700, color: '#0f172a' }}>{p.name}</td>
                <td style={{ padding: '10px 14px', color: '#334155' }}>{p.species} • {p.breed}</td>
                <td style={{ padding: '10px 14px', color: '#64748b' }}>{p.age}</td>
                <td style={{ padding: '10px 14px', color: '#0f172a' }}>{p.parent}</td>
                <td style={{ padding: '10px 14px' }}>
                  <span style={{
                    padding: '2px 8px',
                    borderRadius: '999px',
                    fontSize: '11px',
                    fontWeight: 600,
                    background: p.status === 'Healthy' ? '#ecfdf5' : '#eff6ff',
                    color: p.status === 'Healthy' ? '#059669' : '#1d4ed8'
                  }}>
                    {p.status}
                  </span>
                </td>
                <td style={{ padding: '10px 14px', fontSize: '12px', color: p.vax.includes('Overdue') ? '#dc2626' : '#059669', fontWeight: 600 }}>{p.vax}</td>
                <td style={{ padding: '10px 14px', fontWeight: 700, color: p.score >= 90 ? '#059669' : '#2563eb' }}>{p.score}/100</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
