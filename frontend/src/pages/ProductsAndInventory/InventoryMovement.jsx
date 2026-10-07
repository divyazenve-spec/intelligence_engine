import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function InventoryMovement() {
  const [filterType, setFilterType] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const [movements, setMovements] = useState([]);

  const [formData, setFormData] = useState({
    type: 'Inbound GRN',
    sku: 'ZV-MED-001',
    name: 'Bravecto Chewable Tablet (10-20kg)',
    qty: 25,
    source: 'MSD India Pvt Ltd',
    dest: 'BLR Hub (Bay 2)',
    ref: 'GRN-' + Math.floor(1000 + Math.random() * 9000),
    value: '₹0'
  });

  const filtered = movements.filter(m => {
    const matchesType = filterType === 'ALL' || m.type.toLowerCase().includes(filterType.toLowerCase());
    const matchesSearch = searchTerm === '' ||
      m.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.ref.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.dest.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.source.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const badgeStyles = {
    inbound: { bg: 'rgba(16,185,129,0.15)', col: '#10b981' },
    outbound: { bg: 'rgba(239,68,68,0.15)', col: '#f87171' },
    transfer: { bg: 'rgba(56,189,248,0.15)', col: '#38bdf8' },
    adjustment: { bg: 'rgba(245,158,11,0.15)', col: '#fbbf24' },
    return: { bg: 'rgba(168,85,247,0.15)', col: '#c084fc' }
  };

  function handleLogMovement(e) {
    e.preventDefault();
    const isOut = formData.type.includes('Outbound') || formData.type.includes('Adjustment');
    const badge = formData.type.includes('Inbound') ? 'inbound' :
                  formData.type.includes('Outbound') ? 'outbound' :
                  formData.type.includes('Transfer') ? 'transfer' : 'adjustment';
    const newMovement = {
      id: 'MOV-' + Math.floor(8842 + Math.random() * 100),
      time: 'Just now',
      type: formData.type,
      sku: formData.sku,
      name: formData.name,
      qty: isOut ? -Math.abs(Number(formData.qty)) : Math.abs(Number(formData.qty)),
      source: formData.source,
      dest: formData.dest,
      ref: formData.ref,
      value: formData.value,
      badge: badge
    };

    setMovements([newMovement, ...movements]);
    setModalOpen(false);
    setToastMessage('Movement ' + newMovement.id + ' successfully recorded to real-time stock ledger!');
    setTimeout(() => setToastMessage(''), 3500);
  }

  return (
    <DashboardLayout
      category="Products & Inventory"
      subcategory="Inventory Movement"
      title="Inventory Movement & Stock Ledger"
      subtitle="Real-time stock ledger tracking goods receipts (GRN), customer dispatches, inter-hub linehaul, and inventory reconciliations"
      icon="📈"
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
            <span>+</span> Log Stock Movement
          </button>
        </div>
      }
    >
      {toastMessage && (
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
          <span>✓</span> {toastMessage}
        </div>
      )}

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Inbound Stock Today" value="0 Units" delta="0 GRNs" trend="neutral" subtext="Vendor supplier receipts" icon="📥" />
        <KpiCard label="Outbound Dispatched" value="0 Units" delta="0 orders" trend="neutral" subtext="Fulfillment shipments" icon="📤" />
        <KpiCard label="Net Stock Delta" value="0 Units" delta="0.0%" trend="neutral" subtext="Positive net replenishment" icon="⚖️" />
        <KpiCard label="Adjustment Variance" value="0 Units" delta="0 write-off" trend="neutral" subtext="Shrinkage & audit delta" icon="🔍" />
      </div>

      {/* 2-Column Velocity & Flow Balancing Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '16px'
      }}>
        {/* Card 1: 24h Movement Velocity */}
        <div style={{
          background: 'var(--card, #1e293b)',
          border: '1px solid var(--border, rgba(255,255,255,0.08))',
          borderRadius: '12px',
          padding: '20px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>📈 24-Hour Stock Movement Velocity</h3>
              <p style={{ margin: '4px 0 0', fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)' }}>
                Breakdown of live inventory flows across operational channels
              </p>
            </div>
            <span style={{
              padding: '3px 8px',
              borderRadius: '99px',
              fontSize: '10px',
              fontWeight: 700,
              background: 'rgba(16,185,129,0.15)',
              color: '#10b981'
            }}>Live Sync</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                <span style={{ color: '#10b981', fontWeight: 600 }}>Inbound Supplier GRN</span>
                <span style={{ color: 'var(--muted-foreground, #94a3b8)' }}>0 units · 0% Volume</span>
              </div>
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '99px', overflow: 'hidden' }}>
                <div style={{ width: '0%', height: '100%', background: '#10b981', borderRadius: '99px' }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                <span style={{ color: '#ef4444', fontWeight: 600 }}>B2C &amp; Clinic Outbound</span>
                <span style={{ color: 'var(--muted-foreground, #94a3b8)' }}>0 units · 0% Volume</span>
              </div>
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '99px', overflow: 'hidden' }}>
                <div style={{ width: '0%', height: '100%', background: '#ef4444', borderRadius: '99px' }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                <span style={{ color: '#38bdf8', fontWeight: 600 }}>Inter-Hub Transfers</span>
                <span style={{ color: 'var(--muted-foreground, #94a3b8)' }}>0 units · 0% Volume</span>
              </div>
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '99px', overflow: 'hidden' }}>
                <div style={{ width: '0%', height: '100%', background: '#38bdf8', borderRadius: '99px' }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                <span style={{ color: '#f59e0b', fontWeight: 600 }}>Adjustments &amp; QC Returns</span>
                <span style={{ color: 'var(--muted-foreground, #94a3b8)' }}>0 units · 0% Volume</span>
              </div>
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '99px', overflow: 'hidden' }}>
                <div style={{ width: '0%', height: '100%', background: '#f59e0b', borderRadius: '99px' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Warehouse Flow Balancing */}
        <div style={{
          background: 'var(--card, #1e293b)',
          border: '1px solid var(--border, rgba(255,255,255,0.08))',
          borderRadius: '12px',
          padding: '20px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>⚖️ Warehouse Flow Balancing</h3>
              <p style={{ margin: '4px 0 0', fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)' }}>
                Net stock accumulation and drain across regional distribution nodes
              </p>
            </div>
            <span style={{
              padding: '3px 8px',
              borderRadius: '99px',
              fontSize: '10px',
              fontWeight: 700,
              background: 'rgba(168,85,247,0.15)',
              color: '#c084fc'
            }}>Balanced Flow</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)' }}>
              <div style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>Bengaluru Central Hub</div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: '#f8fafc', marginTop: '2px' }}>0 units net</div>
              <div style={{ fontSize: '10px', color: 'var(--muted-foreground, #94a3b8)', marginTop: '2px' }}>In: 0 · Out: 0 · Ret: 0 · Adj: 0</div>
            </div>

            <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(56,189,248,0.06)', border: '1px solid rgba(56,189,248,0.2)' }}>
              <div style={{ fontSize: '11px', color: '#38bdf8', fontWeight: 600 }}>Delhi NCR Hub</div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: '#f8fafc', marginTop: '2px' }}>0 units net</div>
              <div style={{ fontSize: '10px', color: 'var(--muted-foreground, #94a3b8)', marginTop: '2px' }}>Inbound supplier GRN receipt</div>
            </div>

            <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)' }}>
              <div style={{ fontSize: '11px', color: '#ef4444', fontWeight: 600 }}>Mumbai West Hub</div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: '#f8fafc', marginTop: '2px' }}>0 units net</div>
              <div style={{ fontSize: '10px', color: 'var(--muted-foreground, #94a3b8)', marginTop: '2px' }}>Vaccine transfer out to Pune</div>
            </div>

            <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(168,85,247,0.06)', border: '1px solid rgba(168,85,247,0.2)' }}>
              <div style={{ fontSize: '11px', color: '#c084fc', fontWeight: 600 }}>Pune Express Hub</div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: '#f8fafc', marginTop: '2px' }}>0 units net</div>
              <div style={{ fontSize: '10px', color: 'var(--muted-foreground, #94a3b8)', marginTop: '2px' }}>Transit inflow arrived safely</div>
            </div>
          </div>
        </div>
      </div>

      {/* Movement Ledger Table */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '16px'
        }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>📋 Real-Time Movement Ledger</h3>
            <p style={{ margin: '4px 0 0', fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)' }}>
              Showing {filtered.length} audit-logged movement transactions
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Search SKU, name, ref..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'rgba(0,0,0,0.2)',
                color: '#fff',
                fontSize: '12px',
                width: '180px'
              }}
            />

            {['ALL', 'Inbound', 'Outbound', 'Transfer', 'Adjustment'].map(t => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: filterType === t ? '1px solid #3b82f6' : '1px solid rgba(255,255,255,0.1)',
                  background: filterType === t ? 'rgba(59,130,246,0.18)' : 'rgba(255,255,255,0.03)',
                  color: filterType === t ? '#60a5fa' : '#94a3b8'
                }}
              >
                {t === 'ALL' ? 'All' : t}
              </button>
            ))}
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))', color: 'var(--muted-foreground, #94a3b8)', fontSize: '11px' }}>
                <th style={{ padding: '8px 12px' }}>Movement ID</th>
                <th style={{ padding: '8px 12px' }}>Timestamp</th>
                <th style={{ padding: '8px 12px' }}>Type</th>
                <th style={{ padding: '8px 12px' }}>SKU &amp; Product</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Quantity</th>
                <th style={{ padding: '8px 12px' }}>Source ➔ Destination</th>
                <th style={{ padding: '8px 12px' }}>Ref Doc #</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Transaction Value</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => {
                const isPos = item.qty > 0;
                const bStyle = badgeStyles[item.badge] || { bg: 'rgba(255,255,255,0.1)', col: '#94a3b8' };
                return (
                  <tr key={item.id} style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.04))' }}>
                    <td style={{ padding: '12px', fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px', color: '#38bdf8', fontWeight: 600 }}>
                      {item.id}
                    </td>
                    <td style={{ padding: '12px', color: 'var(--muted-foreground, #94a3b8)', fontSize: '12px' }}>
                      {item.time}
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        padding: '2px 8px',
                        borderRadius: '4px',
                        background: bStyle.bg,
                        color: bStyle.col,
                        fontWeight: 700,
                        fontSize: '10px'
                      }}>
                        {item.type}
                      </span>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <div style={{ fontWeight: 600, color: '#f8fafc' }}>{item.name}</div>
                      <div style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '10px', color: 'var(--muted-foreground, #94a3b8)' }}>{item.sku}</div>
                    </td>
                    <td style={{
                      padding: '12px',
                      textAlign: 'right',
                      fontFamily: '"IBM Plex Mono", monospace',
                      fontSize: '13px',
                      fontWeight: 700,
                      color: isPos ? '#10b981' : '#ef4444'
                    }}>
                      {isPos ? '+' : ''}{item.qty}
                    </td>
                    <td style={{ padding: '12px', fontSize: '12px' }}>
                      <span style={{ color: '#cbd5e1' }}>{item.source}</span>
                      <span style={{ color: '#64748b', margin: '0 6px' }}>➔</span>
                      <span style={{ color: '#38bdf8' }}>{item.dest}</span>
                    </td>
                    <td style={{ padding: '12px', fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px', color: '#a855f7' }}>
                      {item.ref}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 600, color: '#f8fafc' }}>
                      {item.value}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Log Stock Movement */}
      {modalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            background: 'var(--card, #1e293b)',
            border: '1px solid var(--border, rgba(255,255,255,0.12))',
            borderRadius: '14px',
            padding: '24px',
            maxWidth: '520px',
            width: '100%',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>Log New Stock Movement</h3>
              <button
                onClick={() => setModalOpen(false)}
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '18px', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleLogMovement} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>Movement Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(0,0,0,0.3)', color: '#fff', fontSize: '12px' }}
                >
                  <option value="Inbound GRN">Inbound GRN (Goods Receipt)</option>
                  <option value="Outbound Sale">Outbound Sale Dispatch</option>
                  <option value="Transfer In">Inter-Hub Transfer In</option>
                  <option value="Transfer Out">Inter-Hub Transfer Out</option>
                  <option value="Stock Adjustment">Stock Audit Adjustment / Write-off</option>
                  <option value="Customer Return">Customer Return (QC Restock)</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>SKU Code</label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(0,0,0,0.3)', color: '#fff', fontSize: '12px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>Quantity</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.qty}
                    onChange={(e) => setFormData({ ...formData, qty: e.target.value })}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(0,0,0,0.3)', color: '#fff', fontSize: '12px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>Product Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(0,0,0,0.3)', color: '#fff', fontSize: '12px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>Origin / Source</label>
                  <input
                    type="text"
                    value={formData.source}
                    onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(0,0,0,0.3)', color: '#fff', fontSize: '12px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>Destination Node</label>
                  <input
                    type="text"
                    value={formData.dest}
                    onChange={(e) => setFormData({ ...formData, dest: e.target.value })}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(0,0,0,0.3)', color: '#fff', fontSize: '12px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>Reference Doc #</label>
                  <input
                    type="text"
                    value={formData.ref}
                    onChange={(e) => setFormData({ ...formData, ref: e.target.value })}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(0,0,0,0.3)', color: '#fff', fontSize: '12px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>Valuation (INR)</label>
                  <input
                    type="text"
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(0,0,0,0.3)', color: '#fff', fontSize: '12px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.15)', background: 'transparent', color: '#fff', fontSize: '12px', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', background: '#3b82f6', color: '#fff', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
                >
                  Save &amp; Post to Ledger
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
