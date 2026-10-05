import React from 'react';
import { Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/ormocData';

export const Testimonials: React.FC = () => {
  return (
    <section className="border-b border-white/10 bg-[#0c0d10] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-400 uppercase">
            <span>Direct Client Feedback</span>
            <span aria-hidden="true" className="text-white/30">·</span>
            <span>Local Business Voices</span>
          </div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white font-display sm:text-4xl [text-wrap:balance]">
            Trusted by the Bossings of Ormoc.
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-white/10 bg-[#121419] p-6 sm:p-8 flex flex-col justify-between"
            >
              <div>
                <Quote className="h-6 w-6 text-amber-400/40" />
                <p className="mt-4 text-sm text-neutral-300 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-white/10">
                <div className="text-sm font-bold text-white font-display">
                  {t.author}
                </div>
                <div className="text-xs text-amber-300 font-medium">
                  {t.role}
                </div>
                <div className="text-xs text-neutral-400 mt-0.5">
                  {t.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
