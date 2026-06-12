"use client";

import React from "react";
import { motion } from "framer-motion";
import { Gift, FileCode, Film, Landmark, Calendar, Sparkles } from "lucide-react";

export default function Bonuses() {
  const bonuses = [
    {
      num: "Bonus 1",
      title: "100+ High-CPM Viral Video Ideas",
      value: "₹2,499",
      icon: <Film className="w-6 h-6 text-accent animate-pulse" />,
      desc: "Proven concepts in finance, tech, and history niches that are primed to hit the US algorithm immediately."
    },
    {
      num: "Bonus 2",
      title: "AI Master Prompt Vault",
      value: "₹1,999",
      icon: <FileCode className="w-6 h-6 text-accent" />,
      desc: "Our copy-paste Claude and ChatGPT prompts to generate complete, high-retention script blueprints in seconds."
    },
    {
      num: "Bonus 3",
      title: "Premium Thumbnail Assets Pack",
      value: "₹1,499",
      icon: <Sparkles className="w-6 h-6 text-accent" />,
      desc: "High-contrast background assets, glow overlays, and fonts that boost video click-through-rates (CTR)."
    },
    {
      num: "Bonus 4",
      title: "The Ultimate YouTube SEO Blueprint",
      value: "₹2,000",
      icon: <Landmark className="w-6 h-6 text-accent" />,
      desc: "Step-by-step metadata checklist to rank #1 on search and suggest feeds targeting USA viewers."
    },
    {
      num: "Bonus 5",
      title: "Automated Content Planner & Tracker",
      value: "₹2,001",
      icon: <Calendar className="w-6 h-6 text-accent" />,
      desc: "A premium database template to organize titles, scripts, edit workflows, and schedule channels seamlessly."
    }
  ];

  return (
    <section className="py-24 px-4 md:px-8 bg-secondary-bg/30 relative overflow-hidden" id="bonuses-section">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 glow-orange-spot pointer-events-none opacity-20" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-accent/15 border border-accent/20 text-accent font-display text-xs font-extrabold uppercase tracking-widest mb-3">
            <Gift className="w-4 h-4 inline-block" /> Fast Action Bonuses
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white mb-6">
            Exclusive Scaling Arsenal
          </h2>
          <p className="text-secondary-text font-sans max-w-xl mx-auto">
            Get these elite assets for free when you enroll in the Masterclass today.
          </p>
        </div>

        {/* Bonus Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {bonuses.map((bonus, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card glass-card-hover p-6 rounded-2xl flex flex-col justify-between relative overflow-hidden group border-accent/10"
            >
              {/* Glow light effect behind card */}
              <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-accent/10 blur-xl pointer-events-none opacity-50 group-hover:scale-150 transition-transform duration-500" />
              
              <div>
                {/* Header line */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-display font-extrabold text-accent uppercase tracking-wider">
                    {bonus.num}
                  </span>
                  <span className="text-xs font-display font-bold px-2 py-1 rounded bg-accent/10 border border-accent/20 text-accent">
                    Value {bonus.value}
                  </span>
                </div>

                {/* Icon & Title */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-primary-bg border border-white/5">
                    {bonus.icon}
                  </div>
                  <h3 className="text-lg font-display font-extrabold text-white leading-snug">
                    {bonus.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-sm text-secondary-text leading-relaxed font-sans">
                  {bonus.desc}
                </p>
              </div>

              {/* Bottom Tag */}
              <div className="border-t border-white/5 pt-4 mt-5 flex items-center justify-between text-xs text-white/55">
                <span>Fast Action Bonus</span>
                <span className="font-semibold text-success">✓ Included Free</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Final Value Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card bg-gradient-to-r from-accent/10 via-cta/15 to-accent/10 border-accent/30 p-8 rounded-3xl text-center max-w-3xl mx-auto shadow-2xl relative overflow-hidden"
        >
          {/* Animated pulsing light */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />
          
          <span className="text-xs text-accent font-display font-extrabold tracking-widest uppercase block mb-1">
            Total Value Summary
          </span>
          <p className="text-2xl md:text-3xl font-display font-extrabold text-white mb-2">
            ₹9,999 Worth Of Bonuses Included <span className="text-gradient-orange">100% FREE</span>
          </p>
          <p className="text-sm text-secondary-text font-sans max-w-lg mx-auto">
            Available only to students enrolling today. Do not skip this chance to secure your fast action toolkit.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
