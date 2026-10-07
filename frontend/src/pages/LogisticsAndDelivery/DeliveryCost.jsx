import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function DeliveryCost() {
  const costLines = [];

  return (
    <DashboardLayout
      category="Logistics & Delivery"
      subcategory="Delivery Cost"
      title="Delivery Cost Economics & Per-Drop Efficiency"
      subtitle="Unit economics of last-mile delivery, EV vs ICE cost comparison, packaging expenses, and hub efficiency"
      icon="💰"
      badge="₹0 Cost Per Delivery"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Blended Cost / Drop" value="₹0" delta="-₹0" trend="up" subtext="Target < ₹0" icon="💰" />
        <KpiCard label="Internal EV Cost" value="₹0" delta="18% cheaper" trend="up" subtext="Own electric fleet" icon="⚡" />
        <KpiCard label="3PL Partner Cost" value="₹0" delta="Flex on-demand" trend="neutral" subtext="Surge & overflow" icon="🛵" />
        <KpiCard label="Monthly Fleet Spend" value="₹0" delta="-8.4% vs Budget" trend="up" subtext="26,600 deliveries" icon="📉" />
      </div>

      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Delivery Cost Component Breakdown</h3>
          <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>Granular per-delivery line items: Internal EV Fleet vs Partner 3PL comparison</p>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', color: '#64748b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Cost Component</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Internal EV Fleet</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Partner 3PL</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Variance (EV Advantage)</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Share of Cost</th>
              </tr>
            </thead>
            <tbody>
              {costLines.map(c => (
                <tr key={c.component} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>{c.component}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 700, color: '#16a34a', fontFamily: '"IBM Plex Mono", monospace' }}>{c.internalEv}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 600, color: '#64748b', fontFamily: '"IBM Plex Mono", monospace' }}>{c.partner3pl}</td>
                  <td style={{ padding: '12px 16px', color: '#2563eb', fontWeight: 600 }}>{c.variance}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', color: '#475569', fontWeight: 600 }}>{c.shareOfCost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
