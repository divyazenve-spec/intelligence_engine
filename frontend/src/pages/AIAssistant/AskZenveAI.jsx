import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';
import { generateResponse } from '../../utils/zenveNlpLlm';

export default function AskZenveAI() {
  const [query, setQuery] = useState('');
  const [context, setContext] = useState({ intent: 'GENERAL_OVERVIEW', location: null, timeframe: 'MTD' });
  const [actionFeedback, setActionFeedback] = useState({});
  const [history, setHistory] = useState([
    {
      q: 'System Initialized',
      a: "Hello! 🐾 I am **Dr. Zenve**, your dedicated Veterinary Healthcare & Executive Intelligence Copilot. I'm connected in real time to our 14 pet hospitals, patient health records (28,450 pets), e-pharmacy stock ledgers, and hyper-local 60-minute logistics fleet. Ask me anything about our pet patients, sales drops, clinic EBITDA, or pet health care!",
      nlpMeta: {
        intent: 'PET INTELLIGENCE ONLINE',
        entities: ['14 Hospital Hubs', '28,450 Pets', 'E-Pharmacy Ledgers'],
        grounding: 'Veterinary Telemetry & Live ERP',
        confidence: '100%'
      },
      kpis: [
        { label: 'Active Pets', val: '28,450 Pets', status: 'info' },
        { label: 'Network EBITDA', val: '₹38.2L (20.7%)', status: 'success' },
        { label: 'Surgical Success', val: '99.4%', status: 'success' },
        { label: '60-Min SLA', val: '97.6%', status: 'success' }
      ],
      time: 'Online',
      confidence: '100%',
      followups: [
        'Show dog vs cat patient split',
        'Why did sales drop in Delhi NCR?',
        'Check Bravecto inventory status',
        'What is our consolidated EBITDA?'
      ]
    }
  ]);

  function handleAsk(e) {
    if (e && e.preventDefault) e.preventDefault();
    if (!query.trim()) return;
    executeAiQuery(query.trim());
  }

  function executeAiQuery(userQuery) {
    const aiResp = generateResponse(userQuery, context);
    setContext(aiResp.context);

    const newEntry = {
      q: userQuery,
      a: aiResp.text,
      nlpMeta: aiResp.nlpMeta,
      kpis: aiResp.kpis,
      insights: aiResp.insights,
      actions: aiResp.actions,
      followups: aiResp.followups,
      time: 'Just now',
      confidence: aiResp.nlpMeta.confidence
    };

    setHistory([newEntry, ...history]);
    setQuery('');
  }

  function handleActionClick(action, msgIdx) {
    if (action.hash) {
      window.location.hash = action.hash;
      if (action.scrollTarget) {
        setTimeout(() => {
          const el = document.getElementById(action.scrollTarget);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 150);
      }
    } else if (action.actionId === 'po_8821') {
      setActionFeedback(prev => ({
        ...prev,
        [msgIdx]: 'PO-8821 Approved: 60 Bravecto units dispatched from Central Hub to Koramangala. ETA: 4 Hours.'
      }));
    } else if (action.actionId === 'winback_whatsapp') {
      setActionFeedback(prev => ({
        ...prev,
        [msgIdx]: 'WhatsApp Campaign Dispatched: Complimentary dental triage vouchers delivered to 248 at-risk pet parents.'
      }));
    }
  }

  function resetChat() {
    setHistory([
      {
        q: 'Chat Reset',
        a: "Conversation reset. 🐾 Dr. Zenve is ready for your next prompt! Ask about Pet Care, Dog/Cat Demographics, Sales Drop, Clinic EBITDA, or E-Pharmacy Stock.",
        nlpMeta: {
          intent: 'PET INTELLIGENCE READY',
          entities: ['14 Hospital Hubs', '28,450 Pets'],
          grounding: 'Live Veterinary Telemetry',
          confidence: '99.9%'
        },
        kpis: [],
        time: 'Just now',
        confidence: '99.9%',
        followups: [
          'Show dog vs cat patient split',
          'Why did sales drop in Delhi NCR?',
          'Check Bravecto inventory status'
        ]
      }
    ]);
    setContext({ intent: 'GENERAL_OVERVIEW', location: null, timeframe: 'MTD' });
    setActionFeedback({});
  }

  const cardStyle = {
    background: '#ffffff',
    border: '1px solid #f1f5f9',
    borderRadius: '14px',
    padding: '24px 26px',
    boxShadow: '0 8px 30px -4px rgba(245, 158, 11, 0.08), 0 2px 8px rgba(15, 23, 42, 0.04)'
  };

  return (
    <DashboardLayout
      category="AI Assistant"
      subcategory="Ask Zenve AI"
      title="Dr. Zenve AI — Pet Healthcare & Executive Intelligence"
      subtitle="Interactive veterinary reasoning copilot grounded in 14 hospital hubs, 28,450 pet profiles, and live e-pharmacy ledgers"
      icon="🐾"
      badge="🐾 Pet-Trained Neural Core Active"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Active Pet Patients" value="28,450 Pets" delta="+14.6%" trend="up" subtext="62% Canine · 34% Feline" icon="🐾" />
        <KpiCard label="Hospital Hubs Online" value="14 Facilities" delta="100%" trend="up" subtext="81.4% ICU Bed Occupancy" icon="🏥" />
        <KpiCard label="Neural Inference Latency" value="18 ms" delta="Real-time" trend="up" subtext="Sub-second In-Browser Reasoning" icon="⚡" />
        <KpiCard label="Clinical Grounding" value="99.2%" delta="+0.4%" trend="up" subtext="14 Hospital Hubs & Live ERP" icon="🛡️" />
      </div>

      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', paddingBottom: '14px', borderBottom: '1.5px solid #fef3c7', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'radial-gradient(circle, #fef3c7 0%, #fde68a 100%)', border: '1.5px solid #f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
              🐾
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>Dr. Zenve Veterinary AI Copilot</span>
                <span style={{ fontSize: '10.5px', padding: '2px 8px', borderRadius: '99px', background: '#ecfdf5', color: '#047857', border: '1px solid #a7f3d0', fontWeight: 700 }}>
                  ● Neural Engine Online
                </span>
              </div>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 500, marginTop: '1px' }}>
                🐶 17.6k Dogs · 🐱 9.6k Cats · 🏥 14 Hospital Hubs · 💊 1,420 Pharmacy SKUs · 🚚 60-Min Express
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={resetChat}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              background: '#ffffff',
              color: '#475569',
              fontSize: '11.5px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            🧹 Reset Chat
          </button>
        </div>

        <form onSubmit={handleAsk} style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="🐾 Ask Dr. Zenve about pet health, clinic EBITDA, sales drops, dog vaccines, inventory..."
            style={{
              flex: 1,
              padding: '13px 18px',
              borderRadius: '10px',
              border: '1.5px solid #cbd5e1',
              fontSize: '13.5px',
              outline: 'none',
              background: '#ffffff',
              color: '#0f172a'
            }}
          />
          <button
            type="submit"
            style={{
              padding: '13px 26px',
              borderRadius: '10px',
              border: 'none',
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              color: '#ffffff',
              fontSize: '13.5px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 3px 10px rgba(217, 119, 6, 0.3)'
            }}
          >
            🐾 Ask AI →
          </button>
        </form>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '22px' }}>
          <span style={{ fontSize: '11.5px', fontWeight: 800, color: '#475569', display: 'inline-flex', alignItems: 'center' }}>
            🐾 Ask Dr. Zenve:
          </span>
          {[
            { label: '🐕 Dog vs Cat Census', q: 'How many dogs vs cats do we have?' },
            { label: '📉 Why did Delhi sales drop?', q: 'Why did sales drop in Delhi NCR?' },
            { label: '💊 Bravecto Stock Runway', q: 'What is our Bravecto inventory status?' },
            { label: '🩺 Dr. Aisha Surgery Cases', q: 'Who is Dr. Aisha Khan?' },
            { label: '🚚 60-Min Express Delivery', q: 'How is our 60 minute delivery performing?' },
            { label: '🐶 Puppy Vaccine Schedule', q: 'What is the vaccine schedule for puppies?' },
            { label: '🍫 Can dogs eat chocolate?', q: 'Is chocolate bad for dogs?' },
            { label: '💹 Highest EBITDA Clinic', q: 'Which clinic generated the highest EBITDA this month?' }
          ].map(item => (
            <button
              key={item.label}
              type="button"
              onClick={() => executeAiQuery(item.q)}
              style={{
                padding: '6px 14px',
                borderRadius: '20px',
                border: '1px solid #e2e8f0',
                background: '#ffffff',
                color: '#334155',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {history.map((h, i) => (
            <div
              key={i}
              style={{
                padding: '20px 22px',
                borderRadius: '14px',
                border: '1px solid #e2e8f0',
                borderLeft: '4px solid #10b981',
                background: '#ffffff',
                boxShadow: '0 2px 10px rgba(15, 23, 42, 0.04)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>
                  {h.q === 'System Initialized' || h.q === 'Chat Reset' ? '🐾 ' + h.q : '👤 Prompt: ' + h.q}
                </span>
                <span style={{ fontSize: '11px', color: '#64748b' }}>
                  {h.time} · Conf: <b style={{ color: '#059669' }}>{h.confidence}</b>
                </span>
              </div>

              {h.nlpMeta && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center', marginBottom: '12px', paddingBottom: '10px', borderBottom: '1px dashed #e2e8f0' }}>
                  <span style={{ padding: '3px 8px', borderRadius: '6px', background: '#ecfdf5', color: '#047857', border: '1px solid #a7f3d0', fontSize: '10.5px', fontWeight: 700, fontFamily: 'monospace' }}>
                    🐾 {h.nlpMeta.intent}
                  </span>
                  {(h.nlpMeta.entities || []).map((ent, ei) => (
                    <span key={ei} style={{ padding: '3px 8px', borderRadius: '6px', background: '#fef3c7', color: '#b45309', border: '1px solid #fde68a', fontSize: '10.5px', fontWeight: 600, fontFamily: 'monospace' }}>
                      🏷️ {ent}
                    </span>
                  ))}
                  <span style={{ padding: '3px 8px', borderRadius: '6px', background: '#f1f5f9', color: '#475569', fontSize: '10.5px', fontWeight: 600 }}>
                    🛡️ {h.nlpMeta.grounding || '14 Hospital Hubs'}
                  </span>
                </div>
              )}

              <p style={{ margin: '0 0 12px 0', fontSize: '13.5px', lineHeight: '1.7', color: '#1e293b', whiteSpace: 'pre-line' }}>
                {h.a}
              </p>

              {h.kpis && h.kpis.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', margin: '14px 0 12px' }}>
                  {h.kpis.map((k, ki) => {
                    const isDanger = k.status === 'danger';
                    const isSuccess = k.status === 'success';
                    const isWarn = k.status === 'warn';
                    return (
                      <div
                        key={ki}
                        style={{
                          padding: '7px 14px',
                          borderRadius: '8px',
                          border: isDanger ? '1px solid #fecaca' : isSuccess ? '1px solid #a7f3d0' : isWarn ? '1px solid #fde68a' : '1px solid #e2e8f0',
                          background: isDanger ? '#fef2f2' : isSuccess ? '#ecfdf5' : isWarn ? '#fffbeb' : '#f8fafc',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '2px'
                        }}
                      >
                        <span style={{ fontSize: '10.5px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                          {k.label}
                        </span>
                        <span style={{ fontSize: '13px', fontWeight: 800, color: isDanger ? '#b91c1c' : isSuccess ? '#047857' : isWarn ? '#b45309' : '#0f172a' }}>
                          {k.val}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              {h.actions && h.actions.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
                  {h.actions.map((act, ai) => (
                    <button
                      key={ai}
                      type="button"
                      onClick={() => handleActionClick(act, i)}
                      style={{
                        padding: '7px 14px',
                        borderRadius: '8px',
                        border: act.primary ? 'none' : '1px solid #cbd5e1',
                        background: act.primary ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : '#ffffff',
                        color: act.primary ? '#ffffff' : '#334155',
                        fontSize: '12px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        boxShadow: act.primary ? '0 2px 8px rgba(16, 185, 129, 0.3)' : 'none'
                      }}
                    >
                      {act.label}
                    </button>
                  ))}
                </div>
              )}

              {actionFeedback[i] && (
                <div style={{ marginTop: '10px', padding: '8px 14px', borderRadius: '6px', background: '#ecfdf5', border: '1px solid #a7f3d0', color: '#065f46', fontSize: '12px', fontWeight: 600 }}>
                  ✅ {actionFeedback[i]}
                </div>
              )}

              {h.followups && h.followups.length > 0 && (
                <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px dashed #e2e8f0', display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748b' }}>
                    🐾 Dr. Zenve Recommends Exploring:
                  </span>
                  {h.followups.map((f, fi) => (
                    <button
                      key={fi}
                      type="button"
                      onClick={() => executeAiQuery(f)}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '12px',
                        border: '1px solid #fef3c7',
                        background: '#fffdf7',
                        color: '#b45309',
                        fontSize: '11px',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
