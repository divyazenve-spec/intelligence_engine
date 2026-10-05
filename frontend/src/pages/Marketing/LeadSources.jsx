import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function LeadSources() {
  const sources = [
    { name: 'Google Search (High Intent)', visitors: '68,400', leads: '6,420', convRate: '9.38%', spend: '₹2,10,000', cac: '₹140', quality: '9.6/10', share: '34.8%' },
    { name: 'Meta Instagram (Visual & Reels)', visitors: '54,200', leads: '4,180', convRate: '7.71%', spend: '₹1,85,000', cac: '₹165', quality: '8.8/10', share: '22.7%' },
    { name: 'Partner Vet Clinics & Hospitals', visitors: '14,800', leads: '2,940', convRate: '19.86%', spend: '₹84,000', cac: '₹85', quality: '9.9/10', share: '16.0%' },
    { name: 'In-App Referral & Invite Pet Friend', visitors: '19,500', leads: '2,450', convRate: '12.56%', spend: '₹35,000', cac: '₹32', quality: '9.4/10', share: '13.3%' },
    { name: 'Organic SEO & Pet Health Guides', visitors: '42,000', leads: '1,650', convRate: '3.93%', spend: '₹40,000', cac: '₹24', quality: '9.1/10', share: '9.0%' },
    { name: 'Local Pet Events & Adoption Drives', visitors: '6,400', leads: '760', convRate: '11.88%', spend: '₹28,000', cac: '₹110', quality: '8.9/10', share: '4.2%' }
  ];

  return (
    <DashboardLayout
      category="Marketing"
      subcategory="Lead Sources"
      title="Acquisition Lead Sources & Channel Attribution"
      subtitle="Source performance, attribution efficiency, channel quality index, and lead volume share"
      icon="🌐"
      badge="6 Attributed Channels"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Top Lead Channel" value="Google Search" delta="34.8% Share" trend="up" subtext="6,420 pet leads" icon="🔍" />
        <KpiCard label="Highest Quality Score" value="Vet Clinic Network" delta="9.9 / 10" trend="up" subtext="19.8% conversion rate" icon="🩺" />
        <KpiCard label="Lowest CAC Channel" value="In-App Referrals" delta="₹32 / Lead" trend="up" subtext="₹35K viral budget" icon="👥" />
        <KpiCard label="Blended Channel Conv" value="9.1%" delta="+1.4%" trend="up" subtext="Across all 6 touchpoints" icon="⚡" />
      </div>

      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Channel Attribution & Conversion Breakdown</h3>
          <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>Comparative return, lead quality score, and direct marketing cost per acquisition</p>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <th style={{ padding: '12px 16px' }}>Lead Source</th>
                <th style={{ padding: '12px 16px' }}>Site Visitors</th>
                <th style={{ padding: '12px 16px' }}>Leads Generated</th>
                <th style={{ padding: '12px 16px' }}>Conv. Rate</th>
                <th style={{ padding: '12px 16px' }}>Channel Spend</th>
                <th style={{ padding: '12px 16px' }}>CAC / Lead</th>
                <th style={{ padding: '12px 16px' }}>Quality Index</th>
                <th style={{ padding: '12px 16px' }}>Volume Share</th>
              </tr>
            </thead>
            <tbody>
              {sources.map(s => (
                <tr key={s.name} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 600, color: '#0f172a' }}>{s.name}</td>
                  <td style={{ padding: '14px 16px', fontFamily: '"IBM Plex Mono", monospace' }}>{s.visitors}</td>
                  <td style={{ padding: '14px 16px', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace' }}>{s.leads}</td>
                  <td style={{ padding: '14px 16px', color: '#16a34a', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace' }}>{s.convRate}</td>
                  <td style={{ padding: '14px 16px', fontFamily: '"IBM Plex Mono", monospace' }}>{s.spend}</td>
                  <td style={{ padding: '14px 16px', color: '#2563eb', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace' }}>{s.cac}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '4px', background: '#f0fdf4', color: '#16a34a', fontWeight: 700, fontSize: '11px' }}>
                      {s.quality}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '60px', height: '6px', background: '#e2e8f0', borderRadius: '99px', overflow: 'hidden' }}>
                        <div style={{ width: s.share, height: '100%', background: '#2563eb' }} />
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: 600, color: '#475569' }}>{s.share}</span>
                    </div>
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
