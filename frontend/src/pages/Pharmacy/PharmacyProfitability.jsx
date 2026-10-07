import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function PharmacyProfitability() {
  const [period, setPeriod] = useState('Month to Date');

  const categoryMargins = [];
  const topProfitableDrugs = [];

  return (
    <DashboardLayout
      category="Pharmacy"
      subcategory="Pharmacy Profitability"
      title="Veterinary Pharmacy Margins & Unit Economics"
      subtitle="Therapeutic class margins, manufacturer volume rebates, inventory shrinkage audit, and net pharmacy contribution"
      icon="📈"
      badge=""
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
            onClick={() => alert('No active profitability data to export.')}
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
        <KpiCard label="Gross Pharmaceutical Profit" value="₹0" delta="0.0% YoY" trend="neutral" subtext="0.0% gross margin" icon="💰" />
        <KpiCard label="Net Pharmacy Contribution" value="₹0" delta="0.0% net margin" trend="neutral" subtext="After logistics & dispensary" icon="💎" />
        <KpiCard label="Vendor Volume Rebates" value="₹0" delta="--" trend="neutral" subtext="No vendor rebates" icon="🤝" />
        <KpiCard label="Damage & Expiry Shrinkage" value="₹0" delta="0.00% of COGS" trend="neutral" subtext="No shrinkage recorded" icon="📉" />
        <KpiCard label="Return on Pharmacy Capital" value="0.0%" delta="--" trend="neutral" subtext="ROIC on medicine inventory" icon="⚡" />
        <KpiCard label="Cold-Chain Loss Rate" value="0.0%" delta="No loss" trend="neutral" subtext="Zero loss" icon="❄️" />
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
          <span style={{ fontSize: '12px', color: '#10b981', fontWeight: 600 }}>Total COGS: ₹0</span>
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
              {categoryMargins.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ padding: '24px', textAlign: 'center', color: '#94a3b8' }}>
                    No records found
                  </td>
                </tr>
              ) : (
                categoryMargins.map((cm, idx) => (
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Profit Drivers */}
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
          <span style={{ fontSize: '12px', color: '#38bdf8', fontWeight: 600 }}>0 pharmaceutical records</span>
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
              {topProfitableDrugs.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ padding: '24px', textAlign: 'center', color: '#94a3b8' }}>
                    No records found
                  </td>
                </tr>
              ) : (
                topProfitableDrugs.map((d, idx) => (
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
