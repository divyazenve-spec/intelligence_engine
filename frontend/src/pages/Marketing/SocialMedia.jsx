import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function SocialMedia() {
  const handles = [];

  return (
    <DashboardLayout
      category="Marketing"
      subcategory="Social Media"
      title="Social Media Reach & Community Engagement"
      subtitle="Follower growth, pet parent community engagement, viral reels reach, and brand sentiment"
      icon="📱"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Social Audience" value="0" delta="+0 / mo" trend="neutral" subtext="Across 0 channels" icon="👥" />
        <KpiCard label="Average Engagement Rate" value="0.0%" delta="0.0%" trend="neutral" subtext="Industry avg: 0.0%" icon="💬" />
        <KpiCard label="Monthly Content Reach" value="0" delta="0.0%" trend="neutral" subtext="Reels, Shorts, Carousels" icon="🔥" />
        <KpiCard label="UGC Pet Submissions" value="0" delta="0.0%" trend="neutral" subtext="Pet parent tagging Zenve" icon="🐕" />
      </div>

      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Official Social Media Channels & Creator Reach</h3>
          <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>Cross-platform engagement, community sentiment, and top performing educational campaigns</p>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <th style={{ padding: '12px 16px' }}>Network & Handle</th>
                <th style={{ padding: '12px 16px' }}>Followers</th>
                <th style={{ padding: '12px 16px' }}>Monthly Growth</th>
                <th style={{ padding: '12px 16px' }}>Engagement Rate</th>
                <th style={{ padding: '12px 16px' }}>Top Performing Content</th>
                <th style={{ padding: '12px 16px' }}>Impact Reach</th>
              </tr>
            </thead>
            <tbody>
              {handles.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ padding: '32px 16px', textAlign: 'center', color: '#94a3b8' }}>
                    No social media handles found
                  </td>
                </tr>
              ) : (
                handles.map(h => (
                  <tr key={h.handle} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, color: '#0f172a' }}>
                        <span>{h.icon}</span>
                        <span>{h.handle}</span>
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace' }}>{h.followers}</td>
                    <td style={{ padding: '14px 16px', color: '#16a34a', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace' }}>{h.growth}</td>
                    <td style={{ padding: '14px 16px', fontFamily: '"IBM Plex Mono", monospace' }}>{h.engRate}</td>
                    <td style={{ padding: '14px 16px', color: '#334155' }}>{h.topPost}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ padding: '3px 8px', borderRadius: '4px', background: '#eff6ff', color: '#2563eb', fontWeight: 600, fontSize: '11px' }}>
                        {h.reach}
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
