import React, { useState, useMemo } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function PharmacyOrders() {
  const [filterChannel, setFilterChannel] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [toast, setToast] = useState('');

  const orders = [];

  const filtered = useMemo(() => {
    return orders.filter(o => {
      const matchChannel = filterChannel === 'ALL' || o.channel === filterChannel;
      const matchStatus = filterStatus === 'ALL' || o.status === filterStatus;
      const matchSearch = search === '' ||
        o.id.toLowerCase().includes(search.toLowerCase()) ||
        o.customer.toLowerCase().includes(search.toLowerCase()) ||
        o.items.toLowerCase().includes(search.toLowerCase()) ||
        o.address.toLowerCase().includes(search.toLowerCase());
      return matchChannel && matchStatus && matchSearch;
    });
  }, [filterChannel, filterStatus, search]);

  function handleMarkDispatched(orderId) {
    setSelectedOrder(null);
    setToast(`Order ${orderId} verified with tamper-evident seal and handed over to dispatch!`);
    setTimeout(() => setToast(''), 3500);
  }

  return (
    <DashboardLayout
      category="Pharmacy"
      subcategory="Pharmacy Orders"
      title="Dispensary Orders & Rapid Fulfillment"
      subtitle="60-minute express delivery, cold chain packaging verification, and pharmacist sign-off tracking"
      icon="🚚"
      badge=""
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => alert('Printing thermal dispatch labels & GST invoices for all pending orders...')}
            style={{
              padding: '7px 14px',
              borderRadius: '8px',
              background: '#3b82f6',
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
            <span>🖨️</span> Batch Print Invoices & Labels
          </button>
        </div>
      }
    >
      {toast && (
        <div style={{
          padding: '12px 16px',
          borderRadius: '8px',
          background: 'rgba(16,185,129,0.15)',
          border: '1px solid rgba(16,185,129,0.3)',
          color: '#10b981',
          fontSize: '13px',
          fontWeight: 600
        }}>
          ✓ {toast}
        </div>
      )}

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Active Pharmacy Orders" value="0 Orders" delta="0 Orders" trend="neutral" subtext="Across all 5 city hubs" icon="📦" />
        <KpiCard label="60-Min Express Orders" value="0 Orders" delta="--" trend="neutral" subtext="GPS active" icon="⚡" />
        <KpiCard label="Clinic Counter Pickups" value="0 Orders" delta="--" trend="neutral" subtext="Walk-in dispensary" icon="🏥" />
        <KpiCard label="Cold Chain Dispatches" value="0 Orders" delta="0 logs" trend="neutral" subtext="Insulated gel packs" icon="❄️" />
        <KpiCard label="Average Packing Time" value="0.0 Mins" delta="--" trend="neutral" subtext="Pharmacist check to pack" icon="⏱️" />
        <KpiCard label="Dispatch SLA Compliance" value="0.0%" delta="0.0%" trend="neutral" subtext="On-time delivery" icon="🎯" />
      </div>

      {/* Orders Filter & Table */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Active Dispensary Orders Pipeline</h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#94a3b8' }}>Live status from pharmacist verification to customer doorstep</p>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search Order ID, customer, address..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                background: 'rgba(0,0,0,0.2)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                fontSize: '12px',
                width: '220px'
              }}
            />
            {/* Channel Filter */}
            <div style={{ display: 'flex', gap: '4px' }}>
              {['ALL', '60-Min Rapid', 'Clinic Counter', 'Scheduled Delivery'].map(ch => (
                <button
                  key={ch}
                  onClick={() => setFilterChannel(ch)}
                  style={{
                    padding: '5px 10px',
                    borderRadius: '6px',
                    border: 'none',
                    fontSize: '11px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    background: filterChannel === ch ? 'rgba(59,130,246,0.25)' : 'rgba(255,255,255,0.05)',
                    color: filterChannel === ch ? '#60a5fa' : '#94a3b8'
                  }}
                >
                  {ch}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: '#94a3b8' }}>
                <th style={{ padding: '8px 12px' }}>Order ID</th>
                <th style={{ padding: '8px 12px' }}>Customer & Destination</th>
                <th style={{ padding: '8px 12px' }}>Prescribed Items</th>
                <th style={{ padding: '8px 12px' }}>Channel</th>
                <th style={{ padding: '8px 12px' }}>Cold Chain</th>
                <th style={{ padding: '8px 12px' }}>SLA Timer</th>
                <th style={{ padding: '8px 12px' }}>Status</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Value</th>
                <th style={{ padding: '8px 12px', textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((ord, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '10px 12px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 600, color: '#38bdf8' }}>
                    {ord.id}
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <div style={{ fontWeight: 600 }}>{ord.customer}</div>
                    <div style={{ fontSize: '10px', color: '#64748b', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {ord.address}
                    </div>
                  </td>
                  <td style={{ padding: '10px 12px', maxWidth: '220px' }}>
                    <div style={{ color: '#cbd5e1' }}>{ord.items}</div>
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{ padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 600, background: 'rgba(255,255,255,0.06)', color: '#93c5fd' }}>
                      {ord.channel}
                    </span>
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    {ord.cold ? (
                      <span style={{ color: '#38bdf8', fontWeight: 600, fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        ❄️ Gel Pack
                      </span>
                    ) : (
                      <span style={{ color: '#64748b', fontSize: '11px' }}>Standard</span>
                    )}
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontFamily: '"IBM Plex Mono", monospace',
                      background: ord.slaRemaining === 'Ready' || ord.slaRemaining === 'Completed' ? 'rgba(16,185,129,0.15)' : 'rgba(245,158,11,0.15)',
                      color: ord.slaRemaining === 'Ready' || ord.slaRemaining === 'Completed' ? '#34d399' : '#fbbf24'
                    }}>
                      {ord.slaRemaining}
                    </span>
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '99px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: ord.status === 'Delivered' ? 'rgba(16,185,129,0.15)' :
                        ord.status === 'Out for Delivery' ? 'rgba(59,130,246,0.15)' : 'rgba(168,85,247,0.15)',
                      color: ord.status === 'Delivered' ? '#34d399' :
                        ord.status === 'Out for Delivery' ? '#60a5fa' : '#c084fc'
                    }}>
                      {ord.status}
                    </span>
                  </td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#10b981' }}>
                    ₹{ord.value.toLocaleString('en-IN')}
                  </td>
                  <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                    <button
                      onClick={() => setSelectedOrder(ord)}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        background: 'rgba(59,130,246,0.2)',
                        border: '1px solid rgba(59,130,246,0.4)',
                        color: '#60a5fa',
                        fontSize: '11px',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Manifest
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manifest & Packaging Modal */}
      {selectedOrder && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999
        }}>
          <div style={{
            background: '#1e293b',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
            padding: '24px',
            width: '0%',
            maxWidth: '560px',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px' }}>
              <div>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>PHARMACY DISPATCH MANIFEST</span>
                <h3 style={{ margin: '2px 0 0', fontSize: '18px', fontWeight: 700, color: '#38bdf8' }}>{selectedOrder.id}</h3>
              </div>
              <span style={{ padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600, background: 'rgba(59,130,246,0.15)', color: '#60a5fa' }}>
                {selectedOrder.channel}
              </span>
            </div>

            <div style={{ marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px' }}>
              <div style={{ padding: '10px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
                <span style={{ color: '#94a3b8' }}>Recipient:</span> <strong>{selectedOrder.customer}</strong> ({selectedOrder.phone})
                <div style={{ marginTop: '4px', color: '#cbd5e1' }}>Destination: {selectedOrder.address}</div>
              </div>
              <div style={{ padding: '10px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
                <span style={{ color: '#94a3b8' }}>Prescribed Contents:</span>
                <div style={{ marginTop: '4px', fontWeight: 600, color: '#fff' }}>{selectedOrder.items}</div>
                {selectedOrder.cold && (
                  <div style={{ marginTop: '6px', color: '#38bdf8', fontWeight: 600, fontSize: '11px' }}>
                    ❄️ COLD CHAIN REQUIREMENT: Insulated thermo-pouch with 2x frozen gel packs verified.
                  </div>
                )}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div style={{ padding: '8px 10px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px' }}>
                  <span style={{ color: '#94a3b8' }}>Assigned Rider:</span>
                  <div style={{ fontWeight: 600, marginTop: '2px' }}>{selectedOrder.rider}</div>
                </div>
                <div style={{ padding: '8px 10px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px' }}>
                  <span style={{ color: '#94a3b8' }}>Verifying Pharmacist:</span>
                  <div style={{ fontWeight: 600, marginTop: '2px' }}>{selectedOrder.pharmacist}</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px' }}>
              <button
                onClick={() => setSelectedOrder(null)}
                style={{ padding: '8px 16px', borderRadius: '6px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', cursor: 'pointer' }}
              >
                Close
              </button>
              <button
                onClick={() => handleMarkDispatched(selectedOrder.id)}
                style={{ padding: '8px 16px', borderRadius: '6px', background: '#3b82f6', border: 'none', color: '#fff', fontWeight: 600, cursor: 'pointer' }}
              >
                Sign Off & Dispatch Order
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
