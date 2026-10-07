import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function InventoryAuditTrail() {
  const inv = [];

  return (
    <DashboardLayout
      category="Audit & Compliance"
      subcategory="Inventory Movements & Cold-Chain Audits"
      title="Inventory Movements & Cold-Chain Audits"
      subtitle="Batch lineage, thermal storage telemetry, transfer manifests, and write-off records"
      icon="📋"
      badge="Cold-Chain Monitored"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Cold-Chain Integrity" value="0.0%" delta="2°C to 8°C" trend="up" subtext="Zero thermal excursions" icon="❄️" />
        <KpiCard label="Stock Variance Rate" value="0.0%" delta="Benchmark" trend="up" subtext="Physical vs ERP match" icon="📦" />
        <KpiCard label="Quarantine Actions" value="4 Units YTD" delta="Safe Disposal" trend="neutral" subtext="Biomedical waste compliant" icon="🗑️" />
        <KpiCard label="Batch Traceability" value="100% Tracked" delta="QR / Barcode" trend="up" subtext="Manufacturer to parent" icon="🏷️" />
      </div>

      <div style={{ background: 'var(--card, #ffffff)', border: '1px solid var(--border, #e2e8f0)', borderRadius: '12px', padding: '20px' }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>Inventory Movements & Quality Control Log</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)', fontSize: '11px', textTransform: 'uppercase' }}>
                <th style={{ padding: '10px 12px' }}>Batch / Lot No</th>
                <th style={{ padding: '10px 12px' }}>Product Name</th>
                <th style={{ padding: '10px 12px' }}>Warehouse / Clinic Hub</th>
                <th style={{ padding: '10px 12px' }}>Audit Action</th>
                <th style={{ padding: '10px 12px' }}>Quantity Delta</th>
                <th style={{ padding: '10px 12px' }}>Verified By</th>
                <th style={{ padding: '10px 12px' }}>Timestamp</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Compliance</th>
              </tr>
            </thead>
            <tbody>
              {inv.map((i, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border, #f1f5f9)' }}>
                  <td style={{ padding: '12px', fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px', color: '#2563eb', fontWeight: 600 }}>{i.batch}</td>
                  <td style={{ padding: '12px', fontWeight: 700 }}>{i.product}</td>
                  <td style={{ padding: '12px', color: '#64748b' }}>{i.hub}</td>
                  <td style={{ padding: '12px' }}>{i.action}</td>
                  <td style={{ padding: '12px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700 }}>{i.adjustment}</td>
                  <td style={{ padding: '12px' }}>{i.officer}</td>
                  <td style={{ padding: '12px', fontSize: '12px' }}>{i.time}</td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '99px', background: '#dcfce7', color: '#15803d', fontWeight: 600, fontSize: '11px' }}>● {i.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
