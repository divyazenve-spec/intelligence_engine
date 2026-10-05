import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function MarketingSpend() {
  const lineItems = [
    { category: 'Paid Performance Media (Meta & Google)', budget: '₹5,00,000', actual: '₹4,72,000', variance: '-5.6%', status: 'Under Budget', share: '62.4%' },
    { category: 'Influencer & Creator Endorsements', budget: '₹1,20,000', actual: '₹1,15,000', variance: '-4.2%', status: 'Under Budget', share: '15.2%' },
    { category: 'Creative Production & Video Shooting', budget: '₹80,000', actual: '₹74,000', variance: '-7.5%', status: 'Under Budget', share: '9.8%' },
    { category: 'Pet Clinic Offline Co-op Signage', budget: '₹60,000', actual: '₹58,000', variance: '-3.3%', status: 'Under Budget', share: '7.7%' },
    { category: 'Marketing Automation & Tool Stack', budget: '₹40,000', actual: '₹37,500', variance: '-6.2%', status: 'Under Budget', share: '4.9%' }
  ];

  return (
    <DashboardLayout
      category="Marketing"
      subcategory="Marketing Spend"
      title="Marketing Budget Allocation & Spend Burn"
      subtitle="Monthly OPEX allocation, vendor disbursements, channel spend variance, and budget compliance"
      icon="💰"
      badge="₹7.56L Total Spend MTD"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Allocated Marketing Budget" value="₹8,00,000" delta="Monthly approved" trend="neutral" subtext="Approved by Finance" icon="📋" />
        <KpiCard label="Actual Marketing Burn" value="₹7,56,500" delta="-5.4% under budget" trend="up" subtext="Favorable variance: ₹43.5K" icon="💳" />
        <KpiCard label="Paid Media Share" value="62.4%" delta="Meta, Google, YouTube" trend="neutral" subtext="Optimal target: 60-65%" icon="📊" />
        <KpiCard label="Marketing % of GMV" value="4.8%" delta="-0.6% vs target" trend="up" subtext="Very efficient cost structure" icon="📈" />
      </div>

      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Expense Line Items & Budget Adherence</h3>
          <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>Departmental OPEX tracking across performance advertising, content, and agency fees</p>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <th style={{ padding: '12px 16px' }}>Spend Category</th>
                <th style={{ padding: '12px 16px' }}>Monthly Budget</th>
                <th style={{ padding: '12px 16px' }}>Actual Spend</th>
                <th style={{ padding: '12px 16px' }}>Variance</th>
                <th style={{ padding: '12px 16px' }}>Status</th>
                <th style={{ padding: '12px 16px' }}>Share of Budget</th>
              </tr>
            </thead>
            <tbody>
              {lineItems.map(item => (
                <tr key={item.category} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 600, color: '#0f172a' }}>{item.category}</td>
                  <td style={{ padding: '14px 16px', fontFamily: '"IBM Plex Mono", monospace' }}>{item.budget}</td>
                  <td style={{ padding: '14px 16px', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace', color: '#0f172a' }}>{item.actual}</td>
                  <td style={{ padding: '14px 16px', color: '#16a34a', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace' }}>{item.variance}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ padding: '3px 8px', borderRadius: '4px', background: '#f0fdf4', color: '#16a34a', fontWeight: 600, fontSize: '11px' }}>
                      {item.status}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '60px', height: '6px', background: '#e2e8f0', borderRadius: '99px', overflow: 'hidden' }}>
                        <div style={{ width: item.share, height: '100%', background: '#10b981' }} />
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: 600, color: '#475569' }}>{item.share}</span>
                    </div>
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
