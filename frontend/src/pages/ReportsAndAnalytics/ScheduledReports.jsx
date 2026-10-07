import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function ScheduledReports() {
  const [schedules, setSchedules] = useState([]);

  const [toast, setToast] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    name: '',
    freq: 'Daily at 08:00 AM',
    format: 'CSV',
    recipients: '',
    channel: 'Email'
  });

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleToggle = (id) => {
    setSchedules(prev => prev.map(s => {
      if (s.id === id) {
        const nextState = s.status === 'Active' ? 'Paused' : 'Active';
        triggerToast(`Schedule "${s.name}" is now ${nextState}.`);
        return { ...s, status: nextState };
      }
      return s;
    }));
  };

  const handleRunNow = (name) => {
    triggerToast(`Dispatched on-demand execution for "${name}". Notification sent.`);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newSchedule.name || !newSchedule.recipients) return;
    const scheduleObj = {
      id: `SCH-${100 + schedules.length + 1}`,
      name: newSchedule.name,
      freq: newSchedule.freq,
      format: newSchedule.format,
      recipients: newSchedule.recipients,
      channel: newSchedule.channel,
      status: 'Active',
      lastRun: 'Scheduled for Next Interval'
    };
    setSchedules([scheduleObj, ...schedules]);
    setModalOpen(false);
    setNewSchedule({ name: '', freq: 'Daily at 08:00 AM', format: 'CSV', recipients: '', channel: 'Email' });
    triggerToast(`Automated report schedule "${scheduleObj.name}" created!`);
  };

  return (
    <DashboardLayout
      category="Reports & Analytics"
      subcategory="Scheduled Reports"
      title="Automated Intelligence Reports & Cron Dispatcher"
      subtitle="Configure recurring automated PDF, CSV, and XLSX dispatch schedules delivered to executive email inboxes, Slack webhooks, and secure audit vaults"
      icon="⏰"
      badge={`${schedules.filter(s => s.status === 'Active').length} Active Cron Schedules`}
      actions={
        <button
          onClick={() => setModalOpen(true)}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            background: 'var(--primary, #3b82f6)',
            color: '#ffffff',
            border: 'none',
            fontWeight: 600,
            fontSize: '12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <span>➕</span> New Automated Schedule
        </button>
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
        <KpiCard label="Active Automated Jobs" value={`${schedules.filter(s => s.status === 'Active').length} Jobs`} delta="100% on-time execution" trend="up" subtext="Cron scheduler live" icon="⏰" />
        <KpiCard label="Daily Email Dispatches" value="142 Deliveries" delta="Zero bounce rate" trend="up" subtext="Corporate domain" icon="📬" />
        <KpiCard label="Slack Leadership Alerts" value="4 Channels" delta="#exec, #fleet, #pharma" trend="neutral" subtext="Encrypted webhooks" icon="💬" />
        <KpiCard label="Audit Compliance Log" value="SOC-2 Standard" delta="Every export hashed" trend="up" subtext="SHA-256 fingerprint" icon="🛡️" />
      </div>

      {/* Schedules Table */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>Active Scheduled Report Dispatches</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {schedules.map((s) => (
            <div
              key={s.id}
              style={{
                padding: '16px',
                borderRadius: '8px',
                background: s.status === 'Active' ? 'rgba(0,0,0,0.18)' : 'rgba(0,0,0,0.06)',
                border: '1px solid var(--border, rgba(255,255,255,0.08))',
                borderLeft: s.status === 'Active' ? '4px solid #10b981' : '4px solid #64748b',
                opacity: s.status === 'Active' ? 1 : 0.65,
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px', fontWeight: 700, background: 'rgba(255,255,255,0.06)', padding: '2px 6px', borderRadius: '4px' }}>
                      {s.id}
                    </span>
                    <span style={{ fontSize: '14px', fontWeight: 700 }}>{s.name}</span>
                    <span style={{
                      fontSize: '10px',
                      padding: '2px 8px',
                      borderRadius: '99px',
                      background: s.status === 'Active' ? 'rgba(16,185,129,0.15)' : 'rgba(100,116,139,0.2)',
                      color: s.status === 'Active' ? '#34d399' : '#94a3b8',
                      fontWeight: 700
                    }}>
                      {s.status}
                    </span>
                    <span style={{ fontSize: '11px', padding: '2px 6px', borderRadius: '4px', background: 'rgba(59,130,246,0.15)', color: '#60a5fa' }}>
                      {s.format}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', marginTop: '6px', color: 'var(--muted-foreground, #94a3b8)' }}>
                    Frequency: <strong style={{ color: 'var(--foreground, #f8fafc)' }}>{s.freq}</strong> · Channel: <strong style={{ color: '#38bdf8' }}>{s.channel}</strong>
                  </div>
                  <div style={{ fontSize: '12px', marginTop: '2px', color: 'var(--muted-foreground, #94a3b8)' }}>
                    Recipients: <span>{s.recipients}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    onClick={() => handleRunNow(s.name)}
                    style={{
                      padding: '5px 12px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      border: '1px solid var(--border, rgba(255,255,255,0.1))',
                      background: 'rgba(255,255,255,0.05)',
                      color: 'var(--foreground, #f8fafc)'
                    }}
                  >
                    ⚡ Run Dispatch Now
                  </button>
                  <button
                    onClick={() => handleToggle(s.id)}
                    style={{
                      padding: '5px 12px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      border: 'none',
                      background: s.status === 'Active' ? '#ef4444' : '#10b981',
                      color: '#ffffff'
                    }}
                  >
                    {s.status === 'Active' ? 'Pause' : 'Resume'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          display: 'grid',
          placeItems: 'center',
          zIndex: 100,
          padding: '16px'
        }}>
          <div style={{
            background: 'var(--card, #1e293b)',
            border: '1px solid var(--border, rgba(255,255,255,0.12))',
            borderRadius: '12px',
            width: '100%',
            maxWidth: '500px',
            padding: '24px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>Create Automated Schedule</h3>
              <button onClick={() => setModalOpen(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '18px', cursor: 'pointer' }}>✕</button>
            </div>

            <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Report Schedule Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Weekly Clinical Inventory Audit"
                  value={newSchedule.name}
                  onChange={e => setNewSchedule({ ...newSchedule, name: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border, rgba(255,255,255,0.1))', color: '#fff', fontSize: '13px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Frequency</label>
                  <select
                    value={newSchedule.freq}
                    onChange={e => setNewSchedule({ ...newSchedule, freq: e.target.value })}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', background: 'var(--card, #1e293b)', border: '1px solid var(--border, rgba(255,255,255,0.1))', color: '#fff', fontSize: '13px' }}
                  >
                    <option>Daily at 07:00 AM</option>
                    <option>Daily at 11:30 PM</option>
                    <option>Weekly on Monday</option>
                    <option>Bi-Weekly</option>
                    <option>1st of every Month</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>File Format</label>
                  <select
                    value={newSchedule.format}
                    onChange={e => setNewSchedule({ ...newSchedule, format: e.target.value })}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', background: 'var(--card, #1e293b)', border: '1px solid var(--border, rgba(255,255,255,0.1))', color: '#fff', fontSize: '13px' }}
                  >
                    <option>CSV Spreadsheet</option>
                    <option>Executive PDF</option>
                    <option>Excel (.xlsx)</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Recipients (Comma Separated)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. cfo@zenve.in, priya.sharma@zenve.in"
                  value={newSchedule.recipients}
                  onChange={e => setNewSchedule({ ...newSchedule, recipients: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border, rgba(255,255,255,0.1))', color: '#fff', fontSize: '13px' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '8px' }}>
                <button type="button" onClick={() => setModalOpen(false)} style={{ padding: '8px 14px', borderRadius: '6px', background: 'transparent', border: '1px solid var(--border, rgba(255,255,255,0.1))', color: '#fff', fontSize: '12px', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ padding: '8px 16px', borderRadius: '6px', background: 'var(--primary, #3b82f6)', border: 'none', color: '#fff', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>Save & Activate Schedule</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
