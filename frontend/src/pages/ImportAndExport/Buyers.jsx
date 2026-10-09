import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function Buyers() {
  const buyers = [];

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Import & Export"
      subcategory="Buyers"
      title="International Buyers & Distribution Partners"
      subtitle="Overseas retail chains, international veterinary hospital groups, luxury boutique distributors, and credit limits"
      icon="🤝"
      badge=""
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Active Global Buyers" value="0 Overseas Accounts" delta="" trend="neutral" subtext="Direct export agreements" icon="🤝" />
        <KpiCard label="Annual Contracted Demand" value="$0 USD" delta="0.0%" trend="neutral" subtext="₹0 INR equivalent" icon="💰" />
        <KpiCard label="Buyer Payment Track Record" value="0.0%" delta="Zero default history" trend="neutral" subtext="Bank LC backed" icon="🛡️" />
        <KpiCard label="Export Territory Expansion" value="0 New Countries" delta="" trend="neutral" subtext="Regulatory clearance underway" icon="🌍" />
      </div>

      <div style={card}>
        <h3 style={{ margin: '0 0 12px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>International Buyer Master Ledger</h3>
        <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Commercial contracts, buyer classification, payment security, and account managers</p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)', color: 'var(--muted-foreground, #64748b)' }}>
                <th style={{ padding: '10px 12px' }}>Buyer ID</th>
                <th style={{ padding: '10px 12px' }}>Organization Name</th>
                <th style={{ padding: '10px 12px' }}>Country / Region</th>
                <th style={{ padding: '10px 12px' }}>Channel Profile</th>
                <th style={{ padding: '10px 12px' }}>Annual Commitment</th>
                <th style={{ padding: '10px 12px' }}>Payment Terms</th>
                <th style={{ padding: '10px 12px' }}>Account Lead</th>
                <th style={{ padding: '10px 12px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {buyers.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ padding: '24px', textAlign: 'center', color: 'var(--muted-foreground, #64748b)' }}>
                    No international buyer records found
                  </td>
                </tr>
              ) : (
                buyers.map(b => (
                  <tr key={b.code} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                    <td style={{ padding: '12px', fontFamily: 'monospace', fontWeight: 600 }}>{b.code}</td>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{b.name}</td>
                    <td style={{ padding: '12px' }}>{b.country}</td>
                    <td style={{ padding: '12px' }}>{b.type}</td>
                    <td style={{ padding: '12px', fontWeight: 600, color: '#059669' }}>{b.contractVal}</td>
                    <td style={{ padding: '12px' }}>{b.paymentTerms}</td>
                    <td style={{ padding: '12px' }}>{b.rep}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ padding: '3px 8px', borderRadius: '999px', fontSize: '10px', fontWeight: 600, background: 'rgba(8,145,178,0.12)', color: '#0e7490' }}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
