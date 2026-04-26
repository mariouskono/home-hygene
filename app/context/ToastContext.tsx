"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { CheckCircle2, AlertCircle, XCircle, X } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface ToastProps {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const toast = (message: string, type: ToastType = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* Toast Container */}
      <div className="fixed top-12 right-1/2 translate-x-1/2 md:translate-x-0 md:top-24 md:right-8 z-[9999] flex flex-col gap-3 w-max">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`flex items-center gap-3 px-5 py-4 rounded-2xl shadow-xl border animate-in slide-in-from-top-10 fade-in duration-300 w-[90vw] md:w-80 backdrop-blur-md ${
              t.type === "success"
                ? "bg-emerald-50/90 dark:bg-emerald-950/80 border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-100"
                : t.type === "error"
                ? "bg-red-50/90 dark:bg-red-950/80 border-red-200 dark:border-red-900 text-red-800 dark:text-red-100"
                : "bg-blue-50/90 dark:bg-blue-950/80 border-blue-200 dark:border-blue-900 text-blue-800 dark:text-blue-100"
            }`}
          >
            {t.type === "success" && <CheckCircle2 size={24} className="text-emerald-500" strokeWidth={2.5}/>}
            {t.type === "error" && <XCircle size={24} className="text-red-500" strokeWidth={2.5} />}
            {t.type === "info" && <AlertCircle size={24} className="text-blue-500" strokeWidth={2.5} />}
            <p className="font-bold text-sm leading-tight flex-1">{t.message}</p>
            <button onClick={() => setToasts((prev) => prev.filter((item) => item.id !== t.id))} className="opacity-50 hover:opacity-100 transition-opacity">
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context;
};
