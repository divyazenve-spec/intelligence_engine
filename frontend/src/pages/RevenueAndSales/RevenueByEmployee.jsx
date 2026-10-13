import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function RevenueByEmployee() {
  const employees = [];

  return (
    <DashboardLayout
      category="Revenue & Sales"
      subcategory="Revenue by Employee"
      title="Staff Performance & Quota Attainment"
      subtitle="Care coordinators, operational leads, and clinic staff quota benchmarks"
      icon="👨‍💼"
      badge="Staff Leaderboard"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <KpiCard label="Top Staff Producer" value="Dr. Priya Sharma" delta="₹0 billings" trend="up" subtext="118.3% quota" icon="⭐" />
        <KpiCard label="Team Attainment Rate" value="0.0%" delta="+5.4% surplus" trend="up" subtext="Average achievement" icon="👥" />
        <KpiCard label="Total Staff Quota" value="₹0" delta="6 members" trend="neutral" subtext="Period baseline" icon="🎯" />
        <KpiCard label="Total Realized" value="₹0" delta="+₹0 surplus" trend="up" subtext="Net revenue" icon="💰" />
      </div>

      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px 24px'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>Employee Performance Matrix</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))', color: 'var(--muted-foreground, #94a3b8)', fontSize: '11px' }}>
                <th style={{ padding: '10px 14px 10px 16px', verticalAlign: 'middle' }}>Staff Name</th>
                <th style={{ padding: '10px 14px', verticalAlign: 'middle' }}>Department</th>
                <th style={{ padding: '10px 14px', verticalAlign: 'middle' }}>Role</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', verticalAlign: 'middle' }}>Target</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', verticalAlign: 'middle' }}>Realized Billings</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', verticalAlign: 'middle' }}>Attainment</th>
                <th style={{ padding: '10px 16px 10px 14px', textAlign: 'right', verticalAlign: 'middle' }}>Satisfaction</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((e) => (
                <tr key={e.name} style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.04))' }}>
                  <td style={{ padding: '12px 14px 12px 16px', fontWeight: 700, verticalAlign: 'middle' }}>{e.name}</td>
                  <td style={{ padding: '12px 14px', color: 'var(--muted-foreground, #94a3b8)', verticalAlign: 'middle' }}>{e.dept}</td>
                  <td style={{ padding: '12px 14px', verticalAlign: 'middle' }}>{e.role}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', color: 'var(--muted-foreground, #94a3b8)', verticalAlign: 'middle' }}>{e.target}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace', verticalAlign: 'middle' }}>{e.rev}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', color: '#10b981', fontWeight: 600, verticalAlign: 'middle' }}>{e.attain}</td>
                  <td style={{ padding: '12px 16px 12px 14px', textAlign: 'right', verticalAlign: 'middle' }}>⭐ {e.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
