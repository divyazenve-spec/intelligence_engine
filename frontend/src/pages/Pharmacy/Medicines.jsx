import React, { useState, useMemo } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function Medicines() {
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [scheduleFilter, setScheduleFilter] = useState('ALL');
  const [coldFilter, setColdFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [toast, setToast] = useState('');

  const medicinesData = [];

  const filtered = useMemo(() => {
    return medicinesData.filter(m => {
      const matchCat = categoryFilter === 'ALL' || m.category === categoryFilter;
      const matchSch = scheduleFilter === 'ALL' || m.schedule === scheduleFilter;
      const matchCold = coldFilter === 'ALL' || (coldFilter === 'COLD' ? m.cold : !m.cold);
      const matchSearch = search === '' ||
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.generic.toLowerCase().includes(search.toLowerCase()) ||
        m.sku.toLowerCase().includes(search.toLowerCase()) ||
        m.brand.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSch && matchCold && matchSearch;
    });
  }, [categoryFilter, scheduleFilter, coldFilter, search]);

  function handleSaveMedicine(e) {
    e.preventDefault();
    setShowAddModal(false);
    setToast('New medicine successfully added to Veterinary Formulary!');
    setTimeout(() => setToast(''), 3500);
  }

  return (
    <DashboardLayout
      category="Pharmacy"
      subcategory="Medicines"
      title="Veterinary Medicines & Formulary Catalog"
      subtitle="Complete drug master, active pharmaceutical ingredients (API), schedule classifications, and pricing matrices"
      icon="💊"
      badge=""
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setShowAddModal(true)}
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
            <span>+</span> Add Drug to Formulary
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

      {/* KPI Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Formulated Drugs" value="0 SKUs" delta="0.0%" trend="neutral" subtext="All therapeutic classes" icon="📚" />
        <KpiCard label="Schedule H Drugs" value="0 SKUs" delta="0 SKUs" trend="neutral" subtext="Strict batch tracking" icon="⚠️" />
        <KpiCard label="Cold Chain Drugs" value="0 SKUs" delta="0 SKUs" trend="neutral" subtext="Vaccines & biologics" icon="❄️" />
        <KpiCard label="Average Drug Margin" value="0.0%" delta="0.0%" trend="neutral" subtext="MRP vs PTR spread" icon="📈" />
        <KpiCard label="Low Stock Drugs" value="0 SKUs" delta="0 SKUs" trend="neutral" subtext="Immediate PO needed" icon="⚡" />
        <KpiCard label="Total Formulary Value" value="₹0" delta="Stock on hand" trend="up" subtext="12 dispensary units" icon="💎" />
      </div>

      {/* Filter and Search Bar */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Search drug name, generic salt, brand, SKU..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                background: 'rgba(0,0,0,0.2)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                fontSize: '12px',
                width: '260px'
              }}
            />
            {/* Category Select */}
            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              style={{
                padding: '6px 10px',
                borderRadius: '8px',
                background: 'rgba(0,0,0,0.2)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                fontSize: '12px'
              }}
            >
              <option value="ALL">All Therapeutic Classes</option>
              <option value="Antiparasitic">Antiparasitic</option>
              <option value="Antibiotics">Antibiotics</option>
              <option value="Cardiac & Renal">Cardiac & Renal</option>
              <option value="Vaccines">Vaccines</option>
              <option value="Dermatology">Dermatology</option>
              <option value="Pain & NSAIDs">Pain & NSAIDs</option>
              <option value="Supplements">Supplements</option>
            </select>
            {/* Schedule Select */}
            <select
              value={scheduleFilter}
              onChange={e => setScheduleFilter(e.target.value)}
              style={{
                padding: '6px 10px',
                borderRadius: '8px',
                background: 'rgba(0,0,0,0.2)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                fontSize: '12px'
              }}
            >
              <option value="ALL">All Schedules</option>
              <option value="Schedule H">Schedule H (Rx Only)</option>
              <option value="OTC">OTC (Over the Counter)</option>
            </select>
            {/* Cold Chain Select */}
            <select
              value={coldFilter}
              onChange={e => setColdFilter(e.target.value)}
              style={{
                padding: '6px 10px',
                borderRadius: '8px',
                background: 'rgba(0,0,0,0.2)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                fontSize: '12px'
              }}
            >
              <option value="ALL">All Storage Modes</option>
              <option value="COLD">Cold Chain (2°C–8°C)</option>
              <option value="AMBIENT">Ambient (Room Temp)</option>
            </select>
          </div>
          <span style={{ fontSize: '12px', color: '#94a3b8' }}>Showing {filtered.length} of {medicinesData.length} medicines</span>
        </div>

        {/* Medicines Master Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: '#94a3b8' }}>
                <th style={{ padding: '8px 12px' }}>SKU & Name</th>
                <th style={{ padding: '8px 12px' }}>Generic Salt / Formulation</th>
                <th style={{ padding: '8px 12px' }}>Brand / Manufacturer</th>
                <th style={{ padding: '8px 12px' }}>Category</th>
                <th style={{ padding: '8px 12px' }}>Schedule</th>
                <th style={{ padding: '8px 12px' }}>Storage</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>PTR (Cost)</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>MRP</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Margin</th>
                <th style={{ padding: '8px 12px', textAlign: 'center' }}>Stock</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m, idx) => {
                const marginPct = (((m.mrp - m.ptr) / m.mrp) * 100).toFixed(1);
                const isLow = m.stock <= m.reorder;
                return (
                  <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '10px 12px' }}>
                      <div style={{ fontWeight: 600, color: '#f8fafc' }}>{m.name}</div>
                      <div style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '10px', color: '#38bdf8' }}>{m.sku}</div>
                    </td>
                    <td style={{ padding: '10px 12px' }}>
                      <div style={{ color: '#cbd5e1' }}>{m.generic}</div>
                      <div style={{ fontSize: '10px', color: '#64748b' }}>{m.form}</div>
                    </td>
                    <td style={{ padding: '10px 12px', color: '#94a3b8' }}>{m.brand}</td>
                    <td style={{ padding: '10px 12px' }}>
                      <span style={{ padding: '2px 6px', borderRadius: '4px', fontSize: '10px', background: 'rgba(255,255,255,0.05)', color: '#94a3b8' }}>
                        {m.category}
                      </span>
                    </td>
                    <td style={{ padding: '10px 12px' }}>
                      <span style={{
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontSize: '10px',
                        fontWeight: 600,
                        background: m.schedule === 'Schedule H' ? 'rgba(239,68,68,0.15)' : 'rgba(16,185,129,0.15)',
                        color: m.schedule === 'Schedule H' ? '#f87171' : '#34d399'
                      }}>
                        {m.schedule}
                      </span>
                    </td>
                    <td style={{ padding: '10px 12px' }}>
                      {m.cold ? (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#38bdf8', fontSize: '11px', fontWeight: 600 }}>
                          ❄️ 2°C–8°C
                        </span>
                      ) : (
                        <span style={{ color: '#94a3b8', fontSize: '11px' }}>Ambient</span>
                      )}
                    </td>
                    <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>
                      ₹{m.ptr}
                    </td>
                    <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 600 }}>
                      ₹{m.mrp}
                    </td>
                    <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#10b981', fontWeight: 600 }}>
                      {marginPct}%
                    </td>
                    <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                      <span style={{
                        padding: '3px 8px',
                        borderRadius: '99px',
                        fontSize: '11px',
                        fontWeight: 600,
                        fontFamily: '"IBM Plex Mono", monospace',
                        background: isLow ? 'rgba(239,68,68,0.15)' : 'rgba(16,185,129,0.15)',
                        color: isLow ? '#f87171' : '#34d399'
                      }}>
                        {m.stock} {isLow ? '⚠️' : '✓'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Medicine Modal */}
      {showAddModal && (
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
            <h3 style={{ margin: '0 0 8px', fontSize: '18px', fontWeight: 700 }}>Add New Drug to Formulary</h3>
            <p style={{ margin: '0 0 16px', fontSize: '12px', color: '#94a3b8' }}>Enter pharmaceutical properties, API salt, dosage form and pricing</p>

            <form onSubmit={handleSaveMedicine} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>Drug Commercial Name</label>
                <input required type="text" placeholder="e.g., Apoquel 16mg Chewable" style={{ width: '100%', padding: '8px', borderRadius: '6px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>Generic Active Salt (API)</label>
                <input required type="text" placeholder="e.g., Oclacitinib Maleate 16mg" style={{ width: '100%', padding: '8px', borderRadius: '6px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>Manufacturer / Brand</label>
                <input required type="text" placeholder="e.g., Zoetis India" style={{ width: '100%', padding: '8px', borderRadius: '6px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>Therapeutic Class</label>
                <select style={{ width: '100%', padding: '8px', borderRadius: '6px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}>
                  <option>Dermatology & Allergy</option>
                  <option>Antiparasitic</option>
                  <option>Antibiotics</option>
                  <option>Cardiac & Renal</option>
                  <option>Pain & NSAIDs</option>
                  <option>Vaccines</option>
                  <option>Supplements</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>Schedule Type</label>
                <select style={{ width: '100%', padding: '8px', borderRadius: '6px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}>
                  <option>Schedule H (Prescription Only)</option>
                  <option>Schedule X (Narcotic / Controlled)</option>
                  <option>OTC (Over The Counter)</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>Storage Requirement</label>
                <select style={{ width: '100%', padding: '8px', borderRadius: '6px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}>
                  <option>Ambient (Room Temp 15-25°C)</option>
                  <option>Cold Chain (2°C–8°C)</option>
                  <option>Deep Freeze (-20°C)</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>Price to Retailer (₹ PTR)</label>
                <input required type="number" placeholder="1200" style={{ width: '100%', padding: '8px', borderRadius: '6px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>Maximum Retail Price (₹ MRP)</label>
                <input required type="number" placeholder="1850" style={{ width: '100%', padding: '8px', borderRadius: '6px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
              </div>

              <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  style={{ padding: '8px 16px', borderRadius: '6px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: '8px 16px', borderRadius: '6px', background: '#3b82f6', border: 'none', color: '#fff', fontWeight: 600, cursor: 'pointer' }}
                >
                  Save Drug
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
