import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function CustomReports() {
  const [dimension, setDimension] = useState('channel');
  const [metric, setMetric] = useState('net_revenue');
  const [dateRange, setDateRange] = useState('30d');
  const [format, setFormat] = useState('csv');
  const [toast, setToast] = useState('');
  const [queryResults, setQueryResults] = useState(null);

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleRunQuery = () => {
    // Generate synthetic results based on selected dimension
    let rows = [];
    if (dimension === 'channel') {
      rows = [
        { dim: 'Android Quick App', val: '₹38.4L', orders: '4,280', aov: '₹897', margin: '38.2%' },
        { dim: 'iOS Quick App', val: '₹28.9L', orders: '3,120', aov: '₹926', margin: '41.5%' },
        { dim: 'Telehealth Direct', val: '₹18.5L', orders: '1,940', aov: '₹953', margin: '68.0%' },
        { dim: 'Hospital Outpatient', val: '₹14.2L', orders: '1,180', aov: '₹1,203', margin: '42.0%' }
      ];
    } else if (dimension === 'hub') {
      rows = [
        { dim: 'Bengaluru Koramangala Hub', val: '₹42.8L', orders: '5,120', aov: '₹835', margin: '39.4%' },
        { dim: 'Mumbai West Bandra Hub', val: '₹34.1L', orders: '3,840', aov: '₹888', margin: '42.1%' },
        { dim: 'Delhi NCR Okhla Hub', val: '₹22.6L', orders: '2,640', aov: '₹856', margin: '37.8%' },
        { dim: 'Hyderabad Jubilee Hills', val: '₹16.4L', orders: '1,920', aov: '₹854', margin: '40.2%' }
      ];
    } else {
      rows = [
        { dim: 'Pet Nutrition (Dry & Wet)', val: '₹48.2L', orders: '6,420', aov: '₹750', margin: '32.4%' },
        { dim: 'Veterinary Pharmaceuticals', val: '₹36.8L', orders: '3,890', aov: '₹946', margin: '42.5%' },
        { dim: 'Diagnostic & Lab Scans', val: '₹18.4L', orders: '1,420', aov: '₹1,295', margin: '74.2%' },
        { dim: 'Grooming & Wellness Retail', val: '₹12.1L', orders: '1,640', aov: '₹737', margin: '48.0%' }
      ];
    }

    setQueryResults(rows);
    triggerToast(`Query executed on SQLite replica in 42ms. Generated ${rows.length} aggregated rows.`);
  };

  const downloadCustomCSV = () => {
    if (!queryResults) return;
    const rows = [
      ['Dimension Label', 'Selected Metric Value', 'Order Volume', 'Average Order Value', 'Contribution Margin'],
      ...queryResults.map(r => [r.dim, r.val, r.orders, r.aov, r.margin])
    ];
    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.join(',')).join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `zenve_custom_${dimension}_${metric}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast('Custom Report downloaded.');
  };

  return (
    <DashboardLayout
      category="Reports & Analytics"
      subcategory="Custom Reports"
      title="Ad-Hoc Custom Report & SQL Query Builder"
      subtitle="Interactive multidimensional pivot engine allowing cross-filtering by channel, location, product, doctor, or customer cohort"
      icon="🛠️"
      badge="Dynamic Query Engine"
      actions={
        <button
          onClick={() => triggerToast('Custom query template saved to Team Favorites.')}
          style={{
            padding: '8px 14px',
            borderRadius: '8px',
            background: 'var(--card, #1e293b)',
            color: 'var(--foreground, #f8fafc)',
            border: '1px solid var(--border, rgba(255,255,255,0.1))',
            fontWeight: 600,
            fontSize: '12px',
            cursor: 'pointer'
          }}
        >
          ⭐ Save to Favorites
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
        <KpiCard label="Query Execution Latency" value="42 ms" delta="FastAPI in-memory" trend="up" subtext="SQLite WAL engine" icon="⚡" />
        <KpiCard label="Supported Dimensions" value="18 Dimensions" delta="Omni-channel data" trend="neutral" subtext="Hub, SKU, Doctor, Cohort" icon="📐" />
        <KpiCard label="Saved Team Queries" value="24 Presets" delta="P&L, Cohort, Logistics" trend="up" subtext="One-click execution" icon="⭐" />
        <KpiCard label="Max Export Rows" value="100,000" delta="Uncapped CSV stream" trend="up" subtext="Direct stream engine" icon="📊" />
      </div>

      {/* Builder Form Card */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '24px'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700 }}>Custom Data Pivot & Aggregation Builder</h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px', color: 'var(--muted-foreground, #94a3b8)' }}>Primary Dimension</label>
            <select
              value={dimension}
              onChange={(e) => setDimension(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: 'rgba(0,0,0,0.25)', border: '1px solid var(--border, rgba(255,255,255,0.1))', color: '#fff', fontSize: '13px' }}
            >
              <option value="channel">Sales Channel (Android, iOS, Web)</option>
              <option value="hub">Fulfillment Micro-Hub / Dark Store</option>
              <option value="category">Product Category & Line</option>
              <option value="doctor">Consulting Veterinarian</option>
              <option value="customer_tier">Pet Parent VIP Tier (Gold/Silver)</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px', color: 'var(--muted-foreground, #94a3b8)' }}>Aggregate Metric</label>
            <select
              value={metric}
              onChange={(e) => setMetric(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: 'rgba(0,0,0,0.25)', border: '1px solid var(--border, rgba(255,255,255,0.1))', color: '#fff', fontSize: '13px' }}
            >
              <option value="net_revenue">Net Settled Revenue (INR)</option>
              <option value="order_volume">Total Order Volume</option>
              <option value="gross_margin">Gross Contribution Margin (%)</option>
              <option value="aov">Average Order Value (AOV)</option>
              <option value="return_rate">Return & Refund Rate (%)</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px', color: 'var(--muted-foreground, #94a3b8)' }}>Reporting Interval</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: 'rgba(0,0,0,0.25)', border: '1px solid var(--border, rgba(255,255,255,0.1))', color: '#fff', fontSize: '13px' }}
            >
              <option value="7d">Last 7 Days Rolling</option>
              <option value="30d">Last 30 Days Rolling</option>
              <option value="mtd">Month to Date (October 2026)</option>
              <option value="ytd">Year to Date (FY 2026-27)</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px', color: 'var(--muted-foreground, #94a3b8)' }}>Output Format</label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: 'rgba(0,0,0,0.25)', border: '1px solid var(--border, rgba(255,255,255,0.1))', color: '#fff', fontSize: '13px' }}
            >
              <option value="csv">Standard CSV Spreadsheet</option>
              <option value="json">Raw JSON API Payload</option>
              <option value="excel">Microsoft Excel (.xlsx)</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button
            onClick={handleRunQuery}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              background: 'var(--primary, #3b82f6)',
              color: '#ffffff',
              border: 'none',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>⚡</span> Execute Live Query
          </button>
        </div>
      </div>

      {/* Query Results Preview */}
      {queryResults && (
        <div style={{
          background: 'var(--card, #1e293b)',
          border: '1px solid var(--border, rgba(255,255,255,0.08))',
          borderRadius: '12px',
          padding: '20px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Query Output Preview ({queryResults.length} records returned)</h3>
            <button
              onClick={downloadCustomCSV}
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                background: '#10b981',
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
              <span>📥</span> Download Query Result
            </button>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))', color: 'var(--muted-foreground, #94a3b8)' }}>
                  <th style={{ padding: '10px 12px' }}>Dimension Target</th>
                  <th style={{ padding: '10px 12px', textAlign: 'right' }}>Calculated Metric</th>
                  <th style={{ padding: '10px 12px', textAlign: 'right' }}>Total Orders</th>
                  <th style={{ padding: '10px 12px', textAlign: 'right' }}>AOV</th>
                  <th style={{ padding: '10px 12px', textAlign: 'right' }}>Margin</th>
                </tr>
              </thead>
              <tbody>
                {queryResults.map((r, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.04))' }}>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{r.dim}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, color: '#34d399', fontFamily: '"IBM Plex Mono", monospace' }}>{r.val}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{r.orders}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{r.aov}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace' }}>{r.margin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
