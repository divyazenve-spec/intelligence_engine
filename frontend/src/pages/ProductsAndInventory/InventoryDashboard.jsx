import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function InventoryDashboard() {
  const stockItems = [];

  return (
    <DashboardLayout
      category="Products & Inventory"
      subcategory="Inventory & Stock Management"
      title="Warehouse & SKU Valuation Control"
      subtitle="Stock levels, batch tracking, expiry monitoring, and warehouse movement"
      icon="📦"
      badge="Total Value: ₹0"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Stock Value" value="₹0" delta="0.0%" trend="up" subtext="Warehouse valuation" icon="💰" />
        <KpiCard label="Active SKUs" value="0" delta="100% active" trend="neutral" subtext="Live catalog" icon="🏷️" />
        <KpiCard label="Low Stock SKUs" value="0" delta="Action required" trend="down" subtext="Below reorder level" icon="⚠️" />
        <KpiCard label="Expiring in 30 Days" value="12 batches" delta="Inspection due" trend="down" subtext="FEFO tracking" icon="⏳" />
      </div>

      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>Critical Inventory Levels</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))', color: 'var(--muted-foreground, #94a3b8)', fontSize: '11px' }}>
              <th style={{ padding: '8px 12px' }}>SKU</th>
              <th style={{ padding: '8px 12px' }}>Product Name</th>
              <th style={{ padding: '8px 12px' }}>Category</th>
              <th style={{ padding: '8px 12px', textAlign: 'right' }}>Stock Qty</th>
              <th style={{ padding: '8px 12px', textAlign: 'right' }}>Reorder Level</th>
              <th style={{ padding: '8px 12px', textAlign: 'right' }}>Unit Price</th>
              <th style={{ padding: '8px 12px', textAlign: 'right' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {stockItems.map((item) => (
              <tr key={item.sku} style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.04))' }}>
                <td style={{ padding: '12px', fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px' }}>{item.sku}</td>
                <td style={{ padding: '12px', fontWeight: 600 }}>{item.name}</td>
                <td style={{ padding: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>{item.category}</td>
                <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{item.qty}</td>
                <td style={{ padding: '12px', textAlign: 'right', color: 'var(--muted-foreground, #94a3b8)' }}>{item.reorder}</td>
                <td style={{ padding: '12px', textAlign: 'right' }}>{item.price}</td>
                <td style={{ padding: '12px', textAlign: 'right' }}>
                  <span style={{
                    padding: '2px 8px',
                    borderRadius: '99px',
                    background: item.status === 'Healthy' ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)',
                    color: item.status === 'Healthy' ? '#10b981' : '#ef4444',
                    fontWeight: 600,
                    fontSize: '11px'
                  }}>{item.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
