"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Search, ShieldCheck, Mail, Calendar, Eye, X, CreditCard, RefreshCw } from "lucide-react";
import { useToast } from "@/components/Providers";


interface UserRecord {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: "user" | "admin";
  joinDate: string;
  purchaseCount: number;
}

export default function AdminUsers() {
  const { toast } = useToast();
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserRecord | null>(null);

  async function fetchUsers() {
    try {
      const res = await fetch("/api/admin/users");
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch (err) {
      console.error(err);
      toast("Failed to load user list", "error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((u) => {
    const query = searchQuery.toLowerCase();
    return u.name.toLowerCase().includes(query) || u.email.toLowerCase().includes(query);
  });

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-black text-white">Users Management</h1>
          <p className="text-xs md:text-sm text-secondary-text mt-1">
            Browse registered student profiles and their enrollment audits.
          </p>
        </div>
        
        {/* Search & Refresh bar */}
        <div className="flex items-center gap-3">
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="Search name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs"
            />
          </div>
          
          <button
            onClick={fetchUsers}
            className="p-2.5 rounded-xl bg-secondary-bg hover:bg-white/5 border border-white/5 text-white/80 hover:text-white cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Users Ledger Table */}
      <div className="p-5 rounded-2xl bg-[#15172C]/60 border border-white/5 shadow-xl overflow-hidden">
        <h3 className="font-display font-extrabold text-white text-base mb-4 border-b border-white/5 pb-3 flex items-center gap-2">
          <Users className="w-5 h-5 text-accent" />
          <span>Student Accounts Ledger</span>
        </h3>

        <div className="w-full overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center py-12 gap-2 text-xs text-secondary-text">
              <span className="h-4 w-4 rounded-full border border-accent border-t-transparent animate-spin" />
              <span>Loading user logs...</span>
            </div>
          ) : filteredUsers.length > 0 ? (
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/5 text-secondary-text font-semibold">
                  <th className="pb-3 pr-2">Student Profiles</th>
                  <th className="pb-3 pr-2">Role</th>
                  <th className="pb-3 pr-2">Joined Date</th>
                  <th className="pb-3 pr-2 text-center">Purchases</th>
                  <th className="pb-3 text-right">View Audit</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-white/5 last:border-0 hover:bg-white/2"
                  >
                    <td className="py-3.5 pr-2 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl overflow-hidden border border-white/10 shrink-0">
                        {user.image ? (
                          <img
                            src={user.image}
                            alt={user.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-[#0A0B1A] flex items-center justify-center text-white text-[10px] font-bold uppercase">
                            {user.name.slice(0, 2)}
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-white truncate max-w-[180px]">{user.name}</p>
                        <p className="text-[10px] text-secondary-text mt-0.5 truncate max-w-[180px]">{user.email}</p>
                      </div>
                    </td>
                    <td className="py-3.5 pr-2">
                      {user.role === "admin" ? (
                        <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase font-bold tracking-wide flex items-center gap-1 w-fit">
                          <ShieldCheck className="w-3 h-3" /> Admin
                        </span>
                      ) : (
                        <span className="text-[9px] px-2 py-0.5 rounded bg-white/5 text-white/60 border border-white/10 uppercase font-bold tracking-wide flex items-center gap-1 w-fit">
                          Student
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 pr-2 font-mono text-[10px] text-white/80">
                      {new Date(user.joinDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-3.5 pr-2 text-center font-bold text-white font-mono">
                      {user.purchaseCount}
                    </td>
                    <td className="py-3.5 text-right">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="p-1.5 rounded-lg bg-accent/10 hover:bg-accent/20 text-accent hover:text-accent/90 transition-all cursor-pointer"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="py-12 text-center text-xs text-secondary-text">
              No matching student accounts found.
            </div>
          )}
        </div>
      </div>

      {/* View User Modal Popup */}
      <AnimatePresence>
        {selectedUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedUser(null)}
              className="absolute inset-0 bg-[#0A0B1A]/85 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm bg-[#15172C] border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-10 p-6 flex flex-col gap-5 text-xs text-secondary-text"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedUser(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/5 text-white/60 hover:text-white hover:bg-white/10 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-center pb-2 border-b border-white/5">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-accent mx-auto mb-3">
                  {selectedUser.image ? (
                    <img
                      src={selectedUser.image}
                      alt={selectedUser.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#0A0B1A] flex items-center justify-center text-white text-xl font-bold uppercase">
                      {selectedUser.name.slice(0, 2)}
                    </div>
                  )}
                </div>
                <h3 className="text-base font-display font-extrabold text-white">
                  {selectedUser.name}
                </h3>
                <p className="text-2xs text-secondary-text mt-0.5">{selectedUser.email}</p>
              </div>

              {/* Stats Box */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between py-1 border-b border-white/2">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-accent" /> Join Date:
                  </span>
                  <span className="text-white font-mono font-semibold">
                    {new Date(selectedUser.joinDate).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/2">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-accent" /> Account Role:
                  </span>
                  <span className="text-white uppercase font-bold tracking-wide">
                    {selectedUser.role}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/2">
                  <span className="flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-accent" /> Enrolled Purchases:
                  </span>
                  <span className="text-white font-mono font-bold">
                    {selectedUser.purchaseCount} course(s)
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0A0B1A] border border-white/5 text-[11px] leading-relaxed">
                <strong className="text-white block mb-1">Assigned Course Vaults:</strong>
                {selectedUser.purchaseCount > 0 ? (
                  <span className="text-emerald-400 font-semibold flex items-center gap-1.5 mt-1.5">
                    ✓ youtube-course (YouTube Masterclass)
                  </span>
                ) : (
                  <span className="text-secondary-text italic block mt-1.5">
                    No active course enrollments.
                  </span>
                )}
              </div>

              <button
                onClick={() => setSelectedUser(null)}
                className="w-full py-2.5 bg-secondary-bg hover:bg-white/5 border border-white/10 text-white font-display font-semibold rounded-xl text-center transition-all cursor-pointer"
              >
                Close Profile
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
