import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function SalesForecast() {
  const [horizon, setHorizon] = useState('30D');

  const cardStyle = {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '22px 24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
  };

  const projections = [];

  return (
    <DashboardLayout
      category="AI Assistant"
      subcategory="Sales Forecast"
      title="Predictive AI Sales & Revenue Forecasting"
      subtitle="Monte Carlo probabilistic trajectory projections, confidence bands (p10/p50/p90), and seasonal demand curves"
      icon="📈"
      badge="Proprietary Time-Series Model"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Next 30-Day Forecast (p50)" value="₹0" delta="+18.8% vs Sept" trend="up" subtext="Expected trajectory" icon="📈" />
        <KpiCard label="Optimistic Scenario (p90)" value="₹0" delta="+24.2% Growth" trend="up" subtext="High-demand bound" icon="🚀" />
        <KpiCard label="Conservative Bound (p10)" value="₹0" delta="+11.5% Floor" trend="neutral" subtext="Downside buffer" icon="🛡️" />
        <KpiCard label="Model Backtest Accuracy" value="0.0%" delta="MAPE: 4.6%" trend="up" subtext="Last 90 days test" icon="🎯" />
      </div>

      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Probabilistic Revenue Projection Bands</h3>
          <div style={{ display: 'flex', gap: '6px' }}>
            {['7D', '14D', '30D', '90D'].map(h => (
              <button
                key={h}
                onClick={() => setHorizon(h)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  border: horizon === h ? '1px solid #4f46e5' : '1px solid #cbd5e1',
                  background: horizon === h ? '#4f46e5' : '#ffffff',
                  color: horizon === h ? '#ffffff' : '#475569',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {h}
              </button>
            ))}
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>FORECAST HORIZON</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'right' }}>P10 (CONSERVATIVE)</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'right' }}>P50 (EXPECTED BASE)</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'right' }}>P90 (OPTIMISTIC)</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'right' }}>GROWTH VELOCITY</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'center' }}>CONFIDENCE</th>
              </tr>
            </thead>
            <tbody>
              {projections.map((p, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>{p.period}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#64748b' }}>{p.p10}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#2563eb' }}>{p.p50}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#059669' }}>{p.p90}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 600, color: '#059669' }}>{p.growth}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                    <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '12px', background: '#ecfdf5', color: '#047857' }}>
                      {p.confidence}
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
