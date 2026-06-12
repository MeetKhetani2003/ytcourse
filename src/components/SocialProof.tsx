"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Star } from "lucide-react";

export default function SocialProof() {
  const stats = [
    { value: "5,000+", label: "Active Students Enrolled" },
    { value: "150+", label: "Faceless Channels Launched" },
    { value: "2.4M+", label: "Views Generated on YouTube" },
    { value: "4.9★", label: "Average Student Rating" },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section className="py-20 px-4 md:px-8 bg-[#061218] relative overflow-hidden">
      {/* Background glow overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-64 glow-emerald-spot pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-accent font-display uppercase tracking-wider text-sm font-bold mb-2">
            Proven Creator Performance
          </p>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white">
            Our Student Results Speak For Themselves
          </h2>
        </div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="glass-card p-6 md:p-8 rounded-2xl flex flex-col items-center text-center relative overflow-hidden group hover:border-accent/20 transition-all duration-300 shadow-xl"
            >
              {/* Subtle top indicator bar */}
              <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-accent/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              
              {/* Stat Value */}
              <span className="text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tight text-gradient-orange mb-3 block">
                {stat.value}
              </span>
              
              {/* Rating representation */}
              {stat.value.includes("★") && (
                <div className="flex text-accent gap-0.5 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent stroke-none" />
                  ))}
                </div>
              )}

              {/* Label */}
              <span className="text-sm md:text-base text-secondary-text font-medium leading-tight">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
