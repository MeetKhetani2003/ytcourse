"use client";

import React from "react";
import { BookOpen, Smartphone, ShieldCheck, Zap, Sparkles } from "lucide-react";

export default function TrustBar() {
  const trustItems = [
    { icon: <ShieldCheck className="w-5 h-5 text-accent" />, text: "Lifetime Access" },
    { icon: <BookOpen className="w-5 h-5 text-accent" />, text: "Recorded Course" },
    { icon: <Smartphone className="w-5 h-5 text-accent" />, text: "Mobile Friendly" },
    { icon: <Sparkles className="w-5 h-5 text-accent" />, text: "Beginner Friendly" },
    { icon: <ShieldCheck className="w-5 h-5 text-accent" />, text: "Secure Payment" },
    { icon: <Zap className="w-5 h-5 text-accent" />, text: "Instant Access" },
  ];

  return (
    <div className="w-full bg-secondary-bg/60 border-y border-white/5 py-6 overflow-hidden relative z-15 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-4 items-center justify-items-center">
          {trustItems.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2.5 group transition-all duration-300 hover:scale-105"
            >
              <div className="p-2 rounded-lg bg-primary-bg border border-white/5 group-hover:border-accent/30 group-hover:bg-primary-bg/80 transition-all duration-300 shadow-sm">
                {item.icon}
              </div>
              <span className="text-sm font-display font-medium text-secondary-text group-hover:text-white transition-colors duration-300">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
