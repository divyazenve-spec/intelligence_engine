import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function AlertsDashboard() {
  const alerts = [
    { title: 'Low Stock Alert: Royal Canin Puppy Diet', desc: '14 units remaining in Bengaluru Central Hub. Reorder threshold is 25 units.', severity: 'Warning', time: '2h ago' },
    { title: 'Payment Overdue: PetCare Clinic Network', desc: 'Outstanding invoice ₹1,20,000 has passed the 30-day payment SLA window.', severity: 'Urgent', time: '4h ago' },
    { title: 'Flea & Tick Return Rate Alert', desc: 'Bravecto returns rose to 5.2% over the weekend due to wrong weight sizing orders.', severity: 'Info', time: '6h ago' },
    { title: 'Employee Target Alert: Diagnostics & Lab', desc: 'Diagnostics quota attainment fell below 85% for the current pacing period.', severity: 'Warning', time: '8h ago' }
  ];

  return (
    <DashboardLayout
      category="Alerts & Notifications"
      subcategory="Critical Alerts & Notification Center"
      title="Alert Center & Event Notifications"
      subtitle="Automated inventory triggers, financial aging alerts, delivery exceptions, and quota alerts"
      icon="🔔"
      badge="4 Unresolved"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Active Alerts" value="4 Triggers" delta="2 warnings" trend="down" subtext="Requiring review" icon="🔔" />
        <KpiCard label="Resolved Today" value="18 Alerts" delta="100% resolved" trend="up" subtext="Automated workflows" icon="✅" />
        <KpiCard label="Critical Incidents" value="0 Zero" delta="Clean record" trend="up" subtext="Zero system outage" icon="🛡️" />
        <KpiCard label="Notification Channels" value="4 Active" delta="Slack, WA, Email" trend="neutral" subtext="Multi-channel alerts" icon="📱" />
      </div>

      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>Unresolved System & Operational Alerts</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {alerts.map((a) => (
            <div key={a.title} style={{
              padding: '12px 16px',
              borderRadius: '8px',
              background: 'rgba(0,0,0,0.15)',
              borderLeft: a.severity === 'Urgent' ? '3px solid #ef4444' : a.severity === 'Warning' ? '3px solid #f59e0b' : '3px solid #3b82f6',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '12px'
            }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>{a.title}</span>
                  <span style={{
                    fontSize: '10px',
                    padding: '1px 6px',
                    borderRadius: '4px',
                    background: a.severity === 'Urgent' ? 'rgba(239,68,68,0.2)' : a.severity === 'Warning' ? 'rgba(245,158,11,0.2)' : 'rgba(59,130,246,0.2)',
                    color: a.severity === 'Urgent' ? '#ef4444' : a.severity === 'Warning' ? '#f59e0b' : '#3b82f6'
                  }}>{a.severity}</span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)', marginTop: '4px' }}>{a.desc}</div>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)', whiteSpace: 'nowrap' }}>{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
