"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle } from "lucide-react";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Rohan Sharma",
      niche: "Finance & Investing",
      result: "$1,450 / month in 45 days",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      quote: "This course is a goldmine. I previously built channels targeting Indian audiences and made pennies. Applying the USA CPM strategy, my revenue exploded. With just 4 videos online, I crossed $1,400 in passive ad income!",
      metrics: { views: "45.2K", watchTime: "8.4K Hrs", revenue: "$1,450.22" }
    },
    {
      name: "Emily Vance",
      niche: "Tech Gadgets & AI Tech",
      result: "12,000+ Subs in 2 Months",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
      quote: "Creating faceless videos sounded intimidating, but the AI prompt vaults and voice tools make it a breeze. I don't even use my own voice. The scripts generated are top notch and have incredible user retention.",
      metrics: { views: "189.5K", watchTime: "32.0K Hrs", revenue: "$2,890.54" }
    },
    {
      name: "Kabir Mehta",
      niche: "Luxury Lifestyle & Travel",
      result: "$3,200 AdSense + Affiliate Sales",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      quote: "The scaling modules alone are worth the price. I've automated my entire editing and scriptwriting pipeline using the hiring templates. I spend only 2 hours a week reviewing videos, and the channel runs on autopilot.",
      metrics: { views: "92.1K", watchTime: "19.8K Hrs", revenue: "$3,210.15" }
    }
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const activeTestimonial = testimonials[currentIndex];

  return (
    <section className="py-24 px-4 md:px-8 bg-[#061218] relative overflow-hidden" id="testimonials-section">
      {/* Glow Rings */}
      <div className="absolute top-1/2 left-0 w-80 h-80 glow-emerald-spot pointer-events-none opacity-20" />
      <div className="absolute top-1/3 right-0 w-80 h-80 glow-orange-spot pointer-events-none opacity-20 animate-pulse-slow" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-accent font-display uppercase tracking-wider text-sm font-bold mb-2">
            Student Transformations
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white mb-6">
            From Zero To Dollar Cash Cows
          </h2>
          <p className="text-secondary-text font-sans max-w-xl mx-auto">
            See how our students are building long-term assets and escaping the low-CPM Asian market.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          
          {/* Main Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-secondary-bg/30 border border-white/8 rounded-3xl p-6 md:p-10 backdrop-blur-md shadow-2xl relative">
            <Quote className="absolute top-6 right-8 w-16 h-16 text-white/5 pointer-events-none" />

            {/* Left Col: Student Meta & Quote */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              
              {/* Stars */}
              <div className="flex text-accent gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent stroke-none" />
                ))}
              </div>

              {/* Quote text */}
              <p className="text-lg md:text-xl text-white font-sans italic leading-relaxed mb-8">
                &ldquo;{activeTestimonial.quote}&rdquo;
              </p>

              {/* Profile details */}
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-accent">
                  <Image
                    src={activeTestimonial.avatar}
                    alt={activeTestimonial.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-lg font-display font-extrabold text-white flex items-center gap-1.5">
                    {activeTestimonial.name}
                    <CheckCircle className="w-4 h-4 text-success fill-success/10" />
                  </h4>
                  <p className="text-xs text-secondary-text font-semibold">
                    Niche: {activeTestimonial.niche} • <span className="text-accent">{activeTestimonial.result}</span>
                  </p>
                </div>
              </div>

            </div>

            {/* Right Col: Performance Snippet Card */}
            <div className="lg:col-span-5 flex flex-col items-center">
              
              <div className="w-full glass-card bg-[#061218]/80 p-6 rounded-2xl border border-white/10 shadow-lg relative">
                <span className="text-[10px] text-accent font-display uppercase tracking-widest font-extrabold block mb-1">
                  Verified AdSense Analytics
                </span>
                <span className="text-xs text-secondary-text">Last 30 Days Channel Stats</span>

                <div className="h-px bg-white/5 my-4" />

                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-secondary-text">Estimated Revenue</span>
                    <span className="text-lg font-display font-extrabold text-accent">
                      {activeTestimonial.metrics.revenue}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-secondary-text">Channel Views</span>
                    <span className="text-sm font-display font-bold text-white">
                      {activeTestimonial.metrics.views}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-secondary-text">Watch Time</span>
                    <span className="text-sm font-display font-bold text-white">
                      {activeTestimonial.metrics.watchTime}
                    </span>
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-lg bg-success/10 border border-success/20 text-center">
                  <span className="text-xs font-semibold text-success">
                    ✓ Partner Program Approved & Monetized
                  </span>
                </div>
              </div>

            </div>

          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-secondary-bg hover:bg-secondary-bg/85 border border-white/5 hover:border-white/10 text-white cursor-pointer transition-all duration-300 active:scale-95 shadow-md"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex gap-1.5">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === idx ? "w-8 bg-accent" : "w-2 bg-white/20"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-secondary-bg hover:bg-secondary-bg/85 border border-white/5 hover:border-white/10 text-white cursor-pointer transition-all duration-300 active:scale-95 shadow-md"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
