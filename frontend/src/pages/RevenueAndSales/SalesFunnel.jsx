import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function SalesFunnel() {
  const [selectedStage, setSelectedStage] = useState('all');
  const [channelFilter, setChannelFilter] = useState('all');

  const stages = [
    { id: 'installs', num: '01', name: 'App Store Installs', val: 2480, rev: '₹57,09,400', conv: '100%', drop: '0.0%', color: '#0ea5e9', icon: '📲', desc: 'Acquisition via Play Store & App Store' },
    { id: 'sessions', num: '02', name: 'Active Pet Sessions', val: 1785, rev: '₹41,10,700', conv: '72.0%', drop: '28.0%', color: '#3b82f6', icon: '👁️', desc: 'Browsing products, doctors & health services' },
    { id: 'intent', num: '03', name: 'Consult & Cart Inquiries', val: 1120, rev: '₹25,78,000', conv: '62.7%', drop: '37.3%', color: '#8b5cf6', icon: '🩺', desc: 'Selected medicines, clinic visits or diet items' },
    { id: 'checkout', num: '04', name: 'Checkout Initiated', val: 435, rev: '₹10,01,200', conv: '38.8%', drop: '61.2%', color: '#f59e0b', icon: '🛒', desc: 'Order created, awaiting payment authorization' },
    { id: 'paid', num: '05', name: 'Paid Healthcare Sales', val: 412, rev: '₹9,48,200', conv: '94.7%', drop: '5.3%', color: '#10b981', icon: '✅', desc: 'Settled transaction & instant dispatch trigger' }
  ];

  const channels = [
    { name: 'Android App', installs: 1420, orders: 284, paid: 272, conv: '19.1%', rev: '₹4,82,300', color: '#3ddc84', icon: '📱' },
    { name: 'iOS App', installs: 680, orders: 198, paid: 192, conv: '28.2%', rev: '₹3,96,000', color: '#0071e3', icon: '🍏' },
    { name: 'Web Direct Portal', installs: 260, orders: 64, paid: 58, conv: '22.3%', rev: '₹1,28,300', color: '#6366f1', icon: '💻' },
    { name: 'Partner Clinic Referrals', installs: 120, orders: 54, paid: 52, conv: '43.3%', rev: '₹1,35,600', color: '#f59e0b', icon: '🏥' }
  ];

  const leads = [
    { id: 'LD-4091', customer: 'Kavita Menon', pet: 'Golden Retriever (Bruno)', stage: 'Paid Healthcare Sales', stageId: 'paid', channel: 'Android App', service: 'Royal Canin + Vet Consult', amount: '₹3,400', time: '12m ago', status: 'Converted' },
    { id: 'LD-4090', customer: 'Aditya Birla', pet: 'German Shepherd (Max)', stage: 'Checkout Initiated', stageId: 'checkout', channel: 'iOS App', service: 'Bravecto Flea & Tick 3-Pack', amount: '₹5,850', time: '24m ago', status: 'Pending Payment' },
    { id: 'LD-4089', customer: 'Sneha Rao', pet: 'Beagle (Daisy)', stage: 'Consult & Cart Inquiries', stageId: 'intent', channel: 'Web Direct Portal', service: 'Full Health Blood Screening', amount: '₹2,400', time: '48m ago', status: 'Cart Abandoned' },
    { id: 'LD-4088', customer: 'Vikram Joshi', pet: 'Labrador (Cooper)', stage: 'Paid Healthcare Sales', stageId: 'paid', channel: 'Partner Clinic Referrals', service: 'Orthopedic Consultation MS', amount: '₹2,800', time: '1h ago', status: 'Converted' },
    { id: 'LD-4087', customer: 'Pooja Hegde', pet: 'Persian Cat (Simba)', stage: 'Active Pet Sessions', stageId: 'sessions', channel: 'Android App', service: 'Cat Hairball Prevention Diet', amount: '₹1,850', time: '1h ago', status: 'Browsing' },
    { id: 'LD-4086', customer: 'Rohan Deshmukh', pet: 'Shih Tzu (Coco)', stage: 'Paid Healthcare Sales', stageId: 'paid', channel: 'iOS App', service: 'Nobivac Core Vaccines Pack', amount: '₹1,950', time: '2h ago', status: 'Converted' },
    { id: 'LD-4085', customer: 'Meera Nair', pet: 'Cocker Spaniel (Leo)', stage: 'Checkout Initiated', stageId: 'checkout', channel: 'Android App', service: 'NexGard Spectra Monthly', amount: '₹1,450', time: '3h ago', status: 'Pending Payment' }
  ];

  const filteredLeads = leads.filter(l => {
    if (selectedStage !== 'all' && l.stageId !== selectedStage) return false;
    if (channelFilter !== 'all' && l.channel !== channelFilter) return false;
    return true;
  });

  return (
    <DashboardLayout
      category="Revenue & Sales"
      subcategory="Sales Funnel"
      title="Conversion Geometry & Attrition Pipeline"
      subtitle="Visual stage-by-stage drop-off analytics, acquisition channel efficiency, and abandoned checkout diagnostics"
      icon="📊"
      badge="5-Stage Geometry"
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <select
            value={channelFilter}
            onChange={(e) => setChannelFilter(e.target.value)}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              background: 'var(--card, #1e293b)',
              color: 'var(--foreground, #f8fafc)',
              border: '1px solid var(--border, rgba(255,255,255,0.1))',
              fontSize: '12px',
              fontWeight: 600,
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="all">All Channels</option>
            <option value="Android App">Android App</option>
            <option value="iOS App">iOS App</option>
            <option value="Web Direct Portal">Web Direct Portal</option>
            <option value="Partner Clinic Referrals">Partner Clinics</option>
          </select>
          <button
            onClick={() => { setSelectedStage('all'); setChannelFilter('all'); }}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              background: 'var(--card, #1e293b)',
              color: 'var(--foreground, #f8fafc)',
              border: '1px solid var(--border, rgba(255,255,255,0.1))',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >Reset Funnel</button>
        </div>
      }
    >
      {/* Funnel KPI Highlights */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '14px'
      }}>
        <KpiCard label="Pipeline Potential" value="₹57,09,400" delta="+24.1%" trend="up" subtext="Top-of-funnel value" icon="💼" />
        <KpiCard label="End-to-End Conversion" value="16.61%" delta="+2.8%" trend="up" subtext="Installs to paid customers" icon="📈" />
        <KpiCard label="Checkout Completion" value="94.7%" delta="+1.9%" trend="up" subtext="Cart to payment success" icon="✅" />
        <KpiCard label="Conversion Cycle" value="3.2 Days" delta="-0.4d faster" trend="up" subtext="First touch to settled sale" icon="⚡" />
        <KpiCard label="Lost Attrition Value" value="₹2,14,000" delta="23 abandoned" trend="down" subtext="Recoverable cart drop-off" icon="⚠️" />
        <KpiCard label="Repeat Customer Flow" value="68.4%" delta="+4.2%" trend="up" subtext="Recurring buyers in funnel" icon="🔁" />
      </div>

      {/* DISTINCT FEATURE 1: SVG Geometric Funnel Visualizer */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>Interactive Conversion Funnel Matrix</h3>
            <p style={{ margin: '4px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>
              Click on any funnel segment below to isolate and inspect that stage in the activity stream
            </p>
          </div>
          {selectedStage !== 'all' && (
            <span style={{
              fontSize: '11px',
              padding: '3px 10px',
              borderRadius: '99px',
              background: 'rgba(59,130,246,0.18)',
              color: '#3b82f6',
              fontWeight: 700
            }}>Filtered: {stages.find(s => s.id === selectedStage)?.name}</span>
          )}
        </div>

        {/* SVG Funnel Pipeline */}
        <div style={{ width: '100%', overflowX: 'auto' }}>
          <svg viewBox="0 0 940 220" style={{ width: '100%', minWidth: '760px', height: 'auto', display: 'block' }}>
            <defs>
              <linearGradient id="fn-0" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#0ea5e9" stopOpacity="0.35"/><stop offset="1" stopColor="#0ea5e9" stopOpacity="0.15"/></linearGradient>
              <linearGradient id="fn-1" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#3b82f6" stopOpacity="0.35"/><stop offset="1" stopColor="#3b82f6" stopOpacity="0.15"/></linearGradient>
              <linearGradient id="fn-2" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#8b5cf6" stopOpacity="0.35"/><stop offset="1" stopColor="#8b5cf6" stopOpacity="0.15"/></linearGradient>
              <linearGradient id="fn-3" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#f59e0b" stopOpacity="0.35"/><stop offset="1" stopColor="#f59e0b" stopOpacity="0.15"/></linearGradient>
              <linearGradient id="fn-4" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#10b981" stopOpacity="0.35"/><stop offset="1" stopColor="#10b981" stopOpacity="0.15"/></linearGradient>
            </defs>

            {/* Stage Trapezoids */}
            {stages.map((st, i) => {
              const segW = 940 / stages.length;
              const x1 = i * segW + 6;
              const x2 = (i + 1) * segW - 6;
              const r1 = st.val / stages[0].val;
              const r2 = (i + 1 < stages.length) ? stages[i + 1].val / stages[0].val : r1 * 0.9;
              const yP1 = (1 - r1) * 75;
              const yP2 = (1 - r2) * 75;
              const isSelected = selectedStage === st.id;

              return (
                <g
                  key={st.id}
                  onClick={() => setSelectedStage(selectedStage === st.id ? 'all' : st.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <polygon
                    points={`${x1},${20 + yP1} ${x2},${20 + yP2} ${x2},${200 - yP2} ${x1},${200 - yP1}`}
                    fill={`url(#fn-${i})`}
                    stroke={isSelected ? '#fff' : st.color}
                    strokeWidth={isSelected ? '2.5' : '1.5'}
                    strokeDasharray={isSelected ? 'none' : 'none'}
                  />
                  <text x={x1 + segW / 2} y={105} textAnchor="middle" fill="#fff" fontSize="15" fontWeight="700" fontFamily="IBM Plex Mono, monospace">
                    {st.icon} {st.val.toLocaleString('en-IN')}
                  </text>
                  <text x={x1 + segW / 2} y={125} textAnchor="middle" fill="var(--muted-foreground, #94a3b8)" fontSize="11" fontWeight="600">
                    {st.name}
                  </text>
                  <text x={x1 + segW / 2} y={145} textAnchor="middle" fill={st.color} fontSize="11" fontWeight="700" fontFamily="IBM Plex Mono, monospace">
                    {st.rev}
                  </text>

                  {/* Drop-off connector */}
                  {i < stages.length - 1 && (
                    <g>
                      <rect x={x2 - 24} y={192} width="48" height="18" rx="9" fill="rgba(239,68,68,0.18)" stroke="#ef4444" strokeWidth="0.8" />
                      <text x={x2} y={204} textAnchor="middle" fill="#ef4444" fontSize="9" fontWeight="700">
                        -{stages[i + 1].drop}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Stage Cards Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
          gap: '12px'
        }}>
          {stages.map((st) => {
            const isSelected = selectedStage === st.id;
            return (
              <div
                key={st.id}
                onClick={() => setSelectedStage(selectedStage === st.id ? 'all' : st.id)}
                style={{
                  background: isSelected ? 'rgba(59,130,246,0.12)' : 'rgba(0,0,0,0.15)',
                  border: isSelected ? `2px solid ${st.color}` : '1px solid var(--border, rgba(255,255,255,0.06))',
                  borderRadius: '10px',
                  padding: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: st.color, fontFamily: 'IBM Plex Mono, monospace' }}>STEP {st.num}</span>
                  <span style={{ fontSize: '10px', color: 'var(--muted-foreground, #94a3b8)' }}>{st.conv} kept</span>
                </div>
                <div style={{ fontSize: '13px', fontWeight: 700, marginTop: '4px' }}>{st.icon} {st.name}</div>
                <div style={{ fontSize: '20px', fontWeight: 700, fontFamily: 'IBM Plex Mono, monospace', margin: '4px 0' }}>{st.val.toLocaleString('en-IN')}</div>
                <div style={{ fontSize: '10px', color: 'var(--muted-foreground, #94a3b8)', lineHeight: 1.4 }}>{st.desc}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* DISTINCT FEATURE 2: Channel Acquisition Benchmarks & Attrition Matrix */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '16px'
      }}>
        {/* Channel Benchmarks */}
        <div style={{
          background: 'var(--card, #1e293b)',
          border: '1px solid var(--border, rgba(255,255,255,0.08))',
          borderRadius: '12px',
          padding: '20px'
        }}>
          <h3 style={{ margin: '0 0 14px', fontSize: '15px', fontWeight: 700 }}>Channel Conversion Efficiency</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {channels.map((ch) => (
              <div key={ch.name} style={{
                background: 'rgba(0,0,0,0.15)',
                border: '1px solid var(--border, rgba(255,255,255,0.06))',
                borderRadius: '8px',
                padding: '12px 14px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontWeight: 700, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>{ch.icon}</span> {ch.name}
                  </span>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: ch.color,
                    background: `color-mix(in oklab, ${ch.color} 15%, transparent)`,
                    padding: '2px 8px',
                    borderRadius: '99px'
                  }}>{ch.conv} Conv Rate</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', fontSize: '11px' }}>
                  <div><span style={{ color: 'var(--muted-foreground, #94a3b8)' }}>Installs:</span> <b>{ch.installs}</b></div>
                  <div><span style={{ color: 'var(--muted-foreground, #94a3b8)' }}>Completed:</span> <b style={{ color: '#10b981' }}>{ch.paid}</b></div>
                  <div><span style={{ color: 'var(--muted-foreground, #94a3b8)' }}>Revenue:</span> <b>{ch.rev}</b></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottleneck Diagnostic Alerts */}
        <div style={{
          background: 'var(--card, #1e293b)',
          border: '1px solid var(--border, rgba(255,255,255,0.08))',
          borderRadius: '12px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          <h3 style={{ margin: '0 0 4px', fontSize: '15px', fontWeight: 700 }}>Conversion Bottleneck Diagnostics</h3>
          <p style={{ margin: '0 0 8px', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Automated drop-off triggers detected in live customer streams</p>

          <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(239,68,68,0.1)', borderLeft: '3px solid #ef4444' }}>
            <div style={{ fontWeight: 700, fontSize: '13px', color: '#ef4444' }}>Checkout Stage Drop-Off (61.2% Attrition)</div>
            <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)', marginTop: '4px', lineHeight: 1.5 }}>
              435 orders initiated checkout, but 23 dropped off prior to payment gateway settlement. Re-targeting via automated WhatsApp alerts within 15 minutes recovers 38% of baskets.
            </div>
          </div>

          <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(59,130,246,0.1)', borderLeft: '3px solid #3b82f6' }}>
            <div style={{ fontWeight: 700, fontSize: '13px', color: '#3b82f6' }}>Partner Clinic High Intent (43.3% Conversion)</div>
            <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)', marginTop: '4px', lineHeight: 1.5 }}>
              Referrals directly from verified veterinarians convert at more than 2x standard app installs. Expanding partner QR codes in clinic waiting rooms will drive highest ROI.
            </div>
          </div>

          <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(16,185,129,0.1)', borderLeft: '3px solid #10b981' }}>
            <div style={{ fontWeight: 700, fontSize: '13px', color: '#10b981' }}>iOS Basket Size Advantage (+20% AOV)</div>
            <div style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)', marginTop: '4px', lineHeight: 1.5 }}>
              While Android delivers 57% of top-of-funnel install volume, iOS pet parents display higher cart sizes (₹1,722 vs ₹1,431).
            </div>
          </div>
        </div>
      </div>

      {/* DISTINCT FEATURE 3: Lead Journey & Conversion Stream Table */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Conversion Journey Activity Stream</h3>
            <p style={{ margin: '4px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Showing live buyer journeys passing through the funnel</p>
          </div>
          <span style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)' }}>
            Showing {filteredLeads.length} leads
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))', color: 'var(--muted-foreground, #94a3b8)', fontSize: '11px' }}>
                <th style={{ padding: '8px 12px' }}>Lead ID</th>
                <th style={{ padding: '8px 12px' }}>Customer & Pet</th>
                <th style={{ padding: '8px 12px' }}>Funnel Stage Reached</th>
                <th style={{ padding: '8px 12px' }}>Acquisition Channel</th>
                <th style={{ padding: '8px 12px' }}>Service / Medication</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Order Value</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr key={lead.id} style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.04))' }}>
                  <td style={{ padding: '12px', fontWeight: 700, fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px' }}>{lead.id}</td>
                  <td style={{ padding: '12px' }}>
                    <div style={{ fontWeight: 600 }}>{lead.customer}</div>
                    <div style={{ fontSize: '10px', color: 'var(--muted-foreground, #94a3b8)' }}>{lead.pet}</div>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: '4px',
                      background: 'rgba(255,255,255,0.06)',
                      fontSize: '11px',
                      fontWeight: 600
                    }}>{lead.stage}</span>
                  </td>
                  <td style={{ padding: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>{lead.channel}</td>
                  <td style={{ padding: '12px' }}>{lead.service}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, fontFamily: 'IBM Plex Mono, monospace' }}>{lead.amount}</td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: '99px',
                      background: lead.status === 'Converted' ? 'rgba(16,185,129,0.15)' : lead.status === 'Pending Payment' ? 'rgba(245,158,11,0.15)' : 'rgba(239,68,68,0.15)',
                      color: lead.status === 'Converted' ? '#10b981' : lead.status === 'Pending Payment' ? '#f59e0b' : '#ef4444',
                      fontWeight: 600,
                      fontSize: '11px'
                    }}>{lead.status}</span>
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
