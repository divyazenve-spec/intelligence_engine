import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function DemandForecast() {
  const cardStyle = {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '22px 24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
  };

  const demandItems = [];

  return (
    <DashboardLayout
      category="AI Assistant"
      subcategory="Demand Forecast"
      title="Predictive Demand & Category Velocity Forecasting"
      subtitle="SKU-level consumption projection, seasonal health surges, and procurement volume planning"
      icon="📦"
      badge="Demand Intelligence"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="SKUs with Surge Demand" value="28 SKUs" delta="+18% Surge" trend="up" subtext="Requires buffer stock" icon="⚡" />
        <KpiCard label="Fulfillment Availability" value="0.0%" delta="Zero Stockout" trend="up" subtext="Across 14 hubs" icon="✅" />
        <KpiCard label="Forecast Horizon" value="45 Days" delta="Rolling weekly" trend="neutral" subtext="Dynamic lead time" icon="📅" />
        <KpiCard label="Procurement Capital Plan" value="₹0" delta="-6.2% Bulk Disc" trend="up" subtext="Pre-negotiated" icon="💰" />
      </div>

      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>High-Velocity SKU Demand Projections (30 Days)</h3>
          <button
            onClick={() => alert('Automated Purchase Orders generated for all 4 surge SKUs')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: '1px solid #2563eb',
              background: '#2563eb',
              color: '#ffffff',
              fontSize: '11px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Generate Auto-PO →
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>SKU & CODE</th>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>PRODUCT NAME</th>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>CATEGORY</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'right' }}>ON HAND</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'right' }}>30D DEMAND</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'right' }}>GROWTH</th>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>RECOMMENDED REPLENISHMENT</th>
              </tr>
            </thead>
            <tbody>
              {demandItems.map((item, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 600, color: '#2563eb' }}>{item.sku}</td>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>{item.item}</td>
                  <td style={{ padding: '12px 16px', color: '#64748b' }}>{item.category}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{item.curStock}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#0f172a' }}>{item.demand30d}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 600, color: '#059669' }}>{item.surgePct}</td>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#b45309' }}>{item.replenishment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
