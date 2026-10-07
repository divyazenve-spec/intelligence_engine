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

  const okrs = [];
  const businessUnits = [];
  const decisions = [];

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
        <KpiCard label="Consolidated Run Rate (ARR)" value="₹0" delta="0.0% YoY" trend="neutral" subtext="No records recorded" icon="🚀" />
        <KpiCard label="Operating EBITDA Run Rate" value="0.0%" delta="0.0% QoQ" trend="neutral" subtext="₹0 EBITDA run-rate" icon="📈" />
        <KpiCard label="Liquid Treasury & Runway" value="-- Months" delta="₹0 Reserves" trend="neutral" subtext="No records recorded" icon="🏦" />
        <KpiCard label="Board OKR Execution" value="0.0%" delta="0/0 On Track" trend="neutral" subtext="No active cycle" icon="🎯" />
        <KpiCard label="Enterprise Headcount" value="0 Staff" delta="0 Specialists" trend="neutral" subtext="No records recorded" icon="👥" />
        <KpiCard label="Blended Gross Margin" value="0.0%" delta="0.0% vs benchmark" trend="neutral" subtext="No records recorded" icon="💎" />
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
          {okrs.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '28px', color: '#94a3b8', fontSize: '13px' }}>
              No active OKRs recorded
            </div>
          ) : (
            okrs.map(okr => (
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
            ))
          )}
        </div>
      </div>

      {/* Business Unit Contribution Table */}
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Business Unit Contribution & Strategic Pacing</h3>
            <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#64748b' }}>Consolidated operational pacing and gross margins across operating entities</p>
          </div>
          <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', background: '#f1f5f9', color: '#475569', border: '1px solid #e2e8f0' }}>
            0 Divisions
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
              {businessUnits.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '24px', color: '#94a3b8' }}>
                    No records found
                  </td>
                </tr>
              ) : (
                businessUnits.map((bu, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px 14px', fontWeight: 700, color: '#0f172a' }}>{bu.name}</td>
                    <td style={{ padding: '12px 14px', color: '#64748b' }}>{bu.lead}</td>
                    <td style={{ padding: '12px 14px', fontWeight: 600 }}>{bu.revenue}</td>
                    <td style={{ padding: '12px 14px' }}>{bu.pacing}</td>
                    <td style={{ padding: '12px 14px', fontWeight: 600 }}>{bu.margin}</td>
                    <td style={{ padding: '12px 14px', color: '#059669', fontWeight: 700 }}>{bu.growth}</td>
                    <td style={{ padding: '12px 14px' }}>
                      <span style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: '4px',
                        background: '#f1f5f9',
                        color: '#475569'
                      }}>
                        {bu.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
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
            <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', background: '#f1f5f9', color: '#475569' }}>
              0 Actionable
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {decisions.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '36px', color: '#94a3b8', fontSize: '13px', border: '1px dashed #cbd5e1', borderRadius: '8px' }}>
                No pending executive decisions or authorizations
              </div>
            ) : (
              decisions.map(dec => {
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
                        background: isApproved ? '#ecfdf5' : '#f1f5f9',
                        color: isApproved ? '#047857' : '#475569'
                      }}>
                        {isApproved ? 'Approved ✓' : `${dec.priority} Priority`}
                      </span>
                    </div>
                    <p style={{ margin: 0, fontSize: '13px', fontWeight: 600, color: '#0f172a', lineHeight: 1.4 }}>{dec.action}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: '#64748b', flexWrap: 'wrap', gap: '6px' }}>
                      <span>Owner: <b>{dec.owner}</b></span>
                      <span>Commitment: <b>{dec.capital}</b></span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Capital Allocation & Treasury Waterfall */}
        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Capital Allocation & Treasury Waterfall</h3>
              <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#64748b' }}>Liquid balance sheet strength and capital deployment efficiency</p>
            </div>
            <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', background: '#f1f5f9', color: '#475569', border: '1px solid #e2e8f0' }}>
              Standard
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Liquid Treasury Reserves</span>
                <h2 style={{ margin: '4px 0 0', fontSize: '24px', fontWeight: 800, color: '#0f172a' }}>₹0</h2>
                <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 700 }}>+₹0 Monthly Operational Surplus</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, padding: '6px 12px', borderRadius: '6px', background: '#f1f5f9', color: '#475569' }}>
                  -- Months Runway
                </span>
                <p style={{ margin: '6px 0 0', fontSize: '11px', color: '#64748b' }}>No Long-Term Debt</p>
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
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center', padding: '24px', color: '#94a3b8' }}>
                    No records found
                  </td>
                </tr>
              </tbody>
            </table>
            <div style={{ padding: '12px 14px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '12px', color: '#475569', lineHeight: 1.4 }}>
              <strong>💡 Executive Capital Note:</strong> No active capital allocation or debt records recorded.
            </div>
          </div>
        </div>
      </div>

      {/* Enterprise Risk Radar */}
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Enterprise Risk Radar & Governance Sentinel</h3>
            <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#64748b' }}>Continuous monitoring across clinical safety, supply chain integrity, regulatory audits, and human capital</p>
          </div>
          <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', background: '#f1f5f9', color: '#475569', border: '1px solid #e2e8f0' }}>
            All Vectors Nominal
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
          <div style={{ padding: '14px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', background: '#ffffff', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>
              <span>Clinical Quality & Compliance</span>
              <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '4px', background: '#f1f5f9', color: '#475569' }}>Nominal</span>
            </div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#475569' }}>0 Open Audits</div>
            <p style={{ margin: 0, fontSize: '11px', color: '#64748b', lineHeight: 1.4 }}>All compliance audits up to date. No pending regulatory reviews.</p>
          </div>
          <div style={{ padding: '14px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', background: '#ffffff', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>
              <span>Cold-Chain & Pharmacy</span>
              <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '4px', background: '#f1f5f9', color: '#475569' }}>Nominal</span>
            </div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#475569' }}>--</div>
            <p style={{ margin: 0, fontSize: '11px', color: '#64748b', lineHeight: 1.4 }}>No active telemetry alerts recorded.</p>
          </div>
          <div style={{ padding: '14px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', background: '#ffffff', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>
              <span>Specialist Retention</span>
              <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '4px', background: '#f1f5f9', color: '#475569' }}>Optimal</span>
            </div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#475569' }}>--</div>
            <p style={{ margin: 0, fontSize: '11px', color: '#64748b', lineHeight: 1.4 }}>No staffing variance recorded.</p>
          </div>
          <div style={{ padding: '14px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', background: '#ffffff', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>
              <span>Cybersecurity & Records</span>
              <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '4px', background: '#f1f5f9', color: '#475569' }}>Secured</span>
            </div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#475569' }}>Secured</div>
            <p style={{ margin: 0, fontSize: '11px', color: '#64748b', lineHeight: 1.4 }}>Electronic records active with standard encryption protocols.</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
