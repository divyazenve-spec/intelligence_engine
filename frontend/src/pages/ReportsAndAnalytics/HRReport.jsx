import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function HRReport() {
  const [toast, setToast] = useState('');

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const departments = [
    { dept: 'Clinical Veterinary & Surgeons', headcount: 48, attendance: '98.4%', targetAttainment: '97.2%', monthlyPayroll: 4250000, avgOvertimeHrs: 6.2, attrition: '0.8%' },
    { dept: 'Veterinary Nurses & Paramedics', headcount: 64, attendance: '94.2%', targetAttainment: '95.0%', monthlyPayroll: 2880000, avgOvertimeHrs: 18.4, attrition: '2.1%' },
    { dept: 'Pharmacy & Quality Pharmacists', headcount: 32, attendance: '99.1%', targetAttainment: '102.4%', monthlyPayroll: 1920000, avgOvertimeHrs: 4.8, attrition: '0.0%' },
    { dept: 'Supply Chain, Dark Stores & Fleet', headcount: 110, attendance: '92.6%', targetAttainment: '96.8%', monthlyPayroll: 3850000, avgOvertimeHrs: 22.5, attrition: '3.4%' },
    { dept: 'Digital Tech, AI & Telehealth Eng', headcount: 24, attendance: '99.5%', targetAttainment: '104.0%', monthlyPayroll: 3600000, avgOvertimeHrs: 3.1, attrition: '0.0%' },
    { dept: 'Corporate, Finance & Commercial', headcount: 22, attendance: '98.8%', targetAttainment: '98.5%', monthlyPayroll: 2200000, avgOvertimeHrs: 2.4, attrition: '1.2%' }
  ];

  const inr = (n) => '₹' + (Number(n) / 100000).toFixed(2) + ' Lakhs';

  const downloadCSV = () => {
    const rows = [
      ['Department', 'Headcount', 'Attendance Rate', 'Target Attainment', 'Monthly Payroll (INR)', 'Avg Overtime Hours', 'Monthly Attrition'],
      ...departments.map(d => [d.dept, d.headcount, d.attendance, d.targetAttainment, d.monthlyPayroll, d.avgOvertimeHrs, d.attrition])
    ];
    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.join(',')).join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `zenve_hr_workforce_report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast('HR Workforce Report CSV downloaded.');
  };

  return (
    <DashboardLayout
      category="Reports & Analytics"
      subcategory="HR Reports"
      title="Workforce, Clinical Roster & Payroll Analytics Report"
      subtitle="Headcount allocation across 6 functional divisions, doctor/nurse shift attendance, quota pacing, overtime distribution, and monthly payroll"
      icon="🧑‍💼"
      badge="300 Team Members"
      actions={
        <button
          onClick={downloadCSV}
          style={{
            padding: '8px 14px',
            borderRadius: '8px',
            background: 'var(--primary, #3b82f6)',
            color: '#ffffff',
            border: 'none',
            fontWeight: 600,
            fontSize: '12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <span>📥</span> Export HR CSV
        </button>
      }
    >
      {toast && (
        <div style={{
          padding: '10px 16px',
          background: 'rgba(59,130,246,0.15)',
          border: '1px solid #3b82f6',
          borderRadius: '8px',
          color: '#60a5fa',
          fontSize: '13px',
          fontWeight: 600
        }}>
          ⚡ {toast}
        </div>
      )}

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Organization Headcount" value="300 Personnel" delta="112 Clinical Vets/Nurses" trend="up" subtext="Across 6 metro cities" icon="👥" />
        <KpiCard label="Average Shift Attendance" value="95.4%" delta="Low absenteeism" trend="up" subtext="Biometric / App sync" icon="📅" />
        <KpiCard label="Monthly Payroll Disbursement" value="₹1.87 Crores" delta="Includes doctor incentive" trend="neutral" subtext="Fully funded" icon="💳" />
        <KpiCard label="Annualized Attrition Rate" value="1.8%" delta="Well below industry 8%" trend="up" subtext="High retention" icon="🌟" />
      </div>

      {/* Table Section */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>Departmental Headcount, Attendance & Payroll Allocation</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))', color: 'var(--muted-foreground, #94a3b8)' }}>
                <th style={{ padding: '10px 12px' }}>Department Division</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Headcount</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Attendance</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Attainment</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Monthly Payroll</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Avg Overtime</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Attrition</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((d) => (
                <tr key={d.dept} style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.04))' }}>
                  <td style={{ padding: '12px', fontWeight: 600 }}>{d.dept}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{d.headcount}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace' }}>{d.attendance}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, color: '#34d399', fontFamily: '"IBM Plex Mono", monospace' }}>{d.targetAttainment}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, color: '#60a5fa', fontFamily: '"IBM Plex Mono", monospace' }}>{inr(d.monthlyPayroll)}</td>
                  <td style={{ padding: '12px', textAlign: 'right', color: d.avgOvertimeHrs > 20 ? '#f87171' : 'var(--foreground, #f8fafc)', fontFamily: '"IBM Plex Mono", monospace' }}>{d.avgOvertimeHrs} hrs/wk</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{d.attrition}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
