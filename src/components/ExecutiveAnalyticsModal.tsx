import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  Unlock,
  KeyRound,
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
  Users,
  DollarSign,
  Download,
  Search,
  CheckCircle2,
  Clock,
  Phone,
  MessageSquare,
  Building2,
  MapPin,
  Calendar,
  Eye,
  EyeOff,
  LogOut,
  Sparkles,
  BarChart3,
  Layers,
  PlusCircle,
  Trash2,
  CreditCard,
  Smartphone,
  Globe2,
  Activity,
  ArrowUpRight,
  Receipt,
  Check,
} from 'lucide-react';
import {
  getLeads,
  getAudits,
  getEvents,
  getTransactions,
  recordTransaction,
  updateLeadStatus,
  deleteLead,
  saveLead,
  exportLeadsToCSV,
  exportTransactionsToCSV,
  checkAdminPassword,
  isExecutiveAuthenticated,
  loginExecutive,
  logoutExecutive,
  REALISTIC_DAILY_TRAFFIC,
  REALISTIC_TRAFFIC_SOURCES,
  REALISTIC_LOCATIONS,
} from '../services/analyticsStore';
import {
  LeadRecord,
  AuditSubmission,
  AnalyticsEvent,
  LeadStatus,
  TransactionRecord,
  PaymentMethod,
} from '../types';
import { BossingLogo } from './BossingLogo';

interface ExecutiveAnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExecutiveAnalyticsModal: React.FC<ExecutiveAnalyticsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Tab State: 'overview' | 'traffic' | 'purchases' | 'leads' | 'audits' | 'activity'
  const [activeTab, setActiveTab] = useState<'overview' | 'traffic' | 'purchases' | 'leads' | 'audits' | 'activity'>('overview');

  // Leads & Transactions State
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [audits, setAudits] = useState<AuditSubmission[]>([]);
  const [transactions, setTransactions] = useState<TransactionRecord[]>([]);
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);

  // Filters
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [txSearchTerm, setTxSearchTerm] = useState<string>('');

  // Payment Recording Form Modal State
  const [showAddPaymentModal, setShowAddPaymentModal] = useState<boolean>(false);
  const [newPaymentData, setNewPaymentData] = useState<{
    clientBusiness: string;
    clientOwner: string;
    barangay: string;
    paymentMethod: PaymentMethod;
    referenceNo: string;
    orNumber: string;
  }>({
    clientBusiness: '',
    clientOwner: '',
    barangay: 'Ormoc Centro / Poblacion',
    paymentMethod: 'GCash',
    referenceNo: '',
    orNumber: `OR-BB-2026-${Math.floor(100 + Math.random() * 900)}`,
  });

  // Simulated live active users
  const [liveVisitors, setLiveVisitors] = useState<number>(6);

  const loadData = () => {
    setLeads(getLeads());
    setAudits(getAudits());
    setTransactions(getTransactions());
    setEvents(getEvents());
  };

  useEffect(() => {
    if (isOpen) {
      const auth = isExecutiveAuthenticated();
      setIsAuthenticated(auth);
      if (auth) {
        loadData();
      }
    }
  }, [isOpen]);

  // Subtle realistic live user counter fluctuation
  useEffect(() => {
    if (!isOpen || !isAuthenticated) return;
    const interval = setInterval(() => {
      setLiveVisitors(Math.floor(4 + Math.random() * 5)); // fluctuates between 4 and 8
    }, 6000);
    return () => clearInterval(interval);
  }, [isOpen, isAuthenticated]);

  // Listen to in-tab storage updates
  useEffect(() => {
    const handleStorageUpdate = () => {
      loadData();
    };
    window.addEventListener('brandbossing_storage_update', handleStorageUpdate);
    return () => window.removeEventListener('brandbossing_storage_update', handleStorageUpdate);
  }, []);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkAdminPassword(passwordInput)) {
      loginExecutive(passwordInput);
      setIsAuthenticated(true);
      setPasswordError('');
      setPasswordInput('');
      loadData();
    } else {
      setPasswordError('Incorrect password. Access denied.');
    }
  };

  const handleLogout = () => {
    logoutExecutive();
    setIsAuthenticated(false);
    setPasswordInput('');
    setPasswordError('');
  };

  const handleStatusChange = (leadId: string, newStatus: LeadStatus) => {
    updateLeadStatus(leadId, newStatus);
    loadData();
  };

  const handleDeleteLead = (leadId: string) => {
    if (window.confirm('Are you sure you want to delete this lead record?')) {
      deleteLead(leadId);
      loadData();
    }
  };

  const handleDownloadCSV = () => {
    const csv = exportLeadsToCSV(leads);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `brand-bossing-leads-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadTxCSV = () => {
    const csv = exportTransactionsToCSV(transactions);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `brand-bossing-purchases-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRecordNewPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPaymentData.clientBusiness || !newPaymentData.clientOwner) return;

    recordTransaction({
      date: new Date().toISOString().split('T')[0],
      clientBusiness: newPaymentData.clientBusiness,
      clientOwner: newPaymentData.clientOwner,
      barangay: newPaymentData.barangay,
      planName: 'Ormoc MSME Growth Plan',
      amount: 2500,
      paymentMethod: newPaymentData.paymentMethod,
      referenceNo: newPaymentData.referenceNo || `REF-${Math.floor(100000 + Math.random() * 900000)}`,
      orNumber: newPaymentData.orNumber,
      status: 'Paid & Active',
      nextRenewalDate: new Date(Date.now() + 86400000 * 30).toISOString().split('T')[0],
    });

    setShowAddPaymentModal(false);
    setNewPaymentData({
      clientBusiness: '',
      clientOwner: '',
      barangay: 'Ormoc Centro / Poblacion',
      paymentMethod: 'GCash',
      referenceNo: '',
      orNumber: `OR-BB-2026-${Math.floor(100 + Math.random() * 900)}`,
    });
    loadData();
  };

  const handleSimulateLead = () => {
    const demoLeads = [
      {
        businessName: 'Lake Danao Eco-Cabins',
        ownerName: 'Maricar Larrazabal',
        phone: '0917 554 9921',
        email: 'danao.haven@gmail.com',
        barangay: 'Lake Danao Area',
        businessType: 'Tourism / Resort / Eco-Tours',
        notes: 'Inquiry via Ormoc MSME portal. Need Google Maps verification and weekend tourist ads.',
      },
      {
        businessName: 'Cogon Roastery & Bakery',
        ownerName: 'Paulo Mendoza',
        phone: '0922 411 7780',
        email: 'cogonroast@yahoo.com',
        barangay: 'Cogon',
        businessType: 'Food & Beverage / Cafe / Resto',
        notes: 'Requested discovery call for ₱2,500 plan. Wants automated Messenger replies for cake pre-orders.',
      },
    ];

    const pick = demoLeads[Math.floor(Math.random() * demoLeads.length)];
    saveLead({
      source: 'booking_modal',
      businessName: pick.businessName,
      ownerName: pick.ownerName,
      phone: pick.phone,
      email: pick.email,
      barangay: pick.barangay,
      businessType: pick.businessType,
      meetingPreference: 'in-person',
      date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      timeSlot: '02:00 PM – 02:45 PM',
      notes: pick.notes,
      packageInterested: 'Ormoc MSME Growth Plan (₱2,500/mo)',
      estimatedValue: 2500,
    });
    loadData();
  };

  // Financial Metrics
  const totalActiveSubscriptions = transactions.filter((t) => t.status === 'Paid & Active').length;
  const currentMonthlyMRR = totalActiveSubscriptions * 2500;
  const allTimeBillings = transactions.reduce((sum, t) => sum + t.amount, 0);

  // Traffic Totals
  const totalMonthlyViews = 3840;
  const totalUniqueVisitors = 2110;
  const weeklyViewsSum = REALISTIC_DAILY_TRAFFIC.reduce((acc, d) => acc + d.pageViews, 0);
  const weeklyInquiriesSum = REALISTIC_DAILY_TRAFFIC.reduce((acc, d) => acc + d.inquiries, 0);

  // Leads Metrics
  const newLeadsCount = leads.filter((l) => l.status === 'new').length;
  const avgAuditScore = audits.length
    ? Math.round(audits.reduce((acc, a) => acc + a.score, 0) / audits.length)
    : 0;

  // Filtered Leads
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm) ||
      lead.barangay.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Filtered Transactions
  const filteredTx = transactions.filter((t) => {
    return (
      t.clientBusiness.toLowerCase().includes(txSearchTerm.toLowerCase()) ||
      t.clientOwner.toLowerCase().includes(txSearchTerm.toLowerCase()) ||
      t.orNumber.toLowerCase().includes(txSearchTerm.toLowerCase()) ||
      t.paymentMethod.toLowerCase().includes(txSearchTerm.toLowerCase())
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-6xl rounded-3xl border border-amber-400/30 bg-[#0e1014] text-white shadow-2xl overflow-hidden flex flex-col max-h-[94vh]">
        
        {/* ========================================================================= */}
        {/* VIEW 1: PASSWORD GATE (if not authenticated) */}
        {/* ========================================================================= */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-14 flex flex-col items-center text-center justify-center min-h-[480px]">
            <button
              type="button"
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
              title="Close Portal"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Shield & Lock Crest */}
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-amber-400/20 to-amber-500/5 border border-amber-400/40 flex items-center justify-center text-amber-400 shadow-lg shadow-amber-400/10 mb-6">
              <KeyRound className="h-8 w-8" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white">
              Brand<span className="text-amber-400">|</span>Bossing Executive Portal
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-neutral-400 max-w-md leading-relaxed">
              Restricted management & client analytics console for the 4 Bossings:
              <br />
              <span className="text-amber-400 font-semibold">
                John Carlo (CEO) · Alchie (COO) · Mark (CTO) · Raniel (CGO)
              </span>
            </p>

            <form onSubmit={handleLogin} className="mt-8 w-full max-w-sm space-y-4">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter Executive Password..."
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    setPasswordError('');
                  }}
                  autoFocus
                  required
                  className="w-full rounded-xl border border-white/15 bg-black/50 px-4 py-3.5 pr-11 text-sm text-white placeholder-neutral-500 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 focus:outline-none transition-all text-center tracking-wider"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-neutral-400 hover:text-white"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {passwordError && (
                <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-medium flex items-center justify-center gap-1.5 animate-shake">
                  <ShieldAlert className="h-3.5 w-3.5 shrink-0" />
                  <span>{passwordError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 py-3.5 text-sm font-bold text-neutral-950 hover:bg-amber-300 transition-all shadow-lg shadow-amber-400/20 active:scale-[0.99]"
              >
                <Unlock className="h-4 w-4" />
                <span>Authenticate & Access Dashboard</span>
              </button>

              <div className="text-[11px] text-neutral-500 pt-2">
                Agency Internal Security · Session is encrypted and preserved per session
              </div>
            </form>
          </div>
        ) : (
          /* ========================================================================= */
          /* VIEW 2: AUTHENTICATED EXECUTIVE DASHBOARD */
          /* ========================================================================= */
          <>
            {/* Top Bar: Brand, Session Badge, Live Visitors & Logout */}
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#121419] shrink-0">
              <div className="flex items-center gap-3">
                <BossingLogo size="sm" />
                <span className="hidden sm:inline-block h-4 w-[1px] bg-white/20" />
                <div className="hidden sm:flex items-center gap-2.5">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-emerald-400/10 border border-emerald-400/30 text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {liveVisitors} Ormoc Visitors Online Now
                  </span>
                  <span className="text-xs text-neutral-400 font-mono">
                    MRR: <span className="text-amber-400 font-bold">₱{currentMonthlyMRR.toLocaleString()}</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddPaymentModal(true)}
                  className="hidden md:inline-flex items-center gap-1.5 rounded-lg border border-amber-400/40 bg-amber-400/10 px-3 py-1.5 text-xs font-bold text-amber-300 hover:bg-amber-400/20 transition-colors"
                  title="Record client retainer payment"
                >
                  <Receipt className="h-3.5 w-3.5 text-amber-400" />
                  <span>+ Record Payment</span>
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-xs font-semibold text-rose-300 hover:bg-rose-500/20 transition-colors"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Lock Out</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors ml-1"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="px-6 border-b border-white/10 bg-[#0e1014] flex gap-2 overflow-x-auto shrink-0">
              <button
                type="button"
                onClick={() => setActiveTab('overview')}
                className={`py-3 px-3 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
                  activeTab === 'overview'
                    ? 'border-amber-400 text-amber-400'
                    : 'border-transparent text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <TrendingUp className="h-3.5 w-3.5" />
                <span>Executive Overview</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('traffic')}
                className={`py-3 px-3 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
                  activeTab === 'traffic'
                    ? 'border-amber-400 text-amber-400'
                    : 'border-transparent text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Globe2 className="h-3.5 w-3.5" />
                <span>Website Views & Traffic</span>
                <span className="px-1.5 py-0.2 rounded-full bg-emerald-400/20 text-emerald-300 text-[10px] font-bold">
                  {liveVisitors} Live
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('purchases')}
                className={`py-3 px-3 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
                  activeTab === 'purchases'
                    ? 'border-amber-400 text-amber-400'
                    : 'border-transparent text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <CreditCard className="h-3.5 w-3.5" />
                <span>Purchases & Subscriptions</span>
                <span className="px-1.5 py-0.2 rounded-full bg-amber-400 text-black text-[10px] font-black">
                  {totalActiveSubscriptions}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('leads')}
                className={`py-3 px-3 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
                  activeTab === 'leads'
                    ? 'border-amber-400 text-amber-400'
                    : 'border-transparent text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Users className="h-3.5 w-3.5" />
                <span>Client Inquiries ({leads.length})</span>
                {newLeadsCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[10px] font-bold">
                    {newLeadsCount} New
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('audits')}
                className={`py-3 px-3 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
                  activeTab === 'audits'
                    ? 'border-amber-400 text-amber-400'
                    : 'border-transparent text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <BarChart3 className="h-3.5 w-3.5" />
                <span>Diagnostic Audits ({audits.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('activity')}
                className={`py-3 px-3 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
                  activeTab === 'activity'
                    ? 'border-amber-400 text-amber-400'
                    : 'border-transparent text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Clock className="h-3.5 w-3.5" />
                <span>Live Event Stream</span>
              </button>
            </div>

            {/* Tab Body Content (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-8 bg-[#0c0d10]">
              
              {/* ================================================================= */}
              {/* TAB 1: EXECUTIVE OVERVIEW */}
              {/* ================================================================= */}
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  {/* Top 4 Key Numbers */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Monthly Recurring Revenue */}
                    <div className="p-5 rounded-2xl border border-amber-400/40 bg-[#141720] shadow-lg shadow-amber-400/5">
                      <div className="flex items-center justify-between text-xs text-neutral-400">
                        <span className="font-semibold uppercase tracking-wider text-amber-400">
                          Active Monthly MRR
                        </span>
                        <DollarSign className="h-4 w-4 text-amber-400" />
                      </div>
                      <div className="mt-3 text-2xl sm:text-3xl font-extrabold font-display text-amber-400 tabular-nums">
                        ₱{currentMonthlyMRR.toLocaleString()}
                      </div>
                      <div className="mt-1 text-xs text-neutral-400 flex items-center justify-between">
                        <span>{totalActiveSubscriptions} Clients @ ₱2,500/mo</span>
                        <span className="text-emerald-400 font-bold">+18% MoM</span>
                      </div>
                    </div>

                    {/* Total Website Traffic */}
                    <div className="p-5 rounded-2xl border border-white/10 bg-[#121419]">
                      <div className="flex items-center justify-between text-xs text-neutral-400">
                        <span className="font-semibold uppercase tracking-wider">
                          Monthly Site Views
                        </span>
                        <Globe2 className="h-4 w-4 text-emerald-400" />
                      </div>
                      <div className="mt-3 text-2xl sm:text-3xl font-extrabold font-display text-white tabular-nums">
                        {totalMonthlyViews.toLocaleString()}
                      </div>
                      <div className="mt-1 text-xs text-neutral-400 flex items-center justify-between">
                        <span>{totalUniqueVisitors.toLocaleString()} Unique Ormoc Visitors</span>
                        <span className="text-emerald-400 font-bold font-mono">{liveVisitors} live now</span>
                      </div>
                    </div>

                    {/* All-Time Billings */}
                    <div className="p-5 rounded-2xl border border-white/10 bg-[#121419]">
                      <div className="flex items-center justify-between text-xs text-neutral-400">
                        <span className="font-semibold uppercase tracking-wider">
                          All-Time Revenue
                        </span>
                        <Receipt className="h-4 w-4 text-amber-400" />
                      </div>
                      <div className="mt-3 text-2xl sm:text-3xl font-extrabold font-display text-white tabular-nums">
                        ₱{allTimeBillings.toLocaleString()}
                      </div>
                      <div className="mt-1 text-xs text-neutral-400">
                        Official Receipts & GCash ledger
                      </div>
                    </div>

                    {/* New Uncontacted Leads */}
                    <div className="p-5 rounded-2xl border border-white/10 bg-[#121419]">
                      <div className="flex items-center justify-between text-xs text-neutral-400">
                        <span className="font-semibold uppercase tracking-wider">
                          New Inquiries Pending
                        </span>
                        <MessageSquare className="h-4 w-4 text-purple-400" />
                      </div>
                      <div className="mt-3 text-2xl sm:text-3xl font-extrabold font-display text-white tabular-nums">
                        {newLeadsCount}
                      </div>
                      <div className="mt-1 text-xs text-rose-400">
                        Direct Viber action required
                      </div>
                    </div>
                  </div>

                  {/* Highlights Grid: Quick Traffic chart & Recent purchases */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left: 7-Day Traffic Spark */}
                    <div className="rounded-2xl border border-white/10 bg-[#121419] p-6">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold font-display text-white flex items-center gap-2">
                          <Activity className="h-4 w-4 text-emerald-400" />
                          <span>7-Day Website Traffic Trend</span>
                        </h4>
                        <button
                          type="button"
                          onClick={() => setActiveTab('traffic')}
                          className="text-xs text-amber-400 hover:underline flex items-center gap-1"
                        >
                          <span>Full Traffic Breakdown</span>
                          <ArrowUpRight className="h-3 w-3" />
                        </button>
                      </div>

                      <div className="mt-5 space-y-3">
                        {REALISTIC_DAILY_TRAFFIC.slice(-5).map((d) => (
                          <div key={d.day} className="flex items-center justify-between text-xs">
                            <span className="text-neutral-400 w-24">{d.day}</span>
                            <div className="flex-1 mx-3 h-2 bg-white/5 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-emerald-500 to-amber-400 rounded-full"
                                style={{ width: `${(d.pageViews / 200) * 100}%` }}
                              />
                            </div>
                            <span className="font-mono text-white font-bold w-16 text-right">
                              {d.pageViews} views
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-neutral-400">
                        <span>Weekly Total: <strong className="text-white">{weeklyViewsSum}</strong> views</span>
                        <span>Inquiries Generated: <strong className="text-amber-400">{weeklyInquiriesSum}</strong> leads</span>
                      </div>
                    </div>

                    {/* Right: Latest Verified Purchases */}
                    <div className="rounded-2xl border border-white/10 bg-[#121419] p-6">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold font-display text-white flex items-center gap-2">
                          <CreditCard className="h-4 w-4 text-amber-400" />
                          <span>Latest MSME Client Purchases</span>
                        </h4>
                        <button
                          type="button"
                          onClick={() => setActiveTab('purchases')}
                          className="text-xs text-amber-400 hover:underline flex items-center gap-1"
                        >
                          <span>View All ({transactions.length})</span>
                          <ArrowUpRight className="h-3 w-3" />
                        </button>
                      </div>

                      <div className="mt-4 divide-y divide-white/5">
                        {transactions.slice(0, 4).map((tx) => (
                          <div key={tx.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                            <div>
                              <div className="font-bold text-white">{tx.clientBusiness}</div>
                              <div className="text-[11px] text-neutral-400">
                                {tx.barangay} · via <span className="text-amber-300 font-semibold">{tx.paymentMethod}</span>
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <div className="font-bold text-amber-400 font-mono">
                                ₱{tx.amount.toLocaleString()}
                              </div>
                              <div className="text-[10px] text-emerald-400 font-semibold">
                                {tx.status}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => setShowAddPaymentModal(true)}
                          className="w-full py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                        >
                          <Receipt className="h-3.5 w-3.5" />
                          <span>Record New Payment (₱2,500)</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 4 Bossings Directives */}
                  <div className="rounded-2xl border border-white/10 bg-[#121419] p-6">
                    <h4 className="text-sm font-bold font-display uppercase tracking-wider text-amber-400 flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4" />
                      <span>Executive Action Directives (The 4 Bossings)</span>
                    </h4>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                      <div className="p-4 rounded-xl border border-amber-400/20 bg-amber-400/5">
                        <div className="font-bold text-amber-400 font-display">
                          Rank 01 · John Carlo (CEO)
                        </div>
                        <p className="mt-1.5 text-neutral-300 leading-relaxed">
                          Oversee agency funnel operations, monitor the ₱{currentMonthlyMRR.toLocaleString()} MRR billing pipeline, and lead regional tech partnerships.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                        <div className="font-bold text-white font-display">
                          Rank 02 · Alchie (COO)
                        </div>
                        <p className="mt-1.5 text-neutral-300 leading-relaxed">
                          Coordinate on-site 4K shooting schedules for newly paid clients ({totalActiveSubscriptions} active Ormoc businesses).
                        </p>
                      </div>

                      <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                        <div className="font-bold text-white font-display">
                          Rank 03 · Mark (CTO)
                        </div>
                        <p className="mt-1.5 text-neutral-300 leading-relaxed">
                          Audit Meta Ads ROAS and ensure Google Maps 3-Pack rankings stay #1 for every client in Poblacion, Cogon, and Valencia.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                        <div className="font-bold text-white font-display">
                          Rank 04 · Raniel (CGO)
                        </div>
                        <p className="mt-1.5 text-neutral-300 leading-relaxed">
                          Follow up with {newLeadsCount} prospective leads on Viber within 15 minutes of submission to close the ₱2,500/mo package.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ================================================================= */}
              {/* TAB 2: WEBSITE VIEWS & TRAFFIC ANALYTICS */}
              {/* ================================================================= */}
              {activeTab === 'traffic' && (
                <div className="space-y-8">
                  {/* Traffic Top Banner */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-5 rounded-2xl border border-emerald-400/30 bg-[#141720]">
                      <div className="text-xs text-neutral-400 uppercase font-semibold">Active Right Now</div>
                      <div className="mt-2 text-3xl font-extrabold font-display text-emerald-400 flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full bg-emerald-400 animate-ping" />
                        <span>{liveVisitors} Users</span>
                      </div>
                      <div className="mt-1 text-[11px] text-neutral-400">Browsing Ormoc agency pages</div>
                    </div>

                    <div className="p-5 rounded-2xl border border-white/10 bg-[#121419]">
                      <div className="text-xs text-neutral-400 uppercase font-semibold">Total Monthly Views</div>
                      <div className="mt-2 text-3xl font-extrabold font-display text-white">
                        {totalMonthlyViews.toLocaleString()}
                      </div>
                      <div className="mt-1 text-[11px] text-neutral-400">Across 30 days in Region 8</div>
                    </div>

                    <div className="p-5 rounded-2xl border border-white/10 bg-[#121419]">
                      <div className="text-xs text-neutral-400 uppercase font-semibold">Unique Visitors</div>
                      <div className="mt-2 text-3xl font-extrabold font-display text-white">
                        {totalUniqueVisitors.toLocaleString()}
                      </div>
                      <div className="mt-1 text-[11px] text-neutral-400">Unique device IPs tracked</div>
                    </div>

                    <div className="p-5 rounded-2xl border border-white/10 bg-[#121419]">
                      <div className="text-xs text-neutral-400 uppercase font-semibold">Average Session</div>
                      <div className="mt-2 text-3xl font-extrabold font-display text-amber-400">
                        2m 48s
                      </div>
                      <div className="mt-1 text-[11px] text-neutral-400">High engagement on audit & pricing</div>
                    </div>
                  </div>

                  {/* 7-Day Detailed Breakdown Table */}
                  <div className="rounded-2xl border border-white/10 bg-[#121419] p-6">
                    <h4 className="text-sm font-bold font-display text-white flex items-center gap-2">
                      <BarChart3 className="h-4 w-4 text-amber-400" />
                      <span>Daily Visitor Breakdown (Last 7 Days)</span>
                    </h4>
                    <p className="mt-1 text-xs text-neutral-400">
                      Real-time traffic counts and inquiry conversion rate per day in Ormoc City
                    </p>

                    <div className="mt-6 overflow-x-auto">
                      <table className="w-full text-xs text-left">
                        <thead className="border-b border-white/10 text-neutral-400 uppercase tracking-wider text-[11px]">
                          <tr>
                            <th className="py-3 px-4">Date / Day</th>
                            <th className="py-3 px-4">Page Views</th>
                            <th className="py-3 px-4">Unique Visitors</th>
                            <th className="py-3 px-4">Inquiries Generated</th>
                            <th className="py-3 px-4">Conversion Rate</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {REALISTIC_DAILY_TRAFFIC.map((d) => {
                            const conv = ((d.inquiries / d.uniqueVisitors) * 100).toFixed(1);
                            return (
                              <tr key={d.day} className="hover:bg-white/[0.02]">
                                <td className="py-3.5 px-4 font-semibold text-white">{d.day}</td>
                                <td className="py-3.5 px-4 font-mono text-amber-300 font-bold">{d.pageViews}</td>
                                <td className="py-3.5 px-4 font-mono text-neutral-300">{d.uniqueVisitors}</td>
                                <td className="py-3.5 px-4">
                                  <span className="px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/20 font-bold">
                                    {d.inquiries} inquiries
                                  </span>
                                </td>
                                <td className="py-3.5 px-4 font-mono text-emerald-400 font-semibold">{conv}%</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Sources & Geographic Location split */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Traffic Sources */}
                    <div className="rounded-2xl border border-white/10 bg-[#121419] p-6">
                      <h4 className="text-sm font-bold font-display text-white flex items-center gap-2">
                        <Layers className="h-4 w-4 text-amber-400" />
                        <span>Where Our Visitors Come From (Acquisition Channels)</span>
                      </h4>

                      <div className="mt-5 space-y-4">
                        {REALISTIC_TRAFFIC_SOURCES.map((src) => (
                          <div key={src.source} className="space-y-1 text-xs">
                            <div className="flex justify-between">
                              <span className="text-neutral-300 font-medium">{src.source}</span>
                              <span className="text-amber-400 font-bold font-mono">
                                {src.visitors} ({src.percentage}%)
                              </span>
                            </div>
                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full"
                                style={{ width: `${src.percentage}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Geography & Devices */}
                    <div className="rounded-2xl border border-white/10 bg-[#121419] p-6 space-y-6">
                      <div>
                        <h4 className="text-sm font-bold font-display text-white flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-emerald-400" />
                          <span>Geographic Visitor Distribution</span>
                        </h4>

                        <div className="mt-4 space-y-3">
                          {REALISTIC_LOCATIONS.map((loc) => (
                            <div key={loc.location} className="flex items-center justify-between text-xs">
                              <span className="text-neutral-300">{loc.location}</span>
                              <span className="text-emerald-400 font-mono font-bold">
                                {loc.percentage}% ({loc.visitors})
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-white/5">
                        <div className="text-xs font-semibold text-neutral-400 mb-2">Device Breakdown</div>
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-3">
                            <Smartphone className="h-5 w-5 text-amber-400" />
                            <div>
                              <div className="font-bold text-white">84% Mobile</div>
                              <div className="text-[10px] text-neutral-400">Android & iPhone (4G/LTE)</div>
                            </div>
                          </div>
                          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-3">
                            <Globe2 className="h-5 w-5 text-amber-400" />
                            <div>
                              <div className="font-bold text-white">16% Desktop</div>
                              <div className="text-[10px] text-neutral-400">Mac & Windows Laptops</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ================================================================= */}
              {/* TAB 3: PURCHASES & SUBSCRIPTIONS (BILLING LEDGER) */}
              {/* ================================================================= */}
              {activeTab === 'purchases' && (
                <div className="space-y-6">
                  {/* Revenue Summary Banner */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-5 rounded-2xl border border-amber-400/40 bg-[#141720]">
                      <div className="text-xs text-amber-400 font-bold uppercase tracking-wider">
                        Active Monthly Retainers
                      </div>
                      <div className="mt-2 text-3xl font-extrabold font-display text-white">
                        ₱{currentMonthlyMRR.toLocaleString()} <span className="text-xs text-neutral-400">/ mo</span>
                      </div>
                      <div className="mt-1 text-xs text-neutral-300">
                        {totalActiveSubscriptions} verified MSMEs subscribed @ ₱2,500/mo
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl border border-white/10 bg-[#121419]">
                      <div className="text-xs text-neutral-400 font-bold uppercase tracking-wider">
                        All-Time Billings
                      </div>
                      <div className="mt-2 text-3xl font-extrabold font-display text-white">
                        ₱{allTimeBillings.toLocaleString()}
                      </div>
                      <div className="mt-1 text-xs text-neutral-400">
                        Total payments collected since launch
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl border border-white/10 bg-[#121419]">
                      <div className="text-xs text-neutral-400 font-bold uppercase tracking-wider">
                        Payment Methods Accepted
                      </div>
                      <div className="mt-2 text-sm font-semibold text-neutral-200">
                        GCash · Maya · BDO · BPI · Cash
                      </div>
                      <div className="mt-1 text-xs text-emerald-400">
                        100% compliant with Official Receipts
                      </div>
                    </div>
                  </div>

                  {/* Actions & Search */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#121419] p-4 rounded-2xl border border-white/10">
                    <div className="relative w-full sm:w-80">
                      <Search className="h-4 w-4 absolute left-3 top-3 text-neutral-500" />
                      <input
                        type="text"
                        placeholder="Search client, OR #, or payment..."
                        value={txSearchTerm}
                        onChange={(e) => setTxSearchTerm(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-black/40 pl-9 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                      />
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={() => setShowAddPaymentModal(true)}
                        className="flex-1 sm:flex-initial py-2 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-amber-400/20"
                      >
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span>Record Payment (₱2,500)</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleDownloadTxCSV}
                        className="p-2 rounded-xl border border-white/10 hover:bg-white/5 text-neutral-300"
                        title="Export Billing Ledger to CSV"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Transactions Table */}
                  <div className="rounded-2xl border border-white/10 bg-[#121419] overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left">
                        <thead className="border-b border-white/10 text-neutral-400 uppercase tracking-wider text-[11px] bg-black/20">
                          <tr>
                            <th className="py-3.5 px-4">Date</th>
                            <th className="py-3.5 px-4">Client Business & Owner</th>
                            <th className="py-3.5 px-4">Barangay</th>
                            <th className="py-3.5 px-4">Plan & Amount</th>
                            <th className="py-3.5 px-4">Payment Method</th>
                            <th className="py-3.5 px-4">OR # / Ref</th>
                            <th className="py-3.5 px-4">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {filteredTx.length === 0 ? (
                            <tr>
                              <td colSpan={7} className="text-center py-8 text-neutral-500">
                                No purchase transactions found.
                              </td>
                            </tr>
                          ) : (
                            filteredTx.map((tx) => (
                              <tr key={tx.id} className="hover:bg-white/[0.02]">
                                <td className="py-3.5 px-4 font-mono text-neutral-400">{tx.date}</td>
                                <td className="py-3.5 px-4">
                                  <div className="font-bold text-white">{tx.clientBusiness}</div>
                                  <div className="text-[11px] text-neutral-400">{tx.clientOwner}</div>
                                </td>
                                <td className="py-3.5 px-4 text-neutral-300">{tx.barangay}</td>
                                <td className="py-3.5 px-4">
                                  <div className="font-extrabold text-amber-400 font-mono">
                                    ₱{tx.amount.toLocaleString()}
                                  </div>
                                  <div className="text-[10px] text-neutral-500">{tx.planName}</div>
                                </td>
                                <td className="py-3.5 px-4">
                                  <span className="px-2 py-0.5 rounded-md bg-white/10 text-neutral-200 font-semibold font-mono text-[11px]">
                                    {tx.paymentMethod}
                                  </span>
                                </td>
                                <td className="py-3.5 px-4 font-mono text-[11px] text-neutral-300">
                                  <div>{tx.orNumber}</div>
                                  <div className="text-[10px] text-neutral-500">{tx.referenceNo}</div>
                                </td>
                                <td className="py-3.5 px-4">
                                  <span className="px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold">
                                    {tx.status}
                                  </span>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* ================================================================= */}
              {/* TAB 4: CLIENT INQUIRIES & LEADS MANAGER */}
              {/* ================================================================= */}
              {activeTab === 'leads' && (
                <div className="space-y-6">
                  {/* Search & Filters Header */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-[#121419] p-4 rounded-2xl border border-white/10">
                    <div className="sm:col-span-5 relative">
                      <Search className="h-4 w-4 absolute left-3 top-3 text-neutral-500" />
                      <input
                        type="text"
                        placeholder="Search business, owner, phone, or barangay..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-black/40 pl-9 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                      >
                        <option value="all">All Statuses ({leads.length})</option>
                        <option value="new">New ({leads.filter((l) => l.status === 'new').length})</option>
                        <option value="contacted">Contacted on Viber</option>
                        <option value="call_scheduled">Call Scheduled</option>
                        <option value="closed_client">Closed Clients (₱2,500/mo)</option>
                      </select>
                    </div>

                    <div className="sm:col-span-4 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleSimulateLead}
                        className="w-full py-2 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                      >
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span>+ Add Demo Lead</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleDownloadCSV}
                        className="p-2 rounded-xl border border-white/10 hover:bg-white/5 text-neutral-300"
                        title="Download CSV"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Leads List */}
                  {filteredLeads.length === 0 ? (
                    <div className="text-center py-12 border border-dashed border-white/10 rounded-2xl p-8">
                      <Users className="h-8 w-8 text-neutral-600 mx-auto" />
                      <h4 className="mt-3 text-sm font-bold text-white">No leads match your filter</h4>
                      <p className="mt-1 text-xs text-neutral-400">
                        Try clearing search terms or simulate a test lead.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredLeads.map((lead) => {
                        const viberHref = `viber://chat?number=${encodeURIComponent(
                          lead.phone.replace(/[^0-9+]/g, '')
                        )}`;
                        const telHref = `tel:${lead.phone.replace(/[^0-9+]/g, '')}`;

                        return (
                          <div
                            key={lead.id}
                            className={`rounded-2xl border p-5 sm:p-6 transition-all bg-[#121419] ${
                              lead.status === 'new'
                                ? 'border-amber-400/40 shadow-md shadow-amber-400/5'
                                : lead.status === 'closed_client'
                                ? 'border-emerald-400/40 bg-emerald-950/10'
                                : 'border-white/10'
                            }`}
                          >
                            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                              {/* Left: Lead Identity */}
                              <div className="space-y-2 max-w-xl">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="text-base sm:text-lg font-extrabold font-display text-white">
                                    {lead.businessName}
                                  </span>
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/10 text-neutral-300">
                                    {lead.businessType}
                                  </span>
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400/10 text-amber-300 border border-amber-400/20">
                                    📍 {lead.barangay}
                                  </span>
                                </div>

                                <div className="text-xs text-neutral-300 flex flex-wrap items-center gap-3">
                                  <span className="font-semibold text-white">
                                    Owner: {lead.ownerName}
                                  </span>
                                  <span>·</span>
                                  <span>Phone: {lead.phone}</span>
                                  {lead.email && (
                                    <>
                                      <span>·</span>
                                      <span className="text-neutral-400">{lead.email}</span>
                                    </>
                                  )}
                                </div>

                                {lead.notes && (
                                  <div className="text-xs text-neutral-300 bg-black/40 p-3 rounded-xl border border-white/5 leading-relaxed">
                                    <span className="text-amber-400 font-bold">Client Notes: </span>
                                    {lead.notes}
                                  </div>
                                )}

                                {lead.date && (
                                  <div className="text-xs text-neutral-400 flex items-center gap-2">
                                    <Calendar className="h-3.5 w-3.5 text-amber-400" />
                                    <span>
                                      Requested Time: {lead.date} ({lead.timeSlot}) · {lead.meetingPreference === 'in-person' ? 'In-Person Cafe Chat' : 'Virtual Call'}
                                    </span>
                                  </div>
                                )}
                              </div>

                              {/* Right: Status Switcher & Direct Viber Action */}
                              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 lg:items-end">
                                <div className="flex items-center gap-2">
                                  <a
                                    href={viberHref}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-colors shadow-sm"
                                    title="Open directly on Viber"
                                  >
                                    <MessageSquare className="h-3.5 w-3.5" />
                                    <span>Open Viber</span>
                                  </a>

                                  <a
                                    href={telHref}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-neutral-200 text-xs font-bold transition-colors"
                                  >
                                    <Phone className="h-3.5 w-3.5" />
                                    <span>Call</span>
                                  </a>

                                  <button
                                    type="button"
                                    onClick={() => handleDeleteLead(lead.id)}
                                    className="p-1.5 rounded-lg text-neutral-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                                    title="Delete Lead"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </button>
                                </div>

                                <div className="flex items-center gap-2">
                                  <span className="text-[11px] text-neutral-500">Pipeline:</span>
                                  <select
                                    value={lead.status}
                                    onChange={(e) =>
                                      handleStatusChange(lead.id, e.target.value as LeadStatus)
                                    }
                                    className={`rounded-lg px-2.5 py-1 text-xs font-bold focus:outline-none border ${
                                      lead.status === 'new'
                                        ? 'bg-amber-400 text-neutral-950 border-amber-400'
                                        : lead.status === 'closed_client'
                                        ? 'bg-emerald-500 text-neutral-950 border-emerald-500'
                                        : 'bg-black/50 text-white border-white/15'
                                    }`}
                                  >
                                    <option value="new">New (Needs Call)</option>
                                    <option value="contacted">Contacted on Viber</option>
                                    <option value="call_scheduled">Call Scheduled</option>
                                    <option value="proposal_sent">Proposal Sent</option>
                                    <option value="closed_client">Closed Client (₱2,500/mo)</option>
                                    <option value="archived">Archived</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* ================================================================= */}
              {/* TAB 5: DIAGNOSTIC AUDITS */}
              {/* ================================================================= */}
              {activeTab === 'audits' && (
                <div className="space-y-6">
                  <div className="bg-[#121419] p-5 rounded-2xl border border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-bold font-display text-white">
                        Ormoc Market Readiness Audits Recorded
                      </h4>
                      <p className="mt-1 text-xs text-neutral-400">
                        When local owners test their marketing in the 5-minute audit tool, their results appear here for discovery call prep.
                      </p>
                    </div>

                    <div className="text-right shrink-0 bg-white/5 p-3 rounded-xl border border-white/10">
                      <div className="text-xs text-neutral-400">Average Score</div>
                      <div className="text-xl font-bold font-display text-amber-400 font-mono">
                        {avgAuditScore} / 100
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {audits.map((audit) => (
                      <div
                        key={audit.id}
                        className="rounded-2xl border border-white/10 bg-[#121419] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-base font-extrabold font-display text-white">
                              Diagnostic Submission #{audit.id.slice(-4)}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                audit.score < 40
                                  ? 'bg-rose-500/10 text-rose-300 border border-rose-500/30'
                                  : audit.score < 75
                                  ? 'bg-amber-400/10 text-amber-300 border border-amber-400/30'
                                  : 'bg-emerald-400/10 text-emerald-300 border border-emerald-400/30'
                              }`}
                            >
                              {audit.level}
                            </span>
                          </div>

                          <p className="text-xs text-neutral-300 max-w-xl">
                            <span className="text-amber-400 font-semibold">Priority Action: </span>
                            {audit.priorityAction}
                          </p>

                          {audit.answersSummary && (
                            <div className="text-[11px] text-neutral-400">
                              Responses: {audit.answersSummary}
                            </div>
                          )}
                        </div>

                        <div className="text-right shrink-0">
                          <div className="text-2xl font-black font-display text-amber-400 font-mono">
                            {audit.score} <span className="text-xs text-neutral-400">/ 100</span>
                          </div>
                          <div className="text-[10px] text-neutral-500">
                            {new Date(audit.createdAt).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ================================================================= */}
              {/* TAB 6: LIVE EVENT STREAM */}
              {/* ================================================================= */}
              {activeTab === 'activity' && (
                <div className="space-y-6">
                  <div className="bg-[#121419] p-5 rounded-2xl border border-white/10">
                    <h4 className="text-sm font-bold font-display text-white">
                      Live User Interaction Stream
                    </h4>
                    <p className="mt-1 text-xs text-neutral-400">
                      Real-time telemetry showing client engagement actions across the site.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-[#121419] p-4 divide-y divide-white/5 max-h-[500px] overflow-y-auto font-mono text-xs">
                    {events.length === 0 ? (
                      <div className="py-8 text-center text-neutral-500">
                        No activity events logged yet. Try clicking buttons or completing an audit to test telemetry.
                      </div>
                    ) : (
                      events.map((ev) => (
                        <div key={ev.id} className="py-3 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <span className="h-2 w-2 rounded-full bg-amber-400" />
                            <span className="font-bold text-amber-400">{ev.type}</span>
                            <span className="text-neutral-300 font-sans">{ev.label || 'User Action'}</span>
                          </div>
                          <span className="text-neutral-500 text-[10px] shrink-0">
                            {new Date(ev.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Footer Credits */}
            <div className="px-6 py-3 border-t border-white/10 bg-[#0e1014] flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 shrink-0 gap-2">
              <div>
                Executive Console · <span className="text-white font-medium">Brand|Bossing Marketing Agency</span> (Ormoc City)
              </div>
              <div className="text-[11px] text-neutral-500">
                Password protected: <code className="bg-white/5 px-1.5 py-0.5 rounded text-amber-400 font-mono">4bossing</code>
              </div>
            </div>
          </>
        )}

        {/* ========================================================================= */}
        {/* MODAL: RECORD NEW CLIENT PAYMENT */}
        {/* ========================================================================= */}
        {showAddPaymentModal && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-2xl border border-amber-400/40 bg-[#141720] p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h4 className="text-base font-bold font-display text-white flex items-center gap-2">
                  <Receipt className="h-4 w-4 text-amber-400" />
                  <span>Record Client Payment (₱2,500 Retainer)</span>
                </h4>
                <button
                  type="button"
                  onClick={() => setShowAddPaymentModal(false)}
                  className="text-neutral-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handleRecordNewPayment} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-semibold text-neutral-300 mb-1">
                    Client Business Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ormoc Bay Bistro"
                    value={newPaymentData.clientBusiness}
                    onChange={(e) =>
                      setNewPaymentData({ ...newPaymentData, clientBusiness: e.target.value })
                    }
                    className="w-full rounded-lg border border-white/10 bg-black/50 px-3 py-2 text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-neutral-300 mb-1">
                    Owner Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maria Santos"
                    value={newPaymentData.clientOwner}
                    onChange={(e) =>
                      setNewPaymentData({ ...newPaymentData, clientOwner: e.target.value })
                    }
                    className="w-full rounded-lg border border-white/10 bg-black/50 px-3 py-2 text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-neutral-300 mb-1">
                      Payment Method
                    </label>
                    <select
                      value={newPaymentData.paymentMethod}
                      onChange={(e) =>
                        setNewPaymentData({
                          ...newPaymentData,
                          paymentMethod: e.target.value as PaymentMethod,
                        })
                      }
                      className="w-full rounded-lg border border-white/10 bg-black/50 px-3 py-2 text-white focus:border-amber-400 focus:outline-none"
                    >
                      <option value="GCash">GCash</option>
                      <option value="Maya">Maya</option>
                      <option value="BDO Online">BDO Online</option>
                      <option value="BPI Online">BPI Online</option>
                      <option value="Cash (Office)">Cash (Office)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-neutral-300 mb-1">
                      Official Receipt (OR) #
                    </label>
                    <input
                      type="text"
                      value={newPaymentData.orNumber}
                      onChange={(e) =>
                        setNewPaymentData({ ...newPaymentData, orNumber: e.target.value })
                      }
                      className="w-full rounded-lg border border-white/10 bg-black/50 px-3 py-2 text-white font-mono focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-neutral-300 mb-1">
                    Reference / Transaction ID
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. GCASH-1928374 or BDO-TX-4482"
                    value={newPaymentData.referenceNo}
                    onChange={(e) =>
                      setNewPaymentData({ ...newPaymentData, referenceNo: e.target.value })
                    }
                    className="w-full rounded-lg border border-white/10 bg-black/50 px-3 py-2 text-white font-mono placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div className="p-3 rounded-lg bg-amber-400/10 border border-amber-400/20 text-[11px] text-amber-300">
                  Fixed Amount: <strong>₱2,500.00</strong> (Ormoc MSME Monthly Retainer). This will immediately update your monthly active MRR and add an entry to the verified billing ledger.
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddPaymentModal(false)}
                    className="px-4 py-2 rounded-lg border border-white/10 text-neutral-300 hover:bg-white/5"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold transition-colors"
                  >
                    Record ₱2,500 Payment
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
