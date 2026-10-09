import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function ImportDashboard() {
  const [filter, setFilter] = useState('ALL');

  const shipments = [];

  const filtered = filter === 'ALL' ? shipments : shipments.filter(s => s.status.toLowerCase().includes(filter.toLowerCase()));

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Import & Export"
      subcategory="Import Dashboard"
      title="Global Import Logistics & Cross-Border Supply"
      subtitle="International procurement manifests, ocean & air cargo shipments, CDSCO veterinary drug clearance, and customs duty tracking"
      icon="🌐"
      badge=""
      actions={
        <button onClick={() => alert('New Import Shipment Manifest filing opened...')} style={{ padding: '6px 14px', borderRadius: '8px', border: '1px solid #0891b2', background: 'rgba(8,145,178,0.12)', color: '#0e7490', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
          + New Import Consignment
        </button>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Import Procurement (MTD)" value="₹0" delta="" trend="neutral" subtext="CIF Valuation (Invoiced)" icon="🚢" />
        <KpiCard label="Avg Customs Clearance Time" value="0.0 Days" delta="" trend="neutral" subtext="Advance BE filing" icon="⚡" />
        <KpiCard label="Cold-Chain Sea Reefers" value="0 Containers" delta="" trend="neutral" subtext="IoT GPS Telemetry" icon="❄️" />
        <KpiCard label="Customs Duty & IGST Paid" value="₹0" delta="0.0%" trend="neutral" subtext="Tariff code 3002/3004" icon="🏛️" />
        <KpiCard label="CDSCO / Animal Quarantine NOC" value="0.0%" delta="" trend="neutral" subtext="Veterinary import permit" icon="🛡️" />
        <KpiCard label="International Suppliers" value="0 Global Partners" delta="" trend="neutral" subtext="Exclusive distribution" icon="🌍" />
      </div>

      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>🌐 Active Inbound Import Consignments & Clearances</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Bill of Lading / Airway Bill status, port of entry, and customs clearance milestones</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['ALL', 'Received', 'In Customs', 'Transit'].map(s => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                style={{
                  padding: '6px 10px',
                  borderRadius: '6px',
                  border: '1px solid ' + (filter === s ? '#0891b2' : 'var(--border, #cbd5e1)'),
                  background: filter === s ? 'rgba(8,145,178,0.1)' : 'transparent',
                  color: filter === s ? '#0e7490' : 'var(--muted-foreground, #64748b)',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)' }}>
                <th style={{ padding: '10px 12px' }}>B/L or AWB #</th>
                <th style={{ padding: '10px 12px' }}>Origin Country</th>
                <th style={{ padding: '10px 12px' }}>Consignment Description</th>
                <th style={{ padding: '10px 12px' }}>Port of Entry</th>
                <th style={{ padding: '10px 12px' }}>CIF Value</th>
                <th style={{ padding: '10px 12px' }}>Customs Status</th>
                <th style={{ padding: '10px 12px' }}>ETA / Delivery</th>
                <th style={{ padding: '10px 12px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ padding: '24px', textAlign: 'center', color: 'var(--muted-foreground, #64748b)' }}>
                    No import consignment records found
                  </td>
                </tr>
              ) : (
                filtered.map(s => (
                  <tr key={s.bl} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                    <td style={{ padding: '12px', fontFamily: 'monospace', fontWeight: 600 }}>{s.bl}</td>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{s.origin}</td>
                    <td style={{ padding: '12px' }}>{s.product}</td>
                    <td style={{ padding: '12px' }}>{s.port}</td>
                    <td style={{ padding: '12px', fontWeight: 600, color: '#059669' }}>{s.value}</td>
                    <td style={{ padding: '12px' }}>{s.customs}</td>
                    <td style={{ padding: '12px' }}>{s.eta}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        padding: '3px 8px',
                        borderRadius: '999px',
                        fontSize: '10px',
                        fontWeight: 600,
                        background: s.status === 'Received' ? 'rgba(16,185,129,0.12)' : s.status === 'In Customs' ? 'rgba(245,158,11,0.14)' : 'rgba(8,145,178,0.12)',
                        color: s.status === 'Received' ? '#059669' : s.status === 'In Customs' ? '#d97706' : '#0e7490'
                      }}>
                        {s.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
