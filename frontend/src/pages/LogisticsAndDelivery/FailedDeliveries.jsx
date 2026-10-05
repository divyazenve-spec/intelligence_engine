import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function FailedDeliveries() {
  const rootCauses = [
    { cause: 'Pet Parent Unavailable / Phone Unreachable', incidents: 38, pct: '44.2%', avgResolution: 'Same-day re-slot via WhatsApp', rtoImpact: 'Low (92% re-delivered)' },
    { cause: 'Gated Society Entry Delayed / Denied', incidents: 19, pct: '22.1%', avgResolution: 'Security gate handover OTP', rtoImpact: 'Minimal (96% re-delivered)' },
    { cause: 'Address Incomplete / Incorrect Landmark', incidents: 14, pct: '16.3%', avgResolution: 'Google Maps pin sharing with rider', rtoImpact: 'Medium (88% re-delivered)' },
    { cause: 'Customer Cancelled at Doorstep', incidents: 8, pct: '9.3%', avgResolution: 'Immediate dark store restock', rtoImpact: 'Definite RTO (Refund initiated)' },
    { cause: 'Severe Monsoon Waterlogging / Roadblock', incidents: 5, pct: '5.8%', avgResolution: 'Alternate rider re-routing', rtoImpact: 'Low (Delivered within 3 hrs)' },
    { cause: 'Cold-Chain Temperature Warning Excursion', incidents: 2, pct: '2.3%', avgResolution: 'Fresh vial dispatched immediately from hub', rtoImpact: 'Zero cost to customer' }
  ];

  return (
    <DashboardLayout
      category="Logistics & Delivery"
      subcategory="Failed Deliveries"
      title="Non-Delivery Reports (NDR) & Failed Delivery Analytics"
      subtitle="Failed first-attempt analysis, doorstep reachability, Return to Origin (RTO) prevention, and recovery velocity"
      icon="⚠️"
      badge="0.8% Industry-Leading Low Failure Rate"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Failed Attempt Rate" value="0.8%" delta="-0.3% MoM" trend="up" subtext="Benchmark: 3.5%" icon="🎯" />
        <KpiCard label="NDR Recovery Rate" value="91.4%" delta="+2.1% MoM" trend="up" subtext="Re-delivered on same day" icon="🔄" />
        <KpiCard label="Return to Origin (RTO)" value="0.32%" delta="Ultra-low" trend="up" subtext="Only 86 orders / mo" icon="📦" />
        <KpiCard label="Avg Re-attempt Speed" value="2.2 hrs" delta="Same day loop" trend="up" subtext="Automated WhatsApp bot" icon="⚡" />
      </div>

      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Failed Delivery Root Cause Diagnostics</h3>
          <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>Breakdown of 86 delivery exceptions recorded across 10,800 monthly dispatches</p>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', color: '#64748b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Failure Root Cause</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Incidents</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>% of Failures</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Automated SOP & Resolution</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>RTO Impact</th>
              </tr>
            </thead>
            <tbody>
              {rootCauses.map(r => (
                <tr key={r.cause} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: '#0f172a' }}>{r.cause}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace' }}>{r.incidents}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', color: '#b91c1c', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{r.pct}</td>
                  <td style={{ padding: '12px 16px', color: '#334155' }}>{r.avgResolution}</td>
                  <td style={{ padding: '12px 16px', color: '#2563eb', fontWeight: 500 }}>{r.rtoImpact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
