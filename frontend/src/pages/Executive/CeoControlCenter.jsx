import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function CeoControlCenter() {
  const cardStyle = {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '22px 24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
  };

  const okrs = [
    { title: 'Enterprise Revenue Scale', target: '₹55.0L MTD', current: '₹51.65L', pct: 93.9, status: 'On Track', color: '#10b981' },
    { title: 'Clinical Accreditation & VCI Audit', target: '100% Facilities', current: '14 / 14 Clinics', pct: 100, status: 'Completed', color: '#3b82f6' },
    { title: '60-Minute Urban Delivery Coverage', target: '98.0% SLA', current: '98.4% SLA', pct: 100.4, status: 'Exceeded', color: '#10b981' },
    { title: 'Private-Label Veterinary Nutrition', target: '₹8.0L MTD', current: '₹6.45L', pct: 80.6, status: 'Attention', color: '#f59e0b' },
    { title: 'Operating Margin Expansion (EBITDA)', target: '18.0%', current: '16.9%', pct: 93.8, status: 'On Track', color: '#10b981' }
  ];

  const decisions = [
    { id: 'DEC-084', action: 'Approve Koramangala Tertiary Hospital Expansion (8 new ICU beds)', owner: 'Dr. Ramesh / COO', priority: 'High', date: 'Today' },
    { id: 'DEC-083', action: 'Sign Direct Supply Contract with Zoetis Pharmaceuticals (5% margin boost)', owner: 'CFO / Supply Chain', priority: 'High', date: 'Yesterday' },
    { id: 'DEC-082', action: 'Rollout Hyderabad Cluster 60-Minute Hyperlocal Micro-Hubs (3 sites)', owner: 'VP Logistics', priority: 'Medium', date: 'Oct 03' },
    { id: 'DEC-081', action: 'Annual Board Review of Doctor Commission Schedule (15%-22% tiered)', owner: 'CEO / Board', priority: 'Completed', date: 'Oct 01' }
  ];

  return (
    <DashboardLayout
      category="Executive Dashboard"
      subcategory="CEO Control Center"
      title="CEO Control Center & Strategic Governance"
      subtitle="Strategic enterprise OKRs, key capital allocation decisions, risk matrix, and executive action triggers"
      icon="🎯"
      badge="Strategic Governance"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Strategic OKR Velocity" value="94.8%" delta="+3.4% QoQ" trend="up" subtext="4 of 5 on track" icon="🎯" />
        <KpiCard label="Net Burn Rate" value="₹4.20 L/mo" delta="-12.1% Burn" trend="up" subtext="Capital efficient" icon="📉" />
        <KpiCard label="Total Enterprise Headcount" value="142 Staff" delta="24 Clinicians" trend="neutral" subtext="98.2% Retention" icon="👥" />
        <KpiCard label="Blended Gross Margin" value="37.3%" delta="+2.4% vs LY" trend="up" subtext="Target: 38.0%" icon="💎" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: '18px' }}>
        {/* Strategic OKRs */}
        <div style={cardStyle}>
          <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Strategic OKR Tracking Matrix</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {okrs.map(okr => (
              <div key={okr.title} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                  <span style={{ fontWeight: 600, color: '#0f172a' }}>{okr.title}</span>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '12px',
                    background: okr.status === 'Completed' ? '#dbeafe' : okr.status === 'Exceeded' || okr.status === 'On Track' ? '#ecfdf5' : '#fef3c7',
                    color: okr.status === 'Completed' ? '#1d4ed8' : okr.status === 'Exceeded' || okr.status === 'On Track' ? '#047857' : '#b45309'
                  }}>
                    {okr.status}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b' }}>
                  <span>Current: <b>{okr.current}</b></span>
                  <span>Target: <b>{okr.target}</b> ({okr.pct}%)</span>
                </div>
                <div style={{ width: '100%', height: '6px', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${Math.min(100, okr.pct)}%`, height: '100%', background: okr.color, borderRadius: '3px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Executive Decisions */}
        <div style={cardStyle}>
          <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Executive Decision & Capital Action Log</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {decisions.map(dec => (
              <div key={dec.id} style={{ padding: '12px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#f8fafc', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#2563eb' }}>{dec.id}</span>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>{dec.date}</span>
                </div>
                <p style={{ margin: 0, fontSize: '12px', fontWeight: 600, color: '#0f172a', lineHeight: 1.4 }}>{dec.action}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>Lead: {dec.owner}</span>
                  <span style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    padding: '2px 6px',
                    borderRadius: '4px',
                    background: dec.priority === 'High' ? '#fee2e2' : dec.priority === 'Medium' ? '#fef3c7' : '#e0e7ff',
                    color: dec.priority === 'High' ? '#991b1b' : dec.priority === 'Medium' ? '#92400e' : '#3730a3'
                  }}>
                    {dec.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
