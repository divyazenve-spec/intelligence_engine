import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function DeliveryTracking() {
  const activeStreams = [
    { trackerId: 'TRK-901', rider: 'Kiran Kumar (EV-44)', location: '100ft Road, Indiranagar', dest: 'Koramangala 4th Block', speed: '32 km/h', battery: '82%', temp: '3.4°C', signal: 'Strong (5G)', eta: '12 mins', status: 'En Route' },
    { trackerId: 'TRK-902', rider: 'Arun Varma (EV-12)', location: 'HSR 27th Main', dest: 'HSR Layout Sector 1', speed: '24 km/h', battery: '68%', temp: 'Ambient', signal: 'Strong (5G)', eta: '6 mins', status: 'En Route' },
    { trackerId: 'TRK-903', rider: 'Praveen Gowda (EV-23)', location: 'ITPL Main Rd, Whitefield', dest: 'Prestige Shantiniketan', speed: '28 km/h', battery: '74%', temp: '3.9°C', signal: 'Normal (4G)', eta: '18 mins', status: 'En Route' },
    { trackerId: 'TRK-904', rider: 'Sunil Jadhav (EV-88)', location: 'Linking Road, Bandra West', dest: 'Pali Hill, Bandra', speed: '19 km/h', battery: '59%', temp: '4.2°C', signal: 'Strong (5G)', eta: '9 mins', status: 'En Route' },
    { trackerId: 'TRK-905', rider: 'Ramesh Sawant (EV-31)', location: 'JVLR Junction, Andheri East', dest: 'Poonam Nagar', speed: '26 km/h', battery: '91%', temp: 'Ambient', signal: 'Normal (4G)', eta: '14 mins', status: 'En Route' },
    { trackerId: 'TRK-906', rider: 'Mohit Sharma (EV-09)', location: 'Cyber City, Gurugram', dest: 'DLF Phase 2', speed: '34 km/h', battery: '64%', temp: '3.7°C', signal: 'Strong (5G)', eta: '16 mins', status: 'En Route' }
  ];

  return (
    <DashboardLayout
      category="Logistics & Delivery"
      subcategory="Delivery Tracking"
      title="Live GPS Fleet Telematics & Cold-Chain Tracking"
      subtitle="Real-time rider coordinates, digital cold-box temperature telemetry, EV battery state, and route milestones"
      icon="📍"
      badge="6 Active Telematics Streams"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Live Tracked Riders" value="38 Active" delta="100% Signal lock" trend="up" subtext="Sub-second GPS updates" icon="📡" />
        <KpiCard label="Refrigerated Vaccines" value="14 Boxes" delta="2°C - 8°C Safe" trend="up" subtext="IoT Bluetooth sensors" icon="❄️" />
        <KpiCard label="Average Speed" value="26.8 km/h" delta="Optimal city pace" trend="up" subtext="Zero traffic infractions" icon="⚡" />
        <KpiCard label="Fleet EV Battery" value="74% Avg" delta="All above 30%" trend="up" subtext="Fast-swap stations ready" icon="🔋" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '16px' }}>
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
          <h3 style={{ margin: '0 0 12px', fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Live Fleet GPS Stream</h3>
          <div style={{
            height: '240px',
            background: 'linear-gradient(135deg, #0f172a, #1e293b)',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#38bdf8',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ fontSize: '36px', marginBottom: '8px' }}>🗺️</div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#f8fafc' }}>Real-Time Geofence & Route Clustering</div>
            <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>38 EV Riders transmitting telemetry across Bengaluru, Mumbai & Delhi-NCR</div>
            <div style={{
              position: 'absolute',
              bottom: '12px',
              left: '12px',
              background: 'rgba(15, 23, 42, 0.8)',
              padding: '4px 10px',
              borderRadius: '6px',
              border: '1px solid #334155',
              fontSize: '11px',
              color: '#34d399'
            }}>
              ● Live 1,000ms WebSocket Ping: OK
            </div>
          </div>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
          <h3 style={{ margin: '0 0 12px', fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Active Telematics Telemetry</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr style={{ background: '#f8fafc', color: '#64748b', fontSize: '11px', textTransform: 'uppercase' }}>
                  <th style={{ padding: '8px 10px', textAlign: 'left' }}>Rider</th>
                  <th style={{ padding: '8px 10px', textAlign: 'left' }}>Current Location</th>
                  <th style={{ padding: '8px 10px', textAlign: 'left' }}>Temp</th>
                  <th style={{ padding: '8px 10px', textAlign: 'left' }}>Battery</th>
                  <th style={{ padding: '8px 10px', textAlign: 'left' }}>ETA</th>
                </tr>
              </thead>
              <tbody>
                {activeStreams.map(s => (
                  <tr key={s.trackerId} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '10px', fontWeight: 600, color: '#0f172a' }}>{s.rider}</td>
                    <td style={{ padding: '10px', color: '#475569' }}>{s.location}</td>
                    <td style={{ padding: '10px' }}>
                      {s.temp !== 'Ambient' ? (
                        <span style={{ color: '#0891b2', fontWeight: 700 }}>❄️ {s.temp}</span>
                      ) : (
                        <span style={{ color: '#94a3b8' }}>Ambient</span>
                      )}
                    </td>
                    <td style={{ padding: '10px', color: '#16a34a', fontWeight: 600 }}>{s.battery}</td>
                    <td style={{ padding: '10px', color: '#2563eb', fontWeight: 700 }}>{s.eta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
