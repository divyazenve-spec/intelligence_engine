import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function DoctorPerformance() {
  const performanceRoster = [
    { name: 'Dr. Divya Ramesh', spec: 'Lead Surgeon', consultTarget: 220, consultActual: 242, attainment: '110%', nps: 98, waitTime: '6 min', surgSuccess: '99.8%', grade: 'A+' },
    { name: 'Dr. Arvind Swaminathan', spec: 'Cardiology', consultTarget: 180, consultActual: 188, attainment: '104%', nps: 96, waitTime: '9 min', surgSuccess: '99.2%', grade: 'A+' },
    { name: 'Dr. Meera Nambiar', spec: 'Neurology', consultTarget: 170, consultActual: 174, attainment: '102%', nps: 95, waitTime: '8 min', surgSuccess: '99.4%', grade: 'A' },
    { name: 'Dr. Siddharth Varma', spec: 'Pediatrics', consultTarget: 200, consultActual: 215, attainment: '107%', nps: 94, waitTime: '5 min', surgSuccess: '100%', grade: 'A+' },
    { name: 'Dr. Ananya Joshi', spec: 'Dermatology', consultTarget: 160, consultActual: 164, attainment: '102%', nps: 92, waitTime: '11 min', surgSuccess: 'N/A', grade: 'A' },
    { name: 'Dr. Rohan Deshmukh', spec: 'Exotics', consultTarget: 130, consultActual: 132, attainment: '101%', nps: 96, waitTime: '7 min', surgSuccess: '99.0%', grade: 'A' }
  ];

  const cardStyle = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Doctors"
      subcategory="Clinical KPIs & Quality"
      title="Doctor Clinical Performance & Quota Attainment"
      subtitle="Physician consultation benchmarks, Net Promoter Scores (NPS), patient wait times, and clinical outcomes"
      icon="⭐"
      badge="105.2% Avg Attainment"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Overall Quota Attainment" value="105.2%" delta="+4.2% vs target" trend="up" subtext="All practitioners above goal" icon="🎯" />
        <KpiCard label="Clinical Net Promoter Score" value="95.4 NPS" delta="+3 pts MoM" trend="up" subtext="Based on 1,420 pet parent reviews" icon="⭐" />
        <KpiCard label="Avg. Consultation Wait Time" value="7.6 mins" delta="-2.1 mins YoY" trend="up" subtext="Strict appointment pacing" icon="⏱️" />
        <KpiCard label="Overall Surgical Success" value="99.5%" delta="Zero critical incidents" trend="up" subtext="NABH protocol compliant" icon="🛡️" />
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
