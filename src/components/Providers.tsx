"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { SessionProvider } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, XCircle, AlertCircle, X } from "lucide-react";

// --- Toast System ---
type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a Providers component");
  }
  return context;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, type: ToastType = "info") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto remove after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <SessionProvider>
      <ToastContext.Provider value={{ toast }}>
        {children}
        
        {/* Toast Container */}
        <div className="fixed bottom-5 right-5 z-100 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
          <AnimatePresence>
            {toasts.map((t) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
                className="pointer-events-auto w-full glass-card p-4 rounded-xl shadow-xl flex items-start gap-3 border border-white/10"
              >
                {/* Icon mapping */}
                {t.type === "success" && (
                  <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                )}
                {t.type === "error" && (
                  <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                )}
                {t.type === "info" && (
                  <AlertCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                )}

                <div className="flex-1 text-xs text-white/90 leading-relaxed font-sans font-medium">
                  {t.message}
                </div>

                <button
                  onClick={() => removeToast(t.id)}
                  className="text-white/40 hover:text-white shrink-0 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </ToastContext.Provider>
    </SessionProvider>
  );
}
