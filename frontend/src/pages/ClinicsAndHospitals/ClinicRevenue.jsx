import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function ClinicRevenue() {
  const [period, setPeriod] = useState('Month to Date');

  const facilityRevenue = [];

  return (
    <DashboardLayout
      category="Clinics & Hospitals"
      subcategory="Clinic Revenue"
      title="Hospital & Clinic Revenue Intelligence"
      subtitle="Departmental billing realization, surgical monetization, diagnostic revenue, and pet insurance settlements"
      icon="💰"
      badge="₹0 MTD"
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
        <KpiCard label="Gross Clinical Billings" value="₹0" delta="+18.2% YoY" trend="up" subtext="Across 14 network facilities" icon="💰" />
        <KpiCard label="Surgical Theatre Revenue" value="₹0" delta="37.5% total share" trend="up" subtext="Orthopedic, soft-tissue, neuro" icon="🔪" />
        <KpiCard label="Outpatient Consultations" value="₹0" delta="25.7% total share" trend="up" subtext="Routine & specialty OPD" icon="🩺" />
        <KpiCard label="Diagnostics & Imaging" value="₹0" delta="20.0% total share" trend="up" subtext="CT, ultrasound, in-house lab" icon="🔬" />
        <KpiCard label="Inpatient ICU / Daycare" value="₹0" delta="16.8% total share" trend="up" subtext="Critical care hospitalization" icon="🛏️" />
        <KpiCard label="Avg Revenue / Case" value="₹0" delta="+8.4% YoY" trend="up" subtext="High multi-service adoption" icon="🧾" />
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

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ padding: '10px 12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between' }}>
              <span>Surgeries & Operating Theatres</span>
              <strong style={{ fontFamily: '"IBM Plex Mono", monospace', color: '#10b981' }}>₹0 (37.5%)</strong>
            </div>
            <div style={{ padding: '10px 12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between' }}>
              <span>Outpatient Consultations (OPD)</span>
              <strong style={{ fontFamily: '"IBM Plex Mono", monospace', color: '#38bdf8' }}>₹0 (25.7%)</strong>
            </div>
            <div style={{ padding: '10px 12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between' }}>
              <span>Advanced Diagnostics, CT & Lab</span>
              <strong style={{ fontFamily: '"IBM Plex Mono", monospace', color: '#a855f7' }}>₹0 (20.0%)</strong>
            </div>
            <div style={{ padding: '10px 12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between' }}>
              <span>Inpatient ICU & Hospitalization</span>
              <strong style={{ fontFamily: '"IBM Plex Mono", monospace', color: '#f59e0b' }}>₹0 (16.8%)</strong>
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
              {facilityRevenue.map((row, idx) => (
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
