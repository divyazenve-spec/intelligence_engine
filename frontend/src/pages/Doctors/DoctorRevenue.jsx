import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function DoctorRevenue() {
  const revStreams = [];

  const cardStyle = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Doctors"
      subcategory="Financial Attribution"
      title="Doctor Revenue & Financial Attribution"
      subtitle="Comprehensive revenue breakdowns by consultation fees, clinical procedures, surgical billings, and pharmacy write-ups"
      icon="💰"
      badge="₹0 Total Revenue"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Doctor Billed Revenue" value="₹0" delta="0.0%" trend="neutral" subtext="No doctor billing" icon="💰" />
        <KpiCard label="Procedure Billings" value="₹0" delta="0.0%" trend="neutral" subtext="No procedure billing" icon="🩺" />
        <KpiCard label="Consultation Fees" value="₹0" delta="0.0%" trend="neutral" subtext="No consultation fees" icon="📋" />
        <KpiCard label="Pharmacy & Rx Uplift" value="₹0" delta="0.0%" trend="neutral" subtext="No prescription revenue" icon="💊" />
      </div>

      <div style={cardStyle}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>💰 Clinician Revenue Matrix & Departmental Contribution</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border, #e2e8f0)', textAlign: 'left', color: 'var(--muted-foreground, #475569)' }}>
                <th style={{ padding: '10px' }}>Doctor Name</th>
                <th style={{ padding: '10px' }}>Department</th>
                <th style={{ padding: '10px' }}>Consult Fees</th>
                <th style={{ padding: '10px' }}>Procedures & Surgery</th>
                <th style={{ padding: '10px' }}>Rx Medicines</th>
                <th style={{ padding: '10px' }}>Total Attributed</th>
                <th style={{ padding: '10px' }}>Operating Margin</th>
                <th style={{ padding: '10px' }}>Revenue Share</th>
              </tr>
            </thead>
            <tbody>
              {revStreams.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '32px', color: 'var(--muted-foreground, #64748b)' }}>
                    No revenue records found
                  </td>
                </tr>
              ) : (
                revStreams.map((r, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                    <td style={{ padding: '10px', fontWeight: 600 }}>{r.doctor}</td>
                    <td style={{ padding: '10px', color: '#64748b' }}>{r.spec}</td>
                    <td style={{ padding: '10px' }}>{r.consultsRev}</td>
                    <td style={{ padding: '10px' }}>{r.procRev}</td>
                    <td style={{ padding: '10px' }}>{r.medsRev}</td>
                    <td style={{ padding: '10px', fontWeight: 700, color: '#059669' }}>{r.totalRev}</td>
                    <td style={{ padding: '10px', fontWeight: 600 }}>{r.margin}</td>
                    <td style={{ padding: '10px', color: '#4f46e5', fontWeight: 600 }}>{r.share}</td>
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
