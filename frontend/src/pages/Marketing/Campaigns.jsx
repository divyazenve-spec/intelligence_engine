import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function Campaigns() {
  const [filter, setFilter] = useState('ALL');
  const [campaigns, setCampaigns] = useState([
    { id: 'CMP-201', name: 'Puppy Vaccination & Vet Care 2026', channel: 'Meta (Insta & FB)', budget: '₹2,50,000', spend: '₹2,14,000', impressions: '540K', clicks: '24,200', ctr: '4.48%', conv: '1,420', cac: '₹150', roas: '4.8x', status: 'Active' },
    { id: 'CMP-202', name: 'Emergency 60-Min Pet Pharmacy Rx', channel: 'Google Search Ads', budget: '₹1,80,000', spend: '₹1,65,000', impressions: '210K', clicks: '18,900', ctr: '9.00%', conv: '1,180', cac: '₹140', roas: '5.2x', status: 'Active' },
    { id: 'CMP-203', name: 'Monsoon Canine Tick & Flea Shield', channel: 'Meta Instagram Reels', budget: '₹1,50,000', spend: '₹1,42,000', impressions: '420K', clicks: '16,500', ctr: '3.93%', conv: '760', cac: '₹187', roas: '3.9x', status: 'Active' },
    { id: 'CMP-204', name: 'Bengaluru Top Vet Tele-Consult Co-Op', channel: 'YouTube Video Ads', budget: '₹1,20,000', spend: '₹95,000', impressions: '310K', clicks: '8,400', ctr: '2.71%', conv: '380', cac: '₹250', roas: '3.4x', status: 'Active' },
    { id: 'CMP-205', name: 'Zenve Fashion Designer Harness Launch', channel: 'Influencer Collabs', budget: '₹90,000', spend: '₹90,000', impressions: '190K', clicks: '9,800', ctr: '5.16%', conv: '410', cac: '₹220', roas: '3.1x', status: 'Completed' },
    { id: 'CMP-206', name: 'Diwali Pet Gourmet Nutrition Box', channel: 'WhatsApp & SMS', budget: '₹60,000', spend: '₹12,000', impressions: '85K', clicks: '11,200', ctr: '13.18%', conv: '620', cac: '₹19', roas: '6.8x', status: 'Scheduled' }
  ]);

  const filtered = campaigns.filter(c => filter === 'ALL' || c.status === filter);

  return (
    <DashboardLayout
      category="Marketing"
      subcategory="Campaigns"
      title="Omni-Channel Marketing Campaigns"
      subtitle="Live campaign flighting, channel allocation, lead conversions, and real-time ROAS"
      icon="🚀"
      badge={`${campaigns.filter(c => c.status === 'Active').length} Active Campaigns`}
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          {['ALL', 'Active', 'Scheduled', 'Completed'].map(st => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                border: filter === st ? '1px solid #2563eb' : '1px solid #e2e8f0',
                background: filter === st ? '#eff6ff' : '#ffffff',
                color: filter === st ? '#2563eb' : '#64748b'
              }}
            >
              {st}
            </button>
          ))}
        </div>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Campaign Spend" value="₹7,18,000" delta="-6.2% vs Plan" trend="up" subtext="Across 6 active flights" icon="💳" />
        <KpiCard label="Ad Impressions" value="1.75M" delta="+22.4%" trend="up" subtext="Meta, Google, YouTube" icon="👁️" />
        <KpiCard label="Click-Through Rate" value="5.12%" delta="+0.84%" trend="up" subtext="Benchmark: 3.2%" icon="🖱️" />
        <KpiCard label="Campaign Conversions" value="4,770" delta="+18.9%" trend="up" subtext="Orders & consultations" icon="🎯" />
      </div>

      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Live Campaign Registry</h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>Flight metrics, attribution channels, and ad spend efficiency</p>
          </div>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#2563eb' }}>{filtered.length} Campaigns</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <th style={{ padding: '12px 16px' }}>Campaign Name</th>
                <th style={{ padding: '12px 16px' }}>Channel</th>
                <th style={{ padding: '12px 16px' }}>Spend / Budget</th>
                <th style={{ padding: '12px 16px' }}>Impressions</th>
                <th style={{ padding: '12px 16px' }}>CTR</th>
                <th style={{ padding: '12px 16px' }}>Conversions</th>
                <th style={{ padding: '12px 16px' }}>CAC</th>
                <th style={{ padding: '12px 16px' }}>ROAS</th>
                <th style={{ padding: '12px 16px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontWeight: 600, color: '#0f172a' }}>{c.name}</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8', fontFamily: '"IBM Plex Mono", monospace' }}>{c.id}</div>
                  </td>
                  <td style={{ padding: '14px 16px', color: '#334155' }}>{c.channel}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontWeight: 600, color: '#0f172a', fontFamily: '"IBM Plex Mono", monospace' }}>{c.spend}</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>Plan: {c.budget}</div>
                  </td>
                  <td style={{ padding: '14px 16px', fontFamily: '"IBM Plex Mono", monospace' }}>{c.impressions}</td>
                  <td style={{ padding: '14px 16px', fontFamily: '"IBM Plex Mono", monospace', color: '#16a34a', fontWeight: 600 }}>{c.ctr}</td>
                  <td style={{ padding: '14px 16px', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace' }}>{c.conv}</td>
                  <td style={{ padding: '14px 16px', fontFamily: '"IBM Plex Mono", monospace', color: '#2563eb' }}>{c.cac}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '3px 8px',
                      borderRadius: '99px',
                      fontSize: '11px',
                      fontWeight: 700,
                      background: parseFloat(c.roas) >= 4.0 ? '#dcfce7' : '#e0f2fe',
                      color: parseFloat(c.roas) >= 4.0 ? '#15803d' : '#0369a1'
                    }}>
                      {c.roas}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: c.status === 'Active' ? '#f0fdf4' : c.status === 'Scheduled' ? '#eff6ff' : '#f8fafc',
                      color: c.status === 'Active' ? '#16a34a' : c.status === 'Scheduled' ? '#2563eb' : '#64748b',
                      border: `1px solid ${c.status === 'Active' ? '#bbf7d0' : c.status === 'Scheduled' ? '#bfdbfe' : '#e2e8f0'}`
                    }}>
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
