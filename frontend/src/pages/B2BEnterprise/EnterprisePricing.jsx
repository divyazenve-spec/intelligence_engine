import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function EnterprisePricing() {
  const tiers = [
    { tier: 'Tier 1 — Strategic Institutional', minOrder: '₹5,00,000+', discount: 'Base MRP - 32%', paymentTerms: 'Net 60 Days', freight: 'Free Temperature Reefer', rebate: '3% Annual Volume Rebate', minCommit: '₹20L / Year' },
    { tier: 'Tier 2 — Hospital & Clinic Chain', minOrder: '₹2,00,000+', discount: 'Base MRP - 26%', paymentTerms: 'Net 45 Days', freight: 'Free Surface Freight', rebate: '2% Annual Volume Rebate', minCommit: '₹10L / Year' },
    { tier: 'Tier 3 — Breeder & Kennel Club', minOrder: '₹75,000+', discount: 'Base MRP - 20%', paymentTerms: 'Net 30 Days', freight: 'Shared Freight (50%)', rebate: '1% Semi-Annual Rebate', minCommit: '₹4L / Year' },
    { tier: 'Tier 4 — Corporate Employee Benefit', minOrder: 'Voucher Based', discount: 'Base MRP - 18%', paymentTerms: 'Net 30 Days Monthly Bill', freight: 'Free to Employee Doorstep', rebate: 'Dedicated Account Perks', minCommit: '50+ Pets Enrolled' }
  ];

  const skus = [
    { sku: 'B2B-VAC-DHPPi', name: 'Nobivac DHPPi 25-Vial Bulk Pack', retailMrp: '₹14,500', tier1: '₹9,860', tier2: '₹10,730', tier3: '₹11,600', minQty: '5 packs' },
    { sku: 'B2B-ANT-BRV-01', name: 'Bravecto Chewable Tablets (Carton of 40)', retailMrp: '₹58,000', tier1: '₹39,440', tier2: '₹42,920', tier3: '₹46,400', minQty: '2 cartons' },
    { sku: 'B2B-NUTR-RC-04', name: 'Royal Canin Professional Maxi Adult (15kg Pallet x 20)', retailMrp: '₹1,56,000', tier1: '₹1,06,080', tier2: '₹1,15,440', tier3: '₹1,24,800', minQty: '1 pallet' },
    { sku: 'B2B-GRM-SHMP-10', name: 'Oatmeal Hypoallergenic Shampoo (25L Drum)', retailMrp: '₹18,500', tier1: '₹12,580', tier2: '₹13,690', tier3: '₹14,800', minQty: '2 drums' }
  ];

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="B2B / Enterprise"
      subcategory="Enterprise Pricing"
      title="Enterprise Tiered Pricing & Rate Cards"
      subtitle="Volume discount tiers, institutional master rate cards, MOQs, and corporate price lock guarantees"
      icon="🏷️"
      badge="Tier 1-4 Matrices"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Average Volume Discount" value="26.4%" delta="Protected floor 22%" trend="up" subtext="Guaranteed margin positive" icon="🏷️" />
        <KpiCard label="Annual Price Locked SKUs" value="480 SKUs" delta="12-month lock" trend="up" subtext="Inflation protected" icon="🔒" />
        <KpiCard label="Enterprise Rebates Issued" value="₹3.18 Lakh" delta="YTD Paid" trend="up" subtext="Volume threshold bonuses" icon="💵" />
        <KpiCard label="Minimum Order Quantity (MOQ)" value="₹75,000" delta="Tier 3 entry" trend="neutral" subtext="Strict wholesale gating" icon="📦" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
        <div style={card}>
          <h3 style={{ margin: '0 0 12px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>Volume Discount Tiers & Commercial Matrix</h3>
          <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Commercial threshold tiers, minimum order quantities, and annual volume rebates</p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)' }}>
                  <th style={{ padding: '10px 12px' }}>Tier Name</th>
                  <th style={{ padding: '10px 12px' }}>Min Order Value</th>
                  <th style={{ padding: '10px 12px' }}>Discount Off MRP</th>
                  <th style={{ padding: '10px 12px' }}>Payment Terms</th>
                  <th style={{ padding: '10px 12px' }}>Freight Policy</th>
                  <th style={{ padding: '10px 12px' }}>Volume Rebate</th>
                </tr>
              </thead>
              <tbody>
                {tiers.map(t => (
                  <tr key={t.tier} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{t.tier}</td>
                    <td style={{ padding: '12px', fontWeight: 600, color: '#4338ca' }}>{t.minOrder}</td>
                    <td style={{ padding: '12px', fontWeight: 600, color: '#059669' }}>{t.discount}</td>
                    <td style={{ padding: '12px' }}>{t.paymentTerms}</td>
                    <td style={{ padding: '12px' }}>{t.freight}</td>
                    <td style={{ padding: '12px', color: '#64748b' }}>{t.rebate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={card}>
          <h3 style={{ margin: '0 0 12px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>High-Velocity Master SKU Rate Card</h3>
          <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Contracted bulk unit pricing across Tier 1, Tier 2, and Tier 3</p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)' }}>
                  <th style={{ padding: '10px 12px' }}>SKU Code</th>
                  <th style={{ padding: '10px 12px' }}>Product Description</th>
                  <th style={{ padding: '10px 12px' }}>Standard MRP</th>
                  <th style={{ padding: '10px 12px' }}>Tier 1 Price</th>
                  <th style={{ padding: '10px 12px' }}>Tier 2 Price</th>
                  <th style={{ padding: '10px 12px' }}>Tier 3 Price</th>
                  <th style={{ padding: '10px 12px' }}>MOQ</th>
                </tr>
              </thead>
              <tbody>
                {skus.map(s => (
                  <tr key={s.sku} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                    <td style={{ padding: '12px', fontFamily: 'monospace', fontWeight: 600 }}>{s.sku}</td>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{s.name}</td>
                    <td style={{ padding: '12px', color: '#64748b' }}>{s.retailMrp}</td>
                    <td style={{ padding: '12px', fontWeight: 600, color: '#059669' }}>{s.tier1}</td>
                    <td style={{ padding: '12px', fontWeight: 600, color: '#4338ca' }}>{s.tier2}</td>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{s.tier3}</td>
                    <td style={{ padding: '12px' }}>{s.minQty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
