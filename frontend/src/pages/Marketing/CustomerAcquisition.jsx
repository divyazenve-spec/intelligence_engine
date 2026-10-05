import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function CustomerAcquisition() {
  const cohorts = [
    { cohort: 'September 2026', acquired: '2,840', m1Repeat: '44.8%', m2Repeat: '38.2%', aov: '₹1,940', ltv60d: '₹4,120', retention: 'Healthy' },
    { cohort: 'August 2026', acquired: '2,620', m1Repeat: '42.6%', m2Repeat: '36.5%', aov: '₹1,880', ltv60d: '₹3,980', retention: 'Healthy' },
    { cohort: 'July 2026', acquired: '2,410', m1Repeat: '41.2%', m2Repeat: '35.1%', aov: '₹1,820', ltv60d: '₹3,840', retention: 'Healthy' },
    { cohort: 'June 2026', acquired: '2,180', m1Repeat: '39.8%', m2Repeat: '34.0%', aov: '₹1,760', ltv60d: '₹3,680', retention: 'Benchmark' }
  ];

  const petSplit = [
    { species: 'Canine (Dogs)', count: '14,200', pct: '64.5%', favCategory: 'Vaccines, Food & Tick Shield' },
    { species: 'Feline (Cats)', count: '5,800', pct: '26.4%', favCategory: 'Grooming, Litter & Renal Diet' },
    { species: 'Avian & Birds', count: '1,200', pct: '5.5%', favCategory: 'Supplements & Seeds' },
    { species: 'Small Animals & Exotics', count: '800', pct: '3.6%', favCategory: 'Specialist Nutrition' }
  ];

  return (
    <DashboardLayout
      category="Marketing"
      subcategory="Customer Acquisition"
      title="Pet Parent Acquisition & Cohort Retention"
      subtitle="New customer onboardings, pet species distribution, first-purchase basket size, and repeat behavior"
      icon="🐾"
      badge="22,000 Total Acquired Pet Parents"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="New Customers (MTD)" value="2,840" delta="+16.8%" trend="up" subtext="First paid transaction" icon="👥" />
        <KpiCard label="30-Day Repeat Purchase" value="44.8%" delta="+3.6%" trend="up" subtext="Rx refills & pet diets" icon="🔄" />
        <KpiCard label="First Order Value (AOV)" value="₹1,940" delta="+₹120" trend="up" subtext="Benchmark: ₹1,650" icon="🛍️" />
        <KpiCard label="60-Day Customer LTV" value="₹4,120" delta="+14.2%" trend="up" subtext="High companion loyalty" icon="💎" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '16px' }}>
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
          <h3 style={{ margin: '0 0 14px', fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Cohort Repeat Retention & 60D LTV</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', color: '#64748b', fontSize: '11px', textTransform: 'uppercase' }}>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>Cohort</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Acquired</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>30D Repeat</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>60D LTV</th>
              </tr>
            </thead>
            <tbody>
              {cohorts.map(c => (
                <tr key={c.cohort} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px', fontWeight: 600 }}>{c.cohort}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{c.acquired}</td>
                  <td style={{ padding: '12px', textAlign: 'right', color: '#16a34a', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace' }}>{c.m1Repeat}</td>
                  <td style={{ padding: '12px', textAlign: 'right', color: '#2563eb', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{c.ltv60d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
          <h3 style={{ margin: '0 0 14px', fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Acquired Customers by Pet Species</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {petSplit.map(p => (
              <div key={p.species} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: '#f8fafc', borderRadius: '8px' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '13px', color: '#0f172a' }}>{p.species}</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>{p.favCategory}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 700, fontSize: '13px', color: '#0f172a', fontFamily: '"IBM Plex Mono", monospace' }}>{p.count}</div>
                  <div style={{ fontSize: '11px', color: '#2563eb', fontWeight: 600 }}>{p.pct}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
