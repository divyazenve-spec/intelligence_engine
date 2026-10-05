import React, { useState, useMemo } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function PharmacyInventory() {
  const [zoneFilter, setZoneFilter] = useState('ALL');
  const [stockStatusFilter, setStockStatusFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState('');

  const inventoryStock = [
    { sku: 'DRG-VET-001', name: 'Bravecto Chewable 20-40kg', zone: 'Fast Dispensary Rack', stock: 142, safety: 40, rop: 50, costVal: 173240, mrpVal: 298200, dos: '32 Days', turnover: '14.2x', status: 'Healthy' },
    { sku: 'DRG-VET-004', name: 'Nobivac DHPPi Core Vaccine 1D', zone: 'Cold Chain (3.8°C)', stock: 86, safety: 30, rop: 40, costVal: 36120, mrpVal: 81700, dos: '21 Days', turnover: '18.4x', status: 'Healthy' },
    { sku: 'DRG-VET-002', name: 'NexGard Spectra (7.5-15kg)', zone: 'Fast Dispensary Rack', stock: 42, safety: 15, rop: 25, costVal: 41580, mrpVal: 69300, dos: '18 Days', turnover: '12.0x', status: 'Healthy' },
    { sku: 'DRG-VET-003', name: 'Zoetis Cardisure 5mg (Pimobendan)', zone: 'Schedule H Safe Vault', stock: 35, safety: 15, rop: 20, costVal: 47250, mrpVal: 84000, dos: '28 Days', turnover: '11.5x', status: 'Healthy' },
    { sku: 'DRG-VET-005', name: 'Amoxiclav Pet 625mg', zone: 'Schedule H Safe Vault', stock: 120, safety: 40, rop: 60, costVal: 25200, mrpVal: 45600, dos: '42 Days', turnover: '16.0x', status: 'Healthy' },
    { sku: 'DRG-VET-006', name: 'Malaseb Medicated Shampoo 250ml', zone: 'Topicals & Derm Bay', stock: 18, safety: 15, rop: 20, costVal: 7020, mrpVal: 12960, dos: '11 Days', turnover: '9.2x', status: 'Low Stock' },
    { sku: 'DRG-VET-007', name: 'Zoetis Revolution Spot-On (Cat)', zone: 'Fast Dispensary Rack', stock: 28, safety: 10, rop: 15, costVal: 24640, mrpVal: 40600, dos: '24 Days', turnover: '13.8x', status: 'Healthy' },
    { sku: 'DRG-VET-008', name: 'Rabisin Rabies Vaccine 1ml', zone: 'Cold Chain (3.8°C)', stock: 6, safety: 20, rop: 30, costVal: 960, mrpVal: 2280, dos: '4 Days', turnover: '22.0x', status: 'Critical' },
    { sku: 'DRG-VET-009', name: 'Carprovet 50mg (Carprofen)', zone: 'Schedule H Safe Vault', stock: 55, safety: 20, rop: 25, costVal: 17050, mrpVal: 29700, dos: '35 Days', turnover: '8.4x', status: 'Healthy' },
    { sku: 'DRG-VET-012', name: 'Enrofloxacin 100mg (Baytril)', zone: 'Schedule H Safe Vault', stock: 4, safety: 15, rop: 20, costVal: 720, mrpVal: 1280, dos: '3 Days', turnover: '15.4x', status: 'Critical' },
    { sku: 'DRG-VET-011', name: 'Drontal Plus Puppy Suspension', zone: 'Pediatric Rx Bay', stock: 32, safety: 15, rop: 20, costVal: 8320, mrpVal: 14400, dos: '26 Days', turnover: '10.1x', status: 'Healthy' }
  ];

  const filtered = useMemo(() => {
    return inventoryStock.filter(item => {
      const matchZone = zoneFilter === 'ALL' || item.zone.includes(zoneFilter);
      const matchStatus = stockStatusFilter === 'ALL' || item.status === stockStatusFilter;
      const matchSearch = search === '' ||
        item.sku.toLowerCase().includes(search.toLowerCase()) ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.zone.toLowerCase().includes(search.toLowerCase());
      return matchZone && matchStatus && matchSearch;
    });
  }, [zoneFilter, stockStatusFilter, search]);

  function handleReorder(sku, name) {
    setToast(`Emergency Purchase Order (PO) generated for ${name} (${sku}) to vendor!`);
    setTimeout(() => setToast(''), 3500);
  }

  return (
    <DashboardLayout
      category="Pharmacy"
      subcategory="Pharmacy Inventory"
      title="Veterinary Pharmacy Stock & Buffer Optimization"
      subtitle="Perpetual stock valuation, cold-chain temperature telemetry, reorder automation, and safety buffer monitoring"
      icon="📦"
      badge="₹28.40 Lakh Cost Stock"
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => alert('Starting perpetual physical inventory cycle count audit...')}
            style={{
              padding: '7px 14px',
              borderRadius: '8px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: '#fff',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Initiate Cycle Count
          </button>
        </div>
      }
    >
      {toast && (
        <div style={{
          padding: '12px 16px',
          borderRadius: '8px',
          background: 'rgba(16,185,129,0.15)',
          border: '1px solid rgba(16,185,129,0.3)',
          color: '#10b981',
          fontSize: '13px',
          fontWeight: 600
        }}>
          ✓ {toast}
        </div>
      )}

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Inventory at Cost" value="₹28.40 Lakh" delta="+6.4% MoM" trend="up" subtext="Current asset valuation" icon="💰" />
        <KpiCard label="Valuation at Retail (MRP)" value="₹48.20 Lakh" delta="41.1% unrealized margin" trend="up" subtext="Expected realization" icon="💎" />
        <KpiCard label="Active Cold Chain Items" value="86 SKUs" delta="100% 2°C–8°C Logged" trend="up" subtext="14 IoT refrigeration probes" icon="❄️" />
        <KpiCard label="Inventory Turnover Ratio" value="12.4x / yr" delta="+1.8x YoY" trend="up" subtext="High capital velocity" icon="⚡" />
        <KpiCard label="Critical Stockout Risk" value="2 SKUs" delta="Baytril & Rabisin" trend="down" subtext="Expedited PO dispatched" icon="⚠️" />
        <KpiCard label="Average Days of Supply" value="24.6 Days" delta="Optimal buffer" trend="neutral" subtext="Zero capital lock-in" icon="📅" />
      </div>

      {/* Storage Zones Overview */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '14px'
      }}>
        <div style={{ padding: '16px', borderRadius: '10px', background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.25)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#38bdf8' }}>Cold Chain Storage (2°C–8°C)</span>
            <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '4px', background: 'rgba(6,182,212,0.2)', color: '#38bdf8' }}>Telemetry Normal</span>
          </div>
          <div style={{ fontSize: '20px', fontWeight: 700, marginTop: '8px', color: '#fff' }}>86 SKUs · ₹6.45 Lakh Value</div>
          <p style={{ fontSize: '11px', color: '#94a3b8', margin: '4px 0 0' }}>Core vaccines, rabies biologics, and feline interferons. Continuous probe logging.</p>
        </div>

        <div style={{ padding: '16px', borderRadius: '10px', background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.25)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#c084fc' }}>Schedule H Controlled Vault</span>
            <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '4px', background: 'rgba(168,85,247,0.2)', color: '#c084fc' }}>Biometric Access</span>
          </div>
          <div style={{ fontSize: '20px', fontWeight: 700, marginTop: '8px', color: '#fff' }}>284 SKUs · ₹14.80 Lakh Value</div>
          <p style={{ fontSize: '11px', color: '#94a3b8', margin: '4px 0 0' }}>Antibiotics, cardiac, chemotherapy, and pain management pharmaceuticals.</p>
        </div>

        <div style={{ padding: '16px', borderRadius: '10px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#34d399' }}>Fast-Dispensary Ambient Bay</span>
            <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '4px', background: 'rgba(16,185,129,0.2)', color: '#34d399' }}>High Turnover</span>
          </div>
          <div style={{ fontSize: '20px', fontWeight: 700, marginTop: '8px', color: '#fff' }}>272 SKUs · ₹7.15 Lakh Value</div>
          <p style={{ fontSize: '11px', color: '#94a3b8', margin: '4px 0 0' }}>Antiparasitics, topical medicated shampoos, supplements, and dental care.</p>
        </div>
      </div>

      {/* Stock Management Table */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Pharmaceutical Inventory Matrix</h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#94a3b8' }}>Live stock on hand, reorder points, days of supply, and replenishment triggers</p>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search SKU, drug, zone..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                background: 'rgba(0,0,0,0.2)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                fontSize: '12px',
                width: '220px'
              }}
            />
            <select
              value={zoneFilter}
              onChange={e => setZoneFilter(e.target.value)}
              style={{
                padding: '6px 10px',
                borderRadius: '8px',
                background: 'rgba(0,0,0,0.2)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                fontSize: '12px'
              }}
            >
              <option value="ALL">All Storage Zones</option>
              <option value="Cold Chain">Cold Chain (2-8°C)</option>
              <option value="Schedule H">Schedule H Safe Vault</option>
              <option value="Fast Dispensary">Fast Dispensary</option>
              <option value="Topicals">Topicals & Derm</option>
            </select>
            <select
              value={stockStatusFilter}
              onChange={e => setStockStatusFilter(e.target.value)}
              style={{
                padding: '6px 10px',
                borderRadius: '8px',
                background: 'rgba(0,0,0,0.2)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                fontSize: '12px'
              }}
            >
              <option value="ALL">All Stock Statuses</option>
              <option value="Healthy">Healthy</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Critical">Critical</option>
            </select>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: '#94a3b8' }}>
                <th style={{ padding: '8px 12px' }}>SKU & Medicine</th>
                <th style={{ padding: '8px 12px' }}>Storage Zone</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Stock on Hand</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Reorder Point</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Days of Supply</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Turnover</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Stock Value (Cost)</th>
                <th style={{ padding: '8px 12px' }}>Status</th>
                <th style={{ padding: '8px 12px', textAlign: 'center' }}>Reorder</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '10px 12px' }}>
                    <div style={{ fontWeight: 600, color: '#fff' }}>{item.name}</div>
                    <div style={{ fontSize: '10px', color: '#38bdf8', fontFamily: '"IBM Plex Mono", monospace' }}>{item.sku}</div>
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{ fontSize: '11px', color: item.zone.includes('Cold') ? '#38bdf8' : '#cbd5e1' }}>
                      {item.zone}
                    </span>
                  </td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: item.stock <= item.rop ? '#f87171' : '#fff' }}>
                    {item.stock}
                  </td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#94a3b8' }}>
                    {item.rop}
                  </td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>
                    {item.dos}
                  </td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#10b981' }}>
                    {item.turnover}
                  </td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>
                    ₹{item.costVal.toLocaleString('en-IN')}
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '99px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: item.status === 'Healthy' ? 'rgba(16,185,129,0.15)' :
                        item.status === 'Low Stock' ? 'rgba(245,158,11,0.15)' : 'rgba(239,68,68,0.15)',
                      color: item.status === 'Healthy' ? '#34d399' :
                        item.status === 'Low Stock' ? '#fbbf24' : '#f87171'
                    }}>
                      {item.status}
                    </span>
                  </td>
                  <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                    {item.stock <= item.rop ? (
                      <button
                        onClick={() => handleReorder(item.sku, item.name)}
                        style={{
                          padding: '4px 10px',
                          borderRadius: '6px',
                          background: 'rgba(59,130,246,0.2)',
                          border: '1px solid rgba(59,130,246,0.4)',
                          color: '#60a5fa',
                          fontSize: '11px',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        + Reorder PO
                      </button>
                    ) : (
                      <span style={{ fontSize: '11px', color: '#64748b' }}>Stock Sched</span>
                    )}
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
