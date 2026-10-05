import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function Buyers() {
  const buyers = [
    { code: 'BYR-INT-01', name: 'Royal Pets Veterinary Hospital LLC', country: 'United Arab Emirates (Dubai)', type: 'Hospital & Luxury Clinic Chain', contractVal: '$180,000 / yr', paymentTerms: 'Sight LC (Confirmed)', rep: 'Vikram Mehta', status: 'Active (VIP)' },
    { code: 'BYR-INT-02', name: 'PetLovers Centre APAC Pte Ltd', country: 'Singapore & Malaysia', type: 'Regional Retail Superstore', contractVal: '$340,000 / yr', paymentTerms: 'TT Wire (30D)', rep: 'Vikram Mehta', status: 'Active (Strategic)' },
    { code: 'BYR-INT-03', name: 'Mayfair Canine Atelier Ltd', country: 'United Kingdom (London)', type: 'Bespoke Haute Couture Boutique', contractVal: '£120,000 / yr', paymentTerms: 'Card & Advance Wire', rep: 'Sneha Rao', status: 'Active (Haute)' },
    { code: 'BYR-INT-04', name: 'Arabian Falcon & Pet Healthcare Co', country: 'Saudi Arabia (Riyadh)', type: 'Veterinary Specialty Distributor', contractVal: '$220,000 / yr', paymentTerms: 'LC 60 Days', rep: 'Vikram Mehta', status: 'Active (VIP)' }
  ];

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Import & Export"
      subcategory="Buyers"
      title="International Buyers & Distribution Partners"
      subtitle="Overseas retail chains, international veterinary hospital groups, luxury boutique distributors, and credit limits"
      icon="🤝"
      badge="8 Global Buyers"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Active Global Buyers" value="8 Overseas Accounts" delta="Across 7 countries" trend="up" subtext="Direct export agreements" icon="🤝" />
        <KpiCard label="Annual Contracted Demand" value="$860,000 USD" delta="+38.4% YoY" trend="up" subtext="₹7.18 Cr INR equivalent" icon="💰" />
        <KpiCard label="Buyer Payment Track Record" value="100% On-Time" delta="Zero default history" trend="up" subtext="Bank LC backed" icon="🛡️" />
        <KpiCard label="Export Territory Expansion" value="3 New Countries" delta="Japan, Germany, Qatar" trend="up" subtext="Regulatory clearance underway" icon="🌍" />
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
              {buyers.map(b => (
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
