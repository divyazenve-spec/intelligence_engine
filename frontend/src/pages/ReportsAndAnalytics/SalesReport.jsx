import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function SalesReport() {
  const [dateRange, setDateRange] = useState('Oct 01 - Oct 05, 2026 (MTD)');
  const [toast, setToast] = useState('');

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const salesData = [];

  const inr = (n) => '₹' + Number(n).toLocaleString('en-IN');

  const downloadCSV = () => {
    const rows = [
      ['Channel', 'Orders', 'Gross Sales (INR)', 'Discounts (INR)', 'Refunds (INR)', 'Net Sales (INR)', 'AOV (INR)'],
      ...salesData.map(s => [s.channel, s.orders, s.gross, s.discounts, s.refunds, s.net, s.aov])
    ];
    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `zenve_sales_report_mtd.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast('Sales Report CSV generated and downloaded.');
  };

  return (
    <DashboardLayout
      category="Reports & Analytics"
      subcategory="Sales Reports"
      title="Executive Sales Performance Report"
      subtitle="Detailed breakdown of gross revenue, promotional deductions, return allowances, net sales, and average order value across channels"
      icon="📊"
      badge="Verified Live Data"
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              background: 'var(--card, #1e293b)',
              color: 'var(--foreground, #f8fafc)',
              border: '1px solid var(--border, rgba(255,255,255,0.1))',
              fontSize: '12px'
            }}
          >
            <option>Today (Live)</option>
            <option>Oct 01 - Oct 05, 2026 (MTD)</option>
            <option>September 2026 (Full Month)</option>
            <option>Q3 2026 Comprehensive</option>
          </select>
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
            <span>📥</span> Download Sales CSV
          </button>
        </div>
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
        <KpiCard label="Gross Sales MTD" value="₹0" delta="+18.4% YoY" trend="up" subtext="Across 8,548 orders" icon="📈" />
        <KpiCard label="Total Deductions" value="₹0" delta="5.9% of Gross" trend="neutral" subtext="Discounts + Returns" icon="🧾" />
        <KpiCard label="Net Sales Realized" value="₹0" delta="94.1% Retention" trend="up" subtext="Bank settled GMV" icon="💰" />
        <KpiCard label="Blended AOV" value="₹0" delta="+₹0 prior" trend="up" subtext="Higher pharma basket" icon="🛒" />
      </div>

      {/* Table Section */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Sales Channel Performance Breakdown ({dateRange})</h3>
          <span style={{ fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)', fontFamily: '"IBM Plex Mono", monospace' }}>
            5 CHANNELS ACTIVE
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))', color: 'var(--muted-foreground, #94a3b8)' }}>
                <th style={{ padding: '10px 12px' }}>Channel Name</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Total Orders</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Gross Sales</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Discounts</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Refunds</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Net Sales</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Avg Order Value</th>
              </tr>
            </thead>
            <tbody>
              {salesData.map((s) => (
                <tr key={s.channel} style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.04))' }}>
                  <td style={{ padding: '12px', fontWeight: 600 }}>{s.channel}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{s.orders.toLocaleString('en-IN')}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{inr(s.gross)}</td>
                  <td style={{ padding: '12px', textAlign: 'right', color: '#f87171', fontFamily: '"IBM Plex Mono", monospace' }}>-{inr(s.discounts)}</td>
                  <td style={{ padding: '12px', textAlign: 'right', color: '#f87171', fontFamily: '"IBM Plex Mono", monospace' }}>-{inr(s.refunds)}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, color: '#34d399', fontFamily: '"IBM Plex Mono", monospace' }}>{inr(s.net)}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace' }}>{inr(s.aov)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
