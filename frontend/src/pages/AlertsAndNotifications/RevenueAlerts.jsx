import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function RevenueAlerts() {
  const [alerts, setAlerts] = useState([
    {
      id: 'REV-201',
      title: 'Delhi NCR Weekend GMV Drop Alert (-14.2%)',
      channel: 'Quick-Commerce Mobile Apps (Android & iOS)',
      trigger: 'Pacing ₹3.8L below daily target of ₹26.5L',
      cause: 'Severe waterlogging in Gurgaon Hub reducing order radius from 5km to 2km',
      impact: '₹3,80,000 potential revenue shortfall',
      severity: 'Warning',
      time: '45m ago',
      status: 'Active'
    },
    {
      id: 'REV-202',
      title: 'Bravecto Flea & Tick Return Rate Surge (5.8%)',
      channel: 'Direct E-Commerce & Telehealth Dispatch',
      trigger: 'Return rate crossed safety threshold of 2.5%',
      cause: 'Pet parents selecting incorrect canine weight brackets on checkout page',
      impact: '₹1,42,000 in reverse logistics and opened pack write-downs',
      severity: 'High Warning',
      time: '2h ago',
      status: 'Action Underway'
    },
    {
      id: 'REV-203',
      title: 'Veterinary Dental & Scaling Revenue Deficit (-28%)',
      channel: 'Clinical Outpatient Services (Bengaluru & Mumbai)',
      trigger: 'Weekly bookings fell to 42 procedures (Target: 60)',
      cause: 'Diagnostic ultrasound room maintenance in Koramangala block',
      impact: '₹1,26,000 weekly high-margin clinical shortfall',
      severity: 'Warning',
      time: '4h ago',
      status: 'Active'
    },
    {
      id: 'REV-204',
      title: 'Meta Ads Customer Acquisition Cost (CAC) Spike',
      channel: 'Performance Marketing (Puppy Care Campaigns)',
      trigger: 'Blended CAC rose from ₹420 to ₹690 (+64%)',
      cause: 'Ad creative fatigue & high CPM bids during e-commerce festival week',
      impact: 'ROAS compressed from 3.2x to 1.8x on new user cohorts',
      severity: 'Info',
      time: '6h ago',
      status: 'Reviewed'
    },
    {
      id: 'REV-205',
      title: 'B2B Corporate Account Renewal Overdue: Infosys Pet Club',
      channel: 'B2B Corporate Wellness',
      trigger: 'Contract expiration in 4 days · ₹8.4L Annual ARR',
      cause: 'Corporate HR procurement awaiting updated billing schedule',
      impact: '₹8,40,000 annual recurring contract at risk',
      severity: 'High Warning',
      time: '8h ago',
      status: 'Active'
    }
  ]);

  const [toast, setToast] = useState('');

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleAction = (id, action) => {
    triggerToast(`Applied "${action}" to ${id}. Notification sent to Commercial Ops.`);
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'Mitigated' } : a));
  };

  return (
    <DashboardLayout
      category="Alerts & Notifications"
      subcategory="Revenue Alerts"
      title="Revenue Pacing & Margin Risk Alerts"
      subtitle="Automated commercial anomaly detection for sales drop-offs, return surges, CAC inflation, and high-value B2B accounts"
      icon="💼"
      badge="₹14.88L Value at Risk"
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => triggerToast('Commercial pacing report dispatched to Sales VP.')}
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
            📊 Pacing Briefing
          </button>
          <button
            onClick={() => triggerToast('Recalculated automated dynamic targets based on monsoon seasonality.')}
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
            Auto-Tune Thresholds
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
          label="Total Revenue at Risk"
          value="₹14.88 Lakhs"
          delta="4 active warnings"
          trend="down"
          subtext="GMV + CAC + Returns"
          icon="📉"
        />
        <KpiCard
          label="Target Attainment Gap"
          value="-4.8% MTD"
          delta="₹6.2L below target"
          trend="down"
          subtext="Delhi & Chennai hubs"
          icon="🎯"
        />
        <KpiCard
          label="Average Return Rate"
          value="3.1%"
          delta="+0.8% vs benchmark"
          trend="down"
          subtext="Threshold: 2.5%"
          icon="🔄"
        />
        <KpiCard
          label="High-Value Accounts Alert"
          value="1 B2B Account"
          delta="Infosys (₹8.4L)"
          trend="neutral"
          subtext="Renewal pending sign-off"
          icon="🏢"
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
          Commercial Revenue Anomalies & Pacing Warnings
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {alerts.map((a) => (
            <div
              key={a.id}
              style={{
                padding: '16px',
                borderRadius: '8px',
                background: 'rgba(0,0,0,0.15)',
                borderLeft: a.severity === 'High Warning' ? '4px solid #ef4444' : a.severity === 'Warning' ? '4px solid #f59e0b' : '4px solid #3b82f6',
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
                      background: a.severity === 'High Warning' ? 'rgba(239,68,68,0.2)' : 'rgba(245,158,11,0.2)',
                      color: a.severity === 'High Warning' ? '#ef4444' : '#f59e0b',
                      fontWeight: 600
                    }}>
                      {a.severity}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)', marginTop: '4px' }}>
                    Channel: <strong style={{ color: 'var(--foreground, #f8fafc)' }}>{a.channel}</strong> · Trigger: <span style={{ color: '#f87171' }}>{a.trigger}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)' }}>{a.time}</div>
                  <div style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    color: a.status === 'Mitigated' ? '#10b981' : '#f59e0b',
                    marginTop: '2px'
                  }}>
                    Status: {a.status}
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)', lineHeight: 1.5 }}>
                <div><strong>Root Cause:</strong> {a.cause}</div>
                <div><strong>Estimated Financial Exposure:</strong> <span style={{ color: '#fbbf24', fontWeight: 600 }}>{a.impact}</span></div>
              </div>

              {a.status !== 'Mitigated' && (
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', paddingTop: '4px' }}>
                  {a.id === 'REV-201' && (
                    <button
                      onClick={() => handleAction(a.id, 'Dynamic Rain Surcharge Waiver + Push Promo')}
                      style={{ padding: '6px 12px', borderRadius: '6px', background: 'var(--primary, #3b82f6)', color: '#fff', border: 'none', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Trigger Gurgaon Flash Recovery Promo
                    </button>
                  )}
                  {a.id === 'REV-202' && (
                    <button
                      onClick={() => handleAction(a.id, 'Mandatory Pet Weight Prompt at Checkout')}
                      style={{ padding: '6px 12px', borderRadius: '6px', background: 'var(--primary, #3b82f6)', color: '#fff', border: 'none', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Deploy Weight Verification Prompt
                    </button>
                  )}
                  {a.id === 'REV-205' && (
                    <button
                      onClick={() => handleAction(a.id, 'Dispatched Corporate Renewal Terms & SLA')}
                      style={{ padding: '6px 12px', borderRadius: '6px', background: '#10b981', color: '#fff', border: 'none', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Send 1-Click Renewal Contract
                    </button>
                  )}
                  <button
                    onClick={() => handleAction(a.id, 'Acknowledged & Logged to Revenue Ops')}
                    style={{ padding: '6px 12px', borderRadius: '6px', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border, rgba(255,255,255,0.1))', color: 'var(--foreground, #f8fafc)', fontSize: '11px', cursor: 'pointer' }}
                  >
                    Acknowledge Alert
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
