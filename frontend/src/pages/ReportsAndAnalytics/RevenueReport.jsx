import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function RevenueReport() {
  const [toast, setToast] = useState('');

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const buData = [];

  const inr = (n) => '₹' + Number(n).toLocaleString('en-IN');

  const downloadCSV = () => {
    const rows = [
      ['Business Unit', 'Lead', 'MTD Revenue (INR)', 'Target (INR)', 'Attainment (%)', 'Gross Margin (%)', 'YoY Growth'],
      ...buData.map(b => [b.bu, b.lead, b.mtdRev, b.target, b.attainment + '%', b.margin + '%', b.growth])
    ];
    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.join(',')).join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `zenve_revenue_bu_report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast('Revenue Report CSV exported.');
  };

  return (
    <DashboardLayout
      category="Reports & Analytics"
      subcategory="Revenue Reports"
      title="Business Unit & Margin Revenue Report"
      subtitle="Financial performance, recurring subscription revenue, gross contribution margins, and growth trajectory across all 5 operational business units"
      icon="💼"
      badge="Pacing at 98.2%"
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
          <span>📥</span> Export Revenue CSV
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
        <KpiCard label="Consolidated Revenue MTD" value="₹0" delta="+24.8% YoY" trend="up" subtext="All 5 business units" icon="💰" />
        <KpiCard label="Target Attainment" value="0.0%" delta="₹0 gap to budget" trend="up" subtext="Month pacing strong" icon="🎯" />
        <KpiCard label="Blended Gross Margin" value="0.0%" delta="+1.4% margin expansion" trend="up" subtext="Driven by telehealth" icon="📈" />
        <KpiCard label="Recurring ARR Run-Rate" value="₹0" delta="24% share" trend="up" subtext="Wellness subscriptions" icon="🔄" />
      </div>

      {/* Table Section */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>Business Unit Revenue & Contribution Ledger</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))', color: 'var(--muted-foreground, #94a3b8)' }}>
                <th style={{ padding: '10px 12px' }}>Business Unit</th>
                <th style={{ padding: '10px 12px' }}>Operational Lead</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>MTD Revenue</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Target</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Attainment</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Gross Margin</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>YoY Growth</th>
              </tr>
            </thead>
            <tbody>
              {buData.map((b) => (
                <tr key={b.bu} style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.04))' }}>
                  <td style={{ padding: '12px', fontWeight: 600 }}>{b.bu}</td>
                  <td style={{ padding: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>{b.lead}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{inr(b.mtdRev)}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{inr(b.target)}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, color: b.attainment >= 100 ? '#34d399' : '#fbbf24', fontFamily: '"IBM Plex Mono", monospace' }}>{b.attainment}%</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace' }}>{b.margin}%</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, color: '#34d399', fontFamily: '"IBM Plex Mono", monospace' }}>{b.growth}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
