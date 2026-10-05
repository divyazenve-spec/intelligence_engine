import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function WebsiteAnalytics() {
  const topPages = [
    { path: '/vet-telehealth-booking', title: 'Online Vet Consultation & Instant Video Call', views: '84,500', unique: '61,200', time: '3m 42s', bounce: '28.4%', conv: '18.2%' },
    { path: '/pet-pharmacy/monsoon-flea-tick', title: 'Prescription Flea & Tick Treatments', views: '62,800', unique: '48,900', time: '2m 58s', bounce: '31.6%', conv: '22.4%' },
    { path: '/puppy-first-year-health-guide', title: 'Puppy Vaccination & Deworming Protocol', views: '45,200', unique: '38,100', time: '4m 15s', bounce: '36.8%', conv: '11.8%' },
    { path: '/zenve-fashion/dog-apparel', title: 'Luxury Canine Jackets & Harness Collection', views: '38,900', unique: '29,400', time: '2m 12s', bounce: '34.2%', conv: '14.5%' },
    { path: '/clinic-locator/bengaluru-mumbai', title: 'Zenve Partner Hospitals & Emergency Centers', views: '29,400', unique: '24,800', time: '1m 45s', bounce: '24.1%', conv: '28.9%' }
  ];

  return (
    <DashboardLayout
      category="Marketing"
      subcategory="Website Analytics"
      title="Digital Web Traffic & Behavioral Analytics"
      subtitle="Web traffic trends, session duration, landing page conversion, and visitor engagement"
      icon="💻"
      badge="260.8K Monthly Visitors"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Monthly Unique Visitors" value="260,800" delta="+24.2%" trend="up" subtext="72% Mobile web traffic" icon="👥" />
        <KpiCard label="Avg Session Duration" value="3m 14s" delta="+18s" trend="up" subtext="Benchmark: 2m 20s" icon="⏱️" />
        <KpiCard label="Sitewide Bounce Rate" value="31.2%" delta="-3.8%" trend="up" subtext="Lower is better" icon="📉" />
        <KpiCard label="Goal Conversion Rate" value="14.8%" delta="+2.6%" trend="up" subtext="Add to Cart & Booking" icon="🎯" />
      </div>

      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Top Performing Pet Health Landing Pages</h3>
          <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>Page engagement, dwell time, and downstream consult or cart completion</p>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <th style={{ padding: '12px 16px' }}>Landing Page URL & Content</th>
                <th style={{ padding: '12px 16px' }}>Total Views</th>
                <th style={{ padding: '12px 16px' }}>Unique Visitors</th>
                <th style={{ padding: '12px 16px' }}>Avg Time on Page</th>
                <th style={{ padding: '12px 16px' }}>Bounce Rate</th>
                <th style={{ padding: '12px 16px' }}>Goal Conv. Rate</th>
              </tr>
            </thead>
            <tbody>
              {topPages.map(p => (
                <tr key={p.path} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontWeight: 600, color: '#0f172a' }}>{p.title}</div>
                    <div style={{ fontSize: '11px', color: '#2563eb', fontFamily: '"IBM Plex Mono", monospace' }}>{p.path}</div>
                  </td>
                  <td style={{ padding: '14px 16px', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace' }}>{p.views}</td>
                  <td style={{ padding: '14px 16px', fontFamily: '"IBM Plex Mono", monospace', color: '#475569' }}>{p.unique}</td>
                  <td style={{ padding: '14px 16px', fontFamily: '"IBM Plex Mono", monospace' }}>{p.time}</td>
                  <td style={{ padding: '14px 16px', fontFamily: '"IBM Plex Mono", monospace', color: '#64748b' }}>{p.bounce}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ padding: '3px 8px', borderRadius: '4px', background: '#dcfce7', color: '#15803d', fontWeight: 700, fontSize: '12px' }}>
                      {p.conv}
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
