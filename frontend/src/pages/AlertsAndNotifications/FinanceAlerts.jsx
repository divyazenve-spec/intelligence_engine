import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function FinanceAlerts() {
  const [alerts, setAlerts] = useState([
    {
      id: 'FIN-701',
      title: 'EBITDA Margin Compression Alert: October MTD at 14.6%',
      category: 'Profitability & Margin',
      metric: '14.6% vs Target 18.0% (-3.4% deficit)',
      impact: 'Operating profit compressed by ₹1,76,000 MTD',
      rootCause: 'Surge in digital ad spend (+22%) and 3PL spillover delivery charges',
      severity: 'Critical',
      time: '1h ago',
      status: 'Active'
    },
    {
      id: 'FIN-702',
      title: 'Unallocated Bank Inflow: ₹4,85,000 in HDFC Main Corporate Account',
      category: 'Cash & Banking Reconciliation',
      metric: '₹4,85,000 without matching Customer/Partner Invoice ID',
      impact: 'Bank reconciliation suspended; cannot close weekly cash ledger',
      rootCause: 'B2B institutional client deposited RTGS without referencing PO number',
      severity: 'High Warning',
      time: '3h ago',
      status: 'Action Required'
    },
    {
      id: 'FIN-703',
      title: 'Vendor Payables Aging > 45 Days: Royal Canin India Pvt Ltd',
      category: 'Accounts Payable',
      metric: '₹6,80,000 due in 24 hours (PO #PO-2024-0312)',
      impact: 'Risk of vendor credit hold on critical dog food deliveries',
      rootCause: 'Pending GRN quantity verification by Bhiwandi receiving manager',
      severity: 'High Warning',
      time: '5h ago',
      status: 'Awaiting GRN Match'
    },
    {
      id: 'FIN-704',
      title: 'GST GSTR-3B Tax Filing Deadline: 3 Days Remaining',
      category: 'Statutory Compliance',
      metric: 'Input Tax Credit (ITC) reconciliation at 88%',
      impact: 'Late fee & interest penalty risk across Karnataka & Maharashtra GSTINs',
      rootCause: '14 pharmaceutical supplier invoices missing on GST portal 2B statement',
      severity: 'Warning',
      time: '6h ago',
      status: 'Under Reconciliation'
    },
    {
      id: 'FIN-705',
      title: 'Clinic Consumables OPEX Surge: Koramangala ICU (+18% Budget)',
      category: 'Departmental Budgeting',
      metric: 'Surgical suture & anesthesia consumption exceeded allocation',
      impact: '₹64,000 above approved October monthly OPEX cap',
      rootCause: 'Increased emergency orthopedic surgery volume over the weekend',
      severity: 'Info',
      time: '9h ago',
      status: 'Approved Variance'
    }
  ]);

  const [toast, setToast] = useState('');

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleAction = (id, act) => {
    triggerToast(`Action "${act}" executed for ${id}.`);
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'Resolved' } : a));
  };

  return (
    <DashboardLayout
      category="Alerts & Notifications"
      subcategory="Finance Alerts"
      title="Financial Health & Statutory Compliance Alerts"
      subtitle="Early warnings for EBITDA margin erosion, unallocated bank deposits, vendor payables aging, and GST tax filing deadlines"
      icon="💰"
      badge="₹11.65L Impact"
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => triggerToast('Automated AI Bank reconciliation matched ₹4.85L to PetCare Clinic network PO.')}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              background: 'var(--primary, #3b82f6)',
              color: '#ffffff',
              border: 'none',
              fontWeight: 600,
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            🔄 Run AI Reconciliation
          </button>
          <button
            onClick={() => triggerToast('Scheduled vendor NEFT batch for Royal Canin invoice.')}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              background: 'var(--card, #1e293b)',
              color: 'var(--foreground, #f8fafc)',
              border: '1px solid var(--border, rgba(255,255,255,0.1))',
              fontWeight: 600,
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            💳 Schedule Vendor Payables
          </button>
        </div>
      }
    >
      {toast && (
        <div style={{
          padding: '10px 16px',
          background: 'rgba(59,130,246,0.15)',
          border: '1px solid #3b82f6',
          borderRadius: '8px',
          color: '#60a5fa',
          fontSize: '13px',
          fontWeight: 600
        }}>
          ⚡ {toast}
        </div>
      )}

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard
          label="October EBITDA Margin"
          value="14.6%"
          delta="-3.4% vs Target"
          trend="down"
          subtext="Budget: 18.0%"
          icon="📉"
        />
        <KpiCard
          label="Unallocated Bank Inflow"
          value="₹4,85,000"
          delta="1 RTGS Deposit"
          trend="down"
          subtext="HDFC Corporate AC"
          icon="🏦"
        />
        <KpiCard
          label="Vendor Payables Due (<24h)"
          value="₹6,80,000"
          delta="Royal Canin PO"
          trend="down"
          subtext="Pending GRN sign-off"
          icon="🧾"
        />
        <KpiCard
          label="Days to GST GSTR-3B"
          value="3 Days"
          delta="88% ITC matched"
          trend="neutral"
          subtext="Oct 20 deadline"
          icon="📅"
        />
      </div>

      {/* Main Alerts Table */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>
          Corporate Financial Alerts & Tax Compliance Deadlines
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {alerts.map((a) => (
            <div
              key={a.id}
              style={{
                padding: '16px',
                borderRadius: '8px',
                background: a.status === 'Resolved' ? 'rgba(16,185,129,0.05)' : 'rgba(0,0,0,0.15)',
                borderLeft: a.severity === 'Critical' ? '4px solid #ef4444' : a.severity === 'High Warning' ? '4px solid #f97316' : a.severity === 'Warning' ? '4px solid #f59e0b' : '4px solid #3b82f6',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      fontFamily: '"IBM Plex Mono", monospace',
                      fontSize: '11px',
                      fontWeight: 700,
                      background: 'rgba(255,255,255,0.06)',
                      padding: '2px 6px',
                      borderRadius: '4px'
                    }}>
                      {a.id}
                    </span>
                    <span style={{ fontSize: '14px', fontWeight: 700 }}>{a.title}</span>
                    <span style={{
                      fontSize: '10px',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      background: a.severity === 'Critical' ? 'rgba(239,68,68,0.2)' : a.severity === 'High Warning' ? 'rgba(249,115,22,0.2)' : 'rgba(245,158,11,0.2)',
                      color: a.severity === 'Critical' ? '#ef4444' : '#f59e0b',
                      fontWeight: 600
                    }}>
                      {a.severity}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)', marginTop: '4px' }}>
                    Category: <strong style={{ color: 'var(--foreground, #f8fafc)' }}>{a.category}</strong> · Root Cause: <span>{a.rootCause}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#fbbf24' }}>{a.metric}</div>
                  <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)', marginTop: '2px' }}>
                    Status: <strong style={{ color: a.status === 'Resolved' ? '#10b981' : '#38bdf8' }}>{a.status}</strong>
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>
                <strong>Impact:</strong> {a.impact}
              </div>

              {a.status !== 'Resolved' && (
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', paddingTop: '4px' }}>
                  {a.id === 'FIN-702' && (
                    <button
                      onClick={() => handleAction(a.id, 'Mapped ₹4.85L to PetCare Clinic Account #CLI-102')}
                      style={{ padding: '6px 14px', borderRadius: '6px', background: 'var(--primary, #3b82f6)', color: '#fff', border: 'none', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Assign Deposit to Invoice
                    </button>
                  )}
                  {a.id === 'FIN-703' && (
                    <button
                      onClick={() => handleAction(a.id, 'GRN auto-validated against warehouse RFID scan')}
                      style={{ padding: '6px 14px', borderRadius: '6px', background: '#10b981', color: '#fff', border: 'none', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Approve GRN & Release NEFT
                    </button>
                  )}
                  <button
                    onClick={() => handleAction(a.id, 'Acknowledged & Logged to Finance Team')}
                    style={{ padding: '6px 12px', borderRadius: '6px', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border, rgba(255,255,255,0.1))', color: 'var(--foreground, #f8fafc)', fontSize: '11px', cursor: 'pointer' }}
                  >
                    Acknowledge
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
