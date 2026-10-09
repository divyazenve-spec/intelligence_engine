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

  const subcategories = [
    { id: 'campaigns', label: 'Campaigns', icon: '🚀' },
    { id: 'leads', label: 'Leads', icon: '🎯' },
    { id: 'lead-sources', label: 'Lead Sources', icon: '🌐' },
    { id: 'website-analytics', label: 'Website Analytics', icon: '💻' },
    { id: 'app-analytics', label: 'App Analytics', icon: '📱' },
    { id: 'social-media', label: 'Social Media', icon: '📸' },
    { id: 'advertising', label: 'Advertising', icon: '📢' },
    { id: 'marketing-spend', label: 'Marketing Spend', icon: '💰' },
    { id: 'customer-acquisition', label: 'Customer Acquisition', icon: '🐾' },
    { id: 'cac', label: 'CAC', icon: '🎯' },
    { id: 'roas', label: 'ROAS', icon: '🚀' },
    { id: 'marketing-roi', label: 'Marketing ROI', icon: '💎' },
    { id: 'conversion-funnel', label: 'Conversion Funnel', icon: '⚡' },
  ];

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
        <KpiCard label="Total Ad Spend" value="₹0" delta="0.0%" trend="neutral" subtext="Meta, Google, In-App" icon="💳" />
        <KpiCard label="Acquired Leads" value="0" delta="0.0%" trend="neutral" subtext="Inbound & app clicks" icon="🎯" />
        <KpiCard label="Blended CAC" value="₹0" delta="0.0%" trend="neutral" subtext="Industry benchmark: ₹0" icon="👥" />
        <KpiCard label="Blended ROAS" value="0.0x" delta="0.0%" trend="neutral" subtext="₹0 attributed GMV" icon="🚀" />
      </div>

      {/* Grid of Main Channels & Funnel Snapshot */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '16px' }}>
        {/* Top Channels */}
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Top Acquisition Channels</h3>
            <button onClick={() => setActiveSubcategory('lead-sources')} style={{ fontSize: '12px', color: '#2563eb', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>View All Sources →</button>
          </div>
          <div style={{ padding: '32px 16px', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}>
            No acquisition channel data available
          </div>
        </div>

        {/* Funnel Preview */}
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Conversion Velocity & Drop-Off</h3>
            <button onClick={() => setActiveSubcategory('conversion-funnel')} style={{ fontSize: '12px', color: '#2563eb', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>Deep Funnel →</button>
          </div>
          <div style={{ padding: '32px 16px', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}>
            No conversion funnel velocity recorded
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
