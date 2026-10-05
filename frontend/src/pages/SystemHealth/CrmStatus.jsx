import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function CrmStatus() {
  const [connectors, setConnectors] = useState([
    {
      name: 'HubSpot Pet Parents CRM',
      type: 'Customer 360 & Marketing Hub',
      endpoint: 'api.hubapi.com/v3',
      syncedContacts: '142,500',
      syncFrequency: 'Every 5 mins',
      lastSync: '2m ago',
      queueStatus: '0 backlog',
      status: 'Connected',
      tokenExpiry: '28 days left'
    },
    {
      name: 'Freshdesk Omnichannel Support',
      type: 'Customer Tickets & Tele-Vet Support',
      endpoint: 'zenve.freshdesk.com/api/v2',
      syncedContacts: '18,400 tickets',
      syncFrequency: 'Real-time Webhook',
      lastSync: 'Just now',
      queueStatus: '0 backlog',
      status: 'Connected',
      tokenExpiry: 'Permanent API Key'
    },
    {
      name: 'Salesforce B2B Veterinary Accounts',
      type: 'Corporate Clinics & Enterprise B2B',
      endpoint: 'zenve.my.salesforce.com/services/oauth2',
      syncedContacts: '48 corporate clinics',
      syncFrequency: 'Hourly batch',
      lastSync: '14m ago',
      queueStatus: '0 backlog',
      status: 'Connected',
      tokenExpiry: 'Auto-refreshed'
    }
  ]);

  const [toast, setToast] = useState('');

  const syncNow = (name) => {
    setToast(`Forced differential sync queued for ${name}. Processing 0 delta records.`);
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <DashboardLayout
      category="System Health"
      subcategory="CRM Status"
      title="CRM Integrations & Contact Sync Health"
      subtitle="HubSpot, Freshdesk & Salesforce connectors, contact sync queues, webhook listeners & auth status"
      icon="👥"
      badge="All Connectors Synced"
      actions={
        <button
          onClick={() => {
            setToast('Triggered full CRM contact reconciliation across HubSpot and Freshdesk.');
            setTimeout(() => setToast('Reconciliation finished: 142,500 contacts 100% matched.'), 2500);
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
          🔄 Re-sync All Contacts
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
        <KpiCard label="Synced Pet Profiles" value="142,500" delta="+184 today" trend="up" subtext="HubSpot CRM master" icon="🐾" />
        <KpiCard label="Sync Lag" value="1.4 s" delta="Near real-time" trend="up" subtext="Webhook powered" icon="⚡" />
        <KpiCard label="Failed Sync Payloads" value="0 Failed" delta="100% clean" trend="up" subtext="Dead letter queue: 0" icon="🟢" />
        <KpiCard label="API Quota Remaining" value="88.4%" delta="442k / 500k calls" trend="up" subtext="Daily HubSpot quota" icon="📊" />
      </div>

      {/* CRM Connectors Table */}
      <div style={{
        background: 'var(--card, #ffffff)',
        border: '1px solid var(--border, #e2e8f0)',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>Active CRM Connectors</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)', fontSize: '11px', background: '#f8fafc' }}>
              <th style={{ padding: '10px 12px' }}>Platform Name</th>
              <th style={{ padding: '10px 12px' }}>Role / Module</th>
              <th style={{ padding: '10px 12px', textAlign: 'right' }}>Volume</th>
              <th style={{ padding: '10px 12px', textAlign: 'right' }}>Frequency</th>
              <th style={{ padding: '10px 12px', textAlign: 'right' }}>Last Run</th>
              <th style={{ padding: '10px 12px', textAlign: 'right' }}>Token Status</th>
              <th style={{ padding: '10px 12px', textAlign: 'right' }}>State</th>
              <th style={{ padding: '10px 12px', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {connectors.map((c) => (
              <tr key={c.name} style={{ borderBottom: '1px solid var(--border, #f1f5f9)' }}>
                <td style={{ padding: '12px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>
                  {c.name}
                  <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #64748b)', fontFamily: '"IBM Plex Mono", monospace' }}>{c.endpoint}</div>
                </td>
                <td style={{ padding: '12px', color: 'var(--muted-foreground, #64748b)' }}>{c.type}</td>
                <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{c.syncedContacts}</td>
                <td style={{ padding: '12px', textAlign: 'right' }}>{c.syncFrequency}</td>
                <td style={{ padding: '12px', textAlign: 'right', color: '#16a34a', fontFamily: '"IBM Plex Mono", monospace' }}>{c.lastSync}</td>
                <td style={{ padding: '12px', textAlign: 'right', fontSize: '11px', color: 'var(--muted-foreground, #64748b)' }}>{c.tokenExpiry}</td>
                <td style={{ padding: '12px', textAlign: 'right' }}>
                  <span style={{ padding: '2px 8px', borderRadius: '99px', background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0', fontWeight: 600, fontSize: '11px' }}>
                    ● {c.status}
                  </span>
                </td>
                <td style={{ padding: '12px', textAlign: 'center' }}>
                  <button
                    onClick={() => syncNow(c.name)}
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
                    Sync Now
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
