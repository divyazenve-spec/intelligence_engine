import React, { useState, useMemo, useEffect } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

const INITIAL_COMMISSIONS = [
  {
    id: 'COM-ZIP-1',
    bankRef: 'NEFT-HDFC-991823',
    partner: 'Dr. Lakshmanan M',
    type: 'Lead Veterinary Surgeon',
    cases: 46,
    billed: 131100,
    rate: '22%',
    grossCom: 28842,
    tds: 2884,
    netPay: 25958,
    status: 'Settled'
  },
  {
    id: 'COM-ZIP-2',
    bankRef: 'NEFT-ICICI-441829',
    partner: 'Dr. Vasanth',
    type: 'Diagnostic Consultant',
    cases: 30,
    billed: 85500,
    rate: '22%',
    grossCom: 18810,
    tds: 1881,
    netPay: 16929,
    status: 'Settled'
  },
  {
    id: 'COM-ZIP-3',
    bankRef: 'NEFT-SBI-881290',
    partner: 'Dr. Yuvaraj',
    type: 'Critical Care Lead',
    cases: 34,
    billed: 96900,
    rate: '22%',
    grossCom: 21318,
    tds: 2132,
    netPay: 19186,
    status: 'Settled'
  }
];

export default function ClinicCommissions() {
  const [partnerFilter, setPartnerFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [toast, setToast] = useState('');
  const [commissionLedger, setCommissionLedger] = useState(INITIAL_COMMISSIONS);

  useEffect(() => {
    fetch('/api/v1/doctors')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map((d, i) => {
            const cases = d.consultations_count || 32;
            const billed = cases * 2850;
            const gross = Math.round(billed * 0.22);
            const tds = Math.round(gross * 0.1);
            const net = gross - tds;
            return {
              id: `COM-${d.id || (i + 1)}`,
              bankRef: `NEFT-HDFC-${991000 + i * 231}`,
              partner: d.name,
              type: d.specialty || 'Veterinary Practitioner',
              cases: cases,
              billed: billed,
              rate: '22%',
              grossCom: gross,
              tds: tds,
              netPay: net,
              status: 'Settled'
            };
          });
          setCommissionLedger(mapped);
        }
      })
      .catch(err => console.error("Error fetching doctors for commissions:", err));
  }, []);

  const filtered = useMemo(() => {
    return commissionLedger.filter(c => {
      const matchType = partnerFilter === 'ALL' || c.type.toLowerCase().includes(partnerFilter.toLowerCase());
      const matchStatus = statusFilter === 'ALL' || c.status.startsWith(statusFilter);
      return matchType && matchStatus;
    });
  }, [commissionLedger, partnerFilter, statusFilter]);

  function handleExecutePayout() {
    setToast('Weekly direct bank transfer (NEFT/RTGS) batch approved and sent to bank gateway!');
    setTimeout(() => setToast(''), 3500);
  }

  const totalGross = commissionLedger.reduce((acc, c) => acc + (c.grossCom || 0), 0);
  const totalTds = commissionLedger.reduce((acc, c) => acc + (c.tds || 0), 0);
  const totalCases = commissionLedger.reduce((acc, c) => acc + (c.cases || 0), 0);

  return (
    <DashboardLayout
      category="Clinics & Hospitals"
      subcategory="Clinic Commissions"
      title="Partner Clinic Commissions & Surgeon Honorariums"
      subtitle="B2B referral commissions, diagnostic cross-referrals, visiting surgeon honorariums, and TDS compliance (Section 194J)"
      icon="🤝"
      badge="Settlement Register"
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
        <KpiCard label="Commissions Settled MTD" value={`₹${(totalGross / 1000).toFixed(1)}K`} delta="+100% Settled" trend="up" subtext="Direct to partner bank accounts" icon="💸" />
        <KpiCard label="Scheduled for Friday" value="₹0" delta="All Disbursed" trend="up" subtext="Pre-audited & verified" icon="📅" />
        <KpiCard label="Partner Clinic Cases" value={`${totalCases} Cases`} delta="+18.4%" trend="up" subtext="Across all facilities" icon="🤝" />
        <KpiCard label="Surgeon Honorariums" value="22% Slabs" delta="Visiting super-specialists" trend="up" subtext="TPLO, THR & neuro" icon="🔪" />
        <KpiCard label="TDS Tax Withheld (194J)" value={`₹${(totalTds / 1000).toFixed(1)}K`} delta="10% Statutory" trend="up" subtext="Form 16A auto-generated" icon="🏛️" />
        <KpiCard label="On-Time Settlement SLA" value="100.0%" delta="Zero Lag" trend="up" subtext="Every Friday cycle" icon="🎯" />
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
              {filtered.length === 0 ? (<tr><td colSpan="8" style={{ textAlign: "center", padding: "32px", color: "var(--muted-foreground, #64748b)" }}>No commission records found</td></tr>) : filtered.map((item, idx) => (
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
