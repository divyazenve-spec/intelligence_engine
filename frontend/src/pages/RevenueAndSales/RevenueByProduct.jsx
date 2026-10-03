import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function RevenueByProduct() {
  const products = [
    { name: 'Royal Canin Veterinary Diet', cat: 'Prescription Food', rev: '₹4,82,000', units: 820, margin: '38%', share: '27.0%' },
    { name: 'Bravecto Chewable Tick/Flea', cat: 'Preventive Care', rev: '₹3,94,000', units: 580, margin: '42%', share: '22.1%' },
    { name: 'General Vet Consultation', cat: 'Clinical Services', rev: '₹2,84,000', units: 440, margin: '68%', share: '15.9%' },
    { name: 'Zoetis Canine Core Vaccines', cat: 'Immunization', rev: '₹2,42,000', units: 360, margin: '48%', share: '13.6%' },
    { name: 'NexGard Spectra Antiparasitic', cat: 'Pharmacy', rev: '₹1,96,000', units: 290, margin: '40%', share: '11.0%' },
    { name: 'Full Health Blood Screening', cat: 'Diagnostics', rev: '₹1,86,000', units: 140, margin: '58%', share: '10.4%' }
  ];

  return (
    <DashboardLayout
      category="Revenue & Sales"
      subcategory="Revenue by Product"
      title="Product Catalog & Service Margins"
      subtitle="SKU-level profitability, unit velocity, and category sales attribution"
      icon="📦"
      badge="Top SKUs"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Top Revenue SKU" value="Royal Canin Diet" delta="₹4.82L rev" trend="up" subtext="27.0% catalog share" icon="📦" />
        <KpiCard label="Highest Margin SKU" value="Vet Consultation" delta="68% margin" trend="up" subtext="Clinical procedure" icon="🩺" />
        <KpiCard label="Total Units Moved" value="2,630" delta="+16.4%" trend="up" subtext="Across all SKUs" icon="📊" />
        <KpiCard label="Avg Product Margin" value="48.5%" delta="+2.1%" trend="up" subtext="Blended catalog" icon="💰" />
      </div>

      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>Top Products & Services Leaderboard</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))', color: 'var(--muted-foreground, #94a3b8)', fontSize: '11px' }}>
                <th style={{ padding: '8px 12px' }}>Product / Procedure Name</th>
                <th style={{ padding: '8px 12px' }}>Category</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Revenue</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Units Sold</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Gross Margin</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Catalog Share</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.name} style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.04))' }}>
                  <td style={{ padding: '12px', fontWeight: 700 }}>{p.name}</td>
                  <td style={{ padding: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>{p.cat}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{p.rev}</td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>{p.units}</td>
                  <td style={{ padding: '12px', textAlign: 'right', color: '#10b981', fontWeight: 600 }}>{p.margin}</td>
                  <td style={{ padding: '12px', textAlign: 'right', color: '#3b82f6', fontWeight: 600 }}>{p.share}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
