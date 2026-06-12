"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { 
  Globe, 
  Search, 
  Palette, 
  FileText, 
  Mic, 
  Video, 
  Image as ImageIcon, 
  TrendingUp, 
  DollarSign, 
  Zap 
} from "lucide-react";

export default function WhatYouWillLearn() {
  const features = [
    {
      icon: <Globe className="w-6 h-6 text-accent" />,
      title: "USA Channel Creation",
      desc: "Learn how to establish your channel directly in the high-CPM US market from anywhere in the world without VPN issues."
    },
    {
      icon: <Search className="w-6 h-6 text-accent" />,
      title: "Niche Selection",
      desc: "Discover high CPM, low competition niches that pull in passive views and pay up to 10x more per 1,000 views."
    },
    {
      icon: <Palette className="w-6 h-6 text-accent" />,
      title: "Channel Branding",
      desc: "Design layouts, banners, and logos using AI tools to build a highly professional, trustworthy brand identity."
    },
    {
      icon: <FileText className="w-6 h-6 text-accent" />,
      title: "Script Writing",
      desc: "Master high-retention script structure designed specifically to hack the YouTube algorithm and maximize watch time."
    },
    {
      icon: <Mic className="w-6 h-6 text-accent" />,
      title: "AI Voiceovers",
      desc: "Generate hyper-realistic, monetization-safe human AI voices that viewers love, saving you thousands on voice artists."
    },
    {
      icon: <Video className="w-6 h-6 text-accent" />,
      title: "Video Editing",
      desc: "Create dynamic, high-engagement video edits quickly using templates, dynamic captions, transitions, and stock footage."
    },
    {
      icon: <ImageIcon className="w-6 h-6 text-accent" />,
      title: "Thumbnail Design",
      desc: "Create high-CTR thumbnails using proven color theory, psychological hooks, and automated design generators."
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-accent" />,
      title: "SEO Optimization",
      desc: "Use advanced keyword research, strategic tagging, titles, and descriptions to ensure your videos rank #1 on search."
    },
    {
      icon: <DollarSign className="w-6 h-6 text-accent" />,
      title: "Monetization Mastery",
      desc: "Unlock multiple revenue streams including AdSense, affiliate funnels, sponsorships, and digital downloads."
    },
    {
      icon: <Zap className="w-6 h-6 text-accent" />,
      title: "Scaling Strategies",
      desc: "Automate your entire workflow, hire scriptwriters & editors, and build a channel portfolio to compound your revenue."
    }
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section className="py-24 px-4 md:px-8 bg-secondary-bg/30 relative overflow-hidden" id="what-you-will-learn">
      {/* Background radial glows */}
      <div className="absolute top-1/3 left-0 w-80 h-80 glow-emerald-spot pointer-events-none opacity-30" />
      <div className="absolute bottom-1/3 right-0 w-80 h-80 glow-orange-spot pointer-events-none opacity-20" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-accent font-display uppercase tracking-wider text-sm font-bold mb-2">
            Curriculum Blueprint
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white mb-6">
            Complete Core Skills Mastered
          </h2>
          <p className="text-lg text-secondary-text font-sans">
            We cover everything from setup to scaling. No prior experience, voice recording, or camera skills needed.
          </p>
        </div>

        {/* Feature Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="glass-card glass-card-hover p-6 rounded-2xl flex flex-col items-start"
            >
              {/* Icon Container */}
              <div className="p-3 rounded-xl bg-primary-bg border border-white/5 mb-5 shadow-inner">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-display font-extrabold text-white mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-sm md:text-base text-secondary-text leading-relaxed font-sans">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
