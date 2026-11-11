import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Heart, X } from "lucide-react";

interface EasterEggToastProps {
  message: string | null;
  onClose: () => void;
}

export const EasterEggToast: React.FC<EasterEggToastProps> = ({ message, onClose }) => {
  return (
    <AnimatePresence>
      {message && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 w-full max-w-md pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="relative rounded-2xl bg-gradient-to-r from-rose-900 via-rose-800 to-pink-900 text-white p-4 shadow-2xl border border-rose-400/50 flex items-start gap-3"
          >
            <div className="rounded-full bg-white/20 p-2 shrink-0">
              <Sparkles className="h-5 w-5 text-amber-300 animate-spin" style={{ animationDuration: "6s" }} />
            </div>

            <div className="flex-1 pr-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-rose-200 mb-0.5 flex items-center gap-1">
                <Heart className="h-3 w-3 fill-rose-300 text-rose-300" />
                <span>Secret Love Surprise Unlocked!</span>
              </div>
              <p className="font-cursive text-xl text-white leading-snug">
                "{message}"
              </p>
            </div>

            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-rose-300 hover:text-white rounded-full p-1"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
