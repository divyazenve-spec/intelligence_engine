import React, { useState, useMemo } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

const INITIAL_STAGES = [
  { id: 'installs', num: '01', name: 'App Store Installs', val: 2480, rev: '₹57,09,400', conv: '100%', drop: '0.0%', color: '#0ea5e9', icon: '📲', source: 'Play Store & App Store' },
  { id: 'sessions', num: '02', name: 'Active Pet Sessions', val: 1785, rev: '₹41,10,700', conv: '72.0%', drop: '28.0%', color: '#3b82f6', icon: '👁️', source: 'Browsing & Pet Setup' },
  { id: 'intent', num: '03', name: 'Consult & Cart Actions', val: 1120, rev: '₹25,78,000', conv: '62.7%', drop: '37.3%', color: '#8b5cf6', icon: '🩺', source: 'Medicines & Doctor Selection' },
  { id: 'checkout', num: '04', name: 'Orders Placed', val: 435, rev: '₹10,01,200', conv: '38.8%', drop: '61.2%', color: '#f59e0b', icon: '🛒', source: 'Checkout Initiated' },
  { id: 'paid', num: '05', name: 'Paid Healthcare Sales', val: 412, rev: '₹9,48,200', conv: '94.7%', drop: '5.3%', color: '#10b981', icon: '✅', source: 'Settled Transactions' }
];

const CHANNELS = [
  { name: 'Android App', installs: 1420, inquiries: 284, paid: 272, conv: '19.1%', rev: '₹4,82,300', color: '#3ddc84', icon: '📱' },
  { name: 'iOS App', installs: 680, inquiries: 198, paid: 192, conv: '28.2%', rev: '₹3,96,000', color: '#0071e3', icon: '🍏' },
  { name: 'Web Direct Portal', installs: 260, inquiries: 64, paid: 58, conv: '22.3%', rev: '₹1,28,300', color: '#6366f1', icon: '💻' },
  { name: 'Partner Clinic Referrals', installs: 120, inquiries: 54, paid: 52, conv: '43.3%', rev: '₹1,35,600', color: '#f59e0b', icon: '🏥' }
];

const SPECIALTY_BOTTLENECKS = [
  { name: 'General Medicine & Care', inquiries: 312, paid: 298, rate: '95.5%', drop: '4.5%', rev: '₹3,42,000' },
  { name: 'Diagnostics & Pathology', inquiries: 245, paid: 231, rate: '94.3%', drop: '5.7%', rev: '₹2,98,400' },
  { name: 'Cardiology Specialization', inquiries: 168, paid: 154, rate: '91.7%', drop: '8.3%', rev: '₹2,15,600' },
  { name: 'Surgery & Orthopedics', inquiries: 142, paid: 124, rate: '87.3%', drop: '12.7%', rev: '₹1,86,500' },
  { name: 'Pharmacy & Wellness', inquiries: 110, paid: 102, rate: '92.7%', drop: '7.3%', rev: '₹1,44,200' }
];

const REGIONAL_CITIES = [
  { city: 'Mumbai', inquiries: 340, paid: 322, rate: '94.7%', rev: '₹4,12,000' },
  { city: 'Bengaluru', inquiries: 295, paid: 281, rate: '95.3%', rev: '₹3,68,400' },
  { city: 'Delhi NCR', inquiries: 240, paid: 224, rate: '93.3%', rev: '₹2,84,000' },
  { city: 'Hyderabad', inquiries: 165, paid: 152, rate: '92.1%', rev: '₹1,95,000' },
  { city: 'Chennai', inquiries: 140, paid: 131, rate: '93.6%', rev: '₹1,62,500' }
];

const ALL_LEADS = [
  { id: 'LD-4091', date: '2026-10-03 14:15', customer: 'Kavita Menon', pet: 'Golden Retriever (Bruno)', stage: '05 Paid Conversion', stageId: 'paid', channel: 'Android App', service: 'Royal Canin + Vet Consult', city: 'Mumbai', amount: 3400, status: 'Converted' },
  { id: 'LD-4090', date: '2026-10-03 13:48', customer: 'Aditya Birla', pet: 'German Shepherd (Max)', stage: '04 Checkout Initiated', stageId: 'checkout', channel: 'iOS App', service: 'Bravecto Flea & Tick 3-Pack', city: 'Bengaluru', amount: 5850, status: 'Pending Payment' },
  { id: 'LD-4089', date: '2026-10-03 12:30', customer: 'Sneha Rao', pet: 'Beagle (Daisy)', stage: '04 Checkout Initiated', stageId: 'checkout', channel: 'Web Direct Portal', service: 'Full Health Blood Screening', city: 'Delhi NCR', amount: 2400, status: 'Cart Abandoned' },
  { id: 'LD-4088', date: '2026-10-03 11:14', customer: 'Vikram Joshi', pet: 'Labrador (Cooper)', stage: '05 Paid Conversion', stageId: 'paid', channel: 'Partner Clinic Referrals', service: 'Orthopedic Consultation MS', city: 'Mumbai', amount: 2800, status: 'Converted' },
  { id: 'LD-4087', date: '2026-10-03 10:45', customer: 'Pooja Hegde', pet: 'Persian Cat (Simba)', stage: '02 Active Sessions', stageId: 'sessions', channel: 'Android App', service: 'Cat Hairball Prevention Diet', city: 'Hyderabad', amount: 1850, status: 'Browsing' },
  { id: 'LD-4086', date: '2026-10-03 09:20', customer: 'Rohan Deshmukh', pet: 'Shih Tzu (Coco)', stage: '05 Paid Conversion', stageId: 'paid', channel: 'iOS App', service: 'Nobivac Core Vaccines Pack', city: 'Pune', amount: 1950, status: 'Converted' },
  { id: 'LD-4085', date: '2026-10-03 08:50', customer: 'Meera Nair', pet: 'Cocker Spaniel (Leo)', stage: '04 Checkout Initiated', stageId: 'checkout', channel: 'Android App', service: 'NexGard Spectra Monthly', city: 'Bengaluru', amount: 1450, status: 'Pending Payment' },
  { id: 'LD-4084', date: '2026-10-02 18:40', customer: 'Arun Varma', pet: 'Rottweiler (Rocky)', stage: '05 Paid Conversion', stageId: 'paid', channel: 'Partner Clinic Referrals', service: 'Echocardiogram Screening', city: 'Chennai', amount: 4200, status: 'Converted' },
  { id: 'LD-4083', date: '2026-10-02 17:15', customer: 'Divya Iyer', pet: 'Indie Dog (Milo)', stage: '05 Paid Conversion', stageId: 'paid', channel: 'Android App', service: 'Wellness Deworming Combo', city: 'Mumbai', amount: 1150, status: 'Converted' },
  { id: 'LD-4082', date: '2026-10-02 15:30', customer: 'Kunal Sen', pet: 'Pug (Gordo)', stage: '04 Checkout Initiated', stageId: 'checkout', channel: 'iOS App', service: 'Dermatology Skin Scraping', city: 'Kolkata', amount: 2600, status: 'Pending Payment' },
  { id: 'LD-4081', date: '2026-10-02 14:10', customer: 'Ananya Roy', pet: 'Husky (Ghost)', stage: '05 Paid Conversion', stageId: 'paid', channel: 'Web Direct Portal', service: 'Hip Dysplasia X-Ray Exam', city: 'Delhi NCR', amount: 3900, status: 'Converted' },
  { id: 'LD-4080', date: '2026-10-02 12:00', customer: 'Harish Patel', pet: 'Golden Retriever (Buddy)', stage: '05 Paid Conversion', stageId: 'paid', channel: 'Android App', service: 'Senior Canine Dental Scaling', city: 'Ahmedabad', amount: 3100, status: 'Converted' }
];

export default function SalesFunnel() {
  const [selectedStage, setSelectedStage] = useState('all');
  const [channelFilter, setChannelFilter] = useState('all');
  const [periodPreset, setPeriodPreset] = useState('30D');
  const [searchQuery, setSearchQuery] = useState('');
  const [comparePrior, setComparePrior] = useState(true);
  const [metricMode, setMetricMode] = useState('revenue');
  const [sortConfig, setSortConfig] = useState({ key: 'date', dir: -1 });
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Filtered leads
  const filteredLeads = useMemo(() => {
    return ALL_LEADS.filter(l => {
      if (selectedStage !== 'all' && l.stageId !== selectedStage) return false;
      if (channelFilter !== 'all' && l.channel !== channelFilter) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const hay = `${l.id} ${l.customer} ${l.pet} ${l.service} ${l.city} ${l.status} ${l.channel}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [selectedStage, channelFilter, searchQuery]);

  // Sort leads
  const sortedLeads = useMemo(() => {
    return [...filteredLeads].sort((a, b) => {
      const valA = a[sortConfig.key];
      const valB = b[sortConfig.key];
      if (typeof valA === 'number') {
        return (valA - valB) * sortConfig.dir;
      }
      return String(valA || '').localeCompare(String(valB || '')) * sortConfig.dir;
    });
  }, [filteredLeads, sortConfig]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sortedLeads.length / pageSize));
  const paginatedLeads = useMemo(() => {
    const page = Math.max(1, Math.min(currentPage, totalPages));
    return sortedLeads.slice((page - 1) * pageSize, page * pageSize);
  }, [sortedLeads, currentPage, totalPages]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      dir: prev.key === key ? -prev.dir : (key === 'amount' || key === 'date' ? -1 : 1)
    }));
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSelectedStage('all');
    setChannelFilter('all');
    setPeriodPreset('30D');
    setSearchQuery('');
    setCurrentPage(1);
  };

  const exportCsv = () => {
    const headers = ['Lead ID', 'Date', 'Customer', 'Pet Profile', 'Funnel Stage', 'Channel', 'Service', 'City', 'Amount', 'Status'];
    const rows = sortedLeads.map(l => [l.id, l.date, l.customer, l.pet, l.stage, l.channel, l.service, l.city, l.amount, l.status]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.map(v => `"${v}"`).join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `sales-funnel-export-${periodPreset}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <DashboardLayout
      category="Revenue & Sales"
      subcategory="Sales Funnel"
      title="Conversion Geometry & Attrition Pipeline"
      subtitle="Multi-stage customer acquisition pipeline from mobile store installs to settled healthcare payments"
      icon="📊"
      badge="5-Stage Geometry"
      actions={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', background: 'var(--card, #1e293b)', borderRadius: '8px', border: '1px solid var(--border, rgba(255,255,255,0.1))', overflow: 'hidden' }}>
            {['7D', '14D', '30D', '90D', 'All'].map(p => (
              <button
                key={p}
                onClick={() => setPeriodPreset(p)}
                style={{
                  background: periodPreset === p ? 'var(--primary, #3b82f6)' : 'transparent',
                  color: periodPreset === p ? '#fff' : 'var(--muted-foreground, #94a3b8)',
                  border: 'none',
                  padding: '5px 12px',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >{p}</button>
            ))}
          </div>

          <button
            onClick={() => setComparePrior(!comparePrior)}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              background: comparePrior ? 'rgba(16,185,129,0.15)' : 'var(--card, #1e293b)',
              color: comparePrior ? '#10b981' : 'var(--muted-foreground, #94a3b8)',
              border: `1px solid ${comparePrior ? 'rgba(16,185,129,0.4)' : 'var(--border, rgba(255,255,255,0.1))'}`,
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            {comparePrior ? '✓ Comparing Prior Period' : '+ Compare Prior'}
          </button>

          <button
            onClick={exportCsv}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              background: 'var(--primary, #3b82f6)',
              color: '#fff',
              border: 'none',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            ⭳ Export CSV
          </button>
        </div>
      }
    >
      {/* Filters Toolbar matching Sales Dashboard */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '12px 16px',
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)', fontWeight: 600 }}>Channel:</span>
          <select
            value={channelFilter}
            onChange={(e) => setChannelFilter(e.target.value)}
            style={{
              padding: '5px 10px',
              borderRadius: '6px',
              background: 'var(--background, #0f172a)',
              color: 'var(--foreground, #f8fafc)',
              border: '1px solid var(--border, rgba(255,255,255,0.1))',
              fontSize: '12px',
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
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)', fontWeight: 600 }}>Stage:</span>
          <select
            value={selectedStage}
            onChange={(e) => setSelectedStage(e.target.value)}
            style={{
              padding: '5px 10px',
              borderRadius: '6px',
              background: 'var(--background, #0f172a)',
              color: 'var(--foreground, #f8fafc)',
              border: '1px solid var(--border, rgba(255,255,255,0.1))',
              fontSize: '12px',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="all">All Stages (01–05)</option>
            <option value="installs">01 App Installs</option>
            <option value="sessions">02 Active Sessions</option>
            <option value="intent">03 Consult & Cart</option>
            <option value="checkout">04 Checkout Initiated</option>
            <option value="paid">05 Paid Conversions</option>
          </select>
        </div>

        <div style={{ flex: 1, minWidth: '180px' }}>
          <input
            type="search"
            placeholder="Search lead, customer, pet, or service…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '6px 12px',
              borderRadius: '6px',
              background: 'var(--background, #0f172a)',
              color: 'var(--foreground, #f8fafc)',
              border: '1px solid var(--border, rgba(255,255,255,0.1))',
              fontSize: '12px',
              outline: 'none'
            }}
          />
        </div>

        <button
          onClick={handleReset}
          style={{
            padding: '5px 12px',
            borderRadius: '6px',
            background: 'rgba(255,255,255,0.06)',
            color: 'var(--muted-foreground, #94a3b8)',
            border: '1px solid var(--border, rgba(255,255,255,0.08))',
            fontSize: '11px',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          Reset Filters
        </button>
      </div>

      {/* Active Filter Chips */}
      {(channelFilter !== 'all' || selectedStage !== 'all' || searchQuery) && (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)' }}>Active Filters:</span>
          {channelFilter !== 'all' && (
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '11px',
              padding: '2px 8px',
              borderRadius: '99px',
              background: 'rgba(59,130,246,0.15)',
              color: '#3b82f6',
              fontWeight: 600
            }}>
              Channel: {channelFilter}
              <span onClick={() => setChannelFilter('all')} style={{ cursor: 'pointer', fontWeight: 800 }}>✕</span>
            </span>
          )}
          {selectedStage !== 'all' && (
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '11px',
              padding: '2px 8px',
              borderRadius: '99px',
              background: 'rgba(14,165,233,0.15)',
              color: '#0ea5e9',
              fontWeight: 600
            }}>
              Stage: {INITIAL_STAGES.find(s => s.id === selectedStage)?.name}
              <span onClick={() => setSelectedStage('all')} style={{ cursor: 'pointer', fontWeight: 800 }}>✕</span>
            </span>
          )}
          {searchQuery && (
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '11px',
              padding: '2px 8px',
              borderRadius: '99px',
              background: 'rgba(139,92,246,0.15)',
              color: '#a78bfa',
              fontWeight: 600
            }}>
              Search: "{searchQuery}"
              <span onClick={() => setSearchQuery('')} style={{ cursor: 'pointer', fontWeight: 800 }}>✕</span>
            </span>
          )}
        </div>
      )}

      {/* Executive 6-Card KPI Grid (Matching Sales Dashboard) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
        gap: '14px'
      }}>
        <KpiCard label="Pipeline Inflow Value" value="₹57,09,400" delta="+24.1%" trend="up" subtext="Top-of-funnel value" icon="💼" />
        <KpiCard label="Settled Paid Revenue" value="₹9,48,200" delta="+16.8%" trend="up" subtext="412 paid orders" icon="📈" />
        <KpiCard label="End-to-End Conversion" value="16.61%" delta="+2.8%" trend="up" subtext="Installs to paid customers" icon="🎯" />
        <KpiCard label="Checkout Completion" value="94.7%" delta="+1.9%" trend="up" subtext="412 of 435 orders paid" icon="✅" />
        <KpiCard label="Avg Converted Order" value="₹2,301" delta="+6.4%" trend="up" subtext="Basket size realized" icon="🛒" />
        <KpiCard label="Lost Attrition Value" value="₹2,14,000" delta="23 abandoned" trend="down" subtext="Recoverable cart drop-off" icon="⚠️" />
      </div>

      {/* 5-Stage Interactive Stage Cards Ribbon */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
        gap: '10px'
      }}>
        {INITIAL_STAGES.map((st, idx) => {
          const isSelected = selectedStage === st.id;
          return (
            <div
              key={st.id}
              onClick={() => setSelectedStage(selectedStage === st.id ? 'all' : st.id)}
              style={{
                background: isSelected ? 'rgba(14,165,233,0.1)' : 'var(--card, #1e293b)',
                border: isSelected ? '2px solid #0ea5e9' : '1px solid var(--border, rgba(255,255,255,0.08))',
                borderRadius: '10px',
                padding: '12px 14px',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                boxShadow: isSelected ? '0 0 14px rgba(14,165,233,0.3)' : 'none'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '10px', fontWeight: 700, color: st.color, fontFamily: 'IBM Plex Mono, monospace' }}>STEP {st.num}</span>
                <span style={{ fontSize: '10px', color: 'var(--muted-foreground, #94a3b8)' }}>{st.source}</span>
              </div>
              <div style={{ fontSize: '13px', fontWeight: 700, marginTop: '4px' }}>{st.icon} {st.name}</div>
              <div style={{ fontSize: '18px', fontWeight: 700, fontFamily: 'IBM Plex Mono, monospace', margin: '4px 0' }}>{st.val.toLocaleString('en-IN')}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '4px', background: 'rgba(16,185,129,0.12)', color: '#10b981', fontWeight: 700 }}>
                  ✓ {st.conv} kept
                </span>
                {idx > 0 && (
                  <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '4px', background: 'rgba(239,68,68,0.12)', color: '#ef4444', fontWeight: 700 }}>
                    ↓ {st.drop}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Geometric Funnel (Left) + Cohort Velocity Trend (Right) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
        gap: '16px'
      }}>
        {/* Left Centerpiece: Interactive Geometric Funnel SVG */}
        <div style={{
          background: 'var(--card, #1e293b)',
          border: '1px solid var(--border, rgba(255,255,255,0.08))',
          borderRadius: '12px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>End-to-End Conversion Geometry</h3>
              <p style={{ margin: '4px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>Click any polygon to filter records to that funnel stage</p>
            </div>
            {selectedStage !== 'all' && (
              <span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '99px', background: 'rgba(14,165,233,0.18)', color: '#0ea5e9', fontWeight: 700 }}>
                Filtered: {INITIAL_STAGES.find(s => s.id === selectedStage)?.name}
              </span>
            )}
          </div>

          <div style={{ width: '100%', overflowX: 'auto' }}>
            <svg viewBox="0 0 620 220" style={{ width: '100%', minWidth: '480px', height: 'auto', display: 'block' }}>
              <defs>
                <linearGradient id="fn-react-0" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#0ea5e9" stopOpacity="0.4" /><stop offset="1" stopColor="#0ea5e9" stopOpacity="0.15" /></linearGradient>
                <linearGradient id="fn-react-1" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#3b82f6" stopOpacity="0.4" /><stop offset="1" stopColor="#3b82f6" stopOpacity="0.15" /></linearGradient>
                <linearGradient id="fn-react-2" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#8b5cf6" stopOpacity="0.4" /><stop offset="1" stopColor="#8b5cf6" stopOpacity="0.15" /></linearGradient>
                <linearGradient id="fn-react-3" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#f59e0b" stopOpacity="0.4" /><stop offset="1" stopColor="#f59e0b" stopOpacity="0.15" /></linearGradient>
                <linearGradient id="fn-react-4" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#10b981" stopOpacity="0.4" /><stop offset="1" stopColor="#10b981" stopOpacity="0.15" /></linearGradient>
              </defs>

              {INITIAL_STAGES.map((st, i) => {
                const segW = 620 / INITIAL_STAGES.length;
                const x1 = i * segW + 4;
                const x2 = (i + 1) * segW - 4;
                const r1 = st.val / INITIAL_STAGES[0].val;
                const r2 = (i + 1 < INITIAL_STAGES.length) ? INITIAL_STAGES[i + 1].val / INITIAL_STAGES[0].val : r1 * 0.88;
                const yP1 = (1 - r1) * 70;
                const yP2 = (1 - r2) * 70;
                const isSelected = selectedStage === st.id;

                return (
                  <g key={st.id} onClick={() => setSelectedStage(selectedStage === st.id ? 'all' : st.id)} style={{ cursor: 'pointer' }}>
                    <polygon
                      points={`${x1},${20 + yP1} ${x2},${20 + yP2} ${x2},${200 - yP2} ${x1},${200 - yP1}`}
                      fill={`url(#fn-react-${i})`}
                      stroke={isSelected ? '#fff' : st.color}
                      strokeWidth={isSelected ? '2.5' : '1.5'}
                    />
                    <text x={x1 + segW / 2} y={100} textAnchor="middle" fill="#fff" fontSize="13" fontWeight="700" fontFamily="IBM Plex Mono, monospace">
                      {st.icon} {st.val.toLocaleString('en-IN')}
                    </text>
                    <text x={x1 + segW / 2} y={118} textAnchor="middle" fill="var(--muted-foreground, #94a3b8)" fontSize="10" fontWeight="600">
                      {st.name}
                    </text>
                    <text x={x1 + segW / 2} y={136} textAnchor="middle" fill={st.color} fontSize="10" fontWeight="700" fontFamily="IBM Plex Mono, monospace">
                      {st.rev}
                    </text>
                    {i < INITIAL_STAGES.length - 1 && (
                      <g>
                        <rect x={x2 - 20} y={190} width="40" height="16" rx="8" fill="rgba(239,68,68,0.2)" stroke="#ef4444" strokeWidth="0.8" />
                        <text x={x2} y={202} textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="700">
                          -{INITIAL_STAGES[i + 1].drop}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Right Centerpiece: Cohort & Velocity Trend SVG Line Chart (Matching Sales Dashboard trend) */}
        <div style={{
          background: 'var(--card, #1e293b)',
          border: '1px solid var(--border, rgba(255,255,255,0.08))',
          borderRadius: '12px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Conversion Velocity & Pipeline Inflow</h3>
              <p style={{ margin: '4px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>
                <span style={{ color: '#0ea5e9' }}>― Daily Inflow</span> · <span style={{ color: '#10b981' }}>― Settled Orders</span>
                {comparePrior && <span style={{ color: 'var(--muted-foreground, #94a3b8)' }}> · ╌ Prior Period</span>}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                onClick={() => setMetricMode('revenue')}
                style={{
                  padding: '3px 8px',
                  borderRadius: '4px',
                  border: 'none',
                  fontSize: '10px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  background: metricMode === 'revenue' ? '#0ea5e9' : 'rgba(255,255,255,0.06)',
                  color: metricMode === 'revenue' ? '#fff' : 'var(--muted-foreground, #94a3b8)'
                }}
              >Value (₹)</button>
              <button
                onClick={() => setMetricMode('orders')}
                style={{
                  padding: '3px 8px',
                  borderRadius: '4px',
                  border: 'none',
                  fontSize: '10px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  background: metricMode === 'orders' ? '#0ea5e9' : 'rgba(255,255,255,0.06)',
                  color: metricMode === 'orders' ? '#fff' : 'var(--muted-foreground, #94a3b8)'
                }}
              >Count (#)</button>
            </div>
          </div>

          <div style={{ width: '100%', height: '220px' }}>
            <svg viewBox="0 0 500 220" style={{ width: '100%', height: '100%' }}>
              <defs>
                <linearGradient id="trend-inflow-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.02" />
                </linearGradient>
              </defs>
              {/* Y Grid lines */}
              {[0, 1, 2, 3, 4].map(k => {
                const y = 20 + (170 / 4) * k;
                return (
                  <g key={k}>
                    <line x1="44" x2="486" y1={y} y2={y} stroke="rgba(255,255,255,0.08)" strokeDasharray={k ? '3 4' : '0'} />
                    <text x="38" y={y + 3} textAnchor="end" fontSize="9" fill="var(--muted-foreground, #94a3b8)">
                      {metricMode === 'revenue' ? `₹${(4 - k) * 35}K` : `${(4 - k) * 12}`}
                    </text>
                  </g>
                );
              })}

              {/* Inflow Area & Line */}
              <path
                d="M 44 140 L 98 120 L 152 105 L 206 90 L 260 75 L 314 65 L 368 50 L 422 40 L 486 32 L 486 190 L 44 190 Z"
                fill="url(#trend-inflow-grad)"
              />
              <path
                d="M 44 140 L 98 120 L 152 105 L 206 90 L 260 75 L 314 65 L 368 50 L 422 40 L 486 32"
                fill="none"
                stroke="#0ea5e9"
                strokeWidth="2.2"
              />

              {/* Settled Line */}
              <path
                d="M 44 165 L 98 150 L 152 135 L 206 122 L 260 108 L 314 96 L 368 82 L 422 72 L 486 60"
                fill="none"
                stroke="#10b981"
                strokeWidth="2.4"
              />

              {/* Compare Prior Period (dashed) */}
              {comparePrior && (
                <path
                  d="M 44 175 L 98 160 L 152 148 L 206 138 L 260 126 L 314 115 L 368 100 L 422 90 L 486 80"
                  fill="none"
                  stroke="var(--muted-foreground, #94a3b8)"
                  strokeWidth="1.6"
                  strokeDasharray="4 4"
                  opacity="0.65"
                />
              )}

              {/* X Axis Labels */}
              {['14d ago', '10d ago', '7d ago', '4d ago', 'Today'].map((lbl, idx) => (
                <text key={lbl} x={44 + idx * 110} y="210" textAnchor="middle" fontSize="9" fill="var(--muted-foreground, #94a3b8)">
                  {lbl}
                </text>
              ))}
            </svg>
          </div>
        </div>
      </div>

      {/* 3-Column Analytical Breakdown Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '16px'
      }}>
        {/* Channel Conversion Efficiency */}
        <div style={{
          background: 'var(--card, #1e293b)',
          border: '1px solid var(--border, rgba(255,255,255,0.08))',
          borderRadius: '12px',
          padding: '20px'
        }}>
          <h3 style={{ margin: '0 0 14px', fontSize: '15px', fontWeight: 700 }}>Channel Conversion Matrix</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {CHANNELS.map((ch) => (
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
                  <div><span style={{ color: 'var(--muted-foreground, #94a3b8)' }}>Inflows:</span> <b>{ch.inquiries}</b></div>
                  <div><span style={{ color: 'var(--muted-foreground, #94a3b8)' }}>Settled:</span> <b style={{ color: '#10b981' }}>{ch.paid}</b></div>
                  <div><span style={{ color: 'var(--muted-foreground, #94a3b8)' }}>Revenue:</span> <b>{ch.rev}</b></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Specialty Bottlenecks */}
        <div style={{
          background: 'var(--card, #1e293b)',
          border: '1px solid var(--border, rgba(255,255,255,0.08))',
          borderRadius: '12px',
          padding: '20px'
        }}>
          <h3 style={{ margin: '0 0 14px', fontSize: '15px', fontWeight: 700 }}>Service Attrition & Bottlenecks</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {SPECIALTY_BOTTLENECKS.map((sp) => (
              <div key={sp.name} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                  <span style={{ fontWeight: 600 }}>{sp.name}</span>
                  <span><b>{sp.rev}</b> <small style={{ color: '#10b981' }}>({sp.rate})</small></span>
                </div>
                <div style={{ width: '100%', height: '6px', borderRadius: '99px', background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                  <div style={{ width: sp.rate, height: '100%', background: '#0ea5e9', borderRadius: '99px' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--muted-foreground, #94a3b8)' }}>
                  <span>Completed: {sp.paid} of {sp.inquiries}</span>
                  <span style={{ color: '#ef4444' }}>Drop-off: {sp.drop}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Regional City Conversion */}
        <div style={{
          background: 'var(--card, #1e293b)',
          border: '1px solid var(--border, rgba(255,255,255,0.08))',
          borderRadius: '12px',
          padding: '20px'
        }}>
          <h3 style={{ margin: '0 0 14px', fontSize: '15px', fontWeight: 700 }}>Regional City Funnel Velocity</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {REGIONAL_CITIES.map((c) => (
              <div key={c.city} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                  <span style={{ fontWeight: 600 }}>📍 {c.city}</span>
                  <span><b>{c.rev}</b> <small style={{ color: '#10b981' }}>({c.rate})</small></span>
                </div>
                <div style={{ width: '100%', height: '6px', borderRadius: '99px', background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                  <div style={{ width: c.rate, height: '100%', background: '#10b981', borderRadius: '99px' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--muted-foreground, #94a3b8)' }}>
                  <span>Conversions: {c.paid}</span>
                  <span>Inquiries: {c.inquiries}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Paginated & Sortable Customer Journey Table (Matching Sales Dashboard) */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Funnel Journey Activity Stream</h3>
            <p style={{ margin: '4px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>
              Showing {sortedLeads.length} matching leads · click any column header to sort
            </p>
          </div>
          <span style={{ fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)' }}>
            Page {currentPage} of {totalPages}
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))', color: 'var(--muted-foreground, #94a3b8)', fontSize: '11px' }}>
                <th onClick={() => handleSort('id')} style={{ padding: '8px 12px', cursor: 'pointer' }}>Lead ID {sortConfig.key === 'id' ? (sortConfig.dir > 0 ? '▲' : '▼') : ''}</th>
                <th onClick={() => handleSort('date')} style={{ padding: '8px 12px', cursor: 'pointer' }}>Date {sortConfig.key === 'date' ? (sortConfig.dir > 0 ? '▲' : '▼') : ''}</th>
                <th onClick={() => handleSort('customer')} style={{ padding: '8px 12px', cursor: 'pointer' }}>Customer & Pet {sortConfig.key === 'customer' ? (sortConfig.dir > 0 ? '▲' : '▼') : ''}</th>
                <th onClick={() => handleSort('stage')} style={{ padding: '8px 12px', cursor: 'pointer' }}>Funnel Stage {sortConfig.key === 'stage' ? (sortConfig.dir > 0 ? '▲' : '▼') : ''}</th>
                <th onClick={() => handleSort('channel')} style={{ padding: '8px 12px', cursor: 'pointer' }}>Channel {sortConfig.key === 'channel' ? (sortConfig.dir > 0 ? '▲' : '▼') : ''}</th>
                <th onClick={() => handleSort('service')} style={{ padding: '8px 12px', cursor: 'pointer' }}>Service {sortConfig.key === 'service' ? (sortConfig.dir > 0 ? '▲' : '▼') : ''}</th>
                <th onClick={() => handleSort('city')} style={{ padding: '8px 12px', cursor: 'pointer' }}>City {sortConfig.key === 'city' ? (sortConfig.dir > 0 ? '▲' : '▼') : ''}</th>
                <th onClick={() => handleSort('amount')} style={{ padding: '8px 12px', textAlign: 'right', cursor: 'pointer' }}>Amount {sortConfig.key === 'amount' ? (sortConfig.dir > 0 ? '▲' : '▼') : ''}</th>
                <th onClick={() => handleSort('status')} style={{ padding: '8px 12px', textAlign: 'right', cursor: 'pointer' }}>Status {sortConfig.key === 'status' ? (sortConfig.dir > 0 ? '▲' : '▼') : ''}</th>
              </tr>
            </thead>
            <tbody>
              {paginatedLeads.map((lead) => (
                <tr key={lead.id} style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.04))' }}>
                  <td style={{ padding: '12px', fontWeight: 700, fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px' }}>{lead.id}</td>
                  <td style={{ padding: '12px', fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)' }}>{lead.date}</td>
                  <td style={{ padding: '12px' }}>
                    <div style={{ fontWeight: 600 }}>{lead.customer}</div>
                    <div style={{ fontSize: '10px', color: 'var(--muted-foreground, #94a3b8)' }}>{lead.pet}</div>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: '4px',
                      background: lead.stageId === 'paid' ? 'rgba(16,185,129,0.15)' : 'rgba(245,158,11,0.15)',
                      color: lead.stageId === 'paid' ? '#10b981' : '#f59e0b',
                      fontSize: '11px',
                      fontWeight: 600
                    }}>{lead.stage}</span>
                  </td>
                  <td style={{ padding: '12px', color: 'var(--muted-foreground, #94a3b8)' }}>{lead.channel}</td>
                  <td style={{ padding: '12px' }}>{lead.service}</td>
                  <td style={{ padding: '12px' }}>{lead.city}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, fontFamily: 'IBM Plex Mono, monospace' }}>₹{lead.amount.toLocaleString('en-IN')}</td>
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

        {/* Pager matching Sales Dashboard */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '16px',
          paddingTop: '12px',
          borderTop: '1px solid var(--border, rgba(255,255,255,0.06))',
          fontSize: '12px',
          color: 'var(--muted-foreground, #94a3b8)'
        }}>
          <span>
            {sortedLeads.length ? `${(currentPage - 1) * pageSize + 1}–${Math.min(sortedLeads.length, currentPage * pageSize)} of ${sortedLeads.length}` : '0 of 0'}
          </span>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              style={{
                padding: '4px 10px',
                borderRadius: '6px',
                background: 'var(--background, #0f172a)',
                color: currentPage <= 1 ? 'rgba(255,255,255,0.2)' : 'var(--foreground, #f8fafc)',
                border: '1px solid var(--border, rgba(255,255,255,0.1))',
                fontSize: '11px',
                cursor: currentPage <= 1 ? 'not-allowed' : 'pointer'
              }}
            >← Prev</button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
              style={{
                padding: '4px 10px',
                borderRadius: '6px',
                background: 'var(--background, #0f172a)',
                color: currentPage >= totalPages ? 'rgba(255,255,255,0.2)' : 'var(--foreground, #f8fafc)',
                border: '1px solid var(--border, rgba(255,255,255,0.1))',
                fontSize: '11px',
                cursor: currentPage >= totalPages ? 'not-allowed' : 'pointer'
              }}
            >Next →</button>
          </div>
        </div>
      </div>

      {/* AI Recommendations Cards */}
      <div style={{
        background: 'var(--card, #1e293b)',
        border: '1px solid var(--border, rgba(255,255,255,0.08))',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 14px', fontSize: '15px', fontWeight: 700 }}>Actionable AI Funnel Recommendations</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '12px'
        }}>
          <div style={{ background: 'rgba(0,0,0,0.18)', border: '1px solid var(--border, rgba(255,255,255,0.06))', borderRadius: '10px', padding: '12px', display: 'flex', gap: '10px' }}>
            <div style={{ fontSize: '20px' }}>💡</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '12px', marginBottom: '3px' }}>Cart Abandonment WhatsApp Recovery</div>
              <p style={{ margin: 0, fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)', lineHeight: 1.45 }}>
                23 orders remain pending checkout. Triggering WhatsApp alerts with instant UPI links within 15 minutes recovers an estimated ₹74,900.
              </p>
            </div>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.18)', border: '1px solid var(--border, rgba(255,255,255,0.06))', borderRadius: '10px', padding: '12px', display: 'flex', gap: '10px' }}>
            <div style={{ fontSize: '20px' }}>📱</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '12px', marginBottom: '3px' }}>Android vs iOS Channel Velocity</div>
              <p style={{ margin: 0, fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)', lineHeight: 1.45 }}>
                Android generates 68% of new installs, while iOS converts at 14% higher basket size. Prioritize premium specialty campaigns on iOS.
              </p>
            </div>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.18)', border: '1px solid var(--border, rgba(255,255,255,0.06))', borderRadius: '10px', padding: '12px', display: 'flex', gap: '10px' }}>
            <div style={{ fontSize: '20px' }}>🩺</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '12px', marginBottom: '3px' }}>Consultation to Pharmacy Flywheel</div>
              <p style={{ margin: 0, fontSize: '11px', color: 'var(--muted-foreground, #94a3b8)', lineHeight: 1.45 }}>
                78% of completed vet consultations result in pharmacy orders within 48 hours. Bundle consultation with instant medication delivery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
