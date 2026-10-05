import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function AIRecommendations() {
  const cardStyle = {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '22px 24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
  };

  const recommendations = [
    {
      id: 'REC-01',
      title: 'Automate Bravecto Reorder for Indiranagar & Whitefield Hubs',
      category: 'Procurement & Inventory',
      impact: '+₹2.4L Protected Sales',
      effort: 'Low (1-Click)',
      rationale: 'Projected demand will exhaust existing 142 units in 6 days based on seasonal tick surge velocity in Bengaluru.',
      actionText: 'Execute Auto-PO'
    },
    {
      id: 'REC-02',
      title: 'Deploy Dynamic Surge Rate for Weekend Emergency Surgery Triage',
      category: 'Pricing & Monetization',
      impact: '+15% Realization / OT Hr',
      effort: 'Low (Configuration)',
      rationale: 'Surgical OT capacity reaches 94% between Friday 17:00 and Sunday 22:00. Price sensitivity during emergency trauma is inelastic.',
      actionText: 'Apply Surge Rule'
    },
    {
      id: 'REC-03',
      title: 'Launch Feline Geriatric Screening Campaign to Persian Cat Owners',
      category: 'Clinical Health Outreach',
      impact: '180 Preventive Visits',
      effort: 'Medium (Automated CRM)',
      rationale: 'Persian cats aged 6+ years have an 82% renal biomarker detection yield when screened in Q4.',
      actionText: 'Dispatch WhatsApp Campaign'
    },
    {
      id: 'REC-04',
      title: 'Consolidate Mumbai Metro Micro-Hub Deliveries with In-House Vets',
      category: 'Logistics Optimization',
      impact: '₹1.15L OpEx Savings/Mo',
      effort: 'Medium (Routing Update)',
      rationale: 'Transitioning 64% of deliveries to clinic-attached hyper-local runners reduces third-party courier dispatch cost.',
      actionText: 'Update Routing Model'
    }
  ];

  return (
    <DashboardLayout
      category="AI Assistant"
      subcategory="AI Recommendations"
      title="Prioritized AI Executive Recommendations Queue"
      subtitle="Ranked high-ROI interventions across supply chain, clinical operations, pricing strategy, and marketing"
      icon="⚡"
      badge="High-Impact Recommendations"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="High-Impact Actions" value="4 Ready" delta="₹4.8L Total ROI" trend="up" subtext="Pre-calculated ROI" icon="⚡" />
        <KpiCard label="Average Implementation" value="< 2 Hours" delta="Automated flows" trend="up" subtext="Low operational drag" icon="⏱️" />
        <KpiCard label="Recommendation Accuracy" value="96.4%" delta="Verified impact" trend="up" subtext="Historical tracking" icon="🎯" />
        <KpiCard label="Cumulative Value Created" value="₹24.8L" delta="Since launch" trend="up" subtext="Validated by CFO" icon="💎" />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {recommendations.map(rec => (
          <div key={rec.id} style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '11px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#4f46e5' }}>{rec.id}</span>
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748b' }}>• {rec.category}</span>
              </div>
              <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '12px', background: '#ecfdf5', color: '#047857' }}>
                {rec.impact}
              </span>
            </div>
            <h3 style={{ margin: '0 0 8px', fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>{rec.title}</h3>
            <p style={{ margin: '0 0 16px', fontSize: '13px', lineHeight: '1.6', color: '#475569' }}>{rec.rationale}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid #f1f5f9' }}>
              <span style={{ fontSize: '12px', color: '#64748b' }}>Operational Effort: <b style={{ color: '#0f172a' }}>{rec.effort}</b></span>
              <button
                onClick={() => alert(`Applied recommendation: ${rec.title}`)}
                style={{
                  padding: '7px 16px',
                  borderRadius: '6px',
                  border: 'none',
                  background: '#4f46e5',
                  color: '#ffffff',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {rec.actionText} →
              </button>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
