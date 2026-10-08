import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function Revenue() {
  const [streamFilter, setStreamFilter] = useState('ALL');

  const streams = [];

  const cityRevenue = [];

  const filteredStreams = streamFilter === 'ALL' ? streams : streams.filter(s => s.type === streamFilter);

  return (
    <DashboardLayout
      category="Finance & Accounting"
      subcategory="Revenue"
      title="Revenue Intelligence & Commercial Inflow"
      subtitle="Multi-channel revenue recognition, annual recurring run-rate (ARR), clinical stream mix, and metro city contribution"
      icon="💰"
      badge=""
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
        <KpiCard label="Monthly Run-Rate (MRR)" value="₹0" delta="0.0%" trend="neutral" subtext="Current monthly intake" icon="💰" />
        <KpiCard label="Annualized Run-Rate (ARR)" value="₹0" delta="0.0%" trend="neutral" subtext="Network facilities" icon="🌐" />
        <KpiCard label="Avg Revenue / Consultation" value="₹0" delta="0.0%" trend="neutral" subtext="Diagnosis + Rx add-on" icon="🐾" />
        <KpiCard label="Surgical Revenue / Case" value="₹0" delta="High-margin neuro/ortho" trend="neutral" subtext="OT utilization" icon="🩺" />
        <KpiCard label="Pharmacy Attachment Rate" value="0.0%" delta="0.0%" trend="neutral" subtext="Inpatient & OPD Rx" icon="💊" />
        <KpiCard label="Recognized Under ASC 606" value="0.0%" delta="--" trend="neutral" subtext="Zero revenue leakage" icon="🛡️" />
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
