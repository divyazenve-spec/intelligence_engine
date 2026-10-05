import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function B2BOrders() {
  const [status, setStatus] = useState('ALL');

  const orders = [
    { po: 'PO-B2B-4401', client: 'PetCare Hospital Network', items: 'Nobivac Vaccines (200v) + Bravecto (80p)', val: '₹3,45,000', orderDate: '2026-10-04', dispatchDate: '2026-10-05', status: 'Dispatched', terms: 'Net 30' },
    { po: 'PO-B2B-4402', client: 'K-9 Paramilitary Kennels', items: 'Tactical Working Dog Nutrition (1.2 Tons)', val: '₹2,80,000', orderDate: '2026-10-03', dispatchDate: '2026-10-04', status: 'Delivered', terms: 'Net 60' },
    { po: 'PO-B2B-4403', client: 'Bangalore Canine Breeding Co-op', items: 'Puppy Starter Formula + Calcium Kits (150u)', val: '₹1,95,000', orderDate: '2026-10-04', dispatchDate: 'Pending', status: 'Processing', terms: 'Net 45' },
    { po: 'PO-B2B-4404', client: 'Urban Mutts Luxury Daycare', items: 'Hypoallergenic Grooming Shampoos (400L)', val: '₹1,12,000', orderDate: '2026-10-02', dispatchDate: '2026-10-03', status: 'Delivered', terms: 'Net 30' },
    { po: 'PO-B2B-4405', client: 'Airports Authority Canine Unit', items: 'Joint Health Chews + Dewormers (300u)', val: '₹1,65,000', orderDate: '2026-10-01', dispatchDate: '2026-10-02', status: 'Delivered', terms: 'Net 60' },
    { po: 'PO-B2B-4406', client: 'Infosys Corp Employee Wellness', items: 'Executive Preventive Care Vouchers (200u)', val: '₹1,40,000', orderDate: '2026-10-05', dispatchDate: 'Instant Dig.', status: 'Fulfilled', terms: 'Net 30' }
  ];

  const filtered = status === 'ALL' ? orders : orders.filter(o => o.status === status);

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="B2B / Enterprise"
      subcategory="B2B Orders"
      title="B2B Purchase Orders & Bulk Fulfillment"
      subtitle="Institutional purchase orders, batch fulfillment allocations, warehouse dispatch manifests, and invoice linking"
      icon="📦"
      badge="148 Orders MTD"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="B2B Orders (MTD)" value="148 Orders" delta="+22% vs Sep" trend="up" subtext="Avg order: ₹2.35L" icon="📦" />
        <KpiCard label="Order Value Pipeline" value="₹34.82 Lakh" delta="100% contracted" trend="up" subtext="Wholesale pricing tiers" icon="💵" />
        <KpiCard label="On-Time Dispatch Rate" value="98.6%" delta="48h SLA" trend="up" subtext="Bulk freight partners" icon="⚡" />
        <KpiCard label="Pending Orders" value="6 Orders" delta="In warehouse pack" trend="warn" subtext="Dispatching today" icon="⏳" />
      </div>

      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>Institutional Bulk Orders Stream</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Live enterprise purchase orders and logistics dispatch progress</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['ALL', 'Processing', 'Dispatched', 'Delivered', 'Fulfilled'].map(s => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                style={{
                  padding: '6px 10px',
                  borderRadius: '6px',
                  border: '1px solid ' + (status === s ? '#4f46e5' : 'var(--border, #cbd5e1)'),
                  background: status === s ? 'rgba(79,70,229,0.1)' : 'transparent',
                  color: status === s ? '#4338ca' : 'var(--muted-foreground, #64748b)',
                  fontSize: '11px',
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
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)' }}>
                <th style={{ padding: '10px 12px' }}>PO Number</th>
                <th style={{ padding: '10px 12px' }}>Client Organization</th>
                <th style={{ padding: '10px 12px' }}>Line Items</th>
                <th style={{ padding: '10px 12px' }}>PO Value</th>
                <th style={{ padding: '10px 12px' }}>Order Date</th>
                <th style={{ padding: '10px 12px' }}>Dispatch</th>
                <th style={{ padding: '10px 12px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(o => (
                <tr key={o.po} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                  <td style={{ padding: '12px', fontFamily: 'monospace', fontWeight: 600 }}>{o.po}</td>
                  <td style={{ padding: '12px', fontWeight: 600 }}>{o.client}</td>
                  <td style={{ padding: '12px' }}>{o.items}</td>
                  <td style={{ padding: '12px', fontWeight: 600, color: '#059669' }}>{o.val}</td>
                  <td style={{ padding: '12px' }}>{o.orderDate}</td>
                  <td style={{ padding: '12px' }}>{o.dispatchDate}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '999px',
                      fontSize: '10px',
                      fontWeight: 600,
                      background: o.status === 'Delivered' || o.status === 'Fulfilled' ? 'rgba(16,185,129,0.12)' : o.status === 'Dispatched' ? 'rgba(79,70,229,0.1)' : 'rgba(245,158,11,0.14)',
                      color: o.status === 'Delivered' || o.status === 'Fulfilled' ? '#059669' : o.status === 'Dispatched' ? '#4338ca' : '#d97706'
                    }}>
                      {o.status}
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
