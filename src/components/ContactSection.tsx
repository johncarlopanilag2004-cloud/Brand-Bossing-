import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { ORMOC_BARANGAYS, BUSINESS_TYPES } from '../data/ormocData';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    barangay: ORMOC_BARANGAYS[0],
    businessType: BUSINESS_TYPES[0],
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.phone) {
      setSubmitted(true);
    }
  };

  return (
    <section id="contact" className="border-b border-white/10 bg-[#0c0d10] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-400 uppercase">
            <span>Contact Brand|Bossing</span>
            <span aria-hidden="true" className="text-white/30">·</span>
            <span>Ormoc City Office</span>
          </div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white font-display sm:text-4xl [text-wrap:balance]">
            Let’s Talk About Growing Your Ormoc Business.
          </h2>
          <p className="mt-3 text-base text-neutral-400 leading-relaxed">
            Have questions about our marketing services or want to visit us in Ormoc Centro? Send us a message or contact us directly.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left: Contact Information & Office Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-white/10 bg-[#121419] p-6 sm:p-8 space-y-6">
              <h3 className="text-lg font-bold font-display text-white">
                Ormoc City Office & Inquiries
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-amber-400 shrink-0">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Office Location</div>
                    <div className="text-neutral-400 mt-0.5">
                      Real Street, Ormoc Centro (Poblacion), 6541 Leyte, Philippines
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-amber-400 shrink-0">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Direct Phone & WhatsApp</div>
                    <div className="text-neutral-400 mt-0.5">+63 917 842 6774 / +63 (053) 561-8900</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-amber-400 shrink-0">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Email Address</div>
                    <div className="text-neutral-400 mt-0.5">hello@brandbossing.ph</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-amber-400 shrink-0">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Operating Hours</div>
                    <div className="text-neutral-400 mt-0.5">Monday to Saturday: 8:30 AM – 6:00 PM PHT</div>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="pt-4 border-t border-white/10">
                <a
                  href="https://wa.me/639178426774?text=Hi%20Brand%7CBossing!%20I%20am%20interested%20in%20marketing%20services%20for%20my%20Ormoc%20business."
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 py-3 text-xs font-bold text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Chat with Us Directly on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: In-Page Contact & Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-white/10 bg-[#121419] p-6 sm:p-8">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-xl font-bold font-display text-white">
                    Send Us an Inquiry
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Fill out the form below and one of our local Ormoc marketing directors will respond within 24 hours.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Juan dela Cruz"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="mt-1 w-full rounded-lg border border-white/10 bg-[#0c0d10] px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300">
                        Business / Store Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ormoc Heritage Cafe"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        className="mt-1 w-full rounded-lg border border-white/10 bg-[#0c0d10] px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="0917 123 4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="mt-1 w-full rounded-lg border border-white/10 bg-[#0c0d10] px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="juan@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="mt-1 w-full rounded-lg border border-white/10 bg-[#0c0d10] px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300">
                        Ormoc Barangay / Location
                      </label>
                      <select
                        value={formData.barangay}
                        onChange={(e) => setFormData({ ...formData, barangay: e.target.value })}
                        className="mt-1 w-full rounded-lg border border-white/10 bg-[#0c0d10] px-3.5 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
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
                        Industry / Category
                      </label>
                      <select
                        value={formData.businessType}
                        onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                        className="mt-1 w-full rounded-lg border border-white/10 bg-[#0c0d10] px-3.5 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
                      >
                        {BUSINESS_TYPES.map((bt) => (
                          <option key={bt} value={bt} className="bg-[#0c0d10] text-white">
                            {bt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300">
                      How Can We Help Your Business?
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tell us what marketing challenges you're facing or what goals you want to hit..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-white/10 bg-[#0c0d10] px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-amber-400 py-3.5 text-xs font-bold text-neutral-950 hover:bg-amber-300 transition-colors shadow-md shadow-amber-400/20"
                  >
                    <span>Submit Message to Brand|Bossing</span>
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </form>
              ) : (
                <div className="py-8 text-center space-y-4">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h4 className="text-xl font-bold font-display text-white">
                    Message Received, Daghang Salamat!
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto">
                    We have received your inquiry for <span className="text-amber-400 font-semibold">{formData.businessName}</span>. Our team in Ormoc Centro will contact you via phone ({formData.phone}) or email shortly.
                  </p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="text-xs text-neutral-400 hover:text-white underline underline-offset-4"
                    >
                      Send another message
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
