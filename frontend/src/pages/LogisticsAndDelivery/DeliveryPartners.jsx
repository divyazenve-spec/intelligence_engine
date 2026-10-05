import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function DeliveryPartners() {
  const partners = [
    { name: 'Zenve Internal EV Fleet', type: 'Dedicated Electric 2-Wheeler', fleetSize: '76 Riders', activeNow: 62, onTimeSla: '99.4%', avgCost: '₹38 / drop', rating: '4.95 / 5.0', coldChainReady: 'Yes (Insulated Boxes)', status: 'Primary' },
    { name: 'Shadowfax Quick Delivery', type: 'On-Demand Hyperlocal 3PL', fleetSize: 'Flex Pool (BLR/BOM)', activeNow: 28, onTimeSla: '96.2%', avgCost: '₹46 / drop', rating: '4.78 / 5.0', coldChainReady: 'Partial', status: 'Active 3PL' },
    { name: 'Dunzo for Business', type: 'Instant Hyperlocal 3PL', fleetSize: 'Flex Pool (BLR)', activeNow: 14, onTimeSla: '95.8%', avgCost: '₹48 / drop', rating: '4.72 / 5.0', coldChainReady: 'No (Dry goods only)', status: 'Active 3PL' },
    { name: 'Porter Enterprise', type: '4-Wheeler & Bulk Hub Transfer', fleetSize: '12 Vans', activeNow: 9, onTimeSla: '98.1%', avgCost: '₹340 / trip', rating: '4.88 / 5.0', coldChainReady: 'Yes (Reefer Vans)', status: 'Bulk & Hubs' },
    { name: 'Delhivery Surface Direct', type: 'Inter-City & Regional Courier', fleetSize: 'National Network', activeNow: 4, onTimeSla: '94.5%', avgCost: '₹85 / parcel', rating: '4.65 / 5.0', coldChainReady: 'Dry Ice Verified', status: 'Inter-City' }
  ];

  return (
    <DashboardLayout
      category="Logistics & Delivery"
      subcategory="Delivery Partners"
      title="Fleet & 3PL Logistics Delivery Partners"
      subtitle="Dedicated EV rider fleets, contracted hyperlocal 3PLs, inter-hub transfer networks, and SLA scorecards"
      icon="🛵"
      badge="130 Total Contracted Riders"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Dedicated Fleet" value="76 EV Riders" delta="100% Electric" trend="up" subtext="Zero emissions hyperlocal" icon="⚡" />
        <KpiCard label="Active On Road" value="117 Riders" delta="Live capacity" trend="up" subtext="Zenve + 3PL partners" icon="🛵" />
        <KpiCard label="Blended On-Time SLA" value="98.2%" delta="+0.8% MoM" trend="up" subtext="Weighted network avg" icon="⏱️" />
        <KpiCard label="Avg Fleet Rating" value="4.86 / 5" delta="Exceptional" trend="up" subtext="Pet parent doorstep CSAT" icon="⭐" />
      </div>

      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
        <h3 style={{ margin: '0 0 4px', fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Delivery Partners & Fleet Roster</h3>
        <p style={{ margin: '0 0 16px', fontSize: '12px', color: '#64748b' }}>Capacity allocation, cold-chain readiness, per-drop cost efficiency, and fulfillment compliance</p>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', color: '#64748b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '10px 12px', textAlign: 'left' }}>Partner Name</th>
                <th style={{ padding: '10px 12px', textAlign: 'left' }}>Fleet Model</th>
                <th style={{ padding: '10px 12px', textAlign: 'left' }}>Fleet Size</th>
                <th style={{ padding: '10px 12px', textAlign: 'left' }}>Active Now</th>
                <th style={{ padding: '10px 12px', textAlign: 'left' }}>On-Time SLA</th>
                <th style={{ padding: '10px 12px', textAlign: 'left' }}>Drop Cost</th>
                <th style={{ padding: '10px 12px', textAlign: 'left' }}>Cold-Chain Ready</th>
                <th style={{ padding: '10px 12px', textAlign: 'left' }}>CSAT Rating</th>
                <th style={{ padding: '10px 12px', textAlign: 'left' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {partners.map(p => (
                <tr key={p.name} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px', fontWeight: 700, color: '#0f172a' }}>{p.name}</td>
                  <td style={{ padding: '12px', color: '#64748b' }}>{p.type}</td>
                  <td style={{ padding: '12px', fontWeight: 600, color: '#334155' }}>{p.fleetSize}</td>
                  <td style={{ padding: '12px', color: '#16a34a', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{p.activeNow} on road</td>
                  <td style={{ padding: '12px', color: '#2563eb', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{p.onTimeSla}</td>
                  <td style={{ padding: '12px', color: '#475569', fontFamily: '"IBM Plex Mono", monospace' }}>{p.avgCost}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: p.coldChainReady.includes('Yes') ? '#ecfeff' : '#f8fafc',
                      color: p.coldChainReady.includes('Yes') ? '#0891b2' : '#64748b'
                    }}>
                      {p.coldChainReady}
                    </span>
                  </td>
                  <td style={{ padding: '12px', color: '#d97706', fontWeight: 600 }}>{p.rating}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      padding: '4px 9px',
                      borderRadius: '12px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: p.status === 'Primary' ? '#dcfce7' : '#f1f5f9',
                      color: p.status === 'Primary' ? '#15803d' : '#334155'
                    }}>
                      {p.status}
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
