"use client";

import React from "react";
import { ArrowRight, Flame } from "lucide-react";

export default function FinalCta() {
  return (
    <section className="py-24 px-4 md:px-8 bg-[#0D1F28]/35 border-t border-white/5 relative overflow-hidden text-center">
      {/* Intense glow backing */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-72 glow-orange-spot pointer-events-none opacity-30" />

      <div className="max-w-4xl mx-auto w-full relative z-10 glass-card bg-gradient-to-b from-secondary-bg/60 to-primary-bg/80 border-accent/20 p-8 md:p-14 rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Shimmer light effect */}
        <div className="absolute -inset-x-full top-0 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 animate-[shimmer_4s_infinite]" />

        <div className="relative z-10 flex flex-col items-center">
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/15 border border-accent/20 text-accent font-display text-xs font-bold uppercase tracking-wider mb-6">
            <Flame className="w-4 h-4" /> Ready to take action?
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-white mb-6 leading-tight max-w-2xl">
            Start Building Your <span className="text-gradient-gold">YouTube Income System</span> Today
          </h2>

          <p className="text-base md:text-lg text-secondary-text font-sans max-w-lg mb-8 leading-relaxed">
            Stop watching others succeed from the sidelines. Take charge and start building your own high-yielding digital asset.
          </p>

          <div className="w-full sm:w-auto">
            <a
              href="#offer-section"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-gradient-to-r from-cta to-accent hover:from-accent hover:to-cta text-white font-display font-black text-xl rounded-2xl shadow-[0_15px_30px_rgba(255,107,53,0.35)] hover:shadow-[0_20px_40px_rgba(255,159,28,0.45)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 text-center w-full sm:w-auto"
            >
              <span>ENROLL NOW</span>
              <ArrowRight className="w-5 h-5 animate-pulse" />
            </a>
          </div>

          {/* Micro trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-[10px] md:text-xs text-secondary-text font-semibold uppercase tracking-wider mt-8 border-t border-white/5 pt-6 w-full max-w-md">
            <span>Instant Access</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <span>Lifetime Content Updates</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <span>VIP Community Included</span>
          </div>

        </div>

      </div>
    </section>
  );
}
