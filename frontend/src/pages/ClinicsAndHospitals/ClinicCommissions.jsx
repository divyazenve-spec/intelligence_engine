import React, { useState, useMemo } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function ClinicCommissions() {
  const [partnerFilter, setPartnerFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [toast, setToast] = useState('');

  const commissionLedger = [
    { id: 'COM-2026-081', partner: 'PetCare Referral Clinic (Indiranagar)', type: 'Partner Clinic', cases: 28, billed: 420000, rate: '12.5%', grossCom: 52500, tds: 5250, netPay: 47250, status: 'Settled', bankRef: 'NEFT-AXIS-90812' },
    { id: 'COM-2026-082', partner: 'Dr. Vikram Sethi (Visiting Orthopedic)', type: 'Visiting Surgeon', cases: 14, billed: 380000, rate: '25.0%', grossCom: 95000, tds: 9500, netPay: 85500, status: 'Settled', bankRef: 'NEFT-HDFC-44120' },
    { id: 'COM-2026-083', partner: 'Bandra Pet Diagnostic Associates', type: 'Diagnostic Partner', cases: 45, billed: 310000, rate: '15.0%', grossCom: 46500, tds: 4650, netPay: 41850, status: 'Scheduled (Friday)', bankRef: 'Pending Release' },
    { id: 'COM-2026-084', partner: 'South Ex Pet Health Network', type: 'Partner Clinic', cases: 22, billed: 280000, rate: '12.5%', grossCom: 35000, tds: 3500, netPay: 31500, status: 'Scheduled (Friday)', bankRef: 'Pending Release' },
    { id: 'COM-2026-085', partner: 'Dr. Sneha Kulkarni (Laparoscopy Specialist)', type: 'Visiting Surgeon', cases: 8, billed: 190000, rate: '25.0%', grossCom: 47500, tds: 4750, netPay: 42750, status: 'In Audit', bankRef: 'Audit Hold' },
    { id: 'COM-2026-086', partner: 'Hyderabad Vet Diagnostic Labs', type: 'Diagnostic Partner', cases: 32, billed: 210000, rate: '15.0%', grossCom: 31500, tds: 3150, netPay: 28350, status: 'Settled', bankRef: 'NEFT-ICICI-66219' }
  ];

  const filtered = useMemo(() => {
    return commissionLedger.filter(c => {
      const matchType = partnerFilter === 'ALL' || c.type === partnerFilter;
      const matchStatus = statusFilter === 'ALL' || c.status.startsWith(statusFilter);
      return matchType && matchStatus;
    });
  }, [partnerFilter, statusFilter]);

  function handleExecutePayout() {
    setToast('Weekly direct bank transfer (NEFT/RTGS) batch approved and sent to bank gateway!');
    setTimeout(() => setToast(''), 3500);
  }

  return (
    <DashboardLayout
      category="Clinics & Hospitals"
      subcategory="Clinic Commissions"
      title="Partner Clinic Commissions & Surgeon Honorariums"
      subtitle="B2B referral commissions, diagnostic cross-referrals, visiting surgeon honorariums, and TDS compliance (Section 194J)"
      icon="🤝"
      badge="12.5% Standard Referral"
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={handleExecutePayout}
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
            <span>💸</span> Process Friday Payout Batch
          </button>
        </div>
      }
    >
      {toast && (
        <div style={{
          padding: '12px 16px',
          borderRadius: '8px',
          background: 'rgba(16,185,129,0.15)',
          border: '1px solid rgba(16,185,129,0.3)',
          color: '#10b981',
          fontSize: '13px',
          fontWeight: 600
        }}>
          ✓ {toast}
        </div>
      )}

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Commissions Settled MTD" value="₹5.84 Lakh" delta="+16.2% YoY" trend="up" subtext="Direct to partner bank accounts" icon="💸" />
        <KpiCard label="Scheduled for Friday" value="₹1.12 Lakh" delta="2 Payout Batches" trend="neutral" subtext="Pre-audited & verified" icon="📅" />
        <KpiCard label="Partner Clinic Cases" value="149 Cases" delta="+22% referral volume" trend="up" subtext="Advanced CT & surgeries" icon="🤝" />
        <KpiCard label="Surgeon Honorariums" value="₹2.15 Lakh" delta="Visiting super-specialists" trend="up" subtext="TPLO, THR & neuro" icon="🔪" />
        <KpiCard label="TDS Tax Withheld (194J)" value="₹64,800" delta="100% Tax Compliant" trend="up" subtext="Form 16A auto-generated" icon="🏛️" />
        <KpiCard label="On-Time Settlement SLA" value="100.0%" delta="Zero overdue claims" trend="up" subtext="Every Friday cycle" icon="🎯" />
      </div>

      {/* Commission Ledger Table */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Commission & Honorarium Settlement Ledger</h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#94a3b8' }}>Partner clinic referral credits, case billing, statutory tax deductions, and bank transaction references</p>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <select
              value={partnerFilter}
              onChange={e => setPartnerFilter(e.target.value)}
              style={{
                padding: '6px 10px',
                borderRadius: '8px',
                background: 'rgba(0,0,0,0.2)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                fontSize: '12px'
              }}
            >
              <option value="ALL">All Partner Types</option>
              <option value="Partner Clinic">Partner Clinic</option>
              <option value="Visiting Surgeon">Visiting Surgeon</option>
              <option value="Diagnostic Partner">Diagnostic Partner</option>
            </select>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              style={{
                padding: '6px 10px',
                borderRadius: '8px',
                background: 'rgba(0,0,0,0.2)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                fontSize: '12px'
              }}
            >
              <option value="ALL">All Settlement Statuses</option>
              <option value="Settled">Settled</option>
              <option value="Scheduled">Scheduled (Friday)</option>
              <option value="In Audit">In Audit</option>
            </select>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: '#94a3b8' }}>
                <th style={{ padding: '8px 12px' }}>Partner Name & Entity</th>
                <th style={{ padding: '8px 12px' }}>Type</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Referred Cases</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Billed Value</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Rate</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Gross Commission</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>TDS (10%)</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Net Payable</th>
                <th style={{ padding: '8px 12px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '10px 12px' }}>
                    <div style={{ fontWeight: 600, color: '#fff' }}>{item.partner}</div>
                    <div style={{ fontSize: '10px', color: '#64748b', fontFamily: '"IBM Plex Mono", monospace' }}>{item.id} · {item.bankRef}</div>
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{ padding: '2px 6px', borderRadius: '4px', fontSize: '10px', background: 'rgba(59,130,246,0.15)', color: '#60a5fa' }}>
                      {item.type}
                    </span>
                  </td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 600 }}>{item.cases}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>₹{item.billed.toLocaleString('en-IN')}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#38bdf8' }}>{item.rate}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>₹{item.grossCom.toLocaleString('en-IN')}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#f87171' }}>- ₹{item.tds.toLocaleString('en-IN')}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#10b981' }}>
                    ₹{item.netPay.toLocaleString('en-IN')}
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '99px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: item.status === 'Settled' ? 'rgba(16,185,129,0.15)' :
                        item.status.indexOf('Scheduled') >= 0 ? 'rgba(59,130,246,0.15)' : 'rgba(245,158,11,0.15)',
                      color: item.status === 'Settled' ? '#34d399' :
                        item.status.indexOf('Scheduled') >= 0 ? '#60a5fa' : '#fbbf24'
                    }}>
                      {item.status}
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
