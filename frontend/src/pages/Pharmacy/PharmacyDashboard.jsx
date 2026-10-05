import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function PharmacyDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('Today');
  const [activeTab, setActiveTab] = useState('overview');

  const categories = [
    { name: 'Antiparasitics & Dewormers', revenue: '₹4,12,000', margin: '42.5%', share: '32.8%', trend: '+14.2%', icon: '🪱' },
    { name: 'Antibiotics & Anti-Infectives', revenue: '₹2,84,500', margin: '38.0%', share: '22.6%', trend: '+9.4%', icon: '💊' },
    { name: 'Chronic Wellness & Cardiac', revenue: '₹2,35,000', margin: '48.2%', share: '18.7%', trend: '+21.0%', icon: '❤️' },
    { name: 'Veterinary Vaccines & Cold Chain', revenue: '₹1,64,000', margin: '35.0%', share: '13.0%', trend: '+8.1%', icon: '❄️' },
    { name: 'Dermatologicals & Shampoos', revenue: '₹1,02,500', margin: '45.0%', share: '8.1%', trend: '+12.5%', icon: '🧴' },
    { name: 'Nutraceuticals & Joint Care', revenue: '₹60,000', margin: '47.5%', share: '4.8%', trend: '+16.2%', icon: '🦴' }
  ];

  const recentDispensed = [
    { rxId: 'RX-2026-9041', pet: 'Bruno (Golden Retriever)', vet: 'Dr. Priya Sharma', drug: 'Bravecto 20-40kg + Amoxiclav 625', qty: '1 tab + 10 tabs', schedule: 'Schedule H', status: 'Dispensed', time: '12 mins ago' },
    { rxId: 'RX-2026-9040', pet: 'Milo (Persian Cat)', vet: 'Dr. Rahul Mehta', drug: 'Zoetis Revolution Spot-On + Gabapentin', qty: '1 tube + 6 caps', schedule: 'Schedule H', status: 'Dispensed', time: '28 mins ago' },
    { rxId: 'RX-2026-9039', pet: 'Simba (German Shepherd)', vet: 'Dr. Aisha Khan', drug: 'Cardisure 5mg (Pimobendan)', qty: '60 tablets', schedule: 'Schedule H', status: 'Ready for Pickup', time: '45 mins ago' },
    { rxId: 'RX-2026-9038', pet: 'Bella (Beagle)', vet: 'Dr. Karan Patel', drug: 'Nobivac DHPPi Core Vaccine 1D', qty: '1 vial (Cold Chain)', schedule: 'Schedule H', status: 'Administered', time: '1 hour ago' },
    { rxId: 'RX-2026-9037', pet: 'Leo (Shih Tzu)', vet: 'Dr. Neha Singh', drug: 'Malaseb Medicated Shampoo 250ml', qty: '1 bottle', schedule: 'OTC', status: 'Dispensed', time: '1.5 hours ago' }
  ];

  return (
    <DashboardLayout
      category="Pharmacy"
      subcategory="Pharmacy Dashboard"
      title="Veterinary Pharmacy Command Center"
      subtitle="Complete dispensary oversight, Schedule H compliance, cold-chain telemetry, and pharmaceutical revenue analytics"
      icon="💊"
      badge="Schedule H Regulated & Licensed"
      actions={
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div style={{
            display: 'flex',
            background: 'rgba(255,255,255,0.05)',
            padding: '3px',
            borderRadius: '8px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            {['Today', 'This Week', 'This Month', 'Year to Date'].map(p => (
              <button
                key={p}
                onClick={() => setSelectedPeriod(p)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: selectedPeriod === p ? '#3b82f6' : 'transparent',
                  color: selectedPeriod === p ? '#fff' : '#94a3b8',
                  transition: 'all 0.15s ease'
                }}
              >
                {p}
              </button>
            ))}
          </div>
          <button
            onClick={() => {
              if (window.ZenvePharmacyDashboard && typeof window.ZenvePharmacyDashboard.open === 'function') {
                window.ZenvePharmacyDashboard.open('prescriptions');
              } else {
                alert('Opening digital prescription verification queue');
              }
            }}
            style={{
              padding: '7px 14px',
              borderRadius: '8px',
              background: '#10b981',
              color: '#fff',
              border: 'none',
              fontWeight: 600,
              fontSize: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>📋</span> Verify Prescription
          </button>
        </div>
      }
    >
      {/* KPI Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Pharmacy Revenue" value="₹12.58 Lakh" delta="+18.4% vs last period" trend="up" subtext="24% of total Zenve revenue" icon="💊" />
        <KpiCard label="Prescriptions Filled" value="1,840 Rx" delta="100% Doctor Signed" trend="up" subtext="0 Schedule H violations" icon="📋" />
        <KpiCard label="Average Rx Basket" value="₹1,248" delta="+6.2% YoY" trend="up" subtext="2.8 medicines / ticket" icon="💰" />
        <KpiCard label="Active Stocked Drugs" value="642 SKUs" delta="98.2% In-Stock SLA" trend="up" subtext="12 warehouses & clinics" icon="📦" />
        <KpiCard label="Near-Expiry Batches" value="4 Batches" delta="Under 60 Days" trend="down" subtext="₹48,200 salvage value" icon="⏳" />
        <KpiCard label="Cold Chain Integrity" value="100.0%" delta="3.4°C Mean Temp" trend="up" subtext="IoT telemetry verified" icon="❄️" />
      </div>

      {/* Main Grid: Categories & Compliance Radar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '18px' }}>
        {/* Category Contribution */}
        <div style={{
          background: 'var(--card, #1e293b)',
          border: '1px solid var(--border, rgba(255,255,255,0.08))',
          borderRadius: '12px',
          padding: '20px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Therapeutic Category Contribution</h3>
              <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#94a3b8' }}>Revenue split and realized gross margins</p>
            </div>
            <span style={{ fontSize: '11px', fontFamily: '"IBM Plex Mono", monospace', color: '#10b981', fontWeight: 600 }}>Avg Margin 41.2%</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {categories.map((c, i) => (
              <div key={i} style={{ padding: '10px 12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>{c.icon}</span> {c.name}
                  </span>
                  <span style={{ fontFamily: '"IBM Plex Mono", monospace' }}>{c.revenue}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94a3b8' }}>
                  <span>Gross Margin: <strong style={{ color: '#10b981' }}>{c.margin}</strong> · Share: {c.share}</span>
                  <span style={{ color: '#38bdf8' }}>{c.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Schedule H & Drug Safety Verification Card */}
        <div style={{
          background: 'var(--card, #1e293b)',
          border: '1px solid var(--border, rgba(255,255,255,0.08))',
          borderRadius: '12px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Regulatory Compliance & Audit Guard</h3>
                <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#94a3b8' }}>Schedule H & X Narcotics, Antibiotic Stewardship & Cold Chain</p>
              </div>
              <span style={{
                background: 'rgba(16,185,129,0.15)',
                color: '#10b981',
                padding: '3px 8px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 600
              }}>
                100% Compliant
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
              <div style={{ padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>VCI Registered Doctors</span>
                <div style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px', color: '#38bdf8' }}>48 / 48 Active</div>
                <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>Licensure authenticated</div>
              </div>
              <div style={{ padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>Digital Rx Archival</span>
                <div style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px', color: '#10b981' }}>100% Stored</div>
                <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>7-Year statutory compliance</div>
              </div>
              <div style={{ padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>Active Cold Chain Probes</span>
                <div style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px', color: '#06b6d4' }}>14 IoT Units</div>
                <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>2.0°C – 7.8°C range logged</div>
              </div>
              <div style={{ padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>Scheduled Audits</span>
                <div style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px', color: '#f59e0b' }}>Next: Oct 20</div>
                <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>Drug Inspector mock ready</div>
              </div>
            </div>

            <div style={{
              padding: '12px',
              borderRadius: '8px',
              background: 'rgba(59,130,246,0.1)',
              border: '1px solid rgba(59,130,246,0.25)',
              fontSize: '12px',
              lineHeight: '1.5',
              color: '#93c5fd'
            }}>
              <strong>Regulatory Advisory:</strong> All veterinary antibiotics (Amoxicillin, Enrofloxacin, Ceftriaxone) require mandatory weight-adjusted dosage verification before pharmacist dispensing.
            </div>
          </div>

          <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
            <button
              onClick={() => alert('Exporting Schedule H Drug Dispensing Register (Form 20/21) for regulatory authorities...')}
              style={{
                flex: 1,
                padding: '8px',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#f8fafc',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Export Schedule H Register
            </button>
            <button
              onClick={() => alert('Cold-chain telemetry logs downloaded with 5-minute sampling timestamps.')}
              style={{
                flex: 1,
                padding: '8px',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#f8fafc',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Download Cold Log
            </button>
          </div>
        </div>
      </div>

      {/* Live Dispensary Activity Stream */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Real-Time Pharmacy Dispensary Feed</h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#94a3b8' }}>Live verification, batch allocation, and counter dispensing</p>
          </div>
          <span style={{ fontSize: '11px', color: '#38bdf8', fontWeight: 600 }}>Live Feed (Updated just now)</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: '#94a3b8' }}>
                <th style={{ padding: '8px 12px' }}>Prescription ID</th>
                <th style={{ padding: '8px 12px' }}>Pet Patient</th>
                <th style={{ padding: '8px 12px' }}>Prescribing Vet</th>
                <th style={{ padding: '8px 12px' }}>Prescribed Medicine</th>
                <th style={{ padding: '8px 12px' }}>Quantity</th>
                <th style={{ padding: '8px 12px' }}>Drug Classification</th>
                <th style={{ padding: '8px 12px' }}>Status</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Time</th>
              </tr>
            </thead>
            <tbody>
              {recentDispensed.map((rx, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '10px 12px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 600, color: '#38bdf8' }}>{rx.rxId}</td>
                  <td style={{ padding: '10px 12px', fontWeight: 600 }}>{rx.pet}</td>
                  <td style={{ padding: '10px 12px', color: '#94a3b8' }}>{rx.vet}</td>
                  <td style={{ padding: '10px 12px' }}>{rx.drug}</td>
                  <td style={{ padding: '10px 12px', fontFamily: '"IBM Plex Mono", monospace' }}>{rx.qty}</td>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '10px',
                      fontWeight: 600,
                      background: rx.schedule === 'Schedule H' ? 'rgba(239,68,68,0.15)' : 'rgba(16,185,129,0.15)',
                      color: rx.schedule === 'Schedule H' ? '#f87171' : '#34d399'
                    }}>
                      {rx.schedule}
                    </span>
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '99px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: rx.status === 'Dispensed' ? 'rgba(16,185,129,0.15)' : 'rgba(59,130,246,0.15)',
                      color: rx.status === 'Dispensed' ? '#34d399' : '#60a5fa'
                    }}>
                      {rx.status}
                    </span>
                  </td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', color: '#64748b', fontSize: '11px' }}>{rx.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
