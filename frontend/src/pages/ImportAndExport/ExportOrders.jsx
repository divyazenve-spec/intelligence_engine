import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function ExportOrders() {
  const orders = [
    { expPo: 'XPO-2026-031', buyer: 'Royal Pets Hospital LLC (Dubai)', country: 'United Arab Emirates', items: 'Italian Leather Collars & Custom Harness Sets', val: '$18,500 (~₹15.5L)', terms: 'FOB Nhava Sheva (Sight LC)', dispatch: '2026-10-04', payment: 'LC Confirmed', status: 'In Transit' },
    { expPo: 'XPO-2026-032', buyer: 'PetLovers Centre APAC (Singapore)', country: 'Singapore', items: 'Organic Neem & Aloe Herbal Pet Shampoos', val: '$28,000 (~₹23.5L)', terms: 'CIF Singapore (TT 30% Adv)', dispatch: '2026-10-01', payment: '70% Balance Due', status: 'Customs Passed (SG)' },
    { expPo: 'XPO-2026-033', buyer: 'Mayfair Canine Atelier (London)', country: 'United Kingdom', items: 'Bespoke Satin Wedding Tuxedos & Monogrammed Vests', val: '£9,800 (~₹10.8L)', terms: 'DAP London (Card / Wire)', dispatch: '2026-09-28', payment: '100% Advance Paid', status: 'Delivered' },
    { expPo: 'XPO-2026-034', buyer: 'Arabian Falcon & Pet Healthcare (Riyadh)', country: 'Saudi Arabia', items: 'Veterinary Titanium Orthopedic Bone Screws', val: '$16,000 (~₹13.4L)', terms: 'FOB Mumbai (LC 60D)', dispatch: '2026-10-03', payment: 'LC Confirmed', status: 'Dispatched (Air)' }
  ];

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Import & Export"
      subcategory="Export Orders"
      title="International Export Sales Orders & Invoicing"
      subtitle="Overseas commercial sales orders, foreign bank letters of credit, customs shipping bill filings, and cargo manifests"
      icon="📦"
      badge="₹63.2L Active Orders"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Active Export Orders" value="4 Consignments" delta="$72.3K USD Value" trend="up" subtext="Middle East & APAC" icon="📦" />
        <KpiCard label="Export Order Realization" value="100% Secured" delta="LC + Advance wire" trend="up" subtext="Zero bad debt risk" icon="🛡️" />
        <KpiCard label="Avg Export Ticket Size" value="₹15.8 Lakh" delta="+18.4% YoY" trend="up" subtext="High-value luxury apparel" icon="💰" />
        <KpiCard label="Export Airway Days" value="3.2 Days" delta="Direct express flights" trend="up" subtext="BOM/BLR to DXB/SIN" icon="⚡" />
      </div>

      <div style={card}>
        <h3 style={{ margin: '0 0 12px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>International Export Sales Orders</h3>
        <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Foreign buyer details, export items, contract terms, and payment status</p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)' }}>
                <th style={{ padding: '10px 12px' }}>Export Order #</th>
                <th style={{ padding: '10px 12px' }}>Foreign Buyer Entity</th>
                <th style={{ padding: '10px 12px' }}>Destination Country</th>
                <th style={{ padding: '10px 12px' }}>Goods Description</th>
                <th style={{ padding: '10px 12px' }}>Forex Value</th>
                <th style={{ padding: '10px 12px' }}>Payment Terms</th>
                <th style={{ padding: '10px 12px' }}>Dispatch</th>
                <th style={{ padding: '10px 12px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.expPo} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                  <td style={{ padding: '12px', fontFamily: 'monospace', fontWeight: 600 }}>{o.expPo}</td>
                  <td style={{ padding: '12px', fontWeight: 600 }}>{o.buyer}</td>
                  <td style={{ padding: '12px' }}>{o.country}</td>
                  <td style={{ padding: '12px' }}>{o.items}</td>
                  <td style={{ padding: '12px', fontWeight: 600, color: '#059669' }}>{o.val}</td>
                  <td style={{ padding: '12px' }}>{o.payment} ({o.terms})</td>
                  <td style={{ padding: '12px' }}>{o.dispatch}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '999px',
                      fontSize: '10px',
                      fontWeight: 600,
                      background: o.status === 'Delivered' ? 'rgba(16,185,129,0.12)' : 'rgba(8,145,178,0.12)',
                      color: o.status === 'Delivered' ? '#059669' : '#0e7490'
                    }}>
                      {o.status}
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
