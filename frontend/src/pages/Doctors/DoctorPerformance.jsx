import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function DoctorPerformance() {
  const performanceRoster = [];

  const cardStyle = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Doctors"
      subcategory="Clinical KPIs & Quality"
      title="Doctor Clinical Performance & Quota Attainment"
      subtitle="Physician consultation benchmarks, Net Promoter Scores (NPS), patient wait times, and clinical outcomes"
      icon="⭐"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Overall Quota Attainment" value="0.0%" delta="+4.2% vs target" trend="up" subtext="All practitioners above goal" icon="🎯" />
        <KpiCard label="Clinical Net Promoter Score" value="95.4 NPS" delta="+3 pts MoM" trend="up" subtext="Based on 1,420 pet parent reviews" icon="⭐" />
        <KpiCard label="Avg. Consultation Wait Time" value="0" delta="-2.1 mins YoY" trend="up" subtext="Strict appointment pacing" icon="⏱️" />
        <KpiCard label="Overall Surgical Success" value="0.0%" delta="Zero critical incidents" trend="up" subtext="NABH protocol compliant" icon="🛡️" />
      </div>

      <div style={cardStyle}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>⭐ Physician Performance Scorecard & Quality Index</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border, #e2e8f0)', textAlign: 'left', color: 'var(--muted-foreground, #475569)' }}>
                <th style={{ padding: '10px' }}>Doctor Name</th>
                <th style={{ padding: '10px' }}>Specialty</th>
                <th style={{ padding: '10px' }}>Monthly Target</th>
                <th style={{ padding: '10px' }}>Completed Consults</th>
                <th style={{ padding: '10px' }}>Attainment %</th>
                <th style={{ padding: '10px' }}>Patient NPS</th>
                <th style={{ padding: '10px' }}>Avg Wait Time</th>
                <th style={{ padding: '10px' }}>Surgical Success</th>
                <th style={{ padding: '10px' }}>Clinical Grade</th>
              </tr>
            </thead>
            <tbody>
              {performanceRoster.map((p, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{p.name}</td>
                  <td style={{ padding: '10px', color: '#64748b' }}>{p.spec}</td>
                  <td style={{ padding: '10px' }}>{p.consultTarget} consults</td>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{p.consultActual} consults</td>
                  <td style={{ padding: '10px', color: '#059669', fontWeight: 700 }}>{p.attainment}</td>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{p.nps}/100</td>
                  <td style={{ padding: '10px', color: '#64748b' }}>{p.waitTime}</td>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{p.surgSuccess}</td>
                  <td style={{ padding: '10px' }}>
                    <span style={{ padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, background: '#ecfdf5', color: '#047857' }}>
                      {p.grade}
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
