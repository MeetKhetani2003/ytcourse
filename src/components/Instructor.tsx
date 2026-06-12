"use client";

import React from "react";
import Image from "next/image";
import { Award, ShieldCheck, Heart, User, CheckCircle2 } from "lucide-react";

export default function Instructor() {
  const achievements = [
    "Built 12+ profitable faceless YouTube channels",
    "Generated over 15 million organic views in US market",
    "Successfully mentored 5,000+ students worldwide",
    "Consulted top creators on automation & editing workflows"
  ];

  return (
    <section className="py-24 px-4 md:px-8 bg-[#061218] relative overflow-hidden" id="instructor-section">
      {/* Background glow spots */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 glow-emerald-spot pointer-events-none opacity-20" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 glow-orange-spot pointer-events-none opacity-25" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-accent font-display uppercase tracking-wider text-sm font-bold mb-2">
            Meet Your Mentor
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white">
            Who Is Teaching You?
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Col: Image Showcase */}
          <div className="lg:col-span-5 flex justify-center relative">
            {/* Main Image Container */}
            <div className="relative w-80 h-[420px] md:w-96 md:h-[480px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl z-10">
              <Image
                src="/instructor.png"
                alt="Lead Instructor Portrait"
                fill
                sizes="(max-width: 768px) 320px, 384px"
                className="object-cover object-top filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-bg via-transparent to-transparent opacity-60" />
            </div>

            {/* Glowing Ring Frame */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[105%] h-[105%] border-2 border-accent/20 rounded-[36px] pointer-events-none animate-pulse-slow scale-95" />
            
            {/* Quick Stats Overlay Card */}
            <div className="absolute -bottom-6 right-0 md:-right-6 glass-card p-4 rounded-xl shadow-xl z-20 flex items-center gap-3 border-accent/20">
              <div className="p-2.5 rounded-lg bg-accent/20 text-accent">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-secondary-text font-semibold block">Silver Play Button</span>
                <span className="text-base font-display font-extrabold text-white">100K+ Subscriber Channel</span>
              </div>
            </div>
          </div>

          {/* Right Col: Story & Credentials */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <span className="text-xs font-display font-extrabold text-accent uppercase tracking-widest block mb-2">
              Founder Profile & Lead Strategist
            </span>
            <h3 className="text-2xl md:text-3xl font-display font-black text-white mb-6">
              Hi, I&apos;m Meet, Founder of Faceless Mastery.
            </h3>

            {/* Story paragraphs */}
            <div className="text-sm md:text-base text-secondary-text font-sans flex flex-col gap-4 mb-6 leading-relaxed">
              <p>
                Like many of you, I started my YouTube journey hoping to build a side income. I spent months scriptwriting, voice recording, and editing videos targeting regional audiences, only to realize that the low CPM meant I made barely enough to cover my internet bill.
              </p>
              <p>
                Everything changed when I targeted the **US market**. By publishing content tailored to high-CPM audiences in the USA and using automation frameworks, my estimated revenue skyrocketed from $0.40 CPM to over **$15.00 CPM**.
              </p>
              <p>
                I developed a systematic blueprint that removes the need for a camera, voice recording, or expensive editing software. Today, I manage a network of cash cow channels and have packaged my entire process into this practical, hands-on masterclass.
              </p>
            </div>

            {/* Bullet points check list */}
            <div className="w-full mb-6">
              <h4 className="text-sm font-display font-bold text-white uppercase tracking-wider mb-3">
                Key Career Accomplishments:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {achievements.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-sm text-white/90">
                    <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                    <span className="font-sans leading-tight">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-6 border-t border-white/5 pt-6 w-full">
              <div className="flex items-center gap-2 text-xs text-secondary-text">
                <ShieldCheck className="w-4 h-4 text-accent" />
                <span className="font-medium text-white/80">Verified Mentor Status</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-secondary-text">
                <User className="w-4 h-4 text-accent" />
                <span className="font-medium text-white/80">100% Student Support</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-secondary-text">
                <Heart className="w-4 h-4 text-accent" />
                <span className="font-medium text-white/80">Creator Community Champion</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
