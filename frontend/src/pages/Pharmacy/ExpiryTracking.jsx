import React, { useState, useMemo } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function ExpiryTracking() {
  const [riskZone, setRiskZone] = useState('ALL');
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState('');

  const expiryBatches = [];

  const filtered = useMemo(() => {
    return expiryBatches.filter(b => {
      const matchZone = riskZone === 'ALL' || b.zone.startsWith(riskZone);
      const matchSearch = search === '' ||
        b.batchNo.toLowerCase().includes(search.toLowerCase()) ||
        b.name.toLowerCase().includes(search.toLowerCase()) ||
        b.vendor.toLowerCase().includes(search.toLowerCase());
      return matchZone && matchSearch;
    });
  }, [riskZone, search]);

  function handleTriggerSRA(batchNo) {
    setToast(`Supplier Return Authorization (SRA) claim file generated for Batch ${batchNo}. Credit note initiated.`);
    setTimeout(() => setToast(''), 3500);
  }

  function handleActivateDiscount(batchNo) {
    setToast(`Auto-liquidation discount rule (30% off) published to prescription refill engine for ${batchNo}!`);
    setTimeout(() => setToast(''), 3500);
  }

  return (
    <DashboardLayout
      category="Pharmacy"
      subcategory="Expiry Tracking"
      title="Pharmaceutical Expiry Radar & FEFO Engine"
      subtitle="Early-warning expiry horizons, First-Expiry-First-Out picking compliance, supplier return claims (SRA), and zero-waste salvage"
      icon="⏳"
      badge="FEFO Automated"
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => alert('Batch SRA Claim document exported for pharmaceutical manufacturers (MSD, Zoetis, Boehringer).')}
            style={{
              padding: '7px 14px',
              borderRadius: '8px',
              background: '#3b82f6',
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
            <span>📄</span> Bulk Generate SRA Claims
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
        <KpiCard label="Near-Expiry Exposure" value="₹0" delta="-32% vs last month" trend="up" subtext="Total cost at risk" icon="⏳" />
        <KpiCard label="Critical (<30 Days)" value="2 Batches" delta="Immediate action" trend="down" subtext="32 total units" icon="🚨" />
        <KpiCard label="High Alert (30–60 Days)" value="4 Batches" delta="Auto-discount active" trend="neutral" subtext="49 units in buffer" icon="⚠️" />
        <KpiCard label="Medium Alert (60–90 Days)" value="6 Batches" delta="SRA eligible" trend="neutral" subtext="105 units rotating" icon="🟡" />
        <KpiCard label="Salvage Recovery Rate" value="0.0%" delta="+4.6% YoY" trend="up" subtext="Zero landfill waste" icon="♻️" />
        <KpiCard label="FEFO Picking Adherence" value="0.0%" delta="System Enforced" trend="up" subtext="Oldest valid batch first" icon="🎯" />
      </div>

      {/* Expiry Risk Horizons Summary */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '14px'
      }}>
        <div style={{ padding: '16px', borderRadius: '10px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#f87171' }}>Critical Zone (&lt; 30 Days)</span>
            <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '4px', background: 'rgba(239,68,68,0.2)', color: '#f87171' }}>Action Required</span>
          </div>
          <div style={{ fontSize: '20px', fontWeight: 700, marginTop: '8px', color: '#fff' }}>2 Batches · ₹0</div>
          <p style={{ fontSize: '11px', color: '#94a3b8', margin: '4px 0 0' }}>Rabies vaccines & Cardisure. Expedited clinic injection or immediate return.</p>
        </div>

        <div style={{ padding: '16px', borderRadius: '10px', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#fbbf24' }}>High Alert (30 – 60 Days)</span>
            <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '4px', background: 'rgba(245,158,11,0.2)', color: '#fbbf24' }}>Auto Discount</span>
          </div>
          <div style={{ fontSize: '20px', fontWeight: 700, marginTop: '8px', color: '#fff' }}>4 Batches · ₹0</div>
          <p style={{ fontSize: '11px', color: '#94a3b8', margin: '4px 0 0' }}>Nobivac core vaccines & Malaseb shampoos. Prioritized in 60-min rapid packs.</p>
        </div>

        <div style={{ padding: '16px', borderRadius: '10px', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#60a5fa' }}>Medium Horizon (60 – 90 Days)</span>
            <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '4px', background: 'rgba(59,130,246,0.2)', color: '#60a5fa' }}>SRA Window</span>
          </div>
          <div style={{ fontSize: '20px', fontWeight: 700, marginTop: '8px', color: '#fff' }}>6 Batches · ₹0</div>
          <p style={{ fontSize: '11px', color: '#94a3b8', margin: '4px 0 0' }}>Eligible for 100% manufacturer credit note if returned within 30 days.</p>
        </div>
      </div>

      {/* Expiry Tracking Table */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Near-Expiry Batch Watchlist</h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#94a3b8' }}>Dynamic stock liquidation and supplier return authorization status</p>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search batch, drug, supplier..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                background: 'rgba(0,0,0,0.2)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                fontSize: '12px',
                width: '220px'
              }}
            />
            <div style={{ display: 'flex', gap: '4px' }}>
              {['ALL', 'Critical', 'High', 'Medium', 'Safe'].map(z => (
                <button
                  key={z}
                  onClick={() => setRiskZone(z)}
                  style={{
                    padding: '5px 10px',
                    borderRadius: '6px',
                    border: 'none',
                    fontSize: '11px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    background: riskZone === z ? 'rgba(59,130,246,0.25)' : 'rgba(255,255,255,0.05)',
                    color: riskZone === z ? '#60a5fa' : '#94a3b8'
                  }}
                >
                  {z}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: '#94a3b8' }}>
                <th style={{ padding: '8px 12px' }}>Batch Code</th>
                <th style={{ padding: '8px 12px' }}>Medicine Name</th>
                <th style={{ padding: '8px 12px' }}>Expiry Date</th>
                <th style={{ padding: '8px 12px' }}>Days Left</th>
                <th style={{ padding: '8px 12px' }}>Risk Horizon</th>
                <th style={{ padding: '8px 12px' }}>Hub Location</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Remaining Units</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Cost Value</th>
                <th style={{ padding: '8px 12px', textAlign: 'center' }}>Salvage Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '10px 12px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 600, color: '#38bdf8' }}>
                    {b.batchNo}
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <div style={{ fontWeight: 600 }}>{b.name}</div>
                    <div style={{ fontSize: '10px', color: '#64748b' }}>{b.vendor}</div>
                  </td>
                  <td style={{ padding: '10px 12px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 600, color: b.daysLeft <= 30 ? '#f87171' : '#cbd5e1' }}>
                    {b.exp}
                  </td>
                  <td style={{ padding: '10px 12px', fontFamily: '"IBM Plex Mono", monospace' }}>
                    <span style={{
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: 700,
                      background: b.daysLeft <= 30 ? 'rgba(239,68,68,0.2)' : b.daysLeft <= 60 ? 'rgba(245,158,11,0.2)' : 'rgba(59,130,246,0.15)',
                      color: b.daysLeft <= 30 ? '#f87171' : b.daysLeft <= 60 ? '#fbbf24' : '#60a5fa'
                    }}>
                      {b.daysLeft} days
                    </span>
                  </td>
                  <td style={{ padding: '10px 12px' }}>{b.zone}</td>
                  <td style={{ padding: '10px 12px', color: '#94a3b8' }}>{b.hub}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 600 }}>
                    {b.balance}
                  </td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#cbd5e1' }}>
                    ₹{b.costValue.toLocaleString('en-IN')}
                  </td>
                  <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                    {b.daysLeft <= 30 ? (
                      <button
                        onClick={() => handleTriggerSRA(b.batchNo)}
                        style={{
                          padding: '4px 8px',
                          borderRadius: '6px',
                          background: 'rgba(239,68,68,0.15)',
                          border: '1px solid rgba(239,68,68,0.3)',
                          color: '#f87171',
                          fontSize: '10px',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        Claim SRA Return
                      </button>
                    ) : b.daysLeft <= 60 ? (
                      <button
                        onClick={() => handleActivateDiscount(b.batchNo)}
                        style={{
                          padding: '4px 8px',
                          borderRadius: '6px',
                          background: 'rgba(245,158,11,0.15)',
                          border: '1px solid rgba(245,158,11,0.3)',
                          color: '#fbbf24',
                          fontSize: '10px',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        Auto-Discount 30%
                      </button>
                    ) : (
                      <span style={{ fontSize: '10px', color: '#10b981' }}>FEFO Priority ✓</span>
                    )}
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
