import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function ImportOrders() {
  const [filter, setFilter] = useState('ALL');

  const orders = [];

  const filtered = filter === 'ALL' ? orders : orders.filter(o => o.status.toLowerCase().includes(filter.toLowerCase()));

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Import & Export"
      subcategory="Import Orders"
      title="International Purchase Orders (IPO) & LC Pipeline"
      subtitle="Cross-border procurement orders, commercial proforma invoices, forex hedging contracts, and port ETA milestones"
      icon="📑"
      badge="₹0 Inbound Orders"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Open Import POs" value="5 Consignments" delta="€68.5K + $137K" trend="up" subtext="Inbound cross-border" icon="📑" />
        <KpiCard label="Average Lead Time" value="28 Days" delta="-4 days via Air freight" trend="up" subtext="Factory dispatch to hub" icon="⏱️" />
        <KpiCard label="Forex Hedging Coverage" value="0.0%" delta="Forward contracts locked" trend="up" subtext="Protected vs USD/EUR surge" icon="🔒" />
        <KpiCard label="Port Demurrage Incidents" value="0 Days" delta="Direct Port Delivery (DPD)" trend="up" subtext="Zero port detention penalty" icon="⚡" />
      </div>

      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>International Purchase Orders (IPO) Master Stream</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Commercial values, incoterms, forex values, and logistics progress</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['ALL', 'Transit', 'Customs', 'Delivered'].map(s => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                style={{
                  padding: '6px 10px',
                  borderRadius: '6px',
                  border: '1px solid ' + (filter === s ? '#0891b2' : 'var(--border, #cbd5e1)'),
                  background: filter === s ? 'rgba(8,145,178,0.1)' : 'transparent',
                  color: filter === s ? '#0e7490' : 'var(--muted-foreground, #64748b)',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)' }}>
                <th style={{ padding: '10px 12px' }}>IPO #</th>
                <th style={{ padding: '10px 12px' }}>International Supplier</th>
                <th style={{ padding: '10px 12px' }}>Procured Goods</th>
                <th style={{ padding: '10px 12px' }}>Forex & INR Value</th>
                <th style={{ padding: '10px 12px' }}>Incoterms</th>
                <th style={{ padding: '10px 12px' }}>Order Date</th>
                <th style={{ padding: '10px 12px' }}>ETA</th>
                <th style={{ padding: '10px 12px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(o => (
                <tr key={o.po} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                  <td style={{ padding: '12px', fontFamily: 'monospace', fontWeight: 600 }}>{o.po}</td>
                  <td style={{ padding: '12px', fontWeight: 600 }}>{o.supplier}</td>
                  <td style={{ padding: '12px' }}>{o.goods}</td>
                  <td style={{ padding: '12px', fontWeight: 600, color: '#059669' }}>{o.val}</td>
                  <td style={{ padding: '12px' }}>{o.terms}</td>
                  <td style={{ padding: '12px' }}>{o.orderDate}</td>
                  <td style={{ padding: '12px' }}>{o.deliveryEta}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '999px',
                      fontSize: '10px',
                      fontWeight: 600,
                      background: o.status.includes('Delivered') ? 'rgba(16,185,129,0.12)' : o.status.includes('Customs') ? 'rgba(245,158,11,0.14)' : 'rgba(8,145,178,0.12)',
                      color: o.status.includes('Delivered') ? '#059669' : o.status.includes('Customs') ? '#d97706' : '#0e7490'
                    }}>
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
