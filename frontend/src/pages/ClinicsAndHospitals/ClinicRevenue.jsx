import React, { useState, useEffect } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

const INITIAL_FACILITY_REVENUE = [
  {
    name: 'Zenve Main Hospital',
    city: 'Bengaluru',
    opdRev: '₹4,40,000',
    surgeryRev: '₹5,80,000',
    diagRev: '₹2,90,000',
    ipdRev: '₹1,70,000',
    total: '₹14,80,000',
    share: '47.1%'
  },
  {
    name: 'Global Clinic & Specialty Center',
    city: 'Bangalore',
    opdRev: '₹3,00,000',
    surgeryRev: '₹3,80,000',
    diagRev: '₹1,80,000',
    ipdRev: '₹80,000',
    total: '₹9,40,000',
    share: '29.9%'
  },
  {
    name: 'Globa Pet Care Clinic',
    city: 'Bengaluru',
    opdRev: '₹2,00,000',
    surgeryRev: '₹2,20,000',
    diagRev: '₹1,50,000',
    ipdRev: '₹1,50,000',
    total: '₹7,20,000',
    share: '23.0%'
  }
];

export default function ClinicRevenue() {
  const [period, setPeriod] = useState('Month to Date');
  const [facilityRevenue, setFacilityRevenue] = useState(INITIAL_FACILITY_REVENUE);

  useEffect(() => {
    fetch('/api/v1/clinics')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map((c, i) => {
            const isFlagship = (c.name || '').toLowerCase().includes('zenve') || (c.beds_capacity || 0) >= 10;
            const isGlobal = (c.name || '').toLowerCase().includes('global');
            return {
              name: c.name,
              city: c.city || 'Bengaluru',
              opdRev: isFlagship ? '₹4,40,000' : isGlobal ? '₹3,00,000' : '₹2,00,000',
              surgeryRev: isFlagship ? '₹5,80,000' : isGlobal ? '₹3,80,000' : '₹2,20,000',
              diagRev: isFlagship ? '₹2,90,000' : isGlobal ? '₹1,80,000' : '₹1,50,000',
              ipdRev: isFlagship ? '₹1,70,000' : isGlobal ? '₹80,000' : '₹1,50,000',
              total: isFlagship ? '₹14,80,000' : isGlobal ? '₹9,40,000' : '₹7,20,000',
              share: isFlagship ? '47.1%' : isGlobal ? '29.9%' : '23.0%'
            };
          });
          setFacilityRevenue(mapped);
        }
      })
      .catch(err => console.error("Error fetching clinics revenue:", err));
  }, []);

  return (
    <DashboardLayout
      category="Clinics & Hospitals"
      subcategory="Clinic Revenue"
      title="Hospital & Clinic Revenue Intelligence"
      subtitle="Departmental billing realization, surgical monetization, diagnostic revenue, and pet insurance settlements"
      icon="💰"
      badge="Realized Billings"
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
            onClick={() => alert('Downloading comprehensive Clinic Billing Ledger & Insurance Claims Reconciliation (Excel & PDF)...')}
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
            <span>📥</span> Export Clinical P&L
          </button>
        </div>
      }
    >
      {/* KPI Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Gross Clinical Billings" value="₹31.40 L" delta="+14.2%" trend="up" subtext="Across 3 network hubs" icon="💰" />
        <KpiCard label="Surgical Theatre Revenue" value="₹11.80 L" delta="+18.1%" trend="up" subtext="Orthopedic, soft-tissue, neuro" icon="🔪" />
        <KpiCard label="Outpatient Consultations" value="₹9.40 L" delta="+9.4%" trend="up" subtext="Routine & specialty OPD" icon="🩺" />
        <KpiCard label="Diagnostics & Imaging" value="₹6.20 L" delta="+11.5%" trend="up" subtext="CT, ultrasound, in-house lab" icon="🔬" />
        <KpiCard label="Inpatient ICU / Daycare" value="₹4.00 L" delta="+16.0%" trend="up" subtext="Critical care hospitalization" icon="🛏️" />
        <KpiCard label="Avg Revenue / Case" value="₹2,850" delta="+5.8%" trend="up" subtext="High multi-service adoption" icon="🧾" />
      </div>

      {/* Revenue Split & Payer Distribution */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '18px' }}>
        {/* Service Lines Contribution */}
        <div style={{
          background: 'var(--card, #1e293b)',
          border: '1px solid var(--border, rgba(255,255,255,0.08))',
          borderRadius: '12px',
          padding: '20px'
        }}>
          <h3 style={{ margin: '0 0 4px', fontSize: '15px', fontWeight: 700 }}>Revenue by Clinical Service Line</h3>
          <p style={{ margin: '0 0 16px', fontSize: '12px', color: '#94a3b8' }}>Breakdown of hospital and clinic billing departments</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                <span>Surgeries & Operating Theatres (38%)</span>
                <strong style={{ color: '#10b981' }}>₹11,80,000</strong>
              </div>
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '99px', overflow: 'hidden' }}>
                <div style={{ width: '38%', height: '100%', background: '#10b981' }} />
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                <span>Outpatient Consultations & OPD (30%)</span>
                <strong style={{ color: '#38bdf8' }}>₹9,40,000</strong>
              </div>
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '99px', overflow: 'hidden' }}>
                <div style={{ width: '30%', height: '100%', background: '#38bdf8' }} />
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                <span>Diagnostic Imaging & Blood Panels (20%)</span>
                <strong style={{ color: '#c084fc' }}>₹6,20,000</strong>
              </div>
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '99px', overflow: 'hidden' }}>
                <div style={{ width: '20%', height: '100%', background: '#c084fc' }} />
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                <span>Inpatient ICU & Wards (12%)</span>
                <strong style={{ color: '#fbbf24' }}>₹4,00,000</strong>
              </div>
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '99px', overflow: 'hidden' }}>
                <div style={{ width: '12%', height: '100%', background: '#fbbf24' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Payer Instrument Mix */}
        <div style={{
          background: 'var(--card, #1e293b)',
          border: '1px solid var(--border, rgba(255,255,255,0.08))',
          borderRadius: '12px',
          padding: '20px'
        }}>
          <h3 style={{ margin: '0 0 4px', fontSize: '15px', fontWeight: 700 }}>Payer Mix & Cashless Insurance Claims</h3>
          <p style={{ margin: '0 0 16px', fontSize: '12px', color: '#94a3b8' }}>Payment instruments and pet health insurance settlement</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
            <div style={{ padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
              <span style={{ fontSize: '11px', color: '#94a3b8' }}>Direct Parent Payment</span>
              <div style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px', color: '#38bdf8' }}>72.0%</div>
              <div style={{ fontSize: '10px', color: '#64748b' }}>₹0 · UPI & Cards</div>
            </div>
            <div style={{ padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
              <span style={{ fontSize: '11px', color: '#94a3b8' }}>Cashless Pet Insurance</span>
              <div style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px', color: '#10b981' }}>18.0%</div>
              <div style={{ fontSize: '10px', color: '#64748b' }}>₹0 · Direct TPA settlement</div>
            </div>
            <div style={{ padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
              <span style={{ fontSize: '11px', color: '#94a3b8' }}>Corporate / Wellness Plan</span>
              <div style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px', color: '#a855f7' }}>10.0%</div>
              <div style={{ fontSize: '10px', color: '#64748b' }}>₹0 · Pre-paid bundles</div>
            </div>
            <div style={{ padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
              <span style={{ fontSize: '11px', color: '#94a3b8' }}>Average Claim Settlement</span>
              <div style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px', color: '#f59e0b' }}>3.2 Days</div>
              <div style={{ fontSize: '10px', color: '#64748b' }}>98.4% claim approval rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Facility Revenue Table */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Facility-Level Revenue Realization</h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#94a3b8' }}>Departmental revenue realization across network clinics and tertiary hospitals</p>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: '#94a3b8' }}>
                <th style={{ padding: '8px 12px' }}>Facility</th>
                <th style={{ padding: '8px 12px' }}>City</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>OPD Consults</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Surgeries</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Diagnostics</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Hospitalization</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Total Billings</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Share</th>
              </tr>
            </thead>
            <tbody>
              {facilityRevenue.length === 0 ? (<tr><td colSpan="8" style={{ textAlign: "center", padding: "32px", color: "var(--muted-foreground, #64748b)" }}>No facility revenue records found</td></tr>) : facilityRevenue.map((row, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '10px 12px', fontWeight: 600, color: '#fff' }}>{row.name}</td>
                  <td style={{ padding: '10px 12px', color: '#94a3b8' }}>{row.city}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{row.opdRev}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#10b981' }}>{row.surgeryRev}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{row.diagRev}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{row.ipdRev}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#38bdf8' }}>{row.total}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#cbd5e1' }}>{row.share}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
