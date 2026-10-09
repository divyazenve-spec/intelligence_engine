import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function CriticalAlerts() {
  const [alerts, setAlerts] = useState([]);

  const [toast, setToast] = useState('');

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleResolve = (id) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'Resolved' } : a));
    triggerToast(`Incident ${id} marked as resolved & logged to audit.`);
  };

  const handleEscalate = (id) => {
    triggerToast(`Paging Executive On-Call & triggering multi-channel broadcast for ${id}!`);
  };

  return (
    <DashboardLayout
      category="Alerts & Notifications"
      subcategory="Critical Alerts"
      title="Sev-1 Critical Emergency Alerts"
      subtitle="Immediate response dashboard for life-safety, cold-chain failure, critical gateway downtime, and hospital ICU red flags"
      icon="🚨"
      badge=""
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => triggerToast('Emergency Incident Commander roster paged via SMS & WhatsApp.')}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              background: '#ef4444',
              color: '#ffffff',
              border: 'none',
              fontWeight: 600,
              fontSize: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>📢</span> Trigger Emergency Broadcast
          </button>
          <button
            onClick={() => triggerToast('Exported Sev-1 incident timeline to PDF/CSV.')}
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
            Export Incident Log
          </button>
        </div>
      }
    >
      {toast && (
        <div style={{
          padding: '10px 16px',
          background: 'rgba(239,68,68,0.15)',
          border: '1px solid #ef4444',
          borderRadius: '8px',
          color: '#f87171',
          fontSize: '13px',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span>⚡</span> {toast}
        </div>
      )}

      {/* KPI Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard
          label="Active Sev-1 Incidents"
          value="0 Active"
          delta="0.0%"
          trend="neutral"
          subtext="0 active incidents"
          icon="🚨"
        />
        <KpiCard
          label="Mean Time to Detect (MTTD)"
          value="0 Mins"
          delta="0.0%"
          trend="neutral"
          subtext="0 telemetry feeds"
          icon="⏱️"
        />
        <KpiCard
          label="Financial Value at Risk"
          value="₹0"
          delta="0.0%"
          trend="neutral"
          subtext="₹0 at risk"
          icon="🛡️"
        />
        <KpiCard
          label="On-Call ICU Specialists"
          value="0 Vets Active"
          delta="0.0%"
          trend="neutral"
          subtext="0 active specialists"
          icon="👨‍⚕️"
        />
      </div>

      {/* Main Sev-1 Incident Table */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444', display: 'inline-block' }}></span>
              Live Critical Incidents Stream
            </h3>
            <p style={{ margin: '4px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>
              Sev-1 alerts trigger automated multi-channel escalation every 5 minutes until acknowledged by incident owner.
            </p>
          </div>
          <span style={{
            fontSize: '11px',
            padding: '4px 10px',
            borderRadius: '99px',
            background: 'rgba(239, 68, 68, 0.15)',
            color: '#ef4444',
            fontWeight: 700,
            fontFamily: '"IBM Plex Mono", monospace'
          }}>
            P1 SLA: 15 MIN ESCALATION
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {alerts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '36px', color: 'var(--muted-foreground, #94a3b8)', fontSize: '13px' }}>
              No active Sev-1 critical incidents reported. All systems operational.
            </div>
          ) : (
            alerts.map((alert) => (
            <div
              key={alert.id}
              style={{
                padding: '16px',
                borderRadius: '10px',
                background: alert.status === 'Resolved' ? 'rgba(16,185,129,0.05)' : 'rgba(239,68,68,0.06)',
                border: alert.status === 'Resolved' ? '1px solid rgba(16,185,129,0.3)' : '1px solid rgba(239,68,68,0.3)',
                borderLeft: alert.status === 'Resolved' ? '4px solid #10b981' : '4px solid #ef4444',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      fontFamily: '"IBM Plex Mono", monospace',
                      fontSize: '11px',
                      fontWeight: 700,
                      background: 'rgba(239,68,68,0.2)',
                      color: '#ef4444',
                      padding: '2px 6px',
                      borderRadius: '4px'
                    }}>
                      {alert.id}
                    </span>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--foreground, #f8fafc)' }}>
                      {alert.title}
                    </span>
                    <span style={{
                      fontSize: '11px',
                      padding: '2px 8px',
                      borderRadius: '99px',
                      background: alert.status === 'Resolved' ? 'rgba(16,185,129,0.2)' : 'rgba(245,158,11,0.2)',
                      color: alert.status === 'Resolved' ? '#10b981' : '#f59e0b',
                      fontWeight: 600
                    }}>
                      {alert.status}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)', marginTop: '4px' }}>
                    Facility: <strong style={{ color: 'var(--foreground, #f8fafc)' }}>{alert.facility}</strong> · Incident Lead: <strong style={{ color: 'var(--foreground, #f8fafc)' }}>{alert.lead}</strong>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#ef4444' }}>{alert.slaCountdown}</div>
                  <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)' }}>Triggered {alert.time}</div>
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '10px',
                padding: '10px',
                background: 'rgba(0,0,0,0.2)',
                borderRadius: '6px',
                fontSize: '12px'
              }}>
                <div>
                  <span style={{ color: 'var(--muted-foreground, #94a3b8)' }}>Trigger Telemetry:</span>{' '}
                  <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontWeight: 600, color: '#f87171' }}>{alert.metric}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--muted-foreground, #94a3b8)' }}>Clinical / Operational Impact:</span>{' '}
                  <span style={{ fontWeight: 600, color: 'var(--foreground, #f8fafc)' }}>{alert.impact}</span>
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <span style={{ color: 'var(--muted-foreground, #94a3b8)' }}>Current Mitigation Action:</span>{' '}
                  <span style={{ color: '#38bdf8' }}>{alert.actionTaken}</span>
                </div>
              </div>

              {alert.status !== 'Resolved' && (
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', paddingTop: '4px' }}>
                  <button
                    onClick={() => handleEscalate(alert.id)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '6px',
                      background: 'rgba(239,68,68,0.15)',
                      border: '1px solid rgba(239,68,68,0.3)',
                      color: '#ef4444',
                      fontSize: '11px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Escalate to Command Center
                  </button>
                  <button
                    onClick={() => handleResolve(alert.id)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '6px',
                      background: '#10b981',
                      border: 'none',
                      color: '#ffffff',
                      fontSize: '11px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    ✓ Acknowledge & Resolve
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
