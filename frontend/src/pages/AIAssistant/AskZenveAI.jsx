import React, { useState, useRef, useEffect } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import { generateResponse } from '../../utils/zenveNlpLlm';

export default function AskZenveAI() {
  const [query, setQuery] = useState('');
  const [context, setContext] = useState({ intent: 'GENERAL_OVERVIEW', location: null, timeframe: 'MTD' });
  const [isTyping, setIsTyping] = useState(false);
  const [history, setHistory] = useState([
    {
      role: 'ai',
      text: "Hello! 🐾 I'm **Dr. Zenve**, your dedicated Pet Healthcare & Business Intelligence assistant.\n\nI can help you with questions about our pet patients, hospital operations, pharmacy inventory, sales performance, logistics, and general pet health care.\n\nFeel free to ask me anything!",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isTyping]);

  function handleAsk(e) {
    if (e && e.preventDefault) e.preventDefault();
    if (!query.trim()) return;
    const userQuery = query.trim();
    setQuery('');

    // Add user message
    const userMsg = {
      role: 'user',
      text: userQuery,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setHistory(prev => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate brief thinking delay for natural feel
    setTimeout(() => {
      const aiResp = generateResponse(userQuery, context);
      setContext(aiResp.context);

      const aiMsg = {
        role: 'ai',
        text: aiResp.text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setHistory(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 400 + Math.random() * 600);
  }

  function resetChat() {
    setHistory([
      {
        role: 'ai',
        text: "Chat reset. 🐾 I'm ready for your next question! Ask me about pet demographics, sales analysis, clinic performance, inventory status, or pet health care.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setContext({ intent: 'GENERAL_OVERVIEW', location: null, timeframe: 'MTD' });
    setIsTyping(false);
    inputRef.current?.focus();
  }

  function handleQuickPrompt(prompt) {
    setQuery('');
    const userMsg = {
      role: 'user',
      text: prompt,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setHistory(prev => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const aiResp = generateResponse(prompt, context);
      setContext(aiResp.context);
      const aiMsg = {
        role: 'ai',
        text: aiResp.text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setHistory(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 400 + Math.random() * 600);
  }

  /* ── Markdown-like text renderer ── */
  function renderFormattedText(text) {
    if (!text) return null;
    const lines = text.split('\n');
    const elements = [];
    let key = 0;

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];

      // Skip empty lines but add spacing
      if (line.trim() === '') {
        elements.push(<div key={key++} style={{ height: '8px' }} />);
        continue;
      }

      // Bold inline conversion: **text** → <strong>
      const parts = [];
      const boldRe = /\*\*(.+?)\*\*/g;
      let lastIdx = 0;
      let match;
      while ((match = boldRe.exec(line)) !== null) {
        if (match.index > lastIdx) {
          parts.push(line.slice(lastIdx, match.index));
        }
        parts.push(<strong key={`b${key++}`} style={{ fontWeight: 700, color: '#0f172a' }}>{match[1]}</strong>);
        lastIdx = match.index + match[0].length;
      }
      if (lastIdx < line.length) {
        parts.push(line.slice(lastIdx));
      }

      const content = parts.length > 0 ? parts : line;

      // Bullet lines
      if (/^\s*[•\-]\s/.test(line)) {
        const bulletText = line.replace(/^\s*[•\-]\s*/, '');
        // Re-parse bold in bullet
        const bParts = [];
        let bLast = 0;
        let bMatch;
        const bRe = /\*\*(.+?)\*\*/g;
        while ((bMatch = bRe.exec(bulletText)) !== null) {
          if (bMatch.index > bLast) bParts.push(bulletText.slice(bLast, bMatch.index));
          bParts.push(<strong key={`bb${key++}`} style={{ fontWeight: 700, color: '#0f172a' }}>{bMatch[1]}</strong>);
          bLast = bMatch.index + bMatch[0].length;
        }
        if (bLast < bulletText.length) bParts.push(bulletText.slice(bLast));

        const indent = line.match(/^\s*/)[0].length;
        elements.push(
          <div key={key++} style={{
            display: 'flex',
            gap: '8px',
            paddingLeft: indent > 2 ? '20px' : '4px',
            marginBottom: '4px',
            lineHeight: '1.65'
          }}>
            <span style={{ color: '#10b981', fontWeight: 700, flexShrink: 0 }}>•</span>
            <span>{bParts.length > 0 ? bParts : bulletText}</span>
          </div>
        );
      } else {
        elements.push(
          <div key={key++} style={{ lineHeight: '1.7', marginBottom: '3px' }}>
            {content}
          </div>
        );
      }
    }
    return elements;
  }

  /* ── Quick suggestion prompts ── */
  const quickPrompts = [
    'How many dogs vs cats do we have?',
    'Why did sales drop in Delhi NCR?',
    'What is our Bravecto inventory status?',
    'What is our consolidated EBITDA?',
    'What is the vaccine schedule for puppies?',
    'Is chocolate bad for dogs?'
  ];

  return (
    <DashboardLayout
      category="AI Assistant"
      subcategory="Ask Zenve AI"
      title="Ask Zenve AI"
      subtitle="Your intelligent pet healthcare and business assistant"
      icon="🐾"
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 180px)',
        background: '#ffffff',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 24px rgba(15, 23, 42, 0.04)',
        overflow: 'hidden'
      }}>
        {/* ─── Chat Header ─── */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 22px',
          borderBottom: '1px solid #f1f5f9',
          background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 50%, #f0f9ff 100%)',
          flexShrink: 0
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)'
            }}>
              🐾
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', fontFamily: '"Sora", sans-serif' }}>
                Dr. Zenve AI
              </div>
              <div style={{ fontSize: '11.5px', color: '#059669', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#10b981',
                  display: 'inline-block',
                  animation: 'pulse 2s ease-in-out infinite'
                }} />
                Online · Pet Healthcare Intelligence
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={resetChat}
            style={{
              padding: '7px 14px',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
              background: '#ffffff',
              color: '#475569',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              fontFamily: '"Manrope", sans-serif'
            }}
            onMouseEnter={e => { e.target.style.background = '#f8fafc'; e.target.style.borderColor = '#94a3b8'; }}
            onMouseLeave={e => { e.target.style.background = '#ffffff'; e.target.style.borderColor = '#d1d5db'; }}
          >
            Clear Chat
          </button>
        </div>

        {/* ─── Chat Messages Area ─── */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px 22px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          background: '#fafbfc'
        }}>
          {history.map((msg, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                gap: '10px',
                animation: 'fadeInUp 0.3s ease-out'
              }}
            >
              {/* AI Avatar */}
              {msg.role === 'ai' && (
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '15px',
                  flexShrink: 0,
                  marginTop: '2px',
                  boxShadow: '0 2px 6px rgba(16, 185, 129, 0.2)'
                }}>
                  🐾
                </div>
              )}

              {/* Message Bubble */}
              <div style={{
                maxWidth: msg.role === 'user' ? '70%' : '80%',
                padding: '14px 18px',
                borderRadius: msg.role === 'user'
                  ? '16px 16px 4px 16px'
                  : '16px 16px 16px 4px',
                background: msg.role === 'user'
                  ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                  : '#ffffff',
                color: msg.role === 'user' ? '#ffffff' : '#334155',
                fontSize: '13.5px',
                lineHeight: '1.7',
                boxShadow: msg.role === 'user'
                  ? '0 2px 10px rgba(16, 185, 129, 0.25)'
                  : '0 1px 6px rgba(15, 23, 42, 0.06)',
                border: msg.role === 'user' ? 'none' : '1px solid #f1f5f9',
                fontFamily: '"Manrope", sans-serif'
              }}>
                {msg.role === 'ai' ? renderFormattedText(msg.text) : msg.text}
                <div style={{
                  fontSize: '10px',
                  color: msg.role === 'user' ? 'rgba(255,255,255,0.7)' : '#94a3b8',
                  marginTop: '8px',
                  textAlign: msg.role === 'user' ? 'right' : 'left',
                  fontWeight: 500
                }}>
                  {msg.time}
                </div>
              </div>

              {/* User Avatar */}
              {msg.role === 'user' && (
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  flexShrink: 0,
                  marginTop: '2px',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontFamily: '"Sora", sans-serif',
                  boxShadow: '0 2px 6px rgba(37, 99, 235, 0.2)'
                }}>
                  You
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div style={{ display: 'flex', gap: '10px', animation: 'fadeInUp 0.3s ease-out' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '15px',
                flexShrink: 0,
                boxShadow: '0 2px 6px rgba(16, 185, 129, 0.2)'
              }}>
                🐾
              </div>
              <div style={{
                padding: '14px 20px',
                borderRadius: '16px 16px 16px 4px',
                background: '#ffffff',
                border: '1px solid #f1f5f9',
                boxShadow: '0 1px 6px rgba(15, 23, 42, 0.06)',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}>
                <span className="zenve-typing-dot" style={{ animationDelay: '0s' }} />
                <span className="zenve-typing-dot" style={{ animationDelay: '0.15s' }} />
                <span className="zenve-typing-dot" style={{ animationDelay: '0.3s' }} />
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* ─── Quick Suggestions (only show when few messages) ─── */}
        {history.length <= 2 && (
          <div style={{
            padding: '10px 22px 0',
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            borderTop: '1px solid #f1f5f9',
            background: '#ffffff',
            flexShrink: 0
          }}>
            <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, display: 'flex', alignItems: 'center', marginRight: '4px' }}>
              Try asking:
            </span>
            {quickPrompts.map((p, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleQuickPrompt(p)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '16px',
                  border: '1px solid #e2e8f0',
                  background: '#f8fafc',
                  color: '#475569',
                  fontSize: '11.5px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  fontFamily: '"Manrope", sans-serif'
                }}
                onMouseEnter={e => { e.target.style.background = '#ecfdf5'; e.target.style.borderColor = '#a7f3d0'; e.target.style.color = '#047857'; }}
                onMouseLeave={e => { e.target.style.background = '#f8fafc'; e.target.style.borderColor = '#e2e8f0'; e.target.style.color = '#475569'; }}
              >
                {p}
              </button>
            ))}
          </div>
        )}

        {/* ─── Input Bar ─── */}
        <form
          onSubmit={handleAsk}
          style={{
            display: 'flex',
            gap: '10px',
            padding: '14px 22px',
            borderTop: '1px solid #f1f5f9',
            background: '#ffffff',
            alignItems: 'center',
            flexShrink: 0
          }}
        >
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Ask Dr. Zenve about pets, sales, clinics, inventory..."
            disabled={isTyping}
            style={{
              flex: 1,
              padding: '12px 18px',
              borderRadius: '12px',
              border: '1.5px solid #e2e8f0',
              fontSize: '13.5px',
              outline: 'none',
              background: '#f8fafc',
              color: '#0f172a',
              fontFamily: '"Manrope", sans-serif',
              transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
            }}
            onFocus={e => {
              e.target.style.borderColor = '#10b981';
              e.target.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
              e.target.style.background = '#ffffff';
            }}
            onBlur={e => {
              e.target.style.borderColor = '#e2e8f0';
              e.target.style.boxShadow = 'none';
              e.target.style.background = '#f8fafc';
            }}
          />
          <button
            type="submit"
            disabled={isTyping || !query.trim()}
            style={{
              padding: '12px 24px',
              borderRadius: '12px',
              border: 'none',
              background: (isTyping || !query.trim())
                ? '#cbd5e1'
                : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: '#ffffff',
              fontSize: '13.5px',
              fontWeight: 700,
              cursor: (isTyping || !query.trim()) ? 'not-allowed' : 'pointer',
              boxShadow: (isTyping || !query.trim()) ? 'none' : '0 3px 12px rgba(16, 185, 129, 0.3)',
              transition: 'all 0.2s ease',
              fontFamily: '"Manrope", sans-serif',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap'
            }}
          >
            Send
            <span style={{ fontSize: '16px' }}>→</span>
          </button>
        </form>
      </div>

      {/* ─── Inline CSS for animations ─── */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0.4; }
        }
        .zenve-typing-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #10b981;
          display: inline-block;
          animation: typingBounce 1.2s ease-in-out infinite;
        }
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30%            { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </DashboardLayout>
  );
}
