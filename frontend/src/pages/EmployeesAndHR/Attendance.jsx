import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function Attendance() {
  const [shiftFilter, setShiftFilter] = useState('ALL');
  const [selectedDate, setSelectedDate] = useState('2026-10-05');

  const punches = [
    { empId: 'EMP-1001', name: 'Dr. Priya Sharma', shift: 'Morning Clinical (08:00 - 16:30)', punchIn: '07:54 AM', punchOut: 'Pending', status: 'On Time', location: 'Bengaluru Flagship (Biometric)', otHours: '0.0h' },
    { empId: 'EMP-1002', name: 'Dr. Rahul Mehta', shift: 'Morning Clinical (08:00 - 16:30)', punchIn: '07:58 AM', punchOut: 'Pending', status: 'On Time', location: 'Mumbai Center (Biometric)', otHours: '0.0h' },
    { empId: 'EMP-1003', name: 'Rohan Deshmukh', shift: 'General Shift (09:00 - 18:00)', punchIn: '08:52 AM', punchOut: 'Pending', status: 'On Time', location: 'Bengaluru Hub (RFID)', otHours: '0.0h' },
    { empId: 'EMP-1004', name: 'Sneha Chawla', shift: 'Flexible Tech (09:30 - 18:30)', punchIn: '09:28 AM', punchOut: 'Pending', status: 'On Time', location: 'Remote (Geo-Mobile)', otHours: '0.0h' },
    { empId: 'EMP-1005', name: 'Vikram Joshi', shift: 'General Shift (09:00 - 18:00)', punchIn: '08:45 AM', punchOut: 'Pending', status: 'On Time', location: 'Bengaluru South (RFID)', otHours: '0.0h' },
    { empId: 'EMP-1006', name: 'Ananya Verma', shift: 'Early Warehouse (06:00 - 14:30)', punchIn: '05:50 AM', punchOut: '02:35 PM', status: 'On Time', location: 'Bhiwandi Hub (Biometric)', otHours: '0.5h' },
    { empId: 'EMP-1007', name: 'Manish Rawat', shift: 'Afternoon Express (12:00 - 21:00)', punchIn: '12:12 PM', punchOut: 'Pending', status: 'Late Mark', location: 'Mumbai Bandra (Mobile App)', otHours: '0.0h' },
    { empId: 'EMP-1008', name: 'Dr. Aisha Khan', shift: 'On Approved Leave', punchIn: '—', punchOut: '—', status: 'On Leave', location: 'Delhi NCR Clinic', otHours: '0.0h' },
    { empId: 'EMP-1009', name: 'Pooja Hegde', shift: 'General Shift (09:00 - 18:00)', punchIn: '08:55 AM', punchOut: 'Pending', status: 'On Time', location: 'Bengaluru HQ (Biometric)', otHours: '0.0h' },
    { empId: 'EMP-1010', name: 'Kunal Sen', shift: 'Early Warehouse (06:00 - 14:30)', punchIn: '05:58 AM', punchOut: '02:30 PM', status: 'On Time', location: 'Bengaluru Hub (Biometric)', otHours: '0.0h' }
  ];

  const filtered = punches.filter(p => {
    if (shiftFilter === 'ALL') return true;
    return p.shift.includes(shiftFilter);
  });

  return (
    <DashboardLayout
      category="Employees & HR"
      subcategory="Attendance"
      title="Biometric Punch Telemetry & Shift Roster"
      subtitle="Live facial & fingerprint biometric terminal logs, geo-fenced mobile punches, shift rosters, and punctuality monitoring"
      icon="⏰"
      badge="Today: 198 Clocked In · 96.8% Punctuality"
    >
      {/* Top Level KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Present on Duty Today" value="198 / 208 Staff" delta="95.2% workforce" trend="up" subtext="Across 7 clinic/hub nodes" icon="🟢" />
        <KpiCard label="Punctuality Rate" value="96.8%" delta="+1.2% this month" trend="up" subtext="Arrived before shift grace period" icon="⏱️" />
        <KpiCard label="Late Arrivals Today" value="4 Personnel" delta="Within 15-min grace" trend="neutral" subtext="Rider transit delays" icon="⚠️" />
        <KpiCard label="Approved Leaves Today" value="6 Staff" delta="Planned absence" trend="neutral" subtext="Rosters balanced" icon="🏖️" />
      </div>

      {/* Roster Filter Bar */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)', fontWeight: 600 }}>Shift Roster:</span>
          <div style={{ display: 'flex', gap: '6px' }}>
            {['ALL', 'Morning Clinical', 'General Shift', 'Early Warehouse', 'Afternoon Express'].map(s => (
              <button
                key={s}
                onClick={() => setShiftFilter(s)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: '1px solid',
                  borderColor: shiftFilter === s ? '#3b82f6' : 'rgba(255,255,255,0.1)',
                  background: shiftFilter === s ? '#3b82f6' : 'transparent',
                  color: shiftFilter === s ? '#fff' : 'var(--muted-foreground, #94a3b8)'
                }}
              >
                {s === 'ALL' ? 'All Shifts' : s}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Log Date:</span>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{
              padding: '6px 10px',
              borderRadius: '6px',
              border: '1px solid rgba(255,255,255,0.12)',
              background: '#0f172a',
              color: '#fff',
              fontSize: '12px'
            }}
          />
        </div>
      </div>

      {/* Attendance Punch Table */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        overflow: 'hidden'
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Real-Time Clock-In Stream ({filtered.length} entries)</h3>
          <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>Biometric Hardware Sync: Online</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)', color: 'var(--muted-foreground, #94a3b8)' }}>
                <th style={{ padding: '12px 16px' }}>Employee</th>
                <th style={{ padding: '12px 16px' }}>Assigned Shift</th>
                <th style={{ padding: '12px 16px' }}>Punch In</th>
                <th style={{ padding: '12px 16px' }}>Punch Out</th>
                <th style={{ padding: '12px 16px' }}>Terminal &amp; Verification</th>
                <th style={{ padding: '12px 16px' }}>Overtime</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.empId} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ fontWeight: 600, color: '#f8fafc' }}>{p.name}</div>
                    <div style={{ fontSize: '11px', fontFamily: '"IBM Plex Mono", monospace', color: 'var(--muted-foreground, #94a3b8)' }}>{p.empId}</div>
                  </td>
                  <td style={{ padding: '12px 16px', color: '#cbd5e1' }}>{p.shift}</td>
                  <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', color: p.punchIn === '—' ? '#64748b' : '#34d399', fontWeight: 600 }}>{p.punchIn}</td>
                  <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', color: 'var(--muted-foreground, #94a3b8)' }}>{p.punchOut}</td>
                  <td style={{ padding: '12px 16px', fontSize: '11px', color: '#94a3b8' }}>{p.location}</td>
                  <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', color: p.otHours !== '0.0h' ? '#f59e0b' : '#64748b' }}>{p.otHours}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '99px',
                      fontSize: '10px',
                      fontWeight: 700,
                      background: p.status === 'On Time' ? 'rgba(16,185,129,0.15)' : p.status === 'Late Mark' ? 'rgba(239,68,68,0.15)' : 'rgba(245,158,11,0.15)',
                      color: p.status === 'On Time' ? '#10b981' : p.status === 'Late Mark' ? '#ef4444' : '#f59e0b'
                    }}>
                      ● {p.status}
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
