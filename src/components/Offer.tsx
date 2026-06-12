"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle2, Clock, Flame, Shield, Sparkles } from "lucide-react";

interface OfferProps {
  onOpenCheckout: () => void;
}

export default function Offer({ onOpenCheckout }: OfferProps) {
  // Live Countdown Timer State (15 mins countdown)
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 900)); // Reset to 15m when hit 0
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const features = [
    "Lifetime Unlimited Access",
    "10 Modules (Recorded HD Videos)",
    "Future Course Updates & Modules",
    "Mobile & Tablet Friendly Portal",
    "Beginner Friendly Step-By-Step",
    "VIP Discord Community Support",
    "100+ Prompt Vault & SEO Templates",
  ];

  return (
    <section className="py-24 px-4 md:px-8 bg-radial-glow relative overflow-hidden" id="offer-section">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full glow-orange-spot pointer-events-none opacity-30 animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 rounded-full glow-emerald-spot pointer-events-none opacity-20" />

      <div className="max-w-5xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-display font-extrabold text-accent uppercase tracking-widest block mb-2">
            Limited-Time Enrollment Window
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-black text-white mb-6">
            Secure Your Seat & Start Earning
          </h2>
          <p className="text-lg text-secondary-text font-sans">
            Start building your automated YouTube asset today. No hidden fees. One-time payment.
          </p>
        </div>

        {/* Pricing Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-4xl mx-auto">
          
          {/* Left Col: Guarantee & Value inclusions */}
          <div className="lg:col-span-5 flex flex-col justify-between p-8 rounded-3xl bg-secondary-bg/20 border border-white/5 backdrop-blur-md">
            <div>
              <h3 className="text-xl font-display font-extrabold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent" />
                What&apos;s Included:
              </h3>
              
              <ul className="flex flex-col gap-4">
                {features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-white/95 font-sans">
                    <CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-white/5 pt-6 mt-8 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-accent shrink-0" />
                <span className="text-xs text-secondary-text leading-tight">
                  <span className="font-semibold text-white block">100% Risk-Free Guarantee</span>
                  Not satisfied? Contact us within 7 days for full assistance.
                </span>
              </div>
            </div>
          </div>

          {/* Right Col: High-converting Glassmorphic Pricing Card */}
          <div className="lg:col-span-7 relative">
            {/* Background glowing frame */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent to-cta rounded-3xl blur-md opacity-25 pointer-events-none" />

            <div className="relative h-full flex flex-col justify-between p-8 md:p-10 rounded-3xl bg-secondary-bg/60 border border-accent/30 shadow-2xl backdrop-blur-xl">
              
              {/* Card Badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-accent to-cta text-white font-display text-xs font-black uppercase tracking-wider shadow-lg">
                ★ Best Price Guaranteed
              </div>

              <div className="text-center mt-2">
                {/* Countdown Timer */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-bg border border-white/5 text-sm font-display font-semibold text-white mb-6">
                  <Clock className="w-4 h-4 text-accent animate-spin" />
                  <span>Special discount ends in:</span>
                  <span className="text-accent font-extrabold font-mono text-base tracking-wider">
                    {formatTime(timeLeft)}
                  </span>
                </div>

                {/* Strikethrough Value */}
                <div className="flex justify-center items-center gap-3 mb-1">
                  <span className="text-sm text-secondary-text font-sans">Regular Price:</span>
                  <span className="text-lg text-white/60 font-display font-bold line-through">
                    ₹3,999
                  </span>
                  <span className="text-xs font-display font-extrabold px-2 py-0.5 rounded bg-red-500/20 text-red-500 border border-red-500/30 uppercase">
                    Save 20%
                  </span>
                </div>

                {/* Selling Price */}
                <div className="flex flex-col items-center mb-6">
                  <span className="text-xs text-secondary-text font-semibold uppercase tracking-wider mb-1">
                    Special Launch Price (One-Time)
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl md:text-6xl font-display font-black text-white">
                      ₹3,200
                    </span>
                    <span className="text-sm font-semibold text-white/60">/ Only</span>
                  </div>
                </div>

                {/* Scarcity Notice */}
                <div className="flex items-center justify-center gap-1.5 text-xs text-accent font-semibold mb-6">
                  <Flame className="w-4 h-4 text-accent fill-accent" />
                  <span>Hurry! Only 4 seats left at this price point today.</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="w-full">
                <button
                  onClick={onOpenCheckout}
                  className="w-full cursor-pointer flex items-center justify-center gap-2 px-8 py-5 bg-gradient-to-r from-cta to-accent hover:from-accent hover:to-cta text-white font-display font-black text-xl rounded-2xl shadow-[0_15px_30px_rgba(255,107,53,0.4)] hover:shadow-[0_20px_40px_rgba(255,159,28,0.5)] transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 text-center"
                >
                  GET INSTANT ACCESS
                </button>
                <p className="text-[10px] text-secondary-text font-semibold mt-3 text-center uppercase tracking-wider">
                  🔒 SSL Secured & Encrypted Checkout
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
