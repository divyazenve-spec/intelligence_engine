import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function HRDashboard() {
  return (
    <DashboardLayout
      category="Employees & HR"
      subcategory="HR & Workforce Performance"
      title="Workforce & Human Resources"
      subtitle="Headcount analytics, attendance rates, payroll distribution, and team productivity"
      icon="🧑‍💼"
      badge="48 Staff Members"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Active Headcount" value="48 Employees" delta="+4 this month" trend="up" subtext="Across 6 depts" icon="👥" />
        <KpiCard label="Monthly Payroll Cost" value="₹24.8 Lakh" delta="Within budget" trend="neutral" subtext="Salary & benefits" icon="💵" />
        <KpiCard label="Staff Retention" value="96.2%" delta="Top Tier" trend="up" subtext="Annualized retention" icon="🤝" />
        <KpiCard label="Target Attainment" value="105.4%" delta="+5.4% surplus" trend="up" subtext="Workforce benchmark" icon="🎯" />
      </div>

      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 12px', fontSize: '15px', fontWeight: 700 }}>Department Headcount & Productivity</h3>
        <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Clinical (18), Pharmacy (10), Operations & Logistics (12), Support (8)</p>
        <div style={{ height: '140px', background: 'rgba(0,0,0,0.15)', borderRadius: '8px', display: 'grid', placeItems: 'center', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>
          Workforce Productivity & Attendance Roster
        </div>
      </div>
    </DashboardLayout>
  );
}
