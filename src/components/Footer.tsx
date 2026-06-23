"use client";

import React from "react";
import Link from "next/link";
import { businessConfig } from "@/config/businessConfig";

export default function Footer() {
  return (
    <footer className="bg-primary-bg border-t border-white/5 py-12 px-4 md:px-8 relative z-10 text-secondary-text font-sans text-xs md:text-sm">
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center gap-8 text-center">
        
        {/* Logo and Name */}
        <div className="flex items-center gap-2 text-white font-display font-extrabold text-lg">
          <div className="p-1.5 rounded-lg bg-red-600 flex items-center justify-center text-white">
            <svg
              className="w-5 h-5 fill-current text-white shrink-0"
              viewBox="0 0 24 24"
            >
              <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.507 9.388.507 9.388.507s7.518 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </div>
          <span>Faceless USA YouTube Channel Masterclass</span>
        </div>

        {/* Quick links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-white/70 font-semibold font-display text-sm">
          <a href="#what-you-will-learn" className="hover:text-accent transition-colors">Core Skills</a>
          <a href="#curriculum-section" className="hover:text-accent transition-colors">Curriculum</a>
          <a href="#results-section" className="hover:text-accent transition-colors">Student Results</a>
          <a href="#testimonials-section" className="hover:text-accent transition-colors">Reviews</a>
          <a href="#faq-section" className="hover:text-accent transition-colors">FAQ</a>
        </div>

        {/* Disclaimer (Critical for Infoproduct funnel trust) */}
        <div className="max-w-3xl bg-secondary-bg/25 border border-white/5 p-5 rounded-2xl text-[11px] leading-relaxed text-secondary-text">
          <p className="mb-2 font-bold text-white/80">Earnings and Results Disclaimer:</p>
          <p>
            The estimated earnings, revenue analytics, views, and growth figures shown on this landing page are specific student results, case studies, or mock dashboards illustrating the potential outcomes of building a USA-targeted faceless YouTube channel. Individual results will vary. Building a successful YouTube channel requires dedication, constant learning, video editing quality, and consistent video uploads. This program provides tools, templates, and strategies, but does not guarantee specific monetary compensation or algorithm success.
          </p>
        </div>

        {/* Copyright info */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full border-t border-white/5 pt-8 mt-4 gap-4 text-secondary-text">
          <span>© 2026 {businessConfig.name}. All rights reserved.</span>
          
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-white/50 text-xs">
            <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
            <span>•</span>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link href="/refund" className="hover:text-white transition-colors">Refund Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
