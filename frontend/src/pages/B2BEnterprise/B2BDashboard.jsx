import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function B2BDashboard() {
  return (
    <DashboardLayout
      category="B2B / Enterprise"
      subcategory="Corporate Accounts & Contracts"
      title="B2B Enterprise & Wholesale Accounts"
      subtitle="Corporate kennels, breeder partnerships, institutional hospital contracts, and volume receivables"
      icon="🏢"
      badge="18 Corporate Accounts"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="B2B Revenue (MTD)" value="₹3.66 Lakh" delta="+14.2%" trend="up" subtext="7% total revenue" icon="🏢" />
        <KpiCard label="Contracted Accounts" value="18 Clients" delta="3 new" trend="up" subtext="Institutional clients" icon="📑" />
        <KpiCard label="Avg Contract Value" value="₹1.85 Lakh" delta="Annualized" trend="neutral" subtext="Institutional supply" icon="💼" />
        <KpiCard label="B2B Receivables" value="₹4.20 Lakh" delta="Under 30 days" trend="up" subtext="Corporate payment cycle" icon="💰" />
      </div>

      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 12px', fontSize: '15px', fontWeight: 700 }}>Major Enterprise Accounts</h3>
        <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>K-9 Police Training Kennels, Bangalore Canine Club, PetCare Hospital Network, Urban Mutts Daycare</p>
        <div style={{ height: '140px', background: 'rgba(0,0,0,0.15)', borderRadius: '8px', display: 'grid', placeItems: 'center', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>
          Institutional Contracts & Wholesale Order Pipeline
        </div>
      </div>
    </DashboardLayout>
  );
}
