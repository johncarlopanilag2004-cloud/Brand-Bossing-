import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: (prefill?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#0c0d10]/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#top" 
          className="text-xl font-extrabold tracking-tight text-white font-display transition-opacity hover:opacity-90"
        >
          Brand<span className="text-amber-400">|</span>Bossing
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden items-center gap-7 md:flex">
          <a
            href="#services"
            className="text-sm font-medium text-neutral-300 transition-colors hover:text-white"
          >
            Services
          </a>
          <a
            href="#about"
            className="text-sm font-medium text-neutral-300 transition-colors hover:text-white"
          >
            About Us
          </a>
          <a
            href="#case-studies"
            className="text-sm font-medium text-neutral-300 transition-colors hover:text-white"
          >
            Case Studies
          </a>
          <a
            href="#pricing"
            className="text-sm font-medium text-neutral-300 transition-colors hover:text-white"
          >
            Packages & Pricing
          </a>
          <a
            href="#audit"
            className="text-sm font-medium text-neutral-300 transition-colors hover:text-white"
          >
            Ormoc Audit
          </a>
          <a
            href="#contact"
            className="text-sm font-medium text-neutral-300 transition-colors hover:text-white"
          >
            Contact
          </a>
        </nav>

        {/* Zone 3: Primary action button */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onOpenBooking()}
            className="hidden items-center gap-2 rounded-lg bg-amber-400 px-4 py-2.5 text-xs font-bold text-neutral-950 transition-all hover:bg-amber-300 active:scale-98 sm:inline-flex whitespace-nowrap"
          >
            <span>Book Discovery Call</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="inline-flex items-center justify-center rounded-lg border border-white/10 p-2 text-neutral-400 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 md:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-white/10 bg-[#0e1014] px-6 py-6 md:hidden">
          <nav className="flex flex-col space-y-4">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-neutral-200 transition-colors hover:text-amber-400"
            >
              Services
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-neutral-200 transition-colors hover:text-amber-400"
            >
              About Us
            </a>
            <a
              href="#case-studies"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-neutral-200 transition-colors hover:text-amber-400"
            >
              Case Studies
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-neutral-200 transition-colors hover:text-amber-400"
            >
              Packages & Pricing
            </a>
            <a
              href="#audit"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-neutral-200 transition-colors hover:text-amber-400"
            >
              Ormoc Business Audit
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-neutral-200 transition-colors hover:text-amber-400"
            >
              Contact Us
            </a>

            <div className="pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-amber-400 py-3 text-sm font-bold text-neutral-950 hover:bg-amber-300"
              >
                <span>Book Discovery Call</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
