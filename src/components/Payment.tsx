"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, CreditCard, CheckCircle2, X, ArrowRight, Smartphone } from "lucide-react";

interface PaymentProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Payment({ isOpen, onClose }: PaymentProps) {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [step, setStep] = useState<"details" | "payment" | "success">("details");
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card">("upi");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDetailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.phone) {
      setStep("payment");
    }
  };

  const handleProcessPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep("success");
    }, 2000);
  };

  const resetModal = () => {
    setFormData({ name: "", email: "", phone: "" });
    setStep("details");
    onClose();
  };


  return (
    <>
      {/* Modal backdrop */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={resetModal}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
            />
 
            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-md bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-2xl z-10 p-6 md:p-8"
            >
              {/* Close Button */}
              <button
                onClick={resetModal}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
 
              {/* Step 1: User Details Form */}
              {step === "details" && (
                <form onSubmit={handleDetailSubmit} className="flex flex-col gap-4">
                  <div className="text-center mb-4">
                    <span className="text-xs text-accent font-display uppercase font-bold tracking-wider">
                      Step 1 of 2
                    </span>
                    <h3 className="text-xl md:text-2xl font-display font-extrabold text-slate-900">
                      Enter Details
                    </h3>
                    <p className="text-xs text-secondary-text">
                      We&apos;ll send course login credentials to this email.
                    </p>
                  </div>
 
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-slate-700">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Rohan Sharma"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="px-4 py-3 rounded-xl glass-input text-slate-900 text-sm"
                    />
                  </div>
 
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-slate-700">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="e.g. rohan@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="px-4 py-3 rounded-xl glass-input text-slate-900 text-sm"
                    />
                  </div>
 
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-slate-700">Phone Number (WhatsApp)</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="e.g. +91 9876543210"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="px-4 py-3 rounded-xl glass-input text-slate-900 text-sm"
                    />
                  </div>
 
                  <button
                    type="submit"
                    className="w-full mt-4 cursor-pointer flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-cta to-accent text-white font-display font-bold rounded-xl shadow-[0_10px_20px_rgba(79,70,229,0.15)] hover:opacity-95 transition-all"
                  >
                    <span>Proceed to Payment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
 
              {/* Step 2: Payment Portal Sim */}
              {step === "payment" && (
                <div className="flex flex-col gap-5">
                  <div className="text-center">
                    <span className="text-xs text-accent font-display uppercase font-bold tracking-wider">
                      Step 2 of 2
                    </span>
                    <h3 className="text-xl md:text-2xl font-display font-extrabold text-slate-900">
                      Simulated Payment
                    </h3>
                    <p className="text-xs text-secondary-text">Razorpay Test Gateway Sandbox</p>
                  </div>
 
                  {/* Pricing Overview */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-sm">
                    <div>
                      <span className="text-xs text-secondary-text block">Enrollment Cost</span>
                      <span className="font-semibold text-slate-900">Faceless USA YouTube Masterclass</span>
                    </div>
                    <span className="text-xl font-display font-extrabold text-accent">₹21</span>
                  </div>
 
                  {/* Payment Methods tabs */}
                  <div className="grid grid-cols-2 gap-2 bg-slate-50 rounded-lg p-1 border border-slate-100">
                    <button
                      onClick={() => setPaymentMethod("upi")}
                      className={`py-2 px-3 rounded-md text-xs font-display font-bold flex items-center justify-center gap-1.5 transition-all ${
                        paymentMethod === "upi" ? "bg-white text-accent shadow-sm border border-slate-200/50" : "text-secondary-text"
                      }`}
                    >
                      <Smartphone className="w-4 h-4" />
                      <span>UPI / GPay</span>
                    </button>
                    <button
                      onClick={() => setPaymentMethod("card")}
                      className={`py-2 px-3 rounded-md text-xs font-display font-bold flex items-center justify-center gap-1.5 transition-all ${
                        paymentMethod === "card" ? "bg-white text-accent shadow-sm border border-slate-200/50" : "text-secondary-text"
                      }`}
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Cards / NetBanking</span>
                    </button>
                  </div>
 
                  {/* Method Content */}
                  <div className="min-h-[60px] flex flex-col justify-center text-center">
                    {paymentMethod === "upi" ? (
                      <p className="text-xs text-secondary-text">
                        UPI QR and direct options will simulate app redirection. Supports Google Pay, PhonePe, Paytm, BHIM, and net banking.
                      </p>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <input
                          type="text"
                          disabled
                          placeholder="Card Details (Disabled in Simulator)"
                          className="px-3 py-2 rounded-lg glass-input text-xs text-slate-400 cursor-not-allowed text-center"
                        />
                      </div>
                    )}
                  </div>
 
                  <button
                    onClick={handleProcessPayment}
                    disabled={isProcessing}
                    className="w-full cursor-pointer flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-success to-accent text-white font-display font-bold rounded-xl shadow-[0_10px_20px_rgba(16,185,129,0.15)]"
                  >
                    {isProcessing ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                        Processing Securely...
                      </span>
                    ) : (
                      <span>Simulate Success Payment</span>
                    )}
                  </button>
                </div>
              )}
 
              {/* Step 3: Success Confirmation */}
              {step === "success" && (
                <div className="flex flex-col items-center text-center gap-4 py-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-2 animate-bounce">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
 
                  <span className="text-xs text-emerald-600 font-display uppercase font-extrabold tracking-widest">
                    Payment Success
                  </span>
                  
                  <h3 className="text-2xl font-display font-black text-slate-900">
                    Welcome to the Masterclass, {formData.name.split(" ")[0]}!
                  </h3>
 
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 text-left flex flex-col gap-2 w-full">
                    <p>
                      <strong>Email:</strong> {formData.email}
                    </p>
                    <p>
                      <strong>Phone:</strong> {formData.phone}
                    </p>
                    <p className="border-t border-slate-150 pt-2 mt-1">
                      ✓ An activation link and Discord community invite has been dispatched. Please check your inbox (including promotions/spam).
                    </p>
                  </div>
 
                  <button
                    onClick={resetModal}
                    className="w-full mt-4 cursor-pointer px-6 py-3 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 font-display font-semibold rounded-xl transition-all"
                  >
                    Close & Return to Page
                  </button>
                </div>
              )}
 
            </motion.div>
 
          </div>
        )}
      </AnimatePresence>
 
      {/* Static Payment & Trust Section */}
      <section className="w-full py-12 bg-slate-50/50 border-t border-slate-100 relative z-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-6">
            Supported Checkout Platforms & Gateways
          </p>
          
          {/* Logo row (simulated images / SVG text represent tags) */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 opacity-60 hover:opacity-85 transition-opacity duration-300 mb-8">
            <span className="text-sm font-display font-black tracking-widest text-slate-500">UPI</span>
            <span className="text-sm font-display font-black tracking-widest text-slate-500">GPAY</span>
            <span className="text-sm font-display font-black tracking-widest text-slate-500">PHONEPE</span>
            <span className="text-sm font-display font-black tracking-widest text-slate-500">PAYTM</span>
            <span className="text-sm font-display font-black tracking-widest text-slate-500">VISA</span>
            <span className="text-sm font-display font-black tracking-widest text-slate-500">MASTERCARD</span>
            <span className="text-sm font-display font-black tracking-widest text-slate-500">RUPAY</span>
          </div>
 
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-xs text-slate-400 border-t border-slate-150 pt-6">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>SSL Secured & Verified 256-bit Connections</span>
            </div>
            <div className="hidden sm:block h-4 w-px bg-slate-200" />
            <div>
              <span>Official Razorpay Partner Marketplace Integration</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
