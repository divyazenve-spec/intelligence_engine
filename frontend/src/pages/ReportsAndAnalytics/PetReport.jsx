import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function PetReport() {
  const [toast, setToast] = useState('');

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const breeds = [];

  const downloadCSV = () => {
    const rows = [
      ['Breed / Species', 'Registered Pets', 'Share (%)', 'Average Age', 'Vaccination Adherence', 'Top Clinical Conditions', 'Annual Vet Visits'],
      ...breeds.map(b => [b.breed, b.registered, b.share, b.avgAge, b.vaxRate, `"${b.commonIssues}"`, b.checkupsPerYr])
    ];
    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.join(',')).join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `zenve_pet_demographics_report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast('Pet Demographics Report CSV downloaded.');
  };

  return (
    <DashboardLayout
      category="Reports & Analytics"
      subcategory="Pet Reports"
      title="Pet Demographics & Health Profile Report"
      subtitle="Species distributions, breed prevalence, vaccination adherence, and chronic condition registries across 13,400+ active pet patient records"
      icon="🐾"
      badge=""
      actions={
        <button
          onClick={downloadCSV}
          style={{
            padding: '8px 14px',
            borderRadius: '8px',
            background: 'var(--primary, #3b82f6)',
            color: '#ffffff',
            border: 'none',
            fontWeight: 600,
            fontSize: '12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <span>📥</span> Export Pet Census CSV
        </button>
      }
    >
      {toast && (
        <div style={{
          padding: '10px 16px',
          background: 'rgba(59,130,246,0.15)',
          border: '1px solid #3b82f6',
          borderRadius: '8px',
          color: '#60a5fa',
          fontSize: '13px',
          fontWeight: 600
        }}>
          ⚡ {toast}
        </div>
      )}

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Patient Census" value="13,400 Pets" delta="68% Canine · 32% Feline" trend="neutral" subtext="In electronic health records" icon="🐕" />
        <KpiCard label="Vaccination Adherence" value="0.0%" delta="+2.4% vs 2025" trend="up" subtext="Automated reminder active" icon="💉" />
        <KpiCard label="Chronic Care Cohort" value="1,850 Pets" delta="Renal, Cardiac, Allergy" trend="neutral" subtext="Monthly Rx protocol" icon="🩺" />
        <KpiCard label="Preventive Care Visits" value="3.6 / Year" delta="Industry leading" trend="up" subtext="Includes teleconsults" icon="📋" />
      </div>

      {/* Table Section */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>Breed Epidemiology & Preventive Healthcare Matrix</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))', color: 'var(--muted-foreground, #94a3b8)' }}>
                <th style={{ padding: '10px 12px' }}>Breed / Species Classification</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Active Registry</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Share</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Avg Age</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Vaccination Rate</th>
                <th style={{ padding: '10px 12px' }}>Prevalent Health Conditions</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Annual Visits</th>
              </tr>
            </thead>
            <tbody>
              {breeds.map((b) => (
                <tr key={b.breed} style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.04))' }}>
                  <td style={{ padding: '12px', fontWeight: 600 }}>{b.breed}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{b.registered.toLocaleString('en-IN')}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{b.share}</td>
                  <td style={{ padding: '12px', textAlign: 'right', color: 'var(--muted-foreground, #94a3b8)' }}>{b.avgAge}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, color: '#34d399', fontFamily: '"IBM Plex Mono", monospace' }}>{b.vaxRate}</td>
                  <td style={{ padding: '12px', color: '#93c5fd', fontSize: '11px' }}>{b.commonIssues}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace' }}>{b.checkupsPerYr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
