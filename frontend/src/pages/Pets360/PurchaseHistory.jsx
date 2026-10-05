import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function PurchaseHistory() {
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const purchases = [
    { id: 'ORD-9801', pet: 'Bruno (Golden Retriever)', date: '02-Oct-2026', item: 'Royal Canin Maxi Adult Dry Food (15kg)', category: 'Food & Nutrition', channel: 'Zenve 60-Min Express', amount: '₹7,450', parent: 'Vikram Singhania', status: 'Delivered' },
    { id: 'ORD-9802', pet: 'Milo (Persian Cat)', date: '29-Sep-2026', item: 'Royal Canin Urinary S/O Feline (3.5kg) + Inaba Churu', category: 'Prescription Diet', channel: 'In-Clinic Pharmacy', amount: '₹3,200', parent: 'Ananya Deshmukh', status: 'Fulfilled' },
    { id: 'ORD-9803', pet: 'Rocky (German Shepherd)', date: '25-Sep-2026', item: 'Orthopedic Memory Foam Pet Bed (XXL) + Ruffwear Harness', category: 'Accessories & Comfort', channel: 'Zenve E-Commerce', amount: '₹9,800', parent: 'Rohan Mehta', status: 'Delivered' },
    { id: 'ORD-9804', pet: 'Simba (Beagle)', date: '21-Sep-2026', item: 'Bravecto Chewable (10-20kg) + TropiClean Ear Wash', category: 'Pharmacy & Wellness', channel: 'Zenve 60-Min Express', amount: '₹2,650', parent: 'Pooja Nair', status: 'Delivered' },
    { id: 'ORD-9805', pet: 'Bella (Shih Tzu)', date: '16-Sep-2026', item: 'Vetmedin Pimobendan 1.25mg (100 Tabs) Monthly Subscription', category: 'Chronic Rx Supply', channel: 'Subscription Auto-Ship', amount: '₹3,900', parent: 'Kavita Rao', status: 'Active Recurring' },
    { id: 'ORD-9806', pet: 'Max (Labrador)', date: '11-Sep-2026', item: 'Orijen Original Dog Food (11.4kg) + Dental Bone Chew', category: 'Food & Nutrition', channel: 'Zenve E-Commerce', amount: '₹8,900', parent: 'Siddharth Roy', status: 'Delivered' }
  ];

  const filtered = purchases.filter(p => {
    const matchesFilter = filter === 'ALL' || p.category === filter || p.status === filter;
    const matchesSearch = p.pet.toLowerCase().includes(search.toLowerCase()) ||
      p.item.toLowerCase().includes(search.toLowerCase()) ||
      p.parent.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <DashboardLayout
      category="Pets 360°"
      subcategory="Purchase History"
      title="Pet Nutrition, Pharmacy & Merchandise Purchases"
      subtitle="Complete ledger of food, prescription diets, tick & flea treatments, and accessories purchased across omni-channels"
      icon="🐾"
      badge="₹18.4L LTV Tracked"
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          {['ALL', 'Food & Nutrition', 'Prescription Diet', 'Pharmacy & Wellness', 'Delivered'].map(f => (
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
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '14px', marginBottom: '20px' }}>
        <KpiCard label="Total Pet Orders" value="4,820" delta="+28.4%" trend="up" subtext="All categories" icon="📦" />
        <KpiCard label="Average Pet Spend / Yr" value="₹32,400" delta="+14.2%" trend="up" subtext="Annualized LTV" icon="💰" />
        <KpiCard label="Prescription Diet Share" value="34.2%" delta="Clinical nutrition" trend="neutral" subtext="High margin" icon="🥗" />
        <KpiCard label="Auto-Ship Recurring" value="41.5%" delta="514 Pets" trend="up" subtext="High retention" icon="🔄" />
      </div>

      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '16px 20px',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, maxWidth: '480px' }}>
          <span style={{ color: '#94a3b8', fontSize: '15px' }}>🔍</span>
          <input
            type="text"
            placeholder="Search purchases by pet, product, parent, or order ID..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              fontSize: '13px',
              outline: 'none',
              background: '#f8fafc'
            }}
          />
        </div>
        <div style={{ fontSize: '12px', color: '#64748b' }}>
          Showing <b>{filtered.length}</b> purchase orders
        </div>
      </div>

      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <th style={{ padding: '12px 16px' }}>Order & Date</th>
              <th style={{ padding: '12px 16px' }}>Pet Consumer</th>
              <th style={{ padding: '12px 16px' }}>Purchased Product / SKU</th>
              <th style={{ padding: '12px 16px' }}>Category</th>
              <th style={{ padding: '12px 16px' }}>Fulfillment Channel</th>
              <th style={{ padding: '12px 16px' }}>Pet Parent</th>
              <th style={{ padding: '12px 16px' }}>Amount</th>
              <th style={{ padding: '12px 16px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, idx) => (
              <tr key={p.id} style={{ borderBottom: idx !== filtered.length - 1 ? '1px solid #f1f5f9' : 'none', transition: 'background 0.1s' }} onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={e => e.currentTarget.style.background = '#ffffff'}>
                <td style={{ padding: '12px 16px', fontWeight: 600 }}>
                  <div style={{ fontFamily: 'monospace', color: '#2563eb' }}>{p.id}</div>
                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>{p.date}</div>
                </td>
                <td style={{ padding: '12px 16px', fontWeight: 700, color: '#0f172a' }}>
                  {p.pet}
                </td>
                <td style={{ padding: '12px 16px', fontWeight: 600, color: '#334155' }}>
                  {p.item}
                </td>
                <td style={{ padding: '12px 16px', color: '#64748b', fontSize: '12px' }}>
                  {p.category}
                </td>
                <td style={{ padding: '12px 16px', color: '#2563eb', fontSize: '12px', fontWeight: 600 }}>
                  {p.channel}
                </td>
                <td style={{ padding: '12px 16px', color: '#0f172a' }}>
                  {p.parent}
                </td>
                <td style={{ padding: '12px 16px', fontWeight: 700, color: '#0f172a', fontFamily: 'monospace' }}>
                  {p.amount}
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '3px 8px',
                    borderRadius: '999px',
                    fontSize: '11px',
                    fontWeight: 600,
                    background: p.status === 'Delivered' || p.status === 'Fulfilled' ? '#ecfdf5' : '#eff6ff',
                    color: p.status === 'Delivered' || p.status === 'Fulfilled' ? '#059669' : '#1d4ed8'
                  }}>
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
