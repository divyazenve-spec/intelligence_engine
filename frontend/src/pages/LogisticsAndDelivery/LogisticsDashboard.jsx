import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';
import DeliveryOrders from './DeliveryOrders';
import DeliveryPartners from './DeliveryPartners';
import DeliveryTracking from './DeliveryTracking';
import SixtyMinuteDelivery from './SixtyMinuteDelivery';
import DeliverySLA from './DeliverySLA';
import DeliveryCost from './DeliveryCost';
import FailedDeliveries from './FailedDeliveries';
import DeliveryPerformance from './DeliveryPerformance';

export default function LogisticsDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const subcategories = [
    { id: 'overview', label: 'Logistics Dashboard', icon: '⚡' },
    { id: 'orders', label: 'Delivery Orders', icon: '📦' },
    { id: 'partners', label: 'Delivery Partners', icon: '🛵' },
    { id: 'tracking', label: 'Delivery Tracking', icon: '📍' },
    { id: '60min', label: '60-Minute Delivery', icon: '⏱️' },
    { id: 'sla', label: 'Delivery SLA', icon: '🛡️' },
    { id: 'cost', label: 'Delivery Cost', icon: '💰' },
    { id: 'failed', label: 'Failed Deliveries', icon: '⚠️' },
    { id: 'perf', label: 'Delivery Performance', icon: '🏆' }
  ];

  if (activeTab === 'orders') return <DeliveryOrders />;
  if (activeTab === 'partners') return <DeliveryPartners />;
  if (activeTab === 'tracking') return <DeliveryTracking />;
  if (activeTab === '60min') return <SixtyMinuteDelivery />;
  if (activeTab === 'sla') return <DeliverySLA />;
  if (activeTab === 'cost') return <DeliveryCost />;
  if (activeTab === 'failed') return <FailedDeliveries />;
  if (activeTab === 'perf') return <DeliveryPerformance />;

  return (
    <DashboardLayout
      category="Logistics & Delivery"
      subcategory="Logistics Dashboard"
      title="Rapid Logistics & Cold-Chain Dispatch Control Center"
      subtitle="Hyperlocal rapid dispatch, refrigerated vaccine cold-chain monitoring, and rider SLAs across 14 urban micro-hubs"
      icon="⚡"
      badge="Cold Chain Active & Fleet Live"
    >
      {/* Subcategories Chip Navigator */}
      <div style={{
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        paddingBottom: '8px',
        marginBottom: '16px',
        borderBottom: '1px solid #e2e8f0'
      }}>
        {subcategories.map(s => (
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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Hyperlocal Fleet" value="76 EV Riders" delta="100% Electric" trend="up" subtext="38 active now on road" icon="🛵" />
        <KpiCard label="Avg Fulfillment Speed" value="36.2 mins" delta="Target <60m" trend="up" subtext="Order placement to doorstep" icon="⚡" />
        <KpiCard label="Cold-Chain Integrity" value="99.9%" delta="2-8°C Constant" trend="up" subtext="Zero vaccine excursion" icon="❄️" />
        <KpiCard label="Failed Delivery Rate" value="0.8%" delta="Ultra-low" trend="up" subtext="First attempt doorstep OTP" icon="🎯" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '16px' }}>
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          padding: '20px'
        }}>
          <h3 style={{ margin: '0 0 4px', fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Dispatch Heatmap & Real-Time Urban Hubs</h3>
          <p style={{ margin: '0 0 16px', fontSize: '12px', color: '#64748b' }}>Fulfillment speed and active courier density across urban clusters</p>
          <div style={{
            height: '180px',
            background: 'linear-gradient(135deg, #0f172a, #1e293b)',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#38bdf8',
            fontSize: '12px'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>🗺️</div>
            <div style={{ fontWeight: 600, color: '#f8fafc' }}>Bengaluru Central (28m avg) • South Mumbai (34m avg) • Delhi South (41m avg)</div>
            <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>Real-time GPS telematics & automated dispatch load balancing</div>
          </div>
        </div>

        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          padding: '20px'
        }}>
          <h3 style={{ margin: '0 0 4px', fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Logistics Subcategories Overview</h3>
          <p style={{ margin: '0 0 16px', fontSize: '12px', color: '#64748b' }}>Quick access to domain management suites</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {subcategories.slice(1).map(item => (
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
                  textAlign: 'left'
                }}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
