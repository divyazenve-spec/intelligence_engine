import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function EBITDA() {
  const [metricView, setMetricView] = useState('Operating');

  const facilityEbitda = [
    { facility: 'Zenve Hospital Koramangala (24x7)', city: 'Bengaluru', rev: '₹14.20 Lakh', gp: '₹8.95 Lakh', opex: '₹4.85 Lakh', ebitda: '₹4.10 Lakh', margin: '28.9%', status: 'Top Performer' },
    { facility: 'Zenve Multi-Specialty Bandra', city: 'Mumbai', rev: '₹11.85 Lakh', gp: '₹7.45 Lakh', opex: '₹4.20 Lakh', ebitda: '₹3.25 Lakh', margin: '27.4%', status: 'Top Performer' },
    { facility: 'Zenve Animal Hospital Okhla', city: 'Delhi NCR', rev: '₹9.40 Lakh', gp: '₹5.64 Lakh', opex: '₹3.40 Lakh', ebitda: '₹2.24 Lakh', margin: '23.8%', status: 'Solid EBITDA' },
    { facility: 'Zenve Jubilee Hills Specialty', city: 'Hyderabad', rev: '₹4.80 Lakh', gp: '₹2.78 Lakh', opex: '₹1.80 Lakh', ebitda: '₹0.98 Lakh', margin: '20.4%', status: 'Solid EBITDA' },
    { facility: 'Zenve Care Center Indiranagar', city: 'Bengaluru', rev: '₹5.60 Lakh', gp: '₹3.25 Lakh', opex: '₹2.10 Lakh', ebitda: '₹1.15 Lakh', margin: '20.5%', status: 'Solid EBITDA' },
    { facility: 'Zenve Koregaon Park Clinic', city: 'Pune', rev: '₹3.20 Lakh', gp: '₹1.82 Lakh', opex: '₹1.35 Lakh', ebitda: '₹0.47 Lakh', margin: '14.7%', status: 'Ramping Up' }
  ];

  const bridgeItems = [
    { step: 'Reported GAAP Operating Income (EBIT)', amt: '₹13,30,000', type: 'base' },
    { step: '+ Add-back: Depreciation of Medical Equipment & Imaging', amt: '+₹2,40,000', type: 'add' },
    { step: 'REPORTED OPERATING EBITDA', amt: '₹15,70,000', type: 'subtotal' },
    { step: '+ Add-back: Pre-Opening Fitout Costs for Whitefield Hub', amt: '+₹1,20,000', type: 'add' },
    { step: '+ Add-back: Cloud EMR Architecture One-Time Migration', amt: '+₹60,000', type: 'add' },
    { step: 'NORMALIZED ADJUSTED EBITDA', amt: '₹17,50,000', type: 'total' }
  ];

  return (
    <DashboardLayout
      category="Finance & Accounting"
      subcategory="EBITDA"
      title="EBITDA & Operating Cash Flow Velocity"
      subtitle="Operating profitability before capital structure & tax deductions, facility EBITDA margins, and adjusted EBITDA bridge"
      icon="⚡"
      badge="Operating EBITDA: 20.02%"
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => alert('Exporting EBITDA Bridge & Facility Margin Model...')}
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
            ⚡ Export EBITDA Model
          </button>
        </div>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Operating EBITDA (MTD)" value="₹15.70 Lakh" delta="+49.5% vs Plan" trend="up" subtext="20.02% of Revenue" icon="⚡" />
        <KpiCard label="Normalized Adjusted EBITDA" value="₹17.50 Lakh" delta="22.3% Adj Margin" trend="up" subtext="Adding non-recurring" icon="💎" />
        <KpiCard label="Annualized EBITDA Run-rate" value="₹1.88 Crore" delta="+28.4% YoY" trend="up" subtext="Debt service coverage >15x" icon="📈" />
        <KpiCard label="EBITDA-to-Cash Conversion" value="76.4%" delta="High cash flow" trend="up" subtext="CFO / EBITDA" icon="💧" />
        <KpiCard label="Flagship Tertiary EBITDA" value="28.9%" delta="Koramangala 24x7" trend="up" subtext="Highest volume center" icon="🏥" />
        <KpiCard label="Break-Even Hospital Month" value="3.2 Months" delta="-1.4 mo faster" trend="up" subtext="Average new center" icon="⏱️" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', gap: '20px' }}>
        {/* Facility EBITDA Contribution */}
        <div style={{
          background: 'var(--card, #131d2e)',
          border: '1px solid var(--border, rgba(255,255,255,0.08))',
          borderRadius: '12px',
          padding: '22px 24px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#fff' }}>🏥 Facility-Level EBITDA Performance</h3>
              <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Individual clinic operating contribution after local facility expenses</p>
            </div>
            <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>100% Locations EBITDA Positive</span>
          </div>

          <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr style={{ background: 'rgba(0,0,0,0.22)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <th style={{ padding: '10px 20px', textAlign: 'left', color: '#94a3b8' }}>Facility</th>
                  <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Revenue</th>
                  <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>EBITDA</th>
                  <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>EBITDA Margin</th>
                  <th style={{ padding: '10px 20px', textAlign: 'right', color: '#94a3b8' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {facilityEbitda.map((f, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '12px 20px', color: '#fff', fontWeight: 600 }}>
                      {f.facility}<br />
                      <span style={{ fontSize: '10px', color: '#94a3b8' }}>{f.city}</span>
                    </td>
                    <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{f.rev}</td>
                    <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#10b981' }}>{f.ebitda}</td>
                    <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#38bdf8' }}>{f.margin}</td>
                    <td style={{ padding: '12px 20px', textAlign: 'right' }}>
                      <span style={{
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '10px',
                        fontWeight: 600,
                        background: f.status === 'Top Performer' ? 'rgba(16,185,129,0.15)' : 'rgba(56,189,248,0.15)',
                        color: f.status === 'Top Performer' ? '#34d399' : '#38bdf8'
                      }}>
                        {f.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* EBITDA Bridge */}
        <div style={{
          background: 'var(--card, #131d2e)',
          border: '1px solid var(--border, rgba(255,255,255,0.08))',
          borderRadius: '12px',
          padding: '22px 24px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#fff' }}>🌉 Adjusted EBITDA Bridge (Normalized)</h3>
              <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Management non-recurring normalization adjustments</p>
            </div>
            <span style={{ fontSize: '11px', color: '#38bdf8', fontWeight: 600 }}>Normalized: 22.3%</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {bridgeItems.map((b, idx) => {
              const isTot = b.type === 'total';
              const isSub = b.type === 'subtotal';
              return (
                <div key={idx} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  background: isTot ? 'rgba(56,189,248,0.12)' : isSub ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.18)',
                  border: isTot ? '1px solid rgba(56,189,248,0.3)' : '1px solid rgba(255,255,255,0.06)'
                }}>
                  <span style={{
                    fontSize: '12px',
                    fontWeight: isTot || isSub ? 700 : 400,
                    color: isTot ? '#38bdf8' : isSub ? '#fff' : '#cbd5e1'
                  }}>
                    {b.step}
                  </span>
                  <span style={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: isTot ? '15px' : '13px',
                    fontWeight: 700,
                    color: isTot ? '#38bdf8' : b.type === 'add' ? '#10b981' : '#fff'
                  }}>
                    {b.amt}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
