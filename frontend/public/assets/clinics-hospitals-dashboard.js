/* =====================================================================
   Zenve BI — Clinics & Hospitals Domain Control Center & Subdomain Suite
   All 10 Subdomains:
     1. Clinics Dashboard     (#clinics-dashboard)
     2. All Clinics           (#all-clinics)
     3. Hospitals             (#hospitals)
     4. Clinic Performance    (#clinic-performance)
     5. Clinic Revenue        (#clinic-revenue)
     6. Clinic Orders         (#clinic-orders)
     7. Clinic Patients       (#clinic-patients)
     8. Clinic Doctors        (#clinic-doctors)
     9. Clinic Commissions    (#clinic-commissions)
     10. Clinic Network       (#clinic-network)
   ===================================================================== */
(function () {
  'use strict';

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function inr(n) {
    n = Number(n) || 0;
    if (n >= 1e7) return '₹' + (n / 1e7).toFixed(2) + ' Cr';
    if (n >= 1e5) return '₹' + (n / 1e5).toFixed(2) + ' L';
    if (n >= 1000) return '₹' + (n / 1000).toFixed(1) + 'K';
    return '₹' + n.toLocaleString('en-IN');
  }

  /* ── 10 Tabs Definition with Explicit Titles & Subtitles ────────── */
  var TABS = [
    { id: 'dashboard',   label: 'Clinics Dashboard',   icon: '🏥', hash: '#clinics-dashboard',   badge: 'Command Center', title: 'Clinics Dashboard', sub: 'Veterinary Hospitals & Clinics Command Center — Healthcare delivery, inpatient census, and OT utilization' },
    { id: 'all-clinics', label: 'All Clinics',         icon: '🏨', hash: '#all-clinics',         badge: '11 Outpatient', title: 'All Clinics', sub: 'Outpatient Care Directory — Daycare suites, lead veterinarians, diagnostics tier, and daily footfall' },
    { id: 'hospitals',   label: 'Hospitals',           icon: '🚨', hash: '#hospitals',           badge: '3 Tertiary 24x7', title: 'Hospitals', sub: '24x7 Tertiary Care Referral Centers — Modular OTs, ICU pods, isolation bays, blood bank, and imaging' },
    { id: 'performance', label: 'Clinic Performance',  icon: '📊', hash: '#clinic-performance',  badge: '99.2% Success', title: 'Clinic Performance', sub: 'Clinical Quality & Operational Benchmarking — OPD throughput, wait times, bed turnaround, and CSAT' },
    { id: 'revenue',     label: 'Clinic Revenue',      icon: '💎', hash: '#clinic-revenue',      badge: '₹78.4 L/mo', title: 'Clinic Revenue', sub: 'Healthcare Financials & Department Billings — OT Surgeries (37.5%), OPD (25.7%), Diagnostics (20%), and ICU (16.8%)' },
    { id: 'orders',      label: 'Clinic Orders',       icon: '📦', hash: '#clinic-orders',       badge: '16 Requisitions', title: 'Clinic Orders', sub: 'Clinical Supply Requisitions & Purchase Orders — Titanium implants, inhalation gases, and suture packs' },
    { id: 'patients',    label: 'Clinic Patients',     icon: '🐾', hash: '#clinic-patients',     badge: '86 Inpatients', title: 'Clinic Patients', sub: 'Inpatient Ward Census & Telemetry Roster — Admitted pets, ICU monitoring, surgical recovery, and vitals' },
    { id: 'doctors',     label: 'Clinic Doctors',      icon: '👨‍⚕️', hash: '#clinic-doctors',      badge: '48 Clinicians', title: 'Clinic Doctors', sub: 'Veterinary Clinicians, Surgeons, Specialists & Rosters — 48 registered clinicians, VCI licenses, and shifts' },
    { id: 'commissions', label: 'Clinic Commissions',  icon: '🤝', hash: '#clinic-commissions',  badge: '₹8.42 L Payouts', title: 'Clinic Commissions', sub: 'B2B Partner Clinic Referrals & Specialist Settlements — 10% statutory TDS, gross commission, and disbursement' },
    { id: 'network',     label: 'Clinic Network',      icon: '🌐', hash: '#clinic-network',      badge: '5 Metros / 8 AMBs', title: 'Clinic Network', sub: 'Regional Hub-and-Spoke Infrastructure — 5 Metro clusters, 8 ALS veterinary ambulances, and expansion pipeline' }
  ];

  /* ── Datasets ─────────────────────────────────────────────────── */
  var FACILITIES = [
    { id: 'FAC-01', name: 'Zenve Hospital Koramangala (24x7)', type: 'Tertiary Care Center', city: 'Bengaluru', beds: '28 / 32 Beds', ot: '88% OT Utilized', rev: '₹14.20 L', status: 'Operational', lead: 'Dr. Priya Sharma, MVSc Surgery' },
    { id: 'FAC-02', name: 'Zenve Multi-Specialty Bandra', type: '24x7 Surgical Hospital', city: 'Mumbai', beds: '22 / 24 Beds', ot: '92% OT Utilized', rev: '₹11.85 L', status: 'Operational', lead: 'Dr. Rahul Mehta, MVSc Neuro' },
    { id: 'FAC-03', name: 'Zenve Animal Hospital Okhla', type: 'Tertiary Referral Center', city: 'Delhi NCR', beds: '18 / 20 Beds', ot: '84% OT Utilized', rev: '₹9.40 L', status: 'Operational', lead: 'Dr. Aisha Khan, MVSc Oncology' },
    { id: 'FAC-04', name: 'Zenve Care Center Indiranagar', type: 'Primary OPD & Diagnostics', city: 'Bengaluru', beds: 'Daycare & HDU (4 Beds)', ot: 'Minor OT Ready', rev: '₹5.60 L', status: 'Operational', lead: 'Dr. Arun V., BVSc' },
    { id: 'FAC-05', name: 'Zenve Jubilee Hills Specialty', type: 'Secondary Care Clinic', city: 'Hyderabad', beds: '8 / 10 Beds', ot: '75% OT Utilized', rev: '₹4.80 L', status: 'Operational', lead: 'Dr. Lakshmi Reddy, MVSc' },
    { id: 'FAC-06', name: 'Zenve Koregaon Park Clinic', type: 'Daycare & Wellness Center', city: 'Pune', beds: '6 Daycare Bays', ot: 'Minor OT Ready', rev: '₹3.20 L', status: 'Operational', lead: 'Dr. Nitin Deshmukh, BVSc' },
    { id: 'FAC-07', name: 'Zenve Jayanagar OPD & Daycare', type: 'Primary Outpatient Center', city: 'Bengaluru', beds: '6 Daycare Bays', ot: 'Dental & Minor Suite', rev: '₹4.10 L', status: 'Operational', lead: 'Dr. Preethi Rao, BVSc' },
    { id: 'FAC-08', name: 'Zenve Andheri West Express', type: 'Primary Express Clinic', city: 'Mumbai', beds: '4 Daycare Pods', ot: 'Diagnostics & Triage', rev: '₹3.80 L', status: 'Operational', lead: 'Dr. Rohit Sen, BVSc' },
    { id: 'FAC-09', name: 'Zenve Gurgaon Sector 29 Clinic', type: 'Secondary Care Clinic', city: 'Delhi NCR', beds: '8 Beds (2 HDU)', ot: '1 Full OT', rev: '₹4.60 L', status: 'Operational', lead: 'Dr. Ajay Verma, MVSc' },
    { id: 'FAC-10', name: 'Zenve Whitefield Tech Hub Clinic', type: 'Primary Express Clinic', city: 'Bengaluru', beds: '4 Daycare Pods', ot: 'Preventive Suite', rev: '₹3.90 L', status: 'Operational', lead: 'Dr. Sneha Nair, BVSc' }
  ];

  var LIVE_ADMISSIONS = [
    { id: 'ADM-9024', pet: 'Max (Golden Retriever, 34kg)', reason: 'Gastric Dilatation-Volvulus (GDV Surgery)', facility: 'Koramangala 24x7', doctor: 'Dr. Priya Sharma', bed: 'ICU-02', status: 'In Surgery', time: '14 mins ago' },
    { id: 'ADM-9023', pet: 'Mia (Persian Cat, 3.6kg)', reason: 'Acute Feline Lower Urinary Tract (FLUTD)', facility: 'Bandra Specialty', doctor: 'Dr. Rahul Mehta', bed: 'Feline HDU-04', status: 'Admitted', time: '35 mins ago' },
    { id: 'ADM-9022', pet: 'Rocky (Rottweiler, 42kg)', reason: 'Tibial Plateau Leveling Osteotomy (TPLO)', facility: 'Delhi NCR Hospital', doctor: 'Dr. Aisha Khan', bed: 'Post-Op Ward 1', status: 'Post-Op Recovery', time: '1.2 hrs ago' },
    { id: 'ADM-9021', pet: 'Leo (Beagle, 14kg)', reason: 'Parvovirus Enteritis Protocol', facility: 'Koramangala 24x7', doctor: 'Dr. Arun V.', bed: 'Isolation Bay 3', status: 'Stable', time: '2.5 hrs ago' },
    { id: 'ADM-9020', pet: 'Chloe (Shih Tzu, 5.8kg)', reason: 'Severe Corneal Ulcer & Debridement', facility: 'Jubilee Hills Clinic', doctor: 'Dr. Lakshmi Reddy', bed: 'Daycare Bed 2', status: 'Discharge Ready', time: '3.1 hrs ago' }
  ];

  var INPATIENTS = [
    { id: 'PAT-1081', pet: 'Bruno (Labrador, 32kg)', owner: 'Vikram Seth', admitDate: '03 Oct 2026', facility: 'Koramangala 24x7', bed: 'ICU Pod 01', dx: 'Acute Pancreatitis & Sepsis', doc: 'Dr. Priya Sharma', vitals: 'Temp 101.4°F, SpO2 98%', status: 'Critical / Intensive' },
    { id: 'PAT-1082', pet: 'Simba (Domestic Shorthair, 4.2kg)', owner: 'Ananya Roy', admitDate: '04 Oct 2026', facility: 'Bandra Specialty', bed: 'Cat Ward 03', dx: 'Hepatic Lipidosis & Jaundice', doc: 'Dr. Rahul Mehta', vitals: 'Temp 100.8°F, Feeding Tube', status: 'Stable / Monitoring' },
    { id: 'PAT-1083', pet: 'Zoe (German Shepherd, 28kg)', owner: 'Capt. R. Malhotra', admitDate: '02 Oct 2026', facility: 'Delhi NCR Hospital', bed: 'Ortho Recovery 02', dx: 'Spinal Decompression Hemilaminectomy', doc: 'Dr. Aisha Khan', vitals: 'Motor reflex returning', status: 'Post-Op Rehab' },
    { id: 'PAT-1084', pet: 'Coco (Pug, 8.5kg)', owner: 'Meera Nambiar', admitDate: '04 Oct 2026', facility: 'Indiranagar Care', bed: 'Daycare Bay 01', dx: 'BOAS Stenotic Nares Resection', doc: 'Dr. Arun V.', vitals: 'Normal breathing recovery', status: 'Discharge Today' },
    { id: 'PAT-1085', pet: 'Tyson (Pitbull Terrier, 36kg)', owner: 'Karan Johar', admitDate: '01 Oct 2026', facility: 'Koramangala 24x7', bed: 'Isolation 02', dx: 'Leptospirosis Renal Failure', doc: 'Dr. Priya Sharma', vitals: 'Peritoneal Dialysis Day 4', status: 'High Care HDU' }
  ];

  var DOCTORS = [
    { id: 'DOC-01', name: 'Dr. Priya Sharma', qual: 'B.V.Sc & A.H, M.V.Sc (Vet Surgery & Radiology)', vci: 'VCI-KAR-2018-842', spec: 'Orthopedics & TPLO Surgeon', base: 'Koramangala 24x7', shift: 'Morning (08:00 – 16:00)', consults: 412, surgeries: 48, csat: '4.96 ★', status: 'On Duty', bio: 'Gold medalist in Small Animal Orthopedic Surgery. Pioneer in canine cruciate ligament repairs (TPLO/CTWO) and fracture stabilization.' },
    { id: 'DOC-02', name: 'Dr. Rahul Mehta', qual: 'B.V.Sc & A.H, M.V.Sc (Small Animal Surgery)', vci: 'VCI-MAH-2015-110', spec: 'Orthopedics & Neurosurgery', base: 'Bandra Specialty', shift: 'Operating Day (09:00 – 17:00)', consults: 365, surgeries: 34, csat: '4.94 ★', status: 'In Surgery', bio: 'Specialist in spinal cord decompressive hemilaminectomy and complex canine neurological disorders.' },
    { id: 'DOC-03', name: 'Dr. Aisha Khan', qual: 'B.V.Sc & A.H, PhD (Veterinary Oncology)', vci: 'VCI-DEL-2019-304', spec: 'Medical & Surgical Oncology', base: 'Okhla Animal Hospital', shift: 'Chemotherapy Rounds', consults: 340, surgeries: 38, csat: '4.98 ★', status: 'On Duty', bio: 'Expert in canine mast cell tumors, lymphoma protocol optimization, and reconstructive surgical oncology.' },
    { id: 'DOC-04', name: 'Dr. Arun V.', qual: 'B.V.Sc & A.H, PG Dip Ultrasound', vci: 'VCI-KAR-2020-112', spec: 'Internal Medicine & Critical Care', base: 'Care Center Indiranagar', shift: 'General Consultations', consults: 380, surgeries: 12, csat: '4.94 ★', status: 'On Duty', bio: 'Advanced ultrasonography, echocardiography, and emergency feline medicine specialist.' },
    { id: 'DOC-05', name: 'Dr. Lakshmi Reddy', qual: 'B.V.Sc & A.H, M.V.Sc (Veterinary Medicine)', vci: 'VCI-TEL-2017-488', spec: 'Feline Specialist & Nephrology', base: 'Jubilee Hills Specialty', shift: 'Morning (09:00 – 17:00)', consults: 310, surgeries: 16, csat: '4.93 ★', status: 'On Duty', bio: 'Dedicated cat-friendly certified veterinarian. Special focus on chronic kidney disease (CKD) and diabetes mellitus management.' },
    { id: 'DOC-06', name: 'Dr. Sneha Kulkarni', qual: 'B.V.Sc & A.H, M.V.Sc (Surgery)', vci: 'VCI-MAH-2018-902', spec: 'Minimally Invasive Laparoscopy', base: 'Koregaon Park Clinic', shift: 'Evening (13:00 – 21:00)', consults: 290, surgeries: 22, csat: '4.88 ★', status: 'Off Duty', bio: 'Pioneered keyhole laparoscopic spays and gastropexy in companion animals with zero surgical complications.' },
    { id: 'DOC-07', name: 'Dr. Karan Patel', qual: 'B.V.Sc & A.H, PG Cert (Ophthalmology)', vci: 'VCI-GUJ-2020-512', spec: 'Ophthalmology & Corneal Repair', base: 'Bandra Specialty', shift: 'Morning (09:00 – 17:00)', consults: 260, surgeries: 28, csat: '4.92 ★', status: 'On Duty', bio: 'Phacoemulsification cataract extraction, corneal grafting, and glaucoma drainage implants.' },
    { id: 'DOC-08', name: 'Dr. Neha Singh', qual: 'B.V.Sc & A.H, M.V.Sc (Cardiology)', vci: 'VCI-DEL-2021-940', spec: 'Cardiovascular Medicine', base: 'Okhla Animal Hospital', shift: 'Cardiac Clinic', consults: 240, surgeries: 8, csat: '4.95 ★', status: 'On Duty', bio: 'Management of dilated cardiomyopathy (DCM) and myxomatous mitral valve disease in canines.' },
    { id: 'DOC-09', name: 'Dr. Vikram Malhotra', qual: 'B.V.Sc & A.H, Cert. Emergency Care', vci: 'VCI-KAR-2019-332', spec: 'Emergency & Critical Care (ECC)', base: 'Koramangala 24x7', shift: 'Night Emergency (20:00 – 08:00)', consults: 430, surgeries: 42, csat: '4.97 ★', status: 'On Call', bio: 'Trauma resuscitation, mechanical ventilation, and GDV emergency derotation specialist.' },
    { id: 'DOC-10', name: 'Dr. Preethi Rao', qual: 'B.V.Sc & A.H, Cert. Exotics', vci: 'VCI-KAR-2022-771', spec: 'Avian & Exotic Pet Medicine', base: 'Care Center Indiranagar', shift: 'Daycare Schedule', consults: 210, surgeries: 14, csat: '4.91 ★', status: 'On Duty', bio: 'Specialized healthcare for avian species, small mammals, reptiles, and rabbits.' }
  ];

  var CLINIC_ORDERS = [
    { po: 'PO-CLIN-4081', facility: 'Koramangala 24x7', item: 'Titanium TPLO Plates & Locking Screws (Synthes)', vendor: 'Depuy Synthes Vet', qty: '12 Kits', cost: '₹1,44,000', status: 'Approved / Inbound', priority: 'High' },
    { po: 'PO-CLIN-4082', facility: 'Bandra Specialty', item: 'Sevoflurane Inhalation Anesthetic 250ml', vendor: 'Abbott Healthcare', qty: '8 Bottles', cost: '₹68,000', status: 'Dispatched', priority: 'Critical' },
    { po: 'PO-CLIN-4083', facility: 'Okhla Animal Hospital', item: 'Medical Oxygen Cylinders (D-Type Bulk 47L)', vendor: 'BOC Linde India', qty: '15 Cylinders', cost: '₹28,500', status: 'Delivered', priority: 'Routine' },
    { po: 'PO-CLIN-4084', facility: 'Indiranagar Care Center', item: 'Disposable Surgical Drape & Gown Packs', vendor: 'Medline Veterinary', qty: '200 Sets', cost: '₹42,000', status: 'Pending Approval', priority: 'Medium' },
    { po: 'PO-CLIN-4085', facility: 'Jubilee Hills Specialty', item: 'Endotracheal Tubes (Cuffed, 3.0mm–10.0mm)', vendor: 'Rusch Vet Line', qty: '50 Pcs', cost: '₹18,500', status: 'Delivered', priority: 'Routine' }
  ];

  var COMMISSIONS = [
    { id: 'COMM-801', partner: 'Paws & Claws Pet Clinic, HSR', type: 'B2B Partner Clinic', cases: 14, val: '₹3,40,000', rate: '10%', comm: '₹34,000', tds: '₹3,400', net: '₹30,600', status: 'Approved' },
    { id: 'COMM-802', partner: 'Dr. Verma Ultrasound Lab, Andheri', type: 'Diagnostic Center', cases: 22, val: '₹1,85,000', rate: '12%', comm: '₹22,200', tds: '₹2,220', net: '₹19,980', status: 'Paid' },
    { id: 'COMM-803', partner: 'Metro Pet Care, Vasant Kunj', type: 'Referring Vet Practice', cases: 9, val: '₹2,90,000', rate: '10%', comm: '₹29,000', tds: '₹2,900', net: '₹26,100', status: 'Approved' },
    { id: 'COMM-804', partner: 'Canine Care Center, Secunderabad', type: 'Emergency Referral Partner', cases: 18, val: '₹4,10,000', rate: '10%', comm: '₹41,000', tds: '₹4,100', net: '₹36,900', status: 'Pending Review' },
    { id: 'COMM-805', partner: 'Dr. Sharad Oak (Visiting Ortho)', type: 'Consultant Surgeon', cases: 6, val: '₹2,60,000', rate: '35%', comm: '₹91,000', tds: '₹9,100', net: '₹81,900', status: 'Paid' }
  ];

  var AMBULANCE_FLEET = [
    { id: 'AMB-01', vehicle: 'Force Traveller ALS-1', base: 'Koramangala 24x7', city: 'Bengaluru', medic: 'Vet Nurse Suresh', equipment: 'Portable Ventilator, O2, Syringe Pump', status: 'On Active Transit', eta: '8 mins' },
    { id: 'AMB-02', vehicle: 'Force Traveller ALS-2', base: 'Koramangala 24x7', city: 'Bengaluru', medic: 'Vet Nurse Preethi', equipment: 'O2, Portable USG, Vital Monitor', status: 'Stationed / Ready', eta: 'Immediate' },
    { id: 'AMB-03', vehicle: 'Force Traveller ALS-3', base: 'Bandra Specialty', city: 'Mumbai', medic: 'Vet Nurse Rohit', equipment: 'Ventilator, O2, Infusion Pumps, ICU Cage', status: 'On Emergency Call', eta: '12 mins' },
    { id: 'AMB-04', vehicle: 'Tata Winger ALS-5', base: 'Okhla Animal Hospital', city: 'Delhi NCR', medic: 'Vet Nurse Ajay', equipment: 'Full Trauma Kit, O2, Blood Warmer', status: 'Dispatched', eta: '16 mins' },
    { id: 'AMB-05', vehicle: 'Maruti Eeco Mobile-7', base: 'Jubilee Hills Clinic', city: 'Hyderabad', medic: 'Vet Tech Venu', equipment: 'Basic Life Support, O2 Cylinder, Triage Kit', status: 'Stationed / Ready', eta: 'Immediate' }
  ];

  /* ── State ─────────────────────────────────────────────────────── */
  var S = {
    open: false,
    tab: 'dashboard',
    docSearch: '',
    docSpecialty: 'ALL',
    docDuty: 'ALL'
  };

  var root = null;

  /* ── Tab resolution from Hash and Sidebar Text ──────────────────── */
  function tabFromHash(hash) {
    if (!hash) return null;
    var h = (hash.startsWith('#') ? hash.slice(1) : hash).toLowerCase();
    if (h.indexOf('pharmacy') >= 0 || h.indexOf('medicines') >= 0 || h.indexOf('prescriptions') >= 0) return null;
    if (h === 'clinics-dashboard' || h === 'clinics') return 'dashboard';
    if (h === 'all-clinics') return 'all-clinics';
    if (h === 'hospitals') return 'hospitals';
    if (h === 'clinic-performance') return 'performance';
    if (h === 'clinic-revenue') return 'revenue';
    if (h === 'clinic-orders') return 'orders';
    if (h === 'clinic-patients') return 'patients';
    if (h === 'clinic-doctors') return 'doctors';
    if (h === 'clinic-commissions') return 'commissions';
    if (h === 'clinic-network') return 'network';
    return null;
  }

  function tabFromText(txt) {
    if (!txt) return null;
    var raw = txt.replace(/\s+/g, ' ').trim().toLowerCase();
    // Exclude other domains
    if (raw.indexOf('pharmacy') !== -1 || raw.indexOf('medicines') !== -1 || raw.indexOf('prescriptions') !== -1 || raw.indexOf('batch') !== -1 || raw.indexOf('expiry') !== -1 || raw.indexOf('report') !== -1 || raw.indexOf('alert') !== -1) {
      return null;
    }
    if (raw.indexOf('revenue by') !== -1 || raw.indexOf('sales by') !== -1 || raw === 'doctors dashboard' || raw === 'all doctors' || raw === 'doctor performance' || raw === 'doctor revenue' || raw === 'doctor patients' || raw === 'doctor orders' || raw === 'doctor commissions') {
      return null;
    }
    // Never match the parent category / domain accordion header ("Clinics & Hospitals", etc.)
    if (raw.indexOf('clinics & hospitals') !== -1 || raw.indexOf('clinics & hospit') !== -1 || raw.indexOf('clinics and hospitals') !== -1 || raw.startsWith('clinics &') || raw.startsWith('clinics and')) {
      return null;
    }
    if (raw === 'clinics dashboard' || raw.indexOf('clinics dashboard') >= 0 || raw === 'hospital command center') return 'dashboard';
    if (raw === 'all clinics' || raw.indexOf('all clinics') >= 0 || raw === 'outpatient clinics') return 'all-clinics';
    if (raw === 'hospitals' || raw === 'tertiary hospitals' || raw === '24x7 hospitals' || (raw.indexOf('hospitals') >= 0 && raw.indexOf('clinic') === -1 && raw.indexOf('&') === -1)) return 'hospitals';
    if (raw === 'clinic performance' || raw.indexOf('clinic performance') >= 0) return 'performance';
    if (raw === 'clinic revenue' || raw.indexOf('clinic revenue') >= 0 || raw === 'hospital revenue') return 'revenue';
    if (raw === 'clinic orders' || raw.indexOf('clinic orders') >= 0 || raw === 'clinical orders') return 'orders';
    if (raw === 'clinic patients' || raw.indexOf('clinic patients') >= 0 || raw === 'inpatients' || raw === 'ward patients') return 'patients';
    if (raw === 'clinic doctors' || raw.indexOf('clinic doctors') >= 0 || raw === 'clinicians' || raw === 'hospital doctors') return 'doctors';
    if (raw === 'clinic commissions' || raw.indexOf('clinic commissions') >= 0) return 'commissions';
    if (raw === 'clinic network' || raw.indexOf('clinic network') >= 0 || raw === 'facilities network') return 'network';
    return null;
  }

  /* ── Helper Renderers ─────────────────────────────────────────── */
  function kpiHtml(label, val, delta, trend, subtext, icon) {
    return [
      '<div class="zch-kpi">',
        '<div class="zch-kpi-top">',
          '<span class="zch-kpi-label">' + esc(label) + '</span>',
          '<span class="zch-kpi-icon">' + esc(icon || '🏥') + '</span>',
        '</div>',
        '<div class="zch-kpi-val">' + esc(val) + '</div>',
        '<div class="zch-kpi-bottom">',
          '<span class="zch-delta ' + (trend === 'up' ? 'up' : trend === 'down' ? 'down' : 'warn') + '">' + (trend === 'up' ? '↑ ' : trend === 'down' ? '↓ ' : '• ') + esc(delta) + '</span>',
          '<span class="zch-subtext">' + esc(subtext) + '</span>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 1: Clinics Dashboard ─────────────────────────────────── */
  function renderDashboard() {
    return [
      '<div class="zch-kpi-grid">',
        kpiHtml('Network Inpatients', '86 / 98 Beds', '87.8% Occupancy', 'up', 'Across 14 Facilities', '🛏️'),
        kpiHtml('Active Surgical Theatres', '9 / 10 OTs', '90% Utilization', 'up', '3 Advanced Modular OTs', '🩺'),
        kpiHtml('Clinical Quality Index', '99.2%', '+0.4% MoM', 'up', 'Zero Surgical Site Infections', '🛡️'),
        kpiHtml('Emergency Admissions', '24 Today', '6 Critical GDV/Trauma', 'warn', 'Avg Triage Time: 4.8 min', '🚨'),
        kpiHtml('Network Monthly Revenue', '₹78.40 Lakh', '+14.8% YoY', 'up', 'Surgeries + Inpatient + OPD', '💎'),
        kpiHtml('Emergency Ambulances', '8 Units', '3 Dispatched | 5 Ready', 'up', 'GPS Fleet Live', '🚑'),
      '</div>',

      '<div class="zch-grid-2">',
        '<div class="zch-card">',
          '<div class="zch-card-head">',
            '<div><h3 class="zch-card-title">🚨 Real-Time Emergency Triage & Inpatient Admissions</h3><p class="zch-card-sub">Live feed from tertiary trauma desks and surgical intake</p></div>',
            '<span class="zch-badge green">LIVE STREAM</span>',
          '</div>',
          '<div class="zch-table-wrap">',
            '<table class="zch-table">',
              '<thead><tr><th>Case & Pet</th><th>Clinical Indication</th><th>Facility</th><th>Attending Surgeon</th><th>Status</th></tr></thead>',
              '<tbody>',
                LIVE_ADMISSIONS.map(function (a) {
                  return '<tr>' +
                    '<td><b>' + esc(a.pet) + '</b><br><span style="font-family:IBM Plex Mono,monospace;font-size:10px;color:#38bdf8;">' + esc(a.id) + '</span></td>' +
                    '<td style="color:#f8fafc;">' + esc(a.reason) + '</td>' +
                    '<td style="color:#94a3b8;">' + esc(a.facility) + '</td>' +
                    '<td><span style="color:#cbd5e1;font-weight:600;">' + esc(a.doctor) + '</span><br><span style="font-size:10px;color:#64748b;">' + esc(a.bed) + '</span></td>' +
                    '<td><span class="zch-badge ' + (a.status === 'In Surgery' ? 'red' : a.status === 'Admitted' ? 'blue' : 'green') + '">' + esc(a.status) + '</span></td>' +
                  '</tr>';
                }).join(''),
              '</tbody>',
            '</table>',
          '</div>',
        '</div>',

        '<div class="zch-card">',
          '<div class="zch-card-head">',
            '<div><h3 class="zch-card-title">🏥 Facility Census & Inpatient Bed Capacity</h3><p class="zch-card-sub">Real-time status of high-dependency and surgical units</p></div>',
            '<button class="zch-btn primary" onclick="ZenveClinicsDashboard.switchTab(\'hospitals\')">View All Hospitals →</button>',
          '</div>',
          '<div class="zch-table-wrap">',
            '<table class="zch-table">',
              '<thead><tr><th>Facility</th><th>City</th><th>Occupancy</th><th>OT Load</th><th>Status</th></tr></thead>',
              '<tbody>',
                FACILITIES.slice(0, 5).map(function (f) {
                  return '<tr>' +
                    '<td><b>' + esc(f.name) + '</b><br><span style="font-size:11px;color:#94a3b8;">' + esc(f.type) + '</span></td>' +
                    '<td><span class="zch-badge blue">' + esc(f.city) + '</span></td>' +
                    '<td style="font-family:IBM Plex Mono,monospace;font-weight:600;">' + esc(f.beds) + '</td>' +
                    '<td><span style="color:#38bdf8;font-weight:600;">' + esc(f.ot) + '</span></td>' +
                    '<td><span class="zch-badge green">' + esc(f.status) + '</span></td>' +
                  '</tr>';
                }).join(''),
              '</tbody>',
            '</table>',
          '</div>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 2: All Clinics ───────────────────────────────────────── */
  function renderAllClinics() {
    return [
      '<div class="zch-kpi-grid">',
        kpiHtml('Outpatient Facilities', '11 Clinics', 'Primary & Secondary', 'up', 'Neighbourhood pet wellness', '🏨'),
        kpiHtml('Daily OPD Footfall', '342 Visits', '+12.4% vs last mo', 'up', 'Consultations & Vaccinations', '👥'),
        kpiHtml('Average Consultation Time', '18.4 mins', 'Thorough clinical workup', 'up', 'Target: 15–20 mins', '⏱️'),
        kpiHtml('Outpatient Revenue', '₹28.40 Lakh', '36.2% of network total', 'up', 'Pharmacy + Diagnostic add-on', '💰'),
      '</div>',

      '<div class="zch-card">',
        '<div class="zch-card-head">',
          '<div><h3 class="zch-card-title">Outpatient Clinics Directory & Care Centers</h3><p class="zch-card-sub">Daycare suites, lead veterinarians, diagnostic equipment, and patient volume</p></div>',
          '<div style="display:flex;gap:8px;">',
            '<button class="zch-btn primary" onclick="ZenveClinicsDashboard.showNewClinicModal()">+ Register New Clinic</button>',
          '</div>',
        '</div>',

        '<div class="zch-table-wrap">',
          '<table class="zch-table">',
            '<thead><tr><th>Clinic Name & Code</th><th>City Cluster</th><th>Tier & Focus</th><th>Lead Veterinarian</th><th>Inpatient/Daycare</th><th>OT Capability</th><th>Status</th><th>Actions</th></tr></thead>',
            '<tbody>',
              FACILITIES.filter(function (f) { return !f.type.includes('Tertiary'); }).map(function (f) {
                return '<tr>' +
                  '<td><b>' + esc(f.name) + '</b><br><span style="font-family:IBM Plex Mono,monospace;font-size:10px;color:#38bdf8;">' + esc(f.id) + '</span></td>' +
                  '<td><span class="zch-badge blue">' + esc(f.city) + '</span></td>' +
                  '<td><div style="font-weight:600;color:#f8fafc;">' + esc(f.type) + '</div><div style="font-size:10px;color:#94a3b8;">Preventive & Daycare</div></td>' +
                  '<td><div style="font-weight:600;color:#cbd5e1;">' + esc(f.lead) + '</div></td>' +
                  '<td style="font-family:IBM Plex Mono,monospace;font-weight:600;">' + esc(f.beds) + '</td>' +
                  '<td><span style="color:#38bdf8;">' + esc(f.ot) + '</span></td>' +
                  '<td><span class="zch-badge green">' + esc(f.status) + '</span></td>' +
                  '<td><button class="zch-btn" onclick="alert(\'Viewing telemetry for ' + esc(f.name) + '\')">Details</button></td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 3: Hospitals ─────────────────────────────────────────── */
  function renderHospitals() {
    return [
      '<div class="zch-kpi-grid">',
        kpiHtml('Tertiary Referral Hospitals', '3 Flagships', '24x7 Multi-Specialty', 'up', 'BLR, BOM, DEL Hubs', '🚨'),
        kpiHtml('Total Licensed Beds', '76 Beds', '19 Dedicated ICU Pods', 'up', 'Oxygenated & Isolations', '🛏️'),
        kpiHtml('Modular Operating Theatres', '7 Theatres', 'C-Arm & Laparoscopy', 'up', '100% HEPA Class 10,000', '🩺'),
        kpiHtml('Emergency Blood Bank', '38 Units Ready', 'Dog & Cat Blood Bank', 'up', 'Stored at 4°C with crossmatch', '🩸'),
      '</div>',

      '<div class="zch-grid-2">',
        '<div class="zch-card">',
          '<div class="zch-card-head">',
            '<div><h3 class="zch-card-title">24x7 Tertiary Flagship Hospitals</h3><p class="zch-card-sub">Advanced diagnostic imaging (CT/MRI), blood banking, and multi-specialty surgery</p></div>',
          '</div>',
          '<div style="display:flex;flex-direction:column;gap:12px;">',
            FACILITIES.filter(function (f) { return f.type.includes('Tertiary'); }).map(function (h) {
              return '<div style="background:#090e17;border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:16px;">' +
                '<div style="display:flex;justify-content:space-between;align-items:flex-start;">' +
                  '<div>' +
                    '<span style="font-size:10px;color:#38bdf8;font-weight:700;text-transform:uppercase;">' + esc(h.city) + ' REGIONAL HUB</span>' +
                    '<h4 style="margin:2px 0 4px;font-size:15px;color:#fff;">' + esc(h.name) + '</h4>' +
                    '<div style="font-size:12px;color:#94a3b8;">Medical Director: <strong style="color:#cbd5e1;">' + esc(h.lead) + '</strong></div>' +
                  '</div>' +
                  '<span class="zch-badge green">24x7 Active</span>' +
                '</div>' +
                '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-top:12px;padding-top:12px;border-top:1px solid rgba(255,255,255,0.06);font-size:11px;">' +
                  '<div><span style="color:#64748b;">Bed Census:</span><div style="font-weight:700;color:#fff;font-family:IBM Plex Mono,monospace;">' + esc(h.beds) + '</div></div>' +
                  '<div><span style="color:#64748b;">Surgical OT:</span><div style="font-weight:700;color:#38bdf8;font-family:IBM Plex Mono,monospace;">' + esc(h.ot) + '</div></div>' +
                  '<div><span style="color:#64748b;">Daily Revenue:</span><div style="font-weight:700;color:#10b981;font-family:IBM Plex Mono,monospace;">' + esc(h.rev) + '</div></div>' +
                '</div>' +
              '</div>';
            }).join(''),
          '</div>',
        '</div>',

        '<div class="zch-card">',
          '<div class="zch-card-head">',
            '<div><h3 class="zch-card-title">Live Surgical Theatre Schedule</h3><p class="zch-card-sub">Active and upcoming operations across tertiary facilities</p></div>',
            '<span class="zch-badge blue">OT ROSTER</span>',
          '</div>',
          '<div class="zch-table-wrap">',
            '<table class="zch-table">',
              '<thead><tr><th>Patient & Surgery</th><th>OT Suite</th><th>Surgeon</th><th>Anesthetist</th><th>Schedule</th></tr></thead>',
              '<tbody>',
                '<tr><td><b>Bruno (Labrador)</b><br><span style="color:#f87171;">TPLO Cruciate Repair</span></td><td>OT-1 (Koramangala)</td><td>Dr. Priya Sharma</td><td>Dr. Arun V.</td><td><span class="zch-badge red">In Progress</span></td></tr>',
                '<tr><td><b>Simba (Persian Cat)</b><br><span style="color:#38bdf8;">Perineal Urethrostomy</span></td><td>OT-1 (Bandra)</td><td>Dr. Rahul Mehta</td><td>Dr. Preethi</td><td><span class="zch-badge amber">11:30 AM</span></td></tr>',
                '<tr><td><b>Rocky (German Shep)</b><br><span style="color:#c084fc;">Hemilaminectomy L2-L3</span></td><td>OT-2 (Delhi Okhla)</td><td>Dr. Aisha Khan</td><td>Dr. Ajay</td><td><span class="zch-badge amber">02:00 PM</span></td></tr>',
                '<tr><td><b>Coco (Pug)</b><br><span style="color:#34d399;">Soft Palate & Nares</span></td><td>OT-2 (Koramangala)</td><td>Dr. Arun V.</td><td>Dr. Sneha</td><td><span class="zch-badge green">Completed</span></td></tr>',
              '</tbody>',
            '</table>',
          '</div>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 4: Clinic Performance ────────────────────────────────── */
  function renderPerformance() {
    return [
      '<div class="zch-kpi-grid">',
        kpiHtml('Surgical Success Rate', '99.2%', '+0.3% YoY', 'up', 'Benchmark target: >98.5%', '🩺'),
        kpiHtml('Client CSAT Score', '4.94 / 5.0', '1,420 Reviews', 'up', 'Post-discharge satisfaction', '⭐'),
        kpiHtml('Average Wait Time', '7.4 mins', '-2.1 mins MoM', 'up', 'Target: Under 10 minutes', '⏱️'),
        kpiHtml('Clinical Audit Compliance', '98.8%', 'VCI & ISO Accredited', 'up', '100% Sterilization Pass', '📋'),
      '</div>',

      '<div class="zch-card">',
        '<div class="zch-card-head">',
          '<div><h3 class="zch-card-title">Network Facilities Performance Benchmarking</h3><p class="zch-card-sub">OPD throughput, surgical volume, bed turnaround, and patient experience ratings</p></div>',
          '<button class="zch-btn" onclick="alert(\'Exporting Clinical Quality Audit PDF report...\')">Download Quality Audit PDF</button>',
        '</div>',
        '<div class="zch-table-wrap">',
          '<table class="zch-table">',
            '<thead><tr><th>Facility</th><th>City</th><th>Monthly Surgeries</th><th>OPD Visits</th><th>Bed Turnaround</th><th>Infection Rate</th><th>Client CSAT</th><th>Performance Index</th></tr></thead>',
            '<tbody>',
              FACILITIES.map(function (f, i) {
                var surg = 45 - (i * 3);
                var opd = 520 - (i * 35);
                var turn = (1.8 + (i * 0.1)).toFixed(1) + ' days';
                var csat = (4.96 - (i * 0.02)).toFixed(2);
                return '<tr>' +
                  '<td><b>' + esc(f.name) + '</b></td>' +
                  '<td><span class="zch-badge blue">' + esc(f.city) + '</span></td>' +
                  '<td style="font-family:IBM Plex Mono,monospace;font-weight:600;">' + (surg > 10 ? surg : 12) + '</td>' +
                  '<td style="font-family:IBM Plex Mono,monospace;">' + opd + '</td>' +
                  '<td style="font-family:IBM Plex Mono,monospace;">' + turn + '</td>' +
                  '<td><span style="color:#10b981;font-weight:600;">0.0%</span></td>' +
                  '<td style="color:#fbbf24;font-weight:700;">' + csat + ' ★</td>' +
                  '<td><span class="zch-badge green">9' + (8 - i % 3) + '% Top Tier</span></td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 5: Clinic Revenue ────────────────────────────────────── */
  function renderRevenue() {
    return [
      '<div class="zch-kpi-grid">',
        kpiHtml('Total Network Revenue', '₹78.40 Lakh', '+14.8% YoY', 'up', 'Current Month Net Billings', '💰'),
        kpiHtml('Surgeries & Procedures', '₹29.40 Lakh', '37.5% Share', 'up', 'High-margin surgical theatre', '🩺'),
        kpiHtml('Outpatient Consultations', '₹20.15 Lakh', '25.7% Share', 'up', 'Primary preventive footfall', '👥'),
        kpiHtml('Diagnostic Imaging & Lab', '₹15.68 Lakh', '20.0% Share', 'up', 'CT, USG, Digital X-Ray, Blood', '🔬'),
        kpiHtml('Inpatient ICU & Wards', '₹13.17 Lakh', '16.8% Share', 'up', 'Critical care bed days', '🛏️'),
        kpiHtml('Avg Ticket Size / Pet', '₹3,420', '+8.2% YoY', 'up', 'Integrated medical pathway', '📈'),
      '</div>',

      '<div class="zch-grid-2">',
        '<div class="zch-card">',
          '<div class="zch-card-head">',
            '<div><h3 class="zch-card-title">Departmental Revenue Contribution</h3><p class="zch-card-sub">Clinical billing distribution across major practice streams</p></div>',
          '</div>',
          '<div style="display:flex;flex-direction:column;gap:14px;padding:8px 0;">',
            '<div>' +
              '<div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:6px;"><span>Surgical & Anesthetic Procedures</span><strong style="color:#38bdf8;">₹29,40,000 (37.5%)</strong></div>' +
              '<div class="zch-progress-bar"><div class="zch-progress-fill" style="width:37.5%;background:#38bdf8;"></div></div>' +
            '</div>' +
            '<div>' +
              '<div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:6px;"><span>Outpatient Consultations & Vaccinations</span><strong style="color:#34d399;">₹20,15,000 (25.7%)</strong></div>' +
              '<div class="zch-progress-bar"><div class="zch-progress-fill" style="width:25.7%;background:#34d399;"></div></div>' +
            '</div>' +
            '<div>' +
              '<div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:6px;"><span>Diagnostics, Ultrasound & CT Imaging</span><strong style="color:#c084fc;">₹15,68,000 (20.0%)</strong></div>' +
              '<div class="zch-progress-bar"><div class="zch-progress-fill" style="width:20.0%;background:#c084fc;"></div></div>' +
            '</div>' +
            '<div>' +
              '<div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:6px;"><span>Inpatient Critical Care & ICU Stays</span><strong style="color:#fbbf24;">₹13,17,000 (16.8%)</strong></div>' +
              '<div class="zch-progress-bar"><div class="zch-progress-fill" style="width:16.8%;background:#fbbf24;"></div></div>' +
            '</div>' +
          '</div>',
        '</div>',

        '<div class="zch-card">',
          '<div class="zch-card-head">',
            '<div><h3 class="zch-card-title">Facility Monthly Billing League</h3><p class="zch-card-sub">Top revenue centers across India clusters</p></div>',
          '</div>',
          '<div class="zch-table-wrap">',
            '<table class="zch-table">',
              '<thead><tr><th>Facility</th><th>City</th><th>Monthly Billings</th><th>Growth YoY</th></tr></thead>',
              '<tbody>',
                FACILITIES.map(function (f) {
                  return '<tr>' +
                    '<td><b>' + esc(f.name) + '</b></td>' +
                    '<td><span class="zch-badge blue">' + esc(f.city) + '</span></td>' +
                    '<td style="font-family:IBM Plex Mono,monospace;font-weight:700;color:#10b981;">' + esc(f.rev) + '</td>' +
                    '<td><span style="color:#10b981;font-weight:600;">+14.2%</span></td>' +
                  '</tr>';
                }).join(''),
              '</tbody>',
            '</table>',
          '</div>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 6: Clinic Orders ─────────────────────────────────────── */
  function renderOrders() {
    return [
      '<div class="zch-kpi-grid">',
        kpiHtml('Clinical PO Volume', '₹4,82,000', '16 Requisitions', 'up', 'Surgeries, implants, consumables', '📦'),
        kpiHtml('Critical Implants & Ortho', '12 Kits', 'Titanium TPLO / Plates', 'up', '100% Sterilized Stocked', '🔩'),
        kpiHtml('Medical Gases (O2 & N2O)', '48 Cylinders', '100% Hospital Reserves', 'up', 'Dual manifold backup', '💨'),
        kpiHtml('Pending Approvals', '3 POs', 'Requires Medical Director Signoff', 'warn', 'Immediate Action', '⏳'),
      '</div>',

      '<div class="zch-card">',
        '<div class="zch-card-head">',
          '<div><h3 class="zch-card-title">Clinical Supply Requisitions & Purchase Orders</h3><p class="zch-card-sub">Surgical implants, anesthesia supplies, diagnostic reagents, and surgical packs</p></div>',
          '<button class="zch-btn primary" onclick="ZenveClinicsDashboard.showNewOrderModal()">+ Create Requisition PO</button>',
        '</div>',
        '<div class="zch-table-wrap">',
          '<table class="zch-table">',
            '<thead><tr><th>PO Number</th><th>Target Facility</th><th>Clinical Item Description</th><th>Vendor / Supplier</th><th>Qty</th><th>Value</th><th>Priority</th><th>Status</th><th>Actions</th></tr></thead>',
            '<tbody>',
              CLINIC_ORDERS.map(function (o) {
                return '<tr>' +
                  '<td style="font-family:IBM Plex Mono,monospace;font-weight:600;color:#38bdf8;">' + esc(o.po) + '</td>' +
                  '<td><b>' + esc(o.facility) + '</b></td>' +
                  '<td>' + esc(o.item) + '</td>' +
                  '<td style="color:#94a3b8;">' + esc(o.vendor) + '</td>' +
                  '<td style="font-family:IBM Plex Mono,monospace;">' + esc(o.qty) + '</td>' +
                  '<td style="font-family:IBM Plex Mono,monospace;font-weight:600;color:#f8fafc;">' + esc(o.cost) + '</td>' +
                  '<td><span class="zch-badge ' + (o.priority === 'Critical' ? 'red' : o.priority === 'High' ? 'amber' : 'blue') + '">' + esc(o.priority) + '</span></td>' +
                  '<td><span class="zch-badge ' + (o.status.includes('Approved') ? 'green' : o.status.includes('Delivered') ? 'blue' : 'amber') + '">' + esc(o.status) + '</span></td>' +
                  '<td><button class="zch-btn" onclick="alert(\'Viewing invoice and tracking for ' + esc(o.po) + '\')">Inspect</button></td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 7: Clinic Patients ───────────────────────────────────── */
  function renderPatients() {
    return [
      '<div class="zch-kpi-grid">',
        kpiHtml('Active Inpatients', '86 Patients', 'Across 14 facilities', 'up', 'Canine: 62 | Feline: 24', '🐾'),
        kpiHtml('Critical Care ICU', '14 Pets', 'Continuous ECG & Arterial BP', 'warn', '1:1 Nurse Nursing Ratio', '❤️'),
        kpiHtml('Average Length of Stay', '2.8 Days', '-0.4 days faster recovery', 'up', 'Early mobility protocol', '📅'),
        kpiHtml('Discharges Planned Today', '18 Pets', 'Homecare kits prepared', 'up', 'Post-op discharge clearance', '🏠'),
      '</div>',

      '<div class="zch-card">',
        '<div class="zch-card-head">',
          '<div><h3 class="zch-card-title">Inpatient Ward Census & Telemetry Roster</h3><p class="zch-card-sub">Admitted pets, diagnosis, attending clinical lead, and real-time vital status</p></div>',
          '<button class="zch-btn primary" onclick="alert(\'Opening Inpatient Admission Form...\')">+ Admit Inpatient</button>',
        '</div>',
        '<div class="zch-table-wrap">',
          '<table class="zch-table">',
            '<thead><tr><th>Patient & Code</th><th>Pet Parent</th><th>Admission Date</th><th>Facility & Bed</th><th>Clinical Diagnosis</th><th>Attending Doctor</th><th>Current Vitals</th><th>Care Status</th><th>Discharge</th></tr></thead>',
            '<tbody>',
              INPATIENTS.map(function (p) {
                return '<tr>' +
                  '<td><b>' + esc(p.pet) + '</b><br><span style="font-family:IBM Plex Mono,monospace;font-size:10px;color:#38bdf8;">' + esc(p.id) + '</span></td>' +
                  '<td style="color:#cbd5e1;">' + esc(p.owner) + '</td>' +
                  '<td style="font-family:IBM Plex Mono,monospace;">' + esc(p.admitDate) + '</td>' +
                  '<td><b>' + esc(p.facility) + '</b><br><span style="color:#38bdf8;font-size:11px;">' + esc(p.bed) + '</span></td>' +
                  '<td style="color:#f8fafc;">' + esc(p.dx) + '</td>' +
                  '<td style="color:#cbd5e1;font-weight:600;">' + esc(p.doc) + '</td>' +
                  '<td><span style="font-family:IBM Plex Mono,monospace;font-size:11px;color:#34d399;">' + esc(p.vitals) + '</span></td>' +
                  '<td><span class="zch-badge ' + (p.status.includes('Critical') ? 'red' : p.status.includes('High') ? 'amber' : 'green') + '">' + esc(p.status) + '</span></td>' +
                  '<td><button class="zch-btn" onclick="alert(\'Discharge protocol initiated for ' + esc(p.pet) + '\')">Discharge</button></td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 8: Clinic Doctors (Comprehensive & Dedicated) ────────── */
  function renderDoctors() {
    var search = (S.docSearch || '').toLowerCase().trim();
    var specialty = S.docSpecialty || 'ALL';
    var duty = S.docDuty || 'ALL';

    var filtered = DOCTORS.filter(function (d) {
      if (specialty !== 'ALL' && d.spec.toLowerCase().indexOf(specialty.toLowerCase()) === -1) return false;
      if (duty !== 'ALL' && d.status !== duty) return false;
      if (search) {
        var str = (d.name + ' ' + d.qual + ' ' + d.spec + ' ' + d.base + ' ' + d.vci).toLowerCase();
        if (str.indexOf(search) === -1) return false;
      }
      return true;
    });

    return [
      '<div class="zch-kpi-grid">',
        kpiHtml('Registered Veterinary Doctors', '48 Clinicians', '100% VCI Verified', 'up', 'Resident & Specialist Staff', '👨‍⚕️'),
        kpiHtml('Specialist Surgeons', '14 Surgeons', 'Ortho, Neuro & Soft Tissue', 'up', 'Board-Certified M.V.Sc', '🔪'),
        kpiHtml('Clinicians On-Duty Now', '32 Active', 'Morning & Evening Shifts', 'up', 'All 14 Centers Staffed', '⚡'),
        kpiHtml('In Surgery Right Now', '6 Surgeons', 'Modular OTs Active', 'warn', 'Zero SSI Infection Rate', '🩺'),
        kpiHtml('Doctor Patient CSAT', '4.95 / 5.0', '5,420 Verified Reviews', 'up', 'Top Clinical Empathy', '⭐'),
        kpiHtml('Monthly Consultations', '4,820 Visits', '+14.2% MoM Throughput', 'up', 'Avg 18m / Consultation', '🐾'),
      '</div>',

      '<div class="zch-card">',
        '<div class="zch-card-head">',
          '<div>',
            '<h3 class="zch-card-title">Veterinary Medical Staff & Surgical Specialist Registry</h3>',
            '<p class="zch-card-sub">State Veterinary Council (VCI) registrations, hospital assignments, shift rosters, and surgical performance</p>',
          '</div>',
          '<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">',
            '<button class="zch-btn" onclick="alert(\'Exporting weekly doctor duty roster across all 14 hospitals...\')">📅 Export Shift Schedule</button>',
            '<button class="zch-btn primary" onclick="ZenveClinicsDashboard.showAddDoctorModal()">+ Register New Doctor</button>',
          '</div>',
        '</div>',

        '<div class="zch-filters">',
          '<input type="text" class="zch-input" style="min-width:240px;" placeholder="Search doctor, hospital, license, specialty..." value="' + esc(S.docSearch) + '" oninput="ZenveClinicsDashboard.filterDoctors(this.value, null, null)" />',
          '<select class="zch-select" onchange="ZenveClinicsDashboard.filterDoctors(null, this.value, null)">',
            '<option value="ALL"' + (specialty === 'ALL' ? ' selected' : '') + '>All Clinical Specialties</option>',
            '<option value="Orthopedic"' + (specialty === 'Orthopedic' ? ' selected' : '') + '>Orthopedics & TPLO</option>',
            '<option value="Neuro"' + (specialty === 'Neuro' ? ' selected' : '') + '>Neurosurgery</option>',
            '<option value="Oncology"' + (specialty === 'Oncology' ? ' selected' : '') + '>Veterinary Oncology</option>',
            '<option value="Internal"' + (specialty === 'Internal' ? ' selected' : '') + '>Internal Medicine</option>',
            '<option value="Feline"' + (specialty === 'Feline' ? ' selected' : '') + '>Feline Medicine</option>',
            '<option value="Emergency"' + (specialty === 'Emergency' ? ' selected' : '') + '>Critical Care & Emergency</option>',
            '<option value="Ophthalmology"' + (specialty === 'Ophthalmology' ? ' selected' : '') + '>Ophthalmology</option>',
          '</select>',
          '<select class="zch-select" onchange="ZenveClinicsDashboard.filterDoctors(null, null, this.value)">',
            '<option value="ALL"' + (duty === 'ALL' ? ' selected' : '') + '>All Duty Statuses</option>',
            '<option value="On Duty"' + (duty === 'On Duty' ? ' selected' : '') + '>On Duty</option>',
            '<option value="In Surgery"' + (duty === 'In Surgery' ? ' selected' : '') + '>In Surgery</option>',
            '<option value="On Call"' + (duty === 'On Call' ? ' selected' : '') + '>On Call Emergency</option>',
            '<option value="Off Duty"' + (duty === 'Off Duty' ? ' selected' : '') + '>Off Duty</option>',
          '</select>',
          '<span style="font-size:12px;color:#94a3b8;margin-left:auto;">Showing <b>' + filtered.length + '</b> of ' + DOCTORS.length + ' Clinicians</span>',
        '</div>',

        '<div class="zch-table-wrap">',
          '<table class="zch-table">',
            '<thead>',
              '<tr>',
                '<th>Doctor Name & Code</th>',
                '<th>Specialization & Degrees</th>',
                '<th>VCI License</th>',
                '<th>Hospital / Facility Base</th>',
                '<th>Current Duty Shift</th>',
                '<th style="text-align:right;">Consults</th>',
                '<th style="text-align:right;">Surgeries</th>',
                '<th style="text-align:right;">Client CSAT</th>',
                '<th>Status</th>',
                '<th style="text-align:center;">Action</th>',
              '</tr>',
            '</thead>',
            '<tbody>',
              filtered.map(function (d) {
                var statusClass = d.status === 'On Duty' ? 'green' : d.status === 'In Surgery' ? 'red' : d.status === 'On Call' ? 'amber' : 'purple';
                return '<tr>' +
                  '<td>' +
                    '<div style="display:flex;align-items:center;gap:10px;">' +
                      '<div style="width:32px;height:32px;border-radius:50%;background:rgba(59,130,246,0.15);border:1px solid rgba(59,130,246,0.3);color:#60a5fa;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:11px;">' + esc(d.name.split(' ').map(function(n){ return n[0]; }).join('').replace('D', '')) + '</div>' +
                      '<div>' +
                        '<b style="color:#fff;">' + esc(d.name) + '</b>' +
                        '<div style="font-family:IBM Plex Mono,monospace;font-size:10px;color:#38bdf8;">' + esc(d.id) + '</div>' +
                      '</div>' +
                    '</div>' +
                  '</td>' +
                  '<td>' +
                    '<div style="font-weight:600;color:#60a5fa;">' + esc(d.spec) + '</div>' +
                    '<div style="font-size:11px;color:#94a3b8;">' + esc(d.qual) + '</div>' +
                  '</td>' +
                  '<td style="font-family:IBM Plex Mono,monospace;color:#c084fc;font-weight:600;">' + esc(d.vci) + '</td>' +
                  '<td><span class="zch-badge blue">' + esc(d.base) + '</span></td>' +
                  '<td><span style="color:#cbd5e1;font-size:11px;">' + esc(d.shift) + '</span></td>' +
                  '<td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:600;">' + esc(d.consults) + '</td>' +
                  '<td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#10b981;">' + esc(d.surgeries) + '</td>' +
                  '<td style="text-align:right;color:#fbbf24;font-weight:700;">' + esc(d.csat) + '</td>' +
                  '<td><span class="zch-badge ' + statusClass + '">' + esc(d.status) + '</span></td>' +
                  '<td style="text-align:center;">' +
                    '<button class="zch-btn" onclick="ZenveClinicsDashboard.showDoctorBioModal(\'' + esc(d.id) + '\')">View Bio</button>' +
                  '</td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>',

      /* Surgical & Emergency On-Call Rostering Split */
      '<div class="zch-grid-2">',
        '<div class="zch-card">',
          '<div class="zch-card-head">',
            '<div><h3 class="zch-card-title">🚨 Emergency & 24x7 Night Trauma Roster</h3><p class="zch-card-sub">Immediate on-call coverage for critical emergency surgical interventions</p></div>',
            '<span class="zch-badge red">24x7 ACTIVE</span>',
          '</div>',
          '<div style="display:flex;flex-direction:column;gap:10px;">',
            '<div style="background:#090e17;border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:12px;display:flex;justify-content:space-between;align-items:center;">',
              '<div><b style="color:#fff;">Dr. Vikram Malhotra</b><div style="font-size:11px;color:#94a3b8;">Koramangala 24x7 Trauma • Ext 102</div></div>',
              '<span class="zch-badge green">On Station</span>',
            '</div>',
            '<div style="background:#090e17;border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:12px;display:flex;justify-content:space-between;align-items:center;">',
              '<div><b style="color:#fff;">Dr. Rahul Mehta (Neurosurgeon)</b><div style="font-size:11px;color:#94a3b8;">Bandra Specialty • Priority Dispatch</div></div>',
              '<span class="zch-badge red">In OT (Case 3)</span>',
            '</div>',
            '<div style="background:#090e17;border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:12px;display:flex;justify-content:space-between;align-items:center;">',
              '<div><b style="color:#fff;">Dr. Aisha Khan (Oncology & Critical)</b><div style="font-size:11px;color:#94a3b8;">Okhla Hospital • Tele-Triage Desk</div></div>',
              '<span class="zch-badge green">On Duty</span>',
            '</div>',
          '</div>',
        '</div>',

        '<div class="zch-card">',
          '<div class="zch-card-head">',
            '<div><h3 class="zch-card-title">📚 Continuing Veterinary Medical Education (CME)</h3><p class="zch-card-sub">Clinical accreditation status, surgical simulations, and peer case audits</p></div>',
            '<span class="zch-badge blue">100% COMPLIANT</span>',
          '</div>',
          '<div style="display:flex;flex-direction:column;gap:12px;padding:4px 0;">',
            '<div>',
              '<div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:6px;"><span>Small Animal Arthroscopy & TPLO Hands-on</span><strong style="color:#38bdf8;">14/14 Surgeons Certified</strong></div>',
              '<div class="zch-progress-bar"><div class="zch-progress-fill" style="width:100%;background:#38bdf8;"></div></div>',
            '</div>',
            '<div>',
              '<div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:6px;"><span>Feline Friendly Clinical Handling Protocol</span><strong style="color:#34d399;">48/48 Clinicians Completed</strong></div>',
              '<div class="zch-progress-bar"><div class="zch-progress-fill" style="width:100%;background:#34d399;"></div></div>',
            '</div>',
            '<div>',
              '<div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:6px;"><span>Antimicrobial Stewardship & Infection Control</span><strong style="color:#c084fc;">Annual Audit Score: 99.2%</strong></div>',
              '<div class="zch-progress-bar"><div class="zch-progress-fill" style="width:99.2%;background:#c084fc;"></div></div>',
            '</div>',
          '</div>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 9: Clinic Commissions ────────────────────────────────── */
  function renderCommissions() {
    return [
      '<div class="zch-kpi-grid">',
        kpiHtml('Total Partner Payouts', '₹8,42,000', 'Current Month Accrual', 'up', 'Partner clinics & consultants', '🤝'),
        kpiHtml('Referral Cases Handled', '68 Surgeries', '+22% vs Last Mo', 'up', 'High-complexity referrals', '🔄'),
        kpiHtml('Average Commission Rate', '11.8%', 'Standard 10% B2B Referral', 'up', 'Surgical revenue basis', '📊'),
        kpiHtml('Statutory TDS Deducted', '₹84,200', '10% Section 194J', 'up', 'Tax compliance remitted', '🏛️'),
      '</div>',

      '<div class="zch-card">',
        '<div class="zch-card-head">',
          '<div><h3 class="zch-card-title">B2B Clinic Referrals & Visiting Specialist Settlements</h3><p class="zch-card-sub">Transparent revenue sharing, patient referral volume, 10% TDS withholding, and disbursement status</p></div>',
          '<button class="zch-btn primary" onclick="alert(\'Bulk NEFT Bank Transfer initiated for approved commissions!\')">Process Approved Payouts</button>',
        '</div>',
        '<div class="zch-table-wrap">',
          '<table class="zch-table">',
            '<thead><tr><th>Settlement ID</th><th>Partner Clinic / Consultant</th><th>Affiliation Type</th><th>Cases Referred</th><th>Total Case Value</th><th>Comm %</th><th>Gross Comm</th><th>10% TDS</th><th>Net Payable</th><th>Status</th></tr></thead>',
            '<tbody>',
              COMMISSIONS.map(function (c) {
                return '<tr>' +
                  '<td style="font-family:IBM Plex Mono,monospace;font-weight:600;color:#38bdf8;">' + esc(c.id) + '</td>' +
                  '<td><b>' + esc(c.partner) + '</b></td>' +
                  '<td><span class="zch-badge blue">' + esc(c.type) + '</span></td>' +
                  '<td style="font-family:IBM Plex Mono,monospace;font-weight:600;">' + c.cases + ' cases</td>' +
                  '<td style="font-family:IBM Plex Mono,monospace;">' + esc(c.val) + '</td>' +
                  '<td style="font-family:IBM Plex Mono,monospace;color:#38bdf8;">' + esc(c.rate) + '</td>' +
                  '<td style="font-family:IBM Plex Mono,monospace;font-weight:600;">' + esc(c.comm) + '</td>' +
                  '<td style="font-family:IBM Plex Mono,monospace;color:#f87171;">' + esc(c.tds) + '</td>' +
                  '<td style="font-family:IBM Plex Mono,monospace;font-weight:700;color:#10b981;">' + esc(c.net) + '</td>' +
                  '<td><span class="zch-badge ' + (c.status === 'Paid' ? 'green' : c.status === 'Approved' ? 'blue' : 'amber') + '">' + esc(c.status) + '</span></td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 10: Clinic Network ───────────────────────────────────── */
  function renderNetwork() {
    return [
      '<div class="zch-kpi-grid">',
        kpiHtml('Active Network Facilities', '14 Centers', '3 Flagships + 11 Spokes', 'up', 'Operating across 5 Metros', '🌐'),
        kpiHtml('ALS Pet Ambulance Fleet', '8 Units', '3 Dispatched | 5 Ready', 'up', 'GPS mobile ICU vehicles', '🚑'),
        kpiHtml('Inter-Facility Transfers', '184 / mo', '+18.4% MoM', 'up', 'Peripheral to tertiary hubs', '🔄'),
        kpiHtml('Avg Emergency Transit Time', '24.6 mins', '-4.2 mins faster', 'up', 'Dedicated veterinary corridor', '⏱️'),
        kpiHtml('Cloud Tele-PACS Sync', '99.96%', 'Tier 4 Cloud EMR', 'up', 'Sub-second digital X-ray sync', '📶'),
        kpiHtml('Expansion Pipeline', '4 In Build', 'Whitefield, Powai, Gachibowli', 'up', '+65 Beds Capacity 2027', '🏗️'),
      '</div>',

      '<div class="zch-grid-2">',
        '<div class="zch-card">',
          '<div class="zch-card-head">',
            '<div><h3 class="zch-card-title">Hub-and-Spoke Regional Corridors</h3><p class="zch-card-sub">Tertiary hubs anchor specialized neuro, ortho, and oncologic care</p></div>',
            '<span class="zch-badge green">100% TELEMED READY</span>',
          '</div>',
          '<div style="display:flex;flex-direction:column;gap:12px;">',
            '<div style="background:#090e17;border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:14px;">' +
              '<div style="display:flex;justify-content:space-between;margin-bottom:6px;"><b style="color:#38bdf8;">Southern Hub: Koramangala 24x7</b><span class="zch-badge blue">32 Beds | 3 OTs</span></div>' +
              '<div style="font-size:12px;color:#94a3b8;margin-bottom:8px;">Connected Spokes: Indiranagar Care (12 min ALS), Jayanagar OPD (18 min ALS), Whitefield Tech Hub (32 min ALS)</div>' +
              '<div style="font-size:11px;color:#34d399;">● Real-time Tele-radiology & Emergency Referral Corridor Active</div>' +
            '</div>' +
            '<div style="background:#090e17;border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:14px;">' +
              '<div style="display:flex;justify-content:space-between;margin-bottom:6px;"><b style="color:#c084fc;">Western Hub: Bandra Multi-Specialty</b><span class="zch-badge purple">24 Beds | 2 OTs</span></div>' +
              '<div style="font-size:12px;color:#94a3b8;margin-bottom:8px;">Connected Spokes: Andheri West Express (15 min ALS), Koregaon Park Clinic Pune (Tele-PACS Link)</div>' +
              '<div style="font-size:11px;color:#34d399;">● 24x7 Neuro-Surgical Referral & Advanced Critical Care Link</div>' +
            '</div>' +
            '<div style="background:#090e17;border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:14px;">' +
              '<div style="display:flex;justify-content:space-between;margin-bottom:6px;"><b style="color:#fbbf24;">Northern Hub: Okhla Animal Hospital</b><span class="zch-badge amber">20 Beds | 2 OTs</span></div>' +
              '<div style="font-size:12px;color:#94a3b8;margin-bottom:8px;">Connected Spokes: Gurgaon Sector 29 Clinic (22 min ALS), DLF Phase 5 (Opening Q2 2027)</div>' +
              '<div style="font-size:11px;color:#34d399;">● Regional Veterinary Oncology & Chemotherapy Tumor Board Hub</div>' +
            '</div>' +
          '</div>',
        '</div>',

        '<div class="zch-card">',
          '<div class="zch-card-head">',
            '<div><h3 class="zch-card-title">24x7 ALS Mobile ICU Pet Ambulances</h3><p class="zch-card-sub">GPS tracked veterinary emergency response units</p></div>',
            '<span class="zch-badge green">8 UNITS LIVE</span>',
          '</div>',
          '<div style="display:flex;flex-direction:column;gap:10px;">',
            AMBULANCE_FLEET.map(function (amb) {
              return '<div style="background:#090e17;border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:12px;">' +
                '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">' +
                  '<div><b style="color:#fff;font-size:13px;">🚑 ' + esc(amb.vehicle) + '</b> <span style="font-family:IBM Plex Mono,monospace;font-size:10px;color:#64748b;">(' + esc(amb.id) + ')</span></div>' +
                  '<span class="zch-badge ' + (amb.status.includes('Transit') || amb.status.includes('Emergency') || amb.status.includes('Dispatched') ? 'red' : 'green') + '">' + esc(amb.status) + '</span>' +
                '</div>' +
                '<div style="display:flex;justify-content:space-between;font-size:11px;color:#94a3b8;margin-bottom:4px;">' +
                  '<span>Base: <strong style="color:#cbd5e1;">' + esc(amb.base) + '</strong></span>' +
                  '<span>Crew: <strong style="color:#cbd5e1;">' + esc(amb.medic) + '</strong></span>' +
                '</div>' +
                '<div style="font-size:10px;color:#64748b;margin-bottom:6px;">Equipment: ' + esc(amb.equipment) + '</div>' +
                '<div style="display:flex;justify-content:space-between;background:rgba(255,255,255,0.02);padding:4px 8px;border-radius:4px;font-size:11px;">' +
                  '<span style="color:#94a3b8;">ETA to destination:</span>' +
                  '<span style="color:#38bdf8;font-weight:700;font-family:IBM Plex Mono,monospace;">' + esc(amb.eta) + '</span>' +
                '</div>' +
              '</div>';
            }).join(''),
          '</div>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Master Render Function with Dynamic Header Updates ───────── */
  function render() {
    if (!root) return;

    var activeTab = TABS.find(function (t) { return t.id === S.tab; }) || TABS[0];

    // Update Header Content Dynamically
    var titleEl = root.querySelector('.zch-title');
    if (titleEl) titleEl.textContent = activeTab.title || activeTab.label;

    var subEl = root.querySelector('.zch-sub');
    if (subEl) subEl.textContent = activeTab.sub || '';

    var badgeEl = root.querySelector('.zch-live-badge');
    if (badgeEl) {
      badgeEl.innerHTML = '<span class="zch-pulse-dot"></span> ' + esc(activeTab.badge || 'Active');
    }

    // Contextual Action Button in Header
    var actionBtn = root.querySelector('.zch-context-action');
    if (actionBtn) {
      if (S.tab === 'doctors') {
        actionBtn.style.display = 'inline-flex';
        actionBtn.textContent = '+ Register Doctor';
        actionBtn.onclick = function() { ZenveClinicsDashboard.showAddDoctorModal(); };
      } else if (S.tab === 'all-clinics' || S.tab === 'dashboard') {
        actionBtn.style.display = 'inline-flex';
        actionBtn.textContent = '+ Add Facility';
        actionBtn.onclick = function() { ZenveClinicsDashboard.showNewClinicModal(); };
      } else if (S.tab === 'orders') {
        actionBtn.style.display = 'inline-flex';
        actionBtn.textContent = '+ Create PO';
        actionBtn.onclick = function() { ZenveClinicsDashboard.showNewOrderModal(); };
      } else {
        actionBtn.style.display = 'none';
      }
    }

    // Render Tabs Bar
    var tabsBar = root.querySelector('.zch-tabs-bar');
    if (tabsBar) {
      tabsBar.innerHTML = TABS.map(function (t) {
        var isActive = t.id === S.tab;
        return [
          '<button class="zch-tab ' + (isActive ? 'active' : '') + '" onclick="ZenveClinicsDashboard.switchTab(\'' + t.id + '\')">',
            '<span>' + t.icon + '</span>',
            '<span>' + esc(t.label) + '</span>',
            t.badge ? '<span class="zch-tab-badge ' + (t.warnBadge ? 'warn' : '') + '">' + esc(t.badge) + '</span>' : '',
          '</button>'
        ].join('');
      }).join('');
    }

    // Render Content Area
    var body = root.querySelector('.zch-body');
    if (body) {
      switch (S.tab) {
        case 'dashboard': body.innerHTML = renderDashboard(); break;
        case 'all-clinics': body.innerHTML = renderAllClinics(); break;
        case 'hospitals': body.innerHTML = renderHospitals(); break;
        case 'performance': body.innerHTML = renderPerformance(); break;
        case 'revenue': body.innerHTML = renderRevenue(); break;
        case 'orders': body.innerHTML = renderOrders(); break;
        case 'patients': body.innerHTML = renderPatients(); break;
        case 'doctors': body.innerHTML = renderDoctors(); break;
        case 'commissions': body.innerHTML = renderCommissions(); break;
        case 'network': body.innerHTML = renderNetwork(); break;
        default: body.innerHTML = renderDashboard(); break;
      }
    }
  }

  /* ── Build Shell ──────────────────────────────────────────────── */
  function build() {
    if (root) return;
    root = document.createElement('div');
    root.id = 'zch-root';
    root.innerHTML = [
      '<header class="zch-head">',
        '<div class="zch-head-left">',
          '<div class="zch-title-row">',
            '<h1 class="zch-title">Clinics Dashboard</h1>',
            '<span class="zch-live-badge"><span class="zch-pulse-dot"></span> 14 Facilities Active</span>',
          '</div>',
          '<p class="zch-sub">Veterinary Hospitals & Clinics Command Center</p>',
        '</div>',
        '<div class="zch-head-actions">',
          '<button class="zch-btn" onclick="alert(\'Refreshing live clinical census across all 14 facilities...\')">🔄 Refresh Vitals</button>',
          '<button class="zch-btn primary zch-context-action">+ Add Facility</button>',
          '<button class="zch-btn danger" onclick="ZenveClinicsDashboard.close()">✕ Exit Dashboard</button>',
        '</div>',
      '</header>',
      '<nav class="zch-tabs-bar" aria-label="Clinics & Hospitals Subdomains"></nav>',
      '<div class="zch-body"></div>'
    ].join('');
    document.body.appendChild(root);
  }

  /* ── Open / Close / Switch ────────────────────────────────────── */
  function open(tab) {
    // Close other domain overlays cleanly
    if (window.ZenveSalesDashboard && typeof window.ZenveSalesDashboard.close === 'function') {
      try { window.ZenveSalesDashboard.close(); } catch (e) {}
    }
    if (window.ZenveOperationsDashboard && typeof window.ZenveOperationsDashboard.close === 'function') {
      try { window.ZenveOperationsDashboard.close(); } catch (e) {}
    }
    if (window.ZenveProductsInventory && typeof window.ZenveProductsInventory.close === 'function') {
      try { window.ZenveProductsInventory.close(); } catch (e) {}
    }
    if (window.ZenvePharmacyDashboard && typeof window.ZenvePharmacyDashboard.close === 'function') {
      try { window.ZenvePharmacyDashboard.close(); } catch (e) {}
    }
    if (window.ZenveReportsDashboard && typeof window.ZenveReportsDashboard.close === 'function') {
      try { window.ZenveReportsDashboard.close(); } catch (e) {}
    }
    if (window.ZenveAlertsDashboard && typeof window.ZenveAlertsDashboard.close === 'function') {
      try { window.ZenveAlertsDashboard.close(); } catch (e) {}
    }
    if (window.ZenveFinanceDashboard && typeof window.ZenveFinanceDashboard.close === 'function') {
      try { window.ZenveFinanceDashboard.close(); } catch (e) {}
    }
    if (window.ZenveSettingsDashboard && typeof window.ZenveSettingsDashboard.close === 'function') {
      try { window.ZenveSettingsDashboard.close(); } catch (e) {}
    }

    document.querySelectorAll('.zpanel-root, [id$="-root"]').forEach(function (el) {
      if (el.id !== 'zch-root') el.classList.remove('zpanel-open', 'zod-open', 'zsd-open', 'zpid-open', 'zph-open', 'zrep-open', 'zalt-open', 'zset-open', 'zfa-open');
    });

    // Dismiss any Radix placeholder dialog
    try {
      document.querySelectorAll('[role="dialog"]').forEach(function (d) {
        if (d.closest('#zch-root')) return;
        var btn = d.querySelector('button[aria-label*="close" i], button:last-child');
        if (btn) btn.click();
      });
    } catch (e) {}

    if (tab && TABS.some(function (t) { return t.id === tab; })) {
      S.tab = tab;
    } else if (!S.tab) {
      S.tab = 'dashboard';
    }

    build();
    S.open = true;
    root.classList.add('zch-open');
    render();

    var targetHash = TABS.find(function (t) { return t.id === S.tab; })?.hash;
    if (targetHash && location.hash !== targetHash) {
      try { history.replaceState(null, '', targetHash); } catch (e) {}
    }
  }

  function close() {
    S.open = false;
    if (root) root.classList.remove('zch-open');
    if (TABS.some(function (t) { return t.hash === location.hash; })) {
      try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {}
    }
  }

  function switchTab(tabId) {
    if (!TABS.some(function (t) { return t.id === tabId; })) return;
    S.tab = tabId;
    render();
    var t = TABS.find(function (it) { return it.id === tabId; });
    if (t && t.hash) {
      try { history.replaceState(null, '', t.hash); } catch (e) {}
    }
  }

  function filterDoctors(search, specialty, duty) {
    if (search !== null && search !== undefined) S.docSearch = search;
    if (specialty !== null && specialty !== undefined) S.docSpecialty = specialty;
    if (duty !== null && duty !== undefined) S.docDuty = duty;
    var body = root ? root.querySelector('.zch-body') : null;
    if (body && S.tab === 'doctors') {
      body.innerHTML = renderDoctors();
    }
  }

  /* ── Interactive Modals ────────────────────────────────────────── */
  function showDoctorBioModal(docId) {
    var d = DOCTORS.find(function (it) { return it.id === docId; }) || DOCTORS[0];
    var modalHtml = [
      '<div class="zch-modal-backdrop" id="zch-doc-bio-modal">',
        '<div class="zch-modal">',
          '<div class="zch-modal-head">',
            '<div style="display:flex;align-items:center;gap:12px;">',
              '<div style="width:40px;height:40px;border-radius:50%;background:rgba(59,130,246,0.15);border:1px solid rgba(59,130,246,0.3);color:#60a5fa;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:16px;">👨‍⚕️</div>',
              '<div>',
                '<h3 class="zch-modal-title">' + esc(d.name) + '</h3>',
                '<span style="font-size:11px;color:#94a3b8;font-family:IBM Plex Mono,monospace;">' + esc(d.id) + ' • ' + esc(d.vci) + '</span>',
              '</div>',
            '</div>',
            '<button type="button" class="zch-btn" onclick="document.getElementById(\'zch-doc-bio-modal\').remove()">✕</button>',
          '</div>',
          '<div class="zch-modal-body">',
            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;background:rgba(255,255,255,0.02);padding:14px;border-radius:10px;border:1px solid rgba(255,255,255,0.06);font-size:12px;">',
              '<div><span style="color:#64748b;">Clinical Specialization:</span><div style="font-weight:600;color:#38bdf8;">' + esc(d.spec) + '</div></div>',
              '<div><span style="color:#64748b;">Primary Facility Base:</span><div style="font-weight:600;color:#fff;">' + esc(d.base) + '</div></div>',
              '<div><span style="color:#64748b;">Degrees & Credentials:</span><div style="color:#cbd5e1;">' + esc(d.qual) + '</div></div>',
              '<div><span style="color:#64748b;">Current Active Shift:</span><div style="color:#10b981;font-weight:600;">' + esc(d.shift) + '</div></div>',
              '<div><span style="color:#64748b;">Lifetime Consultations:</span><div style="font-weight:700;font-family:IBM Plex Mono,monospace;">' + esc(d.consults) + ' Patients</div></div>',
              '<div><span style="color:#64748b;">Surgical Procedures:</span><div style="font-weight:700;font-family:IBM Plex Mono,monospace;color:#10b981;">' + esc(d.surgeries) + ' OTs</div></div>',
            '</div>',
            '<div>',
              '<h4 style="margin:0 0 6px;font-size:13px;color:#f8fafc;">Clinical Bio & Expertise</h4>',
              '<p style="margin:0;font-size:12px;color:#94a3b8;line-height:1.5;">' + esc(d.bio) + '</p>',
            '</div>',
            '<div style="display:flex;justify-content:space-between;align-items:center;background:rgba(251,191,36,0.1);padding:10px 14px;border-radius:8px;border:1px solid rgba(251,191,36,0.25);">',
              '<span style="font-size:12px;color:#cbd5e1;">Verified Patient Satisfaction (CSAT):</span>',
              '<span style="font-size:14px;font-weight:700;color:#fbbf24;">' + esc(d.csat) + ' (99.4% Positive Feedback)</span>',
            '</div>',
          '</div>',
          '<div class="zch-modal-foot">',
            '<button type="button" class="zch-btn" onclick="document.getElementById(\'zch-doc-bio-modal\').remove()">Close</button>',
            '<button type="button" class="zch-btn primary" onclick="alert(\'Roster modification requested for ' + esc(d.name) + '\')">Modify Shift Assignment</button>',
          '</div>',
        '</div>',
      '</div>'
    ].join('');

    var div = document.createElement('div');
    div.innerHTML = modalHtml;
    document.body.appendChild(div.firstElementChild);
  }

  function showNewClinicModal() {
    var modalHtml = [
      '<div class="zch-modal-backdrop" id="zch-clinic-modal">',
        '<div class="zch-modal">',
          '<div class="zch-modal-head">',
            '<h3 class="zch-modal-title">Register New Facility in Zenve Network</h3>',
            '<button type="button" class="zch-btn" onclick="document.getElementById(\'zch-clinic-modal\').remove()">✕</button>',
          '</div>',
          '<form id="zch-add-clinic-form" class="zch-modal-body">',
            '<div><label style="display:block;color:#94a3b8;font-size:12px;margin-bottom:4px;">Facility Commercial Name</label><input required class="zch-input" style="width:100%;" id="clinic-name" placeholder="e.g. Zenve Care Center Whitefield" /></div>',
            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">',
              '<div><label style="display:block;color:#94a3b8;font-size:12px;margin-bottom:4px;">City Cluster</label><select class="zch-select" style="width:100%;" id="clinic-city"><option>Bengaluru</option><option>Mumbai</option><option>Delhi NCR</option><option>Hyderabad</option><option>Pune</option></select></div>',
              '<div><label style="display:block;color:#94a3b8;font-size:12px;margin-bottom:4px;">Facility Tier</label><select class="zch-select" style="width:100%;" id="clinic-tier"><option>Primary OPD & Diagnostics</option><option>Secondary Care Clinic</option><option>Tertiary 24x7 Hospital</option></select></div>',
            '</div>',
            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">',
              '<div><label style="display:block;color:#94a3b8;font-size:12px;margin-bottom:4px;">Inpatient Beds</label><input class="zch-input" style="width:100%;" id="clinic-beds" placeholder="e.g. 6 Daycare Bays" /></div>',
              '<div><label style="display:block;color:#94a3b8;font-size:12px;margin-bottom:4px;">OT Specification</label><input class="zch-input" style="width:100%;" id="clinic-ot" placeholder="e.g. Minor Surgical Suite" /></div>',
            '</div>',
            '<div><label style="display:block;color:#94a3b8;font-size:12px;margin-bottom:4px;">Lead Attending Veterinarian</label><input required class="zch-input" style="width:100%;" id="clinic-lead" placeholder="e.g. Dr. Sneha Nair, BVSc" /></div>',
            '<div class="zch-modal-foot">',
              '<button type="button" class="zch-btn" onclick="document.getElementById(\'zch-clinic-modal\').remove()">Cancel</button>',
              '<button type="submit" class="zch-btn primary">Commission Facility</button>',
            '</div>',
          '</form>',
        '</div>',
      '</div>'
    ].join('');

    var div = document.createElement('div');
    div.innerHTML = modalHtml;
    document.body.appendChild(div.firstElementChild);

    var form = document.getElementById('zch-add-clinic-form');
    if (form) {
      form.onsubmit = function (e) {
        e.preventDefault();
        var name = document.getElementById('clinic-name').value;
        var city = document.getElementById('clinic-city').value;
        var tier = document.getElementById('clinic-tier').value;
        var beds = document.getElementById('clinic-beds').value || '4 Pods';
        var ot = document.getElementById('clinic-ot').value || 'Minor OT';
        var lead = document.getElementById('clinic-lead').value;

        FACILITIES.push({
          id: 'FAC-0' + (FACILITIES.length + 1),
          name: name,
          type: tier,
          city: city,
          beds: beds,
          ot: ot,
          rev: '₹1.50 L',
          status: 'Operational',
          lead: lead
        });

        document.getElementById('zch-clinic-modal').remove();
        render();
        alert('Facility ' + name + ' registered successfully in ' + city + '!');
      };
    }
  }

  function showNewOrderModal() {
    var modalHtml = [
      '<div class="zch-modal-backdrop" id="zch-order-modal">',
        '<div class="zch-modal">',
          '<div class="zch-modal-head">',
            '<h3 class="zch-modal-title">Create Clinical Supply Requisition</h3>',
            '<button type="button" class="zch-btn" onclick="document.getElementById(\'zch-order-modal\').remove()">✕</button>',
          '</div>',
          '<form id="zch-add-order-form" class="zch-modal-body">',
            '<div><label style="display:block;color:#94a3b8;font-size:12px;margin-bottom:4px;">Target Healthcare Facility</label><select class="zch-select" style="width:100%;" id="order-fac">' +
              FACILITIES.map(function(f){ return '<option>' + esc(f.name) + '</option>'; }).join('') +
            '</select></div>',
            '<div><label style="display:block;color:#94a3b8;font-size:12px;margin-bottom:4px;">Item Description (Implants, Gases, Consumables)</label><input required class="zch-input" style="width:100%;" id="order-item" placeholder="e.g. Titanium Locking Screws 3.5mm" /></div>',
            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">',
              '<div><label style="display:block;color:#94a3b8;font-size:12px;margin-bottom:4px;">Vendor</label><input required class="zch-input" style="width:100%;" id="order-vendor" placeholder="e.g. Synthes Vet India" /></div>',
              '<div><label style="display:block;color:#94a3b8;font-size:12px;margin-bottom:4px;">Quantity</label><input required class="zch-input" style="width:100%;" id="order-qty" placeholder="e.g. 10 Kits" /></div>',
            '</div>',
            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">',
              '<div><label style="display:block;color:#94a3b8;font-size:12px;margin-bottom:4px;">Estimated Value (₹)</label><input type="number" required class="zch-input" style="width:100%;" id="order-val" placeholder="45000" /></div>',
              '<div><label style="display:block;color:#94a3b8;font-size:12px;margin-bottom:4px;">Priority</label><select class="zch-select" style="width:100%;" id="order-priority"><option>High</option><option>Critical</option><option>Routine</option></select></div>',
            '</div>',
            '<div class="zch-modal-foot">',
              '<button type="button" class="zch-btn" onclick="document.getElementById(\'zch-order-modal\').remove()">Cancel</button>',
              '<button type="submit" class="zch-btn primary">Issue Requisition PO</button>',
            '</div>',
          '</form>',
        '</div>',
      '</div>'
    ].join('');

    var div = document.createElement('div');
    div.innerHTML = modalHtml;
    document.body.appendChild(div.firstElementChild);

    var form = document.getElementById('zch-add-order-form');
    if (form) {
      form.onsubmit = function (e) {
        e.preventDefault();
        var fac = document.getElementById('order-fac').value;
        var item = document.getElementById('order-item').value;
        var vendor = document.getElementById('order-vendor').value;
        var qty = document.getElementById('order-qty').value;
        var val = Number(document.getElementById('order-val').value) || 25000;
        var prio = document.getElementById('order-priority').value;

        CLINIC_ORDERS.unshift({
          po: 'PO-CLIN-40' + (CLINIC_ORDERS.length + 80),
          facility: fac,
          item: item,
          vendor: vendor,
          qty: qty,
          cost: '₹' + val.toLocaleString('en-IN'),
          status: 'Pending Approval',
          priority: prio
        });

        document.getElementById('zch-order-modal').remove();
        render();
        alert('Requisition issued for ' + item + ' (' + fac + ')');
      };
    }
  }

  function showAddDoctorModal() {
    var modalHtml = [
      '<div class="zch-modal-backdrop" id="zch-doc-modal">',
        '<div class="zch-modal">',
          '<div class="zch-modal-head">',
            '<h3 class="zch-modal-title">Register Veterinary Clinician / Surgeon</h3>',
            '<button type="button" class="zch-btn" onclick="document.getElementById(\'zch-doc-modal\').remove()">✕</button>',
          '</div>',
          '<form id="zch-add-doc-form" class="zch-modal-body">',
            '<div><label style="display:block;color:#94a3b8;font-size:12px;margin-bottom:4px;">Doctor Full Name</label><input required class="zch-input" style="width:100%;" id="doc-name" placeholder="e.g. Dr. Siddharth Roy" /></div>',
            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">',
              '<div><label style="display:block;color:#94a3b8;font-size:12px;margin-bottom:4px;">Degrees & Qualifications</label><input required class="zch-input" style="width:100%;" id="doc-qual" placeholder="e.g. B.V.Sc & A.H, M.V.Sc (Vet Surgery)" /></div>',
              '<div><label style="display:block;color:#94a3b8;font-size:12px;margin-bottom:4px;">VCI License No.</label><input required class="zch-input" style="width:100%;" id="doc-vci" placeholder="e.g. VCI-KAR-2021-512" /></div>',
            '</div>',
            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">',
              '<div><label style="display:block;color:#94a3b8;font-size:12px;margin-bottom:4px;">Clinical Specialty</label><input required class="zch-input" style="width:100%;" id="doc-spec" placeholder="e.g. Orthopedic Surgery & TPLO" /></div>',
              '<div><label style="display:block;color:#94a3b8;font-size:12px;margin-bottom:4px;">Hospital Base</label><select class="zch-select" style="width:100%;" id="doc-base">' +
                FACILITIES.map(function(f){ return '<option>' + esc(f.name) + '</option>'; }).join('') +
              '</select></div>',
            '</div>',
            '<div><label style="display:block;color:#94a3b8;font-size:12px;margin-bottom:4px;">Clinical Biography / Special Achievements</label><textarea class="zch-input" style="width:100%;height:60px;" id="doc-bio" placeholder="e.g. Gold medalist surgeon with extensive experience in small animal soft-tissue surgery..."></textarea></div>',
            '<div class="zch-modal-foot">',
              '<button type="button" class="zch-btn" onclick="document.getElementById(\'zch-doc-modal\').remove()">Cancel</button>',
              '<button type="submit" class="zch-btn primary">Add to Clinical Roster</button>',
            '</div>',
          '</form>',
        '</div>',
      '</div>'
    ].join('');

    var div = document.createElement('div');
    div.innerHTML = modalHtml;
    document.body.appendChild(div.firstElementChild);

    var form = document.getElementById('zch-add-doc-form');
    if (form) {
      form.onsubmit = function (e) {
        e.preventDefault();
        var name = document.getElementById('doc-name').value;
        var qual = document.getElementById('doc-qual').value;
        var vci = document.getElementById('doc-vci').value;
        var spec = document.getElementById('doc-spec').value;
        var base = document.getElementById('doc-base').value;
        var bio = document.getElementById('doc-bio').value || 'Registered veterinarian practicing small animal medicine.';

        DOCTORS.unshift({
          id: 'DOC-0' + (DOCTORS.length + 1),
          name: name,
          qual: qual,
          vci: vci,
          spec: spec,
          base: base,
          shift: 'Morning (08:00 – 16:00)',
          csat: '5.00 ★',
          consults: 0,
          surgeries: 0,
          status: 'On Duty',
          bio: bio
        });

        document.getElementById('zch-doc-modal').remove();
        render();
        alert('Clinician ' + name + ' registered in roster!');
      };
    }
  }

  /* ── Hash-change listener ─────────────────────────────────────── */
  window.addEventListener('hashchange', function () {
    var tab = tabFromHash(location.hash);
    if (tab) {
      if (!S.open) open(tab);
      else switchTab(tab);
    } else if (S.open) {
      close();
    }
  });

  /* ── Check initial hash on load ───────────────────────────────── */
  var initialTab = tabFromHash(location.hash);
  if (initialTab) {
    var go = function () { setTimeout(function () { open(initialTab); }, 400); };
    if (document.readyState === 'complete') go();
    else window.addEventListener('load', go);
  }

  /* ── Global Click Interception & Wire Sidebar ─────────────────── */
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;

    // Never intercept accordion group toggles or search bar
    if (t.closest('[aria-expanded]') || t.closest('button[aria-expanded]') || t.closest('[aria-label="Search menu"]')) return;

    var item = t.closest('button, [data-go], a, [role="button"], li');
    if (item && item.textContent) {
      var tab = tabFromText(item.textContent.trim());
      if (tab) {
        if (!t.closest('#zch-root')) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          open(tab);
          return;
        }
      }
    }

    if (S.open) {
      if (t.closest('#zch-root')) return;
      var b = t.closest('.sidebar-scope button, .sidebar-scope a, nav button, nav a, aside button, aside a');
      if (!b) return;
      if (b.getAttribute('aria-label') === 'Search menu') return;
      if (b.getAttribute('aria-expanded') !== null) return;
      if (b.textContent && tabFromText(b.textContent.trim())) return;

      close();
    }
  }, true);

  document.addEventListener('pointerdown', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;

    if (t.closest('[aria-expanded]') || t.closest('button[aria-expanded]') || t.closest('[aria-label="Search menu"]')) return;

    var item = t.closest('.sidebar-scope li button, .sidebar-scope li a, nav li button, nav li a');
    if (item && item.textContent) {
      var tab = tabFromText(item.textContent.trim());
      if (tab) {
        e.stopPropagation();
      }
    }
  }, true);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && S.open) {
      close();
    }
  });

  /* ── Hashchange Listener ───────────────────────────────────────── */
  window.addEventListener('hashchange', function () {
    var tab = tabFromHash(location.hash);
    if (tab) {
      open(tab);
    } else if (S.open && location.hash && !location.hash.startsWith('#clinic') && !location.hash.startsWith('#all-clinic') && !location.hash.startsWith('#hospital')) {
      close();
    }
  });

  function wireSidebar() {
    document.querySelectorAll(
      '.sidebar-scope li button, .sidebar-scope li a, ' +
      '[data-sidebar] li button, [data-sidebar] li a, nav li button, nav li a'
    ).forEach(function (btn) {
      if (btn.getAttribute('aria-expanded') !== null || btn.closest('[aria-expanded]') || btn.closest('button[aria-expanded]')) return;
      if (btn._zchWired) return;
      btn._zchWired = true;
      btn.addEventListener('click', function (e) {
        if (btn.getAttribute('aria-expanded') !== null || btn.closest('[aria-expanded]') || btn.closest('button[aria-expanded]')) return;
        var tab = tabFromText(btn.textContent ? btn.textContent.trim() : '');
        if (tab) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          open(tab);
        }
      }, true);
    });
    setTimeout(wireSidebar, 1500);
  }

  /* ── Public API ───────────────────────────────────────────────── */
  window.ZenveClinicsDashboard = {
    open: open,
    close: close,
    switchTab: switchTab,
    filterDoctors: filterDoctors,
    showNewClinicModal: showNewClinicModal,
    showNewOrderModal: showNewOrderModal,
    showAddDoctorModal: showAddDoctorModal,
    showDoctorBioModal: showDoctorBioModal
  };

  /* ── Boot ─────────────────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { build(); wireSidebar(); });
  } else {
    build();
    wireSidebar();
  }

})();
