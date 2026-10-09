import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function PaymentAlerts() {
  const [alerts, setAlerts] = useState([]);

  const [toast, setToast] = useState('');

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleAction = (id, act) => {
    triggerToast(`Action "${act}" executed for ${id}.`);
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'Resolved' } : a));
  };

  return (
    <DashboardLayout
      category="Alerts & Notifications"
      subcategory="Payment Alerts"
      title="Payment Gateways & Collections Alerts"
      subtitle="Monitoring UPI success rates, B2B aging receivables, payout float balances, chargebacks, and veterinary doctor commissions"
      icon="💳"
      badge=""
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => triggerToast('Automated failover: Switched 60% of checkout UPI traffic to Cashfree gateway.')}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              background: '#ef4444',
              color: '#ffffff',
              border: 'none',
              fontWeight: 600,
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            ⚡ Failover Gateway
          </button>
          <button
            onClick={() => triggerToast('Auto-dunning WhatsApp reminder sent to overdue B2B clinics.')}
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
            📩 Send Dunning Reminders
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
          label="Gateway Uptime (Razorpay)"
          value="0.0%"
          delta="0.0%"
          trend="neutral"
          subtext="0 downtime incidents"
          icon="⚡"
        />
        <KpiCard
          label="Overdue B2B Receivables"
          value="₹0"
          delta="0.0%"
          trend="neutral"
          subtext="₹0 overdue"
          icon="📑"
        />
        <KpiCard
          label="Instant Refund Balance"
          value="₹0"
          delta="0.0%"
          trend="neutral"
          subtext="₹0 float balance"
          icon="🏦"
        />
        <KpiCard
          label="Pending Vet Commissions"
          value="₹0"
          delta="0.0%"
          trend="neutral"
          subtext="₹0 pending"
          icon="👨‍⚕️"
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
          Payment Gateway Disruptions & Collection Aging Alerts
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {alerts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '36px', color: 'var(--muted-foreground, #94a3b8)', fontSize: '13px' }}>
              No payment gateway disruptions or collection aging alerts detected.
            </div>
          ) : (
            alerts.map((a) => (
            <div
              key={a.id}
              style={{
                padding: '16px',
                borderRadius: '8px',
                background: a.status === 'Resolved' ? 'rgba(16,185,129,0.05)' : 'rgba(0,0,0,0.15)',
                borderLeft: a.severity === 'Critical' ? '4px solid #ef4444' : a.severity === 'High Warning' ? '4px solid #f97316' : '4px solid #f59e0b',
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
                      background: a.severity === 'Critical' ? 'rgba(239,68,68,0.2)' : 'rgba(245,158,11,0.2)',
                      color: a.severity === 'Critical' ? '#ef4444' : '#f59e0b',
                      fontWeight: 600
                    }}>
                      {a.severity}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)', marginTop: '4px' }}>
                    Channel: <strong style={{ color: 'var(--foreground, #f8fafc)' }}>{a.gateway}</strong> · Root Cause: <span>{a.rootCause}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#fbbf24' }}>{a.impact}</div>
                  <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)', marginTop: '2px' }}>
                    Status: <strong style={{ color: a.status === 'Resolved' ? '#10b981' : '#38bdf8' }}>{a.status}</strong>
                  </div>
                </div>
              </div>

              {a.status !== 'Resolved' && (
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', paddingTop: '4px' }}>
                  {a.id === 'PAY-401' && (
                    <button
                      onClick={() => handleAction(a.id, 'Rerouted 60% traffic to Cashfree')}
                      style={{ padding: '6px 14px', borderRadius: '6px', background: '#ef4444', color: '#fff', border: 'none', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Instant Gateway Failover
                    </button>
                  )}
                  {a.id === 'PAY-402' && (
                    <button
                      onClick={() => handleAction(a.id, 'WhatsApp Dunning with instant UPI payment link sent')}
                      style={{ padding: '6px 14px', borderRadius: '6px', background: 'var(--primary, #3b82f6)', color: '#fff', border: 'none', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Trigger Automated Dunning Notice
                    </button>
                  )}
                  {a.id === 'PAY-404' && (
                    <button
                      onClick={() => handleAction(a.id, 'CFO One-Touch Biometric Sign-off Verified')}
                      style={{ padding: '6px 14px', borderRadius: '6px', background: '#10b981', color: '#fff', border: 'none', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Approve Doctor Batch Payout
                    </button>
                  )}
                  <button
                    onClick={() => handleAction(a.id, 'Acknowledged & Escalated to Accounts')}
                    style={{ padding: '6px 12px', borderRadius: '6px', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border, rgba(255,255,255,0.1))', color: 'var(--foreground, #f8fafc)', fontSize: '11px', cursor: 'pointer' }}
                  >
                    Acknowledge
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
