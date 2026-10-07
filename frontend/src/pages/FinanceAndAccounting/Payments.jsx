import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function Payments() {
  const [gatewayFilter, setGatewayFilter] = useState('ALL');

  const gateways = [];

  const recentReceipts = [];

  return (
    <DashboardLayout
      category="Finance & Accounting"
      subcategory="Payments"
      title="Inbound Payments, Gateways & Collections"
      subtitle="Real-time multi-gateway payment processing, merchant discount rate (MDR) audit, POS terminal census, and bank settlement reconciliation"
      icon="💳"
      badge="Reconciliation: 100%"
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => alert('Initiating instant payment reconciliation against core banking...')}
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
            🔄 Run Bank Reconciliation
          </button>
        </div>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Gross Digital Collections" value="₹0" delta="+18.2% MoM" trend="up" subtext="Inbound MTD flow" icon="💳" />
        <KpiCard label="UPI Payment Share" value="0.0%" delta="Zero MDR rate" trend="up" subtext="4,120 instant scans" icon="📱" />
        <KpiCard label="Card & POS Volume" value="₹0" delta="30.0% of total" trend="up" subtext="Pine Labs smart terminals" icon="🏧" />
        <KpiCard label="Blended MDR Cost" value="0.0%" delta="-0.08% pts YoY" trend="up" subtext="Minimal fee leakage" icon="💰" />
        <KpiCard label="Failed / Dropped Txns" value="0.0%" delta="99.68% Success" trend="up" subtext="High gateway uptime" icon="🛡️" />
        <KpiCard label="Settlement Window" value="T+1 Morning" delta="Auto-cleared" trend="up" subtext="Direct HDFC sweep" icon="⚡" />
      </div>

      <div style={{
        background: 'var(--card, #131d2e)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '22px 24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#fff' }}>🏦 Payment Channel Mix & MDR Absorption</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Gross transaction volume, merchant fees, and net bank realization</p>
          </div>
          <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>T+1 Sweep Operational</span>
        </div>

        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.22)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <th style={{ padding: '10px 20px', textAlign: 'left', color: '#94a3b8' }}>Gateway / Channel Rail</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Processed Volume</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Transactions</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>MDR Rate</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>MDR Fee</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Net Bank Credit</th>
                <th style={{ padding: '10px 20px', textAlign: 'right', color: '#94a3b8' }}>Settlement Cycle</th>
              </tr>
            </thead>
            <tbody>
              {gateways.map((g, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 20px', color: '#fff', fontWeight: 600 }}>
                    {g.name}<br />
                    <span style={{ fontSize: '10px', color: '#94a3b8' }}>{g.rail}</span>
                  </td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#38bdf8' }}>{g.processed}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#cbd5e1' }}>{g.txns}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#94a3b8' }}>{g.mdrRate}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#f87171' }}>{g.mdrCost}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#10b981' }}>{g.netSettled}</td>
                  <td style={{ padding: '12px 20px', textAlign: 'right' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '4px', background: 'rgba(16,185,129,0.15)', color: '#34d399', fontSize: '11px', fontWeight: 600 }}>{g.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Real-time Payment Inflow Stream */}
      <div style={{
        background: 'var(--card, #131d2e)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '22px 24px'
      }}>
        <h3 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 700, color: '#fff' }}>⚡ Live Payment Authorization Feed</h3>
        <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Streaming successful client checkouts across 14 hospital front-desks and app consultations</p>

        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.22)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <th style={{ padding: '10px 20px', textAlign: 'left', color: '#94a3b8' }}>Transaction ID</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', color: '#94a3b8' }}>Pet & Owner</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', color: '#94a3b8' }}>Facility</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>Settled Amount</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', color: '#94a3b8' }}>Payment Method</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', color: '#94a3b8' }}>Timestamp</th>
                <th style={{ padding: '10px 20px', textAlign: 'right', color: '#94a3b8' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentReceipts.map((r, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 20px', fontFamily: '"IBM Plex Mono", monospace', color: '#38bdf8' }}>{r.txnId}</td>
                  <td style={{ padding: '12px 14px', color: '#fff', fontWeight: 600 }}>
                    {r.pet}<br />
                    <span style={{ fontSize: '11px', color: '#94a3b8' }}>{r.client}</span>
                  </td>
                  <td style={{ padding: '12px 14px', color: '#cbd5e1' }}>{r.facility}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#10b981' }}>{r.amt}</td>
                  <td style={{ padding: '12px 14px', color: '#cbd5e1' }}>{r.channel}</td>
                  <td style={{ padding: '12px 14px', color: '#94a3b8' }}>{r.time}</td>
                  <td style={{ padding: '12px 20px', textAlign: 'right' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '4px', background: 'rgba(16,185,129,0.15)', color: '#34d399', fontSize: '11px', fontWeight: 600 }}>{r.status}</span>
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
