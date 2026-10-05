import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function InventorySystemHealth() {
  const [nodes, setNodes] = useState([
    {
      hub: 'Bengaluru Central Cold Depot (Koramangala)',
      type: 'Primary Cold Chain & Central Hub',
      ip: '10.20.1.14',
      status: 'Healthy',
      syncLatency: '14ms',
      skuCount: '4,200 SKUs',
      telemetry: 'Freezer #1: +3.8°C | Freezer #2: +4.2°C',
      wmsConnector: 'Connected (REST v2)',
      pendingTransfers: '0'
    },
    {
      hub: 'Mumbai West Express Fulfillment (Bandra)',
      type: '60-Min Express Hub',
      ip: '10.20.2.22',
      status: 'Healthy',
      syncLatency: '24ms',
      skuCount: '1,850 SKUs',
      telemetry: 'Ambient: +22.4°C | Chiller: +4.0°C',
      wmsConnector: 'Connected (MQTT)',
      pendingTransfers: '2 in-transit'
    },
    {
      hub: 'Delhi NCR Urban Node (Okhla)',
      type: 'Regional Fulfillment Hub',
      ip: '10.20.3.18',
      status: 'Healthy',
      syncLatency: '32ms',
      skuCount: '2,400 SKUs',
      telemetry: 'Ambient: +24.1°C | Chiller: +3.9°C',
      wmsConnector: 'Connected (REST v2)',
      pendingTransfers: '0'
    },
    {
      hub: 'Hyderabad Central (Jubilee Hills)',
      type: 'Express Micro-Hub',
      ip: '10.20.4.11',
      status: 'Healthy',
      syncLatency: '28ms',
      skuCount: '1,420 SKUs',
      telemetry: 'Ambient: +23.2°C | Chiller: +4.1°C',
      wmsConnector: 'Connected (REST v2)',
      pendingTransfers: '1 in-transit'
    },
    {
      hub: 'Pune Express Center (Koregaon)',
      type: 'Express Micro-Hub',
      ip: '10.20.5.09',
      status: 'Healthy',
      syncLatency: '26ms',
      skuCount: '1,280 SKUs',
      telemetry: 'Ambient: +22.8°C | Chiller: +3.7°C',
      wmsConnector: 'Connected (MQTT)',
      pendingTransfers: '0'
    }
  ]);

  const [toast, setToast] = useState('');

  const pingNode = (hub) => {
    setToast(`Telemetry ping received from ${hub} — Temperature, stock counters & RFID gateway OK.`);
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <DashboardLayout
      category="System Health"
      subcategory="Inventory System"
      title="Warehouse WMS & Cold-Chain IoT Health"
      subtitle="Warehouse node connectivity, stock delta sync, RFID scanner APIs & freezer telemetry streams"
      icon="📦"
      badge="All 5 Hubs Synced"
      actions={
        <button
          onClick={() => {
            setToast('Dispatched stock recount beacon across 5 fulfillment warehouses.');
            setTimeout(() => setToast('All 5 warehouses synchronized to SQLite master inventory.'), 2500);
          }}
          style={{
            padding: '7px 14px',
            borderRadius: '8px',
            background: '#2563eb',
            color: '#ffffff',
            border: '1px solid #1d4ed8',
            fontWeight: 600,
            fontSize: '12px',
            cursor: 'pointer'
          }}
        >
          🔄 Force Stock Recount
        </button>
      }
    >
      {toast && (
        <div style={{
          padding: '10px 16px',
          background: '#eff6ff',
          border: '1px solid #bfdbfe',
          borderRadius: '8px',
          color: '#2563eb',
          fontSize: '13px',
          fontWeight: 600
        }}>
          ℹ️ {toast}
        </div>
      )}

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Online Hubs" value="5 / 5 Hubs" delta="100% Operational" trend="up" subtext="All IoT streams green" icon="🏬" />
        <KpiCard label="Cold-Chain Sensor Heartbeat" value="3.0 s" delta="Normal: +2°C to +8°C" trend="up" subtext="0 breaches detected" icon="❄️" />
        <KpiCard label="Total Tracked SKUs" value="4,200 SKUs" delta="Real-time sync" trend="up" subtext="Valuation: ₹16.64 Cr" icon="📦" />
        <KpiCard label="Reorder Triggers Fired" value="14 Today" delta="Automated PO sent" trend="up" subtext="Zero manual delay" icon="⚡" />
      </div>

      {/* Nodes Table */}
      <div style={{
        background: 'var(--card, #ffffff)',
        border: '1px solid var(--border, #e2e8f0)',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>Fulfillment Hubs & IoT Sensor Streams</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)', fontSize: '11px', background: '#f8fafc' }}>
              <th style={{ padding: '10px 12px' }}>Hub / Location</th>
              <th style={{ padding: '10px 12px' }}>IP / Protocol</th>
              <th style={{ padding: '10px 12px', textAlign: 'right' }}>Sync Latency</th>
              <th style={{ padding: '10px 12px', textAlign: 'right' }}>Active SKUs</th>
              <th style={{ padding: '10px 12px' }}>Live Telemetry (IoT)</th>
              <th style={{ padding: '10px 12px', textAlign: 'right' }}>Status</th>
              <th style={{ padding: '10px 12px', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {nodes.map((node) => (
              <tr key={node.hub} style={{ borderBottom: '1px solid var(--border, #f1f5f9)' }}>
                <td style={{ padding: '12px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>
                  {node.hub}
                  <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #64748b)', fontWeight: 400 }}>{node.type}</div>
                </td>
                <td style={{ padding: '12px', fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px', color: 'var(--muted-foreground, #64748b)' }}>{node.ip}</td>
                <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{node.syncLatency}</td>
                <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{node.skuCount}</td>
                <td style={{ padding: '12px', fontSize: '11px', color: '#16a34a', fontFamily: '"IBM Plex Mono", monospace' }}>{node.telemetry}</td>
                <td style={{ padding: '12px', textAlign: 'right' }}>
                  <span style={{ padding: '2px 8px', borderRadius: '99px', background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0', fontWeight: 600, fontSize: '11px' }}>
                    ● {node.status}
                  </span>
                </td>
                <td style={{ padding: '12px', textAlign: 'center' }}>
                  <button
                    onClick={() => pingNode(node.hub)}
                    style={{
                      padding: '4px 8px',
                      borderRadius: '6px',
                      background: '#f8fafc',
                      border: '1px solid var(--border, #e2e8f0)',
                      color: 'var(--foreground, #0f172a)',
                      fontSize: '11px',
                      cursor: 'pointer'
                    }}
                  >
                    Check IoT
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
