"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, BookOpen, Clock, PlayCircle } from "lucide-react";

export default function Curriculum() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const modules = [
    {
      num: "Module 01",
      title: "Foundation & Ecosystem Overview",
      lessons: "4 lessons",
      duration: "45 mins",
      details: [
        "How the US faceless YouTube ecosystem works in 2026",
        "The monetization game: RPM/CPM differences between India/Asia vs. USA",
        "Setting up your target mindset & revenue milestones",
        "Copyright laws, fair use policy, and monetization safety rules"
      ]
    },
    {
      num: "Module 02",
      title: "USA Niche Research & CPM Arbitrage",
      lessons: "6 lessons",
      duration: "1h 15m",
      details: [
        "Finding high RPM niches (Finance, Tech, Luxury, Travel, Biography)",
        "Analyzing competitors and reverse engineering viral videos",
        "Our proprietary 'Greenlight' niche validation checklist",
        "Validating CPM data using free online resources"
      ]
    },
    {
      num: "Module 03",
      title: "Establishing the US Presence (Channel Setup)",
      lessons: "5 lessons",
      duration: "55 mins",
      details: [
        "How to create a USA-targeted channel from India without a VPN",
        "Verifying your channel and unlocking advanced features safely",
        "Bypassing geo-restrictions on mobile devices and browsers",
        "Setting up USA tax info, AdSense, and payout routes"
      ]
    },
    {
      num: "Module 04",
      title: "Viral Content Strategy & The Algorithm",
      lessons: "5 lessons",
      duration: "1h 05m",
      details: [
        "The mechanics of the YouTube algorithm: AVD vs. CTR",
        "How to capture user attention in the first 30 seconds",
        "Topic research & creating highly clickable concept ideas",
        "Building a consistent content scheduling workflow"
      ]
    },
    {
      num: "Module 05",
      title: "Writing High-Retention Scripts (AI & Human Hybrid)",
      lessons: "7 lessons",
      duration: "1h 30m",
      details: [
        "The psychological retention hook formula (Hook, Story, Offer)",
        "Writing scripts with ChatGPT & Claude using custom frameworks",
        "Injecting storytelling and humor to keep viewers hooked",
        "Adding audio-visual triggers (SFX/B-Roll) into scripts"
      ]
    },
    {
      num: "Module 06",
      title: "AI Tools Mastery (Voiceovers & Prompts)",
      lessons: "6 lessons",
      duration: "1h 10m",
      details: [
        "Selecting the best AI voice generators (ElevenLabs, etc.)",
        "Crafting hyper-realistic voices that bypass YouTube's reuse detection",
        "Custom voice settings: Tone, pitch, pause structure",
        "Full AI Prompt Vault: Prompts for scripts, titles, descriptions"
      ]
    },
    {
      num: "Module 07",
      title: "Premium Faceless Video Editing Workflow",
      lessons: "8 lessons",
      duration: "2h 15m",
      details: [
        "Editing toolkits: CapCut, Premiere Pro, and DaVinci Resolve",
        "Sourcing copyright-free B-roll, images, and audio assets",
        "Implementing auto-captions, overlays, and sound design",
        "Step-by-step editing walkthrough of a viral 10-minute video"
      ]
    },
    {
      num: "Module 08",
      title: "YouTube SEO & High-CTR Designs",
      lessons: "6 lessons",
      duration: "1h 00m",
      details: [
        "Designing click-worthy thumbnails (Color contrast, expressions, text rules)",
        "Writing CTR-boosting titles and descriptions",
        "Keyword research, search metadata, and suggested video hooks",
        "A/B testing titles and thumbnails to boost performance"
      ]
    },
    {
      num: "Module 09",
      title: "Monetization Amplifiers",
      lessons: "5 lessons",
      duration: "50 mins",
      details: [
        "Getting approved for the YouTube Partner Program (YPP) quickly",
        "Maximizing AdSense mid-roll placements for 2x revenue",
        "Affiliate marketing setup: High-ticket offers for US buyers",
        "Alternative revenues: Digital product sales & sponsor integrations"
      ]
    },
    {
      num: "Module 10",
      title: "Scaling & Automation Blueprint",
      lessons: "4 lessons",
      duration: "45 mins",
      details: [
        "Hiring, training, and managing remote scriptwriters, editors, & voice artists",
        "Automating the content machine to run without your daily presence",
        "Building a portfolio of channels: Scaling CPM arbitrage",
        "Exit strategy: Selling channels on Empire Flippers or private buyers"
      ]
    }
  ];

  const handleToggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-24 px-4 md:px-8 bg-[#061218] relative overflow-hidden" id="curriculum-section">
      {/* Glow Effects */}
      <div className="absolute bottom-10 left-10 w-96 h-96 glow-emerald-spot pointer-events-none opacity-20" />

      <div className="max-w-4xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-accent font-display uppercase tracking-wider text-sm font-bold mb-2">
            Curriculum Blueprint
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white mb-6">
            10-Module Advanced Program
          </h2>
          <p className="text-secondary-text font-sans">
            A comprehensive, step-by-step masterclass packed with practical knowledge, templates, and frameworks.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="flex flex-col gap-4">
          {modules.map((mod, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`glass-card rounded-2xl overflow-hidden transition-all duration-300 border ${
                  isOpen ? "border-accent/30 bg-secondary-bg/50 shadow-[0_15px_30px_rgba(255,159,28,0.05)]" : "border-white/5"
                }`}
              >
                {/* Accordion Trigger */}
                <button
                  onClick={() => handleToggle(idx)}
                  className="w-full flex items-center justify-between p-6 text-left cursor-pointer group"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                    <span className="text-accent font-display font-bold text-sm tracking-wider uppercase">
                      {mod.num}
                    </span>
                    <span className="text-lg md:text-xl font-display font-bold text-white group-hover:text-accent transition-colors duration-300">
                      {mod.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 shrink-0 pl-4">
                    <div className="hidden md:flex items-center gap-3 text-xs text-secondary-text">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5" />
                        {mod.lessons}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {mod.duration}
                      </span>
                    </div>

                    <div className="p-2 rounded-full bg-white/5 group-hover:bg-accent/20 group-hover:text-accent text-white transition-all duration-300">
                      {isOpen ? (
                        <Minus className="w-4 h-4" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </div>
                  </div>
                </button>

                {/* Accordion Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-2 border-t border-white/5 bg-primary-bg/30">
                        <div className="md:hidden flex items-center gap-4 text-xs text-secondary-text mb-4">
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-3.5 h-3.5 text-accent" />
                            {mod.lessons}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-accent" />
                            {mod.duration}
                          </span>
                        </div>

                        <p className="text-sm font-display font-semibold text-white/80 mb-3 uppercase tracking-wider">
                          What you will learn in this module:
                        </p>
                        
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-secondary-text text-sm">
                          {mod.details.map((detail, dIdx) => (
                            <li key={dIdx} className="flex items-start gap-2.5">
                              <PlayCircle className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                              <span className="leading-relaxed">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
