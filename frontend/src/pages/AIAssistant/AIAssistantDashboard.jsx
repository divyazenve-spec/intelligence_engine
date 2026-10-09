import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function AIAssistantDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const cardStyle = {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '22px 24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
  };

  const aiModules = [];

  return (
    <DashboardLayout
      category="AI Assistant"
      subcategory="Executive Intelligence Portal"
      title="Zenve Executive AI Assistant Suite"
      subtitle="Comprehensive natural language business intelligence, predictive models, and autonomous prescriptive decisions"
      icon="🤖"
      badge="All 11 Models Online"
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => { window.location.hash = '#ask-zenve-ai'; }}
            style={{
              padding: '7px 14px',
              borderRadius: '8px',
              border: '1px solid #6366f1',
              background: '#6366f1',
              color: '#ffffff',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            💬 Open Ask Zenve AI
          </button>
        </div>
      }
    >
      {/* KPI Vitals */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '20px' }}>
        <KpiCard label="Prediction Accuracy" value="0.0%" delta="--" trend="neutral" subtext="No baseline records" icon="🎯" />
        <KpiCard label="Anomalies Flagged" value="0 Active" delta="--" trend="neutral" subtext="No active anomalies" icon="🔍" />
        <KpiCard label="Identified Growth" value="₹0" delta="--" trend="neutral" subtext="No growth opportunities detected" icon="💹" />
        <KpiCard label="Queries Processed" value="0" delta="--" trend="neutral" subtext="No queries processed" icon="⚡" />
      </div>

      {/* Overview Grid */}
      <div style={{ ...cardStyle, marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>AI Autonomous Modules (11 Subdomains)</h3>
            <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#64748b' }}>Select any AI subdomain below or use the sidebar navigation</p>
          </div>
          <span style={{ fontSize: '12px', background: '#ecfdf5', color: '#059669', padding: '4px 10px', borderRadius: '999px', fontWeight: 600 }}>
            ● Real-Time Inference Live
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '14px' }}>
          {aiModules.map((mod) => (
            <div
              key={mod.id}
              onClick={() => { window.location.hash = `#${mod.id}`; }}
              style={{
                border: '1px solid #e2e8f0',
                borderRadius: '10px',
                padding: '16px',
                background: '#f8fafc',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#6366f1'; e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(99,102,241,0.08)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '20px' }}>{mod.icon}</span>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>{mod.title}</span>
                  </div>
                  <span style={{ fontSize: '11px', background: '#e0e7ff', color: '#4338ca', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                    {mod.badge}
                  </span>
                </div>
                <p style={{ margin: '0 0 12px', fontSize: '12px', color: '#475569', lineHeight: '1.5' }}>
                  {mod.desc}
                </p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', fontSize: '12px', color: '#6366f1', fontWeight: 600 }}>
                Launch Subdomain →
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Autonomous Executive Briefing */}
      <div style={cardStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <span style={{ fontSize: '20px' }}>🧠</span>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Today's AI Autonomous Briefing</h3>
        </div>
        <p style={{ margin: '0 0 14px', fontSize: '13px', lineHeight: '1.65', color: '#334155' }}>
          "Overall enterprise margin velocity is exceeding target by 1.8% driven by high-ticket orthopedic surgeries and companion therapeutic nutrition sales. However, <strong>Koramangala Hub</strong> exhibits a demand inflection for Bravecto chewables that will trigger inventory exhaustion within 44 hours unless transfer PO-8821 is dispatched. Customer churn among 180-day lapsed puppy owners decreased by 22% following the automated WhatsApp booster reminder campaign."
        </p>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '12px', padding: '4px 10px', borderRadius: '6px', background: '#eff6ff', color: '#1e40af', fontWeight: 500 }}>
            Target Achievement: 104.2%
          </span>
          <span style={{ fontSize: '12px', padding: '4px 10px', borderRadius: '6px', background: '#fef3c7', color: '#92400e', fontWeight: 500 }}>
            Action Required: Bravecto Hub Transfer
          </span>
          <span style={{ fontSize: '12px', padding: '4px 10px', borderRadius: '6px', background: '#f0fdf4', color: '#166534', fontWeight: 500 }}>
            Retention Uplift: +₹0 / Mo
          </span>
        </div>
      </div>
    </DashboardLayout>
  );
}
