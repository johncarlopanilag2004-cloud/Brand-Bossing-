import React from 'react';
import { MapPin, Phone, Mail, Clock, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-[#08090b] text-neutral-400">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-4">
            <a
              href="#top"
              className="text-2xl font-extrabold tracking-tight text-white font-display"
            >
              Brand<span className="text-amber-400">|</span>Bossing
            </a>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-sm">
              The premier digital growth, local SEO, and performance marketing agency purpose-built for micro, small, and medium businesses in Ormoc City, Leyte.
            </p>
            <div className="text-xs text-neutral-300">
              <span className="text-neutral-500">Executive Leadership:</span>{' '}
              <span className="font-semibold text-white">Mark G. Lonzaga</span> &{' '}
              <span className="font-semibold text-white">Alchie M. Ayod</span>{' '}
              <span className="text-amber-400 font-mono">(Co-CEOs)</span>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 rounded-lg bg-amber-400 px-4 py-2 text-xs font-bold text-neutral-950 hover:bg-amber-300 transition-colors"
              >
                <span>Book Strategy Call</span>
              </button>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              Navigation
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#services" className="hover:text-amber-400 transition-colors">
                  Our Services
                </a>
              </li>
              <li>
                <a href="#case-studies" className="hover:text-amber-400 transition-colors">
                  Case Studies
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-amber-400 transition-colors">
                  Packages & Pricing
                </a>
              </li>
              <li>
                <a href="#audit" className="hover:text-amber-400 transition-colors">
                  Free 5-Min Audit
                </a>
              </li>
              <li>
                <a href="#insights" className="hover:text-amber-400 transition-colors">
                  Local Market Insights
                </a>
              </li>
            </ul>
          </div>

          {/* Core Focus Categories in Ormoc */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              Sectors We Empower
            </div>
            <ul className="space-y-2 text-xs">
              <li>Local Cafes & Dining Spots</li>
              <li>Ormoc Pineapple & Pasalubong Brands</li>
              <li>Lake Danao & Ormoc Bay Tourism</li>
              <li>Medical & Wellness Practices</li>
              <li>Contractors & Retail Merchants</li>
            </ul>
          </div>

          {/* Ormoc Office Location & Contact */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              Ormoc City HQ
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Real Street, Ormoc Centro, 6541 Leyte, Philippines</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-amber-400 shrink-0" />
                <span>+63 (053) 561-8900 / +63 917 842 6774</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-amber-400 shrink-0" />
                <span>hello@brandbossing.ph</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-amber-400 shrink-0" />
                <span>Mon – Sat: 8:30 AM – 6:00 PM PHT</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom divider and copyright */}
        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <div>
            © {new Date().getFullYear()} Brand|Bossing Marketing Agency. All rights reserved. Registered in Ormoc City, Leyte.
          </div>
          <div className="flex items-center gap-4">
            <span>DTI & City LGU Compliant</span>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-neutral-400 hover:text-white transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
