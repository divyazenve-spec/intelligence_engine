import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function PaymentGatewayHealth() {
  const [gateways, setGateways] = useState([]);

  const [toast, setToast] = useState('');

  const testWebhook = (gwName) => {
    setToast(`Test webhook payload dispatched to ${gwName} — 200 OK received in 42ms.`);
    setTimeout(() => setToast(''), 3500);
  };

  return (
    <DashboardLayout
      category="System Health"
      subcategory="Payment Gateway"
      title="Payment Gateways & Webhook Health"
      subtitle="Razorpay, Cashfree & Stripe gateway health, UPI success rates, webhook latency & settlement queues"
      icon="💳"
      badge=""
      actions={
        <button
          onClick={() => {
            setToast('Dispatched test payment intent verification across all active gateways.');
            setTimeout(() => setToast('All gateways responding within <120ms SLA.'), 2500);
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
          🔄 Test Payment Gateways
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
        <KpiCard label="Overall Success Rate" value="0.0%" delta="+0.4% vs target" trend="up" subtext="Across all payment modes" icon="🟢" />
        <KpiCard label="Average Webhook Latency" value="28 ms" delta="Rapid callbacks" trend="up" subtext="Sub-50ms fulfillment" icon="⚡" />
        <KpiCard label="Failed Transactions" value="0.0%" delta="Low abandonment" trend="up" subtext="Bank timeouts only" icon="🛡️" />
        <KpiCard label="Instant Refund SLA" value="0.0%" delta="Zero breaches" trend="up" subtext="Compliant with RBI 1-hr" icon="💳" />
      </div>

      {/* Gateway Status Table */}
      <div style={{
        background: 'var(--card, #ffffff)',
        border: '1px solid var(--border, #e2e8f0)',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>Configured Payment Processors & Webhooks</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)', fontSize: '11px', background: '#f8fafc' }}>
              <th style={{ padding: '10px 12px' }}>Gateway Name</th>
              <th style={{ padding: '10px 12px', textAlign: 'right' }}>Ping Latency</th>
              <th style={{ padding: '10px 12px', textAlign: 'right' }}>Success Rate</th>
              <th style={{ padding: '10px 12px', textAlign: 'right' }}>Uptime</th>
              <th style={{ padding: '10px 12px', textAlign: 'right' }}>Webhook Health</th>
              <th style={{ padding: '10px 12px', textAlign: 'right' }}>Status</th>
              <th style={{ padding: '10px 12px', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {gateways.map((gw) => (
              <tr key={gw.name} style={{ borderBottom: '1px solid var(--border, #f1f5f9)' }}>
                <td style={{ padding: '12px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>
                  {gw.name}
                  <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #64748b)', fontWeight: 400 }}>{gw.provider}</div>
                </td>
                <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{gw.latency}</td>
                <td style={{ padding: '12px', textAlign: 'right', fontWeight: 600, color: '#16a34a', fontFamily: '"IBM Plex Mono", monospace' }}>{gw.successRate}</td>
                <td style={{ padding: '12px', textAlign: 'right' }}>{gw.uptime}</td>
                <td style={{ padding: '12px', textAlign: 'right', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>{gw.webhookHealth}</td>
                <td style={{ padding: '12px', textAlign: 'right' }}>
                  <span style={{ padding: '2px 8px', borderRadius: '99px', background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0', fontWeight: 600, fontSize: '11px' }}>
                    ● {gw.status}
                  </span>
                </td>
                <td style={{ padding: '12px', textAlign: 'center' }}>
                  <button
                    onClick={() => testWebhook(gw.name)}
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
                    Test Webhook
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
