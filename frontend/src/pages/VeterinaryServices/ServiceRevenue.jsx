import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function ServiceRevenue() {
  const [selectedBranch, setSelectedBranch] = useState('ALL');

  const specialtyRevenue = [];

  const branchRevenue = [];

  return (
    <DashboardLayout
      category="Veterinary Services"
      subcategory="Service Revenue"
      title="Veterinary Services Clinical Revenue & Billings"
      subtitle="Financial performance by clinical specialty, procedure revenue streams, multi-clinic billing analytics, and doctor collections"
      icon="💰"
      badge="₹0 MTD Revenue"
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          {['ALL', 'Bangalore Hubs', 'Mumbai Hubs', 'Delhi NCR'].map(b => (
            <button
              key={b}
              onClick={() => setSelectedBranch(b)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                border: selectedBranch === b ? '1px solid #2563eb' : '1px solid #e2e8f0',
                background: selectedBranch === b ? '#eff6ff' : '#ffffff',
                color: selectedBranch === b ? '#2563eb' : '#64748b'
              }}
            >
              {b}
            </button>
          ))}
        </div>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Gross Clinical Revenue" value="₹0" delta="0.0%" trend="neutral" subtext="0% of total revenue" icon="🩺" />
        <KpiCard label="Avg Revenue per Case" value="₹0" delta="0.0%" trend="neutral" subtext="Blended consult + procedure" icon="💳" />
        <KpiCard label="Surgery Contribution" value="₹0" delta="--" trend="neutral" subtext="0.0% of billings" icon="✂️" />
        <KpiCard label="Collection Realization" value="0.0%" delta="--" trend="neutral" subtext="Instant UPI / Insurance card" icon="🎯" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '16px' }}>
        {/* Specialty Breakdown Card */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
        }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0' }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Clinical Revenue by Medical Specialty</h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>Billings, procedure counts, and average order values per veterinary discipline</p>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr style={{ background: '#f8fafc', color: '#64748b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <th style={{ padding: '10px 14px', textAlign: 'left' }}>Specialty</th>
                  <th style={{ padding: '10px 14px', textAlign: 'right' }}>Revenue</th>
                  <th style={{ padding: '10px 14px', textAlign: 'right' }}>Cases</th>
                  <th style={{ padding: '10px 14px', textAlign: 'right' }}>AOV</th>
                  <th style={{ padding: '10px 14px', textAlign: 'right' }}>Share</th>
                </tr>
              </thead>
              <tbody>
                {specialtyRevenue.map(s => (
                  <tr key={s.specialty} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 600, color: '#0f172a' }}>{s.specialty}</td>
                    <td style={{ padding: '10px 14px', textAlign: 'right', fontWeight: 700, color: '#16a34a', fontFamily: '"IBM Plex Mono", monospace' }}>{s.revenue}</td>
                    <td style={{ padding: '10px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{s.cases}</td>
                    <td style={{ padding: '10px 14px', textAlign: 'right', color: '#64748b', fontFamily: '"IBM Plex Mono", monospace' }}>{s.aov}</td>
                    <td style={{ padding: '10px 14px', textAlign: 'right', fontWeight: 600, color: '#2563eb' }}>{s.share}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Clinic Revenue Card */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
        }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0' }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Branch Hospital Revenue Contributions</h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>Monthly revenue performance across flagship veterinary hospitals</p>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr style={{ background: '#f8fafc', color: '#64748b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <th style={{ padding: '10px 14px', textAlign: 'left' }}>Hospital Branch</th>
                  <th style={{ padding: '10px 14px', textAlign: 'right' }}>Revenue</th>
                  <th style={{ padding: '10px 14px', textAlign: 'right' }}>Share</th>
                  <th style={{ padding: '10px 14px', textAlign: 'right' }}>Doctors</th>
                  <th style={{ padding: '10px 14px', textAlign: 'center' }}>CSAT</th>
                </tr>
              </thead>
              <tbody>
                {branchRevenue.map(b => (
                  <tr key={b.branch} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 600, color: '#0f172a' }}>{b.branch}</td>
                    <td style={{ padding: '10px 14px', textAlign: 'right', fontWeight: 700, color: '#0f172a', fontFamily: '"IBM Plex Mono", monospace' }}>{b.revenue}</td>
                    <td style={{ padding: '10px 14px', textAlign: 'right', color: '#2563eb', fontWeight: 600 }}>{b.share}</td>
                    <td style={{ padding: '10px 14px', textAlign: 'right', color: '#64748b' }}>{b.docCount} Vets</td>
                    <td style={{ padding: '10px 14px', textAlign: 'center' }}>
                      <span style={{ padding: '2px 6px', borderRadius: '4px', fontSize: '11px', fontWeight: 700, background: '#fef3c7', color: '#b45309' }}>
                        ⭐ {b.csat}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
