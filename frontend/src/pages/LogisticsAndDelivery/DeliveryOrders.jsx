import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function DeliveryOrders() {
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const orders = [];

  const filtered = orders.filter(o => {
    const matchFilter = filter === 'ALL' || o.status === filter;
    const matchSearch = o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.hub.toLowerCase().includes(search.toLowerCase()) ||
      o.rider.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <DashboardLayout
      category="Logistics & Delivery"
      subcategory="Delivery Orders"
      title="Live Delivery Orders Dispatch Stream"
      subtitle="Real-time parcel status, rider telematics, hyperlocal express fulfillment, and cold-chain parcel tracking"
      icon="📦"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Dispatched Today" value="482 Orders" delta="+18.4% vs yday" trend="up" subtext="Across 14 micro-hubs" icon="📦" />
        <KpiCard label="Active In-Transit" value="38 Parcels" delta="Live now" trend="neutral" subtext="Average speed 26 km/h" icon="🛵" />
        <KpiCard label="60-Min Deliveries" value="294 Orders" delta="61% of volume" trend="up" subtext="Express rapid tier" icon="⚡" />
        <KpiCard label="Delivery Success Rate" value="0.0%" delta="+0.4% MoM" trend="up" subtext="First attempt doorstep OTP" icon="🎯" />
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
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Active Delivery Orders Console</h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>Live manifest of orders dispatched via Zenve Hyperlocal Fleet & Partner 3PLs</p>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Search order, customer, rider, hub..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                padding: '7px 12px',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                fontSize: '12px',
                minWidth: '220px',
                outline: 'none'
              }}
            />
            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              style={{
                padding: '7px 12px',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                fontSize: '12px',
                background: '#fff',
                outline: 'none'
              }}
            >
              <option value="ALL">All Statuses</option>
              <option value="In Transit">In Transit</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Dispatched">Dispatched</option>
              <option value="Delivered">Delivered</option>
              <option value="Failed Attempt">Failed Attempt</option>
            </select>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', color: '#64748b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Order ID</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Pet Parent & Companion</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Origin Hub</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Rider / Vehicle</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Items</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Tier</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Cold Chain</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>ETA / Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(o => (
                <tr key={o.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace', color: '#0f172a' }}>{o.id}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ fontWeight: 600, color: '#0f172a' }}>{o.customer}</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>{o.pet}</div>
                  </td>
                  <td style={{ padding: '12px 16px', color: '#334155' }}>{o.hub}</td>
                  <td style={{ padding: '12px 16px', color: '#0369a1', fontWeight: 600 }}>{o.rider}</td>
                  <td style={{ padding: '12px 16px', color: '#475569', maxWidth: '200px' }}>{o.items}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '6px',
                      fontSize: '10px',
                      fontWeight: 700,
                      background: o.type.includes('60-Min') ? '#eff6ff' : '#f1f5f9',
                      color: o.type.includes('60-Min') ? '#2563eb' : '#475569'
                    }}>
                      {o.type}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    {o.temp !== 'Ambient' ? (
                      <span style={{ padding: '3px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: 700, background: '#ecfeff', color: '#0891b2', border: '1px solid #a5f3fc' }}>
                        ❄️ {o.temp}
                      </span>
                    ) : (
                      <span style={{ fontSize: '11px', color: '#94a3b8' }}>Ambient</span>
                    )}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      padding: '4px 9px',
                      borderRadius: '12px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: o.status === 'Delivered' ? '#dcfce7' : o.status === 'Failed Attempt' ? '#fee2e2' : '#fef9c3',
                      color: o.status === 'Delivered' ? '#15803d' : o.status === 'Failed Attempt' ? '#b91c1c' : '#854d0e'
                    }}>
                      {o.status} ({o.eta})
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
