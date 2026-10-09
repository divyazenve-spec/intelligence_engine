import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function Contracts() {
  const [filter, setFilter] = useState('ALL');

  const contracts = [];

  const filtered = filter === 'ALL' ? contracts : contracts.filter(c => c.status.toLowerCase().includes(filter.toLowerCase()));

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="B2B / Enterprise"
      subcategory="Contracts"
      title="Master Services Agreements (MSA) & Contracts"
      subtitle="Corporate legal master deeds, SLA penalty terms, renewal milestones, and compliance tracking"
      icon="📜"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Active Commercial MSAs" value="0 Contracts" delta="" trend="neutral" subtext="No active records" icon="📜" />
        <KpiCard label="Contracts Expiring in 90D" value="0 Contracts" delta="" trend="neutral" subtext="No active records" icon="⏳" />
        <KpiCard label="Legal SLA Compliance" value="0.0%" delta="0.0%" trend="neutral" subtext="No active records" icon="🛡️" />
        <KpiCard label="Avg Contract Duration" value="0.0 Years" delta="" trend="neutral" subtext="No active records" icon="📅" />
      </div>

      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>Enterprise Master Agreements & Deeds</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Commercial values, tenure validity, and strict SLA clauses</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['ALL', 'Active', 'Renewal'].map(s => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                style={{
                  padding: '6px 10px',
                  borderRadius: '6px',
                  border: '1px solid ' + (filter === s ? '#4f46e5' : 'var(--border, #cbd5e1)'),
                  background: filter === s ? 'rgba(79,70,229,0.1)' : 'transparent',
                  color: filter === s ? '#4338ca' : 'var(--muted-foreground, #64748b)',
                  fontSize: '11px',
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
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)' }}>
                <th style={{ padding: '10px 12px' }}>Contract ID</th>
                <th style={{ padding: '10px 12px' }}>Agreement Title</th>
                <th style={{ padding: '10px 12px' }}>Client Entity</th>
                <th style={{ padding: '10px 12px' }}>Tenure</th>
                <th style={{ padding: '10px 12px' }}>Total Committed Value</th>
                <th style={{ padding: '10px 12px' }}>SLA Default Terms</th>
                <th style={{ padding: '10px 12px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: '24px', textAlign: 'center', color: 'var(--muted-foreground, #64748b)' }}>
                    No contract records found
                  </td>
                </tr>
              ) : (
                filtered.map(c => (
                  <tr key={c.id} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                    <td style={{ padding: '12px', fontFamily: 'monospace', fontWeight: 600 }}>{c.id}</td>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{c.title}</td>
                    <td style={{ padding: '12px' }}>{c.entity}</td>
                    <td style={{ padding: '12px' }}>{c.validFrom} to {c.validTo}</td>
                    <td style={{ padding: '12px', fontWeight: 600, color: '#059669' }}>{c.value}</td>
                    <td style={{ padding: '12px', color: '#64748b' }}>{c.slaPenalty}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        padding: '3px 8px',
                        borderRadius: '999px',
                        fontSize: '10px',
                        fontWeight: 600,
                        background: c.status.includes('Active') ? 'rgba(16,185,129,0.12)' : 'rgba(245,158,11,0.14)',
                        color: c.status.includes('Active') ? '#059669' : '#d97706'
                      }}>
                        {c.status}
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
