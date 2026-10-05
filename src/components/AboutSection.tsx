import React from 'react';
import { Target, HeartHandshake, Award, MapPin, Users, Sparkles } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="border-b border-white/10 bg-[#0e1014] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
          {/* Left: Agency Story & Mission */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-400 uppercase">
              <span>About Brand|Bossing</span>
              <span aria-hidden="true" className="text-white/30">·</span>
              <span>Our Story in Ormoc City</span>
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-white font-display sm:text-4xl [text-wrap:balance]">
              Built by Ormocanons, Exclusively for Ormoc MSMEs.
            </h2>

            <p className="text-base text-neutral-300 leading-relaxed font-body">
              Brand|Bossing was founded on a simple observation: <span className="text-white font-medium">small businesses in Ormoc City have world-class products</span>—from mouthwatering local delicacies and cozy cafes to dedicated trade services—yet they get overshadowed by national franchises because of marketing gaps.
            </p>

            <p className="text-sm text-neutral-400 leading-relaxed font-body">
              Outside agencies from Manila or Cebu don't understand how Ormocanos think, commute, or buy. They treat local businesses like generic numbers. We started Brand|Bossing to give home-grown Leyte entrepreneurs agency-level branding, Google Maps dominance, and short-form video production without the Manila corporate price tag.
            </p>

            {/* Core Values */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-neutral-200">
              <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                <div className="flex items-center gap-2 text-amber-400 font-bold font-display text-sm">
                  <Target className="h-4 w-4" />
                  <span>Real Revenue First</span>
                </div>
                <p className="mt-1 text-neutral-400">
                  We don't care about vanity likes. We optimize for actual foot traffic, table reservations, and sales in your cash register.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                <div className="flex items-center gap-2 text-amber-400 font-bold font-display text-sm">
                  <HeartHandshake className="h-4 w-4" />
                  <span>Zero Gatekeeping</span>
                </div>
                <p className="mt-1 text-neutral-400">
                  Every package includes hands-on guidance so you and your team actually understand the strategy behind every campaign.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                <div className="flex items-center gap-2 text-amber-400 font-bold font-display text-sm">
                  <MapPin className="h-4 w-4" />
                  <span>On-The-Ground Presence</span>
                </div>
                <p className="mt-1 text-neutral-400">
                  We are based in Ormoc Centro. We visit your actual shop to shoot 4K video, sample your food, and meet your staff.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                <div className="flex items-center gap-2 text-amber-400 font-bold font-display text-sm">
                  <Award className="h-4 w-4" />
                  <span>Bossing Standard</span>
                </div>
                <p className="mt-1 text-neutral-400">
                  We treat every small startup like the future bossing of their industry in Eastern Visayas.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Agency At A Glance / Profile card */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-white/10 bg-[#121419] p-6 sm:p-8">
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div>
                  <h3 className="text-xl font-bold font-display text-white">
                    Agency Snapshot
                  </h3>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Official Agency Credentials · Ormoc City
                  </p>
                </div>
                <div className="h-10 w-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 font-bold font-mono">
                  B|B
                </div>
              </div>

              <div className="mt-6 space-y-4 text-xs">
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-neutral-400">Agency Legal Name</span>
                  <span className="font-semibold text-white">Brand|Bossing Marketing Agency</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-neutral-400">Headquarters</span>
                  <span className="font-semibold text-white">Real St., Ormoc Centro, Leyte 6541</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-neutral-400">Target Clientele</span>
                  <span className="font-semibold text-amber-300">Ormoc MSMEs, Startups & Local Brands</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-neutral-400">Core Services</span>
                  <span className="font-semibold text-white">Local SEO, Meta Ads, Video Reels, Branding</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-neutral-400">Coverage Corridor</span>
                  <span className="font-semibold text-white">Ormoc, Kananga, Albuera, Merida & Leyte</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-neutral-400">Client Contract Type</span>
                  <span className="font-semibold text-emerald-400">Flexible Month-to-Month (No Lock-in)</span>
                </div>
              </div>

              <div className="mt-8 p-4 rounded-xl bg-amber-400/5 border border-amber-400/20">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                  <Sparkles className="h-4 w-4" />
                  <span>The "Bossing" Philosophy</span>
                </div>
                <p className="mt-1 text-xs text-neutral-300 leading-relaxed">
                  In Filipino business culture, becoming the "Bossing" means commanding respect, delivering undeniable quality, and building a sustainable business that supports your family and local community.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Executive Leadership: Mark G. Lonzaga & Alchie M. Ayod */}
        <div className="mt-20 border-t border-white/10 pt-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-400 uppercase">
              <Users className="h-3.5 w-3.5" />
              <span>Agency Leadership</span>
              <span aria-hidden="true" className="text-white/30">·</span>
              <span>Executive Co-CEOs</span>
            </div>
            <h3 className="mt-3 text-2xl sm:text-3xl font-bold font-display text-white">
              Meet the Founders Behind Brand|Bossing.
            </h3>
            <p className="mt-2 text-sm text-neutral-400 leading-relaxed font-body">
              Rooted in Leyte with a fierce passion for local enterprise growth, our executive team works directly with Ormoc business owners to build profitable, enduring local brands.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* CEO 1: Mark G. Lonzaga */}
            <div className="rounded-2xl border border-white/10 bg-[#121419] p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between">
                  <div className="h-14 w-14 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 font-display font-extrabold text-xl shadow-inner shadow-amber-400/10">
                    ML
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2.5 py-1 rounded-md">
                    Co-CEO & Chief Strategist
                  </span>
                </div>

                <div className="mt-5">
                  <h4 className="text-xl font-bold font-display text-white">
                    Mark G. Lonzaga
                  </h4>
                  <div className="text-xs font-semibold text-amber-300 mt-0.5">
                    Co-Chief Executive Officer
                  </div>
                </div>

                <p className="mt-4 text-xs sm:text-sm text-neutral-300 leading-relaxed font-body">
                  Specializing in market positioning, paid advertising funnels, and revenue architecture. Mark oversees growth strategy, client profitability audits, and ensures every Ormoc business partnered with Brand|Bossing achieves tangible return on ad spend.
                </p>

                <div className="mt-5 border-t border-white/5 pt-4 text-xs text-neutral-400 italic">
                  "Our goal is simple: make our homegrown Ormoc businesses the undisputed first choice for locals and visiting tourists alike."
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
                <span>Focus: Strategic ROI & Local SEO</span>
                <span className="text-amber-400 font-medium">Ormoc City, Leyte</span>
              </div>
            </div>

            {/* CEO 2: Alchie M. Ayod */}
            <div className="rounded-2xl border border-white/10 bg-[#121419] p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between">
                  <div className="h-14 w-14 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 font-display font-extrabold text-xl shadow-inner shadow-amber-400/10">
                    AA
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2.5 py-1 rounded-md">
                    Co-CEO & Creative Director
                  </span>
                </div>

                <div className="mt-5">
                  <h4 className="text-xl font-bold font-display text-white">
                    Alchie M. Ayod
                  </h4>
                  <div className="text-xs font-semibold text-amber-300 mt-0.5">
                    Co-Chief Executive Officer
                  </div>
                </div>

                <p className="mt-4 text-xs sm:text-sm text-neutral-300 leading-relaxed font-body">
                  Leading creative direction, viral video reels, and shelf-ready packaging design. Alchie spearheads on-location visual storytelling across Ormoc, turning traditional local shops into captivating digital brands that stop the social media scroll.
                </p>

                <div className="mt-5 border-t border-white/5 pt-4 text-xs text-neutral-400 italic">
                  "We want the passion and hard work you put into your products to be immediately visible the moment anyone sees your brand."
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
                <span>Focus: Creative Direction & Video Reels</span>
                <span className="text-amber-400 font-medium">Ormoc City, Leyte</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
