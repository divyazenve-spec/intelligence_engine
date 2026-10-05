import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function AskZenveAI() {
  const [query, setQuery] = useState('');
  const [history, setHistory] = useState([
    {
      q: 'What are the top 3 margin expansion opportunities for Q4?',
      a: '1. Direct procurement integration with Zoetis & Boehringer can eliminate 5-7% intermediary distributor markups on top 20 Rx pharmaceuticals.\n2. Increase private-label pet nutrition subscription penetration from 6% to 12% in Bengaluru, raising gross margin to 44%.\n3. Implement dynamic pricing on emergency surgical suites during peak Friday-Sunday triage hours (+15% realization with zero demand drop).',
      time: '10 mins ago',
      confidence: '98.4%'
    },
    {
      q: 'Which customer cohort has the highest 90-day churn risk?',
      a: 'Single-purchase puppy nutrition buyers from Google Ads in Delhi NCR who did not book an initial 45-day vaccination check-up (churn probability: 42.6%). Recommended action: Trigger automated WhatsApp reminder offering free initial dental inspection with Dr. Aisha Khan.',
      time: '1 hour ago',
      confidence: '96.1%'
    }
  ]);

  function handleAsk(e) {
    e.preventDefault();
    if (!query.trim()) return;
    const newEntry = {
      q: query,
      a: `Analyzing enterprise telemetry for "${query}"... Based on MTD transactional records across 14 facilities and 12,480 pet parents: Operations remain within normal parameters (+18.4% WoW revenue velocity). Recommendation: Optimize regional safety stock in Koramangala hub.`,
      time: 'Just now',
      confidence: '97.8%'
    };
    setHistory([newEntry, ...history]);
    setQuery('');
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
      subtitle="Executive conversational interface powered by enterprise Gemini multimodal reasoning and live BI data feeds"
      icon="💬"
      badge="Gemini 1.5 Pro Connected"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="LLM Response Latency" value="480 ms" delta="Sub-second" trend="up" subtext="Optimized inference" icon="⚡" />
        <KpiCard label="Grounding Accuracy" value="99.4%" delta="Zero Hallucination" trend="up" subtext="Verified SQL telemetry" icon="🎯" />
        <KpiCard label="Executive Queries (MTD)" value="2,480" delta="+34% MoM" trend="up" subtext="Leadership adoption" icon="💡" />
        <KpiCard label="Automated Actions Taken" value="384" delta="96% Success" trend="up" subtext="Workflow triggers" icon="🤖" />
      </div>

      <div style={cardStyle}>
        <form onSubmit={handleAsk} style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Ask any executive question (e.g. 'Compare clinic profitability between Mumbai and Bengaluru', 'Forecast inventory for Bravecto')..."
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
            Ask AI
          </button>
        </form>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
          {['Forecast Bravecto demand in Bengaluru', 'Analyze clinic margin variance MTD', 'Top 5 high-LTV customer clusters', 'Doctor utilization report'].map(pill => (
            <button
              key={pill}
              type="button"
              onClick={() => setQuery(pill)}
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

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {history.map((h, i) => (
            <div key={i} style={{ padding: '16px 18px', borderRadius: '10px', border: '1px solid #e2e8f0', background: '#f8fafc' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Q: {h.q}</span>
                <span style={{ fontSize: '11px', color: '#64748b' }}>{h.time} · Conf: <b style={{ color: '#059669' }}>{h.confidence}</b></span>
              </div>
              <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.6', color: '#334155', whiteSpace: 'pre-line' }}>{h.a}</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
