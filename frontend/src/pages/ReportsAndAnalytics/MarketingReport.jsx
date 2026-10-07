import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function MarketingReport() {
  const [toast, setToast] = useState('');

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const campaigns = [];

  const inr = (n) => '₹' + Number(n).toLocaleString('en-IN');

  const downloadCSV = () => {
    const rows = [
      ['Campaign Title', 'Marketing Channel', 'Ad Spend (INR)', 'Impressions', 'Clicks', 'New Customers', 'Blended CAC (INR)', 'GMV Generated (INR)', 'ROAS Multiplier'],
      ...campaigns.map(c => [`"${c.name}"`, c.channel, c.spend, c.impressions, c.clicks, c.newCustomers, c.cac, c.gmvGenerated, c.roas])
    ];
    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.join(',')).join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `zenve_marketing_roas_report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast('Marketing Performance Report CSV downloaded.');
  };

  return (
    <DashboardLayout
      category="Reports & Analytics"
      subcategory="Marketing Reports"
      title="Marketing Spend, ROAS & CAC Attribution Report"
      subtitle="Campaign conversion performance, customer acquisition costs (CAC), Return on Ad Spend (ROAS), and organic retention funnels"
      icon="📣"
      badge="Blended 4.7x ROAS"
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
          <span>📥</span> Export Marketing CSV
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
        <KpiCard label="Total Ad Spend MTD" value="₹0" delta="Under budget ₹0" trend="up" subtext="Meta, Google, CRM" icon="💳" />
        <KpiCard label="New Pet Parents Acquired" value="1,860 Parents" delta="+22.4% vs last month" trend="up" subtext="First purchase verified" icon="👶" />
        <KpiCard label="Blended CAC" value="₹0" delta="-₹0" trend="up" subtext="Target: < ₹0" icon="🎯" />
        <KpiCard label="Blended ROAS" value="4.7x" delta="₹0 Revenue" trend="up" subtext="High efficiency" icon="🚀" />
      </div>

      {/* Table Section */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>Campaign Multi-Touch Attribution & ROAS Analysis</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))', color: 'var(--muted-foreground, #94a3b8)' }}>
                <th style={{ padding: '10px 12px' }}>Campaign Name & Channel</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Ad Spend</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Impressions</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Clicks</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>New Parents</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Blended CAC</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>GMV Generated</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>ROAS</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c) => (
                <tr key={c.name} style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.04))' }}>
                  <td style={{ padding: '12px' }}>
                    <div style={{ fontWeight: 700, color: 'var(--foreground, #f8fafc)' }}>{c.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)' }}>{c.channel}</div>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace' }}>{inr(c.spend)}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{c.impressions}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{c.clicks.toLocaleString('en-IN')}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace' }}>{c.newCustomers}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, color: '#38bdf8', fontFamily: '"IBM Plex Mono", monospace' }}>{inr(c.cac)}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, color: '#34d399', fontFamily: '"IBM Plex Mono", monospace' }}>{inr(c.gmvGenerated)}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, color: '#fbbf24', fontFamily: '"IBM Plex Mono", monospace' }}>{c.roas}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
