import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function TradeLogistics() {
  const legs = [];

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Import & Export"
      subcategory="Logistics"
      title="International Ocean, Air & Reefer Multimodal Corridors"
      subtitle="Cross-border freight forwarding, maritime vessel telemetry, cold-chain flight routes, and container yard milestones"
      icon="🚢"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Active Global Freight Corridors" value="4 Multi-modal Legs" delta="Ocean & Air Cargo" trend="up" subtext="Direct OEM routing" icon="🚢" />
        <KpiCard label="Cold-Chain Marine IoT" value="99.9% In-Range" delta="2°C to 8°C continuous" trend="up" subtext="Zero thermal deviations" icon="❄️" />
        <KpiCard label="Freight Cost per Kg" value="₹0 / kg" delta="-12.4% vs Spot Rate" trend="up" subtext="Annual volume contracted" icon="💰" />
        <KpiCard label="Average Port Clearance" value="36 Hours" delta="Direct to Central Reefer" trend="up" subtext="Direct Port Delivery (DPD)" icon="⚡" />
      </div>

      <div style={card}>
        <h3 style={{ margin: '0 0 12px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>Live Cross-Border Freight Telematics & Movement</h3>
        <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Vessel tracking, air cargo waybills, in-transit temperatures, and port milestone progress</p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)' }}>
                <th style={{ padding: '10px 12px' }}>Corridor Code</th>
                <th style={{ padding: '10px 12px' }}>Trade Route</th>
                <th style={{ padding: '10px 12px' }}>Carrier & Vessel/Flight</th>
                <th style={{ padding: '10px 12px' }}>Transport Mode</th>
                <th style={{ padding: '10px 12px' }}>Temperature Telemetry</th>
                <th style={{ padding: '10px 12px' }}>Transit Duration</th>
                <th style={{ padding: '10px 12px' }}>Current Geo Location</th>
                <th style={{ padding: '10px 12px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {legs.map(l => (
                <tr key={l.track} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                  <td style={{ padding: '12px', fontFamily: 'monospace', fontWeight: 600 }}>{l.track}</td>
                  <td style={{ padding: '12px', fontWeight: 600 }}>{l.route}</td>
                  <td style={{ padding: '12px' }}>{l.carrier}</td>
                  <td style={{ padding: '12px' }}>{l.mode}</td>
                  <td style={{ padding: '12px', color: '#0891b2', fontWeight: 600 }}>{l.temp}</td>
                  <td style={{ padding: '12px' }}>{l.transitTime}</td>
                  <td style={{ padding: '12px' }}>{l.currentLoc}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ padding: '3px 8px', borderRadius: '999px', fontSize: '10px', fontWeight: 600, background: 'rgba(8,145,178,0.12)', color: '#0e7490' }}>
                      {l.status}
                    </span>
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
