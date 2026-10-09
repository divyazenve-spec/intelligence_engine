import React, { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function FashionShowrooms() {
  const showrooms = [];

  const inStoreExperiences = [];

  const card = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(255,255,255,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Zenve Fashion"
      subcategory="Flagship Showrooms"
      title="Flagship Pet Couture Showrooms & Experience Centers"
      subtitle="Physical boutique performance, in-store trial room conversions, pet footfall, and retail revenue per square foot"
      icon="🛍️"
      badge=""
      actions={
        <button onClick={() => alert('Scheduling Private Boutique VIP Styling Event...')} style={{ padding: '6px 14px', borderRadius: '8px', border: '1px solid #ec4899', background: 'rgba(236,72,153,0.15)', color: '#f472b6', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
          ✨ VIP Showroom Event
        </button>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Showroom Revenue (MTD)" value="₹0" delta="0.0%" trend="neutral" subtext="No active records" icon="🛍️" />
        <KpiCard label="Pet Footfall (MTD)" value="0 Pets" delta="0.0%" trend="neutral" subtext="No active records" icon="🐾" />
        <KpiCard label="Dressing Room Trials" value="0 Trials" delta="0.0%" trend="neutral" subtext="No active records" icon="👗" />
        <KpiCard label="Avg. Revenue per Sq Ft" value="₹0 / sqft" delta="₹0" trend="neutral" subtext="No active records" icon="📐" />
        <KpiCard label="On-Spot Customization" value="0 Orders" delta="" trend="neutral" subtext="No active records" icon="✨" />
        <KpiCard label="Showroom Client Rating" value="0.0 ★" delta="Based on 0 reviews" trend="neutral" subtext="No active records" icon="⭐" />
      </div>

      {/* Boutique Experience Features */}
      <div style={card}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>✨ Signature In-Boutique Client Experiences</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
          {inStoreExperiences.length === 0 ? (
            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--muted-foreground, #64748b)', fontSize: '13px', gridColumn: '1 / -1' }}>
              No signature in-boutique client experiences recorded
            </div>
          ) : (
            inStoreExperiences.map((exp, i) => (
              <div key={i} style={{ background: 'rgba(0,0,0,0.22)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>{exp.icon} {exp.title}</span>
                </div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#f472b6', marginBottom: '6px' }}>{exp.stat}</div>
                <p style={{ margin: 0, fontSize: '11px', color: 'var(--muted-foreground, #64748b)', lineHeight: 1.5 }}>{exp.desc}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Showroom Table */}
      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>🛍️ Showroom Performance Matrix</h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--muted-foreground, #64748b)' }}>Footfall conversion, sales volume, and retail square footage efficiency</p>
          </div>
        </div>

        <div style={{ overflowX: 'auto', margin: '0 -24px -22px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'var(--muted, #f8fafc)', borderBottom: '1px solid var(--border, rgba(0,0,0,0.08))' }}>
                {['ID', 'Showroom Name', 'City & Hub Area', 'Sq. Ft', 'Pet Footfall', 'Trials', 'Sales MTD', 'Rev / Sq Ft', 'Conversion', 'Avg Ticket', 'Lead Stylist', 'Rating'].map(h => (
                  <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: 'var(--muted-foreground, #64748b)', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {showrooms.length === 0 ? (
                <tr>
                  <td colSpan={12} style={{ padding: '28px 12px', textAlign: 'center', color: 'var(--muted-foreground, #64748b)' }}>
                    No showroom performance records found
                  </td>
                </tr>
              ) : (
                showrooms.map((s, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border, rgba(0,0,0,0.06))' }}>
                    <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', color: '#f472b6', fontSize: '11px' }}>{s.id}</td>
                    <td style={{ padding: '11px 12px', fontWeight: 600, color: 'var(--foreground, #0f172a)' }}>{s.name}</td>
                    <td style={{ padding: '11px 12px', color: 'var(--foreground, #334155)' }}>{s.area}, {s.city}</td>
                    <td style={{ padding: '11px 12px', color: 'var(--muted-foreground, #64748b)' }}>{s.sqft} sqft</td>
                    <td style={{ padding: '11px 12px', color: 'var(--foreground, #0f172a)', fontWeight: 600 }}>{s.footfall}</td>
                    <td style={{ padding: '11px 12px', color: '#a78bfa' }}>{s.trials}</td>
                    <td style={{ padding: '11px 12px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#34d399' }}>{s.sales}</td>
                    <td style={{ padding: '11px 12px', color: '#38bdf8', fontWeight: 600 }}>{s.revPerSqft}</td>
                    <td style={{ padding: '11px 12px', color: '#34d399', fontWeight: 700 }}>{s.conversion}</td>
                    <td style={{ padding: '11px 12px', color: 'var(--foreground, #334155)' }}>{s.avgTicket}</td>
                    <td style={{ padding: '11px 12px', color: 'var(--muted-foreground, #64748b)' }}>{s.leadStylist}</td>
                    <td style={{ padding: '11px 12px' }}><span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, background: 'rgba(251,191,36,0.15)', color: '#fbbf24' }}>{s.rating}</span></td>
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
