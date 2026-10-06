"use client";

import React from "react";
import { useStore } from "@/context/StoreContext";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 flex flex-col gap-2 max-w-sm mx-auto pointer-events-none">
      {toasts.map((toast) => {
        let bgColor = "bg-luxury-dark text-white border border-luxury-gold/40";
        let icon = <CheckCircle2 className="w-5 h-5 text-luxury-gold flex-shrink-0" />;

        if (toast.type === "error") {
          bgColor = "bg-red-950 text-white border border-red-800";
          icon = <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />;
        } else if (toast.type === "info") {
          bgColor = "bg-neutral-900 text-white border border-neutral-700";
          icon = <Info className="w-5 h-5 text-neutral-300 flex-shrink-0" />;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-3.5 rounded-xl shadow-2xl backdrop-blur-md transition-all duration-300 transform translate-y-0 ${bgColor}`}
          >
            <div className="flex items-center gap-3 pr-2">
              {icon}
              <p className="text-xs font-medium tracking-wide leading-snug">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 text-neutral-400 hover:text-white rounded-lg transition-colors"
              aria-label="Fechar notificação"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
