import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function ClinicNetwork() {
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedTier, setSelectedTier] = useState('All');

  const facilities = [];

  const ambulanceFleet = [];

  const expansionRoadmap = [];

  const filteredFacilities = facilities.filter(f => {
    const matchesCity = selectedCity === 'All' || f.city === selectedCity;
    const matchesTier = selectedTier === 'All' || f.tier === selectedTier;
    return matchesCity && matchesTier;
  });

  return (
    <DashboardLayout
      category="Clinics & Hospitals"
      subcategory="Clinic Network"
      title="Regional Healthcare Network & Hub-and-Spoke Infrastructure"
      subtitle="Geographical distribution, inter-facility emergency referral corridors, 24x7 ALS veterinary ambulance fleet, and expansion pipeline"
      icon="🌐"
      badge=""
      actions={
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              background: '#0d1527',
              border: '1px solid #1e293b',
              color: '#94a3b8',
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            <option value="All">All Metro Clusters</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Mumbai">Mumbai MMR</option>
            <option value="Delhi NCR">Delhi NCR</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Pune">Pune</option>
          </select>
          <select
            value={selectedTier}
            onChange={(e) => setSelectedTier(e.target.value)}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              background: '#0d1527',
              border: '1px solid #1e293b',
              color: '#94a3b8',
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            <option value="All">All Facility Tiers</option>
            <option value="Tertiary Flagship">Tertiary Flagships</option>
            <option value="Secondary Specialty">Secondary Specialty Spokes</option>
            <option value="Primary Express">Primary Express OPD / Daycare</option>
          </select>
          <button
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              background: '#3b82f6',
              border: 'none',
              color: '#fff',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            + Register New Facility
          </button>
        </div>
      }
    >
      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <KpiCard
          title="Active Healthcare Facilities"
          value="0"
          change="3 Flagships + 11 Spokes"
          trend="neutral"
          description="Operational licensed veterinary centers"
          icon="🏥"
        />
        <KpiCard
          title="ALS Pet Ambulance Fleet"
          value="0"
          change="3 On Call | 5 Stationed"
          trend="neutral"
          description="GPS-monitored mobile ICU vehicles"
          icon="🚑"
        />
        <KpiCard
          title="Inter-Facility Transfers"
          value="0"
          change="+18.4% vs last month"
          trend="neutral"
          description="Primary clinic to tertiary ICU referrals"
          icon="🔄"
        />
        <KpiCard
          title="Avg Emergency Transit Time"
          value="0"
          change="-4.2 min faster"
          trend="neutral"
          description="Point of pickup to tertiary triage intake"
          icon="⏱️"
        />
        <KpiCard
          title="Network System Uptime"
          value="0.0%"
          change="Tier 4 Cloud EMR Sync"
          trend="neutral"
          description="Continuous EMR, PACS & telemetry link"
          icon="📶"
        />
        <KpiCard
          title="Expansion Pipeline"
          value="0"
          change="+65 Beds Capacity 2027"
          trend="neutral"
          description="Active construction & MEP fitout stage"
          icon="🏗️"
        />
      </div>

      {/* Hub & Spoke Topology Visual Overview */}
      <div style={{
        background: '#0d1527',
        border: '1px solid #1e293b',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', color: '#f8fafc', fontWeight: 600 }}>
              Hub-and-Spoke Topology & Tele-Specialty Grid
            </h3>
            <span style={{ fontSize: '12px', color: '#94a3b8' }}>
              Peripheral clinics stabilize patients and execute primary diagnostics before routing complex cases through dedicated ALS corridors
            </span>
          </div>
          <span style={{
            fontSize: '11px',
            color: '#10b981',
            background: 'rgba(16, 185, 129, 0.1)',
            padding: '4px 10px',
            borderRadius: '12px',
            fontWeight: 600
          }}>
            100% Tele-PACS Connected
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {/* South Hub */}
          <div style={{ background: '#131f38', border: '1px solid #1e293b', borderRadius: '10px', padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
              <div>
                <span style={{ fontSize: '10px', color: '#38bdf8', fontWeight: 700, textTransform: 'uppercase' }}>Southern Flagship Anchor</span>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#f8fafc', marginTop: '2px' }}>Zenve Hospital Koramangala</div>
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>32 Beds | 3 OTs | 24x7 Trauma & CT Scanner</div>
              </div>
              <span style={{ background: '#3b82f620', color: '#60a5fa', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>Hub Core</span>
            </div>
            <div style={{ borderTop: '1px solid #1e293b', paddingTop: '10px', marginTop: '10px' }}>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, marginBottom: '6px' }}>CONNECTED SPOKES:</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#cbd5e1' }}>
                  <span>Indiranagar Care Center</span>
                  <span style={{ color: '#10b981' }}>12 min ALS transit</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#cbd5e1' }}>
                  <span>Jayanagar OPD & Daycare</span>
                  <span style={{ color: '#10b981' }}>18 min ALS transit</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#cbd5e1' }}>
                  <span>Whitefield Tech Hub Clinic</span>
                  <span style={{ color: '#f59e0b' }}>32 min ALS transit</span>
                </div>
              </div>
            </div>
          </div>

          {/* West Hub */}
          <div style={{ background: '#131f38', border: '1px solid #1e293b', borderRadius: '10px', padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
              <div>
                <span style={{ fontSize: '10px', color: '#a855f7', fontWeight: 700, textTransform: 'uppercase' }}>Western Flagship Anchor</span>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#f8fafc', marginTop: '2px' }}>Zenve Multi-Specialty Bandra</div>
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>24 Beds | 2 OTs | Neuro & Ortho Specialty</div>
              </div>
              <span style={{ background: '#a855f720', color: '#c084fc', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>Hub Core</span>
            </div>
            <div style={{ borderTop: '1px solid #1e293b', paddingTop: '10px', marginTop: '10px' }}>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, marginBottom: '6px' }}>CONNECTED SPOKES:</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#cbd5e1' }}>
                  <span>Andheri West Express</span>
                  <span style={{ color: '#10b981' }}>15 min ALS transit</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#cbd5e1' }}>
                  <span>Koregaon Park Clinic (Pune)</span>
                  <span style={{ color: '#38bdf8' }}>Tele-PACS + Shared Referral</span>
                </div>
              </div>
            </div>
          </div>

          {/* North Hub */}
          <div style={{ background: '#131f38', border: '1px solid #1e293b', borderRadius: '10px', padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
              <div>
                <span style={{ fontSize: '10px', color: '#f59e0b', fontWeight: 700, textTransform: 'uppercase' }}>Northern Flagship Anchor</span>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#f8fafc', marginTop: '2px' }}>Zenve Animal Hospital Okhla</div>
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>20 Beds | 2 OTs | Oncology & Critical Care</div>
              </div>
              <span style={{ background: '#f59e0b20', color: '#fbbf24', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>Hub Core</span>
            </div>
            <div style={{ borderTop: '1px solid #1e293b', paddingTop: '10px', marginTop: '10px' }}>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, marginBottom: '6px' }}>CONNECTED SPOKES:</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#cbd5e1' }}>
                  <span>Gurgaon Sector 29 Clinic</span>
                  <span style={{ color: '#10b981' }}>22 min ALS transit</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#cbd5e1' }}>
                  <span>DLF Phase 5 (Upcoming)</span>
                  <span style={{ color: '#64748b' }}>Opens Q2 2027</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Facilities Master Directory */}
      <div style={{
        background: '#0d1527',
        border: '1px solid #1e293b',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', color: '#f8fafc', fontWeight: 600 }}>
              Network Facility Infrastructure Directory ({filteredFacilities.length} Centers)
            </h3>
            <span style={{ fontSize: '12px', color: '#94a3b8' }}>
              Tiered clinical capabilities, surgical capacity, telemedicine integration, and inter-facility referral load
            </span>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1e293b', color: '#64748b', fontWeight: 600 }}>
                <th style={{ padding: '12px 10px' }}>FACILITY & CODE</th>
                <th style={{ padding: '12px 10px' }}>CITY CLUSTER</th>
                <th style={{ padding: '12px 10px' }}>TIER & ROLE</th>
                <th style={{ padding: '12px 10px' }}>BEDS & OTS</th>
                <th style={{ padding: '12px 10px' }}>AMBULANCE / TRANSFER</th>
                <th style={{ padding: '12px 10px' }}>TELEMEDICINE</th>
                <th style={{ padding: '12px 10px' }}>REFERRALS</th>
                <th style={{ padding: '12px 10px' }}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {filteredFacilities.length === 0 ? (<tr><td colSpan="8" style={{ textAlign: "center", padding: "32px", color: "var(--muted-foreground, #64748b)" }}>No network facility records found</td></tr>) : filteredFacilities.map((f, idx) => (
                <tr
                  key={f.id}
                  style={{
                    borderBottom: '1px solid #1e293b',
                    background: idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)',
                    transition: 'background 0.2s ease'
                  }}
                >
                  <td style={{ padding: '12px 10px' }}>
                    <div style={{ fontWeight: 600, color: '#f8fafc' }}>{f.name}</div>
                    <span style={{ fontSize: '10px', color: '#64748b', fontFamily: 'monospace' }}>{f.id}</span>
                  </td>
                  <td style={{ padding: '12px 10px' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      background: 'rgba(255,255,255,0.05)',
                      color: '#cbd5e1',
                      fontSize: '11px',
                      fontWeight: 600
                    }}>
                      {f.city}
                    </span>
                  </td>
                  <td style={{ padding: '12px 10px' }}>
                    <div style={{
                      fontWeight: 600,
                      color: f.tier.includes('Tertiary') ? '#38bdf8' : f.tier.includes('Secondary') ? '#a855f7' : '#f59e0b',
                      fontSize: '11px'
                    }}>
                      {f.tier}
                    </div>
                    <div style={{ fontSize: '10px', color: '#94a3b8' }}>{f.role}</div>
                  </td>
                  <td style={{ padding: '12px 10px' }}>
                    <div style={{ color: '#f8fafc', fontWeight: 500 }}>{f.beds}</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>{f.ots}</div>
                  </td>
                  <td style={{ padding: '12px 10px', color: '#cbd5e1' }}>
                    {f.ambulance}
                  </td>
                  <td style={{ padding: '12px 10px' }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '11px',
                      color: '#34d399'
                    }}>
                      ● {f.telemed}
                    </span>
                  </td>
                  <td style={{ padding: '12px 10px', color: '#cbd5e1', fontWeight: 600 }}>
                    {f.referralsReceived}
                  </td>
                  <td style={{ padding: '12px 10px' }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: 'rgba(16, 185, 129, 0.1)',
                      color: '#10b981'
                    }}>
                      {f.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ambulance Dispatch & Expansion Roadmap Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
        {/* ALS Ambulance Fleet Live Telemetry */}
        <div style={{
          background: '#0d1527',
          border: '1px solid #1e293b',
          borderRadius: '12px',
          padding: '20px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '15px', color: '#f8fafc', fontWeight: 600 }}>
                24x7 Mobile ICU & ALS Vet Ambulance Fleet
              </h3>
              <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                Live GPS telemetry, onboard veterinary nurse & paramedic teams, oxygenation support
              </span>
            </div>
            <span style={{
              fontSize: '11px',
              color: '#38bdf8',
              background: 'rgba(56, 189, 248, 0.1)',
              padding: '3px 8px',
              borderRadius: '8px',
              fontWeight: 600
            }}>
              8 Ambulances Live
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {ambulanceFleet.length === 0 ? (<div style={{ textAlign: "center", padding: "32px", color: "var(--muted-foreground, #64748b)" }}>No active ambulance units</div>) : ambulanceFleet.map((amb) => (
              <div
                key={amb.id}
                style={{
                  background: '#131f38',
                  border: '1px solid #1e293b',
                  borderRadius: '8px',
                  padding: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '16px' }}>🚑</span>
                    <div>
                      <span style={{ fontWeight: 600, color: '#f8fafc', fontSize: '12px' }}>{amb.vehicle}</span>
                      <span style={{ fontSize: '10px', color: '#64748b', marginLeft: '6px', fontFamily: 'monospace' }}>({amb.id})</span>
                    </div>
                  </div>
                  <span style={{
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '10px',
                    fontWeight: 600,
                    background: amb.status.includes('Transit') || amb.status.includes('Dispatched') || amb.status.includes('Emergency')
                      ? 'rgba(239, 68, 68, 0.15)'
                      : 'rgba(16, 185, 129, 0.15)',
                    color: amb.status.includes('Transit') || amb.status.includes('Dispatched') || amb.status.includes('Emergency')
                      ? '#f87171'
                      : '#34d399'
                  }}>
                    {amb.status}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94a3b8' }}>
                  <span>Base: <strong style={{ color: '#cbd5e1' }}>{amb.base}</strong> ({amb.city})</span>
                  <span>Crew: <strong style={{ color: '#cbd5e1' }}>{amb.medic}</strong></span>
                </div>

                <div style={{ fontSize: '10px', color: '#64748b' }}>
                  Equipment: {amb.equipment}
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  background: 'rgba(0,0,0,0.2)',
                  padding: '6px 8px',
                  borderRadius: '4px',
                  fontSize: '11px'
                }}>
                  <span style={{ color: '#cbd5e1' }}>Status: {amb.pet}</span>
                  <span style={{ color: '#38bdf8', fontWeight: 600 }}>ETA: {amb.eta}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Network Expansion Roadmap */}
        <div style={{
          background: '#0d1527',
          border: '1px solid #1e293b',
          borderRadius: '12px',
          padding: '20px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '15px', color: '#f8fafc', fontWeight: 600 }}>
                Network Expansion & New Facility Pipeline
              </h3>
              <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                Target openings, civil construction progress, and equipment procurement status
              </span>
            </div>
            <span style={{
              fontSize: '11px',
              color: '#a855f7',
              background: 'rgba(168, 85, 247, 0.1)',
              padding: '3px 8px',
              borderRadius: '8px',
              fontWeight: 600
            }}>
              FY 2027 Pipeline
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {expansionRoadmap.map((exp, i) => (
              <div
                key={i}
                style={{
                  background: '#131f38',
                  border: '1px solid #1e293b',
                  borderRadius: '8px',
                  padding: '14px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <span style={{ fontSize: '10px', color: '#38bdf8', fontWeight: 700 }}>{exp.quarter} TARGET</span>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#f8fafc', marginTop: '2px' }}>{exp.facility}</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>{exp.city} • {exp.type}</div>
                  </div>
                  <span style={{
                    padding: '3px 8px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: 600,
                    background: 'rgba(59, 130, 246, 0.15)',
                    color: '#60a5fa'
                  }}>
                    {exp.status}
                  </span>
                </div>

                <div style={{ marginBottom: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px', color: '#cbd5e1' }}>
                    <span>Civil & Engineering Progress</span>
                    <span style={{ fontWeight: 600, color: '#38bdf8' }}>{exp.progress}</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: '#1e293b', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{
                      width: exp.progress.includes('85%') ? '85%' : exp.progress.includes('65%') ? '65%' : exp.progress.includes('Architect') ? '35%' : '15%',
                      height: '100%',
                      background: 'linear-gradient(90deg, #3b82f6, #06b6d4)',
                      borderRadius: '3px'
                    }} />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b' }}>
                  <span>Target Commissioning: <strong style={{ color: '#cbd5e1' }}>{exp.targetOpening}</strong></span>
                  <span style={{ color: '#10b981', fontWeight: 500 }}>VCI Compliance Cleared</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
