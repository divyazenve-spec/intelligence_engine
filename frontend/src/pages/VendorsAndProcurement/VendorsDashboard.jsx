import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function VendorsDashboard() {
  return (
    <DashboardLayout
      category="Vendors & Procurement"
      subcategory="Vendor Performance & POs"
      title="Vendor Relations & Procurement"
      subtitle="Purchase order status, pharmaceutical supplier pricing, procurement savings, and fulfillment SLAs"
      icon="🤝"
      badge="24 Verified Suppliers"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Active Suppliers" value="24 Vendors" delta="100% compliant" trend="neutral" subtext="Direct pharma & food" icon="🏭" />
        <KpiCard label="Open Purchase Orders" value="₹18.4 Lakh" delta="8 active POs" trend="neutral" subtext="In transit to hub" icon="📑" />
        <KpiCard label="Procurement Savings" value="₹3.85 Lakh" delta="+12.4%" trend="up" subtext="Bulk discount savings" icon="💰" />
        <KpiCard label="Vendor On-Time SLA" value="96.8%" delta="+2.1%" trend="up" subtext="Delivery compliance" icon="⏱️" />
      </div>

      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 12px', fontSize: '15px', fontWeight: 700 }}>Primary Pharmaceutical & Diet Suppliers</h3>
        <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Royal Canin India, Zoetis Healthcare, MSD Animal Health, Boehringer Ingelheim</p>
        <div style={{ height: '140px', background: 'rgba(0,0,0,0.15)', borderRadius: '8px', display: 'grid', placeItems: 'center', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>
          Supplier Scorecard & Lead Times Matrix
        </div>
      </div>
    </DashboardLayout>
  );
}
