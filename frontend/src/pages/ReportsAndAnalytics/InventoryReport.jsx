import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function InventoryReport() {
  const [toast, setToast] = useState('');

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const warehouses = [
    { hub: 'Bhiwandi Central Cold Hub (Mumbai)', type: 'National Distribution Center', totalSkus: 1840, stockValue: 84500000, daysCover: 42, nearExpiryValue: 820000, deadStockValue: 340000 },
    { hub: 'Koramangala 60-Min Express Hub (BLR)', type: 'Urban Micro-Fulfillment Node', totalSkus: 640, stockValue: 18400000, daysCover: 14, nearExpiryValue: 140000, deadStockValue: 85000 },
    { hub: 'Indiranagar Express Dark Store (BLR)', type: 'Micro Dark Store', totalSkus: 480, stockValue: 12200000, daysCover: 11, nearExpiryValue: 92000, deadStockValue: 42000 },
    { hub: 'Delhi NCR Okhla Logistics Center', type: 'Regional Fulfillment Depot', totalSkus: 920, stockValue: 34500000, daysCover: 28, nearExpiryValue: 410000, deadStockValue: 180000 },
    { hub: 'Hyderabad Jubilee Hills Hub', type: 'City Distribution Center', totalSkus: 580, stockValue: 16800000, daysCover: 18, nearExpiryValue: 180000, deadStockValue: 65000 }
  ];

  const inr = (n) => '₹' + (Number(n) / 100000).toFixed(2) + ' Lakhs';

  const downloadCSV = () => {
    const rows = [
      ['Warehouse / Hub Facility', 'Hub Type', 'Total SKUs Stocked', 'Stock Valuation (INR)', 'Days of Inventory Cover (DSI)', 'Near-Expiry Capital (<60d)', 'Aging Stock >90d'],
      ...warehouses.map(w => [w.hub, w.type, w.totalSkus, w.stockValue, w.daysCover, w.nearExpiryValue, w.deadStockValue])
    ];
    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.join(',')).join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `zenve_warehouse_inventory_audit.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast('Inventory Audit Report CSV downloaded.');
  };

  return (
    <DashboardLayout
      category="Reports & Analytics"
      subcategory="Inventory Reports"
      title="Warehouse Inventory & Batch Valuation Audit Report"
      subtitle="Stock valuation across 5 regional cold-chain distribution centers, days of inventory cover (DSI), near-expiry write-downs, and aging capital"
      icon="📦"
      badge="₹16.64 Cr Total Inventory"
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
          <span>📥</span> Export Valuation CSV
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
        <KpiCard label="Consolidated Inventory Valuation" value="₹16.64 Crores" delta="+6.2% vs budget" trend="neutral" subtext="Across 5 cold hubs" icon="🏭" />
        <KpiCard label="Days of Inventory Cover" value="26.4 Days" delta="-3.2 days improved" trend="up" subtext="Target: < 30 days" icon="⏱️" />
        <KpiCard label="Near-Expiry Valuation (<60d)" value="₹16.42 Lakhs" delta="Under 1.0% threshold" trend="up" subtext="Active clearance" icon="⏳" />
        <KpiCard label="Stock Fill Rate SLA" value="98.6%" delta="Same-day dispatch" trend="up" subtext="High availability" icon="✅" />
      </div>

      {/* Table Section */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>Hub Stock Valuation, Aging & Expiry Schedule</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))', color: 'var(--muted-foreground, #94a3b8)' }}>
                <th style={{ padding: '10px 12px' }}>Warehouse / Fulfillment Node</th>
                <th style={{ padding: '10px 12px' }}>Hub Classification</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Active SKUs</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Total Stock Valuation</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>DSI Cover</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Near Expiry (<60d)</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Aging (>90d)</th>
              </tr>
            </thead>
            <tbody>
              {warehouses.map((w) => (
                <tr key={w.hub} style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.04))' }}>
                  <td style={{ padding: '12px', fontWeight: 600 }}>{w.hub}</td>
                  <td style={{ padding: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>{w.type}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{w.totalSkus}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, color: '#34d399', fontFamily: '"IBM Plex Mono", monospace' }}>{inr(w.stockValue)}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace' }}>{w.daysCover} Days</td>
                  <td style={{ padding: '12px', textAlign: 'right', color: '#fbbf24', fontFamily: '"IBM Plex Mono", monospace' }}>{inr(w.nearExpiryValue)}</td>
                  <td style={{ padding: '12px', textAlign: 'right', color: '#f87171', fontFamily: '"IBM Plex Mono", monospace' }}>{inr(w.deadStockValue)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
