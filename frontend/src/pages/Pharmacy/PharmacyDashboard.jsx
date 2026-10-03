import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function PharmacyDashboard() {
  return (
    <DashboardLayout
      category="Pharmacy"
      subcategory="Pharmacy Sales & Prescriptions"
      title="Veterinary Pharmacy Operations"
      subtitle="Prescription verification, batch dispensary, expiry tracking, and pharmaceutical margins"
      icon="💊"
      badge="Schedule H Regulated"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Pharmacy Revenue" value="₹12.58 Lakh" delta="+18.4%" trend="up" subtext="24% total revenue" icon="💊" />
        <KpiCard label="Prescriptions Filled" value="1,840" delta="100% verified" trend="up" subtext="Doctor signed" icon="📋" />
        <KpiCard label="Avg Dispensary Ticket" value="₹1,240" delta="+6.2%" trend="up" subtext="Per prescription" icon="💰" />
        <KpiCard label="Near-Expiry Alerts" value="4 Batches" delta="Under 60 days" trend="down" subtext="Auto-discounting" icon="⏳" />
      </div>

      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 12px', fontSize: '15px', fontWeight: 700 }}>Pharmaceutical Categories & Margins</h3>
        <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Antiparasitics (42% margin), Antibiotics (38% margin), Chronic Wellness (48% margin)</p>
        <div style={{ height: '140px', background: 'rgba(0,0,0,0.15)', borderRadius: '8px', display: 'grid', placeItems: 'center', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>
          Dispensary Volume & Expiry Timeline Matrix
        </div>
      </div>
    </DashboardLayout>
  );
}
