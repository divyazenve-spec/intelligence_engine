import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function LeaveManagement() {
  const [activeTab, setActiveTab] = useState('pending');

  const [leaveRequests, setLeaveRequests] = useState([]);

  const holidays = [];

  function handleAction(id, newStatus) {
    setLeaveRequests(leaveRequests.map(lr => lr.id === id ? { ...lr, status: newStatus } : lr));
  }

  const filteredRequests = leaveRequests.filter(lr => activeTab === 'all' || lr.status.toLowerCase() === activeTab);

  return (
    <DashboardLayout
      category="Employees & HR"
      subcategory="Leave Management"
      title="Time-Off Governance & Leave Requests"
      subtitle="Paid Time Off (PTO), sick leaves, casual leaves, compensatory offs, and public holiday calendars"
      icon="🏖️"
      badge=""
    >
      {/* Top Level KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Currently on Leave" value="0" delta="0.0%" trend="neutral" subtext="All roles covered by backup" icon="🏖️" />
        <KpiCard label="Pending Approval Queue" value="0" delta="--" trend="neutral" subtext="Standard response time" icon="⏳" />
        <KpiCard label="Avg Org PTO Balance" value="0 Days" delta="--" trend="neutral" subtext="Prevents year-end encashment spike" icon="📅" />
        <KpiCard label="Upcoming Public Holidays" value="0" delta="--" trend="neutral" subtext="Hospital rosters planned" icon="🎉" />
      </div>

      {/* Leave Approval Ledger */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        overflow: 'hidden'
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Leave Application Ledger</h3>
            <div style={{ display: 'flex', gap: '4px', marginLeft: '12px' }}>
              {['pending', 'approved', 'all'].map(t => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: 600,
                    textTransform: 'capitalize',
                    border: '1px solid',
                    borderColor: activeTab === t ? '#3b82f6' : 'rgba(255,255,255,0.1)',
                    background: activeTab === t ? '#3b82f6' : 'transparent',
                    color: activeTab === t ? '#fff' : 'var(--muted-foreground, #94a3b8)',
                    cursor: 'pointer'
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <span style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)' }}>Manager Workflow Queue</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)', color: 'var(--muted-foreground, #94a3b8)' }}>
                <th style={{ padding: '12px 16px' }}>Request ID</th>
                <th style={{ padding: '12px 16px' }}>Employee</th>
                <th style={{ padding: '12px 16px' }}>Leave Category</th>
                <th style={{ padding: '12px 16px' }}>Duration &amp; Dates</th>
                <th style={{ padding: '12px 16px' }}>Reason</th>
                <th style={{ padding: '12px 16px' }}>Available Balance</th>
                <th style={{ padding: '12px 16px' }}>Status</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map(lr => (
                <tr key={lr.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', color: '#93c5fd' }}>{lr.id}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ fontWeight: 600, color: '#f8fafc' }}>{lr.empName}</div>
                    <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)' }}>{lr.role}</div>
                  </td>
                  <td style={{ padding: '12px 16px', color: '#cbd5e1' }}>{lr.type}</td>
                  <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', color: '#f8fafc' }}>{lr.dates}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--muted-foreground, #94a3b8)' }}>{lr.reason}</td>
                  <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', color: '#34d399' }}>{lr.balance}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '99px',
                      fontSize: '10px',
                      fontWeight: 700,
                      background: lr.status === 'Approved' ? 'rgba(16,185,129,0.15)' : lr.status === 'Pending' ? 'rgba(234,179,8,0.15)' : 'rgba(239,68,68,0.15)',
                      color: lr.status === 'Approved' ? '#10b981' : lr.status === 'Pending' ? '#eab308' : '#ef4444'
                    }}>
                      ● {lr.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    {lr.status === 'Pending' ? (
                      <div style={{ display: 'inline-flex', gap: '6px' }}>
                        <button
                          onClick={() => handleAction(lr.id, 'Approved')}
                          style={{
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '10px',
                            fontWeight: 700,
                            background: '#10b981',
                            color: '#fff',
                            border: 'none',
                            cursor: 'pointer'
                          }}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleAction(lr.id, 'Rejected')}
                          style={{
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '10px',
                            fontWeight: 700,
                            background: '#ef4444',
                            color: '#fff',
                            border: 'none',
                            cursor: 'pointer'
                          }}
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)' }}>Decision logged</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Holiday Calendar */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 14px', fontSize: '15px', fontWeight: 700 }}>🗓️ Upcoming Corporate &amp; Clinic Holidays (Q4 2026)</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
          {holidays.map(h => (
            <div key={h.name} style={{ background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.04)' }}>
              <div style={{ fontWeight: 600, color: '#f8fafc', fontSize: '13px' }}>{h.name}</div>
              <div style={{ color: '#38bdf8', fontSize: '12px', marginTop: '4px', fontFamily: '"IBM Plex Mono", monospace' }}>{h.date} ({h.day})</div>
              <span style={{ display: 'inline-block', marginTop: '6px', fontSize: '10px', padding: '2px 6px', borderRadius: '4px', background: 'rgba(255,255,255,0.06)', color: '#94a3b8' }}>{h.type}</span>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
