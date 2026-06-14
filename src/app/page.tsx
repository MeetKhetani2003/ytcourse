"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useSession, signIn } from "next-auth/react";
import { Calendar, Clock, Mail, Phone, Flame } from "lucide-react";

import Navbar from "@/components/Navbar";
import Payment from "@/components/Payment";
import ConversionFeatures from "@/components/ConversionFeatures";

export default function Home() {
  const { data: session, status } = useSession();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

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

  const hasPurchased = session?.user?.purchasedCourses?.includes("youtube-course");

  const handleCtaClick = () => {
    if (!session) {
      signIn("google");
    } else if (hasPurchased) {
      window.location.href = "/course/youtube-masterclass";
    } else {
      setIsCheckoutOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-primary-bg flex flex-col items-center py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-radial-glow font-sans gap-8">
      {/* Navbar Integration */}
      <Navbar onOpenCheckout={() => setIsCheckoutOpen(true)} />
      
      {/* Background glow spots and rings */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full glow-emerald-spot pointer-events-none opacity-50" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full glow-orange-spot pointer-events-none opacity-40" />
      
      <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
        <div className="w-[600px] h-[600px] border border-dashed border-white/10 rounded-full animate-[spin_180s_linear_infinite]" />
      </div>

      <div className="max-w-5xl w-full relative z-10 glass-card rounded-3xl overflow-hidden border border-white/10 shadow-2xl mt-8">
        
        {/* Main card two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Column: Checkout Card and Creator profile */}
          <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between">
            <div>
              {/* Mobile Banner Image - Visible First on Mobile */}
              <div className="block lg:hidden relative aspect-square w-full rounded-2xl overflow-hidden border border-white/10 mb-6 shadow-sm">
                <Image
                  src="/webinar_banner.jpeg"
                  alt="Webinar Presentation Banner"
                  fill
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover animate-glow"
                  priority
                />
              </div>

              {/* Special Launch Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 border border-accent/20 text-accent font-display text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-5">
                <Flame className="w-3.5 h-3.5" /> 2026 Updated Video Masterclass
              </div>

              {/* Title */}
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-display font-black text-white mb-4 leading-tight">
                Faceless YouTube Income Masterclass: How Beginners Are Making{" "}
                <span className="text-gradient-orange">₹1L–₹5L/Month</span> Without Showing Face
              </h1>

              {/* Price Tag with Strikethrough */}
              <div className="flex items-center gap-3 mb-6 bg-white/5 border border-white/5 p-3 rounded-xl w-fit">
                <span className="text-xs text-secondary-text font-semibold uppercase">Enrollment Fee:</span>
                <span className="text-sm text-white/40 line-through">₹9,999</span>
                <span className="text-base font-display font-black text-accent">₹3,200</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-500/20 text-red-500 border border-red-500/30 uppercase">
                  Special Launch Offer
                </span>
              </div>

              {/* Creator Profile Card */}
              <div className="p-4 rounded-2xl bg-secondary-bg/60 border border-white/5 flex gap-4 mb-6 items-start hover:border-accent/20 transition-colors duration-300">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-accent shrink-0">
                  <Image
                    src="/instructor.png"
                    alt="Amit Maurya"
                    fill
                    sizes="56px"
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <h2 className="font-display font-bold text-white text-sm md:text-base flex items-center gap-1.5">
                    Amit Maurya
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold font-sans uppercase">Verified</span>
                  </h2>
                  <p className="text-xs text-secondary-text leading-relaxed mt-1">
                    My Internet Pays My Bills • 180k+ YouTube Family • Helping Beginners Build Passive Income Using Faceless Channels
                  </p>
                </div>
              </div>

              {/* Dynamic Checkout Interaction Panel */}
              <div className="p-5 rounded-2xl bg-[#0A0B1A]/80 border border-white/5 shadow-inner mb-6">
                {status === "loading" ? (
                  <div className="flex flex-col items-center justify-center py-8 gap-2">
                    <span className="h-6 w-6 rounded-full border-2 border-accent border-t-transparent animate-spin" />
                    <span className="text-xs text-secondary-text">Checking registration status...</span>
                  </div>
                ) : !session ? (
                  /* Case 1: Unauthenticated */
                  <div className="flex flex-col gap-4 text-center">
                    <p className="text-xs text-secondary-text leading-relaxed">
                      Enroll in the course instantly. Single-click Google login is required to process billing and deliver access credentials.
                    </p>
                    <button
                      onClick={() => signIn("google")}
                      className="w-full flex items-center justify-center gap-3 py-3.5 px-6 bg-white text-black font-display font-black text-sm rounded-xl hover:bg-white/95 transition-all shadow-[0_10px_20px_rgba(255,255,255,0.05)] cursor-pointer"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.69a5.74 5.74 0 0 1-2.5 3.77v3.13h4.05c2.37-2.18 3.5-5.4 3.5-9.75Z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 24c3.24 0 5.97-1.08 7.96-2.91l-4.05-3.13c-1.12.75-2.55 1.2-3.91 1.2-3.01 0-5.56-2.03-6.47-4.77H1.36v3.23C3.33 21.6 7.42 24 12 24Z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.53 14.39a7.18 7.18 0 0 1 0-4.78V6.38H1.36a11.98 11.98 0 0 0 0 11.24l4.17-3.23Z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.43-3.43C17.96 1.19 15.24 0 12 0 7.42 0 3.33 2.4 1.36 6.38l4.17 3.23c.91-2.74 3.46-4.86 6.47-4.86Z"
                        />
                      </svg>
                      <span>Continue with Google</span>
                    </button>
                  </div>
                ) : hasPurchased ? (
                  /* Case 2: Enrolled */
                  <div className="flex flex-col gap-4 text-center">
                    <div className="text-xs text-emerald-400 font-bold uppercase tracking-wider flex items-center justify-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                      Enrolled & Active
                    </div>
                    <p className="text-xs text-secondary-text leading-relaxed">
                      Welcome back, <strong>{session.user.name?.split(" ")[0]}</strong>! You own this course. Visit the player to stream protected videos.
                    </p>
                    <Link
                      href="/course/youtube-masterclass"
                      className="w-full flex justify-center items-center py-3.5 px-6 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-teal-600 hover:to-emerald-500 text-white font-display font-black text-sm rounded-xl transition-all shadow-[0_10px_20px_rgba(16,185,129,0.2)]"
                    >
                      Go To Course
                    </Link>
                  </div>
                ) : (
                  /* Case 3: Logged In, Not Enrolled */
                  <div className="flex flex-col gap-4 text-center">
                    <p className="text-xs text-secondary-text leading-relaxed">
                      Logged in as <strong>{session.user.email}</strong>. Ready to secure your masterclass access.
                    </p>
                    <button
                      onClick={handleCtaClick}
                      className="w-full flex justify-center items-center py-3.5 px-6 bg-gradient-to-r from-cta to-accent hover:from-accent hover:to-cta text-white font-display font-black text-sm rounded-xl shadow-[0_10px_20px_rgba(255,106,0,0.25)] hover:shadow-[0_15px_25px_rgba(255,106,0,0.35)] transition-all cursor-pointer"
                    >
                      Buy Course (Apply Coupon)
                    </button>
                  </div>
                )}
              </div>

            </div>

            {/* Gateway disclaimer logos */}
            <div className="border-t border-white/5 pt-6 mt-6 text-center flex flex-col gap-2">
              <span className="text-[10px] text-white/45 uppercase tracking-wider block font-semibold">
                🔒 Secure SSL Encrypted Checkout via Razorpay
              </span>
              <div className="flex justify-center items-center gap-5 opacity-60 text-xs text-white/80 font-display">
                <span>UPI</span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span>GPay</span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span>Cards</span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span>NetBanking</span>
              </div>
            </div>
          </div>

          {/* Right Column: Masterclass Details & Learnings */}
          <div className="lg:col-span-6 bg-secondary-bg/40 p-6 sm:p-10 border-l border-white/5 flex flex-col justify-between">
            <div>
              {/* Webinar Image */}
              <div className="hidden lg:block relative aspect-square w-full rounded-2xl overflow-hidden border border-white/10 mb-8 shadow-sm group">
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
                <h3 className="text-xs font-display font-extrabold text-accent uppercase tracking-wider mb-3 block">
                  Masterclass Deliverables:
                </h3>
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center gap-2.5 text-white/95 text-sm font-semibold">
                    <Calendar className="w-4.5 h-4.5 text-accent shrink-0" />
                    <span>Self-Paced Streaming Video Portal</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-white/95 text-sm font-semibold">
                    <Clock className="w-4.5 h-4.5 text-accent shrink-0" />
                    <span>Lifetime Access (Free Updates)</span>
                  </div>
                </div>
              </div>

              {/* Core learnings bullet checklist */}
              <div className="mb-6">
                <h3 className="text-xs font-display font-extrabold text-white uppercase tracking-wider mb-4 leading-normal">
                  Roadmap to Build & Monetize a Faceless YouTube Channel:
                </h3>
                
                <ul className="flex flex-col gap-3">
                  {learnings.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs md:text-sm text-secondary-text leading-relaxed font-sans">
                      <span className="text-emerald-400 select-none shrink-0 font-bold font-sans">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact info support */}
              <div className="border-t border-white/5 pt-6 mt-6">
                <h3 className="text-xs font-display font-extrabold text-white uppercase tracking-wider mb-3">
                  Need Help? Contact Creator Support
                </h3>
                <div className="flex flex-col gap-2 text-xs text-secondary-text">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-accent shrink-0" />
                    <span>zenvibe.011@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-accent shrink-0" />
                    <span>+91 9305577957</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 stroke-current text-accent shrink-0 fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                    <a
                      href="https://instagram.com/growwithamit8"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent transition-colors"
                    >
                      @growwithamit8
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom policy links and footer reference */}
            <div className="border-t border-white/5 pt-6 mt-8 flex flex-col items-center gap-2.5">
              <div className="flex items-center gap-4 text-2xs text-white/40 font-semibold font-display">
                <a href="#" className="hover:text-accent transition-colors">Terms & Conditions</a>
                <span>•</span>
                <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
                <span>•</span>
                <a href="#" className="hover:text-accent transition-colors">Refund Policy</a>
              </div>
              <span className="text-[9px] text-white/25">Powered by CreatorLabs Funnels</span>
            </div>

          </div>

        </div>

      </div>

      {/* Razorpay Checkout modal popup */}
      <Payment isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />

      {/* Floating purchase notifier, active users counter */}
      <ConversionFeatures onOpenCheckout={handleCtaClick} />

    </div>
  );
}
