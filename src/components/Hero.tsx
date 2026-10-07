import React from 'react';
import { ArrowRight, CheckCircle2, MapPin, Sparkles, TrendingUp, Zap } from 'lucide-react';
import { HERO_IMAGE, AGENCY_STATS } from '../data/ormocData';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  return (
    <section id="top" className="relative min-h-[92vh] overflow-hidden border-b border-white/10 bg-[#0c0d10]">
      {/* Background Hero Asset with measured scrim for WCAG AA legibility */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="Brand|Bossing creative marketing agency office overlooking Ormoc City"
          className="h-full w-full object-cover object-center filter brightness-60"
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d10] via-[#0c0d10]/80 to-[#0c0d10]/40" />
        <div className="absolute inset-0 bg-radial from-amber-500/5 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-16 pb-20 lg:px-8 lg:pt-20 lg:pb-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7">
            {/* Quiet regional trust marker (unboxed text with separators, no pills) */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-400 uppercase">
              <MapPin className="h-3.5 w-3.5 text-amber-400" />
              <span>Ormoc City, Eastern Visayas</span>
              <span aria-hidden="true" className="text-white/30">·</span>
              <span>Micro, Small & Medium Enterprise Growth</span>
            </div>

            {/* Main Headline */}
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white font-display sm:text-5xl lg:text-6xl [text-wrap:balance] leading-[1.1]">
              Turn Your Ormoc Business into the <span className="text-amber-400 underline decoration-amber-400/40 decoration-4 underline-offset-8">Bossing</span> of Your Market.
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-base sm:text-lg text-neutral-300 leading-relaxed font-body">
              Stop losing customers to national franchises or relying only on chance foot traffic. We engineer hyper-local Facebook & Instagram campaigns and shelf-ready branding tailored for Ormocanons.
            </p>

            {/* Key Value Deliverables checklist */}
            <div className="mt-8 grid grid-cols-1 gap-2.5 sm:grid-cols-2 text-sm text-neutral-300 font-medium">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                <span>Rank in the top 3 on Ormoc Google Maps</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                <span>Target paying customers in Ormoc & Leyte</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                <span>Cinematic on-site 4K TikTok & FB Reels</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                <span>Automated 24/7 Messenger order intake</span>
              </div>
            </div>

            {/* CTA Cluster */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-amber-400 px-6 py-3.5 text-sm font-bold text-neutral-950 shadow-lg shadow-amber-400/20 transition-all hover:bg-amber-300 hover:shadow-amber-400/30 active:scale-98"
              >
                <span>Schedule Free Strategy Call</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <a
                href="#audit"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/30"
              >
                <Sparkles className="h-4 w-4 text-amber-400" />
                <span>Take Free 5-Min Ormoc Audit</span>
              </a>
            </div>
          </div>

          {/* Right Column: Visible Photo Showcase Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl border border-white/15 bg-[#121419] p-3 shadow-2xl overflow-hidden">
              <div className="relative h-64 sm:h-80 w-full overflow-hidden rounded-xl">
                <img
                  src={HERO_IMAGE}
                  alt="Brand Bossing agency team and client growth in Ormoc"
                  className="h-full w-full object-cover object-center"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                
                {/* Location Badge on Photo */}
                <div className="absolute top-3 left-3 rounded-lg bg-black/70 backdrop-blur-md border border-white/15 px-3 py-1 text-xs font-semibold text-white flex items-center gap-1.5">
                  <MapPin className="h-3 w-3 text-amber-400" />
                  <span>Ormoc Centro, Leyte</span>
                </div>

                {/* Performance Badge on Photo */}
                <div className="absolute bottom-3 left-3 right-3 rounded-lg bg-black/80 backdrop-blur-md border border-amber-400/30 p-3 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-white">Brand|Bossing Agency</div>
                    <div className="text-[11px] text-amber-400">45+ MSMEs Scaled in Region 8</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-extrabold text-amber-400 font-mono">3.9x ROAS</div>
                    <div className="text-[10px] text-neutral-400">Average Return</div>
                  </div>
                </div>
              </div>

              {/* Photo Caption Strip */}
              <div className="mt-3 px-2 py-1 flex items-center justify-between text-xs text-neutral-400">
                <span>📍 Real Street, Ormoc City</span>
                <span className="text-neutral-300">Local Marketing & Growth</span>
              </div>
            </div>
          </div>
        </div>

        {/* Claim-to-Proof Adjacency: Quantitative Stats Bar */}
        <div className="mt-16 sm:mt-24 border-t border-white/10 pt-10">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
            <TrendingUp className="h-4 w-4 text-amber-400" />
            <span>Real outcomes delivered for businesses across Ormoc & Leyte:</span>
          </p>
          <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4 lg:gap-8">
            {AGENCY_STATS.map((stat, idx) => (
              <div key={idx} className="border-l border-white/15 pl-4 sm:pl-6">
                <div className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display tabular-nums">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm font-semibold text-neutral-200">
                  {stat.label}
                </div>
                <div className="mt-0.5 text-xs text-neutral-400">
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
