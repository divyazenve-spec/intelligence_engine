import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function StockTransfers() {
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [modalOpen, setModalOpen] = useState(false);
  const [successToast, setSuccessToast] = useState('');

  const transfers = [];

  const filtered = filterStatus === 'ALL' ? transfers : transfers.filter(t => t.status === filterStatus);

  function handleCreateTransfer(e) {
    e.preventDefault();
    setModalOpen(false);
    setSuccessToast('New inter-warehouse transfer manifest generated successfully!');
    setTimeout(() => setSuccessToast(''), 3500);
  }

  return (
    <DashboardLayout
      category="Products & Inventory"
      subcategory="Stock Transfers"
      title="Inter-Warehouse Stock Transfers"
      subtitle="Hub-to-hub inventory replenishment, dispatch manifests, linehaul tracking & cold-chain custody"
      icon="🔁"
      badge=""
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setModalOpen(true)}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              border: 'none',
              background: '#3b82f6',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>+</span> Initiate Stock Transfer
          </button>
        </div>
      }
    >
      {successToast && (
        <div style={{
          padding: '12px 16px',
          borderRadius: '8px',
          background: 'rgba(16,185,129,0.15)',
          border: '1px solid rgba(16,185,129,0.3)',
          color: '#10b981',
          fontSize: '13px',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span>✓</span> {successToast}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Active In-Transit" value="4 Transfers" delta="₹0 value" trend="up" subtext="Live tracking online" icon="🚚" />
        <KpiCard label="Completed (MTD)" value="38 Transfers" delta="99.4% SLA" trend="up" subtext="On-time delivery" icon="✅" />
        <KpiCard label="Avg Transit Time" value="28.4 Hours" delta="-3.2h vs target" trend="up" subtext="Inter-city linehaul" icon="⚡" />
        <KpiCard label="Cold Chain Integrity" value="0.0%" delta="2°C–8°C logged" trend="up" subtext="IoT data logger verified" icon="❄️" />
      </div>

      {/* Transfer Pipeline Overview */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Active Transfer Manifests</h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#94a3b8' }}>Real-time GPS & telemetry tracking across all fulfillment centers</p>
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            {['ALL', 'In Transit', 'Pending Dispatch', 'Received'].map(st => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: filterStatus === st ? '1px solid #3b82f6' : '1px solid rgba(255,255,255,0.1)',
                  background: filterStatus === st ? 'rgba(59,130,246,0.18)' : 'rgba(255,255,255,0.03)',
                  color: filterStatus === st ? '#60a5fa' : '#94a3b8'
                }}
              >
                {st === 'ALL' ? 'All Status' : st}
              </button>
            ))}
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))', color: 'var(--muted-foreground, #94a3b8)', fontSize: '11px' }}>
                <th style={{ padding: '10px 12px' }}>Manifest ID</th>
                <th style={{ padding: '10px 12px' }}>Route (Origin → Destination)</th>
                <th style={{ padding: '10px 12px' }}>Contents / SKUs</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Transfer Value</th>
                <th style={{ padding: '10px 12px' }}>Carrier / Fleet</th>
                <th style={{ padding: '10px 12px' }}>Condition / Temp</th>
                <th style={{ padding: '10px 12px' }}>ETA / Status</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(t => (
                <tr key={t.id} style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.04))' }}>
                  <td style={{ padding: '12px', fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px', color: '#38bdf8' }}>{t.id}</td>
                  <td style={{ padding: '12px', fontWeight: 600 }}>
                    {t.origin} <span style={{ color: '#3b82f6', margin: '0 4px' }}>➔</span> {t.dest}
                  </td>
                  <td style={{ padding: '12px', color: '#94a3b8', maxWidth: '240px', fontSize: '11px' }}>{t.skus}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>{t.value}</td>
                  <td style={{ padding: '12px', fontSize: '11px', color: '#f8fafc' }}>{t.carrier}</td>
                  <td style={{ padding: '12px' }}>
                    {t.cold ? (
                      <span style={{ padding: '2px 6px', borderRadius: '4px', background: 'rgba(56,189,248,0.15)', color: '#38bdf8', fontSize: '10px', fontWeight: 600 }}>
                        ❄️ {t.temp}
                      </span>
                    ) : (
                      <span style={{ fontSize: '11px', color: '#94a3b8' }}>Ambient</span>
                    )}
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: t.status === 'In Transit' ? 'rgba(59,130,246,0.15)' : t.status === 'Received' ? 'rgba(16,185,129,0.15)' : 'rgba(245,158,11,0.15)',
                      color: t.status === 'In Transit' ? '#60a5fa' : t.status === 'Received' ? '#10b981' : '#f59e0b'
                    }}>
                      {t.status}
                    </span>
                    <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px' }}>{t.eta}</div>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    <button
                      type="button"
                      onClick={() => alert(`Manifest Details for ${t.id}\nCarrier: ${t.carrier}\nRoute: ${t.origin} -> ${t.dest}\nValue: ${t.value}`)}
                      style={{
                        padding: '4px 8px',
                        borderRadius: '6px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        background: 'transparent',
                        color: '#94a3b8',
                        fontSize: '11px',
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

      {/* Modal for New Transfer */}
      {modalOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <div style={{
            background: '#1e293b',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '14px',
            width: '100%',
            maxWidth: '520px',
            padding: '24px',
            color: '#f8fafc'
          }}>
            <h3 style={{ margin: '0 0 6px', fontSize: '18px', fontWeight: 700 }}>Initiate Inter-Warehouse Transfer</h3>
            <p style={{ margin: '0 0 20px', fontSize: '12px', color: '#94a3b8' }}>Generate an internal stock dispatch order and notify receiving hub.</p>
            <form onSubmit={handleCreateTransfer} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>Origin Warehouse</label>
                <select style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '13px' }} required defaultValue="BLR">
                  <option value="BLR">Bengaluru Central Hub</option>
                  <option value="MUM">Mumbai West Fulfillment</option>
                  <option value="DEL">Delhi NCR Hub</option>
                  <option value="HYD">Hyderabad Center</option>
                  <option value="PNE">Pune Express Micro-Hub</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>Destination Warehouse</label>
                <select style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '13px' }} required defaultValue="MUM">
                  <option value="MUM">Mumbai West Fulfillment</option>
                  <option value="BLR">Bengaluru Central Hub</option>
                  <option value="DEL">Delhi NCR Hub</option>
                  <option value="HYD">Hyderabad Center</option>
                  <option value="PNE">Pune Express Micro-Hub</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>Select Product / SKU</label>
                <select style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '13px' }} required>
                  <option value="ZV-MED-001">ZV-MED-001 — Bravecto Chewable (10-20kg)</option>
                  <option value="ZV-DIET-004">ZV-DIET-004 — Royal Canin Hepatic Veterinary 3kg</option>
                  <option value="ZV-VAC-002">ZV-VAC-002 — Nobivac DHPPi Core Vaccine 1D</option>
                  <option value="ZV-PAR-009">ZV-PAR-009 — NexGard Spectra (3.5-7.5kg)</option>
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>Transfer Quantity</label>
                  <input type="number" min="1" defaultValue="25" style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '13px' }} required />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>Transport Priority</label>
                  <select style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '13px' }}>
                    <option>Standard Express (24-48h)</option>
                    <option>Cold-Chain Priority (24h)</option>
                    <option>60-Min Express Transit</option>
                  </select>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button type="button" onClick={() => setModalOpen(false)} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: '#94a3b8', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ padding: '8px 18px', borderRadius: '8px', border: 'none', background: '#3b82f6', color: '#fff', fontWeight: 600, cursor: 'pointer' }}>Dispatch Transfer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
