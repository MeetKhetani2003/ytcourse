"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Users, Gift } from "lucide-react";

const students = [
  "Rohan S. from Delhi just enrolled!",
  "Sneha M. from Mumbai just enrolled!",
  "Amit K. from Bangalore just enrolled!",
  "Vikas G. from Hyderabad just enrolled!",
  "Priya R. from Pune just enrolled!",
  "Aniket T. from Kolkata just enrolled!"
];

interface ConversionProps {
  onOpenCheckout: () => void;
}

export default function ConversionFeatures({ onOpenCheckout }: ConversionProps) {
  // Exit Intent state
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [hasShownExit, setHasShownExit] = useState(false);

  // Recent Purchase Notifications state
  const [activeNotification, setActiveNotification] = useState<string | null>(null);
  
  // Live Student Counter (dynamic fluctuate between 12 and 19)
  const [liveCount, setLiveCount] = useState(14);


  // Monitor mouse movement for exit intent
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 20 && !hasShownExit) {
        setShowExitPopup(true);
        setHasShownExit(true);
      }
    };
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [hasShownExit]);

  // Handle Purchase Alerts loop
  useEffect(() => {
    const interval = setInterval(() => {
      // Pick random notification
      const randIdx = Math.floor(Math.random() * students.length);
      setActiveNotification(students[randIdx]);

      // Hide after 5 seconds
      setTimeout(() => {
        setActiveNotification(null);
      }, 5000);
    }, 18000); // Trigger every 18 seconds

    return () => clearInterval(interval);
  }, []);

  // Handle Live student fluctuate
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCount((prev) => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const next = prev + change;
        return next >= 10 && next <= 22 ? next : prev;
      });
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleExitCtaClick = () => {
    setShowExitPopup(false);
    onOpenCheckout();
  };

  return (
    <>
      {/* 1. Floating WhatsApp Button */}
      <a
        href="https://wa.me/919876543210?text=Hi,%20I%20have%20a%20question%20about%20the%20Faceless%20YouTube%20Masterclass"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 md:bottom-8 right-6 z-40 p-4 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-[0_10px_20px_rgba(16,185,129,0.3)] transition-all hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer group"
      >
        <MessageCircle className="w-6 h-6 fill-white stroke-none" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-[150px] group-hover:ml-2 font-display text-sm font-bold transition-all duration-300 whitespace-nowrap">
          Chat With Support
        </span>
      </a>

      {/* 2. Live Student Counter (Top corner or floating indicator) */}
      <div className="fixed top-24 left-6 z-40 hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary-bg/90 border border-white/10 text-xs font-semibold text-white/90 shadow-lg backdrop-blur-md">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
        </span>
        <span className="font-mono text-success font-bold">{liveCount}</span> students active on page
      </div>

      {/* 3. Recent Purchase Alerts (Toast popup bottom-left) */}
      <AnimatePresence>
        {activeNotification && (
          <motion.div
            initial={{ opacity: 0, x: -100, y: 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="fixed bottom-6 left-6 z-40 max-w-sm glass-card bg-secondary-bg/95 border-accent/20 p-4 rounded-xl flex items-center gap-3 shadow-xl backdrop-blur-md"
          >
            <div className="p-2 rounded-lg bg-accent/20 text-accent">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-display font-semibold text-white leading-tight">
                {activeNotification}
              </p>
              <span className="text-[10px] text-accent font-semibold uppercase">✓ Verified Enrollment</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Sticky Bottom CTA (Mobile Viewports Only) */}
      <div className="fixed bottom-0 inset-x-0 z-30 md:hidden bg-secondary-bg/90 border-t border-white/10 p-4 flex items-center justify-between gap-4 backdrop-blur-lg">
        <div>
          <span className="text-[10px] text-accent font-display uppercase tracking-widest font-extrabold block">
            Special Offer
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-display font-extrabold text-white">₹21</span>
            <span className="text-[10px] text-white/60 line-through">₹1,999</span>
          </div>
        </div>
        
        <button
          onClick={onOpenCheckout}
          className="flex-1 cursor-pointer flex items-center justify-center gap-1.5 py-3 px-4 bg-gradient-to-r from-cta to-accent text-white font-display font-bold text-sm rounded-xl shadow-lg shadow-accent/25"
        >
          <span>Enroll Now</span>
        </button>
      </div>

      {/* 5. Exit Intent Popup Modal */}
      <AnimatePresence>
        {showExitPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowExitPopup(false)}
              className="absolute inset-0 bg-[#0A0B1A]/90 backdrop-blur-md"
            />

            {/* Popup Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className="relative w-full max-w-md bg-secondary-bg border border-accent/30 rounded-3xl overflow-hidden shadow-2xl z-10 p-6 md:p-8 text-center"
            >
              <button
                onClick={() => setShowExitPopup(false)}
                className="absolute top-4 right-4 p-1 rounded-full bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 rounded-full bg-accent/15 border border-accent/20 flex items-center justify-center text-accent mx-auto mb-4 animate-[bounce_2s_infinite]">
                <Gift className="w-8 h-8" />
              </div>

              <span className="text-xs text-accent font-display uppercase font-bold tracking-widest block mb-1">
                Wait! Don&apos;t Leave Empty Handed
              </span>
              <h3 className="text-2xl font-display font-black text-white mb-4">
                Unlock Secret Exit Bonus
              </h3>

              <p className="text-sm text-secondary-text font-sans mb-6 leading-relaxed">
                Enroll in the masterclass in the next 5 minutes and we will unlock an **Additional Secret Module**: *Faceless Shorts Automation Guide* (valued at ₹1,999) 100% Free!
              </p>

              <div className="p-4 rounded-xl bg-[#0A0B1A] border border-white/5 mb-6 text-xs text-secondary-text text-left">
                <span className="font-bold text-white block mb-1">🔥 Added Free to your account:</span>
                • Secrets to generate 1M+ views on YouTube Shorts using AI script overlays.
              </div>

              <button
                onClick={handleExitCtaClick}
                className="w-full cursor-pointer flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-cta to-accent text-white font-display font-black text-base rounded-xl shadow-lg shadow-accent/25 hover:opacity-95 transition-all"
              >
                <span>CLAIM BONUS & ENROLL NOW</span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
