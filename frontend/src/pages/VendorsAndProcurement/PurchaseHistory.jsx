import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function PurchaseHistory() {
  const [search, setSearch] = useState('');
  const [filterQuarter, setFilterQuarter] = useState('ALL');
  const [filterCategory, setFilterCategory] = useState('ALL');

  const historyRecords = [];

  const quarterlySpend = [];

  const filtered = historyRecords.filter(r => {
    if (filterCategory !== 'ALL' && r.category !== filterCategory) return false;
    if (search) {
      const q = search.toLowerCase();
      return r.poNumber.toLowerCase().includes(q) || r.vendor.toLowerCase().includes(q) || r.location.toLowerCase().includes(q) || r.invoiceRef.toLowerCase().includes(q);
    }
    return true;
  });

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(255,255,255,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Vendors & Procurement"
      subcategory="Purchase History"
      title="Purchase History & Fulfilled Order Archive"
      subtitle="Complete ledger of historical purchase orders, fulfillment timelines, invoice audit trail, and multi-hub spend"
      icon="📜"
      badge="PO Audit Archive"
      actions={
        <button onClick={() => alert('Exporting Purchase History Audit Ledger (CSV)...')} style={{ padding: '6px 14px', borderRadius: '8px', border: '1px solid #3b82f6', background: 'rgba(59,130,246,0.15)', color: '#60a5fa', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
          📥 Export Audit Ledger
        </button>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Cumulative Spend (FYTD)" value="₹0" delta="+18.4% YoY" trend="up" subtext="71 POs fulfilled" icon="💰" />
        <KpiCard label="Fulfilled Orders" value="71 Orders" delta="100% GRN signed" trend="up" subtext="Zero lost shipments" icon="📦" />
        <KpiCard label="Avg. Order Value" value="₹0" delta="+4.2% vs FY25" trend="up" subtext="Bulk purchasing efficiency" icon="📊" />
        <KpiCard label="Historical Fulfillment SLA" value="0.0%" delta="+1.8% vs last year" trend="up" subtext="On-time delivery" icon="⏱️" />
        <KpiCard label="Invoice Match Accuracy" value="0.0%" delta="Three-way PO/GRN/Inv" trend="up" subtext="Audit compliant" icon="🛡️" />
        <KpiCard label="Active Supplier Count" value="24 Vendors" delta="Direct pharma & nutrition" trend="neutral" subtext="Approved registry" icon="🏭" />
      </div>

      {/* Quarterly Spend Overview */}
      <div style={card}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>📅 Quarterly Purchase Spend & Performance Breakdown</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
          {quarterlySpend.map((q, idx) => (
            <div key={idx} style={{ background: 'rgba(0,0,0,0.22)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '16px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#38bdf8', marginBottom: '8px' }}>{q.quarter}</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--foreground, #0f172a)', marginBottom: '12px' }}>{q.totalSpend}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12px' }}>
                <div><span style={{ color: '#64748b' }}>Fulfilled POs:</span> <span style={{ color: '#e2e8f0', fontWeight: 600 }}>{q.ordersCount}</span></div>
                <div><span style={{ color: '#64748b' }}>Avg. Ticket:</span> <span style={{ color: '#e2e8f0', fontWeight: 600 }}>{q.avgTicket}</span></div>
                <div style={{ gridColumn: 'span 2' }}><span style={{ color: '#64748b' }}>Fulfillment SLA:</span> <span style={{ color: '#34d399', fontWeight: 700 }}>{q.onTimeDelivery}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Historical Purchases Table */}
      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>📑 Fulfilled Purchase Ledger</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Archived PO records with invoice references, delivery destination, and settlement audit dates</p>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search PO, vendor, hub, inv..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.15))', borderRadius: '6px', padding: '6px 12px', color: 'var(--foreground, #0f172a)', fontSize: '12px', minWidth: '220px' }}
            />
            <select
              value={filterCategory}
              onChange={e => setFilterCategory(e.target.value)}
              style={{ background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.15))', borderRadius: '6px', padding: '6px 10px', color: 'var(--foreground, #0f172a)', fontSize: '12px' }}
            >
              <option value="ALL">All Categories</option>
              <option value="Vaccines & Biologics">Vaccines & Biologics</option>
              <option value="Surgical Implants">Surgical Implants</option>
              <option value="Rx Pharmaceuticals">Rx Pharmaceuticals</option>
              <option value="Broad Spectrum Rx">Broad Spectrum Rx</option>
              <option value="Rx Diet Foods">Rx Diet Foods</option>
              <option value="Veterinary Nutrition">Veterinary Nutrition</option>
            </select>
          </div>
        </div>

        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'var(--muted, #f8fafc)', borderBottom: '1px solid var(--border, rgba(0,0,0,0.08))' }}>
                {['PO Number', 'Vendor Name', 'Category', 'Items', 'Order Value', 'Delivered Date', 'Receiving Location', 'Invoice Ref', 'Paid Date', 'Status'].map(h => (
                  <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: 'var(--muted-foreground, #64748b)', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border, rgba(0,0,0,0.06))' }}>
                  <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', color: '#38bdf8', fontSize: '11px', fontWeight: 600 }}>{r.poNumber}</td>
                  <td style={{ padding: '11px 12px', color: 'var(--foreground, #0f172a)', fontWeight: 600 }}>{r.vendor}</td>
                  <td style={{ padding: '11px 12px', color: 'var(--muted-foreground, #64748b)' }}>{r.category}</td>
                  <td style={{ padding: '11px 12px', color: 'var(--foreground, #334155)' }}>{r.itemsCount} SKUs</td>
                  <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#34d399' }}>{r.orderValue}</td>
                  <td style={{ padding: '11px 12px', color: '#64748b', fontSize: '11px' }}>{r.deliveredDate}</td>
                  <td style={{ padding: '11px 12px', color: 'var(--foreground, #334155)' }}>{r.location}</td>
                  <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', color: '#a78bfa', fontSize: '11px' }}>{r.invoiceRef}</td>
                  <td style={{ padding: '11px 12px', color: '#64748b', fontSize: '11px' }}>{r.paidDate}</td>
                  <td style={{ padding: '11px 12px' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, background: 'rgba(52,211,153,0.15)', color: '#34d399' }}>
                      {r.status}
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