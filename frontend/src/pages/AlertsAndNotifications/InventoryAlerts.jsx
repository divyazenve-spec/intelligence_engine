import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function InventoryAlerts() {
  const [alerts, setAlerts] = useState([]);

  const [toast, setToast] = useState('');

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleResolve = (id, act) => {
    triggerToast(`Action executed: "${act}" for SKU alert ${id}.`);
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'Resolved' } : a));
  };

  return (
    <DashboardLayout
      category="Alerts & Notifications"
      subcategory="Inventory Alerts"
      title="Inventory & Cold-Chain Stock Alerts"
      subtitle="Stockout early-warning system, near-expiry pharmaceutical batches, cold-chain telemetry, and negative physical audit variances"
      icon="📦"
      badge=""
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => triggerToast('Generated automated Purchase Orders for 4 low-stock SKUs.')}
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
            📋 Auto-Generate POs
          </button>
          <button
            onClick={() => triggerToast('Inter-hub replenishment truck scheduled from Bhiwandi to Bengaluru.')}
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
            🚚 Expedite Transfers
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
          label="SKUs Below Reorder Point"
          value="14 SKUs"
          delta="2 Stockout Critical"
          trend="down"
          subtext="Requires instant PO"
          icon="⚠️"
        />
        <KpiCard
          label="Near-Expiry Valuation (<30d)"
          value="₹0"
          delta="4 Pharmaceutical Batches"
          trend="down"
          subtext="Clearance discount active"
          icon="⏳"
        />
        <KpiCard
          label="Cold-Chain Temperature SLA"
          value="0.0%"
          delta="+2°C to +8°C compliant"
          trend="up"
          subtext="IoT telemetry live"
          icon="❄️"
        />
        <KpiCard
          label="Capital Trapped in Slow-Moving"
          value="₹0"
          delta="DSI > 120 Days"
          trend="neutral"
          subtext="Monsoon fashion & gear"
          icon="🧊"
        />
      </div>

      {/* Alerts Table */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>
          Live SKU Stock Triggers & Expiry Exceptions
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
                      {a.sku}
                    </span>
                    <span style={{ fontSize: '14px', fontWeight: 700 }}>{a.title}</span>
                    <span style={{
                      fontSize: '10px',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      background: a.severity === 'Critical' ? 'rgba(239,68,68,0.2)' : a.severity === 'High Warning' ? 'rgba(249,115,22,0.2)' : 'rgba(245,158,11,0.2)',
                      color: a.severity === 'Critical' ? '#ef4444' : a.severity === 'High Warning' ? '#f97316' : '#f59e0b',
                      fontWeight: 600
                    }}>
                      {a.severity}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)', marginTop: '4px' }}>
                    Location: <strong style={{ color: 'var(--foreground, #f8fafc)' }}>{a.hub}</strong> · Burn Rate: <strong>{a.burnRate}</strong>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: a.severity === 'Critical' ? '#ef4444' : '#f59e0b' }}>
                    {a.estStockout}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)', marginTop: '2px' }}>
                    Status: <strong style={{ color: a.status === 'Resolved' ? '#10b981' : '#38bdf8' }}>{a.status}</strong>
                  </div>
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '10px',
                padding: '10px',
                background: 'rgba(0,0,0,0.2)',
                borderRadius: '6px',
                fontSize: '12px'
              }}>
                <div>Current Stock: <strong style={{ color: a.currentStock <= a.safetyStock ? '#ef4444' : '#10b981' }}>{a.currentStock} units</strong></div>
                <div>Safety Stock Threshold: <strong>{a.safetyStock} units</strong></div>
                <div style={{ gridColumn: '1 / -1', color: '#38bdf8' }}>
                  Recommended Action: <strong>{a.action}</strong>
                </div>
              </div>

              {a.status !== 'Resolved' && (
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', paddingTop: '4px' }}>
                  <button
                    onClick={() => handleResolve(a.id, a.action)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '6px',
                      background: 'var(--primary, #3b82f6)',
                      border: 'none',
                      color: '#ffffff',
                      fontSize: '11px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Execute Recommended Action
                  </button>
                  <button
                    onClick={() => handleResolve(a.id, 'Snoozed for 4 hours')}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '6px',
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid var(--border, rgba(255,255,255,0.1))',
                      color: 'var(--foreground, #f8fafc)',
                      fontSize: '11px',
                      cursor: 'pointer'
                    }}
                  >
                    Snooze (4h)
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
