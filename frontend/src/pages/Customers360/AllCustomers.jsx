import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function AllCustomers() {
  const [search, setSearch] = useState('');
  const [cityFilter, setCityFilter] = useState('ALL');

  const customerDirectory = [
    { id: 'CUST-8401', name: 'Aarav Sharma', email: 'aarav.sharma@gmail.com', phone: '+91 98450 11201', location: 'Indiranagar, BLR', petSpecies: 'Canine & Feline', tier: 'VIP Elite', joinDate: '2023-04-12', totalSpend: '₹1,48,000', status: 'Active' },
    { id: 'CUST-8402', name: 'Vikram Malhotra', email: 'v.malhotra@zenve.in', phone: '+91 98450 22302', location: 'Koramangala, BLR', petSpecies: 'Canine', tier: 'VIP Elite', joinDate: '2023-08-19', totalSpend: '₹1,24,000', status: 'Active' },
    { id: 'CUST-8403', name: 'Priya Sundaram', email: 'priya.sundaram@yahoo.co.in', phone: '+91 98450 33403', location: 'Whitefield, BLR', petSpecies: 'Feline', tier: 'Loyal Gold', joinDate: '2024-01-10', totalSpend: '₹84,000', status: 'Active' },
    { id: 'CUST-8404', name: 'Rahul Nambiar', email: 'rahul.n@outlook.com', phone: '+91 98450 44504', location: 'Jayanagar, BLR', petSpecies: 'Canine', tier: 'New Subscriber', joinDate: '2024-06-22', totalSpend: '₹32,000', status: 'Active' },
    { id: 'CUST-8405', name: 'Sneha Kulkarni', email: 'sneha.k@gmail.com', phone: '+91 98450 55605', location: 'HSR Layout, BLR', petSpecies: 'Canine', tier: 'Occasional Silver', joinDate: '2023-11-05', totalSpend: '₹48,000', status: 'Dormant' },
    { id: 'CUST-8406', name: 'Karthik Sen', email: 'karthik.sen@techcorp.com', phone: '+91 98450 66706', location: 'Indiranagar, BLR', petSpecies: 'Canine', tier: 'Loyal Gold', joinDate: '2023-09-14', totalSpend: '₹92,000', status: 'Active' },
    { id: 'CUST-8407', name: 'Dr. Neha Kapoor', email: 'neha.kapoor@medresearch.org', phone: '+91 98450 77807', location: 'Malleshwaram, BLR', petSpecies: 'Feline & Avian', tier: 'Loyal Gold', joinDate: '2024-02-18', totalSpend: '₹68,500', status: 'Active' },
    { id: 'CUST-8408', name: 'Aditya Deshpande', email: 'aditya.d@gmail.com', phone: '+91 98450 88908', location: 'Sarjapur, BLR', petSpecies: 'Canine', tier: 'Occasional Silver', joinDate: '2024-05-30', totalSpend: '₹24,800', status: 'Active' }
  ];

  const filtered = customerDirectory.filter(c => {
    if (cityFilter !== 'ALL' && !c.location.includes(cityFilter)) return false;
    if (search) {
      const q = search.toLowerCase();
      return c.name.toLowerCase().includes(q) || c.id.toLowerCase().includes(q) || c.location.toLowerCase().includes(q) || c.email.toLowerCase().includes(q);
    }
    return true;
  });

  const cardStyle = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Customers 360°"
      subcategory="Master Customer Directory"
      title="All Registered Customers & Pet Parents"
      subtitle="Complete omni-channel customer master, verified contact identifiers, pet ownership profiles, and geographical distribution"
      icon="📋"
      badge="12,480 Master Records"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Master Customer Records" value="12,480 Profiles" delta="+9.8% YoY" trend="up" subtext="100% verified mobile KYC" icon="📋" />
        <KpiCard label="Primary Bengaluru Hub" value="84.2%" delta="10,500 accounts" trend="neutral" subtext="Expanding to Hyderabad & Pune" icon="📍" />
        <KpiCard label="Multi-Pet Households" value="38.5%" delta="4,800 families" trend="up" subtext="High ARPU multiple" icon="🐾" />
        <KpiCard label="Verified Email & WhatsApp" value="97.4%" delta="Opt-in compliance" trend="up" subtext="DPDP Act 2023 aligned" icon="🛡️" />
      </div>

      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>📋 Complete Customer Directory Master</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Search by pet parent name, mobile number, neighborhood cluster, or membership standing</p>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search by name, ID, phone, email..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid var(--border, #cbd5e1)', fontSize: '12px', background: '#f8fafc', color: '#0f172a', width: '240px' }}
            />
            {['ALL', 'Indiranagar', 'Koramangala', 'Whitefield', 'Jayanagar', 'HSR Layout'].map(c => (
              <button
                key={c}
                onClick={() => setCityFilter(c)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '8px',
                  border: cityFilter === c ? '1px solid #2563eb' : '1px solid var(--border, #cbd5e1)',
                  background: cityFilter === c ? '#2563eb' : '#ffffff',
                  color: cityFilter === c ? '#ffffff' : '#334155',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border, #e2e8f0)', textAlign: 'left', color: 'var(--muted-foreground, #475569)' }}>
                <th style={{ padding: '10px' }}>Customer ID</th>
                <th style={{ padding: '10px' }}>Pet Parent</th>
                <th style={{ padding: '10px' }}>Contact Phone</th>
                <th style={{ padding: '10px' }}>Email Address</th>
                <th style={{ padding: '10px' }}>Location</th>
                <th style={{ padding: '10px' }}>Pets Species</th>
                <th style={{ padding: '10px' }}>Loyalty Tier</th>
                <th style={{ padding: '10px' }}>Total Spend</th>
                <th style={{ padding: '10px' }}>Member Since</th>
                <th style={{ padding: '10px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                  <td style={{ padding: '10px', fontFamily: 'monospace', fontWeight: 600 }}>{c.id}</td>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{c.name}</td>
                  <td style={{ padding: '10px', color: '#64748b' }}>{c.phone}</td>
                  <td style={{ padding: '10px', color: '#475569' }}>{c.email}</td>
                  <td style={{ padding: '10px' }}>{c.location}</td>
                  <td style={{ padding: '10px' }}>{c.petSpecies}</td>
                  <td style={{ padding: '10px' }}>
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: c.tier.includes('VIP') ? '#eff6ff' : c.tier.includes('Gold') ? '#fef3c7' : '#f1f5f9',
                      color: c.tier.includes('VIP') ? '#1d4ed8' : c.tier.includes('Gold') ? '#b45309' : '#475569'
                    }}>
                      {c.tier}
                    </span>
                  </td>
                  <td style={{ padding: '10px', fontWeight: 700, color: '#059669' }}>{c.totalSpend}</td>
                  <td style={{ padding: '10px', color: '#64748b' }}>{c.joinDate}</td>
                  <td style={{ padding: '10px' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: c.status === 'Active' ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)',
                      color: c.status === 'Active' ? '#047857' : '#b91c1c'
                    }}>
                      {c.status}
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
