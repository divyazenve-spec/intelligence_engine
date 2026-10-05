import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function ServiceRevenue() {
  const [selectedBranch, setSelectedBranch] = useState('ALL');

  const specialtyRevenue = [
    { specialty: 'Orthopedic & Soft Tissue Surgery', revenue: '₹4,85,000', cases: 38, aov: '₹12,763', share: '32.4%', growth: '+24.5% MoM', margin: '72.0%' },
    { specialty: 'Outpatient Clinical Consultations', revenue: '₹3,42,000', cases: 342, aov: '₹1,000', share: '22.8%', growth: '+14.2% MoM', margin: '84.0%' },
    { specialty: 'Laboratory Pathology & Diagnostics', revenue: '₹2,68,000', cases: 214, aov: '₹1,252', share: '17.9%', growth: '+18.9% MoM', margin: '68.5%' },
    { specialty: 'Cardiology & Diagnostic Ultrasound', revenue: '₹1,84,000', cases: 68, aov: '₹2,705', share: '12.3%', growth: '+21.0% MoM', margin: '74.2%' },
    { specialty: 'Dentistry & Ultrasonic Scaling', revenue: '₹1,22,000', cases: 46, aov: '₹2,652', share: '8.1%', growth: '+16.4% MoM', margin: '78.0%' },
    { specialty: 'Vaccinations & Wellness Immunizations', revenue: '₹98,000', cases: 142, aov: '₹690', share: '6.5%', growth: '+12.1% MoM', margin: '58.0%' }
  ];

  const branchRevenue = [
    { branch: 'Koramangala Pet Hospital (BLR)', revenue: '₹5,42,000', share: '36.2%', cases: 284, docCount: 6, csat: '4.95' },
    { branch: 'Bandra West Super-Clinic (BOM)', revenue: '₹3,84,000', share: '25.6%', cases: 198, docCount: 4, csat: '4.92' },
    { branch: 'Indiranagar Care Center (BLR)', revenue: '₹2,65,000', share: '17.7%', cases: 164, docCount: 3, csat: '4.88' },
    { branch: 'Gurugram Central Hospital (DEL)', revenue: '₹1,94,000', share: '12.9%', cases: 122, docCount: 3, csat: '4.86' },
    { branch: 'Whitefield Specialty OT (BLR)', revenue: '₹1,14,000', share: '7.6%', cases: 82, docCount: 2, csat: '4.91' }
  ];

  return (
    <DashboardLayout
      category="Veterinary Services"
      subcategory="Service Revenue"
      title="Veterinary Services Clinical Revenue & Billings"
      subtitle="Financial performance by clinical specialty, procedure revenue streams, multi-clinic billing analytics, and doctor collections"
      icon="💰"
      badge="₹14.99 Lakh MTD Revenue"
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
        <KpiCard label="Gross Clinical Revenue" value="₹14.99 Lakh" delta="+18.4% MoM" trend="up" subtext="18% share of Zenve Group" icon="🩺" />
        <KpiCard label="Avg Revenue per Case" value="₹1,763" delta="+8.2% vs Plan" trend="up" subtext="Blended consult + procedure" icon="💳" />
        <KpiCard label="Surgery Contribution" value="₹4.85 Lakh" delta="Highest grossing line" trend="up" subtext="32.4% of clinical billings" icon="✂️" />
        <KpiCard label="Collection Realization" value="99.4%" delta="Zero bad debts" trend="up" subtext="Instant UPI / Insurance card" icon="🎯" />
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
