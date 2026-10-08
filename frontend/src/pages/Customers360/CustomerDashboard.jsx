import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function CustomerDashboard() {
  const [segmentFilter, setSegmentFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const customers = [];

  const filtered = customers.filter(c => {
    if (segmentFilter !== 'ALL' && c.tier !== segmentFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return c.name.toLowerCase().includes(q) || c.id.toLowerCase().includes(q) || c.pets.toLowerCase().includes(q);
    }
    return true;
  });

  const cardStyle = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Customers 360°"
      subcategory="Customer Intelligence & Command"
      title="Unified Customer 360° Command Center"
      subtitle="Holistic pet parent profiles, omni-channel engagement, Customer Lifetime Value (LTV), and automated retention telemetry"
      icon="👥"
      badge=""
      actions={
        <button
          onClick={() => alert('New Customer Profile creation modal initiated...')}
          style={{
            padding: '6px 14px',
            borderRadius: '8px',
            border: '1px solid #2563eb',
            background: 'rgba(37,99,235,0.12)',
            color: '#1d4ed8',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          + Create Customer Profile
        </button>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Customer Base" value="0" delta="--" trend="neutral" subtext="No registered pets" icon="👥" />
        <KpiCard label="Active 30-Day Transactors" value="0" delta="0.0%" trend="neutral" subtext="Purchased or visited clinic" icon="⚡" />
        <KpiCard label="Avg. Lifetime Value (LTV)" value="₹0" delta="0.0%" trend="neutral" subtext="Calculated across all cohorts" icon="💎" />
        <KpiCard label="Repeat Purchase Rate" value="0.0%" delta="0.0%" trend="neutral" subtext="High loyalty stickiness" icon="🔄" />
        <KpiCard label="Customer Satisfaction Score" value="0.0%" delta="--" trend="neutral" subtext="No survey responses" icon="⭐" />
        <KpiCard label="Net Churn Rate" value="0.0%" delta="0.0%" trend="neutral" subtext="Industry leading retention" icon="📉" />
      </div>

      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>👥 Unified Customer Roster & Relationship Matrix</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Real-time pet ownership mapping, historical spend, loyalty tiers, and churn risk radar</p>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search parent, ID, or pet..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid var(--border, #cbd5e1)', fontSize: '12px', background: '#f8fafc', color: '#0f172a', width: '220px' }}
            />
            {['ALL', 'VIP Elite', 'Loyal Gold', 'New Subscriber', 'Occasional Silver'].map(s => (
              <button
                key={s}
                onClick={() => setSegmentFilter(s)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '8px',
                  border: segmentFilter === s ? '1px solid #2563eb' : '1px solid var(--border, #cbd5e1)',
                  background: segmentFilter === s ? '#2563eb' : '#ffffff',
                  color: segmentFilter === s ? '#ffffff' : '#334155',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border, #e2e8f0)', textAlign: 'left', color: 'var(--muted-foreground, #475569)' }}>
                <th style={{ padding: '10px' }}>Customer ID</th>
                <th style={{ padding: '10px' }}>Pet Parent Name</th>
                <th style={{ padding: '10px' }}>Registered Pets</th>
                <th style={{ padding: '10px' }}>Loyalty Tier</th>
                <th style={{ padding: '10px' }}>Lifetime Value</th>
                <th style={{ padding: '10px' }}>Total Orders</th>
                <th style={{ padding: '10px' }}>MTD Spend</th>
                <th style={{ padding: '10px' }}>Last Touch</th>
                <th style={{ padding: '10px' }}>Churn Risk</th>
                <th style={{ padding: '10px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (<tr><td colSpan="10" style={{ textAlign: "center", padding: "32px", color: "var(--muted-foreground, #64748b)" }}>No customer directory records found</td></tr>) : filtered.map(c => (
                <tr key={c.id} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                  <td style={{ padding: '10px', fontFamily: 'monospace', fontWeight: 600 }}>{c.id}</td>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{c.name}</td>
                  <td style={{ padding: '10px', color: '#475569' }}>{c.pets}</td>
                  <td style={{ padding: '10px' }}>
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: c.tier.includes('VIP') ? '#eff6ff' : c.tier.includes('Gold') ? '#fef3c7' : '#f1f5f9',
                      color: c.tier.includes('VIP') ? '#1d4ed8' : c.tier.includes('Gold') ? '#b45309' : '#475569'
                    }}>
                      {c.tier}
                    </span>
                  </td>
                  <td style={{ padding: '10px', fontWeight: 700, color: '#059669' }}>{c.ltv}</td>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{c.ordersCount}</td>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{c.mtdSpend}</td>
                  <td style={{ padding: '10px', color: '#64748b' }}>{c.lastOrder}</td>
                  <td style={{ padding: '10px' }}>
                    <span style={{
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '10px',
                      fontWeight: 600,
                      background: c.churnRisk === 'Very Low' ? '#f0fdf4' : c.churnRisk === 'Low' ? '#f0fdf4' : '#fef2f2',
                      color: c.churnRisk === 'Very Low' || c.churnRisk === 'Low' ? '#16a34a' : '#b91c1c'
                    }}>
                      {c.churnRisk}
                    </span>
                  </td>
                  <td style={{ padding: '10px' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: c.status === 'Active' ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)',
                      color: c.status === 'Active' ? '#047857' : '#b91c1c'
                    }}>
                      {c.status}
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
