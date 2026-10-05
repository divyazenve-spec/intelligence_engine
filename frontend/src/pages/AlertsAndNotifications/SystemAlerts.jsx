import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function SystemAlerts() {
  const [alerts, setAlerts] = useState([
    {
      id: 'SYS-901',
      title: 'FastAPI Gateway Latency Spike on /api/v1/orders/create',
      service: 'FastAPI Order Routing Gateway (Uvicorn Workers)',
      metric: 'P99 Latency: 640ms (Baseline: 45ms)',
      impact: 'Mobile app checkout spinner showing 1.2s delay for customers',
      severity: 'Critical',
      time: '18m ago',
      status: 'Active'
    },
    {
      id: 'SYS-902',
      title: 'SQLite Database Write-Lock Contention on zenvebi.db',
      service: 'Core Persistence Layer (SQLite WAL Mode)',
      metric: 'Write Lock Queue: 14 concurrent transactions waiting',
      impact: 'Telemetry ingestion from cold-chain sensors delayed by 8 seconds',
      severity: 'High Warning',
      time: '29m ago',
      status: 'Active'
    },
    {
      id: 'SYS-903',
      title: 'Google Gemini AI Token Quota Consumption Warning (88%)',
      service: 'Zenve AI Revenue Intelligence & Executive Briefing Engine',
      metric: 'Per-minute token consumption at 88% of Tier-3 ceiling',
      impact: 'Automated revenue anomaly analysis may throttle if traffic surges',
      severity: 'Warning',
      time: '45m ago',
      status: 'Monitoring'
    },
    {
      id: 'SYS-904',
      title: 'ERP Financial Sync Delay: Tally Prime Connector (2h 15m lag)',
      service: 'Tally Prime / Zoho Books Gateway',
      metric: 'Last sync: 2 hours 15 minutes ago (Expected interval: 30 mins)',
      impact: 'P&L and Accounts Receivable balances not real-time in Executive view',
      severity: 'Warning',
      time: '1h ago',
      status: 'Reconnecting'
    },
    {
      id: 'SYS-905',
      title: 'Session Memory Cache Utilization Above Warning Threshold (82%)',
      service: 'In-Memory Cache & WebSocket Feed Node',
      metric: 'Memory usage: 3.28 GB / 4.00 GB allocation',
      impact: 'Garbage collection cycles causing micro-jitters on live dispatch board',
      severity: 'Info',
      time: '2h ago',
      status: 'Active'
    }
  ]);

  const [toast, setToast] = useState('');

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleAction = (id, act) => {
    triggerToast(`DevOps action "${act}" executed for ${id}.`);
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'Resolved' } : a));
  };

  return (
    <DashboardLayout
      category="Alerts & Notifications"
      subcategory="System Alerts"
      title="System Health, API & Infrastructure Alerts"
      subtitle="Monitoring FastAPI latency spikes, SQLite database concurrency locks, Gemini AI quotas, and ERP financial synchronization"
      icon="🖥️"
      badge="99.92% System Uptime"
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => triggerToast('FastAPI worker thread pools flushed and restarted gracefully.')}
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
            ⚡ Flush Worker Pools
          </button>
          <button
            onClick={() => triggerToast('Forced bidirectional Tally Prime sync handshake via secure tunnel.')}
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
            🔄 Force ERP Sync
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
          label="API Gateway P99 Latency"
          value="640 ms"
          delta="Spike on /orders/create"
          trend="down"
          subtext="Target: < 80ms"
          icon="⚡"
        />
        <KpiCard
          label="Database WAL Contention"
          value="14 Queued"
          delta="Peak during batch sync"
          trend="down"
          subtext="SQLite zenvebi.db"
          icon="🗄️"
        />
        <KpiCard
          label="Gemini AI Quota Headroom"
          value="12% Headroom"
          delta="88% Consumed"
          trend="down"
          subtext="Tier-3 Enterprise API"
          icon="🤖"
        />
        <KpiCard
          label="ERP Connector Status"
          value="2h 15m Lag"
          delta="VPN Reconnect required"
          trend="down"
          subtext="Tally Prime Sync"
          icon="🔌"
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
          Infrastructure Telemetry, Database & API Exception Watch
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {alerts.map((a) => (
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
                    Service: <strong style={{ color: 'var(--foreground, #f8fafc)' }}>{a.service}</strong>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: a.severity === 'Critical' ? '#ef4444' : '#fbbf24' }}>
                    {a.metric}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)', marginTop: '2px' }}>
                    Status: <strong style={{ color: a.status === 'Resolved' ? '#10b981' : '#38bdf8' }}>{a.status}</strong>
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>
                <strong>User / Business Impact:</strong> {a.impact}
              </div>

              {a.status !== 'Resolved' && (
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', paddingTop: '4px' }}>
                  {a.id === 'SYS-901' && (
                    <button
                      onClick={() => handleAction(a.id, 'Scaled up Uvicorn workers from 4 to 8 instances')}
                      style={{ padding: '6px 14px', borderRadius: '6px', background: 'var(--primary, #3b82f6)', color: '#fff', border: 'none', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Scale Worker Instances
                    </button>
                  )}
                  {a.id === 'SYS-902' && (
                    <button
                      onClick={() => handleAction(a.id, 'Executed SQLite PRAGMA wal_checkpoint(TRUNCATE)')}
                      style={{ padding: '6px 14px', borderRadius: '6px', background: '#10b981', color: '#fff', border: 'none', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Truncate WAL Checkpoint
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
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
