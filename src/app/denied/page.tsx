import React from "react";
import Link from "next/link";
import { ShieldAlert, Home, CreditCard } from "lucide-react";

export default function AccessDenied() {
  return (
    <div className="min-h-screen bg-primary-bg flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-radial-glow font-sans">
      {/* Background glow spots */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full glow-emerald-spot pointer-events-none opacity-40" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full glow-orange-spot pointer-events-none opacity-30" />

      <div className="max-w-md w-full relative z-10 glass-card rounded-3xl overflow-hidden border border-white/10 shadow-2xl p-8 text-center flex flex-col items-center gap-6">
        <div className="w-16 h-16 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-500 mb-2 animate-pulse">
          <ShieldAlert className="w-10 h-10" />
        </div>

        <h1 className="text-3xl font-display font-black text-white">Access Denied</h1>
        <p className="text-sm text-secondary-text leading-relaxed">
          You do not have active enrollment for this course or the credentials to view this page. If you recently purchased, please verify your email invoice or try logging in again.
        </p>

        <div className="w-full flex flex-col gap-3 mt-4">
          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-gradient-to-r from-cta to-accent hover:from-accent hover:to-cta text-white font-display font-bold rounded-xl transition-all shadow-[0_10px_20px_rgba(255,106,0,0.25)]"
          >
            <CreditCard className="w-4 h-4" />
            <span>Buy Course / Access Funnel</span>
          </Link>

          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-secondary-bg hover:bg-secondary-bg/85 border border-white/10 text-white font-display font-semibold rounded-xl transition-all"
          >
            <Home className="w-4 h-4 text-accent" />
            <span>Go to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
