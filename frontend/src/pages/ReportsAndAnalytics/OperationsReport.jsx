import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function OperationsReport() {
  const [toast, setToast] = useState('');

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const hubs = [
    { hub: 'Koramangala 60-Min Express Hub', city: 'Bengaluru', orders: 3420, onTimeRate: '97.2%', avgDispatchMins: 3.4, riderCount: 24, deliveryCostPerOrder: 52, returnsPct: '1.4%' },
    { hub: 'Indiranagar Express Dark Store', city: 'Bengaluru', orders: 2180, onTimeRate: '96.8%', avgDispatchMins: 3.8, riderCount: 16, deliveryCostPerOrder: 54, returnsPct: '1.6%' },
    { hub: 'Mumbai West Fulfillment Center', city: 'Mumbai', orders: 1840, onTimeRate: '95.4%', avgDispatchMins: 4.2, riderCount: 18, deliveryCostPerOrder: 62, returnsPct: '2.1%' },
    { hub: 'Delhi NCR Okhla Logistics Depot', city: 'Delhi NCR', orders: 1420, onTimeRate: '94.8%', avgDispatchMins: 4.6, riderCount: 12, deliveryCostPerOrder: 66, returnsPct: '2.8%' },
    { hub: 'Hyderabad Jubilee Hills Node', city: 'Hyderabad', orders: 1120, onTimeRate: '96.5%', avgDispatchMins: 3.9, riderCount: 10, deliveryCostPerOrder: 56, returnsPct: '1.5%' }
  ];

  const downloadCSV = () => {
    const rows = [
      ['Operations Hub', 'Metro City', 'Orders Dispatched MTD', '60-Min On-Time SLA', 'Avg Staging Dwell (Mins)', 'Active EV Riders', 'Delivery Cost / Order (INR)', 'Returns Rate'],
      ...hubs.map(h => [h.hub, h.city, h.orders, h.onTimeRate, h.avgDispatchMins, h.riderCount, h.deliveryCostPerOrder, h.returnsPct])
    ];
    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.join(',')).join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `zenve_operations_logistics_report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast('Operations & Logistics Report CSV downloaded.');
  };

  return (
    <DashboardLayout
      category="Reports & Analytics"
      subcategory="Operations Reports"
      title="Fulfillment Logistics & 60-Minute SLA Report"
      subtitle="Warehouse packing throughput, dark-store staging dwell times, delivery cost per drop, rider fleet efficiency, and SLA compliance"
      icon="🚚"
      badge="96.2% On-Time Delivery"
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
          <span>📥</span> Export Logistics CSV
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
        <KpiCard label="Consolidated On-Time SLA" value="96.2%" delta="+1.1% vs last week" trend="up" subtext="Target: 95.0%" icon="⚡" />
        <KpiCard label="Average Dispatch Dwell" value="3.8 Mins" delta="Under 4.0m SLA" trend="up" subtext="Dark store automated" icon="⏱️" />
        <KpiCard label="Active Dedicated Fleet" value="80 EV Riders" delta="Ather & Ola EV" trend="neutral" subtext="Zero fuel emissions" icon="🛵" />
        <KpiCard label="Blended Cost / Delivery" value="₹57.40" delta="-₹3.80 efficiency" trend="up" subtext="Route optimized" icon="📉" />
      </div>

      {/* Table Section */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>Micro-Hub Fulfillment & Express Delivery Benchmark</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))', color: 'var(--muted-foreground, #94a3b8)' }}>
                <th style={{ padding: '10px 12px' }}>Fulfillment Node</th>
                <th style={{ padding: '10px 12px' }}>City</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Orders Dispatched</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>On-Time SLA</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Staging Dwell</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Riders</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Cost / Order</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Returns Rate</th>
              </tr>
            </thead>
            <tbody>
              {hubs.map((h) => (
                <tr key={h.hub} style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.04))' }}>
                  <td style={{ padding: '12px', fontWeight: 600 }}>{h.hub}</td>
                  <td style={{ padding: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>{h.city}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{h.orders.toLocaleString('en-IN')}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, color: '#34d399', fontFamily: '"IBM Plex Mono", monospace' }}>{h.onTimeRate}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace' }}>{h.avgDispatchMins} mins</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{h.riderCount}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace' }}>₹{h.deliveryCostPerOrder}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{h.returnsPct}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
