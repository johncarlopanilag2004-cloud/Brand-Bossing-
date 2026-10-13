import {
  LeadRecord,
  AuditSubmission,
  AnalyticsEvent,
  LeadStatus,
  TransactionRecord,
  DailyTraffic,
  TrafficSource,
  TrafficLocation,
} from '../types';

const LEADS_STORAGE_KEY = 'brandbossing_leads_v1';
const AUDITS_STORAGE_KEY = 'brandbossing_audits_v1';
const EVENTS_STORAGE_KEY = 'brandbossing_events_v1';
const TRANSACTIONS_STORAGE_KEY = 'brandbossing_tx_v1';
const SESSION_AUTH_KEY = 'brandbossing_exec_auth';

export const ADMIN_PASSWORD = '4bossing';

const SEED_LEADS: LeadRecord[] = [
  {
    id: 'lead-ormoc-101',
    source: 'booking_modal',
    createdAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(), // 35 mins ago
    businessName: 'The Backyard Grind Cafe',
    ownerName: 'Kristine Mae Alcantara',
    phone: '0917 842 1993',
    email: 'kristine@thebackyardgrind.ph',
    barangay: 'Cogon',
    businessType: 'Food & Beverage / Cafe / Resto',
    meetingPreference: 'in-person',
    date: '2026-10-14',
    timeSlot: '02:00 PM – 02:45 PM',
    notes: 'Interested in the ₱2,500 MSME Growth Plan. Want to boost weekend brunch foot traffic from tourists coming via FastCat.',
    packageInterested: 'Ormoc MSME Growth Plan (₱2,500/mo)',
    status: 'closed_client',
    adminNotes: 'Converted! Subscribed to monthly ₱2,500 retainer via GCash.',
    estimatedValue: 2500,
  },
  {
    id: 'lead-ormoc-102',
    source: 'package_cta',
    createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(), // 3 hrs ago
    businessName: 'Valencia Queen Pineapple Delicacies',
    ownerName: 'Eduardo Gomez',
    phone: '0928 554 9012',
    email: 'valenciapineapple.ormoc@gmail.com',
    barangay: 'Valencia',
    businessType: 'Pasalubong / Delicacies & Souvenirs',
    meetingPreference: 'virtual',
    date: '2026-10-15',
    timeSlot: '10:00 AM – 10:45 AM',
    notes: 'We want our dried pineapple and tarts ranked higher when travelers search pasalubong near Ormoc Port.',
    packageInterested: 'Ormoc MSME Growth Plan (₱2,500/mo)',
    status: 'closed_client',
    adminNotes: 'Paid first month ₱2,500. Meta ads launching Friday.',
    estimatedValue: 2500,
  },
  {
    id: 'lead-ormoc-103',
    source: 'audit_tool',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(), // 18 hrs ago
    businessName: 'Ormoc Precision Dental Clinic',
    ownerName: 'Dr. Raymond Chu, DMD',
    phone: '0919 778 3211',
    email: 'ormocsmiledental@yahoo.com',
    barangay: 'Ormoc Centro / Poblacion',
    businessType: 'Health Clinic / Dental / Wellness',
    meetingPreference: 'in-person',
    date: '2026-10-16',
    timeSlot: '04:00 PM – 04:45 PM',
    notes: 'Audit score was 42/100. Need Google Maps 3-Pack placement and automated Messenger replies for evening bookings.',
    packageInterested: 'Ormoc MSME Growth Plan (₱2,500/mo)',
    status: 'call_scheduled',
    adminNotes: 'Dr. Chu prefers in-person coffee chat at Ormoc Centro.',
    estimatedValue: 2500,
  },
  {
    id: 'lead-ormoc-104',
    source: 'contact_form',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 42).toISOString(), // 2 days ago
    businessName: 'Linao Moto Parts & Supply',
    ownerName: 'Carlos Tan',
    phone: '0995 120 4455',
    email: 'carlostan.moto@gmail.com',
    barangay: 'Linao',
    businessType: 'Auto Care / Motorcycle Parts',
    meetingPreference: 'virtual',
    date: '2026-10-13',
    timeSlot: '03:00 PM – 03:45 PM',
    notes: 'Competitor in Tambulilid is running Facebook ads. We need Meta ads targeting riders in Ormoc & Albuera.',
    packageInterested: 'Ormoc MSME Growth Plan (₱2,500/mo)',
    status: 'closed_client',
    adminNotes: 'Closed! Paid ₱2,500 via Maya. Onboarding completed.',
    estimatedValue: 2500,
  },
  {
    id: 'lead-ormoc-105',
    source: 'booking_modal',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 70).toISOString(), // 3 days ago
    businessName: 'Camp Downes Marine & Fishing Gear',
    ownerName: 'Felipe "Tata" Alcantara',
    phone: '0917 334 1188',
    email: 'campdownes.marine@gmail.com',
    barangay: 'Camp Downes',
    businessType: 'Retail Store / Fashion Boutique',
    meetingPreference: 'in-person',
    date: '2026-10-11',
    timeSlot: '11:00 AM – 11:45 AM',
    notes: 'Supplying fisherfolk and boat owners across Ormoc and Merida. Want to be listed on Google Maps.',
    packageInterested: 'Ormoc MSME Growth Plan (₱2,500/mo)',
    status: 'closed_client',
    adminNotes: 'Retainer active. GCash payment received.',
    estimatedValue: 2500,
  },
];

const SEED_AUDITS: AuditSubmission[] = [
  {
    id: 'audit-1',
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    score: 42,
    maxScore: 100,
    level: 'Critical Growth Opportunity',
    priorityAction: 'Claim and optimize your Google Maps profile + launch an automated Facebook Messenger responder.',
    answersSummary: 'Invisible on Maps, replies in few hours, no paid ads, casual phone photos.',
  },
  {
    id: 'audit-2',
    createdAt: new Date(Date.now() - 1000 * 60 * 220).toISOString(),
    score: 65,
    maxScore: 100,
    level: 'Emerging Local Contender',
    priorityAction: 'Upgrade to high-energy on-site vertical reels (TikTok/Reels) and switch from random Boost Posts to targeted Meta Ads.',
    answersSummary: 'Claimed Maps profile, responds in 15 mins, random ₱200 boost posts.',
  },
  {
    id: 'audit-3',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    score: 35,
    maxScore: 100,
    level: 'Critical Growth Opportunity',
    priorityAction: 'Set up instant automated greeting and claim Google Maps 3-pack position.',
    answersSummary: 'Not on Maps, checks messages every few days, no paid ads.',
  },
];

// Realistic Verified MSME Client Purchases (Subscriptions to ₱2,500/mo plan)
const SEED_TRANSACTIONS: TransactionRecord[] = [
  {
    id: 'tx-2026-009',
    date: '2026-10-12',
    clientBusiness: 'The Backyard Grind Cafe',
    clientOwner: 'Kristine Mae Alcantara',
    barangay: 'Cogon',
    planName: 'Ormoc MSME Growth Plan',
    amount: 2500,
    paymentMethod: 'GCash',
    referenceNo: 'GCASH-90214821',
    orNumber: 'OR-BB-2026-089',
    status: 'Paid & Active',
    nextRenewalDate: '2026-11-12',
  },
  {
    id: 'tx-2026-008',
    date: '2026-10-10',
    clientBusiness: 'Linao Moto Parts & Supply',
    clientOwner: 'Carlos Tan',
    barangay: 'Linao',
    planName: 'Ormoc MSME Growth Plan',
    amount: 2500,
    paymentMethod: 'Maya',
    referenceNo: 'MAYA-77182914',
    orNumber: 'OR-BB-2026-088',
    status: 'Paid & Active',
    nextRenewalDate: '2026-11-10',
  },
  {
    id: 'tx-2026-007',
    date: '2026-10-09',
    clientBusiness: 'Valencia Queen Pineapple Delicacies',
    clientOwner: 'Eduardo Gomez',
    barangay: 'Valencia',
    planName: 'Ormoc MSME Growth Plan',
    amount: 2500,
    paymentMethod: 'BDO Online',
    referenceNo: 'BDO-REF-449102',
    orNumber: 'OR-BB-2026-087',
    status: 'Paid & Active',
    nextRenewalDate: '2026-11-09',
  },
  {
    id: 'tx-2026-006',
    date: '2026-10-07',
    clientBusiness: 'Ormoc Smile Dental Studio',
    clientOwner: 'Dr. Raymond Chu, DMD',
    barangay: 'Ormoc Centro / Poblacion',
    planName: 'Ormoc MSME Growth Plan',
    amount: 2500,
    paymentMethod: 'BPI Online',
    referenceNo: 'BPI-TX-3381920',
    orNumber: 'OR-BB-2026-086',
    status: 'Paid & Active',
    nextRenewalDate: '2026-11-07',
  },
  {
    id: 'tx-2026-005',
    date: '2026-10-05',
    clientBusiness: 'Camp Downes Marine & Fishing Gear',
    clientOwner: 'Felipe Alcantara',
    barangay: 'Camp Downes',
    planName: 'Ormoc MSME Growth Plan',
    amount: 2500,
    paymentMethod: 'GCash',
    referenceNo: 'GCASH-11928374',
    orNumber: 'OR-BB-2026-085',
    status: 'Paid & Active',
    nextRenewalDate: '2026-11-05',
  },
  {
    id: 'tx-2026-004',
    date: '2026-10-03',
    clientBusiness: 'Lake Danao Haven Retreat',
    clientOwner: 'Maricar Larrazabal-Tan',
    barangay: 'Lake Danao Area',
    planName: 'Ormoc MSME Growth Plan',
    amount: 2500,
    paymentMethod: 'GCash',
    referenceNo: 'GCASH-44829103',
    orNumber: 'OR-BB-2026-084',
    status: 'Paid & Active',
    nextRenewalDate: '2026-11-03',
  },
  {
    id: 'tx-2026-003',
    date: '2026-10-01',
    clientBusiness: 'Can-adieng Modern Laundry Hub',
    clientOwner: 'Bea Villanueva',
    barangay: 'Can-adieng',
    planName: 'Ormoc MSME Growth Plan',
    amount: 2500,
    paymentMethod: 'GCash',
    referenceNo: 'GCASH-66381920',
    orNumber: 'OR-BB-2026-083',
    status: 'Paid & Active',
    nextRenewalDate: '2026-11-01',
  },
  {
    id: 'tx-2026-002',
    date: '2026-09-28',
    clientBusiness: 'Tambulilid Fresh Meat Hub',
    clientOwner: 'Jovencio "Boy" Tan',
    barangay: 'Tambulilid',
    planName: 'Ormoc MSME Growth Plan',
    amount: 2500,
    paymentMethod: 'Cash (Office)',
    referenceNo: 'CASH-REC-0082',
    orNumber: 'OR-BB-2026-082',
    status: 'Paid & Active',
    nextRenewalDate: '2026-10-28',
  },
  {
    id: 'tx-2026-001',
    date: '2026-09-25',
    clientBusiness: 'Alegria Pure Water Refilling',
    clientOwner: 'Renato Dela Cruz',
    barangay: 'Alegria',
    planName: 'Ormoc MSME Growth Plan',
    amount: 2500,
    paymentMethod: 'GCash',
    referenceNo: 'GCASH-88392019',
    orNumber: 'OR-BB-2026-081',
    status: 'Paid & Active',
    nextRenewalDate: '2026-10-25',
  },
];

// Realistic 7-Day Traffic Breakdown for Brand|Bossing (Ormoc City & Leyte Region)
export const REALISTIC_DAILY_TRAFFIC: DailyTraffic[] = [
  { day: 'Mon, Oct 6', pageViews: 142, uniqueVisitors: 89, inquiries: 3 },
  { day: 'Tue, Oct 7', pageViews: 168, uniqueVisitors: 98, inquiries: 4 },
  { day: 'Wed, Oct 8', pageViews: 184, uniqueVisitors: 112, inquiries: 5 },
  { day: 'Thu, Oct 9', pageViews: 155, uniqueVisitors: 91, inquiries: 2 },
  { day: 'Fri, Oct 10', pageViews: 195, uniqueVisitors: 120, inquiries: 6 },
  { day: 'Sat, Oct 11', pageViews: 139, uniqueVisitors: 84, inquiries: 3 },
  { day: 'Sun, Oct 12', pageViews: 121, uniqueVisitors: 76, inquiries: 2 },
];

export const REALISTIC_TRAFFIC_SOURCES: TrafficSource[] = [
  { source: 'Meta Ads (Facebook & Instagram)', percentage: 54, visitors: 1140 },
  { source: 'Google Search & Maps ("agency ormoc")', percentage: 27, visitors: 570 },
  { source: 'Direct / Word-of-Mouth / Viber Shares', percentage: 14, visitors: 295 },
  { source: 'FastCat / SuperCat Port Visitors', percentage: 5, visitors: 105 },
];

export const REALISTIC_LOCATIONS: TrafficLocation[] = [
  { location: 'Ormoc City (Centro, Cogon, Valencia, Linao)', percentage: 67, visitors: 1414 },
  { location: 'Greater Leyte (Albuera, Kananga, Merida)', percentage: 16, visitors: 338 },
  { location: 'Eastern Visayas (Tacloban, Baybay, Biliran)', percentage: 11, visitors: 232 },
  { location: 'Cebu Travelers (Fast Ferry Port Arrival)', percentage: 6, visitors: 126 },
];

// Helper to safely get from localStorage
function getStored<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setStored<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event('brandbossing_storage_update'));
  } catch (e) {
    console.error('Storage error', e);
  }
}

// Leads API
export function getLeads(): LeadRecord[] {
  return getStored<LeadRecord[]>(LEADS_STORAGE_KEY, SEED_LEADS);
}

export function saveLead(leadData: Omit<LeadRecord, 'id' | 'createdAt' | 'status'>): LeadRecord {
  const currentLeads = getLeads();
  const newLead: LeadRecord = {
    ...leadData,
    id: `lead-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    createdAt: new Date().toISOString(),
    status: 'new',
    estimatedValue: leadData.estimatedValue || 2500,
  };
  const updated = [newLead, ...currentLeads];
  setStored(LEADS_STORAGE_KEY, updated);
  recordEvent('lead_submitted', `${newLead.businessName} (${newLead.barangay})`);
  return newLead;
}

export function updateLeadStatus(id: string, status: LeadStatus, adminNotes?: string): void {
  const currentLeads = getLeads();
  const updated = currentLeads.map((lead) => {
    if (lead.id === id) {
      return {
        ...lead,
        status,
        adminNotes: adminNotes !== undefined ? adminNotes : lead.adminNotes,
      };
    }
    return lead;
  });
  setStored(LEADS_STORAGE_KEY, updated);
}

export function deleteLead(id: string): void {
  const currentLeads = getLeads();
  const updated = currentLeads.filter((l) => l.id !== id);
  setStored(LEADS_STORAGE_KEY, updated);
}

// Transactions & Purchases API
export function getTransactions(): TransactionRecord[] {
  return getStored<TransactionRecord[]>(TRANSACTIONS_STORAGE_KEY, SEED_TRANSACTIONS);
}

export function recordTransaction(data: Omit<TransactionRecord, 'id'>): TransactionRecord {
  const currentTx = getTransactions();
  const newTx: TransactionRecord = {
    ...data,
    id: `tx-${Date.now().toString().slice(-6)}`,
  };
  const updated = [newTx, ...currentTx];
  setStored(TRANSACTIONS_STORAGE_KEY, updated);
  recordEvent('package_click', `Client payment recorded: ${newTx.clientBusiness} (₱${newTx.amount})`);
  return newTx;
}

// Audits API
export function getAudits(): AuditSubmission[] {
  return getStored<AuditSubmission[]>(AUDITS_STORAGE_KEY, SEED_AUDITS);
}

export function saveAudit(score: number, maxScore: number, level: string, priorityAction: string, answersSummary?: string): AuditSubmission {
  const currentAudits = getAudits();
  const newAudit: AuditSubmission = {
    id: `audit-${Date.now()}`,
    createdAt: new Date().toISOString(),
    score,
    maxScore,
    level,
    priorityAction,
    answersSummary,
  };
  setStored(AUDITS_STORAGE_KEY, [newAudit, ...currentAudits]);
  recordEvent('audit_completed', `Score: ${score}/${maxScore} (${level})`);
  return newAudit;
}

// Telemetry & Events API
export function getEvents(): AnalyticsEvent[] {
  return getStored<AnalyticsEvent[]>(EVENTS_STORAGE_KEY, []);
}

export function recordEvent(type: AnalyticsEvent['type'], label?: string): void {
  const currentEvents = getEvents();
  const newEvent: AnalyticsEvent = {
    id: `ev-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
    timestamp: new Date().toISOString(),
    type,
    label,
  };
  const trimmed = [newEvent, ...currentEvents].slice(0, 150);
  setStored(EVENTS_STORAGE_KEY, trimmed);
}

// Authentication API
export function checkAdminPassword(input: string): boolean {
  return input.trim() === ADMIN_PASSWORD;
}

export function isExecutiveAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return sessionStorage.getItem(SESSION_AUTH_KEY) === 'true';
  } catch {
    return false;
  }
}

export function loginExecutive(password: string): boolean {
  if (checkAdminPassword(password)) {
    try {
      sessionStorage.setItem(SESSION_AUTH_KEY, 'true');
    } catch {}
    return true;
  }
  return false;
}

export function logoutExecutive(): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.removeItem(SESSION_AUTH_KEY);
  } catch {}
}

// Export Leads to CSV format
export function exportLeadsToCSV(leads: LeadRecord[]): string {
  const headers = ['Created At', 'Business Name', 'Owner Name', 'Phone', 'Email', 'Barangay', 'Business Type', 'Status', 'Date', 'Time Slot', 'Package', 'Notes', 'Admin Notes'];
  const rows = leads.map((l) => [
    new Date(l.createdAt).toLocaleDateString(),
    `"${l.businessName.replace(/"/g, '""')}"`,
    `"${l.ownerName.replace(/"/g, '""')}"`,
    `"${l.phone}"`,
    `"${l.email || ''}"`,
    `"${l.barangay}"`,
    `"${l.businessType}"`,
    l.status,
    l.date || '',
    l.timeSlot || '',
    `"${l.packageInterested || '₱2,500 MSME Plan'}"`,
    `"${(l.notes || '').replace(/"/g, '""')}"`,
    `"${(l.adminNotes || '').replace(/"/g, '""')}"`,
  ]);

  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
}

// Export Transactions to CSV format
export function exportTransactionsToCSV(txs: TransactionRecord[]): string {
  const headers = ['Date', 'Client Business', 'Owner Name', 'Barangay', 'Plan Name', 'Amount (PHP)', 'Payment Method', 'Reference No', 'OR Number', 'Status', 'Next Renewal'];
  const rows = txs.map((t) => [
    t.date,
    `"${t.clientBusiness.replace(/"/g, '""')}"`,
    `"${t.clientOwner.replace(/"/g, '""')}"`,
    `"${t.barangay}"`,
    `"${t.planName}"`,
    t.amount,
    t.paymentMethod,
    `"${t.referenceNo}"`,
    `"${t.orNumber}"`,
    t.status,
    t.nextRenewalDate,
  ]);

  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
}
