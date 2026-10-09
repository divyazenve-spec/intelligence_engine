import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function AlertRules() {
  const [rules, setRules] = useState([]);

  const [toast, setToast] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [newRule, setNewRule] = useState({
    name: '',
    category: 'Inventory',
    condition: '',
    severity: 'Warning (Sev-2)',
    escalation: '15 mins',
    cooldown: '15 mins'
  });

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleToggle = (id) => {
    setRules(prev => prev.map(r => {
      if (r.id === id) {
        const nextState = !r.enabled;
        triggerToast(`Rule "${r.name}" ${nextState ? 'Activated' : 'Paused'}.`);
        return { ...r, enabled: nextState };
      }
      return r;
    }));
  };

  const handleTest = (name) => {
    triggerToast(`Dispatched test event for "${name}" across all configured channels!`);
  };

  const handleCreateRule = (e) => {
    e.preventDefault();
    if (!newRule.name || !newRule.condition) return;
    const ruleObj = {
      id: `AR-${100 + rules.length + 1}`,
      name: newRule.name,
      category: newRule.category,
      condition: newRule.condition,
      severity: newRule.severity,
      channels: ['WhatsApp', 'Slack', 'Email'],
      escalation: newRule.escalation,
      cooldown: newRule.cooldown,
      enabled: true
    };
    setRules([ruleObj, ...rules]);
    setModalOpen(false);
    setNewRule({ name: '', category: 'Inventory', condition: '', severity: 'Warning (Sev-2)', escalation: '15 mins', cooldown: '15 mins' });
    triggerToast(`New Alert Rule "${ruleObj.name}" created and deployed!`);
  };

  return (
    <DashboardLayout
      category="Alerts & Notifications"
      subcategory="Alert Rules"
      title="Alert Rules Engine & Escalation Matrices"
      subtitle="Configure metric triggers, threshold conditions, multi-channel routing (WhatsApp, SMS, Slack, PagerDuty), and cooldown policies"
      icon="⚙️"
      badge=""
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
          <span>➕</span> Create New Alert Rule
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
        <KpiCard
          label="Total Deployed Rules"
          value="0 Rules"
          delta="0.0%"
          trend="neutral"
          subtext="0 active rules"
          icon="🛡️"
        />
        <KpiCard
          label="Critical (Sev-1) Rules"
          value="0 Rules"
          delta="0.0%"
          trend="neutral"
          subtext="0 Sev-1 rules"
          icon="🚨"
        />
        <KpiCard
          label="Multi-Channel Routing"
          value="0 Channels"
          delta="0.0%"
          trend="neutral"
          subtext="0 channels configured"
          icon="📱"
        />
        <KpiCard
          label="Avg Alert Resolution SLA"
          value="0 Mins"
          delta="0.0%"
          trend="neutral"
          subtext="0 mins SLA"
          icon="⏱️"
        />
      </div>

      {/* Rules Table */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>
          Configured Alert Rules & Escalation Policies
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {rules.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '36px', color: 'var(--muted-foreground, #94a3b8)', fontSize: '13px' }}>
              No alert rules configured. Click "Create New Alert Rule" to deploy automated monitoring triggers.
            </div>
          ) : (
            rules.map((r) => (
            <div
              key={r.id}
              style={{
                padding: '16px',
                borderRadius: '8px',
                background: r.enabled ? 'rgba(0,0,0,0.18)' : 'rgba(0,0,0,0.06)',
                border: '1px solid var(--border, rgba(255,255,255,0.08))',
                borderLeft: r.severity.includes('Sev-1') ? '4px solid #ef4444' : r.severity.includes('Sev-2') ? '4px solid #f59e0b' : '4px solid #3b82f6',
                opacity: r.enabled ? 1 : 0.65,
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
                      {r.id}
                    </span>
                    <span style={{ fontSize: '14px', fontWeight: 700 }}>{r.name}</span>
                    <span style={{
                      fontSize: '10px',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      background: r.severity.includes('Sev-1') ? 'rgba(239,68,68,0.2)' : 'rgba(245,158,11,0.2)',
                      color: r.severity.includes('Sev-1') ? '#ef4444' : '#f59e0b',
                      fontWeight: 600
                    }}>
                      {r.severity}
                    </span>
                    <span style={{
                      fontSize: '10px',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      background: 'rgba(59,130,246,0.15)',
                      color: '#60a5fa'
                    }}>
                      {r.category}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', marginTop: '6px', color: 'var(--muted-foreground, #94a3b8)' }}>
                    Trigger Condition: <strong style={{ color: 'var(--foreground, #f8fafc)', fontFamily: '"IBM Plex Mono", monospace' }}>{r.condition}</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button
                    onClick={() => handleToggle(r.id)}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '99px',
                      fontSize: '11px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      border: 'none',
                      background: r.enabled ? '#10b981' : '#64748b',
                      color: '#ffffff'
                    }}
                  >
                    {r.enabled ? '● Active' : '○ Paused'}
                  </button>
                  <button
                    onClick={() => handleTest(r.name)}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      cursor: 'pointer',
                      border: '1px solid var(--border, rgba(255,255,255,0.1))',
                      background: 'rgba(255,255,255,0.05)',
                      color: 'var(--foreground, #f8fafc)'
                    }}
                  >
                    ⚡ Test Trigger
                  </button>
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '8px',
                padding: '8px 12px',
                background: 'rgba(0,0,0,0.2)',
                borderRadius: '6px',
                fontSize: '11px'
              }}>
                <div>
                  <span style={{ color: 'var(--muted-foreground, #94a3b8)' }}>Routing Channels:</span>{' '}
                  <strong style={{ color: '#38bdf8' }}>{r.channels.join(' · ')}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--muted-foreground, #94a3b8)' }}>Escalation SLA:</span>{' '}
                  <strong>{r.escalation}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--muted-foreground, #94a3b8)' }}>Cooldown Window:</span>{' '}
                  <strong>{r.cooldown}</strong>
                </div>
              </div>
            </div>
          ))
          )}
        </div>
      </div>

      {/* Create New Rule Modal */}
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
            maxWidth: '520px',
            padding: '24px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>Add New Alert Rule</h3>
              <button
                onClick={() => setModalOpen(false)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '18px', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateRule} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Rule Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ICU Oxygen Cylinder Pressure Low"
                  value={newRule.name}
                  onChange={e => setNewRule({ ...newRule, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    background: 'rgba(0,0,0,0.2)',
                    border: '1px solid var(--border, rgba(255,255,255,0.1))',
                    color: '#fff',
                    fontSize: '13px'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Category</label>
                  <select
                    value={newRule.category}
                    onChange={e => setNewRule({ ...newRule, category: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      background: 'var(--card, #1e293b)',
                      border: '1px solid var(--border, rgba(255,255,255,0.1))',
                      color: '#fff',
                      fontSize: '13px'
                    }}
                  >
                    <option value="Critical">Critical Emergency</option>
                    <option value="Revenue">Revenue & Sales</option>
                    <option value="Inventory">Inventory & Stock</option>
                    <option value="Payment">Payment & Billing</option>
                    <option value="Order">Order & Logistics</option>
                    <option value="Finance">Finance & Taxes</option>
                    <option value="HR">HR & Staffing</option>
                    <option value="System">System & APIs</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Severity</label>
                  <select
                    value={newRule.severity}
                    onChange={e => setNewRule({ ...newRule, severity: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      background: 'var(--card, #1e293b)',
                      border: '1px solid var(--border, rgba(255,255,255,0.1))',
                      color: '#fff',
                      fontSize: '13px'
                    }}
                  >
                    <option value="Critical (Sev-1)">Critical (Sev-1)</option>
                    <option value="Warning (Sev-2)">Warning (Sev-2)</option>
                    <option value="Info (Sev-3)">Info (Sev-3)</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Trigger Condition</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tank Pressure < 20 PSI for > 1 min"
                  value={newRule.condition}
                  onChange={e => setNewRule({ ...newRule, condition: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    background: 'rgba(0,0,0,0.2)',
                    border: '1px solid var(--border, rgba(255,255,255,0.1))',
                    color: '#fff',
                    fontSize: '13px'
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '8px' }}>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  style={{ padding: '8px 14px', borderRadius: '6px', background: 'transparent', border: '1px solid var(--border, rgba(255,255,255,0.1))', color: '#fff', fontSize: '12px', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: '8px 16px', borderRadius: '6px', background: 'var(--primary, #3b82f6)', border: 'none', color: '#fff', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
                >
                  Save & Deploy Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
