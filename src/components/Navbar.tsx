"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";

interface NavbarProps {
  onOpenCheckout: () => void;
}

export default function Navbar({ onOpenCheckout }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Core Skills", href: "#what-you-will-learn" },
    { label: "Curriculum", href: "#curriculum-section" },
    { label: "Results", href: "#results-section" },
    { label: "Reviews", href: "#testimonials-section" },
    { label: "FAQ", href: "#faq-section" }
  ];

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-primary-bg/85 backdrop-blur-md border-b border-white/5 py-4 shadow-lg"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 text-white font-display font-extrabold text-base md:text-lg">
          <div className="p-1.5 rounded-lg bg-red-600 flex items-center justify-center text-white shrink-0">
            <svg
              className="w-4 h-4 fill-current text-white shrink-0"
              viewBox="0 0 24 24"
            >
              <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.507 9.388.507 9.388.507s7.518 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </div>
          <span className="hidden sm:inline">Faceless USA Masterclass</span>
          <span className="sm:hidden">Faceless USA</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-display font-semibold text-secondary-text">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-white transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={onOpenCheckout}
            className="cursor-pointer flex items-center justify-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-cta to-accent hover:from-accent hover:to-cta text-white font-display font-bold text-sm rounded-xl transition-all"
          >
            <span>Enroll Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg bg-white/5 text-white hover:bg-white/10"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[73px] bg-secondary-bg border-b border-white/10 p-6 flex flex-col gap-5 shadow-2xl z-40">
          <div className="flex flex-col gap-4 text-base font-display font-semibold text-secondary-text">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenCheckout();
            }}
            className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-gradient-to-r from-cta to-accent text-white font-display font-bold rounded-xl"
          >
            <span>Enroll Now</span>
            <ArrowRight className="w-4.5 h-4.5" />
          </button>
        </div>
      )}
    </nav>
  );
}
