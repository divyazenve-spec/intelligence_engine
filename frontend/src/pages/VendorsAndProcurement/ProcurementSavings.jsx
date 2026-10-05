import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function ProcurementSavings() {
  const [selectedLever, setSelectedLever] = useState('ALL');

  const savingsLevers = [
    { lever: 'Volume Aggregation & Bulk POs', realized: '₹6.80 L', target: '₹6.00 L', achievement: 113.3, color: '#38bdf8', desc: 'Centralized ordering across Koramangala, Bandra, Okhla and Whitefield clinics.' },
    { lever: 'Generic Medication Substitution', realized: '₹4.90 L', target: '₹4.50 L', achievement: 108.9, color: '#34d399', desc: 'Switching select NSAIDs and broad-spectrum antibiotics to certified high-potency generics.' },
    { lever: 'Contract Renegotiations & Price Locks', realized: '₹3.65 L', target: '₹3.50 L', achievement: 104.3, color: '#a78bfa', desc: 'Annual master purchasing agreements with MSD Animal Health, Zoetis, and Synthes Vet.' },
    { lever: 'Early Settlement Cash Discounts (2/10 Net 30)', realized: '₹1.85 L', target: '₹2.00 L', achievement: 92.5, color: '#fbbf24', desc: 'Capturing 2% cash discount on invoices settled within 10 days of verified GRN.' },
    { lever: 'Freight & Route Consolidation', realized: '₹1.20 L', target: '₹1.00 L', achievement: 120.0, color: '#10b981', desc: 'Direct-to-hub deliveries eliminating local middle-mile distributor handling markups.' }
  ];

  const initiatives = [
    { id: 'SAV-01', initiative: 'Multi-Clinic Vaccine Bulk Tender (FY26-27)', category: 'Vaccines & Biologics', leadPartner: 'MSD Animal Health', baselineSpend: '₹32.0 L', negotiatedSpend: '₹25.6 L', netSavings: '₹6.40 L', status: 'Realized', lever: 'Volume Aggregation' },
    { id: 'SAV-02', initiative: 'Titanium Orthopedic Plates Master Contract', category: 'Surgical Implants', leadPartner: 'Synthes Vet India', baselineSpend: '₹18.0 L', negotiatedSpend: '₹14.4 L', netSavings: '₹3.60 L', status: 'Realized', lever: 'Contract Renegotiation' },
    { id: 'SAV-03', initiative: 'Active Generic NSAID Transition', category: 'Generic APIs & NSAID', leadPartner: 'Intas Pharmaceuticals', baselineSpend: '₹11.5 L', negotiatedSpend: '₹7.8 L', netSavings: '₹3.70 L', status: 'Realized', lever: 'Generic Substitution' },
    { id: 'SAV-04', initiative: 'Prescription Renal & GI Diet Rebates', category: 'Veterinary Nutrition', leadPartner: 'Royal Canin India', baselineSpend: '₹22.0 L', negotiatedSpend: '₹19.2 L', netSavings: '₹2.80 L', status: 'In Progress', lever: 'Volume Aggregation' },
    { id: 'SAV-05', initiative: '2% 10-Day Accelerated Cash Settlement Program', category: 'Multi-Category Invoices', leadPartner: 'Top 8 Tier-1 Vendors', baselineSpend: '₹92.5 L', negotiatedSpend: '₹90.65 L', netSavings: '₹1.85 L', status: 'Realized', lever: 'Cash Discounts' },
    { id: 'SAV-06', initiative: 'Dermatology & Topical Antifungal Sourcing', category: 'Dermatology & Topicals', leadPartner: 'Dechra Veterinary', baselineSpend: '₹8.4 L', negotiatedSpend: '₹7.1 L', netSavings: '₹1.30 L', status: 'Pipeline', lever: 'Contract Renegotiation' }
  ];

  const filteredInitiatives = initiatives.filter(init => {
    if (selectedLever !== 'ALL' && init.lever !== selectedLever) return false;
    return true;
  });

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(255,255,255,0.08))', borderRadius: '12px', padding: '22px 24px' };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Realized': return { bg: 'rgba(52,211,153,0.15)', color: '#34d399' };
      case 'In Progress': return { bg: 'rgba(56,189,248,0.15)', color: '#38bdf8' };
      case 'Pipeline': return { bg: 'rgba(251,191,36,0.15)', color: '#fbbf24' };
      default: return { bg: 'rgba(148,163,184,0.15)', color: 'var(--muted-foreground, #64748b)' };
    }
  };

  return (
    <DashboardLayout
      category="Vendors & Procurement"
      subcategory="Procurement Savings"
      title="Procurement Cost Savings & Value Realization"
      subtitle="Negotiated price variances, bulk volume consolidation rebates, generic substitution arbitrage, and cash discounts"
      icon="💰"
      badge="Savings Tracker FY26-27"
      actions={
        <button onClick={() => alert('Exporting Procurement Savings Audit Report...')} style={{ padding: '6px 14px', borderRadius: '8px', border: '1px solid #3b82f6', background: 'rgba(59,130,246,0.15)', color: '#60a5fa', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
          📊 Savings Audit Report
        </button>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Realized Savings (FYTD)" value="₹18.40 L" delta="+108.2% vs target" trend="up" subtext="Across all 5 levers" icon="💰" />
        <KpiCard label="Savings % of Addressable Spend" value="16.8%" delta="+2.3% YoY" trend="up" subtext="Total addressable spend" icon="📉" />
        <KpiCard label="Cost Avoidance (Inflation)" value="₹4.60 L" delta="Price locks preserved" trend="up" subtext="Market inflation hedge" icon="🛡️" />
        <KpiCard label="Generic Substitution Arbitrage" value="₹4.90 L" delta="33.4% lower unit cost" trend="up" subtext="Pharma & antibiotics" icon="💊" />
        <KpiCard label="Early Pay Discounts Captured" value="₹1.85 L" delta="92.5% capture rate" trend="up" subtext="2/10 Net 30 terms" icon="⚡" />
        <KpiCard label="Savings in Pipeline (H2)" value="₹5.80 L" delta="3 major RFPs active" trend="up" subtext="Targeted for closure" icon="🎯" />
      </div>

      {/* Savings Levers Progress */}
      <div style={card}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>🎯 Procurement Savings by Strategic Lever</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
          {savingsLevers.map((sl, i) => (
            <div key={i} style={{ background: 'var(--muted, #f8fafc)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>{sl.lever}</span>
                <span style={{ fontSize: '11px', fontWeight: 700, color: sl.color }}>{sl.achievement}% Target</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                <span style={{ fontSize: '20px', fontWeight: 800, color: sl.color }}>{sl.realized}</span>
                <span style={{ fontSize: '11px', color: '#64748b' }}>Target: {sl.target}</span>
              </div>
              <p style={{ margin: 0, fontSize: '11px', color: 'var(--muted-foreground, #64748b)', lineHeight: 1.4 }}>{sl.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Savings Initiatives Ledger */}
      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>📋 Strategic Savings Projects & Initiatives Ledger</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Tracking baseline spend against negotiated contracts and realized financial value</p>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <select
              value={selectedLever}
              onChange={e => setSelectedLever(e.target.value)}
              style={{ background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.15))', borderRadius: '6px', padding: '6px 10px', color: 'var(--foreground, #0f172a)', fontSize: '12px' }}
            >
              <option value="ALL">All Savings Levers</option>
              <option value="Volume Aggregation">Volume Aggregation</option>
              <option value="Contract Renegotiation">Contract Renegotiation</option>
              <option value="Generic Substitution">Generic Substitution</option>
              <option value="Cash Discounts">Cash Discounts</option>
            </select>
          </div>
        </div>

        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'var(--muted, #f8fafc)', borderBottom: '1px solid var(--border, rgba(0,0,0,0.08))' }}>
                {['ID', 'Initiative Name', 'Category', 'Strategic Partner', 'Savings Lever', 'Baseline Spend', 'Contracted Spend', 'Net Savings', 'Status'].map(h => (
                  <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: 'var(--muted-foreground, #64748b)', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredInitiatives.map((item, i) => {
                const badge = getStatusBadge(item.status);
                return (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border, rgba(0,0,0,0.06))' }}>
                    <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', color: '#38bdf8', fontSize: '11px' }}>{item.id}</td>
                    <td style={{ padding: '11px 12px', color: 'var(--foreground, #0f172a)', fontWeight: 600 }}>{item.initiative}</td>
                    <td style={{ padding: '11px 12px', color: 'var(--muted-foreground, #64748b)' }}>{item.category}</td>
                    <td style={{ padding: '11px 12px', color: 'var(--foreground, #334155)' }}>{item.leadPartner}</td>
                    <td style={{ padding: '11px 12px', color: '#a78bfa', fontWeight: 500 }}>{item.lever}</td>
                    <td style={{ padding: '11px 12px', color: '#64748b', textDecoration: 'line-through' }}>{item.baselineSpend}</td>
                    <td style={{ padding: '11px 12px', color: 'var(--foreground, #334155)' }}>{item.negotiatedSpend}</td>
                    <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#34d399' }}>{item.netSavings}</td>
                    <td style={{ padding: '11px 12px' }}>
                      <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, background: badge.bg, color: badge.color }}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}