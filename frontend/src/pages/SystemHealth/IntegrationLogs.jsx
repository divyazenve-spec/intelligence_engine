import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function IntegrationLogs() {
  const [filterLevel, setFilterLevel] = useState('ALL');
  const [filterService, setFilterService] = useState('ALL');
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState('');

  const [rawLogs, setRawLogs] = useState([
    { id: 'LOG-881', time: '14:32:05', service: 'FastAPI Backend', level: 'INFO', message: 'Health diagnostic probe /api/health returned 200 OK (1.2ms latency)' },
    { id: 'LOG-880', time: '14:31:40', service: 'Razorpay Gateway', level: 'INFO', message: 'Webhook event payment.captured processed for order #ORD-9912 (₹2,400) · 24ms' },
    { id: 'LOG-879', time: '14:30:12', service: 'Zoho Books Sync', level: 'INFO', message: 'Batch sync #4812 completed: 18 sales invoices matched to accounts receivable' },
    { id: 'LOG-878', time: '14:28:55', service: 'IoT Cold-Chain', level: 'INFO', message: 'Telemetry heartbeat received from BLR Central Depot Freezer #1: +4.1°C' },
    { id: 'LOG-877', time: '14:27:10', service: 'Gupshup SMS', level: 'INFO', message: 'DLT SMS delivered to +91 98450***** (Template: VET_APPT_REMINDER)' },
    { id: 'LOG-876', time: '14:25:04', service: 'HubSpot CRM', level: 'INFO', message: 'Contact profile updated: 1 new pet record linked to user #USR-8812' },
    { id: 'LOG-875', time: '14:21:18', service: 'Cashfree Gateway', level: 'WARN', message: 'Instant UPI payout queued — Bank network experiencing micro-retry (Resolved in 4s)' },
    { id: 'LOG-874', time: '14:18:22', service: 'SQLite Core DB', level: 'INFO', message: 'WAL checkpoint executed: 48 pages transferred to zenvebi.db master file' },
    { id: 'LOG-873', time: '14:15:00', service: 'Meta Ads CAPI', level: 'INFO', message: 'Conversion event Purchase (value: ₹4,800) forwarded with Match Quality 9.2' },
    { id: 'LOG-872', time: '14:10:44', service: 'FastAPI Backend', level: 'INFO', message: 'Inventory batch update completed: 12 SKUs refreshed in 4.5ms' }
  ]);

  const filteredLogs = rawLogs.filter((log) => {
    const matchesLevel = filterLevel === 'ALL' || log.level === filterLevel;
    const matchesService = filterService === 'ALL' || log.service === filterService;
    const matchesSearch = !search || `${log.service} ${log.message} ${log.id}`.toLowerCase().includes(search.toLowerCase());
    return matchesLevel && matchesService && matchesSearch;
  });

  const clearLogs = () => {
    setToast('Diagnostic logs display cleared from current session.');
    setTimeout(() => setToast(''), 3000);
  };

  const exportLogs = () => {
    const csvContent = 'data:text/csv;charset=utf-8,' +
      ['ID,Timestamp,Service,Level,Message']
        .concat(filteredLogs.map(l => `"${l.id}","${l.time}","${l.service}","${l.level}","${l.message.replace(/"/g, '""')}"`))
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `zenve-integration-logs-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setToast('Integration logs exported to CSV.');
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <DashboardLayout
      category="System Health"
      subcategory="Integration Logs"
      title="Integration Logs & Telemetry Stream"
      subtitle="Real-time multi-service diagnostic logs, webhook traces, ERP sync records & event audit stream"
      icon="📜"
      badge="Live Log Stream"
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={exportLogs}
            style={{
              padding: '7px 14px',
              borderRadius: '8px',
              background: '#ffffff',
              border: '1px solid var(--border, #cbd5e1)',
              color: 'var(--foreground, #334155)',
              fontWeight: 600,
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            📥 Export CSV
          </button>
          <button
            onClick={clearLogs}
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
            🔄 Refresh Stream
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
        <KpiCard label="Logs Ingested Today" value="48,120" delta="+8% volume" trend="up" subtext="No dropped events" icon="📜" />
        <KpiCard label="Warning Rate" value="0.04%" delta="Low threshold" trend="warn" subtext="12 non-critical warns" icon="⚠️" />
        <KpiCard label="Critical Errors" value="0 Errors" delta="100% clean" trend="up" subtext="Zero system halts" icon="🟢" />
        <KpiCard label="Log Retention SLA" value="90 Days" delta="Compliant" trend="up" subtext="Compressed archival" icon="🛡️" />
      </div>

      {/* Filters & Search */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
        alignItems: 'center',
        background: 'var(--card, #ffffff)',
        border: '1px solid var(--border, #e2e8f0)',
        borderRadius: '12px',
        padding: '14px 18px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
      }}>
        <input
          type="text"
          placeholder="Search logs by keyword, service or ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            minWidth: '220px',
            background: '#f8fafc',
            border: '1px solid var(--border, #e2e8f0)',
            borderRadius: '6px',
            padding: '7px 12px',
            color: 'var(--foreground, #0f172a)',
            fontSize: '13px',
            outline: 'none'
          }}
        />

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '11px', color: 'var(--muted-foreground, #64748b)', textTransform: 'uppercase', fontFamily: '"IBM Plex Mono", monospace' }}>Level:</span>
          {['ALL', 'INFO', 'WARN', 'ERROR'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setFilterLevel(lvl)}
              style={{
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer',
                background: filterLevel === lvl ? '#2563eb' : '#f8fafc',
                color: filterLevel === lvl ? '#ffffff' : 'var(--muted-foreground, #64748b)',
                border: filterLevel === lvl ? '1px solid #1d4ed8' : '1px solid var(--border, #e2e8f0)'
              }}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Logs Terminal Viewer */}
      <div style={{
        background: '#0f172a',
        border: '1px solid #1e293b',
        borderRadius: '12px',
        padding: '18px',
        fontFamily: '"IBM Plex Mono", monospace',
        fontSize: '12px',
        overflowX: 'auto',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: '12px', color: '#94a3b8', fontSize: '11px' }}>
          <span>● LIVE TELEMETRY LOG BUFFER ({filteredLogs.length} matching events)</span>
          <span>Timezone: Asia/Kolkata (IST)</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {filteredLogs.map((log) => (
            <div
              key={log.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '80px 70px 160px 1fr',
                gap: '12px',
                padding: '6px 8px',
                borderRadius: '4px',
                background: log.level === 'WARN' ? 'rgba(245, 158, 11, 0.12)' : 'transparent',
                borderLeft: log.level === 'WARN' ? '3px solid #f59e0b' : '3px solid #10b981'
              }}
            >
              <span style={{ color: '#94a3b8' }}>{log.time}</span>
              <span style={{
                color: log.level === 'INFO' ? '#34d399' : log.level === 'WARN' ? '#fbbf24' : '#f87171',
                fontWeight: 700
              }}>
                [{log.level}]
              </span>
              <span style={{ color: '#93c5fd', fontWeight: 600 }}>{log.service}</span>
              <span style={{ color: '#f1f5f9' }}>{log.message}</span>
            </div>
          ))}
          {filteredLogs.length === 0 && (
            <div style={{ padding: '24px', textAlign: 'center', color: '#64748b' }}>
              No log events match the current search query or filter.
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
