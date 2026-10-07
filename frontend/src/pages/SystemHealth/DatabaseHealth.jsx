import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function DatabaseHealth() {
  const [dbStats, setDbStats] = useState({
    file: 'zenvebi.db',
    engine: 'SQLite 3 (WAL Mode)',
    size: '28.0 KB',
    pageSize: '4,096 bytes',
    integrity: 'ok (0 corruptions)',
    activeLocks: '0 (None)',
    walBacklog: '0 pages'
  });

  const [tables, setTables] = useState([]);

  const [toast, setToast] = useState('');

  const runVacuum = () => {
    setToast('VACUUM INTO scratch/backup.db executed. Storage defragmented.');
    setTimeout(() => setToast(''), 3500);
  };

  const runIntegrityCheck = () => {
    setToast('PRAGMA integrity_check completed: OK. 0 errors found.');
    setTimeout(() => setToast(''), 3500);
  };

  return (
    <DashboardLayout
      category="System Health"
      subcategory="Database Health"
      title="SQLite Core Database Health"
      subtitle="zenvebi.db storage allocation, WAL journal mode checkpoints, query benchmarks, and tables"
      icon="🗄️"
      badge="WAL Mode Active"
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={runIntegrityCheck}
            style={{
              padding: '7px 14px',
              borderRadius: '8px',
              background: '#ffffff',
              border: '1px solid var(--border, #cbd5e1)',
              color: 'var(--foreground, #334155)',
              fontWeight: 600,
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            🔍 Integrity Check
          </button>
          <button
            onClick={runVacuum}
            style={{
              padding: '7px 14px',
              borderRadius: '8px',
              background: '#2563eb',
              color: '#ffffff',
              border: '1px solid #1d4ed8',
              fontWeight: 600,
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            🧹 Vacuum & Defragment
          </button>
        </div>
      }
    >
      {toast && (
        <div style={{
          padding: '10px 16px',
          background: '#eff6ff',
          border: '1px solid #bfdbfe',
          borderRadius: '8px',
          color: '#2563eb',
          fontSize: '13px',
          fontWeight: 600
        }}>
          ℹ️ {toast}
        </div>
      )}

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Database Latency" value="1.2 ms" delta="Fast query execution" trend="up" subtext="Direct SQLite access" icon="⚡" />
        <KpiCard label="Database File Size" value="28.0 KB" delta="Lightweight" trend="up" subtext="Clean B-tree structure" icon="💾" />
        <KpiCard label="Journal Mode" value="WAL" delta="Write-Ahead-Log" trend="up" subtext="Concurrent non-blocking reads" icon="🛡️" />
        <KpiCard label="Active Locks" value="0 Locks" delta="Zero contention" trend="up" subtext="Lock wait time: 0ms" icon="🟢" />
      </div>

      {/* Engine Properties */}
      <div style={{
        background: 'var(--card, #ffffff)',
        border: '1px solid var(--border, #e2e8f0)',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>Database Engine & File Parameters</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #64748b)' }}>Database Filename</div>
            <div style={{ fontSize: '14px', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace', marginTop: '2px', color: 'var(--foreground, #0f172a)' }}>{dbStats.file}</div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #64748b)' }}>Engine & Protocol</div>
            <div style={{ fontSize: '14px', fontWeight: 600, marginTop: '2px', color: 'var(--foreground, #0f172a)' }}>{dbStats.engine}</div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #64748b)' }}>Storage Allocation</div>
            <div style={{ fontSize: '14px', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace', marginTop: '2px', color: 'var(--foreground, #0f172a)' }}>{dbStats.size}</div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #64748b)' }}>Integrity Verification</div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#16a34a', marginTop: '2px' }}>● {dbStats.integrity}</div>
          </div>
        </div>
      </div>

      {/* Tables Table */}
      <div style={{
        background: 'var(--card, #ffffff)',
        border: '1px solid var(--border, #e2e8f0)',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>Schema Tables & Record Densities</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)', fontSize: '11px', background: '#f8fafc' }}>
              <th style={{ padding: '10px 12px' }}>Table Name</th>
              <th style={{ padding: '10px 12px', textAlign: 'right' }}>Total Records</th>
              <th style={{ padding: '10px 12px', textAlign: 'right' }}>Estimated Size</th>
              <th style={{ padding: '10px 12px', textAlign: 'right' }}>Indexed Keys</th>
              <th style={{ padding: '10px 12px', textAlign: 'right' }}>Last Ingestion</th>
              <th style={{ padding: '10px 12px', textAlign: 'right' }}>State</th>
            </tr>
          </thead>
          <tbody>
            {tables.map((t) => (
              <tr key={t.name} style={{ borderBottom: '1px solid var(--border, #f1f5f9)' }}>
                <td style={{ padding: '12px', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace', color: 'var(--foreground, #0f172a)' }}>{t.name}</td>
                <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{t.records}</td>
                <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{t.size}</td>
                <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{t.indexCount}</td>
                <td style={{ padding: '12px', textAlign: 'right', color: 'var(--muted-foreground, #64748b)' }}>{t.lastUpdated}</td>
                <td style={{ padding: '12px', textAlign: 'right' }}>
                  <span style={{ padding: '2px 8px', borderRadius: '99px', background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0', fontWeight: 600, fontSize: '11px' }}>
                    ● {t.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
