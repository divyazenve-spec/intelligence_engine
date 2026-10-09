import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function EnterpriseCustomers() {
  const [tier, setTier] = useState('ALL');
  const [search, setSearch] = useState('');

  const customers = [];

  const filtered = customers.filter(c => {
    if (tier !== 'ALL' && c.tier !== tier) return false;
    if (search) {
      const q = search.toLowerCase();
      return c.name.toLowerCase().includes(q) || c.company.toLowerCase().includes(q) || c.id.toLowerCase().includes(q);
    }
    return true;
  });

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="B2B / Enterprise"
      subcategory="Enterprise Customers"
      title="Enterprise Key Decision Makers & Stakeholders"
      subtitle="Corporate buyer hierarchy, authorized procurement officers, and institutional account owners"
      icon="👥"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Key Enterprise Stakeholders" value="0 Contacts" delta="" trend="neutral" subtext="No active records" icon="👥" />
        <KpiCard label="Tier 1 Enterprise Clients" value="0 Accounts" delta="" trend="neutral" subtext="No active records" icon="⭐" />
        <KpiCard label="Corporate Account NPS" value="0 NPS" delta="" trend="neutral" subtext="No active records" icon="🎯" />
        <KpiCard label="Avg Account Tenure" value="0.0 Years" delta="" trend="neutral" subtext="No active records" icon="📅" />
      </div>

      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>Enterprise Procurement Contacts & Buyers</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Commercial liaisons, purchasing authority, and annual procurement spend</p>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search stakeholder or company..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid var(--border, #cbd5e1)', fontSize: '12px', color: 'var(--foreground, #0f172a)', background: 'var(--background, #f8fafc)' }}
            />
            {['ALL', 'Tier 1 Enterprise', 'Tier 2 Wholesale', 'Corporate Wellness'].map(t => (
              <button
                key={t}
                onClick={() => setTier(t)}
                style={{
                  padding: '6px 10px',
                  borderRadius: '6px',
                  border: '1px solid ' + (tier === t ? '#4f46e5' : 'var(--border, #cbd5e1)'),
                  background: tier === t ? 'rgba(79,70,229,0.1)' : 'transparent',
                  color: tier === t ? '#4338ca' : 'var(--muted-foreground, #64748b)',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)' }}>
                <th style={{ padding: '10px 12px' }}>Customer ID</th>
                <th style={{ padding: '10px 12px' }}>Stakeholder Name</th>
                <th style={{ padding: '10px 12px' }}>Enterprise Entity</th>
                <th style={{ padding: '10px 12px' }}>Classification</th>
                <th style={{ padding: '10px 12px' }}>Locations</th>
                <th style={{ padding: '10px 12px' }}>Annual Spend</th>
                <th style={{ padding: '10px 12px' }}>Contact</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: '24px', textAlign: 'center', color: 'var(--muted-foreground, #64748b)' }}>
                    No enterprise customer records found
                  </td>
                </tr>
              ) : (
                filtered.map(c => (
                  <tr key={c.id} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                    <td style={{ padding: '12px', fontFamily: 'monospace', fontWeight: 600 }}>{c.id}</td>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{c.name}</td>
                    <td style={{ padding: '12px' }}>{c.company}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ padding: '3px 8px', borderRadius: '999px', fontSize: '10px', fontWeight: 600, background: 'rgba(79,70,229,0.1)', color: '#4338ca' }}>
                        {c.tier}
                      </span>
                    </td>
                    <td style={{ padding: '12px' }}>{c.locations}</td>
                    <td style={{ padding: '12px', fontWeight: 600, color: '#059669' }}>{c.annualSpend}</td>
                    <td style={{ padding: '12px', fontFamily: 'monospace' }}>{c.contact}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
