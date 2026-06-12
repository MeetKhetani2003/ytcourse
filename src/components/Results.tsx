"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Activity } from "lucide-react";

export default function Results() {
  const [activeTab, setActiveTab] = useState<"revenue" | "watchTime" | "subscribers">("revenue");

  const revenueData = [120, 240, 190, 380, 520, 573];
  const watchTimeData = [2.1, 4.5, 6.2, 9.8, 12.5, 16.0];
  const subscriberData = [45, 98, 120, 185, 230, 288];

  const chartData = {
    revenue: {
      title: "USA CPM Revenue",
      val: "$573.18",
      diff: "+304.5%",
      points: revenueData,
      color: "#FF9F1C",
      prefix: "$",
      suffix: "",
      desc: "High US CPM rates deliver premium AdSense payouts even with lower view counts."
    },
    watchTime: {
      title: "Watch Time Growth",
      val: "16.0K Hrs",
      diff: "+182.2%",
      points: watchTimeData,
      color: "#00D084",
      prefix: "",
      suffix: " hrs",
      desc: "Engaged USA audiences trigger the YouTube recommendation algorithm faster."
    },
    subscribers: {
      title: "Subscriber Growth",
      val: "288 Sub",
      diff: "+214.8%",
      points: subscriberData,
      color: "#FF6B35",
      prefix: "+",
      suffix: "",
      desc: "Fast growing US subscriber base establishes a high-value digital asset."
    }
  };

  const currentChart = chartData[activeTab];

  // SVG Chart points calculations
  const chartHeight = 160;
  const chartWidth = 500;
  const padding = 20;

  const pointsCount = currentChart.points.length;
  const maxVal = Math.max(...currentChart.points) * 1.15;
  const minVal = Math.min(...currentChart.points) * 0.85;


  // Create smooth bezier curve path for SVG
  const getCurvePath = () => {
    let path = "";
    currentChart.points.forEach((val, idx) => {
      const x = padding + (idx * (chartWidth - padding * 2)) / (pointsCount - 1);
      const y = chartHeight - padding - ((val - minVal) / (maxVal - minVal)) * (chartHeight - padding * 2);
      if (idx === 0) {
        path += `M ${x} ${y}`;
      } else {
        const prevX = padding + ((idx - 1) * (chartWidth - padding * 2)) / (pointsCount - 1);
        const prevY = chartHeight - padding - ((currentChart.points[idx - 1] - minVal) / (maxVal - minVal)) * (chartHeight - padding * 2);
        const cpX1 = prevX + (x - prevX) / 2;
        const cpY1 = prevY;
        const cpX2 = prevX + (x - prevX) / 2;
        const cpY2 = y;
        path += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${x} ${y}`;
      }
    });
    return path;
  };

  const getAreaPath = (linePath: string) => {
    const startX = padding;
    const endX = chartWidth - padding;
    const bottomY = chartHeight - padding;
    return `${linePath} L ${endX} ${bottomY} L ${startX} ${bottomY} Z`;
  };

  const curvePath = getCurvePath();
  const areaPath = getAreaPath(curvePath);

  return (
    <section className="py-24 px-4 md:px-8 bg-[#0D1F28]/30 border-y border-white/5 relative overflow-hidden" id="results-section">
      {/* Background Ornaments */}
      <div className="absolute top-1/4 right-0 w-80 h-80 glow-orange-spot pointer-events-none opacity-20" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 glow-emerald-spot pointer-events-none opacity-20" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-accent font-display uppercase tracking-wider text-sm font-bold mb-2">
            Real Proof & Analytics
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white mb-6">
            Inside The YouTube Studio Dashboard
          </h2>
          <p className="text-lg text-secondary-text font-sans">
            Here&apos;s what channel performance looks like when targeting high-paying USA viewers.
          </p>
        </div>

        {/* Dashboard Frame */}
        <div className="glass-card rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative">
          
          {/* Dashboard Header/Titlebar */}
          <div className="border-b border-white/8 bg-[#061218]/80 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/20 flex items-center justify-center">
                <Activity className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-display font-bold text-white">YouTube Studio Sandbox</h3>
                <p className="text-xs text-secondary-text">Channel performance analytics (Last 28 Days)</p>
              </div>
            </div>

            {/* Dashboard Tabs */}
            <div className="flex items-center bg-primary-bg rounded-xl p-1 border border-white/5 w-full md:w-auto">
              {(["revenue", "watchTime", "subscribers"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-sm font-display font-semibold transition-all duration-300 ${
                    activeTab === tab
                      ? "bg-secondary-bg text-accent shadow-md border border-white/5"
                      : "text-secondary-text hover:text-white"
                  }`}
                >
                  {tab === "revenue" ? "Revenue" : tab === "watchTime" ? "Watch Time" : "Subscribers"}
                </button>
              ))}
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Side: Text and Metric highlights */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              
              <div className="glass-card bg-[#061218]/45 p-6 rounded-2xl border border-white/5">
                <span className="text-sm text-secondary-text font-medium uppercase tracking-wider block mb-1">
                  {currentChart.title}
                </span>
                
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl md:text-5xl font-display font-black text-white">
                    {currentChart.val}
                  </span>
                  <span className="text-sm font-bold text-success flex items-center">
                    <TrendingUp className="w-4 h-4 mr-0.5 inline-block" />
                    {currentChart.diff}
                  </span>
                </div>

                <div className="h-px bg-white/5 my-4" />

                <p className="text-sm md:text-base text-secondary-text font-sans leading-relaxed">
                  {currentChart.desc}
                </p>
              </div>

              {/* Core YouTube Metrics Summary */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                  <span className="text-xs text-secondary-text block mb-1">Avg RPM</span>
                  <span className="text-base md:text-lg font-display font-bold text-accent">$8.54</span>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                  <span className="text-xs text-secondary-text block mb-1">CTR</span>
                  <span className="text-base md:text-lg font-display font-bold text-accent">9.4%</span>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                  <span className="text-xs text-secondary-text block mb-1">USA CPM</span>
                  <span className="text-base md:text-lg font-display font-bold text-accent">$18.22</span>
                </div>
              </div>

            </div>

            {/* Right Side: Graph panel */}
            <div className="lg:col-span-7 flex flex-col items-center">
              
              {/* Graphic Chart container */}
              <div className="w-full glass-card bg-[#061218]/60 rounded-2xl p-4 md:p-6 border border-white/5 flex flex-col justify-between">
                
                {/* Chart Header */}
                <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
                  <span className="text-sm font-display font-bold text-white flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: currentChart.color }}
                    />
                    Growth Curve
                  </span>
                  <span className="text-xs text-secondary-text font-sans">Updated 10m ago</span>
                </div>

                {/* SVG Visualizing the Graph */}
                <div className="relative w-full h-[180px] mt-2">
                  <svg
                    viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                    className="w-full h-full overflow-visible"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={currentChart.color} stopOpacity="0.4" />
                        <stop offset="100%" stopColor={currentChart.color} stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Chart Grid Lines */}
                    {[0, 1, 2, 3, 4].map((gridIdx) => {
                      const yVal = padding + (gridIdx * (chartHeight - padding * 2)) / 4;
                      return (
                        <line
                          key={gridIdx}
                          x1={padding}
                          y1={yVal}
                          x2={chartWidth - padding}
                          y2={yVal}
                          stroke="rgba(255,255,255,0.04)"
                          strokeWidth="1"
                        />
                      );
                    })}

                    {/* Area path */}
                    <motion.path
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1 }}
                      d={areaPath}
                      fill="url(#chartGlow)"
                    />

                    {/* Line path */}
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, ease: "easeInOut" }}
                      d={curvePath}
                      fill="none"
                      stroke={currentChart.color}
                      strokeWidth="3"
                    />

                    {/* Interactive points dot circles */}
                    {currentChart.points.map((val, idx) => {
                      const x = padding + (idx * (chartWidth - padding * 2)) / (pointsCount - 1);
                      const y = chartHeight - padding - ((val - minVal) / (maxVal - minVal)) * (chartHeight - padding * 2);
                      return (
                        <g key={idx}>
                          <circle
                            cx={x}
                            cy={y}
                            r="6"
                            fill={currentChart.color}
                            className="opacity-20 hover:opacity-40 transition-opacity duration-300"
                          />
                          <circle
                            cx={x}
                            cy={y}
                            r="3.5"
                            fill="#ffffff"
                            stroke={currentChart.color}
                            strokeWidth="2"
                          />
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* X-Axis labels */}
                <div className="flex justify-between items-center px-4 mt-3 text-[10px] md:text-xs text-secondary-text font-semibold uppercase font-sans">
                  <span>Week 1</span>
                  <span>Week 2</span>
                  <span>Week 3</span>
                  <span>Week 4</span>
                  <span>Week 5</span>
                  <span>Current</span>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
