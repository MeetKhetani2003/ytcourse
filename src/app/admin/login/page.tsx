"use client";

import React, { useState } from "react";
import { ShieldCheck, Lock, User, ArrowRight, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Successful login, redirect to admin control center
        window.location.href = "/admin";
      } else {
        setError(data.message || "Invalid credentials, please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0B1A] flex flex-col items-center justify-center text-white font-sans relative overflow-hidden px-4">
      {/* Background decorations */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-orange-500/10 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo and Brand */}
        <div className="flex flex-col items-center mb-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 mb-4 shadow-emerald-500/5 shadow-2xl">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <h1 className="font-display font-black text-2xl tracking-wide text-white">
            LMS Control Center
          </h1>
          <p className="text-xs text-secondary-text mt-1 uppercase tracking-widest font-bold">
            Administrator Gateway
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-[#15172C]/60 border border-white/5 rounded-3xl p-8 shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-8 duration-700">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-xs font-semibold animate-in shake duration-300">
                {error}
              </div>
            )}

            {/* Username Input */}
            <div className="flex flex-col gap-2">
              <label className="text-2xs font-semibold text-secondary-text uppercase tracking-wider">
                Username
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-white/30">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  required
                  placeholder="Enter admin username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-[#0A0B1A]/80 border border-white/5 focus:border-emerald-500/50 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-white/20 focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-2">
              <label className="text-2xs font-semibold text-secondary-text uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-white/30">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  required
                  placeholder="Enter account password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#0A0B1A]/80 border border-white/5 focus:border-emerald-500/50 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-white/20 focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] disabled:opacity-50 disabled:scale-100 text-[#0A0B1A] font-extrabold text-sm py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>Authenticate Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Back Link */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-2xs text-secondary-text hover:text-white transition-colors uppercase tracking-wider font-semibold"
          >
            ← Return to Landing Site
          </a>
        </div>
      </div>
    </div>
  );
}
