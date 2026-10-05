import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function BalanceSheet() {
  const [asOfDate, setAsOfDate] = useState('September 30, 2026');

  const assets = [
    { cat: 'Current Assets', name: 'Cash and Cash Equivalents (HDFC & ICICI)', val: '₹1,48,20,000', prev: '₹1,18,50,000', change: '+25.1%' },
    { cat: 'Current Assets', name: 'Trade Receivables (Insurance & Corporate TPA)', val: '₹20,82,000', prev: '₹18,40,000', change: '+13.2%' },
    { cat: 'Current Assets', name: 'Pharmaceutical & Surgical Inventory', val: '₹18,65,000', prev: '₹16,20,000', change: '+15.1%' },
    { cat: 'Current Assets', name: 'Prepaid Clinical Leases & Supplier Advances', val: '₹8,40,000', prev: '₹7,50,000', change: '+12.0%' },
    { cat: 'Current Assets', name: 'TOTAL CURRENT ASSETS', val: '₹1,96,07,000', prev: '₹1,60,60,000', change: '+22.1%', isSubtotal: true },
    { cat: 'Non-Current Assets', name: 'Modular OTs & High-Resolution Imaging (DR/USG)', val: '₹2,84,00,000', prev: '₹2,92,00,000', change: '-2.7%' },
    { cat: 'Non-Current Assets', name: 'Hospital Leasehold Improvements (14 Facilities)', val: '₹1,12,00,000', prev: '₹1,18,00,000', change: '-5.1%' },
    { cat: 'Non-Current Assets', name: 'Tele-radiology PACS & Proprietary EMR Software', val: '₹42,00,000', prev: '₹45,00,000', change: '-6.7%' },
    { cat: 'Non-Current Assets', name: 'Security Deposits with Hospital Landlords', val: '₹36,00,000', prev: '₹36,00,000', change: '0.0%' },
    { cat: 'Non-Current Assets', name: 'TOTAL NON-CURRENT ASSETS', val: '₹4,74,00,000', prev: '₹4,91,00,000', change: '-3.5%', isSubtotal: true },
    { cat: 'Total', name: 'TOTAL ASSETS', val: '₹6,70,07,000', prev: '₹6,51,60,000', change: '+2.8%', isTotal: true }
  ];

  const liabilitiesAndEquity = [
    { cat: 'Current Liabilities', name: 'Trade Payables (Pharma & Consumable Vendors)', val: '₹25,90,000', prev: '₹22,40,000', change: '+15.6%' },
    { cat: 'Current Liabilities', name: 'Accrued Doctor Surgeon Fees & Nursing Payroll', val: '₹14,20,000', prev: '₹13,80,000', change: '+2.9%' },
    { cat: 'Current Liabilities', name: 'Statutory Dues (GST Output, TDS 194J/194C)', val: '₹8,45,000', prev: '₹7,90,000', change: '+7.0%' },
    { cat: 'Current Liabilities', name: 'Unearned Advance Patient Package Deposits', val: '₹6,12,000', prev: '₹5,40,000', change: '+13.3%' },
    { cat: 'Current Liabilities', name: 'TOTAL CURRENT LIABILITIES', val: '₹54,67,000', prev: '₹49,50,000', change: '+10.4%', isSubtotal: true },
    { cat: 'Non-Current Liabilities', name: 'Term Loan for Modular OT Equipment (SIDBI)', val: '₹48,00,000', prev: '₹56,00,000', change: '-14.3%' },
    { cat: 'Non-Current Liabilities', name: 'Long-term Hospital Lease Financial Obligations', val: '₹1,24,00,000', prev: '₹1,32,00,000', change: '-6.1%' },
    { cat: 'Non-Current Liabilities', name: 'TOTAL NON-CURRENT LIABILITIES', val: '₹1,72,00,000', prev: '₹1,88,00,000', change: '-8.5%', isSubtotal: true },
    { cat: 'Shareholders Equity', name: 'Paid-Up Common Equity Capital', val: '₹2,50,00,000', prev: '₹2,50,00,000', change: '0.0%' },
    { cat: 'Shareholders Equity', name: 'Retained Earnings & Reserves', val: '₹1,57,20,000', prev: '₹1,27,90,000', change: '+22.9%' },
    { cat: 'Shareholders Equity', name: 'Current Period Retained PAT Surplus', val: '₹36,20,000', prev: '₹36,20,000', change: '+100.0%' },
    { cat: 'Shareholders Equity', name: 'TOTAL SHAREHOLDERS EQUITY', val: '₹4,43,40,000', prev: '₹4,14,10,000', change: '+7.1%', isSubtotal: true },
    { cat: 'Total', name: 'TOTAL LIABILITIES & SHAREHOLDERS EQUITY', val: '₹6,70,07,000', prev: '₹6,51,60,000', change: '+2.8%', isTotal: true }
  ];

  return (
    <DashboardLayout
      category="Finance & Accounting"
      subcategory="Balance Sheet"
      title="Statement of Financial Position (Balance Sheet)"
      subtitle="Comprehensive capital structure, working capital liquidity, fixed hospital assets, and shareholder net worth"
      icon="🏛️"
      badge="Net Worth: ₹4.43 Cr"
      actions={
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', color: '#94a3b8' }}>As of: <b>{asOfDate}</b></span>
          <button
            onClick={() => alert('Downloading official audited Balance Sheet...')}
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
            📥 Download Balance Sheet
          </button>
        </div>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Assets" value="₹6.70 Crore" delta="+2.8% QoQ" trend="up" subtext="Fully balanced" icon="🏛️" />
        <KpiCard label="Shareholders Equity" value="₹4.43 Crore" delta="66.2% of Capital" trend="up" subtext="Strong net worth" icon="💎" />
        <KpiCard label="Current Ratio" value="3.59x" delta="Standard > 1.5x" trend="up" subtext="High liquidity buffer" icon="💧" />
        <KpiCard label="Quick Ratio" value="3.24x" delta="Excluding inventory" trend="up" subtext="Instant solvency" icon="⚡" />
        <KpiCard label="Debt to Equity" value="0.11x" delta="Conservative" trend="up" subtext="Term debt: ₹48 Lakh" icon="🛡️" />
        <KpiCard label="Working Capital" value="₹1.41 Crore" delta="+27.4% QoQ" trend="up" subtext="Current A - Current L" icon="📈" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', gap: '20px' }}>
        {/* Assets Side */}
        <div style={{
          background: 'var(--card, #131d2e)',
          border: '1px solid var(--border, rgba(255,255,255,0.08))',
          borderRadius: '12px',
          padding: '22px 24px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#fff' }}>💼 Assets Breakdown</h3>
              <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Current liquid assets and capital infrastructure</p>
            </div>
            <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>Total: ₹6.70 Cr</span>
          </div>

          <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr style={{ background: 'rgba(0,0,0,0.22)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <th style={{ padding: '10px 20px', textAlign: 'left', color: '#94a3b8' }}>Asset Item</th>
                  <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Current Quarter</th>
                  <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Previous</th>
                  <th style={{ padding: '10px 20px', textAlign: 'right', color: '#94a3b8' }}>YoY %</th>
                </tr>
              </thead>
              <tbody>
                {assets.map((a, idx) => (
                  <tr key={idx} style={{
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    background: a.isTotal ? 'rgba(56,189,248,0.1)' : a.isSubtotal ? 'rgba(255,255,255,0.04)' : 'transparent',
                    fontWeight: a.isTotal || a.isSubtotal ? 700 : 400
                  }}>
                    <td style={{ padding: '10px 20px', color: a.isTotal ? '#38bdf8' : a.isSubtotal ? '#fff' : '#cbd5e1' }}>{a.name}</td>
                    <td style={{ padding: '10px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: a.isTotal ? '#38bdf8' : '#fff' }}>{a.val}</td>
                    <td style={{ padding: '10px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#94a3b8' }}>{a.prev}</td>
                    <td style={{ padding: '10px 20px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: a.change.startsWith('+') ? '#10b981' : '#cbd5e1' }}>{a.change}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Liabilities & Equity Side */}
        <div style={{
          background: 'var(--card, #131d2e)',
          border: '1px solid var(--border, rgba(255,255,255,0.08))',
          borderRadius: '12px',
          padding: '22px 24px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#fff' }}>⚖️ Liabilities & Equity</h3>
              <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>External obligations and shareholder capitalization</p>
            </div>
            <span style={{ fontSize: '11px', color: '#38bdf8', fontWeight: 600 }}>Total: ₹6.70 Cr</span>
          </div>

          <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr style={{ background: 'rgba(0,0,0,0.22)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <th style={{ padding: '10px 20px', textAlign: 'left', color: '#94a3b8' }}>Obligation / Capital Item</th>
                  <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Current Quarter</th>
                  <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Previous</th>
                  <th style={{ padding: '10px 20px', textAlign: 'right', color: '#94a3b8' }}>YoY %</th>
                </tr>
              </thead>
              <tbody>
                {liabilitiesAndEquity.map((l, idx) => (
                  <tr key={idx} style={{
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    background: l.isTotal ? 'rgba(56,189,248,0.1)' : l.isSubtotal ? 'rgba(255,255,255,0.04)' : 'transparent',
                    fontWeight: l.isTotal || l.isSubtotal ? 700 : 400
                  }}>
                    <td style={{ padding: '10px 20px', color: l.isTotal ? '#38bdf8' : l.isSubtotal ? '#fff' : '#cbd5e1' }}>{l.name}</td>
                    <td style={{ padding: '10px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: l.isTotal ? '#38bdf8' : '#fff' }}>{l.val}</td>
                    <td style={{ padding: '10px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#94a3b8' }}>{l.prev}</td>
                    <td style={{ padding: '10px 20px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: l.change.startsWith('+') ? '#10b981' : '#cbd5e1' }}>{l.change}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
