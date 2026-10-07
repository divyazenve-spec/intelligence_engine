import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function VendorPayments() {
  const [filterStatus, setFilterStatus] = useState('ALL');

  const payments = [];

  const filtered = filterStatus === 'ALL' ? payments : payments.filter(p => p.status === filterStatus);
  const statusColor = s => ({ Paid: '#34d399', Scheduled: '#38bdf8', Pending: '#fbbf24', Overdue: '#f87171' }[s] || '#94a3b8');
  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(255,255,255,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Vendors & Procurement"
      subcategory="Vendor Payments"
      title="Vendor Payments & AP Settlement Ledger"
      subtitle="Scheduled NEFT/RTGS disbursements, TDS deductions, GST payables, and supplier payment due dates"
      icon="💳"
      badge="AP Settlement"
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => alert('Initiating Bulk Payment Schedule...')} style={{ padding: '6px 14px', borderRadius: '8px', border: '1px solid #10b981', background: 'rgba(16,185,129,0.15)', color: '#34d399', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
            + Schedule Payment
          </button>
        </div>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Payable (MTD)" value="₹0" delta="8 vendor invoices" trend="neutral" subtext="Oct 2026" icon="💳" />
        <KpiCard label="Paid (MTD)" value="₹0" delta="3 settlements done" trend="up" subtext="On-time payments" icon="✅" />
        <KpiCard label="Scheduled Payments" value="₹0" delta="2 upcoming" trend="neutral" subtext="Next 7 days" icon="📅" />
        <KpiCard label="Overdue Payments" value="₹0" delta="1 vendor — action req." trend="down" subtext="Synthes Vet — Overdue" icon="⚠️" />
        <KpiCard label="TDS Deducted (MTD)" value="₹0" delta="TDS @ 2% on vendor Rx" trend="neutral" subtext="Form 16B issued" icon="🧾" />
        <KpiCard label="GST Payable (IGST)" value="₹0" delta="18% applicable" trend="neutral" subtext="GSTR-2B matched" icon="📋" />
      </div>

      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>💳 Vendor Payment Schedule</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>NEFT/RTGS disbursements with TDS deduction and GST breakup</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['ALL', 'Paid', 'Scheduled', 'Pending', 'Overdue'].map(s => (
              <button key={s} onClick={() => setFilterStatus(s)} style={{ padding: '4px 10px', borderRadius: '6px', border: '1px solid ' + (filterStatus === s ? '#3b82f6' : 'rgba(255,255,255,0.1)'), background: filterStatus === s ? 'rgba(59,130,246,0.15)' : 'transparent', color: filterStatus === s ? '#60a5fa' : '#94a3b8', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>{s}</button>
            ))}
          </div>
        </div>
        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'var(--muted, #f8fafc)', borderBottom: '1px solid var(--border, rgba(0,0,0,0.08))' }}>
                {['Pay ID', 'Vendor', 'PO Ref', 'Amount', 'GST', 'TDS', 'Due Date', 'Bank Channel', 'Method', 'Status'].map(h => (
                  <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: 'var(--muted-foreground, #64748b)', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border, rgba(0,0,0,0.06))' }}>
                  <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', color: '#38bdf8', fontSize: '11px' }}>{p.id}</td>
                  <td style={{ padding: '11px 12px', fontWeight: 600, color: 'var(--foreground, #0f172a)' }}>{p.vendor}</td>
                  <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', color: 'var(--muted-foreground, #64748b)', fontSize: '11px' }}>{p.po}</td>
                  <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', color: '#fbbf24', fontWeight: 600 }}>{p.amount}</td>
                  <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', color: 'var(--muted-foreground, #64748b)', fontSize: '11px' }}>{p.gst}</td>
                  <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', color: 'var(--muted-foreground, #64748b)', fontSize: '11px' }}>{p.tds}</td>
                  <td style={{ padding: '11px 12px', color: 'var(--foreground, #334155)' }}>{p.due}</td>
                  <td style={{ padding: '11px 12px', color: 'var(--muted-foreground, #64748b)' }}>{p.bank}</td>
                  <td style={{ padding: '11px 12px', color: '#64748b', fontSize: '11px' }}>{p.method}</td>
                  <td style={{ padding: '11px 12px' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, background: statusColor(p.status) + '22', color: statusColor(p.status) }}>{p.status}</span>
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