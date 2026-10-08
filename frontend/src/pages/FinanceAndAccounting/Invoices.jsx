import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function Invoices() {
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [search, setSearch] = useState('');

  const invoices = [];

  const filtered = invoices.filter(inv => {
    if (filterStatus !== 'ALL' && inv.status !== filterStatus) return false;
    if (search) {
      const q = search.toLowerCase();
      return inv.id.toLowerCase().includes(q) || inv.client.toLowerCase().includes(q) || inv.facility.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <DashboardLayout
      category="Finance & Accounting"
      subcategory="Invoices"
      title="GST Tax Invoices & Digital Billing Hub"
      subtitle="Compliant GST e-invoices, QR code payment links, automated PDF generation, and customer billing records"
      icon="🧾"
      badge=""
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => alert('Initiating New GST Tax Invoice Generator...')}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              border: '1px solid #3b82f6',
              background: 'rgba(59,130,246,0.15)',
              color: '#60a5fa',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            + Generate Tax Invoice
          </button>
        </div>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Invoices Issued (MTD)" value="0" delta="0.0%" trend="neutral" subtext="GST Compliant" icon="🧾" />
        <KpiCard label="Total Invoiced Value" value="₹0" delta="₹0 GST Output" trend="neutral" subtext="Standard GST" icon="💰" />
        <KpiCard label="Settled / Paid" value="₹0" delta="0.0%" trend="neutral" subtext="Instant digital pay" icon="✅" />
        <KpiCard label="Pending Settlement" value="₹0" delta="Corporate B2B terms" trend="neutral" subtext="Within credit window" icon="⏳" />
        <KpiCard label="Overdue Invoices" value="₹0" delta="--" trend="down" subtext="Follow-up notice sent" icon="⚠️" />
        <KpiCard label="e-Invoice IRN Portal Sync" value="0.0%" delta="Sub-second sync" trend="neutral" subtext="NIC e-Invoice portal" icon="📶" />
      </div>

      <div style={{
        background: 'var(--card, #131d2e)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '22px 24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#fff' }}>📑 Tax Invoices Register</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Official tax receipts with HSN/SAC codes and automated IRN hash generation</p>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Search invoice #, pet parent, hospital..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.1)',
                background: '#090e17',
                color: '#fff',
                fontSize: '12px',
                outline: 'none',
                minWidth: '220px'
              }}
            />
            <div style={{ display: 'flex', gap: '6px' }}>
              {['ALL', 'Paid', 'Pending', 'Overdue'].map(st => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '6px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    background: filterStatus === st ? '#3b82f6' : 'rgba(255,255,255,0.03)',
                    color: filterStatus === st ? '#fff' : '#94a3b8',
                    fontSize: '11px',
                    cursor: 'pointer'
                  }}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.22)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <th style={{ padding: '10px 20px', textAlign: 'left', color: '#94a3b8' }}>Invoice Number</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', color: '#94a3b8' }}>Date</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', color: '#94a3b8' }}>Client / Pet</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', color: '#94a3b8' }}>Facility</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', color: '#94a3b8' }}>Clinical Description</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Taxable</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>18% GST</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Gross Total</th>
                <th style={{ padding: '10px 14px', textAlign: 'center', color: '#94a3b8' }}>Status</th>
                <th style={{ padding: '10px 20px', textAlign: 'center', color: '#94a3b8' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((inv, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 20px', fontFamily: '"IBM Plex Mono", monospace', color: '#38bdf8', fontWeight: 600 }}>{inv.id}</td>
                  <td style={{ padding: '12px 14px', color: '#cbd5e1' }}>{inv.date}</td>
                  <td style={{ padding: '12px 14px', color: '#fff', fontWeight: 600 }}>{inv.client}</td>
                  <td style={{ padding: '12px 14px', color: '#94a3b8' }}>{inv.facility}</td>
                  <td style={{ padding: '12px 14px', color: '#cbd5e1' }}>{inv.items}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{inv.taxable}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#fbbf24' }}>{inv.gst}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#10b981' }}>{inv.total}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '10px',
                      fontWeight: 600,
                      background: inv.status === 'Paid' ? 'rgba(16,185,129,0.15)' : inv.status === 'Pending' ? 'rgba(56,189,248,0.15)' : 'rgba(239,68,68,0.15)',
                      color: inv.status === 'Paid' ? '#34d399' : inv.status === 'Pending' ? '#38bdf8' : '#f87171'
                    }}>
                      {inv.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px 20px', textAlign: 'center' }}>
                    <button
                      onClick={() => alert(`Printing official tax invoice PDF for ${inv.id}`)}
                      style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: '#cbd5e1', fontSize: '11px', cursor: 'pointer' }}
                    >
                      📄 PDF
                    </button>
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
