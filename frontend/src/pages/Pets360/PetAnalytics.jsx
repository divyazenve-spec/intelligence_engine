import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function PetAnalytics() {
  const [timeRange, setTimeRange] = useState('30D');
  const [speciesFilter, setSpeciesFilter] = useState('ALL');
  const [searchBreed, setSearchBreed] = useState('');
  const [selectedHub, setSelectedHub] = useState('ALL');

  const breedDistribution = [];

  const lifeStages = [
    { stage: 'Pediatric / Puppy & Kitten (< 1 yr)', pets: 0, pct: 0, color: '#2563eb', focus: 'Primary DHPPiL/Tricat series, microchipping, puppy socialization, nutritional formulas' },
    { stage: 'Young Adult (1 – 3 yrs)', pets: 0, pct: 0, color: '#10b981', focus: 'Annual booster immunization, dental prophylaxis scaling, flea & tick prevention, desexing' },
    { stage: 'Mature Adult (4 – 6 yrs)', pets: 0, pct: 0, color: '#f59e0b', focus: 'Caloric weight tracking, baseline blood chemistry & urinalysis, joint mobility supplements' },
    { stage: 'Senior Companion (7 – 10 yrs)', pets: 0, pct: 0, color: '#8b5cf6', focus: 'Geriatric screening, renal SDMA biomarker panels, cardiac doppler ultrasound, arthritis analgesia' },
    { stage: 'Super Senior / Geriatric (11+ yrs)', pets: 0, pct: 0, color: '#ef4444', focus: 'Cognitive dysfunction support, palliative comfort protocols, sub-Q hydration therapy' }
  ];

  const bcsDistribution = [
    { label: 'BCS 1-3 (Underweight)', count: 0, pct: 0, color: '#3b82f6', tag: 'High-density caloric nutrition & deworming' },
    { label: 'BCS 4-5 (Ideal & Optimal)', count: 0, pct: 0, color: '#10b981', tag: 'Balanced maintenance diet & regular exercise' },
    { label: 'BCS 6-7 (Overweight)', count: 0, pct: 0, color: '#f59e0b', tag: 'Caloric restriction & portion management' },
    { label: 'BCS 8-9 (Clinically Obese)', count: 0, pct: 0, color: '#ef4444', tag: 'Satiety metabolic diet & endocrinology workup' }
  ];

  const regionalHubs = [];

  const filteredBreeds = breedDistribution.filter(b => {
    const matchesSpecies = speciesFilter === 'ALL' || b.species === speciesFilter;
    const matchesSearch = b.breed.toLowerCase().includes(searchBreed.toLowerCase()) || b.riskTier.toLowerCase().includes(searchBreed.toLowerCase());
    return matchesSpecies && matchesSearch;
  });

  return (
    <DashboardLayout
      category="Pets 360°"
      subcategory="Pet Analytics"
      title="Pet Population Demographics & Statistical Analytics"
      subtitle="Holistic statistical analysis of registered companion animals, species segmentation, life-stage epidemiology, BCS distribution, and clinical compliance"
      icon="📊"
      badge=""
      actions={
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['7D', '30D', '90D', '1Y', 'ALL'].map(t => (
            <button
              key={t}
              onClick={() => setTimeRange(t)}
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                border: timeRange === t ? '1px solid #2563eb' : '1px solid #e2e8f0',
                background: timeRange === t ? '#eff6ff' : '#ffffff',
                color: timeRange === t ? '#2563eb' : '#64748b',
                transition: 'all 0.15s ease'
              }}
            >
              {t}
            </button>
          ))}
        </div>
      }
    >
      {/* KPI Ribbon */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '22px' }}>
        <KpiCard label="Registered Population" value="0" delta="0.0%" trend="neutral" subtext="No registered pets" icon="🐾" />
        <KpiCard label="Sterilization Rate" value="0.0%" delta="0.0%" trend="neutral" subtext="Reduces behavioral & cancer risks" icon="✂️" />
        <KpiCard label="Microchip RFID Rate" value="0.0%" delta="0.0%" trend="neutral" subtext="ISO 11784/11785 compliant" icon="📡" />
        <KpiCard label="Average Body Condition" value="0.0" delta="0.0%" trend="neutral" subtext="Standard condition" icon="⚖️" />
        <KpiCard label="Preventive Compliance" value="0.0%" delta="0.0%" trend="neutral" subtext="Vaccine & deworming adherence" icon="🛡️" />
      </div>

      {/* Cohort & Life-Stage Analytics */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '20px', marginBottom: '22px' }}>
        {/* Life Stages */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Life-Stage & Age Cohort Epidemiology</h3>
              <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>Longitudinal population pyramid based on biological age stages</p>
            </div>
            <span style={{ fontSize: '11px', background: '#f1f5f9', padding: '4px 8px', borderRadius: '4px', fontWeight: 600, color: '#475569' }}>
              Median: 0 Yrs
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {lifeStages.map(ls => (
              <div key={ls.stage} style={{ padding: '12px 14px', borderRadius: '8px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontWeight: 700, fontSize: '13px', color: '#0f172a' }}>{ls.stage}</span>
                  <span style={{ fontWeight: 700, color: ls.color, fontSize: '13px' }}>{ls.pets} pets ({ls.pct.toFixed(1)}%)</span>
                </div>
                <div style={{ width: '100%', height: '7px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden', marginBottom: '8px' }}>
                  <div style={{ width: `${ls.pct}%`, maxWidth: '100%', height: '100%', background: ls.color, borderRadius: '4px' }} />
                </div>
                <div style={{ fontSize: '11px', color: '#64748b', lineHeight: 1.4 }}>
                  <strong style={{ color: '#334155' }}>Clinical Focus:</strong> {ls.focus}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BCS and Species Breakdown */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* BCS Card */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
          }}>
            <h3 style={{ margin: '0 0 4px', fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Body Condition Score (BCS 1–9) Distribution</h3>
            <p style={{ margin: '0 0 14px', fontSize: '12px', color: '#64748b' }}>Clinical nutritional stratification across pet population</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {bcsDistribution.map(b => (
                <div key={b.label} style={{ padding: '10px 12px', borderRadius: '6px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>
                    <span style={{ color: '#0f172a' }}>{b.label}</span>
                    <span style={{ color: b.color }}>{b.count} pets ({b.pct.toFixed(1)}%)</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden', marginBottom: '6px' }}>
                    <div style={{ width: `${b.pct}%`, height: '100%', background: b.color }} />
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>{b.tag}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Gender & Desexing Demographics */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
          }}>
            <h3 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Gender & Reproductive Status</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              <div style={{ padding: '10px', background: '#eff6ff', borderRadius: '8px', border: '1px solid #bfdbfe', textAlign: 'center' }}>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#1d4ed8' }}>0</div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: '#1e40af' }}>Neutered Males (0.0%)</div>
              </div>
              <div style={{ padding: '10px', background: '#fdf2f8', borderRadius: '8px', border: '1px solid #fbcfe8', textAlign: 'center' }}>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#be185d' }}>0</div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: '#9d174d' }}>Spayed Females (0.0%)</div>
              </div>
              <div style={{ padding: '10px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#475569' }}>0</div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: '#64748b' }}>Intact Males (0.0%)</div>
              </div>
              <div style={{ padding: '10px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#475569' }}>0</div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: '#64748b' }}>Intact Females (0.0%)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Breed Population & Epidemiological Risk Matrix */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
        marginBottom: '22px'
      }}>
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Breed Demographics & Genetic Predisposition Matrix</h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>Epidemiological risk stratification by companion breed</p>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Search breed or risk..."
              value={searchBreed}
              onChange={(e) => setSearchBreed(e.target.value)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                fontSize: '12px',
                outline: 'none',
                minWidth: '180px'
              }}
            />
            <div style={{ display: 'flex', gap: '4px' }}>
              {['ALL', 'Canine', 'Feline', 'Avian'].map(s => (
                <button
                  key={s}
                  onClick={() => setSpeciesFilter(s)}
                  style={{
                    padding: '5px 10px',
                    borderRadius: '6px',
                    fontSize: '11px',
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
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontSize: '11px', textTransform: 'uppercase' }}>
                <th style={{ padding: '12px 18px' }}>Breed & Species</th>
                <th style={{ padding: '12px 18px' }}>Census Count</th>
                <th style={{ padding: '12px 18px' }}>Population Share</th>
                <th style={{ padding: '12px 18px' }}>Avg Age</th>
                <th style={{ padding: '12px 18px' }}>Vaccine %</th>
                <th style={{ padding: '12px 18px' }}>Microchipped %</th>
                <th style={{ padding: '12px 18px' }}>Epidemiological Risk Tier</th>
              </tr>
            </thead>
            <tbody>
              {filteredBreeds.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '36px 16px', color: '#94a3b8' }}>
                    No breed records found
                  </td>
                </tr>
              ) : (
                filteredBreeds.map((b, idx) => (
                  <tr key={b.breed} style={{ borderBottom: idx !== filteredBreeds.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                    <td style={{ padding: '12px 18px' }}>
                      <div style={{ fontWeight: 700, color: '#0f172a' }}>{b.breed}</div>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>{b.species}</div>
                    </td>
                    <td style={{ padding: '12px 18px', fontWeight: 700, color: '#0f172a' }}>{b.count}</td>
                    <td style={{ padding: '12px 18px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '60px', height: '6px', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ width: `${b.pct * 3.5}%`, height: '100%', background: '#2563eb' }} />
                        </div>
                        <span style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>{b.pct}%</span>
                      </div>
                    </td>
                    <td style={{ padding: '12px 18px', color: '#475569' }}>{b.avgAge}</td>
                    <td style={{ padding: '12px 18px', fontWeight: 600, color: b.vaxRate.includes('N/A') ? '#64748b' : '#059669' }}>
                      {b.vaxRate}
                    </td>
                    <td style={{ padding: '12px 18px', fontWeight: 600, color: '#2563eb' }}>{b.microchipRate}</td>
                    <td style={{ padding: '12px 18px' }}>
                      <span style={{
                        padding: '4px 10px',
                        borderRadius: '999px',
                        fontSize: '11px',
                        fontWeight: 600,
                        background: b.riskTier.includes('High') ? '#fef2f2' : b.riskTier.includes('Mod') ? '#fffbeb' : '#ecfdf5',
                        color: b.riskTier.includes('High') ? '#dc2626' : b.riskTier.includes('Mod') ? '#d97706' : '#059669',
                        border: `1px solid ${b.riskTier.includes('High') ? '#fca5a5' : b.riskTier.includes('Mod') ? '#fde68a' : '#a7f3d0'}`
                      }}>
                        {b.riskTier}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Regional Hub Analysis */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <h3 style={{ margin: '0 0 4px', fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Regional Clinic Hub Distribution & Health Plan Penetration</h3>
        <p style={{ margin: '0 0 16px', fontSize: '12px', color: '#64748b' }}>Active cohort concentration, visit frequency, and annual wellness package adoption across cities</p>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontSize: '11px', textTransform: 'uppercase' }}>
                <th style={{ padding: '10px 16px' }}>Regional Clinic Hub</th>
                <th style={{ padding: '10px 16px' }}>Enrolled Cohort</th>
                <th style={{ padding: '10px 16px' }}>National Share</th>
                <th style={{ padding: '10px 16px' }}>Avg Visits / Pet / Yr</th>
                <th style={{ padding: '10px 16px' }}>Vaccine Adherence</th>
                <th style={{ padding: '10px 16px' }}>Zenve Care+ Plan Adoption</th>
              </tr>
            </thead>
            <tbody>
              {regionalHubs.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '36px 16px', color: '#94a3b8' }}>
                    No regional clinic hub records found
                  </td>
                </tr>
              ) : (
                regionalHubs.map((rh, idx) => (
                  <tr key={rh.city} style={{ borderBottom: idx !== regionalHubs.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                    <td style={{ padding: '10px 16px', fontWeight: 700, color: '#0f172a' }}>{rh.city}</td>
                    <td style={{ padding: '10px 16px', fontWeight: 700, color: '#2563eb' }}>{rh.pets}</td>
                    <td style={{ padding: '10px 16px', color: '#475569' }}>{rh.share}</td>
                    <td style={{ padding: '10px 16px', fontWeight: 600 }}>{rh.visitsPerPet}</td>
                    <td style={{ padding: '10px 16px', fontWeight: 700, color: '#059669' }}>{rh.vaxRate}</td>
                    <td style={{ padding: '10px 16px' }}>
                      <span style={{ padding: '3px 8px', borderRadius: '4px', background: '#eff6ff', color: '#1d4ed8', fontWeight: 700, fontSize: '11px' }}>
                        {rh.wellnessPlan}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
