import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function CustomerSegmentation() {
  const segments = [];

  const cardStyle = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Customers 360°"
      subcategory="Behavioral & Persona Clusters"
      title="Customer Segmentation & Behavioral Clusters"
      subtitle="RFM analysis, pet life-stage clustering, basket composition patterns, and tailored marketing playbooks"
      icon="🧩"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Persona Segments" value="0" delta="--" trend="neutral" subtext="Dynamic daily cluster updates" icon="🧩" />
        <KpiCard label="Multi-Pet Cluster Share" value="0.0%" delta="0.0%" trend="neutral" subtext="No households" icon="🐾" />
        <KpiCard label="Senior & Chronic Care" value="0.0%" delta="0.0%" trend="neutral" subtext="No recurring spend" icon="🩺" />
        <KpiCard label="Segment Campaign ROAS" value="0.0x" delta="--" trend="neutral" subtext="Hyper-personalized recommendations" icon="🎯" />
      </div>

      <div style={cardStyle}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>🧩 Behavioral Cohorts & Customer Segmentation Matrix</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border, #e2e8f0)', textAlign: 'left', color: 'var(--muted-foreground, #475569)' }}>
                <th style={{ padding: '10px' }}>Segment Persona</th>
                <th style={{ padding: '10px' }}>Customer Count</th>
                <th style={{ padding: '10px' }}>Base Share</th>
                <th style={{ padding: '10px' }}>Distinct Purchasing Behavior</th>
                <th style={{ padding: '10px' }}>Avg Basket (AOV)</th>
                <th style={{ padding: '10px' }}>Annual ARPU</th>
                <th style={{ padding: '10px' }}>Active CRM Campaign</th>
              </tr>
            </thead>
            <tbody>
              {segments.length === 0 ? (<tr><td colSpan="7" style={{ textAlign: "center", padding: "32px", color: "var(--muted-foreground, #64748b)" }}>No persona segment records found</td></tr>) : segments.map((s, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{s.name}</td>
                  <td style={{ padding: '10px', fontWeight: 600, color: '#2563eb' }}>{s.count.toLocaleString()}</td>
                  <td style={{ padding: '10px' }}>{s.share}</td>
                  <td style={{ padding: '10px', color: '#475569' }}>{s.behavior}</td>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{s.aov}</td>
                  <td style={{ padding: '10px', fontWeight: 700, color: '#059669' }}>{s.arpu}</td>
                  <td style={{ padding: '10px', color: '#64748b' }}>{s.campaign}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
