import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Heart, Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles } from "lucide-react";
import { lofiAudio } from "../utils/audio.ts";

interface LoveLetterProps {
  loverName: string;
}

export const LoveLetter: React.FC<LoveLetterProps> = ({ loverName }) => {
  const fullText = `Dearest ${loverName || "My Beautiful Girl"},

If there is one thing in this chaotic world that I am certain of, it is you. From the quiet mornings to the late nights when the world falls asleep, you are always the first and last thought that brings peace to my heart.

Your smile has this effortless way of making my entire day brighter. No matter how heavy life gets, the second I hear your laugh or catch your eyes looking at me, all the noise fades away. How lucky I am to have you in my corner, walking beside me, holding my hand through every chapter.

You make ordinary moments feel like magic. A simple cup of coffee with you feels like a grand adventure. Sitting in comfortable silence with you feels warmer than the brightest summer. You didn't just step into my life; you completely transformed it, making my world softer, kinder, and infinitely more beautiful.

Thank you for your patient heart, your silly jokes, your gentle hugs that make everything okay, and the pure warmth you bring wherever you go. I promise to keep choosing you, loving you, and treasuring you—not just on the easy days, but on every single day we are blessed with.

Forever and always yours,
With all my love ❤️`;

  const [displayedLength, setDisplayedLength] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [typingSound, setTypingSound] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isTyping && displayedLength < fullText.length) {
      timerRef.current = window.setTimeout(() => {
        setDisplayedLength((prev) => {
          const next = prev + 1;
          if (typingSound && next % 3 === 0) {
            lofiAudio.playTypeTick();
          }
          return next;
        });
      }, 24);
    } else if (displayedLength >= fullText.length) {
      setIsTyping(false);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isTyping, displayedLength, fullText.length, typingSound]);

  const handleTogglePlay = () => {
    if (displayedLength >= fullText.length) {
      setDisplayedLength(0);
      setIsTyping(true);
    } else {
      setIsTyping(!isTyping);
    }
  };

  const handleSkip = () => {
    setIsTyping(false);
    setDisplayedLength(fullText.length);
  };

  const handleRestart = () => {
    setDisplayedLength(0);
    setIsTyping(true);
  };

  const displayedText = fullText.slice(0, displayedLength);

  return (
    <section className="relative w-full max-w-3xl mx-auto px-4 py-12 sm:py-16">
      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-rose-600 mb-2">
          <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500" />
          <span>Section 01 · A Message From My Heart</span>
        </div>
        <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-rose-950">
          Written Only For You
        </h2>
        <p className="text-xs sm:text-sm text-rose-800/70 mt-1 font-sans">
          Words that come straight from the deepest parts of my soul.
        </p>
      </div>

      {/* Love Letter Parchment Container */}
      <div className="relative overflow-hidden rounded-3xl bg-[#fffdfa] border border-[#f3e5d8] p-6 sm:p-10 md:p-12 shadow-[0_15px_40px_rgba(136,19,55,0.08)]">
        {/* Wax Seal Accent at top corner */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center justify-center">
          <div className="relative flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-rose-700 via-rose-800 to-rose-950 text-amber-200 shadow-md border-2 border-rose-900/60">
            <Heart className="h-5 w-5 fill-rose-200 text-rose-200" />
            <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-amber-300" />
          </div>
        </div>

        {/* Paper lines aesthetic */}
        <div className="min-h-[320px] font-sans text-rose-950/90 text-base sm:text-lg leading-relaxed whitespace-pre-wrap">
          {displayedText}
          {isTyping && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.6 }}
              className="inline-block w-2 h-5 ml-1 bg-rose-600 align-middle rounded-xs"
            />
          )}
        </div>

        {/* Controls Bar at Bottom */}
        <div className="mt-8 pt-6 border-t border-rose-100/80 flex flex-wrap items-center justify-between gap-3 text-xs text-rose-700">
          <div className="flex items-center gap-2">
            <button
              onClick={handleTogglePlay}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-100/70 hover:bg-rose-200/80 text-rose-900 font-medium transition-colors cursor-pointer"
            >
              {isTyping ? (
                <>
                  <Pause className="h-3.5 w-3.5" />
                  <span>Pause</span>
                </>
              ) : displayedLength >= fullText.length ? (
                <>
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Read Again</span>
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5" />
                  <span>Resume</span>
                </>
              )}
            </button>

            {displayedLength < fullText.length && (
              <button
                onClick={handleSkip}
                className="px-3 py-1.5 rounded-lg bg-white border border-rose-200 hover:bg-rose-50 text-rose-800 font-medium transition-colors cursor-pointer"
              >
                Reveal All
              </button>
            )}

            <button
              onClick={handleRestart}
              title="Restart from beginning"
              className="p-1.5 rounded-lg hover:bg-rose-100/60 text-rose-600 transition-colors cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Sound tick toggle */}
          <button
            onClick={() => setTypingSound(!typingSound)}
            className="inline-flex items-center gap-1.5 text-rose-600 hover:text-rose-900 transition-colors cursor-pointer"
          >
            {typingSound ? (
              <>
                <Volume2 className="h-3.5 w-3.5" />
                <span>Typing Sound On</span>
              </>
            ) : (
              <>
                <VolumeX className="h-3.5 w-3.5 text-rose-400" />
                <span>Typing Sound Off</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};
