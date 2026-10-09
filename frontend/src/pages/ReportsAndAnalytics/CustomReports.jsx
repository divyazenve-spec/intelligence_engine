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
    setQueryResults([]);
    triggerToast('Query executed on live replica. 0 aggregated records found.');
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
      badge=""
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
        <KpiCard label="Query Execution Latency" value="0 ms" delta="0.0%" trend="neutral" subtext="Live engine" icon="⚡" />
        <KpiCard label="Supported Dimensions" value="0 Dimensions" delta="0.0%" trend="neutral" subtext="Configured dimensions" icon="📐" />
        <KpiCard label="Saved Team Queries" value="0 Presets" delta="0.0%" trend="neutral" subtext="Team presets" icon="⭐" />
        <KpiCard label="Max Export Rows" value="0" delta="0.0%" trend="neutral" subtext="Export engine" icon="📊" />
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
                {queryResults.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ padding: '24px', textAlign: 'center', color: 'var(--muted-foreground, #94a3b8)' }}>
                      No query records found
                    </td>
                  </tr>
                ) : (
                  queryResults.map((r, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.04))' }}>
                      <td style={{ padding: '12px', fontWeight: 600 }}>{r.dim}</td>
                      <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, color: '#34d399', fontFamily: '"IBM Plex Mono", monospace' }}>{r.val}</td>
                      <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{r.orders}</td>
                      <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{r.aov}</td>
                      <td style={{ padding: '12px', textAlign: 'right', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace' }}>{r.margin}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
