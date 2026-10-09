import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function CAC() {
  const cityCAC = [];

  return (
    <DashboardLayout
      category="Marketing"
      subcategory="CAC"
      title="Customer Acquisition Cost (CAC) Intelligence"
      subtitle="Blended CAC, paid vs organic acquisition cost, payback window, and LTV-to-CAC health ratio"
      icon="🎯"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Blended CAC" value="₹0" delta="0.0%" trend="neutral" subtext="Across all acquisition channels" icon="🎯" />
        <KpiCard label="Paid Only CAC" value="₹0" delta="0.0%" trend="neutral" subtext="Meta & Google ad spend" icon="💳" />
        <KpiCard label="Organic / Referral CAC" value="₹0" delta="0.0%" trend="neutral" subtext="Viral invite & SEO" icon="🌱" />
        <KpiCard label="LTV to CAC Ratio" value="0.0x" delta="0.0x" trend="neutral" subtext="Target healthy band > 0.0x" icon="⚖️" />
      </div>

      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Metro City CAC & LTV Multiple Comparison</h3>
          <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>Unit economics by metropolitan region, customer volume, and organic acquisition discount</p>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <th style={{ padding: '12px 16px' }}>Metro Territory</th>
                <th style={{ padding: '12px 16px' }}>Blended CAC</th>
                <th style={{ padding: '12px 16px' }}>Paid CAC</th>
                <th style={{ padding: '12px 16px' }}>Organic CAC</th>
                <th style={{ padding: '12px 16px' }}>New Customers</th>
                <th style={{ padding: '12px 16px' }}>LTV : CAC Multiple</th>
                <th style={{ padding: '12px 16px' }}>Unit Health</th>
              </tr>
            </thead>
            <tbody>
              {cityCAC.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ padding: '32px 16px', textAlign: 'center', color: '#94a3b8' }}>
                    No city CAC intelligence data found
                  </td>
                </tr>
              ) : (
                cityCAC.map(c => (
                  <tr key={c.city} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '14px 16px', fontWeight: 600, color: '#0f172a' }}>{c.city}</td>
                    <td style={{ padding: '14px 16px', fontWeight: 700, color: '#2563eb', fontFamily: '"IBM Plex Mono", monospace' }}>{c.blendedCAC}</td>
                    <td style={{ padding: '14px 16px', fontFamily: '"IBM Plex Mono", monospace' }}>{c.paidCAC}</td>
                    <td style={{ padding: '14px 16px', color: '#16a34a', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace' }}>{c.organicCAC}</td>
                    <td style={{ padding: '14px 16px', fontFamily: '"IBM Plex Mono", monospace' }}>{c.newCustomers}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ padding: '2px 8px', borderRadius: '4px', background: '#dcfce7', color: '#15803d', fontWeight: 700, fontSize: '12px' }}>
                        {c.ltvRatio}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px', color: '#475569', fontWeight: 500 }}>{c.status}</td>
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
