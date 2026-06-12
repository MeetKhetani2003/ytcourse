"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, Mail, Phone } from "lucide-react";
import Payment from "@/components/Payment";

export default function AddToCart() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.phone) {
      setIsCheckoutOpen(true);
    }
  };

  const learnings = [
    "How to build a faceless YouTube channel (no camera, no face, no voice)",
    "How to find high-paying USA niches (where 1000 views = more money)",
    "How to create videos in minutes using simple AI tools",
    "How to get views even if your channel is new",
    "Complete monetization system (AdSense + extra income sources)",
    "Real case studies of videos earning ₹50K–₹2L+",
    "Automation system to upload content consistently",
    "Live demo: channel setup + video creation",
    "Live Q&A to clear all your doubts",
  ];

  return (
    <div className="min-h-screen bg-primary-bg flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-radial-glow font-sans gap-8">
      
      {/* Background glow spots */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full glow-emerald-spot pointer-events-none opacity-30" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full glow-orange-spot pointer-events-none opacity-40" />

      <div className="max-w-5xl w-full relative z-10 glass-card rounded-3xl overflow-hidden border border-slate-200/50 shadow-2xl">
        
        {/* Main card two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Column: Form and Creator profile */}
          <div className="lg:col-span-6 p-6 md:p-10 flex flex-col justify-between">
            <div>
              {/* Mobile Banner Image - Visible First on Mobile */}
              <div className="block lg:hidden relative aspect-square w-full rounded-2xl overflow-hidden border border-slate-200/60 mb-6 shadow-sm">
                <Image
                  src="/webinar_banner.jpeg"
                  alt="Webinar Presentation Banner"
                  fill
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover animate-glow"
                  priority
                />
              </div>

              {/* Headline */}
              <h1 className="text-xl md:text-2xl font-display font-black text-slate-900 mb-3 leading-snug">
                Faceless YouTube Income Masterclass: How Beginners Are Making{" "}
                <span className="text-gradient-orange">₹1L–₹5L/Month</span> Without Showing Face
              </h1>

              {/* Price Tag */}
              <div className="flex items-center gap-2 mb-6">
                <span className="text-xs text-slate-500 font-semibold uppercase">Launch Fee:</span>
                <span className="text-sm text-slate-400 line-through">₹1,999</span>
                <span className="text-lg font-display font-extrabold text-accent">₹21 Only 🚀</span>
              </div>

              {/* Creator Profile Card */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex gap-4 mb-8">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-accent shrink-0">
                  <Image
                    src="/instructor.png"
                    alt="YT Gyan Abhishek"
                    fill
                    sizes="56px"
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <h2 className="font-display font-bold text-slate-900 text-sm md:text-base flex items-center gap-1">
                    YT Gyan Abhishek
                  </h2>
                  <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
                    My Internet Pays My Bills | 180k+ YouTube Family | Helping Beginners Build Income Using Faceless Channels
                  </p>
                </div>
              </div>

              {/* Registration Form */}
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="flex flex-col gap-1">
                  <label htmlFor="name" className="text-xs font-semibold text-slate-700">
                    Your Name <span className="text-accent">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="e.g. Ankit Kumar"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl glass-input text-slate-900 text-sm"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="email" className="text-xs font-semibold text-slate-700">
                    Email Address <span className="text-accent">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="e.g. ankit@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl glass-input text-slate-900 text-sm"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="phone" className="text-xs font-semibold text-slate-700">
                    WhatsApp Number <span className="text-accent">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 transform -translate-y-1/2 flex items-center pointer-events-none text-xs font-bold text-slate-400">
                      🇮🇳 +91
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      maxLength={10}
                      placeholder="9876543210"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-16 pr-4 py-3 rounded-xl glass-input text-slate-900 text-sm"
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                    <span>✓ Workshop credentials & updates will be dispatched to your</span>
                    <span className="font-semibold text-emerald-600">WhatsApp</span>
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full mt-6 cursor-pointer flex justify-center items-center py-4 px-6 bg-gradient-to-r from-cta to-accent hover:from-accent hover:to-cta text-white font-display font-black text-lg rounded-xl shadow-[0_10px_20px_rgba(79,70,229,0.15)] transition-all transform hover:-translate-y-0.5"
                >
                  Register Now at ₹21
                </button>
              </form>
            </div>

            {/* Gateway disclaimer logos */}
            <div className="border-t border-slate-100 pt-6 mt-8 text-center flex flex-col gap-2">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                Secure SSL Encrypted Checkout via Razorpay
              </span>
              <div className="flex justify-center items-center gap-4 opacity-80 text-xs text-slate-500">
                <span>UPI</span>
                <span>•</span>
                <span>Cards</span>
                <span>•</span>
                <span>NetBanking</span>
                <span>•</span>
                <span>Wallets</span>
              </div>
            </div>
          </div>

          {/* Right Column: Webinar Details & Learnings */}
          <div className="lg:col-span-6 bg-slate-50/50 p-6 md:p-10 border-l border-slate-100 flex flex-col justify-between">
            <div>
              {/* Webinar Image */}
              <div className="hidden lg:block relative aspect-square w-full rounded-2xl overflow-hidden border border-slate-100 mb-8 shadow-sm group">
                <Image
                  src="/webinar_banner.jpeg"
                  alt="Webinar Presentation Banner"
                  fill
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Masterclass details */}
              <div className="mb-8">
                <h3 className="text-sm font-display font-extrabold text-accent uppercase tracking-wider mb-3">
                  Masterclass Schedule:
                </h3>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2.5 text-slate-800 text-sm font-medium">
                    <Calendar className="w-4.5 h-4.5 text-accent" />
                    <span>14th June (Sunday)</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-slate-800 text-sm font-medium">
                    <Clock className="w-4.5 h-4.5 text-accent" />
                    <span>11:00 AM (IST)</span>
                  </div>
                </div>
              </div>

              {/* Core learnings bullet checklist */}
              <div className="mb-6">
                <h3 className="text-sm font-display font-extrabold text-slate-900 uppercase tracking-wider mb-4 leading-normal">
                  In This Masterclass, I’ll Show You the Exact Roadmap to Build & Monetize a Faceless YouTube Channel
                </h3>
                
                <ul className="flex flex-col gap-3">
                  {learnings.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs md:text-sm text-slate-600 leading-relaxed font-sans">
                      <span className="text-emerald-600 select-none font-sans font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact info support */}
              <div className="border-t border-slate-100 pt-6">
                <h3 className="text-xs font-display font-bold text-slate-900 uppercase tracking-wider mb-3">
                  Need Help? Contact Creator Support
                </h3>
                <div className="flex flex-col sm:flex-row gap-4 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-accent" />
                    <span>contactytgyans@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-accent" />
                    <span>+91 8700245625</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom policy links and footer reference */}
            <div className="border-t border-slate-100 pt-6 mt-8 flex flex-col items-center gap-2">
              <div className="flex items-center gap-4 text-2xs text-slate-400 font-semibold font-display">
                <Link href="#" className="hover:text-accent transition-colors">Terms & Conditions</Link>
                <span>•</span>
                <Link href="#" className="hover:text-accent transition-colors">Privacy Policy</Link>
                <span>•</span>
                <Link href="#" className="hover:text-accent transition-colors">Refund Policy</Link>
              </div>
              <span className="text-[10px] text-slate-400">Powered by CreatorLabs Funnels</span>
            </div>

          </div>

        </div>

      </div>

      {/* Simulated Razorpay Checkout popup modal */}
      <Payment isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />

    </div>
  );
}
