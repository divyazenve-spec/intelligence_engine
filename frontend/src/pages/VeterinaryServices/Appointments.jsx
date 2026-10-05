import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function Appointments() {
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const appointments = [
    { id: 'APT-1041', time: '09:00 AM', pet: 'Koko (Pug)', parent: 'Ramesh Sundaram', doctor: 'Dr. Priya Sharma', clinic: 'Koramangala Pet Hospital', service: 'Annual Health Check & Rabies', slotType: 'Scheduled App', duration: '20 mins', status: 'Confirmed' },
    { id: 'APT-1042', time: '09:30 AM', pet: 'Ginger (Tabby Cat)', parent: 'Meera Sen', doctor: 'Dr. Aisha Khan', clinic: 'Indiranagar Care Center', service: 'Senior Feline Renal Profile', slotType: 'Scheduled App', duration: '30 mins', status: 'In Session' },
    { id: 'APT-1043', time: '10:00 AM', pet: 'Thor (Rottweiler)', parent: 'Deepak Varma', doctor: 'Dr. Rahul Mehta', clinic: 'Whitefield Specialty OT', service: 'Pre-Op Orthopedic Radiography', slotType: 'Referral', duration: '40 mins', status: 'Arrived / Checked In' },
    { id: 'APT-1044', time: '10:30 AM', pet: 'Daisy (Lhasa Apso)', parent: 'Nandita Bose', doctor: 'Dr. Karan Patel', clinic: 'Bandra West Super-Clinic', service: 'Cytology & Medicated Bath', slotType: 'Walk-In Priority', duration: '30 mins', status: 'Confirmed' },
    { id: 'APT-1045', time: '11:15 AM', pet: 'Whiskey (Golden Retriever)', parent: 'Amitabh Sen', doctor: 'Dr. Neha Singh', clinic: 'Gurugram Central Hospital', service: 'Echocardiogram & ECG Review', slotType: 'Scheduled App', duration: '45 mins', status: 'Confirmed' },
    { id: 'APT-1046', time: '12:00 PM', pet: 'Snowy (Maltese)', parent: 'Preeti Chawla', doctor: 'Dr. Priya Sharma', clinic: 'Koramangala Pet Hospital', service: 'Puppy Booster & Microchip', slotType: 'Scheduled App', duration: '20 mins', status: 'Scheduled' },
    { id: 'APT-1047', time: '01:30 PM', pet: 'Rocky (Doberman)', parent: 'Kabir Bakshi', doctor: 'Dr. Rahul Mehta', clinic: 'Whitefield Specialty OT', service: 'Post-Surgical Suture Removal', slotType: 'Follow-Up', duration: '15 mins', status: 'Scheduled' },
    { id: 'APT-1048', time: '02:15 PM', pet: 'Simba (Persian Cat)', parent: 'Zoya Merchant', doctor: 'Dr. Aisha Khan', clinic: 'Indiranagar Care Center', service: 'Vaccination & Deworming', slotType: 'Scheduled App', duration: '20 mins', status: 'Scheduled' },
    { id: 'APT-1049', time: '03:00 PM', pet: 'Tyson (Pitbull)', parent: 'Karthik Raja', doctor: 'Dr. Karan Patel', clinic: 'Bandra West Super-Clinic', service: 'Allergy Skin Scratch Panel', slotType: 'Scheduled App', duration: '30 mins', status: 'Rescheduled' }
  ];

  const filtered = appointments.filter(a => {
    const matchesFilter = filter === 'ALL' || a.status === filter || a.slotType === filter;
    const matchesSearch = a.pet.toLowerCase().includes(search.toLowerCase()) ||
      a.parent.toLowerCase().includes(search.toLowerCase()) ||
      a.doctor.toLowerCase().includes(search.toLowerCase()) ||
      a.clinic.toLowerCase().includes(search.toLowerCase()) ||
      a.service.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <DashboardLayout
      category="Veterinary Services"
      subcategory="Appointments"
      title="Appointment Dispatch & Clinic Scheduling"
      subtitle="Calendar capacity, slot utilization, doctor availability, patient queues, and no-show prevention metrics"
      icon="📅"
      badge="94.2% Slot Utilization"
      actions={
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {['ALL', 'Confirmed', 'In Session', 'Arrived / Checked In', 'Walk-In Priority', 'Scheduled'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                border: filter === f ? '1px solid #2563eb' : '1px solid #e2e8f0',
                background: filter === f ? '#eff6ff' : '#ffffff',
                color: filter === f ? '#2563eb' : '#64748b'
              }}
            >
              {f}
            </button>
          ))}
        </div>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Booked Slots Today" value="76 Slots" delta="94.2% capacity" trend="up" subtext="Across 6 urban hospitals" icon="📅" />
        <KpiCard label="Walk-In Intake" value="12 Pets" delta="Zero bottleneck" trend="up" subtext="Fast-track triage buffer" icon="🚶" />
        <KpiCard label="No-Show Rate" value="2.8%" delta="-1.4% MoM" trend="up" subtext="Automated WhatsApp 2h alert" icon="📉" />
        <KpiCard label="On-Time Consultation" value="96.5%" delta="Within 5 mins of slot" trend="up" subtext="Doctor punctuality SLA" icon="⏱️" />
      </div>

      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Live Master Appointment Roster</h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>Real-time schedule of pet healthcare bookings across outpatient, surgical, and wellness consultation slots</p>
          </div>
          <div>
            <input
              type="text"
              placeholder="Search pet, parent, clinic, doctor..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '12px',
                width: '280px',
                outline: 'none'
              }}
            />
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', color: '#64748b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Time & Slot</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Pet & Companion</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Pet Parent</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Doctor Assigned</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Clinic Location</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Requested Service</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Slot Type</th>
                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(a => (
                <tr key={a.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ fontWeight: 700, color: '#0f172a', fontFamily: '"IBM Plex Mono", monospace' }}>{a.time}</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>{a.id} • {a.duration}</div>
                  </td>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: '#0f172a' }}>{a.pet}</td>
                  <td style={{ padding: '12px 16px', color: '#475569' }}>{a.parent}</td>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#2563eb' }}>{a.doctor}</td>
                  <td style={{ padding: '12px 16px', color: '#334155' }}>{a.clinic}</td>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>{a.service}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: a.slotType === 'Walk-In Priority' ? '#fef3c7' : '#f1f5f9',
                      color: a.slotType === 'Walk-In Priority' ? '#b45309' : '#475569'
                    }}>
                      {a.slotType}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '999px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: a.status === 'Confirmed' ? '#dcfce7' : a.status === 'In Session' ? '#dbeafe' : a.status === 'Arrived / Checked In' ? '#e0e7ff' : '#f3f4f6',
                      color: a.status === 'Confirmed' ? '#15803d' : a.status === 'In Session' ? '#1e40af' : a.status === 'Arrived / Checked In' ? '#4338ca' : '#6b7280'
                    }}>
                      {a.status}
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
