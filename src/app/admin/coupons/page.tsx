"use client";

import React, { useState, useEffect } from "react";
import { Ticket, Calendar, ToggleLeft, ToggleRight, Trash2, Plus, RefreshCw, Check, AlertCircle, Edit2 } from "lucide-react";
import { useToast } from "@/components/Providers";

interface Coupon {
  _id: string;
  code: string;
  title: string;
  discountAmount: number;
  startDate: string;
  expiryDate: string;
  active: boolean;
  usageCount: number;
}

export default function AdminCoupons() {
  const { toast } = useToast();
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");
  const [discountAmount, setDiscountAmount] = useState("");
  const [startDate, setStartDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);

  const formatToDateTimeLocal = (dateString: string) => {
    if (!dateString) return "";
    const d = new Date(dateString);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const handleEditClick = (coupon: Coupon) => {
    setEditingCoupon(coupon);
    setCode(coupon.code);
    setTitle(coupon.title);
    setDiscountAmount(coupon.discountAmount.toString());
    setStartDate(formatToDateTimeLocal(coupon.startDate));
    setExpiryDate(formatToDateTimeLocal(coupon.expiryDate));
  };

  const handleCancelEdit = () => {
    setEditingCoupon(null);
    setCode("");
    setTitle("");
    setDiscountAmount("");
    setStartDate("");
    setExpiryDate("");
  };

  async function fetchCoupons() {
    try {
      const res = await fetch("/api/admin/coupons");
      if (res.ok) {
        const data = await res.json();
        setCoupons(data);
      }
    } catch (err) {
      console.error(err);
      toast("Failed to load coupons", "error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleCreateCoupon = async () => {
    setIsCreating(true);

    try {
      const res = await fetch("/api/admin/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: code.trim().toUpperCase(),
          title: title.trim(),
          discountAmount: parseFloat(discountAmount),
          startDate: new Date(startDate).toISOString(),
          expiryDate: new Date(expiryDate).toISOString(),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast(`Coupon "${code.toUpperCase()}" created successfully!`, "success");
        setCode("");
        setTitle("");
        setDiscountAmount("");
        setStartDate("");
        setExpiryDate("");
        fetchCoupons();
      } else {
        toast(data.message || "Failed to create coupon", "error");
      }
    } catch (err) {
      console.error(err);
      toast("Connection error. Try again.", "error");
    } finally {
      setIsCreating(false);
    }
  };

  const handleUpdateCoupon = async () => {
    if (!editingCoupon) return;
    setIsCreating(true);

    try {
      const res = await fetch(`/api/admin/coupons/${editingCoupon.code}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          discountAmount: parseFloat(discountAmount),
          startDate: new Date(startDate).toISOString(),
          expiryDate: new Date(expiryDate).toISOString(),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast(`Coupon "${editingCoupon.code}" updated successfully!`, "success");
        handleCancelEdit();
        fetchCoupons();
      } else {
        toast(data.message || "Failed to update coupon", "error");
      }
    } catch (err) {
      console.error(err);
      toast("Connection error. Try again.", "error");
    } finally {
      setIsCreating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || !title || !discountAmount || !startDate || !expiryDate) {
      toast("All fields are required", "error");
      return;
    }
    if (editingCoupon) {
      handleUpdateCoupon();
    } else {
      handleCreateCoupon();
    }
  };

  const handleToggleActive = async (couponCode: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/admin/coupons/${couponCode}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !currentStatus }),
      });

      if (res.ok) {
        toast(`Coupon "${couponCode}" status updated!`, "success");
        fetchCoupons();
      } else {
        toast("Failed to update status", "error");
      }
    } catch (err) {
      console.error(err);
      toast("Connection error", "error");
    }
  };

  const handleDeleteCoupon = async (couponCode: string) => {
    if (!confirm(`Are you sure you want to delete coupon "${couponCode}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/coupons/${couponCode}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast(`Coupon "${couponCode}" deleted!`, "success");
        fetchCoupons();
      } else {
        toast("Failed to delete coupon", "error");
      }
    } catch (err) {
      console.error(err);
      toast("Connection error", "error");
    }
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-black text-white">Coupons Manager</h1>
          <p className="text-xs md:text-sm text-secondary-text mt-1">
            Create, toggle, and audit discount coupons.
          </p>
        </div>
        <button
          onClick={fetchCoupons}
          className="p-2.5 rounded-xl bg-secondary-bg hover:bg-white/5 border border-white/5 text-white/80 hover:text-white cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Grid: Create Form (left) + Coupons Table (right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Create / Edit Coupon Form Panel (4 cols) */}
        <div className="lg:col-span-4 p-5 rounded-2xl bg-[#15172C]/60 border border-white/5 shadow-xl">
          <h3 className="font-display font-extrabold text-white text-base mb-4 flex items-center gap-2 border-b border-white/5 pb-3">
            {editingCoupon ? (
              <Edit2 className="w-5 h-5 text-accent" />
            ) : (
              <Plus className="w-5 h-5 text-accent" />
            )}
            <span>{editingCoupon ? `Edit Coupon: ${editingCoupon.code}` : "Create New Coupon"}</span>
          </h3>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs">
            
            <div className="flex flex-col gap-1.5">
              <label className="text-white/70 font-semibold">Coupon Code *</label>
              <input
                type="text"
                placeholder="e.g. SUN1000"
                required
                disabled={!!editingCoupon}
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                className={`px-3.5 py-2.5 rounded-xl glass-input font-bold tracking-wider ${
                  editingCoupon ? "opacity-50 cursor-not-allowed bg-white/5" : ""
                }`}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-white/70 font-semibold">Promotion Title *</label>
              <input
                type="text"
                placeholder="e.g. Sunday Offer"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl glass-input"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-white/70 font-semibold">Discount Amount (INR) *</label>
              <input
                type="number"
                placeholder="e.g. 1000"
                required
                value={discountAmount}
                onChange={(e) => setDiscountAmount(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl glass-input font-bold text-accent"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-white/70 font-semibold">Start Date & Time *</label>
              <input
                type="datetime-local"
                required
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl glass-input"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-white/70 font-semibold">Expiry Date & Time *</label>
              <input
                type="datetime-local"
                required
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl glass-input"
              />
            </div>

            <div className="flex flex-col gap-2">
              <button
                type="submit"
                disabled={isCreating}
                className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-cta to-accent text-white font-display font-bold rounded-xl shadow-[0_10px_20px_rgba(255,106,0,0.2)] disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {isCreating ? (
                  <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                ) : editingCoupon ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Update Coupon</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Save Coupon</span>
                  </>
                )}
              </button>

              {editingCoupon && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  disabled={isCreating}
                  className="w-full py-2.5 px-4 bg-white/5 hover:bg-white/10 text-white/95 font-semibold text-xs rounded-xl border border-white/5 transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  Cancel Edit
                </button>
              )}
            </div>

          </form>
        </div>

        {/* Coupons Ledger Table (8 cols) */}
        <div className="lg:col-span-8 p-5 rounded-2xl bg-[#15172C]/60 border border-white/5 shadow-xl overflow-hidden">
          <h3 className="font-display font-extrabold text-white text-base mb-4 border-b border-white/5 pb-3 flex items-center gap-2">
            <Ticket className="w-5 h-5 text-accent" />
            <span>Active Coupons Ledger</span>
          </h3>

          <div className="w-full overflow-x-auto">
            {loading ? (
              <div className="flex justify-center items-center py-12 gap-2 text-xs text-secondary-text">
                <span className="h-4 w-4 rounded-full border border-accent border-t-transparent animate-spin" />
                <span>Loading coupon codes...</span>
              </div>
            ) : coupons.length > 0 ? (
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-white/5 text-secondary-text font-semibold">
                    <th className="pb-3 pr-2">Code / Title</th>
                    <th className="pb-3 pr-2">Discount</th>
                    <th className="pb-3 pr-2">Validity Period</th>
                    <th className="pb-3 pr-2 text-center">Uses</th>
                    <th className="pb-3 pr-2 text-center">Active</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {coupons.map((coupon) => {
                    const isExpired = new Date() > new Date(coupon.expiryDate);
                    return (
                      <tr
                        key={coupon._id}
                        className="border-b border-white/5 last:border-0 hover:bg-white/2"
                      >
                        <td className="py-3.5 pr-2">
                          <p className="font-bold text-white tracking-wider">{coupon.code}</p>
                          <p className="text-[10px] text-secondary-text mt-0.5">{coupon.title}</p>
                        </td>
                        <td className="py-3.5 pr-2 font-display font-extrabold text-accent">
                          ₹{coupon.discountAmount}
                        </td>
                        <td className="py-3.5 pr-2 font-sans text-[10px] text-white/80 leading-normal">
                          <span className="block">From: {new Date(coupon.startDate).toLocaleString()}</span>
                          <span className="block mt-0.5 text-secondary-text">
                            To: {new Date(coupon.expiryDate).toLocaleString()}
                            {isExpired && (
                              <span className="ml-1 text-red-500 font-bold uppercase text-[8px]">
                                Expired
                              </span>
                            )}
                          </span>
                        </td>
                        <td className="py-3.5 pr-2 text-center font-bold text-white font-mono">
                          {coupon.usageCount}
                        </td>
                        <td className="py-3.5 pr-2 text-center">
                          <button
                            onClick={() => handleToggleActive(coupon.code, coupon.active)}
                            className="cursor-pointer transition-all duration-200"
                          >
                            {coupon.active ? (
                              <ToggleRight className="w-7 h-7 text-success" />
                            ) : (
                              <ToggleLeft className="w-7 h-7 text-secondary-text" />
                            )}
                          </button>
                        </td>
                        <td className="py-3.5 text-right">
                          <div className="flex justify-end items-center gap-2">
                            <button
                              onClick={() => handleEditClick(coupon)}
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-all cursor-pointer"
                              title="Edit Coupon"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteCoupon(coupon.code)}
                              className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all cursor-pointer"
                              title="Delete Coupon"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className="py-12 text-center text-xs text-secondary-text flex flex-col items-center gap-2">
                <AlertCircle className="w-8 h-8 text-white/20" />
                <span>No coupons created yet. Add one in the left panel.</span>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
