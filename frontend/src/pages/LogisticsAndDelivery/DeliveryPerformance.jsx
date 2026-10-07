import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function DeliveryPerformance() {
  const topRiders = [];

  return (
    <DashboardLayout
      category="Logistics & Delivery"
      subcategory="Delivery Performance"
      title="Rider & Fleet Delivery Performance Scorecards"
      subtitle="Fulfillment efficiency rankings, doorstep customer satisfaction (CSAT), cold-chain compliance, and safety scorecards"
      icon="🏆"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Network CSAT Score" value="4.92 / 5" delta="+0.04 MoM" trend="up" subtext="Based on 18,400 ratings" icon="⭐" />
        <KpiCard label="On-Time Delivery Rate" value="0.0%" delta="+0.6% MoM" trend="up" subtext="Across all 76 EV riders" icon="⏱️" />
        <KpiCard label="Avg Rider Velocity" value="26.8 km/h" delta="Green eco-speed" trend="up" subtext="Zero safety incidents" icon="⚡" />
        <KpiCard label="Cold-Chain Audit Pass" value="0.0%" delta="Zero spoilage" trend="up" subtext="14,800 vaccine deliveries" icon="❄️" />
      </div>

      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Top Rider Leaderboard & Performance Scorecards</h3>
          <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>Monthly top performers based on on-time delivery rates, pet parent feedback, and cold-chain precision</p>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', color: '#64748b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Rank</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Rider Name</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>EV Unit</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Base Hub</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Deliveries (MTD)</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>On-Time %</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Avg Speed</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Doorstep CSAT</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Achievement Badge</th>
              </tr>
            </thead>
            <tbody>
              {topRiders.map(r => (
                <tr key={r.rank} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 700, color: r.rank === 1 ? '#eab308' : r.rank === 2 ? '#94a3b8' : '#b45309' }}>
                    {r.rank === 1 ? '🥇' : r.rank === 2 ? '🥈' : r.rank === 3 ? '🥉' : '#' + r.rank}
                  </td>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: '#0f172a' }}>{r.name}</td>
                  <td style={{ padding: '12px 16px', color: '#0284c7', fontFamily: '"IBM Plex Mono", monospace' }}>{r.vehicleId}</td>
                  <td style={{ padding: '12px 16px', color: '#475569' }}>{r.hub}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{r.deliveries}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', color: '#16a34a', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{r.onTime}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', color: '#334155' }}>{r.avgSpeed}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', color: '#d97706', fontWeight: 700 }}>{r.csat}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      padding: '4px 9px',
                      borderRadius: '12px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: '#fef3c7',
                      color: '#b45309'
                    }}>
                      ⭐ {r.badge}
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
