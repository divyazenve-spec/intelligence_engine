import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function Procurement() {
  const pipeline = [];

  const requisitions = [];

  const urgencyColor = u => ({ Critical: '#f87171', High: '#fbbf24', Medium: '#38bdf8', Low: '#94a3b8' }[u] || '#94a3b8');
  const statusColor = s => ({ 'Received': '#34d399', 'PO Raised': '#3b82f6', 'In Approval': '#a78bfa', Pending: '#64748b' }[s] || '#94a3b8');
  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(255,255,255,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Vendors & Procurement"
      subcategory="Procurement"
      title="Procurement Workflow & Requisition Pipeline"
      subtitle="End-to-end procurement lifecycle: requisition → approval → vendor negotiation → PO → GRN → 3-way match → payment"
      icon="🔄"
      badge="Procurement Pipeline"
      actions={
        <button onClick={() => alert('Creating New Procurement Requisition...')} style={{ padding: '6px 14px', borderRadius: '8px', border: '1px solid #3b82f6', background: 'rgba(59,130,246,0.15)', color: '#60a5fa', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
          + New Requisition
        </button>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Requisitions (MTD)" value="43 Requests" delta="+8 vs last month" trend="up" subtext="Cross all departments" icon="📋" />
        <KpiCard label="POs Issued (MTD)" value="18 POs" delta="₹0 total value" trend="up" subtext="Oct 2026" icon="📑" />
        <KpiCard label="Avg. Requisition to PO" value="2.4 Days" delta="-0.6d improvement" trend="up" subtext="End-to-end cycle time" icon="⏱️" />
        <KpiCard label="3-Way Match Rate" value="0.0%" delta="+0.4% MoM" trend="up" subtext="PO-GRN-Invoice match" icon="🎯" />
        <KpiCard label="Critical Requisitions" value="3 Urgent" delta="Surgery OT + Pharma" trend="down" subtext="Fast-track in progress" icon="🚨" />
        <KpiCard label="Procurement Cycle Savings" value="₹0" delta="+18.4% vs target" trend="up" subtext="Negotiation & volume" icon="💰" />
      </div>

      {/* Pipeline Stages */}
      <div style={card}>
        <h3 style={{ margin: '0 0 18px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>🔄 Procurement Pipeline — Stage View</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
          {pipeline.map((s, i) => (
            <div key={i} style={{ background: 'var(--muted, #f8fafc)', borderRadius: '8px', padding: '14px', borderLeft: `3px solid ${s.color}` }}>
              <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '4px' }}>Stage {i + 1}</div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--foreground, #0f172a)', marginBottom: '6px' }}>{s.stage}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: s.color, fontWeight: 700 }}>{s.count} orders</span>
                <span style={{ color: 'var(--muted-foreground, #64748b)', fontFamily: '"IBM Plex Mono", monospace' }}>{s.value}</span>
              </div>
              <div style={{ height: '3px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', marginTop: '8px' }}>
                <div style={{ width: `${s.pct}%`, height: '100%', background: s.color, borderRadius: '2px', opacity: 0.7 }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Requisitions Table */}
      <div style={card}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>📋 Active Procurement Requisitions</h3>
        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'var(--muted, #f8fafc)', borderBottom: '1px solid var(--border, rgba(0,0,0,0.08))' }}>
                {['REQ ID', 'Department', 'Item', 'Qty', 'Urgency', 'Requested By', 'Status', 'Created'].map(h => (
                  <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: 'var(--muted-foreground, #64748b)', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {requisitions.map((r, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border, rgba(0,0,0,0.06))' }}>
                  <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', color: '#38bdf8', fontSize: '11px' }}>{r.id}</td>
                  <td style={{ padding: '11px 12px', color: 'var(--foreground, #334155)', fontWeight: 500 }}>{r.department}</td>
                  <td style={{ padding: '11px 12px', fontWeight: 600, color: 'var(--foreground, #0f172a)' }}>{r.item}</td>
                  <td style={{ padding: '11px 12px', color: 'var(--muted-foreground, #64748b)' }}>{r.qty}</td>
                  <td style={{ padding: '11px 12px' }}><span style={{ padding: '2px 7px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, background: urgencyColor(r.urgency) + '22', color: urgencyColor(r.urgency) }}>{r.urgency}</span></td>
                  <td style={{ padding: '11px 12px', color: 'var(--muted-foreground, #64748b)' }}>{r.requestedBy}</td>
                  <td style={{ padding: '11px 12px' }}><span style={{ padding: '2px 7px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, background: statusColor(r.status) + '22', color: statusColor(r.status) }}>{r.status}</span></td>
                  <td style={{ padding: '11px 12px', color: '#64748b', fontSize: '11px' }}>{r.created}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}