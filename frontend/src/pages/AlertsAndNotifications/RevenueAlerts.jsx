import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function RevenueAlerts() {
  const [alerts, setAlerts] = useState([]);

  const [toast, setToast] = useState('');

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleAction = (id, action) => {
    triggerToast(`Applied "${action}" to ${id}. Notification sent to Commercial Ops.`);
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'Mitigated' } : a));
  };

  return (
    <DashboardLayout
      category="Alerts & Notifications"
      subcategory="Revenue Alerts"
      title="Revenue Pacing & Margin Risk Alerts"
      subtitle="Automated commercial anomaly detection for sales drop-offs, return surges, CAC inflation, and high-value B2B accounts"
      icon="💼"
      badge="₹0 Value at Risk"
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => triggerToast('Commercial pacing report dispatched to Sales VP.')}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              background: 'var(--primary, #3b82f6)',
              color: '#ffffff',
              border: 'none',
              fontWeight: 600,
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            📊 Pacing Briefing
          </button>
          <button
            onClick={() => triggerToast('Recalculated automated dynamic targets based on monsoon seasonality.')}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              background: 'var(--card, #1e293b)',
              color: 'var(--foreground, #f8fafc)',
              border: '1px solid var(--border, rgba(255,255,255,0.1))',
              fontWeight: 600,
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            Auto-Tune Thresholds
          </button>
        </div>
      }
    >
      {toast && (
        <div style={{
          padding: '10px 16px',
          background: 'rgba(59,130,246,0.15)',
          border: '1px solid #3b82f6',
          borderRadius: '8px',
          color: '#60a5fa',
          fontSize: '13px',
          fontWeight: 600
        }}>
          ⚡ {toast}
        </div>
      )}

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard
          label="Total Revenue at Risk"
          value="₹0"
          delta="4 active warnings"
          trend="down"
          subtext="GMV + CAC + Returns"
          icon="📉"
        />
        <KpiCard
          label="Target Attainment Gap"
          value="-4.8% MTD"
          delta="₹0 below target"
          trend="down"
          subtext="Delhi & Chennai hubs"
          icon="🎯"
        />
        <KpiCard
          label="Average Return Rate"
          value="0.0%"
          delta="+0.8% vs benchmark"
          trend="down"
          subtext="Threshold: 2.5%"
          icon="🔄"
        />
        <KpiCard
          label="High-Value Accounts Alert"
          value="1 B2B Account"
          delta="Infosys (₹0)"
          trend="neutral"
          subtext="Renewal pending sign-off"
          icon="🏢"
        />
      </div>

      {/* Alerts Table */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>
          Commercial Revenue Anomalies & Pacing Warnings
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {alerts.map((a) => (
            <div
              key={a.id}
              style={{
                padding: '16px',
                borderRadius: '8px',
                background: 'rgba(0,0,0,0.15)',
                borderLeft: a.severity === 'High Warning' ? '4px solid #ef4444' : a.severity === 'Warning' ? '4px solid #f59e0b' : '4px solid #3b82f6',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      fontFamily: '"IBM Plex Mono", monospace',
                      fontSize: '11px',
                      fontWeight: 700,
                      background: 'rgba(255,255,255,0.06)',
                      padding: '2px 6px',
                      borderRadius: '4px'
                    }}>
                      {a.id}
                    </span>
                    <span style={{ fontSize: '14px', fontWeight: 700 }}>{a.title}</span>
                    <span style={{
                      fontSize: '10px',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      background: a.severity === 'High Warning' ? 'rgba(239,68,68,0.2)' : 'rgba(245,158,11,0.2)',
                      color: a.severity === 'High Warning' ? '#ef4444' : '#f59e0b',
                      fontWeight: 600
                    }}>
                      {a.severity}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)', marginTop: '4px' }}>
                    Channel: <strong style={{ color: 'var(--foreground, #f8fafc)' }}>{a.channel}</strong> · Trigger: <span style={{ color: '#f87171' }}>{a.trigger}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)' }}>{a.time}</div>
                  <div style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    color: a.status === 'Mitigated' ? '#10b981' : '#f59e0b',
                    marginTop: '2px'
                  }}>
                    Status: {a.status}
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)', lineHeight: 1.5 }}>
                <div><strong>Root Cause:</strong> {a.cause}</div>
                <div><strong>Estimated Financial Exposure:</strong> <span style={{ color: '#fbbf24', fontWeight: 600 }}>{a.impact}</span></div>
              </div>

              {a.status !== 'Mitigated' && (
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', paddingTop: '4px' }}>
                  {a.id === 'REV-201' && (
                    <button
                      onClick={() => handleAction(a.id, 'Dynamic Rain Surcharge Waiver + Push Promo')}
                      style={{ padding: '6px 12px', borderRadius: '6px', background: 'var(--primary, #3b82f6)', color: '#fff', border: 'none', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Trigger Gurgaon Flash Recovery Promo
                    </button>
                  )}
                  {a.id === 'REV-202' && (
                    <button
                      onClick={() => handleAction(a.id, 'Mandatory Pet Weight Prompt at Checkout')}
                      style={{ padding: '6px 12px', borderRadius: '6px', background: 'var(--primary, #3b82f6)', color: '#fff', border: 'none', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Deploy Weight Verification Prompt
                    </button>
                  )}
                  {a.id === 'REV-205' && (
                    <button
                      onClick={() => handleAction(a.id, 'Dispatched Corporate Renewal Terms & SLA')}
                      style={{ padding: '6px 12px', borderRadius: '6px', background: '#10b981', color: '#fff', border: 'none', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Send 1-Click Renewal Contract
                    </button>
                  )}
                  <button
                    onClick={() => handleAction(a.id, 'Acknowledged & Logged to Revenue Ops')}
                    style={{ padding: '6px 12px', borderRadius: '6px', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border, rgba(255,255,255,0.1))', color: 'var(--foreground, #f8fafc)', fontSize: '11px', cursor: 'pointer' }}
                  >
                    Acknowledge Alert
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
