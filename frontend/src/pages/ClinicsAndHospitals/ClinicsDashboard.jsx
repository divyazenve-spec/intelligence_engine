import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function ClinicsDashboard() {
  return (
    <DashboardLayout
      category="Clinics & Hospitals"
      subcategory="Clinic Network & Facilities"
      title="Clinic Network & Partner Hospitals"
      subtitle="Facility utilization, surgical theatre bookings, and partner clinic commissions"
      icon="🏥"
      badge="14 Network Centers"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Network Facilities" value="14 Clinics" delta="6 Metros" trend="neutral" subtext="Own & Partnered" icon="🏥" />
        <KpiCard label="OT / Surgery Utilization" value="84.2%" delta="+6.1%" trend="up" subtext="Facility capacity" icon="⚡" />
        <KpiCard label="In-Clinic Revenue" value="₹34.8 Lakh" delta="+14.9%" trend="up" subtext="Monthly billings" icon="💰" />
        <KpiCard label="Partner Commission" value="12.5%" delta="Standard SLA" trend="neutral" subtext="Settled on time" icon="🤝" />
      </div>

      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 12px', fontSize: '15px', fontWeight: 700 }}>Network Facility Performance</h3>
        <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Indiranagar Super-Specialty, Koramangala Care Center, Bandra West Hospital, South Ex Clinic</p>
        <div style={{ height: '140px', background: 'rgba(0,0,0,0.15)', borderRadius: '8px', display: 'grid', placeItems: 'center', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>
          Clinic Bed Capacity & Surgical Schedule
        </div>
      </div>
    </DashboardLayout>
  );
}
