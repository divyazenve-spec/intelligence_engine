import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function DeliveryAlerts() {
  const [alerts, setAlerts] = useState([]);

  const [toast, setToast] = useState('');

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleAction = (id, act) => {
    triggerToast(`Action "${act}" executed for ${id}.`);
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'Resolved' } : a));
  };

  return (
    <DashboardLayout
      category="Alerts & Notifications"
      subcategory="Delivery Alerts"
      title="60-Minute Express & Fleet Logistics Alerts"
      subtitle="Real-time rider SLA countdowns, vehicle breakdown recovery, dark-store dispatch bottlenecks, and cold-chain geofencing"
      icon="⚡"
      badge=""
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => triggerToast('AI Dynamic Route Clustering activated across 76 active riders.')}
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
            🧭 Optimize Rider Routes
          </button>
          <button
            onClick={() => triggerToast('Temporary standby 3PL Shadowfax fleet expanded by 10 riders in Whitefield.')}
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
            🛵 Call Standby Fleet
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
          label="60-Min On-Time SLA"
          value="0.0%"
          delta="0.0%"
          trend="neutral"
          subtext="0 active deliveries"
          icon="⚡"
        />
        <KpiCard
          label="At-Risk Deliveries (<10m SLA)"
          value="0 Orders"
          delta="0.0%"
          trend="neutral"
          subtext="0 at-risk orders"
          icon="⏱️"
        />
        <KpiCard
          label="Active Fleet on Field"
          value="0 Riders"
          delta="0.0%"
          trend="neutral"
          subtext="0 active riders"
          icon="🛵"
        />
        <KpiCard
          label="Avg Dispatch Dwell Time"
          value="0 Mins"
          delta="0.0%"
          trend="neutral"
          subtext="0 mins dispatch"
          icon="🏬"
        />
      </div>

      {/* Main Alerts Table */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>
          Live Fleet Disruptions & 60-Minute SLA Watchlist
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {alerts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '36px', color: 'var(--muted-foreground, #94a3b8)', fontSize: '13px' }}>
              No fleet disruptions or SLA alerts detected. All riders on schedule.
            </div>
          ) : (
            alerts.map((a) => (
            <div
              key={a.id}
              style={{
                padding: '16px',
                borderRadius: '8px',
                background: a.status === 'Resolved' ? 'rgba(16,185,129,0.05)' : 'rgba(0,0,0,0.15)',
                borderLeft: a.severity === 'Critical' ? '4px solid #ef4444' : a.severity === 'High Warning' ? '4px solid #f97316' : a.severity === 'Warning' ? '4px solid #f59e0b' : '4px solid #3b82f6',
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
                      background: a.severity === 'Critical' ? 'rgba(239,68,68,0.2)' : a.severity === 'High Warning' ? 'rgba(249,115,22,0.2)' : 'rgba(245,158,11,0.2)',
                      color: a.severity === 'Critical' ? '#ef4444' : '#f59e0b',
                      fontWeight: 600
                    }}>
                      {a.severity}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)', marginTop: '4px' }}>
                    Assigned: <strong style={{ color: 'var(--foreground, #f8fafc)' }}>{a.rider}</strong> · Zone: <span>{a.zone}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: a.severity === 'Critical' ? '#ef4444' : '#fbbf24' }}>
                    {a.slaCountdown}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)', marginTop: '2px' }}>
                    Status: <strong style={{ color: a.status === 'Resolved' ? '#10b981' : '#38bdf8' }}>{a.status}</strong>
                  </div>
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '8px',
                padding: '10px',
                background: 'rgba(0,0,0,0.2)',
                borderRadius: '6px',
                fontSize: '12px'
              }}>
                <div>Progress / Dwell: <strong>{a.elapsed}</strong></div>
                <div style={{ gridColumn: '1 / -1' }}>Root Cause: <span style={{ color: '#94a3b8' }}>{a.rootCause}</span></div>
              </div>

              {a.status !== 'Resolved' && (
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', paddingTop: '4px' }}>
                  {a.id === 'DEL-601' && (
                    <button
                      onClick={() => handleAction(a.id, 'Masked VoIP call connected to Rider & customer notified with live GPS')}
                      style={{ padding: '6px 14px', borderRadius: '6px', background: '#ef4444', color: '#fff', border: 'none', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Call Rider & Notify Customer
                    </button>
                  )}
                  {a.id === 'DEL-602' && (
                    <button
                      onClick={() => handleAction(a.id, 'Standby Rider #R-214 assigned to intercept and complete antibiotic drops')}
                      style={{ padding: '6px 14px', borderRadius: '6px', background: '#10b981', color: '#fff', border: 'none', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Dispatch Intercept Rider
                    </button>
                  )}
                  {a.id === 'DEL-603' && (
                    <button
                      onClick={() => handleAction(a.id, '14 Whitefield orders batch-assigned to 4 spillover riders')}
                      style={{ padding: '6px 14px', borderRadius: '6px', background: 'var(--primary, #3b82f6)', color: '#fff', border: 'none', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Auto-Batch Assign Parcels
                    </button>
                  )}
                  <button
                    onClick={() => handleAction(a.id, 'Acknowledged')}
                    style={{ padding: '6px 12px', borderRadius: '6px', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border, rgba(255,255,255,0.1))', color: 'var(--foreground, #f8fafc)', fontSize: '11px', cursor: 'pointer' }}
                  >
                    Acknowledge
                  </button>
                </div>
              )}
            </div>
          ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
