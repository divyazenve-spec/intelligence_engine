import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function RevenueByEmployee() {
  const employees = [
    { name: 'Dr. Priya Sharma', dept: 'Clinical Operations', role: 'Chief Medical Officer', target: '₹12.0L', rev: '₹14.2L', attain: '118.3%', orders: 184, rating: '5.0' },
    { name: 'Rajesh Verma', dept: 'Patient Services', role: 'Care Coordinator Lead', target: '₹8.5L', rev: '₹9.4L', attain: '110.5%', orders: 152, rating: '4.9' },
    { name: 'Ananya Deshmukh', dept: 'Outpatient Care', role: 'Services Lead', target: '₹9.8L', rev: '₹10.1L', attain: '103.0%', orders: 138, rating: '4.8' },
    { name: 'Vikram Mehta', dept: 'Diagnostics & Lab', role: 'Lab Operations Manager', target: '₹7.2L', rev: '₹6.8L', attain: '94.4%', orders: 112, rating: '4.7' },
    { name: 'Sneha Patel', dept: 'Pharmacy & Wellness', role: 'Head Pharmacist', target: '₹6.4L', rev: '₹7.2L', attain: '112.5%', orders: 164, rating: '4.9' },
    { name: 'Arjun Nair', dept: 'Telehealth', role: 'Digital Health Consultant', target: '₹7.6L', rev: '₹6.9L', attain: '90.7%', orders: 98, rating: '4.6' }
  ];

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
        <KpiCard label="Top Staff Producer" value="Dr. Priya Sharma" delta="₹14.2L billings" trend="up" subtext="118.3% quota" icon="⭐" />
        <KpiCard label="Team Attainment Rate" value="105.4%" delta="+5.4% surplus" trend="up" subtext="Average achievement" icon="👥" />
        <KpiCard label="Total Staff Quota" value="₹51.5L" delta="6 members" trend="neutral" subtext="Period baseline" icon="🎯" />
        <KpiCard label="Total Realized" value="₹54.6L" delta="+₹3.1L surplus" trend="up" subtext="Net revenue" icon="💰" />
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
