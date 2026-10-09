import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function EnterprisePricing() {
  const tiers = [];

  const skus = [];

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="B2B / Enterprise"
      subcategory="Enterprise Pricing"
      title="Enterprise Tiered Pricing & Rate Cards"
      subtitle="Volume discount tiers, institutional master rate cards, MOQs, and corporate price lock guarantees"
      icon="🏷️"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Average Volume Discount" value="0.0%" delta="0.0%" trend="neutral" subtext="No active records" icon="🏷️" />
        <KpiCard label="Annual Price Locked SKUs" value="0 SKUs" delta="" trend="neutral" subtext="No active records" icon="🔒" />
        <KpiCard label="Enterprise Rebates Issued" value="₹0" delta="" trend="neutral" subtext="No active records" icon="💵" />
        <KpiCard label="Minimum Order Quantity (MOQ)" value="₹0" delta="" trend="neutral" subtext="No active records" icon="📦" />
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
                {tiers.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ padding: '24px', textAlign: 'center', color: 'var(--muted-foreground, #64748b)' }}>
                      No volume discount tiers found
                    </td>
                  </tr>
                ) : (
                  tiers.map(t => (
                    <tr key={t.tier} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                      <td style={{ padding: '12px', fontWeight: 600 }}>{t.tier}</td>
                      <td style={{ padding: '12px', fontWeight: 600, color: '#4338ca' }}>{t.minOrder}</td>
                      <td style={{ padding: '12px', fontWeight: 600, color: '#059669' }}>{t.discount}</td>
                      <td style={{ padding: '12px' }}>{t.paymentTerms}</td>
                      <td style={{ padding: '12px' }}>{t.freight}</td>
                      <td style={{ padding: '12px', color: '#64748b' }}>{t.rebate}</td>
                    </tr>
                  ))
                )}
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
                {skus.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ padding: '24px', textAlign: 'center', color: 'var(--muted-foreground, #64748b)' }}>
                      No master SKU rate cards found
                    </td>
                  </tr>
                ) : (
                  skus.map(s => (
                    <tr key={s.sku} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                      <td style={{ padding: '12px', fontFamily: 'monospace', fontWeight: 600 }}>{s.sku}</td>
                      <td style={{ padding: '12px', fontWeight: 600 }}>{s.name}</td>
                      <td style={{ padding: '12px', color: '#64748b' }}>{s.retailMrp}</td>
                      <td style={{ padding: '12px', fontWeight: 600, color: '#059669' }}>{s.tier1}</td>
                      <td style={{ padding: '12px', fontWeight: 600, color: '#4338ca' }}>{s.tier2}</td>
                      <td style={{ padding: '12px', fontWeight: 600 }}>{s.tier3}</td>
                      <td style={{ padding: '12px' }}>{s.minQty}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
