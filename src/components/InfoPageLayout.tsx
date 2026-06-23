"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, MapPin } from "lucide-react";
import { businessConfig } from "@/config/businessConfig";

interface InfoPageLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function InfoPageLayout({
  title,
  subtitle = `Last Updated: June 2026`,
  children,
}: InfoPageLayoutProps) {
  return (
    <div className="min-h-screen bg-[#0A0B1A] text-white flex flex-col relative overflow-hidden font-sans select-none">
      {/* Background radial glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] glow-orange-spot opacity-40 pointer-events-none rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] glow-emerald-spot opacity-30 pointer-events-none rounded-full" />

      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#0A0B1A]/80 backdrop-blur-md border-b border-white/5 py-4 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between w-full">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-white font-display font-extrabold text-sm md:text-base hover:opacity-90 transition-opacity"
          >
            <div className="p-1.5 rounded-lg bg-red-600 flex items-center justify-center text-white shrink-0">
              <svg
                className="w-4 h-4 fill-current text-white shrink-0"
                viewBox="0 0 24 24"
              >
                <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.507 9.388.507 9.388.507s7.518 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </div>
            <span>Faceless USA Masterclass</span>
          </Link>

          {/* Back Home Button */}
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs md:text-sm text-secondary-text hover:text-white transition-colors py-1.5 px-3 rounded-lg border border-white/5 hover:border-white/10 bg-white/5"
          >
            <ArrowLeft className="w-4 h-4 text-accent" />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-4xl mx-auto w-full py-10 px-4 md:px-8 relative z-10">
        <div className="glass-card rounded-2xl p-6 md:p-10 border border-white/5 shadow-2xl">
          {/* Header section inside card */}
          <div className="border-b border-white/5 pb-6 mb-8">
            <h1 className="text-2xl md:text-4xl font-display font-extrabold text-white leading-tight mb-2">
              {title}
            </h1>
            <p className="text-xs text-accent font-semibold uppercase tracking-wider">
              {subtitle}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none text-secondary-text text-sm md:text-base leading-relaxed space-y-6">
            {children}
          </div>
        </div>
      </main>

      {/* Footer Details */}
      <footer className="border-t border-white/5 py-8 bg-[#070814]/90 relative z-10 text-secondary-text text-center text-xs">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-white/50 mb-2">
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-accent" />
              {businessConfig.email}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-accent" />
              {businessConfig.phone}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-accent" />
              {businessConfig.name}
            </span>
          </div>
          <p>© 2026 {businessConfig.name}. All rights reserved.</p>
          <p className="text-[10px] text-white/30">
            Official platform for the {businessConfig.courseName} program.
          </p>
        </div>
      </footer>
    </div>
  );
}
