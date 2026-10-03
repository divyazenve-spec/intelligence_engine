import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function CustomerDashboard() {
  return (
    <DashboardLayout
      category="Customers 360°"
      subcategory="Customer Lifetime Value & Churn"
      title="Customer Intelligence 360°"
      subtitle="Pet parent lifetime value, retention cohorts, order frequency, and support complaints"
      icon="👥"
      badge="894 Active Accounts"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Customer Base" value="894 Parents" delta="+18.4%" trend="up" subtext="Registered accounts" icon="👥" />
        <KpiCard label="Average CLV" value="₹14,280" delta="+12.1%" trend="up" subtext="Per pet parent" icon="💎" />
        <KpiCard label="Monthly Churn Rate" value="1.8%" delta="-0.4%" trend="up" subtext="Low attrition" icon="🛡️" />
        <KpiCard label="Net Promoter Score" value="78 NPS" delta="World Class" trend="up" subtext="Verified pet parents" icon="⭐" />
      </div>

      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 12px', fontSize: '15px', fontWeight: 700 }}>Parent Retention Cohort Matrix</h3>
        <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Month 1 (100%), Month 3 (78%), Month 6 (64%), Month 12 (52%) recurring engagement</p>
        <div style={{ height: '140px', background: 'rgba(0,0,0,0.15)', borderRadius: '8px', display: 'grid', placeItems: 'center', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>
          Customer Retention Cohorts & Sentiment Index
        </div>
      </div>
    </DashboardLayout>
  );
}
