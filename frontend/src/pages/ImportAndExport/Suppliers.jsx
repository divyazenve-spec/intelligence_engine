import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function Suppliers() {
  const suppliers = [];

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Import & Export"
      subcategory="Suppliers"
      title="Global Veterinary & Raw Material Suppliers"
      subtitle="International manufacturer registry, CDSCO import licenses, country of origin compliance, and quality certifications"
      icon="🌍"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Active Global Suppliers" value="0 Manufacturers" delta="" trend="neutral" subtext="Direct OEM distribution" icon="🌍" />
        <KpiCard label="CDSCO Registered OEMs" value="0.0%" delta="Form 10 / 11 active" trend="neutral" subtext="Biologicals clearance" icon="🛡️" />
        <KpiCard label="Avg Import Lead Time" value="0.0 Days" delta="" trend="neutral" subtext="Direct air corridors" icon="⏱️" />
        <KpiCard label="Supplier Quality Score" value="0.0%" delta="Zero batch rejections" trend="neutral" subtext="Pre-shipment COA verified" icon="✅" />
      </div>

      <div style={card}>
        <h3 style={{ margin: '0 0 12px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>Global Supplier Master Directory</h3>
        <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Commercial terms, CDSCO regulatory clearances, and manufacturer performance</p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)' }}>
                <th style={{ padding: '10px 12px' }}>Supplier Code</th>
                <th style={{ padding: '10px 12px' }}>Company Name</th>
                <th style={{ padding: '10px 12px' }}>Origin Country</th>
                <th style={{ padding: '10px 12px' }}>Category</th>
                <th style={{ padding: '10px 12px' }}>Payment Terms</th>
                <th style={{ padding: '10px 12px' }}>Annual Volume</th>
                <th style={{ padding: '10px 12px' }}>Regulatory Status</th>
                <th style={{ padding: '10px 12px' }}>Rating</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ padding: '24px', textAlign: 'center', color: 'var(--muted-foreground, #64748b)' }}>
                    No global supplier records found
                  </td>
                </tr>
              ) : (
                suppliers.map(s => (
                  <tr key={s.code} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                    <td style={{ padding: '12px', fontFamily: 'monospace', fontWeight: 600 }}>{s.code}</td>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{s.name}</td>
                    <td style={{ padding: '12px' }}>{s.country}</td>
                    <td style={{ padding: '12px' }}>{s.cat}</td>
                    <td style={{ padding: '12px' }}>{s.terms}</td>
                    <td style={{ padding: '12px', fontWeight: 600, color: '#059669' }}>{s.annualVol}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ padding: '3px 8px', borderRadius: '999px', fontSize: '10px', fontWeight: 600, background: 'rgba(16,185,129,0.12)', color: '#059669' }}>
                        {s.cdsco}
                      </span>
                    </td>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{s.rating}</td>
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
