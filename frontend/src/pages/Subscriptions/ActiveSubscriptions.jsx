import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function ActiveSubscriptions() {
  const [planFilter, setPlanFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const subscribers = [
    { subId: 'SUB-ACT-8801', petName: 'Simba (Golden Retriever)', parent: 'Vikramaditya Singhania', plan: 'Puppy Preventive Care Suite', autoDebit: 'UPI AutoPay (HDFC)', monthlyFee: '₹1,499', startDate: '2026-04-12', nextRenewal: '2026-10-12', status: 'Active (Healthy)' },
    { subId: 'SUB-ACT-8802', petName: 'Bella (Shih Tzu)', parent: 'Pooja Bhattacharya', plan: 'Monthly Nutrition Auto-Ship', autoDebit: 'Credit Card (ICICI)', monthlyFee: '₹2,850', startDate: '2026-02-18', nextRenewal: '2026-10-18', status: 'Active (Healthy)' },
    { subId: 'SUB-ACT-8803', petName: 'Bruno (Rottweiler)', parent: 'Harish Mehta', plan: 'Senior Pet Geriatric Vitality', autoDebit: 'UPI AutoPay (SBI)', monthlyFee: '₹1,850', startDate: '2025-11-05', nextRenewal: '2026-11-05', status: 'Active (Healthy)' },
    { subId: 'SUB-ACT-8804', petName: 'Milo (Persian Cat)', parent: 'Dr. Shruti Nair', plan: 'Feline Wellness & Spa Plan', autoDebit: 'Debit Card (Axis)', monthlyFee: '₹1,250', startDate: '2026-06-20', nextRenewal: '2026-10-20', status: 'Active (Healthy)' },
    { subId: 'SUB-ACT-8805', petName: 'Koko (French Bulldog)', parent: 'Ananya Deshmukh', plan: '24x7 Emergency Telehealth', autoDebit: 'UPI AutoPay (Paytm)', monthlyFee: '₹499', startDate: '2026-01-10', nextRenewal: '2026-10-10', status: 'Active (Healthy)' },
    { subId: 'SUB-ACT-8806', petName: 'Oscar (Beagle)', parent: 'Rohan Mehra', plan: 'Monthly Nutrition Auto-Ship', autoDebit: 'Credit Card (HDFC)', monthlyFee: '₹2,850', startDate: '2026-05-15', nextRenewal: '2026-10-15', status: 'Active (Healthy)' }
  ];

  const filtered = subscribers.filter(s => {
    if (planFilter !== 'ALL' && !s.plan.toLowerCase().includes(planFilter.toLowerCase())) return false;
    if (search) {
      const q = search.toLowerCase();
      return s.petName.toLowerCase().includes(q) || s.parent.toLowerCase().includes(q) || s.subId.toLowerCase().includes(q);
    }
    return true;
  });

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Subscriptions"
      subcategory="Active Subscriptions"
      title="Active Member Roster & Auto-Debit Mandates"
      subtitle="Live subscriber cohort, e-mandate banking authorizations, recurring fulfillment status, and pet health profiles"
      icon="✅"
      badge="824 Active Members"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Active Subscriptions" value="824 Pets" delta="+68 net this month" trend="up" subtext="Across Bangalore & Mumbai" icon="✅" />
        <KpiCard label="Auto-Debit E-Mandate Success" value="98.2%" delta="NPCI UPI & E-NACH" trend="up" subtext="Automated tokenization" icon="💳" />
        <KpiCard label="Average Subscriber Longevity" value="14.2 Months" delta="+2.4 months YoY" trend="up" subtext="High brand stickiness" icon="⏱️" />
        <KpiCard label="Active MRR Realization" value="₹11.51 Lakh" delta="100% collectable" trend="up" subtext="Zero manual collection" icon="💰" />
      </div>

      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>Live Active Subscribers Master Roster</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Pet parent name, active wellness plan, auto-debit method, and next billing milestone</p>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search pet or parent..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid var(--border, #cbd5e1)', fontSize: '12px', color: 'var(--foreground, #0f172a)', background: 'var(--background, #f8fafc)' }}
            />
            {['ALL', 'Puppy', 'Nutrition', 'Senior', 'Feline', 'Telehealth'].map(p => (
              <button
                key={p}
                onClick={() => setPlanFilter(p)}
                style={{
                  padding: '6px 10px',
                  borderRadius: '6px',
                  border: '1px solid ' + (planFilter === p ? '#7c3aed' : 'var(--border, #cbd5e1)'),
                  background: planFilter === p ? 'rgba(124,58,237,0.1)' : 'transparent',
                  color: planFilter === p ? '#6d28d9' : 'var(--muted-foreground, #64748b)',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)' }}>
                <th style={{ padding: '10px 12px' }}>Subscription ID</th>
                <th style={{ padding: '10px 12px' }}>Pet Patient</th>
                <th style={{ padding: '10px 12px' }}>Pet Parent</th>
                <th style={{ padding: '10px 12px' }}>Plan Enrolled</th>
                <th style={{ padding: '10px 12px' }}>Auto-Debit Method</th>
                <th style={{ padding: '10px 12px' }}>Monthly Rate</th>
                <th style={{ padding: '10px 12px' }}>Next Renewal</th>
                <th style={{ padding: '10px 12px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s.subId} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                  <td style={{ padding: '12px', fontFamily: 'monospace', fontWeight: 600 }}>{s.subId}</td>
                  <td style={{ padding: '12px', fontWeight: 600 }}>{s.petName}</td>
                  <td style={{ padding: '12px' }}>{s.parent}</td>
                  <td style={{ padding: '12px' }}>{s.plan}</td>
                  <td style={{ padding: '12px' }}>{s.autoDebit}</td>
                  <td style={{ padding: '12px', fontWeight: 600, color: '#059669' }}>{s.monthlyFee}</td>
                  <td style={{ padding: '12px' }}>{s.nextRenewal}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ padding: '3px 8px', borderRadius: '999px', fontSize: '10px', fontWeight: 600, background: 'rgba(16,185,129,0.12)', color: '#059669' }}>
                      {s.status}
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
