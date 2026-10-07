import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function ApprovalHistory() {
  const approvals = [];

  return (
    <DashboardLayout
      category="Audit & Compliance"
      subcategory="Multi-Level Approvals & Digital Signs"
      title="Approval Workflows & Digital Signatures"
      subtitle="Audit logs for medical sign-offs, high-value purchase orders, financial overrides, and staff leave approvals"
      icon="✍️"
      badge="PKI Digital Signs Active"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Prescriptions Signed" value="100% MCI Verified" delta="Zero Unsigned" trend="up" subtext="Digital cryptographic signature" icon="✍️" />
        <KpiCard label="Avg Approval SLA" value="3.8 Mins" delta="-1.2m vs SLA" trend="up" subtext="Rapid multi-tier workflow" icon="⚡" />
        <KpiCard label="Pending Approvals" value="0 Pending" delta="Inbox Zero" trend="up" subtext="All queue requests cleared" icon="✅" />
        <KpiCard label="Approval Escalations" value="Zero Escalations" delta="Clean Path" trend="up" subtext="Standard hierarchy adherence" icon="🛡️" />
      </div>

      <div style={{ background: 'var(--card, #ffffff)', border: '1px solid var(--border, #e2e8f0)', borderRadius: '12px', padding: '20px' }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>Authority Clearances & Sign-Off History</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)', fontSize: '11px', textTransform: 'uppercase' }}>
                <th style={{ padding: '10px 12px' }}>Approval ID</th>
                <th style={{ padding: '10px 12px' }}>Workflow Category</th>
                <th style={{ padding: '10px 12px' }}>Subject Entity / Details</th>
                <th style={{ padding: '10px 12px' }}>Requested By</th>
                <th style={{ padding: '10px 12px' }}>Authorizing Officer</th>
                <th style={{ padding: '10px 12px' }}>Timestamp</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Decision State</th>
              </tr>
            </thead>
            <tbody>
              {approvals.map((a, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border, #f1f5f9)' }}>
                  <td style={{ padding: '12px', fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px', color: '#2563eb', fontWeight: 600 }}>{a.id}</td>
                  <td style={{ padding: '12px', fontWeight: 700 }}>{a.type}</td>
                  <td style={{ padding: '12px' }}>{a.entity}</td>
                  <td style={{ padding: '12px', color: '#64748b' }}>{a.requester}</td>
                  <td style={{ padding: '12px', fontWeight: 600 }}>{a.approver}</td>
                  <td style={{ padding: '12px', fontSize: '12px' }}>{a.time}</td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '99px', background: '#dcfce7', color: '#15803d', fontWeight: 600, fontSize: '11px' }}>● {a.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
