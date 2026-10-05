import React, { useState } from 'react';
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

export default function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [prefillNotes, setPrefillNotes] = useState<string>('');

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

      {/* Website Footer */}
      <Footer onOpenBooking={() => handleOpenBooking()} />

      {/* Consultation Booking & Strategy Intake Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        prefillNotes={prefillNotes}
      />
    </div>
  );
}

