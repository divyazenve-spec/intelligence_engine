import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function COGS() {
  const [category, setCategory] = useState('ALL');

  const cogsCategories = [];

  const vendorContracts = [];

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
        <KpiCard label="Total Monthly COGS" value="₹0" delta="0.0%" trend="neutral" subtext="Procurement cost" icon="📦" />
        <KpiCard label="Pharma Procurement" value="₹0" delta="0.0%" trend="neutral" subtext="Vaccines & cold chain" icon="💊" />
        <KpiCard label="Surgical Hardware" value="₹0" delta="0.0%" trend="neutral" subtext="Titanium TPLO & Pins" icon="🔩" />
        <KpiCard label="Diagnostics Consumables" value="₹0" delta="0.0%" trend="neutral" subtext="IDEXX lab cartridges" icon="🔬" />
        <KpiCard label="Manufacturer Rebates" value="₹0" delta="Annualized pool" trend="neutral" subtext="Direct margin credit" icon="🎁" />
        <KpiCard label="Inventory Waste / Spoilage" value="0.0%" delta="0.0%" trend="neutral" subtext="Strict FEFO control" icon="🛡️" />
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
