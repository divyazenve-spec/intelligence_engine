import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function BusinessInsights() {
  const cardStyle = {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '22px 24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
  };

  const insights = [
    {
      category: 'Clinical Operations',
      title: 'Weekend Emergency Teleconsultation Surge (+34%)',
      desc: 'Saturday and Sunday evening teleconsultations for canine gastrointestinal distress spiked by 34% over the last 3 weekends. Recommend staffing 2 additional on-call clinicians during 18:00–23:00 to reduce wait times below 4 minutes.',
      impact: '+₹1.8L Monthly Revenue',
      tag: 'Immediate Action',
      tagColor: '#ef4444'
    },
    {
      category: 'Merchandise & Nutrition',
      title: 'Hypoallergenic Diet Affinity Following Dermatology Consultations',
      desc: 'Patients diagnosed with canine atopic dermatitis by Dr. Ananya Joshi have an 88.4% conversion rate to Farmina Vet Life Hypoallergenic food when recommended within the electronic prescription checkout.',
      impact: '+42% Basket Size',
      tag: 'Growth Vector',
      tagColor: '#10b981'
    },
    {
      category: 'Fulfillment Logistics',
      title: 'Whitefield Micro-Hub Delivery Consolidation Opportunity',
      desc: 'Over 64% of deliveries in East Bengaluru occur within a 3.2km radius of the Palm Meadows clinic. Routing pharmacy dispatches directly from the clinic rather than the central warehouse cuts delivery cost from ₹78 to ₹42 per order.',
      impact: '₹1.15L OpEx Reduction',
      tag: 'Cost Optimization',
      tagColor: '#3b82f6'
    }
  ];

  return (
    <DashboardLayout
      category="AI Assistant"
      subcategory="Business Insights"
      title="Automated Business Insights & Executive Synthesis"
      subtitle="AI-synthesized operational patterns, cross-functional growth vectors, and real-time efficiency unlocks"
      icon="💡"
      badge="Daily Briefing Active"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Synthesized Insights" value="18 Active" delta="3 High Impact" trend="up" subtext="Updated 15m ago" icon="💡" />
        <KpiCard label="Estimated Revenue Value" value="₹4.75 Lakh" delta="Unlockable MTD" trend="up" subtext="Across 3 vectors" icon="💰" />
        <KpiCard label="Action Adoption Rate" value="84.2%" delta="+8% vs LY" trend="up" subtext="Operations teams" icon="🚀" />
        <KpiCard label="Efficiency Gain" value="14.8%" delta="OpEx savings" trend="up" subtext="Logistics & sourcing" icon="⚡" />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {insights.map((ins, i) => (
          <div key={i} style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{ins.category}</span>
              <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '12px', background: '#f1f5f9', color: ins.tagColor }}>
                {ins.tag}
              </span>
            </div>
            <h3 style={{ margin: '0 0 8px', fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>{ins.title}</h3>
            <p style={{ margin: '0 0 14px', fontSize: '13px', lineHeight: '1.6', color: '#475569' }}>{ins.desc}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid #f1f5f9' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#059669' }}>Projected Financial Impact: {ins.impact}</span>
              <button
                onClick={() => alert(`Initiating action workflow for: ${ins.title}`)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '6px',
                  border: '1px solid #4f46e5',
                  background: '#eef2ff',
                  color: '#4338ca',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Execute Recommendation →
              </button>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
