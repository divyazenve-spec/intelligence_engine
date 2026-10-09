import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function CustomerAcquisition() {
  const cohorts = [];

  const petSplit = [];

  return (
    <DashboardLayout
      category="Marketing"
      subcategory="Customer Acquisition"
      title="Pet Parent Acquisition & Cohort Retention"
      subtitle="New customer onboardings, pet species distribution, first-purchase basket size, and repeat behavior"
      icon="🐾"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="New Customers (MTD)" value="0" delta="0.0%" trend="neutral" subtext="First paid transaction" icon="👥" />
        <KpiCard label="30-Day Repeat Purchase" value="0.0%" delta="0.0%" trend="neutral" subtext="Rx refills & pet diets" icon="🔄" />
        <KpiCard label="First Order Value (AOV)" value="₹0" delta="0.0%" trend="neutral" subtext="Benchmark: ₹0" icon="🛍️" />
        <KpiCard label="60-Day Customer LTV" value="₹0" delta="0.0%" trend="neutral" subtext="Companion loyalty" icon="💎" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '16px' }}>
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
          <h3 style={{ margin: '0 0 14px', fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Cohort Repeat Retention & 60D LTV</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', color: '#64748b', fontSize: '11px', textTransform: 'uppercase' }}>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>Cohort</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Acquired</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>30D Repeat</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>60D LTV</th>
              </tr>
            </thead>
            <tbody>
              {cohorts.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ padding: '24px 12px', textAlign: 'center', color: '#94a3b8' }}>
                    No cohort retention data found
                  </td>
                </tr>
              ) : (
                cohorts.map(c => (
                  <tr key={c.cohort} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{c.cohort}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{c.acquired}</td>
                    <td style={{ padding: '12px', textAlign: 'right', color: '#16a34a', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace' }}>{c.m1Repeat}</td>
                    <td style={{ padding: '12px', textAlign: 'right', color: '#2563eb', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{c.ltv60d}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
          <h3 style={{ margin: '0 0 14px', fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Acquired Customers by Pet Species</h3>
          {petSplit.length === 0 ? (
            <div style={{ padding: '24px', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}>
              No pet species acquisition data found
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {petSplit.map(p => (
                <div key={p.species} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: '#f8fafc', borderRadius: '8px' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '13px', color: '#0f172a' }}>{p.species}</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>{p.favCategory}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 700, fontSize: '13px', color: '#0f172a', fontFamily: '"IBM Plex Mono", monospace' }}>{p.count}</div>
                    <div style={{ fontSize: '11px', color: '#2563eb', fontWeight: 600 }}>{p.pct}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
