import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function SixtyMinuteDelivery() {
  const hubMetrics = [
    { hub: 'Koramangala Dark Store Hub', city: 'Bengaluru', orders60m: 142, avgFulfillment: '32.4 mins', dispatchTime: '6.2 mins', breachCount: 1, slaCompliance: '99.3%', peakCapacity: '28 riders' },
    { hub: 'Indiranagar Care Hub', city: 'Bengaluru', orders60m: 118, avgFulfillment: '34.8 mins', dispatchTime: '7.1 mins', breachCount: 2, slaCompliance: '98.3%', peakCapacity: '22 riders' },
    { hub: 'Whitefield Tech Center', city: 'Bengaluru', orders60m: 86, avgFulfillment: '38.6 mins', dispatchTime: '8.4 mins', breachCount: 3, slaCompliance: '96.5%', peakCapacity: '18 riders' },
    { hub: 'Bandra West Specialty Hub', city: 'Mumbai', orders60m: 98, avgFulfillment: '35.1 mins', dispatchTime: '6.8 mins', breachCount: 1, slaCompliance: '99.0%', peakCapacity: '20 riders' },
    { hub: 'Andheri East Logistics Node', city: 'Mumbai', orders60m: 84, avgFulfillment: '37.2 mins', dispatchTime: '7.9 mins', breachCount: 2, slaCompliance: '97.6%', peakCapacity: '16 riders' },
    { hub: 'Gurugram Cyber Hub Node', city: 'Delhi-NCR', orders60m: 76, avgFulfillment: '39.0 mins', dispatchTime: '8.1 mins', breachCount: 2, slaCompliance: '97.4%', peakCapacity: '15 riders' }
  ];

  return (
    <DashboardLayout
      category="Logistics & Delivery"
      subcategory="60-Minute Delivery"
      title="Hyperlocal 60-Minute Rapid Delivery SLA"
      subtitle="Guaranteed sub-60 minute order-to-doorstep dispatch for critical pet medications, diets, and emergency supplies"
      icon="⚡"
      badge="36.2 Mins Avg Doorstep Speed"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Avg Doorstep Time" value="36.2 mins" delta="Target <60m" trend="up" subtext="Order placement to OTP" icon="⏱️" />
        <KpiCard label="Rapid SLA Compliance" value="98.1%" delta="+1.2% MoM" trend="up" subtext="Delivered within 60 mins" icon="⚡" />
        <KpiCard label="Pick & Pack Velocity" value="7.2 mins" delta="Lightning fast" trend="up" subtext="Pharmacist bag-ready time" icon="📦" />
        <KpiCard label="60-Min Volume" value="604 Orders" delta="62.4% total mix" trend="up" subtext="Highest customer loyalty tier" icon="🚀" />
      </div>

      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
        <h3 style={{ margin: '0 0 4px', fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Micro-Hub 60-Minute Performance Benchmark</h3>
        <p style={{ margin: '0 0 16px', fontSize: '12px', color: '#64748b' }}>Fulfillment velocity, dark store packing times, and breach prevention across urban micro-hubs</p>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', color: '#64748b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '10px 12px', textAlign: 'left' }}>Hub Location</th>
                <th style={{ padding: '10px 12px', textAlign: 'left' }}>City</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>60M Orders</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Avg Doorstep Time</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Pack Time</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Breaches</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>SLA Compliance</th>
                <th style={{ padding: '10px 12px', textAlign: 'center' }}>Active EV Pool</th>
              </tr>
            </thead>
            <tbody>
              {hubMetrics.map(h => (
                <tr key={h.hub} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px', fontWeight: 700, color: '#0f172a' }}>{h.hub}</td>
                  <td style={{ padding: '12px', color: '#64748b' }}>{h.city}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace' }}>{h.orders60m}</td>
                  <td style={{ padding: '12px', textAlign: 'right', color: '#2563eb', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{h.avgFulfillment}</td>
                  <td style={{ padding: '12px', textAlign: 'right', color: '#475569', fontFamily: '"IBM Plex Mono", monospace' }}>{h.dispatchTime}</td>
                  <td style={{ padding: '12px', textAlign: 'right', color: h.breachCount > 2 ? '#dc2626' : '#64748b', fontWeight: 600 }}>{h.breachCount}</td>
                  <td style={{ padding: '12px', textAlign: 'right', color: '#16a34a', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{h.slaCompliance}</td>
                  <td style={{ padding: '12px', textAlign: 'center', color: '#0369a1', fontWeight: 500 }}>{h.peakCapacity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
