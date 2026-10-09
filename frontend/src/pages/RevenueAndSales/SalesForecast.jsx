import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function SalesForecast() {
  const [scenario, setScenario] = useState('base');
  const [horizon, setHorizon] = useState(6);

  // Historical actuals and forward projections pool
  const actuals = [];
  const masterForecast = [];

  const projectedMonths = masterForecast.slice(0, horizon);
  const nextMonthRev = 0;
  const cumulativeRev = 0;

  // Healthcare seasonal drivers and channel projections
  const seasonalDrivers = [];
  const channelProjections = [];

  return (
    <DashboardLayout
      category="Revenue & Sales"
      subcategory="Sales Forecast"
      title="Predictive Sales Forecast & Revenue Trajectory"
      subtitle="Machine learning projections with sales seasonality cycles, 90% confidence bands, and scenario modeling"
      icon="📈"
      badge="No Forecast Model Active"
      actions={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)', fontWeight: 600 }}>Horizon:</span>
          {[
            { val: 3, label: '3M (Quarter)' },
            { val: 6, label: '6M (Half-Year)' },
            { val: 12, label: '12M (Full-Year)' }
          ].map(h => (
            <button
              key={h.val}
              onClick={() => setHorizon(h.val)}
              style={{
                padding: '6px 10px',
                borderRadius: '6px',
                border: '1px solid var(--border, rgba(255,255,255,0.1))',
                background: horizon === h.val ? 'var(--primary, #3b82f6)' : 'var(--card, #1e293b)',
                color: '#fff',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >{h.label}</button>
          ))}

          <span style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)', fontWeight: 600, marginLeft: '6px' }}>Scenario:</span>
          {[
            { id: 'base', label: '📊 Baseline (1.0x)' },
            { id: 'bull', label: '🚀 Bullish (+18%)' },
            { id: 'bear', label: '🛡️ Conservative (-18%)' }
          ].map(s => (
            <button
              key={s.id}
              onClick={() => setScenario(s.id)}
              style={{
                padding: '6px 10px',
                borderRadius: '6px',
                border: '1px solid var(--border, rgba(255,255,255,0.1))',
                background: scenario === s.id ? 'var(--primary, #3b82f6)' : 'var(--card, #1e293b)',
                color: '#fff',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >{s.label}</button>
          ))}
        </div>
      }
    >
      {/* Forecast KPI Highlights */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '14px'
      }}>
        <KpiCard
          label="Next Month Projected"
          value="₹0"
          delta="--"
          trend="neutral"
          subtext="No historical baseline"
          icon="📅"
        />
        <KpiCard
          label={`${horizon}-Month Cumulative`}
          value="₹0"
          delta="--"
          trend="neutral"
          subtext="Total horizon pipeline"
          icon="💼"
        />
        <KpiCard
          label="Avg Monthly Velocity"
          value="0.0%"
          delta="--"
          trend="neutral"
          subtext="No growth rate recorded"
          icon="⚡"
        />
        <KpiCard
          label="Predicted Daily Rate"
          value="₹0"
          delta="--"
          trend="neutral"
          subtext="Forward cash pacing"
          icon="💰"
        />
        <KpiCard
          label="Confidence Metric"
          value="--"
          delta="--"
          trend="neutral"
          subtext="No model fit score"
          icon="🎯"
        />
      </div>

      {/* SVG Time-Series Chart Card */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '14px',
        padding: '22px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>
              Predictive Revenue Trajectory & Confidence Interval Band
            </h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>
              Historical actuals and {horizon}-month predictive projection
            </p>
          </div>
        </div>

        {/* Chart Container */}
        <div style={{
          width: '100%',
          padding: '60px 20px',
          textAlign: 'center',
          color: 'var(--muted-foreground, #94a3b8)',
          fontSize: '13px'
        }}>
          No historical sales or forward projection data available to chart
        </div>
      </div>

      {/* Forward-Looking Schedule Table */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '14px',
        padding: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Forward-Looking Monthly Predictive Schedule</h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Month-by-month projected volume, expected orders, and confidence bounds</p>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))', color: 'var(--muted-foreground, #94a3b8)', fontSize: '11px' }}>
                <th style={{ padding: '8px 12px' }}>Projected Month</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Predicted Revenue</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Expected Orders</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>MoM Growth</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Confidence Interval</th>
                <th style={{ padding: '8px 12px' }}>Primary Seasonal Driver</th>
              </tr>
            </thead>
            <tbody>
              {projectedMonths.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '24px', color: 'var(--muted-foreground, #94a3b8)' }}>
                    No forward forecast records found
                  </td>
                </tr>
              ) : (
                projectedMonths.map((row) => (
                  <tr key={row.month}>
                    <td>{row.month}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Two Columns: Healthcare Seasonal Drivers & Channel Growth */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '16px'
      }}>
        {/* Healthcare Seasonality Drivers */}
        <div style={{
          background: 'var(--card, #1e293b)',
          border: '1px solid var(--border, rgba(255,255,255,0.08))',
          borderRadius: '14px',
          padding: '20px'
        }}>
          <h3 style={{ margin: '0 0 4px', fontSize: '15px', fontWeight: 700 }}>Pet Healthcare Seasonality Drivers</h3>
          <p style={{ margin: '0 0 14px', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Key clinical and pharmaceutical demand surges embedded in the forecasting model</p>
          {seasonalDrivers.length === 0 ? (
            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--muted-foreground, #94a3b8)', fontSize: '12px' }}>
              No seasonality drivers recorded
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {seasonalDrivers.map(sd => (
                <div key={sd.season}>{sd.season}</div>
              ))}
            </div>
          )}
        </div>

        {/* Channel Growth Projections */}
        <div style={{
          background: 'var(--card, #1e293b)',
          border: '1px solid var(--border, rgba(255,255,255,0.08))',
          borderRadius: '14px',
          padding: '20px'
        }}>
          <h3 style={{ margin: '0 0 4px', fontSize: '15px', fontWeight: 700 }}>Projected Channel Expansion</h3>
          <p style={{ margin: '0 0 14px', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Forward revenue contribution by customer touchpoint over selected horizon</p>
          {channelProjections.length === 0 ? (
            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--muted-foreground, #94a3b8)', fontSize: '12px' }}>
              No channel projections recorded
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px' }}>
              {channelProjections.map(cp => (
                <div key={cp.name}>{cp.name}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
