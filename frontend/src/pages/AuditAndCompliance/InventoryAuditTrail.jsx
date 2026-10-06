import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function InventoryAuditTrail() {
  const inv = [
    { batch: 'BATCH-VAC-2026-08', product: 'Zoetis Vanguard Plus 5 Vaccine', hub: 'Central Hub Indiranagar', action: 'Cold-Chain Telemetry Checked (+4.1°C)', adjustment: '0 Units (Verified)', officer: 'IoT Sensor Mon-02', time: '14:00 Today', status: 'Compliant' },
    { batch: 'BATCH-MED-2026-14', product: 'Bravecto Chewable 20-40kg', hub: 'HSR Layout Pharmacy', action: 'Physical Stock Reconciliation', adjustment: '+2 Units (Surplus match)', officer: 'Amit Joshi', time: '11:45 Today', status: 'Compliant' },
    { batch: 'BATCH-FOD-2025-99', product: 'Royal Canin Mini Starter 1kg', hub: 'Whitefield Warehouse', action: 'Expiry Quarantine & Disposal Write-off', adjustment: '-4 Units (Expired)', officer: 'Amit Joshi / Sneha Rao', time: 'Yesterday 17:00', status: 'Disposed' },
    { batch: 'BATCH-MED-2026-02', product: 'Melonex Oral Suspension 10ml', hub: 'Koramangala Clinic', action: 'Inter-Hub Stock Transfer Inward', adjustment: '+25 Units (From Central)', officer: 'Rajesh Verma', time: 'Yesterday 13:20', status: 'Compliant' }
  ];

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
        <KpiCard label="Cold-Chain Integrity" value="99.98%" delta="2°C to 8°C" trend="up" subtext="Zero thermal excursions" icon="❄️" />
        <KpiCard label="Stock Variance Rate" value="0.01%" delta="Benchmark" trend="up" subtext="Physical vs ERP match" icon="📦" />
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
