import React, { useState } from 'react';
import { ArrowRight, Check, ChevronRight, Layers, Sparkles } from 'lucide-react';
import { CORE_SERVICES } from '../data/ormocData';
import { ServiceItem } from '../types';

interface ServicesBentoProps {
  onSelectService: (serviceTitle: string) => void;
}

export const ServicesBento: React.FC<ServicesBentoProps> = ({ onSelectService }) => {
  const [activeTab, setActiveTab] = useState<string>(CORE_SERVICES[0].id);

  const activeService = CORE_SERVICES.find((s) => s.id === activeTab) || CORE_SERVICES[0];

  return (
    <section id="services" className="border-b border-white/10 bg-[#0e1014] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-400 uppercase">
            <Layers className="h-3.5 w-3.5 text-amber-400" />
            <span>Capabilities & Deliverables</span>
            <span aria-hidden="true" className="text-white/30">·</span>
            <span>Ormoc City MSME Toolkit</span>
          </div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white font-display sm:text-4xl [text-wrap:balance]">
            Marketing Built for the Local Ormoc Ecosystem.
          </h2>
          <p className="mt-4 text-base text-neutral-400 leading-relaxed">
            Generic Manila or Western marketing blueprints fail in Leyte. We build solutions around how Ormocanons discover, chat, recommend, and buy.
          </p>
        </div>

        {/* Interactive Segmented Selector for Services */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left: Service List navigation */}
          <div className="lg:col-span-5 space-y-3">
            {CORE_SERVICES.map((service) => {
              const isSelected = service.id === activeTab;
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setActiveTab(service.id)}
                  className={`w-full text-left p-5 rounded-xl border transition-all ${
                    isSelected
                      ? 'border-amber-400/80 bg-amber-400/5 shadow-md shadow-amber-400/5'
                      : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-semibold">
                        <span className={isSelected ? 'text-amber-400 font-mono' : 'text-neutral-500 font-mono'}>
                          {service.number}.
                        </span>
                        <span className="text-neutral-400 font-medium">{service.idealFor.split(',')[0]}</span>
                      </div>
                      <h3 className={`mt-1.5 text-base font-bold font-display ${isSelected ? 'text-white' : 'text-neutral-300'}`}>
                        {service.title}
                      </h3>
                      <p className="mt-1 text-xs text-neutral-400 line-clamp-2">
                        {service.tagline}
                      </p>
                    </div>
                    <ChevronRight
                      className={`h-5 w-5 shrink-0 mt-1 transition-transform ${
                        isSelected ? 'text-amber-400 translate-x-1' : 'text-neutral-600'
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Active Service Deep Dive Card */}
          <div className="lg:col-span-7">
            <div className="h-full rounded-2xl border border-white/10 bg-[#12141a] p-6 sm:p-8 flex flex-col justify-between">
              <div>
                {/* Header of Active Service */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="text-xs font-mono text-amber-400 uppercase tracking-wider">
                    Service Module {activeService.number}
                  </div>
                  <div className="text-xs text-neutral-400">
                    Ideal for: {activeService.idealFor}
                  </div>
                </div>

                <h3 className="mt-4 text-2xl sm:text-3xl font-bold font-display text-white">
                  {activeService.title}
                </h3>
                <p className="mt-2 text-sm sm:text-base text-amber-300/90 font-medium">
                  {activeService.tagline}
                </p>
                <p className="mt-4 text-sm text-neutral-300 leading-relaxed">
                  {activeService.description}
                </p>

                {/* Measurable Outcomes Grid */}
                <div className="mt-6 border-t border-white/10 pt-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                    Target Outcomes for Your Business
                  </h4>
                  <ul className="mt-3 space-y-2.5">
                    {activeService.outcomes.map((outcome, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-200">
                        <Check className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Specific Deliverables Included */}
                <div className="mt-6 border-t border-white/10 pt-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                    What We Deliver Each Month
                  </h4>
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300">
                    {activeService.deliverables.map((deliv, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/5">
                        <Layers className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                        <span>{deliv}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-neutral-400">
                  Ready to add this to your Ormoc business strategy?
                </span>
                <button
                  type="button"
                  onClick={() => onSelectService(activeService.title)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-amber-400 px-5 py-2.5 text-xs font-bold text-neutral-950 hover:bg-amber-300 transition-colors"
                >
                  <span>Select & Build Custom Quote</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
