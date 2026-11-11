import React from "react";
import { Heart, Sparkles, SlidersHorizontal } from "lucide-react";

interface TopNavbarProps {
  loverName: string;
  onSendKiss: () => void;
  onOpenSettings: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  loverName,
  onSendKiss,
  onOpenSettings,
}) => {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-8 px-5 sm:px-8 py-3.5 bg-white/80 backdrop-blur-md border-b border-rose-100/80 transition-all">
      {/* Zone 1: Single text element wordmark */}
      <a
        href="#"
        className="font-serif-display text-lg sm:text-xl font-bold tracking-tight text-rose-950 whitespace-nowrap shrink-0 flex items-center gap-1.5"
      >
        <span>Forever &amp; Always</span>
        <Heart className="h-4 w-4 fill-rose-500 text-rose-500 inline-block" />
      </a>

      {/* Zone 2: 4–5 clean single-line text navigation links */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-rose-900/80">
        <a href="#letter" className="hover:text-rose-600 transition-colors whitespace-nowrap shrink-0">
          Letter
        </a>
        <a href="#reasons" className="hover:text-rose-600 transition-colors whitespace-nowrap shrink-0">
          Reasons
        </a>
        <a href="#gallery" className="hover:text-rose-600 transition-colors whitespace-nowrap shrink-0">
          Gallery
        </a>
        <a href="#quiz" className="hover:text-rose-600 transition-colors whitespace-nowrap shrink-0">
          Quiz
        </a>
        <a href="#envelopes" className="hover:text-rose-600 transition-colors whitespace-nowrap shrink-0">
          Envelopes
        </a>
      </nav>

      {/* Zone 3: 1 primary action (Send Kiss button) + Settings */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <button
          onClick={onOpenSettings}
          title="Personalize Name & Anniversary Date"
          className="p-2 rounded-full border border-rose-200/80 text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer"
        >
          <SlidersHorizontal className="h-4 w-4" />
        </button>

        <button
          onClick={onSendKiss}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-rose-600 to-pink-600 rounded-full hover:from-rose-700 hover:to-pink-700 transition-all shadow-xs cursor-pointer whitespace-nowrap shrink-0"
        >
          <span>Send Me A Kiss</span>
          <span>💋</span>
        </button>
      </div>
    </header>
  );
};
