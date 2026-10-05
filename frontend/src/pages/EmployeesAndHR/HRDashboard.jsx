import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function HRDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [period, setPeriod] = useState('MTD');
  const [synced, setSynced] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState('ALL');
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showReqModal, setShowReqModal] = useState(false);

  const deptHeadcounts = [
    { name: 'Veterinary Clinical Services', count: 48, lead: 'Dr. Priya Sharma (CMO)', budget: '₹42,00,000', color: '#10b981', attendance: '97.2%', vacancies: 5 },
    { name: 'Pharmacy & Drug Dispensing', count: 32, lead: 'Rohan Deshmukh (Head Pharmacist)', budget: '₹22,50,000', color: '#0ea5e9', attendance: '98.1%', vacancies: 3 },
    { name: 'Logistics & 60-Min Delivery', count: 54, lead: 'Vikram Joshi (Fleet Lead)', budget: '₹28,80,000', color: '#f59e0b', attendance: '94.8%', vacancies: 8 },
    { name: 'Warehouse & Fulfillment', count: 28, lead: 'Ananya Verma (Ops Manager)', budget: '₹18,40,000', color: '#8b5cf6', attendance: '96.4%', vacancies: 2 },
    { name: 'Technology & AI Engineering', count: 24, lead: 'Sameer Kulkarni (VP Tech)', budget: '₹38,00,000', color: '#ec4899', attendance: '98.5%', vacancies: 4 },
    { name: 'Customer Delight & Support', count: 22, lead: 'Pooja Hegde (CX Lead)', budget: '₹14,20,000', color: '#14b8a6', attendance: '95.6%', vacancies: 3 }
  ];

  const [employees, setEmployees] = useState([
    { id: 'EMP-1001', name: 'Dr. Priya Sharma', role: 'Chief Veterinary Officer', dept: 'Clinical', loc: 'Bengaluru Flagship', email: 'priya.s@zenve.in', phone: '+91 98450 11201', joined: '15 Jan 2023', status: 'Active', salary: '₹2,40,000/mo', rating: '5.0★' },
    { id: 'EMP-1002', name: 'Dr. Rahul Mehta', role: 'Senior Vet Surgeon', dept: 'Clinical', loc: 'Mumbai Center', email: 'rahul.m@zenve.in', phone: '+91 98200 44312', joined: '10 Mar 2023', status: 'Active', salary: '₹1,95,000/mo', rating: '4.9★' },
    { id: 'EMP-1003', name: 'Rohan Deshmukh', role: 'Head of Pharmacy', dept: 'Pharmacy', loc: 'Bengaluru Hub', email: 'rohan.d@zenve.in', phone: '+91 97401 88392', joined: '01 Jun 2023', status: 'Active', salary: '₹1,45,000/mo', rating: '4.8★' },
    { id: 'EMP-1004', name: 'Sneha Chawla', role: 'Senior AI Engineer', dept: 'Technology', loc: 'Remote / HQ', email: 'sneha.c@zenve.in', phone: '+91 99102 77314', joined: '28 Sep 2026', status: 'Probation', salary: '₹1,80,000/mo', rating: '4.9★' },
    { id: 'EMP-1005', name: 'Vikram Joshi', role: 'Fleet & Logistics Lead', dept: 'Logistics', loc: 'Bengaluru South', email: 'vikram.j@zenve.in', phone: '+91 98860 12093', joined: '12 Aug 2023', status: 'Active', salary: '₹95,000/mo', rating: '4.7★' },
    { id: 'EMP-1006', name: 'Ananya Verma', role: 'Warehouse Ops Manager', dept: 'Warehouse', loc: 'Bhiwandi Hub', email: 'ananya.v@zenve.in', phone: '+91 98211 40592', joined: '05 Feb 2024', status: 'Active', salary: '₹1,10,000/mo', rating: '4.8★' },
    { id: 'EMP-1007', name: 'Manish Rawat', role: 'Express Delivery Rider', dept: 'Logistics', loc: 'Mumbai Bandra', email: 'manish.r@zenve.in', phone: '+91 98330 67123', joined: '25 Sep 2026', status: 'Active', salary: '₹32,000/mo', rating: '4.9★' },
    { id: 'EMP-1008', name: 'Dr. Aisha Khan', role: 'Consultant Dermatologist', dept: 'Clinical', loc: 'Delhi NCR Clinic', email: 'aisha.k@zenve.in', phone: '+91 98110 55421', joined: '14 Apr 2024', status: 'On Leave', salary: '₹1,15,000/mo', rating: '4.8★' },
    { id: 'EMP-1009', name: 'Pooja Hegde', role: 'Support Team Lead', dept: 'Customer Delight', loc: 'Bengaluru HQ', email: 'pooja.h@zenve.in', phone: '+91 99001 22894', joined: '01 Nov 2023', status: 'Active', salary: '₹75,000/mo', rating: '4.7★' },
    { id: 'EMP-1010', name: 'Kunal Sen', role: 'Inventory Controller', dept: 'Warehouse', loc: 'Bengaluru Hub', email: 'kunal.s@zenve.in', phone: '+91 96190 33412', joined: '18 Sep 2026', status: 'Active', salary: '₹65,000/mo', rating: '4.6★' }
  ]);

  const [leaveRequests, setLeaveRequests] = useState([
    { id: 'LR-8041', name: 'Dr. Aisha Khan', role: 'Vet Dermatologist', type: 'Sick Leave', dates: '05 Oct – 08 Oct', status: 'Pending', bal: '8 SL left' },
    { id: 'LR-8042', name: 'Kunal Sen', role: 'Inventory Controller', type: 'PTO Vacation', dates: '12 Oct – 16 Oct', status: 'Pending', bal: '12 PTO left' },
    { id: 'LR-8043', name: 'Sneha Chawla', role: 'Senior AI Engineer', type: 'Casual Leave', dates: '09 Oct – 09 Oct', status: 'Pending', bal: '6 CL left' }
  ]);

  const [openJobs, setOpenJobs] = useState([
    { id: 'REQ-101', title: 'Emergency Veterinary Surgeon', dept: 'Clinical', loc: 'Bengaluru Flagship', openings: 2, applicants: 48, interview: 4, priority: 'Urgent' },
    { id: 'REQ-102', title: 'Staff Veterinarian (Outpatient)', dept: 'Clinical', loc: 'Mumbai Bandra', openings: 3, applicants: 62, interview: 6, priority: 'High' },
    { id: 'REQ-103', title: 'Registered Clinical Pharmacist', dept: 'Pharmacy', loc: 'Bengaluru Hub', openings: 3, applicants: 54, interview: 5, priority: 'High' },
    { id: 'REQ-104', title: 'Senior AI / ML Research Engineer', dept: 'Technology', loc: 'Bengaluru / Remote', openings: 2, applicants: 85, interview: 4, priority: 'Urgent' }
  ]);

  function approveLeave(id) {
    setLeaveRequests(leaveRequests.map(l => l.id === id ? { ...l, status: 'Approved' } : l));
  }

  function rejectLeave(id) {
    setLeaveRequests(leaveRequests.map(l => l.id === id ? { ...l, status: 'Rejected' } : l));
  }

  const filteredEmployees = employees.filter(e => {
    const matchSearch = (e.name + ' ' + e.role + ' ' + e.dept + ' ' + e.loc + ' ' + e.id).toLowerCase().includes(searchTerm.toLowerCase());
    const matchDept = filterDept === 'ALL' || e.dept.toLowerCase().includes(filterDept.toLowerCase());
    return matchSearch && matchDept;
  });

  return (
    <DashboardLayout
      category="Employees & HR"
      subcategory="HR Dashboard"
      title="Human Resources & Workforce Executive Command Center"
      subtitle="Executive headcount telemetry, talent acquisition pacing, attendance governance, and payroll expenditure"
      icon="🧑‍💼"
      badge="208 Total Employees · 97.4% Retention"
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setShowAddModal(true)}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              border: 'none',
              background: '#3b82f6',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>➕</span> Onboard Staff
          </button>
          <button
            onClick={() => {
              setSynced(true);
              setTimeout(() => setSynced(false), 2200);
            }}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              border: '1px solid rgba(255,255,255,0.15)',
              background: synced ? '#10b981' : 'rgba(255,255,255,0.06)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>{synced ? '✅' : '🔄'}</span> {synced ? 'Roster Synced!' : 'Sync HRIS'}
          </button>
        </div>
      }
    >
      {/* Navigation Tabs Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        overflowX: 'auto',
        padding: '6px',
        background: 'var(--card, #131b2e)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '10px',
        marginBottom: '20px'
      }}>
        {[
          { id: 'overview', label: 'HR Executive Overview', icon: '🧑‍💼' },
          { id: 'directory', label: 'Workforce Directory', icon: '👥', badge: employees.length },
          { id: 'attendance', label: 'Attendance & Leaves', icon: '⏰', badge: `${leaveRequests.filter(l => l.status === 'Pending').length} Pending` },
          { id: 'payroll', label: 'Payroll & Cost Ledger', icon: '💵', badge: '₹1.64 Cr' },
          { id: 'recruitment', label: 'Talent Acquisition', icon: '📢', badge: `${openJobs.length} Roles` },
          { id: 'performance', label: 'Performance & Culture', icon: '⭐', badge: '93.8%' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '7px',
              height: '36px',
              padding: '0 16px',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === t.id ? '#3b82f6' : 'transparent',
              color: activeTab === t.id ? '#ffffff' : 'var(--muted-foreground, #94a3b8)',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease'
            }}
          >
            <span>{t.icon}</span>
            <span>{t.label}</span>
            {t.badge && (
              <span style={{
                fontSize: '10px',
                padding: '1px 6px',
                borderRadius: '99px',
                background: activeTab === t.id ? 'rgba(255,255,255,0.2)' : 'rgba(59,130,246,0.15)',
                color: activeTab === t.id ? '#fff' : '#93c5fd'
              }}>
                {t.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div>
          {/* Top Level KPIs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '20px' }}>
            <KpiCard label="Active Headcount" value="208 Staff" delta="+14 this quarter" trend="up" subtext="Across 6 core divisions" icon="👥" />
            <KpiCard label="Monthly Payroll Burn" value="₹1.64 Cr" delta="98.2% budget adherence" trend="neutral" subtext="Salaries, PF, ESI & bonuses" icon="💵" />
            <KpiCard label="Workforce Retention Rate" value="97.4%" delta="+2.1% YoY gain" trend="up" subtext="Top-quartile benchmark" icon="🤝" />
            <KpiCard label="eNPS Pulse Score" value="+68 eNPS" delta="Top quartile morale" trend="up" subtext="Quarterly employee pulse" icon="❤️" />
          </div>

          {/* Department Stratification & Vital Signs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '16px', marginBottom: '20px' }}>
            <div style={{
              background: 'var(--card, #1e293b)',
              border: '1px solid var(--border, rgba(255,255,255,0.08))',
              borderRadius: '12px',
              padding: '20px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>🏢 Department Headcount &amp; Budget</h3>
                <span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '6px', background: 'rgba(59,130,246,0.15)', color: '#60a5fa', fontWeight: 600 }}>Active Roster</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {deptHeadcounts.map(d => {
                  const pct = Math.round((d.count / 208) * 100);
                  return (
                    <div key={d.name}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                        <span style={{ color: d.color, fontWeight: 600 }}>{d.name}</span>
                        <span style={{ color: 'var(--muted-foreground, #94a3b8)', fontFamily: '"IBM Plex Mono", monospace' }}>{d.count} staff · {pct}% ({d.budget})</span>
                      </div>
                      <div style={{ height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '99px', overflow: 'hidden' }}>
                        <div style={{ width: `${pct}%`, height: '100%', background: d.color, borderRadius: '99px' }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{
              background: 'var(--card, #1e293b)',
              border: '1px solid var(--border, rgba(255,255,255,0.08))',
              borderRadius: '12px',
              padding: '20px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>⚡ Workforce Vital Signs</h3>
                <span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '6px', background: 'rgba(16,185,129,0.15)', color: '#10b981', fontWeight: 600 }}>Healthy Org</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)' }}>
                  <div style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>Clocked In Today</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: '#f8fafc', marginTop: '2px' }}>198 / 208</div>
                  <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px' }}>95.2% active staffing</div>
                </div>
                <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(14,165,233,0.06)', border: '1px solid rgba(14,165,233,0.2)' }}>
                  <div style={{ fontSize: '11px', color: '#38bdf8', fontWeight: 600 }}>Time to Hire</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: '#f8fafc', marginTop: '2px' }}>18.4 Days</div>
                  <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px' }}>Fast clinical sourcing</div>
                </div>
                <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)' }}>
                  <div style={{ fontSize: '11px', color: '#fbbf24', fontWeight: 600 }}>Pending Leaves</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: '#f8fafc', marginTop: '2px' }}>3 Requests</div>
                  <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px' }}>Awaiting manager signoff</div>
                </div>
                <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.2)' }}>
                  <div style={{ fontSize: '11px', color: '#c4b5fd', fontWeight: 600 }}>Day-1 Readiness</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: '#f8fafc', marginTop: '2px' }}>98.5%</div>
                  <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px' }}>IT hardware &amp; credentials</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Directory */}
      {activeTab === 'directory' && (
        <div style={{
          background: 'var(--card, #1e293b)',
          border: '1px solid var(--border, rgba(255,255,255,0.08))',
          borderRadius: '12px',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <input
              type="text"
              placeholder="Search by name, role, department, location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: '1 1 300px',
                padding: '8px 14px',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'rgba(0,0,0,0.25)',
                color: '#fff',
                fontSize: '12px'
              }}
            />
            <select
              value={filterDept}
              onChange={(e) => setFilterDept(e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.12)',
                background: '#0f172a',
                color: '#fff',
                fontSize: '12px'
              }}
            >
              <option value="ALL">All Departments</option>
              <option value="Clinical">Clinical</option>
              <option value="Pharmacy">Pharmacy</option>
              <option value="Logistics">Logistics</option>
              <option value="Warehouse">Warehouse</option>
              <option value="Technology">Technology</option>
            </select>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)', color: 'var(--muted-foreground, #94a3b8)' }}>
                  <th style={{ padding: '12px 16px' }}>Staff Member</th>
                  <th style={{ padding: '12px 16px' }}>Department</th>
                  <th style={{ padding: '12px 16px' }}>Location</th>
                  <th style={{ padding: '12px 16px' }}>Contact Info</th>
                  <th style={{ padding: '12px 16px' }}>Gross CTC</th>
                  <th style={{ padding: '12px 16px' }}>Status</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map(e => (
                  <tr key={e.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ fontWeight: 600, color: '#f8fafc' }}>{e.name}</div>
                      <div style={{ fontSize: '11px', fontFamily: '"IBM Plex Mono", monospace', color: 'var(--muted-foreground, #94a3b8)' }}>{e.id} · {e.role}</div>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ padding: '3px 8px', borderRadius: '6px', fontSize: '11px', background: 'rgba(56,189,248,0.15)', color: '#38bdf8', fontWeight: 600 }}>
                        {e.dept}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', color: '#cbd5e1' }}>{e.loc}</td>
                    <td style={{ padding: '12px 16px', color: '#94a3b8' }}>{e.email}<br/><small style={{ color: '#64748b' }}>{e.phone}</small></td>
                    <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', color: '#34d399', fontWeight: 600 }}>{e.salary}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{
                        padding: '3px 8px',
                        borderRadius: '99px',
                        fontSize: '10px',
                        fontWeight: 700,
                        background: e.status === 'Active' ? 'rgba(16,185,129,0.15)' : 'rgba(245,158,11,0.15)',
                        color: e.status === 'Active' ? '#10b981' : '#f59e0b'
                      }}>
                        ● {e.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                      <button
                        onClick={() => setSelectedStaff(e)}
                        style={{
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          border: '1px solid rgba(255,255,255,0.15)',
                          background: 'transparent',
                          color: '#93c5fd',
                          cursor: 'pointer'
                        }}
                      >
                        View 360°
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Attendance & Leaves */}
      {activeTab === 'attendance' && (
        <div style={{
          background: 'var(--card, #1e293b)',
          border: '1px solid var(--border, rgba(255,255,255,0.08))',
          borderRadius: '12px',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Leave Requests Approval Queue ({leaveRequests.length})</h3>
            <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>Biometric Sync: Online</span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)', color: 'var(--muted-foreground, #94a3b8)' }}>
                  <th style={{ padding: '12px 16px' }}>Request ID</th>
                  <th style={{ padding: '12px 16px' }}>Staff Member</th>
                  <th style={{ padding: '12px 16px' }}>Leave Category</th>
                  <th style={{ padding: '12px 16px' }}>Duration</th>
                  <th style={{ padding: '12px 16px' }}>Available Balance</th>
                  <th style={{ padding: '12px 16px' }}>Status</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {leaveRequests.map(lr => (
                  <tr key={lr.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', color: '#93c5fd' }}>{lr.id}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ fontWeight: 600, color: '#f8fafc' }}>{lr.name}</div>
                      <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)' }}>{lr.role}</div>
                    </td>
                    <td style={{ padding: '12px 16px', color: '#cbd5e1' }}>{lr.type}</td>
                    <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', color: '#f8fafc' }}>{lr.dates}</td>
                    <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', color: '#34d399' }}>{lr.bal}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{
                        padding: '3px 8px',
                        borderRadius: '99px',
                        fontSize: '10px',
                        fontWeight: 700,
                        background: lr.status === 'Approved' ? 'rgba(16,185,129,0.15)' : lr.status === 'Pending' ? 'rgba(234,179,8,0.15)' : 'rgba(239,68,68,0.15)',
                        color: lr.status === 'Approved' ? '#10b981' : lr.status === 'Pending' ? '#eab308' : '#ef4444'
                      }}>
                        ● {lr.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                      {lr.status === 'Pending' ? (
                        <div style={{ display: 'inline-flex', gap: '6px' }}>
                          <button onClick={() => approveLeave(lr.id)} style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, background: '#10b981', color: '#fff', border: 'none', cursor: 'pointer' }}>Approve</button>
                          <button onClick={() => rejectLeave(lr.id)} style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, background: '#ef4444', color: '#fff', border: 'none', cursor: 'pointer' }}>Reject</button>
                        </div>
                      ) : (
                        <span style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)' }}>Processed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Payroll & Cost */}
      {activeTab === 'payroll' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '20px' }}>
            <KpiCard label="Monthly Gross Disbursal" value="₹1,64,30,000" delta="100% processed" trend="neutral" subtext="Month of September 2026" icon="💵" />
            <KpiCard label="PF &amp; ESI Statutory" value="₹19,71,600" delta="Remitted to EPFO" trend="neutral" subtext="Zero compliance default" icon="🏛️" />
            <KpiCard label="TDS Tax Deducted" value="₹24,80,000" delta="Sec 192 compliant" trend="neutral" subtext="Form 24Q deposit ready" icon="🧾" />
            <KpiCard label="Annualized CTC Spend" value="₹19.66 Cr" delta="Budget: ₹20.5 Cr" trend="up" subtext="FY 2026-2027 plan" icon="💰" />
          </div>

          <div style={{
            background: 'var(--card, #1e293b)',
            border: '1px solid var(--border, rgba(255,255,255,0.08))',
            borderRadius: '12px',
            padding: '20px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>🏦 Corporate Bank Disbursal Batches</h3>
                <p style={{ margin: '2px 0 0', fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)' }}>HDFC Corporate Banking &amp; ICICI CMS gateway</p>
              </div>
              <button
                onClick={() => alert('Corporate NEFT Batch XML downloaded successfully.')}
                style={{ padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, background: '#10b981', color: '#fff', border: 'none', cursor: 'pointer' }}
              >
                📥 Download Bank Batch (NEFT)
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px', fontSize: '12px' }}>
              <div style={{ background: 'rgba(0,0,0,0.25)', padding: '14px', borderRadius: '10px' }}>
                <strong style={{ color: '#f8fafc' }}>Batch HDFC-0926-01 (Clinical &amp; Doctors)</strong>
                <div style={{ color: '#34d399', fontFamily: '"IBM Plex Mono", monospace', fontSize: '16px', margin: '4px 0' }}>₹64,50,000</div>
                <div style={{ color: '#94a3b8' }}>48 Accounts Credited · Verified ✅</div>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.25)', padding: '14px', borderRadius: '10px' }}>
                <strong style={{ color: '#f8fafc' }}>Batch HDFC-0926-02 (Tech, Pharmacy, Ops)</strong>
                <div style={{ color: '#34d399', fontFamily: '"IBM Plex Mono", monospace', fontSize: '16px', margin: '4px 0' }}>₹72,80,000</div>
                <div style={{ color: '#94a3b8' }}>84 Accounts Credited · Verified ✅</div>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.25)', padding: '14px', borderRadius: '10px' }}>
                <strong style={{ color: '#f8fafc' }}>Batch ICICI-0926-03 (Delivery Riders)</strong>
                <div style={{ color: '#34d399', fontFamily: '"IBM Plex Mono", monospace', fontSize: '16px', margin: '4px 0' }}>₹27,00,000</div>
                <div style={{ color: '#94a3b8' }}>76 Accounts Credited · Verified ✅</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Recruitment */}
      {activeTab === 'recruitment' && (
        <div style={{
          background: 'var(--card, #1e293b)',
          border: '1px solid var(--border, rgba(255,255,255,0.08))',
          borderRadius: '12px',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Open Requisitions &amp; Hiring Pipeline ({openJobs.length})</h3>
            <button
              onClick={() => setShowReqModal(true)}
              style={{ padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, background: '#3b82f6', color: '#fff', border: 'none', cursor: 'pointer' }}
            >
              ➕ Post New Job
            </button>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)', color: 'var(--muted-foreground, #94a3b8)' }}>
                  <th style={{ padding: '12px 16px' }}>Requisition &amp; Role</th>
                  <th style={{ padding: '12px 16px' }}>Department</th>
                  <th style={{ padding: '12px 16px' }}>Location</th>
                  <th style={{ padding: '12px 16px' }}>Openings</th>
                  <th style={{ padding: '12px 16px' }}>Applicants</th>
                  <th style={{ padding: '12px 16px' }}>Interviews</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right' }}>Priority</th>
                </tr>
              </thead>
              <tbody>
                {openJobs.map(j => (
                  <tr key={j.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ fontWeight: 600, color: '#f8fafc' }}>{j.title}</div>
                      <div style={{ fontSize: '11px', fontFamily: '"IBM Plex Mono", monospace', color: 'var(--muted-foreground, #94a3b8)' }}>{j.id}</div>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ padding: '3px 8px', borderRadius: '6px', fontSize: '11px', background: 'rgba(56,189,248,0.15)', color: '#38bdf8' }}>{j.dept}</span>
                    </td>
                    <td style={{ padding: '12px 16px', color: '#cbd5e1' }}>{j.loc}</td>
                    <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#f8fafc' }}>{j.openings}</td>
                    <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', color: '#38bdf8' }}>{j.applicants}</td>
                    <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', color: '#f59e0b' }}>{j.interview}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                      <span style={{
                        padding: '3px 8px',
                        borderRadius: '99px',
                        fontSize: '10px',
                        fontWeight: 700,
                        background: j.priority === 'Urgent' ? 'rgba(239,68,68,0.15)' : 'rgba(245,158,11,0.15)',
                        color: j.priority === 'Urgent' ? '#ef4444' : '#f59e0b'
                      }}>
                        ● {j.priority}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 6: Performance */}
      {activeTab === 'performance' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '20px' }}>
            <KpiCard label="Avg Org KPI Score" value="93.8 / 100" delta="+2.4% vs Q2" trend="up" subtext="Across all 208 staff" icon="🎯" />
            <KpiCard label="Top Performers (5★)" value="34 Staff" delta="16.3% of cohort" trend="up" subtext="Eligible for merit bonus" icon="🌟" />
            <KpiCard label="Pet Parent CSAT" value="4.86 / 5.0" delta="Top quartile benchmark" trend="up" subtext="14,800+ reviews" icon="❤️" />
            <KpiCard label="Appraisals Completed" value="192 / 208" delta="92.3% closed" trend="neutral" subtext="16 reviews pending" icon="📝" />
          </div>

          <div style={{
            background: 'var(--card, #1e293b)',
            border: '1px solid var(--border, rgba(255,255,255,0.08))',
            borderRadius: '12px',
            padding: '20px'
          }}>
            <h3 style={{ margin: '0 0 14px', fontSize: '15px', fontWeight: 700 }}>🏆 Q3 2026 Employee Recognition &amp; Spot Awards</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
              <div style={{ background: 'rgba(0,0,0,0.25)', padding: '14px', borderRadius: '10px', borderLeft: '3px solid #10b981' }}>
                <div style={{ fontWeight: 700, color: '#f8fafc' }}>Dr. Priya Sharma</div>
                <div style={{ fontSize: '11px', color: '#34d399' }}>Chief Clinical Officer · Clinical Excellence Award</div>
                <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>Handled 342 high-complexity surgical consultations with 99.4% SLA adherence.</div>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.25)', padding: '14px', borderRadius: '10px', borderLeft: '3px solid #ec4899' }}>
                <div style={{ fontWeight: 700, color: '#f8fafc' }}>Sneha Chawla</div>
                <div style={{ fontSize: '11px', color: '#f472b6' }}>Senior AI Engineer · Tech Innovation Award</div>
                <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>Delivered Zenve Pet AI Clinical Assistant with 96.8% diagnostic accuracy.</div>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.25)', padding: '14px', borderRadius: '10px', borderLeft: '3px solid #f59e0b' }}>
                <div style={{ fontWeight: 700, color: '#f8fafc' }}>Manish Rawat</div>
                <div style={{ fontSize: '11px', color: '#fbbf24' }}>Express Delivery Rider · Rapid Dispatch Star</div>
                <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>Completed 612 deliveries within 34-min average turnaround and zero damages.</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Staff 360 Modal */}
      {selectedStaff && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <div style={{
            background: '#162036',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '14px',
            padding: '24px',
            maxWidth: '520px',
            width: '90%',
            color: '#fff'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '18px' }}>👤 Staff Profile: {selectedStaff.name}</h3>
              <button onClick={() => setSelectedStaff(null)} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '18px', cursor: 'pointer' }}>✕</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13px' }}>
              <div><strong style={{ color: '#94a3b8' }}>ID:</strong> <div style={{ fontFamily: 'monospace' }}>{selectedStaff.id}</div></div>
              <div><strong style={{ color: '#94a3b8' }}>Role:</strong> <div>{selectedStaff.role}</div></div>
              <div><strong style={{ color: '#94a3b8' }}>Department:</strong> <div>{selectedStaff.dept}</div></div>
              <div><strong style={{ color: '#94a3b8' }}>Location:</strong> <div>{selectedStaff.loc}</div></div>
              <div><strong style={{ color: '#94a3b8' }}>Official Email:</strong> <div>{selectedStaff.email}</div></div>
              <div><strong style={{ color: '#94a3b8' }}>Phone:</strong> <div>{selectedStaff.phone}</div></div>
              <div><strong style={{ color: '#94a3b8' }}>Joined Date:</strong> <div>{selectedStaff.joined}</div></div>
              <div><strong style={{ color: '#94a3b8' }}>Gross CTC:</strong> <div style={{ color: '#34d399', fontWeight: 600 }}>{selectedStaff.salary}</div></div>
            </div>
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setSelectedStaff(null)} style={{ padding: '8px 16px', borderRadius: '8px', background: '#3b82f6', border: 'none', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Onboard Modal */}
      {showAddModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <div style={{
            background: '#162036',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '14px',
            padding: '24px',
            maxWidth: '500px',
            width: '90%',
            color: '#fff'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '18px' }}>➕ Onboard New Employee</h3>
              <button onClick={() => setShowAddModal(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '18px', cursor: 'pointer' }}>✕</button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.target);
              const newEmp = {
                id: `EMP-${Math.floor(1000 + Math.random() * 9000)}`,
                name: fd.get('name'),
                role: fd.get('role'),
                dept: fd.get('dept'),
                loc: fd.get('loc'),
                email: fd.get('name').toLowerCase().replace(/ /g, '.') + '@zenve.in',
                phone: '+91 98000 00000',
                joined: 'Today',
                status: 'Active',
                salary: '₹85,000/mo',
                rating: '5.0★'
              };
              setEmployees([newEmp, ...employees]);
              setShowAddModal(false);
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input required name="name" placeholder="Full Name" style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(0,0,0,0.25)', color: '#fff' }} />
                <input required name="role" placeholder="Role / Designation" style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(0,0,0,0.25)', color: '#fff' }} />
                <select name="dept" style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.12)', background: '#0f172a', color: '#fff' }}>
                  <option value="Clinical">Veterinary Clinical</option>
                  <option value="Pharmacy">Pharmacy</option>
                  <option value="Logistics">Logistics & Delivery</option>
                  <option value="Warehouse">Warehouse Ops</option>
                  <option value="Technology">Technology & AI</option>
                  <option value="Customer Delight">Customer Delight</option>
                </select>
                <input required name="loc" placeholder="Work Location (e.g. Bengaluru Flagship)" style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(0,0,0,0.25)', color: '#fff' }} />
              </div>
              <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={() => setShowAddModal(false)} style={{ padding: '8px 16px', borderRadius: '8px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ padding: '8px 16px', borderRadius: '8px', background: '#3b82f6', border: 'none', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>Save Staff</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Requisition Modal */}
      {showReqModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <div style={{
            background: '#162036',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '14px',
            padding: '24px',
            maxWidth: '500px',
            width: '90%',
            color: '#fff'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '18px' }}>📢 Post Job Requisition</h3>
              <button onClick={() => setShowReqModal(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '18px', cursor: 'pointer' }}>✕</button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.target);
              const newJob = {
                id: `REQ-${Math.floor(100 + Math.random() * 900)}`,
                title: fd.get('title'),
                dept: fd.get('dept'),
                loc: fd.get('loc'),
                openings: Number(fd.get('openings')),
                applicants: 0,
                interview: 0,
                priority: 'High'
              };
              setOpenJobs([newJob, ...openJobs]);
              setShowReqModal(false);
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input required name="title" placeholder="Job Title (e.g. Critical Care Surgeon)" style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(0,0,0,0.25)', color: '#fff' }} />
                <select name="dept" style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.12)', background: '#0f172a', color: '#fff' }}>
                  <option value="Clinical">Veterinary Clinical</option>
                  <option value="Pharmacy">Pharmacy</option>
                  <option value="Logistics">Logistics & Delivery</option>
                  <option value="Warehouse">Warehouse Ops</option>
                  <option value="Technology">Technology & AI</option>
                </select>
                <input required name="loc" placeholder="Location" style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(0,0,0,0.25)', color: '#fff' }} />
                <input required name="openings" type="number" min="1" defaultValue="1" placeholder="Number of Vacancies" style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(0,0,0,0.25)', color: '#fff' }} />
              </div>
              <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={() => setShowReqModal(false)} style={{ padding: '8px 16px', borderRadius: '8px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ padding: '8px 16px', borderRadius: '8px', background: '#3b82f6', border: 'none', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>Publish Job</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
