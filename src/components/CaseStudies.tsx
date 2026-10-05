import React, { useState } from 'react';
import { ArrowUpRight, MapPin, Quote, Building2, TrendingUp } from 'lucide-react';
import { CASE_STUDIES } from '../data/ormocData';

interface CaseStudiesProps {
  onOpenBooking: (prefill?: string) => void;
}

export const CaseStudies: React.FC<CaseStudiesProps> = ({ onOpenBooking }) => {
  const [selectedCaseIdx, setSelectedCaseIdx] = useState(0);
  const currentCase = CASE_STUDIES[selectedCaseIdx];

  return (
    <section id="case-studies" className="border-b border-white/10 bg-[#0c0d10] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-400 uppercase">
              <span>Proof of Impact</span>
              <span aria-hidden="true" className="text-white/30">·</span>
              <span>Documented Ormoc MSME Case Studies</span>
            </div>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white font-display sm:text-4xl [text-wrap:balance]">
              Real Revenue & Footfall in Ormoc City.
            </h2>
            <p className="mt-3 text-base text-neutral-400 leading-relaxed">
              No generic theory. Concrete outcomes delivered for local business owners right here in Leyte.
            </p>
          </div>

          {/* Interactive Case Switcher Tabs */}
          <div className="flex items-center gap-2 p-1.5 bg-white/5 rounded-xl border border-white/10 self-start sm:self-auto overflow-x-auto max-w-full">
            {CASE_STUDIES.map((cs, idx) => (
              <button
                key={cs.id}
                type="button"
                onClick={() => setSelectedCaseIdx(idx)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                  selectedCaseIdx === idx
                    ? 'bg-amber-400 text-neutral-950 shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {cs.businessName.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Case Study Card */}
        <div className="mt-12 rounded-2xl border border-white/10 bg-[#111317] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left: High-fidelity image showcase */}
            <div className="lg:col-span-6 relative min-h-[300px] lg:min-h-[460px] bg-neutral-900">
              <img
                src={currentCase.image}
                alt={currentCase.businessName}
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111317] via-transparent to-transparent lg:hidden" />
              
              {/* Unboxed location indicator on image */}
              <div className="absolute top-4 left-4 rounded-md bg-[#0c0d10]/80 backdrop-blur-sm border border-white/10 px-3 py-1.5 text-xs font-medium text-neutral-200 flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-amber-400" />
                <span>{currentCase.location}</span>
              </div>
            </div>

            {/* Right: Detailed Story & Numbers */}
            <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs text-neutral-400">
                  <Building2 className="h-3.5 w-3.5 text-amber-400" />
                  <span>{currentCase.industry}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-white font-medium">{currentCase.businessName}</span>
                </div>

                <h3 className="mt-3 text-2xl sm:text-3xl font-bold font-display text-white [text-wrap:balance]">
                  {currentCase.title}
                </h3>

                <div className="mt-6 space-y-4 text-sm leading-relaxed">
                  <div>
                    <span className="font-semibold text-neutral-200">The Problem: </span>
                    <span className="text-neutral-400">{currentCase.challenge}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-amber-300">The Bossing Solution: </span>
                    <span className="text-neutral-300">{currentCase.solution}</span>
                  </div>
                </div>

                {/* Hard Metrics Grid */}
                <div className="mt-8 grid grid-cols-3 gap-3 border-y border-white/10 py-5">
                  {currentCase.metrics.map((m, idx) => (
                    <div key={idx} className="text-center sm:text-left">
                      <div className="text-xl sm:text-2xl font-bold font-display text-white tabular-nums tracking-tight">
                        {m.value}
                      </div>
                      <div className="mt-1 text-xs text-neutral-400 font-medium leading-tight">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Attributable Quote */}
                <div className="mt-6 flex gap-3 text-neutral-300">
                  <Quote className="h-5 w-5 text-amber-400/60 shrink-0" />
                  <div>
                    <p className="text-xs sm:text-sm italic text-neutral-300">
                      "{currentCase.quote.text}"
                    </p>
                    <div className="mt-2 text-xs font-semibold text-white">
                      {currentCase.quote.author}
                      <span className="font-normal text-neutral-400"> · {currentCase.quote.role}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Action */}
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-neutral-400 hidden sm:inline">
                  Want similar metrics for your Ormoc business?
                </span>
                <button
                  type="button"
                  onClick={() => onOpenBooking(`Interested in results like ${currentCase.businessName}`)}
                  className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
                >
                  <span>Request Similar Case Strategy</span>
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Grid of all 3 highlights for comparison */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {CASE_STUDIES.map((cs, idx) => (
            <button
              key={cs.id}
              type="button"
              onClick={() => setSelectedCaseIdx(idx)}
              className={`p-4 rounded-xl border text-left transition-all ${
                selectedCaseIdx === idx
                  ? 'border-amber-400/60 bg-white/5'
                  : 'border-white/5 bg-white/[0.02] hover:bg-white/5 hover:border-white/10'
              }`}
            >
              <div className="text-xs text-neutral-400 font-medium">{cs.industry}</div>
              <div className="mt-1 text-sm font-bold text-white font-display flex items-center justify-between">
                <span>{cs.businessName}</span>
                <TrendingUp className="h-3.5 w-3.5 text-amber-400" />
              </div>
              <div className="mt-2 text-xs text-amber-300 font-mono">
                {cs.metrics[0].value} {cs.metrics[0].label}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
