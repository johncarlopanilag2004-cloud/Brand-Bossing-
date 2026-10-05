import React, { useState } from 'react';
import { Check, ArrowRight, Calculator, Sparkles, ShieldCheck } from 'lucide-react';
import { PACKAGE_TIERS, BUSINESS_TYPES } from '../data/ormocData';

interface PackageBuilderProps {
  onSelectPackage: (packageName: string, details?: string) => void;
}

interface CustomModule {
  id: string;
  name: string;
  price: number;
  reachBonus: number;
  description: string;
}

const CUSTOM_MODULES: CustomModule[] = [
  {
    id: 'gmaps',
    name: 'Google Maps Ormoc 3-Pack Dominance',
    price: 6500,
    reachBonus: 12000,
    description: 'Optimization, review funnels, local citations & geo-tagged photos.',
  },
  {
    id: 'meta_ads',
    name: 'Targeted Ormoc Meta & Messenger Ads',
    price: 8500,
    reachBonus: 28000,
    description: 'Hyper-local ad campaigns, copy in Bisaya/English & automated chatbot.',
  },
  {
    id: 'tiktok_reels',
    name: 'On-Location 4K TikTok & Reels Shoot',
    price: 9500,
    reachBonus: 22000,
    description: '4 edited vertical videos shot at your Ormoc establishment.',
  },
  {
    id: 'brand_packaging',
    name: 'Brand Identity or Packaging Redesign',
    price: 12000,
    reachBonus: 8000,
    description: 'Logo revamp, storefront signage blueprints & shelf-ready labels.',
  },
  {
    id: 'web_ordering',
    name: '1-Page Fast Mobile Ordering Website',
    price: 9000,
    reachBonus: 15000,
    description: 'Lightning-fast mobile page with GCash payment & WhatsApp inquiry flow.',
  },
];

export const PackageBuilder: React.FC<PackageBuilderProps> = ({ onSelectPackage }) => {
  const [mode, setMode] = useState<'tiers' | 'custom'>('tiers');
  const [selectedIndustry, setSelectedIndustry] = useState(BUSINESS_TYPES[0]);
  const [selectedModules, setSelectedModules] = useState<string[]>(['gmaps', 'meta_ads']);

  const toggleModule = (id: string) => {
    setSelectedModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const customTotal = selectedModules.reduce((sum, id) => {
    const found = CUSTOM_MODULES.find((m) => m.id === id);
    return sum + (found ? found.price : 0);
  }, 0);

  const customReach = selectedModules.reduce((sum, id) => {
    const found = CUSTOM_MODULES.find((m) => m.id === id);
    return sum + (found ? found.reachBonus : 0);
  }, 10000);

  return (
    <section id="pricing" className="border-b border-white/10 bg-[#0e1014] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-400 uppercase">
              <span>Transparent Ormoc Pricing</span>
              <span aria-hidden="true" className="text-white/30">·</span>
              <span>No Hidden Retainers</span>
            </div>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white font-display sm:text-4xl [text-wrap:balance]">
              Investment Plans Tailored for Leyte MSMEs.
            </h2>
            <p className="mt-3 text-base text-neutral-400 leading-relaxed">
              Choose an all-in-one proven monthly retainer or customize individual marketing deliverables for your exact growth stage.
            </p>
          </div>

          {/* Interactive Mode Switcher */}
          <div className="flex items-center gap-1 p-1 bg-white/5 rounded-xl border border-white/10 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setMode('tiers')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                mode === 'tiers'
                  ? 'bg-amber-400 text-neutral-950 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Curated Retainers
            </button>
            <button
              type="button"
              onClick={() => setMode('custom')}
              className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                mode === 'custom'
                  ? 'bg-amber-400 text-neutral-950 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Calculator className="h-3.5 w-3.5" />
              <span>Custom Builder</span>
            </button>
          </div>
        </div>

        {/* MODE 1: Curated Tiers */}
        {mode === 'tiers' ? (
          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {PACKAGE_TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`relative rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all ${
                  tier.isPopular
                    ? 'border-2 border-amber-400 bg-[#141720] shadow-xl shadow-amber-400/5'
                    : 'border border-white/10 bg-[#111317]'
                }`}
              >
                <div>
                  {/* Top unboxed kicker */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
                      {tier.badge}
                    </span>
                    <span className="text-xs text-neutral-400">{tier.turnaround}</span>
                  </div>

                  <h3 className="mt-3 text-2xl font-bold font-display text-white">
                    {tier.name}
                  </h3>
                  <p className="mt-2 text-xs text-neutral-400 min-h-[32px]">
                    {tier.ideal}
                  </p>

                  {/* Price display with tabular nums */}
                  <div className="mt-6 border-y border-white/10 py-4">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-extrabold font-display text-white tabular-nums">
                        ₱{tier.monthlyPrice.toLocaleString()}
                      </span>
                      <span className="text-xs text-neutral-400">/month</span>
                    </div>
                    <div className="mt-1 text-xs text-neutral-400">
                      + ₱{tier.setupFee.toLocaleString()} one-time setup & onboarding
                    </div>
                  </div>

                  {/* Key reach metric */}
                  <div className="mt-4 p-2.5 rounded-lg bg-white/5 border border-white/5 text-xs text-neutral-200 flex items-center justify-between">
                    <span className="text-neutral-400">Est. Monthly Reach:</span>
                    <span className="font-semibold text-amber-300 font-mono">{tier.expectedReach}</span>
                  </div>

                  {/* Feature checklist */}
                  <div className="mt-6 space-y-2.5">
                    <div className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                      Included Deliverables:
                    </div>
                    {tier.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                        <Check className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() =>
                      onSelectPackage(
                        tier.name,
                        `Package: ${tier.name} (₱${tier.monthlyPrice.toLocaleString()}/mo)`
                      )
                    }
                    className={`w-full inline-flex items-center justify-center gap-2 rounded-lg py-3 text-xs font-bold transition-all ${
                      tier.isPopular
                        ? 'bg-amber-400 text-neutral-950 hover:bg-amber-300 shadow-md shadow-amber-400/20'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    <span>Lock In {tier.name}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* MODE 2: Custom Package & ROI Builder */
          <div className="mt-12 rounded-2xl border border-white/10 bg-[#111317] p-6 sm:p-10">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
              {/* Left Column: Selectors */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-2">
                    Step 1: Your Business Category in Ormoc
                  </label>
                  <select
                    value={selectedIndustry}
                    onChange={(e) => setSelectedIndustry(e.target.value)}
                    className="w-full rounded-lg border border-white/15 bg-[#0c0d10] px-3.5 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
                  >
                    {BUSINESS_TYPES.map((bType) => (
                      <option key={bType} value={bType} className="bg-[#0c0d10] text-white">
                        {bType}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-3">
                    Step 2: Pick Your Target Marketing Modules
                  </label>
                  <div className="space-y-3">
                    {CUSTOM_MODULES.map((mod) => {
                      const isChecked = selectedModules.includes(mod.id);
                      return (
                        <div
                          key={mod.id}
                          onClick={() => toggleModule(mod.id)}
                          className={`p-4 rounded-xl border cursor-pointer transition-all ${
                            isChecked
                              ? 'border-amber-400 bg-amber-400/5'
                              : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => {}} // handled by parent div
                                className="mt-1 h-4 w-4 rounded border-white/20 text-amber-400 focus:ring-0"
                              />
                              <div>
                                <div className="text-sm font-bold text-white">
                                  {mod.name}
                                </div>
                                <div className="mt-0.5 text-xs text-neutral-400">
                                  {mod.description}
                                </div>
                              </div>
                            </div>
                            <div className="text-right shrink-0 ml-3">
                              <span className="text-sm font-bold text-amber-300 font-mono">
                                ₱{mod.price.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Column: Live Estimate & Summary */}
              <div className="lg:col-span-5 flex flex-col justify-between rounded-xl border border-white/10 bg-[#0c0d10] p-6 sm:p-8">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                    <Sparkles className="h-4 w-4" />
                    <span>Your Custom Ormoc Blueprint</span>
                  </div>

                  <div className="mt-4 pb-4 border-b border-white/10">
                    <div className="text-xs text-neutral-400">Selected Sector:</div>
                    <div className="text-sm font-semibold text-white mt-0.5">{selectedIndustry}</div>
                  </div>

                  {/* Summary list */}
                  <div className="mt-4 space-y-2">
                    <div className="text-xs text-neutral-400">Chosen Modules ({selectedModules.length}):</div>
                    {selectedModules.length === 0 ? (
                      <div className="text-xs text-neutral-500 italic">Select at least one module on the left.</div>
                    ) : (
                      selectedModules.map((id) => {
                        const m = CUSTOM_MODULES.find((item) => item.id === id);
                        return (
                          <div key={id} className="flex justify-between text-xs text-neutral-300">
                            <span>• {m?.name}</span>
                            <span className="font-mono text-neutral-400">₱{m?.price.toLocaleString()}</span>
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Metrics preview */}
                  <div className="mt-6 space-y-3 border-t border-white/10 pt-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-400">Est. Monthly Reach:</span>
                      <span className="font-bold text-amber-300 font-mono tabular-nums">
                        {customReach.toLocaleString()} Ormocanons
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-400">Campaign Go-Live:</span>
                      <span className="font-semibold text-white">Within 10–14 Days</span>
                    </div>
                  </div>

                  {/* Total price calculation */}
                  <div className="mt-6 border-t border-white/10 pt-4">
                    <div className="text-xs text-neutral-400">Estimated Monthly Retainer:</div>
                    <div className="mt-1 text-3xl font-extrabold text-white font-display tabular-nums">
                      ₱{customTotal.toLocaleString()}
                    </div>
                    <div className="mt-1 text-[11px] text-neutral-500">
                      Flexible month-to-month agreement · Cancel anytime with 14-day notice
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4">
                  <button
                    type="button"
                    disabled={selectedModules.length === 0}
                    onClick={() =>
                      onSelectPackage(
                        `Custom Blueprint (${selectedIndustry})`,
                        `Industry: ${selectedIndustry} | Selected Modules: ${selectedModules.join(', ')} | Est: ₱${customTotal.toLocaleString()}/mo`
                      )
                    }
                    className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-amber-400 py-3.5 text-xs font-bold text-neutral-950 hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <span>Discuss This Blueprint</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <div className="mt-2 text-center flex items-center justify-center gap-1.5 text-[11px] text-neutral-400">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Free 30-min strategy review included</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
