export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  outcomes: string[];
  deliverables: string[];
  idealFor: string;
}

export interface CaseStudyItem {
  id: string;
  title: string;
  businessName: string;
  location: string;
  industry: string;
  image: string;
  challenge: string;
  solution: string;
  metrics: {
    label: string;
    value: string;
  }[];
  quote: {
    text: string;
    author: string;
    role: string;
  };
}

export interface AuditQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    score: number;
    tip: string;
  }[];
}

export interface ConsultationBooking {
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  barangay: string;
  businessType: string;
  selectedServices: string[];
  monthlyBudget: string;
  meetingPreference: 'in-person' | 'virtual';
  notes?: string;
  date: string;
  timeSlot: string;
}

export interface AgencyLeader {
  rank: number;
  name: string;
  role: string;
  rankTitle: string;
  initials: string;
  focus: string;
  bio: string;
  quote: string;
  image?: string;
}

export type LeadStatus = 'new' | 'contacted' | 'call_scheduled' | 'proposal_sent' | 'closed_client' | 'archived';

export interface LeadRecord {
  id: string;
  source: 'booking_modal' | 'contact_form' | 'package_cta' | 'audit_tool';
  createdAt: string;
  businessName: string;
  ownerName: string;
  phone: string;
  email?: string;
  barangay: string;
  businessType: string;
  meetingPreference?: 'in-person' | 'virtual';
  date?: string;
  timeSlot?: string;
  notes?: string;
  packageInterested?: string;
  status: LeadStatus;
  adminNotes?: string;
  estimatedValue?: number;
}

export interface AuditSubmission {
  id: string;
  createdAt: string;
  score: number;
  maxScore: number;
  level: string;
  priorityAction: string;
  answersSummary?: string;
}

export interface AnalyticsEvent {
  id: string;
  timestamp: string;
  type: 'page_view' | 'viber_click' | 'booking_open' | 'package_click' | 'audit_completed' | 'lead_submitted';
  label?: string;
}

export type PaymentMethod = 'GCash' | 'Maya' | 'BDO Online' | 'BPI Online' | 'Cash (Office)';
export type PaymentStatus = 'Paid & Active' | 'Renewing' | 'Past Due';

export interface TransactionRecord {
  id: string;
  date: string;
  clientBusiness: string;
  clientOwner: string;
  barangay: string;
  planName: string;
  amount: number;
  paymentMethod: PaymentMethod;
  referenceNo: string;
  orNumber: string;
  status: PaymentStatus;
  nextRenewalDate: string;
}

export interface DailyTraffic {
  day: string;
  pageViews: number;
  uniqueVisitors: number;
  inquiries: number;
}

export interface TrafficSource {
  source: string;
  percentage: number;
  visitors: number;
}

export interface TrafficLocation {
  location: string;
  percentage: number;
  visitors: number;
}

