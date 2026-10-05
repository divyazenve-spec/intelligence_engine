import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function NewCustomers() {
  const newSignups = [
    { id: 'CUST-8441', name: 'Varun Grover', pet: 'Koko (Pug Pup)', channel: 'Instagram Ads', date: '2026-10-05', firstOrder: '₹3,400 (Puppy Starter Kit)', cac: '₹420', status: 'Converted' },
    { id: 'CUST-8442', name: 'Dr. Shalini Mehta', pet: 'Oliver (British Shorthair)', channel: 'Veterinary Referral', date: '2026-10-04', firstOrder: '₹5,800 (Rx Renal Care)', cac: '₹180', status: 'Converted' },
    { id: 'CUST-8443', name: 'Rohan Sethi', pet: 'Cooper (Labrador)', channel: 'Google Search (Organic)', date: '2026-10-04', firstOrder: '₹2,600 (Dewormer & Treats)', cac: '₹0', status: 'Converted' },
    { id: 'CUST-8444', name: 'Deepika Rao', pet: 'Zoe (Indie Kitten)', channel: 'Adoption Drive Partner', date: '2026-10-03', firstOrder: '₹1,950 (Feline Vaccines)', cac: '₹120', status: 'Converted' },
    { id: 'CUST-8445', name: 'Alok Bhattacharya', pet: 'Max (German Shepherd)', channel: 'Influencer Referral', date: '2026-10-02', firstOrder: '₹7,200 (Orthopedic Bed + Food)', cac: '₹540', status: 'Converted' },
    { id: 'CUST-8446', name: 'Pooja Hegde', pet: 'Bella (Golden Retriever)', channel: 'Walk-in (Indiranagar)', date: '2026-10-01', firstOrder: '₹4,100 (Full Grooming + Toys)', cac: '₹90', status: 'Converted' }
  ];

  const cardStyle = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Customers 360°"
      subcategory="Acquisition & Onboarding"
      title="New Customer Acquisition & First-Order Velocity"
      subtitle="New pet parent signups, onboarding funnel progression, acquisition channels, and CAC efficiency"
      icon="✨"
      badge="+1,120 New MTD"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="New Customers (MTD)" value="1,120 Pet Parents" delta="+22.4% MoM" trend="up" subtext="Target: 950 accounts" icon="✨" />
        <KpiCard label="Blended CAC" value="₹284 / Acq" delta="-14.2% YoY" trend="up" subtext="High organic referral mix" icon="📉" />
        <KpiCard label="Day 1 Activation Rate" value="84.2%" delta="Immediate first purchase" trend="up" subtext="Within 24 hours of install" icon="⚡" />
        <KpiCard label="First Order Avg. Basket" value="₹3,480" delta="+8.6% vs FY25" trend="up" subtext="Welcome bundle attach" icon="🛒" />
      </div>

      <div style={cardStyle}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>✨ Recent New Pet Parent Registrations & First Purchase</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border, #e2e8f0)', textAlign: 'left', color: 'var(--muted-foreground, #475569)' }}>
                <th style={{ padding: '10px' }}>Customer ID</th>
                <th style={{ padding: '10px' }}>Pet Parent</th>
                <th style={{ padding: '10px' }}>Pet Details</th>
                <th style={{ padding: '10px' }}>Acquisition Channel</th>
                <th style={{ padding: '10px' }}>Signup Date</th>
                <th style={{ padding: '10px' }}>First Order Items & Value</th>
                <th style={{ padding: '10px' }}>Attributed CAC</th>
                <th style={{ padding: '10px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {newSignups.map((n, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                  <td style={{ padding: '10px', fontFamily: 'monospace', fontWeight: 600 }}>{n.id}</td>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{n.name}</td>
                  <td style={{ padding: '10px', color: '#475569' }}>{n.pet}</td>
                  <td style={{ padding: '10px' }}><span style={{ padding: '2px 8px', background: '#eff6ff', color: '#1d4ed8', borderRadius: '4px', fontWeight: 600 }}>{n.channel}</span></td>
                  <td style={{ padding: '10px', color: '#64748b' }}>{n.date}</td>
                  <td style={{ padding: '10px', fontWeight: 600, color: '#059669' }}>{n.firstOrder}</td>
                  <td style={{ padding: '10px', color: '#64748b' }}>{n.cac}</td>
                  <td style={{ padding: '10px' }}>
                    <span style={{ padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, background: '#f0fdf4', color: '#16a34a' }}>
                      {n.status}
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
