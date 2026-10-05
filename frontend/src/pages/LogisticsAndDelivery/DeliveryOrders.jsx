import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function DeliveryOrders() {
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const orders = [
    { id: 'ORD-DL-9821', customer: 'Ananya Deshmukh', pet: 'Golden Retriever (Max)', hub: 'Koramangala Hub (BLR)', rider: 'Kiran Kumar (EV-44)', items: 'Nobivac DHPPi + Royal Canin Hepatic', time: '14 mins ago', eta: '18 mins', type: '60-Min Express', temp: '3.4°C', status: 'In Transit' },
    { id: 'ORD-DL-9820', customer: 'Rajesh Subramaniam', pet: 'Beagle (Rocky)', hub: 'Indiranagar Hub (BLR)', rider: 'Arun Varma (EV-12)', items: 'NexGard Chewables + Ear Cleanser', time: '22 mins ago', eta: '8 mins', type: '60-Min Express', temp: 'Ambient', status: 'Out for Delivery' },
    { id: 'ORD-DL-9819', customer: 'Meera Chawla', pet: 'Persian Cat (Snowy)', hub: 'Bandra West Hub (BOM)', rider: 'Sunil Jadhav (EV-88)', items: 'Renal Liquid Diet + Syringes', time: '35 mins ago', eta: 'Delivered', type: 'Same Day', temp: '4.1°C', status: 'Delivered' },
    { id: 'ORD-DL-9818', customer: 'Vikramaditya Rao', pet: 'German Shepherd (Tiger)', hub: 'Whitefield Hub (BLR)', rider: 'Praveen Gowda (EV-23)', items: 'Post-op Antibiotics + Surgical Collar', time: '41 mins ago', eta: '24 mins', type: '60-Min Express', temp: 'Ambient', status: 'In Transit' },
    { id: 'ORD-DL-9817', customer: 'Pooja Agarwal', pet: 'Shih Tzu (Coco)', hub: 'Andheri East Hub (BOM)', rider: 'Ramesh Sawant (EV-31)', items: 'Puppy Starter Pack + Tick Shield', time: '55 mins ago', eta: 'Delivered', type: 'Same Day', temp: 'Ambient', status: 'Delivered' },
    { id: 'ORD-DL-9816', customer: 'Nikhil Kashyap', pet: 'Labrador (Cooper)', hub: 'Gurugram Sec 29 (DEL)', rider: 'Mohit Sharma (EV-09)', items: 'Rabies Booster + Calcium Chewables', time: '1 hr ago', eta: 'Scheduled', type: 'Scheduled Slot', temp: '3.8°C', status: 'Dispatched' },
    { id: 'ORD-DL-9815', customer: 'Sonalika Sen', pet: 'Indie Puppy (Chutki)', hub: 'Jubilee Hills Hub (HYD)', rider: 'Venkatesh R (EV-55)', items: 'Emergency Deworming Suspension', time: '1 hr ago', eta: 'Delivered', type: '60-Min Express', temp: 'Ambient', status: 'Delivered' },
    { id: 'ORD-DL-9814', customer: 'Harish Mehta', pet: 'Rottweiler (Bruno)', hub: 'Koramangala Hub (BLR)', rider: 'Dinesh Patil (EV-19)', items: 'Prescription Joint Supplements', time: '2 hrs ago', eta: 'Rescheduled', type: 'Same Day', temp: 'Ambient', status: 'Failed Attempt' }
  ];

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
      badge="482 Deliveries Today"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Dispatched Today" value="482 Orders" delta="+18.4% vs yday" trend="up" subtext="Across 14 micro-hubs" icon="📦" />
        <KpiCard label="Active In-Transit" value="38 Parcels" delta="Live now" trend="neutral" subtext="Average speed 26 km/h" icon="🛵" />
        <KpiCard label="60-Min Deliveries" value="294 Orders" delta="61% of volume" trend="up" subtext="Express rapid tier" icon="⚡" />
        <KpiCard label="Delivery Success Rate" value="99.2%" delta="+0.4% MoM" trend="up" subtext="First attempt doorstep OTP" icon="🎯" />
      </div>

      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Active Delivery Orders Console</h3>
            <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#64748b' }}>Live manifest of orders dispatched via Zenve Hyperlocal Fleet & Partner 3PLs</p>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Search order, customer, rider, hub..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                padding: '8px 12px',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                fontSize: '12px',
                minWidth: '240px',
                outline: 'none'
              }}
            />
            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              style={{
                padding: '8px 12px',
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
                <th style={{ padding: '10px 12px', textAlign: 'left' }}>Order ID</th>
                <th style={{ padding: '10px 12px', textAlign: 'left' }}>Pet Parent & Companion</th>
                <th style={{ padding: '10px 12px', textAlign: 'left' }}>Origin Hub</th>
                <th style={{ padding: '10px 12px', textAlign: 'left' }}>Rider / Vehicle</th>
                <th style={{ padding: '10px 12px', textAlign: 'left' }}>Items</th>
                <th style={{ padding: '10px 12px', textAlign: 'left' }}>Tier</th>
                <th style={{ padding: '10px 12px', textAlign: 'left' }}>Cold Chain</th>
                <th style={{ padding: '10px 12px', textAlign: 'left' }}>ETA / Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(o => (
                <tr key={o.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace', color: '#0f172a' }}>{o.id}</td>
                  <td style={{ padding: '12px' }}>
                    <div style={{ fontWeight: 600, color: '#0f172a' }}>{o.customer}</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>{o.pet}</div>
                  </td>
                  <td style={{ padding: '12px', color: '#334155' }}>{o.hub}</td>
                  <td style={{ padding: '12px', color: '#0369a1', fontWeight: 500 }}>{o.rider}</td>
                  <td style={{ padding: '12px', color: '#475569', maxWidth: '200px' }}>{o.items}</td>
                  <td style={{ padding: '12px' }}>
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
                  <td style={{ padding: '12px' }}>
                    {o.temp !== 'Ambient' ? (
                      <span style={{ padding: '3px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: 700, background: '#ecfeff', color: '#0891b2', border: '1px solid #a5f3fc' }}>
                        ❄️ {o.temp}
                      </span>
                    ) : (
                      <span style={{ fontSize: '11px', color: '#94a3b8' }}>Ambient</span>
                    )}
                  </td>
                  <td style={{ padding: '12px' }}>
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
