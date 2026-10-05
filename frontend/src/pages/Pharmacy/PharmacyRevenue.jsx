import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function PharmacyRevenue() {
  const [period, setPeriod] = useState('Month to Date');

  const doctorAttribution = [
    { vet: 'Dr. Priya Sharma', clinic: 'Koramangala Hospital', rxCount: 412, rxRevenue: '₹4,82,400', avgTicket: '₹1,170', convRate: '94.2%', topClass: 'Antiparasitics & Derm' },
    { vet: 'Dr. Rahul Mehta', clinic: 'Bandra Feline Center', rxCount: 328, rxRevenue: '₹3,64,000', avgTicket: '₹1,110', convRate: '91.8%', topClass: 'Feline Chronic & Renal' },
    { vet: 'Dr. Aisha Khan', clinic: 'Delhi NCR Hospital', rxCount: 295, rxRevenue: '₹3,42,800', avgTicket: '₹1,162', convRate: '89.4%', topClass: 'Cardiology & Intensive' },
    { vet: 'Dr. Karan Patel', clinic: 'Ahmedabad Partner', rxCount: 210, rxRevenue: '₹2,38,000', avgTicket: '₹1,133', convRate: '92.0%', topClass: 'Core Preventive Vaccines' },
    { vet: 'Dr. Neha Singh', clinic: 'Pune Ortho Clinic', rxCount: 184, rxRevenue: '₹1,96,200', avgTicket: '₹1,066', convRate: '88.5%', topClass: 'Post-op NSAIDs & Joint' }
  ];

  const cityRevenue = [
    { city: 'Bengaluru (HQ)', revenue: '₹5,68,000', share: '45.1%', growth: '+22.4%', color: '#3b82f6' },
    { city: 'Mumbai MMR', revenue: '₹3,42,000', share: '27.2%', growth: '+18.1%', color: '#0ea5e9' },
    { city: 'Delhi NCR', revenue: '₹1,95,000', share: '15.5%', growth: '+14.6%', color: '#8b5cf6' },
    { city: 'Hyderabad', revenue: '₹98,400', share: '7.8%', growth: '+24.0%', color: '#f59e0b' },
    { city: 'Pune Micro-Hub', revenue: '₹55,000', share: '4.4%', growth: '+19.2%', color: '#10b981' }
  ];

  return (
    <DashboardLayout
      category="Pharmacy"
      subcategory="Pharmacy Revenue"
      title="Veterinary Pharmacy Revenue Intelligence"
      subtitle="Financial realization, doctor prescription monetization, gross-to-net waterfall, and regional sales velocity"
      icon="💎"
      badge="₹12.58 Lakh MTD"
      actions={
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div style={{
            display: 'flex',
            background: 'rgba(255,255,255,0.05)',
            padding: '3px',
            borderRadius: '8px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            {['This Week', 'Month to Date', 'Quarter to Date', 'Annual'].map(p => (
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
            onClick={() => alert('Exporting Pharmacy Gross-to-Net Revenue Reconciliation Statement...')}
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
            <span>📊</span> Export Revenue P&L
          </button>
        </div>
      }
    >
      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Gross Pharmacy Sales" value="₹13.24 Lakh" delta="+19.2% YoY" trend="up" subtext="Billed transaction total" icon="💵" />
        <KpiCard label="Discounts & Promotions" value="-₹65,600" delta="5.0% discount rate" trend="neutral" subtext="Controlled chronic scheme" icon="🏷️" />
        <KpiCard label="Net Realized Revenue" value="₹12.58 Lakh" delta="+18.4% YoY" trend="up" subtext="104.8% of monthly target" icon="💎" />
        <KpiCard label="Avg Revenue / Prescription" value="₹1,248" delta="+6.2% YoY" trend="up" subtext="Multi-item adherence" icon="📋" />
        <KpiCard label="Direct Insurance Claims" value="₹1.02 Lakh" delta="8.1% of revenue" trend="up" subtext="Cashless vet coverage" icon="🛡️" />
        <KpiCard label="Consultation-to-Rx Rate" value="91.4%" delta="+2.6% vs target" trend="up" subtext="Dispensary capture rate" icon="📈" />
      </div>

      {/* Revenue Waterfall & Geographic Contribution */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '18px' }}>
        {/* Waterfall Breakdown */}
        <div style={{
          background: 'var(--card, #1e293b)',
          border: '1px solid var(--border, rgba(255,255,255,0.08))',
          borderRadius: '12px',
          padding: '20px'
        }}>
          <h3 style={{ margin: '0 0 4px', fontSize: '15px', fontWeight: 700 }}>Gross-to-Net Revenue Realization</h3>
          <p style={{ margin: '0 0 16px', fontSize: '12px', color: '#94a3b8' }}>Revenue deductions, returns, and realized cash flow</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
              <span>Gross Pharmacy Billing (MRP)</span>
              <strong style={{ fontFamily: '"IBM Plex Mono", monospace' }}>₹13,24,000</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', background: 'rgba(239,68,68,0.06)', borderRadius: '8px', color: '#f87171' }}>
              <span>Patient Loyalty & Chronic Discounts</span>
              <strong style={{ fontFamily: '"IBM Plex Mono", monospace' }}>- ₹48,200</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', background: 'rgba(239,68,68,0.06)', borderRadius: '8px', color: '#f87171' }}>
              <span>Customer Returns / Damage Adjustments</span>
              <strong style={{ fontFamily: '"IBM Plex Mono", monospace' }}>- ₹17,400</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: 'rgba(16,185,129,0.12)', borderRadius: '8px', border: '1px solid rgba(16,185,129,0.3)', color: '#10b981', fontSize: '14px' }}>
              <span>Net Recognized Pharmaceutical Revenue</span>
              <strong style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '16px' }}>₹12,58,400</strong>
            </div>
          </div>
        </div>

        {/* Regional City Distribution */}
        <div style={{
          background: 'var(--card, #1e293b)',
          border: '1px solid var(--border, rgba(255,255,255,0.08))',
          borderRadius: '12px',
          padding: '20px'
        }}>
          <h3 style={{ margin: '0 0 4px', fontSize: '15px', fontWeight: 700 }}>Geographic Revenue Contribution</h3>
          <p style={{ margin: '0 0 16px', fontSize: '12px', color: '#94a3b8' }}>Pharmacy revenue split by metropolitan region</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {cityRevenue.map((c, i) => (
              <div key={i} style={{ padding: '10px 12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 600 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: c.color }} />
                    {c.city}
                  </span>
                  <span style={{ fontFamily: '"IBM Plex Mono", monospace' }}>{c.revenue}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>
                  <span>Share: {c.share}</span>
                  <span style={{ color: '#10b981' }}>{c.growth} YoY</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Doctor Prescription Revenue Attribution */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Veterinary Prescription Revenue Attribution</h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#94a3b8' }}>Revenue generated per attending clinician & dispensary conversion rate</p>
          </div>
          <span style={{ fontSize: '12px', color: '#10b981', fontWeight: 600 }}>Average Capture Rate: 91.4%</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: '#94a3b8' }}>
                <th style={{ padding: '8px 12px' }}>Veterinarian</th>
                <th style={{ padding: '8px 12px' }}>Hospital / Wing</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Prescriptions Issued</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Conversion Rate</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Avg Ticket</th>
                <th style={{ padding: '8px 12px' }}>Primary Therapeutic Class</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Pharmacy Revenue</th>
              </tr>
            </thead>
            <tbody>
              {doctorAttribution.map((doc, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '10px 12px', fontWeight: 600, color: '#fff' }}>{doc.vet}</td>
                  <td style={{ padding: '10px 12px', color: '#94a3b8' }}>{doc.clinic}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{doc.rxCount}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#10b981', fontWeight: 600 }}>{doc.convRate}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{doc.avgTicket}</td>
                  <td style={{ padding: '10px 12px', color: '#cbd5e1' }}>{doc.topClass}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#38bdf8' }}>
                    {doc.rxRevenue}
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
