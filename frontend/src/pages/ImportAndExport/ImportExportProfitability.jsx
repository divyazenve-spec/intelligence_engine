import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function ImportExportProfitability() {
  const lanes = [
    { lane: 'Import: Clinical Diet (France to India)', grossCost: '₹48,50,000', landedLanded: '₹56,40,000', domesticNetRev: '₹94,80,000', grossProfit: '₹38,40,000', margin: '40.5%', status: 'High Yield' },
    { lane: 'Import: Antiparasitics & Biologics (Germany)', grossCost: '₹34,20,000', landedLanded: '₹38,60,000', domesticNetRev: '₹74,20,000', grossProfit: '₹35,60,000', margin: '48.0%', status: 'Prime Yield' },
    { lane: 'Export: Bespoke Luxury Leather (India to UAE)', grossCost: '₹4,80,000', landedLanded: '₹5,40,000', exportFobRev: '₹14,50,000', grossProfit: '₹9,10,000', margin: '62.8%', status: 'Atelier Premium' },
    { lane: 'Export: Organic Herbal Shampoos (India to SG)', grossCost: '₹9,20,000', landedLanded: '₹10,80,000', exportFobRev: '₹22,80,000', grossProfit: '₹12,00,000', margin: '52.6%', status: 'High Margin' }
  ];

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Import & Export"
      subcategory="Profitability"
      title="Landed Cost Economics & Cross-Border Margins"
      subtitle="Total landed cost breakdown (CIF, customs duty, IGST, clearing, cold freight) and net international export arbitrage"
      icon="💎"
      badge="47.2% Net Trade Margin"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Blended Trade Gross Margin" value="47.2%" delta="+3.4% YoY" trend="up" subtext="Direct OEM sourcing advantage" icon="💎" />
        <KpiCard label="Landed Cost Multiplier" value="1.14x CIF" delta="Duty + Freight + Clearance" trend="up" subtext="Lowest in specialty animal health" icon="📈" />
        <KpiCard label="Export Net Contribution" value="₹21.10 Lakh" delta="60.5% average export margin" trend="up" subtext="Haute couture luxury markup" icon="💰" />
        <KpiCard label="Forex Gain / Arbitrage" value="+₹1.84 Lakh" delta="Favorable EUR/INR hedge" trend="up" subtext="Treasury forward lock" icon="🌐" />
      </div>

      <div style={card}>
        <h3 style={{ margin: '0 0 12px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>Trade Lane Unit Economics & Landed Margins</h3>
        <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Procurement costs, landed freight & customs duty, realized revenue, and gross profit realization</p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)' }}>
                <th style={{ padding: '10px 12px' }}>Trade Lane Description</th>
                <th style={{ padding: '10px 12px' }}>Procurement Cost</th>
                <th style={{ padding: '10px 12px' }}>Total Landed Cost</th>
                <th style={{ padding: '10px 12px' }}>Realized Net Revenue</th>
                <th style={{ padding: '10px 12px' }}>Gross Profit</th>
                <th style={{ padding: '10px 12px' }}>Gross Margin</th>
                <th style={{ padding: '10px 12px' }}>Rating</th>
              </tr>
            </thead>
            <tbody>
              {lanes.map(l => (
                <tr key={l.lane} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                  <td style={{ padding: '12px', fontWeight: 600 }}>{l.lane}</td>
                  <td style={{ padding: '12px' }}>{l.grossCost}</td>
                  <td style={{ padding: '12px', color: '#64748b' }}>{l.landedLanded}</td>
                  <td style={{ padding: '12px', fontWeight: 600, color: '#0f172a' }}>{l.domesticNetRev || l.exportFobRev}</td>
                  <td style={{ padding: '12px', fontWeight: 600, color: '#059669' }}>{l.grossProfit}</td>
                  <td style={{ padding: '12px', fontWeight: 600, color: '#0891b2' }}>{l.margin}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ padding: '3px 8px', borderRadius: '999px', fontSize: '10px', fontWeight: 600, background: 'rgba(16,185,129,0.12)', color: '#059669' }}>
                      {l.status}
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
