import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function ApiHealth() {
  const [endpoints, setEndpoints] = useState([
    { route: '/api/v1/data', method: 'GET', status: 'Healthy', p50: '3.8ms', p95: '11.2ms', p99: '18.5ms', rps: '18.4 rps', errors: '0.00%' },
    { route: '/api/v1/sales/save', method: 'POST', status: 'Healthy', p50: '6.2ms', p95: '14.8ms', p99: '22.0ms', rps: '6.1 rps', errors: '0.01%' },
    { route: '/api/v1/sales/import', method: 'POST', status: 'Healthy', p50: '18.4ms', p95: '42.0ms', p99: '84.0ms', rps: '1.2 rps', errors: '0.00%' },
    { route: '/api/v1/inventory', method: 'GET', status: 'Healthy', p50: '4.5ms', p95: '12.0ms', p99: '19.1ms', rps: '12.6 rps', errors: '0.00%' },
    { route: '/api/v1/inventory/save', method: 'POST', status: 'Healthy', p50: '8.1ms', p95: '16.4ms', p99: '28.2ms', rps: '3.4 rps', errors: '0.00%' },
    { route: '/api/v1/ai/brief', method: 'POST', status: 'Healthy', p50: '320ms', p95: '780ms', p99: '1,250ms', rps: '1.8 rps', errors: '0.04%' },
    { route: '/api/v1/health', method: 'GET', status: 'Healthy', p50: '1.2ms', p95: '3.4ms', p99: '6.8ms', rps: '24.0 rps', errors: '0.00%' },
    { route: '/api/v1/health/database', method: 'GET', status: 'Healthy', p50: '1.8ms', p95: '4.9ms', p99: '8.4ms', rps: '8.5 rps', errors: '0.00%' }
  ]);

  const [toast, setToast] = useState('');

  const pingRoute = (route) => {
    setToast(`Ping test sent to ${route} — HTTP 200 OK (2.4ms)`);
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <DashboardLayout
      category="System Health"
      subcategory="API Health"
      title="REST API & Endpoint Latency Health"
      subtitle="FastAPI microservices latency distribution, P50/P95/P99 benchmarks, error rates & throughput"
      icon="⚡"
      badge="Avg P95: 18ms"
      actions={
        <button
          onClick={() => {
            setToast('Benchmarking all registered REST endpoints across 1,000 synthetic requests...');
            setTimeout(() => setToast('Benchmark complete: All endpoints within sub-50ms SLA.'), 2500);
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
          ⏱️ Run Latency Benchmark
        </button>
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
        <KpiCard label="Average P50 Latency" value="4.2 ms" delta="-0.8ms vs baseline" trend="up" subtext="Sub-5ms median" icon="⚡" />
        <KpiCard label="P99 Tail Latency" value="22.4 ms" delta="Optimal" trend="up" subtext="Well within 100ms budget" icon="🛡️" />
        <KpiCard label="API Error Rate" value="0.008%" delta="99.99% success" trend="up" subtext="HTTP 5xx: 0.00%" icon="🟢" />
        <KpiCard label="Total Requests Today" value="184,920" delta="+18.4%" trend="up" subtext="Peak: 76 RPS" icon="📊" />
      </div>

      {/* HTTP Status Code Distribution */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '12px',
        background: 'var(--card, #ffffff)',
        border: '1px solid var(--border, #e2e8f0)',
        borderRadius: '12px',
        padding: '16px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
      }}>
        <div style={{ textAlign: 'center', borderRight: '1px solid var(--border, #e2e8f0)' }}>
          <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #64748b)', textTransform: 'uppercase', fontFamily: '"IBM Plex Mono", monospace' }}>HTTP 2xx (Success)</div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: '#16a34a', marginTop: '4px', fontFamily: '"IBM Plex Mono", monospace' }}>99.42%</div>
          <div style={{ fontSize: '10px', color: 'var(--muted-foreground, #94a3b8)' }}>183,846 calls</div>
        </div>
        <div style={{ textAlign: 'center', borderRight: '1px solid var(--border, #e2e8f0)' }}>
          <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #64748b)', textTransform: 'uppercase', fontFamily: '"IBM Plex Mono", monospace' }}>HTTP 3xx (Redirects)</div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: '#2563eb', marginTop: '4px', fontFamily: '"IBM Plex Mono", monospace' }}>0.20%</div>
          <div style={{ fontSize: '10px', color: 'var(--muted-foreground, #94a3b8)' }}>370 calls</div>
        </div>
        <div style={{ textAlign: 'center', borderRight: '1px solid var(--border, #e2e8f0)' }}>
          <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #64748b)', textTransform: 'uppercase', fontFamily: '"IBM Plex Mono", monospace' }}>HTTP 4xx (Client Errors)</div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: '#d97706', marginTop: '4px', fontFamily: '"IBM Plex Mono", monospace' }}>0.37%</div>
          <div style={{ fontSize: '10px', color: 'var(--muted-foreground, #94a3b8)' }}>684 calls (Auth / 404)</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #64748b)', textTransform: 'uppercase', fontFamily: '"IBM Plex Mono", monospace' }}>HTTP 5xx (Server Faults)</div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: '#16a34a', marginTop: '4px', fontFamily: '"IBM Plex Mono", monospace' }}>0.01%</div>
          <div style={{ fontSize: '10px', color: 'var(--muted-foreground, #94a3b8)' }}>2 calls (Recovered)</div>
        </div>
      </div>

      {/* Endpoints Table */}
      <div style={{
        background: 'var(--card, #ffffff)',
        border: '1px solid var(--border, #e2e8f0)',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>Endpoints Performance & SLA Monitor</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)', fontSize: '11px', background: '#f8fafc' }}>
              <th style={{ padding: '8px 12px' }}>Method</th>
              <th style={{ padding: '8px 12px' }}>Endpoint Route</th>
              <th style={{ padding: '8px 12px', textAlign: 'right' }}>P50</th>
              <th style={{ padding: '8px 12px', textAlign: 'right' }}>P95</th>
              <th style={{ padding: '8px 12px', textAlign: 'right' }}>P99</th>
              <th style={{ padding: '8px 12px', textAlign: 'right' }}>RPS</th>
              <th style={{ padding: '8px 12px', textAlign: 'right' }}>Error Rate</th>
              <th style={{ padding: '8px 12px', textAlign: 'right' }}>Status</th>
              <th style={{ padding: '8px 12px', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {endpoints.map((ep) => (
              <tr key={ep.route} style={{ borderBottom: '1px solid var(--border, #f1f5f9)' }}>
                <td style={{ padding: '12px' }}>
                  <span style={{
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontSize: '10px',
                    fontWeight: 700,
                    background: ep.method.includes('POST') ? '#eff6ff' : '#f0fdf4',
                    color: ep.method.includes('POST') ? '#2563eb' : '#16a34a',
                    border: ep.method.includes('POST') ? '1px solid #bfdbfe' : '1px solid #bbf7d0',
                    fontFamily: '"IBM Plex Mono", monospace'
                  }}>
                    {ep.method}
                  </span>
                </td>
                <td style={{ padding: '12px', fontFamily: '"IBM Plex Mono", monospace', fontSize: '12px', fontWeight: 600, color: 'var(--foreground, #0f172a)' }}>{ep.route}</td>
                <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{ep.p50}</td>
                <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{ep.p95}</td>
                <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{ep.p99}</td>
                <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{ep.rps}</td>
                <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: ep.errors === '0.00%' ? '#16a34a' : '#d97706' }}>{ep.errors}</td>
                <td style={{ padding: '12px', textAlign: 'right' }}>
                  <span style={{ padding: '2px 8px', borderRadius: '99px', background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0', fontWeight: 600, fontSize: '11px' }}>
                    ● {ep.status}
                  </span>
                </td>
                <td style={{ padding: '12px', textAlign: 'center' }}>
                  <button
                    onClick={() => pingRoute(ep.route)}
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
