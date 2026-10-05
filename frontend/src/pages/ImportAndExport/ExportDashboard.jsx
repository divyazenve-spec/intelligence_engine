import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function ExportDashboard() {
  const shipments = [
    { sb: 'SB-EXP-4101', destination: 'Dubai, UAE', client: 'Royal Pets Veterinary Hospital LLC', product: 'Zenve Bespoke Haute Couture Leather Collars & Leashes', mode: 'Air Cargo (Emirates)', fobValue: '₹14,50,000', shippingBill: 'Let Export Order (LEO)', date: '2026-10-04', status: 'Dispatched' },
    { sb: 'SB-EXP-4102', destination: 'Singapore', client: 'PetLovers Centre APAC Pte Ltd', product: 'Organic Ayurvedic Herbal Pet Grooming Range (2000u)', mode: 'Sea Freight (FCL)', fobValue: '₹22,80,000', shippingBill: 'Customs Passed', date: '2026-10-02', status: 'On Board Vessel' },
    { sb: 'SB-EXP-4103', destination: 'London, UK', client: 'Mayfair Canine Atelier Ltd', product: 'Bespoke Satin Wedding Tuxedos & Monogrammed Vests', mode: 'Courier Express (DHL)', fobValue: '₹8,90,000', shippingBill: 'Delivered to UK Hub', date: '2026-09-30', status: 'Delivered' },
    { sb: 'SB-EXP-4104', destination: 'Riyadh, Saudi Arabia', client: 'Arabian Falcon & Pet Healthcare Co', product: 'Equine & Canine Surgical Suture Implants', mode: 'Air Cargo (Saudia)', fobValue: '₹18,20,000', shippingBill: 'Duty Drawback Filed', date: '2026-10-03', status: 'In Flight' }
  ];

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Import & Export"
      subcategory="Export Dashboard"
      title="International Export Sales & Global Trade"
      subtitle="Overseas market shipments, foreign exchange (Forex) remittances, Letter of Credit (LC) execution, and export duty incentives"
      icon="🛫"
      badge="₹64.4L MTD Exports"
      actions={
        <button onClick={() => alert('New Export Shipping Bill creation opened...')} style={{ padding: '6px 14px', borderRadius: '8px', border: '1px solid #0891b2', background: 'rgba(8,145,178,0.12)', color: '#0e7490', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
          + Create Export Consignment
        </button>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Export Revenue (MTD)" value="₹64.40 Lakh" delta="+42.5% YoY" trend="up" subtext="FOB Realization ($78.2K USD)" icon="🛫" />
        <KpiCard label="Export Destinations" value="7 Countries" delta="UAE, SG, UK, KSA, QA" trend="up" subtext="Expanding to US in Q1" icon="🌍" />
        <KpiCard label="Letter of Credit (LC) Adherence" value="100% Sight LC" delta="Zero payment default" trend="up" subtext="First-class international banks" icon="📑" />
        <KpiCard label="Duty Drawback / RoDTEP" value="₹3.22 Lakh" delta="5% export incentive" trend="up" subtext="Auto-credited to bank" icon="💵" />
      </div>

      <div style={card}>
        <h3 style={{ margin: '0 0 12px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>🛫 Outbound Export Shipments & Foreign Trade Orders</h3>
        <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Shipping Bills, destination clearance, Freight on Board (FOB) valuation, and cargo dispatch</p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)' }}>
                <th style={{ padding: '10px 12px' }}>Shipping Bill #</th>
                <th style={{ padding: '10px 12px' }}>Destination</th>
                <th style={{ padding: '10px 12px' }}>Foreign Importer</th>
                <th style={{ padding: '10px 12px' }}>Product Line</th>
                <th style={{ padding: '10px 12px' }}>FOB Value</th>
                <th style={{ padding: '10px 12px' }}>Customs Clearance</th>
                <th style={{ padding: '10px 12px' }}>Dispatch Date</th>
                <th style={{ padding: '10px 12px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {shipments.map(s => (
                <tr key={s.sb} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                  <td style={{ padding: '12px', fontFamily: 'monospace', fontWeight: 600 }}>{s.sb}</td>
                  <td style={{ padding: '12px', fontWeight: 600 }}>{s.destination}</td>
                  <td style={{ padding: '12px' }}>{s.client}</td>
                  <td style={{ padding: '12px' }}>{s.product}</td>
                  <td style={{ padding: '12px', fontWeight: 600, color: '#059669' }}>{s.fobValue}</td>
                  <td style={{ padding: '12px' }}>{s.shippingBill}</td>
                  <td style={{ padding: '12px' }}>{s.date}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '999px',
                      fontSize: '10px',
                      fontWeight: 600,
                      background: s.status === 'Delivered' ? 'rgba(16,185,129,0.12)' : 'rgba(8,145,178,0.12)',
                      color: s.status === 'Delivered' ? '#059669' : '#0e7490'
                    }}>
                      {s.status}
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
