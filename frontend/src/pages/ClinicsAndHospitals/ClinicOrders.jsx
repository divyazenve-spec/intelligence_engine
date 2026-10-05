import React, { useState, useMemo } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function ClinicOrders() {
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [facilityFilter, setFacilityFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [showPOModal, setShowPOModal] = useState(false);
  const [toast, setToast] = useState('');

  const requisitions = [
    { id: 'REQ-HSP-401', facility: 'Koramangala Hospital', category: 'Surgical Implants', items: 'Titanium TPLO Plates (3.5mm x8) + Bone Screws', vendor: 'DePuy Synthes Vet', value: 145000, eta: 'Today, 2:00 PM', status: 'Dispatched', approvedBy: 'Dr. Priya Sharma' },
    { id: 'REQ-HSP-402', facility: 'Bandra West Hospital', category: 'Anesthetic Gases', items: 'Isoflurane USP (250ml x12 bottles) + Medical O2', vendor: 'Piramal Critical Care', value: 68000, eta: 'Tomorrow, 11:00 AM', status: 'Approved', approvedBy: 'Dr. Rahul Mehta' },
    { id: 'REQ-HSP-403', facility: 'Delhi NCR Hospital', category: 'Diagnostic Kits', items: 'IDEXX Catalyst Chem 17 Clips (50 tests) + CBC Reagents', vendor: 'IDEXX Laboratories', value: 112000, eta: 'Today, 4:30 PM', status: 'Dispatched', approvedBy: 'Dr. Aisha Khan' },
    { id: 'REQ-CLN-304', facility: 'Care Center Indiranagar', category: 'Vaccines (Cold)', items: 'Nobivac DHPPi (100 doses) + Rabisin (100 doses)', vendor: 'MSD Animal Health', value: 85000, eta: 'Today, 1:15 PM', status: 'Delivered', approvedBy: 'Dr. Arun V.' },
    { id: 'REQ-CLN-305', facility: 'Jubilee Hills Specialty', category: 'Surgical Consumables', items: 'Vicryl 3-0 Sutures (12 boxes) + Sterile Laparotomy Drapes', vendor: 'Ethicon India', value: 42000, eta: 'Tomorrow, 5:00 PM', status: 'Pending Review', approvedBy: 'Dr. Lakshmi Reddy' },
    { id: 'REQ-CLN-306', facility: 'Koregaon Park Clinic', category: 'PPE & Sterilization', items: 'Autoclave Pouches (1000 pcs) + Surgical Gloves (500 pairs)', vendor: 'MediPack Systems', value: 24500, eta: 'In Review', status: 'Pending Review', approvedBy: 'Dr. Sneha Kulkarni' }
  ];

  const filtered = useMemo(() => {
    return requisitions.filter(r => {
      const matchStatus = statusFilter === 'ALL' || r.status === statusFilter;
      const matchFacility = facilityFilter === 'ALL' || r.facility.includes(facilityFilter);
      const matchSearch = search === '' ||
        r.id.toLowerCase().includes(search.toLowerCase()) ||
        r.facility.toLowerCase().includes(search.toLowerCase()) ||
        r.items.toLowerCase().includes(search.toLowerCase()) ||
        r.vendor.toLowerCase().includes(search.toLowerCase());
      return matchStatus && matchFacility && matchSearch;
    });
  }, [statusFilter, facilityFilter, search]);

  function handleCreatePO(e) {
    e.preventDefault();
    setShowPOModal(false);
    setToast('Clinical Supply Purchase Order submitted for Medical Director approval!');
    setTimeout(() => setToast(''), 3500);
  }

  function handleApprove(id) {
    setToast(`Requisition ${id} signed off by Hospital Medical Director. Purchase order triggered!`);
    setTimeout(() => setToast(''), 3500);
  }

  return (
    <DashboardLayout
      category="Clinics & Hospitals"
      subcategory="Clinic Orders"
      title="Hospital Supplies & Clinical Procurement"
      subtitle="Surgical consumables, orthopedic implants, anesthesia gases, diagnostic test kits, and facility supply orders"
      icon="📦"
      badge="28 Active Orders"
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setShowPOModal(true)}
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
            <span>+</span> Raise Supply Requisition
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
        <KpiCard label="Active Requisitions" value="28 POs" delta="In Fulfillment" trend="neutral" subtext="Across all 14 facilities" icon="📦" />
        <KpiCard label="Procurement Value" value="₹8.45 Lakh" delta="MTD Budget" trend="up" subtext="Consumables & implants" icon="💰" />
        <KpiCard label="Surgical Implants" value="12 Orders" delta="Orthopedic & TPLO" trend="up" subtext="Titanium plates & pins" icon="🦴" />
        <KpiCard label="Diagnostic Reagents" value="8 Orders" delta="IDEXX & Roche" trend="up" subtext="Zero stockout SLA" icon="🔬" />
        <KpiCard label="On-Time Delivery SLA" value="98.4%" delta="+1.2% MoM" trend="up" subtext="Surgical readiness maintained" icon="⏱️" />
        <KpiCard label="Average PO Turnaround" value="18.6 Hours" delta="Requisition to arrival" trend="up" subtext="Fast-track approval" icon="⚡" />
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
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Hospital Clinical Supply Requisitions</h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#94a3b8' }}>Procurement pipeline for operating rooms, ICU suites, and diagnostic labs</p>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search REQ ID, facility, items..."
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
              value={facilityFilter}
              onChange={e => setFacilityFilter(e.target.value)}
              style={{
                padding: '6px 10px',
                borderRadius: '8px',
                background: 'rgba(0,0,0,0.2)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                fontSize: '12px'
              }}
            >
              <option value="ALL">All Facilities</option>
              <option value="Koramangala">Koramangala Hospital</option>
              <option value="Bandra">Bandra Hospital</option>
              <option value="Delhi">Delhi NCR Hospital</option>
              <option value="Indiranagar">Indiranagar Center</option>
              <option value="Jubilee">Jubilee Hills Clinic</option>
            </select>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              style={{
                padding: '6px 10px',
                borderRadius: '8px',
                background: 'rgba(0,0,0,0.2)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                fontSize: '12px'
              }}
            >
              <option value="ALL">All Statuses</option>
              <option value="Dispatched">Dispatched</option>
              <option value="Approved">Approved</option>
              <option value="Pending Review">Pending Review</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: '#94a3b8' }}>
                <th style={{ padding: '8px 12px' }}>Requisition ID</th>
                <th style={{ padding: '8px 12px' }}>Facility</th>
                <th style={{ padding: '8px 12px' }}>Category</th>
                <th style={{ padding: '8px 12px' }}>Clinical Items Requested</th>
                <th style={{ padding: '8px 12px' }}>Vendor</th>
                <th style={{ padding: '8px 12px' }}>Expected ETA</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Value</th>
                <th style={{ padding: '8px 12px' }}>Status</th>
                <th style={{ padding: '8px 12px', textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((req, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '10px 12px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 600, color: '#38bdf8' }}>{req.id}</td>
                  <td style={{ padding: '10px 12px', fontWeight: 600 }}>{req.facility}</td>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{ padding: '2px 6px', borderRadius: '4px', fontSize: '10px', background: 'rgba(255,255,255,0.05)', color: '#cbd5e1' }}>
                      {req.category}
                    </span>
                  </td>
                  <td style={{ padding: '10px 12px', color: '#fff', maxWidth: '240px' }}>{req.items}</td>
                  <td style={{ padding: '10px 12px', color: '#94a3b8' }}>{req.vendor}</td>
                  <td style={{ padding: '10px 12px', color: '#cbd5e1' }}>{req.eta}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#10b981' }}>
                    ₹{req.value.toLocaleString('en-IN')}
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '99px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: req.status === 'Delivered' ? 'rgba(16,185,129,0.15)' :
                        req.status === 'Dispatched' ? 'rgba(59,130,246,0.15)' :
                        req.status === 'Approved' ? 'rgba(168,85,247,0.15)' : 'rgba(245,158,11,0.15)',
                      color: req.status === 'Delivered' ? '#34d399' :
                        req.status === 'Dispatched' ? '#60a5fa' :
                        req.status === 'Approved' ? '#c084fc' : '#fbbf24'
                    }}>
                      {req.status}
                    </span>
                  </td>
                  <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                    {req.status === 'Pending Review' ? (
                      <button
                        onClick={() => handleApprove(req.id)}
                        style={{
                          padding: '4px 8px',
                          borderRadius: '6px',
                          background: '#10b981',
                          border: 'none',
                          color: '#fff',
                          fontSize: '11px',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        Approve
                      </button>
                    ) : (
                      <span style={{ fontSize: '10px', color: '#64748b' }}>Verified ✓</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Raise Supply Requisition Modal */}
      {showPOModal && (
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
            <h3 style={{ margin: '0 0 8px', fontSize: '18px', fontWeight: 700 }}>Raise Clinical Supply Requisition</h3>
            <p style={{ margin: '0 0 16px', fontSize: '12px', color: '#94a3b8' }}>Generate internal purchase requisition for hospital operating suites & wards</p>

            <form onSubmit={handleCreatePO} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>Requesting Facility</label>
                <select style={{ width: '100%', padding: '8px', borderRadius: '6px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}>
                  <option>Zenve Hospital Koramangala (24x7)</option>
                  <option>Zenve Multi-Specialty Bandra (24x7)</option>
                  <option>Zenve Referral Center Okhla</option>
                  <option>Zenve Care Center Indiranagar</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>Category</label>
                <select style={{ width: '100%', padding: '8px', borderRadius: '6px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}>
                  <option>Surgical Consumables & Sutures</option>
                  <option>Orthopedic Implants & Plates</option>
                  <option>Anesthetic Gases & Vials</option>
                  <option>Diagnostic Laboratory Kits</option>
                  <option>PPE & Sterilization Supplies</option>
                </select>
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>Items Description & Quantities</label>
                <textarea required rows="3" placeholder="e.g. 5 boxes Monocryl 2-0, 10 sterile laparotomy packs..." style={{ width: '100%', padding: '8px', borderRadius: '6px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>Estimated Value (₹)</label>
                <input required type="number" placeholder="45000" style={{ width: '100%', padding: '8px', borderRadius: '6px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>Urgency Level</label>
                <select style={{ width: '100%', padding: '8px', borderRadius: '6px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}>
                  <option>Routine Restock</option>
                  <option>Urgent (Within 24 Hours)</option>
                  <option>Emergency (Critical OT Case)</option>
                </select>
              </div>

              <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setShowPOModal(false)}
                  style={{ padding: '8px 16px', borderRadius: '6px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: '8px 16px', borderRadius: '6px', background: '#3b82f6', border: 'none', color: '#fff', fontWeight: 600, cursor: 'pointer' }}
                >
                  Submit Requisition
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
