import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';
import Campaigns from './Campaigns';
import Leads from './Leads';
import LeadSources from './LeadSources';
import WebsiteAnalytics from './WebsiteAnalytics';
import AppAnalytics from './AppAnalytics';
import SocialMedia from './SocialMedia';
import Advertising from './Advertising';
import MarketingSpend from './MarketingSpend';
import CustomerAcquisition from './CustomerAcquisition';
import CAC from './CAC';
import ROAS from './ROAS';
import MarketingROI from './MarketingROI';
import ConversionFunnel from './ConversionFunnel';

export default function MarketingDashboard() {
  const [activeSubcategory, setActiveSubcategory] = useState('overview');

  const subcategories = [];

  if (activeSubcategory === 'campaigns') return <Campaigns />;
  if (activeSubcategory === 'leads') return <Leads />;
  if (activeSubcategory === 'lead-sources') return <LeadSources />;
  if (activeSubcategory === 'website-analytics') return <WebsiteAnalytics />;
  if (activeSubcategory === 'app-analytics') return <AppAnalytics />;
  if (activeSubcategory === 'social-media') return <SocialMedia />;
  if (activeSubcategory === 'advertising') return <Advertising />;
  if (activeSubcategory === 'marketing-spend') return <MarketingSpend />;
  if (activeSubcategory === 'customer-acquisition') return <CustomerAcquisition />;
  if (activeSubcategory === 'cac') return <CAC />;
  if (activeSubcategory === 'roas') return <ROAS />;
  if (activeSubcategory === 'marketing-roi') return <MarketingROI />;
  if (activeSubcategory === 'conversion-funnel') return <ConversionFunnel />;

  return (
    <DashboardLayout
      category="Marketing"
      subcategory="Marketing Dashboard"
      title="Marketing & Growth Command Center"
      subtitle="Complete multi-channel intelligence: campaigns, pet parent leads, ad spend efficiency, CAC, ROAS & conversion funnels"
      icon="📣"
      badge=""
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setActiveSubcategory('campaigns')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 600,
              background: '#2563eb',
              color: '#ffffff',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Launch Campaign 🚀
          </button>
        </div>
      }
    >
      {/* Subcategory Switcher Chips */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        padding: '12px',
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '10px'
      }}>
        {subcategories.map(sc => (
          <button
            key={sc.id}
            onClick={() => setActiveSubcategory(sc.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              border: activeSubcategory === sc.id ? '1px solid #2563eb' : '1px solid #e2e8f0',
              background: activeSubcategory === sc.id ? '#eff6ff' : '#ffffff',
              color: activeSubcategory === sc.id ? '#2563eb' : '#475569',
              transition: 'all 0.15s ease'
            }}
          >
            <span>{sc.icon}</span>
            <span>{sc.label}</span>
          </button>
        ))}
      </div>

      {/* Primary KPI Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Ad Spend" value="₹0" delta="-5.4% under budget" trend="up" subtext="Meta, Google, In-App" icon="💳" />
        <KpiCard label="Acquired Leads" value="0" delta="0.0%" trend="up" subtext="Inbound & app clicks" icon="🎯" />
        <KpiCard label="Blended CAC" value="₹0" delta="-8.4%" trend="up" subtext="Industry benchmark: ₹0" icon="👥" />
        <KpiCard label="Blended ROAS" value="4.45x" delta="0.0%" trend="up" subtext="₹0 attributed GMV" icon="🚀" />
      </div>

      {/* Grid of Main Channels & Funnel Snapshot */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '16px' }}>
        {/* Top Channels */}
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Top Acquisition Channels</h3>
            <button onClick={() => setActiveSubcategory('lead-sources')} style={{ fontSize: '12px', color: '#2563eb', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>View All Sources →</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { name: 'Google Search Ads', leads: '6,420', roas: '5.2x', share: '34.8%', color: '#3b82f6' },
              { name: 'Meta Instagram & Reels', leads: '4,180', roas: '4.1x', share: '22.7%', color: '#ec4899' },
              { name: 'Vet Clinic Referral Network', leads: '2,940', roas: '5.8x', share: '16.0%', color: '#10b981' },
              { name: 'In-App Viral Invites', leads: '2,450', roas: '6.4x', share: '13.3%', color: '#f59e0b' },
              { name: 'Organic SEO & Pet Guides', leads: '1,650', roas: 'N/A', share: '9.0%', color: '#8b5cf6' }
            ].map(ch => (
              <div key={ch.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: '#f8fafc', borderRadius: '8px' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '13px', color: '#0f172a' }}>{ch.name}</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>{ch.leads} leads · {ch.share} share</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ padding: '2px 8px', borderRadius: '4px', background: '#dcfce7', color: '#15803d', fontWeight: 700, fontSize: '12px' }}>
                    {ch.roas} ROAS
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Funnel Preview */}
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Conversion Velocity & Drop-Off</h3>
            <button onClick={() => setActiveSubcategory('conversion-funnel')} style={{ fontSize: '12px', color: '#2563eb', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>Deep Funnel →</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { label: 'Ad Impressions', val: '1.84M', pct: '100%', color: '#3b82f6' },
              { label: 'Website & App Clicks', val: '148,000', pct: '8.0%', color: '#0ea5e9' },
              { label: 'Pet Parent Leads', val: '32,400', pct: '21.9%', color: '#10b981' },
              { label: 'Consult / Cart Initiated', val: '12,800', pct: '39.5%', color: '#f59e0b' },
              { label: 'Paid Orders Completed', val: '4,720', pct: '36.9%', color: '#ec4899' }
            ].map(fn => (
              <div key={fn.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 600, color: '#334155' }}>{fn.label}</span>
                  <span style={{ fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{fn.val} ({fn.pct})</span>
                </div>
                <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '99px', overflow: 'hidden' }}>
                  <div style={{ width: fn.pct, height: '100%', background: fn.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
