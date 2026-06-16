import React from "react";
import Link from "next/link";
import { LayoutDashboard, Users, Ticket, CreditCard, Play, Home, ShieldCheck, LogOut } from "lucide-react";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const sidebarLinks = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Users Management", href: "/admin/users", icon: Users },
    { label: "Coupons Manager", href: "/admin/coupons", icon: Ticket },
    { label: "Revenue Ledger", href: "/admin/revenue", icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-primary-bg flex text-white font-sans relative overflow-hidden bg-radial-glow">
      {/* Background decorations */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full glow-emerald-spot pointer-events-none opacity-20" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full glow-orange-spot pointer-events-none opacity-15" />

      {/* Sidebar Navigation */}
      <aside className="w-64 bg-secondary-bg/60 border-r border-white/5 flex flex-col justify-between shrink-0 relative z-20 backdrop-blur-md">
        <div>
          {/* Brand header */}
          <div className="p-6 border-b border-white/5 flex items-center gap-2">
            <div className="p-1.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-sm tracking-wide text-white leading-none">
                LMS Control
              </span>
              <span className="text-[10px] text-emerald-400 font-bold uppercase mt-1 leading-none">
                Administrator
              </span>
            </div>
          </div>

          {/* Links Grid */}
          <nav className="p-4 flex flex-col gap-1.5 mt-4">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-white/70 hover:text-white transition-all text-xs font-semibold font-display"
                >
                  <Icon className="w-4.5 h-4.5 text-accent shrink-0" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Switch Links */}
        <div className="p-4 border-t border-white/5 flex flex-col gap-1">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-xs text-white/60 hover:text-white transition-all"
          >
            <Play className="w-4 h-4 text-accent shrink-0" />
            <span>Student View</span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-xs text-white/60 hover:text-white transition-all"
          >
            <Home className="w-4 h-4 text-accent shrink-0" />
            <span>Main Landing Site</span>
          </Link>
          <a
            href="/api/admin/logout"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-xs text-red-400 hover:text-red-350 transition-all font-semibold"
          >
            <LogOut className="w-4 h-4 shrink-0 text-red-400" />
            <span>Logout</span>
          </a>
        </div>
      </aside>

      {/* Main Panel Viewport */}
      <main className="flex-1 overflow-y-auto relative z-10 p-6 md:p-10">
        <div className="max-w-5xl mx-auto w-full flex flex-col gap-8">
          {children}
        </div>
      </main>
    </div>
  );
}
