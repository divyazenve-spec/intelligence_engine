import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function SupplierPricing() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [search, setSearch] = useState('');

  const pricingData = [];

  const volumeTiers = [];

  const filtered = pricingData.filter(item => {
    if (selectedCategory !== 'ALL' && item.category !== selectedCategory) return false;
    if (search) {
      const q = search.toLowerCase();
      return item.sku.toLowerCase().includes(q) || item.name.toLowerCase().includes(q) || item.vendor.toLowerCase().includes(q);
    }
    return true;
  });

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(255,255,255,0.08))', borderRadius: '12px', padding: '22px 24px' };

  const getParityBadge = (status) => {
    switch (status) {
      case 'Best Price': return { bg: 'rgba(52,211,153,0.15)', color: '#34d399' };
      case 'Exclusive': return { bg: 'rgba(167,139,250,0.15)', color: '#a78bfa' };
      case 'Negotiated': return { bg: 'rgba(56,189,248,0.15)', color: '#38bdf8' };
      case 'Review Due': return { bg: 'rgba(251,191,36,0.15)', color: '#fbbf24' };
      default: return { bg: 'rgba(148,163,184,0.15)', color: 'var(--muted-foreground, #64748b)' };
    }
  };

  return (
    <DashboardLayout
      category="Vendors & Procurement"
      subcategory="Supplier Pricing"
      title="Contracted Supplier Pricing & Rate Benchmarking"
      subtitle="Master SKU pricing schedules, negotiated discounts against MSRP, volume tier rebates, and price lock validity"
      icon="🏷️"
      badge="Rate Master FY26-27"
      actions={
        <button onClick={() => alert('Initiating Price Benchmark & Renegotiation Review...')} style={{ padding: '6px 14px', borderRadius: '8px', border: '1px solid #3b82f6', background: 'rgba(59,130,246,0.15)', color: '#60a5fa', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
          ⚖️ Benchmark Review
        </button>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Contracted SKUs" value="1,420 Items" delta="100% price locked" trend="up" subtext="Under master agreements" icon="📋" />
        <KpiCard label="Avg. Discount vs MSRP" value="0.0%" delta="+2.4% vs FY25" trend="up" subtext="Network-wide average" icon="🏷️" />
        <KpiCard label="Active Price Locks" value="0.0%" delta="Protected through FY27" trend="up" subtext="Inflation hedge" icon="🔒" />
        <KpiCard label="Price Reviews Due (<60d)" value="2 Agreements" delta="Royal Canin Nutrition" trend="neutral" subtext="Renewal negotiations scheduled" icon="⏳" />
        <KpiCard label="Generic Arbitrage Margin" value="0.0%" delta="+12.8% vs branded" trend="up" subtext="NSAIDs & Antibiotics" icon="💊" />
        <KpiCard label="Enterprise Volume Rebate" value="₹0" delta="Earned YTD" trend="up" subtext="Tier 2 & 3 order bonuses" icon="💵" />
      </div>

      {/* Volume Tier Matrix */}
      <div style={card}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>📦 Volume Discount & Rebate Matrix</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
          {volumeTiers.map((vt, i) => (
            <div key={i} style={{ background: 'var(--muted, #f8fafc)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '16px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#38bdf8', marginBottom: '4px' }}>{vt.tier}</div>
              <div style={{ fontSize: '12px', color: 'var(--muted-foreground, #64748b)', marginBottom: '8px' }}>MOQ Bracket: <strong style={{ color: 'var(--foreground, #0f172a)' }}>{vt.qtyRange}</strong></div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#34d399', marginBottom: '6px' }}>{vt.discount}</div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>Terms: {vt.paymentTerms}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Table */}
      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>🏷️ Master SKU Price Schedule</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Real-time rate cards, MSRP benchmark comparison, and contractual price locks</p>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search SKU, medication, vendor..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.15))', borderRadius: '6px', padding: '6px 12px', color: 'var(--foreground, #0f172a)', fontSize: '12px', minWidth: '220px' }}
            />
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              style={{ background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.15))', borderRadius: '6px', padding: '6px 10px', color: 'var(--foreground, #0f172a)', fontSize: '12px' }}
            >
              <option value="ALL">All Product Categories</option>
              <option value="Vaccines & Biologics">Vaccines & Biologics</option>
              <option value="Antiparasitic & Rx">Antiparasitic & Rx</option>
              <option value="Surgical Implants">Surgical Implants</option>
              <option value="Veterinary Nutrition">Veterinary Nutrition</option>
              <option value="Dermatology & Topicals">Dermatology & Topicals</option>
              <option value="Generic APIs & NSAID">Generic APIs & NSAID</option>
            </select>
          </div>
        </div>

        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'var(--muted, #f8fafc)', borderBottom: '1px solid var(--border, rgba(0,0,0,0.08))' }}>
                {['SKU Code', 'Product Description', 'Contracted Vendor', 'Category', 'MSRP (List)', 'Contracted Rate', 'Discount %', 'Min Order Qty', 'Price Lock Until', 'Parity Status'].map(h => (
                  <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: 'var(--muted-foreground, #64748b)', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, i) => {
                const badge = getParityBadge(item.parityStatus);
                return (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border, rgba(0,0,0,0.06))' }}>
                    <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', color: '#38bdf8', fontSize: '11px' }}>{item.sku}</td>
                    <td style={{ padding: '11px 12px', color: 'var(--foreground, #0f172a)', fontWeight: 600 }}>{item.name}</td>
                    <td style={{ padding: '11px 12px', color: 'var(--foreground, #334155)' }}>{item.vendor}</td>
                    <td style={{ padding: '11px 12px', color: 'var(--muted-foreground, #64748b)' }}>{item.category}</td>
                    <td style={{ padding: '11px 12px', color: '#64748b', textDecoration: 'line-through' }}>{item.msrp}</td>
                    <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#34d399' }}>{item.contractedPrice}</td>
                    <td style={{ padding: '11px 12px', fontWeight: 700, color: '#a78bfa' }}>-{item.discountPct}%</td>
                    <td style={{ padding: '11px 12px', color: 'var(--foreground, #334155)' }}>{item.minOrderQty}</td>
                    <td style={{ padding: '11px 12px', color: '#64748b', fontSize: '11px' }}>{item.priceLockUntil}</td>
                    <td style={{ padding: '11px 12px' }}>
                      <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, background: badge.bg, color: badge.color }}>
                        {item.parityStatus}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}