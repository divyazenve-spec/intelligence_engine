import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';

export default function CustomerComplaints() {
  const tickets = [
    { ticketId: 'TICK-4401', customer: 'Sneha Kulkarni', pet: 'Whiskey', category: 'Delivery Delay', issue: '60-min delivery arrived in 78 mins due to rain', agent: 'Kiran R.', sla: 'Resolved (12 mins)', resolution: 'Full delivery fee waiver + ₹200 wallet credit', status: 'Closed' },
    { ticketId: 'TICK-4402', customer: 'Vikram Malhotra', pet: 'Leo', category: 'Product Packaging', issue: 'Slight tear in 15kg kibble outer plastic bag', agent: 'Aisha S.', sla: 'Resolved (18 mins)', resolution: 'Replacement bag dispatched via instant rider', status: 'Closed' },
    { ticketId: 'TICK-4403', customer: 'Priya Sundaram', pet: 'Bella', category: 'Billing Query', issue: 'Loyalty points not credited after vet consult', agent: 'Kiran R.', sla: 'Resolved (5 mins)', resolution: '840 points credited manually with bonus 100', status: 'Closed' },
    { ticketId: 'TICK-4404', customer: 'Rahul Nambiar', pet: 'Simba', category: 'Appointment Reschedule', issue: 'Requested slot shift from morning to evening OPD', agent: 'Rahul B.', sla: 'In Progress', resolution: 'Awaiting confirmation with Dr. Siddharth', status: 'Investigating' },
    { ticketId: 'TICK-4405', customer: 'Alok Bhattacharya', pet: 'Max', category: 'App Bug', issue: 'Digital vaccination passport PDF download failed', agent: 'Tech L2', sla: 'Resolved (22 mins)', resolution: 'Bug fixed, passport emailed directly', status: 'Closed' }
  ];

  const cardStyle = { background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: '12px', padding: '22px 24px' };

  return (
    <DashboardLayout
      category="Customers 360°"
      subcategory="Customer Service & Resolution"
      title="Customer Complaints & Grievance Resolution"
      subtitle="Support ticket turnaround time, CSAT ratings, First-Contact Resolution (FCR), and root-cause analysis"
      icon="⚠️"
      badge="98.2% Resolved Under SLA"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard label="Total Grievance Tickets" value="18 Tickets" delta="-24% vs last month" trend="up" subtext="Only 0.06% of total orders" icon="⚠️" />
        <KpiCard label="First Contact Resolution" value="94.2%" delta="+3.1% MoM" trend="up" subtext="Resolved in initial interaction" icon="⚡" />
        <KpiCard label="Avg. Resolution Time" value="14.8 mins" delta="-4.2 mins vs FY25" trend="up" subtext="24/7 dedicated support team" icon="⏱️" />
        <KpiCard label="Post-Resolution CSAT" value="4.88 / 5.0" delta="High customer delight" trend="up" subtext="98% satisfied with outcome" icon="⭐" />
      </div>

      <div style={cardStyle}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: 'var(--foreground, #0f172a)' }}>⚠️ Live Customer Support & Grievance Register</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border, #e2e8f0)', textAlign: 'left', color: 'var(--muted-foreground, #475569)' }}>
                <th style={{ padding: '10px' }}>Ticket ID</th>
                <th style={{ padding: '10px' }}>Pet Parent</th>
                <th style={{ padding: '10px' }}>Category</th>
                <th style={{ padding: '10px' }}>Grievance Description</th>
                <th style={{ padding: '10px' }}>Assigned Rep</th>
                <th style={{ padding: '10px' }}>Resolution Turnaround</th>
                <th style={{ padding: '10px' }}>Outcome / Compensation</th>
                <th style={{ padding: '10px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((t, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border, #f1f5f9)', color: 'var(--foreground, #0f172a)' }}>
                  <td style={{ padding: '10px', fontFamily: 'monospace', fontWeight: 600 }}>{t.ticketId}</td>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{t.customer}</td>
                  <td style={{ padding: '10px' }}><span style={{ padding: '2px 6px', background: '#fef2f2', color: '#b91c1c', borderRadius: '4px', fontWeight: 600 }}>{t.category}</span></td>
                  <td style={{ padding: '10px', color: '#475569' }}>{t.issue}</td>
                  <td style={{ padding: '10px', color: '#64748b' }}>{t.agent}</td>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{t.sla}</td>
                  <td style={{ padding: '10px', color: '#059669', fontWeight: 600 }}>{t.resolution}</td>
                  <td style={{ padding: '10px' }}>
                    <span style={{ padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, background: t.status === 'Closed' ? '#f0fdf4' : '#fffbeb', color: t.status === 'Closed' ? '#16a34a' : '#b45309' }}>
                      {t.status}
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
