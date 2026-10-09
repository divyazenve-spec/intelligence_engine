import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function DoctorReport() {
  const [toast, setToast] = useState('');

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const doctors = [];

  const inr = (n) => '₹' + Number(n).toLocaleString('en-IN');

  const downloadCSV = () => {
    const rows = [
      ['Doctor Name', 'Specialization', 'Base Facility', 'Consultations', 'Surgeries', 'Patient Rating', 'Revenue Generated (INR)', 'Commission (INR)', 'Rx Adherence'],
      ...doctors.map(d => [d.name, d.spec, d.hospital, d.consults, d.surgeries, d.rating, d.revenue, d.commission, d.rxAdherence])
    ];
    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.join(',')).join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `zenve_doctor_performance_ledger.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast('Doctor Performance & Commission CSV downloaded.');
  };

  return (
    <DashboardLayout
      category="Reports & Analytics"
      subcategory="Doctor Reports"
      title="Veterinary Doctor Clinical & Revenue Performance Report"
      subtitle="Comprehensive audit of patient consultations, surgical case volume, patient satisfaction ratings, gross revenue generated, and commission ledgers"
      icon="👨‍⚕️"
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
          <span>📥</span> Export Doctor Ledger CSV
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
        <KpiCard label="Total Doctor Consultations" value="0 Consults" delta="0.0%" trend="neutral" subtext="Recorded consultations" icon="🩺" />
        <KpiCard label="Surgical Procedures" value="0 Surgeries" delta="0.0%" trend="neutral" subtext="Specialty OR" icon="🏥" />
        <KpiCard label="Average Doctor Rating" value="0.0 / 5.0" delta="0.0%" trend="neutral" subtext="Verified ratings" icon="⭐" />
        <KpiCard label="Doctor Generated Revenue" value="₹0" delta="0.0%" trend="neutral" subtext="Clinical revenue" icon="💼" />
      </div>

      {/* Table Section */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>Veterinarian Clinical Caseload & Commission Payout Registry</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))', color: 'var(--muted-foreground, #94a3b8)' }}>
                <th style={{ padding: '10px 12px' }}>Doctor Name & Specialty</th>
                <th style={{ padding: '10px 12px' }}>Base Facility</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Consults</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Surgeries</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Patient Rating</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Total Revenue</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Commission</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Rx Quality</th>
              </tr>
            </thead>
            <tbody>
              {doctors.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ padding: '24px', textAlign: 'center', color: 'var(--muted-foreground, #94a3b8)' }}>
                    No doctor performance records found
                  </td>
                </tr>
              ) : (
                doctors.map((d) => (
                  <tr key={d.name} style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.04))' }}>
                    <td style={{ padding: '12px' }}>
                      <div style={{ fontWeight: 700, color: 'var(--foreground, #f8fafc)' }}>{d.name}</div>
                      <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)' }}>{d.spec}</div>
                    </td>
                    <td style={{ padding: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>{d.hospital}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace' }}>{d.consults}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace' }}>{d.surgeries}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, color: '#fbbf24', fontFamily: '"IBM Plex Mono", monospace' }}>★ {d.rating}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, color: '#34d399', fontFamily: '"IBM Plex Mono", monospace' }}>{inr(d.revenue)}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontWeight: 600, color: '#60a5fa', fontFamily: '"IBM Plex Mono", monospace' }}>{inr(d.commission)}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace' }}>{d.rxAdherence}</td>
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
