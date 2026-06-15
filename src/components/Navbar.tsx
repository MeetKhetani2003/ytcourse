"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { Menu, X, ArrowRight, User as UserIcon, LogOut, LayoutDashboard, ShieldCheck, Mail, Phone } from "lucide-react";

interface NavbarProps {
  onOpenCheckout?: () => void;
}


export default function Navbar({ onOpenCheckout }: NavbarProps) {
  const { data: session, status } = useSession();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);



  const hasPurchased = session?.user?.purchasedCourses?.includes("youtube-course");
  const isAdmin = session?.user?.role === "admin";

  const handleEnrollClick = () => {
    if (!session) {
      signIn("google");
    } else if (hasPurchased) {
      // already bought, route to course page
      window.location.href = "/course/youtube-masterclass";
    } else {
      if (onOpenCheckout) onOpenCheckout();
    }
  };


  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0A0B1A]/90 backdrop-blur-md border-b border-white/5 shadow-lg"
          : "bg-transparent"
      }`}
    >
      {/* Top Info Bar */}
      <div className={`w-full bg-[#070814]/90 border-b border-white/5 text-white/65 text-[10px] md:text-xs transition-all duration-300 overflow-hidden ${
        scrolled ? "max-h-0 opacity-0 py-0 border-b-0" : "max-h-12 py-2 opacity-100"
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 px-4 md:px-8 font-sans">
          {/* Left Side: Email & Phone */}
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <a href="mailto:zenvibe.011@gmail.com" className="flex items-center gap-1.5 hover:text-white transition-colors duration-300">
              <Mail className="w-3.5 h-3.5 text-accent" />
              <span>zenvibe.011@gmail.com</span>
            </a>
            {/* <span className="hidden sm:inline text-white/10">|</span>
            <a href="tel:+919305577957" className="flex items-center gap-1.5 hover:text-white transition-colors duration-300">
              <Phone className="w-3.5 h-3.5 text-accent" />
              <span>+91 9305577957</span>
            </a> */}
          </div>
          {/* Right Side: Instagram */}
          <div className="flex items-center gap-1.5">
            <a href="https://instagram.com/growwithamit8" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors duration-300">
              <svg className="w-3.5 h-3.5 text-accent shrink-0 fill-none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              <span>@growwithamit8</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className={`max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between transition-all duration-300 ${
        scrolled ? "py-2.5" : "py-4"
      }`}>
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-white font-display font-extrabold text-base md:text-lg">
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
        </Link>



        {/* Desktop CTA & Session Buttons */}
        <div className="hidden md:flex items-center gap-4">
          
          {/* Enroll / Go to Course */}
          {status !== "loading" && (
            <button
              onClick={handleEnrollClick}
              className="cursor-pointer flex items-center justify-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-cta to-accent hover:from-accent hover:to-cta text-white font-display font-bold text-sm rounded-xl transition-all"
            >
              <span>{hasPurchased ? "Go To Course" : "Enroll Now"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {/* User Session Handler */}
          {status === "loading" ? (
            <div className="w-9 h-9 rounded-full bg-white/5 animate-pulse" />
          ) : session ? (
            /* User Avatar Dropdown */
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-9 h-9 rounded-full overflow-hidden border border-white/20 hover:border-accent transition-colors cursor-pointer"
              >
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name || "User Avatar"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-secondary-bg flex items-center justify-center text-white text-sm">
                    <UserIcon className="w-4 h-4" />
                  </div>
                )}
              </button>

              {/* Dropdown Box */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-secondary-bg border border-white/10 rounded-2xl shadow-xl py-2 z-50 text-sm overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-2.5 border-b border-white/5">
                    <p className="font-display font-bold text-white truncate text-xs">{session.user.name}</p>
                    <p className="text-[10px] text-secondary-text truncate">{session.user.email}</p>
                  </div>
                  
                  <Link
                    href="/dashboard"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4 text-accent" />
                    <span>My Dashboard</span>
                  </Link>

                  {isAdmin && (
                    <Link
                      href="/admin"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>Admin Panel</span>
                    </Link>
                  )}

                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      signOut({ callbackUrl: "/" });
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors text-left cursor-pointer border-t border-white/5 mt-1"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Continue with Google Login Button */
            <button
              onClick={() => signIn("google")}
              className="cursor-pointer px-4 py-2 bg-secondary-bg hover:bg-secondary-bg/80 border border-white/10 hover:border-white/20 text-white font-display font-bold text-xs rounded-xl transition-all"
            >
              Login
            </button>
          )}

        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-3 md:hidden">
          {session && (
            <Link
              href="/dashboard"
              className="w-8 h-8 rounded-full overflow-hidden border border-white/20"
            >
              {session.user.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name || "Avatar"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-secondary-bg flex items-center justify-center text-white text-xs">
                  <UserIcon className="w-3.5 h-3.5" />
                </div>
              )}
            </Link>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-white/5 text-white hover:bg-white/10 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute inset-x-0 top-full bg-secondary-bg border-b border-white/10 p-5 flex flex-col gap-4 shadow-2xl z-40 text-sm">


          {session && (
            <div className="flex flex-col gap-2">
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-white/80 py-1"
              >
                <LayoutDashboard className="w-4 h-4 text-accent" />
                <span>My Dashboard</span>
              </Link>
              {isAdmin && (
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-white/80 py-1"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Admin Panel</span>
                </Link>
              )}
            </div>
          )}

          <div className="flex flex-col gap-2 mt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleEnrollClick();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-cta to-accent text-white font-display font-bold rounded-xl text-xs"
            >
              <span>{hasPurchased ? "Go To Course" : "Enroll Now"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {session ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  signOut({ callbackUrl: "/" });
                }}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-red-500/10 text-red-400 font-display font-bold rounded-xl text-xs border border-red-500/20"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  signIn("google");
                }}
                className="w-full flex items-center justify-center py-2 px-4 bg-white/5 border border-white/10 text-white font-display font-bold rounded-xl text-xs"
              >
                Login with Google
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
