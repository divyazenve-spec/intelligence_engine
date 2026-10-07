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
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Top Staff Producer" value="Dr. Priya Sharma" delta="₹0 billings" trend="up" subtext="118.3% quota" icon="⭐" />
        <KpiCard label="Team Attainment Rate" value="0.0%" delta="+5.4% surplus" trend="up" subtext="Average achievement" icon="👥" />
        <KpiCard label="Total Staff Quota" value="₹0" delta="6 members" trend="neutral" subtext="Period baseline" icon="🎯" />
        <KpiCard label="Total Realized" value="₹0" delta="+₹0 surplus" trend="up" subtext="Net revenue" icon="💰" />
      </div>

      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>Employee Performance Matrix</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))', color: 'var(--muted-foreground, #94a3b8)', fontSize: '11px' }}>
                <th style={{ padding: '8px 12px' }}>Staff Name</th>
                <th style={{ padding: '8px 12px' }}>Department</th>
                <th style={{ padding: '8px 12px' }}>Role</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Target</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Realized Billings</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Attainment</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Satisfaction</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((e) => (
                <tr key={e.name} style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.04))' }}>
                  <td style={{ padding: '12px', fontWeight: 700 }}>{e.name}</td>
                  <td style={{ padding: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>{e.dept}</td>
                  <td style={{ padding: '12px' }}>{e.role}</td>
                  <td style={{ padding: '12px', textAlign: 'right', color: 'var(--muted-foreground, #94a3b8)' }}>{e.target}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{e.rev}</td>
                  <td style={{ padding: '12px', textAlign: 'right', color: '#10b981', fontWeight: 600 }}>{e.attain}</td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>⭐ {e.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
