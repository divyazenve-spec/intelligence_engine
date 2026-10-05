import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function ExportCenter() {
  const [toast, setToast] = useState('');
  const [filterDomain, setFilterDomain] = useState('all');

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const exportDatasets = [
    { id: 'EXP-01', title: 'Complete Sales & Transactions Master Ledger', domain: 'Sales', format: 'CSV', size: '14.8 MB', rows: '48,250 records', lastGenerated: '10m ago' },
    { id: 'EXP-02', title: 'Executive Monthly P&L and Balance Sheet Pack', domain: 'Finance', format: 'PDF & XLSX', size: '4.2 MB', rows: 'Full GAAP Audit', lastGenerated: '2h ago' },
    { id: 'EXP-03', title: 'Customer 360° Demographics & RFM Profiles', domain: 'Customer', format: 'CSV', size: '6.4 MB', rows: '10,000 parents', lastGenerated: '4h ago' },
    { id: 'EXP-04', title: 'Pet Patient Census & Vaccination History', domain: 'Pets', format: 'CSV', size: '8.1 MB', rows: '13,400 pets', lastGenerated: '6h ago' },
    { id: 'EXP-05', title: 'Doctor Consultation & Commission Statements', domain: 'Doctors', format: 'CSV', size: '1.2 MB', rows: '18 specialists', lastGenerated: 'Today, 09:00' },
    { id: 'EXP-06', title: 'Warehouse Inventory Batch & Expiry Valuation', domain: 'Inventory', format: 'XLSX', size: '5.6 MB', rows: '1,840 SKUs', lastGenerated: 'Today, 08:30' },
    { id: 'EXP-07', title: '60-Minute Express SLA & Rider Dwell Logs', domain: 'Operations', format: 'CSV', size: '9.4 MB', rows: '24,180 drops', lastGenerated: 'Yesterday' },
    { id: 'EXP-08', title: 'Marketing Multi-Touch Attribution & CAC Data', domain: 'Marketing', format: 'CSV', size: '3.8 MB', rows: '95,000 clicks', lastGenerated: 'Oct 03' },
    { id: 'EXP-09', title: 'Supplier Purchase Orders & Delivery Scorecards', domain: 'Vendors', format: 'CSV', size: '2.1 MB', rows: '420 POs', lastGenerated: 'Oct 02' },
    { id: 'EXP-10', title: 'SOC-2 Data Access & Security Audit Trail', domain: 'Compliance', format: 'JSON / CSV', size: '28.4 MB', rows: '124,000 logs', lastGenerated: 'Oct 01' }
  ];

  const handleInstantDownload = (item) => {
    // Generate actual downloadable CSV file in browser
    const sampleHeaders = ['Record_ID', 'Timestamp', 'Domain', 'Dataset', 'Status', 'Checksum'];
    const sampleRows = [
      [item.id + '-001', new Date().toISOString(), item.domain, item.title, 'VERIFIED_ACTIVE', 'sha256:7f9a8b1...'],
      [item.id + '-002', new Date().toISOString(), item.domain, item.title, 'VERIFIED_ACTIVE', 'sha256:4b2c8e9...'],
      [item.id + '-003', new Date().toISOString(), item.domain, item.title, 'VERIFIED_ACTIVE', 'sha256:9c1e4f2...']
    ];
    const csvContent = 'data:text/csv;charset=utf-8,' + [sampleHeaders, ...sampleRows].map(e => e.join(',')).join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `zenve_${item.domain.toLowerCase()}_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    triggerToast(`Export ${item.id} (${item.title}) compiled and downloaded successfully.`);
  };

  const filtered = exportDatasets.filter(e => {
    if (filterDomain === 'all') return true;
    return e.domain.toLowerCase() === filterDomain.toLowerCase();
  });

  return (
    <DashboardLayout
      category="Reports & Analytics"
      subcategory="Export Center"
      title="Intelligence Data Export & Bulk Download Center"
      subtitle="One-click streaming downloads for audited financial packs, raw sales ledgers, inventory valuation matrices, and clinical patient records"
      icon="📥"
      badge="High-Speed Stream Engine"
      actions={
        <button
          onClick={() => triggerToast('Initiated batch backup of all 10 operational data packs to encrypted cloud bucket.')}
          style={{
            padding: '8px 14px',
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
          <span>📦</span> Batch Export All Data
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
        <KpiCard label="Exports Generated This Month" value="482 Files" delta="+44 files vs Sept" trend="up" subtext="CSV, PDF, XLSX" icon="📊" />
        <KpiCard label="Data Pipeline Bandwidth" value="1.84 GB" delta="Compressed streams" trend="neutral" subtext="FastAPI worker pool" icon="⚡" />
        <KpiCard label="Export Audit Compliance" value="100% Tracked" delta="SOC-2 standard" trend="up" subtext="SHA-256 fingerprinted" icon="🛡️" />
        <KpiCard label="Max Query Retention" value="365 Days" delta="Immutable storage" trend="neutral" subtext="Encrypted S3 vault" icon="🗄️" />
      </div>

      {/* Filter and Table Card */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Available Raw Datasets & Intelligence Packs</h3>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {['all', 'sales', 'finance', 'customer', 'inventory', 'doctors', 'operations'].map(d => (
              <button
                key={d}
                onClick={() => setFilterDomain(d)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: 'none',
                  background: filterDomain === d ? 'var(--primary, #3b82f6)' : 'rgba(255,255,255,0.05)',
                  color: filterDomain === d ? '#ffffff' : 'var(--muted-foreground, #94a3b8)',
                  textTransform: 'capitalize'
                }}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))', color: 'var(--muted-foreground, #94a3b8)' }}>
                <th style={{ padding: '10px 12px' }}>Dataset Code & Name</th>
                <th style={{ padding: '10px 12px' }}>Domain</th>
                <th style={{ padding: '10px 12px' }}>Format</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Est. File Size</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Total Volume</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Last Generated</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.04))' }}>
                  <td style={{ padding: '12px' }}>
                    <div style={{ fontWeight: 700, color: 'var(--foreground, #f8fafc)' }}>{item.title}</div>
                    <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)', fontFamily: '"IBM Plex Mono", monospace' }}>{item.id}</div>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '4px', background: 'rgba(59,130,246,0.15)', color: '#60a5fa', fontSize: '11px', fontWeight: 600 }}>
                      {item.domain}
                    </span>
                  </td>
                  <td style={{ padding: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>{item.format}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{item.size}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace' }}>{item.rows}</td>
                  <td style={{ padding: '12px', textAlign: 'right', color: 'var(--muted-foreground, #94a3b8)' }}>{item.lastGenerated}</td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    <button
                      onClick={() => handleInstantDownload(item)}
                      style={{
                        padding: '5px 12px',
                        borderRadius: '6px',
                        border: 'none',
                        background: 'var(--primary, #3b82f6)',
                        color: '#ffffff',
                        fontSize: '11px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <span>📥</span> Download
                    </button>
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
