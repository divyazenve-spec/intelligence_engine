import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function SystemHealthDashboard() {
  const services = [
    { name: 'FastAPI Backend API', host: 'http://127.0.0.1:8000', status: 'Healthy', latency: '4ms', uptime: '99.99%' },
    { name: 'Vite React Frontend', host: 'http://localhost:3001', status: 'Healthy', latency: '2ms', uptime: '100%' },
    { name: 'SQLite Zenve Database', host: 'zenvebi.db (28KB)', status: 'Healthy', latency: '1ms', uptime: '100%' },
    { name: 'Payment Gateway (Razorpay)', host: 'api.razorpay.com', status: 'Healthy', latency: '82ms', uptime: '99.95%' },
    { name: 'SMS & WhatsApp Gateway', host: 'api.gupshup.io', status: 'Healthy', latency: '64ms', uptime: '99.88%' },
    { name: 'Accounting System Sync', host: 'api.zoho.com', status: 'Synced', latency: '110ms', uptime: '99.50%' }
  ];

  return (
    <DashboardLayout
      category="System Health"
      subcategory="Infrastructure & Integration Services"
      title="System Architecture & Service Health"
      subtitle="FastAPI microservices, SQLite database latency, API health checks, and payment integrations"
      icon="🖥️"
      badge="99.98% Uptime"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Overall Uptime" value="99.98%" delta="Online" trend="up" subtext="Last 90 days" icon="🟢" />
        <KpiCard label="Backend Latency" value="4 ms" delta="FastAPI uvicorn" trend="up" subtext="Sub-10ms response" icon="⚡" />
        <KpiCard label="Active Microservices" value="6 Online" delta="All green" trend="up" subtext="Zero degraded" icon="🖥️" />
        <KpiCard label="Failed API Requests" value="0.001%" delta="Optimal" trend="up" subtext="Error rate" icon="🛡️" />
      </div>

      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>Infrastructure Services Status</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))', color: 'var(--muted-foreground, #94a3b8)', fontSize: '11px' }}>
              <th style={{ padding: '8px 12px' }}>Service Name</th>
              <th style={{ padding: '8px 12px' }}>Host / Endpoint</th>
              <th style={{ padding: '8px 12px', textAlign: 'right' }}>Latency</th>
              <th style={{ padding: '8px 12px', textAlign: 'right' }}>Uptime</th>
              <th style={{ padding: '8px 12px', textAlign: 'right' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr key={s.name} style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.04))' }}>
                <td style={{ padding: '12px', fontWeight: 700 }}>{s.name}</td>
                <td style={{ padding: '12px', color: 'var(--muted-foreground, #94a3b8)', fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px' }}>{s.host}</td>
                <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{s.latency}</td>
                <td style={{ padding: '12px', textAlign: 'right' }}>{s.uptime}</td>
                <td style={{ padding: '12px', textAlign: 'right' }}>
                  <span style={{
                    padding: '2px 8px',
                    borderRadius: '99px',
                    background: 'rgba(16,185,129,0.15)',
                    color: '#10b981',
                    fontWeight: 600,
                    fontSize: '11px'
                  }}>● {s.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
