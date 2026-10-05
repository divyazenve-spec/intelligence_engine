import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function ChurnPrediction() {
  const cardStyle = {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '22px 24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
  };

  const churnCohorts = [
    { cohort: 'Cancelled Wellness Plan Subscribers', users: 142, riskScore: '88.4%', rootCause: 'Missed doctor follow-up checkin', intervention: 'Specialist concierge call + free dental voucher', recoveryRate: '44.2%' },
    { cohort: 'Lapsed Single-Purchase App Users (>60d)', users: 380, riskScore: '76.2%', rootCause: 'Fulfillment delay on first order', intervention: '₹300 wallet credit + priority 60m delivery', recoveryRate: '31.8%' },
    { cohort: 'Grooming-Only Clients (No Vet Consult)', users: 215, riskScore: '64.5%', rootCause: 'Never introduced to clinical services', intervention: 'Complimentary general health check voucher', recoveryRate: '52.1%' },
    { cohort: 'Multi-Pet Parents with Decreased Frequency', users: 84, riskScore: '58.0%', rootCause: 'Competitor price shopping on bulk food', intervention: 'VIP multi-pet bundle 12% subscription discount', recoveryRate: '68.4%' }
  ];

  return (
    <DashboardLayout
      category="AI Assistant"
      subcategory="Churn Prediction"
      title="Predictive Churn Radar & Proactive Retention Playbooks"
      subtitle="Early-warning indicators, churn risk probability distributions, and automated win-back intervention funnels"
      icon="🛡️"
      badge="Early Warning Churn Radar"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Overall Churn Risk Index" value="8.8%" delta="-2.1% vs Q2" trend="down" subtext="Best-in-class" icon="🛡️" />
        <KpiCard label="High-Risk Pet Parents" value="226 Users" delta="1.8% of Base" trend="neutral" subtext="In intervention queue" icon="⚠️" />
        <KpiCard label="Intervention Win-Back Rate" value="48.6%" delta="+6.4% YoY" trend="up" subtext="Recovered revenue" icon="🔄" />
        <KpiCard label="Protected Annual Revenue" value="₹18.40 Lakh" delta="LTV preserved" trend="up" subtext="Proactive playbooks" icon="💎" />
      </div>

      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>At-Risk Cohorts & Automated Retention Playbooks</h3>
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#10b981' }}>Model: Survival Analysis + Random Forest</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>AT-RISK COHORT</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'right' }}>USERS</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'center' }}>CHURN PROBABILITY</th>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>PRIMARY DECAY CAUSE</th>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>AUTOMATED INTERVENTION</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'right' }}>WIN-BACK RATE</th>
              </tr>
            </thead>
            <tbody>
              {churnCohorts.map((c, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>{c.cohort}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{c.users}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: '12px',
                      background: parseFloat(c.riskScore) > 75 ? '#fee2e2' : '#fef3c7',
                      color: parseFloat(c.riskScore) > 75 ? '#991b1b' : '#92400e'
                    }}>
                      {c.riskScore}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', color: '#64748b' }}>{c.rootCause}</td>
                  <td style={{ padding: '12px 16px', color: '#2563eb', fontWeight: 500 }}>{c.intervention}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 700, color: '#059669' }}>{c.recoveryRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
