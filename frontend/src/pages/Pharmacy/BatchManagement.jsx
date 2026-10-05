import React, { useState, useMemo } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function BatchManagement() {
  const [qcFilter, setQcFilter] = useState('ALL');
  const [hubFilter, setHubFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [showInwardModal, setShowInwardModal] = useState(false);
  const [toast, setToast] = useState('');

  const batches = [
    { batchNo: 'BT-2026-BRV01', sku: 'DRG-VET-001', name: 'Bravecto Chewable 20-40kg', vendor: 'MSD Animal Health India', mfg: '2025-02-10', exp: '2027-02-09', inwardQty: 250, balance: 142, hub: 'Bengaluru Central', qcStatus: 'QC Passed', zone: 'Ambient Rack A4' },
    { batchNo: 'BT-2025-NVD04', sku: 'DRG-VET-004', name: 'Nobivac DHPPi Core Vaccine 1D', vendor: 'MSD Animal Health India', mfg: '2025-01-15', exp: '2026-07-14', inwardQty: 150, balance: 86, hub: 'Mumbai West', qcStatus: 'QC Passed', zone: 'Cold Chiller #02 (3.8°C)' },
    { batchNo: 'BT-2025-NGS12', sku: 'DRG-VET-002', name: 'NexGard Spectra (7.5-15kg)', vendor: 'Boehringer Ingelheim', mfg: '2024-11-20', exp: '2026-05-19', inwardQty: 100, balance: 42, hub: 'Delhi NCR Hub', qcStatus: 'QC Passed', zone: 'Ambient Rack B2' },
    { batchNo: 'BT-2025-CDS03', sku: 'DRG-VET-003', name: 'Zoetis Cardisure 5mg (Pimobendan)', vendor: 'Zoetis India Pvt Ltd', mfg: '2025-03-01', exp: '2027-02-28', inwardQty: 80, balance: 35, hub: 'Bengaluru Central', qcStatus: 'QC Passed', zone: 'Secure Pharmacy Vault' },
    { batchNo: 'BT-2025-AMX09', sku: 'DRG-VET-005', name: 'Amoxiclav Pet 625mg', vendor: 'Intas Pharmaceuticals', mfg: '2025-04-12', exp: '2026-10-11', inwardQty: 300, balance: 120, hub: 'Hyderabad Center', qcStatus: 'QC Passed', zone: 'Ambient Rack C1' },
    { batchNo: 'BT-2025-MLS02', sku: 'DRG-VET-006', name: 'Malaseb Medicated Shampoo 250ml', vendor: 'Dechra Veterinary', mfg: '2024-09-05', exp: '2026-03-04', inwardQty: 60, balance: 18, hub: 'Pune Express', qcStatus: 'QC Passed', zone: 'Derm Shelf D3' },
    { batchNo: 'BT-2026-REV08', sku: 'DRG-VET-007', name: 'Zoetis Revolution Spot-On (Cat)', vendor: 'Zoetis India Pvt Ltd', mfg: '2025-05-18', exp: '2027-05-17', inwardQty: 100, balance: 100, hub: 'Bengaluru Central', qcStatus: 'Under Quarantine', zone: 'QC Hold Bay #1' },
    { batchNo: 'BT-2024-RBS01', sku: 'DRG-VET-008', name: 'Rabisin Rabies Vaccine 1ml', vendor: 'Boehringer Ingelheim', mfg: '2024-08-10', exp: '2025-11-15', inwardQty: 200, balance: 24, hub: 'Mumbai West', qcStatus: 'Recalled', zone: 'Quarantine Lockbox' }
  ];

  const filtered = useMemo(() => {
    return batches.filter(b => {
      const matchQc = qcFilter === 'ALL' || b.qcStatus === qcFilter;
      const matchHub = hubFilter === 'ALL' || b.hub === hubFilter;
      const matchSearch = search === '' ||
        b.batchNo.toLowerCase().includes(search.toLowerCase()) ||
        b.name.toLowerCase().includes(search.toLowerCase()) ||
        b.sku.toLowerCase().includes(search.toLowerCase()) ||
        b.vendor.toLowerCase().includes(search.toLowerCase());
      return matchQc && matchHub && matchSearch;
    });
  }, [qcFilter, hubFilter, search]);

  function handleReceiveBatch(e) {
    e.preventDefault();
    setShowInwardModal(false);
    setToast('New pharmaceutical batch received into Quarantine Bay for COA verification!');
    setTimeout(() => setToast(''), 3500);
  }

  function handleTriggerRecall(batchNo) {
    if (confirm(`INITIATE STATUTORY RECALL for Batch ${batchNo}? This will immediately freeze POS dispensing and trigger auto-alerts.`)) {
      setToast(`EMERGENCY RECALL executed for ${batchNo}. All dispensing points locked.`);
      setTimeout(() => setToast(''), 4000);
    }
  }

  return (
    <DashboardLayout
      category="Pharmacy"
      subcategory="Batch Management"
      title="Pharmaceutical Batch Traceability & GRN Control"
      subtitle="Complete batch-level lineage, Certificate of Analysis (COA) verification, quarantine bays, and recall management"
      icon="🏷️"
      badge="342 Active Batches"
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setShowInwardModal(true)}
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
            <span>+</span> Inward New Batch (GRN)
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
        <KpiCard label="Active Tracked Batches" value="342 Batches" delta="100% Barcoded" trend="up" subtext="Across 5 warehouse hubs" icon="🏷️" />
        <KpiCard label="QC Passed & Released" value="334 Batches" delta="97.6% Compliance" trend="up" subtext="Verified COA signed" icon="✅" />
        <KpiCard label="Quarantine Hold Bay" value="6 Batches" delta="Awaiting Lab Sign-off" trend="neutral" subtext="Zero dispensing leak" icon="⏳" />
        <KpiCard label="Recalled / Blocked" value="2 Batches" delta="Safety quarantine" trend="down" subtext="Isolated in vault" icon="🚫" />
        <KpiCard label="Mean Shelf Life" value="16.4 Months" delta="+1.2m vs SLA" trend="up" subtext="Fresh batch intake" icon="📅" />
        <KpiCard label="GS1 Barcode Scans" value="100.0%" delta="Zero Manual Input" trend="up" subtext="Optical 2D datamatrix" icon="📱" />
      </div>

      {/* Batch Table Container */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Pharmaceutical Batch Registry</h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#94a3b8' }}>Real-time inventory by manufacturer batch number, manufacturing date, and expiry timeline</p>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search batch code, drug, vendor..."
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
            <select
              value={qcFilter}
              onChange={e => setQcFilter(e.target.value)}
              style={{
                padding: '6px 10px',
                borderRadius: '8px',
                background: 'rgba(0,0,0,0.2)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                fontSize: '12px'
              }}
            >
              <option value="ALL">All QC Statuses</option>
              <option value="QC Passed">QC Passed</option>
              <option value="Under Quarantine">Under Quarantine</option>
              <option value="Recalled">Recalled</option>
            </select>
            <select
              value={hubFilter}
              onChange={e => setHubFilter(e.target.value)}
              style={{
                padding: '6px 10px',
                borderRadius: '8px',
                background: 'rgba(0,0,0,0.2)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                fontSize: '12px'
              }}
            >
              <option value="ALL">All Hubs</option>
              <option value="Bengaluru Central">Bengaluru Central</option>
              <option value="Mumbai West">Mumbai West</option>
              <option value="Delhi NCR Hub">Delhi NCR Hub</option>
              <option value="Hyderabad Center">Hyderabad Center</option>
              <option value="Pune Express">Pune Express</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: '#94a3b8' }}>
                <th style={{ padding: '8px 12px' }}>Batch Code</th>
                <th style={{ padding: '8px 12px' }}>Medicine & SKU</th>
                <th style={{ padding: '8px 12px' }}>Supplier</th>
                <th style={{ padding: '8px 12px' }}>Mfg Date</th>
                <th style={{ padding: '8px 12px' }}>Expiry Date</th>
                <th style={{ padding: '8px 12px' }}>Hub & Zone</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Inward</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Current Balance</th>
                <th style={{ padding: '8px 12px' }}>QC Status</th>
                <th style={{ padding: '8px 12px', textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '10px 12px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 600, color: '#38bdf8' }}>
                    {b.batchNo}
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <div style={{ fontWeight: 600 }}>{b.name}</div>
                    <div style={{ fontSize: '10px', color: '#64748b', fontFamily: '"IBM Plex Mono", monospace' }}>{b.sku}</div>
                  </td>
                  <td style={{ padding: '10px 12px', color: '#94a3b8' }}>{b.vendor}</td>
                  <td style={{ padding: '10px 12px', color: '#94a3b8', fontFamily: '"IBM Plex Mono", monospace' }}>{b.mfg}</td>
                  <td style={{ padding: '10px 12px', color: '#cbd5e1', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 600 }}>{b.exp}</td>
                  <td style={{ padding: '10px 12px' }}>
                    <div>{b.hub}</div>
                    <div style={{ fontSize: '10px', color: '#38bdf8' }}>{b.zone}</div>
                  </td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>{b.inwardQty}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: b.balance < 25 ? '#f87171' : '#10b981' }}>
                    {b.balance}
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '99px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: b.qcStatus === 'QC Passed' ? 'rgba(16,185,129,0.15)' :
                        b.qcStatus === 'Under Quarantine' ? 'rgba(245,158,11,0.15)' : 'rgba(239,68,68,0.15)',
                      color: b.qcStatus === 'QC Passed' ? '#34d399' :
                        b.qcStatus === 'Under Quarantine' ? '#fbbf24' : '#f87171'
                    }}>
                      {b.qcStatus}
                    </span>
                  </td>
                  <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                    {b.qcStatus !== 'Recalled' ? (
                      <button
                        onClick={() => handleTriggerRecall(b.batchNo)}
                        style={{
                          padding: '4px 8px',
                          borderRadius: '6px',
                          background: 'rgba(239,68,68,0.12)',
                          border: '1px solid rgba(239,68,68,0.3)',
                          color: '#f87171',
                          fontSize: '10px',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        Recall
                      </button>
                    ) : (
                      <span style={{ fontSize: '10px', color: '#64748b' }}>Locked</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inward New Batch Modal */}
      {showInwardModal && (
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
            width: '90%',
            maxWidth: '540px',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <h3 style={{ margin: '0 0 8px', fontSize: '18px', fontWeight: 700 }}>Inward New Pharmaceutical Batch (GRN)</h3>
            <p style={{ margin: '0 0 16px', fontSize: '12px', color: '#94a3b8' }}>Record manufacturer batch details, COA test certificate, and allocate quarantine bay</p>

            <form onSubmit={handleReceiveBatch} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>Manufacturer Batch No</label>
                <input required type="text" placeholder="e.g. BT-2026-NEX09" style={{ width: '100%', padding: '8px', borderRadius: '6px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>Select Medicine SKU</label>
                <select style={{ width: '100%', padding: '8px', borderRadius: '6px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}>
                  <option>DRG-VET-001 · Bravecto 20-40kg</option>
                  <option>DRG-VET-002 · NexGard Spectra</option>
                  <option>DRG-VET-003 · Zoetis Cardisure 5mg</option>
                  <option>DRG-VET-004 · Nobivac DHPPi Vaccine</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>Manufacturing Date</label>
                <input required type="date" style={{ width: '100%', padding: '8px', borderRadius: '6px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>Expiry Date</label>
                <input required type="date" style={{ width: '100%', padding: '8px', borderRadius: '6px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>Inward Units (Qty)</label>
                <input required type="number" placeholder="100" style={{ width: '100%', padding: '8px', borderRadius: '6px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>Receiving Hub</label>
                <select style={{ width: '100%', padding: '8px', borderRadius: '6px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}>
                  <option>Bengaluru Central Hub</option>
                  <option>Mumbai West Fulfillment</option>
                  <option>Delhi NCR Hub</option>
                  <option>Hyderabad Center</option>
                </select>
              </div>

              <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setShowInwardModal(false)}
                  style={{ padding: '8px 16px', borderRadius: '6px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: '8px 16px', borderRadius: '6px', background: '#3b82f6', border: 'none', color: '#fff', fontWeight: 600, cursor: 'pointer' }}
                >
                  Confirm GRN Inward
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
