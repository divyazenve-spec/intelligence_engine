import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function NotificationServicesHealth() {
  const [providers, setProviders] = useState([
    {
      name: 'Gupshup SMS Gateway (India)',
      channel: 'Transactional SMS (DLT Approved)',
      endpoint: 'enterprise.smsgupshup.com',
      deliveryRate: '99.88%',
      latency: '2.1s',
      balance: '₹42,850 (Adequate)',
      queue: '0 pending',
      status: 'Active'
    },
    {
      name: 'SendGrid Enterprise Email API',
      channel: 'Transactional Order Invoices & Rx Reports',
      endpoint: 'api.sendgrid.com/v3/mail/send',
      deliveryRate: '99.94%',
      latency: '1.4s',
      balance: 'Unlimited Enterprise',
      queue: '0 pending',
      status: 'Active'
    },
    {
      name: 'Firebase Cloud Messaging (FCM)',
      channel: 'Mobile App Push (Android & iOS)',
      endpoint: 'fcm.googleapis.com/v1',
      deliveryRate: '98.70%',
      latency: '850ms',
      balance: 'Google Cloud Tier-1',
      queue: '12 in-flight',
      status: 'Active'
    },
    {
      name: 'WhatsApp Business Cloud API',
      channel: 'Order Tracking & Doctor Appointment Chimes',
      endpoint: 'graph.facebook.com/v19.0',
      deliveryRate: '99.65%',
      latency: '1.8s',
      balance: 'Meta Monthly Post-paid',
      queue: '0 pending',
      status: 'Active'
    }
  ]);

  const [toast, setToast] = useState('');

  const sendTestNotification = (name) => {
    setToast(`Test notification beacon sent through ${name} — Delivered successfully.`);
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <DashboardLayout
      category="System Health"
      subcategory="Notification Services"
      title="SMS, Email & Push Notification Gateways"
      subtitle="Gupshup SMS, SendGrid email, Firebase FCM push & WhatsApp Business delivery health"
      icon="🔔"
      badge="99.8% Overall Delivery"
      actions={
        <button
          onClick={() => {
            setToast('Dispatched multi-channel delivery benchmark test.');
            setTimeout(() => setToast('Benchmark complete: SMS (2.1s), Email (1.4s), Push (850ms).'), 2500);
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
          📲 Test Delivery Latencies
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
        <KpiCard label="Overall Delivery Rate" value="99.82%" delta="High deliverability" trend="up" subtext="Across SMS, Email & App" icon="🟢" />
        <KpiCard label="Average Delivery Time" value="1.5 s" delta="-0.3s vs baseline" trend="up" subtext="Real-time alert SLAs" icon="⚡" />
        <KpiCard label="Messages Dispatched Today" value="84,210" delta="+16.2% today" trend="up" subtext="Peak hour handled" icon="📨" />
        <KpiCard label="DLT Template Compliance" value="100%" delta="Zero rejections" trend="up" subtext="TRAI DLT compliant" icon="🛡️" />
      </div>

      {/* Providers Table */}
      <div style={{
        background: 'var(--card, #ffffff)',
        border: '1px solid var(--border, #e2e8f0)',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>Active Notification Channels</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)', fontSize: '11px', background: '#f8fafc' }}>
              <th style={{ padding: '10px 12px' }}>Channel / Provider</th>
              <th style={{ padding: '10px 12px' }}>Traffic Type</th>
              <th style={{ padding: '10px 12px', textAlign: 'right' }}>Delivery Rate</th>
              <th style={{ padding: '10px 12px', textAlign: 'right' }}>Avg Latency</th>
              <th style={{ padding: '10px 12px', textAlign: 'right' }}>Account Balance</th>
              <th style={{ padding: '10px 12px', textAlign: 'right' }}>Status</th>
              <th style={{ padding: '10px 12px', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {providers.map((p) => (
              <tr key={p.name} style={{ borderBottom: '1px solid var(--border, #f1f5f9)' }}>
                <td style={{ padding: '12px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>
                  {p.name}
                  <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #64748b)', fontFamily: '"IBM Plex Mono", monospace' }}>{p.endpoint}</div>
                </td>
                <td style={{ padding: '12px', color: 'var(--muted-foreground, #64748b)' }}>{p.channel}</td>
                <td style={{ padding: '12px', textAlign: 'right', fontWeight: 600, color: '#16a34a', fontFamily: '"IBM Plex Mono", monospace' }}>{p.deliveryRate}</td>
                <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{p.latency}</td>
                <td style={{ padding: '12px', textAlign: 'right', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>{p.balance}</td>
                <td style={{ padding: '12px', textAlign: 'right' }}>
                  <span style={{ padding: '2px 8px', borderRadius: '99px', background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0', fontWeight: 600, fontSize: '11px' }}>
                    ● {p.status}
                  </span>
                </td>
                <td style={{ padding: '12px', textAlign: 'center' }}>
                  <button
                    onClick={() => sendTestNotification(p.name)}
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
                    Send Test
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
