import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';
import Consultations from './Consultations';
import Appointments from './Appointments';
import Treatments from './Treatments';
import Vaccinations from './Vaccinations';
import Diagnostics from './Diagnostics';
import Procedures from './Procedures';
import ServiceRevenue from './ServiceRevenue';
import ServiceProfitability from './ServiceProfitability';

export default function ServicesDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const subdomains = [];

  if (activeTab === 'consultations') return <Consultations />;
  if (activeTab === 'appointments') return <Appointments />;
  if (activeTab === 'treatments') return <Treatments />;
  if (activeTab === 'vaccinations') return <Vaccinations />;
  if (activeTab === 'diagnostics') return <Diagnostics />;
  if (activeTab === 'procedures') return <Procedures />;
  if (activeTab === 'revenue') return <ServiceRevenue />;
  if (activeTab === 'profitability') return <ServiceProfitability />;

  return (
    <DashboardLayout
      category="Veterinary Services"
      subcategory="Services Dashboard"
      title="Veterinary Clinical Operations & Healthcare Control Center"
      subtitle="Executive command center orchestrating outpatient consults, emergency triage, surgeries, laboratory pathology, and clinical unit economics"
      icon="🩺"
      badge="All 6 Clinical Hubs Live & Accredited"
    >
      {/* Subcategory Chip Navigator */}
      <div style={{
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        paddingBottom: '8px',
        marginBottom: '16px',
        borderBottom: '1px solid #e2e8f0'
      }}>
        {subdomains.map(s => (
          <button
            key={s.id}
            type="button"
            onClick={() => setActiveTab(s.id)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: activeTab === s.id ? 700 : 500,
              background: activeTab === s.id ? '#2563eb' : '#ffffff',
              color: activeTab === s.id ? '#ffffff' : '#475569',
              border: activeTab === s.id ? '1px solid #2563eb' : '1px solid #e2e8f0',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              boxShadow: activeTab === s.id ? '0 2px 4px rgba(37,99,235,0.2)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            <span>{s.icon}</span>
            <span>{s.label}</span>
          </button>
        ))}
      </div>

      {/* KPI Highlights */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Clinical Revenue (MTD)" value="₹0" delta="+18.4% MoM" trend="up" subtext="18% total Zenve revenue" icon="💰" />
        <KpiCard label="Completed Consults" value="1,420 Patients" delta="+14.2% MoM" trend="up" subtext="In-clinic, video & home visits" icon="🩺" />
        <KpiCard label="Surgical Procedures" value="184 Surgeries" delta="100% Sterility" trend="up" subtext="Orthopedic, soft tissue, dental" icon="✂️" />
        <KpiCard label="Clinical Profit Margin" value="0.0%" delta="+2.8% YoY" trend="up" subtext="High margin core business" icon="📈" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '16px' }}>
        {/* Clinical Triage & Department Status */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
        }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0' }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Real-Time Clinical Status & Hospital Occupancy</h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>Live patient load across specialized medical units</p>
          </div>
          <div style={{ padding: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>OUTPATIENT CLINICS</div>
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: '4px 0' }}>48 Patients</div>
                <div style={{ fontSize: '11px', color: '#16a34a', fontWeight: 600 }}>● 18 Vets On Duty</div>
              </div>
              <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>STERILE OPERATION THEATER</div>
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: '4px 0' }}>3 Theaters Active</div>
                <div style={{ fontSize: '11px', color: '#2563eb', fontWeight: 600 }}>● 14 Surgeries Today</div>
              </div>
              <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>INPATIENT & ICU WARDS</div>
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: '4px 0' }}>18 Beds Occupied</div>
                <div style={{ fontSize: '11px', color: '#ea580c', fontWeight: 600 }}>● 82% Ward Occupancy</div>
              </div>
              <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>PATHOLOGY & LAB DIAGNOSTICS</div>
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: '4px 0' }}>142 Tests MTD</div>
                <div style={{ fontSize: '11px', color: '#0284c7', fontWeight: 600 }}>● 38m Turnaround</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Launchpad to All Subdomains */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
        }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0' }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Veterinary Subdomains Directory</h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>Dedicated subcategory consoles for clinical departments</p>
          </div>
          <div style={{ padding: '16px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {subdomains.slice(1).map(item => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#1e293b',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease'
                }}
              >
                <span style={{ fontSize: '16px' }}>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
