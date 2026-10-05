import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function DoctorsDashboard() {
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const doctors = [
    { id: 'DOC-101', name: 'Dr. Divya Ramesh', spec: 'Lead Surgeon & Critical Care', regNo: 'KVC-8842', rating: '4.98', exp: '14 Yrs', patientsMtd: 242, revMtd: '₹6,40,000', comm: '₹1,28,000', status: 'On Duty', clinic: 'Indiranagar Flagship' },
    { id: 'DOC-102', name: 'Dr. Arvind Swaminathan', spec: 'Veterinary Cardiologist', regNo: 'KVC-9014', rating: '4.92', exp: '11 Yrs', patientsMtd: 188, revMtd: '₹4,85,000', comm: '₹97,000', status: 'In Surgery', clinic: 'Koramangala Trauma' },
    { id: 'DOC-103', name: 'Dr. Meera Nambiar', spec: 'Neurology & Orthopedics', regNo: 'KVC-7832', rating: '4.95', exp: '12 Yrs', patientsMtd: 174, revMtd: '₹4,30,000', comm: '₹86,000', status: 'On Duty', clinic: 'Whitefield Specialty' },
    { id: 'DOC-104', name: 'Dr. Siddharth Varma', spec: 'Pediatric & Neonatal Vet', regNo: 'KVC-9421', rating: '4.88', exp: '8 Yrs', patientsMtd: 215, revMtd: '₹3,90,000', comm: '₹78,000', status: 'On Duty', clinic: 'Jayanagar Wellness' },
    { id: 'DOC-105', name: 'Dr. Ananya Joshi', spec: 'Dermatology & Allergy', regNo: 'KVC-9250', rating: '4.85', exp: '9 Yrs', patientsMtd: 164, revMtd: '₹3,45,000', comm: '₹69,000', status: 'On Call', clinic: 'HSR Layout Clinic' },
    { id: 'DOC-106', name: 'Dr. Rohan Deshmukh', spec: 'Exotics & Avian Specialist', regNo: 'KVC-8711', rating: '4.90', exp: '10 Yrs', patientsMtd: 132, revMtd: '₹3,10,000', comm: '₹62,000', status: 'On Duty', clinic: 'Indiranagar Flagship' }
  ];

  const filtered = doctors.filter(d => {
    if (filter !== 'ALL' && d.status !== filter) return false;
    if (search) {
      const q = search.toLowerCase();
      return d.name.toLowerCase().includes(q) || d.spec.toLowerCase().includes(q) || d.clinic.toLowerCase().includes(q);
    }
    return true;
  });

  const cardStyle = {
    background: 'var(--card, #ffffff)',
    border: '1px solid var(--border, rgba(0,0,0,0.08))',
    borderRadius: '12px',
    padding: '22px 24px'
  };

  return (
    <DashboardLayout
      category="Doctors"
      subcategory="Executive Medical Command"
      title="Veterinary Medical Board & Practitioners"
      subtitle="Physician consultation quotas, clinical patient volume, surgical rosters, and commission settlements"
      icon="👨‍⚕️"
      badge="24 Board Certified"
      actions={
        <button
          onClick={() => alert('New Doctor Onboarding modal initiated...')}
          style={{
            padding: '6px 14px',
            borderRadius: '8px',
            border: '1px solid #059669',
            background: 'rgba(5,150,105,0.12)',
            color: '#065f46',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          + Add New Practitioner
        </button>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Active Veterinary Doctors" value="24 Doctors" delta="100% Licensed" trend="up" subtext="Across 6 clinic centers" icon="👨‍⚕️" />
        <KpiCard label="Monthly Patient Consults" value="2,148 Pets" delta="+18.4% MoM" trend="up" subtext="Avg 89 consults/doc" icon="🐾" />
        <KpiCard label="Doctor Attributed Revenue" value="₹36.85 Lakh" delta="+14.2% YoY" trend="up" subtext="Consults, meds & surgery" icon="💰" />
        <KpiCard label="Doctor Commissions Paid" value="₹7.37 Lakh" delta="20% standard rate" trend="neutral" subtext="Settled bi-weekly" icon="📋" />
        <KpiCard label="Avg. Patient Satisfaction" value="4.92 / 5.0" delta="1,840 ratings" trend="up" subtext="Top in feline & canine care" icon="⭐" />
        <KpiCard label="Surgical Success Rate" value="99.4%" delta="284 procedures" trend="up" subtext="Zero cross-contamination" icon="🛡️" />
      </div>

      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>👨‍⚕️ Practitioner Roster & Real-Time Clinical Standing</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Accreditation details, MTD consultation volume, and clinical commission accruals</p>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search practitioner or specialty..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid var(--border, #cbd5e1)', fontSize: '12px', background: '#f8fafc', color: '#0f172a', width: '220px' }}
            />
            {['ALL', 'On Duty', 'In Surgery', 'On Call'].map(s => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '8px',
                  border: filter === s ? '1px solid #059669' : '1px solid var(--border, #cbd5e1)',
                  background: filter === s ? '#059669' : '#ffffff',
                  color: filter === s ? '#ffffff' : '#334155',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border, #e2e8f0)', textAlign: 'left', color: 'var(--muted-foreground, #475569)' }}>
                <th style={{ padding: '10px' }}>Doctor ID</th>
                <th style={{ padding: '10px' }}>Practitioner Name</th>
                <th style={{ padding: '10px' }}>Primary Specialty</th>
                <th style={{ padding: '10px' }}>Center Clinic</th>
                <th style={{ padding: '10px' }}>MTD Patients</th>
                <th style={{ padding: '10px' }}>Attributed Revenue</th>
                <th style={{ padding: '10px' }}>Commissions</th>
                <th style={{ padding: '10px' }}>Rating</th>
                <th style={{ padding: '10px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(d => (
                <tr key={d.id} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                  <td style={{ padding: '10px', fontFamily: 'monospace', fontWeight: 600 }}>{d.id}</td>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{d.name}</td>
                  <td style={{ padding: '10px' }}>{d.spec}</td>
                  <td style={{ padding: '10px', color: '#64748b' }}>{d.clinic}</td>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{d.patientsMtd} pets</td>
                  <td style={{ padding: '10px', fontWeight: 600, color: '#059669' }}>{d.revMtd}</td>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{d.comm}</td>
                  <td style={{ padding: '10px', color: '#d97706', fontWeight: 600 }}>★ {d.rating}</td>
                  <td style={{ padding: '10px' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: d.status === 'On Duty' ? 'rgba(16,185,129,0.12)' : d.status === 'In Surgery' ? 'rgba(59,130,246,0.12)' : 'rgba(245,158,11,0.12)',
                      color: d.status === 'On Duty' ? '#047857' : d.status === 'In Surgery' ? '#1d4ed8' : '#b45309'
                    }}>
                      {d.status}
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
