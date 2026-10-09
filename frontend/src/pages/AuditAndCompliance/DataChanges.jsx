import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function DataChanges() {
  const changes = [];

  return (
    <DashboardLayout
      category="Audit & Compliance"
      subcategory="Data Mutations & Diff Engine"
      title="Field-Level Data Mutation Log"
      subtitle="Granular Before-and-After change comparisons across all database entities"
      icon="🔄"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Field-Level Mutations" value="0" delta="0.0%" trend="neutral" subtext="0 mutations logged" icon="🔄" />
        <KpiCard label="Rollback Readiness" value="0.0%" delta="0.0%" trend="neutral" subtext="0 snapshots" icon="⏪" />
        <KpiCard label="Schema Migrations" value="v0.0.0" delta="0.0%" trend="neutral" subtext="0 migrations" icon="🗄️" />
        <KpiCard label="Critical Overrides" value="0 Flagged" delta="0.0%" trend="neutral" subtext="0 override alerts" icon="🛡️" />
      </div>

      <div style={{ background: 'var(--card, #ffffff)', border: '1px solid var(--border, #e2e8f0)', borderRadius: '12px', padding: '20px' }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>Database Field Mutations & Diffs</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)', fontSize: '11px', textTransform: 'uppercase' }}>
                <th style={{ padding: '10px 12px' }}>Change ID</th>
                <th style={{ padding: '10px 12px' }}>Database Table</th>
                <th style={{ padding: '10px 12px' }}>Record Key</th>
                <th style={{ padding: '10px 12px' }}>Modified Field</th>
                <th style={{ padding: '10px 12px' }}>Before vs After Diff</th>
                <th style={{ padding: '10px 12px' }}>Modified By</th>
                <th style={{ padding: '10px 12px' }}>Business Rationale</th>
                <th style={{ padding: '10px 12px' }}>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {changes.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ padding: '36px', textAlign: 'center', color: 'var(--muted-foreground, #64748b)' }}>
                    No field-level mutation records found.
                  </td>
                </tr>
              ) : (
                changes.map((c, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--border, #f1f5f9)' }}>
                    <td style={{ padding: '12px', fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px', color: '#2563eb', fontWeight: 600 }}>{c.id}</td>
                    <td style={{ padding: '12px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700 }}>{c.table}</td>
                    <td style={{ padding: '12px', fontFamily: '"IBM Plex Mono", monospace', color: '#2563eb' }}>{c.record}</td>
                    <td style={{ padding: '12px' }}><code>{c.field}</code></td>
                    <td style={{ padding: '12px', fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px' }}>
                      <div style={{ color: '#dc2626', background: '#fef2f2', padding: '2px 6px', borderRadius: '4px', textDecoration: 'line-through' }}>- {c.oldVal}</div>
                      <div style={{ color: '#16a34a', background: '#f0fdf4', padding: '2px 6px', borderRadius: '4px', fontWeight: 600, marginTop: '2px' }}>+ {c.newVal}</div>
                    </td>
                    <td style={{ padding: '12px' }}>{c.changedBy}</td>
                    <td style={{ padding: '12px', color: '#64748b' }}>{c.reason}</td>
                    <td style={{ padding: '12px', fontSize: '12px' }}>{c.time}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
