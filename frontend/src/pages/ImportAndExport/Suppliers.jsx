import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function Suppliers() {
  const suppliers = [
    { code: 'SUP-GLB-01', name: 'Royal Canin SAS', country: 'France', cat: 'Veterinary Clinical Nutrition', terms: 'LC 60 Days', annualVol: '€580,000', leadTime: '24 Days', cdsco: 'Approved & Registered', rating: '4.9 ★' },
    { code: 'SUP-GLB-02', name: 'MSD Animal Health GmbH', country: 'Germany', cat: 'Pharmaceuticals & Biologics', terms: 'LC 90 Days', annualVol: '€420,000', leadTime: '18 Days', cdsco: 'Form 10 Issued', rating: '5.0 ★' },
    { code: 'SUP-GLB-03', name: 'Zoetis Global LLC', country: 'United States', cat: 'Vaccines & Parasiticides', terms: 'LC 60 Days', annualVol: '$640,000', leadTime: '21 Days', cdsco: 'Form 10 Issued', rating: '4.9 ★' },
    { code: 'SUP-GLB-04', name: 'Conceria Guccio Nappa SRL', country: 'Italy', cat: 'Haute Couture Raw Leather', terms: 'TT Wire / 30D', annualVol: '€180,000', leadTime: '12 Days', cdsco: 'N/A (Apparel)', rating: '4.8 ★' },
    { code: 'SUP-GLB-05', name: 'Midmark Animal Health Corp', country: 'United States', cat: 'Surgical Tables & Imaging', terms: 'Direct Wire', annualVol: '$210,000', leadTime: '30 Days', cdsco: 'Medical Device NOC', rating: '4.7 ★' }
  ];

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Import & Export"
      subcategory="Suppliers"
      title="Global Veterinary & Raw Material Suppliers"
      subtitle="International manufacturer registry, CDSCO import licenses, country of origin compliance, and quality certifications"
      icon="🌍"
      badge="16 International OEMs"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Active Global Suppliers" value="16 Manufacturers" delta="Europe, US, Japan" trend="up" subtext="Direct OEM distribution" icon="🌍" />
        <KpiCard label="CDSCO Registered OEMs" value="100% Compliant" delta="Form 10 / 11 active" trend="up" subtext="Biologicals clearance" icon="🛡️" />
        <KpiCard label="Avg Import Lead Time" value="21.4 Days" delta="-3 days optimization" trend="up" subtext="Direct air corridors" icon="⏱️" />
        <KpiCard label="Supplier Quality Score" value="99.2%" delta="Zero batch rejections" trend="up" subtext="Pre-shipment COA verified" icon="✅" />
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
              {suppliers.map(s => (
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
