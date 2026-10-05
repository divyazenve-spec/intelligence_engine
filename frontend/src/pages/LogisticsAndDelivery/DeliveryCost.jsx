import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function DeliveryCost() {
  const costLines = [
    { component: 'Rider Payout (Per Drop Base)', internalEv: '₹28.00', partner3pl: '₹38.50', variance: '-₹10.50 (EV Saves 27%)', shareOfCost: '54.2%' },
    { component: 'Fuel & EV Battery Swapping', internalEv: '₹3.40', partner3pl: '₹8.20', variance: '-₹4.80 (EV Saves 58%)', shareOfCost: '12.4%' },
    { component: 'Packaging & Thermal Cold-Box Pouches', internalEv: '₹6.20', partner3pl: '₹6.20', variance: '₹0.00 (Standardized)', shareOfCost: '14.8%' },
    { component: 'Dispatch Telematics & SaaS Platform', internalEv: '₹1.80', partner3pl: '₹2.40', variance: '-₹0.60 (In-House)', shareOfCost: '5.1%' },
    { component: 'Failed Attempt Re-dispatch Buffer', internalEv: '₹1.10', partner3pl: '₹2.80', variance: '-₹1.70 (Higher EV OTP rate)', shareOfCost: '3.5%' },
    { component: 'Insurance & Transit Damage Guarantee', internalEv: '₹1.40', partner3pl: '₹1.40', variance: '₹0.00 (Shared)', shareOfCost: '10.0%' }
  ];

  return (
    <DashboardLayout
      category="Logistics & Delivery"
      subcategory="Delivery Cost"
      title="Delivery Cost Economics & Per-Drop Efficiency"
      subtitle="Unit economics of last-mile delivery, EV vs ICE cost comparison, packaging expenses, and hub efficiency"
      icon="💰"
      badge="₹41.90 Blended Cost Per Delivery"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Blended Cost / Drop" value="₹41.90" delta="-₹4.20 MoM" trend="up" subtext="Target < ₹45.00" icon="💰" />
        <KpiCard label="Internal EV Cost" value="₹38.20" delta="18% cheaper" trend="up" subtext="Own electric fleet" icon="⚡" />
        <KpiCard label="3PL Partner Cost" value="₹46.80" delta="Flex on-demand" trend="neutral" subtext="Surge & overflow" icon="🛵" />
        <KpiCard label="Monthly Fleet Spend" value="₹11.15 L" delta="-8.4% vs Budget" trend="up" subtext="26,600 deliveries" icon="📉" />
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
