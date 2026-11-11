import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Heart, Calendar, Sparkles, Check } from "lucide-react";

interface PersonalizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentName: string;
  onSaveName: (name: string) => void;
  currentDate: string; // ISO date string YYYY-MM-DD
  onSaveDate: (date: string) => void;
}

export const PersonalizeModal: React.FC<PersonalizeModalProps> = ({
  isOpen,
  onClose,
  currentName,
  onSaveName,
  currentDate,
  onSaveDate,
}) => {
  const [nameInput, setNameInput] = useState(currentName);
  const [dateInput, setDateInput] = useState(currentDate);
  const [savedFeedback, setSavedFeedback] = useState(false);

  const presets = [
    {
      label: "6 Months Ago",
      getDate: () => {
        const d = new Date();
        d.setMonth(d.getMonth() - 6);
        return d.toISOString().split("T")[0];
      },
    },
    {
      label: "1 Year Ago",
      getDate: () => {
        const d = new Date();
        d.setFullYear(d.getFullYear() - 1);
        return d.toISOString().split("T")[0];
      },
    },
    {
      label: "2 Years Ago",
      getDate: () => {
        const d = new Date();
        d.setFullYear(d.getFullYear() - 2);
        return d.toISOString().split("T")[0];
      },
    },
    {
      label: "100 Days Ago",
      getDate: () => {
        const d = new Date();
        d.setDate(d.getDate() - 100);
        return d.toISOString().split("T")[0];
      },
    },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveName(nameInput.trim() || "My Beautiful Girl");
    onSaveDate(dateInput);
    setSavedFeedback(true);
    setTimeout(() => {
      setSavedFeedback(false);
      onClose();
    }, 600);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-rose-950/40 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl bg-white/95 p-6 sm:p-8 shadow-2xl border border-rose-100"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 rounded-full p-2 text-rose-400 hover:bg-rose-50 hover:text-rose-600 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-2 mb-2 text-rose-600">
              <Sparkles className="h-5 w-5" />
              <h2 className="font-serif-display text-xl font-bold text-rose-950">
                Personalize Your Love Letter
              </h2>
            </div>
            <p className="text-xs text-rose-900/70 mb-6 font-sans">
              Set her name or nickname and the date your journey together began. Everything across the website updates in real-time.
            </p>

            <form onSubmit={handleSave} className="space-y-5">
              {/* Name field */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-rose-900 mb-1.5">
                  Her Name or Cute Nickname
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder="e.g. Maya, Princess, My Love, Sunshine"
                    maxLength={32}
                    className="w-full rounded-xl border border-rose-200 bg-rose-50/40 px-4 py-2.5 text-rose-950 text-sm font-medium focus:border-rose-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-200/50"
                  />
                  <Heart className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-rose-400" />
                </div>
              </div>

              {/* Anniversary Date field */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-rose-900 mb-1.5">
                  Relationship Start Date
                </label>
                <div className="relative mb-2">
                  <input
                    type="date"
                    value={dateInput}
                    onChange={(e) => setDateInput(e.target.value)}
                    className="w-full rounded-xl border border-rose-200 bg-rose-50/40 px-4 py-2.5 text-rose-950 text-sm font-medium focus:border-rose-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-200/50"
                  />
                  <Calendar className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-rose-400" />
                </div>

                {/* Date presets */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {presets.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => setDateInput(preset.getDate())}
                      className="text-xs px-2.5 py-1 rounded-lg bg-rose-100/70 text-rose-800 hover:bg-rose-200/80 transition-colors font-medium cursor-pointer"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Save button */}
              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 py-3 text-sm font-semibold text-white shadow-md hover:from-rose-700 hover:to-pink-700 transition-all cursor-pointer"
                >
                  {savedFeedback ? (
                    <>
                      <Check className="h-4 w-4" />
                      <span>Saved Sweetheart!</span>
                    </>
                  ) : (
                    <>
                      <Heart className="h-4 w-4 fill-white" />
                      <span>Save &amp; Update Website</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
