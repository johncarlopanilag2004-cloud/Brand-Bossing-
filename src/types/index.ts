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
