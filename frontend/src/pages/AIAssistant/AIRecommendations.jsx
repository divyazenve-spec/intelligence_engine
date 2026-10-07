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

  const recommendations = [];

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
        <KpiCard label="High-Impact Actions" value="4 Ready" delta="₹0 Total ROI" trend="up" subtext="Pre-calculated ROI" icon="⚡" />
        <KpiCard label="Average Implementation" value="< 2 Hours" delta="Automated flows" trend="up" subtext="Low operational drag" icon="⏱️" />
        <KpiCard label="Recommendation Accuracy" value="0.0%" delta="Verified impact" trend="up" subtext="Historical tracking" icon="🎯" />
        <KpiCard label="Cumulative Value Created" value="₹0" delta="Since launch" trend="up" subtext="Validated by CFO" icon="💎" />
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
