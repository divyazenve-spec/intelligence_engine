import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function PharmacyProfitability() {
  const [period, setPeriod] = useState('Month to Date');

  const categoryMargins = [
    { cat: 'Chronic Wellness & Cardiac', rev: '₹2,35,000', cogs: '₹1,21,700', grossProfit: '₹1,13,300', margin: '48.2%', share: '21.8%', rebate: '₹14,200', color: '#10b981' },
    { cat: 'Nutraceuticals & Joint Care', rev: '₹60,000', cogs: '₹31,500', grossProfit: '₹28,500', margin: '47.5%', share: '5.5%', rebate: '₹3,600', color: '#0ea5e9' },
    { cat: 'Dermatologicals & Shampoos', rev: '₹1,02,500', cogs: '₹56,400', grossProfit: '₹46,100', margin: '45.0%', share: '8.9%', rebate: '₹6,100', color: '#8b5cf6' },
    { cat: 'Antiparasitics & Dewormers', rev: '₹4,12,000', cogs: '₹2,36,900', grossProfit: '₹1,75,100', margin: '42.5%', share: '33.8%', rebate: '₹24,800', color: '#3b82f6' },
    { cat: 'Antibiotics & Anti-Infectives', rev: '₹2,84,500', cogs: '₹1,76,400', grossProfit: '₹1,08,100', margin: '38.0%', share: '20.9%', rebate: '₹11,400', color: '#f59e0b' },
    { cat: 'Vaccines & Cold Chain', rev: '₹1,64,000', cogs: '₹1,06,600', grossProfit: '₹57,400', margin: '35.0%', share: '11.1%', rebate: '₹8,200', color: '#ec4899' }
  ];

  const topProfitableDrugs = [
    { name: 'Bravecto Chewable 20-40kg', sku: 'DRG-VET-001', mrp: 2100, ptr: 1220, unitProfit: 880, margin: '41.9%', units: 142, totalProfit: '₹1,24,960' },
    { name: 'Zoetis Cardisure 5mg (60 tabs)', sku: 'DRG-VET-003', mrp: 2400, ptr: 1350, unitProfit: 1050, margin: '43.8%', units: 84, totalProfit: '₹88,200' },
    { name: 'NexGard Spectra (7.5-15kg)', sku: 'DRG-VET-002', mrp: 1650, ptr: 990, unitProfit: 660, margin: '40.0%', units: 98, totalProfit: '₹64,680' },
    { name: 'Amoxiclav Pet 625mg', sku: 'DRG-VET-005', mrp: 380, ptr: 210, unitProfit: 170, margin: '44.7%', units: 280, totalProfit: '₹47,600' },
    { name: 'Nobivac DHPPi Core Vaccine', sku: 'DRG-VET-004', mrp: 950, ptr: 420, unitProfit: 530, margin: '55.8%', units: 86, totalProfit: '₹45,580' },
    { name: 'Malaseb Medicated Shampoo', sku: 'DRG-VET-006', mrp: 720, ptr: 390, unitProfit: 330, margin: '45.8%', units: 95, totalProfit: '₹31,350' }
  ];

  return (
    <DashboardLayout
      category="Pharmacy"
      subcategory="Pharmacy Profitability"
      title="Veterinary Pharmacy Margins & Unit Economics"
      subtitle="Therapeutic class margins, manufacturer volume rebates, inventory shrinkage audit, and net pharmacy contribution"
      icon="📈"
      badge="41.2% Blended Margin"
      actions={
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div style={{
            display: 'flex',
            background: 'rgba(255,255,255,0.05)',
            padding: '3px',
            borderRadius: '8px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            {['Month to Date', 'Quarter to Date', 'Year to Date'].map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: period === p ? '#3b82f6' : 'transparent',
                  color: period === p ? '#fff' : '#94a3b8'
                }}
              >
                {p}
              </button>
            ))}
          </div>
          <button
            onClick={() => alert('Downloading unit economic spreadsheet and vendor rebate audit report...')}
            style={{
              padding: '7px 14px',
              borderRadius: '8px',
              background: '#10b981',
              color: '#fff',
              border: 'none',
              fontWeight: 600,
              fontSize: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>📥</span> Export Profitability Matrix
          </button>
        </div>
      }
    >
      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Gross Pharmaceutical Profit" value="₹5.18 Lakh" delta="+22.1% YoY" trend="up" subtext="41.2% gross margin" icon="💰" />
        <KpiCard label="Net Pharmacy Contribution" value="₹3.42 Lakh" delta="27.2% net margin" trend="up" subtext="After logistics & dispensary" icon="💎" />
        <KpiCard label="Vendor Volume Rebates" value="+₹52,800" delta="Tier 1 Partner Status" trend="up" subtext="MSD, Zoetis & Boehringer" icon="🤝" />
        <KpiCard label="Damage & Expiry Shrinkage" value="-₹8,400" delta="0.67% of COGS" trend="down" subtext="Well below 1.5% target" icon="📉" />
        <KpiCard label="Return on Pharmacy Capital" value="38.4%" delta="+4.2% YoY" trend="up" subtext="ROIC on medicine inventory" icon="⚡" />
        <KpiCard label="Cold-Chain Loss Rate" value="0.00%" delta="Zero wastage" trend="up" subtext="100% uninterrupted power" icon="❄️" />
      </div>

      {/* Margins by Category Breakdown */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Therapeutic Category Margin & COGS Analysis</h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#94a3b8' }}>Revenue realization, procurement cost (PTR), gross margin percentage, and vendor volume rebates</p>
          </div>
          <span style={{ fontSize: '12px', color: '#10b981', fontWeight: 600 }}>Total COGS: ₹7,39,500</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: '#94a3b8' }}>
                <th style={{ padding: '8px 12px' }}>Therapeutic Category</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Revenue (MRP)</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Procurement COGS</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Gross Profit</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Gross Margin</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Profit Share</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Vendor Rebates</th>
              </tr>
            </thead>
            <tbody>
              {categoryMargins.map((cm, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '10px 12px', fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: cm.color }} />
                    {cm.cat}
                  </td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{cm.rev}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#94a3b8' }}>{cm.cogs}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#10b981' }}>{cm.grossProfit}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#38bdf8' }}>{cm.margin}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{cm.share}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#f59e0b' }}>{cm.rebate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top 6 Profit Drivers */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Top Profit-Generating Pharmaceuticals</h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#94a3b8' }}>Individual SKU unit margins and cumulative profit contribution</p>
          </div>
          <span style={{ fontSize: '12px', color: '#38bdf8', fontWeight: 600 }}>Top 6 account for 78% of pharmacy gross profit</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: '#94a3b8' }}>
                <th style={{ padding: '8px 12px' }}>Medicine & SKU</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>MRP</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Cost (PTR)</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Unit Profit</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Margin %</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Units Dispensed</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Total Profit</th>
              </tr>
            </thead>
            <tbody>
              {topProfitableDrugs.map((d, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '10px 12px' }}>
                    <div style={{ fontWeight: 600, color: '#fff' }}>{d.name}</div>
                    <div style={{ fontSize: '10px', color: '#38bdf8', fontFamily: '"IBM Plex Mono", monospace' }}>{d.sku}</div>
                  </td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>₹{d.mrp}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#94a3b8' }}>₹{d.ptr}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#10b981', fontWeight: 600 }}>₹{d.unitProfit}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#38bdf8', fontWeight: 600 }}>{d.margin}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{d.units}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#10b981' }}>{d.totalProfit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
