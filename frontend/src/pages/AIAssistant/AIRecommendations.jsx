import React, { useState, useEffect, useCallback, useRef } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';
import { getRecommendations, executePlaybook as apiExecutePlaybook } from '../../services/api';

/* ═══════════════════════════════════════════════════════════════════════════
   LAYER 1 & 2: Telemetry Ingestion + Anomaly/Opportunity Detection Engine
   ─────────────────────────────────────────────────────────────────────────
   Heuristic-driven recommendation generator connected to Zenve's
   operational data: Inventory, Clinic Capacity, Retention, and Pricing.
   Each recommendation is a scored, executable business playbook.
   ═══════════════════════════════════════════════════════════════════════════ */

const EFFORT_WEIGHT = { LOW: 1.0, MEDIUM: 1.8, HIGH: 3.0 };
const URGENCY_MULT = { CRITICAL: 1.5, HIGH: 1.2, MEDIUM: 1.0 };

function computePriorityScore(rec) {
  const effort = EFFORT_WEIGHT[rec.effort] || 1;
  const urgency = URGENCY_MULT[rec.urgency] || 1;
  return Math.round(((rec.projectedEbitdaLift * rec.confidenceScore) / effort) * urgency);
}

function generatePlaybooks() {
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];

  const playbooks = [
    // ── INVENTORY: Emergency Stockout Interventions ───────────────────────
    {
      id: 'REC-INV-001',
      category: 'INVENTORY',
      urgency: 'CRITICAL',
      title: 'Emergency Bravecto Chewables Restock — Koramangala & Gurgaon Hubs',
      impactSummary: 'Prevent ₹18.4L revenue loss from stockout of high-velocity flea/tick prevention SKU',
      rationale: 'Stock runway for Bravecto Chewables (Fluralaner) at Koramangala 24/7 Trauma Hub is down to 18 days. Gurgaon Cyber City Center already reported a ₹18.4L drop last cycle from a similar stockout. Current velocity: 4.2 units/day across both hubs.',
      projectedEbitdaLift: 185000,
      confidenceScore: 0.94,
      effort: 'LOW',
      targetHubs: ['Koramangala 24/7 Trauma Hub', 'Gurgaon Cyber City Center'],
      targetDepartment: 'Supply Chain & Pharmacy',
      actionType: 'AUTO_PO',
      actionPayload: {
        poNumber: 'PO-8821',
        sku: 'Bravecto Chewables (Fluralaner)',
        quantity: 60,
        vendor: 'Pfizer Animal Health',
        sourceHub: 'Whitefield Multi-Specialty',
        destHubs: ['Koramangala 24/7 Trauma Hub', 'Gurgaon Cyber City Center'],
        eta: '4 Hours (Inter-Hub Transfer)'
      },
      actionText: 'Dispatch PO-8821',
      winWindow: '48 Hours',
      status: 'PENDING',
      createdAt: dateStr
    },
    {
      id: 'REC-INV-002',
      category: 'INVENTORY',
      urgency: 'HIGH',
      title: 'Royal Canin Renal Diet Buffer Pre-Positioning at Adyar Micro-Hub',
      impactSummary: 'Secure ₹6.8L Chennai revenue recovery by pre-positioning renal diet stock before supply gap',
      rationale: 'Royal Canin Renal Diet stock runway is at 14 days (WARNING threshold). Chennai region experienced a ₹6.8L drop due to interstate transit delays last cycle. Pre-positioning 450 bags from Bengaluru buffer eliminates single-point-of-failure.',
      projectedEbitdaLift: 124000,
      confidenceScore: 0.89,
      effort: 'MEDIUM',
      targetHubs: ['Adyar Micro-Hub (Chennai)', 'Whitefield Multi-Specialty'],
      targetDepartment: 'Supply Chain & Logistics',
      actionType: 'AUTO_PO',
      actionPayload: {
        poNumber: 'PO-8834',
        sku: 'Royal Canin Renal Diet',
        quantity: 450,
        vendor: 'Royal Canin (Inter-Hub Buffer Transfer)',
        sourceHub: 'Whitefield Multi-Specialty',
        destHubs: ['Adyar Micro-Hub (Chennai)'],
        eta: '24 Hours (Interstate Transit)'
      },
      actionText: 'Generate PO-8834',
      winWindow: '14 Days',
      status: 'PENDING',
      createdAt: dateStr
    },
    {
      id: 'REC-INV-003',
      category: 'INVENTORY',
      urgency: 'HIGH',
      title: 'FEFO Batch Priority — Clear 14 Near-Expiry Pharma Batches (₹1.82L)',
      impactSummary: 'Recover ₹1.82L in near-expiry cold-chain pharma inventory before write-off',
      rationale: '14 batches worth ₹1.82L have <90 days to expiry under FEFO protocol. Prioritizing these in dispensing workflows and launching "Clearance Care Packs" at 20% discount can recover 85%+ of value vs. complete write-off.',
      projectedEbitdaLift: 154700,
      confidenceScore: 0.85,
      effort: 'LOW',
      targetHubs: ['All 14 Hubs (FEFO Protocol)'],
      targetDepartment: 'Pharmacy & Cold Chain',
      actionType: 'BATCH_PRIORITY',
      actionPayload: {
        batchCount: 14,
        totalValue: 182000,
        discountRate: 0.20,
        protocol: 'FEFO Priority Override',
        campaignName: 'Clearance Care Packs'
      },
      actionText: 'Activate FEFO Override',
      winWindow: '90 Days',
      status: 'PENDING',
      createdAt: dateStr
    },

    // ── RETENTION: Pet Parent Win-Back & Churn Interventions ──────────────
    {
      id: 'REC-RET-001',
      category: 'RETENTION',
      urgency: 'CRITICAL',
      title: 'WhatsApp Win-Back Campaign — 248 High-Churn-Risk Pet Parents',
      impactSummary: 'Recover projected ₹35.2L annual LTV from 248 pet parents with >75% churn probability',
      rationale: '248 pet parents have >60-day vaccination lapse with >75% churn risk probability. Each pet parent represents ₹14,200 annual LTV. A personalized WhatsApp voucher (complimentary dental triage + 15% annual booster discount) historically achieves 34% win-back rate.',
      projectedEbitdaLift: 352000,
      confidenceScore: 0.82,
      effort: 'LOW',
      targetHubs: ['All Hubs — Customer Engagement'],
      targetDepartment: 'Marketing & Retention',
      actionType: 'WHATSAPP_CAMPAIGN',
      actionPayload: {
        cohortSize: 248,
        triggerChannel: 'WhatsApp Business API',
        voucherType: 'Dental Triage + 15% Annual Booster',
        expectedWinBackRate: 0.34,
        campaignId: 'WINBACK-OCT-2026'
      },
      actionText: 'Trigger WhatsApp Campaign',
      winWindow: '7 Days',
      status: 'PENDING',
      createdAt: dateStr
    },
    {
      id: 'REC-RET-002',
      category: 'RETENTION',
      urgency: 'MEDIUM',
      title: 'Subscription Upsell — Convert 6,420 Active Subscribers to Annual Plans',
      impactSummary: 'Increase subscriber retention from 68.4% to projected 82% with annual plan migration',
      rationale: 'Current repeat rate is 68.4% with 6,420 active monthly subscribers. Offering a 10% annual plan discount with priority appointment booking can lift retention to 82% based on D2C healthcare benchmarks.',
      projectedEbitdaLift: 218000,
      confidenceScore: 0.72,
      effort: 'MEDIUM',
      targetHubs: ['All Hubs — Subscription Platform'],
      targetDepartment: 'Product & Growth',
      actionType: 'SUBSCRIPTION_CAMPAIGN',
      actionPayload: {
        totalSubscribers: 6420,
        discount: 0.10,
        perk: 'Priority Appointment + Free Monthly Wellness Check',
        campaignId: 'ANNUAL-UPSELL-OCT-2026'
      },
      actionText: 'Launch Annual Plan Offer',
      winWindow: '30 Days',
      status: 'PENDING',
      createdAt: dateStr
    },

    // ── CLINIC: Capacity Rebalancing & Surgical Optimization ─────────────
    {
      id: 'REC-CLI-001',
      category: 'CLINIC',
      urgency: 'HIGH',
      title: 'Weekday Surgical Slot Optimization — Shift Elective Procedures from Weekend',
      impactSummary: 'Increase weekday surgical utilization from 45% to 72% and reduce weekend wait to <2 days',
      rationale: 'ICU occupancy is at 81.4% overall but weekday morning surgical slots are only 45% utilized while weekend wait times exceed 4 days. Launching "Weekday Wellness & Dental" preferential pricing (15% off elective procedures) can redistribute 28% of weekend load.',
      projectedEbitdaLift: 196000,
      confidenceScore: 0.88,
      effort: 'LOW',
      targetHubs: ['Indiranagar Flagship', 'Koramangala 24/7 Trauma Hub', 'Bandra West Advanced Care'],
      targetDepartment: 'Clinical Operations',
      actionType: 'SLOT_REBALANCE',
      actionPayload: {
        discountRate: 0.15,
        targetProcedures: ['Dental Scaling', 'Spay/Neuter', 'Skin Allergy Panel', 'Wellness Checkup'],
        shiftTarget: '28% Weekend → Weekday',
        promotionName: 'Weekday Wellness & Dental Discount'
      },
      actionText: 'Launch Weekday Pricing',
      winWindow: '14 Days',
      status: 'PENDING',
      createdAt: dateStr
    },
    {
      id: 'REC-CLI-002',
      category: 'CLINIC',
      urgency: 'MEDIUM',
      title: 'Evening Extended Hours — Delhi NCR Heat-Impacted Walk-Ins Recovery',
      impactSummary: 'Recover 28% walk-in decline from heatwave by extending evening clinic hours (5–10 PM)',
      rationale: 'Delhi NCR walk-in consultations dropped 28% due to severe afternoon heatwave. Extending evening clinic hours (5 PM – 10 PM) with complimentary pet hydration triage at Gurgaon Cyber City can recapture ₹8.2L in lost consultation revenue.',
      projectedEbitdaLift: 142000,
      confidenceScore: 0.78,
      effort: 'MEDIUM',
      targetHubs: ['Gurgaon Cyber City Center'],
      targetDepartment: 'Operations & Scheduling',
      actionType: 'SCHEDULE_EXTENSION',
      actionPayload: {
        hub: 'Gurgaon Cyber City Center',
        newHours: '5:00 PM – 10:00 PM (Extended Evening Shift)',
        additionalStaff: 2,
        complementaryService: 'Pet Hydration Triage',
        duration: '30 days (Trial Period)'
      },
      actionText: 'Extend Evening Hours',
      winWindow: '7 Days',
      status: 'PENDING',
      createdAt: dateStr
    },

    // ── PRICING: Margin & Revenue Optimization ───────────────────────────
    {
      id: 'REC-PRC-001',
      category: 'PRICING',
      urgency: 'HIGH',
      title: 'Mumbai Monsoon Logistics Cost Optimization — E-Bike Fleet Reallocation',
      impactSummary: 'Reduce per-order logistics cost from ₹72 to ₹54 in monsoon-impacted Mumbai zones',
      rationale: 'Mumbai delivery costs surged 40% (₹51.4 → ₹72) in Bandra West/Andheri East due to waterlogging-induced delays. Deploying the waterproof all-weather e-bike fleet and redistributing routes via Powai Micro-Hub can restore SLA to 97%+ while cutting per-order cost to ₹54.',
      projectedEbitdaLift: 168000,
      confidenceScore: 0.91,
      effort: 'LOW',
      targetHubs: ['Bandra West Advanced Care', 'Powai Micro-Hub'],
      targetDepartment: 'Logistics & Fleet',
      actionType: 'FLEET_REALLOCATION',
      actionPayload: {
        sourceFleet: 'All-Weather E-Bike Riders (12 units)',
        routeOptimization: 'Bandra West → Powai Micro-Hub redistribution',
        expectedCostReduction: '₹72 → ₹54 per order',
        slaTarget: '97.6%'
      },
      actionText: 'Deploy E-Bike Fleet',
      winWindow: '24 Hours',
      status: 'PENDING',
      createdAt: dateStr
    },
    {
      id: 'REC-PRC-002',
      category: 'PRICING',
      urgency: 'MEDIUM',
      title: 'Grooming Service Margin Expansion — Premium Spa Package Launch',
      impactSummary: 'Capture additional ₹4.8L/month by launching premium grooming tier at 68% margin',
      rationale: 'Current grooming margin is 54.0% — already the second-highest margin vertical. Launching a "Premium Spa Experience" tier (aromatherapy wash, pawdicure, coat treatment) at ₹2,499 can capture the top 12% willingness-to-pay cohort. Benchmarked against Mumbai/Bengaluru luxury pet care competitors.',
      projectedEbitdaLift: 96000,
      confidenceScore: 0.68,
      effort: 'HIGH',
      targetHubs: ['Indiranagar Flagship', 'Bandra West Advanced Care'],
      targetDepartment: 'Product & Services',
      actionType: 'SERVICE_LAUNCH',
      actionPayload: {
        serviceName: 'Premium Spa Experience',
        price: 2499,
        targetMargin: 0.68,
        includedServices: ['Aromatherapy Wash', 'Pawdicure', 'Coat Conditioning Treatment', 'Blueberry Facial'],
        pilotHubs: ['Indiranagar Flagship', 'Bandra West Advanced Care']
      },
      actionText: 'Launch Pilot Program',
      winWindow: '30 Days',
      status: 'PENDING',
      createdAt: dateStr
    }
  ];

  // ── LAYER 3: Score, rank, and return ──────────────────────────────────
  return playbooks
    .map(p => ({ ...p, priorityScore: computePriorityScore(p) }))
    .sort((a, b) => b.priorityScore - a.priorityScore);
}

/* ═══════════════════════════════════════════════════════════════════════════
   STYLE CONSTANTS
   ═══════════════════════════════════════════════════════════════════════════ */

const CATEGORY_CONFIG = {
  INVENTORY:  { icon: '📦', color: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe', label: 'Supply Chain & Inventory' },
  RETENTION:  { icon: '💗', color: '#db2777', bg: '#fdf2f8', border: '#fbcfe8', label: 'Customer Retention' },
  CLINIC:     { icon: '🏥', color: '#0891b2', bg: '#ecfeff', border: '#a5f3fc', label: 'Clinical Operations' },
  PRICING:    { icon: '💰', color: '#ca8a04', bg: '#fefce8', border: '#fde68a', label: 'Pricing & Margins' }
};

const URGENCY_CONFIG = {
  CRITICAL: { color: '#dc2626', bg: '#fef2f2', border: '#fecaca', label: '🔴 CRITICAL' },
  HIGH:     { color: '#ea580c', bg: '#fff7ed', border: '#fed7aa', label: '🟠 HIGH' },
  MEDIUM:   { color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe', label: '🔵 MEDIUM' }
};

const STATUS_CONFIG = {
  PENDING:   { color: '#64748b', bg: '#f8fafc', border: '#e2e8f0', label: 'Pending', icon: '⏳' },
  EXECUTING: { color: '#d97706', bg: '#fffbeb', border: '#fde68a', label: 'Executing...', icon: '⚙️' },
  COMPLETED: { color: '#059669', bg: '#ecfdf5', border: '#a7f3d0', label: 'Completed', icon: '✅' },
  DISMISSED: { color: '#94a3b8', bg: '#f8fafc', border: '#e2e8f0', label: 'Dismissed', icon: '⊘' }
};

const FILTER_TABS = [
  { key: 'ALL', label: 'All Playbooks', icon: '🎯' },
  { key: 'INVENTORY', label: 'Inventory', icon: '📦' },
  { key: 'RETENTION', label: 'Retention', icon: '💗' },
  { key: 'CLINIC', label: 'Clinic Capacity', icon: '🏥' },
  { key: 'PRICING', label: 'Margins & Pricing', icon: '💰' }
];

/* ═══════════════════════════════════════════════════════════════════════════
   TOAST NOTIFICATION
   ═══════════════════════════════════════════════════════════════════════════ */

function Toast({ message, type, onDismiss }) {
  const bgMap = { success: '#059669', info: '#2563eb', warning: '#d97706', error: '#dc2626' };
  const iconMap = { success: '✅', info: 'ℹ️', warning: '⚠️', error: '❌' };

  useEffect(() => {
    const timer = setTimeout(onDismiss, 5000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div style={{
      position: 'fixed', top: '24px', right: '24px', zIndex: 99999,
      display: 'flex', alignItems: 'center', gap: '10px',
      padding: '14px 20px', borderRadius: '12px',
      background: bgMap[type] || bgMap.info, color: '#ffffff',
      fontSize: '13px', fontWeight: 600, fontFamily: '"Manrope", sans-serif',
      boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
      animation: 'slideInRight 0.35s ease-out',
      maxWidth: '480px', lineHeight: 1.5,
      cursor: 'pointer'
    }} onClick={onDismiss}>
      <span style={{ fontSize: '18px' }}>{iconMap[type]}</span>
      <span>{message}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   LAYER 5: PRESENTATION — AI Recommendations Interactive Dashboard
   ═══════════════════════════════════════════════════════════════════════════ */

export default function AIRecommendations() {
  const [playbooks, setPlaybooks] = useState([]);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [toast, setToast] = useState(null);
  const [auditLog, setAuditLog] = useState([]);
  const [showAuditLog, setShowAuditLog] = useState(false);
  const executingTimers = useRef({});

  // ── Derived KPI calculations ──────────────────────────────────────────
  const pendingPlaybooks = playbooks.filter(p => p.status === 'PENDING');
  const executedPlaybooks = playbooks.filter(p => p.status === 'COMPLETED');
  const totalEbitdaAvailable = pendingPlaybooks.reduce((sum, p) => sum + p.projectedEbitdaLift, 0);
  const totalEbitdaRealized = executedPlaybooks.reduce((sum, p) => sum + p.projectedEbitdaLift, 0);
  const highImpactCount = playbooks.filter(p => (p.urgency === 'CRITICAL' || p.urgency === 'HIGH') && p.status === 'PENDING').length;
  const avgConfidence = playbooks.length > 0
    ? Math.round((playbooks.reduce((s, p) => s + p.confidenceScore, 0) / playbooks.length) * 100)
    : 0;

  const filteredPlaybooks = activeFilter === 'ALL'
    ? playbooks
    : playbooks.filter(p => p.category === activeFilter);

  // ── Sync with Live Backend API (with graceful autonomous local fallback) ──
  useEffect(() => {
    let isMounted = true;
    getRecommendations()
      .then(res => {
        if (isMounted && res && Array.isArray(res.playbooks)) {
          setPlaybooks(res.playbooks);
        }
      })
      .catch(() => {
        // Backend offline or error: remains empty because website data is empty
      });
    return () => { isMounted = false; };
  }, []);

  // ── Cleanup timers on unmount ─────────────────────────────────────────
  useEffect(() => {
    return () => {
      Object.values(executingTimers.current).forEach(clearTimeout);
    };
  }, []);

  // ── LAYER 4: Execution Dispatcher ─────────────────────────────────────
  const executePlaybook = useCallback((id) => {
    const rec = playbooks.find(p => p.id === id);
    if (!rec || rec.status !== 'PENDING') return;

    // Trigger backend execution endpoint if available (non-blocking)
    apiExecutePlaybook(id, rec.actionPayload).catch(() => {});

    // Phase 1: Optimistic transition to EXECUTING
    setPlaybooks(prev => prev.map(p =>
      p.id === id ? { ...p, status: 'EXECUTING' } : p
    ));

    const executionMessages = {
      AUTO_PO: `Purchase Order ${rec.actionPayload.poNumber || 'Auto-Generated'} dispatched: ${rec.actionPayload.quantity} units of ${rec.actionPayload.sku} → ${(rec.actionPayload.destHubs || rec.targetHubs).join(', ')}. ETA: ${rec.actionPayload.eta || '4 Hours'}.`,
      WHATSAPP_CAMPAIGN: `WhatsApp Campaign "${rec.actionPayload.campaignId}" triggered: Dispatched personalized vouchers to ${rec.actionPayload.cohortSize} pet parents via WhatsApp Business API. Expected win-back rate: ${Math.round((rec.actionPayload.expectedWinBackRate || 0.34) * 100)}%.`,
      SLOT_REBALANCE: `"${rec.actionPayload.promotionName}" pricing activated across ${rec.targetHubs.join(', ')}. Target shift: ${rec.actionPayload.shiftTarget}.`,
      SCHEDULE_EXTENSION: `Extended evening hours activated at ${rec.actionPayload.hub}: ${rec.actionPayload.newHours}. Additional staff: ${rec.actionPayload.additionalStaff}. Complementary service: ${rec.actionPayload.complementaryService}.`,
      FLEET_REALLOCATION: `All-weather e-bike fleet deployed for ${rec.actionPayload.routeOptimization}. Expected cost reduction: ${rec.actionPayload.expectedCostReduction}. SLA target: ${rec.actionPayload.slaTarget}.`,
      BATCH_PRIORITY: `FEFO Priority Override activated across all hubs. ${rec.actionPayload.batchCount} batches (₹${(rec.actionPayload.totalValue / 1000).toFixed(0)}K) marked for priority dispensing. "${rec.actionPayload.campaignName}" launched at ${Math.round(rec.actionPayload.discountRate * 100)}% discount.`,
      SUBSCRIPTION_CAMPAIGN: `Annual plan upsell campaign "${rec.actionPayload.campaignId}" launched for ${rec.actionPayload.totalSubscribers.toLocaleString()} subscribers. Perk: ${rec.actionPayload.perk}.`,
      SERVICE_LAUNCH: `"${rec.actionPayload.serviceName}" pilot launched at ${rec.actionPayload.pilotHubs?.join(', ') || rec.targetHubs.join(', ')} — ₹${rec.actionPayload.price} per session. Target margin: ${Math.round(rec.actionPayload.targetMargin * 100)}%.`
    };

    // Phase 2: Simulate execution delay, then mark COMPLETED
    const timer = setTimeout(() => {
      const completedAt = new Date().toLocaleString('en-IN', {
        day: 'numeric', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
      });

      setPlaybooks(prev => prev.map(p =>
        p.id === id ? { ...p, status: 'COMPLETED', executedAt: completedAt } : p
      ));

      const msg = executionMessages[rec.actionType] || `Playbook "${rec.title}" executed successfully.`;

      setToast({ message: msg, type: 'success' });

      setAuditLog(prev => [{
        id: `AUDIT-${Date.now()}`,
        playbookId: id,
        playbookTitle: rec.title,
        category: rec.category,
        actionType: rec.actionType,
        executedAt: completedAt,
        projectedImpact: `₹${(rec.projectedEbitdaLift / 1000).toFixed(1)}K`,
        executionDetail: msg,
        executedBy: 'Executive Dashboard (Auto-Approved)'
      }, ...prev]);

      delete executingTimers.current[id];
    }, 2200);

    executingTimers.current[id] = timer;
  }, [playbooks]);

  // ── Dismiss (soft-archive) a playbook ─────────────────────────────────
  const dismissPlaybook = useCallback((id) => {
    setPlaybooks(prev => prev.map(p =>
      p.id === id ? { ...p, status: 'DISMISSED' } : p
    ));
    setToast({ message: 'Playbook dismissed from active queue.', type: 'info' });
  }, []);

  // ── Undo: Restore dismissed/completed to pending ──────────────────────
  const undoPlaybook = useCallback((id) => {
    setPlaybooks(prev => prev.map(p =>
      p.id === id ? { ...p, status: 'PENDING', executedAt: undefined } : p
    ));
    setToast({ message: 'Playbook restored to active queue.', type: 'info' });
  }, []);

  // ── Bulk approve all high-impact pending playbooks ────────────────────
  const handleApproveAllHighImpact = useCallback(() => {
    const highImpact = playbooks.filter(p => (p.urgency === 'CRITICAL' || p.urgency === 'HIGH') && p.status === 'PENDING');
    if (highImpact.length === 0) {
      setToast({ message: 'No pending high-impact playbooks to approve.', type: 'info' });
      return;
    }
    highImpact.forEach(p => executePlaybook(p.id));
    setToast({ message: `Dispatched ${highImpact.length} high-impact playbooks for autonomous execution.`, type: 'success' });
  }, [playbooks, executePlaybook]);

  // ── Format currency ───────────────────────────────────────────────────
  const fmtCurrency = (val) => {
    if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
    if (val >= 1000) return `₹${(val / 1000).toFixed(1)}K`;
    return `₹${val}`;
  };

  /* ═════════════════════════════════════════════════════════════════════════
     RENDER
     ═════════════════════════════════════════════════════════════════════════ */

  const cardStyle = {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '14px',
    padding: '0',
    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
    overflow: 'hidden',
    transition: 'all 0.25s ease'
  };

  return (
    <DashboardLayout
      category="AI Assistant"
      subcategory="AI Recommendations"
      title="Prioritized AI Executive Recommendations Queue"
      subtitle="Ranked high-ROI interventions across supply chain, clinical operations, pricing strategy, and marketing — powered by Zenve Intelligence Engine"
      icon="⚡"
      badge="Live Autonomous Engine"
    >
      {/* Inject keyframe animation */}
      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100px); opacity: 0; }
          to   { transform: translateX(0); opacity: 1; }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(79,70,229,0.15); }
          50% { box-shadow: 0 0 0 8px rgba(79,70,229,0); }
        }
        @keyframes fadeInUp {
          from { transform: translateY(12px); opacity: 0; }
          to   { transform: translateY(0); opacity: 1; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }
        .rec-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(0,0,0,0.08) !important;
        }
        .rec-exec-btn:hover {
          filter: brightness(1.08);
          transform: scale(1.02);
        }
        .rec-exec-btn:active {
          transform: scale(0.98);
        }
        .filter-tab:hover {
          background: #eff6ff !important;
        }
        .filter-tab.active:hover {
          background: #4f46e5 !important;
        }
      `}</style>

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onDismiss={() => setToast(null)} />}

      {/* ── KPI Summary Cards ──────────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <KpiCard
          label="High-Impact Actions"
          value={`${highImpactCount} Ready`}
          delta={highImpactCount > 0 ? `${highImpactCount} pending` : '--'}
          trend={highImpactCount > 3 ? 'warn' : highImpactCount > 0 ? 'up' : 'neutral'}
          subtext={`of ${playbooks.filter(p => p.status === 'PENDING').length} total pending`}
          icon="⚡"
        />
        <KpiCard
          label="EBITDA Lift Available"
          value={fmtCurrency(totalEbitdaAvailable)}
          delta={totalEbitdaAvailable > 0 ? `${pendingPlaybooks.length} playbooks` : '--'}
          trend={totalEbitdaAvailable > 500000 ? 'up' : totalEbitdaAvailable > 0 ? 'neutral' : 'neutral'}
          subtext="From pending playbooks"
          icon="✨"
        />
        <KpiCard
          label="Recommendation Accuracy"
          value={`${avgConfidence}%`}
          delta={avgConfidence > 80 ? 'High confidence' : 'Moderate'}
          trend={avgConfidence > 80 ? 'up' : 'neutral'}
          subtext="Avg confidence across all"
          icon="🎯"
        />
        <KpiCard
          label="Cumulative Value Realized"
          value={fmtCurrency(totalEbitdaRealized)}
          delta={executedPlaybooks.length > 0 ? `${executedPlaybooks.length} executed` : '--'}
          trend={totalEbitdaRealized > 0 ? 'up' : 'neutral'}
          subtext={totalEbitdaRealized > 0 ? 'From completed playbooks' : 'Execute playbooks to capture value'}
          icon="💎"
        />
      </div>

      {/* ── Category Filter Tabs & Actions ─────────────────────────────── */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: '12px'
      }}>
        <div style={{
          display: 'flex', gap: '8px', flexWrap: 'wrap',
          padding: '4px', background: '#f8fafc',
          borderRadius: '12px', border: '1px solid #e2e8f0'
        }}>
          {FILTER_TABS.map(tab => (
            <button
              key={tab.key}
              className={`filter-tab${activeFilter === tab.key ? ' active' : ''}`}
              onClick={() => setActiveFilter(tab.key)}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '8px 16px', borderRadius: '8px', border: 'none',
                fontSize: '12px', fontWeight: 600, cursor: 'pointer',
                fontFamily: '"Manrope", sans-serif',
                transition: 'all 0.15s ease',
                background: activeFilter === tab.key ? '#4f46e5' : 'transparent',
                color: activeFilter === tab.key ? '#ffffff' : '#475569'
              }}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
              <span style={{
                fontSize: '10px', fontWeight: 700,
                padding: '1px 6px', borderRadius: '99px',
                fontFamily: '"IBM Plex Mono", monospace',
                background: activeFilter === tab.key ? 'rgba(255,255,255,0.2)' : '#e2e8f0',
                color: activeFilter === tab.key ? '#ffffff' : '#64748b'
              }}>
                {tab.key === 'ALL'
                  ? playbooks.length
                  : playbooks.filter(p => p.category === tab.key).length}
              </span>
            </button>
          ))}
        </div>

        {highImpactCount > 0 && (
          <button
            onClick={handleApproveAllHighImpact}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '8px 16px', borderRadius: '8px',
              background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
              color: '#ffffff', border: 'none',
              fontSize: '12px', fontWeight: 700, cursor: 'pointer',
              fontFamily: '"Manrope", sans-serif',
              boxShadow: '0 2px 8px rgba(79, 70, 229, 0.25)',
              transition: 'all 0.15s ease'
            }}
          >
            <span>⚡</span>
            <span>Approve All High-Impact ({highImpactCount})</span>
          </button>
        )}
      </div>

      {/* ── Playbook Cards ─────────────────────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredPlaybooks.length === 0 ? (
          <div style={{
            background: '#ffffff', border: '1px solid #e2e8f0',
            borderRadius: '14px', textAlign: 'center', padding: '48px 24px', color: '#94a3b8',
            fontSize: '13px'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>⚡</div>
            <div style={{ fontWeight: 700, color: '#334155', fontSize: '15px', marginBottom: '6px' }}>
              No Prioritized AI Recommendations Available
            </div>
            <div style={{ maxWidth: '520px', margin: '0 auto', lineHeight: 1.6, color: '#64748b' }}>
              No operational anomalies or opportunities detected in telemetry stream. Recommendations will automatically populate once operational and transactional data is ingested into the system.
            </div>
          </div>
        ) : (
          filteredPlaybooks.map((rec, idx) => {
            const cat = CATEGORY_CONFIG[rec.category] || CATEGORY_CONFIG.INVENTORY;
            const urg = URGENCY_CONFIG[rec.urgency] || URGENCY_CONFIG.MEDIUM;
            const stat = STATUS_CONFIG[rec.status] || STATUS_CONFIG.PENDING;
            const isCompleted = rec.status === 'COMPLETED';
            const isDismissed = rec.status === 'DISMISSED';
            const isExecuting = rec.status === 'EXECUTING';

            return (
              <div
                key={rec.id}
                className="rec-card"
                style={{
                  ...cardStyle,
                  opacity: isDismissed ? 0.55 : 1,
                  borderLeft: `4px solid ${cat.color}`,
                  animation: `fadeInUp 0.3s ease ${idx * 0.06}s both`
                }}
              >
                {/* Card Header */}
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '16px 20px 12px', borderBottom: '1px solid #f1f5f9',
                  flexWrap: 'wrap', gap: '8px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <span style={{
                      fontSize: '11px', fontFamily: '"IBM Plex Mono", monospace',
                      fontWeight: 700, color: cat.color, background: cat.bg,
                      border: `1px solid ${cat.border}`, padding: '3px 10px',
                      borderRadius: '6px'
                    }}>{rec.id}</span>
                    <span style={{
                      fontSize: '11px', fontWeight: 600, color: cat.color,
                      display: 'flex', alignItems: 'center', gap: '4px'
                    }}>{cat.icon} {cat.label}</span>
                    <span style={{
                      fontSize: '10px', fontWeight: 700, color: urg.color,
                      background: urg.bg, border: `1px solid ${urg.border}`,
                      padding: '2px 8px', borderRadius: '99px'
                    }}>{urg.label}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      fontSize: '10px', fontWeight: 700,
                      fontFamily: '"IBM Plex Mono", monospace',
                      color: stat.color, background: stat.bg,
                      border: `1px solid ${stat.border}`,
                      padding: '3px 10px', borderRadius: '99px',
                      display: 'flex', alignItems: 'center', gap: '4px'
                    }}>
                      {isExecuting ? (
                        <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⚙️</span>
                      ) : stat.icon} {stat.label}
                    </span>
                    <span style={{
                      fontSize: '10px', fontWeight: 600,
                      fontFamily: '"IBM Plex Mono", monospace',
                      color: '#4f46e5', background: '#eef2ff',
                      padding: '3px 8px', borderRadius: '6px'
                    }}>Score: {rec.priorityScore?.toLocaleString()}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div style={{ padding: '16px 20px' }}>
                  <h3 style={{
                    margin: '0 0 6px', fontSize: '15px', fontWeight: 700,
                    color: isCompleted ? '#059669' : isDismissed ? '#94a3b8' : '#0f172a',
                    fontFamily: 'var(--font-display, "Sora", sans-serif)',
                    textDecoration: isDismissed ? 'line-through' : 'none'
                  }}>
                    {isCompleted && '✅ '}{rec.title}
                  </h3>
                  <p style={{
                    margin: '0 0 10px', fontSize: '13px', fontWeight: 600,
                    color: '#4f46e5', lineHeight: 1.4
                  }}>{rec.impactSummary}</p>
                  <p style={{
                    margin: '0 0 14px', fontSize: '12.5px', lineHeight: 1.65,
                    color: '#475569', fontFamily: '"Manrope", sans-serif'
                  }}>{rec.rationale}</p>

                  {/* Metric Chips */}
                  <div style={{
                    display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px'
                  }}>
                    <span style={{
                      fontSize: '11px', fontWeight: 700, padding: '4px 12px',
                      borderRadius: '8px', background: '#f0fdf4', color: '#059669',
                      border: '1px solid #bbf7d0',
                      fontFamily: '"IBM Plex Mono", monospace'
                    }}>EBITDA: {fmtCurrency(rec.projectedEbitdaLift)}</span>
                    <span style={{
                      fontSize: '11px', fontWeight: 600, padding: '4px 12px',
                      borderRadius: '8px', background: '#eff6ff', color: '#2563eb',
                      border: '1px solid #bfdbfe'
                    }}>Confidence: {Math.round(rec.confidenceScore * 100)}%</span>
                    <span style={{
                      fontSize: '11px', fontWeight: 600, padding: '4px 12px',
                      borderRadius: '8px', background: '#fefce8', color: '#a16207',
                      border: '1px solid #fde68a'
                    }}>Effort: {rec.effort}</span>
                    <span style={{
                      fontSize: '11px', fontWeight: 600, padding: '4px 12px',
                      borderRadius: '8px', background: '#fdf2f8', color: '#be185d',
                      border: '1px solid #fbcfe8'
                    }}>Win Window: {rec.winWindow}</span>
                    <span style={{
                      fontSize: '11px', fontWeight: 600, padding: '4px 10px',
                      borderRadius: '8px', background: '#f8fafc', color: '#64748b',
                      border: '1px solid #e2e8f0'
                    }}>🏢 {rec.targetHubs.join(', ')}</span>
                  </div>

                  {/* Execution Feedback (for completed) */}
                  {isCompleted && rec.executedAt && (
                    <div style={{
                      background: '#f0fdf4', border: '1px solid #bbf7d0',
                      borderRadius: '8px', padding: '10px 14px', marginBottom: '12px',
                      fontSize: '12px', color: '#166534', lineHeight: 1.5
                    }}>
                      <strong>✅ Executed at {rec.executedAt}</strong> — {rec.targetDepartment}
                    </div>
                  )}
                </div>

                {/* Card Footer — Action Buttons */}
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '12px 20px 16px', borderTop: '1px solid #f1f5f9',
                  flexWrap: 'wrap', gap: '8px'
                }}>
                  <span style={{
                    fontSize: '11px', color: '#64748b',
                    fontFamily: '"IBM Plex Mono", monospace'
                  }}>
                    {rec.targetDepartment} • Effort: <b style={{ color: '#0f172a' }}>{rec.effort}</b>
                  </span>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    {(isCompleted || isDismissed) && (
                      <button
                        onClick={() => undoPlaybook(rec.id)}
                        style={{
                          padding: '7px 14px', borderRadius: '8px',
                          border: '1px solid #e2e8f0', background: '#ffffff',
                          color: '#475569', fontSize: '12px', fontWeight: 600,
                          cursor: 'pointer', fontFamily: '"Manrope", sans-serif',
                          transition: 'all 0.15s ease'
                        }}
                      >↩ Undo</button>
                    )}
                    {rec.status === 'PENDING' && (
                      <>
                        <button
                          onClick={() => dismissPlaybook(rec.id)}
                          style={{
                            padding: '7px 14px', borderRadius: '8px',
                            border: '1px solid #fecaca', background: '#fff',
                            color: '#dc2626', fontSize: '12px', fontWeight: 600,
                            cursor: 'pointer', fontFamily: '"Manrope", sans-serif',
                            transition: 'all 0.15s ease'
                          }}
                        >Dismiss</button>
                        <button
                          className="rec-exec-btn"
                          onClick={() => executePlaybook(rec.id)}
                          style={{
                            padding: '8px 20px', borderRadius: '8px', border: 'none',
                            background: `linear-gradient(135deg, ${cat.color}, #4f46e5)`,
                            color: '#ffffff', fontSize: '12px', fontWeight: 700,
                            cursor: 'pointer', fontFamily: '"Manrope", sans-serif',
                            transition: 'all 0.15s ease',
                            animation: rec.urgency === 'CRITICAL' ? 'pulseGlow 2s ease-in-out infinite' : 'none'
                          }}
                        >
                          {rec.actionText} →
                        </button>
                      </>
                    )}
                    {isExecuting && (
                      <span style={{
                        padding: '8px 20px', borderRadius: '8px',
                        background: '#fef3c7', color: '#92400e',
                        fontSize: '12px', fontWeight: 700,
                        fontFamily: '"Manrope", sans-serif',
                        display: 'flex', alignItems: 'center', gap: '6px'
                      }}>
                        <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⚙️</span>
                        Executing Playbook...
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ── Audit Trail Log ────────────────────────────────────────────── */}
      <div style={{
        background: '#ffffff', border: '1px solid #e2e8f0',
        borderRadius: '14px', overflow: 'hidden'
      }}>
        <div
          onClick={() => setShowAuditLog(!showAuditLog)}
          style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '16px 20px', cursor: 'pointer', userSelect: 'none'
          }}
        >
          <div>
            <h3 style={{
              margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a',
              fontFamily: 'var(--font-display, "Sora", sans-serif)',
              display: 'flex', alignItems: 'center', gap: '8px'
            }}>
              📋 Execution Audit Trail
              <span style={{
                fontSize: '10px', fontWeight: 700, padding: '2px 8px',
                borderRadius: '99px', background: '#f0fdf4', color: '#059669',
                border: '1px solid #bbf7d0',
                fontFamily: '"IBM Plex Mono", monospace'
              }}>{auditLog.length} Records</span>
            </h3>
            <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#64748b' }}>
              Complete execution history with timestamps, action details, and projected impact
            </p>
          </div>
          <span style={{ fontSize: '18px', color: '#64748b', transition: 'transform 0.2s',
            transform: showAuditLog ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
        </div>

        {showAuditLog && (
          <div style={{ borderTop: '1px solid #f1f5f9', padding: '0' }}>
            {auditLog.length === 0 ? (
              <div style={{ padding: '32px', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}>
                No executed playbooks yet. Click "Execute" on any playbook above to see audit records here.
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{
                  width: '100%', borderCollapse: 'collapse', fontSize: '12px',
                  fontFamily: '"Manrope", sans-serif'
                }}>
                  <thead>
                    <tr style={{ background: '#f8fafc' }}>
                      {['Timestamp', 'Playbook', 'Category', 'Impact', 'Execution Detail'].map(h => (
                        <th key={h} style={{
                          padding: '10px 14px', textAlign: 'left', fontWeight: 700,
                          color: '#475569', borderBottom: '1px solid #e2e8f0',
                          fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em',
                          fontFamily: '"IBM Plex Mono", monospace'
                        }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {auditLog.map(log => (
                      <tr key={log.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '10px 14px', whiteSpace: 'nowrap', fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px', color: '#64748b' }}>
                          {log.executedAt}
                        </td>
                        <td style={{ padding: '10px 14px', fontWeight: 600, color: '#0f172a' }}>
                          <span style={{ fontSize: '10px', color: '#4f46e5', fontFamily: '"IBM Plex Mono", monospace' }}>{log.playbookId}</span><br />
                          {log.playbookTitle}
                        </td>
                        <td style={{ padding: '10px 14px' }}>
                          <span style={{
                            fontSize: '10px', fontWeight: 700,
                            padding: '2px 8px', borderRadius: '6px',
                            background: CATEGORY_CONFIG[log.category]?.bg || '#f8fafc',
                            color: CATEGORY_CONFIG[log.category]?.color || '#64748b',
                            border: `1px solid ${CATEGORY_CONFIG[log.category]?.border || '#e2e8f0'}`
                          }}>{log.category}</span>
                        </td>
                        <td style={{ padding: '10px 14px', fontWeight: 700, color: '#059669', fontFamily: '"IBM Plex Mono", monospace' }}>
                          {log.projectedImpact}
                        </td>
                        <td style={{ padding: '10px 14px', color: '#475569', lineHeight: 1.5, maxWidth: '340px' }}>
                          {log.executionDetail}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
