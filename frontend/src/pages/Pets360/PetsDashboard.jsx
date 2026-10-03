import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function PetsDashboard() {
  return (
    <DashboardLayout
      category="Pets 360°"
      subcategory="Pet Profiles & Health Records"
      title="Pet Health Intelligence 360°"
      subtitle="Complete pet health profiles, digital vaccination passports, chronic care tracking, and breed analytics"
      icon="🐾"
      badge="1,240 Registered Pets"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Registered Pets" value="1,240 Pets" delta="+24.1%" trend="up" subtext="Canine & Feline" icon="🐾" />
        <KpiCard label="Canine Population" value="78.4%" delta="972 Dogs" trend="neutral" subtext="Dominant demographic" icon="🐕" />
        <KpiCard label="Feline Population" value="21.6%" delta="268 Cats" trend="neutral" subtext="Growing rapidly" icon="🐈" />
        <KpiCard label="Up-to-Date Vaccines" value="92.4%" delta="Compliant" trend="up" subtext="Immunization rate" icon="💉" />
      </div>

      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 12px', fontSize: '15px', fontWeight: 700 }}>Breed & Health Risk Distribution</h3>
        <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Golden Retrievers (28%), Labradors (22%), Beagles (14%), Indie/Mixed (18%), Persian Cats (12%)</p>
        <div style={{ height: '140px', background: 'rgba(0,0,0,0.15)', borderRadius: '8px', display: 'grid', placeItems: 'center', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>
          Pet Chronic Health Risk & Vaccine Reminders Stream
        </div>
      </div>
    </DashboardLayout>
  );
}
