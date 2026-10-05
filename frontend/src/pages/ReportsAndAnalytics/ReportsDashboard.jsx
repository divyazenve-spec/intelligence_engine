import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

import SalesReport from './SalesReport';
import RevenueReport from './RevenueReport';
import CustomerReport from './CustomerReport';
import PetReport from './PetReport';
import DoctorReport from './DoctorReport';
import ClinicReport from './ClinicReport';
import ProductReport from './ProductReport';
import InventoryReport from './InventoryReport';
import FinanceReport from './FinanceReport';
import HRReport from './HRReport';
import MarketingReport from './MarketingReport';
import OperationsReport from './OperationsReport';
import VendorReport from './VendorReport';
import CustomReports from './CustomReports';
import ScheduledReports from './ScheduledReports';
import ExportCenter from './ExportCenter';

export default function ReportsDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [toast, setToast] = useState('');

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const tabs = [
    { id: 'overview', label: 'Overview Hub', icon: '🎛️' },
    { id: 'sales', label: 'Sales Reports', icon: '📊', badge: 'Live' },
    { id: 'revenue', label: 'Revenue Reports', icon: '💼', badge: '5 BUs' },
    { id: 'customer', label: 'Customer Reports', icon: '👥', badge: '10K Parents' },
    { id: 'pet', label: 'Pet Reports', icon: '🐾', badge: '13.4K Pets' },
    { id: 'doctor', label: 'Doctor Reports', icon: '👨‍⚕️', badge: '18 Vets' },
    { id: 'clinic', label: 'Clinic Reports', icon: '🏥', badge: '5 Nodes' },
    { id: 'product', label: 'Product Reports', icon: '🏷️', badge: '500 SKUs' },
    { id: 'inventory', label: 'Inventory Reports', icon: '📦', badge: '₹16.6Cr' },
    { id: 'finance', label: 'Finance Reports', icon: '💰', badge: 'Audited' },
    { id: 'hr', label: 'HR Reports', icon: '🧑‍💼', badge: '300 Staff' },
    { id: 'marketing', label: 'Marketing Reports', icon: '📣', badge: '4.7x ROAS' },
    { id: 'operations', label: 'Operations Reports', icon: '🚚', badge: '96.2% SLA' },
    { id: 'vendor', label: 'Vendor Reports', icon: '🤝', badge: '18 Suppliers' },
    { id: 'custom', label: 'Custom Reports', icon: '🛠️', badge: 'SQL Pivot' },
    { id: 'scheduled', label: 'Scheduled Reports', icon: '⏰', badge: '6 Active' },
    { id: 'export', label: 'Export Center', icon: '📥', badge: 'Bulk CSV' }
  ];

  const quickPacks = [
    { title: 'Executive Monthly P&L Statement', domain: 'Finance', format: 'Audited PDF + CSV', desc: 'GAAP revenue, COGS, OPEX & EBITDA breakdown' },
    { title: 'Veterinary Doctor Commission Statements', domain: 'Clinical', format: 'CSV Ledger', desc: 'Patient caseload, surgical procedures & incentive payouts' },
    { title: 'Warehouse Batch Valuation & Expiry Audit', domain: 'Supply Chain', format: 'Excel (.xlsx)', desc: 'Near-expiry batches (<60d) and days of inventory cover' },
    { title: 'Omni-Channel Marketing ROAS & CAC', domain: 'Marketing', format: 'CSV Export', desc: 'Multi-touch attribution, ad spend & conversion CAC' }
  ];

  const handleInstantDownload = (title) => {
    const csvContent = 'data:text/csv;charset=utf-8,Report,Timestamp,Status\n"' + title + '",' + new Date().toISOString() + ',APPROVED_DISPATCH';
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `zenve_${title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast(`Downloaded ${title}.`);
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Top Tab Switcher */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 20,
        background: 'var(--background, #0f172a)',
        borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        overflowX: 'auto',
        whiteSpace: 'nowrap',
        scrollbarWidth: 'none'
      }}>
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{
              padding: '7px 14px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              border: activeTab === t.id ? '1px solid var(--primary, #3b82f6)' : '1px solid var(--border, rgba(255,255,255,0.08))',
              background: activeTab === t.id ? 'var(--primary, #3b82f6)' : 'var(--card, #1e293b)',
              color: activeTab === t.id ? '#ffffff' : 'var(--muted-foreground, #94a3b8)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.15s ease'
            }}
          >
            <span>{t.icon}</span>
            <span>{t.label}</span>
            {t.badge && (
              <span style={{
                fontSize: '10px',
                padding: '1px 6px',
                borderRadius: '99px',
                background: activeTab === t.id ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.08)',
                color: activeTab === t.id ? '#ffffff' : 'var(--foreground, #f8fafc)'
              }}>
                {t.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {toast && (
        <div style={{
          margin: '16px 24px 0',
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

      {/* Render Component Based on Active Tab */}
      {activeTab === 'sales' && <SalesReport />}
      {activeTab === 'revenue' && <RevenueReport />}
      {activeTab === 'customer' && <CustomerReport />}
      {activeTab === 'pet' && <PetReport />}
      {activeTab === 'doctor' && <DoctorReport />}
      {activeTab === 'clinic' && <ClinicReport />}
      {activeTab === 'product' && <ProductReport />}
      {activeTab === 'inventory' && <InventoryReport />}
      {activeTab === 'finance' && <FinanceReport />}
      {activeTab === 'hr' && <HRReport />}
      {activeTab === 'marketing' && <MarketingReport />}
      {activeTab === 'operations' && <OperationsReport />}
      {activeTab === 'vendor' && <VendorReport />}
      {activeTab === 'custom' && <CustomReports />}
      {activeTab === 'scheduled' && <ScheduledReports />}
      {activeTab === 'export' && <ExportCenter />}

      {activeTab === 'overview' && (
        <DashboardLayout
          category="Reports & Analytics"
          subcategory="Executive Overview"
          title="Reports & Analytics Command Center"
          subtitle="Unified intelligence suite aggregating audited financial packs, sales ledgers, customer LTV, clinical registries, and automated exports"
          icon="📑"
          badge="16 Domain Reports Ready"
          actions={
            <button
              onClick={() => setActiveTab('export')}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                background: 'var(--primary, #3b82f6)',
                color: '#ffffff',
                border: 'none',
                fontWeight: 600,
                fontSize: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>📥</span> Open Export Center
            </button>
          }
        >
          {/* Executive KPI Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
            <KpiCard label="Reporting Modules Available" value="16 Modules" delta="100% Operational" trend="up" subtext="Finance, Sales, Clinical" icon="📊" />
            <KpiCard label="Scheduled Automated Jobs" value="6 Active Cron" delta="Daily, Weekly, Monthly" trend="neutral" subtext="Zero bounce rate" icon="⏰" />
            <KpiCard label="Total Exports Generated" value="482 Files" delta="+44 files this month" trend="up" subtext="CSV, PDF, XLSX" icon="📥" />
            <KpiCard label="Data Pipeline Synchronization" value="FastAPI Live" delta="42ms query speed" trend="up" subtext="SQLite persistence" icon="⚡" />
          </div>

          {/* Grid of All 16 Modules */}
          <div style={{
            background: 'var(--card, #1e293b)',
            border: '1px solid var(--border, rgba(255,255,255,0.08))',
            borderRadius: '12px',
            padding: '20px'
          }}>
            <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>
              All 16 Intelligence Reporting Modules & Sub-Dashboards
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
              {[
                { title: 'Sales Reports', icon: '📊', desc: 'Gross sales, net GMV, AOV & channel split', tab: 'sales' },
                { title: 'Revenue Reports', icon: '💼', desc: 'BU margins, recurring ARR & YoY growth', tab: 'revenue' },
                { title: 'Customer Reports', icon: '👥', desc: 'Cohorts, LTV, repeat rates & churn', tab: 'customer' },
                { title: 'Pet Reports', icon: '🐾', desc: 'Species, breed epidemiology & vaccines', tab: 'pet' },
                { title: 'Doctor Reports', icon: '👨‍⚕️', desc: 'Consultations, surgeries & commissions', tab: 'doctor' },
                { title: 'Clinic Reports', icon: '🏥', desc: 'Hospital bed occupancy & OPD footfall', tab: 'clinic' },
                { title: 'Product Reports', icon: '🏷️', desc: 'Top SKUs, ABC matrix & returns rate', tab: 'product' },
                { title: 'Inventory Reports', icon: '📦', desc: 'Warehouse valuation & expiry schedule', tab: 'inventory' },
                { title: 'Finance Reports', icon: '💰', desc: 'Audited P&L, EBITDA & balance sheet', tab: 'finance' },
                { title: 'HR Reports', icon: '🧑‍💼', desc: 'Workforce headcount, attendance & payroll', tab: 'hr' },
                { title: 'Marketing Reports', icon: '📣', desc: 'Campaign ROAS, blended CAC & funnel', tab: 'marketing' },
                { title: 'Operations Reports', icon: '🚚', desc: '60-min express SLAs & rider logistics', tab: 'operations' },
                { title: 'Vendor Reports', icon: '🤝', desc: 'Supplier fill rate & volume discounts', tab: 'vendor' },
                { title: 'Custom Reports', icon: '🛠️', desc: 'Dynamic multidimensional pivot engine', tab: 'custom' },
                { title: 'Scheduled Reports', icon: '⏰', desc: 'Automated email & Slack cron jobs', tab: 'scheduled' },
                { title: 'Export Center', icon: '📥', desc: 'High-throughput raw dataset downloads', tab: 'export' }
              ].map(m => (
                <div
                  key={m.title}
                  onClick={() => setActiveTab(m.tab)}
                  style={{
                    padding: '14px',
                    borderRadius: '8px',
                    background: 'rgba(0,0,0,0.18)',
                    border: '1px solid var(--border, rgba(255,255,255,0.06))',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '18px' }}>{m.icon}</span>
                    <span style={{ fontSize: '13px', fontWeight: 700 }}>{m.title}</span>
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)', lineHeight: 1.4 }}>{m.desc}</div>
                  <div style={{ fontSize: '11px', color: '#38bdf8', marginTop: 'auto', fontWeight: 600 }}>Launch Module →</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Download Hub */}
          <div style={{
            background: 'var(--card, #1e293b)',
            border: '1px solid var(--border, rgba(255,255,255,0.08))',
            borderRadius: '12px',
            padding: '20px'
          }}>
            <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>
              Quick One-Click Intelligence Downloads
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
              {quickPacks.map((q) => (
                <div
                  key={q.title}
                  style={{
                    padding: '14px',
                    borderRadius: '8px',
                    background: 'rgba(0,0,0,0.15)',
                    border: '1px solid var(--border, rgba(255,255,255,0.06))',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '10px'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '11px', padding: '2px 6px', borderRadius: '4px', background: 'rgba(59,130,246,0.15)', color: '#60a5fa', fontWeight: 600 }}>
                        {q.domain}
                      </span>
                      <span style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)' }}>{q.format}</span>
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '13px', marginTop: '6px' }}>{q.title}</div>
                    <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)', marginTop: '2px' }}>{q.desc}</div>
                  </div>

                  <button
                    onClick={() => handleInstantDownload(q.title)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '6px',
                      background: 'var(--primary, #3b82f6)',
                      color: '#ffffff',
                      border: 'none',
                      fontSize: '11px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px'
                    }}
                  >
                    <span>📥</span> Instant Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        </DashboardLayout>
      )}
    </div>
  );
}
