import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function ClinicPerformance() {
  const [selectedSort, setSelectedSort] = useState('csat');

  const performanceMetrics = [];

  const sortedData = [...performanceMetrics].sort((a, b) => {
    if (selectedSort === 'csat') return b.csat - a.csat;
    if (selectedSort === 'opd') return b.opd - a.opd;
    if (selectedSort === 'surgeries') return b.surgeries - a.surgeries;
    return 0;
  });

  return (
    <DashboardLayout
      category="Clinics & Hospitals"
      subcategory="Clinic Performance"
      title="Clinical Performance & Operational Efficiency"
      subtitle="OPD patient throughput, wait time benchmarking, surgical outcomes, bed turnover, and pet parent satisfaction (CSAT)"
      icon="📈"
      badge=""
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => alert('Exporting full Clinical Audit & Quality Assurance dossier (NABH/VCI standards)...')}
            style={{
              padding: '7px 14px',
              borderRadius: '8px',
              background: '#3b82f6',
              color: '#fff',
              border: 'none',
              fontWeight: 600,
              fontSize: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>📄</span> Export Clinical QA Dossier
          </button>
        </div>
      }
    >
      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Average OPD Wait Time" value="13.5 Mins" delta="-4.2m vs SLA" trend="up" subtext="From check-in to consultation" icon="⏱️" />
        <KpiCard label="Surgical Success Rate" value="0.0%" delta="+0.4% YoY" trend="up" subtext="Zero intra-op fatalities" icon="🔪" />
        <KpiCard label="Patient CSAT Score" value="4.92 / 5.0" delta="85 Net Promoter Score" trend="up" subtext="Based on 4,210 verified reviews" icon="⭐" />
        <KpiCard label="30-Day Readmission Rate" value="0.0%" delta="-0.3% vs target" trend="up" subtext="Post-surgical recovery" icon="🔄" />
        <KpiCard label="Diagnostic Turnaround" value="38 Mins" delta="In-house lab SLA" trend="up" subtext="Blood & imaging reports" icon="🔬" />
        <KpiCard label="Daily OPD Throughput" value="482 Pets" delta="+18.4% YoY" trend="up" subtext="Across 14 network facilities" icon="🐾" />
      </div>

      {/* Benchmarking Table */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Facility Efficiency & Clinical Quality Scorecard</h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#94a3b8' }}>Comprehensive operational benchmarking across all network locations</p>
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <span style={{ fontSize: '12px', color: '#94a3b8', alignSelf: 'center', marginRight: '4px' }}>Sort by:</span>
            {[
              { id: 'csat', label: 'CSAT Rating' },
              { id: 'opd', label: 'OPD Volume' },
              { id: 'surgeries', label: 'Surgeries' }
            ].map(s => (
              <button
                key={s.id}
                onClick={() => setSelectedSort(s.id)}
                style={{
                  padding: '5px 10px',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: selectedSort === s.id ? 'rgba(59,130,246,0.25)' : 'rgba(255,255,255,0.05)',
                  color: selectedSort === s.id ? '#60a5fa' : '#94a3b8'
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: '#94a3b8' }}>
                <th style={{ padding: '8px 12px' }}>Facility</th>
                <th style={{ padding: '8px 12px' }}>City</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>OPD (Mo)</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Surgeries</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Avg Wait Time</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Bed Occupancy</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Readmission</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>CSAT Rating</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Rev / Doctor</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((row, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '10px 12px', fontWeight: 600, color: '#fff' }}>{row.name}</td>
                  <td style={{ padding: '10px 12px', color: '#94a3b8' }}>{row.city}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 600 }}>{row.opd}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#38bdf8' }}>{row.surgeries}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#10b981' }}>{row.waitTime}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{row.bedOcc}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#34d399' }}>{row.readmission}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#fbbf24' }}>
                    ⭐ {row.csat}
                  </td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#10b981' }}>
                    {row.revPerDoc}
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
