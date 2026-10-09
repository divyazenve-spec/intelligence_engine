import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function B2BDashboard() {
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const accounts = [];

  const filtered = accounts.filter(a => {
    if (filter !== 'ALL' && a.category !== filter) return false;
    if (search) {
      const q = search.toLowerCase();
      return a.name.toLowerCase().includes(q) || a.id.toLowerCase().includes(q) || a.category.toLowerCase().includes(q);
    }
    return true;
  });

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="B2B / Enterprise"
      subcategory="Executive Command"
      title="B2B Enterprise & Institutional Accounts"
      subtitle="Corporate kennels, breeder partnerships, institutional hospital contracts, and wholesale volume receivables"
      icon="🏢"
      badge=""
      actions={
        <button onClick={() => alert('New Enterprise Client Onboarding initiated...')} style={{ padding: '6px 14px', borderRadius: '8px', border: '1px solid #4f46e5', background: 'rgba(79,70,229,0.12)', color: '#4338ca', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
          + Onboard Enterprise Client
        </button>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="B2B Gross Revenue (MTD)" value="₹0" delta="0.0%" trend="neutral" subtext="No active records" icon="🏢" />
        <KpiCard label="Active Corporate Clients" value="0 Accounts" delta="" trend="neutral" subtext="No active records" icon="📑" />
        <KpiCard label="Avg. Contract Value (ACV)" value="₹0" delta="0.0%" trend="neutral" subtext="No active records" icon="💼" />
        <KpiCard label="B2B Outstanding Receivables" value="₹0" delta="0.0%" trend="neutral" subtext="No active records" icon="💰" />
        <KpiCard label="Wholesale Gross Margin" value="0.0%" delta="0.0%" trend="neutral" subtext="No active records" icon="📈" />
        <KpiCard label="Contract Renewal Rate" value="0.0%" delta="0.0%" trend="neutral" subtext="No active records" icon="🛡️" />
      </div>

      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>🏢 Major Enterprise & Institutional Accounts</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Commercial standing, contracted commitments, and active credit utilization</p>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search account, ID..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid var(--border, #cbd5e1)', fontSize: '12px', color: 'var(--foreground, #0f172a)', background: 'var(--background, #f8fafc)' }}
            />
            {['ALL', 'Security & Government', 'Breeder Network', 'Veterinary Hospital Chain', 'Corporate Benefits'].map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  padding: '6px 10px',
                  borderRadius: '6px',
                  border: '1px solid ' + (filter === cat ? '#4f46e5' : 'var(--border, #cbd5e1)'),
                  background: filter === cat ? 'rgba(79,70,229,0.1)' : 'transparent',
                  color: filter === cat ? '#4338ca' : 'var(--muted-foreground, #64748b)',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)' }}>
                <th style={{ padding: '10px 12px' }}>Account ID</th>
                <th style={{ padding: '10px 12px' }}>Organization Name</th>
                <th style={{ padding: '10px 12px' }}>Industry / Category</th>
                <th style={{ padding: '10px 12px' }}>Contract Annual</th>
                <th style={{ padding: '10px 12px' }}>MTD Run Rate</th>
                <th style={{ padding: '10px 12px' }}>Credit Terms</th>
                <th style={{ padding: '10px 12px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: '24px', textAlign: 'center', color: 'var(--muted-foreground, #64748b)' }}>
                    No enterprise account records found
                  </td>
                </tr>
              ) : (
                filtered.map(acc => (
                  <tr key={acc.id} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                    <td style={{ padding: '12px', fontFamily: 'monospace', fontWeight: 600 }}>{acc.id}</td>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{acc.name}</td>
                    <td style={{ padding: '12px' }}>{acc.category}</td>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{acc.contractVal}</td>
                    <td style={{ padding: '12px', color: '#059669', fontWeight: 600 }}>{acc.mtdOrders}</td>
                    <td style={{ padding: '12px' }}>{acc.terms} ({acc.creditLimit})</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        padding: '3px 8px',
                        borderRadius: '999px',
                        fontSize: '10px',
                        fontWeight: 600,
                        background: acc.status.includes('Active') ? 'rgba(16,185,129,0.12)' : 'rgba(245,158,11,0.14)',
                        color: acc.status.includes('Active') ? '#059669' : '#d97706'
                      }}>
                        {acc.status}
                      </span>
                    </td>
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
