"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Do I need to show my face or record my own voice?",
      a: "Absolutely not! This is a 100% Faceless YouTube strategy. We teach you how to write scripts using AI, generate natural-sounding voiceovers using premium human-like AI software, and edit using copyright-free footage, stock assets, and templates."
    },
    {
      q: "How does targeting the USA audience work from India?",
      a: "You do not need a VPN, US phone numbers, or credit cards. The YouTube algorithm distributes content based on viewer interest, video metadata, and topic demand, not your physical upload location. We show you the exact settings to seed your video directly into the US feed."
    },
    {
      q: "How much time do I need to commit daily?",
      a: "In the beginning, we recommend spending 1-2 hours a day setting up your channel, researching niches, and getting familiar with the AI tools. Once you establish your workflow, a video takes less than 45 minutes to compile. Later, you can automate it entirely."
    },
    {
      q: "Do I need expensive video editing software or computers?",
      a: "No. You can edit all videos using free tools like CapCut (mobile or desktop). A standard laptop or smartphone is completely sufficient. You don't need a high-end gaming PC to render these videos."
    },
    {
      q: "Is YouTube monetization safe with AI voices?",
      a: "Yes! YouTube's policy allows AI voices as long as the content is original, high-quality, and adds value (meaning not just copy-pasted auto-generated slide shows). We teach you the exact voice settings and script formats that easily pass YouTube's monetization review."
    },
    {
      q: "What if I get stuck? Is there student support?",
      a: "You get lifetime access to our VIP Student Discord community. Our support mentors and fellow creators are active daily to answer your questions, review your thumbnails, and troubleshoot any channel issues."
    }
  ];

  const handleToggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-24 px-4 md:px-8 bg-[#061218] relative overflow-hidden" id="faq-section">
      {/* Background glow overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 glow-emerald-spot pointer-events-none opacity-25" />

      <div className="max-w-3xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-accent font-display uppercase tracking-wider text-sm font-bold mb-2">
            Frequently Asked Questions
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white">
            Answers To Your Objections
          </h2>
        </div>

        {/* FAQ list */}
        <div className="flex flex-col gap-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`glass-card rounded-2xl overflow-hidden transition-all duration-300 border ${
                  isOpen ? "border-accent/30 bg-secondary-bg/50 shadow-lg" : "border-white/5"
                }`}
              >
                {/* Header */}
                <button
                  onClick={() => handleToggle(idx)}
                  className="w-full flex items-center justify-between p-6 text-left cursor-pointer group"
                >
                  <div className="flex items-center gap-3.5 pr-4">
                    <HelpCircle className={`w-5 h-5 shrink-0 transition-colors duration-300 ${isOpen ? "text-accent" : "text-secondary-text"}`} />
                    <span className="font-display font-bold text-base md:text-lg text-white group-hover:text-accent transition-colors duration-300">
                      {faq.q}
                    </span>
                  </div>

                  <div className="p-1.5 rounded-full bg-white/5 group-hover:bg-accent/20 group-hover:text-accent text-white transition-all duration-300 shrink-0">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {/* Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-1 text-sm md:text-base text-secondary-text leading-relaxed font-sans border-t border-white/5 bg-primary-bg/20">
                        {faq.a}
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
