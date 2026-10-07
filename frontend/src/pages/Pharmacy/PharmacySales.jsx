import React, { useState, useMemo } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function PharmacySales() {
  const [period, setPeriod] = useState('30D');
  const [channelFilter, setChannelFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const salesData = [];

  const filtered = useMemo(() => {
    return salesData.filter(item => {
      const matchChannel = channelFilter === 'ALL' || item.channel === channelFilter;
      const matchSearch = search === '' ||
        item.customer.toLowerCase().includes(search.toLowerCase()) ||
        item.pet.toLowerCase().includes(search.toLowerCase()) ||
        item.items.toLowerCase().includes(search.toLowerCase()) ||
        item.id.toLowerCase().includes(search.toLowerCase());
      return matchChannel && matchSearch;
    });
  }, [channelFilter, search]);

  const topSellingMeds = [];

  return (
    <DashboardLayout
      category="Pharmacy"
      subcategory="Pharmacy Sales"
      title="Veterinary Pharmacy Sales & Dispensary"
      subtitle="Comprehensive sales velocity, counter billing, OTC vs Rx split, and doctor referral margins"
      icon="💰"
      badge="₹0 MTD"
      actions={
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div style={{
            display: 'flex',
            background: 'rgba(255,255,255,0.05)',
            padding: '3px',
            borderRadius: '8px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            {['Today', '7D', '30D', 'Q3 MTD'].map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: period === p ? '#3b82f6' : 'transparent',
                  color: period === p ? '#fff' : '#94a3b8'
                }}
              >
                {p}
              </button>
            ))}
          </div>
          <button
            onClick={() => alert('Generating Pharmacy Sales Ledger PDF & Excel CSV with GST breakdown...')}
            style={{
              padding: '7px 14px',
              borderRadius: '8px',
              background: 'rgba(255,255,255,0.08)',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.15)',
              fontWeight: 600,
              fontSize: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>📥</span> Export Sales Report
          </button>
        </div>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Gross Pharmacy Sales" value="₹0" delta="0.0%" trend="up" subtext="MTD billing volume" icon="💵" />
        <KpiCard label="Rx Prescription Sales" value="₹0" delta="0.0% share" trend="neutral" subtext="Doctor validated" icon="📋" />
        <KpiCard label="OTC Pet Care Sales" value="₹0" delta="0.0% share" trend="neutral" subtext="Direct dispensary" icon="🛍️" />
        <KpiCard label="Avg Dispensary Bill" value="₹0" delta="+₹0" trend="up" subtext="2.6 products / order" icon="🧾" />
        <KpiCard label="Units Dispensed" value="0 Units" delta="0.0%" trend="neutral" subtext="Across 1,840 orders" icon="📦" />
        <KpiCard label="Repeat Rx Refills" value="0.0%" delta="0.0%" trend="up" subtext="Chronic & deworming" icon="🔄" />
      </div>

      {/* Breakdown Row: Channels & Top Drugs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '18px' }}>
        {/* Top Selling Pharmaceuticals */}
        <div style={{
          background: 'var(--card, #1e293b)',
          border: '1px solid var(--border, rgba(255,255,255,0.08))',
          borderRadius: '12px',
          padding: '20px'
        }}>
          <h3 style={{ margin: '0 0 4px', fontSize: '15px', fontWeight: 700 }}>Top Selling Veterinary Pharmaceuticals</h3>
          <p style={{ margin: '0 0 14px', fontSize: '12px', color: '#94a3b8' }}>Ranked by revenue contribution & unit volume</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {topSellingMeds.map((m, idx) => (
              <div key={idx} style={{ padding: '10px 12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 600 }}>
                  <span>{idx + 1}. {m.name}</span>
                  <span style={{ fontFamily: '"IBM Plex Mono", monospace', color: '#10b981' }}>{m.rev}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>
                  <span>{m.units} units sold · Gross Margin: <strong style={{ color: '#38bdf8' }}>{m.margin}</strong></span>
                  <span>{m.share} of total pharmacy sales</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Channel Mix & Payment Modes */}
        <div style={{
          background: 'var(--card, #1e293b)',
          border: '1px solid var(--border, rgba(255,255,255,0.08))',
          borderRadius: '12px',
          padding: '20px'
        }}>
          <h3 style={{ margin: '0 0 4px', fontSize: '15px', fontWeight: 700 }}>Fulfillment Channels & Payment Instruments</h3>
          <p style={{ margin: '0 0 14px', fontSize: '12px', color: '#94a3b8' }}>How pet parents purchase medicines</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            <div style={{ padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
              <span style={{ fontSize: '11px', color: '#94a3b8' }}>In-Clinic POS Counter</span>
              <div style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px', color: '#38bdf8' }}>0.0%</div>
              <div style={{ fontSize: '10px', color: '#64748b' }}>₹0 · Direct consults</div>
            </div>
            <div style={{ padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
              <span style={{ fontSize: '11px', color: '#94a3b8' }}>60-Min Express Delivery</span>
              <div style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px', color: '#10b981' }}>0.0%</div>
              <div style={{ fontSize: '10px', color: '#64748b' }}>₹0 · Urgent delivery</div>
            </div>
            <div style={{ padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
              <span style={{ fontSize: '11px', color: '#94a3b8' }}>App Scheduled Delivery</span>
              <div style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px', color: '#a855f7' }}>0.0%</div>
              <div style={{ fontSize: '10px', color: '#64748b' }}>₹0 · Chronic refills</div>
            </div>
            <div style={{ padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
              <span style={{ fontSize: '11px', color: '#94a3b8' }}>Partner Clinic Network</span>
              <div style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px', color: '#f59e0b' }}>0.0%</div>
              <div style={{ fontSize: '10px', color: '#64748b' }}>₹0 · B2B referral</div>
            </div>
          </div>

          <div style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.04)' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '8px' }}>Payment Mode Distribution</span>
            <div style={{ display: 'flex', gap: '16px', fontSize: '11px', color: '#94a3b8' }}>
              <span>UPI: <b style={{ color: '#fff' }}>0%</b></span>
              <span>Cards: <b style={{ color: '#fff' }}>0%</b></span>
              <span>Insurance Claim: <b style={{ color: '#fff' }}>0%</b></span>
              <span>Cash: <b style={{ color: '#fff' }}>0%</b></span>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Register */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Pharmacy Sales Transactions</h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#94a3b8' }}>Itemized sales ledger with doctor attribution and payment verification</p>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Search ID, customer, pet, medicine..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                background: 'rgba(0,0,0,0.2)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                fontSize: '12px',
                width: '240px'
              }}
            />
            <div style={{ display: 'flex', gap: '4px' }}>
              {['ALL', 'In-Clinic POS', '60-Min Rapid', 'Online Delivery', 'Partner Clinic'].map(ch => (
                <button
                  key={ch}
                  onClick={() => setChannelFilter(ch)}
                  style={{
                    padding: '5px 10px',
                    borderRadius: '6px',
                    border: 'none',
                    fontSize: '11px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    background: channelFilter === ch ? 'rgba(59,130,246,0.25)' : 'rgba(255,255,255,0.05)',
                    color: channelFilter === ch ? '#60a5fa' : '#94a3b8'
                  }}
                >
                  {ch}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: '#94a3b8' }}>
                <th style={{ padding: '8px 12px' }}>Order ID</th>
                <th style={{ padding: '8px 12px' }}>Timestamp</th>
                <th style={{ padding: '8px 12px' }}>Customer & Pet</th>
                <th style={{ padding: '8px 12px' }}>Attending Vet</th>
                <th style={{ padding: '8px 12px' }}>Dispensed Medicines</th>
                <th style={{ padding: '8px 12px' }}>Channel</th>
                <th style={{ padding: '8px 12px' }}>Payment</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '10px 12px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 600, color: '#38bdf8' }}>{item.id}</td>
                  <td style={{ padding: '10px 12px', color: '#94a3b8' }}>{item.time}</td>
                  <td style={{ padding: '10px 12px' }}>
                    <div style={{ fontWeight: 600 }}>{item.customer}</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>{item.pet}</div>
                  </td>
                  <td style={{ padding: '10px 12px', color: '#94a3b8' }}>{item.vet}</td>
                  <td style={{ padding: '10px 12px', maxWidth: '240px' }}>{item.items}</td>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '10px',
                      fontWeight: 600,
                      background: 'rgba(255,255,255,0.06)',
                      color: '#cbd5e1'
                    }}>
                      {item.channel}
                    </span>
                  </td>
                  <td style={{ padding: '10px 12px', color: '#94a3b8' }}>{item.payment}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#10b981' }}>
                    ₹{item.amount.toLocaleString('en-IN')}
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
