import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function Revenue() {
  const [streamFilter, setStreamFilter] = useState('ALL');

  const streams = [
    { id: 'STR-01', stream: 'Outpatient Consultations & Preventative Vaccines', type: 'Clinical OPD', rev: '₹28,40,000', txns: '4,820 visits', avgTxn: '₹589', share: '36.2%', mom: '+12.4%', color: '#38bdf8' },
    { id: 'STR-02', stream: 'Modular OT Surgeries & Critical Care Inpatients', type: 'Surgical IPD', rev: '₹24,80,000', txns: '142 surgeries', avgTxn: '₹17,465', share: '31.6%', mom: '+18.6%', color: '#34d399' },
    { id: 'STR-03', stream: 'Prescription Drugs & Pharmacy Dispensing', type: 'Pharma Retail', rev: '₹14,20,000', txns: '6,450 orders', avgTxn: '₹220', share: '18.1%', mom: '+8.2%', color: '#fbbf24' },
    { id: 'STR-04', stream: 'Direct Pet Care E-Commerce & Rapid Delivery', type: 'Digital E-Com', rev: '₹6,80,000', txns: '2,980 baskets', avgTxn: '₹228', share: '8.7%', mom: '+4.5%', color: '#c084fc' },
    { id: 'STR-05', stream: 'B2B Corporate Wellness & Referral Partnerships', type: 'B2B Contracts', rev: '₹4,20,000', txns: '18 partners', avgTxn: '₹23,333', share: '5.4%', mom: '+24.0%', color: '#f87171' }
  ];

  const cityRevenue = [
    { city: 'Bengaluru Metros (5 Facilities)', rev: '₹34,20,000', pct: '43.6%', growth: '+16.2%', lead: 'Koramangala 24x7 Flagship' },
    { city: 'Mumbai Metros (3 Facilities)', rev: '₹21,80,000', pct: '27.8%', growth: '+18.4%', lead: 'Bandra Multi-Specialty' },
    { city: 'Delhi NCR Hubs (3 Facilities)', rev: '₹12,40,000', pct: '15.8%', growth: '+12.1%', lead: 'Okhla Animal Hospital' },
    { city: 'Hyderabad & Secunderabad (2 Facilities)', rev: '₹6,20,000', pct: '7.9%', growth: '+22.5%', lead: 'Jubilee Hills Specialty' },
    { city: 'Pune Hubs (1 Facility)', rev: '₹3,80,000', pct: '4.9%', growth: '+9.8%', lead: 'Koregaon Park Care Center' }
  ];

  const filteredStreams = streamFilter === 'ALL' ? streams : streams.filter(s => s.type === streamFilter);

  return (
    <DashboardLayout
      category="Finance & Accounting"
      subcategory="Revenue"
      title="Revenue Intelligence & Commercial Inflow"
      subtitle="Multi-channel revenue recognition, annual recurring run-rate (ARR), clinical stream mix, and metro city contribution"
      icon="💰"
      badge="ARR: ₹9.40 Crore"
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => alert('Exporting comprehensive revenue ledger (CSV)...')}
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
            📥 Export Revenue Breakdown
          </button>
        </div>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Monthly Run-Rate (MRR)" value="₹78.40 Lakh" delta="+18.4% YoY" trend="up" subtext="Current monthly intake" icon="💰" />
        <KpiCard label="Annualized Run-Rate (ARR)" value="₹9.40 Crore" delta="+22.1% YoY" trend="up" subtext="14 Network Facilities" icon="🌐" />
        <KpiCard label="Avg Revenue / Consultation" value="₹1,626" delta="+8.4% ticket size" trend="up" subtext="Diagnosis + Rx add-on" icon="🐾" />
        <KpiCard label="Surgical Revenue / Case" value="₹17,465" delta="High-margin neuro/ortho" trend="up" subtext="90% OT utilization" icon="🩺" />
        <KpiCard label="Pharmacy Attachment Rate" value="78.2%" delta="+4.2% MoM" trend="up" subtext="Inpatient & OPD Rx" icon="💊" />
        <KpiCard label="Recognized Under ASC 606" value="100.0%" delta="Audited Ind-AS 115" trend="up" subtext="Zero revenue leakage" icon="🛡️" />
      </div>

      <div style={{
        background: 'var(--card, #131d2e)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '22px 24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#fff' }}>📊 Clinical & Commercial Revenue Streams</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Breakdown by consultation, surgical, pharmacy retail, and corporate contracts</p>
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            {['ALL', 'Clinical OPD', 'Surgical IPD', 'Pharma Retail', 'Digital E-Com', 'B2B Contracts'].map(type => (
              <button
                key={type}
                onClick={() => setStreamFilter(type)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: streamFilter === type ? '#3b82f6' : 'rgba(255,255,255,0.03)',
                  color: streamFilter === type ? '#fff' : '#94a3b8',
                  fontSize: '11px',
                  cursor: 'pointer'
                }}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.22)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <th style={{ padding: '10px 20px', textAlign: 'left', color: '#94a3b8' }}>Stream Name</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', color: '#94a3b8' }}>Category</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Monthly Revenue</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Transactions</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Avg Ticket</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Revenue Share</th>
                <th style={{ padding: '10px 20px', textAlign: 'right', color: '#94a3b8' }}>MoM Growth</th>
              </tr>
            </thead>
            <tbody>
              {filteredStreams.map((s, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 20px', color: '#fff', fontWeight: 600 }}>{s.stream}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.06)', color: '#38bdf8', fontSize: '11px' }}>{s.type}</span>
                  </td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#10b981' }}>{s.rev}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#cbd5e1' }}>{s.txns}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#94a3b8' }}>{s.avgTxn}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 600, color: '#38bdf8' }}>{s.share}</td>
                  <td style={{ padding: '12px 20px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#10b981' }}>{s.mom}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Regional Metro Revenue Contribution */}
      <div style={{
        background: 'var(--card, #131d2e)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '22px 24px'
      }}>
        <h3 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 700, color: '#fff' }}>🏙️ Metro Geographic Revenue Distribution</h3>
        <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Regional performance across hospital corridors and outpatient hubs</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
          {cityRevenue.map((c, idx) => (
            <div key={idx} style={{
              background: 'rgba(0,0,0,0.18)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '8px',
              padding: '14px 16px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <b style={{ color: '#fff', fontSize: '13px' }}>{c.city}</b>
                <span style={{ color: '#10b981', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{c.growth}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                <span style={{ fontSize: '18px', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace', color: '#38bdf8' }}>{c.rev}</span>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>({c.pct} share)</span>
              </div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>
                Top Center: <strong style={{ color: '#cbd5e1' }}>{c.lead}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
