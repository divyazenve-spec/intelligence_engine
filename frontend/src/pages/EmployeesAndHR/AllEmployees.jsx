import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function AllEmployees() {
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [employees, setEmployees] = useState([]);

  const filtered = employees.filter(e => {
    const matchSearch = (e.name + ' ' + e.role + ' ' + e.id + ' ' + e.email + ' ' + e.location).toLowerCase().includes(searchTerm.toLowerCase());
    const matchDept = deptFilter === 'ALL' || e.dept === deptFilter;
    const matchStatus = statusFilter === 'ALL' || e.status === statusFilter;
    return matchSearch && matchDept && matchStatus;
  });

  return (
    <DashboardLayout
      category="Employees & HR"
      subcategory="All Employees"
      title="Employee Directory & Workforce Master"
      subtitle="Complete centralized registry of clinical specialists, field logistics, pharmacy, and engineering staff"
      icon="👥"
      badge=""
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setShowAddModal(true)}
            style={{
              padding: '6px 14px',
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
            <span>➕</span> Add New Employee
          </button>
        </div>
      }
    >
      {/* Top Level KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Staff Members" value="0" delta="0.0%" trend="neutral" subtext="No divisions active" icon="👥" />
        <KpiCard label="Active on Duty" value="0" delta="0.0%" trend="neutral" subtext="In clinic, warehouse & field" icon="🟢" />
        <KpiCard label="On Approved Leave" value="0" delta="--" trend="neutral" subtext="Adequately backed up" icon="🏖️" />
        <KpiCard label="Probation / Onboarding" value="0" delta="--" trend="neutral" subtext="All mentoring on track" icon="🐣" />
      </div>

      {/* Filter and Search Bar */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '16px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', flex: '1 1 300px', gap: '10px' }}>
          <input
            type="text"
            placeholder="Search by name, role, ID, email, location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 14px',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.12)',
              background: 'rgba(0,0,0,0.25)',
              color: '#fff',
              fontSize: '13px'
            }}
          />
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
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
            <option value="Clinical">Clinical Services</option>
            <option value="Pharmacy">Pharmacy</option>
            <option value="Logistics">Logistics & Delivery</option>
            <option value="Warehouse">Warehouse Ops</option>
            <option value="Technology">Technology & AI</option>
            <option value="Customer Delight">Customer Delight</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.12)',
              background: '#0f172a',
              color: '#fff',
              fontSize: '12px'
            }}
          >
            <option value="ALL">All Statuses</option>
            <option value="Active">Active</option>
            <option value="On Leave">On Leave</option>
            <option value="Probation">Probation</option>
          </select>
        </div>
      </div>

      {/* Employees Table */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        overflow: 'hidden'
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Staff Members Directory ({filtered.length})</h3>
          <span style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)' }}>Showing matching roster entries</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)', color: 'var(--muted-foreground, #94a3b8)' }}>
                <th style={{ padding: '12px 16px' }}>Employee</th>
                <th style={{ padding: '12px 16px' }}>Department</th>
                <th style={{ padding: '12px 16px' }}>Location</th>
                <th style={{ padding: '12px 16px' }}>Type</th>
                <th style={{ padding: '12px 16px' }}>Joined Date</th>
                <th style={{ padding: '12px 16px' }}>Status</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (<tr><td colSpan="8" style={{ textAlign: "center", padding: "32px", color: "var(--muted-foreground, #64748b)" }}>No employee records found</td></tr>) : filtered.map(emp => (
                <tr key={emp.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '12px',
                        color: '#fff'
                      }}>
                        {emp.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, color: '#f8fafc' }}>{emp.name}</div>
                        <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)' }}>{emp.role} · <span style={{ fontFamily: '"IBM Plex Mono", monospace' }}>{emp.id}</span></div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      background: emp.dept === 'Clinical' ? 'rgba(16,185,129,0.15)' : emp.dept === 'Pharmacy' ? 'rgba(14,165,233,0.15)' : 'rgba(139,92,246,0.15)',
                      color: emp.dept === 'Clinical' ? '#34d399' : emp.dept === 'Pharmacy' ? '#38bdf8' : '#a78bfa',
                      fontWeight: 600
                    }}>
                      {emp.dept}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', color: '#cbd5e1' }}>{emp.location}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--muted-foreground, #94a3b8)' }}>{emp.type}</td>
                  <td style={{ padding: '12px 16px', fontFamily: '"IBM Plex Mono", monospace', color: 'var(--muted-foreground, #94a3b8)' }}>{emp.joined}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '99px',
                      fontSize: '10px',
                      fontWeight: 700,
                      background: emp.status === 'Active' ? 'rgba(16,185,129,0.15)' : emp.status === 'On Leave' ? 'rgba(245,158,11,0.15)' : 'rgba(99,102,241,0.15)',
                      color: emp.status === 'Active' ? '#10b981' : emp.status === 'On Leave' ? '#f59e0b' : '#818cf8'
                    }}>
                      ● {emp.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <button
                      onClick={() => setSelectedEmp(emp)}
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

      {/* Selected Employee 360 View Modal */}
      {selectedEmp && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999
        }}>
          <div style={{
            background: '#1e293b',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '14px',
            padding: '24px',
            maxWidth: '520px',
            width: '90%',
            color: '#fff'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '18px' }}>👤 Employee Profile: {selectedEmp.name}</h3>
              <button onClick={() => setSelectedEmp(null)} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '18px', cursor: 'pointer' }}>✕</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13px' }}>
              <div><strong style={{ color: '#94a3b8' }}>Employee ID:</strong> <div style={{ fontFamily: '"IBM Plex Mono", monospace' }}>{selectedEmp.id}</div></div>
              <div><strong style={{ color: '#94a3b8' }}>Role:</strong> <div>{selectedEmp.role}</div></div>
              <div><strong style={{ color: '#94a3b8' }}>Department:</strong> <div>{selectedEmp.dept}</div></div>
              <div><strong style={{ color: '#94a3b8' }}>Work Location:</strong> <div>{selectedEmp.location}</div></div>
              <div><strong style={{ color: '#94a3b8' }}>Official Email:</strong> <div>{selectedEmp.email}</div></div>
              <div><strong style={{ color: '#94a3b8' }}>Direct Phone:</strong> <div>{selectedEmp.phone}</div></div>
              <div><strong style={{ color: '#94a3b8' }}>Joining Date:</strong> <div>{selectedEmp.joined}</div></div>
              <div><strong style={{ color: '#94a3b8' }}>Gross CTC:</strong> <div style={{ color: '#34d399', fontWeight: 600 }}>{selectedEmp.salary}</div></div>
            </div>
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setSelectedEmp(null)} style={{ padding: '8px 16px', borderRadius: '8px', background: '#3b82f6', border: 'none', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>Close Profile</button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Employee Modal */}
      {showAddModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999
        }}>
          <div style={{
            background: '#1e293b',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '14px',
            padding: '24px',
            maxWidth: '500px',
            width: '90%',
            color: '#fff'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '18px' }}>➕ Register New Employee</h3>
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
                location: fd.get('location'),
                email: fd.get('email'),
                phone: fd.get('phone'),
                joined: 'Today',
                status: 'Active',
                type: 'Full-time',
                salary: '₹0/mo'
              };
              setEmployees([newEmp, ...employees]);
              setShowAddModal(false);
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input required name="name" placeholder="Full Name" style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(0,0,0,0.25)', color: '#fff' }} />
                <input required name="role" placeholder="Designation / Role" style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(0,0,0,0.25)', color: '#fff' }} />
                <select name="dept" style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.12)', background: '#0f172a', color: '#fff' }}>
                  <option value="Clinical">Clinical Services</option>
                  <option value="Pharmacy">Pharmacy</option>
                  <option value="Logistics">Logistics & Delivery</option>
                  <option value="Warehouse">Warehouse Ops</option>
                  <option value="Technology">Technology & AI</option>
                  <option value="Customer Delight">Customer Delight</option>
                </select>
                <input required name="location" placeholder="Work Location (e.g. Bengaluru Hub)" style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(0,0,0,0.25)', color: '#fff' }} />
                <input required type="email" name="email" placeholder="Work Email" style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(0,0,0,0.25)', color: '#fff' }} />
                <input required name="phone" placeholder="Contact Number" style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(0,0,0,0.25)', color: '#fff' }} />
              </div>
              <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={() => setShowAddModal(false)} style={{ padding: '8px 16px', borderRadius: '8px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ padding: '8px 16px', borderRadius: '8px', background: '#3b82f6', border: 'none', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>Save &amp; Onboard</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
