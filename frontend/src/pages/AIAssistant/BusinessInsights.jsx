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

  const insights = [];

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
        <KpiCard label="Synthesized Insights" value="0 Active" delta="--" trend="neutral" subtext="No active insights" icon="💡" />
        <KpiCard label="Estimated Revenue Value" value="₹0" delta="--" trend="neutral" subtext="No potential unlocked" icon="💰" />
        <KpiCard label="Action Adoption Rate" value="0.0%" delta="--" trend="neutral" subtext="No data" icon="🚀" />
        <KpiCard label="Efficiency Gain" value="0.0%" delta="--" trend="neutral" subtext="No data" icon="⚡" />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {insights.length === 0 ? (
          <div style={{ ...cardStyle, textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
            No priority business intelligence insights available
          </div>
        ) : (
          insights.map((ins, i) => (
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
          ))
        )}
      </div>
    </DashboardLayout>
  );
}
