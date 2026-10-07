import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function VendorReport() {
  const [toast, setToast] = useState('');

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const vendors = [];

  const inr = (n) => '₹' + (Number(n) / 100000).toFixed(2) + ' Lakhs';

  const downloadCSV = () => {
    const rows = [
      ['Supplier / Vendor Name', 'Primary Product Category', 'PO Spend MTD (INR)', 'PO Order Fill Rate', 'On-Time Delivery Rate', 'Batch Quality Score', 'Payment Terms', 'Negotiated Savings (INR)'],
      ...vendors.map(v => [`"${v.name}"`, v.category, v.poSpend, v.fillRate, v.onTimeRate, v.qualityScore, v.paymentTerms, v.savingsGenerated])
    ];
    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.join(',')).join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `zenve_vendor_procurement_scorecard.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast('Vendor Procurement Scorecard CSV downloaded.');
  };

  return (
    <DashboardLayout
      category="Reports & Analytics"
      subcategory="Vendor Reports"
      title="Vendor Procurement & Supplier Scorecard Report"
      subtitle="Procurement expenditure, order fill rate accuracy, cold-chain compliance, vendor payment terms, and negotiated volume discounts"
      icon="🤝"
      badge="Top Tier Suppliers"
      actions={
        <button
          onClick={downloadCSV}
          style={{
            padding: '8px 14px',
            borderRadius: '8px',
            background: 'var(--primary, #3b82f6)',
            color: '#ffffff',
            border: 'none',
            fontWeight: 600,
            fontSize: '12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <span>📥</span> Export Vendor CSV
        </button>
      }
    >
      {toast && (
        <div style={{
          padding: '10px 16px',
          background: 'rgba(59,130,246,0.15)',
          border: '1px solid #3b82f6',
          borderRadius: '8px',
          color: '#60a5fa',
          fontSize: '13px',
          fontWeight: 600
        }}>
          ⚡ {toast}
        </div>
      )}

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Procurement Spend MTD" value="₹0" delta="Across 18 suppliers" trend="neutral" subtext="Direct manufacturer" icon="🛒" />
        <KpiCard label="Average PO Fill Rate" value="0.0%" delta="High stock readiness" trend="up" subtext="Target: > 96.0%" icon="📋" />
        <KpiCard label="On-Time Delivery Rate" value="0.0%" delta="+1.8% vs last quarter" trend="up" subtext="To Bhiwandi Central" icon="🚚" />
        <KpiCard label="Procurement Savings" value="₹0" delta="6.1% average discount" trend="up" subtext="Volume negotiated" icon="💎" />
      </div>

      {/* Table Section */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>Supplier SLA Scorecards & Contract Terms</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))', color: 'var(--muted-foreground, #94a3b8)' }}>
                <th style={{ padding: '10px 12px' }}>Supplier / Manufacturer</th>
                <th style={{ padding: '10px 12px' }}>Product Category</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>PO Spend MTD</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Fill Rate</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>On-Time</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Quality Score</th>
                <th style={{ padding: '10px 12px' }}>Payment Terms</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Volume Savings</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((v) => (
                <tr key={v.name} style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.04))' }}>
                  <td style={{ padding: '12px', fontWeight: 600 }}>{v.name}</td>
                  <td style={{ padding: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>{v.category}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{inr(v.poSpend)}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, color: '#34d399', fontFamily: '"IBM Plex Mono", monospace' }}>{v.fillRate}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace' }}>{v.onTimeRate}</td>
                  <td style={{ padding: '12px', textAlign: 'right', color: '#60a5fa', fontFamily: '"IBM Plex Mono", monospace' }}>{v.qualityScore}</td>
                  <td style={{ padding: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>{v.paymentTerms}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, color: '#34d399', fontFamily: '"IBM Plex Mono", monospace' }}>{inr(v.savingsGenerated)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
