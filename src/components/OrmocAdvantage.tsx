import React, { useState } from 'react';
import { ChevronDown, MapPin, Compass, Users, Calendar, ShoppingBag } from 'lucide-react';
import { ORMOC_LOCAL_INSIGHTS } from '../data/ormocData';

const FAQS = [
  {
    q: 'Do you work with businesses outside Ormoc Centro (e.g. Kananga, Albuera, Merida)?',
    a: 'Yes! While our primary office is in Ormoc City, we actively service businesses across the Greater Ormoc economic corridor including Kananga, Albuera, Merida, Matag-ob, and Isabel. Many of these areas draw foot-traffic and commercial trade directly into Ormoc.',
  },
  {
    q: 'How fast can our business start showing up on Google Maps in Ormoc?',
    a: 'For new profiles, verification typically completes within 5 to 7 business days. Our optimization, citation building, and initial review push generally start showing noticeable ranking gains in the Ormoc 3-pack within 14 to 21 days.',
  },
  {
    q: 'Does your team actually visit our physical shop to shoot photos and video?',
    a: 'Absolutely. We do not use stock footage or generic templates. For packages with video production, our videographer visits your establishment in Ormoc with 4K equipment to capture your actual food, products, team, and storefront.',
  },
  {
    q: 'What payment methods do you accept for monthly agency retainers?',
    a: 'We accept BDO / BPI bank transfers, GCash, Maya, and corporate post-dated checks (PDC). Invoices and official receipts (OR) are provided for all monthly engagements.',
  },
  {
    q: 'Are we locked into a long-term multi-year contract?',
    a: 'No. All our retainers operate on flexible month-to-month agreements. We ask for a 14-day written notice if you ever need to pause or pivot. We believe in earning your partnership every single month through measurable business results.',
  },
];

export const OrmocAdvantage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const getInsightIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Compass className="h-4 w-4 text-amber-400" />;
      case 1:
        return <Calendar className="h-4 w-4 text-amber-400" />;
      case 2:
        return <MapPin className="h-4 w-4 text-amber-400" />;
      default:
        return <Users className="h-4 w-4 text-amber-400" />;
    }
  };

  return (
    <section id="insights" className="border-b border-white/10 bg-[#0e1014] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-400 uppercase">
            <span>Local Market Intelligence</span>
            <span aria-hidden="true" className="text-white/30">·</span>
            <span>Ormoc City Dynamics</span>
          </div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white font-display sm:text-4xl [text-wrap:balance]">
            Why Generic Manila Agencies Don’t Understand Ormoc.
          </h2>
          <p className="mt-3 text-base text-neutral-400 leading-relaxed">
            Ormoc is unique: a strategic seaport gateway, home to the Queen Pineapple, with close-knit community trust networks. Here is how we calibrate our campaigns for local impact.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ORMOC_LOCAL_INSIGHTS.map((insight, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-white/10 bg-[#121419] p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2">
                  {getInsightIcon(idx)}
                  <h3 className="text-sm font-bold text-white font-display">
                    {insight.title}
                  </h3>
                </div>
                <p className="mt-3 text-xs text-neutral-400 leading-relaxed">
                  {insight.summary}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-amber-400/80">
                Pillar 0{idx + 1}
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 border-t border-white/10 pt-16">
          <div className="max-w-2xl">
            <h3 className="text-2xl font-bold font-display text-white">
              Frequently Asked Questions by Ormoc Business Owners
            </h3>
            <p className="mt-2 text-sm text-neutral-400">
              Clear answers before you schedule your discovery call.
            </p>
          </div>

          <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="py-5">
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="flex w-full items-center justify-between text-left text-sm font-semibold text-white hover:text-amber-400 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-neutral-400 transition-transform ${
                        isOpen ? 'rotate-180 text-amber-400' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="mt-3 text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-3xl">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
