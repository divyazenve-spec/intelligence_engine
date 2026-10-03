import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function FinanceDashboard() {
  return (
    <DashboardLayout
      category="Finance & Accounting"
      subcategory="Profit & Loss and Cash Flow"
      title="Financial Intelligence & P&L"
      subtitle="Gross profit margins, EBITDA velocity, accounts receivable/payable aging, and tax compliance"
      icon="💰"
      badge="EBITDA: 16.9%"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Gross Revenue (MTD)" value="₹54.8 Lakh" delta="+18.2%" trend="up" subtext="Pre-discounts" icon="💰" />
        <KpiCard label="Gross Profit" value="₹19.25 Lakh" delta="37.3% margin" trend="up" subtext="Net of COGS" icon="📈" />
        <KpiCard label="EBITDA (MTD)" value="₹8.76 Lakh" delta="16.9% margin" trend="up" subtext="Operating profit" icon="⚡" />
        <KpiCard label="Net Profit (MTD)" value="₹7.56 Lakh" delta="14.6% margin" trend="up" subtext="Post tax & interest" icon="🏆" />
      </div>

      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 12px', fontSize: '15px', fontWeight: 700 }}>Accounts Aging & Working Capital</h3>
        <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Receivables: ₹18.4L (0-30d: ₹6.8L, 31-60d: ₹5.6L) · Payables: ₹12.75L (0-30d: ₹4.8L)</p>
        <div style={{ height: '140px', background: 'rgba(0,0,0,0.15)', borderRadius: '8px', display: 'grid', placeItems: 'center', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>
          Working Capital Aging & Cash Flow Projections
        </div>
      </div>
    </DashboardLayout>
  );
}
