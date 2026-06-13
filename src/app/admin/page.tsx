"use client";

import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  Users,
  CreditCard,
  Ticket,
  DollarSign,
  Activity,
  CalendarDays
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

interface StatsData {
  totalRevenue: number;
  monthlyRevenue: number;
  totalUsers: number;
  totalPurchases: number;
  activeCoupons: number;
  dailyRevenueData: { date: string; amount: number }[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    async function fetchStats() {
      try {
        const res = await fetch("/api/admin/stats");
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (err) {
        console.error("Failed to load admin stats:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col gap-6 animate-pulse">
        <div className="h-8 w-48 bg-white/5 rounded" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-[#15172C] rounded-2xl border border-white/5" />
          ))}
        </div>
        <div className="h-80 bg-[#15172C] rounded-2xl border border-white/5" />
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="p-8 text-center text-secondary-text text-sm">
        Failed to fetch stats. Check database connectivity.
      </div>
    );
  }

  const kpis = [
    {
      label: "Total Revenue",
      value: `₹${stats.totalRevenue.toLocaleString("en-IN")}`,
      desc: "All-time course sales",
      icon: DollarSign,
      color: "text-accent bg-accent/10 border-accent/20",
    },
    {
      label: "Monthly Revenue",
      value: `₹${stats.monthlyRevenue.toLocaleString("en-IN")}`,
      desc: "Current calendar month",
      icon: TrendingUp,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      label: "Total Students",
      value: stats.totalUsers,
      desc: "Registered user accounts",
      icon: Users,
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    },
    {
      label: "Active Coupons",
      value: stats.activeCoupons,
      desc: "Promo codes currently valid",
      icon: Ticket,
      color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    },
  ];

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-black text-white">Dashboard Overview</h1>
        <p className="text-xs md:text-sm text-secondary-text mt-1">
          Monitor your LMS performance, payments, and discounts.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              className="p-5 rounded-2xl bg-[#15172C]/60 border border-white/5 shadow-xl hover:border-white/10 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-2xs font-semibold text-secondary-text uppercase tracking-wider block">
                    {kpi.label}
                  </span>
                  <span className="text-xl md:text-2xl font-display font-black text-white mt-1.5 block">
                    {kpi.value}
                  </span>
                </div>
                <div className={`p-2.5 rounded-xl border ${kpi.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <p className="text-[10px] text-secondary-text mt-4 font-medium flex items-center gap-1">
                <Activity className="w-3.5 h-3.5 text-accent" />
                {kpi.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Revenue Charts */}
      <div className="p-6 md:p-8 rounded-2xl bg-[#15172C]/60 border border-white/5 shadow-xl flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <div>
            <h3 className="font-display font-extrabold text-white text-base">Sales Revenue Trend</h3>
            <p className="text-2xs text-secondary-text mt-0.5">
              Daily aggregates over the past 7 days.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-2xs text-secondary-text bg-[#0A0B1A]/80 border border-white/5 px-3 py-1.5 rounded-lg">
            <CalendarDays className="w-4 h-4 text-accent" />
            <span>Past Week</span>
          </div>
        </div>

        {/* Chart Viewport */}
        <div className="w-full text-xs">
          {mounted && (
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart
                data={stats.dailyRevenueData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF6A00" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#FF6A00" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis
                  dataKey="date"
                  stroke="#64748B"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#64748B"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => `₹${val}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#15172C",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "12px",
                    color: "#ffffff",
                    fontSize: "12px",
                  }}
                  itemStyle={{ color: "#FF6A00" }}
                />
                <Area
                  type="monotone"
                  dataKey="amount"
                  name="Sales Revenue"
                  stroke="#FF6A00"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

    </div>
  );
}
