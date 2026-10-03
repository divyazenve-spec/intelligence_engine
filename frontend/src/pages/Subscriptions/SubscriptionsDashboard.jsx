import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function SubscriptionsDashboard() {
  return (
    <DashboardLayout
      category="Subscriptions"
      subcategory="Active Plans & Recurring Revenue"
      title="Recurring Subscriptions & Wellness Plans"
      subtitle="Monthly nutrition deliveries, recurring preventive wellness memberships, and MRR retention"
      icon="🔄"
      badge="MRR: ₹2.10 Lakh"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Monthly Recurring Revenue" value="₹2,09,600" delta="+22.4%" trend="up" subtext="Automated billing" icon="🔄" />
        <KpiCard label="Active Subscribers" value="412 Plans" delta="+38 net new" trend="up" subtext="Pet wellness plans" icon="👥" />
        <KpiCard label="Renewal Rate" value="94.8%" delta="High retention" trend="up" subtext="Low cancellation" icon="🛡️" />
        <KpiCard label="Subscriber Churn" value="1.2%" delta="-0.3%" trend="up" subtext="Monthly drop-off" icon="📉" />
      </div>

      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 12px', fontSize: '15px', fontWeight: 700 }}>Subscription Plan Tier Distribution</h3>
        <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Complete Preventive Care (42%), Monthly Nutrition Auto-Ship (36%), Telehealth Unlimited (22%)</p>
        <div style={{ height: '140px', background: 'rgba(0,0,0,0.15)', borderRadius: '8px', display: 'grid', placeItems: 'center', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>
          Recurring Membership Growth & Churn Cohorts
        </div>
      </div>
    </DashboardLayout>
  );
}
