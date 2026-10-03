import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function LogisticsDashboard() {
  return (
    <DashboardLayout
      category="Logistics & Delivery"
      subcategory="60-Minute Rapid Delivery SLA"
      title="Rapid Logistics & Cold-Chain Dispatch"
      subtitle="Hyperlocal rapid dispatch, refrigerated vaccine cold-chain monitoring, and rider SLAs"
      icon="⚡"
      badge="Cold Chain Active"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Hyperlocal Fleet" value="38 Riders" delta="Active now" trend="neutral" subtext="Electric 2-wheelers" icon="🛵" />
        <KpiCard label="Avg Fulfillment Speed" value="36 mins" delta="Target <60m" trend="up" subtext="Order to doorstep" icon="⚡" />
        <KpiCard label="Cold-Chain Integrity" value="99.9%" delta="2-8°C constant" trend="up" subtext="Vaccine temperature" icon="❄️" />
        <KpiCard label="Failed Delivery Rate" value="0.8%" delta="Extremely low" trend="up" subtext="First attempt success" icon="🎯" />
      </div>

      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 12px', fontSize: '15px', fontWeight: 700 }}>Dispatch Heatmap & Real-Time Fulfillment</h3>
        <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Bengaluru Central (28m avg), South Mumbai (34m avg), Delhi South (41m avg)</p>
        <div style={{ height: '140px', background: 'rgba(0,0,0,0.15)', borderRadius: '8px', display: 'grid', placeItems: 'center', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>
          Real-Time Delivery Fleet GPS & Dispatch Stream
        </div>
      </div>
    </DashboardLayout>
  );
}
