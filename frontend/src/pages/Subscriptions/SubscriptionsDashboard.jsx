import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function SubscriptionsDashboard() {
  const [filter, setFilter] = useState('ALL');

  const plans = [];

  const filtered = filter === 'ALL' ? plans : plans.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()));

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Subscriptions"
      subcategory="Command Center"
      title="Recurring Subscriptions & Pet Wellness Memberships"
      subtitle="Monthly recurring revenue (MRR), automated doorstep auto-shipments, preventive wellness plans, and subscriber cohorts"
      icon="🔄"
      badge="₹0 MRR"
      actions={
        <button onClick={() => alert('Creating New Recurring Membership Plan...')} style={{ padding: '6px 14px', borderRadius: '8px', border: '1px solid #7c3aed', background: 'rgba(124,58,237,0.12)', color: '#6d28d9', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
          + Create Subscription Plan
        </button>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Monthly Recurring Revenue (MRR)" value="₹0" delta="+24.8% MoM" trend="up" subtext="Annualized ARR: ₹0" icon="🔄" />
        <KpiCard label="Active Paying Subscribers" value="824 Pets" delta="+68 net new this month" trend="up" subtext="Across 5 recurring plans" icon="👥" />
        <KpiCard label="Subscriber Renewal Rate" value="0.0%" delta="+1.2% improvement" trend="up" subtext="Auto-debit UPI / Cards" icon="🛡️" />
        <KpiCard label="Gross Monthly Churn" value="0.0%" delta="-0.3% reduction" trend="up" subtext="Industry benchmark 3.5%" icon="📉" />
        <KpiCard label="Average Revenue Per User (ARPU)" value="₹0 / mo" delta="+8.5% YoY" trend="up" subtext="Multi-tier add-ons" icon="💎" />
        <KpiCard label="Customer Lifetime Value (LTV)" value="₹0" delta="17.8 months avg tenure" trend="up" subtext="LTV/CAC ratio: 5.4x" icon="⭐" />
      </div>

      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>🔄 Recurring Membership Plans & MRR Performance</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Active subscriber counts, recurring revenue contribution, and plan benefits</p>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)' }}>
                <th style={{ padding: '10px 12px' }}>Plan Code</th>
                <th style={{ padding: '10px 12px' }}>Subscription Plan Name</th>
                <th style={{ padding: '10px 12px' }}>Monthly Price</th>
                <th style={{ padding: '10px 12px' }}>Active Pets</th>
                <th style={{ padding: '10px 12px' }}>Monthly Run Rate (MRR)</th>
                <th style={{ padding: '10px 12px' }}>Renewal Rate</th>
                <th style={{ padding: '10px 12px' }}>Monthly Churn</th>
                <th style={{ padding: '10px 12px' }}>Included Core Benefits</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                  <td style={{ padding: '12px', fontFamily: 'monospace', fontWeight: 600 }}>{p.id}</td>
                  <td style={{ padding: '12px', fontWeight: 600 }}>{p.name}</td>
                  <td style={{ padding: '12px', fontWeight: 600, color: '#4338ca' }}>{p.price}</td>
                  <td style={{ padding: '12px', fontWeight: 600 }}>{p.activeSubscribers} Pets</td>
                  <td style={{ padding: '12px', fontWeight: 600, color: '#059669' }}>{p.mrr}</td>
                  <td style={{ padding: '12px' }}>{p.renewalRate}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ padding: '3px 8px', borderRadius: '999px', fontSize: '10px', fontWeight: 600, background: 'rgba(16,185,129,0.12)', color: '#059669' }}>
                      {p.churn}
                    </span>
                  </td>
                  <td style={{ padding: '12px', color: '#64748b' }}>{p.benefits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
