import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function Taxes() {
  const [taxYear, setTaxYear] = useState('AY 2027-28');

  const gstFilings = [];

  const tdsSummary = [];

  return (
    <DashboardLayout
      category="Finance & Accounting"
      subcategory="Taxes"
      title="Statutory Tax Compliance, GST & TDS Ledger"
      subtitle="GST e-way bills & GSTR-1/3B filings, Section 194J/194C withholding tax remittances, and corporate tax provisioning"
      icon="🏛️"
      badge=""
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => alert('Exporting tax compliance certificate and e-Challan payment pack...')}
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
            🏛️ Export Tax Pack
          </button>
        </div>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="GST Output Liability" value="₹0" delta="0.0%" trend="neutral" subtext="Current month gross" icon="🏛️" />
        <KpiCard label="Input Tax Credit (ITC)" value="₹0" delta="0.0%" trend="neutral" subtext="Zero disputed credit" icon="📥" />
        <KpiCard label="Net GST Cash Payable" value="₹0" delta="--" trend="neutral" subtext="Statutory due date" icon="💰" />
        <KpiCard label="TDS Deducted & Deposited" value="₹0" delta="0.0%" trend="neutral" subtext="Challan ITNS 281" icon="📑" />
        <KpiCard label="Advance Income Tax" value="₹0" delta="--" trend="neutral" subtext="Section 115BAA rate" icon="🛡️" />
        <KpiCard label="Statutory Compliance Score" value="0 / 100" delta="--" trend="neutral" subtext="Tier-1 clean audit" icon="⭐" />
      </div>

      <div style={{
        background: 'var(--card, #131d2e)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '22px 24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#fff' }}>📑 Goods & Services Tax (GST) Returns Dashboard</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>GSTIN: 29AABCZ8412K1Z9 · Government of India GST Portal Sync</p>
          </div>
          <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>GSTIN Verified Active</span>
        </div>

        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.22)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <th style={{ padding: '10px 20px', textAlign: 'left', color: '#94a3b8' }}>GST Form & Return Type</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', color: '#94a3b8' }}>Tax Period</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', color: '#94a3b8' }}>Filing Due Date</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Taxable Turnover</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Output Tax</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>ITC Offset</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Net Cash Paid</th>
                <th style={{ padding: '10px 20px', textAlign: 'right', color: '#94a3b8' }}>Filing Status</th>
              </tr>
            </thead>
            <tbody>
              {gstFilings.length === 0 ? (<tr><td colSpan="8" style={{ textAlign: "center", padding: "32px", color: "var(--muted-foreground, #64748b)" }}>No GST filing records found</td></tr>) : gstFilings.map((g, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 20px', color: '#fff', fontWeight: 600 }}>{g.form}</td>
                  <td style={{ padding: '12px 14px', color: '#38bdf8' }}>{g.period}</td>
                  <td style={{ padding: '12px 14px', color: '#cbd5e1' }}>{g.due}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{g.taxable}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#fbbf24' }}>{g.taxAmt}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#10b981' }}>{g.itcOffset}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#38bdf8' }}>{g.netPayable}</td>
                  <td style={{ padding: '12px 20px', textAlign: 'right' }}>
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '10px',
                      fontWeight: 600,
                      background: g.status.includes('Filed') || g.status.includes('Reconciled') ? 'rgba(16,185,129,0.15)' : 'rgba(56,189,248,0.15)',
                      color: g.status.includes('Filed') || g.status.includes('Reconciled') ? '#34d399' : '#38bdf8'
                    }}>
                      {g.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tax Deducted at Source (TDS) */}
      <div style={{
        background: 'var(--card, #131d2e)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '22px 24px'
      }}>
        <h3 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 700, color: '#fff' }}>🏛️ Tax Deducted at Source (TDS) Withholding & Remittance</h3>
        <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Quarterly Form 26Q & 24Q compliance for surgeons, landlords, and staff</p>

        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.22)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <th style={{ padding: '10px 20px', textAlign: 'left', color: '#94a3b8' }}>Income Tax Section</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', color: '#94a3b8' }}>Payee Category</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Gross Base</th>
                <th style={{ padding: '10px 14px', textAlign: 'center', color: '#94a3b8' }}>TDS Rate</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>TDS Deducted</th>
                <th style={{ padding: '10px 14px', textAlign: 'center', color: '#94a3b8' }}>Remittance Due</th>
                <th style={{ padding: '10px 20px', textAlign: 'right', color: '#94a3b8' }}>Challan Status</th>
              </tr>
            </thead>
            <tbody>
              {tdsSummary.map((t, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 20px', color: '#fff', fontWeight: 600 }}>{t.section}</td>
                  <td style={{ padding: '12px 14px', color: '#94a3b8' }}>{t.desc}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{t.baseAmt}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'center', fontFamily: '"IBM Plex Mono", monospace', color: '#38bdf8' }}>{t.rate}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#10b981' }}>{t.tdsDeducted}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'center', color: '#cbd5e1' }}>{t.due}</td>
                  <td style={{ padding: '12px 20px', textAlign: 'right' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '4px', background: 'rgba(16,185,129,0.15)', color: '#34d399', fontSize: '11px', fontWeight: 600 }}>{t.status}</span>
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
