import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function DoctorsDashboard() {
  return (
    <DashboardLayout
      category="Doctors"
      subcategory="All Doctors & Performance"
      title="Veterinary Medical Board & Practitioners"
      subtitle="Physician consultation quotas, clinical patient volume, and commission settlements"
      icon="👨‍⚕️"
      badge="8 Active Specialists"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Active Specialists" value="8 Doctors" delta="Full capacity" trend="neutral" subtext="MCI registered" icon="👨‍⚕️" />
        <KpiCard label="Total Patient Volume" value="1,420 Pets" delta="+15.4%" trend="up" subtext="Consulted this month" icon="🐾" />
        <KpiCard label="Physician Billings" value="₹26.4 Lakh" delta="+18.2%" trend="up" subtext="Attributed revenue" icon="💰" />
        <KpiCard label="Commissions Paid" value="₹5.28 Lakh" delta="20% standard" trend="neutral" subtext="Settled bi-weekly" icon="📋" />
      </div>

      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 12px', fontSize: '15px', fontWeight: 700 }}>Physician Specialty Distribution</h3>
        <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Lead Physician (Dr. Divya), Cardiology (Dr. Arvind), Neurology (Dr. Meera), Pediatrics (Dr. Siddharth)</p>
        <div style={{ height: '140px', background: 'rgba(0,0,0,0.15)', borderRadius: '8px', display: 'grid', placeItems: 'center', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>
          Doctor Quota Attainment & Review Matrix
        </div>
      </div>
    </DashboardLayout>
  );
}
