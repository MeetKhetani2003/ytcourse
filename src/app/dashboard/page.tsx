import React from "react";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db";
import { User } from "@/models/User";
import { Purchase } from "@/models/Purchase";
import { course } from "@/config/courseConfig";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { Play, Calendar, User as UserIcon, Mail, ShieldCheck, Ticket, Receipt, CreditCard } from "lucide-react";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect("/");
  }

  await connectDB();

  // Fetch complete user and purchase records from DB
  const dbUser = await User.findById(session.user.id);
  if (!dbUser) {
    redirect("/");
  }

  const purchases = await Purchase.find({ userId: dbUser._id }).sort({ purchasedAt: -1 });

  const hasPurchasedCourse = dbUser.purchasedCourses.includes(course.id);
  const isAdmin = dbUser.role === "admin";

  return (
    <div className="min-h-screen bg-primary-bg flex flex-col relative overflow-hidden bg-radial-glow font-sans pb-16">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full glow-emerald-spot pointer-events-none opacity-30" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full glow-orange-spot pointer-events-none opacity-20" />

      {/* Header Navbar */}
      <Navbar />


      <div className="max-w-6xl w-full mx-auto px-4 md:px-8 mt-28 relative z-10 flex flex-col gap-8">
        
        {/* Top welcome section */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center p-6 sm:p-8 rounded-3xl bg-secondary-bg/50 border border-white/5 shadow-xl">
          <div className="flex items-center gap-4.5">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-accent shrink-0">
              {dbUser.image ? (
                <img
                  src={dbUser.image}
                  alt={dbUser.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-secondary-bg flex items-center justify-center text-white text-xl">
                  <UserIcon className="w-7 h-7" />
                </div>
              )}
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-display font-black text-white flex items-center gap-2">
                {dbUser.name}
                {isAdmin && (
                  <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase font-sans font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Admin
                  </span>
                )}
              </h1>
              <p className="text-xs sm:text-sm text-secondary-text mt-0.5 flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-accent" />
                {dbUser.email}
              </p>
            </div>
          </div>

          <div className="text-left md:text-right text-xs text-secondary-text bg-[#0A0B1A]/60 px-4 py-2.5 rounded-xl border border-white/5">
            <span className="block">Student Since</span>
            <span className="font-semibold text-white mt-0.5 block">
              {new Date(dbUser.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* Dashboard Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: My Courses (Take 8 cols if wide) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <h2 className="text-lg font-display font-bold text-white flex items-center gap-2">
              <Play className="w-5 h-5 text-accent fill-accent" />
              <span>My Enrolled Courses</span>
            </h2>

            {hasPurchasedCourse || isAdmin ? (
              /* Enrolled Course Card */
              <div className="glass-card rounded-2xl border border-white/10 overflow-hidden flex flex-col sm:flex-row hover:border-accent/30 transition-colors duration-300">
                <div className="relative aspect-video sm:w-64 w-full shrink-0 overflow-hidden border-b sm:border-b-0 sm:border-r border-white/5">
                  <img
                    src="/webinar_banner.jpeg"
                    alt={course.title}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <Link
                      href={`/course/${course.slug}`}
                      className="p-3 rounded-full bg-accent text-white shadow-lg"
                    >
                      <Play className="w-6 h-6 fill-white" />
                    </Link>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-accent tracking-widest bg-accent/10 px-2.5 py-1 rounded-full border border-accent/20">
                      Lifetime Access
                    </span>
                    <h3 className="text-lg sm:text-xl font-display font-extrabold text-white mt-3.5">
                      {course.title}
                    </h3>
                    <p className="text-xs text-secondary-text leading-relaxed mt-2.5">
                      Master the exact workflow to launch faceless channels, utilize AI tools, draft video scripts, and generate high-CPM YouTube revenue.
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-6">
                    <span className="text-2xs text-secondary-text flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-accent" />
                      Self-Paced Learning
                    </span>
                    <Link
                      href={`/course/${course.slug}`}
                      className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-cta to-accent hover:from-accent hover:to-cta text-white font-display font-bold text-xs rounded-lg shadow-md transition-all"
                    >
                      <span>Open Course Player</span>
                      <Play className="w-3.5 h-3.5 fill-white shrink-0" />
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              /* Empty State */
              <div className="p-10 rounded-2xl bg-secondary-bg/40 border border-white/5 border-dashed text-center flex flex-col items-center gap-4">
                <div className="p-4 rounded-full bg-white/5 text-white/40">
                  <Play className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-white text-base">No active enrollments</h3>
                  <p className="text-xs text-secondary-text mt-1 max-w-sm">
                    You haven&apos;t enrolled in any courses yet. Grab the YouTube Masterclass and unlock your potential today!
                  </p>
                </div>
                <Link
                  href="/"
                  className="px-6 py-2.5 bg-gradient-to-r from-cta to-accent text-white font-display font-bold text-xs rounded-xl shadow-md"
                >
                  Explore Course
                </Link>
              </div>
            )}
          </div>

          {/* Right Column: Purchase History (Take 4 cols if wide) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <h2 className="text-lg font-display font-bold text-white flex items-center gap-2">
              <Receipt className="w-5 h-5 text-accent" />
              <span>Billing History</span>
            </h2>

            <div className="flex flex-col gap-4">
              {purchases.length > 0 ? (
                purchases.map((p) => (
                  <div
                    key={p._id.toString()}
                    className="p-4 rounded-xl bg-secondary-bg/60 border border-white/5 flex flex-col gap-3.5 text-xs"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-display font-extrabold text-white truncate max-w-[150px]">
                        {course.title}
                      </span>
                      <span className="text-sm font-display font-black text-accent">
                        ₹{p.amount}
                      </span>
                    </div>

                    <div className="text-secondary-text flex flex-col gap-1 leading-relaxed border-t border-white/5 pt-2.5">
                      <span className="flex items-center justify-between">
                        <span>Paid On:</span>
                        <span className="text-white/80 font-medium">
                          {new Date(p.purchasedAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </span>
                      <span className="flex items-center justify-between">
                        <span>Transaction ID:</span>
                        <span className="text-white/85 font-mono text-[10px] max-w-[120px] truncate">
                          {p.paymentId}
                        </span>
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 rounded-xl bg-secondary-bg/30 border border-white/5 text-center text-secondary-text text-xs">
                  No previous transactions recorded.
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
