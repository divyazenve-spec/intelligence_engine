import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function ServiceProfitability() {
  const profitLines = [
    { service: 'Outpatient Consultations', revenue: '₹3,42,000', directCost: '₹54,720', grossProfit: '₹2,87,280', margin: '84.0%', costDrivers: 'Doctor Retainer + Sterilization', status: 'Highest Margin' },
    { service: 'Dental & Oral Surgery', revenue: '₹1,22,000', directCost: '₹26,840', grossProfit: '₹95,160', margin: '78.0%', costDrivers: 'Ultrasonic Tips, Polish Paste, Anesthesia', status: 'High Margin' },
    { service: 'Cardiology & Diagnostic Doppler', revenue: '₹1,84,000', directCost: '₹47,472', grossProfit: '₹1,36,528', margin: '74.2%', costDrivers: 'Cardiologist Commission + Probe Wear', status: 'High Margin' },
    { service: 'Orthopedic & Soft Tissue Surgery', revenue: '₹4,85,000', directCost: '₹1,35,800', grossProfit: '₹3,49,200', margin: '72.0%', costDrivers: 'Implants, Suture Packs, Sevoflurane, OT Nursing', status: 'High Absolute EBITDA' },
    { service: 'In-House Laboratory Diagnostics', revenue: '₹2,68,000', directCost: '₹84,420', grossProfit: '₹1,83,580', margin: '68.5%', costDrivers: 'Dry Chemistry Cartridges, Reagents, Calibrators', status: 'Steady Margin' },
    { service: 'Vaccinations & Biologicals', revenue: '₹98,000', directCost: '₹41,160', grossProfit: '₹56,840', margin: '58.0%', costDrivers: 'Vaccine Vials Wholesale + Cold-Chain Freight', status: 'Loss Leader / Retention' }
  ];

  const costBreakdown = [
    { category: 'Veterinary Doctor Retainers & Incentive Splits', amount: '₹2,42,000', pctOfRev: '16.1%', note: 'Performance-linked clinical commissions' },
    { category: 'Surgical Consumables & Implants (Orthopedic / Soft Tissue)', amount: '₹94,000', pctOfRev: '6.3%', note: 'Titanium TPLO plates, sterile drapes, sutures' },
    { category: 'Diagnostic Reagents & Biochemistry Discs', amount: '₹62,000', pctOfRev: '4.1%', note: 'Automated wet/dry hematology analyzers' },
    { category: 'Anesthesia Gases & Pre-Medications (Iso/Sevo/Propofol)', amount: '₹34,000', pctOfRev: '2.3%', note: 'High purity medical oxygen & inhalation agents' },
    { category: 'Clinical Paramedic & Vet Nursing Staff Payroll', amount: '₹1,10,000', pctOfRev: '7.3%', note: '14 certified veterinary technicians' },
    { category: 'Hospital Sterilization, Autoclaves & Bio-Waste SOP', amount: '₹28,000', pctOfRev: '1.9%', note: 'Biomedical waste incinerator contracts' }
  ];

  return (
    <DashboardLayout
      category="Veterinary Services"
      subcategory="Service Profitability"
      title="Veterinary Clinical Unit Economics & Margin Diagnostics"
      subtitle="Gross profit margins, doctor compensation splits, surgical consumable expenses, diagnostic test cost-of-goods, and operating EBITDA"
      icon="📈"
      badge="73.9% Blended Clinical Margin"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Blended Gross Margin" value="73.9%" delta="+2.8% YoY" trend="up" subtext="Benchmark: 68.0%" icon="📈" />
        <KpiCard label="Clinical Gross Profit" value="₹11.08 Lakh" delta="+21.4% MoM" trend="up" subtext="From ₹14.99L revenue" icon="💰" />
        <KpiCard label="Doctor Commission Ratio" value="16.1%" delta="Target < 18.0%" trend="up" subtext="Highly accretive payout model" icon="👨‍⚕️" />
        <KpiCard label="EBITDA Contribution" value="₹8.68 Lakh" delta="57.9% net yield" trend="up" subtext="After all hub operating overheads" icon="💎" />
      </div>

      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Clinical Service Line Profitability & Margin Matrix</h3>
          <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>Granular contribution margins per specialty after direct consumables, lab reagents, and doctor clinical incentives</p>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', color: '#64748b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Service Line</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Revenue (MTD)</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Direct COGS</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Gross Margin (₹)</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Margin %</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Key Cost Drivers</th>
                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Tier</th>
              </tr>
            </thead>
            <tbody>
              {profitLines.map(p => (
                <tr key={p.service} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: '#0f172a' }}>{p.service}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 600, color: '#0f172a', fontFamily: '"IBM Plex Mono", monospace' }}>{p.revenue}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', color: '#dc2626', fontFamily: '"IBM Plex Mono", monospace' }}>{p.directCost}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 700, color: '#16a34a', fontFamily: '"IBM Plex Mono", monospace' }}>{p.grossProfit}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 700, color: '#2563eb' }}>{p.margin}</td>
                  <td style={{ padding: '12px 16px', color: '#64748b', fontSize: '11px' }}>{p.costDrivers}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '999px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: p.status === 'Highest Margin' ? '#dcfce7' : p.status === 'High Margin' ? '#dbeafe' : p.status.includes('EBITDA') ? '#f3e8ff' : '#f1f5f9',
                      color: p.status === 'Highest Margin' ? '#15803d' : p.status === 'High Margin' ? '#1e40af' : p.status.includes('EBITDA') ? '#7e22ce' : '#475569'
                    }}>
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Direct Clinical Expense Waterfall */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Direct Clinical Operating Expenses (Opex & Consumables)</h3>
          <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>Detailed expenditure breakdown across surgical implants, diagnostics, and clinical staff</p>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', color: '#64748b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Cost Center</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Monthly Outflow</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>% of Revenue</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Operational Rationale & Controls</th>
              </tr>
            </thead>
            <tbody>
              {costBreakdown.map(c => (
                <tr key={c.category} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>{c.category}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 700, color: '#dc2626', fontFamily: '"IBM Plex Mono", monospace' }}>{c.amount}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 600, color: '#2563eb' }}>{c.pctOfRev}</td>
                  <td style={{ padding: '12px 16px', color: '#64748b' }}>{c.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
