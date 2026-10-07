import React from 'react';
import { Check, ArrowRight, ShieldCheck, Zap, HelpCircle, CheckCircle2 } from 'lucide-react';
import { PACKAGE_TIERS } from '../data/ormocData';

interface PackageBuilderProps {
  onSelectPackage: (packageName: string, details?: string) => void;
}

export const PackageBuilder: React.FC<PackageBuilderProps> = ({ onSelectPackage }) => {
  const plan = PACKAGE_TIERS[0];

  return (
    <section id="pricing" className="border-b border-white/10 bg-[#0e1014] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-400 uppercase">
            <Zap className="h-3.5 w-3.5 text-amber-400" />
            <span>Ormoc MSME Exclusive Rate</span>
            <span aria-hidden="true" className="text-white/30">·</span>
            <span>Transparent Pricing</span>
          </div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white font-display sm:text-4xl [text-wrap:balance]">
            One Simple, Honest Plan Built for Ormoc MSMEs.
          </h2>
          <p className="mt-3 text-base text-neutral-400 leading-relaxed">
            No expensive corporate packages or confusing retainers. For just <span className="text-amber-400 font-bold">₱2,500 a month</span>, your business gets Google Maps local dominance, hyper-targeted social ads, and automated customer responses.
          </p>
        </div>

        {/* The Single ₱2,500/mo MSME Spotlight Card */}
        <div className="mt-12 max-w-4xl rounded-3xl border-2 border-amber-400/50 bg-[#141720] p-8 sm:p-12 shadow-2xl shadow-amber-400/10 relative overflow-hidden">
          {/* Subtle ambient gold glow */}
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />

          <div className="relative z-10">
            {/* Top Row: Plan Name, Badge & Big Price */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 pb-8 border-b border-white/10">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-amber-400/10 border border-amber-400/30 px-3 py-1 text-xs font-bold text-amber-400 uppercase tracking-wide">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Only ₱2,500 / Month · Exclusive MSME Offer</span>
                </div>
                <h3 className="mt-3 text-2xl sm:text-3xl font-extrabold font-display text-white">
                  {plan.name}
                </h3>
                <p className="mt-2 text-sm text-neutral-300 max-w-xl leading-relaxed">
                  {plan.ideal}
                </p>
              </div>

              {/* Price Tag */}
              <div className="sm:text-right shrink-0 bg-white/5 p-4 sm:p-5 rounded-2xl border border-white/10">
                <div className="flex items-baseline gap-1 sm:justify-end">
                  <span className="text-4xl sm:text-5xl font-black font-display text-amber-400">
                    ₱2,500
                  </span>
                  <span className="text-sm font-semibold text-neutral-400">/ month</span>
                </div>
                <div className="mt-1 text-xs font-medium text-emerald-400 flex items-center sm:justify-end gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  <span>₱0 Setup Fee · Cancel Anytime</span>
                </div>
              </div>
            </div>

            {/* Middle Section: Complete Deliverables Grid */}
            <div className="py-8 border-b border-white/10">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Everything Included in Your ₱2,500 Monthly Retainer:
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {plan.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-colors hover:border-amber-400/30"
                  >
                    <div className="mt-0.5 rounded-full bg-amber-400/20 p-1 text-amber-400 shrink-0">
                      <Check className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-neutral-200 leading-snug">
                        {feature}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Row: CTA & Fast Guarantees */}
            <div className="pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div>
                <div className="text-xs text-neutral-400">
                  <span className="font-semibold text-white">Expected Local Reach:</span> {plan.expectedReach}
                </div>
                <div className="text-xs text-neutral-400 mt-1">
                  <span className="font-semibold text-white">Turnaround Window:</span> {plan.turnaround}
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  onSelectPackage(
                    'Ormoc MSME Growth Plan (₱2,500/mo)',
                    'Includes Google Maps ranking, Meta ad campaigns, automated Messenger intake, and monthly growth advisory.'
                  )
                }
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-8 py-4 text-sm font-bold text-neutral-950 hover:bg-amber-300 transition-all shadow-lg shadow-amber-400/20 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Claim Your ₱2,500 Plan</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {/* Payment & Terms Note */}
            <div className="mt-8 pt-6 border-t border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left text-xs text-neutral-400">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                <span>No Lock-In (Month-to-Month)</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                <span>Official Receipts (OR) Provided</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                <span>GCash, Maya, BDO & BPI Accepted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
