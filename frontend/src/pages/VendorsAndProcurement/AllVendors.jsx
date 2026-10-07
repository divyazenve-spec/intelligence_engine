import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function AllVendors() {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');

  const vendors = [];

  const filtered = vendors.filter(v => {
    if (filterStatus !== 'ALL' && v.status !== filterStatus) return false;
    if (search) {
      const q = search.toLowerCase();
      return v.name.toLowerCase().includes(q) || v.category.toLowerCase().includes(q) || v.city.toLowerCase().includes(q);
    }
    return true;
  });

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(255,255,255,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Vendors & Procurement"
      subcategory="All Vendors"
      title="Complete Vendor Directory & Supplier Registry"
      subtitle="All 24 registered suppliers with contacts, spend totals, quality ratings, and GSTIN verification status"
      icon="🏭"
      badge=""
      actions={
        <button onClick={() => alert('Opening New Vendor Registration...')} style={{ padding: '6px 14px', borderRadius: '8px', border: '1px solid #3b82f6', background: 'rgba(59,130,246,0.15)', color: '#60a5fa', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
          + Register Vendor
        </button>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Registered" value="24 Vendors" delta="12 cities covered" trend="up" subtext="Nationwide network" icon="🏭" />
        <KpiCard label="Preferred Vendors" value="6 Suppliers" delta="AAA & AA+ rated" trend="up" subtext="Priority allocation" icon="⭐" />
        <KpiCard label="Active Vendors" value="18 Suppliers" delta="100% GST verified" trend="up" subtext="All GSTIN validated" icon="✅" />
        <KpiCard label="Avg. Vendor Tenure" value="22 Months" delta="Long-term partnerships" trend="up" subtext="Since onboarding" icon="🤝" />
      </div>

      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>🏭 Vendor Registry</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Complete supplier list with GSTIN, contact, and performance data</p>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search vendor name, category, city..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ padding: '7px 12px', borderRadius: '8px', border: '1px solid var(--border, rgba(0,0,0,0.15))', background: 'var(--card, #ffffff)', color: 'var(--foreground, #0f172a)', fontSize: '12px', width: '240px', outline: 'none' }}
            />
            {['ALL', 'Preferred', 'Active'].map(s => (
              <button key={s} onClick={() => setFilterStatus(s)} style={{ padding: '5px 12px', borderRadius: '6px', border: '1px solid ' + (filterStatus === s ? '#3b82f6' : 'rgba(255,255,255,0.1)'), background: filterStatus === s ? 'rgba(59,130,246,0.15)' : 'transparent', color: filterStatus === s ? '#60a5fa' : '#94a3b8', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>{s}</button>
            ))}
          </div>
        </div>
        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'var(--muted, #f8fafc)', borderBottom: '1px solid var(--border, rgba(0,0,0,0.08))' }}>
                {['ID', 'Vendor Name', 'Category', 'Contact', 'City', 'Annual Spend', 'POs', 'Rating', 'Status', 'Since'].map(h => (
                  <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: 'var(--muted-foreground, #64748b)', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((v, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border, rgba(0,0,0,0.06))' }}>
                  <td style={{ padding: '10px 12px', fontFamily: '"IBM Plex Mono", monospace', color: '#38bdf8', fontSize: '11px' }}>{v.id}</td>
                  <td style={{ padding: '10px 12px', fontWeight: 600, color: 'var(--foreground, #0f172a)' }}>{v.name}</td>
                  <td style={{ padding: '10px 12px', color: 'var(--muted-foreground, #64748b)' }}>{v.category}</td>
                  <td style={{ padding: '10px 12px', color: 'var(--foreground, #334155)' }}>{v.contact}</td>
                  <td style={{ padding: '10px 12px', color: 'var(--muted-foreground, #64748b)' }}>{v.city}</td>
                  <td style={{ padding: '10px 12px', fontFamily: '"IBM Plex Mono", monospace', color: '#fbbf24', fontWeight: 600 }}>{v.spend}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'center', color: 'var(--foreground, #334155)' }}>{v.pos}</td>
                  <td style={{ padding: '10px 12px' }}><span style={{ padding: '2px 7px', borderRadius: '4px', background: 'rgba(59,130,246,0.12)', color: '#60a5fa', fontSize: '10px', fontWeight: 700 }}>{v.rating}</span></td>
                  <td style={{ padding: '10px 12px' }}><span style={{ padding: '2px 7px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, background: v.status === 'Preferred' ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.06)', color: v.status === 'Preferred' ? '#34d399' : '#94a3b8' }}>{v.status}</span></td>
                  <td style={{ padding: '10px 12px', color: '#64748b', fontSize: '11px' }}>{v.since}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}