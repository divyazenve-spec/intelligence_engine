import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function AIAssistantDashboard() {
  return (
    <DashboardLayout
      category="AI Assistant"
      subcategory="Ask Zenve AI & Executive Insights"
      title="Zenve Executive AI Assistant"
      subtitle="Natural language business intelligence, predictive anomaly detection, and automated executive briefings"
      icon="🤖"
      badge="Gemini LLM Connected"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="AI Briefing Status" value="Generated" delta="Live metrics" trend="up" subtext="Automated summary" icon="🤖" />
        <KpiCard label="Anomalies Detected" value="0 Critical" delta="Normal" trend="up" subtext="Sales within 2σ" icon="🛡️" />
        <KpiCard label="Demand Predictions" value="94.2% Acc" delta="High precision" trend="up" subtext="Inventory forecast" icon="📈" />
        <KpiCard label="Queries Processed" value="1,840" delta="Sub-second" trend="neutral" subtext="Executive questions" icon="⚡" />
      </div>

      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 12px', fontSize: '15px', fontWeight: 700 }}>Executive AI Automated Briefing</h3>
        <p style={{ margin: '0 0 16px', fontSize: '13px', lineHeight: '1.6', color: 'var(--foreground, #f8fafc)' }}>
          "Overall revenue trajectory is positive (+18.4% WoW). High volume concentration in Bengaluru (32.4%) and Mumbai (24.2%). Mobile acquisition velocity on Android remains the primary top-of-funnel driver with 576 orders, while iOS yields 20% higher basket sizes. Inventory for Bravecto and Royal Canin requires replenishment in the Koramangala hub within 48 hours."
        </p>
      </div>
    </DashboardLayout>
  );
}
