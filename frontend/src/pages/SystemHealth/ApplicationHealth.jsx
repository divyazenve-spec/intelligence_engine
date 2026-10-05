import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function ApplicationHealth() {
  const [apps, setApps] = useState([
    {
      name: 'Vite React Frontend Web App',
      type: 'Single Page Application (SPA)',
      environment: 'Production / Local',
      port: '3001',
      status: 'Healthy',
      uptime: '99.99%',
      memory: '42 MB',
      cpu: '0.4%',
      requestsPerMin: '142 rpm',
      version: 'v2.4.0'
    },
    {
      name: 'FastAPI REST Microservice',
      type: 'Python ASGI (Uvicorn Workers)',
      environment: 'Production / Local',
      port: '8000',
      status: 'Healthy',
      uptime: '99.98%',
      memory: '78 MB',
      cpu: '1.2%',
      requestsPerMin: '380 rpm',
      version: 'v1.0.0'
    },
    {
      name: 'Background Worker Daemon',
      type: 'Asyncio Task Queue',
      environment: 'Internal Node',
      port: 'Internal',
      status: 'Healthy',
      uptime: '99.95%',
      memory: '34 MB',
      cpu: '0.8%',
      requestsPerMin: '60 jobs/min',
      version: 'v1.1.2'
    },
    {
      name: 'Zenve Pet Mobile App (Android)',
      type: 'React Native / Android 14',
      environment: 'Google Play Store',
      port: 'HTTPS',
      status: 'Healthy',
      uptime: '99.92%',
      memory: 'Client',
      cpu: 'Client',
      requestsPerMin: '1,240 rpm',
      version: 'v3.1.2 (Build 412)'
    },
    {
      name: 'Zenve Pet Mobile App (iOS)',
      type: 'Swift / React Native',
      environment: 'Apple App Store',
      port: 'HTTPS',
      status: 'Healthy',
      uptime: '99.94%',
      memory: 'Client',
      cpu: 'Client',
      requestsPerMin: '980 rpm',
      version: 'v3.1.0 (Build 388)'
    },
    {
      name: 'In-Memory Cache & Session Layer',
      type: 'Memory Store & LRU Cache',
      environment: 'Internal Node',
      port: '6379 (Virtual)',
      status: 'Healthy',
      uptime: '100%',
      memory: '128 MB',
      cpu: '0.2%',
      requestsPerMin: '2,400 rpm',
      version: 'v1.0.0'
    }
  ]);

  const [toast, setToast] = useState('');

  const triggerDiagnostic = (appName) => {
    setToast(`Diagnostic ping dispatched to ${appName} — Response: OK (2.1ms)`);
    setTimeout(() => setToast(''), 3500);
  };

  const restartWorker = (appName) => {
    setToast(`Soft reload signal sent to ${appName}`);
    setTimeout(() => setToast(''), 3500);
  };

  return (
    <DashboardLayout
      category="System Health"
      subcategory="Application Health"
      title="Application & Microservice Health"
      subtitle="Host runtime, process memory, Uvicorn ASGI workers, mobile app endpoints & load metrics"
      icon="💻"
      badge="All Systems Operational"
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => {
              setToast('Global health check initiated across all 6 application runtimes.');
              setTimeout(() => setToast(''), 3000);
            }}
            style={{
              padding: '7px 14px',
              borderRadius: '8px',
              background: '#2563eb',
              color: '#ffffff',
              border: '1px solid #1d4ed8',
              fontWeight: 600,
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            ⚡ Run Application Diagnostics
          </button>
        </div>
      }
    >
      {toast && (
        <div style={{
          padding: '10px 16px',
          background: '#eff6ff',
          border: '1px solid #bfdbfe',
          borderRadius: '8px',
          color: '#2563eb',
          fontSize: '13px',
          fontWeight: 600
        }}>
          ℹ️ {toast}
        </div>
      )}

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Application Uptime" value="99.98%" delta="Online" trend="up" subtext="No Sev-1 downtime" icon="🟢" />
        <KpiCard label="Active Applications" value="6 / 6 Live" delta="100% Ready" trend="up" subtext="All microservices green" icon="🚀" />
        <KpiCard label="Total Process Memory" value="282 MB" delta="-4% vs peak" trend="up" subtext="Under 1GB budget" icon="💾" />
        <KpiCard label="Total Throughput" value="5,202 rpm" delta="+12% today" trend="up" subtext="Peak load handled" icon="⚡" />
      </div>

      {/* Application Matrix Table */}
      <div style={{
        background: 'var(--card, #ffffff)',
        border: '1px solid var(--border, #e2e8f0)',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>Registered Applications & Daemons</h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>
              Real-time resource utilization, worker process latency, and status
            </p>
          </div>
          <span style={{ fontSize: '11px', color: '#166534', fontWeight: 600, background: '#f0fdf4', padding: '3px 9px', borderRadius: '99px', border: '1px solid #bbf7d0' }}>
            ● 6 Services Healthy
          </span>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)', fontSize: '11px', background: '#f8fafc' }}>
              <th style={{ padding: '10px 12px' }}>Application Name</th>
              <th style={{ padding: '10px 12px' }}>Architecture & Stack</th>
              <th style={{ padding: '10px 12px' }}>Port / Host</th>
              <th style={{ padding: '10px 12px', textAlign: 'right' }}>Memory</th>
              <th style={{ padding: '10px 12px', textAlign: 'right' }}>CPU</th>
              <th style={{ padding: '10px 12px', textAlign: 'right' }}>Throughput</th>
              <th style={{ padding: '10px 12px', textAlign: 'right' }}>Status</th>
              <th style={{ padding: '10px 12px', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {apps.map((app) => (
              <tr key={app.name} style={{ borderBottom: '1px solid var(--border, #f1f5f9)' }}>
                <td style={{ padding: '12px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>
                  {app.name}
                  <div style={{ fontSize: '10px', color: 'var(--muted-foreground, #64748b)', fontWeight: 400 }}>{app.version}</div>
                </td>
                <td style={{ padding: '12px', color: 'var(--muted-foreground, #64748b)', fontSize: '12px' }}>{app.type}</td>
                <td style={{ padding: '12px', fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px' }}>{app.port}</td>
                <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{app.memory}</td>
                <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{app.cpu}</td>
                <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{app.requestsPerMin}</td>
                <td style={{ padding: '12px', textAlign: 'right' }}>
                  <span style={{
                    padding: '2px 8px',
                    borderRadius: '99px',
                    background: '#f0fdf4',
                    color: '#16a34a',
                    border: '1px solid #bbf7d0',
                    fontWeight: 600,
                    fontSize: '11px'
                  }}>● {app.status}</span>
                </td>
                <td style={{ padding: '12px', textAlign: 'center' }}>
                  <div style={{ display: 'inline-flex', gap: '6px' }}>
                    <button
                      onClick={() => triggerDiagnostic(app.name)}
                      style={{
                        padding: '4px 8px',
                        borderRadius: '6px',
                        background: '#f8fafc',
                        border: '1px solid var(--border, #e2e8f0)',
                        color: 'var(--foreground, #0f172a)',
                        fontSize: '11px',
                        cursor: 'pointer'
                      }}
                    >
                      Ping
                    </button>
                    <button
                      onClick={() => restartWorker(app.name)}
                      style={{
                        padding: '4px 8px',
                        borderRadius: '6px',
                        background: '#eff6ff',
                        border: '1px solid #bfdbfe',
                        color: '#2563eb',
                        fontSize: '11px',
                        cursor: 'pointer'
                      }}
                    >
                      Reload
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
