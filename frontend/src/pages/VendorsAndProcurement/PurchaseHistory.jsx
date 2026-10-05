import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function PurchaseHistory() {
  const [search, setSearch] = useState('');
  const [filterQuarter, setFilterQuarter] = useState('ALL');
  const [filterCategory, setFilterCategory] = useState('ALL');

  const historyRecords = [
    { poNumber: 'PO-2026-0914', vendor: 'MSD Animal Health India', category: 'Vaccines & Biologics', itemsCount: 4, orderValue: '₹4,85,000', deliveredDate: '2026-09-28', location: 'Koramangala Central Hub', status: 'Fulfilled', invoiceRef: 'INV-MSD-9481', paidDate: '2026-10-02' },
    { poNumber: 'PO-2026-0882', vendor: 'Synthes Vet India', category: 'Surgical Implants', itemsCount: 8, orderValue: '₹3,40,000', deliveredDate: '2026-09-22', location: 'Bandra Specialty OT', status: 'Fulfilled', invoiceRef: 'INV-SYN-3301', paidDate: '2026-09-29' },
    { poNumber: 'PO-2026-0850', vendor: 'Boehringer Ingelheim Vet', category: 'Rx Pharmaceuticals', itemsCount: 6, orderValue: '₹5,12,000', deliveredDate: '2026-09-18', location: 'Whitefield Care Hub', status: 'Fulfilled', invoiceRef: 'INV-BI-8820', paidDate: '2026-09-25' },
    { poNumber: 'PO-2026-0819', vendor: 'Zoetis India Ltd.', category: 'Broad Spectrum Rx', itemsCount: 5, orderValue: '₹3,95,000', deliveredDate: '2026-09-10', location: 'Okhla Clinic Hub', status: 'Fulfilled', invoiceRef: 'INV-ZOE-4112', paidDate: '2026-09-19' },
    { poNumber: 'PO-2026-0790', vendor: "Hill's Pet Nutrition", category: 'Rx Diet Foods', itemsCount: 12, orderValue: '₹2,60,000', deliveredDate: '2026-08-30', location: 'Koramangala Central Hub', status: 'Fulfilled', invoiceRef: 'INV-HIL-7740', paidDate: '2026-09-08' },
    { poNumber: 'PO-2026-0745', vendor: 'Royal Canin India', category: 'Veterinary Nutrition', itemsCount: 14, orderValue: '₹4,10,000', deliveredDate: '2026-08-22', location: 'Andheri Clinic Hub', status: 'Fulfilled', invoiceRef: 'INV-RC-5520', paidDate: '2026-08-31' },
    { poNumber: 'PO-2026-0710', vendor: 'Virbac India Pvt. Ltd.', category: 'Dental & Dermatology', itemsCount: 7, orderValue: '₹2,15,000', deliveredDate: '2026-08-14', location: 'Indiranagar Hub', status: 'Fulfilled', invoiceRef: 'INV-VIR-3921', paidDate: '2026-08-24' },
    { poNumber: 'PO-2026-0680', vendor: 'Intas Pharmaceuticals', category: 'Generic APIs & NSAID', itemsCount: 9, orderValue: '₹1,90,000', deliveredDate: '2026-08-04', location: 'Koramangala Central Hub', status: 'Fulfilled', invoiceRef: 'INV-INT-1102', paidDate: '2026-08-12' },
    { poNumber: 'PO-2026-0622', vendor: 'Dechra Veterinary Products', category: 'Dermatology & Ophthal', itemsCount: 5, orderValue: '₹1,65,000', deliveredDate: '2026-07-26', location: 'Bandra Specialty OT', status: 'Fulfilled', invoiceRef: 'INV-DEC-9041', paidDate: '2026-08-05' },
    { poNumber: 'PO-2026-0590', vendor: 'MSD Animal Health India', category: 'Vaccines & Biologics', itemsCount: 6, orderValue: '₹4,30,000', deliveredDate: '2026-07-15', location: 'Koramangala Central Hub', status: 'Fulfilled', invoiceRef: 'INV-MSD-8910', paidDate: '2026-07-24' }
  ];

  const quarterlySpend = [
    { quarter: 'Q1 FY26-27 (Apr-Jun)', totalSpend: '₹34.50 L', ordersCount: 28, avgTicket: '₹1.23 L', onTimeDelivery: '96.2%' },
    { quarter: 'Q2 FY26-27 (Jul-Sep)', totalSpend: '₹42.80 L', ordersCount: 34, avgTicket: '₹1.26 L', onTimeDelivery: '97.4%' },
    { quarter: 'Q3 FY26-27 (Oct MTD)', totalSpend: '₹12.60 L', ordersCount: 9, avgTicket: '₹1.40 L', onTimeDelivery: '98.5%' }
  ];

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
        <KpiCard label="Cumulative Spend (FYTD)" value="₹89.90 L" delta="+18.4% YoY" trend="up" subtext="71 POs fulfilled" icon="💰" />
        <KpiCard label="Fulfilled Orders" value="71 Orders" delta="100% GRN signed" trend="up" subtext="Zero lost shipments" icon="📦" />
        <KpiCard label="Avg. Order Value" value="₹1.27 L" delta="+4.2% vs FY25" trend="up" subtext="Bulk purchasing efficiency" icon="📊" />
        <KpiCard label="Historical Fulfillment SLA" value="97.1%" delta="+1.8% vs last year" trend="up" subtext="On-time delivery" icon="⏱️" />
        <KpiCard label="Invoice Match Accuracy" value="99.4%" delta="Three-way PO/GRN/Inv" trend="up" subtext="Audit compliant" icon="🛡️" />
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