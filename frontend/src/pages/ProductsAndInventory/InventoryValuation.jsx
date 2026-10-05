import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function InventoryValuation() {
  const [method, setMethod] = useState('FIFO');

  const categories = [
    { name: 'Pharmacy & Meds', costVal: '₹54,20,000', retailVal: '₹84,50,000', margin: '35.8%', share: 29.1, color: '#10b981' },
    { name: 'Clinical Nutrition', costVal: '₹42,80,000', retailVal: '₹68,20,000', margin: '37.2%', share: 23.0, color: '#0ea5e9' },
    { name: 'Vaccines & Cold Chain', costVal: '₹34,60,000', retailVal: '₹52,40,000', margin: '34.0%', share: 18.5, color: '#8b5cf6' },
    { name: 'Pet Supplements', costVal: '₹28,40,000', retailVal: '₹46,10,000', margin: '38.4%', share: 15.2, color: '#f59e0b' },
    { name: 'Pet Gear & Tech', costVal: '₹16,50,000', retailVal: '₹27,80,000', margin: '40.6%', share: 8.8, color: '#ec4899' },
    { name: 'Fashion & Apparel', costVal: '₹10,00,000', retailVal: '₹15,20,000', margin: '34.2%', share: 5.4, color: '#14b8a6' }
  ];

  const warehouseVal = [
    { hub: 'Bengaluru Central Hub', costVal: '₹84,00,000', share: 45.0, units: 8240, manager: 'Ravi Shankar K.' },
    { hub: 'Mumbai West Fulfillment', costVal: '₹42,00,000', share: 22.5, units: 4120, manager: 'Priya Joshi' },
    { hub: 'Delhi NCR Hub', costVal: '₹31,00,000', share: 16.6, units: 3180, manager: 'Amit Verma' },
    { hub: 'Hyderabad Center', costVal: '₹19,50,000', share: 10.5, units: 1940, manager: 'Lakshmi Reddy' },
    { hub: 'Pune Express Micro-Hub', costVal: '₹11,00,000', share: 5.9, units: 970, manager: 'Sneha Kulkarni' }
  ];

  return (
    <DashboardLayout
      category="Products & Inventory"
      subcategory="Inventory Valuation"
      title="Inventory Asset Valuation"
      subtitle="Financial cost-of-goods valuation, gross margin projection, holding carrying costs & aging reserves"
      icon="💎"
      badge="Asset: ₹1.86 Cr"
      actions={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '11px', color: '#94a3b8' }}>Valuation Method:</span>
          {['FIFO', 'Weighted Avg', 'LIFO Preview'].map(m => (
            <button
              key={m}
              onClick={() => setMethod(m)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer',
                border: method === m ? '1px solid #8b5cf6' : '1px solid rgba(255,255,255,0.1)',
                background: method === m ? 'rgba(139,92,246,0.2)' : 'rgba(255,255,255,0.03)',
                color: method === m ? '#c4b5fd' : '#94a3b8'
              }}
            >
              {m}
            </button>
          ))}
        </div>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Stock Cost Value" value="₹1,86,50,000" delta="+4.8% MTD" trend="up" subtext={`Using ${method} valuation`} icon="💰" />
        <KpiCard label="Projected Retail Value" value="₹2,94,20,000" delta="+5.2%" trend="up" subtext="Current MRP realization" icon="🏷️" />
        <KpiCard label="Unrealized Gross Margin" value="36.6%" delta="₹1.07 Cr" trend="up" subtext="Embedded profit potential" icon="📈" />
        <KpiCard label="Annual Carrying Cost" value="14.2%" delta="-0.8%" trend="up" subtext="Holding & storage rate" icon="🛡️" />
      </div>

      {/* Valuation Mix by Category & Aging */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '16px'
      }}>
        <div style={{
          background: 'var(--card, #1e293b)',
          border: '1px solid var(--border, rgba(255,255,255,0.08))',
          borderRadius: '12px',
          padding: '20px'
        }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>Category Asset Breakdown</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {categories.map(cat => (
              <div key={cat.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 600, color: '#f8fafc' }}>{cat.name}</span>
                  <span style={{ fontFamily: '"IBM Plex Mono", monospace', color: '#94a3b8' }}>
                    {cat.costVal} <span style={{ color: '#10b981' }}>({cat.margin} margin)</span>
                  </span>
                </div>
                <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${cat.share * 2.5}%`, height: '100%', background: cat.color, borderRadius: '4px' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          background: 'var(--card, #1e293b)',
          border: '1px solid var(--border, rgba(255,255,255,0.08))',
          borderRadius: '12px',
          padding: '20px'
        }}>
          <h3 style={{ margin: '0 0 12px', fontSize: '15px', fontWeight: 700 }}>Inventory Aging & Valuation Reserves</h3>
          <p style={{ fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)', margin: '0 0 16px' }}>
            Shelf-life aging distribution to ensure regulatory compliance and adequate write-down reserve allocations.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
              <div style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>Fresh (0–30 Days)</div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#f8fafc', marginTop: '2px' }}>₹1.38 Cr (74%)</div>
              <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px' }}>Peak turnover velocity</div>
            </div>
            <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(14,165,233,0.08)', border: '1px solid rgba(14,165,233,0.2)' }}>
              <div style={{ fontSize: '11px', color: '#0ea5e9', fontWeight: 600 }}>Active (31–60 Days)</div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#f8fafc', marginTop: '2px' }}>₹29.8 L (16%)</div>
              <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px' }}>Normal consumption</div>
            </div>
            <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}>
              <div style={{ fontSize: '11px', color: '#f59e0b', fontWeight: 600 }}>Slow Moving (61–90d)</div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#f8fafc', marginTop: '2px' }}>₹13.0 L (7%)</div>
              <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px' }}>Review promotional discount</div>
            </div>
            <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
              <div style={{ fontSize: '11px', color: '#ef4444', fontWeight: 600 }}>At Risk (&gt;90 Days)</div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#f8fafc', marginTop: '2px' }}>₹5.9 L (3%)</div>
              <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px' }}>Reserve covered: ₹4.8L</div>
            </div>
          </div>
        </div>
      </div>

      {/* Warehouse-wise Valuation Table */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>Warehouse Holding Asset Valuation</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))', color: 'var(--muted-foreground, #94a3b8)', fontSize: '11px' }}>
                <th style={{ padding: '10px 12px' }}>Warehouse Facility</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Total Units</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Asset Valuation (Cost)</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Share of Network</th>
                <th style={{ padding: '10px 12px' }}>Hub Manager</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Audit Status</th>
              </tr>
            </thead>
            <tbody>
              {warehouseVal.map(w => (
                <tr key={w.hub} style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.04))' }}>
                  <td style={{ padding: '12px', fontWeight: 600 }}>🏭 {w.hub}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{w.units.toLocaleString()}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace', color: '#10b981' }}>{w.costVal}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{w.share}%</td>
                  <td style={{ padding: '12px', color: '#94a3b8' }}>{w.manager}</td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: 'rgba(16,185,129,0.15)',
                      color: '#10b981'
                    }}>
                      ✓ Verified
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
