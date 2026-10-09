import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function CustomsDocumentation() {
  const [filter, setFilter] = useState('ALL');

  const docs = [];

  const filtered = filter === 'ALL' ? docs : docs.filter(d => d.type.toLowerCase().includes(filter.toLowerCase()));

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Import & Export"
      subcategory="Customs & Documentation"
      title="Customs Compliance, Bill of Entry & Shipping Bills"
      subtitle="DGFT import export code (IEC), CDSCO drug controller permits, ICEGATE electronic filings, and animal quarantine NOCs"
      icon="🏛️"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="ICEGATE Electronic Filings" value="0 Filings" delta="" trend="neutral" subtext="Direct port processing" icon="🏛️" />
        <KpiCard label="Customs Clearance Turnaround" value="0.0 Days" delta="" trend="neutral" subtext="Advance filing protocol" icon="⚡" />
        <KpiCard label="Tariff Compliance Accuracy" value="0.0%" delta="Zero misdeclaration penalties" trend="neutral" subtext="Certified CHA audited" icon="🛡️" />
        <KpiCard label="Export Duty Drawback Claimed" value="₹0" delta="0.0%" trend="neutral" subtext="Credited to bank account" icon="💵" />
      </div>

      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>Customs Declarations & Regulatory Certificates</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Bill of Entry, Shipping Bills, HSN tariff codes, duty amounts, and agency approvals</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['ALL', 'Import', 'Export'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: '6px 10px',
                  borderRadius: '6px',
                  border: '1px solid ' + (filter === f ? '#0891b2' : 'var(--border, #cbd5e1)'),
                  background: filter === f ? 'rgba(8,145,178,0.1)' : 'transparent',
                  color: filter === f ? '#0e7490' : 'var(--muted-foreground, #64748b)',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)' }}>
                <th style={{ padding: '10px 12px' }}>Filing Reference #</th>
                <th style={{ padding: '10px 12px' }}>Document Type</th>
                <th style={{ padding: '10px 12px' }}>Port of Clearance</th>
                <th style={{ padding: '10px 12px' }}>HSN Tariff</th>
                <th style={{ padding: '10px 12px' }}>Declared Value</th>
                <th style={{ padding: '10px 12px' }}>Duty / Incentive</th>
                <th style={{ padding: '10px 12px' }}>Regulatory Agency</th>
                <th style={{ padding: '10px 12px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ padding: '24px', textAlign: 'center', color: 'var(--muted-foreground, #64748b)' }}>
                    No customs documentation records found
                  </td>
                </tr>
              ) : (
                filtered.map(d => (
                  <tr key={d.docId} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                    <td style={{ padding: '12px', fontFamily: 'monospace', fontWeight: 600 }}>{d.docId}</td>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{d.type}</td>
                    <td style={{ padding: '12px' }}>{d.port}</td>
                    <td style={{ padding: '12px', fontFamily: 'monospace' }}>{d.hsn}</td>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{d.assessableVal}</td>
                    <td style={{ padding: '12px', color: '#059669', fontWeight: 600 }}>{d.duty}</td>
                    <td style={{ padding: '12px' }}>{d.agency}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        padding: '3px 8px',
                        borderRadius: '999px',
                        fontSize: '10px',
                        fontWeight: 600,
                        background: d.status.includes('Cleared') || d.status.includes('Order Granted') || d.status.includes('Passed') || d.status.includes('Issued') ? 'rgba(16,185,129,0.12)' : 'rgba(245,158,11,0.14)',
                        color: d.status.includes('Cleared') || d.status.includes('Order Granted') || d.status.includes('Passed') || d.status.includes('Issued') ? '#059669' : '#d97706'
                      }}>
                        {d.status}
                      </span>
                    </td>
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
