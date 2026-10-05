import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function KpiDashboard() {
  const cardStyle = {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '22px 24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
  };

  const kpis = [
    { category: 'Financial & Growth', metric: 'Average Revenue Per User (ARPU)', target: '₹2,300', actual: '₹2,450', variance: '+6.5%', status: 'Healthy' },
    { category: 'Financial & Growth', metric: 'Customer Lifetime Value (LTV)', target: '₹22,000', actual: '₹24,800', variance: '+12.7%', status: 'Healthy' },
    { category: 'Financial & Growth', metric: 'Customer Acquisition Cost (CAC)', target: '< ₹4,500', actual: '₹4,280', variance: '-4.9%', status: 'Healthy' },
    { category: 'Operations & Fulfillment', metric: '60-Min Hyperlocal SLA Adherence', target: '97.5%', actual: '98.4%', variance: '+0.9%', status: 'Healthy' },
    { category: 'Operations & Fulfillment', metric: 'Delivery Cost per Order', target: '< ₹75', actual: '₹68.50', variance: '-8.7%', status: 'Healthy' },
    { category: 'Operations & Fulfillment', metric: 'Order Return & RTO Rate', target: '< 4.0%', actual: '3.1%', variance: '-22.5%', status: 'Healthy' },
    { category: 'Clinical & Quality', metric: 'Doctor Clinical Quota Attainment', target: '100.0%', actual: '105.2%', variance: '+5.2%', status: 'Healthy' },
    { category: 'Clinical & Quality', metric: 'Tertiary Hospital Bed Occupancy', target: '80.0%', actual: '84.2%', variance: '+4.2%', status: 'Healthy' },
    { category: 'Clinical & Quality', metric: 'Diagnostic & Lab Accuracy SLA', target: '99.0%', actual: '99.4%', variance: '+0.4%', status: 'Healthy' },
    { category: 'Customer & Brand', metric: 'Customer Retention Rate (M1)', target: '88.0%', actual: '91.2%', variance: '+3.2%', status: 'Healthy' },
    { category: 'Customer & Brand', metric: 'Customer Net Promoter Score (NPS)', target: '70', actual: '74', variance: '+5.7%', status: 'Healthy' },
    { category: 'Customer & Brand', metric: 'Complaint Resolution SLA (<4h)', target: '95.0%', actual: '98.2%', variance: '+3.2%', status: 'Healthy' }
  ];

  return (
    <DashboardLayout
      category="Executive Dashboard"
      subcategory="KPI Dashboard"
      title="Enterprise Master KPI Scorecard"
      subtitle="Strategic performance indicators across financial growth, operational velocity, clinical care, and customer satisfaction"
      icon="📊"
      badge="Scorecard Live"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Overall Scorecard Health" value="98.2%" delta="12 of 12 Met" trend="up" subtext="No red metrics" icon="✅" />
        <KpiCard label="Customer NPS" value="74" delta="+4 pts QoQ" trend="up" subtext="Top decile in vet care" icon="⭐" />
        <KpiCard label="Delivery SLA Velocity" value="98.4%" delta="42m average" trend="up" subtext="Hyperlocal fleet" icon="⚡" />
        <KpiCard label="Gross Margin" value="37.3%" delta="+2.4% YoY" trend="up" subtext="Direct sourcing boost" icon="💎" />
      </div>

      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Cross-Enterprise KPI Performance Matrix</h3>
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#10b981', background: '#ecfdf5', padding: '3px 8px', borderRadius: '12px' }}>All 12 KPIs On Track</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>CATEGORY</th>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>STRATEGIC KPI</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'right' }}>BENCHMARK TARGET</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'right' }}>ACTUAL PERFORMANCE</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'right' }}>VARIANCE</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'center' }}>HEALTH STATUS</th>
              </tr>
            </thead>
            <tbody>
              {kpis.map((kpi, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 16px', color: '#64748b', fontWeight: 500 }}>{kpi.category}</td>
                  <td style={{ padding: '12px 16px', color: '#0f172a', fontWeight: 600 }}>{kpi.metric}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#475569' }}>{kpi.target}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#0f172a' }}>{kpi.actual}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 600, color: '#059669' }}>{kpi.variance}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                    <span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '12px', background: '#ecfdf5', color: '#047857' }}>
                      ● {kpi.status}
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
