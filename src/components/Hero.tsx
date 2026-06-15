"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, Play, Star, Users, Shield, ArrowRight } from "lucide-react";

export default function Hero() {
  const benefits = [
    "USA Channel Setup",
    "AI Content Creation",
    "Script Writing",
    "Video Editing",
    "YouTube SEO",
    "Monetization Strategy",
    "Scaling Framework",
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 md:px-8 overflow-hidden bg-radial-glow">
      {/* Background Ornaments */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full glow-emerald-spot pointer-events-none opacity-60" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 rounded-full glow-orange-spot pointer-events-none opacity-40 animate-pulse-slow" />
      
      {/* Cinematic Abstract Rings */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <div className="w-[500px] h-[500px] border border-dashed border-white rounded-full animate-[spin_120s_linear_infinite]" />
        <div className="absolute w-[800px] h-[800px] border border-dotted border-accent rounded-full animate-[spin_180s_linear_infinite]" />
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Side Content */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-bg/85 border border-accent/30 text-accent font-display text-sm font-semibold shadow-lg backdrop-blur-md mb-6"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            🔥 2026 Updated Masterclass
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-tight text-white mb-6"
          >
            Build A <span className="text-gradient-orange">Faceless USA</span> YouTube Channel & Learn The System To Create{" "}
            <span className="text-gradient-gold">Long-Term Income</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-secondary-text max-w-xl mb-8 leading-relaxed font-sans"
          >
            Learn step-by-step how to create, grow, and monetize faceless YouTube channels targeting high-paying USA audiences using modern AI tools and proven scaling blueprints.
          </motion.p>

          {/* Benefits Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 gap-x-6 gap-y-3 mb-8 w-full max-w-md"
          >
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-2 text-white/90 text-sm font-medium">
                <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
          </motion.div>

          {/* Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-8"
          >
            <a
              href="#offer-section"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cta to-accent hover:from-accent hover:to-cta text-white font-display font-bold text-lg rounded-xl shadow-[0_10px_25px_rgba(255,107,53,0.35)] hover:shadow-[0_15px_30px_rgba(255,159,28,0.45)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 text-center"
            >
              <span>🚀 Enroll Now</span>
              <ArrowRight className="w-5 h-5" />
            </a>
            
            <a
              href="#preview"
              onClick={(e) => {
                e.preventDefault();
                const previewEl = document.getElementById("preview-section");
                if (previewEl) previewEl.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-secondary-bg hover:bg-secondary-bg/80 border border-white/10 hover:border-white/20 text-white font-display font-semibold text-lg rounded-xl transition-all duration-300 text-center"
            >
              <Play className="w-5 h-5 text-accent fill-accent" />
              <span>Watch Preview</span>
            </a>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap items-center gap-6 text-xs text-secondary-text border-t border-white/5 pt-6 w-full"
          >
            <div className="flex items-center gap-1.5">
              <div className="flex text-accent">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent stroke-none" />
                ))}
              </div>
              <span className="font-semibold text-white text-sm">4.9/5 Rating</span>
            </div>

            <div className="h-4 w-px bg-white/10" />

            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-accent" />
              <span className="font-semibold text-white text-sm">5,000+ Students</span>
            </div>

            <div className="h-4 w-px bg-white/10" />

            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-accent" />
              <span className="font-semibold text-white text-sm">Lifetime Access</span>
            </div>
          </motion.div>

        </div>

        {/* Right Side Visual Showcase */}
        <div className="lg:col-span-5 relative flex items-center justify-center min-h-[500px]">
          {/* Creator Image Wrap */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative w-80 h-[450px] md:w-96 md:h-[500px] rounded-3xl overflow-hidden border border-white/10 z-10"
          >
            <Image
              src="/creator.jpeg"
              alt="Course Instructor"
              fill
              priority
              sizes="(max-width: 768px) 320px, 384px"
              className="object-cover object-top filter brightness-95"
            />
            {/* Dark overlay fade */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary-bg via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-0 inset-x-0 p-6 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/90 text-white font-display text-xs font-bold uppercase tracking-wider mb-2">
                <span className="h-2 w-2 rounded-full bg-white animate-ping" />
                Recorded Full Course
              </div>
              <p className="text-xs text-white/70">100% Practical Blueprint</p>
            </div>
          </motion.div>

          {/* Behind glowing ring */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full bg-gradient-to-tr from-accent/20 to-transparent blur-2xl pointer-events-none" />

          {/* Floating Analytics Widgets */}
          {/* Widget 1: Views */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 -left-6 md:-left-12 z-20 glass-card p-4 rounded-xl flex flex-col gap-1 w-36 shadow-2xl"
          >
            <span className="text-xs text-secondary-text">Channel Views</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-display font-extrabold text-white">66.3K</span>
              <span className="text-[10px] font-bold text-success">↑ 214%</span>
            </div>
            <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden mt-1">
              <div className="bg-success h-full w-[70%]" />
            </div>
          </motion.div>

          {/* Widget 2: Watch Hours */}
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute top-48 -right-6 md:-right-10 z-20 glass-card p-4 rounded-xl flex flex-col gap-1 w-36 shadow-2xl"
          >
            <span className="text-xs text-secondary-text">Watch Time</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-display font-extrabold text-white">16.0K</span>
              <span className="text-[10px] font-bold text-success">↑ 182%</span>
            </div>
            <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden mt-1">
              <div className="bg-accent h-full w-[80%]" />
            </div>
          </motion.div>

          {/* Widget 3: Subscribers */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-20 -left-8 md:-left-16 z-20 glass-card p-4 rounded-xl flex flex-col gap-1 w-40 shadow-2xl"
          >
            <span className="text-xs text-secondary-text">Subscribers</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-display font-extrabold text-white">+288</span>
              <span className="text-[10px] font-bold text-success">↑ 304%</span>
            </div>
            <p className="text-[10px] text-white/55 font-sans">USA Target Audience</p>
          </motion.div>

          {/* Widget 4: Revenue */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            className="absolute bottom-12 -right-8 md:-right-12 z-20 glass-card p-4 rounded-xl flex flex-col gap-1 w-40 shadow-2xl border-accent/20"
          >
            <div className="flex justify-between items-center">
              <span className="text-xs text-secondary-text">Revenue (CPM)</span>
              <span className="text-xs text-accent font-bold">$USD</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-display font-extrabold text-accent">$573.18</span>
            </div>
            <span className="text-[10px] text-success font-semibold">Ready to scale</span>
          </motion.div>
          
        </div>
        
      </div>
    </section>
  );
}
