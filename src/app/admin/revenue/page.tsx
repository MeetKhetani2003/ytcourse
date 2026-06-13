"use client";

import React, { useState, useEffect } from "react";
import { CreditCard, Search, Calendar, FileText, RefreshCw, AlertCircle } from "lucide-react";
import { useToast } from "@/components/Providers";

interface PurchaseRecord {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
    image?: string;
  } | null;
  courseId: string;
  amount: number;
  paymentId: string;
  purchasedAt: string;
}

export default function AdminRevenue() {
  const { toast } = useToast();
  const [purchases, setPurchases] = useState<PurchaseRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  async function fetchPurchases() {
    try {
      const res = await fetch("/api/admin/purchases");
      if (res.ok) {
        const data = await res.json();
        setPurchases(data);
      }
    } catch (err) {
      console.error(err);
      toast("Failed to load revenue transactions", "error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPurchases();
  }, []);

  const filteredPurchases = purchases.filter((p) => {
    const query = searchQuery.toLowerCase();
    const studentName = p.userId?.name.toLowerCase() || "";
    const studentEmail = p.userId?.email.toLowerCase() || "";
    const paymentId = p.paymentId.toLowerCase();
    return studentName.includes(query) || studentEmail.includes(query) || paymentId.includes(query);
  });

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-black text-white">Revenue Ledger</h1>
          <p className="text-xs md:text-sm text-secondary-text mt-1">
            Audit payment receipts, Razorpay references, and student enrollment billing logs.
          </p>
        </div>

        {/* Search & Refresh bar */}
        <div className="flex items-center gap-3">
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="Search reference or user..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs"
            />
          </div>
          
          <button
            onClick={fetchPurchases}
            className="p-2.5 rounded-xl bg-secondary-bg hover:bg-white/5 border border-white/5 text-white/80 hover:text-white cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="p-5 rounded-2xl bg-[#15172C]/60 border border-white/5 shadow-xl overflow-hidden">
        <h3 className="font-display font-extrabold text-white text-base mb-4 border-b border-white/5 pb-3 flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-accent" />
          <span>Transactions Audit Ledger</span>
        </h3>

        <div className="w-full overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center py-12 gap-2 text-xs text-secondary-text">
              <span className="h-4 w-4 rounded-full border border-accent border-t-transparent animate-spin" />
              <span>Loading payment logs...</span>
            </div>
          ) : filteredPurchases.length > 0 ? (
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/5 text-secondary-text font-semibold">
                  <th className="pb-3 pr-2">Student Details</th>
                  <th className="pb-3 pr-2">Enrollment Vault</th>
                  <th className="pb-3 pr-2">Razorpay Reference ID</th>
                  <th className="pb-3 pr-2">Date / Time</th>
                  <th className="pb-3 text-right">Amount Paid</th>
                </tr>
              </thead>
              <tbody>
                {filteredPurchases.map((purchase) => (
                  <tr
                    key={purchase._id}
                    className="border-b border-white/5 last:border-0 hover:bg-white/2"
                  >
                    <td className="py-3.5 pr-2">
                      {purchase.userId ? (
                        <>
                          <p className="font-bold text-white">{purchase.userId.name}</p>
                          <p className="text-[10px] text-secondary-text mt-0.5">{purchase.userId.email}</p>
                        </>
                      ) : (
                        <p className="text-red-400 italic">Deactivated User Account</p>
                      )}
                    </td>
                    <td className="py-3.5 pr-2">
                      <span className="text-[10px] uppercase font-bold text-accent tracking-wider bg-accent/10 px-2 py-0.5 rounded border border-accent/20">
                        {purchase.courseId}
                      </span>
                    </td>
                    <td className="py-3.5 pr-2 font-mono text-[10px] text-white/80 font-bold">
                      {purchase.paymentId}
                    </td>
                    <td className="py-3.5 pr-2 text-secondary-text flex items-center gap-1.5 mt-2">
                      <Calendar className="w-3.5 h-3.5 text-white/30" />
                      <span>{new Date(purchase.purchasedAt).toLocaleString("en-IN")}</span>
                    </td>
                    <td className="py-3.5 text-right font-display font-extrabold text-emerald-400 text-sm">
                      ₹{purchase.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="py-12 text-center text-xs text-secondary-text flex flex-col items-center gap-2">
              <AlertCircle className="w-8 h-8 text-white/20" />
              <span>No transactions found. Make a purchase to generate invoices.</span>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
