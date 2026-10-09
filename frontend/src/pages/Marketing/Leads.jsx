import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function Leads() {
  const [stageFilter, setStageFilter] = useState('ALL');
  const [leads, setLeads] = useState([]);

  const filtered = leads.filter(l => stageFilter === 'ALL' || l.stage === stageFilter);

  return (
    <DashboardLayout
      category="Marketing"
      subcategory="Leads"
      title="Pet Parent Lead Pipeline & Acquisition"
      subtitle="Prospective pet parents, consultation booking stages, and lead conversion velocity"
      icon="🎯"
      badge=""
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          {['ALL', 'New', 'Contacted', 'Qualified', 'Consult Booked', 'Converted'].map(st => (
            <button
              key={st}
              onClick={() => setStageFilter(st)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                border: stageFilter === st ? '1px solid #2563eb' : '1px solid #e2e8f0',
                background: stageFilter === st ? '#eff6ff' : '#ffffff',
                color: stageFilter === st ? '#2563eb' : '#64748b'
              }}
            >
              {st}
            </button>
          ))}
        </div>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="New Leads (MTD)" value="0" delta="0.0%" trend="neutral" subtext="Qualified pet parents" icon="📥" />
        <KpiCard label="Consultations Booked" value="0" delta="0.0%" trend="neutral" subtext="0.0% booking rate" icon="🩺" />
        <KpiCard label="Lead-to-Order Conversion" value="0.0%" delta="0.0%" trend="neutral" subtext="Benchmark: 0.0%" icon="🔄" />
        <KpiCard label="Avg Lead Pipeline Value" value="₹0" delta="0.0%" trend="neutral" subtext="Expected first 30D spend" icon="💎" />
      </div>

      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Active Pet Parent Prospects</h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>Real-time CRM lead routing with animal profiles and assigned specialists</p>
          </div>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#2563eb' }}>{filtered.length} Leads</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <th style={{ padding: '12px 16px' }}>Lead ID & Pet Parent</th>
                <th style={{ padding: '12px 16px' }}>Pet Companion</th>
                <th style={{ padding: '12px 16px' }}>Location</th>
                <th style={{ padding: '12px 16px' }}>Acquisition Source</th>
                <th style={{ padding: '12px 16px' }}>Score</th>
                <th style={{ padding: '12px 16px' }}>Stage</th>
                <th style={{ padding: '12px 16px' }}>Assigned Rep</th>
                <th style={{ padding: '12px 16px' }}>Est. Value</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ padding: '32px 16px', textAlign: 'center', color: '#94a3b8' }}>
                    No leads found
                  </td>
                </tr>
              ) : (
                filtered.map(l => (
                  <tr key={l.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ fontWeight: 600, color: '#0f172a' }}>{l.parent}</div>
                      <div style={{ fontSize: '11px', color: '#94a3b8', fontFamily: '"IBM Plex Mono", monospace' }}>{l.id}</div>
                    </td>
                    <td style={{ padding: '14px 16px', color: '#334155', fontWeight: 500 }}>{l.pet}</td>
                    <td style={{ padding: '14px 16px', color: '#64748b', fontSize: '12px' }}>{l.city}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ padding: '3px 8px', borderRadius: '4px', background: '#f1f5f9', color: '#475569', fontSize: '11px' }}>
                        {l.source}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{
                        fontWeight: 700,
                        fontFamily: '"IBM Plex Mono", monospace',
                        color: l.score.startsWith('A') ? '#16a34a' : '#2563eb'
                      }}>
                        {l.score}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: 600,
                        background: l.stage === 'Converted' ? '#dcfce7' : l.stage === 'Consult Booked' ? '#dbeafe' : '#fef3c7',
                        color: l.stage === 'Converted' ? '#15803d' : l.stage === 'Consult Booked' ? '#1e40af' : '#92400e'
                      }}>
                        {l.stage}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px', color: '#334155' }}>{l.rep}</td>
                    <td style={{ padding: '14px 16px', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace', color: '#0f172a' }}>{l.value}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
