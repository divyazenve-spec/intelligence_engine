import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function FashionInventory() {
  const [selectedLocation, setSelectedLocation] = useState('ALL');
  const [search, setSearch] = useState('');

  const inventoryItems = [
    { sku: 'ZVF-HARN-01', name: 'Italian Leather Harness', cat: 'Harnesses', xs: 15, s: 42, m: 58, l: 45, xl: 24, total: 184, valuation: '₹6,34,800', location: 'Central Fashion Hub', status: 'Healthy' },
    { sku: 'ZVF-COAT-04', name: 'Monsoon Waterproof Parka', cat: 'Weatherwear', xs: 0, s: 28, m: 72, l: 84, xl: 56, total: 240, valuation: '₹6,84,000', location: 'Central Fashion Hub', status: 'Healthy' },
    { sku: 'ZVF-KNIT-09', name: 'Cashmere Cable Knit Sweater', cat: 'Winter Knits', xs: 12, s: 34, m: 42, l: 24, xl: 0, total: 112, valuation: '₹2,68,800', location: 'Indiranagar Studio', status: 'Low Stock' },
    { sku: 'ZVF-COLL-02', name: 'Velvet Midnight Rose Gold Collar', cat: 'Collars', xs: 45, s: 92, m: 115, l: 68, xl: 0, total: 320, valuation: '₹5,28,000', location: 'Bandra Boutique', status: 'Healthy' },
    { sku: 'ZVF-BAND-05', name: 'Festive Silk Brocade Bandana', cat: 'Accessories', xs: 80, s: 120, m: 150, l: 100, xl: 0, total: 450, valuation: '₹3,82,500', location: 'Central Fashion Hub', status: 'Healthy' },
    { sku: 'ZVF-BOOT-03', name: 'All-Terrain Protective Paw Boots', cat: 'Footwear', xs: 0, s: 18, m: 28, l: 24, xl: 15, total: 85, valuation: '₹1,65,750', location: 'Bandra Boutique', status: 'Low Stock' },
    { sku: 'ZVF-ROBE-07', name: 'Microfiber Spa Bathrobe', cat: 'Loungewear', xs: 20, s: 45, m: 55, l: 40, xl: 0, total: 160, valuation: '₹2,32,000', location: 'Indiranagar Studio', status: 'Healthy' },
    { sku: 'ZVF-COOL-08', name: 'Hydro-Active Cooling Vest', cat: 'Weatherwear', xs: 15, s: 50, m: 65, l: 45, xl: 20, total: 195, valuation: '₹4,19,250', location: 'Central Fashion Hub', status: 'Healthy' }
  ];

  const rawMaterials = [
    { fabric: 'Full-Grain Italian Nappa Leather (Tan & Black)', stock: '320 sq meters', leadTime: '12 days', allocated: 'Harnesses & Leashes', reorder: 'Safe' },
    { fabric: '3-Ply Breathable Ripstop Waterproof Nylon', stock: '580 meters', leadTime: '8 days', allocated: 'Monsoon Parkas & Vests', reorder: 'Safe' },
    { fabric: 'Organic Mongolian Cashmere-Merino Yarn', stock: '140 kg spools', leadTime: '18 days', allocated: 'Winter Knit Collection', reorder: 'Reorder Due' },
    { fabric: 'Pure Banarasi Zari Brocade & Silk', stock: '210 meters', leadTime: '6 days', allocated: 'Festive Bandanas & Bows', reorder: 'Safe' }
  ];

  const filtered = inventoryItems.filter(item => {
    if (selectedLocation !== 'ALL' && item.location !== selectedLocation) return false;
    if (search) {
      const q = search.toLowerCase();
      return item.name.toLowerCase().includes(q) || item.sku.toLowerCase().includes(q) || item.cat.toLowerCase().includes(q);
    }
    return true;
  });

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(255,255,255,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Zenve Fashion"
      subcategory="Inventory & Sizing Matrix"
      title="Fashion Stock Allocation & Sizing Matrix"
      subtitle="Finished pet garments distribution across sizing grids (XS to XXL), raw atelier materials, and showroom stock cover"
      icon="📦"
      badge="Stock Ledger"
      actions={
        <button onClick={() => alert('Initiating Inter-Boutique Stock Rebalance...')} style={{ padding: '6px 14px', borderRadius: '8px', border: '1px solid #ec4899', background: 'rgba(236,72,153,0.15)', color: '#f472b6', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
          🔄 Rebalance Stock
        </button>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Finished Apparel Valuation" value="₹33.15 L" delta="1,746 Units" trend="up" subtext="Across all 3 locations" icon="💎" />
        <KpiCard label="Raw Fabric Inventory" value="₹8.40 L" delta="Premium certified rolls" trend="up" subtext="Italian leather & cashmere" icon="🧵" />
        <KpiCard label="Sizing Completeness Rate" value="94.2%" delta="XS - XXL coverage" trend="up" subtext="Zero stockouts on core sizes" icon="📐" />
        <KpiCard label="Low Stock Styles (<20u)" value="2 Styles" delta="Knit & Boots" trend="warn" subtext="Replenishment in progress" icon="⚠️" />
        <KpiCard label="Showroom Display Stock" value="₹11.20 L" delta="Bandra + Indiranagar" trend="up" subtext="Trial room samples" icon="🛍️" />
        <KpiCard label="Inventory Turnover Ratio" value="4.6x" delta="+0.8x vs FY25" trend="up" subtext="Rapid fashion cycles" icon="⚡" />
      </div>

      {/* Raw Materials Highlight */}
      <div style={card}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>🧵 Atelier Raw Fabric & Hardware Reserves</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
          {rawMaterials.map((rm, idx) => (
            <div key={idx} style={{ background: 'rgba(0,0,0,0.22)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '16px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#f472b6', marginBottom: '6px' }}>{rm.fabric}</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--foreground, #0f172a)', marginBottom: '8px' }}>{rm.stock}</div>
              <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #64748b)', lineHeight: 1.4 }}>Allocated to: <strong style={{ color: 'var(--foreground, #334155)' }}>{rm.allocated}</strong></div>
              <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                <span style={{ color: '#64748b' }}>Lead time: {rm.leadTime}</span>
                <span style={{ color: rm.reorder === 'Safe' ? '#34d399' : '#fbbf24', fontWeight: 700 }}>{rm.reorder}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sizing Breakdown Table */}
      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>📦 Finished Garment Stock by Size Breakdown</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Unit counts per size tier, hub location, and total inventory value</p>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search style, SKU, category..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.15))', borderRadius: '6px', padding: '6px 12px', color: 'var(--foreground, #0f172a)', fontSize: '12px', minWidth: '220px' }}
            />
            <select
              value={selectedLocation}
              onChange={e => setSelectedLocation(e.target.value)}
              style={{ background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.15))', borderRadius: '6px', padding: '6px 10px', color: 'var(--foreground, #0f172a)', fontSize: '12px' }}
            >
              <option value="ALL">All Locations</option>
              <option value="Central Fashion Hub">Central Fashion Hub</option>
              <option value="Indiranagar Studio">Indiranagar Studio</option>
              <option value="Bandra Boutique">Bandra Boutique</option>
            </select>
          </div>
        </div>

        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'var(--muted, #f8fafc)', borderBottom: '1px solid var(--border, rgba(0,0,0,0.08))' }}>
                {['SKU Code', 'Product Name', 'Category', 'XS', 'S', 'M', 'L', 'XL', 'Total Stock', 'Valuation', 'Location', 'Status'].map(h => (
                  <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: 'var(--muted-foreground, #64748b)', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border, rgba(0,0,0,0.06))' }}>
                  <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', color: '#f472b6', fontSize: '11px' }}>{item.sku}</td>
                  <td style={{ padding: '11px 12px', fontWeight: 600, color: 'var(--foreground, #0f172a)' }}>{item.name}</td>
                  <td style={{ padding: '11px 12px', color: 'var(--muted-foreground, #64748b)' }}>{item.cat}</td>
                  <td style={{ padding: '11px 12px', color: item.xs === 0 ? '#64748b' : '#cbd5e1' }}>{item.xs}</td>
                  <td style={{ padding: '11px 12px', color: item.s === 0 ? '#64748b' : '#cbd5e1' }}>{item.s}</td>
                  <td style={{ padding: '11px 12px', color: item.m === 0 ? '#64748b' : '#cbd5e1' }}>{item.m}</td>
                  <td style={{ padding: '11px 12px', color: item.l === 0 ? '#64748b' : '#cbd5e1' }}>{item.l}</td>
                  <td style={{ padding: '11px 12px', color: item.xl === 0 ? '#64748b' : '#cbd5e1' }}>{item.xl}</td>
                  <td style={{ padding: '11px 12px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>{item.total}</td>
                  <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#34d399' }}>{item.valuation}</td>
                  <td style={{ padding: '11px 12px', color: 'var(--foreground, #334155)' }}>{item.location}</td>
                  <td style={{ padding: '11px 12px' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, background: item.status === 'Healthy' ? 'rgba(52,211,153,0.15)' : 'rgba(251,191,36,0.15)', color: item.status === 'Healthy' ? '#34d399' : '#fbbf24' }}>
                      {item.status}
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
