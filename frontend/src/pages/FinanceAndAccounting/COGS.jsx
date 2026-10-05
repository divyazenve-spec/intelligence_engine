import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function COGS() {
  const [category, setCategory] = useState('ALL');

  const cogsCategories = [
    { code: 'COG-PHR-01', name: 'Veterinary Pharma (Antibiotics, Vaccines, NSAIDs)', spend: '₹14,50,000', revLinked: '₹26,80,000', margin: '45.9%', vendor: 'Zoetis, Boehringer, Intas', status: 'Optimal' },
    { code: 'COG-SUR-02', name: 'Surgical Titanium Implants, TPLO & Anesthetics', spend: '₹9,80,000', revLinked: '₹24,80,000', margin: '60.5%', vendor: 'DePuy Synthes Vet, Abbott', status: 'Optimal' },
    { code: 'COG-DX-03',  name: 'Diagnostic Reagents, IDEXX Cartridges & Strips', spend: '₹5,40,000', revLinked: '₹12,40,000', margin: '56.5%', vendor: 'IDEXX India, Mindray', status: 'Favorable' },
    { code: 'COG-CON-04', name: 'Sterile Surgical Drapes, Gowns, Gloves & Sutures', spend: '₹4,80,000', revLinked: '₹14,40,000', margin: '66.7%', vendor: 'Medline, Ethicon Sutures', status: 'Optimal' }
  ];

  const vendorContracts = [
    { vendor: 'Zoetis India Veterinary', category: 'Biologicals & Vaccines', volumeYTD: '₹48,20,000', rebateRate: '8.5%', earnedRebate: '₹4,09,700', contractEnd: 'Mar 2027', rating: 'Tier 1 Partner' },
    { vendor: 'DePuy Synthes Vet Ortho', category: 'Titanium Plates & Screws', volumeYTD: '₹34,10,000', rebateRate: '12.0%', earnedRebate: '₹4,09,200', contractEnd: 'Dec 2026', rating: 'Tier 1 Partner' },
    { vendor: 'Boehringer Ingelheim Vet', category: 'Cardiology & Parasiticides', volumeYTD: '₹28,40,000', rebateRate: '10.0%', earnedRebate: '₹2,84,000', contractEnd: 'Jun 2027', rating: 'Preferred Vendor' },
    { vendor: 'IDEXX Laboratories India', category: 'Analyzer Cartridges & Reagents', volumeYTD: '₹18,50,000', rebateRate: '6.0%', earnedRebate: '₹1,11,000', contractEnd: 'Nov 2027', rating: 'Direct OEM' }
  ];

  return (
    <DashboardLayout
      category="Finance & Accounting"
      subcategory="COGS"
      title="Cost of Goods Sold (COGS) & Direct Material Analytics"
      subtitle="Direct pharmaceutical cost absorption, surgical implants bill of materials (BOM), supplier volume rebates, and gross cost control"
      icon="📦"
      badge="COGS Ratio: 44.0%"
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => alert('Initiating bulk procurement purchase order review...')}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              border: '1px solid #3b82f6',
              background: 'rgba(59,130,246,0.15)',
              color: '#60a5fa',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            📦 Vendor Procurement Run
          </button>
        </div>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Monthly COGS" value="₹34.50 Lakh" delta="-4.2% under plan" trend="up" subtext="44.0% of revenue" icon="📦" />
        <KpiCard label="Pharma Procurement" value="₹14.50 Lakh" delta="42.0% of COGS" trend="up" subtext="Vaccines & cold chain" icon="💊" />
        <KpiCard label="Surgical Hardware" value="₹9.80 Lakh" delta="28.4% of COGS" trend="up" subtext="Titanium TPLO & Pins" icon="🔩" />
        <KpiCard label="Diagnostics Consumables" value="₹5.40 Lakh" delta="15.7% of COGS" trend="up" subtext="IDEXX lab cartridges" icon="🔬" />
        <KpiCard label="Manufacturer Rebates" value="₹12.14 Lakh" delta="Annualized pool" trend="up" subtext="Direct margin credit" icon="🎁" />
        <KpiCard label="Inventory Waste / Spoilage" value="0.42%" delta="Industry: 1.8%" trend="up" subtext="Strict FEFO control" icon="🛡️" />
      </div>

      <div style={{
        background: 'var(--card, #131d2e)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '22px 24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#fff' }}>📋 Direct COGS Material Absorption Ledger</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Direct cost of consumables compared to linked clinical revenue</p>
          </div>
          <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>Active FEFO Audit</span>
        </div>

        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.22)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <th style={{ padding: '10px 20px', textAlign: 'left', color: '#94a3b8' }}>COGS Category</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Direct Spend</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Linked Revenue</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Gross Margin</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', color: '#94a3b8' }}>Primary Suppliers</th>
                <th style={{ padding: '10px 20px', textAlign: 'right', color: '#94a3b8' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {cogsCategories.map((c, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 20px', color: '#fff', fontWeight: 600 }}>
                    <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '10px', color: '#64748b', marginRight: '8px' }}>{c.code}</span>
                    {c.name}
                  </td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#f87171', fontWeight: 700 }}>{c.spend}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#10b981' }}>{c.revLinked}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#38bdf8' }}>{c.margin}</td>
                  <td style={{ padding: '12px 14px', color: '#cbd5e1' }}>{c.vendor}</td>
                  <td style={{ padding: '12px 20px', textAlign: 'right' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '4px', background: 'rgba(16,185,129,0.15)', color: '#34d399', fontSize: '11px', fontWeight: 600 }}>{c.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* OEM Vendor Contracts & Rebates */}
      <div style={{
        background: 'var(--card, #131d2e)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '22px 24px'
      }}>
        <h3 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 700, color: '#fff' }}>🤝 OEM Supplier Master Agreements & Volume Rebates</h3>
        <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Institutional contracts yielding retroactive gross margin rebates on bulk animal healthcare supplies</p>

        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.22)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <th style={{ padding: '10px 20px', textAlign: 'left', color: '#94a3b8' }}>Vendor / Partner</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', color: '#94a3b8' }}>Product Category</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Procurement YTD</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Rebate %</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Accrued Rebate</th>
                <th style={{ padding: '10px 20px', textAlign: 'right', color: '#94a3b8' }}>Partnership Tier</th>
              </tr>
            </thead>
            <tbody>
              {vendorContracts.map((v, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 20px', color: '#fff', fontWeight: 600 }}>{v.vendor}</td>
                  <td style={{ padding: '12px 14px', color: '#94a3b8' }}>{v.category}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{v.volumeYTD}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#38bdf8' }}>{v.rebateRate}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#10b981' }}>{v.earnedRebate}</td>
                  <td style={{ padding: '12px 20px', textAlign: 'right' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '4px', background: 'rgba(59,130,246,0.15)', color: '#60a5fa', fontSize: '11px', fontWeight: 600 }}>{v.rating}</span>
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
