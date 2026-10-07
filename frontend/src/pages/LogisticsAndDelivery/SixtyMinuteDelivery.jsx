import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function SixtyMinuteDelivery() {
  const hubMetrics = [];

  return (
    <DashboardLayout
      category="Logistics & Delivery"
      subcategory="60-Minute Delivery"
      title="Hyperlocal 60-Minute Rapid Delivery SLA"
      subtitle="Guaranteed sub-60 minute order-to-doorstep dispatch for critical pet medications, diets, and emergency supplies"
      icon="⚡"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Avg Doorstep Time" value="--" delta="--" trend="neutral" subtext="No delivery records" icon="⏱️" />
        <KpiCard label="Rapid SLA Compliance" value="0.0%" delta="--" trend="neutral" subtext="No express deliveries" icon="⚡" />
        <KpiCard label="Pick & Pack Velocity" value="--" delta="--" trend="neutral" subtext="No packing records" icon="📦" />
        <KpiCard label="60-Min Volume" value="0 Orders" delta="--" trend="neutral" subtext="0 total orders" icon="🚀" />
      </div>

      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Micro-Hub 60-Minute Performance Benchmark</h3>
          <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>Fulfillment velocity, dark store packing times, and breach prevention across urban micro-hubs</p>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', color: '#64748b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Hub Location</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>City</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>60M Orders</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Avg Doorstep Time</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Pack Time</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Breaches</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>SLA Compliance</th>
                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Active EV Pool</th>
              </tr>
            </thead>
            <tbody>
              {hubMetrics.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '24px', color: '#64748b' }}>
                    No micro-hub records found
                  </td>
                </tr>
              ) : (
                hubMetrics.map(h => (
                  <tr key={h.hub} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 700, color: '#0f172a' }}>{h.hub}</td>
                    <td style={{ padding: '12px 16px', color: '#64748b' }}>{h.city}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace' }}>{h.orders60m}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', color: '#2563eb', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{h.avgFulfillment}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', color: '#475569', fontFamily: '"IBM Plex Mono", monospace' }}>{h.dispatchTime}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', color: h.breachCount > 2 ? '#dc2626' : '#64748b', fontWeight: 600 }}>{h.breachCount}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', color: '#16a34a', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{h.slaCompliance}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'center', color: '#0284c7', fontWeight: 600 }}>{h.peakCapacity}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
