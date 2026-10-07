import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function ROAS() {
  const categoryROAS = [];

  return (
    <DashboardLayout
      category="Marketing"
      subcategory="ROAS"
      title="Return on Ad Spend (ROAS) Multipliers"
      subtitle="Direct revenue generated per rupee of ad spend by product lines and marketing channels"
      icon="🚀"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Blended Marketing ROAS" value="4.45x" delta="+0.65x" trend="up" subtext="₹0 attributed GMV" icon="🚀" />
        <KpiCard label="Search Ads ROAS" value="5.20x" delta="+0.40x" trend="up" subtext="Google high-intent queries" icon="🔍" />
        <KpiCard label="Social Ads ROAS" value="4.12x" delta="+0.32x" trend="up" subtext="Meta Instagram & FB Reels" icon="📸" />
        <KpiCard label="Incremental ROAS (iROAS)" value="3.68x" delta="+0.24x" trend="up" subtext="Net lift over baseline" icon="📈" />
      </div>

      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Product Category Ad Return & Revenue Generated</h3>
          <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>Ad spend efficiency mapped directly to top pet healthcare and wellness categories</p>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <th style={{ padding: '12px 16px' }}>Product & Clinical Category</th>
                <th style={{ padding: '12px 16px' }}>Ad Spend</th>
                <th style={{ padding: '12px 16px' }}>Attributed GMV</th>
                <th style={{ padding: '12px 16px' }}>ROAS Multiple</th>
                <th style={{ padding: '12px 16px' }}>Target Benchmark</th>
                <th style={{ padding: '12px 16px' }}>Performance Status</th>
              </tr>
            </thead>
            <tbody>
              {categoryROAS.map(c => (
                <tr key={c.category} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 600, color: '#0f172a' }}>{c.category}</td>
                  <td style={{ padding: '14px 16px', fontFamily: '"IBM Plex Mono", monospace' }}>{c.spend}</td>
                  <td style={{ padding: '14px 16px', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace', color: '#0f172a' }}>{c.revenue}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ padding: '3px 8px', borderRadius: '4px', background: '#dcfce7', color: '#15803d', fontWeight: 700, fontSize: '13px', fontFamily: '"IBM Plex Mono", monospace' }}>
                      {c.roas}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', color: '#64748b', fontFamily: '"IBM Plex Mono", monospace' }}>{c.target}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '4px', background: '#eff6ff', color: '#2563eb', fontWeight: 600, fontSize: '11px' }}>
                      {c.status}
                    </span>
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
