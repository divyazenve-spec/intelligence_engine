import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function HRAlerts() {
  const [alerts, setAlerts] = useState([
    {
      id: 'HR-801',
      title: 'ICU Night-Shift Veterinary Nurse Staffing Deficit (-2 Staff)',
      department: 'Clinical Inpatient & ICU',
      facility: 'Koramangala 24/7 Super-Specialty Hospital',
      metric: 'Only 3 nurses confirmed for 8 PM shift (Minimum Safe Ratio: 5)',
      impact: 'Critical patient-to-nurse ratio breached for post-op ICU ward',
      severity: 'Critical',
      time: '25m ago',
      status: 'Active'
    },
    {
      id: 'HR-802',
      title: 'Emergency On-Call Veterinary Surgeon Absence',
      department: 'Veterinary Surgery & Trauma',
      facility: 'Mumbai Surgical Center (Bandra West)',
      metric: 'Dr. Rahul Mehta reported acute illness; no locum doctor assigned',
      impact: 'Trauma intake compromised between 10:00 PM and 6:00 AM',
      severity: 'Critical',
      time: '42m ago',
      status: 'Escalated'
    },
    {
      id: 'HR-803',
      title: 'Sales Pacing Under-Performance: Diagnostics & Lab Team (74%)',
      department: 'B2B & Diagnostics Field Sales',
      facility: 'All India Field Force (5 Reps lagging)',
      metric: 'Pacing at 74% attainment with only 5 days remaining in month',
      impact: 'Risk of missing quarterly lab testing revenue target by ₹4.2L',
      severity: 'High Warning',
      time: '2h ago',
      status: 'Active'
    },
    {
      id: 'HR-804',
      title: 'Veterinary Council of India (VCI) License Expiry Warning',
      department: 'Clinical Credentialing & Governance',
      facility: 'Delhi NCR Clinic (Dr. Aisha Khan)',
      metric: 'State veterinary practice license renewal due in 15 days',
      impact: 'Statutory compliance violation if practicing without renewed certificate',
      severity: 'Warning',
      time: '4h ago',
      status: 'Reminder Sent'
    },
    {
      id: 'HR-805',
      title: 'Excessive Overtime Alert: Koramangala Dark Store Fulfillment Crew',
      department: 'Supply Chain & Warehousing',
      facility: 'Koramangala Fulfillment Hub',
      metric: '6 pack associates exceeded 24 hours cumulative weekly overtime',
      impact: 'Burnout risk, fatigue errors, and statutory labor cap breach',
      severity: 'Info',
      time: '6h ago',
      status: 'Under Review'
    }
  ]);

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
      subcategory="HR Alerts"
      title="People, Clinical Roster & Credentialing Alerts"
      subtitle="Shift staffing shortages in ICU, on-call doctor emergency absences, sales quota deficits, and veterinary licensing renewals"
      icon="🧑‍💼"
      badge="2 Critical Staffing Alerts"
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => triggerToast('Locum emergency surgical doctor pool broadcasted with surge incentive bonus.')}
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
            🚨 Page Locum Surgeon
          </button>
          <button
            onClick={() => triggerToast('Automated WhatsApp license renewal wizard sent to Dr. Aisha Khan.')}
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
            📋 Send Renewal Wizard
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
          label="Shift Coverage Rate"
          value="93.8%"
          delta="2 Shifts understaffed"
          trend="down"
          subtext="ICU night shift alert"
          icon="🏥"
        />
        <KpiCard
          label="On-Call Specialist Roster"
          value="7/8 Active"
          delta="1 Vet Absence"
          trend="down"
          subtext="Mumbai Surgical Trauma"
          icon="👨‍⚕️"
        />
        <KpiCard
          label="Quota Lagging Personnel"
          value="5 Employees"
          delta="Pacing < 80%"
          trend="down"
          subtext="Diagnostics sales team"
          icon="🎯"
        />
        <KpiCard
          label="Credentialing Expirations"
          value="1 License"
          delta="Due in 15 days"
          trend="neutral"
          subtext="Dr. Aisha Khan (VCI)"
          icon="📜"
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
          Live Workforce Exceptions & Clinical Governance Alerts
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
                      {a.id}
                    </span>
                    <span style={{ fontSize: '14px', fontWeight: 700 }}>{a.title}</span>
                    <span style={{
                      fontSize: '10px',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      background: a.severity === 'Critical' ? 'rgba(239,68,68,0.2)' : a.severity === 'High Warning' ? 'rgba(249,115,22,0.2)' : 'rgba(245,158,11,0.2)',
                      color: a.severity === 'Critical' ? '#ef4444' : '#f59e0b',
                      fontWeight: 600
                    }}>
                      {a.severity}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)', marginTop: '4px' }}>
                    Department: <strong style={{ color: 'var(--foreground, #f8fafc)' }}>{a.department}</strong> · Facility: <span>{a.facility}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: a.severity === 'Critical' ? '#ef4444' : '#fbbf24' }}>
                    {a.metric}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)', marginTop: '2px' }}>
                    Status: <strong style={{ color: a.status === 'Resolved' ? '#10b981' : '#38bdf8' }}>{a.status}</strong>
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>
                <strong>Impact on Operations:</strong> {a.impact}
              </div>

              {a.status !== 'Resolved' && (
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', paddingTop: '4px' }}>
                  {a.id === 'HR-801' && (
                    <button
                      onClick={() => handleAction(a.id, 'Dispatched urgent nurse pool call to 4 off-duty nurses with 1.5x shift pay')}
                      style={{ padding: '6px 14px', borderRadius: '6px', background: '#ef4444', color: '#fff', border: 'none', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Broadcast Shift Call (+1.5x Pay)
                    </button>
                  )}
                  {a.id === 'HR-802' && (
                    <button
                      onClick={() => handleAction(a.id, 'Dr. Arvind Swaminathan confirmed coverage for Mumbai trauma call')}
                      style={{ padding: '6px 14px', borderRadius: '6px', background: '#10b981', color: '#fff', border: 'none', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Assign Standby Surgeon
                    </button>
                  )}
                  <button
                    onClick={() => handleAction(a.id, 'Acknowledged')}
                    style={{ padding: '6px 12px', borderRadius: '6px', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border, rgba(255,255,255,0.1))', color: 'var(--foreground, #f8fafc)', fontSize: '11px', cursor: 'pointer' }}
                  >
                    Acknowledge
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
