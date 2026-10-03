import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function ReportsDashboard() {
  const reports = [
    { title: 'Executive Monthly P&L and Balance Sheet', format: 'PDF / CSV', freq: 'Monthly', lastRun: '01 Oct 2026' },
    { title: 'Doctor Consultation & Commission Ledger', format: 'CSV', freq: 'Bi-Weekly', lastRun: '02 Oct 2026' },
    { title: 'Inventory Batch Valuation & Expiry Audit', format: 'XLSX', freq: 'Weekly', lastRun: '03 Oct 2026' },
    { title: 'Marketing ROAS & Multi-Touch Attribution', format: 'CSV', freq: 'Daily', lastRun: 'Today, 06:00' }
  ];

  return (
    <DashboardLayout
      category="Reports & Analytics"
      subcategory="Export Center & Scheduled Reports"
      title="Intelligence Reports & Data Export Center"
      subtitle="Automated board reports, scheduled finance exports, and ad-hoc CSV ledger downloads"
      icon="📑"
      badge="Export Engine Ready"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Scheduled Reports" value="14 Active" delta="Automated" trend="neutral" subtext="Dispatched to email" icon="⏰" />
        <KpiCard label="Exports Generated" value="482 Files" delta="This month" trend="neutral" subtext="CSV, PDF, XLSX" icon="📊" />
        <KpiCard label="Data Pipeline" value="Synchronized" delta="FastAPI SQLite" trend="up" subtext="Zero lag" icon="⚡" />
        <KpiCard label="Audit Logging" value="100% Tracked" delta="SOC-2 standard" trend="up" subtext="Export history saved" icon="🛡️" />
      </div>

      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>Scheduled Intelligence Exports</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))', color: 'var(--muted-foreground, #94a3b8)', fontSize: '11px' }}>
              <th style={{ padding: '8px 12px' }}>Report Name</th>
              <th style={{ padding: '8px 12px' }}>Format</th>
              <th style={{ padding: '8px 12px' }}>Schedule Frequency</th>
              <th style={{ padding: '8px 12px' }}>Last Run</th>
              <th style={{ padding: '8px 12px', textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r) => (
              <tr key={r.title} style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.04))' }}>
                <td style={{ padding: '12px', fontWeight: 600 }}>{r.title}</td>
                <td style={{ padding: '12px' }}><span style={{ padding: '2px 6px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', fontSize: '11px' }}>{r.format}</span></td>
                <td style={{ padding: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>{r.freq}</td>
                <td style={{ padding: '12px' }}>{r.lastRun}</td>
                <td style={{ padding: '12px', textAlign: 'right' }}>
                  <button style={{
                    padding: '4px 10px',
                    borderRadius: '6px',
                    border: '1px solid var(--border, rgba(255,255,255,0.1))',
                    background: 'var(--card, #1e293b)',
                    color: 'var(--foreground, #f8fafc)',
                    fontSize: '11px',
                    cursor: 'pointer'
                  }}>Download</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
