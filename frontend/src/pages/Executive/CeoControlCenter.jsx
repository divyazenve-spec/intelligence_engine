import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function CeoControlCenter() {
  const [approvedDecisions, setApprovedDecisions] = useState({});

  const cardStyle = {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '22px 24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
  };

  const okrs = [
    { title: 'Enterprise Revenue Scale', lead: 'CEO / VP Sales', target: '₹55.0L MTD', current: '₹51.65L', pct: 93.9, status: 'On Track', color: '#10b981', note: 'Consolidated gross sales pacing' },
    { title: 'Clinical Accreditation & VCI Audit', lead: 'Chief Medical Officer', target: '100% Facilities', current: '14 / 14 Clinics', pct: 100, status: 'Completed', color: '#3b82f6', note: 'Tier-1 hospital quality & ICU certification' },
    { title: '60-Minute Urban Hyperlocal SLA', lead: 'VP Logistics', target: '98.0% SLA', current: '98.4% SLA', pct: 100.4, status: 'Exceeded', color: '#10b981', note: 'Guaranteed emergency delivery across BLR & NCR' },
    { title: 'Private-Label Veterinary Nutrition', lead: 'Head of Product', target: '₹8.0L MTD', current: '₹6.45L', pct: 80.6, status: 'Attention', color: '#f59e0b', note: 'Therapeutic proprietary diet formulations' },
    { title: 'Operating Margin Expansion (EBITDA)', lead: 'CFO', target: '18.0%', current: '16.9%', pct: 93.8, status: 'On Track', color: '#10b981', note: 'Centralized formulary purchasing & supply optimization' },
    { title: 'Central Pathology Lab Automation', lead: 'CMO & Lab Director', target: 'NABL L1 Accreditation', current: '95% Deployed', pct: 95.0, status: 'Final Audit', color: '#8b5cf6', note: 'Automated clinical analyzer suite' }
  ];

  const businessUnits = [
    { name: '🏥 Clinics & Hospitals Network', lead: 'Dr. Ramesh (COO)', revenue: '₹76.80 Lakh', target: '106.7%', margin: '44.2%', growth: '+18.2%', status: 'Ahead of Plan' },
    { name: '💊 Pharmacy & Cold-Chain Formulary', lead: 'Dr. Aisha (VP Rx)', revenue: '₹51.40 Lakh', target: '107.1%', margin: '36.8%', growth: '+22.4%', status: 'Ahead of Plan' },
    { name: '⚡ E-Commerce & 60-Min Hyperlocal', lead: 'Rohan V. (VP Growth)', revenue: '₹33.20 Lakh', target: '92.2%', margin: '28.4%', growth: '+14.1%', status: 'Needs Push' },
    { name: '🔬 Diagnostic Pathology & Imaging', lead: 'Dr. Neha (CMO)', revenue: '₹19.40 Lakh', target: '107.8%', margin: '58.1%', growth: '+31.5%', status: 'Exceeding' },
    { name: '🐕 Zenve Fashion & Lifestyle', lead: 'Priya I. (VP Merch)', revenue: '₹11.20 Lakh', target: '93.3%', margin: '46.5%', growth: '+11.8%', status: 'On Track' },
    { name: '🏢 B2B & Institutional Veterinary', lead: 'Sameer K. (VP B2B)', revenue: '₹11.80 Lakh', target: '118.0%', margin: '26.2%', growth: '+42.0%', status: 'Exceeding' }
  ];

  const decisions = [
    {
      id: 'DEC-108',
      action: 'Approve Koramangala Tertiary Hospital Expansion (8 new ICU beds, orthopedic surgery theater & CT scanner suite)',
      owner: 'Dr. Ramesh / COO',
      capital: '₹85.0L Capex (28% IRR)',
      priority: 'High',
      date: 'Today',
      status: 'Pending CEO Sign-Off'
    },
    {
      id: 'DEC-107',
      action: 'Sign Direct Supply Master Contract with Zoetis Pharmaceuticals (5.2% Margin Boost, eliminates distributor markups)',
      owner: 'CFO / Supply Chain',
      capital: '₹1.40 Cr Annual Contract',
      priority: 'High',
      date: 'Yesterday',
      status: 'Ready for Signature'
    },
    {
      id: 'DEC-106',
      action: 'Authorize Hyderabad Cluster 60-Minute Hyperlocal Micro-Hub Leases (3 strategic sites: Gachibowli, Jubilee Hills, Hitec City)',
      owner: 'VP Logistics',
      capital: '₹28.5L Capex',
      priority: 'Medium',
      date: 'Oct 03',
      status: 'Under Financial Review'
    },
    {
      id: 'DEC-105',
      action: 'Annual Board Review of Tiered Clinician Incentive & Equity Retention Scheme (15%-22% tiered structure)',
      owner: 'CEO / Board of Directors',
      capital: '₹18.0L Pool',
      priority: 'Completed',
      date: 'Oct 01',
      status: 'Board Ratified & Executed'
    }
  ];

  const toggleApproval = (id) => {
    setApprovedDecisions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <DashboardLayout
      category="Executive Dashboard"
      subcategory="CEO Control Center"
      title="CEO Control Center & Strategic Governance"
      subtitle="Strategic enterprise OKRs, multi-entity performance pacing, capital allocation decisions, and risk governance sentinel"
      icon="👔"
      badge="Strategic Command"
    >
      {/* Top Executive Cockpit Vitals */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '14px' }}>
        <KpiCard label="Consolidated Run Rate (ARR)" value="₹24.8 Crore" delta="+28.4% YoY" trend="up" subtext="Series A milestone pacing" icon="🚀" />
        <KpiCard label="Operating EBITDA Run Rate" value="17.8%" delta="+2.9% QoQ" trend="up" subtext="₹4.41 Cr EBITDA run-rate" icon="📈" />
        <KpiCard label="Liquid Treasury & Runway" value="28 Months" delta="₹9.60 Cr Reserves" trend="up" subtext="Net cash flow +₹18.4L/mo" icon="🏦" />
        <KpiCard label="Board OKR Execution" value="94.2%" delta="19/20 On Track" trend="up" subtext="Q3 performance cycle" icon="🎯" />
        <KpiCard label="Enterprise Headcount" value="186 Specialists" delta="34 Vets · 42 Nurses" trend="up" subtext="98.4% clinician retention" icon="👥" />
        <KpiCard label="Blended Gross Margin" value="38.6%" delta="+2.4% vs LY" trend="up" subtext="Target: 38.0% exceeded" icon="💎" />
      </div>

      {/* Strategic OKRs Tracker */}
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Master Board OKR Execution Matrix (FY25-26)</h3>
            <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#64748b' }}>Key strategic objectives and quarterly milestones monitored directly by the Office of the CEO</p>
          </div>
          <button
            onClick={() => alert('Downloading OKR Executive Packet (PDF)...')}
            style={{ padding: '6px 14px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
          >
            📑 Export OKR Brief
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '14px' }}>
          {okrs.map(okr => (
            <div key={okr.title} style={{ padding: '14px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', background: '#f8fafc', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span style={{ fontWeight: 700, fontSize: '13px', color: '#0f172a' }}>{okr.title}</span>
                  <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#64748b' }}>Lead: {okr.lead}</p>
                </div>
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
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b', marginTop: '4px' }}>
                <span>Current: <b style={{ color: '#0f172a' }}>{okr.current}</b></span>
                <span>Target: <b style={{ color: '#0f172a' }}>{okr.target}</b> ({okr.pct}%)</span>
              </div>
              <div style={{ width: '100%', height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden', marginTop: '4px' }}>
                <div style={{ width: `${Math.min(100, okr.pct)}%`, height: '100%', background: okr.color, borderRadius: '3px' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Business Unit Contribution Table */}
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Business Unit Contribution & Strategic Pacing</h3>
            <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#64748b' }}>Consolidated operational pacing and gross margins across Zenve operating entities</p>
          </div>
          <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', background: '#ecfdf5', color: '#059669', border: '1px solid #a7f3d0' }}>
            All 6 Divisions Operating
          </span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569', fontSize: '12px' }}>
                <th style={{ padding: '10px 14px' }}>Business Segment</th>
                <th style={{ padding: '10px 14px' }}>Executive Lead</th>
                <th style={{ padding: '10px 14px' }}>MTD Revenue</th>
                <th style={{ padding: '10px 14px' }}>Target Pacing</th>
                <th style={{ padding: '10px 14px' }}>Gross Margin</th>
                <th style={{ padding: '10px 14px' }}>YoY Growth</th>
                <th style={{ padding: '10px 14px' }}>Strategic Status</th>
              </tr>
            </thead>
            <tbody>
              {businessUnits.map((bu, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 14px', fontWeight: 700, color: '#0f172a' }}>{bu.name}</td>
                  <td style={{ padding: '12px 14px', color: '#64748b' }}>{bu.lead}</td>
                  <td style={{ padding: '12px 14px', fontWeight: 600 }}>{bu.revenue}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <span style={{ color: bu.status === 'Needs Push' ? '#d97706' : '#059669', fontWeight: 700 }}>{bu.target}</span>
                  </td>
                  <td style={{ padding: '12px 14px', fontWeight: 600 }}>{bu.margin}</td>
                  <td style={{ padding: '12px 14px', color: '#059669', fontWeight: 700 }}>{bu.growth}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: '4px',
                      background: bu.status === 'Ahead of Plan' || bu.status === 'Exceeding' || bu.status === 'On Track' ? '#ecfdf5' : '#fffbeb',
                      color: bu.status === 'Ahead of Plan' || bu.status === 'Exceeding' || bu.status === 'On Track' ? '#059669' : '#b45309'
                    }}>
                      {bu.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2-Column: Decision Governance Log & Capital Runway Waterfall */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: '18px' }}>
        {/* Executive Decisions */}
        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Executive Decision & Capital Governance Log</h3>
              <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#64748b' }}>Action items requiring Chief Executive Officer or Board authorization</p>
            </div>
            <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', background: '#eff6ff', color: '#1d4ed8' }}>
              {decisions.length - Object.keys(approvedDecisions).length} Actionable
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {decisions.map(dec => {
              const isApproved = approvedDecisions[dec.id] || dec.priority === 'Completed';
              return (
                <div key={dec.id} style={{ padding: '14px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', background: '#f8fafc', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#2563eb' }}>{dec.id}</span>
                    <span style={{
                      fontSize: '10px',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: '4px',
                      background: isApproved ? '#ecfdf5' : dec.priority === 'High' ? '#fee2e2' : '#fef3c7',
                      color: isApproved ? '#047857' : dec.priority === 'High' ? '#991b1b' : '#92400e'
                    }}>
                      {isApproved ? 'Approved ✓' : `${dec.priority} Priority`}
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: '13px', fontWeight: 600, color: '#0f172a', lineHeight: 1.4 }}>{dec.action}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: '#64748b', flexWrap: 'wrap', gap: '6px' }}>
                    <span>Owner: <b>{dec.owner}</b></span>
                    <span>Commitment: <b>{dec.capital}</b></span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: '1px dashed #e2e8f0' }}>
                    <span style={{ fontSize: '11px', color: isApproved ? '#059669' : '#64748b' }}>
                      Status: <b>{isApproved ? 'Ratified & Logged' : dec.status}</b>
                    </span>
                    {dec.priority !== 'Completed' && (
                      <button
                        onClick={() => toggleApproval(dec.id)}
                        style={{
                          padding: '4px 10px',
                          borderRadius: '6px',
                          border: isApproved ? '1px solid #a7f3d0' : '1px solid #0f172a',
                          background: isApproved ? '#ecfdf5' : '#0f172a',
                          color: isApproved ? '#059669' : '#ffffff',
                          fontSize: '11px',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        {isApproved ? 'Approved ✓' : 'Approve Decision'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Capital Allocation & Treasury Waterfall */}
        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Capital Allocation & Treasury Waterfall</h3>
              <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#64748b' }}>Liquid balance sheet strength and capital deployment efficiency</p>
            </div>
            <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', background: '#ecfdf5', color: '#059669', border: '1px solid #a7f3d0' }}>
              Self-Sustaining
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Liquid Treasury Reserves</span>
                <h2 style={{ margin: '4px 0 0', fontSize: '24px', fontWeight: 800, color: '#0f172a' }}>₹9.60 Crore</h2>
                <span style={{ fontSize: '11px', color: '#059669', fontWeight: 700 }}>+₹18.4L Monthly Operational Surplus</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, padding: '6px 12px', borderRadius: '6px', background: '#ecfdf5', color: '#059669' }}>
                  28 Months Runway
                </span>
                <p style={{ margin: '6px 0 0', fontSize: '11px', color: '#64748b' }}>Zero Long-Term Debt</p>
              </div>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569', fontSize: '12px', textAlign: 'left' }}>
                  <th style={{ padding: '10px 12px' }}>Capital Pillar</th>
                  <th style={{ padding: '10px 12px' }}>Allocation</th>
                  <th style={{ padding: '10px 12px' }}>Deployed (MTD)</th>
                  <th style={{ padding: '10px 12px' }}>Solvency</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '10px 12px', fontWeight: 600 }}>Hospital Capex & ICU Upgrades</td>
                  <td style={{ padding: '10px 12px' }}>₹1.80 Cr</td>
                  <td style={{ padding: '10px 12px' }}>₹85.0L (47%)</td>
                  <td style={{ padding: '10px 12px' }}><span style={{ color: '#059669', fontWeight: 700 }}>Healthy</span></td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '10px 12px', fontWeight: 600 }}>Cold-Chain & Micro-Hub Fleet</td>
                  <td style={{ padding: '10px 12px' }}>₹75.0L</td>
                  <td style={{ padding: '10px 12px' }}>₹28.5L (38%)</td>
                  <td style={{ padding: '10px 12px' }}><span style={{ color: '#059669', fontWeight: 700 }}>Healthy</span></td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '10px 12px', fontWeight: 600 }}>Diagnostic Lab Automation</td>
                  <td style={{ padding: '10px 12px' }}>₹60.0L</td>
                  <td style={{ padding: '10px 12px' }}>₹54.0L (90%)</td>
                  <td style={{ padding: '10px 12px' }}><span style={{ color: '#1d4ed8', fontWeight: 700 }}>Near Target</span></td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '10px 12px', fontWeight: 600 }}>Liquid Operating Buffer</td>
                  <td style={{ padding: '10px 12px' }}>₹6.45 Cr</td>
                  <td style={{ padding: '10px 12px' }}>Unencumbered</td>
                  <td style={{ padding: '10px 12px' }}><span style={{ color: '#059669', fontWeight: 700 }}>Pristine</span></td>
                </tr>
              </tbody>
            </table>
            <div style={{ padding: '12px 14px', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', fontSize: '12px', color: '#1e40af', lineHeight: 1.4 }}>
              <strong>💡 Executive Capital Note:</strong> Cash generation is fully self-sustaining with a Debt-to-Equity of 0.04. Series A runway extends past Q4 FY26 without dilutive capital requirements.
            </div>
          </div>
        </div>
      </div>

      {/* Enterprise Risk Radar */}
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Enterprise Risk Radar & Governance Sentinel</h3>
            <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#64748b' }}>Continuous monitoring across veterinary clinical safety, supply chain integrity, regulatory audits, and human capital</p>
          </div>
          <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', background: '#ecfdf5', color: '#059669', border: '1px solid #a7f3d0' }}>
            All 4 Vectors Green
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
          <div style={{ padding: '14px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', background: '#ffffff', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>
              <span>Clinical Quality & VCI</span>
              <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '4px', background: '#ecfdf5', color: '#059669' }}>Nominal</span>
            </div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#059669' }}>0 Open Audits</div>
            <p style={{ margin: 0, fontSize: '11px', color: '#64748b', lineHeight: 1.4 }}>100% of 14 hospitals hold active Veterinary Council licenses. Bio-waste and surgical protocols certified.</p>
          </div>
          <div style={{ padding: '14px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', background: '#ffffff', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>
              <span>Cold-Chain & Pharmacy</span>
              <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '4px', background: '#ecfdf5', color: '#059669' }}>Nominal</span>
            </div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#059669' }}>99.8% Integrity</div>
            <p style={{ margin: 0, fontSize: '11px', color: '#64748b', lineHeight: 1.4 }}>Real-time IoT temperature telematics active across 14 central vaccine and insulin repositories.</p>
          </div>
          <div style={{ padding: '14px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', background: '#ffffff', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>
              <span>Specialist Doctor Retention</span>
              <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '#4px', background: '#ecfdf5', color: '#059669' }}>Optimal</span>
            </div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#059669' }}>98.4% Retention</div>
            <p style={{ margin: 0, fontSize: '11px', color: '#64748b', lineHeight: 1.4 }}>Veterinary surgical staff turnover stands at 1.6%, significantly beating the healthcare benchmark (18%).</p>
          </div>
          <div style={{ padding: '14px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', background: '#ffffff', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>
              <span>Cybersecurity & EHR Privacy</span>
              <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '4px', background: '#ecfdf5', color: '#059669' }}>Secured</span>
            </div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#059669' }}>ISO 27001 Ready</div>
            <p style={{ margin: 0, fontSize: '11px', color: '#64748b', lineHeight: 1.4 }}>End-to-end encrypted electronic health records with immutable audit logging and zero data incidents.</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
