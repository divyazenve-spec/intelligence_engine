import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function FashionProducts() {
  const [selectedCat, setSelectedCat] = useState('ALL');
  const [search, setSearch] = useState('');

  const products = [
    { sku: 'ZVF-HARN-01', name: 'Signature Italian Leather Harness', category: 'Ergonomic Harnesses', petType: 'Dog (All Breeds)', sizes: 'S, M, L, XL', material: 'Full-Grain Italian Nappa Leather', price: '₹3,450', cost: '₹1,090', stock: 184, status: 'In Stock' },
    { sku: 'ZVF-COAT-04', name: 'Monsoon Waterproof Reflective Parka', category: 'Weatherwear', petType: 'Dog (Medium/Large)', sizes: 'M, L, XL, XXL', material: '3-Ply Breathable Ripstop Nylon', price: '₹2,850', cost: '₹980', stock: 240, status: 'In Stock' },
    { sku: 'ZVF-KNIT-09', name: 'Cashmere-Blend Cable Knit Sweater', category: 'Winter Knits', petType: 'Dog & Cat', sizes: 'XS, S, M, L', material: 'Cashmere & Merino Wool Blend', price: '₹2,400', cost: '₹690', stock: 112, status: 'In Stock' },
    { sku: 'ZVF-COLL-02', name: 'Velvet Midnight Rose Gold Collar', category: 'Collars & Leashes', petType: 'Universal', sizes: 'S, M, L', material: 'Plush Velvet & Solid Brass', price: '₹1,650', cost: '₹420', stock: 320, status: 'In Stock' },
    { sku: 'ZVF-BAND-05', name: 'Hand-Embroidered Festive Brocade Bandana', category: 'Accessories', petType: 'Universal', sizes: 'XS, S, M, L', material: 'Pure Banarasi Silk & Cotton', price: '₹850', cost: '₹185', stock: 450, status: 'In Stock' },
    { sku: 'ZVF-BOOT-03', name: 'All-Terrain Protective Paw Boots (Set of 4)', category: 'Footwear', petType: 'Dog (Active)', sizes: 'S, M, L, XL', material: 'Silicone Grip & Waterproof Neoprene', price: '₹1,950', cost: '₹620', stock: 85, status: 'Low Stock' },
    { sku: 'ZVF-ROBE-07', name: 'Post-Bath Microfiber Spa Robe', category: 'Loungewear', petType: 'Dog & Cat', sizes: 'S, M, L, XL', material: '400 GSM Quick-Dry Microfiber', price: '₹1,450', cost: '₹410', stock: 160, status: 'In Stock' },
    { sku: 'ZVF-TUX-11', name: 'Bespoke Satin Wedding Tuxedo & Bowtie', category: 'Formal Atelier', petType: 'Custom Tailored', sizes: 'Made to Measure', material: 'Italian Satin & Pearl Buttons', price: '₹4,950', cost: '₹1,450', stock: 34, status: 'Atelier Queue' },
    { sku: 'ZVF-COOL-08', name: 'Hydro-Active Cooling Summer Vest', category: 'Weatherwear', petType: 'Dog (Heat Sensitive)', sizes: 'S, M, L, XL', material: 'Evaporative Cooling Polymer Mesh', price: '₹2,150', cost: '₹680', stock: 195, status: 'In Stock' },
    { sku: 'ZVF-BOWT-01', name: 'Designer Tartan Quick-Snap Bowtie', category: 'Accessories', petType: 'Universal', sizes: 'Adjustable', material: 'Scottish Wool Tartan', price: '₹590', cost: '₹120', stock: 380, status: 'In Stock' }
  ];

  const filtered = products.filter(p => {
    if (selectedCat !== 'ALL' && p.category !== selectedCat) return false;
    if (search) {
      const q = search.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.material.toLowerCase().includes(q);
    }
    return true;
  });

  const card = { background: 'var(--card, #131d2e)', border: '1px solid var(--border, rgba(255,255,255,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Zenve Fashion"
      subcategory="Product Catalog"
      title="Haute Couture Product Line & Sizing Master"
      subtitle="Bespoke pet apparel catalog, fabric specifications, ergonomic sizing matrices, and retail inventory valuation"
      icon="👗"
      badge="142 Active Styles"
      actions={
        <button onClick={() => alert('Adding New Fashion Apparel Style...')} style={{ padding: '6px 14px', borderRadius: '8px', border: '1px solid #ec4899', background: 'rgba(236,72,153,0.15)', color: '#f472b6', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
          + Add New Style
        </button>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Active Fashion SKUs" value="142 Styles" delta="6 Core Categories" trend="up" subtext="Bespoke + Ready-to-wear" icon="👗" />
        <KpiCard label="Avg. Retail Price (ASP)" value="₹2,240" delta="+12.4% YoY" trend="up" subtext="Premium fabric upgrade" icon="🏷️" />
        <KpiCard label="Average Product Margin" value="69.4%" delta="+2.8% vs FY25" trend="up" subtext="In-house artisan atelier" icon="💎" />
        <KpiCard label="Eco-Certified Fabrics" value="100% Cotton/Wool" delta="OEKO-TEX Class 1" trend="up" subtext="Hypoallergenic pet-safe" icon="🌱" />
        <KpiCard label="Low Stock Styles" value="4 SKUs" delta="Under 30 days cover" trend="warn" subtext="Production run ordered" icon="⚠️" />
        <KpiCard label="Custom Atelier Queue" value="34 Orders" delta="7-day tailoring TAT" trend="up" subtext="Wedding & gala apparel" icon="✂️" />
      </div>

      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#fff' }}>👗 Pet Fashion Master Catalog</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: '#94a3b8' }}>Fabrics, ergonomic cut specifications, and production unit economics</p>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search SKU, name, fabric..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '6px', padding: '6px 12px', color: '#fff', fontSize: '12px', minWidth: '220px' }}
            />
            <select
              value={selectedCat}
              onChange={e => setSelectedCat(e.target.value)}
              style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '6px', padding: '6px 10px', color: '#fff', fontSize: '12px' }}
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
              <tr style={{ background: 'rgba(0,0,0,0.25)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                {['SKU', 'Product Name', 'Category', 'Target Pet', 'Sizes', 'Fabric & Material', 'Retail Price', 'COGS Unit', 'Stock', 'Status'].map(h => (
                  <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: '#94a3b8', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', color: '#f472b6', fontSize: '11px', fontWeight: 600 }}>{p.sku}</td>
                  <td style={{ padding: '11px 12px', fontWeight: 600, color: '#fff' }}>{p.name}</td>
                  <td style={{ padding: '11px 12px', color: '#94a3b8' }}>{p.category}</td>
                  <td style={{ padding: '11px 12px', color: '#cbd5e1' }}>{p.petType}</td>
                  <td style={{ padding: '11px 12px', color: '#a78bfa' }}>{p.sizes}</td>
                  <td style={{ padding: '11px 12px', color: '#94a3b8', fontSize: '11px' }}>{p.material}</td>
                  <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#34d399' }}>{p.price}</td>
                  <td style={{ padding: '11px 12px', color: '#64748b' }}>{p.cost}</td>
                  <td style={{ padding: '11px 12px', color: '#fff', fontWeight: 600 }}>{p.stock}</td>
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
