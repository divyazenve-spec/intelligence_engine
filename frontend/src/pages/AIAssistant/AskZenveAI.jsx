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
      q: 'Why did sales drop in Delhi NCR over the past 7 days?',
      a: 'Sales Drop Intelligence (Delhi NCR • 7D): Analysis of transactional logs indicates a net revenue contraction of ₹14.8 Lakh (-22.4% drop) across 342 → 265 (-77) orders.',
      nlpMeta: {
        intent: 'SALES DROP',
        entities: ['Delhi NCR', '7D'],
        grounding: 'ERP & Live BI Telemetry',
        confidence: '99.2%'
      },
      kpis: [
        { label: 'Revenue Drop', val: '-₹14.8 Lakh', status: 'danger' },
        { label: 'Drop Percentage', val: '-22.4%', status: 'danger' },
        { label: 'Order Volume', val: '342 → 265 (-77)', status: 'warn' },
        { label: 'Time Window', val: '7D', status: 'info' }
      ],
      insights: [
        'Primary Root Cause: 48h cold-chain stockout on Emergency Care & broad-spectrum Rx antibiotics + peak hour 60-min delivery SLA breaches.',
        'Diagnostic Finding: Peak revenue loss was concentrated during evening order surges (5 PM – 10 PM) where unfulfilled prescription demand prompted cart abandonment.',
        'AI Remediation: Execute emergency stock rebalance PO-8821 from Central Hub and activate rider surge incentives.'
      ],
      actions: [
        { label: '📊 View Sales Drop Dashboard', hash: '#overview', scrollTarget: 'ai', primary: true },
        { label: '📦 Approve Stock Rebalance PO-8821', actionId: 'po_8821' },
        { label: '🚚 Inspect 60-Min Delivery SLA', hash: '#logistics-dashboard' }
      ],
      followups: [
        'Why did sales drop in Mumbai?',
        'Break down Delhi sales by time of day',
        'Show inventory stockout impact in Delhi'
      ],
      time: 'Just now',
      confidence: '99.2%'
    },
    {
      q: 'Which clinic generated the highest EBITDA this month?',
      a: 'EBITDA & Financial Health: Consolidated operating EBITDA is currently ₹38.2 Lakh (20.7% margin), pacing +₹4.2L ahead of budget. Indiranagar Flagship generated the highest EBITDA contribution (₹16.4L, 26.2% margin) driven by high surgical throughput.',
      nlpMeta: {
        intent: 'EBITDA FINANCIALS',
        entities: ['Indiranagar Flagship', 'MTD'],
        grounding: 'ERP Verified',
        confidence: '98.8%'
      },
      kpis: [
        { label: 'EBITDA', val: '₹38.2L', status: 'success' },
        { label: 'EBITDA Margin', val: '20.7%', status: 'success' },
        { label: 'Top Hub EBITDA', val: '₹16.4L', status: 'info' },
        { label: 'Budget Delta', val: '+₹4.2L', status: 'success' }
      ],
      insights: [
        'Margin Optimization Vector: Eliminating intermediary distributor markups on top 20 Rx medications via direct manufacturer purchasing will recover an estimated ₹3.8L monthly EBITDA.',
        'Surgical Realization: Emergency weekend surgical suites in Indiranagar and Bandra yielded a 15% pricing premium with zero demand elasticity drop.'
      ],
      actions: [
        { label: '⚡ Open Revenue Intelligence', hash: '#revenue-intelligence', primary: true },
        { label: '🏥 Inspect Indiranagar Hub Performance', hash: '#clinics-hospitals-dashboard' }
      ],
      followups: [
        'Which clinic has the lowest EBITDA margin?',
        'What is our pharmacy gross margin breakdown?',
        'Simulate profit if logistics costs increase 8%'
      ],
      time: '10 mins ago',
      confidence: '98.8%'
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
    setHistory([]);
    setContext({ intent: 'GENERAL_OVERVIEW', location: null, timeframe: 'MTD' });
    setActionFeedback({});
  }

  const cardStyle = {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '22px 24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
  };

  return (
    <DashboardLayout
      category="AI Assistant"
      subcategory="Ask Zenve AI"
      title="Ask Zenve AI — Natural Language Intelligence"
      subtitle="Executive conversational interface powered by Free-Source Neural Reasoning Core and live BI telemetry"
      icon="💬"
      badge="Free-Source Neural Core Active"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="NLP Pipeline Latency" value="18 ms" delta="Zero Cloud Cost" trend="up" subtext="In-browser neural inference" icon="⚡" />
        <KpiCard label="Grounding Accuracy" value="99.6%" delta="Zero Hallucination" trend="up" subtext="Direct ERP record links" icon="🎯" />
        <KpiCard label="Executive Queries (MTD)" value="2,480" delta="+34% MoM" trend="up" subtext="Leadership adoption" icon="💡" />
        <KpiCard label="Autonomous Actions Taken" value="384" delta="96% Success" trend="up" subtext="Workflow triggers" icon="🤖" />
      </div>

      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', paddingBottom: '10px', borderBottom: '1px solid #f1f5f9' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#1e293b' }}>Zenve Free-Source Neural Reasoning Core</span>
            <span style={{ fontSize: '10px', padding: '2px 7px', borderRadius: '4px', background: '#ede9fe', color: '#6d28d9', fontWeight: 700 }}>100% Free • Zero API Costs</span>
          </div>
          <button
            type="button"
            onClick={resetChat}
            style={{
              padding: '4px 10px',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              background: '#f8fafc',
              color: '#475569',
              fontSize: '11px',
              fontWeight: 600,
              cursor: 'pointer'
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
            placeholder="Ask Zenve AI any question (e.g. 'Why did sales drop in Delhi NCR?', 'Which clinic has highest EBITDA?', 'Check Bravecto inventory')..."
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              fontSize: '13px',
              outline: 'none',
              background: '#f8fafc',
              color: '#0f172a'
            }}
          />
          <button
            type="submit"
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              background: '#4f46e5',
              color: '#ffffff',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Ask AI →
          </button>
        </form>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', display: 'inline-flex', alignItems: 'center' }}>Suggested Executive Prompts:</span>
          {[
            'Why did sales drop in Delhi NCR?',
            'Which clinic generated the highest EBITDA this month?',
            'What is the forecast for Bravecto chewables inventory?',
            'Identify top 3 drivers of customer churn in Q3.',
            'Simulate net profit if logistics dispatch cost increases by 8%.'
          ].map(pill => (
            <button
              key={pill}
              type="button"
              onClick={() => executeAiQuery(pill)}
              style={{
                padding: '6px 12px',
                borderRadius: '16px',
                border: '1px solid #e0e7ff',
                background: '#eef2ff',
                color: '#4338ca',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              💡 {pill}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {history.length === 0 ? (
            <div style={{ padding: '30px', textAlign: 'center', color: '#64748b', fontSize: '13px', background: '#f8fafc', borderRadius: '10px' }}>
              Conversation reset. Ask any strategic or operational question above.
            </div>
          ) : (
            history.map((h, i) => (
              <div key={i} style={{ padding: '18px 20px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#0f172a' }}>👤 Q: {h.q}</span>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>{h.time} · Conf: <b style={{ color: '#059669' }}>{h.confidence}</b></span>
                </div>

                {h.nlpMeta && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center', marginBottom: '10px', paddingBottom: '8px', borderBottom: '1px dashed #cbd5e1' }}>
                    <span style={{ padding: '2px 7px', borderRadius: '4px', background: '#ede9fe', color: '#6d28d9', fontSize: '10px', fontWeight: 700, fontFamily: 'monospace' }}>
                      ⚡ {h.nlpMeta.intent}
                    </span>
                    {(h.nlpMeta.entities || []).map((ent, ei) => (
                      <span key={ei} style={{ padding: '2px 7px', borderRadius: '4px', background: '#e0f2fe', color: '#0369a1', fontSize: '10px', fontWeight: 600, fontFamily: 'monospace' }}>
                        🏷️ {ent}
                      </span>
                    ))}
                    <span style={{ padding: '2px 7px', borderRadius: '4px', background: '#ecfdf5', color: '#059669', fontSize: '10px', fontWeight: 600 }}>
                      🛡️ {h.nlpMeta.grounding || 'ERP Verified'}
                    </span>
                  </div>
                )}

                <p style={{ margin: '0 0 10px 0', fontSize: '13px', lineHeight: '1.6', color: '#1e293b', whiteSpace: 'pre-line' }}>{h.a}</p>

                {h.kpis && h.kpis.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', margin: '12px 0 10px' }}>
                    {h.kpis.map((k, ki) => {
                      const isDanger = k.status === 'danger';
                      const isSuccess = k.status === 'success';
                      const isWarn = k.status === 'warn';
                      return (
                        <div
                          key={ki}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '8px',
                            border: `1px solid ${isDanger ? '#fecaca' : isSuccess ? '#a7f3d0' : isWarn ? '#fde68a' : '#c7d2fe'}`,
                            background: isDanger ? '#fef2f2' : isSuccess ? '#ecfdf5' : isWarn ? '#fffbeb' : '#eef2ff',
                            minWidth: '95px'
                          }}
                        >
                          <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.4px', display: 'block' }}>
                            {k.label}
                          </span>
                          <span style={{ fontSize: '13px', fontWeight: 700, color: isDanger ? '#b91c1c' : isSuccess ? '#059669' : isWarn ? '#d97706' : '#4f46e5', fontFamily: 'monospace' }}>
                            {k.val}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {h.insights && h.insights.length > 0 && (
                  <ul style={{ margin: '8px 0 12px 18px', padding: 0, color: '#334155', fontSize: '12.5px', lineHeight: '1.6' }}>
                    {h.insights.map((ins, ii) => (
                      <li key={ii} style={{ marginBottom: '4px' }}>{ins}</li>
                    ))}
                  </ul>
                )}

                {h.actions && h.actions.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px', paddingTop: '10px', borderTop: '1px solid #e2e8f0' }}>
                    {h.actions.map((act, ai) => (
                      <button
                        key={ai}
                        type="button"
                        onClick={() => handleActionClick(act, i)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          fontSize: '11.5px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          border: act.primary ? '1px solid #4f46e5' : '1px solid #cbd5e1',
                          background: act.primary ? '#4f46e5' : '#ffffff',
                          color: act.primary ? '#ffffff' : '#1e293b'
                        }}
                      >
                        {act.label}
                      </button>
                    ))}
                  </div>
                )}

                {actionFeedback[i] && (
                  <div style={{ marginTop: '8px', padding: '8px 12px', borderRadius: '6px', background: '#ecfdf5', border: '1px solid #a7f3d0', color: '#065f46', fontSize: '12px', fontWeight: 600 }}>
                    ✅ {actionFeedback[i]}
                  </div>
                )}

                {h.followups && h.followups.length > 0 && (
                  <div style={{ marginTop: '12px', padding: '8px 12px', borderRadius: '8px', background: '#ffffff', border: '1px dashed #cbd5e1', display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', marginRight: '4px' }}>💡 Drill-down:</span>
                    {h.followups.map((f, fi) => (
                      <button
                        key={fi}
                        type="button"
                        onClick={() => executeAiQuery(f)}
                        style={{
                          padding: '4px 10px',
                          borderRadius: '12px',
                          background: '#f8fafc',
                          border: '1px solid #cbd5e1',
                          fontSize: '11px',
                          color: '#475569',
                          cursor: 'pointer',
                          fontWeight: 500
                        }}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
