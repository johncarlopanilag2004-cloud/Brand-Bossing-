import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesBento } from './components/ServicesBento';
import { CaseStudies } from './components/CaseStudies';
import { PackageBuilder } from './components/PackageBuilder';
import { AuditTool } from './components/AuditTool';
import { OrmocAdvantage } from './components/OrmocAdvantage';
import { Testimonials } from './components/Testimonials';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { ExecutiveAnalyticsModal } from './components/ExecutiveAnalyticsModal';

export default function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [prefillNotes, setPrefillNotes] = useState<string>('');

  useEffect(() => {
    // Check for #admin hash or ?admin=true query
    const checkAdminRoute = () => {
      if (
        window.location.hash.toLowerCase() === '#admin' ||
        window.location.search.toLowerCase().includes('admin=true')
      ) {
        setAdminModalOpen(true);
      }
    };
    checkAdminRoute();
    window.addEventListener('hashchange', checkAdminRoute);

    // Executive keyboard shortcut: Ctrl+Shift+A or Cmd+Shift+A
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setAdminModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', checkAdminRoute);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleOpenBooking = (notes?: string) => {
    if (notes) {
      setPrefillNotes(notes);
    } else {
      setPrefillNotes('');
    }
    setBookingModalOpen(true);
  };

  const handleSelectService = (serviceTitle: string) => {
    handleOpenBooking(`Inquiry regarding service module: ${serviceTitle}`);
  };

  const handleSelectPackage = (packageName: string, details?: string) => {
    handleOpenBooking(details || `Interested in ${packageName}`);
  };

  const handleCompleteAudit = (score: number, report: string) => {
    handleOpenBooking(`Audit Completed! ${report}`);
  };

  return (
    <div className="min-h-screen bg-[#0c0d10] text-[#f2f3f5] font-body selection:bg-amber-400 selection:text-black">
      {/* Top Navigation Bar */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      <main>
        {/* Hero Section */}
        <Hero onOpenBooking={() => handleOpenBooking()} />

        {/* About Us & Our Ormoc Story */}
        <AboutSection />

        {/* Core Capabilities & Marketing Services */}
        <ServicesBento onSelectService={handleSelectService} />

        {/* Documented Local Case Studies */}
        <CaseStudies onOpenBooking={handleOpenBooking} />

        {/* Transparent Packages & Custom Quote Builder */}
        <PackageBuilder onSelectPackage={handleSelectPackage} />

        {/* Free Ormoc MSME Market Readiness Audit */}
        <AuditTool onCompleteAudit={handleCompleteAudit} />

        {/* Local Ormoc Market Intelligence & FAQs */}
        <OrmocAdvantage />

        {/* Attributable Client Testimonials */}
        <Testimonials />

        {/* In-Page Contact & Inquiries Section */}
        <ContactSection />
      </main>

      {/* Website Footer with discreet Admin Portal trigger */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onOpenAdmin={() => setAdminModalOpen(true)}
      />

      {/* Consultation Booking & Strategy Intake Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        prefillNotes={prefillNotes}
      />

      {/* Executive Analytics & Inquiries Portal (Password: 4bossing) */}
      <ExecutiveAnalyticsModal
        isOpen={adminModalOpen}
        onClose={() => {
          setAdminModalOpen(false);
          if (window.location.hash.toLowerCase() === '#admin') {
            window.history.replaceState(null, '', window.location.pathname + window.location.search);
          }
        }}
      />
    </div>
  );
}

