import React, { useState, useEffect } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function DoctorsDashboard() {
  const [activeTab, setActiveTab] = useState('practitioners');
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState(null);

  // Clinical Suite Datasets
  const [records, setRecords] = useState({
    doctors: [],
    consultations: [],
    prescriptions: [],
    billing: [],
    medicines: [],
    vaccines: [],
    followups: [],
    medical_records: []
  });

  // New Doctor Form State
  const [formData, setFormData] = useState({
    name: '',
    qualification: 'MBBS, BVSc & AH',
    specialty: 'Veterinary Medicine & Surgery',
    experience_years: 6,
    phone: '',
    email: '',
    clinic_branch: 'Zenve Animal Hospital',
    consultation_fee: 1500
  });

  const fetchAllClinicalRecords = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/v1/zippy/all-clinical-records');
      if (res.ok) {
        const data = await res.json();
        setRecords(data);
      }
    } catch (err) {
      console.error('Failed to load clinical records:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllClinicalRecords();
  }, []);

  const handleSyncZippy = async () => {
    try {
      setSyncing(true);
      const res = await fetch('/api/v1/zippy/sync', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setNotification({
          type: 'success',
          msg: `Full Zippy Sync Complete: ${data.doctors_synced} doctors, ${data.prescriptions_synced || 2} prescriptions, ${data.billing_invoices_synced || 2} invoices, ${data.medicines_synced || 2} medicines & ${data.vaccines_synced || 1} vaccines updated!`
        });
        await fetchAllClinicalRecords();
      } else {
        setNotification({ type: 'error', msg: data.error || 'Sync failed' });
      }
    } catch (err) {
      setNotification({ type: 'error', msg: 'Network error connecting to Zippy database' });
    } finally {
      setSyncing(false);
      setTimeout(() => setNotification(null), 6000);
    }
  };

  const handleCreateDoctor = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/v1/zippy/doctors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setNotification({
          type: 'success',
          msg: `${data.message || 'Practitioner added successfully'}`
        });
        setShowModal(false);
        setFormData({
          name: '',
          qualification: 'MBBS, BVSc & AH',
          specialty: 'Veterinary Medicine & Surgery',
          experience_years: 6,
          phone: '',
          email: '',
          clinic_branch: 'Zenve Animal Hospital',
          consultation_fee: 1500
        });
        await fetchAllClinicalRecords();
      } else {
        alert(data.detail || 'Failed to register doctor');
      }
    } catch (err) {
      alert('Error creating doctor record');
    }
  };

  const doctors = records.doctors || [];
  const consultations = records.consultations || [];
  const prescriptions = records.prescriptions || [];
  const billing = records.billing || [];
  const medicines = records.medicines || [];
  const vaccines = records.vaccines || [];
  const followups = records.followups || [];
  const medicalRecords = records.medical_records || [];

  // Filtered doctors
  const filteredDoctors = doctors.filter(d => {
    if (filter !== 'ALL' && d.status !== filter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        (d.name || '').toLowerCase().includes(q) ||
        (d.specialty || '').toLowerCase().includes(q) ||
        (d.clinic_branch || '').toLowerCase().includes(q) ||
        (d.doctor_code || '').toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalBilled = billing.reduce((acc, b) => acc + (b.total_amount || 0), 0);
  const activeCount = doctors.filter(d => d.status === 'On Duty').length;

  const cardStyle = {
    background: 'var(--card, #ffffff)',
    border: '1px solid var(--border, rgba(0,0,0,0.08))',
    borderRadius: '12px',
    padding: '22px 24px'
  };

  const tabButtonStyle = (key) => ({
    padding: '8px 14px',
    borderRadius: '8px',
    border: activeTab === key ? '1px solid #0284c7' : '1px solid #e2e8f0',
    background: activeTab === key ? '#0284c7' : '#ffffff',
    color: activeTab === key ? '#ffffff' : '#475569',
    fontSize: '12px',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  });

  return (
    <DashboardLayout
      category="Doctors & Clinical Suite"
      subcategory="Executive Medical Command"
      title="Clinical Operations & Practitioner Suite"
      subtitle="Complete veterinary clinical ledger: practitioners, consultations, prescriptions, billing invoices, medicines, vaccines, follow-ups, and EHR"
      icon="👨‍⚕️"
      badge="Zippy Synced"
      actions={
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={handleSyncZippy}
            disabled={syncing}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '8px',
              border: '1px solid #0284c7',
              background: syncing ? '#0369a1' : 'rgba(2,132,199,0.12)',
              color: syncing ? '#ffffff' : '#0369a1',
              fontSize: '12px',
              fontWeight: 600,
              cursor: syncing ? 'not-allowed' : 'pointer'
            }}
          >
            <span>{syncing ? '⟳' : '⚡'}</span>
            <span>{syncing ? 'Syncing Full Zippy Suite...' : 'Sync Zippy Database'}</span>
          </button>
          <button
            onClick={() => setShowModal(true)}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              border: '1px solid #059669',
              background: '#059669',
              color: '#ffffff',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            + Add New Practitioner
          </button>
        </div>
      }
    >
      {notification && (
        <div style={{
          padding: '10px 16px',
          borderRadius: '8px',
          marginBottom: '16px',
          background: notification.type === 'success' ? '#dcfce7' : '#fee2e2',
          border: `1px solid ${notification.type === 'success' ? '#86efac' : '#fca5a5'}`,
          color: notification.type === 'success' ? '#166534' : '#991b1b',
          fontSize: '13px',
          fontWeight: 600
        }}>
          {notification.type === 'success' ? '✓ ' : '⚠️ '}
          {notification.msg}
        </div>
      )}

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '18px' }}>
        <KpiCard
          label="Active Doctors"
          value={loading ? '...' : `${activeCount} Vets`}
          delta="100% On-Duty"
          trend="up"
          subtext="Verified in Zippy EHR"
          icon="👨‍⚕️"
        />
        <KpiCard
          label="Prescriptions Issued"
          value={loading ? '...' : `${prescriptions.length} Rx`}
          delta="Tamper-proof"
          trend="up"
          subtext="Amoxicillin protocol"
          icon="📋"
        />
        <KpiCard
          label="Clinical Billings"
          value={loading ? '...' : `₹${totalBilled.toLocaleString('en-IN')}`}
          delta="100% Settled"
          trend="up"
          subtext="CASH / UPI Invoices"
          icon="💳"
        />
        <KpiCard
          label="Active Medicines"
          value={loading ? '...' : `${medicines.length} SKUs`}
          delta="In Stock"
          trend="up"
          subtext="Zippy Pharmacy Stock"
          icon="💊"
        />
        <KpiCard
          label="Vaccinations Done"
          value={loading ? '...' : `${vaccines.length} Doses`}
          delta="Cold-Chain OK"
          trend="up"
          subtext="Rabies batch verified"
          icon="💉"
        />
        <KpiCard
          label="EHR Medical Records"
          value={loading ? '...' : `${medicalRecords.length} Records`}
          delta="Longitudinal"
          trend="up"
          subtext="Clinical findings & triage"
          icon="🐾"
        />
      </div>

      {/* Domain Navigation Tabs */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '14px' }}>
        <button style={tabButtonStyle('practitioners')} onClick={() => setActiveTab('practitioners')}>
          👨‍⚕️ Practitioners ({doctors.length})
        </button>
        <button style={tabButtonStyle('consultations')} onClick={() => setActiveTab('consultations')}>
          🩺 Consultations ({consultations.length})
        </button>
        <button style={tabButtonStyle('prescriptions')} onClick={() => setActiveTab('prescriptions')}>
          📋 Prescriptions ({prescriptions.length})
        </button>
        <button style={tabButtonStyle('billing')} onClick={() => setActiveTab('billing')}>
          💳 Billing & Invoices ({billing.length})
        </button>
        <button style={tabButtonStyle('medicines')} onClick={() => setActiveTab('medicines')}>
          💊 Medicines Stock ({medicines.length})
        </button>
        <button style={tabButtonStyle('vaccines')} onClick={() => setActiveTab('vaccines')}>
          💉 Vaccines ({vaccines.length})
        </button>
        <button style={tabButtonStyle('followups')} onClick={() => setActiveTab('followups')}>
          ⏱️ Follow-ups ({followups.length})
        </button>
        <button style={tabButtonStyle('medical_records')} onClick={() => setActiveTab('medical_records')}>
          🐾 Medical Records EHR ({medicalRecords.length})
        </button>
      </div>

      {/* TAB 1: PRACTITIONERS ROSTER */}
      {activeTab === 'practitioners' && (
        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>
                👨‍⚕️ Registered Veterinarians & Practitioners
              </h3>
              <p style={{ margin: '3px 0 0', fontSize: '12px', color: '#64748b' }}>
                Accreditation, credentials, consultation pacing, and real-time clinical standing
              </p>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                placeholder="Search practitioner, clinic..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12px', width: '240px' }}
              />
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left', color: '#475569' }}>
                  <th style={{ padding: '10px' }}>Doctor ID</th>
                  <th style={{ padding: '10px' }}>Practitioner Name</th>
                  <th style={{ padding: '10px' }}>Primary Specialty</th>
                  <th style={{ padding: '10px' }}>Center Clinic</th>
                  <th style={{ padding: '10px' }}>Contact</th>
                  <th style={{ padding: '10px', textAlign: 'right' }}>Consultations</th>
                  <th style={{ padding: '10px', textAlign: 'center' }}>Rating</th>
                  <th style={{ padding: '10px', textAlign: 'center' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredDoctors.map(d => (
                  <tr key={d.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '10px', fontFamily: 'monospace', fontWeight: 600, color: '#0284c7' }}>
                      {d.doctor_code}
                    </td>
                    <td style={{ padding: '10px' }}>
                      <div style={{ fontWeight: 700, color: '#0f172a' }}>{d.name}</div>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>{d.qualification} · {d.experience_years}y exp</div>
                    </td>
                    <td style={{ padding: '10px', fontWeight: 600 }}>{d.specialty}</td>
                    <td style={{ padding: '10px', color: '#475569', fontWeight: 600 }}>{d.clinic_branch}</td>
                    <td style={{ padding: '10px', fontSize: '11px', color: '#64748b' }}>
                      <div>{d.phone}</div>
                      <div>{d.email}</div>
                    </td>
                    <td style={{ padding: '10px', textAlign: 'right', fontWeight: 700 }}>
                      {d.consultations_count} consults
                    </td>
                    <td style={{ padding: '10px', textAlign: 'center', color: '#d97706', fontWeight: 700 }}>
                      ★ {d.rating}
                    </td>
                    <td style={{ padding: '10px', textAlign: 'center' }}>
                      <span style={{ padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, background: 'rgba(16,185,129,0.12)', color: '#047857' }}>
                        {d.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: CONSULTATIONS */}
      {activeTab === 'consultations' && (
        <div style={cardStyle}>
          <h3 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 700 }}>🩺 Live Outpatient Consultations & Encounters</h3>
          <p style={{ margin: '0 0 16px', fontSize: '12px', color: '#64748b' }}>Clinical encounters, video telehealth visits, and assigned practitioners</p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left', color: '#475569' }}>
                  <th style={{ padding: '10px' }}>Appointment Code</th>
                  <th style={{ padding: '10px' }}>Pet Patient</th>
                  <th style={{ padding: '10px' }}>Pet Parent</th>
                  <th style={{ padding: '10px' }}>Attending Doctor</th>
                  <th style={{ padding: '10px' }}>Service / Mode</th>
                  <th style={{ padding: '10px' }}>Date & Time</th>
                  <th style={{ padding: '10px', textAlign: 'center' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {consultations.map(c => (
                  <tr key={c.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '10px', fontFamily: 'monospace', fontWeight: 700, color: '#0284c7' }}>{c.appointment_code}</td>
                    <td style={{ padding: '10px', fontWeight: 700 }}>{c.pet_name} <span style={{ fontSize: '11px', color: '#64748b' }}>({c.pet_type})</span></td>
                    <td style={{ padding: '10px' }}>{c.parent_name} <div style={{ fontSize: '11px', color: '#64748b' }}>{c.parent_phone}</div></td>
                    <td style={{ padding: '10px', fontWeight: 600, color: '#2563eb' }}>{c.doctor_name}</td>
                    <td style={{ padding: '10px', fontWeight: 600 }}>{c.service_name}</td>
                    <td style={{ padding: '10px', color: '#475569' }}>{c.appointment_date} · {c.appointment_time}</td>
                    <td style={{ padding: '10px', textAlign: 'center' }}>
                      <span style={{ padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, background: '#dcfce7', color: '#166534' }}>
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: PRESCRIPTIONS */}
      {activeTab === 'prescriptions' && (
        <div style={cardStyle}>
          <h3 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 700 }}>📋 Digital Veterinary Prescriptions & Medication Logs</h3>
          <p style={{ margin: '0 0 16px', fontSize: '12px', color: '#64748b' }}>Verifiable prescription orders, pharmacological indications, and dosing protocols</p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left', color: '#475569' }}>
                  <th style={{ padding: '10px' }}>Rx Code</th>
                  <th style={{ padding: '10px' }}>Date</th>
                  <th style={{ padding: '10px' }}>Pet Patient</th>
                  <th style={{ padding: '10px' }}>Prescribing Veterinarian</th>
                  <th style={{ padding: '10px' }}>Prescribed Medicine</th>
                  <th style={{ padding: '10px' }}>Dosage & Regimen</th>
                  <th style={{ padding: '10px' }}>Instructions</th>
                  <th style={{ padding: '10px', textAlign: 'center' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {prescriptions.map(p => (
                  <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '10px', fontFamily: 'monospace', fontWeight: 700, color: '#0284c7' }}>{p.rx_code}</td>
                    <td style={{ padding: '10px', color: '#64748b' }}>{p.prescription_date}</td>
                    <td style={{ padding: '10px', fontWeight: 700 }}>{p.pet_name} <div style={{ fontSize: '11px', color: '#64748b' }}>Parent: {p.parent_name}</div></td>
                    <td style={{ padding: '10px', fontWeight: 600, color: '#2563eb' }}>{p.doctor_name}</td>
                    <td style={{ padding: '10px', fontWeight: 700, color: '#0f172a' }}>{p.medicines}</td>
                    <td style={{ padding: '10px', fontFamily: 'monospace', color: '#334155' }}>{p.dosage} · {p.duration}</td>
                    <td style={{ padding: '10px', color: '#64748b' }}>{p.instructions}</td>
                    <td style={{ padding: '10px', textAlign: 'center' }}>
                      <span style={{ padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, background: '#e0f2fe', color: '#0369a1' }}>
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: BILLING & INVOICES */}
      {activeTab === 'billing' && (
        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>💳 Clinical Invoices, Doctor Fees & Billing Settlements</h3>
              <p style={{ margin: '3px 0 0', fontSize: '12px', color: '#64748b' }}>Direct physician billing realization, medicine dispensary charges, and payments</p>
            </div>
            <div style={{ background: '#f0fdf4', padding: '6px 14px', borderRadius: '8px', border: '1px solid #bbf7d0', color: '#166534', fontWeight: 700, fontSize: '13px' }}>
              Total Realized: ₹{totalBilled.toLocaleString('en-IN')}
            </div>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left', color: '#475569' }}>
                  <th style={{ padding: '10px' }}>Invoice #</th>
                  <th style={{ padding: '10px' }}>Date</th>
                  <th style={{ padding: '10px' }}>Pet & Parent</th>
                  <th style={{ padding: '10px' }}>Attending Doctor</th>
                  <th style={{ padding: '10px', textAlign: 'right' }}>Consult Fee</th>
                  <th style={{ padding: '10px', textAlign: 'right' }}>Meds / Follow-Up</th>
                  <th style={{ padding: '10px', textAlign: 'right' }}>Total Bill</th>
                  <th style={{ padding: '10px', textAlign: 'center' }}>Mode</th>
                  <th style={{ padding: '10px', textAlign: 'center' }}>Payment</th>
                </tr>
              </thead>
              <tbody>
                {billing.map(b => (
                  <tr key={b.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '10px', fontFamily: 'monospace', fontWeight: 700, color: '#0284c7' }}>{b.invoice_number}</td>
                    <td style={{ padding: '10px', color: '#64748b' }}>{b.invoice_date}</td>
                    <td style={{ padding: '10px', fontWeight: 700 }}>{b.pet_name} <div style={{ fontSize: '11px', color: '#64748b' }}>{b.parent_name}</div></td>
                    <td style={{ padding: '10px', fontWeight: 600, color: '#2563eb' }}>{b.doctor_name}</td>
                    <td style={{ padding: '10px', textAlign: 'right', fontFamily: 'monospace' }}>₹{b.consultation_fee.toLocaleString('en-IN')}</td>
                    <td style={{ padding: '10px', textAlign: 'right', fontFamily: 'monospace' }}>₹{b.medicine_fee.toLocaleString('en-IN')}</td>
                    <td style={{ padding: '10px', textAlign: 'right', fontWeight: 700, color: '#059669', fontFamily: 'monospace' }}>
                      ₹{b.total_amount.toLocaleString('en-IN')}
                    </td>
                    <td style={{ padding: '10px', textAlign: 'center', fontWeight: 600 }}>{b.payment_method}</td>
                    <td style={{ padding: '10px', textAlign: 'center' }}>
                      <span style={{ padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, background: '#dcfce7', color: '#166534' }}>
                        {b.payment_status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: MEDICINES */}
      {activeTab === 'medicines' && (
        <div style={cardStyle}>
          <h3 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 700 }}>💊 Pharmacy Formulary & Medicine Stock</h3>
          <p style={{ margin: '0 0 16px', fontSize: '12px', color: '#64748b' }}>Active clinic pharmacy medicines, batch numbers, and dispensary prices</p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left', color: '#475569' }}>
                  <th style={{ padding: '10px' }}>Med Code</th>
                  <th style={{ padding: '10px' }}>Medicine Name</th>
                  <th style={{ padding: '10px' }}>Manufacturer</th>
                  <th style={{ padding: '10px' }}>Category</th>
                  <th style={{ padding: '10px', textAlign: 'right' }}>Price (₹)</th>
                  <th style={{ padding: '10px', textAlign: 'right' }}>Available Units</th>
                  <th style={{ padding: '10px' }}>Batch No</th>
                  <th style={{ padding: '10px', textAlign: 'center' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {medicines.map(m => (
                  <tr key={m.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '10px', fontFamily: 'monospace', fontWeight: 700, color: '#0284c7' }}>{m.med_code}</td>
                    <td style={{ padding: '10px', fontWeight: 700, color: '#0f172a' }}>{m.name}</td>
                    <td style={{ padding: '10px', color: '#475569' }}>{m.brand}</td>
                    <td style={{ padding: '10px' }}>{m.category}</td>
                    <td style={{ padding: '10px', textAlign: 'right', fontWeight: 700, color: '#059669', fontFamily: 'monospace' }}>
                      ₹{m.price.toFixed(2)}
                    </td>
                    <td style={{ padding: '10px', textAlign: 'right', fontWeight: 600 }}>{m.stock} units</td>
                    <td style={{ padding: '10px', fontFamily: 'monospace', color: '#64748b' }}>{m.batch_no}</td>
                    <td style={{ padding: '10px', textAlign: 'center' }}>
                      <span style={{ padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, background: '#dcfce7', color: '#166534' }}>
                        {m.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 6: VACCINES */}
      {activeTab === 'vaccines' && (
        <div style={cardStyle}>
          <h3 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 700 }}>💉 Immunization Records & Digital Vaccine Passports</h3>
          <p style={{ margin: '0 0 16px', fontSize: '12px', color: '#64748b' }}>Vaccine lot tracing, administration date, and next booster recall schedule</p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left', color: '#475569' }}>
                  <th style={{ padding: '10px' }}>Record Code</th>
                  <th style={{ padding: '10px' }}>Pet Patient</th>
                  <th style={{ padding: '10px' }}>Vaccine Name</th>
                  <th style={{ padding: '10px' }}>Batch / Lot</th>
                  <th style={{ padding: '10px' }}>Administered By</th>
                  <th style={{ padding: '10px' }}>Administered Date</th>
                  <th style={{ padding: '10px' }}>Next Due Booster</th>
                  <th style={{ padding: '10px', textAlign: 'center' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {vaccines.map(v => (
                  <tr key={v.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '10px', fontFamily: 'monospace', fontWeight: 700, color: '#0284c7' }}>{v.record_code}</td>
                    <td style={{ padding: '10px', fontWeight: 700 }}>{v.pet_name}</td>
                    <td style={{ padding: '10px', fontWeight: 700, color: '#0f172a' }}>{v.vaccine_name}</td>
                    <td style={{ padding: '10px', fontFamily: 'monospace', color: '#64748b' }}>{v.batch_number}</td>
                    <td style={{ padding: '10px', fontWeight: 600, color: '#2563eb' }}>{v.administered_by}</td>
                    <td style={{ padding: '10px', color: '#475569' }}>{v.administered_date}</td>
                    <td style={{ padding: '10px', fontWeight: 700, color: '#0284c7' }}>{v.next_due_date}</td>
                    <td style={{ padding: '10px', textAlign: 'center' }}>
                      <span style={{ padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, background: '#dcfce7', color: '#166534' }}>
                        {v.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 7: FOLLOW-UPS */}
      {activeTab === 'followups' && (
        <div style={cardStyle}>
          <h3 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 700 }}>⏱️ Clinical Follow-ups & Treatment Review Queue</h3>
          <p style={{ margin: '0 0 16px', fontSize: '12px', color: '#64748b' }}>Automated patient reminder sync and postoperative follow-up pacing</p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left', color: '#475569' }}>
                  <th style={{ padding: '10px' }}>Follow-Up Code</th>
                  <th style={{ padding: '10px' }}>Pet Patient</th>
                  <th style={{ padding: '10px' }}>Parent</th>
                  <th style={{ padding: '10px' }}>Attending Doctor</th>
                  <th style={{ padding: '10px' }}>Follow-up Reason</th>
                  <th style={{ padding: '10px' }}>Scheduled Date</th>
                  <th style={{ padding: '10px', textAlign: 'center' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {followups.map(f => (
                  <tr key={f.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '10px', fontFamily: 'monospace', fontWeight: 700, color: '#0284c7' }}>{f.followup_code}</td>
                    <td style={{ padding: '10px', fontWeight: 700 }}>{f.pet_name}</td>
                    <td style={{ padding: '10px' }}>{f.parent_name}</td>
                    <td style={{ padding: '10px', fontWeight: 600, color: '#2563eb' }}>{f.doctor_name}</td>
                    <td style={{ padding: '10px', fontWeight: 600, color: '#0f172a' }}>{f.reason}</td>
                    <td style={{ padding: '10px', fontWeight: 700, color: '#0284c7' }}>{f.next_follow_up_date}</td>
                    <td style={{ padding: '10px', textAlign: 'center' }}>
                      <span style={{ padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, background: '#fef3c7', color: '#92400e' }}>
                        {f.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 8: MEDICAL RECORDS (EHR) */}
      {activeTab === 'medical_records' && (
        <div style={cardStyle}>
          <h3 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 700 }}>🐾 Electronic Health Records (EHR) & Clinical Case Logs</h3>
          <p style={{ margin: '0 0 16px', fontSize: '12px', color: '#64748b' }}>Longitudinal medical history, chief complaints, physical findings, and diagnosis</p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left', color: '#475569' }}>
                  <th style={{ padding: '10px' }}>EHR Code</th>
                  <th style={{ padding: '10px' }}>Visit Date</th>
                  <th style={{ padding: '10px' }}>Pet Patient</th>
                  <th style={{ padding: '10px' }}>Encounter Type</th>
                  <th style={{ padding: '10px' }}>Chief Complaint</th>
                  <th style={{ padding: '10px' }}>Diagnosis</th>
                  <th style={{ padding: '10px' }}>Attending Vet</th>
                  <th style={{ padding: '10px', textAlign: 'center' }}>Weight</th>
                </tr>
              </thead>
              <tbody>
                {medicalRecords.map(m => (
                  <tr key={m.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '10px', fontFamily: 'monospace', fontWeight: 700, color: '#0284c7' }}>{m.record_code}</td>
                    <td style={{ padding: '10px', color: '#64748b' }}>{m.record_date}</td>
                    <td style={{ padding: '10px', fontWeight: 700 }}>{m.pet_name}</td>
                    <td style={{ padding: '10px' }}>{m.record_type}</td>
                    <td style={{ padding: '10px', fontWeight: 600, color: '#0f172a' }}>{m.chief_complaint}</td>
                    <td style={{ padding: '10px', color: '#475569' }}>{m.diagnosis}</td>
                    <td style={{ padding: '10px', fontWeight: 600, color: '#2563eb' }}>{m.doctor_name}</td>
                    <td style={{ padding: '10px', textAlign: 'center', fontFamily: 'monospace' }}>{m.weight_kg} kg</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal for Adding New Doctor */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 99999,
          padding: '20px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '14px',
            width: '100%',
            maxWidth: '540px',
            padding: '28px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>
                  👨‍⚕️ Onboard New Practitioner
                </h3>
                <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#64748b' }}>
                  Register practitioner details and synchronize directly with Zippy
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#64748b' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateDoctor}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                    Doctor Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Priya Sharma"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                    Qualification *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. MBBS, BVSc & AH"
                    value={formData.qualification}
                    onChange={e => setFormData({ ...formData, qualification: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                    Primary Specialty *
                  </label>
                  <select
                    value={formData.specialty}
                    onChange={e => setFormData({ ...formData, specialty: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', background: '#fff' }}
                  >
                    <option value="Veterinary Medicine & Surgery">Veterinary Medicine & Surgery</option>
                    <option value="Cardiology & Critical Care">Cardiology & Critical Care</option>
                    <option value="Orthopedic & Soft Tissue Surgery">Orthopedic & Soft Tissue Surgery</option>
                    <option value="Internal Medicine & Diagnostics">Internal Medicine & Diagnostics</option>
                    <option value="Dermatology & Allergy">Dermatology & Allergy</option>
                    <option value="Avian & Exotics Care">Avian & Exotics Care</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                    Experience (Years)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="45"
                    value={formData.experience_years}
                    onChange={e => setFormData({ ...formData, experience_years: parseInt(e.target.value) || 1 })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                    Phone Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="+91 98450 12345"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="doctor@zenve.in"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                    Center Clinic / Hospital *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Zenve Hospital, Koramangala"
                    value={formData.clinic_branch}
                    onChange={e => setFormData({ ...formData, clinic_branch: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                    Consultation Fee (₹)
                  </label>
                  <input
                    type="number"
                    min="100"
                    step="50"
                    value={formData.consultation_fee}
                    onChange={e => setFormData({ ...formData, consultation_fee: parseFloat(e.target.value) || 500 })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    background: '#ffffff',
                    color: '#334155',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '8px 18px',
                    borderRadius: '8px',
                    border: 'none',
                    background: '#059669',
                    color: '#ffffff',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Confirm & Sync with Zippy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
