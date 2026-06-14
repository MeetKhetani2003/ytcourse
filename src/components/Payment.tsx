"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Ticket, CheckCircle2, X, ArrowRight, Smartphone, Mail, User } from "lucide-react";
import { useToast } from "@/components/Providers";

interface PaymentProps {
  isOpen: boolean;
  onClose: () => void;
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if ((window as any).Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function Payment({ isOpen, onClose }: PaymentProps) {
  const { data: session } = useSession();
  const { toast } = useToast();

  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [pincode, setPincode] = useState("");
  const [gstin, setGstin] = useState("");

  const [step, setStep] = useState<"details" | "checkout" | "success">("details");
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    title: string;
    discount: number;
    finalPrice: number;
  } | null>(null);

  const [isCouponLoading, setIsCouponLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState<{
    orderId: string;
    paymentId: string;
  } | null>(null);

  // Reset when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setStep("details");
      setPhone("");
      setCity("");
      setStateName("");
      setPincode("");
      setGstin("");
      setCouponCode("");
      setAppliedCoupon(null);
      setIsProcessing(false);
      setTransactionDetails(null);
    }
  }, [isOpen]);

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      toast("Please enter a valid 10-digit WhatsApp number", "error");
      return;
    }
    if (!city.trim()) {
      toast("Please enter your city", "error");
      return;
    }
    if (!stateName.trim()) {
      toast("Please enter your state", "error");
      return;
    }
    if (!pincode || pincode.length < 6) {
      toast("Please enter a valid 6-digit PIN code", "error");
      return;
    }
    setStep("checkout");
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      toast("Please enter a coupon code", "error");
      return;
    }

    setIsCouponLoading(true);
    try {
      const res = await fetch("/api/coupon/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponCode.trim() }),
      });

      const data = await res.json();

      if (res.ok && data.valid) {
        setAppliedCoupon({
          code: couponCode.trim().toUpperCase(),
          title: data.title,
          discount: data.discount,
          finalPrice: data.finalPrice,
        });
        toast(`Coupon "${couponCode.toUpperCase()}" applied successfully!`, "success");
      } else {
        toast(data.message || "Invalid or expired coupon", "error");
        setAppliedCoupon(null);
      }
    } catch (err) {
      console.error(err);
      toast("Failed to apply coupon. Try again.", "error");
    } finally {
      setIsCouponLoading(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    toast("Coupon removed", "info");
  };

  const handleProcessPayment = async () => {
    setIsProcessing(true);

    try {
      // 1. Load Razorpay script
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        toast("Failed to load Razorpay SDK. Check your internet connection.", "error");
        setIsProcessing(false);
        return;
      }

      // 2. Create Order on Backend
      const orderRes = await fetch("/api/payment/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          couponCode: appliedCoupon ? appliedCoupon.code : undefined,
          phone,
          city,
          stateName,
          pincode,
          gstin: gstin || undefined,
        }),
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        toast(orderData.message || "Failed to initiate payment", "error");
        setIsProcessing(false);
        return;
      }

      // 3. Configure and Open Razorpay Checkout SDK
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_SvYRmEIlidySNB",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "YouTube Masterclass",
        description: "Faceless YouTube Income Masterclass",
        order_id: orderData.orderId,
        handler: async function (response: any) {
          // Signature Verification call to API
          try {
            const verifyRes = await fetch("/api/payment/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyRes.ok && verifyData.success) {
              setTransactionDetails({
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
              });
              toast("Enrollment complete! Welcome aboard.", "success");
              setStep("success");
            } else {
              toast(verifyData.message || "Payment verification failed. Contact support.", "error");
            }
          } catch (err) {
            console.error(err);
            toast("Connection error during verification. Contact support.", "error");
          } finally {
            setIsProcessing(false);
          }
        },
        prefill: {
          name: session?.user?.name || "",
          email: session?.user?.email || "",
          contact: `+91${phone}`,
        },
        theme: {
          color: "#FF6A00",
        },
        modal: {
          ondismiss: function () {
            toast("Payment cancelled by user", "info");
            setIsProcessing(false);
          },
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err: any) {
      console.error(err);
      toast(err.message || "Something went wrong during payment initialization", "error");
      setIsProcessing(false);
    }
  };

  const originalPrice = 3200;
  const currentFinalPrice = appliedCoupon ? appliedCoupon.finalPrice : originalPrice;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-[#0A0B1A]/85 backdrop-blur-md"
            />
 
            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-md bg-[#15172C] border border-white/10 rounded-3xl overflow-hidden shadow-2xl z-10 p-6 md:p-8"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
 
              {/* Step 1: Collect Phone Details */}
              {step === "details" && (
                <form onSubmit={handleDetailsSubmit} className="flex flex-col gap-4">
                  <div className="text-center mb-2">
                    <span className="text-xs text-accent font-display uppercase font-bold tracking-wider">
                      Checkout Step 1 of 2
                    </span>
                    <h3 className="text-xl md:text-2xl font-display font-extrabold text-white">
                      Billing Information
                    </h3>
                    <p className="text-xs text-secondary-text mt-1">
                      Provide contact details to receive system credentials.
                    </p>
                  </div>
 
                  <div className="flex flex-col gap-1.5 opacity-70">
                    <label className="text-xs font-semibold text-white/70 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-accent" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      disabled
                      value={session?.user?.name || ""}
                      className="px-4 py-3 rounded-xl glass-input text-white text-sm bg-white/5 cursor-not-allowed"
                    />
                  </div>
 
                  <div className="flex flex-col gap-1.5 opacity-70">
                    <label className="text-xs font-semibold text-white/70 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-accent" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      disabled
                      value={session?.user?.email || ""}
                      className="px-4 py-3 rounded-xl glass-input text-white text-sm bg-white/5 cursor-not-allowed"
                    />
                  </div>
 
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-white/70 flex items-center gap-1.5">
                      <Smartphone className="w-3.5 h-3.5 text-accent" />
                      Phone Number (WhatsApp) *
                    </label>
                    <div className="relative">
                      <div className="absolute left-3.5 top-1/2 transform -translate-y-1/2 flex items-center pointer-events-none text-xs font-bold text-white/55">
                        🇮🇳 +91
                      </div>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="9876543210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                        className="w-full pl-16 pr-4 py-3 rounded-xl glass-input text-white text-sm font-semibold tracking-wide"
                      />
                    </div>
                  </div>

                  {/* Grid for City and State */}
                  <div className="grid grid-cols-2 gap-3.5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-white/70">City *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Mumbai"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="px-4 py-3 rounded-xl glass-input text-white text-sm"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-white/70">State *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Maharashtra"
                        value={stateName}
                        onChange={(e) => setStateName(e.target.value)}
                        className="px-4 py-3 rounded-xl glass-input text-white text-sm"
                      />
                    </div>
                  </div>

                  {/* Grid for Pincode and GSTIN */}
                  <div className="grid grid-cols-2 gap-3.5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-white/70">PIN Code *</label>
                      <input
                        type="tel"
                        required
                        maxLength={6}
                        placeholder="400001"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                        className="px-4 py-3 rounded-xl glass-input text-white text-sm font-mono tracking-wider"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-white/70">GSTIN (Optional)</label>
                      <input
                        type="text"
                        maxLength={15}
                        placeholder="Tax / GST ID"
                        value={gstin}
                        onChange={(e) => setGstin(e.target.value.toUpperCase())}
                        className="px-4 py-3 rounded-xl glass-input text-white text-sm font-mono"
                      />
                    </div>
                  </div>
 
                  <button
                    type="submit"
                    className="w-full mt-2 cursor-pointer flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-cta to-accent text-white font-display font-bold rounded-xl shadow-[0_10px_20px_rgba(255,106,0,0.25)] hover:opacity-95 transition-all"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
 
              {/* Step 2: Apply Coupon and Pay */}
              {step === "checkout" && (
                <div className="flex flex-col gap-5">
                  <div className="text-center">
                    <span className="text-xs text-accent font-display uppercase font-bold tracking-wider">
                      Checkout Step 2 of 2
                    </span>
                    <h3 className="text-xl md:text-2xl font-display font-extrabold text-white">
                      Order Summary
                    </h3>
                    <p className="text-xs text-secondary-text mt-1">
                      Apply coupon codes below to receive instant discounts.
                    </p>
                  </div>
 
                  {/* Pricing Details */}
                  <div className="p-4 rounded-xl bg-[#0A0B1A] border border-white/5 flex flex-col gap-2.5 text-xs text-secondary-text">
                    <div className="flex justify-between items-center text-sm font-semibold text-white">
                      <span>YouTube Masterclass (Lifetime Access)</span>
                      <span>₹{originalPrice}</span>
                    </div>

                    {appliedCoupon && (
                      <div className="flex justify-between items-center text-emerald-400 font-semibold">
                        <span className="flex items-center gap-1">
                          <Ticket className="w-3.5 h-3.5" />
                          Coupon Applied ({appliedCoupon.code})
                        </span>
                        <span>-₹{appliedCoupon.discount}</span>
                      </div>
                    )}

                    <div className="h-px bg-white/5 my-1" />

                    <div className="flex justify-between items-center text-base font-display font-black text-white">
                      <span>Total Amount:</span>
                      <span className="text-accent">₹{currentFinalPrice}</span>
                    </div>
                  </div>

                  {/* Coupon Application Panel */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-white/70">Promo / Coupon Code</label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          placeholder="e.g. SUN1000"
                          disabled={!!appliedCoupon || isCouponLoading}
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                          className="w-full px-3 py-2.5 rounded-xl glass-input text-xs font-bold uppercase tracking-wider"
                        />
                      </div>
                      
                      {appliedCoupon ? (
                        <button
                          onClick={handleRemoveCoupon}
                          className="px-4 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/25 text-xs font-bold rounded-xl transition-all cursor-pointer"
                        >
                          Remove
                        </button>
                      ) : (
                        <button
                          onClick={handleApplyCoupon}
                          disabled={isCouponLoading || !couponCode.trim()}
                          className="px-5 py-2.5 bg-secondary-bg hover:bg-white/5 text-white disabled:opacity-50 border border-white/10 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          {isCouponLoading ? (
                            <span className="h-3 w-3 rounded-full border border-white border-t-transparent animate-spin" />
                          ) : (
                            <span>Apply</span>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
 
                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2.5 mt-2">
                    <button
                      onClick={handleProcessPayment}
                      disabled={isProcessing}
                      className="w-full cursor-pointer flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-success to-accent text-white font-display font-bold rounded-xl shadow-[0_10px_20px_rgba(16,185,129,0.25)] disabled:opacity-50"
                    >
                      {isProcessing ? (
                        <span className="flex items-center gap-2">
                          <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                          Initializing Secure Checkout...
                        </span>
                      ) : (
                        <>
                          <span>Pay Securely ₹{currentFinalPrice}</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => setStep("details")}
                      disabled={isProcessing}
                      className="w-full text-center text-xs text-secondary-text hover:text-white transition-colors cursor-pointer py-1.5 disabled:opacity-50"
                    >
                      ← Back to Billing Details
                    </button>
                  </div>
                </div>
              )}
 
              {/* Step 3: Success Confirmation */}
              {step === "success" && (
                <div className="flex flex-col items-center text-center gap-4 py-4 animate-in zoom-in-95 duration-200">
                  <div className="w-16 h-16 rounded-full bg-success/20 border border-success/30 flex items-center justify-center text-success mb-2 animate-bounce">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
 
                  <span className="text-xs text-success font-display uppercase font-extrabold tracking-widest">
                    Payment Verified
                  </span>
                  
                  <h3 className="text-2xl font-display font-black text-white">
                    Welcome to the Course!
                  </h3>
                  <p className="text-xs text-secondary-text -mt-2">
                    Lifetime access has been activated for your account.
                  </p>
 
                  <div className="p-4 rounded-xl bg-[#0A0B1A] border border-white/5 text-xs text-secondary-text text-left flex flex-col gap-2.5 w-full">
                    <p>
                      <strong>Account Email:</strong> {session?.user?.email}
                    </p>
                    {transactionDetails && (
                      <>
                        <p>
                          <strong>Order Reference:</strong> {transactionDetails.orderId}
                        </p>
                        <p>
                          <strong>Payment Reference:</strong> {transactionDetails.paymentId}
                        </p>
                      </>
                    )}
                    <p className="border-t border-white/5 pt-2 mt-1">
                      ✓ A PDF invoice has been sent to your email. Please check your inbox (including promotions/spam folders).
                    </p>
                  </div>
 
                  <button
                    onClick={() => {
                      onClose();
                      window.location.href = "/course/youtube-masterclass";
                    }}
                    className="w-full mt-4 cursor-pointer py-3.5 px-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-display font-bold rounded-xl shadow-[0_10px_20px_rgba(16,185,129,0.2)]"
                  >
                    Start Learning
                  </button>
                </div>
              )}
 
            </motion.div>
 
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
