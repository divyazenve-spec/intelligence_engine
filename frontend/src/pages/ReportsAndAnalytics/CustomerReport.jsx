import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function CustomerReport() {
  const [toast, setToast] = useState('');

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const cohorts = [];

  const inr = (n) => '₹' + Number(n).toLocaleString('en-IN');

  const downloadCSV = () => {
    const rows = [
      ['Customer Cohort / Segment', 'Total Pet Parents', 'Share (%)', 'Avg Orders', 'Average LTV (INR)', 'Repeat Purchase Rate', '30-Day Churn Rate'],
      ...cohorts.map(c => [c.cohort, c.count, c.pct + '%', c.avgOrders, c.ltv, c.repeatRate, c.churn])
    ];
    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.join(',')).join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `zenve_customer_cohort_report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast('Customer Report CSV exported successfully.');
  };

  return (
    <DashboardLayout
      category="Reports & Analytics"
      subcategory="Customer Reports"
      title="Customer Demographics, LTV & Retention Report"
      subtitle="Comprehensive cohort analytics, Lifetime Value (LTV), repeat purchase frequency, and RFM segmentation for 10,000+ registered pet parents"
      icon="👥"
      badge=""
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
          <span>📥</span> Download Cohort CSV
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
        <KpiCard label="Total Registered Pet Parents" value="10,000 Parents" delta="+1,120 this month" trend="up" subtext="Across 6 metro cities" icon="🐾" />
        <KpiCard label="Average Blended LTV" value="₹0" delta="+₹0" trend="up" subtext="Healthcare + Food" icon="💎" />
        <KpiCard label="Repeat Order Rate" value="0.0%" delta="+4.2% vs Q2" trend="up" subtext="Target: 65.0%" icon="🔄" />
        <KpiCard label="Monthly Churn Rate" value="0.0%" delta="-1.1% reduction" trend="up" subtext="Industry low" icon="🛡️" />
      </div>

      {/* Table Section */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>RFM Segmentation & Cohort Retention Analysis</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))', color: 'var(--muted-foreground, #94a3b8)' }}>
                <th style={{ padding: '10px 12px' }}>Cohort / Segment</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Total Parents</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Share of Base</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Avg Orders</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Average LTV</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Repeat Rate</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Churn Rate</th>
              </tr>
            </thead>
            <tbody>
              {cohorts.map((c) => (
                <tr key={c.cohort} style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.04))' }}>
                  <td style={{ padding: '12px', fontWeight: 600 }}>{c.cohort}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{c.count.toLocaleString('en-IN')}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{c.pct}%</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{c.avgOrders}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, color: '#34d399', fontFamily: '"IBM Plex Mono", monospace' }}>{inr(c.ltv)}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace' }}>{c.repeatRate}</td>
                  <td style={{ padding: '12px', textAlign: 'right', color: Number(c.churn.replace('%','')) > 10 ? '#f87171' : '#60a5fa', fontFamily: '"IBM Plex Mono", monospace' }}>{c.churn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
