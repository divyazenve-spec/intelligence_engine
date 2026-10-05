import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function SubscriptionRevenue() {
  const plans = [
    { name: 'Monthly Nutrition Auto-Ship Program', share: '35.1%', mrr: '₹4,04,700', arr: '₹48,56,400', arpu: '₹2,850', growth: '+28.4% YoY', margin: '42.0%' },
    { name: 'Puppy & Kitten Preventive Care Suite', share: '24.0%', mrr: '₹2,75,816', arr: '₹33,09,792', arpu: '₹1,499', growth: '+44.0% YoY', margin: '68.5%' },
    { name: 'Senior Pet Geriatric Vitality Membership', share: '15.7%', mrr: '₹1,81,300', arr: '₹21,75,600', arpu: '₹1,850', growth: '+31.2% YoY', margin: '58.0%' },
    { name: 'Feline Holistic Spa & Wellness Plan', share: '13.0%', mrr: '₹1,50,000', arr: '₹18,00,000', arpu: '₹1,250', growth: '+22.0% YoY', margin: '62.0%' },
    { name: '24x7 Unlimited Emergency Telehealth Care', share: '12.2%', mrr: '₹1,39,720', arr: '₹16,76,640', arpu: '₹499', growth: '+56.5% YoY', margin: '84.0%' }
  ];

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Subscriptions"
      subcategory="Subscription Revenue"
      title="Recurring Revenue (MRR / ARR) Trajectory"
      subtitle="Monthly recurring revenue breakdown, annualized contract run rates, expansion revenue, and gross margins"
      icon="💵"
      badge="₹1.38 Cr ARR"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Annual Recurring Revenue (ARR)" value="₹1.38 Crore" delta="+36.2% YoY" trend="up" subtext="Current MRR x 12" icon="💵" />
        <KpiCard label="Monthly Recurring Revenue (MRR)" value="₹11.51 Lakh" delta="+24.8% MoM" trend="up" subtext="100% contracted debits" icon="🔄" />
        <KpiCard label="Subscription Gross Margin" value="58.2%" delta="+4.1% YoY" trend="up" subtext="High digital & telehealth mix" icon="📈" />
        <KpiCard label="Expansion / Upsell MRR" value="₹1.14 Lakh" delta="+18% MoM" trend="up" subtext="Upgrades to nutrition tiers" icon="🚀" />
      </div>

      <div style={card}>
        <h3 style={{ margin: '0 0 12px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>Recurring Revenue Contribution by Subscription Tier</h3>
        <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Revenue realization, annualized velocity, ARPU, and plan contribution margins</p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)' }}>
                <th style={{ padding: '10px 12px' }}>Plan Architecture</th>
                <th style={{ padding: '10px 12px' }}>MRR Share</th>
                <th style={{ padding: '10px 12px' }}>Current MRR</th>
                <th style={{ padding: '10px 12px' }}>Annualized ARR</th>
                <th style={{ padding: '10px 12px' }}>ARPU</th>
                <th style={{ padding: '10px 12px' }}>Gross Margin</th>
                <th style={{ padding: '10px 12px' }}>YoY Growth</th>
              </tr>
            </thead>
            <tbody>
              {plans.map(p => (
                <tr key={p.name} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                  <td style={{ padding: '12px', fontWeight: 600 }}>{p.name}</td>
                  <td style={{ padding: '12px' }}>{p.share}</td>
                  <td style={{ padding: '12px', fontWeight: 600, color: '#059669' }}>{p.mrr}</td>
                  <td style={{ padding: '12px', fontWeight: 600, color: '#4338ca' }}>{p.arr}</td>
                  <td style={{ padding: '12px' }}>{p.arpu}</td>
                  <td style={{ padding: '12px', fontWeight: 600, color: '#0891b2' }}>{p.margin}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ padding: '3px 8px', borderRadius: '999px', fontSize: '10px', fontWeight: 600, background: 'rgba(16,185,129,0.12)', color: '#059669' }}>
                      {p.growth}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
