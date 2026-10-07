import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function InventoryPrediction() {
  const cardStyle = {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '22px 24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
  };

  const inventoryRisks = [];

  return (
    <DashboardLayout
      category="AI Assistant"
      subcategory="Inventory Prediction"
      title="Predictive Inventory & Stockout Early-Warning Radar"
      subtitle="Days-of-inventory runway modeling, autonomous safety stock calibration, and lead-time buffer analysis"
      icon="🛡️"
      badge="Early Warning System Active"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Imminent Stockout Risk" value="1 SKU" delta="4 Days Runway" trend="down" subtext="Apoquel 16mg" icon="⚠️" />
        <KpiCard label="Average Inventory Runway" value="38.4 Days" delta="Target: 30-45d" trend="neutral" subtext="Balanced working cap" icon="📅" />
        <KpiCard label="Excess / Slow-Moving Stock" value="₹0" delta="-18% vs Q2" trend="up" subtext="Promotional markdown" icon="📉" />
        <KpiCard label="Automated Reorder Accuracy" value="0.0%" delta="Zero stockout SLA" trend="up" subtext="Autonomous POs" icon="🤖" />
      </div>

      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Predicted Inventory Exhaustion & Reorder Calibration</h3>
          <span style={{ fontSize: '11px', color: '#64748b' }}>Forecast Model: Prophet + XGBoost</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>SKU</th>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>PHARMACEUTICAL / PRODUCT</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'right' }}>ON HAND</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'right' }}>DAILY BURN RATE</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'right' }}>RUNWAY LEFT</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'center' }}>PREDICTED STATUS</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'right' }}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {inventoryRisks.map((item, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 600, color: '#2563eb' }}>{item.sku}</td>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>{item.name}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{item.stock}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#64748b' }}>{item.burnRate}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: item.riskColor }}>{item.daysLeft}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                    <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '12px', background: `${item.riskColor}15`, color: item.riskColor }}>
                      {item.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <button
                      onClick={() => alert(`Expedited reorder dispatched for ${item.sku}`)}
                      style={{
                        padding: '5px 12px',
                        borderRadius: '6px',
                        border: '1px solid #2563eb',
                        background: '#eff6ff',
                        color: '#1d4ed8',
                        fontSize: '11px',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Instant Reorder
                    </button>
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
