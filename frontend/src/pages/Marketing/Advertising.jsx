import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function Advertising() {
  const adSets = [
    { name: 'Meta Advantage+ Dynamic Pet Pharmacy Catalog', platform: 'Meta Ads', spend: '₹1,42,000', cpm: '₹165', cpc: '₹7.80', cpa: '₹145', roas: '4.9x', health: 'Optimal' },
    { name: 'Google Search: Urgent 24/7 Vet Near Me', platform: 'Google Ads', spend: '₹1,65,000', cpm: '₹420', cpc: '₹18.40', cpa: '₹140', roas: '5.2x', health: 'Optimal' },
    { name: 'Instagram Video: Puppy Training & Preventive Vet Care', platform: 'Meta Ads', spend: '₹98,000', cpm: '₹140', cpc: '₹6.20', cpa: '₹180', roas: '3.8x', health: 'Creative Refresh Due' },
    { name: 'Google Performance Max: Premium Canine Nutrition', platform: 'Google Ads', spend: '₹1,10,000', cpm: '₹280', cpc: '₹12.50', cpa: '₹165', roas: '4.2x', health: 'Optimal' },
    { name: 'YouTube Non-Skip: Veterinary Surgery Precision', platform: 'YouTube Ads', spend: '₹85,000', cpm: '₹210', cpc: '₹16.20', cpa: '₹240', roas: '3.4x', health: 'Scaling' }
  ];

  return (
    <DashboardLayout
      category="Marketing"
      subcategory="Advertising"
      title="Paid Advertising Networks & Creative Efficiency"
      subtitle="Meta Ads Manager, Google Ads MCC, CPM, CPC, cost-per-acquisition, and ad creative health"
      icon="📢"
      badge="₹6.00L Paid Ad Spend MTD"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Average CPM" value="₹243" delta="-8.2%" trend="up" subtext="Cost per 1,000 impressions" icon="👁️" />
        <KpiCard label="Blended CPC" value="₹11.40" delta="-4.8%" trend="up" subtext="Cost per ad click" icon="🖱️" />
        <KpiCard label="Target CPA Adherence" value="₹162" delta="-₹18 under cap" trend="up" subtext="Cap set at ₹180" icon="🎯" />
        <KpiCard label="Ad Spend Efficiency" value="94.2%" delta="+3.1%" trend="up" subtext="Impression share score" icon="⚡" />
      </div>

      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Active Ad Network Placements & Performance</h3>
          <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>Platform spend, auction bid efficiency, and creative fatigue diagnostics</p>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <th style={{ padding: '12px 16px' }}>Ad Set / Campaign</th>
                <th style={{ padding: '12px 16px' }}>Platform</th>
                <th style={{ padding: '12px 16px' }}>Spend</th>
                <th style={{ padding: '12px 16px' }}>CPM</th>
                <th style={{ padding: '12px 16px' }}>CPC</th>
                <th style={{ padding: '12px 16px' }}>CPA</th>
                <th style={{ padding: '12px 16px' }}>ROAS</th>
                <th style={{ padding: '12px 16px' }}>Creative Health</th>
              </tr>
            </thead>
            <tbody>
              {adSets.map(a => (
                <tr key={a.name} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 600, color: '#0f172a' }}>{a.name}</td>
                  <td style={{ padding: '14px 16px', color: '#475569' }}>{a.platform}</td>
                  <td style={{ padding: '14px 16px', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace' }}>{a.spend}</td>
                  <td style={{ padding: '14px 16px', fontFamily: '"IBM Plex Mono", monospace' }}>{a.cpm}</td>
                  <td style={{ padding: '14px 16px', fontFamily: '"IBM Plex Mono", monospace' }}>{a.cpc}</td>
                  <td style={{ padding: '14px 16px', color: '#2563eb', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace' }}>{a.cpa}</td>
                  <td style={{ padding: '14px 16px', color: '#16a34a', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{a.roas}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: a.health === 'Optimal' ? '#f0fdf4' : a.health === 'Scaling' ? '#eff6ff' : '#fef3c7',
                      color: a.health === 'Optimal' ? '#16a34a' : a.health === 'Scaling' ? '#2563eb' : '#d97706',
                      border: `1px solid ${a.health === 'Optimal' ? '#bbf7d0' : a.health === 'Scaling' ? '#bfdbfe' : '#fde68a'}`
                    }}>
                      {a.health}
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
