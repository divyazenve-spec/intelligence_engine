import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';
import CriticalAlerts from './CriticalAlerts';
import RevenueAlerts from './RevenueAlerts';
import InventoryAlerts from './InventoryAlerts';
import PaymentAlerts from './PaymentAlerts';
import OrderAlerts from './OrderAlerts';
import DeliveryAlerts from './DeliveryAlerts';
import FinanceAlerts from './FinanceAlerts';
import HRAlerts from './HRAlerts';
import SystemAlerts from './SystemAlerts';
import AlertRules from './AlertRules';
import NotificationCenter from './NotificationCenter';

export default function AlertsDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [toast, setToast] = useState('');

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const tabs = [
    { id: 'overview', label: 'Overview Control Center', icon: '🎛️' },
    { id: 'critical', label: 'Critical Alerts', icon: '🚨', badge: '4' },
    { id: 'revenue', label: 'Revenue Alerts', icon: '💼', badge: '5' },
    { id: 'inventory', label: 'Inventory Alerts', icon: '📦', badge: '5' },
    { id: 'payment', label: 'Payment Alerts', icon: '💳', badge: '5' },
    { id: 'order', label: 'Order Alerts', icon: '🚚', badge: '5' },
    { id: 'delivery', label: 'Delivery Alerts', icon: '⚡', badge: '5' },
    { id: 'finance', label: 'Finance Alerts', icon: '💰', badge: '5' },
    { id: 'hr', label: 'HR Alerts', icon: '🧑‍💼', badge: '5' },
    { id: 'system', label: 'System Alerts', icon: '🖥️', badge: '5' },
    { id: 'rules', label: 'Alert Rules', icon: '⚙️', badge: '8 Rules' },
    { id: 'notifs', label: 'Notification Center', icon: '🔔', badge: '3 Unread' }
  ];

  const recentIncidents = [
    { id: 'CRIT-101', cat: 'Critical', title: 'Vaccine Cold-Chain Breach (+8.6°C)', hub: 'Bengaluru Central Cold Depot', time: '12m ago', severity: 'Critical' },
    { id: 'ORD-501', cat: 'Order', title: 'Rx Verification Queue Overload (28 orders)', hub: 'Telehealth Rx Node', time: '14m ago', severity: 'High' },
    { id: 'PAY-401', cat: 'Payment', title: 'Razorpay UPI Failure Rate Surge (4.8%)', hub: 'Core Payment Gateway', time: '15m ago', severity: 'Critical' },
    { id: 'DEL-601', cat: 'Delivery', title: '60-Min SLA Risk: Order #ZV-98214', hub: 'HSR Layout Zone', time: '18m ago', severity: 'Critical' },
    { id: 'HR-801', cat: 'HR', title: 'ICU Night-Shift Nurse Staffing Deficit (-2 Staff)', hub: 'Koramangala Hospital ICU', time: '25m ago', severity: 'Critical' },
    { id: 'REV-201', cat: 'Revenue', title: 'Delhi NCR Weekend GMV Drop (-14.2%)', hub: 'Gurgaon Micro-Hub', time: '45m ago', severity: 'Warning' }
  ];

  return (
    <div style={{ width: '100%' }}>
      {/* Top Tab Switcher */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 20,
        background: 'var(--background, #0f172a)',
        borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        overflowX: 'auto',
        whiteSpace: 'nowrap',
        scrollbarWidth: 'none'
      }}>
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{
              padding: '7px 14px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              border: activeTab === t.id ? '1px solid var(--primary, #3b82f6)' : '1px solid var(--border, rgba(255,255,255,0.08))',
              background: activeTab === t.id ? 'var(--primary, #3b82f6)' : 'var(--card, #1e293b)',
              color: activeTab === t.id ? '#ffffff' : 'var(--muted-foreground, #94a3b8)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.15s ease'
            }}
          >
            <span>{t.icon}</span>
            <span>{t.label}</span>
            {t.badge && (
              <span style={{
                fontSize: '10px',
                padding: '1px 6px',
                borderRadius: '99px',
                background: activeTab === t.id ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.08)',
                color: activeTab === t.id ? '#ffffff' : 'var(--foreground, #f8fafc)'
              }}>
                {t.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {toast && (
        <div style={{
          margin: '16px 24px 0',
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

      {/* Render Component Based on Active Tab */}
      {activeTab === 'critical' && <CriticalAlerts />}
      {activeTab === 'revenue' && <RevenueAlerts />}
      {activeTab === 'inventory' && <InventoryAlerts />}
      {activeTab === 'payment' && <PaymentAlerts />}
      {activeTab === 'order' && <OrderAlerts />}
      {activeTab === 'delivery' && <DeliveryAlerts />}
      {activeTab === 'finance' && <FinanceAlerts />}
      {activeTab === 'hr' && <HRAlerts />}
      {activeTab === 'system' && <SystemAlerts />}
      {activeTab === 'rules' && <AlertRules />}
      {activeTab === 'notifs' && <NotificationCenter />}

      {activeTab === 'overview' && (
        <DashboardLayout
          category="Alerts & Notifications"
          subcategory="Executive Overview"
          title="Alerts & Notifications Control Center"
          subtitle="Unified multi-domain command center aggregating Critical, Revenue, Inventory, Payment, Order, Delivery, Finance, HR, and System telemetry"
          icon="🔔"
          badge="Live Paging Active"
          actions={
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => triggerToast('Emergency Incident Commander roster verified & standby confirmed.')}
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
                🚨 Emergency Protocol
              </button>
              <button
                onClick={() => triggerToast('All pending warning alerts acknowledged.')}
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
                ✓ Acknowledge All
              </button>
            </div>
          }
        >
          {/* Executive KPI Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
            <KpiCard
              label="Active Critical Alerts (Sev-1)"
              value="4 Emergencies"
              delta="2 Hospital ICU"
              trend="down"
              subtext="Immediate response"
              icon="🚨"
            />
            <KpiCard
              label="Active Warning Alerts (Sev-2)"
              value="12 Warnings"
              delta="Stock, SLA, Collections"
              trend="neutral"
              subtext="Escalating within 1h"
              icon="⚠️"
            />
            <KpiCard
              label="Total Resolved Today"
              value="38 Alerts"
              delta="100% resolved"
              trend="up"
              subtext="Mean resolution 14m"
              icon="✅"
            />
            <KpiCard
              label="Multi-Channel Delivery Health"
              value="99.9%"
              delta="1,420 notifications"
              trend="up"
              subtext="WhatsApp, Slack, SMS"
              icon="📱"
            />
          </div>

          {/* Category Distribution Grid */}
          <div style={{
            background: 'var(--card, #1e293b)',
            border: '1px solid var(--border, rgba(255,255,255,0.08))',
            borderRadius: '12px',
            padding: '20px'
          }}>
            <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>
              Telemetry Domains & Category Alert Counts
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px' }}>
              {[
                { title: 'Critical Alerts', icon: '🚨', count: '4 Active', color: '#ef4444', tab: 'critical' },
                { title: 'Revenue Alerts', icon: '💼', count: '5 Active', color: '#f59e0b', tab: 'revenue' },
                { title: 'Inventory Alerts', icon: '📦', count: '5 Active', color: '#f59e0b', tab: 'inventory' },
                { title: 'Payment Alerts', icon: '💳', count: '5 Active', color: '#ef4444', tab: 'payment' },
                { title: 'Order Alerts', icon: '🚚', count: '5 Active', color: '#3b82f6', tab: 'order' },
                { title: 'Delivery Alerts', icon: '⚡', count: '5 Active', color: '#ef4444', tab: 'delivery' },
                { title: 'Finance Alerts', icon: '💰', count: '5 Active', color: '#f59e0b', tab: 'finance' },
                { title: 'HR Alerts', icon: '🧑‍💼', count: '5 Active', color: '#ef4444', tab: 'hr' },
                { title: 'System Alerts', icon: '🖥️', count: '5 Active', color: '#3b82f6', tab: 'system' },
                { title: 'Alert Rules', icon: '⚙️', count: '8 Rules', color: '#10b981', tab: 'rules' },
                { title: 'Notification Center', icon: '🔔', count: '3 Unread', color: '#8b5cf6', tab: 'notifs' }
              ].map(cat => (
                <div
                  key={cat.title}
                  onClick={() => setActiveTab(cat.tab)}
                  style={{
                    padding: '14px',
                    borderRadius: '8px',
                    background: 'rgba(0,0,0,0.18)',
                    border: '1px solid var(--border, rgba(255,255,255,0.06))',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '18px' }}>{cat.icon}</span>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: cat.color }}>{cat.count}</span>
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 600 }}>{cat.title}</div>
                  <div style={{ fontSize: '11px', color: '#38bdf8' }}>View Dashboard →</div>
                </div>
              ))}
            </div>
          </div>

          {/* Real-Time Live Feed */}
          <div style={{
            background: 'var(--card, #1e293b)',
            border: '1px solid var(--border, rgba(255,255,255,0.08))',
            borderRadius: '12px',
            padding: '20px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>
                High-Priority Unified Alert Stream
              </h3>
              <span style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)' }}>Auto-updating live</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {recentIncidents.map((inc) => (
                <div
                  key={inc.id}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '8px',
                    background: 'rgba(0,0,0,0.15)',
                    borderLeft: inc.severity === 'Critical' ? '4px solid #ef4444' : '4px solid #f59e0b',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{
                        fontFamily: '"IBM Plex Mono", monospace',
                        fontSize: '10px',
                        fontWeight: 700,
                        background: 'rgba(255,255,255,0.06)',
                        padding: '1px 5px',
                        borderRadius: '4px'
                      }}>
                        {inc.id}
                      </span>
                      <span style={{ fontSize: '13px', fontWeight: 700 }}>{inc.title}</span>
                      <span style={{
                        fontSize: '9px',
                        padding: '1px 6px',
                        borderRadius: '4px',
                        background: inc.severity === 'Critical' ? 'rgba(239,68,68,0.2)' : 'rgba(245,158,11,0.2)',
                        color: inc.severity === 'Critical' ? '#ef4444' : '#f59e0b',
                        fontWeight: 600
                      }}>
                        {inc.severity}
                      </span>
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)', marginTop: '4px' }}>
                      Hub: <strong style={{ color: 'var(--foreground, #f8fafc)' }}>{inc.hub}</strong> · Category: {inc.cat}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)', whiteSpace: 'nowrap' }}>{inc.time}</span>
                    <button
                      onClick={() => triggerToast(`Action assigned to Incident Lead for ${inc.id}`)}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid var(--border, rgba(255,255,255,0.1))',
                        color: 'var(--foreground, #f8fafc)',
                        fontSize: '11px',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Acknowledge
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DashboardLayout>
      )}
    </div>
  );
}
