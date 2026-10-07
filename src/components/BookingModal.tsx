import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, MapPin, CheckCircle2, MessageSquare, Download, ArrowRight, ShieldCheck } from 'lucide-react';
import { ORMOC_BARANGAYS, BUSINESS_TYPES } from '../data/ormocData';
import { ConsultationBooking } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillNotes?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, prefillNotes }) => {
  const [formData, setFormData] = useState<Partial<ConsultationBooking>>({
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    barangay: ORMOC_BARANGAYS[0],
    businessType: BUSINESS_TYPES[0],
    meetingPreference: 'in-person',
    notes: '',
    date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    timeSlot: '10:00 AM - 10:45 AM',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (prefillNotes) {
      setFormData((prev) => ({
        ...prev,
        notes: prefillNotes,
      }));
    }
  }, [prefillNotes]);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.businessName?.trim()) errs.businessName = 'Business name is required';
    if (!formData.ownerName?.trim()) errs.ownerName = 'Contact person is required';
    if (!formData.email?.trim() || !formData.email.includes('@')) {
      errs.email = 'Valid email address is required';
    }
    if (!formData.phone?.trim() || formData.phone.length < 10) {
      errs.phone = 'Valid phone number is required (e.g. 0917 123 4567)';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  const downloadCalendarEvent = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Brand|Bossing Marketing Agency//Ormoc City//EN
BEGIN:VEVENT
SUMMARY:Brand|Bossing Discovery Session - ${formData.businessName}
DESCRIPTION:Strategy meeting with Brand|Bossing Marketing Agency to review local growth blueprint for ${formData.businessName}. Meeting format: ${formData.meetingPreference === 'in-person' ? 'In-Person Coffee Chat (Ormoc Centro)' : 'Google Meet / Virtual'}.
LOCATION:${formData.meetingPreference === 'in-person' ? 'Ormoc Centro Cafe, Ormoc City, Leyte' : 'Google Meet'}
DTSTART:${formData.date?.replace(/-/g, '')}T020000Z
DTEND:${formData.date?.replace(/-/g, '')}T024500Z
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `brand-bossing-strategy-${formData.businessName?.replace(/\s+/g, '-').toLowerCase()}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const directMessengerText = encodeURIComponent(
    `Hello Brand|Bossing Team! I just scheduled a discovery call for my business "${formData.businessName}" (${formData.businessType}) in ${formData.barangay}, Ormoc City for ${formData.date} at ${formData.timeSlot}. Notes: ${formData.notes || 'Looking forward to growing our Ormoc presence.'}`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl rounded-2xl border border-white/10 bg-[#121419] p-6 sm:p-8 shadow-2xl my-8">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 rounded-lg p-2 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-400 uppercase">
              <Calendar className="h-4 w-4" />
              <span>Complimentary 30-Min Strategy Call</span>
            </div>
            <h3 className="mt-2 text-2xl font-bold font-display text-white">
              Schedule Your Ormoc Discovery Session.
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-neutral-400">
              No sales pressure. We evaluate your current marketing and show you the exact levers to dominate your Ormoc category.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300">
                    Business / Store Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ormoc Bay Bistro"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-white/10 bg-[#0c0d10] px-3.5 py-2 text-sm text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                  />
                  {errors.businessName && (
                    <span className="text-[11px] text-rose-400 mt-0.5 block">{errors.businessName}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300">
                    Your Name / Role *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maria Santos (Owner)"
                    value={formData.ownerName}
                    onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-white/10 bg-[#0c0d10] px-3.5 py-2 text-sm text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                  />
                  {errors.ownerName && (
                    <span className="text-[11px] text-rose-400 mt-0.5 block">{errors.ownerName}</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300">
                    Contact Number (Phone / Viber) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0917 123 4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-white/10 bg-[#0c0d10] px-3.5 py-2 text-sm text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                  />
                  {errors.phone && (
                    <span className="text-[11px] text-rose-400 mt-0.5 block">{errors.phone}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="maria@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-white/10 bg-[#0c0d10] px-3.5 py-2 text-sm text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                  />
                  {errors.email && (
                    <span className="text-[11px] text-rose-400 mt-0.5 block">{errors.email}</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300">
                    Ormoc Barangay / Area
                  </label>
                  <select
                    value={formData.barangay}
                    onChange={(e) => setFormData({ ...formData, barangay: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-white/10 bg-[#0c0d10] px-3.5 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
                  >
                    {ORMOC_BARANGAYS.map((b) => (
                      <option key={b} value={b} className="bg-[#0c0d10] text-white">
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300">
                    Business Category
                  </label>
                  <select
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-white/10 bg-[#0c0d10] px-3.5 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
                  >
                    {BUSINESS_TYPES.map((bt) => (
                      <option key={bt} value={bt} className="bg-[#0c0d10] text-white">
                        {bt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Preferred Meeting Style */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Preferred Meeting Format
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, meetingPreference: 'in-person' })}
                    className={`p-3 rounded-lg border text-left text-xs font-medium transition-all ${
                      formData.meetingPreference === 'in-person'
                        ? 'border-amber-400 bg-amber-400/10 text-white'
                        : 'border-white/10 bg-white/5 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <div className="font-bold">☕ In-Person Coffee Chat</div>
                    <div className="text-[11px] text-neutral-400 mt-0.5">Meet at an Ormoc Centro cafe</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, meetingPreference: 'virtual' })}
                    className={`p-3 rounded-lg border text-left text-xs font-medium transition-all ${
                      formData.meetingPreference === 'virtual'
                        ? 'border-amber-400 bg-amber-400/10 text-white'
                        : 'border-white/10 bg-white/5 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <div className="font-bold">💻 Google Meet / Phone</div>
                    <div className="text-[11px] text-neutral-400 mt-0.5">Virtual 30-min screen share</div>
                  </button>
                </div>
              </div>

              {/* Date & Time Selection */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-white/10 bg-[#0c0d10] px-3.5 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-300">
                    Preferred Time Slot
                  </label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-white/10 bg-[#0c0d10] px-3.5 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
                  >
                    <option value="09:00 AM - 09:45 AM">09:00 AM - 09:45 AM</option>
                    <option value="10:00 AM - 10:45 AM">10:00 AM - 10:45 AM</option>
                    <option value="02:00 PM - 02:45 PM">02:00 PM - 02:45 PM</option>
                    <option value="04:00 PM - 04:45 PM">04:00 PM - 04:45 PM</option>
                    <option value="07:00 PM - 07:45 PM (After Store Hours)">07:00 PM - 07:45 PM (After Hours)</option>
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300">
                  Current Marketing Goals or Questions
                </label>
                <textarea
                  rows={2}
                  placeholder="Tell us what you want to achieve (e.g. increase foot traffic, sell more pasalubong boxes, get Google Maps rank)..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-white/10 bg-[#0c0d10] px-3.5 py-2 text-sm text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-amber-400 py-3 text-sm font-bold text-neutral-950 hover:bg-amber-300 transition-colors shadow-md shadow-amber-400/20"
                >
                  <span>Confirm Strategy Call</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <div className="mt-2 text-center text-[11px] text-neutral-400 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Strict confidentiality guaranteed · No obligations or aggressive pitch</span>
                </div>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation Receipt State */
          <div className="py-4 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <h3 className="mt-4 text-2xl font-bold font-display text-white">
              Strategy Session Confirmed!
            </h3>
            <p className="mt-2 text-sm text-neutral-300 max-w-md mx-auto">
              Salamat, <span className="text-white font-semibold">{formData.ownerName}</span>! We have reserved your discovery session for <span className="text-amber-400 font-medium">{formData.businessName}</span>.
            </p>

            {/* Appointment Details Box */}
            <div className="mt-6 rounded-xl border border-white/10 bg-[#0c0d10] p-5 text-left text-xs space-y-2 max-w-md mx-auto">
              <div className="flex justify-between text-neutral-300">
                <span className="text-neutral-400">Date & Time:</span>
                <span className="font-semibold text-white">{formData.date} at {formData.timeSlot}</span>
              </div>
              <div className="flex justify-between text-neutral-300">
                <span className="text-neutral-400">Location / Format:</span>
                <span className="font-semibold text-amber-300">
                  {formData.meetingPreference === 'in-person'
                    ? 'In-Person (Ormoc Centro)'
                    : 'Google Meet / Call'}
                </span>
              </div>
              <div className="flex justify-between text-neutral-300">
                <span className="text-neutral-400">Area:</span>
                <span className="text-neutral-200">{formData.barangay}, Ormoc City</span>
              </div>
              <div className="flex justify-between text-neutral-300">
                <span className="text-neutral-400">Confirmation Sent To:</span>
                <span className="text-neutral-200">{formData.email}</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={downloadCalendarEvent}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-semibold text-white hover:bg-white/10 transition-colors"
              >
                <Download className="h-4 w-4 text-amber-400" />
                <span>Add to Calendar (.ICS)</span>
              </button>

              <a
                href={`viber://chat?number=%2B639178426774`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-purple-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-purple-500 transition-colors"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Chat Now on Viber</span>
              </a>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="text-xs text-neutral-400 hover:text-white underline underline-offset-4"
              >
                Done and return to website
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
