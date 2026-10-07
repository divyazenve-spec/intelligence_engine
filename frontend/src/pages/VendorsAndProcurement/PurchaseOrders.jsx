import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function PurchaseOrders() {
  const [filterStatus, setFilterStatus] = useState('ALL');

  const orders = [];

  const statusColor = s => ({ Received: '#34d399', 'In Transit': '#38bdf8', Processing: '#a78bfa', Pending: '#fbbf24', Delayed: '#f87171' }[s] || '#94a3b8');
  const filtered = filterStatus === 'ALL' ? orders : orders.filter(o => o.status === filterStatus);
  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(255,255,255,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Vendors & Procurement"
      subcategory="Purchase Orders"
      title="Purchase Order Management & Delivery Tracker"
      subtitle="All active and historical POs with delivery dates, quantities, approval chain, and real-time status tracking"
      icon="📑"
      badge=""
      actions={
        <button onClick={() => alert('Opening New Purchase Order Form...')} style={{ padding: '6px 14px', borderRadius: '8px', border: '1px solid #3b82f6', background: 'rgba(59,130,246,0.15)', color: '#60a5fa', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
          + Raise PO
        </button>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Active POs" value="18 Orders" delta="₹0 in pipeline" trend="neutral" subtext="FY 2026 Oct" icon="📑" />
        <KpiCard label="Received (MTD)" value="3 POs" delta="₹0 received" trend="up" subtext="On-time deliveries" icon="✅" />
        <KpiCard label="In Transit" value="2 POs" delta="Expected this week" trend="neutral" subtext="MSD + Virbac" icon="🚛" />
        <KpiCard label="Delayed POs" value="1 PO" delta="Synthes Vet — 3d late" trend="down" subtext="Escalation triggered" icon="⚠️" />
        <KpiCard label="Avg. PO Value" value="₹0" delta="+12.4% vs Q2" trend="up" subtext="Per order avg." icon="💰" />
        <KpiCard label="PO Approval TAT" value="4.2 Hours" delta="-1.8h improvement" trend="up" subtext="3-level approval chain" icon="⏱️" />
      </div>

      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>📑 Purchase Order Register</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>3-way PO matching: PO → GRN → Invoice verification workflow</p>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {['ALL', 'Received', 'In Transit', 'Processing', 'Pending', 'Delayed'].map(s => (
              <button key={s} onClick={() => setFilterStatus(s)} style={{ padding: '4px 10px', borderRadius: '6px', border: '1px solid ' + (filterStatus === s ? '#3b82f6' : 'rgba(255,255,255,0.1)'), background: filterStatus === s ? 'rgba(59,130,246,0.15)' : 'transparent', color: filterStatus === s ? '#60a5fa' : '#94a3b8', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>{s}</button>
            ))}
          </div>
        </div>
        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'var(--muted, #f8fafc)', borderBottom: '1px solid var(--border, rgba(0,0,0,0.08))' }}>
                {['PO ID', 'Vendor', 'Items', 'Qty', 'PO Value', 'Raised', 'Expected Delivery', 'Received', 'Approver', 'Status'].map(h => (
                  <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: 'var(--muted-foreground, #64748b)', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((o, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border, rgba(0,0,0,0.06))' }}>
                  <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', color: '#38bdf8', fontSize: '11px' }}>{o.id}</td>
                  <td style={{ padding: '11px 12px', fontWeight: 600, color: 'var(--foreground, #0f172a)' }}>{o.vendor}</td>
                  <td style={{ padding: '11px 12px', color: 'var(--muted-foreground, #64748b)', maxWidth: '180px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{o.items}</td>
                  <td style={{ padding: '11px 12px', color: 'var(--foreground, #334155)', fontSize: '11px' }}>{o.qty}</td>
                  <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', color: '#fbbf24', fontWeight: 600 }}>{o.value}</td>
                  <td style={{ padding: '11px 12px', color: '#64748b', fontSize: '11px' }}>{o.raised}</td>
                  <td style={{ padding: '11px 12px', color: 'var(--foreground, #334155)', fontSize: '11px' }}>{o.delivery}</td>
                  <td style={{ padding: '11px 12px', color: o.rcvd !== '-' ? '#34d399' : '#64748b', fontSize: '11px' }}>{o.rcvd}</td>
                  <td style={{ padding: '11px 12px', color: 'var(--muted-foreground, #64748b)' }}>{o.approver}</td>
                  <td style={{ padding: '11px 12px' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, background: statusColor(o.status) + '22', color: statusColor(o.status) }}>{o.status}</span>
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