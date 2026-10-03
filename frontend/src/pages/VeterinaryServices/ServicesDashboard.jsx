import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function ServicesDashboard() {
  return (
    <DashboardLayout
      category="Veterinary Services"
      subcategory="Consultations & Appointments"
      title="Clinical Consultations & Diagnostics"
      subtitle="In-clinic visits, video telehealth appointments, surgical procedures, and vaccinations"
      icon="🩺"
      badge="98.2% Satisfaction"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Services Revenue" value="₹9.43 Lakh" delta="+16.8%" trend="up" subtext="18% total revenue" icon="🩺" />
        <KpiCard label="Completed Consults" value="1,420" delta="Zero wait times" trend="up" subtext="In-clinic & Video" icon="📅" />
        <KpiCard label="Vaccinations Administered" value="784" delta="+22.1%" trend="up" subtext="Immunization drive" icon="💉" />
        <KpiCard label="Avg Consultation Margin" value="64.2%" delta="+3.4%" trend="up" subtext="High margin category" icon="💰" />
      </div>

      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 12px', fontSize: '15px', fontWeight: 700 }}>Service Breakdown & Procedure Quotas</h3>
        <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>General Medicine (42%), Dermatology (18%), Cardiology (14%), Orthopedics (12%), Diagnostics (14%)</p>
        <div style={{ height: '140px', background: 'rgba(0,0,0,0.15)', borderRadius: '8px', display: 'grid', placeItems: 'center', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>
          Clinical Appointments & Procedure Schedule
        </div>
      </div>
    </DashboardLayout>
  );
}
