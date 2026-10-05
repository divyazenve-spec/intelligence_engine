import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function GrossProfit() {
  const [viewBy, setViewBy] = useState('Department');

  const departmentMargins = [
    { dept: 'Surgical Operations & Modular OTs', rev: '₹24,80,000', cogs: '₹8,88,000', gp: '₹15,92,000', margin: '64.2%', target: '60.0%', status: 'Exceeding' },
    { dept: 'Diagnostic Pathology & Imaging (DR/USG)', rev: '₹12,40,000', cogs: '₹4,65,000', gp: '₹7,75,000', margin: '62.5%', target: '60.0%', status: 'Exceeding' },
    { dept: 'Outpatient Care & Wellness Consults', rev: '₹28,40,000', cogs: '₹11,82,000', gp: '₹16,58,000', margin: '58.4%', target: '55.0%', status: 'Exceeding' },
    { dept: 'Veterinary Pharmacy & Prescription Retail', rev: '₹14,20,000', cogs: '₹8,24,000', gp: '₹5,96,000', margin: '42.0%', target: '40.0%', status: 'On Target' },
    { dept: 'Pet Food, Supplements & Accessories E-Com', rev: '₹6,80,000', cogs: '₹4,86,000', gp: '₹1,94,000', margin: '28.5%', target: '28.0%', status: 'On Target' }
  ];

  const unitEconomics = [
    { service: 'Complex Orthopedic TPLO Cruciate Surgery', avgPrice: '₹38,000', directCost: '₹12,500', contribution: '₹25,500', margin: '67.1%', volume: '44 cases/mo' },
    { service: 'Cataract Phacoemulsification Eye Surgery', avgPrice: '₹28,000', directCost: '₹9,200', contribution: '₹18,800', margin: '67.1%', volume: '28 cases/mo' },
    { service: 'General Veterinary OPD + 5-in-1 Vaccine', avgPrice: '₹1,450', directCost: '₹540', contribution: '₹910', margin: '62.8%', volume: '1,840 visits/mo' },
    { service: 'Full Body Color Doppler Ultrasound Scan', avgPrice: '₹2,800', directCost: '₹680', contribution: '₹2,120', margin: '75.7%', volume: '340 scans/mo' },
    { service: 'Canine Routine Dental Scaling & Polishing', avgPrice: '₹4,500', directCost: '₹1,200', contribution: '₹3,300', margin: '73.3%', volume: '180 pets/mo' }
  ];

  return (
    <DashboardLayout
      category="Finance & Accounting"
      subcategory="Gross Profit"
      title="Gross Profit & Contribution Margin Intelligence"
      subtitle="Unit economics by medical service, gross margin expansion across therapeutic specialties, and pricing leverage"
      icon="💎"
      badge="Blended Margin: 56.0%"
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => alert('Exporting Unit Economics & Gross Margin Model...')}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              border: '1px solid #10b981',
              background: 'rgba(16,185,129,0.15)',
              color: '#34d399',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            💎 Export Unit Economics
          </button>
        </div>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Gross Profit" value="₹43.90 Lakh" delta="+14.9% vs Budget" trend="up" subtext="Revenue - COGS" icon="💎" />
        <KpiCard label="Blended Gross Margin" value="56.0%" delta="+2.2% pts YoY" trend="up" subtext="Target: >52.0%" icon="📈" />
        <KpiCard label="Surgical Gross Margin" value="64.2%" delta="Highest margin unit" trend="up" subtext="Specialist OTs" icon="🩺" />
        <KpiCard label="Diagnostics Margin" value="62.5%" delta="High capital efficiency" trend="up" subtext="In-house blood lab" icon="🔬" />
        <KpiCard label="Pharmacy Gross Margin" value="42.0%" delta="+1.8% pts QoQ" trend="up" subtext="Direct OEM sourcing" icon="💊" />
        <KpiCard label="Price Realization Index" value="103.4" delta="+3.4% YoY" trend="up" subtext="Zero discounting in OTs" icon="🛡️" />
      </div>

      <div style={{
        background: 'var(--card, #131d2e)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '22px 24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#fff' }}>📊 Gross Profit by Clinical Division</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Direct profitability by department after material & pharmaceutical cost deductions</p>
          </div>
          <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>Target Met Across All 5 Units</span>
        </div>

        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.22)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <th style={{ padding: '10px 20px', textAlign: 'left', color: '#94a3b8' }}>Clinical Department / Unit</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Gross Revenue</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Direct COGS</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Gross Profit</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Gross Margin %</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Target Margin</th>
                <th style={{ padding: '10px 20px', textAlign: 'right', color: '#94a3b8' }}>Performance</th>
              </tr>
            </thead>
            <tbody>
              {departmentMargins.map((d, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 20px', color: '#fff', fontWeight: 600 }}>{d.dept}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{d.rev}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#f87171' }}>{d.cogs}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#10b981', fontWeight: 700 }}>{d.gp}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#38bdf8', fontWeight: 700 }}>{d.margin}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#94a3b8' }}>{d.target}</td>
                  <td style={{ padding: '12px 20px', textAlign: 'right' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '4px', background: 'rgba(16,185,129,0.15)', color: '#34d399', fontSize: '11px', fontWeight: 600 }}>{d.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Unit Economics Deep Dive */}
      <div style={{
        background: 'var(--card, #131d2e)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '22px 24px'
      }}>
        <h3 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 700, color: '#fff' }}>🐾 Unit Economics: Top High-Volume Clinical Procedures</h3>
        <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Revenue realization, direct consumables cost, and per-case gross contribution</p>

        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.22)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <th style={{ padding: '10px 20px', textAlign: 'left', color: '#94a3b8' }}>Medical Service / Procedure</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Average Price</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Direct Cost / Case</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Contribution Margin</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Margin %</th>
                <th style={{ padding: '10px 20px', textAlign: 'right', color: '#94a3b8' }}>Monthly Throughput</th>
              </tr>
            </thead>
            <tbody>
              {unitEconomics.map((u, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 20px', color: '#fff', fontWeight: 600 }}>{u.service}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{u.avgPrice}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#f87171' }}>{u.directCost}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#10b981' }}>{u.contribution}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#38bdf8', fontWeight: 600 }}>{u.margin}</td>
                  <td style={{ padding: '12px 20px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#cbd5e1' }}>{u.volume}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
