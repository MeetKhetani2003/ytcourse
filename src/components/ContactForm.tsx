"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertTriangle, Loader2 } from "lucide-react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Failed to submit inquiry.");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {status === "success" && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl flex items-start gap-2.5 text-xs md:text-sm">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <div>
            <p className="font-bold">Thank You!</p>
            <p>Your inquiry has been sent successfully. We will get back to you soon.</p>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl flex items-start gap-2.5 text-xs md:text-sm">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          <div>
            <p className="font-bold">Error Sending Message</p>
            <p>{errorMessage}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 bg-secondary-bg/25 border border-white/5 p-6 rounded-2xl">
        <div>
          <label htmlFor="form-name" className="block text-xs font-semibold text-white/70 mb-1">
            Your Name <span className="text-accent">*</span>
          </label>
          <input
            id="form-name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-[#0A0B1A] border border-white/10 text-white text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
            required
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor="form-email" className="block text-xs font-semibold text-white/70 mb-1">
            Email Address <span className="text-accent">*</span>
          </label>
          <input
            id="form-email"
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-[#0A0B1A] border border-white/10 text-white text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
            required
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor="form-message" className="block text-xs font-semibold text-white/70 mb-1">
            Message <span className="text-accent">*</span>
          </label>
          <textarea
            id="form-message"
            rows={4}
            placeholder="How can we help you?"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-[#0A0B1A] border border-white/10 text-white text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none resize-none transition-all"
            required
            disabled={loading}
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-cta to-accent hover:from-accent hover:to-cta text-white font-bold rounded-xl text-sm transition-all cursor-pointer disabled:opacity-75"
          disabled={loading}
        >
          {loading ? (
            <>
              <span>Sending Inquiry...</span>
              <Loader2 className="w-4 h-4 animate-spin" />
            </>
          ) : (
            <>
              <span>Send Inquiry</span>
              <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
