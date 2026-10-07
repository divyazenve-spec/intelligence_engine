import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function Diagnostics() {
  const [modalityFilter, setModalityFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const labOrders = [];

  const filtered = labOrders.filter(l => {
    const matchesFilter = modalityFilter === 'ALL' || l.modality === modalityFilter || l.status === modalityFilter;
    const matchesSearch = l.pet.toLowerCase().includes(search.toLowerCase()) ||
      l.parent.toLowerCase().includes(search.toLowerCase()) ||
      l.testName.toLowerCase().includes(search.toLowerCase()) ||
      l.flag.toLowerCase().includes(search.toLowerCase()) ||
      l.id.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <DashboardLayout
      category="Veterinary Services"
      subcategory="Diagnostics"
      title="Veterinary Pathology, Clinical Lab & Advanced Imaging"
      subtitle="In-house automated hematology, dry chemistry, digital radiography, ultrasonography, and rapid biomarker assays"
      icon="🔬"
      badge=""
      actions={
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {['ALL', 'Biochemistry', 'Hematology', 'Digital X-Ray', 'Ultrasound', 'Result Ready', 'Report Signed'].map(m => (
            <button
              key={m}
              onClick={() => setModalityFilter(m)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                border: modalityFilter === m ? '1px solid #2563eb' : '1px solid #e2e8f0',
                background: modalityFilter === m ? '#eff6ff' : '#ffffff',
                color: modalityFilter === m ? '#2563eb' : '#64748b'
              }}
            >
              {m}
            </button>
          ))}
        </div>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Lab Tests Processed" value="142 Tests" delta="+18.9% vs yday" trend="up" subtext="Across in-house lab analyzers" icon="🔬" />
        <KpiCard label="Avg Turnaround Time" value="0" delta="Target < 45m" trend="up" subtext="Sample collect to validated report" icon="⏱️" />
        <KpiCard label="Critical Value Alerts" value="6 Alerts" delta="Immediate vet notified" trend="neutral" subtext="Automated SMS & telemetry push" icon="⚠️" />
        <KpiCard label="Imaging Room Utilization" value="0.0%" delta="Digital DR & Doppler" trend="up" subtext="42 scans completed today" icon="🩻" />
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
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Real-Time Diagnostic Work Orders & Pathologist Reports</h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>Live diagnostic tracking pipeline from specimen intake to digital imaging PACS and final physician sign-off</p>
          </div>
          <div>
            <input
              type="text"
              placeholder="Search diagnostic order, test, pet..."
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
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Order ID</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Patient & Client</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Investigation / Panel</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Modality</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Referring Clinician</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Turnaround</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Key Finding / Flag</th>
                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Report Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(l => (
                <tr key={l.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: '#2563eb', fontFamily: '"IBM Plex Mono", monospace' }}>{l.id}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{l.pet}</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>{l.parent}</div>
                  </td>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>{l.testName}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: l.modality === 'Biochemistry' ? '#f0fdf4' : l.modality === 'Digital X-Ray' ? '#eff6ff' : '#fdf4ff',
                      color: l.modality === 'Biochemistry' ? '#15803d' : l.modality === 'Digital X-Ray' ? '#1d4ed8' : '#a21caf'
                    }}>
                      {l.modality}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', color: '#334155', fontWeight: 500 }}>{l.orderedBy}</td>
                  <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 600, color: '#475569' }}>{l.turnaroundTime}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: l.flag.includes('High') || l.flag.includes('Tear') || l.flag.includes('Leukocytosis') ? '#fee2e2' : '#f1f5f9',
                      color: l.flag.includes('High') || l.flag.includes('Tear') || l.flag.includes('Leukocytosis') ? '#b91c1c' : '#334155'
                    }}>
                      {l.flag}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '999px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: l.status === 'Report Signed' ? '#dcfce7' : l.status === 'Result Ready' ? '#dbeafe' : '#fef9c3',
                      color: l.status === 'Report Signed' ? '#15803d' : l.status === 'Result Ready' ? '#1e40af' : '#854d0e'
                    }}>
                      {l.status}
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
