import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function FashionProducts() {
  const [selectedCat, setSelectedCat] = useState('ALL');
  const [search, setSearch] = useState('');

  const products = [];

  const filtered = products.filter(p => {
    if (selectedCat !== 'ALL' && p.category !== selectedCat) return false;
    if (search) {
      const q = search.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.material.toLowerCase().includes(q);
    }
    return true;
  });

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(255,255,255,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Zenve Fashion"
      subcategory="Product Catalog"
      title="Haute Couture Product Line & Sizing Master"
      subtitle="Bespoke pet apparel catalog, fabric specifications, ergonomic sizing matrices, and retail inventory valuation"
      icon="👗"
      badge=""
      actions={
        <button onClick={() => alert('Adding New Fashion Apparel Style...')} style={{ padding: '6px 14px', borderRadius: '8px', border: '1px solid #ec4899', background: 'rgba(236,72,153,0.15)', color: '#f472b6', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
          + Add New Style
        </button>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Active Fashion SKUs" value="142 Styles" delta="6 Core Categories" trend="up" subtext="Bespoke + Ready-to-wear" icon="👗" />
        <KpiCard label="Avg. Retail Price (ASP)" value="₹0" delta="+12.4% YoY" trend="up" subtext="Premium fabric upgrade" icon="🏷️" />
        <KpiCard label="Average Product Margin" value="0.0%" delta="+2.8% vs FY25" trend="up" subtext="In-house artisan atelier" icon="💎" />
        <KpiCard label="Eco-Certified Fabrics" value="100% Cotton/Wool" delta="OEKO-TEX Class 1" trend="up" subtext="Hypoallergenic pet-safe" icon="🌱" />
        <KpiCard label="Low Stock Styles" value="4 SKUs" delta="Under 30 days cover" trend="warn" subtext="Production run ordered" icon="⚠️" />
        <KpiCard label="Custom Atelier Queue" value="34 Orders" delta="7-day tailoring TAT" trend="up" subtext="Wedding & gala apparel" icon="✂️" />
      </div>

      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>👗 Pet Fashion Master Catalog</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Fabrics, ergonomic cut specifications, and production unit economics</p>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search SKU, name, fabric..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.15))', borderRadius: '6px', padding: '6px 12px', color: 'var(--foreground, #0f172a)', fontSize: '12px', minWidth: '220px' }}
            />
            <select
              value={selectedCat}
              onChange={e => setSelectedCat(e.target.value)}
              style={{ background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.15))', borderRadius: '6px', padding: '6px 10px', color: 'var(--foreground, #0f172a)', fontSize: '12px' }}
            >
              <option value="ALL">All Categories</option>
              <option value="Ergonomic Harnesses">Ergonomic Harnesses</option>
              <option value="Weatherwear">Weatherwear</option>
              <option value="Winter Knits">Winter Knits</option>
              <option value="Collars & Leashes">Collars & Leashes</option>
              <option value="Accessories">Accessories</option>
              <option value="Footwear">Footwear</option>
              <option value="Loungewear">Loungewear</option>
              <option value="Formal Atelier">Formal Atelier</option>
            </select>
          </div>
        </div>

        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'var(--muted, #f8fafc)', borderBottom: '1px solid var(--border, rgba(0,0,0,0.08))' }}>
                {['SKU', 'Product Name', 'Category', 'Target Pet', 'Sizes', 'Fabric & Material', 'Retail Price', 'COGS Unit', 'Stock', 'Status'].map(h => (
                  <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: 'var(--muted-foreground, #64748b)', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border, rgba(0,0,0,0.06))' }}>
                  <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', color: '#f472b6', fontSize: '11px', fontWeight: 600 }}>{p.sku}</td>
                  <td style={{ padding: '11px 12px', fontWeight: 600, color: 'var(--foreground, #0f172a)' }}>{p.name}</td>
                  <td style={{ padding: '11px 12px', color: 'var(--muted-foreground, #64748b)' }}>{p.category}</td>
                  <td style={{ padding: '11px 12px', color: 'var(--foreground, #334155)' }}>{p.petType}</td>
                  <td style={{ padding: '11px 12px', color: '#a78bfa' }}>{p.sizes}</td>
                  <td style={{ padding: '11px 12px', color: 'var(--muted-foreground, #64748b)', fontSize: '11px' }}>{p.material}</td>
                  <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#34d399' }}>{p.price}</td>
                  <td style={{ padding: '11px 12px', color: '#64748b' }}>{p.cost}</td>
                  <td style={{ padding: '11px 12px', color: 'var(--foreground, #0f172a)', fontWeight: 600 }}>{p.stock}</td>
                  <td style={{ padding: '11px 12px' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, background: p.status === 'In Stock' ? 'rgba(52,211,153,0.15)' : p.status === 'Low Stock' ? 'rgba(251,191,36,0.15)' : 'rgba(167,139,250,0.15)', color: p.status === 'In Stock' ? '#34d399' : p.status === 'Low Stock' ? '#fbbf24' : '#a78bfa' }}>
                      {p.status}
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
