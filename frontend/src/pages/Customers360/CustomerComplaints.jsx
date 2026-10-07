import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

const INITIAL_TICKETS = [];

export default function CustomerComplaints() {
  const [tickets, setTickets] = useState(INITIAL_TICKETS);
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newTicket, setNewTicket] = useState({
    customer: '',
    pet: '',
    category: 'Delivery Delay',
    priority: 'Medium',
    issue: '',
    rep: 'Kiran R. (Escalations)',
    remedy: 'Instant replacement + ₹0 credit'
  });

  const cardStyle = {
    background: 'var(--card, #ffffff)',
    border: '1px solid var(--border, rgba(0,0,0,0.08))',
    borderRadius: '12px',
    padding: '22px 24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
  };

  const filteredTickets = tickets.filter(t => {
    const matchesFilter =
      filter === 'ALL' ? true :
      filter === 'OPEN' ? t.status !== 'Closed' :
      filter === 'CLOSED' ? t.status === 'Closed' :
      t.category.toLowerCase().includes(filter.toLowerCase());

    const q = search.toLowerCase();
    const matchesSearch = !q ||
      t.id.toLowerCase().includes(q) ||
      t.customer.toLowerCase().includes(q) ||
      t.pet.toLowerCase().includes(q) ||
      t.issue.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q);

    return matchesFilter && matchesSearch;
  });

  const handleResolve = (id) => {
    const ticket = tickets.find(t => t.id === id);
    if (!ticket) return;
    const remedy = window.prompt(`Enter resolution outcome & compensation for ${ticket.id} (${ticket.customer}):`, 'Full fee waiver + ₹0 credit provided');
    if (remedy) {
      setTickets(prev => prev.map(t => t.id === id ? {
        ...t,
        status: 'Closed',
        remedy: remedy,
        sla: 'Resolved just now',
        csat: '5.0 ⭐'
      } : t));
      alert(`Ticket ${id} marked as Closed & Resolved! Pet parent notified via SMS/WhatsApp.`);
    }
  };

  const handleAddTicket = (e) => {
    e.preventDefault();
    const id = `TICK-${4400 + tickets.length + 1}`;
    const created = {
      id,
      customer: newTicket.customer,
      pet: newTicket.pet,
      category: newTicket.category,
      priority: newTicket.priority,
      issue: newTicket.issue,
      rep: newTicket.rep,
      sla: 'Active (Now)',
      remedy: newTicket.remedy,
      csat: 'Pending',
      status: 'Investigating'
    };
    setTickets([created, ...tickets]);
    setShowModal(false);
    setNewTicket({
      customer: '',
      pet: '',
      category: 'Delivery Delay',
      priority: 'Medium',
      issue: '',
      rep: 'Kiran R. (Escalations)',
      remedy: 'Instant replacement + ₹0 credit'
    });
    alert(`Complaint ${id} registered! Priority alert dispatched.`);
  };

  return (
    <DashboardLayout
      category="Customers 360°"
      subcategory="Customer Service & Resolution"
      title="Customer Complaints & Grievance Resolution"
      subtitle="Executive grievance telemetry, root-cause categorization, SLA turnaround countdowns, and automated pet parent compensation SOPs"
      icon="⚠️"
      badge=""
    >
      {/* 6 Executive KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Grievances (MTD)" value={`${tickets.length} Tickets`} delta="-24% MoM" trend="up" subtext="Only 0.06% of total orders" icon="⚠️" />
        <KpiCard label="First Contact Resolution" value="0.0%" delta="+3.1% MoM" trend="up" subtext="Resolved in initial interaction" icon="⚡" />
        <KpiCard label="Avg. SLA Resolution Time" value="0" delta="-4.2 mins vs SLA" trend="up" subtext="Target SLA < 25 mins" icon="⏱️" />
        <KpiCard label="Post-Resolution CSAT" value="4.88 / 5.0" delta="+0.14 vs Q2" trend="up" subtext="98.2% customer delight" icon="⭐" />
        <KpiCard label="Cold-Chain / Rx SLA" value="0.0%" delta="Zero breaches" trend="up" subtext="Insulin & emergency Rx" icon="❄️" />
        <KpiCard label="Sentiment Recovery" value="0.0%" delta="+4.8% YoY" trend="up" subtext="Retained pet parent accounts" icon="❤️" />
      </div>

      {/* 2-Column Root Cause and SOP Remedy Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '16px' }}>
        {/* Root Cause Distribution */}
        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: 'var(--foreground, #0f172a)' }}>📊 Grievance Category & Root-Cause Distribution</h3>
            <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '12px', background: '#ecfdf5', color: '#059669' }}>Real-Time Telemetry</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                <span>🚚 Dark Store & Delivery Delay (Rain / Gate Access)</span>
                <span style={{ fontWeight: 700 }}>42% (8 cases)</span>
              </div>
              <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '42%', height: '100%', background: '#f59e0b', borderRadius: '4px' }} />
              </div>
              <div style={{ fontSize: '11px', color: '#64748b', marginTop: '3px' }}>Avg. resolution: 12.4 mins · Automatic ₹0 compensation applied</div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                <span>📦 Product Packaging & Outer Bag Tears</span>
                <span style={{ fontWeight: 700 }}>24% (4 cases)</span>
              </div>
              <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '24%', height: '100%', background: '#3b82f6', borderRadius: '4px' }} />
              </div>
              <div style={{ fontSize: '11px', color: '#64748b', marginTop: '3px' }}>Avg. resolution: 17.5 mins · Instant dark store replacement dispatched</div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                <span>🏥 Clinic OPD Scheduling & Doctor Reschedules</span>
                <span style={{ fontWeight: 700 }}>16% (3 cases)</span>
              </div>
              <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '16%', height: '100%', background: '#8b5cf6', borderRadius: '4px' }} />
              </div>
              <div style={{ fontSize: '11px', color: '#64748b', marginTop: '3px' }}>Avg. resolution: 19.8 mins · Priority evening slot booking confirmed</div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                <span>💳 Loyalty Club Points & Billing Sync</span>
                <span style={{ fontWeight: 700 }}>12% (2 cases)</span>
              </div>
              <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '12%', height: '100%', background: '#10b981', borderRadius: '4px' }} />
              </div>
              <div style={{ fontSize: '11px', color: '#64748b', marginTop: '3px' }}>Avg. resolution: 5.2 mins · Instant ledger balance re-index</div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                <span>❄️ Cold-Chain Pharmacy & Medicine Temperature</span>
                <span style={{ fontWeight: 700 }}>6% (1 case)</span>
              </div>
              <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '6%', height: '100%', background: '#ef4444', borderRadius: '4px' }} />
              </div>
              <div style={{ fontSize: '11px', color: '#64748b', marginTop: '3px' }}>Avg. resolution: 8.0 mins · Zero tolerance protocol: replaced immediately</div>
            </div>
          </div>
        </div>

        {/* SOP Remedies Matrix */}
        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: 'var(--foreground, #0f172a)' }}>📋 SOP Remedies & Resolution Matrix</h3>
            <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '12px', background: '#fef2f2', color: '#ef4444' }}>Strict Tier-1 Protocol</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#f59e0b' }}>🚚 Delivery Delay > 20 Mins</span>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#2563eb' }}>Full Waiver + ₹0</span>
              <p style={{ margin: 0, fontSize: '11px', color: '#64748b', lineHeight: 1.4 }}>Auto-triggered if rider GPS exceeds 70 mins. Team lead provides live ETA.</p>
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#ef4444' }}>❄️ Cold-Chain > 8°C Deviation</span>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#2563eb' }}>Instant Swap + Vet Sign-off</span>
              <p style={{ margin: 0, fontSize: '11px', color: '#64748b', lineHeight: 1.4 }}>Vaccines & insulins replaced free of cost from nearest fridge hub in 25 mins.</p>
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#3b82f6' }}>📦 Damaged Kibble Seal</span>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#2563eb' }}>100% Free Swap + Treat Pouch</span>
              <p style={{ margin: 0, fontSize: '11px', color: '#64748b', lineHeight: 1.4 }}>No return pickup needed. Fresh sealed pack dispatched with complimentary treat.</p>
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#8b5cf6' }}>🏥 Clinic Reschedule by Hospital</span>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#2563eb' }}>VIP Priority Slot + Free Checkup</span>
              <p style={{ margin: 0, fontSize: '11px', color: '#64748b', lineHeight: 1.4 }}>If surgery delays vet, parent receives guaranteed priority queue + free nails trim.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Grievance Register Table with Search, Filter & Actions */}
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 800, color: 'var(--foreground, #0f172a)' }}>⚠️ Live Customer Support & Grievance Register</h3>
            <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>Active customer complaints, priority triage, SLA countdowns, and resolution logging</p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search ticket, parent, pet, or issue..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                padding: '7px 12px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '12px',
                width: '240px',
                outline: 'none'
              }}
            />

            <div style={{ display: 'flex', gap: '4px', background: '#f1f5f9', padding: '3px', borderRadius: '8px' }}>
              {['ALL', 'Delivery', 'Packaging', 'Billing', 'Clinic', 'Pharmacy', 'OPEN'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '6px',
                    border: 'none',
                    fontSize: '11px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    background: filter === f ? '#ffffff' : 'transparent',
                    color: filter === f ? '#1d4ed8' : '#64748b',
                    boxShadow: filter === f ? '0 1px 2px rgba(0,0,0,0.06)' : 'none'
                  }}
                >
                  {f}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowModal(true)}
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                border: 'none',
                background: '#2563eb',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              + Log New Grievance
            </button>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border, #e2e8f0)', textAlign: 'left', color: 'var(--muted-foreground, #475569)' }}>
                <th style={{ padding: '10px' }}>Ticket ID</th>
                <th style={{ padding: '10px' }}>Pet Parent & Pet</th>
                <th style={{ padding: '10px' }}>Category</th>
                <th style={{ padding: '10px' }}>Priority</th>
                <th style={{ padding: '10px', minWidth: '220px' }}>Grievance Description</th>
                <th style={{ padding: '10px' }}>Care Lead</th>
                <th style={{ padding: '10px' }}>SLA Turnaround</th>
                <th style={{ padding: '10px' }}>Outcome / Remedy</th>
                <th style={{ padding: '10px' }}>CSAT</th>
                <th style={{ padding: '10px' }}>Status</th>
                <th style={{ padding: '10px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.length === 0 ? (
                <tr>
                  <td colSpan="11" style={{ textAlign: 'center', padding: '24px', color: '#64748b' }}>
                    No complaints match current filter or search criteria.
                  </td>
                </tr>
              ) : (
                filteredTickets.map((t) => (
                  <tr key={t.id} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                    <td style={{ padding: '10px', fontFamily: 'monospace', fontWeight: 700, color: '#2563eb' }}>{t.id}</td>
                    <td style={{ padding: '10px' }}>
                      <div style={{ fontWeight: 700 }}>{t.customer}</div>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>🐾 {t.pet}</div>
                    </td>
                    <td style={{ padding: '10px' }}>
                      <span style={{ padding: '2px 8px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '4px', fontWeight: 600, fontSize: '11px' }}>
                        {t.category}
                      </span>
                    </td>
                    <td style={{ padding: '10px' }}>
                      <span style={{
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontWeight: 700,
                        fontSize: '11px',
                        background: t.priority === 'Critical' ? '#fee2e2' : t.priority === 'High' ? '#fef3c7' : '#f0fdf4',
                        color: t.priority === 'Critical' ? '#b91c1c' : t.priority === 'High' ? '#b45309' : '#15803d'
                      }}>
                        {t.priority}
                      </span>
                    </td>
                    <td style={{ padding: '10px', color: '#334155', fontWeight: 500, lineHeight: 1.4 }}>{t.issue}</td>
                    <td style={{ padding: '10px', color: '#64748b', fontWeight: 600 }}>{t.rep}</td>
                    <td style={{ padding: '10px', fontWeight: 700 }}>{t.sla}</td>
                    <td style={{ padding: '10px', color: '#059669', fontWeight: 600 }}>{t.remedy}</td>
                    <td style={{ padding: '10px', fontWeight: 700, color: '#eab308' }}>{t.csat}</td>
                    <td style={{ padding: '10px' }}>
                      <span style={{
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: 700,
                        background: t.status === 'Closed' ? '#f0fdf4' : '#fee2e2',
                        color: t.status === 'Closed' ? '#16a34a' : '#dc2626'
                      }}>
                        {t.status}
                      </span>
                    </td>
                    <td style={{ padding: '10px' }}>
                      {t.status === 'Closed' ? (
                        <button
                          onClick={() => alert(`Ticket ${t.id} is resolved.\nOutcome: ${t.remedy}`)}
                          style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #cbd5e1', background: '#ffffff', fontSize: '11px', cursor: 'pointer' }}
                        >
                          View Details
                        </button>
                      ) : (
                        <button
                          onClick={() => handleResolve(t.id)}
                          style={{ padding: '4px 8px', borderRadius: '4px', border: 'none', background: '#2563eb', color: '#ffffff', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}
                        >
                          Resolve Ticket
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Dialog for Logging New Grievance */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)',
          zIndex: 100000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '14px',
            border: '1px solid #cbd5e1',
            padding: '24px',
            maxWidth: '540px',
            width: '100%',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 800, color: '#0f172a' }}>⚠️ Log Customer Grievance</h3>
              <button
                onClick={() => setShowModal(false)}
                style={{ background: 'transparent', border: 'none', fontSize: '16px', cursor: 'pointer', color: '#64748b' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddTicket}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Pet Parent Name</label>
                  <input
                    type="text"
                    required
                    value={newTicket.customer}
                    onChange={(e) => setNewTicket({ ...newTicket, customer: e.target.value })}
                    placeholder="e.g. Roshni Kapoor"
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Pet Name & Breed</label>
                  <input
                    type="text"
                    required
                    value={newTicket.pet}
                    onChange={(e) => setNewTicket({ ...newTicket, pet: e.target.value })}
                    placeholder="e.g. Bella (Beagle)"
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Complaint Category</label>
                  <select
                    value={newTicket.category}
                    onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                  >
                    <option value="Delivery Delay">Delivery Delay (Dark Store)</option>
                    <option value="Product Packaging">Product Packaging / Damaged Seal</option>
                    <option value="Cold-Chain Pharmacy">Cold-Chain Pharmacy (Temperature)</option>
                    <option value="Clinic Reschedule">Clinic OPD Reschedule</option>
                    <option value="Billing Query">Billing & Loyalty Coins</option>
                    <option value="Grooming Service">Grooming Service Issue</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Priority Level</label>
                  <select
                    value={newTicket.priority}
                    onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                  >
                    <option value="Critical">Critical (Immediate Triage)</option>
                    <option value="High">High (Within 15 mins)</option>
                    <option value="Medium">Medium (Standard)</option>
                    <option value="Low">Low (Informational)</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Grievance Description</label>
                <textarea
                  required
                  rows={3}
                  value={newTicket.issue}
                  onChange={(e) => setNewTicket({ ...newTicket, issue: e.target.value })}
                  placeholder="Describe customer issue, order ID, and pet parent feedback..."
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Assigned Care Specialist</label>
                  <input
                    type="text"
                    required
                    value={newTicket.rep}
                    onChange={(e) => setNewTicket({ ...newTicket, rep: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Initial Remedy Offer</label>
                  <input
                    type="text"
                    required
                    value={newTicket.remedy}
                    onChange={(e) => setNewTicket({ ...newTicket, remedy: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{ padding: '8px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#ffffff', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: '#2563eb', color: '#ffffff', cursor: 'pointer', fontSize: '12px', fontWeight: 700 }}
                >
                  Log & Initiate SLA Timer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
