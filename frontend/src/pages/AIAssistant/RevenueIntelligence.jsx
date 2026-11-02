import React, { useState, useEffect, useCallback } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';
import { getRevenueIntelligence, simulateRevenue, applyRevenueSafeguard } from '../../services/api';

const EMPTY = {
  kpis: { detectedLeakage: 0, recoveryRealized: 0, optimalElasticity: 0, discountEfficiency: 0, netRealizationRate: 0, grossBookings: 0 },
  leakagePoints: [], elasticityMatrix: [], waterfall: [], auditLog: []
};

const fmt = (v) => {
  const n = Math.abs(v || 0);
  const s = n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` : n >= 1000 ? `₹${(n / 1000).toFixed(1)}K` : `₹${n}`;
  return v < 0 ? `-${s}` : s;
};

const SEV = {
  CRITICAL: ['#fee2e2', '#991b1b'], HIGH: ['#ffedd5', '#9a3412'],
  MEDIUM: ['#fef3c7', '#92400e'], LOW: ['#f1f5f9', '#475569']
};

export default function RevenueIntelligence() {
  const [data, setData] = useState(EMPTY);
  const [busyId, setBusyId] = useState(null);
  const [toast, setToast] = useState('');
  const [sim, setSim] = useState({ priceIncreasePct: 5, discountCapPct: 50 });
  const [simResult, setSimResult] = useState(null);

  const load = useCallback(() => {
    getRevenueIntelligence({})
      .then(res => { if (res && res.kpis) setData({ ...EMPTY, ...res }); })
      .catch(() => {});
  }, []);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(() => setToast(''), 4500);
    return () => clearTimeout(t);
  }, [toast]);

  const runSim = (next) => {
    setSim(next);
    simulateRevenue(next).then(setSimResult).catch(() => {});
  };

  const apply = (leak) => {
    setBusyId(leak.id);
    applyRevenueSafeguard(leak.id)
      .then(res => {
        setToast(res.success ? `Safeguard applied: ${res.entry.detail}` : (res.error || 'Unable to apply'));
        load();
      })
      .catch(() => setToast('Backend unreachable — safeguard not applied'))
      .finally(() => setBusyId(null));
  };

  const { kpis, leakagePoints, elasticityMatrix, waterfall, auditLog } = data;
  const cardStyle = {
    background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px',
    padding: '22px 24px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
  };
  const th = (extra = {}) => ({ padding: '12px 16px', fontWeight: 600, ...extra });
  const empty = (cols, msg) => (
    <tr><td colSpan={cols} style={{ padding: '24px', textAlign: 'center', color: '#94a3b8' }}>{msg}</td></tr>
  );

  return (
    <DashboardLayout
      category="AI Assistant"
      subcategory="Revenue Intelligence"
      title="Revenue Intelligence & Margin Optimization"
      subtitle="Autonomous revenue leakage radar, price elasticity analysis, and conversion monetization drivers"
      icon="💎"
      badge="Revenue Radar Active"
    >
      {toast && (
        <div onClick={() => setToast('')} style={{
          position: 'fixed', top: 24, right: 24, zIndex: 99999, background: '#059669', color: '#fff',
          padding: '14px 20px', borderRadius: 12, fontSize: 13, fontWeight: 600, maxWidth: 480,
          boxShadow: '0 8px 32px rgba(0,0,0,0.18)', cursor: 'pointer'
        }}>✅ {toast}</div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Detected Revenue Leakage" value={fmt(kpis.detectedLeakage)} delta={leakagePoints.length ? `${leakagePoints.length} vectors` : '--'} trend={kpis.detectedLeakage ? 'down' : 'neutral'} subtext={kpis.detectedLeakage ? 'Monthly drag identified' : 'No leakage detected'} icon="⚠️" />
        <KpiCard label="Recovery Realization (MTD)" value={fmt(kpis.recoveryRealized)} delta="--" trend={kpis.recoveryRealized ? 'up' : 'neutral'} subtext={kpis.recoveryRealized ? 'From applied safeguards' : 'No recovery actions'} icon="💰" />
        <KpiCard label="Optimal Price Elasticity" value={`${kpis.optimalElasticity.toFixed(2)}`} delta="--" trend="neutral" subtext={elasticityMatrix.length ? 'Avg across tested services' : 'No elasticity tested'} icon="📈" />
        <KpiCard label="Discount Efficiency Score" value={`${kpis.discountEfficiency.toFixed(1)}%`} delta="--" trend={kpis.discountEfficiency > 70 ? 'up' : 'neutral'} subtext={kpis.discountEfficiency ? 'Promos reaching new customers' : 'No discount records'} icon="🎯" />
        <KpiCard label="Net Realization Rate" value={`${kpis.netRealizationRate.toFixed(1)}%`} delta="--" trend="neutral" subtext="Net EBITDA ÷ gross bookings" icon="🧮" />
      </div>

      {/* Leakage radar */}
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Identified Revenue Leakage & Remediation Radar</h3>
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748b' }}>Total Identified: {fmt(kpis.detectedLeakage)}</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                <th style={th()}>LEAKAGE VECTOR</th>
                <th style={th()}>FACILITY / CHANNEL</th>
                <th style={th({ textAlign: 'right' })}>MONTHLY DRAG</th>
                <th style={th({ textAlign: 'center' })}>SEVERITY</th>
                <th style={th()}>ROOT CAUSE</th>
                <th style={th()}>AUTOMATED REMEDIATION</th>
                <th style={th({ textAlign: 'right' })}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {leakagePoints.length === 0 ? empty(7, 'No revenue leakage detected. Telemetry streams are active — awaiting transactional data.') :
                leakagePoints.map(l => {
                  const [bg, fg] = SEV[l.severity] || SEV.LOW;
                  const done = l.status === 'APPLIED';
                  return (
                    <tr key={l.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>{l.vector.replace(/_/g, ' ')}</td>
                      <td style={{ padding: '12px 16px' }}>{l.source}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#dc2626' }}>{fmt(l.monthlyDrag)}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                        <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 12, background: bg, color: fg }}>{l.severity}</span>
                      </td>
                      <td style={{ padding: '12px 16px', color: '#475569' }}>{l.rootCause}</td>
                      <td style={{ padding: '12px 16px', color: '#475569' }}>{l.recommendedAction}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                        {done ? <span style={{ color: '#059669', fontWeight: 700, fontSize: 11 }}>✅ Applied</span> : (
                          <button disabled={busyId === l.id} onClick={() => apply(l)} style={{
                            padding: '5px 12px', borderRadius: 6, border: '1px solid #2563eb', background: '#eff6ff',
                            color: '#1d4ed8', fontSize: 11, fontWeight: 600, cursor: 'pointer'
                          }}>{busyId === l.id ? 'Applying…' : 'Apply Safeguard'}</button>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Simulator + elasticity */}
      <div style={cardStyle}>
        <h3 style={{ margin: '0 0 12px', fontSize: 16, fontWeight: 700, color: '#0f172a' }}>Price Elasticity & What-If Simulator</h3>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 16, fontSize: 12, color: '#475569' }}>
          <label>Price uplift on inelastic services: <b>{sim.priceIncreasePct}%</b><br />
            <input type="range" min="0" max="15" value={sim.priceIncreasePct} onChange={e => runSim({ ...sim, priceIncreasePct: +e.target.value })} />
          </label>
          <label>Repeat-customer discount cap: <b>{sim.discountCapPct}%</b><br />
            <input type="range" min="0" max="100" step="10" value={sim.discountCapPct} onChange={e => runSim({ ...sim, discountCapPct: +e.target.value })} />
          </label>
          <div>Projected annual lift: <b style={{ color: '#059669' }}>{fmt(simResult ? simResult.projectedTotalLift : 0)}</b></div>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
              <th style={th()}>SERVICE / SKU</th><th style={th({ textAlign: 'right' })}>CURRENT</th>
              <th style={th({ textAlign: 'right' })}>RECOMMENDED</th><th style={th({ textAlign: 'right' })}>ELASTICITY</th>
              <th style={th({ textAlign: 'right' })}>PROJECTED GAIN</th>
            </tr>
          </thead>
          <tbody>
            {elasticityMatrix.length === 0 ? empty(5, 'No price/volume observations available for elasticity modelling.') :
              elasticityMatrix.map(e => (
                <tr key={e.service} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600 }}>{e.service}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>₹{e.currentPrice}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>₹{e.recommendedPrice}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>{e.elasticity}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', color: '#059669', fontWeight: 700 }}>{fmt(e.projectedGain)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Waterfall */}
      <div style={cardStyle}>
        <h3 style={{ margin: '0 0 12px', fontSize: 16, fontWeight: 700, color: '#0f172a' }}>Revenue Realization Waterfall</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
              <th style={th()}>STAGE</th><th style={th({ textAlign: 'right' })}>AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            {waterfall.length === 0 ? empty(2, 'No gross bookings recorded yet.') :
              waterfall.map(w => (
                <tr key={w.label} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '10px 16px', fontWeight: 600 }}>{w.label}</td>
                  <td style={{ padding: '10px 16px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: w.value < 0 ? '#dc2626' : '#0f172a' }}>{fmt(w.value)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Audit */}
      <div style={cardStyle}>
        <h3 style={{ margin: '0 0 12px', fontSize: 16, fontWeight: 700, color: '#0f172a' }}>📋 Safeguard Audit Trail <span style={{ fontSize: 10, color: '#059669' }}>{auditLog.length} Records</span></h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
              <th style={th()}>TIMESTAMP</th><th style={th()}>LEAK</th>
              <th style={th({ textAlign: 'right' })}>RECOVERED</th><th style={th()}>DETAIL</th>
            </tr>
          </thead>
          <tbody>
            {auditLog.length === 0 ? empty(4, 'No safeguards applied yet.') :
              auditLog.map(a => (
                <tr key={a.id + a.executedAt} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '10px 16px', fontFamily: '"IBM Plex Mono", monospace' }}>{a.executedAt}</td>
                  <td style={{ padding: '10px 16px' }}>{a.id} · {a.vector.replace(/_/g, ' ')}</td>
                  <td style={{ padding: '10px 16px', textAlign: 'right', color: '#059669', fontWeight: 700 }}>{fmt(a.recovered)}</td>
                  <td style={{ padding: '10px 16px', color: '#475569' }}>{a.detail}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
